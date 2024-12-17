<template>
  <div class="checkbox-container">
    <label class="checkbox-label">
      <input
        type="checkbox"
        :checked="props.modelValue"
        @change="emitChange"
        class="checkbox-input"
      />
      <span class="checkbox-custom"></span>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

function emitChange(event: Event) {
  const input = event.target as HTMLInputElement;
  emit("update:modelValue", input.checked);
}
</script>

<style scoped>
.checkbox-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
  color: #333;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 24px;
  height: 24px;
  border: 2px solid #00a97f;
  border-radius: 50%;
  margin-right: 10px;
  position: relative;
  transition: background-color 0.3s ease, border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.checkbox-input:checked + .checkbox-custom {
  background-color: #00a97f;
  border-color: #00a97f;
}

.checkbox-custom::before {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.3s ease;
}

.checkbox-input:checked + .checkbox-custom::before {
  transform: translate(-50%, -50%) scale(0.6);
}

.checkbox-label:hover .checkbox-custom {
  border-color: #007b60;
}

.checkbox-label:hover .checkbox-input:checked + .checkbox-custom {
  background-color: #007b60;
}

.checkbox-input:checked + .checkbox-custom {
  box-shadow: 0 0 5px rgba(0, 169, 127, 0.5);
}
</style>
