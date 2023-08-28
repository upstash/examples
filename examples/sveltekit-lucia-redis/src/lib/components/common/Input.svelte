<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';

	let className: string | undefined | null = undefined;

	export let value: HTMLInputAttributes['value'] = undefined;
	export { className as class };
	export let el: HTMLInputElement | null = null;
</script>

<input
	bind:this={el}
	class={cn(
		'block w-full rounded-md border-0 bg-black py-2 text-white shadow-sm ring-1 ring-inset ring-white/20 focus:ring-2 focus:ring-inset focus:ring-upstash sm:text-sm sm:leading-6',
		className
	)}
	bind:value
	on:blur
	on:change
	on:click
	on:focus
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:paste
	on:input
	{...$$restProps}
/>
