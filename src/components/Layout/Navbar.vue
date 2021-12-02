<template>
    <nav>
        <v-toolbar :app="app" color="teal accent-3">
            <!-- <span class="text-h5
                        text-md-h4
                        text-lg-h4
                        text-xl-h4
                        font-weight-bold" >
            Welcome {{ name }} </span> -->
            <v-toolbar-title class="text-uppercase">
                <span class="font-weight-light">Welcome </span>
                <span class="font-weight-bold">{{ name }}</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn outlined>
                Logout
                <v-icon right>logout</v-icon>
            </v-btn>
        </v-toolbar>
    </nav>
</template>
<script>
//import BaseButton from '../UI/BaseButton.vue'
export default {
    props: {
        name: String,
        app: {
            default: true
        }
    },
    // computed: {
    //     size () {
    //         const size = {xs:'x-small',sm:'small',lg:'large',xl:'x-large'}[this.$vuetify.breakpoint.name];
    //         return size ? { [size]: true } : {}
    //     }
    // },
    methods:{
        smallScreen() {
            const size = {xs:'x-small',sm:'small',lg:'large',xl:'x-large'}[this.$vuetify.breakpoint.name];
            return size === "x-small" || size === 'small' ? true : false;
        }
    }
}
</script>