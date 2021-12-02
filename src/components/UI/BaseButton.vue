<template>
  <v-btn
    :text="flat"
    :color="flat ? btnColorName : `${btnColorName} white--text`"
    :outlined="outlined"
    :fab="fab"
    :size="size"
  >
    <slot></slot>
  </v-btn>
</template>
<script>
export default {
  props: {
    flat: {
      default: false,
      type: Boolean,
    },
    outlined: {
      default: false,
    },
    fab: {
      default: false,
    },
    size: {
      default: "medium",
    },
  },
  data() {
    return {
      btnColorName: "light-blue darken-4",
    };
  },
};
</script>
