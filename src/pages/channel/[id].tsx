"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../lib/firebase";
import { get, ref } from "firebase/database";
import Link from "next/link";

type Channel = {
  title: string;
  imageUrl: string;
  description?: string;
};

type Video = {
  id: string;
  title: string;
  videoUrl: string;
  channelId: string;
  description?: string;
};

export default function ChannelPage() {
  const router = useRouter();
  const { id } = router.query;
  const [channel, setChannel] = useState<Channel | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    // Fetch channel info
    get(ref(db, `channels/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setChannel(snapshot.val());
      }
    });

    // Fetch videos
    get(ref(db, "videos")).then((snapshot) => {
      const all = snapshot.val();
      if (all) {
        const list = Object.entries(all)
          .map(([vid, val]: any) => ({ id: vid, ...val }))
          .filter((v) => v.channelId === id);
        setVideos(list);
      }
      setLoading(false);
    });
  }, [id]);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Channel Banner */}
      <div className="w-full py-6 shadow-inner bg-white">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center gap-6">
          {/* Channel Image */}
          <img
            src={channel?.imageUrl || "/fallback-banner.jpg"}
            alt="Channel Banner"
            className="w-[45vw] h-[50vh] object-cover rounded-lg"
          />
          {/* Channel Info */}
          <div>
            <h1 className="text-4xl font-runir tracking-wide text-yellow-400">
              {channel?.title || id}
            </h1>
            <p className="text-gray-400 mt-2">{channel?.description}</p>
          </div>
        </div>
      </div>

      {/* All Videos Label */}
      <div className="bg-yellow-400 text-black py-3 text-center font-semibold text-lg mt-6">
        All videos by {channel?.title || id}
      </div>

      {/* Video Grid */}
      <div className="max-w-[1400px] mx-auto px-6 mt-10">
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : videos.length === 0 ? (
          <p className="text-center text-gray-500">
            No videos in this channel yet.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {videos.map((video) => (
              <div key={video.id} className="space-y-2">
                <Link href={`/video/${video.id}`}>
                  <div className="group border border-white/10 rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 transition">
                    <video
                      src={video.videoUrl}
                      className="w-full h-48 object-cover"
                      muted
                      autoPlay
                      loop
                      playsInline
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-bold font-runir group-hover:text-yellow-400">
                        {video.title}
                      </h2>
                    </div>
                  </div>
                </Link>
                <p className="text-sm text-gray-400">
                  Channel:{" "}
                  <Link
                    href={`/channel/${video.channelId}`}
                    className="text-white underline hover:text-yellow-400"
                  >
                    {video.channelId}
                  </Link>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
