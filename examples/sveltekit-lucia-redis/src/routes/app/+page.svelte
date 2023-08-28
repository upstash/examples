<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/common';
	import { SIGNIN_PATH } from '$lib/utils/constants';

	async function handleSignOut() {
		const response = await fetch('/auth/signout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			goto(SIGNIN_PATH, {
				replaceState: true,
				invalidateAll: true
			});
		}
	}
</script>

<div class="h-full flex-col space-y-4 min-h-screen items-center bg-black flex justify-center">
	<div>
		<h1 class="text-xl text-white sm:text-2xl font-bold">Authenticated page</h1>
	</div>

	<div class="flex items-center justify-center">
		<Button on:click={handleSignOut}>Sign out</Button>
	</div>
</div>
