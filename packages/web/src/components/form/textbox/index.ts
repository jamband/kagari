import $formFeedback from "../feedback";
import $formLabel from "../label";
import styles from "./styles.module.css";

export default function $formTextbox(props: {
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

  const $textbox = document.createElement("input");
  $textbox.type = "text";
  $textbox.name = props.name;
  $textbox.id = props.id;
  $textbox.className = styles.textbox;
  $textbox.value = props.value || "";
  $textbox.autofocus = props.focus || false;
  $textbox.disabled = props.disabled || false;

  $container.append($label, $textbox);

  if (props.feedbackId) {
    $textbox.setAttribute("aria-describedby", props.feedbackId);
    $container.append($formFeedback({ id: props.feedbackId }));
  }

  return $container;
}
