import React, { useState, useRef } from 'react';
import { Artisan } from '../types';
import { X, Check, Copy, Download, Share2, MapPin, CheckCircle2, QrCode } from 'lucide-react';

interface DigitalPostcardModalProps {
  artisan: Artisan;
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalPostcardModal: React.FC<DigitalPostcardModalProps> = ({
  artisan,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const postcardCardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const isFlora = artisan.category === 'Indigenous Flora';
  const isAgri = artisan.category === 'Agriculture';

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      isFlora
        ? `Check out verified botanical steward ${artisan.name} (${artisan.craftTitle}) on Geo-Origin! Preserving rare native flora in ${artisan.locationName}. Explore: ${window.location.href}`
        : isAgri
        ? `Check out verified heirloom farmer ${artisan.name} (${artisan.craftTitle}) on Geo-Origin! Preserving ancestral seeds in ${artisan.locationName}. Explore: ${window.location.href}`
        : `Check out verified artisan ${artisan.name} (${artisan.craftTitle}) on Geo-Origin! Preserving authentic heritage in ${artisan.locationName}. Explore: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    setShareFeedback('Opened WhatsApp sharing dialog');
    setTimeout(() => setShareFeedback(null), 3000);
  };

  const handleShareInstagram = () => {
    // Copy postcard text and alert user
    const text = isFlora
      ? `Verified Native Flora Custodian: ${artisan.name} • ${artisan.artForm} from ${artisan.locationName} #GeoOrigin #BotanicalHeritage #NativeFlora #Jharkhand`
      : isAgri
      ? `Verified Heirloom Farmer: ${artisan.name} • ${artisan.artForm} from ${artisan.locationName} #GeoOrigin #AgroBiodiversity #HeirloomSeeds`
      : `Verified Heritage Artisan: ${artisan.name} • ${artisan.artForm} from ${artisan.locationName} #GeoOrigin #HeritageArt #Virasat`;
    navigator.clipboard.writeText(text);
    setShareFeedback('Postcard caption copied! Ready to paste on Instagram.');
    setTimeout(() => setShareFeedback(null), 3500);
  };

  const handleDownloadPostcard = () => {
    setDownloading(true);
    // Render postcard to canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setDownloading(false);
      return;
    }

    const bgImg = new Image();
    bgImg.crossOrigin = 'anonymous';
    bgImg.src = artisan.postcardImageUrl;

    bgImg.onload = () => {
      // Draw background image
      ctx.drawImage(bgImg, 0, 0, 1080, 1920);

      // Dark gradient overlay from bottom
      const gradient = ctx.createLinearGradient(0, 800, 0, 1920);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.6)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1080, 1920);

      // Top badge: Verified Origin
      ctx.fillStyle = isFlora ? 'rgba(0, 110, 12, 0.9)' : 'rgba(24, 106, 34, 0.9)';
      ctx.beginPath();
      ctx.roundRect(80, 100, 420, 70, 35);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px Inter, sans-serif';
      ctx.fillText(
        isFlora ? '🌿 Verified Botanical Origin' : '✓ Verified Origin',
        110,
        148
      );

      // Artisan Name & Location
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 84px Playfair Display, serif';
      ctx.fillText(artisan.name, 80, 1600);

      ctx.fillStyle = '#f8e4db';
      ctx.font = '42px Inter, sans-serif';
      ctx.fillText(`📍 ${artisan.locationName}`, 80, 1680);

      // Brand mark
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = 'bold 32px Inter, sans-serif';
      ctx.fillText('Geo-Origin • Digital Heritage Registry', 80, 1780);

