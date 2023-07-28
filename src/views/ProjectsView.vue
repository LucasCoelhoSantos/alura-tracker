<template>
    <div class="projects">
        <h1 class="title">Projects</h1>
    </div>
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent ({
    name: "ProjectsView",
})
</script>

<style scoped>
.projects {
    padding: 1.25rem
}
</style>