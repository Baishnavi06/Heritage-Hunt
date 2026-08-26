import React from 'react';
import { Compass, MapPin, Users, Info, Sparkles, Globe, UserCheck, Award, PlusCircle } from 'lucide-react';

interface NavbarProps {
  currentView: 'discover' | 'map' | 'creators' | 'about' | 'buyer-profile' | 'artisan-register';
  onNavigate: (view: 'discover' | 'map' | 'creators' | 'about' | 'buyer-profile' | 'artisan-register') => void;
  language: 'EN' | 'HI';
  onToggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  language,
  onToggleLanguage,
}) => {
  return (
    <>
      {/* Desktop Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#fff8f6]/95 backdrop-blur-md border-b border-[#ddc1b3]/30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => onNavigate('discover')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[#974400] text-white flex items-center justify-center shadow-sm group-hover:bg-[#bb5808] transition-colors">
              <Compass className="w-5 h-5 text-[#ffdbc9]" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-[#974400] group-hover:text-[#bb5808] transition-colors tracking-tight block leading-none">
                Heritage Hunt
              </span>
              <span className="text-[10px] text-[#564338] font-medium tracking-wider uppercase">
                Crowd-Sourced Roots
              </span>
            </div>
          </button>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button
              id="nav-discover-btn"
              onClick={() => onNavigate('discover')}
              className={`font-sans text-sm tracking-wide font-medium transition-all pb-1 cursor-pointer ${
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
              className={`font-sans text-sm tracking-wide font-medium transition-all pb-1 cursor-pointer ${
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
              className={`font-sans text-sm tracking-wide font-medium transition-all pb-1 cursor-pointer ${
                currentView === 'creators'
                  ? 'text-[#974400] border-b-2 border-[#974400] font-semibold'
                  : 'text-[#564338] hover:text-[#974400]'
              }`}
            >
              {language === 'HI' ? 'कारीगर (Creators)' : 'Creators'}
            </button>

            <button
              id="nav-buyer-profile-btn"
              onClick={() => onNavigate('buyer-profile')}
              className={`font-sans text-sm tracking-wide font-medium transition-all pb-1 cursor-pointer flex items-center gap-1.5 ${
                currentView === 'buyer-profile'
                  ? 'text-[#974400] border-b-2 border-[#974400] font-semibold'
                  : 'text-[#564338] hover:text-[#974400]'
              }`}
            >
              <Award className="w-4 h-4 text-[#974400]" />
              <span>{language === 'HI' ? 'मेरी पहचान (My Impact)' : 'My Impact'}</span>
            </button>

            <button
              id="nav-about-btn"
              onClick={() => onNavigate('about')}
              className={`font-sans text-sm tracking-wide font-medium transition-all pb-1 cursor-pointer ${
                currentView === 'about'
                  ? 'text-[#974400] border-b-2 border-[#974400] font-semibold'
                  : 'text-[#564338] hover:text-[#974400]'
              }`}
            >
              {language === 'HI' ? 'हमारे बारे में (About)' : 'About'}
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <button
              id="lang-toggle-btn"
              onClick={onToggleLanguage}
              className="flex items-center space-x-1.5 text-xs font-semibold text-[#564338] hover:text-[#974400] px-3 py-1.5 rounded-full border border-[#ddc1b3]/40 hover:border-[#974400]/40 transition-colors cursor-pointer"
              title="Toggle English / हिंदी"
            >
              <Globe className="w-3.5 h-3.5 text-[#974400]" />
              <span>{language === 'EN' ? 'EN / हिंदी' : 'हिंदी / EN'}</span>
            </button>

            {/* Artisan Register Portal CTA */}
            <button
              id="artisan-register-nav-btn"
              onClick={() => onNavigate('artisan-register')}
              className="bg-[#974400] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide hover:bg-[#bb5808] transition-all shadow-sm flex items-center space-x-2 active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === 'HI' ? 'कारीगर पंजीकरण' : 'Artisan Portal'}
              </span>
              <span className="sm:hidden">Register</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#fff8f6]/95 backdrop-blur-md border-t border-[#ddc1b3]/40 shadow-lg px-2 py-2 flex justify-around items-center">
        <button
          id="mob-nav-discover"
          onClick={() => onNavigate('discover')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-full transition-all cursor-pointer ${
            currentView === 'discover'
              ? 'bg-[#bb5808] text-white'
              : 'text-[#564338] hover:bg-[#f2dfd5]'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">Discover</span>
        </button>

        <button
          id="mob-nav-map"
          onClick={() => onNavigate('map')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-full transition-all cursor-pointer ${
            currentView === 'map'
              ? 'bg-[#bb5808] text-white'
              : 'text-[#564338] hover:bg-[#f2dfd5]'
          }`}
        >
          <MapPin className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">Map</span>
        </button>

        {/* Center Register Button */}
        <button
          id="mob-nav-register"
          onClick={() => onNavigate('artisan-register')}
          className="flex flex-col items-center py-1 px-3 rounded-full bg-[#974400] text-white shadow-md active:scale-90 transition-transform cursor-pointer"
        >
          <PlusCircle className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">Register</span>
        </button>

        <button
          id="mob-nav-creators"
          onClick={() => onNavigate('creators')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-full transition-all cursor-pointer ${
            currentView === 'creators'
              ? 'bg-[#bb5808] text-white'
              : 'text-[#564338] hover:bg-[#f2dfd5]'
          }`}
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">Creators</span>
        </button>

        <button
          id="mob-nav-buyer-profile"
          onClick={() => onNavigate('buyer-profile')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-full transition-all cursor-pointer ${
            currentView === 'buyer-profile'
              ? 'bg-[#bb5808] text-white'
              : 'text-[#564338] hover:bg-[#f2dfd5]'
          }`}
        >
          <Award className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">Impact</span>
        </button>
      </nav>
    </>
  );
};

