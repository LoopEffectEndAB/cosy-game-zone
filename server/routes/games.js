const express = require("express");
const router = express.Router();
const { db } = require('../db');

router.get("/", async (req, res) => {
  await db.read();
  res.json({ ok: true, games: db.data.games || [] });
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await db.read();
  const game = (db.data.games || []).find((g) => g.id === id);
  if (!game) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true, game });
});

module.exports = router;
