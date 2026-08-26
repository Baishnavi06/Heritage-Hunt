import React, { useState } from 'react';
import { Artisan } from '../types';
import {
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Users,
  Share2,
  Phone,
  Brush,
  ArrowRight,
  Sparkles,
  Star,
  MessageSquare,
  Compass,
  Heart,
  Trees,
  Sprout,
  Palette,
} from 'lucide-react';

interface ArtisanProfileViewProps {
  artisan: Artisan;
  onOpenPostcardModal: () => void;
  onOpenContactModal: () => void;
  onOpenEncyclopediaModal: () => void;
}

export const ArtisanProfileView: React.FC<ArtisanProfileViewProps> = ({
  artisan,
  onOpenPostcardModal,
  onOpenContactModal,
  onOpenEncyclopediaModal,
}) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [liked, setLiked] = useState(false);

  const isFlora = artisan.category === 'Indigenous Flora';
  const isAgri = artisan.category === 'Agriculture';

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 animate-in fade-in duration-300">
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
                  Trust Score
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
              <p className="text-xs text-[#564338] mt-2 font-medium">
                Highly verified authenticity via GPS on-site proof
              </p>
            </div>

            {/* Bento Card 2: Community Impact */}
            <div className="bg-white p-6 rounded-2xl border border-[#ddc1b3]/40 card-shadow transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-[#564338]">
                  Community Impact
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
                    Contributions
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
            <span>View Full Encyclopedia</span>
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

      {/* Seen Through the Eyes of Buyers & Community (Gallery & Reviews) */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#231914] mb-3">
            Seen Through the Eyes of Community &amp; Visitors
          </h2>
          <p className="text-sm text-[#564338] leading-relaxed">
            Authentic moments and creations documented by visitors and
            contributors who have witnessed the craft firsthand.
          </p>
        </div>

        {/* 4-Item Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Photo 1: Big Peacock Mural */}
          <div className="sm:col-span-2 md:row-span-2 rounded-2xl overflow-hidden card-shadow relative group h-[340px] sm:h-[400px]">
            <img
              src={
                artisan.gallery[0]?.url ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBpH6KffzLoKRc8cGg_rvodT0gbg0KedgdsHOKvili2SNxeQdWCLsm9BVRy8inJlNbH09XmyxCSWPrrdiDZcFmg7XZT0kCYXvOBPDmEFZ84-mu_xVxZ_VWtOu8lfWrGyykOUxJPWqWyYWGOsRUh2-dZu1ALnQujDIRv58mzXQgQRwTN1Psjk7dgRqR7rWV7hRqMLQhPd0N_YnbqHOSq-p0m44qpFSkAY9ALQ1b9aolKhEfE69wyQYg'
              }
              alt="Sohrai mural detail"
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                Sohrai Mural • Mud Canvas
              </span>
            </div>
          </div>

          {/* Photo 2: Terracotta Pigment Bowls */}
          <div className="rounded-2xl overflow-hidden card-shadow relative group h-[190px]">
            <img
              src={
                artisan.gallery[1]?.url ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCtN_PLr84GzI5ggZM7Mj-eUZLAjN-qkAGR-uHUqARD8DPuA2K1AYfc2bxPen4w3EqldwKaIbyJ4iKmsprOLqX5Ma3fpO5SMxv4kRTKSBznZBBLjj6WMfXKqLqhq5PLUMoGlzfB_T1z-uC7y2p605Rl_n-vmG6C--U1Xk9Hkw_RcRkctDrXU08OlCmGSUsjnnAIQUiyT_VT8p1hXnfeRGVQ5TSrWRAS5wyaLoQ2LvCEZt0BxrgMC2Y'
              }
              alt="Natural earth pigments"
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
              <span className="text-[11px] text-white bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                Raw Earth Pigments
              </span>
            </div>
          </div>

          {/* Photo 3: Hands Painting Border */}
          <div className="rounded-2xl overflow-hidden card-shadow relative group h-[190px]">
            <img
              src={
                artisan.gallery[2]?.url ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBwbmGOZtSpGFJ2qbgJakNo7CiovgXD8EV6G7L47I5Jnc-odxxyHSpEjPk670ocLN1VGKTVlCCbSxY4axIsyMu6g3Nd4SOR_hWPQ1LQd6P1v35DgoG5230oYVs6eDnonP-cn_nuUPgTvSp4bFO3HviwHQBX2oqzEt9vMIXDbWeLLTGy5Wvhw0eChaYT6DYLw-2hTT7q9Qm7S2W7YiyzaPe5OCZhYwm_d9zjy0OkkRQSSN2eU6Eikow'
              }
              alt="Artisan hands painting"
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
              <span className="text-[11px] text-white bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                Traditional Datun Brushes
              </span>
            </div>
          </div>

          {/* Photo 4: Hazaribagh Village Courtyard */}
          <div className="sm:col-span-2 rounded-2xl overflow-hidden card-shadow relative group h-[190px]">
            <img
              src={
                artisan.gallery[3]?.url ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDrXmNZYTqyQRPh11niGOYRpukm9l3Xwppch_dIiKfssFnm2dsLkxlYSHvALmge412jCmWFxhI_J06GAifZxK5QbQ7SuLPT_dzgtesd4Q7do7dGZpjWh1YQqedd2vMxTTU-qSNNaeyNjCRvHV608K9GXIGBctHMzmlbQoA7aAfE3QNWyDM29TFY1FpQw0U0hs7HsAhzUXZ4mRFUJ3ZiZ23Rli7D03I_01t9sKSmHgRY1i5rkiTktqU'
              }
              alt="Hazaribagh Village Courtyard"
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3.5">
              <span className="text-xs font-semibold text-white bg-[#231914]/80 px-3 py-1 rounded-md backdrop-blur-xs">
                Hazaribagh Village
              </span>
            </div>
          </div>
        </div>

        {/* View All Contributions Button */}
        <div className="text-center mt-10">
          <button
            id="view-all-contributions-btn"
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="px-8 py-3 rounded-full border border-[#8a7266] text-[#231914] font-sans text-sm font-semibold hover:bg-[#feeae0] transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-[#974400]" />
            <span>
              {showAllReviews
                ? 'Hide Contributions'
                : `View All ${artisan.contributionsCount} Contributions`}
            </span>
          </button>
        </div>

        {/* Expanded Reviews Drawer */}
        {showAllReviews && (
          <div className="mt-8 bg-white p-6 sm:p-8 rounded-2xl border border-[#ddc1b3]/40 card-shadow animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#231914]">
                  Verified Scout Logs &amp; Field Stories
                </h3>
                <p className="text-xs text-[#564338]">
                  Photographic proof and reviews documented by Heritage Scouts on-site.
                </p>
              </div>
              <div className="bg-[#ebfbee] text-[#006e0c] text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-[#92fa83]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% GPS Verified</span>
              </div>
            </div>

            <div className="space-y-4">
              {artisan.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 bg-[#fff1eb] rounded-xl border border-[#ddc1b3]/30"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#974400] text-white flex items-center justify-center font-bold text-xs">
                        {rev.author[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#231914]">
                          {rev.author}
                        </div>
                        <div className="text-[11px] text-[#006e0c] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{rev.verifiedGps}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-[#974400] text-xs">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#974400]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#564338] leading-relaxed">
                    {rev.text}
                  </p>
                  {rev.photoUrl && (
                    <img
                      src={rev.photoUrl}
                      alt="Uploaded proof"
                      className="mt-3 w-28 h-20 rounded-lg object-cover border border-[#ddc1b3]"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
