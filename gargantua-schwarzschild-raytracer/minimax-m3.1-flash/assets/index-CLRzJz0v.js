(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const h of c.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();var rh={exports:{}},Io={};var U0;function IS(){if(U0)return Io;U0=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(s,l,c){var h=null;if(c!==void 0&&(h=""+c),l.key!==void 0&&(h=""+l.key),"key"in l){c={};for(var p in l)p!=="key"&&(c[p]=l[p])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:h,ref:l!==void 0?l:null,props:c}}return Io.Fragment=t,Io.jsx=i,Io.jsxs=i,Io}var N0;function FS(){return N0||(N0=1,rh.exports=IS()),rh.exports}var kt=FS(),oh={exports:{}},Fo={},lh={exports:{}},ch={};var L0;function zS(){return L0||(L0=1,(function(r){function t(F,H){var ct=F.length;F.push(H);t:for(;0<ct;){var st=ct-1>>>1,ht=F[st];if(0<l(ht,H))F[st]=H,F[ct]=ht,ct=st;else break t}}function i(F){return F.length===0?null:F[0]}function s(F){if(F.length===0)return null;var H=F[0],ct=F.pop();if(ct!==H){F[0]=ct;t:for(var st=0,ht=F.length,w=ht>>>1;st<w;){var J=2*(st+1)-1,gt=F[J],Et=J+1,Nt=F[Et];if(0>l(gt,ct))Et<ht&&0>l(Nt,gt)?(F[st]=Nt,F[Et]=ct,st=Et):(F[st]=gt,F[J]=ct,st=J);else if(Et<ht&&0>l(Nt,ct))F[st]=Nt,F[Et]=ct,st=Et;else break t}}return H}function l(F,H){var ct=F.sortIndex-H.sortIndex;return ct!==0?ct:F.id-H.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var h=Date,p=h.now();r.unstable_now=function(){return h.now()-p}}var m=[],d=[],x=1,v=null,_=3,E=!1,R=!1,N=!1,y=!1,S=typeof setTimeout=="function"?setTimeout:null,I=typeof clearTimeout=="function"?clearTimeout:null,B=typeof setImmediate<"u"?setImmediate:null;function D(F){for(var H=i(d);H!==null;){if(H.callback===null)s(d);else if(H.startTime<=F)s(d),H.sortIndex=H.expirationTime,t(m,H);else break;H=i(d)}}function U(F){if(N=!1,D(F),!R)if(i(m)!==null)R=!0,C||(C=!0,Q());else{var H=i(d);H!==null&&j(U,H.startTime-F)}}var C=!1,P=-1,b=5,O=-1;function W(){return y?!0:!(r.unstable_now()-O<b)}function q(){if(y=!1,C){var F=r.unstable_now();O=F;var H=!0;try{t:{R=!1,N&&(N=!1,I(P),P=-1),E=!0;var ct=_;try{e:{for(D(F),v=i(m);v!==null&&!(v.expirationTime>F&&W());){var st=v.callback;if(typeof st=="function"){v.callback=null,_=v.priorityLevel;var ht=st(v.expirationTime<=F);if(F=r.unstable_now(),typeof ht=="function"){v.callback=ht,D(F),H=!0;break e}v===i(m)&&s(m),D(F)}else s(m);v=i(m)}if(v!==null)H=!0;else{var w=i(d);w!==null&&j(U,w.startTime-F),H=!1}}break t}finally{v=null,_=ct,E=!1}H=void 0}}finally{H?Q():C=!1}}}var Q;if(typeof B=="function")Q=function(){B(q)};else if(typeof MessageChannel<"u"){var lt=new MessageChannel,Y=lt.port2;lt.port1.onmessage=q,Q=function(){Y.postMessage(null)}}else Q=function(){S(q,0)};function j(F,H){P=S(function(){F(r.unstable_now())},H)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(F){F.callback=null},r.unstable_forceFrameRate=function(F){0>F||125<F?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):b=0<F?Math.floor(1e3/F):5},r.unstable_getCurrentPriorityLevel=function(){return _},r.unstable_next=function(F){switch(_){case 1:case 2:case 3:var H=3;break;default:H=_}var ct=_;_=H;try{return F()}finally{_=ct}},r.unstable_requestPaint=function(){y=!0},r.unstable_runWithPriority=function(F,H){switch(F){case 1:case 2:case 3:case 4:case 5:break;default:F=3}var ct=_;_=F;try{return H()}finally{_=ct}},r.unstable_scheduleCallback=function(F,H,ct){var st=r.unstable_now();switch(typeof ct=="object"&&ct!==null?(ct=ct.delay,ct=typeof ct=="number"&&0<ct?st+ct:st):ct=st,F){case 1:var ht=-1;break;case 2:ht=250;break;case 5:ht=1073741823;break;case 4:ht=1e4;break;default:ht=5e3}return ht=ct+ht,F={id:x++,callback:H,priorityLevel:F,startTime:ct,expirationTime:ht,sortIndex:-1},ct>st?(F.sortIndex=ct,t(d,F),i(m)===null&&F===i(d)&&(N?(I(P),P=-1):N=!0,j(U,ct-st))):(F.sortIndex=ht,t(m,F),R||E||(R=!0,C||(C=!0,Q()))),F},r.unstable_shouldYield=W,r.unstable_wrapCallback=function(F){var H=_;return function(){var ct=_;_=H;try{return F.apply(this,arguments)}finally{_=ct}}}})(ch)),ch}var O0;function BS(){return O0||(O0=1,lh.exports=zS()),lh.exports}var uh={exports:{}},se={};var P0;function HS(){if(P0)return se;P0=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),h=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),_=Symbol.iterator;function E(w){return w===null||typeof w!="object"?null:(w=_&&w[_]||w["@@iterator"],typeof w=="function"?w:null)}var R={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},N=Object.assign,y={};function S(w,J,gt){this.props=w,this.context=J,this.refs=y,this.updater=gt||R}S.prototype.isReactComponent={},S.prototype.setState=function(w,J){if(typeof w!="object"&&typeof w!="function"&&w!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,w,J,"setState")},S.prototype.forceUpdate=function(w){this.updater.enqueueForceUpdate(this,w,"forceUpdate")};function I(){}I.prototype=S.prototype;function B(w,J,gt){this.props=w,this.context=J,this.refs=y,this.updater=gt||R}var D=B.prototype=new I;D.constructor=B,N(D,S.prototype),D.isPureReactComponent=!0;var U=Array.isArray;function C(){}var P={H:null,A:null,T:null,S:null},b=Object.prototype.hasOwnProperty;function O(w,J,gt){var Et=gt.ref;return{$$typeof:r,type:w,key:J,ref:Et!==void 0?Et:null,props:gt}}function W(w,J){return O(w.type,J,w.props)}function q(w){return typeof w=="object"&&w!==null&&w.$$typeof===r}function Q(w){var J={"=":"=0",":":"=2"};return"$"+w.replace(/[=:]/g,function(gt){return J[gt]})}var lt=/\/+/g;function Y(w,J){return typeof w=="object"&&w!==null&&w.key!=null?Q(""+w.key):J.toString(36)}function j(w){switch(w.status){case"fulfilled":return w.value;case"rejected":throw w.reason;default:switch(typeof w.status=="string"?w.then(C,C):(w.status="pending",w.then(function(J){w.status==="pending"&&(w.status="fulfilled",w.value=J)},function(J){w.status==="pending"&&(w.status="rejected",w.reason=J)})),w.status){case"fulfilled":return w.value;case"rejected":throw w.reason}}throw w}function F(w,J,gt,Et,Nt){var Xt=typeof w;(Xt==="undefined"||Xt==="boolean")&&(w=null);var it=!1;if(w===null)it=!0;else switch(Xt){case"bigint":case"string":case"number":it=!0;break;case"object":switch(w.$$typeof){case r:case t:it=!0;break;case x:return it=w._init,F(it(w._payload),J,gt,Et,Nt)}}if(it)return Nt=Nt(w),it=Et===""?"."+Y(w,0):Et,U(Nt)?(gt="",it!=null&&(gt=it.replace(lt,"$&/")+"/"),F(Nt,J,gt,"",function(te){return te})):Nt!=null&&(q(Nt)&&(Nt=W(Nt,gt+(Nt.key==null||w&&w.key===Nt.key?"":(""+Nt.key).replace(lt,"$&/")+"/")+it)),J.push(Nt)),1;it=0;var _t=Et===""?".":Et+":";if(U(w))for(var Tt=0;Tt<w.length;Tt++)Et=w[Tt],Xt=_t+Y(Et,Tt),it+=F(Et,J,gt,Xt,Nt);else if(Tt=E(w),typeof Tt=="function")for(w=Tt.call(w),Tt=0;!(Et=w.next()).done;)Et=Et.value,Xt=_t+Y(Et,Tt++),it+=F(Et,J,gt,Xt,Nt);else if(Xt==="object"){if(typeof w.then=="function")return F(j(w),J,gt,Et,Nt);throw J=String(w),Error("Objects are not valid as a React child (found: "+(J==="[object Object]"?"object with keys {"+Object.keys(w).join(", ")+"}":J)+"). If you meant to render a collection of children, use an array instead.")}return it}function H(w,J,gt){if(w==null)return w;var Et=[],Nt=0;return F(w,Et,"","",function(Xt){return J.call(gt,Xt,Nt++)}),Et}function ct(w){if(w._status===-1){var J=w._result;J=J(),J.then(function(gt){(w._status===0||w._status===-1)&&(w._status=1,w._result=gt)},function(gt){(w._status===0||w._status===-1)&&(w._status=2,w._result=gt)}),w._status===-1&&(w._status=0,w._result=J)}if(w._status===1)return w._result.default;throw w._result}var st=typeof reportError=="function"?reportError:function(w){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var J=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof w=="object"&&w!==null&&typeof w.message=="string"?String(w.message):String(w),error:w});if(!window.dispatchEvent(J))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",w);return}console.error(w)},ht={map:H,forEach:function(w,J,gt){H(w,function(){J.apply(this,arguments)},gt)},count:function(w){var J=0;return H(w,function(){J++}),J},toArray:function(w){return H(w,function(J){return J})||[]},only:function(w){if(!q(w))throw Error("React.Children.only expected to receive a single React element child.");return w}};return se.Activity=v,se.Children=ht,se.Component=S,se.Fragment=i,se.Profiler=l,se.PureComponent=B,se.StrictMode=s,se.Suspense=m,se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=P,se.__COMPILER_RUNTIME={__proto__:null,c:function(w){return P.H.useMemoCache(w)}},se.cache=function(w){return function(){return w.apply(null,arguments)}},se.cacheSignal=function(){return null},se.cloneElement=function(w,J,gt){if(w==null)throw Error("The argument must be a React element, but you passed "+w+".");var Et=N({},w.props),Nt=w.key;if(J!=null)for(Xt in J.key!==void 0&&(Nt=""+J.key),J)!b.call(J,Xt)||Xt==="key"||Xt==="__self"||Xt==="__source"||Xt==="ref"&&J.ref===void 0||(Et[Xt]=J[Xt]);var Xt=arguments.length-2;if(Xt===1)Et.children=gt;else if(1<Xt){for(var it=Array(Xt),_t=0;_t<Xt;_t++)it[_t]=arguments[_t+2];Et.children=it}return O(w.type,Nt,Et)},se.createContext=function(w){return w={$$typeof:h,_currentValue:w,_currentValue2:w,_threadCount:0,Provider:null,Consumer:null},w.Provider=w,w.Consumer={$$typeof:c,_context:w},w},se.createElement=function(w,J,gt){var Et,Nt={},Xt=null;if(J!=null)for(Et in J.key!==void 0&&(Xt=""+J.key),J)b.call(J,Et)&&Et!=="key"&&Et!=="__self"&&Et!=="__source"&&(Nt[Et]=J[Et]);var it=arguments.length-2;if(it===1)Nt.children=gt;else if(1<it){for(var _t=Array(it),Tt=0;Tt<it;Tt++)_t[Tt]=arguments[Tt+2];Nt.children=_t}if(w&&w.defaultProps)for(Et in it=w.defaultProps,it)Nt[Et]===void 0&&(Nt[Et]=it[Et]);return O(w,Xt,Nt)},se.createRef=function(){return{current:null}},se.forwardRef=function(w){return{$$typeof:p,render:w}},se.isValidElement=q,se.lazy=function(w){return{$$typeof:x,_payload:{_status:-1,_result:w},_init:ct}},se.memo=function(w,J){return{$$typeof:d,type:w,compare:J===void 0?null:J}},se.startTransition=function(w){var J=P.T,gt={};P.T=gt;try{var Et=w(),Nt=P.S;Nt!==null&&Nt(gt,Et),typeof Et=="object"&&Et!==null&&typeof Et.then=="function"&&Et.then(C,st)}catch(Xt){st(Xt)}finally{J!==null&&gt.types!==null&&(J.types=gt.types),P.T=J}},se.unstable_useCacheRefresh=function(){return P.H.useCacheRefresh()},se.use=function(w){return P.H.use(w)},se.useActionState=function(w,J,gt){return P.H.useActionState(w,J,gt)},se.useCallback=function(w,J){return P.H.useCallback(w,J)},se.useContext=function(w){return P.H.useContext(w)},se.useDebugValue=function(){},se.useDeferredValue=function(w,J){return P.H.useDeferredValue(w,J)},se.useEffect=function(w,J){return P.H.useEffect(w,J)},se.useEffectEvent=function(w){return P.H.useEffectEvent(w)},se.useId=function(){return P.H.useId()},se.useImperativeHandle=function(w,J,gt){return P.H.useImperativeHandle(w,J,gt)},se.useInsertionEffect=function(w,J){return P.H.useInsertionEffect(w,J)},se.useLayoutEffect=function(w,J){return P.H.useLayoutEffect(w,J)},se.useMemo=function(w,J){return P.H.useMemo(w,J)},se.useOptimistic=function(w,J){return P.H.useOptimistic(w,J)},se.useReducer=function(w,J,gt){return P.H.useReducer(w,J,gt)},se.useRef=function(w){return P.H.useRef(w)},se.useState=function(w){return P.H.useState(w)},se.useSyncExternalStore=function(w,J,gt){return P.H.useSyncExternalStore(w,J,gt)},se.useTransition=function(){return P.H.useTransition()},se.version="19.2.9",se}var I0;function Pd(){return I0||(I0=1,uh.exports=HS()),uh.exports}var fh={exports:{}},Ln={};var F0;function GS(){if(F0)return Ln;F0=1;var r=Pd();function t(m){var d="https://react.dev/errors/"+m;if(1<arguments.length){d+="?args[]="+encodeURIComponent(arguments[1]);for(var x=2;x<arguments.length;x++)d+="&args[]="+encodeURIComponent(arguments[x])}return"Minified React error #"+m+"; visit "+d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,d,x){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:v==null?null:""+v,children:m,containerInfo:d,implementation:x}}var h=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(m,d){if(m==="font")return"";if(typeof d=="string")return d==="use-credentials"?d:""}return Ln.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Ln.createPortal=function(m,d){var x=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11)throw Error(t(299));return c(m,d,null,x)},Ln.flushSync=function(m){var d=h.T,x=s.p;try{if(h.T=null,s.p=2,m)return m()}finally{h.T=d,s.p=x,s.d.f()}},Ln.preconnect=function(m,d){typeof m=="string"&&(d?(d=d.crossOrigin,d=typeof d=="string"?d==="use-credentials"?d:"":void 0):d=null,s.d.C(m,d))},Ln.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},Ln.preinit=function(m,d){if(typeof m=="string"&&d&&typeof d.as=="string"){var x=d.as,v=p(x,d.crossOrigin),_=typeof d.integrity=="string"?d.integrity:void 0,E=typeof d.fetchPriority=="string"?d.fetchPriority:void 0;x==="style"?s.d.S(m,typeof d.precedence=="string"?d.precedence:void 0,{crossOrigin:v,integrity:_,fetchPriority:E}):x==="script"&&s.d.X(m,{crossOrigin:v,integrity:_,fetchPriority:E,nonce:typeof d.nonce=="string"?d.nonce:void 0})}},Ln.preinitModule=function(m,d){if(typeof m=="string")if(typeof d=="object"&&d!==null){if(d.as==null||d.as==="script"){var x=p(d.as,d.crossOrigin);s.d.M(m,{crossOrigin:x,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0})}}else d==null&&s.d.M(m)},Ln.preload=function(m,d){if(typeof m=="string"&&typeof d=="object"&&d!==null&&typeof d.as=="string"){var x=d.as,v=p(x,d.crossOrigin);s.d.L(m,x,{crossOrigin:v,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0,type:typeof d.type=="string"?d.type:void 0,fetchPriority:typeof d.fetchPriority=="string"?d.fetchPriority:void 0,referrerPolicy:typeof d.referrerPolicy=="string"?d.referrerPolicy:void 0,imageSrcSet:typeof d.imageSrcSet=="string"?d.imageSrcSet:void 0,imageSizes:typeof d.imageSizes=="string"?d.imageSizes:void 0,media:typeof d.media=="string"?d.media:void 0})}},Ln.preloadModule=function(m,d){if(typeof m=="string")if(d){var x=p(d.as,d.crossOrigin);s.d.m(m,{as:typeof d.as=="string"&&d.as!=="script"?d.as:void 0,crossOrigin:x,integrity:typeof d.integrity=="string"?d.integrity:void 0})}else s.d.m(m)},Ln.requestFormReset=function(m){s.d.r(m)},Ln.unstable_batchedUpdates=function(m,d){return m(d)},Ln.useFormState=function(m,d,x){return h.H.useFormState(m,d,x)},Ln.useFormStatus=function(){return h.H.useHostTransitionStatus()},Ln.version="19.2.9",Ln}var z0;function VS(){if(z0)return fh.exports;z0=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),fh.exports=GS(),fh.exports}var B0;function kS(){if(B0)return Fo;B0=1;var r=BS(),t=Pd(),i=VS();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function h(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function p(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(s(188))}function d(e){var n=e.alternate;if(!n){if(n=c(e),n===null)throw Error(s(188));return n!==e?null:e}for(var a=e,o=n;;){var u=a.return;if(u===null)break;var f=u.alternate;if(f===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===f.child){for(f=u.child;f;){if(f===a)return m(u),e;if(f===o)return m(u),n;f=f.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=f;else{for(var g=!1,A=u.child;A;){if(A===a){g=!0,a=u,o=f;break}if(A===o){g=!0,o=u,a=f;break}A=A.sibling}if(!g){for(A=f.child;A;){if(A===a){g=!0,a=f,o=u;break}if(A===o){g=!0,o=f,a=u;break}A=A.sibling}if(!g)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:n}function x(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=x(e),n!==null)return n;e=e.sibling}return null}var v=Object.assign,_=Symbol.for("react.element"),E=Symbol.for("react.transitional.element"),R=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),y=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),I=Symbol.for("react.consumer"),B=Symbol.for("react.context"),D=Symbol.for("react.forward_ref"),U=Symbol.for("react.suspense"),C=Symbol.for("react.suspense_list"),P=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),O=Symbol.for("react.activity"),W=Symbol.for("react.memo_cache_sentinel"),q=Symbol.iterator;function Q(e){return e===null||typeof e!="object"?null:(e=q&&e[q]||e["@@iterator"],typeof e=="function"?e:null)}var lt=Symbol.for("react.client.reference");function Y(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===lt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case N:return"Fragment";case S:return"Profiler";case y:return"StrictMode";case U:return"Suspense";case C:return"SuspenseList";case O:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case R:return"Portal";case B:return e.displayName||"Context";case I:return(e._context.displayName||"Context")+".Consumer";case D:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case P:return n=e.displayName||null,n!==null?n:Y(e.type)||"Memo";case b:n=e._payload,e=e._init;try{return Y(e(n))}catch{}}return null}var j=Array.isArray,F=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,H=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ct={pending:!1,data:null,method:null,action:null},st=[],ht=-1;function w(e){return{current:e}}function J(e){0>ht||(e.current=st[ht],st[ht]=null,ht--)}function gt(e,n){ht++,st[ht]=e.current,e.current=n}var Et=w(null),Nt=w(null),Xt=w(null),it=w(null);function _t(e,n){switch(gt(Xt,n),gt(Nt,e),gt(Et,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?t0(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=t0(n),e=e0(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}J(Et),gt(Et,e)}function Tt(){J(Et),J(Nt),J(Xt)}function te(e){e.memoizedState!==null&&gt(it,e);var n=Et.current,a=e0(n,e.type);n!==a&&(gt(Nt,e),gt(Et,a))}function Bt(e){Nt.current===e&&(J(Et),J(Nt)),it.current===e&&(J(it),No._currentValue=ct)}var le,$e;function ae(e){if(le===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);le=n&&n[1]||"",$e=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+le+e+$e}var xe=!1;function Ne(e,n){if(!e||xe)return"";xe=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var Mt=function(){throw Error()};if(Object.defineProperty(Mt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Mt,[])}catch(ft){var ot=ft}Reflect.construct(e,[],Mt)}else{try{Mt.call()}catch(ft){ot=ft}e.call(Mt.prototype)}}else{try{throw Error()}catch(ft){ot=ft}(Mt=e())&&typeof Mt.catch=="function"&&Mt.catch(function(){})}}catch(ft){if(ft&&ot&&typeof ft.stack=="string")return[ft.stack,ot.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=o.DetermineComponentFrameRoot(),g=f[0],A=f[1];if(g&&A){var z=g.split(`
`),at=A.split(`
`);for(u=o=0;o<z.length&&!z[o].includes("DetermineComponentFrameRoot");)o++;for(;u<at.length&&!at[u].includes("DetermineComponentFrameRoot");)u++;if(o===z.length||u===at.length)for(o=z.length-1,u=at.length-1;1<=o&&0<=u&&z[o]!==at[u];)u--;for(;1<=o&&0<=u;o--,u--)if(z[o]!==at[u]){if(o!==1||u!==1)do if(o--,u--,0>u||z[o]!==at[u]){var vt=`
`+z[o].replace(" at new "," at ");return e.displayName&&vt.includes("<anonymous>")&&(vt=vt.replace("<anonymous>",e.displayName)),vt}while(1<=o&&0<=u);break}}}finally{xe=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?ae(a):""}function me(e,n){switch(e.tag){case 26:case 27:case 5:return ae(e.type);case 16:return ae("Lazy");case 13:return e.child!==n&&n!==null?ae("Suspense Fallback"):ae("Suspense");case 19:return ae("SuspenseList");case 0:case 15:return Ne(e.type,!1);case 11:return Ne(e.type.render,!1);case 1:return Ne(e.type,!0);case 31:return ae("Activity");default:return""}}function Xe(e){try{var n="",a=null;do n+=me(e,a),a=e,e=e.return;while(e);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var tn=Object.prototype.hasOwnProperty,En=r.unstable_scheduleCallback,We=r.unstable_cancelCallback,en=r.unstable_shouldYield,X=r.unstable_requestPaint,Le=r.unstable_now,we=r.unstable_getCurrentPriorityLevel,L=r.unstable_ImmediatePriority,M=r.unstable_UserBlockingPriority,K=r.unstable_NormalPriority,rt=r.unstable_LowPriority,dt=r.unstable_IdlePriority,bt=r.log,wt=r.unstable_setDisableYieldValue,pt=null,mt=null;function At(e){if(typeof bt=="function"&&wt(e),mt&&typeof mt.setStrictMode=="function")try{mt.setStrictMode(pt,e)}catch{}}var Ht=Math.clz32?Math.clz32:Qt,Lt=Math.log,Dt=Math.LN2;function Qt(e){return e>>>=0,e===0?32:31-(Lt(e)/Dt|0)|0}var Jt=256,ee=262144,k=4194304;function Rt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function xt(e,n,a){var o=e.pendingLanes;if(o===0)return 0;var u=0,f=e.suspendedLanes,g=e.pingedLanes;e=e.warmLanes;var A=o&134217727;return A!==0?(o=A&~f,o!==0?u=Rt(o):(g&=A,g!==0?u=Rt(g):a||(a=A&~e,a!==0&&(u=Rt(a))))):(A=o&~f,A!==0?u=Rt(A):g!==0?u=Rt(g):a||(a=o&~e,a!==0&&(u=Rt(a)))),u===0?0:n!==0&&n!==u&&(n&f)===0&&(f=u&-u,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:u}function Ct(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function It(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function yt(){var e=k;return k<<=1,(k&62914560)===0&&(k=4194304),e}function Kt(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function Wt(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Be(e,n,a,o,u,f){var g=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var A=e.entanglements,z=e.expirationTimes,at=e.hiddenUpdates;for(a=g&~a;0<a;){var vt=31-Ht(a),Mt=1<<vt;A[vt]=0,z[vt]=-1;var ot=at[vt];if(ot!==null)for(at[vt]=null,vt=0;vt<ot.length;vt++){var ft=ot[vt];ft!==null&&(ft.lane&=-536870913)}a&=~Mt}o!==0&&be(e,o,0),f!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=f&~(g&~n))}function be(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-Ht(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function kn(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var o=31-Ht(a),u=1<<o;u&n|e[o]&n&&(e[o]|=n),a&=~u}}function $n(e,n){var a=n&-n;return a=(a&42)!==0?1:Xr(a),(a&(e.suspendedLanes|n))!==0?0:a}function Xr(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Wr(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function qr(){var e=H.p;return e!==0?e:(e=window.event,e===void 0?32:b0(e.type))}function Gs(e,n){var a=H.p;try{return H.p=e,n()}finally{H.p=a}}var Fi=Math.random().toString(36).slice(2),un="__reactFiber$"+Fi,Rn="__reactProps$"+Fi,Xn="__reactContainer$"+Fi,us="__reactEvents$"+Fi,il="__reactListeners$"+Fi,al="__reactHandles$"+Fi,fs="__reactResources$"+Fi,Da="__reactMarker$"+Fi;function Ua(e){delete e[un],delete e[Rn],delete e[us],delete e[il],delete e[al]}function ta(e){var n=e[un];if(n)return n;for(var a=e.parentNode;a;){if(n=a[Xn]||a[un]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=l0(e);e!==null;){if(a=e[un])return a;e=l0(e)}return n}e=a,a=e.parentNode}return null}function ea(e){if(e=e[un]||e[Xn]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function hs(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function Na(e){var n=e[fs];return n||(n=e[fs]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function fn(e){e[Da]=!0}var sl=new Set,Yr={};function T(e,n){G(e,n),G(e+"Capture",n)}function G(e,n){for(Yr[e]=n,e=0;e<n.length;e++)sl.add(n[e])}var ut=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),$={},tt={};function Ot(e){return tn.call(tt,e)?!0:tn.call($,e)?!1:ut.test(e)?tt[e]=!0:($[e]=!0,!1)}function Gt(e,n,a){if(Ot(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function Ut(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function Ft(e,n,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+o)}}function zt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function oe(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function pe(e,n,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,f=o.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return u.call(this)},set:function(g){a=""+g,f.call(this,g)}}),Object.defineProperty(e,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(g){a=""+g},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function qt(e){if(!e._valueTracker){var n=oe(e)?"checked":"value";e._valueTracker=pe(e,n,""+e[n])}}function Te(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return e&&(o=oe(e)?e.checked?"true":"false":e.value),e=o,e!==a?(n.setValue(e),!0):!1}function Ze(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var qe=/[\n"\\]/g;function fe(e){return e.replace(qe,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function hn(e,n,a,o,u,f,g,A){e.name="",g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"?e.type=g:e.removeAttribute("type"),n!=null?g==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+zt(n)):e.value!==""+zt(n)&&(e.value=""+zt(n)):g!=="submit"&&g!=="reset"||e.removeAttribute("value"),n!=null?vn(e,g,zt(n)):a!=null?vn(e,g,zt(a)):o!=null&&e.removeAttribute("value"),u==null&&f!=null&&(e.defaultChecked=!!f),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),A!=null&&typeof A!="function"&&typeof A!="symbol"&&typeof A!="boolean"?e.name=""+zt(A):e.removeAttribute("name")}function Vt(e,n,a,o,u,f,g,A){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){qt(e);return}a=a!=null?""+zt(a):"",n=n!=null?""+zt(n):a,A||n===e.value||(e.value=n),e.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=A?e.checked:!!o,e.defaultChecked=!!o,g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"&&(e.name=g),qt(e)}function vn(e,n,a){n==="number"&&Ze(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function he(e,n,a,o){if(e=e.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=n.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&o&&(e[a].defaultSelected=!0)}else{for(a=""+zt(a),n=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}n!==null||e[u].disabled||(n=e[u])}n!==null&&(n.selected=!0)}}function In(e,n,a){if(n!=null&&(n=""+zt(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+zt(a):""}function ti(e,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if(j(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=zt(n),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),qt(e)}function Fn(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var La=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function De(e,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,a):typeof a!="number"||a===0||La.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function Je(e,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&De(e,u,o)}else for(var f in n)n.hasOwnProperty(f)&&De(e,f,n[f])}function fi(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var He=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),zi=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ri(e){return zi.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function hi(){}var nu=null;function iu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Vs=null,ks=null;function $d(e){var n=ea(e);if(n&&(e=n.stateNode)){var a=e[Rn]||null;t:switch(e=n.stateNode,n.type){case"input":if(hn(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+fe(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==e&&o.form===e.form){var u=o[Rn]||null;if(!u)throw Error(s(90));hn(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===e.form&&Te(o)}break t;case"textarea":In(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&he(e,!!a.multiple,n,!1)}}}var au=!1;function tp(e,n,a){if(au)return e(n,a);au=!0;try{var o=e(n);return o}finally{if(au=!1,(Vs!==null||ks!==null)&&(ql(),Vs&&(n=Vs,e=ks,ks=Vs=null,$d(n),e)))for(n=0;n<e.length;n++)$d(e[n])}}function Zr(e,n){var a=e.stateNode;if(a===null)return null;var o=a[Rn]||null;if(o===null)return null;a=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var na=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),su=!1;if(na)try{var Kr={};Object.defineProperty(Kr,"passive",{get:function(){su=!0}}),window.addEventListener("test",Kr,Kr),window.removeEventListener("test",Kr,Kr)}catch{su=!1}var Oa=null,ru=null,rl=null;function ep(){if(rl)return rl;var e,n=ru,a=n.length,o,u="value"in Oa?Oa.value:Oa.textContent,f=u.length;for(e=0;e<a&&n[e]===u[e];e++);var g=a-e;for(o=1;o<=g&&n[a-o]===u[f-o];o++);return rl=u.slice(e,1<o?1-o:void 0)}function ol(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function ll(){return!0}function np(){return!1}function Wn(e){function n(a,o,u,f,g){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=f,this.target=g,this.currentTarget=null;for(var A in e)e.hasOwnProperty(A)&&(a=e[A],this[A]=a?a(f):f[A]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?ll:np,this.isPropagationStopped=np,this}return v(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=ll)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=ll)},persist:function(){},isPersistent:ll}),n}var ds={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},cl=Wn(ds),Qr=v({},ds,{view:0,detail:0}),Ov=Wn(Qr),ou,lu,Jr,ul=v({},Qr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:uu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Jr&&(Jr&&e.type==="mousemove"?(ou=e.screenX-Jr.screenX,lu=e.screenY-Jr.screenY):lu=ou=0,Jr=e),ou)},movementY:function(e){return"movementY"in e?e.movementY:lu}}),ip=Wn(ul),Pv=v({},ul,{dataTransfer:0}),Iv=Wn(Pv),Fv=v({},Qr,{relatedTarget:0}),cu=Wn(Fv),zv=v({},ds,{animationName:0,elapsedTime:0,pseudoElement:0}),Bv=Wn(zv),Hv=v({},ds,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Gv=Wn(Hv),Vv=v({},ds,{data:0}),ap=Wn(Vv),kv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Xv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Wv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function qv(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Wv[e])?!!n[e]:!1}function uu(){return qv}var Yv=v({},Qr,{key:function(e){if(e.key){var n=kv[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=ol(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Xv[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:uu,charCode:function(e){return e.type==="keypress"?ol(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ol(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Zv=Wn(Yv),Kv=v({},ul,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),sp=Wn(Kv),Qv=v({},Qr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:uu}),Jv=Wn(Qv),jv=v({},ds,{propertyName:0,elapsedTime:0,pseudoElement:0}),$v=Wn(jv),tx=v({},ul,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),ex=Wn(tx),nx=v({},ds,{newState:0,oldState:0}),ix=Wn(nx),ax=[9,13,27,32],fu=na&&"CompositionEvent"in window,jr=null;na&&"documentMode"in document&&(jr=document.documentMode);var sx=na&&"TextEvent"in window&&!jr,rp=na&&(!fu||jr&&8<jr&&11>=jr),op=" ",lp=!1;function cp(e,n){switch(e){case"keyup":return ax.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function up(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Xs=!1;function rx(e,n){switch(e){case"compositionend":return up(n);case"keypress":return n.which!==32?null:(lp=!0,op);case"textInput":return e=n.data,e===op&&lp?null:e;default:return null}}function ox(e,n){if(Xs)return e==="compositionend"||!fu&&cp(e,n)?(e=ep(),rl=ru=Oa=null,Xs=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return rp&&n.locale!=="ko"?null:n.data;default:return null}}var lx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function fp(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!lx[e.type]:n==="textarea"}function hp(e,n,a,o){Vs?ks?ks.push(o):ks=[o]:Vs=o,n=$l(n,"onChange"),0<n.length&&(a=new cl("onChange","change",null,a,o),e.push({event:a,listeners:n}))}var $r=null,to=null;function cx(e){Zg(e,0)}function fl(e){var n=hs(e);if(Te(n))return e}function dp(e,n){if(e==="change")return n}var pp=!1;if(na){var hu;if(na){var du="oninput"in document;if(!du){var mp=document.createElement("div");mp.setAttribute("oninput","return;"),du=typeof mp.oninput=="function"}hu=du}else hu=!1;pp=hu&&(!document.documentMode||9<document.documentMode)}function gp(){$r&&($r.detachEvent("onpropertychange",_p),to=$r=null)}function _p(e){if(e.propertyName==="value"&&fl(to)){var n=[];hp(n,to,e,iu(e)),tp(cx,n)}}function ux(e,n,a){e==="focusin"?(gp(),$r=n,to=a,$r.attachEvent("onpropertychange",_p)):e==="focusout"&&gp()}function fx(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return fl(to)}function hx(e,n){if(e==="click")return fl(n)}function dx(e,n){if(e==="input"||e==="change")return fl(n)}function px(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var ei=typeof Object.is=="function"?Object.is:px;function eo(e,n){if(ei(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!tn.call(n,u)||!ei(e[u],n[u]))return!1}return!0}function vp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function xp(e,n){var a=vp(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=n&&o>=n)return{node:a,offset:n-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=vp(a)}}function Sp(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Sp(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Mp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=Ze(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=Ze(e.document)}return n}function pu(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var mx=na&&"documentMode"in document&&11>=document.documentMode,Ws=null,mu=null,no=null,gu=!1;function yp(e,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;gu||Ws==null||Ws!==Ze(o)||(o=Ws,"selectionStart"in o&&pu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),no&&eo(no,o)||(no=o,o=$l(mu,"onSelect"),0<o.length&&(n=new cl("onSelect","select",null,n,a),e.push({event:n,listeners:o}),n.target=Ws)))}function ps(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var qs={animationend:ps("Animation","AnimationEnd"),animationiteration:ps("Animation","AnimationIteration"),animationstart:ps("Animation","AnimationStart"),transitionrun:ps("Transition","TransitionRun"),transitionstart:ps("Transition","TransitionStart"),transitioncancel:ps("Transition","TransitionCancel"),transitionend:ps("Transition","TransitionEnd")},_u={},Ep={};na&&(Ep=document.createElement("div").style,"AnimationEvent"in window||(delete qs.animationend.animation,delete qs.animationiteration.animation,delete qs.animationstart.animation),"TransitionEvent"in window||delete qs.transitionend.transition);function ms(e){if(_u[e])return _u[e];if(!qs[e])return e;var n=qs[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in Ep)return _u[e]=n[a];return e}var bp=ms("animationend"),Tp=ms("animationiteration"),Ap=ms("animationstart"),gx=ms("transitionrun"),_x=ms("transitionstart"),vx=ms("transitioncancel"),Rp=ms("transitionend"),Cp=new Map,vu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");vu.push("scrollEnd");function Ci(e,n){Cp.set(e,n),T(n,[e])}var hl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},di=[],Ys=0,xu=0;function dl(){for(var e=Ys,n=xu=Ys=0;n<e;){var a=di[n];di[n++]=null;var o=di[n];di[n++]=null;var u=di[n];di[n++]=null;var f=di[n];if(di[n++]=null,o!==null&&u!==null){var g=o.pending;g===null?u.next=u:(u.next=g.next,g.next=u),o.pending=u}f!==0&&wp(a,u,f)}}function pl(e,n,a,o){di[Ys++]=e,di[Ys++]=n,di[Ys++]=a,di[Ys++]=o,xu|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Su(e,n,a,o){return pl(e,n,a,o),ml(e)}function gs(e,n){return pl(e,null,null,n),ml(e)}function wp(e,n,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var u=!1,f=e.return;f!==null;)f.childLanes|=a,o=f.alternate,o!==null&&(o.childLanes|=a),f.tag===22&&(e=f.stateNode,e===null||e._visibility&1||(u=!0)),e=f,f=f.return;return e.tag===3?(f=e.stateNode,u&&n!==null&&(u=31-Ht(a),e=f.hiddenUpdates,o=e[u],o===null?e[u]=[n]:o.push(n),n.lane=a|536870912),f):null}function ml(e){if(50<To)throw To=0,Df=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Zs={};function xx(e,n,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ni(e,n,a,o){return new xx(e,n,a,o)}function Mu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ia(e,n){var a=e.alternate;return a===null?(a=ni(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Dp(e,n){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function gl(e,n,a,o,u,f){var g=0;if(o=e,typeof e=="function")Mu(e)&&(g=1);else if(typeof e=="string")g=bS(e,a,Et.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case O:return e=ni(31,a,n,u),e.elementType=O,e.lanes=f,e;case N:return _s(a.children,u,f,n);case y:g=8,u|=24;break;case S:return e=ni(12,a,n,u|2),e.elementType=S,e.lanes=f,e;case U:return e=ni(13,a,n,u),e.elementType=U,e.lanes=f,e;case C:return e=ni(19,a,n,u),e.elementType=C,e.lanes=f,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case B:g=10;break t;case I:g=9;break t;case D:g=11;break t;case P:g=14;break t;case b:g=16,o=null;break t}g=29,a=Error(s(130,e===null?"null":typeof e,"")),o=null}return n=ni(g,a,n,u),n.elementType=e,n.type=o,n.lanes=f,n}function _s(e,n,a,o){return e=ni(7,e,o,n),e.lanes=a,e}function yu(e,n,a){return e=ni(6,e,null,n),e.lanes=a,e}function Up(e){var n=ni(18,null,null,0);return n.stateNode=e,n}function Eu(e,n,a){return n=ni(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var Np=new WeakMap;function pi(e,n){if(typeof e=="object"&&e!==null){var a=Np.get(e);return a!==void 0?a:(n={value:e,source:n,stack:Xe(n)},Np.set(e,n),n)}return{value:e,source:n,stack:Xe(n)}}var Ks=[],Qs=0,_l=null,io=0,mi=[],gi=0,Pa=null,Bi=1,Hi="";function aa(e,n){Ks[Qs++]=io,Ks[Qs++]=_l,_l=e,io=n}function Lp(e,n,a){mi[gi++]=Bi,mi[gi++]=Hi,mi[gi++]=Pa,Pa=e;var o=Bi;e=Hi;var u=32-Ht(o)-1;o&=~(1<<u),a+=1;var f=32-Ht(n)+u;if(30<f){var g=u-u%5;f=(o&(1<<g)-1).toString(32),o>>=g,u-=g,Bi=1<<32-Ht(n)+u|a<<u|o,Hi=f+e}else Bi=1<<f|a<<u|o,Hi=e}function bu(e){e.return!==null&&(aa(e,1),Lp(e,1,0))}function Tu(e){for(;e===_l;)_l=Ks[--Qs],Ks[Qs]=null,io=Ks[--Qs],Ks[Qs]=null;for(;e===Pa;)Pa=mi[--gi],mi[gi]=null,Hi=mi[--gi],mi[gi]=null,Bi=mi[--gi],mi[gi]=null}function Op(e,n){mi[gi++]=Bi,mi[gi++]=Hi,mi[gi++]=Pa,Bi=n.id,Hi=n.overflow,Pa=e}var Cn=null,Ke=null,ye=!1,Ia=null,_i=!1,Au=Error(s(519));function Fa(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ao(pi(n,e)),Au}function Pp(e){var n=e.stateNode,a=e.type,o=e.memoizedProps;switch(n[un]=e,n[Rn]=o,a){case"dialog":ve("cancel",n),ve("close",n);break;case"iframe":case"object":case"embed":ve("load",n);break;case"video":case"audio":for(a=0;a<Ro.length;a++)ve(Ro[a],n);break;case"source":ve("error",n);break;case"img":case"image":case"link":ve("error",n),ve("load",n);break;case"details":ve("toggle",n);break;case"input":ve("invalid",n),Vt(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":ve("invalid",n);break;case"textarea":ve("invalid",n),ti(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||jg(n.textContent,a)?(o.popover!=null&&(ve("beforetoggle",n),ve("toggle",n)),o.onScroll!=null&&ve("scroll",n),o.onScrollEnd!=null&&ve("scrollend",n),o.onClick!=null&&(n.onclick=hi),n=!0):n=!1,n||Fa(e,!0)}function Ip(e){for(Cn=e.return;Cn;)switch(Cn.tag){case 5:case 31:case 13:_i=!1;return;case 27:case 3:_i=!0;return;default:Cn=Cn.return}}function Js(e){if(e!==Cn)return!1;if(!ye)return Ip(e),ye=!0,!1;var n=e.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||Wf(e.type,e.memoizedProps)),a=!a),a&&Ke&&Fa(e),Ip(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Ke=o0(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Ke=o0(e)}else n===27?(n=Ke,Ja(e.type)?(e=Qf,Qf=null,Ke=e):Ke=n):Ke=Cn?xi(e.stateNode.nextSibling):null;return!0}function vs(){Ke=Cn=null,ye=!1}function Ru(){var e=Ia;return e!==null&&(Kn===null?Kn=e:Kn.push.apply(Kn,e),Ia=null),e}function ao(e){Ia===null?Ia=[e]:Ia.push(e)}var Cu=w(null),xs=null,sa=null;function za(e,n,a){gt(Cu,n._currentValue),n._currentValue=a}function ra(e){e._currentValue=Cu.current,J(Cu)}function wu(e,n,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===a)break;e=e.return}}function Du(e,n,a,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var f=u.dependencies;if(f!==null){var g=u.child;f=f.firstContext;t:for(;f!==null;){var A=f;f=u;for(var z=0;z<n.length;z++)if(A.context===n[z]){f.lanes|=a,A=f.alternate,A!==null&&(A.lanes|=a),wu(f.return,a,e),o||(g=null);break t}f=A.next}}else if(u.tag===18){if(g=u.return,g===null)throw Error(s(341));g.lanes|=a,f=g.alternate,f!==null&&(f.lanes|=a),wu(g,a,e),g=null}else g=u.child;if(g!==null)g.return=u;else for(g=u;g!==null;){if(g===e){g=null;break}if(u=g.sibling,u!==null){u.return=g.return,g=u;break}g=g.return}u=g}}function js(e,n,a,o){e=null;for(var u=n,f=!1;u!==null;){if(!f){if((u.flags&524288)!==0)f=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var g=u.alternate;if(g===null)throw Error(s(387));if(g=g.memoizedProps,g!==null){var A=u.type;ei(u.pendingProps.value,g.value)||(e!==null?e.push(A):e=[A])}}else if(u===it.current){if(g=u.alternate,g===null)throw Error(s(387));g.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(No):e=[No])}u=u.return}e!==null&&Du(n,e,a,o),n.flags|=262144}function vl(e){for(e=e.firstContext;e!==null;){if(!ei(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ss(e){xs=e,sa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function wn(e){return Fp(xs,e)}function xl(e,n){return xs===null&&Ss(e),Fp(e,n)}function Fp(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},sa===null){if(e===null)throw Error(s(308));sa=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else sa=sa.next=n;return a}var Sx=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},Mx=r.unstable_scheduleCallback,yx=r.unstable_NormalPriority,dn={$$typeof:B,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Uu(){return{controller:new Sx,data:new Map,refCount:0}}function so(e){e.refCount--,e.refCount===0&&Mx(yx,function(){e.controller.abort()})}var ro=null,Nu=0,$s=0,tr=null;function Ex(e,n){if(ro===null){var a=ro=[];Nu=0,$s=If(),tr={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Nu++,n.then(zp,zp),n}function zp(){if(--Nu===0&&ro!==null){tr!==null&&(tr.status="fulfilled");var e=ro;ro=null,$s=0,tr=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function bx(e,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var Bp=F.S;F.S=function(e,n){yg=Le(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Ex(e,n),Bp!==null&&Bp(e,n)};var Ms=w(null);function Lu(){var e=Ms.current;return e!==null?e:Ye.pooledCache}function Sl(e,n){n===null?gt(Ms,Ms.current):gt(Ms,n.pool)}function Hp(){var e=Lu();return e===null?null:{parent:dn._currentValue,pool:e}}var er=Error(s(460)),Ou=Error(s(474)),Ml=Error(s(542)),yl={then:function(){}};function Gp(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Vp(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(hi,hi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Xp(e),e;default:if(typeof n.status=="string")n.then(hi,hi);else{if(e=Ye,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Xp(e),e}throw Es=n,er}}function ys(e){try{var n=e._init;return n(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Es=a,er):a}}var Es=null;function kp(){if(Es===null)throw Error(s(459));var e=Es;return Es=null,e}function Xp(e){if(e===er||e===Ml)throw Error(s(483))}var nr=null,oo=0;function El(e){var n=oo;return oo+=1,nr===null&&(nr=[]),Vp(nr,e,n)}function lo(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function bl(e,n){throw n.$$typeof===_?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function Wp(e){function n(Z,V){if(e){var nt=Z.deletions;nt===null?(Z.deletions=[V],Z.flags|=16):nt.push(V)}}function a(Z,V){if(!e)return null;for(;V!==null;)n(Z,V),V=V.sibling;return null}function o(Z){for(var V=new Map;Z!==null;)Z.key!==null?V.set(Z.key,Z):V.set(Z.index,Z),Z=Z.sibling;return V}function u(Z,V){return Z=ia(Z,V),Z.index=0,Z.sibling=null,Z}function f(Z,V,nt){return Z.index=nt,e?(nt=Z.alternate,nt!==null?(nt=nt.index,nt<V?(Z.flags|=67108866,V):nt):(Z.flags|=67108866,V)):(Z.flags|=1048576,V)}function g(Z){return e&&Z.alternate===null&&(Z.flags|=67108866),Z}function A(Z,V,nt,St){return V===null||V.tag!==6?(V=yu(nt,Z.mode,St),V.return=Z,V):(V=u(V,nt),V.return=Z,V)}function z(Z,V,nt,St){var jt=nt.type;return jt===N?vt(Z,V,nt.props.children,St,nt.key):V!==null&&(V.elementType===jt||typeof jt=="object"&&jt!==null&&jt.$$typeof===b&&ys(jt)===V.type)?(V=u(V,nt.props),lo(V,nt),V.return=Z,V):(V=gl(nt.type,nt.key,nt.props,null,Z.mode,St),lo(V,nt),V.return=Z,V)}function at(Z,V,nt,St){return V===null||V.tag!==4||V.stateNode.containerInfo!==nt.containerInfo||V.stateNode.implementation!==nt.implementation?(V=Eu(nt,Z.mode,St),V.return=Z,V):(V=u(V,nt.children||[]),V.return=Z,V)}function vt(Z,V,nt,St,jt){return V===null||V.tag!==7?(V=_s(nt,Z.mode,St,jt),V.return=Z,V):(V=u(V,nt),V.return=Z,V)}function Mt(Z,V,nt){if(typeof V=="string"&&V!==""||typeof V=="number"||typeof V=="bigint")return V=yu(""+V,Z.mode,nt),V.return=Z,V;if(typeof V=="object"&&V!==null){switch(V.$$typeof){case E:return nt=gl(V.type,V.key,V.props,null,Z.mode,nt),lo(nt,V),nt.return=Z,nt;case R:return V=Eu(V,Z.mode,nt),V.return=Z,V;case b:return V=ys(V),Mt(Z,V,nt)}if(j(V)||Q(V))return V=_s(V,Z.mode,nt,null),V.return=Z,V;if(typeof V.then=="function")return Mt(Z,El(V),nt);if(V.$$typeof===B)return Mt(Z,xl(Z,V),nt);bl(Z,V)}return null}function ot(Z,V,nt,St){var jt=V!==null?V.key:null;if(typeof nt=="string"&&nt!==""||typeof nt=="number"||typeof nt=="bigint")return jt!==null?null:A(Z,V,""+nt,St);if(typeof nt=="object"&&nt!==null){switch(nt.$$typeof){case E:return nt.key===jt?z(Z,V,nt,St):null;case R:return nt.key===jt?at(Z,V,nt,St):null;case b:return nt=ys(nt),ot(Z,V,nt,St)}if(j(nt)||Q(nt))return jt!==null?null:vt(Z,V,nt,St,null);if(typeof nt.then=="function")return ot(Z,V,El(nt),St);if(nt.$$typeof===B)return ot(Z,V,xl(Z,nt),St);bl(Z,nt)}return null}function ft(Z,V,nt,St,jt){if(typeof St=="string"&&St!==""||typeof St=="number"||typeof St=="bigint")return Z=Z.get(nt)||null,A(V,Z,""+St,jt);if(typeof St=="object"&&St!==null){switch(St.$$typeof){case E:return Z=Z.get(St.key===null?nt:St.key)||null,z(V,Z,St,jt);case R:return Z=Z.get(St.key===null?nt:St.key)||null,at(V,Z,St,jt);case b:return St=ys(St),ft(Z,V,nt,St,jt)}if(j(St)||Q(St))return Z=Z.get(nt)||null,vt(V,Z,St,jt,null);if(typeof St.then=="function")return ft(Z,V,nt,El(St),jt);if(St.$$typeof===B)return ft(Z,V,nt,xl(V,St),jt);bl(V,St)}return null}function Yt(Z,V,nt,St){for(var jt=null,Ae=null,Zt=V,ue=V=0,Me=null;Zt!==null&&ue<nt.length;ue++){Zt.index>ue?(Me=Zt,Zt=null):Me=Zt.sibling;var Re=ot(Z,Zt,nt[ue],St);if(Re===null){Zt===null&&(Zt=Me);break}e&&Zt&&Re.alternate===null&&n(Z,Zt),V=f(Re,V,ue),Ae===null?jt=Re:Ae.sibling=Re,Ae=Re,Zt=Me}if(ue===nt.length)return a(Z,Zt),ye&&aa(Z,ue),jt;if(Zt===null){for(;ue<nt.length;ue++)Zt=Mt(Z,nt[ue],St),Zt!==null&&(V=f(Zt,V,ue),Ae===null?jt=Zt:Ae.sibling=Zt,Ae=Zt);return ye&&aa(Z,ue),jt}for(Zt=o(Zt);ue<nt.length;ue++)Me=ft(Zt,Z,ue,nt[ue],St),Me!==null&&(e&&Me.alternate!==null&&Zt.delete(Me.key===null?ue:Me.key),V=f(Me,V,ue),Ae===null?jt=Me:Ae.sibling=Me,Ae=Me);return e&&Zt.forEach(function(ns){return n(Z,ns)}),ye&&aa(Z,ue),jt}function $t(Z,V,nt,St){if(nt==null)throw Error(s(151));for(var jt=null,Ae=null,Zt=V,ue=V=0,Me=null,Re=nt.next();Zt!==null&&!Re.done;ue++,Re=nt.next()){Zt.index>ue?(Me=Zt,Zt=null):Me=Zt.sibling;var ns=ot(Z,Zt,Re.value,St);if(ns===null){Zt===null&&(Zt=Me);break}e&&Zt&&ns.alternate===null&&n(Z,Zt),V=f(ns,V,ue),Ae===null?jt=ns:Ae.sibling=ns,Ae=ns,Zt=Me}if(Re.done)return a(Z,Zt),ye&&aa(Z,ue),jt;if(Zt===null){for(;!Re.done;ue++,Re=nt.next())Re=Mt(Z,Re.value,St),Re!==null&&(V=f(Re,V,ue),Ae===null?jt=Re:Ae.sibling=Re,Ae=Re);return ye&&aa(Z,ue),jt}for(Zt=o(Zt);!Re.done;ue++,Re=nt.next())Re=ft(Zt,Z,ue,Re.value,St),Re!==null&&(e&&Re.alternate!==null&&Zt.delete(Re.key===null?ue:Re.key),V=f(Re,V,ue),Ae===null?jt=Re:Ae.sibling=Re,Ae=Re);return e&&Zt.forEach(function(PS){return n(Z,PS)}),ye&&aa(Z,ue),jt}function ke(Z,V,nt,St){if(typeof nt=="object"&&nt!==null&&nt.type===N&&nt.key===null&&(nt=nt.props.children),typeof nt=="object"&&nt!==null){switch(nt.$$typeof){case E:t:{for(var jt=nt.key;V!==null;){if(V.key===jt){if(jt=nt.type,jt===N){if(V.tag===7){a(Z,V.sibling),St=u(V,nt.props.children),St.return=Z,Z=St;break t}}else if(V.elementType===jt||typeof jt=="object"&&jt!==null&&jt.$$typeof===b&&ys(jt)===V.type){a(Z,V.sibling),St=u(V,nt.props),lo(St,nt),St.return=Z,Z=St;break t}a(Z,V);break}else n(Z,V);V=V.sibling}nt.type===N?(St=_s(nt.props.children,Z.mode,St,nt.key),St.return=Z,Z=St):(St=gl(nt.type,nt.key,nt.props,null,Z.mode,St),lo(St,nt),St.return=Z,Z=St)}return g(Z);case R:t:{for(jt=nt.key;V!==null;){if(V.key===jt)if(V.tag===4&&V.stateNode.containerInfo===nt.containerInfo&&V.stateNode.implementation===nt.implementation){a(Z,V.sibling),St=u(V,nt.children||[]),St.return=Z,Z=St;break t}else{a(Z,V);break}else n(Z,V);V=V.sibling}St=Eu(nt,Z.mode,St),St.return=Z,Z=St}return g(Z);case b:return nt=ys(nt),ke(Z,V,nt,St)}if(j(nt))return Yt(Z,V,nt,St);if(Q(nt)){if(jt=Q(nt),typeof jt!="function")throw Error(s(150));return nt=jt.call(nt),$t(Z,V,nt,St)}if(typeof nt.then=="function")return ke(Z,V,El(nt),St);if(nt.$$typeof===B)return ke(Z,V,xl(Z,nt),St);bl(Z,nt)}return typeof nt=="string"&&nt!==""||typeof nt=="number"||typeof nt=="bigint"?(nt=""+nt,V!==null&&V.tag===6?(a(Z,V.sibling),St=u(V,nt),St.return=Z,Z=St):(a(Z,V),St=yu(nt,Z.mode,St),St.return=Z,Z=St),g(Z)):a(Z,V)}return function(Z,V,nt,St){try{oo=0;var jt=ke(Z,V,nt,St);return nr=null,jt}catch(Zt){if(Zt===er||Zt===Ml)throw Zt;var Ae=ni(29,Zt,null,Z.mode);return Ae.lanes=St,Ae.return=Z,Ae}}}var bs=Wp(!0),qp=Wp(!1),Ba=!1;function Pu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Iu(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ha(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ga(e,n,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Ue&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=ml(e),wp(e,null,a),n}return pl(e,o,n,a),ml(e)}function co(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,kn(e,a)}}function Fu(e,n){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var g={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?u=f=g:f=f.next=g,a=a.next}while(a!==null);f===null?u=f=n:f=f.next=n}else u=f=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var zu=!1;function uo(){if(zu){var e=tr;if(e!==null)throw e}}function fo(e,n,a,o){zu=!1;var u=e.updateQueue;Ba=!1;var f=u.firstBaseUpdate,g=u.lastBaseUpdate,A=u.shared.pending;if(A!==null){u.shared.pending=null;var z=A,at=z.next;z.next=null,g===null?f=at:g.next=at,g=z;var vt=e.alternate;vt!==null&&(vt=vt.updateQueue,A=vt.lastBaseUpdate,A!==g&&(A===null?vt.firstBaseUpdate=at:A.next=at,vt.lastBaseUpdate=z))}if(f!==null){var Mt=u.baseState;g=0,vt=at=z=null,A=f;do{var ot=A.lane&-536870913,ft=ot!==A.lane;if(ft?(Se&ot)===ot:(o&ot)===ot){ot!==0&&ot===$s&&(zu=!0),vt!==null&&(vt=vt.next={lane:0,tag:A.tag,payload:A.payload,callback:null,next:null});t:{var Yt=e,$t=A;ot=n;var ke=a;switch($t.tag){case 1:if(Yt=$t.payload,typeof Yt=="function"){Mt=Yt.call(ke,Mt,ot);break t}Mt=Yt;break t;case 3:Yt.flags=Yt.flags&-65537|128;case 0:if(Yt=$t.payload,ot=typeof Yt=="function"?Yt.call(ke,Mt,ot):Yt,ot==null)break t;Mt=v({},Mt,ot);break t;case 2:Ba=!0}}ot=A.callback,ot!==null&&(e.flags|=64,ft&&(e.flags|=8192),ft=u.callbacks,ft===null?u.callbacks=[ot]:ft.push(ot))}else ft={lane:ot,tag:A.tag,payload:A.payload,callback:A.callback,next:null},vt===null?(at=vt=ft,z=Mt):vt=vt.next=ft,g|=ot;if(A=A.next,A===null){if(A=u.shared.pending,A===null)break;ft=A,A=ft.next,ft.next=null,u.lastBaseUpdate=ft,u.shared.pending=null}}while(!0);vt===null&&(z=Mt),u.baseState=z,u.firstBaseUpdate=at,u.lastBaseUpdate=vt,f===null&&(u.shared.lanes=0),qa|=g,e.lanes=g,e.memoizedState=Mt}}function Yp(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function Zp(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Yp(a[e],n)}var ir=w(null),Tl=w(0);function Kp(e,n){e=ma,gt(Tl,e),gt(ir,n),ma=e|n.baseLanes}function Bu(){gt(Tl,ma),gt(ir,ir.current)}function Hu(){ma=Tl.current,J(ir),J(Tl)}var ii=w(null),vi=null;function Va(e){var n=e.alternate;gt(on,on.current&1),gt(ii,e),vi===null&&(n===null||ir.current!==null||n.memoizedState!==null)&&(vi=e)}function Gu(e){gt(on,on.current),gt(ii,e),vi===null&&(vi=e)}function Qp(e){e.tag===22?(gt(on,on.current),gt(ii,e),vi===null&&(vi=e)):ka()}function ka(){gt(on,on.current),gt(ii,ii.current)}function ai(e){J(ii),vi===e&&(vi=null),J(on)}var on=w(0);function Al(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Zf(a)||Kf(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var oa=0,ce=null,Ge=null,pn=null,Rl=!1,ar=!1,Ts=!1,Cl=0,ho=0,sr=null,Tx=0;function nn(){throw Error(s(321))}function Vu(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!ei(e[a],n[a]))return!1;return!0}function ku(e,n,a,o,u,f){return oa=f,ce=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,F.H=e===null||e.memoizedState===null?Lm:sf,Ts=!1,f=a(o,u),Ts=!1,ar&&(f=jp(n,a,o,u)),Jp(e),f}function Jp(e){F.H=go;var n=Ge!==null&&Ge.next!==null;if(oa=0,pn=Ge=ce=null,Rl=!1,ho=0,sr=null,n)throw Error(s(300));e===null||mn||(e=e.dependencies,e!==null&&vl(e)&&(mn=!0))}function jp(e,n,a,o){ce=e;var u=0;do{if(ar&&(sr=null),ho=0,ar=!1,25<=u)throw Error(s(301));if(u+=1,pn=Ge=null,e.updateQueue!=null){var f=e.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}F.H=Om,f=n(a,o)}while(ar);return f}function Ax(){var e=F.H,n=e.useState()[0];return n=typeof n.then=="function"?po(n):n,e=e.useState()[0],(Ge!==null?Ge.memoizedState:null)!==e&&(ce.flags|=1024),n}function Xu(){var e=Cl!==0;return Cl=0,e}function Wu(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function qu(e){if(Rl){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}Rl=!1}oa=0,pn=Ge=ce=null,ar=!1,ho=Cl=0,sr=null}function zn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return pn===null?ce.memoizedState=pn=e:pn=pn.next=e,pn}function ln(){if(Ge===null){var e=ce.alternate;e=e!==null?e.memoizedState:null}else e=Ge.next;var n=pn===null?ce.memoizedState:pn.next;if(n!==null)pn=n,Ge=e;else{if(e===null)throw ce.alternate===null?Error(s(467)):Error(s(310));Ge=e,e={memoizedState:Ge.memoizedState,baseState:Ge.baseState,baseQueue:Ge.baseQueue,queue:Ge.queue,next:null},pn===null?ce.memoizedState=pn=e:pn=pn.next=e}return pn}function wl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function po(e){var n=ho;return ho+=1,sr===null&&(sr=[]),e=Vp(sr,e,n),n=ce,(pn===null?n.memoizedState:pn.next)===null&&(n=n.alternate,F.H=n===null||n.memoizedState===null?Lm:sf),e}function Dl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return po(e);if(e.$$typeof===B)return wn(e)}throw Error(s(438,String(e)))}function Yu(e){var n=null,a=ce.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=ce.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=wl(),ce.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),o=0;o<e;o++)a[o]=W;return n.index++,a}function la(e,n){return typeof n=="function"?n(e):n}function Ul(e){var n=ln();return Zu(n,Ge,e)}function Zu(e,n,a){var o=e.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=e.baseQueue,f=o.pending;if(f!==null){if(u!==null){var g=u.next;u.next=f.next,f.next=g}n.baseQueue=u=f,o.pending=null}if(f=e.baseState,u===null)e.memoizedState=f;else{n=u.next;var A=g=null,z=null,at=n,vt=!1;do{var Mt=at.lane&-536870913;if(Mt!==at.lane?(Se&Mt)===Mt:(oa&Mt)===Mt){var ot=at.revertLane;if(ot===0)z!==null&&(z=z.next={lane:0,revertLane:0,gesture:null,action:at.action,hasEagerState:at.hasEagerState,eagerState:at.eagerState,next:null}),Mt===$s&&(vt=!0);else if((oa&ot)===ot){at=at.next,ot===$s&&(vt=!0);continue}else Mt={lane:0,revertLane:at.revertLane,gesture:null,action:at.action,hasEagerState:at.hasEagerState,eagerState:at.eagerState,next:null},z===null?(A=z=Mt,g=f):z=z.next=Mt,ce.lanes|=ot,qa|=ot;Mt=at.action,Ts&&a(f,Mt),f=at.hasEagerState?at.eagerState:a(f,Mt)}else ot={lane:Mt,revertLane:at.revertLane,gesture:at.gesture,action:at.action,hasEagerState:at.hasEagerState,eagerState:at.eagerState,next:null},z===null?(A=z=ot,g=f):z=z.next=ot,ce.lanes|=Mt,qa|=Mt;at=at.next}while(at!==null&&at!==n);if(z===null?g=f:z.next=A,!ei(f,e.memoizedState)&&(mn=!0,vt&&(a=tr,a!==null)))throw a;e.memoizedState=f,e.baseState=g,e.baseQueue=z,o.lastRenderedState=f}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function Ku(e){var n=ln(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var o=a.dispatch,u=a.pending,f=n.memoizedState;if(u!==null){a.pending=null;var g=u=u.next;do f=e(f,g.action),g=g.next;while(g!==u);ei(f,n.memoizedState)||(mn=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,o]}function $p(e,n,a){var o=ce,u=ln(),f=ye;if(f){if(a===void 0)throw Error(s(407));a=a()}else a=n();var g=!ei((Ge||u).memoizedState,a);if(g&&(u.memoizedState=a,mn=!0),u=u.queue,ju(nm.bind(null,o,u,e),[e]),u.getSnapshot!==n||g||pn!==null&&pn.memoizedState.tag&1){if(o.flags|=2048,rr(9,{destroy:void 0},em.bind(null,o,u,a,n),null),Ye===null)throw Error(s(349));f||(oa&127)!==0||tm(o,n,a)}return a}function tm(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=ce.updateQueue,n===null?(n=wl(),ce.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function em(e,n,a,o){n.value=a,n.getSnapshot=o,im(n)&&am(e)}function nm(e,n,a){return a(function(){im(n)&&am(e)})}function im(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!ei(e,a)}catch{return!0}}function am(e){var n=gs(e,2);n!==null&&Qn(n,e,2)}function Qu(e){var n=zn();if(typeof e=="function"){var a=e;if(e=a(),Ts){At(!0);try{a()}finally{At(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:e},n}function sm(e,n,a,o){return e.baseState=a,Zu(e,Ge,typeof o=="function"?o:la)}function Rx(e,n,a,o,u){if(Ol(e))throw Error(s(485));if(e=n.action,e!==null){var f={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(g){f.listeners.push(g)}};F.T!==null?a(!0):f.isTransition=!1,o(f),a=n.pending,a===null?(f.next=n.pending=f,rm(n,f)):(f.next=a.next,n.pending=a.next=f)}}function rm(e,n){var a=n.action,o=n.payload,u=e.state;if(n.isTransition){var f=F.T,g={};F.T=g;try{var A=a(u,o),z=F.S;z!==null&&z(g,A),om(e,n,A)}catch(at){Ju(e,n,at)}finally{f!==null&&g.types!==null&&(f.types=g.types),F.T=f}}else try{f=a(u,o),om(e,n,f)}catch(at){Ju(e,n,at)}}function om(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){lm(e,n,o)},function(o){return Ju(e,n,o)}):lm(e,n,a)}function lm(e,n,a){n.status="fulfilled",n.value=a,cm(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,rm(e,a)))}function Ju(e,n,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,cm(n),n=n.next;while(n!==o)}e.action=null}function cm(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function um(e,n){return n}function fm(e,n){if(ye){var a=Ye.formState;if(a!==null){t:{var o=ce;if(ye){if(Ke){e:{for(var u=Ke,f=_i;u.nodeType!==8;){if(!f){u=null;break e}if(u=xi(u.nextSibling),u===null){u=null;break e}}f=u.data,u=f==="F!"||f==="F"?u:null}if(u){Ke=xi(u.nextSibling),o=u.data==="F!";break t}}Fa(o)}o=!1}o&&(n=a[0])}}return a=zn(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:um,lastRenderedState:n},a.queue=o,a=Dm.bind(null,ce,o),o.dispatch=a,o=Qu(!1),f=af.bind(null,ce,!1,o.queue),o=zn(),u={state:n,dispatch:null,action:e,pending:null},o.queue=u,a=Rx.bind(null,ce,u,f,a),u.dispatch=a,o.memoizedState=e,[n,a,!1]}function hm(e){var n=ln();return dm(n,Ge,e)}function dm(e,n,a){if(n=Zu(e,n,um)[0],e=Ul(la)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=po(n)}catch(g){throw g===er?Ml:g}else o=n;n=ln();var u=n.queue,f=u.dispatch;return a!==n.memoizedState&&(ce.flags|=2048,rr(9,{destroy:void 0},Cx.bind(null,u,a),null)),[o,f,e]}function Cx(e,n){e.action=n}function pm(e){var n=ln(),a=Ge;if(a!==null)return dm(n,a,e);ln(),n=n.memoizedState,a=ln();var o=a.queue.dispatch;return a.memoizedState=e,[n,o,!1]}function rr(e,n,a,o){return e={tag:e,create:a,deps:o,inst:n,next:null},n=ce.updateQueue,n===null&&(n=wl(),ce.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,n.lastEffect=e),e}function mm(){return ln().memoizedState}function Nl(e,n,a,o){var u=zn();ce.flags|=e,u.memoizedState=rr(1|n,{destroy:void 0},a,o===void 0?null:o)}function Ll(e,n,a,o){var u=ln();o=o===void 0?null:o;var f=u.memoizedState.inst;Ge!==null&&o!==null&&Vu(o,Ge.memoizedState.deps)?u.memoizedState=rr(n,f,a,o):(ce.flags|=e,u.memoizedState=rr(1|n,f,a,o))}function gm(e,n){Nl(8390656,8,e,n)}function ju(e,n){Ll(2048,8,e,n)}function wx(e){ce.flags|=4;var n=ce.updateQueue;if(n===null)n=wl(),ce.updateQueue=n,n.events=[e];else{var a=n.events;a===null?n.events=[e]:a.push(e)}}function _m(e){var n=ln().memoizedState;return wx({ref:n,nextImpl:e}),function(){if((Ue&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function vm(e,n){return Ll(4,2,e,n)}function xm(e,n){return Ll(4,4,e,n)}function Sm(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Mm(e,n,a){a=a!=null?a.concat([e]):null,Ll(4,4,Sm.bind(null,n,e),a)}function $u(){}function ym(e,n){var a=ln();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&Vu(n,o[1])?o[0]:(a.memoizedState=[e,n],e)}function Em(e,n){var a=ln();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&Vu(n,o[1]))return o[0];if(o=e(),Ts){At(!0);try{e()}finally{At(!1)}}return a.memoizedState=[o,n],o}function tf(e,n,a){return a===void 0||(oa&1073741824)!==0&&(Se&261930)===0?e.memoizedState=n:(e.memoizedState=a,e=bg(),ce.lanes|=e,qa|=e,a)}function bm(e,n,a,o){return ei(a,n)?a:ir.current!==null?(e=tf(e,a,o),ei(e,n)||(mn=!0),e):(oa&42)===0||(oa&1073741824)!==0&&(Se&261930)===0?(mn=!0,e.memoizedState=a):(e=bg(),ce.lanes|=e,qa|=e,n)}function Tm(e,n,a,o,u){var f=H.p;H.p=f!==0&&8>f?f:8;var g=F.T,A={};F.T=A,af(e,!1,n,a);try{var z=u(),at=F.S;if(at!==null&&at(A,z),z!==null&&typeof z=="object"&&typeof z.then=="function"){var vt=bx(z,o);mo(e,n,vt,oi(e))}else mo(e,n,o,oi(e))}catch(Mt){mo(e,n,{then:function(){},status:"rejected",reason:Mt},oi())}finally{H.p=f,g!==null&&A.types!==null&&(g.types=A.types),F.T=g}}function Dx(){}function ef(e,n,a,o){if(e.tag!==5)throw Error(s(476));var u=Am(e).queue;Tm(e,u,n,ct,a===null?Dx:function(){return Rm(e),a(o)})}function Am(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:ct,baseState:ct,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:ct},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function Rm(e){var n=Am(e);n.next===null&&(n=e.alternate.memoizedState),mo(e,n.next.queue,{},oi())}function nf(){return wn(No)}function Cm(){return ln().memoizedState}function wm(){return ln().memoizedState}function Ux(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=oi();e=Ha(a);var o=Ga(n,e,a);o!==null&&(Qn(o,n,a),co(o,n,a)),n={cache:Uu()},e.payload=n;return}n=n.return}}function Nx(e,n,a){var o=oi();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Ol(e)?Um(n,a):(a=Su(e,n,a,o),a!==null&&(Qn(a,e,o),Nm(a,n,o)))}function Dm(e,n,a){var o=oi();mo(e,n,a,o)}function mo(e,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Ol(e))Um(n,u);else{var f=e.alternate;if(e.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var g=n.lastRenderedState,A=f(g,a);if(u.hasEagerState=!0,u.eagerState=A,ei(A,g))return pl(e,n,u,0),Ye===null&&dl(),!1}catch{}if(a=Su(e,n,u,o),a!==null)return Qn(a,e,o),Nm(a,n,o),!0}return!1}function af(e,n,a,o){if(o={lane:2,revertLane:If(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Ol(e)){if(n)throw Error(s(479))}else n=Su(e,a,o,2),n!==null&&Qn(n,e,2)}function Ol(e){var n=e.alternate;return e===ce||n!==null&&n===ce}function Um(e,n){ar=Rl=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function Nm(e,n,a){if((a&4194048)!==0){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,kn(e,a)}}var go={readContext:wn,use:Dl,useCallback:nn,useContext:nn,useEffect:nn,useImperativeHandle:nn,useLayoutEffect:nn,useInsertionEffect:nn,useMemo:nn,useReducer:nn,useRef:nn,useState:nn,useDebugValue:nn,useDeferredValue:nn,useTransition:nn,useSyncExternalStore:nn,useId:nn,useHostTransitionStatus:nn,useFormState:nn,useActionState:nn,useOptimistic:nn,useMemoCache:nn,useCacheRefresh:nn};go.useEffectEvent=nn;var Lm={readContext:wn,use:Dl,useCallback:function(e,n){return zn().memoizedState=[e,n===void 0?null:n],e},useContext:wn,useEffect:gm,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,Nl(4194308,4,Sm.bind(null,n,e),a)},useLayoutEffect:function(e,n){return Nl(4194308,4,e,n)},useInsertionEffect:function(e,n){Nl(4,2,e,n)},useMemo:function(e,n){var a=zn();n=n===void 0?null:n;var o=e();if(Ts){At(!0);try{e()}finally{At(!1)}}return a.memoizedState=[o,n],o},useReducer:function(e,n,a){var o=zn();if(a!==void 0){var u=a(n);if(Ts){At(!0);try{a(n)}finally{At(!1)}}}else u=n;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=Nx.bind(null,ce,e),[o.memoizedState,e]},useRef:function(e){var n=zn();return e={current:e},n.memoizedState=e},useState:function(e){e=Qu(e);var n=e.queue,a=Dm.bind(null,ce,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:$u,useDeferredValue:function(e,n){var a=zn();return tf(a,e,n)},useTransition:function(){var e=Qu(!1);return e=Tm.bind(null,ce,e.queue,!0,!1),zn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var o=ce,u=zn();if(ye){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),Ye===null)throw Error(s(349));(Se&127)!==0||tm(o,n,a)}u.memoizedState=a;var f={value:a,getSnapshot:n};return u.queue=f,gm(nm.bind(null,o,f,e),[e]),o.flags|=2048,rr(9,{destroy:void 0},em.bind(null,o,f,a,n),null),a},useId:function(){var e=zn(),n=Ye.identifierPrefix;if(ye){var a=Hi,o=Bi;a=(o&~(1<<32-Ht(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Cl++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=Tx++,n="_"+n+"r_"+a.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:nf,useFormState:fm,useActionState:fm,useOptimistic:function(e){var n=zn();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=af.bind(null,ce,!0,a),a.dispatch=n,[e,n]},useMemoCache:Yu,useCacheRefresh:function(){return zn().memoizedState=Ux.bind(null,ce)},useEffectEvent:function(e){var n=zn(),a={impl:e};return n.memoizedState=a,function(){if((Ue&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},sf={readContext:wn,use:Dl,useCallback:ym,useContext:wn,useEffect:ju,useImperativeHandle:Mm,useInsertionEffect:vm,useLayoutEffect:xm,useMemo:Em,useReducer:Ul,useRef:mm,useState:function(){return Ul(la)},useDebugValue:$u,useDeferredValue:function(e,n){var a=ln();return bm(a,Ge.memoizedState,e,n)},useTransition:function(){var e=Ul(la)[0],n=ln().memoizedState;return[typeof e=="boolean"?e:po(e),n]},useSyncExternalStore:$p,useId:Cm,useHostTransitionStatus:nf,useFormState:hm,useActionState:hm,useOptimistic:function(e,n){var a=ln();return sm(a,Ge,e,n)},useMemoCache:Yu,useCacheRefresh:wm};sf.useEffectEvent=_m;var Om={readContext:wn,use:Dl,useCallback:ym,useContext:wn,useEffect:ju,useImperativeHandle:Mm,useInsertionEffect:vm,useLayoutEffect:xm,useMemo:Em,useReducer:Ku,useRef:mm,useState:function(){return Ku(la)},useDebugValue:$u,useDeferredValue:function(e,n){var a=ln();return Ge===null?tf(a,e,n):bm(a,Ge.memoizedState,e,n)},useTransition:function(){var e=Ku(la)[0],n=ln().memoizedState;return[typeof e=="boolean"?e:po(e),n]},useSyncExternalStore:$p,useId:Cm,useHostTransitionStatus:nf,useFormState:pm,useActionState:pm,useOptimistic:function(e,n){var a=ln();return Ge!==null?sm(a,Ge,e,n):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:Yu,useCacheRefresh:wm};Om.useEffectEvent=_m;function rf(e,n,a,o){n=e.memoizedState,a=a(o,n),a=a==null?n:v({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var of={enqueueSetState:function(e,n,a){e=e._reactInternals;var o=oi(),u=Ha(o);u.payload=n,a!=null&&(u.callback=a),n=Ga(e,u,o),n!==null&&(Qn(n,e,o),co(n,e,o))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var o=oi(),u=Ha(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Ga(e,u,o),n!==null&&(Qn(n,e,o),co(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=oi(),o=Ha(a);o.tag=2,n!=null&&(o.callback=n),n=Ga(e,o,a),n!==null&&(Qn(n,e,a),co(n,e,a))}};function Pm(e,n,a,o,u,f,g){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,f,g):n.prototype&&n.prototype.isPureReactComponent?!eo(a,o)||!eo(u,f):!0}function Im(e,n,a,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==e&&of.enqueueReplaceState(n,n.state,null)}function As(e,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(e=e.defaultProps){a===n&&(a=v({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}function Fm(e){hl(e)}function zm(e){console.error(e)}function Bm(e){hl(e)}function Pl(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function Hm(e,n,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function lf(e,n,a){return a=Ha(a),a.tag=3,a.payload={element:null},a.callback=function(){Pl(e,n)},a}function Gm(e){return e=Ha(e),e.tag=3,e}function Vm(e,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var f=o.value;e.payload=function(){return u(f)},e.callback=function(){Hm(n,a,o)}}var g=a.stateNode;g!==null&&typeof g.componentDidCatch=="function"&&(e.callback=function(){Hm(n,a,o),typeof u!="function"&&(Ya===null?Ya=new Set([this]):Ya.add(this));var A=o.stack;this.componentDidCatch(o.value,{componentStack:A!==null?A:""})})}function Lx(e,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&js(n,a,u,!0),a=ii.current,a!==null){switch(a.tag){case 31:case 13:return vi===null?Yl():a.alternate===null&&an===0&&(an=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===yl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),Lf(e,o,u)),!1;case 22:return a.flags|=65536,o===yl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),Lf(e,o,u)),!1}throw Error(s(435,a.tag))}return Lf(e,o,u),Yl(),!1}if(ye)return n=ii.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==Au&&(e=Error(s(422),{cause:o}),ao(pi(e,a)))):(o!==Au&&(n=Error(s(423),{cause:o}),ao(pi(n,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=pi(o,a),u=lf(e.stateNode,o,u),Fu(e,u),an!==4&&(an=2)),!1;var f=Error(s(520),{cause:o});if(f=pi(f,a),bo===null?bo=[f]:bo.push(f),an!==4&&(an=2),n===null)return!0;o=pi(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=lf(a.stateNode,o,e),Fu(a,e),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Ya===null||!Ya.has(f))))return a.flags|=65536,u&=-u,a.lanes|=u,u=Gm(u),Vm(u,e,a,o),Fu(a,u),!1}a=a.return}while(a!==null);return!1}var cf=Error(s(461)),mn=!1;function Dn(e,n,a,o){n.child=e===null?qp(n,null,a,o):bs(n,e.child,a,o)}function km(e,n,a,o,u){a=a.render;var f=n.ref;if("ref"in o){var g={};for(var A in o)A!=="ref"&&(g[A]=o[A])}else g=o;return Ss(n),o=ku(e,n,a,g,f,u),A=Xu(),e!==null&&!mn?(Wu(e,n,u),ca(e,n,u)):(ye&&A&&bu(n),n.flags|=1,Dn(e,n,o,u),n.child)}function Xm(e,n,a,o,u){if(e===null){var f=a.type;return typeof f=="function"&&!Mu(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,Wm(e,n,f,o,u)):(e=gl(a.type,null,o,n,n.mode,u),e.ref=n.ref,e.return=n,n.child=e)}if(f=e.child,!_f(e,u)){var g=f.memoizedProps;if(a=a.compare,a=a!==null?a:eo,a(g,o)&&e.ref===n.ref)return ca(e,n,u)}return n.flags|=1,e=ia(f,o),e.ref=n.ref,e.return=n,n.child=e}function Wm(e,n,a,o,u){if(e!==null){var f=e.memoizedProps;if(eo(f,o)&&e.ref===n.ref)if(mn=!1,n.pendingProps=o=f,_f(e,u))(e.flags&131072)!==0&&(mn=!0);else return n.lanes=e.lanes,ca(e,n,u)}return uf(e,n,a,o,u)}function qm(e,n,a,o){var u=o.children,f=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,e!==null){for(o=n.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~f}else o=0,n.child=null;return Ym(e,n,f,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&Sl(n,f!==null?f.cachePool:null),f!==null?Kp(n,f):Bu(),Qp(n);else return o=n.lanes=536870912,Ym(e,n,f!==null?f.baseLanes|a:a,a,o)}else f!==null?(Sl(n,f.cachePool),Kp(n,f),ka(),n.memoizedState=null):(e!==null&&Sl(n,null),Bu(),ka());return Dn(e,n,u,a),n.child}function _o(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function Ym(e,n,a,o,u){var f=Lu();return f=f===null?null:{parent:dn._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},e!==null&&Sl(n,null),Bu(),Qp(n),e!==null&&js(e,n,o,!0),n.childLanes=u,null}function Il(e,n){return n=zl({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function Zm(e,n,a){return bs(n,e.child,null,a),e=Il(n,n.pendingProps),e.flags|=2,ai(n),n.memoizedState=null,e}function Ox(e,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(ye){if(o.mode==="hidden")return e=Il(n,o),n.lanes=536870912,_o(null,e);if(Gu(n),(e=Ke)?(e=r0(e,_i),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Pa!==null?{id:Bi,overflow:Hi}:null,retryLane:536870912,hydrationErrors:null},a=Up(e),a.return=n,n.child=a,Cn=n,Ke=null)):e=null,e===null)throw Fa(n);return n.lanes=536870912,null}return Il(n,o)}var f=e.memoizedState;if(f!==null){var g=f.dehydrated;if(Gu(n),u)if(n.flags&256)n.flags&=-257,n=Zm(e,n,a);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(mn||js(e,n,a,!1),u=(a&e.childLanes)!==0,mn||u){if(o=Ye,o!==null&&(g=$n(o,a),g!==0&&g!==f.retryLane))throw f.retryLane=g,gs(e,g),Qn(o,e,g),cf;Yl(),n=Zm(e,n,a)}else e=f.treeContext,Ke=xi(g.nextSibling),Cn=n,ye=!0,Ia=null,_i=!1,e!==null&&Op(n,e),n=Il(n,o),n.flags|=4096;return n}return e=ia(e.child,{mode:o.mode,children:o.children}),e.ref=n.ref,n.child=e,e.return=n,e}function Fl(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(n.flags|=4194816)}}function uf(e,n,a,o,u){return Ss(n),a=ku(e,n,a,o,void 0,u),o=Xu(),e!==null&&!mn?(Wu(e,n,u),ca(e,n,u)):(ye&&o&&bu(n),n.flags|=1,Dn(e,n,a,u),n.child)}function Km(e,n,a,o,u,f){return Ss(n),n.updateQueue=null,a=jp(n,o,a,u),Jp(e),o=Xu(),e!==null&&!mn?(Wu(e,n,f),ca(e,n,f)):(ye&&o&&bu(n),n.flags|=1,Dn(e,n,a,f),n.child)}function Qm(e,n,a,o,u){if(Ss(n),n.stateNode===null){var f=Zs,g=a.contextType;typeof g=="object"&&g!==null&&(f=wn(g)),f=new a(o,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=of,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=o,f.state=n.memoizedState,f.refs={},Pu(n),g=a.contextType,f.context=typeof g=="object"&&g!==null?wn(g):Zs,f.state=n.memoizedState,g=a.getDerivedStateFromProps,typeof g=="function"&&(rf(n,a,g,o),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(g=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),g!==f.state&&of.enqueueReplaceState(f,f.state,null),fo(n,o,f,u),uo(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){f=n.stateNode;var A=n.memoizedProps,z=As(a,A);f.props=z;var at=f.context,vt=a.contextType;g=Zs,typeof vt=="object"&&vt!==null&&(g=wn(vt));var Mt=a.getDerivedStateFromProps;vt=typeof Mt=="function"||typeof f.getSnapshotBeforeUpdate=="function",A=n.pendingProps!==A,vt||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(A||at!==g)&&Im(n,f,o,g),Ba=!1;var ot=n.memoizedState;f.state=ot,fo(n,o,f,u),uo(),at=n.memoizedState,A||ot!==at||Ba?(typeof Mt=="function"&&(rf(n,a,Mt,o),at=n.memoizedState),(z=Ba||Pm(n,a,z,o,ot,at,g))?(vt||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=at),f.props=o,f.state=at,f.context=g,o=z):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{f=n.stateNode,Iu(e,n),g=n.memoizedProps,vt=As(a,g),f.props=vt,Mt=n.pendingProps,ot=f.context,at=a.contextType,z=Zs,typeof at=="object"&&at!==null&&(z=wn(at)),A=a.getDerivedStateFromProps,(at=typeof A=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(g!==Mt||ot!==z)&&Im(n,f,o,z),Ba=!1,ot=n.memoizedState,f.state=ot,fo(n,o,f,u),uo();var ft=n.memoizedState;g!==Mt||ot!==ft||Ba||e!==null&&e.dependencies!==null&&vl(e.dependencies)?(typeof A=="function"&&(rf(n,a,A,o),ft=n.memoizedState),(vt=Ba||Pm(n,a,vt,o,ot,ft,z)||e!==null&&e.dependencies!==null&&vl(e.dependencies))?(at||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(o,ft,z),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(o,ft,z)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||g===e.memoizedProps&&ot===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||g===e.memoizedProps&&ot===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=ft),f.props=o,f.state=ft,f.context=z,o=vt):(typeof f.componentDidUpdate!="function"||g===e.memoizedProps&&ot===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||g===e.memoizedProps&&ot===e.memoizedState||(n.flags|=1024),o=!1)}return f=o,Fl(e,n),o=(n.flags&128)!==0,f||o?(f=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,e!==null&&o?(n.child=bs(n,e.child,null,u),n.child=bs(n,null,a,u)):Dn(e,n,a,u),n.memoizedState=f.state,e=n.child):e=ca(e,n,u),e}function Jm(e,n,a,o){return vs(),n.flags|=256,Dn(e,n,a,o),n.child}var ff={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function hf(e){return{baseLanes:e,cachePool:Hp()}}function df(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=ri),e}function jm(e,n,a){var o=n.pendingProps,u=!1,f=(n.flags&128)!==0,g;if((g=f)||(g=e!==null&&e.memoizedState===null?!1:(on.current&2)!==0),g&&(u=!0,n.flags&=-129),g=(n.flags&32)!==0,n.flags&=-33,e===null){if(ye){if(u?Va(n):ka(),(e=Ke)?(e=r0(e,_i),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Pa!==null?{id:Bi,overflow:Hi}:null,retryLane:536870912,hydrationErrors:null},a=Up(e),a.return=n,n.child=a,Cn=n,Ke=null)):e=null,e===null)throw Fa(n);return Kf(e)?n.lanes=32:n.lanes=536870912,null}var A=o.children;return o=o.fallback,u?(ka(),u=n.mode,A=zl({mode:"hidden",children:A},u),o=_s(o,u,a,null),A.return=n,o.return=n,A.sibling=o,n.child=A,o=n.child,o.memoizedState=hf(a),o.childLanes=df(e,g,a),n.memoizedState=ff,_o(null,o)):(Va(n),pf(n,A))}var z=e.memoizedState;if(z!==null&&(A=z.dehydrated,A!==null)){if(f)n.flags&256?(Va(n),n.flags&=-257,n=mf(e,n,a)):n.memoizedState!==null?(ka(),n.child=e.child,n.flags|=128,n=null):(ka(),A=o.fallback,u=n.mode,o=zl({mode:"visible",children:o.children},u),A=_s(A,u,a,null),A.flags|=2,o.return=n,A.return=n,o.sibling=A,n.child=o,bs(n,e.child,null,a),o=n.child,o.memoizedState=hf(a),o.childLanes=df(e,g,a),n.memoizedState=ff,n=_o(null,o));else if(Va(n),Kf(A)){if(g=A.nextSibling&&A.nextSibling.dataset,g)var at=g.dgst;g=at,o=Error(s(419)),o.stack="",o.digest=g,ao({value:o,source:null,stack:null}),n=mf(e,n,a)}else if(mn||js(e,n,a,!1),g=(a&e.childLanes)!==0,mn||g){if(g=Ye,g!==null&&(o=$n(g,a),o!==0&&o!==z.retryLane))throw z.retryLane=o,gs(e,o),Qn(g,e,o),cf;Zf(A)||Yl(),n=mf(e,n,a)}else Zf(A)?(n.flags|=192,n.child=e.child,n=null):(e=z.treeContext,Ke=xi(A.nextSibling),Cn=n,ye=!0,Ia=null,_i=!1,e!==null&&Op(n,e),n=pf(n,o.children),n.flags|=4096);return n}return u?(ka(),A=o.fallback,u=n.mode,z=e.child,at=z.sibling,o=ia(z,{mode:"hidden",children:o.children}),o.subtreeFlags=z.subtreeFlags&65011712,at!==null?A=ia(at,A):(A=_s(A,u,a,null),A.flags|=2),A.return=n,o.return=n,o.sibling=A,n.child=o,_o(null,o),o=n.child,A=e.child.memoizedState,A===null?A=hf(a):(u=A.cachePool,u!==null?(z=dn._currentValue,u=u.parent!==z?{parent:z,pool:z}:u):u=Hp(),A={baseLanes:A.baseLanes|a,cachePool:u}),o.memoizedState=A,o.childLanes=df(e,g,a),n.memoizedState=ff,_o(e.child,o)):(Va(n),a=e.child,e=a.sibling,a=ia(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,e!==null&&(g=n.deletions,g===null?(n.deletions=[e],n.flags|=16):g.push(e)),n.child=a,n.memoizedState=null,a)}function pf(e,n){return n=zl({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function zl(e,n){return e=ni(22,e,null,n),e.lanes=0,e}function mf(e,n,a){return bs(n,e.child,null,a),e=pf(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function $m(e,n,a){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),wu(e.return,n,a)}function gf(e,n,a,o,u,f){var g=e.memoizedState;g===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:f}:(g.isBackwards=n,g.rendering=null,g.renderingStartTime=0,g.last=o,g.tail=a,g.tailMode=u,g.treeForkCount=f)}function tg(e,n,a){var o=n.pendingProps,u=o.revealOrder,f=o.tail;o=o.children;var g=on.current,A=(g&2)!==0;if(A?(g=g&1|2,n.flags|=128):g&=1,gt(on,g),Dn(e,n,o,a),o=ye?io:0,!A&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&$m(e,a,n);else if(e.tag===19)$m(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)e=a.alternate,e!==null&&Al(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),gf(n,!1,u,a,f,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(e=u.alternate,e!==null&&Al(e)===null){n.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}gf(n,!0,a,null,f,o);break;case"together":gf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function ca(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),qa|=n.lanes,(a&n.childLanes)===0)if(e!==null){if(js(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,a=ia(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=ia(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function _f(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&vl(e)))}function Px(e,n,a){switch(n.tag){case 3:_t(n,n.stateNode.containerInfo),za(n,dn,e.memoizedState.cache),vs();break;case 27:case 5:te(n);break;case 4:_t(n,n.stateNode.containerInfo);break;case 10:za(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Gu(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Va(n),n.flags|=128,null):(a&n.child.childLanes)!==0?jm(e,n,a):(Va(n),e=ca(e,n,a),e!==null?e.sibling:null);Va(n);break;case 19:var u=(e.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(js(e,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return tg(e,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),gt(on,on.current),o)break;return null;case 22:return n.lanes=0,qm(e,n,a,n.pendingProps);case 24:za(n,dn,e.memoizedState.cache)}return ca(e,n,a)}function eg(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)mn=!0;else{if(!_f(e,a)&&(n.flags&128)===0)return mn=!1,Px(e,n,a);mn=(e.flags&131072)!==0}else mn=!1,ye&&(n.flags&1048576)!==0&&Lp(n,io,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(e=ys(n.elementType),n.type=e,typeof e=="function")Mu(e)?(o=As(e,o),n.tag=1,n=Qm(null,n,e,o,a)):(n.tag=0,n=uf(null,n,e,o,a));else{if(e!=null){var u=e.$$typeof;if(u===D){n.tag=11,n=km(null,n,e,o,a);break t}else if(u===P){n.tag=14,n=Xm(null,n,e,o,a);break t}}throw n=Y(e)||e,Error(s(306,n,""))}}return n;case 0:return uf(e,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=As(o,n.pendingProps),Qm(e,n,o,u,a);case 3:t:{if(_t(n,n.stateNode.containerInfo),e===null)throw Error(s(387));o=n.pendingProps;var f=n.memoizedState;u=f.element,Iu(e,n),fo(n,o,null,a);var g=n.memoizedState;if(o=g.cache,za(n,dn,o),o!==f.cache&&Du(n,[dn],a,!0),uo(),o=g.element,f.isDehydrated)if(f={element:o,isDehydrated:!1,cache:g.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=Jm(e,n,o,a);break t}else if(o!==u){u=pi(Error(s(424)),n),ao(u),n=Jm(e,n,o,a);break t}else for(e=n.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,Ke=xi(e.firstChild),Cn=n,ye=!0,Ia=null,_i=!0,a=qp(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(vs(),o===u){n=ca(e,n,a);break t}Dn(e,n,o,a)}n=n.child}return n;case 26:return Fl(e,n),e===null?(a=h0(n.type,null,n.pendingProps,null))?n.memoizedState=a:ye||(a=n.type,e=n.pendingProps,o=tc(Xt.current).createElement(a),o[un]=n,o[Rn]=e,Un(o,a,e),fn(o),n.stateNode=o):n.memoizedState=h0(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return te(n),e===null&&ye&&(o=n.stateNode=c0(n.type,n.pendingProps,Xt.current),Cn=n,_i=!0,u=Ke,Ja(n.type)?(Qf=u,Ke=xi(o.firstChild)):Ke=u),Dn(e,n,n.pendingProps.children,a),Fl(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&ye&&((u=o=Ke)&&(o=fS(o,n.type,n.pendingProps,_i),o!==null?(n.stateNode=o,Cn=n,Ke=xi(o.firstChild),_i=!1,u=!0):u=!1),u||Fa(n)),te(n),u=n.type,f=n.pendingProps,g=e!==null?e.memoizedProps:null,o=f.children,Wf(u,f)?o=null:g!==null&&Wf(u,g)&&(n.flags|=32),n.memoizedState!==null&&(u=ku(e,n,Ax,null,null,a),No._currentValue=u),Fl(e,n),Dn(e,n,o,a),n.child;case 6:return e===null&&ye&&((e=a=Ke)&&(a=hS(a,n.pendingProps,_i),a!==null?(n.stateNode=a,Cn=n,Ke=null,e=!0):e=!1),e||Fa(n)),null;case 13:return jm(e,n,a);case 4:return _t(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=bs(n,null,o,a):Dn(e,n,o,a),n.child;case 11:return km(e,n,n.type,n.pendingProps,a);case 7:return Dn(e,n,n.pendingProps,a),n.child;case 8:return Dn(e,n,n.pendingProps.children,a),n.child;case 12:return Dn(e,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,za(n,n.type,o.value),Dn(e,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,Ss(n),u=wn(u),o=o(u),n.flags|=1,Dn(e,n,o,a),n.child;case 14:return Xm(e,n,n.type,n.pendingProps,a);case 15:return Wm(e,n,n.type,n.pendingProps,a);case 19:return tg(e,n,a);case 31:return Ox(e,n,a);case 22:return qm(e,n,a,n.pendingProps);case 24:return Ss(n),o=wn(dn),e===null?(u=Lu(),u===null&&(u=Ye,f=Uu(),u.pooledCache=f,f.refCount++,f!==null&&(u.pooledCacheLanes|=a),u=f),n.memoizedState={parent:o,cache:u},Pu(n),za(n,dn,u)):((e.lanes&a)!==0&&(Iu(e,n),fo(n,null,null,a),uo()),u=e.memoizedState,f=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),za(n,dn,o)):(o=f.cache,za(n,dn,o),o!==u.cache&&Du(n,[dn],a,!0))),Dn(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function ua(e){e.flags|=4}function vf(e,n,a,o,u){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(Cg())e.flags|=8192;else throw Es=yl,Ou}else e.flags&=-16777217}function ng(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!_0(n))if(Cg())e.flags|=8192;else throw Es=yl,Ou}function Bl(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?yt():536870912,e.lanes|=n,ur|=n)}function vo(e,n){if(!ye)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Qe(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(n)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=a,n}function Ix(e,n,a){var o=n.pendingProps;switch(Tu(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Qe(n),null;case 1:return Qe(n),null;case 3:return a=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),ra(dn),Tt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Js(n)?ua(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Ru())),Qe(n),null;case 26:var u=n.type,f=n.memoizedState;return e===null?(ua(n),f!==null?(Qe(n),ng(n,f)):(Qe(n),vf(n,u,null,o,a))):f?f!==e.memoizedState?(ua(n),Qe(n),ng(n,f)):(Qe(n),n.flags&=-16777217):(e=e.memoizedProps,e!==o&&ua(n),Qe(n),vf(n,u,e,o,a)),null;case 27:if(Bt(n),a=Xt.current,u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&ua(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Qe(n),null}e=Et.current,Js(n)?Pp(n):(e=c0(u,o,a),n.stateNode=e,ua(n))}return Qe(n),null;case 5:if(Bt(n),u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&ua(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Qe(n),null}if(f=Et.current,Js(n))Pp(n);else{var g=tc(Xt.current);switch(f){case 1:f=g.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:f=g.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":f=g.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":f=g.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":f=g.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof o.is=="string"?g.createElement("select",{is:o.is}):g.createElement("select"),o.multiple?f.multiple=!0:o.size&&(f.size=o.size);break;default:f=typeof o.is=="string"?g.createElement(u,{is:o.is}):g.createElement(u)}}f[un]=n,f[Rn]=o;t:for(g=n.child;g!==null;){if(g.tag===5||g.tag===6)f.appendChild(g.stateNode);else if(g.tag!==4&&g.tag!==27&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===n)break t;for(;g.sibling===null;){if(g.return===null||g.return===n)break t;g=g.return}g.sibling.return=g.return,g=g.sibling}n.stateNode=f;t:switch(Un(f,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&ua(n)}}return Qe(n),vf(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,a),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&ua(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(e=Xt.current,Js(n)){if(e=n.stateNode,a=n.memoizedProps,o=null,u=Cn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[un]=n,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||jg(e.nodeValue,a)),e||Fa(n,!0)}else e=tc(e).createTextNode(o),e[un]=n,n.stateNode=e}return Qe(n),null;case 31:if(a=n.memoizedState,e===null||e.memoizedState!==null){if(o=Js(n),a!==null){if(e===null){if(!o)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[un]=n}else vs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Qe(n),e=!1}else a=Ru(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return n.flags&256?(ai(n),n):(ai(n),null);if((n.flags&128)!==0)throw Error(s(558))}return Qe(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=Js(n),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[un]=n}else vs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Qe(n),u=!1}else u=Ru(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(ai(n),n):(ai(n),null)}return ai(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),f=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(f=o.memoizedState.cachePool.pool),f!==u&&(o.flags|=2048)),a!==e&&a&&(n.child.flags|=8192),Bl(n,n.updateQueue),Qe(n),null);case 4:return Tt(),e===null&&Hf(n.stateNode.containerInfo),Qe(n),null;case 10:return ra(n.type),Qe(n),null;case 19:if(J(on),o=n.memoizedState,o===null)return Qe(n),null;if(u=(n.flags&128)!==0,f=o.rendering,f===null)if(u)vo(o,!1);else{if(an!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(f=Al(e),f!==null){for(n.flags|=128,vo(o,!1),e=f.updateQueue,n.updateQueue=e,Bl(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)Dp(a,e),a=a.sibling;return gt(on,on.current&1|2),ye&&aa(n,o.treeForkCount),n.child}e=e.sibling}o.tail!==null&&Le()>Xl&&(n.flags|=128,u=!0,vo(o,!1),n.lanes=4194304)}else{if(!u)if(e=Al(f),e!==null){if(n.flags|=128,u=!0,e=e.updateQueue,n.updateQueue=e,Bl(n,e),vo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!f.alternate&&!ye)return Qe(n),null}else 2*Le()-o.renderingStartTime>Xl&&a!==536870912&&(n.flags|=128,u=!0,vo(o,!1),n.lanes=4194304);o.isBackwards?(f.sibling=n.child,n.child=f):(e=o.last,e!==null?e.sibling=f:n.child=f,o.last=f)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=Le(),e.sibling=null,a=on.current,gt(on,u?a&1|2:a&1),ye&&aa(n,o.treeForkCount),e):(Qe(n),null);case 22:case 23:return ai(n),Hu(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(Qe(n),n.subtreeFlags&6&&(n.flags|=8192)):Qe(n),a=n.updateQueue,a!==null&&Bl(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),e!==null&&J(Ms),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),ra(dn),Qe(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function Fx(e,n){switch(Tu(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return ra(dn),Tt(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Bt(n),null;case 31:if(n.memoizedState!==null){if(ai(n),n.alternate===null)throw Error(s(340));vs()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(ai(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));vs()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return J(on),null;case 4:return Tt(),null;case 10:return ra(n.type),null;case 22:case 23:return ai(n),Hu(),e!==null&&J(Ms),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return ra(dn),null;case 25:return null;default:return null}}function ig(e,n){switch(Tu(n),n.tag){case 3:ra(dn),Tt();break;case 26:case 27:case 5:Bt(n);break;case 4:Tt();break;case 31:n.memoizedState!==null&&ai(n);break;case 13:ai(n);break;case 19:J(on);break;case 10:ra(n.type);break;case 22:case 23:ai(n),Hu(),e!==null&&J(Ms);break;case 24:ra(dn)}}function xo(e,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&e)===e){o=void 0;var f=a.create,g=a.inst;o=f(),g.destroy=o}a=a.next}while(a!==u)}}catch(A){Ie(n,n.return,A)}}function Xa(e,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var f=u.next;o=f;do{if((o.tag&e)===e){var g=o.inst,A=g.destroy;if(A!==void 0){g.destroy=void 0,u=n;var z=a,at=A;try{at()}catch(vt){Ie(u,z,vt)}}}o=o.next}while(o!==f)}}catch(vt){Ie(n,n.return,vt)}}function ag(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{Zp(n,a)}catch(o){Ie(e,e.return,o)}}}function sg(e,n,a){a.props=As(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){Ie(e,n,o)}}function So(e,n){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(u){Ie(e,n,u)}}function Gi(e,n){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){Ie(e,n,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Ie(e,n,u)}else a.current=null}function rg(e){var n=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){Ie(e,e.return,u)}}function xf(e,n,a){try{var o=e.stateNode;sS(o,e.type,a,n),o[Rn]=n}catch(u){Ie(e,e.return,u)}}function og(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ja(e.type)||e.tag===4}function Sf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||og(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ja(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Mf(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(e),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=hi));else if(o!==4&&(o===27&&Ja(e.type)&&(a=e.stateNode,n=null),e=e.child,e!==null))for(Mf(e,n,a),e=e.sibling;e!==null;)Mf(e,n,a),e=e.sibling}function Hl(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(o!==4&&(o===27&&Ja(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Hl(e,n,a),e=e.sibling;e!==null;)Hl(e,n,a),e=e.sibling}function lg(e){var n=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Un(n,o,a),n[un]=e,n[Rn]=a}catch(f){Ie(e,e.return,f)}}var fa=!1,gn=!1,yf=!1,cg=typeof WeakSet=="function"?WeakSet:Set,bn=null;function zx(e,n){if(e=e.containerInfo,kf=oc,e=Mp(e),pu(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,f=o.focusNode;o=o.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break t}var g=0,A=-1,z=-1,at=0,vt=0,Mt=e,ot=null;e:for(;;){for(var ft;Mt!==a||u!==0&&Mt.nodeType!==3||(A=g+u),Mt!==f||o!==0&&Mt.nodeType!==3||(z=g+o),Mt.nodeType===3&&(g+=Mt.nodeValue.length),(ft=Mt.firstChild)!==null;)ot=Mt,Mt=ft;for(;;){if(Mt===e)break e;if(ot===a&&++at===u&&(A=g),ot===f&&++vt===o&&(z=g),(ft=Mt.nextSibling)!==null)break;Mt=ot,ot=Mt.parentNode}Mt=ft}a=A===-1||z===-1?null:{start:A,end:z}}else a=null}a=a||{start:0,end:0}}else a=null;for(Xf={focusedElem:e,selectionRange:a},oc=!1,bn=n;bn!==null;)if(n=bn,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,bn=e;else for(;bn!==null;){switch(n=bn,f=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)u=e[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&f!==null){e=void 0,a=n,u=f.memoizedProps,f=f.memoizedState,o=a.stateNode;try{var Yt=As(a.type,u);e=o.getSnapshotBeforeUpdate(Yt,f),o.__reactInternalSnapshotBeforeUpdate=e}catch($t){Ie(a,a.return,$t)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)Yf(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Yf(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,bn=e;break}bn=n.return}}function ug(e,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:da(e,a),o&4&&xo(5,a);break;case 1:if(da(e,a),o&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(g){Ie(a,a.return,g)}else{var u=As(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(u,n,e.__reactInternalSnapshotBeforeUpdate)}catch(g){Ie(a,a.return,g)}}o&64&&ag(a),o&512&&So(a,a.return);break;case 3:if(da(e,a),o&64&&(e=a.updateQueue,e!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{Zp(e,n)}catch(g){Ie(a,a.return,g)}}break;case 27:n===null&&o&4&&lg(a);case 26:case 5:da(e,a),n===null&&o&4&&rg(a),o&512&&So(a,a.return);break;case 12:da(e,a);break;case 31:da(e,a),o&4&&dg(e,a);break;case 13:da(e,a),o&4&&pg(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=Yx.bind(null,a),dS(e,a))));break;case 22:if(o=a.memoizedState!==null||fa,!o){n=n!==null&&n.memoizedState!==null||gn,u=fa;var f=gn;fa=o,(gn=n)&&!f?pa(e,a,(a.subtreeFlags&8772)!==0):da(e,a),fa=u,gn=f}break;case 30:break;default:da(e,a)}}function fg(e){var n=e.alternate;n!==null&&(e.alternate=null,fg(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&Ua(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var je=null,qn=!1;function ha(e,n,a){for(a=a.child;a!==null;)hg(e,n,a),a=a.sibling}function hg(e,n,a){if(mt&&typeof mt.onCommitFiberUnmount=="function")try{mt.onCommitFiberUnmount(pt,a)}catch{}switch(a.tag){case 26:gn||Gi(a,n),ha(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:gn||Gi(a,n);var o=je,u=qn;Ja(a.type)&&(je=a.stateNode,qn=!1),ha(e,n,a),wo(a.stateNode),je=o,qn=u;break;case 5:gn||Gi(a,n);case 6:if(o=je,u=qn,je=null,ha(e,n,a),je=o,qn=u,je!==null)if(qn)try{(je.nodeType===9?je.body:je.nodeName==="HTML"?je.ownerDocument.body:je).removeChild(a.stateNode)}catch(f){Ie(a,n,f)}else try{je.removeChild(a.stateNode)}catch(f){Ie(a,n,f)}break;case 18:je!==null&&(qn?(e=je,a0(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),vr(e)):a0(je,a.stateNode));break;case 4:o=je,u=qn,je=a.stateNode.containerInfo,qn=!0,ha(e,n,a),je=o,qn=u;break;case 0:case 11:case 14:case 15:Xa(2,a,n),gn||Xa(4,a,n),ha(e,n,a);break;case 1:gn||(Gi(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&sg(a,n,o)),ha(e,n,a);break;case 21:ha(e,n,a);break;case 22:gn=(o=gn)||a.memoizedState!==null,ha(e,n,a),gn=o;break;default:ha(e,n,a)}}function dg(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{vr(e)}catch(a){Ie(n,n.return,a)}}}function pg(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{vr(e)}catch(a){Ie(n,n.return,a)}}function Bx(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new cg),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new cg),n;default:throw Error(s(435,e.tag))}}function Gl(e,n){var a=Bx(e);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=Zx.bind(null,e,o);o.then(u,u)}})}function Yn(e,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],f=e,g=n,A=g;t:for(;A!==null;){switch(A.tag){case 27:if(Ja(A.type)){je=A.stateNode,qn=!1;break t}break;case 5:je=A.stateNode,qn=!1;break t;case 3:case 4:je=A.stateNode.containerInfo,qn=!0;break t}A=A.return}if(je===null)throw Error(s(160));hg(f,g,u),je=null,qn=!1,f=u.alternate,f!==null&&(f.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)mg(n,e),n=n.sibling}var wi=null;function mg(e,n){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Yn(n,e),Zn(e),o&4&&(Xa(3,e,e.return),xo(3,e),Xa(5,e,e.return));break;case 1:Yn(n,e),Zn(e),o&512&&(gn||a===null||Gi(a,a.return)),o&64&&fa&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=wi;if(Yn(n,e),Zn(e),o&512&&(gn||a===null||Gi(a,a.return)),o&4){var f=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":f=u.getElementsByTagName("title")[0],(!f||f[Da]||f[un]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=u.createElement(o),u.head.insertBefore(f,u.querySelector("head > title"))),Un(f,o,a),f[un]=e,fn(f),o=f;break t;case"link":var g=m0("link","href",u).get(o+(a.href||""));if(g){for(var A=0;A<g.length;A++)if(f=g[A],f.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){g.splice(A,1);break e}}f=u.createElement(o),Un(f,o,a),u.head.appendChild(f);break;case"meta":if(g=m0("meta","content",u).get(o+(a.content||""))){for(A=0;A<g.length;A++)if(f=g[A],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){g.splice(A,1);break e}}f=u.createElement(o),Un(f,o,a),u.head.appendChild(f);break;default:throw Error(s(468,o))}f[un]=e,fn(f),o=f}e.stateNode=o}else g0(u,e.type,e.stateNode);else e.stateNode=p0(u,o,e.memoizedProps);else f!==o?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,o===null?g0(u,e.type,e.stateNode):p0(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&xf(e,e.memoizedProps,a.memoizedProps)}break;case 27:Yn(n,e),Zn(e),o&512&&(gn||a===null||Gi(a,a.return)),a!==null&&o&4&&xf(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Yn(n,e),Zn(e),o&512&&(gn||a===null||Gi(a,a.return)),e.flags&32){u=e.stateNode;try{Fn(u,"")}catch(Yt){Ie(e,e.return,Yt)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,xf(e,u,a!==null?a.memoizedProps:u)),o&1024&&(yf=!0);break;case 6:if(Yn(n,e),Zn(e),o&4){if(e.stateNode===null)throw Error(s(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(Yt){Ie(e,e.return,Yt)}}break;case 3:if(ic=null,u=wi,wi=ec(n.containerInfo),Yn(n,e),wi=u,Zn(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{vr(n.containerInfo)}catch(Yt){Ie(e,e.return,Yt)}yf&&(yf=!1,gg(e));break;case 4:o=wi,wi=ec(e.stateNode.containerInfo),Yn(n,e),Zn(e),wi=o;break;case 12:Yn(n,e),Zn(e);break;case 31:Yn(n,e),Zn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Gl(e,o)));break;case 13:Yn(n,e),Zn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(kl=Le()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Gl(e,o)));break;case 22:u=e.memoizedState!==null;var z=a!==null&&a.memoizedState!==null,at=fa,vt=gn;if(fa=at||u,gn=vt||z,Yn(n,e),gn=vt,fa=at,Zn(e),o&8192)t:for(n=e.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||z||fa||gn||Rs(e)),a=null,n=e;;){if(n.tag===5||n.tag===26){if(a===null){z=a=n;try{if(f=z.stateNode,u)g=f.style,typeof g.setProperty=="function"?g.setProperty("display","none","important"):g.display="none";else{A=z.stateNode;var Mt=z.memoizedProps.style,ot=Mt!=null&&Mt.hasOwnProperty("display")?Mt.display:null;A.style.display=ot==null||typeof ot=="boolean"?"":(""+ot).trim()}}catch(Yt){Ie(z,z.return,Yt)}}}else if(n.tag===6){if(a===null){z=n;try{z.stateNode.nodeValue=u?"":z.memoizedProps}catch(Yt){Ie(z,z.return,Yt)}}}else if(n.tag===18){if(a===null){z=n;try{var ft=z.stateNode;u?s0(ft,!0):s0(z.stateNode,!1)}catch(Yt){Ie(z,z.return,Yt)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Gl(e,a))));break;case 19:Yn(n,e),Zn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Gl(e,o)));break;case 30:break;case 21:break;default:Yn(n,e),Zn(e)}}function Zn(e){var n=e.flags;if(n&2){try{for(var a,o=e.return;o!==null;){if(og(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,f=Sf(e);Hl(e,f,u);break;case 5:var g=a.stateNode;a.flags&32&&(Fn(g,""),a.flags&=-33);var A=Sf(e);Hl(e,A,g);break;case 3:case 4:var z=a.stateNode.containerInfo,at=Sf(e);Mf(e,at,z);break;default:throw Error(s(161))}}catch(vt){Ie(e,e.return,vt)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function gg(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;gg(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function da(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)ug(e,n.alternate,n),n=n.sibling}function Rs(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:Xa(4,n,n.return),Rs(n);break;case 1:Gi(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&sg(n,n.return,a),Rs(n);break;case 27:wo(n.stateNode);case 26:case 5:Gi(n,n.return),Rs(n);break;case 22:n.memoizedState===null&&Rs(n);break;case 30:Rs(n);break;default:Rs(n)}e=e.sibling}}function pa(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=e,f=n,g=f.flags;switch(f.tag){case 0:case 11:case 15:pa(u,f,a),xo(4,f);break;case 1:if(pa(u,f,a),o=f,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(at){Ie(o,o.return,at)}if(o=f,u=o.updateQueue,u!==null){var A=o.stateNode;try{var z=u.shared.hiddenCallbacks;if(z!==null)for(u.shared.hiddenCallbacks=null,u=0;u<z.length;u++)Yp(z[u],A)}catch(at){Ie(o,o.return,at)}}a&&g&64&&ag(f),So(f,f.return);break;case 27:lg(f);case 26:case 5:pa(u,f,a),a&&o===null&&g&4&&rg(f),So(f,f.return);break;case 12:pa(u,f,a);break;case 31:pa(u,f,a),a&&g&4&&dg(u,f);break;case 13:pa(u,f,a),a&&g&4&&pg(u,f);break;case 22:f.memoizedState===null&&pa(u,f,a),So(f,f.return);break;case 30:break;default:pa(u,f,a)}n=n.sibling}}function Ef(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&so(a))}function bf(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&so(e))}function Di(e,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)_g(e,n,a,o),n=n.sibling}function _g(e,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Di(e,n,a,o),u&2048&&xo(9,n);break;case 1:Di(e,n,a,o);break;case 3:Di(e,n,a,o),u&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&so(e)));break;case 12:if(u&2048){Di(e,n,a,o),e=n.stateNode;try{var f=n.memoizedProps,g=f.id,A=f.onPostCommit;typeof A=="function"&&A(g,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(z){Ie(n,n.return,z)}}else Di(e,n,a,o);break;case 31:Di(e,n,a,o);break;case 13:Di(e,n,a,o);break;case 23:break;case 22:f=n.stateNode,g=n.alternate,n.memoizedState!==null?f._visibility&2?Di(e,n,a,o):Mo(e,n):f._visibility&2?Di(e,n,a,o):(f._visibility|=2,or(e,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Ef(g,n);break;case 24:Di(e,n,a,o),u&2048&&bf(n.alternate,n);break;default:Di(e,n,a,o)}}function or(e,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=e,g=n,A=a,z=o,at=g.flags;switch(g.tag){case 0:case 11:case 15:or(f,g,A,z,u),xo(8,g);break;case 23:break;case 22:var vt=g.stateNode;g.memoizedState!==null?vt._visibility&2?or(f,g,A,z,u):Mo(f,g):(vt._visibility|=2,or(f,g,A,z,u)),u&&at&2048&&Ef(g.alternate,g);break;case 24:or(f,g,A,z,u),u&&at&2048&&bf(g.alternate,g);break;default:or(f,g,A,z,u)}n=n.sibling}}function Mo(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,o=n,u=o.flags;switch(o.tag){case 22:Mo(a,o),u&2048&&Ef(o.alternate,o);break;case 24:Mo(a,o),u&2048&&bf(o.alternate,o);break;default:Mo(a,o)}n=n.sibling}}var yo=8192;function lr(e,n,a){if(e.subtreeFlags&yo)for(e=e.child;e!==null;)vg(e,n,a),e=e.sibling}function vg(e,n,a){switch(e.tag){case 26:lr(e,n,a),e.flags&yo&&e.memoizedState!==null&&TS(a,wi,e.memoizedState,e.memoizedProps);break;case 5:lr(e,n,a);break;case 3:case 4:var o=wi;wi=ec(e.stateNode.containerInfo),lr(e,n,a),wi=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=yo,yo=16777216,lr(e,n,a),yo=o):lr(e,n,a));break;default:lr(e,n,a)}}function xg(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function Eo(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];bn=o,Mg(o,e)}xg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Sg(e),e=e.sibling}function Sg(e){switch(e.tag){case 0:case 11:case 15:Eo(e),e.flags&2048&&Xa(9,e,e.return);break;case 3:Eo(e);break;case 12:Eo(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,Vl(e)):Eo(e);break;default:Eo(e)}}function Vl(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];bn=o,Mg(o,e)}xg(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:Xa(8,n,n.return),Vl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Vl(n));break;default:Vl(n)}e=e.sibling}}function Mg(e,n){for(;bn!==null;){var a=bn;switch(a.tag){case 0:case 11:case 15:Xa(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:so(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,bn=o;else t:for(a=e;bn!==null;){o=bn;var u=o.sibling,f=o.return;if(fg(o),o===a){bn=null;break t}if(u!==null){u.return=f,bn=u;break t}bn=f}}}var Hx={getCacheForType:function(e){var n=wn(dn),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a},cacheSignal:function(){return wn(dn).controller.signal}},Gx=typeof WeakMap=="function"?WeakMap:Map,Ue=0,Ye=null,_e=null,Se=0,Pe=0,si=null,Wa=!1,cr=!1,Tf=!1,ma=0,an=0,qa=0,Cs=0,Af=0,ri=0,ur=0,bo=null,Kn=null,Rf=!1,kl=0,yg=0,Xl=1/0,Wl=null,Ya=null,xn=0,Za=null,fr=null,ga=0,Cf=0,wf=null,Eg=null,To=0,Df=null;function oi(){return(Ue&2)!==0&&Se!==0?Se&-Se:F.T!==null?If():qr()}function bg(){if(ri===0)if((Se&536870912)===0||ye){var e=ee;ee<<=1,(ee&3932160)===0&&(ee=262144),ri=e}else ri=536870912;return e=ii.current,e!==null&&(e.flags|=32),ri}function Qn(e,n,a){(e===Ye&&(Pe===2||Pe===9)||e.cancelPendingCommit!==null)&&(hr(e,0),Ka(e,Se,ri,!1)),Wt(e,a),((Ue&2)===0||e!==Ye)&&(e===Ye&&((Ue&2)===0&&(Cs|=a),an===4&&Ka(e,Se,ri,!1)),Vi(e))}function Tg(e,n,a){if((Ue&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&e.expiredLanes)===0||Ct(e,n),u=o?Xx(e,n):Nf(e,n,!0),f=o;do{if(u===0){cr&&!o&&Ka(e,n,0,!1);break}else{if(a=e.current.alternate,f&&!Vx(a)){u=Nf(e,n,!1),f=!1;continue}if(u===2){if(f=n,e.errorRecoveryDisabledLanes&f)var g=0;else g=e.pendingLanes&-536870913,g=g!==0?g:g&536870912?536870912:0;if(g!==0){n=g;t:{var A=e;u=bo;var z=A.current.memoizedState.isDehydrated;if(z&&(hr(A,g).flags|=256),g=Nf(A,g,!1),g!==2){if(Tf&&!z){A.errorRecoveryDisabledLanes|=f,Cs|=f,u=4;break t}f=Kn,Kn=u,f!==null&&(Kn===null?Kn=f:Kn.push.apply(Kn,f))}u=g}if(f=!1,u!==2)continue}}if(u===1){hr(e,0),Ka(e,n,0,!0);break}t:{switch(o=e,f=u,f){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:Ka(o,n,ri,!Wa);break t;case 2:Kn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=kl+300-Le(),10<u)){if(Ka(o,n,ri,!Wa),xt(o,0,!0)!==0)break t;ga=n,o.timeoutHandle=n0(Ag.bind(null,o,a,Kn,Wl,Rf,n,ri,Cs,ur,Wa,f,"Throttled",-0,0),u);break t}Ag(o,a,Kn,Wl,Rf,n,ri,Cs,ur,Wa,f,null,-0,0)}}break}while(!0);Vi(e)}function Ag(e,n,a,o,u,f,g,A,z,at,vt,Mt,ot,ft){if(e.timeoutHandle=-1,Mt=n.subtreeFlags,Mt&8192||(Mt&16785408)===16785408){Mt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:hi},vg(n,f,Mt);var Yt=(f&62914560)===f?kl-Le():(f&4194048)===f?yg-Le():0;if(Yt=AS(Mt,Yt),Yt!==null){ga=f,e.cancelPendingCommit=Yt(Og.bind(null,e,n,f,a,o,u,g,A,z,vt,Mt,null,ot,ft)),Ka(e,f,g,!at);return}}Og(e,n,f,a,o,u,g,A,z)}function Vx(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],f=u.getSnapshot;u=u.value;try{if(!ei(f(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Ka(e,n,a,o){n&=~Af,n&=~Cs,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var u=n;0<u;){var f=31-Ht(u),g=1<<f;o[f]=-1,u&=~g}a!==0&&be(e,a,n)}function ql(){return(Ue&6)===0?(Ao(0),!1):!0}function Uf(){if(_e!==null){if(Pe===0)var e=_e.return;else e=_e,sa=xs=null,qu(e),nr=null,oo=0,e=_e;for(;e!==null;)ig(e.alternate,e),e=e.return;_e=null}}function hr(e,n){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,lS(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),ga=0,Uf(),Ye=e,_e=a=ia(e.current,null),Se=n,Pe=0,si=null,Wa=!1,cr=Ct(e,n),Tf=!1,ur=ri=Af=Cs=qa=an=0,Kn=bo=null,Rf=!1,(n&8)!==0&&(n|=n&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=n;0<o;){var u=31-Ht(o),f=1<<u;n|=e[u],o&=~f}return ma=n,dl(),a}function Rg(e,n){ce=null,F.H=go,n===er||n===Ml?(n=kp(),Pe=3):n===Ou?(n=kp(),Pe=4):Pe=n===cf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,si=n,_e===null&&(an=1,Pl(e,pi(n,e.current)))}function Cg(){var e=ii.current;return e===null?!0:(Se&4194048)===Se?vi===null:(Se&62914560)===Se||(Se&536870912)!==0?e===vi:!1}function wg(){var e=F.H;return F.H=go,e===null?go:e}function Dg(){var e=F.A;return F.A=Hx,e}function Yl(){an=4,Wa||(Se&4194048)!==Se&&ii.current!==null||(cr=!0),(qa&134217727)===0&&(Cs&134217727)===0||Ye===null||Ka(Ye,Se,ri,!1)}function Nf(e,n,a){var o=Ue;Ue|=2;var u=wg(),f=Dg();(Ye!==e||Se!==n)&&(Wl=null,hr(e,n)),n=!1;var g=an;t:do try{if(Pe!==0&&_e!==null){var A=_e,z=si;switch(Pe){case 8:Uf(),g=6;break t;case 3:case 2:case 9:case 6:ii.current===null&&(n=!0);var at=Pe;if(Pe=0,si=null,dr(e,A,z,at),a&&cr){g=0;break t}break;default:at=Pe,Pe=0,si=null,dr(e,A,z,at)}}kx(),g=an;break}catch(vt){Rg(e,vt)}while(!0);return n&&e.shellSuspendCounter++,sa=xs=null,Ue=o,F.H=u,F.A=f,_e===null&&(Ye=null,Se=0,dl()),g}function kx(){for(;_e!==null;)Ug(_e)}function Xx(e,n){var a=Ue;Ue|=2;var o=wg(),u=Dg();Ye!==e||Se!==n?(Wl=null,Xl=Le()+500,hr(e,n)):cr=Ct(e,n);t:do try{if(Pe!==0&&_e!==null){n=_e;var f=si;e:switch(Pe){case 1:Pe=0,si=null,dr(e,n,f,1);break;case 2:case 9:if(Gp(f)){Pe=0,si=null,Ng(n);break}n=function(){Pe!==2&&Pe!==9||Ye!==e||(Pe=7),Vi(e)},f.then(n,n);break t;case 3:Pe=7;break t;case 4:Pe=5;break t;case 7:Gp(f)?(Pe=0,si=null,Ng(n)):(Pe=0,si=null,dr(e,n,f,7));break;case 5:var g=null;switch(_e.tag){case 26:g=_e.memoizedState;case 5:case 27:var A=_e;if(g?_0(g):A.stateNode.complete){Pe=0,si=null;var z=A.sibling;if(z!==null)_e=z;else{var at=A.return;at!==null?(_e=at,Zl(at)):_e=null}break e}}Pe=0,si=null,dr(e,n,f,5);break;case 6:Pe=0,si=null,dr(e,n,f,6);break;case 8:Uf(),an=6;break t;default:throw Error(s(462))}}Wx();break}catch(vt){Rg(e,vt)}while(!0);return sa=xs=null,F.H=o,F.A=u,Ue=a,_e!==null?0:(Ye=null,Se=0,dl(),an)}function Wx(){for(;_e!==null&&!en();)Ug(_e)}function Ug(e){var n=eg(e.alternate,e,ma);e.memoizedProps=e.pendingProps,n===null?Zl(e):_e=n}function Ng(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=Km(a,n,n.pendingProps,n.type,void 0,Se);break;case 11:n=Km(a,n,n.pendingProps,n.type.render,n.ref,Se);break;case 5:qu(n);default:ig(a,n),n=_e=Dp(n,ma),n=eg(a,n,ma)}e.memoizedProps=e.pendingProps,n===null?Zl(e):_e=n}function dr(e,n,a,o){sa=xs=null,qu(n),nr=null,oo=0;var u=n.return;try{if(Lx(e,u,n,a,Se)){an=1,Pl(e,pi(a,e.current)),_e=null;return}}catch(f){if(u!==null)throw _e=u,f;an=1,Pl(e,pi(a,e.current)),_e=null;return}n.flags&32768?(ye||o===1?e=!0:cr||(Se&536870912)!==0?e=!1:(Wa=e=!0,(o===2||o===9||o===3||o===6)&&(o=ii.current,o!==null&&o.tag===13&&(o.flags|=16384))),Lg(n,e)):Zl(n)}function Zl(e){var n=e;do{if((n.flags&32768)!==0){Lg(n,Wa);return}e=n.return;var a=Ix(n.alternate,n,ma);if(a!==null){_e=a;return}if(n=n.sibling,n!==null){_e=n;return}_e=n=e}while(n!==null);an===0&&(an=5)}function Lg(e,n){do{var a=Fx(e.alternate,e);if(a!==null){a.flags&=32767,_e=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){_e=e;return}_e=e=a}while(e!==null);an=6,_e=null}function Og(e,n,a,o,u,f,g,A,z){e.cancelPendingCommit=null;do Kl();while(xn!==0);if((Ue&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));if(f=n.lanes|n.childLanes,f|=xu,Be(e,a,f,g,A,z),e===Ye&&(_e=Ye=null,Se=0),fr=n,Za=e,ga=a,Cf=f,wf=u,Eg=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Kx(K,function(){return Bg(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=F.T,F.T=null,u=H.p,H.p=2,g=Ue,Ue|=4;try{zx(e,n,a)}finally{Ue=g,H.p=u,F.T=o}}xn=1,Pg(),Ig(),Fg()}}function Pg(){if(xn===1){xn=0;var e=Za,n=fr,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=F.T,F.T=null;var o=H.p;H.p=2;var u=Ue;Ue|=4;try{mg(n,e);var f=Xf,g=Mp(e.containerInfo),A=f.focusedElem,z=f.selectionRange;if(g!==A&&A&&A.ownerDocument&&Sp(A.ownerDocument.documentElement,A)){if(z!==null&&pu(A)){var at=z.start,vt=z.end;if(vt===void 0&&(vt=at),"selectionStart"in A)A.selectionStart=at,A.selectionEnd=Math.min(vt,A.value.length);else{var Mt=A.ownerDocument||document,ot=Mt&&Mt.defaultView||window;if(ot.getSelection){var ft=ot.getSelection(),Yt=A.textContent.length,$t=Math.min(z.start,Yt),ke=z.end===void 0?$t:Math.min(z.end,Yt);!ft.extend&&$t>ke&&(g=ke,ke=$t,$t=g);var Z=xp(A,$t),V=xp(A,ke);if(Z&&V&&(ft.rangeCount!==1||ft.anchorNode!==Z.node||ft.anchorOffset!==Z.offset||ft.focusNode!==V.node||ft.focusOffset!==V.offset)){var nt=Mt.createRange();nt.setStart(Z.node,Z.offset),ft.removeAllRanges(),$t>ke?(ft.addRange(nt),ft.extend(V.node,V.offset)):(nt.setEnd(V.node,V.offset),ft.addRange(nt))}}}}for(Mt=[],ft=A;ft=ft.parentNode;)ft.nodeType===1&&Mt.push({element:ft,left:ft.scrollLeft,top:ft.scrollTop});for(typeof A.focus=="function"&&A.focus(),A=0;A<Mt.length;A++){var St=Mt[A];St.element.scrollLeft=St.left,St.element.scrollTop=St.top}}oc=!!kf,Xf=kf=null}finally{Ue=u,H.p=o,F.T=a}}e.current=n,xn=2}}function Ig(){if(xn===2){xn=0;var e=Za,n=fr,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=F.T,F.T=null;var o=H.p;H.p=2;var u=Ue;Ue|=4;try{ug(e,n.alternate,n)}finally{Ue=u,H.p=o,F.T=a}}xn=3}}function Fg(){if(xn===4||xn===3){xn=0,X();var e=Za,n=fr,a=ga,o=Eg;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?xn=5:(xn=0,fr=Za=null,zg(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(Ya=null),Wr(a),n=n.stateNode,mt&&typeof mt.onCommitFiberRoot=="function")try{mt.onCommitFiberRoot(pt,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=F.T,u=H.p,H.p=2,F.T=null;try{for(var f=e.onRecoverableError,g=0;g<o.length;g++){var A=o[g];f(A.value,{componentStack:A.stack})}}finally{F.T=n,H.p=u}}(ga&3)!==0&&Kl(),Vi(e),u=e.pendingLanes,(a&261930)!==0&&(u&42)!==0?e===Df?To++:(To=0,Df=e):To=0,Ao(0)}}function zg(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,so(n)))}function Kl(){return Pg(),Ig(),Fg(),Bg()}function Bg(){if(xn!==5)return!1;var e=Za,n=Cf;Cf=0;var a=Wr(ga),o=F.T,u=H.p;try{H.p=32>a?32:a,F.T=null,a=wf,wf=null;var f=Za,g=ga;if(xn=0,fr=Za=null,ga=0,(Ue&6)!==0)throw Error(s(331));var A=Ue;if(Ue|=4,Sg(f.current),_g(f,f.current,g,a),Ue=A,Ao(0,!1),mt&&typeof mt.onPostCommitFiberRoot=="function")try{mt.onPostCommitFiberRoot(pt,f)}catch{}return!0}finally{H.p=u,F.T=o,zg(e,n)}}function Hg(e,n,a){n=pi(a,n),n=lf(e.stateNode,n,2),e=Ga(e,n,2),e!==null&&(Wt(e,2),Vi(e))}function Ie(e,n,a){if(e.tag===3)Hg(e,e,a);else for(;n!==null;){if(n.tag===3){Hg(n,e,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Ya===null||!Ya.has(o))){e=pi(a,e),a=Gm(2),o=Ga(n,a,2),o!==null&&(Vm(a,o,n,e),Wt(o,2),Vi(o));break}}n=n.return}}function Lf(e,n,a){var o=e.pingCache;if(o===null){o=e.pingCache=new Gx;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(Tf=!0,u.add(a),e=qx.bind(null,e,n,a),n.then(e,e))}function qx(e,n,a){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,Ye===e&&(Se&a)===a&&(an===4||an===3&&(Se&62914560)===Se&&300>Le()-kl?(Ue&2)===0&&hr(e,0):Af|=a,ur===Se&&(ur=0)),Vi(e)}function Gg(e,n){n===0&&(n=yt()),e=gs(e,n),e!==null&&(Wt(e,n),Vi(e))}function Yx(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),Gg(e,a)}function Zx(e,n){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),Gg(e,a)}function Kx(e,n){return En(e,n)}var Ql=null,pr=null,Of=!1,Jl=!1,Pf=!1,Qa=0;function Vi(e){e!==pr&&e.next===null&&(pr===null?Ql=pr=e:pr=pr.next=e),Jl=!0,Of||(Of=!0,Jx())}function Ao(e,n){if(!Pf&&Jl){Pf=!0;do for(var a=!1,o=Ql;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var f=0;else{var g=o.suspendedLanes,A=o.pingedLanes;f=(1<<31-Ht(42|e)+1)-1,f&=u&~(g&~A),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,Wg(o,f))}else f=Se,f=xt(o,o===Ye?f:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(f&3)===0||Ct(o,f)||(a=!0,Wg(o,f));o=o.next}while(a);Pf=!1}}function Qx(){Vg()}function Vg(){Jl=Of=!1;var e=0;Qa!==0&&oS()&&(e=Qa);for(var n=Le(),a=null,o=Ql;o!==null;){var u=o.next,f=kg(o,n);f===0?(o.next=null,a===null?Ql=u:a.next=u,u===null&&(pr=a)):(a=o,(e!==0||(f&3)!==0)&&(Jl=!0)),o=u}xn!==0&&xn!==5||Ao(e),Qa!==0&&(Qa=0)}function kg(e,n){for(var a=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,f=e.pendingLanes&-62914561;0<f;){var g=31-Ht(f),A=1<<g,z=u[g];z===-1?((A&a)===0||(A&o)!==0)&&(u[g]=It(A,n)):z<=n&&(e.expiredLanes|=A),f&=~A}if(n=Ye,a=Se,a=xt(e,e===n?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===n&&(Pe===2||Pe===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&We(o),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Ct(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(o!==null&&We(o),Wr(a)){case 2:case 8:a=M;break;case 32:a=K;break;case 268435456:a=dt;break;default:a=K}return o=Xg.bind(null,e),a=En(a,o),e.callbackPriority=n,e.callbackNode=a,n}return o!==null&&o!==null&&We(o),e.callbackPriority=2,e.callbackNode=null,2}function Xg(e,n){if(xn!==0&&xn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Kl()&&e.callbackNode!==a)return null;var o=Se;return o=xt(e,e===Ye?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(Tg(e,o,n),kg(e,Le()),e.callbackNode!=null&&e.callbackNode===a?Xg.bind(null,e):null)}function Wg(e,n){if(Kl())return null;Tg(e,n,!0)}function Jx(){cS(function(){(Ue&6)!==0?En(L,Qx):Vg()})}function If(){if(Qa===0){var e=$s;e===0&&(e=Jt,Jt<<=1,(Jt&261888)===0&&(Jt=256)),Qa=e}return Qa}function qg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ri(""+e)}function Yg(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function jx(e,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var f=qg((u[Rn]||null).action),g=o.submitter;g&&(n=(n=g[Rn]||null)?qg(n.formAction):g.getAttribute("formAction"),n!==null&&(f=n,g=null));var A=new cl("action","action",null,o,u);e.push({event:A,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Qa!==0){var z=g?Yg(u,g):new FormData(u);ef(a,{pending:!0,data:z,method:u.method,action:f},null,z)}}else typeof f=="function"&&(A.preventDefault(),z=g?Yg(u,g):new FormData(u),ef(a,{pending:!0,data:z,method:u.method,action:f},f,z))},currentTarget:u}]})}}for(var Ff=0;Ff<vu.length;Ff++){var zf=vu[Ff],$x=zf.toLowerCase(),tS=zf[0].toUpperCase()+zf.slice(1);Ci($x,"on"+tS)}Ci(bp,"onAnimationEnd"),Ci(Tp,"onAnimationIteration"),Ci(Ap,"onAnimationStart"),Ci("dblclick","onDoubleClick"),Ci("focusin","onFocus"),Ci("focusout","onBlur"),Ci(gx,"onTransitionRun"),Ci(_x,"onTransitionStart"),Ci(vx,"onTransitionCancel"),Ci(Rp,"onTransitionEnd"),G("onMouseEnter",["mouseout","mouseover"]),G("onMouseLeave",["mouseout","mouseover"]),G("onPointerEnter",["pointerout","pointerover"]),G("onPointerLeave",["pointerout","pointerover"]),T("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),T("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),T("onBeforeInput",["compositionend","keypress","textInput","paste"]),T("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),T("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),T("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ro="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),eS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ro));function Zg(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],u=o.event;o=o.listeners;t:{var f=void 0;if(n)for(var g=o.length-1;0<=g;g--){var A=o[g],z=A.instance,at=A.currentTarget;if(A=A.listener,z!==f&&u.isPropagationStopped())break t;f=A,u.currentTarget=at;try{f(u)}catch(vt){hl(vt)}u.currentTarget=null,f=z}else for(g=0;g<o.length;g++){if(A=o[g],z=A.instance,at=A.currentTarget,A=A.listener,z!==f&&u.isPropagationStopped())break t;f=A,u.currentTarget=at;try{f(u)}catch(vt){hl(vt)}u.currentTarget=null,f=z}}}}function ve(e,n){var a=n[us];a===void 0&&(a=n[us]=new Set);var o=e+"__bubble";a.has(o)||(Kg(n,e,2,!1),a.add(o))}function Bf(e,n,a){var o=0;n&&(o|=4),Kg(a,e,o,n)}var jl="_reactListening"+Math.random().toString(36).slice(2);function Hf(e){if(!e[jl]){e[jl]=!0,sl.forEach(function(a){a!=="selectionchange"&&(eS.has(a)||Bf(a,!1,e),Bf(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[jl]||(n[jl]=!0,Bf("selectionchange",!1,n))}}function Kg(e,n,a,o){switch(b0(n)){case 2:var u=wS;break;case 8:u=DS;break;default:u=eh}a=u.bind(null,n,a,e),u=void 0,!su||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(n,a,{capture:!0,passive:u}):e.addEventListener(n,a,!0):u!==void 0?e.addEventListener(n,a,{passive:u}):e.addEventListener(n,a,!1)}function Gf(e,n,a,o,u){var f=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var g=o.tag;if(g===3||g===4){var A=o.stateNode.containerInfo;if(A===u)break;if(g===4)for(g=o.return;g!==null;){var z=g.tag;if((z===3||z===4)&&g.stateNode.containerInfo===u)return;g=g.return}for(;A!==null;){if(g=ta(A),g===null)return;if(z=g.tag,z===5||z===6||z===26||z===27){o=f=g;continue t}A=A.parentNode}}o=o.return}tp(function(){var at=f,vt=iu(a),Mt=[];t:{var ot=Cp.get(e);if(ot!==void 0){var ft=cl,Yt=e;switch(e){case"keypress":if(ol(a)===0)break t;case"keydown":case"keyup":ft=Zv;break;case"focusin":Yt="focus",ft=cu;break;case"focusout":Yt="blur",ft=cu;break;case"beforeblur":case"afterblur":ft=cu;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ft=ip;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ft=Iv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ft=Jv;break;case bp:case Tp:case Ap:ft=Bv;break;case Rp:ft=$v;break;case"scroll":case"scrollend":ft=Ov;break;case"wheel":ft=ex;break;case"copy":case"cut":case"paste":ft=Gv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ft=sp;break;case"toggle":case"beforetoggle":ft=ix}var $t=(n&4)!==0,ke=!$t&&(e==="scroll"||e==="scrollend"),Z=$t?ot!==null?ot+"Capture":null:ot;$t=[];for(var V=at,nt;V!==null;){var St=V;if(nt=St.stateNode,St=St.tag,St!==5&&St!==26&&St!==27||nt===null||Z===null||(St=Zr(V,Z),St!=null&&$t.push(Co(V,St,nt))),ke)break;V=V.return}0<$t.length&&(ot=new ft(ot,Yt,null,a,vt),Mt.push({event:ot,listeners:$t}))}}if((n&7)===0){t:{if(ot=e==="mouseover"||e==="pointerover",ft=e==="mouseout"||e==="pointerout",ot&&a!==nu&&(Yt=a.relatedTarget||a.fromElement)&&(ta(Yt)||Yt[Xn]))break t;if((ft||ot)&&(ot=vt.window===vt?vt:(ot=vt.ownerDocument)?ot.defaultView||ot.parentWindow:window,ft?(Yt=a.relatedTarget||a.toElement,ft=at,Yt=Yt?ta(Yt):null,Yt!==null&&(ke=c(Yt),$t=Yt.tag,Yt!==ke||$t!==5&&$t!==27&&$t!==6)&&(Yt=null)):(ft=null,Yt=at),ft!==Yt)){if($t=ip,St="onMouseLeave",Z="onMouseEnter",V="mouse",(e==="pointerout"||e==="pointerover")&&($t=sp,St="onPointerLeave",Z="onPointerEnter",V="pointer"),ke=ft==null?ot:hs(ft),nt=Yt==null?ot:hs(Yt),ot=new $t(St,V+"leave",ft,a,vt),ot.target=ke,ot.relatedTarget=nt,St=null,ta(vt)===at&&($t=new $t(Z,V+"enter",Yt,a,vt),$t.target=nt,$t.relatedTarget=ke,St=$t),ke=St,ft&&Yt)e:{for($t=nS,Z=ft,V=Yt,nt=0,St=Z;St;St=$t(St))nt++;St=0;for(var jt=V;jt;jt=$t(jt))St++;for(;0<nt-St;)Z=$t(Z),nt--;for(;0<St-nt;)V=$t(V),St--;for(;nt--;){if(Z===V||V!==null&&Z===V.alternate){$t=Z;break e}Z=$t(Z),V=$t(V)}$t=null}else $t=null;ft!==null&&Qg(Mt,ot,ft,$t,!1),Yt!==null&&ke!==null&&Qg(Mt,ke,Yt,$t,!0)}}t:{if(ot=at?hs(at):window,ft=ot.nodeName&&ot.nodeName.toLowerCase(),ft==="select"||ft==="input"&&ot.type==="file")var Ae=dp;else if(fp(ot))if(pp)Ae=dx;else{Ae=fx;var Zt=ux}else ft=ot.nodeName,!ft||ft.toLowerCase()!=="input"||ot.type!=="checkbox"&&ot.type!=="radio"?at&&fi(at.elementType)&&(Ae=dp):Ae=hx;if(Ae&&(Ae=Ae(e,at))){hp(Mt,Ae,a,vt);break t}Zt&&Zt(e,ot,at),e==="focusout"&&at&&ot.type==="number"&&at.memoizedProps.value!=null&&vn(ot,"number",ot.value)}switch(Zt=at?hs(at):window,e){case"focusin":(fp(Zt)||Zt.contentEditable==="true")&&(Ws=Zt,mu=at,no=null);break;case"focusout":no=mu=Ws=null;break;case"mousedown":gu=!0;break;case"contextmenu":case"mouseup":case"dragend":gu=!1,yp(Mt,a,vt);break;case"selectionchange":if(mx)break;case"keydown":case"keyup":yp(Mt,a,vt)}var ue;if(fu)t:{switch(e){case"compositionstart":var Me="onCompositionStart";break t;case"compositionend":Me="onCompositionEnd";break t;case"compositionupdate":Me="onCompositionUpdate";break t}Me=void 0}else Xs?cp(e,a)&&(Me="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(Me="onCompositionStart");Me&&(rp&&a.locale!=="ko"&&(Xs||Me!=="onCompositionStart"?Me==="onCompositionEnd"&&Xs&&(ue=ep()):(Oa=vt,ru="value"in Oa?Oa.value:Oa.textContent,Xs=!0)),Zt=$l(at,Me),0<Zt.length&&(Me=new ap(Me,e,null,a,vt),Mt.push({event:Me,listeners:Zt}),ue?Me.data=ue:(ue=up(a),ue!==null&&(Me.data=ue)))),(ue=sx?rx(e,a):ox(e,a))&&(Me=$l(at,"onBeforeInput"),0<Me.length&&(Zt=new ap("onBeforeInput","beforeinput",null,a,vt),Mt.push({event:Zt,listeners:Me}),Zt.data=ue)),jx(Mt,e,at,a,vt)}Zg(Mt,n)})}function Co(e,n,a){return{instance:e,listener:n,currentTarget:a}}function $l(e,n){for(var a=n+"Capture",o=[];e!==null;){var u=e,f=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||f===null||(u=Zr(e,a),u!=null&&o.unshift(Co(e,u,f)),u=Zr(e,n),u!=null&&o.push(Co(e,u,f))),e.tag===3)return o;e=e.return}return[]}function nS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Qg(e,n,a,o,u){for(var f=n._reactName,g=[];a!==null&&a!==o;){var A=a,z=A.alternate,at=A.stateNode;if(A=A.tag,z!==null&&z===o)break;A!==5&&A!==26&&A!==27||at===null||(z=at,u?(at=Zr(a,f),at!=null&&g.unshift(Co(a,at,z))):u||(at=Zr(a,f),at!=null&&g.push(Co(a,at,z)))),a=a.return}g.length!==0&&e.push({event:n,listeners:g})}var iS=/\r\n?/g,aS=/\u0000|\uFFFD/g;function Jg(e){return(typeof e=="string"?e:""+e).replace(iS,`
`).replace(aS,"")}function jg(e,n){return n=Jg(n),Jg(e)===n}function Ve(e,n,a,o,u,f){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||Fn(e,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&Fn(e,""+o);break;case"className":Ut(e,"class",o);break;case"tabIndex":Ut(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Ut(e,a,o);break;case"style":Je(e,o,f);break;case"data":if(n!=="object"){Ut(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=Ri(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&Ve(e,n,"name",u.name,u,null),Ve(e,n,"formEncType",u.formEncType,u,null),Ve(e,n,"formMethod",u.formMethod,u,null),Ve(e,n,"formTarget",u.formTarget,u,null)):(Ve(e,n,"encType",u.encType,u,null),Ve(e,n,"method",u.method,u,null),Ve(e,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=Ri(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=hi);break;case"onScroll":o!=null&&ve("scroll",e);break;case"onScrollEnd":o!=null&&ve("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=Ri(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":ve("beforetoggle",e),ve("toggle",e),Gt(e,"popover",o);break;case"xlinkActuate":Ft(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Ft(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Ft(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Ft(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Ft(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Ft(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Ft(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Ft(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Ft(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Gt(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=He.get(a)||a,Gt(e,a,o))}}function Vf(e,n,a,o,u,f){switch(a){case"style":Je(e,o,f);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof o=="string"?Fn(e,o):(typeof o=="number"||typeof o=="bigint")&&Fn(e,""+o);break;case"onScroll":o!=null&&ve("scroll",e);break;case"onScrollEnd":o!=null&&ve("scrollend",e);break;case"onClick":o!=null&&(e.onclick=hi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Yr.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),f=e[Rn]||null,f=f!=null?f[a]:null,typeof f=="function"&&e.removeEventListener(n,f,u),typeof o=="function")){typeof f!="function"&&f!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,o,u);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):Gt(e,a,o)}}}function Un(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ve("error",e),ve("load",e);var o=!1,u=!1,f;for(f in a)if(a.hasOwnProperty(f)){var g=a[f];if(g!=null)switch(f){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Ve(e,n,f,g,a,null)}}u&&Ve(e,n,"srcSet",a.srcSet,a,null),o&&Ve(e,n,"src",a.src,a,null);return;case"input":ve("invalid",e);var A=f=g=u=null,z=null,at=null;for(o in a)if(a.hasOwnProperty(o)){var vt=a[o];if(vt!=null)switch(o){case"name":u=vt;break;case"type":g=vt;break;case"checked":z=vt;break;case"defaultChecked":at=vt;break;case"value":f=vt;break;case"defaultValue":A=vt;break;case"children":case"dangerouslySetInnerHTML":if(vt!=null)throw Error(s(137,n));break;default:Ve(e,n,o,vt,a,null)}}Vt(e,f,A,z,at,g,u,!1);return;case"select":ve("invalid",e),o=g=f=null;for(u in a)if(a.hasOwnProperty(u)&&(A=a[u],A!=null))switch(u){case"value":f=A;break;case"defaultValue":g=A;break;case"multiple":o=A;default:Ve(e,n,u,A,a,null)}n=f,a=g,e.multiple=!!o,n!=null?he(e,!!o,n,!1):a!=null&&he(e,!!o,a,!0);return;case"textarea":ve("invalid",e),f=u=o=null;for(g in a)if(a.hasOwnProperty(g)&&(A=a[g],A!=null))switch(g){case"value":o=A;break;case"defaultValue":u=A;break;case"children":f=A;break;case"dangerouslySetInnerHTML":if(A!=null)throw Error(s(91));break;default:Ve(e,n,g,A,a,null)}ti(e,o,u,f);return;case"option":for(z in a)a.hasOwnProperty(z)&&(o=a[z],o!=null)&&(z==="selected"?e.selected=o&&typeof o!="function"&&typeof o!="symbol":Ve(e,n,z,o,a,null));return;case"dialog":ve("beforetoggle",e),ve("toggle",e),ve("cancel",e),ve("close",e);break;case"iframe":case"object":ve("load",e);break;case"video":case"audio":for(o=0;o<Ro.length;o++)ve(Ro[o],e);break;case"image":ve("error",e),ve("load",e);break;case"details":ve("toggle",e);break;case"embed":case"source":case"link":ve("error",e),ve("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(at in a)if(a.hasOwnProperty(at)&&(o=a[at],o!=null))switch(at){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Ve(e,n,at,o,a,null)}return;default:if(fi(n)){for(vt in a)a.hasOwnProperty(vt)&&(o=a[vt],o!==void 0&&Vf(e,n,vt,o,a,void 0));return}}for(A in a)a.hasOwnProperty(A)&&(o=a[A],o!=null&&Ve(e,n,A,o,a,null))}function sS(e,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,f=null,g=null,A=null,z=null,at=null,vt=null;for(ft in a){var Mt=a[ft];if(a.hasOwnProperty(ft)&&Mt!=null)switch(ft){case"checked":break;case"value":break;case"defaultValue":z=Mt;default:o.hasOwnProperty(ft)||Ve(e,n,ft,null,o,Mt)}}for(var ot in o){var ft=o[ot];if(Mt=a[ot],o.hasOwnProperty(ot)&&(ft!=null||Mt!=null))switch(ot){case"type":f=ft;break;case"name":u=ft;break;case"checked":at=ft;break;case"defaultChecked":vt=ft;break;case"value":g=ft;break;case"defaultValue":A=ft;break;case"children":case"dangerouslySetInnerHTML":if(ft!=null)throw Error(s(137,n));break;default:ft!==Mt&&Ve(e,n,ot,ft,o,Mt)}}hn(e,g,A,z,at,vt,f,u);return;case"select":ft=g=A=ot=null;for(f in a)if(z=a[f],a.hasOwnProperty(f)&&z!=null)switch(f){case"value":break;case"multiple":ft=z;default:o.hasOwnProperty(f)||Ve(e,n,f,null,o,z)}for(u in o)if(f=o[u],z=a[u],o.hasOwnProperty(u)&&(f!=null||z!=null))switch(u){case"value":ot=f;break;case"defaultValue":A=f;break;case"multiple":g=f;default:f!==z&&Ve(e,n,u,f,o,z)}n=A,a=g,o=ft,ot!=null?he(e,!!a,ot,!1):!!o!=!!a&&(n!=null?he(e,!!a,n,!0):he(e,!!a,a?[]:"",!1));return;case"textarea":ft=ot=null;for(A in a)if(u=a[A],a.hasOwnProperty(A)&&u!=null&&!o.hasOwnProperty(A))switch(A){case"value":break;case"children":break;default:Ve(e,n,A,null,o,u)}for(g in o)if(u=o[g],f=a[g],o.hasOwnProperty(g)&&(u!=null||f!=null))switch(g){case"value":ot=u;break;case"defaultValue":ft=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==f&&Ve(e,n,g,u,o,f)}In(e,ot,ft);return;case"option":for(var Yt in a)ot=a[Yt],a.hasOwnProperty(Yt)&&ot!=null&&!o.hasOwnProperty(Yt)&&(Yt==="selected"?e.selected=!1:Ve(e,n,Yt,null,o,ot));for(z in o)ot=o[z],ft=a[z],o.hasOwnProperty(z)&&ot!==ft&&(ot!=null||ft!=null)&&(z==="selected"?e.selected=ot&&typeof ot!="function"&&typeof ot!="symbol":Ve(e,n,z,ot,o,ft));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var $t in a)ot=a[$t],a.hasOwnProperty($t)&&ot!=null&&!o.hasOwnProperty($t)&&Ve(e,n,$t,null,o,ot);for(at in o)if(ot=o[at],ft=a[at],o.hasOwnProperty(at)&&ot!==ft&&(ot!=null||ft!=null))switch(at){case"children":case"dangerouslySetInnerHTML":if(ot!=null)throw Error(s(137,n));break;default:Ve(e,n,at,ot,o,ft)}return;default:if(fi(n)){for(var ke in a)ot=a[ke],a.hasOwnProperty(ke)&&ot!==void 0&&!o.hasOwnProperty(ke)&&Vf(e,n,ke,void 0,o,ot);for(vt in o)ot=o[vt],ft=a[vt],!o.hasOwnProperty(vt)||ot===ft||ot===void 0&&ft===void 0||Vf(e,n,vt,ot,o,ft);return}}for(var Z in a)ot=a[Z],a.hasOwnProperty(Z)&&ot!=null&&!o.hasOwnProperty(Z)&&Ve(e,n,Z,null,o,ot);for(Mt in o)ot=o[Mt],ft=a[Mt],!o.hasOwnProperty(Mt)||ot===ft||ot==null&&ft==null||Ve(e,n,Mt,ot,o,ft)}function $g(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function rS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],f=u.transferSize,g=u.initiatorType,A=u.duration;if(f&&A&&$g(g)){for(g=0,A=u.responseEnd,o+=1;o<a.length;o++){var z=a[o],at=z.startTime;if(at>A)break;var vt=z.transferSize,Mt=z.initiatorType;vt&&$g(Mt)&&(z=z.responseEnd,g+=vt*(z<A?1:(A-at)/(z-at)))}if(--o,n+=8*(f+g)/(u.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var kf=null,Xf=null;function tc(e){return e.nodeType===9?e:e.ownerDocument}function t0(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function e0(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function Wf(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var qf=null;function oS(){var e=window.event;return e&&e.type==="popstate"?e===qf?!1:(qf=e,!0):(qf=null,!1)}var n0=typeof setTimeout=="function"?setTimeout:void 0,lS=typeof clearTimeout=="function"?clearTimeout:void 0,i0=typeof Promise=="function"?Promise:void 0,cS=typeof queueMicrotask=="function"?queueMicrotask:typeof i0<"u"?function(e){return i0.resolve(null).then(e).catch(uS)}:n0;function uS(e){setTimeout(function(){throw e})}function Ja(e){return e==="head"}function a0(e,n){var a=n,o=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(u),vr(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")wo(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,wo(a);for(var f=a.firstChild;f;){var g=f.nextSibling,A=f.nodeName;f[Da]||A==="SCRIPT"||A==="STYLE"||A==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=g}}else a==="body"&&wo(e.ownerDocument.body);a=u}while(a);vr(n)}function s0(e,n){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function Yf(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Yf(a),Ua(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function fS(e,n,a,o){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[Da])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(f=e.getAttribute("rel"),f==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(f!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(f=e.getAttribute("src"),(f!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&f&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var f=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===f)return e}else return e;if(e=xi(e.nextSibling),e===null)break}return null}function hS(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=xi(e.nextSibling),e===null))return null;return e}function r0(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=xi(e.nextSibling),e===null))return null;return e}function Zf(e){return e.data==="$?"||e.data==="$~"}function Kf(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function dS(e,n){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function xi(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var Qf=null;function o0(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(n===0)return xi(e.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}e=e.nextSibling}return null}function l0(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return e;n--}else a!=="/$"&&a!=="/&"||n++}e=e.previousSibling}return null}function c0(e,n,a){switch(n=tc(a),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function wo(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);Ua(e)}var Si=new Map,u0=new Set;function ec(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _a=H.d;H.d={f:pS,r:mS,D:gS,C:_S,L:vS,m:xS,X:MS,S:SS,M:yS};function pS(){var e=_a.f(),n=ql();return e||n}function mS(e){var n=ea(e);n!==null&&n.tag===5&&n.type==="form"?Rm(n):_a.r(e)}var mr=typeof document>"u"?null:document;function f0(e,n,a){var o=mr;if(o&&typeof n=="string"&&n){var u=fe(n);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),u0.has(u)||(u0.add(u),e={rel:e,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),Un(n,"link",e),fn(n),o.head.appendChild(n)))}}function gS(e){_a.D(e),f0("dns-prefetch",e,null)}function _S(e,n){_a.C(e,n),f0("preconnect",e,n)}function vS(e,n,a){_a.L(e,n,a);var o=mr;if(o&&e&&n){var u='link[rel="preload"][as="'+fe(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+fe(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+fe(a.imageSizes)+'"]')):u+='[href="'+fe(e)+'"]';var f=u;switch(n){case"style":f=gr(e);break;case"script":f=_r(e)}Si.has(f)||(e=v({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),Si.set(f,e),o.querySelector(u)!==null||n==="style"&&o.querySelector(Do(f))||n==="script"&&o.querySelector(Uo(f))||(n=o.createElement("link"),Un(n,"link",e),fn(n),o.head.appendChild(n)))}}function xS(e,n){_a.m(e,n);var a=mr;if(a&&e){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+fe(o)+'"][href="'+fe(e)+'"]',f=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=_r(e)}if(!Si.has(f)&&(e=v({rel:"modulepreload",href:e},n),Si.set(f,e),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Uo(f)))return}o=a.createElement("link"),Un(o,"link",e),fn(o),a.head.appendChild(o)}}}function SS(e,n,a){_a.S(e,n,a);var o=mr;if(o&&e){var u=Na(o).hoistableStyles,f=gr(e);n=n||"default";var g=u.get(f);if(!g){var A={loading:0,preload:null};if(g=o.querySelector(Do(f)))A.loading=5;else{e=v({rel:"stylesheet",href:e,"data-precedence":n},a),(a=Si.get(f))&&Jf(e,a);var z=g=o.createElement("link");fn(z),Un(z,"link",e),z._p=new Promise(function(at,vt){z.onload=at,z.onerror=vt}),z.addEventListener("load",function(){A.loading|=1}),z.addEventListener("error",function(){A.loading|=2}),A.loading|=4,nc(g,n,o)}g={type:"stylesheet",instance:g,count:1,state:A},u.set(f,g)}}}function MS(e,n){_a.X(e,n);var a=mr;if(a&&e){var o=Na(a).hoistableScripts,u=_r(e),f=o.get(u);f||(f=a.querySelector(Uo(u)),f||(e=v({src:e,async:!0},n),(n=Si.get(u))&&jf(e,n),f=a.createElement("script"),fn(f),Un(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function yS(e,n){_a.M(e,n);var a=mr;if(a&&e){var o=Na(a).hoistableScripts,u=_r(e),f=o.get(u);f||(f=a.querySelector(Uo(u)),f||(e=v({src:e,async:!0,type:"module"},n),(n=Si.get(u))&&jf(e,n),f=a.createElement("script"),fn(f),Un(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function h0(e,n,a,o){var u=(u=Xt.current)?ec(u):null;if(!u)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=gr(a.href),a=Na(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=gr(a.href);var f=Na(u).hoistableStyles,g=f.get(e);if(g||(u=u.ownerDocument||u,g={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(e,g),(f=u.querySelector(Do(e)))&&!f._p&&(g.instance=f,g.state.loading=5),Si.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Si.set(e,a),f||ES(u,e,a,g.state))),n&&o===null)throw Error(s(528,""));return g}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=_r(a),a=Na(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function gr(e){return'href="'+fe(e)+'"'}function Do(e){return'link[rel="stylesheet"]['+e+"]"}function d0(e){return v({},e,{"data-precedence":e.precedence,precedence:null})}function ES(e,n,a,o){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=e.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),Un(n,"link",a),fn(n),e.head.appendChild(n))}function _r(e){return'[src="'+fe(e)+'"]'}function Uo(e){return"script[async]"+e}function p0(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+fe(a.href)+'"]');if(o)return n.instance=o,fn(o),o;var u=v({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),fn(o),Un(o,"style",u),nc(o,a.precedence,e),n.instance=o;case"stylesheet":u=gr(a.href);var f=e.querySelector(Do(u));if(f)return n.state.loading|=4,n.instance=f,fn(f),f;o=d0(a),(u=Si.get(u))&&Jf(o,u),f=(e.ownerDocument||e).createElement("link"),fn(f);var g=f;return g._p=new Promise(function(A,z){g.onload=A,g.onerror=z}),Un(f,"link",o),n.state.loading|=4,nc(f,a.precedence,e),n.instance=f;case"script":return f=_r(a.src),(u=e.querySelector(Uo(f)))?(n.instance=u,fn(u),u):(o=a,(u=Si.get(f))&&(o=v({},a),jf(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),fn(u),Un(u,"link",o),e.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,nc(o,a.precedence,e));return n.instance}function nc(e,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,f=u,g=0;g<o.length;g++){var A=o[g];if(A.dataset.precedence===n)f=A;else if(f!==u)break}f?f.parentNode.insertBefore(e,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function Jf(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function jf(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var ic=null;function m0(e,n,a){if(ic===null){var o=new Map,u=ic=new Map;u.set(a,o)}else u=ic,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var f=a[u];if(!(f[Da]||f[un]||e==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var g=f.getAttribute(n)||"";g=e+g;var A=o.get(g);A?A.push(f):o.set(g,[f])}}return o}function g0(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function bS(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(e=n.disabled,typeof n.precedence=="string"&&e==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function _0(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function TS(e,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=gr(o.href),f=n.querySelector(Do(u));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=ac.bind(e),n.then(e,e)),a.state.loading|=4,a.instance=f,fn(f);return}f=n.ownerDocument||n,o=d0(o),(u=Si.get(u))&&Jf(o,u),f=f.createElement("link"),fn(f);var g=f;g._p=new Promise(function(A,z){g.onload=A,g.onerror=z}),Un(f,"link",o),a.instance=f}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=ac.bind(e),n.addEventListener("load",a),n.addEventListener("error",a))}}var $f=0;function AS(e,n){return e.stylesheets&&e.count===0&&rc(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&rc(e,e.stylesheets),e.unsuspend){var f=e.unsuspend;e.unsuspend=null,f()}},6e4+n);0<e.imgBytes&&$f===0&&($f=62500*rS());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&rc(e,e.stylesheets),e.unsuspend)){var f=e.unsuspend;e.unsuspend=null,f()}},(e.imgBytes>$f?50:800)+n);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function ac(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)rc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var sc=null;function rc(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,sc=new Map,n.forEach(RS,e),sc=null,ac.call(e))}function RS(e,n){if(!(n.state.loading&4)){var a=sc.get(e);if(a)var o=a.get(null);else{a=new Map,sc.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<u.length;f++){var g=u[f];(g.nodeName==="LINK"||g.getAttribute("media")!=="not all")&&(a.set(g.dataset.precedence,g),o=g)}o&&a.set(null,o)}u=n.instance,g=u.getAttribute("data-precedence"),f=a.get(g)||o,f===o&&a.set(null,u),a.set(g,u),this.count++,o=ac.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),f?f.parentNode.insertBefore(u,f.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),n.state.loading|=4}}var No={$$typeof:B,Provider:null,Consumer:null,_currentValue:ct,_currentValue2:ct,_threadCount:0};function CS(e,n,a,o,u,f,g,A,z){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Kt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Kt(0),this.hiddenUpdates=Kt(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=f,this.onRecoverableError=g,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=z,this.incompleteTransitions=new Map}function v0(e,n,a,o,u,f,g,A,z,at,vt,Mt){return e=new CS(e,n,a,g,z,at,vt,Mt,A),n=1,f===!0&&(n|=24),f=ni(3,null,null,n),e.current=f,f.stateNode=e,n=Uu(),n.refCount++,e.pooledCache=n,n.refCount++,f.memoizedState={element:o,isDehydrated:a,cache:n},Pu(f),e}function x0(e){return e?(e=Zs,e):Zs}function S0(e,n,a,o,u,f){u=x0(u),o.context===null?o.context=u:o.pendingContext=u,o=Ha(n),o.payload={element:a},f=f===void 0?null:f,f!==null&&(o.callback=f),a=Ga(e,o,n),a!==null&&(Qn(a,e,n),co(a,e,n))}function M0(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function th(e,n){M0(e,n),(e=e.alternate)&&M0(e,n)}function y0(e){if(e.tag===13||e.tag===31){var n=gs(e,67108864);n!==null&&Qn(n,e,67108864),th(e,67108864)}}function E0(e){if(e.tag===13||e.tag===31){var n=oi();n=Xr(n);var a=gs(e,n);a!==null&&Qn(a,e,n),th(e,n)}}var oc=!0;function wS(e,n,a,o){var u=F.T;F.T=null;var f=H.p;try{H.p=2,eh(e,n,a,o)}finally{H.p=f,F.T=u}}function DS(e,n,a,o){var u=F.T;F.T=null;var f=H.p;try{H.p=8,eh(e,n,a,o)}finally{H.p=f,F.T=u}}function eh(e,n,a,o){if(oc){var u=nh(o);if(u===null)Gf(e,n,o,lc,a),T0(e,o);else if(NS(u,e,n,a,o))o.stopPropagation();else if(T0(e,o),n&4&&-1<US.indexOf(e)){for(;u!==null;){var f=ea(u);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var g=Rt(f.pendingLanes);if(g!==0){var A=f;for(A.pendingLanes|=2,A.entangledLanes|=2;g;){var z=1<<31-Ht(g);A.entanglements[1]|=z,g&=~z}Vi(f),(Ue&6)===0&&(Xl=Le()+500,Ao(0))}}break;case 31:case 13:A=gs(f,2),A!==null&&Qn(A,f,2),ql(),th(f,2)}if(f=nh(o),f===null&&Gf(e,n,o,lc,a),f===u)break;u=f}u!==null&&o.stopPropagation()}else Gf(e,n,o,null,a)}}function nh(e){return e=iu(e),ih(e)}var lc=null;function ih(e){if(lc=null,e=ta(e),e!==null){var n=c(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=h(n),e!==null)return e;e=null}else if(a===31){if(e=p(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return lc=e,null}function b0(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(we()){case L:return 2;case M:return 8;case K:case rt:return 32;case dt:return 268435456;default:return 32}default:return 32}}var ah=!1,ja=null,$a=null,ts=null,Lo=new Map,Oo=new Map,es=[],US="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function T0(e,n){switch(e){case"focusin":case"focusout":ja=null;break;case"dragenter":case"dragleave":$a=null;break;case"mouseover":case"mouseout":ts=null;break;case"pointerover":case"pointerout":Lo.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Oo.delete(n.pointerId)}}function Po(e,n,a,o,u,f){return e===null||e.nativeEvent!==f?(e={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:f,targetContainers:[u]},n!==null&&(n=ea(n),n!==null&&y0(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),e)}function NS(e,n,a,o,u){switch(n){case"focusin":return ja=Po(ja,e,n,a,o,u),!0;case"dragenter":return $a=Po($a,e,n,a,o,u),!0;case"mouseover":return ts=Po(ts,e,n,a,o,u),!0;case"pointerover":var f=u.pointerId;return Lo.set(f,Po(Lo.get(f)||null,e,n,a,o,u)),!0;case"gotpointercapture":return f=u.pointerId,Oo.set(f,Po(Oo.get(f)||null,e,n,a,o,u)),!0}return!1}function A0(e){var n=ta(e.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){e.blockedOn=n,Gs(e.priority,function(){E0(a)});return}}else if(n===31){if(n=p(a),n!==null){e.blockedOn=n,Gs(e.priority,function(){E0(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function cc(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=nh(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);nu=o,a.target.dispatchEvent(o),nu=null}else return n=ea(a),n!==null&&y0(n),e.blockedOn=a,!1;n.shift()}return!0}function R0(e,n,a){cc(e)&&a.delete(n)}function LS(){ah=!1,ja!==null&&cc(ja)&&(ja=null),$a!==null&&cc($a)&&($a=null),ts!==null&&cc(ts)&&(ts=null),Lo.forEach(R0),Oo.forEach(R0)}function uc(e,n){e.blockedOn===n&&(e.blockedOn=null,ah||(ah=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,LS)))}var fc=null;function C0(e){fc!==e&&(fc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){fc===e&&(fc=null);for(var n=0;n<e.length;n+=3){var a=e[n],o=e[n+1],u=e[n+2];if(typeof o!="function"){if(ih(o||a)===null)continue;break}var f=ea(a);f!==null&&(e.splice(n,3),n-=3,ef(f,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function vr(e){function n(z){return uc(z,e)}ja!==null&&uc(ja,e),$a!==null&&uc($a,e),ts!==null&&uc(ts,e),Lo.forEach(n),Oo.forEach(n);for(var a=0;a<es.length;a++){var o=es[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<es.length&&(a=es[0],a.blockedOn===null);)A0(a),a.blockedOn===null&&es.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],f=a[o+1],g=u[Rn]||null;if(typeof f=="function")g||C0(a);else if(g){var A=null;if(f&&f.hasAttribute("formAction")){if(u=f,g=f[Rn]||null)A=g.formAction;else if(ih(u)!==null)continue}else A=g.action;typeof A=="function"?a[o+1]=A:(a.splice(o,3),o-=3),C0(a)}}}function w0(){function e(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(g){return u=g})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function sh(e){this._internalRoot=e}hc.prototype.render=sh.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=oi();S0(a,o,e,n,null,null)},hc.prototype.unmount=sh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;S0(e.current,2,null,e,null,null),ql(),n[Xn]=null}};function hc(e){this._internalRoot=e}hc.prototype.unstable_scheduleHydration=function(e){if(e){var n=qr();e={blockedOn:null,target:e,priority:n};for(var a=0;a<es.length&&n!==0&&n<es[a].priority;a++);es.splice(a,0,e),a===0&&A0(e)}};var D0=t.version;if(D0!=="19.2.9")throw Error(s(527,D0,"19.2.9"));H.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=d(n),e=e!==null?x(e):null,e=e===null?null:e.stateNode,e};var OS={bundleType:0,version:"19.2.9",rendererPackageName:"react-dom",currentDispatcherRef:F,reconcilerVersion:"19.2.9"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var dc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!dc.isDisabled&&dc.supportsFiber)try{pt=dc.inject(OS),mt=dc}catch{}}return Fo.createRoot=function(e,n){if(!l(e))throw Error(s(299));var a=!1,o="",u=Fm,f=zm,g=Bm;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(g=n.onRecoverableError)),n=v0(e,1,!1,null,null,a,o,null,u,f,g,w0),e[Xn]=n.current,Hf(e),new sh(n)},Fo.hydrateRoot=function(e,n,a){if(!l(e))throw Error(s(299));var o=!1,u="",f=Fm,g=zm,A=Bm,z=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(g=a.onCaughtError),a.onRecoverableError!==void 0&&(A=a.onRecoverableError),a.formState!==void 0&&(z=a.formState)),n=v0(e,1,!0,n,a??null,o,u,z,f,g,A,w0),n.context=x0(null),a=n.current,o=oi(),o=Xr(o),u=Ha(o),u.callback=null,Ga(a,u,o),a=o,n.current.lanes=a,Wt(n,a),Vi(n),e[Xn]=n.current,Hf(e),new hc(n)},Fo.version="19.2.9",Fo}var H0;function XS(){if(H0)return oh.exports;H0=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),oh.exports=kS(),oh.exports}var WS=XS(),sn=Pd();const Id="186",Fr={ROTATE:0,DOLLY:1,PAN:2},Or={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},qS=0,G0=1,YS=2,zc=1,ZS=2,Wo=3,Fs=0,jn=1,ba=2,Aa=0,Yo=1,Xh=2,V0=3,k0=4,KS=5,Nr=100,QS=101,JS=102,jS=103,$S=104,tM=200,eM=201,nM=202,iM=203,H_=204,G_=205,aM=206,sM=207,rM=208,oM=209,lM=210,cM=211,uM=212,fM=213,hM=214,Wh=0,qh=1,Yh=2,Qo=3,Zh=4,Kh=5,Qh=6,Jh=7,V_=0,dM=1,pM=2,Ki=0,k_=1,X_=2,W_=3,q_=4,Y_=5,Z_=6,K_=7,Q_=300,zs=301,Hr=302,hh=303,dh=304,Qc=306,jh=1e3,Pi=1001,$h=1002,Nn=1003,mM=1004,pc=1005,An=1006,ph=1007,Os=1008,bi=1009,J_=1010,j_=1011,Jo=1012,Fd=1013,Ji=1014,Yi=1015,Ii=1016,zd=1017,Bd=1018,jo=1020,$_=35902,tv=35899,ev=1021,nv=1022,Ti=1023,wa=1026,Ps=1027,iv=1028,Hd=1029,Bs=1030,Gd=1031,Vd=1033,Bc=33776,Hc=33777,Gc=33778,Vc=33779,td=35840,ed=35841,nd=35842,id=35843,ad=36196,sd=37492,rd=37496,od=37488,ld=37489,Xc=37490,cd=37491,ud=37808,fd=37809,hd=37810,dd=37811,pd=37812,md=37813,gd=37814,_d=37815,vd=37816,xd=37817,Sd=37818,Md=37819,yd=37820,Ed=37821,bd=36492,Td=36494,Ad=36495,Rd=36283,Cd=36284,Wc=36285,wd=36286,gM=3200,X0=0,_M=1,Ta="",yi="srgb",qc="srgb-linear",Yc="linear",Fe="srgb",mh=7680,vM=519,xM=512,SM=513,MM=514,kd=515,yM=516,EM=517,Xd=518,bM=519,TM=35044,W0="300 es",Zi=2e3,Zc=2001;function AM(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Kc(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function RM(){const r=Kc("canvas");return r.style.display="block",r}const q0={};function Y0(...r){const t="THREE."+r.shift();console.log(t,...r)}function av(r){const t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){const i=r[1];i&&i.isStackTrace?r[0]+=" "+i.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function ne(...r){r=av(r);const t="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.warn(i.getError(t)):console.warn(t,...r)}}function Ce(...r){r=av(r);const t="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.error(i.getError(t)):console.error(t,...r)}}function zr(...r){const t=r.join(" ");t in q0||(q0[t]=!0,ne(...r))}function CM(r,t,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}const wM={[Wh]:qh,[Yh]:Qh,[Zh]:Jh,[Qo]:Kh,[qh]:Wh,[Qh]:Yh,[Jh]:Zh,[Kh]:Qo};class cs{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(i)===-1&&s[t].push(i)}hasEventListener(t,i){const s=this._listeners;return s===void 0?!1:s[t]!==void 0&&s[t].indexOf(i)!==-1}removeEventListener(t,i){const s=this._listeners;if(s===void 0)return;const l=s[t];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(t){const i=this._listeners;if(i===void 0)return;const s=i[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let c=0,h=l.length;c<h;c++)l[c].call(this,t);t.target=null}}}const On=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Z0=1234567;const Zo=Math.PI/180,$o=180/Math.PI;function Vr(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(On[r&255]+On[r>>8&255]+On[r>>16&255]+On[r>>24&255]+"-"+On[t&255]+On[t>>8&255]+"-"+On[t>>16&15|64]+On[t>>24&255]+"-"+On[i&63|128]+On[i>>8&255]+"-"+On[i>>16&255]+On[i>>24&255]+On[s&255]+On[s>>8&255]+On[s>>16&255]+On[s>>24&255]).toLowerCase()}function ge(r,t,i){return Math.max(t,Math.min(i,r))}function Wd(r,t){return(r%t+t)%t}function DM(r,t,i,s,l){return s+(r-t)*(l-s)/(i-t)}function UM(r,t,i){return r!==t?(i-r)/(t-r):0}function Ko(r,t,i){return(1-i)*r+i*t}function NM(r,t,i,s){return Ko(r,t,1-Math.exp(-i*s))}function LM(r,t=1){return t-Math.abs(Wd(r,t*2)-t)}function OM(r,t,i){return r<=t?0:r>=i?1:(r=(r-t)/(i-t),r*r*(3-2*r))}function PM(r,t,i){return r<=t?0:r>=i?1:(r=(r-t)/(i-t),r*r*r*(r*(r*6-15)+10))}function IM(r,t){return r+Math.floor(Math.random()*(t-r+1))}function FM(r,t){return r+Math.random()*(t-r)}function zM(r){return r*(.5-Math.random())}function BM(r){r!==void 0&&(Z0=r);let t=Z0+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function HM(r){return r*Zo}function GM(r){return r*$o}function VM(r){return r>0&&Number.isInteger(r)&&2**Math.round(Math.log2(r))===r}function kM(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function XM(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function WM(r,t,i,s,l){const c=Math.cos,h=Math.sin,p=c(i/2),m=h(i/2),d=c((t+s)/2),x=h((t+s)/2),v=c((t-s)/2),_=h((t-s)/2),E=c((s-t)/2),R=h((s-t)/2);switch(l){case"XYX":r.set(p*x,m*v,m*_,p*d);break;case"YZY":r.set(m*_,p*x,m*v,p*d);break;case"ZXZ":r.set(m*v,m*_,p*x,p*d);break;case"XZX":r.set(p*x,m*R,m*E,p*d);break;case"YXY":r.set(m*E,p*x,m*R,p*d);break;case"ZYZ":r.set(m*R,m*E,p*x,p*d);break;default:ne("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+l)}}function Lr(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Bn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Dd={DEG2RAD:Zo,RAD2DEG:$o,generateUUID:Vr,clamp:ge,euclideanModulo:Wd,mapLinear:DM,inverseLerp:UM,lerp:Ko,damp:NM,pingpong:LM,smoothstep:OM,smootherstep:PM,randInt:IM,randFloat:FM,randFloatSpread:zM,seededRandom:BM,degToRad:HM,radToDeg:GM,isPowerOfTwo:VM,ceilPowerOfTwo:kM,floorPowerOfTwo:XM,setQuaternionFromProperEuler:WM,normalize:Bn,denormalize:Lr};class ie{static{ie.prototype.isVector2=!0}constructor(t=0,i=0){this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,s=this.y,l=t.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=ge(this.x,t.x,i.x),this.y=ge(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=ge(this.x,t,i),this.y=ge(this.y,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(ge(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(ge(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y;return i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-t.x,h=this.y-t.y;return this.x=c*s-h*l+t.x,this.y=c*l+h*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ls{constructor(t=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=s,this._w=l}static slerpFlat(t,i,s,l,c,h,p){let m=s[l+0],d=s[l+1],x=s[l+2],v=s[l+3],_=c[h+0],E=c[h+1],R=c[h+2],N=c[h+3];if(v!==N||m!==_||d!==E||x!==R){let y=m*_+d*E+x*R+v*N;y<0&&(_=-_,E=-E,R=-R,N=-N,y=-y);let S=1-p;if(y<.9995){const I=Math.acos(y),B=Math.sin(I);S=Math.sin(S*I)/B,p=Math.sin(p*I)/B,m=m*S+_*p,d=d*S+E*p,x=x*S+R*p,v=v*S+N*p}else{m=m*S+_*p,d=d*S+E*p,x=x*S+R*p,v=v*S+N*p;const I=1/Math.sqrt(m*m+d*d+x*x+v*v);m*=I,d*=I,x*=I,v*=I}}t[i]=m,t[i+1]=d,t[i+2]=x,t[i+3]=v}static multiplyQuaternionsFlat(t,i,s,l,c,h){const p=s[l],m=s[l+1],d=s[l+2],x=s[l+3],v=c[h],_=c[h+1],E=c[h+2],R=c[h+3];return t[i]=p*R+x*v+m*E-d*_,t[i+1]=m*R+x*_+d*v-p*E,t[i+2]=d*R+x*E+p*_-m*v,t[i+3]=x*R-p*v-m*_-d*E,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,s,l){return this._x=t,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const s=t._x,l=t._y,c=t._z,h=t._order,p=Math.cos,m=Math.sin,d=p(s/2),x=p(l/2),v=p(c/2),_=m(s/2),E=m(l/2),R=m(c/2);switch(h){case"XYZ":this._x=_*x*v+d*E*R,this._y=d*E*v-_*x*R,this._z=d*x*R+_*E*v,this._w=d*x*v-_*E*R;break;case"YXZ":this._x=_*x*v+d*E*R,this._y=d*E*v-_*x*R,this._z=d*x*R-_*E*v,this._w=d*x*v+_*E*R;break;case"ZXY":this._x=_*x*v-d*E*R,this._y=d*E*v+_*x*R,this._z=d*x*R+_*E*v,this._w=d*x*v-_*E*R;break;case"ZYX":this._x=_*x*v-d*E*R,this._y=d*E*v+_*x*R,this._z=d*x*R-_*E*v,this._w=d*x*v+_*E*R;break;case"YZX":this._x=_*x*v+d*E*R,this._y=d*E*v+_*x*R,this._z=d*x*R-_*E*v,this._w=d*x*v-_*E*R;break;case"XZY":this._x=_*x*v-d*E*R,this._y=d*E*v-_*x*R,this._z=d*x*R+_*E*v,this._w=d*x*v+_*E*R;break;default:ne("Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const s=i/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,s=i[0],l=i[4],c=i[8],h=i[1],p=i[5],m=i[9],d=i[2],x=i[6],v=i[10],_=s+p+v;if(_>0){const E=.5/Math.sqrt(_+1);this._w=.25/E,this._x=(x-m)*E,this._y=(c-d)*E,this._z=(h-l)*E}else if(s>p&&s>v){const E=2*Math.sqrt(1+s-p-v);this._w=(x-m)/E,this._x=.25*E,this._y=(l+h)/E,this._z=(c+d)/E}else if(p>v){const E=2*Math.sqrt(1+p-s-v);this._w=(c-d)/E,this._x=(l+h)/E,this._y=.25*E,this._z=(m+x)/E}else{const E=2*Math.sqrt(1+v-s-p);this._w=(h-l)/E,this._x=(c+d)/E,this._y=(m+x)/E,this._z=.25*E}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let s=t.dot(i)+1;return s<1e-8?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ge(this.dot(t),-1,1)))}rotateTowards(t,i){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const s=t._x,l=t._y,c=t._z,h=t._w,p=i._x,m=i._y,d=i._z,x=i._w;return this._x=s*x+h*p+l*d-c*m,this._y=l*x+h*m+c*p-s*d,this._z=c*x+h*d+s*m-l*p,this._w=h*x-s*p-l*m-c*d,this._onChangeCallback(),this}slerp(t,i){let s=t._x,l=t._y,c=t._z,h=t._w,p=this.dot(t);p<0&&(s=-s,l=-l,c=-c,h=-h,p=-p);let m=1-i;if(p<.9995){const d=Math.acos(p),x=Math.sin(d);m=Math.sin(m*d)/x,i=Math.sin(i*d)/x,this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+h*i,this._onChangeCallback()}else this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+h*i,this.normalize();return this}slerpQuaternions(t,i,s){return this.copy(t).slerp(i,s)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(i),c*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class et{static{et.prototype.isVector3=!0}constructor(t=0,i=0,s=0){this.x=t,this.y=i,this.z=s}set(t,i,s){return s===void 0&&(s=this.z),this.x=t,this.y=i,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(K0.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(K0.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=t.elements,h=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*h,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*h,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*h,this}applyQuaternion(t){const i=this.x,s=this.y,l=this.z,c=t.x,h=t.y,p=t.z,m=t.w,d=2*(h*l-p*s),x=2*(p*i-c*l),v=2*(c*s-h*i);return this.x=i+m*d+h*v-p*x,this.y=s+m*x+p*d-c*v,this.z=l+m*v+c*x-h*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=ge(this.x,t.x,i.x),this.y=ge(this.y,t.y,i.y),this.z=ge(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=ge(this.x,t,i),this.y=ge(this.y,t,i),this.z=ge(this.z,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(ge(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const s=t.x,l=t.y,c=t.z,h=i.x,p=i.y,m=i.z;return this.x=l*m-c*p,this.y=c*h-s*m,this.z=s*p-l*h,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const s=t.dot(this)/i;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return gh.copy(this).projectOnVector(t),this.sub(gh)}reflect(t){return this.sub(gh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(ge(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return i*i+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,s){const l=Math.sin(i)*t;return this.x=l*Math.sin(s),this.y=Math.cos(i)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,s){return this.x=t*Math.sin(i),this.y=s,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(t),this.y=i,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const gh=new et,K0=new ls;class re{static{re.prototype.isMatrix3=!0}constructor(t,i,s,l,c,h,p,m,d){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,h,p,m,d)}set(t,i,s,l,c,h,p,m,d){const x=this.elements;return x[0]=t,x[1]=l,x[2]=p,x[3]=i,x[4]=c,x[5]=m,x[6]=s,x[7]=h,x[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(t,i,s){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,h=s[0],p=s[3],m=s[6],d=s[1],x=s[4],v=s[7],_=s[2],E=s[5],R=s[8],N=l[0],y=l[3],S=l[6],I=l[1],B=l[4],D=l[7],U=l[2],C=l[5],P=l[8];return c[0]=h*N+p*I+m*U,c[3]=h*y+p*B+m*C,c[6]=h*S+p*D+m*P,c[1]=d*N+x*I+v*U,c[4]=d*y+x*B+v*C,c[7]=d*S+x*D+v*P,c[2]=_*N+E*I+R*U,c[5]=_*y+E*B+R*C,c[8]=_*S+E*D+R*P,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],p=t[5],m=t[6],d=t[7],x=t[8];return i*h*x-i*p*d-s*c*x+s*p*m+l*c*d-l*h*m}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],p=t[5],m=t[6],d=t[7],x=t[8],v=x*h-p*d,_=p*m-x*c,E=d*c-h*m,R=i*v+s*_+l*E;if(R===0)return this.set(0,0,0,0,0,0,0,0,0);const N=1/R;return t[0]=v*N,t[1]=(l*d-x*s)*N,t[2]=(p*s-l*h)*N,t[3]=_*N,t[4]=(x*i-l*m)*N,t[5]=(l*c-p*i)*N,t[6]=E*N,t[7]=(s*m-d*i)*N,t[8]=(h*i-s*c)*N,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,s,l,c,h,p){const m=Math.cos(c),d=Math.sin(c);return this.set(s*m,s*d,-s*(m*h+d*p)+h+t,-l*d,l*m,-l*(-d*h+m*p)+p+i,0,0,1),this}scale(t,i){return zr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(_h.makeScale(t,i)),this}rotate(t){return zr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(_h.makeRotation(-t)),this}translate(t,i){return zr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(_h.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<9;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const _h=new re,Q0=new re().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),J0=new re().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qM(){const r={enabled:!0,workingColorSpace:qc,spaces:{},convert:function(l,c,h){return this.enabled===!1||c===h||!c||!h||(this.spaces[c].transfer===Fe&&(l.r=Ra(l.r),l.g=Ra(l.g),l.b=Ra(l.b)),this.spaces[c].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Fe&&(l.r=Br(l.r),l.g=Br(l.g),l.b=Br(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===Ta?Yc:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,h){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return zr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return zr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[qc]:{primaries:t,whitePoint:s,transfer:Yc,toXYZ:Q0,fromXYZ:J0,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:yi},outputColorSpaceConfig:{drawingBufferColorSpace:yi}},[yi]:{primaries:t,whitePoint:s,transfer:Fe,toXYZ:Q0,fromXYZ:J0,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:yi}}}),r}const Ee=qM();function Ra(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Br(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let xr;class YM{static getDataURL(t,i="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let s;if(t instanceof HTMLCanvasElement)s=t;else{xr===void 0&&(xr=Kc("canvas")),xr.width=t.width,xr.height=t.height;const l=xr.getContext("2d");t instanceof ImageData?l.putImageData(t,0,0):l.drawImage(t,0,0,t.width,t.height),s=xr}return s.toDataURL(i)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=Kc("canvas");i.width=t.width,i.height=t.height;const s=i.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),c=l.data;for(let h=0;h<c.length;h++)c[h]=Ra(c[h]/255)*255;return s.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(Ra(i[s]/255)*255):i[s]=Ra(i[s]);return{data:i,width:t.width,height:t.height}}else return ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ZM=0;class qd{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ZM++}),this.uuid=Vr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?t.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?t.set(i.displayWidth,i.displayHeight,0):i!==null?t.set(i.width,i.height,i.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let h=0,p=l.length;h<p;h++)l[h].isDataTexture?c.push(vh(l[h].image)):c.push(vh(l[h]))}else c=vh(l);s.url=c}return i||(t.images[this.uuid]=s),s}}function vh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?YM.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(ne("Texture: Unable to serialize Texture."),{})}let KM=0;const xh=new et;class Vn extends cs{constructor(t=Vn.DEFAULT_IMAGE,i=Vn.DEFAULT_MAPPING,s=Pi,l=Pi,c=An,h=Os,p=Ti,m=bi,d=Vn.DEFAULT_ANISOTROPY,x=Ta){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:KM++}),this.uuid=Vr(),this.name="",this.source=new qd(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=h,this.anisotropy=d,this.format=p,this.internalFormat=null,this.type=m,this.offset=new ie(0,0),this.repeat=new ie(1,1),this.center=new ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new re,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=x,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(xh).x}get height(){return this.source.getSize(xh).y}get depth(){return this.source.getSize(xh).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const i in t){const s=t[i];if(s===void 0){ne(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ne(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Q_)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case jh:t.x=t.x-Math.floor(t.x);break;case Pi:t.x=t.x<0?0:1;break;case $h:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case jh:t.y=t.y-Math.floor(t.y);break;case Pi:t.y=t.y<0?0:1;break;case $h:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Vn.DEFAULT_IMAGE=null;Vn.DEFAULT_MAPPING=Q_;Vn.DEFAULT_ANISOTROPY=1;class rn{static{rn.prototype.isVector4=!0}constructor(t=0,i=0,s=0,l=1){this.x=t,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,s,l){return this.x=t,this.y=i,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=this.w,h=t.elements;return this.x=h[0]*i+h[4]*s+h[8]*l+h[12]*c,this.y=h[1]*i+h[5]*s+h[9]*l+h[13]*c,this.z=h[2]*i+h[6]*s+h[10]*l+h[14]*c,this.w=h[3]*i+h[7]*s+h[11]*l+h[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,s,l,c;const m=t.elements,d=m[0],x=m[4],v=m[8],_=m[1],E=m[5],R=m[9],N=m[2],y=m[6],S=m[10];if(Math.abs(x-_)<.01&&Math.abs(v-N)<.01&&Math.abs(R-y)<.01){if(Math.abs(x+_)<.1&&Math.abs(v+N)<.1&&Math.abs(R+y)<.1&&Math.abs(d+E+S-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const B=(d+1)/2,D=(E+1)/2,U=(S+1)/2,C=(x+_)/4,P=(v+N)/4,b=(R+y)/4;return B>D&&B>U?B<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(B),l=C/s,c=P/s):D>U?D<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(D),s=C/l,c=b/l):U<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(U),s=P/c,l=b/c),this.set(s,l,c,i),this}let I=Math.sqrt((y-R)*(y-R)+(v-N)*(v-N)+(_-x)*(_-x));return Math.abs(I)<.001&&(I=1),this.x=(y-R)/I,this.y=(v-N)/I,this.z=(_-x)/I,this.w=Math.acos((d+E+S-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=ge(this.x,t.x,i.x),this.y=ge(this.y,t.y,i.y),this.z=ge(this.z,t.z,i.z),this.w=ge(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=ge(this.x,t,i),this.y=ge(this.y,t,i),this.z=ge(this.z,t,i),this.w=ge(this.w,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(ge(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this.w=t.w+(i.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class QM extends cs{constructor(t=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:An,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},s),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=s.depth,this.scissor=new rn(0,0,t,i),this.scissorTest=!1,this.viewport=new rn(0,0,t,i),this.textures=[];const l={width:t,height:i,depth:s.depth},c=new Vn(l),h=s.count;for(let p=0;p<h;p++)this.textures[p]=c.clone(),this.textures[p].isRenderTargetTexture=!0,this.textures[p].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveColorBuffer=s.resolveColorBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.storeMultisampledColorBuffer=s.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=s.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=s.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview,this.useArrayDepthTexture=s.useArrayDepthTexture}_setTextureOptions(t={}){const i={minFilter:An,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(i.mapping=t.mapping),t.wrapS!==void 0&&(i.wrapS=t.wrapS),t.wrapT!==void 0&&(i.wrapT=t.wrapT),t.wrapR!==void 0&&(i.wrapR=t.wrapR),t.magFilter!==void 0&&(i.magFilter=t.magFilter),t.minFilter!==void 0&&(i.minFilter=t.minFilter),t.format!==void 0&&(i.format=t.format),t.type!==void 0&&(i.type=t.type),t.anisotropy!==void 0&&(i.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(i.colorSpace=t.colorSpace),t.flipY!==void 0&&(i.flipY=t.flipY),t.generateMipmaps!==void 0&&(i.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(i.internalFormat=t.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,i,s=1){if(this.width!==t||this.height!==i||this.depth!==s){this.width=t,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++){this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},t.textures[i].image);this.textures[i].source=new qd(l)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const i=t.depthTexture.clone();i.renderTarget=null,this.depthTexture=i}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ai extends QM{constructor(t=1,i=1,s={}){super(t,i,s),this.isWebGLRenderTarget=!0}}class sv extends Vn{constructor(t=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Nn,this.minFilter=Nn,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class JM extends Vn{constructor(t=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Nn,this.minFilter=Nn,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}class cn{static{cn.prototype.isMatrix4=!0}constructor(t,i,s,l,c,h,p,m,d,x,v,_,E,R,N,y){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,h,p,m,d,x,v,_,E,R,N,y)}set(t,i,s,l,c,h,p,m,d,x,v,_,E,R,N,y){const S=this.elements;return S[0]=t,S[4]=i,S[8]=s,S[12]=l,S[1]=c,S[5]=h,S[9]=p,S[13]=m,S[2]=d,S[6]=x,S[10]=v,S[14]=_,S[3]=E,S[7]=R,S[11]=N,S[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new cn().fromArray(this.elements)}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(t){const i=this.elements,s=t.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,s){return this.determinantAffine()===0?(t.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(t,i,s){return this.set(t.x,i.x,s.x,0,t.y,i.y,s.y,0,t.z,i.z,s.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const i=this.elements,s=t.elements,l=1/Sr.setFromMatrixColumn(t,0).length(),c=1/Sr.setFromMatrixColumn(t,1).length(),h=1/Sr.setFromMatrixColumn(t,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*h,i[9]=s[9]*h,i[10]=s[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,s=t.x,l=t.y,c=t.z,h=Math.cos(s),p=Math.sin(s),m=Math.cos(l),d=Math.sin(l),x=Math.cos(c),v=Math.sin(c);if(t.order==="XYZ"){const _=h*x,E=h*v,R=p*x,N=p*v;i[0]=m*x,i[4]=-m*v,i[8]=d,i[1]=E+R*d,i[5]=_-N*d,i[9]=-p*m,i[2]=N-_*d,i[6]=R+E*d,i[10]=h*m}else if(t.order==="YXZ"){const _=m*x,E=m*v,R=d*x,N=d*v;i[0]=_+N*p,i[4]=R*p-E,i[8]=h*d,i[1]=h*v,i[5]=h*x,i[9]=-p,i[2]=E*p-R,i[6]=N+_*p,i[10]=h*m}else if(t.order==="ZXY"){const _=m*x,E=m*v,R=d*x,N=d*v;i[0]=_-N*p,i[4]=-h*v,i[8]=R+E*p,i[1]=E+R*p,i[5]=h*x,i[9]=N-_*p,i[2]=-h*d,i[6]=p,i[10]=h*m}else if(t.order==="ZYX"){const _=h*x,E=h*v,R=p*x,N=p*v;i[0]=m*x,i[4]=R*d-E,i[8]=_*d+N,i[1]=m*v,i[5]=N*d+_,i[9]=E*d-R,i[2]=-d,i[6]=p*m,i[10]=h*m}else if(t.order==="YZX"){const _=h*m,E=h*d,R=p*m,N=p*d;i[0]=m*x,i[4]=N-_*v,i[8]=R*v+E,i[1]=v,i[5]=h*x,i[9]=-p*x,i[2]=-d*x,i[6]=E*v+R,i[10]=_-N*v}else if(t.order==="XZY"){const _=h*m,E=h*d,R=p*m,N=p*d;i[0]=m*x,i[4]=-v,i[8]=d*x,i[1]=_*v+N,i[5]=h*x,i[9]=E*v-R,i[2]=R*v-E,i[6]=p*x,i[10]=N*v+_}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(jM,t,$M)}lookAt(t,i,s){const l=this.elements;return li.subVectors(t,i),li.lengthSq()===0&&(li.z=1),li.normalize(),is.crossVectors(s,li),is.lengthSq()===0&&(Math.abs(s.z)===1?li.x+=1e-4:li.z+=1e-4,li.normalize(),is.crossVectors(s,li)),is.normalize(),mc.crossVectors(li,is),l[0]=is.x,l[4]=mc.x,l[8]=li.x,l[1]=is.y,l[5]=mc.y,l[9]=li.y,l[2]=is.z,l[6]=mc.z,l[10]=li.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,h=s[0],p=s[4],m=s[8],d=s[12],x=s[1],v=s[5],_=s[9],E=s[13],R=s[2],N=s[6],y=s[10],S=s[14],I=s[3],B=s[7],D=s[11],U=s[15],C=l[0],P=l[4],b=l[8],O=l[12],W=l[1],q=l[5],Q=l[9],lt=l[13],Y=l[2],j=l[6],F=l[10],H=l[14],ct=l[3],st=l[7],ht=l[11],w=l[15];return c[0]=h*C+p*W+m*Y+d*ct,c[4]=h*P+p*q+m*j+d*st,c[8]=h*b+p*Q+m*F+d*ht,c[12]=h*O+p*lt+m*H+d*w,c[1]=x*C+v*W+_*Y+E*ct,c[5]=x*P+v*q+_*j+E*st,c[9]=x*b+v*Q+_*F+E*ht,c[13]=x*O+v*lt+_*H+E*w,c[2]=R*C+N*W+y*Y+S*ct,c[6]=R*P+N*q+y*j+S*st,c[10]=R*b+N*Q+y*F+S*ht,c[14]=R*O+N*lt+y*H+S*w,c[3]=I*C+B*W+D*Y+U*ct,c[7]=I*P+B*q+D*j+U*st,c[11]=I*b+B*Q+D*F+U*ht,c[15]=I*O+B*lt+D*H+U*w,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[4],l=t[8],c=t[12],h=t[1],p=t[5],m=t[9],d=t[13],x=t[2],v=t[6],_=t[10],E=t[14],R=t[3],N=t[7],y=t[11],S=t[15],I=m*E-d*_,B=p*E-d*v,D=p*_-m*v,U=h*E-d*x,C=h*_-m*x,P=h*v-p*x;return i*(N*I-y*B+S*D)-s*(R*I-y*U+S*C)+l*(R*B-N*U+S*P)-c*(R*D-N*C+y*P)}determinantAffine(){const t=this.elements,i=t[0],s=t[4],l=t[8],c=t[1],h=t[5],p=t[9],m=t[2],d=t[6],x=t[10];return i*(h*x-p*d)-s*(c*x-p*m)+l*(c*d-h*m)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=s),this}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],p=t[5],m=t[6],d=t[7],x=t[8],v=t[9],_=t[10],E=t[11],R=t[12],N=t[13],y=t[14],S=t[15],I=i*p-s*h,B=i*m-l*h,D=i*d-c*h,U=s*m-l*p,C=s*d-c*p,P=l*d-c*m,b=x*N-v*R,O=x*y-_*R,W=x*S-E*R,q=v*y-_*N,Q=v*S-E*N,lt=_*S-E*y,Y=I*lt-B*Q+D*q+U*W-C*O+P*b;if(Y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const j=1/Y;return t[0]=(p*lt-m*Q+d*q)*j,t[1]=(l*Q-s*lt-c*q)*j,t[2]=(N*P-y*C+S*U)*j,t[3]=(_*C-v*P-E*U)*j,t[4]=(m*W-h*lt-d*O)*j,t[5]=(i*lt-l*W+c*O)*j,t[6]=(y*D-R*P-S*B)*j,t[7]=(x*P-_*D+E*B)*j,t[8]=(h*Q-p*W+d*b)*j,t[9]=(s*W-i*Q-c*b)*j,t[10]=(R*C-N*D+S*I)*j,t[11]=(v*D-x*C-E*I)*j,t[12]=(p*O-h*q-m*b)*j,t[13]=(i*q-s*O+l*b)*j,t[14]=(N*B-R*U-y*I)*j,t[15]=(x*U-v*B+_*I)*j,this}scale(t){const i=this.elements,s=t.x,l=t.y,c=t.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(t,i,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,h=t.x,p=t.y,m=t.z,d=c*h,x=c*p;return this.set(d*h+s,d*p-l*m,d*m+l*p,0,d*p+l*m,x*p+s,x*m-l*h,0,d*m-l*p,x*m+l*h,c*m*m+s,0,0,0,0,1),this}makeScale(t,i,s){return this.set(t,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,i,s,l,c,h){return this.set(1,s,c,0,t,1,h,0,i,l,1,0,0,0,0,1),this}compose(t,i,s){const l=this.elements,c=i._x,h=i._y,p=i._z,m=i._w,d=c+c,x=h+h,v=p+p,_=c*d,E=c*x,R=c*v,N=h*x,y=h*v,S=p*v,I=m*d,B=m*x,D=m*v,U=s.x,C=s.y,P=s.z;return l[0]=(1-(N+S))*U,l[1]=(E+D)*U,l[2]=(R-B)*U,l[3]=0,l[4]=(E-D)*C,l[5]=(1-(_+S))*C,l[6]=(y+I)*C,l[7]=0,l[8]=(R+B)*P,l[9]=(y-I)*P,l[10]=(1-(_+N))*P,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,s){const l=this.elements;t.x=l[12],t.y=l[13],t.z=l[14];const c=this.determinantAffine();if(c===0)return s.set(1,1,1),i.identity(),this;let h=Sr.set(l[0],l[1],l[2]).length();const p=Sr.set(l[4],l[5],l[6]).length(),m=Sr.set(l[8],l[9],l[10]).length();c<0&&(h=-h),Ui.copy(this);const d=1/h,x=1/p,v=1/m;return Ui.elements[0]*=d,Ui.elements[1]*=d,Ui.elements[2]*=d,Ui.elements[4]*=x,Ui.elements[5]*=x,Ui.elements[6]*=x,Ui.elements[8]*=v,Ui.elements[9]*=v,Ui.elements[10]*=v,i.setFromRotationMatrix(Ui),s.x=h,s.y=p,s.z=m,this}makePerspective(t,i,s,l,c,h,p=Zi,m=!1){const d=this.elements,x=2*c/(i-t),v=2*c/(s-l),_=(i+t)/(i-t),E=(s+l)/(s-l);let R,N;if(m)R=c/(h-c),N=h*c/(h-c);else if(p===Zi)R=-(h+c)/(h-c),N=-2*h*c/(h-c);else if(p===Zc)R=-h/(h-c),N=-h*c/(h-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+p);return d[0]=x,d[4]=0,d[8]=_,d[12]=0,d[1]=0,d[5]=v,d[9]=E,d[13]=0,d[2]=0,d[6]=0,d[10]=R,d[14]=N,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(t,i,s,l,c,h,p=Zi,m=!1){const d=this.elements,x=2/(i-t),v=2/(s-l),_=-(i+t)/(i-t),E=-(s+l)/(s-l);let R,N;if(m)R=1/(h-c),N=h/(h-c);else if(p===Zi)R=-2/(h-c),N=-(h+c)/(h-c);else if(p===Zc)R=-1/(h-c),N=-c/(h-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+p);return d[0]=x,d[4]=0,d[8]=0,d[12]=_,d[1]=0,d[5]=v,d[9]=0,d[13]=E,d[2]=0,d[6]=0,d[10]=R,d[14]=N,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<16;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t[i+9]=s[9],t[i+10]=s[10],t[i+11]=s[11],t[i+12]=s[12],t[i+13]=s[13],t[i+14]=s[14],t[i+15]=s[15],t}}const Sr=new et,Ui=new cn,jM=new et(0,0,0),$M=new et(1,1,1),is=new et,mc=new et,li=new et,j0=new cn,$0=new ls;class Hs{constructor(t=0,i=0,s=0,l=Hs.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,s,l=this._order){return this._x=t,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,s=!0){const l=t.elements,c=l[0],h=l[4],p=l[8],m=l[1],d=l[5],x=l[9],v=l[2],_=l[6],E=l[10];switch(i){case"XYZ":this._y=Math.asin(ge(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-x,E),this._z=Math.atan2(-h,c)):(this._x=Math.atan2(_,d),this._z=0);break;case"YXZ":this._x=Math.asin(-ge(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(p,E),this._z=Math.atan2(m,d)):(this._y=Math.atan2(-v,c),this._z=0);break;case"ZXY":this._x=Math.asin(ge(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(-v,E),this._z=Math.atan2(-h,d)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-ge(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(_,E),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-h,d));break;case"YZX":this._z=Math.asin(ge(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-x,d),this._y=Math.atan2(-v,c)):(this._x=0,this._y=Math.atan2(p,E));break;case"XZY":this._z=Math.asin(-ge(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(_,d),this._y=Math.atan2(p,c)):(this._x=Math.atan2(-x,E),this._y=0);break;default:ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,s){return j0.makeRotationFromQuaternion(t),this.setFromRotationMatrix(j0,i,s)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return $0.setFromEuler(this),this.setFromQuaternion($0,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Hs.DEFAULT_ORDER="XYZ";class rv{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ty=0;const t_=new et,Mr=new ls,va=new cn,gc=new et,zo=new et,ey=new et,ny=new ls,e_=new et(1,0,0),n_=new et(0,1,0),i_=new et(0,0,1),a_={type:"added"},iy={type:"removed"},yr={type:"childadded",child:null},Sh={type:"childremoved",child:null};class ui extends cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ty++}),this.uuid=Vr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ui.DEFAULT_UP.clone();const t=new et,i=new Hs,s=new ls,l=new et(1,1,1);function c(){s.setFromEuler(i,!1)}function h(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new cn},normalMatrix:{value:new re}}),this.matrix=new cn,this.matrixWorld=new cn,this.matrixAutoUpdate=ui.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ui.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return Mr.setFromAxisAngle(t,i),this.quaternion.multiply(Mr),this}rotateOnWorldAxis(t,i){return Mr.setFromAxisAngle(t,i),this.quaternion.premultiply(Mr),this}rotateX(t){return this.rotateOnAxis(e_,t)}rotateY(t){return this.rotateOnAxis(n_,t)}rotateZ(t){return this.rotateOnAxis(i_,t)}translateOnAxis(t,i){return t_.copy(t).applyQuaternion(this.quaternion),this.position.add(t_.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(e_,t)}translateY(t){return this.translateOnAxis(n_,t)}translateZ(t){return this.translateOnAxis(i_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(va.copy(this.matrixWorld).invert())}lookAt(t,i,s){t.isVector3?gc.copy(t):gc.set(t,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),zo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?va.lookAt(zo,gc,this.up):va.lookAt(gc,zo,this.up),this.quaternion.setFromRotationMatrix(va),l&&(va.extractRotation(l.matrixWorld),Mr.setFromRotationMatrix(va),this.quaternion.premultiply(Mr.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(Ce("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(a_),yr.child=t,this.dispatchEvent(yr),yr.child=null):Ce("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(iy),Sh.child=t,this.dispatchEvent(Sh),Sh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),va.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),va.multiply(t.parent.matrixWorld)),t.applyMatrix4(va),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(a_),yr.child=t,this.dispatchEvent(yr),yr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const h=this.children[s].getObjectByProperty(t,i);if(h!==void 0)return h}}getObjectsByProperty(t,i,s=[]){this[t]===i&&s.push(this);const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].getObjectsByProperty(t,i,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zo,t,ey),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zo,ny,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const i=t.x,s=t.y,l=t.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*s-c[8]*l,c[13]+=s-c[1]*i-c[5]*s-c[9]*l,c[14]+=l-c[2]*i-c[6]*s-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(t)}updateWorldMatrix(t,i,s=!1){const l=this.parent;if(t===!0&&l!==null&&l.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||s)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,s=!0),i===!0){const c=this.children;for(let h=0,p=c.length;h<p;h++)c[h].updateWorldMatrix(!1,!0,s)}}toJSON(t){const i=t===void 0||typeof t=="string",s={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,l.name=this.name,l.castShadow=this.castShadow,l.receiveShadow=this.receiveShadow,l.visible=this.visible,l.frustumCulled=this.frustumCulled,l.renderOrder=this.renderOrder,l.static=this.static,l.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(p=>({...p,boundingBox:p.boundingBox?p.boundingBox.toJSON():void 0,boundingSphere:p.boundingSphere?p.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(p=>({...p})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(t),l.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(p,m){return p[m.uuid]===void 0&&(p[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const p=this.geometry.parameters;if(p!==void 0&&p.shapes!==void 0){const m=p.shapes;if(Array.isArray(m))for(let d=0,x=m.length;d<x;d++){const v=m[d];c(t.shapes,v)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const p=[];for(let m=0,d=this.material.length;m<d;m++)p.push(c(t.materials,this.material[m]));l.material=p}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let p=0;p<this.children.length;p++)l.children.push(this.children[p].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let p=0;p<this.animations.length;p++){const m=this.animations[p];l.animations.push(c(t.animations,m))}}if(i){const p=h(t.geometries),m=h(t.materials),d=h(t.textures),x=h(t.images),v=h(t.shapes),_=h(t.skeletons),E=h(t.animations),R=h(t.nodes);p.length>0&&(s.geometries=p),m.length>0&&(s.materials=m),d.length>0&&(s.textures=d),x.length>0&&(s.images=x),v.length>0&&(s.shapes=v),_.length>0&&(s.skeletons=_),E.length>0&&(s.animations=E),R.length>0&&(s.nodes=R)}return s.object=l,s;function h(p){const m=[];for(const d in p){const x=p[d];delete x.metadata,m.push(x)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}ui.DEFAULT_UP=new et(0,1,0);ui.DEFAULT_MATRIX_AUTO_UPDATE=!0;ui.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class _c extends ui{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ay={type:"move"};class Mh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _c,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _c,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new et,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new et),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _c,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new et,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new et,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const s of t.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,s){let l=null,c=null,h=null;const p=this._targetRay,m=this._grip,d=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(d&&t.hand){h=!0;for(const N of t.hand.values()){const y=i.getJointPose(N,s),S=this._getHandJoint(d,N);y!==null&&(S.matrix.fromArray(y.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=y.radius),S.visible=y!==null}const x=d.joints["index-finger-tip"],v=d.joints["thumb-tip"],_=x.position.distanceTo(v.position),E=.02,R=.005;d.inputState.pinching&&_>E+R?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&_<=E-R&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=i.getPose(t.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:t,target:this})));p!==null&&(l=i.getPose(t.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(p.matrix.fromArray(l.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,l.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(l.linearVelocity)):p.hasLinearVelocity=!1,l.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(l.angularVelocity)):p.hasAngularVelocity=!1,this.dispatchEvent(ay)))}return p!==null&&(p.visible=l!==null),m!==null&&(m.visible=c!==null),d!==null&&(d.visible=h!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const s=new _c;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[i.jointName]=s,t.add(s)}return t.joints[i.jointName]}}const ov={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},as={h:0,s:0,l:0},vc={h:0,s:0,l:0};function yh(r,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(t-r)*6*i:i<1/2?t:i<2/3?r+(t-r)*6*(2/3-i):r}class Oe{constructor(t,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,s)}set(t,i,s){if(i===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=yi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ee.colorSpaceToWorking(this,i),this}setRGB(t,i,s,l=Ee.workingColorSpace){return this.r=t,this.g=i,this.b=s,Ee.colorSpaceToWorking(this,l),this}setHSL(t,i,s,l=Ee.workingColorSpace){if(t=Wd(t,1),i=ge(i,0,1),s=ge(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,h=2*s-c;this.r=yh(h,c,t+1/3),this.g=yh(h,c,t),this.b=yh(h,c,t-1/3)}return Ee.colorSpaceToWorking(this,l),this}setStyle(t,i=yi){function s(c){c!==void 0&&parseFloat(c)<1&&ne("Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const h=l[1],p=l[2];switch(h){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:ne("Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],h=c.length;if(h===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(c,16),i);ne("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=yi){const s=ov[t.toLowerCase()];return s!==void 0?this.setHex(s,i):ne("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ra(t.r),this.g=Ra(t.g),this.b=Ra(t.b),this}copyLinearToSRGB(t){return this.r=Br(t.r),this.g=Br(t.g),this.b=Br(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=yi){return Ee.workingToColorSpace(Pn.copy(this),t),Math.round(ge(Pn.r*255,0,255))*65536+Math.round(ge(Pn.g*255,0,255))*256+Math.round(ge(Pn.b*255,0,255))}getHexString(t=yi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=Ee.workingColorSpace){Ee.workingToColorSpace(Pn.copy(this),i);const s=Pn.r,l=Pn.g,c=Pn.b,h=Math.max(s,l,c),p=Math.min(s,l,c);let m,d;const x=(p+h)/2;if(p===h)m=0,d=0;else{const v=h-p;switch(d=x<=.5?v/(h+p):v/(2-h-p),h){case s:m=(l-c)/v+(l<c?6:0);break;case l:m=(c-s)/v+2;break;case c:m=(s-l)/v+4;break}m/=6}return t.h=m,t.s=d,t.l=x,t}getRGB(t,i=Ee.workingColorSpace){return Ee.workingToColorSpace(Pn.copy(this),i),t.r=Pn.r,t.g=Pn.g,t.b=Pn.b,t}getStyle(t=yi){Ee.workingToColorSpace(Pn.copy(this),t);const i=Pn.r,s=Pn.g,l=Pn.b;return t!==yi?`color(${t} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,i,s){return this.getHSL(as),this.setHSL(as.h+t,as.s+i,as.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,s){return this.r=t.r+(i.r-t.r)*s,this.g=t.g+(i.g-t.g)*s,this.b=t.b+(i.b-t.b)*s,this}lerpHSL(t,i){this.getHSL(as),t.getHSL(vc);const s=Ko(as.h,vc.h,i),l=Ko(as.s,vc.s,i),c=Ko(as.l,vc.l,i);return this.setHSL(s,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,s=this.g,l=this.b,c=t.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pn=new Oe;Oe.NAMES=ov;class sy extends ui{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hs,this.environmentIntensity=1,this.environmentRotation=new Hs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),i.object.backgroundBlurriness=this.backgroundBlurriness,i.object.backgroundIntensity=this.backgroundIntensity,i.object.backgroundRotation=this.backgroundRotation.toArray(),i.object.environmentIntensity=this.environmentIntensity,i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Ni=new et,xa=new et,Eh=new et,Sa=new et,Er=new et,br=new et,s_=new et,bh=new et,Th=new et,Ah=new et,Rh=new rn,Ch=new rn,wh=new rn;class Oi{constructor(t=new et,i=new et,s=new et){this.a=t,this.b=i,this.c=s}static getNormal(t,i,s,l){l.subVectors(s,i),Ni.subVectors(t,i),l.cross(Ni);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,i,s,l,c){Ni.subVectors(l,i),xa.subVectors(s,i),Eh.subVectors(t,i);const h=Ni.dot(Ni),p=Ni.dot(xa),m=Ni.dot(Eh),d=xa.dot(xa),x=xa.dot(Eh),v=h*d-p*p;if(v===0)return c.set(0,0,0),null;const _=1/v,E=(d*m-p*x)*_,R=(h*x-p*m)*_;return c.set(1-E-R,R,E)}static containsPoint(t,i,s,l){return this.getBarycoord(t,i,s,l,Sa)===null?!1:Sa.x>=0&&Sa.y>=0&&Sa.x+Sa.y<=1}static getInterpolation(t,i,s,l,c,h,p,m){return this.getBarycoord(t,i,s,l,Sa)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,Sa.x),m.addScaledVector(h,Sa.y),m.addScaledVector(p,Sa.z),m)}static getInterpolatedAttribute(t,i,s,l,c,h){return Rh.setScalar(0),Ch.setScalar(0),wh.setScalar(0),Rh.fromBufferAttribute(t,i),Ch.fromBufferAttribute(t,s),wh.fromBufferAttribute(t,l),h.setScalar(0),h.addScaledVector(Rh,c.x),h.addScaledVector(Ch,c.y),h.addScaledVector(wh,c.z),h}static isFrontFacing(t,i,s,l){return Ni.subVectors(s,i),xa.subVectors(t,i),Ni.cross(xa).dot(l)<0}set(t,i,s){return this.a.copy(t),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(t,i,s,l){return this.a.copy(t[i]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,s,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ni.subVectors(this.c,this.b),xa.subVectors(this.a,this.b),Ni.cross(xa).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Oi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Oi.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,s,l,c){return Oi.getInterpolation(t,this.a,this.b,this.c,i,s,l,c)}containsPoint(t){return Oi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Oi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const s=this.a,l=this.b,c=this.c;let h,p;Er.subVectors(l,s),br.subVectors(c,s),bh.subVectors(t,s);const m=Er.dot(bh),d=br.dot(bh);if(m<=0&&d<=0)return i.copy(s);Th.subVectors(t,l);const x=Er.dot(Th),v=br.dot(Th);if(x>=0&&v<=x)return i.copy(l);const _=m*v-x*d;if(_<=0&&m>=0&&x<=0)return h=m/(m-x),i.copy(s).addScaledVector(Er,h);Ah.subVectors(t,c);const E=Er.dot(Ah),R=br.dot(Ah);if(R>=0&&E<=R)return i.copy(c);const N=E*d-m*R;if(N<=0&&d>=0&&R<=0)return p=d/(d-R),i.copy(s).addScaledVector(br,p);const y=x*R-E*v;if(y<=0&&v-x>=0&&E-R>=0)return s_.subVectors(c,l),p=(v-x)/(v-x+(E-R)),i.copy(l).addScaledVector(s_,p);const S=1/(y+N+_);return h=N*S,p=_*S,i.copy(s).addScaledVector(Er,h).addScaledVector(br,p)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class el{constructor(t=new et(1/0,1/0,1/0),i=new et(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i+=3)this.expandByPoint(Li.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,s=t.count;i<s;i++)this.expandByPoint(Li.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const s=Li.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let h=0,p=c.count;h<p;h++)t.isMesh===!0?t.getVertexPosition(h,Li):Li.fromBufferAttribute(c,h),Li.applyMatrix4(t.matrixWorld),this.expandByPoint(Li);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),xc.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),xc.copy(s.boundingBox)),xc.applyMatrix4(t.matrixWorld),this.union(xc)}const l=t.children;for(let c=0,h=l.length;c<h;c++)this.expandByObject(l[c],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Li),Li.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,s;return t.normal.x>0?(i=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),i<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Bo),Sc.subVectors(this.max,Bo),Tr.subVectors(t.a,Bo),Ar.subVectors(t.b,Bo),Rr.subVectors(t.c,Bo),ss.subVectors(Ar,Tr),rs.subVectors(Rr,Ar),ws.subVectors(Tr,Rr);let i=[0,-ss.z,ss.y,0,-rs.z,rs.y,0,-ws.z,ws.y,ss.z,0,-ss.x,rs.z,0,-rs.x,ws.z,0,-ws.x,-ss.y,ss.x,0,-rs.y,rs.x,0,-ws.y,ws.x,0];return!Dh(i,Tr,Ar,Rr,Sc)||(i=[1,0,0,0,1,0,0,0,1],!Dh(i,Tr,Ar,Rr,Sc))?!1:(Mc.crossVectors(ss,rs),i=[Mc.x,Mc.y,Mc.z],Dh(i,Tr,Ar,Rr,Sc))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Li).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Li).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ma[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ma[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ma[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ma[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ma[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ma[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ma[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ma[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ma),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ma=[new et,new et,new et,new et,new et,new et,new et,new et],Li=new et,xc=new el,Tr=new et,Ar=new et,Rr=new et,ss=new et,rs=new et,ws=new et,Bo=new et,Sc=new et,Mc=new et,Ds=new et;function Dh(r,t,i,s,l){for(let c=0,h=r.length-3;c<=h;c+=3){Ds.fromArray(r,c);const p=l.x*Math.abs(Ds.x)+l.y*Math.abs(Ds.y)+l.z*Math.abs(Ds.z),m=t.dot(Ds),d=i.dot(Ds),x=s.dot(Ds);if(Math.max(-Math.max(m,d,x),Math.min(m,d,x))>p)return!1}return!0}const _n=new et,yc=new ie;let ry=0;class Qi extends cs{constructor(t,i,s=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ry++}),this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=s,this.usage=TM,this.updateRanges=[],this.gpuType=Yi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,s){t*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=i.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)yc.fromBufferAttribute(this,i),yc.applyMatrix3(t),this.setXY(i,yc.x,yc.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)_n.fromBufferAttribute(this,i),_n.applyMatrix3(t),this.setXYZ(i,_n.x,_n.y,_n.z);return this}applyMatrix4(t){for(let i=0,s=this.count;i<s;i++)_n.fromBufferAttribute(this,i),_n.applyMatrix4(t),this.setXYZ(i,_n.x,_n.y,_n.z);return this}applyNormalMatrix(t){for(let i=0,s=this.count;i<s;i++)_n.fromBufferAttribute(this,i),_n.applyNormalMatrix(t),this.setXYZ(i,_n.x,_n.y,_n.z);return this}transformDirection(t){for(let i=0,s=this.count;i<s;i++)_n.fromBufferAttribute(this,i),_n.transformDirection(t),this.setXYZ(i,_n.x,_n.y,_n.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let s=this.array[t*this.itemSize+i];return this.normalized&&(s=Lr(s,this.array)),s}setComponent(t,i,s){return this.normalized&&(s=Bn(s,this.array)),this.array[t*this.itemSize+i]=s,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=Lr(i,this.array)),i}setX(t,i){return this.normalized&&(i=Bn(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=Lr(i,this.array)),i}setY(t,i){return this.normalized&&(i=Bn(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=Lr(i,this.array)),i}setZ(t,i){return this.normalized&&(i=Bn(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=Lr(i,this.array)),i}setW(t,i){return this.normalized&&(i=Bn(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,s){return t*=this.itemSize,this.normalized&&(i=Bn(i,this.array),s=Bn(s,this.array)),this.array[t+0]=i,this.array[t+1]=s,this}setXYZ(t,i,s,l){return t*=this.itemSize,this.normalized&&(i=Bn(i,this.array),s=Bn(s,this.array),l=Bn(l,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,i,s,l,c){return t*=this.itemSize,this.normalized&&(i=Bn(i,this.array),s=Bn(s,this.array),l=Bn(l,this.array),c=Bn(c,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class lv extends Qi{constructor(t,i,s){super(new Uint16Array(t),i,s)}}class cv extends Qi{constructor(t,i,s){super(new Uint32Array(t),i,s)}}class Ca extends Qi{constructor(t,i,s){super(new Float32Array(t),i,s)}}const oy=new el,Ho=new et,Uh=new et;class Yd{constructor(t=new et,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const s=this.center;i!==void 0?s.copy(i):oy.setFromPoints(t).getCenter(s);let l=0;for(let c=0,h=t.length;c<h;c++)l=Math.max(l,s.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const s=this.center.distanceToSquared(t);return i.copy(t),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ho.subVectors(t,this.center);const i=Ho.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(Ho,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Uh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ho.copy(t.center).add(Uh)),this.expandByPoint(Ho.copy(t.center).sub(Uh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let ly=0;const Mi=new cn,Nh=new ui,Cr=new et,ci=new el,Go=new el,Tn=new et;class $i extends cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ly++}),this.uuid=Vr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(AM(t)?cv:lv)(t,1):this.index=t,this}setIndirect(t,i=0){return this.indirect=t,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,s=0){this.groups.push({start:t,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new re().getNormalMatrix(t);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Mi.makeRotationFromQuaternion(t),this.applyMatrix4(Mi),this}rotateX(t){return Mi.makeRotationX(t),this.applyMatrix4(Mi),this}rotateY(t){return Mi.makeRotationY(t),this.applyMatrix4(Mi),this}rotateZ(t){return Mi.makeRotationZ(t),this.applyMatrix4(Mi),this}translate(t,i,s){return Mi.makeTranslation(t,i,s),this.applyMatrix4(Mi),this}scale(t,i,s){return Mi.makeScale(t,i,s),this.applyMatrix4(Mi),this}lookAt(t){return Nh.lookAt(t),Nh.updateMatrix(),this.applyMatrix4(Nh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Cr).negate(),this.translate(Cr.x,Cr.y,Cr.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=t.length;l<c;l++){const h=t[l];s.push(h.x,h.y,h.z||0)}this.setAttribute("position",new Ca(s,3))}else{const s=Math.min(t.length,i.count);for(let l=0;l<s;l++){const c=t[l];i.setXYZ(l,c.x,c.y,c.z||0)}t.length>i.count&&ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new el);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ce("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new et(-1/0,-1/0,-1/0),new et(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];ci.setFromBufferAttribute(c),this.morphTargetsRelative?(Tn.addVectors(this.boundingBox.min,ci.min),this.boundingBox.expandByPoint(Tn),Tn.addVectors(this.boundingBox.max,ci.max),this.boundingBox.expandByPoint(Tn)):(this.boundingBox.expandByPoint(ci.min),this.boundingBox.expandByPoint(ci.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ce('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yd);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ce("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new et,1/0);return}if(t){const s=this.boundingSphere.center;if(ci.setFromBufferAttribute(t),i)for(let c=0,h=i.length;c<h;c++){const p=i[c];Go.setFromBufferAttribute(p),this.morphTargetsRelative?(Tn.addVectors(ci.min,Go.min),ci.expandByPoint(Tn),Tn.addVectors(ci.max,Go.max),ci.expandByPoint(Tn)):(ci.expandByPoint(Go.min),ci.expandByPoint(Go.max))}ci.getCenter(s);let l=0;for(let c=0,h=t.count;c<h;c++)Tn.fromBufferAttribute(t,c),l=Math.max(l,s.distanceToSquared(Tn));if(i)for(let c=0,h=i.length;c<h;c++){const p=i[c],m=this.morphTargetsRelative;for(let d=0,x=p.count;d<x;d++)Tn.fromBufferAttribute(p,d),m&&(Cr.fromBufferAttribute(t,d),Tn.add(Cr)),l=Math.max(l,s.distanceToSquared(Tn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&Ce('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){Ce("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;let h=this.getAttribute("tangent");(h===void 0||h.count!==s.count)&&(h=new Qi(new Float32Array(4*s.count),4),this.setAttribute("tangent",h));const p=[],m=[];for(let b=0;b<s.count;b++)p[b]=new et,m[b]=new et;const d=new et,x=new et,v=new et,_=new ie,E=new ie,R=new ie,N=new et,y=new et;function S(b,O,W){d.fromBufferAttribute(s,b),x.fromBufferAttribute(s,O),v.fromBufferAttribute(s,W),_.fromBufferAttribute(c,b),E.fromBufferAttribute(c,O),R.fromBufferAttribute(c,W),x.sub(d),v.sub(d),E.sub(_),R.sub(_);const q=1/(E.x*R.y-R.x*E.y);isFinite(q)&&(N.copy(x).multiplyScalar(R.y).addScaledVector(v,-E.y).multiplyScalar(q),y.copy(v).multiplyScalar(E.x).addScaledVector(x,-R.x).multiplyScalar(q),p[b].add(N),p[O].add(N),p[W].add(N),m[b].add(y),m[O].add(y),m[W].add(y))}let I=this.groups;I.length===0&&(I=[{start:0,count:t.count}]);for(let b=0,O=I.length;b<O;++b){const W=I[b],q=W.start,Q=W.count;for(let lt=q,Y=q+Q;lt<Y;lt+=3)S(t.getX(lt+0),t.getX(lt+1),t.getX(lt+2))}const B=new et,D=new et,U=new et,C=new et;function P(b){U.fromBufferAttribute(l,b),C.copy(U);const O=p[b];B.copy(O),B.sub(U.multiplyScalar(U.dot(O))).normalize(),D.crossVectors(C,O);const q=D.dot(m[b])<0?-1:1;h.setXYZW(b,B.x,B.y,B.z,q)}for(let b=0,O=I.length;b<O;++b){const W=I[b],q=W.start,Q=W.count;for(let lt=q,Y=q+Q;lt<Y;lt+=3)P(t.getX(lt+0)),P(t.getX(lt+1)),P(t.getX(lt+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0||s.count!==i.count)s=new Qi(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let _=0,E=s.count;_<E;_++)s.setXYZ(_,0,0,0);const l=new et,c=new et,h=new et,p=new et,m=new et,d=new et,x=new et,v=new et;if(t)for(let _=0,E=t.count;_<E;_+=3){const R=t.getX(_+0),N=t.getX(_+1),y=t.getX(_+2);l.fromBufferAttribute(i,R),c.fromBufferAttribute(i,N),h.fromBufferAttribute(i,y),x.subVectors(h,c),v.subVectors(l,c),x.cross(v),p.fromBufferAttribute(s,R),m.fromBufferAttribute(s,N),d.fromBufferAttribute(s,y),p.add(x),m.add(x),d.add(x),s.setXYZ(R,p.x,p.y,p.z),s.setXYZ(N,m.x,m.y,m.z),s.setXYZ(y,d.x,d.y,d.z)}else for(let _=0,E=i.count;_<E;_+=3)l.fromBufferAttribute(i,_+0),c.fromBufferAttribute(i,_+1),h.fromBufferAttribute(i,_+2),x.subVectors(h,c),v.subVectors(l,c),x.cross(v),s.setXYZ(_+0,x.x,x.y,x.z),s.setXYZ(_+1,x.x,x.y,x.z),s.setXYZ(_+2,x.x,x.y,x.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,s=t.count;i<s;i++)Tn.fromBufferAttribute(t,i),Tn.normalize(),t.setXYZ(i,Tn.x,Tn.y,Tn.z)}toNonIndexed(){function t(p,m){const d=p.array,x=p.itemSize,v=p.normalized,_=new d.constructor(m.length*x);let E=0,R=0;for(let N=0,y=m.length;N<y;N++){p.isInterleavedBufferAttribute?E=m[N]*p.data.stride+p.offset:E=m[N]*x;for(let S=0;S<x;S++)_[R++]=d[E++]}return new Qi(_,x,v)}if(this.index===null)return ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new $i,s=this.index.array,l=this.attributes;for(const p in l){const m=l[p],d=t(m,s);i.setAttribute(p,d)}const c=this.morphAttributes;for(const p in c){const m=[],d=c[p];for(let x=0,v=d.length;x<v;x++){const _=d[x],E=t(_,s);m.push(E)}i.morphAttributes[p]=m}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let p=0,m=h.length;p<m;p++){const d=h[p];i.addGroup(d.start,d.count,d.materialIndex)}return i}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const d in m)m[d]!==void 0&&(t[d]=m[d]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const d=s[m];t.data.attributes[m]=d.toJSON(t.data)}const l={};let c=!1;for(const m in this.morphAttributes){const d=this.morphAttributes[m],x=[];for(let v=0,_=d.length;v<_;v++){const E=d[v];x.push(E.toJSON(t.data))}x.length>0&&(l[m]=x,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(t.data.groups=JSON.parse(JSON.stringify(h)));const p=this.boundingSphere;return p!==null&&(t.data.boundingSphere=p.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone());const l=t.attributes;for(const d in l){const x=l[d];this.setAttribute(d,x.clone(i))}const c=t.morphAttributes;for(const d in c){const x=[],v=c[d];for(let _=0,E=v.length;_<E;_++)x.push(v[_].clone(i));this.morphAttributes[d]=x}this.morphTargetsRelative=t.morphTargetsRelative;const h=t.groups;for(let d=0,x=h.length;d<x;d++){const v=h[d];this.addGroup(v.start,v.count,v.materialIndex)}const p=t.boundingBox;p!==null&&(this.boundingBox=p.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Lh=new et,cy=new et,uy=new re;class Ea{constructor(t=new et(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,s,l){return this.normal.set(t,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,s){const l=Lh.subVectors(s,i).cross(cy.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i,s=!0){const l=t.delta(Lh),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const h=-(t.start.dot(this.normal)+this.constant)/c;return s===!0&&(h<0||h>1)?null:i.copy(t.start).addScaledVector(l,h)}intersectsLine(t){const i=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return i<0&&s>0||s<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const s=i||uy.getNormalMatrix(t),l=this.coplanarPoint(Lh).applyMatrix4(t),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let fy=0;class Jc extends cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fy++}),this.uuid=Vr(),this.name="",this.type="Material",this.blending=Yo,this.side=Fs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=H_,this.blendDst=G_,this.blendEquation=Nr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=Qo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vM,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mh,this.stencilZFail=mh,this.stencilZPass=mh,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const s=t[i];if(s===void 0){ne(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ne(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector2&&s&&s.isVector2||l&&l.isEuler&&s&&s.isEuler||l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,s.blending=this.blending,s.side=this.side,s.shadowSide=this.shadowSide,s.vertexColors=this.vertexColors,s.opacity=this.opacity,s.transparent=this.transparent,s.blendSrc=this.blendSrc,s.blendDst=this.blendDst,s.blendEquation=this.blendEquation,s.blendSrcAlpha=this.blendSrcAlpha,s.blendDstAlpha=this.blendDstAlpha,s.blendEquationAlpha=this.blendEquationAlpha,s.blendColor=this.blendColor.getHex(),s.blendAlpha=this.blendAlpha,s.depthFunc=this.depthFunc,s.depthTest=this.depthTest,s.depthWrite=this.depthWrite,s.colorWrite=this.colorWrite,s.clipIntersection=this.clipIntersection,s.clipShadows=this.clipShadows,s.stencilWriteMask=this.stencilWriteMask,s.stencilFunc=this.stencilFunc,s.stencilRef=this.stencilRef,s.stencilFuncMask=this.stencilFuncMask,s.stencilFail=this.stencilFail,s.stencilZFail=this.stencilZFail,s.stencilZPass=this.stencilZPass,s.stencilWrite=this.stencilWrite,s.polygonOffset=this.polygonOffset,s.polygonOffsetFactor=this.polygonOffsetFactor,s.polygonOffsetUnits=this.polygonOffsetUnits,s.dithering=this.dithering,s.alphaTest=this.alphaTest,s.alphaHash=this.alphaHash,s.alphaToCoverage=this.alphaToCoverage,s.premultipliedAlpha=this.premultipliedAlpha,s.forceSinglePass=this.forceSinglePass,s.allowOverride=this.allowOverride,s.visible=this.visible,s.toneMapped=this.toneMapped,s.name=this.name,this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(s.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(s.clippingPlanes=this.clippingPlanes.map(c=>c.toJSON())),this.rotation!==void 0&&(s.rotation=this.rotation),this.depthPacking!==void 0&&(s.depthPacking=this.depthPacking),this.linewidth!==void 0&&(s.linewidth=this.linewidth),this.linecap!==void 0&&(s.linecap=this.linecap),this.linejoin!==void 0&&(s.linejoin=this.linejoin),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.wireframe!==void 0&&(s.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(s.flatShading=this.flatShading),this.fog!==void 0&&(s.fog=this.fog),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const h=[];for(const p in c){const m=c[p];delete m.metadata,h.push(m)}return h}if(i){const c=l(t.textures),h=l(t.images);c.length>0&&(s.textures=c),h.length>0&&(s.images=h)}return s}fromJSON(t,i){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Oe().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(s=>new Ea().fromJSON(s))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=i[t.map]||null),t.matcap!==void 0&&(this.matcap=i[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=i[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=i[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=i[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let s=t.normalScale;Array.isArray(s)===!1&&(s=[s,s]),this.normalScale=new ie().fromArray(s)}return t.displacementMap!==void 0&&(this.displacementMap=i[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=i[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=i[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=i[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=i[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=i[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=i[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=i[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=i[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=i[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=i[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ie().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=i[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=i[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=i[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=i[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=i[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const ya=new et,Oh=new et,Ec=new et,bc=new et;class uv{constructor(t=new et,i=new et(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ya)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=ya.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(ya.copy(this.origin).addScaledVector(this.direction,i),ya.distanceToSquared(t))}distanceSqToSegment(t,i,s,l){Oh.copy(t).add(i).multiplyScalar(.5),Ec.copy(i).sub(t).normalize(),bc.copy(this.origin).sub(Oh);const c=t.distanceTo(i)*.5,h=-this.direction.dot(Ec),p=bc.dot(this.direction),m=-bc.dot(Ec),d=bc.lengthSq(),x=Math.abs(1-h*h);let v,_,E,R;if(x>0)if(v=h*m-p,_=h*p-m,R=c*x,v>=0)if(_>=-R)if(_<=R){const N=1/x;v*=N,_*=N,E=v*(v+h*_+2*p)+_*(h*v+_+2*m)+d}else _=c,v=Math.max(0,-(h*_+p)),E=-v*v+_*(_+2*m)+d;else _=-c,v=Math.max(0,-(h*_+p)),E=-v*v+_*(_+2*m)+d;else _<=-R?(v=Math.max(0,-(-h*c+p)),_=v>0?-c:Math.min(Math.max(-c,-m),c),E=-v*v+_*(_+2*m)+d):_<=R?(v=0,_=Math.min(Math.max(-c,-m),c),E=_*(_+2*m)+d):(v=Math.max(0,-(h*c+p)),_=v>0?c:Math.min(Math.max(-c,-m),c),E=-v*v+_*(_+2*m)+d);else _=h>0?-c:c,v=Math.max(0,-(h*_+p)),E=-v*v+_*(_+2*m)+d;return s&&s.copy(this.origin).addScaledVector(this.direction,v),l&&l.copy(Oh).addScaledVector(Ec,_),E}intersectSphere(t,i){if(t.radius<0)return null;ya.subVectors(t.center,this.origin);const s=ya.dot(this.direction),l=ya.dot(ya)-s*s,c=t.radius*t.radius;if(l>c)return null;const h=Math.sqrt(c-l),p=s-h,m=s+h;return m<0?null:p<0?this.at(m,i):this.at(p,i)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/i;return s>=0?s:null}intersectPlane(t,i){const s=this.distanceToPlane(t);return s===null?null:this.at(s,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let s,l,c,h,p,m;const d=1/this.direction.x,x=1/this.direction.y,v=1/this.direction.z,_=this.origin;return d>=0?(s=(t.min.x-_.x)*d,l=(t.max.x-_.x)*d):(s=(t.max.x-_.x)*d,l=(t.min.x-_.x)*d),x>=0?(c=(t.min.y-_.y)*x,h=(t.max.y-_.y)*x):(c=(t.max.y-_.y)*x,h=(t.min.y-_.y)*x),s>h||c>l||((c>s||isNaN(s))&&(s=c),(h<l||isNaN(l))&&(l=h),v>=0?(p=(t.min.z-_.z)*v,m=(t.max.z-_.z)*v):(p=(t.max.z-_.z)*v,m=(t.min.z-_.z)*v),s>m||p>l)||((p>s||s!==s)&&(s=p),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(t){return this.intersectBox(t,ya)!==null}intersectTriangle(t,i,s,l,c){const h=this.origin,p=this.direction,m=p.x,d=p.y,x=p.z,v=t.x-h.x,_=t.y-h.y,E=t.z-h.z,R=i.x-h.x,N=i.y-h.y,y=i.z-h.z,S=s.x-h.x,I=s.y-h.y,B=s.z-h.z,D=Math.abs(m),U=Math.abs(d),C=Math.abs(x);let P,b,O,W,q,Q,lt,Y,j,F,H,ct;if(D>=U&&D>=C?(O=m,Q=v,j=R,ct=S,m>=0?(P=d,b=x,W=_,q=E,lt=N,Y=y,F=I,H=B):(P=x,b=d,W=E,q=_,lt=y,Y=N,F=B,H=I)):U>=C?(O=d,Q=_,j=N,ct=I,d>=0?(P=x,b=m,W=E,q=v,lt=y,Y=R,F=B,H=S):(P=m,b=x,W=v,q=E,lt=R,Y=y,F=S,H=B)):(O=x,Q=E,j=y,ct=B,x>=0?(P=m,b=d,W=v,q=_,lt=R,Y=N,F=S,H=I):(P=d,b=m,W=_,q=v,lt=N,Y=R,F=I,H=S)),O===0)return null;const st=P/O,ht=b/O,w=1/O,J=W-st*Q,gt=q-ht*Q,Et=lt-st*j,Nt=Y-ht*j,Xt=F-st*ct,it=H-ht*ct,_t=Xt*Nt-it*Et,Tt=J*it-gt*Xt,te=Et*gt-Nt*J;if(l){if(_t<0||Tt<0||te<0)return null}else if((_t<0||Tt<0||te<0)&&(_t>0||Tt>0||te>0))return null;const Bt=_t+Tt+te;if(Bt===0)return null;const le=w*(_t*Q+Tt*j+te*ct);return(Bt>0?le<0:le>0)?null:this.at(le/Bt,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class fv extends Jc{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hs,this.combine=V_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const r_=new cn,Us=new uv,Tc=new Yd,o_=new et,Ac=new et,Rc=new et,Cc=new et,Ph=new et,wc=new et,l_=new et,Dc=new et;class ji extends ui{constructor(t=new $i,i=new fv){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}getVertexPosition(t,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,h=s.morphTargetsRelative;i.fromBufferAttribute(l,t);const p=this.morphTargetInfluences;if(c&&p){wc.set(0,0,0);for(let m=0,d=c.length;m<d;m++){const x=p[m],v=c[m];x!==0&&(Ph.fromBufferAttribute(v,t),h?wc.addScaledVector(Ph,x):wc.addScaledVector(Ph.sub(i),x))}i.add(wc)}return i}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Tc.copy(s.boundingSphere),Tc.applyMatrix4(c),Us.copy(t.ray).recast(t.near),!(Tc.containsPoint(Us.origin)===!1&&(Us.intersectSphere(Tc,o_)===null||Us.origin.distanceToSquared(o_)>(t.far-t.near)**2))&&(r_.copy(c).invert(),Us.copy(t.ray).applyMatrix4(r_),!(s.boundingBox!==null&&Us.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,i,Us)))}_computeIntersections(t,i,s){let l;const c=this.geometry,h=this.material,p=c.index,m=c.attributes.position,d=c.attributes.uv,x=c.attributes.uv1,v=c.attributes.normal,_=c.groups,E=c.drawRange;if(p!==null)if(Array.isArray(h))for(let R=0,N=_.length;R<N;R++){const y=_[R],S=h[y.materialIndex],I=Math.max(y.start,E.start),B=Math.min(p.count,Math.min(y.start+y.count,E.start+E.count));for(let D=I,U=B;D<U;D+=3){const C=p.getX(D),P=p.getX(D+1),b=p.getX(D+2);l=Uc(this,S,t,s,d,x,v,C,P,b),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const R=Math.max(0,E.start),N=Math.min(p.count,E.start+E.count);for(let y=R,S=N;y<S;y+=3){const I=p.getX(y),B=p.getX(y+1),D=p.getX(y+2);l=Uc(this,h,t,s,d,x,v,I,B,D),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(h))for(let R=0,N=_.length;R<N;R++){const y=_[R],S=h[y.materialIndex],I=Math.max(y.start,E.start),B=Math.min(m.count,Math.min(y.start+y.count,E.start+E.count));for(let D=I,U=B;D<U;D+=3){const C=D,P=D+1,b=D+2;l=Uc(this,S,t,s,d,x,v,C,P,b),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const R=Math.max(0,E.start),N=Math.min(m.count,E.start+E.count);for(let y=R,S=N;y<S;y+=3){const I=y,B=y+1,D=y+2;l=Uc(this,h,t,s,d,x,v,I,B,D),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}}}function hy(r,t,i,s,l,c,h,p){let m;if(t.side===jn?m=s.intersectTriangle(h,c,l,!0,p):m=s.intersectTriangle(l,c,h,t.side===Fs,p),m===null)return null;Dc.copy(p),Dc.applyMatrix4(r.matrixWorld);const d=i.ray.origin.distanceTo(Dc);return d<i.near||d>i.far?null:{distance:d,point:Dc.clone(),object:r}}function Uc(r,t,i,s,l,c,h,p,m,d){r.getVertexPosition(p,Ac),r.getVertexPosition(m,Rc),r.getVertexPosition(d,Cc);const x=hy(r,t,i,s,Ac,Rc,Cc,l_);if(x){const v=new et;Oi.getBarycoord(l_,Ac,Rc,Cc,v),l&&(x.uv=Oi.getInterpolatedAttribute(l,p,m,d,v,new ie)),c&&(x.uv1=Oi.getInterpolatedAttribute(c,p,m,d,v,new ie)),h&&(x.normal=Oi.getInterpolatedAttribute(h,p,m,d,v,new et),x.normal.dot(s.direction)>0&&x.normal.multiplyScalar(-1));const _={a:p,b:m,c:d,normal:new et,materialIndex:0};Oi.getNormal(Ac,Rc,Cc,_.normal),x.face=_,x.barycoord=v}return x}class dy extends Vn{constructor(t=null,i=1,s=1,l,c,h,p,m,d=Nn,x=Nn,v,_){super(null,h,p,m,d,x,l,c,v,_),this.isDataTexture=!0,this.image={data:t,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ns=new Yd,py=new ie(.5,.5),Nc=new et;class hv{constructor(t=new Ea,i=new Ea,s=new Ea,l=new Ea,c=new Ea,h=new Ea){this.planes=[t,i,s,l,c,h]}set(t,i,s,l,c,h){const p=this.planes;return p[0].copy(t),p[1].copy(i),p[2].copy(s),p[3].copy(l),p[4].copy(c),p[5].copy(h),this}copy(t){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,i=Zi,s=!1){const l=this.planes,c=t.elements,h=c[0],p=c[1],m=c[2],d=c[3],x=c[4],v=c[5],_=c[6],E=c[7],R=c[8],N=c[9],y=c[10],S=c[11],I=c[12],B=c[13],D=c[14],U=c[15];if(l[0].setComponents(d-h,E-x,S-R,U-I).normalize(),l[1].setComponents(d+h,E+x,S+R,U+I).normalize(),l[2].setComponents(d+p,E+v,S+N,U+B).normalize(),l[3].setComponents(d-p,E-v,S-N,U-B).normalize(),s)l[4].setComponents(m,_,y,D).normalize(),l[5].setComponents(d-m,E-_,S-y,U-D).normalize();else if(l[4].setComponents(d-m,E-_,S-y,U-D).normalize(),i===Zi)l[5].setComponents(d+m,E+_,S+y,U+D).normalize();else if(i===Zc)l[5].setComponents(m,_,y,D).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ns.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Ns.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ns)}intersectsSprite(t){Ns.center.set(0,0,0);const i=py.distanceTo(t.center);return Ns.radius=.7071067811865476+i,Ns.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ns)}intersectsSphere(t){const i=this.planes,s=t.center,l=-t.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(Nc.x=l.normal.x>0?t.max.x:t.min.x,Nc.y=l.normal.y>0?t.max.y:t.min.y,Nc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Nc)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class dv extends Vn{constructor(t=[],i=zs,s,l,c,h,p,m,d,x){super(t,i,s,l,c,h,p,m,d,x),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class tl extends Vn{constructor(t,i,s=Ji,l,c,h,p=Nn,m=Nn,d,x=wa,v=1){if(x!==wa&&x!==Ps)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const _={width:t,height:i,depth:v};super(_,l,c,h,p,m,x,s,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new qd(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return i.compareFunction=this.compareFunction,i}}class my extends tl{constructor(t,i=Ji,s=zs,l,c,h=Nn,p=Nn,m,d=wa){const x={width:t,height:t,depth:1},v=[x,x,x,x,x,x];super(t,t,i,s,l,c,h,p,m,d),this.image=v,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class pv extends Vn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class nl extends $i{constructor(t=1,i=1,s=1,l=1,c=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:h};const p=this;l=Math.floor(l),c=Math.floor(c),h=Math.floor(h);const m=[],d=[],x=[],v=[];let _=0,E=0;R("z","y","x",-1,-1,s,i,t,h,c,0),R("z","y","x",1,-1,s,i,-t,h,c,1),R("x","z","y",1,1,t,s,i,l,h,2),R("x","z","y",1,-1,t,s,-i,l,h,3),R("x","y","z",1,-1,t,i,s,l,c,4),R("x","y","z",-1,-1,t,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new Ca(d,3)),this.setAttribute("normal",new Ca(x,3)),this.setAttribute("uv",new Ca(v,2));function R(N,y,S,I,B,D,U,C,P,b,O){const W=D/P,q=U/b,Q=D/2,lt=U/2,Y=C/2,j=P+1,F=b+1;let H=0,ct=0;const st=new et;for(let ht=0;ht<F;ht++){const w=ht*q-lt;for(let J=0;J<j;J++){const gt=J*W-Q;st[N]=gt*I,st[y]=w*B,st[S]=Y,d.push(st.x,st.y,st.z),st[N]=0,st[y]=0,st[S]=C>0?1:-1,x.push(st.x,st.y,st.z),v.push(J/P),v.push(1-ht/b),H+=1}}for(let ht=0;ht<b;ht++)for(let w=0;w<P;w++){const J=_+w+j*ht,gt=_+w+j*(ht+1),Et=_+(w+1)+j*(ht+1),Nt=_+(w+1)+j*ht;m.push(J,gt,Nt),m.push(gt,Et,Nt),ct+=6}p.addGroup(E,ct,O),E+=ct,_+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nl(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class jc extends $i{constructor(t=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:s,heightSegments:l};const c=t/2,h=i/2,p=Math.floor(s),m=Math.floor(l),d=p+1,x=m+1,v=t/p,_=i/m,E=[],R=[],N=[],y=[];for(let S=0;S<x;S++){const I=S*_-h;for(let B=0;B<d;B++){const D=B*v-c;R.push(D,-I,0),N.push(0,0,1),y.push(B/p),y.push(1-S/m)}}for(let S=0;S<m;S++)for(let I=0;I<p;I++){const B=I+d*S,D=I+d*(S+1),U=I+1+d*(S+1),C=I+1+d*S;E.push(B,D,C),E.push(D,U,C)}this.setIndex(E),this.setAttribute("position",new Ca(R,3)),this.setAttribute("normal",new Ca(N,3)),this.setAttribute("uv",new Ca(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jc(t.width,t.height,t.widthSegments,t.heightSegments)}}function Gr(r){const t={};for(const i in r){t[i]={};for(const s in r[i]){const l=r[i][s];if(c_(l))l.isRenderTargetTexture?(ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][s]=null):t[i][s]=l.clone();else if(Array.isArray(l))if(c_(l[0])){const c=[];for(let h=0,p=l.length;h<p;h++)c[h]=l[h].clone();t[i][s]=c}else t[i][s]=l.slice();else t[i][s]=l}}return t}function Hn(r){const t={};for(let i=0;i<r.length;i++){const s=Gr(r[i]);for(const l in s)t[l]=s[l]}return t}function c_(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function gy(r){const t=[];for(let i=0;i<r.length;i++)t.push(r[i].clone());return t}function mv(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ee.workingColorSpace}const _y={clone:Gr,merge:Hn};var vy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gn extends Jc{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vy,this.fragmentShader=xy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Gr(t.uniforms),this.uniformsGroups=gy(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(t).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}fromJSON(t,i){if(super.fromJSON(t,i),t.uniforms!==void 0)for(const s in t.uniforms){const l=t.uniforms[s];switch(this.uniforms[s]={},l.type){case"t":this.uniforms[s].value=i[l.value]||null;break;case"c":this.uniforms[s].value=new Oe().setHex(l.value);break;case"v2":this.uniforms[s].value=new ie().fromArray(l.value);break;case"v3":this.uniforms[s].value=new et().fromArray(l.value);break;case"v4":this.uniforms[s].value=new rn().fromArray(l.value);break;case"m3":this.uniforms[s].value=new re().fromArray(l.value);break;case"m4":this.uniforms[s].value=new cn().fromArray(l.value);break;default:this.uniforms[s].value=l.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const s in t.extensions)this.extensions[s]=t.extensions[s];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Sy extends Gn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class My extends Jc{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class yy extends Jc{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Lc=new et,Oc=new ls,ki=new et;class Zd extends ui{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new cn,this.projectionMatrix=new cn,this.projectionMatrixInverse=new cn,this.coordinateSystem=Zi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Lc,Oc,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lc,Oc,ki.set(1,1,1)).invert()}updateWorldMatrix(t,i,s=!1){super.updateWorldMatrix(t,i,s),this.matrixWorld.decompose(Lc,Oc,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lc,Oc,ki.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const os=new et,u_=new ie,f_=new ie;class Ei extends Zd{constructor(t=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=$o*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Zo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return $o*2*Math.atan(Math.tan(Zo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,s){os.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(os.x,os.y).multiplyScalar(-t/os.z),os.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(os.x,os.y).multiplyScalar(-t/os.z)}getViewSize(t,i){return this.getViewBounds(t,u_,f_),i.subVectors(f_,u_)}setViewOffset(t,i,s,l,c,h){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(Zo*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const m=h.fullWidth,d=h.fullHeight;c+=h.offsetX*l/m,i-=h.offsetY*s/d,l*=h.width/m,s*=h.height/d}const p=this.filmOffset;p!==0&&(c+=t*p/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class gv extends Zd{constructor(t=-1,i=1,s=1,l=-1,c=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=h,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,s,l,c,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-t,h=s+t,p=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,x=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=d*this.view.offsetX,h=c+d*this.view.width,p-=x*this.view.offsetY,m=p-x*this.view.height}this.projectionMatrix.makeOrthographic(c,h,p,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}const wr=-90,Dr=1;class Ey extends ui{constructor(t,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Ei(wr,Dr,t,i);l.layers=this.layers,this.add(l);const c=new Ei(wr,Dr,t,i);c.layers=this.layers,this.add(c);const h=new Ei(wr,Dr,t,i);h.layers=this.layers,this.add(h);const p=new Ei(wr,Dr,t,i);p.layers=this.layers,this.add(p);const m=new Ei(wr,Dr,t,i);m.layers=this.layers,this.add(m);const d=new Ei(wr,Dr,t,i);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[s,l,c,h,p,m]=i;for(const d of i)this.remove(d);if(t===Zi)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),p.up.set(0,1,0),p.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===Zc)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),p.up.set(0,-1,0),p.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of i)this.add(d),d.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,h,p,m,d,x]=this.children,v=t.getRenderTarget(),_=t.getActiveCubeFace(),E=t.getActiveMipmapLevel(),R=t.xr.enabled;t.xr.enabled=!1;const N=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let y=!1;t.isWebGLRenderer===!0?y=t.state.buffers.depth.getReversed():y=t.reversedDepthBuffer,t.setRenderTarget(s,0,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(i,c),t.setRenderTarget(s,1,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(i,h),t.setRenderTarget(s,2,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(i,p),t.setRenderTarget(s,3,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(i,m),t.setRenderTarget(s,4,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(i,d),s.texture.generateMipmaps=N,t.setRenderTarget(s,5,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(i,x),t.setRenderTarget(v,_,E),t.xr.enabled=R,s.texture.needsPMREMUpdate=!0}}class by extends Ei{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class h_{constructor(t=1,i=0,s=0){this.radius=t,this.phi=i,this.theta=s}set(t,i,s){return this.radius=t,this.phi=i,this.theta=s,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ge(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,i,s){return this.radius=Math.sqrt(t*t+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,s),this.phi=Math.acos(ge(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class _v{static{_v.prototype.isMatrix2=!0}constructor(t,i,s,l){this.elements=[1,0,0,1],t!==void 0&&this.set(t,i,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(t,i=0){for(let s=0;s<4;s++)this.elements[s]=t[s+i];return this}set(t,i,s,l){const c=this.elements;return c[0]=t,c[2]=i,c[1]=s,c[3]=l,this}}class Ty extends cs{constructor(t,i=null){super(),this.object=t,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function d_(r,t,i,s){const l=Ay(s);switch(i){case ev:return r*t;case iv:return r*t/l.components*l.byteLength;case Hd:return r*t/l.components*l.byteLength;case Bs:return r*t*2/l.components*l.byteLength;case Gd:return r*t*2/l.components*l.byteLength;case nv:return r*t*3/l.components*l.byteLength;case Ti:return r*t*4/l.components*l.byteLength;case Vd:return r*t*4/l.components*l.byteLength;case Bc:case Hc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Gc:case Vc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case ed:case id:return Math.max(r,16)*Math.max(t,8)/4;case td:case nd:return Math.max(r,8)*Math.max(t,8)/2;case ad:case sd:case od:case ld:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case rd:case Xc:case cd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case ud:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case fd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case hd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case dd:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case pd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case md:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case gd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case _d:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case vd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case xd:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Sd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Md:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case yd:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Ed:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case bd:case Td:case Ad:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Rd:case Cd:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Wc:case wd:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function Ay(r){switch(r){case bi:case J_:return{byteLength:1,components:1};case Jo:case j_:case Ii:return{byteLength:2,components:1};case zd:case Bd:return{byteLength:2,components:4};case Ji:case Fd:case Yi:return{byteLength:4,components:1};case $_:case tv:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Id}}));typeof window<"u"&&(window.__THREE__?ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Id);function vv(){let r=null,t=!1,i=null,s=null;function l(c,h){s=r.requestAnimationFrame(l),i(c,h)}return{start:function(){t!==!0&&i!==null&&r!==null&&(s=r.requestAnimationFrame(l),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function Ry(r){const t=new WeakMap;function i(p,m){const d=p.array,x=p.usage,v=d.byteLength,_=r.createBuffer();r.bindBuffer(m,_),r.bufferData(m,d,x),p.onUploadCallback();let E;if(d instanceof Float32Array)E=r.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)E=r.HALF_FLOAT;else if(d instanceof Uint16Array)p.isFloat16BufferAttribute?E=r.HALF_FLOAT:E=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)E=r.SHORT;else if(d instanceof Uint32Array)E=r.UNSIGNED_INT;else if(d instanceof Int32Array)E=r.INT;else if(d instanceof Int8Array)E=r.BYTE;else if(d instanceof Uint8Array)E=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)E=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:_,type:E,bytesPerElement:d.BYTES_PER_ELEMENT,version:p.version,size:v}}function s(p,m,d){const x=m.array,v=m.updateRanges;if(r.bindBuffer(d,p),v.length===0)r.bufferSubData(d,0,x);else{v.sort((E,R)=>E.start-R.start);let _=0;for(let E=1;E<v.length;E++){const R=v[_],N=v[E];N.start<=R.start+R.count+1?R.count=Math.max(R.count,N.start+N.count-R.start):(++_,v[_]=N)}v.length=_+1;for(let E=0,R=v.length;E<R;E++){const N=v[E];r.bufferSubData(d,N.start*x.BYTES_PER_ELEMENT,x,N.start,N.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(p){return p.isInterleavedBufferAttribute&&(p=p.data),t.get(p)}function c(p){p.isInterleavedBufferAttribute&&(p=p.data);const m=t.get(p);m&&(r.deleteBuffer(m.buffer),t.delete(p))}function h(p,m){if(p.isInterleavedBufferAttribute&&(p=p.data),p.isGLBufferAttribute){const x=t.get(p);(!x||x.version<p.version)&&t.set(p,{buffer:p.buffer,type:p.type,bytesPerElement:p.elementSize,version:p.version});return}const d=t.get(p);if(d===void 0)t.set(p,i(p,m));else if(d.version<p.version){if(d.size!==p.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(d.buffer,p,m),d.version=p.version}}return{get:l,remove:c,update:h}}var Cy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wy=`#ifdef USE_ALPHAHASH
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
#endif`,Dy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Uy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ny=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ly=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Oy=`#ifdef USE_AOMAP
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
#endif`,Py=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Iy=`#ifdef USE_BATCHING
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
#endif`,Fy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,By=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hy=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Gy=`#ifdef USE_IRIDESCENCE
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
#endif`,Vy=`#ifdef USE_BUMPMAP
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
#endif`,ky=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Xy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Zy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ky=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Qy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Jy=`#define PI 3.141592653589793
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
} // validated`,jy=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,$y=`vec3 transformedNormal = objectNormal;
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
#endif`,tE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,eE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,iE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,aE="gl_FragColor = linearToOutputTexel( gl_FragColor );",sE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rE=`#ifdef USE_ENVMAP
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
#endif`,oE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,lE=`#ifdef USE_ENVMAP
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
#endif`,cE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,uE=`#ifdef USE_ENVMAP
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
#endif`,fE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mE=`#ifdef USE_GRADIENTMAP
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
}`,gE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_E=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xE=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,SE=`#ifdef USE_ENVMAP
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
#endif`,ME=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,yE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,EE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,TE=`PhysicalMaterial material;
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
#endif`,AE=`uniform sampler2D dfgLUT;
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
}`,RE=`
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
#endif`,CE=`#if defined( RE_IndirectDiffuse )
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
#endif`,wE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,DE=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,UE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,NE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,LE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,OE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,PE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,IE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,FE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,zE=`#if defined( USE_POINTS_UV )
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
#endif`,BE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,HE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,GE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,VE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,kE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,XE=`#ifdef USE_MORPHTARGETS
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
#endif`,WE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,YE=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ZE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,KE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,QE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,JE=`#ifdef USE_NORMALMAP
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
#endif`,jE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$E=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,eb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,nb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ib=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ab=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ob=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ub=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,hb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,db=`float getShadowMask() {
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
}`,pb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mb=`#ifdef USE_SKINNING
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
#endif`,gb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_b=`#ifdef USE_SKINNING
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
#endif`,vb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,yb=`#ifdef USE_TRANSMISSION
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
#endif`,Eb=`#ifdef USE_TRANSMISSION
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
#endif`,bb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ab=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Cb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wb=`uniform sampler2D t2D;
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
}`,Db=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ub=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Nb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ob=`#include <common>
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
}`,Pb=`#if DEPTH_PACKING == 3200
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
}`,Ib=`#define DISTANCE
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
}`,Fb=`#define DISTANCE
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
}`,zb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hb=`uniform float scale;
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
}`,Gb=`uniform vec3 diffuse;
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
}`,Vb=`#include <common>
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
}`,kb=`uniform vec3 diffuse;
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
}`,Xb=`#define LAMBERT
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
}`,Wb=`#define LAMBERT
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
}`,qb=`#define MATCAP
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
}`,Yb=`#define MATCAP
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
}`,Zb=`#define NORMAL
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
}`,Kb=`#define NORMAL
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
}`,Qb=`#define PHONG
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
}`,Jb=`#define PHONG
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
}`,jb=`#define STANDARD
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
}`,$b=`#define STANDARD
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
}`,tT=`#define TOON
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
}`,eT=`#define TOON
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
}`,nT=`uniform float size;
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
}`,iT=`uniform vec3 diffuse;
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
}`,aT=`#include <common>
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
}`,sT=`uniform vec3 color;
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
}`,rT=`uniform float rotation;
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
}`,oT=`uniform vec3 diffuse;
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
}`,de={alphahash_fragment:Cy,alphahash_pars_fragment:wy,alphamap_fragment:Dy,alphamap_pars_fragment:Uy,alphatest_fragment:Ny,alphatest_pars_fragment:Ly,aomap_fragment:Oy,aomap_pars_fragment:Py,batching_pars_vertex:Iy,batching_vertex:Fy,begin_vertex:zy,beginnormal_vertex:By,bsdfs:Hy,iridescence_fragment:Gy,bumpmap_pars_fragment:Vy,clipping_planes_fragment:ky,clipping_planes_pars_fragment:Xy,clipping_planes_pars_vertex:Wy,clipping_planes_vertex:qy,color_fragment:Yy,color_pars_fragment:Zy,color_pars_vertex:Ky,color_vertex:Qy,common:Jy,cube_uv_reflection_fragment:jy,defaultnormal_vertex:$y,displacementmap_pars_vertex:tE,displacementmap_vertex:eE,emissivemap_fragment:nE,emissivemap_pars_fragment:iE,colorspace_fragment:aE,colorspace_pars_fragment:sE,envmap_fragment:rE,envmap_common_pars_fragment:oE,envmap_pars_fragment:lE,envmap_pars_vertex:cE,envmap_physical_pars_fragment:SE,envmap_vertex:uE,fog_vertex:fE,fog_pars_vertex:hE,fog_fragment:dE,fog_pars_fragment:pE,gradientmap_pars_fragment:mE,lightmap_pars_fragment:gE,lights_lambert_fragment:_E,lights_lambert_pars_fragment:vE,lights_pars_begin:xE,lights_toon_fragment:ME,lights_toon_pars_fragment:yE,lights_phong_fragment:EE,lights_phong_pars_fragment:bE,lights_physical_fragment:TE,lights_physical_pars_fragment:AE,lights_fragment_begin:RE,lights_fragment_maps:CE,lights_fragment_end:wE,lightprobes_pars_fragment:DE,logdepthbuf_fragment:UE,logdepthbuf_pars_fragment:NE,logdepthbuf_pars_vertex:LE,logdepthbuf_vertex:OE,map_fragment:PE,map_pars_fragment:IE,map_particle_fragment:FE,map_particle_pars_fragment:zE,metalnessmap_fragment:BE,metalnessmap_pars_fragment:HE,morphinstance_vertex:GE,morphcolor_vertex:VE,morphnormal_vertex:kE,morphtarget_pars_vertex:XE,morphtarget_vertex:WE,normal_fragment_begin:qE,normal_fragment_maps:YE,normal_pars_fragment:ZE,normal_pars_vertex:KE,normal_vertex:QE,normalmap_pars_fragment:JE,clearcoat_normal_fragment_begin:jE,clearcoat_normal_fragment_maps:$E,clearcoat_pars_fragment:tb,iridescence_pars_fragment:eb,opaque_fragment:nb,packing:ib,premultiplied_alpha_fragment:ab,project_vertex:sb,dithering_fragment:rb,dithering_pars_fragment:ob,roughnessmap_fragment:lb,roughnessmap_pars_fragment:cb,shadowmap_pars_fragment:ub,shadowmap_pars_vertex:fb,shadowmap_vertex:hb,shadowmask_pars_fragment:db,skinbase_vertex:pb,skinning_pars_vertex:mb,skinning_vertex:gb,skinnormal_vertex:_b,specularmap_fragment:vb,specularmap_pars_fragment:xb,tonemapping_fragment:Sb,tonemapping_pars_fragment:Mb,transmission_fragment:yb,transmission_pars_fragment:Eb,uv_pars_fragment:bb,uv_pars_vertex:Tb,uv_vertex:Ab,worldpos_vertex:Rb,background_vert:Cb,background_frag:wb,backgroundCube_vert:Db,backgroundCube_frag:Ub,cube_vert:Nb,cube_frag:Lb,depth_vert:Ob,depth_frag:Pb,distance_vert:Ib,distance_frag:Fb,equirect_vert:zb,equirect_frag:Bb,linedashed_vert:Hb,linedashed_frag:Gb,meshbasic_vert:Vb,meshbasic_frag:kb,meshlambert_vert:Xb,meshlambert_frag:Wb,meshmatcap_vert:qb,meshmatcap_frag:Yb,meshnormal_vert:Zb,meshnormal_frag:Kb,meshphong_vert:Qb,meshphong_frag:Jb,meshphysical_vert:jb,meshphysical_frag:$b,meshtoon_vert:tT,meshtoon_frag:eT,points_vert:nT,points_frag:iT,shadow_vert:aT,shadow_frag:sT,sprite_vert:rT,sprite_frag:oT},Pt={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new re}},envmap:{envMap:{value:null},envMapRotation:{value:new re},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new re}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new re}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new re},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new re},normalScale:{value:new ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new re},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new re}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new re}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new re}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new et},probesMax:{value:new et},probesResolution:{value:new et}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0},uvTransform:{value:new re}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}}},qi={basic:{uniforms:Hn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.fog]),vertexShader:de.meshbasic_vert,fragmentShader:de.meshbasic_frag},lambert:{uniforms:Hn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new Oe(0)},envMapIntensity:{value:1}}]),vertexShader:de.meshlambert_vert,fragmentShader:de.meshlambert_frag},phong:{uniforms:Hn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:de.meshphong_vert,fragmentShader:de.meshphong_frag},standard:{uniforms:Hn([Pt.common,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.roughnessmap,Pt.metalnessmap,Pt.fog,Pt.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:de.meshphysical_vert,fragmentShader:de.meshphysical_frag},toon:{uniforms:Hn([Pt.common,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.gradientmap,Pt.fog,Pt.lights,{emissive:{value:new Oe(0)}}]),vertexShader:de.meshtoon_vert,fragmentShader:de.meshtoon_frag},matcap:{uniforms:Hn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,{matcap:{value:null}}]),vertexShader:de.meshmatcap_vert,fragmentShader:de.meshmatcap_frag},points:{uniforms:Hn([Pt.points,Pt.fog]),vertexShader:de.points_vert,fragmentShader:de.points_frag},dashed:{uniforms:Hn([Pt.common,Pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:de.linedashed_vert,fragmentShader:de.linedashed_frag},depth:{uniforms:Hn([Pt.common,Pt.displacementmap]),vertexShader:de.depth_vert,fragmentShader:de.depth_frag},normal:{uniforms:Hn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,{opacity:{value:1}}]),vertexShader:de.meshnormal_vert,fragmentShader:de.meshnormal_frag},sprite:{uniforms:Hn([Pt.sprite,Pt.fog]),vertexShader:de.sprite_vert,fragmentShader:de.sprite_frag},background:{uniforms:{uvTransform:{value:new re},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:de.background_vert,fragmentShader:de.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new re}},vertexShader:de.backgroundCube_vert,fragmentShader:de.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:de.cube_vert,fragmentShader:de.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:de.equirect_vert,fragmentShader:de.equirect_frag},distance:{uniforms:Hn([Pt.common,Pt.displacementmap,{referencePosition:{value:new et},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:de.distance_vert,fragmentShader:de.distance_frag},shadow:{uniforms:Hn([Pt.lights,Pt.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:de.shadow_vert,fragmentShader:de.shadow_frag}};qi.physical={uniforms:Hn([qi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new re},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new re},clearcoatNormalScale:{value:new ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new re},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new re},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new re},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new re},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new re},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new re},transmissionSamplerSize:{value:new ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new re},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new re},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new re},anisotropyVector:{value:new ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new re}}]),vertexShader:de.meshphysical_vert,fragmentShader:de.meshphysical_frag};const Pc={r:0,b:0,g:0},lT=new cn,xv=new re;xv.set(-1,0,0,0,1,0,0,0,1);function cT(r,t,i,s,l,c){const h=new Oe(0);let p=l===!0?0:1,m,d,x=null,v=0,_=null;function E(I){let B=I.isScene===!0?I.background:null;if(B&&B.isTexture){const D=I.backgroundBlurriness>0;B=t.get(B,D)}return B}function R(I){let B=!1;const D=E(I);D===null?y(h,p):D&&D.isColor&&(y(D,1),B=!0);const U=r.xr.getEnvironmentBlendMode();U==="additive"?i.buffers.color.setClear(0,0,0,1,c):U==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(r.autoClear||B)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function N(I,B){const D=E(B);D&&(D.isCubeTexture||D.mapping===Qc)?(d===void 0&&(d=new ji(new nl(1,1,1),new Gn({name:"BackgroundCubeMaterial",uniforms:Gr(qi.backgroundCube.uniforms),vertexShader:qi.backgroundCube.vertexShader,fragmentShader:qi.backgroundCube.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(U,C,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),d.material.uniforms.envMap.value=D,d.material.uniforms.backgroundBlurriness.value=B.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=B.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(lT.makeRotationFromEuler(B.backgroundRotation)).transpose(),D.isCubeTexture&&D.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(xv),d.material.toneMapped=Ee.getTransfer(D.colorSpace)!==Fe,(x!==D||v!==D.version||_!==r.toneMapping)&&(d.material.needsUpdate=!0,x=D,v=D.version,_=r.toneMapping),d.layers.enableAll(),I.unshift(d,d.geometry,d.material,0,0,null)):D&&D.isTexture&&(m===void 0&&(m=new ji(new jc(2,2),new Gn({name:"BackgroundMaterial",uniforms:Gr(qi.background.uniforms),vertexShader:qi.background.vertexShader,fragmentShader:qi.background.fragmentShader,side:Fs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(m)),m.material.uniforms.t2D.value=D,m.material.uniforms.backgroundIntensity.value=B.backgroundIntensity,m.material.toneMapped=Ee.getTransfer(D.colorSpace)!==Fe,D.matrixAutoUpdate===!0&&D.updateMatrix(),m.material.uniforms.uvTransform.value.copy(D.matrix),(x!==D||v!==D.version||_!==r.toneMapping)&&(m.material.needsUpdate=!0,x=D,v=D.version,_=r.toneMapping),m.layers.enableAll(),I.unshift(m,m.geometry,m.material,0,0,null))}function y(I,B){I.getRGB(Pc,mv(r)),i.buffers.color.setClear(Pc.r,Pc.g,Pc.b,B,c)}function S(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return h},setClearColor:function(I,B=1){h.set(I),p=B,y(h,p)},getClearAlpha:function(){return p},setClearAlpha:function(I){p=I,y(h,p)},render:R,addToRenderList:N,dispose:S}}function uT(r,t){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=_(null);let c=l,h=!1;function p(q,Q,lt,Y,j){let F=!1;const H=v(q,Y,lt,Q);c!==H&&(c=H,d(c.object)),F=E(q,Y,lt,j),F&&R(q,Y,lt,j),j!==null&&t.update(j,r.ELEMENT_ARRAY_BUFFER),(F||h)&&(h=!1,D(q,Q,lt,Y),j!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(j).buffer))}function m(){return r.createVertexArray()}function d(q){return r.bindVertexArray(q)}function x(q){return r.deleteVertexArray(q)}function v(q,Q,lt,Y){const j=Y.wireframe===!0;let F=s[Q.id];F===void 0&&(F={},s[Q.id]=F);const H=q.isInstancedMesh===!0?q.id:0;let ct=F[H];ct===void 0&&(ct={},F[H]=ct);let st=ct[lt.id];st===void 0&&(st={},ct[lt.id]=st);let ht=st[j];return ht===void 0&&(ht=_(m()),st[j]=ht),ht}function _(q){const Q=[],lt=[],Y=[];for(let j=0;j<i;j++)Q[j]=0,lt[j]=0,Y[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Q,enabledAttributes:lt,attributeDivisors:Y,object:q,attributes:{},index:null}}function E(q,Q,lt,Y){const j=c.attributes,F=Q.attributes;let H=0;const ct=lt.getAttributes();for(const st in ct)if(ct[st].location>=0){const w=j[st];let J=F[st];if(J===void 0&&(st==="instanceMatrix"&&q.instanceMatrix&&(J=q.instanceMatrix),st==="instanceColor"&&q.instanceColor&&(J=q.instanceColor)),w===void 0||w.attribute!==J||J&&w.data!==J.data)return!0;H++}return c.attributesNum!==H||c.index!==Y}function R(q,Q,lt,Y){const j={},F=Q.attributes;let H=0;const ct=lt.getAttributes();for(const st in ct)if(ct[st].location>=0){let w=F[st];w===void 0&&(st==="instanceMatrix"&&q.instanceMatrix&&(w=q.instanceMatrix),st==="instanceColor"&&q.instanceColor&&(w=q.instanceColor));const J={};J.attribute=w,w&&w.data&&(J.data=w.data),j[st]=J,H++}c.attributes=j,c.attributesNum=H,c.index=Y}function N(){const q=c.newAttributes;for(let Q=0,lt=q.length;Q<lt;Q++)q[Q]=0}function y(q){S(q,0)}function S(q,Q){const lt=c.newAttributes,Y=c.enabledAttributes,j=c.attributeDivisors;lt[q]=1,Y[q]===0&&(r.enableVertexAttribArray(q),Y[q]=1),j[q]!==Q&&(r.vertexAttribDivisor(q,Q),j[q]=Q)}function I(){const q=c.newAttributes,Q=c.enabledAttributes;for(let lt=0,Y=Q.length;lt<Y;lt++)Q[lt]!==q[lt]&&(r.disableVertexAttribArray(lt),Q[lt]=0)}function B(q,Q,lt,Y,j,F,H){H===!0?r.vertexAttribIPointer(q,Q,lt,j,F):r.vertexAttribPointer(q,Q,lt,Y,j,F)}function D(q,Q,lt,Y){N();const j=Y.attributes,F=lt.getAttributes(),H=Q.defaultAttributeValues;for(const ct in F){const st=F[ct];if(st.location>=0){let ht=j[ct];if(ht===void 0&&(ct==="instanceMatrix"&&q.instanceMatrix&&(ht=q.instanceMatrix),ct==="instanceColor"&&q.instanceColor&&(ht=q.instanceColor)),ht!==void 0){const w=ht.normalized,J=ht.itemSize,gt=t.get(ht);if(gt===void 0)continue;const Et=gt.buffer,Nt=gt.type,Xt=gt.bytesPerElement,it=Nt===r.INT||Nt===r.UNSIGNED_INT||ht.gpuType===Fd;if(ht.isInterleavedBufferAttribute){const _t=ht.data,Tt=_t.stride,te=ht.offset;if(_t.isInstancedInterleavedBuffer){for(let Bt=0;Bt<st.locationSize;Bt++)S(st.location+Bt,_t.meshPerAttribute);q.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=_t.meshPerAttribute*_t.count)}else for(let Bt=0;Bt<st.locationSize;Bt++)y(st.location+Bt);r.bindBuffer(r.ARRAY_BUFFER,Et);for(let Bt=0;Bt<st.locationSize;Bt++)B(st.location+Bt,J/st.locationSize,Nt,w,Tt*Xt,(te+J/st.locationSize*Bt)*Xt,it)}else{if(ht.isInstancedBufferAttribute){for(let _t=0;_t<st.locationSize;_t++)S(st.location+_t,ht.meshPerAttribute);q.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let _t=0;_t<st.locationSize;_t++)y(st.location+_t);r.bindBuffer(r.ARRAY_BUFFER,Et);for(let _t=0;_t<st.locationSize;_t++)B(st.location+_t,J/st.locationSize,Nt,w,J*Xt,J/st.locationSize*_t*Xt,it)}}else if(H!==void 0){const w=H[ct];if(w!==void 0)switch(w.length){case 2:r.vertexAttrib2fv(st.location,w);break;case 3:r.vertexAttrib3fv(st.location,w);break;case 4:r.vertexAttrib4fv(st.location,w);break;default:r.vertexAttrib1fv(st.location,w)}}}}I()}function U(){O();for(const q in s){const Q=s[q];for(const lt in Q){const Y=Q[lt];for(const j in Y){const F=Y[j];for(const H in F)x(F[H].object),delete F[H];delete Y[j]}}delete s[q]}}function C(q){if(s[q.id]===void 0)return;const Q=s[q.id];for(const lt in Q){const Y=Q[lt];for(const j in Y){const F=Y[j];for(const H in F)x(F[H].object),delete F[H];delete Y[j]}}delete s[q.id]}function P(q){for(const Q in s){const lt=s[Q];for(const Y in lt){const j=lt[Y];if(j[q.id]===void 0)continue;const F=j[q.id];for(const H in F)x(F[H].object),delete F[H];delete j[q.id]}}}function b(q){for(const Q in s){const lt=s[Q],Y=q.isInstancedMesh===!0?q.id:0,j=lt[Y];if(j!==void 0){for(const F in j){const H=j[F];for(const ct in H)x(H[ct].object),delete H[ct];delete j[F]}delete lt[Y],Object.keys(lt).length===0&&delete s[Q]}}}function O(){W(),h=!0,c!==l&&(c=l,d(c.object))}function W(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:p,reset:O,resetDefaultState:W,dispose:U,releaseStatesOfGeometry:C,releaseStatesOfObject:b,releaseStatesOfProgram:P,initAttributes:N,enableAttribute:y,disableUnusedAttributes:I}}function fT(r,t,i){let s;function l(m){s=m}function c(m,d){r.drawArrays(s,m,d),i.update(d,s,1)}function h(m,d,x){x!==0&&(r.drawArraysInstanced(s,m,d,x),i.update(d,s,x))}function p(m,d,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,d,0,x);let _=0;for(let E=0;E<x;E++)_+=d[E];i.update(_,s,1)}this.setMode=l,this.render=c,this.renderInstances=h,this.renderMultiDraw=p}function hT(r,t,i,s){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(P){return!(P!==Ti&&s.convert(P)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function p(P){const b=P===Ii&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==bi&&P!==Yi&&!b&&s.convert(P)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function m(P){if(P==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=i.precision!==void 0?i.precision:"highp";const x=m(d);x!==d&&(ne("WebGLRenderer:",d,"not supported, using",x,"instead."),d=x);const v=i.logarithmicDepthBuffer===!0,_=i.reversedDepthBuffer===!0&&t.has("EXT_clip_control");i.reversedDepthBuffer===!0&&_===!1&&ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const E=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),R=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),N=r.getParameter(r.MAX_TEXTURE_SIZE),y=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),S=r.getParameter(r.MAX_VERTEX_ATTRIBS),I=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),B=r.getParameter(r.MAX_VARYING_VECTORS),D=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),U=r.getParameter(r.MAX_SAMPLES),C=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:h,textureTypeReadable:p,precision:d,logarithmicDepthBuffer:v,reversedDepthBuffer:_,maxTextures:E,maxVertexTextures:R,maxTextureSize:N,maxCubemapSize:y,maxAttributes:S,maxVertexUniforms:I,maxVaryings:B,maxFragmentUniforms:D,maxSamples:U,samples:C}}function dT(r){const t=this;let i=null,s=0,l=!1,c=!1;const h=new Ea,p=new re,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(v,_){const E=v.length!==0||_||s!==0||l;return l=_,s=v.length,E},this.beginShadows=function(){c=!0,x(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(v,_){i=x(v,_,0)},this.setState=function(v,_,E){const R=v.clippingPlanes,N=v.clipIntersection,y=v.clipShadows,S=r.get(v);if(!l||R===null||R.length===0||c&&!y)c?x(null):d();else{const I=c?0:s,B=I*4;let D=S.clippingState||null;m.value=D,D=x(R,_,B,E);for(let U=0;U!==B;++U)D[U]=i[U];S.clippingState=D,this.numIntersection=N?this.numPlanes:0,this.numPlanes+=I}};function d(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function x(v,_,E,R){const N=v!==null?v.length:0;let y=null;if(N!==0){if(y=m.value,R!==!0||y===null){const S=E+N*4,I=_.matrixWorldInverse;p.getNormalMatrix(I),(y===null||y.length<S)&&(y=new Float32Array(S));for(let B=0,D=E;B!==N;++B,D+=4)h.copy(v[B]).applyMatrix4(I,p),h.normal.toArray(y,D),y[D+3]=h.constant}m.value=y,m.needsUpdate=!0}return t.numPlanes=N,t.numIntersection=0,y}}const Pr=4,pT=6,mT=20,gT=256,Vo=new gv,p_=new Oe;let Ih=null,Fh=0,zh=0,Bh=!1;const _T=new et,Ls=new et;class m_{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,i=0,s=.1,l=100,c={}){const{size:h=256,position:p=_T}=c;Ih=this._renderer.getRenderTarget(),Fh=this._renderer.getActiveCubeFace(),zh=this._renderer.getActiveMipmapLevel(),Bh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,s,l,m,p),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=v_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=__(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Ih,Fh,zh),this._renderer.xr.enabled=Bh,t.scissorTest=!1,Ur(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===zs||t.mapping===Hr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ih=this._renderer.getRenderTarget(),Fh=this._renderer.getActiveCubeFace(),zh=this._renderer.getActiveMipmapLevel(),Bh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:An,minFilter:An,generateMipmaps:!1,type:Ii,format:Ti,colorSpace:qc,depthBuffer:!1},l=g_(t,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=g_(t,i,s);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=vT(c)),this._blurMaterial=ST(c,t,i),this._ggxMaterial=xT(c,t,i)}return l}_compileMaterial(t){const i=new ji(new $i,t);this._renderer.compile(i,Vo)}_sceneToCubeUV(t,i,s,l,c){const m=new Ei(90,1,i,s),d=[1,-1,1,1,1,1],x=[1,1,1,-1,-1,-1],v=this._renderer,_=v.autoClear,E=v.toneMapping;v.getClearColor(p_),v.toneMapping=Ki,v.autoClear=!1,v.state.buffers.depth.getReversed()&&(v.setRenderTarget(l),v.clearDepth(),v.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ji(new nl,new fv({name:"PMREM.Background",side:jn,depthWrite:!1,depthTest:!1})));const N=this._backgroundBox,y=N.material;let S=!1;const I=t.background;I?I.isColor&&(y.color.copy(I),t.background=null,S=!0):(y.color.copy(p_),S=!0);for(let B=0;B<6;B++){const D=B%3;D===0?(m.up.set(0,d[B],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+x[B],c.y,c.z)):D===1?(m.up.set(0,0,d[B]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+x[B],c.z)):(m.up.set(0,d[B],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+x[B]));const U=this._cubeSize;Ur(l,D*U,B>2?U:0,U,U),v.setRenderTarget(l),S&&v.render(N,m),v.render(t,m)}v.toneMapping=E,v.autoClear=_,t.background=I}_textureToCubeUV(t,i){const s=this._renderer,l=t.mapping===zs||t.mapping===Hr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=v_()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=__());const c=l?this._cubemapMaterial:this._equirectMaterial,h=this._lodMeshes[0];h.material=c;const p=c.uniforms;p.envMap.value=t;const m=this._cubeSize;Ur(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(h,Vo)}_applyPMREM(t){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(t,c-1,c);i.autoClear=s}_applyGGXFilter(t,i,s){const l=this._renderer,c=this._pingPongRenderTarget,h=this._ggxMaterial,p=this._lodMeshes[s];p.material=h;const m=h.uniforms,d=s/(this._lodMeshes.length-1),x=i/(this._lodMeshes.length-1),v=Math.sqrt(d*d-x*x),_=d*1.25,E=v*_,{_lodMax:R}=this,N=this._sizeLods[s],y=3*N*(s>R-Pr?s-R+Pr:0),S=4*(this._cubeSize-N);m.envMap.value=t.texture,m.roughness.value=E,m.mipInt.value=R-i,Ur(c,y,S,3*N,2*N),l.setRenderTarget(c),l.render(p,Vo),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=R-s,Ur(t,y,S,3*N,2*N),l.setRenderTarget(t),l.render(p,Vo)}_blur(t,i,s,l){const c=this._pingPongRenderTarget,h=Math.min(l,Math.PI)/Math.SQRT2;this._blurPass(t,c,i,s,h),this._blurPass(c,t,s,s,h)}_blurPass(t,i,s,l,c){const h=this._renderer,p=this._blurMaterial,m=this._lodMeshes[l];m.material=p;const d=p.uniforms;d.envMap.value=t.texture,d.sigma.value=c,d.mipInt.value=this._lodMax-s;const x=this._sizeLods[l],v=3*x*(l>this._lodMax-Pr?l-this._lodMax+Pr:0),_=4*(this._cubeSize-x);Ur(i,v,_,3*x,2*x),h.setRenderTarget(i),h.render(m,Vo)}}function vT(r){const t=[],i=[];let s=r;const l=r-Pr+1+pT;for(let c=0;c<l;c++){const h=Math.pow(2,s);t.push(h);const p=1/(h-2),m=-p,d=1+p,x=[m,m,d,m,d,d,m,m,d,d,m,d],v=6,_=6,E=3,R=new Float32Array(E*_*v),N=new Float32Array(E*_*v);for(let S=0;S<v;S++){const I=S%3*2/3-1,B=S>2?0:-1,D=[I,B,0,I+2/3,B,0,I+2/3,B+1,0,I,B,0,I+2/3,B+1,0,I,B+1,0];R.set(D,E*_*S);for(let U=0;U<_;U++){const C=x[U*2]*2-1,P=x[U*2+1]*2-1;S===0?Ls.set(1,P,C):S===1?Ls.set(-C,1,-P):S===2?Ls.set(-C,P,1):S===3?Ls.set(-1,P,-C):S===4?Ls.set(-C,-1,P):Ls.set(C,P,-1),Ls.toArray(N,(S*_+U)*E)}}const y=new $i;y.setAttribute("position",new Qi(R,E)),y.setAttribute("outputDirection",new Qi(N,E)),i.push(new ji(y,null)),s>Pr&&s--}return{lodMeshes:i,sizeLods:t}}function g_(r,t,i){const s=new Ai(r,t,i);return s.texture.mapping=Qc,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Ur(r,t,i,s,l){r.viewport.set(t,i,s,l),r.scissor.set(t,i,s,l)}function xT(r,t,i){return new Gn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:gT,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:$c(),fragmentShader:`

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
		`,blending:Aa,depthTest:!1,depthWrite:!1})}function ST(r,t,i){return new Gn({name:"SphericalGaussianBlur",defines:{SAMPLES:mT,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:$c(),fragmentShader:`

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
		`,blending:Aa,depthTest:!1,depthWrite:!1})}function __(){return new Gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$c(),fragmentShader:`

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
		`,blending:Aa,depthTest:!1,depthWrite:!1})}function v_(){return new Gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Aa,depthTest:!1,depthWrite:!1})}function $c(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Sv extends Ai{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new dv(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new nl(5,5,5),c=new Gn({name:"CubemapFromEquirect",uniforms:Gr(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:jn,blending:Aa});c.uniforms.tEquirect.value=i;const h=new ji(l,c),p=i.minFilter;return i.minFilter===Os&&(i.minFilter=An),new Ey(1,10,this).update(t,h),i.minFilter=p,h.geometry.dispose(),h.material.dispose(),this}clear(t,i=!0,s=!0,l=!0){const c=t.getRenderTarget();for(let h=0;h<6;h++)t.setRenderTarget(this,h),t.clear(i,s,l);t.setRenderTarget(c)}}function MT(r){let t=new WeakMap,i=new WeakMap,s=null;function l(_,E=!1){return _==null?null:E?h(_):c(_)}function c(_){if(_&&_.isTexture){const E=_.mapping;if(E===hh||E===dh)if(t.has(_)){const R=t.get(_).texture;return p(R,_.mapping)}else{const R=_.image;if(R&&R.height>0){const N=new Sv(R.height);return N.fromEquirectangularTexture(r,_),t.set(_,N),_.addEventListener("dispose",d),p(N.texture,_.mapping)}else return null}}return _}function h(_){if(_&&_.isTexture){const E=_.mapping,R=E===hh||E===dh,N=E===zs||E===Hr;if(R||N){let y=i.get(_);const S=y!==void 0?y.texture.pmremVersion:0;if(_.isRenderTargetTexture&&_.pmremVersion!==S)return s===null&&(s=new m_(r)),y=R?s.fromEquirectangular(_,y):s.fromCubemap(_,y),y.texture.pmremVersion=_.pmremVersion,i.set(_,y),y.texture;if(y!==void 0)return y.texture;{const I=_.image;return R&&I&&I.height>0||N&&I&&m(I)?(s===null&&(s=new m_(r)),y=R?s.fromEquirectangular(_):s.fromCubemap(_),y.texture.pmremVersion=_.pmremVersion,i.set(_,y),_.addEventListener("dispose",x),y.texture):null}}}return _}function p(_,E){return E===hh?_.mapping=zs:E===dh&&(_.mapping=Hr),_}function m(_){let E=0;const R=6;for(let N=0;N<R;N++)_[N]!==void 0&&E++;return E===R}function d(_){const E=_.target;E.removeEventListener("dispose",d);const R=t.get(E);R!==void 0&&(t.delete(E),R.dispose())}function x(_){const E=_.target;E.removeEventListener("dispose",x);const R=i.get(E);R!==void 0&&(i.delete(E),R.dispose())}function v(){t=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:v}}function yT(r){const t={};function i(s){if(t[s]!==void 0)return t[s];const l=r.getExtension(s);return t[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&zr("WebGLRenderer: "+s+" extension not supported."),l}}}function ET(r,t,i,s){const l={},c=new WeakMap;function h(v){const _=v.target;_.index!==null&&t.remove(_.index);for(const R in _.attributes)t.remove(_.attributes[R]);_.removeEventListener("dispose",h),delete l[_.id];const E=c.get(_);E&&(t.remove(E),c.delete(_)),s.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,i.memory.geometries--}function p(v,_){return l[_.id]===!0||(_.addEventListener("dispose",h),l[_.id]=!0,i.memory.geometries++),_}function m(v){const _=v.attributes;for(const E in _)t.update(_[E],r.ARRAY_BUFFER)}function d(v){const _=[],E=v.index,R=v.attributes.position;let N=0;if(R===void 0)return;if(E!==null){const I=E.array;N=E.version;for(let B=0,D=I.length;B<D;B+=3){const U=I[B+0],C=I[B+1],P=I[B+2];_.push(U,C,C,P,P,U)}}else{const I=R.array;N=R.version;for(let B=0,D=I.length/3-1;B<D;B+=3){const U=B+0,C=B+1,P=B+2;_.push(U,C,C,P,P,U)}}const y=new(R.count>=65535?cv:lv)(_,1);y.version=N;const S=c.get(v);S&&t.remove(S),c.set(v,y)}function x(v){const _=c.get(v);if(_){const E=v.index;E!==null&&_.version<E.version&&d(v)}else d(v);return c.get(v)}return{get:p,update:m,getWireframeAttribute:x}}function bT(r,t,i){let s;function l(v){s=v}let c,h;function p(v){c=v.type,h=v.bytesPerElement}function m(v,_){r.drawElements(s,_,c,v*h),i.update(_,s,1)}function d(v,_,E){E!==0&&(r.drawElementsInstanced(s,_,c,v*h,E),i.update(_,s,E))}function x(v,_,E){if(E===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,_,0,c,v,0,E);let N=0;for(let y=0;y<E;y++)N+=_[y];i.update(N,s,1)}this.setMode=l,this.setIndex=p,this.render=m,this.renderInstances=d,this.renderMultiDraw=x}function TT(r){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,h,p){switch(i.calls++,h){case r.TRIANGLES:i.triangles+=p*(c/3);break;case r.LINES:i.lines+=p*(c/2);break;case r.LINE_STRIP:i.lines+=p*(c-1);break;case r.LINE_LOOP:i.lines+=p*c;break;case r.POINTS:i.points+=p*c;break;default:Ce("WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:s}}function AT(r,t,i){const s=new WeakMap,l=new rn;function c(h,p,m){const d=h.morphTargetInfluences,x=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,v=x!==void 0?x.length:0;let _=s.get(p);if(_===void 0||_.count!==v){let W=function(){b.dispose(),s.delete(p),p.removeEventListener("dispose",W)};var E=W;_!==void 0&&_.texture.dispose();const R=p.morphAttributes.position!==void 0,N=p.morphAttributes.normal!==void 0,y=p.morphAttributes.color!==void 0,S=p.morphAttributes.position||[],I=p.morphAttributes.normal||[],B=p.morphAttributes.color||[];let D=0;R===!0&&(D=1),N===!0&&(D=2),y===!0&&(D=3);let U=p.attributes.position.count*D,C=1;U>t.maxTextureSize&&(C=Math.ceil(U/t.maxTextureSize),U=t.maxTextureSize);const P=new Float32Array(U*C*4*v),b=new sv(P,U,C,v);b.type=Yi,b.needsUpdate=!0;const O=D*4;for(let q=0;q<v;q++){const Q=S[q],lt=I[q],Y=B[q],j=U*C*4*q;for(let F=0;F<Q.count;F++){const H=F*O;R===!0&&(l.fromBufferAttribute(Q,F),P[j+H+0]=l.x,P[j+H+1]=l.y,P[j+H+2]=l.z,P[j+H+3]=0),N===!0&&(l.fromBufferAttribute(lt,F),P[j+H+4]=l.x,P[j+H+5]=l.y,P[j+H+6]=l.z,P[j+H+7]=0),y===!0&&(l.fromBufferAttribute(Y,F),P[j+H+8]=l.x,P[j+H+9]=l.y,P[j+H+10]=l.z,P[j+H+11]=Y.itemSize===4?l.w:1)}}_={count:v,texture:b,size:new ie(U,C)},s.set(p,_),p.addEventListener("dispose",W)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",h.morphTexture,i);else{let R=0;for(let y=0;y<d.length;y++)R+=d[y];const N=p.morphTargetsRelative?1:1-R;m.getUniforms().setValue(r,"morphTargetBaseInfluence",N),m.getUniforms().setValue(r,"morphTargetInfluences",d)}m.getUniforms().setValue(r,"morphTargetsTexture",_.texture,i),m.getUniforms().setValue(r,"morphTargetsTextureSize",_.size)}return{update:c}}function RT(r,t,i,s,l){let c=new WeakMap;function h(d){const x=l.render.frame,v=d.geometry,_=t.get(d,v);if(c.get(_)!==x&&(t.update(_),c.set(_,x)),d.isInstancedMesh&&(d.hasEventListener("dispose",m)===!1&&d.addEventListener("dispose",m),c.get(d)!==x&&(i.update(d.instanceMatrix,r.ARRAY_BUFFER),d.instanceColor!==null&&i.update(d.instanceColor,r.ARRAY_BUFFER),c.set(d,x))),d.isSkinnedMesh){const E=d.skeleton;c.get(E)!==x&&(E.update(),c.set(E,x))}return _}function p(){c=new WeakMap}function m(d){const x=d.target;x.removeEventListener("dispose",m),s.releaseStatesOfObject(x),i.remove(x.instanceMatrix),x.instanceColor!==null&&i.remove(x.instanceColor)}return{update:h,dispose:p}}const CT={[k_]:"LINEAR_TONE_MAPPING",[X_]:"REINHARD_TONE_MAPPING",[W_]:"CINEON_TONE_MAPPING",[q_]:"ACES_FILMIC_TONE_MAPPING",[Z_]:"AGX_TONE_MAPPING",[K_]:"NEUTRAL_TONE_MAPPING",[Y_]:"CUSTOM_TONE_MAPPING"};function wT(r,t,i,s,l,c){const h=new Ai(t,i,{type:r,depthBuffer:l,stencilBuffer:c,samples:s?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let p=null,m=null;const d=new $i;d.setAttribute("position",new Ca([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new Ca([0,2,0,0,2,0],2));const x=new Sy({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),v=new ji(d,x),_=new gv(-1,1,1,-1,0,1);let E=null,R=null,N=!1,y,S=null,I=[],B=!1;this.setSize=function(D,U){h.setSize(D,U),p!==null&&p.setSize(D,U),m!==null&&m.setSize(D,U);for(let C=0;C<I.length;C++){const P=I[C];P.setSize&&P.setSize(D,U)}},this.setEffects=function(D){I=D,B=I.length>0&&I[0].isRenderPass===!0;const U=h.width,C=h.height;I.length>0&&p===null&&(p=new Ai(U,C,{type:Ii,depthBuffer:!1,stencilBuffer:!1}),m=new Ai(U,C,{type:Ii,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<I.length;P++){const b=I[P];b.setSize&&b.setSize(U,C)}},this.begin=function(D,U){if(N||D.toneMapping===Ki&&I.length===0)return!1;if(S=U,U!==null){const C=U.width,P=U.height;(h.width!==C||h.height!==P)&&this.setSize(C,P)}return B===!1&&D.setRenderTarget(h),y=D.toneMapping,D.toneMapping=Ki,!0},this.hasRenderPass=function(){return B},this.end=function(D,U){D.toneMapping=y,N=!0;let C=h,P=p;for(let b=0;b<I.length;b++){const O=I[b];O.enabled!==!1&&(O.render(D,P,C,U),O.needsSwap!==!1&&(C=P,P=P===p?m:p))}if(E!==D.outputColorSpace||R!==D.toneMapping){E=D.outputColorSpace,R=D.toneMapping,x.defines={},Ee.getTransfer(E)===Fe&&(x.defines.SRGB_TRANSFER="");const b=CT[R];b&&(x.defines[b]=""),x.needsUpdate=!0}x.uniforms.tDiffuse.value=C.texture,D.setRenderTarget(S),D.render(v,_),S=null,N=!1},this.isCompositing=function(){return N},this.dispose=function(){h.dispose(),p!==null&&p.dispose(),m!==null&&m.dispose(),d.dispose(),x.dispose()}}const Mv=new Vn,Ud=new tl(1,1),yv=new sv,Ev=new JM,bv=new dv,x_=[],S_=[],M_=new Float32Array(16),y_=new Float32Array(9),E_=new Float32Array(4);function kr(r,t,i){const s=r[0];if(s<=0||s>0)return r;const l=t*i;let c=x_[l];if(c===void 0&&(c=new Float32Array(l),x_[l]=c),t!==0){s.toArray(c,0);for(let h=1,p=0;h!==t;++h)p+=i,r[h].toArray(c,p)}return c}function Mn(r,t){if(r.length!==t.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==t[i])return!1;return!0}function yn(r,t){for(let i=0,s=t.length;i<s;i++)r[i]=t[i]}function tu(r,t){let i=S_[t];i===void 0&&(i=new Int32Array(t),S_[t]=i);for(let s=0;s!==t;++s)i[s]=r.allocateTextureUnit();return i}function DT(r,t){const i=this.cache;i[0]!==t&&(r.uniform1f(this.addr,t),i[0]=t)}function UT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Mn(i,t))return;r.uniform2fv(this.addr,t),yn(i,t)}}function NT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(Mn(i,t))return;r.uniform3fv(this.addr,t),yn(i,t)}}function LT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Mn(i,t))return;r.uniform4fv(this.addr,t),yn(i,t)}}function OT(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(Mn(i,t))return;r.uniformMatrix2fv(this.addr,!1,t),yn(i,t)}else{if(Mn(i,s))return;E_.set(s),r.uniformMatrix2fv(this.addr,!1,E_),yn(i,s)}}function PT(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(Mn(i,t))return;r.uniformMatrix3fv(this.addr,!1,t),yn(i,t)}else{if(Mn(i,s))return;y_.set(s),r.uniformMatrix3fv(this.addr,!1,y_),yn(i,s)}}function IT(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(Mn(i,t))return;r.uniformMatrix4fv(this.addr,!1,t),yn(i,t)}else{if(Mn(i,s))return;M_.set(s),r.uniformMatrix4fv(this.addr,!1,M_),yn(i,s)}}function FT(r,t){const i=this.cache;i[0]!==t&&(r.uniform1i(this.addr,t),i[0]=t)}function zT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Mn(i,t))return;r.uniform2iv(this.addr,t),yn(i,t)}}function BT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Mn(i,t))return;r.uniform3iv(this.addr,t),yn(i,t)}}function HT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Mn(i,t))return;r.uniform4iv(this.addr,t),yn(i,t)}}function GT(r,t){const i=this.cache;i[0]!==t&&(r.uniform1ui(this.addr,t),i[0]=t)}function VT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Mn(i,t))return;r.uniform2uiv(this.addr,t),yn(i,t)}}function kT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Mn(i,t))return;r.uniform3uiv(this.addr,t),yn(i,t)}}function XT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Mn(i,t))return;r.uniform4uiv(this.addr,t),yn(i,t)}}function WT(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(Ud.compareFunction=i.isReversedDepthBuffer()?Xd:kd,c=Ud):c=Mv,i.setTexture2D(t||c,l)}function qT(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(t||Ev,l)}function YT(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(t||bv,l)}function ZT(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(t||yv,l)}function KT(r){switch(r){case 5126:return DT;case 35664:return UT;case 35665:return NT;case 35666:return LT;case 35674:return OT;case 35675:return PT;case 35676:return IT;case 5124:case 35670:return FT;case 35667:case 35671:return zT;case 35668:case 35672:return BT;case 35669:case 35673:return HT;case 5125:return GT;case 36294:return VT;case 36295:return kT;case 36296:return XT;case 35678:case 36198:case 36298:case 36306:case 35682:return WT;case 35679:case 36299:case 36307:return qT;case 35680:case 36300:case 36308:case 36293:return YT;case 36289:case 36303:case 36311:case 36292:return ZT}}function QT(r,t){r.uniform1fv(this.addr,t)}function JT(r,t){const i=kr(t,this.size,2);r.uniform2fv(this.addr,i)}function jT(r,t){const i=kr(t,this.size,3);r.uniform3fv(this.addr,i)}function $T(r,t){const i=kr(t,this.size,4);r.uniform4fv(this.addr,i)}function t1(r,t){const i=kr(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function e1(r,t){const i=kr(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function n1(r,t){const i=kr(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function i1(r,t){r.uniform1iv(this.addr,t)}function a1(r,t){r.uniform2iv(this.addr,t)}function s1(r,t){r.uniform3iv(this.addr,t)}function r1(r,t){r.uniform4iv(this.addr,t)}function o1(r,t){r.uniform1uiv(this.addr,t)}function l1(r,t){r.uniform2uiv(this.addr,t)}function c1(r,t){r.uniform3uiv(this.addr,t)}function u1(r,t){r.uniform4uiv(this.addr,t)}function f1(r,t,i){const s=this.cache,l=t.length,c=tu(i,l);Mn(s,c)||(r.uniform1iv(this.addr,c),yn(s,c));let h;this.type===r.SAMPLER_2D_SHADOW?h=Ud:h=Mv;for(let p=0;p!==l;++p)i.setTexture2D(t[p]||h,c[p])}function h1(r,t,i){const s=this.cache,l=t.length,c=tu(i,l);Mn(s,c)||(r.uniform1iv(this.addr,c),yn(s,c));for(let h=0;h!==l;++h)i.setTexture3D(t[h]||Ev,c[h])}function d1(r,t,i){const s=this.cache,l=t.length,c=tu(i,l);Mn(s,c)||(r.uniform1iv(this.addr,c),yn(s,c));for(let h=0;h!==l;++h)i.setTextureCube(t[h]||bv,c[h])}function p1(r,t,i){const s=this.cache,l=t.length,c=tu(i,l);Mn(s,c)||(r.uniform1iv(this.addr,c),yn(s,c));for(let h=0;h!==l;++h)i.setTexture2DArray(t[h]||yv,c[h])}function m1(r){switch(r){case 5126:return QT;case 35664:return JT;case 35665:return jT;case 35666:return $T;case 35674:return t1;case 35675:return e1;case 35676:return n1;case 5124:case 35670:return i1;case 35667:case 35671:return a1;case 35668:case 35672:return s1;case 35669:case 35673:return r1;case 5125:return o1;case 36294:return l1;case 36295:return c1;case 36296:return u1;case 35678:case 36198:case 36298:case 36306:case 35682:return f1;case 35679:case 36299:case 36307:return h1;case 35680:case 36300:case 36308:case 36293:return d1;case 36289:case 36303:case 36311:case 36292:return p1}}class g1{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.setValue=KT(i.type)}}class _1{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=m1(i.type)}}class v1{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,s){const l=this.seq;for(let c=0,h=l.length;c!==h;++c){const p=l[c];p.setValue(t,i[p.id],s)}}}const Hh=/(\w+)(\])?(\[|\.)?/g;function b_(r,t){r.seq.push(t),r.map[t.id]=t}function x1(r,t,i){const s=r.name,l=s.length;for(Hh.lastIndex=0;;){const c=Hh.exec(s),h=Hh.lastIndex;let p=c[1];const m=c[2]==="]",d=c[3];if(m&&(p=p|0),d===void 0||d==="["&&h+2===l){b_(i,d===void 0?new g1(p,r,t):new _1(p,r,t));break}else{let v=i.map[p];v===void 0&&(v=new v1(p),b_(i,v)),i=v}}}class kc{constructor(t,i){this.seq=[],this.map={};const s=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let h=0;h<s;++h){const p=t.getActiveUniform(i,h),m=t.getUniformLocation(i,p.name);x1(p,m,this)}const l=[],c=[];for(const h of this.seq)h.type===t.SAMPLER_2D_SHADOW||h.type===t.SAMPLER_CUBE_SHADOW||h.type===t.SAMPLER_2D_ARRAY_SHADOW?l.push(h):c.push(h);l.length>0&&(this.seq=l.concat(c))}setValue(t,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(t,s,l)}setOptional(t,i,s){const l=i[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,i,s,l){for(let c=0,h=i.length;c!==h;++c){const p=i[c],m=s[p.id];m.needsUpdate!==!1&&p.setValue(t,m.value,l)}}static seqWithValue(t,i){const s=[];for(let l=0,c=t.length;l!==c;++l){const h=t[l];h.id in i&&s.push(h)}return s}}function T_(r,t,i){const s=r.createShader(t);return r.shaderSource(s,i),r.compileShader(s),s}const S1=37297;let M1=0;function y1(r,t){const i=r.split(`
`),s=[],l=Math.max(t-6,0),c=Math.min(t+6,i.length);for(let h=l;h<c;h++){const p=h+1;s.push(`${p===t?">":" "} ${p}: ${i[h]}`)}return s.join(`
`)}const A_=new re;function E1(r){Ee._getMatrix(A_,Ee.workingColorSpace,r);const t=`mat3( ${A_.elements.map(i=>i.toFixed(4))} )`;switch(Ee.getTransfer(r)){case Yc:return[t,"LinearTransferOETF"];case Fe:return[t,"sRGBTransferOETF"];default:return ne("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function R_(r,t,i){const s=r.getShaderParameter(t,r.COMPILE_STATUS),c=(r.getShaderInfoLog(t)||"").trim();if(s&&c==="")return"";const h=/ERROR: 0:(\d+)/.exec(c);if(h){const p=parseInt(h[1]);return i.toUpperCase()+`

`+c+`

`+y1(r.getShaderSource(t),p)}else return c}function b1(r,t){const i=E1(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const T1={[k_]:"Linear",[X_]:"Reinhard",[W_]:"Cineon",[q_]:"ACESFilmic",[Z_]:"AgX",[K_]:"Neutral",[Y_]:"Custom"};function A1(r,t){const i=T1[t];return i===void 0?(ne("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Ic=new et;function R1(){Ee.getLuminanceCoefficients(Ic);const r=Ic.x.toFixed(4),t=Ic.y.toFixed(4),i=Ic.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function C1(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qo).join(`
`)}function w1(r){const t=[];for(const i in r){const s=r[i];s!==!1&&t.push("#define "+i+" "+s)}return t.join(`
`)}function D1(r,t){const i={},s=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(t,l),h=c.name;let p=1;c.type===r.FLOAT_MAT2&&(p=2),c.type===r.FLOAT_MAT3&&(p=3),c.type===r.FLOAT_MAT4&&(p=4),i[h]={type:c.type,location:r.getAttribLocation(t,h),locationSize:p}}return i}function qo(r){return r!==""}function C_(r,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function w_(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const U1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nd(r){return r.replace(U1,L1)}const N1=new Map;function L1(r,t){let i=de[t];if(i===void 0){const s=N1.get(t);if(s!==void 0)i=de[s],ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Nd(i)}const O1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function D_(r){return r.replace(O1,P1)}function P1(r,t,i,s){let l="";for(let c=parseInt(t);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function U_(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const I1={[zc]:"SHADOWMAP_TYPE_PCF",[Wo]:"SHADOWMAP_TYPE_VSM"};function F1(r){return I1[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const z1={[zs]:"ENVMAP_TYPE_CUBE",[Hr]:"ENVMAP_TYPE_CUBE",[Qc]:"ENVMAP_TYPE_CUBE_UV"};function B1(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":z1[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const H1={[Hr]:"ENVMAP_MODE_REFRACTION"};function G1(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":H1[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const V1={[V_]:"ENVMAP_BLENDING_MULTIPLY",[dM]:"ENVMAP_BLENDING_MIX",[pM]:"ENVMAP_BLENDING_ADD"};function k1(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":V1[r.combine]||"ENVMAP_BLENDING_NONE"}function X1(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function W1(r,t,i,s){const l=r.getContext(),c=i.defines;let h=i.vertexShader,p=i.fragmentShader;const m=F1(i),d=B1(i),x=G1(i),v=k1(i),_=X1(i),E=C1(i),R=w1(c),N=l.createProgram();let y,S,I=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R].filter(qo).join(`
`),y.length>0&&(y+=`
`),S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R].filter(qo).join(`
`),S.length>0&&(S+=`
`)):(y=[U_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+x:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qo).join(`
`),S=[U_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+d:"",i.envMap?"#define "+x:"",i.envMap?"#define "+v:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.retroreflection?"#define USE_RETROREFLECTION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Ki?"#define TONE_MAPPING":"",i.toneMapping!==Ki?de.tonemapping_pars_fragment:"",i.toneMapping!==Ki?A1("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",de.colorspace_pars_fragment,b1("linearToOutputTexel",i.outputColorSpace),R1(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(qo).join(`
`)),h=Nd(h),h=C_(h,i),h=w_(h,i),p=Nd(p),p=C_(p,i),p=w_(p,i),h=D_(h),p=D_(p),i.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,y=[E,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,S=["#define varying in",i.glslVersion===W0?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===W0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const B=I+y+h,D=I+S+p,U=T_(l,l.VERTEX_SHADER,B),C=T_(l,l.FRAGMENT_SHADER,D);l.attachShader(N,U),l.attachShader(N,C),i.index0AttributeName!==void 0?l.bindAttribLocation(N,0,i.index0AttributeName):i.hasPositionAttribute===!0&&l.bindAttribLocation(N,0,"position"),l.linkProgram(N);function P(q){if(r.debug.checkShaderErrors){const Q=l.getProgramInfoLog(N)||"",lt=l.getShaderInfoLog(U)||"",Y=l.getShaderInfoLog(C)||"",j=Q.trim(),F=lt.trim(),H=Y.trim();let ct=!0,st=!0;if(l.getProgramParameter(N,l.LINK_STATUS)===!1)if(ct=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,N,U,C);else{const ht=R_(l,U,"vertex"),w=R_(l,C,"fragment");Ce("WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(N,l.VALIDATE_STATUS)+`

Material Name: `+q.name+`
Material Type: `+q.type+`

Program Info Log: `+j+`
`+ht+`
`+w)}else j!==""?ne("WebGLProgram: Program Info Log:",j):(F===""||H==="")&&(st=!1);st&&(q.diagnostics={runnable:ct,programLog:j,vertexShader:{log:F,prefix:y},fragmentShader:{log:H,prefix:S}})}l.deleteShader(U),l.deleteShader(C),b=new kc(l,N),O=D1(l,N)}let b;this.getUniforms=function(){return b===void 0&&P(this),b};let O;this.getAttributes=function(){return O===void 0&&P(this),O};let W=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return W===!1&&(W=l.getProgramParameter(N,S1)),W},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(N),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=M1++,this.cacheKey=t,this.usedTimes=1,this.program=N,this.vertexShader=U,this.fragmentShader=C,this}let q1=0;class Y1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,i,s){const l=this._getShaderCacheForMaterial(t);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(s)===!1&&(l.add(s),s.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let s=i.get(t);return s===void 0&&(s=new Set,i.set(t,s)),s}_getShaderStage(t){const i=this.shaderCache;let s=i.get(t);return s===void 0&&(s=new Z1(t),i.set(t,s)),s}}class Z1{constructor(t){this.id=q1++,this.code=t,this.usedTimes=0}}function K1(r){return r===Bs||r===Xc||r===Wc}function Q1(r,t,i,s,l,c){const h=new rv,p=new Y1,m=new Set,d=[],x=new Map,v=s.logarithmicDepthBuffer;let _=s.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function R(b){return m.add(b),b===0?"uv":`uv${b}`}function N(b,O,W,q,Q,lt){const Y=q.fog,j=Q.geometry,F=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?q.environment:null,H=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,ct=t.get(b.envMap||F,H),st=ct&&ct.mapping===Qc?ct.image.height:null,ht=E[b.type];b.precision!==null&&(_=s.getMaxPrecision(b.precision),_!==b.precision&&ne("WebGLProgram.getParameters:",b.precision,"not supported, using",_,"instead."));const w=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,J=w!==void 0?w.length:0;let gt=0;j.morphAttributes.position!==void 0&&(gt=1),j.morphAttributes.normal!==void 0&&(gt=2),j.morphAttributes.color!==void 0&&(gt=3);let Et,Nt,Xt,it;if(ht){const Be=qi[ht];Et=Be.vertexShader,Nt=Be.fragmentShader}else{Et=b.vertexShader,Nt=b.fragmentShader;const Be=p.getVertexShaderStage(b),be=p.getFragmentShaderStage(b);p.update(b,Be,be),Xt=Be.id,it=be.id}const _t=r.getRenderTarget(),Tt=r.state.buffers.depth.getReversed(),te=Q.isInstancedMesh===!0,Bt=Q.isBatchedMesh===!0,le=!!b.map,$e=!!b.matcap,ae=!!ct,xe=!!b.aoMap,Ne=!!b.lightMap,me=!!b.bumpMap&&b.wireframe===!1,Xe=!!b.normalMap,tn=!!b.displacementMap,En=!!b.emissiveMap,We=!!b.metalnessMap,en=!!b.roughnessMap,X=b.anisotropy>0,Le=b.clearcoat>0,we=b.dispersion>0,L=b.retroreflectivity>0,M=b.iridescence>0,K=b.sheen>0,rt=b.transmission>0,dt=X&&!!b.anisotropyMap,bt=Le&&!!b.clearcoatMap,wt=Le&&!!b.clearcoatNormalMap,pt=Le&&!!b.clearcoatRoughnessMap,mt=M&&!!b.iridescenceMap,At=M&&!!b.iridescenceThicknessMap,Ht=K&&!!b.sheenColorMap,Lt=K&&!!b.sheenRoughnessMap,Dt=!!b.specularMap,Qt=!!b.specularColorMap,Jt=!!b.specularIntensityMap,ee=rt&&!!b.transmissionMap,k=rt&&!!b.thicknessMap,Rt=!!b.gradientMap,xt=!!b.alphaMap,Ct=b.alphaTest>0,It=!!b.alphaHash,yt=!!b.extensions;let Kt=Ki;b.toneMapped&&(_t===null||_t.isXRRenderTarget===!0)&&(Kt=r.toneMapping);const Wt={shaderID:ht,shaderType:b.type,shaderName:b.name,vertexShader:Et,fragmentShader:Nt,defines:b.defines,customVertexShaderID:Xt,customFragmentShaderID:it,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:_,batching:Bt,batchingColor:Bt&&Q._colorsTexture!==null,instancing:te,instancingColor:te&&Q.instanceColor!==null,instancingMorph:te&&Q.morphTexture!==null,outputColorSpace:_t===null?r.outputColorSpace:_t.isXRRenderTarget===!0?_t.texture.colorSpace:Ee.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:le,matcap:$e,envMap:ae,envMapMode:ae&&ct.mapping,envMapCubeUVHeight:st,aoMap:xe,lightMap:Ne,bumpMap:me,normalMap:Xe,displacementMap:tn,emissiveMap:En,normalMapObjectSpace:Xe&&b.normalMapType===_M,normalMapTangentSpace:Xe&&b.normalMapType===X0,packedNormalMap:Xe&&b.normalMapType===X0&&K1(b.normalMap.format),metalnessMap:We,roughnessMap:en,anisotropy:X,anisotropyMap:dt,clearcoat:Le,clearcoatMap:bt,clearcoatNormalMap:wt,clearcoatRoughnessMap:pt,dispersion:we,retroreflection:L,iridescence:M,iridescenceMap:mt,iridescenceThicknessMap:At,sheen:K,sheenColorMap:Ht,sheenRoughnessMap:Lt,specularMap:Dt,specularColorMap:Qt,specularIntensityMap:Jt,transmission:rt,transmissionMap:ee,thicknessMap:k,gradientMap:Rt,opaque:b.transparent===!1&&b.blending===Yo&&b.alphaToCoverage===!1,alphaMap:xt,alphaTest:Ct,alphaHash:It,combine:b.combine,mapUv:le&&R(b.map.channel),aoMapUv:xe&&R(b.aoMap.channel),lightMapUv:Ne&&R(b.lightMap.channel),bumpMapUv:me&&R(b.bumpMap.channel),normalMapUv:Xe&&R(b.normalMap.channel),displacementMapUv:tn&&R(b.displacementMap.channel),emissiveMapUv:En&&R(b.emissiveMap.channel),metalnessMapUv:We&&R(b.metalnessMap.channel),roughnessMapUv:en&&R(b.roughnessMap.channel),anisotropyMapUv:dt&&R(b.anisotropyMap.channel),clearcoatMapUv:bt&&R(b.clearcoatMap.channel),clearcoatNormalMapUv:wt&&R(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pt&&R(b.clearcoatRoughnessMap.channel),iridescenceMapUv:mt&&R(b.iridescenceMap.channel),iridescenceThicknessMapUv:At&&R(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ht&&R(b.sheenColorMap.channel),sheenRoughnessMapUv:Lt&&R(b.sheenRoughnessMap.channel),specularMapUv:Dt&&R(b.specularMap.channel),specularColorMapUv:Qt&&R(b.specularColorMap.channel),specularIntensityMapUv:Jt&&R(b.specularIntensityMap.channel),transmissionMapUv:ee&&R(b.transmissionMap.channel),thicknessMapUv:k&&R(b.thicknessMap.channel),alphaMapUv:xt&&R(b.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Xe||X),vertexNormals:!!j.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:Q.isPoints===!0&&!!j.attributes.uv&&(le||xt),fog:!!Y,useFog:b.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||j.attributes.normal===void 0&&Xe===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:v,reversedDepthBuffer:Tt,skinning:Q.isSkinnedMesh===!0,hasPositionAttribute:j.attributes.position!==void 0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:gt,numSunLights:O.sun.length,numDirLights:O.directional.length,numPointLights:O.point.length,numSpotLights:O.spot.length,numSpotLightMaps:O.spotLightMap.length,numRectAreaLights:O.rectArea.length,numHemiLights:O.hemi.length,numSunLightShadows:O.sunShadowMap.length,numDirLightShadows:O.directionalShadowMap.length,numPointLightShadows:O.pointShadowMap.length,numSpotLightShadows:O.spotShadowMap.length,numSpotLightShadowsWithMaps:O.numSpotLightShadowsWithMaps,numLightProbes:O.numLightProbes,numLightProbeGrids:lt.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&W.length>0,shadowMapType:r.shadowMap.type,toneMapping:Kt,decodeVideoTexture:le&&b.map.isVideoTexture===!0&&Ee.getTransfer(b.map.colorSpace)===Fe,decodeVideoTextureEmissive:En&&b.emissiveMap.isVideoTexture===!0&&Ee.getTransfer(b.emissiveMap.colorSpace)===Fe,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===ba,flipSided:b.side===jn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:yt&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(yt&&b.extensions.multiDraw===!0||Bt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Wt.vertexUv1s=m.has(1),Wt.vertexUv2s=m.has(2),Wt.vertexUv3s=m.has(3),m.clear(),Wt}function y(b){const O=[];if(b.shaderID?O.push(b.shaderID):(O.push(b.customVertexShaderID),O.push(b.customFragmentShaderID)),b.defines!==void 0)for(const W in b.defines)O.push(W),O.push(b.defines[W]);return b.isRawShaderMaterial===!1&&(S(O,b),I(O,b),O.push(r.outputColorSpace)),O.push(b.customProgramCacheKey),O.join()}function S(b,O){b.push(O.precision),b.push(O.outputColorSpace),b.push(O.envMapMode),b.push(O.envMapCubeUVHeight),b.push(O.mapUv),b.push(O.alphaMapUv),b.push(O.lightMapUv),b.push(O.aoMapUv),b.push(O.bumpMapUv),b.push(O.normalMapUv),b.push(O.displacementMapUv),b.push(O.emissiveMapUv),b.push(O.metalnessMapUv),b.push(O.roughnessMapUv),b.push(O.anisotropyMapUv),b.push(O.clearcoatMapUv),b.push(O.clearcoatNormalMapUv),b.push(O.clearcoatRoughnessMapUv),b.push(O.iridescenceMapUv),b.push(O.iridescenceThicknessMapUv),b.push(O.sheenColorMapUv),b.push(O.sheenRoughnessMapUv),b.push(O.specularMapUv),b.push(O.specularColorMapUv),b.push(O.specularIntensityMapUv),b.push(O.transmissionMapUv),b.push(O.thicknessMapUv),b.push(O.combine),b.push(O.fogExp2),b.push(O.sizeAttenuation),b.push(O.morphTargetsCount),b.push(O.morphAttributeCount),b.push(O.numSunLights),b.push(O.numDirLights),b.push(O.numPointLights),b.push(O.numSpotLights),b.push(O.numSpotLightMaps),b.push(O.numHemiLights),b.push(O.numRectAreaLights),b.push(O.numSunLightShadows),b.push(O.numDirLightShadows),b.push(O.numPointLightShadows),b.push(O.numSpotLightShadows),b.push(O.numSpotLightShadowsWithMaps),b.push(O.numLightProbes),b.push(O.shadowMapType),b.push(O.toneMapping),b.push(O.numClippingPlanes),b.push(O.numClipIntersection),b.push(O.depthPacking)}function I(b,O){h.disableAll(),O.instancing&&h.enable(0),O.instancingColor&&h.enable(1),O.instancingMorph&&h.enable(2),O.matcap&&h.enable(3),O.envMap&&h.enable(4),O.normalMapObjectSpace&&h.enable(5),O.normalMapTangentSpace&&h.enable(6),O.clearcoat&&h.enable(7),O.iridescence&&h.enable(8),O.alphaTest&&h.enable(9),O.vertexColors&&h.enable(10),O.vertexAlphas&&h.enable(11),O.vertexUv1s&&h.enable(12),O.vertexUv2s&&h.enable(13),O.vertexUv3s&&h.enable(14),O.vertexTangents&&h.enable(15),O.anisotropy&&h.enable(16),O.alphaHash&&h.enable(17),O.batching&&h.enable(18),O.dispersion&&h.enable(19),O.retroreflection&&h.enable(24),O.batchingColor&&h.enable(20),O.gradientMap&&h.enable(21),O.packedNormalMap&&h.enable(22),O.vertexNormals&&h.enable(23),b.push(h.mask),h.disableAll(),O.fog&&h.enable(0),O.useFog&&h.enable(1),O.flatShading&&h.enable(2),O.logarithmicDepthBuffer&&h.enable(3),O.reversedDepthBuffer&&h.enable(4),O.skinning&&h.enable(5),O.morphTargets&&h.enable(6),O.morphNormals&&h.enable(7),O.morphColors&&h.enable(8),O.premultipliedAlpha&&h.enable(9),O.shadowMapEnabled&&h.enable(10),O.doubleSided&&h.enable(11),O.flipSided&&h.enable(12),O.useDepthPacking&&h.enable(13),O.dithering&&h.enable(14),O.transmission&&h.enable(15),O.sheen&&h.enable(16),O.opaque&&h.enable(17),O.pointsUvs&&h.enable(18),O.decodeVideoTexture&&h.enable(19),O.decodeVideoTextureEmissive&&h.enable(20),O.alphaToCoverage&&h.enable(21),O.numLightProbeGrids>0&&h.enable(22),O.hasPositionAttribute&&h.enable(23),b.push(h.mask)}function B(b){const O=E[b.type];let W;if(O){const q=qi[O];W=_y.clone(q.uniforms)}else W=b.uniforms;return W}function D(b,O){let W=x.get(O);return W!==void 0?++W.usedTimes:(W=new W1(r,O,b,l),d.push(W),x.set(O,W)),W}function U(b){if(--b.usedTimes===0){const O=d.indexOf(b);d[O]=d[d.length-1],d.pop(),x.delete(b.cacheKey),b.destroy()}}function C(b){p.remove(b)}function P(){p.dispose()}return{getParameters:N,getProgramCacheKey:y,getUniforms:B,acquireProgram:D,releaseProgram:U,releaseShaderCache:C,programs:d,dispose:P}}function J1(){let r=new WeakMap;function t(h){return r.has(h)}function i(h){let p=r.get(h);return p===void 0&&(p={},r.set(h,p)),p}function s(h){r.delete(h)}function l(h,p,m){r.get(h)[p]=m}function c(){r=new WeakMap}return{has:t,get:i,remove:s,update:l,dispose:c}}function j1(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function N_(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function L_(){const r=[];let t=0;const i=[],s=[],l=[];function c(){t=0,i.length=0,s.length=0,l.length=0}function h(_){let E=0;return _.isInstancedMesh&&(E+=2),_.isSkinnedMesh&&(E+=1),E}function p(_,E,R,N,y,S){let I=r[t];return I===void 0?(I={id:_.id,object:_,geometry:E,material:R,materialVariant:h(_),groupOrder:N,renderOrder:_.renderOrder,z:y,group:S},r[t]=I):(I.id=_.id,I.object=_,I.geometry=E,I.material=R,I.materialVariant=h(_),I.groupOrder=N,I.renderOrder=_.renderOrder,I.z=y,I.group=S),t++,I}function m(_,E,R,N,y,S,I){I.reversedDepth===!0&&(y=-y);const B=p(_,E,R,N,y,S);R.transmission>0?s.push(B):R.transparent===!0?l.push(B):i.push(B)}function d(_,E,R,N,y,S){const I=p(_,E,R,N,y,S);R.transmission>0?s.unshift(I):R.transparent===!0?l.unshift(I):i.unshift(I)}function x(_,E){i.length>1&&i.sort(_||j1),s.length>1&&s.sort(E||N_),l.length>1&&l.sort(E||N_)}function v(){for(let _=t,E=r.length;_<E;_++){const R=r[_];if(R.id===null)break;R.id=null,R.object=null,R.geometry=null,R.material=null,R.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:m,unshift:d,finish:v,sort:x}}function $1(){let r=new WeakMap;function t(s,l){const c=r.get(s);let h;return c===void 0?(h=new L_,r.set(s,[h])):l>=c.length?(h=new L_,c.push(h)):h=c[l],h}function i(){r=new WeakMap}return{get:t,dispose:i}}function tA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"SunLight":case"DirectionalLight":i={direction:new et,color:new Oe};break;case"SpotLight":i={position:new et,direction:new et,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new et,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":i={direction:new et,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":i={color:new Oe,position:new et,halfWidth:new et,halfHeight:new et};break}return r[t.id]=i,i}}}function eA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"SunLight":case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=i,i}}}let nA=0;function iA(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function aA(r){const t=new tA,i=eA(),s={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)s.probe.push(new et);const l=new et,c=new cn,h=new cn;function p(d){let x=0,v=0,_=0;for(let Q=0;Q<9;Q++)s.probe[Q].set(0,0,0);let E=0,R=0,N=0,y=0,S=0,I=0,B=0,D=0,U=0,C=0,P=0,b=0,O=0,W=0;d.sort(iA);for(let Q=0,lt=d.length;Q<lt;Q++){const Y=d[Q],j=Y.color,F=Y.intensity,H=Y.distance;let ct=null;if(Y.shadow&&Y.shadow.map&&(Y.shadow.map.texture.format===Bs?ct=Y.shadow.map.texture:ct=Y.shadow.map.depthTexture||Y.shadow.map.texture),Y.isAmbientLight)x+=j.r*F,v+=j.g*F,_+=j.b*F;else if(Y.isLightProbe){for(let st=0;st<9;st++)s.probe[st].addScaledVector(Y.sh.coefficients[st],F);W++}else if(Y.isSunLight){const st=t.get(Y);if(st.color.copy(Y.color).multiplyScalar(Y.intensity),Y.castShadow){const ht=Y.shadow,w=i.get(Y);w.shadowIntensity=ht.intensity,w.shadowBias=ht.bias,w.shadowNormalBias=ht.normalBias,w.shadowRadius=ht.radius,w.shadowMapSize.copy(ht.mapSize).multiply(ht.getFrameExtents()),s.sunShadow[R]=w,s.sunShadowMap[R]=ct;const J=ht.getViewportCount();for(let gt=0;gt<J;gt++)s.sunShadowMatrix[N+gt]=ht.getMatrix(gt),s.sunShadowCascade[N+gt]=ht._cascadeData[gt];N+=J,R++}s.sun[E]=st,E++}else if(Y.isDirectionalLight){const st=t.get(Y);if(st.color.copy(Y.color).multiplyScalar(Y.intensity),Y.castShadow){const ht=Y.shadow,w=i.get(Y);w.shadowIntensity=ht.intensity,w.shadowBias=ht.bias,w.shadowNormalBias=ht.normalBias,w.shadowRadius=ht.radius,w.shadowMapSize=ht.mapSize,s.directionalShadow[y]=w,s.directionalShadowMap[y]=ct,s.directionalShadowMatrix[y]=Y.shadow.matrix,U++}s.directional[y]=st,y++}else if(Y.isSpotLight){const st=t.get(Y);st.position.setFromMatrixPosition(Y.matrixWorld),st.color.copy(j).multiplyScalar(F),st.distance=H,st.coneCos=Math.cos(Y.angle),st.penumbraCos=Math.cos(Y.angle*(1-Y.penumbra)),st.decay=Y.decay,s.spot[I]=st;const ht=Y.shadow;if(Y.map&&(s.spotLightMap[b]=Y.map,b++,ht.updateMatrices(Y),Y.castShadow&&O++),s.spotLightMatrix[I]=ht.matrix,Y.castShadow){const w=i.get(Y);w.shadowIntensity=ht.intensity,w.shadowBias=ht.bias,w.shadowNormalBias=ht.normalBias,w.shadowRadius=ht.radius,w.shadowMapSize=ht.mapSize,s.spotShadow[I]=w,s.spotShadowMap[I]=ct,P++}I++}else if(Y.isRectAreaLight){const st=t.get(Y);st.color.copy(j).multiplyScalar(F),st.halfWidth.set(Y.width*.5,0,0),st.halfHeight.set(0,Y.height*.5,0),s.rectArea[B]=st,B++}else if(Y.isPointLight){const st=t.get(Y);if(st.color.copy(Y.color).multiplyScalar(Y.intensity),st.distance=Y.distance,st.decay=Y.decay,Y.castShadow){const ht=Y.shadow,w=i.get(Y);w.shadowIntensity=ht.intensity,w.shadowBias=ht.bias,w.shadowNormalBias=ht.normalBias,w.shadowRadius=ht.radius,w.shadowMapSize=ht.mapSize,w.shadowCameraNear=ht.camera.near,w.shadowCameraFar=ht.camera.far,s.pointShadow[S]=w,s.pointShadowMap[S]=ct,s.pointShadowMatrix[S]=Y.shadow.matrix,C++}s.point[S]=st,S++}else if(Y.isHemisphereLight){const st=t.get(Y);st.skyColor.copy(Y.color).multiplyScalar(F),st.groundColor.copy(Y.groundColor).multiplyScalar(F),s.hemi[D]=st,D++}}B>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Pt.LTC_FLOAT_1,s.rectAreaLTC2=Pt.LTC_FLOAT_2):(s.rectAreaLTC1=Pt.LTC_HALF_1,s.rectAreaLTC2=Pt.LTC_HALF_2)),s.ambient[0]=x,s.ambient[1]=v,s.ambient[2]=_;const q=s.hash;(q.sunLength!==E||q.directionalLength!==y||q.pointLength!==S||q.spotLength!==I||q.rectAreaLength!==B||q.hemiLength!==D||q.numSunShadows!==R||q.numDirectionalShadows!==U||q.numPointShadows!==C||q.numSpotShadows!==P||q.numSpotMaps!==b||q.numLightProbes!==W)&&(s.sun.length=E,s.directional.length=y,s.spot.length=I,s.rectArea.length=B,s.point.length=S,s.hemi.length=D,s.sunShadow.length=R,s.sunShadowMap.length=R,s.sunShadowMatrix.length=N,s.sunShadowCascade.length=N,s.directionalShadow.length=U,s.directionalShadowMap.length=U,s.directionalShadowMatrix.length=U,s.pointShadow.length=C,s.pointShadowMap.length=C,s.pointShadowMatrix.length=C,s.spotShadow.length=P,s.spotShadowMap.length=P,s.spotLightMatrix.length=P+b-O,s.spotLightMap.length=b,s.numSpotLightShadowsWithMaps=O,s.numLightProbes=W,q.sunLength=E,q.directionalLength=y,q.pointLength=S,q.spotLength=I,q.rectAreaLength=B,q.hemiLength=D,q.numSunShadows=R,q.numDirectionalShadows=U,q.numPointShadows=C,q.numSpotShadows=P,q.numSpotMaps=b,q.numLightProbes=W,s.version=nA++)}function m(d,x){let v=0,_=0,E=0,R=0,N=0,y=0;const S=x.matrixWorldInverse;for(let I=0,B=d.length;I<B;I++){const D=d[I];if(D.isSunLight){const U=s.sun[v];U.direction.setFromMatrixPosition(D.matrixWorld),U.direction.transformDirection(S),v++}else if(D.isDirectionalLight){const U=s.directional[_];U.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(S),_++}else if(D.isSpotLight){const U=s.spot[R];U.position.setFromMatrixPosition(D.matrixWorld),U.position.applyMatrix4(S),U.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(S),R++}else if(D.isRectAreaLight){const U=s.rectArea[N];U.position.setFromMatrixPosition(D.matrixWorld),U.position.applyMatrix4(S),h.identity(),c.copy(D.matrixWorld),c.premultiply(S),h.extractRotation(c),U.halfWidth.set(D.width*.5,0,0),U.halfHeight.set(0,D.height*.5,0),U.halfWidth.applyMatrix4(h),U.halfHeight.applyMatrix4(h),N++}else if(D.isPointLight){const U=s.point[E];U.position.setFromMatrixPosition(D.matrixWorld),U.position.applyMatrix4(S),E++}else if(D.isHemisphereLight){const U=s.hemi[y];U.direction.setFromMatrixPosition(D.matrixWorld),U.direction.transformDirection(S),y++}}}return{setup:p,setupView:m,state:s}}function O_(r){const t=new aA(r),i=[],s=[],l=[];function c(_){v.camera=_,i.length=0,s.length=0,l.length=0}function h(_){i.push(_)}function p(_){s.push(_)}function m(_){l.push(_)}function d(){t.setup(i)}function x(_){t.setupView(i,_)}const v={lightsArray:i,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:v,setupLights:d,setupLightsView:x,pushLight:h,pushShadow:p,pushLightProbeGrid:m}}function sA(r){let t=new WeakMap;function i(l,c=0){const h=t.get(l);let p;return h===void 0?(p=new O_(r),t.set(l,[p])):c>=h.length?(p=new O_(r),h.push(p)):p=h[c],p}function s(){t=new WeakMap}return{get:i,dispose:s}}const rA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,oA=`uniform sampler2D shadow_pass;
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
}`,lA=[new et(1,0,0),new et(-1,0,0),new et(0,1,0),new et(0,-1,0),new et(0,0,1),new et(0,0,-1)],cA=[new et(0,-1,0),new et(0,-1,0),new et(0,0,1),new et(0,0,-1),new et(0,-1,0),new et(0,-1,0)],P_=new cn,ko=new et,Gh=new et;function uA(r,t,i){let s=new hv;const l=new ie,c=new ie,h=new rn,p=new My,m=new yy,d={},x=i.maxTextureSize,v={[Fs]:jn,[jn]:Fs,[ba]:ba},_=new Gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ie},radius:{value:4}},vertexShader:rA,fragmentShader:oA}),E=_.clone();E.defines.HORIZONTAL_PASS=1;const R=new $i;R.setAttribute("position",new Qi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const N=new ji(R,_),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zc;let S=this.type;this.render=function(C,P,b){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||C.length===0)return;this.type===ZS&&(ne("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=zc);const O=r.getRenderTarget(),W=r.getActiveCubeFace(),q=r.getActiveMipmapLevel(),Q=r.state;Q.setBlending(Aa),Q.buffers.depth.getReversed()===!0?Q.buffers.color.setClear(0,0,0,0):Q.buffers.color.setClear(1,1,1,1),Q.buffers.depth.setTest(!0),Q.setScissorTest(!1);const lt=S!==this.type;lt&&P.traverse(function(Y){Y.material&&(Array.isArray(Y.material)?Y.material.forEach(j=>j.needsUpdate=!0):Y.material.needsUpdate=!0)});for(let Y=0,j=C.length;Y<j;Y++){const F=C[Y],H=F.shadow;if(H===void 0){ne("WebGLShadowMap:",F,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;l.copy(H.mapSize);const ct=H.getFrameExtents();l.multiply(ct),c.copy(H.mapSize),(l.x>x||l.y>x)&&(l.x>x&&(c.x=Math.floor(x/ct.x),l.x=c.x*ct.x,H.mapSize.x=c.x),l.y>x&&(c.y=Math.floor(x/ct.y),l.y=c.y*ct.y,H.mapSize.y=c.y));const st=r.state.buffers.depth.getReversed();if(H.camera._reversedDepth=st,H.map===null||lt===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===Wo){if(F.isPointLight){ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new Ai(l.x,l.y,{format:Bs,type:Ii,minFilter:An,magFilter:An,generateMipmaps:!1}),H.map.texture.name=F.name+".shadowMap",H.map.depthTexture=new tl(l.x,l.y,Yi),H.map.depthTexture.name=F.name+".shadowMapDepth",H.map.depthTexture.format=wa,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Nn,H.map.depthTexture.magFilter=Nn}else F.isPointLight?(H.map=new Sv(l.x),H.map.depthTexture=new my(l.x,Ji)):(H.map=new Ai(l.x,l.y),H.map.depthTexture=new tl(l.x,l.y,Ji)),H.map.depthTexture.name=F.name+".shadowMap",H.map.depthTexture.format=wa,this.type===zc?(H.map.depthTexture.compareFunction=st?Xd:kd,H.map.depthTexture.minFilter=An,H.map.depthTexture.magFilter=An):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Nn,H.map.depthTexture.magFilter=Nn);H.camera.updateProjectionMatrix()}H.map.isWebGLCubeRenderTarget!==!0&&(H.map.width!==l.x||H.map.height!==l.y)&&H.map.setSize(l.x,l.y);const ht=H.map.isWebGLCubeRenderTarget?6:H.getViewportCount();F.isPointLight!==!0&&H.updateMatrices(F,b);for(let w=0;w<ht;w++){const J=H.getCamera(w);if(F.isPointLight){const gt=H.camera,Et=H.matrix,Nt=F.distance||gt.far;Nt!==gt.far&&(gt.far=Nt,gt.updateProjectionMatrix()),ko.setFromMatrixPosition(F.matrixWorld),gt.position.copy(ko),Gh.copy(gt.position),Gh.add(lA[w]),gt.up.copy(cA[w]),gt.lookAt(Gh),gt.updateMatrixWorld(),Et.makeTranslation(-ko.x,-ko.y,-ko.z),P_.multiplyMatrices(gt.projectionMatrix,gt.matrixWorldInverse),H._frustum.setFromProjectionMatrix(P_,gt.coordinateSystem,gt.reversedDepth)}if(H.map.isWebGLCubeRenderTarget)r.setRenderTarget(H.map,w),r.clear();else{w===0&&(r.setRenderTarget(H.map),r.clear());const gt=H.getViewport(w);h.set(c.x*gt.x,c.y*gt.y,c.x*gt.z,c.y*gt.w),Q.viewport(h)}s=H.getFrustum(w),D(P,b,J,F,this.type)}H.isPointLightShadow!==!0&&this.type===Wo&&I(H,b),H.needsUpdate=!1}S=this.type,y.needsUpdate=!1,r.setRenderTarget(O,W,q)};function I(C,P){const b=t.update(N);_.defines.VSM_SAMPLES!==C.blurSamples&&(_.defines.VSM_SAMPLES=C.blurSamples,E.defines.VSM_SAMPLES=C.blurSamples,_.needsUpdate=!0,E.needsUpdate=!0),C.mapPass===null?C.mapPass=new Ai(l.x,l.y,{format:Bs,type:Ii}):(C.mapPass.width!==C.map.width||C.mapPass.height!==C.map.height)&&C.mapPass.setSize(C.map.width,C.map.height),_.uniforms.shadow_pass.value=C.map.depthTexture,_.uniforms.resolution.value.set(C.map.width,C.map.height),_.uniforms.radius.value=C.radius,r.setRenderTarget(C.mapPass),r.clear(),r.renderBufferDirect(P,null,b,_,N,null),E.uniforms.shadow_pass.value=C.mapPass.texture,E.uniforms.resolution.value.set(C.map.width,C.map.height),E.uniforms.radius.value=C.radius,r.setRenderTarget(C.map),r.clear(),r.renderBufferDirect(P,null,b,E,N,null)}function B(C,P,b,O){let W=null;const q=b.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(q!==void 0)W=q;else if(W=b.isPointLight===!0?m:p,r.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const Q=W.uuid,lt=P.uuid;let Y=d[Q];Y===void 0&&(Y={},d[Q]=Y);let j=Y[lt];j===void 0&&(j=W.clone(),Y[lt]=j,P.addEventListener("dispose",U)),W=j}if(W.visible=P.visible,W.wireframe=P.wireframe,O===Wo?W.side=P.shadowSide!==null?P.shadowSide:P.side:W.side=P.shadowSide!==null?P.shadowSide:v[P.side],W.alphaMap=P.alphaMap,W.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,W.map=P.map,W.clipShadows=P.clipShadows,W.clippingPlanes=P.clippingPlanes,W.clipIntersection=P.clipIntersection,W.displacementMap=P.displacementMap,W.displacementScale=P.displacementScale,W.displacementBias=P.displacementBias,W.wireframeLinewidth=P.wireframeLinewidth,W.linewidth=P.linewidth,b.isPointLight===!0&&W.isMeshDistanceMaterial===!0){const Q=r.properties.get(W);Q.light=b}return W}function D(C,P,b,O,W){if(C.visible===!1)return;if(C.layers.test(P.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&W===Wo)&&(!C.frustumCulled||C.intersectsFrustum(s))){C.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,C.matrixWorld);const lt=t.update(C),Y=C.material;if(Array.isArray(Y)){const j=lt.groups;for(let F=0,H=j.length;F<H;F++){const ct=j[F],st=Y[ct.materialIndex];if(st&&st.visible){const ht=B(C,st,O,W);C.onBeforeShadow(r,C,P,b,lt,ht,ct),r.renderBufferDirect(b,null,lt,ht,C,ct),C.onAfterShadow(r,C,P,b,lt,ht,ct)}}}else if(Y.visible){const j=B(C,Y,O,W);C.onBeforeShadow(r,C,P,b,lt,j,null),r.renderBufferDirect(b,null,lt,j,C,null),C.onAfterShadow(r,C,P,b,lt,j,null)}}const Q=C.children;for(let lt=0,Y=Q.length;lt<Y;lt++)D(Q[lt],P,b,O,W)}function U(C){C.target.removeEventListener("dispose",U);for(const b in d){const O=d[b],W=C.target.uuid;W in O&&(O[W].dispose(),delete O[W])}}}function fA(r,t){function i(){let k=!1;const Rt=new rn;let xt=null;const Ct=new rn(0,0,0,0);return{setMask:function(It){xt!==It&&!k&&(r.colorMask(It,It,It,It),xt=It)},setLocked:function(It){k=It},setClear:function(It,yt,Kt,Wt,Be){Be===!0&&(It*=Wt,yt*=Wt,Kt*=Wt),Rt.set(It,yt,Kt,Wt),Ct.equals(Rt)===!1&&(r.clearColor(It,yt,Kt,Wt),Ct.copy(Rt))},reset:function(){k=!1,xt=null,Ct.set(-1,0,0,0)}}}function s(){let k=!1,Rt=!1,xt=null,Ct=null,It=null;return{setReversed:function(yt){if(Rt!==yt){const Kt=t.get("EXT_clip_control");yt?Kt.clipControlEXT(Kt.LOWER_LEFT_EXT,Kt.ZERO_TO_ONE_EXT):Kt.clipControlEXT(Kt.LOWER_LEFT_EXT,Kt.NEGATIVE_ONE_TO_ONE_EXT),Rt=yt;const Wt=It;It=null,this.setClear(Wt)}},getReversed:function(){return Rt},setTest:function(yt){yt?_t(r.DEPTH_TEST):Tt(r.DEPTH_TEST)},setMask:function(yt){xt!==yt&&!k&&(r.depthMask(yt),xt=yt)},setFunc:function(yt){if(Rt&&(yt=wM[yt]),Ct!==yt){switch(yt){case Wh:r.depthFunc(r.NEVER);break;case qh:r.depthFunc(r.ALWAYS);break;case Yh:r.depthFunc(r.LESS);break;case Qo:r.depthFunc(r.LEQUAL);break;case Zh:r.depthFunc(r.EQUAL);break;case Kh:r.depthFunc(r.GEQUAL);break;case Qh:r.depthFunc(r.GREATER);break;case Jh:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Ct=yt}},setLocked:function(yt){k=yt},setClear:function(yt){It!==yt&&(It=yt,Rt&&(yt=1-yt),r.clearDepth(yt))},reset:function(){k=!1,xt=null,Ct=null,It=null,Rt=!1}}}function l(){let k=!1,Rt=null,xt=null,Ct=null,It=null,yt=null,Kt=null,Wt=null,Be=null;return{setTest:function(be){k||(be?_t(r.STENCIL_TEST):Tt(r.STENCIL_TEST))},setMask:function(be){Rt!==be&&!k&&(r.stencilMask(be),Rt=be)},setFunc:function(be,kn,$n){(xt!==be||Ct!==kn||It!==$n)&&(r.stencilFunc(be,kn,$n),xt=be,Ct=kn,It=$n)},setOp:function(be,kn,$n){(yt!==be||Kt!==kn||Wt!==$n)&&(r.stencilOp(be,kn,$n),yt=be,Kt=kn,Wt=$n)},setLocked:function(be){k=be},setClear:function(be){Be!==be&&(r.clearStencil(be),Be=be)},reset:function(){k=!1,Rt=null,xt=null,Ct=null,It=null,yt=null,Kt=null,Wt=null,Be=null}}}const c=new i,h=new s,p=new l,m=new WeakMap,d=new WeakMap;let x={},v={},_={},E=new WeakMap,R=[],N=null,y=!1,S=null,I=null,B=null,D=null,U=null,C=null,P=null,b=new Oe(0,0,0),O=0,W=!1,q=null,Q=null,lt=null,Y=null,j=null;const F=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,ct=0;const st=r.getParameter(r.VERSION);st.indexOf("WebGL")!==-1?(ct=parseFloat(/^WebGL (\d)/.exec(st)[1]),H=ct>=1):st.indexOf("OpenGL ES")!==-1&&(ct=parseFloat(/^OpenGL ES (\d)/.exec(st)[1]),H=ct>=2);let ht=null,w={};const J=r.getParameter(r.SCISSOR_BOX),gt=r.getParameter(r.VIEWPORT),Et=new rn().fromArray(J),Nt=new rn().fromArray(gt);function Xt(k,Rt,xt,Ct){const It=new Uint8Array(4),yt=r.createTexture();r.bindTexture(k,yt),r.texParameteri(k,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(k,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Kt=0;Kt<xt;Kt++)k===r.TEXTURE_3D||k===r.TEXTURE_2D_ARRAY?r.texImage3D(Rt,0,r.RGBA,1,1,Ct,0,r.RGBA,r.UNSIGNED_BYTE,It):r.texImage2D(Rt+Kt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,It);return yt}const it={};it[r.TEXTURE_2D]=Xt(r.TEXTURE_2D,r.TEXTURE_2D,1),it[r.TEXTURE_CUBE_MAP]=Xt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),it[r.TEXTURE_2D_ARRAY]=Xt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),it[r.TEXTURE_3D]=Xt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),h.setClear(1),p.setClear(0),_t(r.DEPTH_TEST),h.setFunc(Qo),me(!1),Xe(G0),_t(r.CULL_FACE),xe(Aa);function _t(k){x[k]!==!0&&(r.enable(k),x[k]=!0)}function Tt(k){x[k]!==!1&&(r.disable(k),x[k]=!1)}function te(k,Rt){return _[k]!==Rt?(r.bindFramebuffer(k,Rt),_[k]=Rt,k===r.DRAW_FRAMEBUFFER&&(_[r.FRAMEBUFFER]=Rt),k===r.FRAMEBUFFER&&(_[r.DRAW_FRAMEBUFFER]=Rt),!0):!1}function Bt(k,Rt){let xt=R,Ct=!1;if(k){xt=E.get(Rt),xt===void 0&&(xt=[],E.set(Rt,xt));const It=k.textures;if(xt.length!==It.length||xt[0]!==r.COLOR_ATTACHMENT0){for(let yt=0,Kt=It.length;yt<Kt;yt++)xt[yt]=r.COLOR_ATTACHMENT0+yt;xt.length=It.length,Ct=!0}}else xt[0]!==r.BACK&&(xt[0]=r.BACK,Ct=!0);Ct&&r.drawBuffers(xt)}function le(k){return N!==k?(r.useProgram(k),N=k,!0):!1}const $e={[Nr]:r.FUNC_ADD,[QS]:r.FUNC_SUBTRACT,[JS]:r.FUNC_REVERSE_SUBTRACT};$e[jS]=r.MIN,$e[$S]=r.MAX;const ae={[tM]:r.ZERO,[eM]:r.ONE,[nM]:r.SRC_COLOR,[H_]:r.SRC_ALPHA,[lM]:r.SRC_ALPHA_SATURATE,[rM]:r.DST_COLOR,[aM]:r.DST_ALPHA,[iM]:r.ONE_MINUS_SRC_COLOR,[G_]:r.ONE_MINUS_SRC_ALPHA,[oM]:r.ONE_MINUS_DST_COLOR,[sM]:r.ONE_MINUS_DST_ALPHA,[cM]:r.CONSTANT_COLOR,[uM]:r.ONE_MINUS_CONSTANT_COLOR,[fM]:r.CONSTANT_ALPHA,[hM]:r.ONE_MINUS_CONSTANT_ALPHA};function xe(k,Rt,xt,Ct,It,yt,Kt,Wt,Be,be){if(k===Aa){y===!0&&(Tt(r.BLEND),y=!1);return}if(y===!1&&(_t(r.BLEND),y=!0),k!==KS){if(k!==S||be!==W){if((I!==Nr||U!==Nr)&&(r.blendEquation(r.FUNC_ADD),I=Nr,U=Nr),be)switch(k){case Yo:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Xh:r.blendFunc(r.ONE,r.ONE);break;case V0:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case k0:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Ce("WebGLState: Invalid blending: ",k);break}else switch(k){case Yo:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Xh:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case V0:Ce("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case k0:Ce("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ce("WebGLState: Invalid blending: ",k);break}B=null,D=null,C=null,P=null,b.set(0,0,0),O=0,S=k,W=be}return}It=It||Rt,yt=yt||xt,Kt=Kt||Ct,(Rt!==I||It!==U)&&(r.blendEquationSeparate($e[Rt],$e[It]),I=Rt,U=It),(xt!==B||Ct!==D||yt!==C||Kt!==P)&&(r.blendFuncSeparate(ae[xt],ae[Ct],ae[yt],ae[Kt]),B=xt,D=Ct,C=yt,P=Kt),(Wt.equals(b)===!1||Be!==O)&&(r.blendColor(Wt.r,Wt.g,Wt.b,Be),b.copy(Wt),O=Be),S=k,W=!1}function Ne(k,Rt){k.side===ba?Tt(r.CULL_FACE):_t(r.CULL_FACE);let xt=k.side===jn;Rt&&(xt=!xt),me(xt),k.blending===Yo&&k.transparent===!1?xe(Aa):xe(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),h.setFunc(k.depthFunc),h.setTest(k.depthTest),h.setMask(k.depthWrite),c.setMask(k.colorWrite);const Ct=k.stencilWrite;p.setTest(Ct),Ct&&(p.setMask(k.stencilWriteMask),p.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),p.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),En(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?_t(r.SAMPLE_ALPHA_TO_COVERAGE):Tt(r.SAMPLE_ALPHA_TO_COVERAGE)}function me(k){q!==k&&(k?r.frontFace(r.CW):r.frontFace(r.CCW),q=k)}function Xe(k){k!==qS?(_t(r.CULL_FACE),k!==Q&&(k===G0?r.cullFace(r.BACK):k===YS?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Tt(r.CULL_FACE),Q=k}function tn(k){k!==lt&&(H&&r.lineWidth(k),lt=k)}function En(k,Rt,xt){k?(_t(r.POLYGON_OFFSET_FILL),(Y!==Rt||j!==xt)&&(Y=Rt,j=xt,h.getReversed()&&(Rt=-Rt),r.polygonOffset(Rt,xt))):Tt(r.POLYGON_OFFSET_FILL)}function We(k){k?_t(r.SCISSOR_TEST):Tt(r.SCISSOR_TEST)}function en(k){k===void 0&&(k=r.TEXTURE0+F-1),ht!==k&&(r.activeTexture(k),ht=k)}function X(k,Rt,xt){xt===void 0&&(ht===null?xt=r.TEXTURE0+F-1:xt=ht);let Ct=w[xt];Ct===void 0&&(Ct={type:void 0,texture:void 0},w[xt]=Ct),(Ct.type!==k||Ct.texture!==Rt)&&(ht!==xt&&(r.activeTexture(xt),ht=xt),r.bindTexture(k,Rt||it[k]),Ct.type=k,Ct.texture=Rt)}function Le(){const k=w[ht];k!==void 0&&k.type!==void 0&&(r.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function we(){try{r.compressedTexImage2D(...arguments)}catch(k){Ce("WebGLState:",k)}}function L(){try{r.compressedTexImage3D(...arguments)}catch(k){Ce("WebGLState:",k)}}function M(){try{r.texSubImage2D(...arguments)}catch(k){Ce("WebGLState:",k)}}function K(){try{r.texSubImage3D(...arguments)}catch(k){Ce("WebGLState:",k)}}function rt(){try{r.compressedTexSubImage2D(...arguments)}catch(k){Ce("WebGLState:",k)}}function dt(){try{r.compressedTexSubImage3D(...arguments)}catch(k){Ce("WebGLState:",k)}}function bt(){try{r.texStorage2D(...arguments)}catch(k){Ce("WebGLState:",k)}}function wt(){try{r.texStorage3D(...arguments)}catch(k){Ce("WebGLState:",k)}}function pt(){try{r.texImage2D(...arguments)}catch(k){Ce("WebGLState:",k)}}function mt(){try{r.texImage3D(...arguments)}catch(k){Ce("WebGLState:",k)}}function At(k){return v[k]!==void 0?v[k]:r.getParameter(k)}function Ht(k,Rt){v[k]!==Rt&&(r.pixelStorei(k,Rt),v[k]=Rt)}function Lt(k){Et.equals(k)===!1&&(r.scissor(k.x,k.y,k.z,k.w),Et.copy(k))}function Dt(k){Nt.equals(k)===!1&&(r.viewport(k.x,k.y,k.z,k.w),Nt.copy(k))}function Qt(k,Rt){let xt=d.get(Rt);xt===void 0&&(xt=new WeakMap,d.set(Rt,xt));let Ct=xt.get(k);Ct===void 0&&(Ct=r.getUniformBlockIndex(Rt,k.name),xt.set(k,Ct))}function Jt(k,Rt){const Ct=d.get(Rt).get(k);m.get(Rt)!==Ct&&(r.uniformBlockBinding(Rt,Ct,k.__bindingPointIndex),m.set(Rt,Ct))}function ee(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),h.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),x={},v={},ht=null,w={},_={},E=new WeakMap,R=[],N=null,y=!1,S=null,I=null,B=null,D=null,U=null,C=null,P=null,b=new Oe(0,0,0),O=0,W=!1,q=null,Q=null,lt=null,Y=null,j=null,Et.set(0,0,r.canvas.width,r.canvas.height),Nt.set(0,0,r.canvas.width,r.canvas.height),c.reset(),h.reset(),p.reset()}return{buffers:{color:c,depth:h,stencil:p},enable:_t,disable:Tt,bindFramebuffer:te,drawBuffers:Bt,useProgram:le,setBlending:xe,setMaterial:Ne,setFlipSided:me,setCullFace:Xe,setLineWidth:tn,setPolygonOffset:En,setScissorTest:We,activeTexture:en,bindTexture:X,unbindTexture:Le,compressedTexImage2D:we,compressedTexImage3D:L,texImage2D:pt,texImage3D:mt,pixelStorei:Ht,getParameter:At,updateUBOMapping:Qt,uniformBlockBinding:Jt,texStorage2D:bt,texStorage3D:wt,texSubImage2D:M,texSubImage3D:K,compressedTexSubImage2D:rt,compressedTexSubImage3D:dt,scissor:Lt,viewport:Dt,reset:ee}}function hA(r,t,i,s,l,c,h){const p=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new ie,x=new WeakMap,v=new Set;let _;const E=new WeakMap;let R=!1;try{R=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function N(L,M){return R?new OffscreenCanvas(L,M):Kc("canvas")}function y(L,M,K){let rt=1;const dt=we(L);if((dt.width>K||dt.height>K)&&(rt=K/Math.max(dt.width,dt.height)),rt<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const bt=Math.floor(rt*dt.width),wt=Math.floor(rt*dt.height);_===void 0&&(_=N(bt,wt));const pt=M?N(bt,wt):_;return pt.width=bt,pt.height=wt,pt.getContext("2d").drawImage(L,0,0,bt,wt),ne("WebGLRenderer: Texture has been resized from ("+dt.width+"x"+dt.height+") to ("+bt+"x"+wt+")."),pt}else return"data"in L&&ne("WebGLRenderer: Image in DataTexture is too big ("+dt.width+"x"+dt.height+")."),L;return L}function S(L){return L.generateMipmaps}function I(L){r.generateMipmap(L)}function B(L){return L.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?r.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function D(L,M,K,rt,dt,bt=!1){if(L!==null){if(r[L]!==void 0)return r[L];ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let wt;rt&&(wt=t.get("EXT_texture_norm16"),wt||ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let pt=M;if(M===r.RED&&(K===r.FLOAT&&(pt=r.R32F),K===r.HALF_FLOAT&&(pt=r.R16F),K===r.UNSIGNED_BYTE&&(pt=r.R8),K===r.UNSIGNED_SHORT&&wt&&(pt=wt.R16_EXT),K===r.SHORT&&wt&&(pt=wt.R16_SNORM_EXT)),M===r.RED_INTEGER&&(K===r.UNSIGNED_BYTE&&(pt=r.R8UI),K===r.UNSIGNED_SHORT&&(pt=r.R16UI),K===r.UNSIGNED_INT&&(pt=r.R32UI),K===r.BYTE&&(pt=r.R8I),K===r.SHORT&&(pt=r.R16I),K===r.INT&&(pt=r.R32I)),M===r.RG&&(K===r.FLOAT&&(pt=r.RG32F),K===r.HALF_FLOAT&&(pt=r.RG16F),K===r.UNSIGNED_BYTE&&(pt=r.RG8),K===r.UNSIGNED_SHORT&&wt&&(pt=wt.RG16_EXT),K===r.SHORT&&wt&&(pt=wt.RG16_SNORM_EXT)),M===r.RG_INTEGER&&(K===r.UNSIGNED_BYTE&&(pt=r.RG8UI),K===r.UNSIGNED_SHORT&&(pt=r.RG16UI),K===r.UNSIGNED_INT&&(pt=r.RG32UI),K===r.BYTE&&(pt=r.RG8I),K===r.SHORT&&(pt=r.RG16I),K===r.INT&&(pt=r.RG32I)),M===r.RGB_INTEGER&&(K===r.UNSIGNED_BYTE&&(pt=r.RGB8UI),K===r.UNSIGNED_SHORT&&(pt=r.RGB16UI),K===r.UNSIGNED_INT&&(pt=r.RGB32UI),K===r.BYTE&&(pt=r.RGB8I),K===r.SHORT&&(pt=r.RGB16I),K===r.INT&&(pt=r.RGB32I)),M===r.RGBA_INTEGER&&(K===r.UNSIGNED_BYTE&&(pt=r.RGBA8UI),K===r.UNSIGNED_SHORT&&(pt=r.RGBA16UI),K===r.UNSIGNED_INT&&(pt=r.RGBA32UI),K===r.BYTE&&(pt=r.RGBA8I),K===r.SHORT&&(pt=r.RGBA16I),K===r.INT&&(pt=r.RGBA32I)),M===r.RGB&&(K===r.UNSIGNED_SHORT&&wt&&(pt=wt.RGB16_EXT),K===r.SHORT&&wt&&(pt=wt.RGB16_SNORM_EXT),K===r.UNSIGNED_INT_5_9_9_9_REV&&(pt=r.RGB9_E5),K===r.UNSIGNED_INT_10F_11F_11F_REV&&(pt=r.R11F_G11F_B10F)),M===r.RGBA){const mt=bt?Yc:Ee.getTransfer(dt);K===r.FLOAT&&(pt=r.RGBA32F),K===r.HALF_FLOAT&&(pt=r.RGBA16F),K===r.UNSIGNED_BYTE&&(pt=mt===Fe?r.SRGB8_ALPHA8:r.RGBA8),K===r.UNSIGNED_SHORT&&wt&&(pt=wt.RGBA16_EXT),K===r.SHORT&&wt&&(pt=wt.RGBA16_SNORM_EXT),K===r.UNSIGNED_SHORT_4_4_4_4&&(pt=r.RGBA4),K===r.UNSIGNED_SHORT_5_5_5_1&&(pt=r.RGB5_A1)}return(pt===r.R16F||pt===r.R32F||pt===r.RG16F||pt===r.RG32F||pt===r.RGBA16F||pt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),pt}function U(L,M){let K;return L?M===null||M===Ji||M===jo?K=r.DEPTH24_STENCIL8:M===Yi?K=r.DEPTH32F_STENCIL8:M===Jo&&(K=r.DEPTH24_STENCIL8,ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Ji||M===jo?K=r.DEPTH_COMPONENT24:M===Yi?K=r.DEPTH_COMPONENT32F:M===Jo&&(K=r.DEPTH_COMPONENT16),K}function C(L,M){return S(L)===!0||L.isFramebufferTexture&&L.minFilter!==Nn&&L.minFilter!==An?Math.log2(Math.max(M.width,M.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?M.mipmaps.length:1}function P(L){const M=L.target;M.removeEventListener("dispose",P),O(M),M.isVideoTexture&&x.delete(M),M.isHTMLTexture&&v.delete(M)}function b(L){const M=L.target;M.removeEventListener("dispose",b),q(M)}function O(L){const M=s.get(L);if(M.__webglInit===void 0)return;const K=L.source,rt=E.get(K);if(rt){const dt=rt[M.__cacheKey];dt.usedTimes--,dt.usedTimes===0&&W(L),Object.keys(rt).length===0&&E.delete(K)}s.remove(L)}function W(L){const M=s.get(L);r.deleteTexture(M.__webglTexture);const K=L.source,rt=E.get(K);delete rt[M.__cacheKey],h.memory.textures--}function q(L){const M=s.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),s.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let rt=0;rt<6;rt++){if(Array.isArray(M.__webglFramebuffer[rt]))for(let dt=0;dt<M.__webglFramebuffer[rt].length;dt++)r.deleteFramebuffer(M.__webglFramebuffer[rt][dt]);else r.deleteFramebuffer(M.__webglFramebuffer[rt]);M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer[rt])}else{if(Array.isArray(M.__webglFramebuffer))for(let rt=0;rt<M.__webglFramebuffer.length;rt++)r.deleteFramebuffer(M.__webglFramebuffer[rt]);else r.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&r.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let rt=0;rt<M.__webglColorRenderbuffer.length;rt++)M.__webglColorRenderbuffer[rt]&&r.deleteRenderbuffer(M.__webglColorRenderbuffer[rt]);M.__webglDepthRenderbuffer&&r.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const K=L.textures;for(let rt=0,dt=K.length;rt<dt;rt++){const bt=s.get(K[rt]);bt.__webglTexture&&(r.deleteTexture(bt.__webglTexture),h.memory.textures--),s.remove(K[rt])}s.remove(L)}let Q=0;function lt(){Q=0}function Y(){return Q}function j(L){Q=L}function F(){const L=Q;return L>=l.maxTextures&&ne("WebGLTextures: Trying to use "+(L+1)+" texture units while this GPU supports only "+l.maxTextures),Q+=1,L}function H(L){const M=[];return M.push(L.wrapS),M.push(L.wrapT),M.push(L.wrapR||0),M.push(L.magFilter),M.push(L.minFilter),M.push(L.anisotropy),M.push(L.internalFormat),M.push(L.format),M.push(L.type),M.push(L.generateMipmaps),M.push(L.premultiplyAlpha),M.push(L.flipY),M.push(L.unpackAlignment),M.push(L.colorSpace),M.join()}function ct(L,M){const K=s.get(L);if(L.isVideoTexture&&X(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&K.__version!==L.version){const rt=L.image;if(rt===null)ne("WebGLRenderer: Texture marked for update but no image data found.");else if(rt.complete===!1)ne("WebGLRenderer: Texture marked for update but image is incomplete");else{Tt(K,L,M);return}}else L.isExternalTexture&&(K.__webglTexture=L.sourceTexture?L.sourceTexture:null);i.bindTexture(r.TEXTURE_2D,K.__webglTexture,r.TEXTURE0+M)}function st(L,M){const K=s.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&K.__version!==L.version){Tt(K,L,M);return}else L.isExternalTexture&&(K.__webglTexture=L.sourceTexture?L.sourceTexture:null);i.bindTexture(r.TEXTURE_2D_ARRAY,K.__webglTexture,r.TEXTURE0+M)}function ht(L,M){const K=s.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&K.__version!==L.version){Tt(K,L,M);return}i.bindTexture(r.TEXTURE_3D,K.__webglTexture,r.TEXTURE0+M)}function w(L,M){const K=s.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&K.__version!==L.version){te(K,L,M);return}i.bindTexture(r.TEXTURE_CUBE_MAP,K.__webglTexture,r.TEXTURE0+M)}const J={[jh]:r.REPEAT,[Pi]:r.CLAMP_TO_EDGE,[$h]:r.MIRRORED_REPEAT},gt={[Nn]:r.NEAREST,[mM]:r.NEAREST_MIPMAP_NEAREST,[pc]:r.NEAREST_MIPMAP_LINEAR,[An]:r.LINEAR,[ph]:r.LINEAR_MIPMAP_NEAREST,[Os]:r.LINEAR_MIPMAP_LINEAR},Et={[xM]:r.NEVER,[bM]:r.ALWAYS,[SM]:r.LESS,[kd]:r.LEQUAL,[MM]:r.EQUAL,[Xd]:r.GEQUAL,[yM]:r.GREATER,[EM]:r.NOTEQUAL};function Nt(L,M){if(M.type===Yi&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===An||M.magFilter===ph||M.magFilter===pc||M.magFilter===Os||M.minFilter===An||M.minFilter===ph||M.minFilter===pc||M.minFilter===Os)&&ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(L,r.TEXTURE_WRAP_S,J[M.wrapS]),r.texParameteri(L,r.TEXTURE_WRAP_T,J[M.wrapT]),(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)&&r.texParameteri(L,r.TEXTURE_WRAP_R,J[M.wrapR]),r.texParameteri(L,r.TEXTURE_MAG_FILTER,gt[M.magFilter]),r.texParameteri(L,r.TEXTURE_MIN_FILTER,gt[M.minFilter]),M.compareFunction&&(r.texParameteri(L,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(L,r.TEXTURE_COMPARE_FUNC,Et[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Nn||M.minFilter!==pc&&M.minFilter!==Os||M.type===Yi&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||s.get(M).__currentAnisotropy){const K=t.get("EXT_texture_filter_anisotropic");r.texParameterf(L,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,l.getMaxAnisotropy())),s.get(M).__currentAnisotropy=M.anisotropy}}}function Xt(L,M){let K=!1;L.__webglInit===void 0&&(L.__webglInit=!0,M.addEventListener("dispose",P));const rt=M.source;let dt=E.get(rt);dt===void 0&&(dt={},E.set(rt,dt));const bt=H(M);if(bt!==L.__cacheKey){dt[bt]===void 0&&(dt[bt]={texture:r.createTexture(),usedTimes:0},h.memory.textures++,K=!0),dt[bt].usedTimes++;const wt=dt[L.__cacheKey];wt!==void 0&&(dt[L.__cacheKey].usedTimes--,wt.usedTimes===0&&W(M)),L.__cacheKey=bt,L.__webglTexture=dt[bt].texture}return K}function it(L,M,K){return Math.floor(Math.floor(L/K)/M)}function _t(L,M,K,rt){const bt=L.updateRanges;if(bt.length===0)i.texSubImage2D(r.TEXTURE_2D,0,0,0,M.width,M.height,K,rt,M.data);else{bt.sort((Ht,Lt)=>Ht.start-Lt.start);let wt=0;for(let Ht=1;Ht<bt.length;Ht++){const Lt=bt[wt],Dt=bt[Ht],Qt=Lt.start+Lt.count,Jt=it(Dt.start,M.width,4),ee=it(Lt.start,M.width,4);Dt.start<=Qt+1&&Jt===ee&&it(Dt.start+Dt.count-1,M.width,4)===Jt?Lt.count=Math.max(Lt.count,Dt.start+Dt.count-Lt.start):(++wt,bt[wt]=Dt)}bt.length=wt+1;const pt=i.getParameter(r.UNPACK_ROW_LENGTH),mt=i.getParameter(r.UNPACK_SKIP_PIXELS),At=i.getParameter(r.UNPACK_SKIP_ROWS);i.pixelStorei(r.UNPACK_ROW_LENGTH,M.width);for(let Ht=0,Lt=bt.length;Ht<Lt;Ht++){const Dt=bt[Ht],Qt=Math.floor(Dt.start/4),Jt=Math.ceil(Dt.count/4),ee=Qt%M.width,k=Math.floor(Qt/M.width),Rt=Jt,xt=1;i.pixelStorei(r.UNPACK_SKIP_PIXELS,ee),i.pixelStorei(r.UNPACK_SKIP_ROWS,k),i.texSubImage2D(r.TEXTURE_2D,0,ee,k,Rt,xt,K,rt,M.data)}L.clearUpdateRanges(),i.pixelStorei(r.UNPACK_ROW_LENGTH,pt),i.pixelStorei(r.UNPACK_SKIP_PIXELS,mt),i.pixelStorei(r.UNPACK_SKIP_ROWS,At)}}function Tt(L,M,K){let rt=r.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(rt=r.TEXTURE_2D_ARRAY),M.isData3DTexture&&(rt=r.TEXTURE_3D);const dt=Xt(L,M),bt=M.source;i.bindTexture(rt,L.__webglTexture,r.TEXTURE0+K);const wt=s.get(bt);if(bt.version!==wt.__version||dt===!0){if(i.activeTexture(r.TEXTURE0+K),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const xt=Ee.getPrimaries(Ee.workingColorSpace),Ct=M.colorSpace===Ta?null:Ee.getPrimaries(M.colorSpace),It=M.colorSpace===Ta||xt===Ct?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,It)}i.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment);let mt=y(M.image,!1,l.maxTextureSize);mt=Le(M,mt);const At=c.convert(M.format,M.colorSpace),Ht=c.convert(M.type);let Lt=D(M.internalFormat,At,Ht,M.normalized,M.colorSpace,M.isVideoTexture);Nt(rt,M);let Dt;const Qt=M.mipmaps,Jt=M.isVideoTexture!==!0,ee=wt.__version===void 0||dt===!0,k=bt.dataReady,Rt=C(M,mt);if(M.isDepthTexture)Lt=U(M.format===Ps,M.type),ee&&(Jt?i.texStorage2D(r.TEXTURE_2D,1,Lt,mt.width,mt.height):i.texImage2D(r.TEXTURE_2D,0,Lt,mt.width,mt.height,0,At,Ht,null));else if(M.isDataTexture)if(Qt.length>0){Jt&&ee&&i.texStorage2D(r.TEXTURE_2D,Rt,Lt,Qt[0].width,Qt[0].height);for(let xt=0,Ct=Qt.length;xt<Ct;xt++)Dt=Qt[xt],Jt?k&&i.texSubImage2D(r.TEXTURE_2D,xt,0,0,Dt.width,Dt.height,At,Ht,Dt.data):i.texImage2D(r.TEXTURE_2D,xt,Lt,Dt.width,Dt.height,0,At,Ht,Dt.data);M.generateMipmaps=!1}else Jt?(ee&&i.texStorage2D(r.TEXTURE_2D,Rt,Lt,mt.width,mt.height),k&&_t(M,mt,At,Ht)):i.texImage2D(r.TEXTURE_2D,0,Lt,mt.width,mt.height,0,At,Ht,mt.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Jt&&ee&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Rt,Lt,Qt[0].width,Qt[0].height,mt.depth);for(let xt=0,Ct=Qt.length;xt<Ct;xt++)if(Dt=Qt[xt],M.format!==Ti)if(At!==null)if(Jt){if(k)if(M.layerUpdates.size>0){const It=d_(Dt.width,Dt.height,M.format,M.type);for(const yt of M.layerUpdates){const Kt=Dt.data.subarray(yt*It/Dt.data.BYTES_PER_ELEMENT,(yt+1)*It/Dt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,xt,0,0,yt,Dt.width,Dt.height,1,At,Kt)}}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,xt,0,0,0,Dt.width,Dt.height,mt.depth,At,Dt.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,xt,Lt,Dt.width,Dt.height,mt.depth,0,Dt.data,0,0);else ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Jt?k&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,xt,0,0,0,Dt.width,Dt.height,mt.depth,At,Ht,Dt.data):i.texImage3D(r.TEXTURE_2D_ARRAY,xt,Lt,Dt.width,Dt.height,mt.depth,0,At,Ht,Dt.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{Jt&&ee&&i.texStorage2D(r.TEXTURE_2D,Rt,Lt,Qt[0].width,Qt[0].height);for(let xt=0,Ct=Qt.length;xt<Ct;xt++)Dt=Qt[xt],M.format!==Ti?At!==null?Jt?k&&i.compressedTexSubImage2D(r.TEXTURE_2D,xt,0,0,Dt.width,Dt.height,At,Dt.data):i.compressedTexImage2D(r.TEXTURE_2D,xt,Lt,Dt.width,Dt.height,0,Dt.data):ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?k&&i.texSubImage2D(r.TEXTURE_2D,xt,0,0,Dt.width,Dt.height,At,Ht,Dt.data):i.texImage2D(r.TEXTURE_2D,xt,Lt,Dt.width,Dt.height,0,At,Ht,Dt.data)}else if(M.isDataArrayTexture)if(Jt){if(ee&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Rt,Lt,mt.width,mt.height,mt.depth),k)if(M.layerUpdates.size>0){const xt=d_(mt.width,mt.height,M.format,M.type);for(const Ct of M.layerUpdates){const It=mt.data.subarray(Ct*xt/mt.data.BYTES_PER_ELEMENT,(Ct+1)*xt/mt.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Ct,mt.width,mt.height,1,At,Ht,It)}M.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,mt.width,mt.height,mt.depth,At,Ht,mt.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,Lt,mt.width,mt.height,mt.depth,0,At,Ht,mt.data);else if(M.isData3DTexture)Jt?(ee&&i.texStorage3D(r.TEXTURE_3D,Rt,Lt,mt.width,mt.height,mt.depth),k&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,mt.width,mt.height,mt.depth,At,Ht,mt.data)):i.texImage3D(r.TEXTURE_3D,0,Lt,mt.width,mt.height,mt.depth,0,At,Ht,mt.data);else if(M.isFramebufferTexture){if(ee)if(Jt)i.texStorage2D(r.TEXTURE_2D,Rt,Lt,mt.width,mt.height);else{let xt=mt.width,Ct=mt.height;for(let It=0;It<Rt;It++)i.texImage2D(r.TEXTURE_2D,It,Lt,xt,Ct,0,At,Ht,null),xt>>=1,Ct>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in r){const xt=r.canvas;if(xt.hasAttribute("layoutsubtree")||xt.setAttribute("layoutsubtree","true"),mt.parentNode!==xt){xt.appendChild(mt),v.add(M),xt.onpaint=Ct=>{const It=Ct.changedElements;for(const yt of v)It.includes(yt.image)&&(yt.needsUpdate=!0)},xt.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,mt);else{const It=r.RGBA,yt=r.RGBA,Kt=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,It,yt,Kt,mt)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(Qt.length>0){if(Jt&&ee){const xt=we(Qt[0]);i.texStorage2D(r.TEXTURE_2D,Rt,Lt,xt.width,xt.height)}for(let xt=0,Ct=Qt.length;xt<Ct;xt++)Dt=Qt[xt],Jt?k&&i.texSubImage2D(r.TEXTURE_2D,xt,0,0,At,Ht,Dt):i.texImage2D(r.TEXTURE_2D,xt,Lt,At,Ht,Dt);M.generateMipmaps=!1}else if(Jt){if(ee){const xt=we(mt);i.texStorage2D(r.TEXTURE_2D,Rt,Lt,xt.width,xt.height)}k&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,At,Ht,mt)}else i.texImage2D(r.TEXTURE_2D,0,Lt,At,Ht,mt);S(M)&&I(rt),wt.__version=bt.version,M.onUpdate&&M.onUpdate(M)}L.__version=M.version}function te(L,M,K){if(M.image.length!==6)return;const rt=Xt(L,M),dt=M.source;i.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture,r.TEXTURE0+K);const bt=s.get(dt);if(dt.version!==bt.__version||rt===!0){i.activeTexture(r.TEXTURE0+K);const wt=Ee.getPrimaries(Ee.workingColorSpace),pt=M.colorSpace===Ta?null:Ee.getPrimaries(M.colorSpace),mt=M.colorSpace===Ta||wt===pt?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const At=M.isCompressedTexture||M.image[0].isCompressedTexture,Ht=M.image[0]&&M.image[0].isDataTexture,Lt=[];for(let yt=0;yt<6;yt++)!At&&!Ht?Lt[yt]=y(M.image[yt],!0,l.maxCubemapSize):Lt[yt]=Ht?M.image[yt].image:M.image[yt],Lt[yt]=Le(M,Lt[yt]);const Dt=Lt[0],Qt=c.convert(M.format,M.colorSpace),Jt=c.convert(M.type),ee=D(M.internalFormat,Qt,Jt,M.normalized,M.colorSpace),k=M.isVideoTexture!==!0,Rt=bt.__version===void 0||rt===!0,xt=dt.dataReady;let Ct=C(M,Dt);Nt(r.TEXTURE_CUBE_MAP,M);let It;if(At){k&&Rt&&i.texStorage2D(r.TEXTURE_CUBE_MAP,Ct,ee,Dt.width,Dt.height);for(let yt=0;yt<6;yt++){It=Lt[yt].mipmaps;for(let Kt=0;Kt<It.length;Kt++){const Wt=It[Kt];M.format!==Ti?Qt!==null?k?xt&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Kt,0,0,Wt.width,Wt.height,Qt,Wt.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Kt,ee,Wt.width,Wt.height,0,Wt.data):ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?xt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Kt,0,0,Wt.width,Wt.height,Qt,Jt,Wt.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Kt,ee,Wt.width,Wt.height,0,Qt,Jt,Wt.data)}}}else{if(It=M.mipmaps,k&&Rt){It.length>0&&Ct++;const yt=we(Lt[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,Ct,ee,yt.width,yt.height)}for(let yt=0;yt<6;yt++)if(Ht){k?xt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,0,0,Lt[yt].width,Lt[yt].height,Qt,Jt,Lt[yt].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,ee,Lt[yt].width,Lt[yt].height,0,Qt,Jt,Lt[yt].data);for(let Kt=0;Kt<It.length;Kt++){const Be=It[Kt].image[yt].image;k?xt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Kt+1,0,0,Be.width,Be.height,Qt,Jt,Be.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Kt+1,ee,Be.width,Be.height,0,Qt,Jt,Be.data)}}else{k?xt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,0,0,Qt,Jt,Lt[yt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,ee,Qt,Jt,Lt[yt]);for(let Kt=0;Kt<It.length;Kt++){const Wt=It[Kt];k?xt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Kt+1,0,0,Qt,Jt,Wt.image[yt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Kt+1,ee,Qt,Jt,Wt.image[yt])}}}S(M)&&I(r.TEXTURE_CUBE_MAP),bt.__version=dt.version,M.onUpdate&&M.onUpdate(M)}L.__version=M.version}function Bt(L,M,K,rt,dt,bt){const wt=c.convert(K.format,K.colorSpace),pt=c.convert(K.type),mt=D(K.internalFormat,wt,pt,K.normalized,K.colorSpace),At=s.get(M),Ht=s.get(K);if(Ht.__renderTarget=M,!At.__hasExternalTextures){const Lt=Math.max(1,M.width>>bt),Dt=Math.max(1,M.height>>bt);dt===r.TEXTURE_3D||dt===r.TEXTURE_2D_ARRAY?i.texImage3D(dt,bt,mt,Lt,Dt,M.depth,0,wt,pt,null):i.texImage2D(dt,bt,mt,Lt,Dt,0,wt,pt,null)}i.bindFramebuffer(r.FRAMEBUFFER,L),en(M)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,rt,dt,Ht.__webglTexture,0,We(M)):(dt===r.TEXTURE_2D||dt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&dt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,rt,dt,Ht.__webglTexture,bt),i.bindFramebuffer(r.FRAMEBUFFER,null)}function le(L,M,K){if(r.bindRenderbuffer(r.RENDERBUFFER,L),M.depthBuffer){const rt=M.depthTexture,dt=rt&&rt.isDepthTexture?rt.type:null,bt=U(M.stencilBuffer,dt),wt=M.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;en(M)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,We(M),bt,M.width,M.height):K?r.renderbufferStorageMultisample(r.RENDERBUFFER,We(M),bt,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,bt,M.width,M.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,wt,r.RENDERBUFFER,L)}else{const rt=M.textures;for(let dt=0;dt<rt.length;dt++){const bt=rt[dt],wt=c.convert(bt.format,bt.colorSpace),pt=c.convert(bt.type),mt=D(bt.internalFormat,wt,pt,bt.normalized,bt.colorSpace);en(M)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,We(M),mt,M.width,M.height):K?r.renderbufferStorageMultisample(r.RENDERBUFFER,We(M),mt,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,mt,M.width,M.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function $e(L,M,K){const rt=M.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(r.FRAMEBUFFER,L),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const dt=s.get(M.depthTexture);if(dt.__renderTarget=M,(!dt.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),rt){if(dt.__webglInit===void 0&&(dt.__webglInit=!0,M.depthTexture.addEventListener("dispose",P)),dt.__webglTexture===void 0){dt.__webglTexture=r.createTexture(),i.bindTexture(r.TEXTURE_CUBE_MAP,dt.__webglTexture),Nt(r.TEXTURE_CUBE_MAP,M.depthTexture);const At=c.convert(M.depthTexture.format),Ht=c.convert(M.depthTexture.type);let Lt;M.depthTexture.format===wa?Lt=r.DEPTH_COMPONENT24:M.depthTexture.format===Ps&&(Lt=r.DEPTH24_STENCIL8);for(let Dt=0;Dt<6;Dt++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,0,Lt,M.width,M.height,0,At,Ht,null)}}else ct(M.depthTexture,0);const bt=dt.__webglTexture,wt=We(M),pt=rt?r.TEXTURE_CUBE_MAP_POSITIVE_X+K:r.TEXTURE_2D,mt=M.depthTexture.format===Ps?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(M.depthTexture.format===wa)en(M)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,mt,pt,bt,0,wt):r.framebufferTexture2D(r.FRAMEBUFFER,mt,pt,bt,0);else if(M.depthTexture.format===Ps)en(M)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,mt,pt,bt,0,wt):r.framebufferTexture2D(r.FRAMEBUFFER,mt,pt,bt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ae(L){const M=s.get(L),K=L.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==L.depthTexture){const rt=L.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),rt){const dt=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,rt.removeEventListener("dispose",dt)};rt.addEventListener("dispose",dt),M.__depthDisposeCallback=dt}M.__boundDepthTexture=rt}if(L.depthTexture&&!M.__autoAllocateDepthBuffer)if(K)for(let rt=0;rt<6;rt++)$e(M.__webglFramebuffer[rt],L,rt);else{const rt=L.texture.mipmaps;rt&&rt.length>0?$e(M.__webglFramebuffer[0],L,0):$e(M.__webglFramebuffer,L,0)}else if(K){M.__webglDepthbuffer=[];for(let rt=0;rt<6;rt++)if(i.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[rt]),M.__webglDepthbuffer[rt]===void 0)M.__webglDepthbuffer[rt]=r.createRenderbuffer(),le(M.__webglDepthbuffer[rt],L,!1);else{const dt=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,bt=M.__webglDepthbuffer[rt];r.bindRenderbuffer(r.RENDERBUFFER,bt),r.framebufferRenderbuffer(r.FRAMEBUFFER,dt,r.RENDERBUFFER,bt)}}else{const rt=L.texture.mipmaps;if(rt&&rt.length>0?i.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[0]):i.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=r.createRenderbuffer(),le(M.__webglDepthbuffer,L,!1);else{const dt=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,bt=M.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,bt),r.framebufferRenderbuffer(r.FRAMEBUFFER,dt,r.RENDERBUFFER,bt)}}i.bindFramebuffer(r.FRAMEBUFFER,null)}function xe(L,M,K){const rt=s.get(L);M!==void 0&&Bt(rt.__webglFramebuffer,L,L.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),K!==void 0&&ae(L)}function Ne(L){const M=L.texture,K=s.get(L),rt=s.get(M);L.addEventListener("dispose",b);const dt=L.textures,bt=L.isWebGLCubeRenderTarget===!0,wt=dt.length>1;if(wt||(rt.__webglTexture===void 0&&(rt.__webglTexture=r.createTexture()),rt.__version=M.version,h.memory.textures++),bt){K.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(M.mipmaps&&M.mipmaps.length>0){K.__webglFramebuffer[pt]=[];for(let mt=0;mt<M.mipmaps.length;mt++)K.__webglFramebuffer[pt][mt]=r.createFramebuffer()}else K.__webglFramebuffer[pt]=r.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){K.__webglFramebuffer=[];for(let pt=0;pt<M.mipmaps.length;pt++)K.__webglFramebuffer[pt]=r.createFramebuffer()}else K.__webglFramebuffer=r.createFramebuffer();if(wt)for(let pt=0,mt=dt.length;pt<mt;pt++){const At=s.get(dt[pt]);At.__webglTexture===void 0&&(At.__webglTexture=r.createTexture(),h.memory.textures++)}if(L.samples>0&&en(L)===!1){K.__webglMultisampledFramebuffer=r.createFramebuffer(),K.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let pt=0;pt<dt.length;pt++){const mt=dt[pt];K.__webglColorRenderbuffer[pt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,K.__webglColorRenderbuffer[pt]);const At=c.convert(mt.format,mt.colorSpace),Ht=c.convert(mt.type),Lt=D(mt.internalFormat,At,Ht,mt.normalized,mt.colorSpace,L.isXRRenderTarget===!0),Dt=We(L);r.renderbufferStorageMultisample(r.RENDERBUFFER,Dt,Lt,L.width,L.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+pt,r.RENDERBUFFER,K.__webglColorRenderbuffer[pt])}r.bindRenderbuffer(r.RENDERBUFFER,null),L.depthBuffer&&(K.__webglDepthRenderbuffer=r.createRenderbuffer(),le(K.__webglDepthRenderbuffer,L,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(bt){i.bindTexture(r.TEXTURE_CUBE_MAP,rt.__webglTexture),Nt(r.TEXTURE_CUBE_MAP,M);for(let pt=0;pt<6;pt++)if(M.mipmaps&&M.mipmaps.length>0)for(let mt=0;mt<M.mipmaps.length;mt++)Bt(K.__webglFramebuffer[pt][mt],L,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,mt);else Bt(K.__webglFramebuffer[pt],L,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);S(M)&&I(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(wt){for(let pt=0,mt=dt.length;pt<mt;pt++){const At=dt[pt],Ht=s.get(At);let Lt=r.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Lt=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Lt,Ht.__webglTexture),Nt(Lt,At),Bt(K.__webglFramebuffer,L,At,r.COLOR_ATTACHMENT0+pt,Lt,0),S(At)&&I(Lt)}i.unbindTexture()}else{let pt=r.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(pt=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(pt,rt.__webglTexture),Nt(pt,M),M.mipmaps&&M.mipmaps.length>0)for(let mt=0;mt<M.mipmaps.length;mt++)Bt(K.__webglFramebuffer[mt],L,M,r.COLOR_ATTACHMENT0,pt,mt);else Bt(K.__webglFramebuffer,L,M,r.COLOR_ATTACHMENT0,pt,0);S(M)&&I(pt),i.unbindTexture()}L.depthBuffer&&ae(L)}function me(L){const M=L.textures;for(let K=0,rt=M.length;K<rt;K++){const dt=M[K];if(S(dt)){const bt=B(L),wt=s.get(dt).__webglTexture;i.bindTexture(bt,wt),I(bt),i.unbindTexture()}}}const Xe=[],tn=[];function En(L){if(L.samples>0){if(en(L)===!1){const M=L.textures,K=L.width,rt=L.height;let dt=r.COLOR_BUFFER_BIT;const bt=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,wt=s.get(L),pt=M.length>1;if(pt)for(let At=0;At<M.length;At++)i.bindFramebuffer(r.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,wt.__webglMultisampledFramebuffer);const mt=L.texture.mipmaps;mt&&mt.length>0?i.bindFramebuffer(r.DRAW_FRAMEBUFFER,wt.__webglFramebuffer[0]):i.bindFramebuffer(r.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let At=0;At<M.length;At++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(dt|=r.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(dt|=r.STENCIL_BUFFER_BIT)),pt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,wt.__webglColorRenderbuffer[At]);const Ht=s.get(M[At]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ht,0)}r.blitFramebuffer(0,0,K,rt,0,0,K,rt,dt,r.NEAREST),m===!0&&(Xe.length=0,tn.length=0,Xe.push(r.COLOR_ATTACHMENT0+At),L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&(Xe.push(bt),tn.push(bt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,tn)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Xe))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),pt)for(let At=0;At<M.length;At++){i.bindFramebuffer(r.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.RENDERBUFFER,wt.__webglColorRenderbuffer[At]);const Ht=s.get(M[At]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,wt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.TEXTURE_2D,Ht,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,wt.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&m){const M=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[M])}}}function We(L){return Math.min(l.maxSamples,L.samples)}function en(L){const M=s.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function X(L){const M=h.render.frame;x.get(L)!==M&&(x.set(L,M),L.update())}function Le(L,M){const K=L.colorSpace,rt=L.format,dt=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||K!==qc&&K!==Ta&&(Ee.getTransfer(K)===Fe?(rt!==Ti||dt!==bi)&&ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ce("WebGLTextures: Unsupported texture color space:",K)),M}function we(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(d.width=L.naturalWidth||L.width,d.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(d.width=L.displayWidth,d.height=L.displayHeight):(d.width=L.width,d.height=L.height),d}this.allocateTextureUnit=F,this.resetTextureUnits=lt,this.getTextureUnits=Y,this.setTextureUnits=j,this.setTexture2D=ct,this.setTexture2DArray=st,this.setTexture3D=ht,this.setTextureCube=w,this.rebindTextures=xe,this.setupRenderTarget=Ne,this.updateRenderTargetMipmap=me,this.updateMultisampleRenderTarget=En,this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=Bt,this.useMultisampledRTT=en,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function dA(r,t){function i(s,l=Ta){let c;const h=Ee.getTransfer(l);if(s===bi)return r.UNSIGNED_BYTE;if(s===zd)return r.UNSIGNED_SHORT_4_4_4_4;if(s===Bd)return r.UNSIGNED_SHORT_5_5_5_1;if(s===$_)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===tv)return r.UNSIGNED_INT_10F_11F_11F_REV;if(s===J_)return r.BYTE;if(s===j_)return r.SHORT;if(s===Jo)return r.UNSIGNED_SHORT;if(s===Fd)return r.INT;if(s===Ji)return r.UNSIGNED_INT;if(s===Yi)return r.FLOAT;if(s===Ii)return r.HALF_FLOAT;if(s===ev)return r.ALPHA;if(s===nv)return r.RGB;if(s===Ti)return r.RGBA;if(s===wa)return r.DEPTH_COMPONENT;if(s===Ps)return r.DEPTH_STENCIL;if(s===iv)return r.RED;if(s===Hd)return r.RED_INTEGER;if(s===Bs)return r.RG;if(s===Gd)return r.RG_INTEGER;if(s===Vd)return r.RGBA_INTEGER;if(s===Bc||s===Hc||s===Gc||s===Vc)if(h===Fe)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===Bc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Hc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Gc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Vc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===Bc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Hc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Gc)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Vc)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===td||s===ed||s===nd||s===id)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===td)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===ed)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===nd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===id)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===ad||s===sd||s===rd||s===od||s===ld||s===Xc||s===cd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(s===ad||s===sd)return h===Fe?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===rd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(s===od)return c.COMPRESSED_R11_EAC;if(s===ld)return c.COMPRESSED_SIGNED_R11_EAC;if(s===Xc)return c.COMPRESSED_RG11_EAC;if(s===cd)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===ud||s===fd||s===hd||s===dd||s===pd||s===md||s===gd||s===_d||s===vd||s===xd||s===Sd||s===Md||s===yd||s===Ed)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(s===ud)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===fd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===hd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===dd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===pd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===md)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===gd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===_d)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===vd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===xd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Sd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Md)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===yd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Ed)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===bd||s===Td||s===Ad)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(s===bd)return h===Fe?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Td)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Ad)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Rd||s===Cd||s===Wc||s===wd)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(s===Rd)return c.COMPRESSED_RED_RGTC1_EXT;if(s===Cd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Wc)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===wd)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===jo?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const pA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mA=`
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

}`;class gA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i){if(this.texture===null){const s=new pv(t.texture);(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,s=new Gn({vertexShader:pA,fragmentShader:mA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new ji(new jc(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class _A extends cs{constructor(t,i){super();const s=this;let l=null,c=1,h=null,p="local-floor",m=1,d=null,x=null,v=null,_=null,E=null,R=null;const N=typeof XRWebGLBinding<"u",y=new gA,S={},I=i.getContextAttributes();let B=null,D=null;const U=[],C=[],P=new ie;let b=null,O=null;const W=new Ei;W.viewport=new rn;const q=new Ei;q.viewport=new rn;const Q=[W,q],lt=new by;let Y=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(it){let _t=U[it];return _t===void 0&&(_t=new Mh,U[it]=_t),_t.getTargetRaySpace()},this.getControllerGrip=function(it){let _t=U[it];return _t===void 0&&(_t=new Mh,U[it]=_t),_t.getGripSpace()},this.getHand=function(it){let _t=U[it];return _t===void 0&&(_t=new Mh,U[it]=_t),_t.getHandSpace()};function F(it){const _t=C.indexOf(it.inputSource);if(_t===-1)return;const Tt=U[_t];Tt!==void 0&&(Tt.update(it.inputSource,it.frame,d||h),Tt.dispatchEvent({type:it.type,data:it.inputSource}))}function H(){l.removeEventListener("select",F),l.removeEventListener("selectstart",F),l.removeEventListener("selectend",F),l.removeEventListener("squeeze",F),l.removeEventListener("squeezestart",F),l.removeEventListener("squeezeend",F),l.removeEventListener("end",H),l.removeEventListener("inputsourceschange",ct);for(let it=0;it<U.length;it++){const _t=C[it];_t!==null&&(C[it]=null,U[it].disconnect(_t))}Y=null,j=null,y.reset();for(const it in S)delete S[it];if(t.setRenderTarget(B),E=null,_=null,v=null,l=null,D=null,Xt.stop(),s.isPresenting=!1,t.setPixelRatio(b),t.setSize(P.width,P.height,!1),O!==null){const it=O.camera;it.fov=O.fov,it.zoom=O.zoom,it.updateProjectionMatrix(),O=null}s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(it){c=it,s.isPresenting===!0&&ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(it){p=it,s.isPresenting===!0&&ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||h},this.setReferenceSpace=function(it){d=it},this.getBaseLayer=function(){return _!==null?_:E},this.getBinding=function(){return v===null&&N&&(v=new XRWebGLBinding(l,i)),v},this.getFrame=function(){return R},this.getSession=function(){return l},this.setSession=async function(it){if(l=it,l!==null){if(B=t.getRenderTarget(),l.addEventListener("select",F),l.addEventListener("selectstart",F),l.addEventListener("selectend",F),l.addEventListener("squeeze",F),l.addEventListener("squeezestart",F),l.addEventListener("squeezeend",F),l.addEventListener("end",H),l.addEventListener("inputsourceschange",ct),I.xrCompatible!==!0&&await i.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(P),N&&"createProjectionLayer"in XRWebGLBinding.prototype){let Tt=null,te=null,Bt=null;I.depth&&(Bt=I.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Tt=I.stencil?Ps:wa,te=I.stencil?jo:Ji);const le={colorFormat:i.RGBA8,depthFormat:Bt,scaleFactor:c};v=this.getBinding(),_=v.createProjectionLayer(le),l.updateRenderState({layers:[_]}),t.setPixelRatio(1),t.setSize(_.textureWidth,_.textureHeight,!1),D=new Ai(_.textureWidth,_.textureHeight,{format:Ti,type:bi,depthTexture:new tl(_.textureWidth,_.textureHeight,te,void 0,void 0,void 0,void 0,void 0,void 0,Tt),stencilBuffer:I.stencil,colorSpace:t.outputColorSpace,samples:I.antialias?4:0,resolveDepthBuffer:_.ignoreDepthValues===!1,resolveStencilBuffer:_.ignoreDepthValues===!1,storeMultisampledDepthBuffer:_.ignoreDepthValues===!1,storeMultisampledStencilBuffer:_.ignoreDepthValues===!1})}else{const Tt={antialias:I.antialias,alpha:!0,depth:I.depth,stencil:I.stencil,framebufferScaleFactor:c};E=new XRWebGLLayer(l,i,Tt),l.updateRenderState({baseLayer:E}),t.setPixelRatio(1),t.setSize(E.framebufferWidth,E.framebufferHeight,!1),D=new Ai(E.framebufferWidth,E.framebufferHeight,{format:Ti,type:bi,colorSpace:t.outputColorSpace,stencilBuffer:I.stencil,resolveDepthBuffer:E.ignoreDepthValues===!1,resolveStencilBuffer:E.ignoreDepthValues===!1,storeMultisampledDepthBuffer:E.ignoreDepthValues===!1,storeMultisampledStencilBuffer:E.ignoreDepthValues===!1})}D.isXRRenderTarget=!0,this.setFoveation(m),d=null,h=await l.requestReferenceSpace(p),Xt.setContext(l),Xt.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function ct(it){for(let _t=0;_t<it.removed.length;_t++){const Tt=it.removed[_t],te=C.indexOf(Tt);te>=0&&(C[te]=null,U[te].disconnect(Tt))}for(let _t=0;_t<it.added.length;_t++){const Tt=it.added[_t];let te=C.indexOf(Tt);if(te===-1){for(let le=0;le<U.length;le++)if(le>=C.length){C.push(Tt),te=le;break}else if(C[le]===null){C[le]=Tt,te=le;break}if(te===-1)break}const Bt=U[te];Bt&&Bt.connect(Tt)}}const st=new et,ht=new et;function w(it,_t,Tt){st.setFromMatrixPosition(_t.matrixWorld),ht.setFromMatrixPosition(Tt.matrixWorld);const te=st.distanceTo(ht),Bt=_t.projectionMatrix.elements,le=Tt.projectionMatrix.elements,$e=Bt[14]/(Bt[10]-1),ae=Bt[14]/(Bt[10]+1),xe=(Bt[9]+1)/Bt[5],Ne=(Bt[9]-1)/Bt[5],me=(Bt[8]-1)/Bt[0],Xe=(le[8]+1)/le[0],tn=$e*me,En=$e*Xe,We=te/(-me+Xe),en=We*-me;if(_t.matrixWorld.decompose(it.position,it.quaternion,it.scale),it.translateX(en),it.translateZ(We),it.matrixWorld.compose(it.position,it.quaternion,it.scale),it.matrixWorldInverse.copy(it.matrixWorld).invert(),Bt[10]===-1)it.projectionMatrix.copy(_t.projectionMatrix),it.projectionMatrixInverse.copy(_t.projectionMatrixInverse);else{const X=$e+We,Le=ae+We,we=tn-en,L=En+(te-en),M=xe*ae/Le*X,K=Ne*ae/Le*X;it.projectionMatrix.makePerspective(we,L,M,K,X,Le),it.projectionMatrixInverse.copy(it.projectionMatrix).invert()}}function J(it,_t){_t===null?it.matrixWorld.copy(it.matrix):it.matrixWorld.multiplyMatrices(_t.matrixWorld,it.matrix),it.matrixWorldInverse.copy(it.matrixWorld).invert()}this.updateCamera=function(it){if(l===null)return;let _t=it.near,Tt=it.far;y.texture!==null&&(y.depthNear>0&&(_t=y.depthNear),y.depthFar>0&&(Tt=y.depthFar)),lt.near=q.near=W.near=_t,lt.far=q.far=W.far=Tt,(Y!==lt.near||j!==lt.far)&&(l.updateRenderState({depthNear:lt.near,depthFar:lt.far}),Y=lt.near,j=lt.far),lt.layers.mask=it.layers.mask|6,W.layers.mask=lt.layers.mask&-5,q.layers.mask=lt.layers.mask&-3;const te=it.parent,Bt=lt.cameras;J(lt,te);for(let le=0;le<Bt.length;le++)J(Bt[le],te);Bt.length===2?w(lt,W,q):lt.projectionMatrix.copy(W.projectionMatrix),O===null&&it.isPerspectiveCamera&&(O={camera:it,fov:it.fov,zoom:it.zoom}),gt(it,lt,te)};function gt(it,_t,Tt){Tt===null?it.matrix.copy(_t.matrixWorld):(it.matrix.copy(Tt.matrixWorld),it.matrix.invert(),it.matrix.multiply(_t.matrixWorld)),it.matrix.decompose(it.position,it.quaternion,it.scale),it.updateMatrixWorld(!0),it.projectionMatrix.copy(_t.projectionMatrix),it.projectionMatrixInverse.copy(_t.projectionMatrixInverse),it.isPerspectiveCamera&&(it.fov=$o*2*Math.atan(1/it.projectionMatrix.elements[5]),it.zoom=1)}this.getCamera=function(){return lt},this.getFoveation=function(){if(!(_===null&&E===null))return m},this.setFoveation=function(it){m=it,_!==null&&(_.fixedFoveation=it),E!==null&&E.fixedFoveation!==void 0&&(E.fixedFoveation=it)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(lt)},this.getCameraTexture=function(it){return S[it]};let Et=null;function Nt(it,_t){if(x=_t.getViewerPose(d||h),R=_t,x!==null){const Tt=x.views;E!==null&&(t.setRenderTargetFramebuffer(D,E.framebuffer),t.setRenderTarget(D));let te=!1;Tt.length!==lt.cameras.length&&(lt.cameras.length=0,te=!0);for(let ae=0;ae<Tt.length;ae++){const xe=Tt[ae];let Ne=null;if(E!==null)Ne=E.getViewport(xe);else{const Xe=v.getViewSubImage(_,xe);Ne=Xe.viewport,ae===0&&(t.setRenderTargetTextures(D,Xe.colorTexture,Xe.depthStencilTexture),t.setRenderTarget(D))}let me=Q[ae];me===void 0&&(me=new Ei,me.layers.enable(ae),me.viewport=new rn,Q[ae]=me),me.matrix.fromArray(xe.transform.matrix),me.matrix.decompose(me.position,me.quaternion,me.scale),me.projectionMatrix.fromArray(xe.projectionMatrix),me.projectionMatrixInverse.copy(me.projectionMatrix).invert(),me.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),ae===0&&(lt.matrix.copy(me.matrix),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale)),te===!0&&lt.cameras.push(me)}const Bt=l.enabledFeatures;if(Bt&&Bt.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&N){v=s.getBinding();const ae=v.getDepthInformation(Tt[0]);ae&&ae.isValid&&ae.texture&&y.init(ae,l.renderState)}if(Bt&&Bt.includes("camera-access")&&N){t.state.unbindTexture(),v=s.getBinding();for(let ae=0;ae<Tt.length;ae++){const xe=Tt[ae].camera;if(xe){let Ne=S[xe];Ne||(Ne=new pv,S[xe]=Ne);const me=v.getCameraImage(xe);Ne.sourceTexture=me}}}}for(let Tt=0;Tt<U.length;Tt++){const te=C[Tt],Bt=U[Tt];te!==null&&Bt!==void 0&&Bt.update(te,_t,d||h)}Et&&Et(it,_t),_t.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:_t}),R=null}const Xt=new vv;Xt.setAnimationLoop(Nt),this.setAnimationLoop=function(it){Et=it},this.dispose=function(){}}}const vA=new cn,Tv=new re;Tv.set(-1,0,0,0,1,0,0,0,1);function xA(r,t){function i(y,S){y.matrixAutoUpdate===!0&&y.updateMatrix(),S.value.copy(y.matrix)}function s(y,S){S.color.getRGB(y.fogColor.value,mv(r)),S.isFog?(y.fogNear.value=S.near,y.fogFar.value=S.far):S.isFogExp2&&(y.fogDensity.value=S.density)}function l(y,S,I,B,D){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?c(y,S):S.isMeshLambertMaterial?(c(y,S),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(c(y,S),v(y,S)):S.isMeshPhongMaterial?(c(y,S),x(y,S),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(c(y,S),_(y,S),S.isMeshPhysicalMaterial&&E(y,S,D)):S.isMeshMatcapMaterial?(c(y,S),R(y,S)):S.isMeshDepthMaterial?c(y,S):S.isMeshDistanceMaterial?(c(y,S),N(y,S)):S.isMeshNormalMaterial?c(y,S):S.isLineBasicMaterial?(h(y,S),S.isLineDashedMaterial&&p(y,S)):S.isPointsMaterial?m(y,S,I,B):S.isSpriteMaterial?d(y,S):S.isShadowMaterial?(y.color.value.copy(S.color),y.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(y,S){y.opacity.value=S.opacity,S.color&&y.diffuse.value.copy(S.color),S.emissive&&y.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(y.map.value=S.map,i(S.map,y.mapTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,i(S.alphaMap,y.alphaMapTransform)),S.bumpMap&&(y.bumpMap.value=S.bumpMap,i(S.bumpMap,y.bumpMapTransform),y.bumpScale.value=S.bumpScale,S.side===jn&&(y.bumpScale.value*=-1)),S.normalMap&&(y.normalMap.value=S.normalMap,i(S.normalMap,y.normalMapTransform),y.normalScale.value.copy(S.normalScale),S.side===jn&&y.normalScale.value.negate()),S.displacementMap&&(y.displacementMap.value=S.displacementMap,i(S.displacementMap,y.displacementMapTransform),y.displacementScale.value=S.displacementScale,y.displacementBias.value=S.displacementBias),S.emissiveMap&&(y.emissiveMap.value=S.emissiveMap,i(S.emissiveMap,y.emissiveMapTransform)),S.specularMap&&(y.specularMap.value=S.specularMap,i(S.specularMap,y.specularMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest);const I=t.get(S),B=I.envMap,D=I.envMapRotation;B&&(y.envMap.value=B,y.envMapRotation.value.setFromMatrix4(vA.makeRotationFromEuler(D)).transpose(),B.isCubeTexture&&B.isRenderTargetTexture===!1&&y.envMapRotation.value.premultiply(Tv),y.reflectivity.value=S.reflectivity,y.ior.value=S.ior,y.refractionRatio.value=S.refractionRatio),S.lightMap&&(y.lightMap.value=S.lightMap,y.lightMapIntensity.value=S.lightMapIntensity,i(S.lightMap,y.lightMapTransform)),S.aoMap&&(y.aoMap.value=S.aoMap,y.aoMapIntensity.value=S.aoMapIntensity,i(S.aoMap,y.aoMapTransform))}function h(y,S){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,S.map&&(y.map.value=S.map,i(S.map,y.mapTransform))}function p(y,S){y.dashSize.value=S.dashSize,y.totalSize.value=S.dashSize+S.gapSize,y.scale.value=S.scale}function m(y,S,I,B){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,y.size.value=S.size*I,y.scale.value=B*.5,S.map&&(y.map.value=S.map,i(S.map,y.uvTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,i(S.alphaMap,y.alphaMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest)}function d(y,S){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,y.rotation.value=S.rotation,S.map&&(y.map.value=S.map,i(S.map,y.mapTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,i(S.alphaMap,y.alphaMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest)}function x(y,S){y.specular.value.copy(S.specular),y.shininess.value=Math.max(S.shininess,1e-4)}function v(y,S){S.gradientMap&&(y.gradientMap.value=S.gradientMap)}function _(y,S){y.metalness.value=S.metalness,S.metalnessMap&&(y.metalnessMap.value=S.metalnessMap,i(S.metalnessMap,y.metalnessMapTransform)),y.roughness.value=S.roughness,S.roughnessMap&&(y.roughnessMap.value=S.roughnessMap,i(S.roughnessMap,y.roughnessMapTransform)),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)}function E(y,S,I){y.ior.value=S.ior,S.sheen>0&&(y.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),y.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(y.sheenColorMap.value=S.sheenColorMap,i(S.sheenColorMap,y.sheenColorMapTransform)),S.sheenRoughnessMap&&(y.sheenRoughnessMap.value=S.sheenRoughnessMap,i(S.sheenRoughnessMap,y.sheenRoughnessMapTransform))),S.clearcoat>0&&(y.clearcoat.value=S.clearcoat,y.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(y.clearcoatMap.value=S.clearcoatMap,i(S.clearcoatMap,y.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,i(S.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(y.clearcoatNormalMap.value=S.clearcoatNormalMap,i(S.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===jn&&y.clearcoatNormalScale.value.negate())),S.dispersion>0&&(y.dispersion.value=S.dispersion),S.retroreflectivity>0&&(y.retroreflectivity.value=S.retroreflectivity),S.iridescence>0&&(y.iridescence.value=S.iridescence,y.iridescenceIOR.value=S.iridescenceIOR,y.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(y.iridescenceMap.value=S.iridescenceMap,i(S.iridescenceMap,y.iridescenceMapTransform)),S.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=S.iridescenceThicknessMap,i(S.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),S.transmission>0&&(y.transmission.value=S.transmission,y.transmissionSamplerMap.value=I.texture,y.transmissionSamplerSize.value.set(I.width,I.height),S.transmissionMap&&(y.transmissionMap.value=S.transmissionMap,i(S.transmissionMap,y.transmissionMapTransform)),y.thickness.value=S.thickness,S.thicknessMap&&(y.thicknessMap.value=S.thicknessMap,i(S.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=S.attenuationDistance,y.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(y.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(y.anisotropyMap.value=S.anisotropyMap,i(S.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=S.specularIntensity,y.specularColor.value.copy(S.specularColor),S.specularColorMap&&(y.specularColorMap.value=S.specularColorMap,i(S.specularColorMap,y.specularColorMapTransform)),S.specularIntensityMap&&(y.specularIntensityMap.value=S.specularIntensityMap,i(S.specularIntensityMap,y.specularIntensityMapTransform))}function R(y,S){S.matcap&&(y.matcap.value=S.matcap)}function N(y,S){const I=t.get(S).light;y.referencePosition.value.setFromMatrixPosition(I.matrixWorld),y.nearDistance.value=I.shadow.camera.near,y.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function SA(r,t,i,s){let l={},c={},h=[];const p=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(D,U){const C=U.program;s.uniformBlockBinding(D,C)}function d(D,U){let C=l[D.id];C===void 0&&(y(D),C=x(D),l[D.id]=C,D.addEventListener("dispose",I));const P=U.program;s.updateUBOMapping(D,P);const b=t.render.frame;c[D.id]!==b&&(_(D),c[D.id]=b)}function x(D){const U=v();D.__bindingPointIndex=U;const C=r.createBuffer(),P=D.__size,b=D.usage;return r.bindBuffer(r.UNIFORM_BUFFER,C),r.bufferData(r.UNIFORM_BUFFER,P,b),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,U,C),C}function v(){for(let D=0;D<p;D++)if(h.indexOf(D)===-1)return h.push(D),D;return Ce("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(D){const U=l[D.id],C=D.uniforms,P=D.__cache;r.bindBuffer(r.UNIFORM_BUFFER,U);for(let b=0,O=C.length;b<O;b++){const W=C[b];if(Array.isArray(W))for(let q=0,Q=W.length;q<Q;q++)E(W[q],b,q,P);else E(W,b,0,P)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function E(D,U,C,P){if(N(D,U,C,P)===!0){const b=D.__offset,O=D.value;if(Array.isArray(O)){let W=0;for(let q=0;q<O.length;q++){const Q=O[q],lt=S(Q);R(Q,D.__data,W),typeof Q!="number"&&typeof Q!="boolean"&&!Q.isMatrix3&&!ArrayBuffer.isView(Q)&&(W+=lt.storage/Float32Array.BYTES_PER_ELEMENT)}}else R(O,D.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,b,D.__data)}}function R(D,U,C){typeof D=="number"||typeof D=="boolean"?U[0]=D:D.isMatrix3?(U[0]=D.elements[0],U[1]=D.elements[1],U[2]=D.elements[2],U[3]=0,U[4]=D.elements[3],U[5]=D.elements[4],U[6]=D.elements[5],U[7]=0,U[8]=D.elements[6],U[9]=D.elements[7],U[10]=D.elements[8],U[11]=0):ArrayBuffer.isView(D)?U.set(new D.constructor(D.buffer,D.byteOffset,U.length)):D.toArray(U,C)}function N(D,U,C,P){const b=D.value,O=U+"_"+C;if(P[O]===void 0)return typeof b=="number"||typeof b=="boolean"?P[O]=b:ArrayBuffer.isView(b)?P[O]=b.slice():P[O]=b.clone(),!0;{const W=P[O];if(typeof b=="number"||typeof b=="boolean"){if(W!==b)return P[O]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(W.equals(b)===!1)return W.copy(b),!0}}return!1}function y(D){const U=D.uniforms;let C=0;const P=16;for(let O=0,W=U.length;O<W;O++){const q=Array.isArray(U[O])?U[O]:[U[O]];for(let Q=0,lt=q.length;Q<lt;Q++){const Y=q[Q],j=Array.isArray(Y.value)?Y.value:[Y.value];for(let F=0,H=j.length;F<H;F++){const ct=j[F],st=S(ct),ht=C%P,w=ht%st.boundary,J=ht+w;C+=w,J!==0&&P-J<st.storage&&(C+=P-J),Y.__data=new Float32Array(st.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=C,C+=st.storage}}}const b=C%P;return b>0&&(C+=P-b),D.__size=C,D.__cache={},this}function S(D){const U={boundary:0,storage:0};return typeof D=="number"||typeof D=="boolean"?(U.boundary=4,U.storage=4):D.isVector2?(U.boundary=8,U.storage=8):D.isVector3||D.isColor?(U.boundary=16,U.storage=12):D.isVector4?(U.boundary=16,U.storage=16):D.isMatrix3?(U.boundary=48,U.storage=48):D.isMatrix4?(U.boundary=64,U.storage=64):D.isTexture?ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(D)?(U.boundary=16,U.storage=D.byteLength):ne("WebGLRenderer: Unsupported uniform value type.",D),U}function I(D){const U=D.target;U.removeEventListener("dispose",I);const C=h.indexOf(U.__bindingPointIndex);h.splice(C,1),r.deleteBuffer(l[U.id]),delete l[U.id],delete c[U.id]}function B(){for(const D in l)r.deleteBuffer(l[D]);h=[],l={},c={}}return{bind:m,update:d,dispose:B}}const MA=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Xi=null;function yA(){return Xi===null&&(Xi=new dy(MA,16,16,Bs,Ii),Xi.name="DFG_LUT",Xi.minFilter=An,Xi.magFilter=An,Xi.wrapS=Pi,Xi.wrapT=Pi,Xi.generateMipmaps=!1,Xi.needsUpdate=!0),Xi}class EA{constructor(t={}){const{canvas:i=RM(),context:s=null,depth:l=!0,stencil:c=!1,alpha:h=!1,antialias:p=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:d=!1,powerPreference:x="default",failIfMajorPerformanceCaveat:v=!1,reversedDepthBuffer:_=!1,outputBufferType:E=bi}=t;this.isWebGLRenderer=!0;let R;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");R=s.getContextAttributes().alpha}else R=h;const N=E,y=new Set([Vd,Gd,Hd]),S=new Set([bi,Ji,Jo,jo,zd,Bd]),I=new Uint32Array(4),B=new Int32Array(4),D=new et;let U=null,C=null;const P=[],b=[];let O=null;this.domElement=i,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ki,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const W=this;let q=!1,Q=null,lt=null,Y=null,j=null;this._outputColorSpace=yi;let F=0,H=0,ct=null,st=-1,ht=null;const w=new rn,J=new rn;let gt=null;const Et=new Oe(0);let Nt=0,Xt=i.width,it=i.height,_t=1,Tt=null,te=null;const Bt=new rn(0,0,Xt,it),le=new rn(0,0,Xt,it);let $e=!1;const ae=new hv;let xe=!1,Ne=!1;const me=new cn,Xe=new et,tn=new rn,En={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function en(){return ct===null?_t:1}let X=s;function Le(T,G){return i.getContext(T,G)}let we,L,M,K,rt,dt,bt,wt,pt,mt,At,Ht,Lt,Dt,Qt,Jt,ee,k,Rt,xt,Ct,It,yt;try{const T={alpha:!0,depth:l,stencil:c,antialias:p,premultipliedAlpha:m,preserveDrawingBuffer:d,powerPreference:x,failIfMajorPerformanceCaveat:v};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Id}`),i.addEventListener("webglcontextlost",Be,!1),i.addEventListener("webglcontextrestored",be,!1),i.addEventListener("webglcontextcreationerror",kn,!1),X===null){const G="webgl2";if(X=Le(G,T),X===null)throw Le(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Kt()}catch(T){throw i.removeEventListener("webglcontextlost",Be,!1),i.removeEventListener("webglcontextrestored",be,!1),i.removeEventListener("webglcontextcreationerror",kn,!1),Ce("WebGLRenderer: "+T.message),T}function Kt(){we=new yT(X),we.init(),Ct=new dA(X,we),L=new hT(X,we,t,Ct),M=new fA(X,we),L.reversedDepthBuffer&&_&&M.buffers.depth.setReversed(!0),lt=X.createFramebuffer(),Y=X.createFramebuffer(),j=X.createFramebuffer(),K=new TT(X),rt=new J1,dt=new hA(X,we,M,rt,L,Ct,K),bt=new MT(W),wt=new Ry(X),It=new uT(X,wt),pt=new ET(X,wt,K,It),mt=new RT(X,pt,wt,It,K),k=new AT(X,L,dt),Qt=new dT(rt),At=new Q1(W,bt,we,L,It,Qt),Ht=new xA(W,rt),Lt=new $1,Dt=new sA(we),ee=new cT(W,bt,M,mt,R,m),Jt=new uA(W,mt,L),yt=new SA(X,K,L,M),Rt=new fT(X,we,K),xt=new bT(X,we,K),K.programs=At.programs,W.capabilities=L,W.extensions=we,W.properties=rt,W.renderLists=Lt,W.shadowMap=Jt,W.state=M,W.info=K}N!==bi&&(O=new wT(N,i.width,i.height,p,l,c));const Wt=new _A(W,X);this.xr=Wt,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){const T=we.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=we.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return _t},this.setPixelRatio=function(T){T!==void 0&&(_t=T,this.setSize(Xt,it,!1))},this.getSize=function(T){return T.set(Xt,it)},this.setSize=function(T,G,ut=!0){if(Wt.isPresenting){ne("WebGLRenderer: Can't change size while VR device is presenting.");return}Xt=T,it=G,i.width=Math.floor(T*_t),i.height=Math.floor(G*_t),ut===!0&&(i.style.width=T+"px",i.style.height=G+"px"),O!==null&&O.setSize(i.width,i.height),this.setViewport(0,0,T,G)},this.getDrawingBufferSize=function(T){return T.set(Xt*_t,it*_t).floor()},this.setDrawingBufferSize=function(T,G,ut){Xt=T,it=G,_t=ut,i.width=Math.floor(T*ut),i.height=Math.floor(G*ut),this.setViewport(0,0,T,G)},this.setEffects=function(T){if(N===bi){Ce("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let G=0;G<T.length;G++)if(T[G].isOutputPass===!0){ne("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}O.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(w)},this.getViewport=function(T){return T.copy(Bt)},this.setViewport=function(T,G,ut,$){T.isVector4?Bt.set(T.x,T.y,T.z,T.w):Bt.set(T,G,ut,$),M.viewport(w.copy(Bt).multiplyScalar(_t).round())},this.getScissor=function(T){return T.copy(le)},this.setScissor=function(T,G,ut,$){T.isVector4?le.set(T.x,T.y,T.z,T.w):le.set(T,G,ut,$),M.scissor(J.copy(le).multiplyScalar(_t).round())},this.getScissorTest=function(){return $e},this.setScissorTest=function(T){M.setScissorTest($e=T)},this.setOpaqueSort=function(T){Tt=T},this.setTransparentSort=function(T){te=T},this.getClearColor=function(T){return T.copy(ee.getClearColor())},this.setClearColor=function(){ee.setClearColor(...arguments)},this.getClearAlpha=function(){return ee.getClearAlpha()},this.setClearAlpha=function(){ee.setClearAlpha(...arguments)},this.clear=function(T=!0,G=!0,ut=!0){let $=0;if(T){let tt=!1;if(ct!==null){const Ot=ct.texture.format;tt=y.has(Ot)}if(tt){const Ot=ct.texture.type,Gt=S.has(Ot),Ut=ee.getClearColor(),Ft=ee.getClearAlpha(),zt=Ut.r,oe=Ut.g,pe=Ut.b;Gt?(I[0]=zt,I[1]=oe,I[2]=pe,I[3]=Ft,X.clearBufferuiv(X.COLOR,0,I)):(B[0]=zt,B[1]=oe,B[2]=pe,B[3]=Ft,X.clearBufferiv(X.COLOR,0,B))}else $|=X.COLOR_BUFFER_BIT}G&&($|=X.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ut&&($|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&X.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),Q=T},this.dispose=function(){i.removeEventListener("webglcontextlost",Be,!1),i.removeEventListener("webglcontextrestored",be,!1),i.removeEventListener("webglcontextcreationerror",kn,!1),ee.dispose(),Lt.dispose(),Dt.dispose(),rt.dispose(),bt.dispose(),mt.dispose(),It.dispose(),yt.dispose(),At.dispose(),Wt.dispose(),Wt.removeEventListener("sessionstart",un),Wt.removeEventListener("sessionend",Rn),Xn.stop()};function Be(T){T.preventDefault(),Y0("WebGLRenderer: Context Lost."),q=!0}function be(){Y0("WebGLRenderer: Context Restored."),q=!1;const T=K.autoReset,G=Jt.enabled,ut=Jt.autoUpdate,$=Jt.needsUpdate,tt=Jt.type;Kt(),K.autoReset=T,Jt.enabled=G,Jt.autoUpdate=ut,Jt.needsUpdate=$,Jt.type=tt}function kn(T){Ce("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function $n(T){const G=T.target;G.removeEventListener("dispose",$n),Xr(G)}function Xr(T){Wr(T),rt.remove(T)}function Wr(T){const G=rt.get(T).programs;G!==void 0&&(G.forEach(function(ut){At.releaseProgram(ut)}),T.isShaderMaterial&&At.releaseShaderCache(T))}this.renderBufferDirect=function(T,G,ut,$,tt,Ot){G===null&&(G=En);const Gt=tt.isMesh&&tt.matrixWorld.determinantAffine()<0,Ut=Na(T,G,ut,$,tt);M.setMaterial($,Gt);let Ft=ut.index,zt=1;if($.wireframe===!0){if(Ft=pt.getWireframeAttribute(ut),Ft===void 0)return;zt=2}const oe=ut.drawRange,pe=ut.attributes.position;let qt=oe.start*zt,Te=(oe.start+oe.count)*zt;Ot!==null&&(qt=Math.max(qt,Ot.start*zt),Te=Math.min(Te,(Ot.start+Ot.count)*zt)),Ft!==null?(qt=Math.max(qt,0),Te=Math.min(Te,Ft.count)):pe!=null&&(qt=Math.max(qt,0),Te=Math.min(Te,pe.count));const Ze=Te-qt;if(Ze<0||Ze===1/0)return;It.setup(tt,$,Ut,ut,Ft);let qe,fe=Rt;if(Ft!==null&&(qe=wt.get(Ft),fe=xt,fe.setIndex(qe)),tt.isMesh)$.wireframe===!0?(M.setLineWidth($.wireframeLinewidth*en()),fe.setMode(X.LINES)):fe.setMode(X.TRIANGLES);else if(tt.isLine){let hn=$.linewidth;hn===void 0&&(hn=1),M.setLineWidth(hn*en()),tt.isLineSegments?fe.setMode(X.LINES):tt.isLineLoop?fe.setMode(X.LINE_LOOP):fe.setMode(X.LINE_STRIP)}else tt.isPoints?fe.setMode(X.POINTS):tt.isSprite&&fe.setMode(X.TRIANGLES);if(tt.isBatchedMesh)if(we.get("WEBGL_multi_draw"))fe.renderMultiDraw(tt._multiDrawStarts,tt._multiDrawCounts,tt._multiDrawCount);else{const hn=tt._multiDrawStarts,Vt=tt._multiDrawCounts,vn=tt._multiDrawCount,he=Ft?wt.get(Ft).bytesPerElement:1,In=rt.get($).currentProgram.getUniforms();for(let ti=0;ti<vn;ti++)In.setValue(X,"_gl_DrawID",ti),fe.render(hn[ti]/he,Vt[ti])}else if(tt.isInstancedMesh)fe.renderInstances(qt,Ze,tt.count);else if(ut.isInstancedBufferGeometry){const hn=ut._maxInstanceCount!==void 0?ut._maxInstanceCount:1/0,Vt=Math.min(ut.instanceCount,hn);fe.renderInstances(qt,Ze,Vt)}else fe.render(qt,Ze)};function qr(T,G,ut,$){Q!==null&&T.isNodeMaterial&&Q.setObject($,T),xe===!0&&Qt.setState(T,ut,!1),T.transparent===!0&&T.side===ba&&T.forceSinglePass===!1?(T.side=jn,T.needsUpdate=!0,Ua(T,G,$),T.side=Fs,T.needsUpdate=!0,Ua(T,G,$),T.side=ba):Ua(T,G,$)}this.compile=function(T,G,ut=null){ut===null&&(ut=T),Q!==null&&Q.renderStart(T,G,ut),C=Dt.get(ut),C.init(G),b.push(C),ut.traverseVisible(function(tt){tt.isLight&&tt.layers.test(G.layers)&&(C.pushLight(tt),tt.castShadow&&C.pushShadow(tt))}),T!==ut&&T.traverseVisible(function(tt){tt.isLight&&tt.layers.test(G.layers)&&(C.pushLight(tt),tt.castShadow&&C.pushShadow(tt))}),C.setupLights(),Q!==null&&Q.updateLights(C.state.lightsArray),Ne=this.localClippingEnabled,xe=Qt.init(this.clippingPlanes,Ne),xe===!0&&Qt.setGlobalState(this.clippingPlanes,G),Q!==null&&Jt.render(C.state.shadowsArray,ut,G);const $=new Set;return T.traverse(function(tt){if(!(tt.isMesh||tt.isPoints||tt.isLine||tt.isSprite))return;const Ot=tt.material;if(Ot)if(Array.isArray(Ot))for(let Gt=0;Gt<Ot.length;Gt++){const Ut=Ot[Gt];qr(Ut,ut,G,tt),$.add(Ut)}else qr(Ot,ut,G,tt),$.add(Ot)}),C=b.pop(),Q!==null&&Q.renderEnd(),$},this.compileAsync=function(T,G,ut=null){const $=this.compile(T,G,ut);return new Promise(tt=>{function Ot(){if($.forEach(function(Gt){const Ft=rt.get(Gt).currentProgram;(Ft===void 0||Ft.isReady())&&$.delete(Gt)}),$.size===0){tt(T);return}setTimeout(Ot,10)}we.get("KHR_parallel_shader_compile")!==null?Ot():setTimeout(Ot,10)})};let Gs=null;function Fi(T){Gs&&Gs(T)}function un(){Xn.stop()}function Rn(){Xn.start()}const Xn=new vv;Xn.setAnimationLoop(Fi),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(T){Gs=T,Wt.setAnimationLoop(T),T===null?Xn.stop():Xn.start()},Wt.addEventListener("sessionstart",un),Wt.addEventListener("sessionend",Rn),this.render=function(T,G){if(G!==void 0&&G.isCamera!==!0){Ce("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(q===!0)return;Q!==null&&Q.renderStart(T,G);const ut=Wt.enabled===!0&&Wt.isPresenting===!0,$=O!==null&&(ct===null||ut)&&O.begin(W,ct);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),Wt.enabled===!0&&Wt.isPresenting===!0&&(O===null||O.isCompositing()===!1)&&(Wt.cameraAutoUpdate===!0&&Wt.updateCamera(G),G=Wt.getCamera()),T.isScene===!0&&T.onBeforeRender(W,T,G,ct),C=Dt.get(T,b.length),C.init(G),C.state.textureUnits=dt.getTextureUnits(),b.push(C),me.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),ae.setFromProjectionMatrix(me,Zi,G.reversedDepth),Ne=this.localClippingEnabled,xe=Qt.init(this.clippingPlanes,Ne),U=Lt.get(T,P.length),U.init(),P.push(U),Wt.enabled===!0&&Wt.isPresenting===!0){const Gt=W.xr.getDepthSensingMesh();Gt!==null&&us(Gt,G,-1/0,W.sortObjects)}us(T,G,0,W.sortObjects),U.finish(),Q!==null&&Q.updateLights(C.state.lightsArray),W.sortObjects===!0&&U.sort(Tt,te),We=Wt.enabled===!1||Wt.isPresenting===!1||Wt.hasDepthSensing()===!1,We&&ee.addToRenderList(U,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),xe===!0&&Qt.beginShadows();const tt=C.state.shadowsArray;if(Jt.render(tt,T,G),xe===!0&&Qt.endShadows(),($&&O.hasRenderPass())===!1){const Gt=U.opaque,Ut=U.transmissive;if(C.setupLights(),G.isArrayCamera){const Ft=G.cameras;if(Ut.length>0)for(let zt=0,oe=Ft.length;zt<oe;zt++){const pe=Ft[zt];al(Gt,Ut,T,pe)}We&&ee.render(T);for(let zt=0,oe=Ft.length;zt<oe;zt++){const pe=Ft[zt];il(U,T,pe,pe.viewport)}}else Ut.length>0&&al(Gt,Ut,T,G),We&&ee.render(T),il(U,T,G)}ct!==null&&H===0&&(dt.updateMultisampleRenderTarget(ct),dt.updateRenderTargetMipmap(ct)),$&&O.end(W),T.isScene===!0&&T.onAfterRender(W,T,G),It.resetDefaultState(),st=-1,ht=null,b.pop(),b.length>0?(C=b[b.length-1],dt.setTextureUnits(C.state.textureUnits),xe===!0&&Qt.setGlobalState(W.clippingPlanes,C.state.camera)):C=null,P.pop(),P.length>0?U=P[P.length-1]:U=null,Q!==null&&Q.renderEnd()};function us(T,G,ut,$){if(T.visible===!1)return;if(T.layers.test(G.layers)){if(T.isGroup)ut=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(G);else if(T.isLightProbeGrid)C.pushLightProbeGrid(T);else if(T.isLight)C.pushLight(T),T.castShadow&&C.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(ae)){$&&tn.setFromMatrixPosition(T.matrixWorld).applyMatrix4(me);const Gt=mt.update(T),Ut=T.material;Ut.visible&&U.push(T,Gt,Ut,ut,tn.z,null,G)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(ae))){const Gt=mt.update(T),Ut=T.material;if($&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),tn.copy(T.boundingSphere.center)):(Gt.boundingSphere===null&&Gt.computeBoundingSphere(),tn.copy(Gt.boundingSphere.center)),tn.applyMatrix4(T.matrixWorld).applyMatrix4(me)),Array.isArray(Ut)){const Ft=Gt.groups;for(let zt=0,oe=Ft.length;zt<oe;zt++){const pe=Ft[zt],qt=Ut[pe.materialIndex];qt&&qt.visible&&U.push(T,Gt,qt,ut,tn.z,pe,G)}}else Ut.visible&&U.push(T,Gt,Ut,ut,tn.z,null,G)}}const Ot=T.children;for(let Gt=0,Ut=Ot.length;Gt<Ut;Gt++)us(Ot[Gt],G,ut,$)}function il(T,G,ut,$){const{opaque:tt,transmissive:Ot,transparent:Gt}=T;C.setupLightsView(ut),xe===!0&&Qt.setGlobalState(W.clippingPlanes,ut),$&&M.viewport(w.copy($)),tt.length>0&&fs(tt,G,ut),Ot.length>0&&fs(Ot,G,ut),Gt.length>0&&fs(Gt,G,ut),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function al(T,G,ut,$){if((ut.isScene===!0?ut.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[$.id]===void 0){const qt=we.has("EXT_color_buffer_half_float")||we.has("EXT_color_buffer_float");C.state.transmissionRenderTarget[$.id]=new Ai(1,1,{generateMipmaps:!0,type:qt?Ii:bi,minFilter:Os,samples:Math.max(4,L.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ee.workingColorSpace})}const Ot=C.state.transmissionRenderTarget[$.id],Gt=$.viewport||w;Ot.setSize(Gt.z*W.transmissionResolutionScale,Gt.w*W.transmissionResolutionScale);const Ut=W.getRenderTarget(),Ft=W.getActiveCubeFace(),zt=W.getActiveMipmapLevel();W.setRenderTarget(Ot),W.getClearColor(Et),Nt=W.getClearAlpha(),Nt<1&&W.setClearColor(16777215,.5),W.clear(),We&&ee.render(ut);const oe=W.toneMapping;W.toneMapping=Ki;const pe=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),C.setupLightsView($),xe===!0&&Qt.setGlobalState(W.clippingPlanes,$),fs(T,ut,$),dt.updateMultisampleRenderTarget(Ot),dt.updateRenderTargetMipmap(Ot),we.has("WEBGL_multisampled_render_to_texture")===!1){let qt=!1;for(let Te=0,Ze=G.length;Te<Ze;Te++){const qe=G[Te],{object:fe,geometry:hn,material:Vt,group:vn}=qe;if(Vt.side===ba&&fe.layers.test($.layers)){const he=Vt.side;Vt.side=jn,Vt.needsUpdate=!0,Da(fe,ut,$,hn,Vt,vn),Vt.side=he,Vt.needsUpdate=!0,qt=!0}}qt===!0&&(dt.updateMultisampleRenderTarget(Ot),dt.updateRenderTargetMipmap(Ot))}W.setRenderTarget(Ut,Ft,zt),W.setClearColor(Et,Nt),pe!==void 0&&($.viewport=pe),W.toneMapping=oe}function fs(T,G,ut){const $=G.isScene===!0?G.overrideMaterial:null;for(let tt=0,Ot=T.length;tt<Ot;tt++){const Gt=T[tt],{object:Ut,geometry:Ft,group:zt}=Gt;let oe=Gt.material;oe.allowOverride===!0&&$!==null&&(oe=$),Ut.layers.test(ut.layers)&&Da(Ut,G,ut,Ft,oe,zt)}}function Da(T,G,ut,$,tt,Ot){Q!==null&&tt.isNodeMaterial&&Q.setObject(T,tt),T.onBeforeRender(W,G,ut,$,tt,Ot),T.modelViewMatrix.multiplyMatrices(ut.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),tt.onBeforeRender(W,G,ut,$,T,Ot),tt.transparent===!0&&tt.side===ba&&tt.forceSinglePass===!1?(tt.side=jn,tt.needsUpdate=!0,W.renderBufferDirect(ut,G,$,tt,T,Ot),tt.side=Fs,tt.needsUpdate=!0,W.renderBufferDirect(ut,G,$,tt,T,Ot),tt.side=ba):W.renderBufferDirect(ut,G,$,tt,T,Ot),T.onAfterRender(W,G,ut,$,tt,Ot)}function Ua(T,G,ut){G.isScene!==!0&&(G=En);const $=rt.get(T),tt=C.state.lights,Ot=C.state.shadowsArray,Gt=tt.state.version,Ut=At.getParameters(T,tt.state,Ot,G,ut,C.state.lightProbeGridArray),Ft=At.getProgramCacheKey(Ut);let zt=$.programs;$.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?G.environment:null,$.fog=G.fog;const oe=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;$.envMap=bt.get(T.envMap||$.environment,oe),$.envMapRotation=$.environment!==null&&T.envMap===null?G.environmentRotation:T.envMapRotation,zt===void 0&&(T.addEventListener("dispose",$n),zt=new Map,$.programs=zt);let pe=zt.get(Ft);if(pe!==void 0){if($.currentProgram===pe&&$.lightsStateVersion===Gt)return ea(T,Ut),pe}else Ut.uniforms=At.getUniforms(T),Q!==null&&T.isNodeMaterial&&Q.build(T,ut,Ut),T.onBeforeCompile(Ut,W),pe=At.acquireProgram(Ut,Ft),zt.set(Ft,pe),$.uniforms=Ut.uniforms;const qt=$.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(qt.clippingPlanes=Qt.uniform),ea(T,Ut),$.needsLights=sl(T),$.lightsStateVersion=Gt,$.needsLights&&(qt.ambientLightColor.value=tt.state.ambient,qt.lightProbe.value=tt.state.probe,qt.sunLights.value=tt.state.sun,qt.sunLightShadows.value=tt.state.sunShadow,qt.directionalLights.value=tt.state.directional,qt.directionalLightShadows.value=tt.state.directionalShadow,qt.spotLights.value=tt.state.spot,qt.spotLightShadows.value=tt.state.spotShadow,qt.rectAreaLights.value=tt.state.rectArea,qt.ltc_1.value=tt.state.rectAreaLTC1,qt.ltc_2.value=tt.state.rectAreaLTC2,qt.pointLights.value=tt.state.point,qt.pointLightShadows.value=tt.state.pointShadow,qt.hemisphereLights.value=tt.state.hemi,qt.sunShadowMatrix.value=tt.state.sunShadowMatrix,qt.sunShadowCascade.value=tt.state.sunShadowCascade,qt.directionalShadowMatrix.value=tt.state.directionalShadowMatrix,qt.spotLightMatrix.value=tt.state.spotLightMatrix,qt.spotLightMap.value=tt.state.spotLightMap,qt.pointShadowMatrix.value=tt.state.pointShadowMatrix),$.lightProbeGrid=C.state.lightProbeGridArray.length>0,$.currentProgram=pe,$.uniformsList=null,pe}function ta(T){if(T.uniformsList===null){const G=T.currentProgram.getUniforms();T.uniformsList=kc.seqWithValue(G.seq,T.uniforms)}return T.uniformsList}function ea(T,G){const ut=rt.get(T);ut.outputColorSpace=G.outputColorSpace,ut.batching=G.batching,ut.batchingColor=G.batchingColor,ut.instancing=G.instancing,ut.instancingColor=G.instancingColor,ut.instancingMorph=G.instancingMorph,ut.skinning=G.skinning,ut.morphTargets=G.morphTargets,ut.morphNormals=G.morphNormals,ut.morphColors=G.morphColors,ut.morphTargetsCount=G.morphTargetsCount,ut.numClippingPlanes=G.numClippingPlanes,ut.numIntersection=G.numClipIntersection,ut.vertexAlphas=G.vertexAlphas,ut.vertexTangents=G.vertexTangents,ut.toneMapping=G.toneMapping}function hs(T,G){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;D.setFromMatrixPosition(G.matrixWorld);for(let ut=0,$=T.length;ut<$;ut++){const tt=T[ut];if(tt.texture!==null&&tt.boundingBox.containsPoint(D))return tt}return null}function Na(T,G,ut,$,tt){G.isScene!==!0&&(G=En),dt.resetTextureUnits();const Ot=G.fog,Gt=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?G.environment:null,Ut=ct===null?W.outputColorSpace:ct.isXRRenderTarget===!0?ct.texture.colorSpace:Ee.workingColorSpace,Ft=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,zt=bt.get($.envMap||Gt,Ft),oe=$.vertexColors===!0&&!!ut.attributes.color&&ut.attributes.color.itemSize===4,pe=!!ut.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),qt=!!ut.morphAttributes.position,Te=!!ut.morphAttributes.normal,Ze=!!ut.morphAttributes.color;let qe=Ki;$.toneMapped&&(ct===null||ct.isXRRenderTarget===!0)&&(qe=W.toneMapping);const fe=ut.morphAttributes.position||ut.morphAttributes.normal||ut.morphAttributes.color,hn=fe!==void 0?fe.length:0,Vt=rt.get($),vn=C.state.lights;if(xe===!0&&(Ne===!0||T!==ht)){const He=T===ht&&$.id===st;Qt.setState($,T,He)}let he=!1;$.version===Vt.__version?(Vt.needsLights&&Vt.lightsStateVersion!==vn.state.version||Vt.outputColorSpace!==Ut||tt.isBatchedMesh&&Vt.batching===!1||!tt.isBatchedMesh&&Vt.batching===!0||tt.isBatchedMesh&&Vt.batchingColor===!0&&tt._colorsTexture===null||tt.isBatchedMesh&&Vt.batchingColor===!1&&tt._colorsTexture!==null||tt.isInstancedMesh&&Vt.instancing===!1||!tt.isInstancedMesh&&Vt.instancing===!0||tt.isSkinnedMesh&&Vt.skinning===!1||!tt.isSkinnedMesh&&Vt.skinning===!0||tt.isInstancedMesh&&Vt.instancingColor===!0&&tt.instanceColor===null||tt.isInstancedMesh&&Vt.instancingColor===!1&&tt.instanceColor!==null||tt.isInstancedMesh&&Vt.instancingMorph===!0&&tt.morphTexture===null||tt.isInstancedMesh&&Vt.instancingMorph===!1&&tt.morphTexture!==null||Vt.envMap!==zt||$.fog===!0&&Vt.fog!==Ot||Vt.numClippingPlanes!==void 0&&(Vt.numClippingPlanes!==Qt.numPlanes||Vt.numIntersection!==Qt.numIntersection)||Vt.vertexAlphas!==oe||Vt.vertexTangents!==pe||Vt.morphTargets!==qt||Vt.morphNormals!==Te||Vt.morphColors!==Ze||Vt.toneMapping!==qe||Vt.morphTargetsCount!==hn||!!Vt.lightProbeGrid!=C.state.lightProbeGridArray.length>0)&&(he=!0):(he=!0,Vt.__version=$.version);let In=Vt.currentProgram;he===!0&&(In=Ua($,G,tt),Q&&$.isNodeMaterial&&Q.onUpdateProgram($,In,Vt));let ti=!1,Fn=!1,La=!1;const De=In.getUniforms(),Je=Vt.uniforms;if(M.useProgram(In.program)&&(ti=!0,Fn=!0,La=!0),$.id!==st&&(st=$.id,Fn=!0),Vt.needsLights){const He=hs(C.state.lightProbeGridArray,tt);Vt.lightProbeGrid!==He&&(Vt.lightProbeGrid=He,Fn=!0)}if(ti||ht!==T){M.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),De.setValue(X,"projectionMatrix",T.projectionMatrix),De.setValue(X,"viewMatrix",T.matrixWorldInverse);const zi=De.map.cameraPosition;zi!==void 0&&zi.setValue(X,Xe.setFromMatrixPosition(T.matrixWorld)),L.logarithmicDepthBuffer&&De.setValue(X,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&De.setValue(X,"isOrthographic",T.isOrthographicCamera===!0),ht!==T&&(ht=T,Fn=!0,La=!0)}if(Vt.needsLights&&(vn.state.sunShadowMap.length>0&&De.setValue(X,"sunShadowMap",vn.state.sunShadowMap,dt),vn.state.directionalShadowMap.length>0&&De.setValue(X,"directionalShadowMap",vn.state.directionalShadowMap,dt),vn.state.spotShadowMap.length>0&&De.setValue(X,"spotShadowMap",vn.state.spotShadowMap,dt),vn.state.pointShadowMap.length>0&&De.setValue(X,"pointShadowMap",vn.state.pointShadowMap,dt)),tt.isSkinnedMesh){De.setOptional(X,tt,"bindMatrix"),De.setOptional(X,tt,"bindMatrixInverse");const He=tt.skeleton;He&&(He.boneTexture===null&&He.computeBoneTexture(),De.setValue(X,"boneTexture",He.boneTexture,dt))}tt.isBatchedMesh&&(De.setOptional(X,tt,"batchingTexture"),De.setValue(X,"batchingTexture",tt._matricesTexture,dt),De.setOptional(X,tt,"batchingIdTexture"),De.setValue(X,"batchingIdTexture",tt._indirectTexture,dt),De.setOptional(X,tt,"batchingColorTexture"),tt._colorsTexture!==null&&De.setValue(X,"batchingColorTexture",tt._colorsTexture,dt));const fi=ut.morphAttributes;if((fi.position!==void 0||fi.normal!==void 0||fi.color!==void 0)&&k.update(tt,ut,In),(Fn||Vt.receiveShadow!==tt.receiveShadow)&&(Vt.receiveShadow=tt.receiveShadow,De.setValue(X,"receiveShadow",tt.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&G.environment!==null&&(Je.envMapIntensity.value=G.environmentIntensity),Je.dfgLUT!==void 0&&(Je.dfgLUT.value=yA()),Fn){if(De.setValue(X,"toneMappingExposure",W.toneMappingExposure),Vt.needsLights&&fn(Je,La),Ot&&$.fog===!0&&Ht.refreshFogUniforms(Je,Ot),Ht.refreshMaterialUniforms(Je,$,_t,it,C.state.transmissionRenderTarget[T.id]),Vt.needsLights&&Vt.lightProbeGrid){const He=Vt.lightProbeGrid;Je.probesSH.value=He.texture,Je.probesMin.value.copy(He.boundingBox.min),Je.probesMax.value.copy(He.boundingBox.max),Je.probesResolution.value.copy(He.resolution)}kc.upload(X,ta(Vt),Je,dt)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(kc.upload(X,ta(Vt),Je,dt),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&De.setValue(X,"center",tt.center),De.setValue(X,"modelViewMatrix",tt.modelViewMatrix),De.setValue(X,"normalMatrix",tt.normalMatrix),De.setValue(X,"modelMatrix",tt.matrixWorld),$.uniformsGroups!==void 0){const He=$.uniformsGroups;for(let zi=0,Ri=He.length;zi<Ri;zi++){const hi=He[zi];yt.update(hi,In),yt.bind(hi,In)}}return In}function fn(T,G){T.ambientLightColor.needsUpdate=G,T.lightProbe.needsUpdate=G,T.sunLights.needsUpdate=G,T.sunLightShadows.needsUpdate=G,T.directionalLights.needsUpdate=G,T.directionalLightShadows.needsUpdate=G,T.pointLights.needsUpdate=G,T.pointLightShadows.needsUpdate=G,T.spotLights.needsUpdate=G,T.spotLightShadows.needsUpdate=G,T.rectAreaLights.needsUpdate=G,T.hemisphereLights.needsUpdate=G}function sl(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return ct},this.setRenderTargetTextures=function(T,G,ut){const $=rt.get(T);$.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),rt.get(T.texture).__webglTexture=G,rt.get(T.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:ut,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,G){const ut=rt.get(T);ut.__webglFramebuffer=G,ut.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(T,G=0,ut=0){ct=T,F=G,H=ut;let $=null,tt=!1,Ot=!1;if(T){const Ut=rt.get(T);if(Ut.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(X.FRAMEBUFFER,Ut.__webglFramebuffer),w.copy(T.viewport),J.copy(T.scissor),gt=T.scissorTest,M.viewport(w),M.scissor(J),M.setScissorTest(gt),st=-1;return}else if(Ut.__webglFramebuffer===void 0)dt.setupRenderTarget(T);else if(Ut.__hasExternalTextures)dt.rebindTextures(T,rt.get(T.texture).__webglTexture,rt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const oe=T.depthTexture;if(Ut.__boundDepthTexture!==oe){if(oe!==null&&rt.has(oe)&&(T.width!==oe.image.width||T.height!==oe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");dt.setupDepthRenderbuffer(T)}}const Ft=T.texture;(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)&&(Ot=!0);const zt=rt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(zt[G])?$=zt[G][ut]:$=zt[G],tt=!0):T.samples>0&&dt.useMultisampledRTT(T)===!1?$=rt.get(T).__webglMultisampledFramebuffer:Array.isArray(zt)?$=zt[ut]:$=zt,w.copy(T.viewport),J.copy(T.scissor),gt=T.scissorTest}else w.copy(Bt).multiplyScalar(_t).floor(),J.copy(le).multiplyScalar(_t).floor(),gt=$e;if(ut!==0&&($=lt),M.bindFramebuffer(X.FRAMEBUFFER,$)&&M.drawBuffers(T,$),M.viewport(w),M.scissor(J),M.setScissorTest(gt),tt){const Ut=rt.get(T.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+G,Ut.__webglTexture,ut)}else if(Ot){const Ut=G;for(let Ft=0;Ft<T.textures.length;Ft++){const zt=rt.get(T.textures[Ft]);X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0+Ft,zt.__webglTexture,ut,Ut)}}else if(T!==null&&ut!==0){const Ut=rt.get(T.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,Ut.__webglTexture,ut)}st=-1};function Yr(T){const G=rt.get(T);return(G.__readFormat!==T.format||G.__readType!==T.type)&&(G.__readFormat=T.format,G.__readType=T.type,G.__formatReadable=L.textureFormatReadable(T.format),G.__typeReadable=L.textureTypeReadable(T.type)),G}this.readRenderTargetPixels=function(T,G,ut,$,tt,Ot,Gt,Ut=0){if(!(T&&T.isWebGLRenderTarget)){Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ft=rt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Gt!==void 0&&(Ft=Ft[Gt]),Ft){M.bindFramebuffer(X.FRAMEBUFFER,Ft);try{const zt=T.textures[Ut],oe=zt.format,pe=zt.type;T.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+Ut);const qt=Yr(zt);if(qt.__formatReadable===!1){Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(qt.__typeReadable===!1){Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=T.width-$&&ut>=0&&ut<=T.height-tt&&X.readPixels(G,ut,$,tt,Ct.convert(oe),Ct.convert(pe),Ot)}finally{const zt=ct!==null?rt.get(ct).__webglFramebuffer:null;M.bindFramebuffer(X.FRAMEBUFFER,zt)}}},this.readRenderTargetPixelsAsync=async function(T,G,ut,$,tt,Ot,Gt,Ut=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ft=rt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Gt!==void 0&&(Ft=Ft[Gt]),Ft)if(G>=0&&G<=T.width-$&&ut>=0&&ut<=T.height-tt){M.bindFramebuffer(X.FRAMEBUFFER,Ft);const zt=T.textures[Ut],oe=zt.format,pe=zt.type;T.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+Ut);const qt=Yr(zt);if(qt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(qt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=X.createBuffer();X.bindBuffer(X.PIXEL_PACK_BUFFER,Te),X.bufferData(X.PIXEL_PACK_BUFFER,Ot.byteLength,X.STREAM_READ),X.readPixels(G,ut,$,tt,Ct.convert(oe),Ct.convert(pe),0),X.bindBuffer(X.PIXEL_PACK_BUFFER,null);const Ze=ct!==null?rt.get(ct).__webglFramebuffer:null;M.bindFramebuffer(X.FRAMEBUFFER,Ze);const qe=X.fenceSync(X.SYNC_GPU_COMMANDS_COMPLETE,0);return X.flush(),await CM(X,qe,4),X.bindBuffer(X.PIXEL_PACK_BUFFER,Te),X.getBufferSubData(X.PIXEL_PACK_BUFFER,0,Ot),X.bindBuffer(X.PIXEL_PACK_BUFFER,null),X.deleteBuffer(Te),X.deleteSync(qe),Ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,G=null,ut=0){const $=Math.pow(2,-ut),tt=Math.floor(T.image.width*$),Ot=Math.floor(T.image.height*$),Gt=G!==null?G.x:0,Ut=G!==null?G.y:0;dt.setTexture2D(T,0),X.copyTexSubImage2D(X.TEXTURE_2D,ut,0,0,Gt,Ut,tt,Ot),M.unbindTexture()},this.copyTextureToTexture=function(T,G,ut=null,$=null,tt=0,Ot=0){let Gt,Ut,Ft,zt,oe,pe,qt,Te,Ze;const qe=T.isCompressedTexture?T.mipmaps[Ot]:T.image;if(ut!==null)Gt=ut.max.x-ut.min.x,Ut=ut.max.y-ut.min.y,Ft=ut.isBox3?ut.max.z-ut.min.z:1,zt=ut.min.x,oe=ut.min.y,pe=ut.isBox3?ut.min.z:0;else{const Je=Math.pow(2,-tt);Gt=Math.floor(qe.width*Je),Ut=Math.floor(qe.height*Je),T.isDataArrayTexture?Ft=qe.depth:T.isData3DTexture?Ft=Math.floor(qe.depth*Je):Ft=1,zt=0,oe=0,pe=0}$!==null?(qt=$.x,Te=$.y,Ze=$.z):(qt=0,Te=0,Ze=0);const fe=Ct.convert(G.format),hn=Ct.convert(G.type);let Vt;G.isData3DTexture?(dt.setTexture3D(G,0),Vt=X.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(dt.setTexture2DArray(G,0),Vt=X.TEXTURE_2D_ARRAY):(dt.setTexture2D(G,0),Vt=X.TEXTURE_2D),M.activeTexture(X.TEXTURE0),M.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,G.flipY),M.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),M.pixelStorei(X.UNPACK_ALIGNMENT,G.unpackAlignment);const vn=M.getParameter(X.UNPACK_ROW_LENGTH),he=M.getParameter(X.UNPACK_IMAGE_HEIGHT),In=M.getParameter(X.UNPACK_SKIP_PIXELS),ti=M.getParameter(X.UNPACK_SKIP_ROWS),Fn=M.getParameter(X.UNPACK_SKIP_IMAGES);M.pixelStorei(X.UNPACK_ROW_LENGTH,qe.width),M.pixelStorei(X.UNPACK_IMAGE_HEIGHT,qe.height),M.pixelStorei(X.UNPACK_SKIP_PIXELS,zt),M.pixelStorei(X.UNPACK_SKIP_ROWS,oe),M.pixelStorei(X.UNPACK_SKIP_IMAGES,pe);const La=T.isDataArrayTexture||T.isData3DTexture,De=G.isDataArrayTexture||G.isData3DTexture;if(T.isDepthTexture){const Je=rt.get(T),fi=rt.get(G),He=rt.get(Je.__renderTarget),zi=rt.get(fi.__renderTarget);M.bindFramebuffer(X.READ_FRAMEBUFFER,He.__webglFramebuffer),M.bindFramebuffer(X.DRAW_FRAMEBUFFER,zi.__webglFramebuffer);for(let Ri=0;Ri<Ft;Ri++)La&&(X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,rt.get(T).__webglTexture,tt,pe+Ri),X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,rt.get(G).__webglTexture,Ot,Ze+Ri)),X.blitFramebuffer(zt,oe,Gt,Ut,qt,Te,Gt,Ut,X.DEPTH_BUFFER_BIT,X.NEAREST);M.bindFramebuffer(X.READ_FRAMEBUFFER,null),M.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else if(tt!==0||T.isRenderTargetTexture||rt.has(T)){const Je=rt.get(T),fi=rt.get(G);M.bindFramebuffer(X.READ_FRAMEBUFFER,Y),M.bindFramebuffer(X.DRAW_FRAMEBUFFER,j);for(let He=0;He<Ft;He++)La?X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Je.__webglTexture,tt,pe+He):X.framebufferTexture2D(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,Je.__webglTexture,tt),De?X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,fi.__webglTexture,Ot,Ze+He):X.framebufferTexture2D(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,fi.__webglTexture,Ot),tt!==0?X.blitFramebuffer(zt,oe,Gt,Ut,qt,Te,Gt,Ut,X.COLOR_BUFFER_BIT,X.NEAREST):De?X.copyTexSubImage3D(Vt,Ot,qt,Te,Ze+He,zt,oe,Gt,Ut):X.copyTexSubImage2D(Vt,Ot,qt,Te,zt,oe,Gt,Ut);M.bindFramebuffer(X.READ_FRAMEBUFFER,null),M.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else De?T.isDataTexture||T.isData3DTexture?X.texSubImage3D(Vt,Ot,qt,Te,Ze,Gt,Ut,Ft,fe,hn,qe.data):G.isCompressedArrayTexture?X.compressedTexSubImage3D(Vt,Ot,qt,Te,Ze,Gt,Ut,Ft,fe,qe.data):X.texSubImage3D(Vt,Ot,qt,Te,Ze,Gt,Ut,Ft,fe,hn,qe):T.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,Ot,qt,Te,Gt,Ut,fe,hn,qe.data):T.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,Ot,qt,Te,qe.width,qe.height,fe,qe.data):X.texSubImage2D(X.TEXTURE_2D,Ot,qt,Te,Gt,Ut,fe,hn,qe);M.pixelStorei(X.UNPACK_ROW_LENGTH,vn),M.pixelStorei(X.UNPACK_IMAGE_HEIGHT,he),M.pixelStorei(X.UNPACK_SKIP_PIXELS,In),M.pixelStorei(X.UNPACK_SKIP_ROWS,ti),M.pixelStorei(X.UNPACK_SKIP_IMAGES,Fn),Ot===0&&G.generateMipmaps&&X.generateMipmap(Vt),M.unbindTexture()},this.initRenderTarget=function(T){rt.get(T).__webglFramebuffer===void 0&&dt.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?dt.setTextureCube(T,0):T.isData3DTexture?dt.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?dt.setTexture2DArray(T,0):dt.setTexture2D(T,0),M.unbindTexture()},this.resetState=function(){F=0,H=0,ct=null,M.reset(),It.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorSpace=Ee._getDrawingBufferColorSpace(t),i.unpackColorSpace=Ee._getUnpackColorSpace()}}const I_={type:"change"},Kd={type:"start"},Av={type:"end"},Fc=new uv,F_=new Ea,bA=Math.cos(70*Dd.DEG2RAD),Sn=new et,Jn=2*Math.PI,ze={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Vh=1e-6;class TA extends Ty{constructor(t,i=null){super(t,i),this.state=ze.NONE,this.target=new et,this.cursor=new et,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Fr.ROTATE,MIDDLE:Fr.DOLLY,RIGHT:Fr.PAN},this.touches={ONE:Or.ROTATE,TWO:Or.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new et,this._lastQuaternion=new ls,this._lastTargetPosition=new et,this._quat=new ls().setFromUnitVectors(t.up,new et(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new h_,this._sphericalDelta=new h_,this._scale=1,this._panOffset=new et,this._rotateStart=new ie,this._rotateEnd=new ie,this._rotateDelta=new ie,this._panStart=new ie,this._panEnd=new ie,this._panDelta=new ie,this._dollyStart=new ie,this._dollyEnd=new ie,this._dollyDelta=new ie,this._dollyDirection=new et,this._mouse=new ie,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=RA.bind(this),this._onPointerDown=AA.bind(this),this._onPointerUp=CA.bind(this),this._onContextMenu=PA.bind(this),this._onMouseWheel=UA.bind(this),this._onKeyDown=NA.bind(this),this._onTouchStart=LA.bind(this),this._onTouchMove=OA.bind(this),this._onMouseDown=wA.bind(this),this._onMouseMove=DA.bind(this),this._interceptControlDown=IA.bind(this),this._interceptControlUp=FA.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=ze.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();const t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(I_),this.update(),this.state=ze.NONE}pan(t,i){this._pan(t,i),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const i=this.object.position;Sn.copy(i).sub(this.target),Sn.applyQuaternion(this._quat),this._spherical.setFromVector3(Sn),this.autoRotate&&this.state===ze.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=Jn:s>Math.PI&&(s-=Jn),l<-Math.PI?l+=Jn:l>Math.PI&&(l-=Jn),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=h!=this._spherical.radius}if(Sn.setFromSpherical(this._spherical),Sn.applyQuaternion(this._quatInverse),i.copy(this.target).add(Sn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const p=Sn.length();h=this._clampDistance(p*this._scale);const m=p-h;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const p=new et(this._mouse.x,this._mouse.y,0);p.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const d=new et(this._mouse.x,this._mouse.y,0);d.unproject(this.object),this.object.position.sub(d).add(p),this.object.updateMatrixWorld(),h=Sn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(Fc.origin.copy(this.object.position),Fc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Fc.direction))<bA?this.object.lookAt(this.target):(F_.setFromNormalAndCoplanarPoint(this.object.up,this.target),Fc.intersectPlane(F_,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>Vh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Vh||this._lastTargetPosition.distanceToSquared(this.target)>Vh?(this.dispatchEvent(I_),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Jn/60*this.autoRotateSpeed*t:Jn/60/60*this.autoRotateSpeed}_getZoomScale(t){const i=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,i){Sn.setFromMatrixColumn(i,0),Sn.multiplyScalar(-t),this._panOffset.add(Sn)}_panUp(t,i){this.screenSpacePanning===!0?Sn.setFromMatrixColumn(i,1):(Sn.setFromMatrixColumn(i,0),Sn.crossVectors(this.object.up,Sn)),Sn.multiplyScalar(t),this._panOffset.add(Sn)}_pan(t,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;Sn.copy(l).sub(this.target);let c=Sn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*c/s.clientHeight,this.object.matrix),this._panUp(2*i*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=t-s.left,c=i-s.top,h=s.width,p=s.height;this._mouse.x=l/h*2-1,this._mouse.y=-(c/p)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Jn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Jn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let i=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Jn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Jn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Jn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Jn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const s=this._getSecondPointerPosition(t),l=.5*(t.pageX+s.x),c=.5*(t.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Jn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Jn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(t.pageX+i.x)*.5,p=(t.pageY+i.y)*.5;this._updateZoomParameters(h,p)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(t){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId)return!0;return!1}_trackPointer(t){let i=this._pointerPositions[t.pointerId];i===void 0&&(i=new ie,this._pointerPositions[t.pointerId]=i),i.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const i=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(t){const i=t.deltaMode,s={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function AA(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function RA(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function CA(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Av),this.state=ze.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],i=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:i.x,pageY:i.y});break}}function wA(r){let t;switch(r.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Fr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=ze.DOLLY;break;case Fr.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=ze.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=ze.ROTATE}break;case Fr.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=ze.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=ze.PAN}break;default:this.state=ze.NONE}this.state!==ze.NONE&&this.dispatchEvent(Kd)}function DA(r){switch(this.state){case ze.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case ze.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case ze.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function UA(r){this.enabled===!1||this.enableZoom===!1||this.state!==ze.NONE||(r.preventDefault(),this.dispatchEvent(Kd),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(Av))}function NA(r){this.enabled!==!1&&this._handleKeyDown(r)}function LA(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case Or.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=ze.TOUCH_ROTATE;break;case Or.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=ze.TOUCH_PAN;break;default:this.state=ze.NONE}break;case 2:switch(this.touches.TWO){case Or.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=ze.TOUCH_DOLLY_PAN;break;case Or.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=ze.TOUCH_DOLLY_ROTATE;break;default:this.state=ze.NONE}break;default:this.state=ze.NONE}this.state!==ze.NONE&&this.dispatchEvent(Kd)}function OA(r){switch(this._trackPointer(r),this.state){case ze.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case ze.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case ze.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case ze.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=ze.NONE}}function PA(r){this.enabled!==!1&&r.preventDefault()}function IA(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function FA(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Xo=`
varying vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,zA=`
varying vec2 vUv;

uniform vec2  uRes;
uniform float uTime;

uniform vec3  uCamPos;
uniform vec3  uCamRight;
uniform vec3  uCamUp;
uniform vec3  uCamFwd;
uniform float uTanHalf;

uniform int   uMaxSteps;
uniform float uStepScale;
uniform int   uNoiseOctaves;

uniform float uDiskIn;
uniform float uDiskOut;
uniform float uDiskThick;
uniform float uDiskTemp;
uniform float uDiskEmission;
uniform float uDiskOpacity;
uniform float uOrbitalSpeed;
uniform float uTurbAmp;
uniform float uTurbSpeed;
uniform float uTurbScale;

uniform float uStarDensity;
uniform float uStarBright;
uniform float uGalaxyBright;

uniform int   uDebug;

#define MAX_STEPS 640
#define MAX_CROSSINGS 8
#define M_CONST 0.5
#define R_HORIZON 1.0
#define R_PHOTON 1.5
#define B_CRITICAL 2.5980762
#define PI 3.141592653589793

/* -------------------------------------------------------------------------- */
/*  Small helpers                                                              */
/* -------------------------------------------------------------------------- */

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}

float valueNoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash13(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash13(i + vec3(1.0, 1.0, 1.0));
  float nx00 = mix(n000, n100, f.x);
  float nx10 = mix(n010, n110, f.x);
  float nx01 = mix(n001, n101, f.x);
  float nx11 = mix(n011, n111, f.x);
  return mix(mix(nx00, nx10, f.y), mix(nx01, nx11, f.y), f.z);
}

float fbm(vec3 p, int octaves) {
  float sum = 0.0;
  float amp = 0.5;
  float norm = 0.0;
  for (int i = 0; i < 5; i++) {
    if (i >= octaves) break;
    sum += amp * valueNoise(p);
    norm += amp;
    p = p * 2.03 + vec3(11.7, 3.1, 5.9);
    amp *= 0.5;
  }
  return sum / max(norm, 1e-4);
}

vec2 rotate2(vec2 v, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec2(v.x * c - v.y * s, v.x * s + v.y * c);
}

vec3 srgbToLinear(vec3 c) {
  return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(vec3(0.04045), c));
}

/**
 * Blackbody colour, as a fit to the Planckian locus (Helland's approximation
 * of the CIE curve) with the two branches blended over a small window so the
 * gradient has no visible kink. The result is in sRGB and is linearised.
 */
vec3 blackbody(float kelvin) {
  float t = clamp(kelvin, 1000.0, 40000.0) / 100.0;
  vec3 low = vec3(1.0, 0.0, 0.0);
  low.g = clamp((99.4708025861 * log(max(t, 1.0)) - 161.1195681661) / 255.0, 0.0, 1.0);
  low.b = t <= 19.0 ? 0.0 : clamp((138.5177312231 * log(max(t - 10.0, 1.0)) - 305.0447927307) / 255.0, 0.0, 1.0);
  vec3 high = vec3(0.0, 0.0, 1.0);
  high.r = clamp((329.698727446 * pow(max(t - 60.0, 0.01), -0.1332047592)) / 255.0, 0.0, 1.0);
  high.g = clamp((288.1221695283 * pow(max(t - 60.0, 0.01), -0.0755148492)) / 255.0, 0.0, 1.0);
  float blend = smoothstep(62.0, 70.0, t);
  vec3 srgb = mix(low, high, blend);
  return srgbToLinear(srgb);
}

/* -------------------------------------------------------------------------- */
/*  The sky                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Stars on a cube grid. The direction is projected onto the face of a cube it
 * points at, and each cell holds one star whose position, brightness and
 * colour are hashed from the cell index. Because the direction the sky is
 * sampled with is the direction the *bent* ray ends up pointing at, the stars
 * are lensed: near the shadow they smear into arcs and pile up into the
 * photon ring.
 */
vec3 starLayers(vec3 dir) {
  vec3 a = abs(dir);
  vec2 uv;
  float face;
  if (a.x >= a.y && a.x >= a.z) {
    uv = dir.zy / a.x;
    face = dir.x > 0.0 ? 0.0 : 1.0;
  } else if (a.y >= a.z) {
    uv = dir.xz / a.y;
    face = dir.y > 0.0 ? 2.0 : 3.0;
  } else {
    uv = dir.xy / a.z;
    face = dir.z > 0.0 ? 4.0 : 5.0;
  }

  vec3 total = vec3(0.0);
  for (int layer = 0; layer < 2; layer++) {
    float cells = (layer == 0 ? 34.0 : 68.0) * uStarDensity;
    if (cells < 1.0) continue;
    vec2 g = uv * cells;
    vec2 cell = floor(g);
    vec2 f = fract(g);
    float seed = cell.x * 127.1 + cell.y * 311.7 + face * 74.7 + float(layer) * 19.19;
    float posX = 0.16 + 0.68 * hash12(vec2(seed, 1.7));
    float posY = 0.16 + 0.68 * hash12(vec2(seed, 5.3));
    float mag = hash12(vec2(seed, 9.1));
    vec2 d = f - vec2(posX, posY);
    float radius = 0.020 + 0.055 * mag * mag;
    float core = smoothstep(radius, 0.0, length(d));
    if (core <= 0.0) continue;
    float temp = hash12(vec2(seed, 13.7));
    vec3 tint = mix(vec3(1.0, 0.72, 0.48), vec3(0.68, 0.80, 1.0), temp * temp);
    total += tint * core * (0.10 + 3.4 * mag * mag * mag) * (layer == 0 ? 1.0 : 0.55);
  }
  return total * uStarBright;
}

/**
 * A galactic band: unresolved light across one plane of the sky, broken up by
 * noise and cut by dust lanes. It is sampled with the lensed direction, so it
 * bends around the hole along with the stars.
 */
vec3 galaxyBand(vec3 dir) {
  vec3 pole = normalize(vec3(0.34, 0.87, -0.36));
  float d = dot(dir, pole);
  float band = exp(-d * d * 70.0);
  float structure = fbm(dir * 5.5 + vec3(7.3), min(uNoiseOctaves, 4));
  float dust = fbm(dir * 15.0 + vec3(2.1), min(uNoiseOctaves, 3));
  vec3 warm = vec3(1.0, 0.83, 0.62);
  vec3 cool = vec3(0.58, 0.70, 1.0);
  vec3 col = mix(cool, warm, structure) * band * (0.06 + 0.95 * structure * structure);
  col *= smoothstep(0.24, 0.60, dust);
  col += vec3(0.30, 0.40, 0.70) * band * 0.05;
  return col * uGalaxyBright * 0.42;
}

vec3 background(vec3 dir) {
  vec3 col = galaxyBand(dir) + starLayers(dir);
  col += vec3(0.0045, 0.0060, 0.0115);
  return col;
}

/* -------------------------------------------------------------------------- */
/*  The disc                                                                   */
/* -------------------------------------------------------------------------- */

/** Radial extent of the gas: a hard inner edge, a soft outer taper. */
float discRadialProfile(float r) {
  float inFade = smoothstep(uDiskIn * 0.97, uDiskIn * 1.12, r);
  float outFade = 1.0 - smoothstep(uDiskOut * 0.55, uDiskOut, r);
  return inFade * outFade;
}

/** Scale height of the sheet at radius r. The disc flares outward. */
float discHalfThickness(float r) {
  return uDiskThick * pow(max(r / uDiskIn, 1.0), 0.55);
}

/** Thin-disc temperature profile, and the brightness that follows from it. */
float discTemperature(float r) {
  return uDiskTemp * pow(uDiskIn / max(r, uDiskIn), 0.75);
}

float discBrightness(float r) {
  return pow(uDiskIn / max(r, uDiskIn), 2.0);
}

/**
 * The turbulent gas pattern. The noise is looked up in a frame that rotates
 * with the local Keplerian rate, which differs from radius to radius, so the
 * pattern is sheared into spiral filaments exactly the way real gas is.
 */
float discTurbulence(vec2 planeXY, float r, float omega) {
  float angle = -omega * uTime * uOrbitalSpeed * 3.2;
  vec2 q = rotate2(planeXY, angle) * uTurbScale;
  float n = fbm(vec3(q, uTime * uTurbSpeed * 0.28), uNoiseOctaves);
  return mix(1.0, n * 1.9, clamp(uTurbAmp, 0.0, 1.5));
}

/* -------------------------------------------------------------------------- */
/*  Debug ramps                                                                */
/* -------------------------------------------------------------------------- */

vec3 heatRamp(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 a = vec3(0.02, 0.02, 0.12);
  vec3 b = vec3(0.05, 0.35, 0.62);
  vec3 c = vec3(0.15, 0.85, 0.45);
  vec3 d = vec3(1.0, 0.92, 0.25);
  vec3 e = vec3(1.0, 0.22, 0.10);
  if (t < 0.25) return mix(a, b, t / 0.25);
  if (t < 0.5) return mix(b, c, (t - 0.25) / 0.25);
  if (t < 0.75) return mix(c, d, (t - 0.5) / 0.25);
  return mix(d, e, (t - 0.75) / 0.25);
}

/* -------------------------------------------------------------------------- */
/*  Main                                                                       */
/* -------------------------------------------------------------------------- */

void main() {
  /* --- the observation ray ------------------------------------------------ */

  vec2 ndc = vUv * 2.0 - 1.0;
  ndc.x *= uRes.x / uRes.y;
  vec3 ro = uCamPos;
  vec3 rd = normalize(uCamFwd + uCamRight * (ndc.x * uTanHalf) + uCamUp * (ndc.y * uTanHalf));

  float camRadius = length(ro);

  /* --- the plane the geodesic lives in ------------------------------------ */
  /*  A Schwarzschild geodesic is planar: it stays in the plane through the    */
  /*  centre of mass that contains the observer and the ray. e1 and e2 span   */
  /*  that plane, and the ray is described by r and phi inside it.            */

  vec3 normal = cross(ro, rd);
  float normalLength = length(normal);
  float radius = camRadius;
  float angularMomentum = 0.0;
  vec3 e1 = vec3(1.0, 0.0, 0.0);
  vec3 e2 = vec3(0.0, 1.0, 0.0);
  bool radial = normalLength < 1e-7;

  if (!radial) {
    vec3 nHat = normal / normalLength;
    e1 = ro / camRadius;
    e2 = cross(nHat, e1);
    angularMomentum = radius * dot(rd, e2);
  } else {
    e1 = ro / max(camRadius, 1e-6);
    e2 = normalize(cross(vec3(0.0, 0.0, 1.0), e1));
    if (length(cross(vec3(0.0, 0.0, 1.0), e1)) < 1e-6) e2 = vec3(1.0, 0.0, 0.0);
    angularMomentum = 0.0;
  }

  /* --- conserved quantities and the capture test --------------------------- */
  /*  E^2 = v^2 - 2 M L^2 / r^3 with |v| = 1 for the unit ray direction.      */

  float energySq = max(1.0 - angularMomentum * angularMomentum / (radius * radius * radius), 1e-6);
  float energy = sqrt(energySq);
  float impact = abs(angularMomentum) / energy;
  bool willCapture = impact < B_CRITICAL;

  /* --- integration state --------------------------------------------------- */

  float r = radius;
  float rDot = dot(rd, e1);
  float cosPhi = 1.0;
  float sinPhi = 0.0;
  float rEscape = max(28.0, camRadius * 1.3 + 8.0);

  vec3 discAccum = vec3(0.0);
  float transmittance = 1.0;
  int crossings = 0;
  float firstCrossingRadius = -1.0;
  float firstRedshift = 1.0;
  float firstDoppler = 1.0;
  bool captured = willCapture;
  bool exhausted = false;
  bool escaped = false;
  vec3 outDirection = rd;

  float zPlane0 = e1.z;   // signed height of the ray above the disc plane

  for (int i = 0; i < MAX_STEPS; i++) {
    if (i >= uMaxSteps) { exhausted = true; break; }
    if (r < R_HORIZON) { captured = true; break; }

    float dt = uStepScale * r;
    float r2 = r * r;

    /* velocity Verlet on the radial equation d2r = L^2 (r - 3M) / r^4 */
    float accel = angularMomentum * angularMomentum * (r - R_PHOTON) / (r2 * r2);
    float rDotMid = rDot + 0.5 * accel * dt;
    float rNext = r + rDotMid * dt;
    float phiStep = angularMomentum / (rNext * rNext) * dt;

    float cosNext = cosPhi - sinPhi * phiStep;
    float sinNext = sinPhi + cosPhi * phiStep;
    float norm = inversesqrt(max(cosNext * cosNext + sinNext * sinNext, 1e-9));
    cosNext *= norm;
    sinNext *= norm;

    /* --- the disc, where the bent path crosses the plane -------------------- */

    float zPlane1 = e1.z * cosNext + e2.z * sinNext;
    if ((zPlane0 <= 0.0 && zPlane1 >= 0.0) || (zPlane0 >= 0.0 && zPlane1 <= 0.0)) {
      float denom = zPlane0 - zPlane1;
      float frac = abs(denom) > 1e-9 ? clamp(zPlane0 / denom, 0.0, 1.0) : 0.5;

      float rCross = mix(r, rNext, frac);
      float cCross = mix(cosPhi, cosNext, frac);
      float sCross = mix(sinPhi, sinNext, frac);
      float cNorm = inversesqrt(max(cCross * cCross + sCross * sCross, 1e-9));
      cCross *= cNorm;
      sCross *= cNorm;

      float radialProfile = discRadialProfile(rCross);
      if (radialProfile > 0.001 && crossings < MAX_CROSSINGS) {
        /* position and direction of the ray at the crossing */
        vec3 rHat = e1 * cCross + e2 * sCross;
        vec3 phiHat = e1 * (-sCross) + e2 * cCross;
        float rDotCross = mix(rDot, rDotMid, frac);
        float phiDotCross = angularMomentum / max(rCross * rCross, 1e-6);
        vec3 vHat = normalize(rDotCross * rHat + rCross * phiDotCross * phiHat);

        /* the sheet: how much gas the ray ploughs through */
        float cosTilt = max(abs(vHat.z), 0.035);
        float pathLength = 2.0 * discHalfThickness(rCross) / cosTilt;

        /* the gas pattern, sheared by the differential rotation */
        float omega = sqrt(M_CONST / max(rCross * rCross * rCross, 1e-6));
        float turbulence = discTurbulence(rCross * rHat.xy, rCross, omega);

        float density = uDiskOpacity * turbulence *
                        exp(-1.7 * (rCross - uDiskIn) / max(uDiskOut - uDiskIn, 0.001));
        float alpha = 1.0 - exp(-density * pathLength);
        alpha *= radialProfile;

        /* relativistic factors of the gas at this radius */
        float beta = clamp(sqrt(M_CONST / max(rCross - 2.0 * M_CONST, 1e-3)) * uOrbitalSpeed, 0.0, 0.985);
        vec3 gasDirection = normalize(vec3(-rHat.y, rHat.x, 0.0) + vec3(1e-6, 0.0, 0.0));
        float approach = dot(gasDirection, -vHat);
        float gamma = inversesqrt(max(1.0 - beta * beta, 1e-6));
        float doppler = 1.0 / max(gamma * (1.0 - beta * approach), 1e-4);
        float redshift = sqrt(max(1.0 - 2.0 * M_CONST / rCross, 0.0));
        float g = redshift * doppler;

        float boost = max(pow(g, 4.0), 0.05);
        vec3 colour = blackbody(discTemperature(rCross) * g);
        float emission = uDiskEmission * discBrightness(rCross) * boost * turbulence;

        discAccum += transmittance * colour * emission * alpha;
        transmittance *= (1.0 - alpha);

        if (crossings == 0) {
          firstCrossingRadius = rCross;
          firstRedshift = redshift;
          firstDoppler = doppler;
        }
        crossings++;
      }
    }

    /* --- advance ----------------------------------------------------------- */

    float accelNext = angularMomentum * angularMomentum * (rNext - R_PHOTON) /
                      max(rNext * rNext * rNext * rNext, 1e-9);
    rDot = rDotMid + 0.5 * accelNext * dt;
    r = rNext;
    cosPhi = cosNext;
    sinPhi = sinNext;
    zPlane0 = zPlane1;

    if (r > rEscape && rDot > 0.0) {
      escaped = true;
      vec3 rHat = e1 * cosPhi + e2 * sinPhi;
      vec3 phiHat = e1 * (-sinPhi) + e2 * cosPhi;
      outDirection = normalize(rDot * rHat + r * (angularMomentum / (r * r)) * phiHat);
      break;
    }
  }

  bool sawSky = escaped && !captured;
  vec3 sky = sawSky ? background(outDirection) : vec3(0.0);
  vec3 hdr = discAccum + transmittance * sky;

  /* --- the diagnostic views ----------------------------------------------- */

  vec3 outColor = hdr;

  if (uDebug == 1) {
    /* ray termination */
    if (captured) outColor = vec3(0.85, 0.06, 0.06);
    else if (exhausted) outColor = vec3(1.0, 0.62, 0.05);
    else outColor = vec3(0.06, 0.30, 0.95);
    if (crossings > 0) outColor = mix(outColor, vec3(1.0), 0.35);
  } else if (uDebug == 2) {
    /* event horizon and the critical capture boundary */
    if (r < R_HORIZON) {
      outColor = vec3(0.0);
    } else if (impact < B_CRITICAL * 1.035) {
      outColor = vec3(1.0, 0.05, 0.85);
    } else if (impact < B_CRITICAL * 1.25) {
      outColor = vec3(0.16, 0.03, 0.30);
    } else {
      outColor = vec3(0.02, 0.05, 0.14);
    }
    if (crossings > 0) outColor += vec3(0.05, 0.35, 0.05);
  } else if (uDebug == 3) {
    /* how many times the bent ray cut the disc, and in what order */
    if (crossings == 0) outColor = vec3(0.0);
    else if (crossings == 1) outColor = vec3(0.15, 0.95, 0.30);
    else if (crossings == 2) outColor = vec3(0.95, 0.95, 0.20);
    else if (crossings == 3) outColor = vec3(1.0, 0.55, 0.10);
    else outColor = vec3(1.0, 0.12, 0.12);
  } else if (uDebug == 4) {
    /* radius of the first crossing */
    if (firstCrossingRadius < 0.0) outColor = vec3(0.0);
    else {
      float t = clamp((firstCrossingRadius - uDiskIn) / max(uDiskOut - uDiskIn, 0.001), 0.0, 1.0);
      outColor = heatRamp(t);
    }
  } else if (uDebug == 5) {
    /* gravitational redshift at the first crossing */
    if (firstCrossingRadius < 0.0) outColor = vec3(0.0);
    else {
      float t = clamp((1.0 - firstRedshift) / 0.2, 0.0, 1.0);
      outColor = mix(vec3(1.0, 0.96, 0.88), vec3(0.70, 0.06, 0.03), t);
    }
  } else if (uDebug == 6) {
    /* Doppler factor at the first crossing */
    if (firstCrossingRadius < 0.0) outColor = vec3(0.0);
    else {
      float t = clamp((firstDoppler - 1.0) / 0.7, -1.0, 1.0);
      outColor = t >= 0.0
        ? mix(vec3(1.0), vec3(0.15, 0.55, 1.0), t)
        : mix(vec3(1.0), vec3(1.0, 0.22, 0.12), -t);
    }
  } else if (uDebug == 7) {
    /* where the escaped ray points at infinity */
    if (!sawSky) outColor = vec3(0.0);
    else {
      float u = atan(outDirection.z, outDirection.x) / (2.0 * PI) + 0.5;
      float v = asin(clamp(outDirection.y, -1.0, 1.0)) / PI + 0.5;
      outColor = vec3(fract(u), fract(v), 0.28);
    }
  } else if (uDebug == 8) {
    /* the sky on its own, lensed by the same geodesics */
    outColor = sawSky ? sky : vec3(0.0);
  } else if (uDebug == 9) {
    /* the HDR frame before the tone curve */
    float luminance = dot(hdr, vec3(0.2126, 0.7152, 0.0722));
    float stops = log2(max(luminance, 1e-4) / 0.01) / 10.0;
    outColor = heatRamp(clamp(stops, 0.0, 1.0));
    if (luminance > 1.0) outColor = mix(outColor, vec3(1.0), 0.55);
  }

  gl_FragColor = vec4(max(outColor, vec3(0.0)), 1.0);
}
`,BA=`
varying vec2 vUv;
uniform sampler2D uSrc;
uniform float uThreshold;
uniform float uKnee;

void main() {
  vec3 c = texture2D(uSrc, vUv).rgb;
  float luminance = dot(c, vec3(0.2126, 0.7152, 0.0722));
  float soft = clamp(luminance - uThreshold + uKnee, 0.0, 2.0 * uKnee);
  soft = soft * soft / (4.0 * uKnee + 1e-5);
  float contribution = max(soft, luminance - uThreshold) / max(luminance, 1e-5);
  gl_FragColor = vec4(c * clamp(contribution, 0.0, 1.0), 1.0);
}
`,HA=`
varying vec2 vUv;
uniform sampler2D uSrc;
uniform vec2 uTexel;

void main() {
  /* Four bilinear taps at the corners of the source texel footprint: a 4x4
     box in source space, which is stable under repeated downsampling. */
  vec2 o = uTexel;
  vec3 c = texture2D(uSrc, vUv + vec2(-o.x, -o.y)).rgb;
  c += texture2D(uSrc, vUv + vec2(o.x, -o.y)).rgb;
  c += texture2D(uSrc, vUv + vec2(-o.x, o.y)).rgb;
  c += texture2D(uSrc, vUv + vec2(o.x, o.y)).rgb;
  gl_FragColor = vec4(c * 0.25, 1.0);
}
`,GA=`
varying vec2 vUv;
uniform sampler2D uSrc;
uniform vec2 uTexel;
uniform float uRadius;

void main() {
  /* A 3x3 tent, added on top of the level below it. */
  vec2 o = uTexel * uRadius;
  vec3 c = texture2D(uSrc, vUv + vec2(-o.x, 0.0)).rgb * 2.0;
  c += texture2D(uSrc, vUv + vec2(o.x, 0.0)).rgb * 2.0;
  c += texture2D(uSrc, vUv + vec2(0.0, -o.y)).rgb * 2.0;
  c += texture2D(uSrc, vUv + vec2(0.0, o.y)).rgb * 2.0;
  c += texture2D(uSrc, vUv + vec2(-o.x, -o.y)).rgb;
  c += texture2D(uSrc, vUv + vec2(o.x, -o.y)).rgb;
  c += texture2D(uSrc, vUv + vec2(-o.x, o.y)).rgb;
  c += texture2D(uSrc, vUv + vec2(o.x, o.y)).rgb;
  c += texture2D(uSrc, vUv).rgb * 4.0;
  gl_FragColor = vec4(c / 16.0, 1.0);
}
`,VA=`
varying vec2 vUv;

uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform vec2  uRes;
uniform float uTime;
uniform float uExposure;
uniform float uBloomIntensity;
uniform float uVignette;
uniform float uFilmGrain;
uniform float uDispersion;
uniform int   uDebug;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

/**
 * ACES film tone mapping, the fit by Stephen Hill that matches the ACES
 * RRT+ODT closely enough for a real-time frame. It rolls the hot disc off
 * into white without letting the colour walk, which a Reinhard curve cannot
 * do.
 */
vec3 acesFilm(vec3 x) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

vec3 linearToSrgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(vec3(0.0031308), c));
}

void main() {
  if (uDebug > 0) {
    /* Diagnostics are shown as they are: no bloom, no curve, no grain. */
    gl_FragColor = vec4(clamp(texture2D(uScene, vUv).rgb, 0.0, 1.0), 1.0);
    return;
  }

  vec2 centred = vUv - 0.5;
  float radial = dot(centred, centred);

  /* The lens splits the colours towards the edge of the frame. The shift is
     radial and quadratic, so the centre of the picture stays clean. */
  vec2 offset = centred * (uDispersion * 0.0030 * radial * 4.0);

  vec3 hdr;
  hdr.r = texture2D(uScene, vUv + offset).r;
  hdr.g = texture2D(uScene, vUv).g;
  hdr.b = texture2D(uScene, vUv - offset).b;

  hdr += texture2D(uBloom, vUv).rgb * uBloomIntensity;

  hdr *= uExposure;
  vec3 mapped = acesFilm(hdr);

  /* Corner falloff, kept gentle so it never touches the photon ring. */
  float aspect = uRes.x / max(uRes.y, 1.0);
  float distance = length(centred * vec2(aspect, 1.0)) * 1.42;
  float vignette = 1.0 - uVignette * pow(clamp(distance, 0.0, 1.0), 2.3);
  mapped *= vignette;

  vec3 srgb = linearToSrgb(mapped);

  /* Sensor grain, in display space so it reads evenly across the frame. */
  float grain = hash12(vUv * uRes + vec2(uTime * 61.0, uTime * 37.0)) - 0.5;
  srgb += grain * uFilmGrain;

  gl_FragColor = vec4(clamp(srgb, 0.0, 1.0), 1.0);
}
`,Qd=[{key:"fov",label:"Field of view",group:"camera",min:12,max:85,step:.5,default:40,unit:"°",precision:1,hint:"Vertical field of view of the observer ray bundle."},{key:"cameraDistance",label:"Camera distance",group:"camera",min:5,max:70,step:.25,default:26,unit:" rₛ",precision:2,hint:"Observer radius. Farther away the shadow shrinks and the disc detail grows."},{key:"cameraAzimuth",label:"Camera azimuth",group:"camera",min:-180,max:180,step:1,default:0,unit:"°",precision:0,hint:"Angle around the spin axis. Changes which side of the disc is approaching."},{key:"cameraElevation",label:"Camera elevation",group:"camera",min:-88,max:88,step:.5,default:12,unit:"°",precision:1,hint:"Height above the disc plane. 0° is edge-on, 90° looks straight down the axis."},{key:"timeScale",label:"Time scale",group:"simulation",min:0,max:4,step:.05,default:1,unit:"×",precision:2,hint:"Rate of simulated time. 0 freezes the gas, the camera loop still runs."},{key:"diskInnerRadius",label:"Disc inner radius",group:"disc",min:1.6,max:9,step:.05,default:3,unit:" rₛ",precision:2,hint:"Inner edge of the accretion disc. Below r = 3 no stable circular orbit exists."},{key:"diskOuterRadius",label:"Disc outer radius",group:"disc",min:6,max:34,step:.25,default:16,unit:" rₛ",precision:2,hint:"Outer edge of the gas. Larger discs give the lensed halo more room."},{key:"diskHalfThickness",label:"Disc half-thickness",group:"disc",min:.02,max:1.2,step:.01,default:.12,unit:" rₛ",precision:2,hint:"Vertical scale height of the gas at the inner edge; it flares outward."},{key:"diskTemperature",label:"Disc temperature",group:"disc",min:1800,max:24e3,step:50,default:7600,unit:" K",precision:0,hint:"Peak blackbody temperature of the innermost gas."},{key:"diskEmission",label:"Disc emission",group:"disc",min:0,max:8,step:.05,default:1.1,precision:2,hint:"Overall brightness of the gas before relativistic boosting."},{key:"diskOpacity",label:"Disc opacity",group:"disc",min:.05,max:2.5,step:.05,default:.9,precision:2,hint:"Optical depth of the gas. Low values let the lensed far side show through."},{key:"orbitalSpeed",label:"Orbital speed",group:"disc",min:0,max:3,step:.02,default:1,unit:"×",precision:2,hint:"Multiplies the Keplerian rate: gas rotation, pattern shear and Doppler shift."},{key:"turbulenceAmplitude",label:"Turbulence amplitude",group:"disc",min:0,max:1.5,step:.02,default:.7,precision:2,hint:"How strongly the procedural noise modulates the gas density."},{key:"turbulenceSpeed",label:"Turbulence speed",group:"disc",min:0,max:4,step:.05,default:1,unit:"×",precision:2,hint:"Rate at which the noise field itself churns."},{key:"turbulenceScale",label:"Turbulence scale",group:"disc",min:.4,max:9,step:.1,default:2.4,precision:1,hint:"Size of the eddies. High values break the gas into fine filaments."},{key:"starDensity",label:"Star density",group:"background",min:0,max:3,step:.05,default:1,unit:"×",precision:2,hint:"Number of background stars per unit of sky. They are lensed with everything else."},{key:"starBrightness",label:"Star brightness",group:"background",min:0,max:4,step:.05,default:1.2,precision:2,hint:"Luminosity of the background stars."},{key:"galaxyBrightness",label:"Galaxy brightness",group:"background",min:0,max:4,step:.05,default:.3,precision:2,hint:"Luminosity of the procedural galactic band behind the hole."},{key:"bloomIntensity",label:"Bloom intensity",group:"post",min:0,max:3,step:.05,default:.5,precision:2,hint:"How much of the bright-pass energy is added back into the frame."},{key:"bloomThreshold",label:"Bloom threshold",group:"post",min:0,max:4,step:.05,default:1.6,precision:2,hint:"Luminance above which a pixel starts to bleed light into its neighbours."},{key:"exposure",label:"Exposure",group:"post",min:.05,max:5,step:.05,default:.85,precision:2,hint:"Gain applied to the HDR frame before the tone curve."},{key:"vignette",label:"Vignette",group:"post",min:0,max:1,step:.01,default:.28,precision:2,hint:"Corner falloff. Kept low so it never hides the photon ring."},{key:"filmGrain",label:"Film grain",group:"post",min:0,max:.2,step:.002,default:.035,precision:3,hint:"Sensor noise laid over the finished frame."},{key:"dispersion",label:"Chromatic dispersion",group:"post",min:0,max:2.5,step:.05,default:.3,precision:2,hint:"Radial colour fringing from the lens, strongest at the frame edge."}],eu=Object.fromEntries(Qd.map(r=>[r.key,r])),kA={camera:"Camera",disc:"Accretion disc",background:"Background sky",post:"Post-processing",simulation:"Simulation"},XA=["camera","disc","background","post","simulation"];function Rv(){const r={};for(const t of Qd)r[t.key]=t.default;return r}function Ir(r,t){const i=eu[r];return Number.isFinite(t)?Math.min(i.max,Math.max(i.min,t)):i.default}function Cv(r,t){const i=eu[r],s=Ir(r,t),l=Math.round((s-i.min)/i.step),c=i.min+l*i.step;return Math.min(i.max,Math.max(i.min,Number(c.toFixed(6))))}function z_(r,t){const i=eu[r],s=i.precision??2;return`${t.toFixed(s)}${i.unit??""}`}const Is=[{id:"standard",label:"Standard",description:"Half resolution, 220 steps per ray. Runs on a laptop and on a phone.",resolutionScale:.5,maxSteps:220,dprCap:1,bloomLevels:3,noiseOctaves:3},{id:"high",label:"High",description:"72% resolution, 380 steps. The default: sharp photon ring, no banding.",resolutionScale:.72,maxSteps:380,dprCap:1.5,bloomLevels:4,noiseOctaves:4},{id:"cinematic",label:"Cinematic",description:"Full resolution, 600 steps, five bloom levels. Slow on purpose.",resolutionScale:1,maxSteps:600,dprCap:2,bloomLevels:5,noiseOctaves:5}],wv="high";function B_(r){return Is.find(t=>t.id===r)??Is.find(t=>t.id===wv)}function Jd(r){return r==="standard"||r==="high"||r==="cinematic"}function WA(r){const t=Is.findIndex(i=>i.id===r);return Is[(t+1)%Is.length].id}const Wi=Math.PI/180;class qA{canvas;renderer;scene=new sy;camera;controls;quad;passCamera=new Zd;geoMaterial;brightMaterial;downMaterial;upMaterial;compositeMaterial;sceneTarget;bloomTargets=[];params=Rv();quality=B_("high");simTime=0;cinematic=!0;userControlled=!1;captureMode=!1;initialised=!1;disposed=!1;contextLost=!1;ready=!1;raf=0;lastFrame=0;cinematicClock=0;frameAccumulator=0;frameCounter=0;lastStats=0;adaptiveScale=1;slowFrames=0;fastFrames=0;lastReported=null;orphaned=!1;callbacks;constructor(t,i={}){this.canvas=t,this.callbacks=i,this.renderer=new EA({canvas:t,antialias:!1,alpha:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.autoClear=!0,this.renderer.setClearColor(0,1),this.camera=new Ei(40,1,.05,4e3),this.camera.up.set(0,0,1),this.camera.position.set(20,0,2.5),this.controls=new TA(this.camera,t),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.enablePan=!1,this.controls.rotateSpeed=.55,this.controls.zoomSpeed=.8,this.controls.minDistance=3,this.controls.maxDistance=120,this.controls.minPolarAngle=.02,this.controls.maxPolarAngle=Math.PI-.02,this.controls.target.set(0,0,0),this.controls.addEventListener("start",()=>{this.userControlled=!0,this.cinematic=!1}),this.controls.addEventListener("change",()=>{this.userControlled&&this.reportCamera()});const s=new $i;s.setAttribute("position",new Qi(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),this.geoMaterial=new Gn({vertexShader:Xo,fragmentShader:zA,depthTest:!1,depthWrite:!1,uniforms:{uRes:{value:new ie(1,1)},uTime:{value:0},uCamPos:{value:new et},uCamRight:{value:new et},uCamUp:{value:new et},uCamFwd:{value:new et},uTanHalf:{value:Math.tan(20*Wi)},uMaxSteps:{value:380},uStepScale:{value:.022},uNoiseOctaves:{value:4},uDiskIn:{value:3},uDiskOut:{value:16},uDiskThick:{value:.2},uDiskTemp:{value:7600},uDiskEmission:{value:1.7},uDiskOpacity:{value:.9},uOrbitalSpeed:{value:1},uTurbAmp:{value:.7},uTurbSpeed:{value:1},uTurbScale:{value:2.4},uStarDensity:{value:1},uStarBright:{value:1.2},uGalaxyBright:{value:.9},uDebug:{value:0}}}),this.brightMaterial=new Gn({vertexShader:Xo,fragmentShader:BA,depthTest:!1,depthWrite:!1,uniforms:{uSrc:{value:null},uThreshold:{value:1.1},uKnee:{value:.55}}}),this.downMaterial=new Gn({vertexShader:Xo,fragmentShader:HA,depthTest:!1,depthWrite:!1,uniforms:{uSrc:{value:null},uTexel:{value:new ie}}}),this.upMaterial=new Gn({vertexShader:Xo,fragmentShader:GA,depthTest:!1,depthWrite:!1,blending:Xh,uniforms:{uSrc:{value:null},uTexel:{value:new ie},uRadius:{value:1.15}}}),this.compositeMaterial=new Gn({vertexShader:Xo,fragmentShader:VA,depthTest:!1,depthWrite:!1,uniforms:{uScene:{value:null},uBloom:{value:null},uRes:{value:new ie(1,1)},uTime:{value:0},uExposure:{value:1.15},uBloomIntensity:{value:.85},uVignette:{value:.28},uFilmGrain:{value:.035},uDispersion:{value:.4},uDebug:{value:0}}}),this.quad=new ji(s,this.geoMaterial),this.quad.frustumCulled=!1,this.scene.add(this.quad),this.sceneTarget=this.makeTarget(1,1),this.canvas.addEventListener("webglcontextlost",this.handleContextLost,!1),this.canvas.addEventListener("webglcontextrestored",this.handleContextRestored,!1),this.resizeInternal(),this.raf=requestAnimationFrame(this.tick)}applySettings(t){const i=t.params,s=this.lastReported,l=s!==null&&Math.abs(i.cameraAzimuth-s.azimuth)<.02&&Math.abs(i.cameraElevation-s.elevation)<.02&&Math.abs(i.cameraDistance-s.distance)<.02,c=Math.abs(i.cameraAzimuth-this.params.cameraAzimuth)>1e-4||Math.abs(i.cameraElevation-this.params.cameraElevation)>1e-4||Math.abs(i.cameraDistance-this.params.cameraDistance)>1e-4;this.params={...i},this.quality=B_(t.quality),this.geoMaterial.uniforms.uDebug.value=t.debug,this.compositeMaterial.uniforms.uDebug.value=t.debug,c&&this.initialised&&!l&&(this.userControlled=!0,this.cinematic=!1),this.initialised=!0,this.camera.fov=this.params.fov,this.camera.updateProjectionMatrix(),(this.userControlled||!this.cinematic)&&!l&&this.applyCameraFromParams(),this.resizeInternal()}setCinematic(t){this.cinematic=t,t&&(this.userControlled=!1,this.cinematicClock=0,this.applyCameraFromParams())}isCinematic(){return this.cinematic&&!this.userControlled}setCaptureMode(t){this.captureMode=t,t&&(this.cinematic=!1)}setTime(t){!Number.isFinite(t)||t<0||(this.simTime=t)}getTime(){return this.simTime}getQuality(){return this.quality}resize(){this.resizeInternal()}isReady(){return this.ready}dispose(){this.disposed=!0,cancelAnimationFrame(this.raf),this.canvas.removeEventListener("webglcontextlost",this.handleContextLost,!1),this.canvas.removeEventListener("webglcontextrestored",this.handleContextRestored,!1),this.controls.dispose(),this.sceneTarget.dispose();for(const t of this.bloomTargets)t.dispose();this.geoMaterial.dispose(),this.brightMaterial.dispose(),this.downMaterial.dispose(),this.upMaterial.dispose(),this.compositeMaterial.dispose(),this.renderer.dispose()}applyCameraFromParams(){const t=this.params.cameraAzimuth*Wi,i=this.params.cameraElevation*Wi,s=this.params.cameraDistance,l=s*Math.cos(i);this.camera.position.set(l*Math.cos(t),l*Math.sin(t),s*Math.sin(i)),this.controls.target.set(0,0,0);const c=this.controls.enableDamping;this.controls.enableDamping=!1,this.controls.update(),this.camera.position.set(l*Math.cos(t),l*Math.sin(t),s*Math.sin(i)),this.controls.target.set(0,0,0),this.controls.update(),this.controls.enableDamping=c,this.camera.lookAt(0,0,0),this.camera.updateMatrixWorld()}readCamera(){const t=this.camera.position.clone().sub(this.controls.target),i=Math.max(t.length(),1e-6),s=Math.acos(Dd.clamp(t.z/i,-1,1));return{fov:this.camera.fov,distance:i,azimuth:Math.atan2(t.y,t.x)/Wi,elevation:90-s/Wi}}reportCamera(){const t=this.readCamera();this.lastReported=t,this.callbacks.onCameraChange?.(t)}makeTarget(t,i){return new Ai(Math.max(1,t),Math.max(1,i),{type:Ii,format:Ti,minFilter:An,magFilter:An,wrapS:Pi,wrapT:Pi,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1,colorSpace:Ta})}releaseTargets(){if(this.orphaned)this.orphaned=!1;else{this.sceneTarget.dispose();for(const t of this.bloomTargets)t.dispose()}this.bloomTargets=[]}resizeInternal(){const t=this.canvas.parentElement,i=Math.max(1,Math.floor(t?.clientWidth??this.canvas.clientWidth)),s=Math.max(1,Math.floor(t?.clientHeight??this.canvas.clientHeight)),l=Math.min(window.devicePixelRatio||1,this.quality.dprCap);this.renderer.setPixelRatio(l),this.renderer.setSize(i,s,!1);const c=Math.max(1,Math.floor(i*l)),h=Math.max(1,Math.floor(s*l));this.compositeMaterial.uniforms.uRes.value.set(c,h);const p=this.quality.resolutionScale*this.adaptiveScale,m=Math.max(1,Math.floor(c*p)),d=Math.max(1,Math.floor(h*p));this.releaseTargets(),this.sceneTarget=this.makeTarget(m,d),this.geoMaterial.uniforms.uRes.value.set(m,d);let x=m,v=d;for(let _=0;_<this.quality.bloomLevels;_++)x=Math.max(1,Math.floor(x/2)),v=Math.max(1,Math.floor(v/2)),this.bloomTargets.push(this.makeTarget(x,v))}tick=t=>{if(this.raf=requestAnimationFrame(this.tick),this.disposed||this.contextLost)return;const i=this.lastFrame?Math.min((t-this.lastFrame)/1e3,.1):0;if(this.lastFrame=t,this.captureMode||(this.simTime+=i*this.params.timeScale),this.isCinematic()){this.cinematicClock+=i;const s=this.cinematicClock,l=this.params.cameraAzimuth+s*1.7,c=Dd.clamp(this.params.cameraElevation+Math.sin(s*.13)*4.5,-88,88),h=this.params.cameraDistance*(1+Math.sin(s*.083)*.055),p=h*Math.cos(c*Wi);this.camera.position.set(p*Math.cos(l*Wi),p*Math.sin(l*Wi),h*Math.sin(c*Wi)),this.controls.target.set(0,0,0)}if(this.controls.update(),this.camera.updateMatrixWorld(),this.render(),this.ready||(this.ready=!0,this.callbacks.onFirstFrame?.()),this.frameAccumulator+=i,this.frameCounter+=1,t-this.lastStats>250){const s=this.frameAccumulator||.001,l=this.frameCounter/s,c=s*1e3/this.frameCounter;this.lastStats=t,this.frameAccumulator=0,this.frameCounter=0,this.adaptQuality(c),this.callbacks.onStats?.({fps:l,frameMs:c,renderScale:this.quality.resolutionScale*this.adaptiveScale,steps:this.quality.maxSteps,dpr:this.renderer.getPixelRatio(),camera:this.readCamera(),cinematic:this.isCinematic(),contextLost:this.contextLost})}};adaptQuality(t){this.captureMode||this.quality.id==="cinematic"||(t>55?(this.slowFrames+=1,this.fastFrames=0):t<26&&(this.fastFrames+=1,this.slowFrames=0),this.slowFrames>=4&&this.adaptiveScale>.4?(this.adaptiveScale=Math.max(.4,this.adaptiveScale-.12),this.slowFrames=0,this.resizeInternal()):this.fastFrames>=12&&this.adaptiveScale<1&&(this.adaptiveScale=Math.min(1,this.adaptiveScale+.08),this.fastFrames=0,this.resizeInternal()))}render(){const t=this.geoMaterial.uniforms;t.uTime.value=this.simTime,t.uCamPos.value.copy(this.camera.position),t.uCamRight.value.setFromMatrixColumn(this.camera.matrixWorld,0),t.uCamUp.value.setFromMatrixColumn(this.camera.matrixWorld,1),t.uCamFwd.value.setFromMatrixColumn(this.camera.matrixWorld,2).negate(),t.uTanHalf.value=Math.tan(this.camera.fov*.5*Wi),t.uMaxSteps.value=this.quality.maxSteps,t.uStepScale.value=this.quality.id==="cinematic"?.016:this.quality.id==="standard"?.028:.022,t.uNoiseOctaves.value=this.quality.noiseOctaves,t.uDiskIn.value=this.params.diskInnerRadius,t.uDiskOut.value=this.params.diskOuterRadius,t.uDiskThick.value=this.params.diskHalfThickness,t.uDiskTemp.value=this.params.diskTemperature,t.uDiskEmission.value=this.params.diskEmission,t.uDiskOpacity.value=this.params.diskOpacity,t.uOrbitalSpeed.value=this.params.orbitalSpeed,t.uTurbAmp.value=this.params.turbulenceAmplitude,t.uTurbSpeed.value=this.params.turbulenceSpeed,t.uTurbScale.value=this.params.turbulenceScale,t.uStarDensity.value=this.params.starDensity,t.uStarBright.value=this.params.starBrightness,t.uGalaxyBright.value=this.params.galaxyBrightness;const i=this.compositeMaterial.uniforms;i.uTime.value=this.simTime,i.uExposure.value=this.params.exposure,i.uBloomIntensity.value=this.params.bloomIntensity,i.uVignette.value=this.params.vignette,i.uFilmGrain.value=this.params.filmGrain,i.uDispersion.value=this.params.dispersion,this.quad.material=this.geoMaterial,this.renderer.setRenderTarget(this.sceneTarget),this.renderer.render(this.scene,this.passCamera),this.brightMaterial.uniforms.uSrc.value=this.sceneTarget.texture,this.brightMaterial.uniforms.uThreshold.value=this.params.bloomThreshold,this.quad.material=this.brightMaterial,this.renderer.setRenderTarget(this.bloomTargets[0]),this.renderer.render(this.scene,this.passCamera),this.quad.material=this.downMaterial;for(let s=1;s<this.bloomTargets.length;s++){const l=this.bloomTargets[s-1];this.downMaterial.uniforms.uSrc.value=l.texture,this.downMaterial.uniforms.uTexel.value.set(1/l.width,1/l.height),this.renderer.setRenderTarget(this.bloomTargets[s]),this.renderer.render(this.scene,this.passCamera)}this.quad.material=this.upMaterial,this.renderer.autoClear=!1;for(let s=this.bloomTargets.length-1;s>0;s--){const l=this.bloomTargets[s];this.upMaterial.uniforms.uSrc.value=l.texture,this.upMaterial.uniforms.uTexel.value.set(1/l.width,1/l.height),this.renderer.setRenderTarget(this.bloomTargets[s-1]),this.renderer.render(this.scene,this.passCamera)}this.renderer.autoClear=!0,this.compositeMaterial.uniforms.uScene.value=this.sceneTarget.texture,this.compositeMaterial.uniforms.uBloom.value=this.bloomTargets[0].texture,this.quad.material=this.compositeMaterial,this.renderer.setRenderTarget(null),this.renderer.render(this.scene,this.passCamera)}handleContextLost=t=>{t.preventDefault(),this.contextLost=!0,this.orphaned=!0,cancelAnimationFrame(this.raf),this.callbacks.onContextLost?.()};handleContextRestored=()=>{const t=this.renderer.getContext();t.getExtension("EXT_color_buffer_float"),t.getExtension("EXT_color_buffer_half_float"),t.getExtension("OES_texture_float_linear"),this.geoMaterial.needsUpdate=!0,this.brightMaterial.needsUpdate=!0,this.downMaterial.needsUpdate=!0,this.upMaterial.needsUpdate=!0,this.compositeMaterial.needsUpdate=!0,this.contextLost=!1,this.lastFrame=0,this.resizeInternal(),this.raf=requestAnimationFrame(this.tick),this.callbacks.onContextRestored?.()}}const kh=[{id:0,name:"Final composite",description:"HDR frame with bloom, ACES tone mapping, dispersion, vignette and grain.",raw:!1},{id:1,name:"Ray termination",description:"Why the ray stopped: blue escaped to the sky, red fell through the horizon, amber ran out of steps.",raw:!0},{id:2,name:"Horizon & capture boundary",description:"Event horizon mask. Black is inside r = 1, the magenta ring is the critical capture boundary b = 3√3 M.",raw:!0},{id:3,name:"Disc crossing order",description:"How many times the bent ray cut the disc plane and in what order. One crossing is green, two yellow, three orange, four or more red.",raw:!0},{id:4,name:"First crossing radius",description:"Radius of the first disc crossing, mapped from 0 (red) to the outer edge (blue).",raw:!0},{id:5,name:"Gravitational redshift",description:"Redshift factor √(1 − 2M/r) at the first disc crossing. White is unshifted, red is deeply redshifted.",raw:!0},{id:6,name:"Doppler factor",description:"Relativistic beaming factor at the first crossing. Blue approaches the observer, red recedes.",raw:!0},{id:7,name:"Lensed sky coordinates",description:"Where the escaped ray points at infinity, as a red/green spherical chart. The pinch around the shadow is the lensing.",raw:!0},{id:8,name:"Stars & galaxy only",description:"The procedural sky with the disc removed, lensed by the same geodesics.",raw:!0},{id:9,name:"HDR before tone mapping",description:"Logarithmic false colour of the linear radiance before the tone curve. White means clipped.",raw:!0}],YA=0,jd=[{id:0,name:"Iconic",subtitle:"Just above the plane — the far side arches over the shadow.",camera:{fov:40,cameraDistance:26,cameraAzimuth:0,cameraElevation:12}},{id:1,name:"Polar",subtitle:"Down the spin axis — the disc reads as a lensed ring.",camera:{fov:46,cameraDistance:26,cameraAzimuth:34,cameraElevation:76}},{id:2,name:"Edge-on",subtitle:"Inside the disc plane — halo above and halo below.",camera:{fov:44,cameraDistance:24,cameraAzimuth:-58,cameraElevation:1.5}},{id:3,name:"Skimming",subtitle:"Close and wide, from below the plane — the horizon fills the frame.",camera:{fov:68,cameraDistance:11,cameraAzimuth:128,cameraElevation:-24}}],ZA=0;function KA(r){return jd.find(t=>t.id===r)??null}function Ld(r,t){const i=KA(t);if(!i)return r;const s={...r};for(const[l,c]of Object.entries(i.camera))c!==void 0&&(s[l]=c);return s}function QA({def:r,value:t,onChange:i,onReset:s,disabled:l}){const c=`param-${r.key}`,h=Math.abs(t-r.default)<1e-6;return kt.jsxs("div",{className:`slider${l?" slider--disabled":""}`,children:[kt.jsxs("div",{className:"slider__head",children:[kt.jsx("label",{className:"slider__label",htmlFor:c,title:r.hint,children:r.label}),kt.jsx("span",{className:"slider__value",children:z_(r.key,t)}),kt.jsx("button",{type:"button",className:"slider__reset",onClick:s,disabled:l||h,"aria-label":`Reset ${r.label}`,title:`Reset ${r.label} to ${z_(r.key,r.default)}`,children:"↺"})]}),kt.jsx("input",{id:c,type:"range",min:r.min,max:r.max,step:r.step,value:t,disabled:l,onChange:p=>i(Number(p.target.value))})]})}function JA({values:r,onChange:t,onResetParam:i,onResetAll:s,disabled:l}){return kt.jsxs("div",{className:"panel",children:[kt.jsxs("div",{className:"panel__head",children:[kt.jsx("h2",{className:"panel__title",children:"Parameters"}),kt.jsx("button",{type:"button",className:"button button--ghost",onClick:s,children:"Reset all"})]}),kt.jsx("div",{className:"panel__body",children:XA.map(c=>{const h=Qd.filter(p=>p.group===c);return kt.jsxs("section",{className:"panel__group",children:[kt.jsx("h3",{className:"panel__groupTitle",children:kA[c]}),h.map(p=>kt.jsx(QA,{def:p,value:r[p.key],onChange:m=>t(p.key,m),onReset:()=>i(p.key),disabled:l},p.key))]},c)})})]})}function jA({open:r,values:t,debug:i,quality:s,preset:l,stats:c,cinematic:h,captureMode:p,contextLost:m,onToggle:d,onParamChange:x,onResetParam:v,onResetAll:_,onPreset:E,onQuality:R,onDebug:N,onCinematic:y}){const S=kh[i]??kh[0],I=Is.find(B=>B.id===s);return kt.jsxs("div",{className:`hud${r?" hud--open":""}`,children:[kt.jsxs("header",{className:"hud__title",children:[kt.jsx("h1",{className:"hud__name",children:"GARGANTUA"}),kt.jsx("p",{className:"hud__subtitle",children:"Schwarzschild null-geodesic raytracer"})]}),kt.jsx("button",{type:"button",className:"hud__toggle",onClick:d,"aria-expanded":r,title:"Show or hide the panel (H)",children:r?"Hide panel ▸":"◂ Panel"}),r?kt.jsxs(kt.Fragment,{children:[kt.jsxs("section",{className:"hud__status",children:[kt.jsxs("div",{className:"status__row",children:[kt.jsx("span",{className:"status__key",children:"Quality"}),kt.jsxs("span",{className:"status__value",children:[I.label,kt.jsxs("span",{className:"status__dim",children:[" ","· ",Math.round(c?c.renderScale*100:I.resolutionScale*100),"% scale · ",I.maxSteps," steps · ",c?c.dpr.toFixed(2):"1","× dpr"]})]})]}),kt.jsxs("div",{className:"status__row",children:[kt.jsx("span",{className:"status__key",children:"Camera"}),kt.jsxs("span",{className:"status__value",children:[h?"Cinematic loop":"Manual",kt.jsxs("span",{className:"status__dim",children:[" ","· ",t.cameraAzimuth.toFixed(0),"° / ",t.cameraElevation.toFixed(0),"° /"," ",t.cameraDistance.toFixed(1)," rₛ"]})]})]}),kt.jsxs("div",{className:"status__row",children:[kt.jsx("span",{className:"status__key",children:"Debug view"}),kt.jsxs("span",{className:"status__value",children:[i," — ",S.name]})]}),kt.jsx("p",{className:"status__note",children:S.description}),c?kt.jsxs("p",{className:"status__note status__note--dim",children:[c.fps.toFixed(0)," fps · ",c.frameMs.toFixed(1)," ms",p?" · capture mode (frozen)":""]}):null]}),kt.jsx("nav",{className:"hud__presets","aria-label":"Camera presets",children:jd.map(B=>kt.jsxs("button",{type:"button",className:`preset${l===B.id?" preset--active":""}`,onClick:()=>E(B.id),title:`${B.subtitle} (Shift+${B.id+1})`,children:[kt.jsxs("span",{className:"preset__index",children:["Shift+",B.id+1]}),kt.jsx("span",{className:"preset__name",children:B.name})]},B.id))}),kt.jsxs("section",{className:"hud__quality","aria-label":"Quality",children:[Is.map(B=>kt.jsx("button",{type:"button",className:`chip${s===B.id?" chip--active":""}`,onClick:()=>R(B.id),title:B.description,children:B.label},B.id)),kt.jsx("button",{type:"button",className:`chip${h?" chip--active":""}`,onClick:y,title:"Play or pause the cinematic camera loop (Space)",children:h?"❙❙ Loop":"▶ Loop"})]}),kt.jsx("section",{className:"hud__debug","aria-label":"Debug views",children:kh.map(B=>kt.jsx("button",{type:"button",className:`chip chip--tiny${i===B.id?" chip--active":""}`,onClick:()=>N(B.id),title:B.description,children:B.id},B.id))}),kt.jsx(JA,{values:t,onChange:x,onResetParam:v,onResetAll:_}),kt.jsxs("footer",{className:"hud__keys",children:[kt.jsxs("span",{children:[kt.jsx("kbd",{children:"0"}),"–",kt.jsx("kbd",{children:"9"})," debug"]}),kt.jsxs("span",{children:[kt.jsx("kbd",{children:"Shift"}),"+",kt.jsx("kbd",{children:"1"}),"–",kt.jsx("kbd",{children:"4"})," presets"]}),kt.jsxs("span",{children:[kt.jsx("kbd",{children:"Space"})," loop"]}),kt.jsxs("span",{children:[kt.jsx("kbd",{children:"H"})," panel"]}),kt.jsxs("span",{children:[kt.jsx("kbd",{children:"R"})," reset"]}),kt.jsxs("span",{children:[kt.jsx("kbd",{children:"Q"})," quality"]})]})]}):null,m?kt.jsx("div",{className:"lost",role:"status",children:kt.jsxs("div",{className:"lost__card",children:[kt.jsx("h2",{children:"WebGL context lost"}),kt.jsx("p",{children:"The browser took the graphics context back. The renderer is rebuilding its targets and will resume on the same frame — nothing has been lost."})]})}):null]})}function Od(){return{params:Rv(),quality:wv,preset:ZA,debug:YA,hudOpen:!0}}const Dv="gargantua.settings",Uv=1;function $A(r){try{const t={version:Uv,settings:r};window.localStorage.setItem(Dv,JSON.stringify(t))}catch{}}function Nv(){try{const r=window.localStorage.getItem(Dv);if(!r)return null;const t=JSON.parse(r);if(!t||typeof t!="object")return null;const i=t;return i.version!==Uv||!i.settings||typeof i.settings!="object"?null:i}catch{return null}}function tR(){const r=Od(),t=Nv();if(!t)return r;const i=t.settings,s={...r.params},l=i.params??{};for(const c of Object.keys(eu)){const h=l[c];typeof h=="number"&&Number.isFinite(h)&&(s[c]=Cv(c,Ir(c,h)))}return{params:s,quality:Jd(i.quality)?i.quality:r.quality,preset:eR(i.preset)?i.preset:r.preset,debug:nR(i.debug)?i.debug:r.debug,hudOpen:typeof i.hudOpen=="boolean"?i.hudOpen:r.hudOpen}}function eR(r){return typeof r=="number"&&Number.isInteger(r)&&jd.some(t=>t.id===r)}function nR(r){return typeof r=="number"&&Number.isInteger(r)&&r>=0&&r<=9}function iR(){return Nv()!==null}function aR(r){const t=new URLSearchParams(r),i={capture:t.get("capture")==="1",quality:null,preset:null,debug:null,time:null,hud:null},s=t.get("quality");s!==null&&Jd(s)&&(i.quality=s);const l=t.get("preset");if(l!==null&&/^-?\d+$/.test(l.trim())){const m=Number.parseInt(l,10);Number.isInteger(m)&&m>=0&&m<=3&&(i.preset=m)}const c=t.get("debug");if(c!==null&&/^-?\d+$/.test(c.trim())){const m=Number.parseInt(c,10);Number.isInteger(m)&&m>=0&&m<=9&&(i.debug=m)}const h=t.get("time");if(h!==null&&h.trim()!==""){const m=Number(h);Number.isFinite(m)&&m>=0&&(i.time=m)}const p=t.get("hud");return p==="0"?i.hud=!1:p==="1"&&(i.hud=!0),i}function sR(){const r=aR(window.location.search);let t=tR();return r.quality&&(t={...t,quality:r.quality}),r.debug!==null&&(t={...t,debug:r.debug}),r.hud!==null?t={...t,hudOpen:r.hud}:!iR()&&rR()&&(t={...t,hudOpen:!1}),r.preset!==null&&(t={...t,preset:r.preset,params:Ld(t.params,r.preset)}),{settings:t,url:r}}function rR(){return typeof window.matchMedia=="function"?window.matchMedia("(max-width: 900px)").matches:!1}function oR(){const r=sn.useMemo(sR,[]),[t,i]=sn.useState(r.settings),[s,l]=sn.useState(null),[c,h]=sn.useState(!1),p=sn.useRef(t),m=sn.useRef(null),d=sn.useRef(null),x=sn.useRef(!1),v=sn.useCallback(U=>{const C=U(p.current);return p.current=C,i(C),C},[]);sn.useEffect(()=>{const U=d.current;if(!U)return;const C=new qA(U,{onStats:O=>l(O),onContextLost:()=>h(!0),onContextRestored:()=>h(!1),onCameraChange:O=>{v(W=>({...W,params:{...W.params,fov:Ir("fov",O.fov),cameraDistance:Ir("cameraDistance",O.distance),cameraAzimuth:Ir("cameraAzimuth",O.azimuth),cameraElevation:Ir("cameraElevation",O.elevation)}}))},onFirstFrame:()=>{x.current=!0,document.documentElement.dataset.gargantuaReady="true"}});m.current=C,C.applySettings(p.current),r.url.capture?(C.setCaptureMode(!0),C.setTime(r.url.time??0)):r.url.time!==null&&C.setTime(r.url.time);const P=U.parentElement,b=P?new ResizeObserver(()=>C.resize()):null;return b?.observe(P),()=>{b?.disconnect(),C.dispose(),m.current=null}},[r,v]),sn.useEffect(()=>{m.current?.applySettings(t)},[t]),sn.useEffect(()=>{const U=window.setTimeout(()=>$A(t),350);return()=>window.clearTimeout(U)},[t]);const _=sn.useCallback((U,C)=>{v(P=>({...P,params:{...P.params,[U]:Cv(U,C)}}))},[v]),E=sn.useCallback(U=>{v(C=>({...C,params:{...C.params,[U]:Od().params[U]}}))},[v]),R=sn.useCallback(()=>{v(()=>Od())},[v]),N=sn.useCallback(U=>{v(C=>({...C,preset:U,params:Ld(C.params,U)}))},[v]),y=sn.useCallback(U=>{v(C=>({...C,quality:U}))},[v]),S=sn.useCallback(U=>{v(C=>({...C,debug:U}))},[v]),I=sn.useCallback(()=>{v(U=>({...U,hudOpen:!U.hudOpen}))},[v]),B=sn.useCallback(()=>{const U=m.current;U&&(U.setCinematic(!U.isCinematic()),v(C=>({...C})))},[v]);sn.useEffect(()=>{const U=C=>{const P=C.target;if(!(P&&(P.tagName==="INPUT"||P.tagName==="TEXTAREA"))){if(C.shiftKey&&/^Digit[1-4]$/.test(C.code)){N(Number(C.code.slice(5))-1),C.preventDefault();return}if(!C.shiftKey&&/^Digit[0-9]$/.test(C.code)){S(Number(C.code.slice(5))),C.preventDefault();return}switch(C.code){case"Space":B(),C.preventDefault();break;case"KeyH":I();break;case"KeyR":R();break;case"KeyQ":y(WA(p.current.quality));break}}};return window.addEventListener("keydown",U),()=>window.removeEventListener("keydown",U)},[R,S,N,y,B,I]),sn.useEffect(()=>(Object.defineProperty(window,"__GARGANTUA__",{value:{get ready(){return x.current},getState(){const C=p.current;return{ready:x.current,quality:C.quality,preset:C.preset,debug:C.debug,hudOpen:C.hudOpen,params:{...C.params},time:m.current?.getTime()??0}},setQuality(C){return Jd(C)?v(P=>({...P,quality:C})):null},setPreset(C){return typeof C!="number"||!Number.isInteger(C)||C<0||C>3?null:v(P=>({...P,preset:C,params:Ld(P.params,C)}))},setDebug(C){return typeof C!="number"||!Number.isInteger(C)||C<0||C>9?null:v(P=>({...P,debug:C}))},setTime(C){return typeof C!="number"||!Number.isFinite(C)||C<0?null:(m.current?.setTime(C),{...p.current,time:C})}},writable:!1,configurable:!0}),()=>{delete window.__GARGANTUA__}),[v]);const D=s?.cinematic??!0;return kt.jsxs("div",{className:"app",children:[kt.jsx("div",{className:"app__stage",children:kt.jsx("canvas",{ref:d,className:"app__canvas"})}),kt.jsx(jA,{open:t.hudOpen,values:t.params,debug:t.debug,quality:t.quality,preset:t.preset,stats:s,cinematic:D,captureMode:r.url.capture,contextLost:c,onToggle:I,onParamChange:_,onResetParam:E,onResetAll:R,onPreset:N,onQuality:y,onDebug:S,onCinematic:B})]})}const Lv=document.getElementById("root");if(!Lv)throw new Error("missing #root");WS.createRoot(Lv).render(kt.jsx(oR,{}));
