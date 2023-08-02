<template>
    <section>
        <form @submit.prevent="save">
            <label for="projectName" class="label">
                Project Name
            </label>
            <input 
                type="text"
                class="input"
                v-model="projectName"
                id="projectName"
            />
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { A_ADD_PROJECT, A_EDIT_PROJECT } from "@/store/actions-type";
import { NotificationType } from "@/interface/INotification";
import useNotifier from "@/hooks/notifier";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "ProjectForm",
    props: {
        id: {
            type: String
        }
    },
    setup (props) {
        const router = useRouter()

        const store = useStore()
        const { notify } = useNotifier()

        const projectName = ref("")
        
        if (props.id) {
            const project = store.state.project.projects.find(proj => proj.id == props.id)
            projectName.value = project?.name || ""
        }

        const successMessage = () => {
            projectName.value = ""
            notify(NotificationType.SUCCESS, "New project save", "Your project has been successfully saved.")
            router.push("/projects")
        }

        const save = () => {
            if (props.id) {
                store.dispatch(A_EDIT_PROJECT, {
                    id: props.id,
                    name: projectName.value,
                }).then(() => successMessage())
            } else {
                store.dispatch(A_ADD_PROJECT, projectName.value)
                    .then(() => successMessage())
            }
        }

        return {
            projectName,
            save,
        }
    },
    // data () {
    //     return {
    //         projectName: "",
    //     }
    // },
    // mounted () {
    //     if(this.id) {
    //         const project = this.store.state.project.projects.find(proj => proj.id == this.id)
    //         this.projectName = project?.name || ""
    //     }
    // },
    // methods: {
    //     save () {
    //         if (this.id) {
    //             this.store.dispatch(A_EDIT_PROJECT, {
    //                 id: this.id,
    //                 name: this.projectName,
    //             }).then(() => this.successMessage())
    //         } else {
    //             this.store.dispatch(A_ADD_PROJECT, this.projectName)
    //                 .then(() => this.successMessage())
    //         }
    //     },
    //     successMessage () {
    //         this.projectName = ""
    //         this.notify(NotificationType.SUCCESS, "New project save", "Your project has been successfully saved.")
    //         this.$router.push("/projects")
    //     },
    // },
})
</script>

<style scoped>
section {
    padding: 1.25rem;
}
</style>
