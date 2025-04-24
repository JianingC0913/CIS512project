import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import CharacterPreview from './CharacterPreview';

const guidanceText = [
  "Click anywhere to show AI tutorial.",
  "▶ Chat Mode allows for interactive storytelling through conversation.",
  "▶ Suggestion Mode offers quick button-based prompts to guide your story.",
//   "Start by choosing one of the two buttons below!"
];

const AIChoicePage = () => {
  const navigate = useNavigate();
  const previewRef = useRef();
  const location = useLocation();
  const selections = location.state?.selections;

  const [stage, setStage] = useState(0); // start at 0 for the first sentence
  const [typedText, setTypedText] = useState('');
  const [displayedSentences, setDisplayedSentences] = useState([guidanceText[0]]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Skip typing for the first sentence
    if (stage === 0) return;

    const current = guidanceText[stage];
    if (stage > 0 && stage < guidanceText.length && current) {
      setTypedText('');
      setIsTyping(true);
      let index = 0;
      const interval = setInterval(() => {
        setTypedText(current.slice(0, index + 1));
        index++;
        if (index >= current.length) {
          clearInterval(interval);
          setIsTyping(false);
          setDisplayedSentences(prev => [...prev, current]);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [stage]);

  const handleClick = (e) => {
    const isButtonClick = e.target.closest('button');
    if (!isButtonClick && !isTyping && stage < guidanceText.length - 1) {
      setStage(prev => prev + 1);
    }
  };

  const handleSaveImage = () => {
    if (!previewRef.current) return;
    const saveButton = previewRef.current.querySelector('.save-icon-button');
    const originalDisplay = saveButton?.style.display;
    if (saveButton) saveButton.style.display = 'none';

    html2canvas(previewRef.current, {
      backgroundColor: null,
      useCORS: true,
      scale: 2,
    }).then((canvas) => {
      if (saveButton) saveButton.style.display = originalDisplay || 'block';
      const link = document.createElement('a');
      link.download = 'oc.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  return (
    <div onClick={handleClick} className="flex flex-col items-center select-none cursor-pointer">
      <div className="w-full max-w-[90vw] min-h-[80vh] bg-[#f4f3fd] p-6 md:p-10 rounded-3xl shadow-lg flex flex-col md:flex-row gap-6">

        {/* Character Preview */}
        <div
          ref={previewRef}
          className="w-full md:w-1/3 flex justify-center items-center border-4 border-black rounded-3xl p-4 bg-white relative"
        >
          <CharacterPreview selections={selections} />
          <button
            onClick={handleSaveImage}
            className="save-icon-button group absolute bottom-2 right-2 border-2 rounded-full p-2 hover:bg-[#FBF6D1] transition shadow-md text-2xl"
            title="Save Image"
          >
            💾
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-[#ebbd34] text-white text-sm px-3 py-1 rounded-lg shadow font-bold">
              Save this image!
            </span>
          </button>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-evenly text-center flex-1 px-4 py-8">
          <h1
            className="text-4xl font-bold text-black mb-6"
            style={{ fontFamily: 'Aclonica, sans-serif' }}
          >
            Do you prefer writing your story through chatting with AI or through AI suggestions?
          </h1>

          <div className="text-xl text-[#807f7f] max-w-xl mx-auto min-h-[100px] leading-relaxed mb-6  text-left">
            {displayedSentences.map((line, i) => (
              <p key={i} className="mb-2" style={{ fontFamily: 'Aclonica, sans-serif' }}>
                {line}
              </p>
            ))}
            {isTyping && (
              <p
                className="animate-pulse"
                style={{
                  fontFamily: 'Aclonica, sans-serif',
                  animationDuration: '1000ms',
                  animationTimingFunction: 'ease-in-out',
                }}
              >
                {typedText}
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => navigate(-1)}
              className="group relative border-4 border-[#dac3e7] text-[#c996ef] px-6 py-3 rounded-full bg-white hover:bg-[#FBF6D1] font-semibold text-2xl transition-all duration-200 hover:scale-105 shadow-md"
            >
              ← Back
            </button>

            <button
              onClick={() => navigate('/refine', { state: { selections } })}
              className="group relative border-4 border-[#F49097] px-8 py-4 rounded-full bg-white hover:bg-[#FDE7EA] font-semibold text-2xl transition-all duration-200 hover:scale-105 shadow-md"
            >
              💬 Chat Mode
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-[#F49097] text-white text-sm px-3 py-1 rounded-lg shadow">
                Let AI create a story through conversation!
              </span>
            </button>

            <button
              onClick={() => navigate('/refine-ai2', { state: { selections } })}
              className="group relative border-4 border-[#F49097] px-8 py-4 rounded-full bg-white hover:bg-[#FDE7EA] font-semibold text-2xl transition-all duration-200 hover:scale-105 shadow-md"
            >
              🚀 Suggestion Mode
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-[#F49097] text-white text-sm px-3 py-1 rounded-lg shadow">
                Let AI help with button suggestions!
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChoicePage;
