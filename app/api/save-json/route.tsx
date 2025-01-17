import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const data = { message, timestamp: new Date().toISOString() };

    // JSONを保存
    const filePath = path.join(process.cwd(), "public", "helloworld.json");
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      message: "JSON saved successfully",
      data,
    });
  } catch (error) {
    console.error("Error saving JSON:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
