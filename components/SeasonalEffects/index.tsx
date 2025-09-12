// components/SeasonalEffects/index.tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Snow } from "./Snow";
import { EasterEggs } from "./EasterEggs";
import { RamadanLights } from "./RamadanLights";
import {
  isChristmasSeason,
  isEasterSeason,
  isRamadanSeason,
} from "@/utils/dates";

export default function SeasonalEffects() {
  const [currentSeason, setCurrentSeason] = useState<
    "christmas" | "easter" | "ramadan" | null
  >(null);

  useEffect(() => {
    const checkSeason = () => {
      if (isChristmasSeason()) {
        setCurrentSeason("christmas");
      } else if (isEasterSeason()) {
        setCurrentSeason("easter");
      } else if (isRamadanSeason()) {
        setCurrentSeason("ramadan");
      } else {
        setCurrentSeason(null);
      }
    };

    checkSeason();
    // Check season every day
    const interval = setInterval(checkSeason, 86400000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {currentSeason === "christmas" && <Snow />}
      {currentSeason === "easter" && <EasterEggs />}
      {currentSeason === "ramadan" && <RamadanLights />}
    </AnimatePresence>
  );
}
