export interface Champion {
  id: string;
  name: string;
  trait: string;
  rarity: 1 | 2 | 3 | 4 | 5;
}

export interface MatchRecord {
  id: string;
  placement: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  comp: string;
  date: string;
  badge: string;
}

export interface MasterySynergy {
  id: string;
  name: string;
  tierText: string;
  tierClass: 'syn-badge-prism' | 'syn-badge-gold';
}

export interface SynergyThreshold {
  min: number;
  text: string;
  tier: 1 | 2 | 3 | 4; // 1: Bronze, 2: Silver, 3: Gold, 4: Prismatic
}

export interface Quote {
  text: string;
  author: string;
}
