import React, { useState, useRef } from 'react';
import { Artisan, LocalEvent } from '../types';
import {
  Camera,
  CheckCircle2,
  MapPin,
  Upload,
  Phone,
  User,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
  Check,
  Trees,
  Palette,
  Sprout,
  LocateFixed,
  Radio,
  Calendar,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ArtisanRegisterViewProps {
  onRegisterSuccess: (newArtisan: Artisan) => void;
  onExploreMap: () => void;
  onViewCreators: () => void;
  onBroadcastExhibition?: (event: LocalEvent) => void;
}

export const ArtisanRegisterView: React.FC<ArtisanRegisterViewProps> = ({
  onRegisterSuccess,
  onExploreMap,
  onViewCreators,
  onBroadcastExhibition,
}) => {
  const [language, setLanguage] = useState<'EN' | 'HI'>('HI'); // Default to Hindi for rural accessibility
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [fullName, setFullName] = useState('');
  const [category, setCategory] = useState<'Heritage Arts' | 'Agriculture' | 'Indigenous Flora'>('Heritage Arts');
  const [district, setDistrict] = useState('Hazaribagh');
  const [craftTitle, setCraftTitle] = useState('');
  const [craftDescription, setCraftDescription] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // 🌟 Step 3: Upcoming Exhibitions (Optional) state
  const [marketName, setMarketName] = useState('');
  const [exhibitionDates, setExhibitionDates] = useState('');
  const [isLocationPinned, setIsLocationPinned] = useState(false);
  const [pinnedCoordinates, setPinnedCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [broadcastToRadar, setBroadcastToRadar] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredArtisan, setRegisteredArtisan] = useState<Artisan | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Content translations
  const t = {
    EN: {
      badge: 'Artisan Self-Registration Portal',
      title: 'Join the Heritage Hunt Map',
      subtitle: 'Register your authentic craft, heirloom crops, or wild botanicals. Connect directly with buyers and scouts across India.',
      step1: 'Step 1: Mobile Verification',
      phoneLabel: 'Mobile Phone Number',
      phonePlaceholder: 'Enter 10-digit mobile number',
      sendOtp: 'Send OTP',
      otpSentMsg: 'OTP sent to mobile (Use 1234 to verify)',
      otpLabel: 'Enter 4-Digit OTP',
      verifyOtp: 'Verify OTP',
      otpVerifiedMsg: 'Phone Number Verified ✓',
      step2: 'Step 2: Creator & Craft Details',
      nameLabel: 'Your Full Name',
      namePlaceholder: 'e.g. Birsa Murmu',
      categoryLabel: 'Category of Work',
      catArts: 'Handicraft & Heritage Arts (हस्तशिल्प)',
      catAgri: 'Traditional Agriculture & Heirloom Seeds (पारंपरिक कृषि)',
      catFlora: 'Rare Native Flora & Forest Botanicals (देशज वनस्पति)',
      districtLabel: 'District / Village Cluster',
      craftTitleLabel: 'Title of Your Craft / Produce',
      craftTitlePlaceholder: 'e.g. Master Sohrai Painter or Organic Black Rice Cultivator',
      descLabel: 'Brief Story / Technique Description',
      descPlaceholder: 'Tell us about your natural materials, ancestral methods, or seed preservation...',
      photoLabel: 'Upload Photo of Your Craft / Produce / Studio',
      photoPrompt: 'Tap here to capture or upload a photo',
      photoNote: 'Clear photo of your handmade creation, farm, or workshop',
      changePhoto: 'Tap to change photo',

      // Step 3 translations
      step3: 'Upcoming Exhibitions & Local Fairs',
      optionalBadge: 'Optional Section',
      step3Subtitle: 'Broadcast where you will be exhibiting or selling this week so nearby buyers and scouts can visit your stall.',
      marketNameLabel: 'Market / Fair Name',
      marketNamePlaceholder: 'e.g. Ranchi Saras Shilp Mela, Sohrai Harvest Haat',
      datesLabel: 'Exhibition Dates / Schedule',
      datesPlaceholder: 'e.g. This Weekend (Nov 14-16) or Every Sunday (8 AM - 4 PM)',
      pinLocationBtn: 'Pin Location',
      pinningMsg: 'Pinning GPS location...',
      locationPinnedMsg: 'Stall Location Pinned (GPS: 23.38°N, 85.33°E) ✓',
      broadcastLabel: 'Broadcast my stall location on the live Local Event Radar map this week',

      submitBtn: 'Submit Registration & Join Map',
      submitting: 'Registering on Heritage Registry...',
      successTitle: 'Registration Successful!',
      successMsg: 'You are now a registered creator on Heritage Hunt! Your digital passport has been created.',
      viewOnMap: 'View Your Profile on Map',
      viewAllCreators: 'Explore Creators Directory',
    },
    HI: {
      badge: 'कारीगर एवं किसान स्व-पंजीकरण पोर्टल',
      title: 'हेरिटेज हंट मानचित्र में शामिल हों',
      subtitle: 'अपनी पारंपरिक कला, देसी बीज, या औषधीय पौधों को दर्ज करें। देश भर के खरीदारों से सीधे जुड़ें।',
      step1: 'चरण 1: मोबाइल सत्यापन (OTP)',
      phoneLabel: 'मोबाइल फोन नंबर',
      phonePlaceholder: '10 अंकों का मोबाइल नंबर दर्ज करें',
      sendOtp: 'OTP भेजें',
      otpSentMsg: 'OTP भेजा गया (सत्यापन के लिए 1234 डालें)',
      otpLabel: '4-अंकों का OTP दर्ज करें',
      verifyOtp: 'OTP सत्यापित करें',
      otpVerifiedMsg: 'मोबाइल नंबर सत्यापित हो गया ✓',
      step2: 'चरण 2: आपकी कला और जानकारी',
      nameLabel: 'आपका पूरा नाम',
      namePlaceholder: 'उदा. बिरसा मुर्मू या सुमित्रा देवी',
      categoryLabel: 'कार्य की श्रेणी चुनें',
      catArts: 'हस्तशिल्प एवं पारंपरिक कला (Handicraft & Arts)',
      catAgri: 'पारंपरिक कृषि एवं देसी बीज (Heirloom Seeds)',
      catFlora: 'देशज वनस्पति एवं औषधीय पौधे (Native Flora)',
      districtLabel: 'ज़िला / गाँव क्षेत्र',
      craftTitleLabel: 'आपकी कला / उपज का नाम',
      craftTitlePlaceholder: 'उदा. सोहराई चित्रकार या देशी मड़ुआ/गोंदली उत्पादक',
      descLabel: 'कला / उपज का संक्षिप्त विवरण',
      descPlaceholder: 'अपनी प्राकृतिक सामग्री और पारंपरिक तरीकों के बारे में बताएं...',
      photoLabel: 'अपनी कला, खेत या कार्यशाला की फोटो अपलोड करें',
      photoPrompt: 'यहाँ दबाकर फोटो खींचे या चुनें',
      photoNote: 'अपनी हस्तनिर्मित वस्तु या खेत की साफ़ फोटो',
      changePhoto: 'फोटो बदलने के लिए दबाएं',

      // Step 3 translations
      step3: 'आगामी प्रदर्शनियाँ एवं मेले',
      optionalBadge: 'वैकल्पिक खंड (Optional)',
      step3Subtitle: 'प्रसारित करें कि इस सप्ताह आप अपनी कला या उपज कहाँ बेच रहे हैं, ताकि खरीदार सीधे आपके स्टॉल पर आ सकें।',
      marketNameLabel: 'बाज़ार / मेले / हाट का नाम',
      marketNamePlaceholder: 'उदा. राँची सरस शिल्प मेला, सोहराई हाट, दीवाली प्रदर्शनी',
      datesLabel: 'मेले / प्रदर्शनी की तारीख व समय',
      datesPlaceholder: 'उदा. इस सप्ताहांत (14-16 नवम्बर) या प्रत्येक रविवार',
      pinLocationBtn: 'दुकान / स्टॉल का स्थान पिन करें',
      pinningMsg: 'स्थान पिन हो रहा है...',
      locationPinnedMsg: 'स्टॉल का सटीक स्थान पिन हो गया (GPS: 23.38°N, 85.33°E) ✓',
      broadcastLabel: 'इस सप्ताह लोकल इवेंट रडार मानचित्र पर मेरी दुकान का स्थान प्रसारित करें',

      submitBtn: 'पंजीकरण पूरा करें और मानचित्र से जुड़ें',
      submitting: 'पंजीकरण हो रहा है...',
      successTitle: 'बधाई हो! पंजीकरण सफल रहा!',
      successMsg: 'अब आप हेरिटेज हंट पर एक सत्यापित निर्माता हैं। आपका डिजिटल पहचान-पत्र बन गया है।',
      viewOnMap: 'मानचित्र पर अपनी प्रोफाइल देखें',
      viewAllCreators: 'सभी कारीगर देखें',
    },
  }[language];

  const handleSendOtp = () => {
    if (phoneNumber.trim().length >= 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = () => {
    if (otp === '1234' || otp.trim().length === 4) {
      setOtpVerified(true);
    }
  };

  const handlePinLocation = () => {
    setIsLocationPinned(true);
    setPinnedCoordinates({
      lat: 23.38 + (Math.random() - 0.5) * 0.1,
      lng: 85.33 + (Math.random() - 0.5) * 0.1,
    });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpVerified) {
      alert(language === 'HI' ? 'कृपया पहले मोबाइल OTP सत्यापित करें' : 'Please verify your phone number via OTP first');
      return;
    }

    setIsSubmitting(true);

    const defaultImg =
      category === 'Heritage Arts'
        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80'
        : category === 'Agriculture'
        ? 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80';

    const newArtisan: Artisan = {
      id: `artisan-${Date.now()}`,
      name: fullName.trim() || (language === 'HI' ? 'कारीगर' : 'Local Artisan'),
      craftTitle: craftTitle.trim() || (category === 'Heritage Arts' ? 'Master Artisan' : 'Traditional Conservator'),
      shortBio: craftDescription.slice(0, 100) || `${fullName} from ${district}, practicing authentic ${category}.`,
      fullBio: craftDescription || `Preserving centuries of authentic ${category} in ${district}, Jharkhand with community-verified methods.`,
      category,
      district,
      state: 'Jharkhand',
      locationName: `${district}, Jharkhand`,
      coordinates: {
        x: Math.floor(Math.random() * 40) + 30,
        y: Math.floor(Math.random() * 40) + 30,
        lat: pinnedCoordinates?.lat || 23.61 + (Math.random() - 0.5) * 1.5,
        lng: pinnedCoordinates?.lng || 85.27 + (Math.random() - 0.5) * 1.5,
      },
      trustScore: 98,
      trustRating: 4.9,
      verifiedVisits: 1,
      contributionsCount: 1,
      avatarUrl: photoPreview || defaultImg,
      heroImageUrl: photoPreview || defaultImg,
      postcardImageUrl: photoPreview || defaultImg,
      artForm: craftTitle || category,
      artDescription: craftDescription || `Authentic ${category} from ${district}.`,
      tags: [district, category, 'Self-Registered', 'Heritage Hunt Verified'],
      gallery: [
        {
          id: `gal-${Date.now()}`,
          url: photoPreview || defaultImg,
          caption: `${fullName} - ${craftTitle}`,
          author: fullName,
          span: 'col-span-2 row-span-2',
        },
      ],
      reviews: [
        {
          id: `rev-${Date.now()}`,
          author: 'Heritage Hunt Registry',
          date: 'Just now',
          rating: 5,
          text: `Self-registered through the rural artisan portal from ${district}. Mobile and GPS verification complete.`,
          verifiedGps: `${district}, Jharkhand (Verified Phone Registration)`,
        },
      ],
      contactInfo: {
        phone: phoneNumber ? `+91 ${phoneNumber}` : '+91 94311 00000',
        cooperative: `${district} Rural Producers Guild`,
        address: `${district} District, Jharkhand`,
      },
    };

    // If artisan broadcasted an upcoming exhibition, create an event on the radar
    if (marketName.trim() && broadcastToRadar && onBroadcastExhibition) {
      const exhibitionEvent: LocalEvent = {
        id: `artisan-event-${Date.now()}`,
        name: marketName.trim(),
        category: category === 'Heritage Arts' ? 'Tribal Craft Mela' : 'Agrarian Haat',
        district,
        state: 'Jharkhand',
        venue: isLocationPinned ? `Stall #${Math.floor(Math.random() * 30) + 1}, ${marketName}, ${district}` : `${marketName}, ${district}`,
        dates: exhibitionDates.trim() || 'This Week',
        description: `Exhibition stall by registered master creator ${fullName}, presenting authentic ${craftTitle} directly from ${district}.`,
        coordinates: {
          x: Math.floor(Math.random() * 40) + 30,
          y: Math.floor(Math.random() * 40) + 30,
          lat: pinnedCoordinates?.lat || 23.38,
          lng: pinnedCoordinates?.lng || 85.33,
        },
        featuredCrafts: [craftTitle, category],
        organizer: `${fullName} (Artisan Stall)`,
        expectedArtisans: 1,
        status: 'Happening Now',
        reportedBy: `${fullName} (Verified Creator)`,
        pointsReward: 50,
        isVerified: true,
      };
      onBroadcastExhibition(exhibitionEvent);
    }

    setTimeout(() => {
      onRegisterSuccess(newArtisan);
      setRegisteredArtisan(newArtisan);
      setIsSubmitting(false);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#974400', '#186a22', '#ffdbc9', '#92fa83'],
        });
      } catch {}
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 animate-in fade-in duration-300 pb-28 md:pb-16">
      {/* Top Language Toggle Bar */}
      <div className="flex justify-between items-center bg-white p-3 rounded-2xl card-shadow border border-[#ddc1b3]/50 mb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-[#564338]">
          <Globe className="w-4 h-4 text-[#974400]" />
          <span>भाषा चुनें / Select Language:</span>
        </div>

        <div className="flex bg-[#fff1eb] p-1 rounded-xl border border-[#ddc1b3]/40">
          <button
            type="button"
            onClick={() => setLanguage('HI')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              language === 'HI'
                ? 'bg-[#974400] text-white shadow-2xs'
                : 'text-[#564338] hover:text-[#231914]'
            }`}
          >
            हिंदी (Hindi)
          </button>
          <button
            type="button"
            onClick={() => setLanguage('EN')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              language === 'EN'
                ? 'bg-[#974400] text-white shadow-2xs'
                : 'text-[#564338] hover:text-[#231914]'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {registeredArtisan ? (
        /* Registration Confirmation Card */
        <div className="bg-white rounded-3xl p-6 sm:p-10 card-shadow border-2 border-[#186a22] text-center animate-in zoom-in-95">
          <div className="w-20 h-20 bg-[#ebfbee] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#92fa83]">
            <CheckCircle2 className="w-12 h-12 text-[#006e0c] fill-[#8ff780]" />
          </div>

          <span className="text-xs font-bold text-[#186a22] uppercase tracking-wider block mb-1">
            ✓ Heritage Hunt Verified Pass
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231914] mb-2">
            {t.successTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#564338] max-w-lg mx-auto mb-6 leading-relaxed">
            {t.successMsg}
          </p>

          {/* Exhibition Broadcast Confirmation if provided */}
          {marketName && (
            <div className="p-3.5 bg-[#ffe4e6] text-[#e11d48] rounded-2xl border border-[#fecdd3] max-w-md mx-auto mb-6 text-xs font-bold flex items-center justify-center gap-2">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>
                {language === 'HI'
                  ? `आपकी प्रदर्शनी "${marketName}" लाइव इवेंट रडार पर प्रसारित हो गई है!`
                  : `Your exhibition stall at "${marketName}" has been broadcasted to the Local Event Radar!`}
              </span>
            </div>
          )}

          {/* Generated Creator Preview Card */}
          <div className="max-w-md mx-auto bg-[#fff8f6] p-5 rounded-2xl border border-[#ddc1b3] mb-8 text-left flex items-center gap-4">
            <img
              src={registeredArtisan.avatarUrl}
              alt={registeredArtisan.name}
              className="w-20 h-20 rounded-xl object-cover border border-[#974400]/40 shrink-0"
            />
            <div>
              <div className="text-[10px] font-bold uppercase text-[#974400]">
                {registeredArtisan.category}
              </div>
              <h3 className="font-serif font-bold text-xl text-[#231914]">
                {registeredArtisan.name}
              </h3>
              <p className="text-xs text-[#564338]">{registeredArtisan.craftTitle}</p>
              <p className="text-[11px] text-[#8a7266] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#974400]" />
                <span>{registeredArtisan.locationName}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              id="view-registered-on-map-btn"
              onClick={onExploreMap}
              className="bg-[#974400] text-white px-8 py-3.5 rounded-full font-sans text-sm font-bold hover:bg-[#bb5808] transition-all shadow-md active:scale-95 cursor-pointer"
            >
              {t.viewOnMap}
            </button>
            <button
              id="view-all-creators-after-reg-btn"
              onClick={onViewCreators}
              className="bg-[#feeae0] text-[#231914] border border-[#ddc1b3] px-8 py-3.5 rounded-full font-sans text-sm font-bold hover:bg-[#f2dfd5] transition-colors cursor-pointer"
            >
              {t.viewAllCreators}
            </button>
          </div>
        </div>
      ) : (
        /* Main Self-Registration Form */
        <div className="bg-white rounded-3xl p-6 sm:p-10 card-shadow border border-[#ddc1b3]/60">
          {/* Header Banner */}
          <div className="mb-8">
            <div className="inline-block px-3.5 py-1 rounded-full bg-[#186a22]/10 text-[#186a22] text-xs font-bold uppercase tracking-wider mb-2 border border-[#186a22]/20">
              {t.badge}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#231914] mb-2 leading-tight">
              {t.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#564338] leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Mobile Phone & OTP Verification */}
            <div className="p-5 sm:p-6 bg-[#fff8f6] rounded-2xl border-2 border-[#ddc1b3] space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#231914] flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#974400]" />
                <span>{t.step1}</span>
              </h2>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#231914] mb-1.5">
                  {t.phoneLabel} <span className="text-[#974400]">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#564338]">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      disabled={otpVerified}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder={t.phonePlaceholder}
                      className="w-full pl-12 pr-4 py-3 bg-white rounded-xl text-sm sm:text-base font-semibold border-2 border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914] disabled:bg-gray-100"
                    />
                  </div>

                  {!otpVerified && (
                    <button
                      type="button"
                      id="send-otp-btn"
                      onClick={handleSendOtp}
                      className="bg-[#974400] text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold hover:bg-[#bb5808] transition-all cursor-pointer shrink-0"
                    >
                      {otpSent ? 'OTP Resend' : t.sendOtp}
                    </button>
                  )}
                </div>

                {otpSent && !otpVerified && (
                  <p className="text-xs text-[#186a22] font-semibold mt-2">
                    {t.otpSentMsg}
                  </p>
                )}
              </div>

              {/* OTP Input Field */}
              {otpSent && !otpVerified && (
                <div className="pt-2 flex flex-col sm:flex-row gap-2.5 items-start sm:items-end">
                  <div className="w-full sm:w-48">
                    <label className="block text-xs font-bold text-[#231914] mb-1">
                      {t.otpLabel}
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="1234"
                      className="w-full text-center tracking-widest text-lg font-bold py-2.5 bg-white rounded-xl border-2 border-[#974400] outline-none text-[#231914]"
                    />
                  </div>

                  <button
                    type="button"
                    id="verify-otp-btn"
                    onClick={handleVerifyOtp}
                    className="w-full sm:w-auto bg-[#186a22] text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold hover:bg-[#13541b] transition-all cursor-pointer"
                  >
                    {t.verifyOtp}
                  </button>
                </div>
              )}

              {otpVerified && (
                <div className="p-3 bg-[#ebfbee] text-[#006e0c] rounded-xl border border-[#92fa83] text-xs sm:text-sm font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#006e0c]" />
                  <span>{t.otpVerifiedMsg}</span>
                </div>
              )}
            </div>

            {/* Step 2: Artisan Name & Category Details */}
            <div className="space-y-5">
              <h2 className="font-serif text-lg font-bold text-[#231914] flex items-center gap-2">
                <User className="w-5 h-5 text-[#974400]" />
                <span>{t.step2}</span>
              </h2>

              {/* Name Field */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#231914] mb-1.5">
                  {t.nameLabel} <span className="text-[#974400]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full px-4 py-3 bg-[#fff8f6] rounded-xl text-sm sm:text-base font-semibold border border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                />
              </div>

              {/* Category Radio Grid */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#231914] mb-2">
                  {t.categoryLabel} <span className="text-[#974400]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setCategory('Heritage Arts')}
                    className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                      category === 'Heritage Arts'
                        ? 'border-[#974400] bg-[#fff1eb] shadow-sm'
                        : 'border-[#ddc1b3] bg-white hover:bg-[#fff8f6]'
                    }`}
                  >
                    <Palette className="w-6 h-6 text-[#974400]" />
                    <span className="text-xs sm:text-sm font-bold text-[#231914]">
                      {t.catArts}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory('Agriculture')}
                    className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                      category === 'Agriculture'
                        ? 'border-[#186a22] bg-[#f7fff1] shadow-sm'
                        : 'border-[#ddc1b3] bg-white hover:bg-[#fff8f6]'
                    }`}
                  >
                    <Trees className="w-6 h-6 text-[#186a22]" />
                    <span className="text-xs sm:text-sm font-bold text-[#231914]">
                      {t.catAgri}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory('Indigenous Flora')}
                    className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                      category === 'Indigenous Flora'
                        ? 'border-[#006e0c] bg-[#ebfbee] shadow-sm'
                        : 'border-[#ddc1b3] bg-white hover:bg-[#fff8f6]'
                    }`}
                  >
                    <Sprout className="w-6 h-6 text-[#006e0c]" />
                    <span className="text-xs sm:text-sm font-bold text-[#231914]">
                      {t.catFlora}
                    </span>
                  </button>
                </div>
              </div>

              {/* District & Location */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#231914] mb-1.5">
                  {t.districtLabel} <span className="text-[#974400]">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-4 py-3 bg-[#fff8f6] rounded-xl text-sm sm:text-base font-semibold border border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914] cursor-pointer"
                  >
                    <option value="Hazaribagh">Hazaribagh (हज़ारीबाग)</option>
                    <option value="Khunti">Khunti (खूंटी)</option>
                    <option value="Dumka">Dumka (दुमका)</option>
                    <option value="Latehar">Latehar - Netarhat (लातेहार)</option>
                    <option value="Gumla">Gumla (गुमला)</option>
                    <option value="Saraikela-Kharsawan">Saraikela (सरायकेला)</option>
                    <option value="Ranchi">Ranchi (राँची)</option>
                    <option value="West Singhbhum">West Singhbhum (पश्चिमी सिंहभूम)</option>
                  </select>
                </div>
              </div>

              {/* Craft Title */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#231914] mb-1.5">
                  {t.craftTitleLabel} <span className="text-[#974400]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={craftTitle}
                  onChange={(e) => setCraftTitle(e.target.value)}
                  placeholder={t.craftTitlePlaceholder}
                  className="w-full px-4 py-3 bg-[#fff8f6] rounded-xl text-sm sm:text-base font-semibold border border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#231914] mb-1.5">
                  {t.descLabel}
                </label>
                <textarea
                  value={craftDescription}
                  onChange={(e) => setCraftDescription(e.target.value)}
                  placeholder={t.descPlaceholder}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#fff8f6] rounded-xl text-sm font-medium border border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                />
              </div>

              {/* Large Photo Upload Zone */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#231914] mb-2">
                  {t.photoLabel}
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoSelect}
                  accept="image/*"
                  className="hidden"
                />
                <div
                  id="artisan-photo-dropzone"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-3 border-dashed border-[#ddc1b3] hover:border-[#974400] transition-colors rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer bg-[#fff8f6] text-center"
                >
                  {photoPreview ? (
                    <div className="relative w-full max-w-sm h-48 rounded-xl overflow-hidden shadow-md">
                      <img
                        src={photoPreview}
                        alt="Artisan upload preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-bold">
                        {t.changePhoto}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-[#feeae0] text-[#974400] flex items-center justify-center mb-3">
                        <Camera className="w-8 h-8" />
                      </div>
                      <span className="text-sm sm:text-base font-bold text-[#231914]">
                        {t.photoPrompt}
                      </span>
                      <span className="text-xs text-[#564338] mt-1">
                        {t.photoNote}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* ================= 🌟 STEP 3: UPCOMING EXHIBITIONS (OPTIONAL SECTION) ================= */}
            <div className="p-5 sm:p-6 bg-gradient-to-br from-[#fff8f6] to-[#ffe4e6]/30 rounded-2xl border-2 border-[#ddc1b3] space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="font-serif text-lg font-bold text-[#231914] flex items-center gap-2">
                  <Radio className="w-5 h-5 text-[#e11d48] animate-pulse" />
                  <span>{t.step3}</span>
                </h2>
                <span className="px-3 py-0.5 rounded-full bg-[#ffe4e6] text-[#e11d48] text-[11px] font-bold border border-[#fecdd3]">
                  {t.optionalBadge}
                </span>
              </div>

              <p className="text-xs text-[#564338] leading-relaxed">
                {t.step3Subtitle}
              </p>

              {/* Market/Fair Name Input */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#231914] mb-1.5">
                  {t.marketNameLabel}
                </label>
                <input
                  type="text"
                  value={marketName}
                  onChange={(e) => setMarketName(e.target.value)}
                  placeholder={t.marketNamePlaceholder}
                  className="w-full px-4 py-3 bg-white rounded-xl text-sm font-semibold border border-[#ddc1b3] focus:border-[#e11d48] outline-none text-[#231914]"
                />
              </div>

              {/* Exhibition Dates / Timing */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#231914] mb-1.5">
                  {t.datesLabel}
                </label>
                <input
                  type="text"
                  value={exhibitionDates}
                  onChange={(e) => setExhibitionDates(e.target.value)}
                  placeholder={t.datesPlaceholder}
                  className="w-full px-4 py-3 bg-white rounded-xl text-sm font-semibold border border-[#ddc1b3] focus:border-[#e11d48] outline-none text-[#231914]"
                />
              </div>

              {/* Pin Location Button & GPS Tag */}
              <div className="pt-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <button
                    type="button"
                    id="artisan-pin-location-btn"
                    onClick={handlePinLocation}
                    className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                      isLocationPinned
                        ? 'bg-[#186a22] text-white hover:bg-[#13541b]'
                        : 'bg-[#974400] text-white hover:bg-[#bb5808]'
                    }`}
                  >
                    <LocateFixed className={`w-4 h-4 ${isLocationPinned ? '' : 'animate-pulse'}`} />
                    <span>{isLocationPinned ? '✓ Re-Pin Stall Location' : t.pinLocationBtn}</span>
                  </button>

                  {isLocationPinned && (
                    <div className="p-2.5 bg-[#ebfbee] text-[#006e0c] rounded-xl border border-[#92fa83] text-xs font-bold flex items-center gap-2 animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4 text-[#006e0c]" />
                      <span>{t.locationPinnedMsg}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Broadcast Checkbox */}
              {marketName && (
                <label className="flex items-center gap-2.5 pt-2 cursor-pointer text-xs sm:text-sm text-[#231914] font-semibold">
                  <input
                    type="checkbox"
                    checked={broadcastToRadar}
                    onChange={(e) => setBroadcastToRadar(e.target.checked)}
                    className="w-4 h-4 accent-[#e11d48] rounded cursor-pointer"
                  />
                  <span>{t.broadcastLabel}</span>
                </label>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                id="submit-artisan-registration-btn"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#974400] hover:bg-[#bb5808] text-white rounded-full font-sans text-base sm:text-lg font-bold shadow-lg transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>{t.submitting}</span>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>{t.submitBtn}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
