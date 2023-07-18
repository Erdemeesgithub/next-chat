import { configureAbly, useChannel } from "@ably-labs/react-hooks";
import { useState } from "react";
import axios from "axios";

configureAbly({
  key: "bkfaTw.m4eClg:QbKhJEPJ4rz4yv4vVMLjDgwzh0RFAqdnHXP2yYoaRHQ",
  clientId: Date.now() + "",
});

export default function Home() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const [channel] = useChannel("public-chat", (message) => {
    setMessages((prev) => [...prev, message]);
  });

  async function sendMessage() {
    channel.publish("message", { text, date: Date.now() });
    setText("");
  }
  return (
    <main>
      {messages.map((message) => (
        <div class="chat chat-start">
          <div class="chat-bubble">{message.data.text}</div>
        </div>
      ))}
      <textarea
        className="textarea textarea-primary"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button type="button" className="btn" onClick={sendMessage}>
        Send
      </button>
    </main>
  );
}
