import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/Card";
import { Cpu, Zap, Leaf, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HistoryItem {
  id: number;
  model_name: string;
  parameters: number;
  baseline_energy: number;
  final_energy: number;
  sustainability_score: number;
  created_at: string;
}

export function History() {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`/api/history/${user.uid}`)
        .then((res) => res.json())
        .then((data) => {
          setHistory(data);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="w-12 h-12 border-4 border-accent-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-bg-primary">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Analysis History</h1>
          <p className="text-text-secondary">
            Review your past model optimizations and sustainability gains.
          </p>
        </motion.div>

        {history.length === 0 ? (
          <Card className="text-center py-20">
            <Clock className="w-16 h-16 text-text-muted mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">No History Yet</h3>
            <p className="text-text-secondary mb-8">Start your first model analysis to see it here.</p>
            <button 
              onClick={() => navigate("/dashboard")}
              className="bg-accent-green text-bg-primary px-8 py-3 rounded-xl font-bold hover:brightness-105 transition-all"
            >
              Analyze a Model
            </button>
          </Card>
        ) : (
          <div className="space-y-6">
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:border-white/10 group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-bg-primary rounded-xl border border-white/5 flex items-center justify-center">
                        <Cpu className="w-6 h-6 text-accent-blue" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-accent-green transition-colors">{item.model_name}</h3>
                        <div className="text-sm text-text-muted flex items-center gap-2">
                          <Clock className="w-3 h-3" /> {new Date(item.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-grow max-w-2xl">
                      <div>
                        <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Params</div>
                        <div className="font-mono text-white">{(item.parameters / 1000000).toFixed(1)}M</div>
                      </div>
                      <div>
                        <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Energy Saved</div>
                        <div className="font-mono text-accent-green">
                          {Math.round(((item.baseline_energy - item.final_energy) / item.baseline_energy) * 100)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Eco Score</div>
                        <div className="font-mono text-accent-blue">{item.sustainability_score}/100</div>
                      </div>
                      <div className="flex items-center justify-end">
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-text-muted group-hover:text-white">
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
