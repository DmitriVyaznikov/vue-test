<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <MyInput v-model="searchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <MyButton class="createPost" @click="showDialog"> Создать пост </MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions" />
    </div>
    <MyDialogue v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </MyDialogue>
    <post-list
      @remove="removePost"
      :posts="sortedAndSearchedPosts"
      v-if="!isPostListLoading"
    />
    <div v-else>Идёт загрузка...</div>
    <div ref="observer" class="observer"></div>
    <!-- <div class="page__wrapper">
      <div
        v-for="pageNumber of totalPages"
        :key="pageNumber"
        class="page"
        :class="{
          'current-page': page === pageNumber,
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
  </div>
</template>

<script>
import PostList from './components/PostList.vue';
import PostForm from './components/PostForm.vue';
import MyDialogue from './components/UI/MyDialogue.vue';
import MyButton from './components/UI/MyButton.vue';
import axios from 'axios';
import MySelect from './components/UI/MySelect.vue';
import MyInput from './components/UI/MyInput.vue';
export default {
  components: {
    PostList,
    PostForm,
    MyDialogue,
    MyButton,
    MySelect,
    MyInput,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostListLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' },
      ],
    };
  },
  methods: {
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    //   this.fetchPosts();
    // },
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((el) => el.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostListLoading = true;

        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          },
        );
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit,
        );
        this.posts = response.data;
      } catch (error) {
        alert(error.message);
      } finally {
        this.isPostListLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        // this.isPostListLoading = true;

        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          },
        );
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit,
        );
        this.posts = [...this.posts, ...response.data];
      } catch (error) {
        alert(error.message);
      }
      // finally {
      //   this.isPostListLoading = false;
      // }
    },
  },
  mounted() {
    this.fetchPosts();
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]),
      );
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    },
  },
  // watch: {
  //   selectedSort(newValue) {
  //     this.posts = [
  //       ...this.posts.sort((post1, post2) => {
  //         return post1[newValue]?.localeCompare(post2[newValue]);
  //       }),
  //     ];
  //   },
  // },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid #000;
  padding: 10px;
}

.current-page {
  border: 4px solid #924242;
}
</style>
