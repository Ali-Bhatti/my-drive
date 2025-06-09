<template>
  <div class="text-center">
    <v-dialog
      width="370"
      v-model="dialog"
    >
      <template v-slot:activator="{ on, attrs}">
        <v-btn
          rounded
          :x-large="isXLarge"
          :large="!isXLarge"
          class="text-capitalize black--text"
          :color="isPrimary ? 'primary' : 'secondary'"
          @click="dialog = true"
          v-on="on"
          v-bind="attrs"
        >
          <v-icon left :large="isXLarge" class="mr-4">{{ icon }}</v-icon>
          {{ btnText }}
        </v-btn>
      </template>
      <v-card class='secondary'>
        <v-card-title class="text-h5">
          New Folder
        </v-card-title>

        <v-form ref="form" v-model="isFormValid">

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
        isFormValid: false,
        dialog: false,
        folders: [],
        folderName: 'Untitled Folder',
        nameRules: [
          v => !!v || 'Folder Name is required',
          // v => /^[^<>"/:`%|]*$/.test(v) || 'Special Characters are not allowed',
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
        default: 'create_new_folder'
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
      }
    },
    methods:{
      async createFolder(){
        console.log(this.folderName);
        this.dialog = false;
        let res = this.$refs.form.validate();
        console.log("RESULT OF validate", res);
        await this.$store.dispatch("addNewFolder", {
          folderName : this.folderName
        });
        this.folderName = 'Untitled Folder';
      },
      cancelDialog(){
        this.dialog = false;
        this.folderName = 'Untitled Folder'
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