import { notesIdClient } from "../../../clients/notes";
import { modestAction } from "../../../helpers/action";
import dialog from "../../../helpers/dialog";
import { $ } from "../../../helpers/query";
import type { Note, PinNoteForm, UnpinNoteForm } from "../../../types/notes";
import $button from "../../button";
import styles from "./styles.module.css";

export default function $noteActions(props: { note: Note }) {
  const $container = document.createElement("div");
  $container.className = styles.container;

  const $pin = $button({
    type: "button",
    className: styles.button,
    textContent: props.note.pin ? "unpin" : "pin",
  });

  $pin.addEventListener("click", async () => {
    modestAction($pin);

    const input = {
      param: { id: `${props.note.id}` },
    } satisfies PinNoteForm | UnpinNoteForm;

    if (props.note.pin) {
      const res = await notesIdClient.unpin.$patch(input);
      if (res.ok) {
        window.location.reload();
      }
    } else {
      const res = await notesIdClient.pin.$patch(input);
      if (res.ok) {
        window.location.reload();
      }
    }
  });

  const $update = $button({
    type: "button",
    className: styles.button,
    textContent: "update",
  });

  $update.addEventListener("click", () => {
    const $titleFeedback = $("#updateNoteTitleFeedback");
    const $contentFeedback = $("#updateNoteContentFeedback");
    if ($titleFeedback && $contentFeedback) {
      $titleFeedback.textContent = "";
      $contentFeedback.textContent = "";
    }

    const $id = $<HTMLInputElement>("#updateNoteId");
    const $title = $<HTMLInputElement>("#updateNoteTitle");
    const $content = $<HTMLInputElement>("#updateNoteContent");

    if ($id && $title && $content) {
      $id.value = `${props.note.id}`;
      $title.value = props.note.title;
      $content.value = props.note.content;
    }

    const $dialog = $<HTMLDialogElement>("#updateNoteDialog");
    if ($dialog) dialog($dialog).show();
  });

  const $delete = $button({
    type: "button",
    className: styles.button,
    textContent: "delete",
  });

  $delete.addEventListener("click", () => {
    const $id = $<HTMLInputElement>("#deleteNoteId");
    const $title = $<HTMLInputElement>("#deleteNoteTitle");
    const $content = $<HTMLInputElement>("#deleteNoteContent");

    if ($id && $title && $content) {
      $id.value = `${props.note.id}`;
      $title.value = props.note.title;
      $content.value = props.note.content;
    }

    const $dialog = $<HTMLDialogElement>("#deleteNoteDialog");
    if ($dialog) dialog($dialog).show();
  });

  $container.append($pin, $update, $delete);
  return $container;
}
