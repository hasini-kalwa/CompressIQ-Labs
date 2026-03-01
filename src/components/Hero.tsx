import { motion } from "motion/react";
import { Button } from "@/components/Button";
import { ArrowRight, Zap, Cpu, Leaf } from "lucide-react";

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-green/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent-blue/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-green text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            New: AMD Instinct™ Optimization Support
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-green to-accent-blue">
              Intelligent AI
            </span>
            <br />
            Model Compression
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-lg leading-relaxed">
            Analyze models. Simulate energy savings. Optimize for AMD performance per watt.
            Build sustainable AI systems without compromising accuracy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={onStart}>
              Analyze a Model <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg">
              Explore How It Works
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
            <div>
              <div className="text-3xl font-bold text-white mb-1">60%</div>
              <div className="text-xs text-text-secondary uppercase tracking-wider">Energy Reduction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">2.5x</div>
              <div className="text-xs text-text-secondary uppercase tracking-wider">Perf / Watt</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-xs text-text-secondary uppercase tracking-wider">AMD Compatible</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 bg-bg-secondary border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-8 bg-bg-primary border-b border-white/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-text-secondary">Selected Model</div>
                  <div className="font-mono text-accent-green">ResNet18</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-text-secondary">Status</div>
                  <div className="text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent-green rounded-full" /> Optimized
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-bg-primary p-4 rounded-xl border border-white/5">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-text-secondary">Compression Ratio</span>
                    <span className="text-sm text-white">40% Pruned</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[40%] bg-accent-blue" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-bg-primary p-4 rounded-xl border border-white/5">
                    <Zap className="w-5 h-5 text-yellow-500 mb-2" />
                    <div className="text-2xl font-bold text-white">48W</div>
                    <div className="text-xs text-text-secondary">Power Draw</div>
                  </div>
                  <div className="bg-bg-primary p-4 rounded-xl border border-white/5">
                    <Leaf className="w-5 h-5 text-accent-green mb-2" />
                    <div className="text-2xl font-bold text-white">88/100</div>
                    <div className="text-xs text-text-secondary">Eco Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements behind the card */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-green/20 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-blue/20 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
