export function getElementBydId<T extends HTMLElement>(id: string, type: {new (): T}): T {
  const e = <T>document.getElementById(id)
  if (!(e instanceof type)) {
    throw `expected to find HTMLInputElement with id ${id}`;
  }
  return e;
}
