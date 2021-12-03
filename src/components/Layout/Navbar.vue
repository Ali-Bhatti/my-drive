<template>
  <nav>
    <v-app-bar :app="app" color="teal accent-3">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <span class="text-h5
                        text-md-h4
                        text-lg-h4
                        text-xl-h4
                        font-weight-bold" >
            Welcome {{ name }} </span> -->
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Welcome </span>
        <span class="font-weight-bold">{{ name }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn outlined>
        Logout
        <v-icon right>logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" color="teal lighten-5">
      <v-list>
          <v-list-item v-for="link in links" :key="link.text" route :to="link.route">
              <v-list-item-icon>
                  <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                  <v-list-item-title>{{ link.text }}</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
export default {
  props: {
    name: String,
    app: {
      default: true,
    },
  },
  data() {
    return {
      drawer: true,
      links:[
          {icon: 'home', text: 'Home', route: '/'},
          {icon: 'info', text: 'About Us', route: '/about'},
      ]
    };
  },
  // computed: {
  //     size () {
  //         const size = {xs:'x-small',sm:'small',lg:'large',xl:'x-large'}[this.$vuetify.breakpoint.name];
  //         return size ? { [size]: true } : {}
  //     }
  // },
  methods: {
    smallScreen() {
      const size = { xs: "x-small", sm: "small", lg: "large", xl: "x-large" }[
        this.$vuetify.breakpoint.name
      ];
      return size === "x-small" || size === "small" ? true : false;
    },
  },
};
</script>