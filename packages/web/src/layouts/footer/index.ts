import styles from "./styles.module.css";

export default function $footer() {
  const $container = document.createElement("footer");
  $container.className = styles.container;

  const $link = document.createElement("a");
  $link.className = styles.link;
  $link.href = "https://github.com/jamband/kagari";
  $link.rel = "noreferrer";
  $link.target = "_blank";
  $link.textContent = "github";

  $container.append($link);
  return $container;
}
