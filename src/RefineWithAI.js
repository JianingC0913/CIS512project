import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import CharacterPreview from './CharacterPreview';
import { jsPDF } from 'jspdf';

const RefineWithAI = () => {
  const navigate = useNavigate();
  const previewRef = useRef();
  const location = useLocation();
  const selections = location.state?.selections;
  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState(false);
  const [pendingAIIndex, setPendingAIIndex] = useState(null);

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
  
    const userEntry = { role: 'user', content: trimmed };
    const aiPlaceholder = { role: 'assistant', content: '✨ Generating your story ......' };
  
    const updatedMessages = [...messages, userEntry, aiPlaceholder];
    const aiIndex = updatedMessages.length - 1;
  
    setMessages(updatedMessages);
    setUserMessage('');
    setLoading(true);
    setPendingAIIndex(aiIndex);
  
    const canvas = await html2canvas(previewRef.current, { backgroundColor: null, useCORS: true, scale: 2 });
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
  
    const formData = new FormData();
    formData.append('file', blob);
    formData.append('instruction', trimmed);
  
    try {
      const resp = await fetch('http://localhost:8000/refine-image-chat', { method: 'POST', body: formData });
      const data = await resp.json();
      const aiReply = data.text || 'Sorry, no response.';
  
      // Replace the placeholder with the real response
      setMessages((prev) => {
        const newMsgs = [...prev];
        newMsgs[aiIndex] = { role: 'assistant', content: aiReply };
        return newMsgs;
      });
    } catch {
      setMessages((prev) => {
        const newMsgs = [...prev];
        newMsgs[aiIndex] = { role: 'assistant', content: 'Oops! Something went wrong.' };
        return newMsgs;
      });
    } finally {
      setLoading(false);
      setPendingAIIndex(null);
    }
  };
  
  const renderMessageBubble = (msg, idx) => {
    const isBot = msg.role === 'assistant';
    const isPending = idx === pendingAIIndex && loading;
  
    return (
      <div key={idx} className={`flex w-full mb-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
        <div className={`max-w-[70%] p-3 rounded-xl shadow text-xl whitespace-pre-wrap ${
          isBot ? 'bg-purple-100 text-purple-900' : 'bg-pink-100 text-pink-900'
        } ${isPending ? 'animate-pulse' : ''}`}>
          <div className="text-2xl font-semibold mb-1">{isBot ? 'LeadBot' : 'You'}</div>
          {msg.content}
        </div>
      </div>
    );
  };
  
  const handleCopyLastAI = () => {
    const lastAI = [...messages].reverse().find(m => m.role === 'assistant');
    if (lastAI) {
      navigator.clipboard.writeText(lastAI.content).then(() => {
        setCopied(true); // ✅ Show modal instead of alert
      });
    }
  };
  
  const handleSaveChatPDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    const maxLineHeight = 10;
  
    let cursorY = margin;
  
    messages.forEach(({ role, content }) => {
      const label = role === 'user' ? 'You:' : 'LeadBot:';
      const lines = doc.splitTextToSize(`${label} ${content}`, 180);
  
      lines.forEach((line) => {
        if (cursorY + maxLineHeight > pageHeight - margin) {
          doc.addPage();
          cursorY = margin;
        }
        doc.text(line, margin, cursorY);
        cursorY += maxLineHeight;
      });
  
      cursorY += 6; // space between messages
    });
  
    doc.save('ChatHistory.pdf');
  };
  

  return (
    <div className="flex flex-col items-center">
       
       {copied && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center  z-[9999]">
              <div className="bg-white text-center p-8 rounded-3xl shadow-xl w-[90vw] max-w-md text-gray-800 relative">
                <button
                  onClick={() => setCopied(false)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-bold"
                  title="Close"
                >
                  ✕
                </button>
                <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Aclonica, sans-serif' }}>
                  ✅ Copied to Clipboard!
                </h3>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Your story has been copied successfully. You can now paste it anywhere!
                </p>
              </div>
            </div>
          )}
     
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
          <div className="w-full border-4 border-[#D2BCFA] rounded-3xl bg-white shadow-inner flex flex-col justify-between h-[550px]">
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
          <div className="flex justify-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="group relative border-4 border-[#dac3e7] text-[#c996ef] px-6 py-3 rounded-full bg-white hover:bg-[#FBF6D1] font-semibold text-2xl transition-all duration-200 hover:scale-105 shadow-md"
            >
              ← Back
            </button>

            <button
              onClick={handleCopyLastAI}
              className="border-4 border-[#dac3e7] text-[#c996ef] px-6 py-3 rounded-full bg-white hover:bg-[#FBF6D1] font-semibold text-2xl shadow-md transition-all duration-200 hover:scale-105"
            >
              📋 Copy Last Reply
            </button>

            <button
              onClick={handleSaveChatPDF}
              className="border-4 border-[#F49097] text-[#F49097] px-6 py-3 rounded-full bg-white hover:bg-[#FDE7EA] font-semibold text-2xl shadow-md transition-all duration-200 hover:scale-105"
            >
              📄 Save Chat as PDF
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RefineWithAI;
