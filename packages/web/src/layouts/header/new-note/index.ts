import $button from "../../../components/button";
import dialog from "../../../helpers/dialog";
import { $ } from "../../../helpers/query";
import styles from "./styles.module.css";

export default function $newNote() {
  const $container = $button({
    type: "button",
    id: "newNote",
    className: styles.container,
    textContent: "new note?",
  });

  $container.addEventListener("click", () => {
    const $titleFeedback = $("#createNoteTitleFeedback");
    const $contentFeedback = $("#createNoteContentFeedback");
    if ($titleFeedback && $contentFeedback) {
      $titleFeedback.textContent = "";
      $contentFeedback.textContent = "";
    }

    const $dialog = $<HTMLDialogElement>("#createNoteDialog");
    if ($dialog) dialog($dialog).show();
  });

  return $container;
}
