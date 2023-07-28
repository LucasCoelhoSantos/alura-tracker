<template>
    <TaskBox>
        <div class="columns">
            <div class="column is-4">
                {{ task.description || 'Task without description' }}
            </div>
            <div class="column is-3">
                {{  task.project?.name || "N/D" }}
            </div>
            <div class="column">
                <TaskStopwatch :timeInSeconds="task.duration"/>
            </div>
        </div>
    </TaskBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import TaskStopwatch from './TaskStopwatch.vue';
import TaskBox from './TaskBox.vue'
import ITask from '@/interface/ITask';

export default defineComponent({
    name: 'TaskItem',
    props: {
        task: {
            type: Object as PropType<ITask>,
                required: true
        }
    },
    components: {
        TaskStopwatch,
        TaskBox,
    }
})
</script>
