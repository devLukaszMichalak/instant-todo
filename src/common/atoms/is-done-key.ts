export const isKeyDone = (index: number | string, pageIndex: number): boolean =>
  localStorage.getItem(`${index}-${pageIndex}`) === 'true';

export const setIsKeyDone = (index: number | string, pageIndex: number, value: boolean) =>
  localStorage.setItem(`${index}-${pageIndex}`, String(value));
