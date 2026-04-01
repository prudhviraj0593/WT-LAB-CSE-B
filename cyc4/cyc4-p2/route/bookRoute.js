const express = require('express');
const router = express.Router();

let { books, nextId } = require('../books');

// GET all books
router.get('/', (req, res) => {
  res.json(books);
});

// GET book by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).send('Book not found');
  }

  res.json(book);
});

// POST new book (NO validation → no 400 error)
router.post('/', (req, res) => {
  const { name, author, price, quantity } = req.body;

  if (!name || !author || !price || !quantity) {
    return res.status(400).send('All fields are required');
  }

  const newBook = {
    id: nextId++,
    name,
    author,
    price,
    quantity
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).send('Book not found');
  }

  book.name = req.body.name;
  book.author = req.body.author;
  book.price = req.body.price;
  book.quantity = req.body.quantity;

  res.json(book);
});

// DELETE book
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).send('Book not found');
  }

  books.splice(index, 1);
  res.send('Deleted successfully');
});

module.exports = router;