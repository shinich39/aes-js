import fs from "node:fs";
import { encode, decode } from "@msgpack/msgpack";
import { encrypt, decrypt } from "../dist/aes.mjs";


;(function() {
  let data = fs.readFileSync("data"); // buffer

  let decrypted = decrypt(data, KEY, IV);
  
  decrypted = decode(decrypted); // to object 
  console.log("decrypted", decrypted);

  decrypted = encode(decrypted); // to buffer 
  console.log("decrypted", decrypted);

  const encrypted = encrypt(decrypted, KEY, IV);
  console.log("encrypted", encrypted)
})();