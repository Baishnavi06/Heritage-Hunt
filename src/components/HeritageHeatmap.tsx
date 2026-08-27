import React, { useState } from 'react';
import { Artisan, LocalEvent } from '../types';
import { INITIAL_EVENTS } from '../data/events';
import {
  MapPin,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  SlidersHorizontal,
  RotateCcw,
  Trees,
  Palette,
  Sprout,
  Calendar,
  Radio,
  Users,
  Clock,
  ExternalLink,
  Share2,
  Bookmark,
} from 'lucide-react';

interface HeritageHeatmapProps {
  artisans: Artisan[];
  events?: LocalEvent[];
  onSelectArtisan: (artisan: Artisan) => void;
  selectedCategoryFilter: 'all' | 'Heritage Arts' | 'Agriculture' | 'Indigenous Flora';
  onFilterChange: (category: 'all' | 'Heritage Arts' | 'Agriculture' | 'Indigenous Flora') => void;
  activeMapMode?: 'creators' | 'events';
  onMapModeChange?: (mode: 'creators' | 'events') => void;
  onSelectEvent?: (event: LocalEvent) => void;
  onReportEventClick?: () => void;
}

export const HeritageHeatmap: React.FC<HeritageHeatmapProps> = ({
  artisans,
  events = INITIAL_EVENTS,
  onSelectArtisan,
  selectedCategoryFilter,
  onFilterChange,
  activeMapMode,
  onMapModeChange,
  onSelectEvent,
  onReportEventClick,
}) => {
  const [internalMode, setInternalMode] = useState<'creators' | 'events'>('creators');
  const mapMode = activeMapMode ?? internalMode;

  const [activePinId, setActivePinId] = useState<string>('sita-devi');
  const [activeEventId, setActiveEventId] = useState<string>('sohrai-harvest-mela');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedEventCategory, setSelectedEventCategory] = useState<string>('all');
  const [calendarSaved, setCalendarSaved] = useState(false);

  const handleMapModeChange = (mode: 'creators' | 'events') => {
    if (onMapModeChange) {
      onMapModeChange(mode);
    } else {
      setInternalMode(mode);
    }
  };

  // Filtered Creators
  const filteredArtisans = artisans.filter((a) => {
    if (selectedCategoryFilter === 'all') return true;
    return a.category === selectedCategoryFilter;
  });

  // Filtered Events
  const filteredEvents = events.filter((e) => {
    if (selectedEventCategory === 'all') return true;
    return e.category === selectedEventCategory;
  });

  const activeArtisan = artisans.find((a) => a.id === activePinId) || artisans[0];
  const activeEvent = events.find((e) => e.id === activeEventId) || events[0];

  const handleCalendarReminder = () => {
    setCalendarSaved(true);
    setTimeout(() => setCalendarSaved(false), 2500);
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden card-shadow bg-[#ffffff] border border-[#ddc1b3]/60 min-h-[600px] md:h-[650px] flex flex-col justify-between">
      {/* Background Relief Map image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYl-IS5xU96H7Zjk2i8hSYw1Ud5VE9TCQ_CU709DFlqCgpmsEP3-Gy4rngPrCk_uj7dyfu6g-578022zOGJlxtentgEu6TOGArZ4ApvpLcuIKMNa2iqotKqHZi_sEOG2I4SBksCYbXkYOesIXeE8BdEcNho82L7NvEANhUy7Bdzk7KzrCQWVGJGICKQYItcyaQv4HIki66tKTUMNOCFcyL6brDoo7GjAxLCWDwAnKh83NH7Bp4zCk"
          alt="Relief map of Jharkhand showing indigenous artisan and botanical clusters"
          className="w-full h-full object-cover object-center transform transition-transform duration-500 scale-100"
          style={{ transform: `scale(${zoomLevel})` }}
        />
        <div
          className={`absolute inset-0 transition-colors duration-500 pointer-events-none ${
            mapMode === 'events' ? 'bg-[#2b1810]/20' : 'bg-[#fff8f6]/20'
          }`}
        />
      </div>

      {/* Top Map Header Overlay with Mode Switch & Filters */}
      <div className="relative z-10 p-3 sm:p-5 flex flex-wrap justify-between items-center gap-3">
        {/* Reset / Recenter Button */}
        <div className="flex items-center gap-2">
          <button
            id="map-reset-btn"
            onClick={() => {
              setZoomLevel(1);
              if (mapMode === 'creators') {
                setActivePinId('sita-devi');
              } else {
                setActiveEventId('sohrai-harvest-mela');
              }
            }}
            className="bg-white/95 backdrop-blur-md p-2.5 md:p-3 rounded-full card-shadow text-[#231914] hover:text-[#974400] hover:bg-white transition-all active:scale-95 flex items-center justify-center cursor-pointer border border-[#ddc1b3]/40"
            title="Reset Map View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Region Title Badge (desktop) */}
          <div className="hidden lg:block bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full card-shadow border border-[#ddc1b3]/40 text-left">
            <div className="font-serif font-bold text-[#231914] tracking-wider uppercase text-xs">
              JHARKHAND
            </div>
            <div className="text-[10px] text-[#564338] font-medium">
              {mapMode === 'creators' ? 'Heritage & Flora Index' : 'Active Event Radar'}
            </div>
          </div>
        </div>

        {/* 🌟 Central Sleek Pill Toggle Switch: "Discover Creators" vs "Event Radar" */}
        <div className="mx-auto sm:mx-0 flex bg-white/95 backdrop-blur-md p-1.5 rounded-full card-shadow border border-[#ddc1b3]/70 shadow-md">
          <button
            type="button"
            id="map-toggle-creators-tab"
            onClick={() => handleMapModeChange('creators')}
            className={`px-3 sm:px-5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              mapMode === 'creators'
                ? 'bg-[#974400] text-white shadow-sm'
                : 'text-[#564338] hover:text-[#974400]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Discover Creators</span>
          </button>

          <button
            type="button"
            id="map-toggle-event-radar-tab"
            onClick={() => handleMapModeChange('events')}
            className={`px-3 sm:px-5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer relative ${
              mapMode === 'events'
                ? 'bg-gradient-to-r from-[#e11d48] to-[#974400] text-white shadow-sm'
                : 'text-[#564338] hover:text-[#e11d48]'
            }`}
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Event Radar</span>
            <span className="flex h-2 w-2 relative ml-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4d6d] opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e11d48]"></span>
            </span>
          </button>
        </div>

        {/* Quick Filter Control based on Active Mode */}
        <div className="flex items-center gap-2">
          {mapMode === 'creators' ? (
            <button
              id="map-filter-creators-toggle-btn"
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
              className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full card-shadow text-[#231914] hover:text-[#974400] hover:bg-white transition-all active:scale-95 flex items-center space-x-1.5 cursor-pointer text-xs font-semibold border border-[#ddc1b3]/40"
              title="Toggle Category Filter"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#974400]" />
              <span className="hidden sm:inline">
                {selectedCategoryFilter === 'all' ? 'All Creators' : selectedCategoryFilter}
              </span>
            </button>
          ) : (
            <button
              id="map-filter-events-toggle-btn"
              onClick={() => {
                const categories = [
                  'all',
                  'Tribal Craft Mela',
                  'Agrarian Haat',
                  'Botanical Fair',
                  'Heritage Festival',
                ];
                const currentIndex = categories.indexOf(selectedEventCategory);
                const nextIndex = (currentIndex + 1) % categories.length;
                setSelectedEventCategory(categories[nextIndex]);
              }}
              className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full card-shadow text-[#231914] hover:text-[#e11d48] hover:bg-white transition-all active:scale-95 flex items-center space-x-1.5 cursor-pointer text-xs font-semibold border border-[#ddc1b3]/40"
              title="Toggle Event Type"
            >
              <Calendar className="w-3.5 h-3.5 text-[#e11d48]" />
              <span className="hidden sm:inline">
                {selectedEventCategory === 'all' ? 'All Events' : selectedEventCategory}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Map Pins Area */}
      <div className="relative z-10 flex-grow w-full h-full my-auto pointer-events-none">
        {/* MODE 1: DISCOVER CREATORS PINS */}
        {mapMode === 'creators' &&
          filteredArtisans.map((artisan) => {
            const isSelected = artisan.id === activePinId;
            const isArts = artisan.category === 'Heritage Arts';
            const isAgri = artisan.category === 'Agriculture';

            return (
              <div
                key={artisan.id}
                className="absolute pointer-events-auto transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${artisan.coordinates.x}%`,
                  top: `${artisan.coordinates.y}%`,
                }}
              >
                {/* Animated Creator Pin */}
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

                  {/* Pulse Ring */}
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

        {/* Selected Artisan Floating Tooltip (Creators Mode) */}
        {mapMode === 'creators' && activeArtisan && (
          <div
            className="absolute pointer-events-auto transition-all duration-300 z-30"
            style={{
              left: `clamp(8%, ${activeArtisan.coordinates.x}%, 62%)`,
              top: `clamp(12%, ${activeArtisan.coordinates.y - 18}%, 50%)`,
            }}
          >
            <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#ddc1b3]/70 max-w-[280px] sm:max-w-xs animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center space-x-2.5">
                  <img
                    src={activeArtisan.avatarUrl}
                    alt={activeArtisan.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#974400]/30 shadow-xs"
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
                className="w-full bg-[#974400] text-white py-2 px-3 rounded-full text-xs font-semibold hover:bg-[#bb5808] transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
              >
                <span>View Creator Profile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* MODE 2: EVENT RADAR PINS WITH GLOWING PULSE & RADIO/CALENDAR ICONS */}
        {mapMode === 'events' &&
          filteredEvents.map((event) => {
            const isSelected = event.id === activeEventId;
            const isHappeningNow = event.status === 'Happening Now' || event.status === 'Live Haat';

            return (
              <div
                key={event.id}
                className="absolute pointer-events-auto transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 z-20"
                style={{
                  left: `${event.coordinates.x}%`,
                  top: `${event.coordinates.y}%`,
                }}
              >
                {/* Glowing Animated Event Pin */}
                <button
                  id={`event-radar-pin-${event.id}`}
                  onClick={() => {
                    setActiveEventId(event.id);
                    if (onSelectEvent) onSelectEvent(event);
                  }}
                  className={`group relative flex items-center justify-center p-2.5 rounded-full transition-transform active:scale-95 cursor-pointer shadow-lg ${
                    isSelected
                      ? 'bg-gradient-to-tr from-[#e11d48] via-[#f43f5e] to-[#fb923c] text-white ring-4 ring-[#ffe4e6] scale-125 shadow-rose-500/50'
                      : isHappeningNow
                      ? 'bg-[#e11d48] text-white hover:scale-115 ring-2 ring-white shadow-rose-500/30'
                      : 'bg-[#974400] text-white hover:scale-115 ring-2 ring-white'
                  }`}
                  title={`${event.name} (${event.dates})`}
                >
                  <Radio className={`w-4 h-4 ${isSelected || isHappeningNow ? 'animate-pulse' : ''}`} />

                  {/* Multi-layered Glowing Pulse Waves for Radar effect */}
                  <span className="absolute -inset-2 rounded-full animate-ping bg-[#e11d48]/40 pointer-events-none" />
                  {isHappeningNow && (
                    <span className="absolute -inset-4 rounded-full animate-ping opacity-25 bg-[#fb923c] pointer-events-none" />
                  )}
                </button>

                {/* Event Pin Label */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md flex items-center gap-1 border ${
                      isHappeningNow
                        ? 'bg-[#e11d48] text-white border-white/60 animate-pulse'
                        : 'bg-white/95 text-[#231914] border-[#ddc1b3]/60'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>{event.district} • {event.dates.split('•')[0]}</span>
                  </span>
                </div>
              </div>
            );
          })}

        {/* Selected Event Floating Card Tooltip */}
        {mapMode === 'events' && activeEvent && (
          <div
            className="absolute pointer-events-auto transition-all duration-300 z-30"
            style={{
              left: `clamp(6%, ${activeEvent.coordinates.x}%, 58%)`,
              top: `clamp(10%, ${activeEvent.coordinates.y - 20}%, 45%)`,
            }}
          >
            <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-2xl border-2 border-[#e11d48]/30 max-w-[310px] sm:max-w-sm animate-in fade-in zoom-in-95 duration-200">
              {/* Top Banner Status & Category */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#ffe4e6] text-[#e11d48] border border-[#fecdd3]">
                  {activeEvent.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#f7fff1] text-[#186a22] border border-[#a3f69c] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#186a22] animate-ping" />
                  {activeEvent.status}
                </span>
              </div>

              {/* Event Title */}
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#231914] mb-1 leading-snug">
                {activeEvent.name}
              </h4>

              {/* Dates & Venue Info */}
              <div className="space-y-1 text-xs text-[#564338] mb-3">
                <div className="flex items-center gap-1.5 font-semibold text-[#974400]">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>{activeEvent.dates}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#8a7266]">
                  <MapPin className="w-3.5 h-3.5 text-[#e11d48] shrink-0" />
                  <span className="truncate">{activeEvent.venue}</span>
                </div>
              </div>

              {/* Featured Crafts */}
              <div className="flex flex-wrap gap-1 mb-3">
                {activeEvent.featuredCrafts.map((craft, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-[#fff1eb] text-[#974400] text-[10px] font-semibold"
                  >
                    {craft}
                  </span>
                ))}
              </div>

              {/* Event Highlights & Rewards Note */}
              <div className="p-2 bg-[#fff8f6] rounded-xl border border-[#ddc1b3]/50 text-[11px] text-[#564338] mb-3 flex items-center justify-between">
                <span>
                  👥 <strong>{activeEvent.expectedArtisans}+</strong> Artisans on site
                </span>
                <span className="text-[#006e0c] font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#ff9900]" />
                  +50 Scout Pts
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  id={`rsvp-event-btn-${activeEvent.id}`}
                  onClick={handleCalendarReminder}
                  className="flex-1 bg-[#e11d48] hover:bg-[#be123c] text-white py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm active:scale-95"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{calendarSaved ? 'Saved to Radar ✓' : 'Save / Add Calendar'}</span>
                </button>

                {onReportEventClick && (
                  <button
                    type="button"
                    onClick={onReportEventClick}
                    className="p-2 bg-[#fff1eb] text-[#974400] hover:bg-[#feeae0] rounded-xl border border-[#ddc1b3] transition-colors cursor-pointer"
                    title="Report / Update Event"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Legend Overlay at bottom */}
      <div className="relative z-10 p-3 sm:p-5 flex flex-wrap justify-between items-end gap-3 pointer-events-none">
        {/* Dynamic Legend */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl card-shadow border border-[#ddc1b3]/40 space-y-1.5 text-xs font-semibold text-[#231914]">
          {mapMode === 'creators' ? (
            <>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#974400] flex items-center justify-center text-white text-[8px]">
                  ✓
                </span>
                <span>🟠 Heritage Arts Masters</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#186a22] flex items-center justify-center text-white text-[8px]">
                  ✓
                </span>
                <span>🟢 Heirloom Agrarian Preserves</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#006e0c] flex items-center justify-center text-white text-[8px]">
                  ✓
                </span>
                <span>🌿 Rare Indigenous Flora Stewards</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2 text-[#e11d48]">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>🔴 Live Tribal Melas &amp; Exhibitions</span>
              </div>
              <div className="flex items-center space-x-2 text-[#186a22]">
                <Trees className="w-3.5 h-3.5" />
                <span>🌾 Farmers Haats &amp; Seed Exchanges</span>
              </div>
              <div className="flex items-center space-x-2 text-[#974400]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>✨ Community Verified Event Radar</span>
              </div>
            </>
          )}
        </div>

        {/* Zoom In / Out Controls */}
        <div className="pointer-events-auto flex items-center space-x-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-full card-shadow border border-[#ddc1b3]/40">
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
