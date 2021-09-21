import DocumentProxy from '@src/environment/dom/DocumentProxy';
import { any, mock, MockProxy } from 'jest-mock-extended';

describe('DocumentProxy', () => {
  let document: MockProxy<Document>;
  let documentProxy: DocumentProxy;

  beforeEach(() => {
    document = mock<Document>();
    documentProxy = new DocumentProxy(document);
  });
  
  it('returns element if found', () => {
    const elementMock = mock<HTMLElement>();
    document.getElementById
      .calledWith(any())
      .mockReturnValue(elementMock);

    const element = documentProxy.getElementById('id');

    expect(document.getElementById).toBeCalledWith('id');
    expect(element).toBe(elementMock);
  });

  it('throws error if element not found', () => {
    document.getElementById
      .calledWith(any())
      .mockReturnValue(null);

    expect(() => documentProxy.getElementById('id')).toThrow(Error);
  });
});
