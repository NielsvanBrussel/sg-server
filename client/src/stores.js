import { writable } from 'svelte/store';

export const authenticated = writable(false);
export const avatar = writable();
export const menuActive = writable(true);
export const newGame = writable(true);