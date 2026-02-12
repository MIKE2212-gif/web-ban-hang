const express = require('express');
const router = express.Router();

const products = [
  { id: 1, name: 'Sản phẩm 1', price: 100 },
  { id: 2, name: 'Sản phẩm 2', price: 200 },
];

router.get('/products', (req, res) => {
  res.json(products);
});

module.exports = router;
