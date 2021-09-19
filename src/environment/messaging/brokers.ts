import { Message } from './messages';

export interface MessageBroker {
  onMessage(callback: (msg: Message) => void): void;

  sendMessage(msg: Message): void;
}

class UIMessageBroker implements MessageBroker {
  private readonly window: Window;

  private readonly parent: WindowProxy;

  public constructor(window: Window, parent: WindowProxy) {
    this.window = window;
    this.parent = parent;
  }

  public onMessage(callback: (msg: Message) => void): void {
    this.window.onmessage = (ev: MessageEvent<{ pluginMessage: Message }>): void => {
      callback(ev.data.pluginMessage);
    };
  }

  public sendMessage(msg: Message): void {
    this.parent.postMessage({ pluginMessage: msg }, '*');
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

export class MessageBrokerFactory {
  public static createForUI(window: Window, parent: WindowProxy): MessageBroker {
    return new UIMessageBroker(window, parent);
  }

  public static createForPlugin(uiApi: UIAPI): MessageBroker {
    return new PluginMessageBroker(uiApi);
  }
}
