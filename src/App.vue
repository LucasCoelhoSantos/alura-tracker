<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': darkModeOn }">
    <div class="column is-one-quarter">
      <SideBar @onChangeTheme="changeTheme"/>
    </div>
    <div class="column is-three-quarter content">
      <TaskForm @onSaveTask="saveTask"/>
      <div class="list">
        <TaskItem v-for="(task, index) in tasks" :key="index" :task="task"/>
        <TaskBox v-if="listEmpty">
          You haven't done any tasks yet!
        </TaskBox>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideBar from './components/SideBar.vue'
import TaskForm from './components/TaskForm.vue'
import TaskItem from './components/TaskItem.vue'
import TaskBox from './components/TaskBox.vue'
import ITask from '@/interface/ITask'

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    TaskForm,
    TaskItem,
    TaskBox,
  },
  data() {
    return {
      tasks: [] as ITask[],
      darkModeOn: false,
    }
  },
  computed: {
    listEmpty () : boolean {
      return this.tasks.length === 0
    }
  },
  methods: {
    saveTask (task: ITask) {
      this.tasks.push(task)
    },
    changeTheme (darkModeOn: boolean) {
      this.darkModeOn =darkModeOn
    }
  }
});
</script>

<style>
.list {
  padding: 1.25rem;
}

main {
  --bg-primary: #ffffff;
  --text-primary: #000000;
}

main.dark-mode {
  --bg-primary: #2b2b42;
  --text-primary: #dddddd;
}

.content {
  background-color: var(--bg-primary);
}
</style>
