"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Link, X, GripVertical, Loader2, AlertCircle } from "lucide-react";
import { adminFetch } from "@/lib/adminFetch";

export default function ImageUploader({ images = [], onChange, propertyId }) {
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);
  const [broken, setBroken] = useState({});
  const fileRef = useRef(null);

  async function uploadFiles(files) {
    setUploading(true);
    setError("");
    const uploaded = [];

    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append("file", file);
      if (propertyId) form.append("propertyId", String(propertyId));

      const res = await adminFetch("/api/admin/upload-image", {
        method: "POST",
        body: form,
        headers: {},
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur upload");
        break;
      }
      uploaded.push(data.url);
    }

    if (uploaded.length) onChange([...images, ...uploaded]);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  function addUrl() {
    const url = urlInput.trim();
    if (!url.startsWith("http")) {
      setError("URL invalide");
      return;
    }
    if (images.includes(url)) {
      setError("Image déjà ajoutée");
      return;
    }
    onChange([...images, url]);
    setUrlInput("");
    setError("");
  }

  function remove(index) {
    onChange(images.filter((_, i) => i !== index));
  }

  function setCover(index) {
    if (index === 0) return;
    const next = [...images];
    const [item] = next.splice(index, 1);
    next.unshift(item);
    onChange(next);
  }

  const handleDragStart = (e, i) => {
    setDragIndex(i);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, i) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === i) return;
    const next = [...images];
    const [item] = next.splice(dragIndex, 1);
    next.splice(i, 0, item);
    setDragIndex(i);
    onChange(next);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
    setDragOver(false);
    setDragIndex(null);
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl cursor-pointer py-8 px-4 transition-all duration-200 select-none ${
          dragOver
            ? "border-[#C9A84C] bg-[#C9A84C08]"
            : "border-gray-200 hover:border-[#C9A84C55] hover:bg-gray-50"
        }`}
      >
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={(e) => uploadFiles(e.target.files)}
        />
        {uploading ? (
          <>
            <Loader2 size={28} className="text-[#C9A84C] animate-spin" />
            <p className="text-sm text-gray-500">Téléchargement en cours…</p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-xl bg-[#0D2340] flex items-center justify-center">
              <Upload size={20} className="text-[#C9A84C]" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-[#0D2340]">
                Glissez des photos ici ou cliquez pour choisir
              </p>
              <p className="text-xs text-gray-400 mt-1">
                JPG, PNG, WebP · max 5 MB · plusieurs images autorisées
              </p>
            </div>
          </>
        )}
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Link
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="url"
            placeholder="Ou collez une URL d'image (https://...)"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] outline-none transition"
          />
        </div>
        <button
          type="button"
          onClick={addUrl}
          className="px-4 py-2.5 text-sm font-medium rounded-xl bg-[#0D2340] text-white hover:bg-[#132d50] active:scale-95 transition-all"
        >
          Ajouter
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {images.length > 0 && (
        <div>
          <p className="text-xs text-gray-400 mb-2">
            {images.length} image{images.length > 1 ? "s" : ""} · glissez pour
            réorganiser · la 1ère est la photo principale
          </p>
          <div className="grid grid-cols-3 gap-3">
            {images.map((src, i) => (
              <div
                key={`${src}-${i}`}
                draggable
                onDragStart={(e) => handleDragStart(e, i)}
                onDragOver={(e) => handleDragOver(e, i)}
                onDragEnd={() => setDragIndex(null)}
                className={`relative group rounded-xl overflow-hidden aspect-square border-2 transition-all duration-150 cursor-grab active:cursor-grabbing ${
                  i === 0 ? "border-[#C9A84C]" : "border-transparent"
                } ${dragIndex === i ? "opacity-50 scale-95" : ""}`}
              >
                {!broken[i] ? (
                  <Image
                    src={src}
                    alt={`Photo ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="200px"
                    onError={() => setBroken((b) => ({ ...b, [i]: true }))}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                    Erreur
                  </div>
                )}
                {i === 0 && (
                  <div className="absolute top-1.5 left-1.5 text-[9px] font-bold bg-[#C9A84C] text-[#0D2340] px-1.5 py-0.5 rounded-full tracking-wide uppercase">
                    Principale
                  </div>
                )}
                <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-lg p-1">
                  <GripVertical size={12} className="text-white" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-end justify-center pb-2 gap-1.5">
                  {i !== 0 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCover(i);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-semibold bg-[#C9A84C] text-[#0D2340] px-2 py-1 rounded-full"
                    >
                      Principale
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(i);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
