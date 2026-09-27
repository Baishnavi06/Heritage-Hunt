import { Artisan, EncyclopediaEntry, DistrictKnowledge } from '../types';

export const ARTISANS: Artisan[] = [
  {
    id: 'sita-devi',
    name: 'Sita Devi',
    craftTitle: 'Master Sohrai Painter',
    shortBio: 'Master Sohrai Painter from Hazaribagh, preserving generations of mural art.',
    fullBio:
      'Master of Sohrai Khovar painting, preserving the ancestral storytelling traditions of the tribal communities in Hazaribagh through natural pigments and mud canvases.',
    category: 'Heritage Arts',
    district: 'Hazaribagh',
    state: 'Jharkhand',
    locationName: 'Hazaribagh, Jharkhand',
    coordinates: { x: 48, y: 38, lat: 23.9937, lng: 85.3627 },
    trustScore: 98,
    trustRating: 4.8,
    verifiedVisits: 15,
    contributionsCount: 42,
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA430v9skUrPJweYZVUN8fNtoelpcgVanspqViYb8WvSd69pjOqovXIawRsJx-alcktP0lXrSpPQfI3GJcE6MKP4snlw8ss0iPvlYWFAzIUm2OeR2-Ai73ISjEAhhwAGSoh3Km7CWP33WdPP4jq59Jb63beTqT3xHfWbalILXluFyMVnUNrpQWPnbP8g2xQVWd2f9tFY3TlRl9O-tdAJL3BmiK819XhJHQ5TBPeAmXieskbByN7M3o',
    heroImageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWzDtyROwXMa51hS3Le6kWkCnluiF5Ip_1Nif1wKNa-1BC4DM1u1SdaHMYP8IfMpLtKKHH_Rv_Aj_1EVc-PSWP_drp4jb3aw-4nqKYECe2jzypACKwwxLCGnO6V4ZBWAjvqdxka-T-mFDii7uUsKfqFTUik_4E9aHC0vTmNTma_vVi-Os5GSE-4RJjSRIyjw3HuIGRjsOy5c8M8xVtTa5J3K_pf_VD_CCAOr6pS6wvRvgPK-KVxZs',
    postcardImageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBWbXU7o66zIxPJ-errLBZD_foWu-4o4Vdk2m7W-n_XNyWd8gaM69JTV9mxQYIzhKBAI7SGfv19nDVuuKqKbcbt0dB03sgmoBast-_uk0UwrACE-sFT37OmpDNVMUO591dwR6se6zReWOEAz85zWO19egjV6qUvBJoBD7iGax6WSpNSdnBgsdfY03Z9WC_dD8y6gZ7ymjdy9FMOi2hLl_R7ohA3dnVDwpijeGXwuamTb4jc7p1y3i8',
    artForm: 'Sohrai Khovar Art',
    artDescription:
      "A traditional and ritualistic mural art practiced by women in the Hazaribagh district of Jharkhand. 'Sohrai' celebrates the harvest and honors cattle, while 'Khovar' is painted during weddings. The art is characterized by its use of local earth colors—red oxide, yellow ochre, manganese black, and white kaolin—applied directly to mud walls to create intricate patterns of flora and fauna.",
    tags: ['Natural Pigments', 'Mural Painting', 'Jharkhand Heritage', 'GI Tagged Craft'],
    gallery: [
      {
        id: 'gal-1',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpH6KffzLoKRc8cGg_rvodT0gbg0KedgdsHOKvili2SNxeQdWCLsm9BVRy8inJlNbH09XmyxCSWPrrdiDZcFmg7XZT0kCYXvOBPDmEFZ84-mu_xVxZ_VWtOu8lfWrGyykOUxJPWqWyYWGOsRUh2-dZu1ALnQujDIRv58mzXQgQRwTN1Psjk7dgRqR7rWV7hRqMLQhPd0N_YnbqHOSq-p0m44qpFSkAY9ALQ1b9aolKhEfE69wyQYg',
        caption: 'Sohrai peacock mural painted with natural earth pigments on sun-baked mud wall',
        author: 'Arjun K. (Verified Visitor)',
        span: 'col-span-2 row-span-2',
      },
      {
        id: 'gal-2',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtN_PLr84GzI5ggZM7Mj-eUZLAjN-qkAGR-uHUqARD8DPuA2K1AYfc2bxPen4w3EqldwKaIbyJ4iKmsprOLqX5Ma3fpO5SMxv4kRTKSBznZBBLjj6WMfXKqLqhq5PLUMoGlzfB_T1z-uC7y2p605Rl_n-vmG6C--U1Xk9Hkw_RcRkctDrXU08OlCmGSUsjnnAIQUiyT_VT8p1hXnfeRGVQ5TSrWRAS5wyaLoQ2LvCEZt0BxrgMC2Y',
        caption: 'Traditional terracotta bowls containing red oxide, ochre, kaolin and charcoal pigments',
        author: 'Pooja Verma',
      },
      {
        id: 'gal-3',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwbmGOZtSpGFJ2qbgJakNo7CiovgXD8EV6G7L47I5Jnc-odxxyHSpEjPk670ocLN1VGKTVlCCbSxY4axIsyMu6g3Nd4SOR_hWPQ1LQd6P1v35DgoG5230oYVs6eDnonP-cn_nuUPgTvSp4bFO3HviwHQBX2oqzEt9vMIXDbWeLLTGy5Wvhw0eChaYT6DYLw-2hTT7q9Qm7S2W7YiyzaPe5OCZhYwm_d9zjy0OkkRQSSN2eU6Eikow',
        caption: 'Meticulously applying natural geometric borders with handmade datun twig brushes',
        author: 'Heritage Field Worker',
      },
      {
        id: 'gal-4',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrXmNZYTqyQRPh11niGOYRpukm9l3Xwppch_dIiKfssFnm2dsLkxlYSHvALmge412jCmWFxhI_J06GAifZxK5QbQ7SuLPT_dzgtesd4Q7do7dGZpjWh1YQqedd2vMxTTU-qSNNaeyNjCRvHV608K9GXIGBctHMzmlbQoA7aAfE3QNWyDM29TFY1FpQw0U0hs7HsAhzUXZ4mRFUJ3ZiZ23Rli7D03I_01t9sKSmHgRY1i5rkiTktqU',
        caption: 'Decorated village courtyard during the harvest festival celebration in Hazaribagh',
        author: 'Dr. Manish Chandra',
        span: 'col-span-2',
      },
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Ananya Roy',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        date: '3 days ago',
        rating: 5,
        text: 'Met Sita Devi at her studio in Hazaribagh. Seeing her mix the natural kaolin clay and yellow ochre by hand was breathtaking. She explained every motif representing nature and ancestral gods.',
        verifiedGps: 'Hazaribagh, Jharkhand (GPS Verified: 23.9937° N, 85.3627° E)',
      },
      {
        id: 'rev-2',
        author: 'Kunal Sharma',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        date: '1 week ago',
        rating: 5,
        text: 'The authenticity of this art is unmatched. The digital verification platform lets us support the real master artisan directly without intermediaries taking all the cut.',
        verifiedGps: 'Hazaribagh, Jharkhand (GPS Verified)',
      },
      {
        id: 'rev-3',
        author: 'Meera Sen',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
        date: '2 weeks ago',
        rating: 5,
        text: 'Purchased a Sohrai canvas piece directly from Sita Devi. Her mastery with tooth-bruised twigs and clay slips is true living heritage.',
        verifiedGps: 'Hazaribagh, Jharkhand (GPS Verified)',
      },
    ],
    contactInfo: {
      phone: '+91 94311 88204',
      cooperative: 'Hazaribagh Tribal Women Artists Collective (Virasat)',
      address: 'Bada Bazaar, Hazaribagh District, Jharkhand 825301',
    },
  },
  {
    id: 'ramesh-munda',
    name: 'Ramesh Munda',
    craftTitle: 'Indigenous Heritage Farmer',
    shortBio: 'Cultivator of rare indigenous rice varieties, maintaining biodiversity.',
    fullBio:
      'Pioneer of traditional seed banking and heirloom rice conservation in Khunti. Dedicated to preserving over 30 indigenous drought-resilient varieties passed down for generations.',
    category: 'Agriculture',
    district: 'Khunti',
    state: 'Jharkhand',
    locationName: 'Khunti, Jharkhand',
    coordinates: { x: 52, y: 62, lat: 23.0722, lng: 85.2789 },
    trustScore: 99,
    trustRating: 4.9,
    verifiedVisits: 28,
    contributionsCount: 65,
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAZvCYssfRmZev96XVDUFeqNFKTnine1SZjT48gfVqo5ocO8Sor2XWB0zOPMjRGYaSlcShKE3OoLQ3AdKkEu-kbt3lItMlBYn_UwWYLZit9K1QvK2__o6lddDFnHtVugJV636BjhRMIxNo8WlgTt74KTqGJ0vmnIcP_dXmN_ITwx98cImDIOUPn1V4nBf-llsZks2lgN8cJTQbDDPjKqf3MF2vGkz9PgDqpdQdEYyeK1E6EpFWcDts',
    heroImageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAZvCYssfRmZev96XVDUFeqNFKTnine1SZjT48gfVqo5ocO8Sor2XWB0zOPMjRGYaSlcShKE3OoLQ3AdKkEu-kbt3lItMlBYn_UwWYLZit9K1QvK2__o6lddDFnHtVugJV636BjhRMIxNo8WlgTt74KTqGJ0vmnIcP_dXmN_ITwx98cImDIOUPn1V4nBf-llsZks2lgN8cJTQbDDPjKqf3MF2vGkz9PgDqpdQdEYyeK1E6EpFWcDts',
    postcardImageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAZvCYssfRmZev96XVDUFeqNFKTnine1SZjT48gfVqo5ocO8Sor2XWB0zOPMjRGYaSlcShKE3OoLQ3AdKkEu-kbt3lItMlBYn_UwWYLZit9K1QvK2__o6lddDFnHtVugJV636BjhRMIxNo8WlgTt74KTqGJ0vmnIcP_dXmN_ITwx98cImDIOUPn1V4nBf-llsZks2lgN8cJTQbDDPjKqf3MF2vGkz9PgDqpdQdEYyeK1E6EpFWcDts',
    artForm: 'Indigenous Rice Conservation',
    artDescription:
      'Cultivation and seed-saving of indigenous organic aromatic and heirloom varieties such as Birsa Dhan, Danigora, and Kalamdani without synthetic chemicals, nurturing fertile soil balance.',
    tags: ['Indigenous Seeds', 'Organic Farming', 'Biodiversity', 'Khunti Agro-Heritage'],
    gallery: [
      {
        id: 'gal-rm1',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZvCYssfRmZev96XVDUFeqNFKTnine1SZjT48gfVqo5ocO8Sor2XWB0zOPMjRGYaSlcShKE3OoLQ3AdKkEu-kbt3lItMlBYn_UwWYLZit9K1QvK2__o6lddDFnHtVugJV636BjhRMIxNo8WlgTt74KTqGJ0vmnIcP_dXmN_ITwx98cImDIOUPn1V4nBf-llsZks2lgN8cJTQbDDPjKqf3MF2vGkz9PgDqpdQdEYyeK1E6EpFWcDts',
        caption: 'Ramesh inspects ripe heirloom paddy ears at harvest dawn in Torpa village',
        author: 'Agricultural Heritage Registry',
        span: 'col-span-2 row-span-2',
      },
    ],
    reviews: [
      {
        id: 'rev-rm1',
        author: 'Sunil Hembram',
        date: '4 days ago',
        rating: 5,
        text: 'Verified his seed preservation bank on location. Authentic traditional organic cultivation preserving ancestral health benefits.',
        verifiedGps: 'Khunti, Jharkhand (GPS Verified)',
      },
    ],
    contactInfo: {
      phone: '+91 98355 41209',
      cooperative: 'Khunti Indigenous Seed Keepers Federation',
      address: 'Torpa Block, Khunti District, Jharkhand 835227',
    },
  },
  {
    id: 'ananya-murmu',
    name: 'Ananya Murmu',
    craftTitle: 'Dokra Brass Metallurgist',
    shortBio: 'Master of lost-wax bell metal casting, forging 4,000-year-old Harappan techniques.',
    fullBio:
      'Carrying forward the ancient Dokra non-ferrous metal casting art form. Creates intricate sculptures, sacred lamps, and tribal motifs using beeswax, clay cores, and molten recycled bell metal.',
    category: 'Heritage Arts',
    district: 'Dumka',
    state: 'Jharkhand',
    locationName: 'Dumka, Santhal Parganas',
    coordinates: { x: 74, y: 35, lat: 24.2676, lng: 87.2483 },
    trustScore: 97,
    trustRating: 4.9,
    verifiedVisits: 19,
    contributionsCount: 38,
    avatarUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    heroImageUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    postcardImageUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    artForm: 'Dokra Lost-Wax Metal Craft',
    artDescription:
      'Dokra is a 4,000-year-old metal casting method dating back to Mohenjo-Daro (the Dancing Girl). The wax pattern is intricately wound with fine threads of wax, coated in clay from termite mounds, and replaced by molten brass.',
    tags: ['Lost Wax', 'Bell Metal', 'Tribal Bronze', 'GI Tagged'],
    gallery: [],
    reviews: [],
    contactInfo: {
      phone: '+91 94701 33201',
      cooperative: 'Santhal Dokra Shilp Society',
      address: 'Dumka Artisan Cluster, Jharkhand 814101',
    },
  },
  {
    id: 'birsa-oraon',
    name: 'Birsa Oraon',
    craftTitle: 'Paitkar Scroll Painter',
    shortBio: 'Preserving old folklore scroll paintings made on natural parchment.',
    fullBio:
      'Known as the scroll painter of Amadubi village. Paitkar is considered one of the earliest indigenous scroll painting traditions in Eastern India, illustrating afterlife folklore and clan songs.',
    category: 'Heritage Arts',
    district: 'Saraikela-Kharsawan',
    state: 'Jharkhand',
    locationName: 'Saraikela, Jharkhand',
    coordinates: { x: 60, y: 72, lat: 22.7001, lng: 85.9288 },
    trustScore: 96,
    trustRating: 4.7,
    verifiedVisits: 12,
    contributionsCount: 31,
    avatarUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    heroImageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
    postcardImageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
    artForm: 'Paitkar Scroll Art',
    artDescription:
      'Paitkar artists narrate oral epics through continuous scroll paintings made on handmade paper or fabric using natural stone minerals, tree saps, and leaf extracts.',
    tags: ['Paitkar Scroll', 'Natural Inks', 'Amadubi Heritage', 'Folk Lore'],
    gallery: [],
    reviews: [],
    contactInfo: {
      phone: '+91 91223 77489',
      cooperative: 'Amadubi Cultural Village Artists',
      address: 'Dhalbhumgarh, Saraikela, Jharkhand',
    },
  },
  {
    id: 'parvati-devi',
    name: 'Parvati Devi',
    craftTitle: 'Indigenous Medicinal Flora & Forest Botanicals Custodian',
    shortBio: 'Tribal forest herbalist and botanical conservator in the Netarhat Sal forest belt.',
    fullBio:
      'Conservation and sustainable wild-crafting of rare sub-plateau medicinal herbs. Preserves wild seed banks of Kalmegh (Andrographis) and wild Brahmi adapted to the moist Sal forest understory.',
    category: 'Indigenous Flora',
    district: 'Latehar',
    state: 'Jharkhand',
    locationName: 'Netarhat Forest Belt, Latehar',
    coordinates: { x: 32, y: 48, lat: 23.6102, lng: 84.5022 },
    trustScore: 99,
    trustRating: 4.9,
    verifiedVisits: 22,
    contributionsCount: 58,
    avatarUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    heroImageUrl:
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80',
    postcardImageUrl:
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80',
    artForm: 'Wild Forest Medicinal Plants (Kalmegh, Chirata & Wild Brahmi)',
    artDescription:
      'Conservation and sustainable wild-crafting of rare sub-plateau medicinal herbs. Preserves wild seed banks of Kalmegh (Andrographis) and wild Brahmi adapted to the moist Sal forest understory.',
    tags: ['Medicinal Flora', 'Sal Understory', 'Rare Botanicals', 'Forest Rights'],
    gallery: [
      {
        id: 'gal-pd1',
        url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80',
        caption: 'Wild Kalmegh and medicinal understory herbs in Netarhat Sal forest',
        author: 'Ethnobotany Field Survey',
        span: 'col-span-2 row-span-2',
      },
      {
        id: 'gal-pd2',
        url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
        caption: 'Handcrafted sun-drying mats for wild-foraged forest roots and leaves',
        author: 'Forest Rights Observer',
      },
    ],
    reviews: [
      {
        id: 'rev-pd1',
        author: 'Dr. Alok Keshri',
        date: '2 days ago',
        rating: 5,
        text: 'Verified Parvati Devi’s native botanical preserve in the Netarhat hills. Incredible repository of wild medicinal flora and traditional tribal pharmacology.',
        verifiedGps: 'Netarhat, Latehar (GPS Verified: 23.6102° N, 84.5022° E)',
      },
    ],
    contactInfo: {
      phone: '+91 94303 55192',
      cooperative: 'Latehar Van Aushadhi & Botanical Custodians Federation',
      address: 'Netarhat Hills, Mahuadanr, Latehar District, Jharkhand 822119',
    },
  },
  {
    id: 'mangra-oraon',
    name: 'Mangra Oraon',
    craftTitle: 'Native Millet (Gondli/Marua) & Wild Tuber Conservator',
    shortBio: 'Upland keeper of indigenous small millets, wild tubers, and drought-resilient flora.',
    fullBio:
      'Conserving disappearing upland dryland flora: Gondli (Little Millet), indigenous forest yams (Gethi Kanda), and climate-hardy native floral pollinators across Gumla.',
    category: 'Indigenous Flora',
    district: 'Gumla',
    state: 'Jharkhand',
    locationName: 'Gumla District, Jharkhand',
    coordinates: { x: 38, y: 68, lat: 23.0438, lng: 84.5422 },
    trustScore: 98,
    trustRating: 4.8,
    verifiedVisits: 18,
    contributionsCount: 47,
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    heroImageUrl:
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
    postcardImageUrl:
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
    artForm: 'Wild Edible Flora & Indigenous Small Millets',
    artDescription:
      'Conserving disappearing upland dryland flora: Gondli (Little Millet), indigenous forest yams (Gethi Kanda), and climate-hardy native floral pollinators.',
    tags: ['Indigenous Crops', 'Gondli Millet', 'Wild Tubers', 'Agrobiodiversity'],
    gallery: [
      {
        id: 'gal-mo1',
        url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
        caption: 'Heirloom Gondli (Little Millet) and wild tubers drying under shaded canopies',
        author: 'Indigenous Seed Network',
        span: 'col-span-2 row-span-2',
      },
    ],
    reviews: [
      {
        id: 'rev-mo1',
        author: 'Suman Tirkey',
        date: '5 days ago',
        rating: 5,
        text: 'Documented Mangra’s traditional dryland seed bank in Gumla. His preservation of wild Gethi tubers and minor millets is vital for climate resilience.',
        verifiedGps: 'Gumla District (GPS Verified: 23.0438° N, 84.5422° E)',
      },
    ],
    contactInfo: {
      phone: '+91 98351 72910',
      cooperative: 'Gumla Tribal Seed & Wild Flora Keepers Sangh',
      address: 'Bishunpur Block, Gumla District, Jharkhand 835231',
    },
  },
];

