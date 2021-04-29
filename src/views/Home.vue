<template>
  <div>
    <h3>Home</h3>
    <!-- javascriptでページを遷移する方法 -->
    <button @click="toUsers">Usersのページへいく</button>
  </div>
</template>

<script>
export default {
  methods: {
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