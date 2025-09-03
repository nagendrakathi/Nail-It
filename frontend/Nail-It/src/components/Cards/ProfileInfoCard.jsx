import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };
  return (
    user && (
      <Link to="/dashboard/profile" className="cursor-pointer">
        <div className="flex items-center hover:cursor-pointer gap-2">
          <img
            src={user.profileImageUrl}
            alt=""
            className="w-11 h-11 bg-gray-300 rounded-full"
          />
          <div>
            <div className="text-[15px] text-black font-bold leading-3">
              {user.name || ""}
            </div>
            {/* <button
              className="text-amber-600 text-sm font-semibold cursor-pointer underline"
              onClick={handleLogout}
            >
              Logout
            </button> */}
          </div>
        </div>
      </Link>
    )
  );
};

export default ProfileInfoCard;
