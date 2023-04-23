import MainPage from '../pages/MainPage.vue';
import PostPage from '@/pages/PostPage.vue';
import PostIdPage from '@/pages/PostIdPage.vue';
import About from '@/pages/About.vue';
import GraphicItem from '@/pages/GraphicItem.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/posts',
    component: PostPage,
    meta: { state: 'postState' },
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/posts/:id',
    component: PostIdPage,
  },
  {
    path: '/graphic',
    component: GraphicItem,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
