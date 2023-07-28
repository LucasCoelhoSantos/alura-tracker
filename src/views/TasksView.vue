<template>
    <TaskForm @onSaveTask="saveTask"/>
    <div class="list">
        <TaskBox v-if="emptyList">
            You haven't done any tasks yet!
        </TaskBox>
        <TaskItem v-for="(task, index) in tasks" :key="index" :task="task"/>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import TaskForm from "../components/TaskForm.vue";
import TaskItem from "../components/TaskItem.vue";
import TaskBox from "../components/TaskBox.vue";
import ITask from "../interface/ITask";

export default defineComponent({
    name: "App",
    components: {
        TaskForm,
        TaskItem,
        TaskBox,
    },
    data() {
        return {
        tasks: [] as ITask[],
        }
    },
    computed: {
        emptyList () : boolean {
        return this.tasks.length === 0
        }
    },
    methods: {
        saveTask (task: ITask) {
        this.tasks.push(task)
        },
    },
});
</script>
