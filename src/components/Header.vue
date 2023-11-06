<template>
  <header>
    <nav>
      <router-link to="/" class="logo">
        <!-- 假設LOGO.svg在public目錄下 -->
        <img src="/LOGO.svg" alt="Logo" />
      </router-link>
      <h1>總統大選開票</h1>
      <button @click="toggleMenu" class="hamburger" v-show="isMobile">
        <!-- 漢堡選單的三條線 -->
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="menu" :class="{ 'is-active': menuOpen }">
        <router-link to="/Vote">即時開票地圖</router-link>
        <router-link to="/">首頁</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "Header",
  setup() {
    const menuOpen = ref(false);
    const isMobile = ref(window.innerWidth < 768);

    const updateMobileStatus = () => {
      isMobile.value = window.innerWidth < 768;
    };

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    onMounted(() => {
      window.addEventListener("resize", updateMobileStatus);
      // 確保初始載入時也進行檢查
      updateMobileStatus();
    });

    onUnmounted(() => {
      window.removeEventListener("resize", updateMobileStatus);
    });

    return { menuOpen, isMobile, toggleMenu };
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  margin: -8px !important;
  margin-bottom: 0 !important;
  background-color: #0d2562;
  color: #fff;

  nav {
    display: flex;
    align-items: center;
    .logo {
      img {
        height: 50px;
      }
    }
    h1 {
      line-height: 60px;
      margin: 0;
      margin-left: 12px;
      color: #fff;
      font-family: Noto Sans TC;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 1.2px;
    }
    .hamburger {
      display: none; // 預設隱藏
      cursor: pointer;
      background: transparent;
      border: none;
      margin-left: auto; // 將漢堡選單推到最右側
      z-index: 5;
      @media (max-width: 767px) {
        display: block; // 小於768px時顯示漢堡選單
      }
      span {
        display: block;
        width: 25px;
        height: 3px;
        background-color: #000;
        margin: 5px 0;
        border-radius: 4px;
        transition: all 0.3s;
      }
    }
    .menu {
      display: flex;
      list-style: none;
      margin-left: auto;

      a {
        color: #0d2562;
        text-decoration: none;
        padding: 10px 15px;

        &:hover {
          background-color: #5b72ad79;
        }
      }
      // 小於768px寬度時適應手機版樣式
      @media (max-width: 767px) {
        flex-direction: column;
        position: fixed;
        top: 0;
        right: -100%;
        width: 30%;
        height: 100vh;
        background: #fefbf3;
        transition: right 1.5s ease-in-out;
        padding-top: 60px;
        box-shadow: -1px 0 8px #0d256213;

        a {
          padding: 20px;
          border-bottom: 1px solid #708bcf8c;
        }
      }
    }
    .menu.is-active {
      right: 0; // 當菜單開啟時滑入
    }
  }
}
</style>
