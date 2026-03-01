import { motion } from "motion/react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { ArrowRight } from "lucide-react";

interface ModelSelectionProps {
  onSelect: (modelId: string) => void;
}

const MODELS = [
  {
    id: "resnet18",
    name: "ResNet18",
    type: "Vision",
    params: "11.7M",
    desc: "Standard CNN for image classification. Good balance of accuracy and size."
  },
  {
    id: "mobilenet_v2",
    name: "MobileNetV2",
    type: "Lightweight Vision",
    params: "3.5M",
    desc: "Efficient model optimized for mobile devices and edge deployment."
  },
  {
    id: "bert_base",
    name: "BERT-base",
    type: "NLP Transformer",
    params: "110M",
    desc: "Transformer model for natural language understanding tasks."
  }
];

export function ModelSelection({ onSelect }: ModelSelectionProps) {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Select a Model to Analyze</h2>
          <p className="text-text-secondary">
            Choose a pre-trained architecture to simulate compression and energy savings.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MODELS.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                hoverEffect 
                className="h-full flex flex-col group border-white/10 hover:border-accent-green/50"
                onClick={() => onSelect(model.id)}
              >
                <div className="mb-4">
                  <span className="text-xs font-mono text-accent-green bg-accent-green/10 px-2 py-1 rounded">
                    {model.type}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-accent-green transition-colors">
                  {model.name}
                </h3>
                <div className="text-sm font-mono text-text-muted mb-6">
                  {model.params} Parameters
                </div>
                <p className="text-text-secondary mb-8 flex-grow">
                  {model.desc}
                </p>
                <Button className="w-full group-hover:bg-accent-green group-hover:text-bg-primary">
                  Run Analysis <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
