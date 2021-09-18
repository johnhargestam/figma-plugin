import getElementById from './document/elements';

declare const parent: WindowProxy;

getElementById('create').onclick = (): void => {
  const textbox: HTMLInputElement = getElementById('count');
  const count: number = parseInt(textbox.value, 10);
  parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*');
};

getElementById('cancel').onclick = (): void => {
  parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
};
