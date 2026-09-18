import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/shared/Navbar';
import { Footer } from './components/shared/Footer';
import { HomePage } from './pages/HomePage';
import { ClusteringPage } from './pages/ClusteringPage';
import { SpatialEconometricsPage } from './pages/SpatialEconometricsPage';
import { PolicySimulatorPage } from './pages/PolicySimulatorPage';
import { ForecastingPage } from './pages/ForecastingPage';
import { MethodologyPage } from './pages/MethodologyPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clustering" element={<ClusteringPage />} />
            <Route path="/spasial" element={<SpatialEconometricsPage />} />
            <Route path="/simulator" element={<PolicySimulatorPage />} />
            <Route path="/forecasting" element={<ForecastingPage />} />
            <Route path="/metodologi" element={<MethodologyPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
export default App;
