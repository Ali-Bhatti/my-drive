<template>
  <v-container fluid class="empty-state-container">
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4" class="text-center">
        <v-img
          src="@/assets/empty-folder.svg"
          max-width="200"
          class="mx-auto mb-6"
          alt="No folders"
        >
          <!-- Fallback icon if image fails to load -->
          <template v-slot:placeholder>
            <v-icon size="200" color="grey lighten-1">mdi-folder-outline</v-icon>
          </template>
        </v-img>
        
        <h2 class="text-h4 mb-4 grey--text text--darken-1">
          No Folders Yet
        </h2>
        
        <p class="text-subtitle-1 mb-6 grey--text">
          Get started by creating your first folder
        </p>

        <popup
            :icon="'mdi-plus'"
            :btnText="'Create Folder'"
            :isPrimary="true"
            :isXLarge="false"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Popup from "./Layout/Popup.vue";
export default {
  name: 'EmptyState',
  components: {
    Popup
  }
}
</script>

<style scoped>
.empty-state-container {
  min-height: 400px;
  display: flex;
  align-items: center;
}
</style> 