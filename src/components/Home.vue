<template>
  <div>
    <!-- カスタムディレクティブの式にはjavascript式が渡されてしまうので、 -->
    <!-- 文字列にして渡す -->
    <!-- 複数の値を持つ場合はオブジェクトにする -->
    <!-- 引数を持つ場合は:引数をつける(引数は１つしか取れない) -->
    <!-- 引数の後ろに修飾子をつけることができる -->
    <!-- 修飾子は何個もつなげることができる -->
    <p v-border:solid.round.shadow="{width: '5px', color: 'red'}">Home</p>
    <!-- フィルターを使用 -->
    <!-- {{ data名 | フィルター名}} -->
    <h2>{{ title | upperCase }}</h2>
    <!-- computedとは違い、何度も別の場所で使用できる -->
    <!-- フィルターは複数使用することも可能 -->
    <!-- 対になっている場合は後のフィルターがかぶせるように適用される -->
    <p>{{ subtitle | upperCase }}</p>
    <!-- ローカルで作成したフィルターを使用 -->
    <p>{{ comment | lowerCase }}</p>
    <!-- ボタン機能など再描画があるたびにフィルターは実行される(computed)との違い -->
    <!-- 再描画が多いページなどではなるべくcomputedを使うべき -->
    <p>{{ number }}</p>
    <button @click="number++">+1</button>
    <CountNumber></CountNumber>
  </div>
</template>

<script>
import CountNumber from "./CountNumber.vue";
import { tokyoNumber } from "@/tokyoNumber.js";

export default {
  mixins: [tokyoNumber],
  components: {
    CountNumber
  },
  // 例えばサブタイトルも大文字にしたいとなった時、
  // computedでは改めてサブタイトルようにupperCaseを定義しなければならない
  // computedは引数をとることができない
  // filterと比べてぱパフォーマンスはcomputedの方が高い
  //computed: {
    //upperCaseTitle() {
      //return this.title.toUpperCase();
    //}
  //},
  // filter内ではthisは使用できない
  // 使う必要があるのであればcomputedで記載する
  //filters: {
    //lowerCase(value) {
      //return value.toLowerCase();
    //}
  //},
  // directivesのなかにカスタムディレクティブをローカルに登録
  // 定義したコンポーネントのみで使える
  // カスタムディレクティブの中ではthisを使うことはできないので注意
  directives: {
    border(el, binding) {
      el.style.borderWidth = binding.value.width;
      el.style.borderColor = binding.value.color;
      el.style.borderStyle = binding.arg;
      if (binding.modifiers.round) {
        el.style.borderRadius = "0.5rem";
      }
      if (binding.modifiers.shadow) {
        el.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.26)";
      }
    }
  }
}
</script>