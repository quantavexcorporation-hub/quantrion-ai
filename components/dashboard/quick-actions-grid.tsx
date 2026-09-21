"use client"

import Link from "next/link"
import { quickActions } from "./command-data"

export function QuickActionsGrid() {
  return (
    <section aria-label="Quick actions">
      <div className="mb-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Quick Actions</h2>
        <p className="text-sm text-muted-foreground">Jump into any part of the Quantrion loop</p>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
        {quickActions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="q-surface-interactive rounded-xl px-3 py-3 text-center text-xs font-medium text-foreground"
          >
            {action.title}
          </Link>
        ))}
      </div>
    </section>
  )
}
