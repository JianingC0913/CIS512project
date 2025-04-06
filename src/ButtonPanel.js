import React from 'react';

const ButtonPanel = ({ onRandomize, onSave, onRefine }) => {
  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={onRandomize}
        className="bg-purple-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-purple-700"
      >
        🎲 Random Generate
      </button>
      <button
        onClick={onSave}
        className="bg-yellow-400 text-black px-6 py-3 rounded-2xl shadow hover:bg-yellow-300"
      >
        💾 Save & Share
      </button>
      <button
        onClick={onRefine}
        className="bg-pink-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-pink-600"
      >
        ✨ Refine with AI
      </button>
    </div>
  );
};

export default ButtonPanel;