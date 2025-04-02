import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { sequelize } from './models/index.mjs';

import bookRoutes from './routes/books.routes.mjs';
import statusRoute from './routes/status.routes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Import routes
app.use('/books', bookRoutes);
app.use('/', statusRoute);


// For unhandled/default error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Unknown error.' });
});


// Create database first then start server on port.
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
