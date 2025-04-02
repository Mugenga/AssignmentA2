import {
  newBook,
  updateBookByISBN,
  findBookByISBN,
} from "../services/books.service.mjs";

import { isBookValid } from "../utils/validate.mjs";

// endpoint to create book
const addBook = async (req, res) => {
  const book = req.body;
  if (!isBookValid(book)) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const [created, isNew] = await newBook(book);
    if (!isNew) {
      return res
        .status(422)
        .json({ message: "This ISBN already exists in the system." });
    }

    res
      .status(201)
      .location(`/books/${created.ISBN}`)
      .json({
        ...created.dataValues,
        price: parseFloat(created.price),
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unknown error" });
  }
};

// Update an existing book
const updateBook = async (req, res) => {
  const { ISBN } = req.params;
  const book = req.body;

  // ISBN in path and ISBN in body must match.
  if (ISBN !== book.ISBN) {
    return res.status(400).json({
      message: "ISBN in path and body must match.",
    });
  }

  if (!isBookValid(book)) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const updated = await updateBookByISBN(ISBN, book);
    if (!updated) return res.status(404).end();

    res.status(200).json({
      ...updated.dataValues,
      price: parseFloat(updated.price),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unknown error" });
  }
};

// Retrieve book using ISBN
const getBookByISBN = async (req, res) => {
  const { ISBN } = req.params;
  try {
    const found = await findBookByISBN(ISBN);
    if (!found) return res.status(404).end();

    res.status(200).json({
      ...found.dataValues,
      price: parseFloat(found.price),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unknown error" });
  }
};

export { addBook, updateBook, getBookByISBN };
