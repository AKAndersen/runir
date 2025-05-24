"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../lib/firebase";
import { ref, get } from "firebase/database";
import Link from "next/link";

type Video = {
  id: string;
  title: string;
  videoUrl: string;
  channelId: string;
  description?: string;
};

const extractYouTubeId = (url: string): string => {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : "";
};

export default function VideoWatchPage() {
  const { id } = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);

  useEffect(() => {
    if (!id) return;

    // Fetch the current video
    get(ref(db, `videos/${id}`)).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        setVideo({ id, ...data });
      }
    });
  }, [id]);

  useEffect(() => {
    if (!video?.channelId) return;

    // Fetch other videos from the same channel
    get(ref(db, "videos")).then((snapshot) => {
      const allVideos = snapshot.val();
      if (allVideos) {
        const related = Object.entries(allVideos)
          .map(([vid, val]: any) => ({ id: vid, ...val }))
          .filter((v) => v.channelId === video.channelId && v.id !== video.id);
        setRelatedVideos(related);
      }
    });
  }, [video]);

  if (!video) return <p className="p-6">Loading video...</p>;

  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">
      {/* Main Video */}
      <div className="md:col-span-2">
        <iframe
          src={`https://www.youtube.com/embed/${extractYouTubeId(video.videoUrl)}`}
          className="w-full h-[500px] rounded-lg"
          allowFullScreen
          allow="autoplay; encrypted-media"
          title={video.title}
        />
        <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
        <p className="text-sm text-gray-500 mb-2">
          Channel: {video.channelId}
        </p>
        {video.description && <p className="mb-4">{video.description}</p>}
      </div>

      {/* Related Videos */}
      <div>
        <h2 className="text-xl font-semibold mb-3">More from this channel</h2>
        <div className="space-y-4">
          {relatedVideos.map((v) => (
            <Link key={v.id} href={`/video/${v.id}`}>
              <div className="border rounded p-2 hover:bg-gray-100 transition">
                <video
                  src={v.videoUrl}
                  className="w-full h-32 object-cover mb-1"
                />
                <h3 className="text-sm font-semibold">{v.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
