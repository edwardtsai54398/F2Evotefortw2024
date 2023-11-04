import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/candidate/:id',
    name: 'Candidate',
    component: () => import('@/views/Candidate.vue'),
    props: true // 將路由參數傳遞給 props
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