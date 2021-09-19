import DocumentProxy from '@src/environment/dom/DocumentProxy';
import { any, mock, mockReset } from 'jest-mock-extended';

describe('DocumentProxy', () => {
  const documentMock = mock<Document>();
  const documentProxy = new DocumentProxy(documentMock);

  afterEach(() => {
    mockReset(documentMock);
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
