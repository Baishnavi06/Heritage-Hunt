import React, { useState } from 'react';
import { ENCYCLOPEDIA } from '../data/artisans';
import { X, BookOpen, Sparkles, MapPin, Feather, Layers, Sprout, Trees } from 'lucide-react';

interface RootsEncyclopediaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RootsEncyclopediaModal: React.FC<RootsEncyclopediaModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedEntryId, setSelectedEntryId] = useState(ENCYCLOPEDIA[0].id);

  if (!isOpen) return null;

  const currentEntry =
    ENCYCLOPEDIA.find((e) => e.id === selectedEntryId) || ENCYCLOPEDIA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3a2e28]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col border border-[#ddc1b3]/40 relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#ddc1b3]/30 bg-[#fff1eb]">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#feeae0] rounded-xl text-[#974400]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#231914]">
                Roots Encyclopedia
              </h2>
              <p className="text-xs text-[#564338]">
                Living repository of indigenous crafts, ritual arts, heirloom agriculture, and rare ethnobotanical flora.
              </p>
            </div>
          </div>

          <button
            id="close-encyclopedia-modal-btn"
            onClick={onClose}
            className="text-[#564338] hover:text-[#231914] p-2 rounded-full hover:bg-white/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
          {/* Sidebar selector */}
          <div className="w-full md:w-1/3 bg-[#fff8f6] border-b md:border-b-0 md:border-r border-[#ddc1b3]/30 p-4 overflow-y-auto space-y-2">
            {ENCYCLOPEDIA.map((entry) => (
              <button
                key={entry.id}
                onClick={() => setSelectedEntryId(entry.id)}
                className={`w-full text-left p-3.5 rounded-xl transition-all cursor-pointer ${
                  entry.id === selectedEntryId
                    ? 'bg-[#feeae0] border border-[#974400]/40 shadow-xs'
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
            <div className="relative rounded-xl overflow-hidden h-52 sm:h-64 shadow-md border border-[#ddc1b3]/30">
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

            {/* Botanical & Ecological Specifications if available */}
            {(currentEntry.botanicalClassification || currentEntry.ecologicalHabitat || currentEntry.traditionalUse) && (
              <div className="p-5 bg-[#ebfbee] border border-[#a3f69c] rounded-xl space-y-3">
                <h4 className="font-serif text-base font-bold text-[#006e0c] flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-[#006e0c]" />
                  <span>Botanical &amp; Ecological Profile</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {currentEntry.botanicalClassification && (
                    <div className="bg-white/80 p-3 rounded-lg border border-[#a3f69c]/60">
                      <span className="font-bold text-[#006e0c] block mb-0.5">
                        Botanical Taxa:
                      </span>
                      <span className="text-[#231914] italic">
                        {currentEntry.botanicalClassification}
                      </span>
                    </div>
                  )}
                  {currentEntry.ecologicalHabitat && (
                    <div className="bg-white/80 p-3 rounded-lg border border-[#a3f69c]/60">
                      <span className="font-bold text-[#006e0c] block mb-0.5">
                        Ecological Habitat:
                      </span>
                      <span className="text-[#231914]">
                        {currentEntry.ecologicalHabitat}
                      </span>
                    </div>
                  )}
                  {currentEntry.traditionalUse && (
                    <div className="sm:col-span-2 bg-white/80 p-3 rounded-lg border border-[#a3f69c]/60">
                      <span className="font-bold text-[#006e0c] block mb-0.5">
                        Traditional Pharmacology &amp; Use:
                      </span>
                      <span className="text-[#231914]">
                        {currentEntry.traditionalUse}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-[#fff1eb] p-5 rounded-xl border border-[#ddc1b3]/40">
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
                    className="p-2.5 bg-[#fff8f6] rounded-lg border border-[#ddc1b3]/30 text-xs font-medium text-[#231914] flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#974400]" />
                    <span>{mat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#f7fff1] border border-[#a3f69c] rounded-xl">
              <h4 className="font-serif text-sm font-bold text-[#186a22] mb-1">
                Cultural Significance
              </h4>
              <p className="text-xs text-[#186a22]">
                {currentEntry.culturalSignificance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
