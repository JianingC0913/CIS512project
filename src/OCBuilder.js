import React, { useState } from 'react';
import CharacterPreview from './CharacterPreview';
import FeatureOptions from './FeatureOptions';
import ButtonPanel from './ButtonPanel';

// Tab icons
import eyeIcon from './assets/icons/eyes-icon.svg';
import mouthIcon from './assets/icons/lips-icon.svg';
import hairIcon from './assets/icons/comb-hair-icon.svg';
import clothesIcon from './assets/icons/tshirt-icon.svg';
import dotsIcon from './assets/icons/dots-icon.svg';

// Feature SVGs
import eyes1 from './assets/features/eyes/eyes1.svg';
import eyes2 from './assets/features/eyes/eyes2.svg';
import eyes3 from './assets/features/eyes/eyes3.svg';

import mouth1 from './assets/features/mouth/mouth1.svg';
import mouth2 from './assets/features/mouth/mouth2.svg';
import mouth3 from './assets/features/mouth/mouth3.svg';

import hair1 from './assets/features/hair/hair1.svg';
import hair2 from './assets/features/hair/hair2.svg';
import hair3 from './assets/features/hair/hair3.svg';

import clothes1 from './assets/features/clothes/clothes1.svg';
import clothes2 from './assets/features/clothes/clothes2.svg';

// Define available tabs and icons
const TABS = [
  { id: 'eyes', icon: eyeIcon },
  { id: 'mouth', icon: mouthIcon },
  { id: 'hair', icon: hairIcon },
  { id: 'clothes', icon: clothesIcon },
  { id: 'extra', icon: dotsIcon },
];

// Define options for each feature
const featureOptions = {
  eyes: [eyes1, eyes2, eyes3],
  mouth: [mouth1, mouth2, mouth3],
  hair: [hair1, hair2, hair3],
  clothes: [clothes1, clothes2],
  extra: [],
};

const OCBuilder = () => {
  const [selectedTab, setSelectedTab] = useState('eyes');
  const [features, setFeatures] = useState({
    eyes: 0,
    mouth: 0,
    hair: 0,
    clothes: 0,
  });

  return (
    <div className="flex w-full h-full gap-6 px-4 py-2">
      {/* Left Panel - Character Preview */}
      <div className="w-[500px] h-[585px] bg-foreground rounded-2xl p-4 flex justify-center items-center border-4 border-black">
        <CharacterPreview features={features} />
      </div>

      {/* Right Panel - Options and Buttons */}
      <div className="flex-1 bg-white border-4 border-foreground rounded-2xl p-4 flex flex-col justify-between shadow-md">
        {/* Feature Tabs */}
        <div className="flex justify-center gap-2 mb-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`p-2 border-4 rounded-md transition-all ${
                selectedTab === tab.id
                  ? 'bg-accentYellow border-black'
                  : 'bg-white border-gray-300'
              }`}
            >
              <img src={tab.icon} alt={tab.id} className="w-6 h-6" />
            </button>
          ))}
        </div>

        {/* Feature Options */}
        <div className="mb-4">
          <FeatureOptions
            options={featureOptions[selectedTab]}
            selected={features[selectedTab]}
            onSelect={(index) =>
              setFeatures({ ...features, [selectedTab]: index })
            }
          />
        </div>

        {/* Button Panel */}
        <div className="flex justify-center gap-4 mt-4">
          <ButtonPanel features={features} setFeatures={setFeatures} />
        </div>
      </div>
    </div>
  );
};

export default OCBuilder;