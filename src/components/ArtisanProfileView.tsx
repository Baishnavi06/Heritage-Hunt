import React, { useState } from 'react';
import { Artisan, Review } from '../types';
import {
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Users,
  Share2,
  Phone,
  Brush,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Star,
  MessageSquare,
  Compass,
  Heart,
  Trees,
  Sprout,
  Palette,
  Send,
  Camera,
  Check,
  LocateFixed,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ArtisanProfileViewProps {
  artisan: Artisan;
  onOpenPostcardModal: () => void;
  onOpenContactModal: () => void;
  onOpenEncyclopediaModal: () => void;
  onAddReview?: (artisanId: string, review: Review) => void;
  onBack?: () => void;
}

export const ArtisanProfileView: React.FC<ArtisanProfileViewProps> = ({
  artisan,
  onOpenPostcardModal,
  onOpenContactModal,
  onOpenEncyclopediaModal,
  onAddReview,
  onBack,
}) => {
  const [showAllReviews, setShowAllReviews] = useState(true);
  const [liked, setLiked] = useState(false);

  // 🌟 Feature 3: Buyer Review System Form State
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [isGpsTagged, setIsGpsTagged] = useState(true);
  const [photoProofUrl, setPhotoProofUrl] = useState('');
  const [localReviews, setLocalReviews] = useState<Review[]>(artisan.reviews || []);
  const [reviewSubmittedMessage, setReviewSubmittedMessage] = useState(false);

  const isFlora = artisan.category === 'Indigenous Flora';
  const isAgri = artisan.category === 'Agriculture';

  const ratingDescriptions: Record<number, string> = {
    1: '1 Star - Needs Improvement',
    2: '2 Stars - Fair Experience',
    3: '3 Stars - Authentic & Good',
    4: '4 Stars - Very High Quality',
    5: '5 Stars - Exceptional Masterwork ★',
  };

  const handleRatingHover = (val: number) => {
    setHoverRating(val);
  };

  const handleRatingLeave = () => {
    setHoverRating(0);
  };

  const handleRatingClick = (val: number) => {
    setRating(val);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: reviewerName.trim() || 'Verified Buyer / Scout',
      date: 'Just now',
      rating,
      text: reviewText.trim(),
      verifiedGps: isGpsTagged 
        ? `${artisan.district}, Jharkhand (GPS Verified: ${artisan.coordinates.lat.toFixed(4)}° N, ${artisan.coordinates.lng.toFixed(4)}° E)`
        : `${artisan.district}, Jharkhand (Verified Purchase)`,
      photoUrl: photoProofUrl.trim() || undefined,
    };

    const updated = [newReview, ...localReviews];
    setLocalReviews(updated);
    artisan.reviews = updated;
    artisan.contributionsCount = (artisan.contributionsCount || 0) + 1;

    if (onAddReview) {
      onAddReview(artisan.id, newReview);
    }

    // Reset Form
    setReviewText('');
    setReviewerName('');
    setPhotoProofUrl('');
    setIsReviewFormOpen(false);
    setReviewSubmittedMessage(true);
    setTimeout(() => setReviewSubmittedMessage(false), 4000);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#974400', '#186a22', '#ffdbc9'],
      });
    } catch {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 pb-28 md:pb-16 animate-in fade-in duration-300">
      {/* Back Button for mobile & desktop navigation */}
      <div className="mb-6">
        <button
          id="artisan-profile-back-btn"
          onClick={() => {
            if (onBack) {
              onBack();
            } else {
              window.history.back();
            }
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#564338] hover:text-[#974400] hover:bg-[#fff1eb] border border-[#ddc1b3]/60 text-xs font-bold shadow-2xs transition-all cursor-pointer group active:scale-95"
          aria-label="Back to Previous Page"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Discovered Creators</span>
        </button>
      </div>

      {/* Profile Header Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Artisan Image (Aspect 4/5) */}
        <div className="md:col-span-5 relative rounded-2xl overflow-hidden editorial-shadow transition-all duration-300 group border border-[#ddc1b3]/40">
          <img
            src={artisan.heroImageUrl}
            alt={artisan.name}
            className="w-full h-auto object-cover aspect-[4/5] transform transition-transform duration-700 group-hover:scale-102"
          />

          {/* Floating Location & Verified Badge */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl flex items-center justify-between border border-[#ddc1b3]/40 shadow-lg">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-4 h-4 text-[#006e0c] fill-[#8ff780]" />
                <span className="text-xs font-bold text-[#006e0c] tracking-wider uppercase">
                  {isFlora ? 'Verified Flora Origin' : 'Verified Origin'}
                </span>
              </div>
              <p className="text-xs text-[#564338] flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#974400]" />
                <span>{artisan.locationName}</span>
              </p>
            </div>

            <button
              onClick={() => setLiked(!liked)}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                liked
                  ? 'bg-[#feeae0] border-[#974400] text-[#974400]'
                  : 'bg-white border-[#ddc1b3] text-[#564338] hover:text-[#974400]'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-[#974400]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right: Artisan Details & Stats Bento Box */}
        <div className="md:col-span-7 flex flex-col justify-center h-full pt-4 md:pt-2 md:pl-6">
          <div className="mb-6">
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 border ${
                isFlora
                  ? 'bg-[#ebfbee] text-[#006e0c] border-[#92fa83]'
                  : isAgri
                  ? 'bg-[#f7fff1] text-[#186a22] border-[#a3f69c]'
                  : 'bg-[#fff1eb] text-[#974400] border-[#ffdbc9]'
              }`}
            >
              {artisan.category}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#231914] mb-3 tracking-tight">
              {artisan.name}
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#564338] leading-relaxed max-w-2xl">
              {artisan.fullBio}
            </p>
          </div>

          <div className="h-px w-full bg-[#ddc1b3]/40 my-6" />

          {/* Trust & Impact Bento Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Bento Card 1: Trust Score */}
            <div className="bg-white p-6 rounded-2xl border border-[#ddc1b3]/40 card-shadow transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-[#564338]">
                  Trust Score &amp; Rating
                </span>
                <ShieldCheck className="w-5 h-5 text-[#974400]" />
              </div>
              <div className="flex items-end gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#231914] leading-none">
                  {artisan.trustScore}%
                </span>
                <div className="w-full h-2.5 bg-[#f2dfd5] rounded-full mb-1 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      isFlora ? 'bg-[#006e0c]' : isAgri ? 'bg-[#186a22]' : 'bg-[#974400]'
                    }`}
                    style={{ width: `${artisan.trustScore}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-[#564338] mt-2 font-medium flex items-center gap-1.5">
                <span className="text-[#974400] font-bold">★ {artisan.trustRating}</span>
                <span>• {localReviews.length} Verified Field Reviews</span>
              </p>
            </div>

            {/* Bento Card 2: Community Impact */}
            <div className="bg-white p-6 rounded-2xl border border-[#ddc1b3]/40 card-shadow transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-[#564338]">
                  Community Provenance
                </span>
                <Users className="w-5 h-5 text-[#006e0c]" />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <span className="font-serif text-3xl font-bold text-[#231914] block leading-tight">
                    {artisan.verifiedVisits}
                  </span>
                  <span className="text-xs text-[#564338] font-medium">
                    Verified Visits
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-serif text-3xl font-bold text-[#231914] block leading-tight">
                    {artisan.contributionsCount}
                  </span>
                  <span className="text-xs text-[#564338] font-medium">
                    Field Logs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              id="generate-digital-postcard-btn"
              onClick={onOpenPostcardModal}
              className="flex-1 bg-[#974400] text-white py-3.5 px-6 rounded-full font-sans text-sm font-semibold hover:bg-[#bb5808] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>
                {isFlora ? 'Generate Botanical Postcard' : 'Generate Digital Postcard'}
              </span>
            </button>

            <button
              id="contact-artisan-btn"
              onClick={onOpenContactModal}
              className="px-6 py-3.5 rounded-full border border-[#974400] text-[#974400] font-sans text-sm font-semibold hover:bg-[#fff1eb] transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>
                {isFlora
                  ? 'Contact Botanical Custodian'
                  : isAgri
                  ? 'Contact Farm Steward'
                  : 'Contact Artisan'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Decorative Editorial Divider */}
      <div className="w-24 h-px bg-[#ddc1b3] mx-auto my-16" />

      {/* Roots Knowledge Hub Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        <div className="md:col-span-1 flex flex-col justify-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#231914] mb-3">
            Roots Knowledge
          </h2>
          <p className="font-sans text-sm text-[#564338] mb-6 leading-relaxed">
            {isFlora
              ? `Discover the ethnobotanical significance, ecological habitat, and indigenous stewardship lore behind ${artisan.name}'s conservation work.`
              : isAgri
              ? `Discover the agrobiodiversity significance, native farming methods, and heirloom history behind ${artisan.name}'s crops.`
              : `Discover the cultural significance, historical evolution, and ritual lore behind ${artisan.name}'s craft.`}
          </p>
          <button
            id="view-encyclopedia-btn"
            onClick={onOpenEncyclopediaModal}
            className="text-[#974400] font-sans text-sm font-semibold flex items-center gap-1.5 hover:underline cursor-pointer group self-start"
          >
            <span>View Full Knowledge Archive</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="md:col-span-2 bg-[#fff1eb] rounded-2xl p-6 sm:p-8 border border-[#ddc1b3]/40 editorial-shadow">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-14 h-14 rounded-full bg-[#feeae0] flex items-center justify-center shrink-0 border border-[#ddc1b3]/50 shadow-inner">
              {isFlora ? (
                <Sprout className="w-7 h-7 text-[#006e0c]" />
              ) : isAgri ? (
                <Trees className="w-7 h-7 text-[#186a22]" />
              ) : (
                <Brush className="w-7 h-7 text-[#974400]" />
              )}
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#231914] mb-3">
                About {artisan.artForm}
              </h3>
              <p className="text-sm text-[#564338] mb-5 leading-relaxed">
                {artisan.artDescription}
              </p>
              <div className="flex gap-2 flex-wrap">
                {artisan.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white rounded-full border border-[#ddc1b3]/50 text-xs font-semibold text-[#564338] shadow-2xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Editorial Divider */}
      <div className="w-24 h-px bg-[#ddc1b3] mx-auto my-16" />

      {/* 🌟 FEATURE 3: BUYER REVIEW & FIELD SCOUT SYSTEM */}
      <section id="buyer-reviews-section">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <div className="inline-block px-3 py-1 bg-[#feeae0] text-[#974400] text-xs font-bold uppercase tracking-wider rounded-full mb-2">
              Verified Social Proof
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#231914]">
              Buyer Reviews &amp; Field Scout Logs
            </h2>
            <p className="text-sm text-[#564338] mt-1">
              Field observations and buyer verification notes submitted on location.
            </p>
          </div>

          <button
            id="write-review-toggle-btn"
            onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
            className="bg-[#974400] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold hover:bg-[#bb5808] transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{isReviewFormOpen ? 'Close Review Form' : 'Write a Review / Scout Log'}</span>
          </button>
        </div>

        {/* Success Toast */}
        {reviewSubmittedMessage && (
          <div className="mb-6 p-4 bg-[#ebfbee] text-[#006e0c] rounded-2xl border border-[#92fa83] flex items-center gap-2 text-sm font-bold animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Thank you! Your verified review and field score have been published.</span>
          </div>
        )}

        {/* Expandable Review & Rating Form */}
        {isReviewFormOpen && (
          <div className="mb-10 bg-[#fff8f6] rounded-3xl p-6 sm:p-8 border-2 border-[#974400]/40 card-shadow animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#231914]">
                  Share Your Verified Review
                </h3>
                <p className="text-xs text-[#564338]">
                  Help other conscious buyers and scouts discover authentic creations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewFormOpen(false)}
                className="p-1.5 rounded-full hover:bg-white text-[#564338] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-6">
              {/* 5-Star Rating Component */}
              <div>
                <label className="block text-xs font-bold text-[#231914] uppercase tracking-wider mb-2">
                  Select Rating <span className="text-[#974400]">*</span>
                </label>
                <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Rating">
                  {[1, 2, 3, 4, 5].map((starNum) => {
                    const isFilled = (hoverRating || rating) >= starNum;
                    return (
                      <button
                        key={starNum}
                        type="button"
                        id={`star-btn-${starNum}`}
                        onMouseEnter={() => handleRatingHover(starNum)}
                        onMouseLeave={handleRatingLeave}
                        onClick={() => handleRatingClick(starNum)}
                        className="p-1 text-2xl sm:text-3xl transition-transform hover:scale-120 cursor-pointer focus:outline-none"
                        aria-label={`${starNum} stars`}
                      >
                        <Star
                          className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                            isFilled
                              ? 'text-[#974400] fill-[#974400]'
                              : 'text-[#d1c4be] hover:text-[#974400]'
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="ml-3 text-xs sm:text-sm font-bold text-[#974400]">
                    {ratingDescriptions[hoverRating || rating]}
                  </span>
                </div>
              </div>

              {/* Reviewer Name & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#231914] mb-1.5">
                    Your Full Name <span className="text-[#974400]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g. Kunal Sharma or Scout Aanya"
                    className="w-full px-4 py-2.5 bg-white rounded-xl text-sm font-semibold border border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#231914] mb-1.5">
                    Photo Proof URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={photoProofUrl}
                    onChange={(e) => setPhotoProofUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-4 py-2.5 bg-white rounded-xl text-sm border border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                  />
                </div>
              </div>

              {/* Review Textarea with Counter */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-[#231914]">
                    Your Feedback &amp; Authenticity Observations <span className="text-[#974400]">*</span>
                  </label>
                  <span className="text-[11px] font-bold text-[#8a7266]">
                    {reviewText.length} / 500
                  </span>
                </div>
                <textarea
                  rows={4}
                  maxLength={500}
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share details about the craft quality, natural pigments, interaction with the artisan, or on-site studio visit..."
                  className="w-full p-4 bg-white rounded-xl text-sm border border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914] leading-relaxed"
                />
              </div>

              {/* Verification and Submission Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-[#006e0c] cursor-pointer bg-[#ebfbee] px-3 py-2 rounded-xl border border-[#92fa83]">
                  <input
                    type="checkbox"
                    checked={isGpsTagged}
                    onChange={(e) => setIsGpsTagged(e.target.checked)}
                    className="rounded text-[#006e0c] focus:ring-[#006e0c]"
                  />
                  <span>Tag GPS Coordinate &amp; Authenticity Badge</span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsReviewFormOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-[#ddc1b3] text-[#564338] text-xs font-bold hover:bg-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="submit-review-btn"
                    className="bg-[#974400] text-white px-7 py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-[#bb5808] transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Post Verified Review</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {localReviews.map((rev) => (
            <article
              key={rev.id}
              className="p-5 bg-white rounded-2xl border border-[#ddc1b3]/40 card-shadow transition-all"
            >
              <div className="flex justify-between items-start mb-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#974400] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    {rev.author[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#231914]">
                      {rev.author}
                    </h4>
                    <div className="text-[11px] text-[#006e0c] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{rev.verifiedGps}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="flex items-center text-[#974400] text-xs">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#974400]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#8a7266] mt-0.5">{rev.date}</span>
                </div>
              </div>

              <p className="text-sm text-[#564338] leading-relaxed pl-13">
                {rev.text}
              </p>

              {rev.photoUrl && (
                <div className="pl-13 mt-3">
                  <img
                    src={rev.photoUrl}
                    alt="Uploaded proof"
                    className="w-36 h-24 rounded-xl object-cover border border-[#ddc1b3] shadow-xs"
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
