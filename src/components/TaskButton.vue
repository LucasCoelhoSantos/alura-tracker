<template>
    <button class="button" @click="clicked" :disabled="disable">
        <span class="icon">
            <i :class="iconName"></i>
        </span>
        <span>{{ text }}</span>
    </button>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
  
export default defineComponent({
    name: "TaskButton",
    props: {
        disable: {
            type: Boolean
        },
        iconName: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
    },
    emits: ['clicked'],
    methods: {
        clicked () : void {
            this.$emit('clicked')
        }
    },
})
</script>
