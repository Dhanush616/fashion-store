export const TAX_RATE = 0.08;
export const FREE_SHIPPING_THRESHOLD = 999;
export const SHIPPING_FLAT = 49;

export function formatPrice(value) {
  const num = Number(value) || 0;
  const decimals = Number.isInteger(num) ? 0 : 2;
  return (
    "₹" +
    num.toLocaleString("en-IN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: 2,
    })
  );
}

export function cartItemTotal(item) {
  return (item.product?.price || item.price || 0) * (item.qty || 1);
}

export function calcSubtotal(items) {
  return items.reduce((sum, it) => sum + cartItemTotal(it), 0);
}

export function calcTax(subtotal) {
  return subtotal * TAX_RATE;
}

export function calcShipping(subtotal) {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
}

export function calcTotals(items) {
  const subtotal = calcSubtotal(items);
  const tax = calcTax(subtotal);
  const shipping = calcShipping(subtotal);
  const total = subtotal + tax + shipping;
  return { subtotal, tax, shipping, total };
}

export function cartCount(items) {
  return items.reduce((n, it) => n + (it.qty || 1), 0);
}
