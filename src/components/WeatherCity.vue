<template>
  <main class="weather-city-panel" v-if="cityAttribute.name!==''">
    <div class = "weather-today">
      <div class="city-name">
        <p>{{cityAttribute.name}}</p>
        <button :style="[check===true? active : noActive]" class="btn-add" @click="addToFavorites">Add</button>
      </div>
      <div class="city-weather">{{cityAttribute.weather}}</div>
      <div class="image">
        <img v-if="cityAttribute.weather!==''" width="110.5px" :src="require(`../assets/image/${cityAttribute.weather}.png`)" alt="image"/>
      </div>
      <div class="day-title">
        <p>{{cityAttribute.day}}</p>
        <p class="updated">{{cityAttribute.updated}}</p>
      </div>
      <div class="conditions">
        <p class="wind">{{cityAttribute.wind}}m/s</p>
        <p class="humidity">{{cityAttribute.humidity}}%</p>
      </div>
      <div class="city-temp">{{cityAttribute.temp}}°C</div>
    </div>
  </main>
</template>
<script>
import { mapState,mapMutations } from 'vuex';
export default {
  name:"WeatherCity",
  data:function(){
    return{
      noActive:{
        background: 'rgba(0, 68, 255, 0.541)',
      },
      active:{
        boxShadow:'0 0 0',
        filter:'opacity(.3)',
      }
    }
  },
  computed:mapState([
    'cityAttribute',
    'check',
  ]),
  methods:{
    ...mapMutations(['addToFavorites'])
  },
  updated() {
    this.$store.dispatch('loadWeatherForAdded')
    this.$store.subscribe((mutation, state) => {
    sessionStorage.setItem('store', JSON.stringify(state));
    });
  },
}
</script>
<style lang="scss" scoped>
  @mixin flex{
    display: flex;
    justify-content: center;
  }
  @mixin after{
    content:'';
    width: 28px;
    height: 20px;
    position:absolute;
    background-size: 28px;
    background-repeat: no-repeat;
    margin:6px 0 0 5px;
  }
  .weather-city-panel{
    font-size: 17px;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.349);
    z-index: 0;
    width: calc(87%/6 + 240px);
    position: absolute;
    transform: translateX(-50%);
    left:50%;
    top:calc(45%/3 + 50px);
    .weather-today{
      display:grid;
      grid-template-areas: 
      "name     name     name"
      "weather  weather  weather"
      "day      image    conditions"
      "temp     temp     temp";
      grid-template-columns: 1fr 110.5px 1fr;
      button{
        text-shadow: 0 3px 6px rgba(0, 0, 0, 0.349);
        border-radius: 21px;
        border:0;
        outline: 0;
        font-size: 23px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.349);
        padding: 5px 10px;
        transition: all .2s cubic-bezier(0, 0, 0.55, 1.71);
      }
      .city-name{
        grid-area: name;
        @include flex;
        font-size:23px;
        button{line-height: 1px; margin-left:10px;}
        button:hover{cursor: pointer;transform: scale(1.1);}
      };
      .city-weather{
        grid-area: weather;
        margin: 10px 0 20px 0;
      };
      .day-title{
        grid-area: day;
        @include flex;;
        flex-direction: column;
        letter-spacing: -1px;
        margin-right: 10px;
        .updated{letter-spacing: 0;}
      };
      .image{
        grid-area: image;
        min-height: 120px;
      };
      .conditions{
        grid-area: conditions;
        @include flex;
        align-items: center;
        flex-direction: column;
        .wind::after{
          @include after;
          background-image: url("../assets/image/wind.png");
        }
        .humidity::after{
          background-image: url("../assets/image/humidity.png");
          @include after;
          margin:-3px 0 0 15px;
          height: 50px;
          background-size: 15px;
        }
      };
      .city-temp{
        grid-area: temp;
        font-size:62px;
      }
    }
  }
</style>