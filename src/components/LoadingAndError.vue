<template>
  <div v-if="loading">Loading notes...</div>
  <div v-if="error">{{ props.error }}</div>
</template>

<script setup lang="ts">
const props = defineProps<{
  loading: boolean;
  error: string | null;
}>();
</script>
