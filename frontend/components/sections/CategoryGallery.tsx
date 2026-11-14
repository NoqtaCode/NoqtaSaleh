'use client';

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type GalleryImage = {
  _id: string;
  title?: string | null;
  imageUrl: string;
};

export default function CategoryGallery({ images, categoryTitle }: { images: GalleryImage[]; categoryTitle: string }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const slides = images.map((image, index) => ({
    src: image.imageUrl,
    alt: image.title || `${categoryTitle} — صورة ${index + 1}`,
  }));

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3">
        {images.map((image, index) => {
          const projectNumber = image.title?.match(/(\d{2})$/)?.[1] ?? String(index + 1).padStart(2, "0");
          return (
          <button
            key={image._id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`عرض صورة ${index + 1} من ${categoryTitle}`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-[#e5dfd1] text-right transition sm:rounded-2xl"
          >
            <Image
              src={image.imageUrl}
              alt={image.title || `${categoryTitle} — صورة ${index + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#25291f]/90 to-transparent px-3 pb-3 pt-10 text-xs font-bold text-white sm:px-5 sm:pb-5 sm:text-sm">
              <span>{image.title || categoryTitle}</span>
              <span className="rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[10px] backdrop-blur sm:text-xs">{projectNumber}</span>
            </span>
          </button>
          );
        })}
      </div>

      <Lightbox index={activeIndex} open={activeIndex >= 0} close={() => setActiveIndex(-1)} slides={slides} />
    </>
  );
}
