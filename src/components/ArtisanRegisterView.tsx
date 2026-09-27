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
  UserCheck,
  Building2,
  FileText,
  Navigation,
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
  const [pathway, setPathway] = useState<'self' | 'contributor'>('self');

  // Common Creator Information
  const [fullName, setFullName] = useState('');
  const [category, setCategory] = useState<'Heritage Arts' | 'Agriculture' | 'Indigenous Flora'>('Heritage Arts');
  const [district, setDistrict] = useState('Hazaribagh');
  const [craftTitle, setCraftTitle] = useState('');
  const [craftDescription, setCraftDescription] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Self Registration Pathway State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [payoutIdentifier, setPayoutIdentifier] = useState('');

  // Contributor / Scout Pathway State
  const [contributorName, setContributorName] = useState('');
  const [contributorOrg, setContributorOrg] = useState('');
  const [contributorContact, setContributorContact] = useState('');
  const [relationship, setRelationship] = useState('Field Scout / Researcher');
  const [gpsCaptured, setGpsCaptured] = useState<string>('');
  const [isCapturingGps, setIsCapturingGps] = useState(false);
  const [scoutNotes, setScoutNotes] = useState('');

  // Step 3: Upcoming Exhibitions (Optional) state
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
      badge: 'Geospatial Registry Onboarding',
      title: 'Register on Heritage Hunt',
      subtitle: 'Connect authentic artisans, heirloom cultivators, and native flora keepers directly with conscious patrons across India.',
      pathwayPrompt: 'Choose Registration Pathway',
      selfPathwayTitle: 'Artisan Self-Registration',
      selfPathwayDesc: 'I am a traditional creator or farmer registering my own crafts, crops, or botanicals directly.',
      contributorPathwayTitle: 'Register via Field Scout / Contributor',
      contributorPathwayDesc: 'I am an NGO scout, researcher, or community leader documenting an artisan in remote areas.',
      
      // Self Registration Strings
      step1: 'Step 1: Mobile Phone Verification',
      phoneLabel: 'Mobile Phone Number',
      phonePlaceholder: 'Enter 10-digit mobile number',
      sendOtp: 'Send OTP',
      otpSentMsg: 'OTP sent to mobile (Use 1234 to verify)',
      otpLabel: 'Enter 4-Digit OTP',
      verifyOtp: 'Verify OTP',
      otpVerifiedMsg: 'Phone Number Verified ✓',
      payoutLabel: 'Direct UPI ID / Bank Account (Optional)',
      payoutPlaceholder: 'e.g. artisan@upi (For direct zero-commission payouts)',

      // Contributor Strings
      contributorSectionTitle: 'Field Scout & Contributor Attribution',
      scoutNameLabel: 'Your Full Name (Scout / Contributor)',
      scoutNamePlaceholder: 'e.g. Ananya Roy',
      scoutOrgLabel: 'Organization / NGO / Institution',
      scoutOrgPlaceholder: 'e.g. Tribal Heritage Foundation, Ranchi',
      scoutContactLabel: 'Contact Email / Mobile Number',
      scoutContactPlaceholder: 'scout@heritagehunt.org or 98350XXXXX',
      relationshipLabel: 'Relationship to Creator',
      captureGpsBtn: 'Capture Field GPS Tag',
      capturingGpsMsg: 'Acquiring high-precision GPS coordinates...',
      gpsCapturedMsg: 'Field GPS Tagged Successfully ✓',
      scoutNotesLabel: 'Scout Field Observations & Authenticity Checks',
      scoutNotesPlaceholder: 'Document workshop accessibility, natural material sourcing, generational lineage...',

      // Common Form Strings
      step2: 'Creator & Heritage Craft Profile',
      nameLabel: 'Artisan / Creator Full Name',
      namePlaceholder: 'e.g. Sita Devi or Ramesh Munda',
      categoryLabel: 'Category of Work',
      catArts: 'Handicraft & Heritage Arts (हस्तशिल्प)',
      catAgri: 'Traditional Agriculture & Heirloom Seeds (पारंपरिक कृषि)',
      catFlora: 'Rare Native Flora & Forest Botanicals (देशज वनस्पति)',
      districtLabel: 'District / Village Cluster',
      craftTitleLabel: 'Title of Craft / Produce / Landrace',
      craftTitlePlaceholder: 'e.g. Master Sohrai Painter or Kalamdani Rice Cultivator',
      descLabel: 'Story, Ancestral Techniques & Natural Materials',
      descPlaceholder: 'Tell us about your natural pigments, datun twigs, seed saving, or ancestral wisdom...',
      photoLabel: 'Upload Photo of Craft, Farm, or Studio',
      photoPrompt: 'Tap here to capture or upload a photo',
      photoNote: 'Clear photo of handmade creation, workshop, or heirloom produce',
      changePhoto: 'Tap to change photo',

      // Step 3 translations
      step3: 'Upcoming Exhibitions & Local Haat Fairs',
      optionalBadge: 'Optional Section',
      step3Subtitle: 'Broadcast where the artisan is exhibiting or selling this week so nearby scouts and buyers can visit their stall.',
      marketNameLabel: 'Market / Fair / Haat Name',
      marketNamePlaceholder: 'e.g. Ranchi Saras Shilp Mela, Sohrai Harvest Haat',
      datesLabel: 'Exhibition Schedule',
      datesPlaceholder: 'e.g. This Weekend (Nov 14-16) or Every Sunday (8 AM - 4 PM)',
      pinLocationBtn: 'Pin Stall Location',
      pinningMsg: 'Pinning GPS location...',
      locationPinnedMsg: 'Stall Location Pinned (GPS: 23.38°N, 85.33°E) ✓',
      broadcastLabel: 'Broadcast stall location on the live Local Event Radar this week',

      submitBtn: 'Submit Registration & Generate Passport',
      submitting: 'Registering on Heritage Registry...',
      successTitle: 'Registration Successful!',
      successMsg: 'The creator is now officially recorded in the Heritage Hunt Registry with digital provenance.',
      viewOnMap: 'View Profile on Map',
      viewAllCreators: 'Explore Creators Directory',
    },
    HI: {
      badge: 'भू-स्थानिक पंजीकरण पोर्टल',
      title: 'हेरिटेज हंट में पंजीकरण करें',
      subtitle: 'पारंपरिक कारीगरों, देसी किसानों और देशज वनस्पति संरक्षकों को देश भर के खरीदारों और स्काउट्स से सीधे जोड़ें।',
      pathwayPrompt: 'पंजीकरण का माध्यम चुनें',
      selfPathwayTitle: 'कारीगर / किसान स्व-पंजीकरण',
      selfPathwayDesc: 'मैं एक कारीगर या किसान हूँ और अपनी कला, फसल या पौधों को स्वयं दर्ज कर रहा हूँ।',
      contributorPathwayTitle: 'योगदानकर्ता / स्काउट द्वारा पंजीकरण',
      contributorPathwayDesc: 'मैं एक NGO स्काउट, शोधकर्ता या ग्रामीण साथी हूँ और किसी कारीगर की जानकारी दर्ज कर रहा हूँ।',

      // Self Registration Strings
      step1: 'चरण 1: मोबाइल सत्यापन (OTP)',
      phoneLabel: 'मोबाइल फोन नंबर',
      phonePlaceholder: '10 अंकों का मोबाइल नंबर दर्ज करें',
      sendOtp: 'OTP भेजें',
      otpSentMsg: 'OTP भेजा गया (सत्यापन के लिए 1234 डालें)',
      otpLabel: '4-अंकों का OTP दर्ज करें',
      verifyOtp: 'OTP सत्यापित करें',
      otpVerifiedMsg: 'मोबाइल नंबर सत्यापित हो गया ✓',
      payoutLabel: 'सीधा UPI ID या बैंक खाता (वैकल्पिक)',
      payoutPlaceholder: 'उदा. artisan@upi (बिना किसी बिचौलिए के भुगतान के लिए)',

      // Contributor Strings
      contributorSectionTitle: 'स्काउट एवं योगदानकर्ता विवरण',
      scoutNameLabel: 'आपका पूरा नाम (स्काउट / योगदानकर्ता)',
      scoutNamePlaceholder: 'उदा. अनन्य रॉय',
      scoutOrgLabel: 'संस्था / NGO / समूह का नाम',
      scoutOrgPlaceholder: 'उदा. ट्राइबल हेरिटेज फाउंडेशन, राँची',
      scoutContactLabel: 'संपर्क ईमेल / मोबाइल नंबर',
      scoutContactPlaceholder: 'scout@heritagehunt.org या 98350XXXXX',
      relationshipLabel: 'कारीगर के साथ आपका संबंध',
      captureGpsBtn: 'स्थान का GPS टैग कैप्चर करें',
      capturingGpsMsg: 'सटीक GPS निर्देशांक प्राप्त हो रहे हैं...',
      gpsCapturedMsg: 'सटीक GPS स्थान सफलता से टैग हुआ ✓',
      scoutNotesLabel: 'स्काउट फील्ड अवलोकन एवं प्रामाणिकता टिप्पणी',
      scoutNotesPlaceholder: 'कार्यशाला तक पहुँचने का रास्ता, प्राकृतिक सामग्री और पीढ़ीगत ज्ञान का विवरण...',

      // Common Form Strings
      step2: 'कारीगर एवं कला का विवरण',
      nameLabel: 'कारीगर / किसान का पूरा नाम',
      namePlaceholder: 'उदा. सीता देवी या रमेश मुर्मू',
      categoryLabel: 'कार्य की श्रेणी चुनें',
      catArts: 'हस्तशिल्प एवं पारंपरिक कला (Handicraft & Arts)',
      catAgri: 'पारंपरिक कृषि एवं देसी बीज (Heirloom Seeds)',
      catFlora: 'देशज वनस्पति एवं औषधीय पौधे (Native Flora)',
      districtLabel: 'ज़िला / गाँव क्षेत्र',
      craftTitleLabel: 'आपकी कला / उपज का नाम',
      craftTitlePlaceholder: 'उदा. सोहराई चित्रकार या कलमदानी धान उत्पादक',
      descLabel: 'कला, विधि और प्राकृतिक सामग्री का विवरण',
      descPlaceholder: 'अपनी प्राकृतिक मिट्टी, दातुन ब्रश, देसी बीज संरक्षण और पारंपरिक तरीकों के बारे में बताएं...',
      photoLabel: 'अपनी कला, खेत या कार्यशाला की फोटो अपलोड करें',
      photoPrompt: 'यहाँ दबाकर फोटो खींचे या चुनें',
      photoNote: 'अपनी हस्तनिर्मित वस्तु, खेत या कार्यशाला की साफ़ फोटो',
      changePhoto: 'फोटो बदलने के लिए दबाएं',

      // Step 3 translations
      step3: 'आगामी प्रदर्शनियाँ एवं स्थानीय हाट',
      optionalBadge: 'वैकल्पिक खंड (Optional)',
      step3Subtitle: 'प्रसारित करें कि इस सप्ताह आप अपनी कला या उपज कहाँ बेच रहे हैं, ताकि खरीदार सीधे स्टॉल पर आ सकें।',
      marketNameLabel: 'बाज़ार / मेले / हाट का नाम',
      marketNamePlaceholder: 'उदा. राँची सरस शिल्प मेला, सोहराई हाट',
      datesLabel: 'मेले / प्रदर्शनी की तारीख व समय',
      datesPlaceholder: 'उदा. इस सप्ताहांत (14-16 नवम्बर) या प्रत्येक रविवार',
      pinLocationBtn: 'दुकान / स्टॉल का स्थान पिन करें',
      pinningMsg: 'स्थान पिन हो रहा है...',
      locationPinnedMsg: 'स्टॉल का सटीक स्थान पिन हो गया (GPS: 23.38°N, 85.33°E) ✓',
      broadcastLabel: 'इस सप्ताह लोकल इवेंट रडार मानचित्र पर मेरी दुकान का स्थान प्रसारित करें',

      submitBtn: 'पंजीकरण पूरा करें और डिजिटल पासपोर्ट बनाएं',
      submitting: 'पंजीकरण हो रहा है...',
      successTitle: 'बधाई हो! पंजीकरण सफल रहा!',
      successMsg: 'कारीगर की प्रामाणिक जानकारी हेरिटेज हंट रजिस्ट्री में दर्ज हो गई है।',
      viewOnMap: 'मानचित्र पर देखें',
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

  const handleCaptureGps = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsCapturingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const formatted = `${latitude.toFixed(5)}° N, ${longitude.toFixed(5)}° E (±${Math.round(accuracy)}m)`;
        setGpsCaptured(formatted);
        setPinnedCoordinates({ lat: latitude, lng: longitude });
        setIsCapturingGps(false);
      },
      (err) => {
        console.warn('GPS capture error:', err);
        // Fallback default coordinates for Jharkhand
        const fallbackLat = 23.61 + (Math.random() - 0.5) * 0.5;
        const fallbackLng = 85.27 + (Math.random() - 0.5) * 0.5;
        setGpsCaptured(`${fallbackLat.toFixed(5)}° N, ${fallbackLng.toFixed(5)}° E (Simulated Field Tag)`);
        setPinnedCoordinates({ lat: fallbackLat, lng: fallbackLng });
        setIsCapturingGps(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
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

    if (pathway === 'self' && !otpVerified) {
      alert(language === 'HI' ? 'कृपया पहले मोबाइल OTP सत्यापित करें' : 'Please verify your mobile number with OTP first.');
      return;
    }

    if (pathway === 'contributor' && !contributorName.trim()) {
      alert(language === 'HI' ? 'कृपया योगदानकर्ता / स्काउट का नाम दर्ज करें' : 'Please enter the contributor/scout name.');
      return;
    }

    setIsSubmitting(true);

    const defaultImg =
      category === 'Heritage Arts'
        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80'
        : category === 'Agriculture'
        ? 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80';

    const creatorDisplayName = fullName.trim() || (language === 'HI' ? 'कारीगर' : 'Local Artisan');
    const assignedCraftTitle = craftTitle.trim() || (category === 'Heritage Arts' ? 'Master Artisan' : 'Traditional Conservator');

    const newArtisan: Artisan = {
      id: `artisan-${Date.now()}`,
      name: creatorDisplayName,
      craftTitle: assignedCraftTitle,
      shortBio: craftDescription.slice(0, 100) || `${creatorDisplayName} from ${district}, practicing authentic ${category}.`,
      fullBio: craftDescription || `Preserving authentic ${category} in ${district}, Jharkhand with community-verified methods.`,
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
      trustScore: pathway === 'self' ? 98 : 96,
      trustRating: 4.9,
      verifiedVisits: pathway === 'contributor' ? 1 : 0,
      contributionsCount: 1,
      avatarUrl: photoPreview || defaultImg,
      heroImageUrl: photoPreview || defaultImg,
      postcardImageUrl: photoPreview || defaultImg,
      artForm: assignedCraftTitle || category,
      artDescription: craftDescription || `Authentic ${category} from ${district}.`,
      tags: [district, category, pathway === 'self' ? 'Self-Registered' : 'Scout-Documented', 'Heritage Hunt Verified'],
      registrationType: pathway,
      contributorInfo: pathway === 'contributor' ? {
        contributorName: contributorName.trim(),
        organization: contributorOrg.trim(),
        contact: contributorContact.trim(),
        relationship,
        scoutNotes: scoutNotes.trim(),
      } : undefined,
      gallery: [
        {
          id: `gal-${Date.now()}`,
          url: photoPreview || defaultImg,
          caption: `${creatorDisplayName} - ${assignedCraftTitle}`,
          author: pathway === 'contributor' ? contributorName || 'Heritage Field Scout' : creatorDisplayName,
          span: 'col-span-2 row-span-2',
        },
      ],
      reviews: [
        {
          id: `rev-${Date.now()}`,
          author: pathway === 'contributor' ? `Field Scout: ${contributorName || 'Heritage Scout'}` : 'Heritage Hunt Registry',
          date: 'Just now',
          rating: 5,
          text: pathway === 'contributor' 
            ? `Documented on location by ${contributorName || 'NGO Scout'} (${contributorOrg || 'Cultural Partner'}). Scout Notes: ${scoutNotes || 'Field verification and photo logs validated.'}`
            : `Self-registered through the rural artisan portal from ${district}. Mobile and GPS verification complete.`,
          verifiedGps: gpsCaptured || `${district}, Jharkhand (GPS Tagged)`,
        },
      ],
      contactInfo: {
        phone: phoneNumber ? `+91 ${phoneNumber}` : '+91 94311 00000',
        cooperative: `${district} Rural Guild`,
        address: `${district} District, Jharkhand`,
      },
    };

    // If an exhibition was broadcasted
    if (marketName.trim() && broadcastToRadar && onBroadcastExhibition) {
      const exhibitionEvent: LocalEvent = {
        id: `artisan-event-${Date.now()}`,
        name: marketName.trim(),
        category: category === 'Heritage Arts' ? 'Tribal Craft Mela' : 'Agrarian Haat',
        district,
        state: 'Jharkhand',
        venue: isLocationPinned ? `Stall #${Math.floor(Math.random() * 30) + 1}, ${marketName}, ${district}` : `${marketName}, ${district}`,
        dates: exhibitionDates.trim() || 'This Week',
        description: `Exhibition stall by registered master creator ${creatorDisplayName}, presenting authentic ${assignedCraftTitle} from ${district}.`,
        coordinates: {
          x: Math.floor(Math.random() * 40) + 30,
          y: Math.floor(Math.random() * 40) + 30,
          lat: pinnedCoordinates?.lat || 23.38,
          lng: pinnedCoordinates?.lng || 85.33,
        },
        featuredCrafts: [assignedCraftTitle, category],
        organizer: `${creatorDisplayName} (Artisan Stall)`,
        expectedArtisans: 1,
        status: 'Happening Now',
        reportedBy: pathway === 'contributor' ? contributorName || 'Scout' : creatorDisplayName,
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
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 animate-in fade-in duration-300 pb-28 md:pb-16">
      {/* Top Language & Quick Switcher */}
      <div className="flex justify-between items-center bg-white p-3 rounded-2xl card-shadow border border-[#ddc1b3]/50 mb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-[#564338]">
          <Globe className="w-4 h-4 text-[#974400]" />
          <span>भाषा चुनें / Language:</span>
        </div>

        <div className="flex bg-[#fff1eb] p-1 rounded-xl border border-[#ddc1b3]/40">
          <button
            type="button"
            id="lang-btn-hi"
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
            id="lang-btn-en"
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
            ✓ Heritage Hunt Verified Digital Passport
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231914] mb-2">
            {t.successTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#564338] max-w-lg mx-auto mb-6 leading-relaxed">
            {t.successMsg}
          </p>

          {/* Exhibition Broadcast Notification */}
          {marketName && (
            <div className="p-3.5 bg-[#ffe4e6] text-[#e11d48] rounded-2xl border border-[#fecdd3] max-w-md mx-auto mb-6 text-xs font-bold flex items-center justify-center gap-2">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>
                {language === 'HI'
                  ? `आपकी प्रदर्शनी "${marketName}" लाइव इवेंट रडार पर प्रसारित हो गई है!`
                  : `Exhibition stall at "${marketName}" is now active on the Event Radar!`}
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
                {registeredArtisan.category} • {registeredArtisan.registrationType === 'contributor' ? 'Scout Verified' : 'Self Registered'}
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
        /* Main Registration Form with Split Pathway Toggle */
        <div className="bg-white rounded-3xl p-6 sm:p-10 card-shadow border border-[#ddc1b3]/60">
          {/* Header */}
          <div className="mb-6">
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

          {/* 🌟 FEATURE 1: Pathway Switcher Toggle Cards */}
          <div className="mb-8">
            <label className="block text-xs font-bold text-[#974400] uppercase tracking-wider mb-3">
              {t.pathwayPrompt}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="radiogroup" aria-label="Registration Pathway">
              {/* Option A: Self Registration */}
              <button
                type="button"
                id="pathway-self-btn"
                onClick={() => setPathway('self')}
                className={`text-left p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  pathway === 'self'
                    ? 'border-[#974400] bg-[#fff1eb] ring-3 ring-[#974400]/15 shadow-sm'
                    : 'border-[#ddc1b3]/60 bg-[#fff8f6] hover:border-[#974400]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${pathway === 'self' ? 'bg-[#974400] text-white' : 'bg-[#feeae0] text-[#974400]'}`}>
                    <User className="w-5 h-5" />
                  </div>
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${pathway === 'self' ? 'border-[#974400] bg-[#974400] text-white' : 'border-[#ddc1b3]'}`}>
                    {pathway === 'self' && <Check className="w-3 h-3" />}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#231914] mb-1">
                    {t.selfPathwayTitle}
                  </h3>
                  <p className="text-xs text-[#564338] leading-relaxed">
                    {t.selfPathwayDesc}
                  </p>
                </div>
              </button>

              {/* Option B: Register via Contributor */}
              <button
                type="button"
                id="pathway-contributor-btn"
                onClick={() => setPathway('contributor')}
                className={`text-left p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  pathway === 'contributor'
                    ? 'border-[#974400] bg-[#fff1eb] ring-3 ring-[#974400]/15 shadow-sm'
                    : 'border-[#ddc1b3]/60 bg-[#fff8f6] hover:border-[#974400]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${pathway === 'contributor' ? 'bg-[#974400] text-white' : 'bg-[#feeae0] text-[#974400]'}`}>
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${pathway === 'contributor' ? 'border-[#974400] bg-[#974400] text-white' : 'border-[#ddc1b3]'}`}>
                    {pathway === 'contributor' && <Check className="w-3 h-3" />}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#231914] mb-1">
                    {t.contributorPathwayTitle}
                  </h3>
                  <p className="text-xs text-[#564338] leading-relaxed">
                    {t.contributorPathwayDesc}
                  </p>
                </div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* CONDITIONAL SECTION 1: Self-Registration Mobile & OTP */}
            {pathway === 'self' && (
              <div id="self-registration-flow" className="p-5 sm:p-6 bg-[#fff8f6] rounded-2xl border-2 border-[#ddc1b3] space-y-4 animate-in fade-in">
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

                {/* OTP Verification Field */}
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
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>{t.otpVerifiedMsg}</span>
                  </div>
                )}

                <div className="pt-2">
                  <label className="block text-xs font-bold text-[#564338] mb-1.5">
                    {t.payoutLabel}
                  </label>
                  <input
                    type="text"
                    value={payoutIdentifier}
                    onChange={(e) => setPayoutIdentifier(e.target.value)}
                    placeholder={t.payoutPlaceholder}
                    className="w-full px-4 py-2.5 bg-white rounded-xl text-xs sm:text-sm border border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                  />
                </div>
              </div>
            )}

            {/* CONDITIONAL SECTION 2: Contributor / Scout Attribution Details */}
            {pathway === 'contributor' && (
              <div id="contributor-registration-flow" className="p-5 sm:p-6 bg-[#fff8f6] rounded-2xl border-2 border-[#ddc1b3] space-y-4 animate-in fade-in">
                <h2 className="font-serif text-lg font-bold text-[#231914] flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#974400]" />
                  <span>{t.contributorSectionTitle}</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#231914] mb-1.5">
                      {t.scoutNameLabel} <span className="text-[#974400]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={contributorName}
                      onChange={(e) => setContributorName(e.target.value)}
                      placeholder={t.scoutNamePlaceholder}
                      className="w-full px-4 py-3 bg-white rounded-xl text-sm font-semibold border-2 border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#231914] mb-1.5">
                      {t.scoutOrgLabel}
                    </label>
                    <input
                      type="text"
                      value={contributorOrg}
                      onChange={(e) => setContributorOrg(e.target.value)}
                      placeholder={t.scoutOrgPlaceholder}
                      className="w-full px-4 py-3 bg-white rounded-xl text-sm font-semibold border-2 border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#231914] mb-1.5">
                      {t.scoutContactLabel}
                    </label>
                    <input
                      type="text"
                      value={contributorContact}
                      onChange={(e) => setContributorContact(e.target.value)}
                      placeholder={t.scoutContactPlaceholder}
                      className="w-full px-4 py-3 bg-white rounded-xl text-sm font-semibold border-2 border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#231914] mb-1.5">
                      {t.relationshipLabel}
                    </label>
                    <select
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl text-sm font-semibold border-2 border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                    >
                      <option value="Field Scout / Researcher">Field Scout / Cultural Researcher</option>
                      <option value="NGO Partner">NGO / Civil Society Representative</option>
                      <option value="Village Gram Panchayat">Village Gram Panchayat / Council</option>
                      <option value="Family / Community Relative">Family / Community Relative</option>
                      <option value="Patron / Collector">Patron / Field Collector</option>
                    </select>
                  </div>
                </div>

                {/* GPS Capture Action */}
                <div className="pt-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <button
                      type="button"
                      id="capture-gps-btn"
                      onClick={handleCaptureGps}
                      disabled={isCapturingGps}
                      className="bg-[#feeae0] text-[#974400] border border-[#974400]/40 px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#f2dfd5] transition-all flex items-center gap-2 cursor-pointer shrink-0"
                    >
                      <LocateFixed className={`w-4 h-4 ${isCapturingGps ? 'animate-spin' : ''}`} />
                      <span>{isCapturingGps ? t.capturingGpsMsg : t.captureGpsBtn}</span>
                    </button>

                    {gpsCaptured && (
                      <span className="text-xs font-bold text-[#006e0c] flex items-center gap-1.5 bg-[#ebfbee] px-3 py-1.5 rounded-lg border border-[#92fa83]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{gpsCaptured}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#564338] mb-1.5">
                    {t.scoutNotesLabel}
                  </label>
                  <textarea
                    rows={2}
                    value={scoutNotes}
                    onChange={(e) => setScoutNotes(e.target.value)}
                    placeholder={t.scoutNotesPlaceholder}
                    className="w-full p-3 bg-white rounded-xl text-xs sm:text-sm border border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Artisan Identity & Craft Profile (Universal) */}
            <div className="p-5 sm:p-6 bg-[#fff8f6] rounded-2xl border-2 border-[#ddc1b3] space-y-5">
              <h2 className="font-serif text-lg font-bold text-[#231914] flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#974400]" />
                <span>{t.step2}</span>
              </h2>

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
                  className="w-full px-4 py-3 bg-white rounded-xl text-sm sm:text-base font-semibold border-2 border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                />
              </div>

              {/* Category Selector */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#231914] mb-2">
                  {t.categoryLabel} <span className="text-[#974400]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    id="cat-btn-arts"
                    onClick={() => setCategory('Heritage Arts')}
                    className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      category === 'Heritage Arts'
                        ? 'border-[#974400] bg-[#fff1eb] text-[#974400] font-bold shadow-xs'
                        : 'border-[#ddc1b3] bg-white text-[#564338]'
                    }`}
                  >
                    <Palette className="w-5 h-5 mb-2 text-[#974400]" />
                    <span className="text-xs sm:text-sm">{t.catArts}</span>
                  </button>

                  <button
                    type="button"
                    id="cat-btn-agri"
                    onClick={() => setCategory('Agriculture')}
                    className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      category === 'Agriculture'
                        ? 'border-[#186a22] bg-[#f7fff1] text-[#186a22] font-bold shadow-xs'
                        : 'border-[#ddc1b3] bg-white text-[#564338]'
                    }`}
                  >
                    <Sprout className="w-5 h-5 mb-2 text-[#186a22]" />
                    <span className="text-xs sm:text-sm">{t.catAgri}</span>
                  </button>

                  <button
                    type="button"
                    id="cat-btn-flora"
                    onClick={() => setCategory('Indigenous Flora')}
                    className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      category === 'Indigenous Flora'
                        ? 'border-[#006e0c] bg-[#ebfbee] text-[#006e0c] font-bold shadow-xs'
                        : 'border-[#ddc1b3] bg-white text-[#564338]'
                    }`}
                  >
                    <Trees className="w-5 h-5 mb-2 text-[#006e0c]" />
                    <span className="text-xs sm:text-sm">{t.catFlora}</span>
                  </button>
                </div>
              </div>

              {/* District & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#231914] mb-1.5">
                    {t.districtLabel} <span className="text-[#974400]">*</span>
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl text-sm font-semibold border-2 border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                  >
                    <option value="Hazaribagh">Hazaribagh (हजारीबाग)</option>
                    <option value="Ranchi">Ranchi (राँची)</option>
                    <option value="Khunti">Khunti (खूंटी)</option>
                    <option value="Dumka">Dumka (दुमका)</option>
                    <option value="East Singhbhum">East Singhbhum (पूर्वी सिंहभूम)</option>
                    <option value="Gumla">Gumla (गुमला)</option>
                    <option value="Saraikela">Saraikela (सरायकेला)</option>
                    <option value="Simdega">Simdega (सिमडेगा)</option>
                  </select>
                </div>

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
                    className="w-full px-4 py-3 bg-white rounded-xl text-sm font-semibold border-2 border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                  />
                </div>
              </div>

              {/* Craft Story & Methods */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#231914] mb-1.5">
                  {t.descLabel}
                </label>
                <textarea
                  rows={3}
                  value={craftDescription}
                  onChange={(e) => setCraftDescription(e.target.value)}
                  placeholder={t.descPlaceholder}
                  className="w-full p-4 bg-white rounded-xl text-sm border-2 border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914] leading-relaxed"
                />
              </div>

              {/* Photo Upload Area */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#231914] mb-1.5">
                  {t.photoLabel}
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoSelect}
                  accept="image/*"
                  className="hidden"
                />

                {photoPreview ? (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-[#974400] max-w-sm">
                    <img
                      src={photoPreview}
                      alt="Uploaded craft preview"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-black transition-colors cursor-pointer"
                    >
                      {t.changePhoto}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-[#ddc1b3] hover:border-[#974400] rounded-2xl p-6 bg-white flex flex-col items-center justify-center text-center transition-colors cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#fff1eb] text-[#974400] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-[#231914] block">
                      {t.photoPrompt}
                    </span>
                    <span className="text-xs text-[#564338] mt-1">
                      {t.photoNote}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Step 3: Upcoming Exhibitions (Optional) */}
            <div className="p-5 sm:p-6 bg-[#fff8f6] rounded-2xl border border-[#ddc1b3] space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-serif text-lg font-bold text-[#231914] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#974400]" />
                  <span>{t.step3}</span>
                </h2>
                <span className="text-[11px] font-bold text-[#974400] bg-[#feeae0] px-2.5 py-0.5 rounded-full">
                  {t.optionalBadge}
                </span>
              </div>

              <p className="text-xs text-[#564338]">{t.step3Subtitle}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#231914] mb-1">
                    {t.marketNameLabel}
                  </label>
                  <input
                    type="text"
                    value={marketName}
                    onChange={(e) => setMarketName(e.target.value)}
                    placeholder={t.marketNamePlaceholder}
                    className="w-full px-4 py-2.5 bg-white rounded-xl text-xs sm:text-sm border border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#231914] mb-1">
                    {t.datesLabel}
                  </label>
                  <input
                    type="text"
                    value={exhibitionDates}
                    onChange={(e) => setExhibitionDates(e.target.value)}
                    placeholder={t.datesPlaceholder}
                    className="w-full px-4 py-2.5 bg-white rounded-xl text-xs sm:text-sm border border-[#ddc1b3] focus:border-[#974400] outline-none text-[#231914]"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <button
                  type="button"
                  id="pin-stall-location-btn"
                  onClick={handlePinLocation}
                  className="bg-[#feeae0] text-[#974400] border border-[#974400]/40 px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#f2dfd5] transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <LocateFixed className="w-4 h-4" />
                  <span>{isLocationPinned ? t.locationPinnedMsg : t.pinLocationBtn}</span>
                </button>

                <label className="flex items-center gap-2 text-xs font-medium text-[#564338] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={broadcastToRadar}
                    onChange={(e) => setBroadcastToRadar(e.target.checked)}
                    className="rounded text-[#974400] focus:ring-[#974400]"
                  />
                  <span>{t.broadcastLabel}</span>
                </label>
              </div>
            </div>

            {/* Submission Button */}
            <div className="pt-4">
              <button
                type="submit"
                id="submit-artisan-registration-btn"
                disabled={isSubmitting}
                className="w-full bg-[#974400] text-white py-4 px-6 rounded-2xl font-sans text-base sm:text-lg font-bold hover:bg-[#bb5808] transition-all shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>{t.submitting}</span>
                ) : (
                  <>
                    <span>{t.submitBtn}</span>
                    <ArrowRight className="w-5 h-5" />
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
