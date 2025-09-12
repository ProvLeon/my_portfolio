// hooks/use3DTilt.ts
import { useEffect, useState } from "react";

export function use3DTilt(ref: React.RefObject<HTMLElement>) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = (centerX - x) / 20;
      const tiltY = (y - centerY) / 20;

      setTilt({ x: tiltY, y: tiltX });
    };

    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);

  return tilt;
}
