import $button from "../../button";
import styles from "./styles.module.css";

export default function $formSubmit(props: { textContent: string }) {
  const $container = $button({
    type: "submit",
    className: styles.container,
    textContent: props.textContent,
  });

  return $container;
}
