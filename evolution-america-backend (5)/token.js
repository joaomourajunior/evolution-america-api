// lib/token.js — token assinado simples (HMAC-SHA256), 100% biblioteca nativa do Node.
// Formato: base64url(payloadJSON) + "." + base64url(hmac)
const crypto = require('crypto');

const SECRET = process.env.TOKEN_SECRET || 'evolution-america-dev-secret-troque-em-producao';

function b64url(buf) {
  return Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function b64urlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64').toString('utf8');
}

function sign(payload, ttlMs = 1000 * 60 * 60 * 24 * 7) {
  const body = { ...payload, exp: Date.now() + ttlMs };
  const payloadB64 = b64url(JSON.stringify(body));
  const sig = crypto.createHmac('sha256', SECRET).update(payloadB64).digest();
  return payloadB64 + '.' + b64url(sig);
}

function verify(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [payloadB64, sigB64] = token.split('.');
  const expectedSig = b64url(crypto.createHmac('sha256', SECRET).update(payloadB64).digest());
  if (expectedSig !== sigB64) return null;
  let payload;
  try { payload = JSON.parse(b64urlDecode(payloadB64)); } catch (e) { return null; }
  if (!payload.exp || payload.exp < Date.now()) return null;
  return payload;
}

module.exports = { sign, verify };
