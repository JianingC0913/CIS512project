// App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppLayout from './AppLayout';

function App() {
  return (
    <div className="min-h-screen min-w-full bg-[#F4EFFF] flex items-center justify-center">
      <div className="w-full h-full rounded-[48px] bg-[#F4EFFF] p-6">
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
