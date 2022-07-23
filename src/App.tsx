import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Payment from './pages/payment/Payment';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
