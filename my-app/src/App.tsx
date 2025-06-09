import React from 'react';
import MainLayout from './components/layout/MainLayout';
import './App.scss';
import ResponsiveOverlay from './components/responsiveIdentifyer/responsiveOverlay';
import useResponsiveDetection from './helpers/responsiveDetection';

const App: React.FC = () => {
  const { isAboveThreshold } = useResponsiveDetection();

  return (
    <div className="app">
      {isAboveThreshold ? <MainLayout /> : <ResponsiveOverlay />}
    </div>
  );
};

export default App;