export const ENCYCLOPEDIA: EncyclopediaEntry[] = [
  {
    id: 'sohrai-khovar',
    title: 'Sohrai & Khovar Mural Arts',
    category: 'Indigenous Mural Painting',
    region: 'Hazaribagh, Jharkhand',
    description:
      "Ritualistic mud wall art recognized with Geographical Indication (GI) status. Practiced exclusively by indigenous matriarchs during the harvest festival 'Sohrai' and the wedding season 'Khovar'.",
    historicalContext:
      'The murals share visual roots with prehistoric rock art found in the caves of Isko, Satpahar, and Thethangi in the Hazaribagh plateau, dating back more than 5,000 years.',
    materialsUsed: [
      'Charak Mati (White Kaolin clay)',
      'Lal Mati (Red hematite iron oxide)',
      'Pila Mati (Yellow ochre)',
      'Kali Mati (Manganese manganese black)',
      'Datun (Bruised wild twig brushes)',
      'Paddy comb scrape tools',
    ],
    culturalSignificance:
      'Celebrates the harmonious bond between humans, sacred animals (Pashupati), and agrarian cycles of nature.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBpH6KffzLoKRc8cGg_rvodT0gbg0KedgdsHOKvili2SNxeQdWCLsm9BVRy8inJlNbH09XmyxCSWPrrdiDZcFmg7XZT0kCYXvOBPDmEFZ84-mu_xVxZ_VWtOu8lfWrGyykOUxJPWqWyYWGOsRUh2-dZu1ALnQujDIRv58mzXQgQRwTN1Psjk7dgRqR7rWV7hRqMLQhPd0N_YnbqHOSq-p0m44qpFSkAY9ALQ1b9aolKhEfE69wyQYg',
  },
  {
    id: 'dokra-metal',
    title: 'Dokra Lost-Wax Bell Metal',
    category: 'Ancient Metallurgy',
    region: 'Dumka & Ranchi, Jharkhand',
    description:
      'Non-ferrous metal casting using lost-wax casting technique that has been used in India for over 4,000 years, characterized by primitive simplicity and enchanting folk motifs.',
    historicalContext:
      'Directly descended from the prehistoric metallurgical tradition of the Indus Valley Civilization.',
    materialsUsed: ['Pure Beeswax', 'Termite Mound Clay', 'Recycled Brass & Bronze', 'River Sand'],
    culturalSignificance:
      'Creates sacred household totems, deity figures, dancing figures, and intricately ornamented jewellery.',
    imageUrl:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'heirloom-agriculture',
    title: 'Indigenous Heirloom Seeds of Chota Nagpur',
    category: 'Agrobiodiversity & Agroecology',
    region: 'Khunti & West Singhbhum',
    description:
      'Ancestral native rice, millet, and pulse varieties preserved through indigenous farmer-to-farmer seed networks.',
    historicalContext:
      'Cultivated for millennia on the undulating plateau terrains of Chota Nagpur, naturally evolved to thrive during irregular monsoons without synthetic inputs.',
    materialsUsed: ['Native Seeds (Desi Beej)', 'Jeevamrit Organic Enriched Compost', 'Rainwater Harvesting Terraces'],
    culturalSignificance:
      'Safeguards food sovereignty, genetic diversity, and climate resilience for tribal communities.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAZvCYssfRmZev96XVDUFeqNFKTnine1SZjT48gfVqo5ocO8Sor2XWB0zOPMjRGYaSlcShKE3OoLQ3AdKkEu-kbt3lItMlBYn_UwWYLZit9K1QvK2__o6lddDFnHtVugJV636BjhRMIxNo8WlgTt74KTqGJ0vmnIcP_dXmN_ITwx98cImDIOUPn1V4nBf-llsZks2lgN8cJTQbDDPjKqf3MF2vGkz9PgDqpdQdEYyeK1E6EpFWcDts',
    botanicalClassification: 'Oryza sativa (Birsa Dhan, Kalamdani, Danigora)',
    ecologicalHabitat: 'Undulating red lateritic soils & rainfed terraced valleys',
    traditionalUse: 'Nutritional heritage grains, sacred tribal offerings, climate-hardy seed saving',
  },
  {
    id: 'indigenous-flora-jharkhand',
    title: 'Rare Ethnobotanical Flora & Native Seed Heritage',
    category: 'Botanical Biodiversity & Medicinal Flora',
    region: 'Netarhat & Saranda Forests, Jharkhand',
    description:
      'The Chota Nagpur plateau is home to over 200 species of native wild food plants, drought-tolerant minor millets (Gondli), and medicinal roots preserved through tribal sacred groves (Sarna).',
    historicalContext:
      'Sarna sacred groves have acted as community-protected gene banks for over 2,000 years, safeguarding native species from deforestation.',
    materialsUsed: ['Desi Gondli Seeds', 'Wild Kalmegh Root', 'Charak Gethi Yams', 'Sarna Grove Soil'],
    culturalSignificance:
      'Ensures nutritional sovereignty, tribal pharmacology, and drought resilience without modern hybrid dependence.',
    imageUrl:
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80',
    botanicalClassification: 'Andrographis paniculata (Kalmegh), Panicum sumatrense (Gondli), Dioscorea spp. (Gethi)',
    ecologicalHabitat: 'Moist Sal (Shorea robusta) forest understory & lateritic plateau uplands',
    traditionalUse: 'Tribal pharmacology, sacred grove seed regeneration, famine resilience & micro-nutrient sovereignty',
  },
];

