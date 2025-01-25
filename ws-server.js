const WebSocket = require("ws");

// WebSocketサーバーを作成
const wss = new WebSocket.Server({ port: 12345 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  // クライアントからのメッセージを受信
  ws.on("message", (message) => {
    console.log("Message received:", message);

    // クライアントにレスポンスを送信
    ws.send("Message received successfully");
  });

  // クライアントが切断した場合
  ws.on("close", () => {
    console.log("Client disconnected");
  });

  // エラー処理
  ws.on("error", (err) => {
    console.error("WebSocket Server Error:", err);
  });
});

console.log("WebSocket server started on ws://localhost:12345");
