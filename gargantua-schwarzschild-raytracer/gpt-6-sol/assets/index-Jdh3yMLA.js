(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const h of c.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();function Ox(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var ah={exports:{}},se={};var N0;function Px(){if(N0)return se;N0=1;var s=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),h=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),_=Symbol.iterator;function E(w){return w===null||typeof w!="object"?null:(w=_&&w[_]||w["@@iterator"],typeof w=="function"?w:null)}var R={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},O=Object.assign,M={};function S(w,J,gt){this.props=w,this.context=J,this.refs=M,this.updater=gt||R}S.prototype.isReactComponent={},S.prototype.setState=function(w,J){if(typeof w!="object"&&typeof w!="function"&&w!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,w,J,"setState")},S.prototype.forceUpdate=function(w){this.updater.enqueueForceUpdate(this,w,"forceUpdate")};function B(){}B.prototype=S.prototype;function k(w,J,gt){this.props=w,this.context=J,this.refs=M,this.updater=gt||R}var U=k.prototype=new B;U.constructor=k,O(U,S.prototype),U.isPureReactComponent=!0;var C=Array.isArray;function D(){}var L={H:null,A:null,T:null,S:null},b=Object.prototype.hasOwnProperty;function P(w,J,gt){var Et=gt.ref;return{$$typeof:s,type:w,key:J,ref:Et!==void 0?Et:null,props:gt}}function W(w,J){return P(w.type,J,w.props)}function q(w){return typeof w=="object"&&w!==null&&w.$$typeof===s}function Q(w){var J={"=":"=0",":":"=2"};return"$"+w.replace(/[=:]/g,function(gt){return J[gt]})}var lt=/\/+/g;function Y(w,J){return typeof w=="object"&&w!==null&&w.key!=null?Q(""+w.key):J.toString(36)}function j(w){switch(w.status){case"fulfilled":return w.value;case"rejected":throw w.reason;default:switch(typeof w.status=="string"?w.then(D,D):(w.status="pending",w.then(function(J){w.status==="pending"&&(w.status="fulfilled",w.value=J)},function(J){w.status==="pending"&&(w.status="rejected",w.reason=J)})),w.status){case"fulfilled":return w.value;case"rejected":throw w.reason}}throw w}function I(w,J,gt,Et,Nt){var Xt=typeof w;(Xt==="undefined"||Xt==="boolean")&&(w=null);var it=!1;if(w===null)it=!0;else switch(Xt){case"bigint":case"string":case"number":it=!0;break;case"object":switch(w.$$typeof){case s:case t:it=!0;break;case x:return it=w._init,I(it(w._payload),J,gt,Et,Nt)}}if(it)return Nt=Nt(w),it=Et===""?"."+Y(w,0):Et,C(Nt)?(gt="",it!=null&&(gt=it.replace(lt,"$&/")+"/"),I(Nt,J,gt,"",function(te){return te})):Nt!=null&&(q(Nt)&&(Nt=W(Nt,gt+(Nt.key==null||w&&w.key===Nt.key?"":(""+Nt.key).replace(lt,"$&/")+"/")+it)),J.push(Nt)),1;it=0;var _t=Et===""?".":Et+":";if(C(w))for(var Tt=0;Tt<w.length;Tt++)Et=w[Tt],Xt=_t+Y(Et,Tt),it+=I(Et,J,gt,Xt,Nt);else if(Tt=E(w),typeof Tt=="function")for(w=Tt.call(w),Tt=0;!(Et=w.next()).done;)Et=Et.value,Xt=_t+Y(Et,Tt++),it+=I(Et,J,gt,Xt,Nt);else if(Xt==="object"){if(typeof w.then=="function")return I(j(w),J,gt,Et,Nt);throw J=String(w),Error("Objects are not valid as a React child (found: "+(J==="[object Object]"?"object with keys {"+Object.keys(w).join(", ")+"}":J)+"). If you meant to render a collection of children, use an array instead.")}return it}function F(w,J,gt){if(w==null)return w;var Et=[],Nt=0;return I(w,Et,"","",function(Xt){return J.call(gt,Xt,Nt++)}),Et}function ut(w){if(w._status===-1){var J=w._result;J=J(),J.then(function(gt){(w._status===0||w._status===-1)&&(w._status=1,w._result=gt)},function(gt){(w._status===0||w._status===-1)&&(w._status=2,w._result=gt)}),w._status===-1&&(w._status=0,w._result=J)}if(w._status===1)return w._result.default;throw w._result}var rt=typeof reportError=="function"?reportError:function(w){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var J=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof w=="object"&&w!==null&&typeof w.message=="string"?String(w.message):String(w),error:w});if(!window.dispatchEvent(J))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",w);return}console.error(w)},ht={map:F,forEach:function(w,J,gt){F(w,function(){J.apply(this,arguments)},gt)},count:function(w){var J=0;return F(w,function(){J++}),J},toArray:function(w){return F(w,function(J){return J})||[]},only:function(w){if(!q(w))throw Error("React.Children.only expected to receive a single React element child.");return w}};return se.Activity=v,se.Children=ht,se.Component=S,se.Fragment=i,se.Profiler=l,se.PureComponent=k,se.StrictMode=r,se.Suspense=m,se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=L,se.__COMPILER_RUNTIME={__proto__:null,c:function(w){return L.H.useMemoCache(w)}},se.cache=function(w){return function(){return w.apply(null,arguments)}},se.cacheSignal=function(){return null},se.cloneElement=function(w,J,gt){if(w==null)throw Error("The argument must be a React element, but you passed "+w+".");var Et=O({},w.props),Nt=w.key;if(J!=null)for(Xt in J.key!==void 0&&(Nt=""+J.key),J)!b.call(J,Xt)||Xt==="key"||Xt==="__self"||Xt==="__source"||Xt==="ref"&&J.ref===void 0||(Et[Xt]=J[Xt]);var Xt=arguments.length-2;if(Xt===1)Et.children=gt;else if(1<Xt){for(var it=Array(Xt),_t=0;_t<Xt;_t++)it[_t]=arguments[_t+2];Et.children=it}return P(w.type,Nt,Et)},se.createContext=function(w){return w={$$typeof:h,_currentValue:w,_currentValue2:w,_threadCount:0,Provider:null,Consumer:null},w.Provider=w,w.Consumer={$$typeof:c,_context:w},w},se.createElement=function(w,J,gt){var Et,Nt={},Xt=null;if(J!=null)for(Et in J.key!==void 0&&(Xt=""+J.key),J)b.call(J,Et)&&Et!=="key"&&Et!=="__self"&&Et!=="__source"&&(Nt[Et]=J[Et]);var it=arguments.length-2;if(it===1)Nt.children=gt;else if(1<it){for(var _t=Array(it),Tt=0;Tt<it;Tt++)_t[Tt]=arguments[Tt+2];Nt.children=_t}if(w&&w.defaultProps)for(Et in it=w.defaultProps,it)Nt[Et]===void 0&&(Nt[Et]=it[Et]);return P(w,Xt,Nt)},se.createRef=function(){return{current:null}},se.forwardRef=function(w){return{$$typeof:p,render:w}},se.isValidElement=q,se.lazy=function(w){return{$$typeof:x,_payload:{_status:-1,_result:w},_init:ut}},se.memo=function(w,J){return{$$typeof:d,type:w,compare:J===void 0?null:J}},se.startTransition=function(w){var J=L.T,gt={};L.T=gt;try{var Et=w(),Nt=L.S;Nt!==null&&Nt(gt,Et),typeof Et=="object"&&Et!==null&&typeof Et.then=="function"&&Et.then(D,rt)}catch(Xt){rt(Xt)}finally{J!==null&&gt.types!==null&&(J.types=gt.types),L.T=J}},se.unstable_useCacheRefresh=function(){return L.H.useCacheRefresh()},se.use=function(w){return L.H.use(w)},se.useActionState=function(w,J,gt){return L.H.useActionState(w,J,gt)},se.useCallback=function(w,J){return L.H.useCallback(w,J)},se.useContext=function(w){return L.H.useContext(w)},se.useDebugValue=function(){},se.useDeferredValue=function(w,J){return L.H.useDeferredValue(w,J)},se.useEffect=function(w,J){return L.H.useEffect(w,J)},se.useEffectEvent=function(w){return L.H.useEffectEvent(w)},se.useId=function(){return L.H.useId()},se.useImperativeHandle=function(w,J,gt){return L.H.useImperativeHandle(w,J,gt)},se.useInsertionEffect=function(w,J){return L.H.useInsertionEffect(w,J)},se.useLayoutEffect=function(w,J){return L.H.useLayoutEffect(w,J)},se.useMemo=function(w,J){return L.H.useMemo(w,J)},se.useOptimistic=function(w,J){return L.H.useOptimistic(w,J)},se.useReducer=function(w,J,gt){return L.H.useReducer(w,J,gt)},se.useRef=function(w){return L.H.useRef(w)},se.useState=function(w){return L.H.useState(w)},se.useSyncExternalStore=function(w,J,gt){return L.H.useSyncExternalStore(w,J,gt)},se.useTransition=function(){return L.H.useTransition()},se.version="19.2.8",se}var O0;function Od(){return O0||(O0=1,ah.exports=Px()),ah.exports}var Un=Od();const Rt=Ox(Un);var rh={exports:{}},Oo={},sh={exports:{}},oh={};var P0;function Ix(){return P0||(P0=1,(function(s){function t(I,F){var ut=I.length;I.push(F);t:for(;0<ut;){var rt=ut-1>>>1,ht=I[rt];if(0<l(ht,F))I[rt]=F,I[ut]=ht,ut=rt;else break t}}function i(I){return I.length===0?null:I[0]}function r(I){if(I.length===0)return null;var F=I[0],ut=I.pop();if(ut!==F){I[0]=ut;t:for(var rt=0,ht=I.length,w=ht>>>1;rt<w;){var J=2*(rt+1)-1,gt=I[J],Et=J+1,Nt=I[Et];if(0>l(gt,ut))Et<ht&&0>l(Nt,gt)?(I[rt]=Nt,I[Et]=ut,rt=Et):(I[rt]=gt,I[J]=ut,rt=J);else if(Et<ht&&0>l(Nt,ut))I[rt]=Nt,I[Et]=ut,rt=Et;else break t}}return F}function l(I,F){var ut=I.sortIndex-F.sortIndex;return ut!==0?ut:I.id-F.id}if(s.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;s.unstable_now=function(){return c.now()}}else{var h=Date,p=h.now();s.unstable_now=function(){return h.now()-p}}var m=[],d=[],x=1,v=null,_=3,E=!1,R=!1,O=!1,M=!1,S=typeof setTimeout=="function"?setTimeout:null,B=typeof clearTimeout=="function"?clearTimeout:null,k=typeof setImmediate<"u"?setImmediate:null;function U(I){for(var F=i(d);F!==null;){if(F.callback===null)r(d);else if(F.startTime<=I)r(d),F.sortIndex=F.expirationTime,t(m,F);else break;F=i(d)}}function C(I){if(O=!1,U(I),!R)if(i(m)!==null)R=!0,D||(D=!0,Q());else{var F=i(d);F!==null&&j(C,F.startTime-I)}}var D=!1,L=-1,b=5,P=-1;function W(){return M?!0:!(s.unstable_now()-P<b)}function q(){if(M=!1,D){var I=s.unstable_now();P=I;var F=!0;try{t:{R=!1,O&&(O=!1,B(L),L=-1),E=!0;var ut=_;try{e:{for(U(I),v=i(m);v!==null&&!(v.expirationTime>I&&W());){var rt=v.callback;if(typeof rt=="function"){v.callback=null,_=v.priorityLevel;var ht=rt(v.expirationTime<=I);if(I=s.unstable_now(),typeof ht=="function"){v.callback=ht,U(I),F=!0;break e}v===i(m)&&r(m),U(I)}else r(m);v=i(m)}if(v!==null)F=!0;else{var w=i(d);w!==null&&j(C,w.startTime-I),F=!1}}break t}finally{v=null,_=ut,E=!1}F=void 0}}finally{F?Q():D=!1}}}var Q;if(typeof k=="function")Q=function(){k(q)};else if(typeof MessageChannel<"u"){var lt=new MessageChannel,Y=lt.port2;lt.port1.onmessage=q,Q=function(){Y.postMessage(null)}}else Q=function(){S(q,0)};function j(I,F){L=S(function(){I(s.unstable_now())},F)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(I){I.callback=null},s.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):b=0<I?Math.floor(1e3/I):5},s.unstable_getCurrentPriorityLevel=function(){return _},s.unstable_next=function(I){switch(_){case 1:case 2:case 3:var F=3;break;default:F=_}var ut=_;_=F;try{return I()}finally{_=ut}},s.unstable_requestPaint=function(){M=!0},s.unstable_runWithPriority=function(I,F){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var ut=_;_=I;try{return F()}finally{_=ut}},s.unstable_scheduleCallback=function(I,F,ut){var rt=s.unstable_now();switch(typeof ut=="object"&&ut!==null?(ut=ut.delay,ut=typeof ut=="number"&&0<ut?rt+ut:rt):ut=rt,I){case 1:var ht=-1;break;case 2:ht=250;break;case 5:ht=1073741823;break;case 4:ht=1e4;break;default:ht=5e3}return ht=ut+ht,I={id:x++,callback:F,priorityLevel:I,startTime:ut,expirationTime:ht,sortIndex:-1},ut>rt?(I.sortIndex=ut,t(d,I),i(m)===null&&I===i(d)&&(O?(B(L),L=-1):O=!0,j(C,ut-rt))):(I.sortIndex=ht,t(m,I),R||E||(R=!0,D||(D=!0,Q()))),I},s.unstable_shouldYield=W,s.unstable_wrapCallback=function(I){var F=_;return function(){var ut=_;_=F;try{return I.apply(this,arguments)}finally{_=ut}}}})(oh)),oh}var I0;function Bx(){return I0||(I0=1,sh.exports=Ix()),sh.exports}var lh={exports:{}},Nn={};var B0;function zx(){if(B0)return Nn;B0=1;var s=Od();function t(m){var d="https://react.dev/errors/"+m;if(1<arguments.length){d+="?args[]="+encodeURIComponent(arguments[1]);for(var x=2;x<arguments.length;x++)d+="&args[]="+encodeURIComponent(arguments[x])}return"Minified React error #"+m+"; visit "+d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var r={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,d,x){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:v==null?null:""+v,children:m,containerInfo:d,implementation:x}}var h=s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(m,d){if(m==="font")return"";if(typeof d=="string")return d==="use-credentials"?d:""}return Nn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,Nn.createPortal=function(m,d){var x=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11)throw Error(t(299));return c(m,d,null,x)},Nn.flushSync=function(m){var d=h.T,x=r.p;try{if(h.T=null,r.p=2,m)return m()}finally{h.T=d,r.p=x,r.d.f()}},Nn.preconnect=function(m,d){typeof m=="string"&&(d?(d=d.crossOrigin,d=typeof d=="string"?d==="use-credentials"?d:"":void 0):d=null,r.d.C(m,d))},Nn.prefetchDNS=function(m){typeof m=="string"&&r.d.D(m)},Nn.preinit=function(m,d){if(typeof m=="string"&&d&&typeof d.as=="string"){var x=d.as,v=p(x,d.crossOrigin),_=typeof d.integrity=="string"?d.integrity:void 0,E=typeof d.fetchPriority=="string"?d.fetchPriority:void 0;x==="style"?r.d.S(m,typeof d.precedence=="string"?d.precedence:void 0,{crossOrigin:v,integrity:_,fetchPriority:E}):x==="script"&&r.d.X(m,{crossOrigin:v,integrity:_,fetchPriority:E,nonce:typeof d.nonce=="string"?d.nonce:void 0})}},Nn.preinitModule=function(m,d){if(typeof m=="string")if(typeof d=="object"&&d!==null){if(d.as==null||d.as==="script"){var x=p(d.as,d.crossOrigin);r.d.M(m,{crossOrigin:x,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0})}}else d==null&&r.d.M(m)},Nn.preload=function(m,d){if(typeof m=="string"&&typeof d=="object"&&d!==null&&typeof d.as=="string"){var x=d.as,v=p(x,d.crossOrigin);r.d.L(m,x,{crossOrigin:v,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0,type:typeof d.type=="string"?d.type:void 0,fetchPriority:typeof d.fetchPriority=="string"?d.fetchPriority:void 0,referrerPolicy:typeof d.referrerPolicy=="string"?d.referrerPolicy:void 0,imageSrcSet:typeof d.imageSrcSet=="string"?d.imageSrcSet:void 0,imageSizes:typeof d.imageSizes=="string"?d.imageSizes:void 0,media:typeof d.media=="string"?d.media:void 0})}},Nn.preloadModule=function(m,d){if(typeof m=="string")if(d){var x=p(d.as,d.crossOrigin);r.d.m(m,{as:typeof d.as=="string"&&d.as!=="script"?d.as:void 0,crossOrigin:x,integrity:typeof d.integrity=="string"?d.integrity:void 0})}else r.d.m(m)},Nn.requestFormReset=function(m){r.d.r(m)},Nn.unstable_batchedUpdates=function(m,d){return m(d)},Nn.useFormState=function(m,d,x){return h.H.useFormState(m,d,x)},Nn.useFormStatus=function(){return h.H.useHostTransitionStatus()},Nn.version="19.2.8",Nn}var z0;function Fx(){if(z0)return lh.exports;z0=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(t){console.error(t)}}return s(),lh.exports=zx(),lh.exports}var F0;function Hx(){if(F0)return Oo;F0=1;var s=Bx(),t=Od(),i=Fx();function r(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function h(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function p(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(r(188))}function d(e){var n=e.alternate;if(!n){if(n=c(e),n===null)throw Error(r(188));return n!==e?null:e}for(var a=e,o=n;;){var u=a.return;if(u===null)break;var f=u.alternate;if(f===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===f.child){for(f=u.child;f;){if(f===a)return m(u),e;if(f===o)return m(u),n;f=f.sibling}throw Error(r(188))}if(a.return!==o.return)a=u,o=f;else{for(var g=!1,A=u.child;A;){if(A===a){g=!0,a=u,o=f;break}if(A===o){g=!0,o=u,a=f;break}A=A.sibling}if(!g){for(A=f.child;A;){if(A===a){g=!0,a=f,o=u;break}if(A===o){g=!0,o=f,a=u;break}A=A.sibling}if(!g)throw Error(r(189))}}if(a.alternate!==o)throw Error(r(190))}if(a.tag!==3)throw Error(r(188));return a.stateNode.current===a?e:n}function x(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=x(e),n!==null)return n;e=e.sibling}return null}var v=Object.assign,_=Symbol.for("react.element"),E=Symbol.for("react.transitional.element"),R=Symbol.for("react.portal"),O=Symbol.for("react.fragment"),M=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),B=Symbol.for("react.consumer"),k=Symbol.for("react.context"),U=Symbol.for("react.forward_ref"),C=Symbol.for("react.suspense"),D=Symbol.for("react.suspense_list"),L=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),P=Symbol.for("react.activity"),W=Symbol.for("react.memo_cache_sentinel"),q=Symbol.iterator;function Q(e){return e===null||typeof e!="object"?null:(e=q&&e[q]||e["@@iterator"],typeof e=="function"?e:null)}var lt=Symbol.for("react.client.reference");function Y(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===lt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case O:return"Fragment";case S:return"Profiler";case M:return"StrictMode";case C:return"Suspense";case D:return"SuspenseList";case P:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case R:return"Portal";case k:return e.displayName||"Context";case B:return(e._context.displayName||"Context")+".Consumer";case U:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case L:return n=e.displayName||null,n!==null?n:Y(e.type)||"Memo";case b:n=e._payload,e=e._init;try{return Y(e(n))}catch{}}return null}var j=Array.isArray,I=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,F=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ut={pending:!1,data:null,method:null,action:null},rt=[],ht=-1;function w(e){return{current:e}}function J(e){0>ht||(e.current=rt[ht],rt[ht]=null,ht--)}function gt(e,n){ht++,rt[ht]=e.current,e.current=n}var Et=w(null),Nt=w(null),Xt=w(null),it=w(null);function _t(e,n){switch(gt(Xt,n),gt(Nt,e),gt(Et,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?n0(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=n0(n),e=i0(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}J(Et),gt(Et,e)}function Tt(){J(Et),J(Nt),J(Xt)}function te(e){e.memoizedState!==null&&gt(it,e);var n=Et.current,a=i0(n,e.type);n!==a&&(gt(Nt,e),gt(Et,a))}function Ht(e){Nt.current===e&&(J(Et),J(Nt)),it.current===e&&(J(it),wo._currentValue=ut)}var le,$e;function ae(e){if(le===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);le=n&&n[1]||"",$e=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+le+e+$e}var Se=!1;function Le(e,n){if(!e||Se)return"";Se=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var yt=function(){throw Error()};if(Object.defineProperty(yt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(yt,[])}catch(ft){var ot=ft}Reflect.construct(e,[],yt)}else{try{yt.call()}catch(ft){ot=ft}e.call(yt.prototype)}}else{try{throw Error()}catch(ft){ot=ft}(yt=e())&&typeof yt.catch=="function"&&yt.catch(function(){})}}catch(ft){if(ft&&ot&&typeof ft.stack=="string")return[ft.stack,ot.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=o.DetermineComponentFrameRoot(),g=f[0],A=f[1];if(g&&A){var z=g.split(`
`),at=A.split(`
`);for(u=o=0;o<z.length&&!z[o].includes("DetermineComponentFrameRoot");)o++;for(;u<at.length&&!at[u].includes("DetermineComponentFrameRoot");)u++;if(o===z.length||u===at.length)for(o=z.length-1,u=at.length-1;1<=o&&0<=u&&z[o]!==at[u];)u--;for(;1<=o&&0<=u;o--,u--)if(z[o]!==at[u]){if(o!==1||u!==1)do if(o--,u--,0>u||z[o]!==at[u]){var vt=`
`+z[o].replace(" at new "," at ");return e.displayName&&vt.includes("<anonymous>")&&(vt=vt.replace("<anonymous>",e.displayName)),vt}while(1<=o&&0<=u);break}}}finally{Se=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?ae(a):""}function me(e,n){switch(e.tag){case 26:case 27:case 5:return ae(e.type);case 16:return ae("Lazy");case 13:return e.child!==n&&n!==null?ae("Suspense Fallback"):ae("Suspense");case 19:return ae("SuspenseList");case 0:case 15:return Le(e.type,!1);case 11:return Le(e.type.render,!1);case 1:return Le(e.type,!0);case 31:return ae("Activity");default:return""}}function Xe(e){try{var n="",a=null;do n+=me(e,a),a=e,e=e.return;while(e);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var tn=Object.prototype.hasOwnProperty,Mn=s.unstable_scheduleCallback,We=s.unstable_cancelCallback,en=s.unstable_shouldYield,X=s.unstable_requestPaint,Ne=s.unstable_now,De=s.unstable_getCurrentPriorityLevel,N=s.unstable_ImmediatePriority,y=s.unstable_UserBlockingPriority,K=s.unstable_NormalPriority,st=s.unstable_LowPriority,dt=s.unstable_IdlePriority,bt=s.log,wt=s.unstable_setDisableYieldValue,pt=null,mt=null;function At(e){if(typeof bt=="function"&&wt(e),mt&&typeof mt.setStrictMode=="function")try{mt.setStrictMode(pt,e)}catch{}}var Gt=Math.clz32?Math.clz32:Qt,Ot=Math.log,Ut=Math.LN2;function Qt(e){return e>>>=0,e===0?32:31-(Ot(e)/Ut|0)|0}var Jt=256,ee=262144,V=4194304;function Ct(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function St(e,n,a){var o=e.pendingLanes;if(o===0)return 0;var u=0,f=e.suspendedLanes,g=e.pingedLanes;e=e.warmLanes;var A=o&134217727;return A!==0?(o=A&~f,o!==0?u=Ct(o):(g&=A,g!==0?u=Ct(g):a||(a=A&~e,a!==0&&(u=Ct(a))))):(A=o&~f,A!==0?u=Ct(A):g!==0?u=Ct(g):a||(a=o&~e,a!==0&&(u=Ct(a)))),u===0?0:n!==0&&n!==u&&(n&f)===0&&(f=u&-u,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:u}function Dt(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function Bt(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Mt(){var e=V;return V<<=1,(V&62914560)===0&&(V=4194304),e}function Kt(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function Wt(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Fe(e,n,a,o,u,f){var g=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var A=e.entanglements,z=e.expirationTimes,at=e.hiddenUpdates;for(a=g&~a;0<a;){var vt=31-Gt(a),yt=1<<vt;A[vt]=0,z[vt]=-1;var ot=at[vt];if(ot!==null)for(at[vt]=null,vt=0;vt<ot.length;vt++){var ft=ot[vt];ft!==null&&(ft.lane&=-536870913)}a&=~yt}o!==0&&be(e,o,0),f!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=f&~(g&~n))}function be(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-Gt(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function Gn(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var o=31-Gt(a),u=1<<o;u&n|e[o]&n&&(e[o]|=n),a&=~u}}function jn(e,n){var a=n&-n;return a=(a&42)!==0?1:Vs(a),(a&(e.suspendedLanes|n))!==0?0:a}function Vs(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ks(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Xs(){var e=F.p;return e!==0?e:(e=window.event,e===void 0?32:A0(e.type))}function Gr(e,n){var a=F.p;try{return F.p=e,n()}finally{F.p=a}}var Bi=Math.random().toString(36).slice(2),ln="__reactFiber$"+Bi,An="__reactProps$"+Bi,Vn="__reactContainer$"+Bi,cr="__reactEvents$"+Bi,$o="__reactListeners$"+Bi,tl="__reactHandles$"+Bi,fr="__reactResources$"+Bi,Da="__reactMarker$"+Bi;function wa(e){delete e[ln],delete e[An],delete e[cr],delete e[$o],delete e[tl]}function $i(e){var n=e[ln];if(n)return n;for(var a=e.parentNode;a;){if(n=a[Vn]||a[ln]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=c0(e);e!==null;){if(a=e[ln])return a;e=c0(e)}return n}e=a,a=e.parentNode}return null}function ta(e){if(e=e[ln]||e[Vn]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function hr(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(r(33))}function Ua(e){var n=e[fr];return n||(n=e[fr]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function un(e){e[Da]=!0}var el=new Set,Ws={};function T(e,n){H(e,n),H(e+"Capture",n)}function H(e,n){for(Ws[e]=n,e=0;e<n.length;e++)el.add(n[e])}var ct=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),$={},tt={};function Pt(e){return tn.call(tt,e)?!0:tn.call($,e)?!1:ct.test(e)?tt[e]=!0:($[e]=!0,!1)}function Vt(e,n,a){if(Pt(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function Lt(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function zt(e,n,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+o)}}function Ft(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function oe(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function pe(e,n,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,f=o.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return u.call(this)},set:function(g){a=""+g,f.call(this,g)}}),Object.defineProperty(e,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(g){a=""+g},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function qt(e){if(!e._valueTracker){var n=oe(e)?"checked":"value";e._valueTracker=pe(e,n,""+e[n])}}function Te(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return e&&(o=oe(e)?e.checked?"true":"false":e.value),e=o,e!==a?(n.setValue(e),!0):!1}function Ze(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var qe=/[\n"\\]/g;function fe(e){return e.replace(qe,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function cn(e,n,a,o,u,f,g,A){e.name="",g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"?e.type=g:e.removeAttribute("type"),n!=null?g==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+Ft(n)):e.value!==""+Ft(n)&&(e.value=""+Ft(n)):g!=="submit"&&g!=="reset"||e.removeAttribute("value"),n!=null?_n(e,g,Ft(n)):a!=null?_n(e,g,Ft(a)):o!=null&&e.removeAttribute("value"),u==null&&f!=null&&(e.defaultChecked=!!f),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),A!=null&&typeof A!="function"&&typeof A!="symbol"&&typeof A!="boolean"?e.name=""+Ft(A):e.removeAttribute("name")}function kt(e,n,a,o,u,f,g,A){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){qt(e);return}a=a!=null?""+Ft(a):"",n=n!=null?""+Ft(n):a,A||n===e.value||(e.value=n),e.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=A?e.checked:!!o,e.defaultChecked=!!o,g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"&&(e.name=g),qt(e)}function _n(e,n,a){n==="number"&&Ze(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function he(e,n,a,o){if(e=e.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=n.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&o&&(e[a].defaultSelected=!0)}else{for(a=""+Ft(a),n=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}n!==null||e[u].disabled||(n=e[u])}n!==null&&(n.selected=!0)}}function In(e,n,a){if(n!=null&&(n=""+Ft(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+Ft(a):""}function $n(e,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(r(92));if(j(o)){if(1<o.length)throw Error(r(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=Ft(n),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),qt(e)}function Bn(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var La=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function we(e,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,a):typeof a!="number"||a===0||La.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function Je(e,n,a){if(n!=null&&typeof n!="object")throw Error(r(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&we(e,u,o)}else for(var f in n)n.hasOwnProperty(f)&&we(e,f,n[f])}function hi(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var He=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),zi=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ai(e){return zi.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function di(){}var tc=null;function ec(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Vr=null,kr=null;function ep(e){var n=ta(e);if(n&&(e=n.stateNode)){var a=e[An]||null;t:switch(e=n.stateNode,n.type){case"input":if(cn(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+fe(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==e&&o.form===e.form){var u=o[An]||null;if(!u)throw Error(r(90));cn(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===e.form&&Te(o)}break t;case"textarea":In(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&he(e,!!a.multiple,n,!1)}}}var nc=!1;function np(e,n,a){if(nc)return e(n,a);nc=!0;try{var o=e(n);return o}finally{if(nc=!1,(Vr!==null||kr!==null)&&(Vl(),Vr&&(n=Vr,e=kr,kr=Vr=null,ep(n),e)))for(n=0;n<e.length;n++)ep(e[n])}}function qs(e,n){var a=e.stateNode;if(a===null)return null;var o=a[An]||null;if(o===null)return null;a=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(r(231,n,typeof a));return a}var ea=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ic=!1;if(ea)try{var Ys={};Object.defineProperty(Ys,"passive",{get:function(){ic=!0}}),window.addEventListener("test",Ys,Ys),window.removeEventListener("test",Ys,Ys)}catch{ic=!1}var Na=null,ac=null,nl=null;function ip(){if(nl)return nl;var e,n=ac,a=n.length,o,u="value"in Na?Na.value:Na.textContent,f=u.length;for(e=0;e<a&&n[e]===u[e];e++);var g=a-e;for(o=1;o<=g&&n[a-o]===u[f-o];o++);return nl=u.slice(e,1<o?1-o:void 0)}function il(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function al(){return!0}function ap(){return!1}function kn(e){function n(a,o,u,f,g){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=f,this.target=g,this.currentTarget=null;for(var A in e)e.hasOwnProperty(A)&&(a=e[A],this[A]=a?a(f):f[A]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?al:ap,this.isPropagationStopped=ap,this}return v(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=al)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=al)},persist:function(){},isPersistent:al}),n}var dr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},rl=kn(dr),Zs=v({},dr,{view:0,detail:0}),Lv=kn(Zs),rc,sc,Ks,sl=v({},Zs,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:lc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ks&&(Ks&&e.type==="mousemove"?(rc=e.screenX-Ks.screenX,sc=e.screenY-Ks.screenY):sc=rc=0,Ks=e),rc)},movementY:function(e){return"movementY"in e?e.movementY:sc}}),rp=kn(sl),Nv=v({},sl,{dataTransfer:0}),Ov=kn(Nv),Pv=v({},Zs,{relatedTarget:0}),oc=kn(Pv),Iv=v({},dr,{animationName:0,elapsedTime:0,pseudoElement:0}),Bv=kn(Iv),zv=v({},dr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Fv=kn(zv),Hv=v({},dr,{data:0}),sp=kn(Hv),Gv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Vv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},kv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Xv(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=kv[e])?!!n[e]:!1}function lc(){return Xv}var Wv=v({},Zs,{key:function(e){if(e.key){var n=Gv[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=il(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Vv[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:lc,charCode:function(e){return e.type==="keypress"?il(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?il(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),qv=kn(Wv),Yv=v({},sl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),op=kn(Yv),Zv=v({},Zs,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:lc}),Kv=kn(Zv),Qv=v({},dr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Jv=kn(Qv),jv=v({},sl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),$v=kn(jv),tS=v({},dr,{newState:0,oldState:0}),eS=kn(tS),nS=[9,13,27,32],uc=ea&&"CompositionEvent"in window,Qs=null;ea&&"documentMode"in document&&(Qs=document.documentMode);var iS=ea&&"TextEvent"in window&&!Qs,lp=ea&&(!uc||Qs&&8<Qs&&11>=Qs),up=" ",cp=!1;function fp(e,n){switch(e){case"keyup":return nS.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function hp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Xr=!1;function aS(e,n){switch(e){case"compositionend":return hp(n);case"keypress":return n.which!==32?null:(cp=!0,up);case"textInput":return e=n.data,e===up&&cp?null:e;default:return null}}function rS(e,n){if(Xr)return e==="compositionend"||!uc&&fp(e,n)?(e=ip(),nl=ac=Na=null,Xr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return lp&&n.locale!=="ko"?null:n.data;default:return null}}var sS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function dp(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!sS[e.type]:n==="textarea"}function pp(e,n,a,o){Vr?kr?kr.push(o):kr=[o]:Vr=o,n=Kl(n,"onChange"),0<n.length&&(a=new rl("onChange","change",null,a,o),e.push({event:a,listeners:n}))}var Js=null,js=null;function oS(e){Qg(e,0)}function ol(e){var n=hr(e);if(Te(n))return e}function mp(e,n){if(e==="change")return n}var gp=!1;if(ea){var cc;if(ea){var fc="oninput"in document;if(!fc){var _p=document.createElement("div");_p.setAttribute("oninput","return;"),fc=typeof _p.oninput=="function"}cc=fc}else cc=!1;gp=cc&&(!document.documentMode||9<document.documentMode)}function vp(){Js&&(Js.detachEvent("onpropertychange",Sp),js=Js=null)}function Sp(e){if(e.propertyName==="value"&&ol(js)){var n=[];pp(n,js,e,ec(e)),np(oS,n)}}function lS(e,n,a){e==="focusin"?(vp(),Js=n,js=a,Js.attachEvent("onpropertychange",Sp)):e==="focusout"&&vp()}function uS(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ol(js)}function cS(e,n){if(e==="click")return ol(n)}function fS(e,n){if(e==="input"||e==="change")return ol(n)}function hS(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var ti=typeof Object.is=="function"?Object.is:hS;function $s(e,n){if(ti(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!tn.call(n,u)||!ti(e[u],n[u]))return!1}return!0}function xp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function yp(e,n){var a=xp(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=n&&o>=n)return{node:a,offset:n-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=xp(a)}}function Mp(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Mp(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Ep(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=Ze(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=Ze(e.document)}return n}function hc(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var dS=ea&&"documentMode"in document&&11>=document.documentMode,Wr=null,dc=null,to=null,pc=!1;function bp(e,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;pc||Wr==null||Wr!==Ze(o)||(o=Wr,"selectionStart"in o&&hc(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),to&&$s(to,o)||(to=o,o=Kl(dc,"onSelect"),0<o.length&&(n=new rl("onSelect","select",null,n,a),e.push({event:n,listeners:o}),n.target=Wr)))}function pr(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var qr={animationend:pr("Animation","AnimationEnd"),animationiteration:pr("Animation","AnimationIteration"),animationstart:pr("Animation","AnimationStart"),transitionrun:pr("Transition","TransitionRun"),transitionstart:pr("Transition","TransitionStart"),transitioncancel:pr("Transition","TransitionCancel"),transitionend:pr("Transition","TransitionEnd")},mc={},Tp={};ea&&(Tp=document.createElement("div").style,"AnimationEvent"in window||(delete qr.animationend.animation,delete qr.animationiteration.animation,delete qr.animationstart.animation),"TransitionEvent"in window||delete qr.transitionend.transition);function mr(e){if(mc[e])return mc[e];if(!qr[e])return e;var n=qr[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in Tp)return mc[e]=n[a];return e}var Ap=mr("animationend"),Rp=mr("animationiteration"),Cp=mr("animationstart"),pS=mr("transitionrun"),mS=mr("transitionstart"),gS=mr("transitioncancel"),Dp=mr("transitionend"),wp=new Map,gc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");gc.push("scrollEnd");function Ri(e,n){wp.set(e,n),T(n,[e])}var ll=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},pi=[],Yr=0,_c=0;function ul(){for(var e=Yr,n=_c=Yr=0;n<e;){var a=pi[n];pi[n++]=null;var o=pi[n];pi[n++]=null;var u=pi[n];pi[n++]=null;var f=pi[n];if(pi[n++]=null,o!==null&&u!==null){var g=o.pending;g===null?u.next=u:(u.next=g.next,g.next=u),o.pending=u}f!==0&&Up(a,u,f)}}function cl(e,n,a,o){pi[Yr++]=e,pi[Yr++]=n,pi[Yr++]=a,pi[Yr++]=o,_c|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function vc(e,n,a,o){return cl(e,n,a,o),fl(e)}function gr(e,n){return cl(e,null,null,n),fl(e)}function Up(e,n,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var u=!1,f=e.return;f!==null;)f.childLanes|=a,o=f.alternate,o!==null&&(o.childLanes|=a),f.tag===22&&(e=f.stateNode,e===null||e._visibility&1||(u=!0)),e=f,f=f.return;return e.tag===3?(f=e.stateNode,u&&n!==null&&(u=31-Gt(a),e=f.hiddenUpdates,o=e[u],o===null?e[u]=[n]:o.push(n),n.lane=a|536870912),f):null}function fl(e){if(50<Eo)throw Eo=0,Cf=null,Error(r(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Zr={};function _S(e,n,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ei(e,n,a,o){return new _S(e,n,a,o)}function Sc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function na(e,n){var a=e.alternate;return a===null?(a=ei(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Lp(e,n){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function hl(e,n,a,o,u,f){var g=0;if(o=e,typeof e=="function")Sc(e)&&(g=1);else if(typeof e=="string")g=Mx(e,a,Et.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case P:return e=ei(31,a,n,u),e.elementType=P,e.lanes=f,e;case O:return _r(a.children,u,f,n);case M:g=8,u|=24;break;case S:return e=ei(12,a,n,u|2),e.elementType=S,e.lanes=f,e;case C:return e=ei(13,a,n,u),e.elementType=C,e.lanes=f,e;case D:return e=ei(19,a,n,u),e.elementType=D,e.lanes=f,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case k:g=10;break t;case B:g=9;break t;case U:g=11;break t;case L:g=14;break t;case b:g=16,o=null;break t}g=29,a=Error(r(130,e===null?"null":typeof e,"")),o=null}return n=ei(g,a,n,u),n.elementType=e,n.type=o,n.lanes=f,n}function _r(e,n,a,o){return e=ei(7,e,o,n),e.lanes=a,e}function xc(e,n,a){return e=ei(6,e,null,n),e.lanes=a,e}function Np(e){var n=ei(18,null,null,0);return n.stateNode=e,n}function yc(e,n,a){return n=ei(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var Op=new WeakMap;function mi(e,n){if(typeof e=="object"&&e!==null){var a=Op.get(e);return a!==void 0?a:(n={value:e,source:n,stack:Xe(n)},Op.set(e,n),n)}return{value:e,source:n,stack:Xe(n)}}var Kr=[],Qr=0,dl=null,eo=0,gi=[],_i=0,Oa=null,Fi=1,Hi="";function ia(e,n){Kr[Qr++]=eo,Kr[Qr++]=dl,dl=e,eo=n}function Pp(e,n,a){gi[_i++]=Fi,gi[_i++]=Hi,gi[_i++]=Oa,Oa=e;var o=Fi;e=Hi;var u=32-Gt(o)-1;o&=~(1<<u),a+=1;var f=32-Gt(n)+u;if(30<f){var g=u-u%5;f=(o&(1<<g)-1).toString(32),o>>=g,u-=g,Fi=1<<32-Gt(n)+u|a<<u|o,Hi=f+e}else Fi=1<<f|a<<u|o,Hi=e}function Mc(e){e.return!==null&&(ia(e,1),Pp(e,1,0))}function Ec(e){for(;e===dl;)dl=Kr[--Qr],Kr[Qr]=null,eo=Kr[--Qr],Kr[Qr]=null;for(;e===Oa;)Oa=gi[--_i],gi[_i]=null,Hi=gi[--_i],gi[_i]=null,Fi=gi[--_i],gi[_i]=null}function Ip(e,n){gi[_i++]=Fi,gi[_i++]=Hi,gi[_i++]=Oa,Fi=n.id,Hi=n.overflow,Oa=e}var Rn=null,Ke=null,Me=!1,Pa=null,vi=!1,bc=Error(r(519));function Ia(e){var n=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw no(mi(n,e)),bc}function Bp(e){var n=e.stateNode,a=e.type,o=e.memoizedProps;switch(n[ln]=e,n[An]=o,a){case"dialog":_e("cancel",n),_e("close",n);break;case"iframe":case"object":case"embed":_e("load",n);break;case"video":case"audio":for(a=0;a<To.length;a++)_e(To[a],n);break;case"source":_e("error",n);break;case"img":case"image":case"link":_e("error",n),_e("load",n);break;case"details":_e("toggle",n);break;case"input":_e("invalid",n),kt(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":_e("invalid",n);break;case"textarea":_e("invalid",n),$n(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||t0(n.textContent,a)?(o.popover!=null&&(_e("beforetoggle",n),_e("toggle",n)),o.onScroll!=null&&_e("scroll",n),o.onScrollEnd!=null&&_e("scrollend",n),o.onClick!=null&&(n.onclick=di),n=!0):n=!1,n||Ia(e,!0)}function zp(e){for(Rn=e.return;Rn;)switch(Rn.tag){case 5:case 31:case 13:vi=!1;return;case 27:case 3:vi=!0;return;default:Rn=Rn.return}}function Jr(e){if(e!==Rn)return!1;if(!Me)return zp(e),Me=!0,!1;var n=e.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||kf(e.type,e.memoizedProps)),a=!a),a&&Ke&&Ia(e),zp(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(317));Ke=u0(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(317));Ke=u0(e)}else n===27?(n=Ke,Qa(e.type)?(e=Zf,Zf=null,Ke=e):Ke=n):Ke=Rn?xi(e.stateNode.nextSibling):null;return!0}function vr(){Ke=Rn=null,Me=!1}function Tc(){var e=Pa;return e!==null&&(Yn===null?Yn=e:Yn.push.apply(Yn,e),Pa=null),e}function no(e){Pa===null?Pa=[e]:Pa.push(e)}var Ac=w(null),Sr=null,aa=null;function Ba(e,n,a){gt(Ac,n._currentValue),n._currentValue=a}function ra(e){e._currentValue=Ac.current,J(Ac)}function Rc(e,n,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===a)break;e=e.return}}function Cc(e,n,a,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var f=u.dependencies;if(f!==null){var g=u.child;f=f.firstContext;t:for(;f!==null;){var A=f;f=u;for(var z=0;z<n.length;z++)if(A.context===n[z]){f.lanes|=a,A=f.alternate,A!==null&&(A.lanes|=a),Rc(f.return,a,e),o||(g=null);break t}f=A.next}}else if(u.tag===18){if(g=u.return,g===null)throw Error(r(341));g.lanes|=a,f=g.alternate,f!==null&&(f.lanes|=a),Rc(g,a,e),g=null}else g=u.child;if(g!==null)g.return=u;else for(g=u;g!==null;){if(g===e){g=null;break}if(u=g.sibling,u!==null){u.return=g.return,g=u;break}g=g.return}u=g}}function jr(e,n,a,o){e=null;for(var u=n,f=!1;u!==null;){if(!f){if((u.flags&524288)!==0)f=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var g=u.alternate;if(g===null)throw Error(r(387));if(g=g.memoizedProps,g!==null){var A=u.type;ti(u.pendingProps.value,g.value)||(e!==null?e.push(A):e=[A])}}else if(u===it.current){if(g=u.alternate,g===null)throw Error(r(387));g.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(wo):e=[wo])}u=u.return}e!==null&&Cc(n,e,a,o),n.flags|=262144}function pl(e){for(e=e.firstContext;e!==null;){if(!ti(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function xr(e){Sr=e,aa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Cn(e){return Fp(Sr,e)}function ml(e,n){return Sr===null&&xr(e),Fp(e,n)}function Fp(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},aa===null){if(e===null)throw Error(r(308));aa=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else aa=aa.next=n;return a}var vS=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},SS=s.unstable_scheduleCallback,xS=s.unstable_NormalPriority,fn={$$typeof:k,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Dc(){return{controller:new vS,data:new Map,refCount:0}}function io(e){e.refCount--,e.refCount===0&&SS(xS,function(){e.controller.abort()})}var ao=null,wc=0,$r=0,ts=null;function yS(e,n){if(ao===null){var a=ao=[];wc=0,$r=Of(),ts={status:"pending",value:void 0,then:function(o){a.push(o)}}}return wc++,n.then(Hp,Hp),n}function Hp(){if(--wc===0&&ao!==null){ts!==null&&(ts.status="fulfilled");var e=ao;ao=null,$r=0,ts=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function MS(e,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var Gp=I.S;I.S=function(e,n){bg=Ne(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&yS(e,n),Gp!==null&&Gp(e,n)};var yr=w(null);function Uc(){var e=yr.current;return e!==null?e:Ye.pooledCache}function gl(e,n){n===null?gt(yr,yr.current):gt(yr,n.pool)}function Vp(){var e=Uc();return e===null?null:{parent:fn._currentValue,pool:e}}var es=Error(r(460)),Lc=Error(r(474)),_l=Error(r(542)),vl={then:function(){}};function kp(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Xp(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(di,di),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,qp(e),e;default:if(typeof n.status=="string")n.then(di,di);else{if(e=Ye,e!==null&&100<e.shellSuspendCounter)throw Error(r(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,qp(e),e}throw Er=n,es}}function Mr(e){try{var n=e._init;return n(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Er=a,es):a}}var Er=null;function Wp(){if(Er===null)throw Error(r(459));var e=Er;return Er=null,e}function qp(e){if(e===es||e===_l)throw Error(r(483))}var ns=null,ro=0;function Sl(e){var n=ro;return ro+=1,ns===null&&(ns=[]),Xp(ns,e,n)}function so(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function xl(e,n){throw n.$$typeof===_?Error(r(525)):(e=Object.prototype.toString.call(n),Error(r(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function Yp(e){function n(Z,G){if(e){var et=Z.deletions;et===null?(Z.deletions=[G],Z.flags|=16):et.push(G)}}function a(Z,G){if(!e)return null;for(;G!==null;)n(Z,G),G=G.sibling;return null}function o(Z){for(var G=new Map;Z!==null;)Z.key!==null?G.set(Z.key,Z):G.set(Z.index,Z),Z=Z.sibling;return G}function u(Z,G){return Z=na(Z,G),Z.index=0,Z.sibling=null,Z}function f(Z,G,et){return Z.index=et,e?(et=Z.alternate,et!==null?(et=et.index,et<G?(Z.flags|=67108866,G):et):(Z.flags|=67108866,G)):(Z.flags|=1048576,G)}function g(Z){return e&&Z.alternate===null&&(Z.flags|=67108866),Z}function A(Z,G,et,xt){return G===null||G.tag!==6?(G=xc(et,Z.mode,xt),G.return=Z,G):(G=u(G,et),G.return=Z,G)}function z(Z,G,et,xt){var jt=et.type;return jt===O?vt(Z,G,et.props.children,xt,et.key):G!==null&&(G.elementType===jt||typeof jt=="object"&&jt!==null&&jt.$$typeof===b&&Mr(jt)===G.type)?(G=u(G,et.props),so(G,et),G.return=Z,G):(G=hl(et.type,et.key,et.props,null,Z.mode,xt),so(G,et),G.return=Z,G)}function at(Z,G,et,xt){return G===null||G.tag!==4||G.stateNode.containerInfo!==et.containerInfo||G.stateNode.implementation!==et.implementation?(G=yc(et,Z.mode,xt),G.return=Z,G):(G=u(G,et.children||[]),G.return=Z,G)}function vt(Z,G,et,xt,jt){return G===null||G.tag!==7?(G=_r(et,Z.mode,xt,jt),G.return=Z,G):(G=u(G,et),G.return=Z,G)}function yt(Z,G,et){if(typeof G=="string"&&G!==""||typeof G=="number"||typeof G=="bigint")return G=xc(""+G,Z.mode,et),G.return=Z,G;if(typeof G=="object"&&G!==null){switch(G.$$typeof){case E:return et=hl(G.type,G.key,G.props,null,Z.mode,et),so(et,G),et.return=Z,et;case R:return G=yc(G,Z.mode,et),G.return=Z,G;case b:return G=Mr(G),yt(Z,G,et)}if(j(G)||Q(G))return G=_r(G,Z.mode,et,null),G.return=Z,G;if(typeof G.then=="function")return yt(Z,Sl(G),et);if(G.$$typeof===k)return yt(Z,ml(Z,G),et);xl(Z,G)}return null}function ot(Z,G,et,xt){var jt=G!==null?G.key:null;if(typeof et=="string"&&et!==""||typeof et=="number"||typeof et=="bigint")return jt!==null?null:A(Z,G,""+et,xt);if(typeof et=="object"&&et!==null){switch(et.$$typeof){case E:return et.key===jt?z(Z,G,et,xt):null;case R:return et.key===jt?at(Z,G,et,xt):null;case b:return et=Mr(et),ot(Z,G,et,xt)}if(j(et)||Q(et))return jt!==null?null:vt(Z,G,et,xt,null);if(typeof et.then=="function")return ot(Z,G,Sl(et),xt);if(et.$$typeof===k)return ot(Z,G,ml(Z,et),xt);xl(Z,et)}return null}function ft(Z,G,et,xt,jt){if(typeof xt=="string"&&xt!==""||typeof xt=="number"||typeof xt=="bigint")return Z=Z.get(et)||null,A(G,Z,""+xt,jt);if(typeof xt=="object"&&xt!==null){switch(xt.$$typeof){case E:return Z=Z.get(xt.key===null?et:xt.key)||null,z(G,Z,xt,jt);case R:return Z=Z.get(xt.key===null?et:xt.key)||null,at(G,Z,xt,jt);case b:return xt=Mr(xt),ft(Z,G,et,xt,jt)}if(j(xt)||Q(xt))return Z=Z.get(et)||null,vt(G,Z,xt,jt,null);if(typeof xt.then=="function")return ft(Z,G,et,Sl(xt),jt);if(xt.$$typeof===k)return ft(Z,G,et,ml(G,xt),jt);xl(G,xt)}return null}function Yt(Z,G,et,xt){for(var jt=null,Ae=null,Zt=G,ce=G=0,ye=null;Zt!==null&&ce<et.length;ce++){Zt.index>ce?(ye=Zt,Zt=null):ye=Zt.sibling;var Re=ot(Z,Zt,et[ce],xt);if(Re===null){Zt===null&&(Zt=ye);break}e&&Zt&&Re.alternate===null&&n(Z,Zt),G=f(Re,G,ce),Ae===null?jt=Re:Ae.sibling=Re,Ae=Re,Zt=ye}if(ce===et.length)return a(Z,Zt),Me&&ia(Z,ce),jt;if(Zt===null){for(;ce<et.length;ce++)Zt=yt(Z,et[ce],xt),Zt!==null&&(G=f(Zt,G,ce),Ae===null?jt=Zt:Ae.sibling=Zt,Ae=Zt);return Me&&ia(Z,ce),jt}for(Zt=o(Zt);ce<et.length;ce++)ye=ft(Zt,Z,ce,et[ce],xt),ye!==null&&(e&&ye.alternate!==null&&Zt.delete(ye.key===null?ce:ye.key),G=f(ye,G,ce),Ae===null?jt=ye:Ae.sibling=ye,Ae=ye);return e&&Zt.forEach(function(er){return n(Z,er)}),Me&&ia(Z,ce),jt}function $t(Z,G,et,xt){if(et==null)throw Error(r(151));for(var jt=null,Ae=null,Zt=G,ce=G=0,ye=null,Re=et.next();Zt!==null&&!Re.done;ce++,Re=et.next()){Zt.index>ce?(ye=Zt,Zt=null):ye=Zt.sibling;var er=ot(Z,Zt,Re.value,xt);if(er===null){Zt===null&&(Zt=ye);break}e&&Zt&&er.alternate===null&&n(Z,Zt),G=f(er,G,ce),Ae===null?jt=er:Ae.sibling=er,Ae=er,Zt=ye}if(Re.done)return a(Z,Zt),Me&&ia(Z,ce),jt;if(Zt===null){for(;!Re.done;ce++,Re=et.next())Re=yt(Z,Re.value,xt),Re!==null&&(G=f(Re,G,ce),Ae===null?jt=Re:Ae.sibling=Re,Ae=Re);return Me&&ia(Z,ce),jt}for(Zt=o(Zt);!Re.done;ce++,Re=et.next())Re=ft(Zt,Z,ce,Re.value,xt),Re!==null&&(e&&Re.alternate!==null&&Zt.delete(Re.key===null?ce:Re.key),G=f(Re,G,ce),Ae===null?jt=Re:Ae.sibling=Re,Ae=Re);return e&&Zt.forEach(function(Nx){return n(Z,Nx)}),Me&&ia(Z,ce),jt}function ke(Z,G,et,xt){if(typeof et=="object"&&et!==null&&et.type===O&&et.key===null&&(et=et.props.children),typeof et=="object"&&et!==null){switch(et.$$typeof){case E:t:{for(var jt=et.key;G!==null;){if(G.key===jt){if(jt=et.type,jt===O){if(G.tag===7){a(Z,G.sibling),xt=u(G,et.props.children),xt.return=Z,Z=xt;break t}}else if(G.elementType===jt||typeof jt=="object"&&jt!==null&&jt.$$typeof===b&&Mr(jt)===G.type){a(Z,G.sibling),xt=u(G,et.props),so(xt,et),xt.return=Z,Z=xt;break t}a(Z,G);break}else n(Z,G);G=G.sibling}et.type===O?(xt=_r(et.props.children,Z.mode,xt,et.key),xt.return=Z,Z=xt):(xt=hl(et.type,et.key,et.props,null,Z.mode,xt),so(xt,et),xt.return=Z,Z=xt)}return g(Z);case R:t:{for(jt=et.key;G!==null;){if(G.key===jt)if(G.tag===4&&G.stateNode.containerInfo===et.containerInfo&&G.stateNode.implementation===et.implementation){a(Z,G.sibling),xt=u(G,et.children||[]),xt.return=Z,Z=xt;break t}else{a(Z,G);break}else n(Z,G);G=G.sibling}xt=yc(et,Z.mode,xt),xt.return=Z,Z=xt}return g(Z);case b:return et=Mr(et),ke(Z,G,et,xt)}if(j(et))return Yt(Z,G,et,xt);if(Q(et)){if(jt=Q(et),typeof jt!="function")throw Error(r(150));return et=jt.call(et),$t(Z,G,et,xt)}if(typeof et.then=="function")return ke(Z,G,Sl(et),xt);if(et.$$typeof===k)return ke(Z,G,ml(Z,et),xt);xl(Z,et)}return typeof et=="string"&&et!==""||typeof et=="number"||typeof et=="bigint"?(et=""+et,G!==null&&G.tag===6?(a(Z,G.sibling),xt=u(G,et),xt.return=Z,Z=xt):(a(Z,G),xt=xc(et,Z.mode,xt),xt.return=Z,Z=xt),g(Z)):a(Z,G)}return function(Z,G,et,xt){try{ro=0;var jt=ke(Z,G,et,xt);return ns=null,jt}catch(Zt){if(Zt===es||Zt===_l)throw Zt;var Ae=ei(29,Zt,null,Z.mode);return Ae.lanes=xt,Ae.return=Z,Ae}}}var br=Yp(!0),Zp=Yp(!1),za=!1;function Nc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Oc(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Fa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ha(e,n,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Ue&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=fl(e),Up(e,null,a),n}return cl(e,o,n,a),fl(e)}function oo(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,Gn(e,a)}}function Pc(e,n){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var g={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?u=f=g:f=f.next=g,a=a.next}while(a!==null);f===null?u=f=n:f=f.next=n}else u=f=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var Ic=!1;function lo(){if(Ic){var e=ts;if(e!==null)throw e}}function uo(e,n,a,o){Ic=!1;var u=e.updateQueue;za=!1;var f=u.firstBaseUpdate,g=u.lastBaseUpdate,A=u.shared.pending;if(A!==null){u.shared.pending=null;var z=A,at=z.next;z.next=null,g===null?f=at:g.next=at,g=z;var vt=e.alternate;vt!==null&&(vt=vt.updateQueue,A=vt.lastBaseUpdate,A!==g&&(A===null?vt.firstBaseUpdate=at:A.next=at,vt.lastBaseUpdate=z))}if(f!==null){var yt=u.baseState;g=0,vt=at=z=null,A=f;do{var ot=A.lane&-536870913,ft=ot!==A.lane;if(ft?(xe&ot)===ot:(o&ot)===ot){ot!==0&&ot===$r&&(Ic=!0),vt!==null&&(vt=vt.next={lane:0,tag:A.tag,payload:A.payload,callback:null,next:null});t:{var Yt=e,$t=A;ot=n;var ke=a;switch($t.tag){case 1:if(Yt=$t.payload,typeof Yt=="function"){yt=Yt.call(ke,yt,ot);break t}yt=Yt;break t;case 3:Yt.flags=Yt.flags&-65537|128;case 0:if(Yt=$t.payload,ot=typeof Yt=="function"?Yt.call(ke,yt,ot):Yt,ot==null)break t;yt=v({},yt,ot);break t;case 2:za=!0}}ot=A.callback,ot!==null&&(e.flags|=64,ft&&(e.flags|=8192),ft=u.callbacks,ft===null?u.callbacks=[ot]:ft.push(ot))}else ft={lane:ot,tag:A.tag,payload:A.payload,callback:A.callback,next:null},vt===null?(at=vt=ft,z=yt):vt=vt.next=ft,g|=ot;if(A=A.next,A===null){if(A=u.shared.pending,A===null)break;ft=A,A=ft.next,ft.next=null,u.lastBaseUpdate=ft,u.shared.pending=null}}while(!0);vt===null&&(z=yt),u.baseState=z,u.firstBaseUpdate=at,u.lastBaseUpdate=vt,f===null&&(u.shared.lanes=0),Wa|=g,e.lanes=g,e.memoizedState=yt}}function Kp(e,n){if(typeof e!="function")throw Error(r(191,e));e.call(n)}function Qp(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Kp(a[e],n)}var is=w(null),yl=w(0);function Jp(e,n){e=pa,gt(yl,e),gt(is,n),pa=e|n.baseLanes}function Bc(){gt(yl,pa),gt(is,is.current)}function zc(){pa=yl.current,J(is),J(yl)}var ni=w(null),Si=null;function Ga(e){var n=e.alternate;gt(sn,sn.current&1),gt(ni,e),Si===null&&(n===null||is.current!==null||n.memoizedState!==null)&&(Si=e)}function Fc(e){gt(sn,sn.current),gt(ni,e),Si===null&&(Si=e)}function jp(e){e.tag===22?(gt(sn,sn.current),gt(ni,e),Si===null&&(Si=e)):Va()}function Va(){gt(sn,sn.current),gt(ni,ni.current)}function ii(e){J(ni),Si===e&&(Si=null),J(sn)}var sn=w(0);function Ml(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||qf(a)||Yf(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var sa=0,ue=null,Ge=null,hn=null,El=!1,as=!1,Tr=!1,bl=0,co=0,rs=null,ES=0;function nn(){throw Error(r(321))}function Hc(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!ti(e[a],n[a]))return!1;return!0}function Gc(e,n,a,o,u,f){return sa=f,ue=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,I.H=e===null||e.memoizedState===null?Pm:nf,Tr=!1,f=a(o,u),Tr=!1,as&&(f=tm(n,a,o,u)),$p(e),f}function $p(e){I.H=po;var n=Ge!==null&&Ge.next!==null;if(sa=0,hn=Ge=ue=null,El=!1,co=0,rs=null,n)throw Error(r(300));e===null||dn||(e=e.dependencies,e!==null&&pl(e)&&(dn=!0))}function tm(e,n,a,o){ue=e;var u=0;do{if(as&&(rs=null),co=0,as=!1,25<=u)throw Error(r(301));if(u+=1,hn=Ge=null,e.updateQueue!=null){var f=e.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}I.H=Im,f=n(a,o)}while(as);return f}function bS(){var e=I.H,n=e.useState()[0];return n=typeof n.then=="function"?fo(n):n,e=e.useState()[0],(Ge!==null?Ge.memoizedState:null)!==e&&(ue.flags|=1024),n}function Vc(){var e=bl!==0;return bl=0,e}function kc(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function Xc(e){if(El){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}El=!1}sa=0,hn=Ge=ue=null,as=!1,co=bl=0,rs=null}function zn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return hn===null?ue.memoizedState=hn=e:hn=hn.next=e,hn}function on(){if(Ge===null){var e=ue.alternate;e=e!==null?e.memoizedState:null}else e=Ge.next;var n=hn===null?ue.memoizedState:hn.next;if(n!==null)hn=n,Ge=e;else{if(e===null)throw ue.alternate===null?Error(r(467)):Error(r(310));Ge=e,e={memoizedState:Ge.memoizedState,baseState:Ge.baseState,baseQueue:Ge.baseQueue,queue:Ge.queue,next:null},hn===null?ue.memoizedState=hn=e:hn=hn.next=e}return hn}function Tl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function fo(e){var n=co;return co+=1,rs===null&&(rs=[]),e=Xp(rs,e,n),n=ue,(hn===null?n.memoizedState:hn.next)===null&&(n=n.alternate,I.H=n===null||n.memoizedState===null?Pm:nf),e}function Al(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return fo(e);if(e.$$typeof===k)return Cn(e)}throw Error(r(438,String(e)))}function Wc(e){var n=null,a=ue.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=ue.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Tl(),ue.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),o=0;o<e;o++)a[o]=W;return n.index++,a}function oa(e,n){return typeof n=="function"?n(e):n}function Rl(e){var n=on();return qc(n,Ge,e)}function qc(e,n,a){var o=e.queue;if(o===null)throw Error(r(311));o.lastRenderedReducer=a;var u=e.baseQueue,f=o.pending;if(f!==null){if(u!==null){var g=u.next;u.next=f.next,f.next=g}n.baseQueue=u=f,o.pending=null}if(f=e.baseState,u===null)e.memoizedState=f;else{n=u.next;var A=g=null,z=null,at=n,vt=!1;do{var yt=at.lane&-536870913;if(yt!==at.lane?(xe&yt)===yt:(sa&yt)===yt){var ot=at.revertLane;if(ot===0)z!==null&&(z=z.next={lane:0,revertLane:0,gesture:null,action:at.action,hasEagerState:at.hasEagerState,eagerState:at.eagerState,next:null}),yt===$r&&(vt=!0);else if((sa&ot)===ot){at=at.next,ot===$r&&(vt=!0);continue}else yt={lane:0,revertLane:at.revertLane,gesture:null,action:at.action,hasEagerState:at.hasEagerState,eagerState:at.eagerState,next:null},z===null?(A=z=yt,g=f):z=z.next=yt,ue.lanes|=ot,Wa|=ot;yt=at.action,Tr&&a(f,yt),f=at.hasEagerState?at.eagerState:a(f,yt)}else ot={lane:yt,revertLane:at.revertLane,gesture:at.gesture,action:at.action,hasEagerState:at.hasEagerState,eagerState:at.eagerState,next:null},z===null?(A=z=ot,g=f):z=z.next=ot,ue.lanes|=yt,Wa|=yt;at=at.next}while(at!==null&&at!==n);if(z===null?g=f:z.next=A,!ti(f,e.memoizedState)&&(dn=!0,vt&&(a=ts,a!==null)))throw a;e.memoizedState=f,e.baseState=g,e.baseQueue=z,o.lastRenderedState=f}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function Yc(e){var n=on(),a=n.queue;if(a===null)throw Error(r(311));a.lastRenderedReducer=e;var o=a.dispatch,u=a.pending,f=n.memoizedState;if(u!==null){a.pending=null;var g=u=u.next;do f=e(f,g.action),g=g.next;while(g!==u);ti(f,n.memoizedState)||(dn=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,o]}function em(e,n,a){var o=ue,u=on(),f=Me;if(f){if(a===void 0)throw Error(r(407));a=a()}else a=n();var g=!ti((Ge||u).memoizedState,a);if(g&&(u.memoizedState=a,dn=!0),u=u.queue,Qc(am.bind(null,o,u,e),[e]),u.getSnapshot!==n||g||hn!==null&&hn.memoizedState.tag&1){if(o.flags|=2048,ss(9,{destroy:void 0},im.bind(null,o,u,a,n),null),Ye===null)throw Error(r(349));f||(sa&127)!==0||nm(o,n,a)}return a}function nm(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=ue.updateQueue,n===null?(n=Tl(),ue.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function im(e,n,a,o){n.value=a,n.getSnapshot=o,rm(n)&&sm(e)}function am(e,n,a){return a(function(){rm(n)&&sm(e)})}function rm(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!ti(e,a)}catch{return!0}}function sm(e){var n=gr(e,2);n!==null&&Zn(n,e,2)}function Zc(e){var n=zn();if(typeof e=="function"){var a=e;if(e=a(),Tr){At(!0);try{a()}finally{At(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:e},n}function om(e,n,a,o){return e.baseState=a,qc(e,Ge,typeof o=="function"?o:oa)}function TS(e,n,a,o,u){if(wl(e))throw Error(r(485));if(e=n.action,e!==null){var f={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(g){f.listeners.push(g)}};I.T!==null?a(!0):f.isTransition=!1,o(f),a=n.pending,a===null?(f.next=n.pending=f,lm(n,f)):(f.next=a.next,n.pending=a.next=f)}}function lm(e,n){var a=n.action,o=n.payload,u=e.state;if(n.isTransition){var f=I.T,g={};I.T=g;try{var A=a(u,o),z=I.S;z!==null&&z(g,A),um(e,n,A)}catch(at){Kc(e,n,at)}finally{f!==null&&g.types!==null&&(f.types=g.types),I.T=f}}else try{f=a(u,o),um(e,n,f)}catch(at){Kc(e,n,at)}}function um(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){cm(e,n,o)},function(o){return Kc(e,n,o)}):cm(e,n,a)}function cm(e,n,a){n.status="fulfilled",n.value=a,fm(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,lm(e,a)))}function Kc(e,n,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,fm(n),n=n.next;while(n!==o)}e.action=null}function fm(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function hm(e,n){return n}function dm(e,n){if(Me){var a=Ye.formState;if(a!==null){t:{var o=ue;if(Me){if(Ke){e:{for(var u=Ke,f=vi;u.nodeType!==8;){if(!f){u=null;break e}if(u=xi(u.nextSibling),u===null){u=null;break e}}f=u.data,u=f==="F!"||f==="F"?u:null}if(u){Ke=xi(u.nextSibling),o=u.data==="F!";break t}}Ia(o)}o=!1}o&&(n=a[0])}}return a=zn(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:hm,lastRenderedState:n},a.queue=o,a=Lm.bind(null,ue,o),o.dispatch=a,o=Zc(!1),f=ef.bind(null,ue,!1,o.queue),o=zn(),u={state:n,dispatch:null,action:e,pending:null},o.queue=u,a=TS.bind(null,ue,u,f,a),u.dispatch=a,o.memoizedState=e,[n,a,!1]}function pm(e){var n=on();return mm(n,Ge,e)}function mm(e,n,a){if(n=qc(e,n,hm)[0],e=Rl(oa)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=fo(n)}catch(g){throw g===es?_l:g}else o=n;n=on();var u=n.queue,f=u.dispatch;return a!==n.memoizedState&&(ue.flags|=2048,ss(9,{destroy:void 0},AS.bind(null,u,a),null)),[o,f,e]}function AS(e,n){e.action=n}function gm(e){var n=on(),a=Ge;if(a!==null)return mm(n,a,e);on(),n=n.memoizedState,a=on();var o=a.queue.dispatch;return a.memoizedState=e,[n,o,!1]}function ss(e,n,a,o){return e={tag:e,create:a,deps:o,inst:n,next:null},n=ue.updateQueue,n===null&&(n=Tl(),ue.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,n.lastEffect=e),e}function _m(){return on().memoizedState}function Cl(e,n,a,o){var u=zn();ue.flags|=e,u.memoizedState=ss(1|n,{destroy:void 0},a,o===void 0?null:o)}function Dl(e,n,a,o){var u=on();o=o===void 0?null:o;var f=u.memoizedState.inst;Ge!==null&&o!==null&&Hc(o,Ge.memoizedState.deps)?u.memoizedState=ss(n,f,a,o):(ue.flags|=e,u.memoizedState=ss(1|n,f,a,o))}function vm(e,n){Cl(8390656,8,e,n)}function Qc(e,n){Dl(2048,8,e,n)}function RS(e){ue.flags|=4;var n=ue.updateQueue;if(n===null)n=Tl(),ue.updateQueue=n,n.events=[e];else{var a=n.events;a===null?n.events=[e]:a.push(e)}}function Sm(e){var n=on().memoizedState;return RS({ref:n,nextImpl:e}),function(){if((Ue&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}function xm(e,n){return Dl(4,2,e,n)}function ym(e,n){return Dl(4,4,e,n)}function Mm(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Em(e,n,a){a=a!=null?a.concat([e]):null,Dl(4,4,Mm.bind(null,n,e),a)}function Jc(){}function bm(e,n){var a=on();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&Hc(n,o[1])?o[0]:(a.memoizedState=[e,n],e)}function Tm(e,n){var a=on();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&Hc(n,o[1]))return o[0];if(o=e(),Tr){At(!0);try{e()}finally{At(!1)}}return a.memoizedState=[o,n],o}function jc(e,n,a){return a===void 0||(sa&1073741824)!==0&&(xe&261930)===0?e.memoizedState=n:(e.memoizedState=a,e=Ag(),ue.lanes|=e,Wa|=e,a)}function Am(e,n,a,o){return ti(a,n)?a:is.current!==null?(e=jc(e,a,o),ti(e,n)||(dn=!0),e):(sa&42)===0||(sa&1073741824)!==0&&(xe&261930)===0?(dn=!0,e.memoizedState=a):(e=Ag(),ue.lanes|=e,Wa|=e,n)}function Rm(e,n,a,o,u){var f=F.p;F.p=f!==0&&8>f?f:8;var g=I.T,A={};I.T=A,ef(e,!1,n,a);try{var z=u(),at=I.S;if(at!==null&&at(A,z),z!==null&&typeof z=="object"&&typeof z.then=="function"){var vt=MS(z,o);ho(e,n,vt,si(e))}else ho(e,n,o,si(e))}catch(yt){ho(e,n,{then:function(){},status:"rejected",reason:yt},si())}finally{F.p=f,g!==null&&A.types!==null&&(g.types=A.types),I.T=g}}function CS(){}function $c(e,n,a,o){if(e.tag!==5)throw Error(r(476));var u=Cm(e).queue;Rm(e,u,n,ut,a===null?CS:function(){return Dm(e),a(o)})}function Cm(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:ut,baseState:ut,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:ut},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function Dm(e){var n=Cm(e);n.next===null&&(n=e.alternate.memoizedState),ho(e,n.next.queue,{},si())}function tf(){return Cn(wo)}function wm(){return on().memoizedState}function Um(){return on().memoizedState}function DS(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=si();e=Fa(a);var o=Ha(n,e,a);o!==null&&(Zn(o,n,a),oo(o,n,a)),n={cache:Dc()},e.payload=n;return}n=n.return}}function wS(e,n,a){var o=si();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},wl(e)?Nm(n,a):(a=vc(e,n,a,o),a!==null&&(Zn(a,e,o),Om(a,n,o)))}function Lm(e,n,a){var o=si();ho(e,n,a,o)}function ho(e,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(wl(e))Nm(n,u);else{var f=e.alternate;if(e.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var g=n.lastRenderedState,A=f(g,a);if(u.hasEagerState=!0,u.eagerState=A,ti(A,g))return cl(e,n,u,0),Ye===null&&ul(),!1}catch{}if(a=vc(e,n,u,o),a!==null)return Zn(a,e,o),Om(a,n,o),!0}return!1}function ef(e,n,a,o){if(o={lane:2,revertLane:Of(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},wl(e)){if(n)throw Error(r(479))}else n=vc(e,a,o,2),n!==null&&Zn(n,e,2)}function wl(e){var n=e.alternate;return e===ue||n!==null&&n===ue}function Nm(e,n){as=El=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function Om(e,n,a){if((a&4194048)!==0){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,Gn(e,a)}}var po={readContext:Cn,use:Al,useCallback:nn,useContext:nn,useEffect:nn,useImperativeHandle:nn,useLayoutEffect:nn,useInsertionEffect:nn,useMemo:nn,useReducer:nn,useRef:nn,useState:nn,useDebugValue:nn,useDeferredValue:nn,useTransition:nn,useSyncExternalStore:nn,useId:nn,useHostTransitionStatus:nn,useFormState:nn,useActionState:nn,useOptimistic:nn,useMemoCache:nn,useCacheRefresh:nn};po.useEffectEvent=nn;var Pm={readContext:Cn,use:Al,useCallback:function(e,n){return zn().memoizedState=[e,n===void 0?null:n],e},useContext:Cn,useEffect:vm,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,Cl(4194308,4,Mm.bind(null,n,e),a)},useLayoutEffect:function(e,n){return Cl(4194308,4,e,n)},useInsertionEffect:function(e,n){Cl(4,2,e,n)},useMemo:function(e,n){var a=zn();n=n===void 0?null:n;var o=e();if(Tr){At(!0);try{e()}finally{At(!1)}}return a.memoizedState=[o,n],o},useReducer:function(e,n,a){var o=zn();if(a!==void 0){var u=a(n);if(Tr){At(!0);try{a(n)}finally{At(!1)}}}else u=n;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=wS.bind(null,ue,e),[o.memoizedState,e]},useRef:function(e){var n=zn();return e={current:e},n.memoizedState=e},useState:function(e){e=Zc(e);var n=e.queue,a=Lm.bind(null,ue,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:Jc,useDeferredValue:function(e,n){var a=zn();return jc(a,e,n)},useTransition:function(){var e=Zc(!1);return e=Rm.bind(null,ue,e.queue,!0,!1),zn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var o=ue,u=zn();if(Me){if(a===void 0)throw Error(r(407));a=a()}else{if(a=n(),Ye===null)throw Error(r(349));(xe&127)!==0||nm(o,n,a)}u.memoizedState=a;var f={value:a,getSnapshot:n};return u.queue=f,vm(am.bind(null,o,f,e),[e]),o.flags|=2048,ss(9,{destroy:void 0},im.bind(null,o,f,a,n),null),a},useId:function(){var e=zn(),n=Ye.identifierPrefix;if(Me){var a=Hi,o=Fi;a=(o&~(1<<32-Gt(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=bl++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=ES++,n="_"+n+"r_"+a.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:tf,useFormState:dm,useActionState:dm,useOptimistic:function(e){var n=zn();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=ef.bind(null,ue,!0,a),a.dispatch=n,[e,n]},useMemoCache:Wc,useCacheRefresh:function(){return zn().memoizedState=DS.bind(null,ue)},useEffectEvent:function(e){var n=zn(),a={impl:e};return n.memoizedState=a,function(){if((Ue&2)!==0)throw Error(r(440));return a.impl.apply(void 0,arguments)}}},nf={readContext:Cn,use:Al,useCallback:bm,useContext:Cn,useEffect:Qc,useImperativeHandle:Em,useInsertionEffect:xm,useLayoutEffect:ym,useMemo:Tm,useReducer:Rl,useRef:_m,useState:function(){return Rl(oa)},useDebugValue:Jc,useDeferredValue:function(e,n){var a=on();return Am(a,Ge.memoizedState,e,n)},useTransition:function(){var e=Rl(oa)[0],n=on().memoizedState;return[typeof e=="boolean"?e:fo(e),n]},useSyncExternalStore:em,useId:wm,useHostTransitionStatus:tf,useFormState:pm,useActionState:pm,useOptimistic:function(e,n){var a=on();return om(a,Ge,e,n)},useMemoCache:Wc,useCacheRefresh:Um};nf.useEffectEvent=Sm;var Im={readContext:Cn,use:Al,useCallback:bm,useContext:Cn,useEffect:Qc,useImperativeHandle:Em,useInsertionEffect:xm,useLayoutEffect:ym,useMemo:Tm,useReducer:Yc,useRef:_m,useState:function(){return Yc(oa)},useDebugValue:Jc,useDeferredValue:function(e,n){var a=on();return Ge===null?jc(a,e,n):Am(a,Ge.memoizedState,e,n)},useTransition:function(){var e=Yc(oa)[0],n=on().memoizedState;return[typeof e=="boolean"?e:fo(e),n]},useSyncExternalStore:em,useId:wm,useHostTransitionStatus:tf,useFormState:gm,useActionState:gm,useOptimistic:function(e,n){var a=on();return Ge!==null?om(a,Ge,e,n):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:Wc,useCacheRefresh:Um};Im.useEffectEvent=Sm;function af(e,n,a,o){n=e.memoizedState,a=a(o,n),a=a==null?n:v({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var rf={enqueueSetState:function(e,n,a){e=e._reactInternals;var o=si(),u=Fa(o);u.payload=n,a!=null&&(u.callback=a),n=Ha(e,u,o),n!==null&&(Zn(n,e,o),oo(n,e,o))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var o=si(),u=Fa(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Ha(e,u,o),n!==null&&(Zn(n,e,o),oo(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=si(),o=Fa(a);o.tag=2,n!=null&&(o.callback=n),n=Ha(e,o,a),n!==null&&(Zn(n,e,a),oo(n,e,a))}};function Bm(e,n,a,o,u,f,g){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,f,g):n.prototype&&n.prototype.isPureReactComponent?!$s(a,o)||!$s(u,f):!0}function zm(e,n,a,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==e&&rf.enqueueReplaceState(n,n.state,null)}function Ar(e,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(e=e.defaultProps){a===n&&(a=v({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}function Fm(e){ll(e)}function Hm(e){console.error(e)}function Gm(e){ll(e)}function Ul(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function Vm(e,n,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function sf(e,n,a){return a=Fa(a),a.tag=3,a.payload={element:null},a.callback=function(){Ul(e,n)},a}function km(e){return e=Fa(e),e.tag=3,e}function Xm(e,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var f=o.value;e.payload=function(){return u(f)},e.callback=function(){Vm(n,a,o)}}var g=a.stateNode;g!==null&&typeof g.componentDidCatch=="function"&&(e.callback=function(){Vm(n,a,o),typeof u!="function"&&(qa===null?qa=new Set([this]):qa.add(this));var A=o.stack;this.componentDidCatch(o.value,{componentStack:A!==null?A:""})})}function US(e,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&jr(n,a,u,!0),a=ni.current,a!==null){switch(a.tag){case 31:case 13:return Si===null?kl():a.alternate===null&&an===0&&(an=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===vl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),Uf(e,o,u)),!1;case 22:return a.flags|=65536,o===vl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),Uf(e,o,u)),!1}throw Error(r(435,a.tag))}return Uf(e,o,u),kl(),!1}if(Me)return n=ni.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==bc&&(e=Error(r(422),{cause:o}),no(mi(e,a)))):(o!==bc&&(n=Error(r(423),{cause:o}),no(mi(n,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=mi(o,a),u=sf(e.stateNode,o,u),Pc(e,u),an!==4&&(an=2)),!1;var f=Error(r(520),{cause:o});if(f=mi(f,a),Mo===null?Mo=[f]:Mo.push(f),an!==4&&(an=2),n===null)return!0;o=mi(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=sf(a.stateNode,o,e),Pc(a,e),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(qa===null||!qa.has(f))))return a.flags|=65536,u&=-u,a.lanes|=u,u=km(u),Xm(u,e,a,o),Pc(a,u),!1}a=a.return}while(a!==null);return!1}var of=Error(r(461)),dn=!1;function Dn(e,n,a,o){n.child=e===null?Zp(n,null,a,o):br(n,e.child,a,o)}function Wm(e,n,a,o,u){a=a.render;var f=n.ref;if("ref"in o){var g={};for(var A in o)A!=="ref"&&(g[A]=o[A])}else g=o;return xr(n),o=Gc(e,n,a,g,f,u),A=Vc(),e!==null&&!dn?(kc(e,n,u),la(e,n,u)):(Me&&A&&Mc(n),n.flags|=1,Dn(e,n,o,u),n.child)}function qm(e,n,a,o,u){if(e===null){var f=a.type;return typeof f=="function"&&!Sc(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,Ym(e,n,f,o,u)):(e=hl(a.type,null,o,n,n.mode,u),e.ref=n.ref,e.return=n,n.child=e)}if(f=e.child,!mf(e,u)){var g=f.memoizedProps;if(a=a.compare,a=a!==null?a:$s,a(g,o)&&e.ref===n.ref)return la(e,n,u)}return n.flags|=1,e=na(f,o),e.ref=n.ref,e.return=n,n.child=e}function Ym(e,n,a,o,u){if(e!==null){var f=e.memoizedProps;if($s(f,o)&&e.ref===n.ref)if(dn=!1,n.pendingProps=o=f,mf(e,u))(e.flags&131072)!==0&&(dn=!0);else return n.lanes=e.lanes,la(e,n,u)}return lf(e,n,a,o,u)}function Zm(e,n,a,o){var u=o.children,f=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,e!==null){for(o=n.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~f}else o=0,n.child=null;return Km(e,n,f,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&gl(n,f!==null?f.cachePool:null),f!==null?Jp(n,f):Bc(),jp(n);else return o=n.lanes=536870912,Km(e,n,f!==null?f.baseLanes|a:a,a,o)}else f!==null?(gl(n,f.cachePool),Jp(n,f),Va(),n.memoizedState=null):(e!==null&&gl(n,null),Bc(),Va());return Dn(e,n,u,a),n.child}function mo(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function Km(e,n,a,o,u){var f=Uc();return f=f===null?null:{parent:fn._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},e!==null&&gl(n,null),Bc(),jp(n),e!==null&&jr(e,n,o,!0),n.childLanes=u,null}function Ll(e,n){return n=Ol({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function Qm(e,n,a){return br(n,e.child,null,a),e=Ll(n,n.pendingProps),e.flags|=2,ii(n),n.memoizedState=null,e}function LS(e,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Me){if(o.mode==="hidden")return e=Ll(n,o),n.lanes=536870912,mo(null,e);if(Fc(n),(e=Ke)?(e=l0(e,vi),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Oa!==null?{id:Fi,overflow:Hi}:null,retryLane:536870912,hydrationErrors:null},a=Np(e),a.return=n,n.child=a,Rn=n,Ke=null)):e=null,e===null)throw Ia(n);return n.lanes=536870912,null}return Ll(n,o)}var f=e.memoizedState;if(f!==null){var g=f.dehydrated;if(Fc(n),u)if(n.flags&256)n.flags&=-257,n=Qm(e,n,a);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(r(558));else if(dn||jr(e,n,a,!1),u=(a&e.childLanes)!==0,dn||u){if(o=Ye,o!==null&&(g=jn(o,a),g!==0&&g!==f.retryLane))throw f.retryLane=g,gr(e,g),Zn(o,e,g),of;kl(),n=Qm(e,n,a)}else e=f.treeContext,Ke=xi(g.nextSibling),Rn=n,Me=!0,Pa=null,vi=!1,e!==null&&Ip(n,e),n=Ll(n,o),n.flags|=4096;return n}return e=na(e.child,{mode:o.mode,children:o.children}),e.ref=n.ref,n.child=e,e.return=n,e}function Nl(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(r(284));(e===null||e.ref!==a)&&(n.flags|=4194816)}}function lf(e,n,a,o,u){return xr(n),a=Gc(e,n,a,o,void 0,u),o=Vc(),e!==null&&!dn?(kc(e,n,u),la(e,n,u)):(Me&&o&&Mc(n),n.flags|=1,Dn(e,n,a,u),n.child)}function Jm(e,n,a,o,u,f){return xr(n),n.updateQueue=null,a=tm(n,o,a,u),$p(e),o=Vc(),e!==null&&!dn?(kc(e,n,f),la(e,n,f)):(Me&&o&&Mc(n),n.flags|=1,Dn(e,n,a,f),n.child)}function jm(e,n,a,o,u){if(xr(n),n.stateNode===null){var f=Zr,g=a.contextType;typeof g=="object"&&g!==null&&(f=Cn(g)),f=new a(o,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=rf,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=o,f.state=n.memoizedState,f.refs={},Nc(n),g=a.contextType,f.context=typeof g=="object"&&g!==null?Cn(g):Zr,f.state=n.memoizedState,g=a.getDerivedStateFromProps,typeof g=="function"&&(af(n,a,g,o),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(g=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),g!==f.state&&rf.enqueueReplaceState(f,f.state,null),uo(n,o,f,u),lo(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){f=n.stateNode;var A=n.memoizedProps,z=Ar(a,A);f.props=z;var at=f.context,vt=a.contextType;g=Zr,typeof vt=="object"&&vt!==null&&(g=Cn(vt));var yt=a.getDerivedStateFromProps;vt=typeof yt=="function"||typeof f.getSnapshotBeforeUpdate=="function",A=n.pendingProps!==A,vt||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(A||at!==g)&&zm(n,f,o,g),za=!1;var ot=n.memoizedState;f.state=ot,uo(n,o,f,u),lo(),at=n.memoizedState,A||ot!==at||za?(typeof yt=="function"&&(af(n,a,yt,o),at=n.memoizedState),(z=za||Bm(n,a,z,o,ot,at,g))?(vt||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=at),f.props=o,f.state=at,f.context=g,o=z):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{f=n.stateNode,Oc(e,n),g=n.memoizedProps,vt=Ar(a,g),f.props=vt,yt=n.pendingProps,ot=f.context,at=a.contextType,z=Zr,typeof at=="object"&&at!==null&&(z=Cn(at)),A=a.getDerivedStateFromProps,(at=typeof A=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(g!==yt||ot!==z)&&zm(n,f,o,z),za=!1,ot=n.memoizedState,f.state=ot,uo(n,o,f,u),lo();var ft=n.memoizedState;g!==yt||ot!==ft||za||e!==null&&e.dependencies!==null&&pl(e.dependencies)?(typeof A=="function"&&(af(n,a,A,o),ft=n.memoizedState),(vt=za||Bm(n,a,vt,o,ot,ft,z)||e!==null&&e.dependencies!==null&&pl(e.dependencies))?(at||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(o,ft,z),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(o,ft,z)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||g===e.memoizedProps&&ot===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||g===e.memoizedProps&&ot===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=ft),f.props=o,f.state=ft,f.context=z,o=vt):(typeof f.componentDidUpdate!="function"||g===e.memoizedProps&&ot===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||g===e.memoizedProps&&ot===e.memoizedState||(n.flags|=1024),o=!1)}return f=o,Nl(e,n),o=(n.flags&128)!==0,f||o?(f=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,e!==null&&o?(n.child=br(n,e.child,null,u),n.child=br(n,null,a,u)):Dn(e,n,a,u),n.memoizedState=f.state,e=n.child):e=la(e,n,u),e}function $m(e,n,a,o){return vr(),n.flags|=256,Dn(e,n,a,o),n.child}var uf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function cf(e){return{baseLanes:e,cachePool:Vp()}}function ff(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=ri),e}function tg(e,n,a){var o=n.pendingProps,u=!1,f=(n.flags&128)!==0,g;if((g=f)||(g=e!==null&&e.memoizedState===null?!1:(sn.current&2)!==0),g&&(u=!0,n.flags&=-129),g=(n.flags&32)!==0,n.flags&=-33,e===null){if(Me){if(u?Ga(n):Va(),(e=Ke)?(e=l0(e,vi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Oa!==null?{id:Fi,overflow:Hi}:null,retryLane:536870912,hydrationErrors:null},a=Np(e),a.return=n,n.child=a,Rn=n,Ke=null)):e=null,e===null)throw Ia(n);return Yf(e)?n.lanes=32:n.lanes=536870912,null}var A=o.children;return o=o.fallback,u?(Va(),u=n.mode,A=Ol({mode:"hidden",children:A},u),o=_r(o,u,a,null),A.return=n,o.return=n,A.sibling=o,n.child=A,o=n.child,o.memoizedState=cf(a),o.childLanes=ff(e,g,a),n.memoizedState=uf,mo(null,o)):(Ga(n),hf(n,A))}var z=e.memoizedState;if(z!==null&&(A=z.dehydrated,A!==null)){if(f)n.flags&256?(Ga(n),n.flags&=-257,n=df(e,n,a)):n.memoizedState!==null?(Va(),n.child=e.child,n.flags|=128,n=null):(Va(),A=o.fallback,u=n.mode,o=Ol({mode:"visible",children:o.children},u),A=_r(A,u,a,null),A.flags|=2,o.return=n,A.return=n,o.sibling=A,n.child=o,br(n,e.child,null,a),o=n.child,o.memoizedState=cf(a),o.childLanes=ff(e,g,a),n.memoizedState=uf,n=mo(null,o));else if(Ga(n),Yf(A)){if(g=A.nextSibling&&A.nextSibling.dataset,g)var at=g.dgst;g=at,o=Error(r(419)),o.stack="",o.digest=g,no({value:o,source:null,stack:null}),n=df(e,n,a)}else if(dn||jr(e,n,a,!1),g=(a&e.childLanes)!==0,dn||g){if(g=Ye,g!==null&&(o=jn(g,a),o!==0&&o!==z.retryLane))throw z.retryLane=o,gr(e,o),Zn(g,e,o),of;qf(A)||kl(),n=df(e,n,a)}else qf(A)?(n.flags|=192,n.child=e.child,n=null):(e=z.treeContext,Ke=xi(A.nextSibling),Rn=n,Me=!0,Pa=null,vi=!1,e!==null&&Ip(n,e),n=hf(n,o.children),n.flags|=4096);return n}return u?(Va(),A=o.fallback,u=n.mode,z=e.child,at=z.sibling,o=na(z,{mode:"hidden",children:o.children}),o.subtreeFlags=z.subtreeFlags&65011712,at!==null?A=na(at,A):(A=_r(A,u,a,null),A.flags|=2),A.return=n,o.return=n,o.sibling=A,n.child=o,mo(null,o),o=n.child,A=e.child.memoizedState,A===null?A=cf(a):(u=A.cachePool,u!==null?(z=fn._currentValue,u=u.parent!==z?{parent:z,pool:z}:u):u=Vp(),A={baseLanes:A.baseLanes|a,cachePool:u}),o.memoizedState=A,o.childLanes=ff(e,g,a),n.memoizedState=uf,mo(e.child,o)):(Ga(n),a=e.child,e=a.sibling,a=na(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,e!==null&&(g=n.deletions,g===null?(n.deletions=[e],n.flags|=16):g.push(e)),n.child=a,n.memoizedState=null,a)}function hf(e,n){return n=Ol({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function Ol(e,n){return e=ei(22,e,null,n),e.lanes=0,e}function df(e,n,a){return br(n,e.child,null,a),e=hf(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function eg(e,n,a){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),Rc(e.return,n,a)}function pf(e,n,a,o,u,f){var g=e.memoizedState;g===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:f}:(g.isBackwards=n,g.rendering=null,g.renderingStartTime=0,g.last=o,g.tail=a,g.tailMode=u,g.treeForkCount=f)}function ng(e,n,a){var o=n.pendingProps,u=o.revealOrder,f=o.tail;o=o.children;var g=sn.current,A=(g&2)!==0;if(A?(g=g&1|2,n.flags|=128):g&=1,gt(sn,g),Dn(e,n,o,a),o=Me?eo:0,!A&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&eg(e,a,n);else if(e.tag===19)eg(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)e=a.alternate,e!==null&&Ml(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),pf(n,!1,u,a,f,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(e=u.alternate,e!==null&&Ml(e)===null){n.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}pf(n,!0,a,null,f,o);break;case"together":pf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function la(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),Wa|=n.lanes,(a&n.childLanes)===0)if(e!==null){if(jr(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(r(153));if(n.child!==null){for(e=n.child,a=na(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=na(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function mf(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&pl(e)))}function NS(e,n,a){switch(n.tag){case 3:_t(n,n.stateNode.containerInfo),Ba(n,fn,e.memoizedState.cache),vr();break;case 27:case 5:te(n);break;case 4:_t(n,n.stateNode.containerInfo);break;case 10:Ba(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Fc(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Ga(n),n.flags|=128,null):(a&n.child.childLanes)!==0?tg(e,n,a):(Ga(n),e=la(e,n,a),e!==null?e.sibling:null);Ga(n);break;case 19:var u=(e.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(jr(e,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return ng(e,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),gt(sn,sn.current),o)break;return null;case 22:return n.lanes=0,Zm(e,n,a,n.pendingProps);case 24:Ba(n,fn,e.memoizedState.cache)}return la(e,n,a)}function ig(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)dn=!0;else{if(!mf(e,a)&&(n.flags&128)===0)return dn=!1,NS(e,n,a);dn=(e.flags&131072)!==0}else dn=!1,Me&&(n.flags&1048576)!==0&&Pp(n,eo,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(e=Mr(n.elementType),n.type=e,typeof e=="function")Sc(e)?(o=Ar(e,o),n.tag=1,n=jm(null,n,e,o,a)):(n.tag=0,n=lf(null,n,e,o,a));else{if(e!=null){var u=e.$$typeof;if(u===U){n.tag=11,n=Wm(null,n,e,o,a);break t}else if(u===L){n.tag=14,n=qm(null,n,e,o,a);break t}}throw n=Y(e)||e,Error(r(306,n,""))}}return n;case 0:return lf(e,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=Ar(o,n.pendingProps),jm(e,n,o,u,a);case 3:t:{if(_t(n,n.stateNode.containerInfo),e===null)throw Error(r(387));o=n.pendingProps;var f=n.memoizedState;u=f.element,Oc(e,n),uo(n,o,null,a);var g=n.memoizedState;if(o=g.cache,Ba(n,fn,o),o!==f.cache&&Cc(n,[fn],a,!0),lo(),o=g.element,f.isDehydrated)if(f={element:o,isDehydrated:!1,cache:g.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=$m(e,n,o,a);break t}else if(o!==u){u=mi(Error(r(424)),n),no(u),n=$m(e,n,o,a);break t}else for(e=n.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,Ke=xi(e.firstChild),Rn=n,Me=!0,Pa=null,vi=!0,a=Zp(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(vr(),o===u){n=la(e,n,a);break t}Dn(e,n,o,a)}n=n.child}return n;case 26:return Nl(e,n),e===null?(a=p0(n.type,null,n.pendingProps,null))?n.memoizedState=a:Me||(a=n.type,e=n.pendingProps,o=Ql(Xt.current).createElement(a),o[ln]=n,o[An]=e,wn(o,a,e),un(o),n.stateNode=o):n.memoizedState=p0(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return te(n),e===null&&Me&&(o=n.stateNode=f0(n.type,n.pendingProps,Xt.current),Rn=n,vi=!0,u=Ke,Qa(n.type)?(Zf=u,Ke=xi(o.firstChild)):Ke=u),Dn(e,n,n.pendingProps.children,a),Nl(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Me&&((u=o=Ke)&&(o=ux(o,n.type,n.pendingProps,vi),o!==null?(n.stateNode=o,Rn=n,Ke=xi(o.firstChild),vi=!1,u=!0):u=!1),u||Ia(n)),te(n),u=n.type,f=n.pendingProps,g=e!==null?e.memoizedProps:null,o=f.children,kf(u,f)?o=null:g!==null&&kf(u,g)&&(n.flags|=32),n.memoizedState!==null&&(u=Gc(e,n,bS,null,null,a),wo._currentValue=u),Nl(e,n),Dn(e,n,o,a),n.child;case 6:return e===null&&Me&&((e=a=Ke)&&(a=cx(a,n.pendingProps,vi),a!==null?(n.stateNode=a,Rn=n,Ke=null,e=!0):e=!1),e||Ia(n)),null;case 13:return tg(e,n,a);case 4:return _t(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=br(n,null,o,a):Dn(e,n,o,a),n.child;case 11:return Wm(e,n,n.type,n.pendingProps,a);case 7:return Dn(e,n,n.pendingProps,a),n.child;case 8:return Dn(e,n,n.pendingProps.children,a),n.child;case 12:return Dn(e,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Ba(n,n.type,o.value),Dn(e,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,xr(n),u=Cn(u),o=o(u),n.flags|=1,Dn(e,n,o,a),n.child;case 14:return qm(e,n,n.type,n.pendingProps,a);case 15:return Ym(e,n,n.type,n.pendingProps,a);case 19:return ng(e,n,a);case 31:return LS(e,n,a);case 22:return Zm(e,n,a,n.pendingProps);case 24:return xr(n),o=Cn(fn),e===null?(u=Uc(),u===null&&(u=Ye,f=Dc(),u.pooledCache=f,f.refCount++,f!==null&&(u.pooledCacheLanes|=a),u=f),n.memoizedState={parent:o,cache:u},Nc(n),Ba(n,fn,u)):((e.lanes&a)!==0&&(Oc(e,n),uo(n,null,null,a),lo()),u=e.memoizedState,f=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Ba(n,fn,o)):(o=f.cache,Ba(n,fn,o),o!==u.cache&&Cc(n,[fn],a,!0))),Dn(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(r(156,n.tag))}function ua(e){e.flags|=4}function gf(e,n,a,o,u){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(wg())e.flags|=8192;else throw Er=vl,Lc}else e.flags&=-16777217}function ag(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!S0(n))if(wg())e.flags|=8192;else throw Er=vl,Lc}function Pl(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?Mt():536870912,e.lanes|=n,cs|=n)}function go(e,n){if(!Me)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Qe(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(n)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=a,n}function OS(e,n,a){var o=n.pendingProps;switch(Ec(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Qe(n),null;case 1:return Qe(n),null;case 3:return a=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),ra(fn),Tt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Jr(n)?ua(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Tc())),Qe(n),null;case 26:var u=n.type,f=n.memoizedState;return e===null?(ua(n),f!==null?(Qe(n),ag(n,f)):(Qe(n),gf(n,u,null,o,a))):f?f!==e.memoizedState?(ua(n),Qe(n),ag(n,f)):(Qe(n),n.flags&=-16777217):(e=e.memoizedProps,e!==o&&ua(n),Qe(n),gf(n,u,e,o,a)),null;case 27:if(Ht(n),a=Xt.current,u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&ua(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return Qe(n),null}e=Et.current,Jr(n)?Bp(n):(e=f0(u,o,a),n.stateNode=e,ua(n))}return Qe(n),null;case 5:if(Ht(n),u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&ua(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return Qe(n),null}if(f=Et.current,Jr(n))Bp(n);else{var g=Ql(Xt.current);switch(f){case 1:f=g.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:f=g.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":f=g.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":f=g.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":f=g.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof o.is=="string"?g.createElement("select",{is:o.is}):g.createElement("select"),o.multiple?f.multiple=!0:o.size&&(f.size=o.size);break;default:f=typeof o.is=="string"?g.createElement(u,{is:o.is}):g.createElement(u)}}f[ln]=n,f[An]=o;t:for(g=n.child;g!==null;){if(g.tag===5||g.tag===6)f.appendChild(g.stateNode);else if(g.tag!==4&&g.tag!==27&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===n)break t;for(;g.sibling===null;){if(g.return===null||g.return===n)break t;g=g.return}g.sibling.return=g.return,g=g.sibling}n.stateNode=f;t:switch(wn(f,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&ua(n)}}return Qe(n),gf(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,a),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&ua(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(r(166));if(e=Xt.current,Jr(n)){if(e=n.stateNode,a=n.memoizedProps,o=null,u=Rn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[ln]=n,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||t0(e.nodeValue,a)),e||Ia(n,!0)}else e=Ql(e).createTextNode(o),e[ln]=n,n.stateNode=e}return Qe(n),null;case 31:if(a=n.memoizedState,e===null||e.memoizedState!==null){if(o=Jr(n),a!==null){if(e===null){if(!o)throw Error(r(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(557));e[ln]=n}else vr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Qe(n),e=!1}else a=Tc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return n.flags&256?(ii(n),n):(ii(n),null);if((n.flags&128)!==0)throw Error(r(558))}return Qe(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=Jr(n),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(r(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(r(317));u[ln]=n}else vr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Qe(n),u=!1}else u=Tc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(ii(n),n):(ii(n),null)}return ii(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),f=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(f=o.memoizedState.cachePool.pool),f!==u&&(o.flags|=2048)),a!==e&&a&&(n.child.flags|=8192),Pl(n,n.updateQueue),Qe(n),null);case 4:return Tt(),e===null&&zf(n.stateNode.containerInfo),Qe(n),null;case 10:return ra(n.type),Qe(n),null;case 19:if(J(sn),o=n.memoizedState,o===null)return Qe(n),null;if(u=(n.flags&128)!==0,f=o.rendering,f===null)if(u)go(o,!1);else{if(an!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(f=Ml(e),f!==null){for(n.flags|=128,go(o,!1),e=f.updateQueue,n.updateQueue=e,Pl(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)Lp(a,e),a=a.sibling;return gt(sn,sn.current&1|2),Me&&ia(n,o.treeForkCount),n.child}e=e.sibling}o.tail!==null&&Ne()>Hl&&(n.flags|=128,u=!0,go(o,!1),n.lanes=4194304)}else{if(!u)if(e=Ml(f),e!==null){if(n.flags|=128,u=!0,e=e.updateQueue,n.updateQueue=e,Pl(n,e),go(o,!0),o.tail===null&&o.tailMode==="hidden"&&!f.alternate&&!Me)return Qe(n),null}else 2*Ne()-o.renderingStartTime>Hl&&a!==536870912&&(n.flags|=128,u=!0,go(o,!1),n.lanes=4194304);o.isBackwards?(f.sibling=n.child,n.child=f):(e=o.last,e!==null?e.sibling=f:n.child=f,o.last=f)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=Ne(),e.sibling=null,a=sn.current,gt(sn,u?a&1|2:a&1),Me&&ia(n,o.treeForkCount),e):(Qe(n),null);case 22:case 23:return ii(n),zc(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(Qe(n),n.subtreeFlags&6&&(n.flags|=8192)):Qe(n),a=n.updateQueue,a!==null&&Pl(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),e!==null&&J(yr),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),ra(fn),Qe(n),null;case 25:return null;case 30:return null}throw Error(r(156,n.tag))}function PS(e,n){switch(Ec(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return ra(fn),Tt(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Ht(n),null;case 31:if(n.memoizedState!==null){if(ii(n),n.alternate===null)throw Error(r(340));vr()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(ii(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(r(340));vr()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return J(sn),null;case 4:return Tt(),null;case 10:return ra(n.type),null;case 22:case 23:return ii(n),zc(),e!==null&&J(yr),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return ra(fn),null;case 25:return null;default:return null}}function rg(e,n){switch(Ec(n),n.tag){case 3:ra(fn),Tt();break;case 26:case 27:case 5:Ht(n);break;case 4:Tt();break;case 31:n.memoizedState!==null&&ii(n);break;case 13:ii(n);break;case 19:J(sn);break;case 10:ra(n.type);break;case 22:case 23:ii(n),zc(),e!==null&&J(yr);break;case 24:ra(fn)}}function _o(e,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&e)===e){o=void 0;var f=a.create,g=a.inst;o=f(),g.destroy=o}a=a.next}while(a!==u)}}catch(A){Ie(n,n.return,A)}}function ka(e,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var f=u.next;o=f;do{if((o.tag&e)===e){var g=o.inst,A=g.destroy;if(A!==void 0){g.destroy=void 0,u=n;var z=a,at=A;try{at()}catch(vt){Ie(u,z,vt)}}}o=o.next}while(o!==f)}}catch(vt){Ie(n,n.return,vt)}}function sg(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{Qp(n,a)}catch(o){Ie(e,e.return,o)}}}function og(e,n,a){a.props=Ar(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){Ie(e,n,o)}}function vo(e,n){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(u){Ie(e,n,u)}}function Gi(e,n){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){Ie(e,n,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Ie(e,n,u)}else a.current=null}function lg(e){var n=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){Ie(e,e.return,u)}}function _f(e,n,a){try{var o=e.stateNode;ix(o,e.type,a,n),o[An]=n}catch(u){Ie(e,e.return,u)}}function ug(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Qa(e.type)||e.tag===4}function vf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||ug(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Qa(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Sf(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(e),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=di));else if(o!==4&&(o===27&&Qa(e.type)&&(a=e.stateNode,n=null),e=e.child,e!==null))for(Sf(e,n,a),e=e.sibling;e!==null;)Sf(e,n,a),e=e.sibling}function Il(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(o!==4&&(o===27&&Qa(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Il(e,n,a),e=e.sibling;e!==null;)Il(e,n,a),e=e.sibling}function cg(e){var n=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);wn(n,o,a),n[ln]=e,n[An]=a}catch(f){Ie(e,e.return,f)}}var ca=!1,pn=!1,xf=!1,fg=typeof WeakSet=="function"?WeakSet:Set,En=null;function IS(e,n){if(e=e.containerInfo,Gf=iu,e=Ep(e),hc(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,f=o.focusNode;o=o.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break t}var g=0,A=-1,z=-1,at=0,vt=0,yt=e,ot=null;e:for(;;){for(var ft;yt!==a||u!==0&&yt.nodeType!==3||(A=g+u),yt!==f||o!==0&&yt.nodeType!==3||(z=g+o),yt.nodeType===3&&(g+=yt.nodeValue.length),(ft=yt.firstChild)!==null;)ot=yt,yt=ft;for(;;){if(yt===e)break e;if(ot===a&&++at===u&&(A=g),ot===f&&++vt===o&&(z=g),(ft=yt.nextSibling)!==null)break;yt=ot,ot=yt.parentNode}yt=ft}a=A===-1||z===-1?null:{start:A,end:z}}else a=null}a=a||{start:0,end:0}}else a=null;for(Vf={focusedElem:e,selectionRange:a},iu=!1,En=n;En!==null;)if(n=En,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,En=e;else for(;En!==null;){switch(n=En,f=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)u=e[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&f!==null){e=void 0,a=n,u=f.memoizedProps,f=f.memoizedState,o=a.stateNode;try{var Yt=Ar(a.type,u);e=o.getSnapshotBeforeUpdate(Yt,f),o.__reactInternalSnapshotBeforeUpdate=e}catch($t){Ie(a,a.return,$t)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)Wf(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Wf(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(r(163))}if(e=n.sibling,e!==null){e.return=n.return,En=e;break}En=n.return}}function hg(e,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:ha(e,a),o&4&&_o(5,a);break;case 1:if(ha(e,a),o&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(g){Ie(a,a.return,g)}else{var u=Ar(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(u,n,e.__reactInternalSnapshotBeforeUpdate)}catch(g){Ie(a,a.return,g)}}o&64&&sg(a),o&512&&vo(a,a.return);break;case 3:if(ha(e,a),o&64&&(e=a.updateQueue,e!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{Qp(e,n)}catch(g){Ie(a,a.return,g)}}break;case 27:n===null&&o&4&&cg(a);case 26:case 5:ha(e,a),n===null&&o&4&&lg(a),o&512&&vo(a,a.return);break;case 12:ha(e,a);break;case 31:ha(e,a),o&4&&mg(e,a);break;case 13:ha(e,a),o&4&&gg(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=WS.bind(null,a),fx(e,a))));break;case 22:if(o=a.memoizedState!==null||ca,!o){n=n!==null&&n.memoizedState!==null||pn,u=ca;var f=pn;ca=o,(pn=n)&&!f?da(e,a,(a.subtreeFlags&8772)!==0):ha(e,a),ca=u,pn=f}break;case 30:break;default:ha(e,a)}}function dg(e){var n=e.alternate;n!==null&&(e.alternate=null,dg(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&wa(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var je=null,Xn=!1;function fa(e,n,a){for(a=a.child;a!==null;)pg(e,n,a),a=a.sibling}function pg(e,n,a){if(mt&&typeof mt.onCommitFiberUnmount=="function")try{mt.onCommitFiberUnmount(pt,a)}catch{}switch(a.tag){case 26:pn||Gi(a,n),fa(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:pn||Gi(a,n);var o=je,u=Xn;Qa(a.type)&&(je=a.stateNode,Xn=!1),fa(e,n,a),Ro(a.stateNode),je=o,Xn=u;break;case 5:pn||Gi(a,n);case 6:if(o=je,u=Xn,je=null,fa(e,n,a),je=o,Xn=u,je!==null)if(Xn)try{(je.nodeType===9?je.body:je.nodeName==="HTML"?je.ownerDocument.body:je).removeChild(a.stateNode)}catch(f){Ie(a,n,f)}else try{je.removeChild(a.stateNode)}catch(f){Ie(a,n,f)}break;case 18:je!==null&&(Xn?(e=je,s0(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),vs(e)):s0(je,a.stateNode));break;case 4:o=je,u=Xn,je=a.stateNode.containerInfo,Xn=!0,fa(e,n,a),je=o,Xn=u;break;case 0:case 11:case 14:case 15:ka(2,a,n),pn||ka(4,a,n),fa(e,n,a);break;case 1:pn||(Gi(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&og(a,n,o)),fa(e,n,a);break;case 21:fa(e,n,a);break;case 22:pn=(o=pn)||a.memoizedState!==null,fa(e,n,a),pn=o;break;default:fa(e,n,a)}}function mg(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{vs(e)}catch(a){Ie(n,n.return,a)}}}function gg(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{vs(e)}catch(a){Ie(n,n.return,a)}}function BS(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new fg),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new fg),n;default:throw Error(r(435,e.tag))}}function Bl(e,n){var a=BS(e);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=qS.bind(null,e,o);o.then(u,u)}})}function Wn(e,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],f=e,g=n,A=g;t:for(;A!==null;){switch(A.tag){case 27:if(Qa(A.type)){je=A.stateNode,Xn=!1;break t}break;case 5:je=A.stateNode,Xn=!1;break t;case 3:case 4:je=A.stateNode.containerInfo,Xn=!0;break t}A=A.return}if(je===null)throw Error(r(160));pg(f,g,u),je=null,Xn=!1,f=u.alternate,f!==null&&(f.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)_g(n,e),n=n.sibling}var Ci=null;function _g(e,n){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Wn(n,e),qn(e),o&4&&(ka(3,e,e.return),_o(3,e),ka(5,e,e.return));break;case 1:Wn(n,e),qn(e),o&512&&(pn||a===null||Gi(a,a.return)),o&64&&ca&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Ci;if(Wn(n,e),qn(e),o&512&&(pn||a===null||Gi(a,a.return)),o&4){var f=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":f=u.getElementsByTagName("title")[0],(!f||f[Da]||f[ln]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=u.createElement(o),u.head.insertBefore(f,u.querySelector("head > title"))),wn(f,o,a),f[ln]=e,un(f),o=f;break t;case"link":var g=_0("link","href",u).get(o+(a.href||""));if(g){for(var A=0;A<g.length;A++)if(f=g[A],f.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){g.splice(A,1);break e}}f=u.createElement(o),wn(f,o,a),u.head.appendChild(f);break;case"meta":if(g=_0("meta","content",u).get(o+(a.content||""))){for(A=0;A<g.length;A++)if(f=g[A],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){g.splice(A,1);break e}}f=u.createElement(o),wn(f,o,a),u.head.appendChild(f);break;default:throw Error(r(468,o))}f[ln]=e,un(f),o=f}e.stateNode=o}else v0(u,e.type,e.stateNode);else e.stateNode=g0(u,o,e.memoizedProps);else f!==o?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,o===null?v0(u,e.type,e.stateNode):g0(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&_f(e,e.memoizedProps,a.memoizedProps)}break;case 27:Wn(n,e),qn(e),o&512&&(pn||a===null||Gi(a,a.return)),a!==null&&o&4&&_f(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Wn(n,e),qn(e),o&512&&(pn||a===null||Gi(a,a.return)),e.flags&32){u=e.stateNode;try{Bn(u,"")}catch(Yt){Ie(e,e.return,Yt)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,_f(e,u,a!==null?a.memoizedProps:u)),o&1024&&(xf=!0);break;case 6:if(Wn(n,e),qn(e),o&4){if(e.stateNode===null)throw Error(r(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(Yt){Ie(e,e.return,Yt)}}break;case 3:if($l=null,u=Ci,Ci=Jl(n.containerInfo),Wn(n,e),Ci=u,qn(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{vs(n.containerInfo)}catch(Yt){Ie(e,e.return,Yt)}xf&&(xf=!1,vg(e));break;case 4:o=Ci,Ci=Jl(e.stateNode.containerInfo),Wn(n,e),qn(e),Ci=o;break;case 12:Wn(n,e),qn(e);break;case 31:Wn(n,e),qn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Bl(e,o)));break;case 13:Wn(n,e),qn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Fl=Ne()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Bl(e,o)));break;case 22:u=e.memoizedState!==null;var z=a!==null&&a.memoizedState!==null,at=ca,vt=pn;if(ca=at||u,pn=vt||z,Wn(n,e),pn=vt,ca=at,qn(e),o&8192)t:for(n=e.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||z||ca||pn||Rr(e)),a=null,n=e;;){if(n.tag===5||n.tag===26){if(a===null){z=a=n;try{if(f=z.stateNode,u)g=f.style,typeof g.setProperty=="function"?g.setProperty("display","none","important"):g.display="none";else{A=z.stateNode;var yt=z.memoizedProps.style,ot=yt!=null&&yt.hasOwnProperty("display")?yt.display:null;A.style.display=ot==null||typeof ot=="boolean"?"":(""+ot).trim()}}catch(Yt){Ie(z,z.return,Yt)}}}else if(n.tag===6){if(a===null){z=n;try{z.stateNode.nodeValue=u?"":z.memoizedProps}catch(Yt){Ie(z,z.return,Yt)}}}else if(n.tag===18){if(a===null){z=n;try{var ft=z.stateNode;u?o0(ft,!0):o0(z.stateNode,!1)}catch(Yt){Ie(z,z.return,Yt)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Bl(e,a))));break;case 19:Wn(n,e),qn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Bl(e,o)));break;case 30:break;case 21:break;default:Wn(n,e),qn(e)}}function qn(e){var n=e.flags;if(n&2){try{for(var a,o=e.return;o!==null;){if(ug(o)){a=o;break}o=o.return}if(a==null)throw Error(r(160));switch(a.tag){case 27:var u=a.stateNode,f=vf(e);Il(e,f,u);break;case 5:var g=a.stateNode;a.flags&32&&(Bn(g,""),a.flags&=-33);var A=vf(e);Il(e,A,g);break;case 3:case 4:var z=a.stateNode.containerInfo,at=vf(e);Sf(e,at,z);break;default:throw Error(r(161))}}catch(vt){Ie(e,e.return,vt)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function vg(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;vg(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function ha(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)hg(e,n.alternate,n),n=n.sibling}function Rr(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:ka(4,n,n.return),Rr(n);break;case 1:Gi(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&og(n,n.return,a),Rr(n);break;case 27:Ro(n.stateNode);case 26:case 5:Gi(n,n.return),Rr(n);break;case 22:n.memoizedState===null&&Rr(n);break;case 30:Rr(n);break;default:Rr(n)}e=e.sibling}}function da(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=e,f=n,g=f.flags;switch(f.tag){case 0:case 11:case 15:da(u,f,a),_o(4,f);break;case 1:if(da(u,f,a),o=f,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(at){Ie(o,o.return,at)}if(o=f,u=o.updateQueue,u!==null){var A=o.stateNode;try{var z=u.shared.hiddenCallbacks;if(z!==null)for(u.shared.hiddenCallbacks=null,u=0;u<z.length;u++)Kp(z[u],A)}catch(at){Ie(o,o.return,at)}}a&&g&64&&sg(f),vo(f,f.return);break;case 27:cg(f);case 26:case 5:da(u,f,a),a&&o===null&&g&4&&lg(f),vo(f,f.return);break;case 12:da(u,f,a);break;case 31:da(u,f,a),a&&g&4&&mg(u,f);break;case 13:da(u,f,a),a&&g&4&&gg(u,f);break;case 22:f.memoizedState===null&&da(u,f,a),vo(f,f.return);break;case 30:break;default:da(u,f,a)}n=n.sibling}}function yf(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&io(a))}function Mf(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&io(e))}function Di(e,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Sg(e,n,a,o),n=n.sibling}function Sg(e,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Di(e,n,a,o),u&2048&&_o(9,n);break;case 1:Di(e,n,a,o);break;case 3:Di(e,n,a,o),u&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&io(e)));break;case 12:if(u&2048){Di(e,n,a,o),e=n.stateNode;try{var f=n.memoizedProps,g=f.id,A=f.onPostCommit;typeof A=="function"&&A(g,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(z){Ie(n,n.return,z)}}else Di(e,n,a,o);break;case 31:Di(e,n,a,o);break;case 13:Di(e,n,a,o);break;case 23:break;case 22:f=n.stateNode,g=n.alternate,n.memoizedState!==null?f._visibility&2?Di(e,n,a,o):So(e,n):f._visibility&2?Di(e,n,a,o):(f._visibility|=2,os(e,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&yf(g,n);break;case 24:Di(e,n,a,o),u&2048&&Mf(n.alternate,n);break;default:Di(e,n,a,o)}}function os(e,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=e,g=n,A=a,z=o,at=g.flags;switch(g.tag){case 0:case 11:case 15:os(f,g,A,z,u),_o(8,g);break;case 23:break;case 22:var vt=g.stateNode;g.memoizedState!==null?vt._visibility&2?os(f,g,A,z,u):So(f,g):(vt._visibility|=2,os(f,g,A,z,u)),u&&at&2048&&yf(g.alternate,g);break;case 24:os(f,g,A,z,u),u&&at&2048&&Mf(g.alternate,g);break;default:os(f,g,A,z,u)}n=n.sibling}}function So(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,o=n,u=o.flags;switch(o.tag){case 22:So(a,o),u&2048&&yf(o.alternate,o);break;case 24:So(a,o),u&2048&&Mf(o.alternate,o);break;default:So(a,o)}n=n.sibling}}var xo=8192;function ls(e,n,a){if(e.subtreeFlags&xo)for(e=e.child;e!==null;)xg(e,n,a),e=e.sibling}function xg(e,n,a){switch(e.tag){case 26:ls(e,n,a),e.flags&xo&&e.memoizedState!==null&&Ex(a,Ci,e.memoizedState,e.memoizedProps);break;case 5:ls(e,n,a);break;case 3:case 4:var o=Ci;Ci=Jl(e.stateNode.containerInfo),ls(e,n,a),Ci=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=xo,xo=16777216,ls(e,n,a),xo=o):ls(e,n,a));break;default:ls(e,n,a)}}function yg(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function yo(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];En=o,Eg(o,e)}yg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Mg(e),e=e.sibling}function Mg(e){switch(e.tag){case 0:case 11:case 15:yo(e),e.flags&2048&&ka(9,e,e.return);break;case 3:yo(e);break;case 12:yo(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,zl(e)):yo(e);break;default:yo(e)}}function zl(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];En=o,Eg(o,e)}yg(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:ka(8,n,n.return),zl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,zl(n));break;default:zl(n)}e=e.sibling}}function Eg(e,n){for(;En!==null;){var a=En;switch(a.tag){case 0:case 11:case 15:ka(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:io(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,En=o;else t:for(a=e;En!==null;){o=En;var u=o.sibling,f=o.return;if(dg(o),o===a){En=null;break t}if(u!==null){u.return=f,En=u;break t}En=f}}}var zS={getCacheForType:function(e){var n=Cn(fn),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a},cacheSignal:function(){return Cn(fn).controller.signal}},FS=typeof WeakMap=="function"?WeakMap:Map,Ue=0,Ye=null,ge=null,xe=0,Pe=0,ai=null,Xa=!1,us=!1,Ef=!1,pa=0,an=0,Wa=0,Cr=0,bf=0,ri=0,cs=0,Mo=null,Yn=null,Tf=!1,Fl=0,bg=0,Hl=1/0,Gl=null,qa=null,vn=0,Ya=null,fs=null,ma=0,Af=0,Rf=null,Tg=null,Eo=0,Cf=null;function si(){return(Ue&2)!==0&&xe!==0?xe&-xe:I.T!==null?Of():Xs()}function Ag(){if(ri===0)if((xe&536870912)===0||Me){var e=ee;ee<<=1,(ee&3932160)===0&&(ee=262144),ri=e}else ri=536870912;return e=ni.current,e!==null&&(e.flags|=32),ri}function Zn(e,n,a){(e===Ye&&(Pe===2||Pe===9)||e.cancelPendingCommit!==null)&&(hs(e,0),Za(e,xe,ri,!1)),Wt(e,a),((Ue&2)===0||e!==Ye)&&(e===Ye&&((Ue&2)===0&&(Cr|=a),an===4&&Za(e,xe,ri,!1)),Vi(e))}function Rg(e,n,a){if((Ue&6)!==0)throw Error(r(327));var o=!a&&(n&127)===0&&(n&e.expiredLanes)===0||Dt(e,n),u=o?VS(e,n):wf(e,n,!0),f=o;do{if(u===0){us&&!o&&Za(e,n,0,!1);break}else{if(a=e.current.alternate,f&&!HS(a)){u=wf(e,n,!1),f=!1;continue}if(u===2){if(f=n,e.errorRecoveryDisabledLanes&f)var g=0;else g=e.pendingLanes&-536870913,g=g!==0?g:g&536870912?536870912:0;if(g!==0){n=g;t:{var A=e;u=Mo;var z=A.current.memoizedState.isDehydrated;if(z&&(hs(A,g).flags|=256),g=wf(A,g,!1),g!==2){if(Ef&&!z){A.errorRecoveryDisabledLanes|=f,Cr|=f,u=4;break t}f=Yn,Yn=u,f!==null&&(Yn===null?Yn=f:Yn.push.apply(Yn,f))}u=g}if(f=!1,u!==2)continue}}if(u===1){hs(e,0),Za(e,n,0,!0);break}t:{switch(o=e,f=u,f){case 0:case 1:throw Error(r(345));case 4:if((n&4194048)!==n)break;case 6:Za(o,n,ri,!Xa);break t;case 2:Yn=null;break;case 3:case 5:break;default:throw Error(r(329))}if((n&62914560)===n&&(u=Fl+300-Ne(),10<u)){if(Za(o,n,ri,!Xa),St(o,0,!0)!==0)break t;ma=n,o.timeoutHandle=a0(Cg.bind(null,o,a,Yn,Gl,Tf,n,ri,Cr,cs,Xa,f,"Throttled",-0,0),u);break t}Cg(o,a,Yn,Gl,Tf,n,ri,Cr,cs,Xa,f,null,-0,0)}}break}while(!0);Vi(e)}function Cg(e,n,a,o,u,f,g,A,z,at,vt,yt,ot,ft){if(e.timeoutHandle=-1,yt=n.subtreeFlags,yt&8192||(yt&16785408)===16785408){yt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:di},xg(n,f,yt);var Yt=(f&62914560)===f?Fl-Ne():(f&4194048)===f?bg-Ne():0;if(Yt=bx(yt,Yt),Yt!==null){ma=f,e.cancelPendingCommit=Yt(Ig.bind(null,e,n,f,a,o,u,g,A,z,vt,yt,null,ot,ft)),Za(e,f,g,!at);return}}Ig(e,n,f,a,o,u,g,A,z)}function HS(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],f=u.getSnapshot;u=u.value;try{if(!ti(f(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Za(e,n,a,o){n&=~bf,n&=~Cr,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var u=n;0<u;){var f=31-Gt(u),g=1<<f;o[f]=-1,u&=~g}a!==0&&be(e,a,n)}function Vl(){return(Ue&6)===0?(bo(0),!1):!0}function Df(){if(ge!==null){if(Pe===0)var e=ge.return;else e=ge,aa=Sr=null,Xc(e),ns=null,ro=0,e=ge;for(;e!==null;)rg(e.alternate,e),e=e.return;ge=null}}function hs(e,n){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,sx(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),ma=0,Df(),Ye=e,ge=a=na(e.current,null),xe=n,Pe=0,ai=null,Xa=!1,us=Dt(e,n),Ef=!1,cs=ri=bf=Cr=Wa=an=0,Yn=Mo=null,Tf=!1,(n&8)!==0&&(n|=n&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=n;0<o;){var u=31-Gt(o),f=1<<u;n|=e[u],o&=~f}return pa=n,ul(),a}function Dg(e,n){ue=null,I.H=po,n===es||n===_l?(n=Wp(),Pe=3):n===Lc?(n=Wp(),Pe=4):Pe=n===of?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,ai=n,ge===null&&(an=1,Ul(e,mi(n,e.current)))}function wg(){var e=ni.current;return e===null?!0:(xe&4194048)===xe?Si===null:(xe&62914560)===xe||(xe&536870912)!==0?e===Si:!1}function Ug(){var e=I.H;return I.H=po,e===null?po:e}function Lg(){var e=I.A;return I.A=zS,e}function kl(){an=4,Xa||(xe&4194048)!==xe&&ni.current!==null||(us=!0),(Wa&134217727)===0&&(Cr&134217727)===0||Ye===null||Za(Ye,xe,ri,!1)}function wf(e,n,a){var o=Ue;Ue|=2;var u=Ug(),f=Lg();(Ye!==e||xe!==n)&&(Gl=null,hs(e,n)),n=!1;var g=an;t:do try{if(Pe!==0&&ge!==null){var A=ge,z=ai;switch(Pe){case 8:Df(),g=6;break t;case 3:case 2:case 9:case 6:ni.current===null&&(n=!0);var at=Pe;if(Pe=0,ai=null,ds(e,A,z,at),a&&us){g=0;break t}break;default:at=Pe,Pe=0,ai=null,ds(e,A,z,at)}}GS(),g=an;break}catch(vt){Dg(e,vt)}while(!0);return n&&e.shellSuspendCounter++,aa=Sr=null,Ue=o,I.H=u,I.A=f,ge===null&&(Ye=null,xe=0,ul()),g}function GS(){for(;ge!==null;)Ng(ge)}function VS(e,n){var a=Ue;Ue|=2;var o=Ug(),u=Lg();Ye!==e||xe!==n?(Gl=null,Hl=Ne()+500,hs(e,n)):us=Dt(e,n);t:do try{if(Pe!==0&&ge!==null){n=ge;var f=ai;e:switch(Pe){case 1:Pe=0,ai=null,ds(e,n,f,1);break;case 2:case 9:if(kp(f)){Pe=0,ai=null,Og(n);break}n=function(){Pe!==2&&Pe!==9||Ye!==e||(Pe=7),Vi(e)},f.then(n,n);break t;case 3:Pe=7;break t;case 4:Pe=5;break t;case 7:kp(f)?(Pe=0,ai=null,Og(n)):(Pe=0,ai=null,ds(e,n,f,7));break;case 5:var g=null;switch(ge.tag){case 26:g=ge.memoizedState;case 5:case 27:var A=ge;if(g?S0(g):A.stateNode.complete){Pe=0,ai=null;var z=A.sibling;if(z!==null)ge=z;else{var at=A.return;at!==null?(ge=at,Xl(at)):ge=null}break e}}Pe=0,ai=null,ds(e,n,f,5);break;case 6:Pe=0,ai=null,ds(e,n,f,6);break;case 8:Df(),an=6;break t;default:throw Error(r(462))}}kS();break}catch(vt){Dg(e,vt)}while(!0);return aa=Sr=null,I.H=o,I.A=u,Ue=a,ge!==null?0:(Ye=null,xe=0,ul(),an)}function kS(){for(;ge!==null&&!en();)Ng(ge)}function Ng(e){var n=ig(e.alternate,e,pa);e.memoizedProps=e.pendingProps,n===null?Xl(e):ge=n}function Og(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=Jm(a,n,n.pendingProps,n.type,void 0,xe);break;case 11:n=Jm(a,n,n.pendingProps,n.type.render,n.ref,xe);break;case 5:Xc(n);default:rg(a,n),n=ge=Lp(n,pa),n=ig(a,n,pa)}e.memoizedProps=e.pendingProps,n===null?Xl(e):ge=n}function ds(e,n,a,o){aa=Sr=null,Xc(n),ns=null,ro=0;var u=n.return;try{if(US(e,u,n,a,xe)){an=1,Ul(e,mi(a,e.current)),ge=null;return}}catch(f){if(u!==null)throw ge=u,f;an=1,Ul(e,mi(a,e.current)),ge=null;return}n.flags&32768?(Me||o===1?e=!0:us||(xe&536870912)!==0?e=!1:(Xa=e=!0,(o===2||o===9||o===3||o===6)&&(o=ni.current,o!==null&&o.tag===13&&(o.flags|=16384))),Pg(n,e)):Xl(n)}function Xl(e){var n=e;do{if((n.flags&32768)!==0){Pg(n,Xa);return}e=n.return;var a=OS(n.alternate,n,pa);if(a!==null){ge=a;return}if(n=n.sibling,n!==null){ge=n;return}ge=n=e}while(n!==null);an===0&&(an=5)}function Pg(e,n){do{var a=PS(e.alternate,e);if(a!==null){a.flags&=32767,ge=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){ge=e;return}ge=e=a}while(e!==null);an=6,ge=null}function Ig(e,n,a,o,u,f,g,A,z){e.cancelPendingCommit=null;do Wl();while(vn!==0);if((Ue&6)!==0)throw Error(r(327));if(n!==null){if(n===e.current)throw Error(r(177));if(f=n.lanes|n.childLanes,f|=_c,Fe(e,a,f,g,A,z),e===Ye&&(ge=Ye=null,xe=0),fs=n,Ya=e,ma=a,Af=f,Rf=u,Tg=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,YS(K,function(){return Gg(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=I.T,I.T=null,u=F.p,F.p=2,g=Ue,Ue|=4;try{IS(e,n,a)}finally{Ue=g,F.p=u,I.T=o}}vn=1,Bg(),zg(),Fg()}}function Bg(){if(vn===1){vn=0;var e=Ya,n=fs,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=I.T,I.T=null;var o=F.p;F.p=2;var u=Ue;Ue|=4;try{_g(n,e);var f=Vf,g=Ep(e.containerInfo),A=f.focusedElem,z=f.selectionRange;if(g!==A&&A&&A.ownerDocument&&Mp(A.ownerDocument.documentElement,A)){if(z!==null&&hc(A)){var at=z.start,vt=z.end;if(vt===void 0&&(vt=at),"selectionStart"in A)A.selectionStart=at,A.selectionEnd=Math.min(vt,A.value.length);else{var yt=A.ownerDocument||document,ot=yt&&yt.defaultView||window;if(ot.getSelection){var ft=ot.getSelection(),Yt=A.textContent.length,$t=Math.min(z.start,Yt),ke=z.end===void 0?$t:Math.min(z.end,Yt);!ft.extend&&$t>ke&&(g=ke,ke=$t,$t=g);var Z=yp(A,$t),G=yp(A,ke);if(Z&&G&&(ft.rangeCount!==1||ft.anchorNode!==Z.node||ft.anchorOffset!==Z.offset||ft.focusNode!==G.node||ft.focusOffset!==G.offset)){var et=yt.createRange();et.setStart(Z.node,Z.offset),ft.removeAllRanges(),$t>ke?(ft.addRange(et),ft.extend(G.node,G.offset)):(et.setEnd(G.node,G.offset),ft.addRange(et))}}}}for(yt=[],ft=A;ft=ft.parentNode;)ft.nodeType===1&&yt.push({element:ft,left:ft.scrollLeft,top:ft.scrollTop});for(typeof A.focus=="function"&&A.focus(),A=0;A<yt.length;A++){var xt=yt[A];xt.element.scrollLeft=xt.left,xt.element.scrollTop=xt.top}}iu=!!Gf,Vf=Gf=null}finally{Ue=u,F.p=o,I.T=a}}e.current=n,vn=2}}function zg(){if(vn===2){vn=0;var e=Ya,n=fs,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=I.T,I.T=null;var o=F.p;F.p=2;var u=Ue;Ue|=4;try{hg(e,n.alternate,n)}finally{Ue=u,F.p=o,I.T=a}}vn=3}}function Fg(){if(vn===4||vn===3){vn=0,X();var e=Ya,n=fs,a=ma,o=Tg;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?vn=5:(vn=0,fs=Ya=null,Hg(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(qa=null),ks(a),n=n.stateNode,mt&&typeof mt.onCommitFiberRoot=="function")try{mt.onCommitFiberRoot(pt,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=I.T,u=F.p,F.p=2,I.T=null;try{for(var f=e.onRecoverableError,g=0;g<o.length;g++){var A=o[g];f(A.value,{componentStack:A.stack})}}finally{I.T=n,F.p=u}}(ma&3)!==0&&Wl(),Vi(e),u=e.pendingLanes,(a&261930)!==0&&(u&42)!==0?e===Cf?Eo++:(Eo=0,Cf=e):Eo=0,bo(0)}}function Hg(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,io(n)))}function Wl(){return Bg(),zg(),Fg(),Gg()}function Gg(){if(vn!==5)return!1;var e=Ya,n=Af;Af=0;var a=ks(ma),o=I.T,u=F.p;try{F.p=32>a?32:a,I.T=null,a=Rf,Rf=null;var f=Ya,g=ma;if(vn=0,fs=Ya=null,ma=0,(Ue&6)!==0)throw Error(r(331));var A=Ue;if(Ue|=4,Mg(f.current),Sg(f,f.current,g,a),Ue=A,bo(0,!1),mt&&typeof mt.onPostCommitFiberRoot=="function")try{mt.onPostCommitFiberRoot(pt,f)}catch{}return!0}finally{F.p=u,I.T=o,Hg(e,n)}}function Vg(e,n,a){n=mi(a,n),n=sf(e.stateNode,n,2),e=Ha(e,n,2),e!==null&&(Wt(e,2),Vi(e))}function Ie(e,n,a){if(e.tag===3)Vg(e,e,a);else for(;n!==null;){if(n.tag===3){Vg(n,e,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(qa===null||!qa.has(o))){e=mi(a,e),a=km(2),o=Ha(n,a,2),o!==null&&(Xm(a,o,n,e),Wt(o,2),Vi(o));break}}n=n.return}}function Uf(e,n,a){var o=e.pingCache;if(o===null){o=e.pingCache=new FS;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(Ef=!0,u.add(a),e=XS.bind(null,e,n,a),n.then(e,e))}function XS(e,n,a){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,Ye===e&&(xe&a)===a&&(an===4||an===3&&(xe&62914560)===xe&&300>Ne()-Fl?(Ue&2)===0&&hs(e,0):bf|=a,cs===xe&&(cs=0)),Vi(e)}function kg(e,n){n===0&&(n=Mt()),e=gr(e,n),e!==null&&(Wt(e,n),Vi(e))}function WS(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),kg(e,a)}function qS(e,n){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(r(314))}o!==null&&o.delete(n),kg(e,a)}function YS(e,n){return Mn(e,n)}var ql=null,ps=null,Lf=!1,Yl=!1,Nf=!1,Ka=0;function Vi(e){e!==ps&&e.next===null&&(ps===null?ql=ps=e:ps=ps.next=e),Yl=!0,Lf||(Lf=!0,KS())}function bo(e,n){if(!Nf&&Yl){Nf=!0;do for(var a=!1,o=ql;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var f=0;else{var g=o.suspendedLanes,A=o.pingedLanes;f=(1<<31-Gt(42|e)+1)-1,f&=u&~(g&~A),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,Yg(o,f))}else f=xe,f=St(o,o===Ye?f:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(f&3)===0||Dt(o,f)||(a=!0,Yg(o,f));o=o.next}while(a);Nf=!1}}function ZS(){Xg()}function Xg(){Yl=Lf=!1;var e=0;Ka!==0&&rx()&&(e=Ka);for(var n=Ne(),a=null,o=ql;o!==null;){var u=o.next,f=Wg(o,n);f===0?(o.next=null,a===null?ql=u:a.next=u,u===null&&(ps=a)):(a=o,(e!==0||(f&3)!==0)&&(Yl=!0)),o=u}vn!==0&&vn!==5||bo(e),Ka!==0&&(Ka=0)}function Wg(e,n){for(var a=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,f=e.pendingLanes&-62914561;0<f;){var g=31-Gt(f),A=1<<g,z=u[g];z===-1?((A&a)===0||(A&o)!==0)&&(u[g]=Bt(A,n)):z<=n&&(e.expiredLanes|=A),f&=~A}if(n=Ye,a=xe,a=St(e,e===n?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===n&&(Pe===2||Pe===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&We(o),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Dt(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(o!==null&&We(o),ks(a)){case 2:case 8:a=y;break;case 32:a=K;break;case 268435456:a=dt;break;default:a=K}return o=qg.bind(null,e),a=Mn(a,o),e.callbackPriority=n,e.callbackNode=a,n}return o!==null&&o!==null&&We(o),e.callbackPriority=2,e.callbackNode=null,2}function qg(e,n){if(vn!==0&&vn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Wl()&&e.callbackNode!==a)return null;var o=xe;return o=St(e,e===Ye?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(Rg(e,o,n),Wg(e,Ne()),e.callbackNode!=null&&e.callbackNode===a?qg.bind(null,e):null)}function Yg(e,n){if(Wl())return null;Rg(e,n,!0)}function KS(){ox(function(){(Ue&6)!==0?Mn(N,ZS):Xg()})}function Of(){if(Ka===0){var e=$r;e===0&&(e=Jt,Jt<<=1,(Jt&261888)===0&&(Jt=256)),Ka=e}return Ka}function Zg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ai(""+e)}function Kg(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function QS(e,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var f=Zg((u[An]||null).action),g=o.submitter;g&&(n=(n=g[An]||null)?Zg(n.formAction):g.getAttribute("formAction"),n!==null&&(f=n,g=null));var A=new rl("action","action",null,o,u);e.push({event:A,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Ka!==0){var z=g?Kg(u,g):new FormData(u);$c(a,{pending:!0,data:z,method:u.method,action:f},null,z)}}else typeof f=="function"&&(A.preventDefault(),z=g?Kg(u,g):new FormData(u),$c(a,{pending:!0,data:z,method:u.method,action:f},f,z))},currentTarget:u}]})}}for(var Pf=0;Pf<gc.length;Pf++){var If=gc[Pf],JS=If.toLowerCase(),jS=If[0].toUpperCase()+If.slice(1);Ri(JS,"on"+jS)}Ri(Ap,"onAnimationEnd"),Ri(Rp,"onAnimationIteration"),Ri(Cp,"onAnimationStart"),Ri("dblclick","onDoubleClick"),Ri("focusin","onFocus"),Ri("focusout","onBlur"),Ri(pS,"onTransitionRun"),Ri(mS,"onTransitionStart"),Ri(gS,"onTransitionCancel"),Ri(Dp,"onTransitionEnd"),H("onMouseEnter",["mouseout","mouseover"]),H("onMouseLeave",["mouseout","mouseover"]),H("onPointerEnter",["pointerout","pointerover"]),H("onPointerLeave",["pointerout","pointerover"]),T("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),T("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),T("onBeforeInput",["compositionend","keypress","textInput","paste"]),T("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),T("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),T("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var To="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),$S=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(To));function Qg(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],u=o.event;o=o.listeners;t:{var f=void 0;if(n)for(var g=o.length-1;0<=g;g--){var A=o[g],z=A.instance,at=A.currentTarget;if(A=A.listener,z!==f&&u.isPropagationStopped())break t;f=A,u.currentTarget=at;try{f(u)}catch(vt){ll(vt)}u.currentTarget=null,f=z}else for(g=0;g<o.length;g++){if(A=o[g],z=A.instance,at=A.currentTarget,A=A.listener,z!==f&&u.isPropagationStopped())break t;f=A,u.currentTarget=at;try{f(u)}catch(vt){ll(vt)}u.currentTarget=null,f=z}}}}function _e(e,n){var a=n[cr];a===void 0&&(a=n[cr]=new Set);var o=e+"__bubble";a.has(o)||(Jg(n,e,2,!1),a.add(o))}function Bf(e,n,a){var o=0;n&&(o|=4),Jg(a,e,o,n)}var Zl="_reactListening"+Math.random().toString(36).slice(2);function zf(e){if(!e[Zl]){e[Zl]=!0,el.forEach(function(a){a!=="selectionchange"&&($S.has(a)||Bf(a,!1,e),Bf(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Zl]||(n[Zl]=!0,Bf("selectionchange",!1,n))}}function Jg(e,n,a,o){switch(A0(n)){case 2:var u=Rx;break;case 8:u=Cx;break;default:u=$f}a=u.bind(null,n,a,e),u=void 0,!ic||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(n,a,{capture:!0,passive:u}):e.addEventListener(n,a,!0):u!==void 0?e.addEventListener(n,a,{passive:u}):e.addEventListener(n,a,!1)}function Ff(e,n,a,o,u){var f=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var g=o.tag;if(g===3||g===4){var A=o.stateNode.containerInfo;if(A===u)break;if(g===4)for(g=o.return;g!==null;){var z=g.tag;if((z===3||z===4)&&g.stateNode.containerInfo===u)return;g=g.return}for(;A!==null;){if(g=$i(A),g===null)return;if(z=g.tag,z===5||z===6||z===26||z===27){o=f=g;continue t}A=A.parentNode}}o=o.return}np(function(){var at=f,vt=ec(a),yt=[];t:{var ot=wp.get(e);if(ot!==void 0){var ft=rl,Yt=e;switch(e){case"keypress":if(il(a)===0)break t;case"keydown":case"keyup":ft=qv;break;case"focusin":Yt="focus",ft=oc;break;case"focusout":Yt="blur",ft=oc;break;case"beforeblur":case"afterblur":ft=oc;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ft=rp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ft=Ov;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ft=Kv;break;case Ap:case Rp:case Cp:ft=Bv;break;case Dp:ft=Jv;break;case"scroll":case"scrollend":ft=Lv;break;case"wheel":ft=$v;break;case"copy":case"cut":case"paste":ft=Fv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ft=op;break;case"toggle":case"beforetoggle":ft=eS}var $t=(n&4)!==0,ke=!$t&&(e==="scroll"||e==="scrollend"),Z=$t?ot!==null?ot+"Capture":null:ot;$t=[];for(var G=at,et;G!==null;){var xt=G;if(et=xt.stateNode,xt=xt.tag,xt!==5&&xt!==26&&xt!==27||et===null||Z===null||(xt=qs(G,Z),xt!=null&&$t.push(Ao(G,xt,et))),ke)break;G=G.return}0<$t.length&&(ot=new ft(ot,Yt,null,a,vt),yt.push({event:ot,listeners:$t}))}}if((n&7)===0){t:{if(ot=e==="mouseover"||e==="pointerover",ft=e==="mouseout"||e==="pointerout",ot&&a!==tc&&(Yt=a.relatedTarget||a.fromElement)&&($i(Yt)||Yt[Vn]))break t;if((ft||ot)&&(ot=vt.window===vt?vt:(ot=vt.ownerDocument)?ot.defaultView||ot.parentWindow:window,ft?(Yt=a.relatedTarget||a.toElement,ft=at,Yt=Yt?$i(Yt):null,Yt!==null&&(ke=c(Yt),$t=Yt.tag,Yt!==ke||$t!==5&&$t!==27&&$t!==6)&&(Yt=null)):(ft=null,Yt=at),ft!==Yt)){if($t=rp,xt="onMouseLeave",Z="onMouseEnter",G="mouse",(e==="pointerout"||e==="pointerover")&&($t=op,xt="onPointerLeave",Z="onPointerEnter",G="pointer"),ke=ft==null?ot:hr(ft),et=Yt==null?ot:hr(Yt),ot=new $t(xt,G+"leave",ft,a,vt),ot.target=ke,ot.relatedTarget=et,xt=null,$i(vt)===at&&($t=new $t(Z,G+"enter",Yt,a,vt),$t.target=et,$t.relatedTarget=ke,xt=$t),ke=xt,ft&&Yt)e:{for($t=tx,Z=ft,G=Yt,et=0,xt=Z;xt;xt=$t(xt))et++;xt=0;for(var jt=G;jt;jt=$t(jt))xt++;for(;0<et-xt;)Z=$t(Z),et--;for(;0<xt-et;)G=$t(G),xt--;for(;et--;){if(Z===G||G!==null&&Z===G.alternate){$t=Z;break e}Z=$t(Z),G=$t(G)}$t=null}else $t=null;ft!==null&&jg(yt,ot,ft,$t,!1),Yt!==null&&ke!==null&&jg(yt,ke,Yt,$t,!0)}}t:{if(ot=at?hr(at):window,ft=ot.nodeName&&ot.nodeName.toLowerCase(),ft==="select"||ft==="input"&&ot.type==="file")var Ae=mp;else if(dp(ot))if(gp)Ae=fS;else{Ae=uS;var Zt=lS}else ft=ot.nodeName,!ft||ft.toLowerCase()!=="input"||ot.type!=="checkbox"&&ot.type!=="radio"?at&&hi(at.elementType)&&(Ae=mp):Ae=cS;if(Ae&&(Ae=Ae(e,at))){pp(yt,Ae,a,vt);break t}Zt&&Zt(e,ot,at),e==="focusout"&&at&&ot.type==="number"&&at.memoizedProps.value!=null&&_n(ot,"number",ot.value)}switch(Zt=at?hr(at):window,e){case"focusin":(dp(Zt)||Zt.contentEditable==="true")&&(Wr=Zt,dc=at,to=null);break;case"focusout":to=dc=Wr=null;break;case"mousedown":pc=!0;break;case"contextmenu":case"mouseup":case"dragend":pc=!1,bp(yt,a,vt);break;case"selectionchange":if(dS)break;case"keydown":case"keyup":bp(yt,a,vt)}var ce;if(uc)t:{switch(e){case"compositionstart":var ye="onCompositionStart";break t;case"compositionend":ye="onCompositionEnd";break t;case"compositionupdate":ye="onCompositionUpdate";break t}ye=void 0}else Xr?fp(e,a)&&(ye="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(ye="onCompositionStart");ye&&(lp&&a.locale!=="ko"&&(Xr||ye!=="onCompositionStart"?ye==="onCompositionEnd"&&Xr&&(ce=ip()):(Na=vt,ac="value"in Na?Na.value:Na.textContent,Xr=!0)),Zt=Kl(at,ye),0<Zt.length&&(ye=new sp(ye,e,null,a,vt),yt.push({event:ye,listeners:Zt}),ce?ye.data=ce:(ce=hp(a),ce!==null&&(ye.data=ce)))),(ce=iS?aS(e,a):rS(e,a))&&(ye=Kl(at,"onBeforeInput"),0<ye.length&&(Zt=new sp("onBeforeInput","beforeinput",null,a,vt),yt.push({event:Zt,listeners:ye}),Zt.data=ce)),QS(yt,e,at,a,vt)}Qg(yt,n)})}function Ao(e,n,a){return{instance:e,listener:n,currentTarget:a}}function Kl(e,n){for(var a=n+"Capture",o=[];e!==null;){var u=e,f=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||f===null||(u=qs(e,a),u!=null&&o.unshift(Ao(e,u,f)),u=qs(e,n),u!=null&&o.push(Ao(e,u,f))),e.tag===3)return o;e=e.return}return[]}function tx(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function jg(e,n,a,o,u){for(var f=n._reactName,g=[];a!==null&&a!==o;){var A=a,z=A.alternate,at=A.stateNode;if(A=A.tag,z!==null&&z===o)break;A!==5&&A!==26&&A!==27||at===null||(z=at,u?(at=qs(a,f),at!=null&&g.unshift(Ao(a,at,z))):u||(at=qs(a,f),at!=null&&g.push(Ao(a,at,z)))),a=a.return}g.length!==0&&e.push({event:n,listeners:g})}var ex=/\r\n?/g,nx=/\u0000|\uFFFD/g;function $g(e){return(typeof e=="string"?e:""+e).replace(ex,`
`).replace(nx,"")}function t0(e,n){return n=$g(n),$g(e)===n}function Ve(e,n,a,o,u,f){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||Bn(e,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&Bn(e,""+o);break;case"className":Lt(e,"class",o);break;case"tabIndex":Lt(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Lt(e,a,o);break;case"style":Je(e,o,f);break;case"data":if(n!=="object"){Lt(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=Ai(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&Ve(e,n,"name",u.name,u,null),Ve(e,n,"formEncType",u.formEncType,u,null),Ve(e,n,"formMethod",u.formMethod,u,null),Ve(e,n,"formTarget",u.formTarget,u,null)):(Ve(e,n,"encType",u.encType,u,null),Ve(e,n,"method",u.method,u,null),Ve(e,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=Ai(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=di);break;case"onScroll":o!=null&&_e("scroll",e);break;case"onScrollEnd":o!=null&&_e("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(r(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=Ai(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":_e("beforetoggle",e),_e("toggle",e),Vt(e,"popover",o);break;case"xlinkActuate":zt(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":zt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":zt(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":zt(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":zt(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":zt(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":zt(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":zt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":zt(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Vt(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=He.get(a)||a,Vt(e,a,o))}}function Hf(e,n,a,o,u,f){switch(a){case"style":Je(e,o,f);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(r(60));e.innerHTML=a}}break;case"children":typeof o=="string"?Bn(e,o):(typeof o=="number"||typeof o=="bigint")&&Bn(e,""+o);break;case"onScroll":o!=null&&_e("scroll",e);break;case"onScrollEnd":o!=null&&_e("scrollend",e);break;case"onClick":o!=null&&(e.onclick=di);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Ws.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),f=e[An]||null,f=f!=null?f[a]:null,typeof f=="function"&&e.removeEventListener(n,f,u),typeof o=="function")){typeof f!="function"&&f!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,o,u);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):Vt(e,a,o)}}}function wn(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":_e("error",e),_e("load",e);var o=!1,u=!1,f;for(f in a)if(a.hasOwnProperty(f)){var g=a[f];if(g!=null)switch(f){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Ve(e,n,f,g,a,null)}}u&&Ve(e,n,"srcSet",a.srcSet,a,null),o&&Ve(e,n,"src",a.src,a,null);return;case"input":_e("invalid",e);var A=f=g=u=null,z=null,at=null;for(o in a)if(a.hasOwnProperty(o)){var vt=a[o];if(vt!=null)switch(o){case"name":u=vt;break;case"type":g=vt;break;case"checked":z=vt;break;case"defaultChecked":at=vt;break;case"value":f=vt;break;case"defaultValue":A=vt;break;case"children":case"dangerouslySetInnerHTML":if(vt!=null)throw Error(r(137,n));break;default:Ve(e,n,o,vt,a,null)}}kt(e,f,A,z,at,g,u,!1);return;case"select":_e("invalid",e),o=g=f=null;for(u in a)if(a.hasOwnProperty(u)&&(A=a[u],A!=null))switch(u){case"value":f=A;break;case"defaultValue":g=A;break;case"multiple":o=A;default:Ve(e,n,u,A,a,null)}n=f,a=g,e.multiple=!!o,n!=null?he(e,!!o,n,!1):a!=null&&he(e,!!o,a,!0);return;case"textarea":_e("invalid",e),f=u=o=null;for(g in a)if(a.hasOwnProperty(g)&&(A=a[g],A!=null))switch(g){case"value":o=A;break;case"defaultValue":u=A;break;case"children":f=A;break;case"dangerouslySetInnerHTML":if(A!=null)throw Error(r(91));break;default:Ve(e,n,g,A,a,null)}$n(e,o,u,f);return;case"option":for(z in a)a.hasOwnProperty(z)&&(o=a[z],o!=null)&&(z==="selected"?e.selected=o&&typeof o!="function"&&typeof o!="symbol":Ve(e,n,z,o,a,null));return;case"dialog":_e("beforetoggle",e),_e("toggle",e),_e("cancel",e),_e("close",e);break;case"iframe":case"object":_e("load",e);break;case"video":case"audio":for(o=0;o<To.length;o++)_e(To[o],e);break;case"image":_e("error",e),_e("load",e);break;case"details":_e("toggle",e);break;case"embed":case"source":case"link":_e("error",e),_e("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(at in a)if(a.hasOwnProperty(at)&&(o=a[at],o!=null))switch(at){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Ve(e,n,at,o,a,null)}return;default:if(hi(n)){for(vt in a)a.hasOwnProperty(vt)&&(o=a[vt],o!==void 0&&Hf(e,n,vt,o,a,void 0));return}}for(A in a)a.hasOwnProperty(A)&&(o=a[A],o!=null&&Ve(e,n,A,o,a,null))}function ix(e,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,f=null,g=null,A=null,z=null,at=null,vt=null;for(ft in a){var yt=a[ft];if(a.hasOwnProperty(ft)&&yt!=null)switch(ft){case"checked":break;case"value":break;case"defaultValue":z=yt;default:o.hasOwnProperty(ft)||Ve(e,n,ft,null,o,yt)}}for(var ot in o){var ft=o[ot];if(yt=a[ot],o.hasOwnProperty(ot)&&(ft!=null||yt!=null))switch(ot){case"type":f=ft;break;case"name":u=ft;break;case"checked":at=ft;break;case"defaultChecked":vt=ft;break;case"value":g=ft;break;case"defaultValue":A=ft;break;case"children":case"dangerouslySetInnerHTML":if(ft!=null)throw Error(r(137,n));break;default:ft!==yt&&Ve(e,n,ot,ft,o,yt)}}cn(e,g,A,z,at,vt,f,u);return;case"select":ft=g=A=ot=null;for(f in a)if(z=a[f],a.hasOwnProperty(f)&&z!=null)switch(f){case"value":break;case"multiple":ft=z;default:o.hasOwnProperty(f)||Ve(e,n,f,null,o,z)}for(u in o)if(f=o[u],z=a[u],o.hasOwnProperty(u)&&(f!=null||z!=null))switch(u){case"value":ot=f;break;case"defaultValue":A=f;break;case"multiple":g=f;default:f!==z&&Ve(e,n,u,f,o,z)}n=A,a=g,o=ft,ot!=null?he(e,!!a,ot,!1):!!o!=!!a&&(n!=null?he(e,!!a,n,!0):he(e,!!a,a?[]:"",!1));return;case"textarea":ft=ot=null;for(A in a)if(u=a[A],a.hasOwnProperty(A)&&u!=null&&!o.hasOwnProperty(A))switch(A){case"value":break;case"children":break;default:Ve(e,n,A,null,o,u)}for(g in o)if(u=o[g],f=a[g],o.hasOwnProperty(g)&&(u!=null||f!=null))switch(g){case"value":ot=u;break;case"defaultValue":ft=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(r(91));break;default:u!==f&&Ve(e,n,g,u,o,f)}In(e,ot,ft);return;case"option":for(var Yt in a)ot=a[Yt],a.hasOwnProperty(Yt)&&ot!=null&&!o.hasOwnProperty(Yt)&&(Yt==="selected"?e.selected=!1:Ve(e,n,Yt,null,o,ot));for(z in o)ot=o[z],ft=a[z],o.hasOwnProperty(z)&&ot!==ft&&(ot!=null||ft!=null)&&(z==="selected"?e.selected=ot&&typeof ot!="function"&&typeof ot!="symbol":Ve(e,n,z,ot,o,ft));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var $t in a)ot=a[$t],a.hasOwnProperty($t)&&ot!=null&&!o.hasOwnProperty($t)&&Ve(e,n,$t,null,o,ot);for(at in o)if(ot=o[at],ft=a[at],o.hasOwnProperty(at)&&ot!==ft&&(ot!=null||ft!=null))switch(at){case"children":case"dangerouslySetInnerHTML":if(ot!=null)throw Error(r(137,n));break;default:Ve(e,n,at,ot,o,ft)}return;default:if(hi(n)){for(var ke in a)ot=a[ke],a.hasOwnProperty(ke)&&ot!==void 0&&!o.hasOwnProperty(ke)&&Hf(e,n,ke,void 0,o,ot);for(vt in o)ot=o[vt],ft=a[vt],!o.hasOwnProperty(vt)||ot===ft||ot===void 0&&ft===void 0||Hf(e,n,vt,ot,o,ft);return}}for(var Z in a)ot=a[Z],a.hasOwnProperty(Z)&&ot!=null&&!o.hasOwnProperty(Z)&&Ve(e,n,Z,null,o,ot);for(yt in o)ot=o[yt],ft=a[yt],!o.hasOwnProperty(yt)||ot===ft||ot==null&&ft==null||Ve(e,n,yt,ot,o,ft)}function e0(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function ax(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],f=u.transferSize,g=u.initiatorType,A=u.duration;if(f&&A&&e0(g)){for(g=0,A=u.responseEnd,o+=1;o<a.length;o++){var z=a[o],at=z.startTime;if(at>A)break;var vt=z.transferSize,yt=z.initiatorType;vt&&e0(yt)&&(z=z.responseEnd,g+=vt*(z<A?1:(A-at)/(z-at)))}if(--o,n+=8*(f+g)/(u.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Gf=null,Vf=null;function Ql(e){return e.nodeType===9?e:e.ownerDocument}function n0(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function i0(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function kf(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Xf=null;function rx(){var e=window.event;return e&&e.type==="popstate"?e===Xf?!1:(Xf=e,!0):(Xf=null,!1)}var a0=typeof setTimeout=="function"?setTimeout:void 0,sx=typeof clearTimeout=="function"?clearTimeout:void 0,r0=typeof Promise=="function"?Promise:void 0,ox=typeof queueMicrotask=="function"?queueMicrotask:typeof r0<"u"?function(e){return r0.resolve(null).then(e).catch(lx)}:a0;function lx(e){setTimeout(function(){throw e})}function Qa(e){return e==="head"}function s0(e,n){var a=n,o=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(u),vs(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Ro(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Ro(a);for(var f=a.firstChild;f;){var g=f.nextSibling,A=f.nodeName;f[Da]||A==="SCRIPT"||A==="STYLE"||A==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=g}}else a==="body"&&Ro(e.ownerDocument.body);a=u}while(a);vs(n)}function o0(e,n){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function Wf(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Wf(a),wa(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function ux(e,n,a,o){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[Da])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(f=e.getAttribute("rel"),f==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(f!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(f=e.getAttribute("src"),(f!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&f&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var f=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===f)return e}else return e;if(e=xi(e.nextSibling),e===null)break}return null}function cx(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=xi(e.nextSibling),e===null))return null;return e}function l0(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=xi(e.nextSibling),e===null))return null;return e}function qf(e){return e.data==="$?"||e.data==="$~"}function Yf(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function fx(e,n){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function xi(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var Zf=null;function u0(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(n===0)return xi(e.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}e=e.nextSibling}return null}function c0(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return e;n--}else a!=="/$"&&a!=="/&"||n++}e=e.previousSibling}return null}function f0(e,n,a){switch(n=Ql(a),e){case"html":if(e=n.documentElement,!e)throw Error(r(452));return e;case"head":if(e=n.head,!e)throw Error(r(453));return e;case"body":if(e=n.body,!e)throw Error(r(454));return e;default:throw Error(r(451))}}function Ro(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);wa(e)}var yi=new Map,h0=new Set;function Jl(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ga=F.d;F.d={f:hx,r:dx,D:px,C:mx,L:gx,m:_x,X:Sx,S:vx,M:xx};function hx(){var e=ga.f(),n=Vl();return e||n}function dx(e){var n=ta(e);n!==null&&n.tag===5&&n.type==="form"?Dm(n):ga.r(e)}var ms=typeof document>"u"?null:document;function d0(e,n,a){var o=ms;if(o&&typeof n=="string"&&n){var u=fe(n);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),h0.has(u)||(h0.add(u),e={rel:e,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),wn(n,"link",e),un(n),o.head.appendChild(n)))}}function px(e){ga.D(e),d0("dns-prefetch",e,null)}function mx(e,n){ga.C(e,n),d0("preconnect",e,n)}function gx(e,n,a){ga.L(e,n,a);var o=ms;if(o&&e&&n){var u='link[rel="preload"][as="'+fe(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+fe(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+fe(a.imageSizes)+'"]')):u+='[href="'+fe(e)+'"]';var f=u;switch(n){case"style":f=gs(e);break;case"script":f=_s(e)}yi.has(f)||(e=v({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),yi.set(f,e),o.querySelector(u)!==null||n==="style"&&o.querySelector(Co(f))||n==="script"&&o.querySelector(Do(f))||(n=o.createElement("link"),wn(n,"link",e),un(n),o.head.appendChild(n)))}}function _x(e,n){ga.m(e,n);var a=ms;if(a&&e){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+fe(o)+'"][href="'+fe(e)+'"]',f=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=_s(e)}if(!yi.has(f)&&(e=v({rel:"modulepreload",href:e},n),yi.set(f,e),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Do(f)))return}o=a.createElement("link"),wn(o,"link",e),un(o),a.head.appendChild(o)}}}function vx(e,n,a){ga.S(e,n,a);var o=ms;if(o&&e){var u=Ua(o).hoistableStyles,f=gs(e);n=n||"default";var g=u.get(f);if(!g){var A={loading:0,preload:null};if(g=o.querySelector(Co(f)))A.loading=5;else{e=v({rel:"stylesheet",href:e,"data-precedence":n},a),(a=yi.get(f))&&Kf(e,a);var z=g=o.createElement("link");un(z),wn(z,"link",e),z._p=new Promise(function(at,vt){z.onload=at,z.onerror=vt}),z.addEventListener("load",function(){A.loading|=1}),z.addEventListener("error",function(){A.loading|=2}),A.loading|=4,jl(g,n,o)}g={type:"stylesheet",instance:g,count:1,state:A},u.set(f,g)}}}function Sx(e,n){ga.X(e,n);var a=ms;if(a&&e){var o=Ua(a).hoistableScripts,u=_s(e),f=o.get(u);f||(f=a.querySelector(Do(u)),f||(e=v({src:e,async:!0},n),(n=yi.get(u))&&Qf(e,n),f=a.createElement("script"),un(f),wn(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function xx(e,n){ga.M(e,n);var a=ms;if(a&&e){var o=Ua(a).hoistableScripts,u=_s(e),f=o.get(u);f||(f=a.querySelector(Do(u)),f||(e=v({src:e,async:!0,type:"module"},n),(n=yi.get(u))&&Qf(e,n),f=a.createElement("script"),un(f),wn(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function p0(e,n,a,o){var u=(u=Xt.current)?Jl(u):null;if(!u)throw Error(r(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=gs(a.href),a=Ua(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=gs(a.href);var f=Ua(u).hoistableStyles,g=f.get(e);if(g||(u=u.ownerDocument||u,g={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(e,g),(f=u.querySelector(Co(e)))&&!f._p&&(g.instance=f,g.state.loading=5),yi.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},yi.set(e,a),f||yx(u,e,a,g.state))),n&&o===null)throw Error(r(528,""));return g}if(n&&o!==null)throw Error(r(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=_s(a),a=Ua(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,e))}}function gs(e){return'href="'+fe(e)+'"'}function Co(e){return'link[rel="stylesheet"]['+e+"]"}function m0(e){return v({},e,{"data-precedence":e.precedence,precedence:null})}function yx(e,n,a,o){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=e.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),wn(n,"link",a),un(n),e.head.appendChild(n))}function _s(e){return'[src="'+fe(e)+'"]'}function Do(e){return"script[async]"+e}function g0(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+fe(a.href)+'"]');if(o)return n.instance=o,un(o),o;var u=v({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),un(o),wn(o,"style",u),jl(o,a.precedence,e),n.instance=o;case"stylesheet":u=gs(a.href);var f=e.querySelector(Co(u));if(f)return n.state.loading|=4,n.instance=f,un(f),f;o=m0(a),(u=yi.get(u))&&Kf(o,u),f=(e.ownerDocument||e).createElement("link"),un(f);var g=f;return g._p=new Promise(function(A,z){g.onload=A,g.onerror=z}),wn(f,"link",o),n.state.loading|=4,jl(f,a.precedence,e),n.instance=f;case"script":return f=_s(a.src),(u=e.querySelector(Do(f)))?(n.instance=u,un(u),u):(o=a,(u=yi.get(f))&&(o=v({},a),Qf(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),un(u),wn(u,"link",o),e.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(r(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,jl(o,a.precedence,e));return n.instance}function jl(e,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,f=u,g=0;g<o.length;g++){var A=o[g];if(A.dataset.precedence===n)f=A;else if(f!==u)break}f?f.parentNode.insertBefore(e,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function Kf(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function Qf(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var $l=null;function _0(e,n,a){if($l===null){var o=new Map,u=$l=new Map;u.set(a,o)}else u=$l,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var f=a[u];if(!(f[Da]||f[ln]||e==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var g=f.getAttribute(n)||"";g=e+g;var A=o.get(g);A?A.push(f):o.set(g,[f])}}return o}function v0(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function Mx(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(e=n.disabled,typeof n.precedence=="string"&&e==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function S0(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function Ex(e,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=gs(o.href),f=n.querySelector(Co(u));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=tu.bind(e),n.then(e,e)),a.state.loading|=4,a.instance=f,un(f);return}f=n.ownerDocument||n,o=m0(o),(u=yi.get(u))&&Kf(o,u),f=f.createElement("link"),un(f);var g=f;g._p=new Promise(function(A,z){g.onload=A,g.onerror=z}),wn(f,"link",o),a.instance=f}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=tu.bind(e),n.addEventListener("load",a),n.addEventListener("error",a))}}var Jf=0;function bx(e,n){return e.stylesheets&&e.count===0&&nu(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&nu(e,e.stylesheets),e.unsuspend){var f=e.unsuspend;e.unsuspend=null,f()}},6e4+n);0<e.imgBytes&&Jf===0&&(Jf=62500*ax());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&nu(e,e.stylesheets),e.unsuspend)){var f=e.unsuspend;e.unsuspend=null,f()}},(e.imgBytes>Jf?50:800)+n);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function tu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)nu(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var eu=null;function nu(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,eu=new Map,n.forEach(Tx,e),eu=null,tu.call(e))}function Tx(e,n){if(!(n.state.loading&4)){var a=eu.get(e);if(a)var o=a.get(null);else{a=new Map,eu.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<u.length;f++){var g=u[f];(g.nodeName==="LINK"||g.getAttribute("media")!=="not all")&&(a.set(g.dataset.precedence,g),o=g)}o&&a.set(null,o)}u=n.instance,g=u.getAttribute("data-precedence"),f=a.get(g)||o,f===o&&a.set(null,u),a.set(g,u),this.count++,o=tu.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),f?f.parentNode.insertBefore(u,f.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),n.state.loading|=4}}var wo={$$typeof:k,Provider:null,Consumer:null,_currentValue:ut,_currentValue2:ut,_threadCount:0};function Ax(e,n,a,o,u,f,g,A,z){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Kt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Kt(0),this.hiddenUpdates=Kt(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=f,this.onRecoverableError=g,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=z,this.incompleteTransitions=new Map}function x0(e,n,a,o,u,f,g,A,z,at,vt,yt){return e=new Ax(e,n,a,g,z,at,vt,yt,A),n=1,f===!0&&(n|=24),f=ei(3,null,null,n),e.current=f,f.stateNode=e,n=Dc(),n.refCount++,e.pooledCache=n,n.refCount++,f.memoizedState={element:o,isDehydrated:a,cache:n},Nc(f),e}function y0(e){return e?(e=Zr,e):Zr}function M0(e,n,a,o,u,f){u=y0(u),o.context===null?o.context=u:o.pendingContext=u,o=Fa(n),o.payload={element:a},f=f===void 0?null:f,f!==null&&(o.callback=f),a=Ha(e,o,n),a!==null&&(Zn(a,e,n),oo(a,e,n))}function E0(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function jf(e,n){E0(e,n),(e=e.alternate)&&E0(e,n)}function b0(e){if(e.tag===13||e.tag===31){var n=gr(e,67108864);n!==null&&Zn(n,e,67108864),jf(e,67108864)}}function T0(e){if(e.tag===13||e.tag===31){var n=si();n=Vs(n);var a=gr(e,n);a!==null&&Zn(a,e,n),jf(e,n)}}var iu=!0;function Rx(e,n,a,o){var u=I.T;I.T=null;var f=F.p;try{F.p=2,$f(e,n,a,o)}finally{F.p=f,I.T=u}}function Cx(e,n,a,o){var u=I.T;I.T=null;var f=F.p;try{F.p=8,$f(e,n,a,o)}finally{F.p=f,I.T=u}}function $f(e,n,a,o){if(iu){var u=th(o);if(u===null)Ff(e,n,o,au,a),R0(e,o);else if(wx(u,e,n,a,o))o.stopPropagation();else if(R0(e,o),n&4&&-1<Dx.indexOf(e)){for(;u!==null;){var f=ta(u);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var g=Ct(f.pendingLanes);if(g!==0){var A=f;for(A.pendingLanes|=2,A.entangledLanes|=2;g;){var z=1<<31-Gt(g);A.entanglements[1]|=z,g&=~z}Vi(f),(Ue&6)===0&&(Hl=Ne()+500,bo(0))}}break;case 31:case 13:A=gr(f,2),A!==null&&Zn(A,f,2),Vl(),jf(f,2)}if(f=th(o),f===null&&Ff(e,n,o,au,a),f===u)break;u=f}u!==null&&o.stopPropagation()}else Ff(e,n,o,null,a)}}function th(e){return e=ec(e),eh(e)}var au=null;function eh(e){if(au=null,e=$i(e),e!==null){var n=c(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=h(n),e!==null)return e;e=null}else if(a===31){if(e=p(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return au=e,null}function A0(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(De()){case N:return 2;case y:return 8;case K:case st:return 32;case dt:return 268435456;default:return 32}default:return 32}}var nh=!1,Ja=null,ja=null,$a=null,Uo=new Map,Lo=new Map,tr=[],Dx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function R0(e,n){switch(e){case"focusin":case"focusout":Ja=null;break;case"dragenter":case"dragleave":ja=null;break;case"mouseover":case"mouseout":$a=null;break;case"pointerover":case"pointerout":Uo.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Lo.delete(n.pointerId)}}function No(e,n,a,o,u,f){return e===null||e.nativeEvent!==f?(e={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:f,targetContainers:[u]},n!==null&&(n=ta(n),n!==null&&b0(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),e)}function wx(e,n,a,o,u){switch(n){case"focusin":return Ja=No(Ja,e,n,a,o,u),!0;case"dragenter":return ja=No(ja,e,n,a,o,u),!0;case"mouseover":return $a=No($a,e,n,a,o,u),!0;case"pointerover":var f=u.pointerId;return Uo.set(f,No(Uo.get(f)||null,e,n,a,o,u)),!0;case"gotpointercapture":return f=u.pointerId,Lo.set(f,No(Lo.get(f)||null,e,n,a,o,u)),!0}return!1}function C0(e){var n=$i(e.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){e.blockedOn=n,Gr(e.priority,function(){T0(a)});return}}else if(n===31){if(n=p(a),n!==null){e.blockedOn=n,Gr(e.priority,function(){T0(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ru(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=th(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);tc=o,a.target.dispatchEvent(o),tc=null}else return n=ta(a),n!==null&&b0(n),e.blockedOn=a,!1;n.shift()}return!0}function D0(e,n,a){ru(e)&&a.delete(n)}function Ux(){nh=!1,Ja!==null&&ru(Ja)&&(Ja=null),ja!==null&&ru(ja)&&(ja=null),$a!==null&&ru($a)&&($a=null),Uo.forEach(D0),Lo.forEach(D0)}function su(e,n){e.blockedOn===n&&(e.blockedOn=null,nh||(nh=!0,s.unstable_scheduleCallback(s.unstable_NormalPriority,Ux)))}var ou=null;function w0(e){ou!==e&&(ou=e,s.unstable_scheduleCallback(s.unstable_NormalPriority,function(){ou===e&&(ou=null);for(var n=0;n<e.length;n+=3){var a=e[n],o=e[n+1],u=e[n+2];if(typeof o!="function"){if(eh(o||a)===null)continue;break}var f=ta(a);f!==null&&(e.splice(n,3),n-=3,$c(f,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function vs(e){function n(z){return su(z,e)}Ja!==null&&su(Ja,e),ja!==null&&su(ja,e),$a!==null&&su($a,e),Uo.forEach(n),Lo.forEach(n);for(var a=0;a<tr.length;a++){var o=tr[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<tr.length&&(a=tr[0],a.blockedOn===null);)C0(a),a.blockedOn===null&&tr.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],f=a[o+1],g=u[An]||null;if(typeof f=="function")g||w0(a);else if(g){var A=null;if(f&&f.hasAttribute("formAction")){if(u=f,g=f[An]||null)A=g.formAction;else if(eh(u)!==null)continue}else A=g.action;typeof A=="function"?a[o+1]=A:(a.splice(o,3),o-=3),w0(a)}}}function U0(){function e(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(g){return u=g})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function ih(e){this._internalRoot=e}lu.prototype.render=ih.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(r(409));var a=n.current,o=si();M0(a,o,e,n,null,null)},lu.prototype.unmount=ih.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;M0(e.current,2,null,e,null,null),Vl(),n[Vn]=null}};function lu(e){this._internalRoot=e}lu.prototype.unstable_scheduleHydration=function(e){if(e){var n=Xs();e={blockedOn:null,target:e,priority:n};for(var a=0;a<tr.length&&n!==0&&n<tr[a].priority;a++);tr.splice(a,0,e),a===0&&C0(e)}};var L0=t.version;if(L0!=="19.2.8")throw Error(r(527,L0,"19.2.8"));F.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(r(188)):(e=Object.keys(e).join(","),Error(r(268,e)));return e=d(n),e=e!==null?x(e):null,e=e===null?null:e.stateNode,e};var Lx={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:I,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var uu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!uu.isDisabled&&uu.supportsFiber)try{pt=uu.inject(Lx),mt=uu}catch{}}return Oo.createRoot=function(e,n){if(!l(e))throw Error(r(299));var a=!1,o="",u=Fm,f=Hm,g=Gm;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(g=n.onRecoverableError)),n=x0(e,1,!1,null,null,a,o,null,u,f,g,U0),e[Vn]=n.current,zf(e),new ih(n)},Oo.hydrateRoot=function(e,n,a){if(!l(e))throw Error(r(299));var o=!1,u="",f=Fm,g=Hm,A=Gm,z=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(g=a.onCaughtError),a.onRecoverableError!==void 0&&(A=a.onRecoverableError),a.formState!==void 0&&(z=a.formState)),n=x0(e,1,!0,n,a??null,o,u,z,f,g,A,U0),n.context=y0(null),a=n.current,o=si(),o=Vs(o),u=Fa(o),u.callback=null,Ha(a,u,o),a=o,n.current.lanes=a,Wt(n,a),Vi(n),e[Vn]=n.current,zf(e),new lu(n)},Oo.version="19.2.8",Oo}var H0;function Gx(){if(H0)return rh.exports;H0=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(t){console.error(t)}}return s(),rh.exports=Hx(),rh.exports}var Vx=Gx();const Pd="186",Is={ROTATE:0,DOLLY:1,PAN:2},Os={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},kx=0,G0=1,Xx=2,Pu=1,Wx=2,Vo=3,Br=0,Jn=1,Ea=2,Ta=0,Xo=1,V0=2,k0=3,X0=4,qx=5,Ns=100,Yx=101,Zx=102,Kx=103,Qx=104,Jx=200,jx=201,$x=202,ty=203,k_=204,X_=205,ey=206,ny=207,iy=208,ay=209,ry=210,sy=211,oy=212,ly=213,uy=214,Xh=0,Wh=1,qh=2,Wo=3,Yh=4,Zh=5,Kh=6,Qh=7,W_=0,cy=1,fy=2,Pi=0,q_=1,Y_=2,Z_=3,K_=4,Q_=5,J_=6,j_=7,$_=300,zr=301,Fs=302,uh=303,ch=304,Zu=306,Jh=1e3,ba=1001,jh=1002,Ln=1003,hy=1004,cu=1005,Tn=1006,fh=1007,Pr=1008,ci=1009,tv=1010,ev=1011,qo=1012,Id=1013,Ki=1014,qi=1015,Ii=1016,Bd=1017,zd=1018,Yo=1020,nv=35902,iv=35899,av=1021,rv=1022,bi=1023,Ca=1026,Ir=1027,sv=1028,Fd=1029,Fr=1030,Hd=1031,Gd=1033,Iu=33776,Bu=33777,zu=33778,Fu=33779,$h=35840,td=35841,ed=35842,nd=35843,id=36196,ad=37492,rd=37496,sd=37488,od=37489,Vu=37490,ld=37491,ud=37808,cd=37809,fd=37810,hd=37811,dd=37812,pd=37813,md=37814,gd=37815,_d=37816,vd=37817,Sd=37818,xd=37819,yd=37820,Md=37821,Ed=36492,bd=36494,Td=36495,Ad=36283,Rd=36284,ku=36285,Cd=36286,dy=3200,W0=0,py=1,or="",ui="srgb",Zo="srgb-linear",Xu="linear",Be="srgb",hh=7680,my=519,gy=512,_y=513,vy=514,Vd=515,Sy=516,xy=517,kd=518,yy=519,My=35044,Dd="300 es",Yi=2e3,Wu=2001;function Ey(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function qu(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function by(){const s=qu("canvas");return s.style.display="block",s}const q0={};function Y0(...s){const t="THREE."+s.shift();console.log(t,...s)}function ov(s){const t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){const i=s[1];i&&i.isStackTrace?s[0]+=" "+i.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function ne(...s){s=ov(s);const t="THREE."+s.shift();{const i=s[0];i&&i.isStackTrace?console.warn(i.getError(t)):console.warn(t,...s)}}function Ce(...s){s=ov(s);const t="THREE."+s.shift();{const i=s[0];i&&i.isStackTrace?console.error(i.getError(t)):console.error(t,...s)}}function Bs(...s){const t=s.join(" ");t in q0||(q0[t]=!0,ne(...s))}function Ty(s,t,i){return new Promise(function(r,l){function c(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:l();break;case s.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:r()}}setTimeout(c,i)})}const Ay={[Xh]:Wh,[qh]:Kh,[Yh]:Qh,[Wo]:Zh,[Wh]:Xh,[Kh]:qh,[Qh]:Yh,[Zh]:Wo};class ur{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[t]===void 0&&(r[t]=[]),r[t].indexOf(i)===-1&&r[t].push(i)}hasEventListener(t,i){const r=this._listeners;return r===void 0?!1:r[t]!==void 0&&r[t].indexOf(i)!==-1}removeEventListener(t,i){const r=this._listeners;if(r===void 0)return;const l=r[t];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(t){const i=this._listeners;if(i===void 0)return;const r=i[t.type];if(r!==void 0){t.target=this;const l=r.slice(0);for(let c=0,h=l.length;c<h;c++)l[c].call(this,t);t.target=null}}}const On=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Hu=Math.PI/180,wd=180/Math.PI;function Qo(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(On[s&255]+On[s>>8&255]+On[s>>16&255]+On[s>>24&255]+"-"+On[t&255]+On[t>>8&255]+"-"+On[t>>16&15|64]+On[t>>24&255]+"-"+On[i&63|128]+On[i>>8&255]+"-"+On[i>>16&255]+On[i>>24&255]+On[r&255]+On[r>>8&255]+On[r>>16&255]+On[r>>24&255]).toLowerCase()}function ve(s,t,i){return Math.max(t,Math.min(i,s))}function Ry(s,t){return(s%t+t)%t}function dh(s,t,i){return(1-i)*s+i*t}function Po(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Kn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Cy={DEG2RAD:Hu},Qd=class Qd{constructor(t=0,i=0){this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,r=this.y,l=t.elements;return this.x=l[0]*i+l[3]*r+l[6],this.y=l[1]*i+l[4]*r+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=ve(this.x,t.x,i.x),this.y=ve(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=ve(this.x,t,i),this.y=ve(this.y,t,i),this}clampLength(t,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(ve(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(t)/i;return Math.acos(ve(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,r=this.y-t.y;return i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const r=Math.cos(i),l=Math.sin(i),c=this.x-t.x,h=this.y-t.y;return this.x=c*r-h*l+t.x,this.y=c*l+h*r+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Qd.prototype.isVector2=!0;let ie=Qd;class lr{constructor(t=0,i=0,r=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=r,this._w=l}static slerpFlat(t,i,r,l,c,h,p){let m=r[l+0],d=r[l+1],x=r[l+2],v=r[l+3],_=c[h+0],E=c[h+1],R=c[h+2],O=c[h+3];if(v!==O||m!==_||d!==E||x!==R){let M=m*_+d*E+x*R+v*O;M<0&&(_=-_,E=-E,R=-R,O=-O,M=-M);let S=1-p;if(M<.9995){const B=Math.acos(M),k=Math.sin(B);S=Math.sin(S*B)/k,p=Math.sin(p*B)/k,m=m*S+_*p,d=d*S+E*p,x=x*S+R*p,v=v*S+O*p}else{m=m*S+_*p,d=d*S+E*p,x=x*S+R*p,v=v*S+O*p;const B=1/Math.sqrt(m*m+d*d+x*x+v*v);m*=B,d*=B,x*=B,v*=B}}t[i]=m,t[i+1]=d,t[i+2]=x,t[i+3]=v}static multiplyQuaternionsFlat(t,i,r,l,c,h){const p=r[l],m=r[l+1],d=r[l+2],x=r[l+3],v=c[h],_=c[h+1],E=c[h+2],R=c[h+3];return t[i]=p*R+x*v+m*E-d*_,t[i+1]=m*R+x*_+d*v-p*E,t[i+2]=d*R+x*E+p*_-m*v,t[i+3]=x*R-p*v-m*_-d*E,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,r,l){return this._x=t,this._y=i,this._z=r,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const r=t._x,l=t._y,c=t._z,h=t._order,p=Math.cos,m=Math.sin,d=p(r/2),x=p(l/2),v=p(c/2),_=m(r/2),E=m(l/2),R=m(c/2);switch(h){case"XYZ":this._x=_*x*v+d*E*R,this._y=d*E*v-_*x*R,this._z=d*x*R+_*E*v,this._w=d*x*v-_*E*R;break;case"YXZ":this._x=_*x*v+d*E*R,this._y=d*E*v-_*x*R,this._z=d*x*R-_*E*v,this._w=d*x*v+_*E*R;break;case"ZXY":this._x=_*x*v-d*E*R,this._y=d*E*v+_*x*R,this._z=d*x*R+_*E*v,this._w=d*x*v-_*E*R;break;case"ZYX":this._x=_*x*v-d*E*R,this._y=d*E*v+_*x*R,this._z=d*x*R-_*E*v,this._w=d*x*v+_*E*R;break;case"YZX":this._x=_*x*v+d*E*R,this._y=d*E*v+_*x*R,this._z=d*x*R-_*E*v,this._w=d*x*v-_*E*R;break;case"XZY":this._x=_*x*v-d*E*R,this._y=d*E*v-_*x*R,this._z=d*x*R+_*E*v,this._w=d*x*v+_*E*R;break;default:ne("Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const r=i/2,l=Math.sin(r);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,r=i[0],l=i[4],c=i[8],h=i[1],p=i[5],m=i[9],d=i[2],x=i[6],v=i[10],_=r+p+v;if(_>0){const E=.5/Math.sqrt(_+1);this._w=.25/E,this._x=(x-m)*E,this._y=(c-d)*E,this._z=(h-l)*E}else if(r>p&&r>v){const E=2*Math.sqrt(1+r-p-v);this._w=(x-m)/E,this._x=.25*E,this._y=(l+h)/E,this._z=(c+d)/E}else if(p>v){const E=2*Math.sqrt(1+p-r-v);this._w=(c-d)/E,this._x=(l+h)/E,this._y=.25*E,this._z=(m+x)/E}else{const E=2*Math.sqrt(1+v-r-p);this._w=(h-l)/E,this._x=(c+d)/E,this._y=(m+x)/E,this._z=.25*E}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let r=t.dot(i)+1;return r<1e-8?(r=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=r):(this._x=0,this._y=-t.z,this._z=t.y,this._w=r)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=r),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ve(this.dot(t),-1,1)))}rotateTowards(t,i){const r=this.angleTo(t);if(r===0)return this;const l=Math.min(1,i/r);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const r=t._x,l=t._y,c=t._z,h=t._w,p=i._x,m=i._y,d=i._z,x=i._w;return this._x=r*x+h*p+l*d-c*m,this._y=l*x+h*m+c*p-r*d,this._z=c*x+h*d+r*m-l*p,this._w=h*x-r*p-l*m-c*d,this._onChangeCallback(),this}slerp(t,i){let r=t._x,l=t._y,c=t._z,h=t._w,p=this.dot(t);p<0&&(r=-r,l=-l,c=-c,h=-h,p=-p);let m=1-i;if(p<.9995){const d=Math.acos(p),x=Math.sin(d);m=Math.sin(m*d)/x,i=Math.sin(i*d)/x,this._x=this._x*m+r*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+h*i,this._onChangeCallback()}else this._x=this._x*m+r*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+h*i,this.normalize();return this}slerpQuaternions(t,i,r){return this.copy(t).slerp(i,r)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),r=Math.random(),l=Math.sqrt(1-r),c=Math.sqrt(r);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(i),c*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Jd=class Jd{constructor(t=0,i=0,r=0){this.x=t,this.y=i,this.z=r}set(t,i,r){return r===void 0&&(r=this.z),this.x=t,this.y=i,this.z=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(Z0.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(Z0.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,r=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[3]*r+c[6]*l,this.y=c[1]*i+c[4]*r+c[7]*l,this.z=c[2]*i+c[5]*r+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,r=this.y,l=this.z,c=t.elements,h=1/(c[3]*i+c[7]*r+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*r+c[8]*l+c[12])*h,this.y=(c[1]*i+c[5]*r+c[9]*l+c[13])*h,this.z=(c[2]*i+c[6]*r+c[10]*l+c[14])*h,this}applyQuaternion(t){const i=this.x,r=this.y,l=this.z,c=t.x,h=t.y,p=t.z,m=t.w,d=2*(h*l-p*r),x=2*(p*i-c*l),v=2*(c*r-h*i);return this.x=i+m*d+h*v-p*x,this.y=r+m*x+p*d-c*v,this.z=l+m*v+c*x-h*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,r=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[4]*r+c[8]*l,this.y=c[1]*i+c[5]*r+c[9]*l,this.z=c[2]*i+c[6]*r+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=ve(this.x,t.x,i.x),this.y=ve(this.y,t.y,i.y),this.z=ve(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=ve(this.x,t,i),this.y=ve(this.y,t,i),this.z=ve(this.z,t,i),this}clampLength(t,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(ve(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const r=t.x,l=t.y,c=t.z,h=i.x,p=i.y,m=i.z;return this.x=l*m-c*p,this.y=c*h-r*m,this.z=r*p-l*h,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const r=t.dot(this)/i;return this.copy(t).multiplyScalar(r)}projectOnPlane(t){return ph.copy(this).projectOnVector(t),this.sub(ph)}reflect(t){return this.sub(ph.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(t)/i;return Math.acos(ve(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,r=this.y-t.y,l=this.z-t.z;return i*i+r*r+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,r){const l=Math.sin(i)*t;return this.x=l*Math.sin(r),this.y=Math.cos(i)*t,this.z=l*Math.cos(r),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,r){return this.x=t*Math.sin(i),this.y=r,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),r=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=r,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(t),this.y=i,this.z=r*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Jd.prototype.isVector3=!0;let nt=Jd;const ph=new nt,Z0=new lr,jd=class jd{constructor(t,i,r,l,c,h,p,m,d){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,r,l,c,h,p,m,d)}set(t,i,r,l,c,h,p,m,d){const x=this.elements;return x[0]=t,x[1]=l,x[2]=p,x[3]=i,x[4]=c,x[5]=m,x[6]=r,x[7]=h,x[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(t,i,r){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const r=t.elements,l=i.elements,c=this.elements,h=r[0],p=r[3],m=r[6],d=r[1],x=r[4],v=r[7],_=r[2],E=r[5],R=r[8],O=l[0],M=l[3],S=l[6],B=l[1],k=l[4],U=l[7],C=l[2],D=l[5],L=l[8];return c[0]=h*O+p*B+m*C,c[3]=h*M+p*k+m*D,c[6]=h*S+p*U+m*L,c[1]=d*O+x*B+v*C,c[4]=d*M+x*k+v*D,c[7]=d*S+x*U+v*L,c[2]=_*O+E*B+R*C,c[5]=_*M+E*k+R*D,c[8]=_*S+E*U+R*L,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],r=t[1],l=t[2],c=t[3],h=t[4],p=t[5],m=t[6],d=t[7],x=t[8];return i*h*x-i*p*d-r*c*x+r*p*m+l*c*d-l*h*m}invert(){const t=this.elements,i=t[0],r=t[1],l=t[2],c=t[3],h=t[4],p=t[5],m=t[6],d=t[7],x=t[8],v=x*h-p*d,_=p*m-x*c,E=d*c-h*m,R=i*v+r*_+l*E;if(R===0)return this.set(0,0,0,0,0,0,0,0,0);const O=1/R;return t[0]=v*O,t[1]=(l*d-x*r)*O,t[2]=(p*r-l*h)*O,t[3]=_*O,t[4]=(x*i-l*m)*O,t[5]=(l*c-p*i)*O,t[6]=E*O,t[7]=(r*m-d*i)*O,t[8]=(h*i-r*c)*O,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,r,l,c,h,p){const m=Math.cos(c),d=Math.sin(c);return this.set(r*m,r*d,-r*(m*h+d*p)+h+t,-l*d,l*m,-l*(-d*h+m*p)+p+i,0,0,1),this}scale(t,i){return Bs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(mh.makeScale(t,i)),this}rotate(t){return Bs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(mh.makeRotation(-t)),this}translate(t,i){return Bs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(mh.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,r=t.elements;for(let l=0;l<9;l++)if(i[l]!==r[l])return!1;return!0}fromArray(t,i=0){for(let r=0;r<9;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){const r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t}clone(){return new this.constructor().fromArray(this.elements)}};jd.prototype.isMatrix3=!0;let re=jd;const mh=new re,K0=new re().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Q0=new re().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Dy(){const s={enabled:!0,workingColorSpace:Zo,spaces:{},convert:function(l,c,h){return this.enabled===!1||c===h||!c||!h||(this.spaces[c].transfer===Be&&(l.r=Aa(l.r),l.g=Aa(l.g),l.b=Aa(l.b)),this.spaces[c].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Be&&(l.r=zs(l.r),l.g=zs(l.g),l.b=zs(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===or?Xu:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,h){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return Bs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return Bs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(l,c)}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[Zo]:{primaries:t,whitePoint:r,transfer:Xu,toXYZ:K0,fromXYZ:Q0,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:ui},outputColorSpaceConfig:{drawingBufferColorSpace:ui}},[ui]:{primaries:t,whitePoint:r,transfer:Be,toXYZ:K0,fromXYZ:Q0,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:ui}}}),s}const Ee=Dy();function Aa(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function zs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Ss;class wy{static getDataURL(t,i="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let r;if(t instanceof HTMLCanvasElement)r=t;else{Ss===void 0&&(Ss=qu("canvas")),Ss.width=t.width,Ss.height=t.height;const l=Ss.getContext("2d");t instanceof ImageData?l.putImageData(t,0,0):l.drawImage(t,0,0,t.width,t.height),r=Ss}return r.toDataURL(i)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=qu("canvas");i.width=t.width,i.height=t.height;const r=i.getContext("2d");r.drawImage(t,0,0,t.width,t.height);const l=r.getImageData(0,0,t.width,t.height),c=l.data;for(let h=0;h<c.length;h++)c[h]=Aa(c[h]/255)*255;return r.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let r=0;r<i.length;r++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[r]=Math.floor(Aa(i[r]/255)*255):i[r]=Aa(i[r]);return{data:i,width:t.width,height:t.height}}else return ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Uy=0;class Xd{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Uy++}),this.uuid=Qo(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?t.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?t.set(i.displayWidth,i.displayHeight,0):i!==null?t.set(i.width,i.height,i.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const r={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let h=0,p=l.length;h<p;h++)l[h].isDataTexture?c.push(gh(l[h].image)):c.push(gh(l[h]))}else c=gh(l);r.url=c}return i||(t.images[this.uuid]=r),r}}function gh(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?wy.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(ne("Texture: Unable to serialize Texture."),{})}let Ly=0;const _h=new nt;class Hn extends ur{constructor(t=Hn.DEFAULT_IMAGE,i=Hn.DEFAULT_MAPPING,r=ba,l=ba,c=Tn,h=Pr,p=bi,m=ci,d=Hn.DEFAULT_ANISOTROPY,x=or){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ly++}),this.uuid=Qo(),this.name="",this.source=new Xd(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=l,this.magFilter=c,this.minFilter=h,this.anisotropy=d,this.format=p,this.internalFormat=null,this.type=m,this.offset=new ie(0,0),this.repeat=new ie(1,1),this.center=new ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new re,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=x,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(_h).x}get height(){return this.source.getSize(_h).y}get depth(){return this.source.getSize(_h).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const i in t){const r=t[i];if(r===void 0){ne(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ne(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&r&&l.isVector2&&r.isVector2||l&&r&&l.isVector3&&r.isVector3||l&&r&&l.isMatrix3&&r.isMatrix3?l.copy(r):this[i]=r}}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==$_)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Jh:t.x=t.x-Math.floor(t.x);break;case ba:t.x=t.x<0?0:1;break;case jh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Jh:t.y=t.y-Math.floor(t.y);break;case ba:t.y=t.y<0?0:1;break;case jh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Hn.DEFAULT_IMAGE=null;Hn.DEFAULT_MAPPING=$_;Hn.DEFAULT_ANISOTROPY=1;const $d=class $d{constructor(t=0,i=0,r=0,l=1){this.x=t,this.y=i,this.z=r,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,r,l){return this.x=t,this.y=i,this.z=r,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,r=this.y,l=this.z,c=this.w,h=t.elements;return this.x=h[0]*i+h[4]*r+h[8]*l+h[12]*c,this.y=h[1]*i+h[5]*r+h[9]*l+h[13]*c,this.z=h[2]*i+h[6]*r+h[10]*l+h[14]*c,this.w=h[3]*i+h[7]*r+h[11]*l+h[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,r,l,c;const m=t.elements,d=m[0],x=m[4],v=m[8],_=m[1],E=m[5],R=m[9],O=m[2],M=m[6],S=m[10];if(Math.abs(x-_)<.01&&Math.abs(v-O)<.01&&Math.abs(R-M)<.01){if(Math.abs(x+_)<.1&&Math.abs(v+O)<.1&&Math.abs(R+M)<.1&&Math.abs(d+E+S-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const k=(d+1)/2,U=(E+1)/2,C=(S+1)/2,D=(x+_)/4,L=(v+O)/4,b=(R+M)/4;return k>U&&k>C?k<.01?(r=0,l=.707106781,c=.707106781):(r=Math.sqrt(k),l=D/r,c=L/r):U>C?U<.01?(r=.707106781,l=0,c=.707106781):(l=Math.sqrt(U),r=D/l,c=b/l):C<.01?(r=.707106781,l=.707106781,c=0):(c=Math.sqrt(C),r=L/c,l=b/c),this.set(r,l,c,i),this}let B=Math.sqrt((M-R)*(M-R)+(v-O)*(v-O)+(_-x)*(_-x));return Math.abs(B)<.001&&(B=1),this.x=(M-R)/B,this.y=(v-O)/B,this.z=(_-x)/B,this.w=Math.acos((d+E+S-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=ve(this.x,t.x,i.x),this.y=ve(this.y,t.y,i.y),this.z=ve(this.z,t.z,i.z),this.w=ve(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=ve(this.x,t,i),this.y=ve(this.y,t,i),this.z=ve(this.z,t,i),this.w=ve(this.w,t,i),this}clampLength(t,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(ve(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this.w=t.w+(i.w-t.w)*r,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};$d.prototype.isVector4=!0;let rn=$d;class Ny extends ur{constructor(t=1,i=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Tn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},r),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=r.depth,this.scissor=new rn(0,0,t,i),this.scissorTest=!1,this.viewport=new rn(0,0,t,i),this.textures=[];const l={width:t,height:i,depth:r.depth},c=new Hn(l),h=r.count;for(let p=0;p<h;p++)this.textures[p]=c.clone(),this.textures[p].isRenderTargetTexture=!0,this.textures[p].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveColorBuffer=r.resolveColorBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this.storeMultisampledColorBuffer=r.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=r.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=r.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview,this.useArrayDepthTexture=r.useArrayDepthTexture}_setTextureOptions(t={}){const i={minFilter:Tn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(i.mapping=t.mapping),t.wrapS!==void 0&&(i.wrapS=t.wrapS),t.wrapT!==void 0&&(i.wrapT=t.wrapT),t.wrapR!==void 0&&(i.wrapR=t.wrapR),t.magFilter!==void 0&&(i.magFilter=t.magFilter),t.minFilter!==void 0&&(i.minFilter=t.minFilter),t.format!==void 0&&(i.format=t.format),t.type!==void 0&&(i.type=t.type),t.anisotropy!==void 0&&(i.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(i.colorSpace=t.colorSpace),t.flipY!==void 0&&(i.flipY=t.flipY),t.generateMipmaps!==void 0&&(i.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(i.internalFormat=t.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(i)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,i,r=1){if(this.width!==t||this.height!==i||this.depth!==r){this.width=t,this.height=i,this.depth=r;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=r,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++){this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},t.textures[i].image);this.textures[i].source=new Xd(l)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const i=t.depthTexture.clone();i.renderTarget=null,this.depthTexture=i}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ti extends Ny{constructor(t=1,i=1,r={}){super(t,i,r),this.isWebGLRenderTarget=!0}}class lv extends Hn{constructor(t=null,i=1,r=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:r,depth:l},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=ba,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Oy extends Hn{constructor(t=null,i=1,r=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:r,depth:l},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=ba,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const Yu=class Yu{constructor(t,i,r,l,c,h,p,m,d,x,v,_,E,R,O,M){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,r,l,c,h,p,m,d,x,v,_,E,R,O,M)}set(t,i,r,l,c,h,p,m,d,x,v,_,E,R,O,M){const S=this.elements;return S[0]=t,S[4]=i,S[8]=r,S[12]=l,S[1]=c,S[5]=h,S[9]=p,S[13]=m,S[2]=d,S[6]=x,S[10]=v,S[14]=_,S[3]=E,S[7]=R,S[11]=O,S[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Yu().fromArray(this.elements)}copy(t){const i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(t){const i=this.elements,r=t.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,r){return this.determinantAffine()===0?(t.set(1,0,0),i.set(0,1,0),r.set(0,0,1),this):(t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this)}makeBasis(t,i,r){return this.set(t.x,i.x,r.x,0,t.y,i.y,r.y,0,t.z,i.z,r.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const i=this.elements,r=t.elements,l=1/xs.setFromMatrixColumn(t,0).length(),c=1/xs.setFromMatrixColumn(t,1).length(),h=1/xs.setFromMatrixColumn(t,2).length();return i[0]=r[0]*l,i[1]=r[1]*l,i[2]=r[2]*l,i[3]=0,i[4]=r[4]*c,i[5]=r[5]*c,i[6]=r[6]*c,i[7]=0,i[8]=r[8]*h,i[9]=r[9]*h,i[10]=r[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,r=t.x,l=t.y,c=t.z,h=Math.cos(r),p=Math.sin(r),m=Math.cos(l),d=Math.sin(l),x=Math.cos(c),v=Math.sin(c);if(t.order==="XYZ"){const _=h*x,E=h*v,R=p*x,O=p*v;i[0]=m*x,i[4]=-m*v,i[8]=d,i[1]=E+R*d,i[5]=_-O*d,i[9]=-p*m,i[2]=O-_*d,i[6]=R+E*d,i[10]=h*m}else if(t.order==="YXZ"){const _=m*x,E=m*v,R=d*x,O=d*v;i[0]=_+O*p,i[4]=R*p-E,i[8]=h*d,i[1]=h*v,i[5]=h*x,i[9]=-p,i[2]=E*p-R,i[6]=O+_*p,i[10]=h*m}else if(t.order==="ZXY"){const _=m*x,E=m*v,R=d*x,O=d*v;i[0]=_-O*p,i[4]=-h*v,i[8]=R+E*p,i[1]=E+R*p,i[5]=h*x,i[9]=O-_*p,i[2]=-h*d,i[6]=p,i[10]=h*m}else if(t.order==="ZYX"){const _=h*x,E=h*v,R=p*x,O=p*v;i[0]=m*x,i[4]=R*d-E,i[8]=_*d+O,i[1]=m*v,i[5]=O*d+_,i[9]=E*d-R,i[2]=-d,i[6]=p*m,i[10]=h*m}else if(t.order==="YZX"){const _=h*m,E=h*d,R=p*m,O=p*d;i[0]=m*x,i[4]=O-_*v,i[8]=R*v+E,i[1]=v,i[5]=h*x,i[9]=-p*x,i[2]=-d*x,i[6]=E*v+R,i[10]=_-O*v}else if(t.order==="XZY"){const _=h*m,E=h*d,R=p*m,O=p*d;i[0]=m*x,i[4]=-v,i[8]=d*x,i[1]=_*v+O,i[5]=h*x,i[9]=E*v-R,i[2]=R*v-E,i[6]=p*x,i[10]=O*v+_}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Py,t,Iy)}lookAt(t,i,r){const l=this.elements;return oi.subVectors(t,i),oi.lengthSq()===0&&(oi.z=1),oi.normalize(),nr.crossVectors(r,oi),nr.lengthSq()===0&&(Math.abs(r.z)===1?oi.x+=1e-4:oi.z+=1e-4,oi.normalize(),nr.crossVectors(r,oi)),nr.normalize(),fu.crossVectors(oi,nr),l[0]=nr.x,l[4]=fu.x,l[8]=oi.x,l[1]=nr.y,l[5]=fu.y,l[9]=oi.y,l[2]=nr.z,l[6]=fu.z,l[10]=oi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const r=t.elements,l=i.elements,c=this.elements,h=r[0],p=r[4],m=r[8],d=r[12],x=r[1],v=r[5],_=r[9],E=r[13],R=r[2],O=r[6],M=r[10],S=r[14],B=r[3],k=r[7],U=r[11],C=r[15],D=l[0],L=l[4],b=l[8],P=l[12],W=l[1],q=l[5],Q=l[9],lt=l[13],Y=l[2],j=l[6],I=l[10],F=l[14],ut=l[3],rt=l[7],ht=l[11],w=l[15];return c[0]=h*D+p*W+m*Y+d*ut,c[4]=h*L+p*q+m*j+d*rt,c[8]=h*b+p*Q+m*I+d*ht,c[12]=h*P+p*lt+m*F+d*w,c[1]=x*D+v*W+_*Y+E*ut,c[5]=x*L+v*q+_*j+E*rt,c[9]=x*b+v*Q+_*I+E*ht,c[13]=x*P+v*lt+_*F+E*w,c[2]=R*D+O*W+M*Y+S*ut,c[6]=R*L+O*q+M*j+S*rt,c[10]=R*b+O*Q+M*I+S*ht,c[14]=R*P+O*lt+M*F+S*w,c[3]=B*D+k*W+U*Y+C*ut,c[7]=B*L+k*q+U*j+C*rt,c[11]=B*b+k*Q+U*I+C*ht,c[15]=B*P+k*lt+U*F+C*w,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],r=t[4],l=t[8],c=t[12],h=t[1],p=t[5],m=t[9],d=t[13],x=t[2],v=t[6],_=t[10],E=t[14],R=t[3],O=t[7],M=t[11],S=t[15],B=m*E-d*_,k=p*E-d*v,U=p*_-m*v,C=h*E-d*x,D=h*_-m*x,L=h*v-p*x;return i*(O*B-M*k+S*U)-r*(R*B-M*C+S*D)+l*(R*k-O*C+S*L)-c*(R*U-O*D+M*L)}determinantAffine(){const t=this.elements,i=t[0],r=t[4],l=t[8],c=t[1],h=t[5],p=t[9],m=t[2],d=t[6],x=t[10];return i*(h*x-p*d)-r*(c*x-p*m)+l*(c*d-h*m)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,r){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=r),this}invert(){const t=this.elements,i=t[0],r=t[1],l=t[2],c=t[3],h=t[4],p=t[5],m=t[6],d=t[7],x=t[8],v=t[9],_=t[10],E=t[11],R=t[12],O=t[13],M=t[14],S=t[15],B=i*p-r*h,k=i*m-l*h,U=i*d-c*h,C=r*m-l*p,D=r*d-c*p,L=l*d-c*m,b=x*O-v*R,P=x*M-_*R,W=x*S-E*R,q=v*M-_*O,Q=v*S-E*O,lt=_*S-E*M,Y=B*lt-k*Q+U*q+C*W-D*P+L*b;if(Y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const j=1/Y;return t[0]=(p*lt-m*Q+d*q)*j,t[1]=(l*Q-r*lt-c*q)*j,t[2]=(O*L-M*D+S*C)*j,t[3]=(_*D-v*L-E*C)*j,t[4]=(m*W-h*lt-d*P)*j,t[5]=(i*lt-l*W+c*P)*j,t[6]=(M*U-R*L-S*k)*j,t[7]=(x*L-_*U+E*k)*j,t[8]=(h*Q-p*W+d*b)*j,t[9]=(r*W-i*Q-c*b)*j,t[10]=(R*D-O*U+S*B)*j,t[11]=(v*U-x*D-E*B)*j,t[12]=(p*P-h*q-m*b)*j,t[13]=(i*q-r*P+l*b)*j,t[14]=(O*k-R*C-M*B)*j,t[15]=(x*C-v*k+_*B)*j,this}scale(t){const i=this.elements,r=t.x,l=t.y,c=t.z;return i[0]*=r,i[4]*=l,i[8]*=c,i[1]*=r,i[5]*=l,i[9]*=c,i[2]*=r,i[6]*=l,i[10]*=c,i[3]*=r,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],r=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,r,l))}makeTranslation(t,i,r){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),r=Math.sin(t);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),r=Math.sin(t);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const r=Math.cos(i),l=Math.sin(i),c=1-r,h=t.x,p=t.y,m=t.z,d=c*h,x=c*p;return this.set(d*h+r,d*p-l*m,d*m+l*p,0,d*p+l*m,x*p+r,x*m-l*h,0,d*m-l*p,x*m+l*h,c*m*m+r,0,0,0,0,1),this}makeScale(t,i,r){return this.set(t,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(t,i,r,l,c,h){return this.set(1,r,c,0,t,1,h,0,i,l,1,0,0,0,0,1),this}compose(t,i,r){const l=this.elements,c=i._x,h=i._y,p=i._z,m=i._w,d=c+c,x=h+h,v=p+p,_=c*d,E=c*x,R=c*v,O=h*x,M=h*v,S=p*v,B=m*d,k=m*x,U=m*v,C=r.x,D=r.y,L=r.z;return l[0]=(1-(O+S))*C,l[1]=(E+U)*C,l[2]=(R-k)*C,l[3]=0,l[4]=(E-U)*D,l[5]=(1-(_+S))*D,l[6]=(M+B)*D,l[7]=0,l[8]=(R+k)*L,l[9]=(M-B)*L,l[10]=(1-(_+O))*L,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,r){const l=this.elements;t.x=l[12],t.y=l[13],t.z=l[14];const c=this.determinantAffine();if(c===0)return r.set(1,1,1),i.identity(),this;let h=xs.set(l[0],l[1],l[2]).length();const p=xs.set(l[4],l[5],l[6]).length(),m=xs.set(l[8],l[9],l[10]).length();c<0&&(h=-h),wi.copy(this);const d=1/h,x=1/p,v=1/m;return wi.elements[0]*=d,wi.elements[1]*=d,wi.elements[2]*=d,wi.elements[4]*=x,wi.elements[5]*=x,wi.elements[6]*=x,wi.elements[8]*=v,wi.elements[9]*=v,wi.elements[10]*=v,i.setFromRotationMatrix(wi),r.x=h,r.y=p,r.z=m,this}makePerspective(t,i,r,l,c,h,p=Yi,m=!1){const d=this.elements,x=2*c/(i-t),v=2*c/(r-l),_=(i+t)/(i-t),E=(r+l)/(r-l);let R,O;if(m)R=c/(h-c),O=h*c/(h-c);else if(p===Yi)R=-(h+c)/(h-c),O=-2*h*c/(h-c);else if(p===Wu)R=-h/(h-c),O=-h*c/(h-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+p);return d[0]=x,d[4]=0,d[8]=_,d[12]=0,d[1]=0,d[5]=v,d[9]=E,d[13]=0,d[2]=0,d[6]=0,d[10]=R,d[14]=O,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(t,i,r,l,c,h,p=Yi,m=!1){const d=this.elements,x=2/(i-t),v=2/(r-l),_=-(i+t)/(i-t),E=-(r+l)/(r-l);let R,O;if(m)R=1/(h-c),O=h/(h-c);else if(p===Yi)R=-2/(h-c),O=-(h+c)/(h-c);else if(p===Wu)R=-1/(h-c),O=-c/(h-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+p);return d[0]=x,d[4]=0,d[8]=0,d[12]=_,d[1]=0,d[5]=v,d[9]=0,d[13]=E,d[2]=0,d[6]=0,d[10]=R,d[14]=O,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(t){const i=this.elements,r=t.elements;for(let l=0;l<16;l++)if(i[l]!==r[l])return!1;return!0}fromArray(t,i=0){for(let r=0;r<16;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){const r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t[i+9]=r[9],t[i+10]=r[10],t[i+11]=r[11],t[i+12]=r[12],t[i+13]=r[13],t[i+14]=r[14],t[i+15]=r[15],t}};Yu.prototype.isMatrix4=!0;let gn=Yu;const xs=new nt,wi=new gn,Py=new nt(0,0,0),Iy=new nt(1,1,1),nr=new nt,fu=new nt,oi=new nt,J0=new gn,j0=new lr;class Hr{constructor(t=0,i=0,r=0,l=Hr.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,l=this._order){return this._x=t,this._y=i,this._z=r,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){const l=t.elements,c=l[0],h=l[4],p=l[8],m=l[1],d=l[5],x=l[9],v=l[2],_=l[6],E=l[10];switch(i){case"XYZ":this._y=Math.asin(ve(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-x,E),this._z=Math.atan2(-h,c)):(this._x=Math.atan2(_,d),this._z=0);break;case"YXZ":this._x=Math.asin(-ve(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(p,E),this._z=Math.atan2(m,d)):(this._y=Math.atan2(-v,c),this._z=0);break;case"ZXY":this._x=Math.asin(ve(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(-v,E),this._z=Math.atan2(-h,d)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-ve(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(_,E),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-h,d));break;case"YZX":this._z=Math.asin(ve(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-x,d),this._y=Math.atan2(-v,c)):(this._x=0,this._y=Math.atan2(p,E));break;case"XZY":this._z=Math.asin(-ve(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(_,d),this._y=Math.atan2(p,c)):(this._x=Math.atan2(-x,E),this._y=0);break;default:ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return J0.makeRotationFromQuaternion(t),this.setFromRotationMatrix(J0,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return j0.setFromEuler(this),this.setFromQuaternion(j0,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Hr.DEFAULT_ORDER="XYZ";class uv{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let By=0;const $0=new nt,ys=new lr,_a=new gn,hu=new nt,Io=new nt,zy=new nt,Fy=new lr,t_=new nt(1,0,0),e_=new nt(0,1,0),n_=new nt(0,0,1),i_={type:"added"},Hy={type:"removed"},Ms={type:"childadded",child:null},vh={type:"childremoved",child:null};class fi extends ur{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:By++}),this.uuid=Qo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=fi.DEFAULT_UP.clone();const t=new nt,i=new Hr,r=new lr,l=new nt(1,1,1);function c(){r.setFromEuler(i,!1)}function h(){i.setFromQuaternion(r,void 0,!1)}i._onChange(c),r._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new gn},normalMatrix:{value:new re}}),this.matrix=new gn,this.matrixWorld=new gn,this.matrixAutoUpdate=fi.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=fi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new uv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return ys.setFromAxisAngle(t,i),this.quaternion.multiply(ys),this}rotateOnWorldAxis(t,i){return ys.setFromAxisAngle(t,i),this.quaternion.premultiply(ys),this}rotateX(t){return this.rotateOnAxis(t_,t)}rotateY(t){return this.rotateOnAxis(e_,t)}rotateZ(t){return this.rotateOnAxis(n_,t)}translateOnAxis(t,i){return $0.copy(t).applyQuaternion(this.quaternion),this.position.add($0.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(t_,t)}translateY(t){return this.translateOnAxis(e_,t)}translateZ(t){return this.translateOnAxis(n_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(_a.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?hu.copy(t):hu.set(t,i,r);const l=this.parent;this.updateWorldMatrix(!0,!1),Io.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_a.lookAt(Io,hu,this.up):_a.lookAt(hu,Io,this.up),this.quaternion.setFromRotationMatrix(_a),l&&(_a.extractRotation(l.matrixWorld),ys.setFromRotationMatrix(_a),this.quaternion.premultiply(ys.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(Ce("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(i_),Ms.child=t,this.dispatchEvent(Ms),Ms.child=null):Ce("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(Hy),vh.child=t,this.dispatchEvent(vh),vh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),_a.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),_a.multiply(t.parent.matrixWorld)),t.applyMatrix4(_a),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(i_),Ms.child=t,this.dispatchEvent(Ms),Ms.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,l=this.children.length;r<l;r++){const h=this.children[r].getObjectByProperty(t,i);if(h!==void 0)return h}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Io,t,zy),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Io,Fy,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const i=t.x,r=t.y,l=t.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*r-c[8]*l,c[13]+=r-c[1]*i-c[5]*r-c[9]*l,c[14]+=l-c[2]*i-c[6]*r-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i,r=!1){const l=this.parent;if(t===!0&&l!==null&&l.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||r)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,r=!0),i===!0){const c=this.children;for(let h=0,p=c.length;h<p;h++)c[h].updateWorldMatrix(!1,!0,r)}}toJSON(t){const i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,l.name=this.name,l.castShadow=this.castShadow,l.receiveShadow=this.receiveShadow,l.visible=this.visible,l.frustumCulled=this.frustumCulled,l.renderOrder=this.renderOrder,l.static=this.static,l.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(p=>({...p,boundingBox:p.boundingBox?p.boundingBox.toJSON():void 0,boundingSphere:p.boundingSphere?p.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(p=>({...p})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(t),l.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(p,m){return p[m.uuid]===void 0&&(p[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const p=this.geometry.parameters;if(p!==void 0&&p.shapes!==void 0){const m=p.shapes;if(Array.isArray(m))for(let d=0,x=m.length;d<x;d++){const v=m[d];c(t.shapes,v)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const p=[];for(let m=0,d=this.material.length;m<d;m++)p.push(c(t.materials,this.material[m]));l.material=p}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let p=0;p<this.children.length;p++)l.children.push(this.children[p].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let p=0;p<this.animations.length;p++){const m=this.animations[p];l.animations.push(c(t.animations,m))}}if(i){const p=h(t.geometries),m=h(t.materials),d=h(t.textures),x=h(t.images),v=h(t.shapes),_=h(t.skeletons),E=h(t.animations),R=h(t.nodes);p.length>0&&(r.geometries=p),m.length>0&&(r.materials=m),d.length>0&&(r.textures=d),x.length>0&&(r.images=x),v.length>0&&(r.shapes=v),_.length>0&&(r.skeletons=_),E.length>0&&(r.animations=E),R.length>0&&(r.nodes=R)}return r.object=l,r;function h(p){const m=[];for(const d in p){const x=p[d];delete x.metadata,m.push(x)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){const l=t.children[r];this.add(l.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}fi.DEFAULT_UP=new nt(0,1,0);fi.DEFAULT_MATRIX_AUTO_UPDATE=!0;fi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class du extends fi{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Gy={type:"move"};class Sh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new du,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new du,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new nt,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new nt),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new du,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new nt,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new nt,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const r of t.hand.values())this._getHandJoint(i,r)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,r){let l=null,c=null,h=null;const p=this._targetRay,m=this._grip,d=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(d&&t.hand){h=!0;for(const O of t.hand.values()){const M=i.getJointPose(O,r),S=this._getHandJoint(d,O);M!==null&&(S.matrix.fromArray(M.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=M.radius),S.visible=M!==null}const x=d.joints["index-finger-tip"],v=d.joints["thumb-tip"],_=x.position.distanceTo(v.position),E=.02,R=.005;d.inputState.pinching&&_>E+R?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&_<=E-R&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=i.getPose(t.gripSpace,r),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:t,target:this})));p!==null&&(l=i.getPose(t.targetRaySpace,r),l===null&&c!==null&&(l=c),l!==null&&(p.matrix.fromArray(l.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,l.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(l.linearVelocity)):p.hasLinearVelocity=!1,l.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(l.angularVelocity)):p.hasAngularVelocity=!1,this.dispatchEvent(Gy)))}return p!==null&&(p.visible=l!==null),m!==null&&(m.visible=c!==null),d!==null&&(d.visible=h!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const r=new du;r.matrixAutoUpdate=!1,r.visible=!1,t.joints[i.jointName]=r,t.add(r)}return t.joints[i.jointName]}}const cv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ir={h:0,s:0,l:0},pu={h:0,s:0,l:0};function xh(s,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?s+(t-s)*6*i:i<1/2?t:i<2/3?s+(t-s)*6*(2/3-i):s}class Oe{constructor(t,i,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,r)}set(t,i,r){if(i===void 0&&r===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,r);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=ui){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ee.colorSpaceToWorking(this,i),this}setRGB(t,i,r,l=Ee.workingColorSpace){return this.r=t,this.g=i,this.b=r,Ee.colorSpaceToWorking(this,l),this}setHSL(t,i,r,l=Ee.workingColorSpace){if(t=Ry(t,1),i=ve(i,0,1),r=ve(r,0,1),i===0)this.r=this.g=this.b=r;else{const c=r<=.5?r*(1+i):r+i-r*i,h=2*r-c;this.r=xh(h,c,t+1/3),this.g=xh(h,c,t),this.b=xh(h,c,t-1/3)}return Ee.colorSpaceToWorking(this,l),this}setStyle(t,i=ui){function r(c){c!==void 0&&parseFloat(c)<1&&ne("Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const h=l[1],p=l[2];switch(h){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return r(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return r(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return r(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:ne("Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],h=c.length;if(h===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(c,16),i);ne("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=ui){const r=cv[t.toLowerCase()];return r!==void 0?this.setHex(r,i):ne("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Aa(t.r),this.g=Aa(t.g),this.b=Aa(t.b),this}copyLinearToSRGB(t){return this.r=zs(t.r),this.g=zs(t.g),this.b=zs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ui){return Ee.workingToColorSpace(Pn.copy(this),t),Math.round(ve(Pn.r*255,0,255))*65536+Math.round(ve(Pn.g*255,0,255))*256+Math.round(ve(Pn.b*255,0,255))}getHexString(t=ui){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=Ee.workingColorSpace){Ee.workingToColorSpace(Pn.copy(this),i);const r=Pn.r,l=Pn.g,c=Pn.b,h=Math.max(r,l,c),p=Math.min(r,l,c);let m,d;const x=(p+h)/2;if(p===h)m=0,d=0;else{const v=h-p;switch(d=x<=.5?v/(h+p):v/(2-h-p),h){case r:m=(l-c)/v+(l<c?6:0);break;case l:m=(c-r)/v+2;break;case c:m=(r-l)/v+4;break}m/=6}return t.h=m,t.s=d,t.l=x,t}getRGB(t,i=Ee.workingColorSpace){return Ee.workingToColorSpace(Pn.copy(this),i),t.r=Pn.r,t.g=Pn.g,t.b=Pn.b,t}getStyle(t=ui){Ee.workingToColorSpace(Pn.copy(this),t);const i=Pn.r,r=Pn.g,l=Pn.b;return t!==ui?`color(${t} ${i.toFixed(3)} ${r.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(r*255)},${Math.round(l*255)})`}offsetHSL(t,i,r){return this.getHSL(ir),this.setHSL(ir.h+t,ir.s+i,ir.l+r)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,r){return this.r=t.r+(i.r-t.r)*r,this.g=t.g+(i.g-t.g)*r,this.b=t.b+(i.b-t.b)*r,this}lerpHSL(t,i){this.getHSL(ir),t.getHSL(pu);const r=dh(ir.h,pu.h,i),l=dh(ir.s,pu.s,i),c=dh(ir.l,pu.l,i);return this.setHSL(r,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,r=this.g,l=this.b,c=t.elements;return this.r=c[0]*i+c[3]*r+c[6]*l,this.g=c[1]*i+c[4]*r+c[7]*l,this.b=c[2]*i+c[5]*r+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pn=new Oe;Oe.NAMES=cv;class Vy extends fi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hr,this.environmentIntensity=1,this.environmentRotation=new Hr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),i.object.backgroundBlurriness=this.backgroundBlurriness,i.object.backgroundIntensity=this.backgroundIntensity,i.object.backgroundRotation=this.backgroundRotation.toArray(),i.object.environmentIntensity=this.environmentIntensity,i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Ui=new nt,va=new nt,yh=new nt,Sa=new nt,Es=new nt,bs=new nt,a_=new nt,Mh=new nt,Eh=new nt,bh=new nt,Th=new rn,Ah=new rn,Rh=new rn;class Oi{constructor(t=new nt,i=new nt,r=new nt){this.a=t,this.b=i,this.c=r}static getNormal(t,i,r,l){l.subVectors(r,i),Ui.subVectors(t,i),l.cross(Ui);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,i,r,l,c){Ui.subVectors(l,i),va.subVectors(r,i),yh.subVectors(t,i);const h=Ui.dot(Ui),p=Ui.dot(va),m=Ui.dot(yh),d=va.dot(va),x=va.dot(yh),v=h*d-p*p;if(v===0)return c.set(0,0,0),null;const _=1/v,E=(d*m-p*x)*_,R=(h*x-p*m)*_;return c.set(1-E-R,R,E)}static containsPoint(t,i,r,l){return this.getBarycoord(t,i,r,l,Sa)===null?!1:Sa.x>=0&&Sa.y>=0&&Sa.x+Sa.y<=1}static getInterpolation(t,i,r,l,c,h,p,m){return this.getBarycoord(t,i,r,l,Sa)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,Sa.x),m.addScaledVector(h,Sa.y),m.addScaledVector(p,Sa.z),m)}static getInterpolatedAttribute(t,i,r,l,c,h){return Th.setScalar(0),Ah.setScalar(0),Rh.setScalar(0),Th.fromBufferAttribute(t,i),Ah.fromBufferAttribute(t,r),Rh.fromBufferAttribute(t,l),h.setScalar(0),h.addScaledVector(Th,c.x),h.addScaledVector(Ah,c.y),h.addScaledVector(Rh,c.z),h}static isFrontFacing(t,i,r,l){return Ui.subVectors(r,i),va.subVectors(t,i),Ui.cross(va).dot(l)<0}set(t,i,r){return this.a.copy(t),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(t,i,r,l){return this.a.copy(t[i]),this.b.copy(t[r]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,r,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,r),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ui.subVectors(this.c,this.b),va.subVectors(this.a,this.b),Ui.cross(va).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Oi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Oi.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,r,l,c){return Oi.getInterpolation(t,this.a,this.b,this.c,i,r,l,c)}containsPoint(t){return Oi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Oi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const r=this.a,l=this.b,c=this.c;let h,p;Es.subVectors(l,r),bs.subVectors(c,r),Mh.subVectors(t,r);const m=Es.dot(Mh),d=bs.dot(Mh);if(m<=0&&d<=0)return i.copy(r);Eh.subVectors(t,l);const x=Es.dot(Eh),v=bs.dot(Eh);if(x>=0&&v<=x)return i.copy(l);const _=m*v-x*d;if(_<=0&&m>=0&&x<=0)return h=m/(m-x),i.copy(r).addScaledVector(Es,h);bh.subVectors(t,c);const E=Es.dot(bh),R=bs.dot(bh);if(R>=0&&E<=R)return i.copy(c);const O=E*d-m*R;if(O<=0&&d>=0&&R<=0)return p=d/(d-R),i.copy(r).addScaledVector(bs,p);const M=x*R-E*v;if(M<=0&&v-x>=0&&E-R>=0)return a_.subVectors(c,l),p=(v-x)/(v-x+(E-R)),i.copy(l).addScaledVector(a_,p);const S=1/(M+O+_);return h=O*S,p=_*S,i.copy(r).addScaledVector(Es,h).addScaledVector(bs,p)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Jo{constructor(t=new nt(1/0,1/0,1/0),i=new nt(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,r=t.length;i<r;i+=3)this.expandByPoint(Li.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,r=t.count;i<r;i++)this.expandByPoint(Li.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,r=t.length;i<r;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const r=Li.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(r),this.max.copy(t).add(r),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const r=t.geometry;if(r!==void 0){const c=r.getAttribute("position");if(i===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let h=0,p=c.count;h<p;h++)t.isMesh===!0?t.getVertexPosition(h,Li):Li.fromBufferAttribute(c,h),Li.applyMatrix4(t.matrixWorld),this.expandByPoint(Li);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),mu.copy(t.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),mu.copy(r.boundingBox)),mu.applyMatrix4(t.matrixWorld),this.union(mu)}const l=t.children;for(let c=0,h=l.length;c<h;c++)this.expandByObject(l[c],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Li),Li.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,r;return t.normal.x>0?(i=t.normal.x*this.min.x,r=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,r=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,r+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,r+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,r+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,r+=t.normal.z*this.min.z),i<=-t.constant&&r>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Bo),gu.subVectors(this.max,Bo),Ts.subVectors(t.a,Bo),As.subVectors(t.b,Bo),Rs.subVectors(t.c,Bo),ar.subVectors(As,Ts),rr.subVectors(Rs,As),Dr.subVectors(Ts,Rs);let i=[0,-ar.z,ar.y,0,-rr.z,rr.y,0,-Dr.z,Dr.y,ar.z,0,-ar.x,rr.z,0,-rr.x,Dr.z,0,-Dr.x,-ar.y,ar.x,0,-rr.y,rr.x,0,-Dr.y,Dr.x,0];return!Ch(i,Ts,As,Rs,gu)||(i=[1,0,0,0,1,0,0,0,1],!Ch(i,Ts,As,Rs,gu))?!1:(_u.crossVectors(ar,rr),i=[_u.x,_u.y,_u.z],Ch(i,Ts,As,Rs,gu))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Li).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Li).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(xa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),xa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),xa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),xa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),xa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),xa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),xa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),xa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(xa),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const xa=[new nt,new nt,new nt,new nt,new nt,new nt,new nt,new nt],Li=new nt,mu=new Jo,Ts=new nt,As=new nt,Rs=new nt,ar=new nt,rr=new nt,Dr=new nt,Bo=new nt,gu=new nt,_u=new nt,wr=new nt;function Ch(s,t,i,r,l){for(let c=0,h=s.length-3;c<=h;c+=3){wr.fromArray(s,c);const p=l.x*Math.abs(wr.x)+l.y*Math.abs(wr.y)+l.z*Math.abs(wr.z),m=t.dot(wr),d=i.dot(wr),x=r.dot(wr);if(Math.max(-Math.max(m,d,x),Math.min(m,d,x))>p)return!1}return!0}const mn=new nt,vu=new ie;let ky=0;class Ra extends ur{constructor(t,i,r=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ky++}),this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=r,this.usage=My,this.updateRanges=[],this.gpuType=qi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,r){t*=this.itemSize,r*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=i.array[r+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,r=this.count;i<r;i++)vu.fromBufferAttribute(this,i),vu.applyMatrix3(t),this.setXY(i,vu.x,vu.y);else if(this.itemSize===3)for(let i=0,r=this.count;i<r;i++)mn.fromBufferAttribute(this,i),mn.applyMatrix3(t),this.setXYZ(i,mn.x,mn.y,mn.z);return this}applyMatrix4(t){for(let i=0,r=this.count;i<r;i++)mn.fromBufferAttribute(this,i),mn.applyMatrix4(t),this.setXYZ(i,mn.x,mn.y,mn.z);return this}applyNormalMatrix(t){for(let i=0,r=this.count;i<r;i++)mn.fromBufferAttribute(this,i),mn.applyNormalMatrix(t),this.setXYZ(i,mn.x,mn.y,mn.z);return this}transformDirection(t){for(let i=0,r=this.count;i<r;i++)mn.fromBufferAttribute(this,i),mn.transformDirection(t),this.setXYZ(i,mn.x,mn.y,mn.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let r=this.array[t*this.itemSize+i];return this.normalized&&(r=Po(r,this.array)),r}setComponent(t,i,r){return this.normalized&&(r=Kn(r,this.array)),this.array[t*this.itemSize+i]=r,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=Po(i,this.array)),i}setX(t,i){return this.normalized&&(i=Kn(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=Po(i,this.array)),i}setY(t,i){return this.normalized&&(i=Kn(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=Po(i,this.array)),i}setZ(t,i){return this.normalized&&(i=Kn(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=Po(i,this.array)),i}setW(t,i){return this.normalized&&(i=Kn(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,r){return t*=this.itemSize,this.normalized&&(i=Kn(i,this.array),r=Kn(r,this.array)),this.array[t+0]=i,this.array[t+1]=r,this}setXYZ(t,i,r,l){return t*=this.itemSize,this.normalized&&(i=Kn(i,this.array),r=Kn(r,this.array),l=Kn(l,this.array)),this.array[t+0]=i,this.array[t+1]=r,this.array[t+2]=l,this}setXYZW(t,i,r,l,c){return t*=this.itemSize,this.normalized&&(i=Kn(i,this.array),r=Kn(r,this.array),l=Kn(l,this.array),c=Kn(c,this.array)),this.array[t+0]=i,this.array[t+1]=r,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class fv extends Ra{constructor(t,i,r){super(new Uint16Array(t),i,r)}}class hv extends Ra{constructor(t,i,r){super(new Uint32Array(t),i,r)}}class Zi extends Ra{constructor(t,i,r){super(new Float32Array(t),i,r)}}const Xy=new Jo,zo=new nt,Dh=new nt;class Wd{constructor(t=new nt,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const r=this.center;i!==void 0?r.copy(i):Xy.setFromPoints(t).getCenter(r);let l=0;for(let c=0,h=t.length;c<h;c++)l=Math.max(l,r.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const r=this.center.distanceToSquared(t);return i.copy(t),r>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;zo.subVectors(t,this.center);const i=zo.lengthSq();if(i>this.radius*this.radius){const r=Math.sqrt(i),l=(r-this.radius)*.5;this.center.addScaledVector(zo,l/r),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Dh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(zo.copy(t.center).add(Dh)),this.expandByPoint(zo.copy(t.center).sub(Dh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Wy=0;const Mi=new gn,wh=new fi,Cs=new nt,li=new Jo,Fo=new Jo,bn=new nt;class ji extends ur{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wy++}),this.uuid=Qo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ey(t)?hv:fv)(t,1):this.index=t,this}setIndirect(t,i=0){return this.indirect=t,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,r=0){this.groups.push({start:t,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const c=new re().getNormalMatrix(t);r.applyNormalMatrix(c),r.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Mi.makeRotationFromQuaternion(t),this.applyMatrix4(Mi),this}rotateX(t){return Mi.makeRotationX(t),this.applyMatrix4(Mi),this}rotateY(t){return Mi.makeRotationY(t),this.applyMatrix4(Mi),this}rotateZ(t){return Mi.makeRotationZ(t),this.applyMatrix4(Mi),this}translate(t,i,r){return Mi.makeTranslation(t,i,r),this.applyMatrix4(Mi),this}scale(t,i,r){return Mi.makeScale(t,i,r),this.applyMatrix4(Mi),this}lookAt(t){return wh.lookAt(t),wh.updateMatrix(),this.applyMatrix4(wh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Cs).negate(),this.translate(Cs.x,Cs.y,Cs.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const r=[];for(let l=0,c=t.length;l<c;l++){const h=t[l];r.push(h.x,h.y,h.z||0)}this.setAttribute("position",new Zi(r,3))}else{const r=Math.min(t.length,i.count);for(let l=0;l<r;l++){const c=t[l];i.setXYZ(l,c.x,c.y,c.z||0)}t.length>i.count&&ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jo);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ce("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new nt(-1/0,-1/0,-1/0),new nt(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let r=0,l=i.length;r<l;r++){const c=i[r];li.setFromBufferAttribute(c),this.morphTargetsRelative?(bn.addVectors(this.boundingBox.min,li.min),this.boundingBox.expandByPoint(bn),bn.addVectors(this.boundingBox.max,li.max),this.boundingBox.expandByPoint(bn)):(this.boundingBox.expandByPoint(li.min),this.boundingBox.expandByPoint(li.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ce('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wd);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ce("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new nt,1/0);return}if(t){const r=this.boundingSphere.center;if(li.setFromBufferAttribute(t),i)for(let c=0,h=i.length;c<h;c++){const p=i[c];Fo.setFromBufferAttribute(p),this.morphTargetsRelative?(bn.addVectors(li.min,Fo.min),li.expandByPoint(bn),bn.addVectors(li.max,Fo.max),li.expandByPoint(bn)):(li.expandByPoint(Fo.min),li.expandByPoint(Fo.max))}li.getCenter(r);let l=0;for(let c=0,h=t.count;c<h;c++)bn.fromBufferAttribute(t,c),l=Math.max(l,r.distanceToSquared(bn));if(i)for(let c=0,h=i.length;c<h;c++){const p=i[c],m=this.morphTargetsRelative;for(let d=0,x=p.count;d<x;d++)bn.fromBufferAttribute(p,d),m&&(Cs.fromBufferAttribute(t,d),bn.add(Cs)),l=Math.max(l,r.distanceToSquared(bn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&Ce('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){Ce("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=i.position,l=i.normal,c=i.uv;let h=this.getAttribute("tangent");(h===void 0||h.count!==r.count)&&(h=new Ra(new Float32Array(4*r.count),4),this.setAttribute("tangent",h));const p=[],m=[];for(let b=0;b<r.count;b++)p[b]=new nt,m[b]=new nt;const d=new nt,x=new nt,v=new nt,_=new ie,E=new ie,R=new ie,O=new nt,M=new nt;function S(b,P,W){d.fromBufferAttribute(r,b),x.fromBufferAttribute(r,P),v.fromBufferAttribute(r,W),_.fromBufferAttribute(c,b),E.fromBufferAttribute(c,P),R.fromBufferAttribute(c,W),x.sub(d),v.sub(d),E.sub(_),R.sub(_);const q=1/(E.x*R.y-R.x*E.y);isFinite(q)&&(O.copy(x).multiplyScalar(R.y).addScaledVector(v,-E.y).multiplyScalar(q),M.copy(v).multiplyScalar(E.x).addScaledVector(x,-R.x).multiplyScalar(q),p[b].add(O),p[P].add(O),p[W].add(O),m[b].add(M),m[P].add(M),m[W].add(M))}let B=this.groups;B.length===0&&(B=[{start:0,count:t.count}]);for(let b=0,P=B.length;b<P;++b){const W=B[b],q=W.start,Q=W.count;for(let lt=q,Y=q+Q;lt<Y;lt+=3)S(t.getX(lt+0),t.getX(lt+1),t.getX(lt+2))}const k=new nt,U=new nt,C=new nt,D=new nt;function L(b){C.fromBufferAttribute(l,b),D.copy(C);const P=p[b];k.copy(P),k.sub(C.multiplyScalar(C.dot(P))).normalize(),U.crossVectors(D,P);const q=U.dot(m[b])<0?-1:1;h.setXYZW(b,k.x,k.y,k.z,q)}for(let b=0,P=B.length;b<P;++b){const W=B[b],q=W.start,Q=W.count;for(let lt=q,Y=q+Q;lt<Y;lt+=3)L(t.getX(lt+0)),L(t.getX(lt+1)),L(t.getX(lt+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0||r.count!==i.count)r=new Ra(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let _=0,E=r.count;_<E;_++)r.setXYZ(_,0,0,0);const l=new nt,c=new nt,h=new nt,p=new nt,m=new nt,d=new nt,x=new nt,v=new nt;if(t)for(let _=0,E=t.count;_<E;_+=3){const R=t.getX(_+0),O=t.getX(_+1),M=t.getX(_+2);l.fromBufferAttribute(i,R),c.fromBufferAttribute(i,O),h.fromBufferAttribute(i,M),x.subVectors(h,c),v.subVectors(l,c),x.cross(v),p.fromBufferAttribute(r,R),m.fromBufferAttribute(r,O),d.fromBufferAttribute(r,M),p.add(x),m.add(x),d.add(x),r.setXYZ(R,p.x,p.y,p.z),r.setXYZ(O,m.x,m.y,m.z),r.setXYZ(M,d.x,d.y,d.z)}else for(let _=0,E=i.count;_<E;_+=3)l.fromBufferAttribute(i,_+0),c.fromBufferAttribute(i,_+1),h.fromBufferAttribute(i,_+2),x.subVectors(h,c),v.subVectors(l,c),x.cross(v),r.setXYZ(_+0,x.x,x.y,x.z),r.setXYZ(_+1,x.x,x.y,x.z),r.setXYZ(_+2,x.x,x.y,x.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,r=t.count;i<r;i++)bn.fromBufferAttribute(t,i),bn.normalize(),t.setXYZ(i,bn.x,bn.y,bn.z)}toNonIndexed(){function t(p,m){const d=p.array,x=p.itemSize,v=p.normalized,_=new d.constructor(m.length*x);let E=0,R=0;for(let O=0,M=m.length;O<M;O++){p.isInterleavedBufferAttribute?E=m[O]*p.data.stride+p.offset:E=m[O]*x;for(let S=0;S<x;S++)_[R++]=d[E++]}return new Ra(_,x,v)}if(this.index===null)return ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new ji,r=this.index.array,l=this.attributes;for(const p in l){const m=l[p],d=t(m,r);i.setAttribute(p,d)}const c=this.morphAttributes;for(const p in c){const m=[],d=c[p];for(let x=0,v=d.length;x<v;x++){const _=d[x],E=t(_,r);m.push(E)}i.morphAttributes[p]=m}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let p=0,m=h.length;p<m;p++){const d=h[p];i.addGroup(d.start,d.count,d.materialIndex)}return i}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const d in m)m[d]!==void 0&&(t[d]=m[d]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const r=this.attributes;for(const m in r){const d=r[m];t.data.attributes[m]=d.toJSON(t.data)}const l={};let c=!1;for(const m in this.morphAttributes){const d=this.morphAttributes[m],x=[];for(let v=0,_=d.length;v<_;v++){const E=d[v];x.push(E.toJSON(t.data))}x.length>0&&(l[m]=x,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(t.data.groups=JSON.parse(JSON.stringify(h)));const p=this.boundingSphere;return p!==null&&(t.data.boundingSphere=p.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const r=t.index;r!==null&&this.setIndex(r.clone());const l=t.attributes;for(const d in l){const x=l[d];this.setAttribute(d,x.clone(i))}const c=t.morphAttributes;for(const d in c){const x=[],v=c[d];for(let _=0,E=v.length;_<E;_++)x.push(v[_].clone(i));this.morphAttributes[d]=x}this.morphTargetsRelative=t.morphTargetsRelative;const h=t.groups;for(let d=0,x=h.length;d<x;d++){const v=h[d];this.addGroup(v.start,v.count,v.materialIndex)}const p=t.boundingBox;p!==null&&(this.boundingBox=p.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Uh=new nt,qy=new nt,Yy=new re;class Ma{constructor(t=new nt(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,r,l){return this.normal.set(t,i,r),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,r){const l=Uh.subVectors(r,i).cross(qy.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i,r=!0){const l=t.delta(Uh),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const h=-(t.start.dot(this.normal)+this.constant)/c;return r===!0&&(h<0||h>1)?null:i.copy(t.start).addScaledVector(l,h)}intersectsLine(t){const i=this.distanceToPoint(t.start),r=this.distanceToPoint(t.end);return i<0&&r>0||r<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const r=i||Yy.getNormalMatrix(t),l=this.coplanarPoint(Uh).applyMatrix4(t),c=this.normal.applyMatrix3(r).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Zy=0;class Ku extends ur{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zy++}),this.uuid=Qo(),this.name="",this.type="Material",this.blending=Xo,this.side=Br,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=k_,this.blendDst=X_,this.blendEquation=Ns,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=Wo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=my,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hh,this.stencilZFail=hh,this.stencilZPass=hh,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const r=t[i];if(r===void 0){ne(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ne(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(r):l&&l.isVector2&&r&&r.isVector2||l&&l.isEuler&&r&&r.isEuler||l&&l.isVector3&&r&&r.isVector3?l.copy(r):this[i]=r}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,r.blending=this.blending,r.side=this.side,r.shadowSide=this.shadowSide,r.vertexColors=this.vertexColors,r.opacity=this.opacity,r.transparent=this.transparent,r.blendSrc=this.blendSrc,r.blendDst=this.blendDst,r.blendEquation=this.blendEquation,r.blendSrcAlpha=this.blendSrcAlpha,r.blendDstAlpha=this.blendDstAlpha,r.blendEquationAlpha=this.blendEquationAlpha,r.blendColor=this.blendColor.getHex(),r.blendAlpha=this.blendAlpha,r.depthFunc=this.depthFunc,r.depthTest=this.depthTest,r.depthWrite=this.depthWrite,r.colorWrite=this.colorWrite,r.clipIntersection=this.clipIntersection,r.clipShadows=this.clipShadows,r.stencilWriteMask=this.stencilWriteMask,r.stencilFunc=this.stencilFunc,r.stencilRef=this.stencilRef,r.stencilFuncMask=this.stencilFuncMask,r.stencilFail=this.stencilFail,r.stencilZFail=this.stencilZFail,r.stencilZPass=this.stencilZPass,r.stencilWrite=this.stencilWrite,r.polygonOffset=this.polygonOffset,r.polygonOffsetFactor=this.polygonOffsetFactor,r.polygonOffsetUnits=this.polygonOffsetUnits,r.dithering=this.dithering,r.alphaTest=this.alphaTest,r.alphaHash=this.alphaHash,r.alphaToCoverage=this.alphaToCoverage,r.premultipliedAlpha=this.premultipliedAlpha,r.forceSinglePass=this.forceSinglePass,r.allowOverride=this.allowOverride,r.visible=this.visible,r.toneMapped=this.toneMapped,r.name=this.name,this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(r.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(t).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(t).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(t).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(t).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(t).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(r.clippingPlanes=this.clippingPlanes.map(c=>c.toJSON())),this.rotation!==void 0&&(r.rotation=this.rotation),this.depthPacking!==void 0&&(r.depthPacking=this.depthPacking),this.linewidth!==void 0&&(r.linewidth=this.linewidth),this.linecap!==void 0&&(r.linecap=this.linecap),this.linejoin!==void 0&&(r.linejoin=this.linejoin),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.wireframe!==void 0&&(r.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(r.flatShading=this.flatShading),this.fog!==void 0&&(r.fog=this.fog),Object.keys(this.userData).length>0&&(r.userData=this.userData);function l(c){const h=[];for(const p in c){const m=c[p];delete m.metadata,h.push(m)}return h}if(i){const c=l(t.textures),h=l(t.images);c.length>0&&(r.textures=c),h.length>0&&(r.images=h)}return r}fromJSON(t,i){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Oe().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(r=>new Ma().fromJSON(r))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=i[t.map]||null),t.matcap!==void 0&&(this.matcap=i[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=i[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=i[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=i[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let r=t.normalScale;Array.isArray(r)===!1&&(r=[r,r]),this.normalScale=new ie().fromArray(r)}return t.displacementMap!==void 0&&(this.displacementMap=i[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=i[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=i[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=i[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=i[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=i[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=i[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=i[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=i[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=i[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=i[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ie().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=i[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=i[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=i[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=i[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=i[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let r=null;if(i!==null){const l=i.length;r=new Array(l);for(let c=0;c!==l;++c)r[c]=i[c].clone()}return this.clippingPlanes=r,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const ya=new nt,Lh=new nt,Su=new nt,xu=new nt;class dv{constructor(t=new nt,i=new nt(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ya)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const r=i.dot(this.direction);return r<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=ya.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(ya.copy(this.origin).addScaledVector(this.direction,i),ya.distanceToSquared(t))}distanceSqToSegment(t,i,r,l){Lh.copy(t).add(i).multiplyScalar(.5),Su.copy(i).sub(t).normalize(),xu.copy(this.origin).sub(Lh);const c=t.distanceTo(i)*.5,h=-this.direction.dot(Su),p=xu.dot(this.direction),m=-xu.dot(Su),d=xu.lengthSq(),x=Math.abs(1-h*h);let v,_,E,R;if(x>0)if(v=h*m-p,_=h*p-m,R=c*x,v>=0)if(_>=-R)if(_<=R){const O=1/x;v*=O,_*=O,E=v*(v+h*_+2*p)+_*(h*v+_+2*m)+d}else _=c,v=Math.max(0,-(h*_+p)),E=-v*v+_*(_+2*m)+d;else _=-c,v=Math.max(0,-(h*_+p)),E=-v*v+_*(_+2*m)+d;else _<=-R?(v=Math.max(0,-(-h*c+p)),_=v>0?-c:Math.min(Math.max(-c,-m),c),E=-v*v+_*(_+2*m)+d):_<=R?(v=0,_=Math.min(Math.max(-c,-m),c),E=_*(_+2*m)+d):(v=Math.max(0,-(h*c+p)),_=v>0?c:Math.min(Math.max(-c,-m),c),E=-v*v+_*(_+2*m)+d);else _=h>0?-c:c,v=Math.max(0,-(h*_+p)),E=-v*v+_*(_+2*m)+d;return r&&r.copy(this.origin).addScaledVector(this.direction,v),l&&l.copy(Lh).addScaledVector(Su,_),E}intersectSphere(t,i){if(t.radius<0)return null;ya.subVectors(t.center,this.origin);const r=ya.dot(this.direction),l=ya.dot(ya)-r*r,c=t.radius*t.radius;if(l>c)return null;const h=Math.sqrt(c-l),p=r-h,m=r+h;return m<0?null:p<0?this.at(m,i):this.at(p,i)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(t.normal)+t.constant)/i;return r>=0?r:null}intersectPlane(t,i){const r=this.distanceToPlane(t);return r===null?null:this.at(r,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let r,l,c,h,p,m;const d=1/this.direction.x,x=1/this.direction.y,v=1/this.direction.z,_=this.origin;return d>=0?(r=(t.min.x-_.x)*d,l=(t.max.x-_.x)*d):(r=(t.max.x-_.x)*d,l=(t.min.x-_.x)*d),x>=0?(c=(t.min.y-_.y)*x,h=(t.max.y-_.y)*x):(c=(t.max.y-_.y)*x,h=(t.min.y-_.y)*x),r>h||c>l||((c>r||isNaN(r))&&(r=c),(h<l||isNaN(l))&&(l=h),v>=0?(p=(t.min.z-_.z)*v,m=(t.max.z-_.z)*v):(p=(t.max.z-_.z)*v,m=(t.min.z-_.z)*v),r>m||p>l)||((p>r||r!==r)&&(r=p),(m<l||l!==l)&&(l=m),l<0)?null:this.at(r>=0?r:l,i)}intersectsBox(t){return this.intersectBox(t,ya)!==null}intersectTriangle(t,i,r,l,c){const h=this.origin,p=this.direction,m=p.x,d=p.y,x=p.z,v=t.x-h.x,_=t.y-h.y,E=t.z-h.z,R=i.x-h.x,O=i.y-h.y,M=i.z-h.z,S=r.x-h.x,B=r.y-h.y,k=r.z-h.z,U=Math.abs(m),C=Math.abs(d),D=Math.abs(x);let L,b,P,W,q,Q,lt,Y,j,I,F,ut;if(U>=C&&U>=D?(P=m,Q=v,j=R,ut=S,m>=0?(L=d,b=x,W=_,q=E,lt=O,Y=M,I=B,F=k):(L=x,b=d,W=E,q=_,lt=M,Y=O,I=k,F=B)):C>=D?(P=d,Q=_,j=O,ut=B,d>=0?(L=x,b=m,W=E,q=v,lt=M,Y=R,I=k,F=S):(L=m,b=x,W=v,q=E,lt=R,Y=M,I=S,F=k)):(P=x,Q=E,j=M,ut=k,x>=0?(L=m,b=d,W=v,q=_,lt=R,Y=O,I=S,F=B):(L=d,b=m,W=_,q=v,lt=O,Y=R,I=B,F=S)),P===0)return null;const rt=L/P,ht=b/P,w=1/P,J=W-rt*Q,gt=q-ht*Q,Et=lt-rt*j,Nt=Y-ht*j,Xt=I-rt*ut,it=F-ht*ut,_t=Xt*Nt-it*Et,Tt=J*it-gt*Xt,te=Et*gt-Nt*J;if(l){if(_t<0||Tt<0||te<0)return null}else if((_t<0||Tt<0||te<0)&&(_t>0||Tt>0||te>0))return null;const Ht=_t+Tt+te;if(Ht===0)return null;const le=w*(_t*Q+Tt*j+te*ut);return(Ht>0?le<0:le>0)?null:this.at(le/Ht,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pv extends Ku{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hr,this.combine=W_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const r_=new gn,Ur=new dv,yu=new Wd,s_=new nt,Mu=new nt,Eu=new nt,bu=new nt,Nh=new nt,Tu=new nt,o_=new nt,Au=new nt;class Qi extends fi{constructor(t=new ji,i=new pv){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}getVertexPosition(t,i){const r=this.geometry,l=r.attributes.position,c=r.morphAttributes.position,h=r.morphTargetsRelative;i.fromBufferAttribute(l,t);const p=this.morphTargetInfluences;if(c&&p){Tu.set(0,0,0);for(let m=0,d=c.length;m<d;m++){const x=p[m],v=c[m];x!==0&&(Nh.fromBufferAttribute(v,t),h?Tu.addScaledVector(Nh,x):Tu.addScaledVector(Nh.sub(i),x))}i.add(Tu)}return i}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,i){const r=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),yu.copy(r.boundingSphere),yu.applyMatrix4(c),Ur.copy(t.ray).recast(t.near),!(yu.containsPoint(Ur.origin)===!1&&(Ur.intersectSphere(yu,s_)===null||Ur.origin.distanceToSquared(s_)>(t.far-t.near)**2))&&(r_.copy(c).invert(),Ur.copy(t.ray).applyMatrix4(r_),!(r.boundingBox!==null&&Ur.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(t,i,Ur)))}_computeIntersections(t,i,r){let l;const c=this.geometry,h=this.material,p=c.index,m=c.attributes.position,d=c.attributes.uv,x=c.attributes.uv1,v=c.attributes.normal,_=c.groups,E=c.drawRange;if(p!==null)if(Array.isArray(h))for(let R=0,O=_.length;R<O;R++){const M=_[R],S=h[M.materialIndex],B=Math.max(M.start,E.start),k=Math.min(p.count,Math.min(M.start+M.count,E.start+E.count));for(let U=B,C=k;U<C;U+=3){const D=p.getX(U),L=p.getX(U+1),b=p.getX(U+2);l=Ru(this,S,t,r,d,x,v,D,L,b),l&&(l.faceIndex=Math.floor(U/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const R=Math.max(0,E.start),O=Math.min(p.count,E.start+E.count);for(let M=R,S=O;M<S;M+=3){const B=p.getX(M),k=p.getX(M+1),U=p.getX(M+2);l=Ru(this,h,t,r,d,x,v,B,k,U),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(h))for(let R=0,O=_.length;R<O;R++){const M=_[R],S=h[M.materialIndex],B=Math.max(M.start,E.start),k=Math.min(m.count,Math.min(M.start+M.count,E.start+E.count));for(let U=B,C=k;U<C;U+=3){const D=U,L=U+1,b=U+2;l=Ru(this,S,t,r,d,x,v,D,L,b),l&&(l.faceIndex=Math.floor(U/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const R=Math.max(0,E.start),O=Math.min(m.count,E.start+E.count);for(let M=R,S=O;M<S;M+=3){const B=M,k=M+1,U=M+2;l=Ru(this,h,t,r,d,x,v,B,k,U),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}}}function Ky(s,t,i,r,l,c,h,p){let m;if(t.side===Jn?m=r.intersectTriangle(h,c,l,!0,p):m=r.intersectTriangle(l,c,h,t.side===Br,p),m===null)return null;Au.copy(p),Au.applyMatrix4(s.matrixWorld);const d=i.ray.origin.distanceTo(Au);return d<i.near||d>i.far?null:{distance:d,point:Au.clone(),object:s}}function Ru(s,t,i,r,l,c,h,p,m,d){s.getVertexPosition(p,Mu),s.getVertexPosition(m,Eu),s.getVertexPosition(d,bu);const x=Ky(s,t,i,r,Mu,Eu,bu,o_);if(x){const v=new nt;Oi.getBarycoord(o_,Mu,Eu,bu,v),l&&(x.uv=Oi.getInterpolatedAttribute(l,p,m,d,v,new ie)),c&&(x.uv1=Oi.getInterpolatedAttribute(c,p,m,d,v,new ie)),h&&(x.normal=Oi.getInterpolatedAttribute(h,p,m,d,v,new nt),x.normal.dot(r.direction)>0&&x.normal.multiplyScalar(-1));const _={a:p,b:m,c:d,normal:new nt,materialIndex:0};Oi.getNormal(Mu,Eu,bu,_.normal),x.face=_,x.barycoord=v}return x}class Qy extends Hn{constructor(t=null,i=1,r=1,l,c,h,p,m,d=Ln,x=Ln,v,_){super(null,h,p,m,d,x,l,c,v,_),this.isDataTexture=!0,this.image={data:t,width:i,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Lr=new Wd,Jy=new ie(.5,.5),Cu=new nt;class mv{constructor(t=new Ma,i=new Ma,r=new Ma,l=new Ma,c=new Ma,h=new Ma){this.planes=[t,i,r,l,c,h]}set(t,i,r,l,c,h){const p=this.planes;return p[0].copy(t),p[1].copy(i),p[2].copy(r),p[3].copy(l),p[4].copy(c),p[5].copy(h),this}copy(t){const i=this.planes;for(let r=0;r<6;r++)i[r].copy(t.planes[r]);return this}setFromProjectionMatrix(t,i=Yi,r=!1){const l=this.planes,c=t.elements,h=c[0],p=c[1],m=c[2],d=c[3],x=c[4],v=c[5],_=c[6],E=c[7],R=c[8],O=c[9],M=c[10],S=c[11],B=c[12],k=c[13],U=c[14],C=c[15];if(l[0].setComponents(d-h,E-x,S-R,C-B).normalize(),l[1].setComponents(d+h,E+x,S+R,C+B).normalize(),l[2].setComponents(d+p,E+v,S+O,C+k).normalize(),l[3].setComponents(d-p,E-v,S-O,C-k).normalize(),r)l[4].setComponents(m,_,M,U).normalize(),l[5].setComponents(d-m,E-_,S-M,C-U).normalize();else if(l[4].setComponents(d-m,E-_,S-M,C-U).normalize(),i===Yi)l[5].setComponents(d+m,E+_,S+M,C+U).normalize();else if(i===Wu)l[5].setComponents(m,_,M,U).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Lr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Lr.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Lr)}intersectsSprite(t){Lr.center.set(0,0,0);const i=Jy.distanceTo(t.center);return Lr.radius=.7071067811865476+i,Lr.applyMatrix4(t.matrixWorld),this.intersectsSphere(Lr)}intersectsSphere(t){const i=this.planes,r=t.center,l=-t.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(r)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let r=0;r<6;r++){const l=i[r];if(Cu.x=l.normal.x>0?t.max.x:t.min.x,Cu.y=l.normal.y>0?t.max.y:t.min.y,Cu.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Cu)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let r=0;r<6;r++)if(i[r].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class gv extends Hn{constructor(t=[],i=zr,r,l,c,h,p,m,d,x){super(t,i,r,l,c,h,p,m,d,x),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ko extends Hn{constructor(t,i,r=Ki,l,c,h,p=Ln,m=Ln,d,x=Ca,v=1){if(x!==Ca&&x!==Ir)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const _={width:t,height:i,depth:v};super(_,l,c,h,p,m,x,r,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Xd(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return i.compareFunction=this.compareFunction,i}}class jy extends Ko{constructor(t,i=Ki,r=zr,l,c,h=Ln,p=Ln,m,d=Ca){const x={width:t,height:t,depth:1},v=[x,x,x,x,x,x];super(t,t,i,r,l,c,h,p,m,d),this.image=v,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class _v extends Hn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class jo extends ji{constructor(t=1,i=1,r=1,l=1,c=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:r,widthSegments:l,heightSegments:c,depthSegments:h};const p=this;l=Math.floor(l),c=Math.floor(c),h=Math.floor(h);const m=[],d=[],x=[],v=[];let _=0,E=0;R("z","y","x",-1,-1,r,i,t,h,c,0),R("z","y","x",1,-1,r,i,-t,h,c,1),R("x","z","y",1,1,t,r,i,l,h,2),R("x","z","y",1,-1,t,r,-i,l,h,3),R("x","y","z",1,-1,t,i,r,l,c,4),R("x","y","z",-1,-1,t,i,-r,l,c,5),this.setIndex(m),this.setAttribute("position",new Zi(d,3)),this.setAttribute("normal",new Zi(x,3)),this.setAttribute("uv",new Zi(v,2));function R(O,M,S,B,k,U,C,D,L,b,P){const W=U/L,q=C/b,Q=U/2,lt=C/2,Y=D/2,j=L+1,I=b+1;let F=0,ut=0;const rt=new nt;for(let ht=0;ht<I;ht++){const w=ht*q-lt;for(let J=0;J<j;J++){const gt=J*W-Q;rt[O]=gt*B,rt[M]=w*k,rt[S]=Y,d.push(rt.x,rt.y,rt.z),rt[O]=0,rt[M]=0,rt[S]=D>0?1:-1,x.push(rt.x,rt.y,rt.z),v.push(J/L),v.push(1-ht/b),F+=1}}for(let ht=0;ht<b;ht++)for(let w=0;w<L;w++){const J=_+w+j*ht,gt=_+w+j*(ht+1),Et=_+(w+1)+j*(ht+1),Nt=_+(w+1)+j*ht;m.push(J,gt,Nt),m.push(gt,Et,Nt),ut+=6}p.addGroup(E,ut,P),E+=ut,_+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jo(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Qu extends ji{constructor(t=1,i=1,r=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:r,heightSegments:l};const c=t/2,h=i/2,p=Math.floor(r),m=Math.floor(l),d=p+1,x=m+1,v=t/p,_=i/m,E=[],R=[],O=[],M=[];for(let S=0;S<x;S++){const B=S*_-h;for(let k=0;k<d;k++){const U=k*v-c;R.push(U,-B,0),O.push(0,0,1),M.push(k/p),M.push(1-S/m)}}for(let S=0;S<m;S++)for(let B=0;B<p;B++){const k=B+d*S,U=B+d*(S+1),C=B+1+d*(S+1),D=B+1+d*S;E.push(k,U,D),E.push(U,C,D)}this.setIndex(E),this.setAttribute("position",new Zi(R,3)),this.setAttribute("normal",new Zi(O,3)),this.setAttribute("uv",new Zi(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qu(t.width,t.height,t.widthSegments,t.heightSegments)}}function Hs(s){const t={};for(const i in s){t[i]={};for(const r in s[i]){const l=s[i][r];if(l_(l))l.isRenderTargetTexture?(ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][r]=null):t[i][r]=l.clone();else if(Array.isArray(l))if(l_(l[0])){const c=[];for(let h=0,p=l.length;h<p;h++)c[h]=l[h].clone();t[i][r]=c}else t[i][r]=l.slice();else t[i][r]=l}}return t}function Fn(s){const t={};for(let i=0;i<s.length;i++){const r=Hs(s[i]);for(const l in r)t[l]=r[l]}return t}function l_(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function $y(s){const t=[];for(let i=0;i<s.length;i++)t.push(s[i].clone());return t}function vv(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ee.workingColorSpace}const tM={clone:Hs,merge:Fn};var eM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,nM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ji extends Ku{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=eM,this.fragmentShader=nM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Hs(t.uniforms),this.uniformsGroups=$y(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(t).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const r={};for(const l in this.extensions)this.extensions[l]===!0&&(r[l]=!0);return Object.keys(r).length>0&&(i.extensions=r),i}fromJSON(t,i){if(super.fromJSON(t,i),t.uniforms!==void 0)for(const r in t.uniforms){const l=t.uniforms[r];switch(this.uniforms[r]={},l.type){case"t":this.uniforms[r].value=i[l.value]||null;break;case"c":this.uniforms[r].value=new Oe().setHex(l.value);break;case"v2":this.uniforms[r].value=new ie().fromArray(l.value);break;case"v3":this.uniforms[r].value=new nt().fromArray(l.value);break;case"v4":this.uniforms[r].value=new rn().fromArray(l.value);break;case"m3":this.uniforms[r].value=new re().fromArray(l.value);break;case"m4":this.uniforms[r].value=new gn().fromArray(l.value);break;default:this.uniforms[r].value=l.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const r in t.extensions)this.extensions[r]=t.extensions[r];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Sv extends Ji{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class iM extends Ku{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=dy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class aM extends Ku{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Du=new nt,wu=new lr,ki=new nt;class qd extends fi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new gn,this.projectionMatrix=new gn,this.projectionMatrixInverse=new gn,this.coordinateSystem=Yi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Du,wu,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Du,wu,ki.set(1,1,1)).invert()}updateWorldMatrix(t,i,r=!1){super.updateWorldMatrix(t,i,r),this.matrixWorld.decompose(Du,wu,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Du,wu,ki.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const sr=new nt,u_=new ie,c_=new ie;class Ei extends qd{constructor(t=50,i=1,r=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=r,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=wd*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Hu*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return wd*2*Math.atan(Math.tan(Hu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,r){sr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(sr.x,sr.y).multiplyScalar(-t/sr.z),sr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(sr.x,sr.y).multiplyScalar(-t/sr.z)}getViewSize(t,i){return this.getViewBounds(t,u_,c_),i.subVectors(c_,u_)}setViewOffset(t,i,r,l,c,h){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(Hu*.5*this.fov)/this.zoom,r=2*i,l=this.aspect*r,c=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const m=h.fullWidth,d=h.fullHeight;c+=h.offsetX*l/m,i-=h.offsetY*r/d,l*=h.width/m,r*=h.height/d}const p=this.filmOffset;p!==0&&(c+=t*p/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-r,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class xv extends qd{constructor(t=-1,i=1,r=1,l=-1,c=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=r,this.bottom=l,this.near=c,this.far=h,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,r,l,c,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=r-t,h=r+t,p=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,x=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=d*this.view.offsetX,h=c+d*this.view.width,p-=x*this.view.offsetY,m=p-x*this.view.height}this.projectionMatrix.makeOrthographic(c,h,p,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}const Ds=-90,ws=1;class rM extends fi{constructor(t,i,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Ei(Ds,ws,t,i);l.layers=this.layers,this.add(l);const c=new Ei(Ds,ws,t,i);c.layers=this.layers,this.add(c);const h=new Ei(Ds,ws,t,i);h.layers=this.layers,this.add(h);const p=new Ei(Ds,ws,t,i);p.layers=this.layers,this.add(p);const m=new Ei(Ds,ws,t,i);m.layers=this.layers,this.add(m);const d=new Ei(Ds,ws,t,i);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[r,l,c,h,p,m]=i;for(const d of i)this.remove(d);if(t===Yi)r.up.set(0,1,0),r.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),p.up.set(0,1,0),p.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===Wu)r.up.set(0,-1,0),r.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),p.up.set(0,-1,0),p.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of i)this.add(d),d.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,h,p,m,d,x]=this.children,v=t.getRenderTarget(),_=t.getActiveCubeFace(),E=t.getActiveMipmapLevel(),R=t.xr.enabled;t.xr.enabled=!1;const O=r.texture.generateMipmaps;r.texture.generateMipmaps=!1;let M=!1;t.isWebGLRenderer===!0?M=t.state.buffers.depth.getReversed():M=t.reversedDepthBuffer,t.setRenderTarget(r,0,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,c),t.setRenderTarget(r,1,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,h),t.setRenderTarget(r,2,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,p),t.setRenderTarget(r,3,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,m),t.setRenderTarget(r,4,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,d),r.texture.generateMipmaps=O,t.setRenderTarget(r,5,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,x),t.setRenderTarget(v,_,E),t.xr.enabled=R,r.texture.needsPMREMUpdate=!0}}class sM extends Ei{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class f_{constructor(t=1,i=0,r=0){this.radius=t,this.phi=i,this.theta=r}set(t,i,r){return this.radius=t,this.phi=i,this.theta=r,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ve(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,i,r){return this.radius=Math.sqrt(t*t+i*i+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,r),this.phi=Math.acos(ve(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const tp=class tp{constructor(t,i,r,l){this.elements=[1,0,0,1],t!==void 0&&this.set(t,i,r,l)}identity(){return this.set(1,0,0,1),this}fromArray(t,i=0){for(let r=0;r<4;r++)this.elements[r]=t[r+i];return this}set(t,i,r,l){const c=this.elements;return c[0]=t,c[2]=i,c[1]=r,c[3]=l,this}};tp.prototype.isMatrix2=!0;let h_=tp;class oM extends ur{constructor(t,i=null){super(),this.object=t,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function d_(s,t,i,r){const l=lM(r);switch(i){case av:return s*t;case sv:return s*t/l.components*l.byteLength;case Fd:return s*t/l.components*l.byteLength;case Fr:return s*t*2/l.components*l.byteLength;case Hd:return s*t*2/l.components*l.byteLength;case rv:return s*t*3/l.components*l.byteLength;case bi:return s*t*4/l.components*l.byteLength;case Gd:return s*t*4/l.components*l.byteLength;case Iu:case Bu:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case zu:case Fu:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case td:case nd:return Math.max(s,16)*Math.max(t,8)/4;case $h:case ed:return Math.max(s,8)*Math.max(t,8)/2;case id:case ad:case sd:case od:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case rd:case Vu:case ld:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ud:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case cd:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case fd:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case hd:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case dd:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case pd:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case md:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case gd:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case _d:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case vd:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Sd:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case xd:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case yd:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Md:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Ed:case bd:case Td:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Ad:case Rd:return Math.ceil(s/4)*Math.ceil(t/4)*8;case ku:case Cd:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function lM(s){switch(s){case ci:case tv:return{byteLength:1,components:1};case qo:case ev:case Ii:return{byteLength:2,components:1};case Bd:case zd:return{byteLength:2,components:4};case Ki:case Id:case qi:return{byteLength:4,components:1};case nv:case iv:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pd}}));typeof window<"u"&&(window.__THREE__?ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pd);function yv(){let s=null,t=!1,i=null,r=null;function l(c,h){r=s.requestAnimationFrame(l),i(c,h)}return{start:function(){t!==!0&&i!==null&&s!==null&&(r=s.requestAnimationFrame(l),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(c){i=c},setContext:function(c){s=c}}}function uM(s){const t=new WeakMap;function i(p,m){const d=p.array,x=p.usage,v=d.byteLength,_=s.createBuffer();s.bindBuffer(m,_),s.bufferData(m,d,x),p.onUploadCallback();let E;if(d instanceof Float32Array)E=s.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)E=s.HALF_FLOAT;else if(d instanceof Uint16Array)p.isFloat16BufferAttribute?E=s.HALF_FLOAT:E=s.UNSIGNED_SHORT;else if(d instanceof Int16Array)E=s.SHORT;else if(d instanceof Uint32Array)E=s.UNSIGNED_INT;else if(d instanceof Int32Array)E=s.INT;else if(d instanceof Int8Array)E=s.BYTE;else if(d instanceof Uint8Array)E=s.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)E=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:_,type:E,bytesPerElement:d.BYTES_PER_ELEMENT,version:p.version,size:v}}function r(p,m,d){const x=m.array,v=m.updateRanges;if(s.bindBuffer(d,p),v.length===0)s.bufferSubData(d,0,x);else{v.sort((E,R)=>E.start-R.start);let _=0;for(let E=1;E<v.length;E++){const R=v[_],O=v[E];O.start<=R.start+R.count+1?R.count=Math.max(R.count,O.start+O.count-R.start):(++_,v[_]=O)}v.length=_+1;for(let E=0,R=v.length;E<R;E++){const O=v[E];s.bufferSubData(d,O.start*x.BYTES_PER_ELEMENT,x,O.start,O.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(p){return p.isInterleavedBufferAttribute&&(p=p.data),t.get(p)}function c(p){p.isInterleavedBufferAttribute&&(p=p.data);const m=t.get(p);m&&(s.deleteBuffer(m.buffer),t.delete(p))}function h(p,m){if(p.isInterleavedBufferAttribute&&(p=p.data),p.isGLBufferAttribute){const x=t.get(p);(!x||x.version<p.version)&&t.set(p,{buffer:p.buffer,type:p.type,bytesPerElement:p.elementSize,version:p.version});return}const d=t.get(p);if(d===void 0)t.set(p,i(p,m));else if(d.version<p.version){if(d.size!==p.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,p,m),d.version=p.version}}return{get:l,remove:c,update:h}}var cM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fM=`#ifdef USE_ALPHAHASH
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
#endif`,hM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,mM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gM=`#ifdef USE_AOMAP
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
#endif`,_M=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vM=`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,SM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,MM=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,EM=`#ifdef USE_IRIDESCENCE
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
#endif`,bM=`#ifdef USE_BUMPMAP
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
#endif`,TM=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,AM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,RM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,CM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,DM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,wM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,UM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,LM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,NM=`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,OM=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,PM=`vec3 transformedNormal = objectNormal;
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
#endif`,IM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,BM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,FM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,HM="gl_FragColor = linearToOutputTexel( gl_FragColor );",GM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,VM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,kM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,XM=`#ifdef USE_ENVMAP
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
#endif`,WM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,YM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ZM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,KM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,QM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,JM=`#ifdef USE_GRADIENTMAP
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
}`,jM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$M=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,eE=`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#endif
#include <lightprobes_pars_fragment>`,nE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
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
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,iE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,aE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,rE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,oE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,lE=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,uE=`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,cE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,fE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hE=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,dE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_E=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,SE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,xE=`#if defined( USE_POINTS_UV )
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
#endif`,yE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ME=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,EE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,TE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,AE=`#ifdef USE_MORPHTARGETS
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
#endif`,RE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,CE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,DE=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,wE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,UE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,LE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,NE=`#ifdef USE_NORMALMAP
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
#endif`,OE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,PE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,IE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,BE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,FE=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,HE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,GE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,VE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,kE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,XE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,WE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,YE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
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
#endif`,ZE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,KE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,QE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,JE=`#ifdef USE_SKINNING
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
#endif`,jE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$E=`#ifdef USE_SKINNING
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
#endif`,tb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,eb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,nb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ib=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ab=`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,rb=`#ifdef USE_TRANSMISSION
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
#endif`,sb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ob=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ub=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const cb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fb=`uniform sampler2D t2D;
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
}`,hb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,db=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gb=`#include <common>
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
}`,_b=`#if DEPTH_PACKING == 3200
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
}`,vb=`#define DISTANCE
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
}`,Sb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,xb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,yb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mb=`uniform float scale;
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
}`,Eb=`uniform vec3 diffuse;
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
}`,bb=`#include <common>
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
}`,Tb=`uniform vec3 diffuse;
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
}`,Ab=`#define LAMBERT
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
}`,Rb=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,Cb=`#define MATCAP
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
}`,Db=`#define MATCAP
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
}`,wb=`#define NORMAL
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
}`,Ub=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Lb=`#define PHONG
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
}`,Nb=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,Ob=`#define STANDARD
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
}`,Pb=`#define STANDARD
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
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,Ib=`#define TOON
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
}`,Bb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,zb=`uniform float size;
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
}`,Fb=`uniform vec3 diffuse;
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
}`,Hb=`#include <common>
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
}`,Gb=`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,Vb=`uniform float rotation;
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
}`,kb=`uniform vec3 diffuse;
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
}`,de={alphahash_fragment:cM,alphahash_pars_fragment:fM,alphamap_fragment:hM,alphamap_pars_fragment:dM,alphatest_fragment:pM,alphatest_pars_fragment:mM,aomap_fragment:gM,aomap_pars_fragment:_M,batching_pars_vertex:vM,batching_vertex:SM,begin_vertex:xM,beginnormal_vertex:yM,bsdfs:MM,iridescence_fragment:EM,bumpmap_pars_fragment:bM,clipping_planes_fragment:TM,clipping_planes_pars_fragment:AM,clipping_planes_pars_vertex:RM,clipping_planes_vertex:CM,color_fragment:DM,color_pars_fragment:wM,color_pars_vertex:UM,color_vertex:LM,common:NM,cube_uv_reflection_fragment:OM,defaultnormal_vertex:PM,displacementmap_pars_vertex:IM,displacementmap_vertex:BM,emissivemap_fragment:zM,emissivemap_pars_fragment:FM,colorspace_fragment:HM,colorspace_pars_fragment:GM,envmap_fragment:VM,envmap_common_pars_fragment:kM,envmap_pars_fragment:XM,envmap_pars_vertex:WM,envmap_physical_pars_fragment:nE,envmap_vertex:qM,fog_vertex:YM,fog_pars_vertex:ZM,fog_fragment:KM,fog_pars_fragment:QM,gradientmap_pars_fragment:JM,lightmap_pars_fragment:jM,lights_lambert_fragment:$M,lights_lambert_pars_fragment:tE,lights_pars_begin:eE,lights_toon_fragment:iE,lights_toon_pars_fragment:aE,lights_phong_fragment:rE,lights_phong_pars_fragment:sE,lights_physical_fragment:oE,lights_physical_pars_fragment:lE,lights_fragment_begin:uE,lights_fragment_maps:cE,lights_fragment_end:fE,lightprobes_pars_fragment:hE,logdepthbuf_fragment:dE,logdepthbuf_pars_fragment:pE,logdepthbuf_pars_vertex:mE,logdepthbuf_vertex:gE,map_fragment:_E,map_pars_fragment:vE,map_particle_fragment:SE,map_particle_pars_fragment:xE,metalnessmap_fragment:yE,metalnessmap_pars_fragment:ME,morphinstance_vertex:EE,morphcolor_vertex:bE,morphnormal_vertex:TE,morphtarget_pars_vertex:AE,morphtarget_vertex:RE,normal_fragment_begin:CE,normal_fragment_maps:DE,normal_pars_fragment:wE,normal_pars_vertex:UE,normal_vertex:LE,normalmap_pars_fragment:NE,clearcoat_normal_fragment_begin:OE,clearcoat_normal_fragment_maps:PE,clearcoat_pars_fragment:IE,iridescence_pars_fragment:BE,opaque_fragment:zE,packing:FE,premultiplied_alpha_fragment:HE,project_vertex:GE,dithering_fragment:VE,dithering_pars_fragment:kE,roughnessmap_fragment:XE,roughnessmap_pars_fragment:WE,shadowmap_pars_fragment:qE,shadowmap_pars_vertex:YE,shadowmap_vertex:ZE,shadowmask_pars_fragment:KE,skinbase_vertex:QE,skinning_pars_vertex:JE,skinning_vertex:jE,skinnormal_vertex:$E,specularmap_fragment:tb,specularmap_pars_fragment:eb,tonemapping_fragment:nb,tonemapping_pars_fragment:ib,transmission_fragment:ab,transmission_pars_fragment:rb,uv_pars_fragment:sb,uv_pars_vertex:ob,uv_vertex:lb,worldpos_vertex:ub,background_vert:cb,background_frag:fb,backgroundCube_vert:hb,backgroundCube_frag:db,cube_vert:pb,cube_frag:mb,depth_vert:gb,depth_frag:_b,distance_vert:vb,distance_frag:Sb,equirect_vert:xb,equirect_frag:yb,linedashed_vert:Mb,linedashed_frag:Eb,meshbasic_vert:bb,meshbasic_frag:Tb,meshlambert_vert:Ab,meshlambert_frag:Rb,meshmatcap_vert:Cb,meshmatcap_frag:Db,meshnormal_vert:wb,meshnormal_frag:Ub,meshphong_vert:Lb,meshphong_frag:Nb,meshphysical_vert:Ob,meshphysical_frag:Pb,meshtoon_vert:Ib,meshtoon_frag:Bb,points_vert:zb,points_frag:Fb,shadow_vert:Hb,shadow_frag:Gb,sprite_vert:Vb,sprite_frag:kb},It={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new re}},envmap:{envMap:{value:null},envMapRotation:{value:new re},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new re}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new re}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new re},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new re},normalScale:{value:new ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new re},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new re}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new re}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new re}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new nt},probesMax:{value:new nt},probesResolution:{value:new nt}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0},uvTransform:{value:new re}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}}},Wi={basic:{uniforms:Fn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.fog]),vertexShader:de.meshbasic_vert,fragmentShader:de.meshbasic_frag},lambert:{uniforms:Fn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new Oe(0)},envMapIntensity:{value:1}}]),vertexShader:de.meshlambert_vert,fragmentShader:de.meshlambert_frag},phong:{uniforms:Fn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:de.meshphong_vert,fragmentShader:de.meshphong_frag},standard:{uniforms:Fn([It.common,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.roughnessmap,It.metalnessmap,It.fog,It.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:de.meshphysical_vert,fragmentShader:de.meshphysical_frag},toon:{uniforms:Fn([It.common,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.gradientmap,It.fog,It.lights,{emissive:{value:new Oe(0)}}]),vertexShader:de.meshtoon_vert,fragmentShader:de.meshtoon_frag},matcap:{uniforms:Fn([It.common,It.bumpmap,It.normalmap,It.displacementmap,It.fog,{matcap:{value:null}}]),vertexShader:de.meshmatcap_vert,fragmentShader:de.meshmatcap_frag},points:{uniforms:Fn([It.points,It.fog]),vertexShader:de.points_vert,fragmentShader:de.points_frag},dashed:{uniforms:Fn([It.common,It.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:de.linedashed_vert,fragmentShader:de.linedashed_frag},depth:{uniforms:Fn([It.common,It.displacementmap]),vertexShader:de.depth_vert,fragmentShader:de.depth_frag},normal:{uniforms:Fn([It.common,It.bumpmap,It.normalmap,It.displacementmap,{opacity:{value:1}}]),vertexShader:de.meshnormal_vert,fragmentShader:de.meshnormal_frag},sprite:{uniforms:Fn([It.sprite,It.fog]),vertexShader:de.sprite_vert,fragmentShader:de.sprite_frag},background:{uniforms:{uvTransform:{value:new re},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:de.background_vert,fragmentShader:de.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new re}},vertexShader:de.backgroundCube_vert,fragmentShader:de.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:de.cube_vert,fragmentShader:de.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:de.equirect_vert,fragmentShader:de.equirect_frag},distance:{uniforms:Fn([It.common,It.displacementmap,{referencePosition:{value:new nt},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:de.distance_vert,fragmentShader:de.distance_frag},shadow:{uniforms:Fn([It.lights,It.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:de.shadow_vert,fragmentShader:de.shadow_frag}};Wi.physical={uniforms:Fn([Wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new re},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new re},clearcoatNormalScale:{value:new ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new re},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new re},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new re},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new re},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new re},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new re},transmissionSamplerSize:{value:new ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new re},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new re},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new re},anisotropyVector:{value:new ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new re}}]),vertexShader:de.meshphysical_vert,fragmentShader:de.meshphysical_frag};const Uu={r:0,b:0,g:0},Xb=new gn,Mv=new re;Mv.set(-1,0,0,0,1,0,0,0,1);function Wb(s,t,i,r,l,c){const h=new Oe(0);let p=l===!0?0:1,m,d,x=null,v=0,_=null;function E(B){let k=B.isScene===!0?B.background:null;if(k&&k.isTexture){const U=B.backgroundBlurriness>0;k=t.get(k,U)}return k}function R(B){let k=!1;const U=E(B);U===null?M(h,p):U&&U.isColor&&(M(U,1),k=!0);const C=s.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,c):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(s.autoClear||k)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function O(B,k){const U=E(k);U&&(U.isCubeTexture||U.mapping===Zu)?(d===void 0&&(d=new Qi(new jo(1,1,1),new Ji({name:"BackgroundCubeMaterial",uniforms:Hs(Wi.backgroundCube.uniforms),vertexShader:Wi.backgroundCube.vertexShader,fragmentShader:Wi.backgroundCube.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(C,D,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),d.material.uniforms.envMap.value=U,d.material.uniforms.backgroundBlurriness.value=k.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=k.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Xb.makeRotationFromEuler(k.backgroundRotation)).transpose(),U.isCubeTexture&&U.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(Mv),d.material.toneMapped=Ee.getTransfer(U.colorSpace)!==Be,(x!==U||v!==U.version||_!==s.toneMapping)&&(d.material.needsUpdate=!0,x=U,v=U.version,_=s.toneMapping),d.layers.enableAll(),B.unshift(d,d.geometry,d.material,0,0,null)):U&&U.isTexture&&(m===void 0&&(m=new Qi(new Qu(2,2),new Ji({name:"BackgroundMaterial",uniforms:Hs(Wi.background.uniforms),vertexShader:Wi.background.vertexShader,fragmentShader:Wi.background.fragmentShader,side:Br,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(m)),m.material.uniforms.t2D.value=U,m.material.uniforms.backgroundIntensity.value=k.backgroundIntensity,m.material.toneMapped=Ee.getTransfer(U.colorSpace)!==Be,U.matrixAutoUpdate===!0&&U.updateMatrix(),m.material.uniforms.uvTransform.value.copy(U.matrix),(x!==U||v!==U.version||_!==s.toneMapping)&&(m.material.needsUpdate=!0,x=U,v=U.version,_=s.toneMapping),m.layers.enableAll(),B.unshift(m,m.geometry,m.material,0,0,null))}function M(B,k){B.getRGB(Uu,vv(s)),i.buffers.color.setClear(Uu.r,Uu.g,Uu.b,k,c)}function S(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return h},setClearColor:function(B,k=1){h.set(B),p=k,M(h,p)},getClearAlpha:function(){return p},setClearAlpha:function(B){p=B,M(h,p)},render:R,addToRenderList:O,dispose:S}}function qb(s,t){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},l=_(null);let c=l,h=!1;function p(q,Q,lt,Y,j){let I=!1;const F=v(q,Y,lt,Q);c!==F&&(c=F,d(c.object)),I=E(q,Y,lt,j),I&&R(q,Y,lt,j),j!==null&&t.update(j,s.ELEMENT_ARRAY_BUFFER),(I||h)&&(h=!1,U(q,Q,lt,Y),j!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(j).buffer))}function m(){return s.createVertexArray()}function d(q){return s.bindVertexArray(q)}function x(q){return s.deleteVertexArray(q)}function v(q,Q,lt,Y){const j=Y.wireframe===!0;let I=r[Q.id];I===void 0&&(I={},r[Q.id]=I);const F=q.isInstancedMesh===!0?q.id:0;let ut=I[F];ut===void 0&&(ut={},I[F]=ut);let rt=ut[lt.id];rt===void 0&&(rt={},ut[lt.id]=rt);let ht=rt[j];return ht===void 0&&(ht=_(m()),rt[j]=ht),ht}function _(q){const Q=[],lt=[],Y=[];for(let j=0;j<i;j++)Q[j]=0,lt[j]=0,Y[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Q,enabledAttributes:lt,attributeDivisors:Y,object:q,attributes:{},index:null}}function E(q,Q,lt,Y){const j=c.attributes,I=Q.attributes;let F=0;const ut=lt.getAttributes();for(const rt in ut)if(ut[rt].location>=0){const w=j[rt];let J=I[rt];if(J===void 0&&(rt==="instanceMatrix"&&q.instanceMatrix&&(J=q.instanceMatrix),rt==="instanceColor"&&q.instanceColor&&(J=q.instanceColor)),w===void 0||w.attribute!==J||J&&w.data!==J.data)return!0;F++}return c.attributesNum!==F||c.index!==Y}function R(q,Q,lt,Y){const j={},I=Q.attributes;let F=0;const ut=lt.getAttributes();for(const rt in ut)if(ut[rt].location>=0){let w=I[rt];w===void 0&&(rt==="instanceMatrix"&&q.instanceMatrix&&(w=q.instanceMatrix),rt==="instanceColor"&&q.instanceColor&&(w=q.instanceColor));const J={};J.attribute=w,w&&w.data&&(J.data=w.data),j[rt]=J,F++}c.attributes=j,c.attributesNum=F,c.index=Y}function O(){const q=c.newAttributes;for(let Q=0,lt=q.length;Q<lt;Q++)q[Q]=0}function M(q){S(q,0)}function S(q,Q){const lt=c.newAttributes,Y=c.enabledAttributes,j=c.attributeDivisors;lt[q]=1,Y[q]===0&&(s.enableVertexAttribArray(q),Y[q]=1),j[q]!==Q&&(s.vertexAttribDivisor(q,Q),j[q]=Q)}function B(){const q=c.newAttributes,Q=c.enabledAttributes;for(let lt=0,Y=Q.length;lt<Y;lt++)Q[lt]!==q[lt]&&(s.disableVertexAttribArray(lt),Q[lt]=0)}function k(q,Q,lt,Y,j,I,F){F===!0?s.vertexAttribIPointer(q,Q,lt,j,I):s.vertexAttribPointer(q,Q,lt,Y,j,I)}function U(q,Q,lt,Y){O();const j=Y.attributes,I=lt.getAttributes(),F=Q.defaultAttributeValues;for(const ut in I){const rt=I[ut];if(rt.location>=0){let ht=j[ut];if(ht===void 0&&(ut==="instanceMatrix"&&q.instanceMatrix&&(ht=q.instanceMatrix),ut==="instanceColor"&&q.instanceColor&&(ht=q.instanceColor)),ht!==void 0){const w=ht.normalized,J=ht.itemSize,gt=t.get(ht);if(gt===void 0)continue;const Et=gt.buffer,Nt=gt.type,Xt=gt.bytesPerElement,it=Nt===s.INT||Nt===s.UNSIGNED_INT||ht.gpuType===Id;if(ht.isInterleavedBufferAttribute){const _t=ht.data,Tt=_t.stride,te=ht.offset;if(_t.isInstancedInterleavedBuffer){for(let Ht=0;Ht<rt.locationSize;Ht++)S(rt.location+Ht,_t.meshPerAttribute);q.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=_t.meshPerAttribute*_t.count)}else for(let Ht=0;Ht<rt.locationSize;Ht++)M(rt.location+Ht);s.bindBuffer(s.ARRAY_BUFFER,Et);for(let Ht=0;Ht<rt.locationSize;Ht++)k(rt.location+Ht,J/rt.locationSize,Nt,w,Tt*Xt,(te+J/rt.locationSize*Ht)*Xt,it)}else{if(ht.isInstancedBufferAttribute){for(let _t=0;_t<rt.locationSize;_t++)S(rt.location+_t,ht.meshPerAttribute);q.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let _t=0;_t<rt.locationSize;_t++)M(rt.location+_t);s.bindBuffer(s.ARRAY_BUFFER,Et);for(let _t=0;_t<rt.locationSize;_t++)k(rt.location+_t,J/rt.locationSize,Nt,w,J*Xt,J/rt.locationSize*_t*Xt,it)}}else if(F!==void 0){const w=F[ut];if(w!==void 0)switch(w.length){case 2:s.vertexAttrib2fv(rt.location,w);break;case 3:s.vertexAttrib3fv(rt.location,w);break;case 4:s.vertexAttrib4fv(rt.location,w);break;default:s.vertexAttrib1fv(rt.location,w)}}}}B()}function C(){P();for(const q in r){const Q=r[q];for(const lt in Q){const Y=Q[lt];for(const j in Y){const I=Y[j];for(const F in I)x(I[F].object),delete I[F];delete Y[j]}}delete r[q]}}function D(q){if(r[q.id]===void 0)return;const Q=r[q.id];for(const lt in Q){const Y=Q[lt];for(const j in Y){const I=Y[j];for(const F in I)x(I[F].object),delete I[F];delete Y[j]}}delete r[q.id]}function L(q){for(const Q in r){const lt=r[Q];for(const Y in lt){const j=lt[Y];if(j[q.id]===void 0)continue;const I=j[q.id];for(const F in I)x(I[F].object),delete I[F];delete j[q.id]}}}function b(q){for(const Q in r){const lt=r[Q],Y=q.isInstancedMesh===!0?q.id:0,j=lt[Y];if(j!==void 0){for(const I in j){const F=j[I];for(const ut in F)x(F[ut].object),delete F[ut];delete j[I]}delete lt[Y],Object.keys(lt).length===0&&delete r[Q]}}}function P(){W(),h=!0,c!==l&&(c=l,d(c.object))}function W(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:p,reset:P,resetDefaultState:W,dispose:C,releaseStatesOfGeometry:D,releaseStatesOfObject:b,releaseStatesOfProgram:L,initAttributes:O,enableAttribute:M,disableUnusedAttributes:B}}function Yb(s,t,i){let r;function l(m){r=m}function c(m,d){s.drawArrays(r,m,d),i.update(d,r,1)}function h(m,d,x){x!==0&&(s.drawArraysInstanced(r,m,d,x),i.update(d,r,x))}function p(m,d,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,m,0,d,0,x);let _=0;for(let E=0;E<x;E++)_+=d[E];i.update(_,r,1)}this.setMode=l,this.render=c,this.renderInstances=h,this.renderMultiDraw=p}function Zb(s,t,i,r){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const L=t.get("EXT_texture_filter_anisotropic");l=s.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(L){return!(L!==bi&&r.convert(L)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function p(L){const b=L===Ii&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(L!==ci&&L!==qi&&!b&&r.convert(L)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function m(L){if(L==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=i.precision!==void 0?i.precision:"highp";const x=m(d);x!==d&&(ne("WebGLRenderer:",d,"not supported, using",x,"instead."),d=x);const v=i.logarithmicDepthBuffer===!0,_=i.reversedDepthBuffer===!0&&t.has("EXT_clip_control");i.reversedDepthBuffer===!0&&_===!1&&ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const E=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),R=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),O=s.getParameter(s.MAX_TEXTURE_SIZE),M=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),S=s.getParameter(s.MAX_VERTEX_ATTRIBS),B=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),k=s.getParameter(s.MAX_VARYING_VECTORS),U=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),C=s.getParameter(s.MAX_SAMPLES),D=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:h,textureTypeReadable:p,precision:d,logarithmicDepthBuffer:v,reversedDepthBuffer:_,maxTextures:E,maxVertexTextures:R,maxTextureSize:O,maxCubemapSize:M,maxAttributes:S,maxVertexUniforms:B,maxVaryings:k,maxFragmentUniforms:U,maxSamples:C,samples:D}}function Kb(s){const t=this;let i=null,r=0,l=!1,c=!1;const h=new Ma,p=new re,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(v,_){const E=v.length!==0||_||r!==0||l;return l=_,r=v.length,E},this.beginShadows=function(){c=!0,x(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(v,_){i=x(v,_,0)},this.setState=function(v,_,E){const R=v.clippingPlanes,O=v.clipIntersection,M=v.clipShadows,S=s.get(v);if(!l||R===null||R.length===0||c&&!M)c?x(null):d();else{const B=c?0:r,k=B*4;let U=S.clippingState||null;m.value=U,U=x(R,_,k,E);for(let C=0;C!==k;++C)U[C]=i[C];S.clippingState=U,this.numIntersection=O?this.numPlanes:0,this.numPlanes+=B}};function d(){m.value!==i&&(m.value=i,m.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function x(v,_,E,R){const O=v!==null?v.length:0;let M=null;if(O!==0){if(M=m.value,R!==!0||M===null){const S=E+O*4,B=_.matrixWorldInverse;p.getNormalMatrix(B),(M===null||M.length<S)&&(M=new Float32Array(S));for(let k=0,U=E;k!==O;++k,U+=4)h.copy(v[k]).applyMatrix4(B,p),h.normal.toArray(M,U),M[U+3]=h.constant}m.value=M,m.needsUpdate=!0}return t.numPlanes=O,t.numIntersection=0,M}}const Ps=4,Qb=6,Jb=20,jb=256,Ho=new xv,p_=new Oe;let Oh=null,Ph=0,Ih=0,Bh=!1;const $b=new nt,Nr=new nt;class m_{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,i=0,r=.1,l=100,c={}){const{size:h=256,position:p=$b}=c;Oh=this._renderer.getRenderTarget(),Ph=this._renderer.getActiveCubeFace(),Ih=this._renderer.getActiveMipmapLevel(),Bh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,r,l,m,p),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=v_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=__(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Oh,Ph,Ih),this._renderer.xr.enabled=Bh,t.scissorTest=!1,Us(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===zr||t.mapping===Fs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Oh=this._renderer.getRenderTarget(),Ph=this._renderer.getActiveCubeFace(),Ih=this._renderer.getActiveMipmapLevel(),Bh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=i||this._allocateTargets();return this._textureToCubeUV(t,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,r={magFilter:Tn,minFilter:Tn,generateMipmaps:!1,type:Ii,format:bi,colorSpace:Zo,depthBuffer:!1},l=g_(t,i,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=g_(t,i,r);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=tT(c)),this._blurMaterial=nT(c,t,i),this._ggxMaterial=eT(c,t,i)}return l}_compileMaterial(t){const i=new Qi(new ji,t);this._renderer.compile(i,Ho)}_sceneToCubeUV(t,i,r,l,c){const m=new Ei(90,1,i,r),d=[1,-1,1,1,1,1],x=[1,1,1,-1,-1,-1],v=this._renderer,_=v.autoClear,E=v.toneMapping;v.getClearColor(p_),v.toneMapping=Pi,v.autoClear=!1,v.state.buffers.depth.getReversed()&&(v.setRenderTarget(l),v.clearDepth(),v.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Qi(new jo,new pv({name:"PMREM.Background",side:Jn,depthWrite:!1,depthTest:!1})));const O=this._backgroundBox,M=O.material;let S=!1;const B=t.background;B?B.isColor&&(M.color.copy(B),t.background=null,S=!0):(M.color.copy(p_),S=!0);for(let k=0;k<6;k++){const U=k%3;U===0?(m.up.set(0,d[k],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+x[k],c.y,c.z)):U===1?(m.up.set(0,0,d[k]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+x[k],c.z)):(m.up.set(0,d[k],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+x[k]));const C=this._cubeSize;Us(l,U*C,k>2?C:0,C,C),v.setRenderTarget(l),S&&v.render(O,m),v.render(t,m)}v.toneMapping=E,v.autoClear=_,t.background=B}_textureToCubeUV(t,i){const r=this._renderer,l=t.mapping===zr||t.mapping===Fs;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=v_()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=__());const c=l?this._cubemapMaterial:this._equirectMaterial,h=this._lodMeshes[0];h.material=c;const p=c.uniforms;p.envMap.value=t;const m=this._cubeSize;Us(i,0,0,3*m,2*m),r.setRenderTarget(i),r.render(h,Ho)}_applyPMREM(t){const i=this._renderer,r=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(t,c-1,c);i.autoClear=r}_applyGGXFilter(t,i,r){const l=this._renderer,c=this._pingPongRenderTarget,h=this._ggxMaterial,p=this._lodMeshes[r];p.material=h;const m=h.uniforms,d=r/(this._lodMeshes.length-1),x=i/(this._lodMeshes.length-1),v=Math.sqrt(d*d-x*x),_=d*1.25,E=v*_,{_lodMax:R}=this,O=this._sizeLods[r],M=3*O*(r>R-Ps?r-R+Ps:0),S=4*(this._cubeSize-O);m.envMap.value=t.texture,m.roughness.value=E,m.mipInt.value=R-i,Us(c,M,S,3*O,2*O),l.setRenderTarget(c),l.render(p,Ho),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=R-r,Us(t,M,S,3*O,2*O),l.setRenderTarget(t),l.render(p,Ho)}_blur(t,i,r,l){const c=this._pingPongRenderTarget,h=Math.min(l,Math.PI)/Math.SQRT2;this._blurPass(t,c,i,r,h),this._blurPass(c,t,r,r,h)}_blurPass(t,i,r,l,c){const h=this._renderer,p=this._blurMaterial,m=this._lodMeshes[l];m.material=p;const d=p.uniforms;d.envMap.value=t.texture,d.sigma.value=c,d.mipInt.value=this._lodMax-r;const x=this._sizeLods[l],v=3*x*(l>this._lodMax-Ps?l-this._lodMax+Ps:0),_=4*(this._cubeSize-x);Us(i,v,_,3*x,2*x),h.setRenderTarget(i),h.render(m,Ho)}}function tT(s){const t=[],i=[];let r=s;const l=s-Ps+1+Qb;for(let c=0;c<l;c++){const h=Math.pow(2,r);t.push(h);const p=1/(h-2),m=-p,d=1+p,x=[m,m,d,m,d,d,m,m,d,d,m,d],v=6,_=6,E=3,R=new Float32Array(E*_*v),O=new Float32Array(E*_*v);for(let S=0;S<v;S++){const B=S%3*2/3-1,k=S>2?0:-1,U=[B,k,0,B+2/3,k,0,B+2/3,k+1,0,B,k,0,B+2/3,k+1,0,B,k+1,0];R.set(U,E*_*S);for(let C=0;C<_;C++){const D=x[C*2]*2-1,L=x[C*2+1]*2-1;S===0?Nr.set(1,L,D):S===1?Nr.set(-D,1,-L):S===2?Nr.set(-D,L,1):S===3?Nr.set(-1,L,-D):S===4?Nr.set(-D,-1,L):Nr.set(D,L,-1),Nr.toArray(O,(S*_+C)*E)}}const M=new ji;M.setAttribute("position",new Ra(R,E)),M.setAttribute("outputDirection",new Ra(O,E)),i.push(new Qi(M,null)),r>Ps&&r--}return{lodMeshes:i,sizeLods:t}}function g_(s,t,i){const r=new Ti(s,t,i);return r.texture.mapping=Zu,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Us(s,t,i,r,l){s.viewport.set(t,i,r,l),s.scissor.set(t,i,r,l)}function eT(s,t,i){return new Ji({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:jb,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ju(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ta,depthTest:!1,depthWrite:!1})}function nT(s,t,i){return new Ji({name:"SphericalGaussianBlur",defines:{SAMPLES:Jb,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ju(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Ta,depthTest:!1,depthWrite:!1})}function __(){return new Ji({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ju(),fragmentShader:`

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
		`,blending:Ta,depthTest:!1,depthWrite:!1})}function v_(){return new Ji({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ju(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ta,depthTest:!1,depthWrite:!1})}function Ju(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Ev extends Ti{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const r={width:t,height:t,depth:1},l=[r,r,r,r,r,r];this.texture=new gv(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new jo(5,5,5),c=new Ji({name:"CubemapFromEquirect",uniforms:Hs(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Jn,blending:Ta});c.uniforms.tEquirect.value=i;const h=new Qi(l,c),p=i.minFilter;return i.minFilter===Pr&&(i.minFilter=Tn),new rM(1,10,this).update(t,h),i.minFilter=p,h.geometry.dispose(),h.material.dispose(),this}clear(t,i=!0,r=!0,l=!0){const c=t.getRenderTarget();for(let h=0;h<6;h++)t.setRenderTarget(this,h),t.clear(i,r,l);t.setRenderTarget(c)}}function iT(s){let t=new WeakMap,i=new WeakMap,r=null;function l(_,E=!1){return _==null?null:E?h(_):c(_)}function c(_){if(_&&_.isTexture){const E=_.mapping;if(E===uh||E===ch)if(t.has(_)){const R=t.get(_).texture;return p(R,_.mapping)}else{const R=_.image;if(R&&R.height>0){const O=new Ev(R.height);return O.fromEquirectangularTexture(s,_),t.set(_,O),_.addEventListener("dispose",d),p(O.texture,_.mapping)}else return null}}return _}function h(_){if(_&&_.isTexture){const E=_.mapping,R=E===uh||E===ch,O=E===zr||E===Fs;if(R||O){let M=i.get(_);const S=M!==void 0?M.texture.pmremVersion:0;if(_.isRenderTargetTexture&&_.pmremVersion!==S)return r===null&&(r=new m_(s)),M=R?r.fromEquirectangular(_,M):r.fromCubemap(_,M),M.texture.pmremVersion=_.pmremVersion,i.set(_,M),M.texture;if(M!==void 0)return M.texture;{const B=_.image;return R&&B&&B.height>0||O&&B&&m(B)?(r===null&&(r=new m_(s)),M=R?r.fromEquirectangular(_):r.fromCubemap(_),M.texture.pmremVersion=_.pmremVersion,i.set(_,M),_.addEventListener("dispose",x),M.texture):null}}}return _}function p(_,E){return E===uh?_.mapping=zr:E===ch&&(_.mapping=Fs),_}function m(_){let E=0;const R=6;for(let O=0;O<R;O++)_[O]!==void 0&&E++;return E===R}function d(_){const E=_.target;E.removeEventListener("dispose",d);const R=t.get(E);R!==void 0&&(t.delete(E),R.dispose())}function x(_){const E=_.target;E.removeEventListener("dispose",x);const R=i.get(E);R!==void 0&&(i.delete(E),R.dispose())}function v(){t=new WeakMap,i=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:l,dispose:v}}function aT(s){const t={};function i(r){if(t[r]!==void 0)return t[r];const l=s.getExtension(r);return t[r]=l,l}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){const l=i(r);return l===null&&Bs("WebGLRenderer: "+r+" extension not supported."),l}}}function rT(s,t,i,r){const l={},c=new WeakMap;function h(v){const _=v.target;_.index!==null&&t.remove(_.index);for(const R in _.attributes)t.remove(_.attributes[R]);_.removeEventListener("dispose",h),delete l[_.id];const E=c.get(_);E&&(t.remove(E),c.delete(_)),r.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,i.memory.geometries--}function p(v,_){return l[_.id]===!0||(_.addEventListener("dispose",h),l[_.id]=!0,i.memory.geometries++),_}function m(v){const _=v.attributes;for(const E in _)t.update(_[E],s.ARRAY_BUFFER)}function d(v){const _=[],E=v.index,R=v.attributes.position;let O=0;if(R===void 0)return;if(E!==null){const B=E.array;O=E.version;for(let k=0,U=B.length;k<U;k+=3){const C=B[k+0],D=B[k+1],L=B[k+2];_.push(C,D,D,L,L,C)}}else{const B=R.array;O=R.version;for(let k=0,U=B.length/3-1;k<U;k+=3){const C=k+0,D=k+1,L=k+2;_.push(C,D,D,L,L,C)}}const M=new(R.count>=65535?hv:fv)(_,1);M.version=O;const S=c.get(v);S&&t.remove(S),c.set(v,M)}function x(v){const _=c.get(v);if(_){const E=v.index;E!==null&&_.version<E.version&&d(v)}else d(v);return c.get(v)}return{get:p,update:m,getWireframeAttribute:x}}function sT(s,t,i){let r;function l(v){r=v}let c,h;function p(v){c=v.type,h=v.bytesPerElement}function m(v,_){s.drawElements(r,_,c,v*h),i.update(_,r,1)}function d(v,_,E){E!==0&&(s.drawElementsInstanced(r,_,c,v*h,E),i.update(_,r,E))}function x(v,_,E){if(E===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,_,0,c,v,0,E);let O=0;for(let M=0;M<E;M++)O+=_[M];i.update(O,r,1)}this.setMode=l,this.setIndex=p,this.render=m,this.renderInstances=d,this.renderMultiDraw=x}function oT(s){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(c,h,p){switch(i.calls++,h){case s.TRIANGLES:i.triangles+=p*(c/3);break;case s.LINES:i.lines+=p*(c/2);break;case s.LINE_STRIP:i.lines+=p*(c-1);break;case s.LINE_LOOP:i.lines+=p*c;break;case s.POINTS:i.points+=p*c;break;default:Ce("WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:r}}function lT(s,t,i){const r=new WeakMap,l=new rn;function c(h,p,m){const d=h.morphTargetInfluences,x=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,v=x!==void 0?x.length:0;let _=r.get(p);if(_===void 0||_.count!==v){let W=function(){b.dispose(),r.delete(p),p.removeEventListener("dispose",W)};var E=W;_!==void 0&&_.texture.dispose();const R=p.morphAttributes.position!==void 0,O=p.morphAttributes.normal!==void 0,M=p.morphAttributes.color!==void 0,S=p.morphAttributes.position||[],B=p.morphAttributes.normal||[],k=p.morphAttributes.color||[];let U=0;R===!0&&(U=1),O===!0&&(U=2),M===!0&&(U=3);let C=p.attributes.position.count*U,D=1;C>t.maxTextureSize&&(D=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const L=new Float32Array(C*D*4*v),b=new lv(L,C,D,v);b.type=qi,b.needsUpdate=!0;const P=U*4;for(let q=0;q<v;q++){const Q=S[q],lt=B[q],Y=k[q],j=C*D*4*q;for(let I=0;I<Q.count;I++){const F=I*P;R===!0&&(l.fromBufferAttribute(Q,I),L[j+F+0]=l.x,L[j+F+1]=l.y,L[j+F+2]=l.z,L[j+F+3]=0),O===!0&&(l.fromBufferAttribute(lt,I),L[j+F+4]=l.x,L[j+F+5]=l.y,L[j+F+6]=l.z,L[j+F+7]=0),M===!0&&(l.fromBufferAttribute(Y,I),L[j+F+8]=l.x,L[j+F+9]=l.y,L[j+F+10]=l.z,L[j+F+11]=Y.itemSize===4?l.w:1)}}_={count:v,texture:b,size:new ie(C,D)},r.set(p,_),p.addEventListener("dispose",W)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)m.getUniforms().setValue(s,"morphTexture",h.morphTexture,i);else{let R=0;for(let M=0;M<d.length;M++)R+=d[M];const O=p.morphTargetsRelative?1:1-R;m.getUniforms().setValue(s,"morphTargetBaseInfluence",O),m.getUniforms().setValue(s,"morphTargetInfluences",d)}m.getUniforms().setValue(s,"morphTargetsTexture",_.texture,i),m.getUniforms().setValue(s,"morphTargetsTextureSize",_.size)}return{update:c}}function uT(s,t,i,r,l){let c=new WeakMap;function h(d){const x=l.render.frame,v=d.geometry,_=t.get(d,v);if(c.get(_)!==x&&(t.update(_),c.set(_,x)),d.isInstancedMesh&&(d.hasEventListener("dispose",m)===!1&&d.addEventListener("dispose",m),c.get(d)!==x&&(i.update(d.instanceMatrix,s.ARRAY_BUFFER),d.instanceColor!==null&&i.update(d.instanceColor,s.ARRAY_BUFFER),c.set(d,x))),d.isSkinnedMesh){const E=d.skeleton;c.get(E)!==x&&(E.update(),c.set(E,x))}return _}function p(){c=new WeakMap}function m(d){const x=d.target;x.removeEventListener("dispose",m),r.releaseStatesOfObject(x),i.remove(x.instanceMatrix),x.instanceColor!==null&&i.remove(x.instanceColor)}return{update:h,dispose:p}}const cT={[q_]:"LINEAR_TONE_MAPPING",[Y_]:"REINHARD_TONE_MAPPING",[Z_]:"CINEON_TONE_MAPPING",[K_]:"ACES_FILMIC_TONE_MAPPING",[J_]:"AGX_TONE_MAPPING",[j_]:"NEUTRAL_TONE_MAPPING",[Q_]:"CUSTOM_TONE_MAPPING"};function fT(s,t,i,r,l,c){const h=new Ti(t,i,{type:s,depthBuffer:l,stencilBuffer:c,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let p=null,m=null;const d=new ji;d.setAttribute("position",new Zi([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new Zi([0,2,0,0,2,0],2));const x=new Sv({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),v=new Qi(d,x),_=new xv(-1,1,1,-1,0,1);let E=null,R=null,O=!1,M,S=null,B=[],k=!1;this.setSize=function(U,C){h.setSize(U,C),p!==null&&p.setSize(U,C),m!==null&&m.setSize(U,C);for(let D=0;D<B.length;D++){const L=B[D];L.setSize&&L.setSize(U,C)}},this.setEffects=function(U){B=U,k=B.length>0&&B[0].isRenderPass===!0;const C=h.width,D=h.height;B.length>0&&p===null&&(p=new Ti(C,D,{type:Ii,depthBuffer:!1,stencilBuffer:!1}),m=new Ti(C,D,{type:Ii,depthBuffer:!1,stencilBuffer:!1}));for(let L=0;L<B.length;L++){const b=B[L];b.setSize&&b.setSize(C,D)}},this.begin=function(U,C){if(O||U.toneMapping===Pi&&B.length===0)return!1;if(S=C,C!==null){const D=C.width,L=C.height;(h.width!==D||h.height!==L)&&this.setSize(D,L)}return k===!1&&U.setRenderTarget(h),M=U.toneMapping,U.toneMapping=Pi,!0},this.hasRenderPass=function(){return k},this.end=function(U,C){U.toneMapping=M,O=!0;let D=h,L=p;for(let b=0;b<B.length;b++){const P=B[b];P.enabled!==!1&&(P.render(U,L,D,C),P.needsSwap!==!1&&(D=L,L=L===p?m:p))}if(E!==U.outputColorSpace||R!==U.toneMapping){E=U.outputColorSpace,R=U.toneMapping,x.defines={},Ee.getTransfer(E)===Be&&(x.defines.SRGB_TRANSFER="");const b=cT[R];b&&(x.defines[b]=""),x.needsUpdate=!0}x.uniforms.tDiffuse.value=D.texture,U.setRenderTarget(S),U.render(v,_),S=null,O=!1},this.isCompositing=function(){return O},this.dispose=function(){h.dispose(),p!==null&&p.dispose(),m!==null&&m.dispose(),d.dispose(),x.dispose()}}const bv=new Hn,Ud=new Ko(1,1),Tv=new lv,Av=new Oy,Rv=new gv,S_=[],x_=[],y_=new Float32Array(16),M_=new Float32Array(9),E_=new Float32Array(4);function Gs(s,t,i){const r=s[0];if(r<=0||r>0)return s;const l=t*i;let c=S_[l];if(c===void 0&&(c=new Float32Array(l),S_[l]=c),t!==0){r.toArray(c,0);for(let h=1,p=0;h!==t;++h)p+=i,s[h].toArray(c,p)}return c}function xn(s,t){if(s.length!==t.length)return!1;for(let i=0,r=s.length;i<r;i++)if(s[i]!==t[i])return!1;return!0}function yn(s,t){for(let i=0,r=t.length;i<r;i++)s[i]=t[i]}function ju(s,t){let i=x_[t];i===void 0&&(i=new Int32Array(t),x_[t]=i);for(let r=0;r!==t;++r)i[r]=s.allocateTextureUnit();return i}function hT(s,t){const i=this.cache;i[0]!==t&&(s.uniform1f(this.addr,t),i[0]=t)}function dT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(xn(i,t))return;s.uniform2fv(this.addr,t),yn(i,t)}}function pT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(xn(i,t))return;s.uniform3fv(this.addr,t),yn(i,t)}}function mT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(xn(i,t))return;s.uniform4fv(this.addr,t),yn(i,t)}}function gT(s,t){const i=this.cache,r=t.elements;if(r===void 0){if(xn(i,t))return;s.uniformMatrix2fv(this.addr,!1,t),yn(i,t)}else{if(xn(i,r))return;E_.set(r),s.uniformMatrix2fv(this.addr,!1,E_),yn(i,r)}}function _T(s,t){const i=this.cache,r=t.elements;if(r===void 0){if(xn(i,t))return;s.uniformMatrix3fv(this.addr,!1,t),yn(i,t)}else{if(xn(i,r))return;M_.set(r),s.uniformMatrix3fv(this.addr,!1,M_),yn(i,r)}}function vT(s,t){const i=this.cache,r=t.elements;if(r===void 0){if(xn(i,t))return;s.uniformMatrix4fv(this.addr,!1,t),yn(i,t)}else{if(xn(i,r))return;y_.set(r),s.uniformMatrix4fv(this.addr,!1,y_),yn(i,r)}}function ST(s,t){const i=this.cache;i[0]!==t&&(s.uniform1i(this.addr,t),i[0]=t)}function xT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(xn(i,t))return;s.uniform2iv(this.addr,t),yn(i,t)}}function yT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(xn(i,t))return;s.uniform3iv(this.addr,t),yn(i,t)}}function MT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(xn(i,t))return;s.uniform4iv(this.addr,t),yn(i,t)}}function ET(s,t){const i=this.cache;i[0]!==t&&(s.uniform1ui(this.addr,t),i[0]=t)}function bT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(xn(i,t))return;s.uniform2uiv(this.addr,t),yn(i,t)}}function TT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(xn(i,t))return;s.uniform3uiv(this.addr,t),yn(i,t)}}function AT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(xn(i,t))return;s.uniform4uiv(this.addr,t),yn(i,t)}}function RT(s,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l);let c;this.type===s.SAMPLER_2D_SHADOW?(Ud.compareFunction=i.isReversedDepthBuffer()?kd:Vd,c=Ud):c=bv,i.setTexture2D(t||c,l)}function CT(s,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture3D(t||Av,l)}function DT(s,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTextureCube(t||Rv,l)}function wT(s,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture2DArray(t||Tv,l)}function UT(s){switch(s){case 5126:return hT;case 35664:return dT;case 35665:return pT;case 35666:return mT;case 35674:return gT;case 35675:return _T;case 35676:return vT;case 5124:case 35670:return ST;case 35667:case 35671:return xT;case 35668:case 35672:return yT;case 35669:case 35673:return MT;case 5125:return ET;case 36294:return bT;case 36295:return TT;case 36296:return AT;case 35678:case 36198:case 36298:case 36306:case 35682:return RT;case 35679:case 36299:case 36307:return CT;case 35680:case 36300:case 36308:case 36293:return DT;case 36289:case 36303:case 36311:case 36292:return wT}}function LT(s,t){s.uniform1fv(this.addr,t)}function NT(s,t){const i=Gs(t,this.size,2);s.uniform2fv(this.addr,i)}function OT(s,t){const i=Gs(t,this.size,3);s.uniform3fv(this.addr,i)}function PT(s,t){const i=Gs(t,this.size,4);s.uniform4fv(this.addr,i)}function IT(s,t){const i=Gs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,i)}function BT(s,t){const i=Gs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,i)}function zT(s,t){const i=Gs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,i)}function FT(s,t){s.uniform1iv(this.addr,t)}function HT(s,t){s.uniform2iv(this.addr,t)}function GT(s,t){s.uniform3iv(this.addr,t)}function VT(s,t){s.uniform4iv(this.addr,t)}function kT(s,t){s.uniform1uiv(this.addr,t)}function XT(s,t){s.uniform2uiv(this.addr,t)}function WT(s,t){s.uniform3uiv(this.addr,t)}function qT(s,t){s.uniform4uiv(this.addr,t)}function YT(s,t,i){const r=this.cache,l=t.length,c=ju(i,l);xn(r,c)||(s.uniform1iv(this.addr,c),yn(r,c));let h;this.type===s.SAMPLER_2D_SHADOW?h=Ud:h=bv;for(let p=0;p!==l;++p)i.setTexture2D(t[p]||h,c[p])}function ZT(s,t,i){const r=this.cache,l=t.length,c=ju(i,l);xn(r,c)||(s.uniform1iv(this.addr,c),yn(r,c));for(let h=0;h!==l;++h)i.setTexture3D(t[h]||Av,c[h])}function KT(s,t,i){const r=this.cache,l=t.length,c=ju(i,l);xn(r,c)||(s.uniform1iv(this.addr,c),yn(r,c));for(let h=0;h!==l;++h)i.setTextureCube(t[h]||Rv,c[h])}function QT(s,t,i){const r=this.cache,l=t.length,c=ju(i,l);xn(r,c)||(s.uniform1iv(this.addr,c),yn(r,c));for(let h=0;h!==l;++h)i.setTexture2DArray(t[h]||Tv,c[h])}function JT(s){switch(s){case 5126:return LT;case 35664:return NT;case 35665:return OT;case 35666:return PT;case 35674:return IT;case 35675:return BT;case 35676:return zT;case 5124:case 35670:return FT;case 35667:case 35671:return HT;case 35668:case 35672:return GT;case 35669:case 35673:return VT;case 5125:return kT;case 36294:return XT;case 36295:return WT;case 36296:return qT;case 35678:case 36198:case 36298:case 36306:case 35682:return YT;case 35679:case 36299:case 36307:return ZT;case 35680:case 36300:case 36308:case 36293:return KT;case 36289:case 36303:case 36311:case 36292:return QT}}class jT{constructor(t,i,r){this.id=t,this.addr=r,this.cache=[],this.type=i.type,this.setValue=UT(i.type)}}class $T{constructor(t,i,r){this.id=t,this.addr=r,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=JT(i.type)}}class t1{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,r){const l=this.seq;for(let c=0,h=l.length;c!==h;++c){const p=l[c];p.setValue(t,i[p.id],r)}}}const zh=/(\w+)(\])?(\[|\.)?/g;function b_(s,t){s.seq.push(t),s.map[t.id]=t}function e1(s,t,i){const r=s.name,l=r.length;for(zh.lastIndex=0;;){const c=zh.exec(r),h=zh.lastIndex;let p=c[1];const m=c[2]==="]",d=c[3];if(m&&(p=p|0),d===void 0||d==="["&&h+2===l){b_(i,d===void 0?new jT(p,s,t):new $T(p,s,t));break}else{let v=i.map[p];v===void 0&&(v=new t1(p),b_(i,v)),i=v}}}class Gu{constructor(t,i){this.seq=[],this.map={};const r=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let h=0;h<r;++h){const p=t.getActiveUniform(i,h),m=t.getUniformLocation(i,p.name);e1(p,m,this)}const l=[],c=[];for(const h of this.seq)h.type===t.SAMPLER_2D_SHADOW||h.type===t.SAMPLER_CUBE_SHADOW||h.type===t.SAMPLER_2D_ARRAY_SHADOW?l.push(h):c.push(h);l.length>0&&(this.seq=l.concat(c))}setValue(t,i,r,l){const c=this.map[i];c!==void 0&&c.setValue(t,r,l)}setOptional(t,i,r){const l=i[r];l!==void 0&&this.setValue(t,r,l)}static upload(t,i,r,l){for(let c=0,h=i.length;c!==h;++c){const p=i[c],m=r[p.id];m.needsUpdate!==!1&&p.setValue(t,m.value,l)}}static seqWithValue(t,i){const r=[];for(let l=0,c=t.length;l!==c;++l){const h=t[l];h.id in i&&r.push(h)}return r}}function T_(s,t,i){const r=s.createShader(t);return s.shaderSource(r,i),s.compileShader(r),r}const n1=37297;let i1=0;function a1(s,t){const i=s.split(`
`),r=[],l=Math.max(t-6,0),c=Math.min(t+6,i.length);for(let h=l;h<c;h++){const p=h+1;r.push(`${p===t?">":" "} ${p}: ${i[h]}`)}return r.join(`
`)}const A_=new re;function r1(s){Ee._getMatrix(A_,Ee.workingColorSpace,s);const t=`mat3( ${A_.elements.map(i=>i.toFixed(4))} )`;switch(Ee.getTransfer(s)){case Xu:return[t,"LinearTransferOETF"];case Be:return[t,"sRGBTransferOETF"];default:return ne("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function R_(s,t,i){const r=s.getShaderParameter(t,s.COMPILE_STATUS),c=(s.getShaderInfoLog(t)||"").trim();if(r&&c==="")return"";const h=/ERROR: 0:(\d+)/.exec(c);if(h){const p=parseInt(h[1]);return i.toUpperCase()+`

`+c+`

`+a1(s.getShaderSource(t),p)}else return c}function s1(s,t){const i=r1(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const o1={[q_]:"Linear",[Y_]:"Reinhard",[Z_]:"Cineon",[K_]:"ACESFilmic",[J_]:"AgX",[j_]:"Neutral",[Q_]:"Custom"};function l1(s,t){const i=o1[t];return i===void 0?(ne("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Lu=new nt;function u1(){Ee.getLuminanceCoefficients(Lu);const s=Lu.x.toFixed(4),t=Lu.y.toFixed(4),i=Lu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function c1(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ko).join(`
`)}function f1(s){const t=[];for(const i in s){const r=s[i];r!==!1&&t.push("#define "+i+" "+r)}return t.join(`
`)}function h1(s,t){const i={},r=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let l=0;l<r;l++){const c=s.getActiveAttrib(t,l),h=c.name;let p=1;c.type===s.FLOAT_MAT2&&(p=2),c.type===s.FLOAT_MAT3&&(p=3),c.type===s.FLOAT_MAT4&&(p=4),i[h]={type:c.type,location:s.getAttribLocation(t,h),locationSize:p}}return i}function ko(s){return s!==""}function C_(s,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function D_(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const d1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ld(s){return s.replace(d1,m1)}const p1=new Map;function m1(s,t){let i=de[t];if(i===void 0){const r=p1.get(t);if(r!==void 0)i=de[r],ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,r);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Ld(i)}const g1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function w_(s){return s.replace(g1,_1)}function _1(s,t,i,r){let l="";for(let c=parseInt(t);c<parseInt(i);c++)l+=r.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function U_(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const v1={[Pu]:"SHADOWMAP_TYPE_PCF",[Vo]:"SHADOWMAP_TYPE_VSM"};function S1(s){return v1[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const x1={[zr]:"ENVMAP_TYPE_CUBE",[Fs]:"ENVMAP_TYPE_CUBE",[Zu]:"ENVMAP_TYPE_CUBE_UV"};function y1(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":x1[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const M1={[Fs]:"ENVMAP_MODE_REFRACTION"};function E1(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":M1[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const b1={[W_]:"ENVMAP_BLENDING_MULTIPLY",[cy]:"ENVMAP_BLENDING_MIX",[fy]:"ENVMAP_BLENDING_ADD"};function T1(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":b1[s.combine]||"ENVMAP_BLENDING_NONE"}function A1(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:r,maxMip:i}}function R1(s,t,i,r){const l=s.getContext(),c=i.defines;let h=i.vertexShader,p=i.fragmentShader;const m=S1(i),d=y1(i),x=E1(i),v=T1(i),_=A1(i),E=c1(i),R=f1(c),O=l.createProgram();let M,S,B=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(M=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R].filter(ko).join(`
`),M.length>0&&(M+=`
`),S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R].filter(ko).join(`
`),S.length>0&&(S+=`
`)):(M=[U_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+x:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ko).join(`
`),S=[U_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+d:"",i.envMap?"#define "+x:"",i.envMap?"#define "+v:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.retroreflection?"#define USE_RETROREFLECTION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Pi?"#define TONE_MAPPING":"",i.toneMapping!==Pi?de.tonemapping_pars_fragment:"",i.toneMapping!==Pi?l1("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",de.colorspace_pars_fragment,s1("linearToOutputTexel",i.outputColorSpace),u1(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(ko).join(`
`)),h=Ld(h),h=C_(h,i),h=D_(h,i),p=Ld(p),p=C_(p,i),p=D_(p,i),h=w_(h),p=w_(p),i.isRawShaderMaterial!==!0&&(B=`#version 300 es
`,M=[E,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,S=["#define varying in",i.glslVersion===Dd?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===Dd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const k=B+M+h,U=B+S+p,C=T_(l,l.VERTEX_SHADER,k),D=T_(l,l.FRAGMENT_SHADER,U);l.attachShader(O,C),l.attachShader(O,D),i.index0AttributeName!==void 0?l.bindAttribLocation(O,0,i.index0AttributeName):i.hasPositionAttribute===!0&&l.bindAttribLocation(O,0,"position"),l.linkProgram(O);function L(q){if(s.debug.checkShaderErrors){const Q=l.getProgramInfoLog(O)||"",lt=l.getShaderInfoLog(C)||"",Y=l.getShaderInfoLog(D)||"",j=Q.trim(),I=lt.trim(),F=Y.trim();let ut=!0,rt=!0;if(l.getProgramParameter(O,l.LINK_STATUS)===!1)if(ut=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(l,O,C,D);else{const ht=R_(l,C,"vertex"),w=R_(l,D,"fragment");Ce("WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(O,l.VALIDATE_STATUS)+`

Material Name: `+q.name+`
Material Type: `+q.type+`

Program Info Log: `+j+`
`+ht+`
`+w)}else j!==""?ne("WebGLProgram: Program Info Log:",j):(I===""||F==="")&&(rt=!1);rt&&(q.diagnostics={runnable:ut,programLog:j,vertexShader:{log:I,prefix:M},fragmentShader:{log:F,prefix:S}})}l.deleteShader(C),l.deleteShader(D),b=new Gu(l,O),P=h1(l,O)}let b;this.getUniforms=function(){return b===void 0&&L(this),b};let P;this.getAttributes=function(){return P===void 0&&L(this),P};let W=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return W===!1&&(W=l.getProgramParameter(O,n1)),W},this.destroy=function(){r.releaseStatesOfProgram(this),l.deleteProgram(O),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=i1++,this.cacheKey=t,this.usedTimes=1,this.program=O,this.vertexShader=C,this.fragmentShader=D,this}let C1=0;class D1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,i,r){const l=this._getShaderCacheForMaterial(t);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(r)===!1&&(l.add(r),r.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const r of i)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let r=i.get(t);return r===void 0&&(r=new Set,i.set(t,r)),r}_getShaderStage(t){const i=this.shaderCache;let r=i.get(t);return r===void 0&&(r=new w1(t),i.set(t,r)),r}}class w1{constructor(t){this.id=C1++,this.code=t,this.usedTimes=0}}function U1(s){return s===Fr||s===Vu||s===ku}function L1(s,t,i,r,l,c){const h=new uv,p=new D1,m=new Set,d=[],x=new Map,v=r.logarithmicDepthBuffer;let _=r.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function R(b){return m.add(b),b===0?"uv":`uv${b}`}function O(b,P,W,q,Q,lt){const Y=q.fog,j=Q.geometry,I=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?q.environment:null,F=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,ut=t.get(b.envMap||I,F),rt=ut&&ut.mapping===Zu?ut.image.height:null,ht=E[b.type];b.precision!==null&&(_=r.getMaxPrecision(b.precision),_!==b.precision&&ne("WebGLProgram.getParameters:",b.precision,"not supported, using",_,"instead."));const w=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,J=w!==void 0?w.length:0;let gt=0;j.morphAttributes.position!==void 0&&(gt=1),j.morphAttributes.normal!==void 0&&(gt=2),j.morphAttributes.color!==void 0&&(gt=3);let Et,Nt,Xt,it;if(ht){const Fe=Wi[ht];Et=Fe.vertexShader,Nt=Fe.fragmentShader}else{Et=b.vertexShader,Nt=b.fragmentShader;const Fe=p.getVertexShaderStage(b),be=p.getFragmentShaderStage(b);p.update(b,Fe,be),Xt=Fe.id,it=be.id}const _t=s.getRenderTarget(),Tt=s.state.buffers.depth.getReversed(),te=Q.isInstancedMesh===!0,Ht=Q.isBatchedMesh===!0,le=!!b.map,$e=!!b.matcap,ae=!!ut,Se=!!b.aoMap,Le=!!b.lightMap,me=!!b.bumpMap&&b.wireframe===!1,Xe=!!b.normalMap,tn=!!b.displacementMap,Mn=!!b.emissiveMap,We=!!b.metalnessMap,en=!!b.roughnessMap,X=b.anisotropy>0,Ne=b.clearcoat>0,De=b.dispersion>0,N=b.retroreflectivity>0,y=b.iridescence>0,K=b.sheen>0,st=b.transmission>0,dt=X&&!!b.anisotropyMap,bt=Ne&&!!b.clearcoatMap,wt=Ne&&!!b.clearcoatNormalMap,pt=Ne&&!!b.clearcoatRoughnessMap,mt=y&&!!b.iridescenceMap,At=y&&!!b.iridescenceThicknessMap,Gt=K&&!!b.sheenColorMap,Ot=K&&!!b.sheenRoughnessMap,Ut=!!b.specularMap,Qt=!!b.specularColorMap,Jt=!!b.specularIntensityMap,ee=st&&!!b.transmissionMap,V=st&&!!b.thicknessMap,Ct=!!b.gradientMap,St=!!b.alphaMap,Dt=b.alphaTest>0,Bt=!!b.alphaHash,Mt=!!b.extensions;let Kt=Pi;b.toneMapped&&(_t===null||_t.isXRRenderTarget===!0)&&(Kt=s.toneMapping);const Wt={shaderID:ht,shaderType:b.type,shaderName:b.name,vertexShader:Et,fragmentShader:Nt,defines:b.defines,customVertexShaderID:Xt,customFragmentShaderID:it,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:_,batching:Ht,batchingColor:Ht&&Q._colorsTexture!==null,instancing:te,instancingColor:te&&Q.instanceColor!==null,instancingMorph:te&&Q.morphTexture!==null,outputColorSpace:_t===null?s.outputColorSpace:_t.isXRRenderTarget===!0?_t.texture.colorSpace:Ee.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:le,matcap:$e,envMap:ae,envMapMode:ae&&ut.mapping,envMapCubeUVHeight:rt,aoMap:Se,lightMap:Le,bumpMap:me,normalMap:Xe,displacementMap:tn,emissiveMap:Mn,normalMapObjectSpace:Xe&&b.normalMapType===py,normalMapTangentSpace:Xe&&b.normalMapType===W0,packedNormalMap:Xe&&b.normalMapType===W0&&U1(b.normalMap.format),metalnessMap:We,roughnessMap:en,anisotropy:X,anisotropyMap:dt,clearcoat:Ne,clearcoatMap:bt,clearcoatNormalMap:wt,clearcoatRoughnessMap:pt,dispersion:De,retroreflection:N,iridescence:y,iridescenceMap:mt,iridescenceThicknessMap:At,sheen:K,sheenColorMap:Gt,sheenRoughnessMap:Ot,specularMap:Ut,specularColorMap:Qt,specularIntensityMap:Jt,transmission:st,transmissionMap:ee,thicknessMap:V,gradientMap:Ct,opaque:b.transparent===!1&&b.blending===Xo&&b.alphaToCoverage===!1,alphaMap:St,alphaTest:Dt,alphaHash:Bt,combine:b.combine,mapUv:le&&R(b.map.channel),aoMapUv:Se&&R(b.aoMap.channel),lightMapUv:Le&&R(b.lightMap.channel),bumpMapUv:me&&R(b.bumpMap.channel),normalMapUv:Xe&&R(b.normalMap.channel),displacementMapUv:tn&&R(b.displacementMap.channel),emissiveMapUv:Mn&&R(b.emissiveMap.channel),metalnessMapUv:We&&R(b.metalnessMap.channel),roughnessMapUv:en&&R(b.roughnessMap.channel),anisotropyMapUv:dt&&R(b.anisotropyMap.channel),clearcoatMapUv:bt&&R(b.clearcoatMap.channel),clearcoatNormalMapUv:wt&&R(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pt&&R(b.clearcoatRoughnessMap.channel),iridescenceMapUv:mt&&R(b.iridescenceMap.channel),iridescenceThicknessMapUv:At&&R(b.iridescenceThicknessMap.channel),sheenColorMapUv:Gt&&R(b.sheenColorMap.channel),sheenRoughnessMapUv:Ot&&R(b.sheenRoughnessMap.channel),specularMapUv:Ut&&R(b.specularMap.channel),specularColorMapUv:Qt&&R(b.specularColorMap.channel),specularIntensityMapUv:Jt&&R(b.specularIntensityMap.channel),transmissionMapUv:ee&&R(b.transmissionMap.channel),thicknessMapUv:V&&R(b.thicknessMap.channel),alphaMapUv:St&&R(b.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Xe||X),vertexNormals:!!j.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:Q.isPoints===!0&&!!j.attributes.uv&&(le||St),fog:!!Y,useFog:b.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||j.attributes.normal===void 0&&Xe===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:v,reversedDepthBuffer:Tt,skinning:Q.isSkinnedMesh===!0,hasPositionAttribute:j.attributes.position!==void 0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:gt,numSunLights:P.sun.length,numDirLights:P.directional.length,numPointLights:P.point.length,numSpotLights:P.spot.length,numSpotLightMaps:P.spotLightMap.length,numRectAreaLights:P.rectArea.length,numHemiLights:P.hemi.length,numSunLightShadows:P.sunShadowMap.length,numDirLightShadows:P.directionalShadowMap.length,numPointLightShadows:P.pointShadowMap.length,numSpotLightShadows:P.spotShadowMap.length,numSpotLightShadowsWithMaps:P.numSpotLightShadowsWithMaps,numLightProbes:P.numLightProbes,numLightProbeGrids:lt.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&W.length>0,shadowMapType:s.shadowMap.type,toneMapping:Kt,decodeVideoTexture:le&&b.map.isVideoTexture===!0&&Ee.getTransfer(b.map.colorSpace)===Be,decodeVideoTextureEmissive:Mn&&b.emissiveMap.isVideoTexture===!0&&Ee.getTransfer(b.emissiveMap.colorSpace)===Be,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ea,flipSided:b.side===Jn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Mt&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Mt&&b.extensions.multiDraw===!0||Ht)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Wt.vertexUv1s=m.has(1),Wt.vertexUv2s=m.has(2),Wt.vertexUv3s=m.has(3),m.clear(),Wt}function M(b){const P=[];if(b.shaderID?P.push(b.shaderID):(P.push(b.customVertexShaderID),P.push(b.customFragmentShaderID)),b.defines!==void 0)for(const W in b.defines)P.push(W),P.push(b.defines[W]);return b.isRawShaderMaterial===!1&&(S(P,b),B(P,b),P.push(s.outputColorSpace)),P.push(b.customProgramCacheKey),P.join()}function S(b,P){b.push(P.precision),b.push(P.outputColorSpace),b.push(P.envMapMode),b.push(P.envMapCubeUVHeight),b.push(P.mapUv),b.push(P.alphaMapUv),b.push(P.lightMapUv),b.push(P.aoMapUv),b.push(P.bumpMapUv),b.push(P.normalMapUv),b.push(P.displacementMapUv),b.push(P.emissiveMapUv),b.push(P.metalnessMapUv),b.push(P.roughnessMapUv),b.push(P.anisotropyMapUv),b.push(P.clearcoatMapUv),b.push(P.clearcoatNormalMapUv),b.push(P.clearcoatRoughnessMapUv),b.push(P.iridescenceMapUv),b.push(P.iridescenceThicknessMapUv),b.push(P.sheenColorMapUv),b.push(P.sheenRoughnessMapUv),b.push(P.specularMapUv),b.push(P.specularColorMapUv),b.push(P.specularIntensityMapUv),b.push(P.transmissionMapUv),b.push(P.thicknessMapUv),b.push(P.combine),b.push(P.fogExp2),b.push(P.sizeAttenuation),b.push(P.morphTargetsCount),b.push(P.morphAttributeCount),b.push(P.numSunLights),b.push(P.numDirLights),b.push(P.numPointLights),b.push(P.numSpotLights),b.push(P.numSpotLightMaps),b.push(P.numHemiLights),b.push(P.numRectAreaLights),b.push(P.numSunLightShadows),b.push(P.numDirLightShadows),b.push(P.numPointLightShadows),b.push(P.numSpotLightShadows),b.push(P.numSpotLightShadowsWithMaps),b.push(P.numLightProbes),b.push(P.shadowMapType),b.push(P.toneMapping),b.push(P.numClippingPlanes),b.push(P.numClipIntersection),b.push(P.depthPacking)}function B(b,P){h.disableAll(),P.instancing&&h.enable(0),P.instancingColor&&h.enable(1),P.instancingMorph&&h.enable(2),P.matcap&&h.enable(3),P.envMap&&h.enable(4),P.normalMapObjectSpace&&h.enable(5),P.normalMapTangentSpace&&h.enable(6),P.clearcoat&&h.enable(7),P.iridescence&&h.enable(8),P.alphaTest&&h.enable(9),P.vertexColors&&h.enable(10),P.vertexAlphas&&h.enable(11),P.vertexUv1s&&h.enable(12),P.vertexUv2s&&h.enable(13),P.vertexUv3s&&h.enable(14),P.vertexTangents&&h.enable(15),P.anisotropy&&h.enable(16),P.alphaHash&&h.enable(17),P.batching&&h.enable(18),P.dispersion&&h.enable(19),P.retroreflection&&h.enable(24),P.batchingColor&&h.enable(20),P.gradientMap&&h.enable(21),P.packedNormalMap&&h.enable(22),P.vertexNormals&&h.enable(23),b.push(h.mask),h.disableAll(),P.fog&&h.enable(0),P.useFog&&h.enable(1),P.flatShading&&h.enable(2),P.logarithmicDepthBuffer&&h.enable(3),P.reversedDepthBuffer&&h.enable(4),P.skinning&&h.enable(5),P.morphTargets&&h.enable(6),P.morphNormals&&h.enable(7),P.morphColors&&h.enable(8),P.premultipliedAlpha&&h.enable(9),P.shadowMapEnabled&&h.enable(10),P.doubleSided&&h.enable(11),P.flipSided&&h.enable(12),P.useDepthPacking&&h.enable(13),P.dithering&&h.enable(14),P.transmission&&h.enable(15),P.sheen&&h.enable(16),P.opaque&&h.enable(17),P.pointsUvs&&h.enable(18),P.decodeVideoTexture&&h.enable(19),P.decodeVideoTextureEmissive&&h.enable(20),P.alphaToCoverage&&h.enable(21),P.numLightProbeGrids>0&&h.enable(22),P.hasPositionAttribute&&h.enable(23),b.push(h.mask)}function k(b){const P=E[b.type];let W;if(P){const q=Wi[P];W=tM.clone(q.uniforms)}else W=b.uniforms;return W}function U(b,P){let W=x.get(P);return W!==void 0?++W.usedTimes:(W=new R1(s,P,b,l),d.push(W),x.set(P,W)),W}function C(b){if(--b.usedTimes===0){const P=d.indexOf(b);d[P]=d[d.length-1],d.pop(),x.delete(b.cacheKey),b.destroy()}}function D(b){p.remove(b)}function L(){p.dispose()}return{getParameters:O,getProgramCacheKey:M,getUniforms:k,acquireProgram:U,releaseProgram:C,releaseShaderCache:D,programs:d,dispose:L}}function N1(){let s=new WeakMap;function t(h){return s.has(h)}function i(h){let p=s.get(h);return p===void 0&&(p={},s.set(h,p)),p}function r(h){s.delete(h)}function l(h,p,m){s.get(h)[p]=m}function c(){s=new WeakMap}return{has:t,get:i,remove:r,update:l,dispose:c}}function O1(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function L_(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function N_(){const s=[];let t=0;const i=[],r=[],l=[];function c(){t=0,i.length=0,r.length=0,l.length=0}function h(_){let E=0;return _.isInstancedMesh&&(E+=2),_.isSkinnedMesh&&(E+=1),E}function p(_,E,R,O,M,S){let B=s[t];return B===void 0?(B={id:_.id,object:_,geometry:E,material:R,materialVariant:h(_),groupOrder:O,renderOrder:_.renderOrder,z:M,group:S},s[t]=B):(B.id=_.id,B.object=_,B.geometry=E,B.material=R,B.materialVariant=h(_),B.groupOrder=O,B.renderOrder=_.renderOrder,B.z=M,B.group=S),t++,B}function m(_,E,R,O,M,S,B){B.reversedDepth===!0&&(M=-M);const k=p(_,E,R,O,M,S);R.transmission>0?r.push(k):R.transparent===!0?l.push(k):i.push(k)}function d(_,E,R,O,M,S){const B=p(_,E,R,O,M,S);R.transmission>0?r.unshift(B):R.transparent===!0?l.unshift(B):i.unshift(B)}function x(_,E){i.length>1&&i.sort(_||O1),r.length>1&&r.sort(E||L_),l.length>1&&l.sort(E||L_)}function v(){for(let _=t,E=s.length;_<E;_++){const R=s[_];if(R.id===null)break;R.id=null,R.object=null,R.geometry=null,R.material=null,R.group=null}}return{opaque:i,transmissive:r,transparent:l,init:c,push:m,unshift:d,finish:v,sort:x}}function P1(){let s=new WeakMap;function t(r,l){const c=s.get(r);let h;return c===void 0?(h=new N_,s.set(r,[h])):l>=c.length?(h=new N_,c.push(h)):h=c[l],h}function i(){s=new WeakMap}return{get:t,dispose:i}}function I1(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let i;switch(t.type){case"SunLight":case"DirectionalLight":i={direction:new nt,color:new Oe};break;case"SpotLight":i={position:new nt,direction:new nt,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new nt,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":i={direction:new nt,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":i={color:new Oe,position:new nt,halfWidth:new nt,halfHeight:new nt};break}return s[t.id]=i,i}}}function B1(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let i;switch(t.type){case"SunLight":case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=i,i}}}let z1=0;function F1(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function H1(s){const t=new I1,i=B1(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)r.probe.push(new nt);const l=new nt,c=new gn,h=new gn;function p(d){let x=0,v=0,_=0;for(let Q=0;Q<9;Q++)r.probe[Q].set(0,0,0);let E=0,R=0,O=0,M=0,S=0,B=0,k=0,U=0,C=0,D=0,L=0,b=0,P=0,W=0;d.sort(F1);for(let Q=0,lt=d.length;Q<lt;Q++){const Y=d[Q],j=Y.color,I=Y.intensity,F=Y.distance;let ut=null;if(Y.shadow&&Y.shadow.map&&(Y.shadow.map.texture.format===Fr?ut=Y.shadow.map.texture:ut=Y.shadow.map.depthTexture||Y.shadow.map.texture),Y.isAmbientLight)x+=j.r*I,v+=j.g*I,_+=j.b*I;else if(Y.isLightProbe){for(let rt=0;rt<9;rt++)r.probe[rt].addScaledVector(Y.sh.coefficients[rt],I);W++}else if(Y.isSunLight){const rt=t.get(Y);if(rt.color.copy(Y.color).multiplyScalar(Y.intensity),Y.castShadow){const ht=Y.shadow,w=i.get(Y);w.shadowIntensity=ht.intensity,w.shadowBias=ht.bias,w.shadowNormalBias=ht.normalBias,w.shadowRadius=ht.radius,w.shadowMapSize.copy(ht.mapSize).multiply(ht.getFrameExtents()),r.sunShadow[R]=w,r.sunShadowMap[R]=ut;const J=ht.getViewportCount();for(let gt=0;gt<J;gt++)r.sunShadowMatrix[O+gt]=ht.getMatrix(gt),r.sunShadowCascade[O+gt]=ht._cascadeData[gt];O+=J,R++}r.sun[E]=rt,E++}else if(Y.isDirectionalLight){const rt=t.get(Y);if(rt.color.copy(Y.color).multiplyScalar(Y.intensity),Y.castShadow){const ht=Y.shadow,w=i.get(Y);w.shadowIntensity=ht.intensity,w.shadowBias=ht.bias,w.shadowNormalBias=ht.normalBias,w.shadowRadius=ht.radius,w.shadowMapSize=ht.mapSize,r.directionalShadow[M]=w,r.directionalShadowMap[M]=ut,r.directionalShadowMatrix[M]=Y.shadow.matrix,C++}r.directional[M]=rt,M++}else if(Y.isSpotLight){const rt=t.get(Y);rt.position.setFromMatrixPosition(Y.matrixWorld),rt.color.copy(j).multiplyScalar(I),rt.distance=F,rt.coneCos=Math.cos(Y.angle),rt.penumbraCos=Math.cos(Y.angle*(1-Y.penumbra)),rt.decay=Y.decay,r.spot[B]=rt;const ht=Y.shadow;if(Y.map&&(r.spotLightMap[b]=Y.map,b++,ht.updateMatrices(Y),Y.castShadow&&P++),r.spotLightMatrix[B]=ht.matrix,Y.castShadow){const w=i.get(Y);w.shadowIntensity=ht.intensity,w.shadowBias=ht.bias,w.shadowNormalBias=ht.normalBias,w.shadowRadius=ht.radius,w.shadowMapSize=ht.mapSize,r.spotShadow[B]=w,r.spotShadowMap[B]=ut,L++}B++}else if(Y.isRectAreaLight){const rt=t.get(Y);rt.color.copy(j).multiplyScalar(I),rt.halfWidth.set(Y.width*.5,0,0),rt.halfHeight.set(0,Y.height*.5,0),r.rectArea[k]=rt,k++}else if(Y.isPointLight){const rt=t.get(Y);if(rt.color.copy(Y.color).multiplyScalar(Y.intensity),rt.distance=Y.distance,rt.decay=Y.decay,Y.castShadow){const ht=Y.shadow,w=i.get(Y);w.shadowIntensity=ht.intensity,w.shadowBias=ht.bias,w.shadowNormalBias=ht.normalBias,w.shadowRadius=ht.radius,w.shadowMapSize=ht.mapSize,w.shadowCameraNear=ht.camera.near,w.shadowCameraFar=ht.camera.far,r.pointShadow[S]=w,r.pointShadowMap[S]=ut,r.pointShadowMatrix[S]=Y.shadow.matrix,D++}r.point[S]=rt,S++}else if(Y.isHemisphereLight){const rt=t.get(Y);rt.skyColor.copy(Y.color).multiplyScalar(I),rt.groundColor.copy(Y.groundColor).multiplyScalar(I),r.hemi[U]=rt,U++}}k>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=It.LTC_FLOAT_1,r.rectAreaLTC2=It.LTC_FLOAT_2):(r.rectAreaLTC1=It.LTC_HALF_1,r.rectAreaLTC2=It.LTC_HALF_2)),r.ambient[0]=x,r.ambient[1]=v,r.ambient[2]=_;const q=r.hash;(q.sunLength!==E||q.directionalLength!==M||q.pointLength!==S||q.spotLength!==B||q.rectAreaLength!==k||q.hemiLength!==U||q.numSunShadows!==R||q.numDirectionalShadows!==C||q.numPointShadows!==D||q.numSpotShadows!==L||q.numSpotMaps!==b||q.numLightProbes!==W)&&(r.sun.length=E,r.directional.length=M,r.spot.length=B,r.rectArea.length=k,r.point.length=S,r.hemi.length=U,r.sunShadow.length=R,r.sunShadowMap.length=R,r.sunShadowMatrix.length=O,r.sunShadowCascade.length=O,r.directionalShadow.length=C,r.directionalShadowMap.length=C,r.directionalShadowMatrix.length=C,r.pointShadow.length=D,r.pointShadowMap.length=D,r.pointShadowMatrix.length=D,r.spotShadow.length=L,r.spotShadowMap.length=L,r.spotLightMatrix.length=L+b-P,r.spotLightMap.length=b,r.numSpotLightShadowsWithMaps=P,r.numLightProbes=W,q.sunLength=E,q.directionalLength=M,q.pointLength=S,q.spotLength=B,q.rectAreaLength=k,q.hemiLength=U,q.numSunShadows=R,q.numDirectionalShadows=C,q.numPointShadows=D,q.numSpotShadows=L,q.numSpotMaps=b,q.numLightProbes=W,r.version=z1++)}function m(d,x){let v=0,_=0,E=0,R=0,O=0,M=0;const S=x.matrixWorldInverse;for(let B=0,k=d.length;B<k;B++){const U=d[B];if(U.isSunLight){const C=r.sun[v];C.direction.setFromMatrixPosition(U.matrixWorld),C.direction.transformDirection(S),v++}else if(U.isDirectionalLight){const C=r.directional[_];C.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),C.direction.sub(l),C.direction.transformDirection(S),_++}else if(U.isSpotLight){const C=r.spot[R];C.position.setFromMatrixPosition(U.matrixWorld),C.position.applyMatrix4(S),C.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),C.direction.sub(l),C.direction.transformDirection(S),R++}else if(U.isRectAreaLight){const C=r.rectArea[O];C.position.setFromMatrixPosition(U.matrixWorld),C.position.applyMatrix4(S),h.identity(),c.copy(U.matrixWorld),c.premultiply(S),h.extractRotation(c),C.halfWidth.set(U.width*.5,0,0),C.halfHeight.set(0,U.height*.5,0),C.halfWidth.applyMatrix4(h),C.halfHeight.applyMatrix4(h),O++}else if(U.isPointLight){const C=r.point[E];C.position.setFromMatrixPosition(U.matrixWorld),C.position.applyMatrix4(S),E++}else if(U.isHemisphereLight){const C=r.hemi[M];C.direction.setFromMatrixPosition(U.matrixWorld),C.direction.transformDirection(S),M++}}}return{setup:p,setupView:m,state:r}}function O_(s){const t=new H1(s),i=[],r=[],l=[];function c(_){v.camera=_,i.length=0,r.length=0,l.length=0}function h(_){i.push(_)}function p(_){r.push(_)}function m(_){l.push(_)}function d(){t.setup(i)}function x(_){t.setupView(i,_)}const v={lightsArray:i,shadowsArray:r,lightProbeGridArray:l,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:v,setupLights:d,setupLightsView:x,pushLight:h,pushShadow:p,pushLightProbeGrid:m}}function G1(s){let t=new WeakMap;function i(l,c=0){const h=t.get(l);let p;return h===void 0?(p=new O_(s),t.set(l,[p])):c>=h.length?(p=new O_(s),h.push(p)):p=h[c],p}function r(){t=new WeakMap}return{get:i,dispose:r}}const V1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,k1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,X1=[new nt(1,0,0),new nt(-1,0,0),new nt(0,1,0),new nt(0,-1,0),new nt(0,0,1),new nt(0,0,-1)],W1=[new nt(0,-1,0),new nt(0,-1,0),new nt(0,0,1),new nt(0,0,-1),new nt(0,-1,0),new nt(0,-1,0)],P_=new gn,Go=new nt,Fh=new nt;function q1(s,t,i){let r=new mv;const l=new ie,c=new ie,h=new rn,p=new iM,m=new aM,d={},x=i.maxTextureSize,v={[Br]:Jn,[Jn]:Br,[Ea]:Ea},_=new Ji({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ie},radius:{value:4}},vertexShader:V1,fragmentShader:k1}),E=_.clone();E.defines.HORIZONTAL_PASS=1;const R=new ji;R.setAttribute("position",new Ra(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const O=new Qi(R,_),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pu;let S=this.type;this.render=function(D,L,b){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||D.length===0)return;this.type===Wx&&(ne("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Pu);const P=s.getRenderTarget(),W=s.getActiveCubeFace(),q=s.getActiveMipmapLevel(),Q=s.state;Q.setBlending(Ta),Q.buffers.depth.getReversed()===!0?Q.buffers.color.setClear(0,0,0,0):Q.buffers.color.setClear(1,1,1,1),Q.buffers.depth.setTest(!0),Q.setScissorTest(!1);const lt=S!==this.type;lt&&L.traverse(function(Y){Y.material&&(Array.isArray(Y.material)?Y.material.forEach(j=>j.needsUpdate=!0):Y.material.needsUpdate=!0)});for(let Y=0,j=D.length;Y<j;Y++){const I=D[Y],F=I.shadow;if(F===void 0){ne("WebGLShadowMap:",I,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;l.copy(F.mapSize);const ut=F.getFrameExtents();l.multiply(ut),c.copy(F.mapSize),(l.x>x||l.y>x)&&(l.x>x&&(c.x=Math.floor(x/ut.x),l.x=c.x*ut.x,F.mapSize.x=c.x),l.y>x&&(c.y=Math.floor(x/ut.y),l.y=c.y*ut.y,F.mapSize.y=c.y));const rt=s.state.buffers.depth.getReversed();if(F.camera._reversedDepth=rt,F.map===null||lt===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===Vo){if(I.isPointLight){ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new Ti(l.x,l.y,{format:Fr,type:Ii,minFilter:Tn,magFilter:Tn,generateMipmaps:!1}),F.map.texture.name=I.name+".shadowMap",F.map.depthTexture=new Ko(l.x,l.y,qi),F.map.depthTexture.name=I.name+".shadowMapDepth",F.map.depthTexture.format=Ca,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Ln,F.map.depthTexture.magFilter=Ln}else I.isPointLight?(F.map=new Ev(l.x),F.map.depthTexture=new jy(l.x,Ki)):(F.map=new Ti(l.x,l.y),F.map.depthTexture=new Ko(l.x,l.y,Ki)),F.map.depthTexture.name=I.name+".shadowMap",F.map.depthTexture.format=Ca,this.type===Pu?(F.map.depthTexture.compareFunction=rt?kd:Vd,F.map.depthTexture.minFilter=Tn,F.map.depthTexture.magFilter=Tn):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Ln,F.map.depthTexture.magFilter=Ln);F.camera.updateProjectionMatrix()}F.map.isWebGLCubeRenderTarget!==!0&&(F.map.width!==l.x||F.map.height!==l.y)&&F.map.setSize(l.x,l.y);const ht=F.map.isWebGLCubeRenderTarget?6:F.getViewportCount();I.isPointLight!==!0&&F.updateMatrices(I,b);for(let w=0;w<ht;w++){const J=F.getCamera(w);if(I.isPointLight){const gt=F.camera,Et=F.matrix,Nt=I.distance||gt.far;Nt!==gt.far&&(gt.far=Nt,gt.updateProjectionMatrix()),Go.setFromMatrixPosition(I.matrixWorld),gt.position.copy(Go),Fh.copy(gt.position),Fh.add(X1[w]),gt.up.copy(W1[w]),gt.lookAt(Fh),gt.updateMatrixWorld(),Et.makeTranslation(-Go.x,-Go.y,-Go.z),P_.multiplyMatrices(gt.projectionMatrix,gt.matrixWorldInverse),F._frustum.setFromProjectionMatrix(P_,gt.coordinateSystem,gt.reversedDepth)}if(F.map.isWebGLCubeRenderTarget)s.setRenderTarget(F.map,w),s.clear();else{w===0&&(s.setRenderTarget(F.map),s.clear());const gt=F.getViewport(w);h.set(c.x*gt.x,c.y*gt.y,c.x*gt.z,c.y*gt.w),Q.viewport(h)}r=F.getFrustum(w),U(L,b,J,I,this.type)}F.isPointLightShadow!==!0&&this.type===Vo&&B(F,b),F.needsUpdate=!1}S=this.type,M.needsUpdate=!1,s.setRenderTarget(P,W,q)};function B(D,L){const b=t.update(O);_.defines.VSM_SAMPLES!==D.blurSamples&&(_.defines.VSM_SAMPLES=D.blurSamples,E.defines.VSM_SAMPLES=D.blurSamples,_.needsUpdate=!0,E.needsUpdate=!0),D.mapPass===null?D.mapPass=new Ti(l.x,l.y,{format:Fr,type:Ii}):(D.mapPass.width!==D.map.width||D.mapPass.height!==D.map.height)&&D.mapPass.setSize(D.map.width,D.map.height),_.uniforms.shadow_pass.value=D.map.depthTexture,_.uniforms.resolution.value.set(D.map.width,D.map.height),_.uniforms.radius.value=D.radius,s.setRenderTarget(D.mapPass),s.clear(),s.renderBufferDirect(L,null,b,_,O,null),E.uniforms.shadow_pass.value=D.mapPass.texture,E.uniforms.resolution.value.set(D.map.width,D.map.height),E.uniforms.radius.value=D.radius,s.setRenderTarget(D.map),s.clear(),s.renderBufferDirect(L,null,b,E,O,null)}function k(D,L,b,P){let W=null;const q=b.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(q!==void 0)W=q;else if(W=b.isPointLight===!0?m:p,s.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const Q=W.uuid,lt=L.uuid;let Y=d[Q];Y===void 0&&(Y={},d[Q]=Y);let j=Y[lt];j===void 0&&(j=W.clone(),Y[lt]=j,L.addEventListener("dispose",C)),W=j}if(W.visible=L.visible,W.wireframe=L.wireframe,P===Vo?W.side=L.shadowSide!==null?L.shadowSide:L.side:W.side=L.shadowSide!==null?L.shadowSide:v[L.side],W.alphaMap=L.alphaMap,W.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,W.map=L.map,W.clipShadows=L.clipShadows,W.clippingPlanes=L.clippingPlanes,W.clipIntersection=L.clipIntersection,W.displacementMap=L.displacementMap,W.displacementScale=L.displacementScale,W.displacementBias=L.displacementBias,W.wireframeLinewidth=L.wireframeLinewidth,W.linewidth=L.linewidth,b.isPointLight===!0&&W.isMeshDistanceMaterial===!0){const Q=s.properties.get(W);Q.light=b}return W}function U(D,L,b,P,W){if(D.visible===!1)return;if(D.layers.test(L.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&W===Vo)&&(!D.frustumCulled||D.intersectsFrustum(r))){D.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,D.matrixWorld);const lt=t.update(D),Y=D.material;if(Array.isArray(Y)){const j=lt.groups;for(let I=0,F=j.length;I<F;I++){const ut=j[I],rt=Y[ut.materialIndex];if(rt&&rt.visible){const ht=k(D,rt,P,W);D.onBeforeShadow(s,D,L,b,lt,ht,ut),s.renderBufferDirect(b,null,lt,ht,D,ut),D.onAfterShadow(s,D,L,b,lt,ht,ut)}}}else if(Y.visible){const j=k(D,Y,P,W);D.onBeforeShadow(s,D,L,b,lt,j,null),s.renderBufferDirect(b,null,lt,j,D,null),D.onAfterShadow(s,D,L,b,lt,j,null)}}const Q=D.children;for(let lt=0,Y=Q.length;lt<Y;lt++)U(Q[lt],L,b,P,W)}function C(D){D.target.removeEventListener("dispose",C);for(const b in d){const P=d[b],W=D.target.uuid;W in P&&(P[W].dispose(),delete P[W])}}}function Y1(s,t){function i(){let V=!1;const Ct=new rn;let St=null;const Dt=new rn(0,0,0,0);return{setMask:function(Bt){St!==Bt&&!V&&(s.colorMask(Bt,Bt,Bt,Bt),St=Bt)},setLocked:function(Bt){V=Bt},setClear:function(Bt,Mt,Kt,Wt,Fe){Fe===!0&&(Bt*=Wt,Mt*=Wt,Kt*=Wt),Ct.set(Bt,Mt,Kt,Wt),Dt.equals(Ct)===!1&&(s.clearColor(Bt,Mt,Kt,Wt),Dt.copy(Ct))},reset:function(){V=!1,St=null,Dt.set(-1,0,0,0)}}}function r(){let V=!1,Ct=!1,St=null,Dt=null,Bt=null;return{setReversed:function(Mt){if(Ct!==Mt){const Kt=t.get("EXT_clip_control");Mt?Kt.clipControlEXT(Kt.LOWER_LEFT_EXT,Kt.ZERO_TO_ONE_EXT):Kt.clipControlEXT(Kt.LOWER_LEFT_EXT,Kt.NEGATIVE_ONE_TO_ONE_EXT),Ct=Mt;const Wt=Bt;Bt=null,this.setClear(Wt)}},getReversed:function(){return Ct},setTest:function(Mt){Mt?_t(s.DEPTH_TEST):Tt(s.DEPTH_TEST)},setMask:function(Mt){St!==Mt&&!V&&(s.depthMask(Mt),St=Mt)},setFunc:function(Mt){if(Ct&&(Mt=Ay[Mt]),Dt!==Mt){switch(Mt){case Xh:s.depthFunc(s.NEVER);break;case Wh:s.depthFunc(s.ALWAYS);break;case qh:s.depthFunc(s.LESS);break;case Wo:s.depthFunc(s.LEQUAL);break;case Yh:s.depthFunc(s.EQUAL);break;case Zh:s.depthFunc(s.GEQUAL);break;case Kh:s.depthFunc(s.GREATER);break;case Qh:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Dt=Mt}},setLocked:function(Mt){V=Mt},setClear:function(Mt){Bt!==Mt&&(Bt=Mt,Ct&&(Mt=1-Mt),s.clearDepth(Mt))},reset:function(){V=!1,St=null,Dt=null,Bt=null,Ct=!1}}}function l(){let V=!1,Ct=null,St=null,Dt=null,Bt=null,Mt=null,Kt=null,Wt=null,Fe=null;return{setTest:function(be){V||(be?_t(s.STENCIL_TEST):Tt(s.STENCIL_TEST))},setMask:function(be){Ct!==be&&!V&&(s.stencilMask(be),Ct=be)},setFunc:function(be,Gn,jn){(St!==be||Dt!==Gn||Bt!==jn)&&(s.stencilFunc(be,Gn,jn),St=be,Dt=Gn,Bt=jn)},setOp:function(be,Gn,jn){(Mt!==be||Kt!==Gn||Wt!==jn)&&(s.stencilOp(be,Gn,jn),Mt=be,Kt=Gn,Wt=jn)},setLocked:function(be){V=be},setClear:function(be){Fe!==be&&(s.clearStencil(be),Fe=be)},reset:function(){V=!1,Ct=null,St=null,Dt=null,Bt=null,Mt=null,Kt=null,Wt=null,Fe=null}}}const c=new i,h=new r,p=new l,m=new WeakMap,d=new WeakMap;let x={},v={},_={},E=new WeakMap,R=[],O=null,M=!1,S=null,B=null,k=null,U=null,C=null,D=null,L=null,b=new Oe(0,0,0),P=0,W=!1,q=null,Q=null,lt=null,Y=null,j=null;const I=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,ut=0;const rt=s.getParameter(s.VERSION);rt.indexOf("WebGL")!==-1?(ut=parseFloat(/^WebGL (\d)/.exec(rt)[1]),F=ut>=1):rt.indexOf("OpenGL ES")!==-1&&(ut=parseFloat(/^OpenGL ES (\d)/.exec(rt)[1]),F=ut>=2);let ht=null,w={};const J=s.getParameter(s.SCISSOR_BOX),gt=s.getParameter(s.VIEWPORT),Et=new rn().fromArray(J),Nt=new rn().fromArray(gt);function Xt(V,Ct,St,Dt){const Bt=new Uint8Array(4),Mt=s.createTexture();s.bindTexture(V,Mt),s.texParameteri(V,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(V,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Kt=0;Kt<St;Kt++)V===s.TEXTURE_3D||V===s.TEXTURE_2D_ARRAY?s.texImage3D(Ct,0,s.RGBA,1,1,Dt,0,s.RGBA,s.UNSIGNED_BYTE,Bt):s.texImage2D(Ct+Kt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Bt);return Mt}const it={};it[s.TEXTURE_2D]=Xt(s.TEXTURE_2D,s.TEXTURE_2D,1),it[s.TEXTURE_CUBE_MAP]=Xt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),it[s.TEXTURE_2D_ARRAY]=Xt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),it[s.TEXTURE_3D]=Xt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),c.setClear(0,0,0,1),h.setClear(1),p.setClear(0),_t(s.DEPTH_TEST),h.setFunc(Wo),me(!1),Xe(G0),_t(s.CULL_FACE),Se(Ta);function _t(V){x[V]!==!0&&(s.enable(V),x[V]=!0)}function Tt(V){x[V]!==!1&&(s.disable(V),x[V]=!1)}function te(V,Ct){return _[V]!==Ct?(s.bindFramebuffer(V,Ct),_[V]=Ct,V===s.DRAW_FRAMEBUFFER&&(_[s.FRAMEBUFFER]=Ct),V===s.FRAMEBUFFER&&(_[s.DRAW_FRAMEBUFFER]=Ct),!0):!1}function Ht(V,Ct){let St=R,Dt=!1;if(V){St=E.get(Ct),St===void 0&&(St=[],E.set(Ct,St));const Bt=V.textures;if(St.length!==Bt.length||St[0]!==s.COLOR_ATTACHMENT0){for(let Mt=0,Kt=Bt.length;Mt<Kt;Mt++)St[Mt]=s.COLOR_ATTACHMENT0+Mt;St.length=Bt.length,Dt=!0}}else St[0]!==s.BACK&&(St[0]=s.BACK,Dt=!0);Dt&&s.drawBuffers(St)}function le(V){return O!==V?(s.useProgram(V),O=V,!0):!1}const $e={[Ns]:s.FUNC_ADD,[Yx]:s.FUNC_SUBTRACT,[Zx]:s.FUNC_REVERSE_SUBTRACT};$e[Kx]=s.MIN,$e[Qx]=s.MAX;const ae={[Jx]:s.ZERO,[jx]:s.ONE,[$x]:s.SRC_COLOR,[k_]:s.SRC_ALPHA,[ry]:s.SRC_ALPHA_SATURATE,[iy]:s.DST_COLOR,[ey]:s.DST_ALPHA,[ty]:s.ONE_MINUS_SRC_COLOR,[X_]:s.ONE_MINUS_SRC_ALPHA,[ay]:s.ONE_MINUS_DST_COLOR,[ny]:s.ONE_MINUS_DST_ALPHA,[sy]:s.CONSTANT_COLOR,[oy]:s.ONE_MINUS_CONSTANT_COLOR,[ly]:s.CONSTANT_ALPHA,[uy]:s.ONE_MINUS_CONSTANT_ALPHA};function Se(V,Ct,St,Dt,Bt,Mt,Kt,Wt,Fe,be){if(V===Ta){M===!0&&(Tt(s.BLEND),M=!1);return}if(M===!1&&(_t(s.BLEND),M=!0),V!==qx){if(V!==S||be!==W){if((B!==Ns||C!==Ns)&&(s.blendEquation(s.FUNC_ADD),B=Ns,C=Ns),be)switch(V){case Xo:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case V0:s.blendFunc(s.ONE,s.ONE);break;case k0:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case X0:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Ce("WebGLState: Invalid blending: ",V);break}else switch(V){case Xo:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case V0:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case k0:Ce("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case X0:Ce("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ce("WebGLState: Invalid blending: ",V);break}k=null,U=null,D=null,L=null,b.set(0,0,0),P=0,S=V,W=be}return}Bt=Bt||Ct,Mt=Mt||St,Kt=Kt||Dt,(Ct!==B||Bt!==C)&&(s.blendEquationSeparate($e[Ct],$e[Bt]),B=Ct,C=Bt),(St!==k||Dt!==U||Mt!==D||Kt!==L)&&(s.blendFuncSeparate(ae[St],ae[Dt],ae[Mt],ae[Kt]),k=St,U=Dt,D=Mt,L=Kt),(Wt.equals(b)===!1||Fe!==P)&&(s.blendColor(Wt.r,Wt.g,Wt.b,Fe),b.copy(Wt),P=Fe),S=V,W=!1}function Le(V,Ct){V.side===Ea?Tt(s.CULL_FACE):_t(s.CULL_FACE);let St=V.side===Jn;Ct&&(St=!St),me(St),V.blending===Xo&&V.transparent===!1?Se(Ta):Se(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),h.setFunc(V.depthFunc),h.setTest(V.depthTest),h.setMask(V.depthWrite),c.setMask(V.colorWrite);const Dt=V.stencilWrite;p.setTest(Dt),Dt&&(p.setMask(V.stencilWriteMask),p.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),p.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Mn(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?_t(s.SAMPLE_ALPHA_TO_COVERAGE):Tt(s.SAMPLE_ALPHA_TO_COVERAGE)}function me(V){q!==V&&(V?s.frontFace(s.CW):s.frontFace(s.CCW),q=V)}function Xe(V){V!==kx?(_t(s.CULL_FACE),V!==Q&&(V===G0?s.cullFace(s.BACK):V===Xx?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Tt(s.CULL_FACE),Q=V}function tn(V){V!==lt&&(F&&s.lineWidth(V),lt=V)}function Mn(V,Ct,St){V?(_t(s.POLYGON_OFFSET_FILL),(Y!==Ct||j!==St)&&(Y=Ct,j=St,h.getReversed()&&(Ct=-Ct),s.polygonOffset(Ct,St))):Tt(s.POLYGON_OFFSET_FILL)}function We(V){V?_t(s.SCISSOR_TEST):Tt(s.SCISSOR_TEST)}function en(V){V===void 0&&(V=s.TEXTURE0+I-1),ht!==V&&(s.activeTexture(V),ht=V)}function X(V,Ct,St){St===void 0&&(ht===null?St=s.TEXTURE0+I-1:St=ht);let Dt=w[St];Dt===void 0&&(Dt={type:void 0,texture:void 0},w[St]=Dt),(Dt.type!==V||Dt.texture!==Ct)&&(ht!==St&&(s.activeTexture(St),ht=St),s.bindTexture(V,Ct||it[V]),Dt.type=V,Dt.texture=Ct)}function Ne(){const V=w[ht];V!==void 0&&V.type!==void 0&&(s.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function De(){try{s.compressedTexImage2D(...arguments)}catch(V){Ce("WebGLState:",V)}}function N(){try{s.compressedTexImage3D(...arguments)}catch(V){Ce("WebGLState:",V)}}function y(){try{s.texSubImage2D(...arguments)}catch(V){Ce("WebGLState:",V)}}function K(){try{s.texSubImage3D(...arguments)}catch(V){Ce("WebGLState:",V)}}function st(){try{s.compressedTexSubImage2D(...arguments)}catch(V){Ce("WebGLState:",V)}}function dt(){try{s.compressedTexSubImage3D(...arguments)}catch(V){Ce("WebGLState:",V)}}function bt(){try{s.texStorage2D(...arguments)}catch(V){Ce("WebGLState:",V)}}function wt(){try{s.texStorage3D(...arguments)}catch(V){Ce("WebGLState:",V)}}function pt(){try{s.texImage2D(...arguments)}catch(V){Ce("WebGLState:",V)}}function mt(){try{s.texImage3D(...arguments)}catch(V){Ce("WebGLState:",V)}}function At(V){return v[V]!==void 0?v[V]:s.getParameter(V)}function Gt(V,Ct){v[V]!==Ct&&(s.pixelStorei(V,Ct),v[V]=Ct)}function Ot(V){Et.equals(V)===!1&&(s.scissor(V.x,V.y,V.z,V.w),Et.copy(V))}function Ut(V){Nt.equals(V)===!1&&(s.viewport(V.x,V.y,V.z,V.w),Nt.copy(V))}function Qt(V,Ct){let St=d.get(Ct);St===void 0&&(St=new WeakMap,d.set(Ct,St));let Dt=St.get(V);Dt===void 0&&(Dt=s.getUniformBlockIndex(Ct,V.name),St.set(V,Dt))}function Jt(V,Ct){const Dt=d.get(Ct).get(V);m.get(Ct)!==Dt&&(s.uniformBlockBinding(Ct,Dt,V.__bindingPointIndex),m.set(Ct,Dt))}function ee(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),h.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),x={},v={},ht=null,w={},_={},E=new WeakMap,R=[],O=null,M=!1,S=null,B=null,k=null,U=null,C=null,D=null,L=null,b=new Oe(0,0,0),P=0,W=!1,q=null,Q=null,lt=null,Y=null,j=null,Et.set(0,0,s.canvas.width,s.canvas.height),Nt.set(0,0,s.canvas.width,s.canvas.height),c.reset(),h.reset(),p.reset()}return{buffers:{color:c,depth:h,stencil:p},enable:_t,disable:Tt,bindFramebuffer:te,drawBuffers:Ht,useProgram:le,setBlending:Se,setMaterial:Le,setFlipSided:me,setCullFace:Xe,setLineWidth:tn,setPolygonOffset:Mn,setScissorTest:We,activeTexture:en,bindTexture:X,unbindTexture:Ne,compressedTexImage2D:De,compressedTexImage3D:N,texImage2D:pt,texImage3D:mt,pixelStorei:Gt,getParameter:At,updateUBOMapping:Qt,uniformBlockBinding:Jt,texStorage2D:bt,texStorage3D:wt,texSubImage2D:y,texSubImage3D:K,compressedTexSubImage2D:st,compressedTexSubImage3D:dt,scissor:Ot,viewport:Ut,reset:ee}}function Z1(s,t,i,r,l,c,h){const p=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new ie,x=new WeakMap,v=new Set;let _;const E=new WeakMap;let R=!1;try{R=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function O(N,y){return R?new OffscreenCanvas(N,y):qu("canvas")}function M(N,y,K){let st=1;const dt=De(N);if((dt.width>K||dt.height>K)&&(st=K/Math.max(dt.width,dt.height)),st<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const bt=Math.floor(st*dt.width),wt=Math.floor(st*dt.height);_===void 0&&(_=O(bt,wt));const pt=y?O(bt,wt):_;return pt.width=bt,pt.height=wt,pt.getContext("2d").drawImage(N,0,0,bt,wt),ne("WebGLRenderer: Texture has been resized from ("+dt.width+"x"+dt.height+") to ("+bt+"x"+wt+")."),pt}else return"data"in N&&ne("WebGLRenderer: Image in DataTexture is too big ("+dt.width+"x"+dt.height+")."),N;return N}function S(N){return N.generateMipmaps}function B(N){s.generateMipmap(N)}function k(N){return N.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?s.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function U(N,y,K,st,dt,bt=!1){if(N!==null){if(s[N]!==void 0)return s[N];ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let wt;st&&(wt=t.get("EXT_texture_norm16"),wt||ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let pt=y;if(y===s.RED&&(K===s.FLOAT&&(pt=s.R32F),K===s.HALF_FLOAT&&(pt=s.R16F),K===s.UNSIGNED_BYTE&&(pt=s.R8),K===s.UNSIGNED_SHORT&&wt&&(pt=wt.R16_EXT),K===s.SHORT&&wt&&(pt=wt.R16_SNORM_EXT)),y===s.RED_INTEGER&&(K===s.UNSIGNED_BYTE&&(pt=s.R8UI),K===s.UNSIGNED_SHORT&&(pt=s.R16UI),K===s.UNSIGNED_INT&&(pt=s.R32UI),K===s.BYTE&&(pt=s.R8I),K===s.SHORT&&(pt=s.R16I),K===s.INT&&(pt=s.R32I)),y===s.RG&&(K===s.FLOAT&&(pt=s.RG32F),K===s.HALF_FLOAT&&(pt=s.RG16F),K===s.UNSIGNED_BYTE&&(pt=s.RG8),K===s.UNSIGNED_SHORT&&wt&&(pt=wt.RG16_EXT),K===s.SHORT&&wt&&(pt=wt.RG16_SNORM_EXT)),y===s.RG_INTEGER&&(K===s.UNSIGNED_BYTE&&(pt=s.RG8UI),K===s.UNSIGNED_SHORT&&(pt=s.RG16UI),K===s.UNSIGNED_INT&&(pt=s.RG32UI),K===s.BYTE&&(pt=s.RG8I),K===s.SHORT&&(pt=s.RG16I),K===s.INT&&(pt=s.RG32I)),y===s.RGB_INTEGER&&(K===s.UNSIGNED_BYTE&&(pt=s.RGB8UI),K===s.UNSIGNED_SHORT&&(pt=s.RGB16UI),K===s.UNSIGNED_INT&&(pt=s.RGB32UI),K===s.BYTE&&(pt=s.RGB8I),K===s.SHORT&&(pt=s.RGB16I),K===s.INT&&(pt=s.RGB32I)),y===s.RGBA_INTEGER&&(K===s.UNSIGNED_BYTE&&(pt=s.RGBA8UI),K===s.UNSIGNED_SHORT&&(pt=s.RGBA16UI),K===s.UNSIGNED_INT&&(pt=s.RGBA32UI),K===s.BYTE&&(pt=s.RGBA8I),K===s.SHORT&&(pt=s.RGBA16I),K===s.INT&&(pt=s.RGBA32I)),y===s.RGB&&(K===s.UNSIGNED_SHORT&&wt&&(pt=wt.RGB16_EXT),K===s.SHORT&&wt&&(pt=wt.RGB16_SNORM_EXT),K===s.UNSIGNED_INT_5_9_9_9_REV&&(pt=s.RGB9_E5),K===s.UNSIGNED_INT_10F_11F_11F_REV&&(pt=s.R11F_G11F_B10F)),y===s.RGBA){const mt=bt?Xu:Ee.getTransfer(dt);K===s.FLOAT&&(pt=s.RGBA32F),K===s.HALF_FLOAT&&(pt=s.RGBA16F),K===s.UNSIGNED_BYTE&&(pt=mt===Be?s.SRGB8_ALPHA8:s.RGBA8),K===s.UNSIGNED_SHORT&&wt&&(pt=wt.RGBA16_EXT),K===s.SHORT&&wt&&(pt=wt.RGBA16_SNORM_EXT),K===s.UNSIGNED_SHORT_4_4_4_4&&(pt=s.RGBA4),K===s.UNSIGNED_SHORT_5_5_5_1&&(pt=s.RGB5_A1)}return(pt===s.R16F||pt===s.R32F||pt===s.RG16F||pt===s.RG32F||pt===s.RGBA16F||pt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),pt}function C(N,y){let K;return N?y===null||y===Ki||y===Yo?K=s.DEPTH24_STENCIL8:y===qi?K=s.DEPTH32F_STENCIL8:y===qo&&(K=s.DEPTH24_STENCIL8,ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Ki||y===Yo?K=s.DEPTH_COMPONENT24:y===qi?K=s.DEPTH_COMPONENT32F:y===qo&&(K=s.DEPTH_COMPONENT16),K}function D(N,y){return S(N)===!0||N.isFramebufferTexture&&N.minFilter!==Ln&&N.minFilter!==Tn?Math.log2(Math.max(y.width,y.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?y.mipmaps.length:1}function L(N){const y=N.target;y.removeEventListener("dispose",L),P(y),y.isVideoTexture&&x.delete(y),y.isHTMLTexture&&v.delete(y)}function b(N){const y=N.target;y.removeEventListener("dispose",b),q(y)}function P(N){const y=r.get(N);if(y.__webglInit===void 0)return;const K=N.source,st=E.get(K);if(st){const dt=st[y.__cacheKey];dt.usedTimes--,dt.usedTimes===0&&W(N),Object.keys(st).length===0&&E.delete(K)}r.remove(N)}function W(N){const y=r.get(N);s.deleteTexture(y.__webglTexture);const K=N.source,st=E.get(K);delete st[y.__cacheKey],h.memory.textures--}function q(N){const y=r.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),r.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let st=0;st<6;st++){if(Array.isArray(y.__webglFramebuffer[st]))for(let dt=0;dt<y.__webglFramebuffer[st].length;dt++)s.deleteFramebuffer(y.__webglFramebuffer[st][dt]);else s.deleteFramebuffer(y.__webglFramebuffer[st]);y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer[st])}else{if(Array.isArray(y.__webglFramebuffer))for(let st=0;st<y.__webglFramebuffer.length;st++)s.deleteFramebuffer(y.__webglFramebuffer[st]);else s.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&s.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let st=0;st<y.__webglColorRenderbuffer.length;st++)y.__webglColorRenderbuffer[st]&&s.deleteRenderbuffer(y.__webglColorRenderbuffer[st]);y.__webglDepthRenderbuffer&&s.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const K=N.textures;for(let st=0,dt=K.length;st<dt;st++){const bt=r.get(K[st]);bt.__webglTexture&&(s.deleteTexture(bt.__webglTexture),h.memory.textures--),r.remove(K[st])}r.remove(N)}let Q=0;function lt(){Q=0}function Y(){return Q}function j(N){Q=N}function I(){const N=Q;return N>=l.maxTextures&&ne("WebGLTextures: Trying to use "+(N+1)+" texture units while this GPU supports only "+l.maxTextures),Q+=1,N}function F(N){const y=[];return y.push(N.wrapS),y.push(N.wrapT),y.push(N.wrapR||0),y.push(N.magFilter),y.push(N.minFilter),y.push(N.anisotropy),y.push(N.internalFormat),y.push(N.format),y.push(N.type),y.push(N.generateMipmaps),y.push(N.premultiplyAlpha),y.push(N.flipY),y.push(N.unpackAlignment),y.push(N.colorSpace),y.join()}function ut(N,y){const K=r.get(N);if(N.isVideoTexture&&X(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&K.__version!==N.version){const st=N.image;if(st===null)ne("WebGLRenderer: Texture marked for update but no image data found.");else if(st.complete===!1)ne("WebGLRenderer: Texture marked for update but image is incomplete");else{Tt(K,N,y);return}}else N.isExternalTexture&&(K.__webglTexture=N.sourceTexture?N.sourceTexture:null);i.bindTexture(s.TEXTURE_2D,K.__webglTexture,s.TEXTURE0+y)}function rt(N,y){const K=r.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&K.__version!==N.version){Tt(K,N,y);return}else N.isExternalTexture&&(K.__webglTexture=N.sourceTexture?N.sourceTexture:null);i.bindTexture(s.TEXTURE_2D_ARRAY,K.__webglTexture,s.TEXTURE0+y)}function ht(N,y){const K=r.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&K.__version!==N.version){Tt(K,N,y);return}i.bindTexture(s.TEXTURE_3D,K.__webglTexture,s.TEXTURE0+y)}function w(N,y){const K=r.get(N);if(N.isCubeDepthTexture!==!0&&N.version>0&&K.__version!==N.version){te(K,N,y);return}i.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture,s.TEXTURE0+y)}const J={[Jh]:s.REPEAT,[ba]:s.CLAMP_TO_EDGE,[jh]:s.MIRRORED_REPEAT},gt={[Ln]:s.NEAREST,[hy]:s.NEAREST_MIPMAP_NEAREST,[cu]:s.NEAREST_MIPMAP_LINEAR,[Tn]:s.LINEAR,[fh]:s.LINEAR_MIPMAP_NEAREST,[Pr]:s.LINEAR_MIPMAP_LINEAR},Et={[gy]:s.NEVER,[yy]:s.ALWAYS,[_y]:s.LESS,[Vd]:s.LEQUAL,[vy]:s.EQUAL,[kd]:s.GEQUAL,[Sy]:s.GREATER,[xy]:s.NOTEQUAL};function Nt(N,y){if(y.type===qi&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===Tn||y.magFilter===fh||y.magFilter===cu||y.magFilter===Pr||y.minFilter===Tn||y.minFilter===fh||y.minFilter===cu||y.minFilter===Pr)&&ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(N,s.TEXTURE_WRAP_S,J[y.wrapS]),s.texParameteri(N,s.TEXTURE_WRAP_T,J[y.wrapT]),(N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY)&&s.texParameteri(N,s.TEXTURE_WRAP_R,J[y.wrapR]),s.texParameteri(N,s.TEXTURE_MAG_FILTER,gt[y.magFilter]),s.texParameteri(N,s.TEXTURE_MIN_FILTER,gt[y.minFilter]),y.compareFunction&&(s.texParameteri(N,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(N,s.TEXTURE_COMPARE_FUNC,Et[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ln||y.minFilter!==cu&&y.minFilter!==Pr||y.type===qi&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||r.get(y).__currentAnisotropy){const K=t.get("EXT_texture_filter_anisotropic");s.texParameterf(N,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,l.getMaxAnisotropy())),r.get(y).__currentAnisotropy=y.anisotropy}}}function Xt(N,y){let K=!1;N.__webglInit===void 0&&(N.__webglInit=!0,y.addEventListener("dispose",L));const st=y.source;let dt=E.get(st);dt===void 0&&(dt={},E.set(st,dt));const bt=F(y);if(bt!==N.__cacheKey){dt[bt]===void 0&&(dt[bt]={texture:s.createTexture(),usedTimes:0},h.memory.textures++,K=!0),dt[bt].usedTimes++;const wt=dt[N.__cacheKey];wt!==void 0&&(dt[N.__cacheKey].usedTimes--,wt.usedTimes===0&&W(y)),N.__cacheKey=bt,N.__webglTexture=dt[bt].texture}return K}function it(N,y,K){return Math.floor(Math.floor(N/K)/y)}function _t(N,y,K,st){const bt=N.updateRanges;if(bt.length===0)i.texSubImage2D(s.TEXTURE_2D,0,0,0,y.width,y.height,K,st,y.data);else{bt.sort((Gt,Ot)=>Gt.start-Ot.start);let wt=0;for(let Gt=1;Gt<bt.length;Gt++){const Ot=bt[wt],Ut=bt[Gt],Qt=Ot.start+Ot.count,Jt=it(Ut.start,y.width,4),ee=it(Ot.start,y.width,4);Ut.start<=Qt+1&&Jt===ee&&it(Ut.start+Ut.count-1,y.width,4)===Jt?Ot.count=Math.max(Ot.count,Ut.start+Ut.count-Ot.start):(++wt,bt[wt]=Ut)}bt.length=wt+1;const pt=i.getParameter(s.UNPACK_ROW_LENGTH),mt=i.getParameter(s.UNPACK_SKIP_PIXELS),At=i.getParameter(s.UNPACK_SKIP_ROWS);i.pixelStorei(s.UNPACK_ROW_LENGTH,y.width);for(let Gt=0,Ot=bt.length;Gt<Ot;Gt++){const Ut=bt[Gt],Qt=Math.floor(Ut.start/4),Jt=Math.ceil(Ut.count/4),ee=Qt%y.width,V=Math.floor(Qt/y.width),Ct=Jt,St=1;i.pixelStorei(s.UNPACK_SKIP_PIXELS,ee),i.pixelStorei(s.UNPACK_SKIP_ROWS,V),i.texSubImage2D(s.TEXTURE_2D,0,ee,V,Ct,St,K,st,y.data)}N.clearUpdateRanges(),i.pixelStorei(s.UNPACK_ROW_LENGTH,pt),i.pixelStorei(s.UNPACK_SKIP_PIXELS,mt),i.pixelStorei(s.UNPACK_SKIP_ROWS,At)}}function Tt(N,y,K){let st=s.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(st=s.TEXTURE_2D_ARRAY),y.isData3DTexture&&(st=s.TEXTURE_3D);const dt=Xt(N,y),bt=y.source;i.bindTexture(st,N.__webglTexture,s.TEXTURE0+K);const wt=r.get(bt);if(bt.version!==wt.__version||dt===!0){if(i.activeTexture(s.TEXTURE0+K),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const St=Ee.getPrimaries(Ee.workingColorSpace),Dt=y.colorSpace===or?null:Ee.getPrimaries(y.colorSpace),Bt=y.colorSpace===or||St===Dt?s.NONE:s.BROWSER_DEFAULT_WEBGL;i.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Bt)}i.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment);let mt=M(y.image,!1,l.maxTextureSize);mt=Ne(y,mt);const At=c.convert(y.format,y.colorSpace),Gt=c.convert(y.type);let Ot=U(y.internalFormat,At,Gt,y.normalized,y.colorSpace,y.isVideoTexture);Nt(st,y);let Ut;const Qt=y.mipmaps,Jt=y.isVideoTexture!==!0,ee=wt.__version===void 0||dt===!0,V=bt.dataReady,Ct=D(y,mt);if(y.isDepthTexture)Ot=C(y.format===Ir,y.type),ee&&(Jt?i.texStorage2D(s.TEXTURE_2D,1,Ot,mt.width,mt.height):i.texImage2D(s.TEXTURE_2D,0,Ot,mt.width,mt.height,0,At,Gt,null));else if(y.isDataTexture)if(Qt.length>0){Jt&&ee&&i.texStorage2D(s.TEXTURE_2D,Ct,Ot,Qt[0].width,Qt[0].height);for(let St=0,Dt=Qt.length;St<Dt;St++)Ut=Qt[St],Jt?V&&i.texSubImage2D(s.TEXTURE_2D,St,0,0,Ut.width,Ut.height,At,Gt,Ut.data):i.texImage2D(s.TEXTURE_2D,St,Ot,Ut.width,Ut.height,0,At,Gt,Ut.data);y.generateMipmaps=!1}else Jt?(ee&&i.texStorage2D(s.TEXTURE_2D,Ct,Ot,mt.width,mt.height),V&&_t(y,mt,At,Gt)):i.texImage2D(s.TEXTURE_2D,0,Ot,mt.width,mt.height,0,At,Gt,mt.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Jt&&ee&&i.texStorage3D(s.TEXTURE_2D_ARRAY,Ct,Ot,Qt[0].width,Qt[0].height,mt.depth);for(let St=0,Dt=Qt.length;St<Dt;St++)if(Ut=Qt[St],y.format!==bi)if(At!==null)if(Jt){if(V)if(y.layerUpdates.size>0){const Bt=d_(Ut.width,Ut.height,y.format,y.type);for(const Mt of y.layerUpdates){const Kt=Ut.data.subarray(Mt*Bt/Ut.data.BYTES_PER_ELEMENT,(Mt+1)*Bt/Ut.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,St,0,0,Mt,Ut.width,Ut.height,1,At,Kt)}}else i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,St,0,0,0,Ut.width,Ut.height,mt.depth,At,Ut.data)}else i.compressedTexImage3D(s.TEXTURE_2D_ARRAY,St,Ot,Ut.width,Ut.height,mt.depth,0,Ut.data,0,0);else ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Jt?V&&i.texSubImage3D(s.TEXTURE_2D_ARRAY,St,0,0,0,Ut.width,Ut.height,mt.depth,At,Gt,Ut.data):i.texImage3D(s.TEXTURE_2D_ARRAY,St,Ot,Ut.width,Ut.height,mt.depth,0,At,Gt,Ut.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{Jt&&ee&&i.texStorage2D(s.TEXTURE_2D,Ct,Ot,Qt[0].width,Qt[0].height);for(let St=0,Dt=Qt.length;St<Dt;St++)Ut=Qt[St],y.format!==bi?At!==null?Jt?V&&i.compressedTexSubImage2D(s.TEXTURE_2D,St,0,0,Ut.width,Ut.height,At,Ut.data):i.compressedTexImage2D(s.TEXTURE_2D,St,Ot,Ut.width,Ut.height,0,Ut.data):ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?V&&i.texSubImage2D(s.TEXTURE_2D,St,0,0,Ut.width,Ut.height,At,Gt,Ut.data):i.texImage2D(s.TEXTURE_2D,St,Ot,Ut.width,Ut.height,0,At,Gt,Ut.data)}else if(y.isDataArrayTexture)if(Jt){if(ee&&i.texStorage3D(s.TEXTURE_2D_ARRAY,Ct,Ot,mt.width,mt.height,mt.depth),V)if(y.layerUpdates.size>0){const St=d_(mt.width,mt.height,y.format,y.type);for(const Dt of y.layerUpdates){const Bt=mt.data.subarray(Dt*St/mt.data.BYTES_PER_ELEMENT,(Dt+1)*St/mt.data.BYTES_PER_ELEMENT);i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Dt,mt.width,mt.height,1,At,Gt,Bt)}y.clearLayerUpdates()}else i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,mt.width,mt.height,mt.depth,At,Gt,mt.data)}else i.texImage3D(s.TEXTURE_2D_ARRAY,0,Ot,mt.width,mt.height,mt.depth,0,At,Gt,mt.data);else if(y.isData3DTexture)Jt?(ee&&i.texStorage3D(s.TEXTURE_3D,Ct,Ot,mt.width,mt.height,mt.depth),V&&i.texSubImage3D(s.TEXTURE_3D,0,0,0,0,mt.width,mt.height,mt.depth,At,Gt,mt.data)):i.texImage3D(s.TEXTURE_3D,0,Ot,mt.width,mt.height,mt.depth,0,At,Gt,mt.data);else if(y.isFramebufferTexture){if(ee)if(Jt)i.texStorage2D(s.TEXTURE_2D,Ct,Ot,mt.width,mt.height);else{let St=mt.width,Dt=mt.height;for(let Bt=0;Bt<Ct;Bt++)i.texImage2D(s.TEXTURE_2D,Bt,Ot,St,Dt,0,At,Gt,null),St>>=1,Dt>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in s){const St=s.canvas;if(St.hasAttribute("layoutsubtree")||St.setAttribute("layoutsubtree","true"),mt.parentNode!==St){St.appendChild(mt),v.add(y),St.onpaint=Dt=>{const Bt=Dt.changedElements;for(const Mt of v)Bt.includes(Mt.image)&&(Mt.needsUpdate=!0)},St.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,mt);else{const Bt=s.RGBA,Mt=s.RGBA,Kt=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Bt,Mt,Kt,mt)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Qt.length>0){if(Jt&&ee){const St=De(Qt[0]);i.texStorage2D(s.TEXTURE_2D,Ct,Ot,St.width,St.height)}for(let St=0,Dt=Qt.length;St<Dt;St++)Ut=Qt[St],Jt?V&&i.texSubImage2D(s.TEXTURE_2D,St,0,0,At,Gt,Ut):i.texImage2D(s.TEXTURE_2D,St,Ot,At,Gt,Ut);y.generateMipmaps=!1}else if(Jt){if(ee){const St=De(mt);i.texStorage2D(s.TEXTURE_2D,Ct,Ot,St.width,St.height)}V&&i.texSubImage2D(s.TEXTURE_2D,0,0,0,At,Gt,mt)}else i.texImage2D(s.TEXTURE_2D,0,Ot,At,Gt,mt);S(y)&&B(st),wt.__version=bt.version,y.onUpdate&&y.onUpdate(y)}N.__version=y.version}function te(N,y,K){if(y.image.length!==6)return;const st=Xt(N,y),dt=y.source;i.bindTexture(s.TEXTURE_CUBE_MAP,N.__webglTexture,s.TEXTURE0+K);const bt=r.get(dt);if(dt.version!==bt.__version||st===!0){i.activeTexture(s.TEXTURE0+K);const wt=Ee.getPrimaries(Ee.workingColorSpace),pt=y.colorSpace===or?null:Ee.getPrimaries(y.colorSpace),mt=y.colorSpace===or||wt===pt?s.NONE:s.BROWSER_DEFAULT_WEBGL;i.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const At=y.isCompressedTexture||y.image[0].isCompressedTexture,Gt=y.image[0]&&y.image[0].isDataTexture,Ot=[];for(let Mt=0;Mt<6;Mt++)!At&&!Gt?Ot[Mt]=M(y.image[Mt],!0,l.maxCubemapSize):Ot[Mt]=Gt?y.image[Mt].image:y.image[Mt],Ot[Mt]=Ne(y,Ot[Mt]);const Ut=Ot[0],Qt=c.convert(y.format,y.colorSpace),Jt=c.convert(y.type),ee=U(y.internalFormat,Qt,Jt,y.normalized,y.colorSpace),V=y.isVideoTexture!==!0,Ct=bt.__version===void 0||st===!0,St=dt.dataReady;let Dt=D(y,Ut);Nt(s.TEXTURE_CUBE_MAP,y);let Bt;if(At){V&&Ct&&i.texStorage2D(s.TEXTURE_CUBE_MAP,Dt,ee,Ut.width,Ut.height);for(let Mt=0;Mt<6;Mt++){Bt=Ot[Mt].mipmaps;for(let Kt=0;Kt<Bt.length;Kt++){const Wt=Bt[Kt];y.format!==bi?Qt!==null?V?St&&i.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Kt,0,0,Wt.width,Wt.height,Qt,Wt.data):i.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Kt,ee,Wt.width,Wt.height,0,Wt.data):ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?St&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Kt,0,0,Wt.width,Wt.height,Qt,Jt,Wt.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Kt,ee,Wt.width,Wt.height,0,Qt,Jt,Wt.data)}}}else{if(Bt=y.mipmaps,V&&Ct){Bt.length>0&&Dt++;const Mt=De(Ot[0]);i.texStorage2D(s.TEXTURE_CUBE_MAP,Dt,ee,Mt.width,Mt.height)}for(let Mt=0;Mt<6;Mt++)if(Gt){V?St&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,0,0,Ot[Mt].width,Ot[Mt].height,Qt,Jt,Ot[Mt].data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,ee,Ot[Mt].width,Ot[Mt].height,0,Qt,Jt,Ot[Mt].data);for(let Kt=0;Kt<Bt.length;Kt++){const Fe=Bt[Kt].image[Mt].image;V?St&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Kt+1,0,0,Fe.width,Fe.height,Qt,Jt,Fe.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Kt+1,ee,Fe.width,Fe.height,0,Qt,Jt,Fe.data)}}else{V?St&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,0,0,Qt,Jt,Ot[Mt]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,ee,Qt,Jt,Ot[Mt]);for(let Kt=0;Kt<Bt.length;Kt++){const Wt=Bt[Kt];V?St&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Kt+1,0,0,Qt,Jt,Wt.image[Mt]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Kt+1,ee,Qt,Jt,Wt.image[Mt])}}}S(y)&&B(s.TEXTURE_CUBE_MAP),bt.__version=dt.version,y.onUpdate&&y.onUpdate(y)}N.__version=y.version}function Ht(N,y,K,st,dt,bt){const wt=c.convert(K.format,K.colorSpace),pt=c.convert(K.type),mt=U(K.internalFormat,wt,pt,K.normalized,K.colorSpace),At=r.get(y),Gt=r.get(K);if(Gt.__renderTarget=y,!At.__hasExternalTextures){const Ot=Math.max(1,y.width>>bt),Ut=Math.max(1,y.height>>bt);dt===s.TEXTURE_3D||dt===s.TEXTURE_2D_ARRAY?i.texImage3D(dt,bt,mt,Ot,Ut,y.depth,0,wt,pt,null):i.texImage2D(dt,bt,mt,Ot,Ut,0,wt,pt,null)}i.bindFramebuffer(s.FRAMEBUFFER,N),en(y)?p.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,st,dt,Gt.__webglTexture,0,We(y)):(dt===s.TEXTURE_2D||dt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&dt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,st,dt,Gt.__webglTexture,bt),i.bindFramebuffer(s.FRAMEBUFFER,null)}function le(N,y,K){if(s.bindRenderbuffer(s.RENDERBUFFER,N),y.depthBuffer){const st=y.depthTexture,dt=st&&st.isDepthTexture?st.type:null,bt=C(y.stencilBuffer,dt),wt=y.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;en(y)?p.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,We(y),bt,y.width,y.height):K?s.renderbufferStorageMultisample(s.RENDERBUFFER,We(y),bt,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,bt,y.width,y.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,wt,s.RENDERBUFFER,N)}else{const st=y.textures;for(let dt=0;dt<st.length;dt++){const bt=st[dt],wt=c.convert(bt.format,bt.colorSpace),pt=c.convert(bt.type),mt=U(bt.internalFormat,wt,pt,bt.normalized,bt.colorSpace);en(y)?p.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,We(y),mt,y.width,y.height):K?s.renderbufferStorageMultisample(s.RENDERBUFFER,We(y),mt,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,mt,y.width,y.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function $e(N,y,K){const st=y.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(s.FRAMEBUFFER,N),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const dt=r.get(y.depthTexture);if(dt.__renderTarget=y,(!dt.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),st){if(dt.__webglInit===void 0&&(dt.__webglInit=!0,y.depthTexture.addEventListener("dispose",L)),dt.__webglTexture===void 0){dt.__webglTexture=s.createTexture(),i.bindTexture(s.TEXTURE_CUBE_MAP,dt.__webglTexture),Nt(s.TEXTURE_CUBE_MAP,y.depthTexture);const At=c.convert(y.depthTexture.format),Gt=c.convert(y.depthTexture.type);let Ot;y.depthTexture.format===Ca?Ot=s.DEPTH_COMPONENT24:y.depthTexture.format===Ir&&(Ot=s.DEPTH24_STENCIL8);for(let Ut=0;Ut<6;Ut++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,0,Ot,y.width,y.height,0,At,Gt,null)}}else ut(y.depthTexture,0);const bt=dt.__webglTexture,wt=We(y),pt=st?s.TEXTURE_CUBE_MAP_POSITIVE_X+K:s.TEXTURE_2D,mt=y.depthTexture.format===Ir?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(y.depthTexture.format===Ca)en(y)?p.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,mt,pt,bt,0,wt):s.framebufferTexture2D(s.FRAMEBUFFER,mt,pt,bt,0);else if(y.depthTexture.format===Ir)en(y)?p.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,mt,pt,bt,0,wt):s.framebufferTexture2D(s.FRAMEBUFFER,mt,pt,bt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ae(N){const y=r.get(N),K=N.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==N.depthTexture){const st=N.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),st){const dt=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,st.removeEventListener("dispose",dt)};st.addEventListener("dispose",dt),y.__depthDisposeCallback=dt}y.__boundDepthTexture=st}if(N.depthTexture&&!y.__autoAllocateDepthBuffer)if(K)for(let st=0;st<6;st++)$e(y.__webglFramebuffer[st],N,st);else{const st=N.texture.mipmaps;st&&st.length>0?$e(y.__webglFramebuffer[0],N,0):$e(y.__webglFramebuffer,N,0)}else if(K){y.__webglDepthbuffer=[];for(let st=0;st<6;st++)if(i.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[st]),y.__webglDepthbuffer[st]===void 0)y.__webglDepthbuffer[st]=s.createRenderbuffer(),le(y.__webglDepthbuffer[st],N,!1);else{const dt=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,bt=y.__webglDepthbuffer[st];s.bindRenderbuffer(s.RENDERBUFFER,bt),s.framebufferRenderbuffer(s.FRAMEBUFFER,dt,s.RENDERBUFFER,bt)}}else{const st=N.texture.mipmaps;if(st&&st.length>0?i.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[0]):i.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=s.createRenderbuffer(),le(y.__webglDepthbuffer,N,!1);else{const dt=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,bt=y.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,bt),s.framebufferRenderbuffer(s.FRAMEBUFFER,dt,s.RENDERBUFFER,bt)}}i.bindFramebuffer(s.FRAMEBUFFER,null)}function Se(N,y,K){const st=r.get(N);y!==void 0&&Ht(st.__webglFramebuffer,N,N.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),K!==void 0&&ae(N)}function Le(N){const y=N.texture,K=r.get(N),st=r.get(y);N.addEventListener("dispose",b);const dt=N.textures,bt=N.isWebGLCubeRenderTarget===!0,wt=dt.length>1;if(wt||(st.__webglTexture===void 0&&(st.__webglTexture=s.createTexture()),st.__version=y.version,h.memory.textures++),bt){K.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(y.mipmaps&&y.mipmaps.length>0){K.__webglFramebuffer[pt]=[];for(let mt=0;mt<y.mipmaps.length;mt++)K.__webglFramebuffer[pt][mt]=s.createFramebuffer()}else K.__webglFramebuffer[pt]=s.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){K.__webglFramebuffer=[];for(let pt=0;pt<y.mipmaps.length;pt++)K.__webglFramebuffer[pt]=s.createFramebuffer()}else K.__webglFramebuffer=s.createFramebuffer();if(wt)for(let pt=0,mt=dt.length;pt<mt;pt++){const At=r.get(dt[pt]);At.__webglTexture===void 0&&(At.__webglTexture=s.createTexture(),h.memory.textures++)}if(N.samples>0&&en(N)===!1){K.__webglMultisampledFramebuffer=s.createFramebuffer(),K.__webglColorRenderbuffer=[],i.bindFramebuffer(s.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let pt=0;pt<dt.length;pt++){const mt=dt[pt];K.__webglColorRenderbuffer[pt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,K.__webglColorRenderbuffer[pt]);const At=c.convert(mt.format,mt.colorSpace),Gt=c.convert(mt.type),Ot=U(mt.internalFormat,At,Gt,mt.normalized,mt.colorSpace,N.isXRRenderTarget===!0),Ut=We(N);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ut,Ot,N.width,N.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pt,s.RENDERBUFFER,K.__webglColorRenderbuffer[pt])}s.bindRenderbuffer(s.RENDERBUFFER,null),N.depthBuffer&&(K.__webglDepthRenderbuffer=s.createRenderbuffer(),le(K.__webglDepthRenderbuffer,N,!0)),i.bindFramebuffer(s.FRAMEBUFFER,null)}}if(bt){i.bindTexture(s.TEXTURE_CUBE_MAP,st.__webglTexture),Nt(s.TEXTURE_CUBE_MAP,y);for(let pt=0;pt<6;pt++)if(y.mipmaps&&y.mipmaps.length>0)for(let mt=0;mt<y.mipmaps.length;mt++)Ht(K.__webglFramebuffer[pt][mt],N,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,mt);else Ht(K.__webglFramebuffer[pt],N,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);S(y)&&B(s.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(wt){for(let pt=0,mt=dt.length;pt<mt;pt++){const At=dt[pt],Gt=r.get(At);let Ot=s.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(Ot=N.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),i.bindTexture(Ot,Gt.__webglTexture),Nt(Ot,At),Ht(K.__webglFramebuffer,N,At,s.COLOR_ATTACHMENT0+pt,Ot,0),S(At)&&B(Ot)}i.unbindTexture()}else{let pt=s.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(pt=N.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),i.bindTexture(pt,st.__webglTexture),Nt(pt,y),y.mipmaps&&y.mipmaps.length>0)for(let mt=0;mt<y.mipmaps.length;mt++)Ht(K.__webglFramebuffer[mt],N,y,s.COLOR_ATTACHMENT0,pt,mt);else Ht(K.__webglFramebuffer,N,y,s.COLOR_ATTACHMENT0,pt,0);S(y)&&B(pt),i.unbindTexture()}N.depthBuffer&&ae(N)}function me(N){const y=N.textures;for(let K=0,st=y.length;K<st;K++){const dt=y[K];if(S(dt)){const bt=k(N),wt=r.get(dt).__webglTexture;i.bindTexture(bt,wt),B(bt),i.unbindTexture()}}}const Xe=[],tn=[];function Mn(N){if(N.samples>0){if(en(N)===!1){const y=N.textures,K=N.width,st=N.height;let dt=s.COLOR_BUFFER_BIT;const bt=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,wt=r.get(N),pt=y.length>1;if(pt)for(let At=0;At<y.length;At++)i.bindFramebuffer(s.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+At,s.RENDERBUFFER,null),i.bindFramebuffer(s.FRAMEBUFFER,wt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+At,s.TEXTURE_2D,null,0);i.bindFramebuffer(s.READ_FRAMEBUFFER,wt.__webglMultisampledFramebuffer);const mt=N.texture.mipmaps;mt&&mt.length>0?i.bindFramebuffer(s.DRAW_FRAMEBUFFER,wt.__webglFramebuffer[0]):i.bindFramebuffer(s.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let At=0;At<y.length;At++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(dt|=s.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(dt|=s.STENCIL_BUFFER_BIT)),pt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,wt.__webglColorRenderbuffer[At]);const Gt=r.get(y[At]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Gt,0)}s.blitFramebuffer(0,0,K,st,0,0,K,st,dt,s.NEAREST),m===!0&&(Xe.length=0,tn.length=0,Xe.push(s.COLOR_ATTACHMENT0+At),N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&(Xe.push(bt),tn.push(bt),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,tn)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Xe))}if(i.bindFramebuffer(s.READ_FRAMEBUFFER,null),i.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),pt)for(let At=0;At<y.length;At++){i.bindFramebuffer(s.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+At,s.RENDERBUFFER,wt.__webglColorRenderbuffer[At]);const Gt=r.get(y[At]).__webglTexture;i.bindFramebuffer(s.FRAMEBUFFER,wt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+At,s.TEXTURE_2D,Gt,0)}i.bindFramebuffer(s.DRAW_FRAMEBUFFER,wt.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&m){const y=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[y])}}}function We(N){return Math.min(l.maxSamples,N.samples)}function en(N){const y=r.get(N);return N.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function X(N){const y=h.render.frame;x.get(N)!==y&&(x.set(N,y),N.update())}function Ne(N,y){const K=N.colorSpace,st=N.format,dt=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||K!==Zo&&K!==or&&(Ee.getTransfer(K)===Be?(st!==bi||dt!==ci)&&ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ce("WebGLTextures: Unsupported texture color space:",K)),y}function De(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(d.width=N.naturalWidth||N.width,d.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(d.width=N.displayWidth,d.height=N.displayHeight):(d.width=N.width,d.height=N.height),d}this.allocateTextureUnit=I,this.resetTextureUnits=lt,this.getTextureUnits=Y,this.setTextureUnits=j,this.setTexture2D=ut,this.setTexture2DArray=rt,this.setTexture3D=ht,this.setTextureCube=w,this.rebindTextures=Se,this.setupRenderTarget=Le,this.updateRenderTargetMipmap=me,this.updateMultisampleRenderTarget=Mn,this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=Ht,this.useMultisampledRTT=en,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function K1(s,t){function i(r,l=or){let c;const h=Ee.getTransfer(l);if(r===ci)return s.UNSIGNED_BYTE;if(r===Bd)return s.UNSIGNED_SHORT_4_4_4_4;if(r===zd)return s.UNSIGNED_SHORT_5_5_5_1;if(r===nv)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===iv)return s.UNSIGNED_INT_10F_11F_11F_REV;if(r===tv)return s.BYTE;if(r===ev)return s.SHORT;if(r===qo)return s.UNSIGNED_SHORT;if(r===Id)return s.INT;if(r===Ki)return s.UNSIGNED_INT;if(r===qi)return s.FLOAT;if(r===Ii)return s.HALF_FLOAT;if(r===av)return s.ALPHA;if(r===rv)return s.RGB;if(r===bi)return s.RGBA;if(r===Ca)return s.DEPTH_COMPONENT;if(r===Ir)return s.DEPTH_STENCIL;if(r===sv)return s.RED;if(r===Fd)return s.RED_INTEGER;if(r===Fr)return s.RG;if(r===Hd)return s.RG_INTEGER;if(r===Gd)return s.RGBA_INTEGER;if(r===Iu||r===Bu||r===zu||r===Fu)if(h===Be)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(r===Iu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Bu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===zu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Fu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(r===Iu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Bu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===zu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Fu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===$h||r===td||r===ed||r===nd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(r===$h)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===td)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===ed)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===nd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===id||r===ad||r===rd||r===sd||r===od||r===Vu||r===ld)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(r===id||r===ad)return h===Be?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(r===rd)return h===Be?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(r===sd)return c.COMPRESSED_R11_EAC;if(r===od)return c.COMPRESSED_SIGNED_R11_EAC;if(r===Vu)return c.COMPRESSED_RG11_EAC;if(r===ld)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(r===ud||r===cd||r===fd||r===hd||r===dd||r===pd||r===md||r===gd||r===_d||r===vd||r===Sd||r===xd||r===yd||r===Md)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(r===ud)return h===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===cd)return h===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===fd)return h===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===hd)return h===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===dd)return h===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===pd)return h===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===md)return h===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===gd)return h===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===_d)return h===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===vd)return h===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Sd)return h===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===xd)return h===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===yd)return h===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Md)return h===Be?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Ed||r===bd||r===Td)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(r===Ed)return h===Be?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===bd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Td)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Ad||r===Rd||r===ku||r===Cd)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(r===Ad)return c.COMPRESSED_RED_RGTC1_EXT;if(r===Rd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===ku)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Cd)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Yo?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:i}}const Q1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,J1=`
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

}`;class j1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i){if(this.texture===null){const r=new _v(t.texture);(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,r=new Ji({vertexShader:Q1,fragmentShader:J1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Qi(new Qu(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $1 extends ur{constructor(t,i){super();const r=this;let l=null,c=1,h=null,p="local-floor",m=1,d=null,x=null,v=null,_=null,E=null,R=null;const O=typeof XRWebGLBinding<"u",M=new j1,S={},B=i.getContextAttributes();let k=null,U=null;const C=[],D=[],L=new ie;let b=null,P=null;const W=new Ei;W.viewport=new rn;const q=new Ei;q.viewport=new rn;const Q=[W,q],lt=new sM;let Y=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(it){let _t=C[it];return _t===void 0&&(_t=new Sh,C[it]=_t),_t.getTargetRaySpace()},this.getControllerGrip=function(it){let _t=C[it];return _t===void 0&&(_t=new Sh,C[it]=_t),_t.getGripSpace()},this.getHand=function(it){let _t=C[it];return _t===void 0&&(_t=new Sh,C[it]=_t),_t.getHandSpace()};function I(it){const _t=D.indexOf(it.inputSource);if(_t===-1)return;const Tt=C[_t];Tt!==void 0&&(Tt.update(it.inputSource,it.frame,d||h),Tt.dispatchEvent({type:it.type,data:it.inputSource}))}function F(){l.removeEventListener("select",I),l.removeEventListener("selectstart",I),l.removeEventListener("selectend",I),l.removeEventListener("squeeze",I),l.removeEventListener("squeezestart",I),l.removeEventListener("squeezeend",I),l.removeEventListener("end",F),l.removeEventListener("inputsourceschange",ut);for(let it=0;it<C.length;it++){const _t=D[it];_t!==null&&(D[it]=null,C[it].disconnect(_t))}Y=null,j=null,M.reset();for(const it in S)delete S[it];if(t.setRenderTarget(k),E=null,_=null,v=null,l=null,U=null,Xt.stop(),r.isPresenting=!1,t.setPixelRatio(b),t.setSize(L.width,L.height,!1),P!==null){const it=P.camera;it.fov=P.fov,it.zoom=P.zoom,it.updateProjectionMatrix(),P=null}r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(it){c=it,r.isPresenting===!0&&ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(it){p=it,r.isPresenting===!0&&ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||h},this.setReferenceSpace=function(it){d=it},this.getBaseLayer=function(){return _!==null?_:E},this.getBinding=function(){return v===null&&O&&(v=new XRWebGLBinding(l,i)),v},this.getFrame=function(){return R},this.getSession=function(){return l},this.setSession=async function(it){if(l=it,l!==null){if(k=t.getRenderTarget(),l.addEventListener("select",I),l.addEventListener("selectstart",I),l.addEventListener("selectend",I),l.addEventListener("squeeze",I),l.addEventListener("squeezestart",I),l.addEventListener("squeezeend",I),l.addEventListener("end",F),l.addEventListener("inputsourceschange",ut),B.xrCompatible!==!0&&await i.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(L),O&&"createProjectionLayer"in XRWebGLBinding.prototype){let Tt=null,te=null,Ht=null;B.depth&&(Ht=B.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Tt=B.stencil?Ir:Ca,te=B.stencil?Yo:Ki);const le={colorFormat:i.RGBA8,depthFormat:Ht,scaleFactor:c};v=this.getBinding(),_=v.createProjectionLayer(le),l.updateRenderState({layers:[_]}),t.setPixelRatio(1),t.setSize(_.textureWidth,_.textureHeight,!1),U=new Ti(_.textureWidth,_.textureHeight,{format:bi,type:ci,depthTexture:new Ko(_.textureWidth,_.textureHeight,te,void 0,void 0,void 0,void 0,void 0,void 0,Tt),stencilBuffer:B.stencil,colorSpace:t.outputColorSpace,samples:B.antialias?4:0,resolveDepthBuffer:_.ignoreDepthValues===!1,resolveStencilBuffer:_.ignoreDepthValues===!1,storeMultisampledDepthBuffer:_.ignoreDepthValues===!1,storeMultisampledStencilBuffer:_.ignoreDepthValues===!1})}else{const Tt={antialias:B.antialias,alpha:!0,depth:B.depth,stencil:B.stencil,framebufferScaleFactor:c};E=new XRWebGLLayer(l,i,Tt),l.updateRenderState({baseLayer:E}),t.setPixelRatio(1),t.setSize(E.framebufferWidth,E.framebufferHeight,!1),U=new Ti(E.framebufferWidth,E.framebufferHeight,{format:bi,type:ci,colorSpace:t.outputColorSpace,stencilBuffer:B.stencil,resolveDepthBuffer:E.ignoreDepthValues===!1,resolveStencilBuffer:E.ignoreDepthValues===!1,storeMultisampledDepthBuffer:E.ignoreDepthValues===!1,storeMultisampledStencilBuffer:E.ignoreDepthValues===!1})}U.isXRRenderTarget=!0,this.setFoveation(m),d=null,h=await l.requestReferenceSpace(p),Xt.setContext(l),Xt.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function ut(it){for(let _t=0;_t<it.removed.length;_t++){const Tt=it.removed[_t],te=D.indexOf(Tt);te>=0&&(D[te]=null,C[te].disconnect(Tt))}for(let _t=0;_t<it.added.length;_t++){const Tt=it.added[_t];let te=D.indexOf(Tt);if(te===-1){for(let le=0;le<C.length;le++)if(le>=D.length){D.push(Tt),te=le;break}else if(D[le]===null){D[le]=Tt,te=le;break}if(te===-1)break}const Ht=C[te];Ht&&Ht.connect(Tt)}}const rt=new nt,ht=new nt;function w(it,_t,Tt){rt.setFromMatrixPosition(_t.matrixWorld),ht.setFromMatrixPosition(Tt.matrixWorld);const te=rt.distanceTo(ht),Ht=_t.projectionMatrix.elements,le=Tt.projectionMatrix.elements,$e=Ht[14]/(Ht[10]-1),ae=Ht[14]/(Ht[10]+1),Se=(Ht[9]+1)/Ht[5],Le=(Ht[9]-1)/Ht[5],me=(Ht[8]-1)/Ht[0],Xe=(le[8]+1)/le[0],tn=$e*me,Mn=$e*Xe,We=te/(-me+Xe),en=We*-me;if(_t.matrixWorld.decompose(it.position,it.quaternion,it.scale),it.translateX(en),it.translateZ(We),it.matrixWorld.compose(it.position,it.quaternion,it.scale),it.matrixWorldInverse.copy(it.matrixWorld).invert(),Ht[10]===-1)it.projectionMatrix.copy(_t.projectionMatrix),it.projectionMatrixInverse.copy(_t.projectionMatrixInverse);else{const X=$e+We,Ne=ae+We,De=tn-en,N=Mn+(te-en),y=Se*ae/Ne*X,K=Le*ae/Ne*X;it.projectionMatrix.makePerspective(De,N,y,K,X,Ne),it.projectionMatrixInverse.copy(it.projectionMatrix).invert()}}function J(it,_t){_t===null?it.matrixWorld.copy(it.matrix):it.matrixWorld.multiplyMatrices(_t.matrixWorld,it.matrix),it.matrixWorldInverse.copy(it.matrixWorld).invert()}this.updateCamera=function(it){if(l===null)return;let _t=it.near,Tt=it.far;M.texture!==null&&(M.depthNear>0&&(_t=M.depthNear),M.depthFar>0&&(Tt=M.depthFar)),lt.near=q.near=W.near=_t,lt.far=q.far=W.far=Tt,(Y!==lt.near||j!==lt.far)&&(l.updateRenderState({depthNear:lt.near,depthFar:lt.far}),Y=lt.near,j=lt.far),lt.layers.mask=it.layers.mask|6,W.layers.mask=lt.layers.mask&-5,q.layers.mask=lt.layers.mask&-3;const te=it.parent,Ht=lt.cameras;J(lt,te);for(let le=0;le<Ht.length;le++)J(Ht[le],te);Ht.length===2?w(lt,W,q):lt.projectionMatrix.copy(W.projectionMatrix),P===null&&it.isPerspectiveCamera&&(P={camera:it,fov:it.fov,zoom:it.zoom}),gt(it,lt,te)};function gt(it,_t,Tt){Tt===null?it.matrix.copy(_t.matrixWorld):(it.matrix.copy(Tt.matrixWorld),it.matrix.invert(),it.matrix.multiply(_t.matrixWorld)),it.matrix.decompose(it.position,it.quaternion,it.scale),it.updateMatrixWorld(!0),it.projectionMatrix.copy(_t.projectionMatrix),it.projectionMatrixInverse.copy(_t.projectionMatrixInverse),it.isPerspectiveCamera&&(it.fov=wd*2*Math.atan(1/it.projectionMatrix.elements[5]),it.zoom=1)}this.getCamera=function(){return lt},this.getFoveation=function(){if(!(_===null&&E===null))return m},this.setFoveation=function(it){m=it,_!==null&&(_.fixedFoveation=it),E!==null&&E.fixedFoveation!==void 0&&(E.fixedFoveation=it)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(lt)},this.getCameraTexture=function(it){return S[it]};let Et=null;function Nt(it,_t){if(x=_t.getViewerPose(d||h),R=_t,x!==null){const Tt=x.views;E!==null&&(t.setRenderTargetFramebuffer(U,E.framebuffer),t.setRenderTarget(U));let te=!1;Tt.length!==lt.cameras.length&&(lt.cameras.length=0,te=!0);for(let ae=0;ae<Tt.length;ae++){const Se=Tt[ae];let Le=null;if(E!==null)Le=E.getViewport(Se);else{const Xe=v.getViewSubImage(_,Se);Le=Xe.viewport,ae===0&&(t.setRenderTargetTextures(U,Xe.colorTexture,Xe.depthStencilTexture),t.setRenderTarget(U))}let me=Q[ae];me===void 0&&(me=new Ei,me.layers.enable(ae),me.viewport=new rn,Q[ae]=me),me.matrix.fromArray(Se.transform.matrix),me.matrix.decompose(me.position,me.quaternion,me.scale),me.projectionMatrix.fromArray(Se.projectionMatrix),me.projectionMatrixInverse.copy(me.projectionMatrix).invert(),me.viewport.set(Le.x,Le.y,Le.width,Le.height),ae===0&&(lt.matrix.copy(me.matrix),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale)),te===!0&&lt.cameras.push(me)}const Ht=l.enabledFeatures;if(Ht&&Ht.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&O){v=r.getBinding();const ae=v.getDepthInformation(Tt[0]);ae&&ae.isValid&&ae.texture&&M.init(ae,l.renderState)}if(Ht&&Ht.includes("camera-access")&&O){t.state.unbindTexture(),v=r.getBinding();for(let ae=0;ae<Tt.length;ae++){const Se=Tt[ae].camera;if(Se){let Le=S[Se];Le||(Le=new _v,S[Se]=Le);const me=v.getCameraImage(Se);Le.sourceTexture=me}}}}for(let Tt=0;Tt<C.length;Tt++){const te=D[Tt],Ht=C[Tt];te!==null&&Ht!==void 0&&Ht.update(te,_t,d||h)}Et&&Et(it,_t),_t.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:_t}),R=null}const Xt=new yv;Xt.setAnimationLoop(Nt),this.setAnimationLoop=function(it){Et=it},this.dispose=function(){}}}const tA=new gn,Cv=new re;Cv.set(-1,0,0,0,1,0,0,0,1);function eA(s,t){function i(M,S){M.matrixAutoUpdate===!0&&M.updateMatrix(),S.value.copy(M.matrix)}function r(M,S){S.color.getRGB(M.fogColor.value,vv(s)),S.isFog?(M.fogNear.value=S.near,M.fogFar.value=S.far):S.isFogExp2&&(M.fogDensity.value=S.density)}function l(M,S,B,k,U){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?c(M,S):S.isMeshLambertMaterial?(c(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(c(M,S),v(M,S)):S.isMeshPhongMaterial?(c(M,S),x(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(c(M,S),_(M,S),S.isMeshPhysicalMaterial&&E(M,S,U)):S.isMeshMatcapMaterial?(c(M,S),R(M,S)):S.isMeshDepthMaterial?c(M,S):S.isMeshDistanceMaterial?(c(M,S),O(M,S)):S.isMeshNormalMaterial?c(M,S):S.isLineBasicMaterial?(h(M,S),S.isLineDashedMaterial&&p(M,S)):S.isPointsMaterial?m(M,S,B,k):S.isSpriteMaterial?d(M,S):S.isShadowMaterial?(M.color.value.copy(S.color),M.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(M,S){M.opacity.value=S.opacity,S.color&&M.diffuse.value.copy(S.color),S.emissive&&M.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(M.map.value=S.map,i(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.bumpMap&&(M.bumpMap.value=S.bumpMap,i(S.bumpMap,M.bumpMapTransform),M.bumpScale.value=S.bumpScale,S.side===Jn&&(M.bumpScale.value*=-1)),S.normalMap&&(M.normalMap.value=S.normalMap,i(S.normalMap,M.normalMapTransform),M.normalScale.value.copy(S.normalScale),S.side===Jn&&M.normalScale.value.negate()),S.displacementMap&&(M.displacementMap.value=S.displacementMap,i(S.displacementMap,M.displacementMapTransform),M.displacementScale.value=S.displacementScale,M.displacementBias.value=S.displacementBias),S.emissiveMap&&(M.emissiveMap.value=S.emissiveMap,i(S.emissiveMap,M.emissiveMapTransform)),S.specularMap&&(M.specularMap.value=S.specularMap,i(S.specularMap,M.specularMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest);const B=t.get(S),k=B.envMap,U=B.envMapRotation;k&&(M.envMap.value=k,M.envMapRotation.value.setFromMatrix4(tA.makeRotationFromEuler(U)).transpose(),k.isCubeTexture&&k.isRenderTargetTexture===!1&&M.envMapRotation.value.premultiply(Cv),M.reflectivity.value=S.reflectivity,M.ior.value=S.ior,M.refractionRatio.value=S.refractionRatio),S.lightMap&&(M.lightMap.value=S.lightMap,M.lightMapIntensity.value=S.lightMapIntensity,i(S.lightMap,M.lightMapTransform)),S.aoMap&&(M.aoMap.value=S.aoMap,M.aoMapIntensity.value=S.aoMapIntensity,i(S.aoMap,M.aoMapTransform))}function h(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,S.map&&(M.map.value=S.map,i(S.map,M.mapTransform))}function p(M,S){M.dashSize.value=S.dashSize,M.totalSize.value=S.dashSize+S.gapSize,M.scale.value=S.scale}function m(M,S,B,k){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.size.value=S.size*B,M.scale.value=k*.5,S.map&&(M.map.value=S.map,i(S.map,M.uvTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function d(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.rotation.value=S.rotation,S.map&&(M.map.value=S.map,i(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function x(M,S){M.specular.value.copy(S.specular),M.shininess.value=Math.max(S.shininess,1e-4)}function v(M,S){S.gradientMap&&(M.gradientMap.value=S.gradientMap)}function _(M,S){M.metalness.value=S.metalness,S.metalnessMap&&(M.metalnessMap.value=S.metalnessMap,i(S.metalnessMap,M.metalnessMapTransform)),M.roughness.value=S.roughness,S.roughnessMap&&(M.roughnessMap.value=S.roughnessMap,i(S.roughnessMap,M.roughnessMapTransform)),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)}function E(M,S,B){M.ior.value=S.ior,S.sheen>0&&(M.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),M.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(M.sheenColorMap.value=S.sheenColorMap,i(S.sheenColorMap,M.sheenColorMapTransform)),S.sheenRoughnessMap&&(M.sheenRoughnessMap.value=S.sheenRoughnessMap,i(S.sheenRoughnessMap,M.sheenRoughnessMapTransform))),S.clearcoat>0&&(M.clearcoat.value=S.clearcoat,M.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(M.clearcoatMap.value=S.clearcoatMap,i(S.clearcoatMap,M.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,i(S.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(M.clearcoatNormalMap.value=S.clearcoatNormalMap,i(S.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===Jn&&M.clearcoatNormalScale.value.negate())),S.dispersion>0&&(M.dispersion.value=S.dispersion),S.retroreflectivity>0&&(M.retroreflectivity.value=S.retroreflectivity),S.iridescence>0&&(M.iridescence.value=S.iridescence,M.iridescenceIOR.value=S.iridescenceIOR,M.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(M.iridescenceMap.value=S.iridescenceMap,i(S.iridescenceMap,M.iridescenceMapTransform)),S.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=S.iridescenceThicknessMap,i(S.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),S.transmission>0&&(M.transmission.value=S.transmission,M.transmissionSamplerMap.value=B.texture,M.transmissionSamplerSize.value.set(B.width,B.height),S.transmissionMap&&(M.transmissionMap.value=S.transmissionMap,i(S.transmissionMap,M.transmissionMapTransform)),M.thickness.value=S.thickness,S.thicknessMap&&(M.thicknessMap.value=S.thicknessMap,i(S.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=S.attenuationDistance,M.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(M.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(M.anisotropyMap.value=S.anisotropyMap,i(S.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=S.specularIntensity,M.specularColor.value.copy(S.specularColor),S.specularColorMap&&(M.specularColorMap.value=S.specularColorMap,i(S.specularColorMap,M.specularColorMapTransform)),S.specularIntensityMap&&(M.specularIntensityMap.value=S.specularIntensityMap,i(S.specularIntensityMap,M.specularIntensityMapTransform))}function R(M,S){S.matcap&&(M.matcap.value=S.matcap)}function O(M,S){const B=t.get(S).light;M.referencePosition.value.setFromMatrixPosition(B.matrixWorld),M.nearDistance.value=B.shadow.camera.near,M.farDistance.value=B.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:l}}function nA(s,t,i,r){let l={},c={},h=[];const p=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function m(U,C){const D=C.program;r.uniformBlockBinding(U,D)}function d(U,C){let D=l[U.id];D===void 0&&(M(U),D=x(U),l[U.id]=D,U.addEventListener("dispose",B));const L=C.program;r.updateUBOMapping(U,L);const b=t.render.frame;c[U.id]!==b&&(_(U),c[U.id]=b)}function x(U){const C=v();U.__bindingPointIndex=C;const D=s.createBuffer(),L=U.__size,b=U.usage;return s.bindBuffer(s.UNIFORM_BUFFER,D),s.bufferData(s.UNIFORM_BUFFER,L,b),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,C,D),D}function v(){for(let U=0;U<p;U++)if(h.indexOf(U)===-1)return h.push(U),U;return Ce("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(U){const C=l[U.id],D=U.uniforms,L=U.__cache;s.bindBuffer(s.UNIFORM_BUFFER,C);for(let b=0,P=D.length;b<P;b++){const W=D[b];if(Array.isArray(W))for(let q=0,Q=W.length;q<Q;q++)E(W[q],b,q,L);else E(W,b,0,L)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function E(U,C,D,L){if(O(U,C,D,L)===!0){const b=U.__offset,P=U.value;if(Array.isArray(P)){let W=0;for(let q=0;q<P.length;q++){const Q=P[q],lt=S(Q);R(Q,U.__data,W),typeof Q!="number"&&typeof Q!="boolean"&&!Q.isMatrix3&&!ArrayBuffer.isView(Q)&&(W+=lt.storage/Float32Array.BYTES_PER_ELEMENT)}}else R(P,U.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,b,U.__data)}}function R(U,C,D){typeof U=="number"||typeof U=="boolean"?C[0]=U:U.isMatrix3?(C[0]=U.elements[0],C[1]=U.elements[1],C[2]=U.elements[2],C[3]=0,C[4]=U.elements[3],C[5]=U.elements[4],C[6]=U.elements[5],C[7]=0,C[8]=U.elements[6],C[9]=U.elements[7],C[10]=U.elements[8],C[11]=0):ArrayBuffer.isView(U)?C.set(new U.constructor(U.buffer,U.byteOffset,C.length)):U.toArray(C,D)}function O(U,C,D,L){const b=U.value,P=C+"_"+D;if(L[P]===void 0)return typeof b=="number"||typeof b=="boolean"?L[P]=b:ArrayBuffer.isView(b)?L[P]=b.slice():L[P]=b.clone(),!0;{const W=L[P];if(typeof b=="number"||typeof b=="boolean"){if(W!==b)return L[P]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(W.equals(b)===!1)return W.copy(b),!0}}return!1}function M(U){const C=U.uniforms;let D=0;const L=16;for(let P=0,W=C.length;P<W;P++){const q=Array.isArray(C[P])?C[P]:[C[P]];for(let Q=0,lt=q.length;Q<lt;Q++){const Y=q[Q],j=Array.isArray(Y.value)?Y.value:[Y.value];for(let I=0,F=j.length;I<F;I++){const ut=j[I],rt=S(ut),ht=D%L,w=ht%rt.boundary,J=ht+w;D+=w,J!==0&&L-J<rt.storage&&(D+=L-J),Y.__data=new Float32Array(rt.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=D,D+=rt.storage}}}const b=D%L;return b>0&&(D+=L-b),U.__size=D,U.__cache={},this}function S(U){const C={boundary:0,storage:0};return typeof U=="number"||typeof U=="boolean"?(C.boundary=4,C.storage=4):U.isVector2?(C.boundary=8,C.storage=8):U.isVector3||U.isColor?(C.boundary=16,C.storage=12):U.isVector4?(C.boundary=16,C.storage=16):U.isMatrix3?(C.boundary=48,C.storage=48):U.isMatrix4?(C.boundary=64,C.storage=64):U.isTexture?ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(U)?(C.boundary=16,C.storage=U.byteLength):ne("WebGLRenderer: Unsupported uniform value type.",U),C}function B(U){const C=U.target;C.removeEventListener("dispose",B);const D=h.indexOf(C.__bindingPointIndex);h.splice(D,1),s.deleteBuffer(l[C.id]),delete l[C.id],delete c[C.id]}function k(){for(const U in l)s.deleteBuffer(l[U]);h=[],l={},c={}}return{bind:m,update:d,dispose:k}}const iA=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Xi=null;function aA(){return Xi===null&&(Xi=new Qy(iA,16,16,Fr,Ii),Xi.name="DFG_LUT",Xi.minFilter=Tn,Xi.magFilter=Tn,Xi.wrapS=ba,Xi.wrapT=ba,Xi.generateMipmaps=!1,Xi.needsUpdate=!0),Xi}class rA{constructor(t={}){const{canvas:i=by(),context:r=null,depth:l=!0,stencil:c=!1,alpha:h=!1,antialias:p=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:d=!1,powerPreference:x="default",failIfMajorPerformanceCaveat:v=!1,reversedDepthBuffer:_=!1,outputBufferType:E=ci}=t;this.isWebGLRenderer=!0;let R;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");R=r.getContextAttributes().alpha}else R=h;const O=E,M=new Set([Gd,Hd,Fd]),S=new Set([ci,Ki,qo,Yo,Bd,zd]),B=new Uint32Array(4),k=new Int32Array(4),U=new nt;let C=null,D=null;const L=[],b=[];let P=null;this.domElement=i,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const W=this;let q=!1,Q=null,lt=null,Y=null,j=null;this._outputColorSpace=ui;let I=0,F=0,ut=null,rt=-1,ht=null;const w=new rn,J=new rn;let gt=null;const Et=new Oe(0);let Nt=0,Xt=i.width,it=i.height,_t=1,Tt=null,te=null;const Ht=new rn(0,0,Xt,it),le=new rn(0,0,Xt,it);let $e=!1;const ae=new mv;let Se=!1,Le=!1;const me=new gn,Xe=new nt,tn=new rn,Mn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function en(){return ut===null?_t:1}let X=r;function Ne(T,H){return i.getContext(T,H)}let De,N,y,K,st,dt,bt,wt,pt,mt,At,Gt,Ot,Ut,Qt,Jt,ee,V,Ct,St,Dt,Bt,Mt;try{const T={alpha:!0,depth:l,stencil:c,antialias:p,premultipliedAlpha:m,preserveDrawingBuffer:d,powerPreference:x,failIfMajorPerformanceCaveat:v};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Pd}`),i.addEventListener("webglcontextlost",Fe,!1),i.addEventListener("webglcontextrestored",be,!1),i.addEventListener("webglcontextcreationerror",Gn,!1),X===null){const H="webgl2";if(X=Ne(H,T),X===null)throw Ne(H)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Kt()}catch(T){throw i.removeEventListener("webglcontextlost",Fe,!1),i.removeEventListener("webglcontextrestored",be,!1),i.removeEventListener("webglcontextcreationerror",Gn,!1),Ce("WebGLRenderer: "+T.message),T}function Kt(){De=new aT(X),De.init(),Dt=new K1(X,De),N=new Zb(X,De,t,Dt),y=new Y1(X,De),N.reversedDepthBuffer&&_&&y.buffers.depth.setReversed(!0),lt=X.createFramebuffer(),Y=X.createFramebuffer(),j=X.createFramebuffer(),K=new oT(X),st=new N1,dt=new Z1(X,De,y,st,N,Dt,K),bt=new iT(W),wt=new uM(X),Bt=new qb(X,wt),pt=new rT(X,wt,K,Bt),mt=new uT(X,pt,wt,Bt,K),V=new lT(X,N,dt),Qt=new Kb(st),At=new L1(W,bt,De,N,Bt,Qt),Gt=new eA(W,st),Ot=new P1,Ut=new G1(De),ee=new Wb(W,bt,y,mt,R,m),Jt=new q1(W,mt,N),Mt=new nA(X,K,N,y),Ct=new Yb(X,De,K),St=new sT(X,De,K),K.programs=At.programs,W.capabilities=N,W.extensions=De,W.properties=st,W.renderLists=Ot,W.shadowMap=Jt,W.state=y,W.info=K}O!==ci&&(P=new fT(O,i.width,i.height,p,l,c));const Wt=new $1(W,X);this.xr=Wt,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){const T=De.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=De.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return _t},this.setPixelRatio=function(T){T!==void 0&&(_t=T,this.setSize(Xt,it,!1))},this.getSize=function(T){return T.set(Xt,it)},this.setSize=function(T,H,ct=!0){if(Wt.isPresenting){ne("WebGLRenderer: Can't change size while VR device is presenting.");return}Xt=T,it=H,i.width=Math.floor(T*_t),i.height=Math.floor(H*_t),ct===!0&&(i.style.width=T+"px",i.style.height=H+"px"),P!==null&&P.setSize(i.width,i.height),this.setViewport(0,0,T,H)},this.getDrawingBufferSize=function(T){return T.set(Xt*_t,it*_t).floor()},this.setDrawingBufferSize=function(T,H,ct){Xt=T,it=H,_t=ct,i.width=Math.floor(T*ct),i.height=Math.floor(H*ct),this.setViewport(0,0,T,H)},this.setEffects=function(T){if(O===ci){Ce("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let H=0;H<T.length;H++)if(T[H].isOutputPass===!0){ne("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(w)},this.getViewport=function(T){return T.copy(Ht)},this.setViewport=function(T,H,ct,$){T.isVector4?Ht.set(T.x,T.y,T.z,T.w):Ht.set(T,H,ct,$),y.viewport(w.copy(Ht).multiplyScalar(_t).round())},this.getScissor=function(T){return T.copy(le)},this.setScissor=function(T,H,ct,$){T.isVector4?le.set(T.x,T.y,T.z,T.w):le.set(T,H,ct,$),y.scissor(J.copy(le).multiplyScalar(_t).round())},this.getScissorTest=function(){return $e},this.setScissorTest=function(T){y.setScissorTest($e=T)},this.setOpaqueSort=function(T){Tt=T},this.setTransparentSort=function(T){te=T},this.getClearColor=function(T){return T.copy(ee.getClearColor())},this.setClearColor=function(){ee.setClearColor(...arguments)},this.getClearAlpha=function(){return ee.getClearAlpha()},this.setClearAlpha=function(){ee.setClearAlpha(...arguments)},this.clear=function(T=!0,H=!0,ct=!0){let $=0;if(T){let tt=!1;if(ut!==null){const Pt=ut.texture.format;tt=M.has(Pt)}if(tt){const Pt=ut.texture.type,Vt=S.has(Pt),Lt=ee.getClearColor(),zt=ee.getClearAlpha(),Ft=Lt.r,oe=Lt.g,pe=Lt.b;Vt?(B[0]=Ft,B[1]=oe,B[2]=pe,B[3]=zt,X.clearBufferuiv(X.COLOR,0,B)):(k[0]=Ft,k[1]=oe,k[2]=pe,k[3]=zt,X.clearBufferiv(X.COLOR,0,k))}else $|=X.COLOR_BUFFER_BIT}H&&($|=X.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ct&&($|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&X.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),Q=T},this.dispose=function(){i.removeEventListener("webglcontextlost",Fe,!1),i.removeEventListener("webglcontextrestored",be,!1),i.removeEventListener("webglcontextcreationerror",Gn,!1),ee.dispose(),Ot.dispose(),Ut.dispose(),st.dispose(),bt.dispose(),mt.dispose(),Bt.dispose(),Mt.dispose(),At.dispose(),Wt.dispose(),Wt.removeEventListener("sessionstart",ln),Wt.removeEventListener("sessionend",An),Vn.stop()};function Fe(T){T.preventDefault(),Y0("WebGLRenderer: Context Lost."),q=!0}function be(){Y0("WebGLRenderer: Context Restored."),q=!1;const T=K.autoReset,H=Jt.enabled,ct=Jt.autoUpdate,$=Jt.needsUpdate,tt=Jt.type;Kt(),K.autoReset=T,Jt.enabled=H,Jt.autoUpdate=ct,Jt.needsUpdate=$,Jt.type=tt}function Gn(T){Ce("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function jn(T){const H=T.target;H.removeEventListener("dispose",jn),Vs(H)}function Vs(T){ks(T),st.remove(T)}function ks(T){const H=st.get(T).programs;H!==void 0&&(H.forEach(function(ct){At.releaseProgram(ct)}),T.isShaderMaterial&&At.releaseShaderCache(T))}this.renderBufferDirect=function(T,H,ct,$,tt,Pt){H===null&&(H=Mn);const Vt=tt.isMesh&&tt.matrixWorld.determinantAffine()<0,Lt=Ua(T,H,ct,$,tt);y.setMaterial($,Vt);let zt=ct.index,Ft=1;if($.wireframe===!0){if(zt=pt.getWireframeAttribute(ct),zt===void 0)return;Ft=2}const oe=ct.drawRange,pe=ct.attributes.position;let qt=oe.start*Ft,Te=(oe.start+oe.count)*Ft;Pt!==null&&(qt=Math.max(qt,Pt.start*Ft),Te=Math.min(Te,(Pt.start+Pt.count)*Ft)),zt!==null?(qt=Math.max(qt,0),Te=Math.min(Te,zt.count)):pe!=null&&(qt=Math.max(qt,0),Te=Math.min(Te,pe.count));const Ze=Te-qt;if(Ze<0||Ze===1/0)return;Bt.setup(tt,$,Lt,ct,zt);let qe,fe=Ct;if(zt!==null&&(qe=wt.get(zt),fe=St,fe.setIndex(qe)),tt.isMesh)$.wireframe===!0?(y.setLineWidth($.wireframeLinewidth*en()),fe.setMode(X.LINES)):fe.setMode(X.TRIANGLES);else if(tt.isLine){let cn=$.linewidth;cn===void 0&&(cn=1),y.setLineWidth(cn*en()),tt.isLineSegments?fe.setMode(X.LINES):tt.isLineLoop?fe.setMode(X.LINE_LOOP):fe.setMode(X.LINE_STRIP)}else tt.isPoints?fe.setMode(X.POINTS):tt.isSprite&&fe.setMode(X.TRIANGLES);if(tt.isBatchedMesh)if(De.get("WEBGL_multi_draw"))fe.renderMultiDraw(tt._multiDrawStarts,tt._multiDrawCounts,tt._multiDrawCount);else{const cn=tt._multiDrawStarts,kt=tt._multiDrawCounts,_n=tt._multiDrawCount,he=zt?wt.get(zt).bytesPerElement:1,In=st.get($).currentProgram.getUniforms();for(let $n=0;$n<_n;$n++)In.setValue(X,"_gl_DrawID",$n),fe.render(cn[$n]/he,kt[$n])}else if(tt.isInstancedMesh)fe.renderInstances(qt,Ze,tt.count);else if(ct.isInstancedBufferGeometry){const cn=ct._maxInstanceCount!==void 0?ct._maxInstanceCount:1/0,kt=Math.min(ct.instanceCount,cn);fe.renderInstances(qt,Ze,kt)}else fe.render(qt,Ze)};function Xs(T,H,ct,$){Q!==null&&T.isNodeMaterial&&Q.setObject($,T),Se===!0&&Qt.setState(T,ct,!1),T.transparent===!0&&T.side===Ea&&T.forceSinglePass===!1?(T.side=Jn,T.needsUpdate=!0,wa(T,H,$),T.side=Br,T.needsUpdate=!0,wa(T,H,$),T.side=Ea):wa(T,H,$)}this.compile=function(T,H,ct=null){ct===null&&(ct=T),Q!==null&&Q.renderStart(T,H,ct),D=Ut.get(ct),D.init(H),b.push(D),ct.traverseVisible(function(tt){tt.isLight&&tt.layers.test(H.layers)&&(D.pushLight(tt),tt.castShadow&&D.pushShadow(tt))}),T!==ct&&T.traverseVisible(function(tt){tt.isLight&&tt.layers.test(H.layers)&&(D.pushLight(tt),tt.castShadow&&D.pushShadow(tt))}),D.setupLights(),Q!==null&&Q.updateLights(D.state.lightsArray),Le=this.localClippingEnabled,Se=Qt.init(this.clippingPlanes,Le),Se===!0&&Qt.setGlobalState(this.clippingPlanes,H),Q!==null&&Jt.render(D.state.shadowsArray,ct,H);const $=new Set;return T.traverse(function(tt){if(!(tt.isMesh||tt.isPoints||tt.isLine||tt.isSprite))return;const Pt=tt.material;if(Pt)if(Array.isArray(Pt))for(let Vt=0;Vt<Pt.length;Vt++){const Lt=Pt[Vt];Xs(Lt,ct,H,tt),$.add(Lt)}else Xs(Pt,ct,H,tt),$.add(Pt)}),D=b.pop(),Q!==null&&Q.renderEnd(),$},this.compileAsync=function(T,H,ct=null){const $=this.compile(T,H,ct);return new Promise(tt=>{function Pt(){if($.forEach(function(Vt){const zt=st.get(Vt).currentProgram;(zt===void 0||zt.isReady())&&$.delete(Vt)}),$.size===0){tt(T);return}setTimeout(Pt,10)}De.get("KHR_parallel_shader_compile")!==null?Pt():setTimeout(Pt,10)})};let Gr=null;function Bi(T){Gr&&Gr(T)}function ln(){Vn.stop()}function An(){Vn.start()}const Vn=new yv;Vn.setAnimationLoop(Bi),typeof self<"u"&&Vn.setContext(self),this.setAnimationLoop=function(T){Gr=T,Wt.setAnimationLoop(T),T===null?Vn.stop():Vn.start()},Wt.addEventListener("sessionstart",ln),Wt.addEventListener("sessionend",An),this.render=function(T,H){if(H!==void 0&&H.isCamera!==!0){Ce("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(q===!0)return;Q!==null&&Q.renderStart(T,H);const ct=Wt.enabled===!0&&Wt.isPresenting===!0,$=P!==null&&(ut===null||ct)&&P.begin(W,ut);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),Wt.enabled===!0&&Wt.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(Wt.cameraAutoUpdate===!0&&Wt.updateCamera(H),H=Wt.getCamera()),T.isScene===!0&&T.onBeforeRender(W,T,H,ut),D=Ut.get(T,b.length),D.init(H),D.state.textureUnits=dt.getTextureUnits(),b.push(D),me.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),ae.setFromProjectionMatrix(me,Yi,H.reversedDepth),Le=this.localClippingEnabled,Se=Qt.init(this.clippingPlanes,Le),C=Ot.get(T,L.length),C.init(),L.push(C),Wt.enabled===!0&&Wt.isPresenting===!0){const Vt=W.xr.getDepthSensingMesh();Vt!==null&&cr(Vt,H,-1/0,W.sortObjects)}cr(T,H,0,W.sortObjects),C.finish(),Q!==null&&Q.updateLights(D.state.lightsArray),W.sortObjects===!0&&C.sort(Tt,te),We=Wt.enabled===!1||Wt.isPresenting===!1||Wt.hasDepthSensing()===!1,We&&ee.addToRenderList(C,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Se===!0&&Qt.beginShadows();const tt=D.state.shadowsArray;if(Jt.render(tt,T,H),Se===!0&&Qt.endShadows(),($&&P.hasRenderPass())===!1){const Vt=C.opaque,Lt=C.transmissive;if(D.setupLights(),H.isArrayCamera){const zt=H.cameras;if(Lt.length>0)for(let Ft=0,oe=zt.length;Ft<oe;Ft++){const pe=zt[Ft];tl(Vt,Lt,T,pe)}We&&ee.render(T);for(let Ft=0,oe=zt.length;Ft<oe;Ft++){const pe=zt[Ft];$o(C,T,pe,pe.viewport)}}else Lt.length>0&&tl(Vt,Lt,T,H),We&&ee.render(T),$o(C,T,H)}ut!==null&&F===0&&(dt.updateMultisampleRenderTarget(ut),dt.updateRenderTargetMipmap(ut)),$&&P.end(W),T.isScene===!0&&T.onAfterRender(W,T,H),Bt.resetDefaultState(),rt=-1,ht=null,b.pop(),b.length>0?(D=b[b.length-1],dt.setTextureUnits(D.state.textureUnits),Se===!0&&Qt.setGlobalState(W.clippingPlanes,D.state.camera)):D=null,L.pop(),L.length>0?C=L[L.length-1]:C=null,Q!==null&&Q.renderEnd()};function cr(T,H,ct,$){if(T.visible===!1)return;if(T.layers.test(H.layers)){if(T.isGroup)ct=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(H);else if(T.isLightProbeGrid)D.pushLightProbeGrid(T);else if(T.isLight)D.pushLight(T),T.castShadow&&D.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(ae)){$&&tn.setFromMatrixPosition(T.matrixWorld).applyMatrix4(me);const Vt=mt.update(T),Lt=T.material;Lt.visible&&C.push(T,Vt,Lt,ct,tn.z,null,H)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(ae))){const Vt=mt.update(T),Lt=T.material;if($&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),tn.copy(T.boundingSphere.center)):(Vt.boundingSphere===null&&Vt.computeBoundingSphere(),tn.copy(Vt.boundingSphere.center)),tn.applyMatrix4(T.matrixWorld).applyMatrix4(me)),Array.isArray(Lt)){const zt=Vt.groups;for(let Ft=0,oe=zt.length;Ft<oe;Ft++){const pe=zt[Ft],qt=Lt[pe.materialIndex];qt&&qt.visible&&C.push(T,Vt,qt,ct,tn.z,pe,H)}}else Lt.visible&&C.push(T,Vt,Lt,ct,tn.z,null,H)}}const Pt=T.children;for(let Vt=0,Lt=Pt.length;Vt<Lt;Vt++)cr(Pt[Vt],H,ct,$)}function $o(T,H,ct,$){const{opaque:tt,transmissive:Pt,transparent:Vt}=T;D.setupLightsView(ct),Se===!0&&Qt.setGlobalState(W.clippingPlanes,ct),$&&y.viewport(w.copy($)),tt.length>0&&fr(tt,H,ct),Pt.length>0&&fr(Pt,H,ct),Vt.length>0&&fr(Vt,H,ct),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function tl(T,H,ct,$){if((ct.isScene===!0?ct.overrideMaterial:null)!==null)return;if(D.state.transmissionRenderTarget[$.id]===void 0){const qt=De.has("EXT_color_buffer_half_float")||De.has("EXT_color_buffer_float");D.state.transmissionRenderTarget[$.id]=new Ti(1,1,{generateMipmaps:!0,type:qt?Ii:ci,minFilter:Pr,samples:Math.max(4,N.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ee.workingColorSpace})}const Pt=D.state.transmissionRenderTarget[$.id],Vt=$.viewport||w;Pt.setSize(Vt.z*W.transmissionResolutionScale,Vt.w*W.transmissionResolutionScale);const Lt=W.getRenderTarget(),zt=W.getActiveCubeFace(),Ft=W.getActiveMipmapLevel();W.setRenderTarget(Pt),W.getClearColor(Et),Nt=W.getClearAlpha(),Nt<1&&W.setClearColor(16777215,.5),W.clear(),We&&ee.render(ct);const oe=W.toneMapping;W.toneMapping=Pi;const pe=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),D.setupLightsView($),Se===!0&&Qt.setGlobalState(W.clippingPlanes,$),fr(T,ct,$),dt.updateMultisampleRenderTarget(Pt),dt.updateRenderTargetMipmap(Pt),De.has("WEBGL_multisampled_render_to_texture")===!1){let qt=!1;for(let Te=0,Ze=H.length;Te<Ze;Te++){const qe=H[Te],{object:fe,geometry:cn,material:kt,group:_n}=qe;if(kt.side===Ea&&fe.layers.test($.layers)){const he=kt.side;kt.side=Jn,kt.needsUpdate=!0,Da(fe,ct,$,cn,kt,_n),kt.side=he,kt.needsUpdate=!0,qt=!0}}qt===!0&&(dt.updateMultisampleRenderTarget(Pt),dt.updateRenderTargetMipmap(Pt))}W.setRenderTarget(Lt,zt,Ft),W.setClearColor(Et,Nt),pe!==void 0&&($.viewport=pe),W.toneMapping=oe}function fr(T,H,ct){const $=H.isScene===!0?H.overrideMaterial:null;for(let tt=0,Pt=T.length;tt<Pt;tt++){const Vt=T[tt],{object:Lt,geometry:zt,group:Ft}=Vt;let oe=Vt.material;oe.allowOverride===!0&&$!==null&&(oe=$),Lt.layers.test(ct.layers)&&Da(Lt,H,ct,zt,oe,Ft)}}function Da(T,H,ct,$,tt,Pt){Q!==null&&tt.isNodeMaterial&&Q.setObject(T,tt),T.onBeforeRender(W,H,ct,$,tt,Pt),T.modelViewMatrix.multiplyMatrices(ct.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),tt.onBeforeRender(W,H,ct,$,T,Pt),tt.transparent===!0&&tt.side===Ea&&tt.forceSinglePass===!1?(tt.side=Jn,tt.needsUpdate=!0,W.renderBufferDirect(ct,H,$,tt,T,Pt),tt.side=Br,tt.needsUpdate=!0,W.renderBufferDirect(ct,H,$,tt,T,Pt),tt.side=Ea):W.renderBufferDirect(ct,H,$,tt,T,Pt),T.onAfterRender(W,H,ct,$,tt,Pt)}function wa(T,H,ct){H.isScene!==!0&&(H=Mn);const $=st.get(T),tt=D.state.lights,Pt=D.state.shadowsArray,Vt=tt.state.version,Lt=At.getParameters(T,tt.state,Pt,H,ct,D.state.lightProbeGridArray),zt=At.getProgramCacheKey(Lt);let Ft=$.programs;$.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?H.environment:null,$.fog=H.fog;const oe=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;$.envMap=bt.get(T.envMap||$.environment,oe),$.envMapRotation=$.environment!==null&&T.envMap===null?H.environmentRotation:T.envMapRotation,Ft===void 0&&(T.addEventListener("dispose",jn),Ft=new Map,$.programs=Ft);let pe=Ft.get(zt);if(pe!==void 0){if($.currentProgram===pe&&$.lightsStateVersion===Vt)return ta(T,Lt),pe}else Lt.uniforms=At.getUniforms(T),Q!==null&&T.isNodeMaterial&&Q.build(T,ct,Lt),T.onBeforeCompile(Lt,W),pe=At.acquireProgram(Lt,zt),Ft.set(zt,pe),$.uniforms=Lt.uniforms;const qt=$.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(qt.clippingPlanes=Qt.uniform),ta(T,Lt),$.needsLights=el(T),$.lightsStateVersion=Vt,$.needsLights&&(qt.ambientLightColor.value=tt.state.ambient,qt.lightProbe.value=tt.state.probe,qt.sunLights.value=tt.state.sun,qt.sunLightShadows.value=tt.state.sunShadow,qt.directionalLights.value=tt.state.directional,qt.directionalLightShadows.value=tt.state.directionalShadow,qt.spotLights.value=tt.state.spot,qt.spotLightShadows.value=tt.state.spotShadow,qt.rectAreaLights.value=tt.state.rectArea,qt.ltc_1.value=tt.state.rectAreaLTC1,qt.ltc_2.value=tt.state.rectAreaLTC2,qt.pointLights.value=tt.state.point,qt.pointLightShadows.value=tt.state.pointShadow,qt.hemisphereLights.value=tt.state.hemi,qt.sunShadowMatrix.value=tt.state.sunShadowMatrix,qt.sunShadowCascade.value=tt.state.sunShadowCascade,qt.directionalShadowMatrix.value=tt.state.directionalShadowMatrix,qt.spotLightMatrix.value=tt.state.spotLightMatrix,qt.spotLightMap.value=tt.state.spotLightMap,qt.pointShadowMatrix.value=tt.state.pointShadowMatrix),$.lightProbeGrid=D.state.lightProbeGridArray.length>0,$.currentProgram=pe,$.uniformsList=null,pe}function $i(T){if(T.uniformsList===null){const H=T.currentProgram.getUniforms();T.uniformsList=Gu.seqWithValue(H.seq,T.uniforms)}return T.uniformsList}function ta(T,H){const ct=st.get(T);ct.outputColorSpace=H.outputColorSpace,ct.batching=H.batching,ct.batchingColor=H.batchingColor,ct.instancing=H.instancing,ct.instancingColor=H.instancingColor,ct.instancingMorph=H.instancingMorph,ct.skinning=H.skinning,ct.morphTargets=H.morphTargets,ct.morphNormals=H.morphNormals,ct.morphColors=H.morphColors,ct.morphTargetsCount=H.morphTargetsCount,ct.numClippingPlanes=H.numClippingPlanes,ct.numIntersection=H.numClipIntersection,ct.vertexAlphas=H.vertexAlphas,ct.vertexTangents=H.vertexTangents,ct.toneMapping=H.toneMapping}function hr(T,H){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;U.setFromMatrixPosition(H.matrixWorld);for(let ct=0,$=T.length;ct<$;ct++){const tt=T[ct];if(tt.texture!==null&&tt.boundingBox.containsPoint(U))return tt}return null}function Ua(T,H,ct,$,tt){H.isScene!==!0&&(H=Mn),dt.resetTextureUnits();const Pt=H.fog,Vt=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?H.environment:null,Lt=ut===null?W.outputColorSpace:ut.isXRRenderTarget===!0?ut.texture.colorSpace:Ee.workingColorSpace,zt=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,Ft=bt.get($.envMap||Vt,zt),oe=$.vertexColors===!0&&!!ct.attributes.color&&ct.attributes.color.itemSize===4,pe=!!ct.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),qt=!!ct.morphAttributes.position,Te=!!ct.morphAttributes.normal,Ze=!!ct.morphAttributes.color;let qe=Pi;$.toneMapped&&(ut===null||ut.isXRRenderTarget===!0)&&(qe=W.toneMapping);const fe=ct.morphAttributes.position||ct.morphAttributes.normal||ct.morphAttributes.color,cn=fe!==void 0?fe.length:0,kt=st.get($),_n=D.state.lights;if(Se===!0&&(Le===!0||T!==ht)){const He=T===ht&&$.id===rt;Qt.setState($,T,He)}let he=!1;$.version===kt.__version?(kt.needsLights&&kt.lightsStateVersion!==_n.state.version||kt.outputColorSpace!==Lt||tt.isBatchedMesh&&kt.batching===!1||!tt.isBatchedMesh&&kt.batching===!0||tt.isBatchedMesh&&kt.batchingColor===!0&&tt._colorsTexture===null||tt.isBatchedMesh&&kt.batchingColor===!1&&tt._colorsTexture!==null||tt.isInstancedMesh&&kt.instancing===!1||!tt.isInstancedMesh&&kt.instancing===!0||tt.isSkinnedMesh&&kt.skinning===!1||!tt.isSkinnedMesh&&kt.skinning===!0||tt.isInstancedMesh&&kt.instancingColor===!0&&tt.instanceColor===null||tt.isInstancedMesh&&kt.instancingColor===!1&&tt.instanceColor!==null||tt.isInstancedMesh&&kt.instancingMorph===!0&&tt.morphTexture===null||tt.isInstancedMesh&&kt.instancingMorph===!1&&tt.morphTexture!==null||kt.envMap!==Ft||$.fog===!0&&kt.fog!==Pt||kt.numClippingPlanes!==void 0&&(kt.numClippingPlanes!==Qt.numPlanes||kt.numIntersection!==Qt.numIntersection)||kt.vertexAlphas!==oe||kt.vertexTangents!==pe||kt.morphTargets!==qt||kt.morphNormals!==Te||kt.morphColors!==Ze||kt.toneMapping!==qe||kt.morphTargetsCount!==cn||!!kt.lightProbeGrid!=D.state.lightProbeGridArray.length>0)&&(he=!0):(he=!0,kt.__version=$.version);let In=kt.currentProgram;he===!0&&(In=wa($,H,tt),Q&&$.isNodeMaterial&&Q.onUpdateProgram($,In,kt));let $n=!1,Bn=!1,La=!1;const we=In.getUniforms(),Je=kt.uniforms;if(y.useProgram(In.program)&&($n=!0,Bn=!0,La=!0),$.id!==rt&&(rt=$.id,Bn=!0),kt.needsLights){const He=hr(D.state.lightProbeGridArray,tt);kt.lightProbeGrid!==He&&(kt.lightProbeGrid=He,Bn=!0)}if($n||ht!==T){y.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),we.setValue(X,"projectionMatrix",T.projectionMatrix),we.setValue(X,"viewMatrix",T.matrixWorldInverse);const zi=we.map.cameraPosition;zi!==void 0&&zi.setValue(X,Xe.setFromMatrixPosition(T.matrixWorld)),N.logarithmicDepthBuffer&&we.setValue(X,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&we.setValue(X,"isOrthographic",T.isOrthographicCamera===!0),ht!==T&&(ht=T,Bn=!0,La=!0)}if(kt.needsLights&&(_n.state.sunShadowMap.length>0&&we.setValue(X,"sunShadowMap",_n.state.sunShadowMap,dt),_n.state.directionalShadowMap.length>0&&we.setValue(X,"directionalShadowMap",_n.state.directionalShadowMap,dt),_n.state.spotShadowMap.length>0&&we.setValue(X,"spotShadowMap",_n.state.spotShadowMap,dt),_n.state.pointShadowMap.length>0&&we.setValue(X,"pointShadowMap",_n.state.pointShadowMap,dt)),tt.isSkinnedMesh){we.setOptional(X,tt,"bindMatrix"),we.setOptional(X,tt,"bindMatrixInverse");const He=tt.skeleton;He&&(He.boneTexture===null&&He.computeBoneTexture(),we.setValue(X,"boneTexture",He.boneTexture,dt))}tt.isBatchedMesh&&(we.setOptional(X,tt,"batchingTexture"),we.setValue(X,"batchingTexture",tt._matricesTexture,dt),we.setOptional(X,tt,"batchingIdTexture"),we.setValue(X,"batchingIdTexture",tt._indirectTexture,dt),we.setOptional(X,tt,"batchingColorTexture"),tt._colorsTexture!==null&&we.setValue(X,"batchingColorTexture",tt._colorsTexture,dt));const hi=ct.morphAttributes;if((hi.position!==void 0||hi.normal!==void 0||hi.color!==void 0)&&V.update(tt,ct,In),(Bn||kt.receiveShadow!==tt.receiveShadow)&&(kt.receiveShadow=tt.receiveShadow,we.setValue(X,"receiveShadow",tt.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&H.environment!==null&&(Je.envMapIntensity.value=H.environmentIntensity),Je.dfgLUT!==void 0&&(Je.dfgLUT.value=aA()),Bn){if(we.setValue(X,"toneMappingExposure",W.toneMappingExposure),kt.needsLights&&un(Je,La),Pt&&$.fog===!0&&Gt.refreshFogUniforms(Je,Pt),Gt.refreshMaterialUniforms(Je,$,_t,it,D.state.transmissionRenderTarget[T.id]),kt.needsLights&&kt.lightProbeGrid){const He=kt.lightProbeGrid;Je.probesSH.value=He.texture,Je.probesMin.value.copy(He.boundingBox.min),Je.probesMax.value.copy(He.boundingBox.max),Je.probesResolution.value.copy(He.resolution)}Gu.upload(X,$i(kt),Je,dt)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Gu.upload(X,$i(kt),Je,dt),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&we.setValue(X,"center",tt.center),we.setValue(X,"modelViewMatrix",tt.modelViewMatrix),we.setValue(X,"normalMatrix",tt.normalMatrix),we.setValue(X,"modelMatrix",tt.matrixWorld),$.uniformsGroups!==void 0){const He=$.uniformsGroups;for(let zi=0,Ai=He.length;zi<Ai;zi++){const di=He[zi];Mt.update(di,In),Mt.bind(di,In)}}return In}function un(T,H){T.ambientLightColor.needsUpdate=H,T.lightProbe.needsUpdate=H,T.sunLights.needsUpdate=H,T.sunLightShadows.needsUpdate=H,T.directionalLights.needsUpdate=H,T.directionalLightShadows.needsUpdate=H,T.pointLights.needsUpdate=H,T.pointLightShadows.needsUpdate=H,T.spotLights.needsUpdate=H,T.spotLightShadows.needsUpdate=H,T.rectAreaLights.needsUpdate=H,T.hemisphereLights.needsUpdate=H}function el(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return ut},this.setRenderTargetTextures=function(T,H,ct){const $=st.get(T);$.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),st.get(T.texture).__webglTexture=H,st.get(T.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:ct,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,H){const ct=st.get(T);ct.__webglFramebuffer=H,ct.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(T,H=0,ct=0){ut=T,I=H,F=ct;let $=null,tt=!1,Pt=!1;if(T){const Lt=st.get(T);if(Lt.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(X.FRAMEBUFFER,Lt.__webglFramebuffer),w.copy(T.viewport),J.copy(T.scissor),gt=T.scissorTest,y.viewport(w),y.scissor(J),y.setScissorTest(gt),rt=-1;return}else if(Lt.__webglFramebuffer===void 0)dt.setupRenderTarget(T);else if(Lt.__hasExternalTextures)dt.rebindTextures(T,st.get(T.texture).__webglTexture,st.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const oe=T.depthTexture;if(Lt.__boundDepthTexture!==oe){if(oe!==null&&st.has(oe)&&(T.width!==oe.image.width||T.height!==oe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");dt.setupDepthRenderbuffer(T)}}const zt=T.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(Pt=!0);const Ft=st.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ft[H])?$=Ft[H][ct]:$=Ft[H],tt=!0):T.samples>0&&dt.useMultisampledRTT(T)===!1?$=st.get(T).__webglMultisampledFramebuffer:Array.isArray(Ft)?$=Ft[ct]:$=Ft,w.copy(T.viewport),J.copy(T.scissor),gt=T.scissorTest}else w.copy(Ht).multiplyScalar(_t).floor(),J.copy(le).multiplyScalar(_t).floor(),gt=$e;if(ct!==0&&($=lt),y.bindFramebuffer(X.FRAMEBUFFER,$)&&y.drawBuffers(T,$),y.viewport(w),y.scissor(J),y.setScissorTest(gt),tt){const Lt=st.get(T.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+H,Lt.__webglTexture,ct)}else if(Pt){const Lt=H;for(let zt=0;zt<T.textures.length;zt++){const Ft=st.get(T.textures[zt]);X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0+zt,Ft.__webglTexture,ct,Lt)}}else if(T!==null&&ct!==0){const Lt=st.get(T.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,Lt.__webglTexture,ct)}rt=-1};function Ws(T){const H=st.get(T);return(H.__readFormat!==T.format||H.__readType!==T.type)&&(H.__readFormat=T.format,H.__readType=T.type,H.__formatReadable=N.textureFormatReadable(T.format),H.__typeReadable=N.textureTypeReadable(T.type)),H}this.readRenderTargetPixels=function(T,H,ct,$,tt,Pt,Vt,Lt=0){if(!(T&&T.isWebGLRenderTarget)){Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let zt=st.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Vt!==void 0&&(zt=zt[Vt]),zt){y.bindFramebuffer(X.FRAMEBUFFER,zt);try{const Ft=T.textures[Lt],oe=Ft.format,pe=Ft.type;T.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+Lt);const qt=Ws(Ft);if(qt.__formatReadable===!1){Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(qt.__typeReadable===!1){Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=T.width-$&&ct>=0&&ct<=T.height-tt&&X.readPixels(H,ct,$,tt,Dt.convert(oe),Dt.convert(pe),Pt)}finally{const Ft=ut!==null?st.get(ut).__webglFramebuffer:null;y.bindFramebuffer(X.FRAMEBUFFER,Ft)}}},this.readRenderTargetPixelsAsync=async function(T,H,ct,$,tt,Pt,Vt,Lt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let zt=st.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Vt!==void 0&&(zt=zt[Vt]),zt)if(H>=0&&H<=T.width-$&&ct>=0&&ct<=T.height-tt){y.bindFramebuffer(X.FRAMEBUFFER,zt);const Ft=T.textures[Lt],oe=Ft.format,pe=Ft.type;T.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+Lt);const qt=Ws(Ft);if(qt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(qt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=X.createBuffer();X.bindBuffer(X.PIXEL_PACK_BUFFER,Te),X.bufferData(X.PIXEL_PACK_BUFFER,Pt.byteLength,X.STREAM_READ),X.readPixels(H,ct,$,tt,Dt.convert(oe),Dt.convert(pe),0),X.bindBuffer(X.PIXEL_PACK_BUFFER,null);const Ze=ut!==null?st.get(ut).__webglFramebuffer:null;y.bindFramebuffer(X.FRAMEBUFFER,Ze);const qe=X.fenceSync(X.SYNC_GPU_COMMANDS_COMPLETE,0);return X.flush(),await Ty(X,qe,4),X.bindBuffer(X.PIXEL_PACK_BUFFER,Te),X.getBufferSubData(X.PIXEL_PACK_BUFFER,0,Pt),X.bindBuffer(X.PIXEL_PACK_BUFFER,null),X.deleteBuffer(Te),X.deleteSync(qe),Pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,H=null,ct=0){const $=Math.pow(2,-ct),tt=Math.floor(T.image.width*$),Pt=Math.floor(T.image.height*$),Vt=H!==null?H.x:0,Lt=H!==null?H.y:0;dt.setTexture2D(T,0),X.copyTexSubImage2D(X.TEXTURE_2D,ct,0,0,Vt,Lt,tt,Pt),y.unbindTexture()},this.copyTextureToTexture=function(T,H,ct=null,$=null,tt=0,Pt=0){let Vt,Lt,zt,Ft,oe,pe,qt,Te,Ze;const qe=T.isCompressedTexture?T.mipmaps[Pt]:T.image;if(ct!==null)Vt=ct.max.x-ct.min.x,Lt=ct.max.y-ct.min.y,zt=ct.isBox3?ct.max.z-ct.min.z:1,Ft=ct.min.x,oe=ct.min.y,pe=ct.isBox3?ct.min.z:0;else{const Je=Math.pow(2,-tt);Vt=Math.floor(qe.width*Je),Lt=Math.floor(qe.height*Je),T.isDataArrayTexture?zt=qe.depth:T.isData3DTexture?zt=Math.floor(qe.depth*Je):zt=1,Ft=0,oe=0,pe=0}$!==null?(qt=$.x,Te=$.y,Ze=$.z):(qt=0,Te=0,Ze=0);const fe=Dt.convert(H.format),cn=Dt.convert(H.type);let kt;H.isData3DTexture?(dt.setTexture3D(H,0),kt=X.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(dt.setTexture2DArray(H,0),kt=X.TEXTURE_2D_ARRAY):(dt.setTexture2D(H,0),kt=X.TEXTURE_2D),y.activeTexture(X.TEXTURE0),y.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,H.flipY),y.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),y.pixelStorei(X.UNPACK_ALIGNMENT,H.unpackAlignment);const _n=y.getParameter(X.UNPACK_ROW_LENGTH),he=y.getParameter(X.UNPACK_IMAGE_HEIGHT),In=y.getParameter(X.UNPACK_SKIP_PIXELS),$n=y.getParameter(X.UNPACK_SKIP_ROWS),Bn=y.getParameter(X.UNPACK_SKIP_IMAGES);y.pixelStorei(X.UNPACK_ROW_LENGTH,qe.width),y.pixelStorei(X.UNPACK_IMAGE_HEIGHT,qe.height),y.pixelStorei(X.UNPACK_SKIP_PIXELS,Ft),y.pixelStorei(X.UNPACK_SKIP_ROWS,oe),y.pixelStorei(X.UNPACK_SKIP_IMAGES,pe);const La=T.isDataArrayTexture||T.isData3DTexture,we=H.isDataArrayTexture||H.isData3DTexture;if(T.isDepthTexture){const Je=st.get(T),hi=st.get(H),He=st.get(Je.__renderTarget),zi=st.get(hi.__renderTarget);y.bindFramebuffer(X.READ_FRAMEBUFFER,He.__webglFramebuffer),y.bindFramebuffer(X.DRAW_FRAMEBUFFER,zi.__webglFramebuffer);for(let Ai=0;Ai<zt;Ai++)La&&(X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,st.get(T).__webglTexture,tt,pe+Ai),X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,st.get(H).__webglTexture,Pt,Ze+Ai)),X.blitFramebuffer(Ft,oe,Vt,Lt,qt,Te,Vt,Lt,X.DEPTH_BUFFER_BIT,X.NEAREST);y.bindFramebuffer(X.READ_FRAMEBUFFER,null),y.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else if(tt!==0||T.isRenderTargetTexture||st.has(T)){const Je=st.get(T),hi=st.get(H);y.bindFramebuffer(X.READ_FRAMEBUFFER,Y),y.bindFramebuffer(X.DRAW_FRAMEBUFFER,j);for(let He=0;He<zt;He++)La?X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Je.__webglTexture,tt,pe+He):X.framebufferTexture2D(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,Je.__webglTexture,tt),we?X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,hi.__webglTexture,Pt,Ze+He):X.framebufferTexture2D(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,hi.__webglTexture,Pt),tt!==0?X.blitFramebuffer(Ft,oe,Vt,Lt,qt,Te,Vt,Lt,X.COLOR_BUFFER_BIT,X.NEAREST):we?X.copyTexSubImage3D(kt,Pt,qt,Te,Ze+He,Ft,oe,Vt,Lt):X.copyTexSubImage2D(kt,Pt,qt,Te,Ft,oe,Vt,Lt);y.bindFramebuffer(X.READ_FRAMEBUFFER,null),y.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else we?T.isDataTexture||T.isData3DTexture?X.texSubImage3D(kt,Pt,qt,Te,Ze,Vt,Lt,zt,fe,cn,qe.data):H.isCompressedArrayTexture?X.compressedTexSubImage3D(kt,Pt,qt,Te,Ze,Vt,Lt,zt,fe,qe.data):X.texSubImage3D(kt,Pt,qt,Te,Ze,Vt,Lt,zt,fe,cn,qe):T.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,Pt,qt,Te,Vt,Lt,fe,cn,qe.data):T.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,Pt,qt,Te,qe.width,qe.height,fe,qe.data):X.texSubImage2D(X.TEXTURE_2D,Pt,qt,Te,Vt,Lt,fe,cn,qe);y.pixelStorei(X.UNPACK_ROW_LENGTH,_n),y.pixelStorei(X.UNPACK_IMAGE_HEIGHT,he),y.pixelStorei(X.UNPACK_SKIP_PIXELS,In),y.pixelStorei(X.UNPACK_SKIP_ROWS,$n),y.pixelStorei(X.UNPACK_SKIP_IMAGES,Bn),Pt===0&&H.generateMipmaps&&X.generateMipmap(kt),y.unbindTexture()},this.initRenderTarget=function(T){st.get(T).__webglFramebuffer===void 0&&dt.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?dt.setTextureCube(T,0):T.isData3DTexture?dt.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?dt.setTexture2DArray(T,0):dt.setTexture2D(T,0),y.unbindTexture()},this.resetState=function(){I=0,F=0,ut=null,y.reset(),Bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorSpace=Ee._getDrawingBufferColorSpace(t),i.unpackColorSpace=Ee._getUnpackColorSpace()}}const I_={type:"change"},Yd={type:"start"},Dv={type:"end"},Nu=new dv,B_=new Ma,sA=Math.cos(70*Cy.DEG2RAD),Sn=new nt,Qn=2*Math.PI,ze={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Hh=1e-6;class oA extends oM{constructor(t,i=null){super(t,i),this.state=ze.NONE,this.target=new nt,this.cursor=new nt,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Is.ROTATE,MIDDLE:Is.DOLLY,RIGHT:Is.PAN},this.touches={ONE:Os.ROTATE,TWO:Os.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new nt,this._lastQuaternion=new lr,this._lastTargetPosition=new nt,this._quat=new lr().setFromUnitVectors(t.up,new nt(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new f_,this._sphericalDelta=new f_,this._scale=1,this._panOffset=new nt,this._rotateStart=new ie,this._rotateEnd=new ie,this._rotateDelta=new ie,this._panStart=new ie,this._panEnd=new ie,this._panDelta=new ie,this._dollyStart=new ie,this._dollyEnd=new ie,this._dollyDelta=new ie,this._dollyDirection=new nt,this._mouse=new ie,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=uA.bind(this),this._onPointerDown=lA.bind(this),this._onPointerUp=cA.bind(this),this._onContextMenu=_A.bind(this),this._onMouseWheel=dA.bind(this),this._onKeyDown=pA.bind(this),this._onTouchStart=mA.bind(this),this._onTouchMove=gA.bind(this),this._onMouseDown=fA.bind(this),this._onMouseMove=hA.bind(this),this._interceptControlDown=vA.bind(this),this._interceptControlUp=SA.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=ze.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();const t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(I_),this.update(),this.state=ze.NONE}pan(t,i){this._pan(t,i),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const i=this.object.position;Sn.copy(i).sub(this.target),Sn.applyQuaternion(this._quat),this._spherical.setFromVector3(Sn),this.autoRotate&&this.state===ze.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(r)&&isFinite(l)&&(r<-Math.PI?r+=Qn:r>Math.PI&&(r-=Qn),l<-Math.PI?l+=Qn:l>Math.PI&&(l-=Qn),r<=l?this._spherical.theta=Math.max(r,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(r+l)/2?Math.max(r,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=h!=this._spherical.radius}if(Sn.setFromSpherical(this._spherical),Sn.applyQuaternion(this._quatInverse),i.copy(this.target).add(Sn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const p=Sn.length();h=this._clampDistance(p*this._scale);const m=p-h;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const p=new nt(this._mouse.x,this._mouse.y,0);p.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const d=new nt(this._mouse.x,this._mouse.y,0);d.unproject(this.object),this.object.position.sub(d).add(p),this.object.updateMatrixWorld(),h=Sn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(Nu.origin.copy(this.object.position),Nu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Nu.direction))<sA?this.object.lookAt(this.target):(B_.setFromNormalAndCoplanarPoint(this.object.up,this.target),Nu.intersectPlane(B_,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>Hh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Hh||this._lastTargetPosition.distanceToSquared(this.target)>Hh?(this.dispatchEvent(I_),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Qn/60*this.autoRotateSpeed*t:Qn/60/60*this.autoRotateSpeed}_getZoomScale(t){const i=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,i){Sn.setFromMatrixColumn(i,0),Sn.multiplyScalar(-t),this._panOffset.add(Sn)}_panUp(t,i){this.screenSpacePanning===!0?Sn.setFromMatrixColumn(i,1):(Sn.setFromMatrixColumn(i,0),Sn.crossVectors(this.object.up,Sn)),Sn.multiplyScalar(t),this._panOffset.add(Sn)}_pan(t,i){const r=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;Sn.copy(l).sub(this.target);let c=Sn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*c/r.clientHeight,this.object.matrix),this._panUp(2*i*c/r.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/r.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/r.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const r=this.domElement.getBoundingClientRect(),l=t-r.left,c=i-r.top,h=r.width,p=r.height;this._mouse.x=l/h*2-1,this._mouse.y=-(c/p)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Qn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Qn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let i=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._rotateStart.set(r,l)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panStart.set(r,l)}}_handleTouchStartDolly(t){const i=this._getSecondPointerPosition(t),r=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(r*r+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const r=this._getSecondPointerPosition(t),l=.5*(t.pageX+r.x),c=.5*(t.pageY+r.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Qn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Qn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panEnd.set(r,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const i=this._getSecondPointerPosition(t),r=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(r*r+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(t.pageX+i.x)*.5,p=(t.pageY+i.y)*.5;this._updateZoomParameters(h,p)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(t){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId)return!0;return!1}_trackPointer(t){let i=this._pointerPositions[t.pointerId];i===void 0&&(i=new ie,this._pointerPositions[t.pointerId]=i),i.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const i=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(t){const i=t.deltaMode,r={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(i){case 1:r.deltaY*=16;break;case 2:r.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(r.deltaY*=10),r}}function lA(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function uA(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function cA(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Dv),this.state=ze.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],i=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:i.x,pageY:i.y});break}}function fA(s){let t;switch(s.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Is.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=ze.DOLLY;break;case Is.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=ze.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=ze.ROTATE}break;case Is.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=ze.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=ze.PAN}break;default:this.state=ze.NONE}this.state!==ze.NONE&&this.dispatchEvent(Yd)}function hA(s){switch(this.state){case ze.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case ze.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case ze.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function dA(s){this.enabled===!1||this.enableZoom===!1||this.state!==ze.NONE||(s.preventDefault(),this.dispatchEvent(Yd),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Dv))}function pA(s){this.enabled!==!1&&this._handleKeyDown(s)}function mA(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Os.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=ze.TOUCH_ROTATE;break;case Os.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=ze.TOUCH_PAN;break;default:this.state=ze.NONE}break;case 2:switch(this.touches.TWO){case Os.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=ze.TOUCH_DOLLY_PAN;break;case Os.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=ze.TOUCH_DOLLY_ROTATE;break;default:this.state=ze.NONE}break;default:this.state=ze.NONE}this.state!==ze.NONE&&this.dispatchEvent(Yd)}function gA(s){switch(this._trackPointer(s),this.state){case ze.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case ze.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case ze.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case ze.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=ze.NONE}}function _A(s){this.enabled!==!1&&s.preventDefault()}function vA(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function SA(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Zd="gargantua:state:v1",Nd=[{name:"Event Horizon",azimuth:38,elevation:22,distance:22,fov:48},{name:"Rim Light",azimuth:140,elevation:7,distance:18,fov:50},{name:"Polar Crown",azimuth:265,elevation:68,distance:24,fov:50},{name:"Photon Ring",azimuth:320,elevation:16,distance:13,fov:55}],xA=[{distance:31,fov:60},{distance:27,fov:65},{distance:30,fov:60},{distance:23,fov:75}];function Kd(s,t=!1){const{name:i,...r}=Nd[s];return t?{...r,...xA[s]}:r}const Ni={standard:{label:"Standard",scale:.65,dprCap:1.5,steps:160,diskSamples:1,bloomLevels:2},high:{label:"High",scale:.8,dprCap:1.6,steps:256,diskSamples:2,bloomLevels:3},cinematic:{label:"Cinematic",scale:1,dprCap:1.8,steps:384,diskSamples:3,bloomLevels:4}},Gh=["Final composite","Steps / termination","Horizon capture","Disk crossing order","Disk intersection radius","Doppler factor","Gravitational redshift","Lensed sky coordinates","Stars / galaxy","Pre-tone HDR energy"],$u=[{key:"fov",label:"Field of view",group:"Camera & time",min:30,max:80,step:1,default:48,unit:"°"},{key:"distance",label:"Camera distance",group:"Camera & time",min:10,max:48,step:.1,default:22,unit:" M"},{key:"azimuth",label:"Azimuth",group:"Camera & time",min:0,max:360,step:1,default:38,unit:"°"},{key:"elevation",label:"Elevation",group:"Camera & time",min:-75,max:75,step:1,default:22,unit:"°"},{key:"timeScale",label:"Time rate",group:"Camera & time",min:0,max:3,step:.01,default:1,unit:"×"},{key:"diskInner",label:"Inner radius",group:"Accretion disk",min:3.8,max:8,step:.05,default:5,unit:" M"},{key:"diskOuter",label:"Outer radius",group:"Accretion disk",min:9,max:25,step:.1,default:17,unit:" M"},{key:"diskHeight",label:"Half thickness",group:"Accretion disk",min:.05,max:.8,step:.01,default:.22,unit:" M"},{key:"diskTemperature",label:"Temperature",group:"Accretion disk",min:.5,max:2,step:.01,default:1,unit:"×"},{key:"diskEmission",label:"Emission",group:"Accretion disk",min:0,max:5,step:.01,default:2,unit:"×"},{key:"orbitalSpeed",label:"Orbital speed",group:"Accretion disk",min:0,max:1.5,step:.01,default:1,unit:"×"},{key:"turbulence",label:"Turbulence",group:"Accretion disk",min:0,max:1,step:.01,default:.42,unit:""},{key:"turbulenceSpeed",label:"Turbulence speed",group:"Accretion disk",min:0,max:3,step:.01,default:1,unit:"×"},{key:"starDensity",label:"Star density",group:"Background",min:0,max:2,step:.01,default:1,unit:"×"},{key:"galaxyBrightness",label:"Milky Way",group:"Background",min:0,max:2,step:.01,default:1,unit:"×"},{key:"bloomStrength",label:"Bloom strength",group:"Lens & grade",min:0,max:2,step:.01,default:.85,unit:""},{key:"bloomThreshold",label:"Bloom threshold",group:"Lens & grade",min:.25,max:4,step:.01,default:1.2,unit:""},{key:"exposure",label:"Exposure",group:"Lens & grade",min:.4,max:2,step:.01,default:1,unit:""},{key:"vignette",label:"Vignette",group:"Lens & grade",min:0,max:.6,step:.01,default:.18,unit:""},{key:"grain",label:"Film grain",group:"Lens & grade",min:0,max:.08,step:.001,default:.025,unit:""},{key:"chromaticAberration",label:"Chromatic aberration",group:"Lens & grade",min:0,max:.006,step:1e-4,default:.0015,unit:""}],yA=Object.fromEntries($u.map(s=>[s.key,s]));function wv(s=!1){return{version:1,params:{...Object.fromEntries($u.map(t=>[t.key,t.default])),...s?Kd(0,!0):{}},quality:s?"standard":"high",preset:0,debug:0,hud:!0,drawer:!1,cinematic:!0,time:0,capture:!1}}function Uv(s,t){const i=yA[s];return i&&Number.isFinite(t)&&t>=i.min&&t<=i.max}function MA(s,t,i){return t.includes(s)?s:i}function z_(s,t,i,r){const l=Number(s);return Number.isInteger(l)&&l>=t&&l<=i?l:r}function F_(s=window.location.search,t=window.matchMedia("(max-width: 600px)").matches){const i=wv(t),r=new URLSearchParams(s),l=r.get("capture")==="1",c=l?{...i,quality:"high"}:i;let h=i;if(l)h={...c,capture:!0,cinematic:!1,time:0};else try{const p=JSON.parse(localStorage.getItem(Zd)||"null");if(p?.version===1){const m={...i.params};for(const d of Object.keys(m))Uv(d,p.params?.[d])&&(m[d]=p.params[d]);h={...i,params:m,quality:MA(p.quality,Object.keys(Ni),i.quality),preset:p.preset===null?null:z_(p.preset,0,3,0),debug:z_(p.debug,0,9,0),hud:typeof p.hud=="boolean"?p.hud:i.hud,drawer:typeof p.drawer=="boolean"?p.drawer:i.drawer,cinematic:typeof p.cinematic=="boolean"?p.cinematic:i.cinematic,time:Number.isFinite(p.time)&&p.time>=0?p.time:i.time}}}catch{}for(const[p,m]of[["quality",d=>Object.hasOwn(Ni,d)],["preset",d=>/^[0-3]$/.test(d)],["debug",d=>/^[0-9]$/.test(d)],["hud",d=>d==="0"||d==="1"]])if(r.has(p)){const d=r.get(p);h[p]=m(d)?p==="quality"?d:p==="hud"?d==="1":Number(d):c[p]}if(r.has("time")&&l){const p=Number(r.get("time"));h.time=Number.isFinite(p)&&p>=0?p:0}return h.preset!==null&&(l||r.has("preset"))&&(h.params={...h.params,...Kd(h.preset,t)}),h}function H_(s){if(!s.capture)try{const{version:t,params:i,quality:r,preset:l,debug:c,hud:h,drawer:p,cinematic:m,time:d}=s;localStorage.setItem(Zd,JSON.stringify({version:t,params:i,quality:r,preset:l,debug:c,hud:h,drawer:p,cinematic:m,time:d}))}catch{}}function Ls(s){return{...s,params:{...s.params}}}const EA=`precision highp float;\r
in vec3 position;\r
out vec2 vUv;\r
void main() {\r
  vUv = position.xy * 0.5 + 0.5;\r
  gl_Position = vec4(position, 1.0);\r
}\r
`,bA=`precision highp float;\r
\r
in vec2 vUv;\r
out vec4 outColor;\r
\r
uniform vec3 uCameraPos;\r
uniform mat3 uCameraBasis;\r
uniform vec2 uResolution;\r
uniform float uTanHalfFov;\r
uniform float uAspect;\r
uniform float uTime;\r
uniform int uMaxSteps;\r
uniform int uDiskSamples;\r
uniform int uDebug;\r
uniform bool uRgbm;\r
uniform float uDiskInner;\r
uniform float uDiskOuter;\r
uniform float uDiskHeight;\r
uniform float uDiskTemperature;\r
uniform float uDiskEmission;\r
uniform float uOrbitalSpeed;\r
uniform float uTurbulence;\r
uniform float uTurbulenceSpeed;\r
uniform float uStarDensity;\r
uniform float uGalaxyBrightness;\r
\r
const float PI = 3.141592653589793;\r
const float HORIZON = 0.505;\r
const float FAR_FIELD = 82.0;\r
\r
vec4 packColor(vec3 color) {\r
  if (!uRgbm) return vec4(color, 1.0);\r
  float m = ceil(clamp(max(max(color.r, color.g), color.b) / 16.0, 1.0 / 255.0, 1.0) * 255.0) / 255.0;\r
  return vec4(color / (16.0 * m), m);\r
}\r
\r
float hash21(vec2 p) {\r
  p = fract(p * vec2(123.34, 456.21));\r
  p += dot(p, p + 45.32);\r
  return fract(p.x * p.y);\r
}\r
\r
float noise2(vec2 p) {\r
  vec2 i = floor(p);\r
  vec2 f = fract(p);\r
  f = f * f * (3.0 - 2.0 * f);\r
  return mix(mix(hash21(i), hash21(i + vec2(1, 0)), f.x),\r
             mix(hash21(i + vec2(0, 1)), hash21(i + vec2(1, 1)), f.x), f.y);\r
}\r
\r
float fbm(vec2 p) {\r
  float v = 0.0;\r
  float a = 0.5;\r
  for (int i = 0; i < 4; i++) {\r
    v += a * noise2(p);\r
    p = mat2(1.7, -1.2, 1.2, 1.7) * p + 7.3;\r
    a *= 0.5;\r
  }\r
  return v;\r
}\r
\r
// Schwarzschild in isotropic Cartesian coordinates, M=1:\r
// ds²= -[(1-a)/(1+a)]² dt² +(1+a)^4 dX², a=1/(2ρ).\r
// Its optical index is n=(1+a)^3/(1-a). Fermat's equation with Euclidean\r
// arc length s is X'=v, v'=grad(log n)-v dot(v,grad(log n)).\r
// Integrating this state traces the spatial projection of a null geodesic.\r
vec3 opticalAcceleration(vec3 x, vec3 v) {\r
  float rho = max(length(x), HORIZON);\r
  float a = 0.5 / rho;\r
  float dLogN = -(a / rho) * (3.0 / (1.0 + a) + 1.0 / max(1.0 - a, 0.001));\r
  vec3 grad = (dLogN / rho) * x;\r
  return grad - v * dot(v, grad);\r
}\r
\r
float lapseAt(float rho) {\r
  float a = 0.5 / max(rho, HORIZON);\r
  return max((1.0 - a) / (1.0 + a), 0.001);\r
}\r
\r
float arealRadius(float rho) {\r
  float a = 0.5 / max(rho, HORIZON);\r
  return rho * (1.0 + a) * (1.0 + a);\r
}\r
\r
vec2 skyUv(vec3 d) {\r
  return vec2(atan(d.z, d.x) / (2.0 * PI) + 0.5,\r
              asin(clamp(d.y, -1.0, 1.0)) / PI + 0.5);\r
}\r
\r
vec3 proceduralSky(vec3 d) {\r
  vec2 uv = skyUv(d);\r
  vec3 base = vec3(0.002, 0.004, 0.011);\r
  float lat = dot(d, normalize(vec3(0.32, 0.91, -0.24)));\r
  float arm = fbm(uv * vec2(15.0, 8.0));\r
  float dust = fbm(uv * vec2(38.0, 18.0) + 7.1);\r
  float band = exp(-pow(abs(lat) * 7.0, 1.35));\r
  vec3 galaxy = mix(vec3(0.018, 0.037, 0.085), vec3(0.12, 0.085, 0.13), arm);\r
  galaxy *= band * (0.25 + 1.3 * arm) * (1.0 - 0.7 * smoothstep(0.46, 0.7, dust));\r
  base += galaxy * uGalaxyBrightness;\r
\r
  vec2 grid = uv * vec2(250.0, 125.0);\r
  vec2 cell = floor(grid);\r
  vec2 jitter = vec2(hash21(cell + 13.1), hash21(cell + 29.8));\r
  float present = step(hash21(cell + 91.7), 0.10 * uStarDensity);\r
  float point = 1.0 - smoothstep(0.01, 0.18, length(fract(grid) - jitter));\r
  float magnitude = pow(hash21(cell + 57.3), 7.0);\r
  float warmth = hash21(cell + 82.6);\r
  vec3 tint = mix(vec3(0.53, 0.72, 1.0), vec3(1.0, 0.74, 0.48), warmth);\r
  base += present * point * (0.18 + 3.5 * magnitude) * tint;\r
\r
  vec2 fineGrid = uv * vec2(590.0, 295.0);\r
  vec2 fineCell = floor(fineGrid);\r
  float fine = step(hash21(fineCell + 6.2), 0.018 * uStarDensity);\r
  vec2 fineJitter = vec2(hash21(fineCell + 31.0), hash21(fineCell + 42.0));\r
  base += fine * (1.0 - smoothstep(0.0, 0.2, length(fract(fineGrid) - fineJitter))) * vec3(0.45, 0.65, 1.0);\r
  return base;\r
}\r
\r
vec3 thermalPalette(float t) {\r
  vec3 red = vec3(1.25, 0.12, 0.018);\r
  vec3 amber = vec3(2.0, 0.65, 0.11);\r
  vec3 white = vec3(2.3, 1.22, 0.38);\r
  vec3 c = mix(red, amber, smoothstep(0.28, 0.75, t));\r
  return mix(c, white, smoothstep(0.8, 1.65, t));\r
}\r
\r
vec3 diskRadiance(vec3 x, vec3 backRay, out float doppler, out float gravity) {\r
  float rho = length(x);\r
  float R = arealRadius(rho);\r
  float innerR = arealRadius(uDiskInner);\r
  vec3 azimuthal = normalize(vec3(-x.z, 0.0, x.x));\r
  float speed = min(0.84, sqrt(1.0 / max(R - 2.0, 0.25)) * uOrbitalSpeed);\r
  float gamma = inversesqrt(max(1.0 - speed * speed, 0.01));\r
  // backRay points observer -> emitter, so the physical emitted photon is -backRay.\r
  doppler = 1.0 / max(gamma * (1.0 + speed * dot(azimuthal, backRay)), 0.2);\r
  gravity = lapseAt(rho) / lapseAt(length(uCameraPos));\r
  float shift = clamp(gravity * doppler, 0.03, 3.0);\r
  float temperature = uDiskTemperature * pow(innerR / max(R, innerR), 0.75) * shift;\r
  float angle = atan(x.z, x.x);\r
  float phase = angle * 7.0 + log(max(R, 1.0)) * 12.0 - uTime * uTurbulenceSpeed * (3.0 / sqrt(max(R, 2.0)));\r
  float streak = 0.5 + 0.5 * sin(phase + 2.5 * fbm(vec2(angle * 5.0, R * 0.55)));\r
  float turbulent = fbm(vec2(angle * 8.0 + uTime * 0.18 * uTurbulenceSpeed, R * 1.15));\r
  float structure = mix(1.0, 0.4 + 1.3 * streak + 0.8 * turbulent, uTurbulence);\r
  float radial = pow(innerR / max(R, innerR), 2.2);\r
  return thermalPalette(temperature) * (0.76 * uDiskEmission * radial * pow(shift, 3.0) * structure);\r
}\r
\r
void main() {\r
  vec2 ndc = vUv * 2.0 - 1.0;\r
  vec3 position = uCameraPos;\r
  vec3 direction = normalize(uCameraBasis * vec3(ndc.x * uAspect * uTanHalfFov,\r
                                                   ndc.y * uTanHalfFov, -1.0));\r
  float transmittance = 1.0;\r
  vec3 light = vec3(0.0);\r
  float lastDiskRadius = 0.0;\r
  float lastDoppler = 1.0;\r
  float lastGravity = 1.0;\r
  int crossings = 0;\r
  bool insideDisk = false;\r
  bool captured = false;\r
  bool escaped = false;\r
  int usedSteps = 0;\r
\r
  // Fixed compile-time cap; quality uniforms terminate earlier. The horizon,\r
  // far field, and step budget are distinct terminal states for diagnostics.\r
  for (int step = 0; step < 384; step++) {\r
    if (step >= uMaxSteps) break;\r
    usedSteps = step + 1;\r
    float rho = length(position);\r
    if (rho <= HORIZON) { captured = true; break; }\r
    if (rho >= FAR_FIELD && dot(position, direction) > 0.0) { escaped = true; break; }\r
\r
    float ds = clamp(0.058 * rho, 0.045, 1.8);\r
    if (rho < 2.8) ds = min(ds, 0.12);\r
    vec3 acceleration = opticalAcceleration(position, direction);\r
    vec3 midDirection = normalize(direction + 0.5 * ds * acceleration);\r
    vec3 midPosition = position + 0.5 * ds * direction;\r
    vec3 nextDirection = normalize(direction + ds * opticalAcceleration(midPosition, midDirection));\r
    vec3 nextPosition = position + ds * midDirection;\r
\r
    // Intersect this curved-path segment with the slab before sampling, so\r
    // even Standard quality does not skip a thin disk between step midpoints.\r
    float slabStart = 0.0;\r
    float slabEnd = 1.0;\r
    float dy = nextPosition.y - position.y;\r
    if (abs(dy) > 0.000001) {\r
      float t0 = (-uDiskHeight - position.y) / dy;\r
      float t1 = (uDiskHeight - position.y) / dy;\r
      slabStart = max(0.0, min(t0, t1));\r
      slabEnd = min(1.0, max(t0, t1));\r
    } else if (abs(position.y) > uDiskHeight) {\r
      slabStart = 1.0;\r
      slabEnd = 0.0;\r
    }\r
    bool sampledDisk = false;\r
    for (int sub = 0; sub < 3; sub++) {\r
      if (sub >= uDiskSamples) break;\r
      if (slabEnd <= slabStart) break;\r
      float fraction = mix(slabStart, slabEnd, (float(sub) + 0.5) / float(uDiskSamples));\r
      vec3 samplePosition = mix(position, nextPosition, fraction);\r
      float cylindricalRadius = length(samplePosition.xz);\r
      bool inVolume = cylindricalRadius >= uDiskInner && cylindricalRadius <= uDiskOuter\r
                   && abs(samplePosition.y) <= uDiskHeight;\r
      if (inVolume) {\r
        if (!insideDisk) crossings++;\r
        insideDisk = true;\r
        sampledDisk = true;\r
        float innerFade = smoothstep(uDiskInner, uDiskInner + 0.45, cylindricalRadius);\r
        float outerFade = 1.0 - smoothstep(uDiskOuter - 0.9, uDiskOuter, cylindricalRadius);\r
        float vertical = exp(-2.0 * pow(samplePosition.y / uDiskHeight, 2.0));\r
        float opticalDepth = 0.35 * (ds * (slabEnd - slabStart) / float(uDiskSamples)) / max(2.0 * uDiskHeight, 0.08)\r
                           * innerFade * outerFade * vertical;\r
        float alpha = 1.0 - exp(-opticalDepth);\r
        float doppler, gravity;\r
        vec3 emission = diskRadiance(samplePosition, normalize(mix(direction, nextDirection, fraction)), doppler, gravity);\r
        light += transmittance * alpha * emission;\r
        transmittance *= (1.0 - alpha);\r
        lastDiskRadius = cylindricalRadius;\r
        lastDoppler = doppler;\r
        lastGravity = gravity;\r
      }\r
    }\r
    float nextCylindricalRadius = length(nextPosition.xz);\r
    insideDisk = sampledDisk && abs(nextPosition.y) <= uDiskHeight\r
              && nextCylindricalRadius >= uDiskInner && nextCylindricalRadius <= uDiskOuter;\r
\r
    position = nextPosition;\r
    direction = nextDirection;\r
  }\r
\r
  vec3 sky = escaped ? proceduralSky(direction) : vec3(0.0);\r
  vec3 hdr = light + transmittance * sky;\r
  if (uDebug == 0) { outColor = packColor(hdr); return; }\r
  vec3 debugColor = vec3(0.0);\r
  if (uDebug == 1) {\r
    vec3 terminal = captured ? vec3(1.0, 0.14, 0.1) : escaped ? vec3(0.1, 0.8, 0.9) : vec3(1.0, 0.75, 0.1);\r
    debugColor = terminal * (0.25 + 0.75 * float(usedSteps) / float(uMaxSteps));\r
  } else if (uDebug == 2) {\r
    debugColor = captured ? vec3(1.0) : vec3(0.0);\r
  } else if (uDebug == 3) {\r
    debugColor = crossings == 0 ? vec3(0.0) : crossings == 1 ? vec3(1.0, 0.36, 0.04)\r
               : crossings == 2 ? vec3(0.08, 0.86, 1.0) : vec3(0.94, 0.18, 0.75);\r
  } else if (uDebug == 4) {\r
    float t = clamp((lastDiskRadius - uDiskInner) / (uDiskOuter - uDiskInner), 0.0, 1.0);\r
    debugColor = crossings == 0 ? vec3(0.0) : mix(vec3(1.0, 0.18, 0.02), vec3(0.12, 0.32, 1.0), t);\r
  } else if (uDebug == 5) {\r
    debugColor = crossings == 0 ? vec3(0.0) : mix(vec3(0.12, 0.22, 1.0), vec3(1.0, 0.25, 0.08), clamp((lastDoppler - 0.6) / 1.1, 0.0, 1.0));\r
  } else if (uDebug == 6) {\r
    debugColor = crossings == 0 ? vec3(0.0) : vec3(lastGravity, lastGravity * lastGravity, 1.0 - lastGravity);\r
  } else if (uDebug == 7) {\r
    debugColor = escaped ? vec3(skyUv(direction), 0.4) : vec3(0.0);\r
  } else if (uDebug == 8) {\r
    debugColor = min(sky * 1.8, vec3(1.0));\r
  } else if (uDebug == 9) {\r
    float energy = dot(hdr, vec3(0.2126, 0.7152, 0.0722));\r
    float level = clamp(log2(1.0 + energy) / 4.0, 0.0, 1.0);\r
    debugColor = mix(vec3(0.02, 0.03, 0.18), vec3(0.1, 0.9, 0.7), smoothstep(0.0, 0.5, level));\r
    debugColor = mix(debugColor, vec3(1.0, 0.85, 0.16), smoothstep(0.48, 0.82, level));\r
    debugColor = mix(debugColor, vec3(1.0, 0.15, 0.12), smoothstep(0.82, 1.0, level));\r
  }\r
  outColor = packColor(debugColor);\r
}\r
`,TA=`precision highp float;\r
in vec2 vUv;\r
out vec4 outColor;\r
uniform sampler2D uInput;\r
uniform vec2 uTexel;\r
uniform vec2 uDirection;\r
uniform float uThreshold;\r
uniform bool uApplyThreshold;\r
uniform bool uRgbm;\r
\r
vec3 unpackColor(vec4 value) {\r
  return uRgbm ? value.rgb * value.a * 16.0 : value.rgb;\r
}\r
vec4 packColor(vec3 color) {\r
  if (!uRgbm) return vec4(color, 1.0);\r
  float m = ceil(clamp(max(max(color.r, color.g), color.b) / 16.0, 1.0 / 255.0, 1.0) * 255.0) / 255.0;\r
  return vec4(color / (16.0 * m), m);\r
}\r
vec3 sampleColor(vec2 uv) {\r
  vec3 c = unpackColor(texture(uInput, clamp(uv, vec2(0.0), vec2(1.0))));\r
  if (uApplyThreshold) {\r
    float peak = max(max(c.r, c.g), c.b);\r
    c *= smoothstep(uThreshold * 0.65, uThreshold * 1.35, peak);\r
  }\r
  return c;\r
}\r
void main() {\r
  vec2 d = uDirection * uTexel;\r
  vec3 c = sampleColor(vUv) * 0.227027;\r
  c += (sampleColor(vUv + d) + sampleColor(vUv - d)) * 0.1945946;\r
  c += (sampleColor(vUv + 2.0 * d) + sampleColor(vUv - 2.0 * d)) * 0.1216216;\r
  c += (sampleColor(vUv + 3.0 * d) + sampleColor(vUv - 3.0 * d)) * 0.054054;\r
  c += (sampleColor(vUv + 4.0 * d) + sampleColor(vUv - 4.0 * d)) * 0.016216;\r
  outColor = packColor(c);\r
}\r
`,AA=`precision highp float;\r
in vec2 vUv;\r
out vec4 outColor;\r
uniform sampler2D uScene;\r
uniform sampler2D uBloom0;\r
uniform sampler2D uBloom1;\r
uniform sampler2D uBloom2;\r
uniform sampler2D uBloom3;\r
uniform int uBloomLevels;\r
uniform int uDebug;\r
uniform bool uRgbm;\r
uniform float uBloomStrength;\r
uniform float uExposure;\r
uniform float uVignette;\r
uniform float uGrain;\r
uniform float uChromaticAberration;\r
uniform float uTime;\r
uniform vec2 uResolution;\r
\r
vec3 unpackColor(vec4 value) {\r
  return uRgbm ? value.rgb * value.a * 16.0 : value.rgb;\r
}\r
vec3 aces(vec3 x) {\r
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);\r
}\r
float hash21(vec2 p) {\r
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);\r
}\r
void main() {\r
  vec2 edge = (vUv - 0.5) * uChromaticAberration;\r
  vec3 source;\r
  if (uDebug > 0 || uChromaticAberration <= 0.00001) {\r
    source = unpackColor(texture(uScene, vUv));\r
  } else {\r
    source = vec3(unpackColor(texture(uScene, clamp(vUv + edge, 0.0, 1.0))).r,\r
                  unpackColor(texture(uScene, vUv)).g,\r
                  unpackColor(texture(uScene, clamp(vUv - edge, 0.0, 1.0))).b);\r
  }\r
  if (uDebug > 0) {\r
    outColor = vec4(pow(clamp(source, 0.0, 1.0), vec3(1.0 / 2.2)), 1.0);\r
    return;\r
  }\r
  vec3 bloom = vec3(0.0);\r
  if (uBloomLevels > 0) bloom += unpackColor(texture(uBloom0, vUv)) * 0.38;\r
  if (uBloomLevels > 1) bloom += unpackColor(texture(uBloom1, vUv)) * 0.29;\r
  if (uBloomLevels > 2) bloom += unpackColor(texture(uBloom2, vUv)) * 0.21;\r
  if (uBloomLevels > 3) bloom += unpackColor(texture(uBloom3, vUv)) * 0.12;\r
  vec3 color = aces((source + bloom * uBloomStrength) * uExposure);\r
  float radius = length((vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0));\r
  color *= 1.0 - uVignette * smoothstep(0.32, 0.9, radius);\r
  float grain = hash21(gl_FragCoord.xy + floor(uTime * 24.0)) - 0.5;\r
  color += grain * uGrain;\r
  outColor = vec4(pow(clamp(color, 0.0, 1.0), vec3(1.0 / 2.2)), 1.0);\r
}\r
`,Or=Math.PI/180,RA=14e5;function Vh(s,t){return new Sv({glslVersion:Dd,vertexShader:EA,fragmentShader:s,uniforms:t,depthTest:!1,depthWrite:!1,toneMapped:!1})}function kh(s,t,i){return new Ti(s,t,{type:i?ci:Ii,format:bi,minFilter:Tn,magFilter:Tn,depthBuffer:!1,stencilBuffer:!1,colorSpace:Zo})}function G_(s,t,i){const r=s*Or,l=t*Or;return new nt(i*Math.cos(l)*Math.cos(r),i*Math.sin(l),i*Math.cos(l)*Math.sin(r))}class CA{constructor(t,i,r){this.canvas=t,this.getState=i,this.callbacks=r,this.simTime=i().time,this.ready=!1,this.lost=!1,this.disposed=!1,this.syncingCamera=!1,this.inputSuppressedUntil=0,this.lastFrame=0,this.onResize=()=>this.resize(),this.onContextLost=l=>{l.preventDefault(),this.lost=!0,this.userInteracting=!1,this.ready=!1,cancelAnimationFrame(this.frameHandle),this.callbacks.onStatus("lost")},this.onContextRestored=()=>{this.callbacks.onStatus("restoring"),setTimeout(()=>{if(!this.disposed)try{this.destroyPipeline(),this.createPipeline();const l=this.renderer.getContext();for(let c=0;c<8&&l.getError()!==l.NO_ERROR;c++);this.inputSuppressedUntil=performance.now()+1500,this.controls.enabled=!1,setTimeout(()=>{!this.disposed&&!this.lost&&(this.controls.enabled=!0)},1500),this.lost=!1,this.lastFrame=0,this.start()}catch(l){this.callbacks.onError(l)}},0)},t.addEventListener("webglcontextlost",this.onContextLost),t.addEventListener("webglcontextrestored",this.onContextRestored),window.addEventListener("resize",this.onResize),this.createPipeline(),this.start()}createPipeline(){this.compileError=null,this.renderer=new rA({canvas:this.canvas,antialias:!1,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(1),this.renderer.outputColorSpace=ui,this.renderer.toneMapping=Pi,this.renderer.debug.checkShaderErrors=!0,this.renderer.debug.onShaderError=(i,r,l,c)=>{this.compileError=new Error(`Shader compile/link failed: ${i.getProgramInfoLog(r)} ${i.getShaderInfoLog(l)} ${i.getShaderInfoLog(c)}`)},this.rgbm=!this.renderer.getContext().getExtension("EXT_color_buffer_float"),this.orbitCamera=new Ei(48,1,.01,500),this.orbitCamera.up.set(0,1,0),this.controls=new oA(this.orbitCamera,this.canvas),this.controls.enableDamping=!1,this.controls.enablePan=!1,this.controls.minDistance=10,this.controls.maxDistance=48,this.controls.minPolarAngle=15*Or,this.controls.maxPolarAngle=165*Or,this.userInteracting=!1,this.controls.addEventListener("start",()=>{this.userInteracting=!0,this.reportCamera()}),this.controls.addEventListener("change",()=>{this.userInteracting&&this.reportCamera()}),this.controls.addEventListener("end",()=>{this.userInteracting=!1}),this.syncCamera();const t=new ji;t.setAttribute("position",new Zi([-1,-1,0,3,-1,0,-1,3,0],3)),this.geometry=t,this.mesh=new Qi(t,Vh(bA,{uCameraPos:{value:new nt},uCameraBasis:{value:new re},uResolution:{value:new ie(1,1)},uTanHalfFov:{value:.45},uAspect:{value:1},uTime:{value:0},uMaxSteps:{value:256},uDiskSamples:{value:2},uDebug:{value:0},uRgbm:{value:this.rgbm},uDiskInner:{value:5},uDiskOuter:{value:17},uDiskHeight:{value:.22},uDiskTemperature:{value:1},uDiskEmission:{value:2},uOrbitalSpeed:{value:1},uTurbulence:{value:.42},uTurbulenceSpeed:{value:1},uStarDensity:{value:1},uGalaxyBrightness:{value:1}})),this.mesh.frustumCulled=!1,this.rayMaterial=this.mesh.material,this.blurMaterial=Vh(TA,{uInput:{value:null},uTexel:{value:new ie(1,1)},uDirection:{value:new ie(1,0)},uThreshold:{value:1.2},uApplyThreshold:{value:!1},uRgbm:{value:this.rgbm}}),this.outputMaterial=Vh(AA,{uScene:{value:null},uBloom0:{value:null},uBloom1:{value:null},uBloom2:{value:null},uBloom3:{value:null},uBloomLevels:{value:3},uDebug:{value:0},uRgbm:{value:this.rgbm},uBloomStrength:{value:.85},uExposure:{value:1},uVignette:{value:.18},uGrain:{value:.025},uChromaticAberration:{value:.0015},uTime:{value:0},uResolution:{value:new ie(1,1)}}),this.scene=new Vy,this.scene.add(this.mesh),this.screenCamera=new qd,this.targets=[],this.resize()}destroyPipeline(){this.renderer&&(this.controls?.dispose(),this.targets?.forEach(t=>t.dispose()),this.geometry?.dispose(),this.rayMaterial?.dispose(),this.blurMaterial?.dispose(),this.outputMaterial?.dispose(),this.renderer.dispose(),this.renderer=null,this.targets=[])}syncCamera(){if(!this.orbitCamera)return;const t=this.getState().params;this.syncingCamera=!0,this.orbitCamera.position.copy(G_(t.azimuth,t.elevation,t.distance)),this.orbitCamera.fov=t.fov,this.orbitCamera.updateProjectionMatrix(),this.controls.target.set(0,0,0),this.controls.update(),this.syncingCamera=!1}reportCamera(){if(this.syncingCamera||this.lost||performance.now()<this.inputSuppressedUntil)return;const t=this.orbitCamera.position,i=t.length(),r=(Math.atan2(t.z,t.x)/Or+360)%360,l=Math.asin(t.y/i)/Or;this.callbacks.onCameraChange({azimuth:r,elevation:l,distance:i,fov:this.orbitCamera.fov})}resize(){if(!this.renderer||this.lost)return;const t=this.getState(),i=Ni[t.quality],r=Math.max(1,window.innerWidth),l=Math.max(1,window.innerHeight),c=Math.min(window.devicePixelRatio||1,i.dprCap),h=Math.min(c,Math.sqrt(18e5/(r*l))),p=Math.min(c*i.scale,Math.sqrt(RA/(r*l))),m=Math.max(1,Math.round(r*h)),d=Math.max(1,Math.round(l*h));this.internalWidth=Math.max(1,Math.round(r*p)),this.internalHeight=Math.max(1,Math.round(l*p)),this.renderer.setSize(m,d,!1),this.canvas.style.width=`${r}px`,this.canvas.style.height=`${l}px`,this.orbitCamera.aspect=r/l,this.orbitCamera.updateProjectionMatrix(),this.targets.forEach(_=>_.dispose()),this.sceneTarget=kh(this.internalWidth,this.internalHeight,this.rgbm),this.targets=[this.sceneTarget],this.bloom=[];let x=this.internalWidth,v=this.internalHeight;for(let _=0;_<4;_++){x=Math.max(1,Math.floor(x/2)),v=Math.max(1,Math.floor(v/2));const E=kh(x,v,this.rgbm),R=kh(x,v,this.rgbm);this.bloom.push({horizontal:E,vertical:R,width:x,height:v}),this.targets.push(E,R)}this.rayMaterial.uniforms.uResolution.value.set(this.internalWidth,this.internalHeight),this.outputMaterial.uniforms.uResolution.value.set(m,d)}setTime(t){this.simTime=t,this.lastFrame=performance.now()}getTime(){return this.simTime}canTestContextRecovery(){return!!this.renderer?.getContext().getExtension("WEBGL_lose_context")}testContextRecovery(){if(this.disposed||this.lost)return!1;const t=this.renderer?.getContext().getExtension("WEBGL_lose_context");return t?(t.loseContext(),setTimeout(()=>{this.disposed||t.restoreContext()},800),!0):!1}start(){this.disposed||this.lost||(this.frameHandle=requestAnimationFrame(t=>this.frame(t)))}frame(t){if(!(this.disposed||this.lost))try{const i=this.getState(),r=this.lastFrame?Math.min((t-this.lastFrame)/1e3,.1):0;if(this.lastFrame=t,i.capture||(this.simTime+=r*i.params.timeScale),i.cinematic&&!i.capture){const l=i.params,c=l.azimuth+5*Math.sin(this.simTime*.16)+this.simTime*.55,h=l.elevation+3.5*Math.sin(this.simTime*.12),p=l.distance+.55*Math.sin(this.simTime*.1);this.syncingCamera=!0,this.orbitCamera.position.copy(G_(c,h,p)),this.controls.update(),this.syncingCamera=!1}if(this.render(i),!this.ready){if(this.compileError)throw this.compileError;const l=this.renderer.getContext().getError();if(l!==this.renderer.getContext().NO_ERROR)throw new Error(`WebGL error on initial frame: ${l}`);this.ready=!0,this.callbacks.onReady()}this.start()}catch(i){this.ready=!1,this.callbacks.onError(i)}}render(t){const i=Ni[t.quality],r=t.params,l=this.rayMaterial.uniforms;this.orbitCamera.updateMatrixWorld(),l.uCameraPos.value.copy(this.orbitCamera.position),l.uCameraBasis.value.setFromMatrix4(this.orbitCamera.matrixWorld),l.uTanHalfFov.value=Math.tan(this.orbitCamera.fov*Or*.5),l.uAspect.value=this.orbitCamera.aspect,l.uTime.value=this.simTime,l.uMaxSteps.value=i.steps,l.uDiskSamples.value=i.diskSamples,l.uDebug.value=t.debug,l.uDiskInner.value=r.diskInner,l.uDiskOuter.value=r.diskOuter,l.uDiskHeight.value=r.diskHeight,l.uDiskTemperature.value=r.diskTemperature,l.uDiskEmission.value=r.diskEmission,l.uOrbitalSpeed.value=r.orbitalSpeed,l.uTurbulence.value=r.turbulence,l.uTurbulenceSpeed.value=r.turbulenceSpeed,l.uStarDensity.value=r.starDensity,l.uGalaxyBrightness.value=r.galaxyBrightness,this.mesh.material=this.rayMaterial,this.renderer.setRenderTarget(this.sceneTarget),this.renderer.render(this.scene,this.screenCamera);const c=this.blurMaterial.uniforms,h=t.debug===0?i.bloomLevels:0;for(let m=0;m<h;m++){const d=this.bloom[m],x=m===0?this.sceneTarget:this.bloom[m-1].vertical,v=m===0?this.internalWidth:this.bloom[m-1].width,_=m===0?this.internalHeight:this.bloom[m-1].height;c.uInput.value=x.texture,c.uTexel.value.set(1/v,1/_),c.uDirection.value.set(1,0),c.uThreshold.value=r.bloomThreshold,c.uApplyThreshold.value=m===0,this.mesh.material=this.blurMaterial,this.renderer.setRenderTarget(d.horizontal),this.renderer.render(this.scene,this.screenCamera),c.uInput.value=d.horizontal.texture,c.uTexel.value.set(1/d.width,1/d.height),c.uDirection.value.set(0,1),c.uApplyThreshold.value=!1,this.renderer.setRenderTarget(d.vertical),this.renderer.render(this.scene,this.screenCamera)}const p=this.outputMaterial.uniforms;p.uScene.value=this.sceneTarget.texture;for(let m=0;m<4;m++)p[`uBloom${m}`].value=this.bloom[m].vertical.texture;p.uBloomLevels.value=h,p.uDebug.value=t.debug,p.uBloomStrength.value=r.bloomStrength,p.uExposure.value=r.exposure,p.uVignette.value=r.vignette,p.uGrain.value=r.grain,p.uChromaticAberration.value=r.chromaticAberration,p.uTime.value=this.simTime,this.mesh.material=this.outputMaterial,this.renderer.setRenderTarget(null),this.renderer.setViewport(0,0,this.renderer.domElement.width,this.renderer.domElement.height),this.renderer.setScissorTest(!1),this.renderer.render(this.scene,this.screenCamera)}dispose(){this.disposed=!0,cancelAnimationFrame(this.frameHandle),window.removeEventListener("resize",this.onResize),this.canvas.removeEventListener("webglcontextlost",this.onContextLost),this.canvas.removeEventListener("webglcontextrestored",this.onContextRestored),this.destroyPipeline()}}const Ou=Object.keys(Ni),DA=[...new Set($u.map(s=>s.group))],V_=new Set(["fov","distance","azimuth","elevation"]);function wA(s,t){const i=s.step<.001?4:s.step<.01?3:s.step<1?2:0;return`${Number(t).toFixed(i)}${s.unit}`}function UA(){const s=Un.useRef(null),t=Un.useRef(null),[i,r]=Un.useState(()=>F_()),l=Un.useRef(i),[c,h]=Un.useState("loading"),[p,m]=Un.useState(""),[d,x]=Un.useState(!1),v=Un.useCallback(C=>{const D=C(l.current);return l.current=D,r(D),H_(D),D},[]),_=Un.useCallback(C=>{if(!Object.hasOwn(Ni,C))return{ok:!1,error:"Invalid quality level"};const D=v(L=>({...L,quality:C}));return t.current?.resize(),Ls(D)},[v]),E=Un.useCallback(C=>{if(!Number.isInteger(C)||C<0||C>3)return{ok:!1,error:"Invalid preset index"};const D=Kd(C,window.matchMedia("(max-width: 600px)").matches),L=v(b=>({...b,preset:C,cinematic:!1,params:{...b.params,...D}}));return t.current?.syncCamera(),Ls(L)},[v]),R=Un.useCallback(C=>!Number.isInteger(C)||C<0||C>9?{ok:!1,error:"Invalid debug view"}:Ls(v(D=>({...D,debug:C}))),[v]),O=Un.useCallback(C=>{if(typeof C!="number"||!Number.isFinite(C)||C<0)return{ok:!1,error:"Time must be a finite non-negative number"};const D=v(L=>({...L,time:C}));return t.current?.setTime(C),Ls(D)},[v]),M=Un.useCallback((C,D)=>{const L=Number(D);Uv(C,L)&&(v(b=>({...b,params:{...b.params,[C]:L},...V_.has(C)?{preset:null,cinematic:!1}:{}})),V_.has(C)&&t.current?.syncCamera())},[v]),S=Un.useCallback(()=>{if(!l.current.capture)try{localStorage.removeItem(Zd)}catch{}const C=window.matchMedia("(max-width: 600px)").matches,D=l.current.capture?F_(window.location.search,C):wv(C);return l.current=D,r(D),H_(D),t.current?.setTime(D.time),t.current?.syncCamera(),t.current?.resize(),Ls(D)},[]);Un.useEffect(()=>{let C;document.documentElement.dataset.gargantuaReady="false",Object.defineProperty(window,"__GARGANTUA__",{configurable:!0,value:Object.freeze({get ready(){return!!t.current?.ready},getState(){const L=Ls(l.current);return L.time=t.current?.getTime()??L.time,L},setQuality:_,setPreset:E,setDebug:R,setTime:O})});try{C=new CA(s.current,()=>l.current,{onCameraChange:L=>{v(b=>({...b,params:{...b.params,...L},preset:null,cinematic:!1}))},onStatus:L=>{document.documentElement.dataset.gargantuaReady="false",h(L)},onReady:()=>{document.documentElement.dataset.gargantuaReady="true",h("ready"),m("")},onError:L=>{document.documentElement.dataset.gargantuaReady="false",m(String(L?.message||L)),h("error"),console.error(L)}}),t.current=C,x(C.canTestContextRecovery())}catch(L){m(String(L?.message||L)),h("error"),console.error(L)}return()=>{C?.dispose(),t.current=null,delete window.__GARGANTUA__,delete document.documentElement.dataset.gargantuaReady}},[R,E,_,O,v]),Un.useEffect(()=>{const C=D=>{if(D.altKey||D.ctrlKey||D.metaKey)return;const L=D.key.toLowerCase();if(D.shiftKey&&/^Digit[1-4]$/.test(D.code))D.preventDefault(),E(Number(D.code.slice(-1))-1);else if(!D.shiftKey&&/^[0-9]$/.test(L))D.preventDefault(),R(Number(L));else if(L===" ")D.preventDefault(),l.current.capture||v(b=>({...b,cinematic:!b.cinematic}));else if(L==="h")v(b=>({...b,hud:!b.hud}));else if(L==="r")S();else if(L==="q"){const b=Ou.indexOf(l.current.quality);_(Ou[(b+1)%Ou.length])}};return window.addEventListener("keydown",C),()=>window.removeEventListener("keydown",C)},[S,R,E,_,v]);const B=()=>v(C=>({...C,hud:!C.hud})),k=()=>v(C=>({...C,drawer:!C.drawer})),U=()=>{i.capture||v(C=>({...C,cinematic:!C.cinematic}))};return Rt.createElement("main",{className:"app"},Rt.createElement("canvas",{ref:s,className:"universe","aria-label":"Interactive Schwarzschild black hole raytracer"}),Rt.createElement("div",{className:"edge-glow","aria-hidden":"true"}),c!=="ready"&&Rt.createElement("div",{className:`status ${c==="error"?"status-error":""}`,role:"status"},Rt.createElement("span",{className:"status-light"}),c==="loading"&&"INITIALIZING GEODESICS",c==="lost"&&"WEBGL CONTEXT LOST · WAITING TO RESTORE",c==="restoring"&&"RESTORING RENDERER",c==="error"&&`RENDER ERROR · ${p}`),i.hud&&Rt.createElement(Rt.Fragment,null,Rt.createElement("header",{className:"masthead"},Rt.createElement("div",{className:"eyebrow"},Rt.createElement("span",{className:"eyebrow-line"})," A REAL-TIME RELATIVITY EXPERIMENT ",Rt.createElement("span",{className:"eyebrow-line"})),Rt.createElement("h1",null,"GARGANTUA",Rt.createElement("span",{className:"title-dot"},".")),Rt.createElement("p",null,"SCHWARZSCHILD BLACK HOLE RAYTRACER ",Rt.createElement("span",{className:"masthead-sep"},"/")," M = 1")),Rt.createElement("div",{className:"side-index","aria-hidden":"true"},Rt.createElement("span",null,"01"),Rt.createElement("span",{className:"index-line"}),Rt.createElement("span",null,"∞")),Rt.createElement("section",{className:"readout","aria-label":"Scene status"},Rt.createElement("div",{className:"readout-title"},"OBSERVER FEED ",Rt.createElement("span",{className:"live-pip"})," LIVE"),Rt.createElement("div",{className:"readout-grid"},Rt.createElement("span",null,"METRIC"),Rt.createElement("strong",null,"SCHWARZSCHILD"),Rt.createElement("span",null,"VIEW"),Rt.createElement("strong",null,i.preset===null?"CUSTOM ORBIT":Nd[i.preset].name.toUpperCase()),Rt.createElement("span",null,"QUALITY"),Rt.createElement("strong",null,Ni[i.quality].label.toUpperCase()),Rt.createElement("span",null,"RAY STATE"),Rt.createElement("strong",null,Gh[i.debug].toUpperCase()))),Rt.createElement("nav",{className:"preset-bar","aria-label":"Camera presets"},Rt.createElement("span",{className:"preset-label"},"OBSERVATION POINTS"),Rt.createElement("div",{className:"preset-items"},Nd.map((C,D)=>Rt.createElement("button",{key:C.name,type:"button",className:`preset ${i.preset===D?"active":""}`,onClick:()=>E(D)},Rt.createElement("span",{className:"preset-number"},"0",D+1),Rt.createElement("span",null,C.name))))),Rt.createElement("button",{className:"mobile-open",type:"button",onClick:k,"aria-expanded":i.drawer},i.drawer?"CLOSE CONTROLS":"OPEN CONTROLS"," ",Rt.createElement("span",null,i.drawer?"×":"☷")),Rt.createElement("aside",{className:`control-panel ${i.drawer?"mobile-expanded":""}`,"aria-label":"Raytracer controls"},Rt.createElement("div",{className:"panel-heading"},Rt.createElement("div",null,Rt.createElement("span",{className:"panel-kicker"},"MISSION CONTROL / 001"),Rt.createElement("h2",null,"Observer controls")),Rt.createElement("button",{type:"button",className:"icon-button",onClick:B,title:"Hide HUD (H)","aria-label":"Hide HUD"},"×")),Rt.createElement("div",{className:"panel-scroll"},Rt.createElement("div",{className:"panel-section panel-first"},Rt.createElement("div",{className:"section-title"},Rt.createElement("span",null,"RENDER BUDGET"),Rt.createElement("span",null,"01 / 05")),Rt.createElement("div",{className:"quality-switch",role:"group","aria-label":"Quality"},Ou.map(C=>Rt.createElement("button",{key:C,type:"button",className:i.quality===C?"selected":"",onClick:()=>_(C)},Ni[C].label))),Rt.createElement("div",{className:"technical-note"},Ni[i.quality].steps," STEPS · ",Ni[i.quality].diskSamples," DISK SAMPLES · ",Math.round(Ni[i.quality].scale*100),"% SCALE")),Rt.createElement("div",{className:"panel-section"},Rt.createElement("div",{className:"section-title"},Rt.createElement("span",null,"CAMERA MOTION"),Rt.createElement("span",null,"02 / 05")),Rt.createElement("div",{className:"motion-row"},Rt.createElement("div",null,Rt.createElement("strong",null,"Cinematic orbit"),Rt.createElement("small",null,i.capture?"Frozen for capture":i.cinematic?"Playing":"Paused")),Rt.createElement("button",{type:"button",onClick:U,disabled:i.capture},i.cinematic?"PAUSE":"PLAY"))),DA.map((C,D)=>Rt.createElement("div",{className:"panel-section",key:C},Rt.createElement("div",{className:"section-title"},Rt.createElement("span",null,C.toUpperCase()),Rt.createElement("span",null,String(D+3).padStart(2,"0")," / 06")),$u.filter(L=>L.group===C).map(L=>Rt.createElement("label",{className:"control",key:L.key},Rt.createElement("span",{className:"control-header"},Rt.createElement("span",null,L.label),Rt.createElement("output",null,wA(L,i.params[L.key]))),Rt.createElement("input",{type:"range",min:L.min,max:L.max,step:L.step,value:i.params[L.key],onChange:b=>M(L.key,b.target.value),"aria-label":L.label}))))),Rt.createElement("div",{className:"panel-section"},Rt.createElement("div",{className:"section-title"},Rt.createElement("span",null,"DIAGNOSTICS"),Rt.createElement("span",null,"07 / 07")),Rt.createElement("div",{className:"debug-grid",role:"group","aria-label":"Debug views"},Gh.map((C,D)=>Rt.createElement("button",{key:C,type:"button",title:C,className:i.debug===D?"selected":"",onClick:()=>R(D)},D))),Rt.createElement("p",{className:"debug-caption"},String(i.debug).padStart(2,"0")," — ",Gh[i.debug]),Rt.createElement("button",{type:"button",className:"context-test",disabled:!d||c!=="ready",onClick:()=>t.current?.testContextRecovery()},d?"TEST WEBGL RECOVERY":"WEBGL RECOVERY TEST UNAVAILABLE")),Rt.createElement("div",{className:"panel-footer"},Rt.createElement("button",{type:"button",className:"reset-button",onClick:S},"↺   RESET TO DEFAULTS"),Rt.createElement("p",null,"0–9 DEBUG  ·  SHIFT+1–4 PRESETS",Rt.createElement("br",null),"SPACE MOTION  ·  H HUD  ·  R RESET  ·  Q QUALITY"),Rt.createElement("p",null,"DRAG TO ORBIT  ·  SCROLL / PINCH TO ZOOM"))))),!i.hud&&!i.capture&&Rt.createElement("button",{type:"button",className:"restore-hud",onClick:B},"SHOW HUD · H"))}Vx.createRoot(document.getElementById("root")).render(Rt.createElement(UA,null));
