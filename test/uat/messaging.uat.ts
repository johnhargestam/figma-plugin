import {Selector, test} from 'testcafe';

fixture`messaging`.page`http://localhost:9000/`;

test('ping pong', async (t) => {
  await t
    .switchToIframe('#iframe')
    .click('#ping')

    .expect(Selector('#response').innerText)
    .eql('ping pong');
});
