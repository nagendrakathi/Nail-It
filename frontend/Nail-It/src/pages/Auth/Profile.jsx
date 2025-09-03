import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import NavBar from "../../components/layouts/NavBar";

export default function Profile() {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <NavBar />
      <div className="mx-auto w-fit flex flex-col p-6">
        <div className="my-10 w-fit h-fit p-6 border-transparent shadow-md rounded-lg mt-10">
          <div className="m-10 flex flex-col items-center justify-center gap-6">
            <h2 className="text-2xl font-semibold mb-4">Profile</h2>
            <img
              src={user.profileImageUrl}
              alt="user_avatar"
              className="size-20"
            />
            <div className=" flex flex-col items- justify-center gap-3 text-gray-700">
              <p>
                <span className="font-semibold">Name: {user.name}</span>
              </p>
              <p>
                <span className="font-semibold">
                  Email:
                  {user.email}
                </span>
              </p>
              <p>
                <span className="font-semibold">
                  Member Since: {new Date(user.createdAt).toLocaleDateString()}
                </span>{" "}
              </p>
              <button></button>
              <div className="flex items-center gap-3 text-amber-600 font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 72 72"
                  className="size-4 fill-amber-600"
                >
                  <path d="M 35.078125 13.808594 C 34.033125 13.808594 32.990078 14.216344 32.205078 15.027344 L 14.591797 33.21875 C 13.090797 34.76975 13.090797 37.232203 14.591797 38.783203 L 32.205078 56.974609 C 33.743078 58.561609 36.275328 58.600453 37.861328 57.064453 C 39.448328 55.528453 39.489125 52.995203 37.953125 51.408203 L 23.03125 36 L 37.953125 20.591797 C 39.489125 19.004797 39.448328 16.472547 37.861328 14.935547 C 37.085328 14.183547 36.081125 13.808594 35.078125 13.808594 z M 54.535156 13.808594 C 53.490156 13.808594 52.445156 14.216344 51.660156 15.027344 L 34.046875 33.21875 C 32.545875 34.76975 32.545875 37.232203 34.046875 38.783203 L 51.660156 56.974609 C 53.198156 58.561609 55.730406 58.600453 57.316406 57.064453 C 58.903406 55.528453 58.944203 52.995203 57.408203 51.408203 L 42.488281 36 L 57.408203 20.591797 C 58.944203 19.004797 58.903406 16.472547 57.316406 14.935547 C 56.540406 14.183547 55.538156 13.808594 54.535156 13.808594 z"></path>
                </svg>
                <Link to={"/dashboard"}>Back to Dashboard</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="max-auto">
        <h2>You Sessions</h2>
        <div className="w-full px-3 py-4 md:py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 md:p-0">
            {sessions?.map((data, index) => (
              <div
                key={data?._id}
                className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {data?.role || "N/A"}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Topics to Focus:</strong>{" "}
                  {data?.topicsToFocus || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Experience:</strong> {data?.experience || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Questions:</strong> {data?.questions?.length || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Description:</strong> {data?.description || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Last Updated:</strong>{" "}
                  {data?.updatedAt
                    ? new Date(data.updatedAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div> 
      </div>*/}
    </div>
  );
}
