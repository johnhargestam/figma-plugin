import '@assets/styles.css';
import {MessageBrokerFactory} from '@shared/messaging/brokers';
import UserInterface from './UserInterface';
import DocumentProxy from './dom/DocumentProxy';

declare const parent: WindowProxy;

const documentProxy = new DocumentProxy(document);
const messageBroker = MessageBrokerFactory.createForUI(window, parent);
const ui = new UserInterface(documentProxy, messageBroker);
ui.initialize();
