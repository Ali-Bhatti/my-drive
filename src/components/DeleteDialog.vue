<template>
  <v-dialog v-model="show" max-width="400">
    <v-card>
      <v-card-title class="text-h5">Delete {{ itemType }}</v-card-title>
      <v-card-text>
        Are you sure you want to delete "{{ itemName }}"? This action cannot be undone.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="onCancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="error"
          text
          @click="onConfirm"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    itemName: {
      type: String,
      default: ''
    },
    itemType: {
      type: String,
      default: 'Item'
    }
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  methods: {
    onCancel() {
      this.$emit('input', false);
    },
    onConfirm() {
      this.$emit('confirm');
    }
  }
};
</script> 