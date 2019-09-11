<template>
  <nav class="search-panel">
    <form>
      <span><input class="search" v-model="valueSearch" type="text" :placeholder="placeholder"></span>
      <div class="filtered-list" v-if="valueSearch!==cityAttribute.name&&valueSearch!==''">
        <button class="btn-search" @click.prevent="selectedCity(city)" v-for="(city,value) in filteredList" :key="value">{{city.city}}</button>
      </div>
    </form>
  </nav>
</template>
<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex'
import { setInterval } from 'timers';
export default {
  name:"SearchCities",
  computed:{
    valueSearch: {
      get () {return this.$store.state.valueSearch},
      set (value){this.$store.commit('valueSearch', value)}
    },
    ...mapState(['citiesJSON','cityAttribute','selectedCityActive','updated','placeholder']),
    filteredList() {return this.$store.getters.filteredList},
  },
  methods:{...mapMutations(['selectedCity'])},
  beforeCreate() {
    this.$store.dispatch('loadWeather')
    if(JSON.parse(sessionStorage.getItem('cityAttribute'))!==null)
    {
      this.$store.state.cityAttribute=JSON.parse(sessionStorage.getItem('cityAttribute'));
      this.$store.dispatch('loadWeather')
    }
    this.$store.state.valueSearch=this.$store.state.cityAttribute.name;
    this.$store.state.placeholder=this.$store.state.valueSearch;
    this.$store.state.valueSearch='';
  },
  beforeUpdate() {
    if(this.$store.state.selectedCityActive===true){
        // this.$store.state.cityAttribute
        this.$store.dispatch('loadWeather');
        this.$store.state.selectedCityActive=false
      }
  },
}
</script>
<style lang="scss">
.search-panel{
  margin:auto;
  width: calc(87%/6 + 240px);
  form{
   .search{
     margin-top:25px;
     width: 100%;
     background: 0;
     border:0;
     outline: none;
     border-bottom: 1.5px solid rgba(68, 68, 68, 0.45);
     color: rgba(0, 0, 0, 0.45);
     font-size: 20px;
    }
    ::placeholder{color: rgba(88, 88, 88, 0.116);font-size: 20px;}
    .filtered-list{
      z-index: 999;
      background: #63cfc8;
      position: relative;
      margin:auto;
      margin-top:5px;
      display:flex;
      flex-direction: column;
      padding-top:5px;
      max-height: 150px;
      overflow: auto;
      box-shadow: 0px 0px 1px rgba(68, 68, 68, 0.45);
      .btn-search{
        text-align: left;
        background: 0;
        outline: 0;
        border:0;
        padding:5px 0;
        font-size:15px;
        margin-left:12px;
        color: rgba(0, 0, 0, 0.45);
      }
      .btn-search:hover{
        cursor:pointer;
        filter: opacity(.5);
      }
    }
    .filtered-list::-webkit-scrollbar{width: 12px;}
    .filtered-list::-webkit-scrollbar-thumb{
      border-radius: 10px;
      background-color: rgba(10, 10, 10, 0.384);
    }
  }
  span::after{
    content: '';
    background-image: url("../assets/image/magnifier.png");
    position: absolute;
    width: 28px;
    height: 28px;
    background-size: 28px;
    margin-top:25px;
    margin-left:-30px;
  }
}
</style>