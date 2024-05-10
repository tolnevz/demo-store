import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router';

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

// router.beforeEach((to, from, next) => {
//   if (!hasQueryParams(to) && hasQueryParams(from) && to.name) {
//     next({ name: to.name, query: from.query });
//   } else {
//     next();
//   }
// });

// function hasQueryParams(route: RouteLocationNormalized) {
//   return !!Object.keys(route.query).length;
// }

export default router;
