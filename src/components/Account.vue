<template>
    <v-container fluid class="fill-height">
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="6" lg="4">
                <v-card class="pa-4 elevation-2">
                    <v-card-title class="text-h5 justify-center">Account Settings</v-card-title>

                    <!-- Profile Picture Section -->
                    <v-card-text class="text-center">
                        <v-hover v-slot="{ hover }">
                            <div class="avatar-container mb-4">
                                <v-avatar size="120" color="primary" v-if="!avatarImage">
                                    <span class="white--text text-h4">{{ avatarName }}</span>
                                </v-avatar>
                                <v-avatar size="120" v-else>
                                    <v-img :src="avatarImage" alt="Avatar"></v-img>
                                </v-avatar>

                                <v-fade-transition>
                                    <v-overlay absolute :value="hover" class="align-center justify-center">
                                        <v-btn small icon @click="openAvatarDialog">
                                            <v-icon color="white">{{ avatarImage ? 'mdi-pencil' :
                                                'mdi-camera' }}</v-icon>
                                        </v-btn>
                                    </v-overlay>
                                </v-fade-transition>
                            </div>
                        </v-hover>

                        <avatar-upload-dialog v-model="showAvatarDialog" :current-avatar="avatarImage"
                            :avatar-name="avatarName" @save="handleAvatarSave"></avatar-upload-dialog>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>

                    <!-- Name Change Section -->
                    <v-card-text>
                        <v-form ref="nameForm" v-model="nameFormValid">
                            <v-text-field v-model="name" label="Full Name" :rules="nameRules" outlined dense
                                class="mb-4"></v-text-field>
                            <v-btn color="primary" :disabled="!nameFormValid || !nameChanged" :loading="updating"
                                @click="updateName" block>
                                Update Name
                            </v-btn>
                        </v-form>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>

                    <!-- Password Change Section -->
                    <v-card-text>
                        <v-form ref="passwordForm" v-model="passwordFormValid">
                            <v-text-field v-model="currentPassword" label="Current Password"
                                :type="showPassword ? 'text' : 'password'"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPassword = !showPassword" :rules="passwordRules" outlined dense
                                class="mb-2"></v-text-field>

                            <v-text-field v-model="newPassword" label="New Password"
                                :type="showPassword ? 'text' : 'password'" :rules="passwordRules" outlined dense
                                class="mb-2"></v-text-field>

                            <v-text-field v-model="confirmPassword" label="Confirm New Password"
                                :type="showPassword ? 'text' : 'password'" :rules="[...passwordRules, passwordMatch]"
                                outlined dense class="mb-4"></v-text-field>

                            <v-btn color="primary" :disabled="!passwordFormValid" :loading="updating"
                                @click="updatePassword" block>
                                Change Password
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import AvatarUploadDialog from './AvatarUploadDialog.vue';

export default {
    name: 'Account',
    components: {
        AvatarUploadDialog
    },
    data() {
        return {
            updating: false,
            showAvatarDialog: false,
            avatarImage: null,
            name: '',
            nameFormValid: false,
            passwordFormValid: false,
            showPassword: false,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length >= 3 || 'Name must be at least 3 characters'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length >= 8 || 'Password must be at least 8 characters'
            ]
        };
    },
    computed: {
        ...mapGetters(['getLoggedInUser']),
        avatarName() {
            return this.name.split(" ").map((ele, i) => i < 2 ? ele[0]?.toLocaleUpperCase() : "").join('');
        },
        nameChanged() {
            return this.name !== this.getLoggedInUser?.name;
        },
        passwordMatch() {
            return () => this.newPassword === this.confirmPassword || 'Passwords do not match';
        }
    },
    methods: {
        openAvatarDialog() {
            this.showAvatarDialog = true;
        },
        async handleAvatarSave(avatarData) {
            this.updating = true;
            try {
                this.avatarImage = avatarData;
                await this.$store.dispatch('updateAvatar', avatarData);
                this.$store.dispatch('setSuccess', 'Profile picture updated successfully');
            } catch (error) {
                this.$store.dispatch('setError', 'Failed to update profile picture');
            } finally {
                this.updating = false;
            }
        },
        async updateName() {
            if (!this.$refs.nameForm.validate()) return;

            this.updating = true;
            try {
                await this.$store.dispatch('updateName', this.name);
                this.$store.dispatch('setSuccess', 'Name updated successfully');
            } catch (error) {
                this.$store.dispatch('setError', 'Failed to update name');
            } finally {
                this.updating = false;
            }
        },
        async updatePassword() {
            if (!this.$refs.passwordForm.validate()) return;

            this.updating = true;
            try {
                await this.$store.dispatch('updatePassword', {
                    currentPassword: this.currentPassword,
                    newPassword: this.newPassword
                });
                this.$store.dispatch('setSuccess', 'Password updated successfully');
                this.currentPassword = '';
                this.newPassword = '';
                this.confirmPassword = '';
                this.$refs.passwordForm.reset();
            } catch (error) {
                this.$store.dispatch('setError', error.message || 'Failed to update password');
            } finally {
                this.updating = false;
            }
        }
    },
    mounted() {
        console.log(this.getLoggedInUser);
        this.avatarImage = this.getLoggedInUser?.avatar || null;
        this.name = this.getLoggedInUser?.name || '';
    }
};
</script>

<style scoped>
.avatar-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.v-overlay {
    border-radius: 50%;
}

.v-form {
    max-width: 100%;
}
</style>