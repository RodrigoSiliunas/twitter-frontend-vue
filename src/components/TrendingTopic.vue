<template>
  <li class="list-group-item">
    <p class="my-0">{{ topic }}</p>
    <span class="badge bg-primary badge-pill">{{ mentions }}</span>
    participantes
  </li>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  topic: {
    type: String,
    required: true,
  },
  mentions: {
    type: Number,
    required: true,
  },
});
</script>

<style></style>
