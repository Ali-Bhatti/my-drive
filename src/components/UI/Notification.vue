<template>
    <div class="notification-container">
        <v-snackbar v-model="show" :color="color" :timeout="timeout" top right elevation="6">
            {{ message }}
            <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="show = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Notification',
    data() {
        return {
            show: false,
            timeout: 5000
        };
    },
    computed: {
        ...mapState({
            error: state => state.error,
            success: state => state.success
        }),
        message() {
            return this.error || this.success || '';
        },
        color() {
            if (this.error) return 'error';
            if (this.success) return 'success';
            return '';
        }
    },
    watch: {
        error(val) {
            if (val) this.show = true;
        },
        success(val) {
            if (val) this.show = true;
        },
        show(val) {
            if (!val) {
                // Clear messages when snackbar is dismissed
                if (this.error) this.$store.commit('setError', null);
                if (this.success) this.$store.commit('setSuccess', null);
            }
        }
    }
};
</script>