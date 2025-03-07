export function $<T extends Element>(selector: string) {
  return document.querySelector<T>(selector);
}

export function $$<T extends Element>(selector: string) {
  return document.querySelectorAll<T>(selector);
}
