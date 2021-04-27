import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Users from './views/Users.vue'

// Vue.use:プラグインを適用する
// プラグイン:グローバルな機能を提供するもの。Vue.js全体に影響を与えるようなもの
Vue.use(VueRouter)

// Routerの中身をVue.jsに適用させるため
// Routerの中身はオブジェクトでかく
export default new Router({
  // routesは配列で定義
  // URLとコンポーネントをマッチングさせる
  routes: [{ path: '/', component: Home }, { path: '/users', component: Users }]
});