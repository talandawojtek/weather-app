<template>
  <div class="result">
    <SearchCities/>
    <WeatherCity/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SearchCities from '../components/SearchCities.vue';
import WeatherCity from '../components/WeatherCity.vue';
export default {
  name: 'ResultSearch',
  components: {
    SearchCities,
    WeatherCity
  },
  computed:mapState(['cityAttribute','activeRouter'])
}
</script>
<style lang="scss">
  .result{
    opacity: 0;
    animation-name: result;
    animation-timing-function: cubic-bezier(0, 0, 0.55, 1.71);
    animation-fill-mode: forwards;
    animation-duration: 1s;
    animation-delay: .4s;
  }
  @keyframes result {
    from{opacity: 0;}
    to{opacity: 1;}
  }
</style>