<script setup lang="ts">
  import type { Product, ServerError } from '@/models';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import useStore from '@/stores/store';
  import ErrorMessage from '@/components/ErrorMessage.vue';

  const route = useRoute();
  const { getProduct, addProductToCart } = useStore();
  const product = ref<Product | null>();
  const productId = ref<string>('');

  const errorData = ref<ServerError>();

  onMounted(async () => {
    const routeArr = String(route.params.slug).split('-id-');
    productId.value = routeArr[routeArr.length - 1];
    if (productId.value) {
      await getProductData();
    }
  });

  const getProductData = async () => {
    try {
      product.value = await getProduct(productId.value);
    } catch (error: any) {
      errorData.value = error;
    }
  };

  const onAddProductToCartClick = () => {
    if (product.value) {
      addProductToCart(product.value);
    }
  };
</script>
<template>
  <div class="container mt-4 mb-5">
    <div class="row">
      <template v-if="errorData">
        <ErrorMessage :error-data="errorData"></ErrorMessage>
      </template>
      <template v-else>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><RouterLink :to="{ name: 'HomePage', query: { ...route.query } }">Main</RouterLink></li>
            <li class="breadcrumb-item active" aria-current="page">{{ product?.name }}</li>
          </ol>
        </nav>

        <div class="row">
          <div class="col-12 col-lg-7">
            <img :src="product?.imageUrl" class="card-img-top" :alt="product?.name" />
          </div>
          <div class="col-12 col-lg-5">
            <h1 class="fs-3 fw-light mt-4 mt-md-0">{{ product?.name }}</h1>
            <p class="fs-5 mt-3">{{ product?.defaultDisplayedPriceFormatted }}</p>
            <p class="my-4" v-html="product?.description"></p>
            <button title="Add to Cart" class="btn btn-primary mt-3" @click="onAddProductToCartClick"> Add to Cart </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .breadcrumb-item a {
    color: var(--bs-dark);
  }
</style>
