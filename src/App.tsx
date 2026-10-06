import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MeshBackdrop } from './components/MeshBackdrop';
import { Shell } from './components/shell/Shell';
import { LandingPage } from './landing/LandingPage';
import { ClusteringPage } from './pages/ClusteringPage';
import { SpatialEconometricsPage } from './pages/SpatialEconometricsPage';
import { PolicySimulatorPage } from './pages/PolicySimulatorPage';
import { ForecastingPage } from './pages/ForecastingPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { CommandPalette, type CommandItem } from './components/ui/command-palette';
import { COUNTRIES_44, CLUSTER_NAMES } from './landing/facts';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Compass, Home, Layers, MapPin, Network, Sliders, TrendingUp } from 'lucide-react';

function LandingWithCommandPalette() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const navigate = useNavigate();

  const commandItems: CommandItem[] = [
    {
      id: "mod-home",
      group: "Halaman & Modul",
      title: "Landing Page (Beranda Naratif)",
      hint: "Simulasi 44 negara & overview solusi",
      icon: Home,
      run: () => navigate("/"),
    },
    {
      id: "mod-clustering",
      group: "Halaman & Modul",
      title: "Peta & 5 Klaster Pangan",
      hint: "Kartografi interaktif dan profil 5 tipologi",
      icon: Layers,
      run: () => navigate("/clustering"),
    },
    {
      id: "mod-spasial",
      group: "Halaman & Modul",
      title: "Ekonometrika Spasial Lanjut",
      hint: "Global Moran's I & model SDM LeSage-Pace",
      icon: Network,
      run: () => navigate("/spasial"),
    },
    {
      id: "mod-simulator",
      group: "Halaman & Modul",
      title: "Laboratorium Simulator Kebijakan",
      hint: "Simulasi pupuk N₂O, moratorium, & AWD padi",
      icon: Sliders,
      run: () => navigate("/simulator"),
    },
    {
      id: "mod-forecasting",
      group: "Halaman & Modul",
      title: "Peramalan Metana 2025–2035",
      hint: "Proyeksi deret waktu bebas bocor 2.904 fold CV",
      icon: TrendingUp,
      run: () => navigate("/forecasting"),
    },
    {
      id: "mod-metodologi",
      group: "Halaman & Modul",
      title: "Metodologi & Transparansi Ilmiah",
      hint: "Data panel seimbang, matriks W k-NN, uji LR",
      icon: BookOpen,
      run: () => navigate("/metodologi"),
    },
    ...COUNTRIES_44.map((c) => ({
      id: `country-${c.name}`,
      group: c.isAsean ? "Negara ASEAN-10" : "Negara Asia-Pasifik",
      title: c.name,
      hint: `${c.clusterName} · ${c.luc_pc.toFixed(2)} t CO₂/kapita`,
      icon: MapPin,
      keywords: `${c.name} ${c.clusterName} ${c.isAsean ? "asean" : ""}`,
      run: () => navigate("/clustering"),
    })),
    ...[0, 1, 2, 3, 4].map((k) => ({
      id: `cluster-${k}`,
      group: "Tipologi Klaster",
      title: `Klaster ${k}: ${CLUSTER_NAMES[k]}`,
      hint: "Buka analisis klaster",
      icon: Layers,
      run: () => navigate("/clustering"),
    })),
  ];

  return (
    <>
      {/* WebGL Organic Noise Backdrop for Landing */}
      <MeshBackdrop />
      <LandingPage onOpenCommandPalette={() => setCmdOpen(true)} />
      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        items={commandItems}
      />
    </>
  );
}

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page with rich storytelling and interactive canvas simulation */}
        <Route path="/" element={<LandingWithCommandPalette />} />

        {/* Workspace Routes wrapped in the new Collapsible Glass Sidebar Shell */}
        <Route
          path="/clustering"
          element={
            <Shell>
              <ClusteringPage />
            </Shell>
          }
        />
        <Route
          path="/spasial"
          element={
            <Shell>
              <SpatialEconometricsPage />
            </Shell>
          }
        />
        <Route
          path="/simulator"
          element={
            <Shell>
              <PolicySimulatorPage />
            </Shell>
          }
        />
        <Route
          path="/forecasting"
          element={
            <Shell>
              <ForecastingPage />
            </Shell>
          }
        />
        <Route
          path="/metodologi"
          element={
            <Shell>
              <MethodologyPage />
            </Shell>
          }
        />

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
