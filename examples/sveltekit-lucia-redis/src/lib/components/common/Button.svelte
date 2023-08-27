<script lang="ts" context="module">
	import { cva } from 'class-variance-authority';

	export const buttonVariants = cva(
		'rounded-md text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-upstash-600 disabled:opacity-50',
		{
			variants: {
				variant: {
					default: 'bg-upstash  hover:bg-upstash-600 text-upstash-900 '
				},
				size: {
					default: 'px-3 py-2 text-sm'
				}
			},
			defaultVariants: {
				variant: 'default',
				size: 'default'
			}
		}
	);
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { VariantProps } from 'class-variance-authority';

	let className: string | undefined = undefined;
	export { className as class };
	export let variant: VariantProps<typeof buttonVariants>['variant'] = 'default';
	export let size: VariantProps<typeof buttonVariants>['size'] = 'default';
</script>

<button
	class={cn(buttonVariants({ variant, size, className }))}
	{...$$restProps}
	on:click
	on:change
	on:keydown
	on:keyup
	on:mouseenter
	on:mouseleave
>
	<slot />
</button>
