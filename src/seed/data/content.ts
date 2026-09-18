export const MOD_PROJECTS = [
  {
    title: 'Honda CG 125 Cafe Racer Build',
    slug: 'honda-cg-125-cafe-racer-build',
    brand: 'honda',
    model: 'cg-125',
    type: 'cafe-racer' as const,
    cost: 95000,
    featured: true,
    parts: [
      'cafe-racer-handlebar',
      'custom-round-headlight',
      'stainless-performance-exhaust',
      'custom-cafe-seat',
      'custom-indicators-led',
    ],
    summary:
      'A clipped cafe conversion with round headlight, stainless exhaust, and a compact cafe seat for weekend runs.',
    details: [
      'Starting from a stock CG 125, we lowered the bars, tidied the rear, and upgraded lighting for a cleaner silhouette.',
      'All parts were selected for verified CG 125 mounting points and everyday reliability.',
    ],
  },
  {
    title: 'Honda CD 70 Custom Street Build',
    slug: 'honda-cd-70-custom-street-build',
    brand: 'honda',
    model: 'cd-70',
    type: 'custom' as const,
    cost: 48000,
    featured: true,
    parts: ['honda-cd-70-side-mirror-set', 'led-headlight-upgrade-kit', 'reflective-rim-tape', 'premium-handlebar-grips'],
    summary: 'A practical custom street look for the CD 70 without sacrificing daily commuting usability.',
    details: [
      'Focus areas: visibility, grips, and subtle decoration that still works for school and office runs.',
    ],
  },
  {
    title: 'Yamaha YBR 125 Touring Setup',
    slug: 'yamaha-ybr-125-touring-setup',
    brand: 'yamaha',
    model: 'ybr-125',
    type: 'touring' as const,
    cost: 72000,
    featured: true,
    parts: [
      'yamaha-ybr-125-touring-carrier',
      'motorcycle-luggage-bag',
      'yamaha-ybr-125-disc-brake-pad-set',
      'full-face-riding-helmet',
      'led-auxiliary-lights',
    ],
    summary: 'Long-ride package with carrier capacity, safer brakes, aux lighting, and proper riding gear.',
    details: [
      'Built for intercity weekends: luggage support up front in planning, then braking and lighting upgrades.',
    ],
  },
  {
    title: 'Yamaha YBR 125G Adventure Setup',
    slug: 'yamaha-ybr-125g-adventure-setup',
    brand: 'yamaha',
    model: 'ybr-125g',
    type: 'touring' as const,
    cost: 86000,
    featured: true,
    parts: [
      'yamaha-ybr-125-touring-carrier',
      'led-auxiliary-lights',
      'rear-shock-absorber-pair',
      'riding-jacket',
      'bike-security-lock',
    ],
    summary: 'Light adventure touring setup with suspension attention, lighting, and protective gear.',
    details: [
      'Ideal for mixed tarmac and rough city edges — prioritising control and visibility.',
    ],
  },
  {
    title: 'Suzuki GS 150 Touring Build',
    slug: 'suzuki-gs-150-touring-build',
    brand: 'suzuki',
    model: 'gs-150',
    type: 'touring' as const,
    cost: 78000,
    featured: false,
    parts: [
      'suzuki-gs-150-brake-pads',
      'motorcycle-luggage-bag',
      'full-face-riding-helmet',
      'stainless-performance-exhaust',
    ],
    summary: 'Touring-focused GS 150 with braking confidence, luggage, and a refined exhaust note.',
    details: ['Balanced for highway comfort rather than extreme performance.'],
  },
  {
    title: 'Honda CB 150F Sport Modification',
    slug: 'honda-cb-150f-sport-modification',
    brand: 'honda',
    model: 'cb-150f',
    type: 'performance' as const,
    cost: 88000,
    featured: true,
    parts: [
      'honda-cb-150f-performance-air-filter',
      'stainless-performance-exhaust',
      'honda-cb-150f-disc-brake-pads',
      'led-headlight-upgrade-kit',
      'custom-foot-pegs',
    ],
    summary: 'Street-sport package for CB 150F: breathing, exhaust, brakes, and sharper controls.',
    details: ['Keeps the bike street-legal while sharpening mid-range response and night visibility.'],
  },
  {
    title: 'Suzuki GD 110S Daily Refresh',
    slug: 'suzuki-gd-110s-daily-refresh',
    brand: 'suzuki',
    model: 'gd-110s',
    type: 'cosmetic' as const,
    cost: 32000,
    featured: false,
    parts: [
      'suzuki-gd-110s-brake-shoes',
      'suzuki-gd-110s-air-filter',
      'led-headlight-upgrade-kit',
      'universal-seat-cover',
    ],
    summary: 'Reliability and visibility refresh for a hard-working GD 110S.',
    details: ['Service parts first, then lighting and seat presentation.'],
  },
  {
    title: 'Honda CG 125 Restoration Base Build',
    slug: 'cg-125-restoration-base-build',
    brand: 'honda',
    model: 'cg-125',
    type: 'restoration' as const,
    cost: 105000,
    featured: false,
    parts: [
      'honda-cg-125-piston-kit',
      'honda-cg-125-clutch-plate-set',
      'honda-cg-125-brake-shoes',
      'honda-cg-125-chain-sprocket-kit',
      'engine-oil-filter-universal',
    ],
    summary: 'Foundation restoration focusing on engine, clutch, brakes, and drive before styling.',
    details: ['Mechanical health first — cosmetics come after compression and stopping power return.'],
  },
]

