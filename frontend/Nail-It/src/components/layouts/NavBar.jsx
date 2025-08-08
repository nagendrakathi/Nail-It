import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-white/70 border-b border-gray-200/30 shadow-sm py-3 px-4 md:px-0">
      <div className="container mx-auto flex items-center justify-between gap-5 min-w-0">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 group"
          aria-label="Go to dashboard"
        >
          <h2 className="text-lg md:text-xl font-semibold text-black leading-5 transition-colors group-hover:text-[#FF9324]">
            Nail-It
          </h2>
        </Link>
        <ProfileInfoCard />
      </div>
    </header>
  );
};

export default NavBar;