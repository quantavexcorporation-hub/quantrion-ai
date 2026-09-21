"use client"

import {
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { ProgressRing } from "@/components/study-material/progress-ring"
import { performanceIQ } from "./command-data"

export function PerformanceIQPanel() {
  return (
    <section className="glass-card rounded-2xl p-5 md:p-6" aria-label="Progress IQ analytics">
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Progress IQ</h2>
        <p className="text-sm text-muted-foreground">
          Accuracy · Speed · Consistency · Retention · Readiness · Prediction
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { label: "Accuracy", value: performanceIQ.accuracy, color: "#22C55E" },
            { label: "Speed", value: performanceIQ.speed, color: "#F59E0B" },
            { label: "Consistency", value: performanceIQ.consistency, color: "#38BDF8" },
            { label: "Retention", value: performanceIQ.retention, color: "#3B82F6" },
            { label: "Exam Readiness", value: performanceIQ.examReadiness, color: "#22C55E" },
            { label: "Prediction", value: Math.round((performanceIQ.prediction / 1000) * 100), color: "#3B82F6" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center rounded-xl border border-border/60 bg-secondary/20 p-3">
              <ProgressRing value={item.value} size={88} strokeWidth={7} color={item.color} />
              <p className="mt-2 text-[11px] text-muted-foreground">{item.label}</p>
              {item.label === "Prediction" && (
                <p className="text-[10px] tabular-nums text-foreground">{performanceIQ.prediction}/1000</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-3">
          <div className="rounded-xl border border-border/60 bg-secondary/15 p-3">
            <p className="mb-2 text-xs font-medium text-foreground">Capability Radar</p>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={performanceIQ.radar}>
                  <PolarGrid stroke="#1A2438" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "#94A3B8", fontSize: 11 }} />
                  <Radar dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-xl border border-border/60 bg-secondary/15 p-3">
            <p className="mb-2 text-xs font-medium text-foreground">Progress IQ Trend</p>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceIQ.trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2438" />
                  <XAxis dataKey="week" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#94A3B8" tick={{ fontSize: 11 }} domain={[60, 90]} />
                  <Tooltip
                    contentStyle={{
                      background: "#0E1524",
                      border: "1px solid #1A2438",
                      borderRadius: 8,
                    }}
                  />
                  <Line type="monotone" dataKey="iq" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="accuracy" stroke="#22C55E" strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
