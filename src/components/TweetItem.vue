<template>
  <li class="tweet-item list-group-item p-2">
    <p class="my-0">
      <b>{{ username }} tweetou:</b><br />{{ text }}
    </p>
    <span class="badge bg-primary badge-pill">{{ timestamp }}</span>
  </li>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: false,
  },
});
</script>

<style></style>
