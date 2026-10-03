// Single source of truth for each page's default (hardcoded) content.
// The live site renders getContent(slug, defaults) — admin overrides from
// Mongo merge on top of these. The admin editor also uses this module to
// know the full current shape of each page's content.

export interface Founder {
  name: string;
  role: string;
  tag: string;
  bio: string;
  quote: string;
  img: string;
  badge?: string;
  slug?: string;
  stats: [string, string][];
}

export const teamDefaults: { founders: Founder[] } = {
  founders: [
    {
      name: 'Scott Thacker',
      role: 'Inventor & Founder',
      tag: 'Business Strategy & Vision',
      bio: 'Scott Thacker is the inventor of "Fast Track Rack," a cutting edge free-weight system that is very unique in that it allows the user a faster, safer, and more efficient workout compared to any current equipment available today. Through many years of strength training, powerlifting, and bodybuilding competitions, and personal training, Scott has been able to gain a clear and concise understanding of which kinds of equipment works best for the user. With Fast Track Rack, free-weight training is going to a whole new level!',
      quote: '"Free-weight training is going to a whole new level."',
      img: '/scott-thacker1.jpeg',
      stats: [['15+', 'Years in Fitness'], ['300+', 'Client Builds'], ['5x', 'Competition Titles']],
    },
    {
      name: 'Claude Groulx',
      role: 'IFBB Pro — Master Trainer & Wellness Coach',
      tag: 'Engineering & Product Design',
      bio: 'Claude Groulx is a Montreal-born IFBB professional bodybuilder with a 12-year competitive career spanning more than 40 shows, highlighted by his 2003 Masters Olympia title. Now a Master Trainer & Wellness Coach, he brings that same competitive-stage discipline and eye for form to the engineering and design of every Fast Track Rack product.',
      quote: '"Good equipment doesn\'t just work — it inspires confidence the moment you step under the bar."',
      img: '/claude-groulx.jpeg',
      badge: '/claude-groulx-badge.jpeg',
      slug: 'claude-groulx',
      stats: [['40+', 'Pro Competitions'], ['2003', 'Masters Olympia Champ'], ['12', 'Years Competing']],
    },
  ],
};

export interface ServiceItem {
  title: string;
  tagline: string;
  desc: string;
  features: string[];
  img: string;
  logo?: string;
}

export const servicesDefaults: { items: ServiceItem[] } = {
  items: [
    {
      title: 'Equipment Manufacturing',
      tagline: 'Built from the ground up for champions.',
      desc: 'Custom-designed racks, cages, and training systems manufactured from commercial-grade steel. From single orders to full facility builds, every piece is precision-crafted.',
      features: ['Commercial-grade A36 steel', 'Powder coat finish options', 'Custom sizing available', 'Rated to 1,500+ lbs'],
      img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    },
    {
      title: 'Fitness Training Programs',
      tagline: 'Programs that produce real results.',
      desc: 'Tailored training program to match your level and goals by highly experienced coaches with background in professional bodybuilding, strength training, and personal training.',
      features: ['Beginner to advanced levels', 'Strength & conditioning focus', 'Online + in-person options', 'Personalized programming'],
      img: '/claude-services.jpeg',
      logo: '/fast-track-wellness-logo.jpeg',
    },
    {
      title: 'Elite Athletic Coaching',
      tagline: 'One-on-one excellence.',
      desc: 'Private coaching with our expert trainers. Optimize your form, programming, and mindset — whether preparing for competition or chasing personal bests.',
      features: ['1-on-1 coaching sessions', 'Video form analysis', 'Competition prep protocols', 'Nutrition guidance'],
      img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    },
    {
      title: 'Corporate Fitness Solutions',
      tagline: 'Equip your entire organization.',
      desc: 'Complete gym setup packages for businesses, hotels, and sports organizations — equipment, layout design, installation, and staff training.',
      features: ['Full facility layout design', 'Bulk equipment supply', 'Installation included', 'Staff training programs'],
      img: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80',
    },
    {
      title: 'Custom Equipment Design',
      tagline: 'Your vision. Our engineering.',
      desc: 'Have a specific idea or unique space? Our design team engineers a custom solution tailored exactly to your requirements.',
      features: ['CAD design & consultation', 'Prototype & testing', 'Any size or configuration', 'Branded finish options'],
      img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80',
    },
    {
      title: 'Maintenance & Support',
      tagline: 'We\'re with you for the long haul.',
      desc: 'Scheduled maintenance plans, parts replacement, and a responsive service team. Your investment is protected by our commitment to excellence.',
      features: ['Annual maintenance plans', 'Priority parts replacement', 'Remote & on-site support', 'Extended warranty options'],
      img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
    },
  ],
};

