<template>
  <v-app>
    <v-main class="grey lighten-2">
      <navbar name="Umar"></navbar>
      <v-content class="pa-3">
        <router-view />
      </v-content>
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
    //
  }),
};
</script>
<style>
.bg-color {
  background-color: #ebebeb;
}
</style>
