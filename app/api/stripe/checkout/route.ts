import { NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'
import type { BillingCycle, PlanId, AddOnId } from '@/components/monetization/types'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { planId, billingCycle, addOnIds } = body as {
      planId: PlanId
      billingCycle: BillingCycle
      addOnIds: AddOnId[]
    }

    // Validate input
    if (!planId || !billingCycle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get user from auth (simplified for MVP)
    const userId = 'demo-user' // Will come from auth session

    const session = await createCheckoutSession({
      userId,
      planId,
      billingCycle,
      addOnIds: addOnIds || [],
      successUrl: `${process.env.NEXTAUTH_URL}/app/upgrade?success=true`,
      cancelUrl: `${process.env.NEXTAUTH_URL}/app/upgrade?canceled=true`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
