import express from 'express';
import {
  createCustomer,
  getCustomerById,
  getCustomerByUserId
} from '../controllers/customers.controller.mjs';

const router = express.Router();

// Routes to handle customer management
router.post('/', createCustomer); // create a new customer
router.get('/:id', getCustomerById); // get single customer by id
router.get('/', getCustomerByUserId);  // get customer by user id

export default router;
