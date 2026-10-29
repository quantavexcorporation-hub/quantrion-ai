/** Display rate for the dollar line next to rupee prices. */
export const INR_PER_USD = 84

export function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value)
}

export function formatUSD(inr: number) {
  const usd = inr / INR_PER_USD
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(usd)
}
