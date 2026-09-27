import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Users,
  Info,
  Globe,
  Award,
  PlusCircle,
  Menu,
  X,
  UserCheck,
  Radio,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { ViewType } from '../types';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  language: 'EN' | 'HI';
  onToggleLanguage: () => void;
  onJoinContributor?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  language,
  onToggleLanguage,
  onJoinContributor,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (view: ViewType) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#fff8f6]/95 backdrop-blur-md border-b border-[#ddc1b3]/30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('discover')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
            aria-label="Heritage Hunt Home"
          >
            <div className="w-9 h-9 rounded-xl bg-[#974400] text-white flex items-center justify-center shadow-sm group-hover:bg-[#bb5808] transition-colors">
              <Compass className="w-5 h-5 text-[#ffdbc9]" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#974400] group-hover:text-[#bb5808] transition-colors tracking-tight block leading-none">
                Heritage Hunt
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#564338] font-medium tracking-wider uppercase">
                {language === 'HI' ? 'देशज विरासत रजिस्ट्री' : 'Crowd-Sourced Roots'}
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8" aria-label="Main Navigation">
            <button
              id="nav-discover-btn"
              onClick={() => handleNavClick('discover')}
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
              onClick={() => handleNavClick('map')}
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
              onClick={() => handleNavClick('creators')}
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
              onClick={() => handleNavClick('buyer-profile')}
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
              onClick={() => handleNavClick('about')}
              className={`font-sans text-sm tracking-wide font-medium transition-all pb-1 cursor-pointer flex items-center gap-1.5 ${
                currentView === 'about'
                  ? 'text-[#974400] border-b-2 border-[#974400] font-semibold'
                  : 'text-[#564338] hover:text-[#974400]'
              }`}
            >
              <Info className="w-4 h-4 text-[#974400]" />
              <span>{language === 'HI' ? 'हमारे बारे में (About)' : 'About'}</span>
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Switcher */}
            <button
              id="lang-toggle-btn"
              onClick={onToggleLanguage}
              className="flex items-center space-x-1.5 text-xs font-semibold text-[#564338] hover:text-[#974400] px-2.5 sm:px-3 py-1.5 rounded-full border border-[#ddc1b3]/40 hover:border-[#974400]/40 transition-colors cursor-pointer bg-white/60"
              title="Toggle English / हिंदी"
              aria-label="Toggle language between English and Hindi"
            >
              <Globe className="w-3.5 h-3.5 text-[#974400]" />
              <span>{language === 'EN' ? 'EN / हिंदी' : 'हिंदी / EN'}</span>
            </button>

            {/* Artisan Register Portal CTA */}
            <button
              id="artisan-register-nav-btn"
              onClick={() => handleNavClick('artisan-register')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center space-x-1.5 active:scale-95 cursor-pointer ${
                currentView === 'artisan-register'
                  ? 'bg-[#763400] text-white ring-2 ring-[#ffdbc9]'
                  : 'bg-[#974400] text-white hover:bg-[#bb5808]'
              }`}
              aria-label="Register as an artisan"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#ffdbc9]" />
              <span className="hidden sm:inline">
                {language === 'HI' ? 'कारीगर पंजीकरण' : 'Artisan Portal'}
              </span>
              <span className="sm:hidden">Register</span>
            </button>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#564338] hover:text-[#974400] hover:bg-[#fff1eb] border border-[#ddc1b3]/50 transition-colors cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-between bg-[#fff8f6] animate-in fade-in duration-200 pt-[68px] pb-24 overflow-y-auto">
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#ddc1b3]/40">
              <span className="text-xs font-bold text-[#974400] uppercase tracking-wider">
                {language === 'HI' ? 'मेनू एवं पृष्ठ' : 'Navigation Menu'}
              </span>
              <button
                id="mobile-drawer-close-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full text-[#564338] hover:bg-[#feeae0]"
                aria-label="Close Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <button
                id="drawer-nav-discover"
                onClick={() => handleNavClick('discover')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left font-semibold text-sm transition-all cursor-pointer ${
                  currentView === 'discover'
                    ? 'bg-[#974400] text-white shadow-sm'
                    : 'bg-white text-[#231914] border border-[#ddc1b3]/40 hover:bg-[#fff1eb]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Compass className={`w-5 h-5 ${currentView === 'discover' ? 'text-white' : 'text-[#974400]'}`} />
                  <div>
                    <div className="font-bold">{language === 'HI' ? 'खोजें (Discover)' : 'Discover Heritage'}</div>
                    <div className="text-[11px] opacity-80">{language === 'HI' ? 'प्रमुख प्रदर्शनी एवं ज्ञान हब' : 'Curated clusters & living arts'}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 opacity-60" />
              </button>

              <button
                id="drawer-nav-map"
                onClick={() => handleNavClick('map')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left font-semibold text-sm transition-all cursor-pointer ${
                  currentView === 'map'
                    ? 'bg-[#974400] text-white shadow-sm'
                    : 'bg-white text-[#231914] border border-[#ddc1b3]/40 hover:bg-[#fff1eb]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className={`w-5 h-5 ${currentView === 'map' ? 'text-white' : 'text-[#974400]'}`} />
                  <div>
                    <div className="font-bold">{language === 'HI' ? 'मानचित्र एवं रडार (Map)' : 'Interactive Heatmap & Radar'}</div>
                    <div className="text-[11px] opacity-80">{language === 'HI' ? 'भू-टैग क्लस्टर व स्थानीय हाट' : 'Geotagged GI clusters & melas'}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 opacity-60" />
              </button>

              <button
                id="drawer-nav-creators"
                onClick={() => handleNavClick('creators')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left font-semibold text-sm transition-all cursor-pointer ${
                  currentView === 'creators'
                    ? 'bg-[#974400] text-white shadow-sm'
                    : 'bg-white text-[#231914] border border-[#ddc1b3]/40 hover:bg-[#fff1eb]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className={`w-5 h-5 ${currentView === 'creators' ? 'text-white' : 'text-[#974400]'}`} />
                  <div>
                    <div className="font-bold">{language === 'HI' ? 'सत्यापित कारीगर (Creators)' : 'Verified Creators & Stewards'}</div>
                    <div className="text-[11px] opacity-80">{language === 'HI' ? 'शिल्पकार, किसान व वनस्पति संरक्षक' : 'Master artists, growers & herbalists'}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 opacity-60" />
              </button>

              <button
                id="drawer-nav-impact"
                onClick={() => handleNavClick('buyer-profile')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left font-semibold text-sm transition-all cursor-pointer ${
                  currentView === 'buyer-profile'
                    ? 'bg-[#974400] text-white shadow-sm'
                    : 'bg-white text-[#231914] border border-[#ddc1b3]/40 hover:bg-[#fff1eb]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Award className={`w-5 h-5 ${currentView === 'buyer-profile' ? 'text-white' : 'text-[#974400]'}`} />
                  <div>
                    <div className="font-bold">{language === 'HI' ? 'मेरी पहचान (My Impact)' : 'Scout Impact Profile'}</div>
                    <div className="text-[11px] opacity-80">{language === 'HI' ? 'स्काउट स्तर, बैज और योगदान' : 'Gamified scout XP, badges & pins'}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 opacity-60" />
              </button>

              {/* Explicit About Page Link in Mobile Drawer */}
              <button
                id="drawer-nav-about"
                onClick={() => handleNavClick('about')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left font-semibold text-sm transition-all cursor-pointer ${
                  currentView === 'about'
                    ? 'bg-[#974400] text-white shadow-sm'
                    : 'bg-white text-[#231914] border border-[#ddc1b3]/40 hover:bg-[#fff1eb]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Info className={`w-5 h-5 ${currentView === 'about' ? 'text-white' : 'text-[#974400]'}`} />
                  <div>
                    <div className="font-bold">{language === 'HI' ? 'हमारे बारे में (About Mission)' : 'Our Mission (About)'}</div>
                    <div className="text-[11px] opacity-80">{language === 'HI' ? 'हेरिटेज हंट की आवश्यकता व 3 स्तंभ' : 'Why Heritage Hunt exists & 3 pillars'}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 opacity-60" />
              </button>

              {/* Artisan Registration in Drawer */}
              <button
                id="drawer-nav-register"
                onClick={() => handleNavClick('artisan-register')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left font-semibold text-sm transition-all cursor-pointer ${
                  currentView === 'artisan-register'
                    ? 'bg-[#974400] text-white shadow-sm'
                    : 'bg-[#fff1eb] text-[#974400] border border-[#ffdbc9] hover:bg-[#feeae0]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <PlusCircle className="w-5 h-5 text-[#974400]" />
                  <div>
                    <div className="font-bold">{language === 'HI' ? 'कारीगर पंजीकरण पोर्टल' : 'Artisan Self-Registration'}</div>
                    <div className="text-[11px] text-[#564338]">{language === 'HI' ? 'स्वयं या स्काउट द्वारा निशुल्क दर्ज करें' : 'Create digital passport & radar listing'}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 opacity-60 text-[#974400]" />
              </button>
            </div>

            {/* Quick Contributor / Scout Action in Mobile Drawer */}
            {onJoinContributor && (
              <div className="pt-2">
                <button
                  id="drawer-join-contributor-btn"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onJoinContributor();
                  }}
                  className="w-full bg-[#186a22] text-white p-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-[#13551b] transition-all cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-[#92fa83]" />
                  <span>{language === 'HI' ? 'फील्ड स्काउट के रूप में जुड़ें' : 'Join as a Heritage Scout'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (Complete 5-Item Parity including About) */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fff8f6]/95 backdrop-blur-md border-t border-[#ddc1b3]/40 shadow-lg px-2 py-1.5 flex justify-around items-center"
        aria-label="Mobile Bottom Navigation"
      >
        <button
          id="mob-nav-discover"
          onClick={() => handleNavClick('discover')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            currentView === 'discover'
              ? 'bg-[#974400] text-white shadow-xs font-bold'
              : 'text-[#564338] hover:bg-[#f2dfd5]'
          }`}
          aria-label="Discover"
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium leading-none">{language === 'HI' ? 'खोजें' : 'Discover'}</span>
        </button>

        <button
          id="mob-nav-map"
          onClick={() => handleNavClick('map')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            currentView === 'map'
              ? 'bg-[#974400] text-white shadow-xs font-bold'
              : 'text-[#564338] hover:bg-[#f2dfd5]'
          }`}
          aria-label="Map"
        >
          <MapPin className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium leading-none">{language === 'HI' ? 'मानचित्र' : 'Map'}</span>
        </button>

        <button
          id="mob-nav-creators"
          onClick={() => handleNavClick('creators')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            currentView === 'creators'
              ? 'bg-[#974400] text-white shadow-xs font-bold'
              : 'text-[#564338] hover:bg-[#f2dfd5]'
          }`}
          aria-label="Creators"
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium leading-none">{language === 'HI' ? 'कारीगर' : 'Creators'}</span>
        </button>

        <button
          id="mob-nav-buyer-profile"
          onClick={() => handleNavClick('buyer-profile')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            currentView === 'buyer-profile'
              ? 'bg-[#974400] text-white shadow-xs font-bold'
              : 'text-[#564338] hover:bg-[#f2dfd5]'
          }`}
          aria-label="Impact"
        >
          <Award className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium leading-none">{language === 'HI' ? 'पहचान' : 'Impact'}</span>
        </button>

        {/* 🌟 Unhidden About Page in Mobile Navigation */}
        <button
          id="mob-nav-about"
          onClick={() => handleNavClick('about')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            currentView === 'about'
              ? 'bg-[#974400] text-white shadow-xs font-bold'
              : 'text-[#564338] hover:bg-[#f2dfd5]'
          }`}
          aria-label="About"
        >
          <Info className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium leading-none">{language === 'HI' ? 'मिशन' : 'About'}</span>
        </button>
      </nav>
    </>
  );
};
