import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer/Footer.tsx';
import Header from './Components/Header/Header.tsx';
import './App.css';

const App = () => 
  (
    <BrowserRouter>
      <Header />
      <Routes>
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );

export default App;
