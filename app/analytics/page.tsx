"use client"

import { ShellLayout } from "@/components/layout/shell-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const trendData = [
  { day: "Mon", accuracy: 67, score: 58 },
  { day: "Tue", accuracy: 70, score: 62 },
  { day: "Wed", accuracy: 73, score: 66 },
  { day: "Thu", accuracy: 76, score: 69 },
  { day: "Fri", accuracy: 79, score: 73 },
  { day: "Sat", accuracy: 82, score: 77 },
  { day: "Sun", accuracy: 84, score: 80 },
]

const topicData = [
  { topic: "Math", value: 84 },
  { topic: "Physics", value: 76 },
  { topic: "Chemistry", value: 72 },
  { topic: "Speed", value: 69 },
  { topic: "Retention", value: 74 },
]

export default function AnalyticsPage() {
  return (
    <ShellLayout title="AI Analytics Dashboard" subtitle="Performance intelligence across time, topics, and consistency." aiStatus="analyzing">
      <Tabs defaultValue="live" className="space-y-4">
        <TabsList className="h-auto w-full flex-wrap justify-start bg-secondary/70">
          <TabsTrigger value="live">Live Trend</TabsTrigger>
          <TabsTrigger value="topics">Topic Intelligence</TabsTrigger>
          <TabsTrigger value="consistency">Consistency</TabsTrigger>
        </TabsList>

        <TabsContent value="live">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass-card rounded-xl p-4">
              <p className="panel-title">Accuracy Over Time</p>
              <div className="mt-4 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#223559" />
                    <XAxis dataKey="day" stroke="#9badcf" />
                    <YAxis stroke="#9badcf" />
                    <Tooltip contentStyle={{ background: "#0f1629", border: "1px solid #2a3b5f" }} />
                    <Line type="monotone" dataKey="accuracy" stroke="#22d3ee" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="glass-card rounded-xl p-4">
              <p className="panel-title">Score Trend</p>
              <div className="mt-4 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#223559" />
                    <XAxis dataKey="day" stroke="#9badcf" />
                    <YAxis stroke="#9badcf" />
                    <Tooltip contentStyle={{ background: "#0f1629", border: "1px solid #2a3b5f" }} />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="topics">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass-card rounded-xl p-4">
              <p className="panel-title">Topic-wise Performance Radar</p>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={topicData}>
                    <PolarGrid stroke="#223559" />
                    <PolarAngleAxis dataKey="topic" stroke="#9badcf" />
                    <Radar name="Performance" dataKey="value" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.35} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="glass-card rounded-xl p-4">
              <p className="panel-title">AI Topic Notes</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Math mastery is rising fast with high question completion speed.</li>
                <li>Chemistry retention needs micro-revision every 48 hours.</li>
                <li>Physics conceptual score improves when solved before noon.</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="consistency">
          <div className="glass-card rounded-xl p-4">
            <p className="panel-title">Consistency Graph</p>
            <p className="mt-2 text-sm text-muted-foreground">18 out of 21 recent days met the target study threshold, with highest streak in morning blocks.</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 transition-all duration-700" />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 glass-card rounded-2xl p-6">
        <p className="panel-title">AI Insights Panel</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          You perform best in the morning conceptual blocks and drop speed in late-evening sessions. The model suggests shifting problem-solving to 9:00-11:00 AM and placing revision after 7:00 PM to maximize retention and exam readiness.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
          AI is analyzing your next 7-day prediction...
        </div>
      </div>
    </ShellLayout>
  )
}
