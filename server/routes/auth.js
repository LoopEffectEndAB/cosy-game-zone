const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const { requireAuth } = require('../middleware/auth');

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: "Missing fields" });
  await db.read();
  const exists = db.data.users.find((u) => u.email === email || u.username === username);
  if (exists) return res.status(409).json({ error: "User already exists" });
  const hash = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), username, email, password: hash };
  db.data.users.push(newUser);
  await db.write();
  const token = jwt.sign({ id: newUser.id, email: newUser.email, username: newUser.username }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ ok: true, user: { id: newUser.id, username: newUser.username, email: newUser.email }, token });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });
  await db.read();
  const user = db.data.users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ ok: true, user: { id: user.id, username: user.username, email: user.email }, token });
});

module.exports = router;

// Whoami
router.get('/me', requireAuth, (req, res) => {
  res.json({ ok: true, user: req.user });
});

module.exports = router;
