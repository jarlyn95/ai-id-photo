(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["app"],{0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"23ba":function(e,t){!function(e,t){function n(){a=1,e.devicePixelRatioValue=a,u=1/a;var t=i.createElement("meta");if(t.setAttribute("name","viewport"),t.setAttribute("content","initial-scale="+u+", maximum-scale="+u+", minimum-scale="+u+", user-scalable=no"),o.firstElementChild)o.firstElementChild.appendChild(t);else{var n=i.createElement("div");n.appendChild(t),i.write(n.innerHTML)}}function r(){var e=Math.min(o.getBoundingClientRect().width,640);s=100*e/t.desinWidth,o.style.fontSize=s+"px"}var i=e.document,o=i.documentElement,a=(e.devicePixelRatio,1),u=1;n();var c,s=100;t.desinWidth=640,t.baseFont=18,t.init=function(){e.addEventListener("resize",(function(){clearTimeout(c),c=setTimeout(r,300)}),!1),e.addEventListener("pageshow",(function(e){e.persisted&&(clearTimeout(c),c=setTimeout(r,300))}),!1),"complete"===i.readyState?i.body.style.fontSize=t.baseFont*a+"px":i.addEventListener("DOMContentLoaded",(function(){i.body.style.fontSize=t.baseFont*a+"px"}),!1),r(),o.setAttribute("data-dpr",a)}}(window,window.adaptive||(window.adaptive={})),window["adaptive"].desinWidth=750,window["adaptive"].baseFont=18,window["adaptive"].maxWidth=750,window["adaptive"].init()},"56d7":function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"timestampToMonth",(function(){return C})),n.d(r,"timestampToDate",(function(){return k})),n.d(r,"timestampToTime",(function(){return A})),n.d(r,"timestampToHHmmss",(function(){return I})),n.d(r,"timestampToDateWeek",(function(){return R})),n.d(r,"millisecondsToMinutes",(function(){return $})),n.d(r,"chatMessageToHtml",(function(){return B})),n.d(r,"deepCopy",(function(){return L})),n.d(r,"isBlank",(function(){return W})),n.d(r,"browserSuccess",(function(){return j}));n("456d"),n("ac6a"),n("cadf"),n("551c"),n("f751"),n("097d");var i=n("2b0e"),o=(n("f5df"),n("5c96")),a=n.n(o),u=(n("0fae"),n("f0d9")),c=n.n(u),s=(n("b20f"),n("23ba"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)}),d=[],f={name:"App"},l=f,p=(n("034f"),n("2877")),g=Object(p["a"])(l,s,d,!1,null,null,null),m=g.exports,h=n("8c4f");i["default"].use(h["a"]);var v=[{path:"/404",component:function(){return n.e("chunk-238c903c").then(n.bind(null,"8cdb"))},hidden:!0},{path:"/id-photo",component:function(){return Promise.all([n.e("chunk-3d40ce08"),n.e("chunk-08cd0db5")]).then(n.bind(null,"7e51"))},hidden:!0},{path:"*",redirect:"/id-photo",hidden:!0}],b=function(){return new h["a"]({scrollBehavior:function(){return{y:0}},routes:v})},w=b();var M=w,x=(n("7f7f"),n("96cf"),n("3b8d")),E=n("323e"),D=n.n(E),y=(n("a5d8"),n("83d6")),O=n.n(y),S=O.a.title||"在线证件照";function T(e){return"".concat(e||S)}function F(e){return null===e||""===e||"undefined"===typeof e}D.a.configure({showSpinner:!1}),M.beforeEach(function(){var e=Object(x["a"])(regeneratorRuntime.mark((function e(t,n,r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:D.a.start(),document.title=T(F(t.meta.title)?t.name:t.meta.title),r(),D.a.done();case 4:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}()),M.afterEach((function(){D.a.done()}));n("a481"),n("3b2b");function H(){var e=navigator.userAgent,t=e.indexOf("Opera")>-1,n=e.indexOf("compatible")>-1&&e.indexOf("MSIE")>-1&&!t,r=e.indexOf("Edge")>-1,i=e.indexOf("Firefox")>-1,o=e.indexOf("Safari")>-1&&-1===e.indexOf("Chrome"),a=e.indexOf("Chrome")>-1&&e.indexOf("Safari")>-1;if(n){var u=new RegExp("MSIE (\\d+\\.\\d+);");u.test(e);var c=parseFloat(RegExp["$1"]);return 7===c?"IE7":8===c?"IE8":9===c?"IE9":10===c?"IE10":11===c?"IE11":"0"}return t?"Opera":r?"Edge":i?"Firefox":o?"Safari":a?"Chrome":void 0}function C(e){if(!e)return"";var t=new Date(e),n=t.getFullYear(),r=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1;return n+"-"+r}function k(e){if(!e)return"";var t=new Date(e),n=t.getFullYear(),r=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,i=t.getDate()<10?"0"+t.getDate():t.getDate();return n+"-"+r+"-"+i}function A(e){if(!e)return"";var t=new Date(e),n=t.getFullYear(),r=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,i=t.getDate()<10?"0"+t.getDate():t.getDate(),o=t.getHours()<10?"0"+t.getHours():t.getHours(),a=t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes(),u=t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds();return n+"-"+r+"-"+i+" "+o+":"+a+":"+u}function I(e){if(!e)return"00:00:00";var t=new Date(e),n=t.getHours()<10?"0"+t.getHours():t.getHours(),r=t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes(),i=t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds();return n+":"+r+":"+i}function R(e){if(!e)return"";var t=new Date(e),n=t.getFullYear(),r=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,i=t.getDate()<10?"0"+t.getDate():t.getDate(),o=["星期天","星期一","星期二","星期三","星期四","星期五","星期六"],a=new Date(Date.parse(t)),u=n+"-"+r+"-"+i+" "+o[a.getDay()];return u}function $(e){if(!e)return"00分00秒";var t=e/1e3,n=parseInt(t/60),r=parseInt(t%60);return n+"分"+r+"秒"}function B(e){return e?e.replace(/\\n/gm,"<br />"):""}function L(e){return JSON.parse(JSON.stringify(e))}function W(e){return null===e||""===e||"undefined"===typeof e}function j(){var e=H();return"Edge"===e||"Chrome"===e||"Firefox"===e||(Object(o["Message"])({message:"您的浏览器不支持语音和拍摄功能，请使用Firefox、Chrome、Edge浏览器",type:"error"}),!1)}i["default"].use(a.a,{locale:c.a}),Object.keys(r).forEach((function(e){i["default"].filter(e,r[e])})),i["default"].config.productionTip=!1,new i["default"]({router:M,render:function(e){return e(m)}}).$mount("#app"),i["default"].prototype.$message=function(e){o["Message"].closeAll(),Object(o["Message"])(e)};var z=["success","warning","info","error"];z.forEach((function(e){i["default"].prototype.$message[e]=function(t){return o["Message"].closeAll(),a.a.Message[e](t)}})),i["default"].prototype.$message.close=function(e,t){return a.a.Message.close(e,t)},i["default"].prototype.$message.closeAll=function(){return a.a.Message.closeAll()}},"83d6":function(e,t){e.exports={title:"在线证件照",fixedHeader:!1,sidebarLogo:!0}},"85ec":function(e,t,n){},b20f:function(e,t,n){e.exports={menuText:"#bfcbd9",menuActiveText:"#409EFF",subMenuActiveText:"#f4f4f5",menuBg:"#304156",menuHover:"#263445",subMenuBg:"#1f2d3d",subMenuHover:"#001528",sideBarWidth:"210px"}}},[[0,"runtime","chunk-elementUI","chunk-libs"]]]);