const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const authRouter = require('./routes/auth');
const gamesRouter = require('./routes/games');
const leaderboardRouter = require('./routes/leaderboard');
const friendsRouter = require('./routes/friends');
const { init } = require('./db');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/api/auth', authRouter);
  app.use('/api/games', gamesRouter);
  app.use('/api/leaderboard', leaderboardRouter);
  app.use('/api/friends', friendsRouter);

  app.get('/', (req, res) => res.json({ ok: true, message: 'Cosy Game Zone API' }));

  return app;
}

async function start(port = 0) {
  await init();
  const app = createApp();
  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: true, methods: ['GET', 'POST'] } });

  io.use((socket, next) => {
    const token = socket.handshake.auth && socket.handshake.auth.token;
    if (!token) return next();
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      socket.user = payload;
    } catch (e) {
      console.log('socket auth failed', e.message);
    }
    next();
  });

  io.on('connection', (socket) => {
    console.log('socket connected:', socket.id, socket.user ? socket.user.id : 'guest');

    socket.on('joinRoom', (room) => {
      socket.join(room);
      socket.to(room).emit('system', `${socket.user?.username || socket.id} joined ${room}`);
    });

    socket.on('message', ({ room, message, sender }) => {
      const payload = { id: Date.now(), message, sender, time: new Date().toISOString(), user: socket.user };
      io.to(room).emit('message', payload);
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected:', socket.id);
    });
  });

  await new Promise((resolve, reject) => {
    server.listen(port, () => resolve());
    server.on('error', reject);
  });

  return { server, io, app };
}

async function stop(serverObj) {
  if (!serverObj || !serverObj.server) return;
  await new Promise((resolve) => serverObj.server.close(() => resolve()));
}

module.exports = { createApp, start, stop };
