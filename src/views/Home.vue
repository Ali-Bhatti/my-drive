<template>
  <div class="home">
    <v-container fluid class="pa-4">
      <v-row class="py-2">
        <popup/>
      </v-row>
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
          v-bind="attrs"
          v-on="on"
          @click="sortBy('name')"
        >
          <v-icon left>mdi-sort-alphabetical-{{ sortDirection }}-variant</v-icon>
          by Folder Name
        </v-btn>
      </v-row>
    </v-container>

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
                @click="openFolder(folder)"
              >
                <v-icon left color="amber darken-2">mdi-folder</v-icon>
                {{ folder.name }}
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
        <template v-for="(folder) in folders">
          <v-list-item
            :key="folder.name"
            @click="openFolder(folder)"
            class="rounded-lg mb-2 folder-list-item white"
          >
            <v-list-item-icon>
              <v-icon color="amber darken-2">mdi-folder</v-icon>
            </v-list-item-icon>
            
            <v-list-item-content>
              <v-list-item-title>{{ folder.name }}</v-list-item-title>
              <v-list-item-subtitle class="text--secondary">
                Created {{ folder.createdAt | formatDate }} by {{ folder.createdBy }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-container>
  </div>
</template>

<script>
import Popup from "../components/Layout/Popup.vue";
export default {
  name: "Home",
  components: { Popup },
  data() {
    return {
      folders: [],
      sortDirection: "descending",
      viewType: "grid",
    };
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
      // Implement folder opening logic
      console.log('Opening folder:', folder.name);
    },
    renameFolder(folder) {
      // Implement rename logic
      console.log('Rename folder:', folder.name);
    },
    deleteFolder(folder) {
      // Implement delete logic
      console.log('Delete folder:', folder.name);
    }
  },
  beforeMount(){
    this.folders = this.$store.getters.folders;
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