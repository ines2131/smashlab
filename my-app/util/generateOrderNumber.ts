import crypto from "crypto";

export function generateOrderNumber() {
  const random = crypto.randomBytes(4).toString("hex").toUpperCase();

  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  return `SM-${datePart}-${random}`;
}
