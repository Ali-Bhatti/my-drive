<template>
  <v-app>
    <v-main class="bg_color">
      <navbar v-if="!isAuthRoute"></navbar>
      <div :class="{ 'pa-3': !isAuthRoute }">
        <router-view />
      </div>
      <notification />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Layout/Navbar.vue";
import Notification from "./components/UI/Notification.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Notification
  },
  computed: {
    isAuthRoute() {
      return ['/login', '/signup'].includes(this.$route.path);
    }
  }
};
</script>

<style>
.bg-color {
  background-color: #ebebeb;
}
</style>
