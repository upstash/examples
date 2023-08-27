<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let className: string | undefined = undefined;
	export { className as class };
</script>

<section class={cn('py-32 lg:py-0', className)}>
	<div class="p-4 md:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<slot />
		</div>
	</div>
</section>
