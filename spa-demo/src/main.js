import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

Vue.use(VueRouter);

import router from './router';

Vue.filter('currency', function(value) {
    let currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });

    return currency.format(value);
});

export const eventBus = new Vue();
export const authService = { isLoggedIn: false };

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
