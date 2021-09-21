import { MessageBroker, MessageBrokerFactory } from '@src/environment/messaging/brokers';
import { Message } from '@src/environment/messaging/messages';
import { mock, MockProxy } from 'jest-mock-extended';

describe('UIMessageBroker', () => {
  let windowMock: MockProxy<Window>;
  let parentMock: MockProxy<WindowProxy>;
  let messageBroker: MessageBroker;

  beforeEach(() => {
    windowMock = mock<Window>();
    parentMock = mock<WindowProxy>();
    messageBroker = MessageBrokerFactory.createForUI(windowMock, parentMock);
  });

  it('recieves messages from plugin', () => {
    let actualContents;
    messageBroker.onMessage((msg: Message): void => {
      actualContents = msg.contents;
    });

    const msg = { contents: 'plugin says hi' };
    const event = { data: { pluginMessage: msg } } as MessageEvent;
    windowMock.onmessage!(event);

    expect(actualContents).toBe('plugin says hi');
  });

  it('sends messages to plugin', () => {
    messageBroker.sendMessage({contents: 'ui says hi'});

    expect(parentMock.postMessage).toBeCalledWith({ pluginMessage: { contents: 'ui says hi'}}, '*');
  });
});

describe('PluginMessageBroker', () => {
  let uiApiMock: UIAPI;
  let messageBroker: MessageBroker;

  beforeEach(() => {
    uiApiMock = mock<UIAPI>();
    messageBroker = MessageBrokerFactory.createForPlugin(uiApiMock);
  });

  it('recieves messages from ui', () => {
    let actualContents;
    messageBroker.onMessage((msg: Message): void => {
      actualContents = msg.contents;
    });

    uiApiMock.onmessage!({ contents: 'ui says hello' }, { origin: '*'});

    expect(actualContents).toBe('ui says hello');
  });

  it('sends messages to ui', () => {
    messageBroker.sendMessage({contents: 'plugin says hello'});

    expect(uiApiMock.postMessage).toBeCalledWith({ contents: 'plugin says hello'});
  });
});
