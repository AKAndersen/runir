"use client";

import { useEffect, useState } from "react";
import { ref as dbRef, get, push, remove, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../lib/firebase";

interface MediaItem {
  id: string;
  title: string;
  imageUrl?: string;
  videoUrl?: string;
  creatorId: string;
  description?: string;
}

interface MediaAdminPanelProps {
  firebasePath: string; // e.g. "videos", "comics"
  label: string; // e.g. "Video", "Comic"
  fields: Array<"title" | "videoUrl" | "imageUrl" | "creatorId" | "description">;
  creatorLabel: string; // e.g. "Channel", "Series", "Artist", "Author"
  creatorPath: string; // e.g. "channels", "series", etc.
}

export default function MediaAdminPanel({ firebasePath, label, fields, creatorLabel, creatorPath }: MediaAdminPanelProps) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({});
const [creators, setCreators] = useState<Record<string, string>>({});


  useEffect(() => {
    get(dbRef(db, firebasePath)).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, value]: any) => ({
          id,
          ...value,
        }));
        setItems(list);
      }
    });

    get(dbRef(db, creatorPath)).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCreators(Object.keys(data));
      }
    });
  }, [firebasePath, creatorPath]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload = { ...form, createdAt: Date.now() };

    if (editingId) {
      await update(dbRef(db, `${firebasePath}/${editingId}`), payload);
      setEditingId(null);
    } else {
      await push(dbRef(db, firebasePath), payload);
    }

    setForm({});
    location.reload();
  };

  const handleEdit = (item: any) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    await remove(dbRef(db, `${firebasePath}/${id}`));
    setItems((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin: {label}s</h1>

      {/* Upload / Edit Form */}
      <div className="mb-10 space-y-4">
        {fields.map((field) => {
          if (field === "description") {
            return (
              <textarea
                key={field}
                name={field}
                value={form[field] || ""}
                onChange={handleChange}
                placeholder={field}
                className="w-full p-2 rounded bg-black/40 border"
              />
            );
          } else if (field === "creatorId") {
            return (
              <select
                key={field}
                name={field}
                value={form[field] || ""}
                onChange={handleChange}
                className="w-full p-2 rounded bg-black/40 border"
              >
                <option value="">Select {creatorLabel}</option>
                {creators.map((creator) => (
                  <option key={creator} value={creator}>{creator}</option>
                ))}
              </select>
            );
          } else if (field === "imageUrl") {
            return (
              <input
                key={field}
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const fileRef = storageRef(storage, `uploads/${Date.now()}_${file.name}`);
                  await uploadBytes(fileRef, file);
                  const downloadUrl = await getDownloadURL(fileRef);

                  setForm((prev: any) => ({ ...prev, imageUrl: downloadUrl }));
                }}
                className="w-full p-2 rounded bg-black/40 border text-white"
              />
            );
          } else {
            return (
              <input
                key={field}
                type="text"
                name={field}
                value={form[field] || ""}
                onChange={handleChange}
                placeholder={field}
                className="w-full p-2 rounded bg-black/40 border"
              />
            );
          }
        })}

        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Uploaded preview"
            className="mt-2 h-32 object-contain border rounded"
          />
        )}

        <button
          onClick={handleSubmit}
          className="bg-yellow-500 text-black px-6 py-2 rounded font-bold hover:bg-yellow-600"
        >
          {editingId ? `Update ${label}` : `Upload ${label}`}
        </button>
      </div>

      {/* Item List */}
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 border border-white/10 bg-white/5 rounded"
          >
            <h2 className="text-xl font-runir text-yellow-400">{item.title}</h2>
            {item.creatorId && (
              <p className="text-sm text-gray-400">{creatorLabel}: {item.creatorId}</p>
            )}
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-400 hover:text-blue-600"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-400 hover:text-red-600"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
