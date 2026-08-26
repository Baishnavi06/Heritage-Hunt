import React, { useState } from 'react';
import { X, CheckCircle2, MapPin, Camera, Award, Sparkles, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContributorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreMap: () => void;
}

export const ContributorModal: React.FC<ContributorModalProps> = ({
  isOpen,
  onClose,
  onExploreMap,
}) => {
  const [signedUp, setSignedUp] = useState(false);
  const [contributorName, setContributorName] = useState('');
  const [district, setDistrict] = useState('Hazaribagh');

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSignedUp(true);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#974400', '#186a22', '#ffdbc9', '#92fa83'],
      });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3a2e28]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-[#ddc1b3]/40 relative p-6 sm:p-8">
        <button
          id="close-contributor-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#564338] hover:text-[#231914] p-2 rounded-full hover:bg-[#f2dfd5]/60 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {signedUp ? (
          <div className="text-center py-6 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-[#8ff780]/40 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#77dd6a]">
              <Award className="w-10 h-10 text-[#006e0c]" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#231914] mb-2">
              Welcome, Scout {contributorName}!
            </h3>
            <p className="text-sm text-[#564338] mb-6 leading-relaxed">
              Your Heritage Scout status is active. You can now pin creators on location, upload photographic proof of raw materials, and authenticate local artisans on the map.
            </p>
            <button
              onClick={() => {
                onClose();
                onExploreMap();
              }}
              className="bg-[#974400] text-white px-8 py-3 rounded-full font-sans text-sm font-semibold hover:bg-[#bb5808] transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2 mx-auto"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Map &amp; Start Pinning</span>
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-bold text-[#186a22] uppercase tracking-wider block mb-1">
                Grassroots Verification Network
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231914]">
                Join as a Heritage Scout
              </h3>
              <p className="text-xs text-[#564338] mt-1 leading-relaxed">
                Empower indigenous creators by validating authentic craft sites, geotagging traditional processes, and mapping endangered native flora.
              </p>
            </div>

            {/* 3 Steps of Contribution */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 bg-[#fff1eb] rounded-xl border border-[#ddc1b3]/40">
                <div className="p-2 bg-[#feeae0] text-[#974400] rounded-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#231914]">
                    1. Visit &amp; Geotag On-Site
                  </h4>
                  <p className="text-[11px] text-[#564338]">
                    Pin the artisan's exact village cluster and workshop on the geospatial map.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#fff1eb] rounded-xl border border-[#ddc1b3]/40">
                <div className="p-2 bg-[#feeae0] text-[#974400] rounded-lg">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#231914]">
                    2. Document Authentic Materials
                  </h4>
                  <p className="text-[11px] text-[#564338]">
                    Upload photographs of natural earth pigments, clay kilns, or heirloom seed varieties.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#fff1eb] rounded-xl border border-[#ddc1b3]/40">
                <div className="p-2 bg-[#feeae0] text-[#186a22] rounded-lg">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#231914]">
                    3. Build the Trust Score &amp; Level Up
                  </h4>
                  <p className="text-[11px] text-[#564338]">
                    Your reviews boost the creator's trust score and earn you Scout XP badges.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#231914] mb-1">
                  Scout Name
                </label>
                <input
                  type="text"
                  required
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  placeholder="e.g. Rahul Sen"
                  className="w-full bg-[#fff8f6] border border-[#ddc1b3] focus:border-[#974400] rounded-xl p-3 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231914] mb-1">
                  Primary Field District
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-[#fff8f6] border border-[#ddc1b3] focus:border-[#974400] rounded-xl p-3 text-sm outline-none text-[#231914]"
                >
                  <option value="Hazaribagh">Hazaribagh (Sohrai &amp; Khovar)</option>
                  <option value="Khunti">Khunti (Indigenous Seeds &amp; Farming)</option>
                  <option value="Dumka">Dumka (Dokra Metal Casting)</option>
                  <option value="Latehar">Latehar (Wild Medicinal Flora)</option>
                  <option value="Saraikela">Saraikela (Paitkar Scroll Art)</option>
                  <option value="Ranchi">Ranchi (Tribal Terracotta &amp; Textiles)</option>
                </select>
              </div>

              <button
                type="submit"
                id="submit-contributor-signup-btn"
                className="w-full bg-[#974400] text-white py-3.5 rounded-full font-sans text-sm font-semibold hover:bg-[#bb5808] transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Activate Scout Status
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
