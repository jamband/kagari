import styles from "./styles.module.css";

export default function $form(props: { id: string }) {
  const $container = document.createElement("form");
  $container.id = props.id;
  $container.className = styles.container;
  $container.autocomplete = "off";

  return $container;
}
