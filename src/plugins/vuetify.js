import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

Vue.use(Vuetify);

export default new Vuetify({
    // for using "Material Design fonts"
    icons: {
        iconfont: 'md', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
    // theme: {
    //     themes: {
    //       light: {
    //         primary: '#40e6cf',
    //         secondary: '#b0bec5',
    //         accent: '#8c9eff',
    //         error: '#b71c1c',
    //       },
    //     },
    //   },
});
