<script>
export default {
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>

<template>
  <select :value="modelValue" @change="changeOption">
    <option disabled value="">Сортировать</option>
    <option :value="option.value" v-for="option of options" :key="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<style lang="css" scoped>
/* .app__btns {
  margin: 15px 0;
} */
</style>
