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
      group: "Pages & Modules",
      title: "Landing Page (Narrative Overview)",
      hint: "44-country simulation & empirical synthesis",
      icon: Home,
      run: () => navigate("/"),
    },
    {
      id: "mod-clustering",
      group: "Pages & Modules",
      title: "Cartography & 5 Agrifood Clusters",
      hint: "Interactive map and 5 regional typologies",
      icon: Layers,
      run: () => navigate("/clustering"),
    },
    {
      id: "mod-spasial",
      group: "Pages & Modules",
      title: "Advanced Spatial Econometrics",
      hint: "Global Moran's I & LeSage–Pace SDM decomposition",
      icon: Network,
      run: () => navigate("/spasial"),
    },
    {
      id: "mod-simulator",
      group: "Pages & Modules",
      title: "Regional Policy Simulator Lab",
      hint: "Simulate N₂O fertilizer, forest moratoria, & AWD",
      icon: Sliders,
      run: () => navigate("/simulator"),
    },
    {
      id: "mod-forecasting",
      group: "Pages & Modules",
      title: "Methane Forecasting 2025–2035",
      hint: "Leak-free projections with 2,904-fold CV",
      icon: TrendingUp,
      run: () => navigate("/forecasting"),
    },
    {
      id: "mod-metodologi",
      group: "Pages & Modules",
      title: "Methodology & Scientific Transparency",
      hint: "Balanced panel, k-NN W-matrix, LR specification tests",
      icon: BookOpen,
      run: () => navigate("/metodologi"),
    },
    ...COUNTRIES_44.map((c) => ({
      id: `country-${c.name}`,
      group: c.isAsean ? "ASEAN-10 Economies" : "Asia-Pacific Economies",
      title: c.name,
      hint: `${c.clusterName} · ${c.luc_pc.toFixed(2)} t CO₂/capita`,
      icon: MapPin,
      keywords: `${c.name} ${c.clusterName} ${c.isAsean ? "asean" : ""}`,
      run: () => navigate("/clustering"),
    })),
    ...[0, 1, 2, 3, 4].map((k) => ({
      id: `cluster-${k}`,
      group: "Agrifood Typologies",
      title: `Cluster ${k}: ${CLUSTER_NAMES[k]}`,
      hint: "Open cluster profile & audit",
      icon: Layers,
      run: () => navigate("/clustering"),
    })),
  ];

  // Quick keyboard shortcuts from landing page to workspace
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === "1") {
        e.preventDefault();
        navigate("/clustering");
      } else if (e.key === "2") {
        e.preventDefault();
        navigate("/spasial");
      } else if (e.key === "3") {
        e.preventDefault();
        navigate("/simulator");
      } else if (e.key === "4") {
        e.preventDefault();
        navigate("/forecasting");
      } else if (e.key === "5") {
        e.preventDefault();
        navigate("/metodologi");
      } else if (e.key.toLowerCase() === "w") {
        e.preventDefault();
        navigate("/clustering");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

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

        {/* Workspace Routes wrapped in the Collapsible Glass Sidebar Shell */}
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
