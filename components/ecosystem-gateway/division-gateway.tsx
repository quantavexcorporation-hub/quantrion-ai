"use client"

import { divisionCards } from "./data"
import { DivisionCard } from "./division-card"

/**
 * Three ecosystem gateway portals — placed below the dashboard hero.
 * Not ads: interactive entries into Q1, Q2, and Qrion.
 */
export function DivisionGateway() {
  return (
    <section aria-label="Quantrion ecosystem divisions">
      <div className="mb-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Ecosystem gateways
        </p>
        <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
          Three layers. One intelligence system.
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Q1 learns · Q2 researches · Qrion deploys — enter any world without leaving Quantrion.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {divisionCards.map((d) => (
          <div key={d.id} className={d.id === "qrion" ? "sm:col-span-2 xl:col-span-1" : undefined}>
            <DivisionCard division={d} />
          </div>
        ))}
      </div>
    </section>
  )
}
