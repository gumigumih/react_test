import dgram from "dgram";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { host, port, message } = body;

    if (!host || !port || !message) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const client = dgram.createSocket("udp4");

    // 送信
    client.send(message, port, host, (err) => {
      if (err) {
        console.error("UDP Send Error:", err);
        client.close();
        return;
      }
      console.log(`Message sent to ${host}:${port}`);
      client.close();
    });

    return NextResponse.json({ success: true, message: "UDP message sent" });
  } catch (error) {
    console.error("UDP Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
