import { motion } from "motion/react";
import { Logo } from "@/components/Logo";
import { Cpu, Zap, Leaf, MessageSquare, TrendingUp, BarChart3 } from "lucide-react";

export function Solution() {
  const sections = [
    {
      icon: <Cpu className="w-12 h-12 text-accent-blue" />,
      title: "Optimization Engine",
      description: "Deep architecture scanning to identify redundant parameters and inefficient layers. Our engine analyzes the computational graph and recommends pruning strategies that preserve accuracy while reducing size."
    },
    {
      icon: <Zap className="w-12 h-12 text-accent-green" />,
      title: "Energy Simulation",
      description: "Accurate estimation of power consumption and carbon footprint before deployment. We simulate inference workloads on various hardware targets to provide real-world energy metrics."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-accent-red" />,
      title: "Sustainability Scoring",
      description: "A comprehensive metric that combines energy reduction, carbon footprint, and hardware efficiency into a single score. Track your progress towards green AI goals."
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-accent-blue" />,
      title: "AI Advisory Chatbot",
      description: "An intelligent assistant integrated into the platform to help you understand optimization results, interpret charts, and suggest practical deployment advice."
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            The <span className="text-accent-green">CompressIQ</span> Solution
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Intelligent AI Model Compression Studio that analyzes models, recommends strategies, 
            and simulates energy savings — optimized for AMD GPU environments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-bg-secondary p-10 rounded-3xl border border-white/5 flex flex-col items-start gap-6 hover:border-white/10 transition-colors"
            >
              <div className="p-5 bg-bg-primary rounded-2xl border border-white/5">
                {section.icon}
              </div>
              <h3 className="text-3xl font-bold">{section.title}</h3>
              <p className="text-text-secondary leading-relaxed text-lg">
                {section.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-gradient-to-br from-bg-secondary to-bg-primary p-12 rounded-3xl border border-white/5 text-center"
        >
          <BarChart3 className="w-16 h-16 text-accent-green mx-auto mb-8" />
          <h2 className="text-4xl font-bold mb-6">How Compression Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left mt-12">
            <div className="space-y-4">
              <div className="text-accent-green font-mono text-xl font-bold">01. Pruning</div>
              <p className="text-text-secondary">Removing redundant weights and neurons that contribute minimally to the model's accuracy, effectively reducing the parameter count.</p>
            </div>
            <div className="space-y-4">
              <div className="text-accent-blue font-mono text-xl font-bold">02. Quantization</div>
              <p className="text-text-secondary">Converting high-precision floating-point weights (FP32) to lower-precision formats (INT8), drastically reducing memory footprint and compute time.</p>
            </div>
            <div className="space-y-4">
              <div className="text-accent-red font-mono text-xl font-bold">03. Distillation</div>
              <p className="text-text-secondary">Training a smaller "student" model to mimic the behavior of a larger "teacher" model, capturing essential knowledge in a more efficient architecture.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
