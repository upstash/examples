<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let className: string | undefined = undefined;
	export { className as class };
</script>

<div
	class={cn(
		'relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex',
		className
	)}
>
	<slot />
</div>
