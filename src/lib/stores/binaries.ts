import type { Binary } from '$lib/interfaces/binary';
import { writable } from 'svelte/store';
import { parse } from 'date-fns';

export const binaries = writable<Binary[]>([
	{
		buildDate: parse('20220930210457', 'yyyyMMddHHmmSS', new Date()),
		operatingSystem: 'windows',
		type: 'dev',
		path: 'data/dev/windows/WeNeedToPhase_20220930210457.zip'
	},
	{
		buildDate: parse('20230930210457', 'yyyyMMddHHmmSS', new Date()),
		operatingSystem: 'windows',
		type: 'dev',
		path: 'data/dev/windows/WeNeedToPhase_20230930210457.zip'
	},
	{
		buildDate: parse('20231001122750', 'yyyyMMddHHmmSS', new Date()),
		operatingSystem: 'windows',
		type: 'dev',
		path: 'data/dev/windows/WeNeedToPhase_20231001122750.zip'
	},
	{
		buildDate: parse('20230930210457', 'yyyyMMddHHmmSS', new Date()),
		operatingSystem: 'linux',
		type: 'dev',
		path: 'data/dev/linux/WeNeedToPhase_20230930210457.zip'
	},
	{
		buildDate: parse('20231001122750', 'yyyyMMddHHmmSS', new Date()),
		operatingSystem: 'linux',
		type: 'dev',
		path: 'data/dev/linux/WeNeedToPhase_20231001122750.zip'
	}
]);
