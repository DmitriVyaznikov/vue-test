<script>
export default {
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>

<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text" />
</template>

<style lang="css" scoped>
.input {
  width: 100%;
  border: 1px solid #b65454;
  padding: 10px 15px;
  margin-top: 10px;
}
</style>
