import $formFeedback from "../feedback";
import $formLabel from "../label";
import styles from "./styles.module.css";

export default function $formTextarea(props: {
  labelTextContent: string;
  id: string;
  name: string;
  feedbackId?: string;
  value?: string;
  focus?: boolean;
  disabled?: boolean;
}) {
  const $container = document.createElement("fieldset");
  $container.className = styles.container;

  const $label = $formLabel({
    id: props.id,
    textContent: props.labelTextContent,
  });

  const $textarea = document.createElement("textarea");
  $textarea.id = props.id;
  $textarea.name = props.name;
  $textarea.className = styles.textarea;
  $textarea.value = props.value || "";
  $textarea.autofocus = props.focus || false;
  $textarea.disabled = props.disabled || false;
  $container.append($label, $textarea);

  if (props.feedbackId) {
    $textarea.setAttribute("aria-describedby", props.feedbackId);
    $container.append($formFeedback({ id: props.feedbackId }));
  }

  return $container;
}
