"use client";

import React from "react";

type SectionGridPageProps<T> = {
  title: string;
  featuredBanner?: {
    imageUrl: string;
    label: string;
  };
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

export default function SectionGridPage<T>({
  title,
  featuredBanner,
  items,
  renderItem,
}: SectionGridPageProps<T>) {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Optional Featured Banner */}
      {featuredBanner && (
        <>
          <div className="bg-black py-6 shadow-md">
            <div className="max-w-[1200px] mx-auto px-6 py-2">
              <h1 className="text-4xl font-runir tracking-wide text-white">
                Featured Creator
              </h1>
            </div>
          </div>

          <div className="relative w-full mx-auto">
            <img
              src={featuredBanner.imageUrl}
              alt=""
              className="w-full object-cover h-[30rem]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white text-8xl font-runir text-center drop-shadow-lg">
                {featuredBanner.label}
              </h1>
            </div>
          </div>
        </>
      )}

      {/* Section Title */}
      <div className="bg-black shadow-md m-auto mt-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-4xl font-runir tracking-wide text-white">
            {title}
          </h1>
        </div>
      </div>

      {/* Content Grid */}
      <div className="bg-white">
      <div className="max-w-[1200px] mx-auto px-6 mt-10 mb-12">
        {items.length === 0 ? (
          <p className="text-center text-gray-400">No content available yet.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {items.map(renderItem)}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
