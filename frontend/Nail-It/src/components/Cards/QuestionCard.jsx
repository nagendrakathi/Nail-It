import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";

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
    if (isExplained) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExplained]);

  const toggleExpand = () => {
    setIsExplained(!isExplained);
  };

  return (
    <div className="bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70 border border-gray-100/60 group">
      <div className="flex items-start justify-between cursor-pointer">
        <div className="flex itesm-start gap-3.5">
          <span className="text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px] ">Q</span>
          <h3 className="text-xs md:text-[14px] font-medium text-gray-800 mr-0 md:mr-20" onClick={toggleExpand}>
            {question}
          </h3>
        </div>
        <div className="flex items-center justify-end ml-4 relative ">
          <div
            className={`flex ${
              isExplained ? "md:flex" : "md:hidde group-hover:flex"
            }`}
          >
            <button className="flex items-center gap-2 text-xs text-indigo-800 font-medium bg-indigo-50 px-3 py-1 mr-2 rounded text-nowrap border border-indigo-50 hover:border-indigo-200 cursor-pointer" onClick={onTogglePin}>
              {isPinned ? <LuPinOff className="text-xs" /> : <LuPin className="text-xs" />}
            </button>
            <button
              className="flex items-center gap-2 text-xs text-cyan-800 font-medium bg-cyan-50 px-3 py-1 mr-2 rounded text-nowrap border border-cyan-50 hover:border-cyan-200 cursor-pointer"
              onClick={() => {
                setIsExplained(true);
                onLearnMore();
              }}
            >
              <LuSparkles />
              <span className="hidden md:block">Learn More</span>
            </button>
          </div>
          <button className="text-gray-400 hover:text-gray-500 cursor-pointer " onClick={toggleExpand}>
            <LuChevronDown
              size={20}
              className={`transform transition-transform duration-300 ${
                isExplained ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div 
        className="overflow-hidden transition-all duration-300 ease-in-out" 
        style={{ maxHeight: `${height}px` }}>
        <div 
            className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg" 
            ref={{ contentRef }}>

        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
