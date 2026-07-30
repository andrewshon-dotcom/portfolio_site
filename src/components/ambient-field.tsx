import type { CSSProperties } from "react";

type AmbientFieldVariant = "hero" | "expertise" | "work" | "subtle";

interface AmbientFieldProps {
  variant: AmbientFieldVariant;
}

interface Particle {
  x: string;
  y: string;
  size: string;
  delay: string;
  duration: string;
  travelX: string;
  travelY: string;
  opacity: string;
  tone: "lavender" | "blue" | "mint" | "coral";
  stream: 1 | 2 | 3;
}

type ParticleStyle = CSSProperties & {
  "--particle-delay": string;
  "--particle-duration": string;
  "--particle-opacity": string;
  "--particle-size": string;
  "--particle-travel-x": string;
  "--particle-travel-y": string;
  "--particle-x": string;
  "--particle-y": string;
};

type WordDotStyle = CSSProperties & {
  "--word-cluster-x": string;
  "--word-cluster-y": string;
  "--word-dot-size": string;
  "--word-return-x": string;
  "--word-return-y": string;
  "--word-scatter-x": string;
  "--word-scatter-y": string;
  "--word-settle-x": string;
  "--word-settle-y": string;
  "--word-stagger": string;
  "--word-start": string;
  "--word-x": string;
  "--word-y": string;
};

const particleGlyphs: Readonly<Record<string, readonly string[]>> = {
  "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  W: ["10001", "10001", "10001", "10101", "10101", "11011", "10001"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
};

const particleWords = ["SHOPIFY", "WORDPRESS", "E-COMMERCE"] as const;

interface WordDot {
  clusterX: number;
  clusterY: number;
  scatterX: number;
  scatterY: number;
  size: number;
  tone: Particle["tone"];
  x: number;
  y: number;
}

function buildWordDots(word: string, wordIndex: number): readonly WordDot[] {
  const characterWidth = 5;
  const characterGap = 2;
  const totalColumns =
    word.length * characterWidth + (word.length - 1) * characterGap;
  const horizontalStep = 85 / Math.max(totalColumns - 1, 1);
  const verticalStep = 48 / 6;
  const dots: WordDot[] = [];

  Array.from(word).forEach((character, characterIndex) => {
    const glyph = particleGlyphs[character];

    glyph?.forEach((row, rowIndex) => {
      Array.from(row).forEach((cell, columnIndex) => {
        if (cell !== "1") {
          return;
        }

        const dotIndex = dots.length;
        const column =
          characterIndex * (characterWidth + characterGap) + columnIndex;
        const x = 7.5 + column * horizontalStep;
        const y = 26 + rowIndex * verticalStep;
        const seed = dotIndex * 37 + characterIndex * 53 + wordIndex * 79;
        const gatheredX = 50 + ((seed * 17) % 13) - 6;
        const gatheredY = 50 + ((seed * 23) % 17) - 8;
        const scatteredX = 4 + ((seed * 31) % 93);
        const scatteredY = 8 + ((seed * 29) % 85);

        dots.push({
          clusterX: gatheredX - x,
          clusterY: gatheredY - y,
          scatterX: scatteredX - x,
          scatterY: scatteredY - y,
          size: 5.2 + (seed % 3) * 0.84,
          tone: tones[(seed + dotIndex) % tones.length],
          x,
          y,
        });
      });
    });
  });

  return dots;
}

const tones: readonly Particle["tone"][] = [
  "lavender",
  "blue",
  "lavender",
  "blue",
  "mint",
  "lavender",
  "blue",
  "coral",
];

const wordDots = particleWords.map((word, index) => ({
  dots: buildWordDots(word, index),
  start: `${index * -10}s`,
  word,
}));

const streamCenters = [32, 53, 70] as const;
const streamAmplitudes = [13, 16, 11] as const;

