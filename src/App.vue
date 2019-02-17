<template>
  <v-app>
    <div id="app" class="container-fluid">
      <Header/>
      <dsak-list/>
    </div>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import DsakList from "./components/DsakList.vue";

export default {
  name: "app",
  components: {
    Header,
    DsakList
  }
};
</script>

<style>
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
