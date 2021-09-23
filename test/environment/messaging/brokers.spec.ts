import { MessageBrokerFactory } from '@src/environment/messaging/brokers';
import { mock } from 'jest-mock-extended';

describe('uIMessageBroker', () => {

  it('recieves messages from plugin', () => {
    const windowMock = mock<Window>();
    const parentMock = mock<WindowProxy>();
    const callback = jest.fn();
    const messageBroker = MessageBrokerFactory.createForUI(windowMock, parentMock);

    messageBroker.onMessage(callback);

    const event = { data: { pluginMessage: { contents: 'plugin says hi' } } } as MessageEvent;
    windowMock.onmessage!(event);

    expect(callback).toHaveBeenCalledWith({ contents: 'plugin says hi' });
  });

  it('sends messages to plugin', () => {
    const windowMock = mock<Window>();
    const parentMock = mock<WindowProxy>();
    const messageBroker = MessageBrokerFactory.createForUI(windowMock, parentMock);

    messageBroker.sendMessage({ contents: 'ui says hi' });

    expect(parentMock.postMessage).toHaveBeenCalledWith({ pluginMessage: { contents: 'ui says hi' } }, '*');
  });
});

describe('pluginMessageBroker', () => {

  it('recieves messages from ui', () => {
    const uiApiMock = mock<UIAPI>();
    const callback = jest.fn();
    const messageBroker = MessageBrokerFactory.createForPlugin(uiApiMock);

    messageBroker.onMessage(callback);

    uiApiMock.onmessage!({ contents: 'ui says hello' }, { origin: '*' });

    expect(callback).toHaveBeenCalledWith({ contents: 'ui says hello' }, { origin: '*' });
  });

  it('sends messages to ui', () => {
    const uiApiMock = mock<UIAPI>();
    const messageBroker = MessageBrokerFactory.createForPlugin(uiApiMock);

    messageBroker.sendMessage({ contents: 'plugin says hello' });

    expect(uiApiMock.postMessage).toHaveBeenCalledWith({ contents: 'plugin says hello' });
  });
});
