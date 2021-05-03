<template>
  <div>
    <h3>Home</h3>
    <!-- javascriptでページを遷移する方法 -->
    <button @click="toUsers">Usersのページへいく</button>
    <p>{{ doubleCount }}</p>
    <p>{{ tripleCount }}</p>
    <!-- <input type="text" :value="message" @input="updateMessage"> -->
    <input type="text" v-model="message">
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  // store.jsの値が変わった時に、計算してDOMを更新するべきなのか
  computed: {
    // 以下をmapGettersで書き換える
    // mapGetters以外のcomputedを書きたい時、そのままmapGettersを書いても
    // keyとvalueがないのでエラーとなる
    // スプレット演算子を使うことでオブジェクトをいい感じに組み込んでくれる 
    // namespaceを使用している場合、第一引数にファイル名をおくことでcount/doubleCountと認識される
    ...mapGetters("count", ["doubleCount", "tripleCount"]),
    //message() {
      // ゲッターの役割
      //return this.$store.getters.["count/doubleCount"];
    //}
    // vuexでの双方向バインディングの方法１
    message: {
      get() {
        return this.$store.getters.message;
      },
      // セッターの役割。入力された時にどうするか
      set(value) {
        this.$store.dispatch("updateMessage", value);
      }
    }
  },
    //{
    //doubleCount() {
      // Vuex.useとvueインスタンスでstoreと記載した事で
      // 全てのコンポーネントで$storeが使える様になる
      // gettersを使っている事で読み取り様なのだとわかりやすい
      //return this.$store.getters.doubleCount;
    //},
    //tripleCount() {
      //return this.$store.getters.tripleCount;
    //}
  //},
  methods: {
    // vuexでの双方向バインディングの方法１
    // computedプロパティはv-modelでの書き換えができない
    // 値はcomputedプロパティの値が入り、何かもじが入力された瞬間にdispatchする
    //updateMessage(e) {
      //this.$store.dispatch("updateMessage", e.target.value);
    //},
    // javascriptでページを遷移する方法
    toUsers () {
      // pushのあとはpush({ path: 'users' })でもOK
      // $routerはURLを切り替えるためのもの。$routeと間違えない様に
      // パラメーターを使うときはpathは使用できない。nameを使う
      this.$router.push({
        name: 'users-id-profile', 
        params: { id: 1 } 
      })
    }
  }
}

</script>