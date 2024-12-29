<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Todo } from '@/models/Todo';

// Liste des tâches avec persistance dans le localStorage
const listTodo = ref<Todo[]>([]);

// Titre de la nouvelle tâche et date d'échéance
const newTaskTitle = ref<string>('');
const newTaskDueDate = ref<Date | null>(null);

// Messages de notification
const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);
const deletionMessage = ref<string | null>(null);

// Filtre sélectionné
const currentFilter = ref<'all' | 'active' | 'completed'>('all');

// Fonction pour charger les tâches depuis le localStorage
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    listTodo.value = JSON.parse(storedTasks).map((task: any) => new Todo(
      task.id,
      task.title,
      task.dueDate ? new Date(task.dueDate) : undefined,
      task.isCompleted
    ));
  }
}

// Fonction pour sauvegarder les tâches dans le localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(listTodo.value));
}

// Fonction pour ajouter une tâche
function addTask() {
  // Validation : vérifier que le titre n'est pas vide
  if (newTaskTitle.value.trim() === '') {
    errorMessage.value = 'Le titre de la tâche ne peut pas être vide.';
    successMessage.value = null;
    return;
  }

  // Validation : vérifier les tâches en double (basé sur le titre)
  const isDuplicate = listTodo.value.some(todo => todo.title.toLowerCase() === newTaskTitle.value.trim().toLowerCase());
  if (isDuplicate) {
    errorMessage.value = 'Une tâche avec ce titre existe déjà.';
    successMessage.value = null;
    return;
  }

  // Si une date est fournie, convertissez-la en objet Date
  const dueDate = newTaskDueDate.value ? new Date(newTaskDueDate.value) : null;

  // Ajout de la nouvelle tâche
  const newTask = new Todo(
    listTodo.value.length + 1, // ID unique basé sur la taille actuelle
    newTaskTitle.value, // Titre de la tâche
    dueDate // Date d'échéance (facultatif)
  );
  listTodo.value.push(newTask);

  // Sauvegarde des tâches dans le localStorage
  saveTasks();

  // Affichage du message de succès **avant** de réinitialiser
  successMessage.value = `La tâche "${newTaskTitle.value}" a été ajoutée avec succès.`;

  // Réinitialisation des champs et des messages
  newTaskTitle.value = '';
  newTaskDueDate.value = null;
  errorMessage.value = null;

  // Réinitialisation du message après 3 secondes
  setTimeout(() => {
    successMessage.value = null;
  }, 3000);
}

// Fonction pour supprimer une tâche
function deleteTask(index: number) {
  const taskTitle = listTodo.value[index].title;

  listTodo.value.splice(index, 1);
  saveTasks();

  deletionMessage.value = `La tâche "${taskTitle}" a été supprimée.`;

  // Réinitialisation du message après 3 secondes
  setTimeout(() => {
    deletionMessage.value = null;
  }, 3000);
}

// Fonction pour marquer une tâche comme terminée
function markAsCompleted(index: number) {
  const todo = listTodo.value[index];
  if (!todo.isCompleted) {
    todo.isCompleted = true;  // Marquer la tâche comme terminée
    saveTasks();  // Sauvegarder les tâches mises à jour
  }
}

// Fonction pour supprimer toutes les tâches
function deleteAllTasks() {
  if (confirm('Êtes-vous sûr de vouloir supprimer toutes les tâches ?')) {
    listTodo.value = [];  // Vider la liste des tâches
    saveTasks();  // Sauvegarder le changement dans le localStorage

    deletionMessage.value = 'Toutes les tâches ont été supprimées.';

    // Réinitialisation du message après 3 secondes
    setTimeout(() => {
      deletionMessage.value = null;
    }, 3000);
  }
}

// Fonction pour supprimer les tâches terminées
function deleteCompletedTasks() {
  const completedTasks = listTodo.value.filter(todo => todo.isCompleted);

  if (completedTasks.length === 0) {
    deletionMessage.value = 'Aucune tâche terminée à supprimer.';
    setTimeout(() => {
      deletionMessage.value = null;
    }, 3000);
    return;
  }

  listTodo.value = listTodo.value.filter(todo => !todo.isCompleted); // Supprimer les tâches terminées
  saveTasks();

  deletionMessage.value = 'Toutes les tâches terminées ont été supprimées.';

  // Réinitialisation du message après 3 secondes
  setTimeout(() => {
    deletionMessage.value = null;
  }, 3000);
}


// Charger les tâches depuis le localStorage lors du montage du composant
onMounted(() => {
  loadTasks();
});

// Fonction de filtrage des tâches
function filteredTasks() {
  if (currentFilter.value === 'active') {
    return listTodo.value.filter(todo => !todo.isCompleted);
  } else if (currentFilter.value === 'completed') {
    return listTodo.value.filter(todo => todo.isCompleted);
  }
  return listTodo.value;  // Retourne toutes les tâches
}

// Calculer le nombre de tâches restantes
function getRemainingTasksCount() {
  return listTodo.value.filter(todo => !todo.isCompleted).length;
}
</script>

<template>
  <div class="todocomponent">
    <h1>Liste des tâches</h1>

    <!-- Affichage des messages de notification -->
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    <div v-if="deletionMessage" class="deletion-message">{{ deletionMessage }}</div>

    <!-- Ajout de tâches -->
    <div class="add-task">
      <input
        type="text"
        v-model="newTaskTitle"
        placeholder="Ajouter une nouvelle tâche"
      />
      <input
        type="date"
        v-model="newTaskDueDate"
        placeholder="Date d'échéance (facultatif)"
      />
      <button @click="addTask">Ajouter</button>
    </div>

    <!-- Filtrage des tâches -->
    <div class="filters">
      <button @click="currentFilter = 'all'">Toutes</button>
      <button @click="currentFilter = 'active'">À faire</button>
      <button @click="currentFilter = 'completed'">Terminées</button>
    </div>

    <!-- Liste des tâches -->
    <ul>
      <li v-for="(todo, index) in filteredTasks()" :key="todo.id">
        <span>{{ todo.title }}</span>
        <span v-if="todo.dueDate"> ({{ todo.dueDate.toLocaleDateString() }})</span>
        <span v-if="todo.isCompleted"> - Terminé</span>
        <span v-else> - En cours</span>
        <!-- Bouton pour marquer la tâche comme terminée -->
        <button v-if="!todo.isCompleted" @click="markAsCompleted(index)">Terminer</button>
        <button @click="deleteTask(index)">Supprimer</button>
      </li>
      <button @click="deleteAllTasks">Supprimer toutes les tâches</button>
      <button @click="deleteCompletedTasks">Supprimer les tâches terminées</button>
    </ul>

    <!-- Footer avec le nombre de tâches restantes -->
    <footer v-if="getRemainingTasksCount() > 0">
      <h1>Nombre de tâches restantes</h1>
      <span>{{ getRemainingTasksCount() }} tâche(s) à faire</span>
    </footer>
  </div>
</template>

<style scoped>
</style>
