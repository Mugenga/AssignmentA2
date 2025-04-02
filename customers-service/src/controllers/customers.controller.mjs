import {
  addCustomer,
  findCustomerById,
  findCustomerByUserId,
} from "../services/customers.service.mjs";
import { isValidCustomer, isEmailValid } from "../utils/validate.mjs";

// Create a new customer
const createCustomer = async (req, res) => {
  const customer = req.body;
  if (!isValidCustomer(customer)) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const [created, wasNew] = await addCustomer(customer);
    if (!wasNew) {
      return res
        .status(422)
        .json({ message: "This user ID already exists in the system." });
    }
    res.status(201).location(`/customers/${created.id}`).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unknown error" });
  }
};

// Get customer by id
const getCustomerById = async (req, res) => {
  const { id } = req.params;

  // Check if submitted id is valid
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ message: "Customer ID must be numeric." });
  }

  try {
    const customer = await findCustomerById(id);
    if (!customer) return res.status(404).end();
    res.status(200).json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unknown error" });
  }
};

// Fetch customers by user id
const getCustomerByUserId = async (req, res) => {
  const { userId } = req.query;

  // check if user id in request
  if (!userId) return res.status(400).json({ message: "Missing userId" });

  // check if userid is valid
  if (!isEmailValid(userId)) {
    return res.status(400).json({ message: "User id must be a valid email format" });
  }

  try {
    const customer = await findCustomerByUserId(userId);
    if (!customer) return res.status(404).end();
    res.status(200).json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unknown error" });
  }
};

export { createCustomer, getCustomerById, getCustomerByUserId };
