"use client";

import { useState } from "react";
import * as msgpack from "@msgpack/msgpack";

export default function Page() {
  const [host, setHost] = useState("127.0.0.1");
  const [port, setPort] = useState(12345);

  const [unionTag, setUnionTag] = useState(0);
  const [instanceId, setInstanceId] = useState(1);
  const [position, setPosition] = useState({ x: 1.5, y: 2.0, z: 3.0 });
  const [rotation, setRotation] = useState({ x: 0.0, y: 0.0, z: 0.0 });
  const [scale, setScale] = useState({ x: 1.0, y: 1.0, z: 1.0 });

  // MessagePackメッセージを準備して送信
  const sendMessagePackMessage = async () => {
    // C#の新しい型定義に基づいたデータ
    const message = [
      0,  // Unionタグ (0 = PropOperationParamEntity)
      [
        instanceId,  // instance_id
        Date.now(),  // time_stamp
        [position.x, position.y, position.z],  // position [X, Y, Z]
        [rotation.x, rotation.y, rotation.z],  // rotation [X, Y, Z]
        [scale.x, scale.y, scale.z]   // scale [X, Y, Z]
      ]
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

      <div className="my-4 flex justify-center items-center space-x-3">
        <label>Host:</label>
        <input
          type="text"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          className="border p-2"
        />
        <label>Port:</label>
        <input
          type="number"
          value={port}
          onChange={(e) => setPort(Number(e.target.value))}
          className="border p-2"
        />
      </div>
      <div className="my-4 flex justify-center items-center space-x-3">
        <label>UnionTag:</label>
        <input
          type="number"
          value={unionTag}
          onChange={(e) => setUnionTag(Number(e.target.value))}
          className="border p-2"
        />
      </div>
      <div className="my-4 flex justify-center items-center space-x-3">
        <label>InstanceId:</label>
        <input
          type="number"
          value={instanceId}
          onChange={(e) => setInstanceId(Number(e.target.value))}
          className="border p-2"
        />
      </div>
      <div className="my-4 flex justify-center items-center space-x-3">
        <p>Position:</p>
        <label>x</label>
        <input
          type="number"
          step="any"
          value={position.x}
          onChange={(e) => setPosition({ ...position, x: parseFloat(e.target.value) || 0 })}
          className="border p-2 w-20"
        />
        <label>y</label>
        <input
          type="number"
          step="any"
          value={position.y}
          onChange={(e) => setPosition({ ...position, y: parseFloat(e.target.value) || 0 })}
          className="border p-2 w-20"
        />
        <label>z</label>
        <input
          type="number"
          step="any"
          value={position.z}
          onChange={(e) => setPosition({ ...position, z: parseFloat(e.target.value) || 0 })}
          className="border p-2 w-20"
        />
      </div>
      <div className="my-4 flex justify-center items-center space-x-3">
        <p>Rotation:</p>
        <label>x</label>
        <input
          type="number"
          step="any"
          value={rotation.x}
          onChange={(e) => setRotation({ ...rotation, x: parseFloat(e.target.value) || 0 })}
          className="border p-2 w-20"
        />
        <label>y</label>
        <input
          type="number"
          step="any"
          value={rotation.y}
          onChange={(e) => setRotation({ ...rotation, y: parseFloat(e.target.value) || 0 })}
          className="border p-2 w-20"
        />
        <label>z</label>
        <input
          type="number"
          step="any"
          value={rotation.z}
          onChange={(e) => setRotation({ ...rotation, z: parseFloat(e.target.value) || 0 })}
          className="border p-2 w-20"
        />
      </div>
      <div className="my-4 flex justify-center items-center space-x-3">
        <p>Scale:</p>
        <label>x</label>
        <input
          type="number"
          step="any"
          value={scale.x}
          onChange={(e) => setScale({ ...scale, x: parseFloat(e.target.value) || 0 })}
          className="border p-2 w-20"
        />
        <label>y</label>
        <input
          type="number"
          step="any"
          value={scale.y}
          onChange={(e) => setScale({ ...scale, y: parseFloat(e.target.value) || 0 })}
          className="border p-2 w-20"
        />
        <label>z</label>
        <input
          type="number"
          step="any"
          value={scale.z}
          onChange={(e) => setScale({ ...scale, z: parseFloat(e.target.value) || 0 })}
          className="border p-2 w-20"
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
