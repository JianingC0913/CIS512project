import React from 'react';
import OCBuilder from './OCBuilder';
import RefineWithAI from './RefineWithAI';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// function App() {
//   return (
//     <div className="bg-background font-aclonica flex items-center justify-center min-h-screen">
//       <div className="w-[1194px] h-[834px] bg-white border-4 border-foreground shadow-xl rounded-xl p-6 flex flex-col justify-start">
//         <h1 className="text-4xl font-bold text-center mb-4">Build Your OC!</h1>
//         <OCBuilder />
//       </div>
//     </div>
//   );
// }

function App() {
  return (
    <div className="bg-background font-aclonica flex items-center justify-center min-h-screen">
      <div className="w-[1194px] h-[834px] bg-white border-4 border-foreground shadow-xl rounded-xl p-6 flex flex-col justify-start">
        <h1 className="text-4xl font-bold text-center mb-4">Build Your OC!</h1>
        
        <Router>
          <Routes>
            <Route path="/" element={<OCBuilder />} />
            <Route path="/refine" element={<RefineWithAI />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}


export default App;