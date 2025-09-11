import { parseResponse } from "hono/client";
import { notesClient } from "../../../clients/notes";
import $form from "../../../components/form";
import $formActions from "../../../components/form/actions";
import $formSubmit from "../../../components/form/submit";
import $formTextarea from "../../../components/form/textarea";
import $formTextbox from "../../../components/form/textbox";
import { modestAction } from "../../../helpers/action";
import { $ } from "../../../helpers/query";
import type { Feedback } from "../../../types/feedback";
import type { CreateNoteForm, CreateNoteRequest } from "../../../types/notes";

export default function $createNoteForm() {
  const $container = $form({
    id: "createNoteForm",
  });

  const $submit = $formSubmit({
    textContent: "create",
  });

  $container.append(
    $formTextbox({
      labelTextContent: "title",
      id: "createNoteTitle",
      name: "title",
      feedbackId: "createNoteTitleFeedback",
      focus: true,
    }),
    $formTextarea({
      labelTextContent: "content",
      id: "createNoteContent",
      name: "content",
      feedbackId: "createNoteContentFeedback",
    }),
    $formActions($submit),
  );

  $container.addEventListener("submit", async (event) => {
    event.preventDefault();
    modestAction($submit);

    const data = Object.fromEntries(new FormData($container)) as CreateNoteForm;

    const result = await parseResponse(
      notesClient.$post({
        json: data,
      }),
    ).catch((error: Feedback<CreateNoteRequest["json"]>) => {
      if (error.statusCode === 422) {
        const feedback = error.detail.data;
        const $titleFeedback = $("#createNoteTitleFeedback");
        const $contentFeedback = $("#createNoteContentFeedback");

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
