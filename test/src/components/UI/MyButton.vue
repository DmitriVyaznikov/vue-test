<script>
export default {
  name: 'MyButton',
};
</script>

<template>
  <button class="btn">
    <slot> </slot>
  </button>
</template>

<style scoped>
.btn {
  padding: 10px 15px;
  background: none;
  color: #b65454;
  border: 1px solid #b65454;
}
.change {
  margin-left: 10px;
}

.create {
  margin-top: 15px;
  align-self: flex-end;
}

.createPost {
  margin: 15px 0;
}
</style>
