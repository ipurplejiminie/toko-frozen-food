   // backend/routes/orderRoutes.js
   const express = require('express');

   module.exports = (db) => {
     const router = express.Router();

     // Contoh: Get all orders
     router.get('/', (req, res) => {
       db.all('SELECT * FROM orders', [], (err, rows) => {
         if (err) {
           res.status(500).json({ error: err.message });
           return;
         }
         res.json(rows);
       });
     });

     // Tambahkan route lain untuk pesanan di sini...

     return router;
   };
