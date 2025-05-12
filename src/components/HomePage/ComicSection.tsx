"use client";

import Image from "next/image";
import gesturCover from "@/assets/gestur.png";
import gesturBg from "@/assets/Gestur-poster.png";
import gesturLogo from "@/assets/GesturLogo.png";

export default function ComicSection() {
  return (
    <section className="w-[110vw] relative py-24 px-6 -ml-4 text-white overflow-hidden">
      {/* Background */}
      <Image
        src={gesturBg}
        alt="Gestur Background"
        fill
        className="object-cover brightness-50 blur-md"
        quality={40}
        priority
      />

      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 max-w-[1200px] mx-auto">
        {/* Text Section */}
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold uppercase">
            Gestur Issue 1 Now For Sale
          </h2>
          <p className="text-lg leading-relaxed text-gray-100 max-w-xl">
            Dive into the darkly whimsical world of <em>Gestur</em>, where Icelandic trolls,
            twisted fairy tales, and Christian satire collide. This first issue kicks off
            a saga of mischief, myth, and moral tension—hand-drawn and packed with meaning.
          </p>
          <div className="flex flex-col">
            <a
              href="/store"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-md font-bold text-lg uppercase tracking-wide transition w-[125px]"
            >
              Shop Now
            </a>
            <h1 className="mt-8 mb-5">VISIT THE COMIC PAGE:</h1>
            <a href="/comic/gestur" className="w-[250px]">
              <Image src={gesturLogo} alt="Gestur Logo" />
            </a>
          </div>
        </div>

        {/* Image Section with Hover Animation */}
        <div className="flex-1 max-w-sm w-full mx-auto mt-12 lg:mt-0 transform transition duration-300 hover:scale-105 hover:-translate-y-1 animate-float">
          <Image
            src={gesturCover}
            alt="Gestur Comic Cover"
            className="rounded-lg shadow-2xl w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}
