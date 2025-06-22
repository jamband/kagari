import styles from "./styles.module.css";

export default function $message(props: { textContent: string }) {
  const $container = document.createElement("div");
  $container.role = "alert";
  $container.className = styles.container;

  const $pin = document.createElement("div");
  $pin.className = styles.pin;
  $pin.role = "img";
  $pin.ariaLabel = "pin";

  const $text = document.createElement("div");
  $text.className = styles.text;
  $text.textContent = props.textContent;

  $container.append($pin, $text);
  return $container;
}
