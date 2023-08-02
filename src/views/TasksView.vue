<template>
    <TaskForm @onSaveTask="saveTask"/>
    <div class="list">
        <TaskBox v-if="emptyList">
            You haven't done any tasks yet!
        </TaskBox>
        <div class="field">
            <p class="control has-icons-left">
                <input type="text" class="input" placeholder="Search..." v-model="filter">
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <TaskItem
            v-for="(task, index) in tasks"
            :key="index"
            :task="task"
            @onClickedTask="selectTask"
        />
        <ModalItem :show="selectedTask != null">
            <template v-slot:head>
                <p class="modal-card-title">Edit Task</p>
                <button class="delete" @click="closeModal" aria-label="close"></button>
            </template>
            <template v-slot:body>
                <div class="field">
                    <label for="taskDescription" class="label">Description</label>
                    <input 
                        type="text" 
                        class="input"
                        v-model="selectedTask.description"
                        id="taskDescription"
                    />
                </div>
            </template>
            <template v-slot:footer>
                <button class="button is-success" @click="editTask">Save changes</button>
                <button class="button" @click="closeModal">Cancel</button>
                <button class="button is-danger" @click="deleteTask">Delete</button>
            </template>
        </ModalItem>
    </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import TaskForm from "../components/TaskForm.vue";
import TaskItem from "../components/TaskItem.vue";
import TaskBox from "../components/TaskBox.vue";
import ModalItem from "../components/ModalItem.vue";
import { useStore } from "@/store";
import { A_GET_TASKS, A_ADD_TASK, A_EDIT_TASK, A_DELETE_TASK, A_GET_PROJECTS } from "@/store/actions-type";
import ITask from "@/interface/ITask";

export default defineComponent({
    name: "App",
    components: {
        TaskForm,
        TaskItem,
        TaskBox,
        ModalItem
    },
    data () {
        return {
            selectedTask: null as ITask | null,
        }
    },
    computed: {
        emptyList () : boolean {
            return this.tasks.length === 0
        }
    },
    setup () {
        const store = useStore()
        store.dispatch(A_GET_TASKS)
        store.dispatch(A_GET_PROJECTS)

        const filter = ref("")

        // const tasks = computed(() => 
        //     store.state.task.tasks.filter(
        //         (t) => !filter.value || t.description.includes(filter.value)
        //     )
        // )

        watchEffect(() => {
            store.dispatch(A_GET_TASKS, filter.value)
        })

        return {
            tasks: computed(() => store.state.task.tasks),
            store,
            filter,
        }
    },
    methods: {
        saveTask (task: ITask) : void {
            this.store.dispatch(A_ADD_TASK, task)
        },
        selectTask (task: ITask) {
            this.selectedTask = task
        },
        closeModal () {
            this.selectedTask = null
        },
        editTask () {
            this.store.dispatch(A_EDIT_TASK, this.selectedTask)
                .then(() => this.closeModal())
        },
        deleteTask () {
            this.store.dispatch(A_DELETE_TASK, this.selectedTask?.id)
                .then(() => this.closeModal())
        }
    },
});
</script>
