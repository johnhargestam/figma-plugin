import './ui.css';
import { getElementById } from './environment/document/elements';
import { MessageBroker, MessageBrokerFactory } from './environment/messaging/brokers';
import { Message } from './environment/messaging/messages';

const messageBroker: MessageBroker = MessageBrokerFactory.createForUI();

getElementById('create').onclick = (): void => {
  messageBroker.sendMessage({ contents: 'create' });
};

getElementById('cancel').onclick = (): void => {
  messageBroker.sendMessage({ contents: 'cancel' });
};

messageBroker.onMessage((msg: Message): void => {
  console.log(msg);
});
