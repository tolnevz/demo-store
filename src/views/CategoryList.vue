<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import useStore from '@/stores/store';
  import type { Category, ServerError } from '@/models';
  import { useRoute, useRouter, type LocationQueryValue } from 'vue-router';
  import ErrorMessage from '@/components/ErrorMessage.vue';

  const emit = defineEmits<{
    (e: 'changedSelectedCategories', ids: number[]): void;
  }>();

  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const categories = ref<Category[] | undefined>([]);
  const selectedCategories = ref<number[]>([]);
  const errorData = ref<ServerError>();

  onMounted(async () => {
    try {
      categories.value = await store.getCategories();
    } catch (error: any) {
      errorData.value = error;
    }

    if (route.query.cat) {
      selectedCategories.value = parseCatIds(route.query.cat);
      emit('changedSelectedCategories', selectedCategories.value);
    }
  });

  watch(
    () => route.query.cat,
    cat => {
      selectedCategories.value = cat ? parseCatIds(cat) : [];
      emit('changedSelectedCategories', selectedCategories.value);
    },
  );

  const parseCatIds = (categories: string | LocationQueryValue[]): number[] => {
    return String(categories)
      .split(',')
      .map(char => parseInt(char));
  };

  const onSelectCategory = (categoryId: number) => {
    const isSelected = selectedCategories.value.some(catId => catId === categoryId);
    if (isSelected) {
      selectedCategories.value = selectedCategories.value.filter(catId => catId !== categoryId);
    } else {
      selectedCategories.value.push(categoryId);
    }

    const categoryIds = selectedCategories.value.join(',');
    router.replace({ ...route, query: { ...route.query, cat: categoryIds ? categoryIds : undefined } });
  };

  const resetCategories = () => {
    selectedCategories.value = [];
    router.replace({ ...route, query: { ...route.query, cat: undefined } });
  };
</script>

<template>
  <template v-if="errorData">
    <ErrorMessage :error-data="errorData"></ErrorMessage>
  </template>
  <template v-else>
    <h1 class="block-title">Categories</h1>
    <div class="list-group">
      <div
        class="list-group-item list-group-item-action cursor-pointer"
        v-for="category in categories"
        :key="category.id"
        :class="{ active: selectedCategories.some(catId => catId === category.id) }"
        @click="onSelectCategory(category.id)"
      >
        <div class="d-flex w-100 align-items-center">
          <div class="fs-6 mb-1">{{ category.name }}</div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <button
        title="Reset"
        type="button"
        class="btn btn-outline-primary btn-sm mt-2"
        :class="{ 'disabled btn-outline-secondary': !selectedCategories.length }"
        @click="resetCategories"
      >
        Reset
      </button>
    </div>
  </template>
</template>

<style scoped lang="scss">
  .list-group-item {
    border: 1px solid lighten(#0d6efd, 40%);
    border-radius: 5px;
    margin-bottom: 5px;
    transition: all 0.3s;

    &.active {
      background-color: lighten(#0d6efd, 40%);
      color: #000;
      cursor: pointer;
      margin-top: 0;
      border-width: 1px;
    }
  }
</style>
@/stores/s
