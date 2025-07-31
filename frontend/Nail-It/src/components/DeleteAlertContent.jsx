import React from "react";

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-4 sm:p-5">
      <p className="text-sm sm:text-[14px] text-gray-700">{content}</p>
      <div className="flex justify-end mt-4 sm:mt-6">
        <button
          type="button"
          className="btn-small w-full sm:w-auto" 
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
