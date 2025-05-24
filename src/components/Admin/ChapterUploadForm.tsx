"use client";

import { useEffect, useState, useCallback } from "react";
import { db } from "../../lib/firebase";
import { ref, get, push } from "firebase/database";
import { useDropzone } from "react-dropzone";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableImage({ file, index, onDelete }: { file: File; index: number; onDelete: (index: number) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id: file.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-black/20 border border-white/10 p-2 rounded relative"
    >
      <img
        src={URL.createObjectURL(file)}
        alt={`Page ${index + 1}`}
        className="w-full h-48 object-contain"
      />

      {/* Drag Handle */}
      <button
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        className="absolute top-1 left-1 text-xs bg-white/20 px-2 py-1 rounded cursor-move"
        title="Drag to reorder"
      >
        ☰
      </button>

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(index);
        }}
        className="absolute top-1 right-1 text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
        title="Delete"
      >
        ✕
      </button>

      <div className="text-xs text-white mt-2 truncate">{file.name}</div>
    </div>
  );
}

export default function ChapterUploadForm() {
  type Series = { id: string; title: string };
    const [seriesList, setSeriesList] = useState<Series[]>([]);

  const [form, setForm] = useState({
    title: "",
    seriesId: "",
    imageUrl: "",
    pages: [] as File[],
  });

useEffect(() => {
  get(ref(db, "series")).then((snapshot) => {
    const data = snapshot.val();
    if (data) {
      const list = Object.entries(data).map(([id, value]: any) => ({
        id,
        title: value.title || id, // fallback to id if no title
      }));
      setSeriesList(list);
    }
  });
}, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setForm((prev) => ({ ...prev, pages: [...prev.pages, ...acceptedFiles] }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (index: number) => {
    const updated = [...form.pages];
    updated.splice(index, 1);
    setForm((prev) => ({ ...prev, pages: updated }));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = form.pages.findIndex((f) => f.name === active.id);
      const newIndex = form.pages.findIndex((f) => f.name === over.id);
      setForm((prev) => ({ ...prev, pages: arrayMove(prev.pages, oldIndex, newIndex) }));
    }
  };

  const handleSubmit = async () => {
    if (!form.seriesId || !form.title || !form.imageUrl || form.pages.length === 0) {
      alert("Please fill in all fields.");
      return;
    }

    const pageNames = form.pages.map((file) => file.name);

    const newChapter = {
      title: form.title,
      seriesId: form.seriesId,
      imageUrl: form.imageUrl,
      pageNames,
      createdAt: Date.now(),
    };

    try {
      await push(ref(db, "chapters"), newChapter);
      alert("✅ Chapter uploaded successfully!");
      setForm({ title: "", seriesId: "", imageUrl: "", pages: [] });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to upload chapter.");
    }
  };

  return (
    <div className="space-y-4">
 <select
  name="seriesId"
  value={form.seriesId}
  onChange={handleInputChange}
  className="w-full p-2 rounded bg-black/40 border"
>
  <option value="">Select Series</option>
  {seriesList.map((s) => (
    <option key={s.id} value={s.id}>
      {s.title}
    </option>
  ))}
</select>

      <input
        name="title"
        value={form.title}
        onChange={handleInputChange}
        placeholder="Chapter Title"
        className="w-full p-2 rounded bg-black/40 border"
      />

      <input
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleInputChange}
        placeholder="Cover Image URL"
        className="w-full p-2 rounded bg-black/40 border"
      />

      <div
        {...getRootProps()}
        className="w-full p-6 border border-dashed rounded bg-black/40 text-center cursor-pointer hover:border-yellow-400"
      >
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop pages here...</p> : <p>Drag & drop pages here, or click to select</p>}
      </div>

      {form.pages.length > 0 && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={form.pages.map((f) => f.name)} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {form.pages.map((file, index) => (
                <SortableImage key={file.name} file={file} index={index} onDelete={handleDelete} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <button
        onClick={handleSubmit}
        className="bg-yellow-500 text-black px-6 py-2 rounded font-bold hover:bg-yellow-600"
      >
        Upload Chapter
      </button>
    </div>
  );
}
