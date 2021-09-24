import {Message} from './messages';

export interface MessageBroker {
  onMessage: (callback: (msg: Message) => void) => void;

  sendMessage: (msg: Message) => void;
}

interface FigmaMessage {
  pluginMessage: Message;
}

class UIMessageBroker implements MessageBroker {
  private readonly window: Window;

  private readonly parent: WindowProxy;

  public constructor(window: Window, parent: WindowProxy) {
    this.window = window;
    this.parent = parent;
  }

  public onMessage(callback: (msg: Message) => void): void {
    this.window.onmessage = (ev: MessageEvent<FigmaMessage>): void => {
      callback(ev.data.pluginMessage);
    };
  }

  public sendMessage(msg: Message): void {
    this.parent.postMessage({pluginMessage: msg}, '*');
  }
}

class PluginMessageBroker implements MessageBroker {
  private readonly uiApi: UIAPI;

  public constructor(uiApi: UIAPI) {
    this.uiApi = uiApi;
  }

  public onMessage(callback: (msg: Message) => void): void {
    this.uiApi.onmessage = callback;
  }

  public sendMessage(msg: Message): void {
    this.uiApi.postMessage(msg);
  }
}

export const MessageBrokerFactory = {
  createForUI(window: Window, parent: WindowProxy): MessageBroker {
    return new UIMessageBroker(window, parent);
  },

  createForPlugin(uiApi: UIAPI): MessageBroker {
    return new PluginMessageBroker(uiApi);
  },
};
