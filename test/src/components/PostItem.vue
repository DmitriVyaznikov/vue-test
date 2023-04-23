<template>
  <div>
    <div class="post">
      <div class="post__content">
        <div><strong>Название</strong>: {{ post.title }}</div>
        <div><strong>Описание</strong>: {{ post.body }}</div>
      </div>
      <div class="post__btns">
        <MyButton @click="$emit('remove', post)">Удалить</MyButton>
        <MyButton class="change">Изменить</MyButton>
      </div>
    </div>
  </div>
</template>

<script>
import MyButton from './UI/MyButton.vue';
export default {
  components: { MyButton },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.post {
  padding: 15px;
  margin-top: 15px;
  border: 2px solid #b65454;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post__content {
  max-width: calc(100% - 250px);
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
