import type { Metadata } from "next"
import { FinanceDashboard } from "@/components/finance-iq/finance-dashboard"

export const metadata: Metadata = {
  title: "Quantrion · Finance Desk",
  description: "Student financial dashboard for scholarships, earnings, and savings.",
}

export default function FinanceIqPage() {
  return <FinanceDashboard />
}
