"use client"

import { GlowCard } from "@/components/ui/glow-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Briefcase, Sparkles, ChevronRight, TrendingUp, DollarSign, Building2 } from "lucide-react"

interface Career {
  title: string
  field: string
  matchScore: number
  isBestMatch: boolean
  tags: string[]
  salaryRange?: string
  growth?: string
  topRecruiters?: string[]
}

const careers: Career[] = [
  {
    title: "Computer Science Engineer",
    field: "Technology",
    matchScore: 94,
    isBestMatch: true,
    tags: ["AI/ML", "Software Dev", "Data Science"],
    salaryRange: "15-45 LPA",
    growth: "+28%",
    topRecruiters: ["Google", "Microsoft", "Amazon", "Meta"],
  },
  {
    title: "Research Scientist",
    field: "Academia",
    matchScore: 76,
    isBestMatch: false,
    tags: ["Physics", "Mathematics", "Research"],
  },
  {
    title: "Electronics Engineer",
    field: "Engineering",
    matchScore: 88,
    isBestMatch: false,
    tags: [],
  },
]

export function CareerGuidance() {
  return (
    <GlowCard className="p-5" glowColor="green">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20">
            <Briefcase className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">AI Career Guidance</h2>
            <p className="text-xs text-muted-foreground">Personalized career predictions</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Based on your profile analysis</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Career Cards */}
        <div className="space-y-3">
          {careers.map((career, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                career.isBestMatch
                  ? "bg-green-500/5 border-green-500/20 hover:border-green-500/40"
                  : "bg-secondary/20 border-border/30 hover:border-border/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex items-center justify-center w-9 h-9 rounded-lg ${
                  career.isBestMatch ? "bg-green-500/10" : "bg-secondary/50"
                }`}>
                  {career.isBestMatch ? (
                    <Image
                      src="/quantrion-logo.png"
                      alt="Quantrion"
                      width={16}
                      height={16}
                      className="h-4 w-4 object-contain"
                    />
                  ) : (
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{career.title}</span>
                    {career.isBestMatch && (
                      <StatusBadge variant="active" label="BEST MATCH" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{career.field}</p>
                  {career.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {career.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="px-1.5 py-0.5 text-[10px] text-muted-foreground bg-secondary/50 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${
                    career.isBestMatch ? "text-green-400" : "text-foreground"
                  }`}>
                    {career.matchScore}%
                  </span>
                  <p className="text-[10px] text-muted-foreground">Match Score</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>

        {/* Best Match Details */}
        <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/quantrion-logo.png"
              alt="Quantrion"
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
            <span className="text-sm font-semibold text-foreground">{careers[0].title}</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Salary Range</p>
                <p className="text-sm font-medium text-foreground">{careers[0].salaryRange}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Industry Growth</p>
                <p className="text-sm font-medium text-green-400">{careers[0].growth}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Top Recruiters</p>
              <div className="flex flex-wrap gap-1.5">
                {careers[0].topRecruiters?.map((recruiter, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs text-foreground bg-secondary/50 rounded border border-border/30"
                  >
                    {recruiter}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-green-950">
            Explore Full Career Path
          </Button>
        </div>
      </div>
    </GlowCard>
  )
}
