   // backend/routes/productRoutes.js
   const express = require('express');

   module.exports = (db) => {
     const router = express.Router();

     // Get all products
     router.get('/', (req, res) => {
       db.all('SELECT * FROM products', [], (err, rows) => {
         if (err) {
           res.status(500).json({ error: err.message });
           return;
         }
         res.json(rows);
       });
     });

     // Get a product by ID
     router.get('/:id', (req, res) => {
       const id = req.params.id;
       db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
         if (err) {
           res.status(500).json({ error: err.message });
           return;
         }
         res.json(row);
       });
     });

     // Create a new product
     router.post('/', (req, res) => {
       const { name, price, description, image, stock, category } = req.body;
       db.run(
         'INSERT INTO products (name, price, description, image, stock, category) VALUES (?, ?, ?, ?, ?, ?)',
         [name, price, description, image, stock, category],
         function (err) {
           if (err) {
             res.status(400).json({ error: err.message });
             return;
           }
           res.status(201).json({ id: this.lastID });
         }
       );
     });

     // Update a product
     router.put('/:id', (req, res) => {
       const { name, price, description, image, stock, category } = req.body;
       const id = req.params.id;
       db.run(
         'UPDATE products SET name = ?, price = ?, description = ?, image = ?, stock = ?, category = ? WHERE id = ?',
         [name, price, description, image, stock, category, id],
         function (err) {
           if (err) {
             res.status(400).json({ error: err.message });
             return;
           }
           res.json({ changes: this.changes });
         }
       );
     });

     // Delete a product
     router.delete('/:id', (req, res) => {
       const id = req.params.id;
       db.run('DELETE FROM products WHERE id = ?', id, function (err) {
         if (err) {
           res.status(500).json({ error: err.message });
           return;
         }
         res.json({ deleted: this.changes });
       });
     });

     return router;
   };