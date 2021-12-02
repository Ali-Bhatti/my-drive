<template>
  <v-app>
    <v-main class="grey lighten-2">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

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
