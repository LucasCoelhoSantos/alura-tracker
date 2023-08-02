<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <TaskStopwatch :timeInSeconds="timeInSeconds"/>
        <TaskButton @clicked="start" iconName="fas fa-play" text="play" :disabled="timerRun" />
        <TaskButton @clicked="stop" iconName="fas fa-stop" text="stop" :disabled="!timerRun" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TaskStopwatch from './TaskStopwatch.vue'
import TaskButton from './TaskButton.vue'

export default defineComponent({
    name: 'TaskTimer',
    components: {
        TaskStopwatch,
        TaskButton,
    },
    emits: ['timerFinished'],
    data () {
        return {
            timeInSeconds: 0,
            taskTimer: 0,
            timerRun: false
        }
    },
    methods: {
        start () {
            this.timerRun = true
            this.taskTimer = setInterval(() => {
                this.timeInSeconds += 1
            }, 1000)
        },
        stop () {
            this.timerRun = false
            clearInterval(this.taskTimer);
            this.$emit('timerFinished', this.timeInSeconds)
            this.timeInSeconds = 0
        }
    }
})
</script>
