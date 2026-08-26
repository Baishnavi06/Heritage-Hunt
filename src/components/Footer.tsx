import React from 'react';

interface FooterProps {
  onNavigate: (view: 'discover' | 'map' | 'creators' | 'about' | 'buyer-profile' | 'artisan-register') => void;
  onJoinContributor: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onJoinContributor,
}) => {
  return (
    <footer className="bg-[#fff8f6] border-t border-[#ddc1b3]/40 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <button
            onClick={() => onNavigate('discover')}
            className="font-serif text-2xl font-bold text-[#974400] hover:opacity-90 transition-opacity cursor-pointer"
          >
            Heritage Hunt
          </button>
          <p className="text-xs text-[#564338] mt-1">
            Crowd-Sourced Cultural Discovery &amp; Geospatial Heritage Registry.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-[#564338]">
          <button
            onClick={() => onNavigate('discover')}
            className="hover:text-[#974400] transition-colors cursor-pointer"
          >
            Discover
          </button>
          <button
            onClick={() => onNavigate('map')}
            className="hover:text-[#974400] transition-colors cursor-pointer"
          >
            Heatmap
          </button>
          <button
            onClick={() => onNavigate('creators')}
            className="hover:text-[#974400] transition-colors cursor-pointer"
          >
            Verified Creators
          </button>
          <button
            onClick={() => onNavigate('artisan-register')}
            className="text-[#974400] hover:underline transition-colors cursor-pointer font-bold"
          >
            Artisan Registration
          </button>
          <button
            onClick={() => onNavigate('buyer-profile')}
            className="hover:text-[#974400] transition-colors cursor-pointer"
          >
            Scout Impact Profile
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="hover:text-[#974400] transition-colors cursor-pointer"
          >
            Our Mission
          </button>
        </div>

        {/* Copyright */}
        <div className="text-xs text-[#8a7266] text-center md:text-right">
          &copy; {new Date().getFullYear()} Heritage Hunt. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
