import { notesClient } from "../../clients/notes";
import $message from "../../components/message";
import $note from "../../components/note";
import { NOTE_RECORD_LIMIT } from "../../constants";
import styles from "./styles.module.css";

export default async function $main() {
  const $container = document.createElement("main");
  $container.className = styles.container;

  try {
    const res = await notesClient.$get();
    if (res.ok) {
      const collection = await res.json();

      if (collection.data.length >= NOTE_RECORD_LIMIT) {
        const textContent = `you can only create ${NOTE_RECORD_LIMIT} notes`;
        $container.append($message({ textContent }));
      }
      collection.data.map((note) => {
        $container.append($note({ note }));
      });
    }
  } catch (error) {
    if (error instanceof TypeError) {
      const textContent = error.message
        .replace("NetworkError", "network error")
        .replace(".", "");
      $container.append($message({ textContent }));
    }
  }

  return $container;
}
