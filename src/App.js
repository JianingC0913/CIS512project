import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import OCBuilder from './OCBuilder';
import RefineWithAI from './RefineWithAI';
import RefineWithAI2 from './RefineWithAI2';

// function App() {
//   return (

//     <div className="min-h-screen min-w-full bg-[#F4EFFF] flex items-center justify-center">
//     <div className="w-full h-full rounded-[48px] bg-[#F4EFFF] p-6">
      
//       <Router>
//          {/* Header with home logo */}
//          <div className="flex items-center mb-4 pl-4 gap-4">
//             <Link to="/">
//               <img
//                 src="/home.png"
//                 alt="Home"
//                 className="w-10 h-10 mr-4 hover:scale-105 transition"
//               />
//             </Link>
//             <h1
//               className="text-6xl font-bold"
//               style={{ fontFamily: 'Aclonica, sans-serif' }}
//             >
//               Build Your Character!
//             </h1>
//         </div>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/builder" element={<OCBuilder />} />
//           <Route path="/refine" element={<RefineWithAI />} />
//           <Route path="/refine-ai2" element={<RefineWithAI2 />} />
//         </Routes>
//       </Router>
//     </div>
//   </div>
//   );
// }

const AppLayout = () => {
  const location = useLocation();
  const showHeader = location.pathname !== '/';

  return (
    <>
      {showHeader && (
        <div className="relative w-full flex items-center justify-between px-6 mb-4">
          <Link to="/">
            <img
              src="/home.png"
              alt="Home"
              className="w-12 h-12 mr-4 ml-12 hover:scale-105 transition"
            />
          </Link>
          {/* <h1
            className="text-6xl font-bold"
            style={{ fontFamily: 'Aclonica, sans-serif' }}
          > */}
          <h1 className="text-7xl font-extrabold text-[#cb92e6] bg-clip-text text-transparent" style={{ fontFamily: "Aclonica, sans-serif" }}>
            Build Your Character!
          </h1>
          <img
              src="/logo.ico"
              alt="logo"
              className="w-12 h-12 mr-10 hover:scale-105 transition"
          />
        </div>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<OCBuilder />} />
        <Route path="/refine" element={<RefineWithAI />} />
        <Route path="/refine-ai2" element={<RefineWithAI2 />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <div className="min-h-screen min-w-full bg-[#F4EFFF] flex items-center justify-center">
      <div className="w-full h-full rounded-[48px] bg-[#F4EFFF] p-6">
        <Router>
          <AppLayout />
        </Router>
      </div>
    </div>
  );
}

export default App;
