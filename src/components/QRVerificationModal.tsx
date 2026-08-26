import React, { useState, useRef } from 'react';
import { Artisan } from '../types';
import {
  X,
  Flashlight,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Upload,
  Star,
  Camera,
  Sparkles,
  QrCode,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QRVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  artisan: Artisan;
  onVerificationPublished: (newReview: {
    author: string;
    rating: number;
    text: string;
    photoUrl?: string;
  }) => void;
  onNavigateToProfile: () => void;
  onNavigateToMap: () => void;
}

export const QRVerificationModal: React.FC<QRVerificationModalProps> = ({
  isOpen,
  onClose,
  artisan,
  onVerificationPublished,
  onNavigateToProfile,
  onNavigateToMap,
}) => {
  const [step, setStep] = useState<'scanner' | 'form' | 'success'>('scanner');
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [story, setStory] = useState<string>('');
  const [buyerName, setBuyerName] = useState<string>('Heritage Contributor');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#974400', '#006e0c', '#ffdbc9', '#92fa83'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleSimulateScan = () => {
    setStep('form');
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isFlora = artisan.category === 'Indigenous Flora';
  const isAgri = artisan.category === 'Agriculture';

  const handleSubmitVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onVerificationPublished({
        author: buyerName.trim() || 'Verified Visitor',
        rating,
        text:
          story.trim() ||
          (isFlora
            ? `Verified the rare native flora specimen on-site in ${artisan.district}. Sustainable wild-crafting and biodiversity stewardship are genuinely preserved.`
            : isAgri
            ? `Verified the heirloom crop harvest and organic seed bank on-site in ${artisan.district}. Traditional biodiversity is preserved.`
            : `Verified the authentic handcrafted creation on-site in ${artisan.district}. Traditional natural pigments and techniques are genuinely preserved.`),
        photoUrl: photoPreview || undefined,
      });
      setIsSubmitting(false);
      setStep('success');
      triggerConfetti();
    }, 600);
  };

  const handleReset = () => {
    setStep('scanner');
    setStory('');
    setPhotoPreview(null);
    setRating(5);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3a2e28]/70 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Container matching the card dimensions */}
      <div className="w-full max-w-lg mx-auto bg-[#ffffff] rounded-2xl shadow-2xl border border-[#ddc1b3]/50 overflow-hidden flex flex-col h-[780px] md:h-[660px] relative">
        {/* ================= STEP 1: SCANNER INTERFACE ================= */}
        {step === 'scanner' && (
          <div className="absolute inset-0 flex flex-col bg-[#231914] text-white transition-opacity duration-300 z-10">
            {/* Top Bar */}
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <button
                id="scanner-close-btn"
                onClick={onClose}
                className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors active:scale-95 cursor-pointer"
                title="Cancel Scan"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="font-sans text-sm font-semibold tracking-wider uppercase text-white/90">
                {isFlora ? 'Verify Botanical Origin' : 'Scan QR Passport'}
              </span>

              <button
                id="scanner-flash-btn"
                onClick={() => setFlashlightOn(!flashlightOn)}
                className={`p-2 rounded-full transition-all active:scale-95 cursor-pointer ${
                  flashlightOn
                    ? 'bg-[#92fa83] text-[#002201]'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                title="Toggle Torch"
              >
                <Flashlight className="w-5 h-5" />
              </button>
            </div>

            {/* Viewfinder Center */}
            <div className="flex-grow flex flex-col items-center justify-center px-8 text-center">
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-white">
                {isFlora ? 'Align QR Code to Verify Specimen' : 'Align QR Code to Verify'}
              </h3>

              {/* Viewfinder Box */}
              <div
                className={`relative w-64 h-64 border-2 border-dashed rounded-xl overflow-hidden flex items-center justify-center transition-colors ${
                  flashlightOn ? 'border-[#92fa83] bg-white/5' : 'border-[#ddc1b3]/60 bg-black/30'
                }`}
              >
                <div className="absolute inset-0 bg-[#fff8f6]/5 backdrop-blur-[2px]" />

                {/* Animated Green Laser Beam */}
                <div className="scanner-beam" />

                {/* Center Icon */}
                <QrCode className="w-16 h-16 text-[#ddc1b3] opacity-40" />

                {/* Corner Markers in Terracotta / Emerald */}
                <div className="absolute top-0 left-0 w-7 h-7 border-t-4 border-l-4 border-[#ffb68d] rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-7 h-7 border-t-4 border-r-4 border-[#ffb68d] rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-7 h-7 border-b-4 border-l-4 border-[#ffb68d] rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-7 h-7 border-b-4 border-r-4 border-[#ffb68d] rounded-br-lg" />
              </div>

              {/* Action Button: Simulate Scan Success */}
              <button
                id="simulate-scan-success-btn"
                onClick={handleSimulateScan}
                className="mt-10 px-8 py-3.5 bg-[#974400] text-white rounded-full font-sans text-sm font-semibold hover:bg-[#bb5808] transition-all shadow-lg active:scale-95 cursor-pointer flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-[#ffdbc9]" />
                <span>
                  {isFlora ? 'Simulate Botanical Scan' : 'Simulate Scan Success'}
                </span>
              </button>
            </div>

            {/* Bottom Status Text */}
            <div className="p-4 text-center text-xs font-medium text-[#564338] bg-[#fff8f6]/95 border-t border-[#ddc1b3]/40">
              Scanning securely checks cryptographic GPS authenticity...
            </div>
          </div>
        )}

        {/* ================= STEP 2: VERIFICATION FORM ================= */}
        {step === 'form' && (
          <div className="absolute inset-0 flex flex-col bg-[#ffffff] transition-opacity duration-300 z-20 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center p-4 border-b border-[#f2dfd5] sticky top-0 bg-[#ffffff]/95 backdrop-blur-md z-30">
              <button
                id="back-to-scanner-btn"
                onClick={() => setStep('scanner')}
                className="text-[#231914] hover:text-[#974400] p-2 mr-3 rounded-full hover:bg-[#f2dfd5] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="font-serif text-xl font-bold text-[#231914]">
                  {isFlora ? 'Verify Native Plant / Harvest Origin' : 'Verify & Review'}
                </h2>
                <p className="text-xs text-[#564338]">
                  {artisan.name} • {artisan.artForm}
                </p>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmitVerification} className="p-6 flex flex-col gap-5 flex-grow">
              {/* Artisan Context Card */}
              <div className="flex items-center gap-4 p-3.5 bg-[#feeae0] rounded-xl border border-[#ddc1b3]/40">
                <img
                  src={artisan.avatarUrl}
                  alt={artisan.name}
                  className="w-14 h-14 rounded-full object-cover shadow-sm border border-[#974400]/30"
                />
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-serif text-base font-bold text-[#231914]">
                      {artisan.name}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#006e0c] fill-[#8ff780]" />
                  </div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                      isFlora
                        ? 'bg-[#ebfbee] text-[#006e0c] border border-[#92fa83]'
                        : isAgri
                        ? 'bg-[#f7fff1] text-[#186a22] border border-[#a3f69c]'
                        : 'bg-[#f2dfd5] text-[#564338]'
                    }`}
                  >
                    {artisan.category}
                  </span>
                </div>
              </div>

              {/* GPS Verification Banner */}
              <div className="flex items-center justify-between p-3.5 bg-[#8ff780]/30 text-[#00730d] rounded-xl border border-[#77dd6a]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#006e0c]" />
                  <span className="text-xs font-bold">GPS Location Matched</span>
                </div>
                <span className="text-xs font-semibold bg-white/70 px-2 py-0.5 rounded-md">
                  {artisan.district} (Verified)
                </span>
              </div>

              {/* Contributor Name Field */}
              <div>
                <label className="block text-xs font-semibold text-[#231914] mb-1.5">
                  Your Name / Contributor ID
                </label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-[#fff1eb] border border-[#ddc1b3] focus:border-[#974400] rounded-xl p-3 text-sm text-[#231914] outline-none transition-all"
                  required
                />
              </div>

              {/* Photo Evidence Upload Area */}
              <div>
                <label className="block text-xs font-semibold text-[#231914] mb-1.5">
                  {isFlora ? 'Add Botanical Specimen / Habitat Photo' : 'Add Photo Evidence'}
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoSelect}
                  accept="image/*"
                  className="hidden"
                />
                <div
                  id="photo-upload-zone"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#ddc1b3] hover:border-[#974400] transition-colors rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer bg-[#fff1eb] text-center"
                >
                  {photoPreview ? (
                    <div className="relative w-full h-32 rounded-lg overflow-hidden">
                      <img
                        src={photoPreview}
                        alt="Evidence preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-xs font-medium">
                        Click to change photo
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-[#8a7266] mb-2" />
                      <span className="text-xs font-medium text-[#564338]">
                        {isFlora
                          ? 'Tap to upload a photo of the botanical specimen / harvest'
                          : 'Tap to upload a photo of the craft'}
                      </span>
                      <span className="text-[10px] text-[#8a7266] mt-1">
                        PNG, JPG or Camera snapshot
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Authenticity Rating (5 Stars) */}
              <div>
                <label className="block text-xs font-semibold text-[#231914] mb-2">
                  {isFlora ? 'Rate Botanical Purity & Conservation Quality' : 'Rate Authenticity & Quality'}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer text-[#974400]"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          (hoverRating || rating) >= star
                            ? 'fill-[#bb5808] text-[#974400]'
                            : 'text-[#ddc1b3]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-xs font-bold text-[#974400] self-center">
                    {rating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Buyer / Contributor Story Input */}
              <div>
                <label className="block text-xs font-semibold text-[#231914] mb-1.5">
                  {isFlora ? 'Botanical & Ecological Observation Log' : 'Buyer Story'}
                </label>
                <textarea
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="w-full bg-[#fff1eb] border border-[#ddc1b3] focus:border-[#974400] rounded-xl p-3 text-sm text-[#231914] placeholder-[#564338]/60 focus:ring-1 focus:ring-[#974400] outline-none transition-all"
                  placeholder={
                    isFlora
                      ? 'Describe the native species, forest harvesting context, habitat observations, and traditional botanical usage...'
                      : 'Describe the piece, the natural pigments used, and your experience with the artisan...'
                  }
                  rows={3}
                />
              </div>

              {/* Sticky Footer Action */}
              <div className="mt-auto pt-2 pb-2">
                <button
                  type="submit"
                  id="publish-verification-btn"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#974400] text-white rounded-full font-sans text-sm font-semibold shadow-md hover:bg-[#bb5808] transition-all hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Verifying and Cryptographically Signing...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>
                        {isFlora ? 'Publish Botanical Verification' : 'Publish Verification'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= STEP 3: SUCCESS STATE ================= */}
        {step === 'success' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#ffffff] transition-opacity duration-300 z-30 p-8 text-center animate-in zoom-in-95">
            {/* Green Circular Badge */}
            <div className="w-24 h-24 bg-[#8ff780]/40 rounded-full flex items-center justify-center mb-6 shadow-inner border border-[#77dd6a]">
              <CheckCircle2 className="w-14 h-14 text-[#00730d] fill-[#8ff780]" />
            </div>

            <h3 className="font-serif text-3xl font-bold text-[#231914] mb-2">
              Verified!
            </h3>

            <p className="text-sm text-[#564338] max-w-sm mb-8 leading-relaxed">
              {isFlora
                ? `Your contribution helps safeguard ${artisan.name}'s botanical conservation, records specimen GPS proof on the blockchain ledger, and strengthens ecological trust.`
                : `Your contribution helps preserve ${artisan.name}'s heritage, authenticates the craft on the blockchain ledger, and builds buyer trust.`}
            </p>

            <div className="w-full max-w-xs space-y-3">
              <button
                id="success-view-creator-profile-btn"
                onClick={() => {
                  onNavigateToProfile();
                  handleReset();
                }}
                className="w-full py-3 border border-[#974400] text-[#974400] rounded-full font-sans text-sm font-semibold hover:bg-[#fff1eb] transition-colors cursor-pointer"
              >
                View Profile
              </button>
              <button
                id="success-return-to-map-btn"
                onClick={() => {
                  onNavigateToMap();
                  handleReset();
                }}
                className="w-full py-3 bg-[#feeae0] text-[#231914] rounded-full font-sans text-sm font-semibold hover:bg-[#f2dfd5] transition-colors cursor-pointer"
              >
                Return to Map
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

