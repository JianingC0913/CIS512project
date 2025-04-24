import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/icons/logo.svg";

const instructions = [
  " This app helps you create your character by selecting different outfits.",
  " After building the character, you can generate a unique story for your character.",
  " You can also tweak your stories based on differnt App vibes for quick sharing.",
  " Let's start bringing your character alive!",
];

export default function HomePage() {
  const [stage, setStage] = useState(-1);
  const [typedText, setTypedText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentText = instructions[stage];
    if (stage >= 0 && stage < instructions.length && currentText) {
      setTypedText("");
      setIsTyping(true); // start typing lock
      let index = 0;
      const interval = setInterval(() => {
        if (index < currentText.length) {
          setTypedText((prev) => prev + currentText.charAt(index));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false); // done typing, unlock
          if (stage === instructions.length - 1) {
            setShowButton(true);
          }
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [stage]);

  const handleClick = () => {
    if (!isTyping && stage < instructions.length) {
      setStage((prev) => prev + 1);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-screen flex flex-col items-center justify-center text-center px-6 relative font-sans cursor-pointer select-none"
    >
      <img
        src={logo}
        alt="Logo"
        className="w-56 absolute top-[8%] drop-shadow-lg"
      />

      <div className="mt-56 flex flex-col items-center">
        <h1
          className="text-7xl font-extrabold mb-10 text-[#cb92e6] text-center"
          style={{ fontFamily: "Aclonica, sans-serif", marginTop: '-20px' }}
        >
          Build Your Character
        </h1>

        <div className="text-xl text-[#444] mb-8 leading-relaxed max-w-xl min-h-[60px]">
        <p
        className="animate-pulse"
        style={{
          fontFamily: "Aclonica, sans-serif",
          animationDuration: "1000ms",      // instead of 2s
          animationTimingFunction: "ease-in-out"
          }}>
            {stage === -1 ? "Click anywhere to begin" : typedText}
        </p>
        </div>

        {showButton && (
          <Link to="/builder">
            <button
              style={{ fontFamily: "Aclonica, sans-serif" }}
              className="bg-[#F5E960] text-black font-semibold py-3 px-10 rounded-full shadow-xl hover:shadow-yellow-400 hover:scale-110 transition-all duration-300 text-lg"
            >
              Start Creating!
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
