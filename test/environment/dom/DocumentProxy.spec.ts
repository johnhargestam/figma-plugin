import DocumentProxy from '@src/environment/dom/DocumentProxy';
import { any, mock } from 'jest-mock-extended';

describe('documentProxy', () => {

  it('returns element if found', () => {
    const document = mock<Document>();
    const elementMock = mock<HTMLElement>();
    document.getElementById
      .calledWith(any())
      .mockReturnValue(elementMock);

    const documentProxy = new DocumentProxy(document);
    const element = documentProxy.getElementById('id');

    expect(document.getElementById).toHaveBeenCalledWith('id');
    expect(element).toBe(elementMock);
  });

  it('throws error if element not found', () => {
    const document = mock<Document>();
    document.getElementById
      .calledWith(any())
      .mockReturnValue(null);

    const documentProxy = new DocumentProxy(document);

    expect(() => documentProxy.getElementById('id')).toThrow(Error);
  });
});
