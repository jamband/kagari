import $dialog from "../../components/dialog";
import $updateNoteForm from "./form";

export default function $updateNoteDialog() {
  const $container = $dialog({
    id: "updateNoteDialog",
    closeId: "updateNoteDialogClose",
    element: $updateNoteForm(),
  });

  return $container;
}
