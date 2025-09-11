import { parseResponse } from "hono/client";
import { notesIdClient } from "../../../clients/notes";
import $form from "../../../components/form";
import $formActions from "../../../components/form/actions";
import $formCancel from "../../../components/form/cancel";
import $formHidden from "../../../components/form/hidden";
import $formSubmit from "../../../components/form/submit";
import $formTextarea from "../../../components/form/textarea";
import $formTextbox from "../../../components/form/textbox";
import { modestAction } from "../../../helpers/action";
import dialog from "../../../helpers/dialog";
import { $ } from "../../../helpers/query";
import type { DeleteNoteForm } from "../../../types/notes";

export default function $deleteNoteForm() {
  const $container = $form({
    id: "deleteNoteForm",
  });

  const $cancel = $formCancel({
    textContent: "cancel",
    autofocus: true,
  });

  const $submit = $formSubmit({
    textContent: "delete",
  });

  $container.append(
    $formHidden({
      id: "deleteNoteId",
      name: "id",
    }),
    $formTextbox({
      labelTextContent: "title",
      id: "deleteNoteTitle",
      name: "title",
      disabled: true,
    }),
    $formTextarea({
      labelTextContent: "content",
      id: "deleteNoteContent",
      name: "content",
      disabled: true,
    }),
    $formActions($cancel, $submit),
  );

  $cancel.addEventListener("click", (event) => {
    event.preventDefault();
    const $dialog = $<HTMLDialogElement>("#deleteNoteDialog");
    if ($dialog) dialog($dialog).close();
  });

  $container.addEventListener("submit", async (event) => {
    event.preventDefault();
    modestAction($submit);

    const data = Object.fromEntries(new FormData($container)) as DeleteNoteForm;

    await parseResponse(
      notesIdClient.$delete({
        param: { id: data.id },
      }),
    );

    window.location.reload();
  });

  return $container;
}
