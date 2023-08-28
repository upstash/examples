<script lang="ts">
	import { Input } from '$lib/components/common';
	import { Eye, EyeOff } from 'lucide-svelte';

	let passwordRevealed = false;
	let passwordInput: HTMLInputElement | null = null;
	export let name: string;
	export let placeholder: string;
	export let value: string | undefined = undefined;

	function handleReveal() {
		passwordRevealed = !passwordRevealed;

		if (passwordInput) {
			passwordInput.setAttribute('type', passwordRevealed ? 'text' : 'password');
		}
	}
</script>

<div class="relative">
	<button
		on:click={handleReveal}
		type="button"
		class="text-white absolute top-1/2 border-r border-white/20 px-2.5 h-full left-0 transform -translate-y-1/2"
	>
		{#if passwordRevealed}
			<Eye class="w-4 h-4 text-gray-500 dark:text-gray-400" />
		{:else}
			<EyeOff class="w-4 h-4 text-gray-500 dark:text-gray-400" />
		{/if}
	</button>

	<Input
		bind:el={passwordInput}
		type="password"
		bind:value
		autoCapitalize="none"
		autoComplete="password"
		autoCorrect="off"
		required={true}
		{name}
		{placeholder}
		class="pl-12"
	/>
</div>
