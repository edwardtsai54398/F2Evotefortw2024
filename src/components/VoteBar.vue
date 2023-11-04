<template>
  <div class="vote-bar">
    <span class="title">
      {{ data.name }}
    </span>
    <div class="bar-ratio">
      <div ref="bar1"></div>
      <div ref="bar2"></div>
      <div ref="bar3"></div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
export default {
  name: 'VoteBar',
  props: ["data"],
  setup(props) {
    const bar1 = ref(null);
    const bar2 = ref(null);
    const bar3 = ref(null);
    const { vote } = props.data;
    const totalVote = computed(() => {
      const total = Object.values(vote).reduce((accu, cur) => accu + cur , 0);
      return total;
    });
    onMounted(() => {
      // 處理各政黨得票率
      const perPartyRatio = (party, sum) => {
        const ratio = (sum / totalVote.value.toFixed(8)) * 100;
        switch (party) {
          case "民進黨":
            bar1.value.style.width = `${ratio}%`;
            bar1.value.style.backgroundColor = "green";
            break;
          case "國民黨":
            bar2.value.style.width = `${ratio}%`
            bar2.value.style.backgroundColor = "blue";
            break;
          case "民眾黨":
            bar3.value.style.width = `${ratio}%`
            bar3.value.style.backgroundColor = "white";
            break;
        }
      };

      // 處理政黨得票的排序，由高到低排序為左到右
      const partyOrder = Object.values(vote).sort((a, b) => b - a);
      for (let index = 0; index < partyOrder.length; index++) {
        Object.keys(vote).forEach(party => {
          if (index === 0) perPartyRatio(party, vote[party]);
          if (vote[party] === partyOrder[index]) {
            switch (party) {
              case "民進黨":
                bar1.value.style.order = `${index+1}`;
                break;
              case "國民黨":
                bar2.value.style.order = `${index+1}`;
                break;
              case "民眾黨":
                bar3.value.style.order = `${index+1}`;
                break;
              default:
            }
          }
        })
      }
    })
    
    
    return {
      bar1,
      bar2,
      bar3,
    }
  },
}
</script>

<style lang="scss" scoped>
.vote-bar {
  display: flex;
  margin-bottom: 20px;
  .title {
    width: 150px;
    font-size: 30px;
    color: #fff;
  }
  .bar-ratio {
    min-width: 300px;
    display: flex;
    border-radius: 10px;
    overflow: hidden;
  }
}
</style>