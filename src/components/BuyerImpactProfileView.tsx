import React, { useState } from 'react';
import { Artisan } from '../types';
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
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BuyerImpactProfileViewProps {
  artisans: Artisan[];
  onSelectArtisan: (artisan: Artisan) => void;
  onExploreMap: () => void;
  onPinCreator: () => void;
}

export const BuyerImpactProfileView: React.FC<BuyerImpactProfileViewProps> = ({
  artisans,
  onSelectArtisan,
  onExploreMap,
  onPinCreator,
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  // Mock buyer stats
  const scoutLevel = 3;
  const scoutTitle = 'Master Heritage Scout';
  const currentXP = 450;
  const nextLevelXP = 600;
  const artisansDiscovered = 12;
  const totalMapPins = 18;
  const totalPhotoViews = '4,280';

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
      title: 'GI Craft Detective',
      description: 'Verified an authentic Sohrai & Khovar mural master on-site',
      icon: '🎨',
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

  const shareText = `I just put my 5th local creator on the map! #HeritageHunt 🗺️✨ Check out authentic artisans & rare flora with me: ${window.location.origin}`;

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
    <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 animate-in fade-in duration-300 pb-24 md:pb-16">
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

          {/* Gamified Level Progress & Share Button */}
          <div className="w-full lg:w-96 flex flex-col gap-4">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <span className="text-[#ffdbc9]">Next Rank: Field Guardian</span>
                <span className="text-white">
                  {currentXP} / {nextLevelXP} XP
                </span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#974400] via-[#bb5808] to-[#92fa83] rounded-full transition-all duration-1000"
                  style={{ width: `${(currentXP / nextLevelXP) * 100}%` }}
                />
              </div>
            </div>

            <button
              id="share-impact-btn"
              onClick={handleOpenShare}
              className="w-full bg-[#974400] hover:bg-[#bb5808] text-white py-3 px-6 rounded-full font-sans text-sm font-semibold transition-all shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2 group border border-[#ffdbc9]/30"
            >
              <Sparkles className="w-4 h-4 text-[#92fa83] group-hover:rotate-12 transition-transform" />
              <span>Share My Impact Badge</span>
              <Share2 className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* 3 Key Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Card 1: Artisans Discovered */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl card-shadow border border-[#ddc1b3]/40 transition-all hover:border-[#974400]/40 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#564338] uppercase tracking-wider">
              Artisans Discovered
            </span>
            <div className="p-2.5 rounded-xl bg-[#feeae0] text-[#974400] group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-4xl sm:text-5xl font-bold text-[#231914]">
              {artisansDiscovered}
            </span>
            <span className="text-xs font-bold text-[#186a22] bg-[#f7fff1] px-2 py-0.5 rounded-md border border-[#a3f69c]/60">
              +3 this month
            </span>
          </div>
          <p className="text-xs text-[#564338] mt-2">
            Local creators verified and added to the public heritage index
          </p>
        </div>

        {/* Card 2: Total Map Pins */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl card-shadow border border-[#ddc1b3]/40 transition-all hover:border-[#186a22]/40 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#564338] uppercase tracking-wider">
              Total Map Pins
            </span>
            <div className="p-2.5 rounded-xl bg-[#ebfbee] text-[#006e0c] group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-4xl sm:text-5xl font-bold text-[#231914]">
              {totalMapPins}
            </span>
            <span className="text-xs font-bold text-[#006e0c] bg-[#ebfbee] px-2 py-0.5 rounded-md border border-[#92fa83]/60">
              100% GPS verified
            </span>
          </div>
          <p className="text-xs text-[#564338] mt-2">
            Exact geographical indication coordinates documented on location
          </p>
        </div>

        {/* Card 3: Total Photo Views */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl card-shadow border border-[#ddc1b3]/40 transition-all hover:border-[#bb5808]/40 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#564338] uppercase tracking-wider">
              Total Views on Photos
            </span>
            <div className="p-2.5 rounded-xl bg-[#fff1eb] text-[#bb5808] group-hover:scale-110 transition-transform">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-4xl sm:text-5xl font-bold text-[#231914]">
              {totalPhotoViews}
            </span>
            <span className="text-xs font-bold text-[#974400] bg-[#feeae0] px-2 py-0.5 rounded-md border border-[#ffdbc9]">
              +540 this week
            </span>
          </div>
          <p className="text-xs text-[#564338] mt-2">
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

      {/* Pinned Artisans by this Scout */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#231914] mb-1">
              Your Pinned Discoveries ({artisans.slice(0, 4).length})
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
                &ldquo;I just put my 5th local creator on the map!&rdquo;
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
