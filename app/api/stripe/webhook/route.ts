import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { handleWebhook } from '@/lib/stripe'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = (await headers()).get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    const event = await handleWebhook({ body, signature })

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const metadata = session.metadata

        if (metadata?.userId) {
          // Update user's subscription
          await db.users.update(metadata.userId, {
            plan: metadata.planId as any,
            addons: metadata.addOnIds?.split(',') || [],
          })

          // Create study session record
          await db.sessions.create({
            userId: metadata.userId,
            subject: 'subscription',
            topic: `upgraded_to_${metadata.planId}`,
            startTime: new Date(),
            questionsAnswered: 0,
            accuracy: 0,
            aiInteractions: 0,
          })
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        // Handle successful payment
        console.log('Payment succeeded for subscription:', invoice.subscription)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        // Handle failed payment
        console.log('Payment failed for subscription:', invoice.subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        // Handle subscription cancellation
        console.log('Subscription cancelled:', subscription.id)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
}
