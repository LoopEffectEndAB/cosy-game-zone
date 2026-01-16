const express = require("express");
const router = express.Router();
const { db } = require('../db');
const { requireAuth } = require('../middleware/auth');

router.get("/", async (req, res) => {
  await db.read();
  res.json({ ok: true, friends: db.data.friends || [] });
});

// Add friend
router.post('/add', requireAuth, async (req, res) => {
  const { name, avatar } = req.body;
  if (!name) return res.status(400).json({ error: 'Missing name' });
  await db.read();
  const newFriend = { id: Date.now(), name, avatar: avatar || `https://i.pravatar.cc/100?u=${name}`, status: 'offline' };
  db.data.friends.push(newFriend);
  await db.write();
  res.json({ ok: true, friend: newFriend });
});

// Update friend status
router.patch('/:id/status', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;
  await db.read();
  const f = db.data.friends.find(x => x.id === id);
  if (!f) return res.status(404).json({ error: 'Not found' });
  f.status = status;
  await db.write();
  res.json({ ok: true, friend: f });
});

module.exports = router;
