import React, { useState } from 'react';
import { Artisan } from '../types';
import { MapPin, Sparkles, CheckCircle2, ChevronRight, SlidersHorizontal, RotateCcw, Trees, Palette, Sprout } from 'lucide-react';

interface HeritageHeatmapProps {
  artisans: Artisan[];
  onSelectArtisan: (artisan: Artisan) => void;
  selectedCategoryFilter: 'all' | 'Heritage Arts' | 'Agriculture' | 'Indigenous Flora';
  onFilterChange: (category: 'all' | 'Heritage Arts' | 'Agriculture' | 'Indigenous Flora') => void;
}

export const HeritageHeatmap: React.FC<HeritageHeatmapProps> = ({
  artisans,
  onSelectArtisan,
  selectedCategoryFilter,
  onFilterChange,
}) => {
  const [activePinId, setActivePinId] = useState<string>('sita-devi');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const filteredArtisans = artisans.filter((a) => {
    if (selectedCategoryFilter === 'all') return true;
    return a.category === selectedCategoryFilter;
  });

  const activeArtisan = artisans.find((a) => a.id === activePinId) || artisans[0];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden card-shadow bg-[#ffffff] border border-[#ddc1b3]/50 min-h-[580px] md:h-[620px] flex flex-col justify-between">
      {/* Background Relief Map image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYl-IS5xU96H7Zjk2i8hSYw1Ud5VE9TCQ_CU709DFlqCgpmsEP3-Gy4rngPrCk_uj7dyfu6g-578022zOGJlxtentgEu6TOGArZ4ApvpLcuIKMNa2iqotKqHZi_sEOG2I4SBksCYbXkYOesIXeE8BdEcNho82L7NvEANhUy7Bdzk7KzrCQWVGJGICKQYItcyaQv4HIki66tKTUMNOCFcyL6brDoo7GjAxLCWDwAnKh83NH7Bp4zCk"
          alt="Relief map of Jharkhand showing indigenous artisan and botanical clusters"
          className="w-full h-full object-cover object-center transform transition-transform duration-500 scale-100"
          style={{ transform: `scale(${zoomLevel})` }}
        />
        <div className="absolute inset-0 bg-[#fff8f6]/20 pointer-events-none" />
      </div>

      {/* Top Map Header Overlay */}
      <div className="relative z-10 p-4 md:p-6 flex justify-between items-start">
        {/* Reset / Recenter Button */}
        <button
          id="map-reset-btn"
          onClick={() => {
            setZoomLevel(1);
            setActivePinId('sita-devi');
          }}
          className="bg-white/90 backdrop-blur-md p-2.5 md:p-3 rounded-full card-shadow text-[#231914] hover:text-[#974400] hover:bg-white transition-all active:scale-95 flex items-center justify-center cursor-pointer"
          title="Reset Map View"
        >
          <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Region Title Badge */}
        <div className="text-center bg-white/90 backdrop-blur-md px-5 py-2 rounded-full card-shadow border border-[#ddc1b3]/40">
          <div className="font-serif font-bold text-[#231914] tracking-widest uppercase text-xs md:text-sm">
            JHARKHAND
          </div>
          <div className="text-[11px] md:text-xs text-[#564338] font-medium">
            Heritage Arts, Agro &amp; Indigenous Flora
          </div>
        </div>

        {/* Filter Quick Controls */}
        <div className="flex items-center space-x-2">
          <button
            id="map-filter-toggle-btn"
            onClick={() => {
              const next =
                selectedCategoryFilter === 'all'
                  ? 'Heritage Arts'
                  : selectedCategoryFilter === 'Heritage Arts'
                  ? 'Agriculture'
                  : selectedCategoryFilter === 'Agriculture'
                  ? 'Indigenous Flora'
                  : 'all';
              onFilterChange(next);
            }}
            className="bg-white/90 backdrop-blur-md px-3 py-2 md:p-3 rounded-full card-shadow text-[#231914] hover:text-[#974400] hover:bg-white transition-all active:scale-95 flex items-center space-x-1.5 cursor-pointer text-xs font-semibold"
            title="Toggle Category Filter"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#974400]" />
            <span className="hidden sm:inline">
              {selectedCategoryFilter === 'all'
                ? 'All Filters'
                : selectedCategoryFilter}
            </span>
          </button>
        </div>
      </div>

      {/* Interactive Map Pins Area */}
      <div className="relative z-10 flex-grow w-full h-full my-auto pointer-events-none">
        {filteredArtisans.map((artisan) => {
          const isSelected = artisan.id === activePinId;
          const isArts = artisan.category === 'Heritage Arts';
          const isAgri = artisan.category === 'Agriculture';
          const isFlora = artisan.category === 'Indigenous Flora';

          return (
            <div
              key={artisan.id}
              className="absolute pointer-events-auto transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${artisan.coordinates.x}%`,
                top: `${artisan.coordinates.y}%`,
              }}
            >
              {/* Animated Pin Marker */}
              <button
                id={`map-pin-${artisan.id}`}
                onClick={() => setActivePinId(artisan.id)}
                className={`group relative flex items-center justify-center p-2 rounded-full transition-transform active:scale-95 cursor-pointer shadow-md ${
                  isSelected
                    ? isArts
                      ? 'bg-[#974400] text-white ring-4 ring-[#ffdbc9] scale-110'
                      : isAgri
                      ? 'bg-[#186a22] text-white ring-4 ring-[#a3f69c] scale-110'
                      : 'bg-[#006e0c] text-white ring-4 ring-[#92fa83] scale-110 shadow-emerald-500/50'
                    : isArts
                    ? 'bg-[#fff1eb] text-[#974400] border-2 border-[#974400] hover:scale-110'
                    : isAgri
                    ? 'bg-[#f7fff1] text-[#186a22] border-2 border-[#186a22] hover:scale-110'
                    : 'bg-[#ebfbee] text-[#006e0c] border-2 border-[#006e0c] hover:scale-110'
                }`}
              >
                {isArts ? (
                  <Palette className="w-4 h-4" />
                ) : isAgri ? (
                  <Trees className="w-4 h-4" />
                ) : (
                  <Sprout className="w-4 h-4" />
                )}

                {/* Pulse Ring for active pin */}
                {isSelected && (
                  <span
                    className={`absolute -inset-1 rounded-full animate-ping pointer-events-none ${
                      isArts
                        ? 'bg-[#974400]/20'
                        : isAgri
                        ? 'bg-[#186a22]/20'
                        : 'bg-[#006e0c]/30'
                    }`}
                  />
                )}
              </button>

              {/* Pin Label */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap">
                <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-[#231914] shadow-sm border border-[#ddc1b3]/40">
                  {artisan.district}
                </span>
              </div>
            </div>
          );
        })}

        {/* Selected Artisan Floating Tooltip (matching screen design) */}
        {activeArtisan && (
          <div
            className="absolute pointer-events-auto transition-all duration-300 z-30"
            style={{
              left: `clamp(10%, ${activeArtisan.coordinates.x}%, 65%)`,
              top: `clamp(15%, ${activeArtisan.coordinates.y - 18}%, 55%)`,
            }}
          >
            <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-[#ddc1b3]/60 max-w-[280px] sm:max-w-xs animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={activeArtisan.avatarUrl}
                    alt={activeArtisan.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#974400]/30 shadow-xs"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#231914]">
                      {activeArtisan.name}
                    </h4>
                    <p className="text-[11px] text-[#564338]">
                      {activeArtisan.craftTitle} ({activeArtisan.district})
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Score & Verification Status */}
              <div className="flex items-center justify-between py-1.5 px-2 bg-[#fff1eb] rounded-lg text-xs font-semibold mb-3">
                <span className="flex items-center text-[#974400]">
                  ★ {activeArtisan.trustRating}
                </span>
                <span className="flex items-center text-[#006e0c] gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {activeArtisan.trustScore}% trust
                </span>
              </div>

              {/* View Profile Action */}
              <button
                id={`view-artisan-profile-${activeArtisan.id}`}
                onClick={() => onSelectArtisan(activeArtisan)}
                className="w-full bg-[#974400] text-white py-1.5 px-3 rounded-full text-xs font-semibold hover:bg-[#bb5808] transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
              >
                <span>View Profile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Map Legend Overlay at bottom left */}
      <div className="relative z-10 p-4 md:p-6 flex flex-wrap justify-between items-end gap-3 pointer-events-none">
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md p-2.5 rounded-xl card-shadow border border-[#ddc1b3]/40 space-y-1.5">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#231914]">
            <span className="w-3 h-3 rounded-full bg-[#974400] flex items-center justify-center text-white text-[8px]">
              ✓
            </span>
            <span>🟠 Heritage Arts</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#231914]">
            <span className="w-3 h-3 rounded-full bg-[#186a22] flex items-center justify-center text-white text-[8px]">
              ✓
            </span>
            <span>🟢 Agriculture &amp; Heirloom Grains</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#231914]">
            <span className="w-3 h-3 rounded-full bg-[#006e0c] flex items-center justify-center text-white text-[8px]">
              ✓
            </span>
            <span>🌿 Rare Indigenous Flora &amp; Botanicals</span>
          </div>
        </div>

        {/* Zoom In / Out Controls */}
        <div className="pointer-events-auto flex items-center space-x-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-full card-shadow border border-[#ddc1b3]/40">
          <button
            id="map-zoom-out-btn"
            onClick={() => setZoomLevel((prev) => Math.max(1, prev - 0.2))}
            className="w-7 h-7 rounded-full hover:bg-[#f2dfd5] text-[#231914] font-bold text-sm flex items-center justify-center cursor-pointer transition-colors"
            title="Zoom Out"
          >
            -
          </button>
          <span className="text-[11px] font-semibold text-[#564338] px-1">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            id="map-zoom-in-btn"
            onClick={() => setZoomLevel((prev) => Math.min(1.8, prev + 0.2))}
            className="w-7 h-7 rounded-full hover:bg-[#f2dfd5] text-[#231914] font-bold text-sm flex items-center justify-center cursor-pointer transition-colors"
            title="Zoom In"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

