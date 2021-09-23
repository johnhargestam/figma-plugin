import './ui.css';
import {MessageBrokerFactory} from './environment/messaging/brokers';
import UserInterface from './ui/UserInterface';
import DocumentProxy from './environment/dom/DocumentProxy';

declare const parent: WindowProxy;

const documentProxy = new DocumentProxy(document);
const messageBroker = MessageBrokerFactory.createForUI(window, parent);
const ui = new UserInterface(documentProxy, messageBroker);
ui.initialize();
