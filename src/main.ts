import Vue from 'vue'
import App from './App.vue'
import router from './route/router'
import store from './store/store'
import iView from 'iview'
import 'iview/dist/styles/iview.css';

import htmlToPdf from './utils/util';
Vue.use(htmlToPdf)

Vue.use(iView);
Vue.config.productionTip = false

// @ts-ignore
Date.prototype.Format = function (fmt:string) { //author: meizz
  var o:any = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
