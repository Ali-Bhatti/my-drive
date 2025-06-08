import moment from 'moment';

export const formatDate = (value) => {
    if (!value) return '';
    return moment(value).format('MMM DD, YYYY');
};

export default {
    install(Vue) {
        Vue.filter('formatDate', formatDate);
    }
}; 