import React from 'react';
import { Artisan } from '../types';
import { HeritageHeatmap } from './HeritageHeatmap';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  ShieldCheck,
  Users,
  Compass,
  Trees,
  Palette,
  Sprout,
} from 'lucide-react';

interface DiscoverViewProps {
  artisans: Artisan[];
  onSelectArtisan: (artisan: Artisan) => void;
  onExploreMapClick: () => void;
  onPinCreatorClick: () => void;
  onRegisterArtisanClick: () => void;
  onViewAllCreators: () => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  artisans,
  onSelectArtisan,
  onExploreMapClick,
  onPinCreatorClick,
  onRegisterArtisanClick,
  onViewAllCreators,
}) => {
  const [categoryFilter, setCategoryFilter] = React.useState<
    'all' | 'Heritage Arts' | 'Agriculture' | 'Indigenous Flora'
  >('all');

  return (
    <div className="min-h-screen pb-24 md:pb-16 animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="hero-gradient min-h-[75vh] flex flex-col items-center justify-center px-6 py-16 text-center relative border-b border-[#ddc1b3]/30">
        <div className="max-w-4xl mx-auto space-y-6 z-10">
          {/* Pill Badge */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#186a22]/10 text-[#186a22] text-xs font-semibold tracking-wider uppercase border border-[#186a22]/20">
            Heritage Hunt • Crowd-Sourced Cultural Discovery
          </div>

          {/* Big Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-[#231914] leading-[1.15] tracking-tight">
            Discover the Roots of India.
            <br />
            <span className="text-[#974400]">Mapped &amp; Scouted by You.</span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-lg text-[#564338] max-w-2xl mx-auto leading-relaxed">
            The community-driven cultural mapping registry for master artisans,
            heirloom cultivators, and rare native flora stewards across rural India.
          </p>

          {/* Two Primary Hero CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            {/* Button 1: Pin a Local Creator */}
            <button
              id="hero-pin-creator-btn"
              onClick={onPinCreatorClick}
              className="w-full sm:w-auto bg-[#974400] text-white px-8 py-3.5 rounded-full font-sans text-sm font-bold hover:bg-[#bb5808] transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#ffdbc9]" />
              <span>Pin a Local Creator</span>
            </button>

            {/* Button 2: Artisan Self-Registration Portal */}
            <button
              id="hero-artisan-register-btn"
              onClick={onRegisterArtisanClick}
              className="w-full sm:w-auto bg-white/80 backdrop-blur-xs border-2 border-[#974400] px-8 py-3.5 rounded-full font-sans text-sm font-bold text-[#974400] hover:bg-[#fff1eb] transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              Are you an Artisan? Register Here
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-14 border-b border-[#ddc1b3]/30 bg-[#fff8f6]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1.5">
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#974400]">
              128+
            </div>
            <div className="text-xs font-bold text-[#564338] uppercase tracking-wider">
              Verified Creators &amp; Botanical Stewards
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#186a22]">
              642
            </div>
            <div className="text-xs font-bold text-[#564338] uppercase tracking-wider">
              Physical Visits
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#bb5808]">
              17
            </div>
            <div className="text-xs font-bold text-[#564338] uppercase tracking-wider">
              Districts Covered
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#974400]">
              94%
            </div>
            <div className="text-xs font-bold text-[#564338] uppercase tracking-wider">
              Trust Score
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Heritage Heatmap Section */}
      <section id="heritage-heatmap-section" className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-baseline gap-4">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#231914] mb-1">
              Heritage Heatmap
            </h2>
            <p className="text-sm text-[#564338]">
              Live geotagged verification cluster across Jharkhand's indigenous crafts, heirloom farms, and sacred botanical preserves.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() =>
                setCategoryFilter(
                  categoryFilter === 'Heritage Arts' ? 'all' : 'Heritage Arts'
                )
              }
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                categoryFilter === 'Heritage Arts'
                  ? 'bg-[#974400] text-white shadow-xs'
                  : 'bg-[#feeae0] text-[#231914] hover:bg-[#f2dfd5]'
              }`}
            >
              <Palette className="w-3 h-3 text-[#974400] group-hover:text-white" />
              <span>Heritage Arts</span>
            </button>

            <button
              onClick={() =>
                setCategoryFilter(
                  categoryFilter === 'Agriculture' ? 'all' : 'Agriculture'
                )
              }
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                categoryFilter === 'Agriculture'
                  ? 'bg-[#186a22] text-white shadow-xs'
                  : 'bg-[#feeae0] text-[#231914] hover:bg-[#f2dfd5]'
              }`}
            >
              <Trees className="w-3 h-3 text-[#186a22]" />
              <span>Agriculture</span>
            </button>

            <button
              onClick={() =>
                setCategoryFilter(
                  categoryFilter === 'Indigenous Flora' ? 'all' : 'Indigenous Flora'
                )
              }
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                categoryFilter === 'Indigenous Flora'
                  ? 'bg-[#006e0c] text-white shadow-xs'
                  : 'bg-[#feeae0] text-[#231914] hover:bg-[#f2dfd5]'
              }`}
            >
              <Sprout className="w-3.5 h-3.5 text-[#006e0c]" />
              <span>Indigenous Flora</span>
            </button>
          </div>
        </div>

        {/* Heatmap Container */}
        <HeritageHeatmap
          artisans={artisans}
          onSelectArtisan={onSelectArtisan}
          selectedCategoryFilter={categoryFilter}
          onFilterChange={setCategoryFilter}
        />
      </section>

      {/* Trending Artisans Section */}
      <section className="py-16 bg-[#fff1eb] border-y border-[#ddc1b3]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#231914] mb-2">
                Trending Artisans &amp; Botanical Stewards
              </h2>
              <p className="text-sm text-[#564338]">
                Discover newly verified creators, heirloom cultivators, and rare forest plant custodians.
              </p>
            </div>

            <button
              id="trending-view-all-btn"
              onClick={onViewAllCreators}
              className="flex items-center space-x-1.5 text-[#974400] font-sans text-sm font-semibold hover:underline cursor-pointer group"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Cards Horizontal Carousel / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artisans.map((artisan) => (
              <div
                key={artisan.id}
                onClick={() => onSelectArtisan(artisan)}
                className="bg-white rounded-2xl p-6 card-shadow border border-[#ddc1b3]/40 flex flex-col justify-between cursor-pointer group hover:border-[#974400]/40 transition-all"
              >
                <div>
                  {/* Top Avatar & Verified Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#f2dfd5] shadow-xs">
                      <img
                        src={artisan.avatarUrl}
                        alt={artisan.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex items-center space-x-1 bg-[#f2dfd5]/60 px-2.5 py-1 rounded-full border border-[#ddc1b3]/30">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#006e0c] fill-[#8ff780]" />
                      <span className="text-[11px] font-bold text-[#974400]">
                        Verified Origin
                      </span>
                    </div>
                  </div>

                  {/* Artisan Name & Bio */}
                  <h3 className="font-serif text-2xl font-bold text-[#231914] mb-1.5 group-hover:text-[#974400] transition-colors">
                    {artisan.name}
                  </h3>
                  <p className="text-xs text-[#564338] mb-4 line-clamp-2 leading-relaxed">
                    {artisan.shortBio}
                  </p>

                  {/* Category & District Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                        artisan.category === 'Heritage Arts'
                          ? 'bg-[#fff1eb] text-[#974400] border border-[#ffdbc9]'
                          : artisan.category === 'Agriculture'
                          ? 'bg-[#f7fff1] text-[#186a22] border border-[#a3f69c]'
                          : 'bg-[#ebfbee] text-[#006e0c] border border-[#92fa83]'
                      }`}
                    >
                      {artisan.category}
                    </span>
                    <span className="px-3 py-1 bg-[#feeae0] text-[#564338] rounded-full text-[11px] font-medium">
                      {artisan.district}
                    </span>
                  </div>
                </div>

                {/* Bottom Trust Score & Action Arrow */}
                <div className="pt-4 border-t border-[#ddc1b3]/30 flex justify-between items-center">
                  <div>
                    <span className="text-[11px] font-medium text-[#564338]">
                      Trust Score
                    </span>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-20 h-2 bg-[#f2dfd5] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#186a22] rounded-full"
                          style={{ width: `${artisan.trustScore}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-[#231914]">
                        {artisan.trustRating}
                      </span>
                    </div>
                  </div>

                  <button
                    id={`artisan-arrow-btn-${artisan.id}`}
                    className="w-9 h-9 rounded-full bg-[#feeae0] flex items-center justify-center text-[#231914] group-hover:bg-[#974400] group-hover:text-white transition-colors cursor-pointer shadow-2xs"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
