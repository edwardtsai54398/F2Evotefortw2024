<!-- <script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
   <h2>候選人介紹頁</h2>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/all.scss";
// @import "@/assets/scss/page/about.scss";
</style> -->
<script>
import { ref, toRefs, onMounted } from "vue";
import { candidates } from "../data";
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

    onMounted(() => {
      candidate.value = candidates[id.value];
    });

    return {
      candidate,
    };
  },
};
</script>

<template>
  <div class="candidate" v-if="candidate">
    <Header />
    <h1>中華民國第十五任總統暨副總統選舉 / {{ candidate.name }}</h1>
    <div class="grid_container">
      <div class="container_pic">
        <div class="pic"><img :src="candidate.image" alt="" /></div>
      </div>
      <div class="container_about">
        <p>{{ candidate.description }}</p>
      </div>
      <div class="container_experience">Item 3</div>
      <div class="container_opponents">Item 4</div>
    </div>
    <Footer />
  </div>
  <div v-else>
    <p>Candidate not found</p>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/all.scss";
// @import "@/assets/scss/page/about.scss";
// --

.candidate {
  background: #fefbf3;
  height: 98vh;
  display: flex;
  flex-direction: column;
  .grid_container {
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 10px; /* 根据需要设置间隙 */

    .container_pic {
      grid-column: span 4;

      .pic {
        width: 100%;
        img {
          width: 100%;
        }
      }
    }

    .container_about {
      grid-column: span 3;
    }

    .container_experience {
      grid-column: span 4;
    }

    .container_opponents {
      grid-column: span 1;
    }
  }
}
</style>
