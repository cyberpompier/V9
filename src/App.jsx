import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import FireTruck from './pages/FireTruck';
import Materiels from './pages/Materiels';
import Settings from './pages/Settings';

function App() {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/firetruck':
        return 'Fire Trucks';
      case '/materiels':
        return 'Materiels';
      case '/settings':
        return 'Settings';
      default:
        return 'My PWA App';
    }
  };

  return (
    <div className="app-container">
      <Header title={getPageTitle()} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/firetruck" element={<FireTruck />} />
        <Route path="/materiels" element={<Materiels />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
