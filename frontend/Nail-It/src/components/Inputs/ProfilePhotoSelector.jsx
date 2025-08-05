import React, { useRef, useState, useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [internalPreviewUrl, setInternalPreviewUrl] = useState(null);

  // Revoke object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (internalPreviewUrl) {
        URL.revokeObjectURL(internalPreviewUrl);
      }
    };
  }, [internalPreviewUrl]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const objectUrl = URL.createObjectURL(file);

      // Revoke previous if exists
      if (internalPreviewUrl) {
        URL.revokeObjectURL(internalPreviewUrl);
      }

      if (setPreview) {
        setPreview(objectUrl);
      }
      setInternalPreviewUrl(objectUrl);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (setPreview) {
      setPreview(null);
    }
    if (internalPreviewUrl) {
      URL.revokeObjectURL(internalPreviewUrl);
      setInternalPreviewUrl(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  const displaySrc = preview ?? internalPreviewUrl;

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
        aria-label="Choose profile photo"
      />
      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-orange-50 rounded-full relative cursor-pointer">
          <LuUser className="text-4xl text-orange-500" aria-hidden="true" />
          <button
            type="button"
            aria-label="Upload profile photo"
            className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-orange-500/85 to-orange-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={displaySrc}
            alt="Profile photo"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
            type="button"
            aria-label="Remove profile photo"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
