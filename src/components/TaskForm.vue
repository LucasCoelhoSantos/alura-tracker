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
import { computed, defineComponent } from "vue"
import TaskTimer from "./TaskTimer.vue"
// import { useStore } from "vuex"
import { key, useStore } from "@/store"
import { NOTIFY } from "@/store/mutations-type"
import { NotificationType } from "@/interface/INotification"

export default defineComponent({
    name: "TaskForm",
    emits: ["onSaveTask"],
    components: {
        TaskTimer,
    },
    data() {
        return {
            description: "",
            projectId: ""
        }
    },
    methods: {
        finishTask(elapsedTime: number) : void {
            const project = this.store.state.projects.find(p => p.id == this.projectId)
            if(!project) {
                this.store.commit(NOTIFY, {
                    title: "Ops!",
                    text: "Select the project before finish the task!",
                    type: NotificationType.FAIL,
                })
                return
            }
            this.$emit("onSaveTask", {
                duration: elapsedTime,
                description: this.description,
                project: this.projects.find(proj => proj.id == this.projectId),
            })
            this.description = ""
        }
    },
    setup () {
        const store = useStore()
        return {
            projects: computed(() => store.state.projects),
            store,
        }
    }
})
</script>

<style>
.form {
    background-color: var(--bg-primary);
    color: var(--text-primary);
}
</style>
