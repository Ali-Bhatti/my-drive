<template>
  <div class="auth-wrapper">
    <v-container fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4" lg="4">
          <v-card class="elevation-12 rounded-lg">
            <v-card-title class="text-h5 justify-center py-4">
              Create Account
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" @submit.prevent="handleSignup">
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  label="Full Name"
                  prepend-inner-icon="mdi-account"
                  outlined
                  dense
                  class="rounded-lg"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  prepend-inner-icon="mdi-email"
                  type="email"
                  outlined
                  dense
                  class="rounded-lg"
                  required
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

                <v-text-field
                  v-model="confirmPassword"
                  :rules="confirmPasswordRules"
                  label="Confirm Password"
                  prepend-inner-icon="mdi-lock-check"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  outlined
                  dense
                  class="rounded-lg"
                  required
                  :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showConfirmPassword = !showConfirmPassword"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="px-4 pb-4">
              <v-btn
                block
                color="rgb(1, 167, 117)"
                class="white--text"
                height="45"
                :disabled="!valid"
                @click="handleSignup"
              >
                Sign Up
              </v-btn>
            </v-card-actions>
            <v-card-text class="text-center pt-0">
              Already have an account?
              <router-link to="/login" class="text-decoration-none" style="color: rgb(1, 167, 117)">
                Login
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
  name: 'Signup',
  data() {
    return {
      valid: false,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length >= 2 || 'Name must be at least 2 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid',
        //v => !this.$store.getters.isEmailTaken(v) || 'Email already registered'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'Please confirm your password',
        v => v === this.password || 'Passwords must match'
      ]
    }
  },
  methods: {
    handleSignup() {
      if (this.$refs.form.validate()) {
        console.log('Form data:', {
          name: this.name,
          email: this.email,
          password: this.password
        });
        
        this.$store.dispatch('registerNewUser', {
          name: this.name,
          email: this.email,
          password: this.password
        });
        localStorage.setItem('isAuthenticated', 'true');
        this.$router.push('/home');
      }
    }
  },
  watch: {
    email(newVal) {
      console.log('Email changed:', newVal);
      // Only validate email rules
      const isValid = this.emailRules.every(rule => {
        const result = rule(newVal);
        return result === true || typeof result === 'string';
      });
      this.valid = isValid && this.name && this.password && this.confirmPassword;
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
</style> 