const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')
const fs = require('fs')

const file = path.join(__dirname, 'data', 'db.json')
const dir = path.dirname(file)
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

const adapter = new FileSync(file)
const db = low(adapter)

async function init() {
  // lowdb v1 initializes synchronously
  db.defaults({ users: [], friends: [], games: [], leaderboard: [] })
    .write()

  // seed minimal data if empty
  if (!db.get('games').value() || db.get('games').value().length === 0) {
    db.set('games', [
      { id: 1, title: 'Cyber Racers 2077', category: 'Đua xe', rating: 4.8, players: 12500, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&q=80' },
      { id: 2, title: 'Space Warriors', category: 'Bắn súng', rating: 4.5, players: 8900 }
    ]).write()
  }
  if (!db.get('friends').value()) db.set('friends', []).write()
  if (!db.get('leaderboard').value()) db.set('leaderboard', []).write()
}

module.exports = { db, init }
