import DocumentProxy from '@src/environment/dom/DocumentProxy';
import { MessageBroker } from '@src/environment/messaging/brokers';
import { Message } from '@src/environment/messaging/messages';

export default class UserInterface {
  private readonly messageBroker: MessageBroker;

  private readonly document: DocumentProxy;

  public constructor(document: DocumentProxy, messageBroker: MessageBroker) {
    this.document = document;
    this.messageBroker = messageBroker;
  }

  public initialize(): void {
    this.document.getElementById('ping').onclick = (): void => {
      this.messageBroker.sendMessage({ contents: 'ping' });
    };

    const div = this.document.getElementById('response');

    this.messageBroker.onMessage((msg: Message): void => {
      div.innerText = msg.contents;
    });
  }
}
