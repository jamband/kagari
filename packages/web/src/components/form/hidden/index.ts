export default function $formHidden(props: {
  id: string;
  name: string;
  value?: string;
}) {
  const $container = document.createElement("input");
  $container.type = "hidden";
  $container.id = props.id;
  $container.name = props.name;
  $container.value = props.value || "";

  return $container;
}
