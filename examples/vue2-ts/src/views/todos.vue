<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>备忘录</h1>
        <input
          class="new-todo"
          autofocus
          autocomplete="off"
          :placeholder="placeholder"
          v-model="newTodo"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main" v-show="todos.length" v-cloak>
        <!-- 使用 for 绑定 input -->
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone" />
        <label for="toggle-all"></label>
        <ul class="todo-list">
          <li
            v-for="todo in filteredTodos"
            class="todo"
            :key="todo.id"
            :class="{ completed: todo.completed, editing: todo == editedTodo }"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <input
              class="edit"
              type="text"
              v-model="todo.title"
              v-todo-focus="todo == editedTodo"
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.esc="cancelEdit(todo)"
            />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todos.length" v-cloak>
        <span class="todo-count">
          <strong>{{ remaining }}</strong>
          {{ remaining | pluralize }} left
        </span>
        <ul class="filters">
          <template v-for="item in ['all','active','completed']">
            <li :key="item">
              <a @click="handleTodoState(item)" :class="{ selected: visibility == item }">{{item}}</a>
            </li>
          </template>
        </ul>
        <button
          class="clear-completed"
          @click="removeCompleted"
          v-show="todos.length > remaining"
        >Clear completed</button>
      </footer>
    </section>
    <myFooter />
  </div>
</template>

<script lang="ts">
import myFooter from '@/components/Footer.vue'
import { mapActions, mapState } from 'vuex'
import { Todo } from '@/types/index'
import Vue from 'vue'
const MAX_INPUT = 10
const STORAGE_KEY = 'todos-vuejs-2.0'

const todoStorage = {
  fetch: function () {
    const todos: Array<Todo> = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function (todo: Todo, index: number | string) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos: Todo) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

// visibility filters
const filters = {
  all: function (todos: Array<Todo>) {
    return todos
  },
  active: function (todos: Array<Todo>) {
    return todos.filter(function (todo) {
      return !todo.completed
    })
  },
  completed: function (todos: Array<Todo>) {
    return todos.filter(function (todo: Todo) {
      return todo.completed
    })
  }
}

export default Vue.extend({
  name: 'App',
  data () {
    return {
      placeholder: '需要做什么？',
      todos: todoStorage.fetch(),
      newTodo: '',
      editedTodo: null,
      visibility: 'all'
    }
  },
  components: {
    myFooter
  },
  watch: {
    todos: {
      handler (todos): void {
        if (todos.length < MAX_INPUT) {
          todoStorage.save(todos)
        } else {
          this.placeholder = `最多是个${MAX_INPUT}个`
          setTimeout(() => {
            this.placeholder = '需要做什么？'
          }, 3000)
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState('todo', ['todoList']),
    filteredTodos: function () {
      return filters[this.visibility](this.todos)
    },
    remaining () {
      return filters.active(this.todos).length
    },
    allDone: {
      get () {
        return this.remaining === 0
      },
      set (value) {
        this.todos.forEach(function (todo: Todo) {
          todo.completed = value
        })
      }
    }
  },

  filters: {
    pluralize: function (n: unknown) {
      return n === 1 ? 'item' : 'items'
    }
  },
  methods: {
    ...mapActions('todo', ['getTodos']),
    handleTodoState (val: unknown) {
      this.visibility = val
    },
    addTodo: function () {
      const value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      })
      this.newTodo = ''
    },

    removeTodo: function (todo: Todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },

    editTodo: function (todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },

    doneEdit: function (todo: Todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },
    cancelEdit: function (todo: Todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },
    removeCompleted: function () {
      this.todos = filters.active(this.todos)
    }
  },
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  },
  async created () {
    try {
      const data = await this.getTodos()
      this.todos = this.todos.concat(data.data.list)
      console.log('created', this.todos)
    } catch (e) {
      console.error('data', e)
    }
  }
})

</script>

<style>
/* https://cn.vuejs.org/v2/api/#v-cloak */
[v-cloak] {
  display: none;
}
</style>
