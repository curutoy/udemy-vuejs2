<template>
  <div>
    <router-view></router-view>
    <!-- App.vueが親コンポーネント -->
    <!-- LikeHeader,LikeNumberは子コンポーネント -->
    <!-- LikeHeaderはローカル登録なので、App.vueでしか使えない -->
    <!-- ケバブケースlike-headerでも表示できる -->
    <!-- もしtemplateがdefaultのみの時にslotプロパティを指定したい場合は、 -->
    <!-- コンポーネントLikeHeaderにv-slot="slotプロパティ名"を記載する -->
    <!-- コンポーネントにslotプロパティを書く場合はv-slotをそのまま#に省略できず、 -->
    <!-- #default="slotプロパティ名"とする -->
    <LikeHeader header-text="hello">
      <!-- slot:親コンポーネントから子コンポーネントへHTMLタグを含んだdataを渡すことができる -->
      <!-- 別々のslotに反映したい場合はtemplateで囲み、v-slotを使用する -->
      <!-- 他のslotと差別化するために名前を第一引数につける -->
      <!-- template以外では名前付きslotを使えない-->
      <!-- 子コンポーネント内のdataを使用するには、v-slot:title=の後に属性値slotプロパティ(適当な名前)をおく -->
      <!-- v-slot:名前が動的な場合、をv-slot:[title]とし、titleをdataで定義することもできる -->
      <!-- v-slo:tは#に置き換え可能 -->
      <template #[title]="slotProps">
        <h1>トータルのいいね数</h1>
        <!-- slotプロパティを指定することでtemplate内でそのslotプロパティを使うことができる -->
        <h2>{{ slotProps.user.firstName }}</h2>
      </template>
      <!-- 名前付きslotをしていないテンプレートはデフォルトslotに反映される --> 
      <!-- template v-slot:defaultを自動で作られて、離れたところに書いていても合体をして渡す -->
      <h3>こんにちは</h3>
      <p>初めまして</p>
      <!-- numberはApp.vue内に書かれているdataを参照する -->
      <!-- この中のdataを子コンポーネントで定義することは基本しない -->
      <template v-slot:number>
        <p>{{ number }}</p>
      </template> 
    </LikeHeader>
    <!-- グローバル登録したため、どこでもLikeNumberが使える -->
    <!-- propsのプロパティを属性として定義  -->
    <!-- :total-number="number"の部分はdataの送り口 -->
    <!-- 動的に定義するためにv-bindを用いる -->
    <!-- =の後にはApp.vue内のdataの値を取ってくる -->
    <!-- htmlには大文字と小文字の区別がつかない -->
    <!-- プロパティ名はキャメルケースとケバブケースのどちらかでかく -->
    <!-- なるべくケバブケースで書くべき -->
    <!-- v-on:my-click="$event"は子コンポーネントから親コンポーネントへdataを送る際の受け口 -->
    <!-- $eventは受け取ったdataを示す -->
    <!-- <LikeNumber :total-number="number" v-on:my-click="number = $event"></LikeNumber> -->
    <!-- メソッドをおくこともできる。その場合はメソッドを定義 -->
    <LikeNumber :total-number="number" v-on:my-click="incrementNumber"></LikeNumber>
    <button @click="currentComponent = 'Home'">Home</button>
    <button @click="currentComponent = 'About'">About</button>
    <!-- 動的コンポーネントは他のコンポーネントに切り替わるたびにcreateとdestroyが起こるため、 -->
    <!-- 入力した内容が消えてしまったりする -->
    <!-- それを防ぐのがkeep-alive -->
    <keep-alive>
      <!-- コンポーネントを動的に帰る場合はcomponentで囲み、v-bind:isを使用する -->
      <component :is="currentComponent"></component>
    </keep-alive>
    <div style="padding: 10rem;">
      <h2>イベントのタイトル</h2>
      <!-- コンポーネントにv-modelを記載する -->
      <EventTitle v-model="eventData.title"></EventTitle>
      <!-- 上の意味を書き換えdataを子コンポーネントへ受け渡し -->
      <!-- $eventで子コンポーネント$emitのdataを受け取る -->
      <!-- 上記式は下記式と同じ意味 -->
      <!-- <EventTitle :value="eventData.title" @input="eventData.title = $event"></EventTitle> -->
      <label for="maxNumber">最大人数</label>
      <!-- htmlの性質上、typeをnumberで指定しても初期値以外はstringとなってしまう --> 
      <!-- number修飾子を付与することで初期値以外もnumberとなる -->
      <input id="maxNumber" type="number" v-model.number="eventData.maxNumber">
      <p>{{ eventData.maxNumber }}</p>
      <label for="host">主催者</label>
       <!-- trim修飾子を付与することで前後の空白を削除する -->
      <input id="host" type="text" v-model.trim="eventData.host">
      <p>{{ eventData.host }}</p>
      <label for="detail">イベントの内容</label>
      <textarea id="" cols="30" rows="10" v-model="eventData.detail"></textarea>
      <!-- 複数行の改行を行うためにstyle="white-space: pre;"を記載する -->
      <p style="white-space: pre;">{{ eventData.detail }}</p>
      <!-- checkboxの選択肢がいつの場合は通常通りv-modelを使用する --> 
      <input type="checkbox" id="isPrivate" v-model="eventData.isPrivate">
      <label for="isPrivate">非公開</label>
      <p>{{ eventData.isPrivate }}</p>
      <p>参加条件</p>
      <!-- checkboxが複数選択の場合、v-modelは全て同じ名前を指定する -->
      <input type="checkbox" id="10" value="10代" v-model="eventData.target">
      <label for="10">10代</label>
      <input type="checkbox" id="20" value="20代" v-model="eventData.target">
      <label for="20">20代</label>
      <input type="checkbox" id="30" value="30代" v-model="eventData.target">
      <label for="30">30代</label>
      <p>{{ eventData.target }}</p>
      <p>参加費</p>
      <!-- ラジオボタンの場合、v-modelに同じdataを指定する -->
      <input type="radio" id="free" value="無料" v-model="eventData.price">
      <label for="free">無料</label>
      <input type="radio" id="paid" value="有料" v-model="eventData.price">
      <label for="paid">有料</label>
      <p>開催場所</p>
      <!-- selectboxの場合は、selectタグにv-modelを指定する -->
      <!-- 複数選択としたい場合は、multipleを付与する -->
      <select v-model="eventData.location" multiple>
        <option v-for="location in locations" :key="location">{{ location }}</option>
      </select>
      <p>{{ eventData.location }}</p>
    </div>

    <div class="main">
      <button @click="myAnimation = 'slide'">Slide</button>
      <button @click="myAnimation = 'fade'">Fade</button>
      <p>{{ myAnimation }}</p>
      <!-- トランジション -->
      <!-- transitionを繰り返し使いたいときは、コンポーネントを作成しslotをつけるのが慣習 -->
      <button @click="show = !show">切り替え</button>
      <!-- 現れる要素と消える要素は通常重なってしまっている -->
      <!-- 現れる要素と消える要素の設定をずらすのがmode属性 -->
      <!-- よく使われるのはout-in:要素が消えてから次の要素に切り替わる -->
      <transition name="fade" mode="out-in">
        <!-- v-showは切り替えには使えない。複数存在してしまうことになるため -->
        <!-- 同じタグが複数ある場合、中身のみを切り替えるためtransitionが適用されない -->
        <!-- transitionはタグが変わった時にtransitionさせる設定になっている -->
        <!-- key属性をつけることで同じタグでも区別することができる -->
        <p v-if="show" key="bye">さよなら</p>
        <p v-if="!show" key="hello">こんにちは</p>
      </transition>
      <!-- transitionの中身は基本的に単一要素のみ -->
      <!-- nameを付与(付けないとデフォルトでname="v"となる) -->
      <!-- 直接enter,leaveのクラスを書き、上書きができる -->
      <!-- ""の中に書いたものがクラスメイトなるが、存在しないクラスを書くと無視される -->
      <!-- Animate.cssを使用する際はanimatedを記載する。ずっと適用されているactive-classに付ける -->
      <transition 
        name="fade"
        enter-class=""
        enter-active-class="animate__animated animate__bounce"
        enter-to-class=""
        leave-class=""
        leave-active-class="animate__animated animate__shakeX"
        leave-to-class=""
        appear
      >
        <p v-if="show">hello</p>
      </transition>
      <!-- typeを指定することでtransitionの時間がズレていても揃えてくれる -->
      <!-- animationとtransitionどちらに合わせるのかを明示的に書く必要がある -->
      <!-- appearを記載することで、リロードした時など初期描画でもアニメーションが行われる -->
      <!-- v-bindを使用することでname属性を動的に扱うこともできる -->
      <transition 
        :name="myAnimation"
        appear
      >
        <!-- transitionは単一要素しか持つことができないため、 -->
        <!-- 複数要素に反映したい場合はdivで括って、divにv-ifをつける -->
          <p v-if="show">bye</p>
      </transition>
      <!-- 動的コンポーネントを滑らかに切り替える -->
      <button @click="myComponent = 'ComponentA'">ComponentA</button>
      <button @click="myComponent = 'ComponentB'">ComponentB</button>
      <transition name="fade" mode="out-in">
        <componet :is="myComponent"></componet> 
      </transition>
      <!-- javascriptを使ってアニメーションを行う -->
      <!-- transitionは８個のjavascriptフックを持っている -->
      <!-- cssは使わずjavascriptのみでアニメーションを行うよと明示する場合は:css="false"を用いる -->
      <!-- これを使うことでcssを読み込まないため処理も早くなる -->
      <!-- @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @enter-cancelled="enterCancelled"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
        @leave-cancelled="leaveCancelled" -->
      <transition
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <div class="circle" v-if="show"></div>
      </transition>

      <!-- transition-group -->
      <button @click="add">追加</button>
      <ul style="width: 200px; margin: auto;">
        <transition-group name="fade">
          <!-- transition-groupはtransitionとの違い -->
          <!-- 必ずkey属性が必要 -->
          <!-- 複数の要素に対して使うことができる -->
          <!-- spanタグになる(transitionはtemplateタグ) tag="div"などをつけることで変更可能 -->
          <!-- transitionモードがない(置き換わるという概念がないため) -->
          <!-- v-mode-classが存在する。動きがスムーズではないため -->
          <li
            style="cursor: pointer;"
            v-for="(numeral, i) in numerals"
            @click="remove(i)"
            :key="numeral"
          >{{ numeral }}</li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script>
