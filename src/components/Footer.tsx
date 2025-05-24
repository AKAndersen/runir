import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0e0e0e] text-white py-12 px-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-runir text-[#f1b400] mb-2">Runir Studio</h2>
          <p className="text-gray-400 text-sm">
            Stories from the North. Art. Culture. Music. Comics.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Explore</h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li><Link href="/videos" className="hover:text-[#f1b400]">Videos</Link></li>
            <li><Link href="/comics" className="hover:text-[#f1b400]">Comics</Link></li>
            <li><Link href="/music" className="hover:text-[#f1b400]">Music</Link></li>
            <li><Link href="/articles" className="hover:text-[#f1b400]">Articles</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Connect</h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f1b400]">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#f1b400]">Twitter</a></li>
            <li><a href="mailto:contact@runir.com" className="hover:text-[#f1b400]">Email Us</a></li>
          </ul>
        </div>

        {/* Store / Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-2">More</h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li><Link href="/store" className="hover:text-[#f1b400]">Store</Link></li>
            <li><Link href="/about" className="hover:text-[#f1b400]">About</Link></li>
            <li><Link href="/contact" className="hover:text-[#f1b400]">Contact</Link></li>
            <li><Link href="/lounge" className="hover:text-[#f1b400]">The Lounge</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10 pt-6 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Runir Studio. All rights reserved.
      </div>
    </footer>
  );
}
