import './../manifest.json';
import { MessageBrokerFactory } from './environment/messaging/brokers';
import Plugin from './plugin/Plugin';

figma.showUI(__html__);

const messageBroker = MessageBrokerFactory.createForPlugin(figma.ui);
const plugin = new Plugin(messageBroker);
plugin.initialize();
