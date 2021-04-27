<template>
  <!-- templateの中身は１つのroot要素でなければならない -->
  <!-- 1つのdivタブの中に全て入れればOK -->
  <div>
    <p>いいね({{ halfNumber }})</p>
    <!-- クリックした瞬間に$emitが発火する -->
    <button @click="increment">+1</button>
  </div>
</template>

<script>
// export defaultで囲むことで外部からも参照することができる
export default {
  // props:親コンポーネントから子コンポーネントにdataを渡す際の受け口
  // 子コンポーネントでpropsを定義
  // propsは配列で定義
  // numberの部分はプロパティ名
  // propsのプロパティ名はキャメルケースとケバブケースで書くことだできる
  // props: ['totalNumber'],
  // propsはオブジェクトでも書くことができる
  props: {
    // valueには型を書く(型が異なる場合はvalidationの警告が表示される)
    // エラーの早期発見のためにも型を指定しておくと便利
    // totalNumber: Number
    // 型以外にも指定したいときはオブジェクトで書く
    totalNumber: {
      type: Number,
      // totalNumberが必須の場合
      // required: true,
      // 何も指定しなかったときに表示するもの→requiredとは共存できない
      // defaultがオブジェクトや配列の場合は関数にする
      default: 10
    }
  },
  // propsはdataと同じようにscriptの中でも使うことができる
  computed: {
    halfNumber() {
      return this.totalNumber / 2
    }
  },
  methods: {
    increment() {
      // 子コンポーネントから親コンポーネントへdataを渡す際の送り口
      // $emitは子コンポーネントの好きなタイミングで親コンポーネントのメソッドを発火できるもの
      // $emitはカスタムイベントを作るもの
      // 親コンポーネントにしてしてある式を実行できる
      // 第一引数はdataの名前
      // 第二引数はdataの内容
      // 子コンポーネントは親コンポーネントのdataを変えられないので、
      // this.totalNumber += 1では親コンポーネントの値が変わらない
      // イベント名はケバブケースで書く
      // javascriptで呼び出すことがないので、htmlでの呼び出しに対応させる
      this.$emit("my-click", this.totalNumber + 1);
    }
  }
};
</script>

<!-- style属性のなかにdivタグを書くと、全てのdivタグに適用されてしまう -->
<!-- scopedを追記することで、コンポーネントのtemplate内にあるdivタグのみに適用 -->
<!-- scopedは範囲を指定する役割がある -->
<style scoped>
div {
  border: 1px solid red;
}
</style>
