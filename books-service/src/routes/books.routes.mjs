import express from 'express';
import {
  addBook,
  updateBook,
  getBookByISBN
} from '../controllers/books.controller.mjs';

const router = express.Router();

// Routes to handle requests for book management

router.post('/', addBook); // Creates new book
router.put('/:ISBN', updateBook); // update book
router.get('/isbn/:ISBN', getBookByISBN); // get book by isbn
router.get('/:ISBN', getBookByISBN);  // get book by isbn

export default router;
