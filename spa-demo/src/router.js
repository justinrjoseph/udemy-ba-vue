import VueRouter from 'vue-router';

import ProductList from './ProductList.vue';
import Product from './Product.vue';
import ViewProduct from './ViewProduct.vue';
import Reviews from './Reviews.vue';
import Cart from './Cart.vue';
import Profile from './Profile.vue';

import SpecialOffer from './SpecialOffer.vue';

export default new VueRouter({
  routes: [
    // { path: '/products/:id/view', redirect: { name: 'viewProduct' } },
    { path: '', components: {
      default: ProductList,
      discount: SpecialOffer
    } },
    { path: '/products/:id', name: 'product', props: true, component: Product, children: [
      { path: 'details', name: 'viewProduct', props: true, component: ViewProduct },
      { path: 'reviews', name: 'productReviews', props: true, component: Reviews }
    ] },
    { path: '/cart', component: Cart, alias: '/shopping-cart' },
    { path: '/user/profile', name: 'viewProfile', component: Profile },
    { path: '*', component: { template: '<h1>Page not found.</h1>' }}
  ],
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if ( to.hash ) {
      return {
        selector: to.hash
      };
    }

    if ( savedPosition ) {
      return savedPosition;
    }

    return { x: 0, y: 0 };
  }
});
