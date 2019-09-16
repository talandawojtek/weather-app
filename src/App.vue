<template>
  <div id="app">
    <Circles/>
    <div id="nav">
      <button class="router router-back" v-if="activeRouter===true"><span @click="router" ><router-link to="/">Back</router-link></span></button>
      <button class="router router-favorites" v-if="activeRouter===false"><span @click="router"><router-link to="/favorites">Favorites</router-link></span></button>
    </div>
    <router-view/>
  </div>
</template>
<script>
import Circles from './components/Circles.vue'
import ResultSearch from './views/ResultSearch.vue'
import Favorites from './views/Favorites.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  components:{
    Circles,
    ResultSearch,
    Favorites
  },
  computed: mapState([
    'activeRouter','addedCities'
  ]),
  methods:{...mapMutations(['router']),},
  beforeCreate() {
    this.$store.commit('initialiseStore');
    },
  beforeUpdate() {
    this.$store.subscribe((mutation, state) => {
    sessionStorage.setItem('store', JSON.stringify(state));
    });
  },
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap');
*{
margin:0;
padding: 0;
box-sizing: border-box;
font-family: 'Poppins', sans-serif;
color:white;
}
body{
  background-image: linear-gradient(to bottom, #63cfc8, #69d3d9, #75d7e9, #86daf5, #9addff);
  background-attachment: fixed;
}
#app{
  overflow-x: hidden;
  height: 100vh;
  text-align: center;
  padding: 10px;
  .router-favorites{
    position: absolute;
    transform: translate(-50%,-50%);
    left:50%;
    top:calc(90%/3 + 320px);
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.349);
    background: rgba(0, 68, 255, 0.541);
    border-radius: 21px;
    border:0;
    outline: 0;
    font-size: 23px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.349);
    padding: 3px 20px;
    transition: background .1s linear;
    a{text-decoration: none;width: 100%;}
  }
  .router{
    opacity: 0;
    animation-name: btn;
    animation-duration: .5s;
    animation-delay: .3s;
    animation-fill-mode: forwards;
  }
  @keyframes btn {
    from{opacity: 0;}
    to{opacity: 1;}
  }
  .router-favorites:hover{background: rgba(0, 68, 255, 0.74);cursor: pointer;}
  .router-back{
    position: fixed;
    z-index: 999;
    top:10px;
    right: 20px;
    border:0;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.349);
    outline: 0;
    background: 0;
    font-size: 23px;
    a{text-decoration: none;}
  }
}
</style>
