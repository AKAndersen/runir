import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { ref, get } from "firebase/database";

interface Chapter {
  id: string;
  title: string;
  imageUrl: string;
  seriesId: string;
  pageUrls: string[];
}

export default function ChapterReaderPage() {
  const router = useRouter();
  const { id } = router.query;

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [seriesTitle, setSeriesTitle] = useState<string>("");

  useEffect(() => {
    if (!id) return;
    get(ref(db, `chapters/${id}`)).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        setChapter({ id: id as string, ...data });
        get(ref(db, `series/${data.seriesId}`)).then((seriesSnap) => {
          const seriesData = seriesSnap.val();
          if (seriesData?.title) {
            setSeriesTitle(seriesData.title);
          }
        });
      }
    });
  }, [id]);

  return (
    <div className="bg-black min-h-screen text-white pt-20 px-4">
      {!chapter ? (
        <p className="text-center mt-20 text-gray-400">Loading chapter...</p>
      ) : (
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-runir text-yellow-400 mb-4 text-center">
            {seriesTitle} — {chapter.title}
          </h1>

          {chapter?.pageUrls?.length ? (
            <div className="flex flex-col gap-6">
              {chapter.pageUrls.map((url, idx) => (
                <img key={idx} src={url} alt={`Page ${idx + 1}`} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">No pages found.</p>
          )}
        </div>
      )}
    </div>
  );
}
