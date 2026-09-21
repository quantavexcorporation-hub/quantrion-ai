"use client"

import { Filter, Search, SortAsc } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { heroStats } from "./data"

const toneClass = {
  blue: "text-primary",
  sky: "text-sky-400",
  green: "text-green-400",
  amber: "text-amber-400",
}

export function StudyMaterialToolbar() {
  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
      <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          aria-label="Search study material"
          placeholder="Search topics, formulas, PYQs..."
          className="h-9 border-border/60 bg-secondary/40 pl-9 text-sm"
        />
      </div>
      <Select defaultValue="physics">
        <SelectTrigger className="h-9 w-[130px] border-border/60 bg-secondary/40" aria-label="Subject">
          <SelectValue placeholder="Subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="physics">Physics</SelectItem>
          <SelectItem value="math">Math</SelectItem>
          <SelectItem value="chemistry">Chemistry</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="jee">
        <SelectTrigger className="h-9 w-[130px] border-border/60 bg-secondary/40" aria-label="Exam">
          <SelectValue placeholder="Exam" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="jee">JEE Advanced</SelectItem>
          <SelectItem value="main">JEE Main</SelectItem>
          <SelectItem value="neet">NEET</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="all">
        <SelectTrigger className="h-9 w-[120px] border-border/60 bg-secondary/40" aria-label="Difficulty">
          <Filter className="mr-1 h-3.5 w-3.5" />
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All levels</SelectItem>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="relevance">
        <SelectTrigger className="h-9 w-[120px] border-border/60 bg-secondary/40" aria-label="Sort">
          <SortAsc className="mr-1 h-3.5 w-3.5" />
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">Relevance</SelectItem>
          <SelectItem value="retention">Retention</SelectItem>
          <SelectItem value="pyq">PYQ density</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export function HeroStatistics() {
  return (
    <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
      {heroStats.map((stat, i) => (
        <div
          key={stat.label}
          className="glass-card q-fade-up rounded-xl p-3.5"
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <p className="text-[11px] text-muted-foreground">{stat.label}</p>
          <p className={`mt-1 text-xl font-semibold tabular-nums tracking-tight ${toneClass[stat.tone]}`}>
            {stat.value}
          </p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">{stat.delta}</p>
        </div>
      ))}
    </div>
  )
}
