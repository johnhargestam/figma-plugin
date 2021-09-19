import { Message } from './messages';

export interface MessageBroker {
  onMessage(callback: (msg: Message) => void): void;

  sendMessage(message: Message): void;
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

  public sendMessage(message: Message): void {
    this.parent.postMessage({ pluginMessage: message }, '*');
  }
}

class PluginMessageBroker implements MessageBroker {
  private readonly figma: PluginAPI;

  public constructor(figma: PluginAPI) {
    this.figma = figma;
  }

  public onMessage(callback: (msg: Message) => void): void {
    this.figma.ui.onmessage = callback;
  }

  public sendMessage(message: Message): void {
    this.figma.ui.postMessage(message);
  }
}

export class MessageBrokerFactory {
  public static createForUI(window: Window, parent: WindowProxy): MessageBroker {
    return new UIMessageBroker(window, parent);
  }

  public static createForPlugin(figma: PluginAPI): MessageBroker {
    return new PluginMessageBroker(figma);
  }
}
