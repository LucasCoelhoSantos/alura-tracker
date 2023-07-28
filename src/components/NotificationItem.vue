<template>
    <div class="notifications">
        <article
            v-for="notification in notifications"
            :key="notification.id"
            class="message"
            :class="context[notification.type]"
        >
            <div class="message-header">{{ notification.title }}</div>
            <div class="message-body">{{ notification.text }}</div>
        </article>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { NotificationType } from "@/interface/INotification";

export default defineComponent({
    name: "NotificationItem",
    data () {
        return {
            context: {
                [NotificationType.SUCCESS]: 'is-success',
                [NotificationType.WARNING]: 'is-warning',
                [NotificationType.FAIL]: 'is-danger',
            },
        }
    },
    setup () {
        const store = useStore()
        return {
            notifications: computed(() => store.state.notifications),
        }
    },
})
</script>

<style scoped>
.notifications {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 105;
}
</style>
