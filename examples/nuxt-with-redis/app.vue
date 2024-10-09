<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="absolute top-1/3 text-center">
      <p class="text-lg">
        This app now tracks API calls using Redis.
      </p>
      <p class="text-lg">
        Click the button below to call the API and get the call count and last called time.
      </p>
      <p class="text-lg pt-5">{{ message }}</p>
    </div>
    <div class="absolute top-1/2 grid grid-cols-3 gap-8 justify-center transform -translate-y-1/2">
      <div v-for="(value, key) in status" :key="key" class="text-center w-32">
        <div class="font-semibold">{{ key }}</div>
        <div>{{ value }}</div>
      </div>
    </div>
    <div class="absolute bottom-1/3">
      <button @click="handleClick" class="bg-[#dee2e3] hover:bg-[#9aa6a9] transition border-black text-[#5a6769] font-semibold py-2 px-4 rounded-lg">
        Call API
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFetch } from "#app";

const status = ref({
  success: true,
  count: 0,
  lastCalled: "Never"
});
const message = ref("");

const handleClick = async () => {
  try {
    const { data } = await useFetch("/api/increment");
    if (data.value.success) {
      status.value = data.value;
      message.value = "";
    } else {
      message.value = data.value.message || "Error fetching data.";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    status.value = {
      success: false,
      count: 0,
      lastCalled: "Unknown"
    };
    message.value = `Error fetching data. Please check the environment variables.`;
  }
};
</script>
