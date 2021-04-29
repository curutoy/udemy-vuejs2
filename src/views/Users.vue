<template>
  <div>
    <h3>Users</h3>
    <hr>
    <!-- パラメーターが変わっているだけなので、ライフサイクルフック関数は呼ばれていない -->
    <!-- 同じコンポーネントが使いまわされている -->
    <!-- 何か処理をしたい時、パラメーターが変わっても処理は実行されないので注意 -->
    <router-link to="/users/1">ユーザー１</router-link>
    <router-link to="/users/2">ユーザー２</router-link>
    <!-- $routeはvue-routerが提供しているもの -->
    <!-- ナビゲーションの現在の状況の情報が入っている -->
    <!-- 今回は:idとしたので、idを指定する -->
    <!-- <h1>User No. {{ $route.params.id }}</h1> -->
    <!-- 上記の書き方だと、routerに影響を受けているため、他でコンポーネントとして使う時に -->
    <!-- 柔軟なコンポーネントならず、再利用性が悪い -->
    <!-- 違うところでUsers.vueを使いたい時、routerに影響されずコンポーネントが使える -->
    <h1>User No. {{ id }}</h1>
    <!-- 動的なURLを示す場合は、v-bindを用いる -->
    <!-- idはそのままだとstringになってしまうので、明示的に数字とする -->
    <router-link :to="'/users/' + (Number(id) + 1) + '/profile'">次のユーザー</router-link>
    <!-- 上記と同じ意味。router.jsで付けた名前を使用する -->
    <!-- paramsでidを指定してあげる。今後profileの後に動的なURLがつく可能性もあるため、オブジェクトで記載 -->
    <!-- パラメーターを使うときはpathは使用できない。nameを使う -->
    <!-- クエリを指定することもできる -->
    <!-- 指定する際は、query: {lang: 'ja', page: 2}などとオブジェクトを書くとprofileのあとのURLにつく -->
    <!-- クエリはnameなしでpathの場合も指定できる -->
    <router-view></router-view>
    <div style="height: 700px;"></div>
    <!-- スクロール機能をつけるとき、hashを使って指定することができる -->
    <!-- vue-routerはスクロールの挙動を手動で決める必要がある -->
    <!-- コンポーネントを切り替える際にブラウザの挙動を止めているために起こる現象 -->
    <router-link id="next-user" :to="{ name: 'users-id-profile', params: {id: Number(id) + 1}, hash: '#next-user' }">次のユーザー</router-link>
  </div>
</template>

<script>
export default {
  // router.jsでprops:trueを指定したので、定義する
  props: ["id"],
  // ルートコンポーネントであればナビゲーションガードをつけることができる
  // 細かく分かれていたり、thisも使えるので便利
  beforeRouteEnter(to, from, next) {
    // Users.vueが作成される前に実行される
    console.log("beforeRouteEnter");
    // ここではthisを使えないが、next内でvmを用いて書くことができる
    next(vm => {
      // thisでvueインスタンスにアクセスできる様になった時に実行される非同期的なもの
      console.log(vm.id);
    });
  },
  beforeRouteUpdate(to, from, next) {
    // URLは変わるが、createdなど実行されない時。パラメータに変更があった時
    console.log("beforeRouteUpdate");
    next()
  },
  beforeRouteLeave(to, from, next) {
    // 別のコンポーネントに遷移する時に使われる
    console.log("beforeRouteLeave");
    const isLeave = window.confirm("本当にこのページを離れますか？");
    if (isLeave) {
      next();
    } else {
      next(false);
    }
  }
  // watchを使うことで、パラメータに変更があった時に処理が実行されない問題に対処できる
  //watch: {
    // watchには引数を二つ取ることができ、
    // 今のオブジェクトと１つ前のオブジェクトを取得することができる
    //$route(to, from) {
      //console.log(to);
      //console.log(from);
    //}
  //}
}
</script>