      // Convert to download
      const link = document.createElement('a');
      link.download = `${artisan.id}-geo-origin-postcard.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setDownloading(false);
      setShareFeedback('Digital Postcard downloaded successfully!');
      setTimeout(() => setShareFeedback(null), 3000);
    };

    bgImg.onerror = () => {
      // Fallback simple download
      const link = document.createElement('a');
      link.download = `${artisan.id}-geo-origin-postcard.png`;
      link.href = artisan.postcardImageUrl;
      link.click();
      setDownloading(false);
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3a2e28]/70 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="bg-[#ffffff] rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl max-h-[90vh] overflow-y-auto md:overflow-hidden relative border border-[#ddc1b3]/40">
        {/* Close Button */}
        <button
          id="close-postcard-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-[#564338] hover:text-[#231914] transition-colors p-2 rounded-full hover:bg-[#f2dfd5]/80 active:scale-95 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Digital Postcard Preview (9:16) */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex justify-center items-center bg-[#fff1eb] border-b md:border-b-0 md:border-r border-[#ddc1b3]/30">
          <div
            ref={postcardCardRef}
            className="relative w-[280px] h-[490px] rounded-xl overflow-hidden shadow-2xl group transition-transform duration-500 hover:scale-[1.02] border border-[#ddc1b3]/50"
          >
            {/* Background Image */}
            <img
              src={artisan.postcardImageUrl}
              alt={artisan.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 postcard-gradient" />

            {/* Postcard Floating UI Elements */}
            <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
              {/* Header Badge */}
              <div
                className={`self-start text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md backdrop-blur-md text-xs font-semibold ${
                  isFlora ? 'bg-[#006e0c]/90' : 'bg-[#186a22]/90'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#92fa83]" />
                <span>{isFlora ? 'Verified Flora Origin' : 'Verified Origin'}</span>
              </div>

              {/* Bottom Postcard Content */}
              <div>
                {/* Artisan Info */}
                <div className="mb-4">
                  <h2 className="font-serif text-3xl font-bold mb-1 drop-shadow-md text-white">
                    {artisan.name}
                  </h2>
                  <div className="flex items-center gap-1 text-white/90 text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#ffdbc9]" />
                    <span>{artisan.locationName}</span>
                  </div>
                </div>

                {/* Footer Area: Map Snippet & QR Code */}
                <div className="flex justify-between items-end gap-2.5">
                  {/* Small Map Snippet */}
                  <div className="bg-white/20 backdrop-blur-md rounded-lg p-1 flex-1 h-[64px] border border-white/30 flex items-center justify-center overflow-hidden relative">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdCdOF7LyA8EQYrELazXvgeuxmUxE2LXeeuCpoZkPcwmnA9Kgcvqi_JWkLeMQ8V0VkBS_8JGQJzESIjqiGQvDbMCVgcAd4LVv7OfskGFg2adkmG771rzNvLJZfx69HIjzpToXHRZGwQg4iUolurTf4Bs7sNoQLuAowvY5y7PsTRdRa7o0Bcufij68xIpggFVkjFtbiwr2IxdJdKGKBUtx_xN88fFg9KWKKIHWtZ4XT8LjxY4sZzZY"
                      alt="Map location snippet"
                      className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                    <MapPin className="w-5 h-5 text-[#974400] relative z-10 drop-shadow-sm" />
                  </div>

                  {/* QR Code */}
                  <div className="bg-white p-1.5 rounded-lg shadow-md w-[64px] h-[64px] flex-shrink-0 flex items-center justify-center border border-white/50">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv7tj5w5kpBvR3qujzxAeWfouGpf_fhrBaxHNku49JjZITjELvVwmNuFo09KxYf_D-RbMRAlKHMZs0iRwPcQPTaf1LMtdNNcJnkJg_Ht3TtTri9lHazCNABNYvZrZ96xSchQ6QsEhdA1rgwx4gj1vEY39hz-qZsuSSuXJ08b1_YF1rAGDQVNf0TkqbkupgcJRdWM01d_UP0MyLj91arAaePL8boP0es7YlJaTHzvEycK4quNCJ6WU"
                      alt="Scannable QR code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Sharing Actions Panel */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#231914] mb-2">
              {isFlora ? 'Share this Botanical Heritage' : isAgri ? 'Share this Agrarian Heritage' : 'Share this Postcard'}
            </h3>
            <p className="text-sm text-[#564338] leading-relaxed">
              {isFlora
                ? `Help ${artisan.name} reach conscious herbalists, researchers, and botanical patrons! Share her native flora stewardship with your network and connect directly to verified roots.`
                : isAgri
                ? `Help ${artisan.name} reach organic grain and heirloom seed networks! Share his verified agrarian stewardship with your network.`
                : `Help ${artisan.name} reach a wider market! Share her authentic heritage craft with your network and connect buyers directly to verified roots.`}
            </p>
          </div>

          {/* Feedback Toast */}
          {shareFeedback && (
            <div className="mb-4 py-2 px-3 bg-[#f7fff1] text-[#186a22] border border-[#a3f69c] rounded-lg text-xs font-semibold flex items-center gap-1.5 animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>{shareFeedback}</span>
            </div>
          )}

          <div className="space-y-3.5 flex-grow flex flex-col justify-center">
            {/* Primary Social Buttons */}
            <button
              id="share-instagram-btn"
              onClick={handleShareInstagram}
              className="w-full instagram-gradient text-white font-sans text-sm font-semibold py-3.5 px-5 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Share2 className="w-5 h-5" />
              <span>Share to Instagram</span>
            </button>

            <button
              id="share-whatsapp-btn"
              onClick={handleShareWhatsApp}
              className="w-full whatsapp-green text-white font-sans text-sm font-semibold py-3.5 px-5 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <span className="font-bold text-base">💬</span>
              <span>Share to WhatsApp</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-2">
              <div className="h-px bg-[#ddc1b3] flex-1" />
              <span className="text-xs font-semibold text-[#8a7266]">OR</span>
              <div className="h-px bg-[#ddc1b3] flex-1" />
            </div>

            {/* Secondary Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                id="copy-postcard-link-btn"
                onClick={handleCopyLink}
                className="flex flex-col items-center justify-center gap-1.5 py-3 px-4 rounded-xl border border-[#ddc1b3] text-[#564338] hover:bg-[#fff1eb] hover:text-[#974400] hover:border-[#974400]/40 active:scale-95 transition-all cursor-pointer"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-[#006e0c]" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
                <span className="text-xs font-semibold">
                  {copied ? 'Copied!' : 'Copy Link'}
                </span>
              </button>

              <button
                id="download-postcard-btn"
                onClick={handleDownloadPostcard}
                disabled={downloading}
                className="flex flex-col items-center justify-center gap-1.5 py-3 px-4 rounded-xl border border-[#ddc1b3] text-[#564338] hover:bg-[#fff1eb] hover:text-[#974400] hover:border-[#974400]/40 active:scale-95 transition-all cursor-pointer"
              >
                <Download
                  className={`w-5 h-5 ${downloading ? 'animate-bounce' : ''}`}
                />
                <span className="text-xs font-semibold">
                  {downloading ? 'Saving...' : 'Download'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
