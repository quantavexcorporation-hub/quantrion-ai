import type { Metadata } from "next"
import { DashboardCommandCenter } from "@/components/dashboard/dashboard-command-center"

export const metadata: Metadata = {
  title: "Dashboard · Quantrion",
  description: "Quantrion dashboard for exams, courses, and study.",
}

export default function QuantrionDashboard() {
  return <DashboardCommandCenter userName="Arjun" exam="JEE Advanced 2024" />
}
