<template>
  <base-card>
    <v-card width="400" color="primary" rounded="xl">
      <v-card-title class="justify-center">
        <h2>Login</h2>
      </v-card-title>
      <v-card-text class="text-center">
        <v-form ref="form" @submit.prevent="isAuth" v-model="isFormValid">
          <v-text-field
            outlined
            color="black"
            class="mb-0"
            type="text"
            placeholder="Enter Your Email"
            name="email"
            background-color="bg_color"
            prepend-inner-icon="mail"
            v-model="user.email"
            :rules="[...emailRules]"
            required
          />
          <v-text-field
            outlined
            class="mb-0"
            color="black"
            type="password"
            placeholder="Enter Password"
            name="password"
            background-color="bg_color"
            prepend-inner-icon="lock"
            autocomplete="off"
            v-model="user.password"
            :rules="[...passwordRules]"
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="mt-0 pt-0 justify-center">
        <v-btn
          width="70%"
          @click="isAuth"
          class="rounded-xl black--text"
          color="secondary"
          >Login</v-btn
        >
      </v-card-actions>
      <div class="text-center pa-2">
        <router-link to="/signup" style="color: black"
          >Create a new account</router-link
        >
      </div>
    </v-card>
  </base-card>
</template>
<script>
import BaseCard from "../components/UI/BasCard.vue";
export default {
  components: { BaseCard },
  data() {
    return {
      isFormValid: false,
      user: {
        email: "",
        password: "",
      },
      emailRules: [
        (v) => !!v.trim() || "Email is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [(v) => !!v.trim() || "Password is required"],
    };
  },
  methods: {
    isAuth() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("isAuth", true);
        this.$router.push("/home");
      }
    },
  },
};
</script>