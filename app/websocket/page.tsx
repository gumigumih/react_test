"use client";

import { useState } from "react";
import * as msgpack from "@msgpack/msgpack";

export default function Page() {
  const [host, setHost] = useState("127.0.0.1");
  const [port, setPort] = useState(12345);

  // MessagePackメッセージを準備して送信
  const sendMessagePackMessage = async () => {
    // C#の新しい型定義に基づいたデータ
    const message = [
      0,  // Unionタグ (0 = PropOperationParamEntity)
      1,  // instance_id
      Date.now(),  // time_stamp
      [1.0, 2.0, 3.0],  // position [X, Y, Z]
      [0.0, 0.0, 0.0],  // rotation [X, Y, Z]
      [1.0, 1.0, 1.0]   // scale [X, Y, Z]
    ];

    // MessagePackエンコード
    const messagePackData = msgpack.encode(message);

    try {
      const response = await fetch("/api/messagepack-websocket-send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // JSONで送信
        },
        body: JSON.stringify({
          host, // サーバーのホスト
          port, // サーバーのポート
          message: Array.from(new Uint8Array(messagePackData)), // MessagePackを送信
        }),
      });

      const result = await response.json();
      console.log("MessagePack Response:", result);
    } catch (error) {
      console.error("Error sending MessagePack message:", error);
    }
  };

  return (
    <div className="text-center p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl">Send MessagePack via Websocket</h1>

      <div className="my-4">
        <label className="block">Host:</label>
        <input
          type="text"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          className="border p-2"
        />
      </div>
      <div className="my-4">
        <label className="block">Port:</label>
        <input
          type="number"
          value={port}
          onChange={(e) => setPort(Number(e.target.value))}
          className="border p-2"
        />
      </div>

      <button
        onClick={sendMessagePackMessage}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Send MessagePack
      </button>
    </div>
  );
}
