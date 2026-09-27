import React, { useState, useRef } from 'react';
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
  PlusCircle,
  X,
  Camera,
  Navigation,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';

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
  onAddArtisan?: (artisan: Artisan) => void;
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
  onAddArtisan,
}) => {
  const [internalMode, setInternalMode] = useState<'creators' | 'events'>('creators');
  const mapMode = activeMapMode ?? internalMode;

  const [activePinId, setActivePinId] = useState<string>(artisans[0]?.id || 'sita-devi');
  const [activeEventId, setActiveEventId] = useState<string>('sohrai-harvest-mela');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedEventCategory, setSelectedEventCategory] = useState<string>('all');
  const [calendarSaved, setCalendarSaved] = useState(false);

  // 🌟 Feature 2: Interactive Heat Map Pinning State
  const [isPinningActive, setIsPinningActive] = useState<boolean>(false);
  const [draftPin, setDraftPin] = useState<{ x: number; y: number; lat: number; lng: number } | null>(null);
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);

  // Draft creator form state
  const [draftName, setDraftName] = useState('');
  const [draftCraft, setDraftCraft] = useState('');
  const [draftCategory, setDraftCategory] = useState<'Heritage Arts' | 'Agriculture' | 'Indigenous Flora'>('Heritage Arts');
  const [draftDistrict, setDraftDistrict] = useState('Hazaribagh');
  const [draftNotes, setDraftNotes] = useState('');
  const [draftPhoto, setDraftPhoto] = useState('');

  const mapContainerRef = useRef<HTMLDivElement>(null);

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

  // 🌟 FEATURE 2: Handle Map Click to Drop Pin
  const handleMapCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapContainerRef.current) return;

    // Get click bounding rect
    const rect = mapContainerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Calculate percentage coordinates (clamped between 5% and 95%)
    const pctX = Math.min(Math.max((clickX / rect.width) * 100, 5), 95);
    const pctY = Math.min(Math.max((clickY / rect.height) * 100, 5), 95);

    // Convert to realistic geospatial latitude and longitude for Jharkhand
    // Lat range: 22.0°N to 25.0°N (Top is higher lat), Lng range: 83.5°E to 87.8°E
    const calculatedLat = Number((25.0 - (pctY / 100) * 2.8).toFixed(4));
    const calculatedLng = Number((83.5 + (pctX / 100) * 4.2).toFixed(4));

    // Guess district based on coordinate quadrant
    let guessedDistrict = 'Hazaribagh';
    if (pctY < 40 && pctX > 55) guessedDistrict = 'Dumka';
    else if (pctY > 55 && pctX < 45) guessedDistrict = 'Gumla';
    else if (pctY > 50 && pctX >= 45 && pctX <= 65) guessedDistrict = 'Khunti';
    else if (pctY > 60 && pctX > 65) guessedDistrict = 'East Singhbhum';
    else if (pctY >= 35 && pctY <= 55 && pctX >= 40 && pctX <= 60) guessedDistrict = 'Ranchi';

    setDraftDistrict(guessedDistrict);
    setDraftPin({
      x: Number(pctX.toFixed(1)),
      y: Number(pctY.toFixed(1)),
      lat: calculatedLat,
      lng: calculatedLng,
    });
    setIsPinModalOpen(true);
  };

  const handleSaveDiscoveredPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftPin) return;

    const defaultImg =
      draftCategory === 'Heritage Arts'
        ? 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80'
        : draftCategory === 'Agriculture'
        ? 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80';

    const newArtisan: Artisan = {
      id: `pinned-${Date.now()}`,
      name: draftName.trim() || 'Discovered Master Creator',
      craftTitle: draftCraft.trim() || (draftCategory === 'Heritage Arts' ? 'Traditional Artisan' : 'Heirloom Conservator'),
      shortBio: draftNotes.slice(0, 100) || `Discovered by field scout in ${draftDistrict}, practicing authentic ${draftCategory}.`,
      fullBio: draftNotes || `Documented through on-site exploration in ${draftDistrict}, preserving authentic ancestral traditions.`,
      category: draftCategory,
      district: draftDistrict,
      state: 'Jharkhand',
      locationName: `${draftDistrict}, Jharkhand (Field Pinned)`,
      coordinates: {
        x: draftPin.x,
        y: draftPin.y,
        lat: draftPin.lat,
        lng: draftPin.lng,
      },
      trustScore: 94,
      trustRating: 4.8,
      verifiedVisits: 1,
      contributionsCount: 1,
      avatarUrl: draftPhoto || defaultImg,
      heroImageUrl: draftPhoto || defaultImg,
      postcardImageUrl: draftPhoto || defaultImg,
      artForm: draftCraft || draftCategory,
      artDescription: draftNotes || `Authentic ${draftCategory} discovered at coordinates ${draftPin.lat}°N, ${draftPin.lng}°E.`,
      tags: [draftDistrict, draftCategory, 'Scout Pinned', 'Field Geotagged'],
      registrationType: 'contributor',
      gallery: [
        {
          id: `gal-pin-${Date.now()}`,
          url: draftPhoto || defaultImg,
          caption: `${draftName} - ${draftCraft} (Field Geotag)`,
          author: 'Field Scout',
          span: 'col-span-2 row-span-2',
        },
      ],
      reviews: [
        {
          id: `rev-pin-${Date.now()}`,
          author: 'Explorer / Scout',
          date: 'Just now',
          rating: 5,
          text: draftNotes || `Geotagged on interactive map during field exploration at ${draftPin.lat}° N, ${draftPin.lng}° E.`,
          verifiedGps: `${draftDistrict}, Jharkhand (GPS: ${draftPin.lat}° N, ${draftPin.lng}° E)`,
        },
      ],
      contactInfo: {
        cooperative: `${draftDistrict} Cultural Guild`,
        address: `${draftDistrict} District, Jharkhand`,
      },
    };

    if (onAddArtisan) {
      onAddArtisan(newArtisan);
    }
    onSelectArtisan(newArtisan);
    setActivePinId(newArtisan.id);

    setIsPinModalOpen(false);
    setDraftPin(null);
    setIsPinningActive(false);

    // Reset draft form
    setDraftName('');
    setDraftCraft('');
    setDraftNotes('');
    setDraftPhoto('');

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#974400', '#186a22', '#ffdbc9'],
      });
    } catch {}
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden card-shadow bg-[#ffffff] border border-[#ddc1b3]/60 min-h-[620px] md:h-[660px] flex flex-col justify-between">
      {/* Background Relief Map image with overlay & click listener */}
      <div 
        ref={mapContainerRef}
        onClick={handleMapCanvasClick}
        className={`absolute inset-0 z-0 cursor-crosshair group ${isPinningActive ? 'ring-4 ring-[#974400] ring-inset' : ''}`}
        title="Click anywhere on the map to drop a pin and record a creator"
      >
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYl-IS5xU96H7Zjk2i8hSYw1Ud5VE9TCQ_CU709DFlqCgpmsEP3-Gy4rngPrCk_uj7dyfu6g-578022zOGJlxtentgEu6TOGArZ4ApvpLcuIKMNa2iqotKqHZi_sEOG2I4SBksCYbXkYOesIXeE8BdEcNho82L7NvEANhUy7Bdzk7KzrCQWVGJGICKQYItcyaQv4HIki66tKTUMNOCFcyL6brDoo7GjAxLCWDwAnKh83NH7Bp4zCk"
          alt="Relief map of Jharkhand showing indigenous artisan and botanical clusters"
          className="w-full h-full object-cover object-center transform transition-transform duration-500 scale-100 pointer-events-none select-none"
          style={{ transform: `scale(${zoomLevel})` }}
        />
        <div
          className={`absolute inset-0 transition-colors duration-500 pointer-events-none ${
            mapMode === 'events' ? 'bg-[#2b1810]/20' : 'bg-[#fff8f6]/20'
          }`}
        />
      </div>

      {/* Top Map Header Overlay with Mode Switch & Filters */}
      <div className="relative z-10 p-3 sm:p-5 flex flex-wrap justify-between items-center gap-3 pointer-events-auto">
        {/* Reset / Recenter Button */}
        <div className="flex items-center gap-2">
          <button
            id="map-reset-btn"
            onClick={(e) => {
              e.stopPropagation();
              setZoomLevel(1);
              if (mapMode === 'creators') {
                setActivePinId(artisans[0]?.id || 'sita-devi');
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
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="mx-auto sm:mx-0 flex bg-white/95 backdrop-blur-md p-1.5 rounded-full card-shadow border border-[#ddc1b3]/70 shadow-md"
        >
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

        {/* Quick Filter & Pin Action Control */}
        <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-2">
          {mapMode === 'creators' && (
            <button
              id="map-drop-pin-toggle-btn"
              onClick={() => setIsPinningActive(!isPinningActive)}
              className={`px-3.5 py-2 rounded-full card-shadow transition-all active:scale-95 flex items-center space-x-1.5 cursor-pointer text-xs font-bold border ${
                isPinningActive
                  ? 'bg-[#974400] text-white border-[#7b3700] ring-2 ring-[#ffdbc9]'
                  : 'bg-white/95 backdrop-blur-md text-[#974400] border-[#ddc1b3]/60 hover:bg-[#feeae0]'
              }`}
              title="Click to drop a pin anywhere on the map"
            >
              <MapPin className={`w-3.5 h-3.5 ${isPinningActive ? 'animate-bounce' : ''}`} />
              <span>{isPinningActive ? 'Tap on Map to Drop Pin' : 'Drop Pin on Map'}</span>
            </button>
          )}

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

      {/* Floating Explorer Instruction Badge */}
      <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className="bg-[#231914]/80 backdrop-blur-md text-white text-[11px] font-medium px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 border border-white/20 animate-in fade-in">
          <Sparkles className="w-3.5 h-3.5 text-[#ffdbc9]" />
          <span>Click anywhere on the map to drop a pin &amp; record a creator</span>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePinId(artisan.id);
                  }}
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

        {/* 🌟 FEATURE 2: Pulsing Draft Discovery Pin Marker */}
        {draftPin && (
          <div
            className="absolute pointer-events-auto transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 z-40"
            style={{
              left: `${draftPin.x}%`,
              top: `${draftPin.y}%`,
            }}
          >
            <div className="relative flex items-center justify-center p-3 rounded-full bg-[#974400] text-white shadow-2xl ring-4 ring-[#ffdbc9] scale-125 animate-bounce">
              <MapPin className="w-5 h-5 fill-white" />
              <span className="absolute -inset-2 rounded-full animate-ping bg-[#974400]/60 pointer-events-none" />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
              <span className="px-2.5 py-1 rounded-full bg-[#974400] text-white text-[10px] font-bold shadow-md border border-white">
                New Discovery Pin ({draftPin.lat}°N, {draftPin.lng}°E)
              </span>
            </div>
          </div>
        )}

        {/* Selected Artisan Floating Tooltip (Creators Mode) */}
        {mapMode === 'creators' && activeArtisan && !draftPin && (
          <div
            className="absolute pointer-events-auto transition-all duration-300 z-30"
            style={{
              left: `clamp(8%, ${activeArtisan.coordinates.x}%, 62%)`,
              top: `clamp(12%, ${activeArtisan.coordinates.y - 18}%, 50%)`,
            }}
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#ddc1b3]/70 max-w-[280px] sm:max-w-xs animate-in fade-in zoom-in-95 duration-200"
            >
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
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectArtisan(activeArtisan);
                }}
                className="w-full bg-[#974400] text-white py-2 px-3 rounded-full text-xs font-semibold hover:bg-[#bb5808] transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
              >
                <span>View Creator Profile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* MODE 2: EVENT RADAR PINS */}
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
                  onClick={(e) => {
                    e.stopPropagation();
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
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#ddc1b3]/70 max-w-[280px] sm:max-w-xs animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-bold uppercase text-[#e11d48] tracking-wider">
                  {activeEvent.category}
                </span>
                <span className="text-[10px] font-bold bg-[#ebfbee] text-[#006e0c] px-2 py-0.5 rounded-full border border-[#92fa83]">
                  {activeEvent.status}
                </span>
              </div>

              <h4 className="font-serif font-bold text-sm text-[#231914] leading-snug mb-1">
                {activeEvent.name}
              </h4>
              <p className="text-xs text-[#564338] mb-2">{activeEvent.venue}</p>

              <div className="text-[11px] text-[#564338] space-y-1 mb-3 bg-[#fff8f6] p-2 rounded-lg border border-[#ddc1b3]/40">
                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#e11d48]" />
                  <span>{activeEvent.dates}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#974400]" />
                  <span>{activeEvent.organizer}</span>
                </div>
              </div>

              <button
                id="save-calendar-reminder-btn"
                onClick={handleCalendarReminder}
                className="w-full bg-gradient-to-r from-[#e11d48] to-[#974400] text-white py-2 px-3 rounded-full text-xs font-semibold hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{calendarSaved ? 'Saved to Radar Calendar ✓' : 'Add to Field Radar'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Map Controls Bar */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative z-10 p-3 sm:p-4 flex flex-wrap justify-between items-center gap-2 text-xs text-[#564338] bg-white/90 backdrop-blur-md border-t border-[#ddc1b3]/40"
      >
        <div className="flex items-center gap-4">
          <span className="font-semibold text-[#231914] flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006e0c] animate-pulse" />
            <span>Live Geospatial Registry</span>
          </span>
          <span className="hidden sm:inline text-xs text-[#8a7266]">
            Showing {filteredArtisans.length} verified origins
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onReportEventClick && (
            <button
              id="map-report-event-cta-btn"
              onClick={onReportEventClick}
              className="text-[#e11d48] font-bold hover:underline flex items-center gap-1 text-xs cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Broadcast Haat</span>
            </button>
          )}
        </div>
      </div>

      {/* 🌟 FEATURE 2: MODAL POPUP FOR ENTERING DISCOVERED CREATOR DETAILS */}
      {isPinModalOpen && draftPin && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231914]/70 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-[#ddc1b3] p-6 sm:p-8 animate-in zoom-in-95">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#974400] bg-[#feeae0] px-2.5 py-0.5 rounded-full">
                  Geotag Creator Discovery
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#231914] mt-1.5">
                  Record Discovered Artisan
                </h3>
              </div>
              <button
                type="button"
                id="close-pin-modal-btn"
                onClick={() => {
                  setIsPinModalOpen(false);
                  setDraftPin(null);
                }}
                className="p-2 rounded-full hover:bg-[#fff1eb] text-[#564338] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDiscoveredPin} className="space-y-4">
              {/* Captured GPS Coordinates Badge */}
              <div className="p-3 bg-[#ebfbee] rounded-xl border border-[#92fa83] flex items-center justify-between text-xs font-bold text-[#006e0c]">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#006e0c]" />
                  <span>Captured Coordinates:</span>
                </div>
                <span>{draftPin.lat}° N, {draftPin.lng}° E</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#231914] mb-1">
                  Artisan / Workshop / Farm Name <span className="text-[#974400]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  placeholder="e.g. Birsa Murmu Terracotta Studio"
                  className="w-full px-4 py-2.5 bg-[#fff8f6] rounded-xl text-sm font-semibold border border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#231914] mb-1">
                    Category <span className="text-[#974400]">*</span>
                  </label>
                  <select
                    value={draftCategory}
                    onChange={(e) => setDraftCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-[#fff8f6] rounded-xl text-xs sm:text-sm font-semibold border border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                  >
                    <option value="Heritage Arts">Heritage Arts (हस्तशिल्प)</option>
                    <option value="Agriculture">Agriculture (पारंपरिक कृषि)</option>
                    <option value="Indigenous Flora">Indigenous Flora (देशज वनस्पति)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#231914] mb-1">
                    District <span className="text-[#974400]">*</span>
                  </label>
                  <select
                    value={draftDistrict}
                    onChange={(e) => setDraftDistrict(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#fff8f6] rounded-xl text-xs sm:text-sm font-semibold border border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                  >
                    <option value="Hazaribagh">Hazaribagh</option>
                    <option value="Ranchi">Ranchi</option>
                    <option value="Khunti">Khunti</option>
                    <option value="Dumka">Dumka</option>
                    <option value="East Singhbhum">East Singhbhum</option>
                    <option value="Gumla">Gumla</option>
                    <option value="Simdega">Simdega</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#231914] mb-1">
                  Craft / Produce Title <span className="text-[#974400]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={draftCraft}
                  onChange={(e) => setDraftCraft(e.target.value)}
                  placeholder="e.g. Master Sohrai Painter or Wild Kalmegh Forager"
                  className="w-full px-4 py-2.5 bg-[#fff8f6] rounded-xl text-sm font-semibold border border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#564338] mb-1">
                  Field Notes &amp; Observations
                </label>
                <textarea
                  rows={2}
                  value={draftNotes}
                  onChange={(e) => setDraftNotes(e.target.value)}
                  placeholder="Found during village scout trek. Uses local earth pigments and traditional datun brushes..."
                  className="w-full p-3 bg-[#fff8f6] rounded-xl text-xs border border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  id="cancel-pin-modal-btn"
                  onClick={() => {
                    setIsPinModalOpen(false);
                    setDraftPin(null);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-[#ddc1b3] text-[#564338] text-xs font-bold hover:bg-[#fff1eb] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-discovered-pin-btn"
                  className="bg-[#974400] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#bb5808] transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Save Pin to Registry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
