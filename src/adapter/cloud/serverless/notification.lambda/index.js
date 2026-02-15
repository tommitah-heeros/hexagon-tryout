const fs = require("fs");
const crypto = require("crypto");

exports.handler = async (event) => {
  console.log("Notificaton lambda called!");
  fs.writeFileSync(
    "./notification-output-file.txt",
    `notification ping ${crypto.randomUUID()}`,
  );
  return { statusCode: 200, body: JSON.stringify({ ok: true, event }) };
};
