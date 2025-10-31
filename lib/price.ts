export function parsePrice(price: string): number {
  if (!price) return 0;
  const digits = String(price).replace(/\D+/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

export function formatPrice(amount: number): string {
  return `$${amount.toLocaleString("es-CL")}`;
}
