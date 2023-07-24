<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="logo">
        </h1>
        <button class="button" @click="changeTheme">
            {{ textButton }}
        </button>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'SideBar',
    emits: ['onChangeTheme'],
    data () {
        return {
            darkModeOn: false
        }
    },
    computed: {
        textButton () {
            if (this.darkModeOn) {
                return 'Light Mode'
            }
            return 'Dark Mode'
        }
    },
    methods: {
        changeTheme () {
            this.darkModeOn = !this.darkModeOn
            this.$emit('onChangeTheme', this.darkModeOn)
        }
    }
})
</script>

<style scoped>
header {
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    text-align: center;
}
@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}
</style>
