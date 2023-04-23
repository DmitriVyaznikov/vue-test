<template>
  <div class="navbar">
    <div @click="$router.push('/')">Главная</div>
    <div class="nav__btns">
      <MyButton @click="$router.push('/posts')">Товары</MyButton>
      <MyButton class="about" @click="$router.push('/about')"
        >О приложении</MyButton
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav-bar',
};
</script>

<style scoped>
.navbar {
  height: 50px;
  align-items: center;
  padding: 0 15px;
  background-color: bisque;
  box-shadow: 2px 2px 4px gray;
  display: flex;
}

.nav__btns {
  margin-left: auto;
}

.about {
  margin-left: 15px;
}
</style>
