export interface ModelData {
  model_name: string;
  type: string;
  parameters: number;
  model_size_mb: number;
  flops: number;
  baseline_energy: number;
  description: string;
}

export interface AnalysisResult {
  parameters: number;
  model_size_mb: number;
  flops: number;
  baseline_energy: number;
}

export interface RecommendationResult {
  pruning_percent: number;
  quantization: string;
  distillation: boolean;
  reasoning: string;
}

export interface SimulationResult {
  final_energy: number;
  energy_saved_percent: number;
  sustainability_score: number;
  co2_reduction_estimate: string;
}
