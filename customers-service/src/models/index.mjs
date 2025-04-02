import { sequelize } from '../config/db.mjs';
import { CustomerModel } from './customer.model.mjs';

// Define MODELS 
const Customer = CustomerModel(sequelize);

export { sequelize, Customer };
