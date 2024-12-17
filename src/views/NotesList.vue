<template>
  <DefaultLayout>
    <div class="notes-container">
      <h1 class="title">Список заметок</h1>

      <div class="table-header">
        <router-link to="/add">
          <CustomButton background-color="green" class="create-note-button"
            >Создать заметку</CustomButton
          >
        </router-link>

        <div class="header-item status-header">
          <span
            @click.stop="setFilter"
            class="filter-text"
            :class="{ 'filter-active': filterCompleted }"
          >
            Отметка о выполнении
          </span>
        </div>
      </div>

      <div class="notes-list" v-if="filteredNotes.length > 0">
        <div v-for="note in filteredNotes" :key="note.id" class="note-item">
          <NotesItem
            :note="note"
            @update-completed="makeNoteCompleted"
            @edit-post="openEditModal('Редактировать', note, 'edit')"
            @delete-post="openEditModal('delete', note, 'delete')"
          />
        </div>
      </div>

      <p v-else class="no-notes-message">Нет заметок для отображения.</p>

      <LoadingAndError :loading="loading" :error="error" />

      <Modal
        v-if="isModalOpen"
        :header="modalHeader"
        @close="closeEditModal"
        @save-edit="saveEdit"
        @delete-post="deletePost"
        :note="currentNote"
        :mode="currentMode"
      />
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, onBeforeUnmount } from "vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { useRoute, useRouter } from "vue-router";
import { useNotesStore } from "../store/mainStore";
import NotesItem from "../components/NotesItem.vue";
import LoadingAndError from "../components/LoadingAndError.vue";
import Modal from "../components/Modal.vue";
import CustomButton from "../components/CustomButton.vue";
import { I_Post } from "../interfaces";

const notesStore = useNotesStore();

const filterCompleted = ref(false);
const route = useRoute();
const router = useRouter();

const posts = computed<I_Post[]>(() => notesStore.posts);
const loading = computed<boolean>(() => notesStore.loading);
const error = computed<string | null>(() => notesStore.error);

const filteredNotes = computed(() => {
  return filterCompleted.value
    ? posts.value.filter((note) => note.completed)
    : posts.value;
});

const isModalOpen = ref<boolean>(false);
const modalHeader = ref<string>("");
const currentNote = ref<any>(null);
const currentMode = ref<"edit" | "delete">("edit");

const openEditModal = (header: string, note: any, mode: "edit" | "delete") => {
  modalHeader.value = header;
  currentNote.value = note;
  currentMode.value = mode;
  isModalOpen.value = true;
};

const closeEditModal = () => {
  isModalOpen.value = false;
  modalHeader.value = "";
  currentNote.value = null;
  currentMode.value = "edit";
};

function syncFilterWithQuery() {
  filterCompleted.value = route.query.completed === "true";
}

function updateQuery() {
  router.push({
    query: {
      ...route.query,
      completed: filterCompleted.value ? "true" : undefined,
    },
  });
}

const setFilter = () => {
  filterCompleted.value = !filterCompleted.value;
};

const makeNoteCompleted = (data: any) => {
  notesStore.toggleCompletion(data.noteId);
};

const saveEdit = (noteId: number, text: string) => {
  notesStore.editPost(noteId, text);
  closeEditModal();
};

const deletePost = (postId: number) => {
  notesStore.deletePost(postId);
};

watch(filterCompleted, updateQuery);

watch(
  () => route.query.completed,
  (newQueryValue) => {
    filterCompleted.value = newQueryValue === "true";
  }
);

const lockScroll = (): void => {
  document.body.style.overflow = "hidden";
};

const unlockScroll = (): void => {
  document.body.style.overflow = "auto";
};

const disableTabNavigation = (): void => {
  document
    .querySelectorAll('body *:not([aria-hidden="true"])')
    .forEach((el: Element) => {
      (el as HTMLElement).setAttribute("tabindex", "-1");
    });
};

const enableTabNavigation = (): void => {
  document
    .querySelectorAll('body *:not([aria-hidden="true"])')
    .forEach((el: Element) => {
      (el as HTMLElement).removeAttribute("tabindex");
    });
};

watch(isModalOpen, (newValue): void => {
  if (newValue) {
    lockScroll();
    disableTabNavigation();
  } else {
    unlockScroll();
    enableTabNavigation();
  }
});

onMounted(async () => {
  notesStore.loadPostsFromLocalStorage();
  if (notesStore.posts.length === 0) {
    await notesStore.fetchPosts();
  }
  syncFilterWithQuery();
});

onBeforeUnmount(() => {
  unlockScroll();
  enableTabNavigation();
});
</script>

<style scoped>
.create-note-button {
  background-color: #00a97f;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.create-note-button:hover {
  background-color: #008e66;
}

.filter-text {
  cursor: pointer;
  transition: color 0.3s, background-color 0.3s;
}

.filter-active {
  color: #00a97f;
  font-weight: bold;
  background-color: #f1f1f1;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
}

.notes-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
}

.filter-section {
  margin-bottom: 1.5rem;
  text-align: center;
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  font-weight: bold;
  border-bottom: 2px solid #ccc;
  background-color: #f1f1f1;
}

.header-item {
  flex: 1;
  text-align: center;
}

.status-header {
  text-align: right;
  margin-right: 1.5em;
}

.note-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.note-item:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
}

.no-notes-message {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 2rem;
}

.note-details,
.buttons-container,
.checkbox-container {
  flex: 1;
  text-align: center;
}

.buttons-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.checkbox-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
