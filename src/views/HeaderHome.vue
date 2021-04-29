<template>
  <div id="nav">
    <h2>Home</h2>
    <!-- aタグにすると毎回サーバにアクセスするのに対し -->
    <!-- router-linkだとアクセスせずに切り替えが行われる -->
    <!-- rooter link はtoを使う -->
    <!-- tagを定義して、aタグから他のタグへ変更させることもできる -->
    <!-- active-class属性：特定のlinkがアクティブな時にclassをつける -->
    <!-- アクティブな時とは：urlが存在する時(Homeはずっとアクティブになってしまう) -->
    <!-- exact属性をつけると完全にマッチしたものを示すので、homeではアクティブにならない -->
    <router-link to="/" active-class="link--active" exact>Home</router-link> |
    <router-link to="/users" active-class="link--active" exact>Users</router-link>
  </div>
</template>