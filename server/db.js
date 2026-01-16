const { Low } = require('lowdb')
const { JSONFile } = require('lowdb/node')
const path = require('path')
const fs = require('fs')

const file = path.join(__dirname, 'data', 'db.json')
const dir = path.dirname(file)
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

const adapter = new JSONFile(file)
const db = new Low(adapter)

async function init() {
  await db.read()
  db.data ||= { users: [], friends: [], games: [], leaderboard: [] }
  // seed minimal data if empty
  if (!db.data.games || db.data.games.length === 0) {
    db.data.games = [
      { id: 1, title: 'Cyber Racers 2077', category: 'Đua xe', rating: 4.8, players: 12500, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&q=80' },
      { id: 2, title: 'Space Warriors', category: 'Bắn súng', rating: 4.5, players: 8900 }
    ]
  }
  if (!db.data.friends) db.data.friends = []
  if (!db.data.leaderboard) db.data.leaderboard = []
  await db.write()
}

module.exports = { db, init }
