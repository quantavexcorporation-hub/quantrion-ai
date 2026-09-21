"use client"

import { GlowCard } from "@/components/ui/glow-card"
import { CircularProgress } from "@/components/ui/circular-progress"
import { StatusBadge } from "@/components/ui/status-badge"
import { TrendingUp, AlertTriangle, Target, Clock, RefreshCw, CheckCircle, XCircle } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

const trajectoryData = [
  { week: "Week 1", actual: 82, predicted: null },
  { week: "Week 2", actual: 85, predicted: null },
  { week: "Week 3", actual: 88, predicted: null },
  { week: "Week 4", actual: 91, predicted: 91 },
  { week: "Week 5", actual: null, predicted: 94 },
  { week: "Exam", actual: null, predicted: 97 },
]

interface PredictiveAnalyticsProps {
  projectedScore?: number
  timeToTarget?: number
  targetPercentile?: number
  bestCase?: number
  worstCase?: number
}

export function PredictiveAnalytics({
  projectedScore = 92,
  timeToTarget = 20,
  targetPercentile = 95,
  bestCase = 97,
  worstCase = 83,
}: PredictiveAnalyticsProps) {
  return (
    <GlowCard className="p-5" glowColor="cyan">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Predictive Analytics</h2>
            <p className="text-xs text-muted-foreground">AI-powered future projections</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <StatusBadge variant="processing" label="Analyzing patterns..." />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left: Chart */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-foreground">Score Trajectory Forecast</h3>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-cyan-500 rounded" />
                <span className="text-muted-foreground">Actual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-cyan-500/50 rounded border-dashed" style={{ borderStyle: "dashed" }} />
                <span className="text-muted-foreground">Predicted</span>
              </div>
            </div>
          </div>
          
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trajectoryData}>
                <XAxis 
                  dataKey="week" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 10 }}
                />
                <YAxis 
                  domain={[60, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0D1321",
                    border: "1px solid #1E293B",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#F8FAFC" }}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#06B6D4"
                  strokeWidth={2}
                  dot={{ fill: "#06B6D4", r: 4 }}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#06B6D4"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "#06B6D4", r: 4, strokeDasharray: "0" }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Projected Score */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 mb-2">
            <Target className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Projected Score</span>
          </div>
          <CircularProgress
            value={projectedScore}
            size={140}
            strokeWidth={10}
            color="#22C55E"
            label="percentile"
          />
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Based on current trajectory
          </p>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-border/50">
        {/* Time to Target */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
          <Clock className="w-5 h-5 text-cyan-400 mt-0.5" />
          <div>
            <span className="text-xs text-muted-foreground">Time to Target</span>
            <p className="text-xl font-bold text-cyan-400">{timeToTarget} days</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              To reach {targetPercentile}th percentile goal
            </p>
          </div>
        </div>

        {/* Risk Detection */}
        <div className="p-3 rounded-lg bg-secondary/30">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-medium text-foreground">Risk Detection</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Organic Chemistry retention</span>
              <span className="text-red-400 font-medium">Dropping</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Practice consistency</span>
              <span className="text-yellow-400 font-medium">Low</span>
            </div>
          </div>
        </div>

        {/* Scenario Analysis */}
        <div className="p-3 rounded-lg bg-secondary/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-xs font-medium text-foreground">Scenario Analysis</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span className="text-muted-foreground">Best case</span>
              </div>
              <span className="text-green-400 font-medium">{bestCase}th percentile</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <XCircle className="w-3 h-3 text-orange-400" />
                <span className="text-muted-foreground">Worst case</span>
              </div>
              <span className="text-orange-400 font-medium">{worstCase}th percentile</span>
            </div>
          </div>
        </div>
      </div>
    </GlowCard>
  )
}
