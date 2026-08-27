import React, { useState } from 'react';
import { Artisan, LocalEvent } from '../types';
import { INITIAL_EVENTS } from '../data/events';
import {
  Compass,
  MapPin,
  Eye,
  Award,
  Share2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Shield,
  Star,
  Copy,
  Check,
  Download,
  X,
  Radio,
  Calendar,
  CalendarPlus,
  PlusCircle,
  Clock,
  Send,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BuyerImpactProfileViewProps {
  artisans: Artisan[];
  events?: LocalEvent[];
  onSelectArtisan: (artisan: Artisan) => void;
  onExploreMap: () => void;
  onPinCreator: () => void;
  onReportEventSuccess?: (newEvent: LocalEvent) => void;
}

export const BuyerImpactProfileView: React.FC<BuyerImpactProfileViewProps> = ({
  artisans,
  events = INITIAL_EVENTS,
  onSelectArtisan,
  onExploreMap,
  onPinCreator,
  onReportEventSuccess,
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  // Dynamic gamified scout stats
  const scoutLevel = 3;
  const scoutTitle = 'Master Heritage Scout';
  const [currentXP, setCurrentXP] = useState(450);
  const nextLevelXP = 600;
  const [eventsReportedCount, setEventsReportedCount] = useState(2);
  const artisansDiscovered = 12;
  const totalMapPins = 18;
  const totalPhotoViews = '4,280';

  // Report Event form state
  const [eventName, setEventName] = useState('');
  const [eventCategory, setEventCategory] = useState<
    'Tribal Craft Mela' | 'Agrarian Haat' | 'Botanical Fair' | 'Heritage Festival'
  >('Tribal Craft Mela');
  const [eventDates, setEventDates] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [eventDistrict, setEventDistrict] = useState('Ranchi');
  const [eventCrafts, setEventCrafts] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);
  const [reportedEventsList, setReportedEventsList] = useState<LocalEvent[]>([
    events[0],
    events[1],
  ]);

  const badges = [
    {
      id: 'b1',
      title: 'First Pin Pioneer',
      description: 'Pinned your first local artisan on the geospatial registry',
      icon: '📍',
      earned: true,
      date: 'Jan 2026',
    },
    {
      id: 'b2',
      title: 'Sal Forest Tracker',
      description: 'Documented rare medicinal flora in the Netarhat Plateau',
      icon: '🌿',
      earned: true,
      date: 'Feb 2026',
    },
    {
      id: 'b3',
      title: 'Event Radar Pioneer',
      description: 'Reported active community melas & haats for +50 Impact Points',
      icon: '📡',
      earned: true,
      date: 'Feb 2026',
    },
    {
      id: 'b4',
      title: 'Heirloom Seed Keeper',
      description: 'Mapped a tribal farmer preserving endangered rice cultivars',
      icon: '🌾',
      earned: false,
      date: 'In Progress (3/5)',
    },
  ];

  const handleOpenShare = () => {
    setIsShareModalOpen(true);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#974400', '#186a22', '#ffdbc9', '#92fa83'],
      });
    } catch {}
  };

  const handleOpenReportModal = () => {
    setReportSuccess(false);
    setIsReportModalOpen(true);
  };

  const handleReportEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName.trim() || !eventDates.trim() || !eventVenue.trim()) return;

    const newEvent: LocalEvent = {
      id: `reported-event-${Date.now()}`,
      name: eventName.trim(),
      category: eventCategory,
      district: eventDistrict,
      state: 'Jharkhand',
      venue: eventVenue.trim(),
      dates: eventDates.trim(),
      time: eventTime.trim() || '10:00 AM - 7:00 PM',
      description:
        eventDescription.trim() ||
        `Community fair reported by Scout Aarav Sharma in ${eventDistrict}, featuring local master artisans and traditional produce.`,
      coordinates: {
        x: Math.floor(Math.random() * 40) + 30,
        y: Math.floor(Math.random() * 40) + 30,
        lat: 23.35 + (Math.random() - 0.5) * 1.2,
        lng: 85.33 + (Math.random() - 0.5) * 1.2,
      },
      featuredCrafts: eventCrafts
        ? eventCrafts.split(',').map((c) => c.trim())
        : ['Handicrafts', 'Organic Produce', 'Folk Arts'],
      organizer: `${eventDistrict} Community Council`,
      expectedArtisans: 25,
      expectedVisitors: '2,000+',
      status: 'Upcoming',
      reportedBy: 'Scout Aarav Sharma',
      pointsReward: 50,
      isVerified: true,
      bannerImage:
        'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?w=800&auto=format&fit=crop&q=80',
    };

    // Reward +50 Impact Points & confetti
    setCurrentXP((prev) => Math.min(nextLevelXP, prev + 50));
    setEventsReportedCount((prev) => prev + 1);
    setReportedEventsList((prev) => [newEvent, ...prev]);

    if (onReportEventSuccess) {
      onReportEventSuccess(newEvent);
    }

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#e11d48', '#974400', '#186a22', '#ffd166'],
      });
    } catch {}

    setReportSuccess(true);
  };

  const shareText = `I just put my 5th local creator & fair on the map! #HeritageHunt 🗺️✨ Check out authentic artisans & rare flora with me: ${window.location.origin}`;

  const handleCopyShare = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
    setShareFeedback('Opened WhatsApp sharing');
    setTimeout(() => setShareFeedback(null), 3000);
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
    setShareFeedback('Opened X / Twitter dialog');
    setTimeout(() => setShareFeedback(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 animate-in fade-in duration-300 pb-24 md:pb-16">
      {/* Header Banner: Gamified Scout Profile */}
      <div className="bg-gradient-to-r from-[#231914] via-[#3a281e] to-[#231914] text-white rounded-3xl p-6 sm:p-10 card-shadow border border-[#ffdbc9]/20 mb-10 relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#974400]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#186a22]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          {/* Scout Identity Info */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#ffdbc9] shadow-xl bg-[#974400]">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                  alt="Scout Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#974400] text-white p-1.5 rounded-xl border border-[#ffdbc9]/40 shadow-md">
                <Compass className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="px-3 py-0.5 rounded-full bg-[#186a22] text-[#a3f69c] text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#a3f69c]" />
                  Level {scoutLevel} Scout
                </span>
                <span className="text-xs text-[#ddc1b3] font-medium">
                  • Top 5% Contributor
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
                Aarav Sharma
              </h1>
              <p className="text-xs sm:text-sm text-[#ffdbc9]/80 font-sans mt-0.5">
                {scoutTitle} • Chota Nagpur Explorer
              </p>
            </div>
          </div>

          {/* Gamified Level Progress & Action Buttons */}
          <div className="w-full lg:w-96 flex flex-col gap-3">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <span className="text-[#ffdbc9]">Next Rank: Field Guardian</span>
                <span className="text-white font-bold">
                  {currentXP} / {nextLevelXP} XP
                </span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#974400] via-[#e11d48] to-[#92fa83] rounded-full transition-all duration-1000"
                  style={{ width: `${(currentXP / nextLevelXP) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              {/* 🌟 New Action Button: "Report a Local Fair/Event" */}
              <button
                id="report-local-event-btn"
                onClick={handleOpenReportModal}
                className="flex-1 bg-gradient-to-r from-[#e11d48] to-[#974400] hover:from-[#be123c] hover:to-[#763400] text-white py-3 px-4 rounded-full font-sans text-xs sm:text-sm font-bold transition-all shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 border border-white/20"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>Report Fair / Event</span>
                <span className="bg-white/25 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ml-0.5">
                  +50 XP
                </span>
              </button>

              {/* Share My Impact Badge */}
              <button
                id="share-impact-btn"
                onClick={handleOpenShare}
                className="bg-white/15 hover:bg-white/25 text-white py-3 px-4 rounded-full font-sans text-xs sm:text-sm font-semibold transition-all border border-white/20 cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Badge</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Key Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {/* Card 1: Artisans Discovered */}
        <div className="bg-white p-6 rounded-2xl card-shadow border border-[#ddc1b3]/40 transition-all hover:border-[#974400]/40 group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#564338] uppercase tracking-wider">
              Artisans Discovered
            </span>
            <div className="p-2.5 rounded-xl bg-[#feeae0] text-[#974400] group-hover:scale-110 transition-transform">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#231914]">
              {artisansDiscovered}
            </span>
            <span className="text-[11px] font-bold text-[#186a22] bg-[#f7fff1] px-2 py-0.5 rounded-md border border-[#a3f69c]/60">
              +3 this month
            </span>
          </div>
          <p className="text-[11px] text-[#564338] mt-2">
            Local creators verified and added to the public heritage index
          </p>
        </div>

        {/* Card 2: Events & Haats Reported (NEW RADAR STAT) */}
        <div className="bg-white p-6 rounded-2xl card-shadow border border-[#ddc1b3]/40 transition-all hover:border-[#e11d48]/40 group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#564338] uppercase tracking-wider">
              Events Reported
            </span>
            <div className="p-2.5 rounded-xl bg-[#ffe4e6] text-[#e11d48] group-hover:scale-110 transition-transform">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#231914]">
              {eventsReportedCount}
            </span>
            <span className="text-[11px] font-bold text-[#e11d48] bg-[#ffe4e6] px-2 py-0.5 rounded-md border border-[#fecdd3]">
              +50 pts each
            </span>
          </div>
          <p className="text-[11px] text-[#564338] mt-2">
            Active community melas &amp; weekly haats broadcast on the radar
          </p>
        </div>

        {/* Card 3: Total Map Pins */}
        <div className="bg-white p-6 rounded-2xl card-shadow border border-[#ddc1b3]/40 transition-all hover:border-[#186a22]/40 group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#564338] uppercase tracking-wider">
              Total Map Pins
            </span>
            <div className="p-2.5 rounded-xl bg-[#ebfbee] text-[#006e0c] group-hover:scale-110 transition-transform">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#231914]">
              {totalMapPins}
            </span>
            <span className="text-[11px] font-bold text-[#006e0c] bg-[#ebfbee] px-2 py-0.5 rounded-md border border-[#92fa83]/60">
              100% verified
            </span>
          </div>
          <p className="text-[11px] text-[#564338] mt-2">
            Exact geographical indication coordinates documented on location
          </p>
        </div>

        {/* Card 4: Total Photo Views */}
        <div className="bg-white p-6 rounded-2xl card-shadow border border-[#ddc1b3]/40 transition-all hover:border-[#bb5808]/40 group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#564338] uppercase tracking-wider">
              Total Views
            </span>
            <div className="p-2.5 rounded-xl bg-[#fff1eb] text-[#bb5808] group-hover:scale-110 transition-transform">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#231914]">
              {totalPhotoViews}
            </span>
            <span className="text-[11px] font-bold text-[#974400] bg-[#feeae0] px-2 py-0.5 rounded-md border border-[#ffdbc9]">
              +540 this wk
            </span>
          </div>
          <p className="text-[11px] text-[#564338] mt-2">
            Community members inspired to support and visit your pinned crafts
          </p>
        </div>
      </div>

      {/* Scout Badges Showcase */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#231914] mb-1">
              Scout Badges &amp; Achievements
            </h2>
            <p className="text-xs sm:text-sm text-[#564338]">
              Milestones unlocked by exploring rural heritage clusters and documenting ancestral knowledge.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-5 rounded-2xl border transition-all ${
                badge.earned
                  ? 'bg-white card-shadow border-[#ddc1b3]/40 hover:border-[#974400]/40'
                  : 'bg-[#fff8f6]/50 border-dashed border-[#ddc1b3] opacity-75'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl p-2 bg-[#fff1eb] rounded-xl">
                  {badge.icon}
                </span>
                {badge.earned ? (
                  <span className="text-[10px] font-bold text-[#006e0c] bg-[#ebfbee] px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#92fa83]/60">
                    <CheckCircle2 className="w-3 h-3" /> Unlocked
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-[#8a7266] bg-[#f2dfd5] px-2 py-0.5 rounded-full">
                    Locked
                  </span>
                )}
              </div>
              <h3 className="font-serif font-bold text-base text-[#231914] mb-1">
                {badge.title}
              </h3>
              <p className="text-xs text-[#564338] leading-relaxed mb-3">
                {badge.description}
              </p>
              <div className="text-[11px] font-semibold text-[#8a7266]">
                {badge.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Reported Events on the Radar */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#231914] flex items-center gap-2 mb-1">
              <Radio className="w-6 h-6 text-[#e11d48] animate-pulse" />
              <span>Your Reported Local Fairs &amp; Exhibitions ({reportedEventsList.length})</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#564338]">
              Community events you scouted that are now live on the public Local Event Radar.
            </p>
          </div>

          <button
            onClick={handleOpenReportModal}
            className="bg-[#e11d48] hover:bg-[#be123c] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report Another Fair (+50 XP)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportedEventsList.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl p-5 card-shadow border border-[#ddc1b3]/50 flex flex-col justify-between hover:border-[#e11d48]/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#ffe4e6] text-[#e11d48]">
                    {event.category}
                  </span>
                  <span className="text-[10px] font-bold text-[#006e0c] bg-[#ebfbee] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#ff9900]" />
                    +50 Pts Earned
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-[#231914] mb-1">
                  {event.name}
                </h3>
                <p className="text-xs text-[#564338] line-clamp-2 mb-3">
                  {event.description}
                </p>

                <div className="space-y-1 text-xs text-[#564338] bg-[#fff8f6] p-2.5 rounded-xl border border-[#ddc1b3]/30 mb-3">
                  <div className="flex items-center gap-1.5 font-semibold text-[#974400]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{event.dates}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#8a7266]">
                    <MapPin className="w-3.5 h-3.5 text-[#e11d48]" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#ddc1b3]/20 flex justify-between items-center text-xs">
                <span className="text-[#186a22] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active on Map
                </span>
                <button
                  onClick={onExploreMap}
                  className="text-[#974400] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span>View on Map</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pinned Artisans by this Scout */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#231914] mb-1">
              Your Pinned Creator Discoveries ({artisans.slice(0, 4).length})
            </h2>
            <p className="text-xs sm:text-sm text-[#564338]">
              Local masters and ecological stewards you have physically verified on the map.
            </p>
          </div>

          <button
            id="pin-another-creator-btn"
            onClick={onPinCreator}
            className="bg-[#974400] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#bb5808] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <MapPin className="w-4 h-4" />
            <span>Pin Another Local Creator</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artisans.slice(0, 4).map((artisan) => (
            <div
              key={artisan.id}
              onClick={() => onSelectArtisan(artisan)}
              className="bg-white rounded-2xl overflow-hidden card-shadow border border-[#ddc1b3]/40 cursor-pointer group hover:border-[#974400]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 overflow-hidden bg-[#fff1eb]">
                  <img
                    src={artisan.heroImageUrl}
                    alt={artisan.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#ffdbc9]" />
                    <span>{artisan.district}</span>
                  </div>
                </div>

                <div className="p-4">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                      artisan.category === 'Heritage Arts'
                        ? 'text-[#974400]'
                        : artisan.category === 'Agriculture'
                        ? 'text-[#186a22]'
                        : 'text-[#006e0c]'
                    }`}
                  >
                    {artisan.category}
                  </span>
                  <h4 className="font-serif font-bold text-lg text-[#231914] mb-1 group-hover:text-[#974400] transition-colors">
                    {artisan.name}
                  </h4>
                  <p className="text-xs text-[#564338] line-clamp-2 leading-relaxed">
                    {artisan.shortBio}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-[#ddc1b3]/20 flex justify-between items-center text-xs">
                <span className="font-semibold text-[#006e0c]">
                  ★ {artisan.trustRating} ({artisan.trustScore}% score)
                </span>
                <ArrowRight className="w-4 h-4 text-[#974400] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= 🌟 REPORT LOCAL EVENT / FAIR MODAL ================= */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3a2e28]/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-[#ddc1b3]/60 relative animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
            {/* Close Button */}
            <button
              id="close-report-event-modal-btn"
              onClick={() => setIsReportModalOpen(false)}
              className="absolute top-4 right-4 text-[#564338] hover:text-[#231914] p-2 rounded-full hover:bg-[#f2dfd5]/60 transition-colors cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {reportSuccess ? (
              /* Success Confirmation View */
              <div className="p-6 sm:p-10 text-center animate-in zoom-in-95 my-auto">
                <div className="w-20 h-20 bg-[#ffe4e6] text-[#e11d48] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#fecdd3]">
                  <Sparkles className="w-10 h-10 animate-bounce" />
                </div>

                <span className="text-xs font-bold text-[#e11d48] uppercase tracking-wider block mb-1">
                  🎉 Radar Broadcast Confirmed
                </span>

                <h3 className="font-serif text-3xl font-bold text-[#231914] mb-2">
                  +50 Impact Points Earned!
                </h3>

                <p className="text-sm text-[#564338] max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you for reporting <strong>{eventName}</strong>! The event is now live on the Heritage Hunt Local Event Radar for visitors and creators.
                </p>

                <div className="p-4 bg-[#fff8f6] rounded-2xl border border-[#ddc1b3] mb-6 max-w-md mx-auto text-left flex items-center gap-3">
                  <div className="p-3 bg-[#e11d48] text-white rounded-xl">
                    <Radio className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#231914]">{eventName}</h4>
                    <p className="text-xs text-[#974400] font-semibold">{eventDates}</p>
                    <p className="text-[11px] text-[#8a7266]">{eventVenue}, {eventDistrict}</p>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsReportModalOpen(false);
                      onExploreMap();
                    }}
                    className="bg-[#974400] hover:bg-[#bb5808] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer"
                  >
                    View on Live Radar Map
                  </button>
                  <button
                    onClick={() => setIsReportModalOpen(false)}
                    className="bg-[#feeae0] text-[#231914] px-6 py-3 rounded-full text-xs sm:text-sm font-bold hover:bg-[#f2dfd5] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* Report Event Form */
              <div className="overflow-y-auto p-6 sm:p-8">
                {/* Header */}
                <div className="mb-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe4e6] text-[#e11d48] text-xs font-bold uppercase tracking-wider mb-2">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    <span>Local Event Radar Contribution</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231914]">
                    Report a Local Fair / Event
                  </h3>
                  <p className="text-xs text-[#564338] mt-1 leading-relaxed">
                    Help buyers and heritage enthusiasts discover authentic artisan exhibitions, village haats, and agricultural melas.
                  </p>
                </div>

                {/* 🌟 Required Impact Points Reward Callout Note */}
                <div className="p-4 bg-gradient-to-r from-[#ffe4e6] via-[#fff1eb] to-[#f7fff1] rounded-2xl border border-[#e11d48]/30 flex items-center gap-3.5 mb-6 shadow-xs">
                  <div className="p-2.5 bg-[#e11d48] text-white rounded-xl shrink-0 shadow-xs">
                    <Sparkles className="w-5 h-5 text-[#ffd166] animate-spin" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-sm text-[#231914] block">
                      Earn +50 Impact Points for reporting active community events!
                    </span>
                    <span className="text-xs text-[#564338]">
                      Your report immediately alerts nearby scouts and boosts your scout rank.
                    </span>
                  </div>
                </div>

                <form onSubmit={handleReportEventSubmit} className="space-y-4">
                  {/* Event Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#231914] mb-1">
                      Event / Fair Name <span className="text-[#e11d48]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      placeholder="e.g. Ranchi Saras Mela, Sohrai Harvest Haat"
                      className="w-full bg-[#fff8f6] border border-[#ddc1b3] focus:border-[#e11d48] rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none text-[#231914] font-medium"
                    />
                  </div>

                  {/* Category & District Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#231914] mb-1">
                        Event Category <span className="text-[#e11d48]">*</span>
                      </label>
                      <select
                        value={eventCategory}
                        onChange={(e) => setEventCategory(e.target.value as any)}
                        className="w-full bg-[#fff8f6] border border-[#ddc1b3] focus:border-[#e11d48] rounded-xl px-3 py-2.5 text-xs sm:text-sm outline-none text-[#231914] font-medium cursor-pointer"
                      >
                        <option value="Tribal Craft Mela">Tribal Craft Mela</option>
                        <option value="Agrarian Haat">Agrarian &amp; Seed Haat</option>
                        <option value="Botanical Fair">Botanical &amp; Medicinal Fair</option>
                        <option value="Heritage Festival">Heritage Cultural Festival</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#231914] mb-1">
                        District <span className="text-[#e11d48]">*</span>
                      </label>
                      <select
                        value={eventDistrict}
                        onChange={(e) => setEventDistrict(e.target.value)}
                        className="w-full bg-[#fff8f6] border border-[#ddc1b3] focus:border-[#e11d48] rounded-xl px-3 py-2.5 text-xs sm:text-sm outline-none text-[#231914] font-medium cursor-pointer"
                      >
                        <option value="Ranchi">Ranchi</option>
                        <option value="Hazaribagh">Hazaribagh</option>
                        <option value="Latehar">Latehar (Netarhat)</option>
                        <option value="Khunti">Khunti</option>
                        <option value="Dumka">Dumka</option>
                        <option value="Saraikela-Kharsawan">Saraikela-Kharsawan</option>
                        <option value="Gumla">Gumla</option>
                        <option value="West Singhbhum">West Singhbhum</option>
                      </select>
                    </div>
                  </div>

                  {/* Dates & Schedule */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#231914] mb-1">
                        Dates <span className="text-[#e11d48]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={eventDates}
                        onChange={(e) => setEventDates(e.target.value)}
                        placeholder="e.g. Nov 14 - Nov 18, 2026 / Every Sunday"
                        className="w-full bg-[#fff8f6] border border-[#ddc1b3] focus:border-[#e11d48] rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none text-[#231914] font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#231914] mb-1">
                        Daily Timing (Optional)
                      </label>
                      <input
                        type="text"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        placeholder="e.g. 10:00 AM - 8:30 PM"
                        className="w-full bg-[#fff8f6] border border-[#ddc1b3] focus:border-[#e11d48] rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none text-[#231914] font-medium"
                      />
                    </div>
                  </div>

                  {/* Venue / Location */}
                  <div>
                    <label className="block text-xs font-bold text-[#231914] mb-1">
                      Venue / Ground Location <span className="text-[#e11d48]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={eventVenue}
                      onChange={(e) => setEventVenue(e.target.value)}
                      placeholder="e.g. Morabadi Exhibition Ground, near Tribal Museum, Ranchi"
                      className="w-full bg-[#fff8f6] border border-[#ddc1b3] focus:border-[#e11d48] rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none text-[#231914] font-medium"
                    />
                  </div>

                  {/* Featured Crafts */}
                  <div>
                    <label className="block text-xs font-bold text-[#231914] mb-1">
                      Featured Crafts / Produce (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={eventCrafts}
                      onChange={(e) => setEventCrafts(e.target.value)}
                      placeholder="e.g. Sohrai Murals, Dokra Bell Metal, Tussar Silk, Madua Millets"
                      className="w-full bg-[#fff8f6] border border-[#ddc1b3] focus:border-[#e11d48] rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none text-[#231914] font-medium"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold text-[#231914] mb-1">
                      Description / Highlights
                    </label>
                    <textarea
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      placeholder="Share details about participating master creators, live demonstrations, or special regional produce..."
                      rows={2}
                      className="w-full bg-[#fff8f6] border border-[#ddc1b3] focus:border-[#e11d48] rounded-xl px-4 py-2 text-xs sm:text-sm outline-none text-[#231914]"
                    />
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      id="submit-report-event-btn"
                      className="w-full bg-gradient-to-r from-[#e11d48] to-[#974400] hover:from-[#be123c] hover:to-[#763400] text-white py-3.5 rounded-full font-sans text-sm font-bold shadow-lg transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Event &amp; Earn +50 Impact Points</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= SHARE IMPACT MODAL ================= */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3a2e28]/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-[#ddc1b3]/50 relative animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              id="close-share-impact-modal-btn"
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 text-[#564338] hover:text-[#231914] p-2 rounded-full hover:bg-[#f2dfd5]/60 transition-colors cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Visual Social Badge Card */}
            <div className="p-6 sm:p-8 bg-gradient-to-br from-[#231914] via-[#463124] to-[#186a22] text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#ffdbc9]/15 rounded-full blur-2xl" />
              <div className="inline-block px-3 py-1 rounded-full bg-white/15 text-[#92fa83] text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
                ✨ Heritage Hunt Scout Badge
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-snug mb-3">
                &ldquo;I just put my 5th local creator &amp; fair on the map!&rdquo;
              </h3>

              <p className="text-xs text-[#ffdbc9]/90 font-mono mb-6">
                #HeritageHunt • Scout Aarav Sharma • Level 3
              </p>

              <div className="flex justify-center gap-6 py-3 px-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-xs mx-auto text-xs font-semibold">
                <div>
                  <span className="block text-lg font-serif font-bold text-[#ffdbc9]">
                    12
                  </span>
                  <span className="text-[10px] text-white/80">Creators</span>
                </div>
                <div className="w-px bg-white/20" />
                <div>
                  <span className="block text-lg font-serif font-bold text-[#92fa83]">
                    18
                  </span>
                  <span className="text-[10px] text-white/80">GPS Pins</span>
                </div>
                <div className="w-px bg-white/20" />
                <div>
                  <span className="block text-lg font-serif font-bold text-[#ffdbc9]">
                    4.2k
                  </span>
                  <span className="text-[10px] text-white/80">Views</span>
                </div>
              </div>
            </div>

            {/* Sharing Actions Panel */}
            <div className="p-6 sm:p-8 space-y-3">
              {shareFeedback && (
                <div className="p-2.5 bg-[#f7fff1] text-[#186a22] border border-[#a3f69c] rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1.5 animate-in fade-in">
                  <Check className="w-4 h-4" />
                  <span>{shareFeedback}</span>
                </div>
              )}

              <button
                id="share-impact-whatsapp-btn"
                onClick={handleShareWhatsApp}
                className="w-full whatsapp-green text-white font-sans text-sm font-semibold py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span className="text-base">💬</span>
                <span>Share to WhatsApp</span>
              </button>

              <button
                id="share-impact-twitter-btn"
                onClick={handleShareTwitter}
                className="w-full bg-[#111111] hover:bg-black text-white font-sans text-sm font-semibold py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Share on X / Twitter</span>
              </button>

              <button
                id="copy-impact-badge-btn"
                onClick={handleCopyShare}
                className="w-full bg-[#fff1eb] text-[#974400] hover:bg-[#feeae0] font-sans text-xs font-semibold py-3 px-4 rounded-xl border border-[#ddc1b3] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#006e0c]" />
                    <span className="text-[#006e0c]">Badge &amp; Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Badge Text &amp; Hashtag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
