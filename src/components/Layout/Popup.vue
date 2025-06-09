<template>
  <div class="text-center">
    <v-dialog width="370" v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="!menuItem" rounded :x-large="isXLarge" :large="!isXLarge" class="text-capitalize black--text"
          :color="isPrimary ? 'primary' : 'secondary'" @click="dialog = true" v-on="on" v-bind="attrs">
          <v-icon left :large="isXLarge" class="mr-4">{{ icon }}</v-icon>
          {{ btnText }}
        </v-btn>
        <v-list-item v-else v-on="on" v-bind="attrs" @click="initRename">
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ btnText }}</v-list-item-title>
        </v-list-item>
      </template>

      <v-card class='secondary'>
        <v-card-title class="text-h5">
          {{ isRenaming ? 'Rename Folder' : 'New Folder' }}
        </v-card-title>

        <v-form ref="form" v-model="isFormValid">
          <v-card-text class="mt-1 mb-0">
            <v-text-field outlined single-line color="black" :placeholder="isRenaming ? 'New Name' : 'Folder Name'"
              v-model="folderName" @focus="$event.target.select()" :rules="[...nameRules, folderExists]" required>
            </v-text-field>
          </v-card-text>

          <v-card-actions class="mt-0 pt-0">
            <v-spacer></v-spacer>
            <v-btn text color="red" @click="cancelDialog()">
              Cancel
            </v-btn>
            <v-btn text @click="isRenaming ? renameFolder() : createFolder()" color="blue" :disabled="!isFormValid">
              {{ isRenaming ? 'Rename' : 'Create' }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFormValid: false,
      dialog: false,
      folders: [],
      folderName: 'Untitled Folder',
      isRenaming: false,
      nameRules: [
        v => !!v || 'Folder Name is required',
        v => v.length <= 100 || 'Name must be less than 100 characters',
      ],
    }
  },
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    icon: {
      type: String,
      default: 'mdi-folder-plus'
    },
    btnText: {
      type: String,
      default: 'New Folder'
    },
    isPrimary: {
      type: Boolean,
      default: false
    },
    isXLarge: {
      type: Boolean,
      default: true
    },
    menuItem: {
      type: Boolean,
      default: false
    },
    folder: {
      type: Object,
      default: null
    }
  },
  methods: {
    initRename() {
      if (this.folder) {
        this.isRenaming = true;
        this.folderName = this.folder.name;
        this.dialog = true;
        this.$emit('menu-action');
      }
    },
    async createFolder() {
      this.dialog = false;
      let res = this.$refs.form.validate();
      if (res) {
        await this.$store.dispatch("addNewFolder", {
          folderName: this.folderName
        });
        this.folderName = 'Untitled Folder';
      }
    },
    async renameFolder() {
      this.dialog = false;
      let res = this.$refs.form.validate();
      if (res && this.folder) {
        await this.$store.dispatch("renameFolder", {
          folderId: this.folder.id,
          newName: this.folderName
        });
        this.isRenaming = false;
        await this.$store.dispatch('initializeStore');
        this.$emit('rename-complete');
      }
    },
    cancelDialog() {
      this.dialog = false;
      this.isRenaming = false;
      this.folderName = 'Untitled Folder';
    },
    folderExists(name) {
      if (this.isRenaming && name === this.folder.name) return true;
      if (this.folders.map(ele => ele.name.toLowerCase()).includes(name.trim().toLowerCase()))
        return "Folder already exists";
      return true;
    }
  },
  beforeMount() {
    this.folders = this.$store.getters.folders;
  }
}
</script>