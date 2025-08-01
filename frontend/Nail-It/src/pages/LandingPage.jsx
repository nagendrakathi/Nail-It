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
      <div className="w-full min-h-full bg-[#FFFCEF] relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-amber-200/20 blur-[65px] rounded-full pointer-events-none"
        ></div>

        <div className="container mx-auto px-6 pt-6 pb-[200px] relative z-10 max-w-7xl">
          <header className="flex flex-row justify-between items-center gap-4 mb-16">
            <div className="text-xl font-bold text-black flex-shrink-0">Nail-It</div>
            <div className="flex items-center gap-3">
              {user ? (
                <ProfileInfoCard />
              ) : (
                <button
                  aria-label="Login or Sign Up"
                  className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-5 py-2.5 rounded-full hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-500 transition hover:cursor-pointer"
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
                your way. From preparation to mastery - your ultimate toolkit
                is here.
              </p>
              <button
                aria-label="Get Started"
                className="self-start bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black hover:cursor-pointer"
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
          <div className="container mx-auto px-6 pt-10 pb-20 max-w-7xl">
            <section className="mt-5">
              <h2 className="text-2xl font-medium text-center mb-12">
                Features That Make You Shine
              </h2>
              <div className="flex flex-col items-center gap-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg transition border border-amber-100"
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
                      className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg transition border border-amber-100"
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
            <div className="text-sm text-secondary text-center p-5 mt-5">
              By Nagendra K 🧢
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
