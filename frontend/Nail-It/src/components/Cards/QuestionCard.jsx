import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/NailIt/components/AIResponsePreview";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExplained, setIsExplained] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExplained && contentRef.current) {
      setHeight(contentRef.current.scrollHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExplained]);

  const toggleExpand = () => setIsExplained((prev) => !prev);

  return (
    <div className="bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70 border border-gray-100/60 group transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
        {/* Question Section */}
        <div
          className="flex flex-1 items-start gap-3.5 w-full sm:w-0 min-w-0 cursor-pointer"
          onClick={toggleExpand}
        >
          <span className="text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px] flex-shrink-0">
            Q
          </span>
          <h3 className="text-sm md:text-base font-medium text-gray-800 break-words overflow-hidden text-ellipsis">
            {question}
          </h3>
        </div>

        {/* Buttons & Chevron */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-end gap-2 sm:gap-3">
          {/* Always-visible Buttons on small screens */}
          <div className="flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 sm:pointer-events-none sm:group-hover:pointer-events-auto transition-all duration-200">
            {/* Pin Button */}
            <button
              className="flex items-center gap-1 text-xs text-indigo-800 font-medium bg-indigo-50 px-3 py-1 rounded border border-indigo-50 hover:border-indigo-200 whitespace-nowrap"
              onClick={onTogglePin}
            >
              {isPinned ? <LuPinOff size={14} /> : <LuPin size={14} />}
              <span className="hidden md:inline">{isPinned ? "Unpin" : "Pin"}</span>
            </button>

            {/* Learn More */}
            <button
              className="flex items-center gap-1 text-xs text-cyan-800 font-medium bg-cyan-50 px-3 py-1 rounded border border-cyan-50 hover:border-cyan-200 whitespace-nowrap"
              onClick={() => {
                setIsExplained(true);
                onLearnMore();
              }}
            >
              <LuSparkles size={14} />
              <span className="hidden md:inline">Learn More</span>
            </button>
          </div>

          {/* Chevron Button */}
          <button
            className="text-gray-400 hover:text-gray-500 transition"
            onClick={toggleExpand}
          >
            <LuChevronDown
              size={20}
              className={`transition-transform duration-300 ${isExplained ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Answer Content */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div
          ref={contentRef}
          className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg"
        >
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
