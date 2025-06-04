import express from 'express';
import data from './data.js';

const app = express();
app.use(express.json()); // allows parsing JSON body

// TEMP: In-memory cart to simulate cart per user
let cart = []; // [{ productId: 'abc', qty: 2 }]

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'PRODUCT NOT FOUND' });
  }
});

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) res.send(product);
  else res.status(404).send({ message: 'PRODUCT NOT FOUND' });
});

// ✅ New: POST /api/cart with stock validation
app.post('/api/cart', (req, res) => {
  const { productId, qty } = req.body;

  const product = data.products.find((x) => x._id === productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const existingCartItem = cart.find((item) => item.productId === productId);
  const existingQty = existingCartItem ? existingCartItem.qty : 0;

  const totalRequested = existingQty + qty;

  if (totalRequested > product.countInStock) {
    return res.status(400).json({
      message: `Not enough stock. Only ${
        product.countInStock - existingQty
      } left.`,
    });
  }

  // Simulate adding to cart
  if (existingCartItem) {
    existingCartItem.qty += qty;
  } else {
    cart.push({ productId, qty });
  }

  res.send({ message: 'Added to cart', cart });
});

// For debugging: get cart contents
app.get('/api/cart', (req, res) => {
  res.send(cart);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
