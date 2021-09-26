//setup ui iframe

const iframe = document.getElementById('iframe');

iframe.contentWindow.postMessage = (ev) => {
  if (ev.data && ev.data.pluginMessage) {
    iframe.contentWindow.onmessage(ev);
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
  if (ev.pluginMessage) {
    figma.ui.onmessage(ev.pluginMessage);
  }
};
