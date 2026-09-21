"use client"

import { ShellLayout } from "@/components/layout/shell-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TestsPage() {
  return (
    <ShellLayout title="Tests (Exam Simulator)" subtitle="Real-exam simulation with adaptive ranking and post-test diagnostics." aiStatus="predicting">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="panel-title">JEE Mock Exam Simulator</p>
            <span className="text-sm text-cyan-300">02:11:45</span>
          </div>
          <p className="text-sm text-muted-foreground">Question #18 of 75</p>
          <div className="mt-4 rounded-xl border border-border bg-secondary/40 p-4 text-sm text-foreground">
            If f(x) = x^3 + 2x, find f&apos;(x).
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-6">
          <p className="panel-title">Question Navigation</p>
          <div className="mt-4 grid grid-cols-5 gap-2 text-xs">
            {Array.from({ length: 20 }).map((_, i) => (
              <button key={i} className="rounded-md border border-border bg-secondary/40 px-2 py-1.5 text-muted-foreground hover:border-cyan-400/50">
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Tabs defaultValue="breakdown" className="mt-6 glass-card rounded-xl p-4">
        <TabsList className="h-auto w-full flex-wrap justify-start bg-secondary/70">
          <TabsTrigger value="breakdown">Performance Breakdown</TabsTrigger>
          <TabsTrigger value="rank">Rank Prediction</TabsTrigger>
          <TabsTrigger value="weak">Weak Area Detection</TabsTrigger>
        </TabsList>
        <TabsContent value="breakdown" className="mt-3 text-sm text-muted-foreground">
          Physics 71 | Chemistry 79 | Math 83. Accuracy increased in high-weightage sections.
        </TabsContent>
        <TabsContent value="rank" className="mt-3 text-sm text-muted-foreground">
          Projected rank: 5,840 +/- 420 with current trajectory; target 4,900 within 3 mocks.
        </TabsContent>
        <TabsContent value="weak" className="mt-3 text-sm text-muted-foreground">
          Heat transfer and organic reaction sequence need reinforcement through rapid recall blocks.
        </TabsContent>
      </Tabs>
      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-200">
        AI is simulating final exam outcomes...
      </div>
    </ShellLayout>
  )
}
