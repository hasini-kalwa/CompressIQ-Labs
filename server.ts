import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Database Setup
const db = new Database("compressiq.db");
db.pragma("foreign_keys = ON");
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    photo_url TEXT,
    provider TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    model_name TEXT,
    parameters INTEGER,
    baseline_energy INTEGER,
    final_energy INTEGER,
    sustainability_score INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

// Middleware to parse JSON bodies
app.use(express.json());

// --- API Routes ---

// User Management
app.post("/api/users", (req, res) => {
  const { id, name, email, photo_url, provider } = req.body;
  console.log(`Syncing user: ${email} (${id})`);
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO users (id, name, email, photo_url, provider)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(id, name, email, photo_url, provider);
  res.json({ success: true });
});

// History Management
app.post("/api/history", (req, res) => {
  const { user_id, model_name, parameters, baseline_energy, final_energy, sustainability_score } = req.body;
  console.log(`Saving history for user: ${user_id}`);
  const stmt = db.prepare(`
    INSERT INTO history (user_id, model_name, parameters, baseline_energy, final_energy, sustainability_score)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  stmt.run(user_id, model_name, parameters, baseline_energy, final_energy, sustainability_score);
  res.json({ success: true });
});

app.get("/api/history/:userId", (req, res) => {
  const { userId } = req.params;
  const stmt = db.prepare("SELECT * FROM history WHERE user_id = ? ORDER BY created_at DESC");
  const history = stmt.all(userId);
  res.json(history);
});

// Database of mock model data (Simulating the Python Backend Model Loader)
const MODEL_DB: Record<string, any> = {
  "resnet18": {
    model_name: "ResNet18",
    type: "Vision",
    parameters: 11700000, // 11.7M
    model_size_mb: 44.6,
    flops: 1800000000, // 1.8G
    baseline_energy: 120, // Arbitrary units as per doc
    description: "Standard CNN for image classification."
  },
  "mobilenet_v2": {
    model_name: "MobileNetV2",
    type: "Lightweight Vision",
    parameters: 3500000, // 3.5M
    model_size_mb: 14.0,
    flops: 300000000, // 0.3G
    baseline_energy: 45,
    description: "Efficient model optimized for mobile devices."
  },
  "bert_base": {
    model_name: "BERT-base",
    type: "NLP Transformer",
    parameters: 110000000, // 110M
    model_size_mb: 440.0,
    flops: 12000000000, // 12G
    baseline_energy: 350,
    description: "Transformer model for natural language understanding."
  }
};

// 2.3.1 Analyze Model Endpoint
const ENERGY_CONSTANT = 6.7e-8;

app.post("/api/analyze", (req, res) => {
  const { model_name } = req.body;
  const model = MODEL_DB[model_name];

  if (!model) {
    return res.status(404).json({ error: "Model not supported" });
  }

  const dynamic_flops = model.parameters * 2;
  const dynamic_energy = dynamic_flops * ENERGY_CONSTANT;

  res.json({
    parameters: model.parameters,
    model_size_mb: model.model_size_mb,
    flops: dynamic_flops,
    baseline_energy: Math.round(dynamic_energy)
  });
});

// 2.3.2 Compression Recommendation Endpoint
app.post("/api/recommend", (req, res) => {
  const { parameters } = req.body;

  let recommendation = {};

  if (parameters > 50000000) { // > 50M
    recommendation = {
      pruning_percent: 40,
      quantization: "INT8",
      distillation: true,
      reasoning: "Large model detected. Aggressive pruning and quantization recommended."
    };
  } else if (parameters > 20000000) { // 20M - 50M
    recommendation = {
      pruning_percent: 30,
      quantization: "INT8",
      distillation: false,
      reasoning: "Medium model. Balanced pruning and quantization recommended."
    };
  } else { // < 20M
    recommendation = {
      pruning_percent: 20,
      quantization: "Optional",
      distillation: false,
      reasoning: "Lightweight model. Mild pruning recommended to preserve accuracy."
    };
  }

  res.json(recommendation);
});

// 2.3.3 Energy Simulation Endpoint
app.post("/api/simulate", (req, res) => {
  const { baseline_energy, pruning_percent, quantization } = req.body;

  // Energy = baseline * (1 - prune%)
  let energy_after_pruning = baseline_energy * (1 - (pruning_percent / 100));
  
  // Energy = result * 0.6 (if INT8)
  let final_energy = energy_after_pruning;
  if (quantization === "INT8") {
    final_energy = energy_after_pruning * 0.6;
  }

  const energy_saved_percent = ((baseline_energy - final_energy) / baseline_energy) * 100;
  
  // Sustainability Score = Energy Reduction % * Weight Factor (approx 1.46 to map 60% -> 88)
  // Using simple mapping from doc example: 60% saved -> 88 score. 
  // Let's say baseline score is 45. Max score 100.
  const sustainability_score = Math.min(100, Math.round(45 + (energy_saved_percent * 0.8)));

  res.json({
    final_energy: Math.round(final_energy),
    energy_saved_percent: Math.round(energy_saved_percent),
    sustainability_score: sustainability_score,
    co2_reduction_estimate: `Equivalent to powering a laptop for ${Math.round(energy_saved_percent / 5)} hours`
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// --- Server Startup ---

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
