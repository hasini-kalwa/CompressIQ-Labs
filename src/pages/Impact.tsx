import { motion } from "motion/react";
import { Leaf, Zap, BarChart3, TrendingUp, Globe, ShieldCheck } from "lucide-react";

export function Impact() {
  const stats = [
    { label: "Energy Reduction", value: "60%", icon: <Zap className="w-6 h-6 text-yellow-500" /> },
    { label: "Carbon Saved", value: "2.5 Tons", icon: <Leaf className="w-6 h-6 text-accent-green" /> },
    { label: "Perf / Watt", value: "2.5x", icon: <TrendingUp className="w-6 h-6 text-accent-blue" /> },
    { label: "Memory Saved", value: "40%", icon: <BarChart3 className="w-6 h-6 text-accent-red" /> }
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
            Sustainability <span className="text-accent-blue">Impact</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            AI energy consumption matters. Our mission is to reduce the carbon footprint of large models 
            while improving edge deployment efficiency and enterprise ESG alignment.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-bg-secondary p-8 rounded-3xl border border-white/5 text-center flex flex-col items-center gap-4"
            >
              <div className="p-4 bg-bg-primary rounded-2xl border border-white/5">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-text-secondary uppercase tracking-wider font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold">Why AI Energy Consumption Matters</h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Large AI models consume excessive GPU cycles, leading to high energy consumption 
              and increased carbon footprint. As AI becomes ubiquitous, its environmental impact 
              cannot be ignored.
            </p>
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="p-3 bg-accent-green/10 rounded-xl h-fit">
                  <Globe className="w-6 h-6 text-accent-green" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Global Carbon Footprint</h4>
                  <p className="text-text-secondary">Training a single large transformer model can emit as much CO2 as five cars over their entire lifetimes.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="p-3 bg-accent-blue/10 rounded-xl h-fit">
                  <ShieldCheck className="w-6 h-6 text-accent-blue" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Enterprise ESG Alignment</h4>
                  <p className="text-text-secondary">Companies are increasingly required to report and reduce their digital carbon footprint as part of ESG compliance.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-bg-secondary p-10 rounded-3xl border border-white/5"
          >
            <h3 className="text-2xl font-bold mb-8">Before vs After Optimization</h3>
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Baseline Energy</span>
                  <span className="text-white font-mono">100%</span>
                </div>
                <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-red-500/50" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Optimized Energy</span>
                  <span className="text-accent-green font-mono">40%</span>
                </div>
                <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[40%] bg-accent-green shadow-[0_0_15px_rgba(34,211,166,0.3)]" />
                </div>
              </div>
              <div className="pt-8 border-t border-white/5">
                <div className="text-center">
                  <div className="text-5xl font-bold text-accent-green mb-2">60%</div>
                  <div className="text-sm text-text-secondary uppercase tracking-widest font-bold">Reduction in Energy Consumption</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-br from-bg-secondary to-bg-primary p-16 rounded-3xl border border-white/5"
        >
          <h2 className="text-4xl font-bold mb-6">Future Roadmap</h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-12">
            We are committed to building the future of green AI. Our roadmap includes:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-bg-primary rounded-2xl border border-white/5">
              <h4 className="font-bold mb-2">Real-time GPU Profiling</h4>
              <p className="text-sm text-text-secondary">Live energy monitoring on AMD Instinct™ accelerators using ROCm™.</p>
            </div>
            <div className="p-6 bg-bg-primary rounded-2xl border border-white/5">
              <h4 className="font-bold mb-2">Auto-Compression Pipeline</h4>
              <p className="text-sm text-text-secondary">End-to-end automated retraining and compression for custom models.</p>
            </div>
            <div className="p-6 bg-bg-primary rounded-2xl border border-white/5">
              <h4 className="font-bold mb-2">ESG Analytics Dashboard</h4>
              <p className="text-sm text-text-secondary">Enterprise-grade carbon reporting for AI infrastructure.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
