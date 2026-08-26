import React from 'react';
import { QrCode, Compass, MapPin, Users, Info, Sparkles, Globe } from 'lucide-react';

interface NavbarProps {
  currentView: 'discover' | 'map' | 'creators' | 'about';
  onNavigate: (view: 'discover' | 'map' | 'creators' | 'about') => void;
  onOpenScanner: () => void;
  language: 'EN' | 'HI';
  onToggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenScanner,
  language,
  onToggleLanguage,
}) => {
  return (
    <>
      {/* Desktop Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#fff8f6]/90 backdrop-blur-md border-b border-[#ddc1b3]/30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => onNavigate('discover')}
            className="text-left font-serif text-2xl md:text-3xl font-bold text-[#974400] hover:opacity-90 transition-opacity tracking-tight"
          >
            Geo-Origin
          </button>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              id="nav-discover-btn"
              onClick={() => onNavigate('discover')}
              className={`font-sans text-sm tracking-wide font-medium transition-all pb-1 ${
                currentView === 'discover'
                  ? 'text-[#974400] border-b-2 border-[#974400] font-semibold'
                  : 'text-[#564338] hover:text-[#974400]'
              }`}
            >
              {language === 'HI' ? 'खोजें (Discover)' : 'Discover'}
            </button>

            <button
              id="nav-map-btn"
              onClick={() => onNavigate('map')}
              className={`font-sans text-sm tracking-wide font-medium transition-all pb-1 ${
                currentView === 'map'
                  ? 'text-[#974400] border-b-2 border-[#974400] font-semibold'
                  : 'text-[#564338] hover:text-[#974400]'
              }`}
            >
              {language === 'HI' ? 'मानचित्र (Map)' : 'Map'}
            </button>

            <button
              id="nav-creators-btn"
              onClick={() => onNavigate('creators')}
              className={`font-sans text-sm tracking-wide font-medium transition-all pb-1 ${
                currentView === 'creators'
                  ? 'text-[#974400] border-b-2 border-[#974400] font-semibold'
                  : 'text-[#564338] hover:text-[#974400]'
              }`}
            >
              {language === 'HI' ? 'कारीगर (Creators)' : 'Creators'}
            </button>

            <button
              id="nav-about-btn"
              onClick={() => onNavigate('about')}
              className={`font-sans text-sm tracking-wide font-medium transition-all pb-1 ${
                currentView === 'about'
                  ? 'text-[#974400] border-b-2 border-[#974400] font-semibold'
                  : 'text-[#564338] hover:text-[#974400]'
              }`}
            >
              {language === 'HI' ? 'हमारे बारे में (About)' : 'About'}
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              id="lang-toggle-btn"
              onClick={onToggleLanguage}
              className="flex items-center space-x-1.5 text-xs font-semibold text-[#564338] hover:text-[#974400] px-3 py-1.5 rounded-full border border-[#ddc1b3]/40 hover:border-[#974400]/40 transition-colors"
              title="Toggle English / हिंदी"
            >
              <Globe className="w-3.5 h-3.5 text-[#974400]" />
              <span>{language === 'EN' ? 'EN / हिंदी' : 'हिंदी / EN'}</span>
            </button>

            {/* Scan QR Button */}
            <button
              id="scan-artisan-qr-top-btn"
              onClick={onOpenScanner}
              className="bg-[#974400] text-white px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-[#bb5808] transition-all shadow-sm flex items-center space-x-2 active:scale-95 cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === 'HI' ? 'क्यूआर स्कैन करें' : 'Scan Artisan QR'}
              </span>
              <span className="sm:hidden">Scan</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#fff8f6]/95 backdrop-blur-md border-t border-[#ddc1b3]/40 shadow-lg px-2 py-2 flex justify-around items-center">
        <button
          id="mob-nav-discover"
          onClick={() => onNavigate('discover')}
          className={`flex flex-col items-center py-1 px-3 rounded-full transition-all ${
            currentView === 'discover'
              ? 'bg-[#bb5808] text-white'
              : 'text-[#564338] hover:bg-[#f2dfd5]'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-medium">Discover</span>
        </button>

        <button
          id="mob-nav-map"
          onClick={() => onNavigate('map')}
          className={`flex flex-col items-center py-1 px-3 rounded-full transition-all ${
            currentView === 'map'
              ? 'bg-[#bb5808] text-white'
              : 'text-[#564338] hover:bg-[#f2dfd5]'
          }`}
        >
          <MapPin className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-medium">Map</span>
        </button>

        <button
          id="mob-nav-scan"
          onClick={onOpenScanner}
          className="flex flex-col items-center py-1 px-3.5 rounded-full bg-[#974400] text-white shadow-md active:scale-90 transition-transform"
        >
          <QrCode className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-bold">Scan QR</span>
        </button>

        <button
          id="mob-nav-creators"
          onClick={() => onNavigate('creators')}
          className={`flex flex-col items-center py-1 px-3 rounded-full transition-all ${
            currentView === 'creators'
              ? 'bg-[#bb5808] text-white'
              : 'text-[#564338] hover:bg-[#f2dfd5]'
          }`}
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-medium">Creators</span>
        </button>

        <button
          id="mob-nav-about"
          onClick={() => onNavigate('about')}
          className={`flex flex-col items-center py-1 px-3 rounded-full transition-all ${
            currentView === 'about'
              ? 'bg-[#bb5808] text-white'
              : 'text-[#564338] hover:bg-[#f2dfd5]'
          }`}
        >
          <Info className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-medium">About</span>
        </button>
      </nav>
    </>
  );
};
