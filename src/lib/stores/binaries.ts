import type { Binary } from '$lib/interfaces/binary';

import { join } from 'path';
import { readdir } from 'fs/promises';
import { env } from '$env/dynamic/private';

import { parse } from 'date-fns';

export async function indexBinaries() {
	const foundbinaries = (
		await Promise.all([indexBinariesFor('linux'), indexBinariesFor('windows')])
	).flatMap((v) => v);
	console.log(`Found ${foundbinaries.length} binaries`);
	setBinaries(foundbinaries);
}

async function indexBinariesFor(operationSystem: 'linux' | 'windows'): Promise<Binary[]> {
	const binariesPath = env.BINARIES_DIR!;
	const path = join(binariesPath, operationSystem);
	const files = await readdir(path);
	return files.map((fileName) => fileNameToBinary(fileName, join(path, fileName), operationSystem));
}

function fileNameToBinary(
	fileName: string,
	filePath: string,
	operatingSystem: 'linux' | 'windows'
): Binary {
	const dateString = fileName.replaceAll('WeNeedToPhase_', '').replaceAll('.zip', '');
	return {
		operatingSystem,
		type: 'dev',
		path: filePath,
		buildDate: parse(dateString, 'yyyyMMddHHmmSS', new Date())
	};
}

export let binaries: Binary[] = [];

export function setBinaries(newBinaries: Binary[]) {
	binaries = newBinaries;
}
