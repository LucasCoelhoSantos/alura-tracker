<template>
    <div class="box form">
        <div class="columns">
            <div 
                class="column is-8" 
                role="form" 
                aria-label="New task create form">
                <input 
                    type="text" 
                    class="input" 
                    placeholder="What task do you want to start?"
                    v-model="description"
                />
            </div>
            <div class="column">
                <TaskTimer @timer-finished="finishTask" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TaskTimer from './TaskTimer.vue'

export default defineComponent({
    name: 'TaskForm',
    emits: ['onSaveTask'],
    components: {
        TaskTimer,
    },
    data() {
        return {
            description: ''
        }
    },
    methods: {
        finishTask(elapsedTime: number) : void {
            this.$emit('onSaveTask', {
                duration: elapsedTime,
                description: this.description
            })
            this.description = ''
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
