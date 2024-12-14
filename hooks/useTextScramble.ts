// hooks/useTextScramble.ts
import { useEffect, useState } from "react";

export function useTextScramble(text: string, delay = 3000) {
  const [scrambledText, setScrambledText] = useState(text);
  const characters = "!<>-@_\\%/[]{}—$=+*^?#";

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;
    let iteration = 0;

    const scramble = () => {
      timeout = setTimeout(() => {
        setScrambledText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) return text[index];
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join(""),
        );

        iteration += 1 / 3;

        if (iteration < text.length) {
          scramble();
        }
      }, 30);
    };

    interval = setInterval(() => {
      iteration = 0;
      scramble();
    }, delay);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return scrambledText;
}
