   // backend/server.js
   const express = require('express');
   const sqlite3 = require('sqlite3').verbose();
   const path = require('path');

   const app = express();
   app.use(express.json());

   // Koneksi ke database SQLite
   const dbPath = path.resolve(__dirname, 'database', 'database.sqlite');
   const db = new sqlite3.Database(dbPath, (err) => {
     if (err) {
       console.error('Error opening database ' + err.message);
     } else {
       console.log('Connected to SQLite database.');
       db.run(`CREATE TABLE IF NOT EXISTS products (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT,
         price REAL,
         description TEXT,
         image TEXT,
         stock INTEGER,
         category TEXT
       )`);
       db.run(`CREATE TABLE IF NOT EXISTS orders (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         customerName TEXT,
         total REAL,
         status TEXT,
         date TEXT
       )`);
     }
   });

   // Routes
   app.use('/api/products', require('./routes/productRoutes')(db));
   app.use('/api/orders', require('./routes/orderRoutes')(db));

   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });