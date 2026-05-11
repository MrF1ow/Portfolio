import { useEffect, useRef, useState } from "react";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface ScrambleTextProps {
  texts: string[];
  interval?: number;
  scrambleDuration?: number;
  className?: string;
}

export default function ScrambleText({
  texts,
  interval = 3000,
  scrambleDuration = 800,
  className = "",
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(texts[0]?.split("") ?? []);
  const indexRef = useRef(0);
  const iterRef = useRef(0);

  useEffect(() => {
    const cycle = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % texts.length;
      const target = texts[indexRef.current] ?? "";
      iterRef.current = 0;

      const maxLen = Math.max(target.length, ...texts.map((t) => t.length));
      const step = scrambleDuration / (maxLen * 10);

      const scramble = setInterval(() => {
        if (iterRef.current >= target.length) {
          setDisplay(target.split(""));
          clearInterval(scramble);
          return;
        }

        setDisplay(
          Array.from({ length: target.length }, (_, i) =>
            target[i] === " "
              ? " "
              : i <= iterRef.current
                ? target[i] ?? ""
                : chars[Math.floor(Math.random() * chars.length)] ?? ""
          )
        );
        iterRef.current += 0.1;
      }, step);
    }, interval);

    return () => clearInterval(cycle);
  }, [texts, interval, scrambleDuration]);

  return (
    <span className={className}>
      {display.map((ch, i) => (
        <span key={i} className="inline-block min-w-[0.5ch]">
          {ch}
        </span>
      ))}
    </span>
  );
}
