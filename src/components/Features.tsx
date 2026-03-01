import { motion } from "motion/react";
import { Card } from "@/components/Card";
import { Cpu, Zap, BarChart3 } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Cpu className="w-8 h-8 text-accent-blue" />,
      title: "Intelligent Analysis",
      description: "Deep architecture scanning to identify redundant parameters and inefficient layers."
    },
    {
      icon: <Zap className="w-8 h-8 text-accent-green" />,
      title: "Energy Simulation",
      description: "Accurate estimation of power consumption and carbon footprint before deployment."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-accent-red" />,
      title: "AMD Optimization",
      description: "Tailored recommendations for AMD Instinct™ GPUs and ROCm™ software stack."
    }
  ];

  return (
    <section className="py-24 bg-bg-primary relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Hidden Energy Cost of AI</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Modern AI workloads demand smarter, greener optimization. 
            Large models consume massive GPU cycles and increase carbon footprint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:border-white/10">
                <div className="mb-6 p-4 bg-bg-primary rounded-xl inline-block border border-white/5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
