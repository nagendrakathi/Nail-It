import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-0">
        <div className="h-[200px] flex flex-col justify-center relative z-10">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-medium text-black">{role}</h2>
                <p className="text-sm text-gray-900 mt-1">{topicsToFocus}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-4 max-w-full">
            <div className="text-sm sm:text-sm font-semibold text-white bg-black px-3 py-1 rounded-full whitespace-nowrap">
              Experience: {experience} {experience === 1 ? "Year" : "Years"}
            </div>
            <div className="text-sm sm:text-sm font-semibold text-white bg-black px-3 py-1 rounded-full whitespace-nowrap">
              {questions} Q&A
            </div>
            <div className="text-sm sm:text-sm font-semibold text-white bg-black px-3 py-1 rounded-full whitespace-nowrap">
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>

        {/* Decorative Blobs */}
        <div className="hidden md:flex w-[40vw] max-w-[400px] h-[200px] items-center justify-center absolute top-0 right-0 pointer-events-none overflow-visible">
          <div className="w-16 h-16 bg-lime-400 blur-[65px] animate-blob1 rounded-full" />
          <div className="w-16 h-16 bg-teal-400 blur-[65px] animate-blob2 rounded-full" />
          <div className="w-16 h-16 bg-cyan-300 blur-[45px] animate-blob3 rounded-full" />
          <div className="w-16 h-16 bg-fuchsia-200 blur-[45px] animate-blob4 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
