import { $, $$ } from "./helpers/query";
import $createNoteDialog from "./layouts/create-note-dialog";
import $deleteNoteDialog from "./layouts/delete-note-dialog";
import $footer from "./layouts/footer";
import $header from "./layouts/header";
import $main from "./layouts/main";
import $updateNoteDialog from "./layouts/update-note-dialog";

// append layout elements in body
document.body.append(
  $createNoteDialog(),
  $updateNoteDialog(),
  $deleteNoteDialog(),
  $header(),
  await $main(),
  $footer(),
);

// disable "new note?" button if an alert message is displayed
if ($$('div[role="alert"').length !== 0) {
  const $button = $<HTMLButtonElement>("#newNote");
  if ($button) $button.disabled = true;
}

// disable "toggle all notes" button if note is empty
if ($$('details[data-name="note"]').length === 0) {
  const $button = $<HTMLButtonElement>("#toggleAllNotes");
  if ($button) $button.disabled = true;
}
