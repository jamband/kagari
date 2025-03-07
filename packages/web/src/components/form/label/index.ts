export default function $formLabel(props: {
  id: string;
  textContent: string;
}) {
  const $container = document.createElement("label");
  $container.htmlFor = props.id;
  $container.textContent = props.textContent;

  return $container;
}
