import type { Note } from "../../../types/notes";
import $iconPlus from "../../icon/plus";
import styles from "./styles.module.css";

export default function $noteSummary(props: {
  note: Note;
}) {
  const $container = document.createElement("summary");
  $container.className = styles.container;

  const $pin = document.createElement("div");
  $pin.className = props.note.pin ? styles.pin : styles.unpin;
  $pin.role = "img";
  $pin.ariaLabel = props.note.pin ? "pin" : "unpin";

  const $title = document.createElement("div");
  $title.className = styles.title;
  $title.textContent = props.note.title;

  const $icon = $iconPlus({
    className: styles.titleIcon,
  });

  $container.append($pin, $title, $icon);
  return $container;
}
