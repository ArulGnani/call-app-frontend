(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{139:function(e,t,n){e.exports=n(291)},148:function(e,t){},150:function(e,t){},162:function(e,t){},164:function(e,t){},191:function(e,t){},193:function(e,t){},194:function(e,t){},200:function(e,t){},202:function(e,t){},220:function(e,t){},223:function(e,t){},239:function(e,t){},242:function(e,t){},245:function(e,t,n){},276:function(e,t){},290:function(e,t,n){},291:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(134),c=n.n(o),i=n(43),u=n(4),l=n(25),s=n(135),m=(n(245),function(){var e=Object(a.useState)(""),t=Object(l.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(2),i=Object(l.a)(c,2),m=i[0],d=i[1],f=Object(a.useState)(!1),p=Object(l.a)(f,2),g=p[0],v=p[1];return Object(a.useEffect)((function(){o(Object(s.randomBytes)(10).toString("hex"))}),[]),g?r.a.createElement(u.a,{to:"/room/".concat(n,"/").concat(m)}):r.a.createElement("section",{id:"create-room-page"},r.a.createElement("div",{id:"create-room"},r.a.createElement("label",{htmlFor:"room-id"}," room id "),r.a.createElement("input",{type:"text",value:n,disabled:!0,name:"room-id"}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"stream-id"}," select what u want to stream "),r.a.createElement("select",{name:"stream-id",defaultValue:"2",onChange:function(e){return d(e.target.value)}},r.a.createElement("option",{value:"1"}," share ur screen "),r.a.createElement("option",{value:"2"}," video call "),r.a.createElement("option",{value:"3"}," only audio "),r.a.createElement("option",{value:"4"}," only video ")),r.a.createElement("button",{onClick:function(){return v(!0)},id:"btn"},"create room")))}),d=n(138),f=n(137),p=n.n(f),g=n(70),v=n.n(g),b=function(e){var t=Object(a.useRef)();return Object(a.useEffect)((function(){e.peer.on("stream",(function(e){t.current.srcObject=e}))}),[]),r.a.createElement("div",null,"3"!==e.streamId?r.a.createElement("video",{ref:t,autoPlay:!0,controls:!0,width:"400px",height:"300px"}):r.a.createElement("audio",{ref:t,autoPlay:!0,controls:!0}))},E=function(){var e=Object(u.g)(),t=e.roomId,n=e.streamId,o=Object(a.useState)([]),c=Object(l.a)(o,2),i=c[0],s=c[1],m=Object(a.useRef)(),f=Object(a.useRef)(),g=Object(a.useRef)([]),E=t;Object(a.useEffect)((function(){m.current=p.a.connect("https://call-app-backend.herokuapp.com/"),h().then((function(e){f.current.srcObject=e,m.current.emit("join room",{roomID:E}),m.current.on("all users",(function(t){console.log("your id ->",m.current.id),console.log("all members room ->",t);var n=[];t.forEach((function(t){var a=j(t,m.current.id,e);g.current.push({peerID:t,peer:a}),n.push(a)})),console.log("connected peers",n),s(n)})),m.current.on("user joined",(function(t){console.log("offer form ".concat(t.callerID),t.signal);var n=O(t.signal,t.callerID,e);g.current.push({peerID:t.callerID,peer:n}),s((function(e){return[].concat(Object(d.a)(e),[n])}))})),m.current.on("receiving returned signal",(function(e){console.log("answer to ".concat(e.id),e.signal),g.current.find((function(t){return t.peerID===e.id})).peer.signal(e.signal)}))})).catch((function(e){alert(e)}))}),[]);var h=function(){switch(n){case"1":return navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0});case"2":return navigator.mediaDevices.getUserMedia({video:{noiseSuppression:!0},audio:{echoCancellation:!0}});case"3":return navigator.mediaDevices.getUserMedia({video:!1,audio:{echoCancellation:!0}});case"4":return navigator.mediaDevices.getUserMedia({video:!0,audio:!1});default:return null}},j=function(e,t,n){var a=new v.a({initiator:!0,trickle:!1,stream:n});return a.on("signal",(function(n){m.current.emit("sending signal",{userToSignal:e,callerID:t,signal:n})})),a},O=function(e,t,n){var a=new v.a({initiator:!1,trickle:!1,stream:n});return a.on("signal",(function(e){m.current.emit("returning signal",{signal:e,callerID:t})})),a.signal(e),a};return r.a.createElement("div",null,"3"!==n?r.a.createElement("video",{ref:f,autoPlay:!0,controls:!0,width:"400px",height:"300px"}):r.a.createElement("audio",{ref:f,autoPlay:!0,controls:!0}),i.map((function(e,t){return console.log("connted - peer ->",i),r.a.createElement(b,{key:t,peer:e,streamId:n})})))};n(290);var h=function(){return r.a.createElement(i.a,{basename:"/call-app-frontend"},r.a.createElement(u.d,null,r.a.createElement(u.b,{path:"/",exact:!0,component:m}),r.a.createElement(u.b,{path:"/room/:roomId/:streamId",component:E})))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(h,null)),document.getElementById("root"))}},[[139,1,2]]]);
//# sourceMappingURL=main.12465420.chunk.js.map