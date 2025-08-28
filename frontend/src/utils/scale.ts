/**
 * Scale ingredient quantity based on serving size
 * @param quantity - Original quantity
 * @param fromServings - Original serving size
 * @param toServings - Target serving size
 * @returns Scaled quantity
 */
export function scaleQty(
  quantity: number | undefined,
  fromServings: number,
  toServings: number
): number | undefined {
  if (quantity === undefined) {
    return undefined;
  }
  
  // Calculate scaled quantity
  const scaled = (quantity * toServings) / fromServings;
  
  // Round to 2 decimal places for display
  return Math.round(scaled * 100) / 100;
}