import React from "react";

const SkeletonLine = ({ width = "w-full", height = "h-3", rounded = "rounded", bgColor = "bg-gray-200", darkBgColor = "dark:bg-gray-700" }) => (
  <div className={`${height} ${bgColor} ${rounded} ${darkBgColor} ${width}`}></div>
);

const SkeletonBlock = ({ children, className = "" }) => (
  <div className={`bg-gray-100 dark:bg-gray-700 rounded p-4 space-y-2 ${className}`}>
    {children}
  </div>
);

const SkeletonLoader = () => {
  return (
    <>
      <section
        role="status"
        aria-label="Loading content"
        className="animate-pulse space-y-4 max-w-3xl"
      >
        {/* Title */}
        <SkeletonLine height="h-6" width="w-1/2" rounded="rounded-md" />

        {/* Paragraph Lines */}
        <div className="space-y-2">
          <SkeletonLine width="w-full" />
          <SkeletonLine width="w-11/12" />
          <SkeletonLine width="w-10/12" />
          <SkeletonLine width="w-9/12" />
        </div>

        {/* Smaller text block */}
        <SkeletonBlock>
          <SkeletonLine height="h-2.5" width="w-3/4" bgColor="bg-gray-300" />
          <SkeletonLine height="h-2.5" width="w-2/3" bgColor="bg-gray-300" />
          <SkeletonLine height="h-2.5" width="w-1/2" bgColor="bg-gray-300" />
        </SkeletonBlock>
      </section>

      <section
        role="status"
        aria-label="Loading additional content"
        className="animate-pulse space-y-4 max-w-3xl mt-10"
      >
        {/* Header */}
        <SkeletonLine height="h-4" width="w-1/2" rounded="rounded-md" />

        {/* Paragraphs group 1 */}
        <div className="space-y-2">
          <SkeletonLine width="w-full" />
          <SkeletonLine width="w-11/12" />
          <SkeletonLine width="w-10/12" />
          <SkeletonLine width="w-9/12" />
        </div>

        {/* Paragraphs group 2 */}
        <div className="space-y-2">
          <SkeletonLine width="w-full" />
          <SkeletonLine width="w-11/12" />
          <SkeletonLine width="w-10/12" />
          <SkeletonLine width="w-9/12" />
        </div>

        {/* Smaller text block */}
        <SkeletonBlock>
          <SkeletonLine height="h-2.5" width="w-3/4" bgColor="bg-gray-300" />
          <SkeletonLine height="h-2.5" width="w-1/2" bgColor="bg-gray-300" />
        </SkeletonBlock>

        {/* Subheader */}
        <SkeletonLine height="h-4" width="w-1/2" rounded="rounded-md" className="mt-8" />

        {/* Final paragraph */}
        <div className="space-y-2">
          <SkeletonLine width="w-full" />
          <SkeletonLine width="w-11/12" />
          <SkeletonLine width="w-10/12" />
          <SkeletonLine width="w-9/12" />
        </div>
      </section>
    </>
  );
};

export default SkeletonLoader;
