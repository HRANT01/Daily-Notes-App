<template>
  <div
    class="main-container"
    :class="{ checked: checkBoxStatus, unchecked: !checkBoxStatus }"
  >
    <div class="note-details">
      <router-link :to="`/todo/${slug}`">
        {{ props.note.id }}
        {{ props.note.title }}
      </router-link>
    </div>

    <div class="buttons-container">
      <Button @click="editPost" background-color="rgb(102, 189, 108)"
        >Редакт.</Button
      >
      <Button @click="deletePost" background-color="rgb(218, 75, 75)"
        >Удалить</Button
      >
    </div>

    <div class="checkbox-container">
      <CustomCheckbox v-model="checkBoxStatus" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { I_Post } from "../interfaces";
import Button from "./CustomButton.vue";
import CustomCheckbox from "./CustomCheckbox.vue";

const emit = defineEmits<{
  (
    e: "update-completed",
    value: { checkBoxStatus: boolean; noteId: number }
  ): void;
  (e: "edit-post"): void;
  (e: "delete-post"): void;
}>();

const editPost = () => {
  emit("edit-post");
};

const deletePost = () => {
  emit("delete-post");
};

const props = defineProps<{
  note: I_Post;
}>();

const slug = computed<string>(() => {
  return props.note.title.toLowerCase().replace(/\s+/g, "-");
});

const checkBoxStatus = ref<boolean>(props.note.completed);

watch(checkBoxStatus, (newStatus) => {
  emit("update-completed", {
    checkBoxStatus: newStatus,
    noteId: props.note.id,
  });
});
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.3s ease;
}

.main-container.checked {
  background-color: #e1f7e1;
}

.main-container.unchecked {
  background-color: white;
}

.note-details {
  flex: 0 0 60%;
  display: flex;
  align-items: center;
}

.buttons-container {
  flex: 0 0 30%;
  display: flex;
  gap: 1em;
  justify-content: center;
}

.checkbox-container {
  flex: 0 0 10%;
  display: flex;
  justify-content: center;
}

.note-details a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.buttons-container button {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 0.9rem;
}

.checkbox-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
