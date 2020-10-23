<template>
  <div id="app">
      <router-view></router-view>
      <div @click="changeRouter">测试路由跳转</div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { panel } from '@/api/index'

const back = panel.save({
   type: "all",
});

back.then((value) => {
  console.log(value);
});
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    changeRouter(){
      this.$router.push({
          path: 'foo'
      });
      // console.log("changeRouter");
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
