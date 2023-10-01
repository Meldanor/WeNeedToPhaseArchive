<script lang="ts">
	import type { Binary } from '$lib/interfaces/binary';
	import { binaries } from '$lib/stores/binaries';
	import { formatISO, getWeek } from 'date-fns';
	import getYear from 'date-fns/getYear';
	import { groupBy } from 'lodash-es';

	export let operationSystem: 'linux' | 'windows';

	$: groupedBinaries = Object.entries(
		groupBy(
			$binaries.filter((binary) => binary.operatingSystem === operationSystem),
			(binary: Binary) => {
				return `${getYear(binary.buildDate)} - Week ${
					getWeek(binary.buildDate, { weekStartsOn: 1 }) + 1
				}`;
			}
		)
	);
</script>

<div class="flex flex-col gap-4 m-auto p-32">
	<h2 class="mb-2">{operationSystem}</h2>
	<a href="/">Back</a>
	{#each groupedBinaries as [key, binariesPerWeek]}
		<h4>{key}</h4>
		<ol class=" list-disc list-inside">
			{#each binariesPerWeek as binary}
				<li>
					<a href={`/download/${binary.path}`}>{formatISO(binary.buildDate)}</a>
				</li>
			{/each}
		</ol>
	{/each}
</div>

<style lang="postcss">
	h2 {
		@apply text-6xl uppercase;
	}
	h4 {
		@apply text-4xl;
	}
	a {
		@apply underline;
	}
	li {
		font-family: monospace;
	}
</style>
