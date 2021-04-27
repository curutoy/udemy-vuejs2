<template>
  <div>
    <h2>{{ title | upperCase }}</h2>
    <p>{{ subtitle | upperCase }}</p>
    <p>{{ comment | lowerCase }}</p>
    <p>{{ number }}</p>
    <button @click="number++">+1</button>
  </div>
</template>

<script>
// Vue CLIに限り、srcの部分を@に変えて記載することができる
// js側で定義したexport const tokyoNumberをimport
import { tokyoNumber } from "@/tokyoNumber"

export default {
  // mixinsは配列
  // mixinとコンポーネントにオプションが被ってしまったときは、
  // コンポーネントが優先される
  mixins: [tokyoNumber],
  created() {
    // mixinのcreatedが実行された後に実行される
    // ライフサイクルフックがmixinとコンポーネントの両方にあった場合は
    // 両方実行される。mixinが先(他はコンポーネントが優先されるのに対し)
    console.log('created in component')
  }
};
</script>