<script>
import toggleMixin from '@/mixins/toggleMixin';

export default {
  mixins: [toggleMixin],
  mounted() {},
};
</script>

<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="css" scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}
.dialog__content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 70px;
  min-width: 350px;
  padding: 20px;
}
</style>
