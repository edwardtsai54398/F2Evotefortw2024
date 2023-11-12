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
  // 當用戶點擊“後退”或“前進”按鈕時，savedPosition 參數會包含之前的滾動位置，路由會自動滾動到這個位置。
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
export default router;
