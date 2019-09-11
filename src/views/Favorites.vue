<template>
  <div class="favorites-panel">
    <p v-if="addedCities.length===0">Empty list</p>
    <div class="favorite" v-for="(added,index) in addedCities" :key="index">
      <div class="square">
        <div class="col col-1">
          <p class="added-name">{{added.name}}</p>
          <p class="added-weather">{{added.weather}}</p>
          <img v-if="added.weather!==''" width="110.5px" :src="require(`../assets/image/${added.weather}.png`)" alt="image"/>
        </div>
        <div class="col col-2">
          <p>{{added.temp}}°C</p>
          <button class="delete" @click="removeCity(added)"><img width="25px;" src="../assets/image/delete.png"/></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'
export default {
  name:"Favorites",
  computed:mapState([
    'addedCities',
    'addedCityAtribute'
  ]),
  methods: {
    ...mapMutations(['removeCity'])
  },
  created() {
    if(JSON.parse(localStorage.getItem('favorites'))!==null){this.$store.state.addedCities=JSON.parse(localStorage.getItem('favorites'))}
    this.$store.dispatch('loadWeatherForAdded')
  },
}
</script>
<style lang="scss">
  .favorites-panel{
    opacity: 0;
    width: calc(87%/6 + 240px);    
    position: absolute;
    transform: translateX(-50%);
    left:50%;
    margin-top:calc(20%/2 + 30px);
    margin-bottom:40px;
    animation-name: favorite;
    animation-delay: .3s;
    animation-fill-mode: forwards;
    animation-duration: .5s;
    .favorite{
        background: rgba(0, 0, 0, 0.671);
        padding: 10px 10px;
        .square{
          height: 120px;;
          display:flex;
          .col{width: 50%;}
          .col-1{
            display:grid;
            grid-template-columns: 1fr 1fr;
            grid-template-areas: 
            "name     name"
            "weather  image";
            .added-name{
              grid-area: name;
              font-size: 23px;
              display: flex;
            };
            .added-weather{
              grid-area: weather;
              display:flex;
              justify-content: left;
              align-items: center;
            };
            img{
              grid-area: image;
              display:flex;
              margin-left:10px;
              align-items: center;
              width: 70%;
              margin-bottom:8px;
              }
            }
            .col-2{
              display: flex;
              p{
                display: flex;
                font-size:calc(4vw/2 + 20px);
                margin-left:20px;
                align-items: center;
              }
              .delete{
                display: none;
                position: absolute;
                background: 0;
                outline: 0;
                border:0;
                margin-top:-20px;
                right: -10px;
                transition: all .2s cubic-bezier(0, 0, 0.55, 1.71);
                }
            }
        }
    }
    .favorite:first-child::before{
      content:'Favorites';
      position: absolute;
      top:-38px;
      left:0;
      text-shadow: 0 3px 6px rgba(0, 0, 0, 0.349);
      font-size: 30px;
    }
    .favorite:hover{
        background: rgba(0, 0, 0, 0.466);
        .col-2{
          .delete{display:block;}
          .delete:hover{
            cursor: pointer;
            transform: scale(1.3);
            }
          }
      }
  }
@keyframes favorite {
  from{opacity: 0;}
  to{opacity: 1;}
}
</style>
