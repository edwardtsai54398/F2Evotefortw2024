<template>
  <header class="header">
    <!-- 遮罩層 -->

    <nav>
      <router-link to="/" class="logo">
        <!-- 假設LOGO.svg在public目錄下 -->
        <img src="/image/LOGO.svg" alt="Logo" />
      </router-link>
      <h1>總統大選開票</h1>
      <button @click="toggleMenu" class="hamburger" v-show="isMobile">
        <!-- 漢堡選單的三條線 -->
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="menu" :class="{ 'is-active': menuOpen }">
        <router-link to="/Vote" class="page_link">即時開票地圖</router-link>
        <router-link to="/" class="page_link">首頁</router-link>
        <div class="mb_link_list">
          <p>認識候選人</p>
          <!-- BUG 路徑會重複，還沒解決 -->
          <router-link to="`/candidate/1`" class="mb_link"
            >01 喵楚魚</router-link
          >
          <router-link to="`/candidate/2`" class="mb_link"
            >02 喵英文</router-link
          >
          <router-link to="`/candidate/3`" class="mb_link"
            >03 汪國魚</router-link
          >
        </div>
      </div>
      <div class="overlay" v-show="menuOpen" @click="toggleMenu"></div>
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
@import "@/assets/scss/all.scss";

.header {
  // position: sticky;
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  // margin-top: -8px !important;
  // margin-bottom: 0 !important;
  background-color: $blue-d;
  color: $bg;
  width: 100%;
  
  .overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(5, 11, 27, 0.6);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    z-index: 4;
    // transition: all 1.5s ease-in-out;
  }
  
  nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 40px;

    @media (max-width: 767px) {
      padding: 0 16px;
    }

    .logo {
      img {
        height: 60px;
      }
    }
    h1 {
      line-height: 60px;
      margin: 0;
      margin-left: 12px;
      color: $bg;
      font-family: Noto Sans TC;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 1.2px;
      @media (max-width: 767px) {
        display: none;
      }
    }
    .hamburger {
      display: none; // 預設隱藏
      cursor: pointer;
      background: transparent;
      border: none;
      margin-left: auto; // 將漢堡選單推到最右側
      z-index: 6;
      @media (max-width: 767px) {
        display: block; // 小於768px時顯示漢堡選單
      }
      span {
        display: block;
        width: 25px;
        height: 3px;
        background-color: $bg;
        margin: 5px 0;
        border-radius: 4px;
        transition: all 0.3s;
      }
    }
    .menu {
      display: flex;
      list-style: none;
      margin-left: auto;
      z-index: 5;

      a {
        color: $bg;
        text-decoration: none;
        padding: 10px 15px;

        // &:hover {
        //   background-color: #5b72ad79;
        // }
      }

      .mb_link_list {
        display: none;
      }
      // 小於768px寬度時適應手機版樣式
      @media (max-width: 767px) {
        flex-direction: column;
        position: fixed;
        top: 0;
        right: -40%;
        width: 40%;
        height: 100vh;
        background: $blue-d;
        transition: right 1s ease-in-out;
        padding-top: 60px;
        box-shadow: -1px 0 8px #0d256213;

        &.is-active {
          right: 0; // 當菜單開啟時滑入

          // 當 menu 是 active 狀態時，顯示遮罩層
          + .overlay {
            display: block;
          }
        }

        .page_link {
          padding: 20px;
          border-bottom: 1px solid #708bcf8c;
          font-size: 18px;
          font-weight: 500;
        }

        .mb_link_list {
          display: flex;
          flex-direction: column;
          padding: 20px;

          p {
            opacity: 0.8;
            font-weight: 300;
            font-size: 15px;
            color: $bg;
            margin-bottom: 4px;
          }

          .mb_link {
            font-size: 18px;
            padding: 10px 16px;
            font-weight: 500;
          }
        }
      }
    }
    .menu.is-active {
      right: 0; // 當菜單開啟時滑入
    }
  }
}
</style>
