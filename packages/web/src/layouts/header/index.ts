import $newNote from "./new-note";
import styles from "./styles.module.css";
import $toggleAllNotes from "./toggle-all-notes";

export default function $header() {
  const $container = document.createElement("header");
  $container.className = styles.container;

  const $containerInner = document.createElement("div");
  $containerInner.className = styles.containerInner;

  $containerInner.append($toggleAllNotes(), $newNote());
  $container.append($containerInner);

  return $container;
}
