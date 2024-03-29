export function isTouchDevice(): boolean {
  try {
    return (
      "ontouchstart" in document.documentElement ||
      navigator.maxTouchPoints > 0 ||
      //@ts-expect-error : also noticing the microsoft touch points
      navigator.msMaxTouchPoints > 0
    );
  } catch (error) {
    console.error(error);
    return false;
  }
}
