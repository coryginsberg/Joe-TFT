import type { Champion, MatchRecord, MasterySynergy, Quote, SynergyThreshold } from '../types';

export const CHAMPIONS_DATABASE: Champion[] = [
  { id: 'zoe', name: 'Zoe', trait: 'Portal', rarity: 1 },
  { id: 'hecarim', name: 'Hecarim', trait: 'Bastion', rarity: 3 },
  { id: 'ahri', name: 'Ahri', trait: 'Arcana', rarity: 2 },
  { id: 'rumble', name: 'Rumble', trait: 'Vanguard', rarity: 2 },
  { id: 'milio', name: 'Milio', trait: 'Faerie', rarity: 5 },
  { id: 'norra', name: 'Norra & Yuumi', trait: 'Portal', rarity: 5 },
  { id: 'diana', name: 'Diana', trait: 'Bastion', rarity: 5 },
  { id: 'ryze', name: 'Ryze', trait: 'Portal', rarity: 4 }
];

export const RECENT_MATCHES: MatchRecord[] = [
  { id: 'm1', placement: 1, comp: 'Portal 10 Arcana', date: 'Active Challenger Rank', badge: 'Ranked' },
  { id: 'm2', placement: 1, comp: 'Bastion Cavalier', date: '2 hours ago', badge: 'Ranked' },
  { id: 'm3', placement: 2, comp: 'Vanguard Ryze Carry', date: '5 hours ago', badge: 'Ranked' },
  { id: 'm4', placement: 1, comp: 'Faerie Prismatic Board', date: 'Yesterday', badge: 'Ranked' }
];

export const META_MASTERIES: MasterySynergy[] = [
  { id: 's1', name: 'Portal', tierText: 'Prismatic (Tier 3)', tierClass: 'syn-badge-prism' },
  { id: 's2', name: 'Arcana', tierText: 'High Arcana (Tier 3)', tierClass: 'syn-badge-prism' },
  { id: 's3', name: 'Bastion', tierText: 'Gold (Tier 2)', tierClass: 'syn-badge-gold' },
  { id: 's4', name: 'Vanguard', tierText: 'Gold (Tier 2)', tierClass: 'syn-badge-gold' }
];

export const LORE_QUOTES: Quote[] = [
  { text: "Me Corki Riven", author: "Joe TFT" },
  { text: "It's not a first or eighth, it's about sending a message.", author: "Joseph Teamfight" },
  { text: "Tony you're greifing all of us!", author: "Trey" },
  { text: "Please don't send me 8th again. I have 20 LP left.", author: "Patricia Patcat" },
  { text: "He is THE Joe TFT. Everyone else is just playing for 2nd.", author: "Slayer Synergy Fan" }
];

export const SYNERGY_THRESHOLDS: Record<string, SynergyThreshold[]> = {
  'Portal': [
    { min: 1, text: 'Bronze', tier: 1 },
    { min: 2, text: 'Silver', tier: 2 },
    { min: 3, text: 'Gold', tier: 3 }
  ],
  'Bastion': [
    { min: 1, text: 'Bronze', tier: 1 },
    { min: 2, text: 'Gold', tier: 3 }
  ],
  'Arcana': [
    { min: 1, text: 'Silver', tier: 2 },
    { min: 2, text: 'Prismatic', tier: 4 }
  ],
  'Vanguard': [
    { min: 1, text: 'Bronze', tier: 1 },
    { min: 2, text: 'Gold', tier: 3 }
  ],
  'Faerie': [
    { min: 1, text: 'Gold', tier: 3 }
  ]
};
