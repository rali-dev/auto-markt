import type { Prisma } from '../src/generated/prisma/client';

export const productsList: Prisma.ProductCreateInput[] = [
  {
    name: 'CS-380 Big Brake Kit',
    description:
      'Six-piston monobloc calipers with 380 mm slotted discs. Designed for repeated hard braking on track days without fade.',
    price: 1299.0,
    image: 'products/brake-kit-cs380.jpg',
    brand: 'ApexSport',
    category: 'BRAKES',
    stripePriceId: 'price_test_brake_kit_cs380',
    isFeatured: true,
  },
  {
    name: 'Ceramic Brake Pad Set (Front Axle)',
    description:
      'Low-dust ceramic compound with a stable friction coefficient from cold. A quiet everyday upgrade over stock pads.',
    price: 189.9,
    image: 'products/brake-pads-ceramic.jpg',
    brand: 'ApexSport',
    category: 'BRAKES',
    stripePriceId: 'price_test_brake_pads_ceramic',
    isFeatured: false,
  },
  {
    name: 'Steel Braided Brake Line Kit',
    description:
      'PTFE lines in a stainless steel sleeve. Removes the spongy pedal feel of ageing rubber hoses under high pressure.',
    price: 129.0,
    image: 'products/brake-lines-braided.jpg',
    brand: 'RaceTech',
    category: 'BRAKES',
    stripePriceId: 'price_test_brake_lines_braided',
    isFeatured: false,
  },

  {
    name: 'Coilover Kit Street & Track',
    description:
      'Height adjustable coilovers with 16-way rebound damping. One setup for the daily commute and the weekend circuit.',
    price: 1549.0,
    image: 'products/coilover-kit.jpg',
    brand: 'ApexSport',
    category: 'SUSPENSION',
    stripePriceId: 'price_test_coilover_kit',
    isFeatured: true,
  },
  {
    name: 'Front Strut Tower Brace',
    description:
      'Aluminium brace that ties both strut towers together and noticeably sharpens turn-in response.',
    price: 219.0,
    image: 'products/strut-tower-brace.jpg',
    brand: 'ApexSport',
    category: 'SUSPENSION',
    stripePriceId: 'price_test_strut_tower_brace',
    isFeatured: false,
  },
  {
    name: 'Adjustable Anti-Roll Bar Set',
    description:
      'Front and rear bars with three mounting positions each, so understeer and oversteer can be dialled in at the track.',
    price: 389.0,
    image: 'products/anti-roll-bar-set.jpg',
    brand: 'Torque Dynamics',
    category: 'SUSPENSION',
    stripePriceId: 'price_test_anti_roll_bar_set',
    isFeatured: false,
  },

  {
    name: 'Cat-Back Exhaust System Titanium',
    description:
      'Full titanium cat-back system, 11 kg lighter than the factory unit, with a valve-controlled rear silencer.',
    price: 1899.0,
    image: 'products/exhaust-catback-titanium.jpg',
    brand: 'Torque Dynamics',
    category: 'EXHAUST',
    stripePriceId: 'price_test_exhaust_catback_titanium',
    isFeatured: true,
  },
  {
    name: 'Sport Downpipe 200 Cell',
    description:
      'Mandrel-bent downpipe with a 200 cell metallic catalyst. Cuts back pressure while keeping the car street legal.',
    price: 649.0,
    image: 'products/downpipe-200cell.jpg',
    brand: 'Torque Dynamics',
    category: 'EXHAUST',
    stripePriceId: 'price_test_downpipe_200cell',
    isFeatured: false,
  },
  {
    name: 'Carbon Exhaust Tip Set',
    description:
      'Pair of matte carbon fibre tips with a brushed stainless inner sleeve. Bolt-on fitment, no welding required.',
    price: 249.0,
    image: 'products/exhaust-tips-carbon.jpg',
    brand: 'Carbonis',
    category: 'EXHAUST',
    stripePriceId: 'price_test_exhaust_tips_carbon',
    isFeatured: false,
  },

  {
    name: 'VF-7 Forged Wheel 19"',
    description:
      'Single-piece forged wheel, 9.2 kg per rim in 19 x 8.5. Sold individually so odd staggered setups stay possible.',
    price: 899.0,
    image: 'products/wheel-vf7-19.jpg',
    brand: 'Velocity Forged',
    category: 'WHEELS',
    stripePriceId: 'price_test_wheel_vf7_19',
    isFeatured: false,
  },
  {
    name: 'Titanium Wheel Bolt Set',
    description:
      'Twenty grade 5 titanium bolts that save roughly 1.1 kg of unsprung mass across all four corners.',
    price: 179.0,
    image: 'products/wheel-bolts-titanium.jpg',
    brand: 'Velocity Forged',
    category: 'WHEELS',
    stripePriceId: 'price_test_wheel_bolts_titanium',
    isFeatured: false,
  },
  {
    name: 'Hub Centric Spacer Set 15 mm',
    description:
      'CNC machined aluminium spacers with an integrated centring ring. Widens the track without introducing vibration.',
    price: 119.0,
    image: 'products/wheel-spacers-15mm.jpg',
    brand: 'Velocity Forged',
    category: 'WHEELS',
    stripePriceId: 'price_test_wheel_spacers_15mm',
    isFeatured: false,
  },

  {
    name: 'Stage 2 Turbocharger Upgrade',
    description:
      'Billet compressor wheel turbo on the factory manifold position. Around 120 hp over stock on the matching map.',
    price: 2450.0,
    image: 'products/turbo-stage2.jpg',
    brand: 'RaceTech',
    category: 'ENGINE',
    stripePriceId: 'price_test_turbo_stage2',
    isFeatured: true,
  },
  {
    name: 'Forged Piston Set 2.0T',
    description:
      'Four 2618 alloy forged pistons with rings and pins, sized for boost levels the cast originals will not survive.',
    price: 1149.0,
    image: 'products/pistons-forged-20t.jpg',
    brand: 'Pistonworks',
    category: 'ENGINE',
    stripePriceId: 'price_test_pistons_forged_20t',
    isFeatured: false,
  },
  {
    name: 'High Flow Air Intake System',
    description:
      'Closed carbon airbox with a cone filter and a cold air feed from the front bumper. Fully sealed against heat soak.',
    price: 459.0,
    image: 'products/air-intake-highflow.jpg',
    brand: 'RaceTech',
    category: 'ENGINE',
    stripePriceId: 'price_test_air_intake_highflow',
    isFeatured: false,
  },

  {
    name: 'Carbon Fibre Bucket Seat',
    description:
      'FIA homologated shell at 6.8 kg with removable cushions. Holds the driver in place through long, fast corners.',
    price: 1299.0,
    image: 'products/bucket-seat-carbon.jpg',
    brand: 'Carbonis',
    category: 'INTERIOR',
    stripePriceId: 'price_test_bucket_seat_carbon',
    isFeatured: false,
  },
  {
    name: 'Alcantara Steering Wheel',
    description:
      'Flat bottom wheel wrapped in alcantara with a red centre marker and a carbon trim ring. Airbag compatible.',
    price: 549.0,
    image: 'products/steering-wheel-alcantara.jpg',
    brand: 'Carbonis',
    category: 'INTERIOR',
    stripePriceId: 'price_test_steering_wheel_alcantara',
    isFeatured: false,
  },
  {
    name: '6-Point Racing Harness',
    description:
      'FIA certified six point harness with 3 inch shoulder straps and anti-submarine belts. Bolt-in or wrap-around mounting.',
    price: 289.0,
    image: 'products/racing-harness-6point.jpg',
    brand: 'RaceTech',
    category: 'INTERIOR',
    stripePriceId: 'price_test_racing_harness_6point',
    isFeatured: false,
  },
];
