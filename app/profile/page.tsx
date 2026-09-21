"use client"

import { ShellLayout } from "@/components/layout/shell-layout"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function ProfilePage() {
  return (
    <ShellLayout
      title="Profile"
      subtitle="Your learning identity across exams, retention, and AI personalization."
      aiStatus="active"
    >
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <div className="glass-card rounded-2xl p-6">
          <Avatar className="h-16 w-16 border border-border">
            <AvatarFallback className="bg-primary/15 text-lg text-primary">AK</AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-lg font-semibold text-foreground">Arjun K.</h2>
          <p className="text-sm text-muted-foreground">JEE Advanced 2024</p>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>Study streak · 18 days</p>
            <p>Retention · 92%</p>
            <p>Plan · Quantrion Pro</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: "Physics", value: 84 },
            { title: "Mathematics", value: 79 },
            { title: "Chemistry", value: 71 },
            { title: "Mock readiness", value: 73 },
          ].map((item) => (
            <div key={item.title} className="glass-card rounded-xl p-5">
              <p className="panel-title">{item.title}</p>
              <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">{item.value}%</p>
              <Progress value={item.value} className="mt-3 h-1.5" />
            </div>
          ))}
        </div>
      </div>
    </ShellLayout>
  )
}
