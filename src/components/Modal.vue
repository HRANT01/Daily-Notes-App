<template>
  <div class="modal-overlay" @click="handleOutsideClick">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>{{ props.header }}</h2>
        <button @click="closeModal" class="close-button">&times;</button>
      </div>
      <div class="modal-body">
        <div v-if="props.mode === 'edit'">
          <textarea
            v-model="editedTitle"
            placeholder="Edit the title"
            class="modal-input"
          ></textarea>
        </div>
        <div v-if="props.mode === 'delete'">
          <p>Вы уверены, что хотите удалить: {{ note.title }}?</p>
        </div>
      </div>

      <div class="modal-footer">
        <CustomButton
          v-if="props.mode === 'edit'"
          background-color="green"
          @click="saveEdit"
          class="save-button"
        >
          Сохранить
        </CustomButton>
        <CustomButton
          v-if="props.mode === 'delete'"
          background-color="red"
          @click="deletePost"
          class="delete-button"
        >
          Удалить
        </CustomButton>
        <CustomButton
          background-color="blue"
          @click="closeModal"
          class="cancel-button"
          >Отмена</CustomButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import CustomButton from "./CustomButton.vue";

const editedTitle = ref<string>("");

const deletePost = () => {
  emit("delete-post", props.note.id);
  closeModal();
};

const props = defineProps<{
  header: string;
  note: { id: number; title: string; completed: boolean };
  mode: "edit" | "delete";
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "saveEdit", noteId: number, editedTitle: string): void;
  (e: "delete-post", noteId: number): void;
}>();

watch(
  () => props.note.title,
  (newTitle) => {
    editedTitle.value = newTitle;
  },
  { immediate: true }
);

const closeModal = () => {
  emit("close");
};

const handleOutsideClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

const saveEdit = () => {
  emit("saveEdit", props.note.id, editedTitle.value);
  closeModal();
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  padding: 20px 0;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.save-button,
.cancel-button,
.delete-button {
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  background-color: #00a97f;
  color: white;
  font-size: 1rem;
}

.delete-button {
  background-color: #d9534f;
}

.cancel-button {
  background-color: #ccc;
}

.modal-input {
  width: 100%;
  min-height: 50px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  resize: vertical;
}
</style>
