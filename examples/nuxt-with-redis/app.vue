<template>
  <main class="h-screen">
    <div class="max-w-screen-sm px-8 pt-16 mx-auto pb-44 gap-4 grid">
      <!-- header -->
      <header>
        <img class="w-10 mb-8" src="/upstash-logo.svg" alt="upstash logo" />
        <h1 class="text-2xl font-semibold text-balance">Get Started with Upstash Redis</h1>
        <h2 class="text-lg text-balance opacity-60">
          This is a simple example to demonstrate Upstash Redis with Nuxt.
        </h2>

        <div class="flex flex-wrap items-center gap-2 mt-4">
          <a
            class="inline-flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-md hover:bg-emerald-100"
            href="https://upstash.com/docs/redis/overall/getstarted"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
              <path d="M10 13l-1 2l1 2" />
              <path d="M14 13l1 2l-1 2" />
            </svg>
            Docs
          </a>
          <a
            class="inline-flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-md hover:bg-emerald-100"
            href="https://github.com/upstash/examples/tree/main/examples/nuxt-with-redis"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
              />
            </svg>
            Repository
          </a>
        </div>
      </header>
      <div>
        <h2 class="text-lg text-balance opacity-60 pt-6">
          Click the button below to increment a counter stored at Redis.
        </h2>
        <button
          :disabled="loading"
          class="mt-2 h-8 rounded-md bg-emerald-500 px-4 text-white transition-opacity"
          :class="{ 'opacity-30': loading }"
          @click="handleClick"
        >
          Increment
        </button>
        <div v-if="message" class="mt-4 text-red-500">
          Something went wrong: {{ message }}
        </div>
      </div>
      <div class="overflow-x-auto bg-gray-100 rounded-md mt-6 px-3 py-2 w-96">
        <h2 class="text-lg text-balance opacity-60 pb-2">Results:</h2>
        <table class="table-auto w-full border-collapse">
          <tbody>
            <tr>
              <td class="font-semibold w-32">Count</td>
              <td class="opacity-60">{{ status.count }}</td>
            </tr>
            <tr>
              <td class="font-semibold w-32">Last Called</td>
              <td class="opacity-60">{{ status.lastCalled }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useFetch } from '#app';

const status = reactive({
  success: true,
  count: 0,
  lastCalled: 'Never',
});
const loading = ref(false);
const message = ref('');

const handleClick = async () => {
  try {
    loading.value = true;
    const { data, error } = await useFetch('/api/increment');
    
    if (error.value) {
      throw error.value;
    }
    
    if (data.value?.success) {
      Object.assign(status, data.value);
      message.value = '';
    } else {
      message.value = data.value?.message || 'Error fetching data.';
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    status.success = false;
    status.count = 0;
    status.lastCalled = 'Unknown';
    message.value = 'Error fetching data. Please check the environment variables.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
