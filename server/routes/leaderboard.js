const express = require("express");
const router = express.Router();
const { db } = require('../db');

router.get("/", async (req, res) => {
  await db.read();
  res.json({ ok: true, leaderboard: db.data.leaderboard || [] });
});

// Submit a score - naive implementation for demo
router.post("/submit", async (req, res) => {
  const { name, score } = req.body;
  if (!name || typeof score !== "number") return res.status(400).json({ error: "Missing fields" });
  await db.read();
  db.data.leaderboard.push({ rank: db.data.leaderboard.length + 1, name, avatar: `https://i.pravatar.cc/100?u=${name}`, score });
  db.data.leaderboard = db.data.leaderboard.sort((a, b) => b.score - a.score).map((p, i) => ({ ...p, rank: i + 1 }));
  await db.write();
  res.json({ ok: true, leaderboard: db.data.leaderboard });
});

module.exports = router;
