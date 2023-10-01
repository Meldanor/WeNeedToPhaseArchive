import { env } from '$env/dynamic/private';
import { indexBinaries } from '$lib/stores/binaries';

import { error, json, type RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: RequestEvent) {

	await indexBinaries();
	return json('ok');
}
