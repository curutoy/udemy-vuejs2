<!-- App.vueのみで使えるローカルコンポーネントとする -->
<template>
  <div>
    <!-- slot:HTMLタグを含むdataの受け口 -->
    <!-- slotをおくことで、親コンポーネントのLikeHeaderで囲んでいるHTMLを受け取ることができる -->
    <!-- 名前付きslot複数のslotを別々に表示させたいとき、name属性で親コンポーネントで定義した名前を指定 -->
    <!-- どうしても子コンポーネントで定義したdataを使いたいときはv-bind:適当な名前="dataの名前"とする -->
    <slot name="title" v-bind:user="user">
      <!-- フォールバックコンテンツ -->
      <!-- 親コンポーネント内でLikeHeaderに何も定義されなかった場合、slotのなかに定義したものが表示される -->
    </slot>
    <!-- デフォルトスロット:親コンポーネントでtemplate以外に書かれたテンプレートが反映される -->
    <!-- slot name="default"と同じ意味 -->
    <slot></slot>
    <hr>
    <p>いいねの数</p>
    <!-- 複数のslotを定義することも可能 -->
    <slot name="number"></slot>
    <p>{{ headerText }}</p>
  </div>
</template>

<script>
export default {
  // 親コンポーネントでtextを定義して子コンポーネントで表示する
  props: ["headerText"],
  data() {
    return {
      user: {
        firstName: 'Jack',
        lastName: 'Donald'
      }
    }
  }
};
</script>

<style scoped>
  /* cssは子コンポーネントでも親コンポーネントに反映できる */
  /* 親コンポーネントと子コンポーネントのそれぞれの属性がついているため */
  h1 {
    color: red;
  }
</style>