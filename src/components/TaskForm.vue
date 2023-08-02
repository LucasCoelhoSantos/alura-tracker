<template>
    <div class="box form">
        <div class="columns">
            <div 
                class="column is-5" 
                role="form" 
                aria-label="New task create form">
                <input 
                    type="text" 
                    class="input" 
                    placeholder="What task do you want to start?"
                    v-model="description"
                />
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="projectId">
                        <option value="">Select the project</option>
                        <option
                            :value="project.id"
                            v-for="project in projects"
                            :key="project.id"
                        >
                            {{ project.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <TaskTimer @timer-finished="finishTask" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue"
import TaskTimer from "./TaskTimer.vue"
// import { useStore } from "vuex"
import { useStore } from "@/store"
import { NOTIFY } from "@/store/mutations-type"
import { NotificationType } from "@/interface/INotification"

export default defineComponent({
    name: "TaskForm",
    components: {
        TaskTimer,
    },
    emits: ["onSaveTask"],
    setup (props, { emit }) {
        const store = useStore()

        const description = ref("")
        const projectId = ref("")

        const projects = computed(() => store.state.project.projects)

        const finishTask = (elapsedTime: number) : void => {
            const project = store.state.project.projects.find(p => p.id == projectId.value)
            if(!project) {
                store.commit(NOTIFY, {
                    title: "Ops!",
                    text: "Select the project before finish the task!",
                    type: NotificationType.FAIL,
                })
                return
            }
            emit("onSaveTask", {
                duration: elapsedTime,
                description: description.value,
                project: projects.value.find(proj => proj.id == projectId.value),
            })
            description.value = ""
        }

        return {
            projects,
            description,
            projectId,
            finishTask,
        }
    },
    // data() {
    //     return {
    //         description: "",
    //         projectId: ""
    //     }
    // },
    // methods: {
    //     finishTask(elapsedTime: number) : void {
    //         const project = this.store.state.project.projects.find(p => p.id == this.projectId)
    //         if(!project) {
    //             this.store.commit(NOTIFY, {
    //                 title: "Ops!",
    //                 text: "Select the project before finish the task!",
    //                 type: NotificationType.FAIL,
    //             })
    //             return
    //         }
    //         this.$emit("onSaveTask", {
    //             duration: elapsedTime,
    //             description: this.description,
    //             project: this.projects.find(proj => proj.id == this.projectId),
    //         })
    //         this.description = ""
    //     }
    // },
})
</script>

<style>
.form {
    background-color: var(--bg-primary);
    color: var(--text-primary);
}
</style>
