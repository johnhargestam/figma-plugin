//setup ui iframe

const iframe = document.getElementById('iframe');

iframe.contentWindow.postMessage = (ev) => {
  const payload = ev.message || ev;
  if (payload.data && payload.data.pluginMessage) {
    iframe.contentWindow.onmessage(payload);
  }
};

//setup plugin

__html__ = '';

figma = {
  ui: {
    onmessage: () => {},
    postMessage: (msg) => {
      iframe.contentWindow.postMessage({data: {pluginMessage: msg}});
    },
  },
  showUI: (_, options) => {
    iframe.style = 'display: block;';
    iframe.width = options && options.width ? options.width : 300;
    iframe.height = options && options.width ? options.width : 300;
  },
};

postMessage = (ev) => {
  const payload = ev.message || ev;
  if (payload.pluginMessage) {
    figma.ui.onmessage(payload.pluginMessage);
  }
};
