// File: /pages/admin/index.tsx
"use client";

import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-6 text-white">
      <h1 className="text-4xl font-bold mb-10 font-runir text-yellow-400">
        Admin Dashboard
      </h1>

      <div className="grid gap-6">
        <AdminLink href="/admin/videos" label="📹 Manage Videos" />
        <AdminLink href="/admin/comics" label="📚 Manage Comics" />
        <AdminLink href="/admin/music" label="🎵 Manage Music" />
        <AdminLink href="/admin/articles" label="✍️ Manage Articles" />
      </div>
    </div>
  );
}

function AdminLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block bg-white/5 border border-white/10 rounded-lg px-6 py-4 hover:bg-white/10 transition text-xl font-medium"
    >
      {label}
    </Link>
  );
}
