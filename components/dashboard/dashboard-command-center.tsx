"use client"

import type { ReactNode } from "react"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { TopBar } from "@/components/layout/top-bar"
import { WelcomeHero } from "@/components/dashboard/welcome-hero"
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
import { PromoTopRow } from "@/components/dashboard/promo-right-rail"

function Fade({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <div className="q-fade-up" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

interface DashboardCommandCenterProps {
  userName?: string
  exam?: string
}

export function DashboardCommandCenter({
  userName = "Arjun",
  exam = "JEE Advanced 2024",
}: DashboardCommandCenterProps) {
  return (
    <div className="flex h-dvh max-h-dvh overflow-hidden bg-background">
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar aiStatus="learning" userName={`${userName} K.`} userExam={exam} />

        {/* All three original displays — swipe on phones, 3-up from lg */}
        <div className="shrink-0 border-b border-border/60 bg-background/80 px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 xl:px-8">
          <PromoTopRow />
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
          <main className="q-main-canvas min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mx-auto max-w-5xl space-y-6 p-3 sm:space-y-8 sm:p-4 md:p-6 xl:p-8">
              <Fade>
                <WelcomeHero userName={userName} exam={exam} />
              </Fade>

              <Fade delay={40}>
                <ActionCards />
              </Fade>

              <Fade delay={70}>
                <MissionCard />
              </Fade>

              <Fade delay={90}>
                <LearningProgressGrid />
              </Fade>

              <Fade delay={110}>
                <LearningRoadmap />
              </Fade>

              {/* Existing 2×2 intelligence grid — preserved */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Fade delay={130}>
                  <KnowledgeDNA
                    conceptMastery={80}
                    accuracyScore={83}
                    speedIndex={71}
                    retention={78}
                  />
                </Fade>
                <Fade delay={150}>
                  <WeakTopics />
                </Fade>
                <Fade delay={170}>
                  <AISuggestion />
                </Fade>
                <Fade delay={190}>
                  <IntelligenceScore score={76.0} percentileAbove={13} />
                </Fade>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Fade delay={210}>
                  <AIStudyStrategy />
                </Fade>
                <Fade delay={220}>
                  <RevisionIntelligence />
                </Fade>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Fade delay={230}>
                  <MockTestInsights />
                </Fade>
                <Fade delay={240}>
                  <LearningHeatmap />
                </Fade>
              </div>

              <Fade delay={250}>
                <StudyMaterialProgressCard />
              </Fade>

              <Fade delay={260}>
                <ExamReadinessCard />
              </Fade>

              <Fade delay={270}>
                <AIRecommendationCards />
              </Fade>

              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <Fade delay={280}>
                  <RecentLearningTimeline />
                </Fade>
                <Fade delay={290}>
                  <QuickActionsGrid />
                </Fade>
              </div>

              <Fade delay={300}>
                <ProductivityGoalsMotivation />
              </Fade>
            </div>

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
          </main>
        </div>
      </div>

      <FloatingAIInsights />
    </div>
  )
}
