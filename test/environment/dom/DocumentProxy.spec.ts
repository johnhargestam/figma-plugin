import DocumentProxy from '@src/environment/dom/DocumentProxy';
import { any, mock } from 'jest-mock-extended';

describe('DocumentProxy', () => {
  let documentMock = mock<Document>();
  let documentProxy = new DocumentProxy(documentMock);

  beforeEach(() => {
    documentMock = mock<Document>();
    documentProxy = new DocumentProxy(documentMock);
  });
  
  it('returns element if found', () => {
    const elementMock = mock<HTMLElement>();
    documentMock.getElementById
      .calledWith(any())
      .mockReturnValue(elementMock);

    const element = documentProxy.getElementById('id');

    expect(documentMock.getElementById).toBeCalledWith('id');
    expect(element).toBe(elementMock);
  });

  it('throws error if element not found', () => {
    documentMock.getElementById
      .calledWith(any())
      .mockReturnValue(null);

    expect(() => documentProxy.getElementById('id')).toThrow(Error);
  });
});
