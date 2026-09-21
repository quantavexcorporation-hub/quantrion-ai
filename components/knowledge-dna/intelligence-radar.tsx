"use client"

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { radarAxes } from "./data"

export function IntelligenceRadar() {
  return (
    <section className="glass-card mb-6 rounded-2xl p-5" aria-label="Intelligence radar">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">Intelligence Radar</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Concept · Retention · Speed · Accuracy · Revision · Problem Solving · Confidence · Reasoning
      </p>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarAxes}>
            <PolarGrid stroke="#1A2438" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: "#94A3B8", fontSize: 11 }} />
            <Radar dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.32} />
            <Tooltip
              contentStyle={{
                background: "#0E1524",
                border: "1px solid #1A2438",
                borderRadius: 8,
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
