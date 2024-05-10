<script setup lang="ts">
  import type { ServerError } from '@/models';
  const props = defineProps<{
    errorData: ServerError;
  }>();
</script>
<template>
  <div class="alert alert-danger" role="alert">
    <h4 class="alert-heading">{{ props.errorData.errorCode ?? 'Ошибка' }}</h4>
    <p>{{ props.errorData.errorMessage ?? 'Что-то пошло не так...' }}</p>
    <hr />
    <p class="mb-0">Обратитесь к администратору или отправьте письмо с ошибкой на <a href="mailto:error@example.org">error@example.org</a></p>
  </div>
</template>

<style scoped></style>
