const { generateKey, randomBytes } = require("node:crypto");

randomBytes(256, (err, buf) => {
  if (err) throw err;
  console.log(`${buf.length} bytes of random data: ${buf.toString("hex")}`);
});
