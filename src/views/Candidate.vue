<script>
import { ref, watch, onMounted, toRefs } from "vue";
import { candidates } from "../candidate_data";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  props: ["id"],
  setup(props) {
    const candidate = ref(null);
    const { id } = toRefs(props);

    // 加載候選人數據的函數
    const loadCandidate = () => {
      candidate.value = candidates[id.value];
    };

    // 在組件掛載時加載數據
    onMounted(loadCandidate);

    // 監聽 id 的變化
    watch(id, () => {
      loadCandidate();
    });

    return {
      candidate,
    };
  },
};
</script>

<template>
  <Header />
  <div class="candidate_flex">
    <div class="candidate" v-if="candidate">
      <h1>中華民國第十五任總統暨副總統選舉 / {{ candidate.name }}</h1>
      <!-- grid 排版 -->
      <div class="grid_container">
        <!-- 圖片 -->
        <div class="container_pic">
          <div class="pic">
            <img class="web" :src="candidate.image.web" alt="候選人照片" />
            <img class="mb" :src="candidate.image.mb" alt="候選人照片" />
          </div>
        </div>
        <!-- 關於 -->
        <div class="container_about">
          <div class="id_name">
            <div class="id">{{ candidate.id }}</div>
            <p class="name">{{ candidate.name }}</p>
          </div>
          <p class="container_title">政黨</p>
          <div class="party">
            <div class="pic">
              <img :src="candidate.party_image" alt="政黨" />
            </div>
            <p>{{ candidate.party }}</p>
          </div>
          <p class="container_title">競選搭檔</p>
          <p>{{ candidate.partner }}</p>
          <p class="container_title">背景</p>
          <p>{{ candidate.background }}</p>
          <p class="container_title">學歷</p>
          <ul>
            <li
              class="list"
              v-for="(item, index) in candidate.education"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <!-- 經歷 -->
        <div class="container_experience">
          <p class="container_title">經歷</p>
          <ul>
            <li v-for="(item, index) in candidate.experience" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <!-- 對手 -->
        <div class="container_opponents">
          <p class="container_title opponents_txt">看其他候選人</p>
          <div class="opponents_list">
            <router-link
              v-for="opponent in candidate.opponents"
              :key="opponent.name"
              :to="opponent.link"
              class="opponents_item"
            >
              <div class="pic">
                <img :src="opponent.image" :alt="opponent.name" />
              </div>
              <p>{{ opponent.name }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>404 error</p>
    </div>

    <Footer />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/all.scss";
.candidate_flex {
  height: 100%;
  width: 100%;
  padding: 0;
  padding-top: 60px;
  background: $bg;
  display: flex;
  flex-direction: column;
  .candidate {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    flex-grow: 1;

    h1 {
      margin-top: 12px;
      padding: 0 20px;
      color: $blue-d;
      font-size: 12px;
      font-weight: 400;
      line-height: 30px; /* 214.286% */
      letter-spacing: 0.48px;
    }
    .grid_container {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      // grid-template-columns: repeat(12, 1fr);
      // gap: 20px;
      padding: 0 20px;
      // margin-top: 40px;

      // NOTE 通用特別提拔到外面
      .container_title {
        color: $blue-d;
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 8px;
        margin-top: 20px;
      }

      .container_pic {
        // grid-column: span 4;

        .pic {
          width: 100%;
          // margin-top: -60px;
          img {
            width: 100%;
            height: 100%;
            vertical-align: top;
          }
          .web {
            display: none;
          }
          .mb {
            display: block;
          }
        }
      }

      .container_about {
        // grid-column: span 3;
        .id_name {
          display: flex;
          gap: 12px;
          align-items: center;

          .id {
            width: 28px;
            height: 28px;
            background-color: $blue-d;
            text-align: center;
            line-height: 28px;
            color: $bg;
            font-size: 20px;
            font-weight: 700;
            border-radius: 50%;
          }

          .name {
            color: $blue-d;

            /* TC | title2 | 24px | M */
            font-size: 24px;
            font-weight: 500;
            letter-spacing: 0.96px;
          }
        }

        .party {
          display: flex;
          gap: 12px;
          align-items: center;

          .pic {
            img {
              vertical-align: middle;
            }
          }
        }

        ul {
          list-style: disc;
          margin-left: 16px;

          li {
            line-height: 26px;

            &::marker {
              font-size: 0.7em; /* 调整大小 */
              margin-right: 40px;
            }
          }
        }
      }

      .container_experience {
        // grid-column: span 4;

        ul {
          list-style: disc;
          margin-left: 16px;

          li {
            line-height: 26px;

            &::marker {
              font-size: 0.7em; /* 调整大小 */
              margin-right: 40px;
            }
          }
        }
      }

      .container_opponents {
        // grid-column: span 1;
        padding-bottom: 20px;
        .opponents_list {
          display: flex;
          gap: 24px;
          text-align: center;
          .opponents_item {
            &:hover .pic img {
              background-color: $blue-d;
            }
            .pic {
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 1px solid $blue-d;
                background-color: transparent;
                object-fit: cover;
                transition: all 0.4s;
              }

              p {
                font-weight: 500;
              }
            }
          }
        }
      }
    }
  }
}

@media (min-width: 1000px) {
  .candidate_flex {
    // height: 97.4vh;
    min-height: 99vh;

    .candidate {
      // background: #fefbf3;
      // height: 98vh;
      // height: 100vh;
      // display: flex;
      // flex-direction: column;
      // margin: 0;
      // padding: 0;
      // overflow: hidden;

      h1 {
        margin-top: 16px;
        padding: 0 40px;
        // color: $blue-d;
        font-size: 14px;
        font-weight: 400;
        // line-height: 30px; /* 214.286% */
        letter-spacing: 0.84px;
      }
      .grid_container {
        // flex-grow: 1;
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        gap: 10px;
        padding: 0 40px;
        margin-top: 40px;

        // NOTE 通用特別提拔到外面
        .container_title {
          // color: $blue-d;
          font-size: 24px;
          // font-weight: 500;
          margin-bottom: 10px;
          margin-top: 16px;
        }

        .container_pic {
          grid-column: span 4;

          .pic {
            // width: 100%;

            // img {
            //   width: 100%;
            //   height: 100%;
            // }

            .web {
              display: block;
            }
            .mb {
              display: none;
            }
          }
        }

        .container_about {
          grid-column: span 3;
        }

        .container_experience {
          grid-column: span 4;
          .container_title {
            margin-top: 0px;
          }

          ul {
            li {
              line-height: 32px;
            }
          }
        }

        .container_opponents {
          grid-column: span 1;

          .container_title {
            display: none;
          }

          .opponents_list {
            flex-direction: column;
            padding-top: 224px;
          }
        }
      }
    }
  }
}
</style>
