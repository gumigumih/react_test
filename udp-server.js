const dgram = require("dgram");
const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
  console.log(`Message received: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on("error", (err) => {
  console.error(`Server error: ${err.stack}`);
  server.close();
});

server.on("listening", () => {
  const address = server.address();
  console.log(`Server listening on ${address.address}:${address.port}`);
});

// 12345ポートで受信
server.bind(12345, "0.0.0.0");
