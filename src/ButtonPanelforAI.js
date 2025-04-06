import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";

const ButtonPanelforAI = ({ setFeatures }) => {
  const navigate = useNavigate();


  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
      <button className="rounded-full border-4 border-accentTeal bg-background px-6 py-2 font-aclonica text-lg hover:bg-accentTeal/30 transition">
        Save
      </button>
      <button 
       onClick={() => navigate('/refine')}
       className="rounded-full border-4 border-accentRed bg-background px-6 py-2 font-aclonica text-lg hover:bg-accentRed/30 transition">
        Refine with AI
      </button>
      <button
        className="rounded-full border-4 border-accentRed bg-background text-black px-6 py-2 font-aclonica text-lg hover:bg-accentRed/30 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>
      <button
        className="rounded-full border-4 border-accentRed bg-background text-black px-6 py-2 font-aclonica text-lg hover:bg-accentRed/30 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </div>
  );
};

export default ButtonPanelforAI;