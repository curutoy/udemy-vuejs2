import Vue from 'vue';
//コンポーネントのオブジェクトをインポート
//./App.vueに書かれている内容がオブジェクトとしてAppにインポートされている
//vueファイル：インポートをしたら最終的にコンポーネントのオブジェクトになるのが
import App from './App.vue';
import LikeNumber from './components/LikeNumber.vue';
//  Routerを使えるようにする
import router from './router'

Vue.config.productionTip = false;

// ナビゲーションガード(本来する処理を防ぎたい)
// beforeEach:全てのページ遷移前に実行。中身に引数を３つ持つ関数を持つ
// to,fromにはrootオブジェクト($root)が入る。前と後のrootの状態
// ログイン処理ができていない時にログインページに行く時などに使う
//router.beforeEach((to, from, next) => {
  // nextは関数としておく必要がある。nextがないと次のページへ進めない
  // nextの引数にfalseを入れるとページの遷移をしない設定になる
  // 引数にpathを入れることもできる。基本ifと使う
  // 何もなしは続行
  //if (to.path === '/users/1') {
    // next({ path: '/' })とオブジェクトで書くことも可能
    //next('/')
  //}
  //next();
//})

//インポートしたLikeNumberをグローバル登録
Vue.component('LikeNumber', LikeNumber);

// カスタムディレクティブをグローバルに登録
// 下記のフック関数のうち、記載するのがbindとupdateのみだった場合、
// functionに省略して記載することができる
// functionはel, binding, vnode, oldVnodeを引数にもつ
// よく使用される引数はel,binding
//Vue.directive('border', function(el, binding) {
// el:カスタムディレクティブが紐づくHTML要素。特定の要素を示してDOMを操作する
// 今回は<p v-border>Home</p>なのでp要素
// el.style.border = "solid black 2px";
// bindingにはいろいろな機能がある
// binding.valueでdataを受け取れる
// 受け取るデータが複数ある場合はbinding.valueの後に指定する
//el.style.borderWidth = binding.value.width;
//el.style.borderColor = binding.value.color;
// argは引数という意味
//el.style.borderStyle = binding.arg;
// 修飾子が選択されているかどうか
// binding.modifiers.roundはtrueかfalseを返す
// modifiers:修飾子の複数形
//f (binding.modifiers.round) {
//el.style.borderRadius = "0.5rem";
//}
//if (binding.modifiers.shadow) {
//el.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.26)";
//}
//});
//{
// ５つのフック関数を持つ(実際の定義は１つだけでもOK)
// ディレクティブがプロセスを追う中でどのタイミングで実行したいか
// コンポーネントでいうライフサイクルフックと同じようなもの
// 全てのフック関数は引数をとることができる
// フック関数は基本el, binding, vnodeの３つの引数を持つ
// よく使うフック関数はbind,update
// bindとupdateで行う処理は同じであることが多いため、関数で表現もできる
//bind(el, binding, vnode) {
// ディレクティブが初めて対象の要素に紐づいたとき
// 最初の一回のみ呼ばれる
// 今回の例だと、v-borderが初めてpタグに紐づいた時に呼ばれる
//},
//inserted(el, binding, vnode) {
// 親Nodeに挿入された時
// DOMに実際に導入された時
//},
// updateとcomponentUpdatedは, oldVnodeももつ
//update(el, binding, vnode, oldVnode) {
// コンポーネントが更新される度。子コンポーネントが更新される前
// 今回の例だと、Home.vueが更新される度
// 親コンポーネントからdataを受け取る際、
// 親コンポーネントのdataが更新された場合に子コンポーネントのVNodeが変更されていない状態
//},
//componentUpdated(el, binding, vnode, oldVnode) {
// コンポーネントが更新される度。子コンポーネントが更新された後
// 今回の例だと、Home.vueが更新される度
// 親コンポーネントからdataを受け取る際、
// 親コンポーネントのdataが更新された場合に子コンポーネントのVNodeが変更されている状態
//},
//unbind(el, binding, vnode) {
// ディレクティブが紐づいている要素から取り除かれた時
// コンポーネントにおけるdestroyed
//}
//})

// filter:テキストをフォーマットするツール
// 第一引数はfilterの名前
// 第二引数は関数。必ず引数をとる
Vue.filter("upperCase", function(value) {
  return value.toUpperCase();
});

// グローバルミックスイン
// 名前は持たず、オブジェクト形式で書く
// 全てのVueインスタンスに定義したオプションがマージされてしまう
// グローバルミックスインを使用するのは荒らしてしまう可能性があるので注意が必要
Vue.mixin({
  created() {
    console.log('grobal mixin');
  }
})

//console.log(App);で確認すると
//オブジェクトがたくさん入っている

new Vue({
  // Vue.useしていることでrouterというkeyが使えるようになっている
  // router: routerと同じ意味
  router,
  // 引数にオブジェクトをとることもできる
  // 上記と同じ意味
  // render: function(h) {
  // return h(App)
  //}
  render: h => h(App)
}).$mount('#app')
