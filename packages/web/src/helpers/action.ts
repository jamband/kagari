export function modestAction($element: HTMLButtonElement) {
  $element.setAttribute("disabled", "true");
  setTimeout(() => $element.removeAttribute("disabled"), 1000);
}
