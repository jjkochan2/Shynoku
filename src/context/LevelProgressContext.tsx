import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LEVEL_KEY = "LEVEL_PROGRESS";
const TOTAL_LEVELS = 30; // total number of levels

type LevelProgressContextType = {
  unlocked: Set<number>;
  unlockLevel: (level: number) => void;
  reload: () => void;
  resetProgress: () => void;
};

const LevelProgressContext = createContext<LevelProgressContextType | undefined>(undefined);

export function LevelProgressProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<Set<number>>(new Set([1]));

  const loadProgress = async () => {
    try {
      const stored = await AsyncStorage.getItem(LEVEL_KEY);
      if (stored) {
        const parsed: number[] = JSON.parse(stored);
        setUnlocked(new Set(parsed));
      }
    } catch (err) {
      console.error("Error loading level progress:", err);
    }
  };

  const saveProgress = async (newUnlocked: Set<number>) => {
    try {
      await AsyncStorage.setItem(LEVEL_KEY, JSON.stringify(Array.from(newUnlocked)));
    } catch (err) {
      console.error("Error saving level progress:", err);
    }
  };

  const unlockLevel = (level: number) => {
    setUnlocked((prev) => {
      const next = new Set(prev);
      next.add(level);
      saveProgress(next);
      return next;
    });
  };

  // ✅ Add this function
  const resetProgress = async () => {
    const initial = new Set([1]); // start with only level 1 unlocked
    setUnlocked(initial);
    await AsyncStorage.setItem(LEVEL_KEY, JSON.stringify(Array.from(initial)));
  };

  useEffect(() => {
    loadProgress();
  }, []);

  return (
    <LevelProgressContext.Provider value={{ unlocked, unlockLevel, reload: loadProgress, resetProgress }}>
      {children}
    </LevelProgressContext.Provider>
  );
}


export function useLevelProgress() {
  const ctx = useContext(LevelProgressContext);
  if (!ctx) throw new Error("useLevelProgress must be used inside LevelProgressProvider");
  return ctx;
}
