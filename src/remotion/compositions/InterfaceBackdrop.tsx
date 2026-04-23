import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export type InterfaceBackdropProps = {
  accent: string;
  variant: string;
};

function withAlpha(hex: string, alpha: number) {
  const a = Math.round(Math.min(1, Math.max(0, alpha)) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
}

/** Tide + Seal share palette[0] in atlas — force distinct looks per route. */
const VARIANT = {
  "fidelis/intake": {
    baseBg: "#061018",
    bloomA: "#4a6eb8",
    bloomB: "#2a5088",
    bloomC: "#6b9ee8",
    wobbleDiv: 48,
    rotateMul: 0.85,
    watermark: "INTAKE",
    watermarkSub: "entity graph · vault",
  },
  "tide/ops": {
    baseBg: "#0f0c08",
    bloomA: "#b8926a",
    bloomB: "#4a6eb8",
    bloomC: "#d4b896",
    wobbleDiv: 26,
    rotateMul: 1.35,
    watermark: "OPS",
    watermarkSub: "property · triage",
  },
  "seal/stamp": {
    baseBg: "#060504",
    bloomA: "#c9a882",
    bloomB: "#6b4e1f",
    bloomC: "#e8dcc8",
    wobbleDiv: 40,
    rotateMul: 1.1,
    watermark: "STAMP",
    watermarkSub: "attest · chain",
  },
  "tide/concierge": {
    baseBg: "#0c0a06",
    bloomA: "#b8926a",
    bloomB: "#4a6eb8",
    bloomC: "#d8c4a8",
    wobbleDiv: 30,
    rotateMul: 1.2,
    watermark: "CONCIERGE",
    watermarkSub: "threads · SLA",
  },
  "tide/revenue": {
    baseBg: "#080a0e",
    bloomA: "#4a6eb8",
    bloomB: "#b8926a",
    bloomC: "#8cb4e8",
    wobbleDiv: 24,
    rotateMul: 1.15,
    watermark: "REVENUE",
    watermarkSub: "pace · pickup",
  },
  "tide/housekeeping": {
    baseBg: "#0a0c08",
    bloomA: "#9a7a56",
    bloomB: "#3d5a40",
    bloomC: "#c8d4c4",
    wobbleDiv: 32,
    rotateMul: 1.05,
    watermark: "HK",
    watermarkSub: "rooms · turns",
  },
  "tide/guestbook": {
    baseBg: "#0b0906",
    bloomA: "#c4a882",
    bloomB: "#4a6eb8",
    bloomC: "#e8dcc8",
    wobbleDiv: 28,
    rotateMul: 1.12,
    watermark: "GUESTBOOK",
    watermarkSub: "memory · stays",
  },
  "tide/scout": {
    baseBg: "#06080c",
    bloomA: "#5a7ab8",
    bloomB: "#b8926a",
    bloomC: "#8cb4e8",
    wobbleDiv: 22,
    rotateMul: 1.25,
    watermark: "SCOUT",
    watermarkSub: "channels · lift",
  },
  "fidelis/ledger": {
    baseBg: "#050810",
    bloomA: "#4a6eb8",
    bloomB: "#1e243a",
    bloomC: "#6b9ee8",
    wobbleDiv: 36,
    rotateMul: 0.88,
    watermark: "LEDGER",
    watermarkSub: "close · reconcile",
  },
  "fidelis/vault": {
    baseBg: "#04060a",
    bloomA: "#4a6eb8",
    bloomB: "#2a3850",
    bloomC: "#8cb4e8",
    wobbleDiv: 40,
    rotateMul: 0.82,
    watermark: "VAULT",
    watermarkSub: "chain · custody",
  },
  "fidelis/filing": {
    baseBg: "#060810",
    bloomA: "#5a7ab8",
    bloomB: "#1e243a",
    bloomC: "#6b9ee8",
    wobbleDiv: 30,
    rotateMul: 1.05,
    watermark: "FILING",
    watermarkSub: "deadline · filed",
  },
  "fidelis/counsel": {
    baseBg: "#05070c",
    bloomA: "#4a6eb8",
    bloomB: "#c8c4bc",
    bloomC: "#6b8cc4",
    wobbleDiv: 34,
    rotateMul: 0.92,
    watermark: "COUNSEL",
    watermarkSub: "memos · elections",
  },
  "fidelis/audit": {
    baseBg: "#040810",
    bloomA: "#4a6eb8",
    bloomB: "#1a2840",
    bloomC: "#8cb4e8",
    wobbleDiv: 42,
    rotateMul: 0.8,
    watermark: "AUDIT",
    watermarkSub: "read · findings",
  },
  "helios/portfolio": {
    baseBg: "#0a0806",
    bloomA: "#d4a574",
    bloomB: "#1e243a",
    bloomC: "#c8c4bc",
    wobbleDiv: 28,
    rotateMul: 1.08,
    watermark: "PORTFOLIO",
    watermarkSub: "household · AUM",
  },
  "helios/ledger-w": {
    baseBg: "#080a0c",
    bloomA: "#d4a574",
    bloomB: "#4a6eb8",
    bloomC: "#a89478",
    wobbleDiv: 36,
    rotateMul: 0.9,
    watermark: "LEDGER-W",
    watermarkSub: "wealth · books",
  },
  "helios/trust": {
    baseBg: "#090806",
    bloomA: "#d4a574",
    bloomB: "#2a3548",
    bloomC: "#c8c4bc",
    wobbleDiv: 38,
    rotateMul: 0.85,
    watermark: "TRUST",
    watermarkSub: "distributions · minutes",
  },
  "helios/estate": {
    baseBg: "#08070a",
    bloomA: "#c8c4bc",
    bloomB: "#d4a574",
    bloomC: "#4a6eb8",
    wobbleDiv: 32,
    rotateMul: 0.95,
    watermark: "ESTATE",
    watermarkSub: "assets · heirs",
  },
  "helios/family-office": {
    baseBg: "#0a0907",
    bloomA: "#d4a574",
    bloomB: "#1e243a",
    bloomC: "#8a7358",
    wobbleDiv: 30,
    rotateMul: 1.02,
    watermark: "FAM OFFICE",
    watermarkSub: "admin · household",
  },
  "helios/yield": {
    baseBg: "#070806",
    bloomA: "#d4a574",
    bloomB: "#3d5a40",
    bloomC: "#c8c4bc",
    wobbleDiv: 26,
    rotateMul: 1.1,
    watermark: "YIELD",
    watermarkSub: "cash · sweeps",
  },
  "alder/intake": {
    baseBg: "#060a08",
    bloomA: "#a7f3d0",
    bloomB: "#4a6eb8",
    bloomC: "#6bc49a",
    wobbleDiv: 34,
    rotateMul: 0.88,
    watermark: "KAIROS",
    watermarkSub: "intake · baseline",
  },
  "alder/protocol": {
    baseBg: "#050807",
    bloomA: "#7dd3b0",
    bloomB: "#4a6eb8",
    bloomC: "#c8c4bc",
    wobbleDiv: 32,
    rotateMul: 0.93,
    watermark: "PROTOCOL",
    watermarkSub: "weekly · plan",
  },
  "alder/labs": {
    baseBg: "#050807",
    bloomA: "#6bc49a",
    bloomB: "#4a6eb8",
    bloomC: "#a7f3d0",
    wobbleDiv: 33,
    rotateMul: 0.9,
    watermark: "LABS",
    watermarkSub: "order · results",
  },
  "alder/cadence": {
    baseBg: "#060908",
    bloomA: "#7dd3b0",
    bloomB: "#2a5088",
    bloomC: "#a7f3d0",
    wobbleDiv: 31,
    rotateMul: 0.94,
    watermark: "CADENCE",
    watermarkSub: "streaks · habits",
  },
  "alder/concierge-m": {
    baseBg: "#050806",
    bloomA: "#a7f3d0",
    bloomB: "#c8c4bc",
    bloomC: "#4a6eb8",
    wobbleDiv: 35,
    rotateMul: 0.87,
    watermark: "CONCIERGE-M",
    watermarkSub: "bookings · care",
  },
  "alder/atria": {
    baseBg: "#040806",
    bloomA: "#8fd9b8",
    bloomB: "#4a6eb8",
    bloomC: "#d0ebe0",
    wobbleDiv: 36,
    rotateMul: 0.86,
    watermark: "ATRIA",
    watermarkSub: "foyer · Kairos",
  },
  "mortar/blueprint": {
    baseBg: "#0c0a06",
    bloomA: "#c3942d",
    bloomB: "#8a6a26",
    bloomC: "#d6dbe8",
    wobbleDiv: 29,
    rotateMul: 1.06,
    watermark: "BLUEPRINT",
    watermarkSub: "sets · RFI",
  },
  "mortar/permit": {
    baseBg: "#0a0805",
    bloomA: "#8a6a26",
    bloomB: "#c3942d",
    bloomC: "#4a6eb8",
    wobbleDiv: 27,
    rotateMul: 1.12,
    watermark: "PERMIT",
    watermarkSub: "agencies · filings",
  },
  "mortar/crew": {
    baseBg: "#0b0906",
    bloomA: "#b8893a",
    bloomB: "#1e243a",
    bloomC: "#c8c4bc",
    wobbleDiv: 28,
    rotateMul: 1.0,
    watermark: "CREW",
    watermarkSub: "roster · gates",
  },
  "mortar/site": {
    baseBg: "#090705",
    bloomA: "#a67c2d",
    bloomB: "#3d5a40",
    bloomC: "#d6dbe8",
    wobbleDiv: 24,
    rotateMul: 1.15,
    watermark: "SITE",
    watermarkSub: "daily · photos",
  },
  "mortar/ledger-c": {
    baseBg: "#080604",
    bloomA: "#c3942d",
    bloomB: "#2a3548",
    bloomC: "#8a6a26",
    wobbleDiv: 37,
    rotateMul: 0.89,
    watermark: "LEDGER-C",
    watermarkSub: "draws · COs",
  },
  "mortar/punch": {
    baseBg: "#0a0705",
    bloomA: "#8a6a26",
    bloomB: "#c8c4bc",
    bloomC: "#c3942d",
    wobbleDiv: 33,
    rotateMul: 0.98,
    watermark: "PUNCH",
    watermarkSub: "close-out",
  },
  "lex/matter": {
    baseBg: "#08090c",
    bloomA: "#c8c4bc",
    bloomB: "#4a6eb8",
    bloomC: "#6b8cc4",
    wobbleDiv: 38,
    rotateMul: 0.84,
    watermark: "MATTER",
    watermarkSub: "scope · ship",
  },
  "lex/brief": {
    baseBg: "#060708",
    bloomA: "#9aa3b8",
    bloomB: "#0a0d1a",
    bloomC: "#4a6eb8",
    wobbleDiv: 40,
    rotateMul: 0.81,
    watermark: "BRIEF",
    watermarkSub: "draft · voice",
  },
  "lore/tutor": {
    baseBg: "#0c0a08",
    bloomA: "#e8c99a",
    bloomB: "#4a6eb8",
    bloomC: "#d0c9b8",
    wobbleDiv: 34,
    rotateMul: 0.95,
    watermark: "TUTOR",
    watermarkSub: "syllabus · cohort",
  },
} as const;

type VariantKey = keyof typeof VARIANT;

function tokensFor(variant: string) {
  if (variant in VARIANT) return VARIANT[variant as VariantKey];
  return {
    baseBg: "#04060c",
    bloomA: "#4a6eb8",
    bloomB: "#2a4060",
    bloomC: "#6b8cc4",
    wobbleDiv: 38,
    rotateMul: 1,
    watermark: "LYRA",
    watermarkSub: "",
  };
}

export const InterfaceBackdrop: React.FC<InterfaceBackdropProps> = ({ accent, variant }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const last = Math.max(1, durationInFrames - 1);
  const t = frame / last;

  const tok = tokensFor(variant);
  const isOps = variant === "tide/ops";
  const isStamp = variant === "seal/stamp";
  const isIntake = variant === "fidelis/intake";
  const isTideBatch2 =
    variant === "tide/concierge" || variant === "tide/revenue" || variant === "tide/housekeeping";
  const isBatch3Shell =
    variant === "tide/guestbook" || variant === "tide/scout" || variant === "fidelis/ledger";
  const isFidelisBatch4 =
    variant === "fidelis/vault" || variant === "fidelis/filing" || variant === "fidelis/counsel";
  const isBatch5Shell =
    variant === "fidelis/audit" || variant === "helios/portfolio" || variant === "helios/ledger-w";
  const isBatch6Shell =
    variant === "helios/trust" || variant === "helios/estate" || variant === "helios/family-office";
  const isBatch7Shell =
    variant === "helios/yield" || variant === "alder/intake" || variant === "alder/protocol";

  const wobbleX = interpolate(Math.sin(frame / tok.wobbleDiv + t * 14), [-1, 1], [-22, 26]);
  const wobbleY = interpolate(Math.cos(frame / (tok.wobbleDiv + 14)), [-1, 1], [-16, 20]);
  const pulse = interpolate(Math.sin((frame / durationInFrames) * Math.PI * 2), [-1, 1], [0.1, 0.28]);

  const ringAlpha = interpolate(Math.sin(frame / 22), [-1, 1], [0.22, 0.55]);
  const scanTop = (frame * 0.42) % 118;

  const primary =
    isIntake ||
    isOps ||
    isStamp ||
    isTideBatch2 ||
    isBatch3Shell ||
    isFidelisBatch4 ||
    isBatch5Shell ||
    isBatch6Shell ||
    isBatch7Shell ||
    isBatch8Shell ||
    isBatch9Shell ||
    isBatch10Shell ||
    isBatch11Shell
      ? tok.bloomA
      : accent;
  const secondary =
    isIntake ||
    isOps ||
    isStamp ||
    isTideBatch2 ||
    isBatch3Shell ||
    isFidelisBatch4 ||
    isBatch5Shell ||
    isBatch6Shell ||
    isBatch7Shell ||
    isBatch8Shell ||
    isBatch9Shell ||
    isBatch10Shell ||
    isBatch11Shell
      ? tok.bloomB
      : accent;

  return (
    <AbsoluteFill style={{ backgroundColor: tok.baseBg, overflow: "hidden" }}>
      {/* Large corner watermark — instant visual differentiation */}
      <div
        style={{
          position: "absolute",
          right: "4%",
          top: "8%",
          textAlign: "right",
          fontFamily: "system-ui, sans-serif",
          fontWeight: 200,
          letterSpacing: "0.35em",
          fontSize: 42,
          lineHeight: 1.1,
          color: withAlpha(tok.bloomA, 0.14),
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {tok.watermark}
        <div
          style={{
            marginTop: 8,
            fontSize: 11,
            letterSpacing: "0.2em",
            color: withAlpha(tok.bloomC, 0.2),
          }}
        >
          {tok.watermarkSub}
        </div>
      </div>

      {/* Primary mass */}
      <div
        style={{
          position: "absolute",
          width: "125%",
          height: "125%",
          left: isStamp ? "-8%" : "-12%",
          top: isIntake ? "-12%" : "-8%",
          transform: `translate(${wobbleX * (isIntake ? 1.1 : isOps || isTideBatch2 ? 1.25 : 1)}px, ${wobbleY}px) rotate(${interpolate(frame, [0, last], [-3 * tok.rotateMul, 4 * tok.rotateMul])}deg)`,
          background: `radial-gradient(ellipse 52% 42% at ${isOps || isTideBatch2 ? "38%" : isStamp ? "48%" : "44%"} 36%, ${withAlpha(primary, pulse)} 0%, transparent 56%)`,
          filter: "blur(68px)",
          opacity: isStamp ? 0.88 : isIntake ? 0.78 : 0.9,
        }}
      />

      {/* Secondary — ops gets obvious blue "coastal" second sun; intake gets deeper navy */}
      <div
        style={{
          position: "absolute",
          width: "110%",
          height: "110%",
          left: isOps || isTideBatch2 ? "8%" : "20%",
          top: isStamp ? "28%" : "18%",
          transform: `translate(${-wobbleY * 0.65}px, ${wobbleX * 0.38}px)`,
          background: `radial-gradient(ellipse 48% 44% at 72% 48%, ${withAlpha(secondary, isOps || isTideBatch2 ? 0.22 : isIntake ? 0.16 : 0.14)} 0%, transparent 54%)`,
          filter: "blur(58px)",
          opacity: isOps || isTideBatch2 ? 0.85 : 0.68,
        }}
      />

      {/* Tertiary accent — seal champagne haze */}
      {isStamp && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 70% 50% at 20% 80%, ${withAlpha(tok.bloomC, 0.08)} 0%, transparent 50%)`,
            filter: "blur(40px)",
          }}
        />
      )}

      {/* Ops: bright scan */}
      {(isOps || isTideBatch2) && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "32%",
            top: `${scanTop}%`,
            background: "linear-gradient(180deg, rgba(74,110,184,0.12), rgba(184,146,106,0.06), transparent)",
            mixBlendMode: "screen",
            opacity: 0.55,
          }}
        />
      )}

      {/* Stamp: bold seal rings */}
      {isStamp && (
        <>
          <div
            style={{
              position: "absolute",
              left: "55%",
              top: "40%",
              width: 480,
              height: 480,
              marginLeft: -240,
              marginTop: -240,
              borderRadius: "50%",
              border: `2px solid ${withAlpha(tok.bloomA, ringAlpha)}`,
              opacity: 0.42,
              transform: `scale(${interpolate(Math.sin(frame / 65), [-1, 1], [0.9, 1.08])})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "55%",
              top: "40%",
              width: 380,
              height: 380,
              marginLeft: -190,
              marginTop: -190,
              borderRadius: "50%",
              border: `1px dashed ${withAlpha(tok.bloomB, 0.35)}`,
              opacity: 0.35,
              transform: `rotate(${frame * 0.15}deg)`,
            }}
          />
        </>
      )}

      {/* Intake: readable ledger grid */}
      {isIntake && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.11,
            backgroundImage:
              "linear-gradient(rgba(100, 160, 240, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 160, 240, 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            transform: `translateY(${interpolate(frame % 140, [0, 140], [0, 40])}px)`,
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 88% 78% at 50% 42%, transparent 32%, ${isIntake ? "rgba(4,8,16,0.65)" : isOps || isTideBatch2 ? "rgba(12,8,4,0.58)" : "rgba(6,4,2,0.62)"} 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
