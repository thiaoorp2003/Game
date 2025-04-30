const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS moves (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        level INTEGER,
        move TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

function saveMove(level, move) {
    db.run(`INSERT INTO moves (level, move) VALUES (?, ?)`, [level, move]);
}

module.exports = { saveMove };
