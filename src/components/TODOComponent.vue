<script setup lang="ts">
import { ref } from 'vue';
import { Todo } from '@/models/Todo';

const listTodo = ref<Todo[]>([
  new Todo(1, 'Faire les courses', new Date('2024-12-10')),
  new Todo(2, 'Acheter du pain', undefined, false),
  new Todo(3, 'Préparer le dîner', new Date('2024-12-12'), true),
]);
</script>

<template>
  <div class="todocomponent">
    <h1>Liste des tâches</h1>
    <ul>
      <li v-for="todo in listTodo" :key="todo.id">
        <span>{{ todo.title }}</span>
        <span v-if="todo.dueDate">({{ todo.dueDate.toLocaleDateString() }})</span>
        <span v-if="todo.isCompleted">Terminé</span>
        <span v-else>En cours</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
</style>
