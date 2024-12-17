<template>
  <NoFooterLayout>
    <div class="create-note-container">
      <h1 class="page-title">Создать заметку</h1>

      <form @submit.prevent="createNote" class="create-note-form">
        <div class="form-group">
          <label for="title" class="form-label">Название</label>
          <CustomInput
            v-model="title"
            :placeholder="'Введите название заметки'"
            :class="{ 'is-invalid': titleError }"
          />
          <span v-if="titleError" class="error-message">{{ titleError }}</span>
        </div>

        <div class="form-group checkbox-group">
          <CustomCheckbox v-model="completed" />
          <label for="completed" class="form-label">Чекбокс выполнения</label>
        </div>

        <div class="form-group">
          <button type="submit" class="submit-button">Сохранить</button>
        </div>
      </form>
    </div>
  </NoFooterLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useNotesStore } from "../store/mainStore";
import CustomInput from "../components/CustomInput.vue";
import CustomCheckbox from "../components/CustomCheckbox.vue";
import NoFooterLayout from "../layouts/NoFooterLayout.vue";

const router = useRouter();
const notesStore = useNotesStore();

const title = ref("");
const completed = ref(false);
const titleError = ref<string | null>(null);

const createNote = () => {
  if (title.value.trim().length < 3 || title.value.trim().length > 50) {
    titleError.value = "Название заметки должно быть от 3 до 50 символов.";
    return;
  }

  const newNote = {
    id: Date.now(),
    title: title.value.trim(),
    completed: completed.value,
  };

  notesStore.posts.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notesStore.posts));

  router.push({ name: "NotesList" });
};
</script>

<style scoped>
.create-note-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.page-title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
}

.create-note-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-top: 1em;
}

.form-input,
.form-checkbox {
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
}

.form-input.is-invalid {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.submit-button {
  padding: 0.8rem 1.5rem;
  background-color: #00a97f;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #008f6e;
}

.checkbox-group {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.checkbox-group .form-label {
  margin-left: 10px;
  margin-bottom: 0;
}
</style>
