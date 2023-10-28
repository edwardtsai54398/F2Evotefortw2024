<script setup>
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <div class="bg">
    <!-- <img src="../../public/home/bg.png" alt="" /> -->
    <div class="home">
      <header>
        <a href="#"><img src="../../public/LOGO.svg" alt="Logo" /></a>
      </header>
      <main>
        <div class="txt">TAIWAN Presidential Election</div>
        <section class="player_list">
          <div class="player_1">
            <img src="../../public/home/player_1_all.png" alt="" />
          </div>
          <div class="player_2">
            <img src="../../public/home/player_2_all.png" alt="" />
          </div>
          <div class="player_3">
            <img src="../../public/home/player_3_all.png" alt="" />
          </div>
          <div class="go_map">
            <img src="../../public/home/go_map_all.png" alt="" />
          </div>
        </section>
      </main>
      <footer>
        <div class="footer_flex">
          <img src="../../public/home/calendar.svg" alt="calendar" /><span
            >2024開票日倒數 87 天 16 時 52 分 31 秒</span
          >
        </div>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/all.scss";
// @import "@/assets/scss/page/about.scss";

.bg {
  height: 100vh;
  width: 100%;
  // background: linear-gradient(
  //   179deg,
  //   #0d2562 54.86%,
  //   rgba(13, 37, 98, 0.7) 99.38%
  // );
  margin: -8px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("../../public/home/bg.png");
    background-size: cover;
    z-index: -1;
  }

  .home {
    // max-width: 1280px;
    // width: 100%;
    // margin: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    header {
      max-width: 1280px;
      width: 100%;
      margin: auto;
      a {
        img {
        }
      }
    }
    main {
      max-width: 1000px;
      width: 100%;
      margin: auto;
      flex-grow: 1;
      .txt {
        color: rgba(254, 251, 243, 0.6);
        font-family: Noto Sans TC;
        font-size: 30px;
        font-style: normal;
        font-weight: 900;
        line-height: 50px; /* 166.667% */
        letter-spacing: 1.5px;
        text-align: right;
      }

      .player_list {
        position: relative; /* 设置容器为相对定位，以便子元素使用绝对定位 */
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        gap: 20px;
        text-align: center;
        max-width: 1000px;
        width: 100%;
        margin: auto;

        .player_1 {
          position: absolute; /* 设置子元素为绝对定位 */
          grid-column: 1 / span 4;
          // top: 0; /* 距离顶部的位置 */
          // top: 100%;
          left: 0; /* 距离左侧的位置 */
          // height: 100%;
          // width: 100%;
          img {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            object-fit: cover;
          }
        }

        .player_2 {
          position: absolute; /* 设置子元素为绝对定位 */
          grid-column: 3 / span 4;
          top: 0; /* 距离顶部的位置 */
          left: 20px;
          img {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            object-fit: cover;
          }
        }

        .player_3 {
          position: absolute; /* 设置子元素为绝对定位 */
          grid-column: 6 / span 4;
          top: 0; /* 距离顶部的位置 */
          /* 距离左侧的位置 */
          img {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            object-fit: cover;
          }
        }

        .go_map {
          position: absolute; /* 设置子元素为绝对定位 */
          grid-column: 9 / span 1;
          top: 0; /* 距离顶部的位置 */
          right: -10px;
          img {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            object-fit: cover;
          }
        }
      }
    }
    footer {
      background: #fefbf3;
      height: 62px;
      .footer_flex {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;

        span {
          color: var(--background, #0d2562);
          font-family: Noto Sans TC;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 1.2px;
          margin-left: 12px;
        }
      }
    }
  }
}
</style>
