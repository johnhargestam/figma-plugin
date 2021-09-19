import { Message } from './messages';

export interface MessageBroker {
  onMessage(callback: (msg: Message) => void): void;

  sendMessage(message: Message): void;
}

interface FigmaMessage {
  pluginMessage: Message;
}

declare const parent: WindowProxy;

class UIMessageBroker implements MessageBroker {
  public onMessage(callback: (msg: Message) => void): void {
    window.onmessage = (ev: MessageEvent<FigmaMessage>): void => {
      callback(ev.data.pluginMessage);
    };
  }

  public sendMessage(message: Message): void {
    parent.postMessage({ pluginMessage: message }, '*');
  }
}

class PluginMessageBroker implements MessageBroker {
  public onMessage(callback: (msg: Message) => void): void {
    figma.ui.onmessage = callback;
  }

  public sendMessage(message: Message): void {
    figma.ui.postMessage(message);
  }
}

export class MessageBrokerFactory {
  public static createForUI(): MessageBroker {
    return new UIMessageBroker();
  }

  public static createForPlugin(): MessageBroker {
    return new PluginMessageBroker();
  }
}
