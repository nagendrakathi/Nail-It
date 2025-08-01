import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/apiPaths";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  // Helper: always use correct HTTPS absolute image URL
  const getProfileImageUrl = (url) => {
    if (!url) return ""; // No image, will render blank or fallback
    if (url.startsWith("/")) {
      // Relative path: build absolute using BASE_URL
      return BASE_URL + url;
    }
    // Absolute: force to HTTPS in case backend gave http://
    return url.replace(/^http:\/\//, "https://");
  };

  return (
    user && (
      <div className="flex items-center">
        <img
          src={getProfileImageUrl(user.profileImageUrl)}
          alt=""
          className="w-11 h-11 bg-gray-300 rounded-full mr-3"
        />
        <div>
          <div className="text-[15px] text-black font-bold leading-3">
            {user.name || ""}
          </div>
          <button
            className="text-amber-600 text-sm font-semibold cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;
