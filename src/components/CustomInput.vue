<template>
  <input
    :value="modelValue"
    @input="updateValue"
    type="text"
    :placeholder="props.placeholder"
    class="controlled-input"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  placeholder: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const updateValue = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit("update:modelValue", input.value); // Emit the updated value
};
</script>

<style scoped>
.controlled-input {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
