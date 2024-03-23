import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const currentPageAtom = atomWithStorage<number>('currentPage', 0);

export const pagesAtom = atomWithStorage<number[]>('pages', []);

export const pageCountAtom = atom<number>((get) => get(pagesAtom).length);

const defaultRouteAtom = atomWithStorage<string>('route', '/edit');

export const defaultRouteWriteOnlyAtom = atom(
  null,
  (_get, set, update: string) =>
    set(defaultRouteAtom, update)
);
