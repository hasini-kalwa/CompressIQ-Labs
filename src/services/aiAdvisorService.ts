import { GoogleGenAI } from "@google/genai";
import type { AnalysisResult, RecommendationResult, SimulationResult } from "@/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getAdvisorResponse(
  userMessage: string,
  context: {
    modelName: string;
    analysis: AnalysisResult;
    recommendation: RecommendationResult;
    simulation: SimulationResult;
  },
  chatHistory: { role: "user" | "model"; parts: { text: string }[] }[] = []
) {
  const systemInstruction = `
You are CompressIQ AI Advisor, an intelligent assistant integrated into the CompressIQ Labs platform.
Your role is to help users understand AI model optimization results, sustainability metrics, and compression strategies.

CONTEXT FOR CURRENT ANALYSIS:
- Model Name: ${context.modelName}
- Parameters: ${context.analysis.parameters}
- Model Size: ${context.analysis.model_size_mb} MB
- FLOPs: ${context.analysis.flops}
- Baseline Energy: ${context.analysis.baseline_energy} units
- Recommended Pruning: ${context.recommendation.pruning_percent}%
- Recommended Quantization: ${context.recommendation.quantization}
- Distillation Recommended: ${context.recommendation.distillation}
- Optimization Reasoning: ${context.recommendation.reasoning}
- Final Optimized Energy: ${context.simulation.final_energy} units
- Energy Saved: ${context.simulation.energy_saved_percent}%
- Sustainability Score: ${context.simulation.sustainability_score}/100
- CO2 Reduction Estimate: ${context.simulation.co2_reduction_estimate}

BEHAVIOR RULES:
1. Explain all displayed model metrics clearly. Define what they mean, why they matter, and their impact on cost/energy.
2. Interpret charts and graphs shown on the dashboard based on the data provided.
3. Suggest practical optimization strategies (pruning, quantization, distillation) and mention trade-offs.
4. Provide energy-efficient deployment advice.
5. Translate technical data into simple explanations when needed.
6. Give both beginner-friendly and technical explanations when asked.
7. Stay within the scope of AI model optimization and sustainability.
8. Maintain a professional, confident, and insightful tone.
9. Never invent data not shown in the context.

RESPONSE STYLE:
- Clear, structured, and professional.
- Avoid being overly verbose.
- Use analogies for simplifications.
- Provide deeper technical details (memory bandwidth, inference latency) when asked.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...chatHistory,
        { role: "user", parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("AI Advisor Error:", error);
    return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  }
}
