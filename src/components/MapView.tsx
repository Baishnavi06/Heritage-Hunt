import React, { useState } from 'react';
import { Artisan, LocalEvent } from '../types';
import { INITIAL_EVENTS } from '../data/events';
import { HeritageHeatmap } from './HeritageHeatmap';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Palette,
  Trees,
  Sprout,
  Radio,
  Calendar,
  Sparkles,
  Users,
  Clock,
  PlusCircle,
} from 'lucide-react';

interface MapViewProps {
  artisans: Artisan[];
  events?: LocalEvent[];
  onSelectArtisan: (artisan: Artisan) => void;
  onSelectEvent?: (event: LocalEvent) => void;
  onReportEvent?: () => void;
}

export const MapView: React.FC<MapViewProps> = ({
  artisans,
  events = INITIAL_EVENTS,
  onSelectArtisan,
  onSelectEvent,
  onReportEvent,
}) => {
  const [mapMode, setMapMode] = useState<'creators' | 'events'>('creators');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'Heritage Arts' | 'Agriculture' | 'Indigenous Flora'
  >('all');
  const [selectedEventCategory, setSelectedEventCategory] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  // Combined districts from both artisans and events
  const districts = [
    'all',
    ...new Set([
      ...artisans.map((a) => a.district),
      ...events.map((e) => e.district),
    ]),
  ];

  // Filtered Creators
  const filteredArtisans = artisans.filter((artisan) => {
    const matchesSearch =
      artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.craftTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.artForm.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || artisan.category === selectedCategory;

    const matchesDistrict =
      selectedDistrict === 'all' || artisan.district === selectedDistrict;

    return matchesSearch && matchesCategory && matchesDistrict;
  });

  // Filtered Events
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.featuredCrafts.some((c) =>
        c.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedEventCategory === 'all' || event.category === selectedEventCategory;

    const matchesDistrict =
      selectedDistrict === 'all' || event.district === selectedDistrict;

    return matchesSearch && matchesCategory && matchesDistrict;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 animate-in fade-in duration-300 pb-24 md:pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-[#974400] uppercase tracking-wider block mb-1">
            Interactive Geospatial Registry &amp; Radar
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#231914] mb-3">
            {mapMode === 'creators'
              ? 'Explore Certified Origins'
              : 'Local Event & Haat Radar'}
          </h1>
          <p className="text-sm text-[#564338]">
            {mapMode === 'creators'
              ? 'Navigate across verified geographical indication (GI) clusters, indigenous agrarian preserves, and rare botanical sanctuaries in Jharkhand.'
              : 'Live radar of community fairs, tribal craft melas, weekly agrarian haats, and artisan exhibitions taking place across Jharkhand.'}
          </p>
        </div>

        {/* Action Button: Report Event if on Radar */}
        {onReportEvent && (
          <button
            id="map-report-event-action-btn"
            onClick={onReportEvent}
            className="bg-[#974400] hover:bg-[#bb5808] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-2 active:scale-95 cursor-pointer shrink-0"
          >
            <Radio className="w-4 h-4 text-[#ffdbc9]" />
            <span>Report a Local Event (+50 Pts)</span>
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl card-shadow border border-[#ddc1b3]/40 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#8a7266] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              mapMode === 'creators'
                ? 'Search by artisan, plant, craft, or district...'
                : 'Search fairs, melas, haats, venues, or crafts...'
            }
            className="w-full pl-10 pr-4 py-2.5 bg-[#fff8f6] rounded-xl text-xs sm:text-sm border border-[#ddc1b3]/50 focus:border-[#974400] outline-none text-[#231914]"
          />
        </div>

        {/* Filter Pills based on active mode */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {mapMode === 'creators' ? (
            /* Creator Category Toggle */
            <div className="flex flex-wrap bg-[#fff1eb] p-1 rounded-xl border border-[#ddc1b3]/40">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#974400] text-white shadow-2xs'
                    : 'text-[#564338] hover:text-[#231914]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('Heritage Arts')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedCategory === 'Heritage Arts'
                    ? 'bg-[#974400] text-white shadow-2xs'
                    : 'text-[#564338] hover:text-[#231914]'
                }`}
              >
                <Palette className="w-3 h-3" />
                <span>Arts</span>
              </button>
              <button
                onClick={() => setSelectedCategory('Agriculture')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedCategory === 'Agriculture'
                    ? 'bg-[#186a22] text-white shadow-2xs'
                    : 'text-[#564338] hover:text-[#231914]'
                }`}
              >
                <Trees className="w-3 h-3" />
                <span>Agro</span>
              </button>
              <button
                onClick={() => setSelectedCategory('Indigenous Flora')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedCategory === 'Indigenous Flora'
                    ? 'bg-[#006e0c] text-white shadow-2xs'
                    : 'text-[#564338] hover:text-[#231914]'
                }`}
              >
                <Sprout className="w-3 h-3" />
                <span>Flora</span>
              </button>
            </div>
          ) : (
            /* Event Category Toggle */
            <div className="flex flex-wrap bg-[#fff1eb] p-1 rounded-xl border border-[#ddc1b3]/40">
              <button
                onClick={() => setSelectedEventCategory('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedEventCategory === 'all'
                    ? 'bg-[#e11d48] text-white shadow-2xs'
                    : 'text-[#564338] hover:text-[#231914]'
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setSelectedEventCategory('Tribal Craft Mela')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedEventCategory === 'Tribal Craft Mela'
                    ? 'bg-[#e11d48] text-white shadow-2xs'
                    : 'text-[#564338] hover:text-[#231914]'
                }`}
              >
                Craft Melas
              </button>
              <button
                onClick={() => setSelectedEventCategory('Agrarian Haat')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedEventCategory === 'Agrarian Haat'
                    ? 'bg-[#186a22] text-white shadow-2xs'
                    : 'text-[#564338] hover:text-[#231914]'
                }`}
              >
                Agrarian Haats
              </button>
              <button
                onClick={() => setSelectedEventCategory('Botanical Fair')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedEventCategory === 'Botanical Fair'
                    ? 'bg-[#006e0c] text-white shadow-2xs'
                    : 'text-[#564338] hover:text-[#231914]'
                }`}
              >
                Botanical
              </button>
            </div>
          )}

          {/* District Dropdown */}
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-2 bg-[#fff1eb] text-xs font-semibold text-[#231914] rounded-xl border border-[#ddc1b3]/40 outline-none cursor-pointer"
          >
            {districts.map((d) => (
              <option key={d} value={d}>
                {d === 'all' ? 'All Districts' : d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Map View */}
      <div className="mb-12">
        <HeritageHeatmap
          artisans={filteredArtisans}
          events={filteredEvents}
          onSelectArtisan={onSelectArtisan}
          selectedCategoryFilter={selectedCategory}
          onFilterChange={setSelectedCategory}
          activeMapMode={mapMode}
          onMapModeChange={setMapMode}
          onSelectEvent={onSelectEvent}
          onReportEventClick={onReportEvent}
        />
      </div>

      {/* Filtered Results List: Dynamic based on Active Mode */}
      {mapMode === 'creators' ? (
        /* Creators Directory */
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#231914] mb-4">
            Verified Artisans, Agrarian &amp; Botanical Stewards ({filteredArtisans.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArtisans.map((artisan) => (
              <div
                key={artisan.id}
                onClick={() => onSelectArtisan(artisan)}
                className="bg-white p-4 rounded-xl card-shadow border border-[#ddc1b3]/40 flex items-center justify-between cursor-pointer hover:border-[#974400]/40 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={artisan.avatarUrl}
                    alt={artisan.name}
                    className="w-14 h-14 rounded-full object-cover border border-[#ddc1b3]"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-serif font-bold text-base text-[#231914]">
                        {artisan.name}
                      </h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#006e0c] fill-[#8ff780]" />
                    </div>
                    <p className="text-xs text-[#564338]">{artisan.craftTitle}</p>
                    <p className="text-[11px] text-[#8a7266] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#974400]" />
                      <span>{artisan.locationName}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-bold text-[#006e0c] block">
                      ★ {artisan.trustRating}
                    </span>
                    <span className="text-[10px] text-[#564338]">
                      {artisan.trustScore}% trust
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#feeae0] text-[#974400] flex items-center justify-center">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Event Radar Directory */
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-serif text-2xl font-bold text-[#231914] flex items-center gap-2">
              <Radio className="w-5 h-5 text-[#e11d48] animate-pulse" />
              <span>Active Community Fairs &amp; Exhibitions ({filteredEvents.length})</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white p-5 rounded-2xl card-shadow border border-[#ddc1b3]/40 flex flex-col justify-between hover:border-[#e11d48]/50 transition-all group"
              >
                <div>
                  {/* Top status & category */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#ffe4e6] text-[#e11d48] border border-[#fecdd3]">
                      {event.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#f7fff1] text-[#186a22] border border-[#a3f69c] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#186a22] animate-ping" />
                      {event.status}
                    </span>
                  </div>

                  {/* Title & description */}
                  <h4 className="font-serif font-bold text-lg text-[#231914] mb-1 group-hover:text-[#e11d48] transition-colors">
                    {event.name}
                  </h4>
                  <p className="text-xs text-[#564338] line-clamp-2 mb-3">
                    {event.description}
                  </p>

                  {/* Metadata: Dates & Location */}
                  <div className="space-y-1 text-xs text-[#564338] mb-3 bg-[#fff8f6] p-3 rounded-xl border border-[#ddc1b3]/30">
                    <div className="flex items-center gap-2 font-semibold text-[#974400]">
                      <Calendar className="w-3.5 h-3.5 text-[#974400]" />
                      <span>{event.dates}</span>
                      {event.time && <span className="text-[#8a7266]">• {event.time}</span>}
                    </div>
                    <div className="flex items-center gap-2 text-[#564338]">
                      <MapPin className="w-3.5 h-3.5 text-[#e11d48]" />
                      <span>{event.venue} ({event.district})</span>
                    </div>
                  </div>

                  {/* Featured crafts tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {event.featuredCrafts.map((craft, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full bg-[#fff1eb] text-[#974400] text-[11px] font-semibold"
                      >
                        {craft}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row info & Scout reward note */}
                <div className="pt-3 border-t border-[#ddc1b3]/30 flex justify-between items-center text-xs">
                  <span className="text-[#564338]">
                    Organized by: <strong className="text-[#231914]">{event.organizer}</strong>
                  </span>
                  <span className="text-[#006e0c] font-bold flex items-center gap-1 bg-[#ebfbee] px-2.5 py-1 rounded-full border border-[#92fa83]">
                    <Sparkles className="w-3 h-3 text-[#ff9900]" />
                    +{event.pointsReward || 50} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
