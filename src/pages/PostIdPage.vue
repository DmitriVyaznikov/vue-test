<template>
  <div class="generalCard">
    <h1>Это страница товара {{ $route.params.id }}</h1>
    <div v-if="post" class="itemCard">
      <div><strong>Название</strong>: {{ post.title }}</div>
      <div><strong>Описание</strong>: {{ post.body }}</div>
      <div><strong>Год</strong>: {{ post.year }}</div>
      <div><strong>Цена</strong>: {{ post.price }} $</div>
    </div>
  </div>
</template>

<script>
import { usePostStore } from '../store/index';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const postStore = usePostStore();
    const router = useRouter();

    const post = postStore.posts.find(
      (el) => Number(el.id) === Number(router.currentRoute.value.params.id),
    );

    return {
      post,
    };
  },
};
</script>

<style scoped>
.itemCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 70%;
}
.generalCard {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
