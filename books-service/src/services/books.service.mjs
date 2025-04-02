import { Book } from "../models/index.mjs";

const newBook = async (book) => {
  // Create a new book
  const [created, isNew] = await Book.findOrCreate({
    where: { ISBN: book.ISBN },
    defaults: book,
  });
  return [created, isNew];
};

const updateBookByISBN = async (ISBN, updatedFields) => {
  const book = await Book.findByPk(ISBN);
  if (!book) return null;
  await book.update(updatedFields);
  return book;
};

const findBookByISBN = async (ISBN) => {
  return await Book.findByPk(ISBN);
};

export { newBook, updateBookByISBN, findBookByISBN };
