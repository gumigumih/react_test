const net = require("net");

// TCP サーバーの作成
const server = net.createServer((socket) => {
  console.log(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`);

  // データを受信したときの処理
  socket.on("data", (data) => {
    console.log(`Message received: ${data} from ${socket.remoteAddress}:${socket.remotePort}`);
  });

  // クライアントが切断したときの処理
  socket.on("end", () => {
    console.log(`Client disconnected: ${socket.remoteAddress}:${socket.remotePort}`);
  });

  // エラー処理
  socket.on("error", (err) => {
    console.error(`Socket error: ${err.message}`);
  });
});

// サーバーのエラー処理
server.on("error", (err) => {
  console.error(`Server error: ${err.message}`);
});

// サーバーが開始したときの処理
server.on("listening", () => {
  const address = server.address();
  console.log(`Server listening on ${address.address}:${address.port}`);
});

// 12345ポートで受信
server.listen(12345, "0.0.0.0");
