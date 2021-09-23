import {MessageBroker} from '@src/environment/messaging/brokers';
import {Message} from '@src/environment/messaging/messages';

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
