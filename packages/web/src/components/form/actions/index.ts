import styles from "./styles.module.css";

export default function $formActions(...$nodes: Array<Node>) {
  const $container = document.createElement("div");
  $container.className = styles.container;
  $container.append(...$nodes);

  return $container;
}
