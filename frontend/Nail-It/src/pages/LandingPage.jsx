import React, { useContext, useState } from "react";
import HERO_IMG from "../assets/hero-image.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="w-full min-h-full bg-[#FFFCEF] relative overflow-hidden ">
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-amber-200/20 blur-[65px] rounded-full pointer-events-none"
        ></div>

        <div className="w-full mx-5 px-10 pt-6 pb-[200px] relative z-10">
          <header className="flex flex-row justify-between items-center gap-4 mb-16">
            <div className="text-xl font-bold text-black flex-shrink-0">
              Nail-It
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <ProfileInfoCard />
              ) : (
                <button
                  aria-label="Login or Sign Up"
                  className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer hover:scale-[1.009] hover:shadow-lg hover:bg-gradient-to-r hover:from-[#FF9324] hover:to-[#e99a4b]"
                  onClick={() => {
                    setCurrentPage("login");
                    setOpenAuthModal(true);
                  }}
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="w-full">
              <div className="flex items-center mb-2">
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  <LuSparkles aria-hidden="true" /> AI Powered
                </div>
              </div>
              <h1 className="text-5xl font-medium mb-6 leading-tight text-black">
                Check your Learning and Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>
            <div className="w-full flex flex-col justify-start mt-12 ms:mt-0">
              <p className="text-[17px] text-gray-900 mb-6">
                Get skill and role-specific questions, expand answers when you
                need them, dive deeper into concepts, and organize everything
                your way. From preparation to mastery - your ultimate toolkit is
                here.
              </p>
              <button
                aria-label="Get Started"
                className="w-fit bg-black text-sm font-semibold text-white px-7 py-3 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full relative z-10">
        <section className="flex items-center justify-center -mt-36 px-6">
          <img
            src={HERO_IMG}
            alt="Hero Image"
            className="w-full max-w-[80vw] rounded-lg object-cover"
          />
        </section>
        <div className="w-full min-h-full bg-[#FFFCEF] mt-10">
          <div className="w-full mx-auto px-6 pt-10 pb-20 max-w-7xl">
            <section className="mt-5">
              <h2 className="text-2xl font-medium text-center mb-12">
                Features That Make You Shine
              </h2>
              <div className="flex flex-col items-center gap-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg transition border border-amber-100 cursor-pointer"
                    >
                      <h3 className="text-base font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  {APP_FEATURES.slice(3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg transition border border-amber-100 cursor-pointer"
                    >
                      <h3 className="text-base font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <div className="text-sm text-secondary text-center p-5 mt-5 flex flex-col justify-center items-center gap-1">
               <span>By <a href="https://github.com/nagendrakathi" target="_blank" className="cursor-pointer">Nagendra K 🧢</a></span>
              <div className="">
                <a href="https://github.com/nagendrakathi/Nail-It" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 32 32"
                    className="size-6 hover:fill-gray-400 transition-all duration-500 inline-block"
                  >
                    <path
                      d="M 16 4 C 9.371094 4 4 9.371094 4 16 C 4 21.300781 7.4375 25.800781 12.207031 27.386719 C 12.808594 27.496094 13.027344 27.128906 13.027344 26.808594 C 13.027344 26.523438 13.015625 25.769531 13.011719 24.769531 C 9.671875 25.492188 8.96875 23.160156 8.96875 23.160156 C 8.421875 21.773438 7.636719 21.402344 7.636719 21.402344 C 6.546875 20.660156 7.71875 20.675781 7.71875 20.675781 C 8.921875 20.761719 9.554688 21.910156 9.554688 21.910156 C 10.625 23.746094 12.363281 23.214844 13.046875 22.910156 C 13.15625 22.132813 13.46875 21.605469 13.808594 21.304688 C 11.144531 21.003906 8.34375 19.972656 8.34375 15.375 C 8.34375 14.0625 8.8125 12.992188 9.578125 12.152344 C 9.457031 11.851563 9.042969 10.628906 9.695313 8.976563 C 9.695313 8.976563 10.703125 8.65625 12.996094 10.207031 C 13.953125 9.941406 14.980469 9.808594 16 9.804688 C 17.019531 9.808594 18.046875 9.941406 19.003906 10.207031 C 21.296875 8.65625 22.300781 8.976563 22.300781 8.976563 C 22.957031 10.628906 22.546875 11.851563 22.421875 12.152344 C 23.191406 12.992188 23.652344 14.0625 23.652344 15.375 C 23.652344 19.984375 20.847656 20.996094 18.175781 21.296875 C 18.605469 21.664063 18.988281 22.398438 18.988281 23.515625 C 18.988281 25.121094 18.976563 26.414063 18.976563 26.808594 C 18.976563 27.128906 19.191406 27.503906 19.800781 27.386719 C 24.566406 25.796875 28 21.300781 28 16 C 28 9.371094 22.628906 4 16 4 Z"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
