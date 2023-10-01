import { indexBinaries } from '$lib/stores/binaries';

import { json } from '@sveltejs/kit';

export async function POST() {
	await indexBinaries();
	return json('ok');
}
