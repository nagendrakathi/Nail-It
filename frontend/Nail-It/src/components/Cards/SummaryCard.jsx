import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
      className="bg-white border border-gray-300/40 rounded-xl overflow-hidden group cursor-pointer transition-shadow duration-200 hover:shadow-xl relative"
    >
      {/* Header with background color */}
      <div
        className="rounded-t-xl px-4 py-4 relative"
        style={{ background: colors.bgcolor }}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center shadow text-black text-lg font-semibold">
            {getInitials(role)}
          </div>

          <div className="flex-grow">
            <h2 className="text-[17px] font-medium text-black capitalize">
              {role}
            </h2>
            <p className="text-xs text-black/80 mt-1">{topicsToFocus}</p>
          </div>
        </div>

        {/* Delete button */}
        <button
          className="absolute top-3 right-3 hidden group-hover:flex items-center gap-1 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded border border-rose-100 hover:border-rose-200 transition"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 size={14} />
        </button>
      </div>

      {/* Footer section */}
      <div className="px-4 pb-4 pt-2">
        {/* Info badges */}
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="text-[10px] font-medium text-black px-3 py-1 border border-gray-900 rounded-full">
            Experience: {Math.max(0, experience)}{" "}
            {experience === 1 ? "Year" : "Years"}
          </span>
          <span className="text-[10px] font-medium text-black px-3 py-1 border border-gray-900 rounded-full">
            {questions ?? 0} Q&A
          </span>
          <span className="text-[10px] font-medium text-black px-3 py-1 border border-gray-900 rounded-full">
            Last Updated: {lastUpdated}
          </span>
        </div>

        {/* Description */}
        <p className="text-[12px] text-gray-600 font-medium mt-3 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
