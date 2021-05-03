import Vue from 'vue'
import Vuex from 'vuex'
import count from './modules/count.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)

// store:データを置いておく場所
export default new Vuex.Store({
  state: {
    // グローバル変数の様に使える
    message: ''
  },
  // getters: computedのVuex版
  // 上のオブジェクトを加工して返す
  // 中身には関数を持つ
  getters,
  // mutationでしかstateの値を変えられない様にするもの
  // 変えられる場所を１つに絞ることでデータを追跡・予測しやすくする
  // mutationは非同期的な処理をできない
  mutations,
  // vuexで非同期処理を行う場合、muttationの後ろにactionをおく
  // acitonsの中では同期処理も行うことはできる
  actions,
  modules: {
    count
  }
});