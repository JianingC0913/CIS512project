import React from 'react';

const ButtonPanel = ({ setFeatures }) => {
  const randomize = () => {
    setFeatures({
      eyes: Math.floor(Math.random() * 3),
      mouth: Math.floor(Math.random() * 3),
      hair: Math.floor(Math.random() * 3),
      clothes: Math.floor(Math.random() * 2),
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
      <button
        onClick={randomize}
        className="rounded-full border-4 border-foreground bg-background px-6 py-2 font-aclonica text-lg hover:bg-foreground/30 transition"
      >
        Random Generate
      </button>
      <button className="rounded-full border-4 border-accentTeal bg-background px-6 py-2 font-aclonica text-lg hover:bg-accentTeal/30 transition">
        Save & Share
      </button>
      <button className="rounded-full border-4 border-accentRed bg-background px-6 py-2 font-aclonica text-lg hover:bg-accentRed/30 transition">
        Refine with AI
      </button>
    </div>
  );
};

export default ButtonPanel;