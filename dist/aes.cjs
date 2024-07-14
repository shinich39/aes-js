'use strict';

var CryptoJS = require('crypto-js');

// function pad(buffer, blockSize) {
//   const size = blockSize - buffer.length % blockSize;
//   return Buffer.concat([buffer, Buffer.alloc(size, size)]);
// }

/**
 *
 * @param {Buffer} buffer
 * @param {string} key utf8
 * @param {string} iv utf8
 * @returns {Buffer}
 */
function encrypt(buffer, key, iv) {
  let data = Buffer.from(buffer, "hex");
  data = data.toString("hex");
  data = CryptoJS.enc.Hex.parse(data);
  key = Buffer.from(key).toString("hex");
  key = CryptoJS.enc.Hex.parse(key);
  iv = Buffer.from(iv).toString("hex");
  iv = CryptoJS.enc.Hex.parse(iv);

  const cipher = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  let result = cipher.toString(); // base64
  result = Buffer.from(result, "base64");

  return result;
}

/**
 *
 * @param {Buffer} buffer buffer
 * @param {string} key utf8
 * @param {string} iv utf8
 * @returns {Buffer}
 */
function decrypt(buffer, key, iv) {
  let data = Buffer.from(buffer);
  data = data.toString("base64");
  key = Buffer.from(key).toString("hex");
  key = CryptoJS.enc.Hex.parse(key);
  iv = Buffer.from(iv).toString("hex");
  iv = CryptoJS.enc.Hex.parse(iv);

  const cipher = CryptoJS.AES.decrypt(data, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  let result = cipher.toString(CryptoJS.enc.Hex);
  result = Buffer.from(result, "hex");

  return result;
}

exports.decrypt = decrypt;
exports.encrypt = encrypt;
