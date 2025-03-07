import $dialog from "../../components/dialog";
import $deleteNoteForm from "./form";

export default function $deleteNoteDialog() {
  const $container = $dialog({
    id: "deleteNoteDialog",
    closeId: "deleteNoteDialogClose",
    element: $deleteNoteForm(),
  });

  return $container;
}
