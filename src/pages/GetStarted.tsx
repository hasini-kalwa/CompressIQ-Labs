import { motion } from "motion/react";
import { Button } from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Zap, Leaf, Cpu } from "lucide-react";

export function GetStarted() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStart = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-bg-primary">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Start Your Journey to <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-green to-accent-blue">
              Sustainable AI
            </span>
          </h1>
          <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of engineers optimizing their models for the future of green computing. 
            Reduce energy consumption, improve hardware efficiency, and lower carbon footprint.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-bg-secondary p-8 rounded-2xl border border-white/5">
              <Cpu className="w-10 h-10 text-accent-blue mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Model Analysis</h3>
              <p className="text-sm text-text-secondary">Deep architectural scanning for efficiency.</p>
            </div>
            <div className="bg-bg-secondary p-8 rounded-2xl border border-white/5">
              <Zap className="w-10 h-10 text-accent-green mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Energy Simulation</h3>
              <p className="text-sm text-text-secondary">Simulate power savings before deployment.</p>
            </div>
            <div className="bg-bg-secondary p-8 rounded-2xl border border-white/5">
              <Leaf className="w-10 h-10 text-accent-red mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Eco Scoring</h3>
              <p className="text-sm text-text-secondary">Real-world sustainability impact metrics.</p>
            </div>
          </div>

          <Button size="lg" onClick={handleStart} className="px-12">
            Start Optimizing <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
