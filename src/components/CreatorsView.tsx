import React, { useState } from 'react';
import { Artisan } from '../types';
import { Search, CheckCircle2, ArrowRight, ShieldCheck, MapPin, Sparkles, Palette, Trees, Sprout } from 'lucide-react';

interface CreatorsViewProps {
  artisans: Artisan[];
  onSelectArtisan: (artisan: Artisan) => void;
  onOpenScanner: () => void;
}

export const CreatorsView: React.FC<CreatorsViewProps> = ({
  artisans,
  onSelectArtisan,
  onOpenScanner,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'Heritage Arts' | 'Agriculture' | 'Indigenous Flora'>('all');
  const [search, setSearch] = useState('');

  const filtered = artisans.filter((a) => {
    const matchesCat = activeCategory === 'all' || a.category === activeCategory;
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.district.toLowerCase().includes(search.toLowerCase()) ||
      a.craftTitle.toLowerCase().includes(search.toLowerCase()) ||
      a.artForm.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 animate-in fade-in duration-300 pb-24 md:pb-16">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <span className="text-xs font-bold text-[#974400] uppercase tracking-wider block mb-1">
          Master Keepers of Culture &amp; Ecology
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#231914] mb-3">
          Verified Artisans, Agrarian &amp; Botanical Stewards
        </h1>
        <p className="text-sm text-[#564338]">
          Explore the individual passports of rural artisans, organic heirloom farmers, and tribal forest herbalists whose heritage has been validated on-site.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex flex-wrap bg-[#fff1eb] p-1 rounded-xl border border-[#ddc1b3]/40 w-full sm:w-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#974400] text-white shadow-2xs'
                : 'text-[#564338]'
            }`}
          >
            All Stewards
          </button>
          <button
            onClick={() => setActiveCategory('Heritage Arts')}
            className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeCategory === 'Heritage Arts'
                ? 'bg-[#974400] text-white shadow-2xs'
                : 'text-[#564338]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Heritage Arts</span>
          </button>
          <button
            onClick={() => setActiveCategory('Agriculture')}
            className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeCategory === 'Agriculture'
                ? 'bg-[#186a22] text-white shadow-2xs'
                : 'text-[#564338]'
            }`}
          >
            <Trees className="w-3.5 h-3.5" />
            <span>Agriculture</span>
          </button>
          <button
            onClick={() => setActiveCategory('Indigenous Flora')}
            className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeCategory === 'Indigenous Flora'
                ? 'bg-[#006e0c] text-white shadow-2xs'
                : 'text-[#564338]'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>Indigenous Flora</span>
          </button>
        </div>

        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 text-[#8a7266] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search creator name, plant, or craft..."
            className="w-full pl-9 pr-4 py-2 bg-white rounded-xl text-xs border border-[#ddc1b3] focus:border-[#974400] outline-none"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((artisan) => (
          <div
            key={artisan.id}
            onClick={() => onSelectArtisan(artisan)}
            className="bg-white rounded-2xl overflow-hidden card-shadow border border-[#ddc1b3]/40 cursor-pointer flex flex-col group hover:border-[#974400]/40 transition-all"
          >
            <div className="relative h-48 sm:h-56 overflow-hidden bg-[#fff1eb]">
              <img
                src={artisan.heroImageUrl}
                alt={artisan.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#186a22]/90 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#92fa83]" />
                <span>Verified Origin</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-xs flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#ffdbc9]" />
                  <span>{artisan.locationName}</span>
                </span>
                <span className="font-semibold text-[#8ff780]">
                  {artisan.trustScore}% Score
                </span>
              </div>
            </div>

            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                    artisan.category === 'Heritage Arts'
                      ? 'text-[#974400]'
                      : artisan.category === 'Agriculture'
                      ? 'text-[#186a22]'
                      : 'text-[#006e0c]'
                  }`}
                >
                  {artisan.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#231914] mb-1.5 group-hover:text-[#974400] transition-colors">
                  {artisan.name}
                </h3>
                <p className="text-xs text-[#564338] line-clamp-2 mb-4 leading-relaxed">
                  {artisan.fullBio}
                </p>
              </div>

              <div className="pt-4 border-t border-[#ddc1b3]/30 flex justify-between items-center">
                <span className="text-xs font-semibold text-[#974400] group-hover:underline flex items-center gap-1">
                  <span>View Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] text-[#8a7266]">
                  {artisan.contributionsCount} Verifications
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


