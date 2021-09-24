import {MessageBrokerFactory} from '@shared/messaging/brokers';
import {mock} from 'jest-mock-extended';

describe('uIMessageBroker', () => {
  it('recieves messages from plugin', () => {
    const window = mock<Window>();
    const parent = mock<WindowProxy>();
    const callback = jest.fn();
    const messageBroker = MessageBrokerFactory.createForUI(window, parent);

    messageBroker.onMessage(callback);

    const msg = {contents: 'plugin says hi'};
    const event = {data: {pluginMessage: msg}} as MessageEvent;
    window.onmessage!(event);

    expect(callback).toHaveBeenCalledWith(msg);
  });

  it('sends messages to plugin', () => {
    const window = mock<Window>();
    const parent = mock<WindowProxy>();
    const messageBroker = MessageBrokerFactory.createForUI(window, parent);

    const msg = {contents: 'ui says hi'};
    messageBroker.sendMessage(msg);

    expect(parent.postMessage).toHaveBeenCalledWith({pluginMessage: msg}, '*');
  });
});

describe('pluginMessageBroker', () => {
  it('recieves messages from ui', () => {
    const uiApiMock = mock<UIAPI>();
    const callback = jest.fn();
    const messageBroker = MessageBrokerFactory.createForPlugin(uiApiMock);

    messageBroker.onMessage(callback);

    const msg = {contents: 'ui says hello'};
    uiApiMock.onmessage!(msg, {origin: '*'});

    expect(callback).toHaveBeenCalledWith(msg, {origin: '*'});
  });

  it('sends messages to ui', () => {
    const uiApiMock = mock<UIAPI>();
    const messageBroker = MessageBrokerFactory.createForPlugin(uiApiMock);

    const msg = {contents: 'plugin says hello'};
    messageBroker.sendMessage({contents: 'plugin says hello'});

    expect(uiApiMock.postMessage).toHaveBeenCalledWith(msg);
  });
});
