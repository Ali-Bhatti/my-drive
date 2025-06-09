<template>
  <v-container class="about pa-6">
    <v-row>
      <v-col cols="12" md="8" class="mx-auto">
        <h1 class="text-h3 mb-6">About My Drive</h1>
        
        <v-card class="pa-6 mb-6" elevation="2">
          <h2 class="text-h5 mb-4">Overview</h2>
          <p class="text-body-1 mb-4">
            Welcome to <span class="drive">My Drive</span>, a modern web application inspired by Google Drive's intuitive interface and functionality. This application demonstrates advanced file system management capabilities using Vue.js and modern web technologies.
          </p>
        </v-card>

        <v-card class="pa-6" elevation="2">
          <h2 class="text-h5 mb-4">Key Features</h2>
          <v-list>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="primary">mdi-folder-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Folder Management</v-list-item-title>
                <v-list-item-subtitle>Create, rename, and organize folders with ease</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="primary">mdi-view-grid-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Multiple Views</v-list-item-title>
                <v-list-item-subtitle>Switch between grid and list views for optimal content organization</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="primary">mdi-account-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>User Management</v-list-item-title>
                <v-list-item-subtitle>Secure authentication and personalized user profiles</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="primary">mdi-database</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Offline Storage</v-list-item-title>
                <v-list-item-subtitle>Built with IndexedDB for reliable local data persistence</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'About',
  components: {},
};
</script>

<style scoped>
.drive {
  color: rgb(1, 167, 117);
  font-weight: 500;
}

.v-list-item {
  padding-left: 0;
}
</style>