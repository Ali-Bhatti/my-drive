<template>
  <div class="home">
    <v-container fluid class="mx-1">
      <v-row class="my-2">
        <v-btn
          rounded
          x-large
          class="text-capitalize black--text"
          color="secondary"
        >
          <v-icon left large class="mr-4">create_new_folder</v-icon>
          New Folder
        </v-btn>
      </v-row>
      <v-row class="px-2 pt-2">
        <p class="text-h5">Folders</p>
      </v-row>
      <v-row class="px-2 pb-3">
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
          <span> Sort folders in {{ sortDirection }} order by folder name </span>
        </v-tooltip>
      </v-row>
      <v-row>
        <v-btn
          v-for="folder in folders"
          :key="folder.name"
          class="ma-2 text-wrap text-capitalize"
          large
        >
          <v-icon left>folder</v-icon>
          {{ folder.name }}
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      folders: [
        { name: "Folder 1", route: "/folder1" },
        { name: "My Family Pics", route: "/folder2" },
        { name: "My Company Projects", route: "/folder3" },
        { name: "Important Documents", route: "/folder4" },
        { name: "rents files", route: "/folder5" },
        { name: "Important notes given by clients", route: "/folder6" },
        { name: "Folder 7", route: "/folder7" },
      ],
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
};
</script>

<style scoped>
.border {
  border: 1px solid #030303;
}
.v-btn.txtColor {
  color: rgb(1, 167, 117);;
}
</style>