<template>
  <div class="home">
    <navbar name="Umar"></navbar>
    <h1 class="display-1">This is Home Page</h1>
  </div>
</template>

<script>
import Navbar from "../components/Layout/Navbar.vue";
export default {
  name: "Home",
  components: {
    Navbar,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
/* div{
    padding: 5px;
  } */
</style>