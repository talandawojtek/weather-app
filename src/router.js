import Vue from 'vue'
import Router from 'vue-router'
import ResultSearch from './views/ResultSearch.vue'
import Favorites from './views/Favorites.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'search',
      component: ResultSearch
    },
    {
      path: '/favorites',
      name: 'favorites',
      component:Favorites
    }
  ]
})
