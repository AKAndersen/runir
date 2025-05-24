"use client";

import { useEffect, useState } from "react";
import { ref as dbRef, get, push } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../lib/firebase";
import { v4 as uuidv4 } from "uuid";

export default function AdminComicsPage() {
  const [seriesList, setSeriesList] = useState<{ id: string; title: string }[]>([]);
  const [form, setForm] = useState({
    seriesId: "",
    title: "",
    coverImageFile: null as File | null,
    pages: [] as File[],
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    get(dbRef(db, "series")).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, value]: any) => ({
          id,
          title: value.title || id,
        }));
        setSeriesList(list);
      }
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, coverImageFile: e.target.files![0] }));
    }
  };

  const handlePages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setForm((prev) => ({ ...prev, pages: Array.from(files) }));
    }
  };

  const handleUpload = async () => {
    if (!form.seriesId || !form.title || !form.pages.length || !form.coverImageFile) {
      alert("Please fill all fields including cover image");
      return;
    }
    setUploading(true);
    try {
      const coverPath = `comics/${form.seriesId}/${form.title}/cover-${uuidv4()}-${form.coverImageFile.name}`;
      const coverRef = storageRef(storage, coverPath);
      await uploadBytes(coverRef, form.coverImageFile);
      const coverImageUrl = await getDownloadURL(coverRef);

      const uploadPromises = form.pages.map(async (file) => {
        const path = `comics/${form.seriesId}/${form.title}/${uuidv4()}-${file.name}`;
        const fileRef = storageRef(storage, path);
        await uploadBytes(fileRef, file);
        return getDownloadURL(fileRef);
      });

      const pageUrls = await Promise.all(uploadPromises);

      const newChapter = {
        title: form.title,
        imageUrl: coverImageUrl,
        seriesId: form.seriesId,
        pageUrls,
        createdAt: Date.now(),
      };

      await push(dbRef(db, "chapters"), newChapter);
      alert("✅ Chapter uploaded");
      setForm({ seriesId: "", title: "", coverImageFile: null, pages: [] });
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 text-white">
      <h1 className="text-3xl mb-6 font-bold">Admin: Upload Comic Chapter</h1>

      <label className="block mb-2">Select Series</label>
      <select
        name="seriesId"
        value={form.seriesId}
        onChange={handleChange}
        className="w-full p-2 rounded bg-black border mb-4"
      >
        <option value="">-- Select --</option>
        {seriesList.map((s) => (
          <option key={s.id} value={s.id}>{s.title}</option>
        ))}
      </select>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Chapter Title"
        className="w-full p-2 mb-4 rounded bg-black border"
      />

      <label className="block mb-2 bg-black">Upload Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverImage}
          className="w-full mb-4 bg-black"
        />

      {form.coverImageFile && (
        <div className="mb-4">
          <p className="text-sm mb-1">Cover Preview:</p>
          <img
            src={URL.createObjectURL(form.coverImageFile)}
            alt="Cover Preview"
            className="w-32 h-auto border"
          />
        </div>
      )}

      <label className="block mb-2 bg-black">Upload Pages</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handlePages}
        className="w-full mb-4 bg-black"
      />

      {form.pages.length > 0 && (
        <div className="mb-4">
          <p className="text-sm mb-1">Pages Selected:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {form.pages.map((file, idx) => (
              <div key={idx} className="border p-2 bg-black/20">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Page ${idx + 1}`}
                  className="w-full h-auto max-h-48 object-contain"
                />
                <p className="text-xs mt-1 text-gray-300">{file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-yellow-500 px-6 py-2 rounded font-bold text-black hover:bg-yellow-600"
      >
        {uploading ? "Uploading..." : "Upload Chapter"}
      </button>
    </div>
  );
}
