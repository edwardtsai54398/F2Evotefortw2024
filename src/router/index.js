import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/candidate',
    name: 'Candidate',
    component: () => import('@/views/Candidate.vue'),
  },
  {
    path: '/vote',
    name: 'Vote',
    component: () => import('@/views/Vote.vue'),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;