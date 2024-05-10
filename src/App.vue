<script setup lang="ts">
  import MainHeader from '@/components/MainHeader.vue';
  import PageLoader from '@/components/PageLoader.vue';
</script>

<template>
  <PageLoader />
  <MainHeader></MainHeader>
  <RouterView />
</template>
