<template>
  <nav>
    <v-app-bar :app="app" color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Welcome </span>
        <span class="font-weight-bold">{{ name }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            v-bind="attrs"
            v-on="on"
            class="mr-2"
          >
            <v-icon dense>expand_more</v-icon>
            <!-- <span class="d-none d-sm-flex">Menu</span> -->
            <span>Menu</span>
          </v-btn>
        </template>
          <v-list>
            <v-list-item
              v-for="(link, index) in links"
              :key="index"
              route
              :to="link.route"
            >
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
      </v-menu>

      <v-btn outlined>
        Logout
        <v-icon right>logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" color="secondary">
      <v-container align-content="center" class="mt-4">
        <v-row justify="center">
          <v-avatar size="100">
            <img src="/avatar.png" alt="" />
          </v-avatar>
        </v-row>
        <v-row justify="center">
          <p class="grey--text subheading mt-1">Muhammad Ali Bhatti</p>
        </v-row>
      </v-container>
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          route
          :to="link.route"
        >
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
      links: [
        { icon: "home", text: "Home", route: "/" },
        { icon: "mdi-help-box", text: "About", route: "/about" },
      ],
    };
  },
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