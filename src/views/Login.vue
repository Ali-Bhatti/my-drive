<template>
  <v-container fluid fill-height class="login-container">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4" lg="4">
        <v-card class="elevation-12 rounded-lg">
          <v-card-text>
            <div class="text-center mb-6">
              <Logo :size="60" class="mb-4" />
              <h1 class="text-h4 font-weight-light mb-2">Welcome to <span class="font-weight-medium">My Drive</span></h1>
              <p class="text-subtitle-1 text-medium-emphasis">Sign in to continue</p>
            </div>

            <v-form ref="form" v-model="valid">
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
                Sign In
              </v-btn>

              <div class="mt-6 text-center">
                <span class="text-medium-emphasis">Don't have an account?</span>
                <router-link to="/signup" class="ml-2 primary--text text-decoration-none">
                  Sign Up
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

export default {
  name: "Login",
  components: {
    Logo
  },
  data: () => ({
    valid: true,
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
    error: null,
    loading: false,
    showPassword: false
  }),
  methods: {
    async validate() {
      this.error = null;
      const isValid = await this.$refs.form.validate();
      
      if (!isValid) {
        this.error = "Please fix the validation errors above";
        return;
      }

      this.loading = true;
      try {
        const success = await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        });

        if (success) {
          this.$router.push('/home');
        }
      } catch (error) {
        console.error('Login error:', error);
        this.error = "Login failed. Please check your credentials and try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.v-card {
  padding: 24px !important;
}
</style> 