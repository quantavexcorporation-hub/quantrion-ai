"use client"

import { growthProjection } from "./data"

export function AcademicFingerprint() {
  // Constellation-style fingerprint using SVG nodes — visual identity, not a score card
  const points = [
    [50, 18],
    [72, 28],
    [82, 48],
    [74, 70],
    [52, 82],
    [28, 70],
    [18, 48],
    [28, 28],
    [50, 40],
    [60, 55],
    [40, 58],
  ]

  return (
    <section className="glass-card mb-6 rounded-2xl p-5" aria-label="Academic fingerprint">
      <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
        <div className="flex justify-center">
          <svg viewBox="0 0 100 100" className="h-44 w-44" role="img" aria-label="Academic fingerprint constellation">
            <defs>
              <radialGradient id="fpGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(59,130,246,0.35)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0)" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="url(#fpGlow)" />
            {points.map(([x, y], i) => (
              <g key={i}>
                {i > 0 && (
                  <line
                    x1={points[i - 1][0]}
                    y1={points[i - 1][1]}
                    x2={x}
                    y2={y}
                    stroke="rgba(56,189,248,0.35)"
                    strokeWidth="0.8"
                  />
                )}
                <circle cx={x} cy={y} r="2.2" fill="#38BDF8" />
              </g>
            ))}
            <circle cx="50" cy="50" r="3" fill="#3B82F6" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Academic Fingerprint</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            A unique constellation built from mastery, retention, accuracy, behaviour, consistency,
            problem solving, revision, and exam performance — your living academic identity.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
            {["Mastery", "Retention", "Accuracy", "Behaviour", "Consistency", "Exam"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/70 bg-secondary/30 px-2.5 py-1 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function GrowthProjection() {
  return (
    <section className="glass-card mb-6 rounded-2xl p-5" aria-label="Growth projection">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">Growth Projection</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Forecast with confidence intervals across horizons
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {growthProjection.map((g) => (
          <div key={g.horizon} className="rounded-xl border border-border/60 bg-secondary/20 p-4">
            <p className="text-xs font-medium text-primary">{g.horizon}</p>
            <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <p>
                Mastery <span className="float-right font-semibold text-foreground">{g.mastery}%</span>
              </p>
              <p>
                Retention <span className="float-right font-semibold text-foreground">{g.retention}%</span>
              </p>
              <p>
                Accuracy <span className="float-right font-semibold text-foreground">{g.accuracy}%</span>
              </p>
              <p>
                Expected Rank{" "}
                <span className="float-right font-semibold text-foreground">#{g.rank}</span>
              </p>
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground">Confidence interval ±4–6%</p>
          </div>
        ))}
      </div>
    </section>
  )
}
