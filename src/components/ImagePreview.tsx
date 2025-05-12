"use client";

import { useEffect, useState } from "react";

interface ImagePreviewProps {
  images: File[];
}
export const ImagePreview = ({ images }: ImagePreviewProps) => {
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const objectUrls = images.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  return (
    <div className="flex flex-wrap gap-2">
      {previews.map((src) => (
        <div key={src} className="relative h-32 w-32">
          <img
            src={src}
            alt={`preview-${src}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};
