import React from 'react';
import { ShieldCheck, MapPin, Sparkles, Users, CheckCircle2, Heart, Compass, PlusCircle } from 'lucide-react';

interface AboutViewProps {
  onJoinContributor: () => void;
  onExploreMap: () => void;
  onRegisterArtisan: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onJoinContributor,
  onExploreMap,
  onRegisterArtisan,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 animate-in fade-in duration-300 pb-28 md:pb-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold text-[#974400] uppercase tracking-wider block mb-2">
          Roots &amp; Mission
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#231914] mb-4">
          Why Heritage Hunt Exists
        </h1>
        <p className="text-base text-[#564338] leading-relaxed">
          India's rich indigenous art, organic agricultural heritage, and rare native flora are threatened by
          machine-made replicas, biopiracy, and lack of verified provenance. Heritage Hunt builds a crowd-sourced geospatial registry for
          every master artisan, heirloom cultivator, and tribal botanical steward.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white p-6 rounded-2xl border border-[#ddc1b3]/40 card-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#feeae0] text-[#974400] flex items-center justify-center mb-4">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#231914] mb-2">
            1. Community GPS Mapping
          </h3>
          <p className="text-xs text-[#564338] leading-relaxed">
            Every master creator and botanical gene bank is geo-tagged with exact coordinates, linking their authentic biography, natural pigment sourcing, and geographical indication origin.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#ddc1b3]/40 card-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#fff1eb] text-[#186a22] flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#231914] mb-2">
            2. On-Site Scout Proof
          </h3>
          <p className="text-xs text-[#564338] leading-relaxed">
            Verifications and photographic logs can only be published when Heritage Scouts are physically on location within verified cluster boundaries, preventing synthetic ratings.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#ddc1b3]/40 card-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#feeae0] text-[#bb5808] flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#231914] mb-2">
            3. Direct Fair-Trade Bridge
          </h3>
          <p className="text-xs text-[#564338] leading-relaxed">
            Buyers can share beautiful digital postcards, contact village artist collectives directly, and ensure 100% of fair value reaches indigenous hands.
          </p>
        </div>
      </div>

      {/* Contributor Call Banner */}
      <div className="bg-[#fff1eb] rounded-2xl p-8 sm:p-12 border border-[#ddc1b3]/50 text-center editorial-shadow">
        <h2 className="font-serif text-3xl font-bold text-[#231914] mb-3">
          Become a Heritage Scout
        </h2>
        <p className="text-sm text-[#564338] max-w-xl mx-auto mb-6 leading-relaxed">
          Are you traveling to rural Jharkhand, Santhal Parganas, or indigenous agro-clusters? Help us map and verify artisans on the ground.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onJoinContributor}
            className="bg-[#974400] text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#bb5808] transition-all shadow-md cursor-pointer"
          >
            Join as Contributor
          </button>
          <button
            onClick={onRegisterArtisan}
            className="border border-[#974400] text-[#974400] px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-white transition-colors cursor-pointer"
          >
            Are you an Artisan? Register Here
          </button>
        </div>
      </div>
    </div>
  );
};
