const crypto = require("crypto");

function generateKey() {
  return crypto.randomBytes(32); // 256 bits
}

function computeHMAC(message, key) {
  const hmac = crypto.createHmac("sha256", key);
  hmac.update(message);
  return hmac.digest("hex").toUpperCase();
}

module.exports = { generateKey, computeHMAC };
