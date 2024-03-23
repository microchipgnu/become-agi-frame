export interface CognitiveAbility {
  id: string;
  name: string;
}

export interface Rarity {
  id: string;
  name: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary';
  chance: number;
}

export interface GridItem {
  position: string; // Adjust types as necessary
  status: string;
}

export interface Dataset {
  grid: GridItem[];
  hash: string; // Assuming a singular hash for the example
}

// Cognitive abilities
const cognitiveAbilities: CognitiveAbility[] = [
  { id: '0x1', name: 'Perception' },
  { id: '0x2', name: 'Pattern Recognition' },
  { id: '0x3', name: 'Decision Making' },
  { id: '0x4', name: 'Problem-Solving' },
  { id: '0x5', name: 'Emotion Recognition' },
  { id: '0x6', name: 'Creativity' },
  { id: '0x7', name: 'Adaptive Learning' },
  { id: '0x8', name: 'Strategy' },
];

// Rarities with hexadecimal IDs
const rarities: Rarity[] = [
  { id: '0x1', name: 'Common', chance: 40 },
  { id: '0x2', name: 'Uncommon', chance: 30 },
  { id: '0x3', name: 'Rare', chance: 20 },
  { id: '0x4', name: 'Very Rare', chance: 9 },
  { id: '0x5', name: 'Legendary', chance: 1 },
];

const getRandomRarity = (): Rarity => {
  let randomPoint = Math.random() * 100;
  for (const rarity of rarities) {
    if (randomPoint < rarity.chance) return rarity;
    randomPoint -= rarity.chance;
  }
  throw new Error("Failed to select a rarity"); // Fallback error
}

const getAbilityBasedOnRarity = (rarityId: string): string => {
  const mapping: { [key: string]: string[] } = {
    '0x1': ['Perception'], // Common
    '0x2': ['Pattern Recognition', 'Decision Making', 'Noise'], // Uncommon
    '0x3': ['Problem-Solving', 'Emotion Recognition'], // Rare
    '0x4': ['Creativity', 'Adaptive Learning'], // Very Rare
    '0x5': ['Strategy'], // Legendary
  };

  const abilities = mapping[rarityId];

  const randomIndex = Math.floor(Math.random() * abilities!.length);
  return abilities?.[randomIndex]!;
}

const hash = async (grid: GridItem[]) => {
  const arrayStr = JSON.stringify(grid);

  const encoder = new TextEncoder();
  const data = encoder.encode(arrayStr);

  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

export const createDataset = async (): Promise<Dataset> => {
  const grid: GridItem[] = [];

  for (let i = 0; i < 128; i++) {
    const rarity = getRandomRarity();
    const abilityName = getAbilityBasedOnRarity(rarity.id);

    let item: GridItem = {
      position: `0x${i.toString(16).padStart(2, '0')}`,
      status: abilityName,
    };

    grid.push(item);
  }

  return { grid, hash: await hash(grid) };
}