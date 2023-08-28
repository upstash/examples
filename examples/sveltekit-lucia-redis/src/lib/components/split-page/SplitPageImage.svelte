<script lang="ts">
	import { cn } from '$lib/utils/cn';

	let className: string | undefined = undefined;

	export { className as class };
	export let backgroundImage ='/side-pic.jpeg';
</script>

<div
	class={cn('absolute inset-0 bg-cover', className)}
	style="background-image: url({backgroundImage});"
/>

<!-- bottom black/80 to transaprent top-->
<div class="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

<slot />
