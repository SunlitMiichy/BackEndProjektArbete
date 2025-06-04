const sqlite3 = require('sqlite3').verbose();

// Anslut till databasen "products.db"
const db = new sqlite3.Database('./data/products.db', (err) => {
  if (err) {
    console.error('Fel vid anslutning till databasen:', err.message);
  } else {
    console.log('Ansluten till databasen products.db');
  }
});

module.exports = db;