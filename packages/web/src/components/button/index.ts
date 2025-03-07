import styles from "./styles.module.css";

export default function $button(props: {
  type: "button" | "submit";
  id?: string;
  className: string;
  textContent: string;
}) {
  const $container = document.createElement("button");
  if (props.id) $container.id = props.id;
  $container.className = `${styles.container} ${props.className}`;
  $container.textContent = props.textContent;

  return $container;
}
