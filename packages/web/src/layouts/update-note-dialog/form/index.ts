import { parseResponse } from "hono/client";
import { notesIdClient } from "../../../clients/notes";
import $form from "../../../components/form";
import $formActions from "../../../components/form/actions";
import $formHidden from "../../../components/form/hidden";
import $formSubmit from "../../../components/form/submit";
import $formTextarea from "../../../components/form/textarea";
import $formTextbox from "../../../components/form/textbox";
import { modestAction } from "../../../helpers/action";
import { $ } from "../../../helpers/query";
import type { Feedback } from "../../../types/feedback";
import type { UpdateNoteForm, UpdateNoteRequest } from "../../../types/notes";

export default function $updateNoteForm() {
  const $container = $form({
    id: "updateNoteForm",
  });

  const $submit = $formSubmit({
    textContent: "update",
  });

  $container.append(
    $formHidden({
      id: "updateNoteId",
      name: "id",
    }),
    $formTextbox({
      labelTextContent: "title",
      id: "updateNoteTitle",
      name: "title",
      feedbackId: "updateNoteTitleFeedback",
      focus: true,
    }),
    $formTextarea({
      labelTextContent: "content",
      id: "updateNoteContent",
      name: "content",
      feedbackId: "updateNoteContentFeedback",
    }),
    $formActions($submit),
  );

  $container.addEventListener("submit", async (event) => {
    event.preventDefault();
    modestAction($submit);

    const data = Object.fromEntries(new FormData($container)) as UpdateNoteForm;

    const result = await parseResponse(
      notesIdClient.$put({
        param: { id: data.id },
        json: data,
      }),
    ).catch((error: Feedback<UpdateNoteRequest["json"]>) => {
      if (error.statusCode === 422) {
        const feedback = error.detail.data;
        const $titleFeedback = $("#updateNoteTitleFeedback");
        const $contentFeedback = $("#updateNoteContentFeedback");

        if ($titleFeedback && $contentFeedback) {
          $titleFeedback.textContent = feedback.message.title || "";
          $contentFeedback.textContent = feedback.message.content || "";
        }
      }
    });

    if (result) {
      window.location.reload();
    }
  });

  return $container;
}
