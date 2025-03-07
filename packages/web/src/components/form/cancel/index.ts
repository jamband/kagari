import $button from "../../button";
import styles from "./styles.module.css";

export default function $formCancel(props: {
  textContent: string;
  autofocus?: boolean;
}) {
  const $container = $button({
    type: "button",
    className: styles.container,
    textContent: props.textContent,
  });

  $container.autofocus = props.autofocus || false;

  return $container;
}
