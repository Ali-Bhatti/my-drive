<template>
  <base-card>
    <v-card width="400" color="primary" rounded="xl">
      <v-card-title class="justify-center">
        <h2>Signup</h2>
      </v-card-title>
      <v-card-text class="text-center">
        <v-form ref="form" @submit.prevent="createUser" v-model="isFormValid">
          <v-text-field
            outlined
            color="black"
            class="mb-0"
            type="text"
            placeholder="First Name"
            name="firstname"
            background-color="bg_color"
            v-model="user.firstName"
            :rules="[
              (v) => !!v.trim() || 'First Name is required',
              ...nameRules,
            ]"
            required
          />
          <v-text-field
            outlined
            color="black"
            class="mb-0"
            type="text"
            placeholder="Last Name"
            name="lastname"
            background-color="bg_color"
            v-model="user.lastName"
            :rules="[
              (v) => !!v.trim() || 'Last Name is required',
              ...nameRules,
            ]"
            required
          />
          <v-text-field
            outlined
            color="black"
            class="mb-0"
            type="text"
            placeholder="Email"
            name="email"
            background-color="bg_color"
            v-model="user.email"
            :rules="emailRules"
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
            autocomplete="off"
            v-model="user.password"
            :rules="passwordRules"
            required
          />
          <v-text-field
            outlined
            class="mb-0"
            color="black"
            type="password"
            placeholder="Re-Enter Password"
            name="re_password"
            background-color="bg_color"
            autocomplete="off"
            v-model="rePassword"
            :rules="[...passwordRules, matchPassword]"
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="mt-0 pt-0 justify-center">
        <v-btn
          width="70%"
          class="rounded-xl black--text"
          color="secondary"
          @click="createUser"
          :disabled="!isFormValid"
          >Signup</v-btn
        >
      </v-card-actions>
      <div class="text-center pa-2">
        <router-link to="/login" style="color: black"
          >Already have an account</router-link
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
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      rePassword: "",
      isFormValid: false,
      nameRules: [
        (v) =>
          v.trim().length <= 100 || "Name must be less than 100 characters",
      ],
      passwordRules: [
        (v) => !!v.trim() || "Password is required",
        (v) =>
          v.trim().length >= 8 || "Password must be greater then 8 characters",
      ],
      emailRules: [
        (v) => !!v.trim() || "Email is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    matchPassword() {
      if (this.user.password.trim() === this.rePassword.trim()) return true;
      return "Password doesn't match";
    },
    createUser() {
      if (this.$refs.form.validate()) console.log(this.user);
    },
  },
};
</script>