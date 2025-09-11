import type { DetailedError } from "hono/client";
import { parseResponse } from "hono/client";
import { notesClient } from "../../clients/notes";
import $message from "../../components/message";
import $note from "../../components/note";
import { NOTE_RECORD_LIMIT } from "../../constants";
import styles from "./styles.module.css";

export default async function $main() {
  const $container = document.createElement("main");
  $container.className = styles.container;

  const result = await parseResponse(notesClient.$get()).catch(
    (error: DetailedError) => {
      if (error instanceof TypeError) {
        const textContent = error.message
          .replace("NetworkError", "network error")
          .replace(".", "");
        $container.append($message({ textContent }));
      }
    },
  );

  if (result) {
    if (result.data.length >= NOTE_RECORD_LIMIT) {
      const textContent = `you can only create ${NOTE_RECORD_LIMIT} notes`;
      $container.append($message({ textContent }));
    }
    result.data.forEach((note) => {
      $container.append($note({ note }));
    });
  }

  return $container;
}
