<script lang="ts">
	import type { LayoutData } from './$types';
	import '../app.css';

	export let data: LayoutData;
</script>

<svelte:head>
	<title>SvelteKit Edge Guest Book</title>
</svelte:head>

<main>
	<slot />
</main>

<style>
	main {
		max-width: 100ch;
		margin: 0 auto;
		padding: 1rem;
	}

	main > :global(* + *),
	:global(.flow > * + *) {
		margin-top: var(--flow-space, 1em);
	}
</style>
