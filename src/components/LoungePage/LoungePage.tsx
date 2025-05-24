"use client";

import { useEffect, useRef, useState } from "react";
import { db } from "../../lib/firebase";
import {
  ref,
  push,
  onChildAdded,
  limitToLast,
  query,
  get,
} from "firebase/database";

type ChatMessage = {
  content: string;
  createdAt: number;
};

export default function LoungePage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const maxWords = 30;
  const wordCount = input.trim().split(/\s+/).filter(Boolean).length;
  const wordsLeft = maxWords - wordCount;

  useEffect(() => {
    const messagesRef = query(ref(db, "lounge-messages"), limitToLast(50));

    get(messagesRef).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.values(data) as ChatMessage[];
        setMessages(list);
      }
    });

    onChildAdded(messagesRef, (snapshot) => {
      const msg = snapshot.val() as ChatMessage;
      if (msg?.content) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    // Declare audio inside the effect and reuse it in cleanup
    const audioEl = audioRef.current;

    const updateState = () => {
      if (audioEl) {
        setIsPlaying(!audioEl.paused);
      }
    };

    if (audioEl) {
      audioEl.addEventListener("play", updateState);
      audioEl.addEventListener("pause", updateState);
    }

    return () => {
      if (audioEl) {
        audioEl.removeEventListener("play", updateState);
        audioEl.removeEventListener("pause", updateState);
      }
    };
  }, []);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || wordCount > maxWords) return;

    push(ref(db, "lounge-messages"), {
      content: trimmed,
      createdAt: Date.now(),
    });

    setInput("");
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden">
      {/* 🔥 Fireplace Background Video */}
      <video
        className="fixed top-0 left-0 w-screen h-screen object-cover -z-10"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/fireplace.mp4" type="video/mp4" />
      </video>

      {/* 🎵 Background Music */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* 🎚 Music Toggle Button */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <button
          onClick={toggleMusic}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded shadow-md transition mt-50"
        >
          {isPlaying ? "Enjoy the silence" : "Start Music 🎵"}
        </button>
      </div>

      {/* 💬 Chat UI */}
      <div className="relative z-10 flex flex-col justify-end items-center w-full h-full bg-black/25 p-8">
        {/* Comment List */}
        <div className="w-full max-w-xl mb-8 space-y-2 overflow-y-auto max-h-[400px]">
          {messages.slice(-6).map((msg, i) => (
            <div
              key={msg.createdAt + i}
              className="text-white text-2xl text-center transition-opacity duration-1000"
            >
              {msg.content}
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="w-full max-w-xl text-center">
          <h2 className="text-white text-xl mb-2 font-semibold uppercase tracking-wide">
            Speak freely.
          </h2>
          <div className="flex flex-col items-center gap-2">
            <div className="flex w-full items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  const words = e.target.value
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean);
                  if (words.length <= maxWords) {
                    setInput(e.target.value);
                  }
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Say something..."
                className="flex-1 px-4 py-2 border border-white bg-black/30 text-white placeholder-white/60 rounded-md focus:outline-none"
              />
              <button
                onClick={handleSubmit}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md font-bold"
              >
                Post
              </button>
            </div>
            <p
              className={`text-sm ${
                wordsLeft < 5 ? "text-yellow-400" : "text-white/60"
              }`}
            >
              {wordsLeft} {wordsLeft === 1 ? "word" : "words"} left
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
