// AppLayout.js
import React, { useState } from 'react';
import { useLocation, useNavigate, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import OCBuilder from './OCBuilder';
import RefineWithAI from './RefineWithAI';
import RefineWithAI2 from './RefineWithAI2';
import AIChoicePage from './AIChoicePage';

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const showHeader = location.pathname !== '/';
  const [showConfirm, setShowConfirm] = useState(false);

  const handleGoHome = () => {
    setShowConfirm(false);
    navigate('/');
  };

  return (
    <>
      {showHeader && (
        <div className="relative w-full flex items-center justify-between px-6 mb-4">
          <button onClick={() => setShowConfirm(true)} className="ml-12">
            <img src="/home.png" alt="Home" className="w-12 h-12 hover:scale-105 transition" />
          </button>
          <h1 className="text-7xl font-extrabold text-[#cb92e6] bg-clip-text text-transparent" style={{ fontFamily: 'Aclonica, sans-serif' }}>
            Build Your Character!
          </h1>
          <img src="/logo.ico" alt="Logo" className="w-14 h-14 mr-10 hover:scale-105 transition" />
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white border-4 border-[#F49097] rounded-[32px] shadow-2xl p-10 w-[90%] max-w-xl text-center transition-all duration-300 scale-100">
            <h2 className="text-3xl font-bold mb-6 text-[#F49097]" style={{ fontFamily: 'Aclonica, sans-serif' }}>
                Go back to home page?
            </h2>
            <p className="mb-8 text-gray-700 text-xl font-bold">This will remove all your changes.</p>
            <div className="flex justify-center gap-6">
                <button
                onClick={() => setShowConfirm(false)}
                className="font-bold px-8 py-3 text-xl rounded-full border-4 border-gray-400 text-gray-700 bg-white hover:bg-gray-100 transition-all duration-200"
                >
                Cancel
                </button>
                <button
                onClick={handleGoHome}
                className="font-bold px-8 py-3 text-xl rounded-full border-4 border-[#F49097] text-white bg-[#F49097] hover:bg-[#fcaeb4] transition-all duration-200 shadow-md"
                >
                Go Home
                </button>
            </div>
            </div>
        </div>
        )}


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<OCBuilder />} />
        <Route path="/refine" element={<RefineWithAI />} />
        <Route path="/refine-ai2" element={<RefineWithAI2 />} />
        <Route path="/ai-choice" element={<AIChoicePage />} />
      </Routes>
    </>
  );
};

export default AppLayout;
