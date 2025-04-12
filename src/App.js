import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import OCBuilder from './OCBuilder';
import RefineWithAI from './RefineWithAI';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[1194px] h-[834px] rounded-[60px] shadow-xl ring-8 ring-[#DFB2F4] ring-offset-4 ring-offset-[#DFB2F4] bg-[#DFB2F4] p-[12px]">
        <div className="w-full h-full rounded-[48px] bg-[#F4EFFF] p-6 overflow-hidden">
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/builder" element={<OCBuilder />} />
              <Route path="/refine" element={<RefineWithAI />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
