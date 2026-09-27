import React, { useState } from 'react';
import { ENCYCLOPEDIA, DISTRICT_KNOWLEDGE_DATA } from '../data/artisans';
import { DistrictKnowledge, EncyclopediaEntry } from '../types';
import {
  X,
  BookOpen,
  Sparkles,
  MapPin,
  Feather,
  Layers,
  Sprout,
  Trees,
  Palette,
  ChevronRight,
  Compass,
} from 'lucide-react';

interface RootsEncyclopediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDistrictKey?: string;
}

export const RootsEncyclopediaModal: React.FC<RootsEncyclopediaModalProps> = ({
  isOpen,
  onClose,
  initialDistrictKey = 'hazaribagh',
}) => {
  const [viewTab, setViewTab] = useState<'district-hub' | 'craft-catalog'>('district-hub');
  const [selectedDistrictKey, setSelectedDistrictKey] = useState<string>(initialDistrictKey);
  const [selectedEntryId, setSelectedEntryId] = useState<string>(ENCYCLOPEDIA[0].id);

  if (!isOpen) return null;

  const currentEntry =
    ENCYCLOPEDIA.find((e) => e.id === selectedEntryId) || ENCYCLOPEDIA[0];

  const currentDistrict: DistrictKnowledge =
    DISTRICT_KNOWLEDGE_DATA[selectedDistrictKey] || DISTRICT_KNOWLEDGE_DATA.hazaribagh;

  const districtKeys = Object.keys(DISTRICT_KNOWLEDGE_DATA);

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#3a2e28]/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col border border-[#ddc1b3]/40 relative"
      >
        {/* Modal Header */}
        <div className="flex flex-wrap justify-between items-center p-5 sm:p-6 border-b border-[#ddc1b3]/30 bg-[#fff1eb]">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#feeae0] rounded-2xl text-[#974400]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#231914]">
                Roots Knowledge Hub
              </h2>
              <p className="text-xs text-[#564338]">
                Living repository of regional art forms, ancestral techniques, heirloom crops, and native flora.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 sm:mt-0">
            {/* Tab switch between District Hub and Craft Entries */}
            <div className="flex bg-white p-1 rounded-xl border border-[#ddc1b3]/60 shadow-2xs">
              <button
                type="button"
                id="modal-tab-district-hub"
                onClick={() => setViewTab('district-hub')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewTab === 'district-hub'
                    ? 'bg-[#974400] text-white shadow-2xs'
                    : 'text-[#564338] hover:text-[#974400]'
                }`}
              >
                District Knowledge Hub
              </button>
              <button
                type="button"
                id="modal-tab-craft-catalog"
                onClick={() => setViewTab('craft-catalog')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewTab === 'craft-catalog'
                    ? 'bg-[#974400] text-white shadow-2xs'
                    : 'text-[#564338] hover:text-[#974400]'
                }`}
              >
                GI Crafts Catalog
              </button>
            </div>

            <button
              id="close-encyclopedia-modal-btn"
              onClick={onClose}
              className="text-[#564338] hover:text-[#231914] p-2 rounded-full hover:bg-white/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {viewTab === 'district-hub' ? (
          /* 🌟 FEATURE 4: DYNAMIC DISTRICT HUB VIEWPORT */
          <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
            {/* Left: District List selector */}
            <div className="w-full md:w-1/3 bg-[#fff8f6] border-b md:border-b-0 md:border-r border-[#ddc1b3]/30 p-4 overflow-y-auto space-y-2 shrink-0">
              <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#974400]">
                Select District Cluster:
              </div>
              {districtKeys.map((key) => {
                const item = DISTRICT_KNOWLEDGE_DATA[key];
                const isSelected = key === selectedDistrictKey;
                return (
                  <button
                    key={key}
                    id={`district-item-${key}`}
                    onClick={() => setSelectedDistrictKey(key)}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#feeae0] border-2 border-[#974400] shadow-xs'
                        : 'hover:bg-[#fff1eb] text-[#564338] border border-transparent'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#974400] block mb-0.5">
                      {item.state}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#231914]">
                      {item.districtName}
                    </h4>
                    <p className="text-xs text-[#564338] mt-0.5 line-clamp-1">
                      {item.primaryArtForm}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right: Dynamic District Content */}
            <div 
              key={currentDistrict.districtKey}
              className="w-full md:w-2/3 p-6 sm:p-8 overflow-y-auto bg-white space-y-6 animate-in fade-in"
            >
              <div className="relative rounded-2xl overflow-hidden h-56 sm:h-64 shadow-md border border-[#ddc1b3]/30">
                <img
                  src={currentDistrict.heroImage}
                  alt={currentDistrict.primaryArtForm}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#231914]/90 via-[#231914]/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-xs font-bold px-2.5 py-0.5 bg-[#974400] rounded-full self-start mb-1">
                    {currentDistrict.districtName}
                  </span>
                  <h3 className="font-serif text-2xl font-bold">
                    {currentDistrict.primaryArtForm}
                  </h3>
                  <p className="text-xs text-white/90 mt-0.5">{currentDistrict.heroCaption}</p>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#231914] mb-2">
                  Historical Lineage &amp; Context
                </h4>
                <p className="text-sm text-[#564338] leading-relaxed">
                  {currentDistrict.history}
                </p>
              </div>

              <div className="p-4 bg-[#fff1eb] rounded-2xl border border-[#ddc1b3]/40">
                <h4 className="font-serif text-sm font-bold text-[#974400] mb-1 flex items-center gap-1.5">
                  <Feather className="w-4 h-4 text-[#974400]" />
                  <span>Cultural Significance</span>
                </h4>
                <p className="text-xs text-[#564338] leading-relaxed">
                  {currentDistrict.culturalSignificance}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-base font-bold text-[#231914] mb-2.5 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#006e0c]" />
                  <span>Indigenous Materials</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentDistrict.indigenousMaterials.map((mat, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-[#f7fff1] text-[#186a22] border border-[#a3f69c] text-xs font-semibold"
                    >
                      ✓ {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-serif text-base font-bold text-[#231914] mb-2.5 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#974400]" />
                  <span>Regional Sub-Forms &amp; Techniques</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentDistrict.subForms.map((sf, i) => (
                    <div
                      key={i}
                      className="bg-[#fff8f6] p-3.5 rounded-xl border border-[#ddc1b3]/50"
                    >
                      <h5 className="font-bold text-xs text-[#231914] mb-0.5">{sf.name}</h5>
                      <p className="text-[11px] text-[#564338] leading-snug">{sf.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Craft Catalog View */
          <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
            {/* Sidebar selector */}
            <div className="w-full md:w-1/3 bg-[#fff8f6] border-b md:border-b-0 md:border-r border-[#ddc1b3]/30 p-4 overflow-y-auto space-y-2">
              {ENCYCLOPEDIA.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => setSelectedEntryId(entry.id)}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer ${
                    entry.id === selectedEntryId
                      ? 'bg-[#feeae0] border-2 border-[#974400] shadow-xs'
                      : 'hover:bg-[#fff1eb] text-[#564338]'
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#974400] block mb-1">
                    {entry.category}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#231914]">
                    {entry.title}
                  </h4>
                  <p className="text-xs text-[#564338] mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#974400]" />
                    <span>{entry.region}</span>
                  </p>
                </button>
              ))}
            </div>

            {/* Main Content Detail */}
            <div className="w-full md:w-2/3 p-6 sm:p-8 overflow-y-auto bg-white space-y-6">
              <div className="relative rounded-2xl overflow-hidden h-52 sm:h-64 shadow-md border border-[#ddc1b3]/30">
                <img
                  src={currentEntry.imageUrl}
                  alt={currentEntry.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5 text-white">
                  <div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-[#974400] rounded-full">
                      {currentEntry.category}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1.5">
                      {currentEntry.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#231914] mb-2">
                  Overview &amp; Origin
                </h4>
                <p className="text-sm text-[#564338] leading-relaxed">
                  {currentEntry.description}
                </p>
              </div>

              <div className="bg-[#fff1eb] p-5 rounded-2xl border border-[#ddc1b3]/40">
                <h4 className="font-serif text-base font-bold text-[#231914] mb-2 flex items-center gap-2">
                  <Feather className="w-4 h-4 text-[#974400]" />
                  <span>Historical Context &amp; Sacred Gene Banks</span>
                </h4>
                <p className="text-xs text-[#564338] leading-relaxed">
                  {currentEntry.historicalContext}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-base font-bold text-[#231914] mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#006e0c]" />
                  <span>Authentic Materials &amp; Native Elements</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentEntry.materialsUsed.map((mat, i) => (
                    <div
                      key={i}
                      className="p-2.5 bg-[#fff8f6] rounded-xl border border-[#ddc1b3]/30 text-xs font-medium text-[#231914] flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#974400]" />
                      <span>{mat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
