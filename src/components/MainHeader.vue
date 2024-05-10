<script setup lang="ts">
  import useStore from '@/stores/store';
  import { storeToRefs } from 'pinia';
  import { onMounted } from 'vue';

  const store = useStore();
  const { getCartProductsCount } = storeToRefs(store);

  onMounted(() => {
    store.getCartFromLocalStorage();
  });
</script>
<template>
  <nav class="navbar bg-dark border-bottom border-body sticky-top navbar-expand-lg" data-bs-theme="dark">
    <div class="container">
      <RouterLink class="navbar-brand d-block d-lg-none" :to="{ name: 'HomePage' }">Магазин</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <RouterLink class="navbar-brand d-none d-lg-block" :to="{ name: 'HomePage' }">Магазин</RouterLink>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex w-100 justify-content-end">
          <li class="nav-item">
            <RouterLink class="nav-link text-center text-md-start" :to="{ name: 'HomePage' }" activeClass="active">Главная</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link position-relative text-center text-md-start" :to="{ name: 'ShoppingCart' }" activeClass="active">
              Корзина
              <span v-if="getCartProductsCount" class="position-absolute start-100 translate-middle badge rounded-pill bg-primary cart-badge">
                {{ getCartProductsCount }}
              </span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
  .cart-badge {
    top: 7px;
    left: 105% !important;
    font-weight: 400;
    font-size: 0.7em;

    @media (max-width: 992px) {
      left: 81px !important;
    }
    @media (max-width: 768px) {
      left: 301px !important;
    }
    @media (max-width: 576px) {
      left: 61% !important;
    }
  }
</style>
