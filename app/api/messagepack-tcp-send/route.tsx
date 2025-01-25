import { decode } from "@msgpack/msgpack";
import net from "net";
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

    // TCPソケットを作成
    const client = new net.Socket();

    client.connect(port, host, () => {
      console.log(`Connected to TCP server at ${host}:${port}`);
      client.write(Buffer.from(messagePackData)); // データを送信
    });

    client.on("data", (data) => {
      console.log("Response from server:", data.toString());
      client.destroy(); // 接続を閉じる
    });

    client.on("close", () => {
      console.log("Connection closed");
    });

    client.on("error", (err) => {
      console.error("TCP Client Error:", err);
    });

    return NextResponse.json({success: true, message: "MessagePack message sent" });
  } catch (error) {
    console.error("Error processing MessagePack:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
