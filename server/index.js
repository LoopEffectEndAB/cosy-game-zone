// Minimal entry that starts the server via `start()` exported from app.js
require('dotenv').config();
const { start } = require('./app');

(async function main() {
  const port = process.env.PORT || 4000;
  try {
    await start(port);
    console.log(`Server listening on http://localhost:${port}`);
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();
