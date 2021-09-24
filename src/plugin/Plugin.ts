import {MessageBroker} from '@shared/messaging/brokers';
import {Message} from '@shared/messaging/messages';

export default class Plugin {
  private readonly messageBroker: MessageBroker;

  public constructor(messageBroker: MessageBroker) {
    this.messageBroker = messageBroker;
  }

  public initialize(): void {
    this.messageBroker.onMessage((msg: Message): void => {
      this.messageBroker.sendMessage({contents: `${msg.contents} pong`});
    });
  }
}
