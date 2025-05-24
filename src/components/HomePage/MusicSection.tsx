"use client";

import Image from "next/image";
import { useState } from "react";
import albumArt from "../../assets/hljod.png";
import vinyl from "../../assets/vinyl.png";

export default function MusicSection() {
  const [hover, setHover] = useState(false);

  return (
    <section className="relative py-24 px-6 text-white bg-[#0e0e0e] overflow-hidden">
      {/* Header */}
      <div className="text-center mb-16">
        <h3 className="text-sm tracking-widest text-yellow-600 uppercase mb-2">
          Music
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold uppercase">
          New Music Release: Echoes of the North
        </h2>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 text-left">
        {/* Left: Track List */}
        <div className="flex-1 space-y-6">
          <ul className="list-disc list-inside text-lg text-gray-200 leading-relaxed space-y-1">
            <li>01. Into the Fjord</li>
            <li>02. Hymn for the Forgotten</li>
            <li>03. Ashes and Oak</li>
            <li>04. The White Flame</li>
            <li>05. Northhugr (Instrumental)</li>
          </ul>

    
        </div>

        {/* Right: Album with Vinyl Hover Effect */}
        <div
          className="relative max-w-lg w-full group"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* Vinyl (animated on hover) */}
          <div
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform origin-center ${
              hover
                ? "translate-x-[-4rem] opacity-100 rotate-[360deg]"
                : "translate-x-[-6rem] opacity-0 rotate-0"
            }`}
          >
            <Image
              src={vinyl}
              alt="Vinyl Record"
              width={400}
              height={400}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Album Art */}
          <Image
            src={albumArt}
            alt="Album Cover"
            className={`relative z-10 rounded-lg shadow-2xl w-full transition-transform duration-300 ${
              hover ? "scale-105" : ""
            }`}
            priority
          />
        </div>
      </div>

      {/* Bottom: OUT NOW */}
      <div className="relative z-10 text-center mt-20">
        <p className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-md font-bold text-lg uppercase tracking-wider shadow-lg">
          Out Now!
        </p>
      </div>
    </section>
  );
}
