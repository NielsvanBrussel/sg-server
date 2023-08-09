import { writable } from 'svelte/store';

export const authenticated = writable(false);
export const avatar = writable();
export const menuActive = writable(true);
export const newGame = writable(true);
export const activeScenario = writable({name: "", component: null})
export const playerPosition = writable(-135000)