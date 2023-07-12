<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import CatCard from '$lib/components/CatCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ cats } = data);
</script>

<div class="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:px-8 lg:py-40">
	<div class="mb-14 text-center">
		<h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl lg:leading-none mb-2">
			High Five A <span class="text-red-500">Cat</span> 🐱
		</h1>
	</div>

	<ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
		{#each cats as cat (cat.id)}
			<CatCard
				{cat}
				on:highfive={() => {
					invalidateAll();
				}}
			/>
		{/each}
	</ul>
</div>