export interface GalleryItem {
  src: string;
  label: string;
  cat: string;
}

export const galleryDefaults: { items: GalleryItem[] } = {
  items: [
    { src: '/fast-track-rack-product.jpeg', label: 'Fast Track Rack System', cat: 'Equipment' },
    { src: '/scott-thacker1.jpeg', label: 'Scott Thacker, Founder', cat: 'Athletes' },
    { src: '/claude-wellness-poster.jpeg', label: 'Claude Groulx, Wellness Coach', cat: 'Athletes' },
    { src: '/claude-headshot.jpeg', label: 'Claude Groulx', cat: 'Athletes' },
    { src: '/claude-training.jpg', label: 'Claude Groulx in Training', cat: 'Training' },
    { src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80', label: 'Training Floor Setup', cat: 'Facility' },
    { src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80', label: 'Barbell & Weight Systems', cat: 'Equipment' },
    { src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80', label: 'Custom Commercial Build', cat: 'Facility' },
    { src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80', label: 'Functional Trainer Station', cat: 'Equipment' },
    { src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80', label: 'Elite Athlete Session', cat: 'Athletes' },
    { src: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80', label: 'Strength Platform', cat: 'Equipment' },
    { src: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?w=800&q=80', label: 'Group Training Class', cat: 'Training' },
    { src: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80', label: 'Deadlift Platform', cat: 'Equipment' },
    { src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80', label: 'Commercial Gym Floor', cat: 'Facility' },
    { src: 'https://images.unsplash.com/photo-1554344728-77cf90d9ed26?w=800&q=80', label: 'Coaching Session', cat: 'Training' },
    { src: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=800&q=80', label: 'Athletic Performance', cat: 'Athletes' },
  ],
};

export const homeTeamDefaults: {
  items: { name: string; role: string; bio: string; img: string }[];
} = {
  items: [
    {
      name: 'Scott Thacker',
      role: 'Inventor & Founder',
      bio: 'Scott Thacker is the inventor of "Fast Track Rack," a cutting edge free-weight system built from years of strength training, powerlifting, and personal training experience.',
      img: '/scott-thacker1.jpeg',
    },
    {
      name: 'Claude Groulx',
      role: 'IFBB Pro — Master Trainer & Wellness Coach',
      bio: 'A Montreal-born IFBB Pro bodybuilder and 2003 Masters Olympia champion, Claude now brings that competitive discipline to coaching and to the design of every rack we produce.',
      img: '/claude-groulx.jpeg',
    },
  ],
};

export const contactDefaults: { email: string; phone: string; hours: string } = {
  email: 'Claudegroulxifbbpro@gmail.com',
  phone: '(954) 740-4387',
  hours: 'Mon–Fri: 9AM–6PM CST',
};

export const claudeGroulxDefaults: {
  heroImg: string;
  introImg: string;
  intro1: string;
  intro2: string;
  email: string;
  phone: string;
} = {
  heroImg: '/claude4.jpg',
  introImg: '/claude2.jpg',
  intro1: 'Claude Groulx is an ex-professional bodybuilder from Montreal, Canada, best known for his victory at the 2003 Masters Olympia and a 3rd-place finish at the 2001 New Zealand Grand Prix.',
  intro2: 'He began bodybuilding at 20, training with a friend to pass the time. That casual start became a 12-year competitive career spanning more than 40 shows — 38 of them professional — culminating in his signature win at the 2003 Masters Olympia.',
  email: 'Claudegroulxifbbpro@gmail.com',
  phone: '(954) 740-4387',
};

export const pageDefaultsBySlug: Record<string, Record<string, unknown>> = {
  team: teamDefaults,
  services: servicesDefaults,
  gallery: galleryDefaults,
  'home-team': homeTeamDefaults,
  contact: contactDefaults,
  'claude-groulx': claudeGroulxDefaults,
};
