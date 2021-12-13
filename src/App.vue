<template>
  <v-app>
    <v-main class="bg_color">
      <navbar :name="userName"></navbar>
      <div class="pa-3">
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
  data: () => ({
    userName: '',
  }),
  mounted(){
    this.userName = this.$store.getters.userName
  }
};
</script>
<style>
.bg-color {
  background-color: #ebebeb;
}
</style>
