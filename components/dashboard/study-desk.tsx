"use client"

import type { ReactNode } from "react"
import { ActionCards } from "@/components/dashboard/action-cards"
import { KnowledgeDNA } from "@/components/dashboard/knowledge-dna"
import { IntelligenceScore } from "@/components/dashboard/intelligence-score"
import { WeakTopics } from "@/components/dashboard/weak-topics"
import { AISuggestion } from "@/components/dashboard/ai-suggestion"
import { StatsFooter } from "@/components/dashboard/stats-footer"
import { MissionCard } from "@/components/dashboard/mission-card"
import { LearningProgressGrid } from "@/components/dashboard/learning-progress-grid"
import { LearningRoadmap } from "@/components/dashboard/learning-roadmap"
import { AIStudyStrategy } from "@/components/dashboard/ai-study-strategy"
import { RevisionIntelligence } from "@/components/dashboard/revision-intelligence"
import { MockTestInsights } from "@/components/dashboard/mock-test-insights"
import { StudyMaterialProgressCard } from "@/components/dashboard/study-material-progress"
import { LearningHeatmap } from "@/components/dashboard/learning-heatmap"
import { ExamReadinessCard } from "@/components/dashboard/exam-readiness-card"
import { AIRecommendationCards } from "@/components/dashboard/ai-recommendation-cards"
import { RecentLearningTimeline } from "@/components/dashboard/recent-learning-timeline"
import { ProductivityGoalsMotivation } from "@/components/dashboard/productivity-goals-motivation"
import { QuickActionsGrid } from "@/components/dashboard/quick-actions-grid"
import { FloatingAIInsights } from "@/components/dashboard/floating-ai-insights"

function Fade({ children }: { children: ReactNode }) {
  return <div className="q-fade-up">{children}</div>
}

export function StudyDesk() {
  return (
    <>
      <Fade>
        <ActionCards />
      </Fade>
      <Fade>
        <MissionCard />
      </Fade>
      <Fade>
        <LearningProgressGrid />
      </Fade>
      <Fade>
        <LearningRoadmap />
      </Fade>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Fade>
          <KnowledgeDNA conceptMastery={80} accuracyScore={83} speedIndex={71} retention={78} />
        </Fade>
        <Fade>
          <WeakTopics />
        </Fade>
        <Fade>
          <AISuggestion />
        </Fade>
        <Fade>
          <IntelligenceScore score={76.0} percentileAbove={13} />
        </Fade>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Fade>
          <AIStudyStrategy />
        </Fade>
        <Fade>
          <RevisionIntelligence />
        </Fade>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Fade>
          <MockTestInsights />
        </Fade>
        <Fade>
          <LearningHeatmap />
        </Fade>
      </div>
      <Fade>
        <StudyMaterialProgressCard />
      </Fade>
      <Fade>
        <ExamReadinessCard />
      </Fade>
      <Fade>
        <AIRecommendationCards />
      </Fade>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Fade>
          <RecentLearningTimeline />
        </Fade>
        <Fade>
          <QuickActionsGrid />
        </Fade>
      </div>
      <Fade>
        <ProductivityGoalsMotivation />
      </Fade>
      <StatsFooter
        totalStudyHours={127}
        hoursThisWeek={12}
        questionsSolved={2847}
        questionsThisWeek={234}
        conceptsMastered={156}
        completionPercent={78}
        aiPrediction={847}
        maxScore={1000}
      />
      <FloatingAIInsights />
    </>
  )
}
