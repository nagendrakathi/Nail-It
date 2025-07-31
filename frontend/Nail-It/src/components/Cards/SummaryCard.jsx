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
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none"
    >
      <div
        className="rounded-t-2xl px-4 py-4 relative"
        style={{ background: colors.bgcolor }}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md text-black text-lg font-semibold">
            {getInitials(role)}
          </div>

          <div className="flex-grow min-w-0">
            <h2 className="text-[18px] font-semibold text-black capitalize truncate">
              {role}
            </h2>
            <p className="text-sm text-black/70 mt-1 line-clamp-1">
              {topicsToFocus}
            </p>
          </div>
        </div>

        <button
          className="absolute top-3 right-3 flex md:hidden md:group-hover:flex items-center gap-1 text-xs text-rose-600 font-medium bg-rose-100 hover:bg-rose-200 px-2.5 py-1 rounded-full transition"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 size={14} />
          Delete
        </button>
      </div>

      <div className="px-4 pb-4 pt-3">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-[11px] font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
            Experience: {Math.max(0, experience)}{" "}
            {experience === 1 ? "Year" : "Years"}
          </span>
          <span className="text-[11px] font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
            {questions ?? 0} Q&A
          </span>
          <span className="text-[11px] font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
            Last Updated: {lastUpdated}
          </span>
        </div>

        <p className="text-[13px] text-gray-600 font-normal line-clamp-2 md:line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
