import { MessageBroker, MessageBrokerFactory } from './environment/messaging/brokers';
import { Message } from './environment/messaging/messages';

figma.showUI(__html__);

const messageBroker: MessageBroker = MessageBrokerFactory.createForPlugin();

messageBroker.onMessage((msg: Message): void => {
  messageBroker.sendMessage({ contents: `${msg.contents}back` });
});
