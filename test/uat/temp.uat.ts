import {Selector, test} from 'testcafe';

fixture`Temporary test`.page`http://localhost:8080/`;

test('My first test', async (t) => {
  await t
    .switchToIframe('#iframe')
    .click('#ping')

    .expect(Selector('#response').innerText)
    .eql('ping pong');
});
