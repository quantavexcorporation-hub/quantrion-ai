"use client"

import { KnowledgeDNA } from "@/components/dashboard/knowledge-dna"
import { ShellLayout } from "@/components/layout/shell-layout"
import { AcademicDnaOverview } from "@/components/knowledge-dna/academic-dna-overview"
import { DnaStructure } from "@/components/knowledge-dna/dna-structure"
import { DnaEvolutionTimeline } from "@/components/knowledge-dna/dna-evolution-timeline"
import { LearningPersonality } from "@/components/knowledge-dna/learning-personality"
import { IntelligenceRadar } from "@/components/knowledge-dna/intelligence-radar"
import { ConceptGenome } from "@/components/knowledge-dna/concept-genome"
import { DependencyGraph } from "@/components/knowledge-dna/dependency-graph"
import { CognitiveAndBehaviour } from "@/components/knowledge-dna/cognitive-and-behaviour"
import { PatternsAndPotential } from "@/components/knowledge-dna/patterns-and-potential"
import {
  AcademicFingerprint,
  GrowthProjection,
} from "@/components/knowledge-dna/fingerprint-and-growth"
import {
  AICoachPanel,
  ComparativeAndAchievements,
  FutureIntelligence,
  KnowledgeHealth,
} from "@/components/knowledge-dna/health-coach-and-more"

export default function KnowledgeDnaPage() {
  return (
    <ShellLayout
      title="Progress IQ"
      subtitle="Your living academic identity — Knowledge DNA across mastery, speed, retention, behaviour, and exam readiness."
      aiStatus="analyzing"
    >
      {/* NEW: Academic DNA Overview */}
      <AcademicDnaOverview />

      {/* EXISTING foundation — preserved & visually enhanced */}
      <div className="mb-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <KnowledgeDNA conceptMastery={84} accuracyScore={82} speedIndex={76} retention={72} />
        <div className="space-y-4">
          <div className="glass-card rounded-xl p-4 transition-transform hover:-translate-y-0.5">
            <p className="panel-title">Skill Graph</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Vector calculus and mechanics are high-growth clusters this week.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-md bg-sky-500/15 px-2 py-1 text-sky-300">Mechanics ↑</span>
              <span className="rounded-md bg-primary/15 px-2 py-1 text-primary">Calc applications ↑</span>
              <span className="rounded-md bg-amber-500/15 px-2 py-1 text-amber-300">Organic watch</span>
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 transition-transform hover:-translate-y-0.5">
            <p className="panel-title">Concept Heatmap</p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[
                "#22d3ee",
                "#818cf8",
                "#34d399",
                "#facc15",
                "#22d3ee",
                "#a78bfa",
                "#f472b6",
                "#34d399",
              ].map((color, i) => (
                <div
                  key={i}
                  className="h-10 rounded-md transition-transform hover:scale-105"
                  style={{ backgroundColor: color, opacity: 0.3 + (i % 4) * 0.15 }}
                  title={`Cluster ${i + 1}`}
                />
              ))}
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">
              Brighter cells = higher recent learning density
            </p>
          </div>
        </div>
      </div>

      {/* NEW intelligence layer */}
      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        <div className="min-w-0 space-y-0">
          <DnaStructure />
          <DnaEvolutionTimeline />
          <LearningPersonality />
          <IntelligenceRadar />
          <ConceptGenome />
          <DependencyGraph />
          <CognitiveAndBehaviour />
          <PatternsAndPotential />
          <AcademicFingerprint />
          <GrowthProjection />
          <ComparativeAndAchievements />
          <KnowledgeHealth />
          <FutureIntelligence />
        </div>
        <div className="hidden xl:block">
          <AICoachPanel />
        </div>
      </div>

      {/* Coach on smaller screens */}
      <div className="mt-6 xl:hidden">
        <AICoachPanel />
      </div>
    </ShellLayout>
  )
}
