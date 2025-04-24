import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import CharacterPreview from './CharacterPreview';

const RefineWithAI = () => {
  const navigate = useNavigate();
  const previewRef = useRef();
  const location = useLocation();
  const selections = location.state?.selections;

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your character creation assistant. Would you like me to generate a story or self-introduction based on your new character? If so, what's your character's name?",
    },
  ]);
  const [userMessage, setUserMessage] = useState('');

  const handleSaveImage = () => {
    if (!previewRef.current) return;
    const saveButton = previewRef.current.querySelector('.save-icon-button');
    const originalDisplay = saveButton?.style.display;
    if (saveButton) saveButton.style.display = 'none';

    html2canvas(previewRef.current, { backgroundColor: null, useCORS: true, scale: 2 }).then((canvas) => {
      if (saveButton) saveButton.style.display = originalDisplay || 'block';
      const link = document.createElement('a');
      link.download = 'oc.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  const handleSend = async () => {
    const trimmed = userMessage.trim();
    if (!trimmed) return;

    const updatedMessages = [...messages, { role: 'user', content: trimmed }];
    setMessages(updatedMessages);
    setUserMessage('');

    const canvas = await html2canvas(previewRef.current, { backgroundColor: null, useCORS: true, scale: 2 });
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));

    const formData = new FormData();
    formData.append('file', blob);
    formData.append('instruction', trimmed);

    try {
      const resp = await fetch('http://localhost:8000/refine-image-chat', { method: 'POST', body: formData });
      const data = await resp.json();
      const aiReply = data.text || 'Sorry, no response.';
      setMessages((prev) => [...prev, { role: 'assistant', content: aiReply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Oops! Something went wrong.' }]);
    }
  };

  const renderMessageBubble = (msg, idx) => {
    const isBot = msg.role === 'assistant';
    return (
      <div key={idx} className={`flex w-full mb-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
        <div className={`max-w-[70%] p-3 rounded-xl shadow text-xl whitespace-pre-wrap ${isBot ? 'bg-purple-100 text-purple-900' : 'bg-pink-100 text-pink-900'}`}>
          <div className="text-2xl font-semibold mb-1">{isBot ? 'LeadBot' : 'You'}</div>
          {msg.content}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
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

        {/* Chat Panel */}
        <div className="flex flex-col items-center flex-1 gap-6">
          <div className="w-full border-4 border-[#D2BCFA] rounded-3xl bg-white shadow-inner flex flex-col justify-between h-[500px]">
            <div className="p-4 overflow-y-auto flex-1">{messages.map((m, i) => renderMessageBubble(m, i))}</div>

            {/* Input */}
            <div className="flex p-3 border-t border-gray-300 gap-2">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 border border-gray-400 px-3 py-2 rounded-lg focus:outline-none text-xl"
              />
              <button
                onClick={handleSend}
                className="text-2xl bg-white border-2 border-pink-300 text-pink-700 rounded-full px-5 py-2 hover:bg-pink-100 shadow transition-all font-semibold"
              >
                ✉️ Send
              </button>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate(-1)}
              className="group relative border-4 border-[#dac3e7] text-[#c996ef] px-6 py-3 rounded-full bg-white hover:bg-[#FBF6D1] font-semibold text-2xl transition-all duration-200 hover:scale-105 shadow-md"
            >
              ← Back
              {/* <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-[#FBF6D1] text-[#4B0082] text-sm px-3 py-1 rounded-lg shadow">
                  Go back to the previous page
              </span> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefineWithAI;
