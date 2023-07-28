<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': darkModeOn }">
    <div class="column is-one-quarter">
      <SideBar @onChangeTheme="changeTheme"/>
    </div>
    <div class="column is-three-quarter content">
      <NotificationItem />
      <!-- RESPECTIVE VIEW -->
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./components/SideBar.vue";
import NotificationItem from "./components/NotificationItem.vue";

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    NotificationItem,
  },
  data() {
    return {
      darkModeOn: false,
    }
  },
  methods: {
    changeTheme (darkModeOn: boolean) {
      this.darkModeOn =darkModeOn
    }
  }
});
</script>

<style>
.list {
  padding: 1.25rem;
}

main {
  --bg-primary: #ffffff;
  --text-primary: #000000;
}

main.dark-mode {
  --bg-primary: #2b2b42;
  --text-primary: #dddddd;
}

.content {
  background-color: var(--bg-primary);
  height: 80vh;
}
</style>
