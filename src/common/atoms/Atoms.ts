import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const currentPageAtom = atomWithStorage<number>('currentPage', 0, undefined, {getOnInit: true} );

export const pagesAtom = atomWithStorage<number[]>('pages', [], undefined, {getOnInit: true});

export const pageCountAtom = atom<number>((get) => get(pagesAtom).length);

export const defaultRouteAtom = atomWithStorage<string>('route', '/edit', undefined, {getOnInit: true});
