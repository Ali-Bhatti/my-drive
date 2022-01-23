<template>
  <v-app>
    <!-- <v-main class="bg_color">
      <navbar :name="userName"></navbar>
      <div class="pa-3">
        <router-view />
      </div>
    </v-main> -->
    <v-main class="bg_color">
      <router-view v-if="!isAuthenticated" :key="$router.path"></router-view>
      <div v-else>
        <navbar :name="userName"></navbar>
        <div class="pa-3">
          <router-view />
        </div>
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
  data: () => ({
    userName: "",
    isAuthenticated: false,
  }),
  beforeMount() {
    this.userName = this.$store.getters.userName;
  },
  beforeUpdate() {
    this.isAuthenticated = this.$store.getters.isAuth;
  },
};
</script>
<style>
.bg-color {
  background-color: #ebebeb;
}
</style>
