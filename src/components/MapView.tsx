import React, { useState } from 'react';
import { Artisan } from '../types';
import { HeritageHeatmap } from './HeritageHeatmap';
import { Search, SlidersHorizontal, MapPin, CheckCircle2, ChevronRight, Palette, Trees, Sprout } from 'lucide-react';

interface MapViewProps {
  artisans: Artisan[];
  onSelectArtisan: (artisan: Artisan) => void;
  onOpenScanner: () => void;
}

export const MapView: React.FC<MapViewProps> = ({
  artisans,
  onSelectArtisan,
  onOpenScanner,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Heritage Arts' | 'Agriculture' | 'Indigenous Flora'>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  const districts = ['all', ...new Set(artisans.map((a) => a.district))];

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

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 animate-in fade-in duration-300 pb-24 md:pb-16">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <span className="text-xs font-bold text-[#974400] uppercase tracking-wider block mb-1">
          Interactive Geospatial Registry
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#231914] mb-3">
          Explore Certified Origins
        </h1>
        <p className="text-sm text-[#564338]">
          Navigate across verified geographical indication (GI) clusters, indigenous agrarian preserves, and rare botanical sanctuaries in Jharkhand.
        </p>
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
            placeholder="Search by artisan, plant, craft, or district..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#fff8f6] rounded-xl text-xs sm:text-sm border border-[#ddc1b3]/50 focus:border-[#974400] outline-none text-[#231914]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Category Toggle */}
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
          onSelectArtisan={onSelectArtisan}
          selectedCategoryFilter={selectedCategory}
          onFilterChange={setSelectedCategory}
        />
      </div>

      {/* Filtered Results List */}
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
    </div>
  );
};
