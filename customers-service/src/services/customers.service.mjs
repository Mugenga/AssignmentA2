import { Customer } from "../models/index.mjs";

// New customer
export const addCustomer = async (customer) => {
  const [created, wasNew] = await Customer.findOrCreate({
    where: { userId: customer.userId },
    defaults: customer,
  });
  return [created, wasNew];
};

// Get customer by id
export const findCustomerById = async (id) => {
  return await Customer.findByPk(id);
};

export const findCustomerByUserId = async (userId) => { // Get customer by userid
  return await Customer.findOne({ where: { userId } });
};
