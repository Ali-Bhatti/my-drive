<template>
  <v-app>
    <v-main class="bg_color">
      <navbar v-if="!isAuthRoute" :name="userName"></navbar>
      <div :class="{ 'pa-3': !isAuthRoute }">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Layout/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
  },
  computed: {
    isAuthRoute() {
      return ['/login', '/signup'].includes(this.$route.path);
    },
    userName() {
      return this.$store.getters.userName;
    }
  }
};
</script>

<style>
.bg-color {
  background-color: #ebebeb;
}
</style>
