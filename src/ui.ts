import { getElementById } from "./document/elements"

getElementById('create', HTMLButtonElement).onclick = () => {
  const textbox = getElementById('count', HTMLInputElement);
  const count = parseInt(textbox.value, 10)
  parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*')
}

getElementById('cancel', HTMLButtonElement).onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
}
