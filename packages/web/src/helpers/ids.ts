/**
 * a simple script to check for duplicate ids
 *
 * with the web server running,
 * run the following code in the devtools console:
 * >> import("/src/helpers/ids")
 */
const data: Record<string, number> = {};

for (const $element of document.querySelectorAll("[id]")) {
  const id = $element.getAttribute("id");
  if (id) data[id] = (data[id] || 0) + 1;
}

console.table(data);
