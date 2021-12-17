<template>
  <div class="home">
    <v-container fluid class="pa-4">
      <v-row class="py-2">
        <popup/>
      </v-row>
      <v-row class="px-2 pt-2">
        <p class="text-h5">Folders</p>
      </v-row>
      <v-row class="px-2">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
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
          </template>
          <span>
            Sort folders in {{ sortDirection }} order by folder name
          </span>
        </v-tooltip>
      </v-row>
    </v-container>
    <v-container fluid class="px-1">
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
                <v-icon left>folder</v-icon>
                {{ folder.name }}
              </v-card>
            </template>
            <span> {{ folder.name }} </span>
          </v-tooltip>
        </v-col>
      </v-row>
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
  /*   width: 50rem */
}
.v-card:hover {
  cursor: pointer;
  /* background: #FAFAFA; */
}
</style>