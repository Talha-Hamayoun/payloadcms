export const BRANDS = [
  {
    name: 'Honda',
    slug: 'honda',
    description:
      'Honda motorcycles are known for reliability, efficient engines, and widespread spare-part availability across Pakistan.',
    accent: '#E10600',
  },
  {
    name: 'Yamaha',
    slug: 'yamaha',
    description:
      'Yamaha delivers sporty commuting platforms with strong aftermarket support for YBR and related models.',
    accent: '#2563EB',
  },
  {
    name: 'Suzuki',
    slug: 'suzuki',
    description:
      'Suzuki offers durable daily riders and touring-friendly bikes with accessible service parts.',
    accent: '#F59E0B',
  },
  {
    name: 'United',
    slug: 'united',
    description: 'Popular local motorcycle brand with value-focused models and common fitment parts.',
    accent: '#16A34A',
  },
  {
    name: 'Road Prince',
    slug: 'road-prince',
    description: 'Widely used local motorcycles with growing demand for spare parts and accessories.',
    accent: '#7C3AED',
  },
] as const

export const BIKES = [
  { brand: 'honda', name: 'CD 70', slug: 'cd-70', engineCapacity: '70cc', yearFrom: 2015, yearTo: 2025 },
  { brand: 'honda', name: 'CG 125', slug: 'cg-125', engineCapacity: '125cc', yearFrom: 2016, yearTo: 2025 },
  { brand: 'honda', name: 'CB 125F', slug: 'cb-125f', engineCapacity: '125cc', yearFrom: 2019, yearTo: 2025 },
  { brand: 'honda', name: 'CB 150F', slug: 'cb-150f', engineCapacity: '150cc', yearFrom: 2020, yearTo: 2025 },
  { brand: 'yamaha', name: 'YBR 125', slug: 'ybr-125', engineCapacity: '125cc', yearFrom: 2015, yearTo: 2025 },
  { brand: 'yamaha', name: 'YBR 125G', slug: 'ybr-125g', engineCapacity: '125cc', yearFrom: 2018, yearTo: 2025 },
  { brand: 'yamaha', name: 'YB 125Z', slug: 'yb-125z', engineCapacity: '125cc', yearFrom: 2017, yearTo: 2025 },
  { brand: 'suzuki', name: 'GD 110S', slug: 'gd-110s', engineCapacity: '110cc', yearFrom: 2016, yearTo: 2025 },
  { brand: 'suzuki', name: 'GS 150', slug: 'gs-150', engineCapacity: '150cc', yearFrom: 2015, yearTo: 2024 },
  { brand: 'suzuki', name: 'GR 150', slug: 'gr-150', engineCapacity: '150cc', yearFrom: 2018, yearTo: 2025 },
] as const

type CatNode = {
  name: string
  slug: string
  description: string
  sortOrder: number
  children?: { name: string; slug: string; description: string; sortOrder: number }[]
}

