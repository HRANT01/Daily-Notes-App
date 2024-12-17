import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

const store = createPinia();

createApp(App).use(store).use(router).mount("#app");
