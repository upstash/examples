<script lang="ts">
	import type { Cat } from '$lib/types';
	import { cn } from '$lib/utils/class-utils';
	import { ArrowUp, Cat as CatIcon } from 'lucide-svelte';
	import CatPawIcon from './CatPawIcon.svelte';
	import { fade, scale } from 'svelte/transition';
	import { page } from '$app/stores';
	import { api } from '$lib/api/api';
	import toast from 'svelte-french-toast';
	import { TRPCClientError } from '@trpc/client';
	import { createEventDispatcher } from 'svelte';

	export let cat: Cat;

	const dispatch = createEventDispatcher<{
		highfive: { id: string };
	}>();
	const client = api($page);
	const highfiveMutation = client.public.cat.highfive.createMutation();

	let error: string | null = null;
	let showIcon = false;

	const TOAST_DURATION = 1500;

	async function highfive(catId: string) {
		try {
			await $highfiveMutation.mutateAsync({ id: catId });

			dispatch('highfive', { id: catId });

			toast.success('Highfived!', {
				duration: TOAST_DURATION
			});
		} catch (err) {
			if (err instanceof TRPCClientError) {
				// Could potentially JSON.parse(err.message) to get the limit and remaining	values.
				error = 'Sorry, you can only highfive 1 cat per minute.';
			} else {
				error = 'Unknown error';
			}

			toast.error(error);
		}
	}

	$: loading = $highfiveMutation.isLoading;
	$: success = $highfiveMutation.isSuccess;

	$: if (success) {
		showIcon = true;
		setTimeout(() => {
			showIcon = false;
		}, TOAST_DURATION);
	}
</script>

<li
	class="col-span-1 flex flex-col relative group divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
>
	<div class="flex flex-1 flex-col p-8">
		<div class="relative">
			<div class="absolute -top-4 -left-4">
				<div
					class="relative inline-flex group-hover:scale-[130%] group-hover:rotate-0 -rotate-[20deg] items-center p-1 h-9 w-9 justify-center rounded-full border border-transparent shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ease-in-out duration-150"
				>
					<CatIcon class="h-5 w-5" />
				</div>
			</div>

			{#if showIcon}
				<div
					in:scale={{ duration: 200, start: 0.2 }}
					out:fade={{ duration: 100 }}
					class="top-1/2 absolute left-1/2 transform rotate-[10deg] -translate-x-1/2 -translate-y-1/2"
				>
					<div class="flex w-full justify-center text-center items-center flex-col text-white">
						<CatPawIcon class="h-48 w-48" />
					</div>
				</div>
			{/if}

			<img
				class="mx-auto h-64 w-64 flex-shrink-0 rounded-xl"
				src={cat.url}
				alt="{cat.name} portrait"
			/>
		</div>

		<h3 class="mt-6 text-xl font-bold">
			This is {cat.name}
		</h3>

		<dl class="mt-1 flex flex-grow flex-col justify-between">
			<dt class="sr-only">Description</dt>
			<dd class="text-base text-gray-500">
				{cat.description}
			</dd>

			<dt class="sr-only">Highfives</dt>
			<dd class="mt-3">
				<span
					class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
				>
					<CatIcon class="h-4 w-4 mr-1" />

					{#if cat.highfives === 0 || cat.highfives === null}
						0 Highfives
					{:else if cat.highfives === 1}
						{cat.highfives}
						Highfive
					{:else}
						{cat.highfives}
						Highfives
					{/if}
				</span>
			</dd>
		</dl>
	</div>

	<div>
		<div class="-mt-px flex divide-x divide-gray-200">
			<div class="flex relative w-0 flex-1">
				<button
					disabled={loading}
					on:click={() => highfive(cat.id)}
					class={cn(
						'relative -mr-px group inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-base font-bold uppercase text-red-500',
						loading && 'cursor-wait opacity-50'
					)}
				>
					High five
				</button>
			</div>
		</div>
	</div>
</li>
