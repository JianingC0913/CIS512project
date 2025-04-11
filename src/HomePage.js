import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/icons/logo.svg";

export default function HomePage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-6 relative font-sans">
      <img
        src={logo}
        alt="Logo"
        className="w-56 absolute top-[8%] drop-shadow-lg animate-pulse"
      />

      <div className="mt-56 flex flex-col items-center">
        <h1 className="text-7xl font-extrabold mb-10 bg-gradient-to-r from-[#F49097] via-[#F5E960] to-[#55D6C2] bg-clip-text text-transparent" style={{ fontFamily: "Aclonica, sans-serif" }}>
          Build Your Character
        </h1>

        <ul className="text-xl text-[#444] mb-14 leading-relaxed text-left list-disc list-inside max-w-xl space-y-4">
          <li>Customize your look by choosing different features</li>
          <li>Use AI to generate a unique story & description</li>
          <li>Click below to begin</li>
        </ul>

        <Link to="/builder">
          <button className="bg-[#F5E960] text-black font-semibold py-3 px-10 rounded-full shadow-xl hover:shadow-yellow-400 hover:scale-110 transition-all duration-300 text-lg">
            Start Creating!
          </button>
        </Link>
      </div>
    </div>
  );
}