export default function $baseIcon(props: {
  className: string;
  viewBox: `${number} ${number} ${number} ${number}`;
}) {
  const $container = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  );
  $container.setAttribute("class", props.className);
  $container.setAttribute("viewBox", props.viewBox);
  $container.setAttribute("fill", "currentColor");
  $container.setAttribute("role", "img");
  $container.setAttribute("aria-hidden", "true");

  return $container;
}
