import type { RequestHandler } from '@sveltejs/kit';
import { readFile } from 'fs/promises';
import { basename } from 'path';

export const GET: RequestHandler = async ({ params }) => {
	const file = params.file;
	if (file == null) return new Response('No name provided', { status: 400 });
	if (file.includes('..')) return new Response('Invalid name', { status: 400 });

	const buffer = await readFile(file);

	return new Response(buffer, {
		status: 200,
		headers: {
			'Content-Type': 'application/octet-stream',
			'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(basename(file))}`
		}
	});
};
