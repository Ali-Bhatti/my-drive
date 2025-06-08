<template>
  <div class="auth-wrapper">
    <v-container fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4" lg="4">
          <v-card class="elevation-12 rounded-lg">
            <v-card-title class="text-h5 justify-center py-4">
              Login
            </v-card-title>
            <v-card-text>
              <v-alert
                v-if="loginError"
                type="error"
                dense
                text
                class="mb-4"
              >
                {{ loginError }}
              </v-alert>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model.trim="email"
                  :error-messages="emailErrors"
                  label="Email"
                  prepend-inner-icon="mdi-email"
                  type="email"
                  outlined
                  dense
                  class="rounded-lg"
                  @input="validateEmail"
                  @blur="validateEmail"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  prepend-inner-icon="mdi-lock"
                  :type="showPassword ? 'text' : 'password'"
                  outlined
                  dense
                  class="rounded-lg"
                  required
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="px-4 pb-4">
              <v-btn
                block
                color="rgb(1, 167, 117)"
                class="white--text"
                height="45"
                :disabled="!isFormValid"
                :loading="loading"
                @click="handleLogin"
              >
                Login
              </v-btn>
            </v-card-actions>
            <v-card-text class="text-center pt-0">
              Don't have an account?
              <router-link to="/signup" class="text-decoration-none" style="color: rgb(1, 167, 117)">
                Sign Up
              </router-link>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      valid: false,
      loading: false,
      email: '',
      emailErrors: [],
      password: '',
      showPassword: false,
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters'
      ]
    }
  },
  computed: {
    loginError() {
      return this.$store.getters.loginError;
    },
    isFormValid() {
      return this.email && !this.emailErrors.length && this.password && this.password.length >= 6;
    }
  },
  methods: {
    validateEmail() {
      this.emailErrors = [];
      if (!this.email) {
        this.emailErrors.push('Email is required');
      } else if (!/.+@.+\..+/.test(this.email)) {
        this.emailErrors.push('Email must be valid');
      } else if (!this.$store.state.users.some(user => user.email === this.email)) {
        this.emailErrors.push('Email not registered');
      }
    },
    async handleLogin() {
      this.validateEmail();
      if (this.isFormValid) {
        this.loading = true;
        try {
          const success = await this.$store.dispatch('login', {
            email: this.email,
            password: this.password
          });

          if (success) {
            localStorage.setItem('isAuthenticated', 'true');
            this.$router.push('/home');
          }
        } finally {
          this.loading = false;
        }
      }
    }
  },
  watch: {
    email() {
      if (this.emailErrors.length) {
        this.validateEmail();
      }
    }
  }
}
</script>

<style scoped>
.auth-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: #f5f5f5;
}

.v-btn:not(.v-btn--outlined).primary {
  color: rgb(1, 167, 117);
}
</style> 