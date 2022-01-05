<template>
  <v-app>
    <v-main class="bg_color">
      <!-- <router-view v-if="!login" :key="$router.path"></router-view>-->
      <div class="pa-3">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //login: false
  }),
};
</script>
<style>
.bg-color {
  background-color: #ebebeb;
}
</style>
