import type { Note } from "../../../types/notes";
import styles from "./styles.module.css";

export default function $noteContent(props: {
  note: Note;
}) {
  const $container = document.createElement("div");
  $container.className = styles.container;
  $container.textContent = props.note.content;

  return $container;
}
