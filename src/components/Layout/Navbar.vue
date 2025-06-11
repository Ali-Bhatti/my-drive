<template>
  <nav>
    <v-app-bar :app="app" color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <Logo :size="32" class="mr-3" />
        <v-toolbar-title class="text-uppercase">
          <span class="font-weight-light">My</span>
          <span class="font-weight-bold"> Drive</span>
        </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <div class="user-info mr-4">
        <span class="font-weight-light">Welcome,</span>
        <span class="font-weight-medium ml-1">{{ userName }}</span>
      </div>

      <!-- dropdown menu -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on" class="mr-2">
            <v-icon dense>expand_more</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(link, index) in links" :key="index" route :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn color="white" class="ml-2" :elevation="2" :loading="loading" @click="confirmLogout">
        <v-icon left>mdi-logout</v-icon>
        <span>Logout</span>
      </v-btn>
    </v-app-bar>

    <!-- Logout Confirmation Dialog -->
    <v-dialog v-model="showLogoutDialog" max-width="340">
      <v-card>
        <v-card-title class="text-h5 pb-2">
          Confirm Logout
        </v-card-title>
        <v-card-text>
          Are you sure you want to logout?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showLogoutDialog = false">
            Cancel
          </v-btn>
          <v-btn color="error" text :loading="loading" @click="handleLogout">
            Logout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-navigation-drawer app v-model="drawer" color="secondary">
      <v-container align-content="center" class="mt-4">
        <v-row justify="center">
          <v-hover v-slot="{ hover }">
            <div class="avatar-container">
              <v-avatar size="70" color="blue" v-if="!avatarImage">
                <span class="white--text text-h5">{{ avatarName }}</span>
              </v-avatar>
              <v-avatar size="70" v-else>
                <v-img :src="avatarImage" alt="Avatar"></v-img>
              </v-avatar>

              <v-fade-transition>
                <v-overlay absolute :value="hover" class="align-center justify-center">
                  <v-btn small icon @click="openAvatarDialog">
                    <v-icon color="white">{{ avatarImage ? 'mdi-pencil' : 'mdi-camera' }}</v-icon>
                  </v-btn>
                </v-overlay>
              </v-fade-transition>
            </div>
          </v-hover>

          <input ref="avatarInput" type="file" accept="image/*" style="display: none" @change="onAvatarChange">
        </v-row>
        <v-row justify="center">
          <p class="grey--text subheading mt-1">{{ userName }}</p>
        </v-row>
      </v-container>

      <!-- Avatar Upload Dialog -->
      <avatar-upload-dialog v-model="showAvatarDialog" :current-avatar="avatarImage" :avatar-name="avatarName"
        @save="handleAvatarSave" />

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
import { mapGetters } from 'vuex';
import Logo from '../Logo.vue';
import AvatarUploadDialog from '../AvatarUploadDialog.vue';

export default {
  components: {
    Logo,
    AvatarUploadDialog
  },
  props: {},
  data() {
    return {
      drawer: true,
      loading: false,
      showLogoutDialog: false,
      avatarBgColor: null,
      avatarImage: null,
      showAvatarDialog: false,
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
    confirmLogout() {
      this.showLogoutDialog = true;
    },
    async handleLogout() {
      this.loading = true;
      try {
        await this.$store.dispatch('logout');
        this.showLogoutDialog = false;
        this.$router.push('/login');
      } finally {
        this.loading = false;
      }
    },
    onAvatarChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Check file type
      if (!file.type.startsWith('image/')) {
        this.$store.dispatch('setError', 'Please upload an image file');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.$store.dispatch('setError', 'Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.avatarImage = e.target.result;
        this.$store.dispatch('updateAvatar', e.target.result);
      };
      reader.readAsDataURL(file);
    },
    async removeAvatar() {
      this.avatarImage = null;
      await this.$store.dispatch('updateAvatar', null);
    },
    openAvatarDialog() {
      this.showAvatarDialog = true;
    },
    async handleAvatarSave(avatarData) {
      this.avatarImage = avatarData;
      await this.$store.dispatch('updateAvatar', avatarData);
    }
  },
  computed: {
    ...mapGetters(['getLoggedInUser']),
    avatarName() {
      // as I need just two characters of each word in name that ia why I wrote 2. 
      // like "Muhammad Ali" required => "MA"
      return this.getLoggedInUser?.name.split(" ").map((ele, i) => i < 2 ? ele[0].toLocaleUpperCase() : "").join('');
    },
    userName() {
      let user = this.getLoggedInUser;
      console.log(user);
      return user?.name || 'Guest';
    }
  },
  mounted() {
    this.avatarImage = this.getLoggedInUser?.avatar || null;
  }
};
</script>

<style scoped>
.avatar-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.v-overlay {
  border-radius: 50%;
}
</style>