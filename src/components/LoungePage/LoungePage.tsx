"use client";

import { useEffect, useRef, useState } from "react";
import { db } from "../../lib/firebase";
import {
  ref,
  push,
  onChildAdded,
  limitToLast,
  query,
} from "firebase/database";

export default function LoungePage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [fadeIndex, setFadeIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const messagesRef = query(ref(db, "lounge-messages"), limitToLast(6));
    onChildAdded(messagesRef, (snapshot) => {
      const msg = snapshot.val();
      setMessages((prev) => {
        const next = [...prev, msg];
        if (next.length > 6) {
          setFadeIndex(0);
          setTimeout(() => {
            setMessages(next.slice(1));
            setFadeIndex(null);
          }, 1000);
        }
        return next;
      });
    });

    const audio = audioRef.current;
    const tryPlay = () => {
      audio?.play().catch(() => {});
    };

    const updateState = () => {
      if (!audio) return;
      setIsPlaying(!audio.paused);
    };

    // Listen to audio events
    audio?.addEventListener("play", updateState);
    audio?.addEventListener("pause", updateState);
    window.addEventListener("click", tryPlay);

    return () => {
      audio?.removeEventListener("play", updateState);
      audio?.removeEventListener("pause", updateState);
      window.removeEventListener("click", tryPlay);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.paused ? audio.play() : audio.pause();
  };

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    push(ref(db, "lounge-messages"), trimmed);
    setInput("");
  };

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden">
      {/* 🔥 Fireplace Video */}
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

      {/* 🎚 Toggle Button */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <button
          onClick={toggleMusic}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded shadow-md transition mt-80"
        >
          {isPlaying ? "Enjoy the silence" : "Start Music 🎵"}
        </button>
      </div>

      {/* 💬 Chat Overlay */}
      <div className="relative z-10 flex flex-col justify-end items-center w-full h-full bg-black/25 p-8">
        <div className="w-full max-w-xl mb-8 space-y-2 overflow-y-auto max-h-90">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`text-white text-2xl text-center transition-opacity duration-1000 ${
                i === fadeIndex ? "opacity-0" : "opacity-100"
              }`}
            >
              {msg}
            </div>
          ))}
        </div>

        <div className="w-full max-w-xl text-center">
          <h2 className="text-white text-xl mb-2 font-semibold uppercase tracking-wide">
            Speak freely.
          </h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
        </div>
      </div>
    </div>
  );
}
