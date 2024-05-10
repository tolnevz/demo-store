<script setup lang="ts">
  import CategoriesList from '@/views/CategoryList.vue';
  import ProductList from '@/views/ProductList.vue';
  import { ref } from 'vue';

  const selectedCategories = ref<number[]>([]);

  const onChangedSelectedCategories = (ids: number[]) => {
    selectedCategories.value = ids;
  };
</script>

<template>
  <div class="container mt-4 mb-5">
    <div class="row">
      <div class="col-12 col-lg-3">
        <div class="overflow-auto spec-height">
          <CategoriesList @changed-selected-categories="onChangedSelectedCategories"></CategoriesList>
        </div>
      </div>
      <div class="col-12 col-lg-9">
        <ProductList :selected-categories="selectedCategories"></ProductList>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .spec-height {
    height: calc(100vh - 110px);

    @media (max-width: 992px) {
      height: auto;
    }
  }
</style>
