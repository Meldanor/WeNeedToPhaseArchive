import { env } from '$env/dynamic/private';
import { indexBinaries } from '$lib/stores/binaries';
import { error } from '@sveltejs/kit';

let initialized = false;

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	if (!initialized) {
		await indexBinaries();
		initialized = true;
	}

	if (event.url.pathname.startsWith('/api')) {
		validateApi(event.request.headers);
	} else {
		const possibleResponse = validateBasicAuth(event.request.headers);
		if (possibleResponse) return possibleResponse;
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
		return new Response('Not authorized', {
			status: 401,
			headers: {
				'WWW-Authenticate': 'Basic realm="User Visible Realm", charset="UTF-8"'
			}
		});
	}
}
