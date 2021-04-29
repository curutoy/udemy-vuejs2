import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from './views/Home.vue'
// import Users from './views/Users.vue'
// import UsersPost from './views/UsersPost.vue'
// import UsersProfile from './views/UsersProfile.vue'
// import HeaderHome from './views/HeaderHome.vue'
// import HeaderUsers from './views/HeaderUsers.vue'

// 遅延ローディング
// importが多すぎるとシングルページ特有の最初の読み込みが遅くなる
// vueCLIのもつwebpackを用いて必要な時に読み込む作業を行う
// 動的インポートを使用する
// コメントでwebpackChunkName:と名前を指定することでNetworkに表示される名前がわかりやすくなる
// この書き方をすることでheadに全てのリンクが入り、prefetchがつく
// prefetch:次に必要になりそうなものを暇な時に取ってキャッシュに置いておく(最初のローディングで全て取るわけではない)
// vueCLI３は必要そうなものの対象は全て
const Home = () => import(/* webpackChunkName: "Home" */'./views/Home.vue');
const Users = () => import(/* webpackChunkName: "Users" */'./views/Users.vue');
const UsersPost = () => import(/* webpackChunkName: 'UsersPost' */'./views/UsersPost.vue');
const UsersProfile = () => import(/* webpackChunkName: 'UsersProfile' */'./views/UsersProfile.vue');
const HeaderHome = () => import(/* webpackChunkName: 'HeaderHome' */'./views/HeaderHome.vue');
const HeaderUsers = () => import(/* webpackChunkName: 'HeaderUsers' */'./views/HeaderUsers.vue'); 

// Vue.use:プラグインを適用する
// プラグイン:グローバルな機能を提供するもの。Vue.js全体に影響を与えるようなもの
Vue.use(VueRouter)

// VueRouterの中身をVue.jsに適用させるためexport defaultを書く
// Routerの中身はオブジェクトでかく
export default new VueRouter({
  // デフォルトはhashモードなので、URLの末尾に#がつく
  // #は不必要にサーバーにアクセスしてしまわないためのもの
  // historyモードにすることで#はきえる
  // #がなくなったURLでもindex.htmlにアクセスする
  mode: 'history',
  // routesは配列で定義
  // URLとコンポーネントをマッチングさせる
  // 動的なURLにしたい場合、/:を使用する
  // props:trueとすることで:idがpropsとして渡される
  // 自分で定義したURLにnameで名前をつける頃ができる
  // １つのURLに対してコンポーネントを２つ設定する場合はcomponentを複数形にする
  // defaultとrouter-viewでnameに設定したものを定義
  routes: [{ path: '/',
             components: {
               default: Home,
               header: HeaderHome
             },
             // 特定のページへ遷移する際に行うナビゲーションガード
             // beforeEnter:上記のpathになる前に実行する
             //beforeEnter(to, from, next) {
               //next(false);
             //}
            },
           { path: '/users/:id',
             components: {
               default: Users,
               header: HeaderUsers
             },
             // 名前付きのrouter-viewを使用する場合はpropsはオブジェクトにする必要がある
             props: {
               default: true,
               header: false
             },
             // childrenを記載することで、動的コンポーネント内に動的コンポーネントを作れる
             // childrenで指定するpathは先で指定しているusers/:idに続くURLであるため、
             // /は頭につかない部分に注意が必要
             // name: 'users-id-profile'は/users/:id/profileに対する名前
             children: [
               { path: 'posts', component: UsersPost },
               { path: 'profile', component: UsersProfile, name: 'users-id-profile' }
             ]
          },
          {
            // helloというpathがきたらredirecする
            // *は全てという意味。上記に当てはまらないURLは全て/にリダイレクトする
            path: '*', redirect: '/'
          }
        ],
        // スクロールをできる様にするための関数
        // 最初のリロード以外でURLが変更された時に実行される
        // transitionがある時とないときでコードが変わる
        // scrollBehaviorは３つ引数を取ることができる
        scrollBehavior(to, from, savedPosition) {
          // scrollBehaviorを実行スイッチがApp.vueで押されたら、非同期処理行う
          // Promise:非同期処理
          // 第一引数resolve内に処理内容を書く
          //return new Promise(resolve => {
            // thisはこのインスタンスのこと
            // new VueRouterではthisの中にappwp持つことができる
            // this.appは挿入されたmain.js内のnew Vueインスタンスのことを示す
            // $onの引数は第一引数にカスタムイベント名、第二引数にその処理内容を書く
            // this.appで示したVueインスタンスに対して何かemitされた時にそのemitの内容を$on/$onceを使って書く
            //this.app.$root.$once('toriggerScroll', () => {
              //let position = { x: 0, y: 0 };
              //if (savedPosition) {
                //position =  savedPosition;
              //}
              //if (to.hash) {
                //console.log(to.hash);
                //position = {
                  //selector: to.hash,
                //};
              //}
              //if (from.hash) {
                //position = {
                  //selector: from.hash,
                //};
              //}
              //resolve(position);
            //});
          //});
          // toとfromにはスクロール前と後の情報が入る
          // savedPositionは戻るをした時に、同じポジションをキープしていたい時に前のポジションを記録してくれる
          if (savedPosition) {
            return savedPosition
          }
          if (to.hash) {
            return {
              selector: to.hash,
            };
          }
          if (from.hash) {
            console.log('from');
          }
          return {
            // selectorで#以降を指定することでスクロールが可能になる
            selector: '#next-user',
            // offsetを指定することで、スクロールした要素がどの位置に来るか指定できる
            offset: { x: 0, y: 100 }
          };
          // x軸とy軸を指定する。この場合は100px下がった位置が表示される様になる
          // return { x: 0, y: 100 };
        }
});


 