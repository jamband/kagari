import styles from "../components/dialog/styles.module.css";

export default function dialog($element: HTMLDialogElement) {
  const show = () => {
    $element.classList.add(styles.transition);
    $element.showModal();

    requestAnimationFrame(() => {
      $element.classList.remove(styles.transition);
    });
  };

  const close = () => {
    $element.classList.add(styles.transition);

    $element.addEventListener(
      "transitionend",
      () => {
        $element.classList.remove(styles.transition);
        $element.close();
      },
      { once: true },
    );
  };

  $element.addEventListener("click", (event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      if (event.target === $element) close();
    }
  });

  $element.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  });

  return {
    show,
    close,
  };
}
