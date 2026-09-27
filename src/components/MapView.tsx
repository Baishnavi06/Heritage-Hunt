import React, { useState } from 'react';
import { Artisan, LocalEvent } from '../types';
import { INITIAL_EVENTS } from '../data/events';
import { HeritageHeatmap } from './HeritageHeatmap';
import { RootsKnowledgeHubSection } from './RootsKnowledgeHubSection';
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
  onAddArtisan?: (artisan: Artisan) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  artisans,
  events = INITIAL_EVENTS,
  onSelectArtisan,
  onSelectEvent,
  onReportEvent,
  onAddArtisan,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 animate-in fade-in duration-300 pb-28 md:pb-16">
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
              ? 'Navigate across verified geographical indication (GI) clusters, indigenous agrarian preserves, and rare botanical sanctuaries in Jharkhand. Click anywhere on the map to drop a pin.'
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
                ? 'Search by artisan, craft, district...'
                : 'Search fairs, haats, exhibitions...'
            }
            className="w-full pl-10 pr-4 py-2.5 bg-[#fff8f6] border border-[#ddc1b3] rounded-xl text-xs sm:text-sm focus:border-[#974400] outline-none text-[#231914]"
          />
        </div>

        {/* District Filter Dropdown */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-start md:justify-end">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-[#564338]">District:</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-[#fff8f6] border border-[#ddc1b3] text-xs font-semibold rounded-xl px-3 py-2 text-[#231914] focus:border-[#974400] outline-none cursor-pointer"
            >
              {districts.map((dist) => (
                <option key={dist} value={dist}>
                  {dist === 'all' ? 'All Districts' : dist}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Interactive Heat Map Canvas */}
      <div className="mb-12">
        <HeritageHeatmap
          artisans={artisans}
          events={events}
          onSelectArtisan={onSelectArtisan}
          selectedCategoryFilter={selectedCategory}
          onFilterChange={setSelectedCategory}
          activeMapMode={mapMode}
          onMapModeChange={setMapMode}
          onSelectEvent={onSelectEvent}
          onReportEventClick={onReportEvent}
          onAddArtisan={onAddArtisan}
        />
      </div>

      {/* 🌟 FEATURE 4: Roots Knowledge Hub Section Embedded in Map View */}
      <div className="mb-12">
        <RootsKnowledgeHubSection
          onExploreDistrictCreators={(d) => setSelectedDistrict(d)}
        />
      </div>

      {/* Filtered List View Section */}
      {mapMode === 'creators' ? (
        /* Creators Directory */
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-serif text-2xl font-bold text-[#231914]">
              Discovered Creators ({filteredArtisans.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredArtisans.map((artisan) => (
              <div
                key={artisan.id}
                onClick={() => onSelectArtisan(artisan)}
                className="bg-white p-4 rounded-2xl card-shadow border border-[#ddc1b3]/40 flex items-center justify-between hover:border-[#974400]/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={artisan.avatarUrl}
                    alt={artisan.name}
                    className="w-12 h-12 rounded-xl object-cover border border-[#ddc1b3]"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#231914] group-hover:text-[#974400] transition-colors">
                      {artisan.name}
                    </h4>
                    <p className="text-xs text-[#564338]">{artisan.craftTitle}</p>
                    <span className="text-[10px] text-[#8a7266] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#974400]" />
                      <span>{artisan.district}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right flex flex-col items-end">
                    <span className="text-xs font-bold text-[#006e0c] block">
                      ★ {artisan.trustRating}
                    </span>
                    <span className="text-[10px] text-[#564338]">
                      {artisan.trustScore}% trust
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#feeae0] text-[#974400] flex items-center justify-center shrink-0">
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
