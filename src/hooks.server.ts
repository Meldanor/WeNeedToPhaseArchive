import { env } from '$env/dynamic/private';
import { indexBinaries } from '$lib/stores/binaries';
import { error } from '@sveltejs/kit';

await indexBinaries();

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/api')) {
		validateApi(event.request.headers);
	} else {
		validateBasicAuth(event.request.headers);
	}

	const response = await resolve(event);
	return response;
}

function validateApi(headers: Headers) {
	if (headers.get('Authorization') !== env.API_KEY) {
		throw error(403, {
			message: 'Forbidden'
		});
	}
}

function validateBasicAuth(headers: Headers) {
	const basicAuth = `Basic ${btoa(`${env.HTTP_BASIC_AUTH_USER}:${env.HTTP_BASIC_AUTH_PASS}`)}`;

	if (headers.get('Authorization') !== basicAuth) {
		throw error(401, {
			message: 'Not authorized'
		});
	}
}