export const CATEGORY_TREE: CatNode[] = [
  {
    name: 'Engine Parts',
    slug: 'engine-parts',
    description: 'Pistons, cylinders, valves, clutch parts, gaskets and engine bearings.',
    sortOrder: 10,
    children: [
      { name: 'Piston & Cylinder', slug: 'piston-cylinder', description: 'Piston kits and cylinder assemblies.', sortOrder: 11 },
      { name: 'Piston Rings', slug: 'piston-rings', description: 'OEM-spec and performance piston ring sets.', sortOrder: 12 },
      { name: 'Valves', slug: 'valves', description: 'Intake and exhaust valves for motorcycle engines.', sortOrder: 13 },
      { name: 'Camshaft', slug: 'camshaft', description: 'Camshafts and related timing hardware.', sortOrder: 14 },
      { name: 'Timing Parts', slug: 'timing-parts', description: 'Timing chains, tensioners and guides.', sortOrder: 15 },
      { name: 'Clutch Parts', slug: 'clutch-parts', description: 'Clutch plates, springs and baskets.', sortOrder: 16 },
      { name: 'Gaskets', slug: 'gaskets', description: 'Head, base and cover gasket sets.', sortOrder: 17 },
      { name: 'Engine Bearings', slug: 'engine-bearings', description: 'Crank and transmission bearings.', sortOrder: 18 },
    ],
  },
  {
    name: 'Brake System',
    slug: 'brake-system',
    description: 'Pads, shoes, discs, cables and levers for safer stopping.',
    sortOrder: 20,
    children: [
      { name: 'Brake Pads', slug: 'brake-pads', description: 'Disc brake pad sets.', sortOrder: 21 },
      { name: 'Brake Shoes', slug: 'brake-shoes', description: 'Drum brake shoe sets.', sortOrder: 22 },
      { name: 'Brake Discs', slug: 'brake-discs', description: 'Front and rear brake rotors.', sortOrder: 23 },
      { name: 'Brake Cables', slug: 'brake-cables', description: 'Front and rear brake cables.', sortOrder: 24 },
      { name: 'Brake Levers', slug: 'brake-levers', description: 'Replacement and adjustable brake levers.', sortOrder: 25 },
    ],
  },
  {
    name: 'Electrical Parts',
    slug: 'electrical-parts',
    description: 'Lighting, ignition, batteries, wiring and switches.',
    sortOrder: 30,
    children: [
      { name: 'Headlights', slug: 'headlights', description: 'Halogen and LED motorcycle headlights.', sortOrder: 31 },
      { name: 'Indicators', slug: 'indicators', description: 'Turn signal assemblies and LED indicators.', sortOrder: 32 },
      { name: 'Tail Lights', slug: 'tail-lights', description: 'Stop and tail lamp units.', sortOrder: 33 },
      { name: 'Spark Plugs', slug: 'spark-plugs', description: 'Standard and iridium spark plugs.', sortOrder: 34 },
      { name: 'Ignition Coils', slug: 'ignition-coils', description: 'Ignition coils and CDI related parts.', sortOrder: 35 },
      { name: 'Batteries', slug: 'batteries', description: 'Motorcycle batteries for daily riders.', sortOrder: 36 },
      { name: 'Horns', slug: 'horns', description: 'Electric horns and dual-tone kits.', sortOrder: 37 },
      { name: 'Switches', slug: 'switches', description: 'Handlebar and ignition switch assemblies.', sortOrder: 38 },
    ],
  },
  {
    name: 'Suspension',
    slug: 'suspension',
    description: 'Front forks, rear shocks and related components.',
    sortOrder: 40,
    children: [
      { name: 'Front Forks', slug: 'front-forks', description: 'Fork tubes and seal kits.', sortOrder: 41 },
      { name: 'Rear Shocks', slug: 'rear-shocks', description: 'Rear shock absorbers.', sortOrder: 42 },
      { name: 'Suspension Components', slug: 'suspension-components', description: 'Bushings, linkages and mounts.', sortOrder: 43 },
    ],
  },
  {
    name: 'Exhaust',
    slug: 'exhaust',
    description: 'Standard and performance exhaust systems.',
    sortOrder: 50,
    children: [
      { name: 'Standard Exhausts', slug: 'standard-exhausts', description: 'OEM-style silencers and full systems.', sortOrder: 51 },
      { name: 'Performance Exhausts', slug: 'performance-exhausts', description: 'Street-legal performance silencers.', sortOrder: 52 },
      { name: 'Exhaust Accessories', slug: 'exhaust-accessories', description: 'Gaskets, clamps and heat shields.', sortOrder: 53 },
    ],
  },
  {
    name: 'Body Parts',
    slug: 'body-parts',
    description: 'Tanks, covers, mudguards, seats and fairings.',
    sortOrder: 60,
    children: [
      { name: 'Fuel Tanks', slug: 'fuel-tanks', description: 'Fuel tanks and caps.', sortOrder: 61 },
      { name: 'Side Covers', slug: 'side-covers', description: 'Side panels and decorative covers.', sortOrder: 62 },
      { name: 'Mudguards', slug: 'mudguards', description: 'Front and rear mudguards.', sortOrder: 63 },
      { name: 'Seats', slug: 'seats', description: 'Seat assemblies and covers.', sortOrder: 64 },
      { name: 'Chain Covers', slug: 'chain-covers', description: 'Chain cases and guards.', sortOrder: 65 },
    ],
  },
  {
    name: 'Transmission & Drive',
    slug: 'transmission-drive',
    description: 'Chains, sprockets and drive components.',
    sortOrder: 70,
    children: [
      { name: 'Chains', slug: 'chains', description: 'Drive chains for 70–150cc motorcycles.', sortOrder: 71 },
      { name: 'Sprockets', slug: 'sprockets', description: 'Front and rear sprockets.', sortOrder: 72 },
      { name: 'Chain Sprocket Kits', slug: 'chain-sprocket-kits', description: 'Matched chain and sprocket kits.', sortOrder: 73 },
    ],
  },
  {
    name: 'Wheels & Tyres',
    slug: 'wheels-tyres',
    description: 'Tyres, tubes, rims and wheel bearings.',
    sortOrder: 80,
    children: [
      { name: 'Tyres', slug: 'tyres', description: 'Front and rear motorcycle tyres.', sortOrder: 81 },
      { name: 'Tubes', slug: 'tubes', description: 'Inner tubes.', sortOrder: 82 },
      { name: 'Wheel Bearings', slug: 'wheel-bearings', description: 'Hub and wheel bearings.', sortOrder: 83 },
    ],
  },
  {
    name: 'Controls',
    slug: 'controls',
    description: 'Handlebars, grips, levers, cables and foot rests.',
    sortOrder: 90,
    children: [
      { name: 'Handlebars', slug: 'handlebars', description: 'Standard and cafe-style bars.', sortOrder: 91 },
      { name: 'Grips', slug: 'grips', description: 'Handlebar grips and throttle tubes.', sortOrder: 92 },
      { name: 'Levers', slug: 'levers', description: 'Clutch and brake levers.', sortOrder: 93 },
      { name: 'Cables', slug: 'cables', description: 'Throttle, clutch and speedo cables.', sortOrder: 94 },
      { name: 'Foot Rests', slug: 'foot-rests', description: 'Foot pegs and rest assemblies.', sortOrder: 95 },
    ],
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Mirrors, covers, holders, luggage and security gear.',
    sortOrder: 100,
    children: [
      { name: 'Mirrors', slug: 'mirrors', description: 'Side mirrors and custom mirror sets.', sortOrder: 101 },
      { name: 'Mobile Holders', slug: 'mobile-holders', description: 'Phone mounts for motorcycles.', sortOrder: 102 },
      { name: 'Bike Covers', slug: 'bike-covers', description: 'Waterproof and dust bike covers.', sortOrder: 103 },
      { name: 'Tank Pads', slug: 'tank-pads', description: 'Protective and decorative tank pads.', sortOrder: 104 },
      { name: 'Crash Guards', slug: 'crash-guards', description: 'Engine and body crash guards.', sortOrder: 105 },
      { name: 'Luggage', slug: 'luggage', description: 'Tank bags and rear luggage.', sortOrder: 106 },
      { name: 'USB Chargers', slug: 'usb-chargers', description: 'Handlebar USB charging sockets.', sortOrder: 107 },
      { name: 'Security Accessories', slug: 'security-accessories', description: 'Locks and anti-theft gear.', sortOrder: 108 },
    ],
  },
  {
    name: 'Bike Decorations',
    slug: 'bike-decorations',
    description: 'LED kits, stickers, rim tapes and decorative covers.',
    sortOrder: 110,
    children: [
      { name: 'Decorative Lights', slug: 'decorative-lights', description: 'LED accent and underglow kits.', sortOrder: 111 },
      { name: 'Stickers & Decals', slug: 'stickers-decals', description: 'Tank and body decals.', sortOrder: 112 },
      { name: 'Rim Tapes', slug: 'rim-tapes', description: 'Reflective and coloured rim tapes.', sortOrder: 113 },
      { name: 'Decorative Covers', slug: 'decorative-covers', description: 'Lever and handlebar decorative covers.', sortOrder: 114 },
    ],
  },
  {
    name: 'Performance Parts',
    slug: 'performance-parts',
    description: 'High-flow filters, performance exhausts and ignition upgrades.',
    sortOrder: 120,
    children: [
      { name: 'Performance Air Filters', slug: 'performance-air-filters', description: 'High-flow air filters.', sortOrder: 121 },
      { name: 'Performance Ignition', slug: 'performance-ignition', description: 'Performance plugs and coils.', sortOrder: 122 },
    ],
  },
  {
    name: 'Maintenance',
    slug: 'maintenance',
    description: 'Cleaning, chain care, tools and service filters.',
    sortOrder: 130,
    children: [
      { name: 'Chain Care', slug: 'chain-care', description: 'Chain lube and cleaning kits.', sortOrder: 131 },
      { name: 'Cleaning Accessories', slug: 'cleaning-accessories', description: 'Wash and detailing products.', sortOrder: 132 },
      { name: 'Service Filters', slug: 'service-filters', description: 'Oil and air service filters.', sortOrder: 133 },
    ],
  },
  {
    name: 'Riding Gear',
    slug: 'riding-gear',
    description: 'Helmets, gloves, jackets and protective gear.',
    sortOrder: 140,
    children: [
      { name: 'Helmets', slug: 'helmets', description: 'Full-face and open-face helmets.', sortOrder: 141 },
      { name: 'Gloves', slug: 'gloves', description: 'Riding gloves for daily and touring use.', sortOrder: 142 },
      { name: 'Riding Jackets', slug: 'riding-jackets', description: 'Protective riding jackets.', sortOrder: 143 },
    ],
  },
]
