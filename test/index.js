import { encode, decode } from "@msgpack/msgpack";
import { encrypt, decrypt } from "../src/index.js";


;(function() {
  let data = fs.readFileSync("data"); // buffer

  let decrypted = decrypt(data, API_KEY, API_IV);
  
  decrypted = decode(decrypted); // to object 
  console.log("decrypted", decrypted);

  decrypted = encode(decrypted); // to buffer 
  console.log("decrypted", decrypted);

  const encrypted = encrypt(decrypted, API_KEY, API_IV);
  console.log("encrypted", encrypted)
})();