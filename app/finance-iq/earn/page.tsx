import type { Metadata } from "next"
import { EarnIq } from "@/components/finance-iq/earn-iq"

export const metadata: Metadata = {
  title: "Quantrion · Earn IQ",
  description: "Track student income and monthly earnings.",
}

export default function EarnIqPage() {
  return <EarnIq />
}
