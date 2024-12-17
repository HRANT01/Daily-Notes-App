<template>
  <DefaultLayout>
    <div class="note-view-container">
      <h1 class="note-title">{{ note?.title || "Note Not Found" }}</h1>

      <div class="status-container" v-if="note !== null">
        <span class="status-label">Статус:</span>
        <span
          :class="['status', note?.completed ? 'completed' : 'not-completed']"
        >
          {{ note?.completed ? "Completed" : "Not Completed" }}
        </span>
      </div>

      <CustomButton
        background-color="green"
        class="back-button"
        @click="goBack"
      >
        Назад
      </CustomButton>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { useNotesStore } from "../store/mainStore";
import CustomButton from "../components/CustomButton.vue";

const route = useRoute();
const router = useRouter();
const notesStore = useNotesStore();

const note = ref<any>(null);

const isLoading = ref<boolean>(true);

const fetchNote = async () => {
  const slug = route.params.slug as string;

  const originalSlug = slug.replace(/-/g, " ");

  note.value = await notesStore.getNoteBySlug(originalSlug);
  isLoading.value = false;
};

const goBack = (): void => {
  router.push({ name: "NotesList" });
};

onMounted(() => {
  fetchNote();
});
</script>

<style scoped>
.note-view-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.note-title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
}

.status-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
}

.status-label {
  font-weight: bold;
  margin-right: 0.5rem;
}

.status {
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
}

.completed {
  color: #00a97f;
  background-color: #e0f8f3;
}

.not-completed {
  color: #e74c3c;
  background-color: #f8d7da;
}

.back-button {
  display: block;
  margin: 0 auto;
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
</style>
