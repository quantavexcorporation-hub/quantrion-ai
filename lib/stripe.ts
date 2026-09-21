import Stripe from 'stripe'
import type { BillingCycle, PlanId, AddOnId } from '@/components/monetization/types'
import { PLANS, ADDONS } from '@/components/monetization/data'

let stripe: Stripe | null = null

function getStripeClient() {
  if (stripe) return stripe
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey || secretKey.includes('test_your')) {
    throw new Error('Invalid STRIPE_SECRET_KEY in environment variables')
  }
  stripe = new Stripe(secretKey, {
    apiVersion: '2024-10-28.acacia',
  })
  return stripe
}

export async function createCheckoutSession({
  userId,
  planId,
  billingCycle,
  addOnIds,
  successUrl,
  cancelUrl,
}: {
  userId: string
  planId: PlanId
  billingCycle: BillingCycle
  addOnIds: AddOnId[]
  successUrl: string
  cancelUrl: string
}) {
  const plan = PLANS.find(p => p.id === planId)
  if (!plan) throw new Error('Invalid plan')

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []

  // Add main plan
  if (plan.monthlyPrice > 0) {
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
    lineItems.push({
      price_data: {
        currency: 'inr',
        product_data: {
          name: `${plan.name} Plan (${billingCycle})`,
          description: plan.tagline,
          images: [],
        },
        unit_amount: price * 100, // Convert to cents
        recurring: {
          interval: billingCycle === 'monthly' ? 'month' : 'year',
        },
      },
      quantity: 1,
    })
  }

  // Add add-ons
  for (const addOnId of addOnIds) {
    const addOn = ADDONS.find(a => a.id === addOnId)
    if (addOn) {
      lineItems.push({
        price_data: {
          currency: 'inr',
          product_data: {
            name: addOn.name,
            description: addOn.description,
          },
          unit_amount: addOn.priceMonthly * 100,
          recurring: {
            interval: 'month',
          },
        },
        quantity: 1,
      })
    }
  }

  const session = await getStripeClient().checkout.sessions.create({
    customer_email: undefined, // Will be set by auth
    billing_address_collection: 'auto',
    line_items: lineItems,
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
      planId,
      billingCycle,
      addOnIds: addOnIds.join(','),
    },
  })

  return session
}

export async function createCustomerPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string
  returnUrl: string
}) {
  const session = await getStripeClient().billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })

  return session
}

export async function handleWebhook({
  body,
  signature,
}: {
  body: string
  signature: string
}) {
  const event = getStripeClient().webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  return event
}

export async function getSubscriptionDetails(subscriptionId: string) {
  const subscription = await getStripeClient().subscriptions.retrieve(subscriptionId)
  return subscription
}

export async function cancelSubscription(subscriptionId: string) {
  const subscription = await getStripeClient().subscriptions.cancel(subscriptionId)
  return subscription
}

export async function updateSubscription({
  subscriptionId,
  addOnIds,
}: {
  subscriptionId: string
  addOnIds: AddOnId[]
}) {
  // Implementation for updating subscription add-ons
  const subscription = await getStripeClient().subscriptions.retrieve(subscriptionId)
  return subscription
}
