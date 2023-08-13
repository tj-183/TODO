import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer/Footer.tsx';
import Header from './Components/Header/Header.tsx';
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage.tsx';

const App = () => 
  (
    <BrowserRouter>
      <Header />
      <LandingPage />
      <Footer />
    </BrowserRouter>
  );

export default App;
