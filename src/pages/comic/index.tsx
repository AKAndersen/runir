"use client";

import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../lib/firebase";
import Link from "next/link";

interface Chapter {
  id: string;
  title: string;
  imageUrl: string;
  seriesId: string;
}

export default function ComicListPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [seriesMap, setSeriesMap] = useState<Record<string, string>>({});

  useEffect(() => {
    get(ref(db, "chapters")).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, value]: any) => ({
          id,
          ...value,
        }));
        setChapters(list);
      }
    });
  }, []);

  useEffect(() => {
  get(ref(db, "series")).then((snapshot) => {
    const data = snapshot.val();
    if (data) {
      const map: Record<string, string> = {};
      Object.entries(data).forEach(([id, value]: any) => {
        map[id] = value.title || id;
      });
      setSeriesMap(map);
    }
  });
}, []);

  return (
    <div className="bg-black min-h-screen text-white pt-24">
      <div className="bg-white/10 py-6 shadow-inner">
        <div className="max-w-[1400px] mx-auto px-6">
          <h1 className="text-4xl font-runir tracking-wide text-yellow-400">Comics</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-10">
        {chapters.length === 0 ? (
          <p className="text-center text-gray-400">No chapters uploaded yet.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {chapters.map((chapter) => (
              <Link key={chapter.id} href={`/comic/${chapter.id}`}>

                <div className="group border border-white/10 rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 transition">
                  <img
                    src={chapter.imageUrl}
                    alt={chapter.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold font-runir group-hover:text-yellow-400">
                      {chapter.title}
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                     Series: <span className="text-white">{seriesMap[chapter.seriesId] || chapter.seriesId}</span>

                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
