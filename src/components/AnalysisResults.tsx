import { motion } from "motion/react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend 
} from "recharts";
import { ArrowLeft, Download, Share2, Zap, Leaf, Cpu, TrendingUp } from "lucide-react";
import { AIAdvisor } from "@/components/AIAdvisor";
import type { AnalysisResult, RecommendationResult, SimulationResult, ModelData } from "@/types";

interface DashboardProps {
  modelName: string;
  analysis: AnalysisResult;
  recommendation: RecommendationResult;
  simulation: SimulationResult;
  onBack: () => void;
}

export function AnalysisResults({ modelName, analysis, recommendation, simulation, onBack }: DashboardProps) {
  
  const energyData = [
    { name: 'Before', energy: analysis.baseline_energy, fill: '#F87171' },
    { name: 'After', energy: simulation.final_energy, fill: '#22D3A6' },
  ];

  const tradeOffData = [
    { pruning: 0, accuracy: 100, energy: 100 },
    { pruning: 10, accuracy: 99.5, energy: 90 },
    { pruning: 20, accuracy: 98.8, energy: 80 },
    { pruning: 30, accuracy: 97.5, energy: 70 },
    { pruning: 40, accuracy: 95.0, energy: 60 },
    { pruning: 50, accuracy: 91.0, energy: 50 },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-3">
                {modelName} Analysis
                <span className="text-xs font-mono bg-accent-green/10 text-accent-green px-2 py-1 rounded border border-accent-green/20">
                  OPTIMIZED
                </span>
              </h1>
              <p className="text-text-secondary text-sm">
                Generated on {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" /> Report
            </Button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Panel 1: Model Overview (Top Left) */}
          <Card className="lg:col-span-4">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-accent-blue" /> Model Overview
            </h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-text-secondary">Parameters</span>
                <span className="font-mono text-lg">{(analysis.parameters / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-text-secondary">Model Size</span>
                <span className="font-mono text-lg">{analysis.model_size_mb} MB</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-text-secondary">Est. FLOPs</span>
                <span className="font-mono text-lg">{(analysis.flops / 1000000000).toFixed(2)}G</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Baseline Energy</span>
                <span className="font-mono text-lg">{analysis.baseline_energy} units</span>
              </div>
            </div>
          </Card>

          {/* Panel 2: Compression Recommendation (Top Middle) */}
          <Card className="lg:col-span-4 border-accent-green/20 bg-accent-green/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-accent-green">
              <TrendingUp className="w-5 h-5" /> Recommendation
            </h3>
            <div className="space-y-4">
              <div className="bg-bg-primary p-4 rounded-xl border border-white/5">
                <div className="text-sm text-text-secondary mb-1">Pruning Strategy</div>
                <div className="text-xl font-bold text-white">{recommendation.pruning_percent}% Sparse</div>
              </div>
              <div className="bg-bg-primary p-4 rounded-xl border border-white/5">
                <div className="text-sm text-text-secondary mb-1">Quantization</div>
                <div className="text-xl font-bold text-white">{recommendation.quantization} Precision</div>
              </div>
              <div className="bg-bg-primary p-4 rounded-xl border border-white/5">
                <div className="text-sm text-text-secondary mb-1">Distillation</div>
                <div className="text-xl font-bold text-white">
                  {recommendation.distillation ? "Recommended" : "Not Required"}
                </div>
              </div>
              <p className="text-xs text-text-muted mt-4 italic">
                "{recommendation.reasoning}"
              </p>
            </div>
          </Card>

          {/* Panel 3: Energy Simulation (Top Right) */}
          <Card className="lg:col-span-4">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" /> Energy Simulation
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-bg-primary rounded-xl">
                <div className="text-text-secondary text-xs mb-1">Before</div>
                <div className="text-2xl font-bold text-red-400">{analysis.baseline_energy}</div>
              </div>
              <div className="text-center p-4 bg-bg-primary rounded-xl border border-accent-green/30">
                <div className="text-text-secondary text-xs mb-1">After</div>
                <div className="text-2xl font-bold text-accent-green">{simulation.final_energy}</div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Energy Saved</span>
                <span className="text-sm font-bold text-accent-green">{simulation.energy_saved_percent}%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${simulation.energy_saved_percent}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-accent-green" 
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg text-sm text-text-secondary">
              <Leaf className="w-4 h-4 text-accent-green shrink-0" />
              {simulation.co2_reduction_estimate}
            </div>
          </Card>

          {/* Panel 4: Visualizations (Bottom Row) */}
          <Card className="lg:col-span-8 h-[400px]">
             <h3 className="text-lg font-semibold mb-6">Performance Trade-off Analysis</h3>
             <ResponsiveContainer width="100%" height="85%">
                <LineChart data={tradeOffData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="pruning" stroke="#6B7280" label={{ value: 'Pruning %', position: 'insideBottom', offset: -5 }} />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#F3F4F6' }}
                    itemStyle={{ color: '#F3F4F6' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="accuracy" stroke="#3B82F6" strokeWidth={2} name="Accuracy %" />
                  <Line type="monotone" dataKey="energy" stroke="#22D3A6" strokeWidth={2} name="Energy %" />
                </LineChart>
             </ResponsiveContainer>
          </Card>

          <Card className="lg:col-span-4 h-[400px]">
            <h3 className="text-lg font-semibold mb-6">Energy Consumption</h3>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#F3F4F6' }}
                />
                <Bar dataKey="energy" radius={[4, 4, 0, 0]} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* AMD Optimization Panel (Full Width) */}
          <Card className="lg:col-span-12 bg-bg-secondary border-l-4 border-l-accent-red relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Cpu className="w-64 h-64" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-accent-red/10 text-accent-red text-xs font-bold mb-3 uppercase tracking-wider">
                  AMD Instinct™ Optimized
                </div>
                <h3 className="text-2xl font-bold mb-2">Hardware-Aware Acceleration</h3>
                <p className="text-text-secondary max-w-2xl">
                  This compression strategy is tailored for AMD ROCm™ software stack, ensuring 
                  maximum throughput and memory efficiency on AMD Instinct™ MI300 accelerators.
                </p>
              </div>
              <div className="flex gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-white">2.5x</div>
                  <div className="text-xs text-text-secondary uppercase">Perf / Watt</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">40%</div>
                  <div className="text-xs text-text-secondary uppercase">Memory Saved</div>
                </div>
              </div>
            </div>
          </Card>

        </div>
      </div>

      {/* AI Advisor Component */}
      <AIAdvisor 
        context={{
          modelName,
          analysis,
          recommendation,
          simulation
        }}
      />
    </div>
  );
}
