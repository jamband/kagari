import type { Note } from "../../types/notes";
import $noteActions from "./actions";
import $noteContent from "./content";
import $noteSummary from "./summary";

export default function $note(props: { note: Note }) {
  const $container = document.createElement("details");
  $container.dataset.name = "note";

  $container.append(
    $noteSummary({ note: props.note }),
    $noteContent({ note: props.note }),
    $noteActions({ note: props.note }),
  );

  return $container;
}
