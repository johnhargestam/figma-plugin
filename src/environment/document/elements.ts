export function getElementById<T extends HTMLElement>(id: string): T {
  const element: HTMLElement | null = document.getElementById(id);
  if (element === null) {
    throw new Error(`expected to find element with id ${id}`);
  }
  return element as T;
}
