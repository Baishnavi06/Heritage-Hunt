import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ARTISANS } from './data/artisans';
import { INITIAL_EVENTS } from './data/events';
import { Artisan, LocalEvent, Review, ViewType } from './types';
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

type ModalType = 'postcard' | 'contact' | 'encyclopedia' | 'contributor';

interface ParsedRoute {
  view: ViewType;
  artisan?: Artisan;
  modal?: ModalType | null;
}

// Convert route info to canonical URL hash
function getHashForRoute(view: ViewType, artisanId?: string, modal?: ModalType | null): string {
  let baseHash = '#/discover';
  switch (view) {
    case 'discover':
      baseHash = '#/discover';
      break;
    case 'map':
      baseHash = '#/map';
      break;
    case 'creators':
      baseHash = '#/creators';
      break;
    case 'buyer-profile':
      baseHash = '#/impact';
      break;
    case 'about':
      baseHash = '#/about';
      break;
    case 'artisan-register':
      baseHash = '#/register';
      break;
    case 'artisan-profile':
      baseHash = artisanId ? `#/artisan/${artisanId}` : '#/creators';
      break;
    default:
      baseHash = '#/discover';
  }

  if (modal) {
    return `${baseHash}?modal=${modal}`;
  }
  return baseHash;
}

// Parse view, artisan, and modal from URL hash
function parseRouteFromHash(rawHash: string, artisans: Artisan[]): ParsedRoute {
  const hashWithoutPound = rawHash.replace(/^#\/?/, '').trim();
  const [pathPart, queryPart] = hashWithoutPound.split('?');
  const path = pathPart ? pathPart.replace(/^\/+|\/+$/g, '') : '';

  let modal: ModalType | null = null;
  if (queryPart) {
    const params = new URLSearchParams(queryPart);
    const m = params.get('modal');
    if (m === 'postcard' || m === 'contact' || m === 'encyclopedia' || m === 'contributor') {
      modal = m;
    }
  }

  if (!path || path === 'discover') {
    return { view: 'discover', modal };
  }
  if (path === 'map') {
    return { view: 'map', modal };
  }
  if (path === 'creators') {
    return { view: 'creators', modal };
  }
  if (path === 'impact' || path === 'buyer-profile') {
    return { view: 'buyer-profile', modal };
  }
  if (path === 'about' || path === 'mission') {
    return { view: 'about', modal };
  }
  if (path === 'register' || path === 'artisan-register') {
    return { view: 'artisan-register', modal };
  }
  if (path.startsWith('artisan/')) {
    const artisanId = path.replace('artisan/', '');
    const found = artisans.find((a) => a.id === artisanId);
    return { view: 'artisan-profile', artisan: found || artisans[0], modal };
  }
  if (path === 'artisan') {
    if (queryPart) {
      const params = new URLSearchParams(queryPart);
      const artisanId = params.get('id');
      if (artisanId) {
        const found = artisans.find((a) => a.id === artisanId);
        return { view: 'artisan-profile', artisan: found || artisans[0], modal };
      }
    }
    return { view: 'artisan-profile', artisan: artisans[0], modal };
  }

  return { view: 'discover', modal };
}

export function App() {
  const [artisansList, setArtisansList] = useState<Artisan[]>(ARTISANS);
  const [eventsList, setEventsList] = useState<LocalEvent[]>(INITIAL_EVENTS);
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan>(ARTISANS[0]);
  const [currentView, setCurrentView] = useState<ViewType>('discover');
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');

  // Modals state
  const [isPostcardOpen, setIsPostcardOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isEncyclopediaOpen, setIsEncyclopediaOpen] = useState(false);
  const [isContributorOpen, setIsContributorOpen] = useState(false);

  const isInternalNavRef = useRef(false);

  // Sync document title
  const updateDocumentTitle = useCallback((view: ViewType, artisan?: Artisan) => {
    switch (view) {
      case 'discover':
        document.title = 'Heritage Hunt | Crowd-Sourced Cultural Discovery & Roots';
        break;
      case 'map':
        document.title = 'Interactive Heritage Heatmap & Haat Radar | Heritage Hunt';
        break;
      case 'creators':
        document.title = 'Verified Indigenous Creators & Botanical Stewards | Heritage Hunt';
        break;
      case 'buyer-profile':
        document.title = 'Scout Impact Profile & Badges | Heritage Hunt';
        break;
      case 'about':
        document.title = 'Our Mission & Why Heritage Hunt Exists | Heritage Hunt';
        break;
      case 'artisan-register':
        document.title = 'Artisan & Scout Registry Portal | Heritage Hunt';
        break;
      case 'artisan-profile':
        document.title = artisan
          ? `${artisan.name} (${artisan.artForm}) | Heritage Hunt`
          : 'Artisan Profile | Heritage Hunt';
        break;
      default:
        document.title = 'Heritage Hunt';
    }
  }, []);

  // Update modal state in React
  const setModalState = useCallback((modal: ModalType | null) => {
    setIsPostcardOpen(modal === 'postcard');
    setIsContactOpen(modal === 'contact');
    setIsEncyclopediaOpen(modal === 'encyclopedia');
    setIsContributorOpen(modal === 'contributor');
  }, []);

  // Centralized navigation handler
  const navigate = useCallback(
    (
      view: ViewType,
      options?: {
        artisan?: Artisan;
        replace?: boolean;
        modal?: ModalType | null;
      }
    ) => {
      const targetArtisan = options?.artisan || (view === 'artisan-profile' ? selectedArtisan : undefined);
      const targetModal = options?.modal !== undefined ? options.modal : null;
      const targetHash = getHashForRoute(view, targetArtisan?.id, targetModal);

      // Close open modals if navigating to a view without explicit modal
      setModalState(targetModal);

      if (targetArtisan) {
        setSelectedArtisan(targetArtisan);
      }
      setCurrentView(view);
      updateDocumentTitle(view, targetArtisan);

      // Scroll to top on view transition
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Synchronize browser history stack
      if (window.location.hash !== targetHash) {
        isInternalNavRef.current = true;
        const stateObj = { view, artisanId: targetArtisan?.id, modal: targetModal };
        if (options?.replace) {
          window.history.replaceState(stateObj, '', targetHash);
        } else {
          window.history.pushState(stateObj, '', targetHash);
        }
        setTimeout(() => {
          isInternalNavRef.current = false;
        }, 50);
      }
    },
    [selectedArtisan, setModalState, updateDocumentTitle]
  );

  // Open modal with history push
  const openModal = useCallback(
    (modalName: ModalType) => {
      setModalState(modalName);
      const currentHash = window.location.hash || getHashForRoute(currentView, selectedArtisan?.id);
      const [pathPart] = currentHash.split('?');
      const modalHash = `${pathPart}?modal=${modalName}`;

      isInternalNavRef.current = true;
      window.history.pushState(
        { view: currentView, artisanId: selectedArtisan?.id, modal: modalName },
        '',
        modalHash
      );
      setTimeout(() => {
        isInternalNavRef.current = false;
      }, 50);
    },
    [currentView, selectedArtisan, setModalState]
  );

  // Close modal and sync history
  const closeModal = useCallback(
    (modalName: ModalType) => {
      setModalState(null);
      if (window.location.hash.includes(`modal=${modalName}`)) {
        window.history.back();
      }
    },
    [setModalState]
  );

  // Handle browser / device back & forward buttons
  useEffect(() => {
    const handlePopState = () => {
      if (isInternalNavRef.current) return;

      const route = parseRouteFromHash(window.location.hash, artisansList);

      setModalState(route.modal || null);

      if (route.artisan) {
        setSelectedArtisan(route.artisan);
      }
      setCurrentView(route.view);
      updateDocumentTitle(route.view, route.artisan);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Initialize routing from current URL on initial page mount
    if (window.location.hash) {
      const initialRoute = parseRouteFromHash(window.location.hash, artisansList);
      if (initialRoute.artisan) {
        setSelectedArtisan(initialRoute.artisan);
      }
      setCurrentView(initialRoute.view);
      setModalState(initialRoute.modal || null);
      updateDocumentTitle(initialRoute.view, initialRoute.artisan);
      window.history.replaceState(
        {
          view: initialRoute.view,
          artisanId: initialRoute.artisan?.id,
          modal: initialRoute.modal || null,
        },
        '',
        window.location.hash
      );
    } else {
      window.history.replaceState(
        { view: 'discover', modal: null },
        '',
        '#/discover'
      );
      updateDocumentTitle('discover');
    }

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, [artisansList, setModalState, updateDocumentTitle]);

  const handleSelectArtisan = (artisan: Artisan) => {
    navigate('artisan-profile', { artisan });
  };

  const handleRegisterSuccess = (newArtisan: Artisan) => {
    setArtisansList((prev) => [newArtisan, ...prev]);
    navigate('artisan-profile', { artisan: newArtisan });
  };

  const handleAddArtisan = (newArtisan: Artisan) => {
    setArtisansList((prev) => [newArtisan, ...prev]);
    navigate('artisan-profile', { artisan: newArtisan });
  };

  const handleAddEvent = (newEvent: LocalEvent) => {
    setEventsList((prev) => [newEvent, ...prev]);
  };

  const handleAddReview = (artisanId: string, newReview: Review) => {
    setArtisansList((prev) =>
      prev.map((a) => {
        if (a.id === artisanId) {
          const updatedReviews = [newReview, ...(a.reviews || [])];
          return {
            ...a,
            reviews: updatedReviews,
            contributionsCount: (a.contributionsCount || 0) + 1,
          };
        }
        return a;
      })
    );
    if (selectedArtisan.id === artisanId) {
      setSelectedArtisan((prev) => ({
        ...prev,
        reviews: [newReview, ...(prev.reviews || [])],
        contributionsCount: (prev.contributionsCount || 0) + 1,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#231914] flex flex-col font-sans selection:bg-[#ffdbc9] selection:text-[#763400]">
      {/* Top Navbar & Mobile Bottom Nav & Slide-Over Drawer */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => navigate(view)}
        language={language}
        onToggleLanguage={() =>
          setLanguage((prev) => (prev === 'EN' ? 'HI' : 'EN'))
        }
        onJoinContributor={() => openModal('contributor')}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-[64px] sm:pt-[72px]">
        {currentView === 'discover' && (
          <DiscoverView
            artisans={artisansList}
            events={eventsList}
            onSelectArtisan={handleSelectArtisan}
            onExploreMapClick={() => {
              const el = document.getElementById('heritage-heatmap-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                navigate('map');
              }
            }}
            onJoinContributorClick={() => openModal('contributor')}
            onRegisterArtisanClick={() => navigate('artisan-register')}
            onViewAllCreators={() => navigate('creators')}
            onReportEventClick={() => navigate('buyer-profile')}
            onAddArtisan={handleAddArtisan}
          />
        )}

        {currentView === 'artisan-profile' && (
          <ArtisanProfileView
            artisan={selectedArtisan}
            onOpenPostcardModal={() => openModal('postcard')}
            onOpenContactModal={() => openModal('contact')}
            onOpenEncyclopediaModal={() => openModal('encyclopedia')}
            onAddReview={handleAddReview}
            onBack={() => {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                navigate('creators');
              }
            }}
          />
        )}

        {currentView === 'map' && (
          <MapView
            artisans={artisansList}
            events={eventsList}
            onSelectArtisan={handleSelectArtisan}
            onReportEvent={() => navigate('buyer-profile')}
            onAddArtisan={handleAddArtisan}
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
            events={eventsList}
            onSelectArtisan={handleSelectArtisan}
            onExploreMap={() => navigate('map')}
            onPinCreator={() => openModal('contributor')}
            onReportEventSuccess={handleAddEvent}
          />
        )}

        {currentView === 'artisan-register' && (
          <ArtisanRegisterView
            onRegisterSuccess={handleRegisterSuccess}
            onExploreMap={() => navigate('map')}
            onViewCreators={() => navigate('creators')}
            onBroadcastExhibition={handleAddEvent}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onJoinContributor={() => openModal('contributor')}
            onExploreMap={() => navigate('map')}
            onRegisterArtisan={() => navigate('artisan-register')}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={(view) => navigate(view)}
        onJoinContributor={() => openModal('contributor')}
      />

      {/* ================= MODALS & OVERLAYS ================= */}

      {/* Screen 4: Digital Postcard Modal (9:16 Postcard + Sharing) */}
      <DigitalPostcardModal
        artisan={selectedArtisan}
        isOpen={isPostcardOpen}
        onClose={() => closeModal('postcard')}
      />

      {/* Contact Artisan Collective Modal */}
      <ContactArtisanModal
        artisan={selectedArtisan}
        isOpen={isContactOpen}
        onClose={() => closeModal('contact')}
      />

      {/* Roots Encyclopedia & District Knowledge Hub Modal */}
      <RootsEncyclopediaModal
        isOpen={isEncyclopediaOpen}
        onClose={() => closeModal('encyclopedia')}
      />

      {/* Contributor / Scout Registration Modal */}
      <ContributorModal
        isOpen={isContributorOpen}
        onClose={() => closeModal('contributor')}
        onExploreMap={() => {
          closeModal('contributor');
          navigate('map');
        }}
      />
    </div>
  );
}

export default App;
