<script lang="ts">
	import BinaryList from '$lib/components/binary-list.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<BinaryList binaries={data.binaries} operationSystem={'windows'} />
