import {MessageBrokerFactory} from '../shared/messaging/brokers';
import Plugin from './Plugin';

figma.showUI(__html__);

const messageBroker = MessageBrokerFactory.createForPlugin(figma.ui);
const plugin = new Plugin(messageBroker);
plugin.initialize();