export const BLOG_POSTS = [
  {
    title: 'How to Choose the Right Spare Parts for Your Motorcycle',
    slug: 'how-to-choose-the-right-spare-parts',
    excerpt: 'A practical checklist for matching OEM-quality parts to your exact bike model.',
    accent: '#E10600',
    sections: [
      {
        heading: 'Start with exact fitment',
        paragraphs: [
          'Always confirm brand and model before buying. A CG 125 piston is not interchangeable with a CD 70 kit even when sizes look similar.',
          'Use the bike finder on MotoForge to filter products by brand, model, and category before you compare prices.',
        ],
      },
      {
        heading: 'Read the specifications',
        paragraphs: [
          'Check SKU, warranty notes, and whether kits include rings, gaskets, or hardware. Incomplete kits create workshop delays.',
        ],
      },
      {
        heading: 'Balance price and quality',
        paragraphs: [
          'The cheapest option often costs more when it fails early. Prefer parts with clear compatibility and inspected packaging.',
        ],
      },
    ],
  },
  {
    title: 'Honda CD 70 Maintenance Guide',
    slug: 'honda-cd-70-maintenance-guide',
    excerpt: 'Weekly and monthly checks that keep a CD 70 reliable for daily commuting.',
    accent: '#0EA5E9',
    sections: [
      {
        heading: 'Weekly checks',
        paragraphs: [
          'Inspect tyre pressure, chain slack, brake shoe wear indicators, and headlight function before long weeks of riding.',
        ],
      },
      {
        heading: 'Monthly service habits',
        paragraphs: [
          'Clean and lube the chain, check clutch bite, and replace the air filter if you ride dusty routes.',
          'Spark plugs and cables are inexpensive insurance against hard starts.',
        ],
      },
    ],
  },
  {
    title: 'Honda CG 125 Modification Ideas',
    slug: 'honda-cg-125-modification-ideas',
    excerpt: 'Cafe, touring, and cosmetic upgrade paths that stay practical for street use.',
    accent: '#A855F7',
    sections: [
      {
        heading: 'Cafe direction',
        paragraphs: [
          'Bars, round headlight, seat, and tail tidy transform the silhouette quickly when fitment is verified.',
        ],
      },
      {
        heading: 'Touring direction',
        paragraphs: [
          'Crash guards, carriers, and better lighting matter more than exhaust noise for real-world travel.',
        ],
      },
    ],
  },
  {
    title: 'Best Accessories for Yamaha YBR 125',
    slug: 'best-accessories-yamaha-ybr-125',
    excerpt: 'Phone mounts, carriers, covers, and lighting upgrades that riders actually use.',
    accent: '#2563EB',
    sections: [
      {
        heading: 'Everyday essentials',
        paragraphs: [
          'A secure phone holder, USB charger, and waterproof cover deliver more value than decorative kits alone.',
        ],
      },
      {
        heading: 'Touring add-ons',
        paragraphs: [
          'Rear carriers and aux lights turn the YBR into a capable weekend tourer without major engine work.',
        ],
      },
    ],
  },
  {
    title: 'Suzuki GS 150 Touring Setup Guide',
    slug: 'suzuki-gs-150-touring-setup-guide',
    excerpt: 'How to prepare a GS 150 for highway weekends with luggage and safety upgrades.',
    accent: '#F59E0B',
    sections: [
      {
        heading: 'Brakes first',
        paragraphs: [
          'Fresh pads and correctly adjusted free play matter before you add luggage weight.',
        ],
      },
      {
        heading: 'Luggage and comfort',
        paragraphs: [
          'A stable rear bag and a proper helmet/jacket combination reduce fatigue on longer runs.',
        ],
      },
    ],
  },
  {
    title: 'How to Know When Your Bike Brake Shoes Need Replacement',
    slug: 'when-to-replace-motorcycle-brake-shoes',
    excerpt: 'Wear signs, stopping distance changes, and inspection tips for drum brakes.',
    accent: '#EF4444',
    sections: [
      {
        heading: 'Warning signs',
        paragraphs: [
          'Longer stopping distances, metal-on-metal sounds, and thin lining visible through inspection windows mean it is time to replace shoes.',
        ],
      },
      {
        heading: 'Replace both sides',
        paragraphs: [
          'Always replace shoes as a set and check cable free play after installation.',
        ],
      },
    ],
  },
  {
    title: 'Motorcycle Chain Maintenance Guide',
    slug: 'motorcycle-chain-maintenance-guide',
    excerpt: 'Clean, lube, and adjust your drive chain to extend sprocket life.',
    accent: '#84CC16',
    sections: [
      {
        heading: 'Cleaning routine',
        paragraphs: [
          'Brush off grit before applying lube. Dirty lube becomes grinding paste.',
        ],
      },
      {
        heading: 'Correct slack',
        paragraphs: [
          'Follow your model’s slack range. Too tight destroys bearings; too loose risks derailment.',
        ],
      },
    ],
  },
  {
    title: 'LED vs Halogen Motorcycle Headlights',
    slug: 'led-vs-halogen-motorcycle-headlights',
    excerpt: 'Brightness, heat, wiring considerations, and when an LED upgrade makes sense.',
    accent: '#38BDF8',
    sections: [
      {
        heading: 'When LED wins',
        paragraphs: [
          'LED upgrades help night riders if the beam pattern is controlled and the electrical system can support the draw.',
        ],
      },
      {
        heading: 'Fitment caution',
        paragraphs: [
          'Use kits designed for motorcycle housings. Poor adapters cause flicker and early failures.',
        ],
      },
    ],
  },
  {
    title: 'Essential Motorcycle Accessories for Daily Riders',
    slug: 'essential-motorcycle-accessories-daily-riders',
    excerpt: 'The short list of accessories that improve safety and convenience every day.',
    accent: '#E10600',
    sections: [
      {
        heading: 'Must-haves',
        paragraphs: [
          'Mirrors in good condition, a phone mount, USB power, and a weather cover cover most daily pain points.',
        ],
      },
      {
        heading: 'Nice-to-haves',
        paragraphs: [
          'Crash guards and tank pads protect the bike when parking is chaotic.',
        ],
      },
    ],
  },
  {
    title: 'How to Choose the Right Motorcycle Helmet',
    slug: 'how-to-choose-the-right-motorcycle-helmet',
    excerpt: 'Fit, ventilation, visor quality, and replacement intervals for safer riding.',
    accent: '#DC2626',
    sections: [
      {
        heading: 'Fit is everything',
        paragraphs: [
          'A helmet should feel snug without hot spots. Cheek pads settle slightly after a few rides.',
        ],
      },
      {
        heading: 'Replace after impacts',
        paragraphs: [
          'Any significant drop or crash means replacement — foam liners do not reset.',
        ],
      },
    ],
  },
]