const particles: readonly Particle[] = Array.from(
  { length: 48 },
  (_, index): Particle => {
    const streamIndex = Math.floor(index / 16) as 0 | 1 | 2;
    const column = index % 16;
    const phase = (column / 15) * Math.PI * 2.35 + streamIndex * Math.PI * 0.54;
    const x = -3 + column * 7.05 + streamIndex * 1.15;
    const y =
      streamCenters[streamIndex] +
      Math.sin(phase) * streamAmplitudes[streamIndex] +
      ((index * 7) % 5) -
      2;
    const size = index % 13 === 0 ? 6 : index % 7 === 0 ? 5 : 2 + (index % 3);
    const direction = index % 2 === 0 ? 1 : -1;

    return {
      x: `${x.toFixed(2)}%`,
      y: `${y.toFixed(2)}%`,
      size: `${size}px`,
      delay: `-${((index * 1.73) % 22).toFixed(2)}s`,
      duration: `${12 + ((index * 7) % 11)}s`,
      travelX: `${direction * (34 + ((index * 11) % 54))}px`,
      travelY: `${-32 + ((index * 13) % 65)}px`,
      opacity: (0.58 + (index % 5) * 0.075).toFixed(3),
      tone: tones[index % tones.length],
      stream: (streamIndex + 1) as 1 | 2 | 3,
    };
  },
);

export function AmbientField({ variant }: AmbientFieldProps) {
  return (
    <div
      className={`ambient-field ambient-field--${variant}`}
      aria-hidden="true"
    >
      <div className="ambient-field__aurora ambient-field__aurora--one" />
      <div className="ambient-field__aurora ambient-field__aurora--two" />
      <div className="ambient-field__trail ambient-field__trail--one" />
      <div className="ambient-field__trail ambient-field__trail--two" />
      <div className="ambient-field__trail ambient-field__trail--three" />
      <div className="ambient-field__beam" />
      {particles
        .slice(0, variant === "subtle" ? 30 : particles.length)
        .map((particle, index) => {
          const style: ParticleStyle = {
            "--particle-delay": particle.delay,
            "--particle-duration": particle.duration,
            "--particle-opacity": particle.opacity,
            "--particle-size": particle.size,
            "--particle-travel-x": particle.travelX,
            "--particle-travel-y": particle.travelY,
            "--particle-x": particle.x,
            "--particle-y": particle.y,
          };

          return (
            <i
              className={`ambient-field__particle ambient-field__particle--${particle.tone} ambient-field__particle--stream-${particle.stream}`}
              key={`${particle.x}-${particle.y}-${index}`}
              style={style}
            />
          );
        })}
    </div>
  );
}

export function ParticleWordmark() {
  return (
    <div className="ambient-wordmark" aria-hidden="true">
      {wordDots.map(({ dots, start, word }) => (
        <div
          className="ambient-wordmark__group"
          key={word}
          style={{ "--word-start": start } as CSSProperties}
        >
          {dots.map((dot, index) => {
            const style: WordDotStyle = {
              "--word-cluster-x": `${dot.clusterX.toFixed(2)}cqw`,
              "--word-cluster-y": `${dot.clusterY.toFixed(2)}cqh`,
              "--word-dot-size": `${dot.size.toFixed(2)}px`,
              "--word-return-x": `${(-dot.scatterX * 0.52).toFixed(2)}cqw`,
              "--word-return-y": `${(-dot.scatterY * 0.52).toFixed(2)}cqh`,
              "--word-scatter-x": `${dot.scatterX.toFixed(2)}cqw`,
              "--word-scatter-y": `${dot.scatterY.toFixed(2)}cqh`,
              "--word-settle-x": `${(dot.scatterX * 0.74).toFixed(2)}cqw`,
              "--word-settle-y": `${(dot.scatterY * 0.74).toFixed(2)}cqh`,
              "--word-stagger": `${(index % 9) * 9}ms`,
              "--word-start": start,
              "--word-x": `${dot.x.toFixed(2)}%`,
              "--word-y": `${dot.y.toFixed(2)}%`,
            };

            return (
              <i
                className={`ambient-wordmark__dot ambient-field__particle--${dot.tone}`}
                key={`${word}-${dot.x}-${dot.y}-${index}`}
                style={style}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
