import dialog from "../../helpers/dialog";
import $iconPlus from "../icon/plus";
import styles from "./styles.module.css";

export default function $dialog(props: {
  id: string;
  closeId: string;
  element: HTMLElement;
}) {
  const $container = document.createElement("dialog");
  $container.id = props.id;
  $container.className = styles.container;

  const $containerInner = document.createElement("div");
  $containerInner.className = styles.containerInner;

  const $closeContainer = document.createElement("div");
  $closeContainer.className = styles.closeContainer;

  const $close = document.createElement("button");
  $close.type = "button";
  $close.id = props.closeId;
  $close.className = styles.close;

  $close.addEventListener("click", () => {
    dialog($container).close();
  });

  const $closeIcon = $iconPlus({
    className: styles.closeIcon,
  });

  $close.append($closeIcon);
  $closeContainer.append($close);
  $containerInner.append($closeContainer, props.element);
  $container.append($containerInner);

  return $container;
}
