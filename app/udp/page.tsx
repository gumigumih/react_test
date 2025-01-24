"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [host, setHost] = useState("127.0.0.1");
  const [port, setPort] = useState(12345);
  const [message, setMessage] = useState("Hello, UDP!");
  const [jsonContent, setJsonContent] = useState<string | null>(null);

  // JSONを保存して取得する
  const saveAndFetchJson = async () => {
    try {
      const response = await fetch("/api/save-json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();
      console.log("Saved JSON Response:", result);
      setJsonContent(JSON.stringify(result, null, 2)); // JSONを取得
    } catch (error) {
      console.error("Failed to save JSON:", error);
    }
  };

  // UDPメッセージを送信
  const sendUdpMessage = async () => {
    if (!jsonContent) {
      console.error("No JSON content to send via UDP");
      return;
    }

    try {
      const response = await fetch("/api/udp-send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ host, port, message: jsonContent }),
      });

      const result = await response.json();
      console.log("UDP Response:", result);
    } catch (error) {
      console.error("Error sending UDP message:", error);
    }
  };

  const saveJsonAndSendUdpMessage = async () => {
    await saveAndFetchJson();
    sendUdpMessage();
  };

  // ページロード時にJSONを保存
  useEffect(() => {
    saveAndFetchJson();
  }, []);

  return (
    <div className="text-center p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl">Save JSON & Send JSON via UDP</h1>
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
      <div className="my-4">
        <label className="block">Message:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(String(e.target.value))}
          className="border p-2"
        />
      </div>
      <button
        onClick={saveJsonAndSendUdpMessage}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Save JSON and Send UDP
      </button>
      {jsonContent && (
        <pre className="bg-gray-100 p-4 mt-4 border">
          <strong>Saved JSON:</strong>
          {jsonContent}
        </pre>
      )}
    </div>
  );
}
