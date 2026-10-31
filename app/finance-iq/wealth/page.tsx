import type { Metadata } from "next"
import { WealthIq } from "@/components/finance-iq/wealth-iq"

export const metadata: Metadata = {
  title: "Quantrion · Wealth IQ",
  description: "Set a student savings goal and a monthly contribution.",
}

export default function WealthIqPage() {
  return <WealthIq />
}
