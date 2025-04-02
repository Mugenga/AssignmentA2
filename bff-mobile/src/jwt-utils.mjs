import { Buffer } from 'buffer';

export function decodeJWT(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const payload = Buffer.from(parts[1], 'base64').toString('utf8');
        return JSON.parse(payload);
    } catch (err) {
        return null;
    }
}

export function isValidJWT(decoded) {
    if (!decoded) return false;
    const validSubs = ['starlord', 'gamora', 'drax', 'rocket', 'groot'];
    const now = Math.floor(Date.now() / 1000);
    return decoded.sub && validSubs.includes(decoded.sub) &&
           decoded.iss === 'cmu.edu' && decoded.exp && decoded.exp > now;
}
