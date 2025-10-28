import { writable } from "svelte/store";

export const sidebarOpen = writable(false);
export const selectedLocation = writable<{label: string, desc: string} | null>(null);
