import Vue from 'vue'
import Vuex from 'vuex'
import cities from './city.json';
import axios from 'axios';
Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    placeholder:'search',
    citiesJSON:cities,
    activeRouter:false,
    valueSearch:'',
    cityAttribute:{
      name:'Warszawa',
      weather:'',
    },
    addedCityAttribute:{},
    addedCities:[],
    selectedCityAcitive:false,
    interval:null,
  },
  actions:{
    loadWeather({state}) {
      let data=new Date()
      let hours = data.getHours();
      let minutes = data.getMinutes();
      if(hours < 10){hours = '0'+hours;}
      if(minutes < 10){minutes = '0'+minutes;}
      let days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${state.cityAttribute.name}&units=metric&appid=3f240ca5293752bb7535b62c3528221d`)
        .then(response=>{
          setTimeout(function(){
          state.cityAttribute.weather=response.data.weather[0].main;
          state.cityAttribute.temp=Math.round(response.data.main.temp*10)/10;
          state.cityAttribute.humidity=response.data.main.humidity;
          state.cityAttribute.wind=response.data.wind.speed;
          state.cityAttribute.day=days[data.getDay()-1];
          state.cityAttribute.updated=hours+":"+minutes;
        },100)
          sessionStorage.setItem('cityAttribute', JSON.stringify(state.cityAttribute));
        })
        .catch(error=>{console.log(error)})
    },
    loadWeatherForAdded({state}){
      if(JSON.parse(localStorage.getItem('favorites'))!==null){state.addedCities=JSON.parse(localStorage.getItem('favorites'))}
      state.addedCities.forEach(city => {
        axios
          .get(`http://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=3f240ca5293752bb7535b62c3528221d`)
          .then(response=>{
            city.temp=Math.round(response.data.main.temp*10)/10;
            city.weather=response.data.weather[0].main;
          })
          .catch(error=>{console.log(error)})
      });
    }
  },
  mutations:{
    router(state){
      if(state.activeRouter===false){state.activeRouter=true}
      else{state.activeRouter=false}
    },
    valueSearch (state, value) {state.valueSearch = value},
    selectedCity(state, city) {
      state.selectedCityActive=true
      state.valueSearch='';
      state.placeholder=city.city;
      state.cityAttribute.name=city.city
    },
    addToFavorites(state){
      state.addedCityAttribute={
        name:state.cityAttribute.name,
        temp:'',
        weather:''
      }
      state.addedCities.push(state.addedCityAttribute)
      localStorage.setItem('favorites', JSON.stringify(state.addedCities));
    },
    removeCity(state,added){
      const index = state.addedCities.indexOf(added)
      state.addedCities.splice(index,1)
      localStorage.setItem('favorites', JSON.stringify(state.addedCities));
    },
    initialiseStore(state){
      if(sessionStorage.getItem('store')){
        this.replaceState(
          Object.assign(state, JSON.parse(sessionStorage.getItem('store')))
        )
      }
    },
  },
  getters:{
    filteredList: state =>{
      return state.citiesJSON.filter(cityName => {
        return cityName.city.toLowerCase().includes(state.valueSearch.toLowerCase())
      })
    },
  },
})
