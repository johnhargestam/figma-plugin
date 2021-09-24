export default class DocumentProxy {
  private readonly document: Document;

  public constructor(document: Document) {
    this.document = document;
  }

  public getElementById<T extends HTMLElement>(id: string): T {
    const element = this.document.getElementById(id);
    if (element === null) {
      throw new Error(`expected to find element with id ${id}`);
    }
    return element as T;
  }
}
