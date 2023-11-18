<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// 定義目標日期
const targetDate = new Date(2024, 0, 13); // 月份是從0開始的，所以1月是0
// 創建反應性變量來存儲天、時、分、秒
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

// 更新倒數計時的函數
const updateCountdown = () => {
  const now = new Date();
  const difference = targetDate - now;

  if (difference >= 0) {
    // 將差異轉換為倒數時間
    days.value = Math.floor(difference / (1000 * 60 * 60 * 24));
    hours.value = Math.floor((difference / (1000 * 60 * 60)) % 24);
    minutes.value = Math.floor((difference / 1000 / 60) % 60);
    seconds.value = Math.floor((difference / 1000) % 60);
  }
};

// 使用生命週期鉤子在掛載時啟動計時器，並在卸載時清理
let intervalId;
onMounted(() => {
  updateCountdown(); // 初始化時立即更新一次
  intervalId = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <!-- 手機版 -->
  <div class="mb_bg">
    <header>
      <a href="#"><img src="/image/LOGO.svg" alt="Logo" /></a>
      <h1>總統大選開票</h1>
    </header>
    <main>
      <div class="player_pic">
        <img src="/image/home/mb_players.png" alt="" />
      </div>
      <div class="plater_name_list">
        <router-link :to="`/candidate/1`" class="player_name">
          <img src="/image/home/mb_1_name.png" alt="" />
        </router-link>
        <router-link :to="`/candidate/2`" class="player_name">
          <img src="/image/home/mb_2_name.png" alt="" />
        </router-link>
        <router-link :to="`/candidate/3`" class="player_name">
          <img src="/image/home/mb_3_name.png" alt="" />
        </router-link>
      </div>
      <router-link :to="`/Vote`" class="map_pic"
        ><img src="/image/home/mb_go_map.svg" alt=""
      /></router-link>
    </main>
    <footer>
      <div class="footer_flex">
        <img class="icon" src="/image/home/calendar.svg" alt="calendar" />
        <span>
          2024開票日倒數 <span class="timer_bg">{{ days }}</span> 天
          <!-- <span class="timer_bg">{{ hours }}</span> 時
          <span class="timer_bg">{{ minutes }}</span> 分
          <span class="timer_bg">{{ seconds }}</span> 秒 -->
        </span>
      </div>
    </footer>
  </div>
  <!-- 桌機版 > 1000px -->
  <div class="bg">
    <!-- <img src="../../public/home/bg.png" alt="" /> -->
    <div class="home">
      <header>
        <a href="#"><img src="/image/LOGO.svg" alt="Logo" /></a>
      </header>
      <main>
        <div class="txt">TAIWAN Presidential Election</div>
        <section class="player_list">
          <div class="player_1">
            <router-link :to="`/candidate/1`"
              ><img src="/image/home/player_1_all.png" alt=""
            /></router-link>
          </div>
          <div class="player_2">
            <router-link :to="`/candidate/2`"
              ><img src="/image/home/player_2_all.png" alt=""
            /></router-link>
          </div>
          <div class="player_3">
            <router-link :to="`/candidate/3`"
              ><img src="/image/home/player_3_all.png" alt=""
            /></router-link>
          </div>
          <div class="go_map">
            <router-link :to="`/Vote`"
              ><img src="/image/home/go_map_all.png" alt=""
            /></router-link>
          </div>
        </section>
      </main>
      <footer>
        <div class="footer_flex">
          <img class="icon" src="/image/home/calendar.svg" alt="calendar" />
          <span>
            2024開票日倒數 <span class="timer_bg">{{ days }}</span> 天
            <span class="timer_bg">{{ hours }}</span> 時
            <span class="timer_bg">{{ minutes }}</span> 分
            <span class="timer_bg">{{ seconds }}</span> 秒
          </span>
        </div>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/all.scss";
// @import "@/assets/scss/page/about.scss";
.bg {
  display: none;
}
.mb_bg {
  height: 100%;
  // width: 100vw;
  display: block;
  padding-top: 40px;
  position: relative;
  margin: -8px;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    // inset: 0;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    background-image: url("/image/home/mb_bg.png");
    background-size: cover;
    z-index: -1;
  }

  header {
    text-align: center;
    h1 {
      color: #fff;
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 1.2px;
      margin-top: -8px;
    }
  }
  main {
    padding-bottom: 24px;
    .player_pic {
      margin-top: 20px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .plater_name_list {
      display: flex;
      margin: 0 32px;
      gap: 40px;
      margin-bottom: 16px;
      .player_name {
        flex-grow: 1;
        img {
          // width: 77px;
          // height: 61px;
          width: 100%;
          object-fit: cover;
        }
      }
    }

    .map_pic {
      width: 100%;
      
      img {
        width: 100%;
        object-fit: cover;
      }
    }
  }
  footer {
        background: #fefbf3;
        // height: 62px;
        padding: 12px;
        .footer_flex {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;

          .icon {
            margin-right: 12px;
          }

          span {
            color: var(--background, #0d2562);
            font-family: Noto Sans TC;
            font-size: 18px;
            font-weight: 700;
            // margin-left: 8px;
            // margin-right: 8px;
            // text-align: center;

            .timer_bg {
              background: #0d2562;
              // padding: 0px 8px;
              padding-left: 10px;
              padding-right: 8px;
              border-radius: 3px;
              color: #fefbf3;
            }
          }
        }
      }
}

@media (min-width: 1000px) {
  .bg {
    height: 100vh;
    width: 100vw;
    // background: linear-gradient(
    //   179deg,
    //   #0d2562 54.86%,
    //   rgba(13, 37, 98, 0.7) 99.38%
    // );
    margin: -8px;
    position: relative;
    display: block;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("/image/home/bg.png");
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
        padding: 20px 0;
        // a {
        //   img {
        //   }
        // }
      }
      main {
        min-width: 1000px;
        // width: 100%;
        margin: auto;
        flex-grow: 1;
        .txt {
          color: rgba(254, 251, 243, 0.6);
          font-family: Noto Sans TC;
          font-size: 30px;
          font-weight: 900;
          line-height: 50px;
          letter-spacing: 1.5px;
          text-align: right;
          opacity: 0.4;
        }

        .player_list {
          position: relative;
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          gap: 20px;
          text-align: center;
          width: 1000px;
          // width: 100%;
          margin: auto;

          .player_1 {
            position: absolute;
            grid-column: 1 / span 4;
            left: 0;
            img {
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              object-fit: cover;
            }
          }

          .player_2 {
            position: absolute;
            grid-column: 3 / span 4;
            top: 0;
            left: 20px;
            a {
              // clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
              height: 100%;
              width: 100%;
              display: block;
              img {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                object-fit: cover;
              }
            }
          }

          .player_3 {
            position: absolute;
            grid-column: 6 / span 4;
            top: 0;
            img {
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              object-fit: cover;
            }
          }

          .go_map {
            position: absolute;
            grid-column: 9 / span 1;
            top: 0;
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
        // height: 62px;
        padding: 12px;
        .footer_flex {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;

          .icon {
            margin-right: 12px;
          }

          span {
            color: var(--background, #0d2562);
            font-family: Noto Sans TC;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 8px;
            // margin-left: 8px;
            // margin-right: 8px;
            // text-align: center;

            .timer_bg {
              background: #0d2562;
              // padding: 0px 8px;
              padding-left: 10px;
              padding-right: 3px;
              border-radius: 3px;
              color: #fefbf3;
            }
          }
        }
      }
    }
  }
  .mb_bg {
    display: none;
  }
}
</style>
