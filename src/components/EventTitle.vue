<template>
  <div>
    <label for="title">タイトル</label>
    <!-- v-modelで指定するものはdataに指定しているプロパティであればなんでもOK -->
    <!-- v-modelの中身は、:value="eventData.title" @input="eventData.title = $event.target.value"と同じ意味 --> 
    <!-- dataでオバジェクトを指定し、.でつなげる -->
    <!-- lazy修飾子をつけると、すぐに反映せずフォーカスが外れた時に反映する -->
    <!-- lazyなしだとinputで発火、lazyをつけるとchangeで発火するため -->
    <!-- <input id="title" type="text" v-model.lazy="eventData.title"> -->
    <!-- 親コンポーネントから受け取ったvalueを反映させる -->
    <!-- 子から親へイベントを発火させるときは$emitを使用する -->
    <!-- $emitの第二引数にdataを入れて親コンポーネントへdataを受け渡す-->
    <!-- 第二引数には、inputで入力された値を入れたい -->
    <!-- ネイティブで提供しているeventの情報を$eventで受け取ることができる -->
    <input id="title" type="text" :value="value" @input="$emit('input', $event.target.value)">
    <p>{{ value }}</p>
  </div>
</template>

<script>
export default {
  // dataの受け取り口を作る
  props: ["value"]
}
</script>