<template>
  <div class="home">
    <v-container fluid class="pa-4">
      <v-row class="py-2" v-if="folders.length > 0">
        <popup/>
      </v-row>
      <template v-if="folders.length > 0">
        <v-row class="px-2 pt-2 align-center">
          <p class="text-h5 mb-0">Folders</p>
          <v-spacer></v-spacer>
          <v-btn-toggle v-model="viewType" mandatory class="mr-4">
            <v-btn small value="grid">
              <v-icon>mdi-grid</v-icon>
            </v-btn>
            <v-btn small value="list">
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-btn>
          </v-btn-toggle>
          <v-btn
            class="text-capitalize txtColor"
            text
            small
            @click="sortBy('name')"
          >
            <v-icon left>mdi-sort-alphabetical-{{ sortDirection }}-variant</v-icon>
            by Folder Name
          </v-btn>
        </v-row>

        <!-- Grid View -->
        <v-container fluid class="px-1" v-if="viewType === 'grid'">
          <v-row>
            <v-col
              cols="6"
              sm="4"
              md="3"
              lg="2"
              v-for="(folder, index) in folders"
              :key="index"
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-card
                    class="pa-3 overflow rounded-lg"
                    :ripple="{ center: true }"
                    v-on="on"
                    v-bind="attrs"
                  >
                    <div class="d-flex align-center justify-space-between">
                      <div class="d-flex align-center" @click="openFolder(folder)">
                        <v-icon left color="amber darken-2">mdi-folder</v-icon>
                        <span class="text-truncate">{{ folder.name }}</span>
                      </div>
                      <div class="d-flex align-center">
                        <v-menu offset-y>
                          <template v-slot:activator="{ on: menu, attrs }">
                            <v-btn
                              icon
                              x-small
                              v-bind="attrs"
                              v-on="menu"
                              class="mr-1"
                            >
                              <v-icon small color="grey">mdi-dots-vertical</v-icon>
                            </v-btn>
                          </template>
                          <v-list dense>
                            <popup
                              menu-item
                              icon="mdi-pencil"
                              btn-text="Rename"
                              :folder="folder"
                            />
                          </v-list>
                        </v-menu>
                        <v-btn
                          icon
                          x-small
                          @click.stop="confirmDelete(folder)"
                        >
                          <v-icon small color="grey">mdi-delete</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </v-card>
                </template>
                <span>{{ folder.name }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-container>

        <!-- List View -->
        <v-container fluid class="px-1" v-else>
          <v-list class="list-container">
            <template v-for="folder in folders">
              <v-list-item
                :key="folder.name"
                class="rounded-lg mb-2 folder-list-item white"
              >
                <div class="d-flex align-center" style="width: 100%" @click="openFolder(folder)">
                  <v-list-item-icon>
                    <v-icon color="amber darken-2">mdi-folder</v-icon>
                  </v-list-item-icon>
                  
                  <v-list-item-content>
                    <v-list-item-title>{{ folder.name }}</v-list-item-title>
                    <v-list-item-subtitle class="text--secondary">
                      Created {{ folder.createdAt | formatDate }} by {{ getLoggedInUser.name || 'Loading...' }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </div>

                <div class="d-flex align-center">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on: menu, attrs }">
                      <v-btn
                        icon
                        small
                        v-bind="attrs"
                        v-on="menu"
                        class="mr-1"
                      >
                        <v-icon small color="grey">mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list dense>
                      <popup
                        menu-item
                        icon="mdi-pencil"
                        btn-text="Rename"
                        :folder="folder"
                      />
                    </v-list>
                  </v-menu>
                  <v-btn
                    icon
                    small
                    @click.stop="confirmDelete(folder)"
                  >
                    <v-icon small color="grey">mdi-delete</v-icon>
                  </v-btn>
                </div>
              </v-list-item>
            </template>
          </v-list>
        </v-container>
      </template>
      
      <!-- Empty State -->
      <empty-state v-else />

      <!-- Delete Confirmation Dialog -->
      <delete-dialog
        v-model="showDeleteDialog"
        :item-name="selectedFolder ? selectedFolder.name : ''"
        item-type="Folder"
        @confirm="deleteFolder"
      />
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Popup from "../components/Layout/Popup.vue";
import EmptyState from "../components/EmptyState.vue";
import DeleteDialog from "../components/DeleteDialog.vue";

export default {
  name: "Home",
  components: {
    Popup,
    EmptyState,
    DeleteDialog
  },
  data() {
    return {
      sortDirection: "descending",
      viewType: "grid",
      isLoading: true,
      showDeleteDialog: false,
      selectedFolder: null
    };
  },
  computed: {
    ...mapGetters(['folders', 'getUserById', 'getLoggedInUser'])
  },
  methods: {
    sortBy(prop) {
      this.folders.sort((a, b) => {
        switch (this.sortDirection) {
          case "descending":
            return a[prop] < b[prop] ? 1 : -1;
          case "ascending":
            return a[prop] < b[prop] ? -1 : 1;
        }
      });
      this.sortDirection =
        this.sortDirection === "descending" ? "ascending" : "descending";
    },
    formatDate(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    openFolder(folder) {
      console.log('Opening folder:', folder.name);
    },
    confirmDelete(folder) {
      this.selectedFolder = folder;
      this.showDeleteDialog = true;
    },
    async deleteFolder() {
      try {
        if (this.selectedFolder) {
          await this.$store.dispatch('deleteFolder', this.selectedFolder.id);
          this.showDeleteDialog = false;
          this.selectedFolder = null;
        }
      } catch (error) {
        console.error('Failed to delete folder:', error);
      }
    }
  },
  async created() {
    this.isLoading = true;
    await this.$store.dispatch('initializeStore');
    this.isLoading = false;
  }
};
</script>

<style scoped>
.border {
  border: 1px solid #030303;
}
.v-btn.txtColor {
  color: rgb(1, 167, 117);
}
.overflow {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.v-card:hover, .folder-list-item:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.03) !important;
}
.folder-list-item {
  transition: background-color 0.2s ease;
}
.list-container {
  background-color: transparent !important;
}
.white {
  background-color: white !important;
}
</style>