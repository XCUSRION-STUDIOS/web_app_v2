
  export interface StatInfo {
    level: number;
    xp: number;
    health: number;
    max_health: number;
    energy: number;
    max_energy: number;
    mood: number;
    max_mood: number;
    perks: string[];
    currency: number;
    stats: {
      physical: number;
      spiritual: number;
      mental: number;
      social: number;
      emotional: number;
    };
    stats_xp: {
      physical_xp: number;
      spiritual_xp: number;
      mental_xp: number;
      social_xp: number;
      emotional_xp: number;
    };
    temp_buffs_val: {
      xp: number;
      health: number;
      energy: number;
      mood: number;
    };
  }
  
  export const loadStats = (): StatInfo => {
    const storedStats = localStorage.getItem("statInfo");
  
    if (storedStats) {
      return JSON.parse(storedStats) as StatInfo;
    }
  
    // Default stats if none are found in storage
    return {
      level: 1,
      xp: 0,
      health: 75,
      max_health: 100,
      energy: 75,
      max_energy: 100,
      mood: 75,
      max_mood: 100,
      perks: [],
      currency: 0,
      stats: { physical: 1, spiritual: 1, mental: 1, social: 1, emotional: 1 },
      stats_xp: { physical_xp: 0, spiritual_xp: 0, mental_xp: 0, social_xp: 0, emotional_xp: 0 },
      temp_buffs_val: {xp: 1, health: 1, energy: 1, mood: 1},
    };
  };
  