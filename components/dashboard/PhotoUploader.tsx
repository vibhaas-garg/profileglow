"use client";

import React, { useRef, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { AlertCircle, X, Loader2, ShieldCheck } from "lucide-react";

interface PhotoUploaderProps {
  photos: string[];
  onChange: (urls: string[]) => void;
}

// Fast client-side image compression: converts to crisp, optimized 1200px JPEG in <100ms
async function processAndCompressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = (err) => reject(err);
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => {
        // Fallback to raw data url if image decode fails
        resolve(e.target?.result as string);
      };
      img.onload = () => {
        const maxWidth = 1200;
        const maxHeight = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        // Draw and compress to 82% quality JPEG (perfect for Vision AI and instant upload)
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
        resolve(dataUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ photos, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (photos.length + files.length > 6) {
      setUploadError("Maximum 6 photos allowed. Please select fewer files.");
      return;
    }

    setUploadError(null);
    setUploading(true);

    try {
      const newUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.type.startsWith("image/")) {
          throw new Error(`File ${file.name} is not an image`);
        }
        if (file.size > 15 * 1024 * 1024) {
          throw new Error(`File ${file.name} exceeds 15MB limit`);
        }

        // Process instantly on client device
        const compressedUrl = await processAndCompressImage(file);
        newUrls.push(compressedUrl);
      }

      onChange([...photos, ...newUrls]);
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || "Failed to process photo.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemovePhoto = (index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-black text-ink uppercase tracking-wider">
            Profile Photos ({photos.length}/6)
          </label>
          <p className="text-xs font-medium text-muted">
            Upload the actual photos from your dating profile (lead photo first).
          </p>
        </div>
        {photos.length > 0 && (
          <Badge variant="lime">{photos.length} uploaded</Badge>
        )}
      </div>

      {uploadError && (
        <div className="p-3 bg-pink/50 border border-ink rounded-xl text-xs font-bold text-ink flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-ink shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Grid of uploaded thumbnails + add slot */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((url, index) => (
          <div
            key={index}
            className="relative aspect-[3/4] rounded-xl border-2 border-ink overflow-hidden shadow-brutal-sm group bg-card"
          >
            <img
              src={url}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-ink text-white font-black text-[10px] rounded-md shadow-sm">
              #{index + 1}{index === 0 ? " (Lead)" : ""}
            </div>
            <button
              type="button"
              onClick={() => handleRemovePhoto(index)}
              className="absolute top-2 right-2 w-6 h-6 bg-orange text-white border border-ink rounded-full flex items-center justify-center text-xs font-black opacity-90 hover:opacity-100 transition-opacity shadow-sm cursor-pointer"
              title="Remove photo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        {photos.length < 6 && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="aspect-[3/4] rounded-xl border-2 border-dashed border-ink/60 bg-bg hover:bg-card hover:border-ink transition-colors flex flex-col items-center justify-center gap-2 p-4 text-center cursor-pointer disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="w-6 h-6 text-purple animate-spin" />
                <span className="text-xs font-black text-ink">Processing...</span>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-lime border border-ink flex items-center justify-center font-black text-lg">
                  +
                </div>
                <span className="text-xs font-black text-ink">Add Photo</span>
                <span className="text-[10px] text-muted">JPG, PNG, WebP</span>
              </>
            )}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => {
            onChange([
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80"
            ]);
          }}
          className="text-xs font-black text-purple hover:underline cursor-pointer"
        >
          + Load sample photos for quick test
        </button>
        {photos.length > 0 && (
          <button
            type="button"
            onClick={() => onChange([])}
            className="text-xs font-bold text-muted hover:text-ink cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Strict Privacy Guarantee Box */}
      <div className="p-3.5 bg-card border-2 border-ink rounded-xl shadow-brutal-xs flex items-start gap-2.5">
        <span className="text-sm font-black text-ink select-none leading-none mt-0.5">*</span>
        <div className="text-[11px] font-medium text-ink leading-relaxed">
          <span className="font-black text-ink">Privacy Guarantee:</span> We will not save, store permanently, or use your photos for AI model training or any other purpose. Your images are processed securely in real-time solely to create your makeover report and remain 100% private.
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};
