<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input, Label, PasswordInput } from '$lib/components/common';
	import { SplitPage } from '$lib/components/split-page';
	import { SIGNUP_PATH } from '$lib/utils/constants';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;

	let loading = false;
	let email = data.defaultAuthFormValues.email;
	let password = data.defaultAuthFormValues.password;
</script>

<SplitPage let:Left let:Right let:Logo let:Image class="bg-black">
	<Left>
		<a href="/">
			<Logo class="w-32 mx-auto" />
		</a>

		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl text-white font-semibold tracking-tight">Welcome back</h1>

				<p class="text-sm text-gray-500">
					Don't have an account?

					<a href={SIGNUP_PATH} class="underline underline-offset-4 hover:text-primary">
						Sign up
					</a>
				</p>
			</div>

			<form
				method="POST"
				use:enhance={() => {
					loading = true;

					return async ({ update }) => {
						loading = false;

						update();
					};
				}}
			>
				{#if form && form.error}
					<div class="text-center p-2 bg-red-200 text-red-900 rounded-sm mb-4 text-sm">
						Error: {form.error}
					</div>
				{/if}

				<div class="grid gap-2.5">
					<div class="grid gap-1">
						<Label for="email">Email</Label>
						<Input
							bind:value={email}
							name="email"
							placeholder="Email"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							required={true}
						/>
					</div>

					<div class="grid gap-1">
						<Label for="password">Password</Label>
						<PasswordInput name="password" placeholder="Password" bind:value={password} />
					</div>

					<div class="col-span-full mt-6">
						<Button type="submit" class="w-full" disabled={loading}>
							{#if loading}
								Loading...
							{:else}
								Sign in
							{/if}
						</Button>
					</div>
				</div>
			</form>
		</div>
	</Left>

	<Right>
		<Image class="bg-cover bg-bottom" />

		<div class="relative z-20 mt-auto">
			<blockquote class="space-y-2">
				<p class="text-lg">
					Upstash is my go to solution for serverless Redis. It's fast, freakishly reliable and easy
					to use.
				</p>

				<footer class="text-sm">
					<a href="https://chrisjayden.com" target="_blank">- Chris Jayden </a>
				</footer>
			</blockquote>
		</div>
	</Right>
</SplitPage>
