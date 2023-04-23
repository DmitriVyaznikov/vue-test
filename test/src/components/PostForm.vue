<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <!-- v-bind:value="post.title"
      @input="post.title = $event.target.value" -->
    <!-- <my-input v-model="post.title" type="text" placeholder="название" /> -->
    <!-- v-bind:value="post.body"
      @input="post.body = $event.target.value" -->
    <!-- <my-input v-model="post.body" type="text" placeholder="описание" /> -->
    <MyInput v-model="post.title" type="text" placeholder="название" />
    <MyInput v-model="post.body" type="text" placeholder="описание" />

    <MyButton class="create" @click="createPost">Создать пост</MyButton>
  </form>
</template>

<script>
import { nanoid } from 'nanoid';
import MyButton from './UI/MyButton.vue';
import MyInput from './UI/MyInput.vue';
export default {
  components: { MyButton, MyInput },
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = nanoid();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body: '',
      };
    },
  },
  // watch: {
  //   post: {
  //     handler(newVal) {
  //       console.log('newVal: ', newVal);
  //     },
  //     deep: true,
  //   },
  // },
};
</script>

<style>
form {
  width: 70%;
  display: flex;
  flex-direction: column;
}
</style>
