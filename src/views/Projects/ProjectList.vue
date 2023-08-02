<template>
    <section>
        <router-link to="/projects/create" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>New Project</span>
        </router-link>
        <table class="table is-fullwidth is-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="project in projects" :key="project.id">
                    <td>{{ project.id }}</td>
                    <td>{{ project.name }}</td>
                    <td>
                        <router-link :to="`/projects/${project.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button ml-2 is-danger" @click="destroy(project.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { A_GET_PROJECTS, A_DELETE_PROJECT } from "@/store/actions-type";

export default defineComponent({
    name: "ProjectsList",
    setup () {
        const store = useStore()
        store.dispatch(A_GET_PROJECTS)
        return {
            projects: computed(() => store.state.project.projects),
            store
        }
    },
    methods: {
        destroy (id: string) {
            this.store.dispatch(A_DELETE_PROJECT, id)
        },
    },
})
</script>

<style scoped>
section {
    padding: 1.25rem;
}
</style>
