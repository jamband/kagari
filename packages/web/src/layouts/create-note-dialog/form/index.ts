import { notesClient } from "../../../clients/notes";
import $form from "../../../components/form";
import $formActions from "../../../components/form/actions";
import $formSubmit from "../../../components/form/submit";
import $formTextarea from "../../../components/form/textarea";
import $formTextbox from "../../../components/form/textbox";
import { modestAction } from "../../../helpers/action";
import { $ } from "../../../helpers/query";
import type { CreateNoteForm } from "../../../types/notes";

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
    const res = await notesClient.$post({
      json: data,
    });

    if (res.status === 422) {
      const feedback = await res.json();
      if ("message" in feedback && typeof feedback.message === "object") {
        const $titleFeedback = $("#createNoteTitleFeedback");
        const $contentFeedback = $("#createNoteContentFeedback");

        if ($titleFeedback && $contentFeedback) {
          $titleFeedback.textContent = feedback.message.title || "";
          $contentFeedback.textContent = feedback.message.content || "";
        }
      }
    }
    if (res.ok) {
      window.location.reload();
    }
  });

  return $container;
}
