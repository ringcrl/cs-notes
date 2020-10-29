import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/canvas', name: 'canvas', component: require('../pages/canvas/canvas.vue')},
    {path: '/dom', name: 'dom', component: require('../pages/dom/dom.vue')}
    ]
})
