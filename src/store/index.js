import { defineStore } from 'pinia';
import axios from 'axios';

export const usePostStore = defineStore({
  id: 'post',
  state: () => ({
    posts: [],
    isPostListLoading: false,
    page: 1,
    limit: 10,
    totalPages: 0,
  }),
  actions: {
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
            cache: false,
          },
        );
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit,
        );
        const postsWithPrice = response.data.map((post) => ({
          body: post.body,
          title: post.title,
          id: post.id,
          price: Math.floor(Math.random() * 100),
          year: Math.floor(Math.random() * 6 + 2018),
        }));

        this.posts = postsWithPrice;
      } catch (error) {
        console.error(error.message);
      } finally {
        this.isPostListLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
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

        const postsWithPrice = response.data.map((post) => ({
          body: post.body,
          title: post.title,
          id: post.id,
          price: Math.floor(Math.random() * 100),
          year: Math.floor(Math.random() * 6 + 2018),
        }));
        this.posts = [...this.posts, ...postsWithPrice];
      } catch (error) {
        alert(error.message);
      }
      // finally {
      //   this.isPostListLoading = false;
      // }
    },
  },
});

export const useItemStore = defineStore({
  id: 'items',
  state: () => ({
    posts: [],
  }),
  actions: {
    async fetchItems() {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
        );

        const itemsWithPrice = response.data.map((post) => ({
          body: post.body,
          title: post.title,
          id: post.id,
          price: Math.floor(Math.random() * 100),
          year: Math.floor(Math.random() * 6 + 2018),
        }));

        this.posts = itemsWithPrice;
      } catch (error) {
        console.error(error.message);
      } finally {
        this.isPostListLoading = false;
      }
    },
  },
});
