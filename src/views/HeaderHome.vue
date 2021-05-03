<template>
  <div id="nav">
    <h2>Home</h2>
    <!-- aタグにすると毎回サーバにアクセスするのに対し -->
    <!-- router-linkだとアクセスせずに切り替えが行われる -->
    <!-- rooter link はtoを使う -->
    <!-- tagを定義して、aタグから他のタグへ変更させることもできる -->
    <!-- active-class属性：特定のlinkがアクティブな時にclassをつける -->
    <!-- アクティブな時とは：urlが存在する時(Homeはずっとアクティブになってしまう) -->
    <!-- exact属性をつけると完全にマッチしたものを示すので、homeではアクティブにならない -->
    <router-link to="/" active-class="link--active" exact>Home</router-link>
    <router-link to="/users" active-class="link--active" exact>Users</router-link>
    <button @click="increment(2)">+1</button>
    <button @click="decrement(3)">-1</button>
  </div>
</template>

<script>
// import { mapMutations } from "vuex";
import { mapActions } from "vuex";
export default {
  methods: {
    // 下記を書き換え
    // 第二引数は@click="increment(2)"の部分に書く
    //...mapMutations(['increment', 'decrement'])
    //ncrement() {
      //this.$store.state.count++;
      // mutetionを使用した場合はcommitを使って受け取る。引数は定義した時の名前
      // 下記の例は２ずつ増えるという意味。その内容は第二引数にとる
      // commitという記述を見た瞬間にstoreの状態を書き換えているんだとわかる
      //this.$store.commit('increment', 2);
    //},
    //decrement() {
      //this.$store.state.count--;
      //this.$store.commit('decrement', 2);
    //}
    // actionsはdispatchで実行する
    // 下記を書き換え
    ...mapActions("count", ['increment', 'decrement'])
    //increment() {
      //this.$store.dispatch('increment', 2);
    //},
    //decrement() {
      //this.$store.dispatch('decrement', 2);
    //}
  }
}
</script>