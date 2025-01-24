import { decode } from "@msgpack/msgpack";
import dgram from "dgram";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { host, port, message } = await req.json();

    if (!host || !port || !message) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // MessagePackデータをデコード (オプション: 確認用)
    const messagePackData = Uint8Array.from(message); // JSON -> Uint8Array
    const decodedData = decode(messagePackData);
    console.log("Decoded MessagePack Data:", decodedData);

    // UDPでデータ送信
    const client = dgram.createSocket("udp4");
    client.send(messagePackData, port, host, (err) => {
      if (err) {
        console.error("Error sending to UDP server:", err);
        client.close();
        return NextResponse.json({ error: "Failed to send MessagePack" }, { status: 500 });
      }
      console.log(`MessagePack sent to ${host}:${port}`);
      client.close();
    });

    return NextResponse.json({success: true, message: "MessagePack message sent" });
  } catch (error) {
    console.error("Error processing MessagePack:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
