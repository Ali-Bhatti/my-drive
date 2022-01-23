<template>
  <nav>
    <v-app-bar :app="app" color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Welcome </span>
        <span class="font-weight-bold">{{ name }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn outlined @click="logout">
        Logout
        <v-icon right>logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" color="secondary">
      <v-container align-content="center" class="mt-4">
        <v-row justify="center">
          <v-avatar size="70" color="blue">
            <!-- <img src="/avatar.png" alt="" /> -->
            <span class="white--text text-h5">{{ avatarName }}</span>
          </v-avatar>
        </v-row>
        <v-row justify="center">
          <p class="grey--text subheading mt-1">{{ name }}</p>
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
      avatarBgColor: null,
      links: [
        { icon: "home", text: "Home", route: "/home" },
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
    logout(){
      this.$store.dispatch("isAuth", false);
      this.$router.push("/");
    }
  },
  computed:{
    avatarName(){
      // as I need just two characters of each word in name that ia why I wrote 2. 
      // like "Muhammad Ali" required => "MA"
      return this.name.split(" ").map((ele, i) => i < 2 ? ele[0] : "").join('');
    },
  }
};
</script>