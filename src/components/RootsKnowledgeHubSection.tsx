import React, { useState } from 'react';
import { DISTRICT_KNOWLEDGE_DATA } from '../data/artisans';
import { DistrictKnowledge } from '../types';
import {
  BookOpen,
  MapPin,
  Sparkles,
  Layers,
  ChevronRight,
  Sprout,
  Trees,
  Palette,
  ExternalLink,
  Feather,
} from 'lucide-react';

interface RootsKnowledgeHubSectionProps {
  onExploreDistrictCreators?: (districtName: string) => void;
  defaultDistrictKey?: string;
}

export const RootsKnowledgeHubSection: React.FC<RootsKnowledgeHubSectionProps> = ({
  onExploreDistrictCreators,
  defaultDistrictKey = 'hazaribagh',
}) => {
  const [selectedDistrictKey, setSelectedDistrictKey] = useState<string>(defaultDistrictKey);
  const currentKnowledge: DistrictKnowledge =
    DISTRICT_KNOWLEDGE_DATA[selectedDistrictKey] || DISTRICT_KNOWLEDGE_DATA.hazaribagh;

  const districtKeys = Object.keys(DISTRICT_KNOWLEDGE_DATA);

  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto" aria-labelledby="roots-hub-heading">
      {/* Header & District Dropdown Controller */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 pb-6 border-b border-[#ddc1b3]/40">
        <div>
          <span className="text-xs font-bold text-[#974400] uppercase tracking-wider block mb-1">
            Living Cultural Encyclopedia
          </span>
          <h2 id="roots-hub-heading" className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#231914]">
            Roots Knowledge Hub
          </h2>
          <p className="text-sm sm:text-base text-[#564338] mt-2 max-w-2xl leading-relaxed">
            Dynamic educational archive detailing indigenous craft lineages, sacred earth pigments, and ethnobotanical wisdom across regional clusters.
          </p>
        </div>

        {/* Dynamic District Selector Dropdown */}
        <div className="w-full md:w-auto flex flex-col gap-1.5 shrink-0">
          <label htmlFor="district-hub-select" className="text-xs font-bold text-[#974400] uppercase tracking-wider">
            Select Regional Cluster:
          </label>
          <select
            id="district-hub-select"
            value={selectedDistrictKey}
            onChange={(e) => setSelectedDistrictKey(e.target.value)}
            className="w-full md:w-64 px-4 py-3 bg-white rounded-2xl text-sm font-bold border-2 border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914] shadow-sm cursor-pointer transition-all"
          >
            {districtKeys.map((key) => {
              const item = DISTRICT_KNOWLEDGE_DATA[key];
              return (
                <option key={key} value={key}>
                  {item.districtName}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Interactive Quick-Pills for Districts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {districtKeys.map((key) => {
          const item = DISTRICT_KNOWLEDGE_DATA[key];
          const isActive = key === selectedDistrictKey;
          return (
            <button
              key={key}
              id={`district-pill-${key}`}
              onClick={() => setSelectedDistrictKey(key)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
                isActive
                  ? 'bg-[#974400] text-white border-[#7b3700] shadow-sm scale-102'
                  : 'bg-white text-[#564338] border-[#ddc1b3]/60 hover:border-[#974400]/50 hover:bg-[#fff1eb]'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-[#ffdbc9]' : 'text-[#974400]'}`} />
              <span>{item.districtName.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Content Viewport (Instant DOM updates without page refresh) */}
      <div 
        key={currentKnowledge.districtKey}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300"
      >
        {/* Left Column: Visual Showcase & Sub-Art Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#ddc1b3]/60 h-80 sm:h-96 group">
            <img
              src={currentKnowledge.heroImage}
              alt={currentKnowledge.primaryArtForm}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#231914]/90 via-[#231914]/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-bold uppercase tracking-wider bg-[#974400] px-3 py-1 rounded-full self-start mb-2">
                {currentKnowledge.districtName}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                {currentKnowledge.primaryArtForm}
              </h3>
              <p className="text-xs text-white/90 mt-1 line-clamp-2">
                {currentKnowledge.heroCaption}
              </p>
            </div>
          </div>

          {/* Sub-Forms and Traditions Grid */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#231914] mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#974400]" />
              <span>Regional Sub-Forms &amp; Styles</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentKnowledge.subForms.map((sf, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl border border-[#ddc1b3]/40 card-shadow"
                >
                  <h5 className="font-serif font-bold text-sm text-[#231914] mb-1">
                    {sf.name}
                  </h5>
                  <p className="text-xs text-[#564338] leading-relaxed">
                    {sf.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Historical Context & Materials */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 card-shadow border border-[#ddc1b3]/60 space-y-6">
          <div>
            <span className="text-xs font-bold text-[#006e0c] uppercase tracking-wider block mb-1">
              Ancient Lineage &amp; Archaeology
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231914] mb-3">
              Historical Roots &amp; Evolution
            </h3>
            <p className="text-sm sm:text-base text-[#564338] leading-relaxed">
              {currentKnowledge.history}
            </p>
          </div>

          {/* Cultural Significance Banner */}
          <div className="p-5 bg-[#fff1eb] rounded-2xl border border-[#ddc1b3]/50">
            <h4 className="font-serif text-base font-bold text-[#974400] mb-1.5 flex items-center gap-2">
              <Feather className="w-4 h-4 text-[#974400]" />
              <span>Cultural &amp; Spiritual Significance</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#564338] leading-relaxed">
              {currentKnowledge.culturalSignificance}
            </p>
          </div>

          {/* Indigenous Materials Tags */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#231914] mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#006e0c]" />
              <span>Indigenous Natural Materials &amp; Sustainable Mediums</span>
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {currentKnowledge.indigenousMaterials.map((mat, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-full bg-[#f7fff1] text-[#186a22] border border-[#a3f69c] text-xs font-bold shadow-2xs"
                >
                  ✓ {mat}
                </span>
              ))}
            </div>
          </div>

          {/* District Action Link */}
          {onExploreDistrictCreators && (
            <div className="pt-4 border-t border-[#ddc1b3]/30 flex justify-end">
              <button
                type="button"
                id={`explore-creators-${currentKnowledge.districtKey}`}
                onClick={() => onExploreDistrictCreators(currentKnowledge.districtName.split(' ')[0])}
                className="bg-[#974400] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold hover:bg-[#bb5808] transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore {currentKnowledge.districtName.split(' ')[0]} Creators</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
