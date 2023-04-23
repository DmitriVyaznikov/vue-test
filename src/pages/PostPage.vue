<template>
  <div>
    <h1>Страница с товарами</h1>
    <MyInput v-focus v-model="searchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <div>
        <MyButton class="createPost" @click="showDialog">
          Создать товар </MyButton
        ><MyButton class="graphicItem" @click="$router.push('/graphic')">
          График цен
        </MyButton>
      </div>
      <MySelect v-model="selectedSort" :options="sortOptions" />
    </div>
    <MyDialogue v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </MyDialogue>
    <post-list
      @remove="removePost"
      :posts="sortedAndSearchedPosts"
      v-if="!isPostListLoading.value"
    />
    <div v-else>Идёт загрузка...</div>
    <div class="observer"></div>
    <!-- v-intersection="loadMorePosts" -->
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
import PostList from '@/components/PostList.vue';
import PostForm from '@/components/PostForm.vue';
import MyDialogue from '@/components/UI/MyDialogue.vue';
import MyButton from '@/components/UI/MyButton.vue';

// import axios from 'axios';
import MySelect from '@/components/UI/MySelect.vue';
import MyInput from '@/components/UI/MyInput.vue';
import { usePostStore, useItemStore } from '../store/index';
import { onMounted, ref, computed } from 'vue';

export default {
  components: {
    PostList,
    PostForm,
    MyDialogue,
    MyButton,
    MySelect,
    MyInput,
  },
  setup() {
    const postStore = usePostStore();
    const itemStore = useItemStore();
    const dialogVisible = ref(false);
    const isPostListLoading = ref(false);

    const selectedSort = ref('');
    const searchQuery = ref('');
    const sortOptions = [
      { value: 'title', name: 'По названию' },
      { value: 'price', name: 'По цене' },
      { value: 'year', name: 'По году' },
    ];

    const loadMorePosts = () => postStore.loadMorePosts();

    onMounted(() => {
      // postStore.fetchPosts();
      itemStore.fetchItems();
      const observerElement = document.querySelector('.observer');
      if (observerElement) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              loadMorePosts();
            }
          },
          { rootMargin: '0px', threshold: 1.0 },
        );
        observer.observe(observerElement);
      }
    });

    // postStore.loadMorePosts().then(console.log);

    const createPost = (post) => {
      postStore.posts.push(post);
      dialogVisible.value = false;
    };

    const removePost = (post) => {
      postStore.posts = postStore.posts.filter((el) => el.id !== post.id);
    };

    const showDialog = () => {
      dialogVisible.value = true;
    };

    const sortedPosts = computed(() => {
      return [...postStore.posts].sort((post1, post2) => {
        if (selectedSort.value === 'year') {
          return post1.year - post2.year;
        } else if (selectedSort.value === 'price') {
          return post1.price - post2.price;
        } else {
          return post1[selectedSort.value]?.localeCompare(
            post2[selectedSort.value],
          );
        }
      });
    });

    const sortedAndSearchedPosts = computed(() => {
      return sortedPosts.value.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
      );
    });

    return {
      // loadMorePosts,
      dialogVisible,
      isPostListLoading,
      selectedSort,
      searchQuery,
      sortOptions,
      createPost,
      removePost,
      showDialog,
      sortedAndSearchedPosts,
    };
  },
};

// export default {
//   components: {
//     PostList,
//     PostForm,
//     MyDialogue,
//     MyButton,
//     MySelect,
//     MyInput,
//   },
//   data() {
//     const postStore = usePostStore();
//     console.log('data');
//     return {
//       posts: postStore.posts,
//       dialogVisible: false,
//       isPostListLoading: false,
//       selectedSort: '',
//       searchQuery: '',
//       page: 1,
//       limit: 10,
//       totalPages: 0,
//       sortOptions: [
//         { value: 'title', name: 'По названию' },
//         { value: 'body', name: 'По содержимому' },
//       ],
//     };
//   },

//   setup() {
//     const postStore = usePostStore();

//     // const loadPosts = async () => {
//     //   await postStore.fetchPosts();
//     // };

//     onMounted(() => {
//       postStore.fetchPosts();
//     });

//     return {
//       postStore,
//       // loadPosts,
//     };
//   },
//   methods: {
//     // changePage(pageNumber) {
//     //   this.page = pageNumber;
//     //   this.fetchPosts();
//     // },
//     createPost(post) {
//       this.posts.push(post);
//       this.dialogVisible = false;
//     },
//     removePost(post) {
//       this.posts = this.posts.filter((el) => el.id !== post.id);
//     },
//     showDialog() {
//       this.dialogVisible = true;
//     },
//     // async fetchPosts() {
//     //   try {
//     //     this.isPostListLoading = true;

//     //     const response = await axios.get(
//     //       'https://jsonplaceholder.typicode.com/posts',
//     //       {
//     //         params: {
//     //           _page: this.page,
//     //           _limit: this.limit,
//     //         },
//     //       },
//     //     );
//     //     this.totalPages = Math.ceil(
//     //       response.headers['x-total-count'] / this.limit,
//     //     );
//     //     const postsWithPrice = response.data.map((post) => ({
//     //       body: post.body,
//     //       title: post.title,
//     //       id: post.id,
//     //       price: Math.floor(Math.random() * 100),
//     //       year: Math.floor(Math.random() * 6 + 2018),
//     //     }));

//     //     this.posts = postsWithPrice;
//     //     console.log('postsWithPrice: ', postsWithPrice);
//     //   } catch (error) {
//     //     console.error(error.message);
//     //   } finally {
//     //     this.isPostListLoading = false;
//     //   }
//     // },

//     async loadMorePosts() {
//       try {
//         this.page += 1;
//         // this.isPostListLoading = true;

//         const response = await axios.get(
//           'https://jsonplaceholder.typicode.com/posts',
//           {
//             params: {
//               _page: this.page,
//               _limit: this.limit,
//             },
//           },
//         );
//         this.totalPages = Math.ceil(
//           response.headers['x-total-count'] / this.limit,
//         );

//         const postsWithPrice = response.data.map((post) => ({
//           body: post.body,
//           title: post.title,
//           id: post.id,
//           price: Math.floor(Math.random() * 100),
//           year: Math.floor(Math.random() * 6 + 2018),
//         }));
//         this.posts = [...this.posts, ...postsWithPrice];
//       } catch (error) {
//         alert(error.message);
//       }
//       // finally {
//       //   this.isPostListLoading = false;
//       // }
//     },
//   },
//   mounted() {
//     // this.loadPosts();
//     //   this.fetchPosts();
//     //   const options = {
//     //     rootMargin: '0px',
//     //     threshold: 1.0,
//     //   };
//     //   const callback = (entries, observer) => {
//     //     if (entries[0].isIntersecting && this.page < this.totalPages) {
//     //       this.loadMorePosts();
//     //     }
//     //   };
//     //   const observer = new IntersectionObserver(callback, options);
//     //   observer.observe(this.$refs.observer);
//   },
//   computed: {
//     sortedPosts() {
//       return [...this.posts].sort((post1, post2) =>
//         post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]),
//       );
//     },
//     sortedAndSearchedPosts() {
//       return this.sortedPosts.filter((post) =>
//         post.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
//       );
//     },
//   },
//   // watch: {
//   //   selectedSort(newValue) {
//   //     this.posts = [
//   //       ...this.posts.sort((post1, post2) => {
//   //         return post1[newValue]?.localeCompare(post2[newValue]);
//   //       }),
//   //     ];
//   //   },
//   // },
// };
</script>

<style>
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

.graphicItem {
  margin-left: 10px;
}
</style>
