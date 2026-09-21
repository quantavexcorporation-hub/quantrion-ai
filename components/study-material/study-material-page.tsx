"use client"

import { useState } from "react"
import { ShellLayout } from "@/components/layout/shell-layout"
import { StickySectionNavigation } from "./sticky-section-nav"
import { HeroStatistics, StudyMaterialToolbar } from "./hero-stats"
import { SmartNotesCard } from "./smart-notes-card"
import { LearningTimeline } from "./learning-timeline"
import { RelevantMaterialCard } from "./relevant-material-card"
import { SummaryCard } from "./summary-card"
import { QuickQuestionCard } from "./quick-question-card"
import { ConceptTriggerCard } from "./concept-trigger-card"
import { RecallRevisionCard } from "./recall-revision-card"
import { PYQTimeline } from "./pyq-timeline"
import { AnalyticsCharts } from "./analytics-charts"
import { AIExplainDrawer, InContentAISection } from "./ai-explain-drawer"
import { FutureCapabilityCard } from "./future-capability-card"
import { RetentionStrengthCard } from "./retention-strength-card"
import { FloatingAIButton } from "./floating-ai-button"

export function StudyMaterialPage() {
  const [aiOpen, setAiOpen] = useState(false)

  return (
    <ShellLayout
      title="Study Material"
      subtitle="Everything you need to master a topic—from structured notes to AI explanations, concept revision, and previous year questions."
      aiStatus="learning"
      headerActions={<StudyMaterialToolbar />}
    >
      <HeroStatistics />
      <StickySectionNavigation />

      <div className="space-y-10 pb-24">
        <SmartNotesCard />
        <LearningTimeline />
        <RelevantMaterialCard />
        <SummaryCard />
        <QuickQuestionCard />
        <ConceptTriggerCard />
        <RecallRevisionCard />
        <PYQTimeline />
        <AnalyticsCharts />
        <InContentAISection onExplain={() => setAiOpen(true)} />
        <FutureCapabilityCard onAsk={() => setAiOpen(true)} />
        <RetentionStrengthCard />
      </div>

      <FloatingAIButton onClick={() => setAiOpen(true)} />
      <AIExplainDrawer open={aiOpen} onOpenChange={setAiOpen} />
    </ShellLayout>
  )
}
