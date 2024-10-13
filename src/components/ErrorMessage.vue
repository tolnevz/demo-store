<script setup lang="ts">
  import type { ServerError } from '@/models';
  const props = defineProps<{
    errorData: ServerError;
  }>();
</script>
<template>
  <div class="alert alert-danger" role="alert">
    <h4 class="alert-heading">{{ props.errorData.errorCode ?? 'Error' }}</h4>
    <p>{{ props.errorData.errorMessage ?? 'Something went wrong...' }}</p>
    <hr />
    <p class="mb-0">Contact the administrator or send an error message to <a href="mailto:error@example.org">error@example.org</a></p>
  </div>
</template>

<style scoped></style>
