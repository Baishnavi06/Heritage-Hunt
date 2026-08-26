import React, { useState } from 'react';
import { Artisan } from '../types';
import { X, Phone, Mail, Building2, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface ContactArtisanModalProps {
  artisan: Artisan;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactArtisanModal: React.FC<ContactArtisanModalProps> = ({
  artisan,
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3a2e28]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-[#ddc1b3]/40 relative p-6 sm:p-8">
        <button
          id="close-contact-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#564338] hover:text-[#231914] p-2 rounded-full hover:bg-[#f2dfd5]/60 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#8ff780]/40 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#77dd6a]">
              <CheckCircle2 className="w-10 h-10 text-[#006e0c]" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#231914] mb-2">
              Inquiry Sent!
            </h3>
            <p className="text-sm text-[#564338]">
              Your inquiry has been relayed directly to {artisan.name}'s artisan
              collective coordinator. They will reach back to you shortly.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-bold text-[#974400] uppercase tracking-wider block mb-1">
                Direct Collective Patronage
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231914]">
                Contact {artisan.name}
              </h3>
              <p className="text-xs text-[#564338] mt-1">
                Zero middleman commissions. 100% of fair-trade value goes directly to rural artisans.
              </p>
            </div>

            {/* Cooperative Info Box */}
            <div className="bg-[#fff1eb] p-4 rounded-xl border border-[#ddc1b3]/40 space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-[#231914]">
                <Building2 className="w-4 h-4 text-[#974400] shrink-0" />
                <span className="font-semibold">{artisan.contactInfo?.cooperative}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#564338]">
                <MapPin className="w-4 h-4 text-[#974400] shrink-0" />
                <span>{artisan.contactInfo?.address}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#564338]">
                <Phone className="w-4 h-4 text-[#006e0c] shrink-0" />
                <span>Verified Hotline: {artisan.contactInfo?.phone}</span>
              </div>
            </div>

            {/* Inquiry Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#231914] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priyanshi Mehta"
                  className="w-full bg-[#fff8f6] border border-[#ddc1b3] focus:border-[#974400] rounded-xl p-3 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231914] mb-1">
                  Email Address / Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com or WhatsApp number"
                  className="w-full bg-[#fff8f6] border border-[#ddc1b3] focus:border-[#974400] rounded-xl p-3 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231914] mb-1">
                  Commission / In-Person Visit Inquiry
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder={`Hi ${artisan.name}, I would love to inquire about commissioning an authentic piece or arranging a studio visit...`}
                  className="w-full bg-[#fff8f6] border border-[#ddc1b3] focus:border-[#974400] rounded-xl p-3 text-sm outline-none"
                />
              </div>

              <button
                type="submit"
                id="send-artisan-inquiry-btn"
                className="w-full bg-[#974400] text-white py-3.5 rounded-full font-sans text-sm font-semibold hover:bg-[#bb5808] transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Direct Inquiry</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
