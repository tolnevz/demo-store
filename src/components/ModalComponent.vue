<script setup lang="ts">
  import { defineProps, defineEmits, ref } from 'vue';

  const props = defineProps({
    isOpen: Boolean,
  });

  const emit = defineEmits(['modal-close']);

  const target = ref(null);
</script>

<template>
  <div v-if="props.isOpen" class="modal-mask">
    <div class="custom-modal-wrapper">
      <div class="custom-modal-container" ref="target">
        <div class="custom-modal-header">
          <slot name="header"> default header </slot>
        </div>
        <div class="custom-modal-body">
          <slot name="content"> default content </slot>
        </div>
        <div class="custom-modal-footer">
          <slot name="footer">
            <div>
              <button title="Продолжить покупки" type="button" class="btn btn-outline-success mt-3" @click="emit('modal-close')">Продолжить покупки</button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .custom-modal-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .custom-modal-container {
    width: 500px;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);

    @media (max-width: 992px) {
      width: 95%;
    }
  }
  .custom-modal-header,
  .custom-modal-footer {
    display: flex;
    justify-content: center;
  }
</style>
