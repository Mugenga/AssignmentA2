import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import { decodeJWT, isValidJWT } from './jwt-utils.mjs';

const app = express();
const PORT = process.env.PORT || 80;
const BACKEND_URL = process.env.URL_BASE_BACKEND_SERVICES;

app.use(express.json());

app.use((req, res, next) => {
    const clientType = req.headers['x-client-type'];
    if (!clientType) return res.status(400).json({ error: 'Missing X-Client-Type header' });

    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or malformed Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = decodeJWT(token);
    if (!isValidJWT(decoded)) return res.status(401).json({ error: 'Invalid JWT token' });

    req.clientType = clientType;
    req.user = decoded;
    next();
});

app.use('/books', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `${BACKEND_URL}/books${req.url}`,
            headers: { 'Content-Type': 'application/json' },
            data: req.body
        });

        let data = response.data;
        if (process.env.BFF_TYPE === 'mobile' && req.method === 'GET' && req.url.includes('isbn')) {
            if (data?.genre === 'non-fiction') data.genre = 3;
        }

        res.status(response.status).json(data);
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

app.use('/customers', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `${BACKEND_URL}/customers${req.url}`,
            headers: { 'Content-Type': 'application/json' },
            data: req.body
        });

        let data = response.data;
        if (process.env.BFF_TYPE === 'mobile') {
            const removeFields = obj => {
                delete obj.address;
                delete obj.address2;
                delete obj.city;
                delete obj.state;
                delete obj.zipcode;
                return obj;
            };
            if (Array.isArray(data)) data = data.map(removeFields);
            else if (typeof data === 'object') data = removeFields(data);
        }

        res.status(response.status).json(data);
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`BFF (${process.env.BFF_TYPE}) running on port ${PORT}`));
