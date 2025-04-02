import express from 'express';

const router = express.Router();

// Status route to check if server is running.

router.get('/status', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send('OK');
});

export default router;
