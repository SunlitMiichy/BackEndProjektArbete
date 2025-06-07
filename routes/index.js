const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Anslut till databasen
const db = new sqlite3.Database('./data/products.db');

// Startsidan med dynamisk heroImage + galleri
router.get('/', function (req, res) {
  const heroImages = [
    '/images/svart-tshirt.jpg',
    '/images/vit-tshirt.jpg'
  ];
  const randomImage = heroImages[Math.floor(Math.random() * heroImages.length)];

  // Först: hämta produkter
  db.all('SELECT * FROM products LIMIT 8', [], (err, products) => {
    if (err) {
      console.error(err);
      return res.send("Fel vid hämtning av produkter");
    }

    // Sedan: hämta spots
    db.all('SELECT * FROM spots', [], (err2, spots) => {
      if (err2) {
        console.error(err2);
        return res.send("Fel vid hämtning av spots");
      }

      // Nu kör vi render när båda är klara
      res.render('index', {
        title: 'Startsidan',
        heroImage: randomImage,
        products: products,
        spots: spots
      });
    });
  });
});

// search-result.ejs sidan 


router.get('/search', (req, res) => {
  const searchTerm = req.query.q || '';
  const sql = `SELECT * FROM products WHERE name LIKE ? LIMIT 3`;
  const values = [`%${searchTerm}%`];

  db.all(sql, values, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Fel vid sökning");
    }

    res.render('search-result', {
      title: `Sökresultat för "${searchTerm}"`,
      products: rows,
      searchTerm
    });
  });
});


// Adminsidan
router.get('/admin', function (req, res) {
  res.render('admin', { title: 'Adminpanel' });
});

// Produktsidan (manuell)
router.get('/product-details', function (req, res) {
  res.render('product-details', { title: 'Produktdetaljer' });


  
});

// Produkter – Adminvy (hårdkodad lista)
router.get('/products', function (req, res) {
  const clothingProducts = [
    { id: 1, name: "Svart T-Shirt", sku: "SVA123", price: "199" },
    { id: 2, name: "Vit T-Shirt", sku: "VIT123", price: "199" }
  ];

  res.render('products', {
    title: 'Produkter',
    clothingProducts: clothingProducts
  });
});

// Produktdetaljer via ID
router.get('/products/:id', function (req, res) {
  const productId = req.params.id;

  db.get('SELECT * FROM products WHERE id = ?', [productId], (err, product) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Fel vid hämtning av produkt');
    }

    if (!product) {
      return res.status(404).send('Produkten hittades inte.');
    }

    res.render('product-details', {
      title: product.name,
      product: product
    });
  });
});

// Sökfunktion
router.get('/search', (req, res) => {
  const searchTerm = req.query.q || '';
  const sql = `SELECT * FROM products WHERE name LIKE ?`;
  const values = [`%${searchTerm}%`];

  db.all(sql, values, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Fel vid sökning");
    }

    res.render('search-result', {
      title: `Sökresultat för "${searchTerm}"`,
      products: rows,
      searchTerm
    });
  });
});

//SPOTS 


module.exports = router;






