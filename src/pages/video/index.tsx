"use client";

import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../lib/firebase";
import Link from "next/link";
import SectionGridPage from "../../components/SectionGridPage";

type Video = {
  id: string;
  title: string;
  videoUrl: string;
  channelId: string;
};

const extractYouTubeId = (url: string): string => {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : "";
};

export default function VideoListPage() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    get(ref(db, "videos")).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, value]: any) => ({
          id,
          ...value,
        }));
        setVideos(list);
      }
    });
  }, []);

  return (
    <SectionGridPage
      title="All Videos"
      featuredBanner={{
        imageUrl:
          "https://images.squarespace-cdn.com/content/v1/680824d60443f73c1d919cfb/27f8f89a-f6aa-4268-9a7b-74903f22367a/Still+2025-04-17+181402_3.117.1.jpg?format=1000w",
        label: "NORTHHUGR",
      }}
      items={videos}
      renderItem={(video) => (
        <Link key={video.id} href={`/video/${video.id}`}>
          <div className="group border border-blue rounded-lg overflow-hidden bg-black hover:bg-black/90 transition mt-12">
            {/* Thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${extractYouTubeId(video.videoUrl)}/hqdefault.jpg`}
              alt={video.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 bg-blue">
              <h2 className="text-lg font-bold font-runir group-hover:text-yellow-400">
                {video.title}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Channel:{" "}
                <Link
                  href={`/channel/${video.channelId}`}
                  className="text-white underline hover:text-yellow-400"
                >
                  {video.channelId}
                </Link>
              </p>
            </div>
          </div>
        </Link>
      )}
    />
  );
}
