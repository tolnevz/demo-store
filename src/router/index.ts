import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('../pages/HomePage.vue'),
    },
    {
      name: 'ProductItem',
      path: '/products/:slug',
      component: () => import('../pages/ProductItem.vue'),
    },
    {
      path: '/shopping-cart',
      name: 'ShoppingCart',
      component: () => import('../pages/ShoppingCart.vue'),
    },
  ],
});

export default router;
