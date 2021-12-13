<template>
  <div class="text-center">
    <v-dialog
      width="370"
      :value="value" 
      @input="$emit('input')"
    >

      <v-card class="secondary">
        <v-card-title class="text-h5">
          New Folder
        </v-card-title>

        <v-card-text class="mt-1 mb-0">
          <v-text-field 
          outlined
          single-line
          color="black"
          placeholder="Folder Name"
          v-model="folderName"
          @focus="$event.target.select()"
          >
          </v-text-field>
        </v-card-text>

        <v-card-actions class="mt-0 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            text
            @click.native="$emit('input')"
            color="red"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            @click="createFolder"
            @click.native="$emit('input')"
            color="blue"
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
        folderName: 'Untitled Folder'
      }
    },
    props: ["value"],
    methods:{
      createFolder(){
        console.log(this.folderName);
        this.$store.dispatch("addNewFolder", {
          folderName : this.folderName
        });
        this.folderName = 'Untitled Folder';
      }
    },
  }
</script>