<template>
  <button class="button" :style="{ backgroundColor }" @click="handleClick">
    <slot v-if="hasSlot"></slot>
    <span v-else>{{ props.text }}</span>
  </button>
</template>

<script setup lang="ts">
import { useSlots } from "vue";

const props = defineProps<{
  text?: string;
  backgroundColor?: string;
}>();

const emit = defineEmits<{
  (event: "click"): void;
}>();

const hasSlot = !!useSlots().default;

function handleClick() {
  emit("click");
}
</script>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15);
}

.button:active {
  transform: translateY(0);
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
}
</style>
