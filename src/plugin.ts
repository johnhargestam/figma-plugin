import { MessageBrokerFactory } from './environment/messaging/brokers';
import Plugin from './plugin/Plugin';

figma.showUI(__html__);

const messageBroker = MessageBrokerFactory.createForPlugin(figma);
const plugin = new Plugin(messageBroker);
plugin.initialize();
