"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { difficultyDistribution, topicFrequency } from "./data"
import { Heatmap } from "./heatmap"

const pieColors = ["#22C55E", "#3B82F6", "#F59E0B"]

export function AnalyticsCharts() {
  return (
    <section id="pyq-analytics" className="q-fade-up scroll-mt-24" style={{ animationDelay: "210ms" }}>
      <div className="mb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Section 09
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">PYQ Analytics</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Frequency, difficulty, patterns, and prediction scores.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="glass-card rounded-2xl p-4 xl:col-span-1">
          <p className="panel-title">Topic Frequency</p>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicFrequency}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2438" />
                <XAxis dataKey="topic" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: "#0E1524",
                    border: "1px solid #1A2438",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4">
          <p className="panel-title">Difficulty Distribution</p>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={3}
                >
                  {difficultyDistribution.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#0E1524",
                    border: "1px solid #1A2438",
                    borderRadius: 8,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-3 text-xs text-muted-foreground">
            {difficultyDistribution.map((d, i) => (
              <span key={d.name} className="inline-flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: pieColors[i] }}
                />
                {d.name} {d.value}%
              </span>
            ))}
          </div>
        </div>

        <Heatmap />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Importance Score", value: "9.1 / 10" },
          { label: "Prediction Score", value: "87%" },
          { label: "Question Pattern", value: "Impulse + graph" },
        ].map((item) => (
          <div key={item.label} className="glass-card rounded-xl p-4">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="mt-1 text-lg font-semibold text-foreground">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
