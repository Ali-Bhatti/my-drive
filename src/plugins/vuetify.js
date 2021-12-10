import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

Vue.use(Vuetify);

export default new Vuetify({
    // for using "Material Design fonts"
    icons: {
        iconfont: 'md' || 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
    theme: {
        themes: {
          light: {
            primary: '#1DE9B6',
            secondary: '#E0F2F1',
            accent: '#01A775',
            // error: '#b71c1c',
          },
        },
      },
});
