import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { CountryCluster, LisaData } from '../../types/data';
import { Card } from '../ui/card';
import { Info, Layers, Compass, ZoomIn, Globe as GlobeIcon, Map as MapIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InteractiveGlobe } from './InteractiveGlobe';
import { useTheme } from '../ThemeProvider';

interface InteractiveMapProps {
  countries: CountryCluster[];
  lisaData: LisaData[];
  selectedCountry: CountryCluster | null;
  onSelectCountry: (country: CountryCluster) => void;
}

// Helper to center map on selection
const MapController: React.FC<{ targetCountry: CountryCluster | null }> = ({ targetCountry }) => {
  const map = useMap();
  useEffect(() => {
    if (targetCountry && targetCountry.lat && targetCountry.lon) {
      map.setView([targetCountry.lat, targetCountry.lon], 5, { animate: true });
    }
  }, [targetCountry, map]);
  return null;
};

// Helper to invalidate and resize Leaflet map when switched from hidden to visible
const MapResizer: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const map = useMap();
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        map.invalidateSize();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isVisible, map]);
  return null;
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  countries,
  lisaData,
  selectedCountry,
  onSelectCountry,
}) => {
  const { isDark } = useTheme();
  const [viewMode, setViewMode] = useState<'globe' | 'map'>('globe');
  const [activeLayer, setActiveLayer] = useState<'cluster' | 'lisa' | 'luc' | 'ch4'>('cluster');
  const [filterAseanOnly, setFilterAseanOnly] = useState<boolean>(false);

  // Merge LISA info into country lookup
  const lisaMap = new Map<string, LisaData>();
  lisaData.forEach((item) => lisaMap.set(item.country, item));

  const filteredCountries = countries.filter((c) => (filterAseanOnly ? c.is_asean === 1 : true));

  // Determine marker color based on selected layer
  const getMarkerStyle = (c: CountryCluster) => {
    if (activeLayer === 'cluster') {
      const clusterColors: Record<number, string> = {
        2: '#ef4444', // Frontier Konversi Lahan (Red)
        4: '#f59e0b', // Padat Penduduk (Amber)
        0: '#3b82f6', // Industri Mapan (Blue)
        1: '#8b5cf6', // Peternakan Ekstensif (Purple)
        3: '#64748b', // Petro-Ekonomi (Slate)
      };
      return {
        fillColor: clusterColors[c.klaster] || '#10b981',
        color: '#ffffff',
        radius: c.is_asean ? 12 : 8,
      };
    }

    if (activeLayer === 'lisa') {
      const lisa = lisaMap.get(c.country);
      let col = '#475569';
      if (lisa?.lisa === 'High-High') col = '#dc2626'; // Hotspot
      else if (lisa?.lisa === 'Low-High') col = '#9333ea'; // Spatial Outlier
      else if (lisa?.lisa === 'Low-Low') col = '#2563eb'; // Coldspot
      else if (lisa?.lisa === 'High-Low') col = '#ea580c';
      return {
        fillColor: col,
        color: lisa?.lisa && lisa.lisa !== 'Not significant' && lisa.lisa !== 'Tidak signifikan' ? '#ffffff' : '#64748b',
        radius: lisa?.lisa === 'High-High' ? 13 : 8,
      };
    }

    if (activeLayer === 'luc') {
      // LUC per capita scale
      let col = '#10b981';
      if (c.luc_pc > 3.0) col = '#7f1d1d';
      else if (c.luc_pc > 2.0) col = '#dc2626';
      else if (c.luc_pc > 1.0) col = '#f97316';
      else if (c.luc_pc > 0.3) col = '#eab308';
      return {
        fillColor: col,
        color: '#ffffff',
        radius: Math.max(6, Math.min(18, c.luc_pc * 3.5)),
      };
    }

    // Default CH4
    let col = '#06b6d4';
    if (c.ch4_pc > 4.0) col = '#9333ea';
    else if (c.ch4_pc > 2.0) col = '#3b82f6';
    else if (c.ch4_pc > 1.0) col = '#10b981';
    return {
      fillColor: col,
      color: '#ffffff',
      radius: Math.max(6, Math.min(18, c.ch4_pc * 2.8)),
    };
  };

  return (
    <Card className="overflow-hidden p-0 border-black/10 shadow-sm bg-surface/80 backdrop-blur-xl">
      {/* Top Map Toolbar Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3.5 sm:p-4 border-b border-black/10 bg-neutral-100/70">
        {/* Left: View Mode Switcher (3D Globe vs 2D Map) */}
        <div className="flex items-center rounded-xl bg-surface/90 p-1 border border-black/10 shrink-0">
          <button
            onClick={() => setViewMode('globe')}
            aria-pressed={viewMode === 'globe'}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
              viewMode === 'globe'
                ? "bg-grain-blue text-white font-bold shadow-md shadow-black/5"
                : "text-neutral-600 hover:text-neutral-950"
            )}
          >
            <GlobeIcon className="size-3.5" />
            <span>3D Orbital Globe</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            aria-pressed={viewMode === 'map'}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
              viewMode === 'map'
                ? "bg-grain-blue text-white font-bold shadow-md shadow-black/5"
                : "text-neutral-600 hover:text-neutral-950"
            )}
          >
            <MapIcon className="size-3.5" />
            <span>2D Planar Map</span>
          </button>
        </div>

        {/* Center: Layer Switcher */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-neutral-600 mr-1 flex items-center gap-1">
            <Layers className="size-3.5 text-neutral-800" />
            Layer:
          </span>
          <button
            onClick={() => setActiveLayer('cluster')}
            aria-pressed={activeLayer === 'cluster'}
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded-xl transition-all border",
              activeLayer === 'cluster'
                ? 'bg-grain-blue text-white font-medium border-transparent'
                : 'text-neutral-700 border-black/5 hover:bg-neutral-100'
            )}
          >
            5 Agrifood Clusters
          </button>
          <button
            onClick={() => setActiveLayer('lisa')}
            aria-pressed={activeLayer === 'lisa'}
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded-xl transition-all border",
              activeLayer === 'lisa'
                ? 'bg-grain-blue text-white font-medium border-transparent'
                : 'text-neutral-700 border-black/5 hover:bg-neutral-100'
            )}
          >
            LISA 2024 (Hotspots)
          </button>
          <button
            onClick={() => setActiveLayer('luc')}
            aria-pressed={activeLayer === 'luc'}
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded-xl transition-all border",
              activeLayer === 'luc'
                ? 'bg-grain-blue text-white font-medium border-transparent'
                : 'text-neutral-700 border-black/5 hover:bg-neutral-100'
            )}
          >
            Land CO₂ (LUC)
          </button>
          <button
            onClick={() => setActiveLayer('ch4')}
            aria-pressed={activeLayer === 'ch4'}
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded-xl transition-all border",
              activeLayer === 'ch4'
                ? 'bg-grain-blue text-white font-medium border-transparent'
                : 'text-neutral-700 border-black/5 hover:bg-neutral-100'
            )}
          >
            Methane (CH₄)
          </button>
        </div>

        {/* Right: Filter ASEAN */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterAseanOnly(!filterAseanOnly)}
            aria-pressed={filterAseanOnly}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all",
              filterAseanOnly
                ? 'bg-grain-mist text-neutral-800 border-black/10 shadow-sm'
                : 'bg-neutral-100/80 text-neutral-600 border-black/10 hover:text-neutral-950 hover:bg-neutral-100'
            )}
          >
            {filterAseanOnly ? '✓ ASEAN-10 Only' : 'Display All 44 Economies'}
          </button>
        </div>
      </div>

      {/* Main View Port: 3D Globe or 2D Leaflet */}
      <div className={cn("w-full relative", viewMode === 'globe' ? 'block' : 'hidden')}>
        <InteractiveGlobe
          countries={countries}
          lisaData={lisaData}
          selectedCountry={selectedCountry}
          onSelectCountry={onSelectCountry}
          activeLayer={activeLayer}
          filterAseanOnly={filterAseanOnly}
          isVisible={viewMode === 'globe'}
        />
      </div>

      <div className={cn("w-full relative", viewMode === 'map' ? 'block' : 'hidden')}>
        <div className="h-[620px] w-full bg-neutral-100 relative">
          <MapContainer
            center={[10.0, 105.0]}
            zoom={4}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            {/* Esri World Dark Gray Canvas */}
            <TileLayer
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
              url={`https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_${isDark ? 'Dark' : 'Light'}_Gray_Base/MapServer/tile/{z}/{y}/{x}`}
              maxZoom={16}
            />
            <TileLayer
              attribution='&copy; Esri'
              url={`https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_${isDark ? 'Dark' : 'Light'}_Gray_Reference/MapServer/tile/{z}/{y}/{x}`}
              maxZoom={16}
            />
            <MapController targetCountry={selectedCountry} />
            <MapResizer isVisible={viewMode === 'map'} />

            {filteredCountries.map((c) => {
              const style = getMarkerStyle(c);
              const lisa = lisaMap.get(c.country);
              const isSelected = selectedCountry?.country === c.country;

              return (
                <CircleMarker
                  key={c.country}
                  center={[c.lat, c.lon]}
                  radius={isSelected ? style.radius + 4 : style.radius}
                  pathOptions={{
                    fillColor: style.fillColor,
                    fillOpacity: 0.85,
                    color: isSelected ? '#10b981' : style.color,
                    weight: isSelected ? 3 : 1.5,
                  }}
                  eventHandlers={{
                    click: () => onSelectCountry(c),
                  }}
                >
                  <Popup className="rasio-leaflet-popup">
                    <div className="p-3 text-neutral-900 min-w-[220px]">
                      <div className="flex items-center justify-between border-b pb-1.5 mb-2">
                        <h4 className="font-extrabold text-sm">{c.country}</h4>
                        {c.is_asean === 1 && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            ASEAN
                          </span>
                        )}
                      </div>
                      <div className="text-xs space-y-1">
                        <p>
                          <strong className="text-slate-700">Cluster:</strong>{' '}
                          <span className="font-semibold text-neutral-900">{c.nama_klaster}</span>
                        </p>
                        <p>
                          <strong className="text-slate-700">LISA Status:</strong>{' '}
                          <span className="font-semibold text-red-600">{lisa?.lisa || 'N/A'}</span>
                        </p>
                        <div className="pt-1.5 border-t border-slate-200 grid grid-cols-2 gap-1 text-[11px]">
                          <div>
                            <span className="text-neutral-500">Land CO₂:</span>
                            <p className="font-bold">{c.luc_pc.toFixed(2)} t/cap</p>
                          </div>
                          <div>
                            <span className="text-neutral-500">Methane:</span>
                            <p className="font-bold">{c.ch4_pc.toFixed(2)} t/cap</p>
                          </div>
                          <div>
                            <span className="text-neutral-500">Fertilizer N₂O:</span>
                            <p className="font-bold">{c.n2o_pc.toFixed(2)} t/cap</p>
                          </div>
                          <div>
                            <span className="text-neutral-500">Energy CO₂:</span>
                            <p className="font-bold">{c.co2_pc.toFixed(2)} t/cap</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>

          {/* Legend Overlay at Bottom (for 2D Map) */}
          <div className="absolute bottom-4 left-4 z-[400] bg-surface/90 backdrop-blur-xl border border-black/10 p-3.5 rounded-2xl max-w-sm hidden sm:block shadow-sm">
            <h5 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Compass className="size-3.5 text-neutral-800" />
              {activeLayer === 'cluster' && 'Agrifood Typology Clusters Legend'}
              {activeLayer === 'lisa' && 'LISA 2024 Spatial Significance Legend'}
              {activeLayer === 'luc' && 'Land-Use Change CO₂ Emissions Legend'}
              {activeLayer === 'ch4' && 'Methane (CH₄) Emissions Legend'}
            </h5>

            {activeLayer === 'cluster' && (
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[#ef4444]" />
                  <span className="text-neutral-800 font-medium">Land Conversion Frontier (7 ASEAN Economies)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[#f59e0b]" />
                  <span className="text-neutral-700">High-Density Low-Intensity Agrarian (Philippines)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[#3b82f6]" />
                  <span className="text-neutral-700">Established Land-Sparing Industrial (Singapore)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[#8b5cf6]" />
                  <span className="text-neutral-700">Extensive Pastoral & Livestock (Brunei)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[#64748b]" />
                  <span className="text-neutral-700">Food-Importing Petro-Economies</span>
                </div>
              </div>
            )}

            {activeLayer === 'lisa' && (
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[#dc2626]" />
                  <span className="text-neutral-800 font-medium">High-High: Regional Hotspot (7 ASEAN)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[#9333ea]" />
                  <span className="text-neutral-700 font-medium">Low-High: Spatial Outlier (Philippines & Singapore)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[#475569]" />
                  <span className="text-neutral-600">Not Significant (p &gt; 0.05)</span>
                </div>
              </div>
            )}

            {(activeLayer === 'luc' || activeLayer === 'ch4') && (
              <div className="text-xs text-neutral-700 flex items-center justify-between pt-1">
                <span>Low (Small radius)</span>
                <span className="mx-2 text-neutral-500">➔</span>
                <span className="text-neutral-800 font-bold font-mono">High (Large radius & concentrated)</span>
              </div>
            )}
        </div>
      </div>
      </div>
    </Card>
  );
};
