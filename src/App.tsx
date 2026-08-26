import React, { useState, useEffect } from 'react';
import { ARTISANS } from './data/artisans';
import { Artisan } from './types';
import { Navbar } from './components/Navbar';
import { DiscoverView } from './components/DiscoverView';
import { ArtisanProfileView } from './components/ArtisanProfileView';
import { MapView } from './components/MapView';
import { CreatorsView } from './components/CreatorsView';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';
import { QRVerificationModal } from './components/QRVerificationModal';
import { DigitalPostcardModal } from './components/DigitalPostcardModal';
import { ContactArtisanModal } from './components/ContactArtisanModal';
import { RootsEncyclopediaModal } from './components/RootsEncyclopediaModal';
import { ContributorModal } from './components/ContributorModal';

export function App() {
  const [artisansList, setArtisansList] = useState<Artisan[]>(ARTISANS);
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan>(ARTISANS[0]);
  const [currentView, setCurrentView] = useState<
    'discover' | 'map' | 'creators' | 'about' | 'artisan-profile'
  >('discover');
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');

  // Modals state
  const [isScannerOpen, setIsScannerOpen] = useState(false);
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

  const handleVerificationPublished = (newReview: {
    author: string;
    rating: number;
    text: string;
    photoUrl?: string;
  }) => {
    setArtisansList((prev) =>
      prev.map((art) => {
        if (art.id === selectedArtisan.id) {
          const updatedReviews = [
            {
              id: `rev-${Date.now()}`,
              author: newReview.author,
              date: 'Just now',
              rating: newReview.rating,
              text: newReview.text,
              verifiedGps: `${art.district}, Jharkhand (GPS Verified On-Site)`,
              photoUrl: newReview.photoUrl,
            },
            ...art.reviews,
          ];
          const newContributionsCount = art.contributionsCount + 1;
          const newVerifiedVisits = art.verifiedVisits + 1;

          const updated = {
            ...art,
            reviews: updatedReviews,
            contributionsCount: newContributionsCount,
            verifiedVisits: newVerifiedVisits,
            trustScore: Math.min(100, art.trustScore + 1),
          };

          setSelectedArtisan(updated);
          return updated;
        }
        return art;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#231914] flex flex-col font-sans selection:bg-[#ffdbc9] selection:text-[#763400]">
      {/* Top Navbar & Mobile Bottom Nav */}
      <Navbar
        currentView={
          currentView === 'artisan-profile' ? 'creators' : currentView
        }
        onNavigate={(view) => setCurrentView(view)}
        onOpenScanner={() => setIsScannerOpen(true)}
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
            onJoinContributorClick={() => setIsContributorOpen(true)}
            onOpenScanner={() => setIsScannerOpen(true)}
            onViewAllCreators={() => setCurrentView('creators')}
          />
        )}

        {currentView === 'artisan-profile' && (
          <ArtisanProfileView
            artisan={selectedArtisan}
            onOpenPostcardModal={() => setIsPostcardOpen(true)}
            onOpenContactModal={() => setIsContactOpen(true)}
            onOpenEncyclopediaModal={() => setIsEncyclopediaOpen(true)}
            onOpenScanner={() => setIsScannerOpen(true)}
          />
        )}

        {currentView === 'map' && (
          <MapView
            artisans={artisansList}
            onSelectArtisan={handleSelectArtisan}
            onOpenScanner={() => setIsScannerOpen(true)}
          />
        )}

        {currentView === 'creators' && (
          <CreatorsView
            artisans={artisansList}
            onSelectArtisan={handleSelectArtisan}
            onOpenScanner={() => setIsScannerOpen(true)}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onJoinContributor={() => setIsContributorOpen(true)}
            onOpenScanner={() => setIsScannerOpen(true)}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={(view) => setCurrentView(view)}
        onJoinContributor={() => setIsContributorOpen(true)}
      />

      {/* ================= MODALS & OVERLAYS ================= */}

      {/* Screen 1: QR Verification Flow (Scanner -> Form -> Success) */}
      <QRVerificationModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        artisan={selectedArtisan}
        onVerificationPublished={handleVerificationPublished}
        onNavigateToProfile={() => setCurrentView('artisan-profile')}
        onNavigateToMap={() => setCurrentView('map')}
      />

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

      {/* Contributor Registration Modal */}
      <ContributorModal
        isOpen={isContributorOpen}
        onClose={() => setIsContributorOpen(false)}
        onStartScanning={() => setIsScannerOpen(true)}
      />
    </div>
  );
}

export default App;
