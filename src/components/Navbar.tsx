import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/runir.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#0e1422] text-gray-100 shadow-md sticky top-0 z-50">
      <nav className="relative grid grid-cols-3 items-center h-[6.5rem] px-4 sm:px-6 lg:px-8">
        {/* Nav links container - max width constraint */}
        <div className="hidden md:flex col-span-3 justify-between w-full max-w-[1400px] mx-auto">
          {/* Left nav links */}
          <div
            className="flex space-x-8 text-lg font-bold tracking-wide uppercase"
            style={{ fontFamily: "'Unica One', sans-serif" }}
          >
            <Link href="/videos" className="hover:text-yellow-400 transition">Videos</Link>
            <Link href="/comics" className="hover:text-yellow-400 transition">Comics</Link>
            <Link href="/music" className="hover:text-yellow-400 transition">Music</Link>
            <Link href="/articles" className="hover:text-yellow-400 transition">Articles</Link>
          </div>

          {/* Right nav links */}
          <div
            className="flex space-x-8 text-lg font-bold tracking-wide uppercase"
            style={{ fontFamily: "'Unica One', sans-serif" }}
          >
            <Link href="/store" className="hover:text-yellow-400 transition">Store</Link>
            <Link href="/about" className="hover:text-yellow-400 transition">About</Link>
            <Link href="/contact" className="hover:text-yellow-400 transition">Contact</Link>
            <Link href="/lounge" className="hover:text-yellow-400 transition">The Lounge</Link>
          </div>
        </div>

        {/* Center logo */}
        <div className="absolute left-1/2 -translate-x-1/2 -mb-20 z-50">
          <Link href="/">
            <Image
              src={logo}
              alt="Rúnir Logo"
              width={320}
              height={280}
              className="-mt-28 w-32 sm:w-40 md:w-52 lg:w-80 h-auto"
            />
          </Link>
        </div>

        {/* Mobile menu toggle (top-left) */}
        <div className="absolute top-4 left-4 md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div
          className="md:hidden bg-[#0e1422] px-4 pb-4 space-y-2 text-lg font-semibold uppercase tracking-wide"
          style={{ fontFamily: "'Unica One', sans-serif" }}
        >
          <Link href="/videos" className="block hover:text-yellow-400">Videos</Link>
          <Link href="/comics" className="block hover:text-yellow-400">Comics</Link>
          <Link href="/music" className="block hover:text-yellow-400">Music</Link>
          <Link href="/articles" className="block hover:text-yellow-400">Articles</Link>
          <Link href="/store" className="block hover:text-yellow-400">Store</Link>
          <Link href="/about" className="block hover:text-yellow-400">About</Link>
          <Link href="/contact" className="block hover:text-yellow-400">Contact</Link>
          <Link href="/lounge" className="block hover:text-yellow-400">The Lounge</Link>
        </div>
      )}
    </header>
  );
}
