import $button from "../../../components/button";
import { $$ } from "../../../helpers/query";
import styles from "./styles.module.css";

export default function $toggleAllNotes() {
  const $container = $button({
    type: "button",
    id: "toggleAllNotes",
    className: styles.container,
    textContent: "toggle all notes",
  });

  $container.addEventListener("click", () => {
    const $$note = $$<HTMLDetailsElement>('details[data-name="note"]');
    const isAllOpen = [...$$note].every((note) => note.open);
    for (const $note of $$note) {
      $note.open = !isAllOpen;
    }
  });

  return $container;
}
