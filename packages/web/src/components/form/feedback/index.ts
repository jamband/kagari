import styles from "./styles.module.css";

export default function $formFeedback(props: {
  id: string;
}) {
  const $container = document.createElement("div");
  $container.id = props.id;
  $container.className = styles.container;

  return $container;
}
