import type { Metadata } from "next"
import { ScholarshipIq } from "@/components/finance-iq/scholarship-iq"

export const metadata: Metadata = {
  title: "Quantrion · Scholarship IQ",
  description: "Track scholarship applications, deadlines, and awarded aid.",
}

export default function ScholarshipIqPage() {
  return <ScholarshipIq />
}
