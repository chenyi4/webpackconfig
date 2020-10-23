import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

Vue.config.productionTip = false
const Foo = {template: '<div style="width: 100%;position:fixed;height: 100%; background: grey;">foo</div>'};
const Bar = { template: `<div 
  style="width: 100%;position:fixed;height: 100%; background: blue;"
>bar</div>`}

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
];

const router = new VueRouter({
    routes // short for `routes: routes`
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
