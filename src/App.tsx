import React, { useState, useEffect } from 'react';
import { ARTISANS } from './data/artisans';
import { Artisan } from './types';
import { Navbar } from './components/Navbar';
import { DiscoverView } from './components/DiscoverView';
import { ArtisanProfileView } from './components/ArtisanProfileView';
import { MapView } from './components/MapView';
import { CreatorsView } from './components/CreatorsView';
import { AboutView } from './components/AboutView';
import { BuyerImpactProfileView } from './components/BuyerImpactProfileView';
import { ArtisanRegisterView } from './components/ArtisanRegisterView';
import { Footer } from './components/Footer';
import { DigitalPostcardModal } from './components/DigitalPostcardModal';
import { ContactArtisanModal } from './components/ContactArtisanModal';
import { RootsEncyclopediaModal } from './components/RootsEncyclopediaModal';
import { ContributorModal } from './components/ContributorModal';

export function App() {
  const [artisansList, setArtisansList] = useState<Artisan[]>(ARTISANS);
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan>(ARTISANS[0]);
  const [currentView, setCurrentView] = useState<
    'discover' | 'map' | 'creators' | 'about' | 'artisan-profile' | 'buyer-profile' | 'artisan-register'
  >('discover');
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');

  // Modals state
  const [isPostcardOpen, setIsPostcardOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isEncyclopediaOpen, setIsEncyclopediaOpen] = useState(false);
  const [isContributorOpen, setIsContributorOpen] = useState(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedArtisan]);

  const handleSelectArtisan = (artisan: Artisan) => {
    setSelectedArtisan(artisan);
    setCurrentView('artisan-profile');
  };

  const handleRegisterSuccess = (newArtisan: Artisan) => {
    setArtisansList((prev) => [newArtisan, ...prev]);
    setSelectedArtisan(newArtisan);
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#231914] flex flex-col font-sans selection:bg-[#ffdbc9] selection:text-[#763400]">
      {/* Top Navbar & Mobile Bottom Nav */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        language={language}
        onToggleLanguage={() =>
          setLanguage((prev) => (prev === 'EN' ? 'HI' : 'EN'))
        }
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-[72px]">
        {currentView === 'discover' && (
          <DiscoverView
            artisans={artisansList}
            onSelectArtisan={handleSelectArtisan}
            onExploreMapClick={() => {
              const el = document.getElementById('heritage-heatmap-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                setCurrentView('map');
              }
            }}
            onPinCreatorClick={() => setIsContributorOpen(true)}
            onRegisterArtisanClick={() => setCurrentView('artisan-register')}
            onViewAllCreators={() => setCurrentView('creators')}
          />
        )}

        {currentView === 'artisan-profile' && (
          <ArtisanProfileView
            artisan={selectedArtisan}
            onOpenPostcardModal={() => setIsPostcardOpen(true)}
            onOpenContactModal={() => setIsContactOpen(true)}
            onOpenEncyclopediaModal={() => setIsEncyclopediaOpen(true)}
          />
        )}

        {currentView === 'map' && (
          <MapView
            artisans={artisansList}
            onSelectArtisan={handleSelectArtisan}
          />
        )}

        {currentView === 'creators' && (
          <CreatorsView
            artisans={artisansList}
            onSelectArtisan={handleSelectArtisan}
          />
        )}

        {currentView === 'buyer-profile' && (
          <BuyerImpactProfileView
            artisans={artisansList}
            onSelectArtisan={handleSelectArtisan}
            onExploreMap={() => setCurrentView('map')}
            onPinCreator={() => setIsContributorOpen(true)}
          />
        )}

        {currentView === 'artisan-register' && (
          <ArtisanRegisterView
            onRegisterSuccess={handleRegisterSuccess}
            onExploreMap={() => setCurrentView('map')}
            onViewCreators={() => setCurrentView('creators')}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onJoinContributor={() => setIsContributorOpen(true)}
            onExploreMap={() => setCurrentView('map')}
            onRegisterArtisan={() => setCurrentView('artisan-register')}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={(view) => setCurrentView(view)}
        onJoinContributor={() => setIsContributorOpen(true)}
      />

      {/* ================= MODALS & OVERLAYS ================= */}

      {/* Screen 4: Digital Postcard Modal (9:16 Postcard + Sharing) */}
      <DigitalPostcardModal
        artisan={selectedArtisan}
        isOpen={isPostcardOpen}
        onClose={() => setIsPostcardOpen(false)}
      />

      {/* Contact Artisan Collective Modal */}
      <ContactArtisanModal
        artisan={selectedArtisan}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Roots Encyclopedia Modal */}
      <RootsEncyclopediaModal
        isOpen={isEncyclopediaOpen}
        onClose={() => setIsEncyclopediaOpen(false)}
      />

      {/* Contributor / Scout Registration Modal */}
      <ContributorModal
        isOpen={isContributorOpen}
        onClose={() => setIsContributorOpen(false)}
        onExploreMap={() => setCurrentView('map')}
      />
    </div>
  );
}

export default App;