import LikeHeader from "./components/LikeHeader.vue"
import Home from "./components/Home.vue"
import About from "./components/About.vue"
import EventTitle from "./components/EventTitle.vue"
import ComponentA from "./components/ComponentA.vue"
import ComponentB from "./components/ComponentB.vue"

// 使う側でもインポートしたうえで、
// コンポーネントをexport defaultを用いてtemplate内で使えるようにする
export default {
  data() {
    return {
      number: 14,
      title: "title",
      currentComponent: "Home",
      locations: ['東京', '大阪', '名古屋'],
      eventData: {
        title: "",
        maxNumber: 0,
        host: "",
        detail: "",
        isPrivate: false,
        // 複数選択の場合は配列で指定
        target: [],
        price: "無料",
        // 複数選択とする場合は、配列にする
        location: [],
      },
      show: true,
      myAnimation: "slide",
      myComponent: "ComponentA",
      numerals: [0, 1, 2],
      nextNumber: 3
    };
  },
  components: {
    // keyとvalueが同じときは短縮して書くことができる
    // ES6ではLikeHeader: LikeHeader
    LikeHeader,
    Home,
    About,
    EventTitle,
    ComponentA,
    ComponentB
  },
  methods: {
    // メソッドに引数を指定することで、その引数に子コンポーネント$emitの代理引数が当てはまる
    incrementNumber(value) {
      this.number = value
    },
    randomIndex() {
      // floorは少数を切り捨てて、整数だけを返すもの
      return Math.floor(Math.random() * this.numerals.length);
    },
    add() {
      // splice: ３つ引数をとる。どこに追加するか、そこの場所を削除するか、そこに何を入れるか
      this.numerals.splice(this.randomIndex(), 0, this.nextNumber)
      this.nextNumber += 1;
    },
    remove(index) {
      this.numerals.splice(index, 1)
    },
    // javascriptでアニメーションを行う時の８つのmethods
    // javascriptのアニメーションはcssと組み合わせることができる
    // 引数にはel(HTMLの要素)が入る
    // enterとleaveのみdoneという引数もとる
    // doneは関数として使う。
    // アニメーションが終わったことをvueに教える役割。非同期処理に使う。
    // ただし。cssと組み合わせて使用するときはどちらでもOK 
    // cssとアニメーションがかぶるとき、基本的には長い方が終わったところでDOMは終了するが、
    // doneがあるときは、強制的にcssの方も終了される
    beforeEnter(el) {
      // 現れる前
      el.style.transform = 'scale(0)';
    },
    enter(el, done) {
      // 現れる時(ずっと)
      let scale = 0;
      const interval = setInterval(() => {
        el.style.transform = `scale(${scale})`;
        scale += 0.1;
        if (scale > 1) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    //afterEnter(el) {
      // 現れた後
    //},
    //entercancelled(el) {
      // 現れたアニメーションがキャンセルされた時
    //},
    //beforeLeave(el) {
      // 消える前
    //},
    leave(el, done) {
      // 消える時
      let scale = 1;
      const interval = setInterval(() => {
        el.style.transform = `scale(${scale})`;
        scale -= 0.1
        if (scale < 0) {
          clearInterval(interval);
          done();
        }
      }, 20);
    }
    //afterLeave(el) {
      // 消えた後
    //},
    //leaveCancelled(el) {
      // 消えるアニメーションがキャンセルされた時
      // leaveCancelledはv-showと一緒に使う時のみ有効
    //},
  }
};
</script>

<style scoped>
.fade-move {
  transition: transform 1s;
}
/* 6つのトランジションクラスを用意する */
/* vueが適切なタイミングでクラスを付けたり消したりすることでアニメーションが起こる */
.fade-enter {
  /* 現れる時の最初の状態 */
  /* 要素がtrueからfalseに変わる瞬間に要素に追加する */
  /* v-enterはすぐに削除される */
  opacity: 0;

}
.fade-enter-active {
  /* 現れる時のトランジションの状態 */
  /* 何秒でどんなふうにアニメーションが起こるのか */
  /* 要素がtrueからfalseに変わる瞬間に要素に追加する */
  /* DOMが終了のイベントを受け取ったタイミングで削除される */
  transition: opacity 0.5s;
}
.fade-enter-to {
  /* 現れる時の最後の状態 */
  /* v-enterが削除されたタイミングでv-enter-toが追加される */
  /* DOMが終了のイベントを受け取ったタイミングで削除される */
  opacity: 1;
}
.fade-leave {
  /* 消える時の最初の状態 */
  opacity: 1;
}
.fade-leave-active {
  /* 消える時のトランジションの状態 */
  /* 何秒でどんなふうにアニメーションが起こるのか */
  transition: opacity 0.5s;
  position: absolute;

}
.fade-leave-to {
  /* 消える時の最後の状態 */
  opacity: 0;
}
/* cssアニメーションで定義しているのでactive以外は不要 */
.slide-enter,
.slide-leave-to {
  opacity: 0;
}
.slide-enter-active{
  /* 通常時間が連れていると削除されるまでの時間は長い方が適用される */
  animation: slide-in 0.5s;
  transition: opacity 3s;
}
.slide-leave-active{
  animation: slide-in 0.5s reverse;
  transition: opacity 3s;
}
.slide-enter-to,
.slide-leave {
  opacity: 1;
}
/* cssアニメーション */
/* 細かくタイムんぐを指定することができる */
/* from,toの部分は%で書いてもOK */
@keyframes slide-in {
  from {
    transform: translateX(100px);
  }
  to {
    transform: translateX(0);
  }
}
div {
  border: 1px solid blue;
}
.main {
  width: 70%;
  margin: auto;
  padding-top: 5rem;
  padding-bottom: 5rem;
  text-align: center;
}
.circle {
  width: 200px;
  height: 200px;
  margin: auto;
  border-radius: 100px;
  background-color: deeppink;
}
</style>

<!-- DOMテンプレート内ではケバブケースで記載しないといけない -->
<!-- DOMテンプレートとは、htmlに直接書かれているdiv id="app"~のテンプレートのこと -->

<!-- cssアニメーションとjavascriptでのアニメーションが両方適用されている時の順番 -->
<!-- 1.j:beforeEnter -->
<!-- 2.c:v-enter,v-enter-active追加 -->
<!-- 3.j:enter -->
<!-- 4.c:v-enter削除,v-enter-to追加 -->
<!-- 5.c:v-enter-active,v-enter-to削除 -->
<!-- 6.j:afterEnter -->