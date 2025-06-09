<template>
  <v-container fluid fill-height class="signup-container">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4" lg="4">
        <v-card class="elevation-12 rounded-lg">
          <v-card-text>
            <div class="text-center mb-6">
              <Logo :size="60" class="mb-4" />
              <h1 class="text-h4 font-weight-light mb-2">Create Account</h1>
              <p class="text-subtitle-1 text-medium-emphasis">Join My Drive today</p>
            </div>

            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Full Name"
                required
                outlined
                dense
                prepend-inner-icon="mdi-account"
                class="mb-2"
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                required
                outlined
                dense
                prepend-inner-icon="mdi-email"
                class="mb-2"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                required
                outlined
                dense
                prepend-inner-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                class="mb-2"
              ></v-text-field>

              <v-text-field
                v-model="confirmPassword"
                :rules="confirmPasswordRules"
                label="Confirm Password"
                required
                outlined
                dense
                prepend-inner-icon="mdi-lock-check"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showConfirmPassword = !showConfirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="mb-2"
              ></v-text-field>

              <div v-if="error" class="error--text text-center mb-4">
                {{ error }}
              </div>

              <v-btn
                color="primary"
                class="mt-4"
                block
                large
                :loading="loading"
                @click="validate"
              >
                Sign Up
              </v-btn>

              <div class="mt-6 text-center">
                <span class="text-medium-emphasis">Already have an account?</span>
                <router-link to="/login" class="ml-2 primary--text text-decoration-none">
                  Sign In
                </router-link>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Logo from '../components/Logo.vue';
import { db } from '../db';

export default {
  name: "Signup",
  components: {
    Logo
  },
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 50 || "Name must be less than 50 characters",
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length >= 6 || "Password must be at least 6 characters",
    ],
    confirmPassword: "",
    error: null,
    loading: false,
    showPassword: false,
    showConfirmPassword: false
  }),
  computed: {
    confirmPasswordRules() {
      return [
        v => !!v || "Please confirm your password",
        v => v === this.password || "Passwords do not match"
      ];
    }
  },
  methods: {
    async checkEmailExists(email) {
      try {
        const existingUser = await db.getUserByEmail(email);
        return existingUser !== undefined;
      } catch (error) {
        console.error('Error checking email:', error);
        return false;
      }
    },
    async validate() {
      this.error = null;
      const isValid = await this.$refs.form.validate();
      
      if (!isValid) {
        this.error = "Please fix the validation errors above";
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match";
        return;
      }

      // Check if email already exists
      this.loading = true;
      try {
        const emailExists = await this.checkEmailExists(this.email);
        if (emailExists) {
          this.error = "This email is already registered. Please use a different email or sign in.";
          this.loading = false;
          return;
        }

        const success = await this.$store.dispatch('registerNewUser', {
          name: this.name,
          email: this.email,
          password: this.password
        });

        if (success) {
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Registration error:', error);
        this.error = "Registration failed. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    // Clear error when email changes
    email() {
      if (this.error && this.error.includes('email is already registered')) {
        this.error = null;
      }
    }
  }
};
</script>

<style scoped>
.signup-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.v-card {
  padding: 24px !important;
}
</style> 