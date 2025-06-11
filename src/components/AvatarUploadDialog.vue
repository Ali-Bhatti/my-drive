<template>
    <v-dialog v-model="show" width="320">
        <v-card>
            <v-card-title class="text-h5">Profile Picture</v-card-title>
            <v-card-text>
                <div class="text-center mb-4">
                    <v-avatar size="120" color="blue" v-if="!displayedAvatar">
                        <span class="white--text text-h4">{{ avatarName }}</span>
                    </v-avatar>
                    <v-avatar size="120" v-else>
                        <v-img :src="displayedAvatar" alt="Avatar"></v-img>
                    </v-avatar>
                </div>

                <input ref="fileInput" type="file" accept="image/*" style="display: none" @change="onFileSelected">

                <div class="d-flex justify-center mt-4">
                    <v-btn color="primary" class="mx-2" @click="$refs.fileInput.click()">
                        <v-icon left>mdi-camera</v-icon>
                        {{ displayedAvatar ? 'Change' : 'Upload' }}
                    </v-btn>

                    <v-btn color="error" class="mx-2" @click="handleRemove" v-if="displayedAvatar">
                        <v-icon left>mdi-delete</v-icon>
                        Remove
                    </v-btn>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="closeDialog">
                    Cancel
                </v-btn>
                <v-btn color="primary" text @click="saveChanges" :disabled="!hasChanges">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'AvatarUploadDialog',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        currentAvatar: {
            type: String,
            default: null
        },
        avatarName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            previewImage: null,
            selectedFile: null,
            localAvatar: null
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
        },
        hasChanges() {
            return this.previewImage !== null ||
                this.localAvatar !== this.currentAvatar;
        },
        displayedAvatar() {
            return this.previewImage || this.localAvatar;
        }
    },
    methods: {
        onFileSelected(event) {
            const file = event.target.files[0];
            if (!file) return;

            // Check file type
            if (!file.type.startsWith('image/')) {
                this.$store.dispatch('setError', 'Please upload an image file');
                return;
            }

            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                this.$store.dispatch('setError', 'Image size should be less than 5MB');
                return;
            }

            this.selectedFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                this.previewImage = e.target.result;
                this.localAvatar = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        handleRemove() {
            this.previewImage = null;
            this.selectedFile = null;
            this.localAvatar = null;
        },
        closeDialog() {
            this.previewImage = null;
            this.selectedFile = null;
            this.localAvatar = this.currentAvatar;
            this.show = false;
        },
        async saveChanges() {
            this.$emit('save', this.displayedAvatar);
            this.closeDialog();
        }
    },
    watch: {
        value(newVal) {
            if (newVal) {
                this.localAvatar = this.currentAvatar;
            } else {
                this.previewImage = null;
                this.selectedFile = null;
                this.localAvatar = this.currentAvatar;
            }
        }
    }
}
</script>

<style scoped>
.v-card__text {
    padding-top: 20px;
}
</style>