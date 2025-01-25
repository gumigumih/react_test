import { decode } from "@msgpack/msgpack";
import WebSocket from "ws";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { host, port, message } = await req.json();

    if (!host || !port || !message) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // MessagePackデータを準備
    const messagePackData = Uint8Array.from(message); // JSON -> Uint8Array
    const decodedData = decode(messagePackData);
    console.log("Decoded MessagePack Data:", decodedData);

    // WebSocket クライアントを作成
    const ws = new WebSocket(`ws://${host}:${port}`);

    ws.on("open", () => {
      console.log(`Connected to WebSocket server at ws://${host}:${port}`);
      ws.send(messagePackData); // データを送信
    });

    ws.on("message", (data) => {
      console.log("Response from server:", data.toString());
      ws.close(); // 接続を閉じる
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });

    ws.on("error", (err) => {
      console.error("WebSocket Client Error:", err);
    });

    return NextResponse.json({ success: true, message: "MessagePack message sent via WebSocket" });
  } catch (error) {
    console.error("Error processing WebSocket MessagePack:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
