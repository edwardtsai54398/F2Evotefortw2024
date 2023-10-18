import { createRouter, createWebHashHistory } from 'vue-router';
// import Home from '@/components/HelloWorld.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/cnadidate',
    name: 'Candidate',
    component: () => import('@/views/Candidate.vue'),
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;