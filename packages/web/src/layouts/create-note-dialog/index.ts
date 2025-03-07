import $dialog from "../../components/dialog";
import $createNoteForm from "./form";

export default function $createNoteDialog() {
  const $container = $dialog({
    id: "createNoteDialog",
    closeId: "createNoteDialogClose",
    element: $createNoteForm(),
  });

  return $container;
}
