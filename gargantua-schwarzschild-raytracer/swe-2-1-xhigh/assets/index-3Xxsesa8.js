(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))r(u);new MutationObserver(u=>{for(const f of u)if(f.type==="childList")for(const h of f.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function i(u){const f={};return u.integrity&&(f.integrity=u.integrity),u.referrerPolicy&&(f.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?f.credentials="include":u.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function r(u){if(u.ep)return;u.ep=!0;const f=i(u);fetch(u.href,f)}})();var rd={exports:{}},sl={};var iv;function NM(){if(iv)return sl;iv=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(r,u,f){var h=null;if(f!==void 0&&(h=""+f),u.key!==void 0&&(h=""+u.key),"key"in u){f={};for(var d in u)d!=="key"&&(f[d]=u[d])}else f=u;return u=f.ref,{$$typeof:o,type:r,key:h,ref:u!==void 0?u:null,props:f}}return sl.Fragment=e,sl.jsx=i,sl.jsxs=i,sl}var av;function LM(){return av||(av=1,rd.exports=NM()),rd.exports}var Lt=LM(),od={exports:{}},ue={};var sv;function OM(){if(sv)return ue;sv=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),f=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),g=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),x=Symbol.for("react.view_transition"),M=Symbol.iterator;function A(P){return P===null||typeof P!="object"?null:(P=M&&P[M]||P["@@iterator"],typeof P=="function"?P:null)}var C={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},y=Object.assign,S={};function I(P,ct,J){this.props=P,this.context=ct,this.refs=S,this.updater=J||C}I.prototype.isReactComponent={},I.prototype.setState=function(P,ct){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,ct,"setState")},I.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function z(){}z.prototype=I.prototype;function U(P,ct,J){this.props=P,this.context=ct,this.refs=S,this.updater=J||C}var V=U.prototype=new z;V.constructor=U,y(V,I.prototype),V.isPureReactComponent=!0;var H=Array.isArray;function O(){}var q={H:null,A:null,T:null,S:null},w=Object.prototype.hasOwnProperty;function R(P,ct,J){var it=J.ref;return{$$typeof:o,type:P,key:ct,ref:it!==void 0?it:null,props:J}}function G(P,ct){return R(P.type,ct,P.props)}function at(P){return typeof P=="object"&&P!==null&&P.$$typeof===o}function ut(P){var ct={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(J){return ct[J]})}var gt=/\/+/g;function lt(P,ct){return typeof P=="object"&&P!==null&&P.key!=null?ut(""+P.key):ct.toString(36)}function W(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(O,O):(P.status="pending",P.then(function(ct){P.status==="pending"&&(P.status="fulfilled",P.value=ct)},function(ct){P.status==="pending"&&(P.status="rejected",P.reason=ct)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function st(P,ct,J,it,yt){var Ut=typeof P;(Ut==="undefined"||Ut==="boolean")&&(P=null);var At=!1;if(P===null)At=!0;else switch(Ut){case"bigint":case"string":case"number":At=!0;break;case"object":switch(P.$$typeof){case o:case e:At=!0;break;case v:return At=P._init,st(At(P._payload),ct,J,it,yt)}}if(At)return yt=yt(P),At=it===""?"."+lt(P,0):it,H(yt)?(J="",At!=null&&(J=At.replace(gt,"$&/")+"/"),st(yt,ct,J,"",function(L){return L})):yt!=null&&(at(yt)&&(yt=G(yt,J+(yt.key==null||P&&P.key===yt.key?"":(""+yt.key).replace(gt,"$&/")+"/")+At)),ct.push(yt)),1;At=0;var Mt=it===""?".":it+":";if(H(P))for(var Yt=0;Yt<P.length;Yt++)it=P[Yt],Ut=Mt+lt(it,Yt),At+=st(it,ct,J,Ut,yt);else if(Yt=A(P),typeof Yt=="function")for(P=Yt.call(P),Yt=0;!(it=P.next()).done;)it=it.value,Ut=Mt+lt(it,Yt++),At+=st(it,ct,J,Ut,yt);else if(Ut==="object"){if(typeof P.then=="function")return st(W(P),ct,J,it,yt);throw ct=String(P),Error("Objects are not valid as a React child (found: "+(ct==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":ct)+"). If you meant to render a collection of children, use an array instead.")}return At}function Z(P,ct,J){if(P==null)return P;var it=[],yt=0;return st(P,it,"","",function(Ut){return ct.call(J,Ut,yt++)}),it}function _t(P){if(P._status===-1){var ct=P._result,J=ct();J.then(function(it){(P._status===0||P._status===-1)&&(P._status=1,P._result=it,J.status===void 0&&(J.status="fulfilled",J.value=it))},function(it){(P._status===0||P._status===-1)&&(P._status=2,P._result=it,J.status===void 0&&(J.status="rejected",J.reason=it))}),P._status===-1&&(P._status=0,P._result=J)}if(P._status===1)return P._result.default;throw P._result}var St=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var ct=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(ct))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)};function Gt(P){var ct=q.T,J={};J.types=ct!==null?ct.types:null,q.T=J;try{var it=P(),yt=q.S;yt!==null&&yt(J,it),typeof it=="object"&&it!==null&&typeof it.then=="function"&&it.then(O,St)}catch(Ut){St(Ut)}finally{ct!==null&&J.types!==null&&(ct.types=J.types),q.T=ct}}function oe(P){var ct=q.T;if(ct!==null){var J=ct.types;J===null?ct.types=[P]:J.indexOf(P)===-1&&J.push(P)}else Gt(oe.bind(null,P))}var be={map:Z,forEach:function(P,ct,J){Z(P,function(){ct.apply(this,arguments)},J)},count:function(P){var ct=0;return Z(P,function(){ct++}),ct},toArray:function(P){return Z(P,function(ct){return ct})||[]},only:function(P){if(!at(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return ue.Activity=_,ue.Children=be,ue.Component=I,ue.Fragment=i,ue.Profiler=u,ue.PureComponent=U,ue.StrictMode=r,ue.Suspense=m,ue.ViewTransition=x,ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=q,ue.__COMPILER_RUNTIME={__proto__:null,c:function(P){return q.H.useMemoCache(P)}},ue.addTransitionType=oe,ue.cache=function(P){return function(){return P.apply(null,arguments)}},ue.cacheSignal=function(){return null},ue.cloneElement=function(P,ct,J){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var it=y({},P.props),yt=P.key;if(ct!=null)for(Ut in ct.key!==void 0&&(yt=""+ct.key),ct)!w.call(ct,Ut)||Ut==="key"||Ut==="__self"||Ut==="__source"||Ut==="ref"&&ct.ref===void 0||(it[Ut]=ct[Ut]);var Ut=arguments.length-2;if(Ut===1)it.children=J;else if(1<Ut){for(var At=Array(Ut),Mt=0;Mt<Ut;Mt++)At[Mt]=arguments[Mt+2];it.children=At}return R(P.type,yt,it)},ue.createContext=function(P){return P={$$typeof:h,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:f,_context:P},P},ue.createElement=function(P,ct,J){var it,yt={},Ut=null;if(ct!=null)for(it in ct.key!==void 0&&(Ut=""+ct.key),ct)w.call(ct,it)&&it!=="key"&&it!=="__self"&&it!=="__source"&&(yt[it]=ct[it]);var At=arguments.length-2;if(At===1)yt.children=J;else if(1<At){for(var Mt=Array(At),Yt=0;Yt<At;Yt++)Mt[Yt]=arguments[Yt+2];yt.children=Mt}if(P&&P.defaultProps)for(it in At=P.defaultProps,At)yt[it]===void 0&&(yt[it]=At[it]);return R(P,Ut,yt)},ue.createRef=function(){return{current:null}},ue.forwardRef=function(P){return{$$typeof:d,render:P}},ue.isValidElement=at,ue.lazy=function(P){return{$$typeof:v,_payload:{_status:-1,_result:P},_init:_t}},ue.memo=function(P,ct){return{$$typeof:g,type:P,compare:ct===void 0?null:ct}},ue.startTransition=Gt,ue.unstable_useCacheRefresh=function(){return q.H.useCacheRefresh()},ue.use=function(P){return q.H.use(P)},ue.useActionState=function(P,ct,J){return q.H.useActionState(P,ct,J)},ue.useCallback=function(P,ct){return q.H.useCallback(P,ct)},ue.useContext=function(P){return q.H.useContext(P)},ue.useDebugValue=function(){},ue.useDeferredValue=function(P,ct){return q.H.useDeferredValue(P,ct)},ue.useEffect=function(P,ct){return q.H.useEffect(P,ct)},ue.useEffectEvent=function(P){return q.H.useEffectEvent(P)},ue.useId=function(){return q.H.useId()},ue.useImperativeHandle=function(P,ct,J){return q.H.useImperativeHandle(P,ct,J)},ue.useInsertionEffect=function(P,ct){return q.H.useInsertionEffect(P,ct)},ue.useLayoutEffect=function(P,ct){return q.H.useLayoutEffect(P,ct)},ue.useMemo=function(P,ct){return q.H.useMemo(P,ct)},ue.useOptimistic=function(P,ct){return q.H.useOptimistic(P,ct)},ue.useReducer=function(P,ct,J){return q.H.useReducer(P,ct,J)},ue.useRef=function(P){return q.H.useRef(P)},ue.useState=function(P){return q.H.useState(P)},ue.useSyncExternalStore=function(P,ct,J){return q.H.useSyncExternalStore(P,ct,J)},ue.useTransition=function(){return q.H.useTransition()},ue.version="19.3.1",ue}var rv;function Pp(){return rv||(rv=1,od.exports=OM()),od.exports}var dl=Pp(),ld={exports:{}},rl={},ud={exports:{}},cd={};var ov;function PM(){return ov||(ov=1,(function(o){function e(W,st){var Z=W.length;W.push(st);t:for(;0<Z;){var _t=Z-1>>>1,St=W[_t];if(0<u(St,st))W[_t]=st,W[Z]=St,Z=_t;else break t}}function i(W){return W.length===0?null:W[0]}function r(W){if(W.length===0)return null;var st=W[0],Z=W.pop();if(Z!==st){W[0]=Z;t:for(var _t=0,St=W.length,Gt=St>>>1;_t<Gt;){var oe=2*(_t+1)-1,be=W[oe],P=oe+1,ct=W[P];if(0>u(be,Z))P<St&&0>u(ct,be)?(W[_t]=ct,W[P]=Z,_t=P):(W[_t]=be,W[oe]=Z,_t=oe);else if(P<St&&0>u(ct,Z))W[_t]=ct,W[P]=Z,_t=P;else break t}}return st}function u(W,st){var Z=W.sortIndex-st.sortIndex;return Z!==0?Z:W.id-st.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var f=performance;o.unstable_now=function(){return f.now()}}else{var h=Date,d=h.now();o.unstable_now=function(){return h.now()-d}}var m=[],g=[],v=1,_=null,x=3,M=!1,A=!1,C=!1,y=!1,S=typeof setTimeout=="function"?setTimeout:null,I=typeof clearTimeout=="function"?clearTimeout:null,z=typeof setImmediate<"u"?setImmediate:null;function U(W){for(var st=i(g);st!==null;){if(st.callback===null)r(g);else if(st.startTime<=W)r(g),st.sortIndex=st.expirationTime,e(m,st);else break;st=i(g)}}function V(W){if(C=!1,U(W),!A)if(i(m)!==null)A=!0,H||(H=!0,at());else{var st=i(g);st!==null&&lt(V,st.startTime-W)}}var H=!1,O=-1,q=5,w=-1;function R(){return y?!0:!(o.unstable_now()-w<q)}function G(){if(y=!1,H){var W=o.unstable_now();w=W;var st=!0;try{t:{A=!1,C&&(C=!1,I(O),O=-1),M=!0;var Z=x;try{e:{for(U(W),_=i(m);_!==null&&!(_.expirationTime>W&&R());){var _t=_.callback;if(typeof _t=="function"){_.callback=null,x=_.priorityLevel;var St=_t(_.expirationTime<=W);if(W=o.unstable_now(),typeof St=="function"){_.callback=St,U(W),st=!0;break e}_===i(m)&&r(m),U(W)}else r(m);_=i(m)}if(_!==null)st=!0;else{var Gt=i(g);Gt!==null&&lt(V,Gt.startTime-W),st=!1}}break t}finally{_=null,x=Z,M=!1}st=void 0}}finally{st?at():H=!1}}}var at;if(typeof z=="function")at=function(){z(G)};else if(typeof MessageChannel<"u"){var ut=new MessageChannel,gt=ut.port2;ut.port1.onmessage=G,at=function(){gt.postMessage(null)}}else at=function(){S(G,0)};function lt(W,st){O=S(function(){W(o.unstable_now())},st)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(W){W.callback=null},o.unstable_forceFrameRate=function(W){0>W||125<W?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):q=0<W?Math.floor(1e3/W):5},o.unstable_getCurrentPriorityLevel=function(){return x},o.unstable_next=function(W){switch(x){case 1:case 2:case 3:var st=3;break;default:st=x}var Z=x;x=st;try{return W()}finally{x=Z}},o.unstable_requestPaint=function(){y=!0},o.unstable_runWithPriority=function(W,st){switch(W){case 1:case 2:case 3:case 4:case 5:break;default:W=3}var Z=x;x=W;try{return st()}finally{x=Z}},o.unstable_scheduleCallback=function(W,st,Z){var _t=o.unstable_now();switch(typeof Z=="object"&&Z!==null?(Z=Z.delay,Z=typeof Z=="number"&&0<Z?_t+Z:_t):Z=_t,W){case 1:var St=-1;break;case 2:St=250;break;case 5:St=1073741823;break;case 4:St=1e4;break;default:St=5e3}return St=Z+St,W={id:v++,callback:st,priorityLevel:W,startTime:Z,expirationTime:St,sortIndex:-1},Z>_t?(W.sortIndex=Z,e(g,W),i(m)===null&&W===i(g)&&(C?(I(O),O=-1):C=!0,lt(V,Z-_t))):(W.sortIndex=St,e(m,W),A||M||(A=!0,H||(H=!0,at()))),W},o.unstable_shouldYield=R,o.unstable_wrapCallback=function(W){var st=x;return function(){var Z=x;x=st;try{return W.apply(this,arguments)}finally{x=Z}}}})(cd)),cd}var lv;function zM(){return lv||(lv=1,ud.exports=PM()),ud.exports}var fd={exports:{}},wn={};var uv;function IM(){if(uv)return wn;uv=1;var o=Pp();function e(v){var _="https://react.dev/errors/"+v;if(1<arguments.length){_+="?args[]="+encodeURIComponent(arguments[1]);for(var x=2;x<arguments.length;x++)_+="&args[]="+encodeURIComponent(arguments[x])}return"Minified React error #"+v+"; visit "+_+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var r={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},u=Symbol.for("react.portal"),f=Symbol.for("react.recoverable"),h=Symbol.for("react.optimistic_key");function d(v,_,x){var M=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:u,key:M==null?null:M===h?h:""+M,children:v,containerInfo:_,implementation:x}}var m=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function g(v,_){if(v==="font")return"";if(typeof _=="string")return _==="use-credentials"?_:""}return wn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,wn.browser=function(v){return{$$typeof:f,_reason:v}},wn.createPortal=function(v,_){var x=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!_||_.nodeType!==1&&_.nodeType!==9&&_.nodeType!==11)throw Error(e(299));return d(v,_,null,x)},wn.flushSync=function(v){var _=m.T,x=r.p;try{if(m.T=null,r.p=2,v)return v()}finally{m.T=_,r.p=x,r.d.f()}},wn.preconnect=function(v,_){typeof v=="string"&&(_?(_=_.crossOrigin,_=typeof _=="string"?_==="use-credentials"?_:"":void 0):_=null,r.d.C(v,_))},wn.prefetchDNS=function(v){typeof v=="string"&&r.d.D(v)},wn.preinit=function(v,_){if(typeof v=="string"&&_&&typeof _.as=="string"){var x=_.as,M=g(x,_.crossOrigin),A=typeof _.integrity=="string"?_.integrity:void 0,C=typeof _.fetchPriority=="string"?_.fetchPriority:void 0;x==="style"?r.d.S(v,typeof _.precedence=="string"?_.precedence:void 0,{crossOrigin:M,integrity:A,fetchPriority:C}):x==="script"&&r.d.X(v,{crossOrigin:M,integrity:A,fetchPriority:C,nonce:typeof _.nonce=="string"?_.nonce:void 0})}},wn.preinitModule=function(v,_){if(typeof v=="string")if(typeof _=="object"&&_!==null){if(_.as==null||_.as==="script"){var x=g(_.as,_.crossOrigin);r.d.M(v,{crossOrigin:x,integrity:typeof _.integrity=="string"?_.integrity:void 0,nonce:typeof _.nonce=="string"?_.nonce:void 0,fetchPriority:typeof _.fetchPriority=="string"?_.fetchPriority:void 0})}}else _==null&&r.d.M(v)},wn.preload=function(v,_){if(typeof v=="string"&&typeof _=="object"&&_!==null&&typeof _.as=="string"){var x=_.as,M=g(x,_.crossOrigin);r.d.L(v,x,{crossOrigin:M,integrity:typeof _.integrity=="string"?_.integrity:void 0,nonce:typeof _.nonce=="string"?_.nonce:void 0,type:typeof _.type=="string"?_.type:void 0,fetchPriority:typeof _.fetchPriority=="string"?_.fetchPriority:void 0,referrerPolicy:typeof _.referrerPolicy=="string"?_.referrerPolicy:void 0,imageSrcSet:typeof _.imageSrcSet=="string"?_.imageSrcSet:void 0,imageSizes:typeof _.imageSizes=="string"?_.imageSizes:void 0,media:typeof _.media=="string"?_.media:void 0})}},wn.preloadModule=function(v,_){if(typeof v=="string")if(_){var x=g(_.as,_.crossOrigin);r.d.m(v,{as:typeof _.as=="string"&&_.as!=="script"?_.as:void 0,crossOrigin:x,integrity:typeof _.integrity=="string"?_.integrity:void 0,nonce:typeof _.nonce=="string"?_.nonce:void 0,fetchPriority:typeof _.fetchPriority=="string"?_.fetchPriority:void 0})}else r.d.m(v)},wn.requestFormReset=function(v){r.d.r(v)},wn.unstable_batchedUpdates=function(v,_){return v(_)},wn.useFormState=function(v,_,x){return m.H.useFormState(v,_,x)},wn.useFormStatus=function(){return m.H.useHostTransitionStatus()},wn.version="19.3.1",wn}var cv;function BM(){if(cv)return fd.exports;cv=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),fd.exports=IM(),fd.exports}var fv;function FM(){if(fv)return rl;fv=1;var o=zM(),e=Pp(),i=BM();function r(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function f(t){for(var n=t,a=n;a&&!a.alternate;)n=a,(n.flags&4098)!==0&&(t=n.return),a=n.return;for(;n.return;)n=n.return;return n.tag===3?t:null}function h(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function d(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function m(t){if(f(t)!==t)throw Error(r(188))}function g(t){var n=t.alternate;if(!n){if(n=f(t),n===null)throw Error(r(188));return n!==t?null:t}for(var a=t,s=n;;){var l=a.return;if(l===null)break;var c=l.alternate;if(c===null){if(s=l.return,s!==null){a=s;continue}break}if(l.child===c.child){for(c=l.child;c;){if(c===a)return m(l),t;if(c===s)return m(l),n;c=c.sibling}throw Error(r(188))}if(a.return!==s.return)a=l,s=c;else{for(var p=!1,E=l.child;E;){if(E===a){p=!0,a=l,s=c;break}if(E===s){p=!0,s=l,a=c;break}E=E.sibling}if(!p){for(E=c.child;E;){if(E===a){p=!0,a=c,s=l;break}if(E===s){p=!0,s=c,a=l;break}E=E.sibling}if(!p)throw Error(r(189))}}if(a.alternate!==s)throw Error(r(190))}if(a.tag!==3)throw Error(r(188));return a.stateNode.current===a?t:n}function v(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=v(t),n!==null)return n;t=t.sibling}return null}function _(t,n,a,s,l,c){for(;t!==null;){if((t.tag===5||t.tag===27||t.tag===6)&&a(t,s,l,c)||(t.tag!==22||t.memoizedState===null)&&(n||t.tag!==5&&t.tag!==27)&&_(t.child,n,a,s,l,c))return!0;t=t.sibling}return!1}function x(t){for(t=t.return;t!==null;){if(t.tag===3||t.tag===5||t.tag===27)return t;t=t.return}return null}function M(t){var n=!1;for(t=t.return;t!==null&&(t.tag===4&&(n=!0),!(t.tag===3||t.tag===5||t.tag===27));)t=t.return;return n}function A(t){var n=[null,null],a=x(t);return a===null||C(n,t,a.child,{foundSelf:!1}),n}function C(t,n,a,s){for(;a!==null;){if(a===n)s.foundSelf=!0;else if(a.tag===5||a.tag===27||a.tag===6){if(s.foundSelf)return t[1]=a,!0;t[0]=a}else if((a.tag!==22||a.memoizedState===null)&&C(t,n,a.child,s))return!0;a=a.sibling}return!1}function y(t){switch(t.tag){case 5:case 27:case 6:return t.stateNode;case 3:return t.stateNode.containerInfo;default:throw Error(r(559))}}var S=null,I=null;function z(t,n,a){return t===a?!0:t===n?(S=t,!0):!1}function U(t,n,a){return t===a?(I=t,!1):t===n?(I!==null&&(S=t),!0):!1}function V(t){if(t===null)return null;do t=t===null?null:t.return;while(t&&t.tag!==5&&t.tag!==27&&t.tag!==3);return t||null}function H(t,n,a){for(var s=0,l=t;l;l=a(l))s++;l=0;for(var c=n;c;c=a(c))l++;for(;0<s-l;)t=a(t),s--;for(;0<l-s;)n=a(n),l--;for(;s--;){if(t===n||n!==null&&t===n.alternate)return t;t=a(t),n=a(n)}return null}var O=Object.assign,q=Symbol.for("react.element"),w=Symbol.for("react.transitional.element"),R=Symbol.for("react.portal"),G=Symbol.for("react.fragment"),at=Symbol.for("react.strict_mode"),ut=Symbol.for("react.profiler"),gt=Symbol.for("react.consumer"),lt=Symbol.for("react.context"),W=Symbol.for("react.forward_ref"),st=Symbol.for("react.suspense"),Z=Symbol.for("react.suspense_list"),_t=Symbol.for("react.memo"),St=Symbol.for("react.lazy"),Gt=Symbol.for("react.activity"),oe=Symbol.for("react.legacy_hidden"),be=Symbol.for("react.memo_cache_sentinel"),P=Symbol.for("react.view_transition"),ct=Symbol.for("react.recoverable"),J=Symbol.iterator;function it(t){return t===null||typeof t!="object"?null:(t=J&&t[J]||t["@@iterator"],typeof t=="function"?t:null)}var yt=Symbol.for("react.client.reference");function Ut(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===yt?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case G:return"Fragment";case ut:return"Profiler";case at:return"StrictMode";case st:return"Suspense";case Z:return"SuspenseList";case Gt:return"Activity";case P:return"ViewTransition"}if(typeof t=="object")switch(t.$$typeof){case R:return"Portal";case lt:return t.displayName||"Context";case gt:return(t._context.displayName||"Context")+".Consumer";case W:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case _t:return n=t.displayName||null,n!==null?n:Ut(t.type)||"Memo";case St:n=t._payload,t=t._init;try{return Ut(t(n))}catch{}}return null}var At=Array.isArray,Mt=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Yt=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,L={pending:!1,data:null,method:null,action:null},He=[],re=-1;function Qt(t){return{current:t}}function Nt(t){0>re||(t.current=He[re],He[re]=null,re--)}function ae(t,n){re++,He[re]=t.current,t.current=n}var Ft=Qt(null),le=Qt(null),qe=Qt(null),We=Qt(null);function D(t,n){switch(ae(qe,n),ae(le,t),ae(Ft,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?h0(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=h0(n),t=d0(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Nt(Ft),ae(Ft,t)}function T(){Nt(Ft),Nt(le),Nt(qe)}function tt(t){var n=t.memoizedState;n!==null&&(Ir._currentValue=n.memoizedState,ae(We,t)),n=Ft.current;var a=d0(n,t.type);n!==a&&(ae(le,t),ae(Ft,a))}function dt(t){le.current===t&&(Nt(Ft),Nt(le)),We.current===t&&(Nt(We),Ir._currentValue=L)}var vt,ft;function kt(t){if(vt===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);vt=n&&n[1]||"",ft=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+vt+t+ft}var Rt=!1;function jt(t,n){if(!t||Rt)return"";Rt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var s={DetermineComponentFrameRoot:function(){try{if(n){var pt=function(){throw Error()};if(Object.defineProperty(pt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(pt,[])}catch(Dt){var k=Dt}Reflect.construct(t,[],pt)}else{try{pt.call()}catch(Dt){k=Dt}pt=!1;try{var $=Object.getOwnPropertyDescriptor(t.prototype,"props");Object.defineProperty(t.prototype,"props",{configurable:!0,set:function(){throw Error()}}),pt=!0,new t}finally{pt&&($!==void 0?Object.defineProperty(t.prototype,"props",$):delete t.prototype.props)}}}else{try{throw Error()}catch(Dt){k=Dt}(pt=t())&&typeof pt.catch=="function"&&pt.catch(function(){})}}catch(Dt){if(Dt&&k&&typeof Dt.stack=="string")return[Dt.stack,k.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var c=s.DetermineComponentFrameRoot(),p=c[0],E=c[1];if(p&&E){var N=p.split(`
`),Y=E.split(`
`);for(l=s=0;s<N.length&&!N[s].includes("DetermineComponentFrameRoot");)s++;for(;l<Y.length&&!Y[l].includes("DetermineComponentFrameRoot");)l++;if(s===N.length||l===Y.length)for(s=N.length-1,l=Y.length-1;1<=s&&0<=l&&N[s]!==Y[l];)l--;for(;1<=s&&0<=l;s--,l--)if(N[s]!==Y[l]){if(s!==1||l!==1)do if(s--,l--,0>l||N[s]!==Y[l]){var nt=`
`+N[s].replace(" at new "," at ");return t.displayName&&nt.includes("<anonymous>")&&(nt=nt.replace("<anonymous>",t.displayName)),nt}while(1<=s&&0<=l);break}}}finally{Rt=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?kt(a):""}function Kt(t,n){switch(t.tag){case 26:case 27:case 5:return kt(t.type);case 16:return kt("Lazy");case 13:return t.child!==n&&n!==null?kt("Suspense Fallback"):kt("Suspense");case 19:return kt("SuspenseList");case 0:case 15:return jt(t.type,!1);case 11:return jt(t.type.render,!1);case 1:return jt(t.type,!0);case 31:return kt("Activity");case 30:return kt("ViewTransition");default:return""}}function Tt(t){try{var n="",a=null;do n+=Kt(t,a),a=t,t=t.return;while(t);return n}catch(s){return`
Error generating stack: `+s.message+`
`+s.stack}}var Ot=Object.prototype.hasOwnProperty,ie=o.unstable_scheduleCallback,Zt=o.unstable_cancelCallback,Pt=o.unstable_shouldYield,fe=o.unstable_requestPaint,F=o.unstable_now,bt=o.unstable_getCurrentPriorityLevel,wt=o.unstable_ImmediatePriority,Vt=o.unstable_UserBlockingPriority,xt=o.unstable_NormalPriority,mt=o.unstable_LowPriority,Wt=o.unstable_IdlePriority,ce=o.log,Ge=o.unstable_setDisableYieldValue,Me=null,$e=null;function dn(t){if(typeof ce=="function"&&Ge(t),$e&&typeof $e.setStrictMode=="function")try{$e.setStrictMode(Me,t)}catch{}}var Dn=Math.clz32?Math.clz32:Tl,ea=Math.log,mo=Math.LN2;function Tl(t){return t>>>=0,t===0?32:31-(ea(t)/mo|0)|0}var gs=256,na=262144,_s=4194304;function ci(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&-t;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function vs(t,n,a){var s=t.pendingLanes;if(s===0)return 0;var l=0,c=t.suspendedLanes,p=t.pingedLanes;t=t.warmLanes;var E=s&134217727;return E!==0?(s=E&~c,s!==0?l=ci(s):(p&=E,p!==0?l=ci(p):a||(a=E&~t,a!==0&&(l=ci(a))))):(E=s&~c,E!==0?l=ci(E):p!==0?l=ci(p):a||(a=s&~t,a!==0&&(l=ci(a)))),l===0?0:n!==0&&n!==l&&(n&c)===0&&(c=l&-l,a=n&-n,c>=a||c===32&&(a&4194048)!==0)?n:l}function Na(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function bl(t,n){(n&8)!==0&&(n|=n&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=n;0<a;){var s=31-Dn(a),l=1<<s;n|=t[s],a&=~l}return n}function Lc(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Al(){var t=_s;return _s<<=1,(_s&62914560)===0&&(_s=4194304),t}function go(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function Ss(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Oc(t,n,a,s,l,c){var p=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var E=t.entanglements,N=t.expirationTimes,Y=t.hiddenUpdates;for(a=p&~a;0<a;){var nt=31-Dn(a),pt=1<<nt;E[nt]=0,N[nt]=-1;var k=Y[nt];if(k!==null)for(Y[nt]=null,nt=0;nt<k.length;nt++){var $=k[nt];$!==null&&($.lane&=-536870913)}a&=~pt}s!==0&&b(t,s,0),c!==0&&l===0&&t.tag!==0&&(t.suspendedLanes|=c&~(p&~n))}function b(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var s=31-Dn(n);t.entangledLanes|=n,t.entanglements[s]=t.entanglements[s]|1073741824|a&261930}function j(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var s=31-Dn(a),l=1<<s;l&n|t[s]&n&&(t[s]|=n),a&=~l}}function rt(t,n){var a=n&-n;return a=(a&42)!==0?1:ot(a),(a&(t.suspendedLanes|n))!==0?0:a}function ot(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function K(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Et(){var t=Yt.p;return t!==0?t:(t=window.event,t===void 0?32:K0(t.type))}function zt(t,n){var a=Yt.p;try{return Yt.p=t,n()}finally{Yt.p=a}}var Bt=Math.random().toString(36).slice(2),Ct="__reactFiber$"+Bt,Xt="__reactProps$"+Bt,ee="__reactContainer$"+Bt,$t="__reactEvents$"+Bt,ve="__reactListeners$"+Bt,Pe="__reactHandles$"+Bt,Qe="__reactResources$"+Bt,Ne="__reactMarker$"+Bt,Re="__reactLoad$"+Bt;function te(t){delete t[Ct],delete t[Xt],delete t[ve],delete t[Pe]}function Le(t){var n;if(n=t[Ct])return n;for(var a=t.parentNode;a;){if(n=a[ee]||a[Ct]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=D0(t);t!==null;){if(a=t[Ct])return a;t=D0(t)}return n}t=a,a=t.parentNode}return null}function ge(t){if(t=t[Ct]||t[ee]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function pn(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(r(33))}function Jn(t){var n=t[Qe];return n||(n=t[Qe]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function Ce(t){t[Ne]=!0}function La(t){t[Re]=void 0}var je=new Set,zn={};function on(t,n){en(t,n),en(t+"Capture",n)}function en(t,n){for(zn[t]=n,t=0;t<n.length;t++)je.add(n[t])}var Un=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),tr={},Fi={};function QS(t){return Ot.call(Fi,t)?!0:Ot.call(tr,t)?!1:Un.test(t)?Fi[t]=!0:(tr[t]=!0,!1)}var we=!1;function Jp(){var t=we;return we=!1,t}function Rl(t,n,a){if(QS(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var s=n.toLowerCase().slice(0,5);if(s!=="data-"&&s!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,a)}}function Cl(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,a)}}function ia(t,n,a,s){if(s===null)t.removeAttribute(a);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,s)}}function $n(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function $p(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function JS(t,n,a){var s=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof s<"u"&&typeof s.get=="function"&&typeof s.set=="function"){var l=s.get,c=s.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return l.call(this)},set:function(p){a=""+p,c.call(this,p)}}),Object.defineProperty(t,n,{enumerable:s.enumerable}),{getValue:function(){return a},setValue:function(p){a=""+p},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function Pc(t){if(!t._valueTracker){var n=$p(t)?"checked":"value";t._valueTracker=JS(t,n,""+t[n])}}function tm(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),s="";return t&&(s=$p(t)?t.checked?"true":"false":t.value),t=s,t!==a?(n.setValue(t),!0):!1}var $S=/[\n"\\]/g;function fi(t){return t.replace($S,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function zc(t,n,a,s,l,c,p,E){t.name="",p!=null&&typeof p!="function"&&typeof p!="symbol"&&typeof p!="boolean"?t.type=p:t.removeAttribute("type"),n!=null?p==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+$n(n)):t.value!==""+$n(n)&&(t.value=""+$n(n)):p!=="submit"&&p!=="reset"||t.removeAttribute("value"),n!=null?p==="number"&&t.value==n?Ic(t,$n(t.value)):Ic(t,$n(n)):a!=null?Ic(t,$n(a)):s!=null&&t.removeAttribute("value"),l==null&&c!=null&&(t.defaultChecked=!!c),l!=null&&(t.checked=l&&typeof l!="function"&&typeof l!="symbol"),E!=null&&typeof E!="function"&&typeof E!="symbol"&&typeof E!="boolean"?t.name=""+$n(E):t.removeAttribute("name")}function em(t,n,a,s,l,c,p,E){if(c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"&&(t.type=c),n!=null||a!=null){if(!(c!=="submit"&&c!=="reset"||n!=null)){Pc(t);return}a=a!=null?""+$n(a):"",n=n!=null?""+$n(n):a,E||n===t.value||(t.value=n),t.defaultValue=n}s=s??l,s=typeof s!="function"&&typeof s!="symbol"&&!!s,t.checked=E?t.checked:!!s,t.defaultChecked=!!s,p!=null&&typeof p!="function"&&typeof p!="symbol"&&typeof p!="boolean"&&(t.name=p),Pc(t)}function Ic(t,n){t.defaultValue!==""+n&&(t.defaultValue=""+n)}function er(t,n,a,s){if(t=t.options,n){n={};for(var l=0;l<a.length;l++)n["$"+a[l]]=!0;for(a=0;a<t.length;a++)l=n.hasOwnProperty("$"+t[a].value),t[a].selected!==l&&(t[a].selected=l),l&&s&&(t[a].defaultSelected=!0)}else{for(a=""+$n(a),n=null,l=0;l<t.length;l++){if(t[l].value===a){t[l].selected=!0,s&&(t[l].defaultSelected=!0);return}n!==null||t[l].disabled||(n=t[l])}n!==null&&(n.selected=!0)}}function nm(t,n,a){if(n!=null&&(n=""+$n(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+$n(a):""}function im(t,n,a,s){if(n==null){if(s!=null){if(a!=null)throw Error(r(92));if(At(s)){if(1<s.length)throw Error(r(93));s=s[0]}a=s}a==null&&(a=""),n=a}a=$n(n),t.defaultValue=a,s=t.textContent,s===a&&s!==""&&s!==null&&(t.value=s),Pc(t)}function nr(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var tx=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function am(t,n,a){var s=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?s?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":s?t.setProperty(n,a):typeof a!="number"||a===0||tx.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function sm(t,n,a){if(n!=null&&typeof n!="object")throw Error(r(62));if(t=t.style,a!=null){for(var s in a)!a.hasOwnProperty(s)||n!=null&&n.hasOwnProperty(s)||(s.indexOf("--")===0?t.setProperty(s,""):s==="float"?t.cssFloat="":t[s]="",we=!0);for(var l in n)s=n[l],n.hasOwnProperty(l)&&a[l]!==s&&(am(t,l,s),we=!0)}else for(var c in n)n.hasOwnProperty(c)&&am(t,c,n[c])}function Bc(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ex=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),nx=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function wl(t){return nx.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Hi(){}var Fc=null;function Hc(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ir=null,ar=null;function rm(t){var n=ge(t);if(n&&(t=n.stateNode)){var a=t[Xt]||null;t:switch(t=n.stateNode,n.type){case"input":if(zc(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+fi(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var s=a[n];if(s!==t&&s.form===t.form){var l=s[Xt]||null;if(!l)throw Error(r(90));zc(s,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(n=0;n<a.length;n++)s=a[n],s.form===t.form&&tm(s)}break t;case"textarea":nm(t,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&er(t,!!a.multiple,n,!1)}}}var Gc=!1;function om(t,n,a){if(Gc)return t(n,a);Gc=!0;try{var s=t(n);return s}finally{if(Gc=!1,(ir!==null||ar!==null)&&(wu(),ir&&(n=ir,t=ar,ar=ir=null,rm(n),t)))for(n=0;n<t.length;n++)rm(t[n])}}function _o(t,n){var a=t.stateNode;if(a===null)return null;var s=a[Xt]||null;if(s===null)return null;a=s[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(t=t.type,s=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!s;break t;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(r(231,n,typeof a));return a}var aa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Vc=!1;if(aa)try{var vo={};Object.defineProperty(vo,"passive",{get:function(){Vc=!0}}),window.addEventListener("test",vo,vo),window.removeEventListener("test",vo,vo)}catch{Vc=!1}var Oa=null,kc=null,Dl=null;function lm(){if(Dl)return Dl;var t,n=kc,a=n.length,s,l="value"in Oa?Oa.value:Oa.textContent,c=l.length;for(t=0;t<a&&n[t]===l[t];t++);var p=a-t;for(s=1;s<=p&&n[a-s]===l[c-s];s++);return Dl=l.slice(t,1<s?1-s:void 0)}function Ul(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function Nl(){return!0}function um(){return!1}function In(t){function n(a,s,l,c,p){this._reactName=a,this._targetInst=l,this.type=s,this.nativeEvent=c,this.target=p,this.currentTarget=null;for(var E in t)t.hasOwnProperty(E)&&(a=t[E],this[E]=a?a(c):c[E]);return this.isDefaultPrevented=(c.defaultPrevented!=null?c.defaultPrevented:c.returnValue===!1)?Nl:um,this.isPropagationStopped=um,this}return O(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Nl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Nl)},persist:function(){},isPersistent:Nl}),n}var Pa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ll=In(Pa),So=O({},Pa,{view:0,detail:0}),ix=In(So),Xc,qc,xo,Ol=O({},So,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Wc,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==xo&&(xo&&t.type==="mousemove"?(Xc=t.screenX-xo.screenX,qc=t.screenY-xo.screenY):qc=Xc=0,xo=t),Xc)},movementY:function(t){return"movementY"in t?t.movementY:qc}}),cm=In(Ol),ax=O({},Ol,{dataTransfer:0}),sx=In(ax),rx=O({},So,{relatedTarget:0}),Yc=In(rx),ox=O({},Pa,{animationName:0,elapsedTime:0,pseudoElement:0}),lx=In(ox),ux=O({},Pa,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),cx=In(ux),fx=O({},Pa,{data:0}),fm=In(fx),hx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},dx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},px={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function mx(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=px[t])?!!n[t]:!1}function Wc(){return mx}var gx=O({},So,{key:function(t){if(t.key){var n=hx[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=Ul(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?dx[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Wc,charCode:function(t){return t.type==="keypress"?Ul(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ul(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),_x=In(gx),vx=O({},Ol,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),hm=In(vx),Sx=O({},Pa,{submitter:0}),xx=In(Sx),yx=O({},So,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Wc}),Mx=In(yx),Ex=O({},Pa,{propertyName:0,elapsedTime:0,pseudoElement:0}),Tx=In(Ex),bx=O({},Ol,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Ax=In(bx),Rx=O({},Pa,{newState:0,oldState:0,source:0}),Cx=In(Rx),wx=[9,13,27,32],jc=aa&&"CompositionEvent"in window,yo=null;aa&&"documentMode"in document&&(yo=document.documentMode);var Dx=aa&&"TextEvent"in window&&!yo,dm=aa&&(!jc||yo&&8<yo&&11>=yo),pm=" ",mm=!1;function gm(t,n){switch(t){case"keyup":return wx.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function _m(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var sr=!1;function Ux(t,n){switch(t){case"compositionend":return _m(n);case"keypress":return n.which!==32?null:(mm=!0,pm);case"textInput":return t=n.data,t===pm&&mm?null:t;default:return null}}function Nx(t,n){if(sr)return t==="compositionend"||!jc&&gm(t,n)?(t=lm(),Dl=kc=Oa=null,sr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return dm&&n.locale!=="ko"?null:n.data;default:return null}}var Lx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function vm(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!Lx[t.type]:n==="textarea"}function Sm(t,n,a,s){ir?ar?ar.push(s):ar=[s]:ir=s,n=Pu(n,"onChange"),0<n.length&&(a=new Ll("onChange","change",null,a,s),t.push({event:a,listeners:n}))}var Mo=null,Eo=null;function Ox(t){r0(t,0)}function Pl(t){var n=pn(t);if(tm(n))return t}function xm(t,n){if(t==="change")return n}var ym=!1;if(aa){var Zc;if(aa){var Kc="oninput"in document;if(!Kc){var Mm=document.createElement("div");Mm.setAttribute("oninput","return;"),Kc=typeof Mm.oninput=="function"}Zc=Kc}else Zc=!1;ym=Zc&&(!document.documentMode||9<document.documentMode)}function Em(){Mo&&(Mo.detachEvent("onpropertychange",Tm),Eo=Mo=null)}function Tm(t){if(t.propertyName==="value"&&Pl(Eo)){var n=[];Sm(n,Eo,t,Hc(t)),om(Ox,n)}}function Px(t,n,a){t==="focusin"?(Em(),Mo=n,Eo=a,Mo.attachEvent("onpropertychange",Tm)):t==="focusout"&&Em()}function zx(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Pl(Eo)}function Ix(t,n){if(t==="click")return Pl(n)}function Bx(t,n){if(t==="input"||t==="change")return Pl(n)}function Fx(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var ti=typeof Object.is=="function"?Object.is:Fx;function To(t,n){if(ti(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),s=Object.keys(n);if(a.length!==s.length)return!1;for(s=0;s<a.length;s++){var l=a[s];if(!Ot.call(n,l)||!ti(t[l],n[l]))return!1}return!0}function Qc(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function bm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Am(t,n){var a=bm(t);t=0;for(var s;a;){if(a.nodeType===3){if(s=t+a.textContent.length,t<=n&&s>=n)return{node:a,offset:n-t};t=s}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=bm(a)}}function Rm(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Rm(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Cm(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=Qc(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=Qc(t.document)}return n}function Jc(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var Hx=aa&&"documentMode"in document&&11>=document.documentMode,rr=null,$c=null,bo=null,tf=!1;function wm(t,n,a){var s=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;tf||rr==null||rr!==Qc(s)||(s=rr,"selectionStart"in s&&Jc(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),bo&&To(bo,s)||(bo=s,s=Pu($c,"onSelect"),0<s.length&&(n=new Ll("onSelect","select",null,n,a),t.push({event:n,listeners:s}),n.target=rr)))}function xs(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var or={animationend:xs("Animation","AnimationEnd"),animationiteration:xs("Animation","AnimationIteration"),animationstart:xs("Animation","AnimationStart"),transitionrun:xs("Transition","TransitionRun"),transitionstart:xs("Transition","TransitionStart"),transitioncancel:xs("Transition","TransitionCancel"),transitionend:xs("Transition","TransitionEnd")},ef={},Dm={};aa&&(Dm=document.createElement("div").style,"AnimationEvent"in window||(delete or.animationend.animation,delete or.animationiteration.animation,delete or.animationstart.animation),"TransitionEvent"in window||delete or.transitionend.transition);function ys(t){if(ef[t])return ef[t];if(!or[t])return t;var n=or[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Dm)return ef[t]=n[a];return t}var Um=ys("animationend"),Nm=ys("animationiteration"),Lm=ys("animationstart"),Gx=ys("transitionrun"),Vx=ys("transitionstart"),kx=ys("transitioncancel"),Om=ys("transitionend"),Pm=new Map,nf="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");nf.push("scrollEnd");function bi(t,n){Pm.set(t,n),on(n,[t])}var Xx=0;function sa(t,n){if(t.name!=null&&t.name!=="auto")return t.name;if(n.autoName!==null)return n.autoName;t=wi.identifierPrefix;var a=Xx++;return t="_"+t+"t_"+a.toString(32)+"_",n.autoName=t}function zm(t){if(t==null||typeof t=="string")return t;var n=null,a=Rr;if(a!==null)for(var s=0;s<a.length;s++){var l=t[a[s]];if(l!=null){if(l==="none")return"none";n=n==null?l:n+(" "+l)}}return n??t.default}function ra(t,n){return t=zm(t),n=zm(n),n==null?t==="auto"?null:t:n==="auto"?null:n}var zl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},hi=[],lr=0,af=0;function Il(){for(var t=lr,n=af=lr=0;n<t;){var a=hi[n];hi[n++]=null;var s=hi[n];hi[n++]=null;var l=hi[n];hi[n++]=null;var c=hi[n];if(hi[n++]=null,s!==null&&l!==null){var p=s.pending;p===null?l.next=l:(l.next=p.next,p.next=l),s.pending=l}c!==0&&Im(a,l,c)}}function Bl(t,n,a,s){hi[lr++]=t,hi[lr++]=n,hi[lr++]=a,hi[lr++]=s,af|=s,t.lanes|=s,t=t.alternate,t!==null&&(t.lanes|=s)}function sf(t,n,a,s){return Bl(t,n,a,s),Fl(t)}function Ms(t,n){return Bl(t,null,null,n),Fl(t)}function Im(t,n,a){t.lanes|=a;var s=t.alternate;s!==null&&(s.lanes|=a);for(var l=!1,c=t.return;c!==null;)c.childLanes|=a,s=c.alternate,s!==null&&(s.childLanes|=a),c.tag===22&&(t=c.stateNode,t===null||t._visibility&1||(l=!0)),t=c,c=c.return;return t.tag===3?(c=t.stateNode,l&&n!==null&&(l=31-Dn(a),t=c.hiddenUpdates,s=t[l],s===null?t[l]=[n]:s.push(n),n.lane=a|536870912),c):null}function Fl(t){if(50<Wo)throw Wo=0,Cu=null,Error(r(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var ur={};function qx(t,n,a,s){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function kn(t,n,a,s){return new qx(t,n,a,s)}function rf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function oa(t,n){var a=t.alternate;return a===null?(a=kn(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&1206910976,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Bm(t,n){t.flags&=1206910978;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function Hl(t,n,a,s,l,c){var p=0;if(s=t,typeof s=="function")rf(s)&&(p=1);else if(typeof s=="string")p=SM(t,a,Ft.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(s){case Gt:return t=kn(31,a,n,l),t.elementType=Gt,t.lanes=c,t;case G:return Es(a.children,l,c,n);case at:p=8,l|=24;break;case ut:return t=kn(12,a,n,l|2),t.elementType=ut,t.lanes=c,t;case st:return t=kn(13,a,n,l),t.elementType=st,t.lanes=c,t;case Z:return t=kn(19,a,n,l),t.elementType=Z,t.lanes=c,t;case oe:case P:return t=l|32,t=kn(30,a,n,t),t.elementType=P,t.lanes=c,t.stateNode={autoName:null,paired:null,clones:null,ref:null},t;default:if(typeof s=="object"&&s!==null)switch(s.$$typeof){case lt:p=10;break t;case gt:p=9;break t;case W:p=11;break t;case _t:p=14;break t;case St:p=16,s=null;break t}p=29,a=Error(r(130,t===null?"null":typeof t,"")),s=null}return n=kn(p,a,n,l),n.elementType=t,n.type=s,n.lanes=c,n}function Es(t,n,a,s){return t=kn(7,t,s,n),t.lanes=a,t}function of(t,n,a){return t=kn(6,t,null,n),t.lanes=a,t}function Fm(t){var n=kn(18,null,null,0);return n.stateNode=t,n}function lf(t,n,a){return n=kn(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var Hm=new WeakMap;function di(t,n){if(typeof t=="object"&&t!==null){var a=Hm.get(t);return a!==void 0?a:(n={value:t,source:n,stack:Tt(n)},Hm.set(t,n),n)}return{value:t,source:n,stack:Tt(n)}}var cr=[],fr=0,Gl=null,Ao=0,pi=[],mi=0,za=null,Gi=1,Vi="";function la(t,n){cr[fr++]=Ao,cr[fr++]=Gl,Gl=t,Ao=n}function Gm(t,n,a){pi[mi++]=Gi,pi[mi++]=Vi,pi[mi++]=za,za=t;var s=Gi;t=Vi;var l=32-Dn(s)-1;s&=~(1<<l),a+=1;var c=32-Dn(n)+l;if(30<c){var p=l-l%5;c=(s&(1<<p)-1).toString(32),s>>=p,l-=p,Gi=1<<32-Dn(n)+l|a<<l|s,Vi=c+t}else Gi=1<<c|a<<l|s,Vi=t}function Vl(t){t.return!==null&&(la(t,1),Gm(t,1,0))}function uf(t){for(;t===Gl;)Gl=cr[--fr],cr[fr]=null,Ao=cr[--fr],cr[fr]=null;for(;t===za;)za=pi[--mi],pi[mi]=null,Vi=pi[--mi],pi[mi]=null,Gi=pi[--mi],pi[mi]=null}function Vm(t,n){pi[mi++]=Gi,pi[mi++]=Vi,pi[mi++]=za,Gi=n.id,Vi=n.overflow,za=t}var xn=null,Ze=null,_e=!1,Ia=null,gi=!1,cf=Error(r(519));function Ba(t){var n=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ro(di(n,t)),cf}function km(t){var n=t.stateNode,a=t.type,s=t.memoizedProps;switch(n[Ct]=t,n[Xt]=s,a){case"dialog":xe("cancel",n),xe("close",n);break;case"iframe":case"object":case"embed":xe("load",n);break;case"video":case"audio":for(a=0;a<Zo.length;a++)xe(Zo[a],n);break;case"source":xe("error",n);break;case"img":case"image":case"link":xe("error",n),xe("load",n);break;case"details":xe("toggle",n);break;case"input":xe("invalid",n),em(n,s.value,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name,!0);break;case"select":xe("invalid",n);break;case"textarea":xe("invalid",n),im(n,s.value,s.defaultValue,s.children)}a=s.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||s.suppressHydrationWarning===!0||c0(n.textContent,a)?(s.popover!=null&&(xe("beforetoggle",n),xe("toggle",n)),s.onScroll!=null&&xe("scroll",n),s.onScrollEnd!=null&&xe("scrollend",n),s.onClick!=null&&(n.onclick=Hi),n=!0):n=!1,n||Ba(t,!0)}function kl(t){for(xn=t.return;xn;)switch(xn.tag){case 5:case 31:case 13:gi=!1;return;case 27:case 3:gi=!0;return;default:xn=xn.return}}function hr(t){if(t!==xn)return!1;if(!_e)return kl(t),_e=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||Hh(t.type,t.memoizedProps)),a=!a),a&&Ze&&Ba(t),kl(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Ze=w0(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Ze=w0(t)}else n===27?(n=Ze,ts(t.type)?(t=Zh,Zh=null,Ze=t):Ze=n):Ze=xn?vi(t.stateNode.nextSibling):null;return!0}function Ts(){Ze=xn=null,_e=!1}function ff(){var t=Ia;return t!==null&&(Yn===null?Yn=t:Yn.push.apply(Yn,t),Ia=null),t}function Ro(t){Ia===null?Ia=[t]:Ia.push(t)}var hf=Qt(null),bs=null,ua=null;function Fa(t,n,a){ae(hf,n._currentValue),n._currentValue=a}function ca(t){t._currentValue=hf.current,Nt(hf)}function Xl(t,n,a){for(;t!==null;){var s=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,s!==null&&(s.childLanes|=n)):s!==null&&(s.childLanes&n)!==n&&(s.childLanes|=n),t===a)break;t=t.return}}function df(t,n,a,s){var l=t.child;for(l!==null&&(l.return=t);l!==null;){var c=l.dependencies;if(c!==null){var p=l.child;c=c.firstContext;t:for(;c!==null;){var E=c;c=l;for(var N=0;N<n.length;N++)if(E.context===n[N]){c.lanes|=a,E=c.alternate,E!==null&&(E.lanes|=a),Xl(c.return,a,t),s||(p=null);break t}c=E.next}}else if(l.tag===18){if(p=l.return,p===null)throw Error(r(341));p.lanes|=a,c=p.alternate,c!==null&&(c.lanes|=a),Xl(p,a,t),p=null}else l.tag===13&&l.memoizedState!==null&&l.memoizedState.dehydrated===null?(l.lanes|=a,p=l.alternate,p!==null&&(p.lanes|=a),Xl(l.return,a,t),p=l.child,p=p!==null?p.sibling:null):p=l.child;if(p!==null)p.return=l;else for(p=l;p!==null;){if(p===t){p=null;break}if(l=p.sibling,l!==null){l.return=p.return,p=l;break}p=p.return}l=p}}function As(t,n,a,s){t=null;for(var l=n,c=!1;l!==null;){if(!c){if((l.flags&524288)!==0)c=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var p=l.alternate;if(p===null)throw Error(r(387));if(p=p.memoizedProps,p!==null){var E=l.type;ti(l.pendingProps.value,p.value)||(t!==null?t.push(E):t=[E])}}else if(l===We.current){if(p=l.alternate,p===null)throw Error(r(387));p.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(t!==null?t.push(Ir):t=[Ir])}l=l.return}return t!==null&&df(n,t,a,s),n.flags|=262144,t!==null}function ql(t){for(t=t.firstContext;t!==null;){if(!ti(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Rs(t){bs=t,ua=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Tn(t){return Xm(bs,t)}function Yl(t,n){return bs===null&&Rs(t),Xm(t,n)}function Xm(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},ua===null){if(t===null)throw Error(r(308));ua=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else ua=ua.next=n;return a}var Yx=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,s){t.push(s)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},Wx=o.unstable_scheduleCallback,jx=o.unstable_NormalPriority,ln={$$typeof:lt,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function pf(){return{controller:new Yx,data:new Map,refCount:0}}function Co(t){t.refCount--,t.refCount===0&&Wx(jx,function(){t.controller.abort()})}function qm(t,n){if((t.pendingLanes&4194048)!==0){var a=t.transitionTypes;for(a===null&&(a=t.transitionTypes=[]),t=0;t<n.length;t++){var s=n[t];a.indexOf(s)===-1&&a.push(s)}}}var wo=null;function Zx(t){var n=t.transitionTypes;return t.transitionTypes=null,n}var Do=null,mf=0,Cs=0,dr=null;function Kx(t,n){if(Do===null){var a=Do=[];mf=0,Cs=Uh(),dr={status:"pending",value:void 0,then:function(s){a.push(s)}}}return mf++,n.then(Ym,Ym),n}function Ym(){if(--mf===0&&(wo=null,Do!==null)){dr!==null&&(dr.status="fulfilled");var t=Do;Do=null,Cs=0,dr=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function Qx(t,n){var a=[],s={status:"pending",value:null,reason:null,then:function(l){a.push(l)}};return t.then(function(){s.status="fulfilled",s.value=n;for(var l=0;l<a.length;l++)(0,a[l])(n)},function(l){for(s.status="rejected",s.reason=l,l=0;l<a.length;l++)(0,a[l])(void 0)}),s}var Wm=Mt.S;Mt.S=function(t,n){if(F_=F(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Kx(t,n),wo!==null)for(var a=Ur;a!==null;)qm(a,wo),a=a.next;if(a=t.types,a!==null){for(var s=Ur;s!==null;)qm(s,a),s=s.next;if(Cs!==0){s=wo,s===null&&(s=wo=[]);for(var l=0;l<a.length;l++){var c=a[l];s.indexOf(c)===-1&&s.push(c)}}}Wm!==null&&Wm(t,n)};var ws=Qt(null);function gf(){var t=ws.current;return t!==null?t:Ye.pooledCache}function Wl(t,n){n===null?ae(ws,ws.current):ae(ws,n.pool)}function jm(){var t=gf();return t===null?null:{parent:ln._currentValue,pool:t}}var pr=Error(r(460)),_f=Error(r(474)),jl=Error(r(542)),Zl={then:function(){}};function Zm(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Km(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(Hi,Hi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Jm(t),t===void 0&&!("reason"in n)?Error(r(600)):t;default:if(typeof n.status=="string")n.then(Hi,Hi);else{if(t=Ye,t!==null&&100<t.shellSuspendCounter)throw Error(r(482));t=n,t.status="pending",t.then(function(s){if(n.status==="pending"){var l=n;l.status="fulfilled",l.value=s}},function(s){if(n.status==="pending"){var l=n;l.status="rejected",l.reason=s}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Jm(t),t}throw Us=n,pr}}function Ds(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Us=a,pr):a}}var Us=null;function Qm(){if(Us===null)throw Error(r(459));var t=Us;return Us=null,t}function Jm(t){if(t===pr||t===jl)throw Error(r(483))}var mr=null,Uo=0;function Kl(t){var n=Uo;return Uo+=1,mr===null&&(mr=[]),Km(mr,t,n)}function Ha(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function Ql(t,n){throw n.$$typeof===q?Error(r(525)):(t=Object.prototype.toString.call(n),Error(r(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function $m(t){function n(X,B){if(t){var Q=X.deletions;Q===null?(X.deletions=[B],X.flags|=16):Q.push(B)}}function a(X,B){if(!t)return null;for(;B!==null;)n(X,B),B=B.sibling;return null}function s(X){for(var B=new Map;X!==null;)X.key===null?B.set(X.index,X):B.set(X.key,X),X=X.sibling;return B}function l(X,B){return X=oa(X,B),X.index=0,X.sibling=null,X}function c(X,B,Q){return X.index=Q,t?(Q=X.alternate,Q!==null?(Q=Q.index,Q<B?(X.flags|=2,B):Q):(X.flags|=134217730,B)):(X.flags|=1048576,B)}function p(X){return t&&X.alternate===null&&(X.flags|=134217730),X}function E(X,B,Q,ht){return B===null||B.tag!==6?(B=of(Q,X.mode,ht),B.return=X,B):(B=l(B,Q),B.return=X,B)}function N(X,B,Q,ht){var Ht=Q.type;return Ht===G?(X=nt(X,B,Q.props.children,ht,Q.key),Ha(X,Q),X):B!==null&&(B.elementType===Ht||typeof Ht=="object"&&Ht!==null&&Ht.$$typeof===St&&Ds(Ht)===B.type)?(B=l(B,Q.props),Ha(B,Q),B.return=X,B):(B=Hl(Q.type,Q.key,Q.props,null,X.mode,ht),Ha(B,Q),B.return=X,B)}function Y(X,B,Q,ht){return B===null||B.tag!==4||B.stateNode.containerInfo!==Q.containerInfo||B.stateNode.implementation!==Q.implementation?(B=lf(Q,X.mode,ht),B.return=X,B):(B=l(B,Q.children||[]),B.return=X,B)}function nt(X,B,Q,ht,Ht){return B===null||B.tag!==7?(B=Es(Q,X.mode,ht,Ht),B.return=X,B):(B=l(B,Q),B.return=X,B)}function pt(X,B,Q){if(typeof B=="string"&&B!==""||typeof B=="number"||typeof B=="bigint")return B=of(""+B,X.mode,Q),B.return=X,B;if(typeof B=="object"&&B!==null){switch(B.$$typeof){case w:return Q=Hl(B.type,B.key,B.props,null,X.mode,Q),Ha(Q,B),Q.return=X,Q;case R:return B=lf(B,X.mode,Q),B.return=X,B;case St:return B=Ds(B),pt(X,B,Q)}if(At(B)||it(B))return B=Es(B,X.mode,Q,null),B.return=X,B;if(typeof B.then=="function")return pt(X,Kl(B),Q);if(B.$$typeof===lt)return pt(X,Yl(X,B),Q);Ql(X,B)}return null}function k(X,B,Q,ht){var Ht=B!==null?B.key:null;if(typeof Q=="string"&&Q!==""||typeof Q=="number"||typeof Q=="bigint")return Ht!==null?null:E(X,B,""+Q,ht);if(typeof Q=="object"&&Q!==null){switch(Q.$$typeof){case w:return Q.key===Ht?N(X,B,Q,ht):null;case R:return Q.key===Ht?Y(X,B,Q,ht):null;case St:return Q=Ds(Q),k(X,B,Q,ht)}if(At(Q)||it(Q))return Ht!==null?null:nt(X,B,Q,ht,null);if(typeof Q.then=="function")return k(X,B,Kl(Q),ht);if(Q.$$typeof===lt)return k(X,B,Yl(X,Q),ht);Ql(X,Q)}return null}function $(X,B,Q,ht,Ht){if(typeof ht=="string"&&ht!==""||typeof ht=="number"||typeof ht=="bigint")return X=X.get(Q)||null,E(B,X,""+ht,Ht);if(typeof ht=="object"&&ht!==null){switch(ht.$$typeof){case w:return X=X.get(ht.key===null?Q:ht.key)||null,N(B,X,ht,Ht);case R:return X=X.get(ht.key===null?Q:ht.key)||null,Y(B,X,ht,Ht);case St:return ht=Ds(ht),$(X,B,Q,ht,Ht)}if(At(ht)||it(ht))return X=X.get(Q)||null,nt(B,X,ht,Ht,null);if(typeof ht.then=="function")return $(X,B,Q,Kl(ht),Ht);if(ht.$$typeof===lt)return $(X,B,Q,Yl(B,ht),Ht);Ql(B,ht)}return null}function Dt(X,B,Q,ht){for(var Ht=null,Te=null,Jt=B,se=B=0,fn=null;Jt!==null&&se<Q.length;se++){Jt.index>se?(fn=Jt,Jt=null):fn=Jt.sibling;var Ae=k(X,Jt,Q[se],ht);if(Ae===null){Jt===null&&(Jt=fn);break}t&&Jt&&Ae.alternate===null&&n(X,Jt),B=c(Ae,B,se),Te===null?Ht=Ae:Te.sibling=Ae,Te=Ae,Jt=fn}if(se===Q.length)return a(X,Jt),_e&&la(X,se),Ht;if(Jt===null){for(;se<Q.length;se++)Jt=pt(X,Q[se],ht),Jt!==null&&(B=c(Jt,B,se),Te===null?Ht=Jt:Te.sibling=Jt,Te=Jt);return _e&&la(X,se),Ht}for(Jt=s(Jt);se<Q.length;se++)fn=$(Jt,X,se,Q[se],ht),fn!==null&&(t&&(Ae=fn.alternate,Ae!==null&&Jt.delete(Ae.key===null?se:Ae.key)),B=c(fn,B,se),Te===null?Ht=fn:Te.sibling=fn,Te=fn);return t&&Jt.forEach(function(ss){return n(X,ss)}),_e&&la(X,se),Ht}function qt(X,B,Q,ht){if(Q==null)throw Error(r(151));for(var Ht=null,Te=null,Jt=B,se=B=0,fn=null,Ae=Q.next();Jt!==null&&!Ae.done;se++,Ae=Q.next()){Jt.index>se?(fn=Jt,Jt=null):fn=Jt.sibling;var ss=k(X,Jt,Ae.value,ht);if(ss===null){Jt===null&&(Jt=fn);break}t&&Jt&&ss.alternate===null&&n(X,Jt),B=c(ss,B,se),Te===null?Ht=ss:Te.sibling=ss,Te=ss,Jt=fn}if(Ae.done)return a(X,Jt),_e&&la(X,se),Ht;if(Jt===null){for(;!Ae.done;se++,Ae=Q.next())Ae=pt(X,Ae.value,ht),Ae!==null&&(B=c(Ae,B,se),Te===null?Ht=Ae:Te.sibling=Ae,Te=Ae);return _e&&la(X,se),Ht}for(Jt=s(Jt);!Ae.done;se++,Ae=Q.next())Ae=$(Jt,X,se,Ae.value,ht),Ae!==null&&(t&&(fn=Ae.alternate,fn!==null&&Jt.delete(fn.key===null?se:fn.key)),B=c(Ae,B,se),Te===null?Ht=Ae:Te.sibling=Ae,Te=Ae);return t&&Jt.forEach(function(UM){return n(X,UM)}),_e&&la(X,se),Ht}function de(X,B,Q,ht){if(typeof Q=="object"&&Q!==null&&Q.type===G&&Q.key===null&&Q.props.ref===void 0&&(Q=Q.props.children),typeof Q=="object"&&Q!==null){switch(Q.$$typeof){case w:t:{for(var Ht=Q.key;B!==null;){if(B.key===Ht){if(Ht=Q.type,Ht===G){if(B.tag===7){a(X,B.sibling),ht=l(B,Q.props.children),Ha(ht,Q),ht.return=X,X=ht;break t}}else if(B.elementType===Ht||typeof Ht=="object"&&Ht!==null&&Ht.$$typeof===St&&Ds(Ht)===B.type){a(X,B.sibling),ht=l(B,Q.props),Ha(ht,Q),ht.return=X,X=ht;break t}a(X,B);break}else n(X,B);B=B.sibling}Q.type===G?(ht=Es(Q.props.children,X.mode,ht,Q.key),Ha(ht,Q),ht.return=X,X=ht):(ht=Hl(Q.type,Q.key,Q.props,null,X.mode,ht),Ha(ht,Q),ht.return=X,X=ht)}return p(X);case R:t:{for(Ht=Q.key;B!==null;){if(B.key===Ht)if(B.tag===4&&B.stateNode.containerInfo===Q.containerInfo&&B.stateNode.implementation===Q.implementation){a(X,B.sibling),ht=l(B,Q.children||[]),ht.return=X,X=ht;break t}else{a(X,B);break}else n(X,B);B=B.sibling}ht=lf(Q,X.mode,ht),ht.return=X,X=ht}return p(X);case St:return Q=Ds(Q),de(X,B,Q,ht)}if(At(Q))return Dt(X,B,Q,ht);if(it(Q)){if(Ht=it(Q),typeof Ht!="function")throw Error(r(150));return Q=Ht.call(Q),qt(X,B,Q,ht)}if(typeof Q.then=="function")return de(X,B,Kl(Q),ht);if(Q.$$typeof===lt)return de(X,B,Yl(X,Q),ht);Ql(X,Q)}return typeof Q=="string"&&Q!==""||typeof Q=="number"||typeof Q=="bigint"?(Q=""+Q,B!==null&&B.tag===6?(a(X,B.sibling),ht=l(B,Q),ht.return=X,X=ht):(a(X,B),ht=of(Q,X.mode,ht),ht.return=X,X=ht),p(X)):a(X,B)}return function(X,B,Q,ht){try{Uo=0;var Ht=de(X,B,Q,ht);return mr=null,Ht}catch(Jt){if(Jt===pr||Jt===jl)throw Jt;var Te=kn(29,Jt,null,X.mode);return Te.lanes=ht,Te.return=X,Te}}}var Ns=$m(!0),tg=$m(!1),Ga=!1;function vf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Sf(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Va(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function ka(t,n,a){var s=t.updateQueue;if(s===null)return null;if(s=s.shared,(Oe&2)!==0){var l=s.pending;return l===null?n.next=n:(n.next=l.next,l.next=n),s.pending=n,n=Fl(t),Im(t,null,a),n}return Bl(t,s,n,a),Fl(t)}function No(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var s=n.lanes;s&=t.pendingLanes,a|=s,n.lanes=a,j(t,a)}}function xf(t,n){var a=t.updateQueue,s=t.alternate;if(s!==null&&(s=s.updateQueue,a===s)){var l=null,c=null;if(a=a.firstBaseUpdate,a!==null){do{var p={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};c===null?l=c=p:c=c.next=p,a=a.next}while(a!==null);c===null?l=c=n:c=c.next=n}else l=c=n;a={baseState:s.baseState,firstBaseUpdate:l,lastBaseUpdate:c,shared:s.shared,callbacks:s.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var yf=!1;function Lo(){if(yf){var t=dr;if(t!==null)throw t}}function Oo(t,n,a,s){yf=!1;var l=t.updateQueue;Ga=!1;var c=l.firstBaseUpdate,p=l.lastBaseUpdate,E=l.shared.pending;if(E!==null){l.shared.pending=null;var N=E,Y=N.next;N.next=null,p===null?c=Y:p.next=Y,p=N;var nt=t.alternate;nt!==null&&(nt=nt.updateQueue,E=nt.lastBaseUpdate,E!==p&&(E===null?nt.firstBaseUpdate=Y:E.next=Y,nt.lastBaseUpdate=N))}if(c!==null){var pt=l.baseState;p=0,nt=Y=N=null,E=c;do{var k=E.lane&-536870913,$=k!==E.lane;if($?(Ee&k)===k:(s&k)===k){k!==0&&k===Cs&&(yf=!0),nt!==null&&(nt=nt.next={lane:0,tag:E.tag,payload:E.payload,callback:null,next:null});t:{var Dt=t,qt=E;k=n;var de=a;switch(qt.tag){case 1:if(Dt=qt.payload,typeof Dt=="function"){pt=Dt.call(de,pt,k);break t}pt=Dt;break t;case 3:Dt.flags=Dt.flags&-65537|128;case 0:if(Dt=qt.payload,k=typeof Dt=="function"?Dt.call(de,pt,k):Dt,k==null)break t;pt=O({},pt,k);break t;case 2:Ga=!0}}k=E.callback,k!==null&&(t.flags|=64,$&&(t.flags|=8192),$=l.callbacks,$===null?l.callbacks=[k]:$.push(k))}else $={lane:k,tag:E.tag,payload:E.payload,callback:E.callback,next:null},nt===null?(Y=nt=$,N=pt):nt=nt.next=$,p|=k;if(E=E.next,E===null){if(E=l.shared.pending,E===null)break;$=E,E=$.next,$.next=null,l.lastBaseUpdate=$,l.shared.pending=null}}while(!0);nt===null&&(N=pt),l.baseState=N,l.firstBaseUpdate=Y,l.lastBaseUpdate=nt,c===null&&(l.shared.lanes=0),Ka|=p,t.lanes=p,t.memoizedState=pt}}function eg(t,n){if(typeof t!="function")throw Error(r(191,t));t.call(n)}function ng(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)eg(a[t],n)}var Xa=Qt(null),Jl=Qt(0);function ig(t,n){t=ma,ae(Jl,t),ae(Xa,n),ma=t|n.baseLanes}function Mf(){ae(Jl,ma),ae(Xa,Xa.current)}function Ef(){ma=Jl.current,Nt(Xa),Nt(Jl)}var bn=Qt(null),Nn=null;function qa(t){var n=t.alternate;ae(An,An.current&1),ae(bn,t),Nn===null&&(n===null||Xa.current!==null||n.memoizedState!==null)&&(Nn=t)}function Tf(t){ae(An,An.current),ae(bn,t),Nn===null&&(Nn=t)}function ag(t){t.tag===22?(ae(An,An.current),ae(bn,t),Nn===null&&(Nn=t)):Ya()}function Ya(){ae(An,An.current),ae(bn,bn.current)}function ei(t){Nt(bn),Nn===t&&(Nn=null),Nt(An)}var An=Qt(0);function Po(t,n){ae(bn,bn.current),ae(An,n)}function bf(t){Nt(An),Nt(bn),Nn===t&&(Nn=null)}function $l(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Wh(a)||jh(a)))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!=="independent"){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var fa=0,he=null,Ve=null,un=null,tu=!1,gr=!1,Ls=!1,eu=0,zo=0,_r=null,Jx=0;function nn(){throw Error(r(321))}function Af(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!ti(t[a],n[a]))return!1;return!0}function Rf(t,n,a,s,l,c){return fa=c,he=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Mt.H=t===null||t.memoizedState===null?Gg:Vg,Ls=!1,c=a(s,l),Ls=!1,gr&&(c=rg(n,a,s,l)),sg(t),c}function sg(t){Mt.H=lu;var n=Ve!==null&&Ve.next!==null;if(fa=0,un=Ve=he=null,tu=!1,zo=0,_r=null,n)throw Error(r(300));t===null||cn||(t=t.dependencies,t!==null&&ql(t)&&(cn=!0))}function rg(t,n,a,s){he=t;var l=0;do{if(gr&&(_r=null),zo=0,gr=!1,25<=l)throw Error(r(301));if(l+=1,un=Ve=null,t.updateQueue!=null){var c=t.updateQueue;c.lastEffect=null,c.events=null,c.stores=null,c.memoCache!=null&&(c.memoCache.index=0)}Mt.H=ry,c=n(a,s)}while(gr);return c}function $x(){var t=Mt.H,n=t.useState()[0];return n=typeof n.then=="function"?Io(n):n,t=t.useState()[0],(Ve!==null?Ve.memoizedState:null)!==t&&(he.flags|=1024),n}function Cf(){var t=eu!==0;return eu=0,t}function wf(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function Df(t){if(tu){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}tu=!1}fa=0,un=Ve=he=null,gr=!1,zo=eu=0,_r=null}function Bn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return un===null?he.memoizedState=un=t:un=un.next=t,un}function sn(){if(Ve===null){var t=he.alternate;t=t!==null?t.memoizedState:null}else t=Ve.next;var n=un===null?he.memoizedState:un.next;if(n!==null)un=n,Ve=t;else{if(t===null)throw he.alternate===null?Error(r(467)):Error(r(310));Ve=t,t={memoizedState:Ve.memoizedState,baseState:Ve.baseState,baseQueue:Ve.baseQueue,queue:Ve.queue,next:null},un===null?he.memoizedState=un=t:un=un.next=t}return un}function nu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Io(t){var n=zo;return zo+=1,_r===null&&(_r=[]),t=Km(_r,t,n),n=he,(un===null?n.memoizedState:un.next)===null&&(n=n.alternate,Mt.H=n===null||n.memoizedState===null?Gg:Vg),t}function iu(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Io(t);if(t.$$typeof===ct)return;if(t.$$typeof===lt)return Tn(t)}throw Error(r(438,String(t)))}function Uf(t){var n=null,a=he.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var s=he.alternate;s!==null&&(s=s.updateQueue,s!==null&&(s=s.memoCache,s!=null&&(n={data:s.data.map(function(l){return l.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=nu(),he.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),s=0;s<t;s++)a[s]=be;return n.index++,a}function ha(t,n){return typeof n=="function"?n(t):n}function au(t){var n=sn();return Nf(n,Ve,t)}function Nf(t,n,a){var s=t.queue;if(s===null)throw Error(r(311));s.lastRenderedReducer=a;var l=t.baseQueue,c=s.pending;if(c!==null){if(l!==null){var p=l.next;l.next=c.next,c.next=p}n.baseQueue=l=c,s.pending=null}if(c=t.baseState,l===null)t.memoizedState=c;else{n=l.next;var E=p=null,N=null,Y=n,nt=!1;do{var pt=Y.lane&-536870913;if(pt!==Y.lane?(Ee&pt)===pt:(fa&pt)===pt){var k=Y.revertLane;if(k===0)N!==null&&(N=N.next={lane:0,revertLane:0,gesture:null,action:Y.action,hasEagerState:Y.hasEagerState,eagerState:Y.eagerState,next:null}),pt===Cs&&(nt=!0);else if((fa&k)===k){Y=Y.next,k===Cs&&(nt=!0);continue}else pt={lane:0,revertLane:Y.revertLane,gesture:null,action:Y.action,hasEagerState:Y.hasEagerState,eagerState:Y.eagerState,next:null},N===null?(E=N=pt,p=c):N=N.next=pt,he.lanes|=k,Ka|=k;pt=Y.action,Ls&&a(c,pt),c=Y.hasEagerState?Y.eagerState:a(c,pt)}else k={lane:pt,revertLane:Y.revertLane,gesture:Y.gesture,action:Y.action,hasEagerState:Y.hasEagerState,eagerState:Y.eagerState,next:null},N===null?(E=N=k,p=c):N=N.next=k,he.lanes|=pt,Ka|=pt;Y=Y.next}while(Y!==null&&Y!==n);if(N===null?p=c:N.next=E,!ti(c,t.memoizedState)&&(cn=!0,nt&&(a=dr,a!==null)))throw a;t.memoizedState=c,t.baseState=p,t.baseQueue=N,s.lastRenderedState=c}return l===null&&(s.lanes=0),[t.memoizedState,s.dispatch]}function Lf(t){var n=sn(),a=n.queue;if(a===null)throw Error(r(311));a.lastRenderedReducer=t;var s=a.dispatch,l=a.pending,c=n.memoizedState;if(l!==null){a.pending=null;var p=l=l.next;do c=t(c,p.action),p=p.next;while(p!==l);ti(c,n.memoizedState)||(cn=!0),n.memoizedState=c,n.baseQueue===null&&(n.baseState=c),a.lastRenderedState=c}return[c,s]}function og(t,n,a){var s=he,l=sn(),c=_e;if(c){if(a===void 0)throw Error(r(407));a=a()}else a=n();var p=!ti((Ve||l).memoizedState,a);if(p&&(l.memoizedState=a,cn=!0),l=l.queue,zf(cg.bind(null,s,l,t),[t]),t=l.getSnapshot!==n||p||un!==null&&(un.memoizedState.tag&1)!==0,vr(t?9:8,{destroy:void 0},ug.bind(null,s,l,a,n),null),t){if(s.flags|=2048,Ye===null)throw Error(r(349));c||(fa&127)!==0||lg(s,n,a)}return a}function lg(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=he.updateQueue,n===null?(n=nu(),he.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function ug(t,n,a,s){n.value=a,n.getSnapshot=s,fg(n)&&hg(t)}function cg(t,n,a){return a(function(){fg(n)&&hg(t)})}function fg(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!ti(t,a)}catch{return!0}}function hg(t){var n=Ms(t,2);n!==null&&Wn(n,t,2)}function Of(t){var n=Bn();if(typeof t=="function"){var a=t;if(t=a(),Ls){dn(!0);try{a()}finally{dn(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ha,lastRenderedState:t},n}function dg(t,n,a,s){return t.baseState=a,Nf(t,Ve,typeof s=="function"?s:ha)}function ty(t,n,a,s,l){if(ou(t))throw Error(r(485));if(t=n.action,t!==null){var c={payload:l,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(p){c.listeners.push(p)}};Mt.T!==null?a(!0):c.isTransition=!1,s(c),a=n.pending,a===null?(c.next=n.pending=c,pg(n,c)):(c.next=a.next,n.pending=a.next=c)}}function pg(t,n){var a=n.action,s=n.payload,l=t.state;if(n.isTransition){var c=Mt.T,p={};p.types=c!==null?c.types:null,Mt.T=p;try{var E=a(l,s),N=Mt.S;N!==null&&N(p,E),mg(t,n,E)}catch(Y){Pf(t,n,Y)}finally{c!==null&&p.types!==null&&(c.types=p.types),Mt.T=c}}else try{c=a(l,s),mg(t,n,c)}catch(Y){Pf(t,n,Y)}}function mg(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(s){gg(t,n,s)},function(s){return Pf(t,n,s)}):gg(t,n,a)}function gg(t,n,a){n.status="fulfilled",n.value=a,_g(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,pg(t,a)))}function Pf(t,n,a){var s=t.pending;if(t.pending=null,s!==null){s=s.next;do n.status="rejected",n.reason=a,_g(n),n=n.next;while(n!==s)}t.action=null}function _g(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function vg(t,n){return n}function Sg(t,n){if(_e){var a=Ye.formState;if(a!==null){t:{var s=he;if(_e){if(Ze){e:{for(var l=Ze,c=gi;l.nodeType!==8;){if(!c){l=null;break e}if(l=vi(l.nextSibling),l===null){l=null;break e}}c=l.data,l=c==="F!"||c==="F"?l:null}if(l){Ze=vi(l.nextSibling),s=l.data==="F!";break t}}Ba(s)}s=!1}s&&(n=a[0])}}return a=Bn(),a.memoizedState=a.baseState=n,s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:vg,lastRenderedState:n},a.queue=s,a=Bg.bind(null,he,s),s.dispatch=a,s=Of(!1),c=Gf.bind(null,he,!1,s.queue),s=Bn(),l={state:n,dispatch:null,action:t,pending:null},s.queue=l,a=ty.bind(null,he,l,c,a),l.dispatch=a,s.memoizedState=t,[n,a,!1]}function xg(t){var n=sn();return yg(n,Ve,t)}function yg(t,n,a){if(n=Nf(t,n,vg)[0],t=au(ha)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var s=Io(n)}catch(p){throw p===pr?jl:p}else s=n;n=sn();var l=n.queue,c=l.dispatch;return a!==n.memoizedState&&(he.flags|=2048,vr(9,{destroy:void 0},ey.bind(null,l,a),null)),[s,c,t]}function ey(t,n){t.action=n}function Mg(t){var n=sn(),a=Ve;if(a!==null)return yg(n,a,t);sn(),n=n.memoizedState,a=sn();var s=a.queue.dispatch;return a.memoizedState=t,[n,s,!1]}function vr(t,n,a,s){return t={tag:t,create:a,deps:s,inst:n,next:null},n=he.updateQueue,n===null&&(n=nu(),he.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(s=a.next,a.next=t,t.next=s,n.lastEffect=t),t}function Eg(){return sn().memoizedState}function su(t,n,a,s){var l=Bn();he.flags|=t,l.memoizedState=vr(1|n,{destroy:void 0},a,s===void 0?null:s)}function ru(t,n,a,s){var l=sn();s=s===void 0?null:s;var c=l.memoizedState.inst;Ve!==null&&s!==null&&Af(s,Ve.memoizedState.deps)?l.memoizedState=vr(n,c,a,s):(he.flags|=t,l.memoizedState=vr(1|n,c,a,s))}function Tg(t,n){su(8390656,8,t,n)}function zf(t,n){ru(2048,8,t,n)}function ny(t){he.flags|=4;var n=he.updateQueue;if(n===null)n=nu(),he.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function bg(t){var n=sn().memoizedState;return ny({ref:n,nextImpl:t}),function(){if((Oe&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}function Ag(t,n){return ru(4,2,t,n)}function Rg(t,n){return ru(4,4,t,n)}function Cg(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function wg(t,n,a){a=a!=null?a.concat([t]):null,ru(4,4,Cg.bind(null,n,t),a)}function If(){}function Dg(t,n){var a=sn();n=n===void 0?null:n;var s=a.memoizedState;return n!==null&&Af(n,s[1])?s[0]:(a.memoizedState=[t,n],t)}function Ug(t,n){var a=sn();n=n===void 0?null:n;var s=a.memoizedState;if(n!==null&&Af(n,s[1]))return s[0];if(s=t(),Ls){dn(!0);try{t()}finally{dn(!1)}}return a.memoizedState=[s,n],s}function Bf(t,n,a){return a===void 0||(fa&1073741824)!==0&&(Ee&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=G_(),he.lanes|=t,Ka|=t,a)}function Ng(t,n,a,s){return ti(a,n)?a:Xa.current!==null?(t=Bf(t,a,s),ti(t,n)||(cn=!0),t):(fa&106)===0||(fa&1073741824)!==0&&(Ee&261930)===0?(cn=!0,t.memoizedState=a):(t=G_(),he.lanes|=t,Ka|=t,n)}function Lg(t,n,a,s,l){var c=Yt.p;Yt.p=c!==0&&8>c?c:8;var p=Mt.T,E={};E.types=p!==null?p.types:null,Mt.T=E,Gf(t,!1,n,a);try{var N=l(),Y=Mt.S;if(Y!==null&&Y(E,N),N!==null&&typeof N=="object"&&typeof N.then=="function"){var nt=Qx(N,s);Bo(t,n,nt,si(t))}else Bo(t,n,s,si(t))}catch(pt){Bo(t,n,{then:function(){},status:"rejected",reason:pt},si())}finally{Yt.p=c,p!==null&&E.types!==null&&(p.types=E.types),Mt.T=p}}function iy(){}function Ff(t,n,a,s){if(t.tag!==5)throw Error(r(476));var l=Og(t).queue;Lg(t,l,n,L,a===null?iy:function(){return Pg(t),a(s)})}function Og(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:L,baseState:L,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ha,lastRenderedState:L},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ha,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function Pg(t){var n=Og(t);n.next===null&&(n=t.alternate.memoizedState),Bo(t,n.next.queue,{},si())}function Hf(){return Tn(Ir)}function zg(){return sn().memoizedState}function Ig(){return sn().memoizedState}function ay(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=si();t=Va(a);var s=ka(n,t,a);s!==null&&(Wn(s,n,a),No(s,n,a)),n={cache:pf()},t.payload=n;return}n=n.return}}function sy(t,n,a){var s=si();a={lane:s,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},ou(t)?Fg(n,a):(a=sf(t,n,a,s),a!==null&&(Wn(a,t,s),Hg(a,n,s)))}function Bg(t,n,a){var s=si();Bo(t,n,a,s)}function Bo(t,n,a,s){var l={lane:s,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(ou(t))Fg(n,l);else{var c=t.alternate;if(t.lanes===0&&(c===null||c.lanes===0)&&(c=n.lastRenderedReducer,c!==null))try{var p=n.lastRenderedState,E=c(p,a);if(l.hasEagerState=!0,l.eagerState=E,ti(E,p))return Bl(t,n,l,0),Ye===null&&Il(),!1}catch{}if(a=sf(t,n,l,s),a!==null)return Wn(a,t,s),Hg(a,n,s),!0}return!1}function Gf(t,n,a,s){if(s={lane:2,revertLane:Uh(),gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},ou(t)){if(n)throw Error(r(479))}else n=sf(t,a,s,2),n!==null&&Wn(n,t,2)}function ou(t){var n=t.alternate;return t===he||n!==null&&n===he}function Fg(t,n){gr=tu=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function Hg(t,n,a){if((a&4194048)!==0){var s=n.lanes;s&=t.pendingLanes,a|=s,n.lanes=a,j(t,a)}}var lu={readContext:Tn,use:iu,useCallback:nn,useContext:nn,useEffect:nn,useImperativeHandle:nn,useLayoutEffect:nn,useInsertionEffect:nn,useMemo:nn,useReducer:nn,useRef:nn,useState:nn,useDebugValue:nn,useDeferredValue:nn,useTransition:nn,useSyncExternalStore:nn,useId:nn,useHostTransitionStatus:nn,useFormState:nn,useActionState:nn,useOptimistic:nn,useMemoCache:nn,useCacheRefresh:nn,useEffectEvent:nn},Gg={readContext:Tn,use:iu,useCallback:function(t,n){return Bn().memoizedState=[t,n===void 0?null:n],t},useContext:Tn,useEffect:Tg,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,su(4194308,4,Cg.bind(null,n,t),a)},useLayoutEffect:function(t,n){return su(4194308,4,t,n)},useInsertionEffect:function(t,n){su(4,2,t,n)},useMemo:function(t,n){var a=Bn();n=n===void 0?null:n;var s=t();if(Ls){dn(!0);try{t()}finally{dn(!1)}}return a.memoizedState=[s,n],s},useReducer:function(t,n,a){var s=Bn();if(a!==void 0){var l=a(n);if(Ls){dn(!0);try{a(n)}finally{dn(!1)}}}else l=n;return s.memoizedState=s.baseState=l,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:l},s.queue=t,t=t.dispatch=sy.bind(null,he,t),[s.memoizedState,t]},useRef:function(t){var n=Bn();return t={current:t},n.memoizedState=t},useState:function(t){t=Of(t);var n=t.queue,a=Bg.bind(null,he,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:If,useDeferredValue:function(t,n){var a=Bn();return Bf(a,t,n)},useTransition:function(){var t=Of(!1);return t=Lg.bind(null,he,t.queue,!0,!1),Bn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var s=he,l=Bn();if(_e){if(a===void 0)throw Error(r(407));a=a()}else{if(a=n(),Ye===null)throw Error(r(349));(Ee&127)!==0||lg(s,n,a)}l.memoizedState=a;var c={value:a,getSnapshot:n};return l.queue=c,Tg(cg.bind(null,s,c,t),[t]),s.flags|=2048,vr(9,{destroy:void 0},ug.bind(null,s,c,a,n),null),a},useId:function(){var t=Bn(),n=Ye.identifierPrefix;if(_e){var a=Vi,s=Gi;a=(s&~(1<<32-Dn(s)-1)).toString(32)+a,n="_"+n+"R_"+a,a=eu++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=Jx++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:Hf,useFormState:Sg,useActionState:Sg,useOptimistic:function(t){var n=Bn();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Gf.bind(null,he,!0,a),a.dispatch=n,[t,n]},useMemoCache:Uf,useCacheRefresh:function(){return Bn().memoizedState=ay.bind(null,he)},useEffectEvent:function(t){var n=Bn(),a={impl:t};return n.memoizedState=a,function(){if((Oe&2)!==0)throw Error(r(440));return a.impl.apply(void 0,arguments)}}},Vg={readContext:Tn,use:iu,useCallback:Dg,useContext:Tn,useEffect:zf,useImperativeHandle:wg,useInsertionEffect:Ag,useLayoutEffect:Rg,useMemo:Ug,useReducer:au,useRef:Eg,useState:function(){return au(ha)},useDebugValue:If,useDeferredValue:function(t,n){var a=sn();return Ng(a,Ve.memoizedState,t,n)},useTransition:function(){var t=au(ha)[0],n=sn().memoizedState;return[typeof t=="boolean"?t:Io(t),n]},useSyncExternalStore:og,useId:zg,useHostTransitionStatus:Hf,useFormState:xg,useActionState:xg,useOptimistic:function(t,n){var a=sn();return dg(a,Ve,t,n)},useMemoCache:Uf,useCacheRefresh:Ig,useEffectEvent:bg},ry={readContext:Tn,use:iu,useCallback:Dg,useContext:Tn,useEffect:zf,useImperativeHandle:wg,useInsertionEffect:Ag,useLayoutEffect:Rg,useMemo:Ug,useReducer:Lf,useRef:Eg,useState:function(){return Lf(ha)},useDebugValue:If,useDeferredValue:function(t,n){var a=sn();return Ve===null?Bf(a,t,n):Ng(a,Ve.memoizedState,t,n)},useTransition:function(){var t=Lf(ha)[0],n=sn().memoizedState;return[typeof t=="boolean"?t:Io(t),n]},useSyncExternalStore:og,useId:zg,useHostTransitionStatus:Hf,useFormState:Mg,useActionState:Mg,useOptimistic:function(t,n){var a=sn();return Ve!==null?dg(a,Ve,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:Uf,useCacheRefresh:Ig,useEffectEvent:bg};function Vf(t,n,a,s){n=t.memoizedState,a=a(s,n),a=a==null?n:O({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var kf={enqueueSetState:function(t,n,a){t=t._reactInternals;var s=si(),l=Va(s);l.payload=n,a!=null&&(l.callback=a),n=ka(t,l,s),n!==null&&(Wn(n,t,s),No(n,t,s))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var s=si(),l=Va(s);l.tag=1,l.payload=n,a!=null&&(l.callback=a),n=ka(t,l,s),n!==null&&(Wn(n,t,s),No(n,t,s))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=si(),s=Va(a);s.tag=2,n!=null&&(s.callback=n),n=ka(t,s,a),n!==null&&(Wn(n,t,a),No(n,t,a))}};function kg(t,n,a,s,l,c,p){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(s,c,p):n.prototype&&n.prototype.isPureReactComponent?!To(a,s)||!To(l,c):!0}function Xg(t,n,a,s){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,s),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,s),n.state!==t&&kf.enqueueReplaceState(n,n.state,null)}function Os(t,n){var a=n;if("ref"in n){a={};for(var s in n)s!=="ref"&&(a[s]=n[s])}if(t=t.defaultProps){a===n&&(a=O({},a));for(var l in t)a[l]===void 0&&(a[l]=t[l])}return a}function qg(t){zl(t)}function Yg(t){console.error(t)}function Wg(t){zl(t)}function uu(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(s){setTimeout(function(){throw s})}}function jg(t,n,a){try{var s=t.onCaughtError;s(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function Xf(t,n,a){return a=Va(a),a.tag=3,a.payload={element:null},a.callback=function(){uu(t,n)},a}function Zg(t){return t=Va(t),t.tag=3,t}function Kg(t,n,a,s){var l=a.type.getDerivedStateFromError;if(typeof l=="function"){var c=s.value;t.payload=function(){return l(c)},t.callback=function(){jg(n,a,s)}}var p=a.stateNode;p!==null&&typeof p.componentDidCatch=="function"&&(t.callback=function(){jg(n,a,s),typeof l!="function"&&(Qa===null?Qa=new Set([this]):Qa.add(this));var E=s.stack;this.componentDidCatch(s.value,{componentStack:E!==null?E:""})})}function oy(t,n,a,s,l){if(a.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){if(n=a.alternate,n!==null&&As(n,a,l,!0),a=bn.current,a!==null){switch(a.tag){case 31:case 13:case 19:return Nn===null?Du():a.alternate===null&&an===0&&(an=3),a.flags&=-257,a.flags|=65536,a.lanes=l,s===Zl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([s]):n.add(s),Ch(t,s,l)),!1;case 22:return a.flags|=65536,s===Zl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([s])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([s]):a.add(s)),Ch(t,s,l)),!1}throw Error(r(435,a.tag))}return Ch(t,s,l),Du(),!1}if(_e)return n=bn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=l,s!==cf&&(t=Error(r(422),{cause:s}),Ro(di(t,a)))):(s!==cf&&(n=Error(r(423),{cause:s}),Ro(di(n,a))),t=t.current.alternate,t.flags|=65536,l&=-l,t.lanes|=l,s=di(s,a),l=Xf(t.stateNode,s,l),xf(t,l),an!==4&&(an=2)),!1;var c=Error(r(520),{cause:s});if(c=di(c,a),Yo===null?Yo=[c]:Yo.push(c),an!==4&&(an=2),n===null)return!0;s=di(s,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=l&-l,a.lanes|=t,t=Xf(a.stateNode,s,t),xf(a,t),!1;case 1:if(n=a.type,c=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||c!==null&&typeof c.componentDidCatch=="function"&&(Qa===null||!Qa.has(c))))return a.flags|=65536,l&=-l,a.lanes|=l,l=Zg(l),Kg(l,t,a,s),xf(a,l),!1;break;case 22:if(a.memoizedState!==null)return a.flags|=65536,!1}a=a.return}while(a!==null);return!1}var qf=Error(r(461)),cn=!1;function mn(t,n,a,s){n.child=t===null?tg(n,null,a,s):Ns(n,t.child,a,s)}function Qg(t,n,a,s,l){a=a.render;var c=n.ref;if("ref"in s){var p={};for(var E in s)E!=="ref"&&(p[E]=s[E])}else p=s;return Rs(n),s=Rf(t,n,a,p,c,l),E=Cf(),t!==null&&!cn?(wf(t,n,l),da(t,n,l)):(_e&&E&&Vl(n),n.flags|=1,mn(t,n,s,l),n.child)}function Jg(t,n,a,s,l){if(t===null){var c=a.type;return typeof c=="function"&&!rf(c)&&c.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=c,$g(t,n,c,s,l)):(t=Hl(a.type,null,s,n,n.mode,l),t.ref=n.ref,t.return=n,n.child=t)}if(c=t.child,!$f(t,l)){var p=c.memoizedProps;if(a=a.compare,a=a!==null?a:To,a(p,s)&&t.ref===n.ref)return da(t,n,l)}return n.flags|=1,t=oa(c,s),t.ref=n.ref,t.return=n,n.child=t}function $g(t,n,a,s,l){if(t!==null){var c=t.memoizedProps;if(To(c,s)&&t.ref===n.ref)if(cn=!1,n.pendingProps=s=c,$f(t,l))(t.flags&131072)!==0&&(cn=!0);else return n.lanes=t.lanes,da(t,n,l)}return Yf(t,n,a,s,l)}function t_(t,n,a,s){var l=s.children,c=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),s.mode==="hidden"){if((n.flags&128)!==0){if(c=c!==null?c.baseLanes|a:a,t!==null){for(s=n.child=t.child,l=0;s!==null;)l=l|s.lanes|s.childLanes,s=s.sibling;s=l&~c}else s=0,n.child=null;return e_(t,n,c,a,s)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&Wl(n,c!==null?c.cachePool:null),c!==null?ig(n,c):Mf(),ag(n);else return s=n.lanes=536870912,e_(t,n,c!==null?c.baseLanes|a:a,a,s)}else c!==null?(Wl(n,c.cachePool),ig(n,c),Ya(),n.memoizedState=null):(t!==null&&Wl(n,null),Mf(),Ya());return mn(t,n,l,a),n.child}function Fo(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function e_(t,n,a,s,l){var c=gf();return c=c===null?null:{parent:ln._currentValue,pool:c},n.memoizedState={baseLanes:a,cachePool:c},t!==null&&Wl(n,null),Mf(),ag(n),t!==null&&As(t,n,s,!0),n.childLanes=l,null}function cu(t,n){return n=fu({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function n_(t,n,a){return Ns(n,t.child,null,a),t=cu(n,n.pendingProps),t.flags|=2,ei(n),n.memoizedState=null,t}function ly(t,n,a){var s=n.pendingProps,l=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(_e){if(s.mode==="hidden")return t=cu(n,s),n.lanes=536870912,t.memoizedState={baseLanes:0,cachePool:null},Fo(null,t);if(Tf(n),(t=Ze)?(t=C0(t,gi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:za!==null?{id:Gi,overflow:Vi}:null,retryLane:536870912,hydrationErrors:null},a=Fm(t),a.return=n,n.child=a,xn=n,Ze=null)):t=null,t===null)throw Ba(n);return n.lanes=536870912,null}return cu(n,s)}var c=t.memoizedState;if(c!==null){var p=c.dehydrated;if(Tf(n),l)if(n.flags&256)n.flags&=-257,n=n_(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(r(558));else if(cn||As(t,n,a,!1),l=(a&t.childLanes)!==0,cn||l){if(Xa.current===null){if(s=Ye,s!==null&&(p=rt(s,a),p!==0&&p!==c.retryLane))throw c.retryLane=p,Ms(t,p),Wn(s,t,p),qf;Du()}n=n_(t,n,a)}else t=c.treeContext,Ze=vi(p.nextSibling),xn=n,_e=!0,Ia=null,gi=!1,t!==null&&Vm(n,t),n=cu(n,s),n.flags|=134221824;return n}return t=oa(t.child,{mode:s.mode,children:s.children}),t.ref=n.ref,n.child=t,t.return=n,t}function Sr(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(r(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function Yf(t,n,a,s,l){return Rs(n),a=Rf(t,n,a,s,void 0,l),s=Cf(),t!==null&&!cn?(wf(t,n,l),da(t,n,l)):(_e&&s&&Vl(n),n.flags|=1,mn(t,n,a,l),n.child)}function i_(t,n,a,s,l,c){return Rs(n),n.updateQueue=null,a=rg(n,s,a,l),sg(t),s=Cf(),t!==null&&!cn?(wf(t,n,c),da(t,n,c)):(_e&&s&&Vl(n),n.flags|=1,mn(t,n,a,c),n.child)}function a_(t,n,a,s,l){if(Rs(n),n.stateNode===null){var c=ur,p=a.contextType;typeof p=="object"&&p!==null&&(c=Tn(p)),c=new a(s,c),n.memoizedState=c.state!==null&&c.state!==void 0?c.state:null,c.updater=kf,n.stateNode=c,c._reactInternals=n,c=n.stateNode,c.props=s,c.state=n.memoizedState,c.refs={},vf(n),p=a.contextType,c.context=typeof p=="object"&&p!==null?Tn(p):ur,c.state=n.memoizedState,p=a.getDerivedStateFromProps,typeof p=="function"&&(Vf(n,a,p,s),c.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof c.getSnapshotBeforeUpdate=="function"||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(p=c.state,typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount(),p!==c.state&&kf.enqueueReplaceState(c,c.state,null),Oo(n,s,c,l),Lo(),c.state=n.memoizedState),typeof c.componentDidMount=="function"&&(n.flags|=4194308),s=!0}else if(t===null){c=n.stateNode;var E=n.memoizedProps,N=Os(a,E);c.props=N;var Y=c.context,nt=a.contextType;p=ur,typeof nt=="object"&&nt!==null&&(p=Tn(nt));var pt=a.getDerivedStateFromProps;nt=typeof pt=="function"||typeof c.getSnapshotBeforeUpdate=="function",E=n.pendingProps!==E,nt||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(E||Y!==p)&&Xg(n,c,s,p),Ga=!1;var k=n.memoizedState;c.state=k,Oo(n,s,c,l),Lo(),Y=n.memoizedState,E||k!==Y||Ga?(typeof pt=="function"&&(Vf(n,a,pt,s),Y=n.memoizedState),(N=Ga||kg(n,a,N,s,k,Y,p))?(nt||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount()),typeof c.componentDidMount=="function"&&(n.flags|=4194308)):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=s,n.memoizedState=Y),c.props=s,c.state=Y,c.context=p,s=N):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),s=!1)}else{c=n.stateNode,Sf(t,n),p=n.memoizedProps,nt=Os(a,p),c.props=nt,pt=n.pendingProps,k=c.context,Y=a.contextType,N=ur,typeof Y=="object"&&Y!==null&&(N=Tn(Y)),E=a.getDerivedStateFromProps,(Y=typeof E=="function"||typeof c.getSnapshotBeforeUpdate=="function")||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(p!==pt||k!==N)&&Xg(n,c,s,N),Ga=!1,k=n.memoizedState,c.state=k,Oo(n,s,c,l),Lo();var $=n.memoizedState;p!==pt||k!==$||Ga||t!==null&&t.dependencies!==null&&ql(t.dependencies)?(typeof E=="function"&&(Vf(n,a,E,s),$=n.memoizedState),(nt=Ga||kg(n,a,nt,s,k,$,N)||t!==null&&t.dependencies!==null&&ql(t.dependencies))?(Y||typeof c.UNSAFE_componentWillUpdate!="function"&&typeof c.componentWillUpdate!="function"||(typeof c.componentWillUpdate=="function"&&c.componentWillUpdate(s,$,N),typeof c.UNSAFE_componentWillUpdate=="function"&&c.UNSAFE_componentWillUpdate(s,$,N)),typeof c.componentDidUpdate=="function"&&(n.flags|=4),typeof c.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof c.componentDidUpdate!="function"||p===t.memoizedProps&&k===t.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||p===t.memoizedProps&&k===t.memoizedState||(n.flags|=1024),n.memoizedProps=s,n.memoizedState=$),c.props=s,c.state=$,c.context=N,s=nt):(typeof c.componentDidUpdate!="function"||p===t.memoizedProps&&k===t.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||p===t.memoizedProps&&k===t.memoizedState||(n.flags|=1024),s=!1)}return c=s,Sr(t,n),s=(n.flags&128)!==0,c||s?(c=n.stateNode,a=s&&typeof a.getDerivedStateFromError!="function"?null:c.render(),n.flags|=1,t!==null&&s?(n.child=Ns(n,t.child,null,l),n.child=Ns(n,null,a,l)):mn(t,n,a,l),n.memoizedState=c.state,t=n.child):t=da(t,n,l),t}function s_(t,n,a,s){return Ts(),n.flags|=256,mn(t,n,a,s),n.child}var Wf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function jf(t){return{baseLanes:t,cachePool:jm()}}function Zf(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=ai),t}function r_(t,n,a){var s=n.pendingProps,l=!1,c=(n.flags&128)!==0,p;if((p=c)||(p=t!==null&&t.memoizedState===null?!1:(An.current&2)!==0),p&&(l=!0,n.flags&=-129),p=(n.flags&32)!==0,n.flags&=-33,t===null){if(_e){if(l?qa(n):Ya(),(t=Ze)?(t=C0(t,gi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:za!==null?{id:Gi,overflow:Vi}:null,retryLane:536870912,hydrationErrors:null},a=Fm(t),a.return=n,n.child=a,xn=n,Ze=null)):t=null,t===null)throw Ba(n);return jh(t)?n.lanes=32:n.lanes=536870912,null}return c=s.children,s=s.fallback,l?(Ya(),l=n.mode,c=fu({mode:"hidden",children:c},l),s=Es(s,l,a,null),c.return=n,s.return=n,c.sibling=s,n.child=c,s=n.child,s.memoizedState=jf(a),s.childLanes=Zf(t,p,a),n.memoizedState=Wf,Fo(null,s)):(qa(n),Kf(n,c))}var E=t.memoizedState;if(E!==null){var N=E.dehydrated;if(N!==null)return uy(t,n,c,p,s,N,E,a)}return l?(Ya(),l=s.fallback,c=n.mode,E=t.child,N=E.sibling,s=oa(E,{mode:"hidden",children:s.children}),s.subtreeFlags=E.subtreeFlags&1206910976,N!==null?l=oa(N,l):(l=Es(l,c,a,null),l.flags|=2),l.return=n,s.return=n,s.sibling=l,n.child=s,Fo(null,s),s=n.child,l=t.child.memoizedState,l===null?l=jf(a):(c=l.cachePool,c!==null?(E=ln._currentValue,c=c.parent!==E?{parent:E,pool:E}:c):c=jm(),l={baseLanes:l.baseLanes|a,cachePool:c}),s.memoizedState=l,s.childLanes=Zf(t,p,a),n.memoizedState=Wf,Fo(t.child,s)):(qa(n),a=t.child,t=a.sibling,a=oa(a,{mode:"visible",children:s.children}),a.return=n,a.sibling=null,t!==null&&(p=n.deletions,p===null?(n.deletions=[t],n.flags|=16):p.push(t)),n.child=a,n.memoizedState=null,a)}function Kf(t,n){return n=fu({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function fu(t,n){return t=kn(22,t,null,n),t.lanes=0,t}function hu(t,n,a){return Ns(n,t.child,null,a),t=Kf(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function uy(t,n,a,s,l,c,p,E){if(a)return n.flags&256?(qa(n),n.flags&=-257,hu(t,n,E)):n.memoizedState!==null?(Ya(),n.child=t.child,n.flags|=128,null):(Ya(),c=l.fallback,p=n.mode,l=fu({mode:"visible",children:l.children},p),c=Es(c,p,E,null),c.flags|=2,l.return=n,c.return=n,l.sibling=c,n.child=l,Ns(n,t.child,null,E),l=n.child,l.memoizedState=jf(E),l.childLanes=Zf(t,s,E),n.memoizedState=Wf,Fo(null,l));if(qa(n),jh(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var N=s.dgst;return s=N,s!==""&&(l=Error(r(419)),l.stack="",l.digest=s,Ro({value:l,source:null,stack:null})),hu(t,n,E)}if(cn||As(t,n,E,!1),s=(E&t.childLanes)!==0,cn||s){if(Xa.current!==null)return hu(t,n,E);if(s=Ye,s!==null&&(l=rt(s,E),l!==0&&l!==p.retryLane))throw p.retryLane=l,Ms(t,l),Wn(s,t,l),qf;return Wh(c)||Du(),hu(t,n,E)}return Wh(c)?(n.flags|=192,n.child=t.child,null):(t=p.treeContext,Ze=vi(c.nextSibling),xn=n,_e=!0,Ia=null,gi=!1,t!==null&&Vm(n,t),n=Kf(n,l.children),n.flags|=134221824,n)}function o_(t,n,a){t.lanes|=n;var s=t.alternate;s!==null&&(s.lanes|=n),Xl(t.return,n,a)}function l_(t){for(var n=null;t!==null;){var a=t.alternate;a!==null&&$l(a)===null&&(n=t),t=t.sibling}return n}function du(t,n,a,s,l,c){var p=t.memoizedState;p===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:s,tail:a,tailMode:l,treeForkCount:c}:(p.isBackwards=n,p.rendering=null,p.renderingStartTime=0,p.last=s,p.tail=a,p.tailMode=l,p.treeForkCount=c)}function Qf(t){var n=t.child;for(t.child=null;n!==null;){var a=n.sibling;n.sibling=t.child,t.child=n,n=a}}function Jf(t,n,a){var s=n.pendingProps,l=s.revealOrder,c=s.tail;s=s.children;var p=An.current;if(n.flags&128)return Po(n,p),null;var E=(p&2)!==0;if(E?(p=p&1|2,n.flags|=128):p&=1,Po(n,p),l==="backwards"&&t!==null?(Qf(t),mn(t,n,s,a),Qf(t)):mn(t,n,s,a),s=_e?Ao:0,!E&&t!==null&&(t.flags&128)!==0)t:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&o_(t,a,n);else if(t.tag===19)o_(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break t;for(;t.sibling===null;){if(t.return===null||t.return===n)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(l){case"backwards":a=l_(n.child),a===null?(l=n.child,n.child=null):(l=a.sibling,a.sibling=null,Qf(n)),du(n,!0,l,null,c,s);break;case"unstable_legacy-backwards":for(a=null,l=n.child,n.child=null;l!==null;){if(t=l.alternate,t!==null&&$l(t)===null){n.child=l;break}t=l.sibling,l.sibling=a,a=l,l=t}du(n,!0,a,null,c,s);break;case"together":du(n,!1,null,null,void 0,s);break;case"independent":n.memoizedState=null;break;default:a=l_(n.child),a===null?(l=n.child,n.child=null):(l=a.sibling,a.sibling=null),du(n,!1,l,a,c,s)}return n.child}function u_(t,n,a){var s=n.pendingProps;return Fa(n,n.type,s.value),mn(t,n,s.children,a),n.child}function da(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),Ka|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(As(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(r(153));if(n.child!==null){for(t=n.child,a=oa(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=oa(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function $f(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&ql(t)))}function cy(t,n,a){switch(n.tag){case 3:D(n,n.stateNode.containerInfo),Fa(n,ln,t.memoizedState.cache),Ts();break;case 27:case 5:tt(n);break;case 4:D(n,n.stateNode.containerInfo);break;case 10:Fa(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Tf(n),null;break;case 13:var s=n.memoizedState;if(s!==null){if(s.dehydrated!==null)return qa(n),n.flags|=128,null;s=As(t,n,a,!1);var l=n.child.childLanes;return s||(a&l)!==0?r_(t,n,a):(qa(n),t=da(t,n,a),t!==null?t.sibling:null)}qa(n);break;case 19:if(n.flags&128)return Jf(t,n,a);if(l=(t.flags&128)!==0,s=(a&n.childLanes)!==0,s||(As(t,n,a,!1),s=(a&n.childLanes)!==0),l){if(s)return Jf(t,n,a);n.flags|=128}if(l=n.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),Po(n,An.current),s)break;return null;case 22:return n.lanes=0,t_(t,n,a,n.pendingProps);case 24:Fa(n,ln,t.memoizedState.cache)}return da(t,n,a)}function c_(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)cn=!0;else{if(!$f(t,a)&&(n.flags&128)===0)return cn=!1,cy(t,n,a);cn=(t.flags&131072)!==0}else cn=!1,_e&&(n.flags&1048576)!==0&&Gm(n,Ao,n.index);switch(n.lanes=0,n.tag){case 16:t:{var s=n.pendingProps;if(t=Ds(n.elementType),n.type=t,typeof t=="function")rf(t)?(s=Os(t,s),n.tag=1,n=a_(null,n,t,s,a)):(n.tag=0,n=Yf(null,n,t,s,a));else{if(t!=null){var l=t.$$typeof;if(l===W){n.tag=11,n=Qg(null,n,t,s,a);break t}else if(l===_t){n.tag=14,n=Jg(null,n,t,s,a);break t}else if(l===lt){n.tag=10,n.type=t,n=u_(null,n,a);break t}}throw n=Ut(t)||t,Error(r(306,n,""))}}return n;case 0:return Yf(t,n,n.type,n.pendingProps,a);case 1:return s=n.type,l=Os(s,n.pendingProps),a_(t,n,s,l,a);case 3:t:{if(D(n,n.stateNode.containerInfo),t===null)throw Error(r(387));s=n.pendingProps;var c=n.memoizedState;l=c.element,Sf(t,n),Oo(n,s,null,a);var p=n.memoizedState;if(s=p.cache,Fa(n,ln,s),s!==c.cache&&df(n,[ln],a,!0),Lo(),s=p.element,c.isDehydrated)if(c={element:s,isDehydrated:!1,cache:p.cache},n.updateQueue.baseState=c,n.memoizedState=c,n.flags&256){n=s_(t,n,s,a);break t}else if(s!==l){l=di(Error(r(424)),n),Ro(l),n=s_(t,n,s,a);break t}else for(t=n.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,Ze=vi(t.firstChild),xn=n,_e=!0,Ia=null,gi=!0,a=tg(n,null,s,a),n.child=a;a;)a.flags=a.flags&-3|134221824,a=a.sibling;else{if(Ts(),s===l){n=da(t,n,a);break t}mn(t,n,s,a)}n=n.child}return n;case 26:return Sr(t,n),t===null?(a=P0(n.type,null,n.pendingProps,null))?n.memoizedState=a:_e||(n.stateNode=p0(n.type,n.pendingProps,qe.current,n)):n.memoizedState=P0(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return tt(n),t===null&&_e&&(s=n.stateNode=U0(n.type,n.pendingProps,qe.current),xn=n,gi=!0,l=Ze,ts(n.type)?(Zh=l,Ze=vi(s.firstChild)):Ze=l),mn(t,n,n.pendingProps.children,a),Sr(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&_e&&((l=s=Ze)&&(s=aM(s,n.type,n.pendingProps,gi),s!==null?(n.stateNode=s,xn=n,Ze=vi(s.firstChild),gi=!1,l=!0):l=!1),l||Ba(n)),tt(n),l=n.type,c=n.pendingProps,p=t!==null?t.memoizedProps:null,s=c.children,Hh(l,c)?s=null:p!==null&&Hh(l,p)&&(n.flags|=32),n.memoizedState!==null&&(l=Rf(t,n,$x,null,null,a),Ir._currentValue=l),Sr(t,n),mn(t,n,s,a),n.child;case 6:return t===null&&_e&&((t=a=Ze)&&(a=sM(a,n.pendingProps,gi),a!==null?(n.stateNode=a,xn=n,Ze=null,t=!0):t=!1),t||Ba(n)),null;case 13:return r_(t,n,a);case 4:return D(n,n.stateNode.containerInfo),s=n.pendingProps,t===null?n.child=Ns(n,null,s,a):mn(t,n,s,a),n.child;case 11:return Qg(t,n,n.type,n.pendingProps,a);case 7:return s=n.pendingProps,Sr(t,n),mn(t,n,s,a),n.child;case 8:return mn(t,n,n.pendingProps.children,a),n.child;case 12:return mn(t,n,n.pendingProps.children,a),n.child;case 10:return u_(t,n,a);case 9:return l=n.type._context,s=n.pendingProps.children,Rs(n),l=Tn(l),s=s(l),n.flags|=1,mn(t,n,s,a),n.child;case 14:return Jg(t,n,n.type,n.pendingProps,a);case 15:return $g(t,n,n.type,n.pendingProps,a);case 19:return Jf(t,n,a);case 31:return ly(t,n,a);case 22:return t_(t,n,a,n.pendingProps);case 24:return Rs(n),s=Tn(ln),t===null?(l=gf(),l===null&&(l=Ye,c=pf(),l.pooledCache=c,c.refCount++,c!==null&&(l.pooledCacheLanes|=a),l=c),n.memoizedState={parent:s,cache:l},vf(n),Fa(n,ln,l)):((t.lanes&a)!==0&&(Sf(t,n),Oo(n,null,null,a),Lo()),l=t.memoizedState,c=n.memoizedState,l.parent!==s?(l={parent:s,cache:s},n.memoizedState=l,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=l),Fa(n,ln,s)):(s=c.cache,Fa(n,ln,s),s!==l.cache&&df(n,[ln],a,!0))),mn(t,n,n.pendingProps.children,a),n.child;case 30:return n.stateNode===null&&(n.stateNode={autoName:null,paired:null,clones:null,ref:null}),s=n.pendingProps,s.name!=null&&s.name!=="auto"?n.flags|=t===null?18882560:18874368:_e&&Vl(n),t!==null&&t.memoizedProps.name!==s.name?n.flags|=4194816:Sr(t,n),mn(t,n,s.children,a),n.child;case 29:throw n.pendingProps}throw Error(r(156,n.tag))}function pa(t){t.flags|=4}function th(t,n,a,s,l){var c;if((c=(t.mode&32)!==0)&&(c=a===null?F0(n,s):F0(n,s)&&(s.src!==a.src||s.srcSet!==a.srcSet)),c){if(t.flags|=16777216,(l&335544128)===l)if(t.stateNode.complete)t.flags|=8192;else if(q_())t.flags|=8192;else throw Us=Zl,_f}else t.flags&=-16777217}function f_(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!H0(n))if(q_())t.flags|=8192;else throw Us=Zl,_f}function pu(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?Al():536870912,t.lanes|=n,Tr|=n)}function Ho(t,n){if(!_e)switch(t.tailMode){case"visible":break;case"collapsed":for(var a=t.tail,s=null;a!==null;)a.alternate!==null&&(s=a),a=a.sibling;s===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:s.sibling=null;break;default:for(n=t.tail,a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null}}function Ke(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,s=0;if(n)for(var l=t.child;l!==null;)a|=l.lanes|l.childLanes,s|=l.subtreeFlags&1206910976,s|=l.flags&1206910976,l.return=t,l=l.sibling;else for(l=t.child;l!==null;)a|=l.lanes|l.childLanes,s|=l.subtreeFlags,s|=l.flags,l.return=t,l=l.sibling;return t.subtreeFlags|=s,t.childLanes=a,n}function fy(t,n,a){var s=n.pendingProps;switch(uf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ke(n),null;case 1:return Ke(n),null;case 3:return a=n.stateNode,s=null,t!==null&&(s=t.memoizedState.cache),n.memoizedState.cache!==s&&(n.flags|=2048),ca(ln),T(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(hr(n)?pa(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,ff())),Ke(n),null;case 26:var l=n.type,c=n.memoizedState;return t===null?(pa(n),c!==null?(Ke(n),f_(n,c)):(Ke(n),th(n,l,null,s,a))):c?c!==t.memoizedState?(pa(n),Ke(n),f_(n,c)):(Ke(n),n.flags&=-16777217):(t=t.memoizedProps,t!==s&&pa(n),Ke(n),th(n,l,t,s,a)),null;case 27:if(dt(n),a=qe.current,l=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==s&&pa(n);else{if(!s){if(n.stateNode===null)throw Error(r(166));return Ke(n),n.subtreeFlags&=-33554433,null}t=Ft.current,hr(n)?km(n):(t=U0(l,s,a),n.stateNode=t,pa(n))}return Ke(n),n.subtreeFlags&=-33554433,null;case 5:if(dt(n),l=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==s&&pa(n);else{if(!s){if(n.stateNode===null)throw Error(r(166));return Ke(n),n.subtreeFlags&=-33554433,null}if(c=Ft.current,hr(n))km(n);else{var p=Qo(qe.current);switch(c){case 1:c=p.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:c=p.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":c=p.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":c=p.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":c=p.createElement("div"),c.innerHTML="<script><\/script>",c=c.removeChild(c.firstChild);break;case"select":c=typeof s.is=="string"?p.createElement("select",{is:s.is}):p.createElement("select"),s.multiple?c.multiple=!0:s.size&&(c.size=s.size);break;default:c=typeof s.is=="string"?p.createElement(l,{is:s.is}):p.createElement(l)}}c[Ct]=n,c[Xt]=s;t:for(p=n.child;p!==null;){if(p.tag===5||p.tag===6)c.appendChild(p.stateNode);else if(p.tag!==4&&p.tag!==27&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===n)break t;for(;p.sibling===null;){if(p.return===null||p.return===n)break t;p=p.return}p.sibling.return=p.return,p=p.sibling}n.stateNode=c;t:switch(Cn(c,l,s),l){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break t;case"img":s=!0;break t;default:s=!1}s&&pa(n)}}return Ke(n),n.subtreeFlags&=-33554433,th(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==s&&pa(n);else{if(typeof s!="string"&&n.stateNode===null)throw Error(r(166));if(t=qe.current,hr(n)){if(t=n.stateNode,a=n.memoizedProps,s=null,l=xn,l!==null)switch(l.tag){case 27:case 5:s=l.memoizedProps}t[Ct]=n,t=!!(t.nodeValue===a||s!==null&&s.suppressHydrationWarning===!0||c0(t.nodeValue,a)),t||Ba(n,!0)}else t=Qo(t).createTextNode(s),t[Ct]=n,n.stateNode=t}return Ke(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(s=hr(n),a!==null){if(t===null){if(!s)throw Error(r(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(557));t[Ct]=n}else Ts(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ke(n),t=!1}else a=ff(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(ei(n),n):(ei(n),null);if((n.flags&128)!==0)throw Error(r(558))}return Ke(n),null;case 13:if(s=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(l=hr(n),s!==null&&s.dehydrated!==null){if(t===null){if(!l)throw Error(r(318));if(l=n.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(r(317));l[Ct]=n}else Ts(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ke(n),l=!1}else l=ff(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=l),l=!0;if(!l)return n.flags&256?(ei(n),n):(ei(n),null)}return ei(n),(n.flags&128)!==0?(n.lanes=a,n):(a=s!==null,t=t!==null&&t.memoizedState!==null,a&&(s=n.child,l=null,s.alternate!==null&&s.alternate.memoizedState!==null&&s.alternate.memoizedState.cachePool!==null&&(l=s.alternate.memoizedState.cachePool.pool),c=null,s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(c=s.memoizedState.cachePool.pool),c!==l&&(s.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),pu(n,n.updateQueue),Ke(n),null);case 4:return T(),t===null&&Ph(n.stateNode.containerInfo),n.flags|=67108864,Ke(n),null;case 10:return ca(n.type),Ke(n),null;case 19:if(bf(n),s=n.memoizedState,s===null)return Ke(n),null;if(l=(n.flags&128)!==0,c=s.rendering,c===null)if(l)Ho(s,!1);else{if(an!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(c=$l(t),c!==null){for(n.flags|=128,Ho(s,!1),t=c.updateQueue,n.updateQueue=t,pu(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Bm(a,t),a=a.sibling;return Po(n,An.current&1|2),_e&&la(n,s.treeForkCount),n.child}t=t.sibling}s.tail!==null&&F()>Au&&(n.flags|=128,l=!0,Ho(s,!1),n.lanes=4194304)}else{if(!l)if(t=$l(c),t!==null){if(n.flags|=128,l=!0,t=t.updateQueue,n.updateQueue=t,pu(n,t),Ho(s,!0),s.tail===null&&s.tailMode!=="collapsed"&&s.tailMode!=="visible"&&!c.alternate&&!_e)return Ke(n),null}else 2*F()-s.renderingStartTime>Au&&a!==536870912&&(n.flags|=128,l=!0,Ho(s,!1),n.lanes=4194304);s.isBackwards?(c.sibling=n.child,n.child=c):(t=s.last,t!==null?t.sibling=c:n.child=c,s.last=c)}if(s.tail!==null){t=s.tail;t:{for(a=t;a!==null;){if(a.alternate!==null){a=!1;break t}a=a.sibling}a=!0}return s.rendering=t,s.tail=t.sibling,s.renderingStartTime=F(),t.sibling=null,c=An.current,c=l?c&1|2:c&1,s.tailMode==="visible"||s.tailMode==="collapsed"||!a||_e?Po(n,c):(a=c,ae(bn,n),ae(An,a),Nn===null&&(Nn=n)),_e&&la(n,s.treeForkCount),t}return Ke(n),null;case 22:case 23:return ei(n),Ef(),s=n.memoizedState!==null,t!==null?t.memoizedState!==null!==s&&(n.flags|=8192):s&&(n.flags|=8192),s?(a&536870912)!==0&&(n.flags&128)===0&&(Ke(n),n.subtreeFlags&6&&(n.flags|=8192)):Ke(n),a=n.updateQueue,a!==null&&pu(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),s=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(s=n.memoizedState.cachePool.pool),s!==a&&(n.flags|=2048),t!==null&&Nt(ws),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),ca(ln),Ke(n),null;case 25:return null;case 30:return n.flags|=33554432,Ke(n),null}throw Error(r(156,n.tag))}function hy(t,n){switch(uf(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return ca(ln),T(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return dt(n),null;case 31:if(n.memoizedState!==null){if(ei(n),n.alternate===null)throw Error(r(340));Ts()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(ei(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(r(340));Ts()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return bf(n),t=n.flags,t&65536?(n.flags=t&-65537|128,t=n.memoizedState,t!==null&&(t.rendering=null,t.tail=null),n.flags|=4,n):null;case 4:return T(),null;case 10:return ca(n.type),null;case 22:case 23:return ei(n),Ef(),t!==null&&Nt(ws),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return ca(ln),null;case 25:return null;default:return null}}function h_(t,n){switch(uf(n),n.tag){case 3:ca(ln),T();break;case 26:case 27:case 5:dt(n);break;case 4:T();break;case 31:n.memoizedState!==null&&ei(n);break;case 13:ei(n);break;case 19:bf(n);break;case 10:ca(n.type);break;case 22:case 23:ei(n),Ef(),t!==null&&Nt(ws);break;case 24:ca(ln)}}function Go(t,n){try{var a=n.updateQueue,s=a!==null?a.lastEffect:null;if(s!==null){var l=s.next;a=l;do{if((a.tag&t)===t){s=void 0;var c=a.create,p=a.inst;s=c(),p.destroy=s}a=a.next}while(a!==l)}}catch(E){Be(n,n.return,E)}}function Wa(t,n,a){try{var s=n.updateQueue,l=s!==null?s.lastEffect:null;if(l!==null){var c=l.next;s=c;do{if((s.tag&t)===t){var p=s.inst,E=p.destroy;if(E!==void 0){p.destroy=void 0,l=n;var N=a,Y=E;try{Y()}catch(nt){Be(l,N,nt)}}}s=s.next}while(s!==c)}}catch(nt){Be(n,n.return,nt)}}function d_(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{ng(n,a)}catch(s){Be(t,t.return,s)}}}function p_(t,n,a){a.props=Os(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(s){Be(t,n,s)}}function ki(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var s=t.stateNode;break;case 30:var l=t.stateNode,c=sa(t.memoizedProps,l);(l.ref===null||l.ref.name!==c)&&(l.ref=y0(c)),s=l.ref;break;case 7:if(t.stateNode===null){var p=new ri(t);_(t.child,!1,nM,p,void 0,void 0),t.stateNode=p}s=t.stateNode;break;default:s=t.stateNode}typeof a=="function"?t.refCleanup=a(s):a.current=s}}catch(E){Be(t,n,E)}}function Rn(t,n){var a=t.ref,s=t.refCleanup;if(a!==null)if(typeof s=="function")try{s()}catch(l){Be(t,n,l)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(l){Be(t,n,l)}else a.current=null}function mu(t,n){if((t.tag===5||t.tag===27||t.tag===6)&&t.alternate===null&&n!==null)for(var a=0;a<n.length;a++)R0(t.stateNode,n[a])}function m_(t){for(var n=t.return;n!==null&&(nh(n)&&R0(t.stateNode,n.stateNode),!eh(n));)n=n.return}function Vo(t){for(var n=t.return;n!==null&&(nh(n)&&iM(t.stateNode,n.stateNode),!eh(n));)n=n.return}function eh(t){return t.tag===5||t.tag===3||t.tag===27}function nh(t){return t&&t.tag===7&&t.stateNode!==null}function ih(t){var n=t.type,a=t.memoizedProps,s=t.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&s.focus();break t;case"img":a.src?s.src=a.src:a.srcSet&&(s.srcset=a.srcSet)}}catch(l){Be(t,t.return,l)}}function ah(t,n,a){try{var s=t.stateNode;By(s,t.type,a,n),s[Xt]=n}catch(l){Be(t,t.return,l)}}function g_(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&ts(t.type)||t.tag===4}function sh(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||g_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&ts(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function rh(t,n,a,s){var l=t.tag;if(l===5||l===6)l=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(l,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(l),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Hi)),mu(t,s),we=!0;else if(l!==4&&(l===27&&(mu(t,s),s=null,ts(t.type)&&(a=t.stateNode,n=null)),t=t.child,t!==null))for(rh(t,n,a,s),t=t.sibling;t!==null;)rh(t,n,a,s),t=t.sibling}function gu(t,n,a,s){var l=t.tag;if(l===5||l===6)l=t.stateNode,n?a.insertBefore(l,n):a.appendChild(l),mu(t,s),we=!0;else if(l!==4&&(l===27&&(mu(t,s),s=null,ts(t.type)&&(a=t.stateNode)),t=t.child,t!==null))for(gu(t,n,a,s),t=t.sibling;t!==null;)gu(t,n,a,s),t=t.sibling}function __(t){var n=t.stateNode,a=t.memoizedProps;try{for(var s=t.type,l=n.attributes;l.length;)n.removeAttributeNode(l[0]);Cn(n,s,a),n[Ct]=t,n[Xt]=a}catch(c){Be(t,t.return,c)}}var _u=!1,ni=null;function v_(t){(t.tag===30||(t.subtreeFlags&33554432)!==0)&&(_u=!0)}var Xi=null;function S_(){var t=Xi;return Xi=null,t}var Xn=0;function xr(t,n,a,s,l){return Xn=0,x_(t.child,n,a,s,l)}function x_(t,n,a,s,l){for(var c=!1;t!==null;){if(t.tag===5){var p=t.stateNode;if(s!==null){var E=kh(p);s.push(E),E.view&&(c=!0)}else c||kh(p).view&&(c=!0);_u=!0,S0(p,Xn===0?n:n+"_"+Xn,a),Xn++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&l||x_(t.child,n,a,s,l)&&(c=!0));t=t.sibling}return c}function qi(t,n){for(;t!==null;)t.tag===5?x0(t.stateNode,t.memoizedProps):(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&n||qi(t.child,n)),t=t.sibling}function vu(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if((t.tag!==22||t.memoizedState===null)&&(vu(t),t.tag===30&&(t.flags&18874368)!==0&&t.stateNode.paired)){var n=t.memoizedProps;if(n.name==null||n.name==="auto")throw Error(r(544));var a=n.name;n=ra(n.default,n.share),n!=="none"&&(xr(t,a,n,null,!1)||qi(t.child,!1))}t=t.sibling}}function oh(t,n){if(t.tag===30){var a=t.stateNode,s=t.memoizedProps,l=sa(s,a),c=ra(s.default,a.paired?s.share:s.enter);c!=="none"?xr(t,l,c,null,!1)?(vu(t),a.paired||n||Cr(t,s.onEnter)):qi(t.child,!1):vu(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)oh(t,n),t=t.sibling;else vu(t)}function lh(t){if(ni!==null&&ni.size!==0){var n=ni;if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var a=t.memoizedProps,s=a.name;if(s!=null&&s!=="auto"){var l=n.get(s);if(l!==void 0){var c=ra(a.default,a.share);if(c!=="none"&&(xr(t,s,c,null,!1)?(c=t.stateNode,l.paired=c,c.paired=l,Cr(t,a.onShare)):qi(t.child,!1)),n.delete(s),n.size===0)break}}}lh(t)}t=t.sibling}}}function uh(t){if(t.tag===30){var n=t.memoizedProps,a=sa(n,t.stateNode),s=ni!==null?ni.get(a):void 0,l=ra(n.default,s!==void 0?n.share:n.exit);l!=="none"&&(xr(t,a,l,null,!1)?s!==void 0?(l=t.stateNode,s.paired=l,l.paired=s,ni.delete(a),Cr(t,n.onShare)):Cr(t,n.onExit):qi(t.child,!1)),ni!==null&&lh(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)uh(t),t=t.sibling;else ni!==null&&lh(t)}function y_(t){for(t=t.child;t!==null;){if(t.tag===30){var n=t.memoizedProps,a=sa(n,t.stateNode);n=ra(n.default,n.update),t.flags&=-5,n!=="none"&&xr(t,a,n,t.memoizedState=[],!1)}else(t.subtreeFlags&33554432)!==0&&y_(t);t=t.sibling}}function ch(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var n=t.stateNode;n.paired!==null&&(n.paired=null,qi(t.child,!1))}ch(t)}t=t.sibling}}function Su(t){if(t.tag===30)t.stateNode.paired=null,qi(t.child,!1),ch(t);else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)Su(t),t=t.sibling;else ch(t)}function M_(t){for(t=t.child;t!==null;)t.tag===30?qi(t.child,!1):(t.subtreeFlags&33554432)!==0&&M_(t),t=t.sibling}function fh(t,n,a,s,l,c,p){for(var E=!1;n!==null;){if(n.tag===5){var N=n.stateNode;if(c!==null&&Xn<c.length){var Y=c[Xn],nt=kh(N);(Y.view||nt.view)&&(E=!0);var pt;if(pt=(t.flags&4)===0)if(nt.clip)pt=!0;else{pt=Y.rect;var k=nt.rect;pt=pt.y!==k.y||pt.x!==k.x||pt.height!==k.height||pt.width!==k.width}pt&&(t.flags|=4),nt.abs?nt=!Y.abs:(Y=Y.rect,nt=nt.rect,nt=Y.height!==nt.height||Y.width!==nt.width),nt&&(t.flags|=32)}else t.flags|=32;(t.flags&4)!==0&&S0(N,Xn===0?a:a+"_"+Xn,l),E&&(t.flags&4)!==0||(Xi===null&&(Xi=[]),Xi.push(N,Xn===0?s:s+"_"+Xn,n.memoizedProps)),Xn++}else(n.tag!==22||n.memoizedState===null)&&(n.tag===30&&p?t.flags|=n.flags&32:fh(t,n.child,a,s,l,c,p)&&(E=!0));n=n.sibling}return E}function E_(t,n){for(t=t.child;t!==null;){if(t.tag===30){var a=t.memoizedProps,s=t.stateNode,l=sa(a,s),c=ra(a.default,a.update),p;p=t.memoizedState,t.memoizedState=null,s=t;var E=t.child;Xn=0,l=fh(s,E,l,l,c,p,!1),(t.flags&4)!==0&&l&&Cr(t,a.onUpdate)}else(t.subtreeFlags&33554432)!==0&&E_(t);t=t.sibling}}var yn=!1,ze=!1,Yi=!1,hh=!1,T_=typeof WeakSet=="function"?WeakSet:Set,Mn=null,Wi=!1,ko=!1,xu=!1,dh=!1;function dy(t,n,a){if(t=t.containerInfo,Bh=Br,t=Cm(t),Jc(t)){if("selectionStart"in t)var s={start:t.selectionStart,end:t.selectionEnd};else t:{s=(s=t.ownerDocument)&&s.defaultView||window;var l=s.getSelection&&s.getSelection();if(l&&l.rangeCount!==0){s=l.anchorNode;var c=l.anchorOffset,p=l.focusNode;l=l.focusOffset;try{s.nodeType,p.nodeType}catch{s=null;break t}var E=0,N=-1,Y=-1,nt=0,pt=0,k=t,$=null;e:for(;;){for(var Dt;k!==s||c!==0&&k.nodeType!==3||(N=E+c),k!==p||l!==0&&k.nodeType!==3||(Y=E+l),k.nodeType===3&&(E+=k.nodeValue.length),(Dt=k.firstChild)!==null;)$=k,k=Dt;for(;;){if(k===t)break e;if($===s&&++nt===c&&(N=E),$===p&&++pt===l&&(Y=E),(Dt=k.nextSibling)!==null)break;k=$,$=k.parentNode}k=Dt}s=N===-1||Y===-1?null:{start:N,end:Y}}else s=null}s=s||{start:0,end:0}}else s=null;for(Fh={focusedElem:t,selectionRange:s},Br=!1,a=(a&335544064)===a,Mn=n,n=a?9270:1024;Mn!==null;){if(t=Mn,a&&(s=t.deletions,s!==null))for(c=0;c<s.length;c++)a&&uh(s[c]);if(t.alternate===null&&(t.flags&2)!==0)a&&v_(t),yu(a);else{if(t.tag===22){if(s=t.alternate,t.memoizedState!==null){s!==null&&s.memoizedState===null&&a&&uh(s),yu(a);continue}else if(s!==null&&s.memoizedState!==null){a&&v_(t),yu(a);continue}}s=t.child,(t.subtreeFlags&n)!==0&&s!==null?(s.return=t,Mn=s):(a&&y_(t),yu(a))}}ni=null}function yu(t){for(;Mn!==null;){var n=Mn,a=t,s=n.alternate,l=n.flags;switch(n.tag){case 0:case 11:case 15:break;case 1:if((l&1024)!==0&&s!==null){a=void 0,l=s.memoizedProps,s=s.memoizedState;var c=n.stateNode;try{var p=Os(n.type,l);a=c.getSnapshotBeforeUpdate(p,s),c.__reactInternalSnapshotBeforeUpdate=a}catch(E){Be(n,n.return,E)}}break;case 3:if((l&1024)!==0){if(s=n.stateNode.containerInfo,a=s.nodeType,a===9)Yh(s);else if(a===1)switch(s.nodeName){case"HEAD":case"HTML":case"BODY":Yh(s);break;default:s.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:a&&s!==null&&(a=sa(s.memoizedProps,s.stateNode),l=n.memoizedProps,l=ra(l.default,l.update),l!=="none"&&xr(s,a,l,s.memoizedState=[],!0));break;default:if((l&1024)!==0)throw Error(r(163))}if(s=n.sibling,s!==null){s.return=n.return,Mn=s;break}Mn=n.return}}function b_(t,n,a){var s=a.flags;switch(a.tag){case 0:case 11:case 15:ji(t,a),s&4&&Go(5,a);break;case 1:if(ji(t,a),s&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(p){Be(a,a.return,p)}else{var l=Os(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(l,n,t.__reactInternalSnapshotBeforeUpdate)}catch(p){Be(a,a.return,p)}}s&64&&d_(a),s&512&&ki(a,a.return);break;case 3:if(ji(t,a),s&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{ng(t,n)}catch(p){Be(a,a.return,p)}}break;case 27:n===null&&s&4&&__(a);case 26:case 5:ji(t,a),n===null&&s&4&&ih(a),s&512&&ki(a,a.return);break;case 12:ji(t,a);break;case 31:ji(t,a),s&4&&w_(t,a);break;case 13:ji(t,a),s&4&&D_(t,a),s&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=by.bind(null,a),rM(t,a))));break;case 22:if(s=a.memoizedState!==null||yn,!s){var c=n!==null&&n.memoizedState!==null||ze;n=yn,l=ze,yn=s,(ze=c)&&!l?(s=2,(a.subtreeFlags&8772)!==0&&(s|=1),Ci(t,a,s)):ji(t,a),yn=n,ze=l}break;case 30:ji(t,a),s&512&&ki(a,a.return);break;case 7:s&512&&ki(a,a.return);default:ji(t,a)}}function ph(t,n){for(t=t.child;t!==null;)A_(t,n),t=t.sibling}function A_(t,n){switch(t.tag){case 5:case 26:try{var a=t.stateNode;if(n){var s=a.style;typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"}else{var l=t.stateNode,c=t.memoizedProps.style,p=c!=null&&c.hasOwnProperty("display")?c.display:null;l.style.display=p==null||typeof p=="boolean"?"":(""+p).trim()}}catch(N){Be(t,t.return,N)}mh(t,n);break;case 6:try{t.stateNode.nodeValue=n?"":t.memoizedProps,we=!0}catch(N){Be(t,t.return,N)}break;case 18:try{var E=t.stateNode;n?v0(E,!0):v0(t.stateNode,!1)}catch(N){Be(t,t.return,N)}break;case 22:case 23:t.memoizedState===null&&ph(t,n);break;default:ph(t,n)}}function mh(t,n){if(t.subtreeFlags&67108864)for(t=t.child;t!==null;){t:{var a=t,s=n;switch(a.tag){case 4:A_(a,s);break t;case 22:a.memoizedState===null&&mh(a,s);break t;default:mh(a,s)}}t=t.sibling}}function R_(t){var n=t.alternate;n!==null&&(t.alternate=null,R_(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&te(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Je=null,qn=!1;function Ai(t,n,a){for(a=a.child;a!==null;)C_(t,n,a),a=a.sibling}function C_(t,n,a){if($e&&typeof $e.onCommitFiberUnmount=="function")try{$e.onCommitFiberUnmount(Me,a)}catch{}switch(a.tag){case 26:ze||Rn(a,n),Ai(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&!ze&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:ze||Rn(a,n),Vo(a);var s=Je,l=qn;ts(a.type)&&(Je=a.stateNode,qn=!1),Ai(t,n,a),N0(a.stateNode,a.type,a.memoizedProps),Je=s,qn=l;break;case 5:ze||Rn(a,n),Vo(a);case 6:if(a.tag===6&&Vo(a),s=Je,l=qn,Je=null,Ai(t,n,a),Je=s,qn=l,Je!==null)if(qn)try{(Je.nodeType===9?Je.body:Je.nodeName==="HTML"?Je.ownerDocument.body:Je).removeChild(a.stateNode),we=!0}catch(c){Be(a,n,c)}else try{Je.removeChild(a.stateNode),we=!0}catch(c){Be(a,n,c)}break;case 18:Je!==null&&(qn?(t=Je,_0(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Fr(t)):_0(Je,a.stateNode));break;case 4:s=Je,l=qn,Je=a.stateNode.containerInfo,qn=!0,Ai(t,n,a),Je=s,qn=l;break;case 0:case 11:case 14:case 15:Wa(2,a,n),ze||Wa(4,a,n),Ai(t,n,a);break;case 1:ze||(Rn(a,n),s=a.stateNode,typeof s.componentWillUnmount=="function"&&p_(a,n,s)),Ai(t,n,a);break;case 21:Ai(t,n,a);break;case 22:ze=(s=ze)||a.memoizedState!==null,Ai(t,n,a),ze=s;break;case 30:Rn(a,n),Ai(t,n,a);break;case 7:ze||Rn(a,n),Ai(t,n,a);break;default:Ai(t,n,a)}}function w_(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Fr(t)}catch(a){Be(n,n.return,a)}}}function D_(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Fr(t)}catch(a){Be(n,n.return,a)}}function py(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new T_),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new T_),n;default:throw Error(r(435,t.tag))}}function Mu(t,n){var a=py(t);n.forEach(function(s){if(!a.has(s)){a.add(s);var l=Ay.bind(null,t,s);s.then(l,l)}})}function Fn(t,n,a){var s=n.deletions;if(s!==null)for(var l=0;l<s.length;l++){var c=s[l],p=t,E=n,N=E;t:for(;N!==null;){switch(N.tag){case 27:if(ts(N.type)){Je=N.stateNode,qn=!1;break t}break;case 5:Je=N.stateNode,qn=!1;break t;case 3:case 4:Je=N.stateNode.containerInfo,qn=!0;break t}N=N.return}if(Je===null)throw Error(r(160));C_(p,E,c),Je=null,qn=!1,p=c.alternate,p!==null&&(p.return=null),c.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)U_(n,t,a),n=n.sibling}var Ri=null;function U_(t,n,a){var s=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(l&4&&(s=t.updateQueue,s=s!==null?s.events:null,s!==null))for(var c=0;c<s.length;c++){var p=s[c];p.ref.impl=p.nextImpl}Fn(n,t,a),Hn(t),l&4&&(Wa(3,t,t.return),Go(3,t),Wa(5,t,t.return));break;case 1:Fn(n,t,a),Hn(t),l&512&&(ze||s===null||Rn(s,s.return)),l&64&&yn&&(t=t.updateQueue,t!==null&&(n=t.callbacks,n!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:if(c=Ri,Fn(n,t,a),Hn(t),l&512&&(ze||s===null||Rn(s,s.return)),l&4)if(l=s!==null?s.memoizedState:null,a=t.memoizedState,s===null)if(a===null)if(t.stateNode===null)if(yn)t.stateNode=p0(t.type,t.memoizedProps,n.containerInfo,t);else{t:{n=t.type,a=t.memoizedProps,l=c.ownerDocument||c;e:switch(n){case"title":s=l.getElementsByTagName("title")[0],(!s||s[Ne]||s[Ct]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=l.createElement(n),l.head.insertBefore(s,l.querySelector("head > title"))),Cn(s,n,a),s[Ct]=t,Ce(s),n=s;break t;case"link":if(c=B0("link","href",l).get(n+(a.href||""))){for(p=0;p<c.length;p++)if(s=c[p],s.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&s.getAttribute("rel")===(a.rel==null?null:a.rel)&&s.getAttribute("title")===(a.title==null?null:a.title)&&s.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){c.splice(p,1);break e}}s=l.createElement(n),Cn(s,n,a),l.head.appendChild(s);break;case"meta":if(c=B0("meta","content",l).get(n+(a.content||""))){for(p=0;p<c.length;p++)if(s=c[p],s.getAttribute("content")===(a.content==null?null:""+a.content)&&s.getAttribute("name")===(a.name==null?null:a.name)&&s.getAttribute("property")===(a.property==null?null:a.property)&&s.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&s.getAttribute("charset")===(a.charSet==null?null:a.charSet)){c.splice(p,1);break e}}s=l.createElement(n),Cn(s,n,a),l.head.appendChild(s);break;default:throw Error(r(468,n))}s[Ct]=t,Ce(s),n=s}t.stateNode=n}else yn||$h(c,t.type,t.stateNode);else t.stateNode=I0(c,a,t.memoizedProps);else l!==a?(l===null?(n=s.stateNode,n===null||ze||n.parentNode.removeChild(n)):l.count--,a===null?yn||$h(c,t.type,t.stateNode):I0(c,a,t.memoizedProps)):a===null&&t.stateNode!==null&&ah(t,t.memoizedProps,s.memoizedProps);break;case 27:Fn(n,t,a),Hn(t),l&512&&(ze||s===null||Rn(s,s.return)),s!==null&&l&4&&ah(t,t.memoizedProps,s.memoizedProps);break;case 5:if(c=Yi,Yi=!1,Fn(n,t,a),Yi=c,Hn(t),l&512&&(ze||s===null||Rn(s,s.return)),t.flags&32){n=t.stateNode;try{nr(n,""),we=!0}catch(nt){Be(t,t.return,nt)}}l&4&&t.stateNode!=null&&(n=t.memoizedProps,ah(t,n,s!==null?s.memoizedProps:n)),l&1024&&(hh=!0);break;case 6:if(Fn(n,t,a),Hn(t),l&4){if(t.stateNode===null)throw Error(r(162));n=t.memoizedProps,a=t.stateNode;try{a.nodeValue=n,we=!0}catch(nt){Be(t,t.return,nt)}}break;case 3:if(we=!1,Iu=null,c=Ri,Ri=Jo(n.containerInfo),Fn(n,t,a),Ri=c,Hn(t),l&4&&s!==null&&s.memoizedState.isDehydrated)try{Fr(n.containerInfo)}catch(nt){Be(t,t.return,nt)}hh&&(hh=!1,N_(t)),we=!1;break;case 4:l=Yi,Yi=yn,s=Jp(),c=Ri,Ri=Jo(t.stateNode.containerInfo),Fn(n,t,a),Hn(t),Ri=c,we&&ko&&(xu=!0),we=s,Yi=l;break;case 12:Fn(n,t,a),Hn(t);break;case 31:Fn(n,t,a),Hn(t),l&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Mu(t,n)));break;case 13:Fn(n,t,a),Hn(t),t.child.flags&8192&&t.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(bu=F()),l&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Mu(t,n)));break;case 22:c=t.memoizedState!==null,p=s!==null&&s.memoizedState!==null;var E=yn,N=ze,Y=Yi;yn=E||c,Yi=Y||c,ze=N||p,Fn(n,t,a),ze=N,Yi=Y,yn=E,Hn(t),l&8192&&(n=t.stateNode,n._visibility=c?n._visibility&-2:n._visibility|1,!c||s===null||p||yn||ze||(n=p||ze,a=yn,s=ze,yn=c||yn,ze=n,ja(t,2),yn=a,ze=s),!c&&Yi||ph(t,c)),l&4&&(n=t.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,Mu(t,a))));break;case 19:Fn(n,t,a),Hn(t),l&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Mu(t,n)));break;case 30:l&512&&(ze||s===null||Rn(s,s.return)),l=Jp(),c=ko,p=(a&335544064)===a,E=t.memoizedProps,ko=p&&ra(E.default,E.update)!=="none",Fn(n,t,a),Hn(t),p&&s!==null&&we&&(t.flags|=4),ko=c,we=l;break;case 21:break;case 7:l&512&&(ze||s===null||Rn(s,s.return)),s&&s.stateNode!==null&&(s.stateNode._fragmentFiber=t);default:Fn(n,t,a),Hn(t)}}function Hn(t){var n=t.flags;if(n&2){try{for(var a,s=t.return;s!==null;){if(g_(s)){a=s;break}s=s.return}s=null;for(var l=t.return;l!==null;){if(nh(l)){var c=l.stateNode;s===null?s=[c]:s.push(c)}if(eh(l))break;l=l.return}var p=s;if(a==null)throw Error(r(160));switch(a.tag){case 27:var E=a.stateNode,N=sh(t);gu(t,N,E,p);break;case 5:var Y=a.stateNode;a.flags&32&&(nr(Y,""),a.flags&=-33);var nt=sh(t);gu(t,nt,Y,p);break;case 3:case 4:var pt=a.stateNode.containerInfo,k=sh(t);rh(t,k,pt,p);break;default:throw Error(r(161))}}catch($){Be(t,t.return,$)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function N_(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;N_(n),n.tag===5&&n.flags&1024&&(n=n.stateNode,Br=!0,n.reset(),Br=!1),t=t.sibling}}function yr(t,n){if(n.subtreeFlags&9270)for(n=n.child;n!==null;)L_(n,t),n=n.sibling;else E_(n)}function L_(t,n){var a=t.alternate;if(a===null)oh(t,!1);else switch(t.tag){case 3:if(dh=Wi=!1,S_(),yr(n,t),!Wi&&!xu){if(t=Xi,t!==null)for(var s=0;s<t.length;s+=3){a=t[s];var l=t[s+1];x0(a,t[s+2]),a=a.ownerDocument.documentElement,a!==null&&a.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+l+")"})}t=n.containerInfo,t=t.nodeType===9?t.documentElement:t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName===""&&(t.style.viewTransitionName="none",t.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),t.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),dh=!0}Xi=null;break;case 5:yr(n,t);break;case 4:s=Wi,Wi=!1,yr(n,t),Wi&&(xu=!0),Wi=s;break;case 22:t.memoizedState===null&&(a.memoizedState!==null?oh(t,!1):yr(n,t));break;case 30:s=Wi,l=S_(),Wi=!1,yr(n,t),Wi&&(t.flags|=4);var c=t.memoizedProps,p=t.stateNode;n=sa(c,p),p=sa(a.memoizedProps,p);var E=ra(c.default,c.update);E==="none"?n=!1:(c=a.memoizedState,a.memoizedState=null,a=t.child,Xn=0,n=fh(t,a,n,p,E,c,!0),Xn!==(c===null?0:c.length)&&(t.flags|=32)),(t.flags&4)!==0&&n?(Cr(t,t.memoizedProps.onUpdate),Xi=l):l!==null&&(l.push.apply(l,Xi),Xi=l),Wi=(t.flags&32)!==0?!0:s;break;default:yr(n,t)}}function ji(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)b_(t,n.alternate,n),n=n.sibling}function ja(t,n){for(t=t.child;t!==null;){var a=t,s=n;switch(a.tag){case 0:case 11:case 14:case 15:Wa(4,a,a.return),ja(a,s);break;case 1:Rn(a,a.return);var l=a.stateNode;typeof l.componentWillUnmount=="function"&&p_(a,a.return,l),ja(a,s);break;case 27:(s&2)!==0&&N0(a.stateNode,a.type,a.memoizedProps);case 5:Rn(a,a.return),a.tag!==5&&a.tag!==27||Vo(a),ja(a,s);break;case 6:Vo(a);break;case 26:Rn(a,a.return),l=a.stateNode,a.memoizedState!==null||l===null||ze||l.parentNode.removeChild(l),ja(a,s);break;case 22:a.memoizedState===null&&ja(a,s);break;case 30:Rn(a,a.return),ja(a,s);break;case 7:Rn(a,a.return);default:ja(a,s)}t=t.sibling}}function Ci(t,n,a){for(a=(n.subtreeFlags&8772)!==0?a:a&-2,n=n.child;n!==null;){var s=n.alternate,l=t,c=n,p=c.flags,E=(a&1)!==0;switch(c.tag){case 0:case 11:case 15:Ci(l,c,a),Go(4,c);break;case 1:if(Ci(l,c,a),s=c,l=s.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(nt){Be(s,s.return,nt)}if(s=c,l=s.updateQueue,l!==null){var N=s.stateNode;try{var Y=l.shared.hiddenCallbacks;if(Y!==null)for(l.shared.hiddenCallbacks=null,l=0;l<Y.length;l++)eg(Y[l],N)}catch(nt){Be(s,s.return,nt)}}E&&p&64&&d_(c),ki(c,c.return);break;case 27:(a&2)!==0&&__(c);case 5:c.tag!==5&&c.tag!==27||m_(c),Ci(l,c,a),E&&s===null&&p&4&&ih(c),ki(c,c.return);break;case 6:m_(c);break;case 26:N=c.stateNode,c.memoizedState!==null||N===null||yn||$h(Jo(N.ownerDocument),c.type,N),Ci(l,c,a),E&&s===null&&p&4&&ih(c),ki(c,c.return);break;case 12:Ci(l,c,a);break;case 31:Ci(l,c,a),E&&p&4&&w_(l,c);break;case 13:Ci(l,c,a),E&&p&4&&D_(l,c);break;case 22:c.memoizedState===null&&Ci(l,c,a),ki(c,c.return);break;case 30:Ci(l,c,a),ki(c,c.return);break;case 7:ki(c,c.return);default:Ci(l,c,a)}n=n.sibling}}function gh(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&Co(a))}function _h(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Co(t))}function _i(t,n,a,s){var l=(a&335544064)===a;if(n.subtreeFlags&(l?10262:10256))for(n=n.child;n!==null;)O_(t,n,a,s),n=n.sibling;else l&&M_(n)}function O_(t,n,a,s){var l=(a&335544064)===a;l&&n.alternate===null&&n.return!==null&&n.return.alternate!==null&&Su(n);var c=n.flags;switch(n.tag){case 0:case 11:case 15:_i(t,n,a,s),c&2048&&Go(9,n);break;case 1:_i(t,n,a,s);break;case 3:_i(t,n,a,s),l&&dh&&(t=t.containerInfo,t=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,t.style.viewTransitionName==="root"&&(t.style.viewTransitionName=""),t=t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName==="none"&&(t.style.viewTransitionName="")),c&2048&&(c=null,n.alternate!==null&&(c=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==c&&(n.refCount++,c!=null&&Co(c)));break;case 12:if(c&2048){_i(t,n,a,s),c=n.stateNode;try{var p=n.memoizedProps,E=p.id,N=p.onPostCommit;typeof N=="function"&&N(E,n.alternate===null?"mount":"update",c.passiveEffectDuration,-0)}catch(Y){Be(n,n.return,Y)}}else _i(t,n,a,s);break;case 31:_i(t,n,a,s);break;case 13:_i(t,n,a,s);break;case 23:break;case 22:p=n.stateNode,E=n.alternate,n.memoizedState!==null?(l&&E!==null&&E.memoizedState===null&&Su(E),p._visibility&2?_i(t,n,a,s):Xo(t,n)):(l&&E!==null&&E.memoizedState!==null&&Su(n),p._visibility&2?_i(t,n,a,s):(p._visibility|=2,Mr(t,n,a,s,(n.subtreeFlags&10256)!==0||!1))),c&2048&&gh(E,n);break;case 24:_i(t,n,a,s),c&2048&&_h(n.alternate,n);break;case 30:l&&(c=n.alternate,c!==null&&(qi(c.child,!0),qi(n.child,!0))),_i(t,n,a,s);break;default:_i(t,n,a,s)}}function Mr(t,n,a,s,l){for(l=l&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var c=t,p=n,E=a,N=s,Y=p.flags;switch(p.tag){case 0:case 11:case 15:Mr(c,p,E,N,l),Go(8,p);break;case 23:break;case 22:var nt=p.stateNode;p.memoizedState!==null?nt._visibility&2?Mr(c,p,E,N,l):Xo(c,p):(nt._visibility|=2,Mr(c,p,E,N,l)),l&&Y&2048&&gh(p.alternate,p);break;case 24:Mr(c,p,E,N,l),l&&Y&2048&&_h(p.alternate,p);break;default:Mr(c,p,E,N,l)}n=n.sibling}}function Xo(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,s=n,l=s.flags;switch(s.tag){case 22:Xo(a,s),l&2048&&gh(s.alternate,s);break;case 24:Xo(a,s),l&2048&&_h(s.alternate,s);break;default:Xo(a,s)}n=n.sibling}}var Ps=8192;function zs(t,n,a){if(t.subtreeFlags&Ps)for(t=t.child;t!==null;)P_(t,n,a),t=t.sibling}function P_(t,n,a){switch(t.tag){case 26:zs(t,n,a),t.flags&Ps&&(t.memoizedState!==null?xM(a,Ri,t.memoizedState,t.memoizedProps):(t=t.stateNode,(n&335544128)===n&&V0(a,t)));break;case 5:zs(t,n,a),t.flags&Ps&&(t=t.stateNode,(n&335544128)===n&&V0(a,t));break;case 3:case 4:var s=Ri;Ri=Jo(t.stateNode.containerInfo),zs(t,n,a),Ri=s;break;case 22:t.memoizedState===null&&(s=t.alternate,s!==null&&s.memoizedState!==null?(s=Ps,Ps=16777216,zs(t,n,a),Ps=s):zs(t,n,a));break;case 30:if((t.flags&Ps)!==0&&(s=t.memoizedProps.name,s!=null&&s!=="auto")){var l=t.stateNode;l.paired=null,ni===null&&(ni=new Map),ni.set(s,l)}zs(t,n,a);break;default:zs(t,n,a)}}function z_(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function qo(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var s=n[a];Mn=s,B_(s,t)}z_(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)I_(t),t=t.sibling}function I_(t){switch(t.tag){case 0:case 11:case 15:qo(t),t.flags&2048&&Wa(9,t,t.return);break;case 3:qo(t);break;case 12:qo(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,Eu(t)):qo(t);break;default:qo(t)}}function Eu(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var s=n[a];Mn=s,B_(s,t)}z_(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:Wa(8,n,n.return),Eu(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Eu(n));break;default:Eu(n)}t=t.sibling}}function B_(t,n){for(;Mn!==null;){var a=Mn;switch(a.tag){case 0:case 11:case 15:Wa(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var s=a.memoizedState.cachePool.pool;s!=null&&s.refCount++}break;case 24:Co(a.memoizedState.cache)}if(s=a.child,s!==null)s.return=a,Mn=s;else t:for(a=t;Mn!==null;){s=Mn;var l=s.sibling,c=s.return;if(R_(s),s===a){Mn=null;break t}if(l!==null){l.return=c,Mn=l;break t}Mn=c}}}var my={getCacheForType:function(t){var n=Tn(ln),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return Tn(ln).controller.signal}},gy=typeof WeakMap=="function"?WeakMap:Map,Oe=0,Ye=null,Se=null,Ee=0,Ie=0,ii=null,Za=!1,Er=!1,vh=!1,ma=0,an=0,Ka=0,Is=0,Tu=0,ai=0,Tr=0,Yo=null,Yn=null,Sh=!1,bu=0,F_=0,Au=1/0,Ru=null,Qa=null,tn=0,wi=null,Bs=null,Zi=0,xh=0,yh=null,H_=null,br=null,Ar=null,Rr=null,Wo=0,Cu=null;function si(){return(Oe&2)!==0&&Ee!==0?Ee&-Ee:Mt.T!==null?Uh():Et()}function G_(){if(ai===0)if((Ee&536870912)===0||_e){var t=na;na<<=1,(na&3932160)===0&&(na=262144),ai=t}else ai=536870912;return t=bn.current,t!==null&&(t.flags|=32),ai}function Cr(t,n){if(n!=null){var a=t.stateNode,s=a.ref;s===null&&(s=a.ref=y0(sa(t.memoizedProps,a))),Ar===null&&(Ar=[]),Ar.push(n.bind(null,s))}}function Wn(t,n,a){(t===Ye&&(Ie===2||Ie===9)||t.cancelPendingCommit!==null)&&(wr(t,0),Ja(t,Ee,ai,!1)),Ss(t,a),((Oe&2)===0||t!==Ye)&&(t===Ye&&((Oe&2)===0&&(Is|=a),an===4&&Ja(t,Ee,ai,!1)),Ki(t))}function V_(t,n,a){if((Oe&6)!==0)throw Error(r(327));var s=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Na(t,n),l=s?Sy(t,n):Eh(t,n,!0),c=s;do{if(l===0){Er&&!s&&Ja(t,n,0,!1);break}else{if(a=t.current.alternate,c&&!_y(a)){l=Eh(t,n,!1),c=!1;continue}if(l===2){if(c=n,t.errorRecoveryDisabledLanes&c)var p=0;else p=t.pendingLanes&-536870913,p=p!==0?p:p&536870912?536870912:0;if(p!==0){n=p;t:{var E=t;l=Yo;var N=E.current.memoizedState.isDehydrated;if(N&&(wr(E,p).flags|=256),p=Eh(E,p,!1),p!==2&&p!==6){if(vh&&!N){E.errorRecoveryDisabledLanes|=c,Is|=c,l=4;break t}c=Yn,Yn=l,c!==null&&(Yn===null?Yn=c:Yn.push.apply(Yn,c))}l=p}if(c=!1,l!==2)continue}}if(l===1){wr(t,0),Ja(t,n,0,!0);break}t:{switch(s=t,c=l,c){case 0:case 1:throw Error(r(345));case 4:if((n&4194048)!==n&&(n&62914560)!==n)break;case 6:Ja(s,n,ai,!Za);break t;case 2:Yn=null;break;case 3:case 5:break;default:throw Error(r(329))}if((n&62914560)===n&&(l=bu+300-F(),10<l)){if(Ja(s,n,ai,!Za),vs(s,0,!0)!==0)break t;Zi=n,s.timeoutHandle=Vh(k_.bind(null,s,a,Yn,Ru,Sh,n,ai,Is,Tr,Za,c,"Throttled",-0,0),l);break t}k_(s,a,Yn,Ru,Sh,n,ai,Is,Tr,Za,c,null,-0,0)}}break}while(!0);Ki(t)}function k_(t,n,a,s,l,c,p,E,N,Y,nt,pt,k,$){t.timeoutHandle=-1;var Dt=n.subtreeFlags,qt=(c&335544064)===c;if(pt=null,(qt||Dt&8192||(Dt&16785408)===16785408)&&(pt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Hi},ni=null,P_(n,c,pt),qt&&(Dt=pt,qt=t.containerInfo,qt=(qt.nodeType===9?qt:qt.ownerDocument).__reactViewTransition,qt!=null&&(Dt.count++,Dt.waitingForViewTransition=!0,Dt=el.bind(Dt),qt.finished.then(Dt,Dt))),Dt=(c&62914560)===c?bu-F():(c&4194048)===c?F_-F():0,Dt=yM(pt,Dt),Dt!==null)){Zi=c,t.cancelPendingCommit=Dt(Q_.bind(null,t,n,c,a,s,l,p,E,N,Y,nt,pt,null,k,$)),Ja(t,c,p,!Y);return}Q_(t,n,c,a,s,l,p,E,N,Y,nt,pt)}function _y(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var s=0;s<a.length;s++){var l=a[s],c=l.getSnapshot;l=l.value;try{if(!ti(c(),l))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Ja(t,n,a,s){n=bl(t,n),n&=~Tu,n&=~Is,t.suspendedLanes|=n,t.pingedLanes&=~n,s&&(t.warmLanes|=n),s=t.expirationTimes;for(var l=n;0<l;){var c=31-Dn(l),p=1<<c;s[c]=-1,l&=~p}a!==0&&b(t,a,n)}function wu(){return(Oe&6)===0?(jo(0),!1):!0}function Mh(){if(Se!==null){if(Ie===0)var t=Se.return;else t=Se,ua=bs=null,Df(t),mr=null,Uo=0,t=Se;for(;t!==null;)h_(t.alternate,t),t=t.return;Se=null}}function wr(t,n){var a=t.timeoutHandle;return a!==-1&&(t.timeoutHandle=-1,Gy(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),Zi=0,Mh(),Ye=t,Se=a=oa(t.current,null),Ee=n,Ie=0,ii=null,Za=!1,Er=Na(t,n),vh=!1,Tr=ai=Tu=Is=Ka=an=0,Yn=Yo=null,Sh=!1,ma=bl(t,n),Il(),a}function X_(t,n){he=null,Mt.H=lu,n===pr||n===jl?(n=Qm(),Ie=3):n===_f?(n=Qm(),Ie=4):Ie=n===qf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,ii=n,Se===null&&(an=1,uu(t,di(n,t.current)))}function q_(){var t=bn.current;return t===null?!0:(Ee&4194048)===Ee?Nn===null:(Ee&62914560)===Ee||(Ee&536870912)!==0?t===Nn:!1}function Y_(){var t=Mt.H;return Mt.H=lu,t===null?lu:t}function W_(){var t=Mt.A;return Mt.A=my,t}function Du(){an=4,Za||(Ee&4194048)!==Ee&&bn.current!==null||(Er=!0),(Ka&134217727)===0&&(Is&134217727)===0||Ye===null||Ja(Ye,Ee,ai,!1)}function Eh(t,n,a){var s=Oe;Oe|=2;var l=Y_(),c=W_();(Ye!==t||Ee!==n)&&(Ru=null,wr(t,n)),n=!1;var p=an;t:do try{if(Ie!==0&&Se!==null){var E=Se,N=ii;switch(Ie){case 8:Mh(),p=6;break t;case 3:case 2:case 9:case 6:bn.current===null&&(n=!0);var Y=Ie;if(Ie=0,ii=null,Dr(t,E,N,Y),a&&Er){p=0;break t}break;default:Y=Ie,Ie=0,ii=null,Dr(t,E,N,Y)}}vy(),p=an;break}catch(nt){X_(t,nt)}while(!0);return n&&t.shellSuspendCounter++,ua=bs=null,Oe=s,Mt.H=l,Mt.A=c,Se===null&&(Ye=null,Ee=0,Il()),p}function vy(){for(;Se!==null;)j_(Se)}function Sy(t,n){var a=Oe;Oe|=2;var s=Y_(),l=W_();Ye!==t||Ee!==n?(Ru=null,Au=F()+500,wr(t,n)):Er=Na(t,n);t:do try{if(Ie!==0&&Se!==null){n=Se;var c=ii;e:switch(Ie){case 1:Ie=0,ii=null,Dr(t,n,c,1);break;case 2:case 9:if(Zm(c)){Ie=0,ii=null,Z_(n);break}n=function(){Ie!==2&&Ie!==9||Ye!==t||(Ie=7),Ki(t)},c.then(n,n);break t;case 3:Ie=7;break t;case 4:Ie=5;break t;case 7:Zm(c)?(Ie=0,ii=null,Z_(n)):(Ie=0,ii=null,Dr(t,n,c,7));break;case 5:var p=null;switch(Se.tag){case 26:p=Se.memoizedState;case 5:case 27:var E=Se;if(p?H0(p):E.stateNode.complete){Ie=0,ii=null;var N=E.sibling;if(N!==null)Se=N;else{var Y=E.return;Y!==null?(Se=Y,Uu(Y)):Se=null}break e}}Ie=0,ii=null,Dr(t,n,c,5);break;case 6:Ie=0,ii=null,Dr(t,n,c,6);break;case 8:Mh(),an=6;break t;default:throw Error(r(462))}}xy();break}catch(nt){X_(t,nt)}while(!0);return ua=bs=null,Mt.H=s,Mt.A=l,Oe=a,Se!==null?0:(Ye=null,Ee=0,Il(),an)}function xy(){for(;Se!==null&&!Pt();)j_(Se)}function j_(t){var n=c_(t.alternate,t,ma);t.memoizedProps=t.pendingProps,n===null?Uu(t):Se=n}function Z_(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=i_(a,n,n.pendingProps,n.type,void 0,Ee);break;case 11:n=i_(a,n,n.pendingProps,n.type.render,n.ref,Ee);break;case 5:Df(n);var s=n;s===xn&&(_e?(kl(s),s.tag===5&&s.stateNode!=null&&(Ze=s.stateNode)):(kl(s),_e=!0));default:h_(a,n),n=Se=Bm(n,ma),n=c_(a,n,ma)}t.memoizedProps=t.pendingProps,n===null?Uu(t):Se=n}function Dr(t,n,a,s){ua=bs=null,Df(n),mr=null,Uo=0;var l=n.return;try{if(oy(t,l,n,a,Ee)){an=1,uu(t,di(a,t.current)),Se=null;return}}catch(c){if(l!==null)throw Se=l,c;an=1,uu(t,di(a,t.current)),Se=null;return}n.flags&32768?(_e||s===1?t=!0:Er||(Ee&536870912)!==0?t=!1:(Za=t=!0,(s===2||s===9||s===3||s===6)&&(s=bn.current,s!==null&&s.tag===13&&(s.flags|=16384))),K_(n,t)):Uu(n)}function Uu(t){var n=t;do{if((n.flags&32768)!==0){K_(n,Za);return}t=n.return;var a=fy(n.alternate,n,ma);if(a!==null){Se=a;return}if(n=n.sibling,n!==null){Se=n;return}Se=n=t}while(n!==null);an===0&&(an=5)}function K_(t,n){do{var a=hy(t.alternate,t);if(a!==null){a.flags&=32767,Se=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){Se=t;return}Se=t=a}while(t!==null);an=6,Se=null}function Q_(t,n,a,s,l,c,p,E,N,Y,nt,pt){t.cancelPendingCommit=null;do Nu();while(tn!==0);if((Oe&6)!==0)throw Error(r(327));if(n!==null){if(n===t.current)throw Error(r(177));t===Ye&&(Se=Ye=null,Ee=0),Bs=n,wi=t,Zi=a,yh=l,H_=s,yy(t,n,a,p,E,N,pt)}}function yy(t,n,a,s,l,c,p){var E=n.lanes|n.childLanes;if(xh=E,E|=af,Oc(t,a,E,s,l,c),Ar=null,(a&335544064)===a?(Rr=Zx(t),s=10262):(Rr=null,s=10256),(n.subtreeFlags&s)!==0||(n.flags&s)!==0?(t.callbackNode=null,t.callbackPriority=0,Ry(xt,function(){return Rh(),null})):(t.callbackNode=null,t.callbackPriority=0),_u=!1,s=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||s){s=Mt.T,Mt.T=null,l=Yt.p,Yt.p=2,c=Oe,Oe|=4;try{dy(t,n,a)}finally{Oe=c,Yt.p=l,Mt.T=s}}tn=1,_u?br=Wy(p,t.containerInfo,Rr,Th,bh,Ey,Ah,Rh,My):(Th(),bh(),Ah())}function My(t){if(tn!==0){var n=wi.onRecoverableError;n(t,{componentStack:null})}}function Ey(){tn===3&&(tn=0,L_(Bs,wi),tn=4)}function Th(){if(tn===1){tn=0;var t=wi,n=Bs,a=Zi,s=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||s){s=Mt.T,Mt.T=null;var l=Yt.p;Yt.p=2;var c=Oe;Oe|=4;try{ko=xu=!1,U_(n,t,a),a=Fh;var p=Cm(t.containerInfo),E=a.focusedElem,N=a.selectionRange;if(p!==E&&E&&E.ownerDocument&&Rm(E.ownerDocument.documentElement,E)){if(N!==null&&Jc(E)){var Y=N.start,nt=N.end;if(nt===void 0&&(nt=Y),"selectionStart"in E)E.selectionStart=Y,E.selectionEnd=Math.min(nt,E.value.length);else{var pt=E.ownerDocument||document,k=pt&&pt.defaultView||window;if(k.getSelection){var $=k.getSelection(),Dt=E.textContent.length,qt=Math.min(N.start,Dt),de=N.end===void 0?qt:Math.min(N.end,Dt);!$.extend&&qt>de&&(p=de,de=qt,qt=p);var X=Am(E,qt),B=Am(E,de);if(X&&B&&($.rangeCount!==1||$.anchorNode!==X.node||$.anchorOffset!==X.offset||$.focusNode!==B.node||$.focusOffset!==B.offset)){var Q=pt.createRange();Q.setStart(X.node,X.offset),$.removeAllRanges(),qt>de?($.addRange(Q),$.extend(B.node,B.offset)):(Q.setEnd(B.node,B.offset),$.addRange(Q))}}}}for(pt=[],$=E;$=$.parentNode;)$.nodeType===1&&pt.push({element:$,left:$.scrollLeft,top:$.scrollTop});for(typeof E.focus=="function"&&E.focus(),E=0;E<pt.length;E++){var ht=pt[E];ht.element.scrollLeft=ht.left,ht.element.scrollTop=ht.top}}Br=!!Bh,Fh=Bh=null}finally{Oe=c,Yt.p=l,Mt.T=s}}t.current=n,tn=2}}function bh(){if(tn===2){tn=0;var t=wi,n=Bs,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=Mt.T,Mt.T=null;var s=Yt.p;Yt.p=2;var l=Oe;Oe|=4;try{b_(t,n.alternate,n)}finally{Oe=l,Yt.p=s,Mt.T=a}}tn=3}}function Ah(){if(tn===4||tn===3){tn=0;var t=br;br=null,fe();var n=wi,a=Bs,s=Zi,l=H_,c=(s&335544064)===s?10262:10256;if((a.subtreeFlags&c)!==0||(a.flags&c)!==0?tn=5:(tn=0,Bs=wi=null,J_(n,n.pendingLanes)),c=n.pendingLanes,c===0&&(Qa=null),K(s),a=a.stateNode,$e&&typeof $e.onCommitFiberRoot=="function")try{$e.onCommitFiberRoot(Me,a,void 0,(a.current.flags&128)===128)}catch{}if(l!==null){a=Mt.T,c=Yt.p,Yt.p=2,Mt.T=null;try{for(var p=n.onRecoverableError,E=0;E<l.length;E++){var N=l[E];p(N.value,{componentStack:N.stack})}}finally{Mt.T=a,Yt.p=c}}if(l=Ar,p=Rr,Rr=null,l!==null&&(Ar=null,p===null&&(p=[]),t!==null))for(N=0;N<l.length;N++)a=(0,l[N])(p),a!==void 0&&t.finished.finally(a);(Zi&3)!==0&&Nu(),Ki(n),c=n.pendingLanes,(s&261930)!==0&&(c&42)!==0?n===Cu?Wo++:(Wo=0,Cu=n):(Wo=0,Cu=null),jo(0)}}function J_(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,Co(n)))}function Nu(){return br!==null&&(br.skipTransition(),br=null),Th(),bh(),Ah(),Rh()}function Rh(){if(tn!==5)return!1;var t=wi,n=xh;xh=0;var a=K(Zi),s=Mt.T,l=Yt.p;try{Yt.p=32>a?32:a,Mt.T=null,a=yh,yh=null;var c=wi,p=Zi;if(tn=0,Bs=wi=null,Zi=0,(Oe&6)!==0)throw Error(r(331));var E=Oe;if(Oe|=4,I_(c.current),O_(c,c.current,p,a),Oe=E,jo(0,!1),$e&&typeof $e.onPostCommitFiberRoot=="function")try{$e.onPostCommitFiberRoot(Me,c)}catch{}return!0}finally{Yt.p=l,Mt.T=s,J_(t,n)}}function $_(t,n,a){n=di(a,n),n=Xf(t.stateNode,n,2),t=ka(t,n,2),t!==null&&(Ss(t,2),Ki(t))}function Be(t,n,a){if(t.tag===3)$_(t,t,a);else for(;n!==null;){if(n.tag===3){$_(n,t,a);break}else if(n.tag===1){var s=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(Qa===null||!Qa.has(s))){t=di(a,t),a=Zg(2),s=ka(n,a,2),s!==null&&(Kg(a,s,n,t),Ss(s,2),Ki(s));break}}n=n.return}}function Ch(t,n,a){var s=t.pingCache;if(s===null){s=t.pingCache=new gy;var l=new Set;s.set(n,l)}else l=s.get(n),l===void 0&&(l=new Set,s.set(n,l));l.has(a)||(vh=!0,l.add(a),t=Ty.bind(null,t,n,a),n.then(t,t))}function Ty(t,n,a){var s=t.pingCache;s!==null&&s.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,Ye===t&&(Ee&a)===a&&((an===4||an===3&&(Ee&62914560)===Ee&&300>F()-bu)&&(Oe&2)===0?wr(t,0):Tu|=a,Tr===Ee&&(Tr=0)),Ki(t)}function t0(t,n){n===0&&(n=Al()),t=Ms(t,n),t!==null&&(Ss(t,n),Ki(t))}function by(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),t0(t,a)}function Ay(t,n){var a=0;switch(t.tag){case 31:case 13:var s=t.stateNode,l=t.memoizedState;l!==null&&(a=l.retryLane);break;case 19:s=t.stateNode;break;case 22:s=t.stateNode._retryCache;break;default:throw Error(r(314))}s!==null&&s.delete(n),t0(t,a)}function Ry(t,n){return ie(t,n)}var Ur=null,Nr=null,wh=!1,Lu=!1,Dh=!1,$a=0;function Ki(t){t!==Nr&&t.next===null&&(Nr===null?Ur=Nr=t:Nr=Nr.next=t),Lu=!0,wh||(wh=!0,wy())}function jo(t,n){if(!Dh&&Lu){Dh=!0;do for(var a=!1,s=Ur;s!==null;){if(t!==0){var l=s.pendingLanes;if(l===0)var c=0;else{var p=s.suspendedLanes,E=s.pingedLanes;c=(1<<31-Dn(42|t)+1)-1,c&=l&~(p&~E),c=c&201326741?c&201326741|1:c?c|2:0}c!==0&&(a=!0,a0(s,c))}else c=Ee,c=vs(s,s===Ye?c:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),(c&3)===0||Na(s,c)||(a=!0,a0(s,c));s=s.next}while(a);Dh=!1}}function Cy(){e0()}function e0(){Lu=wh=!1;var t=0;$a!==0&&Hy()&&(t=$a);for(var n=F(),a=null,s=Ur;s!==null;){var l=s.next,c=n0(s,n);c===0?(s.next=null,a===null?Ur=l:a.next=l,l===null&&(Nr=a)):(a=s,(t!==0||(c&3)!==0)&&(Lu=!0)),s=l}tn!==0&&tn!==5||jo(t),$a!==0&&($a=0)}function n0(t,n){for(var a=t.suspendedLanes,s=t.pingedLanes,l=t.expirationTimes,c=t.pendingLanes&-62914561;0<c;){var p=31-Dn(c),E=1<<p,N=l[p];N===-1?((E&a)===0||(E&s)!==0)&&(l[p]=Lc(E,n)):N<=n&&(t.expiredLanes|=E),c&=~E}if(n=Ye,a=Ee,a=vs(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s=t.callbackNode,a===0||t===n&&(Ie===2||Ie===9)||t.cancelPendingCommit!==null)return s!==null&&s!==null&&Zt(s),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Na(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(s!==null&&Zt(s),K(a)){case 2:case 8:a=Vt;break;case 32:a=xt;break;case 268435456:a=Wt;break;default:a=xt}return s=i0.bind(null,t),a=ie(a,s),t.callbackPriority=n,t.callbackNode=a,n}return s!==null&&s!==null&&Zt(s),t.callbackPriority=2,t.callbackNode=null,2}function i0(t,n){if(tn!==0&&tn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Nu()&&t.callbackNode!==a)return null;var s=Ee;return s=vs(t,t===Ye?s:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s===0?null:(V_(t,s,n),n0(t,F()),t.callbackNode!=null&&t.callbackNode===a?i0.bind(null,t):null)}function a0(t,n){if(Nu())return null;V_(t,n,!0)}function wy(){Vy(function(){(Oe&6)!==0?ie(wt,Cy):e0()})}function Uh(){if($a===0){var t=Cs;t===0&&(t=gs,gs<<=1,(gs&261888)===0&&(gs=256)),$a=t}return $a}function s0(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:wl(t)}function Dy(t,n,a,s,l){if(n==="submit"&&a&&a.stateNode===l){var c=s0((l[Xt]||null).action),p=s.submitter;p&&(n=(n=p[Xt]||null)?s0(n.formAction):p.getAttribute("formAction"),n!==null&&(c=n,p=null));var E=new Ll("action","action",null,s,l);t.push({event:E,listeners:[{instance:null,listener:function(){if(s.defaultPrevented){if($a!==0){var N=new FormData(l,p);Ff(a,{pending:!0,data:N,method:l.method,action:c},null,N)}}else typeof c=="function"&&(E.preventDefault(),N=new FormData(l,p),Ff(a,{pending:!0,data:N,method:l.method,action:c},c,N))},currentTarget:l}]})}}for(var Nh=0;Nh<nf.length;Nh++){var Lh=nf[Nh],Uy=Lh.toLowerCase(),Ny=Lh[0].toUpperCase()+Lh.slice(1);bi(Uy,"on"+Ny)}bi(Um,"onAnimationEnd"),bi(Nm,"onAnimationIteration"),bi(Lm,"onAnimationStart"),bi("dblclick","onDoubleClick"),bi("focusin","onFocus"),bi("focusout","onBlur"),bi(Gx,"onTransitionRun"),bi(Vx,"onTransitionStart"),bi(kx,"onTransitionCancel"),bi(Om,"onTransitionEnd"),en("onMouseEnter",["mouseout","mouseover"]),en("onMouseLeave",["mouseout","mouseover"]),en("onPointerEnter",["pointerout","pointerover"]),en("onPointerLeave",["pointerout","pointerover"]),on("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),on("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),on("onBeforeInput",["compositionend","keypress","textInput","paste"]),on("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),on("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),on("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Zo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ly=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Zo));function r0(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var s=t[a],l=s.event;s=s.listeners;t:{var c=void 0;if(n)for(var p=s.length-1;0<=p;p--){var E=s[p],N=E.instance,Y=E.currentTarget;if(E=E.listener,N!==c&&l.isPropagationStopped())break t;c=E,l.currentTarget=Y;try{c(l)}catch(nt){zl(nt)}l.currentTarget=null,c=N}else for(p=0;p<s.length;p++){if(E=s[p],N=E.instance,Y=E.currentTarget,E=E.listener,N!==c&&l.isPropagationStopped())break t;c=E,l.currentTarget=Y;try{c(l)}catch(nt){zl(nt)}l.currentTarget=null,c=N}}}}function xe(t,n){var a=n[$t];a===void 0&&(a=n[$t]=new Set);var s=t+"__bubble";a.has(s)||(o0(n,t,2,!1),a.add(s))}function Oh(t,n,a){var s=0;n&&(s|=4),o0(a,t,s,n)}var Ou="_reactListening"+Math.random().toString(36).slice(2);function Ph(t){if(!t[Ou]){t[Ou]=!0,je.forEach(function(a){a!=="selectionchange"&&(Ly.has(a)||Oh(a,!1,t),Oh(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Ou]||(n[Ou]=!0,Oh("selectionchange",!1,n))}}function o0(t,n,a,s){switch(K0(n)){case 2:var l=bM;break;case 8:l=AM;break;default:l=ed}a=l.bind(null,n,a,t),l=void 0,!Vc||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(l=!0),s?l!==void 0?t.addEventListener(n,a,{capture:!0,passive:l}):t.addEventListener(n,a,!0):l!==void 0?t.addEventListener(n,a,{passive:l}):t.addEventListener(n,a,!1)}function zh(t,n,a,s,l){var c=s;if((n&1)===0&&(n&2)===0&&s!==null)t:for(;;){if(s===null)return;var p=s.tag;if(p===3||p===4){var E=s.stateNode.containerInfo;if(E===l)break;if(p===4)for(p=s.return;p!==null;){var N=p.tag;if((N===3||N===4)&&p.stateNode.containerInfo===l)return;p=p.return}for(;E!==null;){if(p=Le(E),p===null)return;if(N=p.tag,N===5||N===6||N===26||N===27){s=c=p;continue t}E=E.parentNode}}s=s.return}om(function(){var Y=c,nt=Hc(a),pt=[];t:{var k=Pm.get(t);if(k!==void 0){var $=Ll,Dt=t;switch(t){case"keypress":if(Ul(a)===0)break t;case"keydown":case"keyup":$=_x;break;case"focusin":Dt="focus",$=Yc;break;case"focusout":Dt="blur",$=Yc;break;case"beforeblur":case"afterblur":$=Yc;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":$=cm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":$=sx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":$=Mx;break;case Um:case Nm:case Lm:$=lx;break;case Om:$=Tx;break;case"scroll":case"scrollend":$=ix;break;case"wheel":$=Ax;break;case"copy":case"cut":case"paste":$=cx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":$=hm;break;case"submit":$=xx;break;case"toggle":case"beforetoggle":$=Cx}var qt=(n&4)!==0,de=!qt&&(t==="scroll"||t==="scrollend"),X=qt?k!==null?k+"Capture":null:k;qt=[];for(var B=Y,Q;B!==null;){var ht=B;if(Q=ht.stateNode,ht=ht.tag,ht!==5&&ht!==26&&ht!==27||Q===null||X===null||(ht=_o(B,X),ht!=null&&qt.push(Ko(B,ht,Q))),de)break;B=B.return}0<qt.length&&(k=new $(k,Dt,null,a,nt),pt.push({event:k,listeners:qt}))}}if((n&7)===0){t:{if($=t==="mouseover"||t==="pointerover",k=t==="mouseout"||t==="pointerout",$&&a!==Fc&&(Dt=a.relatedTarget||a.fromElement)&&(Le(Dt)||Dt[ee]))break t;(k||$)&&(Dt=nt.window===nt?nt:($=nt.ownerDocument)?$.defaultView||$.parentWindow:window,k?($=a.relatedTarget||a.toElement,k=Y,$=$?Le($):null,$!==null&&(de=f($),qt=$.tag,$!==de||qt!==5&&qt!==27&&qt!==6)&&($=null)):(k=null,$=Y),k!==$&&(qt=cm,ht="onMouseLeave",X="onMouseEnter",B="mouse",(t==="pointerout"||t==="pointerover")&&(qt=hm,ht="onPointerLeave",X="onPointerEnter",B="pointer"),de=k==null?Dt:pn(k),Q=$==null?Dt:pn($),Dt=new qt(ht,B+"leave",k,a,nt),Dt.target=de,Dt.relatedTarget=Q,ht=null,Le(nt)===Y&&(qt=new qt(X,B+"enter",$,a,nt),qt.target=Q,qt.relatedTarget=de,ht=qt),de=ht,qt=k&&$?H(k,$,Oy):null,k!==null&&l0(pt,Dt,k,qt,!1),$!==null&&de!==null&&l0(pt,de,$,qt,!0)))}t:{if(k=Y?pn(Y):window,$=k.nodeName&&k.nodeName.toLowerCase(),$==="select"||$==="input"&&k.type==="file")var Ht=xm;else if(vm(k))if(ym)Ht=Bx;else{Ht=zx;var Te=Px}else $=k.nodeName,!$||$.toLowerCase()!=="input"||k.type!=="checkbox"&&k.type!=="radio"?Y&&Bc(Y.elementType)&&(Ht=xm):Ht=Ix;if(Ht&&(Ht=Ht(t,Y))){Sm(pt,Ht,a,nt);break t}Te&&Te(t,k,Y)}switch(Te=Y?pn(Y):window,t){case"focusin":(vm(Te)||Te.contentEditable==="true")&&(rr=Te,$c=Y,bo=null);break;case"focusout":bo=$c=rr=null;break;case"mousedown":tf=!0;break;case"contextmenu":case"mouseup":case"dragend":tf=!1,wm(pt,a,nt);break;case"selectionchange":if(Hx)break;case"keydown":case"keyup":wm(pt,a,nt)}var Jt;if(jc)t:{switch(t){case"compositionstart":var se="onCompositionStart";break t;case"compositionend":se="onCompositionEnd";break t;case"compositionupdate":se="onCompositionUpdate";break t}se=void 0}else sr?gm(t,a)&&(se="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(se="onCompositionStart");se&&(dm&&a.locale!=="ko"&&(sr||se!=="onCompositionStart"?se==="onCompositionEnd"&&sr&&(Jt=lm()):(Oa=nt,kc="value"in Oa?Oa.value:Oa.textContent,sr=!0)),Te=Pu(Y,se),0<Te.length&&(se=new fm(se,t,null,a,nt),pt.push({event:se,listeners:Te}),Jt?se.data=Jt:(Jt=_m(a),Jt!==null&&(se.data=Jt)))),(Jt=Dx?Ux(t,a):Nx(t,a))&&(se=Pu(Y,"onBeforeInput"),0<se.length&&(Te=new fm("onBeforeInput","beforeinput",null,a,nt),pt.push({event:Te,listeners:se}),Te.data=Jt)),Dy(pt,t,Y,a,nt)}r0(pt,n)})}function Ko(t,n,a){return{instance:t,listener:n,currentTarget:a}}function Pu(t,n){for(var a=n+"Capture",s=[];t!==null;){var l=t,c=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||c===null||(l=_o(t,a),l!=null&&s.unshift(Ko(t,l,c)),l=_o(t,n),l!=null&&s.push(Ko(t,l,c))),t.tag===3)return s;t=t.return}return[]}function Oy(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function l0(t,n,a,s,l){for(var c=n._reactName,p=[];a!==null&&a!==s;){var E=a,N=E.alternate,Y=E.stateNode;if(E=E.tag,N!==null&&N===s)break;E!==5&&E!==26&&E!==27||Y===null||(N=Y,l?(Y=_o(a,c),Y!=null&&p.unshift(Ko(a,Y,N))):l||(Y=_o(a,c),Y!=null&&p.push(Ko(a,Y,N)))),a=a.return}p.length!==0&&t.push({event:n,listeners:p})}var Py=/\r\n?/g,zy=/\u0000|\uFFFD/g;function u0(t){return(typeof t=="string"?t:""+t).replace(Py,`
`).replace(zy,"")}function c0(t,n){return n=u0(n),u0(t)===n}function Fe(t,n,a,s,l,c){switch(a){case"children":if(typeof s=="string")n==="body"||n==="textarea"&&s===""||nr(t,s);else if(typeof s=="number"||typeof s=="bigint")n!=="body"&&nr(t,""+s);else return;break;case"className":Cl(t,"class",s);break;case"tabIndex":Cl(t,"tabindex",s);break;case"dir":case"role":case"viewBox":case"width":case"height":Cl(t,a,s);break;case"style":sm(t,s,c);return;case"data":if(n!=="object"){Cl(t,"data",s);break}case"src":case"href":if(s===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(s==null||typeof s=="function"||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(a);break}s=wl(s),t.setAttribute(a,s);break;case"action":case"formAction":if(typeof s=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof c=="function"&&(a==="formAction"?(n!=="input"&&Fe(t,n,"name",l.name,l,null),Fe(t,n,"formEncType",l.formEncType,l,null),Fe(t,n,"formMethod",l.formMethod,l,null),Fe(t,n,"formTarget",l.formTarget,l,null)):(Fe(t,n,"encType",l.encType,l,null),Fe(t,n,"method",l.method,l,null),Fe(t,n,"target",l.target,l,null)));if(s==null||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(a);break}s=wl(s),t.setAttribute(a,s);break;case"onClick":s!=null&&(t.onclick=Hi);return;case"onScroll":s!=null&&xe("scroll",t);return;case"onScrollEnd":s!=null&&xe("scrollend",t);return;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(r(61));if(a=s.__html,a!=null){if(l.children!=null)throw Error(r(60));c?.__html!==a&&(t.innerHTML=a)}}break;case"multiple":t.multiple=s&&typeof s!="function"&&typeof s!="symbol";break;case"muted":t.muted=s&&typeof s!="function"&&typeof s!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(s==null||typeof s=="function"||typeof s=="boolean"||typeof s=="symbol"){t.removeAttribute("xlink:href");break}a=wl(s),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(a,s):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":s&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":s===!0?t.setAttribute(a,""):s!==!1&&s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(a,s):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":s!=null&&typeof s!="function"&&typeof s!="symbol"&&!isNaN(s)&&1<=s?t.setAttribute(a,s):t.removeAttribute(a);break;case"rowSpan":case"start":s==null||typeof s=="function"||typeof s=="symbol"||isNaN(s)?t.removeAttribute(a):t.setAttribute(a,s);break;case"popover":xe("beforetoggle",t),xe("toggle",t),Rl(t,"popover",s);break;case"xlinkActuate":ia(t,"http://www.w3.org/1999/xlink","xlink:actuate",s);break;case"xlinkArcrole":ia(t,"http://www.w3.org/1999/xlink","xlink:arcrole",s);break;case"xlinkRole":ia(t,"http://www.w3.org/1999/xlink","xlink:role",s);break;case"xlinkShow":ia(t,"http://www.w3.org/1999/xlink","xlink:show",s);break;case"xlinkTitle":ia(t,"http://www.w3.org/1999/xlink","xlink:title",s);break;case"xlinkType":ia(t,"http://www.w3.org/1999/xlink","xlink:type",s);break;case"xmlBase":ia(t,"http://www.w3.org/XML/1998/namespace","xml:base",s);break;case"xmlLang":ia(t,"http://www.w3.org/XML/1998/namespace","xml:lang",s);break;case"xmlSpace":ia(t,"http://www.w3.org/XML/1998/namespace","xml:space",s);break;case"is":Rl(t,"is",s);break;case"innerText":case"textContent":return;default:if(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")a=ex.get(a)||a,Rl(t,a,s);else return}we=!0}function Ih(t,n,a,s,l,c){switch(a){case"style":sm(t,s,c);return;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(r(61));if(a=s.__html,a!=null){if(l.children!=null)throw Error(r(60));c?.__html!==a&&(t.innerHTML=a)}}break;case"children":if(typeof s=="string")nr(t,s);else if(typeof s=="number"||typeof s=="bigint")nr(t,""+s);else return;break;case"onScroll":s!=null&&xe("scroll",t);return;case"onScrollEnd":s!=null&&xe("scrollend",t);return;case"onClick":s!=null&&(t.onclick=Hi);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!zn.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(l=a.endsWith("Capture"),c=a.slice(2,l?a.length-7:void 0),n=t[Xt]||null,n=n!=null?n[a]:null,typeof n=="function"&&t.removeEventListener(c,n,l),typeof s=="function")){typeof n!="function"&&n!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(c,s,l);break t}we=!0,a in t?t[a]=s:s===!0?t.setAttribute(a,""):Rl(t,a,s)}return}we=!0}function Cn(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":xe("error",t),xe("load",t);var s=!1,l=!1,c;for(c in a)if(a.hasOwnProperty(c)){var p=a[c];if(p!=null)switch(c){case"src":s=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Fe(t,n,c,p,a,null)}}l&&Fe(t,n,"srcSet",a.srcSet,a,null),s&&Fe(t,n,"src",a.src,a,null);return;case"input":xe("invalid",t);var E=c=p=l=null,N=null,Y=null;for(s in a)if(a.hasOwnProperty(s)){var nt=a[s];if(nt!=null)switch(s){case"name":l=nt;break;case"type":p=nt;break;case"checked":N=nt;break;case"defaultChecked":Y=nt;break;case"value":c=nt;break;case"defaultValue":E=nt;break;case"children":case"dangerouslySetInnerHTML":if(nt!=null)throw Error(r(137,n));break;default:Fe(t,n,s,nt,a,null)}}em(t,c,E,N,Y,p,l,!1);return;case"select":xe("invalid",t),s=p=c=null;for(l in a)if(a.hasOwnProperty(l)&&(E=a[l],E!=null))switch(l){case"value":c=E;break;case"defaultValue":p=E;break;case"multiple":s=E;default:Fe(t,n,l,E,a,null)}n=c,a=p,t.multiple=!!s,n!=null?er(t,!!s,n,!1):a!=null&&er(t,!!s,a,!0);return;case"textarea":xe("invalid",t),c=l=s=null;for(p in a)if(a.hasOwnProperty(p)&&(E=a[p],E!=null))switch(p){case"value":s=E;break;case"defaultValue":l=E;break;case"children":c=E;break;case"dangerouslySetInnerHTML":if(E!=null)throw Error(r(91));break;default:Fe(t,n,p,E,a,null)}im(t,s,l,c);return;case"option":for(N in a)a.hasOwnProperty(N)&&(s=a[N],s!=null)&&(N==="selected"?t.selected=s&&typeof s!="function"&&typeof s!="symbol":Fe(t,n,N,s,a,null));return;case"dialog":xe("beforetoggle",t),xe("toggle",t),xe("cancel",t),xe("close",t);break;case"iframe":case"object":xe("load",t);break;case"video":case"audio":for(s=0;s<Zo.length;s++)xe(Zo[s],t);break;case"image":xe("error",t),xe("load",t);break;case"details":xe("toggle",t);break;case"embed":case"source":case"link":xe("error",t),xe("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(Y in a)if(a.hasOwnProperty(Y)&&(s=a[Y],s!=null))switch(Y){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Fe(t,n,Y,s,a,null)}return;default:if(Bc(n)){for(nt in a)a.hasOwnProperty(nt)&&(s=a[nt],s!==void 0&&Ih(t,n,nt,s,a,void 0));return}}for(E in a)a.hasOwnProperty(E)&&(s=a[E],s!=null&&Fe(t,n,E,s,a,null))}var Iy={};function By(t,n,a,s){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,c=null,p=null,E=null,N=null,Y=null,nt=null;for($ in a){var pt=a[$];if(a.hasOwnProperty($)&&pt!=null)switch($){case"checked":break;case"value":break;case"defaultValue":N=pt;default:s.hasOwnProperty($)||Fe(t,n,$,null,s,pt)}}for(var k in s){var $=s[k];if(pt=a[k],s.hasOwnProperty(k)&&($!=null||pt!=null))switch(k){case"type":$!==pt&&(we=!0),c=$;break;case"name":$!==pt&&(we=!0),l=$;break;case"checked":$!==pt&&(we=!0),Y=$;break;case"defaultChecked":$!==pt&&(we=!0),nt=$;break;case"value":$!==pt&&(we=!0),p=$;break;case"defaultValue":$!==pt&&(we=!0),E=$;break;case"children":case"dangerouslySetInnerHTML":if($!=null)throw Error(r(137,n));break;default:$!==pt&&Fe(t,n,k,$,s,pt)}}zc(t,p,E,N,Y,nt,c,l);return;case"select":$=p=E=k=null;for(c in a)if(N=a[c],a.hasOwnProperty(c)&&N!=null)switch(c){case"value":break;case"multiple":$=N;default:s.hasOwnProperty(c)||Fe(t,n,c,null,s,N)}for(l in s)if(c=s[l],N=a[l],s.hasOwnProperty(l)&&(c!=null||N!=null))switch(l){case"value":c!==N&&(we=!0),k=c;break;case"defaultValue":c!==N&&(we=!0),E=c;break;case"multiple":c!==N&&(we=!0),p=c;default:c!==N&&Fe(t,n,l,c,s,N)}n=E,a=p,s=$,k!=null?er(t,!!a,k,!1):!!s!=!!a&&(n!=null?er(t,!!a,n,!0):er(t,!!a,a?[]:"",!1));return;case"textarea":$=k=null;for(E in a)if(l=a[E],a.hasOwnProperty(E)&&l!=null&&!s.hasOwnProperty(E))switch(E){case"value":break;case"children":break;default:Fe(t,n,E,null,s,l)}for(p in s)if(l=s[p],c=a[p],s.hasOwnProperty(p)&&(l!=null||c!=null))switch(p){case"value":l!==c&&(we=!0),k=l;break;case"defaultValue":l!==c&&(we=!0),$=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(r(91));break;default:l!==c&&Fe(t,n,p,l,s,c)}nm(t,k,$);return;case"option":for(var Dt in a)k=a[Dt],a.hasOwnProperty(Dt)&&k!=null&&!s.hasOwnProperty(Dt)&&(Dt==="selected"?t.selected=!1:Fe(t,n,Dt,null,s,k));for(N in s)k=s[N],$=a[N],s.hasOwnProperty(N)&&k!==$&&(k!=null||$!=null)&&(N==="selected"?(k!==$&&(we=!0),t.selected=k&&typeof k!="function"&&typeof k!="symbol"):Fe(t,n,N,k,s,$));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var qt in a)k=a[qt],a.hasOwnProperty(qt)&&k!=null&&!s.hasOwnProperty(qt)&&Fe(t,n,qt,null,s,k);for(Y in s)if(k=s[Y],$=a[Y],s.hasOwnProperty(Y)&&k!==$&&(k!=null||$!=null))switch(Y){case"children":case"dangerouslySetInnerHTML":if(k!=null)throw Error(r(137,n));break;default:Fe(t,n,Y,k,s,$)}return;default:if(Bc(n)){for(var de in a)k=a[de],a.hasOwnProperty(de)&&k!==void 0&&!s.hasOwnProperty(de)&&Ih(t,n,de,void 0,s,k);for(nt in s)k=s[nt],$=a[nt],!s.hasOwnProperty(nt)||k===$||k===void 0&&$===void 0||Ih(t,n,nt,k,s,$);return}}for(var X in a)k=a[X],a.hasOwnProperty(X)&&k!=null&&!s.hasOwnProperty(X)&&Fe(t,n,X,null,s,k);for(pt in s)k=s[pt],$=a[pt],!s.hasOwnProperty(pt)||k===$||k==null&&$==null||Fe(t,n,pt,k,s,$)}function f0(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Fy(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),s=0;s<a.length;s++){var l=a[s],c=l.transferSize,p=l.initiatorType,E=l.duration;if(c&&E&&f0(p)){for(p=0,E=l.responseEnd,s+=1;s<a.length;s++){var N=a[s],Y=N.startTime;if(Y>E)break;var nt=N.transferSize,pt=N.initiatorType;nt&&f0(pt)&&(N=N.responseEnd,p+=nt*(N<E?1:(E-Y)/(N-Y)))}if(--s,n+=8*(c+p)/(l.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Bh=null,Fh=null;function Qo(t){return t.nodeType===9?t:t.ownerDocument}function h0(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function d0(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function p0(t,n,a,s){return a=Qo(a).createElement(t),a[Ct]=s,a[Xt]=n,Cn(a,t,n),Ce(a),a}function Hh(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Gh=null;function Hy(){var t=window.event;return t&&t.type==="popstate"?t===Gh?!1:(Gh=t,!0):(Gh=null,!1)}var Vh=typeof setTimeout=="function"?setTimeout:void 0,Gy=typeof clearTimeout=="function"?clearTimeout:void 0,m0=typeof Promise=="function"?Promise:void 0,g0=typeof requestAnimationFrame=="function"?requestAnimationFrame:Vh,Vy=typeof queueMicrotask=="function"?queueMicrotask:typeof m0<"u"?function(t){return m0.resolve(null).then(t).catch(ky)}:Vh;function ky(t){setTimeout(function(){throw t})}function ts(t){return t==="head"}function _0(t,n){var a=n,s=0;do{var l=a.nextSibling;if(t.removeChild(a),l&&l.nodeType===8)if(a=l.data,a==="/$"||a==="/&"){if(s===0){t.removeChild(l),Fr(n);return}s--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")s++;else if(a==="html")Kh(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Kh(a);for(var c=a.firstChild;c;){var p=c.nextSibling,E=c.nodeName;c[Ne]||E==="SCRIPT"||E==="STYLE"||E==="LINK"&&c.rel.toLowerCase()==="stylesheet"||a.removeChild(c),c=p}}else a==="body"&&Kh(t.ownerDocument.body);a=l}while(a);Fr(n)}function v0(t,n){var a=t;t=0;do{var s=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),s&&s.nodeType===8)if(a=s.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=s}while(a)}function S0(t,n,a){if(n=CSS.escape(n)!==n?"r-"+btoa(n).replace(/=/g,""):n,t.style.viewTransitionName=n,a!=null&&(t.style.viewTransitionClass=a),a=getComputedStyle(t),a.display==="inline"){if(n=t.getClientRects(),n.length===1)var s=1;else for(var l=s=0;l<n.length;l++){var c=n[l];0<c.width&&0<c.height&&s++}s===1&&(t=t.style,t.display=n.length===1?"inline-block":"block",t.marginTop="-"+a.paddingTop,t.marginBottom="-"+a.paddingBottom)}}function x0(t,n){t=t.style,n=n.style;var a=n!=null?n.hasOwnProperty("viewTransitionName")?n.viewTransitionName:n.hasOwnProperty("view-transition-name")?n["view-transition-name"]:null:null;t.viewTransitionName=a==null||typeof a=="boolean"?"":(""+a).trim(),a=n!=null?n.hasOwnProperty("viewTransitionClass")?n.viewTransitionClass:n.hasOwnProperty("view-transition-class")?n["view-transition-class"]:null:null,t.viewTransitionClass=a==null||typeof a=="boolean"?"":(""+a).trim(),t.display==="inline-block"&&(n==null?t.display=t.margin="":(a=n.display,t.display=a==null||typeof a=="boolean"?"":a,a=n.margin,a!=null?t.margin=a:(a=n.hasOwnProperty("marginTop")?n.marginTop:n["margin-top"],t.marginTop=a==null||typeof a=="boolean"?"":a,n=n.hasOwnProperty("marginBottom")?n.marginBottom:n["margin-bottom"],t.marginBottom=n==null||typeof n=="boolean"?"":n)))}function Xy(t,n,a){return a=a.ownerDocument.defaultView,{rect:t,abs:n.position==="absolute"||n.position==="fixed",clip:n.clipPath!=="none"||n.overflow!=="visible"||n.filter!=="none"||n.mask!=="none"||n.mask!=="none"||n.borderRadius!=="0px",view:0<=t.bottom&&0<=t.right&&t.top<=a.innerHeight&&t.left<=a.innerWidth}}function kh(t){var n=t.getBoundingClientRect(),a=getComputedStyle(t);return Xy(n,a,t)}function qy(t){return t.documentElement.clientHeight}function Yy(t){this.addEventListener("load",t),this.addEventListener("error",t)}function Wy(t,n,a,s,l,c,p,E,N){var Y=n.nodeType===9?n:n.ownerDocument;try{var nt=Y.startViewTransition({update:function(){var k=Y.defaultView,$=k.navigation&&k.navigation.transition,Dt=Y.fonts.status;s();var qt=[];if(Dt==="loaded"&&(qy(Y),Y.fonts.status==="loading"&&qt.push(Y.fonts.ready)),Dt=qt.length,t!==null)for(var de=t.suspenseyImages,X=0,B=0;B<de.length;B++){var Q=de[B];if(!Q.complete){var ht=Q.getBoundingClientRect();if(0<ht.bottom&&0<ht.right&&ht.top<k.innerHeight&&ht.left<k.innerWidth){if(X+=G0(Q),X>Bu){qt.length=Dt;break}Q=new Promise(Yy.bind(Q)),qt.push(Q)}}}if(0<qt.length)return k=Promise.race([Promise.all(qt),new Promise(function(Ht){return setTimeout(Ht,500)})]).then(l,l),($?Promise.allSettled([$.finished,k]):k).then(c,c);if(l(),$)return $.finished.then(c,c);c()},types:a});Y.__reactViewTransition=nt;var pt=[];return nt.ready.then(function(){for(var k=Y.documentElement.getAnimations({subtree:!0}),$=0;$<k.length;$++){var Dt=k[$],qt=Dt.effect,de=qt.pseudoElement;if(de!=null&&de.startsWith("::view-transition")){pt.push(Dt),Dt=qt.getKeyframes();for(var X=de=void 0,B=!0,Q=0;Q<Dt.length;Q++){var ht=Dt[Q],Ht=ht.width;if(de===void 0)de=Ht;else if(de!==Ht){B=!1;break}if(Ht=ht.height,X===void 0)X=Ht;else if(X!==Ht){B=!1;break}delete ht.width,delete ht.height,ht.transform==="none"&&delete ht.transform}B&&de!==void 0&&X!==void 0&&(qt.setKeyframes(Dt),B=getComputedStyle(qt.target,qt.pseudoElement),B.width!==de||B.height!==X)&&(B=Dt[0],B.width=de,B.height=X,B=Dt[Dt.length-1],B.width=de,B.height=X,qt.setKeyframes(Dt))}}p()},function(k){Y.__reactViewTransition===nt&&(Y.__reactViewTransition=null);try{typeof k=="object"&&k!==null&&k.name==="InvalidStateError"&&(k.message==="View transition was skipped because document visibility state is hidden."||k.message==="Skipping view transition because document visibility state has become hidden."||k.message==="Skipping view transition because viewport size changed."||k.message==="Transition was aborted because of invalid state")&&(k=null),k!==null&&N(k)}finally{s(),l(),p()}}),nt.finished.finally(function(){for(var k=0;k<pt.length;k++)pt[k].cancel();Y.__reactViewTransition===nt&&(Y.__reactViewTransition=null),E()}),nt}catch{return s(),l(),p(),null}}function Fs(t,n){this._scope=document.documentElement,this._selector="::view-transition-"+t+"("+n+")"}Fs.prototype.animate=function(t,n){return n=typeof n=="number"?{duration:n}:O({},n),n.pseudoElement=this._selector,this._scope.animate(t,n)},Fs.prototype.getAnimations=function(){for(var t=this._scope,n=this._selector,a=t.getAnimations({subtree:!0}),s=[],l=0;l<a.length;l++){var c=a[l].effect;c!==null&&c.target===t&&c.pseudoElement===n&&s.push(a[l])}return s},Fs.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function y0(t){return{name:t,group:new Fs("group",t),imagePair:new Fs("image-pair",t),old:new Fs("old",t),new:new Fs("new",t)}}function ri(t){this._fragmentFiber=t,this._observers=this._eventListeners=null}ri.prototype.addEventListener=function(t,n,a){var s=null,l=null;if(!(a!=null&&typeof a!="boolean"&&(s=a.signal||null,s!==null&&s.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var c=this._eventListeners;if(E0(c,t,n,a)===-1){var p=this,E=n;a!=null&&typeof a!="boolean"&&a.once===!0&&(E=function(N){p.removeEventListener(t,n,a),typeof n=="function"?n.call(this,N):n.handleEvent(N)}),s!==null&&(l=p.removeEventListener.bind(p,t,n,a),s.addEventListener("abort",l,{once:!0}),l=s.removeEventListener.bind(s,"abort",l)),s=Lr(a),c.push({type:t,listener:n,optionsOrUseCapture:a,attachedListener:E,cleanup:l}),_(this._fragmentFiber.child,!1,jy,t,E,s)}this._eventListeners=c}};function jy(t,n,a,s){return y(t).addEventListener(n,a,s),!1}ri.prototype.removeEventListener=function(t,n,a){var s=this._eventListeners;if(s!==null&&(n=E0(s,t,n,a),n!==-1)){var l=s[n];a=l.attachedListener;var c=l.cleanup;l=Lr(l.optionsOrUseCapture),_(this._fragmentFiber.child,!1,Zy,t,a,l),s.splice(n,1),c!==null&&c()}};function Zy(t,n,a,s){return y(t).removeEventListener(n,a,s),!1}function Lr(t){return t!=null&&typeof t!="boolean"&&(t.once===!0||t.signal instanceof AbortSignal)?{capture:t.capture,passive:t.passive}:t}function M0(t){return t==null?"c=0":typeof t=="boolean"?"c="+(t?"1":"0"):"c="+(t.capture?"1":"0")}function E0(t,n,a,s){if(t.length===0)return-1;s=M0(s);for(var l=0;l<t.length;l++){var c=t[l];if(c.type===n&&c.listener===a&&M0(c.optionsOrUseCapture)===s)return l}return-1}ri.prototype.dispatchEvent=function(t){var n=x(this._fragmentFiber);if(n===null)return!0;n=y(n);var a=this._eventListeners;if(a!==null&&0<a.length||!t.bubbles){var s=n.nodeType===9?n.createComment(""):document.createTextNode("");if(a)for(var l=0;l<a.length;l++){var c=a[l];s.addEventListener(c.type,c.attachedListener,Lr(c.optionsOrUseCapture))}if(n.appendChild(s),t=s.dispatchEvent(t),a)for(l=0;l<a.length;l++)c=a[l],s.removeEventListener(c.type,c.attachedListener,Lr(c.optionsOrUseCapture));return n.removeChild(s),t}return n.dispatchEvent(t)},ri.prototype.focus=function(t){_(this._fragmentFiber.child,!0,T0,t,void 0,void 0)};function T0(t,n){return t.tag===6?!1:(t=y(t),oM(t,n))}ri.prototype.focusLast=function(t){var n=[];_(this._fragmentFiber.child,!0,Xh,n,void 0,void 0);for(var a=n.length-1;0<=a&&!T0(n[a],t);a--);};function Xh(t,n){return n.push(t),!1}ri.prototype.blur=function(){var t=x(this._fragmentFiber);t!==null&&(t=y(t),t=Qo(t).activeElement,t!==null&&_(this._fragmentFiber.child,!1,Ky,t,void 0,void 0))};function Ky(t,n){return t.tag===6?!1:(t=y(t),t===n||t.contains(n)?(n.blur(),!0):!1)}ri.prototype.observeUsing=function(t){this._observers===null&&(this._observers=new Set),this._observers.add(t),_(this._fragmentFiber.child,!1,Qy,t,void 0,void 0)};function Qy(t,n){return t.tag===6||(t=y(t),n.observe(t)),!1}ri.prototype.unobserveUsing=function(t){var n=this._observers;if(n!==null&&n.has(t)){n.delete(t),_(this._fragmentFiber.child,!1,Jy,t,void 0,void 0);for(var a=n=0;a<Di.length;a++){var s=Di[a];s.fragmentInstance===this&&s.observer===t?t.unobserve(s.instance):Di[n++]=s}Di.length=n}};function Jy(t,n){return t.tag===6||(t=y(t),n.unobserve(t)),!1}var Di=[],qh=!1;function $y(t,n,a){Di.push({fragmentInstance:t,observer:n,instance:a}),qh||(qh=!0,lM(function(){qh=!1;var s=Di;Di=[];for(var l=0;l<s.length;l++){var c=s[l];c.observer.unobserve(c.instance)}}))}ri.prototype.getClientRects=function(){var t=[];return _(this._fragmentFiber.child,!1,tM,t,void 0,void 0),t};function tM(t,n){if(t.tag===6){t=t.stateNode;var a=t.ownerDocument.createRange();a.selectNodeContents(t),n.push.apply(n,a.getClientRects())}else t=y(t),n.push.apply(n,t.getClientRects());return!1}ri.prototype.getRootNode=function(t){var n=x(this._fragmentFiber);return n===null?this:y(n).getRootNode(t)},ri.prototype.compareDocumentPosition=function(t){var n=x(this._fragmentFiber);if(n===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var a=[];_(this._fragmentFiber.child,!1,Xh,a,void 0,void 0);var s=y(n);if(a.length===0){if(a=s,M(this._fragmentFiber)){t:{for(n=this._fragmentFiber.return;n!==null;){if(n.tag===4){n=n.stateNode.containerInfo;break t}if(n.tag===3||n.tag===5||n.tag===27)break;n=n.return}n=null}n!=null&&(a=n)}n=this._fragmentFiber;var l=s=a.compareDocumentPosition(t);return a===t?l=Node.DOCUMENT_POSITION_CONTAINS:s&Node.DOCUMENT_POSITION_CONTAINED_BY&&(a=A(n)[1],a===null?l=Node.DOCUMENT_POSITION_PRECEDING:(t=y(a).compareDocumentPosition(t),l=t===0||t&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),l|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}n=y(a[0]),l=y(a[a.length-1]);var c=M(this._fragmentFiber)?n.parentElement:s;if(c==null)return Node.DOCUMENT_POSITION_DISCONNECTED;s=c.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY,c=c.compareDocumentPosition(l)&Node.DOCUMENT_POSITION_CONTAINED_BY;var p=n.compareDocumentPosition(t),E=l.compareDocumentPosition(t),N=p&Node.DOCUMENT_POSITION_CONTAINED_BY||E&Node.DOCUMENT_POSITION_CONTAINED_BY;return E=s&&c&&p&Node.DOCUMENT_POSITION_FOLLOWING&&E&Node.DOCUMENT_POSITION_PRECEDING,n=s&&n===t||c&&l===t||N||E?Node.DOCUMENT_POSITION_CONTAINED_BY:!s&&n===t||!c&&l===t?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:p,n&Node.DOCUMENT_POSITION_DISCONNECTED||n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||eM(n,this._fragmentFiber,a[0],a[a.length-1],t)?n:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function eM(t,n,a,s,l){var c=Le(l);if(t&Node.DOCUMENT_POSITION_CONTAINED_BY){if(a=!!c)t:{for(;c!==null;){if(c.tag===7&&(c===n||c.alternate===n)){a=!0;break t}c=c.return}a=!1}return a}if(t&Node.DOCUMENT_POSITION_CONTAINS){if(c===null)return c=l.ownerDocument,l===c||l===c.documentElement||l===c.body;t:{for(c=n,n=x(n);c!==null;){if(!(c.tag!==5&&c.tag!==3&&c.tag!==27||c!==n&&c.alternate!==n)){c=!0;break t}c=c.return}c=!1}return c}return t&Node.DOCUMENT_POSITION_PRECEDING?((n=!!c)&&!(n=c===a)&&(n=H(a,c,V),n===null?n=!1:(_(n,!0,z,c,a),c=S,S=null,n=c!==null)),n):t&Node.DOCUMENT_POSITION_FOLLOWING?((n=!!c)&&!(n=c===s)&&(n=H(s,c,V),n===null?n=!1:(_(n,!0,U,c,s),c=S,I=S=null,n=c!==null)),n):!1}function b0(t,n){var a=t.ownerDocument.createRange();a.selectNodeContents(t),t=a.getBoundingClientRect(),window.scrollTo(window.scrollX+t.left,n?window.scrollY+t.top:window.scrollY+t.bottom-window.innerHeight)}ri.prototype.scrollIntoView=function(t){if(typeof t=="object")throw Error(r(566));var n=[];_(this._fragmentFiber.child,!1,Xh,n,void 0,void 0);var a=t!==!1;if(n.length===0){var s=A(this._fragmentFiber);if(s=a?s[1]||s[0]||x(this._fragmentFiber):s[0]||s[1],s===null)return;if(s.tag===6){t=y(s),b0(t,a);return}if(s=y(s),s.nodeType!==9){if(s.nodeType===11){a="host"in s?s.host:null,a!==null&&a.scrollIntoView(t);return}s.scrollIntoView(t)}}for(s=a?n.length-1:0;s!==(a?-1:n.length);){var l=n[s];l.tag===6?(l=y(l),b0(l,a)):y(l).scrollIntoView(t),s+=a?-1:1}};function nM(t,n){return t=y(t),A0(t,n),!1}function A0(t,n){t.reactFragments==null&&(t.reactFragments=new Set),t.reactFragments.add(n)}function R0(t,n){var a=n._eventListeners;if(a!==null)for(var s=0;s<a.length;s++){var l=a[s];t.addEventListener(l.type,l.attachedListener,Lr(l.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(c){for(var p=0,E=0;E<Di.length;E++){var N=Di[E];(N.fragmentInstance!==n||N.observer!==c||N.instance!==t)&&(Di[p++]=N)}Di.length=p,c.observe(t)}),A0(t,n))}function iM(t,n){var a=n._eventListeners;if(a!==null)for(var s=0;s<a.length;s++){var l=a[s];t.removeEventListener(l.type,l.attachedListener,Lr(l.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(c){typeof c.rootMargin=="string"?$y(n,c,t):c.unobserve(t)}),t.reactFragments!=null&&t.reactFragments.delete(n))}function Yh(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Yh(a),te(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function aM(t,n,a,s){for(;t.nodeType===1;){var l=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!s&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(s){if(!t[Ne])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(c=t.getAttribute("rel"),c==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(c!==l.rel||t.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||t.getAttribute("title")!==(l.title==null?null:l.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(c=t.getAttribute("src"),(c!==(l.src==null?null:l.src)||t.getAttribute("type")!==(l.type==null?null:l.type)||t.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&c&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var c=l.name==null?null:""+l.name;if(l.type==="hidden"&&t.getAttribute("name")===c)return t}else return t;if(t=vi(t.nextSibling),t===null)break}return null}function sM(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=vi(t.nextSibling),t===null))return null;return t}function C0(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=vi(t.nextSibling),t===null))return null;return t}function Wh(t){return t.data==="$?"||t.data==="$~"}function jh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function rM(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var s=function(){n(),a.removeEventListener("DOMContentLoaded",s)};a.addEventListener("DOMContentLoaded",s),t._reactRetry=s}}function vi(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var Zh=null;function w0(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return vi(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function D0(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function oM(t,n){function a(){s=!0}if(t.ownerDocument.activeElement===t)return!0;var s=!1;try{t.ownerDocument.addEventListener("focus",a,!0),(t.focus||HTMLElement.prototype.focus).call(t,n)}finally{t.ownerDocument.removeEventListener("focus",a,!0)}return s}function lM(t){g0(function(){g0(function(n){return t(n)})})}function U0(t,n,a){switch(n=Qo(a),t){case"html":if(t=n.documentElement,!t)throw Error(r(452));return t;case"head":if(t=n.head,!t)throw Error(r(453));return t;case"body":if(t=n.body,!t)throw Error(r(454));return t;default:throw Error(r(451))}}function N0(t,n,a){for(var s in a){var l=a[s];a.hasOwnProperty(s)&&l!=null&&Fe(t,n,s,null,Iy,l)}a.dangerouslySetInnerHTML!=null&&(t.textContent=""),t.onclick===Hi&&(t.onclick=null),te(t)}function Kh(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);te(t)}var Si=new Map,L0=new Set;function Jo(t){if(typeof t.getRootNode=="function"){var n=t.getRootNode();if(n.nodeType===9||n.nodeType===11)return n}return t.nodeType===9?t:t.ownerDocument}var ga=Yt.d;Yt.d={f:uM,r:cM,D:fM,C:hM,L:dM,m:pM,X:gM,S:mM,M:_M};function uM(){var t=ga.f(),n=wu();return t||n}function cM(t){var n=ge(t);n!==null&&n.tag===5&&n.type==="form"?Pg(n):ga.r(t)}var Or=typeof document>"u"?null:document;function O0(t,n,a){var s=Or;if(s&&typeof n=="string"&&n){var l=fi(n);l='link[rel="'+t+'"][href="'+l+'"]',typeof a=="string"&&(l+='[crossorigin="'+a+'"]'),L0.has(l)||(L0.add(l),t={rel:t,crossOrigin:a,href:n},s.querySelector(l)===null&&(n=s.createElement("link"),Cn(n,"link",t),Ce(n),s.head.appendChild(n)))}}function fM(t){ga.D(t),O0("dns-prefetch",t,null)}function hM(t,n){ga.C(t,n),O0("preconnect",t,n)}function dM(t,n,a){ga.L(t,n,a);var s=Or;if(s&&t&&n){var l='link[rel="preload"][as="'+fi(n)+'"]';n==="image"&&a&&a.imageSrcSet?(l+='[imagesrcset="'+fi(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(l+='[imagesizes="'+fi(a.imageSizes)+'"]')):l+='[href="'+fi(t)+'"]';var c=l;switch(n){case"style":c=Pr(t);break;case"script":c=zr(t)}if(!(Si.has(c)||(t=O({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),Si.set(c,t),s.querySelector(l)!==null||n==="style"&&s.querySelector($o(c))||n==="script"&&s.querySelector(tl(c))))){var p=s.createElement("link");Cn(p,"link",t),n==="style"&&(p[Re]=!0,p.onload=p.onerror=function(){La(p)}),Ce(p),s.head.appendChild(p)}}}function pM(t,n){ga.m(t,n);var a=Or;if(a&&t){var s=n&&typeof n.as=="string"?n.as:"script",l='link[rel="modulepreload"][as="'+fi(s)+'"][href="'+fi(t)+'"]',c=l;switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":c=zr(t)}if(!Si.has(c)&&(t=O({rel:"modulepreload",href:t},n),Si.set(c,t),a.querySelector(l)===null)){switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(tl(c)))return}s=a.createElement("link"),Cn(s,"link",t),Ce(s),a.head.appendChild(s)}}}function mM(t,n,a){ga.S(t,n,a);var s=Or;if(s&&t){var l=Jn(s).hoistableStyles,c=Pr(t);n=n||"default";var p=l.get(c);if(!p){var E={loading:0,preload:null};if(p=s.querySelector($o(c)))E.loading=5;else{t=O({rel:"stylesheet",href:t,"data-precedence":n},a),(a=Si.get(c))&&Qh(t,a);var N=p=s.createElement("link");Ce(N),Cn(N,"link",t),N._p=new Promise(function(Y,nt){N.onload=Y,N.onerror=nt}),N.addEventListener("load",function(){E.loading|=1}),N.addEventListener("error",function(){E.loading|=2}),E.loading|=4,zu(p,n,s)}p={type:"stylesheet",instance:p,count:1,state:E},l.set(c,p)}}}function gM(t,n){ga.X(t,n);var a=Or;if(a&&t){var s=Jn(a).hoistableScripts,l=zr(t),c=s.get(l);c||(c=a.querySelector(tl(l)),c||(t=O({src:t,async:!0},n),(n=Si.get(l))&&Jh(t,n),c=a.createElement("script"),Ce(c),Cn(c,"link",t),a.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},s.set(l,c))}}function _M(t,n){ga.M(t,n);var a=Or;if(a&&t){var s=Jn(a).hoistableScripts,l=zr(t),c=s.get(l);c||(c=a.querySelector(tl(l)),c||(t=O({src:t,async:!0,type:"module"},n),(n=Si.get(l))&&Jh(t,n),c=a.createElement("script"),Ce(c),Cn(c,"link",t),a.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},s.set(l,c))}}function P0(t,n,a,s){var l=(l=qe.current)?Jo(l):null;if(!l)throw Error(r(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(a=Pr(a.href),n=Jn(l).hoistableStyles,s=n.get(a),s||(s={type:"style",instance:null,count:0,state:null},n.set(a,s)),s):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=Pr(a.href);var c=Jn(l).hoistableStyles,p=c.get(t);if(p||(l=l.ownerDocument||l,p={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},c.set(t,p),(c=l.querySelector($o(t)))?c._p||(p.instance=c,p.state.loading=5):(c=Si.get(t),c||(c={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Si.set(t,c)),vM(l,t,c,p.state))),n&&s===null)throw Error(r(528,""));return p}if(n&&s!==null)throw Error(r(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(a=zr(a),n=Jn(l).hoistableScripts,s=n.get(a),s||(s={type:"script",instance:null,count:0,state:null},n.set(a,s)),s):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,t))}}function Pr(t){return'href="'+fi(t)+'"'}function $o(t){return'link[rel="stylesheet"]['+t+"]"}function z0(t){return O({},t,{"data-precedence":t.precedence,precedence:null})}function vM(t,n,a,s){if(n=t.querySelector('link[rel="preload"][as="style"]['+n+"]")){if(n[Re]!==!0){s.loading=1;return}}else n=t.createElement("link"),n[Re]=!0,n.onload=n.onerror=La.bind(null,n),Cn(n,"link",a),Ce(n),t.head.appendChild(n);s.preload=n,n.addEventListener("load",function(){return s.loading|=1}),n.addEventListener("error",function(){return s.loading|=2})}function zr(t){return'[src="'+fi(t)+'"]'}function tl(t){return"script[async]"+t}function I0(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var s=t.querySelector('style[data-href~="'+fi(a.href)+'"]');if(s)return n.instance=s,Ce(s),s;var l=O({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return s=(t.ownerDocument||t).createElement("style"),Ce(s),Cn(s,"style",l),zu(s,a.precedence,t),n.instance=s;case"stylesheet":l=Pr(a.href);var c=t.querySelector($o(l));if(c)return n.state.loading|=4,n.instance=c,Ce(c),c;s=z0(a),(l=Si.get(l))&&Qh(s,l),c=(t.ownerDocument||t).createElement("link"),Ce(c);var p=c;return p._p=new Promise(function(E,N){p.onload=E,p.onerror=N}),Cn(c,"link",s),n.state.loading|=4,zu(c,a.precedence,t),n.instance=c;case"script":return c=zr(a.src),(l=t.querySelector(tl(c)))?(n.instance=l,Ce(l),l):(s=a,(l=Si.get(c))&&(s=O({},a),Jh(s,l)),t=t.ownerDocument||t,l=t.createElement("script"),Ce(l),Cn(l,"link",s),t.head.appendChild(l),n.instance=l);case"void":return null;default:throw Error(r(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(s=n.instance,n.state.loading|=4,zu(s,a.precedence,t));return n.instance}function zu(t,n,a){for(var s=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=s.length?s[s.length-1]:null,c=l,p=0;p<s.length;p++){var E=s[p];if(E.dataset.precedence===n)c=E;else if(c!==l)break}c?c.parentNode.insertBefore(t,c.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function Qh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function Jh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var Iu=null;function B0(t,n,a){if(Iu===null){var s=new Map,l=Iu=new Map;l.set(a,s)}else l=Iu,s=l.get(a),s||(s=new Map,l.set(a,s));if(s.has(t))return s;for(s.set(t,null),a=a.getElementsByTagName(t),l=0;l<a.length;l++){var c=a[l];if(!(c[Ne]||c[Ct]||t==="link"&&c.getAttribute("rel")==="stylesheet")&&c.namespaceURI!=="http://www.w3.org/2000/svg"){var p=c.getAttribute(n)||"";p=t+p;var E=s.get(p);E?E.push(c):s.set(p,[c])}}return s}function $h(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function SM(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(t=n.disabled,typeof n.precedence=="string"&&t==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function F0(t,n){return t==="img"&&n.src!=null&&n.src!==""&&n.onLoad==null&&n.loading!=="lazy"}function H0(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function G0(t){return(t.width||100)*(t.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function V0(t,n){typeof n.decode=="function"&&(t.imgCount++,n.complete||(t.imgBytes+=G0(n),t.suspenseyImages.push(n)),t=MM.bind(t),n.decode().then(t,t))}function xM(t,n,a,s){if(a.type==="stylesheet"&&(typeof s.media!="string"||matchMedia(s.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var l=Pr(s.href),c=n.querySelector($o(l));if(c){n=c._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=el.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=c,Ce(c);return}c=n.ownerDocument||n,s=z0(s),(l=Si.get(l))&&Qh(s,l),c=c.createElement("link"),Ce(c);var p=c;p._p=new Promise(function(E,N){p.onload=E,p.onerror=N}),Cn(c,"link",s),a.instance=c}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=el.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var Bu=0;function yM(t,n){return t.stylesheets&&t.count===0&&Hu(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var s=setTimeout(function(){if(t.stylesheets&&Hu(t,t.stylesheets),t.unsuspend){var c=t.unsuspend;t.unsuspend=null,c()}},6e4+n);0<t.imgBytes&&Bu===0&&(Bu=62500*Fy());var l=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Hu(t,t.stylesheets),t.unsuspend)){var c=t.unsuspend;t.unsuspend=null,c()}},(t.imgBytes>Bu?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(s),clearTimeout(l)}}:null}function k0(t){if(t.count===0&&(t.imgCount===0||!t.waitingForImages)){if(t.stylesheets)Hu(t,t.stylesheets);else if(t.unsuspend){var n=t.unsuspend;t.unsuspend=null,n()}}}function el(){this.count--,k0(this)}function MM(){this.imgCount--,k0(this)}var Fu=null;function Hu(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Fu=new Map,n.forEach(EM,t),Fu=null,el.call(t))}function EM(t,n){if(!(n.state.loading&4)){var a=Fu.get(t);if(a)var s=a.get(null);else{a=new Map,Fu.set(t,a);for(var l=t.querySelectorAll("link[data-precedence],style[data-precedence]"),c=0;c<l.length;c++){var p=l[c];(p.nodeName==="LINK"||p.getAttribute("media")!=="not all")&&(a.set(p.dataset.precedence,p),s=p)}s&&a.set(null,s)}l=n.instance,p=l.getAttribute("data-precedence"),c=a.get(p)||s,c===s&&a.set(null,l),a.set(p,l),this.count++,s=el.bind(this),l.addEventListener("load",s),l.addEventListener("error",s),c?c.parentNode.insertBefore(l,c.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(l,t.firstChild)),n.state.loading|=4}}var Ir={$$typeof:lt,Provider:null,Consumer:null,_currentValue:L,_currentValue2:L,_threadCount:0};function TM(t,n,a,s,l,c,p,E,N){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=go(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=go(0),this.hiddenUpdates=go(null),this.identifierPrefix=s,this.onUncaughtError=l,this.onCaughtError=c,this.onRecoverableError=p,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=N,this.transitionTypes=null,this.incompleteTransitions=new Map}function X0(t,n,a,s,l,c,p,E,N,Y,nt,pt){return t=new TM(t,n,a,p,N,Y,nt,pt,E),n=1,c===!0&&(n|=24),c=kn(3,null,null,n),t.current=c,c.stateNode=t,n=pf(),n.refCount++,t.pooledCache=n,n.refCount++,c.memoizedState={element:s,isDehydrated:a,cache:n},vf(c),t}function q0(t){return t?(t=ur,t):ur}function Y0(t,n,a,s,l,c){l=q0(l),s.context===null?s.context=l:s.pendingContext=l,s=Va(n),s.payload={element:a},c=c===void 0?null:c,c!==null&&(s.callback=c),a=ka(t,s,n),a!==null&&(Wn(a,t,n),No(a,t,n))}function W0(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function td(t,n){W0(t,n),(t=t.alternate)&&W0(t,n)}function j0(t){if(t.tag===13||t.tag===31){var n=Ms(t,67108864);n!==null&&Wn(n,t,67108864),td(t,67108864)}}function Z0(t){if(t.tag===13||t.tag===31){var n=si();n=ot(n);var a=Ms(t,n);a!==null&&Wn(a,t,n),td(t,n)}}var Br=!0;function bM(t,n,a,s){var l=Mt.T;Mt.T=null;var c=Yt.p;try{Yt.p=2,ed(t,n,a,s)}finally{Yt.p=c,Mt.T=l}}function AM(t,n,a,s){var l=Mt.T;Mt.T=null;var c=Yt.p;try{Yt.p=8,ed(t,n,a,s)}finally{Yt.p=c,Mt.T=l}}function ed(t,n,a,s){if(Br){var l=nd(s);if(l===null)zh(t,n,s,Gu,a),Q0(t,s);else if(CM(l,t,n,a,s))s.stopPropagation();else if(Q0(t,s),n&4&&-1<RM.indexOf(t)){for(;l!==null;){var c=ge(l);if(c!==null)switch(c.tag){case 3:if(c=c.stateNode,c.current.memoizedState.isDehydrated){var p=ci(c.pendingLanes);if(p!==0){var E=c;for(E.pendingLanes|=2,E.entangledLanes|=2;p;){var N=1<<31-Dn(p);E.entanglements[1]|=N,p&=~N}Ki(c),(Oe&6)===0&&(Au=F()+500,jo(0))}}break;case 31:case 13:E=Ms(c,2),E!==null&&Wn(E,c,2),wu(),td(c,2)}if(c=nd(s),c===null&&zh(t,n,s,Gu,a),c===l)break;l=c}l!==null&&s.stopPropagation()}else zh(t,n,s,null,a)}}function nd(t){return t=Hc(t),id(t)}var Gu=null;function id(t){if(Gu=null,t=Le(t),t!==null){var n=f(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=h(n),t!==null)return t;t=null}else if(a===31){if(t=d(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return Gu=t,null}function K0(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(bt()){case wt:return 2;case Vt:return 8;case xt:case mt:return 32;case Wt:return 268435456;default:return 32}default:return 32}}var ad=!1,es=null,ns=null,is=null,nl=new Map,il=new Map,as=[],RM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Q0(t,n){switch(t){case"focusin":case"focusout":es=null;break;case"dragenter":case"dragleave":ns=null;break;case"mouseover":case"mouseout":is=null;break;case"pointerover":case"pointerout":nl.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":il.delete(n.pointerId)}}function al(t,n,a,s,l,c){return t===null||t.nativeEvent!==c?(t={blockedOn:n,domEventName:a,eventSystemFlags:s,nativeEvent:c,targetContainers:[l]},n!==null&&(n=ge(n),n!==null&&j0(n)),t):(t.eventSystemFlags|=s,n=t.targetContainers,l!==null&&n.indexOf(l)===-1&&n.push(l),t)}function CM(t,n,a,s,l){switch(n){case"focusin":return es=al(es,t,n,a,s,l),!0;case"dragenter":return ns=al(ns,t,n,a,s,l),!0;case"mouseover":return is=al(is,t,n,a,s,l),!0;case"pointerover":var c=l.pointerId;return nl.set(c,al(nl.get(c)||null,t,n,a,s,l)),!0;case"gotpointercapture":return c=l.pointerId,il.set(c,al(il.get(c)||null,t,n,a,s,l)),!0}return!1}function J0(t){var n=Le(t.target);if(n!==null){var a=f(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){t.blockedOn=n,zt(t.priority,function(){Z0(a)});return}}else if(n===31){if(n=d(a),n!==null){t.blockedOn=n,zt(t.priority,function(){Z0(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Vu(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=nd(t.nativeEvent);if(a===null){a=t.nativeEvent;var s=new a.constructor(a.type,a);Fc=s,a.target.dispatchEvent(s),Fc=null}else return n=ge(a),n!==null&&j0(n),t.blockedOn=a,!1;n.shift()}return!0}function $0(t,n,a){Vu(t)&&a.delete(n)}function wM(){ad=!1,es!==null&&Vu(es)&&(es=null),ns!==null&&Vu(ns)&&(ns=null),is!==null&&Vu(is)&&(is=null),nl.forEach($0),il.forEach($0)}function ku(t,n){t.blockedOn===n&&(t.blockedOn=null,ad||(ad=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,wM)))}var Xu=null;function tv(t){Xu!==t&&(Xu=t,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){Xu===t&&(Xu=null);for(var n=0;n<t.length;n+=3){var a=t[n],s=t[n+1],l=t[n+2];if(typeof s!="function"){if(id(s||a)===null)continue;break}var c=ge(a);c!==null&&(t.splice(n,3),n-=3,Ff(c,{pending:!0,data:l,method:a.method,action:s},s,l))}}))}function Fr(t){function n(N){return ku(N,t)}es!==null&&ku(es,t),ns!==null&&ku(ns,t),is!==null&&ku(is,t),nl.forEach(n),il.forEach(n);for(var a=0;a<as.length;a++){var s=as[a];s.blockedOn===t&&(s.blockedOn=null)}for(;0<as.length&&(a=as[0],a.blockedOn===null);)J0(a),a.blockedOn===null&&as.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(s=0;s<a.length;s+=3){var l=a[s],c=a[s+1],p=l[Xt]||null;if(typeof c=="function")p||tv(a);else if(p){var E=null;if(c&&c.hasAttribute("formAction")){if(l=c,p=c[Xt]||null)E=p.formAction;else if(id(l)!==null)continue}else E=p.action;typeof E=="function"?a[s+1]=E:(a.splice(s,3),s-=3),tv(a)}}}function ev(){function t(c){c.canIntercept&&c.info==="react-transition"&&c.intercept({handler:function(){return new Promise(function(p){return l=p})},focusReset:"manual",scroll:"manual"})}function n(){l!==null&&(l(),l=null),s||setTimeout(a,20)}function a(){if(!s&&!navigation.transition){var c=navigation.currentEntry;c&&c.url!=null&&navigation.navigate(c.url,{state:c.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var s=!1,l=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){s=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),l!==null&&(l(),l=null)}}}function sd(t){this._internalRoot=t}qu.prototype.render=sd.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(r(409));var a=n.current,s=si();Y0(a,s,t,n,null,null)},qu.prototype.unmount=sd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;Y0(t.current,2,null,t,null,null),wu(),n[ee]=null}};function qu(t){this._internalRoot=t}qu.prototype.unstable_scheduleHydration=function(t){if(t){var n=Et();t={blockedOn:null,target:t,priority:n};for(var a=0;a<as.length&&n!==0&&n<as[a].priority;a++);as.splice(a,0,t),a===0&&J0(t)}};var nv=e.version;if(nv!=="19.3.1")throw Error(r(527,nv,"19.3.1"));Yt.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(r(188)):(t=Object.keys(t).join(","),Error(r(268,t)));return t=g(n),t=t!==null?v(t):null,t=t===null?null:t.stateNode,t};var DM={bundleType:0,version:"19.3.1",rendererPackageName:"react-dom",currentDispatcherRef:Mt,reconcilerVersion:"19.3.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Yu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Yu.isDisabled&&Yu.supportsFiber)try{Me=Yu.inject(DM),$e=Yu}catch{}}return rl.createRoot=function(t,n){if(!u(t))throw Error(r(299));var a=!1,s="",l=qg,c=Yg,p=Wg;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onUncaughtError!==void 0&&(l=n.onUncaughtError),n.onCaughtError!==void 0&&(c=n.onCaughtError),n.onRecoverableError!==void 0&&(p=n.onRecoverableError)),n=X0(t,1,!1,null,null,a,s,null,l,c,p,ev),t[ee]=n.current,Ph(t),new sd(n)},rl.hydrateRoot=function(t,n,a){if(!u(t))throw Error(r(299));var s=!1,l="",c=qg,p=Yg,E=Wg,N=null;return a!=null&&(a.unstable_strictMode===!0&&(s=!0),a.identifierPrefix!==void 0&&(l=a.identifierPrefix),a.onUncaughtError!==void 0&&(c=a.onUncaughtError),a.onCaughtError!==void 0&&(p=a.onCaughtError),a.onRecoverableError!==void 0&&(E=a.onRecoverableError),a.formState!==void 0&&(N=a.formState)),n=X0(t,1,!0,n,a??null,s,l,N,c,p,E,ev),n.context=q0(null),a=n.current,s=si(),s=ot(s),l=Va(s),l.callback=null,ka(a,l,s),a=s,n.current.lanes=a,Ss(n,a),Ki(n),t[ee]=n.current,Ph(t),new qu(n)},rl.version="19.3.1",rl}var hv;function HM(){if(hv)return ld.exports;hv=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),ld.exports=FM(),ld.exports}var GM=HM();const ro={fov:[50,25,95,"Field of view","°"],distance:[12,3.2,20,"Camera distance","rs"],azimuth:[35,-180,180,"Camera azimuth","°"],elevation:[20,-85,85,"Camera elevation","°"],timeScale:[1,0,3,"Time scale","×"],diskInner:[2.3,1.6,4.5,"Disk inner radius","rs"],diskOuter:[8.5,5,16,"Disk outer radius","rs"],diskHalfThick:[.15,.03,.5,"Disk half thickness","rs"],diskTemp:[1,.3,2.5,"Disk temperature","×"],diskEmission:[1,.2,4,"Disk emission","×"],orbitSpeed:[1,0,2,"Orbit velocity","×"],turbAmp:[.55,0,1,"Turbulence amplitude",""],turbSpeed:[.8,0,3,"Turbulence speed","×"],starDensity:[.7,0,2,"Star density","×"],galaxyBright:[.85,0,2,"Galaxy brightness","×"],bloomStrength:[.28,0,2,"Bloom strength",""],bloomThreshold:[.8,0,1,"Bloom threshold",""],exposure:[0,-2,2,"Exposure","ev"],vignette:[.32,0,1,"Vignette",""],grain:[.35,0,1,"Film grain",""],chroma:[.15,0,1,"Chromatic aberration",""]},zp=Object.keys(ro),no=["standard","high","cinematic"],Wu={standard:{scale:.62,maxSteps:144,maxCross:2,bloomDiv:4},high:{scale:.85,maxSteps:208,maxCross:3,bloomDiv:2},cinematic:{scale:1,maxSteps:320,maxCross:4,bloomDiv:2}},Tc=[{name:"Portrait",azimuth:35,elevation:20,distance:12,fov:50},{name:"Edge-On",azimuth:-95,elevation:4,distance:13.5,fov:45},{name:"Polar",azimuth:160,elevation:64,distance:11,fov:55},{name:"Photon Ring",azimuth:-10,elevation:12,distance:5.2,fov:33}],hd=["Final composite","Integration cost / termination","Event horizon capture mask","Disk crossing order count","Redshift / Doppler factor","Lensed background coordinates","Lensed sky background only","Star field channel","HDR luminance (log, pre-post)","Impact parameter / critical"],Ip="gargantua-state-v1",pS=1;function Bp(){const o={};for(const e of zp)o[e]=ro[e][0];return{params:o,quality:"high",debug:0,cinematic:!0,hudVisible:!0,hudCollapsed:!1,presetIndex:0}}function mS(o,e){const i=ro[o];if(!i)return;const r=Number(e);if(Number.isFinite(r))return Math.min(i[2],Math.max(i[1],r))}function gS(o){return typeof o=="string"&&no.includes(o.toLowerCase())}function VM(o){const e=Bp();if(!o||typeof o!="object")return e;if(o.params&&typeof o.params=="object")for(const i of zp){const r=mS(i,o.params[i]);r!==void 0&&(e.params[i]=r)}return gS(o.quality)&&(e.quality=o.quality.toLowerCase()),Number.isInteger(o.debug)&&o.debug>=0&&o.debug<=9&&(e.debug=o.debug),e.cinematic=o.cinematic!==!1,e.hudVisible=o.hudVisible!==!1,e.hudCollapsed=o.hudCollapsed===!0,Number.isInteger(o.presetIndex)&&o.presetIndex>=0&&o.presetIndex<=3&&(e.presetIndex=o.presetIndex),e}function kM(){try{const o=localStorage.getItem(Ip);if(!o)return null;const e=JSON.parse(o);return e?.version!==pS?null:VM(e.state)}catch{return null}}function dv(o){try{localStorage.setItem(Ip,JSON.stringify({version:pS,state:o}))}catch{}}function XM(){try{localStorage.removeItem(Ip)}catch{}}function qM(o=window.location.search){const e=new URLSearchParams(o),r={capture:e.get("capture")==="1",time:0,quality:null,preset:null,debug:null,hud:null},u=Number(e.get("time"));r.time=Number.isFinite(u)&&u>=0?u:0;const f=e.get("quality");f&&gS(f)&&(r.quality=f.toLowerCase());const h=e.get("preset");if(h!==null){const g=Number(h);Number.isInteger(g)&&g>=0&&g<=3&&(r.preset=g)}const d=e.get("debug");if(d!==null){const g=Number(d);Number.isInteger(g)&&g>=0&&g<=9&&(r.debug=g)}const m=e.get("hud");return m==="0"?r.hud=!1:m==="1"&&(r.hud=!0),r}function YM(o,{persist:e=!0}={}){let i=o;const r=new Set;let u=0;function f(h){for(const d of r)d(i,h);e&&(clearTimeout(u),u=setTimeout(()=>dv(i),250))}return{get:()=>i,subscribe(h){return r.add(h),()=>r.delete(h)},setParam(h,d){const m=mS(h,d);return m===void 0?!1:(i.params[h]===m||(i={...i,params:{...i.params,[h]:m}},f(`param:${h}`)),!0)},set(h,d="ui"){i={...i,...h},f(d)},applyPreset(h){if(!Number.isInteger(h)||h<0||h>3)return!1;const d=Tc[h];return i={...i,presetIndex:h,cinematic:!1,params:{...i.params,azimuth:d.azimuth,elevation:d.elevation,distance:d.distance,fov:d.fov}},f("preset"),!0},reset(){XM();const h=i.hudVisible;i={...Bp(),hudVisible:h},f("reset")},flush(){e&&(clearTimeout(u),dv(i))}}}const Fp="180",io={ROTATE:0,DOLLY:1,PAN:2},to={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},WM=0,pv=1,jM=2,_S=1,ZM=2,Ma=3,ps=0,Kn=1,Ea=2,ba=0,ao=1,qd=2,mv=3,gv=4,KM=5,Ws=100,QM=101,JM=102,$M=103,tE=104,eE=200,nE=201,iE=202,aE=203,Yd=204,Wd=205,sE=206,rE=207,oE=208,lE=209,uE=210,cE=211,fE=212,hE=213,dE=214,jd=0,Zd=1,Kd=2,oo=3,Qd=4,Jd=5,$d=6,tp=7,vS=0,pE=1,mE=2,Aa=0,gE=1,_E=2,vE=3,SE=4,xE=5,yE=6,ME=7,SS=300,lo=301,uo=302,ep=303,np=304,wc=306,ip=1e3,Zs=1001,ap=1002,Bi=1003,EE=1004,ju=1005,Ji=1006,dd=1007,Ks=1008,wa=1009,xS=1010,yS=1011,ml=1012,Hp=1013,Qs=1014,Ta=1015,ta=1016,Gp=1017,Vp=1018,gl=1020,MS=35902,ES=35899,TS=1021,bS=1022,zi=1023,_l=1026,vl=1027,AS=1028,kp=1029,RS=1030,Xp=1031,qp=1033,_c=33776,vc=33777,Sc=33778,xc=33779,sp=35840,rp=35841,op=35842,lp=35843,up=36196,cp=37492,fp=37496,hp=37808,dp=37809,pp=37810,mp=37811,gp=37812,_p=37813,vp=37814,Sp=37815,xp=37816,yp=37817,Mp=37818,Ep=37819,Tp=37820,bp=37821,Ap=36492,Rp=36494,Cp=36495,wp=36283,Dp=36284,Up=36285,Np=36286,TE=3200,bE=3201,AE=0,RE=1,ds="",yi="srgb",ms="srgb-linear",bc="linear",ke="srgb",Hr=7680,_v=519,CE=512,wE=513,DE=514,CS=515,UE=516,NE=517,LE=518,OE=519,vv=35044,Sv="300 es",$i=2e3,Ac=2001;class $s{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(i)===-1&&r[e].push(i)}hasEventListener(e,i){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(i)!==-1}removeEventListener(e,i){const r=this._listeners;if(r===void 0)return;const u=r[e];if(u!==void 0){const f=u.indexOf(i);f!==-1&&u.splice(f,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const r=i[e.type];if(r!==void 0){e.target=this;const u=r.slice(0);for(let f=0,h=u.length;f<h;f++)u[f].call(this,e);e.target=null}}}const Ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],yc=Math.PI/180,Lp=180/Math.PI;function xl(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Ln[o&255]+Ln[o>>8&255]+Ln[o>>16&255]+Ln[o>>24&255]+"-"+Ln[e&255]+Ln[e>>8&255]+"-"+Ln[e>>16&15|64]+Ln[e>>24&255]+"-"+Ln[i&63|128]+Ln[i>>8&255]+"-"+Ln[i>>16&255]+Ln[i>>24&255]+Ln[r&255]+Ln[r>>8&255]+Ln[r>>16&255]+Ln[r>>24&255]).toLowerCase()}function ye(o,e,i){return Math.max(e,Math.min(i,o))}function PE(o,e){return(o%e+e)%e}function pd(o,e,i){return(1-i)*o+i*e}function ol(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function jn(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}const zE={DEG2RAD:yc};class ne{constructor(e=0,i=0){ne.prototype.isVector2=!0,this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,r=this.y,u=e.elements;return this.x=u[0]*i+u[3]*r+u[6],this.y=u[1]*i+u[4]*r+u[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=ye(this.x,e.x,i.x),this.y=ye(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=ye(this.x,e,i),this.y=ye(this.y,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(ye(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(ye(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y;return i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const r=Math.cos(i),u=Math.sin(i),f=this.x-e.x,h=this.y-e.y;return this.x=f*r-h*u+e.x,this.y=f*u+h*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Js{constructor(e=0,i=0,r=0,u=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=r,this._w=u}static slerpFlat(e,i,r,u,f,h,d){let m=r[u+0],g=r[u+1],v=r[u+2],_=r[u+3];const x=f[h+0],M=f[h+1],A=f[h+2],C=f[h+3];if(d===0){e[i+0]=m,e[i+1]=g,e[i+2]=v,e[i+3]=_;return}if(d===1){e[i+0]=x,e[i+1]=M,e[i+2]=A,e[i+3]=C;return}if(_!==C||m!==x||g!==M||v!==A){let y=1-d;const S=m*x+g*M+v*A+_*C,I=S>=0?1:-1,z=1-S*S;if(z>Number.EPSILON){const V=Math.sqrt(z),H=Math.atan2(V,S*I);y=Math.sin(y*H)/V,d=Math.sin(d*H)/V}const U=d*I;if(m=m*y+x*U,g=g*y+M*U,v=v*y+A*U,_=_*y+C*U,y===1-d){const V=1/Math.sqrt(m*m+g*g+v*v+_*_);m*=V,g*=V,v*=V,_*=V}}e[i]=m,e[i+1]=g,e[i+2]=v,e[i+3]=_}static multiplyQuaternionsFlat(e,i,r,u,f,h){const d=r[u],m=r[u+1],g=r[u+2],v=r[u+3],_=f[h],x=f[h+1],M=f[h+2],A=f[h+3];return e[i]=d*A+v*_+m*M-g*x,e[i+1]=m*A+v*x+g*_-d*M,e[i+2]=g*A+v*M+d*x-m*_,e[i+3]=v*A-d*_-m*x-g*M,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,r,u){return this._x=e,this._y=i,this._z=r,this._w=u,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const r=e._x,u=e._y,f=e._z,h=e._order,d=Math.cos,m=Math.sin,g=d(r/2),v=d(u/2),_=d(f/2),x=m(r/2),M=m(u/2),A=m(f/2);switch(h){case"XYZ":this._x=x*v*_+g*M*A,this._y=g*M*_-x*v*A,this._z=g*v*A+x*M*_,this._w=g*v*_-x*M*A;break;case"YXZ":this._x=x*v*_+g*M*A,this._y=g*M*_-x*v*A,this._z=g*v*A-x*M*_,this._w=g*v*_+x*M*A;break;case"ZXY":this._x=x*v*_-g*M*A,this._y=g*M*_+x*v*A,this._z=g*v*A+x*M*_,this._w=g*v*_-x*M*A;break;case"ZYX":this._x=x*v*_-g*M*A,this._y=g*M*_+x*v*A,this._z=g*v*A-x*M*_,this._w=g*v*_+x*M*A;break;case"YZX":this._x=x*v*_+g*M*A,this._y=g*M*_+x*v*A,this._z=g*v*A-x*M*_,this._w=g*v*_-x*M*A;break;case"XZY":this._x=x*v*_-g*M*A,this._y=g*M*_-x*v*A,this._z=g*v*A+x*M*_,this._w=g*v*_+x*M*A;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const r=i/2,u=Math.sin(r);return this._x=e.x*u,this._y=e.y*u,this._z=e.z*u,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,r=i[0],u=i[4],f=i[8],h=i[1],d=i[5],m=i[9],g=i[2],v=i[6],_=i[10],x=r+d+_;if(x>0){const M=.5/Math.sqrt(x+1);this._w=.25/M,this._x=(v-m)*M,this._y=(f-g)*M,this._z=(h-u)*M}else if(r>d&&r>_){const M=2*Math.sqrt(1+r-d-_);this._w=(v-m)/M,this._x=.25*M,this._y=(u+h)/M,this._z=(f+g)/M}else if(d>_){const M=2*Math.sqrt(1+d-r-_);this._w=(f-g)/M,this._x=(u+h)/M,this._y=.25*M,this._z=(m+v)/M}else{const M=2*Math.sqrt(1+_-r-d);this._w=(h-u)/M,this._x=(f+g)/M,this._y=(m+v)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let r=e.dot(i)+1;return r<1e-8?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ye(this.dot(e),-1,1)))}rotateTowards(e,i){const r=this.angleTo(e);if(r===0)return this;const u=Math.min(1,i/r);return this.slerp(e,u),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const r=e._x,u=e._y,f=e._z,h=e._w,d=i._x,m=i._y,g=i._z,v=i._w;return this._x=r*v+h*d+u*g-f*m,this._y=u*v+h*m+f*d-r*g,this._z=f*v+h*g+r*m-u*d,this._w=h*v-r*d-u*m-f*g,this._onChangeCallback(),this}slerp(e,i){if(i===0)return this;if(i===1)return this.copy(e);const r=this._x,u=this._y,f=this._z,h=this._w;let d=h*e._w+r*e._x+u*e._y+f*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=h,this._x=r,this._y=u,this._z=f,this;const m=1-d*d;if(m<=Number.EPSILON){const M=1-i;return this._w=M*h+i*this._w,this._x=M*r+i*this._x,this._y=M*u+i*this._y,this._z=M*f+i*this._z,this.normalize(),this}const g=Math.sqrt(m),v=Math.atan2(g,d),_=Math.sin((1-i)*v)/g,x=Math.sin(i*v)/g;return this._w=h*_+this._w*x,this._x=r*_+this._x*x,this._y=u*_+this._y*x,this._z=f*_+this._z*x,this._onChangeCallback(),this}slerpQuaternions(e,i,r){return this.copy(e).slerp(i,r)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),r=Math.random(),u=Math.sqrt(1-r),f=Math.sqrt(r);return this.set(u*Math.sin(e),u*Math.cos(e),f*Math.sin(i),f*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class et{constructor(e=0,i=0,r=0){et.prototype.isVector3=!0,this.x=e,this.y=i,this.z=r}set(e,i,r){return r===void 0&&(r=this.z),this.x=e,this.y=i,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(xv.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(xv.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,r=this.y,u=this.z,f=e.elements;return this.x=f[0]*i+f[3]*r+f[6]*u,this.y=f[1]*i+f[4]*r+f[7]*u,this.z=f[2]*i+f[5]*r+f[8]*u,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,r=this.y,u=this.z,f=e.elements,h=1/(f[3]*i+f[7]*r+f[11]*u+f[15]);return this.x=(f[0]*i+f[4]*r+f[8]*u+f[12])*h,this.y=(f[1]*i+f[5]*r+f[9]*u+f[13])*h,this.z=(f[2]*i+f[6]*r+f[10]*u+f[14])*h,this}applyQuaternion(e){const i=this.x,r=this.y,u=this.z,f=e.x,h=e.y,d=e.z,m=e.w,g=2*(h*u-d*r),v=2*(d*i-f*u),_=2*(f*r-h*i);return this.x=i+m*g+h*_-d*v,this.y=r+m*v+d*g-f*_,this.z=u+m*_+f*v-h*g,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,r=this.y,u=this.z,f=e.elements;return this.x=f[0]*i+f[4]*r+f[8]*u,this.y=f[1]*i+f[5]*r+f[9]*u,this.z=f[2]*i+f[6]*r+f[10]*u,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=ye(this.x,e.x,i.x),this.y=ye(this.y,e.y,i.y),this.z=ye(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=ye(this.x,e,i),this.y=ye(this.y,e,i),this.z=ye(this.z,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(ye(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const r=e.x,u=e.y,f=e.z,h=i.x,d=i.y,m=i.z;return this.x=u*m-f*d,this.y=f*h-r*m,this.z=r*d-u*h,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const r=e.dot(this)/i;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return md.copy(this).projectOnVector(e),this.sub(md)}reflect(e){return this.sub(md.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(ye(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y,u=this.z-e.z;return i*i+r*r+u*u}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,r){const u=Math.sin(i)*e;return this.x=u*Math.sin(r),this.y=Math.cos(i)*e,this.z=u*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,r){return this.x=e*Math.sin(i),this.y=r,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),u=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=r,this.z=u,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(e),this.y=i,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const md=new et,xv=new Js;class pe{constructor(e,i,r,u,f,h,d,m,g){pe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,r,u,f,h,d,m,g)}set(e,i,r,u,f,h,d,m,g){const v=this.elements;return v[0]=e,v[1]=u,v[2]=d,v[3]=i,v[4]=f,v[5]=m,v[6]=r,v[7]=h,v[8]=g,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(e,i,r){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,u=i.elements,f=this.elements,h=r[0],d=r[3],m=r[6],g=r[1],v=r[4],_=r[7],x=r[2],M=r[5],A=r[8],C=u[0],y=u[3],S=u[6],I=u[1],z=u[4],U=u[7],V=u[2],H=u[5],O=u[8];return f[0]=h*C+d*I+m*V,f[3]=h*y+d*z+m*H,f[6]=h*S+d*U+m*O,f[1]=g*C+v*I+_*V,f[4]=g*y+v*z+_*H,f[7]=g*S+v*U+_*O,f[2]=x*C+M*I+A*V,f[5]=x*y+M*z+A*H,f[8]=x*S+M*U+A*O,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[1],u=e[2],f=e[3],h=e[4],d=e[5],m=e[6],g=e[7],v=e[8];return i*h*v-i*d*g-r*f*v+r*d*m+u*f*g-u*h*m}invert(){const e=this.elements,i=e[0],r=e[1],u=e[2],f=e[3],h=e[4],d=e[5],m=e[6],g=e[7],v=e[8],_=v*h-d*g,x=d*m-v*f,M=g*f-h*m,A=i*_+r*x+u*M;if(A===0)return this.set(0,0,0,0,0,0,0,0,0);const C=1/A;return e[0]=_*C,e[1]=(u*g-v*r)*C,e[2]=(d*r-u*h)*C,e[3]=x*C,e[4]=(v*i-u*m)*C,e[5]=(u*f-d*i)*C,e[6]=M*C,e[7]=(r*m-g*i)*C,e[8]=(h*i-r*f)*C,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,r,u,f,h,d){const m=Math.cos(f),g=Math.sin(f);return this.set(r*m,r*g,-r*(m*h+g*d)+h+e,-u*g,u*m,-u*(-g*h+m*d)+d+i,0,0,1),this}scale(e,i){return this.premultiply(gd.makeScale(e,i)),this}rotate(e){return this.premultiply(gd.makeRotation(-e)),this}translate(e,i){return this.premultiply(gd.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,r=e.elements;for(let u=0;u<9;u++)if(i[u]!==r[u])return!1;return!0}fromArray(e,i=0){for(let r=0;r<9;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const gd=new pe;function wS(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function Rc(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function IE(){const o=Rc("canvas");return o.style.display="block",o}const yv={};function Sl(o){o in yv||(yv[o]=!0,console.warn(o))}function BE(o,e,i){return new Promise(function(r,u){function f(){switch(o.clientWaitSync(e,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:u();break;case o.TIMEOUT_EXPIRED:setTimeout(f,i);break;default:r()}}setTimeout(f,i)})}const Mv=new pe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ev=new pe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function FE(){const o={enabled:!0,workingColorSpace:ms,spaces:{},convert:function(u,f,h){return this.enabled===!1||f===h||!f||!h||(this.spaces[f].transfer===ke&&(u.r=Ra(u.r),u.g=Ra(u.g),u.b=Ra(u.b)),this.spaces[f].primaries!==this.spaces[h].primaries&&(u.applyMatrix3(this.spaces[f].toXYZ),u.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===ke&&(u.r=so(u.r),u.g=so(u.g),u.b=so(u.b))),u},workingToColorSpace:function(u,f){return this.convert(u,this.workingColorSpace,f)},colorSpaceToWorking:function(u,f){return this.convert(u,f,this.workingColorSpace)},getPrimaries:function(u){return this.spaces[u].primaries},getTransfer:function(u){return u===ds?bc:this.spaces[u].transfer},getToneMappingMode:function(u){return this.spaces[u].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(u,f=this.workingColorSpace){return u.fromArray(this.spaces[f].luminanceCoefficients)},define:function(u){Object.assign(this.spaces,u)},_getMatrix:function(u,f,h){return u.copy(this.spaces[f].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(u){return this.spaces[u].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(u=this.workingColorSpace){return this.spaces[u].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(u,f){return Sl("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),o.workingToColorSpace(u,f)},toWorkingColorSpace:function(u,f){return Sl("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),o.colorSpaceToWorking(u,f)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return o.define({[ms]:{primaries:e,whitePoint:r,transfer:bc,toXYZ:Mv,fromXYZ:Ev,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:yi},outputColorSpaceConfig:{drawingBufferColorSpace:yi}},[yi]:{primaries:e,whitePoint:r,transfer:ke,toXYZ:Mv,fromXYZ:Ev,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:yi}}}),o}const De=FE();function Ra(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function so(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let Gr;class HE{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let r;if(e instanceof HTMLCanvasElement)r=e;else{Gr===void 0&&(Gr=Rc("canvas")),Gr.width=e.width,Gr.height=e.height;const u=Gr.getContext("2d");e instanceof ImageData?u.putImageData(e,0,0):u.drawImage(e,0,0,e.width,e.height),r=Gr}return r.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=Rc("canvas");i.width=e.width,i.height=e.height;const r=i.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const u=r.getImageData(0,0,e.width,e.height),f=u.data;for(let h=0;h<f.length;h++)f[h]=Ra(f[h]/255)*255;return r.putImageData(u,0,0),i}else if(e.data){const i=e.data.slice(0);for(let r=0;r<i.length;r++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[r]=Math.floor(Ra(i[r]/255)*255):i[r]=Ra(i[r]);return{data:i,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let GE=0;class Yp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:GE++}),this.uuid=xl(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):i instanceof VideoFrame?e.set(i.displayHeight,i.displayWidth,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},u=this.data;if(u!==null){let f;if(Array.isArray(u)){f=[];for(let h=0,d=u.length;h<d;h++)u[h].isDataTexture?f.push(_d(u[h].image)):f.push(_d(u[h]))}else f=_d(u);r.url=f}return i||(e.images[this.uuid]=r),r}}function _d(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?HE.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let VE=0;const vd=new et;class Qn extends $s{constructor(e=Qn.DEFAULT_IMAGE,i=Qn.DEFAULT_MAPPING,r=Zs,u=Zs,f=Ji,h=Ks,d=zi,m=wa,g=Qn.DEFAULT_ANISOTROPY,v=ds){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:VE++}),this.uuid=xl(),this.name="",this.source=new Yp(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=u,this.magFilter=f,this.minFilter=h,this.anisotropy=g,this.format=d,this.internalFormat=null,this.type=m,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new pe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(vd).x}get height(){return this.source.getSize(vd).y}get depth(){return this.source.getSize(vd).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const r=e[i];if(r===void 0){console.warn(`THREE.Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const u=this[i];if(u===void 0){console.warn(`THREE.Texture.setValues(): property '${i}' does not exist.`);continue}u&&r&&u.isVector2&&r.isVector2||u&&r&&u.isVector3&&r.isVector3||u&&r&&u.isMatrix3&&r.isMatrix3?u.copy(r):this[i]=r}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==SS)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ip:e.x=e.x-Math.floor(e.x);break;case Zs:e.x=e.x<0?0:1;break;case ap:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ip:e.y=e.y-Math.floor(e.y);break;case Zs:e.y=e.y<0?0:1;break;case ap:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Qn.DEFAULT_IMAGE=null;Qn.DEFAULT_MAPPING=SS;Qn.DEFAULT_ANISOTROPY=1;class rn{constructor(e=0,i=0,r=0,u=1){rn.prototype.isVector4=!0,this.x=e,this.y=i,this.z=r,this.w=u}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,r,u){return this.x=e,this.y=i,this.z=r,this.w=u,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,r=this.y,u=this.z,f=this.w,h=e.elements;return this.x=h[0]*i+h[4]*r+h[8]*u+h[12]*f,this.y=h[1]*i+h[5]*r+h[9]*u+h[13]*f,this.z=h[2]*i+h[6]*r+h[10]*u+h[14]*f,this.w=h[3]*i+h[7]*r+h[11]*u+h[15]*f,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,r,u,f;const m=e.elements,g=m[0],v=m[4],_=m[8],x=m[1],M=m[5],A=m[9],C=m[2],y=m[6],S=m[10];if(Math.abs(v-x)<.01&&Math.abs(_-C)<.01&&Math.abs(A-y)<.01){if(Math.abs(v+x)<.1&&Math.abs(_+C)<.1&&Math.abs(A+y)<.1&&Math.abs(g+M+S-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const z=(g+1)/2,U=(M+1)/2,V=(S+1)/2,H=(v+x)/4,O=(_+C)/4,q=(A+y)/4;return z>U&&z>V?z<.01?(r=0,u=.707106781,f=.707106781):(r=Math.sqrt(z),u=H/r,f=O/r):U>V?U<.01?(r=.707106781,u=0,f=.707106781):(u=Math.sqrt(U),r=H/u,f=q/u):V<.01?(r=.707106781,u=.707106781,f=0):(f=Math.sqrt(V),r=O/f,u=q/f),this.set(r,u,f,i),this}let I=Math.sqrt((y-A)*(y-A)+(_-C)*(_-C)+(x-v)*(x-v));return Math.abs(I)<.001&&(I=1),this.x=(y-A)/I,this.y=(_-C)/I,this.z=(x-v)/I,this.w=Math.acos((g+M+S-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=ye(this.x,e.x,i.x),this.y=ye(this.y,e.y,i.y),this.z=ye(this.z,e.z,i.z),this.w=ye(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=ye(this.x,e,i),this.y=ye(this.y,e,i),this.z=ye(this.z,e,i),this.w=ye(this.w,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(ye(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this.w=e.w+(i.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class kE extends $s{constructor(e=1,i=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ji,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},r),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=r.depth,this.scissor=new rn(0,0,e,i),this.scissorTest=!1,this.viewport=new rn(0,0,e,i);const u={width:e,height:i,depth:r.depth},f=new Qn(u);this.textures=[];const h=r.count;for(let d=0;d<h;d++)this.textures[d]=f.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview}_setTextureOptions(e={}){const i={minFilter:Ji,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,r=1){if(this.width!==e||this.height!==i||this.depth!==r){this.width=e,this.height=i,this.depth=r;for(let u=0,f=this.textures.length;u<f;u++)this.textures[u].image.width=e,this.textures[u].image.height=i,this.textures[u].image.depth=r,this.textures[u].isArrayTexture=this.textures[u].image.depth>1;this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const u=Object.assign({},e.textures[i].image);this.textures[i].source=new Yp(u)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ei extends kE{constructor(e=1,i=1,r={}){super(e,i,r),this.isWebGLRenderTarget=!0}}class DS extends Qn{constructor(e=null,i=1,r=1,u=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:r,depth:u},this.magFilter=Bi,this.minFilter=Bi,this.wrapR=Zs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class XE extends Qn{constructor(e=null,i=1,r=1,u=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:r,depth:u},this.magFilter=Bi,this.minFilter=Bi,this.wrapR=Zs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yl{constructor(e=new et(1/0,1/0,1/0),i=new et(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i+=3)this.expandByPoint(Ui.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,r=e.count;i<r;i++)this.expandByPoint(Ui.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const r=Ui.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const f=r.getAttribute("position");if(i===!0&&f!==void 0&&e.isInstancedMesh!==!0)for(let h=0,d=f.count;h<d;h++)e.isMesh===!0?e.getVertexPosition(h,Ui):Ui.fromBufferAttribute(f,h),Ui.applyMatrix4(e.matrixWorld),this.expandByPoint(Ui);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Zu.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Zu.copy(r.boundingBox)),Zu.applyMatrix4(e.matrixWorld),this.union(Zu)}const u=e.children;for(let f=0,h=u.length;f<h;f++)this.expandByObject(u[f],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ui),Ui.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,r;return e.normal.x>0?(i=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),i<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ll),Ku.subVectors(this.max,ll),Vr.subVectors(e.a,ll),kr.subVectors(e.b,ll),Xr.subVectors(e.c,ll),rs.subVectors(kr,Vr),os.subVectors(Xr,kr),Hs.subVectors(Vr,Xr);let i=[0,-rs.z,rs.y,0,-os.z,os.y,0,-Hs.z,Hs.y,rs.z,0,-rs.x,os.z,0,-os.x,Hs.z,0,-Hs.x,-rs.y,rs.x,0,-os.y,os.x,0,-Hs.y,Hs.x,0];return!Sd(i,Vr,kr,Xr,Ku)||(i=[1,0,0,0,1,0,0,0,1],!Sd(i,Vr,kr,Xr,Ku))?!1:(Qu.crossVectors(rs,os),i=[Qu.x,Qu.y,Qu.z],Sd(i,Vr,kr,Xr,Ku))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ui).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ui).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_a[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_a[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_a[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_a[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_a[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_a[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_a[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_a[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_a),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const _a=[new et,new et,new et,new et,new et,new et,new et,new et],Ui=new et,Zu=new yl,Vr=new et,kr=new et,Xr=new et,rs=new et,os=new et,Hs=new et,ll=new et,Ku=new et,Qu=new et,Gs=new et;function Sd(o,e,i,r,u){for(let f=0,h=o.length-3;f<=h;f+=3){Gs.fromArray(o,f);const d=u.x*Math.abs(Gs.x)+u.y*Math.abs(Gs.y)+u.z*Math.abs(Gs.z),m=e.dot(Gs),g=i.dot(Gs),v=r.dot(Gs);if(Math.max(-Math.max(m,g,v),Math.min(m,g,v))>d)return!1}return!0}const qE=new yl,ul=new et,xd=new et;class Wp{constructor(e=new et,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const r=this.center;i!==void 0?r.copy(i):qE.setFromPoints(e).getCenter(r);let u=0;for(let f=0,h=e.length;f<h;f++)u=Math.max(u,r.distanceToSquared(e[f]));return this.radius=Math.sqrt(u),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const r=this.center.distanceToSquared(e);return i.copy(e),r>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ul.subVectors(e,this.center);const i=ul.lengthSq();if(i>this.radius*this.radius){const r=Math.sqrt(i),u=(r-this.radius)*.5;this.center.addScaledVector(ul,u/r),this.radius+=u}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ul.copy(e.center).add(xd)),this.expandByPoint(ul.copy(e.center).sub(xd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const va=new et,yd=new et,Ju=new et,ls=new et,Md=new et,$u=new et,Ed=new et;class US{constructor(e=new et,i=new et(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,va)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const r=i.dot(this.direction);return r<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=va.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(va.copy(this.origin).addScaledVector(this.direction,i),va.distanceToSquared(e))}distanceSqToSegment(e,i,r,u){yd.copy(e).add(i).multiplyScalar(.5),Ju.copy(i).sub(e).normalize(),ls.copy(this.origin).sub(yd);const f=e.distanceTo(i)*.5,h=-this.direction.dot(Ju),d=ls.dot(this.direction),m=-ls.dot(Ju),g=ls.lengthSq(),v=Math.abs(1-h*h);let _,x,M,A;if(v>0)if(_=h*m-d,x=h*d-m,A=f*v,_>=0)if(x>=-A)if(x<=A){const C=1/v;_*=C,x*=C,M=_*(_+h*x+2*d)+x*(h*_+x+2*m)+g}else x=f,_=Math.max(0,-(h*x+d)),M=-_*_+x*(x+2*m)+g;else x=-f,_=Math.max(0,-(h*x+d)),M=-_*_+x*(x+2*m)+g;else x<=-A?(_=Math.max(0,-(-h*f+d)),x=_>0?-f:Math.min(Math.max(-f,-m),f),M=-_*_+x*(x+2*m)+g):x<=A?(_=0,x=Math.min(Math.max(-f,-m),f),M=x*(x+2*m)+g):(_=Math.max(0,-(h*f+d)),x=_>0?f:Math.min(Math.max(-f,-m),f),M=-_*_+x*(x+2*m)+g);else x=h>0?-f:f,_=Math.max(0,-(h*x+d)),M=-_*_+x*(x+2*m)+g;return r&&r.copy(this.origin).addScaledVector(this.direction,_),u&&u.copy(yd).addScaledVector(Ju,x),M}intersectSphere(e,i){va.subVectors(e.center,this.origin);const r=va.dot(this.direction),u=va.dot(va)-r*r,f=e.radius*e.radius;if(u>f)return null;const h=Math.sqrt(f-u),d=r-h,m=r+h;return m<0?null:d<0?this.at(m,i):this.at(d,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/i;return r>=0?r:null}intersectPlane(e,i){const r=this.distanceToPlane(e);return r===null?null:this.at(r,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let r,u,f,h,d,m;const g=1/this.direction.x,v=1/this.direction.y,_=1/this.direction.z,x=this.origin;return g>=0?(r=(e.min.x-x.x)*g,u=(e.max.x-x.x)*g):(r=(e.max.x-x.x)*g,u=(e.min.x-x.x)*g),v>=0?(f=(e.min.y-x.y)*v,h=(e.max.y-x.y)*v):(f=(e.max.y-x.y)*v,h=(e.min.y-x.y)*v),r>h||f>u||((f>r||isNaN(r))&&(r=f),(h<u||isNaN(u))&&(u=h),_>=0?(d=(e.min.z-x.z)*_,m=(e.max.z-x.z)*_):(d=(e.max.z-x.z)*_,m=(e.min.z-x.z)*_),r>m||d>u)||((d>r||r!==r)&&(r=d),(m<u||u!==u)&&(u=m),u<0)?null:this.at(r>=0?r:u,i)}intersectsBox(e){return this.intersectBox(e,va)!==null}intersectTriangle(e,i,r,u,f){Md.subVectors(i,e),$u.subVectors(r,e),Ed.crossVectors(Md,$u);let h=this.direction.dot(Ed),d;if(h>0){if(u)return null;d=1}else if(h<0)d=-1,h=-h;else return null;ls.subVectors(this.origin,e);const m=d*this.direction.dot($u.crossVectors(ls,$u));if(m<0)return null;const g=d*this.direction.dot(Md.cross(ls));if(g<0||m+g>h)return null;const v=-d*ls.dot(Ed);return v<0?null:this.at(v/h,f)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class _n{constructor(e,i,r,u,f,h,d,m,g,v,_,x,M,A,C,y){_n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,r,u,f,h,d,m,g,v,_,x,M,A,C,y)}set(e,i,r,u,f,h,d,m,g,v,_,x,M,A,C,y){const S=this.elements;return S[0]=e,S[4]=i,S[8]=r,S[12]=u,S[1]=f,S[5]=h,S[9]=d,S[13]=m,S[2]=g,S[6]=v,S[10]=_,S[14]=x,S[3]=M,S[7]=A,S[11]=C,S[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _n().fromArray(this.elements)}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(e){const i=this.elements,r=e.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,r){return e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,i,r){return this.set(e.x,i.x,r.x,0,e.y,i.y,r.y,0,e.z,i.z,r.z,0,0,0,0,1),this}extractRotation(e){const i=this.elements,r=e.elements,u=1/qr.setFromMatrixColumn(e,0).length(),f=1/qr.setFromMatrixColumn(e,1).length(),h=1/qr.setFromMatrixColumn(e,2).length();return i[0]=r[0]*u,i[1]=r[1]*u,i[2]=r[2]*u,i[3]=0,i[4]=r[4]*f,i[5]=r[5]*f,i[6]=r[6]*f,i[7]=0,i[8]=r[8]*h,i[9]=r[9]*h,i[10]=r[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,r=e.x,u=e.y,f=e.z,h=Math.cos(r),d=Math.sin(r),m=Math.cos(u),g=Math.sin(u),v=Math.cos(f),_=Math.sin(f);if(e.order==="XYZ"){const x=h*v,M=h*_,A=d*v,C=d*_;i[0]=m*v,i[4]=-m*_,i[8]=g,i[1]=M+A*g,i[5]=x-C*g,i[9]=-d*m,i[2]=C-x*g,i[6]=A+M*g,i[10]=h*m}else if(e.order==="YXZ"){const x=m*v,M=m*_,A=g*v,C=g*_;i[0]=x+C*d,i[4]=A*d-M,i[8]=h*g,i[1]=h*_,i[5]=h*v,i[9]=-d,i[2]=M*d-A,i[6]=C+x*d,i[10]=h*m}else if(e.order==="ZXY"){const x=m*v,M=m*_,A=g*v,C=g*_;i[0]=x-C*d,i[4]=-h*_,i[8]=A+M*d,i[1]=M+A*d,i[5]=h*v,i[9]=C-x*d,i[2]=-h*g,i[6]=d,i[10]=h*m}else if(e.order==="ZYX"){const x=h*v,M=h*_,A=d*v,C=d*_;i[0]=m*v,i[4]=A*g-M,i[8]=x*g+C,i[1]=m*_,i[5]=C*g+x,i[9]=M*g-A,i[2]=-g,i[6]=d*m,i[10]=h*m}else if(e.order==="YZX"){const x=h*m,M=h*g,A=d*m,C=d*g;i[0]=m*v,i[4]=C-x*_,i[8]=A*_+M,i[1]=_,i[5]=h*v,i[9]=-d*v,i[2]=-g*v,i[6]=M*_+A,i[10]=x-C*_}else if(e.order==="XZY"){const x=h*m,M=h*g,A=d*m,C=d*g;i[0]=m*v,i[4]=-_,i[8]=g*v,i[1]=x*_+C,i[5]=h*v,i[9]=M*_-A,i[2]=A*_-M,i[6]=d*v,i[10]=C*_+x}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(YE,e,WE)}lookAt(e,i,r){const u=this.elements;return oi.subVectors(e,i),oi.lengthSq()===0&&(oi.z=1),oi.normalize(),us.crossVectors(r,oi),us.lengthSq()===0&&(Math.abs(r.z)===1?oi.x+=1e-4:oi.z+=1e-4,oi.normalize(),us.crossVectors(r,oi)),us.normalize(),tc.crossVectors(oi,us),u[0]=us.x,u[4]=tc.x,u[8]=oi.x,u[1]=us.y,u[5]=tc.y,u[9]=oi.y,u[2]=us.z,u[6]=tc.z,u[10]=oi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,u=i.elements,f=this.elements,h=r[0],d=r[4],m=r[8],g=r[12],v=r[1],_=r[5],x=r[9],M=r[13],A=r[2],C=r[6],y=r[10],S=r[14],I=r[3],z=r[7],U=r[11],V=r[15],H=u[0],O=u[4],q=u[8],w=u[12],R=u[1],G=u[5],at=u[9],ut=u[13],gt=u[2],lt=u[6],W=u[10],st=u[14],Z=u[3],_t=u[7],St=u[11],Gt=u[15];return f[0]=h*H+d*R+m*gt+g*Z,f[4]=h*O+d*G+m*lt+g*_t,f[8]=h*q+d*at+m*W+g*St,f[12]=h*w+d*ut+m*st+g*Gt,f[1]=v*H+_*R+x*gt+M*Z,f[5]=v*O+_*G+x*lt+M*_t,f[9]=v*q+_*at+x*W+M*St,f[13]=v*w+_*ut+x*st+M*Gt,f[2]=A*H+C*R+y*gt+S*Z,f[6]=A*O+C*G+y*lt+S*_t,f[10]=A*q+C*at+y*W+S*St,f[14]=A*w+C*ut+y*st+S*Gt,f[3]=I*H+z*R+U*gt+V*Z,f[7]=I*O+z*G+U*lt+V*_t,f[11]=I*q+z*at+U*W+V*St,f[15]=I*w+z*ut+U*st+V*Gt,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[4],u=e[8],f=e[12],h=e[1],d=e[5],m=e[9],g=e[13],v=e[2],_=e[6],x=e[10],M=e[14],A=e[3],C=e[7],y=e[11],S=e[15];return A*(+f*m*_-u*g*_-f*d*x+r*g*x+u*d*M-r*m*M)+C*(+i*m*M-i*g*x+f*h*x-u*h*M+u*g*v-f*m*v)+y*(+i*g*_-i*d*M-f*h*_+r*h*M+f*d*v-r*g*v)+S*(-u*d*v-i*m*_+i*d*x+u*h*_-r*h*x+r*m*v)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,r){const u=this.elements;return e.isVector3?(u[12]=e.x,u[13]=e.y,u[14]=e.z):(u[12]=e,u[13]=i,u[14]=r),this}invert(){const e=this.elements,i=e[0],r=e[1],u=e[2],f=e[3],h=e[4],d=e[5],m=e[6],g=e[7],v=e[8],_=e[9],x=e[10],M=e[11],A=e[12],C=e[13],y=e[14],S=e[15],I=_*y*g-C*x*g+C*m*M-d*y*M-_*m*S+d*x*S,z=A*x*g-v*y*g-A*m*M+h*y*M+v*m*S-h*x*S,U=v*C*g-A*_*g+A*d*M-h*C*M-v*d*S+h*_*S,V=A*_*m-v*C*m-A*d*x+h*C*x+v*d*y-h*_*y,H=i*I+r*z+u*U+f*V;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/H;return e[0]=I*O,e[1]=(C*x*f-_*y*f-C*u*M+r*y*M+_*u*S-r*x*S)*O,e[2]=(d*y*f-C*m*f+C*u*g-r*y*g-d*u*S+r*m*S)*O,e[3]=(_*m*f-d*x*f-_*u*g+r*x*g+d*u*M-r*m*M)*O,e[4]=z*O,e[5]=(v*y*f-A*x*f+A*u*M-i*y*M-v*u*S+i*x*S)*O,e[6]=(A*m*f-h*y*f-A*u*g+i*y*g+h*u*S-i*m*S)*O,e[7]=(h*x*f-v*m*f+v*u*g-i*x*g-h*u*M+i*m*M)*O,e[8]=U*O,e[9]=(A*_*f-v*C*f-A*r*M+i*C*M+v*r*S-i*_*S)*O,e[10]=(h*C*f-A*d*f+A*r*g-i*C*g-h*r*S+i*d*S)*O,e[11]=(v*d*f-h*_*f-v*r*g+i*_*g+h*r*M-i*d*M)*O,e[12]=V*O,e[13]=(v*C*u-A*_*u+A*r*x-i*C*x-v*r*y+i*_*y)*O,e[14]=(A*d*u-h*C*u-A*r*m+i*C*m+h*r*y-i*d*y)*O,e[15]=(h*_*u-v*d*u+v*r*m-i*_*m-h*r*x+i*d*x)*O,this}scale(e){const i=this.elements,r=e.x,u=e.y,f=e.z;return i[0]*=r,i[4]*=u,i[8]*=f,i[1]*=r,i[5]*=u,i[9]*=f,i[2]*=r,i[6]*=u,i[10]*=f,i[3]*=r,i[7]*=u,i[11]*=f,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],u=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,r,u))}makeTranslation(e,i,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const r=Math.cos(i),u=Math.sin(i),f=1-r,h=e.x,d=e.y,m=e.z,g=f*h,v=f*d;return this.set(g*h+r,g*d-u*m,g*m+u*d,0,g*d+u*m,v*d+r,v*m-u*h,0,g*m-u*d,v*m+u*h,f*m*m+r,0,0,0,0,1),this}makeScale(e,i,r){return this.set(e,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,i,r,u,f,h){return this.set(1,r,f,0,e,1,h,0,i,u,1,0,0,0,0,1),this}compose(e,i,r){const u=this.elements,f=i._x,h=i._y,d=i._z,m=i._w,g=f+f,v=h+h,_=d+d,x=f*g,M=f*v,A=f*_,C=h*v,y=h*_,S=d*_,I=m*g,z=m*v,U=m*_,V=r.x,H=r.y,O=r.z;return u[0]=(1-(C+S))*V,u[1]=(M+U)*V,u[2]=(A-z)*V,u[3]=0,u[4]=(M-U)*H,u[5]=(1-(x+S))*H,u[6]=(y+I)*H,u[7]=0,u[8]=(A+z)*O,u[9]=(y-I)*O,u[10]=(1-(x+C))*O,u[11]=0,u[12]=e.x,u[13]=e.y,u[14]=e.z,u[15]=1,this}decompose(e,i,r){const u=this.elements;let f=qr.set(u[0],u[1],u[2]).length();const h=qr.set(u[4],u[5],u[6]).length(),d=qr.set(u[8],u[9],u[10]).length();this.determinant()<0&&(f=-f),e.x=u[12],e.y=u[13],e.z=u[14],Ni.copy(this);const g=1/f,v=1/h,_=1/d;return Ni.elements[0]*=g,Ni.elements[1]*=g,Ni.elements[2]*=g,Ni.elements[4]*=v,Ni.elements[5]*=v,Ni.elements[6]*=v,Ni.elements[8]*=_,Ni.elements[9]*=_,Ni.elements[10]*=_,i.setFromRotationMatrix(Ni),r.x=f,r.y=h,r.z=d,this}makePerspective(e,i,r,u,f,h,d=$i,m=!1){const g=this.elements,v=2*f/(i-e),_=2*f/(r-u),x=(i+e)/(i-e),M=(r+u)/(r-u);let A,C;if(m)A=f/(h-f),C=h*f/(h-f);else if(d===$i)A=-(h+f)/(h-f),C=-2*h*f/(h-f);else if(d===Ac)A=-h/(h-f),C=-h*f/(h-f);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return g[0]=v,g[4]=0,g[8]=x,g[12]=0,g[1]=0,g[5]=_,g[9]=M,g[13]=0,g[2]=0,g[6]=0,g[10]=A,g[14]=C,g[3]=0,g[7]=0,g[11]=-1,g[15]=0,this}makeOrthographic(e,i,r,u,f,h,d=$i,m=!1){const g=this.elements,v=2/(i-e),_=2/(r-u),x=-(i+e)/(i-e),M=-(r+u)/(r-u);let A,C;if(m)A=1/(h-f),C=h/(h-f);else if(d===$i)A=-2/(h-f),C=-(h+f)/(h-f);else if(d===Ac)A=-1/(h-f),C=-f/(h-f);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return g[0]=v,g[4]=0,g[8]=0,g[12]=x,g[1]=0,g[5]=_,g[9]=0,g[13]=M,g[2]=0,g[6]=0,g[10]=A,g[14]=C,g[3]=0,g[7]=0,g[11]=0,g[15]=1,this}equals(e){const i=this.elements,r=e.elements;for(let u=0;u<16;u++)if(i[u]!==r[u])return!1;return!0}fromArray(e,i=0){for(let r=0;r<16;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e[i+9]=r[9],e[i+10]=r[10],e[i+11]=r[11],e[i+12]=r[12],e[i+13]=r[13],e[i+14]=r[14],e[i+15]=r[15],e}}const qr=new et,Ni=new _n,YE=new et(0,0,0),WE=new et(1,1,1),us=new et,tc=new et,oi=new et,Tv=new _n,bv=new Js;class Da{constructor(e=0,i=0,r=0,u=Da.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=r,this._order=u}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,r,u=this._order){return this._x=e,this._y=i,this._z=r,this._order=u,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,r=!0){const u=e.elements,f=u[0],h=u[4],d=u[8],m=u[1],g=u[5],v=u[9],_=u[2],x=u[6],M=u[10];switch(i){case"XYZ":this._y=Math.asin(ye(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-v,M),this._z=Math.atan2(-h,f)):(this._x=Math.atan2(x,g),this._z=0);break;case"YXZ":this._x=Math.asin(-ye(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(d,M),this._z=Math.atan2(m,g)):(this._y=Math.atan2(-_,f),this._z=0);break;case"ZXY":this._x=Math.asin(ye(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-_,M),this._z=Math.atan2(-h,g)):(this._y=0,this._z=Math.atan2(m,f));break;case"ZYX":this._y=Math.asin(-ye(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(x,M),this._z=Math.atan2(m,f)):(this._x=0,this._z=Math.atan2(-h,g));break;case"YZX":this._z=Math.asin(ye(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-v,g),this._y=Math.atan2(-_,f)):(this._x=0,this._y=Math.atan2(d,M));break;case"XZY":this._z=Math.asin(-ye(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(x,g),this._y=Math.atan2(d,f)):(this._x=Math.atan2(-v,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,r){return Tv.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Tv,i,r)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return bv.setFromEuler(this),this.setFromQuaternion(bv,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Da.DEFAULT_ORDER="XYZ";class NS{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let jE=0;const Av=new et,Yr=new Js,Sa=new _n,ec=new et,cl=new et,ZE=new et,KE=new Js,Rv=new et(1,0,0),Cv=new et(0,1,0),wv=new et(0,0,1),Dv={type:"added"},QE={type:"removed"},Wr={type:"childadded",child:null},Td={type:"childremoved",child:null};class ui extends $s{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jE++}),this.uuid=xl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ui.DEFAULT_UP.clone();const e=new et,i=new Da,r=new Js,u=new et(1,1,1);function f(){r.setFromEuler(i,!1)}function h(){i.setFromQuaternion(r,void 0,!1)}i._onChange(f),r._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:u},modelViewMatrix:{value:new _n},normalMatrix:{value:new pe}}),this.matrix=new _n,this.matrixWorld=new _n,this.matrixAutoUpdate=ui.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ui.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new NS,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return Yr.setFromAxisAngle(e,i),this.quaternion.multiply(Yr),this}rotateOnWorldAxis(e,i){return Yr.setFromAxisAngle(e,i),this.quaternion.premultiply(Yr),this}rotateX(e){return this.rotateOnAxis(Rv,e)}rotateY(e){return this.rotateOnAxis(Cv,e)}rotateZ(e){return this.rotateOnAxis(wv,e)}translateOnAxis(e,i){return Av.copy(e).applyQuaternion(this.quaternion),this.position.add(Av.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(Rv,e)}translateY(e){return this.translateOnAxis(Cv,e)}translateZ(e){return this.translateOnAxis(wv,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Sa.copy(this.matrixWorld).invert())}lookAt(e,i,r){e.isVector3?ec.copy(e):ec.set(e,i,r);const u=this.parent;this.updateWorldMatrix(!0,!1),cl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sa.lookAt(cl,ec,this.up):Sa.lookAt(ec,cl,this.up),this.quaternion.setFromRotationMatrix(Sa),u&&(Sa.extractRotation(u.matrixWorld),Yr.setFromRotationMatrix(Sa),this.quaternion.premultiply(Yr.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Dv),Wr.child=e,this.dispatchEvent(Wr),Wr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(QE),Td.child=e,this.dispatchEvent(Td),Td.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Sa.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Sa.multiply(e.parent.matrixWorld)),e.applyMatrix4(Sa),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Dv),Wr.child=e,this.dispatchEvent(Wr),Wr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let r=0,u=this.children.length;r<u;r++){const h=this.children[r].getObjectByProperty(e,i);if(h!==void 0)return h}}getObjectsByProperty(e,i,r=[]){this[e]===i&&r.push(this);const u=this.children;for(let f=0,h=u.length;f<h;f++)u[f].getObjectsByProperty(e,i,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cl,e,ZE),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cl,KE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let r=0,u=i.length;r<u;r++)i[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let r=0,u=i.length;r<u;r++)i[r].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let r=0,u=i.length;r<u;r++)i[r].updateMatrixWorld(e)}updateWorldMatrix(e,i){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const u=this.children;for(let f=0,h=u.length;f<h;f++)u[f].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",r={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const u={};u.uuid=this.uuid,u.type=this.type,this.name!==""&&(u.name=this.name),this.castShadow===!0&&(u.castShadow=!0),this.receiveShadow===!0&&(u.receiveShadow=!0),this.visible===!1&&(u.visible=!1),this.frustumCulled===!1&&(u.frustumCulled=!1),this.renderOrder!==0&&(u.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(u.userData=this.userData),u.layers=this.layers.mask,u.matrix=this.matrix.toArray(),u.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(u.matrixAutoUpdate=!1),this.isInstancedMesh&&(u.type="InstancedMesh",u.count=this.count,u.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(u.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(u.type="BatchedMesh",u.perObjectFrustumCulled=this.perObjectFrustumCulled,u.sortObjects=this.sortObjects,u.drawRanges=this._drawRanges,u.reservedRanges=this._reservedRanges,u.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),u.instanceInfo=this._instanceInfo.map(d=>({...d})),u.availableInstanceIds=this._availableInstanceIds.slice(),u.availableGeometryIds=this._availableGeometryIds.slice(),u.nextIndexStart=this._nextIndexStart,u.nextVertexStart=this._nextVertexStart,u.geometryCount=this._geometryCount,u.maxInstanceCount=this._maxInstanceCount,u.maxVertexCount=this._maxVertexCount,u.maxIndexCount=this._maxIndexCount,u.geometryInitialized=this._geometryInitialized,u.matricesTexture=this._matricesTexture.toJSON(e),u.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(u.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(u.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(u.boundingBox=this.boundingBox.toJSON()));function f(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?u.background=this.background.toJSON():this.background.isTexture&&(u.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(u.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){u.geometry=f(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let g=0,v=m.length;g<v;g++){const _=m[g];f(e.shapes,_)}else f(e.shapes,m)}}if(this.isSkinnedMesh&&(u.bindMode=this.bindMode,u.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(f(e.skeletons,this.skeleton),u.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,g=this.material.length;m<g;m++)d.push(f(e.materials,this.material[m]));u.material=d}else u.material=f(e.materials,this.material);if(this.children.length>0){u.children=[];for(let d=0;d<this.children.length;d++)u.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){u.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];u.animations.push(f(e.animations,m))}}if(i){const d=h(e.geometries),m=h(e.materials),g=h(e.textures),v=h(e.images),_=h(e.shapes),x=h(e.skeletons),M=h(e.animations),A=h(e.nodes);d.length>0&&(r.geometries=d),m.length>0&&(r.materials=m),g.length>0&&(r.textures=g),v.length>0&&(r.images=v),_.length>0&&(r.shapes=_),x.length>0&&(r.skeletons=x),M.length>0&&(r.animations=M),A.length>0&&(r.nodes=A)}return r.object=u,r;function h(d){const m=[];for(const g in d){const v=d[g];delete v.metadata,m.push(v)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let r=0;r<e.children.length;r++){const u=e.children[r];this.add(u.clone())}return this}}ui.DEFAULT_UP=new et(0,1,0);ui.DEFAULT_MATRIX_AUTO_UPDATE=!0;ui.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Li=new et,xa=new et,bd=new et,ya=new et,jr=new et,Zr=new et,Uv=new et,Ad=new et,Rd=new et,Cd=new et,wd=new rn,Dd=new rn,Ud=new rn;class Oi{constructor(e=new et,i=new et,r=new et){this.a=e,this.b=i,this.c=r}static getNormal(e,i,r,u){u.subVectors(r,i),Li.subVectors(e,i),u.cross(Li);const f=u.lengthSq();return f>0?u.multiplyScalar(1/Math.sqrt(f)):u.set(0,0,0)}static getBarycoord(e,i,r,u,f){Li.subVectors(u,i),xa.subVectors(r,i),bd.subVectors(e,i);const h=Li.dot(Li),d=Li.dot(xa),m=Li.dot(bd),g=xa.dot(xa),v=xa.dot(bd),_=h*g-d*d;if(_===0)return f.set(0,0,0),null;const x=1/_,M=(g*m-d*v)*x,A=(h*v-d*m)*x;return f.set(1-M-A,A,M)}static containsPoint(e,i,r,u){return this.getBarycoord(e,i,r,u,ya)===null?!1:ya.x>=0&&ya.y>=0&&ya.x+ya.y<=1}static getInterpolation(e,i,r,u,f,h,d,m){return this.getBarycoord(e,i,r,u,ya)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(f,ya.x),m.addScaledVector(h,ya.y),m.addScaledVector(d,ya.z),m)}static getInterpolatedAttribute(e,i,r,u,f,h){return wd.setScalar(0),Dd.setScalar(0),Ud.setScalar(0),wd.fromBufferAttribute(e,i),Dd.fromBufferAttribute(e,r),Ud.fromBufferAttribute(e,u),h.setScalar(0),h.addScaledVector(wd,f.x),h.addScaledVector(Dd,f.y),h.addScaledVector(Ud,f.z),h}static isFrontFacing(e,i,r,u){return Li.subVectors(r,i),xa.subVectors(e,i),Li.cross(xa).dot(u)<0}set(e,i,r){return this.a.copy(e),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(e,i,r,u){return this.a.copy(e[i]),this.b.copy(e[r]),this.c.copy(e[u]),this}setFromAttributeAndIndices(e,i,r,u){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,u),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Li.subVectors(this.c,this.b),xa.subVectors(this.a,this.b),Li.cross(xa).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Oi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Oi.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,r,u,f){return Oi.getInterpolation(e,this.a,this.b,this.c,i,r,u,f)}containsPoint(e){return Oi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Oi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const r=this.a,u=this.b,f=this.c;let h,d;jr.subVectors(u,r),Zr.subVectors(f,r),Ad.subVectors(e,r);const m=jr.dot(Ad),g=Zr.dot(Ad);if(m<=0&&g<=0)return i.copy(r);Rd.subVectors(e,u);const v=jr.dot(Rd),_=Zr.dot(Rd);if(v>=0&&_<=v)return i.copy(u);const x=m*_-v*g;if(x<=0&&m>=0&&v<=0)return h=m/(m-v),i.copy(r).addScaledVector(jr,h);Cd.subVectors(e,f);const M=jr.dot(Cd),A=Zr.dot(Cd);if(A>=0&&M<=A)return i.copy(f);const C=M*g-m*A;if(C<=0&&g>=0&&A<=0)return d=g/(g-A),i.copy(r).addScaledVector(Zr,d);const y=v*A-M*_;if(y<=0&&_-v>=0&&M-A>=0)return Uv.subVectors(f,u),d=(_-v)/(_-v+(M-A)),i.copy(u).addScaledVector(Uv,d);const S=1/(y+C+x);return h=C*S,d=x*S,i.copy(r).addScaledVector(jr,h).addScaledVector(Zr,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const LS={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},cs={h:0,s:0,l:0},nc={h:0,s:0,l:0};function Nd(o,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?o+(e-o)*6*i:i<1/2?e:i<2/3?o+(e-o)*6*(2/3-i):o}class Ue{constructor(e,i,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,r)}set(e,i,r){if(i===void 0&&r===void 0){const u=e;u&&u.isColor?this.copy(u):typeof u=="number"?this.setHex(u):typeof u=="string"&&this.setStyle(u)}else this.setRGB(e,i,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=yi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,De.colorSpaceToWorking(this,i),this}setRGB(e,i,r,u=De.workingColorSpace){return this.r=e,this.g=i,this.b=r,De.colorSpaceToWorking(this,u),this}setHSL(e,i,r,u=De.workingColorSpace){if(e=PE(e,1),i=ye(i,0,1),r=ye(r,0,1),i===0)this.r=this.g=this.b=r;else{const f=r<=.5?r*(1+i):r+i-r*i,h=2*r-f;this.r=Nd(h,f,e+1/3),this.g=Nd(h,f,e),this.b=Nd(h,f,e-1/3)}return De.colorSpaceToWorking(this,u),this}setStyle(e,i=yi){function r(f){f!==void 0&&parseFloat(f)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let u;if(u=/^(\w+)\(([^\)]*)\)/.exec(e)){let f;const h=u[1],d=u[2];switch(h){case"rgb":case"rgba":if(f=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(f[4]),this.setRGB(Math.min(255,parseInt(f[1],10))/255,Math.min(255,parseInt(f[2],10))/255,Math.min(255,parseInt(f[3],10))/255,i);if(f=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(f[4]),this.setRGB(Math.min(100,parseInt(f[1],10))/100,Math.min(100,parseInt(f[2],10))/100,Math.min(100,parseInt(f[3],10))/100,i);break;case"hsl":case"hsla":if(f=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(f[4]),this.setHSL(parseFloat(f[1])/360,parseFloat(f[2])/100,parseFloat(f[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(u=/^\#([A-Fa-f\d]+)$/.exec(e)){const f=u[1],h=f.length;if(h===3)return this.setRGB(parseInt(f.charAt(0),16)/15,parseInt(f.charAt(1),16)/15,parseInt(f.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(f,16),i);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=yi){const r=LS[e.toLowerCase()];return r!==void 0?this.setHex(r,i):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ra(e.r),this.g=Ra(e.g),this.b=Ra(e.b),this}copyLinearToSRGB(e){return this.r=so(e.r),this.g=so(e.g),this.b=so(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yi){return De.workingToColorSpace(On.copy(this),e),Math.round(ye(On.r*255,0,255))*65536+Math.round(ye(On.g*255,0,255))*256+Math.round(ye(On.b*255,0,255))}getHexString(e=yi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=De.workingColorSpace){De.workingToColorSpace(On.copy(this),i);const r=On.r,u=On.g,f=On.b,h=Math.max(r,u,f),d=Math.min(r,u,f);let m,g;const v=(d+h)/2;if(d===h)m=0,g=0;else{const _=h-d;switch(g=v<=.5?_/(h+d):_/(2-h-d),h){case r:m=(u-f)/_+(u<f?6:0);break;case u:m=(f-r)/_+2;break;case f:m=(r-u)/_+4;break}m/=6}return e.h=m,e.s=g,e.l=v,e}getRGB(e,i=De.workingColorSpace){return De.workingToColorSpace(On.copy(this),i),e.r=On.r,e.g=On.g,e.b=On.b,e}getStyle(e=yi){De.workingToColorSpace(On.copy(this),e);const i=On.r,r=On.g,u=On.b;return e!==yi?`color(${e} ${i.toFixed(3)} ${r.toFixed(3)} ${u.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(r*255)},${Math.round(u*255)})`}offsetHSL(e,i,r){return this.getHSL(cs),this.setHSL(cs.h+e,cs.s+i,cs.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,r){return this.r=e.r+(i.r-e.r)*r,this.g=e.g+(i.g-e.g)*r,this.b=e.b+(i.b-e.b)*r,this}lerpHSL(e,i){this.getHSL(cs),e.getHSL(nc);const r=pd(cs.h,nc.h,i),u=pd(cs.s,nc.s,i),f=pd(cs.l,nc.l,i);return this.setHSL(r,u,f),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,r=this.g,u=this.b,f=e.elements;return this.r=f[0]*i+f[3]*r+f[6]*u,this.g=f[1]*i+f[4]*r+f[7]*u,this.b=f[2]*i+f[5]*r+f[8]*u,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const On=new Ue;Ue.NAMES=LS;let JE=0;class Dc extends $s{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:JE++}),this.uuid=xl(),this.name="",this.type="Material",this.blending=ao,this.side=ps,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yd,this.blendDst=Wd,this.blendEquation=Ws,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=oo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_v,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hr,this.stencilZFail=Hr,this.stencilZPass=Hr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const r=e[i];if(r===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const u=this[i];if(u===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}u&&u.isColor?u.set(r):u&&u.isVector3&&r&&r.isVector3?u.copy(r):this[i]=r}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==ao&&(r.blending=this.blending),this.side!==ps&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Yd&&(r.blendSrc=this.blendSrc),this.blendDst!==Wd&&(r.blendDst=this.blendDst),this.blendEquation!==Ws&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==oo&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_v&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hr&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Hr&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Hr&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function u(f){const h=[];for(const d in f){const m=f[d];delete m.metadata,h.push(m)}return h}if(i){const f=u(e.textures),h=u(e.images);f.length>0&&(r.textures=f),h.length>0&&(r.images=h)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let r=null;if(i!==null){const u=i.length;r=new Array(u);for(let f=0;f!==u;++f)r[f]=i[f].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class jp extends Dc{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Da,this.combine=vS,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const hn=new et,ic=new ne;let $E=0;class Ti{constructor(e,i,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$E++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=r,this.usage=vv,this.updateRanges=[],this.gpuType=Ta,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,r){e*=this.itemSize,r*=i.itemSize;for(let u=0,f=this.itemSize;u<f;u++)this.array[e+u]=i.array[r+u];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,r=this.count;i<r;i++)ic.fromBufferAttribute(this,i),ic.applyMatrix3(e),this.setXY(i,ic.x,ic.y);else if(this.itemSize===3)for(let i=0,r=this.count;i<r;i++)hn.fromBufferAttribute(this,i),hn.applyMatrix3(e),this.setXYZ(i,hn.x,hn.y,hn.z);return this}applyMatrix4(e){for(let i=0,r=this.count;i<r;i++)hn.fromBufferAttribute(this,i),hn.applyMatrix4(e),this.setXYZ(i,hn.x,hn.y,hn.z);return this}applyNormalMatrix(e){for(let i=0,r=this.count;i<r;i++)hn.fromBufferAttribute(this,i),hn.applyNormalMatrix(e),this.setXYZ(i,hn.x,hn.y,hn.z);return this}transformDirection(e){for(let i=0,r=this.count;i<r;i++)hn.fromBufferAttribute(this,i),hn.transformDirection(e),this.setXYZ(i,hn.x,hn.y,hn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let r=this.array[e*this.itemSize+i];return this.normalized&&(r=ol(r,this.array)),r}setComponent(e,i,r){return this.normalized&&(r=jn(r,this.array)),this.array[e*this.itemSize+i]=r,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=ol(i,this.array)),i}setX(e,i){return this.normalized&&(i=jn(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=ol(i,this.array)),i}setY(e,i){return this.normalized&&(i=jn(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=ol(i,this.array)),i}setZ(e,i){return this.normalized&&(i=jn(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=ol(i,this.array)),i}setW(e,i){return this.normalized&&(i=jn(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,r){return e*=this.itemSize,this.normalized&&(i=jn(i,this.array),r=jn(r,this.array)),this.array[e+0]=i,this.array[e+1]=r,this}setXYZ(e,i,r,u){return e*=this.itemSize,this.normalized&&(i=jn(i,this.array),r=jn(r,this.array),u=jn(u,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=u,this}setXYZW(e,i,r,u,f){return e*=this.itemSize,this.normalized&&(i=jn(i,this.array),r=jn(r,this.array),u=jn(u,this.array),f=jn(f,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=u,this.array[e+3]=f,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==vv&&(e.usage=this.usage),e}}class OS extends Ti{constructor(e,i,r){super(new Uint16Array(e),i,r)}}class PS extends Ti{constructor(e,i,r){super(new Uint32Array(e),i,r)}}class Ca extends Ti{constructor(e,i,r){super(new Float32Array(e),i,r)}}let tT=0;const xi=new _n,Ld=new ui,Kr=new et,li=new yl,fl=new yl,En=new et;class Ua extends $s{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tT++}),this.uuid=xl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wS(e)?PS:OS)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,r=0){this.groups.push({start:e,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const f=new pe().getNormalMatrix(e);r.applyNormalMatrix(f),r.needsUpdate=!0}const u=this.attributes.tangent;return u!==void 0&&(u.transformDirection(e),u.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return xi.makeRotationFromQuaternion(e),this.applyMatrix4(xi),this}rotateX(e){return xi.makeRotationX(e),this.applyMatrix4(xi),this}rotateY(e){return xi.makeRotationY(e),this.applyMatrix4(xi),this}rotateZ(e){return xi.makeRotationZ(e),this.applyMatrix4(xi),this}translate(e,i,r){return xi.makeTranslation(e,i,r),this.applyMatrix4(xi),this}scale(e,i,r){return xi.makeScale(e,i,r),this.applyMatrix4(xi),this}lookAt(e){return Ld.lookAt(e),Ld.updateMatrix(),this.applyMatrix4(Ld.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Kr).negate(),this.translate(Kr.x,Kr.y,Kr.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const r=[];for(let u=0,f=e.length;u<f;u++){const h=e[u];r.push(h.x,h.y,h.z||0)}this.setAttribute("position",new Ca(r,3))}else{const r=Math.min(e.length,i.count);for(let u=0;u<r;u++){const f=e[u];i.setXYZ(u,f.x,f.y,f.z||0)}e.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yl);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new et(-1/0,-1/0,-1/0),new et(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let r=0,u=i.length;r<u;r++){const f=i[r];li.setFromBufferAttribute(f),this.morphTargetsRelative?(En.addVectors(this.boundingBox.min,li.min),this.boundingBox.expandByPoint(En),En.addVectors(this.boundingBox.max,li.max),this.boundingBox.expandByPoint(En)):(this.boundingBox.expandByPoint(li.min),this.boundingBox.expandByPoint(li.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wp);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new et,1/0);return}if(e){const r=this.boundingSphere.center;if(li.setFromBufferAttribute(e),i)for(let f=0,h=i.length;f<h;f++){const d=i[f];fl.setFromBufferAttribute(d),this.morphTargetsRelative?(En.addVectors(li.min,fl.min),li.expandByPoint(En),En.addVectors(li.max,fl.max),li.expandByPoint(En)):(li.expandByPoint(fl.min),li.expandByPoint(fl.max))}li.getCenter(r);let u=0;for(let f=0,h=e.count;f<h;f++)En.fromBufferAttribute(e,f),u=Math.max(u,r.distanceToSquared(En));if(i)for(let f=0,h=i.length;f<h;f++){const d=i[f],m=this.morphTargetsRelative;for(let g=0,v=d.count;g<v;g++)En.fromBufferAttribute(d,g),m&&(Kr.fromBufferAttribute(e,g),En.add(Kr)),u=Math.max(u,r.distanceToSquared(En))}this.boundingSphere.radius=Math.sqrt(u),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=i.position,u=i.normal,f=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ti(new Float32Array(4*r.count),4));const h=this.getAttribute("tangent"),d=[],m=[];for(let q=0;q<r.count;q++)d[q]=new et,m[q]=new et;const g=new et,v=new et,_=new et,x=new ne,M=new ne,A=new ne,C=new et,y=new et;function S(q,w,R){g.fromBufferAttribute(r,q),v.fromBufferAttribute(r,w),_.fromBufferAttribute(r,R),x.fromBufferAttribute(f,q),M.fromBufferAttribute(f,w),A.fromBufferAttribute(f,R),v.sub(g),_.sub(g),M.sub(x),A.sub(x);const G=1/(M.x*A.y-A.x*M.y);isFinite(G)&&(C.copy(v).multiplyScalar(A.y).addScaledVector(_,-M.y).multiplyScalar(G),y.copy(_).multiplyScalar(M.x).addScaledVector(v,-A.x).multiplyScalar(G),d[q].add(C),d[w].add(C),d[R].add(C),m[q].add(y),m[w].add(y),m[R].add(y))}let I=this.groups;I.length===0&&(I=[{start:0,count:e.count}]);for(let q=0,w=I.length;q<w;++q){const R=I[q],G=R.start,at=R.count;for(let ut=G,gt=G+at;ut<gt;ut+=3)S(e.getX(ut+0),e.getX(ut+1),e.getX(ut+2))}const z=new et,U=new et,V=new et,H=new et;function O(q){V.fromBufferAttribute(u,q),H.copy(V);const w=d[q];z.copy(w),z.sub(V.multiplyScalar(V.dot(w))).normalize(),U.crossVectors(H,w);const G=U.dot(m[q])<0?-1:1;h.setXYZW(q,z.x,z.y,z.z,G)}for(let q=0,w=I.length;q<w;++q){const R=I[q],G=R.start,at=R.count;for(let ut=G,gt=G+at;ut<gt;ut+=3)O(e.getX(ut+0)),O(e.getX(ut+1)),O(e.getX(ut+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Ti(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let x=0,M=r.count;x<M;x++)r.setXYZ(x,0,0,0);const u=new et,f=new et,h=new et,d=new et,m=new et,g=new et,v=new et,_=new et;if(e)for(let x=0,M=e.count;x<M;x+=3){const A=e.getX(x+0),C=e.getX(x+1),y=e.getX(x+2);u.fromBufferAttribute(i,A),f.fromBufferAttribute(i,C),h.fromBufferAttribute(i,y),v.subVectors(h,f),_.subVectors(u,f),v.cross(_),d.fromBufferAttribute(r,A),m.fromBufferAttribute(r,C),g.fromBufferAttribute(r,y),d.add(v),m.add(v),g.add(v),r.setXYZ(A,d.x,d.y,d.z),r.setXYZ(C,m.x,m.y,m.z),r.setXYZ(y,g.x,g.y,g.z)}else for(let x=0,M=i.count;x<M;x+=3)u.fromBufferAttribute(i,x+0),f.fromBufferAttribute(i,x+1),h.fromBufferAttribute(i,x+2),v.subVectors(h,f),_.subVectors(u,f),v.cross(_),r.setXYZ(x+0,v.x,v.y,v.z),r.setXYZ(x+1,v.x,v.y,v.z),r.setXYZ(x+2,v.x,v.y,v.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,r=e.count;i<r;i++)En.fromBufferAttribute(e,i),En.normalize(),e.setXYZ(i,En.x,En.y,En.z)}toNonIndexed(){function e(d,m){const g=d.array,v=d.itemSize,_=d.normalized,x=new g.constructor(m.length*v);let M=0,A=0;for(let C=0,y=m.length;C<y;C++){d.isInterleavedBufferAttribute?M=m[C]*d.data.stride+d.offset:M=m[C]*v;for(let S=0;S<v;S++)x[A++]=g[M++]}return new Ti(x,v,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Ua,r=this.index.array,u=this.attributes;for(const d in u){const m=u[d],g=e(m,r);i.setAttribute(d,g)}const f=this.morphAttributes;for(const d in f){const m=[],g=f[d];for(let v=0,_=g.length;v<_;v++){const x=g[v],M=e(x,r);m.push(M)}i.morphAttributes[d]=m}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,m=h.length;d<m;d++){const g=h[d];i.addGroup(g.start,g.count,g.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const g in m)m[g]!==void 0&&(e[g]=m[g]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const r=this.attributes;for(const m in r){const g=r[m];e.data.attributes[m]=g.toJSON(e.data)}const u={};let f=!1;for(const m in this.morphAttributes){const g=this.morphAttributes[m],v=[];for(let _=0,x=g.length;_<x;_++){const M=g[_];v.push(M.toJSON(e.data))}v.length>0&&(u[m]=v,f=!0)}f&&(e.data.morphAttributes=u,e.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(e.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere=d.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone());const u=e.attributes;for(const g in u){const v=u[g];this.setAttribute(g,v.clone(i))}const f=e.morphAttributes;for(const g in f){const v=[],_=f[g];for(let x=0,M=_.length;x<M;x++)v.push(_[x].clone(i));this.morphAttributes[g]=v}this.morphTargetsRelative=e.morphTargetsRelative;const h=e.groups;for(let g=0,v=h.length;g<v;g++){const _=h[g];this.addGroup(_.start,_.count,_.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Nv=new _n,Vs=new US,ac=new Wp,Lv=new et,sc=new et,rc=new et,oc=new et,Od=new et,lc=new et,Ov=new et,uc=new et;class Ii extends ui{constructor(e=new Ua,i=new jp){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const u=i[r[0]];if(u!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let f=0,h=u.length;f<h;f++){const d=u[f].name||String(f);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=f}}}}getVertexPosition(e,i){const r=this.geometry,u=r.attributes.position,f=r.morphAttributes.position,h=r.morphTargetsRelative;i.fromBufferAttribute(u,e);const d=this.morphTargetInfluences;if(f&&d){lc.set(0,0,0);for(let m=0,g=f.length;m<g;m++){const v=d[m],_=f[m];v!==0&&(Od.fromBufferAttribute(_,e),h?lc.addScaledVector(Od,v):lc.addScaledVector(Od.sub(i),v))}i.add(lc)}return i}raycast(e,i){const r=this.geometry,u=this.material,f=this.matrixWorld;u!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),ac.copy(r.boundingSphere),ac.applyMatrix4(f),Vs.copy(e.ray).recast(e.near),!(ac.containsPoint(Vs.origin)===!1&&(Vs.intersectSphere(ac,Lv)===null||Vs.origin.distanceToSquared(Lv)>(e.far-e.near)**2))&&(Nv.copy(f).invert(),Vs.copy(e.ray).applyMatrix4(Nv),!(r.boundingBox!==null&&Vs.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,i,Vs)))}_computeIntersections(e,i,r){let u;const f=this.geometry,h=this.material,d=f.index,m=f.attributes.position,g=f.attributes.uv,v=f.attributes.uv1,_=f.attributes.normal,x=f.groups,M=f.drawRange;if(d!==null)if(Array.isArray(h))for(let A=0,C=x.length;A<C;A++){const y=x[A],S=h[y.materialIndex],I=Math.max(y.start,M.start),z=Math.min(d.count,Math.min(y.start+y.count,M.start+M.count));for(let U=I,V=z;U<V;U+=3){const H=d.getX(U),O=d.getX(U+1),q=d.getX(U+2);u=cc(this,S,e,r,g,v,_,H,O,q),u&&(u.faceIndex=Math.floor(U/3),u.face.materialIndex=y.materialIndex,i.push(u))}}else{const A=Math.max(0,M.start),C=Math.min(d.count,M.start+M.count);for(let y=A,S=C;y<S;y+=3){const I=d.getX(y),z=d.getX(y+1),U=d.getX(y+2);u=cc(this,h,e,r,g,v,_,I,z,U),u&&(u.faceIndex=Math.floor(y/3),i.push(u))}}else if(m!==void 0)if(Array.isArray(h))for(let A=0,C=x.length;A<C;A++){const y=x[A],S=h[y.materialIndex],I=Math.max(y.start,M.start),z=Math.min(m.count,Math.min(y.start+y.count,M.start+M.count));for(let U=I,V=z;U<V;U+=3){const H=U,O=U+1,q=U+2;u=cc(this,S,e,r,g,v,_,H,O,q),u&&(u.faceIndex=Math.floor(U/3),u.face.materialIndex=y.materialIndex,i.push(u))}}else{const A=Math.max(0,M.start),C=Math.min(m.count,M.start+M.count);for(let y=A,S=C;y<S;y+=3){const I=y,z=y+1,U=y+2;u=cc(this,h,e,r,g,v,_,I,z,U),u&&(u.faceIndex=Math.floor(y/3),i.push(u))}}}}function eT(o,e,i,r,u,f,h,d){let m;if(e.side===Kn?m=r.intersectTriangle(h,f,u,!0,d):m=r.intersectTriangle(u,f,h,e.side===ps,d),m===null)return null;uc.copy(d),uc.applyMatrix4(o.matrixWorld);const g=i.ray.origin.distanceTo(uc);return g<i.near||g>i.far?null:{distance:g,point:uc.clone(),object:o}}function cc(o,e,i,r,u,f,h,d,m,g){o.getVertexPosition(d,sc),o.getVertexPosition(m,rc),o.getVertexPosition(g,oc);const v=eT(o,e,i,r,sc,rc,oc,Ov);if(v){const _=new et;Oi.getBarycoord(Ov,sc,rc,oc,_),u&&(v.uv=Oi.getInterpolatedAttribute(u,d,m,g,_,new ne)),f&&(v.uv1=Oi.getInterpolatedAttribute(f,d,m,g,_,new ne)),h&&(v.normal=Oi.getInterpolatedAttribute(h,d,m,g,_,new et),v.normal.dot(r.direction)>0&&v.normal.multiplyScalar(-1));const x={a:d,b:m,c:g,normal:new et,materialIndex:0};Oi.getNormal(sc,rc,oc,x.normal),v.face=x,v.barycoord=_}return v}class Ml extends Ua{constructor(e=1,i=1,r=1,u=1,f=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:r,widthSegments:u,heightSegments:f,depthSegments:h};const d=this;u=Math.floor(u),f=Math.floor(f),h=Math.floor(h);const m=[],g=[],v=[],_=[];let x=0,M=0;A("z","y","x",-1,-1,r,i,e,h,f,0),A("z","y","x",1,-1,r,i,-e,h,f,1),A("x","z","y",1,1,e,r,i,u,h,2),A("x","z","y",1,-1,e,r,-i,u,h,3),A("x","y","z",1,-1,e,i,r,u,f,4),A("x","y","z",-1,-1,e,i,-r,u,f,5),this.setIndex(m),this.setAttribute("position",new Ca(g,3)),this.setAttribute("normal",new Ca(v,3)),this.setAttribute("uv",new Ca(_,2));function A(C,y,S,I,z,U,V,H,O,q,w){const R=U/O,G=V/q,at=U/2,ut=V/2,gt=H/2,lt=O+1,W=q+1;let st=0,Z=0;const _t=new et;for(let St=0;St<W;St++){const Gt=St*G-ut;for(let oe=0;oe<lt;oe++){const be=oe*R-at;_t[C]=be*I,_t[y]=Gt*z,_t[S]=gt,g.push(_t.x,_t.y,_t.z),_t[C]=0,_t[y]=0,_t[S]=H>0?1:-1,v.push(_t.x,_t.y,_t.z),_.push(oe/O),_.push(1-St/q),st+=1}}for(let St=0;St<q;St++)for(let Gt=0;Gt<O;Gt++){const oe=x+Gt+lt*St,be=x+Gt+lt*(St+1),P=x+(Gt+1)+lt*(St+1),ct=x+(Gt+1)+lt*St;m.push(oe,be,ct),m.push(be,P,ct),Z+=6}d.addGroup(M,Z,w),M+=Z,x+=st}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ml(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function co(o){const e={};for(const i in o){e[i]={};for(const r in o[i]){const u=o[i][r];u&&(u.isColor||u.isMatrix3||u.isMatrix4||u.isVector2||u.isVector3||u.isVector4||u.isTexture||u.isQuaternion)?u.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][r]=null):e[i][r]=u.clone():Array.isArray(u)?e[i][r]=u.slice():e[i][r]=u}}return e}function Gn(o){const e={};for(let i=0;i<o.length;i++){const r=co(o[i]);for(const u in r)e[u]=r[u]}return e}function nT(o){const e=[];for(let i=0;i<o.length;i++)e.push(o[i].clone());return e}function zS(o){const e=o.getRenderTarget();return e===null?o.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:De.workingColorSpace}const Cc={clone:co,merge:Gn};var iT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,aT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vn extends Dc{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=iT,this.fragmentShader=aT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=co(e.uniforms),this.uniformsGroups=nT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const u in this.uniforms){const h=this.uniforms[u].value;h&&h.isTexture?i.uniforms[u]={type:"t",value:h.toJSON(e).uuid}:h&&h.isColor?i.uniforms[u]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[u]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[u]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[u]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[u]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[u]={type:"m4",value:h.toArray()}:i.uniforms[u]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const r={};for(const u in this.extensions)this.extensions[u]===!0&&(r[u]=!0);return Object.keys(r).length>0&&(i.extensions=r),i}}class IS extends ui{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _n,this.projectionMatrix=new _n,this.projectionMatrixInverse=new _n,this.coordinateSystem=$i,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const fs=new et,Pv=new ne,zv=new ne;class Mi extends IS{constructor(e=50,i=1,r=.1,u=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=u,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=Lp*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(yc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Lp*2*Math.atan(Math.tan(yc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,r){fs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(fs.x,fs.y).multiplyScalar(-e/fs.z),fs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(fs.x,fs.y).multiplyScalar(-e/fs.z)}getViewSize(e,i){return this.getViewBounds(e,Pv,zv),i.subVectors(zv,Pv)}setViewOffset(e,i,r,u,f,h){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=u,this.view.width=f,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(yc*.5*this.fov)/this.zoom,r=2*i,u=this.aspect*r,f=-.5*u;const h=this.view;if(this.view!==null&&this.view.enabled){const m=h.fullWidth,g=h.fullHeight;f+=h.offsetX*u/m,i-=h.offsetY*r/g,u*=h.width/m,r*=h.height/g}const d=this.filmOffset;d!==0&&(f+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(f,f+u,i,i-r,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const Qr=-90,Jr=1;class sT extends ui{constructor(e,i,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const u=new Mi(Qr,Jr,e,i);u.layers=this.layers,this.add(u);const f=new Mi(Qr,Jr,e,i);f.layers=this.layers,this.add(f);const h=new Mi(Qr,Jr,e,i);h.layers=this.layers,this.add(h);const d=new Mi(Qr,Jr,e,i);d.layers=this.layers,this.add(d);const m=new Mi(Qr,Jr,e,i);m.layers=this.layers,this.add(m);const g=new Mi(Qr,Jr,e,i);g.layers=this.layers,this.add(g)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[r,u,f,h,d,m]=i;for(const g of i)this.remove(g);if(e===$i)r.up.set(0,1,0),r.lookAt(1,0,0),u.up.set(0,1,0),u.lookAt(-1,0,0),f.up.set(0,0,-1),f.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===Ac)r.up.set(0,-1,0),r.lookAt(-1,0,0),u.up.set(0,-1,0),u.lookAt(1,0,0),f.up.set(0,0,1),f.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const g of i)this.add(g),g.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:u}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[f,h,d,m,g,v]=this.children,_=e.getRenderTarget(),x=e.getActiveCubeFace(),M=e.getActiveMipmapLevel(),A=e.xr.enabled;e.xr.enabled=!1;const C=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,u),e.render(i,f),e.setRenderTarget(r,1,u),e.render(i,h),e.setRenderTarget(r,2,u),e.render(i,d),e.setRenderTarget(r,3,u),e.render(i,m),e.setRenderTarget(r,4,u),e.render(i,g),r.texture.generateMipmaps=C,e.setRenderTarget(r,5,u),e.render(i,v),e.setRenderTarget(_,x,M),e.xr.enabled=A,r.texture.needsPMREMUpdate=!0}}class BS extends Qn{constructor(e=[],i=lo,r,u,f,h,d,m,g,v){super(e,i,r,u,f,h,d,m,g,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class rT extends Ei{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},u=[r,r,r,r,r,r];this.texture=new BS(u),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},u=new Ml(5,5,5),f=new Vn({name:"CubemapFromEquirect",uniforms:co(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Kn,blending:ba});f.uniforms.tEquirect.value=i;const h=new Ii(u,f),d=i.minFilter;return i.minFilter===Ks&&(i.minFilter=Ji),new sT(1,10,this).update(e,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(e,i=!0,r=!0,u=!0){const f=e.getRenderTarget();for(let h=0;h<6;h++)e.setRenderTarget(this,h),e.clear(i,r,u);e.setRenderTarget(f)}}class fc extends ui{constructor(){super(),this.isGroup=!0,this.type="Group"}}const oT={type:"move"};class Pd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new et,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new et),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new et,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new et),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const r of e.hand.values())this._getHandJoint(i,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,r){let u=null,f=null,h=null;const d=this._targetRay,m=this._grip,g=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(g&&e.hand){h=!0;for(const C of e.hand.values()){const y=i.getJointPose(C,r),S=this._getHandJoint(g,C);y!==null&&(S.matrix.fromArray(y.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=y.radius),S.visible=y!==null}const v=g.joints["index-finger-tip"],_=g.joints["thumb-tip"],x=v.position.distanceTo(_.position),M=.02,A=.005;g.inputState.pinching&&x>M+A?(g.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!g.inputState.pinching&&x<=M-A&&(g.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(f=i.getPose(e.gripSpace,r),f!==null&&(m.matrix.fromArray(f.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,f.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(f.linearVelocity)):m.hasLinearVelocity=!1,f.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(f.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(u=i.getPose(e.targetRaySpace,r),u===null&&f!==null&&(u=f),u!==null&&(d.matrix.fromArray(u.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,u.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(u.linearVelocity)):d.hasLinearVelocity=!1,u.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(u.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(oT)))}return d!==null&&(d.visible=u!==null),m!==null&&(m.visible=f!==null),g!==null&&(g.visible=h!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const r=new fc;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[i.jointName]=r,e.add(r)}return e.joints[i.jointName]}}class lT extends ui{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Da,this.environmentIntensity=1,this.environmentRotation=new Da,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const zd=new et,uT=new et,cT=new pe;class hs{constructor(e=new et(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,r,u){return this.normal.set(e,i,r),this.constant=u,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,r){const u=zd.subVectors(r,i).cross(uT.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(u,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i){const r=e.delta(zd),u=this.normal.dot(r);if(u===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const f=-(e.start.dot(this.normal)+this.constant)/u;return f<0||f>1?null:i.copy(e.start).addScaledVector(r,f)}intersectsLine(e){const i=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return i<0&&r>0||r<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const r=i||cT.getNormalMatrix(e),u=this.coplanarPoint(zd).applyMatrix4(e),f=this.normal.applyMatrix3(r).normalize();return this.constant=-u.dot(f),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ks=new Wp,fT=new ne(.5,.5),hc=new et;class FS{constructor(e=new hs,i=new hs,r=new hs,u=new hs,f=new hs,h=new hs){this.planes=[e,i,r,u,f,h]}set(e,i,r,u,f,h){const d=this.planes;return d[0].copy(e),d[1].copy(i),d[2].copy(r),d[3].copy(u),d[4].copy(f),d[5].copy(h),this}copy(e){const i=this.planes;for(let r=0;r<6;r++)i[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,i=$i,r=!1){const u=this.planes,f=e.elements,h=f[0],d=f[1],m=f[2],g=f[3],v=f[4],_=f[5],x=f[6],M=f[7],A=f[8],C=f[9],y=f[10],S=f[11],I=f[12],z=f[13],U=f[14],V=f[15];if(u[0].setComponents(g-h,M-v,S-A,V-I).normalize(),u[1].setComponents(g+h,M+v,S+A,V+I).normalize(),u[2].setComponents(g+d,M+_,S+C,V+z).normalize(),u[3].setComponents(g-d,M-_,S-C,V-z).normalize(),r)u[4].setComponents(m,x,y,U).normalize(),u[5].setComponents(g-m,M-x,S-y,V-U).normalize();else if(u[4].setComponents(g-m,M-x,S-y,V-U).normalize(),i===$i)u[5].setComponents(g+m,M+x,S+y,V+U).normalize();else if(i===Ac)u[5].setComponents(m,x,y,U).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ks.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),ks.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ks)}intersectsSprite(e){ks.center.set(0,0,0);const i=fT.distanceTo(e.center);return ks.radius=.7071067811865476+i,ks.applyMatrix4(e.matrixWorld),this.intersectsSphere(ks)}intersectsSphere(e){const i=this.planes,r=e.center,u=-e.radius;for(let f=0;f<6;f++)if(i[f].distanceToPoint(r)<u)return!1;return!0}intersectsBox(e){const i=this.planes;for(let r=0;r<6;r++){const u=i[r];if(hc.x=u.normal.x>0?e.max.x:e.min.x,hc.y=u.normal.y>0?e.max.y:e.min.y,hc.z=u.normal.z>0?e.max.z:e.min.z,u.distanceToPoint(hc)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let r=0;r<6;r++)if(i[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class HS extends Qn{constructor(e,i,r=Qs,u,f,h,d=Bi,m=Bi,g,v=_l,_=1){if(v!==_l&&v!==vl)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const x={width:e,height:i,depth:_};super(x,u,f,h,d,m,v,r,g),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Yp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class GS extends Qn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Uc extends Ua{constructor(e=1,i=1,r=1,u=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:r,heightSegments:u};const f=e/2,h=i/2,d=Math.floor(r),m=Math.floor(u),g=d+1,v=m+1,_=e/d,x=i/m,M=[],A=[],C=[],y=[];for(let S=0;S<v;S++){const I=S*x-h;for(let z=0;z<g;z++){const U=z*_-f;A.push(U,-I,0),C.push(0,0,1),y.push(z/d),y.push(1-S/m)}}for(let S=0;S<m;S++)for(let I=0;I<d;I++){const z=I+g*S,U=I+g*(S+1),V=I+1+g*(S+1),H=I+1+g*S;M.push(z,U,H),M.push(U,V,H)}this.setIndex(M),this.setAttribute("position",new Ca(A,3)),this.setAttribute("normal",new Ca(C,3)),this.setAttribute("uv",new Ca(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Uc(e.width,e.height,e.widthSegments,e.heightSegments)}}class hT extends Dc{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=TE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class dT extends Dc{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Zp extends IS{constructor(e=-1,i=1,r=1,u=-1,f=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=r,this.bottom=u,this.near=f,this.far=h,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,r,u,f,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=u,this.view.width=f,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,u=(this.top+this.bottom)/2;let f=r-e,h=r+e,d=u+i,m=u-i;if(this.view!==null&&this.view.enabled){const g=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;f+=g*this.view.offsetX,h=f+g*this.view.width,d-=v*this.view.offsetY,m=d-v*this.view.height}this.projectionMatrix.makeOrthographic(f,h,d,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class pT extends Mi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class mT{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const i=performance.now();e=(i-this.oldTime)/1e3,this.oldTime=i,this.elapsedTime+=e}return e}}class Iv{constructor(e=1,i=0,r=0){this.radius=e,this.phi=i,this.theta=r}set(e,i,r){return this.radius=e,this.phi=i,this.theta=r,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ye(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,r){return this.radius=Math.sqrt(e*e+i*i+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,r),this.phi=Math.acos(ye(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class gT extends $s{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Bv(o,e,i,r){const u=_T(r);switch(i){case TS:return o*e;case AS:return o*e/u.components*u.byteLength;case kp:return o*e/u.components*u.byteLength;case RS:return o*e*2/u.components*u.byteLength;case Xp:return o*e*2/u.components*u.byteLength;case bS:return o*e*3/u.components*u.byteLength;case zi:return o*e*4/u.components*u.byteLength;case qp:return o*e*4/u.components*u.byteLength;case _c:case vc:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case Sc:case xc:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case rp:case lp:return Math.max(o,16)*Math.max(e,8)/4;case sp:case op:return Math.max(o,8)*Math.max(e,8)/2;case up:case cp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case fp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case hp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case dp:return Math.floor((o+4)/5)*Math.floor((e+3)/4)*16;case pp:return Math.floor((o+4)/5)*Math.floor((e+4)/5)*16;case mp:return Math.floor((o+5)/6)*Math.floor((e+4)/5)*16;case gp:return Math.floor((o+5)/6)*Math.floor((e+5)/6)*16;case _p:return Math.floor((o+7)/8)*Math.floor((e+4)/5)*16;case vp:return Math.floor((o+7)/8)*Math.floor((e+5)/6)*16;case Sp:return Math.floor((o+7)/8)*Math.floor((e+7)/8)*16;case xp:return Math.floor((o+9)/10)*Math.floor((e+4)/5)*16;case yp:return Math.floor((o+9)/10)*Math.floor((e+5)/6)*16;case Mp:return Math.floor((o+9)/10)*Math.floor((e+7)/8)*16;case Ep:return Math.floor((o+9)/10)*Math.floor((e+9)/10)*16;case Tp:return Math.floor((o+11)/12)*Math.floor((e+9)/10)*16;case bp:return Math.floor((o+11)/12)*Math.floor((e+11)/12)*16;case Ap:case Rp:case Cp:return Math.ceil(o/4)*Math.ceil(e/4)*16;case wp:case Dp:return Math.ceil(o/4)*Math.ceil(e/4)*8;case Up:case Np:return Math.ceil(o/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function _T(o){switch(o){case wa:case xS:return{byteLength:1,components:1};case ml:case yS:case ta:return{byteLength:2,components:1};case Gp:case Vp:return{byteLength:2,components:4};case Qs:case Hp:case Ta:return{byteLength:4,components:1};case MS:case ES:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fp);function VS(){let o=null,e=!1,i=null,r=null;function u(f,h){i(f,h),r=o.requestAnimationFrame(u)}return{start:function(){e!==!0&&i!==null&&(r=o.requestAnimationFrame(u),e=!0)},stop:function(){o.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(f){i=f},setContext:function(f){o=f}}}function vT(o){const e=new WeakMap;function i(d,m){const g=d.array,v=d.usage,_=g.byteLength,x=o.createBuffer();o.bindBuffer(m,x),o.bufferData(m,g,v),d.onUploadCallback();let M;if(g instanceof Float32Array)M=o.FLOAT;else if(typeof Float16Array<"u"&&g instanceof Float16Array)M=o.HALF_FLOAT;else if(g instanceof Uint16Array)d.isFloat16BufferAttribute?M=o.HALF_FLOAT:M=o.UNSIGNED_SHORT;else if(g instanceof Int16Array)M=o.SHORT;else if(g instanceof Uint32Array)M=o.UNSIGNED_INT;else if(g instanceof Int32Array)M=o.INT;else if(g instanceof Int8Array)M=o.BYTE;else if(g instanceof Uint8Array)M=o.UNSIGNED_BYTE;else if(g instanceof Uint8ClampedArray)M=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+g);return{buffer:x,type:M,bytesPerElement:g.BYTES_PER_ELEMENT,version:d.version,size:_}}function r(d,m,g){const v=m.array,_=m.updateRanges;if(o.bindBuffer(g,d),_.length===0)o.bufferSubData(g,0,v);else{_.sort((M,A)=>M.start-A.start);let x=0;for(let M=1;M<_.length;M++){const A=_[x],C=_[M];C.start<=A.start+A.count+1?A.count=Math.max(A.count,C.start+C.count-A.start):(++x,_[x]=C)}_.length=x+1;for(let M=0,A=_.length;M<A;M++){const C=_[M];o.bufferSubData(g,C.start*v.BYTES_PER_ELEMENT,v,C.start,C.count)}m.clearUpdateRanges()}m.onUploadCallback()}function u(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function f(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=e.get(d);m&&(o.deleteBuffer(m.buffer),e.delete(d))}function h(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const v=e.get(d);(!v||v.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const g=e.get(d);if(g===void 0)e.set(d,i(d,m));else if(g.version<d.version){if(g.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(g.buffer,d,m),g.version=d.version}}return{get:u,remove:f,update:h}}var ST=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xT=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,yT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,MT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ET=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,TT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bT=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,AT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,RT=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,CT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,wT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,DT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,UT=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,NT=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,LT=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,OT=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,PT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,IT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,BT=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,FT=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,HT=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,GT=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,VT=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,kT=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,XT=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,qT=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,YT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,WT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,jT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ZT="gl_FragColor = linearToOutputTexel( gl_FragColor );",KT=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,QT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,JT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,$T=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,tb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,eb=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,nb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ib=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ab=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rb=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ob=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ub=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cb=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,fb=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,hb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,db=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,pb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,mb=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,gb=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,_b=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,vb=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Sb=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,xb=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Mb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Eb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,bb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ab=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Cb=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Db=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ub=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Nb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ob=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Pb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ib=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Bb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gb=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Vb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wb=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,jb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Kb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$b=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,t1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,e1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,n1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,i1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,a1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,s1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,r1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,o1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,l1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,u1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,c1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,f1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,h1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,d1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,p1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,m1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,g1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,_1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const v1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,S1=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,x1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,y1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,M1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,E1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,T1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,b1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,A1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,R1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,C1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,w1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,D1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,U1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,N1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,L1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,O1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,P1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,z1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,I1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,B1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,F1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,H1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,G1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,V1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,k1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,X1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,q1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Y1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,W1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,j1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Z1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,K1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Q1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,me={alphahash_fragment:ST,alphahash_pars_fragment:xT,alphamap_fragment:yT,alphamap_pars_fragment:MT,alphatest_fragment:ET,alphatest_pars_fragment:TT,aomap_fragment:bT,aomap_pars_fragment:AT,batching_pars_vertex:RT,batching_vertex:CT,begin_vertex:wT,beginnormal_vertex:DT,bsdfs:UT,iridescence_fragment:NT,bumpmap_pars_fragment:LT,clipping_planes_fragment:OT,clipping_planes_pars_fragment:PT,clipping_planes_pars_vertex:zT,clipping_planes_vertex:IT,color_fragment:BT,color_pars_fragment:FT,color_pars_vertex:HT,color_vertex:GT,common:VT,cube_uv_reflection_fragment:kT,defaultnormal_vertex:XT,displacementmap_pars_vertex:qT,displacementmap_vertex:YT,emissivemap_fragment:WT,emissivemap_pars_fragment:jT,colorspace_fragment:ZT,colorspace_pars_fragment:KT,envmap_fragment:QT,envmap_common_pars_fragment:JT,envmap_pars_fragment:$T,envmap_pars_vertex:tb,envmap_physical_pars_fragment:fb,envmap_vertex:eb,fog_vertex:nb,fog_pars_vertex:ib,fog_fragment:ab,fog_pars_fragment:sb,gradientmap_pars_fragment:rb,lightmap_pars_fragment:ob,lights_lambert_fragment:lb,lights_lambert_pars_fragment:ub,lights_pars_begin:cb,lights_toon_fragment:hb,lights_toon_pars_fragment:db,lights_phong_fragment:pb,lights_phong_pars_fragment:mb,lights_physical_fragment:gb,lights_physical_pars_fragment:_b,lights_fragment_begin:vb,lights_fragment_maps:Sb,lights_fragment_end:xb,logdepthbuf_fragment:yb,logdepthbuf_pars_fragment:Mb,logdepthbuf_pars_vertex:Eb,logdepthbuf_vertex:Tb,map_fragment:bb,map_pars_fragment:Ab,map_particle_fragment:Rb,map_particle_pars_fragment:Cb,metalnessmap_fragment:wb,metalnessmap_pars_fragment:Db,morphinstance_vertex:Ub,morphcolor_vertex:Nb,morphnormal_vertex:Lb,morphtarget_pars_vertex:Ob,morphtarget_vertex:Pb,normal_fragment_begin:zb,normal_fragment_maps:Ib,normal_pars_fragment:Bb,normal_pars_vertex:Fb,normal_vertex:Hb,normalmap_pars_fragment:Gb,clearcoat_normal_fragment_begin:Vb,clearcoat_normal_fragment_maps:kb,clearcoat_pars_fragment:Xb,iridescence_pars_fragment:qb,opaque_fragment:Yb,packing:Wb,premultiplied_alpha_fragment:jb,project_vertex:Zb,dithering_fragment:Kb,dithering_pars_fragment:Qb,roughnessmap_fragment:Jb,roughnessmap_pars_fragment:$b,shadowmap_pars_fragment:t1,shadowmap_pars_vertex:e1,shadowmap_vertex:n1,shadowmask_pars_fragment:i1,skinbase_vertex:a1,skinning_pars_vertex:s1,skinning_vertex:r1,skinnormal_vertex:o1,specularmap_fragment:l1,specularmap_pars_fragment:u1,tonemapping_fragment:c1,tonemapping_pars_fragment:f1,transmission_fragment:h1,transmission_pars_fragment:d1,uv_pars_fragment:p1,uv_pars_vertex:m1,uv_vertex:g1,worldpos_vertex:_1,background_vert:v1,background_frag:S1,backgroundCube_vert:x1,backgroundCube_frag:y1,cube_vert:M1,cube_frag:E1,depth_vert:T1,depth_frag:b1,distanceRGBA_vert:A1,distanceRGBA_frag:R1,equirect_vert:C1,equirect_frag:w1,linedashed_vert:D1,linedashed_frag:U1,meshbasic_vert:N1,meshbasic_frag:L1,meshlambert_vert:O1,meshlambert_frag:P1,meshmatcap_vert:z1,meshmatcap_frag:I1,meshnormal_vert:B1,meshnormal_frag:F1,meshphong_vert:H1,meshphong_frag:G1,meshphysical_vert:V1,meshphysical_frag:k1,meshtoon_vert:X1,meshtoon_frag:q1,points_vert:Y1,points_frag:W1,shadow_vert:j1,shadow_frag:Z1,sprite_vert:K1,sprite_frag:Q1},It={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new pe},alphaMap:{value:null},alphaMapTransform:{value:new pe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new pe}},envmap:{envMap:{value:null},envMapRotation:{value:new pe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new pe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new pe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new pe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new pe},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new pe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new pe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new pe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new pe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new pe},alphaTest:{value:0},uvTransform:{value:new pe}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new pe},alphaMap:{value:null},alphaMapTransform:{value:new pe},alphaTest:{value:0}}},Qi={basic:{uniforms:Gn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.fog]),vertexShader:me.meshbasic_vert,fragmentShader:me.meshbasic_frag},lambert:{uniforms:Gn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new Ue(0)}}]),vertexShader:me.meshlambert_vert,fragmentShader:me.meshlambert_frag},phong:{uniforms:Gn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30}}]),vertexShader:me.meshphong_vert,fragmentShader:me.meshphong_frag},standard:{uniforms:Gn([It.common,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.roughnessmap,It.metalnessmap,It.fog,It.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:me.meshphysical_vert,fragmentShader:me.meshphysical_frag},toon:{uniforms:Gn([It.common,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.gradientmap,It.fog,It.lights,{emissive:{value:new Ue(0)}}]),vertexShader:me.meshtoon_vert,fragmentShader:me.meshtoon_frag},matcap:{uniforms:Gn([It.common,It.bumpmap,It.normalmap,It.displacementmap,It.fog,{matcap:{value:null}}]),vertexShader:me.meshmatcap_vert,fragmentShader:me.meshmatcap_frag},points:{uniforms:Gn([It.points,It.fog]),vertexShader:me.points_vert,fragmentShader:me.points_frag},dashed:{uniforms:Gn([It.common,It.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:me.linedashed_vert,fragmentShader:me.linedashed_frag},depth:{uniforms:Gn([It.common,It.displacementmap]),vertexShader:me.depth_vert,fragmentShader:me.depth_frag},normal:{uniforms:Gn([It.common,It.bumpmap,It.normalmap,It.displacementmap,{opacity:{value:1}}]),vertexShader:me.meshnormal_vert,fragmentShader:me.meshnormal_frag},sprite:{uniforms:Gn([It.sprite,It.fog]),vertexShader:me.sprite_vert,fragmentShader:me.sprite_frag},background:{uniforms:{uvTransform:{value:new pe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:me.background_vert,fragmentShader:me.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new pe}},vertexShader:me.backgroundCube_vert,fragmentShader:me.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:me.cube_vert,fragmentShader:me.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:me.equirect_vert,fragmentShader:me.equirect_frag},distanceRGBA:{uniforms:Gn([It.common,It.displacementmap,{referencePosition:{value:new et},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:me.distanceRGBA_vert,fragmentShader:me.distanceRGBA_frag},shadow:{uniforms:Gn([It.lights,It.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:me.shadow_vert,fragmentShader:me.shadow_frag}};Qi.physical={uniforms:Gn([Qi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new pe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new pe},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new pe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new pe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new pe},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new pe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new pe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new pe},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new pe},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new pe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new pe},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new pe}}]),vertexShader:me.meshphysical_vert,fragmentShader:me.meshphysical_frag};const dc={r:0,b:0,g:0},Xs=new Da,J1=new _n;function $1(o,e,i,r,u,f,h){const d=new Ue(0);let m=f===!0?0:1,g,v,_=null,x=0,M=null;function A(z){let U=z.isScene===!0?z.background:null;return U&&U.isTexture&&(U=(z.backgroundBlurriness>0?i:e).get(U)),U}function C(z){let U=!1;const V=A(z);V===null?S(d,m):V&&V.isColor&&(S(V,1),U=!0);const H=o.xr.getEnvironmentBlendMode();H==="additive"?r.buffers.color.setClear(0,0,0,1,h):H==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,h),(o.autoClear||U)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function y(z,U){const V=A(U);V&&(V.isCubeTexture||V.mapping===wc)?(v===void 0&&(v=new Ii(new Ml(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:co(Qi.backgroundCube.uniforms),vertexShader:Qi.backgroundCube.vertexShader,fragmentShader:Qi.backgroundCube.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),v.geometry.deleteAttribute("normal"),v.geometry.deleteAttribute("uv"),v.onBeforeRender=function(H,O,q){this.matrixWorld.copyPosition(q.matrixWorld)},Object.defineProperty(v.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),u.update(v)),Xs.copy(U.backgroundRotation),Xs.x*=-1,Xs.y*=-1,Xs.z*=-1,V.isCubeTexture&&V.isRenderTargetTexture===!1&&(Xs.y*=-1,Xs.z*=-1),v.material.uniforms.envMap.value=V,v.material.uniforms.flipEnvMap.value=V.isCubeTexture&&V.isRenderTargetTexture===!1?-1:1,v.material.uniforms.backgroundBlurriness.value=U.backgroundBlurriness,v.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,v.material.uniforms.backgroundRotation.value.setFromMatrix4(J1.makeRotationFromEuler(Xs)),v.material.toneMapped=De.getTransfer(V.colorSpace)!==ke,(_!==V||x!==V.version||M!==o.toneMapping)&&(v.material.needsUpdate=!0,_=V,x=V.version,M=o.toneMapping),v.layers.enableAll(),z.unshift(v,v.geometry,v.material,0,0,null)):V&&V.isTexture&&(g===void 0&&(g=new Ii(new Uc(2,2),new Vn({name:"BackgroundMaterial",uniforms:co(Qi.background.uniforms),vertexShader:Qi.background.vertexShader,fragmentShader:Qi.background.fragmentShader,side:ps,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),g.geometry.deleteAttribute("normal"),Object.defineProperty(g.material,"map",{get:function(){return this.uniforms.t2D.value}}),u.update(g)),g.material.uniforms.t2D.value=V,g.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,g.material.toneMapped=De.getTransfer(V.colorSpace)!==ke,V.matrixAutoUpdate===!0&&V.updateMatrix(),g.material.uniforms.uvTransform.value.copy(V.matrix),(_!==V||x!==V.version||M!==o.toneMapping)&&(g.material.needsUpdate=!0,_=V,x=V.version,M=o.toneMapping),g.layers.enableAll(),z.unshift(g,g.geometry,g.material,0,0,null))}function S(z,U){z.getRGB(dc,zS(o)),r.buffers.color.setClear(dc.r,dc.g,dc.b,U,h)}function I(){v!==void 0&&(v.geometry.dispose(),v.material.dispose(),v=void 0),g!==void 0&&(g.geometry.dispose(),g.material.dispose(),g=void 0)}return{getClearColor:function(){return d},setClearColor:function(z,U=1){d.set(z),m=U,S(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(z){m=z,S(d,m)},render:C,addToRenderList:y,dispose:I}}function tA(o,e){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),r={},u=x(null);let f=u,h=!1;function d(R,G,at,ut,gt){let lt=!1;const W=_(ut,at,G);f!==W&&(f=W,g(f.object)),lt=M(R,ut,at,gt),lt&&A(R,ut,at,gt),gt!==null&&e.update(gt,o.ELEMENT_ARRAY_BUFFER),(lt||h)&&(h=!1,U(R,G,at,ut),gt!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e.get(gt).buffer))}function m(){return o.createVertexArray()}function g(R){return o.bindVertexArray(R)}function v(R){return o.deleteVertexArray(R)}function _(R,G,at){const ut=at.wireframe===!0;let gt=r[R.id];gt===void 0&&(gt={},r[R.id]=gt);let lt=gt[G.id];lt===void 0&&(lt={},gt[G.id]=lt);let W=lt[ut];return W===void 0&&(W=x(m()),lt[ut]=W),W}function x(R){const G=[],at=[],ut=[];for(let gt=0;gt<i;gt++)G[gt]=0,at[gt]=0,ut[gt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:at,attributeDivisors:ut,object:R,attributes:{},index:null}}function M(R,G,at,ut){const gt=f.attributes,lt=G.attributes;let W=0;const st=at.getAttributes();for(const Z in st)if(st[Z].location>=0){const St=gt[Z];let Gt=lt[Z];if(Gt===void 0&&(Z==="instanceMatrix"&&R.instanceMatrix&&(Gt=R.instanceMatrix),Z==="instanceColor"&&R.instanceColor&&(Gt=R.instanceColor)),St===void 0||St.attribute!==Gt||Gt&&St.data!==Gt.data)return!0;W++}return f.attributesNum!==W||f.index!==ut}function A(R,G,at,ut){const gt={},lt=G.attributes;let W=0;const st=at.getAttributes();for(const Z in st)if(st[Z].location>=0){let St=lt[Z];St===void 0&&(Z==="instanceMatrix"&&R.instanceMatrix&&(St=R.instanceMatrix),Z==="instanceColor"&&R.instanceColor&&(St=R.instanceColor));const Gt={};Gt.attribute=St,St&&St.data&&(Gt.data=St.data),gt[Z]=Gt,W++}f.attributes=gt,f.attributesNum=W,f.index=ut}function C(){const R=f.newAttributes;for(let G=0,at=R.length;G<at;G++)R[G]=0}function y(R){S(R,0)}function S(R,G){const at=f.newAttributes,ut=f.enabledAttributes,gt=f.attributeDivisors;at[R]=1,ut[R]===0&&(o.enableVertexAttribArray(R),ut[R]=1),gt[R]!==G&&(o.vertexAttribDivisor(R,G),gt[R]=G)}function I(){const R=f.newAttributes,G=f.enabledAttributes;for(let at=0,ut=G.length;at<ut;at++)G[at]!==R[at]&&(o.disableVertexAttribArray(at),G[at]=0)}function z(R,G,at,ut,gt,lt,W){W===!0?o.vertexAttribIPointer(R,G,at,gt,lt):o.vertexAttribPointer(R,G,at,ut,gt,lt)}function U(R,G,at,ut){C();const gt=ut.attributes,lt=at.getAttributes(),W=G.defaultAttributeValues;for(const st in lt){const Z=lt[st];if(Z.location>=0){let _t=gt[st];if(_t===void 0&&(st==="instanceMatrix"&&R.instanceMatrix&&(_t=R.instanceMatrix),st==="instanceColor"&&R.instanceColor&&(_t=R.instanceColor)),_t!==void 0){const St=_t.normalized,Gt=_t.itemSize,oe=e.get(_t);if(oe===void 0)continue;const be=oe.buffer,P=oe.type,ct=oe.bytesPerElement,J=P===o.INT||P===o.UNSIGNED_INT||_t.gpuType===Hp;if(_t.isInterleavedBufferAttribute){const it=_t.data,yt=it.stride,Ut=_t.offset;if(it.isInstancedInterleavedBuffer){for(let At=0;At<Z.locationSize;At++)S(Z.location+At,it.meshPerAttribute);R.isInstancedMesh!==!0&&ut._maxInstanceCount===void 0&&(ut._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let At=0;At<Z.locationSize;At++)y(Z.location+At);o.bindBuffer(o.ARRAY_BUFFER,be);for(let At=0;At<Z.locationSize;At++)z(Z.location+At,Gt/Z.locationSize,P,St,yt*ct,(Ut+Gt/Z.locationSize*At)*ct,J)}else{if(_t.isInstancedBufferAttribute){for(let it=0;it<Z.locationSize;it++)S(Z.location+it,_t.meshPerAttribute);R.isInstancedMesh!==!0&&ut._maxInstanceCount===void 0&&(ut._maxInstanceCount=_t.meshPerAttribute*_t.count)}else for(let it=0;it<Z.locationSize;it++)y(Z.location+it);o.bindBuffer(o.ARRAY_BUFFER,be);for(let it=0;it<Z.locationSize;it++)z(Z.location+it,Gt/Z.locationSize,P,St,Gt*ct,Gt/Z.locationSize*it*ct,J)}}else if(W!==void 0){const St=W[st];if(St!==void 0)switch(St.length){case 2:o.vertexAttrib2fv(Z.location,St);break;case 3:o.vertexAttrib3fv(Z.location,St);break;case 4:o.vertexAttrib4fv(Z.location,St);break;default:o.vertexAttrib1fv(Z.location,St)}}}}I()}function V(){q();for(const R in r){const G=r[R];for(const at in G){const ut=G[at];for(const gt in ut)v(ut[gt].object),delete ut[gt];delete G[at]}delete r[R]}}function H(R){if(r[R.id]===void 0)return;const G=r[R.id];for(const at in G){const ut=G[at];for(const gt in ut)v(ut[gt].object),delete ut[gt];delete G[at]}delete r[R.id]}function O(R){for(const G in r){const at=r[G];if(at[R.id]===void 0)continue;const ut=at[R.id];for(const gt in ut)v(ut[gt].object),delete ut[gt];delete at[R.id]}}function q(){w(),h=!0,f!==u&&(f=u,g(f.object))}function w(){u.geometry=null,u.program=null,u.wireframe=!1}return{setup:d,reset:q,resetDefaultState:w,dispose:V,releaseStatesOfGeometry:H,releaseStatesOfProgram:O,initAttributes:C,enableAttribute:y,disableUnusedAttributes:I}}function eA(o,e,i){let r;function u(g){r=g}function f(g,v){o.drawArrays(r,g,v),i.update(v,r,1)}function h(g,v,_){_!==0&&(o.drawArraysInstanced(r,g,v,_),i.update(v,r,_))}function d(g,v,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,g,0,v,0,_);let M=0;for(let A=0;A<_;A++)M+=v[A];i.update(M,r,1)}function m(g,v,_,x){if(_===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let A=0;A<g.length;A++)h(g[A],v[A],x[A]);else{M.multiDrawArraysInstancedWEBGL(r,g,0,v,0,x,0,_);let A=0;for(let C=0;C<_;C++)A+=v[C]*x[C];i.update(A,r,1)}}this.setMode=u,this.render=f,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function nA(o,e,i,r){let u;function f(){if(u!==void 0)return u;if(e.has("EXT_texture_filter_anisotropic")===!0){const O=e.get("EXT_texture_filter_anisotropic");u=o.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else u=0;return u}function h(O){return!(O!==zi&&r.convert(O)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(O){const q=O===ta&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(O!==wa&&r.convert(O)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&O!==Ta&&!q)}function m(O){if(O==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let g=i.precision!==void 0?i.precision:"highp";const v=m(g);v!==g&&(console.warn("THREE.WebGLRenderer:",g,"not supported, using",v,"instead."),g=v);const _=i.logarithmicDepthBuffer===!0,x=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),M=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),A=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),C=o.getParameter(o.MAX_TEXTURE_SIZE),y=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),S=o.getParameter(o.MAX_VERTEX_ATTRIBS),I=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),z=o.getParameter(o.MAX_VARYING_VECTORS),U=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),V=A>0,H=o.getParameter(o.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:f,getMaxPrecision:m,textureFormatReadable:h,textureTypeReadable:d,precision:g,logarithmicDepthBuffer:_,reversedDepthBuffer:x,maxTextures:M,maxVertexTextures:A,maxTextureSize:C,maxCubemapSize:y,maxAttributes:S,maxVertexUniforms:I,maxVaryings:z,maxFragmentUniforms:U,vertexTextures:V,maxSamples:H}}function iA(o){const e=this;let i=null,r=0,u=!1,f=!1;const h=new hs,d=new pe,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,x){const M=_.length!==0||x||r!==0||u;return u=x,r=_.length,M},this.beginShadows=function(){f=!0,v(null)},this.endShadows=function(){f=!1},this.setGlobalState=function(_,x){i=v(_,x,0)},this.setState=function(_,x,M){const A=_.clippingPlanes,C=_.clipIntersection,y=_.clipShadows,S=o.get(_);if(!u||A===null||A.length===0||f&&!y)f?v(null):g();else{const I=f?0:r,z=I*4;let U=S.clippingState||null;m.value=U,U=v(A,x,z,M);for(let V=0;V!==z;++V)U[V]=i[V];S.clippingState=U,this.numIntersection=C?this.numPlanes:0,this.numPlanes+=I}};function g(){m.value!==i&&(m.value=i,m.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function v(_,x,M,A){const C=_!==null?_.length:0;let y=null;if(C!==0){if(y=m.value,A!==!0||y===null){const S=M+C*4,I=x.matrixWorldInverse;d.getNormalMatrix(I),(y===null||y.length<S)&&(y=new Float32Array(S));for(let z=0,U=M;z!==C;++z,U+=4)h.copy(_[z]).applyMatrix4(I,d),h.normal.toArray(y,U),y[U+3]=h.constant}m.value=y,m.needsUpdate=!0}return e.numPlanes=C,e.numIntersection=0,y}}function aA(o){let e=new WeakMap;function i(h,d){return d===ep?h.mapping=lo:d===np&&(h.mapping=uo),h}function r(h){if(h&&h.isTexture){const d=h.mapping;if(d===ep||d===np)if(e.has(h)){const m=e.get(h).texture;return i(m,h.mapping)}else{const m=h.image;if(m&&m.height>0){const g=new rT(m.height);return g.fromEquirectangularTexture(o,h),e.set(h,g),h.addEventListener("dispose",u),i(g.texture,h.mapping)}else return null}}return h}function u(h){const d=h.target;d.removeEventListener("dispose",u);const m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function f(){e=new WeakMap}return{get:r,dispose:f}}const eo=4,Fv=[.125,.215,.35,.446,.526,.582],js=20,Id=new Zp,Hv=new Ue;let Bd=null,Fd=0,Hd=0,Gd=!1;const Ys=(1+Math.sqrt(5))/2,$r=1/Ys,Gv=[new et(-Ys,$r,0),new et(Ys,$r,0),new et(-$r,0,Ys),new et($r,0,Ys),new et(0,Ys,-$r),new et(0,Ys,$r),new et(-1,1,-1),new et(1,1,-1),new et(-1,1,1),new et(1,1,1)],sA=new et;class Vv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,i=0,r=.1,u=100,f={}){const{size:h=256,position:d=sA}=f;Bd=this._renderer.getRenderTarget(),Fd=this._renderer.getActiveCubeFace(),Hd=this._renderer.getActiveMipmapLevel(),Gd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,r,u,m,d),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Bd,Fd,Hd),this._renderer.xr.enabled=Gd,e.scissorTest=!1,pc(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===lo||e.mapping===uo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Bd=this._renderer.getRenderTarget(),Fd=this._renderer.getActiveCubeFace(),Hd=this._renderer.getActiveMipmapLevel(),Gd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=i||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,r={magFilter:Ji,minFilter:Ji,generateMipmaps:!1,type:ta,format:zi,colorSpace:ms,depthBuffer:!1},u=kv(e,i,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=kv(e,i,r);const{_lodMax:f}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=rA(f)),this._blurMaterial=oA(f,e,i)}return u}_compileMaterial(e){const i=new Ii(this._lodPlanes[0],e);this._renderer.compile(i,Id)}_sceneToCubeUV(e,i,r,u,f){const m=new Mi(90,1,i,r),g=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],_=this._renderer,x=_.autoClear,M=_.toneMapping;_.getClearColor(Hv),_.toneMapping=Aa,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(u),_.clearDepth(),_.setRenderTarget(null));const C=new jp({name:"PMREM.Background",side:Kn,depthWrite:!1,depthTest:!1}),y=new Ii(new Ml,C);let S=!1;const I=e.background;I?I.isColor&&(C.color.copy(I),e.background=null,S=!0):(C.color.copy(Hv),S=!0);for(let z=0;z<6;z++){const U=z%3;U===0?(m.up.set(0,g[z],0),m.position.set(f.x,f.y,f.z),m.lookAt(f.x+v[z],f.y,f.z)):U===1?(m.up.set(0,0,g[z]),m.position.set(f.x,f.y,f.z),m.lookAt(f.x,f.y+v[z],f.z)):(m.up.set(0,g[z],0),m.position.set(f.x,f.y,f.z),m.lookAt(f.x,f.y,f.z+v[z]));const V=this._cubeSize;pc(u,U*V,z>2?V:0,V,V),_.setRenderTarget(u),S&&_.render(y,m),_.render(e,m)}y.geometry.dispose(),y.material.dispose(),_.toneMapping=M,_.autoClear=x,e.background=I}_textureToCubeUV(e,i){const r=this._renderer,u=e.mapping===lo||e.mapping===uo;u?(this._cubemapMaterial===null&&(this._cubemapMaterial=qv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xv());const f=u?this._cubemapMaterial:this._equirectMaterial,h=new Ii(this._lodPlanes[0],f),d=f.uniforms;d.envMap.value=e;const m=this._cubeSize;pc(i,0,0,3*m,2*m),r.setRenderTarget(i),r.render(h,Id)}_applyPMREM(e){const i=this._renderer,r=i.autoClear;i.autoClear=!1;const u=this._lodPlanes.length;for(let f=1;f<u;f++){const h=Math.sqrt(this._sigmas[f]*this._sigmas[f]-this._sigmas[f-1]*this._sigmas[f-1]),d=Gv[(u-f-1)%Gv.length];this._blur(e,f-1,f,h,d)}i.autoClear=r}_blur(e,i,r,u,f){const h=this._pingPongRenderTarget;this._halfBlur(e,h,i,r,u,"latitudinal",f),this._halfBlur(h,e,r,r,u,"longitudinal",f)}_halfBlur(e,i,r,u,f,h,d){const m=this._renderer,g=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const v=3,_=new Ii(this._lodPlanes[u],g),x=g.uniforms,M=this._sizeLods[r]-1,A=isFinite(f)?Math.PI/(2*M):2*Math.PI/(2*js-1),C=f/A,y=isFinite(f)?1+Math.floor(v*C):js;y>js&&console.warn(`sigmaRadians, ${f}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${js}`);const S=[];let I=0;for(let O=0;O<js;++O){const q=O/C,w=Math.exp(-q*q/2);S.push(w),O===0?I+=w:O<y&&(I+=2*w)}for(let O=0;O<S.length;O++)S[O]=S[O]/I;x.envMap.value=e.texture,x.samples.value=y,x.weights.value=S,x.latitudinal.value=h==="latitudinal",d&&(x.poleAxis.value=d);const{_lodMax:z}=this;x.dTheta.value=A,x.mipInt.value=z-r;const U=this._sizeLods[u],V=3*U*(u>z-eo?u-z+eo:0),H=4*(this._cubeSize-U);pc(i,V,H,3*U,2*U),m.setRenderTarget(i),m.render(_,Id)}}function rA(o){const e=[],i=[],r=[];let u=o;const f=o-eo+1+Fv.length;for(let h=0;h<f;h++){const d=Math.pow(2,u);i.push(d);let m=1/d;h>o-eo?m=Fv[h-o+eo-1]:h===0&&(m=0),r.push(m);const g=1/(d-2),v=-g,_=1+g,x=[v,v,_,v,_,_,v,v,_,_,v,_],M=6,A=6,C=3,y=2,S=1,I=new Float32Array(C*A*M),z=new Float32Array(y*A*M),U=new Float32Array(S*A*M);for(let H=0;H<M;H++){const O=H%3*2/3-1,q=H>2?0:-1,w=[O,q,0,O+2/3,q,0,O+2/3,q+1,0,O,q,0,O+2/3,q+1,0,O,q+1,0];I.set(w,C*A*H),z.set(x,y*A*H);const R=[H,H,H,H,H,H];U.set(R,S*A*H)}const V=new Ua;V.setAttribute("position",new Ti(I,C)),V.setAttribute("uv",new Ti(z,y)),V.setAttribute("faceIndex",new Ti(U,S)),e.push(V),u>eo&&u--}return{lodPlanes:e,sizeLods:i,sigmas:r}}function kv(o,e,i){const r=new Ei(o,e,i);return r.texture.mapping=wc,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function pc(o,e,i,r,u){o.viewport.set(e,i,r,u),o.scissor.set(e,i,r,u)}function oA(o,e,i){const r=new Float32Array(js),u=new et(0,1,0);return new Vn({name:"SphericalGaussianBlur",defines:{n:js,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:u}},vertexShader:Kp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ba,depthTest:!1,depthWrite:!1})}function Xv(){return new Vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Kp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ba,depthTest:!1,depthWrite:!1})}function qv(){return new Vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Kp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ba,depthTest:!1,depthWrite:!1})}function Kp(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function lA(o){let e=new WeakMap,i=null;function r(d){if(d&&d.isTexture){const m=d.mapping,g=m===ep||m===np,v=m===lo||m===uo;if(g||v){let _=e.get(d);const x=_!==void 0?_.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==x)return i===null&&(i=new Vv(o)),_=g?i.fromEquirectangular(d,_):i.fromCubemap(d,_),_.texture.pmremVersion=d.pmremVersion,e.set(d,_),_.texture;if(_!==void 0)return _.texture;{const M=d.image;return g&&M&&M.height>0||v&&M&&u(M)?(i===null&&(i=new Vv(o)),_=g?i.fromEquirectangular(d):i.fromCubemap(d),_.texture.pmremVersion=d.pmremVersion,e.set(d,_),d.addEventListener("dispose",f),_.texture):null}}}return d}function u(d){let m=0;const g=6;for(let v=0;v<g;v++)d[v]!==void 0&&m++;return m===g}function f(d){const m=d.target;m.removeEventListener("dispose",f);const g=e.get(m);g!==void 0&&(e.delete(m),g.dispose())}function h(){e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function uA(o){const e={};function i(r){if(e[r]!==void 0)return e[r];let u;switch(r){case"WEBGL_depth_texture":u=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":u=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":u=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":u=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:u=o.getExtension(r)}return e[r]=u,u}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){const u=i(r);return u===null&&Sl("THREE.WebGLRenderer: "+r+" extension not supported."),u}}}function cA(o,e,i,r){const u={},f=new WeakMap;function h(_){const x=_.target;x.index!==null&&e.remove(x.index);for(const A in x.attributes)e.remove(x.attributes[A]);x.removeEventListener("dispose",h),delete u[x.id];const M=f.get(x);M&&(e.remove(M),f.delete(x)),r.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,i.memory.geometries--}function d(_,x){return u[x.id]===!0||(x.addEventListener("dispose",h),u[x.id]=!0,i.memory.geometries++),x}function m(_){const x=_.attributes;for(const M in x)e.update(x[M],o.ARRAY_BUFFER)}function g(_){const x=[],M=_.index,A=_.attributes.position;let C=0;if(M!==null){const I=M.array;C=M.version;for(let z=0,U=I.length;z<U;z+=3){const V=I[z+0],H=I[z+1],O=I[z+2];x.push(V,H,H,O,O,V)}}else if(A!==void 0){const I=A.array;C=A.version;for(let z=0,U=I.length/3-1;z<U;z+=3){const V=z+0,H=z+1,O=z+2;x.push(V,H,H,O,O,V)}}else return;const y=new(wS(x)?PS:OS)(x,1);y.version=C;const S=f.get(_);S&&e.remove(S),f.set(_,y)}function v(_){const x=f.get(_);if(x){const M=_.index;M!==null&&x.version<M.version&&g(_)}else g(_);return f.get(_)}return{get:d,update:m,getWireframeAttribute:v}}function fA(o,e,i){let r;function u(x){r=x}let f,h;function d(x){f=x.type,h=x.bytesPerElement}function m(x,M){o.drawElements(r,M,f,x*h),i.update(M,r,1)}function g(x,M,A){A!==0&&(o.drawElementsInstanced(r,M,f,x*h,A),i.update(M,r,A))}function v(x,M,A){if(A===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,M,0,f,x,0,A);let y=0;for(let S=0;S<A;S++)y+=M[S];i.update(y,r,1)}function _(x,M,A,C){if(A===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let S=0;S<x.length;S++)g(x[S]/h,M[S],C[S]);else{y.multiDrawElementsInstancedWEBGL(r,M,0,f,x,0,C,0,A);let S=0;for(let I=0;I<A;I++)S+=M[I]*C[I];i.update(S,r,1)}}this.setMode=u,this.setIndex=d,this.render=m,this.renderInstances=g,this.renderMultiDraw=v,this.renderMultiDrawInstances=_}function hA(o){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(f,h,d){switch(i.calls++,h){case o.TRIANGLES:i.triangles+=d*(f/3);break;case o.LINES:i.lines+=d*(f/2);break;case o.LINE_STRIP:i.lines+=d*(f-1);break;case o.LINE_LOOP:i.lines+=d*f;break;case o.POINTS:i.points+=d*f;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function u(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:u,update:r}}function dA(o,e,i){const r=new WeakMap,u=new rn;function f(h,d,m){const g=h.morphTargetInfluences,v=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_=v!==void 0?v.length:0;let x=r.get(d);if(x===void 0||x.count!==_){let R=function(){q.dispose(),r.delete(d),d.removeEventListener("dispose",R)};var M=R;x!==void 0&&x.texture.dispose();const A=d.morphAttributes.position!==void 0,C=d.morphAttributes.normal!==void 0,y=d.morphAttributes.color!==void 0,S=d.morphAttributes.position||[],I=d.morphAttributes.normal||[],z=d.morphAttributes.color||[];let U=0;A===!0&&(U=1),C===!0&&(U=2),y===!0&&(U=3);let V=d.attributes.position.count*U,H=1;V>e.maxTextureSize&&(H=Math.ceil(V/e.maxTextureSize),V=e.maxTextureSize);const O=new Float32Array(V*H*4*_),q=new DS(O,V,H,_);q.type=Ta,q.needsUpdate=!0;const w=U*4;for(let G=0;G<_;G++){const at=S[G],ut=I[G],gt=z[G],lt=V*H*4*G;for(let W=0;W<at.count;W++){const st=W*w;A===!0&&(u.fromBufferAttribute(at,W),O[lt+st+0]=u.x,O[lt+st+1]=u.y,O[lt+st+2]=u.z,O[lt+st+3]=0),C===!0&&(u.fromBufferAttribute(ut,W),O[lt+st+4]=u.x,O[lt+st+5]=u.y,O[lt+st+6]=u.z,O[lt+st+7]=0),y===!0&&(u.fromBufferAttribute(gt,W),O[lt+st+8]=u.x,O[lt+st+9]=u.y,O[lt+st+10]=u.z,O[lt+st+11]=gt.itemSize===4?u.w:1)}}x={count:_,texture:q,size:new ne(V,H)},r.set(d,x),d.addEventListener("dispose",R)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)m.getUniforms().setValue(o,"morphTexture",h.morphTexture,i);else{let A=0;for(let y=0;y<g.length;y++)A+=g[y];const C=d.morphTargetsRelative?1:1-A;m.getUniforms().setValue(o,"morphTargetBaseInfluence",C),m.getUniforms().setValue(o,"morphTargetInfluences",g)}m.getUniforms().setValue(o,"morphTargetsTexture",x.texture,i),m.getUniforms().setValue(o,"morphTargetsTextureSize",x.size)}return{update:f}}function pA(o,e,i,r){let u=new WeakMap;function f(m){const g=r.render.frame,v=m.geometry,_=e.get(m,v);if(u.get(_)!==g&&(e.update(_),u.set(_,g)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),u.get(m)!==g&&(i.update(m.instanceMatrix,o.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,o.ARRAY_BUFFER),u.set(m,g))),m.isSkinnedMesh){const x=m.skeleton;u.get(x)!==g&&(x.update(),u.set(x,g))}return _}function h(){u=new WeakMap}function d(m){const g=m.target;g.removeEventListener("dispose",d),i.remove(g.instanceMatrix),g.instanceColor!==null&&i.remove(g.instanceColor)}return{update:f,dispose:h}}const kS=new Qn,Yv=new HS(1,1),XS=new DS,qS=new XE,YS=new BS,Wv=[],jv=[],Zv=new Float32Array(16),Kv=new Float32Array(9),Qv=new Float32Array(4);function ho(o,e,i){const r=o[0];if(r<=0||r>0)return o;const u=e*i;let f=Wv[u];if(f===void 0&&(f=new Float32Array(u),Wv[u]=f),e!==0){r.toArray(f,0);for(let h=1,d=0;h!==e;++h)d+=i,o[h].toArray(f,d)}return f}function vn(o,e){if(o.length!==e.length)return!1;for(let i=0,r=o.length;i<r;i++)if(o[i]!==e[i])return!1;return!0}function Sn(o,e){for(let i=0,r=e.length;i<r;i++)o[i]=e[i]}function Nc(o,e){let i=jv[e];i===void 0&&(i=new Int32Array(e),jv[e]=i);for(let r=0;r!==e;++r)i[r]=o.allocateTextureUnit();return i}function mA(o,e){const i=this.cache;i[0]!==e&&(o.uniform1f(this.addr,e),i[0]=e)}function gA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(vn(i,e))return;o.uniform2fv(this.addr,e),Sn(i,e)}}function _A(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(vn(i,e))return;o.uniform3fv(this.addr,e),Sn(i,e)}}function vA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(vn(i,e))return;o.uniform4fv(this.addr,e),Sn(i,e)}}function SA(o,e){const i=this.cache,r=e.elements;if(r===void 0){if(vn(i,e))return;o.uniformMatrix2fv(this.addr,!1,e),Sn(i,e)}else{if(vn(i,r))return;Qv.set(r),o.uniformMatrix2fv(this.addr,!1,Qv),Sn(i,r)}}function xA(o,e){const i=this.cache,r=e.elements;if(r===void 0){if(vn(i,e))return;o.uniformMatrix3fv(this.addr,!1,e),Sn(i,e)}else{if(vn(i,r))return;Kv.set(r),o.uniformMatrix3fv(this.addr,!1,Kv),Sn(i,r)}}function yA(o,e){const i=this.cache,r=e.elements;if(r===void 0){if(vn(i,e))return;o.uniformMatrix4fv(this.addr,!1,e),Sn(i,e)}else{if(vn(i,r))return;Zv.set(r),o.uniformMatrix4fv(this.addr,!1,Zv),Sn(i,r)}}function MA(o,e){const i=this.cache;i[0]!==e&&(o.uniform1i(this.addr,e),i[0]=e)}function EA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(vn(i,e))return;o.uniform2iv(this.addr,e),Sn(i,e)}}function TA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(vn(i,e))return;o.uniform3iv(this.addr,e),Sn(i,e)}}function bA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(vn(i,e))return;o.uniform4iv(this.addr,e),Sn(i,e)}}function AA(o,e){const i=this.cache;i[0]!==e&&(o.uniform1ui(this.addr,e),i[0]=e)}function RA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(vn(i,e))return;o.uniform2uiv(this.addr,e),Sn(i,e)}}function CA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(vn(i,e))return;o.uniform3uiv(this.addr,e),Sn(i,e)}}function wA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(vn(i,e))return;o.uniform4uiv(this.addr,e),Sn(i,e)}}function DA(o,e,i){const r=this.cache,u=i.allocateTextureUnit();r[0]!==u&&(o.uniform1i(this.addr,u),r[0]=u);let f;this.type===o.SAMPLER_2D_SHADOW?(Yv.compareFunction=CS,f=Yv):f=kS,i.setTexture2D(e||f,u)}function UA(o,e,i){const r=this.cache,u=i.allocateTextureUnit();r[0]!==u&&(o.uniform1i(this.addr,u),r[0]=u),i.setTexture3D(e||qS,u)}function NA(o,e,i){const r=this.cache,u=i.allocateTextureUnit();r[0]!==u&&(o.uniform1i(this.addr,u),r[0]=u),i.setTextureCube(e||YS,u)}function LA(o,e,i){const r=this.cache,u=i.allocateTextureUnit();r[0]!==u&&(o.uniform1i(this.addr,u),r[0]=u),i.setTexture2DArray(e||XS,u)}function OA(o){switch(o){case 5126:return mA;case 35664:return gA;case 35665:return _A;case 35666:return vA;case 35674:return SA;case 35675:return xA;case 35676:return yA;case 5124:case 35670:return MA;case 35667:case 35671:return EA;case 35668:case 35672:return TA;case 35669:case 35673:return bA;case 5125:return AA;case 36294:return RA;case 36295:return CA;case 36296:return wA;case 35678:case 36198:case 36298:case 36306:case 35682:return DA;case 35679:case 36299:case 36307:return UA;case 35680:case 36300:case 36308:case 36293:return NA;case 36289:case 36303:case 36311:case 36292:return LA}}function PA(o,e){o.uniform1fv(this.addr,e)}function zA(o,e){const i=ho(e,this.size,2);o.uniform2fv(this.addr,i)}function IA(o,e){const i=ho(e,this.size,3);o.uniform3fv(this.addr,i)}function BA(o,e){const i=ho(e,this.size,4);o.uniform4fv(this.addr,i)}function FA(o,e){const i=ho(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,i)}function HA(o,e){const i=ho(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,i)}function GA(o,e){const i=ho(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,i)}function VA(o,e){o.uniform1iv(this.addr,e)}function kA(o,e){o.uniform2iv(this.addr,e)}function XA(o,e){o.uniform3iv(this.addr,e)}function qA(o,e){o.uniform4iv(this.addr,e)}function YA(o,e){o.uniform1uiv(this.addr,e)}function WA(o,e){o.uniform2uiv(this.addr,e)}function jA(o,e){o.uniform3uiv(this.addr,e)}function ZA(o,e){o.uniform4uiv(this.addr,e)}function KA(o,e,i){const r=this.cache,u=e.length,f=Nc(i,u);vn(r,f)||(o.uniform1iv(this.addr,f),Sn(r,f));for(let h=0;h!==u;++h)i.setTexture2D(e[h]||kS,f[h])}function QA(o,e,i){const r=this.cache,u=e.length,f=Nc(i,u);vn(r,f)||(o.uniform1iv(this.addr,f),Sn(r,f));for(let h=0;h!==u;++h)i.setTexture3D(e[h]||qS,f[h])}function JA(o,e,i){const r=this.cache,u=e.length,f=Nc(i,u);vn(r,f)||(o.uniform1iv(this.addr,f),Sn(r,f));for(let h=0;h!==u;++h)i.setTextureCube(e[h]||YS,f[h])}function $A(o,e,i){const r=this.cache,u=e.length,f=Nc(i,u);vn(r,f)||(o.uniform1iv(this.addr,f),Sn(r,f));for(let h=0;h!==u;++h)i.setTexture2DArray(e[h]||XS,f[h])}function tR(o){switch(o){case 5126:return PA;case 35664:return zA;case 35665:return IA;case 35666:return BA;case 35674:return FA;case 35675:return HA;case 35676:return GA;case 5124:case 35670:return VA;case 35667:case 35671:return kA;case 35668:case 35672:return XA;case 35669:case 35673:return qA;case 5125:return YA;case 36294:return WA;case 36295:return jA;case 36296:return ZA;case 35678:case 36198:case 36298:case 36306:case 35682:return KA;case 35679:case 36299:case 36307:return QA;case 35680:case 36300:case 36308:case 36293:return JA;case 36289:case 36303:case 36311:case 36292:return $A}}class eR{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.setValue=OA(i.type)}}class nR{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=tR(i.type)}}class iR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,r){const u=this.seq;for(let f=0,h=u.length;f!==h;++f){const d=u[f];d.setValue(e,i[d.id],r)}}}const Vd=/(\w+)(\])?(\[|\.)?/g;function Jv(o,e){o.seq.push(e),o.map[e.id]=e}function aR(o,e,i){const r=o.name,u=r.length;for(Vd.lastIndex=0;;){const f=Vd.exec(r),h=Vd.lastIndex;let d=f[1];const m=f[2]==="]",g=f[3];if(m&&(d=d|0),g===void 0||g==="["&&h+2===u){Jv(i,g===void 0?new eR(d,o,e):new nR(d,o,e));break}else{let _=i.map[d];_===void 0&&(_=new iR(d),Jv(i,_)),i=_}}}class Mc{constructor(e,i){this.seq=[],this.map={};const r=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let u=0;u<r;++u){const f=e.getActiveUniform(i,u),h=e.getUniformLocation(i,f.name);aR(f,h,this)}}setValue(e,i,r,u){const f=this.map[i];f!==void 0&&f.setValue(e,r,u)}setOptional(e,i,r){const u=i[r];u!==void 0&&this.setValue(e,r,u)}static upload(e,i,r,u){for(let f=0,h=i.length;f!==h;++f){const d=i[f],m=r[d.id];m.needsUpdate!==!1&&d.setValue(e,m.value,u)}}static seqWithValue(e,i){const r=[];for(let u=0,f=e.length;u!==f;++u){const h=e[u];h.id in i&&r.push(h)}return r}}function $v(o,e,i){const r=o.createShader(e);return o.shaderSource(r,i),o.compileShader(r),r}const sR=37297;let rR=0;function oR(o,e){const i=o.split(`
`),r=[],u=Math.max(e-6,0),f=Math.min(e+6,i.length);for(let h=u;h<f;h++){const d=h+1;r.push(`${d===e?">":" "} ${d}: ${i[h]}`)}return r.join(`
`)}const tS=new pe;function lR(o){De._getMatrix(tS,De.workingColorSpace,o);const e=`mat3( ${tS.elements.map(i=>i.toFixed(4))} )`;switch(De.getTransfer(o)){case bc:return[e,"LinearTransferOETF"];case ke:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",o),[e,"LinearTransferOETF"]}}function eS(o,e,i){const r=o.getShaderParameter(e,o.COMPILE_STATUS),f=(o.getShaderInfoLog(e)||"").trim();if(r&&f==="")return"";const h=/ERROR: 0:(\d+)/.exec(f);if(h){const d=parseInt(h[1]);return i.toUpperCase()+`

`+f+`

`+oR(o.getShaderSource(e),d)}else return f}function uR(o,e){const i=lR(e);return[`vec4 ${o}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function cR(o,e){let i;switch(e){case gE:i="Linear";break;case _E:i="Reinhard";break;case vE:i="Cineon";break;case SE:i="ACESFilmic";break;case yE:i="AgX";break;case ME:i="Neutral";break;case xE:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),i="Linear"}return"vec3 "+o+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const mc=new et;function fR(){De.getLuminanceCoefficients(mc);const o=mc.x.toFixed(4),e=mc.y.toFixed(4),i=mc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function hR(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(hl).join(`
`)}function dR(o){const e=[];for(const i in o){const r=o[i];r!==!1&&e.push("#define "+i+" "+r)}return e.join(`
`)}function pR(o,e){const i={},r=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let u=0;u<r;u++){const f=o.getActiveAttrib(e,u),h=f.name;let d=1;f.type===o.FLOAT_MAT2&&(d=2),f.type===o.FLOAT_MAT3&&(d=3),f.type===o.FLOAT_MAT4&&(d=4),i[h]={type:f.type,location:o.getAttribLocation(e,h),locationSize:d}}return i}function hl(o){return o!==""}function nS(o,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function iS(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const mR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Op(o){return o.replace(mR,_R)}const gR=new Map;function _R(o,e){let i=me[e];if(i===void 0){const r=gR.get(e);if(r!==void 0)i=me[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return Op(i)}const vR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function aS(o){return o.replace(vR,SR)}function SR(o,e,i,r){let u="";for(let f=parseInt(e);f<parseInt(i);f++)u+=r.replace(/\[\s*i\s*\]/g,"[ "+f+" ]").replace(/UNROLLED_LOOP_INDEX/g,f);return u}function sS(o){let e=`precision ${o.precision} float;
	precision ${o.precision} int;
	precision ${o.precision} sampler2D;
	precision ${o.precision} samplerCube;
	precision ${o.precision} sampler3D;
	precision ${o.precision} sampler2DArray;
	precision ${o.precision} sampler2DShadow;
	precision ${o.precision} samplerCubeShadow;
	precision ${o.precision} sampler2DArrayShadow;
	precision ${o.precision} isampler2D;
	precision ${o.precision} isampler3D;
	precision ${o.precision} isamplerCube;
	precision ${o.precision} isampler2DArray;
	precision ${o.precision} usampler2D;
	precision ${o.precision} usampler3D;
	precision ${o.precision} usamplerCube;
	precision ${o.precision} usampler2DArray;
	`;return o.precision==="highp"?e+=`
#define HIGH_PRECISION`:o.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function xR(o){let e="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===_S?e="SHADOWMAP_TYPE_PCF":o.shadowMapType===ZM?e="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===Ma&&(e="SHADOWMAP_TYPE_VSM"),e}function yR(o){let e="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case lo:case uo:e="ENVMAP_TYPE_CUBE";break;case wc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function MR(o){let e="ENVMAP_MODE_REFLECTION";return o.envMap&&o.envMapMode===uo&&(e="ENVMAP_MODE_REFRACTION"),e}function ER(o){let e="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case vS:e="ENVMAP_BLENDING_MULTIPLY";break;case pE:e="ENVMAP_BLENDING_MIX";break;case mE:e="ENVMAP_BLENDING_ADD";break}return e}function TR(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:r,maxMip:i}}function bR(o,e,i,r){const u=o.getContext(),f=i.defines;let h=i.vertexShader,d=i.fragmentShader;const m=xR(i),g=yR(i),v=MR(i),_=ER(i),x=TR(i),M=hR(i),A=dR(f),C=u.createProgram();let y,S,I=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A].filter(hl).join(`
`),y.length>0&&(y+=`
`),S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A].filter(hl).join(`
`),S.length>0&&(S+=`
`)):(y=[sS(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+v:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hl).join(`
`),S=[sS(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+g:"",i.envMap?"#define "+v:"",i.envMap?"#define "+_:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Aa?"#define TONE_MAPPING":"",i.toneMapping!==Aa?me.tonemapping_pars_fragment:"",i.toneMapping!==Aa?cR("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",me.colorspace_pars_fragment,uR("linearToOutputTexel",i.outputColorSpace),fR(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(hl).join(`
`)),h=Op(h),h=nS(h,i),h=iS(h,i),d=Op(d),d=nS(d,i),d=iS(d,i),h=aS(h),d=aS(d),i.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,y=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,S=["#define varying in",i.glslVersion===Sv?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===Sv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const z=I+y+h,U=I+S+d,V=$v(u,u.VERTEX_SHADER,z),H=$v(u,u.FRAGMENT_SHADER,U);u.attachShader(C,V),u.attachShader(C,H),i.index0AttributeName!==void 0?u.bindAttribLocation(C,0,i.index0AttributeName):i.morphTargets===!0&&u.bindAttribLocation(C,0,"position"),u.linkProgram(C);function O(G){if(o.debug.checkShaderErrors){const at=u.getProgramInfoLog(C)||"",ut=u.getShaderInfoLog(V)||"",gt=u.getShaderInfoLog(H)||"",lt=at.trim(),W=ut.trim(),st=gt.trim();let Z=!0,_t=!0;if(u.getProgramParameter(C,u.LINK_STATUS)===!1)if(Z=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(u,C,V,H);else{const St=eS(u,V,"vertex"),Gt=eS(u,H,"fragment");console.error("THREE.WebGLProgram: Shader Error "+u.getError()+" - VALIDATE_STATUS "+u.getProgramParameter(C,u.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+lt+`
`+St+`
`+Gt)}else lt!==""?console.warn("THREE.WebGLProgram: Program Info Log:",lt):(W===""||st==="")&&(_t=!1);_t&&(G.diagnostics={runnable:Z,programLog:lt,vertexShader:{log:W,prefix:y},fragmentShader:{log:st,prefix:S}})}u.deleteShader(V),u.deleteShader(H),q=new Mc(u,C),w=pR(u,C)}let q;this.getUniforms=function(){return q===void 0&&O(this),q};let w;this.getAttributes=function(){return w===void 0&&O(this),w};let R=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=u.getProgramParameter(C,sR)),R},this.destroy=function(){r.releaseStatesOfProgram(this),u.deleteProgram(C),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=rR++,this.cacheKey=e,this.usedTimes=1,this.program=C,this.vertexShader=V,this.fragmentShader=H,this}let AR=0;class RR{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,r=e.fragmentShader,u=this._getShaderStage(i),f=this._getShaderStage(r),h=this._getShaderCacheForMaterial(e);return h.has(u)===!1&&(h.add(u),u.usedTimes++),h.has(f)===!1&&(h.add(f),f.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const r of i)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let r=i.get(e);return r===void 0&&(r=new Set,i.set(e,r)),r}_getShaderStage(e){const i=this.shaderCache;let r=i.get(e);return r===void 0&&(r=new CR(e),i.set(e,r)),r}}class CR{constructor(e){this.id=AR++,this.code=e,this.usedTimes=0}}function wR(o,e,i,r,u,f,h){const d=new NS,m=new RR,g=new Set,v=[],_=u.logarithmicDepthBuffer,x=u.vertexTextures;let M=u.precision;const A={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function C(w){return g.add(w),w===0?"uv":`uv${w}`}function y(w,R,G,at,ut){const gt=at.fog,lt=ut.geometry,W=w.isMeshStandardMaterial?at.environment:null,st=(w.isMeshStandardMaterial?i:e).get(w.envMap||W),Z=st&&st.mapping===wc?st.image.height:null,_t=A[w.type];w.precision!==null&&(M=u.getMaxPrecision(w.precision),M!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",M,"instead."));const St=lt.morphAttributes.position||lt.morphAttributes.normal||lt.morphAttributes.color,Gt=St!==void 0?St.length:0;let oe=0;lt.morphAttributes.position!==void 0&&(oe=1),lt.morphAttributes.normal!==void 0&&(oe=2),lt.morphAttributes.color!==void 0&&(oe=3);let be,P,ct,J;if(_t){const Me=Qi[_t];be=Me.vertexShader,P=Me.fragmentShader}else be=w.vertexShader,P=w.fragmentShader,m.update(w),ct=m.getVertexShaderID(w),J=m.getFragmentShaderID(w);const it=o.getRenderTarget(),yt=o.state.buffers.depth.getReversed(),Ut=ut.isInstancedMesh===!0,At=ut.isBatchedMesh===!0,Mt=!!w.map,Yt=!!w.matcap,L=!!st,He=!!w.aoMap,re=!!w.lightMap,Qt=!!w.bumpMap,Nt=!!w.normalMap,ae=!!w.displacementMap,Ft=!!w.emissiveMap,le=!!w.metalnessMap,qe=!!w.roughnessMap,We=w.anisotropy>0,D=w.clearcoat>0,T=w.dispersion>0,tt=w.iridescence>0,dt=w.sheen>0,vt=w.transmission>0,ft=We&&!!w.anisotropyMap,kt=D&&!!w.clearcoatMap,Rt=D&&!!w.clearcoatNormalMap,jt=D&&!!w.clearcoatRoughnessMap,Kt=tt&&!!w.iridescenceMap,Tt=tt&&!!w.iridescenceThicknessMap,Ot=dt&&!!w.sheenColorMap,ie=dt&&!!w.sheenRoughnessMap,Zt=!!w.specularMap,Pt=!!w.specularColorMap,fe=!!w.specularIntensityMap,F=vt&&!!w.transmissionMap,bt=vt&&!!w.thicknessMap,wt=!!w.gradientMap,Vt=!!w.alphaMap,xt=w.alphaTest>0,mt=!!w.alphaHash,Wt=!!w.extensions;let ce=Aa;w.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(ce=o.toneMapping);const Ge={shaderID:_t,shaderType:w.type,shaderName:w.name,vertexShader:be,fragmentShader:P,defines:w.defines,customVertexShaderID:ct,customFragmentShaderID:J,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:M,batching:At,batchingColor:At&&ut._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&ut.instanceColor!==null,instancingMorph:Ut&&ut.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:it===null?o.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:ms,alphaToCoverage:!!w.alphaToCoverage,map:Mt,matcap:Yt,envMap:L,envMapMode:L&&st.mapping,envMapCubeUVHeight:Z,aoMap:He,lightMap:re,bumpMap:Qt,normalMap:Nt,displacementMap:x&&ae,emissiveMap:Ft,normalMapObjectSpace:Nt&&w.normalMapType===RE,normalMapTangentSpace:Nt&&w.normalMapType===AE,metalnessMap:le,roughnessMap:qe,anisotropy:We,anisotropyMap:ft,clearcoat:D,clearcoatMap:kt,clearcoatNormalMap:Rt,clearcoatRoughnessMap:jt,dispersion:T,iridescence:tt,iridescenceMap:Kt,iridescenceThicknessMap:Tt,sheen:dt,sheenColorMap:Ot,sheenRoughnessMap:ie,specularMap:Zt,specularColorMap:Pt,specularIntensityMap:fe,transmission:vt,transmissionMap:F,thicknessMap:bt,gradientMap:wt,opaque:w.transparent===!1&&w.blending===ao&&w.alphaToCoverage===!1,alphaMap:Vt,alphaTest:xt,alphaHash:mt,combine:w.combine,mapUv:Mt&&C(w.map.channel),aoMapUv:He&&C(w.aoMap.channel),lightMapUv:re&&C(w.lightMap.channel),bumpMapUv:Qt&&C(w.bumpMap.channel),normalMapUv:Nt&&C(w.normalMap.channel),displacementMapUv:ae&&C(w.displacementMap.channel),emissiveMapUv:Ft&&C(w.emissiveMap.channel),metalnessMapUv:le&&C(w.metalnessMap.channel),roughnessMapUv:qe&&C(w.roughnessMap.channel),anisotropyMapUv:ft&&C(w.anisotropyMap.channel),clearcoatMapUv:kt&&C(w.clearcoatMap.channel),clearcoatNormalMapUv:Rt&&C(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:jt&&C(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Kt&&C(w.iridescenceMap.channel),iridescenceThicknessMapUv:Tt&&C(w.iridescenceThicknessMap.channel),sheenColorMapUv:Ot&&C(w.sheenColorMap.channel),sheenRoughnessMapUv:ie&&C(w.sheenRoughnessMap.channel),specularMapUv:Zt&&C(w.specularMap.channel),specularColorMapUv:Pt&&C(w.specularColorMap.channel),specularIntensityMapUv:fe&&C(w.specularIntensityMap.channel),transmissionMapUv:F&&C(w.transmissionMap.channel),thicknessMapUv:bt&&C(w.thicknessMap.channel),alphaMapUv:Vt&&C(w.alphaMap.channel),vertexTangents:!!lt.attributes.tangent&&(Nt||We),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!lt.attributes.color&&lt.attributes.color.itemSize===4,pointsUvs:ut.isPoints===!0&&!!lt.attributes.uv&&(Mt||Vt),fog:!!gt,useFog:w.fog===!0,fogExp2:!!gt&&gt.isFogExp2,flatShading:w.flatShading===!0&&w.wireframe===!1,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:yt,skinning:ut.isSkinnedMesh===!0,morphTargets:lt.morphAttributes.position!==void 0,morphNormals:lt.morphAttributes.normal!==void 0,morphColors:lt.morphAttributes.color!==void 0,morphTargetsCount:Gt,morphTextureStride:oe,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:w.dithering,shadowMapEnabled:o.shadowMap.enabled&&G.length>0,shadowMapType:o.shadowMap.type,toneMapping:ce,decodeVideoTexture:Mt&&w.map.isVideoTexture===!0&&De.getTransfer(w.map.colorSpace)===ke,decodeVideoTextureEmissive:Ft&&w.emissiveMap.isVideoTexture===!0&&De.getTransfer(w.emissiveMap.colorSpace)===ke,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Ea,flipSided:w.side===Kn,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Wt&&w.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Wt&&w.extensions.multiDraw===!0||At)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Ge.vertexUv1s=g.has(1),Ge.vertexUv2s=g.has(2),Ge.vertexUv3s=g.has(3),g.clear(),Ge}function S(w){const R=[];if(w.shaderID?R.push(w.shaderID):(R.push(w.customVertexShaderID),R.push(w.customFragmentShaderID)),w.defines!==void 0)for(const G in w.defines)R.push(G),R.push(w.defines[G]);return w.isRawShaderMaterial===!1&&(I(R,w),z(R,w),R.push(o.outputColorSpace)),R.push(w.customProgramCacheKey),R.join()}function I(w,R){w.push(R.precision),w.push(R.outputColorSpace),w.push(R.envMapMode),w.push(R.envMapCubeUVHeight),w.push(R.mapUv),w.push(R.alphaMapUv),w.push(R.lightMapUv),w.push(R.aoMapUv),w.push(R.bumpMapUv),w.push(R.normalMapUv),w.push(R.displacementMapUv),w.push(R.emissiveMapUv),w.push(R.metalnessMapUv),w.push(R.roughnessMapUv),w.push(R.anisotropyMapUv),w.push(R.clearcoatMapUv),w.push(R.clearcoatNormalMapUv),w.push(R.clearcoatRoughnessMapUv),w.push(R.iridescenceMapUv),w.push(R.iridescenceThicknessMapUv),w.push(R.sheenColorMapUv),w.push(R.sheenRoughnessMapUv),w.push(R.specularMapUv),w.push(R.specularColorMapUv),w.push(R.specularIntensityMapUv),w.push(R.transmissionMapUv),w.push(R.thicknessMapUv),w.push(R.combine),w.push(R.fogExp2),w.push(R.sizeAttenuation),w.push(R.morphTargetsCount),w.push(R.morphAttributeCount),w.push(R.numDirLights),w.push(R.numPointLights),w.push(R.numSpotLights),w.push(R.numSpotLightMaps),w.push(R.numHemiLights),w.push(R.numRectAreaLights),w.push(R.numDirLightShadows),w.push(R.numPointLightShadows),w.push(R.numSpotLightShadows),w.push(R.numSpotLightShadowsWithMaps),w.push(R.numLightProbes),w.push(R.shadowMapType),w.push(R.toneMapping),w.push(R.numClippingPlanes),w.push(R.numClipIntersection),w.push(R.depthPacking)}function z(w,R){d.disableAll(),R.supportsVertexTextures&&d.enable(0),R.instancing&&d.enable(1),R.instancingColor&&d.enable(2),R.instancingMorph&&d.enable(3),R.matcap&&d.enable(4),R.envMap&&d.enable(5),R.normalMapObjectSpace&&d.enable(6),R.normalMapTangentSpace&&d.enable(7),R.clearcoat&&d.enable(8),R.iridescence&&d.enable(9),R.alphaTest&&d.enable(10),R.vertexColors&&d.enable(11),R.vertexAlphas&&d.enable(12),R.vertexUv1s&&d.enable(13),R.vertexUv2s&&d.enable(14),R.vertexUv3s&&d.enable(15),R.vertexTangents&&d.enable(16),R.anisotropy&&d.enable(17),R.alphaHash&&d.enable(18),R.batching&&d.enable(19),R.dispersion&&d.enable(20),R.batchingColor&&d.enable(21),R.gradientMap&&d.enable(22),w.push(d.mask),d.disableAll(),R.fog&&d.enable(0),R.useFog&&d.enable(1),R.flatShading&&d.enable(2),R.logarithmicDepthBuffer&&d.enable(3),R.reversedDepthBuffer&&d.enable(4),R.skinning&&d.enable(5),R.morphTargets&&d.enable(6),R.morphNormals&&d.enable(7),R.morphColors&&d.enable(8),R.premultipliedAlpha&&d.enable(9),R.shadowMapEnabled&&d.enable(10),R.doubleSided&&d.enable(11),R.flipSided&&d.enable(12),R.useDepthPacking&&d.enable(13),R.dithering&&d.enable(14),R.transmission&&d.enable(15),R.sheen&&d.enable(16),R.opaque&&d.enable(17),R.pointsUvs&&d.enable(18),R.decodeVideoTexture&&d.enable(19),R.decodeVideoTextureEmissive&&d.enable(20),R.alphaToCoverage&&d.enable(21),w.push(d.mask)}function U(w){const R=A[w.type];let G;if(R){const at=Qi[R];G=Cc.clone(at.uniforms)}else G=w.uniforms;return G}function V(w,R){let G;for(let at=0,ut=v.length;at<ut;at++){const gt=v[at];if(gt.cacheKey===R){G=gt,++G.usedTimes;break}}return G===void 0&&(G=new bR(o,R,w,f),v.push(G)),G}function H(w){if(--w.usedTimes===0){const R=v.indexOf(w);v[R]=v[v.length-1],v.pop(),w.destroy()}}function O(w){m.remove(w)}function q(){m.dispose()}return{getParameters:y,getProgramCacheKey:S,getUniforms:U,acquireProgram:V,releaseProgram:H,releaseShaderCache:O,programs:v,dispose:q}}function DR(){let o=new WeakMap;function e(h){return o.has(h)}function i(h){let d=o.get(h);return d===void 0&&(d={},o.set(h,d)),d}function r(h){o.delete(h)}function u(h,d,m){o.get(h)[d]=m}function f(){o=new WeakMap}return{has:e,get:i,remove:r,update:u,dispose:f}}function UR(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.z!==e.z?o.z-e.z:o.id-e.id}function rS(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function oS(){const o=[];let e=0;const i=[],r=[],u=[];function f(){e=0,i.length=0,r.length=0,u.length=0}function h(_,x,M,A,C,y){let S=o[e];return S===void 0?(S={id:_.id,object:_,geometry:x,material:M,groupOrder:A,renderOrder:_.renderOrder,z:C,group:y},o[e]=S):(S.id=_.id,S.object=_,S.geometry=x,S.material=M,S.groupOrder=A,S.renderOrder=_.renderOrder,S.z=C,S.group=y),e++,S}function d(_,x,M,A,C,y){const S=h(_,x,M,A,C,y);M.transmission>0?r.push(S):M.transparent===!0?u.push(S):i.push(S)}function m(_,x,M,A,C,y){const S=h(_,x,M,A,C,y);M.transmission>0?r.unshift(S):M.transparent===!0?u.unshift(S):i.unshift(S)}function g(_,x){i.length>1&&i.sort(_||UR),r.length>1&&r.sort(x||rS),u.length>1&&u.sort(x||rS)}function v(){for(let _=e,x=o.length;_<x;_++){const M=o[_];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:r,transparent:u,init:f,push:d,unshift:m,finish:v,sort:g}}function NR(){let o=new WeakMap;function e(r,u){const f=o.get(r);let h;return f===void 0?(h=new oS,o.set(r,[h])):u>=f.length?(h=new oS,f.push(h)):h=f[u],h}function i(){o=new WeakMap}return{get:e,dispose:i}}function LR(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new et,color:new Ue};break;case"SpotLight":i={position:new et,direction:new et,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new et,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":i={direction:new et,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":i={color:new Ue,position:new et,halfWidth:new et,halfHeight:new et};break}return o[e.id]=i,i}}}function OR(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=i,i}}}let PR=0;function zR(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function IR(o){const e=new LR,i=OR(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let g=0;g<9;g++)r.probe.push(new et);const u=new et,f=new _n,h=new _n;function d(g){let v=0,_=0,x=0;for(let w=0;w<9;w++)r.probe[w].set(0,0,0);let M=0,A=0,C=0,y=0,S=0,I=0,z=0,U=0,V=0,H=0,O=0;g.sort(zR);for(let w=0,R=g.length;w<R;w++){const G=g[w],at=G.color,ut=G.intensity,gt=G.distance,lt=G.shadow&&G.shadow.map?G.shadow.map.texture:null;if(G.isAmbientLight)v+=at.r*ut,_+=at.g*ut,x+=at.b*ut;else if(G.isLightProbe){for(let W=0;W<9;W++)r.probe[W].addScaledVector(G.sh.coefficients[W],ut);O++}else if(G.isDirectionalLight){const W=e.get(G);if(W.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){const st=G.shadow,Z=i.get(G);Z.shadowIntensity=st.intensity,Z.shadowBias=st.bias,Z.shadowNormalBias=st.normalBias,Z.shadowRadius=st.radius,Z.shadowMapSize=st.mapSize,r.directionalShadow[M]=Z,r.directionalShadowMap[M]=lt,r.directionalShadowMatrix[M]=G.shadow.matrix,I++}r.directional[M]=W,M++}else if(G.isSpotLight){const W=e.get(G);W.position.setFromMatrixPosition(G.matrixWorld),W.color.copy(at).multiplyScalar(ut),W.distance=gt,W.coneCos=Math.cos(G.angle),W.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),W.decay=G.decay,r.spot[C]=W;const st=G.shadow;if(G.map&&(r.spotLightMap[V]=G.map,V++,st.updateMatrices(G),G.castShadow&&H++),r.spotLightMatrix[C]=st.matrix,G.castShadow){const Z=i.get(G);Z.shadowIntensity=st.intensity,Z.shadowBias=st.bias,Z.shadowNormalBias=st.normalBias,Z.shadowRadius=st.radius,Z.shadowMapSize=st.mapSize,r.spotShadow[C]=Z,r.spotShadowMap[C]=lt,U++}C++}else if(G.isRectAreaLight){const W=e.get(G);W.color.copy(at).multiplyScalar(ut),W.halfWidth.set(G.width*.5,0,0),W.halfHeight.set(0,G.height*.5,0),r.rectArea[y]=W,y++}else if(G.isPointLight){const W=e.get(G);if(W.color.copy(G.color).multiplyScalar(G.intensity),W.distance=G.distance,W.decay=G.decay,G.castShadow){const st=G.shadow,Z=i.get(G);Z.shadowIntensity=st.intensity,Z.shadowBias=st.bias,Z.shadowNormalBias=st.normalBias,Z.shadowRadius=st.radius,Z.shadowMapSize=st.mapSize,Z.shadowCameraNear=st.camera.near,Z.shadowCameraFar=st.camera.far,r.pointShadow[A]=Z,r.pointShadowMap[A]=lt,r.pointShadowMatrix[A]=G.shadow.matrix,z++}r.point[A]=W,A++}else if(G.isHemisphereLight){const W=e.get(G);W.skyColor.copy(G.color).multiplyScalar(ut),W.groundColor.copy(G.groundColor).multiplyScalar(ut),r.hemi[S]=W,S++}}y>0&&(o.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=It.LTC_FLOAT_1,r.rectAreaLTC2=It.LTC_FLOAT_2):(r.rectAreaLTC1=It.LTC_HALF_1,r.rectAreaLTC2=It.LTC_HALF_2)),r.ambient[0]=v,r.ambient[1]=_,r.ambient[2]=x;const q=r.hash;(q.directionalLength!==M||q.pointLength!==A||q.spotLength!==C||q.rectAreaLength!==y||q.hemiLength!==S||q.numDirectionalShadows!==I||q.numPointShadows!==z||q.numSpotShadows!==U||q.numSpotMaps!==V||q.numLightProbes!==O)&&(r.directional.length=M,r.spot.length=C,r.rectArea.length=y,r.point.length=A,r.hemi.length=S,r.directionalShadow.length=I,r.directionalShadowMap.length=I,r.pointShadow.length=z,r.pointShadowMap.length=z,r.spotShadow.length=U,r.spotShadowMap.length=U,r.directionalShadowMatrix.length=I,r.pointShadowMatrix.length=z,r.spotLightMatrix.length=U+V-H,r.spotLightMap.length=V,r.numSpotLightShadowsWithMaps=H,r.numLightProbes=O,q.directionalLength=M,q.pointLength=A,q.spotLength=C,q.rectAreaLength=y,q.hemiLength=S,q.numDirectionalShadows=I,q.numPointShadows=z,q.numSpotShadows=U,q.numSpotMaps=V,q.numLightProbes=O,r.version=PR++)}function m(g,v){let _=0,x=0,M=0,A=0,C=0;const y=v.matrixWorldInverse;for(let S=0,I=g.length;S<I;S++){const z=g[S];if(z.isDirectionalLight){const U=r.directional[_];U.direction.setFromMatrixPosition(z.matrixWorld),u.setFromMatrixPosition(z.target.matrixWorld),U.direction.sub(u),U.direction.transformDirection(y),_++}else if(z.isSpotLight){const U=r.spot[M];U.position.setFromMatrixPosition(z.matrixWorld),U.position.applyMatrix4(y),U.direction.setFromMatrixPosition(z.matrixWorld),u.setFromMatrixPosition(z.target.matrixWorld),U.direction.sub(u),U.direction.transformDirection(y),M++}else if(z.isRectAreaLight){const U=r.rectArea[A];U.position.setFromMatrixPosition(z.matrixWorld),U.position.applyMatrix4(y),h.identity(),f.copy(z.matrixWorld),f.premultiply(y),h.extractRotation(f),U.halfWidth.set(z.width*.5,0,0),U.halfHeight.set(0,z.height*.5,0),U.halfWidth.applyMatrix4(h),U.halfHeight.applyMatrix4(h),A++}else if(z.isPointLight){const U=r.point[x];U.position.setFromMatrixPosition(z.matrixWorld),U.position.applyMatrix4(y),x++}else if(z.isHemisphereLight){const U=r.hemi[C];U.direction.setFromMatrixPosition(z.matrixWorld),U.direction.transformDirection(y),C++}}}return{setup:d,setupView:m,state:r}}function lS(o){const e=new IR(o),i=[],r=[];function u(v){g.camera=v,i.length=0,r.length=0}function f(v){i.push(v)}function h(v){r.push(v)}function d(){e.setup(i)}function m(v){e.setupView(i,v)}const g={lightsArray:i,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:u,state:g,setupLights:d,setupLightsView:m,pushLight:f,pushShadow:h}}function BR(o){let e=new WeakMap;function i(u,f=0){const h=e.get(u);let d;return h===void 0?(d=new lS(o),e.set(u,[d])):f>=h.length?(d=new lS(o),h.push(d)):d=h[f],d}function r(){e=new WeakMap}return{get:i,dispose:r}}const FR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,HR=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function GR(o,e,i){let r=new FS;const u=new ne,f=new ne,h=new rn,d=new hT({depthPacking:bE}),m=new dT,g={},v=i.maxTextureSize,_={[ps]:Kn,[Kn]:ps,[Ea]:Ea},x=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:FR,fragmentShader:HR}),M=x.clone();M.defines.HORIZONTAL_PASS=1;const A=new Ua;A.setAttribute("position",new Ti(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const C=new Ii(A,x),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_S;let S=this.type;this.render=function(H,O,q){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||H.length===0)return;const w=o.getRenderTarget(),R=o.getActiveCubeFace(),G=o.getActiveMipmapLevel(),at=o.state;at.setBlending(ba),at.buffers.depth.getReversed()===!0?at.buffers.color.setClear(0,0,0,0):at.buffers.color.setClear(1,1,1,1),at.buffers.depth.setTest(!0),at.setScissorTest(!1);const ut=S!==Ma&&this.type===Ma,gt=S===Ma&&this.type!==Ma;for(let lt=0,W=H.length;lt<W;lt++){const st=H[lt],Z=st.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",st,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;u.copy(Z.mapSize);const _t=Z.getFrameExtents();if(u.multiply(_t),f.copy(Z.mapSize),(u.x>v||u.y>v)&&(u.x>v&&(f.x=Math.floor(v/_t.x),u.x=f.x*_t.x,Z.mapSize.x=f.x),u.y>v&&(f.y=Math.floor(v/_t.y),u.y=f.y*_t.y,Z.mapSize.y=f.y)),Z.map===null||ut===!0||gt===!0){const Gt=this.type!==Ma?{minFilter:Bi,magFilter:Bi}:{};Z.map!==null&&Z.map.dispose(),Z.map=new Ei(u.x,u.y,Gt),Z.map.texture.name=st.name+".shadowMap",Z.camera.updateProjectionMatrix()}o.setRenderTarget(Z.map),o.clear();const St=Z.getViewportCount();for(let Gt=0;Gt<St;Gt++){const oe=Z.getViewport(Gt);h.set(f.x*oe.x,f.y*oe.y,f.x*oe.z,f.y*oe.w),at.viewport(h),Z.updateMatrices(st,Gt),r=Z.getFrustum(),U(O,q,Z.camera,st,this.type)}Z.isPointLightShadow!==!0&&this.type===Ma&&I(Z,q),Z.needsUpdate=!1}S=this.type,y.needsUpdate=!1,o.setRenderTarget(w,R,G)};function I(H,O){const q=e.update(C);x.defines.VSM_SAMPLES!==H.blurSamples&&(x.defines.VSM_SAMPLES=H.blurSamples,M.defines.VSM_SAMPLES=H.blurSamples,x.needsUpdate=!0,M.needsUpdate=!0),H.mapPass===null&&(H.mapPass=new Ei(u.x,u.y)),x.uniforms.shadow_pass.value=H.map.texture,x.uniforms.resolution.value=H.mapSize,x.uniforms.radius.value=H.radius,o.setRenderTarget(H.mapPass),o.clear(),o.renderBufferDirect(O,null,q,x,C,null),M.uniforms.shadow_pass.value=H.mapPass.texture,M.uniforms.resolution.value=H.mapSize,M.uniforms.radius.value=H.radius,o.setRenderTarget(H.map),o.clear(),o.renderBufferDirect(O,null,q,M,C,null)}function z(H,O,q,w){let R=null;const G=q.isPointLight===!0?H.customDistanceMaterial:H.customDepthMaterial;if(G!==void 0)R=G;else if(R=q.isPointLight===!0?m:d,o.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0||O.alphaToCoverage===!0){const at=R.uuid,ut=O.uuid;let gt=g[at];gt===void 0&&(gt={},g[at]=gt);let lt=gt[ut];lt===void 0&&(lt=R.clone(),gt[ut]=lt,O.addEventListener("dispose",V)),R=lt}if(R.visible=O.visible,R.wireframe=O.wireframe,w===Ma?R.side=O.shadowSide!==null?O.shadowSide:O.side:R.side=O.shadowSide!==null?O.shadowSide:_[O.side],R.alphaMap=O.alphaMap,R.alphaTest=O.alphaToCoverage===!0?.5:O.alphaTest,R.map=O.map,R.clipShadows=O.clipShadows,R.clippingPlanes=O.clippingPlanes,R.clipIntersection=O.clipIntersection,R.displacementMap=O.displacementMap,R.displacementScale=O.displacementScale,R.displacementBias=O.displacementBias,R.wireframeLinewidth=O.wireframeLinewidth,R.linewidth=O.linewidth,q.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const at=o.properties.get(R);at.light=q}return R}function U(H,O,q,w,R){if(H.visible===!1)return;if(H.layers.test(O.layers)&&(H.isMesh||H.isLine||H.isPoints)&&(H.castShadow||H.receiveShadow&&R===Ma)&&(!H.frustumCulled||r.intersectsObject(H))){H.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,H.matrixWorld);const ut=e.update(H),gt=H.material;if(Array.isArray(gt)){const lt=ut.groups;for(let W=0,st=lt.length;W<st;W++){const Z=lt[W],_t=gt[Z.materialIndex];if(_t&&_t.visible){const St=z(H,_t,w,R);H.onBeforeShadow(o,H,O,q,ut,St,Z),o.renderBufferDirect(q,null,ut,St,H,Z),H.onAfterShadow(o,H,O,q,ut,St,Z)}}}else if(gt.visible){const lt=z(H,gt,w,R);H.onBeforeShadow(o,H,O,q,ut,lt,null),o.renderBufferDirect(q,null,ut,lt,H,null),H.onAfterShadow(o,H,O,q,ut,lt,null)}}const at=H.children;for(let ut=0,gt=at.length;ut<gt;ut++)U(at[ut],O,q,w,R)}function V(H){H.target.removeEventListener("dispose",V);for(const q in g){const w=g[q],R=H.target.uuid;R in w&&(w[R].dispose(),delete w[R])}}}const VR={[jd]:Zd,[Kd]:$d,[Qd]:tp,[oo]:Jd,[Zd]:jd,[$d]:Kd,[tp]:Qd,[Jd]:oo};function kR(o,e){function i(){let F=!1;const bt=new rn;let wt=null;const Vt=new rn(0,0,0,0);return{setMask:function(xt){wt!==xt&&!F&&(o.colorMask(xt,xt,xt,xt),wt=xt)},setLocked:function(xt){F=xt},setClear:function(xt,mt,Wt,ce,Ge){Ge===!0&&(xt*=ce,mt*=ce,Wt*=ce),bt.set(xt,mt,Wt,ce),Vt.equals(bt)===!1&&(o.clearColor(xt,mt,Wt,ce),Vt.copy(bt))},reset:function(){F=!1,wt=null,Vt.set(-1,0,0,0)}}}function r(){let F=!1,bt=!1,wt=null,Vt=null,xt=null;return{setReversed:function(mt){if(bt!==mt){const Wt=e.get("EXT_clip_control");mt?Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.ZERO_TO_ONE_EXT):Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.NEGATIVE_ONE_TO_ONE_EXT),bt=mt;const ce=xt;xt=null,this.setClear(ce)}},getReversed:function(){return bt},setTest:function(mt){mt?it(o.DEPTH_TEST):yt(o.DEPTH_TEST)},setMask:function(mt){wt!==mt&&!F&&(o.depthMask(mt),wt=mt)},setFunc:function(mt){if(bt&&(mt=VR[mt]),Vt!==mt){switch(mt){case jd:o.depthFunc(o.NEVER);break;case Zd:o.depthFunc(o.ALWAYS);break;case Kd:o.depthFunc(o.LESS);break;case oo:o.depthFunc(o.LEQUAL);break;case Qd:o.depthFunc(o.EQUAL);break;case Jd:o.depthFunc(o.GEQUAL);break;case $d:o.depthFunc(o.GREATER);break;case tp:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}Vt=mt}},setLocked:function(mt){F=mt},setClear:function(mt){xt!==mt&&(bt&&(mt=1-mt),o.clearDepth(mt),xt=mt)},reset:function(){F=!1,wt=null,Vt=null,xt=null,bt=!1}}}function u(){let F=!1,bt=null,wt=null,Vt=null,xt=null,mt=null,Wt=null,ce=null,Ge=null;return{setTest:function(Me){F||(Me?it(o.STENCIL_TEST):yt(o.STENCIL_TEST))},setMask:function(Me){bt!==Me&&!F&&(o.stencilMask(Me),bt=Me)},setFunc:function(Me,$e,dn){(wt!==Me||Vt!==$e||xt!==dn)&&(o.stencilFunc(Me,$e,dn),wt=Me,Vt=$e,xt=dn)},setOp:function(Me,$e,dn){(mt!==Me||Wt!==$e||ce!==dn)&&(o.stencilOp(Me,$e,dn),mt=Me,Wt=$e,ce=dn)},setLocked:function(Me){F=Me},setClear:function(Me){Ge!==Me&&(o.clearStencil(Me),Ge=Me)},reset:function(){F=!1,bt=null,wt=null,Vt=null,xt=null,mt=null,Wt=null,ce=null,Ge=null}}}const f=new i,h=new r,d=new u,m=new WeakMap,g=new WeakMap;let v={},_={},x=new WeakMap,M=[],A=null,C=!1,y=null,S=null,I=null,z=null,U=null,V=null,H=null,O=new Ue(0,0,0),q=0,w=!1,R=null,G=null,at=null,ut=null,gt=null;const lt=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,st=0;const Z=o.getParameter(o.VERSION);Z.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec(Z)[1]),W=st>=1):Z.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),W=st>=2);let _t=null,St={};const Gt=o.getParameter(o.SCISSOR_BOX),oe=o.getParameter(o.VIEWPORT),be=new rn().fromArray(Gt),P=new rn().fromArray(oe);function ct(F,bt,wt,Vt){const xt=new Uint8Array(4),mt=o.createTexture();o.bindTexture(F,mt),o.texParameteri(F,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(F,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let Wt=0;Wt<wt;Wt++)F===o.TEXTURE_3D||F===o.TEXTURE_2D_ARRAY?o.texImage3D(bt,0,o.RGBA,1,1,Vt,0,o.RGBA,o.UNSIGNED_BYTE,xt):o.texImage2D(bt+Wt,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,xt);return mt}const J={};J[o.TEXTURE_2D]=ct(o.TEXTURE_2D,o.TEXTURE_2D,1),J[o.TEXTURE_CUBE_MAP]=ct(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[o.TEXTURE_2D_ARRAY]=ct(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),J[o.TEXTURE_3D]=ct(o.TEXTURE_3D,o.TEXTURE_3D,1,1),f.setClear(0,0,0,1),h.setClear(1),d.setClear(0),it(o.DEPTH_TEST),h.setFunc(oo),Qt(!1),Nt(pv),it(o.CULL_FACE),He(ba);function it(F){v[F]!==!0&&(o.enable(F),v[F]=!0)}function yt(F){v[F]!==!1&&(o.disable(F),v[F]=!1)}function Ut(F,bt){return _[F]!==bt?(o.bindFramebuffer(F,bt),_[F]=bt,F===o.DRAW_FRAMEBUFFER&&(_[o.FRAMEBUFFER]=bt),F===o.FRAMEBUFFER&&(_[o.DRAW_FRAMEBUFFER]=bt),!0):!1}function At(F,bt){let wt=M,Vt=!1;if(F){wt=x.get(bt),wt===void 0&&(wt=[],x.set(bt,wt));const xt=F.textures;if(wt.length!==xt.length||wt[0]!==o.COLOR_ATTACHMENT0){for(let mt=0,Wt=xt.length;mt<Wt;mt++)wt[mt]=o.COLOR_ATTACHMENT0+mt;wt.length=xt.length,Vt=!0}}else wt[0]!==o.BACK&&(wt[0]=o.BACK,Vt=!0);Vt&&o.drawBuffers(wt)}function Mt(F){return A!==F?(o.useProgram(F),A=F,!0):!1}const Yt={[Ws]:o.FUNC_ADD,[QM]:o.FUNC_SUBTRACT,[JM]:o.FUNC_REVERSE_SUBTRACT};Yt[$M]=o.MIN,Yt[tE]=o.MAX;const L={[eE]:o.ZERO,[nE]:o.ONE,[iE]:o.SRC_COLOR,[Yd]:o.SRC_ALPHA,[uE]:o.SRC_ALPHA_SATURATE,[oE]:o.DST_COLOR,[sE]:o.DST_ALPHA,[aE]:o.ONE_MINUS_SRC_COLOR,[Wd]:o.ONE_MINUS_SRC_ALPHA,[lE]:o.ONE_MINUS_DST_COLOR,[rE]:o.ONE_MINUS_DST_ALPHA,[cE]:o.CONSTANT_COLOR,[fE]:o.ONE_MINUS_CONSTANT_COLOR,[hE]:o.CONSTANT_ALPHA,[dE]:o.ONE_MINUS_CONSTANT_ALPHA};function He(F,bt,wt,Vt,xt,mt,Wt,ce,Ge,Me){if(F===ba){C===!0&&(yt(o.BLEND),C=!1);return}if(C===!1&&(it(o.BLEND),C=!0),F!==KM){if(F!==y||Me!==w){if((S!==Ws||U!==Ws)&&(o.blendEquation(o.FUNC_ADD),S=Ws,U=Ws),Me)switch(F){case ao:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case qd:o.blendFunc(o.ONE,o.ONE);break;case mv:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case gv:o.blendFuncSeparate(o.DST_COLOR,o.ONE_MINUS_SRC_ALPHA,o.ZERO,o.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case ao:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case qd:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE,o.ONE,o.ONE);break;case mv:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case gv:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}I=null,z=null,V=null,H=null,O.set(0,0,0),q=0,y=F,w=Me}return}xt=xt||bt,mt=mt||wt,Wt=Wt||Vt,(bt!==S||xt!==U)&&(o.blendEquationSeparate(Yt[bt],Yt[xt]),S=bt,U=xt),(wt!==I||Vt!==z||mt!==V||Wt!==H)&&(o.blendFuncSeparate(L[wt],L[Vt],L[mt],L[Wt]),I=wt,z=Vt,V=mt,H=Wt),(ce.equals(O)===!1||Ge!==q)&&(o.blendColor(ce.r,ce.g,ce.b,Ge),O.copy(ce),q=Ge),y=F,w=!1}function re(F,bt){F.side===Ea?yt(o.CULL_FACE):it(o.CULL_FACE);let wt=F.side===Kn;bt&&(wt=!wt),Qt(wt),F.blending===ao&&F.transparent===!1?He(ba):He(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),h.setFunc(F.depthFunc),h.setTest(F.depthTest),h.setMask(F.depthWrite),f.setMask(F.colorWrite);const Vt=F.stencilWrite;d.setTest(Vt),Vt&&(d.setMask(F.stencilWriteMask),d.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),d.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Ft(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?it(o.SAMPLE_ALPHA_TO_COVERAGE):yt(o.SAMPLE_ALPHA_TO_COVERAGE)}function Qt(F){R!==F&&(F?o.frontFace(o.CW):o.frontFace(o.CCW),R=F)}function Nt(F){F!==WM?(it(o.CULL_FACE),F!==G&&(F===pv?o.cullFace(o.BACK):F===jM?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):yt(o.CULL_FACE),G=F}function ae(F){F!==at&&(W&&o.lineWidth(F),at=F)}function Ft(F,bt,wt){F?(it(o.POLYGON_OFFSET_FILL),(ut!==bt||gt!==wt)&&(o.polygonOffset(bt,wt),ut=bt,gt=wt)):yt(o.POLYGON_OFFSET_FILL)}function le(F){F?it(o.SCISSOR_TEST):yt(o.SCISSOR_TEST)}function qe(F){F===void 0&&(F=o.TEXTURE0+lt-1),_t!==F&&(o.activeTexture(F),_t=F)}function We(F,bt,wt){wt===void 0&&(_t===null?wt=o.TEXTURE0+lt-1:wt=_t);let Vt=St[wt];Vt===void 0&&(Vt={type:void 0,texture:void 0},St[wt]=Vt),(Vt.type!==F||Vt.texture!==bt)&&(_t!==wt&&(o.activeTexture(wt),_t=wt),o.bindTexture(F,bt||J[F]),Vt.type=F,Vt.texture=bt)}function D(){const F=St[_t];F!==void 0&&F.type!==void 0&&(o.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function T(){try{o.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function tt(){try{o.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function dt(){try{o.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function vt(){try{o.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ft(){try{o.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function kt(){try{o.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Rt(){try{o.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function jt(){try{o.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Kt(){try{o.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Tt(){try{o.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ot(F){be.equals(F)===!1&&(o.scissor(F.x,F.y,F.z,F.w),be.copy(F))}function ie(F){P.equals(F)===!1&&(o.viewport(F.x,F.y,F.z,F.w),P.copy(F))}function Zt(F,bt){let wt=g.get(bt);wt===void 0&&(wt=new WeakMap,g.set(bt,wt));let Vt=wt.get(F);Vt===void 0&&(Vt=o.getUniformBlockIndex(bt,F.name),wt.set(F,Vt))}function Pt(F,bt){const Vt=g.get(bt).get(F);m.get(bt)!==Vt&&(o.uniformBlockBinding(bt,Vt,F.__bindingPointIndex),m.set(bt,Vt))}function fe(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),h.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),v={},_t=null,St={},_={},x=new WeakMap,M=[],A=null,C=!1,y=null,S=null,I=null,z=null,U=null,V=null,H=null,O=new Ue(0,0,0),q=0,w=!1,R=null,G=null,at=null,ut=null,gt=null,be.set(0,0,o.canvas.width,o.canvas.height),P.set(0,0,o.canvas.width,o.canvas.height),f.reset(),h.reset(),d.reset()}return{buffers:{color:f,depth:h,stencil:d},enable:it,disable:yt,bindFramebuffer:Ut,drawBuffers:At,useProgram:Mt,setBlending:He,setMaterial:re,setFlipSided:Qt,setCullFace:Nt,setLineWidth:ae,setPolygonOffset:Ft,setScissorTest:le,activeTexture:qe,bindTexture:We,unbindTexture:D,compressedTexImage2D:T,compressedTexImage3D:tt,texImage2D:Kt,texImage3D:Tt,updateUBOMapping:Zt,uniformBlockBinding:Pt,texStorage2D:Rt,texStorage3D:jt,texSubImage2D:dt,texSubImage3D:vt,compressedTexSubImage2D:ft,compressedTexSubImage3D:kt,scissor:Ot,viewport:ie,reset:fe}}function XR(o,e,i,r,u,f,h){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new ne,v=new WeakMap;let _;const x=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(D,T){return M?new OffscreenCanvas(D,T):Rc("canvas")}function C(D,T,tt){let dt=1;const vt=We(D);if((vt.width>tt||vt.height>tt)&&(dt=tt/Math.max(vt.width,vt.height)),dt<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const ft=Math.floor(dt*vt.width),kt=Math.floor(dt*vt.height);_===void 0&&(_=A(ft,kt));const Rt=T?A(ft,kt):_;return Rt.width=ft,Rt.height=kt,Rt.getContext("2d").drawImage(D,0,0,ft,kt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+vt.width+"x"+vt.height+") to ("+ft+"x"+kt+")."),Rt}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+vt.width+"x"+vt.height+")."),D;return D}function y(D){return D.generateMipmaps}function S(D){o.generateMipmap(D)}function I(D){return D.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?o.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function z(D,T,tt,dt,vt=!1){if(D!==null){if(o[D]!==void 0)return o[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let ft=T;if(T===o.RED&&(tt===o.FLOAT&&(ft=o.R32F),tt===o.HALF_FLOAT&&(ft=o.R16F),tt===o.UNSIGNED_BYTE&&(ft=o.R8)),T===o.RED_INTEGER&&(tt===o.UNSIGNED_BYTE&&(ft=o.R8UI),tt===o.UNSIGNED_SHORT&&(ft=o.R16UI),tt===o.UNSIGNED_INT&&(ft=o.R32UI),tt===o.BYTE&&(ft=o.R8I),tt===o.SHORT&&(ft=o.R16I),tt===o.INT&&(ft=o.R32I)),T===o.RG&&(tt===o.FLOAT&&(ft=o.RG32F),tt===o.HALF_FLOAT&&(ft=o.RG16F),tt===o.UNSIGNED_BYTE&&(ft=o.RG8)),T===o.RG_INTEGER&&(tt===o.UNSIGNED_BYTE&&(ft=o.RG8UI),tt===o.UNSIGNED_SHORT&&(ft=o.RG16UI),tt===o.UNSIGNED_INT&&(ft=o.RG32UI),tt===o.BYTE&&(ft=o.RG8I),tt===o.SHORT&&(ft=o.RG16I),tt===o.INT&&(ft=o.RG32I)),T===o.RGB_INTEGER&&(tt===o.UNSIGNED_BYTE&&(ft=o.RGB8UI),tt===o.UNSIGNED_SHORT&&(ft=o.RGB16UI),tt===o.UNSIGNED_INT&&(ft=o.RGB32UI),tt===o.BYTE&&(ft=o.RGB8I),tt===o.SHORT&&(ft=o.RGB16I),tt===o.INT&&(ft=o.RGB32I)),T===o.RGBA_INTEGER&&(tt===o.UNSIGNED_BYTE&&(ft=o.RGBA8UI),tt===o.UNSIGNED_SHORT&&(ft=o.RGBA16UI),tt===o.UNSIGNED_INT&&(ft=o.RGBA32UI),tt===o.BYTE&&(ft=o.RGBA8I),tt===o.SHORT&&(ft=o.RGBA16I),tt===o.INT&&(ft=o.RGBA32I)),T===o.RGB&&(tt===o.UNSIGNED_INT_5_9_9_9_REV&&(ft=o.RGB9_E5),tt===o.UNSIGNED_INT_10F_11F_11F_REV&&(ft=o.R11F_G11F_B10F)),T===o.RGBA){const kt=vt?bc:De.getTransfer(dt);tt===o.FLOAT&&(ft=o.RGBA32F),tt===o.HALF_FLOAT&&(ft=o.RGBA16F),tt===o.UNSIGNED_BYTE&&(ft=kt===ke?o.SRGB8_ALPHA8:o.RGBA8),tt===o.UNSIGNED_SHORT_4_4_4_4&&(ft=o.RGBA4),tt===o.UNSIGNED_SHORT_5_5_5_1&&(ft=o.RGB5_A1)}return(ft===o.R16F||ft===o.R32F||ft===o.RG16F||ft===o.RG32F||ft===o.RGBA16F||ft===o.RGBA32F)&&e.get("EXT_color_buffer_float"),ft}function U(D,T){let tt;return D?T===null||T===Qs||T===gl?tt=o.DEPTH24_STENCIL8:T===Ta?tt=o.DEPTH32F_STENCIL8:T===ml&&(tt=o.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Qs||T===gl?tt=o.DEPTH_COMPONENT24:T===Ta?tt=o.DEPTH_COMPONENT32F:T===ml&&(tt=o.DEPTH_COMPONENT16),tt}function V(D,T){return y(D)===!0||D.isFramebufferTexture&&D.minFilter!==Bi&&D.minFilter!==Ji?Math.log2(Math.max(T.width,T.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?T.mipmaps.length:1}function H(D){const T=D.target;T.removeEventListener("dispose",H),q(T),T.isVideoTexture&&v.delete(T)}function O(D){const T=D.target;T.removeEventListener("dispose",O),R(T)}function q(D){const T=r.get(D);if(T.__webglInit===void 0)return;const tt=D.source,dt=x.get(tt);if(dt){const vt=dt[T.__cacheKey];vt.usedTimes--,vt.usedTimes===0&&w(D),Object.keys(dt).length===0&&x.delete(tt)}r.remove(D)}function w(D){const T=r.get(D);o.deleteTexture(T.__webglTexture);const tt=D.source,dt=x.get(tt);delete dt[T.__cacheKey],h.memory.textures--}function R(D){const T=r.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),r.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let dt=0;dt<6;dt++){if(Array.isArray(T.__webglFramebuffer[dt]))for(let vt=0;vt<T.__webglFramebuffer[dt].length;vt++)o.deleteFramebuffer(T.__webglFramebuffer[dt][vt]);else o.deleteFramebuffer(T.__webglFramebuffer[dt]);T.__webglDepthbuffer&&o.deleteRenderbuffer(T.__webglDepthbuffer[dt])}else{if(Array.isArray(T.__webglFramebuffer))for(let dt=0;dt<T.__webglFramebuffer.length;dt++)o.deleteFramebuffer(T.__webglFramebuffer[dt]);else o.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&o.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&o.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let dt=0;dt<T.__webglColorRenderbuffer.length;dt++)T.__webglColorRenderbuffer[dt]&&o.deleteRenderbuffer(T.__webglColorRenderbuffer[dt]);T.__webglDepthRenderbuffer&&o.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const tt=D.textures;for(let dt=0,vt=tt.length;dt<vt;dt++){const ft=r.get(tt[dt]);ft.__webglTexture&&(o.deleteTexture(ft.__webglTexture),h.memory.textures--),r.remove(tt[dt])}r.remove(D)}let G=0;function at(){G=0}function ut(){const D=G;return D>=u.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+u.maxTextures),G+=1,D}function gt(D){const T=[];return T.push(D.wrapS),T.push(D.wrapT),T.push(D.wrapR||0),T.push(D.magFilter),T.push(D.minFilter),T.push(D.anisotropy),T.push(D.internalFormat),T.push(D.format),T.push(D.type),T.push(D.generateMipmaps),T.push(D.premultiplyAlpha),T.push(D.flipY),T.push(D.unpackAlignment),T.push(D.colorSpace),T.join()}function lt(D,T){const tt=r.get(D);if(D.isVideoTexture&&le(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&tt.__version!==D.version){const dt=D.image;if(dt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(dt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(tt,D,T);return}}else D.isExternalTexture&&(tt.__webglTexture=D.sourceTexture?D.sourceTexture:null);i.bindTexture(o.TEXTURE_2D,tt.__webglTexture,o.TEXTURE0+T)}function W(D,T){const tt=r.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&tt.__version!==D.version){J(tt,D,T);return}i.bindTexture(o.TEXTURE_2D_ARRAY,tt.__webglTexture,o.TEXTURE0+T)}function st(D,T){const tt=r.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&tt.__version!==D.version){J(tt,D,T);return}i.bindTexture(o.TEXTURE_3D,tt.__webglTexture,o.TEXTURE0+T)}function Z(D,T){const tt=r.get(D);if(D.version>0&&tt.__version!==D.version){it(tt,D,T);return}i.bindTexture(o.TEXTURE_CUBE_MAP,tt.__webglTexture,o.TEXTURE0+T)}const _t={[ip]:o.REPEAT,[Zs]:o.CLAMP_TO_EDGE,[ap]:o.MIRRORED_REPEAT},St={[Bi]:o.NEAREST,[EE]:o.NEAREST_MIPMAP_NEAREST,[ju]:o.NEAREST_MIPMAP_LINEAR,[Ji]:o.LINEAR,[dd]:o.LINEAR_MIPMAP_NEAREST,[Ks]:o.LINEAR_MIPMAP_LINEAR},Gt={[CE]:o.NEVER,[OE]:o.ALWAYS,[wE]:o.LESS,[CS]:o.LEQUAL,[DE]:o.EQUAL,[LE]:o.GEQUAL,[UE]:o.GREATER,[NE]:o.NOTEQUAL};function oe(D,T){if(T.type===Ta&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===Ji||T.magFilter===dd||T.magFilter===ju||T.magFilter===Ks||T.minFilter===Ji||T.minFilter===dd||T.minFilter===ju||T.minFilter===Ks)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(D,o.TEXTURE_WRAP_S,_t[T.wrapS]),o.texParameteri(D,o.TEXTURE_WRAP_T,_t[T.wrapT]),(D===o.TEXTURE_3D||D===o.TEXTURE_2D_ARRAY)&&o.texParameteri(D,o.TEXTURE_WRAP_R,_t[T.wrapR]),o.texParameteri(D,o.TEXTURE_MAG_FILTER,St[T.magFilter]),o.texParameteri(D,o.TEXTURE_MIN_FILTER,St[T.minFilter]),T.compareFunction&&(o.texParameteri(D,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(D,o.TEXTURE_COMPARE_FUNC,Gt[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Bi||T.minFilter!==ju&&T.minFilter!==Ks||T.type===Ta&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||r.get(T).__currentAnisotropy){const tt=e.get("EXT_texture_filter_anisotropic");o.texParameterf(D,tt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,u.getMaxAnisotropy())),r.get(T).__currentAnisotropy=T.anisotropy}}}function be(D,T){let tt=!1;D.__webglInit===void 0&&(D.__webglInit=!0,T.addEventListener("dispose",H));const dt=T.source;let vt=x.get(dt);vt===void 0&&(vt={},x.set(dt,vt));const ft=gt(T);if(ft!==D.__cacheKey){vt[ft]===void 0&&(vt[ft]={texture:o.createTexture(),usedTimes:0},h.memory.textures++,tt=!0),vt[ft].usedTimes++;const kt=vt[D.__cacheKey];kt!==void 0&&(vt[D.__cacheKey].usedTimes--,kt.usedTimes===0&&w(T)),D.__cacheKey=ft,D.__webglTexture=vt[ft].texture}return tt}function P(D,T,tt){return Math.floor(Math.floor(D/tt)/T)}function ct(D,T,tt,dt){const ft=D.updateRanges;if(ft.length===0)i.texSubImage2D(o.TEXTURE_2D,0,0,0,T.width,T.height,tt,dt,T.data);else{ft.sort((Tt,Ot)=>Tt.start-Ot.start);let kt=0;for(let Tt=1;Tt<ft.length;Tt++){const Ot=ft[kt],ie=ft[Tt],Zt=Ot.start+Ot.count,Pt=P(ie.start,T.width,4),fe=P(Ot.start,T.width,4);ie.start<=Zt+1&&Pt===fe&&P(ie.start+ie.count-1,T.width,4)===Pt?Ot.count=Math.max(Ot.count,ie.start+ie.count-Ot.start):(++kt,ft[kt]=ie)}ft.length=kt+1;const Rt=o.getParameter(o.UNPACK_ROW_LENGTH),jt=o.getParameter(o.UNPACK_SKIP_PIXELS),Kt=o.getParameter(o.UNPACK_SKIP_ROWS);o.pixelStorei(o.UNPACK_ROW_LENGTH,T.width);for(let Tt=0,Ot=ft.length;Tt<Ot;Tt++){const ie=ft[Tt],Zt=Math.floor(ie.start/4),Pt=Math.ceil(ie.count/4),fe=Zt%T.width,F=Math.floor(Zt/T.width),bt=Pt,wt=1;o.pixelStorei(o.UNPACK_SKIP_PIXELS,fe),o.pixelStorei(o.UNPACK_SKIP_ROWS,F),i.texSubImage2D(o.TEXTURE_2D,0,fe,F,bt,wt,tt,dt,T.data)}D.clearUpdateRanges(),o.pixelStorei(o.UNPACK_ROW_LENGTH,Rt),o.pixelStorei(o.UNPACK_SKIP_PIXELS,jt),o.pixelStorei(o.UNPACK_SKIP_ROWS,Kt)}}function J(D,T,tt){let dt=o.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(dt=o.TEXTURE_2D_ARRAY),T.isData3DTexture&&(dt=o.TEXTURE_3D);const vt=be(D,T),ft=T.source;i.bindTexture(dt,D.__webglTexture,o.TEXTURE0+tt);const kt=r.get(ft);if(ft.version!==kt.__version||vt===!0){i.activeTexture(o.TEXTURE0+tt);const Rt=De.getPrimaries(De.workingColorSpace),jt=T.colorSpace===ds?null:De.getPrimaries(T.colorSpace),Kt=T.colorSpace===ds||Rt===jt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,T.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,T.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Kt);let Tt=C(T.image,!1,u.maxTextureSize);Tt=qe(T,Tt);const Ot=f.convert(T.format,T.colorSpace),ie=f.convert(T.type);let Zt=z(T.internalFormat,Ot,ie,T.colorSpace,T.isVideoTexture);oe(dt,T);let Pt;const fe=T.mipmaps,F=T.isVideoTexture!==!0,bt=kt.__version===void 0||vt===!0,wt=ft.dataReady,Vt=V(T,Tt);if(T.isDepthTexture)Zt=U(T.format===vl,T.type),bt&&(F?i.texStorage2D(o.TEXTURE_2D,1,Zt,Tt.width,Tt.height):i.texImage2D(o.TEXTURE_2D,0,Zt,Tt.width,Tt.height,0,Ot,ie,null));else if(T.isDataTexture)if(fe.length>0){F&&bt&&i.texStorage2D(o.TEXTURE_2D,Vt,Zt,fe[0].width,fe[0].height);for(let xt=0,mt=fe.length;xt<mt;xt++)Pt=fe[xt],F?wt&&i.texSubImage2D(o.TEXTURE_2D,xt,0,0,Pt.width,Pt.height,Ot,ie,Pt.data):i.texImage2D(o.TEXTURE_2D,xt,Zt,Pt.width,Pt.height,0,Ot,ie,Pt.data);T.generateMipmaps=!1}else F?(bt&&i.texStorage2D(o.TEXTURE_2D,Vt,Zt,Tt.width,Tt.height),wt&&ct(T,Tt,Ot,ie)):i.texImage2D(o.TEXTURE_2D,0,Zt,Tt.width,Tt.height,0,Ot,ie,Tt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){F&&bt&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Vt,Zt,fe[0].width,fe[0].height,Tt.depth);for(let xt=0,mt=fe.length;xt<mt;xt++)if(Pt=fe[xt],T.format!==zi)if(Ot!==null)if(F){if(wt)if(T.layerUpdates.size>0){const Wt=Bv(Pt.width,Pt.height,T.format,T.type);for(const ce of T.layerUpdates){const Ge=Pt.data.subarray(ce*Wt/Pt.data.BYTES_PER_ELEMENT,(ce+1)*Wt/Pt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,xt,0,0,ce,Pt.width,Pt.height,1,Ot,Ge)}T.clearLayerUpdates()}else i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,xt,0,0,0,Pt.width,Pt.height,Tt.depth,Ot,Pt.data)}else i.compressedTexImage3D(o.TEXTURE_2D_ARRAY,xt,Zt,Pt.width,Pt.height,Tt.depth,0,Pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?wt&&i.texSubImage3D(o.TEXTURE_2D_ARRAY,xt,0,0,0,Pt.width,Pt.height,Tt.depth,Ot,ie,Pt.data):i.texImage3D(o.TEXTURE_2D_ARRAY,xt,Zt,Pt.width,Pt.height,Tt.depth,0,Ot,ie,Pt.data)}else{F&&bt&&i.texStorage2D(o.TEXTURE_2D,Vt,Zt,fe[0].width,fe[0].height);for(let xt=0,mt=fe.length;xt<mt;xt++)Pt=fe[xt],T.format!==zi?Ot!==null?F?wt&&i.compressedTexSubImage2D(o.TEXTURE_2D,xt,0,0,Pt.width,Pt.height,Ot,Pt.data):i.compressedTexImage2D(o.TEXTURE_2D,xt,Zt,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?wt&&i.texSubImage2D(o.TEXTURE_2D,xt,0,0,Pt.width,Pt.height,Ot,ie,Pt.data):i.texImage2D(o.TEXTURE_2D,xt,Zt,Pt.width,Pt.height,0,Ot,ie,Pt.data)}else if(T.isDataArrayTexture)if(F){if(bt&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Vt,Zt,Tt.width,Tt.height,Tt.depth),wt)if(T.layerUpdates.size>0){const xt=Bv(Tt.width,Tt.height,T.format,T.type);for(const mt of T.layerUpdates){const Wt=Tt.data.subarray(mt*xt/Tt.data.BYTES_PER_ELEMENT,(mt+1)*xt/Tt.data.BYTES_PER_ELEMENT);i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,mt,Tt.width,Tt.height,1,Ot,ie,Wt)}T.clearLayerUpdates()}else i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,Tt.width,Tt.height,Tt.depth,Ot,ie,Tt.data)}else i.texImage3D(o.TEXTURE_2D_ARRAY,0,Zt,Tt.width,Tt.height,Tt.depth,0,Ot,ie,Tt.data);else if(T.isData3DTexture)F?(bt&&i.texStorage3D(o.TEXTURE_3D,Vt,Zt,Tt.width,Tt.height,Tt.depth),wt&&i.texSubImage3D(o.TEXTURE_3D,0,0,0,0,Tt.width,Tt.height,Tt.depth,Ot,ie,Tt.data)):i.texImage3D(o.TEXTURE_3D,0,Zt,Tt.width,Tt.height,Tt.depth,0,Ot,ie,Tt.data);else if(T.isFramebufferTexture){if(bt)if(F)i.texStorage2D(o.TEXTURE_2D,Vt,Zt,Tt.width,Tt.height);else{let xt=Tt.width,mt=Tt.height;for(let Wt=0;Wt<Vt;Wt++)i.texImage2D(o.TEXTURE_2D,Wt,Zt,xt,mt,0,Ot,ie,null),xt>>=1,mt>>=1}}else if(fe.length>0){if(F&&bt){const xt=We(fe[0]);i.texStorage2D(o.TEXTURE_2D,Vt,Zt,xt.width,xt.height)}for(let xt=0,mt=fe.length;xt<mt;xt++)Pt=fe[xt],F?wt&&i.texSubImage2D(o.TEXTURE_2D,xt,0,0,Ot,ie,Pt):i.texImage2D(o.TEXTURE_2D,xt,Zt,Ot,ie,Pt);T.generateMipmaps=!1}else if(F){if(bt){const xt=We(Tt);i.texStorage2D(o.TEXTURE_2D,Vt,Zt,xt.width,xt.height)}wt&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Ot,ie,Tt)}else i.texImage2D(o.TEXTURE_2D,0,Zt,Ot,ie,Tt);y(T)&&S(dt),kt.__version=ft.version,T.onUpdate&&T.onUpdate(T)}D.__version=T.version}function it(D,T,tt){if(T.image.length!==6)return;const dt=be(D,T),vt=T.source;i.bindTexture(o.TEXTURE_CUBE_MAP,D.__webglTexture,o.TEXTURE0+tt);const ft=r.get(vt);if(vt.version!==ft.__version||dt===!0){i.activeTexture(o.TEXTURE0+tt);const kt=De.getPrimaries(De.workingColorSpace),Rt=T.colorSpace===ds?null:De.getPrimaries(T.colorSpace),jt=T.colorSpace===ds||kt===Rt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,T.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,T.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,jt);const Kt=T.isCompressedTexture||T.image[0].isCompressedTexture,Tt=T.image[0]&&T.image[0].isDataTexture,Ot=[];for(let mt=0;mt<6;mt++)!Kt&&!Tt?Ot[mt]=C(T.image[mt],!0,u.maxCubemapSize):Ot[mt]=Tt?T.image[mt].image:T.image[mt],Ot[mt]=qe(T,Ot[mt]);const ie=Ot[0],Zt=f.convert(T.format,T.colorSpace),Pt=f.convert(T.type),fe=z(T.internalFormat,Zt,Pt,T.colorSpace),F=T.isVideoTexture!==!0,bt=ft.__version===void 0||dt===!0,wt=vt.dataReady;let Vt=V(T,ie);oe(o.TEXTURE_CUBE_MAP,T);let xt;if(Kt){F&&bt&&i.texStorage2D(o.TEXTURE_CUBE_MAP,Vt,fe,ie.width,ie.height);for(let mt=0;mt<6;mt++){xt=Ot[mt].mipmaps;for(let Wt=0;Wt<xt.length;Wt++){const ce=xt[Wt];T.format!==zi?Zt!==null?F?wt&&i.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Wt,0,0,ce.width,ce.height,Zt,ce.data):i.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Wt,fe,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?wt&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Wt,0,0,ce.width,ce.height,Zt,Pt,ce.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Wt,fe,ce.width,ce.height,0,Zt,Pt,ce.data)}}}else{if(xt=T.mipmaps,F&&bt){xt.length>0&&Vt++;const mt=We(Ot[0]);i.texStorage2D(o.TEXTURE_CUBE_MAP,Vt,fe,mt.width,mt.height)}for(let mt=0;mt<6;mt++)if(Tt){F?wt&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,0,0,Ot[mt].width,Ot[mt].height,Zt,Pt,Ot[mt].data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,fe,Ot[mt].width,Ot[mt].height,0,Zt,Pt,Ot[mt].data);for(let Wt=0;Wt<xt.length;Wt++){const Ge=xt[Wt].image[mt].image;F?wt&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Wt+1,0,0,Ge.width,Ge.height,Zt,Pt,Ge.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Wt+1,fe,Ge.width,Ge.height,0,Zt,Pt,Ge.data)}}else{F?wt&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,0,0,Zt,Pt,Ot[mt]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,fe,Zt,Pt,Ot[mt]);for(let Wt=0;Wt<xt.length;Wt++){const ce=xt[Wt];F?wt&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Wt+1,0,0,Zt,Pt,ce.image[mt]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Wt+1,fe,Zt,Pt,ce.image[mt])}}}y(T)&&S(o.TEXTURE_CUBE_MAP),ft.__version=vt.version,T.onUpdate&&T.onUpdate(T)}D.__version=T.version}function yt(D,T,tt,dt,vt,ft){const kt=f.convert(tt.format,tt.colorSpace),Rt=f.convert(tt.type),jt=z(tt.internalFormat,kt,Rt,tt.colorSpace),Kt=r.get(T),Tt=r.get(tt);if(Tt.__renderTarget=T,!Kt.__hasExternalTextures){const Ot=Math.max(1,T.width>>ft),ie=Math.max(1,T.height>>ft);vt===o.TEXTURE_3D||vt===o.TEXTURE_2D_ARRAY?i.texImage3D(vt,ft,jt,Ot,ie,T.depth,0,kt,Rt,null):i.texImage2D(vt,ft,jt,Ot,ie,0,kt,Rt,null)}i.bindFramebuffer(o.FRAMEBUFFER,D),Ft(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,dt,vt,Tt.__webglTexture,0,ae(T)):(vt===o.TEXTURE_2D||vt>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&vt<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,dt,vt,Tt.__webglTexture,ft),i.bindFramebuffer(o.FRAMEBUFFER,null)}function Ut(D,T,tt){if(o.bindRenderbuffer(o.RENDERBUFFER,D),T.depthBuffer){const dt=T.depthTexture,vt=dt&&dt.isDepthTexture?dt.type:null,ft=U(T.stencilBuffer,vt),kt=T.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Rt=ae(T);Ft(T)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Rt,ft,T.width,T.height):tt?o.renderbufferStorageMultisample(o.RENDERBUFFER,Rt,ft,T.width,T.height):o.renderbufferStorage(o.RENDERBUFFER,ft,T.width,T.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,kt,o.RENDERBUFFER,D)}else{const dt=T.textures;for(let vt=0;vt<dt.length;vt++){const ft=dt[vt],kt=f.convert(ft.format,ft.colorSpace),Rt=f.convert(ft.type),jt=z(ft.internalFormat,kt,Rt,ft.colorSpace),Kt=ae(T);tt&&Ft(T)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,Kt,jt,T.width,T.height):Ft(T)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Kt,jt,T.width,T.height):o.renderbufferStorage(o.RENDERBUFFER,jt,T.width,T.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function At(D,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(o.FRAMEBUFFER,D),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const dt=r.get(T.depthTexture);dt.__renderTarget=T,(!dt.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),lt(T.depthTexture,0);const vt=dt.__webglTexture,ft=ae(T);if(T.depthTexture.format===_l)Ft(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,vt,0,ft):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,vt,0);else if(T.depthTexture.format===vl)Ft(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,vt,0,ft):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,vt,0);else throw new Error("Unknown depthTexture format")}function Mt(D){const T=r.get(D),tt=D.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==D.depthTexture){const dt=D.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),dt){const vt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,dt.removeEventListener("dispose",vt)};dt.addEventListener("dispose",vt),T.__depthDisposeCallback=vt}T.__boundDepthTexture=dt}if(D.depthTexture&&!T.__autoAllocateDepthBuffer){if(tt)throw new Error("target.depthTexture not supported in Cube render targets");const dt=D.texture.mipmaps;dt&&dt.length>0?At(T.__webglFramebuffer[0],D):At(T.__webglFramebuffer,D)}else if(tt){T.__webglDepthbuffer=[];for(let dt=0;dt<6;dt++)if(i.bindFramebuffer(o.FRAMEBUFFER,T.__webglFramebuffer[dt]),T.__webglDepthbuffer[dt]===void 0)T.__webglDepthbuffer[dt]=o.createRenderbuffer(),Ut(T.__webglDepthbuffer[dt],D,!1);else{const vt=D.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,ft=T.__webglDepthbuffer[dt];o.bindRenderbuffer(o.RENDERBUFFER,ft),o.framebufferRenderbuffer(o.FRAMEBUFFER,vt,o.RENDERBUFFER,ft)}}else{const dt=D.texture.mipmaps;if(dt&&dt.length>0?i.bindFramebuffer(o.FRAMEBUFFER,T.__webglFramebuffer[0]):i.bindFramebuffer(o.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=o.createRenderbuffer(),Ut(T.__webglDepthbuffer,D,!1);else{const vt=D.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,ft=T.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,ft),o.framebufferRenderbuffer(o.FRAMEBUFFER,vt,o.RENDERBUFFER,ft)}}i.bindFramebuffer(o.FRAMEBUFFER,null)}function Yt(D,T,tt){const dt=r.get(D);T!==void 0&&yt(dt.__webglFramebuffer,D,D.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),tt!==void 0&&Mt(D)}function L(D){const T=D.texture,tt=r.get(D),dt=r.get(T);D.addEventListener("dispose",O);const vt=D.textures,ft=D.isWebGLCubeRenderTarget===!0,kt=vt.length>1;if(kt||(dt.__webglTexture===void 0&&(dt.__webglTexture=o.createTexture()),dt.__version=T.version,h.memory.textures++),ft){tt.__webglFramebuffer=[];for(let Rt=0;Rt<6;Rt++)if(T.mipmaps&&T.mipmaps.length>0){tt.__webglFramebuffer[Rt]=[];for(let jt=0;jt<T.mipmaps.length;jt++)tt.__webglFramebuffer[Rt][jt]=o.createFramebuffer()}else tt.__webglFramebuffer[Rt]=o.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){tt.__webglFramebuffer=[];for(let Rt=0;Rt<T.mipmaps.length;Rt++)tt.__webglFramebuffer[Rt]=o.createFramebuffer()}else tt.__webglFramebuffer=o.createFramebuffer();if(kt)for(let Rt=0,jt=vt.length;Rt<jt;Rt++){const Kt=r.get(vt[Rt]);Kt.__webglTexture===void 0&&(Kt.__webglTexture=o.createTexture(),h.memory.textures++)}if(D.samples>0&&Ft(D)===!1){tt.__webglMultisampledFramebuffer=o.createFramebuffer(),tt.__webglColorRenderbuffer=[],i.bindFramebuffer(o.FRAMEBUFFER,tt.__webglMultisampledFramebuffer);for(let Rt=0;Rt<vt.length;Rt++){const jt=vt[Rt];tt.__webglColorRenderbuffer[Rt]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,tt.__webglColorRenderbuffer[Rt]);const Kt=f.convert(jt.format,jt.colorSpace),Tt=f.convert(jt.type),Ot=z(jt.internalFormat,Kt,Tt,jt.colorSpace,D.isXRRenderTarget===!0),ie=ae(D);o.renderbufferStorageMultisample(o.RENDERBUFFER,ie,Ot,D.width,D.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Rt,o.RENDERBUFFER,tt.__webglColorRenderbuffer[Rt])}o.bindRenderbuffer(o.RENDERBUFFER,null),D.depthBuffer&&(tt.__webglDepthRenderbuffer=o.createRenderbuffer(),Ut(tt.__webglDepthRenderbuffer,D,!0)),i.bindFramebuffer(o.FRAMEBUFFER,null)}}if(ft){i.bindTexture(o.TEXTURE_CUBE_MAP,dt.__webglTexture),oe(o.TEXTURE_CUBE_MAP,T);for(let Rt=0;Rt<6;Rt++)if(T.mipmaps&&T.mipmaps.length>0)for(let jt=0;jt<T.mipmaps.length;jt++)yt(tt.__webglFramebuffer[Rt][jt],D,T,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Rt,jt);else yt(tt.__webglFramebuffer[Rt],D,T,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Rt,0);y(T)&&S(o.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(kt){for(let Rt=0,jt=vt.length;Rt<jt;Rt++){const Kt=vt[Rt],Tt=r.get(Kt);let Ot=o.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Ot=D.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(Ot,Tt.__webglTexture),oe(Ot,Kt),yt(tt.__webglFramebuffer,D,Kt,o.COLOR_ATTACHMENT0+Rt,Ot,0),y(Kt)&&S(Ot)}i.unbindTexture()}else{let Rt=o.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Rt=D.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(Rt,dt.__webglTexture),oe(Rt,T),T.mipmaps&&T.mipmaps.length>0)for(let jt=0;jt<T.mipmaps.length;jt++)yt(tt.__webglFramebuffer[jt],D,T,o.COLOR_ATTACHMENT0,Rt,jt);else yt(tt.__webglFramebuffer,D,T,o.COLOR_ATTACHMENT0,Rt,0);y(T)&&S(Rt),i.unbindTexture()}D.depthBuffer&&Mt(D)}function He(D){const T=D.textures;for(let tt=0,dt=T.length;tt<dt;tt++){const vt=T[tt];if(y(vt)){const ft=I(D),kt=r.get(vt).__webglTexture;i.bindTexture(ft,kt),S(ft),i.unbindTexture()}}}const re=[],Qt=[];function Nt(D){if(D.samples>0){if(Ft(D)===!1){const T=D.textures,tt=D.width,dt=D.height;let vt=o.COLOR_BUFFER_BIT;const ft=D.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,kt=r.get(D),Rt=T.length>1;if(Rt)for(let Kt=0;Kt<T.length;Kt++)i.bindFramebuffer(o.FRAMEBUFFER,kt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Kt,o.RENDERBUFFER,null),i.bindFramebuffer(o.FRAMEBUFFER,kt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Kt,o.TEXTURE_2D,null,0);i.bindFramebuffer(o.READ_FRAMEBUFFER,kt.__webglMultisampledFramebuffer);const jt=D.texture.mipmaps;jt&&jt.length>0?i.bindFramebuffer(o.DRAW_FRAMEBUFFER,kt.__webglFramebuffer[0]):i.bindFramebuffer(o.DRAW_FRAMEBUFFER,kt.__webglFramebuffer);for(let Kt=0;Kt<T.length;Kt++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(vt|=o.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(vt|=o.STENCIL_BUFFER_BIT)),Rt){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,kt.__webglColorRenderbuffer[Kt]);const Tt=r.get(T[Kt]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,Tt,0)}o.blitFramebuffer(0,0,tt,dt,0,0,tt,dt,vt,o.NEAREST),m===!0&&(re.length=0,Qt.length=0,re.push(o.COLOR_ATTACHMENT0+Kt),D.depthBuffer&&D.resolveDepthBuffer===!1&&(re.push(ft),Qt.push(ft),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,Qt)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,re))}if(i.bindFramebuffer(o.READ_FRAMEBUFFER,null),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),Rt)for(let Kt=0;Kt<T.length;Kt++){i.bindFramebuffer(o.FRAMEBUFFER,kt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Kt,o.RENDERBUFFER,kt.__webglColorRenderbuffer[Kt]);const Tt=r.get(T[Kt]).__webglTexture;i.bindFramebuffer(o.FRAMEBUFFER,kt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Kt,o.TEXTURE_2D,Tt,0)}i.bindFramebuffer(o.DRAW_FRAMEBUFFER,kt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&m){const T=D.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[T])}}}function ae(D){return Math.min(u.maxSamples,D.samples)}function Ft(D){const T=r.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function le(D){const T=h.render.frame;v.get(D)!==T&&(v.set(D,T),D.update())}function qe(D,T){const tt=D.colorSpace,dt=D.format,vt=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||tt!==ms&&tt!==ds&&(De.getTransfer(tt)===ke?(dt!==zi||vt!==wa)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",tt)),T}function We(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(g.width=D.naturalWidth||D.width,g.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(g.width=D.displayWidth,g.height=D.displayHeight):(g.width=D.width,g.height=D.height),g}this.allocateTextureUnit=ut,this.resetTextureUnits=at,this.setTexture2D=lt,this.setTexture2DArray=W,this.setTexture3D=st,this.setTextureCube=Z,this.rebindTextures=Yt,this.setupRenderTarget=L,this.updateRenderTargetMipmap=He,this.updateMultisampleRenderTarget=Nt,this.setupDepthRenderbuffer=Mt,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=Ft}function qR(o,e){function i(r,u=ds){let f;const h=De.getTransfer(u);if(r===wa)return o.UNSIGNED_BYTE;if(r===Gp)return o.UNSIGNED_SHORT_4_4_4_4;if(r===Vp)return o.UNSIGNED_SHORT_5_5_5_1;if(r===MS)return o.UNSIGNED_INT_5_9_9_9_REV;if(r===ES)return o.UNSIGNED_INT_10F_11F_11F_REV;if(r===xS)return o.BYTE;if(r===yS)return o.SHORT;if(r===ml)return o.UNSIGNED_SHORT;if(r===Hp)return o.INT;if(r===Qs)return o.UNSIGNED_INT;if(r===Ta)return o.FLOAT;if(r===ta)return o.HALF_FLOAT;if(r===TS)return o.ALPHA;if(r===bS)return o.RGB;if(r===zi)return o.RGBA;if(r===_l)return o.DEPTH_COMPONENT;if(r===vl)return o.DEPTH_STENCIL;if(r===AS)return o.RED;if(r===kp)return o.RED_INTEGER;if(r===RS)return o.RG;if(r===Xp)return o.RG_INTEGER;if(r===qp)return o.RGBA_INTEGER;if(r===_c||r===vc||r===Sc||r===xc)if(h===ke)if(f=e.get("WEBGL_compressed_texture_s3tc_srgb"),f!==null){if(r===_c)return f.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===vc)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Sc)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===xc)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(f=e.get("WEBGL_compressed_texture_s3tc"),f!==null){if(r===_c)return f.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===vc)return f.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Sc)return f.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===xc)return f.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===sp||r===rp||r===op||r===lp)if(f=e.get("WEBGL_compressed_texture_pvrtc"),f!==null){if(r===sp)return f.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===rp)return f.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===op)return f.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===lp)return f.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===up||r===cp||r===fp)if(f=e.get("WEBGL_compressed_texture_etc"),f!==null){if(r===up||r===cp)return h===ke?f.COMPRESSED_SRGB8_ETC2:f.COMPRESSED_RGB8_ETC2;if(r===fp)return h===ke?f.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:f.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===hp||r===dp||r===pp||r===mp||r===gp||r===_p||r===vp||r===Sp||r===xp||r===yp||r===Mp||r===Ep||r===Tp||r===bp)if(f=e.get("WEBGL_compressed_texture_astc"),f!==null){if(r===hp)return h===ke?f.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:f.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===dp)return h===ke?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:f.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===pp)return h===ke?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:f.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===mp)return h===ke?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:f.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===gp)return h===ke?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:f.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===_p)return h===ke?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:f.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===vp)return h===ke?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:f.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Sp)return h===ke?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:f.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===xp)return h===ke?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:f.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===yp)return h===ke?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:f.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Mp)return h===ke?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:f.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Ep)return h===ke?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:f.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Tp)return h===ke?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:f.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===bp)return h===ke?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:f.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Ap||r===Rp||r===Cp)if(f=e.get("EXT_texture_compression_bptc"),f!==null){if(r===Ap)return h===ke?f.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:f.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Rp)return f.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Cp)return f.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===wp||r===Dp||r===Up||r===Np)if(f=e.get("EXT_texture_compression_rgtc"),f!==null){if(r===wp)return f.COMPRESSED_RED_RGTC1_EXT;if(r===Dp)return f.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Up)return f.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Np)return f.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===gl?o.UNSIGNED_INT_24_8:o[r]!==void 0?o[r]:null}return{convert:i}}const YR=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,WR=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class jR{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const r=new GS(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,r=new Vn({vertexShader:YR,fragmentShader:WR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Ii(new Uc(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ZR extends $s{constructor(e,i){super();const r=this;let u=null,f=1,h=null,d="local-floor",m=1,g=null,v=null,_=null,x=null,M=null,A=null;const C=typeof XRWebGLBinding<"u",y=new jR,S={},I=i.getContextAttributes();let z=null,U=null;const V=[],H=[],O=new ne;let q=null;const w=new Mi;w.viewport=new rn;const R=new Mi;R.viewport=new rn;const G=[w,R],at=new pT;let ut=null,gt=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let it=V[J];return it===void 0&&(it=new Pd,V[J]=it),it.getTargetRaySpace()},this.getControllerGrip=function(J){let it=V[J];return it===void 0&&(it=new Pd,V[J]=it),it.getGripSpace()},this.getHand=function(J){let it=V[J];return it===void 0&&(it=new Pd,V[J]=it),it.getHandSpace()};function lt(J){const it=H.indexOf(J.inputSource);if(it===-1)return;const yt=V[it];yt!==void 0&&(yt.update(J.inputSource,J.frame,g||h),yt.dispatchEvent({type:J.type,data:J.inputSource}))}function W(){u.removeEventListener("select",lt),u.removeEventListener("selectstart",lt),u.removeEventListener("selectend",lt),u.removeEventListener("squeeze",lt),u.removeEventListener("squeezestart",lt),u.removeEventListener("squeezeend",lt),u.removeEventListener("end",W),u.removeEventListener("inputsourceschange",st);for(let J=0;J<V.length;J++){const it=H[J];it!==null&&(H[J]=null,V[J].disconnect(it))}ut=null,gt=null,y.reset();for(const J in S)delete S[J];e.setRenderTarget(z),M=null,x=null,_=null,u=null,U=null,ct.stop(),r.isPresenting=!1,e.setPixelRatio(q),e.setSize(O.width,O.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){f=J,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){d=J,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return g||h},this.setReferenceSpace=function(J){g=J},this.getBaseLayer=function(){return x!==null?x:M},this.getBinding=function(){return _===null&&C&&(_=new XRWebGLBinding(u,i)),_},this.getFrame=function(){return A},this.getSession=function(){return u},this.setSession=async function(J){if(u=J,u!==null){if(z=e.getRenderTarget(),u.addEventListener("select",lt),u.addEventListener("selectstart",lt),u.addEventListener("selectend",lt),u.addEventListener("squeeze",lt),u.addEventListener("squeezestart",lt),u.addEventListener("squeezeend",lt),u.addEventListener("end",W),u.addEventListener("inputsourceschange",st),I.xrCompatible!==!0&&await i.makeXRCompatible(),q=e.getPixelRatio(),e.getSize(O),C&&"createProjectionLayer"in XRWebGLBinding.prototype){let yt=null,Ut=null,At=null;I.depth&&(At=I.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,yt=I.stencil?vl:_l,Ut=I.stencil?gl:Qs);const Mt={colorFormat:i.RGBA8,depthFormat:At,scaleFactor:f};_=this.getBinding(),x=_.createProjectionLayer(Mt),u.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),U=new Ei(x.textureWidth,x.textureHeight,{format:zi,type:wa,depthTexture:new HS(x.textureWidth,x.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,yt),stencilBuffer:I.stencil,colorSpace:e.outputColorSpace,samples:I.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}else{const yt={antialias:I.antialias,alpha:!0,depth:I.depth,stencil:I.stencil,framebufferScaleFactor:f};M=new XRWebGLLayer(u,i,yt),u.updateRenderState({baseLayer:M}),e.setPixelRatio(1),e.setSize(M.framebufferWidth,M.framebufferHeight,!1),U=new Ei(M.framebufferWidth,M.framebufferHeight,{format:zi,type:wa,colorSpace:e.outputColorSpace,stencilBuffer:I.stencil,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}U.isXRRenderTarget=!0,this.setFoveation(m),g=null,h=await u.requestReferenceSpace(d),ct.setContext(u),ct.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(u!==null)return u.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function st(J){for(let it=0;it<J.removed.length;it++){const yt=J.removed[it],Ut=H.indexOf(yt);Ut>=0&&(H[Ut]=null,V[Ut].disconnect(yt))}for(let it=0;it<J.added.length;it++){const yt=J.added[it];let Ut=H.indexOf(yt);if(Ut===-1){for(let Mt=0;Mt<V.length;Mt++)if(Mt>=H.length){H.push(yt),Ut=Mt;break}else if(H[Mt]===null){H[Mt]=yt,Ut=Mt;break}if(Ut===-1)break}const At=V[Ut];At&&At.connect(yt)}}const Z=new et,_t=new et;function St(J,it,yt){Z.setFromMatrixPosition(it.matrixWorld),_t.setFromMatrixPosition(yt.matrixWorld);const Ut=Z.distanceTo(_t),At=it.projectionMatrix.elements,Mt=yt.projectionMatrix.elements,Yt=At[14]/(At[10]-1),L=At[14]/(At[10]+1),He=(At[9]+1)/At[5],re=(At[9]-1)/At[5],Qt=(At[8]-1)/At[0],Nt=(Mt[8]+1)/Mt[0],ae=Yt*Qt,Ft=Yt*Nt,le=Ut/(-Qt+Nt),qe=le*-Qt;if(it.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(qe),J.translateZ(le),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),At[10]===-1)J.projectionMatrix.copy(it.projectionMatrix),J.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{const We=Yt+le,D=L+le,T=ae-qe,tt=Ft+(Ut-qe),dt=He*L/D*We,vt=re*L/D*We;J.projectionMatrix.makePerspective(T,tt,dt,vt,We,D),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function Gt(J,it){it===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(it.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(u===null)return;let it=J.near,yt=J.far;y.texture!==null&&(y.depthNear>0&&(it=y.depthNear),y.depthFar>0&&(yt=y.depthFar)),at.near=R.near=w.near=it,at.far=R.far=w.far=yt,(ut!==at.near||gt!==at.far)&&(u.updateRenderState({depthNear:at.near,depthFar:at.far}),ut=at.near,gt=at.far),at.layers.mask=J.layers.mask|6,w.layers.mask=at.layers.mask&3,R.layers.mask=at.layers.mask&5;const Ut=J.parent,At=at.cameras;Gt(at,Ut);for(let Mt=0;Mt<At.length;Mt++)Gt(At[Mt],Ut);At.length===2?St(at,w,R):at.projectionMatrix.copy(w.projectionMatrix),oe(J,at,Ut)};function oe(J,it,yt){yt===null?J.matrix.copy(it.matrixWorld):(J.matrix.copy(yt.matrixWorld),J.matrix.invert(),J.matrix.multiply(it.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(it.projectionMatrix),J.projectionMatrixInverse.copy(it.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Lp*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return at},this.getFoveation=function(){if(!(x===null&&M===null))return m},this.setFoveation=function(J){m=J,x!==null&&(x.fixedFoveation=J),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=J)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(at)},this.getCameraTexture=function(J){return S[J]};let be=null;function P(J,it){if(v=it.getViewerPose(g||h),A=it,v!==null){const yt=v.views;M!==null&&(e.setRenderTargetFramebuffer(U,M.framebuffer),e.setRenderTarget(U));let Ut=!1;yt.length!==at.cameras.length&&(at.cameras.length=0,Ut=!0);for(let L=0;L<yt.length;L++){const He=yt[L];let re=null;if(M!==null)re=M.getViewport(He);else{const Nt=_.getViewSubImage(x,He);re=Nt.viewport,L===0&&(e.setRenderTargetTextures(U,Nt.colorTexture,Nt.depthStencilTexture),e.setRenderTarget(U))}let Qt=G[L];Qt===void 0&&(Qt=new Mi,Qt.layers.enable(L),Qt.viewport=new rn,G[L]=Qt),Qt.matrix.fromArray(He.transform.matrix),Qt.matrix.decompose(Qt.position,Qt.quaternion,Qt.scale),Qt.projectionMatrix.fromArray(He.projectionMatrix),Qt.projectionMatrixInverse.copy(Qt.projectionMatrix).invert(),Qt.viewport.set(re.x,re.y,re.width,re.height),L===0&&(at.matrix.copy(Qt.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale)),Ut===!0&&at.cameras.push(Qt)}const At=u.enabledFeatures;if(At&&At.includes("depth-sensing")&&u.depthUsage=="gpu-optimized"&&C){_=r.getBinding();const L=_.getDepthInformation(yt[0]);L&&L.isValid&&L.texture&&y.init(L,u.renderState)}if(At&&At.includes("camera-access")&&C){e.state.unbindTexture(),_=r.getBinding();for(let L=0;L<yt.length;L++){const He=yt[L].camera;if(He){let re=S[He];re||(re=new GS,S[He]=re);const Qt=_.getCameraImage(He);re.sourceTexture=Qt}}}}for(let yt=0;yt<V.length;yt++){const Ut=H[yt],At=V[yt];Ut!==null&&At!==void 0&&At.update(Ut,it,g||h)}be&&be(J,it),it.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:it}),A=null}const ct=new VS;ct.setAnimationLoop(P),this.setAnimationLoop=function(J){be=J},this.dispose=function(){}}}const qs=new Da,KR=new _n;function QR(o,e){function i(y,S){y.matrixAutoUpdate===!0&&y.updateMatrix(),S.value.copy(y.matrix)}function r(y,S){S.color.getRGB(y.fogColor.value,zS(o)),S.isFog?(y.fogNear.value=S.near,y.fogFar.value=S.far):S.isFogExp2&&(y.fogDensity.value=S.density)}function u(y,S,I,z,U){S.isMeshBasicMaterial||S.isMeshLambertMaterial?f(y,S):S.isMeshToonMaterial?(f(y,S),_(y,S)):S.isMeshPhongMaterial?(f(y,S),v(y,S)):S.isMeshStandardMaterial?(f(y,S),x(y,S),S.isMeshPhysicalMaterial&&M(y,S,U)):S.isMeshMatcapMaterial?(f(y,S),A(y,S)):S.isMeshDepthMaterial?f(y,S):S.isMeshDistanceMaterial?(f(y,S),C(y,S)):S.isMeshNormalMaterial?f(y,S):S.isLineBasicMaterial?(h(y,S),S.isLineDashedMaterial&&d(y,S)):S.isPointsMaterial?m(y,S,I,z):S.isSpriteMaterial?g(y,S):S.isShadowMaterial?(y.color.value.copy(S.color),y.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function f(y,S){y.opacity.value=S.opacity,S.color&&y.diffuse.value.copy(S.color),S.emissive&&y.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(y.map.value=S.map,i(S.map,y.mapTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,i(S.alphaMap,y.alphaMapTransform)),S.bumpMap&&(y.bumpMap.value=S.bumpMap,i(S.bumpMap,y.bumpMapTransform),y.bumpScale.value=S.bumpScale,S.side===Kn&&(y.bumpScale.value*=-1)),S.normalMap&&(y.normalMap.value=S.normalMap,i(S.normalMap,y.normalMapTransform),y.normalScale.value.copy(S.normalScale),S.side===Kn&&y.normalScale.value.negate()),S.displacementMap&&(y.displacementMap.value=S.displacementMap,i(S.displacementMap,y.displacementMapTransform),y.displacementScale.value=S.displacementScale,y.displacementBias.value=S.displacementBias),S.emissiveMap&&(y.emissiveMap.value=S.emissiveMap,i(S.emissiveMap,y.emissiveMapTransform)),S.specularMap&&(y.specularMap.value=S.specularMap,i(S.specularMap,y.specularMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest);const I=e.get(S),z=I.envMap,U=I.envMapRotation;z&&(y.envMap.value=z,qs.copy(U),qs.x*=-1,qs.y*=-1,qs.z*=-1,z.isCubeTexture&&z.isRenderTargetTexture===!1&&(qs.y*=-1,qs.z*=-1),y.envMapRotation.value.setFromMatrix4(KR.makeRotationFromEuler(qs)),y.flipEnvMap.value=z.isCubeTexture&&z.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=S.reflectivity,y.ior.value=S.ior,y.refractionRatio.value=S.refractionRatio),S.lightMap&&(y.lightMap.value=S.lightMap,y.lightMapIntensity.value=S.lightMapIntensity,i(S.lightMap,y.lightMapTransform)),S.aoMap&&(y.aoMap.value=S.aoMap,y.aoMapIntensity.value=S.aoMapIntensity,i(S.aoMap,y.aoMapTransform))}function h(y,S){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,S.map&&(y.map.value=S.map,i(S.map,y.mapTransform))}function d(y,S){y.dashSize.value=S.dashSize,y.totalSize.value=S.dashSize+S.gapSize,y.scale.value=S.scale}function m(y,S,I,z){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,y.size.value=S.size*I,y.scale.value=z*.5,S.map&&(y.map.value=S.map,i(S.map,y.uvTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,i(S.alphaMap,y.alphaMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest)}function g(y,S){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,y.rotation.value=S.rotation,S.map&&(y.map.value=S.map,i(S.map,y.mapTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,i(S.alphaMap,y.alphaMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest)}function v(y,S){y.specular.value.copy(S.specular),y.shininess.value=Math.max(S.shininess,1e-4)}function _(y,S){S.gradientMap&&(y.gradientMap.value=S.gradientMap)}function x(y,S){y.metalness.value=S.metalness,S.metalnessMap&&(y.metalnessMap.value=S.metalnessMap,i(S.metalnessMap,y.metalnessMapTransform)),y.roughness.value=S.roughness,S.roughnessMap&&(y.roughnessMap.value=S.roughnessMap,i(S.roughnessMap,y.roughnessMapTransform)),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)}function M(y,S,I){y.ior.value=S.ior,S.sheen>0&&(y.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),y.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(y.sheenColorMap.value=S.sheenColorMap,i(S.sheenColorMap,y.sheenColorMapTransform)),S.sheenRoughnessMap&&(y.sheenRoughnessMap.value=S.sheenRoughnessMap,i(S.sheenRoughnessMap,y.sheenRoughnessMapTransform))),S.clearcoat>0&&(y.clearcoat.value=S.clearcoat,y.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(y.clearcoatMap.value=S.clearcoatMap,i(S.clearcoatMap,y.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,i(S.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(y.clearcoatNormalMap.value=S.clearcoatNormalMap,i(S.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===Kn&&y.clearcoatNormalScale.value.negate())),S.dispersion>0&&(y.dispersion.value=S.dispersion),S.iridescence>0&&(y.iridescence.value=S.iridescence,y.iridescenceIOR.value=S.iridescenceIOR,y.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(y.iridescenceMap.value=S.iridescenceMap,i(S.iridescenceMap,y.iridescenceMapTransform)),S.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=S.iridescenceThicknessMap,i(S.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),S.transmission>0&&(y.transmission.value=S.transmission,y.transmissionSamplerMap.value=I.texture,y.transmissionSamplerSize.value.set(I.width,I.height),S.transmissionMap&&(y.transmissionMap.value=S.transmissionMap,i(S.transmissionMap,y.transmissionMapTransform)),y.thickness.value=S.thickness,S.thicknessMap&&(y.thicknessMap.value=S.thicknessMap,i(S.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=S.attenuationDistance,y.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(y.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(y.anisotropyMap.value=S.anisotropyMap,i(S.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=S.specularIntensity,y.specularColor.value.copy(S.specularColor),S.specularColorMap&&(y.specularColorMap.value=S.specularColorMap,i(S.specularColorMap,y.specularColorMapTransform)),S.specularIntensityMap&&(y.specularIntensityMap.value=S.specularIntensityMap,i(S.specularIntensityMap,y.specularIntensityMapTransform))}function A(y,S){S.matcap&&(y.matcap.value=S.matcap)}function C(y,S){const I=e.get(S).light;y.referencePosition.value.setFromMatrixPosition(I.matrixWorld),y.nearDistance.value=I.shadow.camera.near,y.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:u}}function JR(o,e,i,r){let u={},f={},h=[];const d=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function m(I,z){const U=z.program;r.uniformBlockBinding(I,U)}function g(I,z){let U=u[I.id];U===void 0&&(A(I),U=v(I),u[I.id]=U,I.addEventListener("dispose",y));const V=z.program;r.updateUBOMapping(I,V);const H=e.render.frame;f[I.id]!==H&&(x(I),f[I.id]=H)}function v(I){const z=_();I.__bindingPointIndex=z;const U=o.createBuffer(),V=I.__size,H=I.usage;return o.bindBuffer(o.UNIFORM_BUFFER,U),o.bufferData(o.UNIFORM_BUFFER,V,H),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,z,U),U}function _(){for(let I=0;I<d;I++)if(h.indexOf(I)===-1)return h.push(I),I;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(I){const z=u[I.id],U=I.uniforms,V=I.__cache;o.bindBuffer(o.UNIFORM_BUFFER,z);for(let H=0,O=U.length;H<O;H++){const q=Array.isArray(U[H])?U[H]:[U[H]];for(let w=0,R=q.length;w<R;w++){const G=q[w];if(M(G,H,w,V)===!0){const at=G.__offset,ut=Array.isArray(G.value)?G.value:[G.value];let gt=0;for(let lt=0;lt<ut.length;lt++){const W=ut[lt],st=C(W);typeof W=="number"||typeof W=="boolean"?(G.__data[0]=W,o.bufferSubData(o.UNIFORM_BUFFER,at+gt,G.__data)):W.isMatrix3?(G.__data[0]=W.elements[0],G.__data[1]=W.elements[1],G.__data[2]=W.elements[2],G.__data[3]=0,G.__data[4]=W.elements[3],G.__data[5]=W.elements[4],G.__data[6]=W.elements[5],G.__data[7]=0,G.__data[8]=W.elements[6],G.__data[9]=W.elements[7],G.__data[10]=W.elements[8],G.__data[11]=0):(W.toArray(G.__data,gt),gt+=st.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,at,G.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function M(I,z,U,V){const H=I.value,O=z+"_"+U;if(V[O]===void 0)return typeof H=="number"||typeof H=="boolean"?V[O]=H:V[O]=H.clone(),!0;{const q=V[O];if(typeof H=="number"||typeof H=="boolean"){if(q!==H)return V[O]=H,!0}else if(q.equals(H)===!1)return q.copy(H),!0}return!1}function A(I){const z=I.uniforms;let U=0;const V=16;for(let O=0,q=z.length;O<q;O++){const w=Array.isArray(z[O])?z[O]:[z[O]];for(let R=0,G=w.length;R<G;R++){const at=w[R],ut=Array.isArray(at.value)?at.value:[at.value];for(let gt=0,lt=ut.length;gt<lt;gt++){const W=ut[gt],st=C(W),Z=U%V,_t=Z%st.boundary,St=Z+_t;U+=_t,St!==0&&V-St<st.storage&&(U+=V-St),at.__data=new Float32Array(st.storage/Float32Array.BYTES_PER_ELEMENT),at.__offset=U,U+=st.storage}}}const H=U%V;return H>0&&(U+=V-H),I.__size=U,I.__cache={},this}function C(I){const z={boundary:0,storage:0};return typeof I=="number"||typeof I=="boolean"?(z.boundary=4,z.storage=4):I.isVector2?(z.boundary=8,z.storage=8):I.isVector3||I.isColor?(z.boundary=16,z.storage=12):I.isVector4?(z.boundary=16,z.storage=16):I.isMatrix3?(z.boundary=48,z.storage=48):I.isMatrix4?(z.boundary=64,z.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),z}function y(I){const z=I.target;z.removeEventListener("dispose",y);const U=h.indexOf(z.__bindingPointIndex);h.splice(U,1),o.deleteBuffer(u[z.id]),delete u[z.id],delete f[z.id]}function S(){for(const I in u)o.deleteBuffer(u[I]);h=[],u={},f={}}return{bind:m,update:g,dispose:S}}class $R{constructor(e={}){const{canvas:i=IE(),context:r=null,depth:u=!0,stencil:f=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:g=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:x=!1}=e;this.isWebGLRenderer=!0;let M;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=r.getContextAttributes().alpha}else M=h;const A=new Uint32Array(4),C=new Int32Array(4);let y=null,S=null;const I=[],z=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Aa,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const U=this;let V=!1;this._outputColorSpace=yi;let H=0,O=0,q=null,w=-1,R=null;const G=new rn,at=new rn;let ut=null;const gt=new Ue(0);let lt=0,W=i.width,st=i.height,Z=1,_t=null,St=null;const Gt=new rn(0,0,W,st),oe=new rn(0,0,W,st);let be=!1;const P=new FS;let ct=!1,J=!1;const it=new _n,yt=new et,Ut=new rn,At={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Mt=!1;function Yt(){return q===null?Z:1}let L=r;function He(b,j){return i.getContext(b,j)}try{const b={alpha:!0,depth:u,stencil:f,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:g,powerPreference:v,failIfMajorPerformanceCaveat:_};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Fp}`),i.addEventListener("webglcontextlost",wt,!1),i.addEventListener("webglcontextrestored",Vt,!1),i.addEventListener("webglcontextcreationerror",xt,!1),L===null){const j="webgl2";if(L=He(j,b),L===null)throw He(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let re,Qt,Nt,ae,Ft,le,qe,We,D,T,tt,dt,vt,ft,kt,Rt,jt,Kt,Tt,Ot,ie,Zt,Pt,fe;function F(){re=new uA(L),re.init(),Zt=new qR(L,re),Qt=new nA(L,re,e,Zt),Nt=new kR(L,re),Qt.reversedDepthBuffer&&x&&Nt.buffers.depth.setReversed(!0),ae=new hA(L),Ft=new DR,le=new XR(L,re,Nt,Ft,Qt,Zt,ae),qe=new aA(U),We=new lA(U),D=new vT(L),Pt=new tA(L,D),T=new cA(L,D,ae,Pt),tt=new pA(L,T,D,ae),Tt=new dA(L,Qt,le),Rt=new iA(Ft),dt=new wR(U,qe,We,re,Qt,Pt,Rt),vt=new QR(U,Ft),ft=new NR,kt=new BR(re),Kt=new $1(U,qe,We,Nt,tt,M,m),jt=new GR(U,tt,Qt),fe=new JR(L,ae,Qt,Nt),Ot=new eA(L,re,ae),ie=new fA(L,re,ae),ae.programs=dt.programs,U.capabilities=Qt,U.extensions=re,U.properties=Ft,U.renderLists=ft,U.shadowMap=jt,U.state=Nt,U.info=ae}F();const bt=new ZR(U,L);this.xr=bt,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const b=re.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=re.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(b){b!==void 0&&(Z=b,this.setSize(W,st,!1))},this.getSize=function(b){return b.set(W,st)},this.setSize=function(b,j,rt=!0){if(bt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=b,st=j,i.width=Math.floor(b*Z),i.height=Math.floor(j*Z),rt===!0&&(i.style.width=b+"px",i.style.height=j+"px"),this.setViewport(0,0,b,j)},this.getDrawingBufferSize=function(b){return b.set(W*Z,st*Z).floor()},this.setDrawingBufferSize=function(b,j,rt){W=b,st=j,Z=rt,i.width=Math.floor(b*rt),i.height=Math.floor(j*rt),this.setViewport(0,0,b,j)},this.getCurrentViewport=function(b){return b.copy(G)},this.getViewport=function(b){return b.copy(Gt)},this.setViewport=function(b,j,rt,ot){b.isVector4?Gt.set(b.x,b.y,b.z,b.w):Gt.set(b,j,rt,ot),Nt.viewport(G.copy(Gt).multiplyScalar(Z).round())},this.getScissor=function(b){return b.copy(oe)},this.setScissor=function(b,j,rt,ot){b.isVector4?oe.set(b.x,b.y,b.z,b.w):oe.set(b,j,rt,ot),Nt.scissor(at.copy(oe).multiplyScalar(Z).round())},this.getScissorTest=function(){return be},this.setScissorTest=function(b){Nt.setScissorTest(be=b)},this.setOpaqueSort=function(b){_t=b},this.setTransparentSort=function(b){St=b},this.getClearColor=function(b){return b.copy(Kt.getClearColor())},this.setClearColor=function(){Kt.setClearColor(...arguments)},this.getClearAlpha=function(){return Kt.getClearAlpha()},this.setClearAlpha=function(){Kt.setClearAlpha(...arguments)},this.clear=function(b=!0,j=!0,rt=!0){let ot=0;if(b){let K=!1;if(q!==null){const Et=q.texture.format;K=Et===qp||Et===Xp||Et===kp}if(K){const Et=q.texture.type,zt=Et===wa||Et===Qs||Et===ml||Et===gl||Et===Gp||Et===Vp,Bt=Kt.getClearColor(),Ct=Kt.getClearAlpha(),Xt=Bt.r,ee=Bt.g,$t=Bt.b;zt?(A[0]=Xt,A[1]=ee,A[2]=$t,A[3]=Ct,L.clearBufferuiv(L.COLOR,0,A)):(C[0]=Xt,C[1]=ee,C[2]=$t,C[3]=Ct,L.clearBufferiv(L.COLOR,0,C))}else ot|=L.COLOR_BUFFER_BIT}j&&(ot|=L.DEPTH_BUFFER_BIT),rt&&(ot|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(ot)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",wt,!1),i.removeEventListener("webglcontextrestored",Vt,!1),i.removeEventListener("webglcontextcreationerror",xt,!1),Kt.dispose(),ft.dispose(),kt.dispose(),Ft.dispose(),qe.dispose(),We.dispose(),tt.dispose(),Pt.dispose(),fe.dispose(),dt.dispose(),bt.dispose(),bt.removeEventListener("sessionstart",dn),bt.removeEventListener("sessionend",Dn),ea.stop()};function wt(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),V=!0}function Vt(){console.log("THREE.WebGLRenderer: Context Restored."),V=!1;const b=ae.autoReset,j=jt.enabled,rt=jt.autoUpdate,ot=jt.needsUpdate,K=jt.type;F(),ae.autoReset=b,jt.enabled=j,jt.autoUpdate=rt,jt.needsUpdate=ot,jt.type=K}function xt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function mt(b){const j=b.target;j.removeEventListener("dispose",mt),Wt(j)}function Wt(b){ce(b),Ft.remove(b)}function ce(b){const j=Ft.get(b).programs;j!==void 0&&(j.forEach(function(rt){dt.releaseProgram(rt)}),b.isShaderMaterial&&dt.releaseShaderCache(b))}this.renderBufferDirect=function(b,j,rt,ot,K,Et){j===null&&(j=At);const zt=K.isMesh&&K.matrixWorld.determinant()<0,Bt=bl(b,j,rt,ot,K);Nt.setMaterial(ot,zt);let Ct=rt.index,Xt=1;if(ot.wireframe===!0){if(Ct=T.getWireframeAttribute(rt),Ct===void 0)return;Xt=2}const ee=rt.drawRange,$t=rt.attributes.position;let ve=ee.start*Xt,Pe=(ee.start+ee.count)*Xt;Et!==null&&(ve=Math.max(ve,Et.start*Xt),Pe=Math.min(Pe,(Et.start+Et.count)*Xt)),Ct!==null?(ve=Math.max(ve,0),Pe=Math.min(Pe,Ct.count)):$t!=null&&(ve=Math.max(ve,0),Pe=Math.min(Pe,$t.count));const Qe=Pe-ve;if(Qe<0||Qe===1/0)return;Pt.setup(K,ot,Bt,rt,Ct);let Ne,Re=Ot;if(Ct!==null&&(Ne=D.get(Ct),Re=ie,Re.setIndex(Ne)),K.isMesh)ot.wireframe===!0?(Nt.setLineWidth(ot.wireframeLinewidth*Yt()),Re.setMode(L.LINES)):Re.setMode(L.TRIANGLES);else if(K.isLine){let te=ot.linewidth;te===void 0&&(te=1),Nt.setLineWidth(te*Yt()),K.isLineSegments?Re.setMode(L.LINES):K.isLineLoop?Re.setMode(L.LINE_LOOP):Re.setMode(L.LINE_STRIP)}else K.isPoints?Re.setMode(L.POINTS):K.isSprite&&Re.setMode(L.TRIANGLES);if(K.isBatchedMesh)if(K._multiDrawInstances!==null)Sl("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Re.renderMultiDrawInstances(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount,K._multiDrawInstances);else if(re.get("WEBGL_multi_draw"))Re.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const te=K._multiDrawStarts,Le=K._multiDrawCounts,ge=K._multiDrawCount,pn=Ct?D.get(Ct).bytesPerElement:1,Jn=Ft.get(ot).currentProgram.getUniforms();for(let Ce=0;Ce<ge;Ce++)Jn.setValue(L,"_gl_DrawID",Ce),Re.render(te[Ce]/pn,Le[Ce])}else if(K.isInstancedMesh)Re.renderInstances(ve,Qe,K.count);else if(rt.isInstancedBufferGeometry){const te=rt._maxInstanceCount!==void 0?rt._maxInstanceCount:1/0,Le=Math.min(rt.instanceCount,te);Re.renderInstances(ve,Qe,Le)}else Re.render(ve,Qe)};function Ge(b,j,rt){b.transparent===!0&&b.side===Ea&&b.forceSinglePass===!1?(b.side=Kn,b.needsUpdate=!0,ci(b,j,rt),b.side=ps,b.needsUpdate=!0,ci(b,j,rt),b.side=Ea):ci(b,j,rt)}this.compile=function(b,j,rt=null){rt===null&&(rt=b),S=kt.get(rt),S.init(j),z.push(S),rt.traverseVisible(function(K){K.isLight&&K.layers.test(j.layers)&&(S.pushLight(K),K.castShadow&&S.pushShadow(K))}),b!==rt&&b.traverseVisible(function(K){K.isLight&&K.layers.test(j.layers)&&(S.pushLight(K),K.castShadow&&S.pushShadow(K))}),S.setupLights();const ot=new Set;return b.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Et=K.material;if(Et)if(Array.isArray(Et))for(let zt=0;zt<Et.length;zt++){const Bt=Et[zt];Ge(Bt,rt,K),ot.add(Bt)}else Ge(Et,rt,K),ot.add(Et)}),S=z.pop(),ot},this.compileAsync=function(b,j,rt=null){const ot=this.compile(b,j,rt);return new Promise(K=>{function Et(){if(ot.forEach(function(zt){Ft.get(zt).currentProgram.isReady()&&ot.delete(zt)}),ot.size===0){K(b);return}setTimeout(Et,10)}re.get("KHR_parallel_shader_compile")!==null?Et():setTimeout(Et,10)})};let Me=null;function $e(b){Me&&Me(b)}function dn(){ea.stop()}function Dn(){ea.start()}const ea=new VS;ea.setAnimationLoop($e),typeof self<"u"&&ea.setContext(self),this.setAnimationLoop=function(b){Me=b,bt.setAnimationLoop(b),b===null?ea.stop():ea.start()},bt.addEventListener("sessionstart",dn),bt.addEventListener("sessionend",Dn),this.render=function(b,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(V===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),bt.enabled===!0&&bt.isPresenting===!0&&(bt.cameraAutoUpdate===!0&&bt.updateCamera(j),j=bt.getCamera()),b.isScene===!0&&b.onBeforeRender(U,b,j,q),S=kt.get(b,z.length),S.init(j),z.push(S),it.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),P.setFromProjectionMatrix(it,$i,j.reversedDepth),J=this.localClippingEnabled,ct=Rt.init(this.clippingPlanes,J),y=ft.get(b,I.length),y.init(),I.push(y),bt.enabled===!0&&bt.isPresenting===!0){const Et=U.xr.getDepthSensingMesh();Et!==null&&mo(Et,j,-1/0,U.sortObjects)}mo(b,j,0,U.sortObjects),y.finish(),U.sortObjects===!0&&y.sort(_t,St),Mt=bt.enabled===!1||bt.isPresenting===!1||bt.hasDepthSensing()===!1,Mt&&Kt.addToRenderList(y,b),this.info.render.frame++,ct===!0&&Rt.beginShadows();const rt=S.state.shadowsArray;jt.render(rt,b,j),ct===!0&&Rt.endShadows(),this.info.autoReset===!0&&this.info.reset();const ot=y.opaque,K=y.transmissive;if(S.setupLights(),j.isArrayCamera){const Et=j.cameras;if(K.length>0)for(let zt=0,Bt=Et.length;zt<Bt;zt++){const Ct=Et[zt];gs(ot,K,b,Ct)}Mt&&Kt.render(b);for(let zt=0,Bt=Et.length;zt<Bt;zt++){const Ct=Et[zt];Tl(y,b,Ct,Ct.viewport)}}else K.length>0&&gs(ot,K,b,j),Mt&&Kt.render(b),Tl(y,b,j);q!==null&&O===0&&(le.updateMultisampleRenderTarget(q),le.updateRenderTargetMipmap(q)),b.isScene===!0&&b.onAfterRender(U,b,j),Pt.resetDefaultState(),w=-1,R=null,z.pop(),z.length>0?(S=z[z.length-1],ct===!0&&Rt.setGlobalState(U.clippingPlanes,S.state.camera)):S=null,I.pop(),I.length>0?y=I[I.length-1]:y=null};function mo(b,j,rt,ot){if(b.visible===!1)return;if(b.layers.test(j.layers)){if(b.isGroup)rt=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(j);else if(b.isLight)S.pushLight(b),b.castShadow&&S.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||P.intersectsSprite(b)){ot&&Ut.setFromMatrixPosition(b.matrixWorld).applyMatrix4(it);const zt=tt.update(b),Bt=b.material;Bt.visible&&y.push(b,zt,Bt,rt,Ut.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||P.intersectsObject(b))){const zt=tt.update(b),Bt=b.material;if(ot&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ut.copy(b.boundingSphere.center)):(zt.boundingSphere===null&&zt.computeBoundingSphere(),Ut.copy(zt.boundingSphere.center)),Ut.applyMatrix4(b.matrixWorld).applyMatrix4(it)),Array.isArray(Bt)){const Ct=zt.groups;for(let Xt=0,ee=Ct.length;Xt<ee;Xt++){const $t=Ct[Xt],ve=Bt[$t.materialIndex];ve&&ve.visible&&y.push(b,zt,ve,rt,Ut.z,$t)}}else Bt.visible&&y.push(b,zt,Bt,rt,Ut.z,null)}}const Et=b.children;for(let zt=0,Bt=Et.length;zt<Bt;zt++)mo(Et[zt],j,rt,ot)}function Tl(b,j,rt,ot){const K=b.opaque,Et=b.transmissive,zt=b.transparent;S.setupLightsView(rt),ct===!0&&Rt.setGlobalState(U.clippingPlanes,rt),ot&&Nt.viewport(G.copy(ot)),K.length>0&&na(K,j,rt),Et.length>0&&na(Et,j,rt),zt.length>0&&na(zt,j,rt),Nt.buffers.depth.setTest(!0),Nt.buffers.depth.setMask(!0),Nt.buffers.color.setMask(!0),Nt.setPolygonOffset(!1)}function gs(b,j,rt,ot){if((rt.isScene===!0?rt.overrideMaterial:null)!==null)return;S.state.transmissionRenderTarget[ot.id]===void 0&&(S.state.transmissionRenderTarget[ot.id]=new Ei(1,1,{generateMipmaps:!0,type:re.has("EXT_color_buffer_half_float")||re.has("EXT_color_buffer_float")?ta:wa,minFilter:Ks,samples:4,stencilBuffer:f,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:De.workingColorSpace}));const Et=S.state.transmissionRenderTarget[ot.id],zt=ot.viewport||G;Et.setSize(zt.z*U.transmissionResolutionScale,zt.w*U.transmissionResolutionScale);const Bt=U.getRenderTarget(),Ct=U.getActiveCubeFace(),Xt=U.getActiveMipmapLevel();U.setRenderTarget(Et),U.getClearColor(gt),lt=U.getClearAlpha(),lt<1&&U.setClearColor(16777215,.5),U.clear(),Mt&&Kt.render(rt);const ee=U.toneMapping;U.toneMapping=Aa;const $t=ot.viewport;if(ot.viewport!==void 0&&(ot.viewport=void 0),S.setupLightsView(ot),ct===!0&&Rt.setGlobalState(U.clippingPlanes,ot),na(b,rt,ot),le.updateMultisampleRenderTarget(Et),le.updateRenderTargetMipmap(Et),re.has("WEBGL_multisampled_render_to_texture")===!1){let ve=!1;for(let Pe=0,Qe=j.length;Pe<Qe;Pe++){const Ne=j[Pe],Re=Ne.object,te=Ne.geometry,Le=Ne.material,ge=Ne.group;if(Le.side===Ea&&Re.layers.test(ot.layers)){const pn=Le.side;Le.side=Kn,Le.needsUpdate=!0,_s(Re,rt,ot,te,Le,ge),Le.side=pn,Le.needsUpdate=!0,ve=!0}}ve===!0&&(le.updateMultisampleRenderTarget(Et),le.updateRenderTargetMipmap(Et))}U.setRenderTarget(Bt,Ct,Xt),U.setClearColor(gt,lt),$t!==void 0&&(ot.viewport=$t),U.toneMapping=ee}function na(b,j,rt){const ot=j.isScene===!0?j.overrideMaterial:null;for(let K=0,Et=b.length;K<Et;K++){const zt=b[K],Bt=zt.object,Ct=zt.geometry,Xt=zt.group;let ee=zt.material;ee.allowOverride===!0&&ot!==null&&(ee=ot),Bt.layers.test(rt.layers)&&_s(Bt,j,rt,Ct,ee,Xt)}}function _s(b,j,rt,ot,K,Et){b.onBeforeRender(U,j,rt,ot,K,Et),b.modelViewMatrix.multiplyMatrices(rt.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),K.onBeforeRender(U,j,rt,ot,b,Et),K.transparent===!0&&K.side===Ea&&K.forceSinglePass===!1?(K.side=Kn,K.needsUpdate=!0,U.renderBufferDirect(rt,j,ot,K,b,Et),K.side=ps,K.needsUpdate=!0,U.renderBufferDirect(rt,j,ot,K,b,Et),K.side=Ea):U.renderBufferDirect(rt,j,ot,K,b,Et),b.onAfterRender(U,j,rt,ot,K,Et)}function ci(b,j,rt){j.isScene!==!0&&(j=At);const ot=Ft.get(b),K=S.state.lights,Et=S.state.shadowsArray,zt=K.state.version,Bt=dt.getParameters(b,K.state,Et,j,rt),Ct=dt.getProgramCacheKey(Bt);let Xt=ot.programs;ot.environment=b.isMeshStandardMaterial?j.environment:null,ot.fog=j.fog,ot.envMap=(b.isMeshStandardMaterial?We:qe).get(b.envMap||ot.environment),ot.envMapRotation=ot.environment!==null&&b.envMap===null?j.environmentRotation:b.envMapRotation,Xt===void 0&&(b.addEventListener("dispose",mt),Xt=new Map,ot.programs=Xt);let ee=Xt.get(Ct);if(ee!==void 0){if(ot.currentProgram===ee&&ot.lightsStateVersion===zt)return Na(b,Bt),ee}else Bt.uniforms=dt.getUniforms(b),b.onBeforeCompile(Bt,U),ee=dt.acquireProgram(Bt,Ct),Xt.set(Ct,ee),ot.uniforms=Bt.uniforms;const $t=ot.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&($t.clippingPlanes=Rt.uniform),Na(b,Bt),ot.needsLights=Al(b),ot.lightsStateVersion=zt,ot.needsLights&&($t.ambientLightColor.value=K.state.ambient,$t.lightProbe.value=K.state.probe,$t.directionalLights.value=K.state.directional,$t.directionalLightShadows.value=K.state.directionalShadow,$t.spotLights.value=K.state.spot,$t.spotLightShadows.value=K.state.spotShadow,$t.rectAreaLights.value=K.state.rectArea,$t.ltc_1.value=K.state.rectAreaLTC1,$t.ltc_2.value=K.state.rectAreaLTC2,$t.pointLights.value=K.state.point,$t.pointLightShadows.value=K.state.pointShadow,$t.hemisphereLights.value=K.state.hemi,$t.directionalShadowMap.value=K.state.directionalShadowMap,$t.directionalShadowMatrix.value=K.state.directionalShadowMatrix,$t.spotShadowMap.value=K.state.spotShadowMap,$t.spotLightMatrix.value=K.state.spotLightMatrix,$t.spotLightMap.value=K.state.spotLightMap,$t.pointShadowMap.value=K.state.pointShadowMap,$t.pointShadowMatrix.value=K.state.pointShadowMatrix),ot.currentProgram=ee,ot.uniformsList=null,ee}function vs(b){if(b.uniformsList===null){const j=b.currentProgram.getUniforms();b.uniformsList=Mc.seqWithValue(j.seq,b.uniforms)}return b.uniformsList}function Na(b,j){const rt=Ft.get(b);rt.outputColorSpace=j.outputColorSpace,rt.batching=j.batching,rt.batchingColor=j.batchingColor,rt.instancing=j.instancing,rt.instancingColor=j.instancingColor,rt.instancingMorph=j.instancingMorph,rt.skinning=j.skinning,rt.morphTargets=j.morphTargets,rt.morphNormals=j.morphNormals,rt.morphColors=j.morphColors,rt.morphTargetsCount=j.morphTargetsCount,rt.numClippingPlanes=j.numClippingPlanes,rt.numIntersection=j.numClipIntersection,rt.vertexAlphas=j.vertexAlphas,rt.vertexTangents=j.vertexTangents,rt.toneMapping=j.toneMapping}function bl(b,j,rt,ot,K){j.isScene!==!0&&(j=At),le.resetTextureUnits();const Et=j.fog,zt=ot.isMeshStandardMaterial?j.environment:null,Bt=q===null?U.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:ms,Ct=(ot.isMeshStandardMaterial?We:qe).get(ot.envMap||zt),Xt=ot.vertexColors===!0&&!!rt.attributes.color&&rt.attributes.color.itemSize===4,ee=!!rt.attributes.tangent&&(!!ot.normalMap||ot.anisotropy>0),$t=!!rt.morphAttributes.position,ve=!!rt.morphAttributes.normal,Pe=!!rt.morphAttributes.color;let Qe=Aa;ot.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(Qe=U.toneMapping);const Ne=rt.morphAttributes.position||rt.morphAttributes.normal||rt.morphAttributes.color,Re=Ne!==void 0?Ne.length:0,te=Ft.get(ot),Le=S.state.lights;if(ct===!0&&(J===!0||b!==R)){const en=b===R&&ot.id===w;Rt.setState(ot,b,en)}let ge=!1;ot.version===te.__version?(te.needsLights&&te.lightsStateVersion!==Le.state.version||te.outputColorSpace!==Bt||K.isBatchedMesh&&te.batching===!1||!K.isBatchedMesh&&te.batching===!0||K.isBatchedMesh&&te.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&te.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&te.instancing===!1||!K.isInstancedMesh&&te.instancing===!0||K.isSkinnedMesh&&te.skinning===!1||!K.isSkinnedMesh&&te.skinning===!0||K.isInstancedMesh&&te.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&te.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&te.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&te.instancingMorph===!1&&K.morphTexture!==null||te.envMap!==Ct||ot.fog===!0&&te.fog!==Et||te.numClippingPlanes!==void 0&&(te.numClippingPlanes!==Rt.numPlanes||te.numIntersection!==Rt.numIntersection)||te.vertexAlphas!==Xt||te.vertexTangents!==ee||te.morphTargets!==$t||te.morphNormals!==ve||te.morphColors!==Pe||te.toneMapping!==Qe||te.morphTargetsCount!==Re)&&(ge=!0):(ge=!0,te.__version=ot.version);let pn=te.currentProgram;ge===!0&&(pn=ci(ot,j,K));let Jn=!1,Ce=!1,La=!1;const je=pn.getUniforms(),zn=te.uniforms;if(Nt.useProgram(pn.program)&&(Jn=!0,Ce=!0,La=!0),ot.id!==w&&(w=ot.id,Ce=!0),Jn||R!==b){Nt.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),je.setValue(L,"projectionMatrix",b.projectionMatrix),je.setValue(L,"viewMatrix",b.matrixWorldInverse);const Un=je.map.cameraPosition;Un!==void 0&&Un.setValue(L,yt.setFromMatrixPosition(b.matrixWorld)),Qt.logarithmicDepthBuffer&&je.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(ot.isMeshPhongMaterial||ot.isMeshToonMaterial||ot.isMeshLambertMaterial||ot.isMeshBasicMaterial||ot.isMeshStandardMaterial||ot.isShaderMaterial)&&je.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),R!==b&&(R=b,Ce=!0,La=!0)}if(K.isSkinnedMesh){je.setOptional(L,K,"bindMatrix"),je.setOptional(L,K,"bindMatrixInverse");const en=K.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),je.setValue(L,"boneTexture",en.boneTexture,le))}K.isBatchedMesh&&(je.setOptional(L,K,"batchingTexture"),je.setValue(L,"batchingTexture",K._matricesTexture,le),je.setOptional(L,K,"batchingIdTexture"),je.setValue(L,"batchingIdTexture",K._indirectTexture,le),je.setOptional(L,K,"batchingColorTexture"),K._colorsTexture!==null&&je.setValue(L,"batchingColorTexture",K._colorsTexture,le));const on=rt.morphAttributes;if((on.position!==void 0||on.normal!==void 0||on.color!==void 0)&&Tt.update(K,rt,pn),(Ce||te.receiveShadow!==K.receiveShadow)&&(te.receiveShadow=K.receiveShadow,je.setValue(L,"receiveShadow",K.receiveShadow)),ot.isMeshGouraudMaterial&&ot.envMap!==null&&(zn.envMap.value=Ct,zn.flipEnvMap.value=Ct.isCubeTexture&&Ct.isRenderTargetTexture===!1?-1:1),ot.isMeshStandardMaterial&&ot.envMap===null&&j.environment!==null&&(zn.envMapIntensity.value=j.environmentIntensity),Ce&&(je.setValue(L,"toneMappingExposure",U.toneMappingExposure),te.needsLights&&Lc(zn,La),Et&&ot.fog===!0&&vt.refreshFogUniforms(zn,Et),vt.refreshMaterialUniforms(zn,ot,Z,st,S.state.transmissionRenderTarget[b.id]),Mc.upload(L,vs(te),zn,le)),ot.isShaderMaterial&&ot.uniformsNeedUpdate===!0&&(Mc.upload(L,vs(te),zn,le),ot.uniformsNeedUpdate=!1),ot.isSpriteMaterial&&je.setValue(L,"center",K.center),je.setValue(L,"modelViewMatrix",K.modelViewMatrix),je.setValue(L,"normalMatrix",K.normalMatrix),je.setValue(L,"modelMatrix",K.matrixWorld),ot.isShaderMaterial||ot.isRawShaderMaterial){const en=ot.uniformsGroups;for(let Un=0,tr=en.length;Un<tr;Un++){const Fi=en[Un];fe.update(Fi,pn),fe.bind(Fi,pn)}}return pn}function Lc(b,j){b.ambientLightColor.needsUpdate=j,b.lightProbe.needsUpdate=j,b.directionalLights.needsUpdate=j,b.directionalLightShadows.needsUpdate=j,b.pointLights.needsUpdate=j,b.pointLightShadows.needsUpdate=j,b.spotLights.needsUpdate=j,b.spotLightShadows.needsUpdate=j,b.rectAreaLights.needsUpdate=j,b.hemisphereLights.needsUpdate=j}function Al(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return q},this.setRenderTargetTextures=function(b,j,rt){const ot=Ft.get(b);ot.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,ot.__autoAllocateDepthBuffer===!1&&(ot.__useRenderToTexture=!1),Ft.get(b.texture).__webglTexture=j,Ft.get(b.depthTexture).__webglTexture=ot.__autoAllocateDepthBuffer?void 0:rt,ot.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,j){const rt=Ft.get(b);rt.__webglFramebuffer=j,rt.__useDefaultFramebuffer=j===void 0};const go=L.createFramebuffer();this.setRenderTarget=function(b,j=0,rt=0){q=b,H=j,O=rt;let ot=!0,K=null,Et=!1,zt=!1;if(b){const Ct=Ft.get(b);if(Ct.__useDefaultFramebuffer!==void 0)Nt.bindFramebuffer(L.FRAMEBUFFER,null),ot=!1;else if(Ct.__webglFramebuffer===void 0)le.setupRenderTarget(b);else if(Ct.__hasExternalTextures)le.rebindTextures(b,Ft.get(b.texture).__webglTexture,Ft.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const $t=b.depthTexture;if(Ct.__boundDepthTexture!==$t){if($t!==null&&Ft.has($t)&&(b.width!==$t.image.width||b.height!==$t.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");le.setupDepthRenderbuffer(b)}}const Xt=b.texture;(Xt.isData3DTexture||Xt.isDataArrayTexture||Xt.isCompressedArrayTexture)&&(zt=!0);const ee=Ft.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(ee[j])?K=ee[j][rt]:K=ee[j],Et=!0):b.samples>0&&le.useMultisampledRTT(b)===!1?K=Ft.get(b).__webglMultisampledFramebuffer:Array.isArray(ee)?K=ee[rt]:K=ee,G.copy(b.viewport),at.copy(b.scissor),ut=b.scissorTest}else G.copy(Gt).multiplyScalar(Z).floor(),at.copy(oe).multiplyScalar(Z).floor(),ut=be;if(rt!==0&&(K=go),Nt.bindFramebuffer(L.FRAMEBUFFER,K)&&ot&&Nt.drawBuffers(b,K),Nt.viewport(G),Nt.scissor(at),Nt.setScissorTest(ut),Et){const Ct=Ft.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct.__webglTexture,rt)}else if(zt){const Ct=j;for(let Xt=0;Xt<b.textures.length;Xt++){const ee=Ft.get(b.textures[Xt]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Xt,ee.__webglTexture,rt,Ct)}}else if(b!==null&&rt!==0){const Ct=Ft.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ct.__webglTexture,rt)}w=-1},this.readRenderTargetPixels=function(b,j,rt,ot,K,Et,zt,Bt=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=Ft.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&zt!==void 0&&(Ct=Ct[zt]),Ct){Nt.bindFramebuffer(L.FRAMEBUFFER,Ct);try{const Xt=b.textures[Bt],ee=Xt.format,$t=Xt.type;if(!Qt.textureFormatReadable(ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Qt.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=b.width-ot&&rt>=0&&rt<=b.height-K&&(b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Bt),L.readPixels(j,rt,ot,K,Zt.convert(ee),Zt.convert($t),Et))}finally{const Xt=q!==null?Ft.get(q).__webglFramebuffer:null;Nt.bindFramebuffer(L.FRAMEBUFFER,Xt)}}},this.readRenderTargetPixelsAsync=async function(b,j,rt,ot,K,Et,zt,Bt=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=Ft.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&zt!==void 0&&(Ct=Ct[zt]),Ct)if(j>=0&&j<=b.width-ot&&rt>=0&&rt<=b.height-K){Nt.bindFramebuffer(L.FRAMEBUFFER,Ct);const Xt=b.textures[Bt],ee=Xt.format,$t=Xt.type;if(!Qt.textureFormatReadable(ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Qt.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ve=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,ve),L.bufferData(L.PIXEL_PACK_BUFFER,Et.byteLength,L.STREAM_READ),b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Bt),L.readPixels(j,rt,ot,K,Zt.convert(ee),Zt.convert($t),0);const Pe=q!==null?Ft.get(q).__webglFramebuffer:null;Nt.bindFramebuffer(L.FRAMEBUFFER,Pe);const Qe=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await BE(L,Qe,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,ve),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,Et),L.deleteBuffer(ve),L.deleteSync(Qe),Et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,j=null,rt=0){const ot=Math.pow(2,-rt),K=Math.floor(b.image.width*ot),Et=Math.floor(b.image.height*ot),zt=j!==null?j.x:0,Bt=j!==null?j.y:0;le.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,rt,0,0,zt,Bt,K,Et),Nt.unbindTexture()};const Ss=L.createFramebuffer(),Oc=L.createFramebuffer();this.copyTextureToTexture=function(b,j,rt=null,ot=null,K=0,Et=null){Et===null&&(K!==0?(Sl("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Et=K,K=0):Et=0);let zt,Bt,Ct,Xt,ee,$t,ve,Pe,Qe;const Ne=b.isCompressedTexture?b.mipmaps[Et]:b.image;if(rt!==null)zt=rt.max.x-rt.min.x,Bt=rt.max.y-rt.min.y,Ct=rt.isBox3?rt.max.z-rt.min.z:1,Xt=rt.min.x,ee=rt.min.y,$t=rt.isBox3?rt.min.z:0;else{const on=Math.pow(2,-K);zt=Math.floor(Ne.width*on),Bt=Math.floor(Ne.height*on),b.isDataArrayTexture?Ct=Ne.depth:b.isData3DTexture?Ct=Math.floor(Ne.depth*on):Ct=1,Xt=0,ee=0,$t=0}ot!==null?(ve=ot.x,Pe=ot.y,Qe=ot.z):(ve=0,Pe=0,Qe=0);const Re=Zt.convert(j.format),te=Zt.convert(j.type);let Le;j.isData3DTexture?(le.setTexture3D(j,0),Le=L.TEXTURE_3D):j.isDataArrayTexture||j.isCompressedArrayTexture?(le.setTexture2DArray(j,0),Le=L.TEXTURE_2D_ARRAY):(le.setTexture2D(j,0),Le=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,j.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,j.unpackAlignment);const ge=L.getParameter(L.UNPACK_ROW_LENGTH),pn=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Jn=L.getParameter(L.UNPACK_SKIP_PIXELS),Ce=L.getParameter(L.UNPACK_SKIP_ROWS),La=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,Ne.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Ne.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Xt),L.pixelStorei(L.UNPACK_SKIP_ROWS,ee),L.pixelStorei(L.UNPACK_SKIP_IMAGES,$t);const je=b.isDataArrayTexture||b.isData3DTexture,zn=j.isDataArrayTexture||j.isData3DTexture;if(b.isDepthTexture){const on=Ft.get(b),en=Ft.get(j),Un=Ft.get(on.__renderTarget),tr=Ft.get(en.__renderTarget);Nt.bindFramebuffer(L.READ_FRAMEBUFFER,Un.__webglFramebuffer),Nt.bindFramebuffer(L.DRAW_FRAMEBUFFER,tr.__webglFramebuffer);for(let Fi=0;Fi<Ct;Fi++)je&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ft.get(b).__webglTexture,K,$t+Fi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ft.get(j).__webglTexture,Et,Qe+Fi)),L.blitFramebuffer(Xt,ee,zt,Bt,ve,Pe,zt,Bt,L.DEPTH_BUFFER_BIT,L.NEAREST);Nt.bindFramebuffer(L.READ_FRAMEBUFFER,null),Nt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(K!==0||b.isRenderTargetTexture||Ft.has(b)){const on=Ft.get(b),en=Ft.get(j);Nt.bindFramebuffer(L.READ_FRAMEBUFFER,Ss),Nt.bindFramebuffer(L.DRAW_FRAMEBUFFER,Oc);for(let Un=0;Un<Ct;Un++)je?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,on.__webglTexture,K,$t+Un):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,on.__webglTexture,K),zn?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,en.__webglTexture,Et,Qe+Un):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,en.__webglTexture,Et),K!==0?L.blitFramebuffer(Xt,ee,zt,Bt,ve,Pe,zt,Bt,L.COLOR_BUFFER_BIT,L.NEAREST):zn?L.copyTexSubImage3D(Le,Et,ve,Pe,Qe+Un,Xt,ee,zt,Bt):L.copyTexSubImage2D(Le,Et,ve,Pe,Xt,ee,zt,Bt);Nt.bindFramebuffer(L.READ_FRAMEBUFFER,null),Nt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else zn?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(Le,Et,ve,Pe,Qe,zt,Bt,Ct,Re,te,Ne.data):j.isCompressedArrayTexture?L.compressedTexSubImage3D(Le,Et,ve,Pe,Qe,zt,Bt,Ct,Re,Ne.data):L.texSubImage3D(Le,Et,ve,Pe,Qe,zt,Bt,Ct,Re,te,Ne):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,Et,ve,Pe,zt,Bt,Re,te,Ne.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,Et,ve,Pe,Ne.width,Ne.height,Re,Ne.data):L.texSubImage2D(L.TEXTURE_2D,Et,ve,Pe,zt,Bt,Re,te,Ne);L.pixelStorei(L.UNPACK_ROW_LENGTH,ge),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,pn),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Jn),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ce),L.pixelStorei(L.UNPACK_SKIP_IMAGES,La),Et===0&&j.generateMipmaps&&L.generateMipmap(Le),Nt.unbindTexture()},this.initRenderTarget=function(b){Ft.get(b).__webglFramebuffer===void 0&&le.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?le.setTextureCube(b,0):b.isData3DTexture?le.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?le.setTexture2DArray(b,0):le.setTexture2D(b,0),Nt.unbindTexture()},this.resetState=function(){H=0,O=0,q=null,Nt.reset(),Pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $i}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=De._getDrawingBufferColorSpace(e),i.unpackColorSpace=De._getUnpackColorSpace()}}const uS={type:"change"},Qp={type:"start"},WS={type:"end"},gc=new US,cS=new hs,tC=Math.cos(70*zE.DEG2RAD),gn=new et,Zn=2*Math.PI,Xe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},kd=1e-6;class eC extends gT{constructor(e,i=null){super(e,i),this.state=Xe.NONE,this.target=new et,this.cursor=new et,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:io.ROTATE,MIDDLE:io.DOLLY,RIGHT:io.PAN},this.touches={ONE:to.ROTATE,TWO:to.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new et,this._lastQuaternion=new Js,this._lastTargetPosition=new et,this._quat=new Js().setFromUnitVectors(e.up,new et(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Iv,this._sphericalDelta=new Iv,this._scale=1,this._panOffset=new et,this._rotateStart=new ne,this._rotateEnd=new ne,this._rotateDelta=new ne,this._panStart=new ne,this._panEnd=new ne,this._panDelta=new ne,this._dollyStart=new ne,this._dollyEnd=new ne,this._dollyDelta=new ne,this._dollyDirection=new et,this._mouse=new ne,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=iC.bind(this),this._onPointerDown=nC.bind(this),this._onPointerUp=aC.bind(this),this._onContextMenu=fC.bind(this),this._onMouseWheel=oC.bind(this),this._onKeyDown=lC.bind(this),this._onTouchStart=uC.bind(this),this._onTouchMove=cC.bind(this),this._onMouseDown=sC.bind(this),this._onMouseMove=rC.bind(this),this._interceptControlDown=hC.bind(this),this._interceptControlUp=dC.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(uS),this.update(),this.state=Xe.NONE}update(e=null){const i=this.object.position;gn.copy(i).sub(this.target),gn.applyQuaternion(this._quat),this._spherical.setFromVector3(gn),this.autoRotate&&this.state===Xe.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,u=this.maxAzimuthAngle;isFinite(r)&&isFinite(u)&&(r<-Math.PI?r+=Zn:r>Math.PI&&(r-=Zn),u<-Math.PI?u+=Zn:u>Math.PI&&(u-=Zn),r<=u?this._spherical.theta=Math.max(r,Math.min(u,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(r+u)/2?Math.max(r,this._spherical.theta):Math.min(u,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let f=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),f=h!=this._spherical.radius}if(gn.setFromSpherical(this._spherical),gn.applyQuaternion(this._quatInverse),i.copy(this.target).add(gn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const d=gn.length();h=this._clampDistance(d*this._scale);const m=d-h;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),f=!!m}else if(this.object.isOrthographicCamera){const d=new et(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),f=m!==this.object.zoom;const g=new et(this._mouse.x,this._mouse.y,0);g.unproject(this.object),this.object.position.sub(g).add(d),this.object.updateMatrixWorld(),h=gn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(gc.origin.copy(this.object.position),gc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(gc.direction))<tC?this.object.lookAt(this.target):(cS.setFromNormalAndCoplanarPoint(this.object.up,this.target),gc.intersectPlane(cS,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),f=!0)}return this._scale=1,this._performCursorZoom=!1,f||this._lastPosition.distanceToSquared(this.object.position)>kd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>kd||this._lastTargetPosition.distanceToSquared(this.target)>kd?(this.dispatchEvent(uS),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Zn/60*this.autoRotateSpeed*e:Zn/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){gn.setFromMatrixColumn(i,0),gn.multiplyScalar(-e),this._panOffset.add(gn)}_panUp(e,i){this.screenSpacePanning===!0?gn.setFromMatrixColumn(i,1):(gn.setFromMatrixColumn(i,0),gn.crossVectors(this.object.up,gn)),gn.multiplyScalar(e),this._panOffset.add(gn)}_pan(e,i){const r=this.domElement;if(this.object.isPerspectiveCamera){const u=this.object.position;gn.copy(u).sub(this.target);let f=gn.length();f*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*f/r.clientHeight,this.object.matrix),this._panUp(2*i*f/r.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/r.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/r.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const r=this.domElement.getBoundingClientRect(),u=e-r.left,f=i-r.top,h=r.width,d=r.height;this._mouse.x=u/h*2-1,this._mouse.y=-(f/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Zn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Zn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Zn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Zn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Zn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Zn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),u=.5*(e.pageY+i.y);this._rotateStart.set(r,u)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),u=.5*(e.pageY+i.y);this._panStart.set(r,u)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),r=e.pageX-i.x,u=e.pageY-i.y,f=Math.sqrt(r*r+u*u);this._dollyStart.set(0,f)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const r=this._getSecondPointerPosition(e),u=.5*(e.pageX+r.x),f=.5*(e.pageY+r.y);this._rotateEnd.set(u,f)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Zn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Zn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),u=.5*(e.pageY+i.y);this._panEnd.set(r,u)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),r=e.pageX-i.x,u=e.pageY-i.y,f=Math.sqrt(r*r+u*u);this._dollyEnd.set(0,f),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(e.pageX+i.x)*.5,d=(e.pageY+i.y)*.5;this._updateZoomParameters(h,d)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new ne,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,r={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:r.deltaY*=16;break;case 2:r.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(r.deltaY*=10),r}}function nC(o){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(o.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(o)&&(this._addPointer(o),o.pointerType==="touch"?this._onTouchStart(o):this._onMouseDown(o)))}function iC(o){this.enabled!==!1&&(o.pointerType==="touch"?this._onTouchMove(o):this._onMouseMove(o))}function aC(o){switch(this._removePointer(o),this._pointers.length){case 0:this.domElement.releasePointerCapture(o.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(WS),this.state=Xe.NONE;break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function sC(o){let e;switch(o.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case io.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(o),this.state=Xe.DOLLY;break;case io.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Xe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Xe.ROTATE}break;case io.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Xe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Xe.PAN}break;default:this.state=Xe.NONE}this.state!==Xe.NONE&&this.dispatchEvent(Qp)}function rC(o){switch(this.state){case Xe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(o);break;case Xe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(o);break;case Xe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(o);break}}function oC(o){this.enabled===!1||this.enableZoom===!1||this.state!==Xe.NONE||(o.preventDefault(),this.dispatchEvent(Qp),this._handleMouseWheel(this._customWheelEvent(o)),this.dispatchEvent(WS))}function lC(o){this.enabled!==!1&&this._handleKeyDown(o)}function uC(o){switch(this._trackPointer(o),this._pointers.length){case 1:switch(this.touches.ONE){case to.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(o),this.state=Xe.TOUCH_ROTATE;break;case to.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(o),this.state=Xe.TOUCH_PAN;break;default:this.state=Xe.NONE}break;case 2:switch(this.touches.TWO){case to.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(o),this.state=Xe.TOUCH_DOLLY_PAN;break;case to.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(o),this.state=Xe.TOUCH_DOLLY_ROTATE;break;default:this.state=Xe.NONE}break;default:this.state=Xe.NONE}this.state!==Xe.NONE&&this.dispatchEvent(Qp)}function cC(o){switch(this._trackPointer(o),this.state){case Xe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(o),this.update();break;case Xe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(o),this.update();break;case Xe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(o),this.update();break;case Xe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(o),this.update();break;default:this.state=Xe.NONE}}function fC(o){this.enabled!==!1&&o.preventDefault()}function hC(o){o.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function dC(o){o.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Ec={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class El{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const pC=new Zp(-1,1,1,-1,0,1);class mC extends Ua{constructor(){super(),this.setAttribute("position",new Ca([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ca([0,2,0,0,2,0],2))}}const gC=new mC;class jS{constructor(e){this._mesh=new Ii(gC,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,pC)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class ZS extends El{constructor(e,i="tDiffuse"){super(),this.textureID=i,this.uniforms=null,this.material=null,e instanceof Vn?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Cc.clone(e.uniforms),this.material=new Vn({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new jS(this.material)}render(e,i,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class fS extends El{constructor(e,i){super(),this.scene=e,this.camera=i,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,i,r){const u=e.getContext(),f=e.state;f.buffers.color.setMask(!1),f.buffers.depth.setMask(!1),f.buffers.color.setLocked(!0),f.buffers.depth.setLocked(!0);let h,d;this.inverse?(h=0,d=1):(h=1,d=0),f.buffers.stencil.setTest(!0),f.buffers.stencil.setOp(u.REPLACE,u.REPLACE,u.REPLACE),f.buffers.stencil.setFunc(u.ALWAYS,h,4294967295),f.buffers.stencil.setClear(d),f.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),f.buffers.color.setLocked(!1),f.buffers.depth.setLocked(!1),f.buffers.color.setMask(!0),f.buffers.depth.setMask(!0),f.buffers.stencil.setLocked(!1),f.buffers.stencil.setFunc(u.EQUAL,1,4294967295),f.buffers.stencil.setOp(u.KEEP,u.KEEP,u.KEEP),f.buffers.stencil.setLocked(!0)}}class _C extends El{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class vC{constructor(e,i){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),i===void 0){const r=e.getSize(new ne);this._width=r.width,this._height=r.height,i=new Ei(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ta}),i.texture.name="EffectComposer.rt1"}else this._width=i.width,this._height=i.height;this.renderTarget1=i,this.renderTarget2=i.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ZS(Ec),this.copyPass.material.blending=ba,this.clock=new mT}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,i){this.passes.splice(i,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const i=this.passes.indexOf(e);i!==-1&&this.passes.splice(i,1)}isLastEnabledPass(e){for(let i=e+1;i<this.passes.length;i++)if(this.passes[i].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const i=this.renderer.getRenderTarget();let r=!1;for(let u=0,f=this.passes.length;u<f;u++){const h=this.passes[u];if(h.enabled!==!1){if(h.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(u),h.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),h.needsSwap){if(r){const d=this.renderer.getContext(),m=this.renderer.state.buffers.stencil;m.setFunc(d.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),m.setFunc(d.EQUAL,1,4294967295)}this.swapBuffers()}fS!==void 0&&(h instanceof fS?r=!0:h instanceof _C&&(r=!1))}}this.renderer.setRenderTarget(i)}reset(e){if(e===void 0){const i=this.renderer.getSize(new ne);this._pixelRatio=this.renderer.getPixelRatio(),this._width=i.width,this._height=i.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,i){this._width=e,this._height=i;const r=this._width*this._pixelRatio,u=this._height*this._pixelRatio;this.renderTarget1.setSize(r,u),this.renderTarget2.setSize(r,u);for(let f=0;f<this.passes.length;f++)this.passes[f].setSize(r,u)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class SC extends El{constructor(e,i,r=null,u=null,f=null){super(),this.scene=e,this.camera=i,this.overrideMaterial=r,this.clearColor=u,this.clearAlpha=f,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ue}render(e,i,r){const u=e.autoClear;e.autoClear=!1;let f,h;this.overrideMaterial!==null&&(h=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(f=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(f),this.overrideMaterial!==null&&(this.scene.overrideMaterial=h),e.autoClear=u}}const xC={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ue(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class fo extends El{constructor(e,i=1,r,u){super(),this.strength=i,this.radius=r,this.threshold=u,this.resolution=e!==void 0?new ne(e.x,e.y):new ne(256,256),this.clearColor=new Ue(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let f=Math.round(this.resolution.x/2),h=Math.round(this.resolution.y/2);this.renderTargetBright=new Ei(f,h,{type:ta}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let v=0;v<this.nMips;v++){const _=new Ei(f,h,{type:ta});_.texture.name="UnrealBloomPass.h"+v,_.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(_);const x=new Ei(f,h,{type:ta});x.texture.name="UnrealBloomPass.v"+v,x.texture.generateMipmaps=!1,this.renderTargetsVertical.push(x),f=Math.round(f/2),h=Math.round(h/2)}const d=xC;this.highPassUniforms=Cc.clone(d.uniforms),this.highPassUniforms.luminosityThreshold.value=u,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Vn({uniforms:this.highPassUniforms,vertexShader:d.vertexShader,fragmentShader:d.fragmentShader}),this.separableBlurMaterials=[];const m=[3,5,7,9,11];f=Math.round(this.resolution.x/2),h=Math.round(this.resolution.y/2);for(let v=0;v<this.nMips;v++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(m[v])),this.separableBlurMaterials[v].uniforms.invSize.value=new ne(1/f,1/h),f=Math.round(f/2),h=Math.round(h/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=i,this.compositeMaterial.uniforms.bloomRadius.value=.1;const g=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=g,this.bloomTintColors=[new et(1,1,1),new et(1,1,1),new et(1,1,1),new et(1,1,1),new et(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Cc.clone(Ec.uniforms),this.blendMaterial=new Vn({uniforms:this.copyUniforms,vertexShader:Ec.vertexShader,fragmentShader:Ec.fragmentShader,blending:qd,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ue,this._oldClearAlpha=1,this._basic=new jp,this._fsQuad=new jS(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,i){let r=Math.round(e/2),u=Math.round(i/2);this.renderTargetBright.setSize(r,u);for(let f=0;f<this.nMips;f++)this.renderTargetsHorizontal[f].setSize(r,u),this.renderTargetsVertical[f].setSize(r,u),this.separableBlurMaterials[f].uniforms.invSize.value=new ne(1/r,1/u),r=Math.round(r/2),u=Math.round(u/2)}render(e,i,r,u,f){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const h=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),f&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let d=this.renderTargetBright;for(let m=0;m<this.nMips;m++)this._fsQuad.material=this.separableBlurMaterials[m],this.separableBlurMaterials[m].uniforms.colorTexture.value=d.texture,this.separableBlurMaterials[m].uniforms.direction.value=fo.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[m]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[m].uniforms.colorTexture.value=this.renderTargetsHorizontal[m].texture,this.separableBlurMaterials[m].uniforms.direction.value=fo.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[m]),e.clear(),this._fsQuad.render(e),d=this.renderTargetsVertical[m];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,f&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(r),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=h}_getSeparableBlurMaterial(e){const i=[];for(let r=0;r<e;r++)i.push(.39894*Math.exp(-.5*r*r/(e*e))/e);return new Vn({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ne(.5,.5)},direction:{value:new ne(.5,.5)},gaussianCoefficients:{value:i}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new Vn({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}fo.BlurDirectionX=new ne(1,0);fo.BlurDirectionY=new ne(0,1);const yC=`
precision highp float;

// ---------------------------------------------------------------- uniforms
uniform vec2  uResolution;      // render-target pixels
uniform float uFov;             // vertical field of view, radians
uniform vec3  uCamPos;          // camera position (Schwarzschild radii units)
uniform vec3  uCamRight;        // camera basis vectors (unit, world space)
uniform vec3  uCamUp;
uniform vec3  uCamFwd;

uniform float uTime;            // frozen simulation time (seconds / timeScale applied)
uniform float uTurbSpeed;       // turbulence advection speed multiplier

uniform float uDiskInner;       // disk inner radius (rs)
uniform float uDiskOuter;       // disk outer radius (rs)
uniform float uDiskHalfThick;   // disk half thickness (rs)
uniform float uDiskTemp;        // disk temperature scale multiplier
uniform float uDiskEmission;    // disk emission strength multiplier
uniform float uOrbitSpeed;      // orbital velocity multiplier
uniform float uTurbAmp;         // turbulence amplitude [0,1]

uniform float uStarDensity;     // procedural star density multiplier
uniform float uGalaxyBright;    // milky way band brightness multiplier

uniform int   uMaxSteps;        // geodesic step budget (quality tier)
uniform int   uMaxCross;        // max disk crossings composited (quality tier)
uniform int   uDebugView;       // 0 = final composite, 1..9 diagnostics

varying vec2 vUv;

// ---------------------------------------------------------------- constants
const float RS       = 1.0;                       // Schwarzschild radius (unit)
const float R_PHOTON = 1.5 * RS;                  // unstable photon orbit radius
const float B_CRIT   = 2.598076211353316 * RS;    // (3*sqrt(3)/2) rs critical impact parameter

// ---------------------------------------------------------------- utils
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}
float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}
// value noise + fbm for turbulence / galactic clouds
float vnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash13(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash13(i + vec3(1.0, 1.0, 1.0));
  return mix(mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
             mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y), f.z);
}
float fbm3(vec3 p) {
  float a = 0.5;
  float s = 0.0;
  for (int i = 0; i < 3; i++) {
    s += a * vnoise(p);
    p = p * 2.13 + vec3(7.7, 3.1, 9.2);
    a *= 0.5;
  }
  return s;
}
vec3 heatRamp(float t) {
  return clamp(vec3(t * 3.0, t * 3.0 - 1.0, t * 3.0 - 2.0), 0.0, 1.0);
}

// Blackbody chromaticity approximation (Tanner Helland style, normalized),
// input temperature in kilokelvin-ish units; returns a linear-space color
// peaked so that hot disk plasma runs blue-white and the cool rim deep orange.
vec3 blackbodyColor(float t) {
  float x = clamp(t, 0.1, 6.0);
  vec3 c;
  // red channel is strong but recedes as the spectrum peaks blueward —
  // keeps hot plasma blue-white instead of saturating to paper white
  c.r = mix(1.0, 0.42, smoothstep(1.3, 3.9, x));
  // green rises with temperature
  c.g = clamp(0.62 * log(x + 0.35) + 0.48, 0.0, 1.0);
  // blue only appears when hot
  c.b = clamp(0.85 * log(x + 0.12) + 0.55, 0.0, 1.0);
  if (x > 3.0) {
    c.g = mix(c.g, 1.0, (x - 3.0) / 3.0 * 0.35);
    c.b = min(c.b + (x - 3.0) * 0.10, 1.0);
  }
  return c;
}


// ---------------------------------------------------------------- sky
// Octahedral mapping of the unit sphere to [0,1]^2 — continuous, no poles
// distortion blowup, used to hash procedural stars on lensed ray directions.
vec2 octaEncode(vec3 n) {
  n /= (abs(n.x) + abs(n.y) + abs(n.z) + 1e-9);
  vec2 p = n.xz;
  if (n.y < 0.0) p = (1.0 - abs(p.yx)) * vec2(p.x >= 0.0 ? 1.0 : -1.0, p.y >= 0.0 ? 1.0 : -1.0);
  return p * 0.5 + 0.5;
}
vec3 octaDecode(vec2 uv) {
  vec2 p = uv * 2.0 - 1.0;
  vec3 n = vec3(p.x, 1.0 - abs(p.x) - abs(p.y), p.y);
  float t = max(-n.y, 0.0);
  n.x += n.x >= 0.0 ? -t : t;
  n.z += n.z >= 0.0 ? -t : t;
  return normalize(n);
}

// Procedural starfield: stars are fixed points inside jittered octahedral grid
// cells. Density scales cell count; angular falloff produces small gaussian
// disks. Purely procedural — no texture, no cubemap, no environment map.
vec3 starField(vec3 dir, float density) {
  if (density <= 0.001) return vec3(0.0);
  float cells = floor(24.0 + 88.0 * density);   // cells per octahedral axis
  vec2 suv = octaEncode(dir) * cells;
  vec2 cellId = floor(suv);
  vec3 acc = vec3(0.0);
  // 2x2 neighborhood is enough: star radius is a small fraction of a cell
  for (int i = 0; i <= 1; i++) {
    for (int j = 0; j <= 1; j++) {
      vec2 id = cellId + vec2(float(i) - 1.0, float(j) - 1.0);
      vec2 rnd = hash22(id * 1.37 + 11.1);
      // only some cells carry a star; density threshold makes density continuous
      if (rnd.x > 0.28 + 0.62 * (1.0 - density)) continue;
      // reconstruct the 3D direction of the star center: jitter within cell
      vec2 starUV = (id + 0.15 + 0.7 * hash22(id + 4.7)) / cells;
      vec3 starDir = octaDecode(starUV);
      float cosang = dot(dir, starDir);
      // gaussian angular profile: sigma in radians, a small fraction of a grid cell
      float sigma = 0.00045 + 0.00035 * hash12(id + 2.9);
      float d2 = max(2.0 * (1.0 - cosang), 0.0); // ≈ angular distance squared
      float g = exp(-d2 / (2.0 * sigma * sigma));
      float mag = 0.35 + 1.8 * pow(hash12(id + 8.2), 5.0);
      float tint = hash12(id + 5.5);
      vec3 starCol = mix(vec3(0.72, 0.82, 1.0), vec3(1.0, 0.82, 0.62), tint);
      acc += starCol * g * mag;
    }
  }
  return acc * (0.55 + 0.45 * density);
}

// Procedural milky way band: a great-circle band with fbm cloud modulation
// and dust lanes. Axis fixed in world space; the lensing of the shader warps it.
vec3 galaxyField(vec3 dir, float bright) {
  if (bright <= 0.001) return vec3(0.0);
  vec3 axis = normalize(vec3(0.1, 1.0, 0.35));
  vec3 center = normalize(cross(axis, vec3(0.2, 0.05, 1.0)));
  float bd = dot(dir, axis);                       // signed distance to galactic plane (sin)
  float band = exp(-bd * bd * 38.0);
  float lane = exp(-bd * bd * 380.0);              // thin dust lane
  // clouds in a cylindrical-ish 3D domain attached to the band orientation
  vec3 p = dir * 3.0;
  float cl = fbm3(p + vec3(0.0, 0.0, 1.7));
  float cl2 = fbm3(p * 2.7 + vec3(9.1, 2.0, 0.0));
  float clouds = clamp(0.35 + 1.9 * (cl - 0.45) + 0.9 * (cl2 - 0.5), 0.0, 2.2);
  clouds = pow(clouds, 1.6); // contrast: thin wisps vanish, dense cores glow
  // galactic-core brightening toward the galactic center
  float core = exp(-max(1.0 - dot(dir, center), 0.0) * 14.0) * 1.6;
  vec3 col = vec3(0.55, 0.60, 0.95) * band * clouds * 0.5
           + vec3(1.0, 0.72, 0.42) * band * core * clouds * 0.9;
  // dust lane carves dark structure into the band
  col *= 1.0 - lane * clamp(cl2 * 1.6 - 0.25, 0.0, 0.85);
  return col * bright;
}

vec3 skyColor(vec3 dir) {
  return starField(dir, uStarDensity)
       + galaxyField(dir, uGalaxyBright)
       + vec3(0.012, 0.014, 0.022); // deep-space floor so the void is not pure black
}

// ---------------------------------------------------------------- disk
// Emission of the accretion disk at a curved-path plane crossing point.
//   pos      crossing position on the disk plane (Schwarzschild radii units)
//   toCam    normalized direction from the crossing point back toward the camera
// Returns premultiplied radiance contribution; outputs the opacity alpha and
// the combined redshift factor (gravitational × transverse × doppler).
vec3 diskEmission(vec3 pos, vec3 toCam, float coverage, out float alpha, out float shift) {
  float rho = length(vec2(pos.x, pos.z));
  float r = length(pos);
  alpha = 0.0;
  shift = 0.0;
  // radial emissivity envelope of the disk slab
  float x = (rho - uDiskInner) / max(uDiskOuter - uDiskInner, 1e-4);
  if (x < 0.0 || x > 1.0) return vec3(0.0);
  float innerEdge = smoothstep(0.0, 0.10, x);          // ISCO-like inner roll-off
  float outerEdge = 1.0 - smoothstep(0.72, 1.0, x);    // fading outer rim
  float radialProfile = pow(max(1.0 - x, 0.0), 1.5) + 0.06;
  float envelope = innerEdge * outerEdge * radialProfile;
  if (envelope <= 0.0) return vec3(0.0);

  // Orbiting plasma: relativistic Keplerian velocity in Schwarzschild,
  //   v² = (rs/2) / (r − rs)  (units c = 1), in the equatorial plane,
  //   direction ⊥ radius inside the disk plane (prograde).
  float vOrb = sqrt(clamp((0.5 * RS) / max(r - RS, 0.05), 0.0, 0.92));
  vec3 radialDir = normalize(vec3(pos.x, 0.0, pos.z));
  vec3 orbitDir = normalize(vec3(-radialDir.z, 0.0, radialDir.x)); // prograde tangential

  // Relativistic Doppler + gravitational redshift of photons emitted by the
  // moving plasma and received at the observer.
  //   gravitational part: 1/sqrt(1 - rs/r) — clocks run slow deep in the well
  //   transverse part:    time dilation of the orbiting emitter
  //   longitudinal part:  classical beaming factor (1 + β·n̂), n̂ toward observer
  float grav = inversesqrt(max(1.0 - RS / max(r, 1.01), 0.02));
  float transverse = inversesqrt(max(1.0 - vOrb * vOrb, 0.05));
  float betaAlong = vOrb * dot(orbitDir, toCam) * uOrbitSpeed;
  float doppler = 1.0 + betaAlong;
  float gShift = clamp(grav * transverse * doppler, 0.12, 3.2);
  shift = gShift;

  // Temperature: multi-color blackbody disk, T ∝ ρ^(−3/4), scaled by control.
  float tempProfile = pow(max(rho / max(uDiskInner, 0.6), 1.0), -0.85);
  float tempK = uDiskTemp * 1.05 * tempProfile * gShift;  // redshifted/blackbody-shifted temperature

  // Turbulence: animated density/brightness modulation in the frame rotating
  // with the plasma. Orbital angular rate ω ∝ ρ^−1.5 (Keplerian, timeScale-free
  // — the frozen simulation time is the only clock).
  float angle = atan(pos.z, pos.x);
  float omega = 1.4 * pow(max(rho, 0.8), -1.5);
  float rotAngle = angle - omega * uTime * 3.0;
  // spatial frequency and amplitude fade toward the rim: avoids noise aliasing
  // in the compressed outer disk and mimics shear smearing
  float nf = mix(1.9, 0.7, smoothstep(3.0, 9.0, rho));
  vec3 npos = vec3(cos(rotAngle) * rho * nf, pos.y * 3.0 / max(uDiskHalfThick, 0.02), sin(rotAngle) * rho * nf);
  float turb = fbm3(npos + vec3(0.0, -uTime * 0.35 * uTurbSpeed, 0.0));
  float turbFade = mix(1.0, 0.35, smoothstep(4.0, 9.5, rho));
  float turbMod = max(1.0 + uTurbAmp * turbFade * 3.2 * (turb - 0.52), 0.06);

  float I = uDiskEmission * envelope * coverage * turbMod;
  // Relativistic beaming: bolometric intensity ∝ δ³ (approximate, exponent
  // flattened to keep the far side visible), gravitational redshift dims.
  float beam = pow(doppler, 2.2) * pow(transverse * grav, 1.4);
  beam = clamp(beam, 0.08, 4.5);
  I *= beam;

  // volume emissivity → crossing radiance; alpha saturates for bright, thick plasma
  alpha = clamp(I * 0.5, 0.0, 0.92);
  return blackbodyColor(tempK) * I;
}

// ---------------------------------------------------------------- integrator
// One semi-implicit Euler (symplectic) step of the planar null-geodesic force
// law. h2 is the conserved squared specific angular momentum, constant per ray.
vec3 geodesicAccel(vec3 pos, float h2) {
  float r2 = dot(pos, pos);
  return -1.5 * h2 * pos / (r2 * r2 * sqrt(r2)); // −(3/2) h² x̂/|x|³
}

struct RayResult {
  vec3 color;        // linear HDR radiance (pre-bloom, pre-tonemap)
  float steps;       // normalized step usage
  float captured;    // 1 if terminated inside the horizon
  float escaped;     // 1 if escaped to sky
  float pinch;       // 1 if terminated by step budget near the photon sphere
  float crossCount;  // number of disk plane crossings collected
  float meanShift;   // intensity-weighted mean redshift factor (diagnostics)
  float bOverCrit;   // initial impact parameter / b_crit
  vec3 finalDir;     // escape direction (for lensing diagnostics)
};

RayResult traceRay(vec3 ro, vec3 rd) {
  RayResult res;
  res.color = vec3(0.0);
  res.captured = 0.0;
  res.escaped = 0.0;
  res.pinch = 0.0;
  res.crossCount = 0.0;
  res.meanShift = 0.0;
  res.finalDir = rd;

  // --- initialize the geodesic state --------------------------------------
  vec3 pos = ro;
  vec3 vel = rd; // |vel| = 1 at the observer; scaling is affine freedom
  float h2 = dot(cross(pos, vel), cross(pos, vel));
  float impact = sqrt(h2); // impact parameter since |vel|=1 asymptotically flat-ish
  res.bOverCrit = impact / B_CRIT;


  float camDist = length(ro);
  float escapeR = max(28.0, camDist * 1.8 + 6.0);

  // disk crossing buffers, collected in traversal (path) order
  vec4 hitPosN[4];   // xyz = refined crossing pos, w = coverage weight
  vec3 hitVel[4];    // ray velocity at crossing (for frame reconstruction)
  int nHits = 0;

  float emissionBudget = 1.0; // remaining opacity budget along the path
  vec3 radiance = vec3(0.0);
  float shiftAccum = 0.0;
  float shiftWeight = 0.0;

  float prevPlaneZ = dot(pos, vec3(0.0, 1.0, 0.0)); // disk plane: y = 0, normal +y
  int stepsUsed = 0;
  bool terminated = false;

  // --- numerical integration loop ------------------------------------------
  for (int i = 0; i < 1024; i++) {
    if (i >= uMaxSteps) break;
    stepsUsed = i + 1;

    float r = length(pos);

    // termination: event horizon — nothing escapes, pitch black
    if (r < 1.0 * RS) {
      res.captured = 1.0;
      terminated = true;
      break;
    }
    // termination: escape — asymptotically straight, sample lensed sky
    if (r > escapeR && dot(pos, vel) > 0.0) {
      res.escaped = 1.0;
      res.finalDir = normalize(vel);
      terminated = true;
      break;
    }

    // adaptive affine step: fine near the photon sphere (r = 1.5) where the
    // critical structure forms, coarse far away. dt ∝ r·min(1, r/1.5) keeps
    // spatial displacement roughly constant at large r.
    float dt = 0.055 * r * clamp(r / R_PHOTON, 0.42, 1.0);
    // cap displacement so thin-disk crossings are never jumped over
    dt = min(dt, max(uDiskHalfThick * 1.4, 0.10) + 0.03 * r);

    // symplectic semi-implicit Euler step of the exact planar dynamics
    vec3 acc = geodesicAccel(pos, h2);
    vel += acc * dt;
    pos += vel * dt;

    // --- disk plane crossing detection on the curved path ------------------
    float planeZ = dot(pos, vec3(0.0, 1.0, 0.0));
    if (nHits < uMaxCross && planeZ * prevPlaneZ < 0.0) {
      // bisect the sign change in the plane-normal coordinate
      vec3 pa = pos - vel * dt;   // before step
      vec3 pb = pos;              // after step
      float za = prevPlaneZ;
      float zb = planeZ;
      for (int k = 0; k < 6; k++) {
        vec3 pm = 0.5 * (pa + pb);
        float zm = dot(pm, vec3(0.0, 1.0, 0.0));
        if (zm * za > 0.0) { pa = pm; za = zm; } else { pb = pm; zb = zm; }
      }
      vec3 hit = 0.5 * (pa + pb);
      float rho = length(vec2(hit.x, hit.z));

      // vertical density envelope of the thick disk slab: coverage weight
      // accounts for the path-length of the chord through the slab
      if (rho >= uDiskInner * 0.985 && rho <= uDiskOuter) {
        // approximate vertical excursion amplitude of the crossing smear
        float vertWeight = 1.0; // exact plane crossing: full weight
        // chord boost: grazing crossings traverse more slab material
        float vy = abs(dot(normalize(vel), vec3(0.0, 1.0, 0.0)));
        float chord = clamp(0.20 / max(vy, 0.10), 0.5, 1.9);
        // half-thickness scales total emissivity of the slab
        float thickScale = clamp(uDiskHalfThick / 0.14, 0.25, 3.0);
        float coverage = vertWeight * chord * thickScale;

        // velocity at the crossing for the emitter-frame reconstruction
        hitPosN[nHits] = vec4(hit, coverage);
        hitVel[nHits] = vel;
        nHits++;
      }
    }
    prevPlaneZ = planeZ;
  }

  if (!terminated) {
    // step budget exhausted: near-critical rays winding around the photon
    // sphere. These ARE the critical structure — treat as captured darkness
    // with a pinch flag for diagnostics.
    res.pinch = 1.0;
    res.captured = 1.0;
  }
  res.steps = float(stepsUsed) / float(max(uMaxSteps, 1));

  // --- compose disk crossings in path order (front-to-back) -----------------
  // Crossings are stored in traversal order — the order light accumulated them
  // along the curved path from the camera — so compositing in index order is
  // physically correct front-to-back alpha compositing. The first crossing is
  // the primary image; later ones are the secondary and higher-order images
  // formed by rays that wrapped around the hole.

  for (int k = 0; k < 4; k++) {
    if (k >= nHits) break;
    vec3 hit = hitPosN[k].xyz;
    float coverage = hitPosN[k].w;
    vec3 toCam = -normalize(hitVel[k]);
    float alpha;
    float shift;
    vec3 em = diskEmission(hit, toCam, coverage, alpha, shift);
    float I = max(max(em.r, em.g), em.b);
    if (I > 1e-5) {
      shiftAccum += shift * I;
      shiftWeight += I;
    }
    radiance += em * emissionBudget;
    emissionBudget *= (1.0 - alpha);
    if (emissionBudget < 0.02) break;
  }
  res.crossCount = float(nHits);
  res.meanShift = shiftWeight > 0.0 ? shiftAccum / shiftWeight : 0.0;

  // --- background: only rays that escaped carry sky light -------------------
  if (res.escaped > 0.5) {
    radiance += skyColor(res.finalDir) * emissionBudget;
  }
  // captured or pinch-terminated: pure black — the shadow of the hole

  res.color = radiance;
  return res;
}

// ---------------------------------------------------------------- debug views
vec3 debugPalette(float t) {
  // perceptual-ish blue → cyan → yellow → red ramp for diagnostics
  return clamp(vec3(1.6 * t - 0.2, 1.6 - abs(2.6 * t - 1.3), 1.4 - 1.6 * t), 0.0, 1.0);
}

void main() {
  // --- primary ray from the real interactive camera -------------------------
  vec2 ndc = vUv * 2.0 - 1.0;
  ndc.x *= uResolution.x / uResolution.y;
  float fovScale = tan(uFov * 0.5);
  vec3 rd = normalize(uCamFwd + uCamRight * (ndc.x * fovScale) + uCamUp * (ndc.y * fovScale));
  vec3 ro = uCamPos;

  RayResult res = traceRay(ro, rd);
  vec3 col = res.color;

  // --- diagnostics -----------------------------------------------------------
  if (uDebugView == 1) {
    // integration cost / termination: hue = normalized steps; red tint = captured
    col = debugPalette(res.steps) * 1.4;
    if (res.captured > 0.5 && res.pinch < 0.5) col = vec3(0.9, 0.12, 0.05);
    if (res.pinch > 0.5) col = vec3(0.35, 0.05, 0.02);
  } else if (uDebugView == 2) {
    // event horizon capture mask: red = captured into horizon / pinch, cyan = escaped
    col = res.captured > 0.5 ? vec3(1.0, 0.06, 0.02) * (res.pinch > 0.5 ? 0.45 : 1.0)
                             : vec3(0.02, 0.5, 0.9);
  } else if (uDebugView == 3) {
    // disk crossings count (order structure): 0 black, 1 green, 2 orange, 3 magenta, 4 white
    float n = res.crossCount;
    col = n < 0.5 ? vec3(0.0)
        : n < 1.5 ? vec3(0.05, 0.9, 0.25)
        : n < 2.5 ? vec3(1.0, 0.55, 0.05)
        : n < 3.5 ? vec3(0.95, 0.1, 0.85)
        : vec3(1.0);
    col *= 0.9;
  } else if (uDebugView == 4) {
    // combined redshift/Doppler factor of disk emission: red = redshifted (s < 1), blue = blueshifted (s > 1)
    float s = res.meanShift;
    if (s <= 0.0) { col = vec3(0.0); }
    else {
      float t = clamp((s - 0.55) / 1.1, 0.0, 1.0);
      col = mix(vec3(1.0, 0.08, 0.02), vec3(0.05, 0.25, 1.0), t) * 1.1;
    }
  } else if (uDebugView == 5) {
    // lensed background coordinates: octahedral uv of the escape direction
    if (res.escaped < 0.5) col = vec3(0.0);
    else {
      vec2 ouv = octaEncode(res.finalDir);
      col = vec3(ouv, fract((ouv.x + ouv.y) * 6.0)) * 0.8;
    }
  } else if (uDebugView == 6) {
    // procedural star/galaxy background only, through the same lensing
    if (res.escaped < 0.5) col = vec3(0.0);
    else col = skyColor(res.finalDir);
  } else if (uDebugView == 7) {
    // star field channel isolated
    if (res.escaped < 0.5) col = vec3(0.0);
    else col = starField(res.finalDir, uStarDensity);
  } else if (uDebugView == 8) {
    // pre-postprocess HDR luminance, log-mapped
    float lum = dot(res.color, vec3(0.2126, 0.7152, 0.0722));
    col = heatRamp(clamp(log(1.0 + lum * 4.0) / log(25.0), 0.0, 1.0)) * 1.2;
  } else if (uDebugView == 9) {
    // impact parameter relative to the critical photon-orbit value
    float q = clamp(res.bOverCrit * 0.5, 0.0, 1.0);
    col = heatRamp(q) * 1.1;
    // overlay capture state dimly
    if (res.captured > 0.5) col *= 0.25;
  }

  gl_FragColor = vec4(col, 1.0);
}
`,MC=`
precision highp float;

uniform sampler2D tDiffuse;
uniform vec2  uResolution;
uniform float uExposure;
uniform float uChroma;        // chromatic aberration strength
uniform float uVignette;      // vignette strength
uniform float uGrain;         // film grain strength
uniform float uTime;          // frozen-capable clock driving the grain seed

varying vec2 vUv;

// --- ACES filmic tone mapping (Stephen Hill fit, as implemented in three.js) --
vec3 RRTAndODTFit(vec3 v) {
  vec3 a = v * (v + 0.0245786) - 0.000090537;
  vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return a / b;
}
const mat3 ACESInputMat = mat3(
  vec3(0.59719, 0.07600, 0.02840),
  vec3(0.35458, 0.90834, 0.13383),
  vec3(0.04823, 0.01566, 0.83777)
);
const mat3 ACESOutputMat = mat3(
  vec3(1.60475, -0.10208, -0.00327),
  vec3(-0.53108, 1.10813, -0.07276),
  vec3(-0.07367, -0.00605, 1.07602)
);
vec3 ACESFilmicToneMapping(vec3 color) {
  color /= 0.6; // ACEScc mid-gray match, exactly as in three.js
  color = ACESInputMat * color;
  color = RRTAndODTFit(color);
  color = ACESOutputMat * color;
  return clamp(color, 0.0, 1.0);
}
vec3 linearToSrgb(vec3 c) {
  vec3 lo = c * 12.92;
  vec3 hi = 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055;
  return mix(lo, hi, step(vec3(0.0031308), c));
}

float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  vec2 uv = vUv;
  vec2 centered = uv - 0.5;
  float r2 = dot(centered, centered);

  // --- chromatic aberration: radial RGB split, sampled in linear HDR --------
  vec3 col;
  if (uChroma > 0.0001) {
    float shift = uChroma * 0.006 * r2 * 4.0;
    vec2 off = normalize(centered + vec2(1e-7)) * shift;
    col.r = texture2D(tDiffuse, uv + off).r;
    col.g = texture2D(tDiffuse, uv).g;
    col.b = texture2D(tDiffuse, uv - off).b;
  } else {
    col = texture2D(tDiffuse, uv).rgb;
  }

  // --- exposure + ACES filmic + sRGB -----------------------------------------
  col *= exp2(uExposure);
  col = ACESFilmicToneMapping(col);
  col = linearToSrgb(col);

  // --- vignette (display space, restrained) ----------------------------------
  float vig = 1.0 - uVignette * smoothstep(0.12, 0.72, r2);
  col *= vig;

  // --- film grain (display space, animated but deterministic per frame) ------
  if (uGrain > 0.0001) {
    float seed = floor(uTime * 24.0) + 1.0;
    float g = grainHash(uv * uResolution + vec2(seed * 17.17, seed * 3.31));
    col += (g - 0.5) * uGrain * 0.05 * (0.3 + 0.7 * (1.0 - clamp(dot(col, vec3(0.333)), 0.0, 1.0)));
  }

  gl_FragColor = vec4(col, 1.0);
}
`,hS=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;function Xd(o,e,i){const r=o*Math.PI/180,u=e*Math.PI/180,f=Math.cos(u);return new et(i*f*Math.cos(r),i*Math.sin(u),i*f*Math.sin(r))}function EC(o){const e=35+o*360/96,i=20+13*Math.sin(o*2*Math.PI/53),r=12+1.9*Math.sin(o*2*Math.PI/71+1.2);return{azimuth:e,elevation:i,distance:r}}class TC{constructor(e,i,r){this.canvas=e,this.store=i,this.capture=r,this.simTime=r.capture?r.time:0,this.cineClock=0,this.contextLost=!1,this.rafId=0,this.lastFrameT=0,this.disposed=!1,this.readyFired=!1,this.frameCount=0,this._buildRenderer(),this._buildScene(),this._buildControls(),this._applyAllUniforms(),this._resize(),this.onResize=()=>this._resize(),window.addEventListener("resize",this.onResize),this.onContextLost=u=>{u.preventDefault(),this.contextLost=!0,this._notifyOverlay()},this.onContextRestored=()=>{try{this._teardownGpu(),this._buildRenderer(),this._buildScene(),this._buildControls(),this._applyAllUniforms(),this._resize(),this.contextLost=!1,this._notifyOverlay(),this.renderFrame(0)}catch(u){console.error("[gargantua] context restore failed",u)}},e.addEventListener("webglcontextlost",this.onContextLost),e.addEventListener("webglcontextrestored",this.onContextRestored),this.unsub=i.subscribe((u,f)=>{if(this._applyAllUniforms(),this.captureDirty=!0,f==="preset"||f==="reset"||f==="capture-init"){const h=u.params;this.camera.position.copy(Xd(h.azimuth,h.elevation,h.distance)),this.camera.lookAt(0,0,0),this.controls?.update()}}),r.capture&&(this.renderFrame(0),this.renderFrame(0)),this._loop=this._loop.bind(this),this.rafId=requestAnimationFrame(this._loop)}_buildRenderer(){this.renderer=new $R({canvas:this.canvas,antialias:!1,alpha:!1,depth:!1,stencil:!1,powerPreference:"high-performance"}),this.renderer.autoClear=!0,this.renderer.toneMapping=Aa,this.renderer.outputColorSpace=ms}_buildScene(){const e=Wu[this.store.get().quality]??Wu.high;this.scene=new lT,this.quadCamera=new Zp(-1,1,1,-1,0,1);const i=new Ua;i.setAttribute("position",new Ti(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),i.setAttribute("uv",new Ti(new Float32Array([0,0,2,0,0,2]),2)),this.rayUniforms={uResolution:{value:new ne(1,1)},uFov:{value:.8},uCamPos:{value:new et},uCamRight:{value:new et(1,0,0)},uCamUp:{value:new et(0,1,0)},uCamFwd:{value:new et(0,0,-1)},uTime:{value:0},uTurbSpeed:{value:1},uDiskInner:{value:2.3},uDiskOuter:{value:11},uDiskHalfThick:{value:.15},uDiskTemp:{value:1},uDiskEmission:{value:1.6},uOrbitSpeed:{value:1},uTurbAmp:{value:.55},uStarDensity:{value:.7},uGalaxyBright:{value:.85},uMaxSteps:{value:e.maxSteps},uMaxCross:{value:e.maxCross},uDebugView:{value:0}},this.rayMaterial=new Vn({vertexShader:hS,fragmentShader:yC,uniforms:this.rayUniforms,depthTest:!1,depthWrite:!1}),this.quad=new Ii(i,this.rayMaterial),this.quad.frustumCulled=!1,this.scene.add(this.quad);const r=this.renderer.getDrawingBufferSize(new ne),u=new Ei(r.x,r.y,{type:ta,colorSpace:ms});this.composer=new vC(this.renderer,u),this.renderPass=new SC(this.scene,this.quadCamera),this.composer.addPass(this.renderPass),this.bloomPass=new fo(new ne(Math.max(1,r.x/e.bloomDiv),Math.max(1,r.y/e.bloomDiv)),.55,.65,.55),this.composer.addPass(this.bloomPass),this.finishUniforms={tDiffuse:{value:null},uResolution:{value:new ne(1,1)},uExposure:{value:0},uChroma:{value:.25},uVignette:{value:.32},uGrain:{value:.35},uTime:{value:0}},this.finishPass=new ZS({uniforms:this.finishUniforms,vertexShader:hS,fragmentShader:MC}),this.composer.addPass(this.finishPass)}_buildControls(){this.camera=new Mi(50,1,.1,100);const e=this.store.get().params;this.camera.position.copy(Xd(e.azimuth,e.elevation,e.distance)),this.camera.lookAt(0,0,0),this.controls&&this.controls.dispose(),this.controls=new eC(this.camera,this.canvas),this.controls.enableDamping=!1,this.controls.enablePan=!1,this.controls.rotateSpeed=.55,this.controls.zoomSpeed=.8,this.controls.minDistance=ro.distance[1],this.controls.maxDistance=ro.distance[2],this.controls.target.set(0,0,0),this.controls.update(),this.controls.addEventListener("start",()=>{this.store.get().cinematic&&this.store.set({cinematic:!1},"user-override")})}_teardownGpu(){try{this.composer?.dispose(),this.rayMaterial?.dispose(),this.quad?.geometry?.dispose(),this.renderer?.dispose()}catch{}}_applyAllUniforms(){const e=this.store.get(),i=e.params,r=this.rayUniforms,u=Wu[e.quality]??Wu.high;r.uFov.value=i.fov*Math.PI/180,r.uTurbSpeed.value=i.turbSpeed,r.uDiskInner.value=i.diskInner,r.uDiskOuter.value=i.diskOuter,r.uDiskHalfThick.value=i.diskHalfThick,r.uDiskTemp.value=i.diskTemp,r.uDiskEmission.value=i.diskEmission,r.uOrbitSpeed.value=i.orbitSpeed,r.uTurbAmp.value=i.turbAmp,r.uStarDensity.value=i.starDensity,r.uGalaxyBright.value=i.galaxyBright,r.uMaxSteps.value=u.maxSteps,r.uMaxCross.value=u.maxCross,r.uDebugView.value=e.debug,this.bloomPass.strength=i.bloomStrength*(e.debug===0?1:.15),this.bloomPass.threshold=i.bloomThreshold,this.bloomPass.radius=e.quality==="cinematic"?.8:.55,this.finishUniforms.uExposure.value=i.exposure,this.finishUniforms.uChroma.value=i.chroma,this.finishUniforms.uVignette.value=i.vignette,this.finishUniforms.uGrain.value=i.grain,this.budgetScale!==u.scale&&(this.budgetScale=u.scale,this._resize()),this._updateCameraUniforms()}_updateCameraUniforms(){this.camera.updateMatrixWorld();const e=this.camera.matrixWorld.elements;this.rayUniforms.uCamPos.value.copy(this.camera.position),this.rayUniforms.uCamRight.value.set(e[0],e[1],e[2]).normalize(),this.rayUniforms.uCamUp.value.set(e[4],e[5],e[6]).normalize(),this.rayUniforms.uCamFwd.value.set(-e[8],-e[9],-e[10]).normalize()}_resize(){if(this.captureDirty=!0,!this.renderer)return;const e=Math.max(1,this.canvas.clientWidth||window.innerWidth),i=Math.max(1,this.canvas.clientHeight||window.innerHeight),r=Math.min(window.devicePixelRatio||1,2),u=(this.budgetScale??1)*r;this.renderer.setPixelRatio(1),this.renderer.setSize(Math.round(e*u),Math.round(i*u),!1),this.canvas.style.width="100%",this.canvas.style.height="100%",this.camera.aspect=e/i,this.camera.updateProjectionMatrix();const f=this.renderer.getDrawingBufferSize(new ne);this.rayUniforms.uResolution.value.set(f.x,f.y),this.finishUniforms.uResolution.value.set(f.x,f.y),this.composer&&this.composer.setSize(f.x,f.y)}_readBackControls(){const e=this.camera.position,i=e.length(),r=Math.asin(Math.min(1,Math.max(-1,e.y/Math.max(i,1e-6))))*180/Math.PI;let u=Math.atan2(e.z,e.x)*180/Math.PI;u>180&&(u-=360),u<-180&&(u+=360);const h=this.store.get().params,d=(m,g)=>Math.abs(m-g)<.02;(!d(h.azimuth,u)||!d(h.elevation,r)||!d(h.distance,i))&&this.store.set({params:{...h,azimuth:u,elevation:r,distance:i}},"camera")}renderFrame(e){const i=this.store.get(),r=i.params;if(this.capture.capture||(this.simTime+=e*r.timeScale,this.cineClock+=e),i.cinematic&&!this.capture.capture){const u=EC(this.cineClock);this.camera.position.copy(Xd(u.azimuth,u.elevation,u.distance)),this.camera.lookAt(0,0,0),this.controls.update()}else this.controls.update(),this._readBackControls();this.camera.fov=r.fov,this.camera.updateProjectionMatrix(),this._updateCameraUniforms(),this.rayUniforms.uTime.value=this.simTime,this.finishUniforms.uTime.value=this.capture.capture?this.capture.time:performance.now()/1e3,this.composer.render(),this.frameCount++,!this.readyFired&&this.frameCount>=2&&(this.readyFired=!0,document.documentElement.dataset.gargantuaReady="true")}_loop(e){if(this.disposed||(this.rafId=requestAnimationFrame(this._loop),this.contextLost))return;const i=e/1e3,r=this.lastFrameT?Math.min(i-this.lastFrameT,.1):.016;this.lastFrameT=i,!(this.capture.capture&&this.readyFired&&!this.captureDirty)&&(this.captureDirty=!1,this.renderFrame(r))}_notifyOverlay(){window.dispatchEvent(new CustomEvent("gargantua-context",{detail:{lost:this.contextLost}}))}dispose(){this.disposed=!0,cancelAnimationFrame(this.rafId),window.removeEventListener("resize",this.onResize),this.canvas.removeEventListener("webglcontextlost",this.onContextLost),this.canvas.removeEventListener("webglcontextrestored",this.onContextRestored),this.unsub?.(),this.controls?.dispose(),this._teardownGpu()}}function KS(o){return dl.useSyncExternalStore(e=>o.subscribe(e),()=>o.get())}function bC({store:o,k:e}){const i=KS(o),[r,u,f,h,d]=ro[e],m=i.params[e],g=(f-u)/200;return Lt.jsxs("div",{className:"ctl-row",title:`${h} (default ${r}${d})`,children:[Lt.jsx("label",{htmlFor:`p-${e}`,children:h}),Lt.jsx("input",{id:`p-${e}`,type:"range",min:u,max:f,step:g,value:m,onChange:v=>o.setParam(e,Number(v.target.value))}),Lt.jsxs("span",{className:"ctl-val",children:[m.toFixed(2),d]}),Lt.jsx("button",{className:"ctl-reset","aria-label":`reset ${h}`,disabled:m===r,onClick:()=>o.setParam(e,r),children:"⟲"})]})}function AC({store:o,contextLost:e,captureMode:i}){const r=KS(o),[u,f]=dl.useState(!1);if(!r.hudVisible)return Lt.jsxs(Lt.Fragment,{children:[e&&Lt.jsx(dS,{}),!i&&Lt.jsx("button",{className:"hud-peek","aria-label":"show HUD (H)",onClick:()=>o.set({hudVisible:!0},"hud"),children:"GARGANTUA — show HUD [H]"})]});const h=r.hudCollapsed&&!u;return Lt.jsxs(Lt.Fragment,{children:[e&&Lt.jsx(dS,{}),Lt.jsx("button",{className:"hud-mobile-toggle","aria-label":"toggle controls drawer",onClick:()=>f(d=>!d),children:u?"✕ close":"☰ controls"}),Lt.jsxs("aside",{className:`hud ${u?"drawer-open":""} ${h?"collapsed":""}`,children:[Lt.jsxs("header",{className:"hud-head",children:[Lt.jsxs("div",{children:[Lt.jsx("h1",{children:"GARGANTUA"}),Lt.jsx("p",{className:"sub",children:"Schwarzschild Black Hole Raytracer"})]}),Lt.jsx("button",{className:"hud-collapse","aria-label":"collapse panel",onClick:()=>o.set({hudCollapsed:!r.hudCollapsed},"hud"),children:r.hudCollapsed?"▸":"▾"})]}),!h&&Lt.jsxs("div",{className:"hud-body",children:[Lt.jsxs("section",{className:"hud-status",children:[Lt.jsxs("span",{className:`pill q-${r.quality}`,children:["quality: ",r.quality]}),Lt.jsxs("span",{className:"pill",children:["debug ",r.debug,": ",hd[r.debug]]}),Lt.jsxs("span",{className:`pill ${r.cinematic?"on":""}`,children:["cinematic: ",r.cinematic?"playing":"off"]}),Lt.jsxs("span",{className:"pill",children:["preset: ",Tc[r.presetIndex]?.name??"—"]})]}),Lt.jsxs("section",{className:"hud-group",children:[Lt.jsxs("h2",{children:["View presets ",Lt.jsx("kbd",{children:"Shift+1..4"})]}),Lt.jsx("div",{className:"btn-row",children:Tc.map((d,m)=>Lt.jsxs("button",{className:r.presetIndex===m&&!r.cinematic?"active":"",onClick:()=>o.applyPreset(m),children:[m+1," ",d.name]},d.name))})]}),Lt.jsxs("section",{className:"hud-group",children:[Lt.jsxs("h2",{children:["Quality ",Lt.jsx("kbd",{children:"Q"})]}),Lt.jsx("div",{className:"btn-row",children:no.map(d=>Lt.jsx("button",{className:r.quality===d?"active":"",onClick:()=>o.set({quality:d},"quality"),children:d},d))})]}),Lt.jsxs("section",{className:"hud-group",children:[Lt.jsxs("h2",{children:["Debug view ",Lt.jsx("kbd",{children:"0..9"})]}),Lt.jsx("div",{className:"btn-row debug-row",children:hd.map((d,m)=>Lt.jsx("button",{className:r.debug===m?"active":"",title:d,onClick:()=>o.set({debug:m},"debug"),children:m},m))}),Lt.jsx("p",{className:"debug-desc",children:hd[r.debug]})]}),Lt.jsxs("section",{className:"hud-group",children:[Lt.jsx("h2",{children:"Playback"}),Lt.jsxs("div",{className:"btn-row",children:[Lt.jsxs("button",{className:r.cinematic?"active":"",onClick:()=>o.set({cinematic:!r.cinematic},"cinematic"),children:[r.cinematic?"⏸ pause cinematic":"▶ play cinematic"," ",Lt.jsx("kbd",{children:"Space"})]}),Lt.jsxs("button",{onClick:()=>o.reset(),children:["reset all ",Lt.jsx("kbd",{children:"R"})]})]})]}),Lt.jsxs("section",{className:"hud-group",children:[Lt.jsx("h2",{children:"Parameters"}),Lt.jsx("div",{className:"ctl-list",children:zp.map(d=>Lt.jsx(bC,{store:o,k:d},d))})]}),Lt.jsxs("section",{className:"hud-group keys",children:[Lt.jsx("h2",{children:"Keys"}),Lt.jsxs("ul",{children:[Lt.jsxs("li",{children:[Lt.jsx("kbd",{children:"0–9"})," debug views"]}),Lt.jsxs("li",{children:[Lt.jsx("kbd",{children:"Shift+1–4"})," view presets"]}),Lt.jsxs("li",{children:[Lt.jsx("kbd",{children:"Space"})," cinematic play/pause"]}),Lt.jsxs("li",{children:[Lt.jsx("kbd",{children:"H"})," HUD show/hide"]}),Lt.jsxs("li",{children:[Lt.jsx("kbd",{children:"R"})," reset all parameters"]}),Lt.jsxs("li",{children:[Lt.jsx("kbd",{children:"Q"})," cycle quality tier"]})]})]})]})]})]})}function dS(){return Lt.jsx("div",{className:"context-overlay",role:"alert",children:Lt.jsxs("div",{children:[Lt.jsx("h2",{children:"WebGL context lost"}),Lt.jsx("p",{children:"Rendering is paused. The GPU context is being restored automatically — no reload needed."})]})})}const Pn=qM(),RC=Pn.capture?null:kM(),po=RC??Bp();Pn.quality&&(po.quality=Pn.quality);Pn.preset!==null&&(po.presetIndex=Pn.preset);Pn.debug!==null&&(po.debug=Pn.debug);Pn.hud!==null&&(po.hudVisible=Pn.hud);Pn.capture&&(po.cinematic=!1);const Pi=YM(po,{persist:!Pn.capture});if(Pn.preset!==null){const o=Tc[Pn.preset];Pi.set({params:{...Pi.get().params,azimuth:o.azimuth,elevation:o.elevation,distance:o.distance,fov:o.fov}},"capture-init")}const pl={current:null};function CC(o){const e=i=>{if(i.target&&(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA")||i.ctrlKey||i.metaKey||i.altKey)return;const r=o.get();if(i.shiftKey&&/^Digit[1-4]$/.test(i.code)){o.applyPreset(Number(i.code.slice(-1))-1),i.preventDefault();return}if(!i.shiftKey){if(/^[0-9]$/.test(i.key)){o.set({debug:Number(i.key)},"debug");return}switch(i.code){case"Space":o.set({cinematic:!r.cinematic},"cinematic"),i.preventDefault();break;case"KeyH":o.set({hudVisible:!r.hudVisible},"hud");break;case"KeyR":o.reset();break;case"KeyQ":{const u=no.indexOf(r.quality);o.set({quality:no[(u+1)%no.length]},"quality");break}}}};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)}Object.defineProperty(window,"__GARGANTUA__",{configurable:!0,value:{get ready(){return document.documentElement.dataset.gargantuaReady==="true"},getState(){const o=Pi.get();return JSON.parse(JSON.stringify({params:o.params,quality:o.quality,debug:o.debug,cinematic:o.cinematic,hudVisible:o.hudVisible,presetIndex:o.presetIndex,capture:Pn.capture,time:pl.current?.simTime??0}))},setQuality(o){return typeof o!="string"||!no.includes(o.toLowerCase())?null:(Pi.set({quality:o.toLowerCase()},"quality"),this.getState())},setPreset(o){return Pi.applyPreset(Number(o))?this.getState():null},setDebug(o){const e=Number(o);return!Number.isInteger(e)||e<0||e>9?null:(Pi.set({debug:e},"debug"),this.getState())},setParam(o,e){return Pi.setParam(o,e)?this.getState():null},setTime(o){const e=Number(o);return!Number.isFinite(e)||e<0?null:(pl.current&&(pl.current.simTime=e),this.getState())}}});function wC(){const o=dl.useRef(null),[e,i]=dl.useState(!1);return dl.useEffect(()=>{const r=new TC(o.current,Pi,Pn);pl.current=r;const u=CC(Pi),f=d=>i(d.detail.lost);window.addEventListener("gargantua-context",f);const h=()=>Pi.flush();return window.addEventListener("beforeunload",h),()=>{window.removeEventListener("gargantua-context",f),window.removeEventListener("beforeunload",h),u(),r.dispose(),pl.current=null}},[]),Lt.jsxs(Lt.Fragment,{children:[Lt.jsx("canvas",{ref:o,className:"gl-canvas"}),Lt.jsx(AC,{store:Pi,contextLost:e,captureMode:Pn.capture})]})}const DC=GM.createRoot(document.getElementById("root"));DC.render(Lt.jsx(wC,{}));
