<template>
  <div class="no-footer-layout">
    <header class="no-footer-header">Страница создания заметки</header>

    <main class="no-footer-main">
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts">
export default {
  name: "NoFooterLayout",
};
</script>

<style scoped>
.no-footer-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.no-footer-header {
  padding: 1rem 2rem;
  background-color: #00a97f;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.no-footer-main {
  flex-grow: 1;
  padding: 2rem;
  margin-top: 1rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
