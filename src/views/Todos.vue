<template>
  <div class="home">
    <v-text-field
      v-model="newTodoTitle"
      outlined
      label="Todo Title"
      append-icon="mdi-plus"
      hide-details
      clearable
      @click:append="addTodo"
      @keyup.enter="addTodo"
    ></v-text-field>

    <v-snackbar v-model="hasAlert">
      {{ alertMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="hasAlert = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-list flat>
      <div v-for="todo in todos" :key="todo.id">
        <v-list-item
          @click="updateTodo(todo.id)"
          :class="{ 'blue lighten-5': todo.checked }"
        >
          <template>
            <v-list-item-action>
              <v-checkbox :input-value="todo.checked"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                :class="{ 'text-decoration-line-through': todo.checked }"
              >
                {{ todo.title }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn @click.stop="deleteTodo(todo.id)" icon>
                <v-icon color="grey lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script>
import { getTodos, addTodo, updateTodo, deleteTodo } from '@/services/TodoService'

export default {
  name: "Home",

  components: {},

  data() {
    return {
      todos: [],
      newTodoTitle: "",
      alertMessage: "",
      hasAlert: false,
    };
  },

  async created() {
    this.todos = await getTodos()
  },

  methods: {
    async addTodo() {
      this.todos.push(await addTodo(this.newTodoTitle))
      this.newTodoTitle = ''
      this.showAlert('Todo added successfully!')
    },

    async updateTodo(id) {
      await updateTodo(id)
      let todo = this.todos.filter((todo) => todo.id === id)[0];
      todo.checked = !todo.checked;
      this.showAlert('Todo updated successfully!');
    },

    async deleteTodo(id) {
      await deleteTodo(id)
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.showAlert('Todo deleted successfully!');
    },
    showAlert(message) {
      this.alertMessage = message;
      this.hasAlert = true;
    },
  },
};
</script>
