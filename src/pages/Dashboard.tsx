import { useState } from "react";
import { ModelSelection } from "@/components/ModelSelection";
import { LoadingScreen } from "@/components/LoadingScreen";
import { AnalysisResults } from "@/components/AnalysisResults";
import { useAuth } from "@/contexts/AuthContext";
import type { AnalysisResult, RecommendationResult, SimulationResult } from "@/types";

export function Dashboard() {
  const { user } = useAuth();
  const [view, setView] = useState<"selection" | "loading" | "results">("selection");
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<{
    analysis: AnalysisResult;
    recommendation: RecommendationResult;
    simulation: SimulationResult;
  } | null>(null);

  const handleModelSelect = async (modelId: string) => {
    setSelectedModel(modelId);
    setView("loading");

    try {
      // 1. Analyze
      const analyzeRes = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model_name: modelId }),
      });
      const analysis = await analyzeRes.json();

      // 2. Recommend
      const recommendRes = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parameters: analysis.parameters }),
      });
      const recommendation = await recommendRes.json();

      // 3. Simulate
      const simulateRes = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseline_energy: analysis.baseline_energy,
          pruning_percent: recommendation.pruning_percent,
          quantization: recommendation.quantization,
        }),
      });
      const simulation = await simulateRes.json();

      // 4. Save to History
      if (user) {
        await fetch("/api/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.uid,
            model_name: modelId === "resnet18" ? "ResNet18" : modelId === "mobilenet_v2" ? "MobileNetV2" : "BERT-base",
            parameters: analysis.parameters,
            baseline_energy: analysis.baseline_energy,
            final_energy: simulation.final_energy,
            sustainability_score: simulation.sustainability_score
          })
        });
      }

      setAnalysisData({ analysis, recommendation, simulation });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Simulation failed. Please try again.");
      setView("selection");
    }
  };

  const handleLoadingComplete = () => {
    setView("results");
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setAnalysisData(null);
    setSelectedModel(null);
    setView("selection");
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {view === "selection" && (
        <ModelSelection onSelect={handleModelSelect} />
      )}

      {view === "loading" && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {view === "results" && analysisData && selectedModel && (
        <AnalysisResults 
          modelName={selectedModel === "resnet18" ? "ResNet18" : selectedModel === "mobilenet_v2" ? "MobileNetV2" : "BERT-base"}
          analysis={analysisData.analysis}
          recommendation={analysisData.recommendation}
          simulation={analysisData.simulation}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
