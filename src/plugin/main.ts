import {MessageBrokerFactory} from '../shared/messaging/brokers';
import FigmaPlugin from './FigmaPlugin';

figma.showUI(__html__);

const messageBroker = MessageBrokerFactory.createForPlugin(figma.ui);
const plugin = new FigmaPlugin(messageBroker);
plugin.initialize();