export const DISTRICT_KNOWLEDGE_DATA: Record<string, DistrictKnowledge> = {
  hazaribagh: {
    districtKey: 'hazaribagh',
    districtName: 'Hazaribagh District',
    state: 'Jharkhand',
    primaryArtForm: 'Sohrai & Khovar Ritual Wall Murals (GI Tagged)',
    heroImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBpH6KffzLoKRc8cGg_rvodT0gbg0KedgdsHOKvili2SNxeQdWCLsm9BVRy8inJlNbH09XmyxCSWPrrdiDZcFmg7XZT0kCYXvOBPDmEFZ84-mu_xVxZ_VWtOu8lfWrGyykOUxJPWqWyYWGOsRUh2-dZu1ALnQujDIRv58mzXQgQRwTN1Psjk7dgRqR7rWV7hRqMLQhPd0N_YnbqHOSq-p0m44qpFSkAY9ALQ1b9aolKhEfE69wyQYg',
    heroCaption: 'Natural earth ochre murals painted by women during post-harvest Sohrai & Khovar wedding cycles',
    history:
      "Hazaribagh's indigenous mural traditions date back over 5,000 years to the prehistoric rock art sites of Isco, Satpahar, and Thethangi. Practiced by tribal women matriarchs (Santhal, Munda, Oraon, Prajapati, and Ganju), this art utilizes 'Dhudhi' white clay and wild red ochre 'Lal Mati' applying motifs using broken datun twigs and cloth rags without chemical paints.",
    culturalSignificance:
      'Traditionally painted onto sun-baked mud walls to celebrate cattle blessing (Pashupati), harvest fertility, and marital unions.',
    indigenousMaterials: [
      'Dhudhi Mati (White Kaolin Clay)',
      'Lal Mati (Red Hematite Ochre)',
      'Pila Mati (Yellow Earth Ochre)',
      'Charcoal & Manganese Black',
      'Wild Neem / Datun Twig Brushes',
      'Paddy Comb Sgraffito Scrapers',
    ],
    subForms: [
      {
        name: 'Khovar Bridal Sgraffito',
        summary: 'Comb-cut sgraffito technique etched onto black and white mud slips during marriage seasons.',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCWzDtyROwXMa51hS3Le6kWkCnluiF5Ip_1Nif1wKNa-1BC4DM1u1SdaHMYP8IfMpLtKKHH_Rv_Aj_1EVc-PSWP_drp4jb3aw-4nqKYECe2jzypACKwwxLCGnO6V4ZBWAjvqdxka-T-mFDii7uUsKfqFTUik_4E9aHC0vTmNTma_vVi-Os5GSE-4RJjSRIyjw3HuIGRjsOy5c8M8xVtTa5J3K_pf_VD_CCAOr6pS6wvRvgPK-KVxZs',
      },
      {
        name: 'Sohrai Harvest Animal Murals',
        summary: 'Painted post-Diwali celebrating horned cattle, sacred peacocks, forest spirits, and fertility.',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBpH6KffzLoKRc8cGg_rvodT0gbg0KedgdsHOKvili2SNxeQdWCLsm9BVRy8inJlNbH09XmyxCSWPrrdiDZcFmg7XZT0kCYXvOBPDmEFZ84-mu_xVxZ_VWtOu8lfWrGyykOUxJPWqWyYWGOsRUh2-dZu1ALnQujDIRv58mzXQgQRwTN1Psjk7dgRqR7rWV7hRqMLQhPd0N_YnbqHOSq-p0m44qpFSkAY9ALQ1b9aolKhEfE69wyQYg',
      },
    ],
  },
  ranchi: {
    districtKey: 'ranchi',
    districtName: 'Ranchi & Khunti Plateau',
    state: 'Jharkhand',
    primaryArtForm: 'Paitkar Scroll Art & Sacred Wood Sculptures',
    heroImage:
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=1000&q=80',
    heroCaption: 'Ancient scroll painting depicting tribal mythology, afterlife journeys, and folk ballads',
    history:
      'Paitkar scroll painting is celebrated as one of the oldest narrative folk traditions of Eastern India. Using gum binders extracted from the neem tree, mahua bark, and pulverized river stones, itinerant bard storytellers sing ancestral legends while unfurling handmade bark and cotton scrolls.',
    culturalSignificance:
      'Serves as community oral memory, ritual mourning rites, and celebrations of ancestral spirits at seasonal council haats.',
    indigenousMaterials: [
      'Neem Tree Gum Binder',
      'Mahua Tree Bark Pigment',
      'Crushed Laterite Mineral Stone',
      'Wild Goat Hair Quill Brushes',
      'Handmade Rice Straw Bark Paper',
    ],
    subForms: [
      {
        name: 'Paitkar Narrative Scrolls',
        summary: 'Step-by-step pictorial panels recounting Santhal epics and moral journeys of departed souls.',
      },
      {
        name: 'Munda Karam Totem Carving',
        summary: 'Sacred ritualistic poles and grain storage pillars carved from venerable Sal and Karam timber.',
      },
    ],
  },
  khunti: {
    districtKey: 'khunti',
    districtName: 'Khunti Agro-Heritage Cluster',
    state: 'Jharkhand',
    primaryArtForm: 'Indigenous Heirloom Seed Banking & Organic Paddy',
    heroImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAZvCYssfRmZev96XVDUFeqNFKTnine1SZjT48gfVqo5ocO8Sor2XWB0zOPMjRGYaSlcShKE3OoLQ3AdKkEu-kbt3lItMlBYn_UwWYLZit9K1QvK2__o6lddDFnHtVugJV636BjhRMIxNo8WlgTt74KTqGJ0vmnIcP_dXmN_ITwx98cImDIOUPn1V4nBf-llsZks2lgN8cJTQbDDPjKqf3MF2vGkz9PgDqpdQdEYyeK1E6EpFWcDts',
    heroCaption: 'Preservation of over 30 indigenous drought-resilient rice & minor millet landraces',
    history:
      'Khunti is the historic heartland of the Munda community and the legendary freedom fighter Birsa Munda. For centuries, farmers here have nurtured rainfed terraced valleys without chemical pesticides, breeding resilient indigenous varieties that withstand extreme climatic fluctuations.',
    culturalSignificance:
      'Sustains tribal self-sufficiency, sacred Sarhul seed-blessing festivals, and community grain sharing networks.',
    indigenousMaterials: [
      'Birsa Dhan & Danigora Seeds',
      'Kalamdani Aromatic Landrace',
      'Jeevamrit Fermented Bio-compost',
      'Woven Bamboo Seed Storage Morhas',
    ],
    subForms: [
      {
        name: 'Community Seed Banks',
        summary: 'Peer-to-peer exchange networks safeguarding disappearing ancestral germplasm.',
      },
      {
        name: 'Biodynamic Agro-Forestry',
        summary: 'Multi-tiered cultivation of pulses, dryland yams, and lac host trees (Kusum & Ber).',
      },
    ],
  },
  dumka: {
    districtKey: 'dumka',
    districtName: 'Dumka & Santhal Pargana',
    state: 'Jharkhand',
    primaryArtForm: 'Santhali Bamboo Weaving & Terracotta Haat Crafts',
    heroImage:
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    heroCaption: 'Intricate bamboo winnowing fans, grain vessels, and earthen ritual pottery',
    history:
      'In the forested hills of Dumka and Rajmahal, Santhali artisans have perfected sustainable bamboo craftsmanship over generations. Selecting green hillside bamboo, they create lightweight, flexible, and extremely durable tools for fishing, agriculture, and music.',
    culturalSignificance:
      'Essential for agrarian self-reliance, Baha spring dance celebrations, and weekly village haat markets.',
    indigenousMaterials: [
      'Green Hill Bamboo (Bans)',
      'Wild Sal Tree Leaf Twine',
      'River Silt Red Clay',
      'Mustard Seed Polishing Oil',
    ],
    subForms: [
      {
        name: 'Kula & Dala Grain Baskets',
        summary: 'Precision geometric basketry woven to store heirloom grains resistant to insect pests.',
      },
      {
        name: 'Tirio & Tumdak Instruments',
        summary: 'Tribal bamboo flutes and terracotta two-sided drums tuned to sacred rhythms.',
      },
    ],
  },
  'east-singhbhum': {
    districtKey: 'east-singhbhum',
    districtName: 'East Singhbhum (Ghatshila)',
    state: 'Jharkhand',
    primaryArtForm: 'Dhokra Lost-Wax Bell Metal Casting',
    heroImage:
      'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=1000&q=80',
    heroCaption: 'Ancient non-ferrous lost-wax metal figurines crafted with beeswax threads',
    history:
      'Dhokra casting is an ancient lost-wax technique practiced by nomadic Malhor and metallurgical artisans in Ghatshila and Singhbhum for more than 4,000 years, retaining unbroken stylistic ties with the Indus Valley Dancing Girl figurine.',
    culturalSignificance:
      'Crafts protective village guardian totems, deity figurines, measuring vessels (Paila), and ceremonial jewelry.',
    indigenousMaterials: [
      'Natural Forest Beeswax',
      'Anthill Mud & Clay Cores',
      'Recycled Bell Metal & Brass',
      'Rice Husk Fuel for Kiln Smelting',
    ],
    subForms: [
      {
        name: 'Tribal Deities & Elephants',
        summary: 'Filigree-detailed bell metal totems representing forest gods and elephants.',
      },
      {
        name: 'Dokra Paila Measuring Bowls',
        summary: 'Traditional heirloom grain measurement vessels etched with geometric spiral motifs.',
      },
    ],
  },
  gumla: {
    districtKey: 'gumla',
    districtName: 'Gumla & Netarhat Hills',
    state: 'Jharkhand',
    primaryArtForm: 'Rare Ethnobotanical Flora & Wild Millets',
    heroImage:
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=80',
    heroCaption: 'Medicinal forest flora, wild tubers (Gethi), and drought-hardy Gondli millets',
    history:
      'Surrounded by pristine sal forests and bauxite plateaus (Pats), Gumla preserves ancestral ethnobotanical pharmacology. Asur and Oraon elders maintain sacred Sarna groves that protect wild food flora, rare medicinal roots (Kalmegh, Satavar), and climate-hardy minor millets.',
    culturalSignificance:
      'Supplies wild nutritional sovereignty, natural remedies, and sacred herbal offerings during seasonal festivals.',
    indigenousMaterials: [
      'Gondli (Little Millet Landraces)',
      'Wild Kalmegh & Satavar Roots',
      'Charak Gethi Forest Yams',
      'Mahua Blossom Nectar',
    ],
    subForms: [
      {
        name: 'Sarna Sacred Grove Conservation',
        summary: 'Community forest reserves strictly protected as living wild gene sanctuaries.',
      },
      {
        name: 'Indigenous Minor Millets',
        summary: 'Cultivation of ultra-low water requirement Gondli and Madua grains.',
      },
    ],
  },
};

