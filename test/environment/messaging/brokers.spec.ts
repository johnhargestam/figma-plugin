import { MessageBrokerFactory } from '@src/environment/messaging/brokers';
import { Message } from '@src/environment/messaging/messages';
import { mock, mockReset } from 'jest-mock-extended';

describe('UIMessageBroker', () => {
  const windowMock = mock<Window>();
  const parentMock = mock<WindowProxy>();
  const messageBroker = MessageBrokerFactory.createForUI(windowMock, parentMock);

  afterEach(() => {
    mockReset(windowMock);
    mockReset(parentMock);
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
  const uiApiMock = mock<UIAPI>();
  const messageBroker = MessageBrokerFactory.createForPlugin(uiApiMock);

  afterEach(() => {
    mockReset(uiApiMock);
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
