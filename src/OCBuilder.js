import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import CharacterPreview from './CharacterPreview';
import FeatureOptions from './FeatureOptions';
import { useNavigate } from 'react-router-dom';

// Tab icons
import eyeIcon from './assets/icons/eyes-icon.svg';
import mouthIcon from './assets/icons/lips-icon.svg';
import hairIcon from './assets/icons/comb-hair-icon.svg';
import clothesIcon from './assets/icons/tshirt-icon.svg';
import dotsIcon from './assets/icons/dots-icon.svg';
import skinIcon from './assets/icons/skin-icon.svg';

// Features
import skin1 from './assets/features/skins/skin1.svg';
import skin2 from './assets/features/skins/skin2.svg';
import skin3 from './assets/features/skins/skin3.svg';
import skin4 from './assets/features/skins/skin4.svg';
import skin5 from './assets/features/skins/skin5.svg';
import skin6 from './assets/features/skins/skin6.svg';

import eyes1 from './assets/features/eyes/eyes1.svg';
import eyes2 from './assets/features/eyes/eyes2.svg';
import eyes3 from './assets/features/eyes/eyes3.svg';
import eyes4 from './assets/features/eyes/eyes4.svg';
import eyes5 from './assets/features/eyes/eyes5.svg';
import eyes6 from './assets/features/eyes/eyes6.svg';

import mouth1 from './assets/features/mouth/mouth1.svg';
import mouth2 from './assets/features/mouth/mouth2.svg';
import mouth3 from './assets/features/mouth/mouth3.svg';
import mouth4 from './assets/features/mouth/mouth4.svg';
import mouth5 from './assets/features/mouth/mouth5.svg';
import mouth6 from './assets/features/mouth/mouth6.svg';

import hair1 from './assets/features/hair/hair1.svg';
import hair2 from './assets/features/hair/hair2.svg';
import hair3 from './assets/features/hair/hair3.svg';
import hair4 from './assets/features/hair/hair4.svg';
import hair5 from './assets/features/hair/hair5.svg';
import hair6 from './assets/features/hair/hair6.svg';

import clothes1 from './assets/features/clothes/clothes1.svg';
import clothes2 from './assets/features/clothes/clothes2.svg';
import clothes3 from './assets/features/clothes/clothes3.svg';
import clothes4 from './assets/features/clothes/clothes4.svg';
import clothes5 from './assets/features/clothes/clothes5.svg';
import clothes6 from './assets/features/clothes/clothes6.svg';

import decor1 from './assets/features/accessories/decor1.svg';
import decor2 from './assets/features/accessories/decor2.svg';
import decor3 from './assets/features/accessories/decor3.svg';
import decor4 from './assets/features/accessories/decor4.svg';
import decor5 from './assets/features/accessories/decor5.svg';
import decor6 from './assets/features/accessories/decor6.svg';

const TABS = [
  { id: 'skin', icon: skinIcon },
  { id: 'mouth', icon: mouthIcon },
  { id: 'eyes', icon: eyeIcon },
  { id: 'hair', icon: hairIcon },
  { id: 'clothes', icon: clothesIcon },
  { id: 'accessories', icon: dotsIcon },
];

const featureOptions = {
  skin: [skin1, skin2, skin3, skin4, skin5, skin6],
  eyes: [eyes1, eyes2, eyes3, eyes4, eyes5, eyes6],
  mouth: [mouth1, mouth2, mouth3, mouth4, mouth5, mouth6],
  hair: [hair1, hair2, hair3, hair4, hair5, hair6],
  clothes: [clothes1, clothes2, clothes3, clothes4, clothes5, clothes6],
  accessories: [decor1, decor2, decor3, decor4, decor5, decor6],
};

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const OCBuilder = () => {
  const previewRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState('skin');
  const [selections, setSelections] = useState({
    skin: skin1,
    eyes: eyes1,
    mouth: mouth1,
    hair: hair1,
    clothes: clothes1,
    accessories: decor1,
  });
  const navigate = useNavigate();

  const handleSaveImage = () => {
    if (!previewRef.current) return;

    html2canvas(previewRef.current, {
      backgroundColor: null,
      useCORS: true,
      scale: 2,
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'oc.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  const handleSelect = (feature, index) => {
    setSelections(prev => ({ ...prev, [feature]: featureOptions[feature][index] }));
  };

  const handleRandomize = () => {
    const newSelections = {};
    for (const feature in featureOptions) {
      newSelections[feature] = getRandomItem(featureOptions[feature]);
    }
    setSelections(newSelections);
  };

  const handleRefine = () => {
    navigate('/refine', { state: { selections } });
  };

  return (
    <div className="flex flex-col items-center">
      {/* Title */}
      <h1
        className="text-6xl font-bold mb-4 p-2"
        style={{ fontFamily: 'Aclonica, sans-serif' }}
      >
        Build Your Character!
      </h1>

      <div className="flex gap-10 bg-[#f4f3fd] p-10 rounded-3xl shadow-lg">
        {/* Preview */}
        <div
          className="w-[320px] h-[600px] flex justify-center items-center border-4 border-black rounded-3xl p-4 bg-white"
          ref={previewRef}
        >
          <CharacterPreview selections={selections} />
        </div>

        {/* Feature Panel */}
        <div className="flex flex-col gap-4 items-center">
          {/* Tabs */}
          <div className="flex gap-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`p-2 rounded-xl border-4 transition ${
                  selectedTab === tab.id
                    ? 'border-accentYellow bg-white'
                    : 'border-black bg-[#f4f3fd]'
                }`}
              >
                <img src={tab.icon} alt={`${tab.id}-icon`} className="w-8 h-8" />
              </button>
            ))}
          </div>

          {/* Options */}
          <FeatureOptions
            options={featureOptions[selectedTab]}
            selected={featureOptions[selectedTab].indexOf(selections[selectedTab])}
            onSelect={(index) => handleSelect(selectedTab, index)}
            featureType={selectedTab}
          />

          {/* Button Rows */}
          <div className="flex flex-col items-center gap-4 mt-2">
            {/* Row 1 - Random Generate */}
            <div className="flex justify-center">
              <button
                onClick={handleRandomize}
                className="group relative border-4 border-[#DFB2F4] px-8 py-4 rounded-full bg-white hover:bg-[#f4ebfb] font-semibold text-2xl transition-all duration-200 hover:scale-105 shadow-md"
              >
                🎲 Random Generate
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-[#DFB2F4] text-white text-sm px-3 py-1 rounded-lg shadow">
                  Get a random character!
                </span>
              </button>
            </div>

            {/* Row 2 - Save + Refine */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleSaveImage}
                className="group relative border-4 border-[#F5E960] text-[#B59E00] px-8 py-4 rounded-full bg-white hover:bg-[#FBF6D1] font-semibold text-2xl transition-all duration-200 hover:scale-105 shadow-md"
              >
                💾 Save
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-[#F5E960] text-black text-sm px-3 py-1 rounded-lg shadow">
                  Save as PNG!
                </span>
              </button>

              <button
                onClick={handleRefine}
                className="group relative border-4 border-[#F49097] px-8 py-4 rounded-full bg-white hover:bg-[#FDE7EA] font-semibold text-2xl transition-all duration-200 hover:scale-105 shadow-md"
              >
                ✨ Refine with AI
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-[#F49097] text-white text-sm px-3 py-1 rounded-lg shadow">
                  Let AI create a story or background for your character!
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OCBuilder;