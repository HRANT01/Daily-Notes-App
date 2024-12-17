import { defineStore } from "pinia";
import axios from "axios";
import { I_Post } from "../interfaces";

export const useNotesStore = defineStore("notes", {
  state: () => ({
    posts: [] as I_Post[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchPosts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get<I_Post[]>(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const posts = response.data.slice(0, 10).map((post) => ({
          ...post,
          completed: false,
        }));

        localStorage.setItem("notes", JSON.stringify(posts));
        this.posts = posts;
        return true;
      } catch (err) {
        this.error = "Failed to fetch posts.";
        return false;
      } finally {
        this.loading = false;
      }
    },

    toggleCompletion(noteId: number) {
      const post = this.posts.find((post) => post.id === noteId);
      if (post) {
        post.completed = !post.completed;

        localStorage.setItem("notes", JSON.stringify(this.posts));
      }
    },

    editPost(id: number, text: string) {
      const post = this.posts.find((post) => post.id === id);
      if (post) {
        post.title = text;
        localStorage.setItem("notes", JSON.stringify(this.posts));
      } else {
        console.error("Post not found");
      }
    },

    deletePost(noteId: number) {
      const index = this.posts.findIndex((post) => post.id === noteId);
      if (index !== -1) {
        this.posts.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(this.posts));
      } else {
        console.error(`Post with ID ${noteId} not found.`);
      }
    },

    loadPostsFromLocalStorage() {
      const savedPosts = localStorage.getItem("notes");
      if (savedPosts) {
        this.posts = JSON.parse(savedPosts);
      }
    },

    getNoteBySlug(slug: string) {
      return this.posts.find((note) => note.title === slug);
    },
  },

  getters: {
    getAllPosts: (state): I_Post[] => state.posts,
  },
});
