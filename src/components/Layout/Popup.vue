<template>
  <div class="text-center">
    <v-dialog
      width="370"
      v-model="dialog"
    >
      <template v-slot:activator="{ on, attrs}">
        <v-btn
          rounded
          x-large
          class="text-capitalize black--text"
          color="secondary"
          @click="dialog = true"
          v-on="on"
          v-bind="attrs"
        >
          <v-icon left large class="mr-4">create_new_folder</v-icon>
          New Folder
        </v-btn>
      </template>
      <v-card class="secondary">
        <v-card-title class="text-h5">
          New Folder
        </v-card-title>

        <v-form ref="form"  @submit.prevent="createFolder" v-model="isFormValid">

          <v-card-text class="mt-1 mb-0">
            <v-text-field 
            outlined
            single-line
            color="black"
            placeholder="Folder Name"
            v-model="folderName"
            @focus="$event.target.select()"
            :rules="[...nameRules, folderExists]"
            required
            >
            </v-text-field>
          </v-card-text>

          <v-card-actions class="mt-0 pt-0">
            <v-spacer></v-spacer>
            <v-btn
              text
              color="red"
              @click="cancelDialog()"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              @click="createFolder"
              color="blue"
              :disabled="!isFormValid"
            >
              Create
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        ufCount : 1, // uf -> New Folder // will be store in DB
        uf: 'New Folder',  // will be store in DB
        isFormValid: false,
        dialog: false,
        folders: [],
        folderName: 'New Folder',
        nameRules: [
          v => !!v.trim() || 'Folder Name is required',
          // v => /^[^<>"/:`%|]*$/.test(v) || 'Special Characters are not allowed',
          v => v.trim().length <= 100 || 'Name must be less than 100 characters',
        ],
      }
    },
    props: ["value"],
    methods:{
      createFolder(){
        console.log(this.folderName);
        this.dialog = false;
        let res = this.$refs.form.validate();
        console.log("RESULT OF validate", res);
        this.$store.dispatch("addNewFolder", {
          folderName : this.folderName
        });
        this.newFolderExists();
      },
      newFolderExists(){
        // Handling New folder's count
        if(this.ufCount === 1){
          if(this.folderName === "New Folder") this.uf = `New Folder(${++this.ufCount})`;
        } else {
          if(this.folderName === `New Folder(${this.ufCount})`) this.uf = `New Folder(${++this.ufCount})`;
        }
        this.folderName = this.uf;
      },
      cancelDialog(){ 
        this.dialog = false;
        this.folderName = this.uf;
      },
      folderExists(name){
        if (this.folders.map(ele => ele.name.toLowerCase()).includes(name.trim().toLowerCase()))
          return "Folder already exists";
        else
          return true;
      }
    },
    beforeMount(){
      this.folders = this.$store.getters.folders;
    }
  }
</script>