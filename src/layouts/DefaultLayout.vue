<template>
  <div class="layout">
    <header class="header">
      <h1>Ежедневные заметки</h1>
    </header>

    <main class="main-content">
      <slot></slot>
    </main>

    <footer class="footer">
      <p>&copy; Ежедневные заметки 2024. Все права защищены.</p>
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  name: "DefaultLayout",
};
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f4f7f6;
  color: #333;
}

.header {
  background-color: #00a97f;
  color: white;
  padding: 20px;
  text-align: center;
}

.header h1 {
  font-size: 2rem;
  margin: 0;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  border-radius: 8px;
}

.footer {
  background-color: #333;
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 0.9rem;
}

.footer p {
  margin: 0;
}
</style>
