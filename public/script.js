!function(){"use strict";var t,e=new Uint8Array(16);function r(){if(!t&&!(t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return t(e)}for(var n=[],a=0;a<256;++a)n.push((a+256).toString(16).slice(1));var o={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};function i(t,e,a){if(o.randomUUID&&!e&&!t)return o.randomUUID();var i=(t=t||{}).random||(t.rng||r)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,e){a=a||0;for(var u=0;u<16;++u)e[a+u]=i[u];return e}return function(t,e){return void 0===e&&(e=0),n[t[e+0]]+n[t[e+1]]+n[t[e+2]]+n[t[e+3]]+"-"+n[t[e+4]]+n[t[e+5]]+"-"+n[t[e+6]]+n[t[e+7]]+"-"+n[t[e+8]]+n[t[e+9]]+"-"+n[t[e+10]]+n[t[e+11]]+n[t[e+12]]+n[t[e+13]]+n[t[e+14]]+n[t[e+15]]}(i)}!function(t){var e=t.screen,r=e.width,n=e.height,a=t.navigator.language,o=t.location,u=t.localStorage,c=t.document,s=t.history,f=o.hostname,d=o.pathname,p=o.search,l=c.currentScript;if(l){var m,v,g,h,y="data-",b=l.getAttribute.bind(l),S=b(y+"service-id"),I=b(y+"host-url"),U="false"!==b(y+"auto-track"),k=b(y+"do-not-track"),w=b(y+"domains")||"",D=w.split(",").map((function(t){return t.trim()})),N=(I?I.replace(/\/$/,""):l.src.split("/").slice(0,-1).join("/"))+"/api/send",T=r+"x"+n,j=/data-ancat-event-([\w-_]+)/,A=y+"ancat-event",x=300,E=function(t,e,r){var n=t[e];return function(){for(var e=[],a=arguments.length;a--;)e[a]=arguments[a];return r.apply(null,e),n.apply(t,e)}},O=function(){return{sessionId:P(),service:S,hostname:f,screen:T,language:a,title:B,url:$,referrer:z,userId:m,userName:v,userTeam:g,userCorp:h}},K=function(){return u&&u.getItem("ancat.disabled")||k&&function(){var e=t.doNotTrack,r=t.navigator,n=t.external,a="msTrackingProtectionEnabled",o=e||r.doNotTrack||r.msDoNotTrack||n&&a in n&&n[a]();return"1"==o||"yes"===o}()||w&&!D.includes(f)},L=function(t,e,r){r&&(z=$,($=function(t){return"http"===t.substring(0,4)?"/"+t.split("/").splice(3).join("/"):t}(r.toString()))!==z&&setTimeout(V,x))},P=function(){var t=(new Date).getTime(),e="ancat-session-id",r="ancat-session-expiry",n=u.getItem(e),a=u.getItem(r);if(n&&a&&t<Number(a)){var o=t+30*60*1e3;return u.setItem(r,o.toString()),n}var c=i(),s=t+30*60*1e3;return u.setItem(e,c),u.setItem(r,s.toString()),c},R=function(t,e){if(void 0===e&&(e="event"),!K()){var r={"Content-Type":"application/json"};return void 0!==C&&(r["x-ancat-cache"]=C),fetch(N,{method:"POST",body:JSON.stringify({type:e,payload:t}),headers:r}).then((function(t){return t.text()})).then((function(t){return C=t})).catch((function(){}))}},V=function(t,e){return R("string"==typeof t?Object.assign({},O(),{name:t,data:"object"==typeof e?e:void 0}):"object"==typeof t?t:"function"==typeof t?t(O()):O())};t.ancat||(t.ancat={track:V,identify:function(t){var e=t.id,r=t.name,n=t.team,a=t.corp;m=e,v=r,g=n,h=a}});var C,_,q,J,M,$=""+d+p,z=c.referrer,B=c.title;if(U&&!K()){s.pushState=E(s,"pushState",L),s.replaceState=E(s,"replaceState",L),M=function(t){var e=t.getAttribute.bind(t),r=e(A);if(r){var n={};return t.getAttributeNames().forEach((function(t){var r=t.match(j);r&&(n[r[1]]=e(t))})),V(r,n)}return Promise.resolve()},c.addEventListener("click",(function(t){var e=t.target,r="A"===e.tagName?e:function(t,e){for(var r=t,n=0;n<e;n++){if("A"===r.tagName)return r;if(!(r=r.parentElement))return null}return null}(e,10);if(r){var n=r.href,a="_blank"===r.target||t.ctrlKey||t.shiftKey||t.metaKey||t.button&&1===t.button;if(r.getAttribute(A)&&n)return a||t.preventDefault(),M(r).then((function(){a||(o.href=n)}))}else M(e)}),!0),q=new MutationObserver((function(t){var e=t[0];B=e&&e.target?e.target.text:void 0})),(J=c.querySelector("head > title"))&&q.observe(J,{subtree:!0,characterData:!0,childList:!0});var F=function(){"complete"!==c.readyState||_||(V(),_=!0)};c.addEventListener("readystatechange",F,!0),F()}}}(window)}();
