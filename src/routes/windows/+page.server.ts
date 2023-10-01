import { binaries } from '$lib/stores/binaries';

/** @type {import('./$types').PageServerLoad} */
export function load() {
	return { binaries };
}
