import { sequelize } from '../config/db.mjs';
import { BookModel } from './book.model.mjs';

// Define MODELS 
const Book = BookModel(sequelize);

export { sequelize, Book };
