<script lang="ts">
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { browser } from '$app/environment';
	import { Toaster } from 'svelte-french-toast';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<QueryClientProvider client={queryClient}>
	<Toaster />

	<slot />

	<div class="max-w-7xl text-center text-xs text-gray-500 mx-auto">
		Paw icon by Juraj Sedlák from <a
			href="https://thenounproject.com/browse/icons/term/cat-paw/"
			target="_blank"
			title="cat paw Icons">Noun Project (CC BY 3.0)</a
		>
	</div>
</QueryClientProvider>
