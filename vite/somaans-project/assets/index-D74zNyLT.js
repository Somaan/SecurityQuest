(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))c(l);new MutationObserver(l=>{for(const u of l)if(u.type==="childList")for(const d of u.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&c(d)}).observe(document,{childList:!0,subtree:!0});function i(l){const u={};return l.integrity&&(u.integrity=l.integrity),l.referrerPolicy&&(u.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?u.credentials="include":l.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function c(l){if(l.ep)return;l.ep=!0;const u=i(l);fetch(l.href,u)}})();function Jd(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var ud={exports:{}},Si={},cd={exports:{}},ze={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wp;function ey(){if(Wp)return ze;Wp=1;var r=Symbol.for("react.element"),a=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),d=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),v=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),x=Symbol.iterator;function g(j){return j===null||typeof j!="object"?null:(j=x&&j[x]||j["@@iterator"],typeof j=="function"?j:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},b=Object.assign,w={};function N(j,V,xe){this.props=j,this.context=V,this.refs=w,this.updater=xe||E}N.prototype.isReactComponent={},N.prototype.setState=function(j,V){if(typeof j!="object"&&typeof j!="function"&&j!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,j,V,"setState")},N.prototype.forceUpdate=function(j){this.updater.enqueueForceUpdate(this,j,"forceUpdate")};function _(){}_.prototype=N.prototype;function k(j,V,xe){this.props=j,this.context=V,this.refs=w,this.updater=xe||E}var I=k.prototype=new _;I.constructor=k,b(I,N.prototype),I.isPureReactComponent=!0;var z=Array.isArray,O=Object.prototype.hasOwnProperty,Z={current:null},F={key:!0,ref:!0,__self:!0,__source:!0};function U(j,V,xe){var Ne,Ce={},Ee=null,je=null;if(V!=null)for(Ne in V.ref!==void 0&&(je=V.ref),V.key!==void 0&&(Ee=""+V.key),V)O.call(V,Ne)&&!F.hasOwnProperty(Ne)&&(Ce[Ne]=V[Ne]);var Me=arguments.length-2;if(Me===1)Ce.children=xe;else if(1<Me){for(var Le=Array(Me),Ke=0;Ke<Me;Ke++)Le[Ke]=arguments[Ke+2];Ce.children=Le}if(j&&j.defaultProps)for(Ne in Me=j.defaultProps,Me)Ce[Ne]===void 0&&(Ce[Ne]=Me[Ne]);return{$$typeof:r,type:j,key:Ee,ref:je,props:Ce,_owner:Z.current}}function Q(j,V){return{$$typeof:r,type:j.type,key:V,ref:j.ref,props:j.props,_owner:j._owner}}function T(j){return typeof j=="object"&&j!==null&&j.$$typeof===r}function J(j){var V={"=":"=0",":":"=2"};return"$"+j.replace(/[=:]/g,function(xe){return V[xe]})}var me=/\/+/g;function ce(j,V){return typeof j=="object"&&j!==null&&j.key!=null?J(""+j.key):V.toString(36)}function ue(j,V,xe,Ne,Ce){var Ee=typeof j;(Ee==="undefined"||Ee==="boolean")&&(j=null);var je=!1;if(j===null)je=!0;else switch(Ee){case"string":case"number":je=!0;break;case"object":switch(j.$$typeof){case r:case a:je=!0}}if(je)return je=j,Ce=Ce(je),j=Ne===""?"."+ce(je,0):Ne,z(Ce)?(xe="",j!=null&&(xe=j.replace(me,"$&/")+"/"),ue(Ce,V,xe,"",function(Ke){return Ke})):Ce!=null&&(T(Ce)&&(Ce=Q(Ce,xe+(!Ce.key||je&&je.key===Ce.key?"":(""+Ce.key).replace(me,"$&/")+"/")+j)),V.push(Ce)),1;if(je=0,Ne=Ne===""?".":Ne+":",z(j))for(var Me=0;Me<j.length;Me++){Ee=j[Me];var Le=Ne+ce(Ee,Me);je+=ue(Ee,V,xe,Le,Ce)}else if(Le=g(j),typeof Le=="function")for(j=Le.call(j),Me=0;!(Ee=j.next()).done;)Ee=Ee.value,Le=Ne+ce(Ee,Me++),je+=ue(Ee,V,xe,Le,Ce);else if(Ee==="object")throw V=String(j),Error("Objects are not valid as a React child (found: "+(V==="[object Object]"?"object with keys {"+Object.keys(j).join(", ")+"}":V)+"). If you meant to render a collection of children, use an array instead.");return je}function G(j,V,xe){if(j==null)return j;var Ne=[],Ce=0;return ue(j,Ne,"","",function(Ee){return V.call(xe,Ee,Ce++)}),Ne}function oe(j){if(j._status===-1){var V=j._result;V=V(),V.then(function(xe){(j._status===0||j._status===-1)&&(j._status=1,j._result=xe)},function(xe){(j._status===0||j._status===-1)&&(j._status=2,j._result=xe)}),j._status===-1&&(j._status=0,j._result=V)}if(j._status===1)return j._result.default;throw j._result}var W={current:null},q={transition:null},K={ReactCurrentDispatcher:W,ReactCurrentBatchConfig:q,ReactCurrentOwner:Z};function Y(){throw Error("act(...) is not supported in production builds of React.")}return ze.Children={map:G,forEach:function(j,V,xe){G(j,function(){V.apply(this,arguments)},xe)},count:function(j){var V=0;return G(j,function(){V++}),V},toArray:function(j){return G(j,function(V){return V})||[]},only:function(j){if(!T(j))throw Error("React.Children.only expected to receive a single React element child.");return j}},ze.Component=N,ze.Fragment=i,ze.Profiler=l,ze.PureComponent=k,ze.StrictMode=c,ze.Suspense=m,ze.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=K,ze.act=Y,ze.cloneElement=function(j,V,xe){if(j==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+j+".");var Ne=b({},j.props),Ce=j.key,Ee=j.ref,je=j._owner;if(V!=null){if(V.ref!==void 0&&(Ee=V.ref,je=Z.current),V.key!==void 0&&(Ce=""+V.key),j.type&&j.type.defaultProps)var Me=j.type.defaultProps;for(Le in V)O.call(V,Le)&&!F.hasOwnProperty(Le)&&(Ne[Le]=V[Le]===void 0&&Me!==void 0?Me[Le]:V[Le])}var Le=arguments.length-2;if(Le===1)Ne.children=xe;else if(1<Le){Me=Array(Le);for(var Ke=0;Ke<Le;Ke++)Me[Ke]=arguments[Ke+2];Ne.children=Me}return{$$typeof:r,type:j.type,key:Ce,ref:Ee,props:Ne,_owner:je}},ze.createContext=function(j){return j={$$typeof:d,_currentValue:j,_currentValue2:j,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},j.Provider={$$typeof:u,_context:j},j.Consumer=j},ze.createElement=U,ze.createFactory=function(j){var V=U.bind(null,j);return V.type=j,V},ze.createRef=function(){return{current:null}},ze.forwardRef=function(j){return{$$typeof:p,render:j}},ze.isValidElement=T,ze.lazy=function(j){return{$$typeof:y,_payload:{_status:-1,_result:j},_init:oe}},ze.memo=function(j,V){return{$$typeof:v,type:j,compare:V===void 0?null:V}},ze.startTransition=function(j){var V=q.transition;q.transition={};try{j()}finally{q.transition=V}},ze.unstable_act=Y,ze.useCallback=function(j,V){return W.current.useCallback(j,V)},ze.useContext=function(j){return W.current.useContext(j)},ze.useDebugValue=function(){},ze.useDeferredValue=function(j){return W.current.useDeferredValue(j)},ze.useEffect=function(j,V){return W.current.useEffect(j,V)},ze.useId=function(){return W.current.useId()},ze.useImperativeHandle=function(j,V,xe){return W.current.useImperativeHandle(j,V,xe)},ze.useInsertionEffect=function(j,V){return W.current.useInsertionEffect(j,V)},ze.useLayoutEffect=function(j,V){return W.current.useLayoutEffect(j,V)},ze.useMemo=function(j,V){return W.current.useMemo(j,V)},ze.useReducer=function(j,V,xe){return W.current.useReducer(j,V,xe)},ze.useRef=function(j){return W.current.useRef(j)},ze.useState=function(j){return W.current.useState(j)},ze.useSyncExternalStore=function(j,V,xe){return W.current.useSyncExternalStore(j,V,xe)},ze.useTransition=function(){return W.current.useTransition()},ze.version="18.3.1",ze}var Gp;function ef(){return Gp||(Gp=1,cd.exports=ey()),cd.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Vp;function ty(){if(Vp)return Si;Vp=1;var r=ef(),a=Symbol.for("react.element"),i=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,l=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,u={key:!0,ref:!0,__self:!0,__source:!0};function d(p,m,v){var y,x={},g=null,E=null;v!==void 0&&(g=""+v),m.key!==void 0&&(g=""+m.key),m.ref!==void 0&&(E=m.ref);for(y in m)c.call(m,y)&&!u.hasOwnProperty(y)&&(x[y]=m[y]);if(p&&p.defaultProps)for(y in m=p.defaultProps,m)x[y]===void 0&&(x[y]=m[y]);return{$$typeof:a,type:p,key:g,ref:E,props:x,_owner:l.current}}return Si.Fragment=i,Si.jsx=d,Si.jsxs=d,Si}var Kp;function ry(){return Kp||(Kp=1,ud.exports=ty()),ud.exports}var o=ry(),R=ef();const qe=Jd(R);var no={},dd={exports:{}},Ct={},fd={exports:{}},md={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yp;function ny(){return Yp||(Yp=1,function(r){function a(q,K){var Y=q.length;q.push(K);e:for(;0<Y;){var j=Y-1>>>1,V=q[j];if(0<l(V,K))q[j]=K,q[Y]=V,Y=j;else break e}}function i(q){return q.length===0?null:q[0]}function c(q){if(q.length===0)return null;var K=q[0],Y=q.pop();if(Y!==K){q[0]=Y;e:for(var j=0,V=q.length,xe=V>>>1;j<xe;){var Ne=2*(j+1)-1,Ce=q[Ne],Ee=Ne+1,je=q[Ee];if(0>l(Ce,Y))Ee<V&&0>l(je,Ce)?(q[j]=je,q[Ee]=Y,j=Ee):(q[j]=Ce,q[Ne]=Y,j=Ne);else if(Ee<V&&0>l(je,Y))q[j]=je,q[Ee]=Y,j=Ee;else break e}}return K}function l(q,K){var Y=q.sortIndex-K.sortIndex;return Y!==0?Y:q.id-K.id}if(typeof performance=="object"&&typeof performance.now=="function"){var u=performance;r.unstable_now=function(){return u.now()}}else{var d=Date,p=d.now();r.unstable_now=function(){return d.now()-p}}var m=[],v=[],y=1,x=null,g=3,E=!1,b=!1,w=!1,N=typeof setTimeout=="function"?setTimeout:null,_=typeof clearTimeout=="function"?clearTimeout:null,k=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function I(q){for(var K=i(v);K!==null;){if(K.callback===null)c(v);else if(K.startTime<=q)c(v),K.sortIndex=K.expirationTime,a(m,K);else break;K=i(v)}}function z(q){if(w=!1,I(q),!b)if(i(m)!==null)b=!0,oe(O);else{var K=i(v);K!==null&&W(z,K.startTime-q)}}function O(q,K){b=!1,w&&(w=!1,_(U),U=-1),E=!0;var Y=g;try{for(I(K),x=i(m);x!==null&&(!(x.expirationTime>K)||q&&!J());){var j=x.callback;if(typeof j=="function"){x.callback=null,g=x.priorityLevel;var V=j(x.expirationTime<=K);K=r.unstable_now(),typeof V=="function"?x.callback=V:x===i(m)&&c(m),I(K)}else c(m);x=i(m)}if(x!==null)var xe=!0;else{var Ne=i(v);Ne!==null&&W(z,Ne.startTime-K),xe=!1}return xe}finally{x=null,g=Y,E=!1}}var Z=!1,F=null,U=-1,Q=5,T=-1;function J(){return!(r.unstable_now()-T<Q)}function me(){if(F!==null){var q=r.unstable_now();T=q;var K=!0;try{K=F(!0,q)}finally{K?ce():(Z=!1,F=null)}}else Z=!1}var ce;if(typeof k=="function")ce=function(){k(me)};else if(typeof MessageChannel<"u"){var ue=new MessageChannel,G=ue.port2;ue.port1.onmessage=me,ce=function(){G.postMessage(null)}}else ce=function(){N(me,0)};function oe(q){F=q,Z||(Z=!0,ce())}function W(q,K){U=N(function(){q(r.unstable_now())},K)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(q){q.callback=null},r.unstable_continueExecution=function(){b||E||(b=!0,oe(O))},r.unstable_forceFrameRate=function(q){0>q||125<q?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Q=0<q?Math.floor(1e3/q):5},r.unstable_getCurrentPriorityLevel=function(){return g},r.unstable_getFirstCallbackNode=function(){return i(m)},r.unstable_next=function(q){switch(g){case 1:case 2:case 3:var K=3;break;default:K=g}var Y=g;g=K;try{return q()}finally{g=Y}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(q,K){switch(q){case 1:case 2:case 3:case 4:case 5:break;default:q=3}var Y=g;g=q;try{return K()}finally{g=Y}},r.unstable_scheduleCallback=function(q,K,Y){var j=r.unstable_now();switch(typeof Y=="object"&&Y!==null?(Y=Y.delay,Y=typeof Y=="number"&&0<Y?j+Y:j):Y=j,q){case 1:var V=-1;break;case 2:V=250;break;case 5:V=1073741823;break;case 4:V=1e4;break;default:V=5e3}return V=Y+V,q={id:y++,callback:K,priorityLevel:q,startTime:Y,expirationTime:V,sortIndex:-1},Y>j?(q.sortIndex=Y,a(v,q),i(m)===null&&q===i(v)&&(w?(_(U),U=-1):w=!0,W(z,Y-j))):(q.sortIndex=V,a(m,q),b||E||(b=!0,oe(O))),q},r.unstable_shouldYield=J,r.unstable_wrapCallback=function(q){var K=g;return function(){var Y=g;g=K;try{return q.apply(this,arguments)}finally{g=Y}}}}(md)),md}var Qp;function ay(){return Qp||(Qp=1,fd.exports=ny()),fd.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xp;function iy(){if(Xp)return Ct;Xp=1;var r=ef(),a=ay();function i(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var c=new Set,l={};function u(e,t){d(e,t),d(e+"Capture",t)}function d(e,t){for(l[e]=t,e=0;e<t.length;e++)c.add(t[e])}var p=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),m=Object.prototype.hasOwnProperty,v=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,y={},x={};function g(e){return m.call(x,e)?!0:m.call(y,e)?!1:v.test(e)?x[e]=!0:(y[e]=!0,!1)}function E(e,t,n,s){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return s?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function b(e,t,n,s){if(t===null||typeof t>"u"||E(e,t,n,s))return!0;if(s)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function w(e,t,n,s,f,h,S){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=s,this.attributeNamespace=f,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=h,this.removeEmptyString=S}var N={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){N[e]=new w(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];N[t]=new w(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){N[e]=new w(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){N[e]=new w(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){N[e]=new w(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){N[e]=new w(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){N[e]=new w(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){N[e]=new w(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){N[e]=new w(e,5,!1,e.toLowerCase(),null,!1,!1)});var _=/[\-:]([a-z])/g;function k(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(_,k);N[t]=new w(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(_,k);N[t]=new w(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(_,k);N[t]=new w(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){N[e]=new w(e,1,!1,e.toLowerCase(),null,!1,!1)}),N.xlinkHref=new w("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){N[e]=new w(e,1,!1,e.toLowerCase(),null,!0,!0)});function I(e,t,n,s){var f=N.hasOwnProperty(t)?N[t]:null;(f!==null?f.type!==0:s||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(b(t,n,f,s)&&(n=null),s||f===null?g(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):f.mustUseProperty?e[f.propertyName]=n===null?f.type===3?!1:"":n:(t=f.attributeName,s=f.attributeNamespace,n===null?e.removeAttribute(t):(f=f.type,n=f===3||f===4&&n===!0?"":""+n,s?e.setAttributeNS(s,t,n):e.setAttribute(t,n))))}var z=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,O=Symbol.for("react.element"),Z=Symbol.for("react.portal"),F=Symbol.for("react.fragment"),U=Symbol.for("react.strict_mode"),Q=Symbol.for("react.profiler"),T=Symbol.for("react.provider"),J=Symbol.for("react.context"),me=Symbol.for("react.forward_ref"),ce=Symbol.for("react.suspense"),ue=Symbol.for("react.suspense_list"),G=Symbol.for("react.memo"),oe=Symbol.for("react.lazy"),W=Symbol.for("react.offscreen"),q=Symbol.iterator;function K(e){return e===null||typeof e!="object"?null:(e=q&&e[q]||e["@@iterator"],typeof e=="function"?e:null)}var Y=Object.assign,j;function V(e){if(j===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);j=t&&t[1]||""}return`
`+j+e}var xe=!1;function Ne(e,t){if(!e||xe)return"";xe=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(H){var s=H}Reflect.construct(e,[],t)}else{try{t.call()}catch(H){s=H}e.call(t.prototype)}else{try{throw Error()}catch(H){s=H}e()}}catch(H){if(H&&s&&typeof H.stack=="string"){for(var f=H.stack.split(`
`),h=s.stack.split(`
`),S=f.length-1,C=h.length-1;1<=S&&0<=C&&f[S]!==h[C];)C--;for(;1<=S&&0<=C;S--,C--)if(f[S]!==h[C]){if(S!==1||C!==1)do if(S--,C--,0>C||f[S]!==h[C]){var L=`
`+f[S].replace(" at new "," at ");return e.displayName&&L.includes("<anonymous>")&&(L=L.replace("<anonymous>",e.displayName)),L}while(1<=S&&0<=C);break}}}finally{xe=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?V(e):""}function Ce(e){switch(e.tag){case 5:return V(e.type);case 16:return V("Lazy");case 13:return V("Suspense");case 19:return V("SuspenseList");case 0:case 2:case 15:return e=Ne(e.type,!1),e;case 11:return e=Ne(e.type.render,!1),e;case 1:return e=Ne(e.type,!0),e;default:return""}}function Ee(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case F:return"Fragment";case Z:return"Portal";case Q:return"Profiler";case U:return"StrictMode";case ce:return"Suspense";case ue:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case J:return(e.displayName||"Context")+".Consumer";case T:return(e._context.displayName||"Context")+".Provider";case me:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case G:return t=e.displayName||null,t!==null?t:Ee(e.type)||"Memo";case oe:t=e._payload,e=e._init;try{return Ee(e(t))}catch{}}return null}function je(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ee(t);case 8:return t===U?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Me(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Le(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ke(e){var t=Le(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),s=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var f=n.get,h=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return f.call(this)},set:function(S){s=""+S,h.call(this,S)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return s},setValue:function(S){s=""+S},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Tr(e){e._valueTracker||(e._valueTracker=Ke(e))}function $n(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),s="";return e&&(s=Le(e)?e.checked?"true":"false":e.value),e=s,e!==n?(t.setValue(e),!0):!1}function ot(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ct(e,t){var n=t.checked;return Y({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function pn(e,t){var n=t.defaultValue==null?"":t.defaultValue,s=t.checked!=null?t.checked:t.defaultChecked;n=Me(t.value!=null?t.value:n),e._wrapperState={initialChecked:s,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function pr(e,t){t=t.checked,t!=null&&I(e,"checked",t,!1)}function hn(e,t){pr(e,t);var n=Me(t.value),s=t.type;if(n!=null)s==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(s==="submit"||s==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?P(e,t.type,n):t.hasOwnProperty("defaultValue")&&P(e,t.type,Me(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function A(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var s=t.type;if(!(s!=="submit"&&s!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function P(e,t,n){(t!=="number"||ot(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var B=Array.isArray;function re(e,t,n,s){if(e=e.options,t){t={};for(var f=0;f<n.length;f++)t["$"+n[f]]=!0;for(n=0;n<e.length;n++)f=t.hasOwnProperty("$"+e[n].value),e[n].selected!==f&&(e[n].selected=f),f&&s&&(e[n].defaultSelected=!0)}else{for(n=""+Me(n),t=null,f=0;f<e.length;f++){if(e[f].value===n){e[f].selected=!0,s&&(e[f].defaultSelected=!0);return}t!==null||e[f].disabled||(t=e[f])}t!==null&&(t.selected=!0)}}function ne(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(i(91));return Y({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function de(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(i(92));if(B(n)){if(1<n.length)throw Error(i(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Me(n)}}function _e(e,t){var n=Me(t.value),s=Me(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),s!=null&&(e.defaultValue=""+s)}function Pe(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Oe(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Be(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Oe(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Tt,Ot=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,s,f){MSApp.execUnsafeLocalFunction(function(){return e(t,n,s,f)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Tt=Tt||document.createElement("div"),Tt.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Tt.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function dt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Wt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},gn=["Webkit","ms","Moz","O"];Object.keys(Wt).forEach(function(e){gn.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Wt[t]=Wt[e]})});function nr(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Wt.hasOwnProperty(e)&&Wt[e]?(""+t).trim():t+"px"}function hr(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var s=n.indexOf("--")===0,f=nr(n,t[n],s);n==="float"&&(n="cssFloat"),s?e.setProperty(n,f):e[n]=f}}var Dn=Y({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Fn(e,t){if(t){if(Dn[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(i(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(i(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(i(61))}if(t.style!=null&&typeof t.style!="object")throw Error(i(62))}}function Ma(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var za=null;function Ta(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Oa=null,Or=null,$r=null;function Hi(e){if(e=ii(e)){if(typeof Oa!="function")throw Error(i(280));var t=e.stateNode;t&&(t=ys(t),Oa(e.stateNode,e.type,t))}}function Zi(e){Or?$r?$r.push(e):$r=[e]:Or=e}function Wi(){if(Or){var e=Or,t=$r;if($r=Or=null,Hi(e),t)for(e=0;e<t.length;e++)Hi(t[e])}}function Gi(e,t){return e(t)}function Vi(){}var $a=!1;function Ki(e,t,n){if($a)return e(t,n);$a=!0;try{return Gi(e,t,n)}finally{$a=!1,(Or!==null||$r!==null)&&(Vi(),Wi())}}function vn(e,t){var n=e.stateNode;if(n===null)return null;var s=ys(n);if(s===null)return null;n=s[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(e=e.type,s=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!s;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(i(231,t,typeof n));return n}var qn=!1;if(p)try{var yn={};Object.defineProperty(yn,"passive",{get:function(){qn=!0}}),window.addEventListener("test",yn,yn),window.removeEventListener("test",yn,yn)}catch{qn=!1}function _u(e,t,n,s,f,h,S,C,L){var H=Array.prototype.slice.call(arguments,3);try{t.apply(n,H)}catch(te){this.onError(te)}}var xn=!1,Bn=null,Un=!1,Da=null,ku={onError:function(e){xn=!0,Bn=e}};function bu(e,t,n,s,f,h,S,C,L){xn=!1,Bn=null,_u.apply(ku,arguments)}function Au(e,t,n,s,f,h,S,C,L){if(bu.apply(this,arguments),xn){if(xn){var H=Bn;xn=!1,Bn=null}else throw Error(i(198));Un||(Un=!0,Da=H)}}function gr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Yi(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Qi(e){if(gr(e)!==e)throw Error(i(188))}function Cu(e){var t=e.alternate;if(!t){if(t=gr(e),t===null)throw Error(i(188));return t!==e?null:e}for(var n=e,s=t;;){var f=n.return;if(f===null)break;var h=f.alternate;if(h===null){if(s=f.return,s!==null){n=s;continue}break}if(f.child===h.child){for(h=f.child;h;){if(h===n)return Qi(f),e;if(h===s)return Qi(f),t;h=h.sibling}throw Error(i(188))}if(n.return!==s.return)n=f,s=h;else{for(var S=!1,C=f.child;C;){if(C===n){S=!0,n=f,s=h;break}if(C===s){S=!0,s=f,n=h;break}C=C.sibling}if(!S){for(C=h.child;C;){if(C===n){S=!0,n=h,s=f;break}if(C===s){S=!0,s=h,n=f;break}C=C.sibling}if(!S)throw Error(i(189))}}if(n.alternate!==s)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function Xi(e){return e=Cu(e),e!==null?Fa(e):null}function Fa(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Fa(e);if(t!==null)return t;e=e.sibling}return null}var vr=a.unstable_scheduleCallback,ie=a.unstable_cancelCallback,Eu=a.unstable_shouldYield,Iu=a.unstable_requestPaint,Re=a.unstable_now,$t=a.unstable_getCurrentPriorityLevel,Gt=a.unstable_ImmediatePriority,yr=a.unstable_UserBlockingPriority,Dr=a.unstable_NormalPriority,Fr=a.unstable_LowPriority,Sn=a.unstable_IdlePriority,Ji=null,ar=null;function hv(e){if(ar&&typeof ar.onCommitFiberRoot=="function")try{ar.onCommitFiberRoot(Ji,e,void 0,(e.current.flags&128)===128)}catch{}}var Vt=Math.clz32?Math.clz32:yv,gv=Math.log,vv=Math.LN2;function yv(e){return e>>>=0,e===0?32:31-(gv(e)/vv|0)|0}var es=64,ts=4194304;function qa(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function rs(e,t){var n=e.pendingLanes;if(n===0)return 0;var s=0,f=e.suspendedLanes,h=e.pingedLanes,S=n&268435455;if(S!==0){var C=S&~f;C!==0?s=qa(C):(h&=S,h!==0&&(s=qa(h)))}else S=n&~f,S!==0?s=qa(S):h!==0&&(s=qa(h));if(s===0)return 0;if(t!==0&&t!==s&&!(t&f)&&(f=s&-s,h=t&-t,f>=h||f===16&&(h&4194240)!==0))return t;if(s&4&&(s|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=s;0<t;)n=31-Vt(t),f=1<<n,s|=e[n],t&=~f;return s}function xv(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Sv(e,t){for(var n=e.suspendedLanes,s=e.pingedLanes,f=e.expirationTimes,h=e.pendingLanes;0<h;){var S=31-Vt(h),C=1<<S,L=f[S];L===-1?(!(C&n)||C&s)&&(f[S]=xv(C,t)):L<=t&&(e.expiredLanes|=C),h&=~C}}function Ru(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function _f(){var e=es;return es<<=1,!(es&4194240)&&(es=64),e}function Pu(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ba(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Vt(t),e[t]=n}function wv(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var s=e.eventTimes;for(e=e.expirationTimes;0<n;){var f=31-Vt(n),h=1<<f;t[f]=0,s[f]=-1,e[f]=-1,n&=~h}}function Lu(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var s=31-Vt(n),f=1<<s;f&t|e[s]&t&&(e[s]|=t),n&=~f}}var Fe=0;function kf(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var bf,ju,Af,Cf,Ef,Mu=!1,ns=[],qr=null,Br=null,Ur=null,Ua=new Map,Ha=new Map,Hr=[],Nv="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function If(e,t){switch(e){case"focusin":case"focusout":qr=null;break;case"dragenter":case"dragleave":Br=null;break;case"mouseover":case"mouseout":Ur=null;break;case"pointerover":case"pointerout":Ua.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ha.delete(t.pointerId)}}function Za(e,t,n,s,f,h){return e===null||e.nativeEvent!==h?(e={blockedOn:t,domEventName:n,eventSystemFlags:s,nativeEvent:h,targetContainers:[f]},t!==null&&(t=ii(t),t!==null&&ju(t)),e):(e.eventSystemFlags|=s,t=e.targetContainers,f!==null&&t.indexOf(f)===-1&&t.push(f),e)}function _v(e,t,n,s,f){switch(t){case"focusin":return qr=Za(qr,e,t,n,s,f),!0;case"dragenter":return Br=Za(Br,e,t,n,s,f),!0;case"mouseover":return Ur=Za(Ur,e,t,n,s,f),!0;case"pointerover":var h=f.pointerId;return Ua.set(h,Za(Ua.get(h)||null,e,t,n,s,f)),!0;case"gotpointercapture":return h=f.pointerId,Ha.set(h,Za(Ha.get(h)||null,e,t,n,s,f)),!0}return!1}function Rf(e){var t=wn(e.target);if(t!==null){var n=gr(t);if(n!==null){if(t=n.tag,t===13){if(t=Yi(n),t!==null){e.blockedOn=t,Ef(e.priority,function(){Af(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function as(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Tu(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var s=new n.constructor(n.type,n);za=s,n.target.dispatchEvent(s),za=null}else return t=ii(n),t!==null&&ju(t),e.blockedOn=n,!1;t.shift()}return!0}function Pf(e,t,n){as(e)&&n.delete(t)}function kv(){Mu=!1,qr!==null&&as(qr)&&(qr=null),Br!==null&&as(Br)&&(Br=null),Ur!==null&&as(Ur)&&(Ur=null),Ua.forEach(Pf),Ha.forEach(Pf)}function Wa(e,t){e.blockedOn===t&&(e.blockedOn=null,Mu||(Mu=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,kv)))}function Ga(e){function t(f){return Wa(f,e)}if(0<ns.length){Wa(ns[0],e);for(var n=1;n<ns.length;n++){var s=ns[n];s.blockedOn===e&&(s.blockedOn=null)}}for(qr!==null&&Wa(qr,e),Br!==null&&Wa(Br,e),Ur!==null&&Wa(Ur,e),Ua.forEach(t),Ha.forEach(t),n=0;n<Hr.length;n++)s=Hr[n],s.blockedOn===e&&(s.blockedOn=null);for(;0<Hr.length&&(n=Hr[0],n.blockedOn===null);)Rf(n),n.blockedOn===null&&Hr.shift()}var Hn=z.ReactCurrentBatchConfig,is=!0;function bv(e,t,n,s){var f=Fe,h=Hn.transition;Hn.transition=null;try{Fe=1,zu(e,t,n,s)}finally{Fe=f,Hn.transition=h}}function Av(e,t,n,s){var f=Fe,h=Hn.transition;Hn.transition=null;try{Fe=4,zu(e,t,n,s)}finally{Fe=f,Hn.transition=h}}function zu(e,t,n,s){if(is){var f=Tu(e,t,n,s);if(f===null)Ju(e,t,s,ss,n),If(e,s);else if(_v(f,e,t,n,s))s.stopPropagation();else if(If(e,s),t&4&&-1<Nv.indexOf(e)){for(;f!==null;){var h=ii(f);if(h!==null&&bf(h),h=Tu(e,t,n,s),h===null&&Ju(e,t,s,ss,n),h===f)break;f=h}f!==null&&s.stopPropagation()}else Ju(e,t,s,null,n)}}var ss=null;function Tu(e,t,n,s){if(ss=null,e=Ta(s),e=wn(e),e!==null)if(t=gr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Yi(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ss=e,null}function Lf(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch($t()){case Gt:return 1;case yr:return 4;case Dr:case Fr:return 16;case Sn:return 536870912;default:return 16}default:return 16}}var Zr=null,Ou=null,os=null;function jf(){if(os)return os;var e,t=Ou,n=t.length,s,f="value"in Zr?Zr.value:Zr.textContent,h=f.length;for(e=0;e<n&&t[e]===f[e];e++);var S=n-e;for(s=1;s<=S&&t[n-s]===f[h-s];s++);return os=f.slice(e,1<s?1-s:void 0)}function ls(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function us(){return!0}function Mf(){return!1}function It(e){function t(n,s,f,h,S){this._reactName=n,this._targetInst=f,this.type=s,this.nativeEvent=h,this.target=S,this.currentTarget=null;for(var C in e)e.hasOwnProperty(C)&&(n=e[C],this[C]=n?n(h):h[C]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?us:Mf,this.isPropagationStopped=Mf,this}return Y(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=us)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=us)},persist:function(){},isPersistent:us}),t}var Zn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},$u=It(Zn),Va=Y({},Zn,{view:0,detail:0}),Cv=It(Va),Du,Fu,Ka,cs=Y({},Va,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Bu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ka&&(Ka&&e.type==="mousemove"?(Du=e.screenX-Ka.screenX,Fu=e.screenY-Ka.screenY):Fu=Du=0,Ka=e),Du)},movementY:function(e){return"movementY"in e?e.movementY:Fu}}),zf=It(cs),Ev=Y({},cs,{dataTransfer:0}),Iv=It(Ev),Rv=Y({},Va,{relatedTarget:0}),qu=It(Rv),Pv=Y({},Zn,{animationName:0,elapsedTime:0,pseudoElement:0}),Lv=It(Pv),jv=Y({},Zn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Mv=It(jv),zv=Y({},Zn,{data:0}),Tf=It(zv),Tv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ov={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},$v={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Dv(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=$v[e])?!!t[e]:!1}function Bu(){return Dv}var Fv=Y({},Va,{key:function(e){if(e.key){var t=Tv[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ls(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Ov[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Bu,charCode:function(e){return e.type==="keypress"?ls(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ls(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),qv=It(Fv),Bv=Y({},cs,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Of=It(Bv),Uv=Y({},Va,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Bu}),Hv=It(Uv),Zv=Y({},Zn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Wv=It(Zv),Gv=Y({},cs,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Vv=It(Gv),Kv=[9,13,27,32],Uu=p&&"CompositionEvent"in window,Ya=null;p&&"documentMode"in document&&(Ya=document.documentMode);var Yv=p&&"TextEvent"in window&&!Ya,$f=p&&(!Uu||Ya&&8<Ya&&11>=Ya),Df=" ",Ff=!1;function qf(e,t){switch(e){case"keyup":return Kv.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Bf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Wn=!1;function Qv(e,t){switch(e){case"compositionend":return Bf(t);case"keypress":return t.which!==32?null:(Ff=!0,Df);case"textInput":return e=t.data,e===Df&&Ff?null:e;default:return null}}function Xv(e,t){if(Wn)return e==="compositionend"||!Uu&&qf(e,t)?(e=jf(),os=Ou=Zr=null,Wn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return $f&&t.locale!=="ko"?null:t.data;default:return null}}var Jv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Uf(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Jv[e.type]:t==="textarea"}function Hf(e,t,n,s){Zi(s),t=hs(t,"onChange"),0<t.length&&(n=new $u("onChange","change",null,n,s),e.push({event:n,listeners:t}))}var Qa=null,Xa=null;function e2(e){lm(e,0)}function ds(e){var t=Qn(e);if($n(t))return e}function t2(e,t){if(e==="change")return t}var Zf=!1;if(p){var Hu;if(p){var Zu="oninput"in document;if(!Zu){var Wf=document.createElement("div");Wf.setAttribute("oninput","return;"),Zu=typeof Wf.oninput=="function"}Hu=Zu}else Hu=!1;Zf=Hu&&(!document.documentMode||9<document.documentMode)}function Gf(){Qa&&(Qa.detachEvent("onpropertychange",Vf),Xa=Qa=null)}function Vf(e){if(e.propertyName==="value"&&ds(Xa)){var t=[];Hf(t,Xa,e,Ta(e)),Ki(e2,t)}}function r2(e,t,n){e==="focusin"?(Gf(),Qa=t,Xa=n,Qa.attachEvent("onpropertychange",Vf)):e==="focusout"&&Gf()}function n2(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ds(Xa)}function a2(e,t){if(e==="click")return ds(t)}function i2(e,t){if(e==="input"||e==="change")return ds(t)}function s2(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Kt=typeof Object.is=="function"?Object.is:s2;function Ja(e,t){if(Kt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),s=Object.keys(t);if(n.length!==s.length)return!1;for(s=0;s<n.length;s++){var f=n[s];if(!m.call(t,f)||!Kt(e[f],t[f]))return!1}return!0}function Kf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Yf(e,t){var n=Kf(e);e=0;for(var s;n;){if(n.nodeType===3){if(s=e+n.textContent.length,e<=t&&s>=t)return{node:n,offset:t-e};e=s}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Kf(n)}}function Qf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Qf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Xf(){for(var e=window,t=ot();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ot(e.document)}return t}function Wu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function o2(e){var t=Xf(),n=e.focusedElem,s=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Qf(n.ownerDocument.documentElement,n)){if(s!==null&&Wu(n)){if(t=s.start,e=s.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var f=n.textContent.length,h=Math.min(s.start,f);s=s.end===void 0?h:Math.min(s.end,f),!e.extend&&h>s&&(f=s,s=h,h=f),f=Yf(n,h);var S=Yf(n,s);f&&S&&(e.rangeCount!==1||e.anchorNode!==f.node||e.anchorOffset!==f.offset||e.focusNode!==S.node||e.focusOffset!==S.offset)&&(t=t.createRange(),t.setStart(f.node,f.offset),e.removeAllRanges(),h>s?(e.addRange(t),e.extend(S.node,S.offset)):(t.setEnd(S.node,S.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var l2=p&&"documentMode"in document&&11>=document.documentMode,Gn=null,Gu=null,ei=null,Vu=!1;function Jf(e,t,n){var s=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Vu||Gn==null||Gn!==ot(s)||(s=Gn,"selectionStart"in s&&Wu(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),ei&&Ja(ei,s)||(ei=s,s=hs(Gu,"onSelect"),0<s.length&&(t=new $u("onSelect","select",null,t,n),e.push({event:t,listeners:s}),t.target=Gn)))}function fs(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Vn={animationend:fs("Animation","AnimationEnd"),animationiteration:fs("Animation","AnimationIteration"),animationstart:fs("Animation","AnimationStart"),transitionend:fs("Transition","TransitionEnd")},Ku={},em={};p&&(em=document.createElement("div").style,"AnimationEvent"in window||(delete Vn.animationend.animation,delete Vn.animationiteration.animation,delete Vn.animationstart.animation),"TransitionEvent"in window||delete Vn.transitionend.transition);function ms(e){if(Ku[e])return Ku[e];if(!Vn[e])return e;var t=Vn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in em)return Ku[e]=t[n];return e}var tm=ms("animationend"),rm=ms("animationiteration"),nm=ms("animationstart"),am=ms("transitionend"),im=new Map,sm="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Wr(e,t){im.set(e,t),u(t,[e])}for(var Yu=0;Yu<sm.length;Yu++){var Qu=sm[Yu],u2=Qu.toLowerCase(),c2=Qu[0].toUpperCase()+Qu.slice(1);Wr(u2,"on"+c2)}Wr(tm,"onAnimationEnd"),Wr(rm,"onAnimationIteration"),Wr(nm,"onAnimationStart"),Wr("dblclick","onDoubleClick"),Wr("focusin","onFocus"),Wr("focusout","onBlur"),Wr(am,"onTransitionEnd"),d("onMouseEnter",["mouseout","mouseover"]),d("onMouseLeave",["mouseout","mouseover"]),d("onPointerEnter",["pointerout","pointerover"]),d("onPointerLeave",["pointerout","pointerover"]),u("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),u("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),u("onBeforeInput",["compositionend","keypress","textInput","paste"]),u("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ti="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),d2=new Set("cancel close invalid load scroll toggle".split(" ").concat(ti));function om(e,t,n){var s=e.type||"unknown-event";e.currentTarget=n,Au(s,t,void 0,e),e.currentTarget=null}function lm(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var s=e[n],f=s.event;s=s.listeners;e:{var h=void 0;if(t)for(var S=s.length-1;0<=S;S--){var C=s[S],L=C.instance,H=C.currentTarget;if(C=C.listener,L!==h&&f.isPropagationStopped())break e;om(f,C,H),h=L}else for(S=0;S<s.length;S++){if(C=s[S],L=C.instance,H=C.currentTarget,C=C.listener,L!==h&&f.isPropagationStopped())break e;om(f,C,H),h=L}}}if(Un)throw e=Da,Un=!1,Da=null,e}function He(e,t){var n=t[ic];n===void 0&&(n=t[ic]=new Set);var s=e+"__bubble";n.has(s)||(um(t,e,2,!1),n.add(s))}function Xu(e,t,n){var s=0;t&&(s|=4),um(n,e,s,t)}var ps="_reactListening"+Math.random().toString(36).slice(2);function ri(e){if(!e[ps]){e[ps]=!0,c.forEach(function(n){n!=="selectionchange"&&(d2.has(n)||Xu(n,!1,e),Xu(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ps]||(t[ps]=!0,Xu("selectionchange",!1,t))}}function um(e,t,n,s){switch(Lf(t)){case 1:var f=bv;break;case 4:f=Av;break;default:f=zu}n=f.bind(null,t,n,e),f=void 0,!qn||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(f=!0),s?f!==void 0?e.addEventListener(t,n,{capture:!0,passive:f}):e.addEventListener(t,n,!0):f!==void 0?e.addEventListener(t,n,{passive:f}):e.addEventListener(t,n,!1)}function Ju(e,t,n,s,f){var h=s;if(!(t&1)&&!(t&2)&&s!==null)e:for(;;){if(s===null)return;var S=s.tag;if(S===3||S===4){var C=s.stateNode.containerInfo;if(C===f||C.nodeType===8&&C.parentNode===f)break;if(S===4)for(S=s.return;S!==null;){var L=S.tag;if((L===3||L===4)&&(L=S.stateNode.containerInfo,L===f||L.nodeType===8&&L.parentNode===f))return;S=S.return}for(;C!==null;){if(S=wn(C),S===null)return;if(L=S.tag,L===5||L===6){s=h=S;continue e}C=C.parentNode}}s=s.return}Ki(function(){var H=h,te=Ta(n),ae=[];e:{var ee=im.get(e);if(ee!==void 0){var pe=$u,ge=e;switch(e){case"keypress":if(ls(n)===0)break e;case"keydown":case"keyup":pe=qv;break;case"focusin":ge="focus",pe=qu;break;case"focusout":ge="blur",pe=qu;break;case"beforeblur":case"afterblur":pe=qu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":pe=zf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":pe=Iv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":pe=Hv;break;case tm:case rm:case nm:pe=Lv;break;case am:pe=Wv;break;case"scroll":pe=Cv;break;case"wheel":pe=Vv;break;case"copy":case"cut":case"paste":pe=Mv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":pe=Of}var ve=(t&4)!==0,Je=!ve&&e==="scroll",$=ve?ee!==null?ee+"Capture":null:ee;ve=[];for(var M=H,D;M!==null;){D=M;var fe=D.stateNode;if(D.tag===5&&fe!==null&&(D=fe,$!==null&&(fe=vn(M,$),fe!=null&&ve.push(ni(M,fe,D)))),Je)break;M=M.return}0<ve.length&&(ee=new pe(ee,ge,null,n,te),ae.push({event:ee,listeners:ve}))}}if(!(t&7)){e:{if(ee=e==="mouseover"||e==="pointerover",pe=e==="mouseout"||e==="pointerout",ee&&n!==za&&(ge=n.relatedTarget||n.fromElement)&&(wn(ge)||ge[xr]))break e;if((pe||ee)&&(ee=te.window===te?te:(ee=te.ownerDocument)?ee.defaultView||ee.parentWindow:window,pe?(ge=n.relatedTarget||n.toElement,pe=H,ge=ge?wn(ge):null,ge!==null&&(Je=gr(ge),ge!==Je||ge.tag!==5&&ge.tag!==6)&&(ge=null)):(pe=null,ge=H),pe!==ge)){if(ve=zf,fe="onMouseLeave",$="onMouseEnter",M="mouse",(e==="pointerout"||e==="pointerover")&&(ve=Of,fe="onPointerLeave",$="onPointerEnter",M="pointer"),Je=pe==null?ee:Qn(pe),D=ge==null?ee:Qn(ge),ee=new ve(fe,M+"leave",pe,n,te),ee.target=Je,ee.relatedTarget=D,fe=null,wn(te)===H&&(ve=new ve($,M+"enter",ge,n,te),ve.target=D,ve.relatedTarget=Je,fe=ve),Je=fe,pe&&ge)t:{for(ve=pe,$=ge,M=0,D=ve;D;D=Kn(D))M++;for(D=0,fe=$;fe;fe=Kn(fe))D++;for(;0<M-D;)ve=Kn(ve),M--;for(;0<D-M;)$=Kn($),D--;for(;M--;){if(ve===$||$!==null&&ve===$.alternate)break t;ve=Kn(ve),$=Kn($)}ve=null}else ve=null;pe!==null&&cm(ae,ee,pe,ve,!1),ge!==null&&Je!==null&&cm(ae,Je,ge,ve,!0)}}e:{if(ee=H?Qn(H):window,pe=ee.nodeName&&ee.nodeName.toLowerCase(),pe==="select"||pe==="input"&&ee.type==="file")var ye=t2;else if(Uf(ee))if(Zf)ye=i2;else{ye=n2;var ke=r2}else(pe=ee.nodeName)&&pe.toLowerCase()==="input"&&(ee.type==="checkbox"||ee.type==="radio")&&(ye=a2);if(ye&&(ye=ye(e,H))){Hf(ae,ye,n,te);break e}ke&&ke(e,ee,H),e==="focusout"&&(ke=ee._wrapperState)&&ke.controlled&&ee.type==="number"&&P(ee,"number",ee.value)}switch(ke=H?Qn(H):window,e){case"focusin":(Uf(ke)||ke.contentEditable==="true")&&(Gn=ke,Gu=H,ei=null);break;case"focusout":ei=Gu=Gn=null;break;case"mousedown":Vu=!0;break;case"contextmenu":case"mouseup":case"dragend":Vu=!1,Jf(ae,n,te);break;case"selectionchange":if(l2)break;case"keydown":case"keyup":Jf(ae,n,te)}var be;if(Uu)e:{switch(e){case"compositionstart":var Ie="onCompositionStart";break e;case"compositionend":Ie="onCompositionEnd";break e;case"compositionupdate":Ie="onCompositionUpdate";break e}Ie=void 0}else Wn?qf(e,n)&&(Ie="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(Ie="onCompositionStart");Ie&&($f&&n.locale!=="ko"&&(Wn||Ie!=="onCompositionStart"?Ie==="onCompositionEnd"&&Wn&&(be=jf()):(Zr=te,Ou="value"in Zr?Zr.value:Zr.textContent,Wn=!0)),ke=hs(H,Ie),0<ke.length&&(Ie=new Tf(Ie,e,null,n,te),ae.push({event:Ie,listeners:ke}),be?Ie.data=be:(be=Bf(n),be!==null&&(Ie.data=be)))),(be=Yv?Qv(e,n):Xv(e,n))&&(H=hs(H,"onBeforeInput"),0<H.length&&(te=new Tf("onBeforeInput","beforeinput",null,n,te),ae.push({event:te,listeners:H}),te.data=be))}lm(ae,t)})}function ni(e,t,n){return{instance:e,listener:t,currentTarget:n}}function hs(e,t){for(var n=t+"Capture",s=[];e!==null;){var f=e,h=f.stateNode;f.tag===5&&h!==null&&(f=h,h=vn(e,n),h!=null&&s.unshift(ni(e,h,f)),h=vn(e,t),h!=null&&s.push(ni(e,h,f))),e=e.return}return s}function Kn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function cm(e,t,n,s,f){for(var h=t._reactName,S=[];n!==null&&n!==s;){var C=n,L=C.alternate,H=C.stateNode;if(L!==null&&L===s)break;C.tag===5&&H!==null&&(C=H,f?(L=vn(n,h),L!=null&&S.unshift(ni(n,L,C))):f||(L=vn(n,h),L!=null&&S.push(ni(n,L,C)))),n=n.return}S.length!==0&&e.push({event:t,listeners:S})}var f2=/\r\n?/g,m2=/\u0000|\uFFFD/g;function dm(e){return(typeof e=="string"?e:""+e).replace(f2,`
`).replace(m2,"")}function gs(e,t,n){if(t=dm(t),dm(e)!==t&&n)throw Error(i(425))}function vs(){}var ec=null,tc=null;function rc(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var nc=typeof setTimeout=="function"?setTimeout:void 0,p2=typeof clearTimeout=="function"?clearTimeout:void 0,fm=typeof Promise=="function"?Promise:void 0,h2=typeof queueMicrotask=="function"?queueMicrotask:typeof fm<"u"?function(e){return fm.resolve(null).then(e).catch(g2)}:nc;function g2(e){setTimeout(function(){throw e})}function ac(e,t){var n=t,s=0;do{var f=n.nextSibling;if(e.removeChild(n),f&&f.nodeType===8)if(n=f.data,n==="/$"){if(s===0){e.removeChild(f),Ga(t);return}s--}else n!=="$"&&n!=="$?"&&n!=="$!"||s++;n=f}while(n);Ga(t)}function Gr(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function mm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Yn=Math.random().toString(36).slice(2),ir="__reactFiber$"+Yn,ai="__reactProps$"+Yn,xr="__reactContainer$"+Yn,ic="__reactEvents$"+Yn,v2="__reactListeners$"+Yn,y2="__reactHandles$"+Yn;function wn(e){var t=e[ir];if(t)return t;for(var n=e.parentNode;n;){if(t=n[xr]||n[ir]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=mm(e);e!==null;){if(n=e[ir])return n;e=mm(e)}return t}e=n,n=e.parentNode}return null}function ii(e){return e=e[ir]||e[xr],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Qn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(i(33))}function ys(e){return e[ai]||null}var sc=[],Xn=-1;function Vr(e){return{current:e}}function Ze(e){0>Xn||(e.current=sc[Xn],sc[Xn]=null,Xn--)}function Ue(e,t){Xn++,sc[Xn]=e.current,e.current=t}var Kr={},ft=Vr(Kr),Nt=Vr(!1),Nn=Kr;function Jn(e,t){var n=e.type.contextTypes;if(!n)return Kr;var s=e.stateNode;if(s&&s.__reactInternalMemoizedUnmaskedChildContext===t)return s.__reactInternalMemoizedMaskedChildContext;var f={},h;for(h in n)f[h]=t[h];return s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=f),f}function _t(e){return e=e.childContextTypes,e!=null}function xs(){Ze(Nt),Ze(ft)}function pm(e,t,n){if(ft.current!==Kr)throw Error(i(168));Ue(ft,t),Ue(Nt,n)}function hm(e,t,n){var s=e.stateNode;if(t=t.childContextTypes,typeof s.getChildContext!="function")return n;s=s.getChildContext();for(var f in s)if(!(f in t))throw Error(i(108,je(e)||"Unknown",f));return Y({},n,s)}function Ss(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Kr,Nn=ft.current,Ue(ft,e),Ue(Nt,Nt.current),!0}function gm(e,t,n){var s=e.stateNode;if(!s)throw Error(i(169));n?(e=hm(e,t,Nn),s.__reactInternalMemoizedMergedChildContext=e,Ze(Nt),Ze(ft),Ue(ft,e)):Ze(Nt),Ue(Nt,n)}var Sr=null,ws=!1,oc=!1;function vm(e){Sr===null?Sr=[e]:Sr.push(e)}function x2(e){ws=!0,vm(e)}function Yr(){if(!oc&&Sr!==null){oc=!0;var e=0,t=Fe;try{var n=Sr;for(Fe=1;e<n.length;e++){var s=n[e];do s=s(!0);while(s!==null)}Sr=null,ws=!1}catch(f){throw Sr!==null&&(Sr=Sr.slice(e+1)),vr(Gt,Yr),f}finally{Fe=t,oc=!1}}return null}var ea=[],ta=0,Ns=null,_s=0,Dt=[],Ft=0,_n=null,wr=1,Nr="";function kn(e,t){ea[ta++]=_s,ea[ta++]=Ns,Ns=e,_s=t}function ym(e,t,n){Dt[Ft++]=wr,Dt[Ft++]=Nr,Dt[Ft++]=_n,_n=e;var s=wr;e=Nr;var f=32-Vt(s)-1;s&=~(1<<f),n+=1;var h=32-Vt(t)+f;if(30<h){var S=f-f%5;h=(s&(1<<S)-1).toString(32),s>>=S,f-=S,wr=1<<32-Vt(t)+f|n<<f|s,Nr=h+e}else wr=1<<h|n<<f|s,Nr=e}function lc(e){e.return!==null&&(kn(e,1),ym(e,1,0))}function uc(e){for(;e===Ns;)Ns=ea[--ta],ea[ta]=null,_s=ea[--ta],ea[ta]=null;for(;e===_n;)_n=Dt[--Ft],Dt[Ft]=null,Nr=Dt[--Ft],Dt[Ft]=null,wr=Dt[--Ft],Dt[Ft]=null}var Rt=null,Pt=null,Ge=!1,Yt=null;function xm(e,t){var n=Ht(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Sm(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Rt=e,Pt=Gr(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Rt=e,Pt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=_n!==null?{id:wr,overflow:Nr}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ht(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Rt=e,Pt=null,!0):!1;default:return!1}}function cc(e){return(e.mode&1)!==0&&(e.flags&128)===0}function dc(e){if(Ge){var t=Pt;if(t){var n=t;if(!Sm(e,t)){if(cc(e))throw Error(i(418));t=Gr(n.nextSibling);var s=Rt;t&&Sm(e,t)?xm(s,n):(e.flags=e.flags&-4097|2,Ge=!1,Rt=e)}}else{if(cc(e))throw Error(i(418));e.flags=e.flags&-4097|2,Ge=!1,Rt=e}}}function wm(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Rt=e}function ks(e){if(e!==Rt)return!1;if(!Ge)return wm(e),Ge=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!rc(e.type,e.memoizedProps)),t&&(t=Pt)){if(cc(e))throw Nm(),Error(i(418));for(;t;)xm(e,t),t=Gr(t.nextSibling)}if(wm(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(i(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Pt=Gr(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Pt=null}}else Pt=Rt?Gr(e.stateNode.nextSibling):null;return!0}function Nm(){for(var e=Pt;e;)e=Gr(e.nextSibling)}function ra(){Pt=Rt=null,Ge=!1}function fc(e){Yt===null?Yt=[e]:Yt.push(e)}var S2=z.ReactCurrentBatchConfig;function si(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(i(309));var s=n.stateNode}if(!s)throw Error(i(147,e));var f=s,h=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===h?t.ref:(t=function(S){var C=f.refs;S===null?delete C[h]:C[h]=S},t._stringRef=h,t)}if(typeof e!="string")throw Error(i(284));if(!n._owner)throw Error(i(290,e))}return e}function bs(e,t){throw e=Object.prototype.toString.call(t),Error(i(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function _m(e){var t=e._init;return t(e._payload)}function km(e){function t($,M){if(e){var D=$.deletions;D===null?($.deletions=[M],$.flags|=16):D.push(M)}}function n($,M){if(!e)return null;for(;M!==null;)t($,M),M=M.sibling;return null}function s($,M){for($=new Map;M!==null;)M.key!==null?$.set(M.key,M):$.set(M.index,M),M=M.sibling;return $}function f($,M){return $=an($,M),$.index=0,$.sibling=null,$}function h($,M,D){return $.index=D,e?(D=$.alternate,D!==null?(D=D.index,D<M?($.flags|=2,M):D):($.flags|=2,M)):($.flags|=1048576,M)}function S($){return e&&$.alternate===null&&($.flags|=2),$}function C($,M,D,fe){return M===null||M.tag!==6?(M=nd(D,$.mode,fe),M.return=$,M):(M=f(M,D),M.return=$,M)}function L($,M,D,fe){var ye=D.type;return ye===F?te($,M,D.props.children,fe,D.key):M!==null&&(M.elementType===ye||typeof ye=="object"&&ye!==null&&ye.$$typeof===oe&&_m(ye)===M.type)?(fe=f(M,D.props),fe.ref=si($,M,D),fe.return=$,fe):(fe=Ks(D.type,D.key,D.props,null,$.mode,fe),fe.ref=si($,M,D),fe.return=$,fe)}function H($,M,D,fe){return M===null||M.tag!==4||M.stateNode.containerInfo!==D.containerInfo||M.stateNode.implementation!==D.implementation?(M=ad(D,$.mode,fe),M.return=$,M):(M=f(M,D.children||[]),M.return=$,M)}function te($,M,D,fe,ye){return M===null||M.tag!==7?(M=Ln(D,$.mode,fe,ye),M.return=$,M):(M=f(M,D),M.return=$,M)}function ae($,M,D){if(typeof M=="string"&&M!==""||typeof M=="number")return M=nd(""+M,$.mode,D),M.return=$,M;if(typeof M=="object"&&M!==null){switch(M.$$typeof){case O:return D=Ks(M.type,M.key,M.props,null,$.mode,D),D.ref=si($,null,M),D.return=$,D;case Z:return M=ad(M,$.mode,D),M.return=$,M;case oe:var fe=M._init;return ae($,fe(M._payload),D)}if(B(M)||K(M))return M=Ln(M,$.mode,D,null),M.return=$,M;bs($,M)}return null}function ee($,M,D,fe){var ye=M!==null?M.key:null;if(typeof D=="string"&&D!==""||typeof D=="number")return ye!==null?null:C($,M,""+D,fe);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case O:return D.key===ye?L($,M,D,fe):null;case Z:return D.key===ye?H($,M,D,fe):null;case oe:return ye=D._init,ee($,M,ye(D._payload),fe)}if(B(D)||K(D))return ye!==null?null:te($,M,D,fe,null);bs($,D)}return null}function pe($,M,D,fe,ye){if(typeof fe=="string"&&fe!==""||typeof fe=="number")return $=$.get(D)||null,C(M,$,""+fe,ye);if(typeof fe=="object"&&fe!==null){switch(fe.$$typeof){case O:return $=$.get(fe.key===null?D:fe.key)||null,L(M,$,fe,ye);case Z:return $=$.get(fe.key===null?D:fe.key)||null,H(M,$,fe,ye);case oe:var ke=fe._init;return pe($,M,D,ke(fe._payload),ye)}if(B(fe)||K(fe))return $=$.get(D)||null,te(M,$,fe,ye,null);bs(M,fe)}return null}function ge($,M,D,fe){for(var ye=null,ke=null,be=M,Ie=M=0,st=null;be!==null&&Ie<D.length;Ie++){be.index>Ie?(st=be,be=null):st=be.sibling;var De=ee($,be,D[Ie],fe);if(De===null){be===null&&(be=st);break}e&&be&&De.alternate===null&&t($,be),M=h(De,M,Ie),ke===null?ye=De:ke.sibling=De,ke=De,be=st}if(Ie===D.length)return n($,be),Ge&&kn($,Ie),ye;if(be===null){for(;Ie<D.length;Ie++)be=ae($,D[Ie],fe),be!==null&&(M=h(be,M,Ie),ke===null?ye=be:ke.sibling=be,ke=be);return Ge&&kn($,Ie),ye}for(be=s($,be);Ie<D.length;Ie++)st=pe(be,$,Ie,D[Ie],fe),st!==null&&(e&&st.alternate!==null&&be.delete(st.key===null?Ie:st.key),M=h(st,M,Ie),ke===null?ye=st:ke.sibling=st,ke=st);return e&&be.forEach(function(sn){return t($,sn)}),Ge&&kn($,Ie),ye}function ve($,M,D,fe){var ye=K(D);if(typeof ye!="function")throw Error(i(150));if(D=ye.call(D),D==null)throw Error(i(151));for(var ke=ye=null,be=M,Ie=M=0,st=null,De=D.next();be!==null&&!De.done;Ie++,De=D.next()){be.index>Ie?(st=be,be=null):st=be.sibling;var sn=ee($,be,De.value,fe);if(sn===null){be===null&&(be=st);break}e&&be&&sn.alternate===null&&t($,be),M=h(sn,M,Ie),ke===null?ye=sn:ke.sibling=sn,ke=sn,be=st}if(De.done)return n($,be),Ge&&kn($,Ie),ye;if(be===null){for(;!De.done;Ie++,De=D.next())De=ae($,De.value,fe),De!==null&&(M=h(De,M,Ie),ke===null?ye=De:ke.sibling=De,ke=De);return Ge&&kn($,Ie),ye}for(be=s($,be);!De.done;Ie++,De=D.next())De=pe(be,$,Ie,De.value,fe),De!==null&&(e&&De.alternate!==null&&be.delete(De.key===null?Ie:De.key),M=h(De,M,Ie),ke===null?ye=De:ke.sibling=De,ke=De);return e&&be.forEach(function(J2){return t($,J2)}),Ge&&kn($,Ie),ye}function Je($,M,D,fe){if(typeof D=="object"&&D!==null&&D.type===F&&D.key===null&&(D=D.props.children),typeof D=="object"&&D!==null){switch(D.$$typeof){case O:e:{for(var ye=D.key,ke=M;ke!==null;){if(ke.key===ye){if(ye=D.type,ye===F){if(ke.tag===7){n($,ke.sibling),M=f(ke,D.props.children),M.return=$,$=M;break e}}else if(ke.elementType===ye||typeof ye=="object"&&ye!==null&&ye.$$typeof===oe&&_m(ye)===ke.type){n($,ke.sibling),M=f(ke,D.props),M.ref=si($,ke,D),M.return=$,$=M;break e}n($,ke);break}else t($,ke);ke=ke.sibling}D.type===F?(M=Ln(D.props.children,$.mode,fe,D.key),M.return=$,$=M):(fe=Ks(D.type,D.key,D.props,null,$.mode,fe),fe.ref=si($,M,D),fe.return=$,$=fe)}return S($);case Z:e:{for(ke=D.key;M!==null;){if(M.key===ke)if(M.tag===4&&M.stateNode.containerInfo===D.containerInfo&&M.stateNode.implementation===D.implementation){n($,M.sibling),M=f(M,D.children||[]),M.return=$,$=M;break e}else{n($,M);break}else t($,M);M=M.sibling}M=ad(D,$.mode,fe),M.return=$,$=M}return S($);case oe:return ke=D._init,Je($,M,ke(D._payload),fe)}if(B(D))return ge($,M,D,fe);if(K(D))return ve($,M,D,fe);bs($,D)}return typeof D=="string"&&D!==""||typeof D=="number"?(D=""+D,M!==null&&M.tag===6?(n($,M.sibling),M=f(M,D),M.return=$,$=M):(n($,M),M=nd(D,$.mode,fe),M.return=$,$=M),S($)):n($,M)}return Je}var na=km(!0),bm=km(!1),As=Vr(null),Cs=null,aa=null,mc=null;function pc(){mc=aa=Cs=null}function hc(e){var t=As.current;Ze(As),e._currentValue=t}function gc(e,t,n){for(;e!==null;){var s=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,s!==null&&(s.childLanes|=t)):s!==null&&(s.childLanes&t)!==t&&(s.childLanes|=t),e===n)break;e=e.return}}function ia(e,t){Cs=e,mc=aa=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(kt=!0),e.firstContext=null)}function qt(e){var t=e._currentValue;if(mc!==e)if(e={context:e,memoizedValue:t,next:null},aa===null){if(Cs===null)throw Error(i(308));aa=e,Cs.dependencies={lanes:0,firstContext:e}}else aa=aa.next=e;return t}var bn=null;function vc(e){bn===null?bn=[e]:bn.push(e)}function Am(e,t,n,s){var f=t.interleaved;return f===null?(n.next=n,vc(t)):(n.next=f.next,f.next=n),t.interleaved=n,_r(e,s)}function _r(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Qr=!1;function yc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Cm(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function kr(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Xr(e,t,n){var s=e.updateQueue;if(s===null)return null;if(s=s.shared,$e&2){var f=s.pending;return f===null?t.next=t:(t.next=f.next,f.next=t),s.pending=t,_r(e,n)}return f=s.interleaved,f===null?(t.next=t,vc(s)):(t.next=f.next,f.next=t),s.interleaved=t,_r(e,n)}function Es(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var s=t.lanes;s&=e.pendingLanes,n|=s,t.lanes=n,Lu(e,n)}}function Em(e,t){var n=e.updateQueue,s=e.alternate;if(s!==null&&(s=s.updateQueue,n===s)){var f=null,h=null;if(n=n.firstBaseUpdate,n!==null){do{var S={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};h===null?f=h=S:h=h.next=S,n=n.next}while(n!==null);h===null?f=h=t:h=h.next=t}else f=h=t;n={baseState:s.baseState,firstBaseUpdate:f,lastBaseUpdate:h,shared:s.shared,effects:s.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Is(e,t,n,s){var f=e.updateQueue;Qr=!1;var h=f.firstBaseUpdate,S=f.lastBaseUpdate,C=f.shared.pending;if(C!==null){f.shared.pending=null;var L=C,H=L.next;L.next=null,S===null?h=H:S.next=H,S=L;var te=e.alternate;te!==null&&(te=te.updateQueue,C=te.lastBaseUpdate,C!==S&&(C===null?te.firstBaseUpdate=H:C.next=H,te.lastBaseUpdate=L))}if(h!==null){var ae=f.baseState;S=0,te=H=L=null,C=h;do{var ee=C.lane,pe=C.eventTime;if((s&ee)===ee){te!==null&&(te=te.next={eventTime:pe,lane:0,tag:C.tag,payload:C.payload,callback:C.callback,next:null});e:{var ge=e,ve=C;switch(ee=t,pe=n,ve.tag){case 1:if(ge=ve.payload,typeof ge=="function"){ae=ge.call(pe,ae,ee);break e}ae=ge;break e;case 3:ge.flags=ge.flags&-65537|128;case 0:if(ge=ve.payload,ee=typeof ge=="function"?ge.call(pe,ae,ee):ge,ee==null)break e;ae=Y({},ae,ee);break e;case 2:Qr=!0}}C.callback!==null&&C.lane!==0&&(e.flags|=64,ee=f.effects,ee===null?f.effects=[C]:ee.push(C))}else pe={eventTime:pe,lane:ee,tag:C.tag,payload:C.payload,callback:C.callback,next:null},te===null?(H=te=pe,L=ae):te=te.next=pe,S|=ee;if(C=C.next,C===null){if(C=f.shared.pending,C===null)break;ee=C,C=ee.next,ee.next=null,f.lastBaseUpdate=ee,f.shared.pending=null}}while(!0);if(te===null&&(L=ae),f.baseState=L,f.firstBaseUpdate=H,f.lastBaseUpdate=te,t=f.shared.interleaved,t!==null){f=t;do S|=f.lane,f=f.next;while(f!==t)}else h===null&&(f.shared.lanes=0);En|=S,e.lanes=S,e.memoizedState=ae}}function Im(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var s=e[t],f=s.callback;if(f!==null){if(s.callback=null,s=n,typeof f!="function")throw Error(i(191,f));f.call(s)}}}var oi={},sr=Vr(oi),li=Vr(oi),ui=Vr(oi);function An(e){if(e===oi)throw Error(i(174));return e}function xc(e,t){switch(Ue(ui,t),Ue(li,e),Ue(sr,oi),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Be(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Be(t,e)}Ze(sr),Ue(sr,t)}function sa(){Ze(sr),Ze(li),Ze(ui)}function Rm(e){An(ui.current);var t=An(sr.current),n=Be(t,e.type);t!==n&&(Ue(li,e),Ue(sr,n))}function Sc(e){li.current===e&&(Ze(sr),Ze(li))}var Ye=Vr(0);function Rs(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var wc=[];function Nc(){for(var e=0;e<wc.length;e++)wc[e]._workInProgressVersionPrimary=null;wc.length=0}var Ps=z.ReactCurrentDispatcher,_c=z.ReactCurrentBatchConfig,Cn=0,Qe=null,rt=null,at=null,Ls=!1,ci=!1,di=0,w2=0;function mt(){throw Error(i(321))}function kc(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Kt(e[n],t[n]))return!1;return!0}function bc(e,t,n,s,f,h){if(Cn=h,Qe=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ps.current=e===null||e.memoizedState===null?b2:A2,e=n(s,f),ci){h=0;do{if(ci=!1,di=0,25<=h)throw Error(i(301));h+=1,at=rt=null,t.updateQueue=null,Ps.current=C2,e=n(s,f)}while(ci)}if(Ps.current=zs,t=rt!==null&&rt.next!==null,Cn=0,at=rt=Qe=null,Ls=!1,t)throw Error(i(300));return e}function Ac(){var e=di!==0;return di=0,e}function or(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return at===null?Qe.memoizedState=at=e:at=at.next=e,at}function Bt(){if(rt===null){var e=Qe.alternate;e=e!==null?e.memoizedState:null}else e=rt.next;var t=at===null?Qe.memoizedState:at.next;if(t!==null)at=t,rt=e;else{if(e===null)throw Error(i(310));rt=e,e={memoizedState:rt.memoizedState,baseState:rt.baseState,baseQueue:rt.baseQueue,queue:rt.queue,next:null},at===null?Qe.memoizedState=at=e:at=at.next=e}return at}function fi(e,t){return typeof t=="function"?t(e):t}function Cc(e){var t=Bt(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var s=rt,f=s.baseQueue,h=n.pending;if(h!==null){if(f!==null){var S=f.next;f.next=h.next,h.next=S}s.baseQueue=f=h,n.pending=null}if(f!==null){h=f.next,s=s.baseState;var C=S=null,L=null,H=h;do{var te=H.lane;if((Cn&te)===te)L!==null&&(L=L.next={lane:0,action:H.action,hasEagerState:H.hasEagerState,eagerState:H.eagerState,next:null}),s=H.hasEagerState?H.eagerState:e(s,H.action);else{var ae={lane:te,action:H.action,hasEagerState:H.hasEagerState,eagerState:H.eagerState,next:null};L===null?(C=L=ae,S=s):L=L.next=ae,Qe.lanes|=te,En|=te}H=H.next}while(H!==null&&H!==h);L===null?S=s:L.next=C,Kt(s,t.memoizedState)||(kt=!0),t.memoizedState=s,t.baseState=S,t.baseQueue=L,n.lastRenderedState=s}if(e=n.interleaved,e!==null){f=e;do h=f.lane,Qe.lanes|=h,En|=h,f=f.next;while(f!==e)}else f===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ec(e){var t=Bt(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var s=n.dispatch,f=n.pending,h=t.memoizedState;if(f!==null){n.pending=null;var S=f=f.next;do h=e(h,S.action),S=S.next;while(S!==f);Kt(h,t.memoizedState)||(kt=!0),t.memoizedState=h,t.baseQueue===null&&(t.baseState=h),n.lastRenderedState=h}return[h,s]}function Pm(){}function Lm(e,t){var n=Qe,s=Bt(),f=t(),h=!Kt(s.memoizedState,f);if(h&&(s.memoizedState=f,kt=!0),s=s.queue,Ic(zm.bind(null,n,s,e),[e]),s.getSnapshot!==t||h||at!==null&&at.memoizedState.tag&1){if(n.flags|=2048,mi(9,Mm.bind(null,n,s,f,t),void 0,null),it===null)throw Error(i(349));Cn&30||jm(n,t,f)}return f}function jm(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Qe.updateQueue,t===null?(t={lastEffect:null,stores:null},Qe.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Mm(e,t,n,s){t.value=n,t.getSnapshot=s,Tm(t)&&Om(e)}function zm(e,t,n){return n(function(){Tm(t)&&Om(e)})}function Tm(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Kt(e,n)}catch{return!0}}function Om(e){var t=_r(e,1);t!==null&&er(t,e,1,-1)}function $m(e){var t=or();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:fi,lastRenderedState:e},t.queue=e,e=e.dispatch=k2.bind(null,Qe,e),[t.memoizedState,e]}function mi(e,t,n,s){return e={tag:e,create:t,destroy:n,deps:s,next:null},t=Qe.updateQueue,t===null?(t={lastEffect:null,stores:null},Qe.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(s=n.next,n.next=e,e.next=s,t.lastEffect=e)),e}function Dm(){return Bt().memoizedState}function js(e,t,n,s){var f=or();Qe.flags|=e,f.memoizedState=mi(1|t,n,void 0,s===void 0?null:s)}function Ms(e,t,n,s){var f=Bt();s=s===void 0?null:s;var h=void 0;if(rt!==null){var S=rt.memoizedState;if(h=S.destroy,s!==null&&kc(s,S.deps)){f.memoizedState=mi(t,n,h,s);return}}Qe.flags|=e,f.memoizedState=mi(1|t,n,h,s)}function Fm(e,t){return js(8390656,8,e,t)}function Ic(e,t){return Ms(2048,8,e,t)}function qm(e,t){return Ms(4,2,e,t)}function Bm(e,t){return Ms(4,4,e,t)}function Um(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Hm(e,t,n){return n=n!=null?n.concat([e]):null,Ms(4,4,Um.bind(null,t,e),n)}function Rc(){}function Zm(e,t){var n=Bt();t=t===void 0?null:t;var s=n.memoizedState;return s!==null&&t!==null&&kc(t,s[1])?s[0]:(n.memoizedState=[e,t],e)}function Wm(e,t){var n=Bt();t=t===void 0?null:t;var s=n.memoizedState;return s!==null&&t!==null&&kc(t,s[1])?s[0]:(e=e(),n.memoizedState=[e,t],e)}function Gm(e,t,n){return Cn&21?(Kt(n,t)||(n=_f(),Qe.lanes|=n,En|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,kt=!0),e.memoizedState=n)}function N2(e,t){var n=Fe;Fe=n!==0&&4>n?n:4,e(!0);var s=_c.transition;_c.transition={};try{e(!1),t()}finally{Fe=n,_c.transition=s}}function Vm(){return Bt().memoizedState}function _2(e,t,n){var s=rn(e);if(n={lane:s,action:n,hasEagerState:!1,eagerState:null,next:null},Km(e))Ym(t,n);else if(n=Am(e,t,n,s),n!==null){var f=xt();er(n,e,s,f),Qm(n,t,s)}}function k2(e,t,n){var s=rn(e),f={lane:s,action:n,hasEagerState:!1,eagerState:null,next:null};if(Km(e))Ym(t,f);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=t.lastRenderedReducer,h!==null))try{var S=t.lastRenderedState,C=h(S,n);if(f.hasEagerState=!0,f.eagerState=C,Kt(C,S)){var L=t.interleaved;L===null?(f.next=f,vc(t)):(f.next=L.next,L.next=f),t.interleaved=f;return}}catch{}finally{}n=Am(e,t,f,s),n!==null&&(f=xt(),er(n,e,s,f),Qm(n,t,s))}}function Km(e){var t=e.alternate;return e===Qe||t!==null&&t===Qe}function Ym(e,t){ci=Ls=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Qm(e,t,n){if(n&4194240){var s=t.lanes;s&=e.pendingLanes,n|=s,t.lanes=n,Lu(e,n)}}var zs={readContext:qt,useCallback:mt,useContext:mt,useEffect:mt,useImperativeHandle:mt,useInsertionEffect:mt,useLayoutEffect:mt,useMemo:mt,useReducer:mt,useRef:mt,useState:mt,useDebugValue:mt,useDeferredValue:mt,useTransition:mt,useMutableSource:mt,useSyncExternalStore:mt,useId:mt,unstable_isNewReconciler:!1},b2={readContext:qt,useCallback:function(e,t){return or().memoizedState=[e,t===void 0?null:t],e},useContext:qt,useEffect:Fm,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,js(4194308,4,Um.bind(null,t,e),n)},useLayoutEffect:function(e,t){return js(4194308,4,e,t)},useInsertionEffect:function(e,t){return js(4,2,e,t)},useMemo:function(e,t){var n=or();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var s=or();return t=n!==void 0?n(t):t,s.memoizedState=s.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},s.queue=e,e=e.dispatch=_2.bind(null,Qe,e),[s.memoizedState,e]},useRef:function(e){var t=or();return e={current:e},t.memoizedState=e},useState:$m,useDebugValue:Rc,useDeferredValue:function(e){return or().memoizedState=e},useTransition:function(){var e=$m(!1),t=e[0];return e=N2.bind(null,e[1]),or().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var s=Qe,f=or();if(Ge){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),it===null)throw Error(i(349));Cn&30||jm(s,t,n)}f.memoizedState=n;var h={value:n,getSnapshot:t};return f.queue=h,Fm(zm.bind(null,s,h,e),[e]),s.flags|=2048,mi(9,Mm.bind(null,s,h,n,t),void 0,null),n},useId:function(){var e=or(),t=it.identifierPrefix;if(Ge){var n=Nr,s=wr;n=(s&~(1<<32-Vt(s)-1)).toString(32)+n,t=":"+t+"R"+n,n=di++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=w2++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},A2={readContext:qt,useCallback:Zm,useContext:qt,useEffect:Ic,useImperativeHandle:Hm,useInsertionEffect:qm,useLayoutEffect:Bm,useMemo:Wm,useReducer:Cc,useRef:Dm,useState:function(){return Cc(fi)},useDebugValue:Rc,useDeferredValue:function(e){var t=Bt();return Gm(t,rt.memoizedState,e)},useTransition:function(){var e=Cc(fi)[0],t=Bt().memoizedState;return[e,t]},useMutableSource:Pm,useSyncExternalStore:Lm,useId:Vm,unstable_isNewReconciler:!1},C2={readContext:qt,useCallback:Zm,useContext:qt,useEffect:Ic,useImperativeHandle:Hm,useInsertionEffect:qm,useLayoutEffect:Bm,useMemo:Wm,useReducer:Ec,useRef:Dm,useState:function(){return Ec(fi)},useDebugValue:Rc,useDeferredValue:function(e){var t=Bt();return rt===null?t.memoizedState=e:Gm(t,rt.memoizedState,e)},useTransition:function(){var e=Ec(fi)[0],t=Bt().memoizedState;return[e,t]},useMutableSource:Pm,useSyncExternalStore:Lm,useId:Vm,unstable_isNewReconciler:!1};function Qt(e,t){if(e&&e.defaultProps){t=Y({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Pc(e,t,n,s){t=e.memoizedState,n=n(s,t),n=n==null?t:Y({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ts={isMounted:function(e){return(e=e._reactInternals)?gr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var s=xt(),f=rn(e),h=kr(s,f);h.payload=t,n!=null&&(h.callback=n),t=Xr(e,h,f),t!==null&&(er(t,e,f,s),Es(t,e,f))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var s=xt(),f=rn(e),h=kr(s,f);h.tag=1,h.payload=t,n!=null&&(h.callback=n),t=Xr(e,h,f),t!==null&&(er(t,e,f,s),Es(t,e,f))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=xt(),s=rn(e),f=kr(n,s);f.tag=2,t!=null&&(f.callback=t),t=Xr(e,f,s),t!==null&&(er(t,e,s,n),Es(t,e,s))}};function Xm(e,t,n,s,f,h,S){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(s,h,S):t.prototype&&t.prototype.isPureReactComponent?!Ja(n,s)||!Ja(f,h):!0}function Jm(e,t,n){var s=!1,f=Kr,h=t.contextType;return typeof h=="object"&&h!==null?h=qt(h):(f=_t(t)?Nn:ft.current,s=t.contextTypes,h=(s=s!=null)?Jn(e,f):Kr),t=new t(n,h),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Ts,e.stateNode=t,t._reactInternals=e,s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=f,e.__reactInternalMemoizedMaskedChildContext=h),t}function ep(e,t,n,s){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,s),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,s),t.state!==e&&Ts.enqueueReplaceState(t,t.state,null)}function Lc(e,t,n,s){var f=e.stateNode;f.props=n,f.state=e.memoizedState,f.refs={},yc(e);var h=t.contextType;typeof h=="object"&&h!==null?f.context=qt(h):(h=_t(t)?Nn:ft.current,f.context=Jn(e,h)),f.state=e.memoizedState,h=t.getDerivedStateFromProps,typeof h=="function"&&(Pc(e,t,h,n),f.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(t=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),t!==f.state&&Ts.enqueueReplaceState(f,f.state,null),Is(e,n,f,s),f.state=e.memoizedState),typeof f.componentDidMount=="function"&&(e.flags|=4194308)}function oa(e,t){try{var n="",s=t;do n+=Ce(s),s=s.return;while(s);var f=n}catch(h){f=`
Error generating stack: `+h.message+`
`+h.stack}return{value:e,source:t,stack:f,digest:null}}function jc(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Mc(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var E2=typeof WeakMap=="function"?WeakMap:Map;function tp(e,t,n){n=kr(-1,n),n.tag=3,n.payload={element:null};var s=t.value;return n.callback=function(){Us||(Us=!0,Kc=s),Mc(e,t)},n}function rp(e,t,n){n=kr(-1,n),n.tag=3;var s=e.type.getDerivedStateFromError;if(typeof s=="function"){var f=t.value;n.payload=function(){return s(f)},n.callback=function(){Mc(e,t)}}var h=e.stateNode;return h!==null&&typeof h.componentDidCatch=="function"&&(n.callback=function(){Mc(e,t),typeof s!="function"&&(en===null?en=new Set([this]):en.add(this));var S=t.stack;this.componentDidCatch(t.value,{componentStack:S!==null?S:""})}),n}function np(e,t,n){var s=e.pingCache;if(s===null){s=e.pingCache=new E2;var f=new Set;s.set(t,f)}else f=s.get(t),f===void 0&&(f=new Set,s.set(t,f));f.has(n)||(f.add(n),e=B2.bind(null,e,t,n),t.then(e,e))}function ap(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function ip(e,t,n,s,f){return e.mode&1?(e.flags|=65536,e.lanes=f,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=kr(-1,1),t.tag=2,Xr(n,t,1))),n.lanes|=1),e)}var I2=z.ReactCurrentOwner,kt=!1;function yt(e,t,n,s){t.child=e===null?bm(t,null,n,s):na(t,e.child,n,s)}function sp(e,t,n,s,f){n=n.render;var h=t.ref;return ia(t,f),s=bc(e,t,n,s,h,f),n=Ac(),e!==null&&!kt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~f,br(e,t,f)):(Ge&&n&&lc(t),t.flags|=1,yt(e,t,s,f),t.child)}function op(e,t,n,s,f){if(e===null){var h=n.type;return typeof h=="function"&&!rd(h)&&h.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=h,lp(e,t,h,s,f)):(e=Ks(n.type,null,s,t,t.mode,f),e.ref=t.ref,e.return=t,t.child=e)}if(h=e.child,!(e.lanes&f)){var S=h.memoizedProps;if(n=n.compare,n=n!==null?n:Ja,n(S,s)&&e.ref===t.ref)return br(e,t,f)}return t.flags|=1,e=an(h,s),e.ref=t.ref,e.return=t,t.child=e}function lp(e,t,n,s,f){if(e!==null){var h=e.memoizedProps;if(Ja(h,s)&&e.ref===t.ref)if(kt=!1,t.pendingProps=s=h,(e.lanes&f)!==0)e.flags&131072&&(kt=!0);else return t.lanes=e.lanes,br(e,t,f)}return zc(e,t,n,s,f)}function up(e,t,n){var s=t.pendingProps,f=s.children,h=e!==null?e.memoizedState:null;if(s.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ue(ua,Lt),Lt|=n;else{if(!(n&1073741824))return e=h!==null?h.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Ue(ua,Lt),Lt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},s=h!==null?h.baseLanes:n,Ue(ua,Lt),Lt|=s}else h!==null?(s=h.baseLanes|n,t.memoizedState=null):s=n,Ue(ua,Lt),Lt|=s;return yt(e,t,f,n),t.child}function cp(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function zc(e,t,n,s,f){var h=_t(n)?Nn:ft.current;return h=Jn(t,h),ia(t,f),n=bc(e,t,n,s,h,f),s=Ac(),e!==null&&!kt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~f,br(e,t,f)):(Ge&&s&&lc(t),t.flags|=1,yt(e,t,n,f),t.child)}function dp(e,t,n,s,f){if(_t(n)){var h=!0;Ss(t)}else h=!1;if(ia(t,f),t.stateNode===null)$s(e,t),Jm(t,n,s),Lc(t,n,s,f),s=!0;else if(e===null){var S=t.stateNode,C=t.memoizedProps;S.props=C;var L=S.context,H=n.contextType;typeof H=="object"&&H!==null?H=qt(H):(H=_t(n)?Nn:ft.current,H=Jn(t,H));var te=n.getDerivedStateFromProps,ae=typeof te=="function"||typeof S.getSnapshotBeforeUpdate=="function";ae||typeof S.UNSAFE_componentWillReceiveProps!="function"&&typeof S.componentWillReceiveProps!="function"||(C!==s||L!==H)&&ep(t,S,s,H),Qr=!1;var ee=t.memoizedState;S.state=ee,Is(t,s,S,f),L=t.memoizedState,C!==s||ee!==L||Nt.current||Qr?(typeof te=="function"&&(Pc(t,n,te,s),L=t.memoizedState),(C=Qr||Xm(t,n,C,s,ee,L,H))?(ae||typeof S.UNSAFE_componentWillMount!="function"&&typeof S.componentWillMount!="function"||(typeof S.componentWillMount=="function"&&S.componentWillMount(),typeof S.UNSAFE_componentWillMount=="function"&&S.UNSAFE_componentWillMount()),typeof S.componentDidMount=="function"&&(t.flags|=4194308)):(typeof S.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=s,t.memoizedState=L),S.props=s,S.state=L,S.context=H,s=C):(typeof S.componentDidMount=="function"&&(t.flags|=4194308),s=!1)}else{S=t.stateNode,Cm(e,t),C=t.memoizedProps,H=t.type===t.elementType?C:Qt(t.type,C),S.props=H,ae=t.pendingProps,ee=S.context,L=n.contextType,typeof L=="object"&&L!==null?L=qt(L):(L=_t(n)?Nn:ft.current,L=Jn(t,L));var pe=n.getDerivedStateFromProps;(te=typeof pe=="function"||typeof S.getSnapshotBeforeUpdate=="function")||typeof S.UNSAFE_componentWillReceiveProps!="function"&&typeof S.componentWillReceiveProps!="function"||(C!==ae||ee!==L)&&ep(t,S,s,L),Qr=!1,ee=t.memoizedState,S.state=ee,Is(t,s,S,f);var ge=t.memoizedState;C!==ae||ee!==ge||Nt.current||Qr?(typeof pe=="function"&&(Pc(t,n,pe,s),ge=t.memoizedState),(H=Qr||Xm(t,n,H,s,ee,ge,L)||!1)?(te||typeof S.UNSAFE_componentWillUpdate!="function"&&typeof S.componentWillUpdate!="function"||(typeof S.componentWillUpdate=="function"&&S.componentWillUpdate(s,ge,L),typeof S.UNSAFE_componentWillUpdate=="function"&&S.UNSAFE_componentWillUpdate(s,ge,L)),typeof S.componentDidUpdate=="function"&&(t.flags|=4),typeof S.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof S.componentDidUpdate!="function"||C===e.memoizedProps&&ee===e.memoizedState||(t.flags|=4),typeof S.getSnapshotBeforeUpdate!="function"||C===e.memoizedProps&&ee===e.memoizedState||(t.flags|=1024),t.memoizedProps=s,t.memoizedState=ge),S.props=s,S.state=ge,S.context=L,s=H):(typeof S.componentDidUpdate!="function"||C===e.memoizedProps&&ee===e.memoizedState||(t.flags|=4),typeof S.getSnapshotBeforeUpdate!="function"||C===e.memoizedProps&&ee===e.memoizedState||(t.flags|=1024),s=!1)}return Tc(e,t,n,s,h,f)}function Tc(e,t,n,s,f,h){cp(e,t);var S=(t.flags&128)!==0;if(!s&&!S)return f&&gm(t,n,!1),br(e,t,h);s=t.stateNode,I2.current=t;var C=S&&typeof n.getDerivedStateFromError!="function"?null:s.render();return t.flags|=1,e!==null&&S?(t.child=na(t,e.child,null,h),t.child=na(t,null,C,h)):yt(e,t,C,h),t.memoizedState=s.state,f&&gm(t,n,!0),t.child}function fp(e){var t=e.stateNode;t.pendingContext?pm(e,t.pendingContext,t.pendingContext!==t.context):t.context&&pm(e,t.context,!1),xc(e,t.containerInfo)}function mp(e,t,n,s,f){return ra(),fc(f),t.flags|=256,yt(e,t,n,s),t.child}var Oc={dehydrated:null,treeContext:null,retryLane:0};function $c(e){return{baseLanes:e,cachePool:null,transitions:null}}function pp(e,t,n){var s=t.pendingProps,f=Ye.current,h=!1,S=(t.flags&128)!==0,C;if((C=S)||(C=e!==null&&e.memoizedState===null?!1:(f&2)!==0),C?(h=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(f|=1),Ue(Ye,f&1),e===null)return dc(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(S=s.children,e=s.fallback,h?(s=t.mode,h=t.child,S={mode:"hidden",children:S},!(s&1)&&h!==null?(h.childLanes=0,h.pendingProps=S):h=Ys(S,s,0,null),e=Ln(e,s,n,null),h.return=t,e.return=t,h.sibling=e,t.child=h,t.child.memoizedState=$c(n),t.memoizedState=Oc,e):Dc(t,S));if(f=e.memoizedState,f!==null&&(C=f.dehydrated,C!==null))return R2(e,t,S,s,C,f,n);if(h){h=s.fallback,S=t.mode,f=e.child,C=f.sibling;var L={mode:"hidden",children:s.children};return!(S&1)&&t.child!==f?(s=t.child,s.childLanes=0,s.pendingProps=L,t.deletions=null):(s=an(f,L),s.subtreeFlags=f.subtreeFlags&14680064),C!==null?h=an(C,h):(h=Ln(h,S,n,null),h.flags|=2),h.return=t,s.return=t,s.sibling=h,t.child=s,s=h,h=t.child,S=e.child.memoizedState,S=S===null?$c(n):{baseLanes:S.baseLanes|n,cachePool:null,transitions:S.transitions},h.memoizedState=S,h.childLanes=e.childLanes&~n,t.memoizedState=Oc,s}return h=e.child,e=h.sibling,s=an(h,{mode:"visible",children:s.children}),!(t.mode&1)&&(s.lanes=n),s.return=t,s.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=s,t.memoizedState=null,s}function Dc(e,t){return t=Ys({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Os(e,t,n,s){return s!==null&&fc(s),na(t,e.child,null,n),e=Dc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function R2(e,t,n,s,f,h,S){if(n)return t.flags&256?(t.flags&=-257,s=jc(Error(i(422))),Os(e,t,S,s)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(h=s.fallback,f=t.mode,s=Ys({mode:"visible",children:s.children},f,0,null),h=Ln(h,f,S,null),h.flags|=2,s.return=t,h.return=t,s.sibling=h,t.child=s,t.mode&1&&na(t,e.child,null,S),t.child.memoizedState=$c(S),t.memoizedState=Oc,h);if(!(t.mode&1))return Os(e,t,S,null);if(f.data==="$!"){if(s=f.nextSibling&&f.nextSibling.dataset,s)var C=s.dgst;return s=C,h=Error(i(419)),s=jc(h,s,void 0),Os(e,t,S,s)}if(C=(S&e.childLanes)!==0,kt||C){if(s=it,s!==null){switch(S&-S){case 4:f=2;break;case 16:f=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:f=32;break;case 536870912:f=268435456;break;default:f=0}f=f&(s.suspendedLanes|S)?0:f,f!==0&&f!==h.retryLane&&(h.retryLane=f,_r(e,f),er(s,e,f,-1))}return td(),s=jc(Error(i(421))),Os(e,t,S,s)}return f.data==="$?"?(t.flags|=128,t.child=e.child,t=U2.bind(null,e),f._reactRetry=t,null):(e=h.treeContext,Pt=Gr(f.nextSibling),Rt=t,Ge=!0,Yt=null,e!==null&&(Dt[Ft++]=wr,Dt[Ft++]=Nr,Dt[Ft++]=_n,wr=e.id,Nr=e.overflow,_n=t),t=Dc(t,s.children),t.flags|=4096,t)}function hp(e,t,n){e.lanes|=t;var s=e.alternate;s!==null&&(s.lanes|=t),gc(e.return,t,n)}function Fc(e,t,n,s,f){var h=e.memoizedState;h===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:s,tail:n,tailMode:f}:(h.isBackwards=t,h.rendering=null,h.renderingStartTime=0,h.last=s,h.tail=n,h.tailMode=f)}function gp(e,t,n){var s=t.pendingProps,f=s.revealOrder,h=s.tail;if(yt(e,t,s.children,n),s=Ye.current,s&2)s=s&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&hp(e,n,t);else if(e.tag===19)hp(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}s&=1}if(Ue(Ye,s),!(t.mode&1))t.memoizedState=null;else switch(f){case"forwards":for(n=t.child,f=null;n!==null;)e=n.alternate,e!==null&&Rs(e)===null&&(f=n),n=n.sibling;n=f,n===null?(f=t.child,t.child=null):(f=n.sibling,n.sibling=null),Fc(t,!1,f,n,h);break;case"backwards":for(n=null,f=t.child,t.child=null;f!==null;){if(e=f.alternate,e!==null&&Rs(e)===null){t.child=f;break}e=f.sibling,f.sibling=n,n=f,f=e}Fc(t,!0,n,null,h);break;case"together":Fc(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function $s(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function br(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),En|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=an(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=an(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function P2(e,t,n){switch(t.tag){case 3:fp(t),ra();break;case 5:Rm(t);break;case 1:_t(t.type)&&Ss(t);break;case 4:xc(t,t.stateNode.containerInfo);break;case 10:var s=t.type._context,f=t.memoizedProps.value;Ue(As,s._currentValue),s._currentValue=f;break;case 13:if(s=t.memoizedState,s!==null)return s.dehydrated!==null?(Ue(Ye,Ye.current&1),t.flags|=128,null):n&t.child.childLanes?pp(e,t,n):(Ue(Ye,Ye.current&1),e=br(e,t,n),e!==null?e.sibling:null);Ue(Ye,Ye.current&1);break;case 19:if(s=(n&t.childLanes)!==0,e.flags&128){if(s)return gp(e,t,n);t.flags|=128}if(f=t.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),Ue(Ye,Ye.current),s)break;return null;case 22:case 23:return t.lanes=0,up(e,t,n)}return br(e,t,n)}var vp,qc,yp,xp;vp=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},qc=function(){},yp=function(e,t,n,s){var f=e.memoizedProps;if(f!==s){e=t.stateNode,An(sr.current);var h=null;switch(n){case"input":f=ct(e,f),s=ct(e,s),h=[];break;case"select":f=Y({},f,{value:void 0}),s=Y({},s,{value:void 0}),h=[];break;case"textarea":f=ne(e,f),s=ne(e,s),h=[];break;default:typeof f.onClick!="function"&&typeof s.onClick=="function"&&(e.onclick=vs)}Fn(n,s);var S;n=null;for(H in f)if(!s.hasOwnProperty(H)&&f.hasOwnProperty(H)&&f[H]!=null)if(H==="style"){var C=f[H];for(S in C)C.hasOwnProperty(S)&&(n||(n={}),n[S]="")}else H!=="dangerouslySetInnerHTML"&&H!=="children"&&H!=="suppressContentEditableWarning"&&H!=="suppressHydrationWarning"&&H!=="autoFocus"&&(l.hasOwnProperty(H)?h||(h=[]):(h=h||[]).push(H,null));for(H in s){var L=s[H];if(C=f!=null?f[H]:void 0,s.hasOwnProperty(H)&&L!==C&&(L!=null||C!=null))if(H==="style")if(C){for(S in C)!C.hasOwnProperty(S)||L&&L.hasOwnProperty(S)||(n||(n={}),n[S]="");for(S in L)L.hasOwnProperty(S)&&C[S]!==L[S]&&(n||(n={}),n[S]=L[S])}else n||(h||(h=[]),h.push(H,n)),n=L;else H==="dangerouslySetInnerHTML"?(L=L?L.__html:void 0,C=C?C.__html:void 0,L!=null&&C!==L&&(h=h||[]).push(H,L)):H==="children"?typeof L!="string"&&typeof L!="number"||(h=h||[]).push(H,""+L):H!=="suppressContentEditableWarning"&&H!=="suppressHydrationWarning"&&(l.hasOwnProperty(H)?(L!=null&&H==="onScroll"&&He("scroll",e),h||C===L||(h=[])):(h=h||[]).push(H,L))}n&&(h=h||[]).push("style",n);var H=h;(t.updateQueue=H)&&(t.flags|=4)}},xp=function(e,t,n,s){n!==s&&(t.flags|=4)};function pi(e,t){if(!Ge)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var s=null;n!==null;)n.alternate!==null&&(s=n),n=n.sibling;s===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:s.sibling=null}}function pt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,s=0;if(t)for(var f=e.child;f!==null;)n|=f.lanes|f.childLanes,s|=f.subtreeFlags&14680064,s|=f.flags&14680064,f.return=e,f=f.sibling;else for(f=e.child;f!==null;)n|=f.lanes|f.childLanes,s|=f.subtreeFlags,s|=f.flags,f.return=e,f=f.sibling;return e.subtreeFlags|=s,e.childLanes=n,t}function L2(e,t,n){var s=t.pendingProps;switch(uc(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return pt(t),null;case 1:return _t(t.type)&&xs(),pt(t),null;case 3:return s=t.stateNode,sa(),Ze(Nt),Ze(ft),Nc(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(ks(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Yt!==null&&(Xc(Yt),Yt=null))),qc(e,t),pt(t),null;case 5:Sc(t);var f=An(ui.current);if(n=t.type,e!==null&&t.stateNode!=null)yp(e,t,n,s,f),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!s){if(t.stateNode===null)throw Error(i(166));return pt(t),null}if(e=An(sr.current),ks(t)){s=t.stateNode,n=t.type;var h=t.memoizedProps;switch(s[ir]=t,s[ai]=h,e=(t.mode&1)!==0,n){case"dialog":He("cancel",s),He("close",s);break;case"iframe":case"object":case"embed":He("load",s);break;case"video":case"audio":for(f=0;f<ti.length;f++)He(ti[f],s);break;case"source":He("error",s);break;case"img":case"image":case"link":He("error",s),He("load",s);break;case"details":He("toggle",s);break;case"input":pn(s,h),He("invalid",s);break;case"select":s._wrapperState={wasMultiple:!!h.multiple},He("invalid",s);break;case"textarea":de(s,h),He("invalid",s)}Fn(n,h),f=null;for(var S in h)if(h.hasOwnProperty(S)){var C=h[S];S==="children"?typeof C=="string"?s.textContent!==C&&(h.suppressHydrationWarning!==!0&&gs(s.textContent,C,e),f=["children",C]):typeof C=="number"&&s.textContent!==""+C&&(h.suppressHydrationWarning!==!0&&gs(s.textContent,C,e),f=["children",""+C]):l.hasOwnProperty(S)&&C!=null&&S==="onScroll"&&He("scroll",s)}switch(n){case"input":Tr(s),A(s,h,!0);break;case"textarea":Tr(s),Pe(s);break;case"select":case"option":break;default:typeof h.onClick=="function"&&(s.onclick=vs)}s=f,t.updateQueue=s,s!==null&&(t.flags|=4)}else{S=f.nodeType===9?f:f.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Oe(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=S.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof s.is=="string"?e=S.createElement(n,{is:s.is}):(e=S.createElement(n),n==="select"&&(S=e,s.multiple?S.multiple=!0:s.size&&(S.size=s.size))):e=S.createElementNS(e,n),e[ir]=t,e[ai]=s,vp(e,t,!1,!1),t.stateNode=e;e:{switch(S=Ma(n,s),n){case"dialog":He("cancel",e),He("close",e),f=s;break;case"iframe":case"object":case"embed":He("load",e),f=s;break;case"video":case"audio":for(f=0;f<ti.length;f++)He(ti[f],e);f=s;break;case"source":He("error",e),f=s;break;case"img":case"image":case"link":He("error",e),He("load",e),f=s;break;case"details":He("toggle",e),f=s;break;case"input":pn(e,s),f=ct(e,s),He("invalid",e);break;case"option":f=s;break;case"select":e._wrapperState={wasMultiple:!!s.multiple},f=Y({},s,{value:void 0}),He("invalid",e);break;case"textarea":de(e,s),f=ne(e,s),He("invalid",e);break;default:f=s}Fn(n,f),C=f;for(h in C)if(C.hasOwnProperty(h)){var L=C[h];h==="style"?hr(e,L):h==="dangerouslySetInnerHTML"?(L=L?L.__html:void 0,L!=null&&Ot(e,L)):h==="children"?typeof L=="string"?(n!=="textarea"||L!=="")&&dt(e,L):typeof L=="number"&&dt(e,""+L):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(l.hasOwnProperty(h)?L!=null&&h==="onScroll"&&He("scroll",e):L!=null&&I(e,h,L,S))}switch(n){case"input":Tr(e),A(e,s,!1);break;case"textarea":Tr(e),Pe(e);break;case"option":s.value!=null&&e.setAttribute("value",""+Me(s.value));break;case"select":e.multiple=!!s.multiple,h=s.value,h!=null?re(e,!!s.multiple,h,!1):s.defaultValue!=null&&re(e,!!s.multiple,s.defaultValue,!0);break;default:typeof f.onClick=="function"&&(e.onclick=vs)}switch(n){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}}s&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return pt(t),null;case 6:if(e&&t.stateNode!=null)xp(e,t,e.memoizedProps,s);else{if(typeof s!="string"&&t.stateNode===null)throw Error(i(166));if(n=An(ui.current),An(sr.current),ks(t)){if(s=t.stateNode,n=t.memoizedProps,s[ir]=t,(h=s.nodeValue!==n)&&(e=Rt,e!==null))switch(e.tag){case 3:gs(s.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&gs(s.nodeValue,n,(e.mode&1)!==0)}h&&(t.flags|=4)}else s=(n.nodeType===9?n:n.ownerDocument).createTextNode(s),s[ir]=t,t.stateNode=s}return pt(t),null;case 13:if(Ze(Ye),s=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Ge&&Pt!==null&&t.mode&1&&!(t.flags&128))Nm(),ra(),t.flags|=98560,h=!1;else if(h=ks(t),s!==null&&s.dehydrated!==null){if(e===null){if(!h)throw Error(i(318));if(h=t.memoizedState,h=h!==null?h.dehydrated:null,!h)throw Error(i(317));h[ir]=t}else ra(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;pt(t),h=!1}else Yt!==null&&(Xc(Yt),Yt=null),h=!0;if(!h)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(s=s!==null,s!==(e!==null&&e.memoizedState!==null)&&s&&(t.child.flags|=8192,t.mode&1&&(e===null||Ye.current&1?nt===0&&(nt=3):td())),t.updateQueue!==null&&(t.flags|=4),pt(t),null);case 4:return sa(),qc(e,t),e===null&&ri(t.stateNode.containerInfo),pt(t),null;case 10:return hc(t.type._context),pt(t),null;case 17:return _t(t.type)&&xs(),pt(t),null;case 19:if(Ze(Ye),h=t.memoizedState,h===null)return pt(t),null;if(s=(t.flags&128)!==0,S=h.rendering,S===null)if(s)pi(h,!1);else{if(nt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(S=Rs(e),S!==null){for(t.flags|=128,pi(h,!1),s=S.updateQueue,s!==null&&(t.updateQueue=s,t.flags|=4),t.subtreeFlags=0,s=n,n=t.child;n!==null;)h=n,e=s,h.flags&=14680066,S=h.alternate,S===null?(h.childLanes=0,h.lanes=e,h.child=null,h.subtreeFlags=0,h.memoizedProps=null,h.memoizedState=null,h.updateQueue=null,h.dependencies=null,h.stateNode=null):(h.childLanes=S.childLanes,h.lanes=S.lanes,h.child=S.child,h.subtreeFlags=0,h.deletions=null,h.memoizedProps=S.memoizedProps,h.memoizedState=S.memoizedState,h.updateQueue=S.updateQueue,h.type=S.type,e=S.dependencies,h.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Ue(Ye,Ye.current&1|2),t.child}e=e.sibling}h.tail!==null&&Re()>ca&&(t.flags|=128,s=!0,pi(h,!1),t.lanes=4194304)}else{if(!s)if(e=Rs(S),e!==null){if(t.flags|=128,s=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),pi(h,!0),h.tail===null&&h.tailMode==="hidden"&&!S.alternate&&!Ge)return pt(t),null}else 2*Re()-h.renderingStartTime>ca&&n!==1073741824&&(t.flags|=128,s=!0,pi(h,!1),t.lanes=4194304);h.isBackwards?(S.sibling=t.child,t.child=S):(n=h.last,n!==null?n.sibling=S:t.child=S,h.last=S)}return h.tail!==null?(t=h.tail,h.rendering=t,h.tail=t.sibling,h.renderingStartTime=Re(),t.sibling=null,n=Ye.current,Ue(Ye,s?n&1|2:n&1),t):(pt(t),null);case 22:case 23:return ed(),s=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==s&&(t.flags|=8192),s&&t.mode&1?Lt&1073741824&&(pt(t),t.subtreeFlags&6&&(t.flags|=8192)):pt(t),null;case 24:return null;case 25:return null}throw Error(i(156,t.tag))}function j2(e,t){switch(uc(t),t.tag){case 1:return _t(t.type)&&xs(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return sa(),Ze(Nt),Ze(ft),Nc(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Sc(t),null;case 13:if(Ze(Ye),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));ra()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ze(Ye),null;case 4:return sa(),null;case 10:return hc(t.type._context),null;case 22:case 23:return ed(),null;case 24:return null;default:return null}}var Ds=!1,ht=!1,M2=typeof WeakSet=="function"?WeakSet:Set,he=null;function la(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(s){Xe(e,t,s)}else n.current=null}function Bc(e,t,n){try{n()}catch(s){Xe(e,t,s)}}var Sp=!1;function z2(e,t){if(ec=is,e=Xf(),Wu(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var s=n.getSelection&&n.getSelection();if(s&&s.rangeCount!==0){n=s.anchorNode;var f=s.anchorOffset,h=s.focusNode;s=s.focusOffset;try{n.nodeType,h.nodeType}catch{n=null;break e}var S=0,C=-1,L=-1,H=0,te=0,ae=e,ee=null;t:for(;;){for(var pe;ae!==n||f!==0&&ae.nodeType!==3||(C=S+f),ae!==h||s!==0&&ae.nodeType!==3||(L=S+s),ae.nodeType===3&&(S+=ae.nodeValue.length),(pe=ae.firstChild)!==null;)ee=ae,ae=pe;for(;;){if(ae===e)break t;if(ee===n&&++H===f&&(C=S),ee===h&&++te===s&&(L=S),(pe=ae.nextSibling)!==null)break;ae=ee,ee=ae.parentNode}ae=pe}n=C===-1||L===-1?null:{start:C,end:L}}else n=null}n=n||{start:0,end:0}}else n=null;for(tc={focusedElem:e,selectionRange:n},is=!1,he=t;he!==null;)if(t=he,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,he=e;else for(;he!==null;){t=he;try{var ge=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(ge!==null){var ve=ge.memoizedProps,Je=ge.memoizedState,$=t.stateNode,M=$.getSnapshotBeforeUpdate(t.elementType===t.type?ve:Qt(t.type,ve),Je);$.__reactInternalSnapshotBeforeUpdate=M}break;case 3:var D=t.stateNode.containerInfo;D.nodeType===1?D.textContent="":D.nodeType===9&&D.documentElement&&D.removeChild(D.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(i(163))}}catch(fe){Xe(t,t.return,fe)}if(e=t.sibling,e!==null){e.return=t.return,he=e;break}he=t.return}return ge=Sp,Sp=!1,ge}function hi(e,t,n){var s=t.updateQueue;if(s=s!==null?s.lastEffect:null,s!==null){var f=s=s.next;do{if((f.tag&e)===e){var h=f.destroy;f.destroy=void 0,h!==void 0&&Bc(t,n,h)}f=f.next}while(f!==s)}}function Fs(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var s=n.create;n.destroy=s()}n=n.next}while(n!==t)}}function Uc(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function wp(e){var t=e.alternate;t!==null&&(e.alternate=null,wp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[ir],delete t[ai],delete t[ic],delete t[v2],delete t[y2])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Np(e){return e.tag===5||e.tag===3||e.tag===4}function _p(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Np(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Hc(e,t,n){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=vs));else if(s!==4&&(e=e.child,e!==null))for(Hc(e,t,n),e=e.sibling;e!==null;)Hc(e,t,n),e=e.sibling}function Zc(e,t,n){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(s!==4&&(e=e.child,e!==null))for(Zc(e,t,n),e=e.sibling;e!==null;)Zc(e,t,n),e=e.sibling}var lt=null,Xt=!1;function Jr(e,t,n){for(n=n.child;n!==null;)kp(e,t,n),n=n.sibling}function kp(e,t,n){if(ar&&typeof ar.onCommitFiberUnmount=="function")try{ar.onCommitFiberUnmount(Ji,n)}catch{}switch(n.tag){case 5:ht||la(n,t);case 6:var s=lt,f=Xt;lt=null,Jr(e,t,n),lt=s,Xt=f,lt!==null&&(Xt?(e=lt,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):lt.removeChild(n.stateNode));break;case 18:lt!==null&&(Xt?(e=lt,n=n.stateNode,e.nodeType===8?ac(e.parentNode,n):e.nodeType===1&&ac(e,n),Ga(e)):ac(lt,n.stateNode));break;case 4:s=lt,f=Xt,lt=n.stateNode.containerInfo,Xt=!0,Jr(e,t,n),lt=s,Xt=f;break;case 0:case 11:case 14:case 15:if(!ht&&(s=n.updateQueue,s!==null&&(s=s.lastEffect,s!==null))){f=s=s.next;do{var h=f,S=h.destroy;h=h.tag,S!==void 0&&(h&2||h&4)&&Bc(n,t,S),f=f.next}while(f!==s)}Jr(e,t,n);break;case 1:if(!ht&&(la(n,t),s=n.stateNode,typeof s.componentWillUnmount=="function"))try{s.props=n.memoizedProps,s.state=n.memoizedState,s.componentWillUnmount()}catch(C){Xe(n,t,C)}Jr(e,t,n);break;case 21:Jr(e,t,n);break;case 22:n.mode&1?(ht=(s=ht)||n.memoizedState!==null,Jr(e,t,n),ht=s):Jr(e,t,n);break;default:Jr(e,t,n)}}function bp(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new M2),t.forEach(function(s){var f=H2.bind(null,e,s);n.has(s)||(n.add(s),s.then(f,f))})}}function Jt(e,t){var n=t.deletions;if(n!==null)for(var s=0;s<n.length;s++){var f=n[s];try{var h=e,S=t,C=S;e:for(;C!==null;){switch(C.tag){case 5:lt=C.stateNode,Xt=!1;break e;case 3:lt=C.stateNode.containerInfo,Xt=!0;break e;case 4:lt=C.stateNode.containerInfo,Xt=!0;break e}C=C.return}if(lt===null)throw Error(i(160));kp(h,S,f),lt=null,Xt=!1;var L=f.alternate;L!==null&&(L.return=null),f.return=null}catch(H){Xe(f,t,H)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Ap(t,e),t=t.sibling}function Ap(e,t){var n=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Jt(t,e),lr(e),s&4){try{hi(3,e,e.return),Fs(3,e)}catch(ve){Xe(e,e.return,ve)}try{hi(5,e,e.return)}catch(ve){Xe(e,e.return,ve)}}break;case 1:Jt(t,e),lr(e),s&512&&n!==null&&la(n,n.return);break;case 5:if(Jt(t,e),lr(e),s&512&&n!==null&&la(n,n.return),e.flags&32){var f=e.stateNode;try{dt(f,"")}catch(ve){Xe(e,e.return,ve)}}if(s&4&&(f=e.stateNode,f!=null)){var h=e.memoizedProps,S=n!==null?n.memoizedProps:h,C=e.type,L=e.updateQueue;if(e.updateQueue=null,L!==null)try{C==="input"&&h.type==="radio"&&h.name!=null&&pr(f,h),Ma(C,S);var H=Ma(C,h);for(S=0;S<L.length;S+=2){var te=L[S],ae=L[S+1];te==="style"?hr(f,ae):te==="dangerouslySetInnerHTML"?Ot(f,ae):te==="children"?dt(f,ae):I(f,te,ae,H)}switch(C){case"input":hn(f,h);break;case"textarea":_e(f,h);break;case"select":var ee=f._wrapperState.wasMultiple;f._wrapperState.wasMultiple=!!h.multiple;var pe=h.value;pe!=null?re(f,!!h.multiple,pe,!1):ee!==!!h.multiple&&(h.defaultValue!=null?re(f,!!h.multiple,h.defaultValue,!0):re(f,!!h.multiple,h.multiple?[]:"",!1))}f[ai]=h}catch(ve){Xe(e,e.return,ve)}}break;case 6:if(Jt(t,e),lr(e),s&4){if(e.stateNode===null)throw Error(i(162));f=e.stateNode,h=e.memoizedProps;try{f.nodeValue=h}catch(ve){Xe(e,e.return,ve)}}break;case 3:if(Jt(t,e),lr(e),s&4&&n!==null&&n.memoizedState.isDehydrated)try{Ga(t.containerInfo)}catch(ve){Xe(e,e.return,ve)}break;case 4:Jt(t,e),lr(e);break;case 13:Jt(t,e),lr(e),f=e.child,f.flags&8192&&(h=f.memoizedState!==null,f.stateNode.isHidden=h,!h||f.alternate!==null&&f.alternate.memoizedState!==null||(Vc=Re())),s&4&&bp(e);break;case 22:if(te=n!==null&&n.memoizedState!==null,e.mode&1?(ht=(H=ht)||te,Jt(t,e),ht=H):Jt(t,e),lr(e),s&8192){if(H=e.memoizedState!==null,(e.stateNode.isHidden=H)&&!te&&e.mode&1)for(he=e,te=e.child;te!==null;){for(ae=he=te;he!==null;){switch(ee=he,pe=ee.child,ee.tag){case 0:case 11:case 14:case 15:hi(4,ee,ee.return);break;case 1:la(ee,ee.return);var ge=ee.stateNode;if(typeof ge.componentWillUnmount=="function"){s=ee,n=ee.return;try{t=s,ge.props=t.memoizedProps,ge.state=t.memoizedState,ge.componentWillUnmount()}catch(ve){Xe(s,n,ve)}}break;case 5:la(ee,ee.return);break;case 22:if(ee.memoizedState!==null){Ip(ae);continue}}pe!==null?(pe.return=ee,he=pe):Ip(ae)}te=te.sibling}e:for(te=null,ae=e;;){if(ae.tag===5){if(te===null){te=ae;try{f=ae.stateNode,H?(h=f.style,typeof h.setProperty=="function"?h.setProperty("display","none","important"):h.display="none"):(C=ae.stateNode,L=ae.memoizedProps.style,S=L!=null&&L.hasOwnProperty("display")?L.display:null,C.style.display=nr("display",S))}catch(ve){Xe(e,e.return,ve)}}}else if(ae.tag===6){if(te===null)try{ae.stateNode.nodeValue=H?"":ae.memoizedProps}catch(ve){Xe(e,e.return,ve)}}else if((ae.tag!==22&&ae.tag!==23||ae.memoizedState===null||ae===e)&&ae.child!==null){ae.child.return=ae,ae=ae.child;continue}if(ae===e)break e;for(;ae.sibling===null;){if(ae.return===null||ae.return===e)break e;te===ae&&(te=null),ae=ae.return}te===ae&&(te=null),ae.sibling.return=ae.return,ae=ae.sibling}}break;case 19:Jt(t,e),lr(e),s&4&&bp(e);break;case 21:break;default:Jt(t,e),lr(e)}}function lr(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Np(n)){var s=n;break e}n=n.return}throw Error(i(160))}switch(s.tag){case 5:var f=s.stateNode;s.flags&32&&(dt(f,""),s.flags&=-33);var h=_p(e);Zc(e,h,f);break;case 3:case 4:var S=s.stateNode.containerInfo,C=_p(e);Hc(e,C,S);break;default:throw Error(i(161))}}catch(L){Xe(e,e.return,L)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function T2(e,t,n){he=e,Cp(e)}function Cp(e,t,n){for(var s=(e.mode&1)!==0;he!==null;){var f=he,h=f.child;if(f.tag===22&&s){var S=f.memoizedState!==null||Ds;if(!S){var C=f.alternate,L=C!==null&&C.memoizedState!==null||ht;C=Ds;var H=ht;if(Ds=S,(ht=L)&&!H)for(he=f;he!==null;)S=he,L=S.child,S.tag===22&&S.memoizedState!==null?Rp(f):L!==null?(L.return=S,he=L):Rp(f);for(;h!==null;)he=h,Cp(h),h=h.sibling;he=f,Ds=C,ht=H}Ep(e)}else f.subtreeFlags&8772&&h!==null?(h.return=f,he=h):Ep(e)}}function Ep(e){for(;he!==null;){var t=he;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ht||Fs(5,t);break;case 1:var s=t.stateNode;if(t.flags&4&&!ht)if(n===null)s.componentDidMount();else{var f=t.elementType===t.type?n.memoizedProps:Qt(t.type,n.memoizedProps);s.componentDidUpdate(f,n.memoizedState,s.__reactInternalSnapshotBeforeUpdate)}var h=t.updateQueue;h!==null&&Im(t,h,s);break;case 3:var S=t.updateQueue;if(S!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Im(t,S,n)}break;case 5:var C=t.stateNode;if(n===null&&t.flags&4){n=C;var L=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":L.autoFocus&&n.focus();break;case"img":L.src&&(n.src=L.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var H=t.alternate;if(H!==null){var te=H.memoizedState;if(te!==null){var ae=te.dehydrated;ae!==null&&Ga(ae)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(i(163))}ht||t.flags&512&&Uc(t)}catch(ee){Xe(t,t.return,ee)}}if(t===e){he=null;break}if(n=t.sibling,n!==null){n.return=t.return,he=n;break}he=t.return}}function Ip(e){for(;he!==null;){var t=he;if(t===e){he=null;break}var n=t.sibling;if(n!==null){n.return=t.return,he=n;break}he=t.return}}function Rp(e){for(;he!==null;){var t=he;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Fs(4,t)}catch(L){Xe(t,n,L)}break;case 1:var s=t.stateNode;if(typeof s.componentDidMount=="function"){var f=t.return;try{s.componentDidMount()}catch(L){Xe(t,f,L)}}var h=t.return;try{Uc(t)}catch(L){Xe(t,h,L)}break;case 5:var S=t.return;try{Uc(t)}catch(L){Xe(t,S,L)}}}catch(L){Xe(t,t.return,L)}if(t===e){he=null;break}var C=t.sibling;if(C!==null){C.return=t.return,he=C;break}he=t.return}}var O2=Math.ceil,qs=z.ReactCurrentDispatcher,Wc=z.ReactCurrentOwner,Ut=z.ReactCurrentBatchConfig,$e=0,it=null,tt=null,ut=0,Lt=0,ua=Vr(0),nt=0,gi=null,En=0,Bs=0,Gc=0,vi=null,bt=null,Vc=0,ca=1/0,Ar=null,Us=!1,Kc=null,en=null,Hs=!1,tn=null,Zs=0,yi=0,Yc=null,Ws=-1,Gs=0;function xt(){return $e&6?Re():Ws!==-1?Ws:Ws=Re()}function rn(e){return e.mode&1?$e&2&&ut!==0?ut&-ut:S2.transition!==null?(Gs===0&&(Gs=_f()),Gs):(e=Fe,e!==0||(e=window.event,e=e===void 0?16:Lf(e.type)),e):1}function er(e,t,n,s){if(50<yi)throw yi=0,Yc=null,Error(i(185));Ba(e,n,s),(!($e&2)||e!==it)&&(e===it&&(!($e&2)&&(Bs|=n),nt===4&&nn(e,ut)),At(e,s),n===1&&$e===0&&!(t.mode&1)&&(ca=Re()+500,ws&&Yr()))}function At(e,t){var n=e.callbackNode;Sv(e,t);var s=rs(e,e===it?ut:0);if(s===0)n!==null&&ie(n),e.callbackNode=null,e.callbackPriority=0;else if(t=s&-s,e.callbackPriority!==t){if(n!=null&&ie(n),t===1)e.tag===0?x2(Lp.bind(null,e)):vm(Lp.bind(null,e)),h2(function(){!($e&6)&&Yr()}),n=null;else{switch(kf(s)){case 1:n=Gt;break;case 4:n=yr;break;case 16:n=Dr;break;case 536870912:n=Sn;break;default:n=Dr}n=Fp(n,Pp.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Pp(e,t){if(Ws=-1,Gs=0,$e&6)throw Error(i(327));var n=e.callbackNode;if(da()&&e.callbackNode!==n)return null;var s=rs(e,e===it?ut:0);if(s===0)return null;if(s&30||s&e.expiredLanes||t)t=Vs(e,s);else{t=s;var f=$e;$e|=2;var h=Mp();(it!==e||ut!==t)&&(Ar=null,ca=Re()+500,Rn(e,t));do try{F2();break}catch(C){jp(e,C)}while(!0);pc(),qs.current=h,$e=f,tt!==null?t=0:(it=null,ut=0,t=nt)}if(t!==0){if(t===2&&(f=Ru(e),f!==0&&(s=f,t=Qc(e,f))),t===1)throw n=gi,Rn(e,0),nn(e,s),At(e,Re()),n;if(t===6)nn(e,s);else{if(f=e.current.alternate,!(s&30)&&!$2(f)&&(t=Vs(e,s),t===2&&(h=Ru(e),h!==0&&(s=h,t=Qc(e,h))),t===1))throw n=gi,Rn(e,0),nn(e,s),At(e,Re()),n;switch(e.finishedWork=f,e.finishedLanes=s,t){case 0:case 1:throw Error(i(345));case 2:Pn(e,bt,Ar);break;case 3:if(nn(e,s),(s&130023424)===s&&(t=Vc+500-Re(),10<t)){if(rs(e,0)!==0)break;if(f=e.suspendedLanes,(f&s)!==s){xt(),e.pingedLanes|=e.suspendedLanes&f;break}e.timeoutHandle=nc(Pn.bind(null,e,bt,Ar),t);break}Pn(e,bt,Ar);break;case 4:if(nn(e,s),(s&4194240)===s)break;for(t=e.eventTimes,f=-1;0<s;){var S=31-Vt(s);h=1<<S,S=t[S],S>f&&(f=S),s&=~h}if(s=f,s=Re()-s,s=(120>s?120:480>s?480:1080>s?1080:1920>s?1920:3e3>s?3e3:4320>s?4320:1960*O2(s/1960))-s,10<s){e.timeoutHandle=nc(Pn.bind(null,e,bt,Ar),s);break}Pn(e,bt,Ar);break;case 5:Pn(e,bt,Ar);break;default:throw Error(i(329))}}}return At(e,Re()),e.callbackNode===n?Pp.bind(null,e):null}function Qc(e,t){var n=vi;return e.current.memoizedState.isDehydrated&&(Rn(e,t).flags|=256),e=Vs(e,t),e!==2&&(t=bt,bt=n,t!==null&&Xc(t)),e}function Xc(e){bt===null?bt=e:bt.push.apply(bt,e)}function $2(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var s=0;s<n.length;s++){var f=n[s],h=f.getSnapshot;f=f.value;try{if(!Kt(h(),f))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function nn(e,t){for(t&=~Gc,t&=~Bs,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Vt(t),s=1<<n;e[n]=-1,t&=~s}}function Lp(e){if($e&6)throw Error(i(327));da();var t=rs(e,0);if(!(t&1))return At(e,Re()),null;var n=Vs(e,t);if(e.tag!==0&&n===2){var s=Ru(e);s!==0&&(t=s,n=Qc(e,s))}if(n===1)throw n=gi,Rn(e,0),nn(e,t),At(e,Re()),n;if(n===6)throw Error(i(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Pn(e,bt,Ar),At(e,Re()),null}function Jc(e,t){var n=$e;$e|=1;try{return e(t)}finally{$e=n,$e===0&&(ca=Re()+500,ws&&Yr())}}function In(e){tn!==null&&tn.tag===0&&!($e&6)&&da();var t=$e;$e|=1;var n=Ut.transition,s=Fe;try{if(Ut.transition=null,Fe=1,e)return e()}finally{Fe=s,Ut.transition=n,$e=t,!($e&6)&&Yr()}}function ed(){Lt=ua.current,Ze(ua)}function Rn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,p2(n)),tt!==null)for(n=tt.return;n!==null;){var s=n;switch(uc(s),s.tag){case 1:s=s.type.childContextTypes,s!=null&&xs();break;case 3:sa(),Ze(Nt),Ze(ft),Nc();break;case 5:Sc(s);break;case 4:sa();break;case 13:Ze(Ye);break;case 19:Ze(Ye);break;case 10:hc(s.type._context);break;case 22:case 23:ed()}n=n.return}if(it=e,tt=e=an(e.current,null),ut=Lt=t,nt=0,gi=null,Gc=Bs=En=0,bt=vi=null,bn!==null){for(t=0;t<bn.length;t++)if(n=bn[t],s=n.interleaved,s!==null){n.interleaved=null;var f=s.next,h=n.pending;if(h!==null){var S=h.next;h.next=f,s.next=S}n.pending=s}bn=null}return e}function jp(e,t){do{var n=tt;try{if(pc(),Ps.current=zs,Ls){for(var s=Qe.memoizedState;s!==null;){var f=s.queue;f!==null&&(f.pending=null),s=s.next}Ls=!1}if(Cn=0,at=rt=Qe=null,ci=!1,di=0,Wc.current=null,n===null||n.return===null){nt=1,gi=t,tt=null;break}e:{var h=e,S=n.return,C=n,L=t;if(t=ut,C.flags|=32768,L!==null&&typeof L=="object"&&typeof L.then=="function"){var H=L,te=C,ae=te.tag;if(!(te.mode&1)&&(ae===0||ae===11||ae===15)){var ee=te.alternate;ee?(te.updateQueue=ee.updateQueue,te.memoizedState=ee.memoizedState,te.lanes=ee.lanes):(te.updateQueue=null,te.memoizedState=null)}var pe=ap(S);if(pe!==null){pe.flags&=-257,ip(pe,S,C,h,t),pe.mode&1&&np(h,H,t),t=pe,L=H;var ge=t.updateQueue;if(ge===null){var ve=new Set;ve.add(L),t.updateQueue=ve}else ge.add(L);break e}else{if(!(t&1)){np(h,H,t),td();break e}L=Error(i(426))}}else if(Ge&&C.mode&1){var Je=ap(S);if(Je!==null){!(Je.flags&65536)&&(Je.flags|=256),ip(Je,S,C,h,t),fc(oa(L,C));break e}}h=L=oa(L,C),nt!==4&&(nt=2),vi===null?vi=[h]:vi.push(h),h=S;do{switch(h.tag){case 3:h.flags|=65536,t&=-t,h.lanes|=t;var $=tp(h,L,t);Em(h,$);break e;case 1:C=L;var M=h.type,D=h.stateNode;if(!(h.flags&128)&&(typeof M.getDerivedStateFromError=="function"||D!==null&&typeof D.componentDidCatch=="function"&&(en===null||!en.has(D)))){h.flags|=65536,t&=-t,h.lanes|=t;var fe=rp(h,C,t);Em(h,fe);break e}}h=h.return}while(h!==null)}Tp(n)}catch(ye){t=ye,tt===n&&n!==null&&(tt=n=n.return);continue}break}while(!0)}function Mp(){var e=qs.current;return qs.current=zs,e===null?zs:e}function td(){(nt===0||nt===3||nt===2)&&(nt=4),it===null||!(En&268435455)&&!(Bs&268435455)||nn(it,ut)}function Vs(e,t){var n=$e;$e|=2;var s=Mp();(it!==e||ut!==t)&&(Ar=null,Rn(e,t));do try{D2();break}catch(f){jp(e,f)}while(!0);if(pc(),$e=n,qs.current=s,tt!==null)throw Error(i(261));return it=null,ut=0,nt}function D2(){for(;tt!==null;)zp(tt)}function F2(){for(;tt!==null&&!Eu();)zp(tt)}function zp(e){var t=Dp(e.alternate,e,Lt);e.memoizedProps=e.pendingProps,t===null?Tp(e):tt=t,Wc.current=null}function Tp(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=j2(n,t),n!==null){n.flags&=32767,tt=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{nt=6,tt=null;return}}else if(n=L2(n,t,Lt),n!==null){tt=n;return}if(t=t.sibling,t!==null){tt=t;return}tt=t=e}while(t!==null);nt===0&&(nt=5)}function Pn(e,t,n){var s=Fe,f=Ut.transition;try{Ut.transition=null,Fe=1,q2(e,t,n,s)}finally{Ut.transition=f,Fe=s}return null}function q2(e,t,n,s){do da();while(tn!==null);if($e&6)throw Error(i(327));n=e.finishedWork;var f=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(i(177));e.callbackNode=null,e.callbackPriority=0;var h=n.lanes|n.childLanes;if(wv(e,h),e===it&&(tt=it=null,ut=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Hs||(Hs=!0,Fp(Dr,function(){return da(),null})),h=(n.flags&15990)!==0,n.subtreeFlags&15990||h){h=Ut.transition,Ut.transition=null;var S=Fe;Fe=1;var C=$e;$e|=4,Wc.current=null,z2(e,n),Ap(n,e),o2(tc),is=!!ec,tc=ec=null,e.current=n,T2(n),Iu(),$e=C,Fe=S,Ut.transition=h}else e.current=n;if(Hs&&(Hs=!1,tn=e,Zs=f),h=e.pendingLanes,h===0&&(en=null),hv(n.stateNode),At(e,Re()),t!==null)for(s=e.onRecoverableError,n=0;n<t.length;n++)f=t[n],s(f.value,{componentStack:f.stack,digest:f.digest});if(Us)throw Us=!1,e=Kc,Kc=null,e;return Zs&1&&e.tag!==0&&da(),h=e.pendingLanes,h&1?e===Yc?yi++:(yi=0,Yc=e):yi=0,Yr(),null}function da(){if(tn!==null){var e=kf(Zs),t=Ut.transition,n=Fe;try{if(Ut.transition=null,Fe=16>e?16:e,tn===null)var s=!1;else{if(e=tn,tn=null,Zs=0,$e&6)throw Error(i(331));var f=$e;for($e|=4,he=e.current;he!==null;){var h=he,S=h.child;if(he.flags&16){var C=h.deletions;if(C!==null){for(var L=0;L<C.length;L++){var H=C[L];for(he=H;he!==null;){var te=he;switch(te.tag){case 0:case 11:case 15:hi(8,te,h)}var ae=te.child;if(ae!==null)ae.return=te,he=ae;else for(;he!==null;){te=he;var ee=te.sibling,pe=te.return;if(wp(te),te===H){he=null;break}if(ee!==null){ee.return=pe,he=ee;break}he=pe}}}var ge=h.alternate;if(ge!==null){var ve=ge.child;if(ve!==null){ge.child=null;do{var Je=ve.sibling;ve.sibling=null,ve=Je}while(ve!==null)}}he=h}}if(h.subtreeFlags&2064&&S!==null)S.return=h,he=S;else e:for(;he!==null;){if(h=he,h.flags&2048)switch(h.tag){case 0:case 11:case 15:hi(9,h,h.return)}var $=h.sibling;if($!==null){$.return=h.return,he=$;break e}he=h.return}}var M=e.current;for(he=M;he!==null;){S=he;var D=S.child;if(S.subtreeFlags&2064&&D!==null)D.return=S,he=D;else e:for(S=M;he!==null;){if(C=he,C.flags&2048)try{switch(C.tag){case 0:case 11:case 15:Fs(9,C)}}catch(ye){Xe(C,C.return,ye)}if(C===S){he=null;break e}var fe=C.sibling;if(fe!==null){fe.return=C.return,he=fe;break e}he=C.return}}if($e=f,Yr(),ar&&typeof ar.onPostCommitFiberRoot=="function")try{ar.onPostCommitFiberRoot(Ji,e)}catch{}s=!0}return s}finally{Fe=n,Ut.transition=t}}return!1}function Op(e,t,n){t=oa(n,t),t=tp(e,t,1),e=Xr(e,t,1),t=xt(),e!==null&&(Ba(e,1,t),At(e,t))}function Xe(e,t,n){if(e.tag===3)Op(e,e,n);else for(;t!==null;){if(t.tag===3){Op(t,e,n);break}else if(t.tag===1){var s=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(en===null||!en.has(s))){e=oa(n,e),e=rp(t,e,1),t=Xr(t,e,1),e=xt(),t!==null&&(Ba(t,1,e),At(t,e));break}}t=t.return}}function B2(e,t,n){var s=e.pingCache;s!==null&&s.delete(t),t=xt(),e.pingedLanes|=e.suspendedLanes&n,it===e&&(ut&n)===n&&(nt===4||nt===3&&(ut&130023424)===ut&&500>Re()-Vc?Rn(e,0):Gc|=n),At(e,t)}function $p(e,t){t===0&&(e.mode&1?(t=ts,ts<<=1,!(ts&130023424)&&(ts=4194304)):t=1);var n=xt();e=_r(e,t),e!==null&&(Ba(e,t,n),At(e,n))}function U2(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),$p(e,n)}function H2(e,t){var n=0;switch(e.tag){case 13:var s=e.stateNode,f=e.memoizedState;f!==null&&(n=f.retryLane);break;case 19:s=e.stateNode;break;default:throw Error(i(314))}s!==null&&s.delete(t),$p(e,n)}var Dp;Dp=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Nt.current)kt=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return kt=!1,P2(e,t,n);kt=!!(e.flags&131072)}else kt=!1,Ge&&t.flags&1048576&&ym(t,_s,t.index);switch(t.lanes=0,t.tag){case 2:var s=t.type;$s(e,t),e=t.pendingProps;var f=Jn(t,ft.current);ia(t,n),f=bc(null,t,s,e,f,n);var h=Ac();return t.flags|=1,typeof f=="object"&&f!==null&&typeof f.render=="function"&&f.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,_t(s)?(h=!0,Ss(t)):h=!1,t.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,yc(t),f.updater=Ts,t.stateNode=f,f._reactInternals=t,Lc(t,s,e,n),t=Tc(null,t,s,!0,h,n)):(t.tag=0,Ge&&h&&lc(t),yt(null,t,f,n),t=t.child),t;case 16:s=t.elementType;e:{switch($s(e,t),e=t.pendingProps,f=s._init,s=f(s._payload),t.type=s,f=t.tag=W2(s),e=Qt(s,e),f){case 0:t=zc(null,t,s,e,n);break e;case 1:t=dp(null,t,s,e,n);break e;case 11:t=sp(null,t,s,e,n);break e;case 14:t=op(null,t,s,Qt(s.type,e),n);break e}throw Error(i(306,s,""))}return t;case 0:return s=t.type,f=t.pendingProps,f=t.elementType===s?f:Qt(s,f),zc(e,t,s,f,n);case 1:return s=t.type,f=t.pendingProps,f=t.elementType===s?f:Qt(s,f),dp(e,t,s,f,n);case 3:e:{if(fp(t),e===null)throw Error(i(387));s=t.pendingProps,h=t.memoizedState,f=h.element,Cm(e,t),Is(t,s,null,n);var S=t.memoizedState;if(s=S.element,h.isDehydrated)if(h={element:s,isDehydrated:!1,cache:S.cache,pendingSuspenseBoundaries:S.pendingSuspenseBoundaries,transitions:S.transitions},t.updateQueue.baseState=h,t.memoizedState=h,t.flags&256){f=oa(Error(i(423)),t),t=mp(e,t,s,n,f);break e}else if(s!==f){f=oa(Error(i(424)),t),t=mp(e,t,s,n,f);break e}else for(Pt=Gr(t.stateNode.containerInfo.firstChild),Rt=t,Ge=!0,Yt=null,n=bm(t,null,s,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ra(),s===f){t=br(e,t,n);break e}yt(e,t,s,n)}t=t.child}return t;case 5:return Rm(t),e===null&&dc(t),s=t.type,f=t.pendingProps,h=e!==null?e.memoizedProps:null,S=f.children,rc(s,f)?S=null:h!==null&&rc(s,h)&&(t.flags|=32),cp(e,t),yt(e,t,S,n),t.child;case 6:return e===null&&dc(t),null;case 13:return pp(e,t,n);case 4:return xc(t,t.stateNode.containerInfo),s=t.pendingProps,e===null?t.child=na(t,null,s,n):yt(e,t,s,n),t.child;case 11:return s=t.type,f=t.pendingProps,f=t.elementType===s?f:Qt(s,f),sp(e,t,s,f,n);case 7:return yt(e,t,t.pendingProps,n),t.child;case 8:return yt(e,t,t.pendingProps.children,n),t.child;case 12:return yt(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(s=t.type._context,f=t.pendingProps,h=t.memoizedProps,S=f.value,Ue(As,s._currentValue),s._currentValue=S,h!==null)if(Kt(h.value,S)){if(h.children===f.children&&!Nt.current){t=br(e,t,n);break e}}else for(h=t.child,h!==null&&(h.return=t);h!==null;){var C=h.dependencies;if(C!==null){S=h.child;for(var L=C.firstContext;L!==null;){if(L.context===s){if(h.tag===1){L=kr(-1,n&-n),L.tag=2;var H=h.updateQueue;if(H!==null){H=H.shared;var te=H.pending;te===null?L.next=L:(L.next=te.next,te.next=L),H.pending=L}}h.lanes|=n,L=h.alternate,L!==null&&(L.lanes|=n),gc(h.return,n,t),C.lanes|=n;break}L=L.next}}else if(h.tag===10)S=h.type===t.type?null:h.child;else if(h.tag===18){if(S=h.return,S===null)throw Error(i(341));S.lanes|=n,C=S.alternate,C!==null&&(C.lanes|=n),gc(S,n,t),S=h.sibling}else S=h.child;if(S!==null)S.return=h;else for(S=h;S!==null;){if(S===t){S=null;break}if(h=S.sibling,h!==null){h.return=S.return,S=h;break}S=S.return}h=S}yt(e,t,f.children,n),t=t.child}return t;case 9:return f=t.type,s=t.pendingProps.children,ia(t,n),f=qt(f),s=s(f),t.flags|=1,yt(e,t,s,n),t.child;case 14:return s=t.type,f=Qt(s,t.pendingProps),f=Qt(s.type,f),op(e,t,s,f,n);case 15:return lp(e,t,t.type,t.pendingProps,n);case 17:return s=t.type,f=t.pendingProps,f=t.elementType===s?f:Qt(s,f),$s(e,t),t.tag=1,_t(s)?(e=!0,Ss(t)):e=!1,ia(t,n),Jm(t,s,f),Lc(t,s,f,n),Tc(null,t,s,!0,e,n);case 19:return gp(e,t,n);case 22:return up(e,t,n)}throw Error(i(156,t.tag))};function Fp(e,t){return vr(e,t)}function Z2(e,t,n,s){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ht(e,t,n,s){return new Z2(e,t,n,s)}function rd(e){return e=e.prototype,!(!e||!e.isReactComponent)}function W2(e){if(typeof e=="function")return rd(e)?1:0;if(e!=null){if(e=e.$$typeof,e===me)return 11;if(e===G)return 14}return 2}function an(e,t){var n=e.alternate;return n===null?(n=Ht(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Ks(e,t,n,s,f,h){var S=2;if(s=e,typeof e=="function")rd(e)&&(S=1);else if(typeof e=="string")S=5;else e:switch(e){case F:return Ln(n.children,f,h,t);case U:S=8,f|=8;break;case Q:return e=Ht(12,n,t,f|2),e.elementType=Q,e.lanes=h,e;case ce:return e=Ht(13,n,t,f),e.elementType=ce,e.lanes=h,e;case ue:return e=Ht(19,n,t,f),e.elementType=ue,e.lanes=h,e;case W:return Ys(n,f,h,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case T:S=10;break e;case J:S=9;break e;case me:S=11;break e;case G:S=14;break e;case oe:S=16,s=null;break e}throw Error(i(130,e==null?e:typeof e,""))}return t=Ht(S,n,t,f),t.elementType=e,t.type=s,t.lanes=h,t}function Ln(e,t,n,s){return e=Ht(7,e,s,t),e.lanes=n,e}function Ys(e,t,n,s){return e=Ht(22,e,s,t),e.elementType=W,e.lanes=n,e.stateNode={isHidden:!1},e}function nd(e,t,n){return e=Ht(6,e,null,t),e.lanes=n,e}function ad(e,t,n){return t=Ht(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function G2(e,t,n,s,f){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Pu(0),this.expirationTimes=Pu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Pu(0),this.identifierPrefix=s,this.onRecoverableError=f,this.mutableSourceEagerHydrationData=null}function id(e,t,n,s,f,h,S,C,L){return e=new G2(e,t,n,C,L),t===1?(t=1,h===!0&&(t|=8)):t=0,h=Ht(3,null,null,t),e.current=h,h.stateNode=e,h.memoizedState={element:s,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},yc(h),e}function V2(e,t,n){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Z,key:s==null?null:""+s,children:e,containerInfo:t,implementation:n}}function qp(e){if(!e)return Kr;e=e._reactInternals;e:{if(gr(e)!==e||e.tag!==1)throw Error(i(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(_t(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(i(171))}if(e.tag===1){var n=e.type;if(_t(n))return hm(e,n,t)}return t}function Bp(e,t,n,s,f,h,S,C,L){return e=id(n,s,!0,e,f,h,S,C,L),e.context=qp(null),n=e.current,s=xt(),f=rn(n),h=kr(s,f),h.callback=t??null,Xr(n,h,f),e.current.lanes=f,Ba(e,f,s),At(e,s),e}function Qs(e,t,n,s){var f=t.current,h=xt(),S=rn(f);return n=qp(n),t.context===null?t.context=n:t.pendingContext=n,t=kr(h,S),t.payload={element:e},s=s===void 0?null:s,s!==null&&(t.callback=s),e=Xr(f,t,S),e!==null&&(er(e,f,S,h),Es(e,f,S)),S}function Xs(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Up(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function sd(e,t){Up(e,t),(e=e.alternate)&&Up(e,t)}function K2(){return null}var Hp=typeof reportError=="function"?reportError:function(e){console.error(e)};function od(e){this._internalRoot=e}Js.prototype.render=od.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));Qs(e,t,null,null)},Js.prototype.unmount=od.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;In(function(){Qs(null,e,null,null)}),t[xr]=null}};function Js(e){this._internalRoot=e}Js.prototype.unstable_scheduleHydration=function(e){if(e){var t=Cf();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Hr.length&&t!==0&&t<Hr[n].priority;n++);Hr.splice(n,0,e),n===0&&Rf(e)}};function ld(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function eo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Zp(){}function Y2(e,t,n,s,f){if(f){if(typeof s=="function"){var h=s;s=function(){var H=Xs(S);h.call(H)}}var S=Bp(t,s,e,0,null,!1,!1,"",Zp);return e._reactRootContainer=S,e[xr]=S.current,ri(e.nodeType===8?e.parentNode:e),In(),S}for(;f=e.lastChild;)e.removeChild(f);if(typeof s=="function"){var C=s;s=function(){var H=Xs(L);C.call(H)}}var L=id(e,0,!1,null,null,!1,!1,"",Zp);return e._reactRootContainer=L,e[xr]=L.current,ri(e.nodeType===8?e.parentNode:e),In(function(){Qs(t,L,n,s)}),L}function to(e,t,n,s,f){var h=n._reactRootContainer;if(h){var S=h;if(typeof f=="function"){var C=f;f=function(){var L=Xs(S);C.call(L)}}Qs(t,S,e,f)}else S=Y2(n,t,e,f,s);return Xs(S)}bf=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=qa(t.pendingLanes);n!==0&&(Lu(t,n|1),At(t,Re()),!($e&6)&&(ca=Re()+500,Yr()))}break;case 13:In(function(){var s=_r(e,1);if(s!==null){var f=xt();er(s,e,1,f)}}),sd(e,1)}},ju=function(e){if(e.tag===13){var t=_r(e,134217728);if(t!==null){var n=xt();er(t,e,134217728,n)}sd(e,134217728)}},Af=function(e){if(e.tag===13){var t=rn(e),n=_r(e,t);if(n!==null){var s=xt();er(n,e,t,s)}sd(e,t)}},Cf=function(){return Fe},Ef=function(e,t){var n=Fe;try{return Fe=e,t()}finally{Fe=n}},Oa=function(e,t,n){switch(t){case"input":if(hn(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var s=n[t];if(s!==e&&s.form===e.form){var f=ys(s);if(!f)throw Error(i(90));$n(s),hn(s,f)}}}break;case"textarea":_e(e,n);break;case"select":t=n.value,t!=null&&re(e,!!n.multiple,t,!1)}},Gi=Jc,Vi=In;var Q2={usingClientEntryPoint:!1,Events:[ii,Qn,ys,Zi,Wi,Jc]},xi={findFiberByHostInstance:wn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},X2={bundleType:xi.bundleType,version:xi.version,rendererPackageName:xi.rendererPackageName,rendererConfig:xi.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:z.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Xi(e),e===null?null:e.stateNode},findFiberByHostInstance:xi.findFiberByHostInstance||K2,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ro=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ro.isDisabled&&ro.supportsFiber)try{Ji=ro.inject(X2),ar=ro}catch{}}return Ct.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Q2,Ct.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ld(t))throw Error(i(200));return V2(e,t,null,n)},Ct.createRoot=function(e,t){if(!ld(e))throw Error(i(299));var n=!1,s="",f=Hp;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(f=t.onRecoverableError)),t=id(e,1,!1,null,null,n,!1,s,f),e[xr]=t.current,ri(e.nodeType===8?e.parentNode:e),new od(t)},Ct.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(i(188)):(e=Object.keys(e).join(","),Error(i(268,e)));return e=Xi(t),e=e===null?null:e.stateNode,e},Ct.flushSync=function(e){return In(e)},Ct.hydrate=function(e,t,n){if(!eo(t))throw Error(i(200));return to(null,e,t,!0,n)},Ct.hydrateRoot=function(e,t,n){if(!ld(e))throw Error(i(405));var s=n!=null&&n.hydratedSources||null,f=!1,h="",S=Hp;if(n!=null&&(n.unstable_strictMode===!0&&(f=!0),n.identifierPrefix!==void 0&&(h=n.identifierPrefix),n.onRecoverableError!==void 0&&(S=n.onRecoverableError)),t=Bp(t,null,e,1,n??null,f,!1,h,S),e[xr]=t.current,ri(e),s)for(e=0;e<s.length;e++)n=s[e],f=n._getVersion,f=f(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,f]:t.mutableSourceEagerHydrationData.push(n,f);return new Js(t)},Ct.render=function(e,t,n){if(!eo(t))throw Error(i(200));return to(null,e,t,!1,n)},Ct.unmountComponentAtNode=function(e){if(!eo(e))throw Error(i(40));return e._reactRootContainer?(In(function(){to(null,null,e,!1,function(){e._reactRootContainer=null,e[xr]=null})}),!0):!1},Ct.unstable_batchedUpdates=Jc,Ct.unstable_renderSubtreeIntoContainer=function(e,t,n,s){if(!eo(n))throw Error(i(200));if(e==null||e._reactInternals===void 0)throw Error(i(38));return to(e,t,n,!1,s)},Ct.version="18.3.1-next-f1338f8080-20240426",Ct}var Jp;function sy(){if(Jp)return dd.exports;Jp=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(a){console.error(a)}}return r(),dd.exports=iy(),dd.exports}var e0;function oy(){if(e0)return no;e0=1;var r=sy();return no.createRoot=r.createRoot,no.hydrateRoot=r.hydrateRoot,no}var ly=oy(),wi={},t0;function uy(){if(t0)return wi;t0=1,Object.defineProperty(wi,"__esModule",{value:!0}),wi.parse=d,wi.serialize=v;const r=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,a=/^[\u0021-\u003A\u003C-\u007E]*$/,i=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,c=/^[\u0020-\u003A\u003D-\u007E]*$/,l=Object.prototype.toString,u=(()=>{const g=function(){};return g.prototype=Object.create(null),g})();function d(g,E){const b=new u,w=g.length;if(w<2)return b;const N=(E==null?void 0:E.decode)||y;let _=0;do{const k=g.indexOf("=",_);if(k===-1)break;const I=g.indexOf(";",_),z=I===-1?w:I;if(k>z){_=g.lastIndexOf(";",k-1)+1;continue}const O=p(g,_,k),Z=m(g,k,O),F=g.slice(O,Z);if(b[F]===void 0){let U=p(g,k+1,z),Q=m(g,z,U);const T=N(g.slice(U,Q));b[F]=T}_=z+1}while(_<w);return b}function p(g,E,b){do{const w=g.charCodeAt(E);if(w!==32&&w!==9)return E}while(++E<b);return b}function m(g,E,b){for(;E>b;){const w=g.charCodeAt(--E);if(w!==32&&w!==9)return E+1}return b}function v(g,E,b){const w=(b==null?void 0:b.encode)||encodeURIComponent;if(!r.test(g))throw new TypeError(`argument name is invalid: ${g}`);const N=w(E);if(!a.test(N))throw new TypeError(`argument val is invalid: ${E}`);let _=g+"="+N;if(!b)return _;if(b.maxAge!==void 0){if(!Number.isInteger(b.maxAge))throw new TypeError(`option maxAge is invalid: ${b.maxAge}`);_+="; Max-Age="+b.maxAge}if(b.domain){if(!i.test(b.domain))throw new TypeError(`option domain is invalid: ${b.domain}`);_+="; Domain="+b.domain}if(b.path){if(!c.test(b.path))throw new TypeError(`option path is invalid: ${b.path}`);_+="; Path="+b.path}if(b.expires){if(!x(b.expires)||!Number.isFinite(b.expires.valueOf()))throw new TypeError(`option expires is invalid: ${b.expires}`);_+="; Expires="+b.expires.toUTCString()}if(b.httpOnly&&(_+="; HttpOnly"),b.secure&&(_+="; Secure"),b.partitioned&&(_+="; Partitioned"),b.priority)switch(typeof b.priority=="string"?b.priority.toLowerCase():void 0){case"low":_+="; Priority=Low";break;case"medium":_+="; Priority=Medium";break;case"high":_+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${b.priority}`)}if(b.sameSite)switch(typeof b.sameSite=="string"?b.sameSite.toLowerCase():b.sameSite){case!0:case"strict":_+="; SameSite=Strict";break;case"lax":_+="; SameSite=Lax";break;case"none":_+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${b.sameSite}`)}return _}function y(g){if(g.indexOf("%")===-1)return g;try{return decodeURIComponent(g)}catch{return g}}function x(g){return l.call(g)==="[object Date]"}return wi}uy();/**
 * react-router v7.0.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var r0="popstate";function cy(r={}){function a(c,l){let{pathname:u,search:d,hash:p}=c.location;return Id("",{pathname:u,search:d,hash:p},l.state&&l.state.usr||null,l.state&&l.state.key||"default")}function i(c,l){return typeof l=="string"?l:Ii(l)}return fy(a,i,null,r)}function Ve(r,a){if(r===!1||r===null||typeof r>"u")throw new Error(a)}function tr(r,a){if(!r){typeof console<"u"&&console.warn(a);try{throw new Error(a)}catch{}}}function dy(){return Math.random().toString(36).substring(2,10)}function n0(r,a){return{usr:r.state,key:r.key,idx:a}}function Id(r,a,i=null,c){return{pathname:typeof r=="string"?r:r.pathname,search:"",hash:"",...typeof a=="string"?Ra(a):a,state:i,key:a&&a.key||c||dy()}}function Ii({pathname:r="/",search:a="",hash:i=""}){return a&&a!=="?"&&(r+=a.charAt(0)==="?"?a:"?"+a),i&&i!=="#"&&(r+=i.charAt(0)==="#"?i:"#"+i),r}function Ra(r){let a={};if(r){let i=r.indexOf("#");i>=0&&(a.hash=r.substring(i),r=r.substring(0,i));let c=r.indexOf("?");c>=0&&(a.search=r.substring(c),r=r.substring(0,c)),r&&(a.pathname=r)}return a}function fy(r,a,i,c={}){let{window:l=document.defaultView,v5Compat:u=!1}=c,d=l.history,p="POP",m=null,v=y();v==null&&(v=0,d.replaceState({...d.state,idx:v},""));function y(){return(d.state||{idx:null}).idx}function x(){p="POP";let N=y(),_=N==null?null:N-v;v=N,m&&m({action:p,location:w.location,delta:_})}function g(N,_){p="PUSH";let k=Id(w.location,N,_);v=y()+1;let I=n0(k,v),z=w.createHref(k);try{d.pushState(I,"",z)}catch(O){if(O instanceof DOMException&&O.name==="DataCloneError")throw O;l.location.assign(z)}u&&m&&m({action:p,location:w.location,delta:1})}function E(N,_){p="REPLACE";let k=Id(w.location,N,_);v=y();let I=n0(k,v),z=w.createHref(k);d.replaceState(I,"",z),u&&m&&m({action:p,location:w.location,delta:0})}function b(N){let _=l.location.origin!=="null"?l.location.origin:l.location.href,k=typeof N=="string"?N:Ii(N);return k=k.replace(/ $/,"%20"),Ve(_,`No window.location.(origin|href) available to create URL for href: ${k}`),new URL(k,_)}let w={get action(){return p},get location(){return r(l,d)},listen(N){if(m)throw new Error("A history only accepts one active listener");return l.addEventListener(r0,x),m=N,()=>{l.removeEventListener(r0,x),m=null}},createHref(N){return a(l,N)},createURL:b,encodeLocation(N){let _=b(N);return{pathname:_.pathname,search:_.search,hash:_.hash}},push:g,replace:E,go(N){return d.go(N)}};return w}function H1(r,a,i="/"){return my(r,a,i,!1)}function my(r,a,i,c){let l=typeof a=="string"?Ra(a):a,u=un(l.pathname||"/",i);if(u==null)return null;let d=Z1(r);py(d);let p=null;for(let m=0;p==null&&m<d.length;++m){let v=by(u);p=_y(d[m],v,c)}return p}function Z1(r,a=[],i=[],c=""){let l=(u,d,p)=>{let m={relativePath:p===void 0?u.path||"":p,caseSensitive:u.caseSensitive===!0,childrenIndex:d,route:u};m.relativePath.startsWith("/")&&(Ve(m.relativePath.startsWith(c),`Absolute route path "${m.relativePath}" nested under path "${c}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),m.relativePath=m.relativePath.slice(c.length));let v=Ir([c,m.relativePath]),y=i.concat(m);u.children&&u.children.length>0&&(Ve(u.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${v}".`),Z1(u.children,a,y,v)),!(u.path==null&&!u.index)&&a.push({path:v,score:wy(v,u.index),routesMeta:y})};return r.forEach((u,d)=>{var p;if(u.path===""||!((p=u.path)!=null&&p.includes("?")))l(u,d);else for(let m of W1(u.path))l(u,d,m)}),a}function W1(r){let a=r.split("/");if(a.length===0)return[];let[i,...c]=a,l=i.endsWith("?"),u=i.replace(/\?$/,"");if(c.length===0)return l?[u,""]:[u];let d=W1(c.join("/")),p=[];return p.push(...d.map(m=>m===""?u:[u,m].join("/"))),l&&p.push(...d),p.map(m=>r.startsWith("/")&&m===""?"/":m)}function py(r){r.sort((a,i)=>a.score!==i.score?i.score-a.score:Ny(a.routesMeta.map(c=>c.childrenIndex),i.routesMeta.map(c=>c.childrenIndex)))}var hy=/^:[\w-]+$/,gy=3,vy=2,yy=1,xy=10,Sy=-2,a0=r=>r==="*";function wy(r,a){let i=r.split("/"),c=i.length;return i.some(a0)&&(c+=Sy),a&&(c+=vy),i.filter(l=>!a0(l)).reduce((l,u)=>l+(hy.test(u)?gy:u===""?yy:xy),c)}function Ny(r,a){return r.length===a.length&&r.slice(0,-1).every((c,l)=>c===a[l])?r[r.length-1]-a[a.length-1]:0}function _y(r,a,i=!1){let{routesMeta:c}=r,l={},u="/",d=[];for(let p=0;p<c.length;++p){let m=c[p],v=p===c.length-1,y=u==="/"?a:a.slice(u.length)||"/",x=nu({path:m.relativePath,caseSensitive:m.caseSensitive,end:v},y),g=m.route;if(!x&&v&&i&&!c[c.length-1].route.index&&(x=nu({path:m.relativePath,caseSensitive:m.caseSensitive,end:!1},y)),!x)return null;Object.assign(l,x.params),d.push({params:l,pathname:Ir([u,x.pathname]),pathnameBase:Iy(Ir([u,x.pathnameBase])),route:g}),x.pathnameBase!=="/"&&(u=Ir([u,x.pathnameBase]))}return d}function nu(r,a){typeof r=="string"&&(r={path:r,caseSensitive:!1,end:!0});let[i,c]=ky(r.path,r.caseSensitive,r.end),l=a.match(i);if(!l)return null;let u=l[0],d=u.replace(/(.)\/+$/,"$1"),p=l.slice(1);return{params:c.reduce((v,{paramName:y,isOptional:x},g)=>{if(y==="*"){let b=p[g]||"";d=u.slice(0,u.length-b.length).replace(/(.)\/+$/,"$1")}const E=p[g];return x&&!E?v[y]=void 0:v[y]=(E||"").replace(/%2F/g,"/"),v},{}),pathname:u,pathnameBase:d,pattern:r}}function ky(r,a=!1,i=!0){tr(r==="*"||!r.endsWith("*")||r.endsWith("/*"),`Route path "${r}" will be treated as if it were "${r.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${r.replace(/\*$/,"/*")}".`);let c=[],l="^"+r.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(d,p,m)=>(c.push({paramName:p,isOptional:m!=null}),m?"/?([^\\/]+)?":"/([^\\/]+)"));return r.endsWith("*")?(c.push({paramName:"*"}),l+=r==="*"||r==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):i?l+="\\/*$":r!==""&&r!=="/"&&(l+="(?:(?=\\/|$))"),[new RegExp(l,a?void 0:"i"),c]}function by(r){try{return r.split("/").map(a=>decodeURIComponent(a).replace(/\//g,"%2F")).join("/")}catch(a){return tr(!1,`The URL path "${r}" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`),r}}function un(r,a){if(a==="/")return r;if(!r.toLowerCase().startsWith(a.toLowerCase()))return null;let i=a.endsWith("/")?a.length-1:a.length,c=r.charAt(i);return c&&c!=="/"?null:r.slice(i)||"/"}function Ay(r,a="/"){let{pathname:i,search:c="",hash:l=""}=typeof r=="string"?Ra(r):r;return{pathname:i?i.startsWith("/")?i:Cy(i,a):a,search:Ry(c),hash:Py(l)}}function Cy(r,a){let i=a.replace(/\/+$/,"").split("/");return r.split("/").forEach(l=>{l===".."?i.length>1&&i.pop():l!=="."&&i.push(l)}),i.length>1?i.join("/"):"/"}function pd(r,a,i,c){return`Cannot include a '${r}' character in a manually specified \`to.${a}\` field [${JSON.stringify(c)}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ey(r){return r.filter((a,i)=>i===0||a.route.path&&a.route.path.length>0)}function tf(r){let a=Ey(r);return a.map((i,c)=>c===a.length-1?i.pathname:i.pathnameBase)}function rf(r,a,i,c=!1){let l;typeof r=="string"?l=Ra(r):(l={...r},Ve(!l.pathname||!l.pathname.includes("?"),pd("?","pathname","search",l)),Ve(!l.pathname||!l.pathname.includes("#"),pd("#","pathname","hash",l)),Ve(!l.search||!l.search.includes("#"),pd("#","search","hash",l)));let u=r===""||l.pathname==="",d=u?"/":l.pathname,p;if(d==null)p=i;else{let x=a.length-1;if(!c&&d.startsWith("..")){let g=d.split("/");for(;g[0]==="..";)g.shift(),x-=1;l.pathname=g.join("/")}p=x>=0?a[x]:"/"}let m=Ay(l,p),v=d&&d!=="/"&&d.endsWith("/"),y=(u||d===".")&&i.endsWith("/");return!m.pathname.endsWith("/")&&(v||y)&&(m.pathname+="/"),m}var Ir=r=>r.join("/").replace(/\/\/+/g,"/"),Iy=r=>r.replace(/\/+$/,"").replace(/^\/*/,"/"),Ry=r=>!r||r==="?"?"":r.startsWith("?")?r:"?"+r,Py=r=>!r||r==="#"?"":r.startsWith("#")?r:"#"+r;function Ly(r){return r!=null&&typeof r.status=="number"&&typeof r.statusText=="string"&&typeof r.internal=="boolean"&&"data"in r}var G1=["POST","PUT","PATCH","DELETE"];new Set(G1);var jy=["GET",...G1];new Set(jy);var Pa=R.createContext(null);Pa.displayName="DataRouter";var mu=R.createContext(null);mu.displayName="DataRouterState";var V1=R.createContext({isTransitioning:!1});V1.displayName="ViewTransition";var My=R.createContext(new Map);My.displayName="Fetchers";var zy=R.createContext(null);zy.displayName="Await";var rr=R.createContext(null);rr.displayName="Navigation";var $i=R.createContext(null);$i.displayName="Location";var mr=R.createContext({outlet:null,matches:[],isDataRoute:!1});mr.displayName="Route";var nf=R.createContext(null);nf.displayName="RouteError";function Ty(r,{relative:a}={}){Ve(La(),"useHref() may be used only in the context of a <Router> component.");let{basename:i,navigator:c}=R.useContext(rr),{hash:l,pathname:u,search:d}=Di(r,{relative:a}),p=u;return i!=="/"&&(p=u==="/"?i:Ir([i,u])),c.createHref({pathname:p,search:d,hash:l})}function La(){return R.useContext($i)!=null}function Et(){return Ve(La(),"useLocation() may be used only in the context of a <Router> component."),R.useContext($i).location}var K1="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Y1(r){R.useContext(rr).static||R.useLayoutEffect(r)}function Mr(){let{isDataRoute:r}=R.useContext(mr);return r?Ky():Oy()}function Oy(){Ve(La(),"useNavigate() may be used only in the context of a <Router> component.");let r=R.useContext(Pa),{basename:a,navigator:i}=R.useContext(rr),{matches:c}=R.useContext(mr),{pathname:l}=Et(),u=JSON.stringify(tf(c)),d=R.useRef(!1);return Y1(()=>{d.current=!0}),R.useCallback((m,v={})=>{if(tr(d.current,K1),!d.current)return;if(typeof m=="number"){i.go(m);return}let y=rf(m,JSON.parse(u),l,v.relative==="path");r==null&&a!=="/"&&(y.pathname=y.pathname==="/"?a:Ir([a,y.pathname])),(v.replace?i.replace:i.push)(y,v.state,v)},[a,i,u,l,r])}R.createContext(null);function Di(r,{relative:a}={}){let{matches:i}=R.useContext(mr),{pathname:c}=Et(),l=JSON.stringify(tf(i));return R.useMemo(()=>rf(r,JSON.parse(l),c,a==="path"),[r,l,c,a])}function $y(r,a){return Q1(r,a)}function Q1(r,a,i,c){var _;Ve(La(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:l}=R.useContext(rr),{matches:u}=R.useContext(mr),d=u[u.length-1],p=d?d.params:{},m=d?d.pathname:"/",v=d?d.pathnameBase:"/",y=d&&d.route;{let k=y&&y.path||"";X1(m,!y||k.endsWith("*")||k.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${k}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${k}"> to <Route path="${k==="/"?"*":`${k}/*`}">.`)}let x=Et(),g;if(a){let k=typeof a=="string"?Ra(a):a;Ve(v==="/"||((_=k.pathname)==null?void 0:_.startsWith(v)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${v}" but pathname "${k.pathname}" was given in the \`location\` prop.`),g=k}else g=x;let E=g.pathname||"/",b=E;if(v!=="/"){let k=v.replace(/^\//,"").split("/");b="/"+E.replace(/^\//,"").split("/").slice(k.length).join("/")}let w=H1(r,{pathname:b});tr(y||w!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),tr(w==null||w[w.length-1].route.element!==void 0||w[w.length-1].route.Component!==void 0||w[w.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let N=Uy(w&&w.map(k=>Object.assign({},k,{params:Object.assign({},p,k.params),pathname:Ir([v,l.encodeLocation?l.encodeLocation(k.pathname).pathname:k.pathname]),pathnameBase:k.pathnameBase==="/"?v:Ir([v,l.encodeLocation?l.encodeLocation(k.pathnameBase).pathname:k.pathnameBase])})),u,i,c);return a&&N?R.createElement($i.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...g},navigationType:"POP"}},N):N}function Dy(){let r=Vy(),a=Ly(r)?`${r.status} ${r.statusText}`:r instanceof Error?r.message:JSON.stringify(r),i=r instanceof Error?r.stack:null,c="rgba(200,200,200, 0.5)",l={padding:"0.5rem",backgroundColor:c},u={padding:"2px 4px",backgroundColor:c},d=null;return console.error("Error handled by React Router default ErrorBoundary:",r),d=R.createElement(R.Fragment,null,R.createElement("p",null,"💿 Hey developer 👋"),R.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",R.createElement("code",{style:u},"ErrorBoundary")," or"," ",R.createElement("code",{style:u},"errorElement")," prop on your route.")),R.createElement(R.Fragment,null,R.createElement("h2",null,"Unexpected Application Error!"),R.createElement("h3",{style:{fontStyle:"italic"}},a),i?R.createElement("pre",{style:l},i):null,d)}var Fy=R.createElement(Dy,null),qy=class extends R.Component{constructor(r){super(r),this.state={location:r.location,revalidation:r.revalidation,error:r.error}}static getDerivedStateFromError(r){return{error:r}}static getDerivedStateFromProps(r,a){return a.location!==r.location||a.revalidation!=="idle"&&r.revalidation==="idle"?{error:r.error,location:r.location,revalidation:r.revalidation}:{error:r.error!==void 0?r.error:a.error,location:a.location,revalidation:r.revalidation||a.revalidation}}componentDidCatch(r,a){console.error("React Router caught the following error during render",r,a)}render(){return this.state.error!==void 0?R.createElement(mr.Provider,{value:this.props.routeContext},R.createElement(nf.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function By({routeContext:r,match:a,children:i}){let c=R.useContext(Pa);return c&&c.static&&c.staticContext&&(a.route.errorElement||a.route.ErrorBoundary)&&(c.staticContext._deepestRenderedBoundaryId=a.route.id),R.createElement(mr.Provider,{value:r},i)}function Uy(r,a=[],i=null,c=null){if(r==null){if(!i)return null;if(i.errors)r=i.matches;else if(a.length===0&&!i.initialized&&i.matches.length>0)r=i.matches;else return null}let l=r,u=i==null?void 0:i.errors;if(u!=null){let m=l.findIndex(v=>v.route.id&&(u==null?void 0:u[v.route.id])!==void 0);Ve(m>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(u).join(",")}`),l=l.slice(0,Math.min(l.length,m+1))}let d=!1,p=-1;if(i)for(let m=0;m<l.length;m++){let v=l[m];if((v.route.HydrateFallback||v.route.hydrateFallbackElement)&&(p=m),v.route.id){let{loaderData:y,errors:x}=i,g=v.route.loader&&!y.hasOwnProperty(v.route.id)&&(!x||x[v.route.id]===void 0);if(v.route.lazy||g){d=!0,p>=0?l=l.slice(0,p+1):l=[l[0]];break}}}return l.reduceRight((m,v,y)=>{let x,g=!1,E=null,b=null;i&&(x=u&&v.route.id?u[v.route.id]:void 0,E=v.route.errorElement||Fy,d&&(p<0&&y===0?(X1("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),g=!0,b=null):p===y&&(g=!0,b=v.route.hydrateFallbackElement||null)));let w=a.concat(l.slice(0,y+1)),N=()=>{let _;return x?_=E:g?_=b:v.route.Component?_=R.createElement(v.route.Component,null):v.route.element?_=v.route.element:_=m,R.createElement(By,{match:v,routeContext:{outlet:m,matches:w,isDataRoute:i!=null},children:_})};return i&&(v.route.ErrorBoundary||v.route.errorElement||y===0)?R.createElement(qy,{location:i.location,revalidation:i.revalidation,component:E,error:x,children:N(),routeContext:{outlet:null,matches:w,isDataRoute:!0}}):N()},null)}function af(r){return`${r} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Hy(r){let a=R.useContext(Pa);return Ve(a,af(r)),a}function Zy(r){let a=R.useContext(mu);return Ve(a,af(r)),a}function Wy(r){let a=R.useContext(mr);return Ve(a,af(r)),a}function sf(r){let a=Wy(r),i=a.matches[a.matches.length-1];return Ve(i.route.id,`${r} can only be used on routes that contain a unique "id"`),i.route.id}function Gy(){return sf("useRouteId")}function Vy(){var c;let r=R.useContext(nf),a=Zy("useRouteError"),i=sf("useRouteError");return r!==void 0?r:(c=a.errors)==null?void 0:c[i]}function Ky(){let{router:r}=Hy("useNavigate"),a=sf("useNavigate"),i=R.useRef(!1);return Y1(()=>{i.current=!0}),R.useCallback(async(l,u={})=>{tr(i.current,K1),i.current&&(typeof l=="number"?r.navigate(l):await r.navigate(l,{fromRouteId:a,...u}))},[r,a])}var i0={};function X1(r,a,i){!a&&!i0[r]&&(i0[r]=!0,tr(!1,i))}R.memo(Yy);function Yy({routes:r,future:a,state:i}){return Q1(r,void 0,i,a)}function Cr({to:r,replace:a,state:i,relative:c}){Ve(La(),"<Navigate> may be used only in the context of a <Router> component.");let{static:l}=R.useContext(rr);tr(!l,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:u}=R.useContext(mr),{pathname:d}=Et(),p=Mr(),m=rf(r,tf(u),d,c==="path"),v=JSON.stringify(m);return R.useEffect(()=>{p(JSON.parse(v),{replace:a,state:i,relative:c})},[p,v,c,a,i]),null}function gt(r){Ve(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Qy({basename:r="/",children:a=null,location:i,navigationType:c="POP",navigator:l,static:u=!1}){Ve(!La(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let d=r.replace(/^\/*/,"/"),p=R.useMemo(()=>({basename:d,navigator:l,static:u,future:{}}),[d,l,u]);typeof i=="string"&&(i=Ra(i));let{pathname:m="/",search:v="",hash:y="",state:x=null,key:g="default"}=i,E=R.useMemo(()=>{let b=un(m,d);return b==null?null:{location:{pathname:b,search:v,hash:y,state:x,key:g},navigationType:c}},[d,m,v,y,x,g,c]);return tr(E!=null,`<Router basename="${d}"> is not able to match the URL "${m}${v}${y}" because it does not start with the basename, so the <Router> won't render anything.`),E==null?null:R.createElement(rr.Provider,{value:p},R.createElement($i.Provider,{children:a,value:E}))}function J1({children:r,location:a}){return $y(Rd(r),a)}function Rd(r,a=[]){let i=[];return R.Children.forEach(r,(c,l)=>{if(!R.isValidElement(c))return;let u=[...a,l];if(c.type===R.Fragment){i.push.apply(i,Rd(c.props.children,u));return}Ve(c.type===gt,`[${typeof c.type=="string"?c.type:c.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Ve(!c.props.index||!c.props.children,"An index route cannot have child routes.");let d={id:c.props.id||u.join("-"),caseSensitive:c.props.caseSensitive,element:c.props.element,Component:c.props.Component,index:c.props.index,path:c.props.path,loader:c.props.loader,action:c.props.action,hydrateFallbackElement:c.props.hydrateFallbackElement,HydrateFallback:c.props.HydrateFallback,errorElement:c.props.errorElement,ErrorBoundary:c.props.ErrorBoundary,hasErrorBoundary:c.props.hasErrorBoundary===!0||c.props.ErrorBoundary!=null||c.props.errorElement!=null,shouldRevalidate:c.props.shouldRevalidate,handle:c.props.handle,lazy:c.props.lazy};c.props.children&&(d.children=Rd(c.props.children,u)),i.push(d)}),i}var Ql="get",Xl="application/x-www-form-urlencoded";function pu(r){return r!=null&&typeof r.tagName=="string"}function Xy(r){return pu(r)&&r.tagName.toLowerCase()==="button"}function Jy(r){return pu(r)&&r.tagName.toLowerCase()==="form"}function ex(r){return pu(r)&&r.tagName.toLowerCase()==="input"}function tx(r){return!!(r.metaKey||r.altKey||r.ctrlKey||r.shiftKey)}function rx(r,a){return r.button===0&&(!a||a==="_self")&&!tx(r)}var ao=null;function nx(){if(ao===null)try{new FormData(document.createElement("form"),0),ao=!1}catch{ao=!0}return ao}var ax=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function hd(r){return r!=null&&!ax.has(r)?(tr(!1,`"${r}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Xl}"`),null):r}function ix(r,a){let i,c,l,u,d;if(Jy(r)){let p=r.getAttribute("action");c=p?un(p,a):null,i=r.getAttribute("method")||Ql,l=hd(r.getAttribute("enctype"))||Xl,u=new FormData(r)}else if(Xy(r)||ex(r)&&(r.type==="submit"||r.type==="image")){let p=r.form;if(p==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let m=r.getAttribute("formaction")||p.getAttribute("action");if(c=m?un(m,a):null,i=r.getAttribute("formmethod")||p.getAttribute("method")||Ql,l=hd(r.getAttribute("formenctype"))||hd(p.getAttribute("enctype"))||Xl,u=new FormData(p,r),!nx()){let{name:v,type:y,value:x}=r;if(y==="image"){let g=v?`${v}.`:"";u.append(`${g}x`,"0"),u.append(`${g}y`,"0")}else v&&u.append(v,x)}}else{if(pu(r))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');i=Ql,c=null,l=Xl,d=r}return u&&l==="text/plain"&&(d=u,u=void 0),{action:c,method:i.toLowerCase(),encType:l,formData:u,body:d}}function of(r,a){if(r===!1||r===null||typeof r>"u")throw new Error(a)}async function sx(r,a){if(r.id in a)return a[r.id];try{let i=await import(r.module);return a[r.id]=i,i}catch(i){return console.error(`Error loading route module \`${r.module}\`, reloading page...`),console.error(i),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function ox(r){return r==null?!1:r.href==null?r.rel==="preload"&&typeof r.imageSrcSet=="string"&&typeof r.imageSizes=="string":typeof r.rel=="string"&&typeof r.href=="string"}async function lx(r,a,i){let c=await Promise.all(r.map(async l=>{let u=a.routes[l.route.id];if(u){let d=await sx(u,i);return d.links?d.links():[]}return[]}));return fx(c.flat(1).filter(ox).filter(l=>l.rel==="stylesheet"||l.rel==="preload").map(l=>l.rel==="stylesheet"?{...l,rel:"prefetch",as:"style"}:{...l,rel:"prefetch"}))}function s0(r,a,i,c,l,u){let d=(m,v)=>i[v]?m.route.id!==i[v].route.id:!0,p=(m,v)=>{var y;return i[v].pathname!==m.pathname||((y=i[v].route.path)==null?void 0:y.endsWith("*"))&&i[v].params["*"]!==m.params["*"]};return u==="assets"?a.filter((m,v)=>d(m,v)||p(m,v)):u==="data"?a.filter((m,v)=>{var x;let y=c.routes[m.route.id];if(!y||!y.hasLoader)return!1;if(d(m,v)||p(m,v))return!0;if(m.route.shouldRevalidate){let g=m.route.shouldRevalidate({currentUrl:new URL(l.pathname+l.search+l.hash,window.origin),currentParams:((x=i[0])==null?void 0:x.params)||{},nextUrl:new URL(r,window.origin),nextParams:m.params,defaultShouldRevalidate:!0});if(typeof g=="boolean")return g}return!0}):[]}function ux(r,a){return cx(r.map(i=>{let c=a.routes[i.route.id];if(!c)return[];let l=[c.module];return c.imports&&(l=l.concat(c.imports)),l}).flat(1))}function cx(r){return[...new Set(r)]}function dx(r){let a={},i=Object.keys(r).sort();for(let c of i)a[c]=r[c];return a}function fx(r,a){let i=new Set;return new Set(a),r.reduce((c,l)=>{let u=JSON.stringify(dx(l));return i.has(u)||(i.add(u),c.push({key:u,link:l})),c},[])}function mx(r){let a=typeof r=="string"?new URL(r,typeof window>"u"?"server://singlefetch/":window.location.origin):r;return a.pathname==="/"?a.pathname="_root.data":a.pathname=`${a.pathname.replace(/\/$/,"")}.data`,a}function px(){let r=R.useContext(Pa);return of(r,"You must render this element inside a <DataRouterContext.Provider> element"),r}function hx(){let r=R.useContext(mu);return of(r,"You must render this element inside a <DataRouterStateContext.Provider> element"),r}var lf=R.createContext(void 0);lf.displayName="FrameworkContext";function eg(){let r=R.useContext(lf);return of(r,"You must render this element inside a <HydratedRouter> element"),r}function gx(r,a){let i=R.useContext(lf),[c,l]=R.useState(!1),[u,d]=R.useState(!1),{onFocus:p,onBlur:m,onMouseEnter:v,onMouseLeave:y,onTouchStart:x}=a,g=R.useRef(null);R.useEffect(()=>{if(r==="render"&&d(!0),r==="viewport"){let w=_=>{_.forEach(k=>{d(k.isIntersecting)})},N=new IntersectionObserver(w,{threshold:.5});return g.current&&N.observe(g.current),()=>{N.disconnect()}}},[r]),R.useEffect(()=>{if(c){let w=setTimeout(()=>{d(!0)},100);return()=>{clearTimeout(w)}}},[c]);let E=()=>{l(!0)},b=()=>{l(!1),d(!1)};return i?r!=="intent"?[u,g,{}]:[u,g,{onFocus:Ni(p,E),onBlur:Ni(m,b),onMouseEnter:Ni(v,E),onMouseLeave:Ni(y,b),onTouchStart:Ni(x,E)}]:[!1,g,{}]}function Ni(r,a){return i=>{r&&r(i),i.defaultPrevented||a(i)}}function vx({page:r,...a}){let{router:i}=px(),c=R.useMemo(()=>H1(i.routes,r,i.basename),[i.routes,r,i.basename]);return c?R.createElement(xx,{page:r,matches:c,...a}):(console.warn(`Tried to prefetch ${r} but no routes matched.`),null)}function yx(r){let{manifest:a,routeModules:i}=eg(),[c,l]=R.useState([]);return R.useEffect(()=>{let u=!1;return lx(r,a,i).then(d=>{u||l(d)}),()=>{u=!0}},[r,a,i]),c}function xx({page:r,matches:a,...i}){let c=Et(),{manifest:l,routeModules:u}=eg(),{loaderData:d,matches:p}=hx(),m=R.useMemo(()=>s0(r,a,p,l,c,"data"),[r,a,p,l,c]),v=R.useMemo(()=>s0(r,a,p,l,c,"assets"),[r,a,p,l,c]),y=R.useMemo(()=>{if(r===c.pathname+c.search+c.hash)return[];let E=new Set,b=!1;if(a.forEach(N=>{var k;let _=l.routes[N.route.id];!_||!_.hasLoader||(!m.some(I=>I.route.id===N.route.id)&&N.route.id in d&&((k=u[N.route.id])!=null&&k.shouldRevalidate)||_.hasClientLoader?b=!0:E.add(N.route.id))}),E.size===0)return[];let w=mx(r);return b&&E.size>0&&w.searchParams.set("_routes",a.filter(N=>E.has(N.route.id)).map(N=>N.route.id).join(",")),[w.pathname+w.search]},[d,c,l,m,a,r,u]),x=R.useMemo(()=>ux(v,l),[v,l]),g=yx(v);return R.createElement(R.Fragment,null,y.map(E=>R.createElement("link",{key:E,rel:"prefetch",as:"fetch",href:E,...i})),x.map(E=>R.createElement("link",{key:E,rel:"modulepreload",href:E,...i})),g.map(({key:E,link:b})=>R.createElement("link",{key:E,...b})))}function Sx(...r){return a=>{r.forEach(i=>{typeof i=="function"?i(a):i!=null&&(i.current=a)})}}var tg=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{tg&&(window.__reactRouterVersion="7.0.2")}catch{}function wx({basename:r,children:a,window:i}){let c=R.useRef();c.current==null&&(c.current=cy({window:i,v5Compat:!0}));let l=c.current,[u,d]=R.useState({action:l.action,location:l.location}),p=R.useCallback(m=>{R.startTransition(()=>d(m))},[d]);return R.useLayoutEffect(()=>l.listen(p),[l,p]),R.createElement(Qy,{basename:r,children:a,location:u.location,navigationType:u.action,navigator:l})}var rg=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Rr=R.forwardRef(function({onClick:a,discover:i="render",prefetch:c="none",relative:l,reloadDocument:u,replace:d,state:p,target:m,to:v,preventScrollReset:y,viewTransition:x,...g},E){let{basename:b}=R.useContext(rr),w=typeof v=="string"&&rg.test(v),N,_=!1;if(typeof v=="string"&&w&&(N=v,tg))try{let Q=new URL(window.location.href),T=v.startsWith("//")?new URL(Q.protocol+v):new URL(v),J=un(T.pathname,b);T.origin===Q.origin&&J!=null?v=J+T.search+T.hash:_=!0}catch{tr(!1,`<Link to="${v}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let k=Ty(v,{relative:l}),[I,z,O]=gx(c,g),Z=kx(v,{replace:d,state:p,target:m,preventScrollReset:y,relative:l,viewTransition:x});function F(Q){a&&a(Q),Q.defaultPrevented||Z(Q)}let U=R.createElement("a",{...g,...O,href:N||k,onClick:_||u?a:F,ref:Sx(E,z),target:m,"data-discover":!w&&i==="render"?"true":void 0});return I&&!w?R.createElement(R.Fragment,null,U,R.createElement(vx,{page:k})):U});Rr.displayName="Link";var Er=R.forwardRef(function({"aria-current":a="page",caseSensitive:i=!1,className:c="",end:l=!1,style:u,to:d,viewTransition:p,children:m,...v},y){let x=Di(d,{relative:v.relative}),g=Et(),E=R.useContext(mu),{navigator:b,basename:w}=R.useContext(rr),N=E!=null&&Ix(x)&&p===!0,_=b.encodeLocation?b.encodeLocation(x).pathname:x.pathname,k=g.pathname,I=E&&E.navigation&&E.navigation.location?E.navigation.location.pathname:null;i||(k=k.toLowerCase(),I=I?I.toLowerCase():null,_=_.toLowerCase()),I&&w&&(I=un(I,w)||I);const z=_!=="/"&&_.endsWith("/")?_.length-1:_.length;let O=k===_||!l&&k.startsWith(_)&&k.charAt(z)==="/",Z=I!=null&&(I===_||!l&&I.startsWith(_)&&I.charAt(_.length)==="/"),F={isActive:O,isPending:Z,isTransitioning:N},U=O?a:void 0,Q;typeof c=="function"?Q=c(F):Q=[c,O?"active":null,Z?"pending":null,N?"transitioning":null].filter(Boolean).join(" ");let T=typeof u=="function"?u(F):u;return R.createElement(Rr,{...v,"aria-current":U,className:Q,ref:y,style:T,to:d,viewTransition:p},typeof m=="function"?m(F):m)});Er.displayName="NavLink";var Nx=R.forwardRef(({discover:r="render",fetcherKey:a,navigate:i,reloadDocument:c,replace:l,state:u,method:d=Ql,action:p,onSubmit:m,relative:v,preventScrollReset:y,viewTransition:x,...g},E)=>{let b=Cx(),w=Ex(p,{relative:v}),N=d.toLowerCase()==="get"?"get":"post",_=typeof p=="string"&&rg.test(p),k=I=>{if(m&&m(I),I.defaultPrevented)return;I.preventDefault();let z=I.nativeEvent.submitter,O=(z==null?void 0:z.getAttribute("formmethod"))||d;b(z||I.currentTarget,{fetcherKey:a,method:O,navigate:i,replace:l,state:u,relative:v,preventScrollReset:y,viewTransition:x})};return R.createElement("form",{ref:E,method:N,action:w,onSubmit:c?m:k,...g,"data-discover":!_&&r==="render"?"true":void 0})});Nx.displayName="Form";function _x(r){return`${r} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function ng(r){let a=R.useContext(Pa);return Ve(a,_x(r)),a}function kx(r,{target:a,replace:i,state:c,preventScrollReset:l,relative:u,viewTransition:d}={}){let p=Mr(),m=Et(),v=Di(r,{relative:u});return R.useCallback(y=>{if(rx(y,a)){y.preventDefault();let x=i!==void 0?i:Ii(m)===Ii(v);p(r,{replace:x,state:c,preventScrollReset:l,relative:u,viewTransition:d})}},[m,p,v,i,c,a,r,l,u,d])}var bx=0,Ax=()=>`__${String(++bx)}__`;function Cx(){let{router:r}=ng("useSubmit"),{basename:a}=R.useContext(rr),i=Gy();return R.useCallback(async(c,l={})=>{let{action:u,method:d,encType:p,formData:m,body:v}=ix(c,a);if(l.navigate===!1){let y=l.fetcherKey||Ax();await r.fetch(y,i,l.action||u,{preventScrollReset:l.preventScrollReset,formData:m,body:v,formMethod:l.method||d,formEncType:l.encType||p,flushSync:l.flushSync})}else await r.navigate(l.action||u,{preventScrollReset:l.preventScrollReset,formData:m,body:v,formMethod:l.method||d,formEncType:l.encType||p,replace:l.replace,state:l.state,fromRouteId:i,flushSync:l.flushSync,viewTransition:l.viewTransition})},[r,a,i])}function Ex(r,{relative:a}={}){let{basename:i}=R.useContext(rr),c=R.useContext(mr);Ve(c,"useFormAction must be used inside a RouteContext");let[l]=c.matches.slice(-1),u={...Di(r||".",{relative:a})},d=Et();if(r==null){u.search=d.search;let p=new URLSearchParams(u.search),m=p.getAll("index");if(m.some(y=>y==="")){p.delete("index"),m.filter(x=>x).forEach(x=>p.append("index",x));let y=p.toString();u.search=y?`?${y}`:""}}return(!r||r===".")&&l.route.index&&(u.search=u.search?u.search.replace(/^\?/,"?index&"):"?index"),i!=="/"&&(u.pathname=u.pathname==="/"?i:Ir([i,u.pathname])),Ii(u)}function Ix(r,a={}){let i=R.useContext(V1);Ve(i!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:c}=ng("useViewTransitionState"),l=Di(r,{relative:a.relative});if(!i.isTransitioning)return!1;let u=un(i.currentLocation.pathname,c)||i.currentLocation.pathname,d=un(i.nextLocation.pathname,c)||i.nextLocation.pathname;return nu(l.pathname,d)!=null||nu(l.pathname,u)!=null}new TextEncoder;function ag(r){var a,i,c="";if(typeof r=="string"||typeof r=="number")c+=r;else if(typeof r=="object")if(Array.isArray(r)){var l=r.length;for(a=0;a<l;a++)r[a]&&(i=ag(r[a]))&&(c&&(c+=" "),c+=i)}else for(i in r)r[i]&&(c&&(c+=" "),c+=i);return c}function ln(){for(var r,a,i=0,c="",l=arguments.length;i<l;i++)(r=arguments[i])&&(a=ag(r))&&(c&&(c+=" "),c+=a);return c}const Ri=r=>typeof r=="number"&&!isNaN(r),zn=r=>typeof r=="string",Mt=r=>typeof r=="function",Jl=r=>zn(r)||Mt(r)?r:null,Pd=r=>R.isValidElement(r)||zn(r)||Mt(r)||Ri(r);function Rx(r,a,i){i===void 0&&(i=300);const{scrollHeight:c,style:l}=r;requestAnimationFrame(()=>{l.minHeight="initial",l.height=c+"px",l.transition=`all ${i}ms`,requestAnimationFrame(()=>{l.height="0",l.padding="0",l.margin="0",setTimeout(a,i)})})}function hu(r){let{enter:a,exit:i,appendPosition:c=!1,collapse:l=!0,collapseDuration:u=300}=r;return function(d){let{children:p,position:m,preventExitTransition:v,done:y,nodeRef:x,isIn:g,playToast:E}=d;const b=c?`${a}--${m}`:a,w=c?`${i}--${m}`:i,N=R.useRef(0);return R.useLayoutEffect(()=>{const _=x.current,k=b.split(" "),I=z=>{z.target===x.current&&(E(),_.removeEventListener("animationend",I),_.removeEventListener("animationcancel",I),N.current===0&&z.type!=="animationcancel"&&_.classList.remove(...k))};_.classList.add(...k),_.addEventListener("animationend",I),_.addEventListener("animationcancel",I)},[]),R.useEffect(()=>{const _=x.current,k=()=>{_.removeEventListener("animationend",k),l?Rx(_,y,u):y()};g||(v?k():(N.current=1,_.className+=` ${w}`,_.addEventListener("animationend",k)))},[g]),qe.createElement(qe.Fragment,null,p)}}function o0(r,a){return r!=null?{content:r.content,containerId:r.props.containerId,id:r.props.toastId,theme:r.props.theme,type:r.props.type,data:r.props.data||{},isLoading:r.props.isLoading,icon:r.props.icon,status:a}:{}}const St=new Map;let Pi=[];const Ld=new Set,Px=r=>Ld.forEach(a=>a(r)),ig=()=>St.size>0;function sg(r,a){var i;if(a)return!((i=St.get(a))==null||!i.isToastActive(r));let c=!1;return St.forEach(l=>{l.isToastActive(r)&&(c=!0)}),c}function og(r,a){Pd(r)&&(ig()||Pi.push({content:r,options:a}),St.forEach(i=>{i.buildToast(r,a)}))}function l0(r,a){St.forEach(i=>{a!=null&&a!=null&&a.containerId?(a==null?void 0:a.containerId)===i.id&&i.toggle(r,a==null?void 0:a.id):i.toggle(r,a==null?void 0:a.id)})}function Lx(r){const{subscribe:a,getSnapshot:i,setProps:c}=R.useRef(function(u){const d=u.containerId||1;return{subscribe(p){const m=function(y,x,g){let E=1,b=0,w=[],N=[],_=[],k=x;const I=new Map,z=new Set,O=()=>{_=Array.from(I.values()),z.forEach(U=>U())},Z=U=>{N=U==null?[]:N.filter(Q=>Q!==U),O()},F=U=>{const{toastId:Q,onOpen:T,updateId:J,children:me}=U.props,ce=J==null;U.staleId&&I.delete(U.staleId),I.set(Q,U),N=[...N,U.props.toastId].filter(ue=>ue!==U.staleId),O(),g(o0(U,ce?"added":"updated")),ce&&Mt(T)&&T(R.isValidElement(me)&&me.props)};return{id:y,props:k,observe:U=>(z.add(U),()=>z.delete(U)),toggle:(U,Q)=>{I.forEach(T=>{Q!=null&&Q!==T.props.toastId||Mt(T.toggle)&&T.toggle(U)})},removeToast:Z,toasts:I,clearQueue:()=>{b-=w.length,w=[]},buildToast:(U,Q)=>{if((V=>{let{containerId:xe,toastId:Ne,updateId:Ce}=V;const Ee=xe?xe!==y:y!==1,je=I.has(Ne)&&Ce==null;return Ee||je})(Q))return;const{toastId:T,updateId:J,data:me,staleId:ce,delay:ue}=Q,G=()=>{Z(T)},oe=J==null;oe&&b++;const W={...k,style:k.toastStyle,key:E++,...Object.fromEntries(Object.entries(Q).filter(V=>{let[xe,Ne]=V;return Ne!=null})),toastId:T,updateId:J,data:me,closeToast:G,isIn:!1,className:Jl(Q.className||k.toastClassName),bodyClassName:Jl(Q.bodyClassName||k.bodyClassName),progressClassName:Jl(Q.progressClassName||k.progressClassName),autoClose:!Q.isLoading&&(q=Q.autoClose,K=k.autoClose,q===!1||Ri(q)&&q>0?q:K),deleteToast(){const V=I.get(T),{onClose:xe,children:Ne}=V.props;Mt(xe)&&xe(R.isValidElement(Ne)&&Ne.props),g(o0(V,"removed")),I.delete(T),b--,b<0&&(b=0),w.length>0?F(w.shift()):O()}};var q,K;W.closeButton=k.closeButton,Q.closeButton===!1||Pd(Q.closeButton)?W.closeButton=Q.closeButton:Q.closeButton===!0&&(W.closeButton=!Pd(k.closeButton)||k.closeButton);let Y=U;R.isValidElement(U)&&!zn(U.type)?Y=R.cloneElement(U,{closeToast:G,toastProps:W,data:me}):Mt(U)&&(Y=U({closeToast:G,toastProps:W,data:me}));const j={content:Y,props:W,staleId:ce};k.limit&&k.limit>0&&b>k.limit&&oe?w.push(j):Ri(ue)?setTimeout(()=>{F(j)},ue):F(j)},setProps(U){k=U},setToggle:(U,Q)=>{I.get(U).toggle=Q},isToastActive:U=>N.some(Q=>Q===U),getSnapshot:()=>_}}(d,u,Px);St.set(d,m);const v=m.observe(p);return Pi.forEach(y=>og(y.content,y.options)),Pi=[],()=>{v(),St.delete(d)}},setProps(p){var m;(m=St.get(d))==null||m.setProps(p)},getSnapshot(){var p;return(p=St.get(d))==null?void 0:p.getSnapshot()}}}(r)).current;c(r);const l=R.useSyncExternalStore(a,i,i);return{getToastToRender:function(u){if(!l)return[];const d=new Map;return r.newestOnTop&&l.reverse(),l.forEach(p=>{const{position:m}=p.props;d.has(m)||d.set(m,[]),d.get(m).push(p)}),Array.from(d,p=>u(p[0],p[1]))},isToastActive:sg,count:l==null?void 0:l.length}}function jx(r){const[a,i]=R.useState(!1),[c,l]=R.useState(!1),u=R.useRef(null),d=R.useRef({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:p,pauseOnHover:m,closeToast:v,onClick:y,closeOnClick:x}=r;var g,E;function b(){i(!0)}function w(){i(!1)}function N(I){const z=u.current;d.canDrag&&z&&(d.didMove=!0,a&&w(),d.delta=r.draggableDirection==="x"?I.clientX-d.start:I.clientY-d.start,d.start!==I.clientX&&(d.canCloseOnClick=!1),z.style.transform=`translate3d(${r.draggableDirection==="x"?`${d.delta}px, var(--y)`:`0, calc(${d.delta}px + var(--y))`},0)`,z.style.opacity=""+(1-Math.abs(d.delta/d.removalDistance)))}function _(){document.removeEventListener("pointermove",N),document.removeEventListener("pointerup",_);const I=u.current;if(d.canDrag&&d.didMove&&I){if(d.canDrag=!1,Math.abs(d.delta)>d.removalDistance)return l(!0),r.closeToast(),void r.collapseAll();I.style.transition="transform 0.2s, opacity 0.2s",I.style.removeProperty("transform"),I.style.removeProperty("opacity")}}(E=St.get((g={id:r.toastId,containerId:r.containerId,fn:i}).containerId||1))==null||E.setToggle(g.id,g.fn),R.useEffect(()=>{if(r.pauseOnFocusLoss)return document.hasFocus()||w(),window.addEventListener("focus",b),window.addEventListener("blur",w),()=>{window.removeEventListener("focus",b),window.removeEventListener("blur",w)}},[r.pauseOnFocusLoss]);const k={onPointerDown:function(I){if(r.draggable===!0||r.draggable===I.pointerType){d.didMove=!1,document.addEventListener("pointermove",N),document.addEventListener("pointerup",_);const z=u.current;d.canCloseOnClick=!0,d.canDrag=!0,z.style.transition="none",r.draggableDirection==="x"?(d.start=I.clientX,d.removalDistance=z.offsetWidth*(r.draggablePercent/100)):(d.start=I.clientY,d.removalDistance=z.offsetHeight*(r.draggablePercent===80?1.5*r.draggablePercent:r.draggablePercent)/100)}},onPointerUp:function(I){const{top:z,bottom:O,left:Z,right:F}=u.current.getBoundingClientRect();I.nativeEvent.type!=="touchend"&&r.pauseOnHover&&I.clientX>=Z&&I.clientX<=F&&I.clientY>=z&&I.clientY<=O?w():b()}};return p&&m&&(k.onMouseEnter=w,r.stacked||(k.onMouseLeave=b)),x&&(k.onClick=I=>{y&&y(I),d.canCloseOnClick&&v()}),{playToast:b,pauseToast:w,isRunning:a,preventExitTransition:c,toastRef:u,eventHandlers:k}}function Mx(r){let{delay:a,isRunning:i,closeToast:c,type:l="default",hide:u,className:d,style:p,controlledProgress:m,progress:v,rtl:y,isIn:x,theme:g}=r;const E=u||m&&v===0,b={...p,animationDuration:`${a}ms`,animationPlayState:i?"running":"paused"};m&&(b.transform=`scaleX(${v})`);const w=ln("Toastify__progress-bar",m?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${g}`,`Toastify__progress-bar--${l}`,{"Toastify__progress-bar--rtl":y}),N=Mt(d)?d({rtl:y,type:l,defaultClassName:w}):ln(w,d),_={[m&&v>=1?"onTransitionEnd":"onAnimationEnd"]:m&&v<1?null:()=>{x&&c()}};return qe.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":E},qe.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${g} Toastify__progress-bar--${l}`}),qe.createElement("div",{role:"progressbar","aria-hidden":E?"true":"false","aria-label":"notification timer",className:N,style:b,..._}))}let zx=1;const lg=()=>""+zx++;function Tx(r){return r&&(zn(r.toastId)||Ri(r.toastId))?r.toastId:lg()}function bi(r,a){return og(r,a),a.toastId}function au(r,a){return{...a,type:a&&a.type||r,toastId:Tx(a)}}function io(r){return(a,i)=>bi(a,au(r,i))}function we(r,a){return bi(r,au("default",a))}we.loading=(r,a)=>bi(r,au("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...a})),we.promise=function(r,a,i){let c,{pending:l,error:u,success:d}=a;l&&(c=zn(l)?we.loading(l,i):we.loading(l.render,{...i,...l}));const p={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},m=(y,x,g)=>{if(x==null)return void we.dismiss(c);const E={type:y,...p,...i,data:g},b=zn(x)?{render:x}:x;return c?we.update(c,{...E,...b}):we(b.render,{...E,...b}),g},v=Mt(r)?r():r;return v.then(y=>m("success",d,y)).catch(y=>m("error",u,y)),v},we.success=io("success"),we.info=io("info"),we.error=io("error"),we.warning=io("warning"),we.warn=we.warning,we.dark=(r,a)=>bi(r,au("default",{theme:"dark",...a})),we.dismiss=function(r){(function(a){var i;if(ig()){if(a==null||zn(i=a)||Ri(i))St.forEach(c=>{c.removeToast(a)});else if(a&&("containerId"in a||"id"in a)){const c=St.get(a.containerId);c?c.removeToast(a.id):St.forEach(l=>{l.removeToast(a.id)})}}else Pi=Pi.filter(c=>a!=null&&c.options.toastId!==a)})(r)},we.clearWaitingQueue=function(r){r===void 0&&(r={}),St.forEach(a=>{!a.props.limit||r.containerId&&a.id!==r.containerId||a.clearQueue()})},we.isActive=sg,we.update=function(r,a){a===void 0&&(a={});const i=((c,l)=>{var u;let{containerId:d}=l;return(u=St.get(d||1))==null?void 0:u.toasts.get(c)})(r,a);if(i){const{props:c,content:l}=i,u={delay:100,...c,...a,toastId:a.toastId||r,updateId:lg()};u.toastId!==r&&(u.staleId=r);const d=u.render||l;delete u.render,bi(d,u)}},we.done=r=>{we.update(r,{progress:1})},we.onChange=function(r){return Ld.add(r),()=>{Ld.delete(r)}},we.play=r=>l0(!0,r),we.pause=r=>l0(!1,r);const Ox=typeof window<"u"?R.useLayoutEffect:R.useEffect,so=r=>{let{theme:a,type:i,isLoading:c,...l}=r;return qe.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:a==="colored"?"currentColor":`var(--toastify-icon-color-${i})`,...l})},gd={info:function(r){return qe.createElement(so,{...r},qe.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(r){return qe.createElement(so,{...r},qe.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(r){return qe.createElement(so,{...r},qe.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(r){return qe.createElement(so,{...r},qe.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return qe.createElement("div",{className:"Toastify__spinner"})}},$x=r=>{const{isRunning:a,preventExitTransition:i,toastRef:c,eventHandlers:l,playToast:u}=jx(r),{closeButton:d,children:p,autoClose:m,onClick:v,type:y,hideProgressBar:x,closeToast:g,transition:E,position:b,className:w,style:N,bodyClassName:_,bodyStyle:k,progressClassName:I,progressStyle:z,updateId:O,role:Z,progress:F,rtl:U,toastId:Q,deleteToast:T,isIn:J,isLoading:me,closeOnClick:ce,theme:ue}=r,G=ln("Toastify__toast",`Toastify__toast-theme--${ue}`,`Toastify__toast--${y}`,{"Toastify__toast--rtl":U},{"Toastify__toast--close-on-click":ce}),oe=Mt(w)?w({rtl:U,position:b,type:y,defaultClassName:G}):ln(G,w),W=function(j){let{theme:V,type:xe,isLoading:Ne,icon:Ce}=j,Ee=null;const je={theme:V,type:xe};return Ce===!1||(Mt(Ce)?Ee=Ce({...je,isLoading:Ne}):R.isValidElement(Ce)?Ee=R.cloneElement(Ce,je):Ne?Ee=gd.spinner():(Me=>Me in gd)(xe)&&(Ee=gd[xe](je))),Ee}(r),q=!!F||!m,K={closeToast:g,type:y,theme:ue};let Y=null;return d===!1||(Y=Mt(d)?d(K):R.isValidElement(d)?R.cloneElement(d,K):function(j){let{closeToast:V,theme:xe,ariaLabel:Ne="close"}=j;return qe.createElement("button",{className:`Toastify__close-button Toastify__close-button--${xe}`,type:"button",onClick:Ce=>{Ce.stopPropagation(),V(Ce)},"aria-label":Ne},qe.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},qe.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}(K)),qe.createElement(E,{isIn:J,done:T,position:b,preventExitTransition:i,nodeRef:c,playToast:u},qe.createElement("div",{id:Q,onClick:v,"data-in":J,className:oe,...l,style:N,ref:c},qe.createElement("div",{...J&&{role:Z},className:Mt(_)?_({type:y}):ln("Toastify__toast-body",_),style:k},W!=null&&qe.createElement("div",{className:ln("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!me})},W),qe.createElement("div",null,p)),Y,qe.createElement(Mx,{...O&&!q?{key:`pb-${O}`}:{},rtl:U,theme:ue,delay:m,isRunning:a,isIn:J,closeToast:g,hide:x,type:y,style:z,className:I,controlledProgress:q,progress:F||0})))},gu=function(r,a){return a===void 0&&(a=!1),{enter:`Toastify--animate Toastify__${r}-enter`,exit:`Toastify--animate Toastify__${r}-exit`,appendPosition:a}},Dx=hu(gu("bounce",!0));hu(gu("slide",!0));hu(gu("zoom"));hu(gu("flip"));const Fx={position:"top-right",transition:Dx,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};function qx(r){let a={...Fx,...r};const i=r.stacked,[c,l]=R.useState(!0),u=R.useRef(null),{getToastToRender:d,isToastActive:p,count:m}=Lx(a),{className:v,style:y,rtl:x,containerId:g}=a;function E(w){const N=ln("Toastify__toast-container",`Toastify__toast-container--${w}`,{"Toastify__toast-container--rtl":x});return Mt(v)?v({position:w,rtl:x,defaultClassName:N}):ln(N,Jl(v))}function b(){i&&(l(!0),we.play())}return Ox(()=>{if(i){var w;const N=u.current.querySelectorAll('[data-in="true"]'),_=12,k=(w=a.position)==null?void 0:w.includes("top");let I=0,z=0;Array.from(N).reverse().forEach((O,Z)=>{const F=O;F.classList.add("Toastify__toast--stacked"),Z>0&&(F.dataset.collapsed=`${c}`),F.dataset.pos||(F.dataset.pos=k?"top":"bot");const U=I*(c?.2:1)+(c?0:_*Z);F.style.setProperty("--y",`${k?U:-1*U}px`),F.style.setProperty("--g",`${_}`),F.style.setProperty("--s",""+(1-(c?z:0))),I+=F.offsetHeight,z+=.025})}},[c,m,i]),qe.createElement("div",{ref:u,className:"Toastify",id:g,onMouseEnter:()=>{i&&(l(!1),we.pause())},onMouseLeave:b},d((w,N)=>{const _=N.length?{...y}:{...y,pointerEvents:"none"};return qe.createElement("div",{className:E(w),style:_,key:`container-${w}`},N.map(k=>{let{content:I,props:z}=k;return qe.createElement($x,{...z,stacked:i,collapseAll:b,isIn:p(z.toastId,z.containerId),style:z.style,key:`toast-${z.key}`},I)}))}))}const Ae={HOME:"/",LOGIN:"/login",REGISTER:"/register",DASHBOARD:"/dashboard",QUIZ:"/quiz",QUIZ_DIFFICULTY:"/quiz/difficulty",QUIZ_RESULTS:"/quiz/results",QUIZ_QUESTIONS:"/quiz/questions",ACHIEVEMENTS:"/achievements",LEADERBOARD:"/leaderboard",STATISTICS:"/statistics",FORGOT_PASSWORD:"/forgot-password",RESET_PASSWORD:"/reset-password"},u0=[Ae.HOME,Ae.LOGIN,Ae.REGISTER,Ae.FORGOT_PASSWORD,Ae.RESET_PASSWORD],Bx=[Ae.DASHBOARD,Ae.QUIZ,Ae.QUIZ_DIFFICULTY,Ae.QUIZ_RESULTS,Ae.QUIZ_QUESTIONS,Ae.ACHIEVEMENTS,Ae.LEADERBOARD,Ae.STATISTICS],ug=({onSuccess:r})=>{const[a,i]=R.useState(new Set),[c,l]=R.useState(0),u=["/src/images/bus1.jpg","/src/images/bus2.jpg","/src/images/bus3.jpg","/src/images/bus4.jpg","/src/images/bus5.jpg"],d=[new Set([4,5,6,7,8]),new Set([0,1,3,4]),new Set([2,3,4,5,8]),new Set([4,5,7,8]),new Set([0,3,6])],p=()=>{const v=Math.floor(Math.random()*u.length);l(v)};R.useEffect(()=>{p()},[]);const m=v=>{v.preventDefault();const y=d[c];a.size===y.size&&[...a].every(g=>y.has(g))?(sessionStorage.setItem("isAuthenticated","true"),sessionStorage.setItem("username",sessionStorage.getItem("username")||"User"),we.success("Login successful!",{position:"top-center",autoClose:1500,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),window.location.href=Ae.DASHBOARD,r&&r()):(we.error("Incorrect selection. Please try again.",{position:"top-center",autoClose:500,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),i(new Set),p())};return o.jsxs("div",{className:"captcha-container",children:[o.jsx("div",{className:"captcha-overlay"}),o.jsxs("div",{className:"captcha-modal",children:[o.jsxs("div",{className:"captcha-header",children:[o.jsx("p",{className:"captcha-title",children:"Select all images that includes:"}),o.jsx("p",{className:"captcha-subtitle",children:"A bus"})]}),o.jsxs("div",{className:"captcha-image-container",children:[o.jsx("img",{src:u[c],alt:"CAPTCHA",className:"captcha-image"}),o.jsx("div",{className:"captcha-grid",children:[...Array(9)].map((v,y)=>o.jsx("div",{className:`captcha-cell ${a.has(y)?"selected":""}`,onClick:()=>{const x=new Set(a);x.has(y)?x.delete(y):x.add(y),i(x)},children:o.jsx("span",{className:"captcha-cell-index",children:y})},y))})]}),o.jsx("div",{className:"captcha-actions",children:o.jsx("button",{onClick:m,type:"button",className:"captcha-verify-btn",children:"Verify"})})]})]})};/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */function Ux(r,a,i){return(a=Zx(a))in r?Object.defineProperty(r,a,{value:i,enumerable:!0,configurable:!0,writable:!0}):r[a]=i,r}function c0(r,a){var i=Object.keys(r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(r);a&&(c=c.filter(function(l){return Object.getOwnPropertyDescriptor(r,l).enumerable})),i.push.apply(i,c)}return i}function se(r){for(var a=1;a<arguments.length;a++){var i=arguments[a]!=null?arguments[a]:{};a%2?c0(Object(i),!0).forEach(function(c){Ux(r,c,i[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(i)):c0(Object(i)).forEach(function(c){Object.defineProperty(r,c,Object.getOwnPropertyDescriptor(i,c))})}return r}function Hx(r,a){if(typeof r!="object"||!r)return r;var i=r[Symbol.toPrimitive];if(i!==void 0){var c=i.call(r,a);if(typeof c!="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return(a==="string"?String:Number)(r)}function Zx(r){var a=Hx(r,"string");return typeof a=="symbol"?a:a+""}const d0=()=>{};let uf={},cg={},dg=null,fg={mark:d0,measure:d0};try{typeof window<"u"&&(uf=window),typeof document<"u"&&(cg=document),typeof MutationObserver<"u"&&(dg=MutationObserver),typeof performance<"u"&&(fg=performance)}catch{}const{userAgent:f0=""}=uf.navigator||{},cn=uf,We=cg,m0=dg,oo=fg;cn.document;const zr=!!We.documentElement&&!!We.head&&typeof We.addEventListener=="function"&&typeof We.createElement=="function",mg=~f0.indexOf("MSIE")||~f0.indexOf("Trident/");var Wx=/fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,Gx=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,pg={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"}},Vx={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},hg=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],vt="classic",vu="duotone",Kx="sharp",Yx="sharp-duotone",gg=[vt,vu,Kx,Yx],Qx={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"}},Xx={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"}},Jx=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}]]),e3={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",brands:"fab"},duotone:{solid:"fad",regular:"fadr",light:"fadl",thin:"fadt"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds",regular:"fasdr",light:"fasdl",thin:"fasdt"}},t3=["fak","fa-kit","fakd","fa-kit-duotone"],p0={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},r3=["kit"],n3={kit:{"fa-kit":"fak"}},a3=["fak","fakd"],i3={kit:{fak:"fa-kit"}},h0={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},lo={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},s3=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],o3=["fak","fa-kit","fakd","fa-kit-duotone"],l3={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},u3={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"}},c3={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"]},jd={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"}},d3=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands"],Md=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt",...s3,...d3],f3=["solid","regular","light","thin","duotone","brands"],vg=[1,2,3,4,5,6,7,8,9,10],m3=vg.concat([11,12,13,14,15,16,17,18,19,20]),p3=[...Object.keys(c3),...f3,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",lo.GROUP,lo.SWAP_OPACITY,lo.PRIMARY,lo.SECONDARY].concat(vg.map(r=>"".concat(r,"x"))).concat(m3.map(r=>"w-".concat(r))),h3={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}};const Lr="___FONT_AWESOME___",zd=16,yg="fa",xg="svg-inline--fa",Tn="data-fa-i2svg",Td="data-fa-pseudo-element",g3="data-fa-pseudo-element-pending",cf="data-prefix",df="data-icon",g0="fontawesome-i2svg",v3="async",y3=["HTML","HEAD","STYLE","SCRIPT"],Sg=(()=>{try{return!0}catch{return!1}})();function Fi(r){return new Proxy(r,{get(a,i){return i in a?a[i]:a[vt]}})}const wg=se({},pg);wg[vt]=se(se(se(se({},{"fa-duotone":"duotone"}),pg[vt]),p0.kit),p0["kit-duotone"]);const x3=Fi(wg),Od=se({},e3);Od[vt]=se(se(se(se({},{duotone:"fad"}),Od[vt]),h0.kit),h0["kit-duotone"]);const v0=Fi(Od),$d=se({},jd);$d[vt]=se(se({},$d[vt]),i3.kit);const ff=Fi($d),Dd=se({},u3);Dd[vt]=se(se({},Dd[vt]),n3.kit);Fi(Dd);const S3=Wx,Ng="fa-layers-text",w3=Gx,N3=se({},Qx);Fi(N3);const _3=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],vd=Vx,k3=[...r3,...p3],Ai=cn.FontAwesomeConfig||{};function b3(r){var a=We.querySelector("script["+r+"]");if(a)return a.getAttribute(r)}function A3(r){return r===""?!0:r==="false"?!1:r==="true"?!0:r}We&&typeof We.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(a=>{let[i,c]=a;const l=A3(b3(i));l!=null&&(Ai[c]=l)});const _g={styleDefault:"solid",familyDefault:vt,cssPrefix:yg,replacementClass:xg,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};Ai.familyPrefix&&(Ai.cssPrefix=Ai.familyPrefix);const Ea=se(se({},_g),Ai);Ea.autoReplaceSvg||(Ea.observeMutations=!1);const Se={};Object.keys(_g).forEach(r=>{Object.defineProperty(Se,r,{enumerable:!0,set:function(a){Ea[r]=a,Ci.forEach(i=>i(Se))},get:function(){return Ea[r]}})});Object.defineProperty(Se,"familyPrefix",{enumerable:!0,set:function(r){Ea.cssPrefix=r,Ci.forEach(a=>a(Se))},get:function(){return Ea.cssPrefix}});cn.FontAwesomeConfig=Se;const Ci=[];function C3(r){return Ci.push(r),()=>{Ci.splice(Ci.indexOf(r),1)}}const on=zd,cr={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function E3(r){if(!r||!zr)return;const a=We.createElement("style");a.setAttribute("type","text/css"),a.innerHTML=r;const i=We.head.childNodes;let c=null;for(let l=i.length-1;l>-1;l--){const u=i[l],d=(u.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(d)>-1&&(c=u)}return We.head.insertBefore(a,c),r}const I3="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function Li(){let r=12,a="";for(;r-- >0;)a+=I3[Math.random()*62|0];return a}function ja(r){const a=[];for(let i=(r||[]).length>>>0;i--;)a[i]=r[i];return a}function mf(r){return r.classList?ja(r.classList):(r.getAttribute("class")||"").split(" ").filter(a=>a)}function kg(r){return"".concat(r).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function R3(r){return Object.keys(r||{}).reduce((a,i)=>a+"".concat(i,'="').concat(kg(r[i]),'" '),"").trim()}function yu(r){return Object.keys(r||{}).reduce((a,i)=>a+"".concat(i,": ").concat(r[i].trim(),";"),"")}function pf(r){return r.size!==cr.size||r.x!==cr.x||r.y!==cr.y||r.rotate!==cr.rotate||r.flipX||r.flipY}function P3(r){let{transform:a,containerWidth:i,iconWidth:c}=r;const l={transform:"translate(".concat(i/2," 256)")},u="translate(".concat(a.x*32,", ").concat(a.y*32,") "),d="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),p="rotate(".concat(a.rotate," 0 0)"),m={transform:"".concat(u," ").concat(d," ").concat(p)},v={transform:"translate(".concat(c/2*-1," -256)")};return{outer:l,inner:m,path:v}}function L3(r){let{transform:a,width:i=zd,height:c=zd,startCentered:l=!1}=r,u="";return l&&mg?u+="translate(".concat(a.x/on-i/2,"em, ").concat(a.y/on-c/2,"em) "):l?u+="translate(calc(-50% + ".concat(a.x/on,"em), calc(-50% + ").concat(a.y/on,"em)) "):u+="translate(".concat(a.x/on,"em, ").concat(a.y/on,"em) "),u+="scale(".concat(a.size/on*(a.flipX?-1:1),", ").concat(a.size/on*(a.flipY?-1:1),") "),u+="rotate(".concat(a.rotate,"deg) "),u}var j3=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}`;function bg(){const r=yg,a=xg,i=Se.cssPrefix,c=Se.replacementClass;let l=j3;if(i!==r||c!==a){const u=new RegExp("\\.".concat(r,"\\-"),"g"),d=new RegExp("\\--".concat(r,"\\-"),"g"),p=new RegExp("\\.".concat(a),"g");l=l.replace(u,".".concat(i,"-")).replace(d,"--".concat(i,"-")).replace(p,".".concat(c))}return l}let y0=!1;function yd(){Se.autoAddCss&&!y0&&(E3(bg()),y0=!0)}var M3={mixout(){return{dom:{css:bg,insertCss:yd}}},hooks(){return{beforeDOMElementCreation(){yd()},beforeI2svg(){yd()}}}};const jr=cn||{};jr[Lr]||(jr[Lr]={});jr[Lr].styles||(jr[Lr].styles={});jr[Lr].hooks||(jr[Lr].hooks={});jr[Lr].shims||(jr[Lr].shims=[]);var dr=jr[Lr];const Ag=[],Cg=function(){We.removeEventListener("DOMContentLoaded",Cg),iu=1,Ag.map(r=>r())};let iu=!1;zr&&(iu=(We.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(We.readyState),iu||We.addEventListener("DOMContentLoaded",Cg));function z3(r){zr&&(iu?setTimeout(r,0):Ag.push(r))}function qi(r){const{tag:a,attributes:i={},children:c=[]}=r;return typeof r=="string"?kg(r):"<".concat(a," ").concat(R3(i),">").concat(c.map(qi).join(""),"</").concat(a,">")}function x0(r,a,i){if(r&&r[a]&&r[a][i])return{prefix:a,iconName:i,icon:r[a][i]}}var xd=function(a,i,c,l){var u=Object.keys(a),d=u.length,p=i,m,v,y;for(c===void 0?(m=1,y=a[u[0]]):(m=0,y=c);m<d;m++)v=u[m],y=p(y,a[v],v,a);return y};function T3(r){const a=[];let i=0;const c=r.length;for(;i<c;){const l=r.charCodeAt(i++);if(l>=55296&&l<=56319&&i<c){const u=r.charCodeAt(i++);(u&64512)==56320?a.push(((l&1023)<<10)+(u&1023)+65536):(a.push(l),i--)}else a.push(l)}return a}function Fd(r){const a=T3(r);return a.length===1?a[0].toString(16):null}function O3(r,a){const i=r.length;let c=r.charCodeAt(a),l;return c>=55296&&c<=56319&&i>a+1&&(l=r.charCodeAt(a+1),l>=56320&&l<=57343)?(c-55296)*1024+l-56320+65536:c}function S0(r){return Object.keys(r).reduce((a,i)=>{const c=r[i];return!!c.icon?a[c.iconName]=c.icon:a[i]=c,a},{})}function qd(r,a){let i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:c=!1}=i,l=S0(a);typeof dr.hooks.addPack=="function"&&!c?dr.hooks.addPack(r,S0(a)):dr.styles[r]=se(se({},dr.styles[r]||{}),l),r==="fas"&&qd("fa",a)}const{styles:ji,shims:$3}=dr,Eg=Object.keys(ff),D3=Eg.reduce((r,a)=>(r[a]=Object.keys(ff[a]),r),{});let hf=null,Ig={},Rg={},Pg={},Lg={},jg={};function F3(r){return~k3.indexOf(r)}function q3(r,a){const i=a.split("-"),c=i[0],l=i.slice(1).join("-");return c===r&&l!==""&&!F3(l)?l:null}const Mg=()=>{const r=c=>xd(ji,(l,u,d)=>(l[d]=xd(u,c,{}),l),{});Ig=r((c,l,u)=>(l[3]&&(c[l[3]]=u),l[2]&&l[2].filter(p=>typeof p=="number").forEach(p=>{c[p.toString(16)]=u}),c)),Rg=r((c,l,u)=>(c[u]=u,l[2]&&l[2].filter(p=>typeof p=="string").forEach(p=>{c[p]=u}),c)),jg=r((c,l,u)=>{const d=l[2];return c[u]=u,d.forEach(p=>{c[p]=u}),c});const a="far"in ji||Se.autoFetchSvg,i=xd($3,(c,l)=>{const u=l[0];let d=l[1];const p=l[2];return d==="far"&&!a&&(d="fas"),typeof u=="string"&&(c.names[u]={prefix:d,iconName:p}),typeof u=="number"&&(c.unicodes[u.toString(16)]={prefix:d,iconName:p}),c},{names:{},unicodes:{}});Pg=i.names,Lg=i.unicodes,hf=xu(Se.styleDefault,{family:Se.familyDefault})};C3(r=>{hf=xu(r.styleDefault,{family:Se.familyDefault})});Mg();function gf(r,a){return(Ig[r]||{})[a]}function B3(r,a){return(Rg[r]||{})[a]}function Mn(r,a){return(jg[r]||{})[a]}function zg(r){return Pg[r]||{prefix:null,iconName:null}}function U3(r){const a=Lg[r],i=gf("fas",r);return a||(i?{prefix:"fas",iconName:i}:null)||{prefix:null,iconName:null}}function dn(){return hf}const Tg=()=>({prefix:null,iconName:null,rest:[]});function H3(r){let a=vt;const i=Eg.reduce((c,l)=>(c[l]="".concat(Se.cssPrefix,"-").concat(l),c),{});return gg.forEach(c=>{(r.includes(i[c])||r.some(l=>D3[c].includes(l)))&&(a=c)}),a}function xu(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:i=vt}=a,c=x3[i][r];if(i===vu&&!r)return"fad";const l=v0[i][r]||v0[i][c],u=r in dr.styles?r:null;return l||u||null}function Z3(r){let a=[],i=null;return r.forEach(c=>{const l=q3(Se.cssPrefix,c);l?i=l:c&&a.push(c)}),{iconName:i,rest:a}}function w0(r){return r.sort().filter((a,i,c)=>c.indexOf(a)===i)}function Su(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:i=!1}=a;let c=null;const l=Md.concat(o3),u=w0(r.filter(x=>l.includes(x))),d=w0(r.filter(x=>!Md.includes(x))),p=u.filter(x=>(c=x,!hg.includes(x))),[m=null]=p,v=H3(u),y=se(se({},Z3(d)),{},{prefix:xu(m,{family:v})});return se(se(se({},y),K3({values:r,family:v,styles:ji,config:Se,canonical:y,givenPrefix:c})),W3(i,c,y))}function W3(r,a,i){let{prefix:c,iconName:l}=i;if(r||!c||!l)return{prefix:c,iconName:l};const u=a==="fa"?zg(l):{},d=Mn(c,l);return l=u.iconName||d||l,c=u.prefix||c,c==="far"&&!ji.far&&ji.fas&&!Se.autoFetchSvg&&(c="fas"),{prefix:c,iconName:l}}const G3=gg.filter(r=>r!==vt||r!==vu),V3=Object.keys(jd).filter(r=>r!==vt).map(r=>Object.keys(jd[r])).flat();function K3(r){const{values:a,family:i,canonical:c,givenPrefix:l="",styles:u={},config:d={}}=r,p=i===vu,m=a.includes("fa-duotone")||a.includes("fad"),v=d.familyDefault==="duotone",y=c.prefix==="fad"||c.prefix==="fa-duotone";if(!p&&(m||v||y)&&(c.prefix="fad"),(a.includes("fa-brands")||a.includes("fab"))&&(c.prefix="fab"),!c.prefix&&G3.includes(i)&&(Object.keys(u).find(g=>V3.includes(g))||d.autoFetchSvg)){const g=Jx.get(i).defaultShortPrefixId;c.prefix=g,c.iconName=Mn(c.prefix,c.iconName)||c.iconName}return(c.prefix==="fa"||l==="fa")&&(c.prefix=dn()||"fas"),c}class Y3{constructor(){this.definitions={}}add(){for(var a=arguments.length,i=new Array(a),c=0;c<a;c++)i[c]=arguments[c];const l=i.reduce(this._pullDefinitions,{});Object.keys(l).forEach(u=>{this.definitions[u]=se(se({},this.definitions[u]||{}),l[u]),qd(u,l[u]);const d=ff[vt][u];d&&qd(d,l[u]),Mg()})}reset(){this.definitions={}}_pullDefinitions(a,i){const c=i.prefix&&i.iconName&&i.icon?{0:i}:i;return Object.keys(c).map(l=>{const{prefix:u,iconName:d,icon:p}=c[l],m=p[2];a[u]||(a[u]={}),m.length>0&&m.forEach(v=>{typeof v=="string"&&(a[u][v]=p)}),a[u][d]=p}),a}}let N0=[],ka={};const Aa={},Q3=Object.keys(Aa);function X3(r,a){let{mixoutsTo:i}=a;return N0=r,ka={},Object.keys(Aa).forEach(c=>{Q3.indexOf(c)===-1&&delete Aa[c]}),N0.forEach(c=>{const l=c.mixout?c.mixout():{};if(Object.keys(l).forEach(u=>{typeof l[u]=="function"&&(i[u]=l[u]),typeof l[u]=="object"&&Object.keys(l[u]).forEach(d=>{i[u]||(i[u]={}),i[u][d]=l[u][d]})}),c.hooks){const u=c.hooks();Object.keys(u).forEach(d=>{ka[d]||(ka[d]=[]),ka[d].push(u[d])})}c.provides&&c.provides(Aa)}),i}function Bd(r,a){for(var i=arguments.length,c=new Array(i>2?i-2:0),l=2;l<i;l++)c[l-2]=arguments[l];return(ka[r]||[]).forEach(d=>{a=d.apply(null,[a,...c])}),a}function On(r){for(var a=arguments.length,i=new Array(a>1?a-1:0),c=1;c<a;c++)i[c-1]=arguments[c];(ka[r]||[]).forEach(u=>{u.apply(null,i)})}function fn(){const r=arguments[0],a=Array.prototype.slice.call(arguments,1);return Aa[r]?Aa[r].apply(null,a):void 0}function Ud(r){r.prefix==="fa"&&(r.prefix="fas");let{iconName:a}=r;const i=r.prefix||dn();if(a)return a=Mn(i,a)||a,x0(Og.definitions,i,a)||x0(dr.styles,i,a)}const Og=new Y3,J3=()=>{Se.autoReplaceSvg=!1,Se.observeMutations=!1,On("noAuto")},e4={i2svg:function(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return zr?(On("beforeI2svg",r),fn("pseudoElements2svg",r),fn("i2svg",r)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:a}=r;Se.autoReplaceSvg===!1&&(Se.autoReplaceSvg=!0),Se.observeMutations=!0,z3(()=>{r4({autoReplaceSvgRoot:a}),On("watch",r)})}},t4={icon:r=>{if(r===null)return null;if(typeof r=="object"&&r.prefix&&r.iconName)return{prefix:r.prefix,iconName:Mn(r.prefix,r.iconName)||r.iconName};if(Array.isArray(r)&&r.length===2){const a=r[1].indexOf("fa-")===0?r[1].slice(3):r[1],i=xu(r[0]);return{prefix:i,iconName:Mn(i,a)||a}}if(typeof r=="string"&&(r.indexOf("".concat(Se.cssPrefix,"-"))>-1||r.match(S3))){const a=Su(r.split(" "),{skipLookups:!0});return{prefix:a.prefix||dn(),iconName:Mn(a.prefix,a.iconName)||a.iconName}}if(typeof r=="string"){const a=dn();return{prefix:a,iconName:Mn(a,r)||r}}}},zt={noAuto:J3,config:Se,dom:e4,parse:t4,library:Og,findIconDefinition:Ud,toHtml:qi},r4=function(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:a=We}=r;(Object.keys(dr.styles).length>0||Se.autoFetchSvg)&&zr&&Se.autoReplaceSvg&&zt.dom.i2svg({node:a})};function wu(r,a){return Object.defineProperty(r,"abstract",{get:a}),Object.defineProperty(r,"html",{get:function(){return r.abstract.map(i=>qi(i))}}),Object.defineProperty(r,"node",{get:function(){if(!zr)return;const i=We.createElement("div");return i.innerHTML=r.html,i.children}}),r}function n4(r){let{children:a,main:i,mask:c,attributes:l,styles:u,transform:d}=r;if(pf(d)&&i.found&&!c.found){const{width:p,height:m}=i,v={x:p/m/2,y:.5};l.style=yu(se(se({},u),{},{"transform-origin":"".concat(v.x+d.x/16,"em ").concat(v.y+d.y/16,"em")}))}return[{tag:"svg",attributes:l,children:a}]}function a4(r){let{prefix:a,iconName:i,children:c,attributes:l,symbol:u}=r;const d=u===!0?"".concat(a,"-").concat(Se.cssPrefix,"-").concat(i):u;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:se(se({},l),{},{id:d}),children:c}]}]}function vf(r){const{icons:{main:a,mask:i},prefix:c,iconName:l,transform:u,symbol:d,title:p,maskId:m,titleId:v,extra:y,watchable:x=!1}=r,{width:g,height:E}=i.found?i:a,b=a3.includes(c),w=[Se.replacementClass,l?"".concat(Se.cssPrefix,"-").concat(l):""].filter(O=>y.classes.indexOf(O)===-1).filter(O=>O!==""||!!O).concat(y.classes).join(" ");let N={children:[],attributes:se(se({},y.attributes),{},{"data-prefix":c,"data-icon":l,class:w,role:y.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(g," ").concat(E)})};const _=b&&!~y.classes.indexOf("fa-fw")?{width:"".concat(g/E*16*.0625,"em")}:{};x&&(N.attributes[Tn]=""),p&&(N.children.push({tag:"title",attributes:{id:N.attributes["aria-labelledby"]||"title-".concat(v||Li())},children:[p]}),delete N.attributes.title);const k=se(se({},N),{},{prefix:c,iconName:l,main:a,mask:i,maskId:m,transform:u,symbol:d,styles:se(se({},_),y.styles)}),{children:I,attributes:z}=i.found&&a.found?fn("generateAbstractMask",k)||{children:[],attributes:{}}:fn("generateAbstractIcon",k)||{children:[],attributes:{}};return k.children=I,k.attributes=z,d?a4(k):n4(k)}function _0(r){const{content:a,width:i,height:c,transform:l,title:u,extra:d,watchable:p=!1}=r,m=se(se(se({},d.attributes),u?{title:u}:{}),{},{class:d.classes.join(" ")});p&&(m[Tn]="");const v=se({},d.styles);pf(l)&&(v.transform=L3({transform:l,startCentered:!0,width:i,height:c}),v["-webkit-transform"]=v.transform);const y=yu(v);y.length>0&&(m.style=y);const x=[];return x.push({tag:"span",attributes:m,children:[a]}),u&&x.push({tag:"span",attributes:{class:"sr-only"},children:[u]}),x}function i4(r){const{content:a,title:i,extra:c}=r,l=se(se(se({},c.attributes),i?{title:i}:{}),{},{class:c.classes.join(" ")}),u=yu(c.styles);u.length>0&&(l.style=u);const d=[];return d.push({tag:"span",attributes:l,children:[a]}),i&&d.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),d}const{styles:Sd}=dr;function Hd(r){const a=r[0],i=r[1],[c]=r.slice(4);let l=null;return Array.isArray(c)?l={tag:"g",attributes:{class:"".concat(Se.cssPrefix,"-").concat(vd.GROUP)},children:[{tag:"path",attributes:{class:"".concat(Se.cssPrefix,"-").concat(vd.SECONDARY),fill:"currentColor",d:c[0]}},{tag:"path",attributes:{class:"".concat(Se.cssPrefix,"-").concat(vd.PRIMARY),fill:"currentColor",d:c[1]}}]}:l={tag:"path",attributes:{fill:"currentColor",d:c}},{found:!0,width:a,height:i,icon:l}}const s4={found:!1,width:512,height:512};function o4(r,a){!Sg&&!Se.showMissingIcons&&r&&console.error('Icon with name "'.concat(r,'" and prefix "').concat(a,'" is missing.'))}function Zd(r,a){let i=a;return a==="fa"&&Se.styleDefault!==null&&(a=dn()),new Promise((c,l)=>{if(i==="fa"){const u=zg(r)||{};r=u.iconName||r,a=u.prefix||a}if(r&&a&&Sd[a]&&Sd[a][r]){const u=Sd[a][r];return c(Hd(u))}o4(r,a),c(se(se({},s4),{},{icon:Se.showMissingIcons&&r?fn("missingIconAbstract")||{}:{}}))})}const k0=()=>{},Wd=Se.measurePerformance&&oo&&oo.mark&&oo.measure?oo:{mark:k0,measure:k0},_i='FA "6.7.2"',l4=r=>(Wd.mark("".concat(_i," ").concat(r," begins")),()=>$g(r)),$g=r=>{Wd.mark("".concat(_i," ").concat(r," ends")),Wd.measure("".concat(_i," ").concat(r),"".concat(_i," ").concat(r," begins"),"".concat(_i," ").concat(r," ends"))};var yf={begin:l4,end:$g};const eu=()=>{};function b0(r){return typeof(r.getAttribute?r.getAttribute(Tn):null)=="string"}function u4(r){const a=r.getAttribute?r.getAttribute(cf):null,i=r.getAttribute?r.getAttribute(df):null;return a&&i}function c4(r){return r&&r.classList&&r.classList.contains&&r.classList.contains(Se.replacementClass)}function d4(){return Se.autoReplaceSvg===!0?tu.replace:tu[Se.autoReplaceSvg]||tu.replace}function f4(r){return We.createElementNS("http://www.w3.org/2000/svg",r)}function m4(r){return We.createElement(r)}function Dg(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:i=r.tag==="svg"?f4:m4}=a;if(typeof r=="string")return We.createTextNode(r);const c=i(r.tag);return Object.keys(r.attributes||[]).forEach(function(u){c.setAttribute(u,r.attributes[u])}),(r.children||[]).forEach(function(u){c.appendChild(Dg(u,{ceFn:i}))}),c}function p4(r){let a=" ".concat(r.outerHTML," ");return a="".concat(a,"Font Awesome fontawesome.com "),a}const tu={replace:function(r){const a=r[0];if(a.parentNode)if(r[1].forEach(i=>{a.parentNode.insertBefore(Dg(i),a)}),a.getAttribute(Tn)===null&&Se.keepOriginalSource){let i=We.createComment(p4(a));a.parentNode.replaceChild(i,a)}else a.remove()},nest:function(r){const a=r[0],i=r[1];if(~mf(a).indexOf(Se.replacementClass))return tu.replace(r);const c=new RegExp("".concat(Se.cssPrefix,"-.*"));if(delete i[0].attributes.id,i[0].attributes.class){const u=i[0].attributes.class.split(" ").reduce((d,p)=>(p===Se.replacementClass||p.match(c)?d.toSvg.push(p):d.toNode.push(p),d),{toNode:[],toSvg:[]});i[0].attributes.class=u.toSvg.join(" "),u.toNode.length===0?a.removeAttribute("class"):a.setAttribute("class",u.toNode.join(" "))}const l=i.map(u=>qi(u)).join(`
`);a.setAttribute(Tn,""),a.innerHTML=l}};function A0(r){r()}function Fg(r,a){const i=typeof a=="function"?a:eu;if(r.length===0)i();else{let c=A0;Se.mutateApproach===v3&&(c=cn.requestAnimationFrame||A0),c(()=>{const l=d4(),u=yf.begin("mutate");r.map(l),u(),i()})}}let xf=!1;function qg(){xf=!0}function Gd(){xf=!1}let su=null;function C0(r){if(!m0||!Se.observeMutations)return;const{treeCallback:a=eu,nodeCallback:i=eu,pseudoElementsCallback:c=eu,observeMutationsRoot:l=We}=r;su=new m0(u=>{if(xf)return;const d=dn();ja(u).forEach(p=>{if(p.type==="childList"&&p.addedNodes.length>0&&!b0(p.addedNodes[0])&&(Se.searchPseudoElements&&c(p.target),a(p.target)),p.type==="attributes"&&p.target.parentNode&&Se.searchPseudoElements&&c(p.target.parentNode),p.type==="attributes"&&b0(p.target)&&~_3.indexOf(p.attributeName))if(p.attributeName==="class"&&u4(p.target)){const{prefix:m,iconName:v}=Su(mf(p.target));p.target.setAttribute(cf,m||d),v&&p.target.setAttribute(df,v)}else c4(p.target)&&i(p.target)})}),zr&&su.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function h4(){su&&su.disconnect()}function g4(r){const a=r.getAttribute("style");let i=[];return a&&(i=a.split(";").reduce((c,l)=>{const u=l.split(":"),d=u[0],p=u.slice(1);return d&&p.length>0&&(c[d]=p.join(":").trim()),c},{})),i}function v4(r){const a=r.getAttribute("data-prefix"),i=r.getAttribute("data-icon"),c=r.innerText!==void 0?r.innerText.trim():"";let l=Su(mf(r));return l.prefix||(l.prefix=dn()),a&&i&&(l.prefix=a,l.iconName=i),l.iconName&&l.prefix||(l.prefix&&c.length>0&&(l.iconName=B3(l.prefix,r.innerText)||gf(l.prefix,Fd(r.innerText))),!l.iconName&&Se.autoFetchSvg&&r.firstChild&&r.firstChild.nodeType===Node.TEXT_NODE&&(l.iconName=r.firstChild.data)),l}function y4(r){const a=ja(r.attributes).reduce((l,u)=>(l.name!=="class"&&l.name!=="style"&&(l[u.name]=u.value),l),{}),i=r.getAttribute("title"),c=r.getAttribute("data-fa-title-id");return Se.autoA11y&&(i?a["aria-labelledby"]="".concat(Se.replacementClass,"-title-").concat(c||Li()):(a["aria-hidden"]="true",a.focusable="false")),a}function x4(){return{iconName:null,title:null,titleId:null,prefix:null,transform:cr,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function E0(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:i,prefix:c,rest:l}=v4(r),u=y4(r),d=Bd("parseNodeAttributes",{},r);let p=a.styleParser?g4(r):[];return se({iconName:i,title:r.getAttribute("title"),titleId:r.getAttribute("data-fa-title-id"),prefix:c,transform:cr,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:l,styles:p,attributes:u}},d)}const{styles:S4}=dr;function Bg(r){const a=Se.autoReplaceSvg==="nest"?E0(r,{styleParser:!1}):E0(r);return~a.extra.classes.indexOf(Ng)?fn("generateLayersText",r,a):fn("generateSvgReplacementMutation",r,a)}function w4(){return[...t3,...Md]}function I0(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!zr)return Promise.resolve();const i=We.documentElement.classList,c=y=>i.add("".concat(g0,"-").concat(y)),l=y=>i.remove("".concat(g0,"-").concat(y)),u=Se.autoFetchSvg?w4():hg.concat(Object.keys(S4));u.includes("fa")||u.push("fa");const d=[".".concat(Ng,":not([").concat(Tn,"])")].concat(u.map(y=>".".concat(y,":not([").concat(Tn,"])"))).join(", ");if(d.length===0)return Promise.resolve();let p=[];try{p=ja(r.querySelectorAll(d))}catch{}if(p.length>0)c("pending"),l("complete");else return Promise.resolve();const m=yf.begin("onTree"),v=p.reduce((y,x)=>{try{const g=Bg(x);g&&y.push(g)}catch(g){Sg||g.name==="MissingIcon"&&console.error(g)}return y},[]);return new Promise((y,x)=>{Promise.all(v).then(g=>{Fg(g,()=>{c("active"),c("complete"),l("pending"),typeof a=="function"&&a(),m(),y()})}).catch(g=>{m(),x(g)})})}function N4(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Bg(r).then(i=>{i&&Fg([i],a)})}function _4(r){return function(a){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const c=(a||{}).icon?a:Ud(a||{});let{mask:l}=i;return l&&(l=(l||{}).icon?l:Ud(l||{})),r(c,se(se({},i),{},{mask:l}))}}const k4=function(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:i=cr,symbol:c=!1,mask:l=null,maskId:u=null,title:d=null,titleId:p=null,classes:m=[],attributes:v={},styles:y={}}=a;if(!r)return;const{prefix:x,iconName:g,icon:E}=r;return wu(se({type:"icon"},r),()=>(On("beforeDOMElementCreation",{iconDefinition:r,params:a}),Se.autoA11y&&(d?v["aria-labelledby"]="".concat(Se.replacementClass,"-title-").concat(p||Li()):(v["aria-hidden"]="true",v.focusable="false")),vf({icons:{main:Hd(E),mask:l?Hd(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:x,iconName:g,transform:se(se({},cr),i),symbol:c,title:d,maskId:u,titleId:p,extra:{attributes:v,styles:y,classes:m}})))};var b4={mixout(){return{icon:_4(k4)}},hooks(){return{mutationObserverCallbacks(r){return r.treeCallback=I0,r.nodeCallback=N4,r}}},provides(r){r.i2svg=function(a){const{node:i=We,callback:c=()=>{}}=a;return I0(i,c)},r.generateSvgReplacementMutation=function(a,i){const{iconName:c,title:l,titleId:u,prefix:d,transform:p,symbol:m,mask:v,maskId:y,extra:x}=i;return new Promise((g,E)=>{Promise.all([Zd(c,d),v.iconName?Zd(v.iconName,v.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(b=>{let[w,N]=b;g([a,vf({icons:{main:w,mask:N},prefix:d,iconName:c,transform:p,symbol:m,maskId:y,title:l,titleId:u,extra:x,watchable:!0})])}).catch(E)})},r.generateAbstractIcon=function(a){let{children:i,attributes:c,main:l,transform:u,styles:d}=a;const p=yu(d);p.length>0&&(c.style=p);let m;return pf(u)&&(m=fn("generateAbstractTransformGrouping",{main:l,transform:u,containerWidth:l.width,iconWidth:l.width})),i.push(m||l.icon),{children:i,attributes:c}}}},A4={mixout(){return{layer(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:i=[]}=a;return wu({type:"layer"},()=>{On("beforeDOMElementCreation",{assembler:r,params:a});let c=[];return r(l=>{Array.isArray(l)?l.map(u=>{c=c.concat(u.abstract)}):c=c.concat(l.abstract)}),[{tag:"span",attributes:{class:["".concat(Se.cssPrefix,"-layers"),...i].join(" ")},children:c}]})}}}},C4={mixout(){return{counter(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:i=null,classes:c=[],attributes:l={},styles:u={}}=a;return wu({type:"counter",content:r},()=>(On("beforeDOMElementCreation",{content:r,params:a}),i4({content:r.toString(),title:i,extra:{attributes:l,styles:u,classes:["".concat(Se.cssPrefix,"-layers-counter"),...c]}})))}}}},E4={mixout(){return{text(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:i=cr,title:c=null,classes:l=[],attributes:u={},styles:d={}}=a;return wu({type:"text",content:r},()=>(On("beforeDOMElementCreation",{content:r,params:a}),_0({content:r,transform:se(se({},cr),i),title:c,extra:{attributes:u,styles:d,classes:["".concat(Se.cssPrefix,"-layers-text"),...l]}})))}}},provides(r){r.generateLayersText=function(a,i){const{title:c,transform:l,extra:u}=i;let d=null,p=null;if(mg){const m=parseInt(getComputedStyle(a).fontSize,10),v=a.getBoundingClientRect();d=v.width/m,p=v.height/m}return Se.autoA11y&&!c&&(u.attributes["aria-hidden"]="true"),Promise.resolve([a,_0({content:a.innerHTML,width:d,height:p,transform:l,title:c,extra:u,watchable:!0})])}}};const I4=new RegExp('"',"ug"),R0=[1105920,1112319],P0=se(se(se(se({},{FontAwesome:{normal:"fas",400:"fas"}}),Xx),h3),l3),Vd=Object.keys(P0).reduce((r,a)=>(r[a.toLowerCase()]=P0[a],r),{}),R4=Object.keys(Vd).reduce((r,a)=>{const i=Vd[a];return r[a]=i[900]||[...Object.entries(i)][0][1],r},{});function P4(r){const a=r.replace(I4,""),i=O3(a,0),c=i>=R0[0]&&i<=R0[1],l=a.length===2?a[0]===a[1]:!1;return{value:Fd(l?a[0]:a),isSecondary:c||l}}function L4(r,a){const i=r.replace(/^['"]|['"]$/g,"").toLowerCase(),c=parseInt(a),l=isNaN(c)?"normal":c;return(Vd[i]||{})[l]||R4[i]}function L0(r,a){const i="".concat(g3).concat(a.replace(":","-"));return new Promise((c,l)=>{if(r.getAttribute(i)!==null)return c();const d=ja(r.children).filter(g=>g.getAttribute(Td)===a)[0],p=cn.getComputedStyle(r,a),m=p.getPropertyValue("font-family"),v=m.match(w3),y=p.getPropertyValue("font-weight"),x=p.getPropertyValue("content");if(d&&!v)return r.removeChild(d),c();if(v&&x!=="none"&&x!==""){const g=p.getPropertyValue("content");let E=L4(m,y);const{value:b,isSecondary:w}=P4(g),N=v[0].startsWith("FontAwesome");let _=gf(E,b),k=_;if(N){const I=U3(b);I.iconName&&I.prefix&&(_=I.iconName,E=I.prefix)}if(_&&!w&&(!d||d.getAttribute(cf)!==E||d.getAttribute(df)!==k)){r.setAttribute(i,k),d&&r.removeChild(d);const I=x4(),{extra:z}=I;z.attributes[Td]=a,Zd(_,E).then(O=>{const Z=vf(se(se({},I),{},{icons:{main:O,mask:Tg()},prefix:E,iconName:k,extra:z,watchable:!0})),F=We.createElementNS("http://www.w3.org/2000/svg","svg");a==="::before"?r.insertBefore(F,r.firstChild):r.appendChild(F),F.outerHTML=Z.map(U=>qi(U)).join(`
`),r.removeAttribute(i),c()}).catch(l)}else c()}else c()})}function j4(r){return Promise.all([L0(r,"::before"),L0(r,"::after")])}function M4(r){return r.parentNode!==document.head&&!~y3.indexOf(r.tagName.toUpperCase())&&!r.getAttribute(Td)&&(!r.parentNode||r.parentNode.tagName!=="svg")}function j0(r){if(zr)return new Promise((a,i)=>{const c=ja(r.querySelectorAll("*")).filter(M4).map(j4),l=yf.begin("searchPseudoElements");qg(),Promise.all(c).then(()=>{l(),Gd(),a()}).catch(()=>{l(),Gd(),i()})})}var z4={hooks(){return{mutationObserverCallbacks(r){return r.pseudoElementsCallback=j0,r}}},provides(r){r.pseudoElements2svg=function(a){const{node:i=We}=a;Se.searchPseudoElements&&j0(i)}}};let M0=!1;var T4={mixout(){return{dom:{unwatch(){qg(),M0=!0}}}},hooks(){return{bootstrap(){C0(Bd("mutationObserverCallbacks",{}))},noAuto(){h4()},watch(r){const{observeMutationsRoot:a}=r;M0?Gd():C0(Bd("mutationObserverCallbacks",{observeMutationsRoot:a}))}}}};const z0=r=>{let a={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return r.toLowerCase().split(" ").reduce((i,c)=>{const l=c.toLowerCase().split("-"),u=l[0];let d=l.slice(1).join("-");if(u&&d==="h")return i.flipX=!0,i;if(u&&d==="v")return i.flipY=!0,i;if(d=parseFloat(d),isNaN(d))return i;switch(u){case"grow":i.size=i.size+d;break;case"shrink":i.size=i.size-d;break;case"left":i.x=i.x-d;break;case"right":i.x=i.x+d;break;case"up":i.y=i.y-d;break;case"down":i.y=i.y+d;break;case"rotate":i.rotate=i.rotate+d;break}return i},a)};var O4={mixout(){return{parse:{transform:r=>z0(r)}}},hooks(){return{parseNodeAttributes(r,a){const i=a.getAttribute("data-fa-transform");return i&&(r.transform=z0(i)),r}}},provides(r){r.generateAbstractTransformGrouping=function(a){let{main:i,transform:c,containerWidth:l,iconWidth:u}=a;const d={transform:"translate(".concat(l/2," 256)")},p="translate(".concat(c.x*32,", ").concat(c.y*32,") "),m="scale(".concat(c.size/16*(c.flipX?-1:1),", ").concat(c.size/16*(c.flipY?-1:1),") "),v="rotate(".concat(c.rotate," 0 0)"),y={transform:"".concat(p," ").concat(m," ").concat(v)},x={transform:"translate(".concat(u/2*-1," -256)")},g={outer:d,inner:y,path:x};return{tag:"g",attributes:se({},g.outer),children:[{tag:"g",attributes:se({},g.inner),children:[{tag:i.icon.tag,children:i.icon.children,attributes:se(se({},i.icon.attributes),g.path)}]}]}}}};const wd={x:0,y:0,width:"100%",height:"100%"};function T0(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return r.attributes&&(r.attributes.fill||a)&&(r.attributes.fill="black"),r}function $4(r){return r.tag==="g"?r.children:[r]}var D4={hooks(){return{parseNodeAttributes(r,a){const i=a.getAttribute("data-fa-mask"),c=i?Su(i.split(" ").map(l=>l.trim())):Tg();return c.prefix||(c.prefix=dn()),r.mask=c,r.maskId=a.getAttribute("data-fa-mask-id"),r}}},provides(r){r.generateAbstractMask=function(a){let{children:i,attributes:c,main:l,mask:u,maskId:d,transform:p}=a;const{width:m,icon:v}=l,{width:y,icon:x}=u,g=P3({transform:p,containerWidth:y,iconWidth:m}),E={tag:"rect",attributes:se(se({},wd),{},{fill:"white"})},b=v.children?{children:v.children.map(T0)}:{},w={tag:"g",attributes:se({},g.inner),children:[T0(se({tag:v.tag,attributes:se(se({},v.attributes),g.path)},b))]},N={tag:"g",attributes:se({},g.outer),children:[w]},_="mask-".concat(d||Li()),k="clip-".concat(d||Li()),I={tag:"mask",attributes:se(se({},wd),{},{id:_,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[E,N]},z={tag:"defs",children:[{tag:"clipPath",attributes:{id:k},children:$4(x)},I]};return i.push(z,{tag:"rect",attributes:se({fill:"currentColor","clip-path":"url(#".concat(k,")"),mask:"url(#".concat(_,")")},wd)}),{children:i,attributes:c}}}},F4={provides(r){let a=!1;cn.matchMedia&&(a=cn.matchMedia("(prefers-reduced-motion: reduce)").matches),r.missingIconAbstract=function(){const i=[],c={fill:"currentColor"},l={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};i.push({tag:"path",attributes:se(se({},c),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});const u=se(se({},l),{},{attributeName:"opacity"}),d={tag:"circle",attributes:se(se({},c),{},{cx:"256",cy:"364",r:"28"}),children:[]};return a||d.children.push({tag:"animate",attributes:se(se({},l),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:se(se({},u),{},{values:"1;0;1;1;0;1;"})}),i.push(d),i.push({tag:"path",attributes:se(se({},c),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:a?[]:[{tag:"animate",attributes:se(se({},u),{},{values:"1;0;0;0;0;1;"})}]}),a||i.push({tag:"path",attributes:se(se({},c),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:se(se({},u),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:i}}}},q4={hooks(){return{parseNodeAttributes(r,a){const i=a.getAttribute("data-fa-symbol"),c=i===null?!1:i===""?!0:i;return r.symbol=c,r}}}},B4=[M3,b4,A4,C4,E4,z4,T4,O4,D4,F4,q4];X3(B4,{mixoutsTo:zt});zt.noAuto;zt.config;zt.library;zt.dom;const Kd=zt.parse;zt.findIconDefinition;zt.toHtml;const U4=zt.icon;zt.layer;zt.text;zt.counter;var Nd={exports:{}},_d,O0;function H4(){if(O0)return _d;O0=1;var r="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return _d=r,_d}var kd,$0;function Z4(){if($0)return kd;$0=1;var r=H4();function a(){}function i(){}return i.resetWarningCache=a,kd=function(){function c(d,p,m,v,y,x){if(x!==r){var g=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw g.name="Invariant Violation",g}}c.isRequired=c;function l(){return c}var u={array:c,bigint:c,bool:c,func:c,number:c,object:c,string:c,symbol:c,any:c,arrayOf:l,element:c,elementType:c,instanceOf:l,node:c,objectOf:l,oneOf:l,oneOfType:l,shape:l,exact:l,checkPropTypes:i,resetWarningCache:a};return u.PropTypes=u,u},kd}var D0;function W4(){return D0||(D0=1,Nd.exports=Z4()()),Nd.exports}var G4=W4();const Te=Jd(G4);function F0(r,a){var i=Object.keys(r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(r);a&&(c=c.filter(function(l){return Object.getOwnPropertyDescriptor(r,l).enumerable})),i.push.apply(i,c)}return i}function ur(r){for(var a=1;a<arguments.length;a++){var i=arguments[a]!=null?arguments[a]:{};a%2?F0(Object(i),!0).forEach(function(c){ba(r,c,i[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(i)):F0(Object(i)).forEach(function(c){Object.defineProperty(r,c,Object.getOwnPropertyDescriptor(i,c))})}return r}function ou(r){"@babel/helpers - typeof";return ou=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},ou(r)}function ba(r,a,i){return a in r?Object.defineProperty(r,a,{value:i,enumerable:!0,configurable:!0,writable:!0}):r[a]=i,r}function V4(r,a){if(r==null)return{};var i={},c=Object.keys(r),l,u;for(u=0;u<c.length;u++)l=c[u],!(a.indexOf(l)>=0)&&(i[l]=r[l]);return i}function K4(r,a){if(r==null)return{};var i=V4(r,a),c,l;if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(r);for(l=0;l<u.length;l++)c=u[l],!(a.indexOf(c)>=0)&&Object.prototype.propertyIsEnumerable.call(r,c)&&(i[c]=r[c])}return i}function Yd(r){return Y4(r)||Q4(r)||X4(r)||J4()}function Y4(r){if(Array.isArray(r))return Qd(r)}function Q4(r){if(typeof Symbol<"u"&&r[Symbol.iterator]!=null||r["@@iterator"]!=null)return Array.from(r)}function X4(r,a){if(r){if(typeof r=="string")return Qd(r,a);var i=Object.prototype.toString.call(r).slice(8,-1);if(i==="Object"&&r.constructor&&(i=r.constructor.name),i==="Map"||i==="Set")return Array.from(r);if(i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return Qd(r,a)}}function Qd(r,a){(a==null||a>r.length)&&(a=r.length);for(var i=0,c=new Array(a);i<a;i++)c[i]=r[i];return c}function J4(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function e5(r){var a,i=r.beat,c=r.fade,l=r.beatFade,u=r.bounce,d=r.shake,p=r.flash,m=r.spin,v=r.spinPulse,y=r.spinReverse,x=r.pulse,g=r.fixedWidth,E=r.inverse,b=r.border,w=r.listItem,N=r.flip,_=r.size,k=r.rotation,I=r.pull,z=(a={"fa-beat":i,"fa-fade":c,"fa-beat-fade":l,"fa-bounce":u,"fa-shake":d,"fa-flash":p,"fa-spin":m,"fa-spin-reverse":y,"fa-spin-pulse":v,"fa-pulse":x,"fa-fw":g,"fa-inverse":E,"fa-border":b,"fa-li":w,"fa-flip":N===!0,"fa-flip-horizontal":N==="horizontal"||N==="both","fa-flip-vertical":N==="vertical"||N==="both"},ba(a,"fa-".concat(_),typeof _<"u"&&_!==null),ba(a,"fa-rotate-".concat(k),typeof k<"u"&&k!==null&&k!==0),ba(a,"fa-pull-".concat(I),typeof I<"u"&&I!==null),ba(a,"fa-swap-opacity",r.swapOpacity),a);return Object.keys(z).map(function(O){return z[O]?O:null}).filter(function(O){return O})}function t5(r){return r=r-0,r===r}function Ug(r){return t5(r)?r:(r=r.replace(/[\-_\s]+(.)?/g,function(a,i){return i?i.toUpperCase():""}),r.substr(0,1).toLowerCase()+r.substr(1))}var r5=["style"];function n5(r){return r.charAt(0).toUpperCase()+r.slice(1)}function a5(r){return r.split(";").map(function(a){return a.trim()}).filter(function(a){return a}).reduce(function(a,i){var c=i.indexOf(":"),l=Ug(i.slice(0,c)),u=i.slice(c+1).trim();return l.startsWith("webkit")?a[n5(l)]=u:a[l]=u,a},{})}function Hg(r,a){var i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof a=="string")return a;var c=(a.children||[]).map(function(m){return Hg(r,m)}),l=Object.keys(a.attributes||{}).reduce(function(m,v){var y=a.attributes[v];switch(v){case"class":m.attrs.className=y,delete a.attributes.class;break;case"style":m.attrs.style=a5(y);break;default:v.indexOf("aria-")===0||v.indexOf("data-")===0?m.attrs[v.toLowerCase()]=y:m.attrs[Ug(v)]=y}return m},{attrs:{}}),u=i.style,d=u===void 0?{}:u,p=K4(i,r5);return l.attrs.style=ur(ur({},l.attrs.style),d),r.apply(void 0,[a.tag,ur(ur({},l.attrs),p)].concat(Yd(c)))}var Zg=!1;try{Zg=!0}catch{}function i5(){if(!Zg&&console&&typeof console.error=="function"){var r;(r=console).error.apply(r,arguments)}}function q0(r){if(r&&ou(r)==="object"&&r.prefix&&r.iconName&&r.icon)return r;if(Kd.icon)return Kd.icon(r);if(r===null)return null;if(r&&ou(r)==="object"&&r.prefix&&r.iconName)return r;if(Array.isArray(r)&&r.length===2)return{prefix:r[0],iconName:r[1]};if(typeof r=="string")return{prefix:"fas",iconName:r}}function bd(r,a){return Array.isArray(a)&&a.length>0||!Array.isArray(a)&&a?ba({},r,a):{}}var B0={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1},X=qe.forwardRef(function(r,a){var i=ur(ur({},B0),r),c=i.icon,l=i.mask,u=i.symbol,d=i.className,p=i.title,m=i.titleId,v=i.maskId,y=q0(c),x=bd("classes",[].concat(Yd(e5(i)),Yd((d||"").split(" ")))),g=bd("transform",typeof i.transform=="string"?Kd.transform(i.transform):i.transform),E=bd("mask",q0(l)),b=U4(y,ur(ur(ur(ur({},x),g),E),{},{symbol:u,title:p,titleId:m,maskId:v}));if(!b)return i5("Could not find icon",y),null;var w=b.abstract,N={ref:a};return Object.keys(i).forEach(function(_){B0.hasOwnProperty(_)||(N[_]=i[_])}),s5(w[0],N)});X.displayName="FontAwesomeIcon";X.propTypes={beat:Te.bool,border:Te.bool,beatFade:Te.bool,bounce:Te.bool,className:Te.string,fade:Te.bool,flash:Te.bool,mask:Te.oneOfType([Te.object,Te.array,Te.string]),maskId:Te.string,fixedWidth:Te.bool,inverse:Te.bool,flip:Te.oneOf([!0,!1,"horizontal","vertical","both"]),icon:Te.oneOfType([Te.object,Te.array,Te.string]),listItem:Te.bool,pull:Te.oneOf(["right","left"]),pulse:Te.bool,rotation:Te.oneOf([0,90,180,270]),shake:Te.bool,size:Te.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:Te.bool,spinPulse:Te.bool,spinReverse:Te.bool,symbol:Te.oneOfType([Te.bool,Te.string]),title:Te.string,titleId:Te.string,transform:Te.oneOfType([Te.string,Te.object]),swapOpacity:Te.bool};var s5=Hg.bind(null,qe.createElement);/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */const o5={prefix:"fas",iconName:"calendar-days",icon:[448,512,["calendar-alt"],"f073","M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"]},l5=o5,Xd={prefix:"fas",iconName:"fire-flame-simple",icon:[384,512,["burn"],"f46a","M372.5 256.5l-.7-1.9C337.8 160.8 282 76.5 209.1 8.5l-3.3-3C202.1 2 197.1 0 192 0s-10.1 2-13.8 5.5l-3.3 3C102 76.5 46.2 160.8 12.2 254.6l-.7 1.9C3.9 277.3 0 299.4 0 321.6C0 426.7 86.8 512 192 512s192-85.3 192-190.4c0-22.2-3.9-44.2-11.5-65.1zm-90.8 49.5c4.1 9.3 6.2 19.4 6.2 29.5c0 53-43 96.5-96 96.5s-96-43.5-96-96.5c0-10.1 2.1-20.3 6.2-29.5l1.9-4.3c15.8-35.4 37.9-67.7 65.3-95.1l8.9-8.9c3.6-3.6 8.5-5.6 13.6-5.6s10 2 13.6 5.6l8.9 8.9c27.4 27.4 49.6 59.7 65.3 95.1l1.9 4.3z"]},u5={prefix:"fas",iconName:"bars",icon:[448,512,["navicon"],"f0c9","M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"]},c5={prefix:"fas",iconName:"square-check",icon:[448,512,[9745,9989,61510,"check-square"],"f14a","M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"]},d5=c5,f5={prefix:"fas",iconName:"list",icon:[512,512,["list-squares"],"f03a","M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z"]},m5={prefix:"fas",iconName:"gamepad",icon:[640,512,[],"f11b","M192 64C86 64 0 150 0 256S86 448 192 448l256 0c106 0 192-86 192-192s-86-192-192-192L192 64zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24l0 32 32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0 0 32c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-32-32 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l32 0 0-32z"]},Wg={prefix:"fas",iconName:"lock",icon:[448,512,[128274],"f023","M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"]},Mi={prefix:"fas",iconName:"eye-slash",icon:[640,512,[],"f070","M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"]},p5={prefix:"fas",iconName:"chevron-up",icon:[512,512,[],"f077","M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"]},Ca={prefix:"fas",iconName:"star",icon:[576,512,[11088,61446],"f005","M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"]},Gg={prefix:"fas",iconName:"right-to-bracket",icon:[512,512,["sign-in-alt"],"f2f6","M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"]},h5={prefix:"fas",iconName:"circle-check",icon:[512,512,[61533,"check-circle"],"f058","M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"]},lu=h5,Vg={prefix:"fas",iconName:"certificate",icon:[512,512,[],"f0a3","M211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.4-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z"]},g5={prefix:"fas",iconName:"shield-halved",icon:[512,512,["shield-alt"],"f3ed","M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8l0 378.1C394 378 431.1 230.1 432 141.4L256 66.8s0 0 0 0z"]},v5=g5,uu={prefix:"fas",iconName:"chart-line",icon:[512,512,["line-chart"],"f201","M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"]},ru={prefix:"fas",iconName:"arrow-right",icon:[448,512,[8594],"f061","M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"]},y5={prefix:"fas",iconName:"circle-question",icon:[512,512,[62108,"question-circle"],"f059","M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"]},Pr=y5,zi={prefix:"fas",iconName:"eye",icon:[576,512,[128065],"f06e","M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"]},x5={prefix:"fas",iconName:"arrow-rotate-right",icon:[512,512,[8635,"arrow-right-rotate","arrow-rotate-forward","redo"],"f01e","M386.3 160L336 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"]},S5=x5,Kg={prefix:"fas",iconName:"arrow-left",icon:[448,512,[8592],"f060","M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"]},w5={prefix:"fas",iconName:"circle-info",icon:[512,512,["info-circle"],"f05a","M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"]},Ei=w5,fr={prefix:"fas",iconName:"calendar-check",icon:[448,512,[],"f274","M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zM329 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-95 95-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L329 305z"]},N5={prefix:"fas",iconName:"rectangle-list",icon:[576,512,["list-alt"],"f022","M0 96C0 60.7 28.7 32 64 32l448 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM128 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm32-128a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM128 384a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm96-248c-13.3 0-24 10.7-24 24s10.7 24 24 24l224 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-224 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l224 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-224 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l224 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-224 0z"]},Ad=N5,Yg={prefix:"fas",iconName:"house",icon:[576,512,[127968,63498,63500,"home","home-alt","home-lg-alt"],"f015","M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"]},_5=Yg,Ti={prefix:"fas",iconName:"medal",icon:[512,512,[127941],"f5a2","M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0L133.9 0c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0L487.4 0C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"]},uo={prefix:"fas",iconName:"arrow-down",icon:[384,512,[8595],"f063","M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"]},k5={prefix:"fas",iconName:"chevron-down",icon:[512,512,[],"f078","M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"]},b5={prefix:"fas",iconName:"ranking-star",icon:[640,512,[],"e561","M353.8 54.1L330.2 6.3c-3.9-8.3-16.1-8.6-20.4 0L286.2 54.1l-52.3 7.5c-9.3 1.4-13.3 12.9-6.4 19.8l38 37-9 52.1c-1.4 9.3 8.2 16.5 16.8 12.2l46.9-24.8 46.6 24.4c8.6 4.3 18.3-2.9 16.8-12.2l-9-52.1 38-36.6c6.8-6.8 2.9-18.3-6.4-19.8l-52.3-7.5zM256 256c-17.7 0-32 14.3-32 32l0 192c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-192c0-17.7-14.3-32-32-32l-128 0zM32 320c-17.7 0-32 14.3-32 32L0 480c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L32 320zm416 96l0 64c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-128 0c-17.7 0-32 14.3-32 32z"]},co={prefix:"fas",iconName:"arrow-up",icon:[384,512,[8593],"f062","M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"]},U0={prefix:"fas",iconName:"circle-user",icon:[512,512,[62142,"user-circle"],"f2bd","M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"]},Qg={prefix:"fas",iconName:"xmark",icon:[384,512,[128473,10005,10006,10060,215,"close","multiply","remove","times"],"f00d","M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"]},A5=Qg,C5={prefix:"fas",iconName:"chalkboard-user",icon:[640,512,["chalkboard-teacher"],"f51c","M160 64c0-35.3 28.7-64 64-64L576 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-239.2 0c-11.8-25.5-29.9-47.5-52.4-64l99.6 0 0-32c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 32 64 0 0-288L224 64l0 49.1C205.2 102.2 183.3 96 160 96l0-32zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352l53.3 0C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7L26.7 512C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z"]},E5=C5,Cd={prefix:"fas",iconName:"chevron-right",icon:[320,512,[9002],"f054","M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"]},jt={prefix:"fas",iconName:"trophy",icon:[576,512,[127942],"f091","M400 0L176 0c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8L24 64C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9L192 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-26.1 0C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24L446.4 64c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112l84.4 0c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6l84.4 0c-5.1 66.3-31.1 111.2-63 142.3z"]},Ia={prefix:"fas",iconName:"spinner",icon:[512,512,[],"f110","M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"]},cu={prefix:"fas",iconName:"award",icon:[384,512,[],"f559","M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7L344.5 83c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7L301 344.5c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2 .8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1 .4 14.2-1.5 20.1-5.4L173.8 5.5zM272 192a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM1.3 441.8L44.4 339.3c.2 .1 .3 .2 .4 .4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7 .2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2L74.4 455.5l-56.1 8.3c-5.7 .8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1 .4-.2 .7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2 .2-.3 .4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z"]},du={prefix:"fas",iconName:"shield",icon:[512,512,[128737,"shield-blank"],"f132","M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"]},I5={prefix:"fas",iconName:"book",icon:[448,512,[128212],"f02d","M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"]},Oi={prefix:"fas",iconName:"check",icon:[448,512,[10003,10004],"f00c","M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"]},R5={prefix:"fas",iconName:"triangle-exclamation",icon:[512,512,[9888,"exclamation-triangle","warning"],"f071","M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"]},Bi=R5,P5={prefix:"fas",iconName:"circle-xmark",icon:[512,512,[61532,"times-circle","xmark-circle"],"f057","M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"]},L5=P5,fu={prefix:"fas",iconName:"graduation-cap",icon:[640,512,[127891,"mortar-board"],"f19d","M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9l0 28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5l0-24.6c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z"]},j5=()=>{const[r,a]=R.useState(!1),[i,c]=R.useState(!1),[l,u]=R.useState(!1),[d,p]=R.useState(!1),[m,v]=R.useState({username:"",password:""}),[y,x]=R.useState(null),g=20;R.useEffect(()=>(window.onbeforeunload=null,()=>{window.onbeforeunload=null}),[]),R.useEffect(()=>{const _=localStorage.getItem("rememberedUser");if(_)try{const k=JSON.parse(_);v({username:k.username||"",password:k.password||""}),p(!0),console.log("Loaded remembered credentials for:",k.username)}catch(k){console.error("Error parsing saved credentials:",k),localStorage.removeItem("rememberedUser")}},[]);const E=_=>{const{name:k,value:I}=_.target;I.length<=g&&v(z=>({...z,[k]:I}))},b=_=>{p(_.target.checked)},w=async _=>{if(_.preventDefault(),!m.username||!m.password){we.error("Please fill in all fields");return}c(!0);try{console.log("Attempting login with:",{username:m.username,remember_me:d});const k=await fetch("http://localhost:5000/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:m.username,password:m.password,remember_me:d})}),I=await k.json();if(console.log("server response:",I),!k.ok)throw new Error(I.error||"Login Failed");x(I),d?(console.log("Storing credentials in localStorage"),localStorage.setItem("rememberedUser",JSON.stringify({username:m.username,password:m.password,token:I.remember_token}))):localStorage.removeItem("rememberedUser"),setTimeout(()=>{c(!1),a(!0)},1500)}catch(k){console.error("Login error:",k),c(!1),we.error(k.message)}},N=()=>{sessionStorage.setItem("isAuthenticated","true"),sessionStorage.setItem("username",m.username),y&&y.user&&y.user.id?sessionStorage.setItem("userId",y.user.id.toString()):(sessionStorage.setItem("userId","1"),console.warn("UserId, not found in login response, using default")),we.success("Login successful!",{position:"top-center",autoClose:1500,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark",onClose:()=>{window.location.href=Ae.DASHBOARD}})};return o.jsx(o.Fragment,{children:r?o.jsx(ug,{onSuccess:N,onCancel:()=>a(!1)}):o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"sidebar",children:o.jsx("h3",{className:"sidebar-title",children:"Social Engineering Application"})}),o.jsx("div",{className:"content-wrapper",children:o.jsxs("div",{className:"form-container",children:[o.jsx("h2",{children:"Welcome Back!"}),o.jsxs("form",{className:"login-form",onSubmit:w,children:[o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",htmlFor:"username",children:"Username:"}),o.jsxs("div",{className:"input-wrapper",children:[o.jsx("input",{type:"text",id:"username",name:"username",placeholder:"Enter your Username",className:"form-input",value:m.username,onChange:E,required:!0,disabled:i}),o.jsxs("span",{className:"char-count",children:[m.username.length,"/",g]})]})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",htmlFor:"password",children:"Password:"}),o.jsxs("div",{className:"input-wrapper",children:[o.jsx("input",{type:l?"text":"password",id:"password",name:"password",placeholder:"Enter your password",className:"form-input",value:m.password,onChange:E,required:!0,disabled:i}),o.jsx("button",{type:"button",className:"toggle-password-btn",onClick:()=>u(!l),"aria-label":l?"Hide password":"Show password",children:o.jsx(X,{icon:l?zi:Mi,style:{color:"#ffffff"}})}),o.jsxs("span",{className:"char-count",children:[m.password.length,"/",g]})]})]}),o.jsxs("div",{className:"login-options-row",children:[o.jsx("div",{className:"remember-me-container",children:o.jsxs("label",{className:"remember-me-label",children:[o.jsx("input",{type:"checkbox",checked:d,onChange:b,className:"remember-me-checkbox"}),o.jsx("span",{children:"Keep me logged in "})]})}),o.jsx("div",{className:"forgot-password-container",children:o.jsx(Rr,{to:Ae.FORGOT_PASSWORD,className:"forgot-password-link",children:"Forgot Password?"})})]}),o.jsx("button",{type:"submit",className:"login-btn",disabled:i,children:i?o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"},children:[o.jsx("span",{style:{width:"20px",height:"20px",border:"3px solid #ffffff",borderTop:"3px solid transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}),"Verifying..."]}):o.jsxs(o.Fragment,{children:[o.jsx("span",{children:"Login"}),o.jsx(X,{icon:Gg,style:{marginLeft:"8px"}})]})}),o.jsxs("div",{className:"register-container",children:[o.jsx("span",{children:"Don't have an account? "}),o.jsx(Rr,{to:Ae.REGISTER,className:"register-link",children:"Register here"})]})]})]})}),o.jsx("style",{jsx:!0,children:`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            .login-btn {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
            }
            .char-count {
              top: 28px !important;
            }
            .toggle-password-btn {
              top: 28px !important;
            }
            .login-options-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 0.75rem 0 1rem 0;
            }
            .remember-me-container {
              display: flex;
              align-items: center;
              height: 10px;
            }
            .remember-me-label {
              display: flex;
              align-items: center;
              cursor: pointer;
              user-select: none;
              font-size: 0.9rem;
              margin-top: -5px;
            }
            .remember-me-checkbox {
              margin-right: 8px;
              width: 16px;
              height: 16px;
              cursor: pointer;
            }
            .forgot-password-container {
              text-align: right;
              position: relative;
              z-index: 1;
              margin-top: -5px;
            }
            .forgot-password-link {
              color: #646cff;
              font-size: 0.9rem;
              text-decoration: none;
              display: inline-block;
            }
            .forgot-password-link:hover {
              text-decoration: underline;
            }
          `})]})})};var fo={exports:{}},mo={exports:{}},po={exports:{}},H0;function le(){return H0||(H0=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=c;function i(l){"@babel/helpers - typeof";return i=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(u){return typeof u}:function(u){return u&&typeof Symbol=="function"&&u.constructor===Symbol&&u!==Symbol.prototype?"symbol":typeof u},i(l)}function c(l){var u=typeof l=="string"||l instanceof String;if(!u){var d=i(l);throw l===null?d="null":d==="object"&&(d=l.constructor.name),new TypeError("Expected a string but received a ".concat(d))}}r.exports=a.default,r.exports.default=a.default}(po,po.exports)),po.exports}var Z0;function Sf(){return Z0||(Z0=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var i=c(le());function c(u){return u&&u.__esModule?u:{default:u}}function l(u){return(0,i.default)(u),u=Date.parse(u),isNaN(u)?null:new Date(u)}r.exports=a.default,r.exports.default=a.default}(mo,mo.exports)),mo.exports}var ho={exports:{}},fa={},et={},W0;function Ui(){if(W0)return et;W0=1,Object.defineProperty(et,"__esModule",{value:!0}),et.farsiLocales=et.englishLocales=et.dotDecimal=et.decimal=et.commaDecimal=et.bengaliLocales=et.arabicLocales=et.alphanumeric=et.alpha=void 0;for(var r=et.alpha={"en-US":/^[A-Z]+$/i,"az-AZ":/^[A-VXYZÇƏĞİıÖŞÜ]+$/i,"bg-BG":/^[А-Я]+$/i,"cs-CZ":/^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,"da-DK":/^[A-ZÆØÅ]+$/i,"de-DE":/^[A-ZÄÖÜß]+$/i,"el-GR":/^[Α-ώ]+$/i,"es-ES":/^[A-ZÁÉÍÑÓÚÜ]+$/i,"fa-IR":/^[ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/i,"fi-FI":/^[A-ZÅÄÖ]+$/i,"fr-FR":/^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,"it-IT":/^[A-ZÀÉÈÌÎÓÒÙ]+$/i,"ja-JP":/^[ぁ-んァ-ヶｦ-ﾟ一-龠ー・。、]+$/i,"nb-NO":/^[A-ZÆØÅ]+$/i,"nl-NL":/^[A-ZÁÉËÏÓÖÜÚ]+$/i,"nn-NO":/^[A-ZÆØÅ]+$/i,"hu-HU":/^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,"pl-PL":/^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,"pt-PT":/^[A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,"ru-RU":/^[А-ЯЁ]+$/i,"kk-KZ":/^[А-ЯЁ\u04D8\u04B0\u0406\u04A2\u0492\u04AE\u049A\u04E8\u04BA]+$/i,"sl-SI":/^[A-ZČĆĐŠŽ]+$/i,"sk-SK":/^[A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,"sr-RS@latin":/^[A-ZČĆŽŠĐ]+$/i,"sr-RS":/^[А-ЯЂЈЉЊЋЏ]+$/i,"sv-SE":/^[A-ZÅÄÖ]+$/i,"th-TH":/^[ก-๐\s]+$/i,"tr-TR":/^[A-ZÇĞİıÖŞÜ]+$/i,"uk-UA":/^[А-ЩЬЮЯЄIЇҐі]+$/i,"vi-VN":/^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,"ko-KR":/^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/,"ku-IQ":/^[ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,ar:/^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,he:/^[א-ת]+$/,fa:/^['آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی']+$/i,bn:/^['ঀঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣৰৱ৲৳৴৵৶৷৸৹৺৻']+$/,eo:/^[ABCĈD-GĜHĤIJĴK-PRSŜTUŬVZ]+$/i,"hi-IN":/^[\u0900-\u0961]+[\u0972-\u097F]*$/i,"si-LK":/^[\u0D80-\u0DFF]+$/},a=et.alphanumeric={"en-US":/^[0-9A-Z]+$/i,"az-AZ":/^[0-9A-VXYZÇƏĞİıÖŞÜ]+$/i,"bg-BG":/^[0-9А-Я]+$/i,"cs-CZ":/^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,"da-DK":/^[0-9A-ZÆØÅ]+$/i,"de-DE":/^[0-9A-ZÄÖÜß]+$/i,"el-GR":/^[0-9Α-ω]+$/i,"es-ES":/^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,"fi-FI":/^[0-9A-ZÅÄÖ]+$/i,"fr-FR":/^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,"it-IT":/^[0-9A-ZÀÉÈÌÎÓÒÙ]+$/i,"ja-JP":/^[0-9０-９ぁ-んァ-ヶｦ-ﾟ一-龠ー・。、]+$/i,"hu-HU":/^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,"nb-NO":/^[0-9A-ZÆØÅ]+$/i,"nl-NL":/^[0-9A-ZÁÉËÏÓÖÜÚ]+$/i,"nn-NO":/^[0-9A-ZÆØÅ]+$/i,"pl-PL":/^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,"pt-PT":/^[0-9A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,"ru-RU":/^[0-9А-ЯЁ]+$/i,"kk-KZ":/^[0-9А-ЯЁ\u04D8\u04B0\u0406\u04A2\u0492\u04AE\u049A\u04E8\u04BA]+$/i,"sl-SI":/^[0-9A-ZČĆĐŠŽ]+$/i,"sk-SK":/^[0-9A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,"sr-RS@latin":/^[0-9A-ZČĆŽŠĐ]+$/i,"sr-RS":/^[0-9А-ЯЂЈЉЊЋЏ]+$/i,"sv-SE":/^[0-9A-ZÅÄÖ]+$/i,"th-TH":/^[ก-๙\s]+$/i,"tr-TR":/^[0-9A-ZÇĞİıÖŞÜ]+$/i,"uk-UA":/^[0-9А-ЩЬЮЯЄIЇҐі]+$/i,"ko-KR":/^[0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/,"ku-IQ":/^[٠١٢٣٤٥٦٧٨٩0-9ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,"vi-VN":/^[0-9A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,ar:/^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,he:/^[0-9א-ת]+$/,fa:/^['0-9آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی۱۲۳۴۵۶۷۸۹۰']+$/i,bn:/^['ঀঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣ০১২৩৪৫৬৭৮৯ৰৱ৲৳৴৵৶৷৸৹৺৻']+$/,eo:/^[0-9ABCĈD-GĜHĤIJĴK-PRSŜTUŬVZ]+$/i,"hi-IN":/^[\u0900-\u0963]+[\u0966-\u097F]*$/i,"si-LK":/^[0-9\u0D80-\u0DFF]+$/},i=et.decimal={"en-US":".",ar:"٫"},c=et.englishLocales=["AU","GB","HK","IN","NZ","ZA","ZM"],l,u=0;u<c.length;u++)l="en-".concat(c[u]),r[l]=r["en-US"],a[l]=a["en-US"],i[l]=i["en-US"];for(var d=et.arabicLocales=["AE","BH","DZ","EG","IQ","JO","KW","LB","LY","MA","QM","QA","SA","SD","SY","TN","YE"],p,m=0;m<d.length;m++)p="ar-".concat(d[m]),r[p]=r.ar,a[p]=a.ar,i[p]=i.ar;for(var v=et.farsiLocales=["IR","AF"],y,x=0;x<v.length;x++)y="fa-".concat(v[x]),a[y]=a.fa,i[y]=i.ar;for(var g=et.bengaliLocales=["BD","IN"],E,b=0;b<g.length;b++)E="bn-".concat(g[b]),r[E]=r.bn,a[E]=a.bn,i[E]=i["en-US"];for(var w=et.dotDecimal=["ar-EG","ar-LB","ar-LY"],N=et.commaDecimal=["bg-BG","cs-CZ","da-DK","de-DE","el-GR","en-ZM","eo","es-ES","fr-CA","fr-FR","id-ID","it-IT","ku-IQ","hi-IN","hu-HU","nb-NO","nn-NO","nl-NL","pl-PL","pt-PT","ru-RU","kk-KZ","si-LK","sl-SI","sr-RS@latin","sr-RS","sv-SE","tr-TR","uk-UA","vi-VN"],_=0;_<w.length;_++)i[w[_]]=i["en-US"];for(var k=0;k<N.length;k++)i[N[k]]=",";return r["fr-CA"]=r["fr-FR"],a["fr-CA"]=a["fr-FR"],r["pt-BR"]=r["pt-PT"],a["pt-BR"]=a["pt-PT"],i["pt-BR"]=i["pt-PT"],r["pl-Pl"]=r["pl-PL"],a["pl-Pl"]=a["pl-PL"],i["pl-Pl"]=i["pl-PL"],r["fa-AF"]=r.fa,et}var G0;function Xg(){if(G0)return fa;G0=1,Object.defineProperty(fa,"__esModule",{value:!0}),fa.default=c,fa.locales=void 0;var r=i(le()),a=Ui();function i(l){return l&&l.__esModule?l:{default:l}}function c(l,u){(0,r.default)(l),u=u||{};var d=new RegExp("^(?:[-+])?(?:[0-9]+)?(?:\\".concat(u.locale?a.decimal[u.locale]:".","[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$"));if(l===""||l==="."||l===","||l==="-"||l==="+")return!1;var p=parseFloat(l.replace(",","."));return d.test(l)&&(!u.hasOwnProperty("min")||p>=u.min)&&(!u.hasOwnProperty("max")||p<=u.max)&&(!u.hasOwnProperty("lt")||p<u.lt)&&(!u.hasOwnProperty("gt")||p>u.gt)}return fa.locales=Object.keys(a.decimal),fa}var V0;function Jg(){return V0||(V0=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var i=c(Xg());function c(u){return u&&u.__esModule?u:{default:u}}function l(u){return(0,i.default)(u)?parseFloat(u):NaN}r.exports=a.default,r.exports.default=a.default}(ho,ho.exports)),ho.exports}var go={exports:{}},K0;function M5(){return K0||(K0=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var i=c(le());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d){return(0,i.default)(u),parseInt(u,d||10)}r.exports=a.default,r.exports.default=a.default}(go,go.exports)),go.exports}var vo={exports:{}},Y0;function z5(){return Y0||(Y0=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var i=c(le());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d){return(0,i.default)(u),d?u==="1"||/^true$/i.test(u):u!=="0"&&!/^false$/i.test(u)&&u!==""}r.exports=a.default,r.exports.default=a.default}(vo,vo.exports)),vo.exports}var yo={exports:{}},Q0;function T5(){return Q0||(Q0=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var i=c(le());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d){return(0,i.default)(u),u===d}r.exports=a.default,r.exports.default=a.default}(yo,yo.exports)),yo.exports}var xo={exports:{}},So={exports:{}},X0;function ev(){return X0||(X0=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=c;function i(l){"@babel/helpers - typeof";return i=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(u){return typeof u}:function(u){return u&&typeof Symbol=="function"&&u.constructor===Symbol&&u!==Symbol.prototype?"symbol":typeof u},i(l)}function c(l){return i(l)==="object"&&l!==null?typeof l.toString=="function"?l=l.toString():l="[object Object]":(l===null||typeof l>"u"||isNaN(l)&&!l.length)&&(l=""),String(l)}r.exports=a.default,r.exports.default=a.default}(So,So.exports)),So.exports}var wo={exports:{}},J0;function wt(){return J0||(J0=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=i;function i(){var c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},l=arguments.length>1?arguments[1]:void 0;for(var u in l)typeof c[u]>"u"&&(c[u]=l[u]);return c}r.exports=a.default,r.exports.default=a.default}(wo,wo.exports)),wo.exports}var eh;function O5(){return eh||(eh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=p;var i=u(le()),c=u(ev()),l=u(wt());function u(m){return m&&m.__esModule?m:{default:m}}var d={ignoreCase:!1,minOccurrences:1};function p(m,v,y){return(0,i.default)(m),y=(0,l.default)(y,d),y.ignoreCase?m.toLowerCase().split((0,c.default)(v).toLowerCase()).length>y.minOccurrences:m.split((0,c.default)(v)).length>y.minOccurrences}r.exports=a.default,r.exports.default=a.default}(xo,xo.exports)),xo.exports}var No={exports:{}},th;function $5(){return th||(th=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var i=c(le());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d,p){return(0,i.default)(u),Object.prototype.toString.call(d)!=="[object RegExp]"&&(d=new RegExp(d,p)),!!u.match(d)}r.exports=a.default,r.exports.default=a.default}(No,No.exports)),No.exports}var _o={exports:{}},ko={exports:{}},rh;function tv(){return rh||(rh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}function l(d){"@babel/helpers - typeof";return l=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(p){return typeof p}:function(p){return p&&typeof Symbol=="function"&&p.constructor===Symbol&&p!==Symbol.prototype?"symbol":typeof p},l(d)}function u(d,p){(0,i.default)(d);var m,v;l(p)==="object"?(m=p.min||0,v=p.max):(m=arguments[1],v=arguments[2]);var y=encodeURI(d).split(/%..|./).length-1;return y>=m&&(typeof v>"u"||y<=v)}r.exports=a.default,r.exports.default=a.default}(ko,ko.exports)),ko.exports}var bo={exports:{}},nh;function wf(){return nh||(nh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var i=l(le()),c=l(wt());function l(p){return p&&p.__esModule?p:{default:p}}var u={require_tld:!0,allow_underscores:!1,allow_trailing_dot:!1,allow_numeric_tld:!1,allow_wildcard:!1,ignore_max_length:!1};function d(p,m){(0,i.default)(p),m=(0,c.default)(m,u),m.allow_trailing_dot&&p[p.length-1]==="."&&(p=p.substring(0,p.length-1)),m.allow_wildcard===!0&&p.indexOf("*.")===0&&(p=p.substring(2));var v=p.split("."),y=v[v.length-1];return m.require_tld&&(v.length<2||!m.allow_numeric_tld&&!/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(y)||/\s/.test(y))||!m.allow_numeric_tld&&/^\d+$/.test(y)?!1:v.every(function(x){return!(x.length>63&&!m.ignore_max_length||!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(x)||/[\uff01-\uff5e]/.test(x)||/^-|-$/.test(x)||!m.allow_underscores&&/_/.test(x))})}r.exports=a.default,r.exports.default=a.default}(bo,bo.exports)),bo.exports}var Ao={exports:{}},ah;function Nu(){return ah||(ah=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=v;var i=c(le());function c(y){return y&&y.__esModule?y:{default:y}}var l="(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])",u="(".concat(l,"[.]){3}").concat(l),d=new RegExp("^".concat(u,"$")),p="(?:[0-9a-fA-F]{1,4})",m=new RegExp("^("+"(?:".concat(p,":){7}(?:").concat(p,"|:)|")+"(?:".concat(p,":){6}(?:").concat(u,"|:").concat(p,"|:)|")+"(?:".concat(p,":){5}(?::").concat(u,"|(:").concat(p,"){1,2}|:)|")+"(?:".concat(p,":){4}(?:(:").concat(p,"){0,1}:").concat(u,"|(:").concat(p,"){1,3}|:)|")+"(?:".concat(p,":){3}(?:(:").concat(p,"){0,2}:").concat(u,"|(:").concat(p,"){1,4}|:)|")+"(?:".concat(p,":){2}(?:(:").concat(p,"){0,3}:").concat(u,"|(:").concat(p,"){1,5}|:)|")+"(?:".concat(p,":){1}(?:(:").concat(p,"){0,4}:").concat(u,"|(:").concat(p,"){1,6}|:)|")+"(?::((?::".concat(p,"){0,5}:").concat(u,"|(?::").concat(p,"){1,7}|:))")+")(%[0-9a-zA-Z-.:]{1,})?$");function v(y){var x=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return(0,i.default)(y),x=String(x),x?x==="4"?d.test(y):x==="6"?m.test(y):!1:v(y,4)||v(y,6)}r.exports=a.default,r.exports.default=a.default}(Ao,Ao.exports)),Ao.exports}var ih;function rv(){return ih||(ih=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=_;var i=p(le()),c=p(tv()),l=p(wf()),u=p(Nu()),d=p(wt());function p(k){return k&&k.__esModule?k:{default:k}}var m={allow_display_name:!1,allow_underscores:!1,require_display_name:!1,allow_utf8_local_part:!0,require_tld:!0,blacklisted_chars:"",ignore_max_length:!1,host_blacklist:[],host_whitelist:[]},v=/^([^\x00-\x1F\x7F-\x9F\cX]+)</i,y=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i,x=/^[a-z\d]+$/,g=/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i,E=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A1-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i,b=/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i,w=254;function N(k){var I=k.replace(/^"(.+)"$/,"$1");if(!I.trim())return!1;var z=/[\.";<>]/.test(I);if(z){if(I===k)return!1;var O=I.split('"').length===I.split('\\"').length;if(!O)return!1}return!0}function _(k,I){if((0,i.default)(k),I=(0,d.default)(I,m),I.require_display_name||I.allow_display_name){var z=k.match(v);if(z){var O=z[1];if(k=k.replace(O,"").replace(/(^<|>$)/g,""),O.endsWith(" ")&&(O=O.slice(0,-1)),!N(O))return!1}else if(I.require_display_name)return!1}if(!I.ignore_max_length&&k.length>w)return!1;var Z=k.split("@"),F=Z.pop(),U=F.toLowerCase();if(I.host_blacklist.includes(U)||I.host_whitelist.length>0&&!I.host_whitelist.includes(U))return!1;var Q=Z.join("@");if(I.domain_specific_validation&&(U==="gmail.com"||U==="googlemail.com")){Q=Q.toLowerCase();var T=Q.split("+")[0];if(!(0,c.default)(T.replace(/\./g,""),{min:6,max:30}))return!1;for(var J=T.split("."),me=0;me<J.length;me++)if(!x.test(J[me]))return!1}if(I.ignore_max_length===!1&&(!(0,c.default)(Q,{max:64})||!(0,c.default)(F,{max:254})))return!1;if(!(0,l.default)(F,{require_tld:I.require_tld,ignore_max_length:I.ignore_max_length,allow_underscores:I.allow_underscores})){if(!I.allow_ip_domain)return!1;if(!(0,u.default)(F)){if(!F.startsWith("[")||!F.endsWith("]"))return!1;var ce=F.slice(1,-1);if(ce.length===0||!(0,u.default)(ce))return!1}}if(Q[0]==='"')return Q=Q.slice(1,Q.length-1),I.allow_utf8_local_part?b.test(Q):g.test(Q);for(var ue=I.allow_utf8_local_part?E:y,G=Q.split("."),oe=0;oe<G.length;oe++)if(!ue.test(G[oe]))return!1;return!(I.blacklisted_chars&&Q.search(new RegExp("[".concat(I.blacklisted_chars,"]+"),"g"))!==-1)}r.exports=a.default,r.exports.default=a.default}(_o,_o.exports)),_o.exports}var Co={exports:{}},sh;function D5(){return sh||(sh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=_;var i=d(le()),c=d(wf()),l=d(Nu()),u=d(wt());function d(k){return k&&k.__esModule?k:{default:k}}function p(k,I){return g(k)||x(k,I)||v(k,I)||m()}function m(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function v(k,I){if(k){if(typeof k=="string")return y(k,I);var z=Object.prototype.toString.call(k).slice(8,-1);if(z==="Object"&&k.constructor&&(z=k.constructor.name),z==="Map"||z==="Set")return Array.from(k);if(z==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(z))return y(k,I)}}function y(k,I){(I==null||I>k.length)&&(I=k.length);for(var z=0,O=new Array(I);z<I;z++)O[z]=k[z];return O}function x(k,I){var z=k==null?null:typeof Symbol<"u"&&k[Symbol.iterator]||k["@@iterator"];if(z!=null){var O,Z,F,U,Q=[],T=!0,J=!1;try{if(F=(z=z.call(k)).next,I!==0)for(;!(T=(O=F.call(z)).done)&&(Q.push(O.value),Q.length!==I);T=!0);}catch(me){J=!0,Z=me}finally{try{if(!T&&z.return!=null&&(U=z.return(),Object(U)!==U))return}finally{if(J)throw Z}}return Q}}function g(k){if(Array.isArray(k))return k}var E={protocols:["http","https","ftp"],require_tld:!0,require_protocol:!1,require_host:!0,require_port:!1,require_valid_protocol:!0,allow_underscores:!1,allow_trailing_dot:!1,allow_protocol_relative_urls:!1,allow_fragments:!0,allow_query_components:!0,validate_length:!0},b=/^\[([^\]]+)\](?::([0-9]+))?$/;function w(k){return Object.prototype.toString.call(k)==="[object RegExp]"}function N(k,I){for(var z=0;z<I.length;z++){var O=I[z];if(k===O||w(O)&&O.test(k))return!0}return!1}function _(k,I){if((0,i.default)(k),!k||/[\s<>]/.test(k)||k.indexOf("mailto:")===0||(I=(0,u.default)(I,E),I.validate_length&&k.length>=2083)||!I.allow_fragments&&k.includes("#")||!I.allow_query_components&&(k.includes("?")||k.includes("&")))return!1;var z,O,Z,F,U,Q,T,J;if(T=k.split("#"),k=T.shift(),T=k.split("?"),k=T.shift(),T=k.split("://"),T.length>1){if(z=T.shift().toLowerCase(),I.require_valid_protocol&&I.protocols.indexOf(z)===-1)return!1}else{if(I.require_protocol)return!1;if(k.slice(0,2)==="//"){if(!I.allow_protocol_relative_urls)return!1;T[0]=k.slice(2)}}if(k=T.join("://"),k==="")return!1;if(T=k.split("/"),k=T.shift(),k===""&&!I.require_host)return!0;if(T=k.split("@"),T.length>1){if(I.disallow_auth||T[0]===""||(O=T.shift(),O.indexOf(":")>=0&&O.split(":").length>2))return!1;var me=O.split(":"),ce=p(me,2),ue=ce[0],G=ce[1];if(ue===""&&G==="")return!1}F=T.join("@"),Q=null,J=null;var oe=F.match(b);if(oe?(Z="",J=oe[1],Q=oe[2]||null):(T=F.split(":"),Z=T.shift(),T.length&&(Q=T.join(":"))),Q!==null&&Q.length>0){if(U=parseInt(Q,10),!/^[0-9]+$/.test(Q)||U<=0||U>65535)return!1}else if(I.require_port)return!1;return I.host_whitelist?N(Z,I.host_whitelist):Z===""&&!I.require_host?!0:!(!(0,l.default)(Z)&&!(0,c.default)(Z,I)&&(!J||!(0,l.default)(J,6))||(Z=Z||J,I.host_blacklist&&N(Z,I.host_blacklist)))}r.exports=a.default,r.exports.default=a.default}(Co,Co.exports)),Co.exports}var Eo={exports:{}},oh;function F5(){return oh||(oh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=y;var i=c(le());function c(x){return x&&x.__esModule?x:{default:x}}var l=/^(?:[0-9a-fA-F]{2}([-:\s]))([0-9a-fA-F]{2}\1){4}([0-9a-fA-F]{2})$/,u=/^([0-9a-fA-F]){12}$/,d=/^([0-9a-fA-F]{4}\.){2}([0-9a-fA-F]{4})$/,p=/^(?:[0-9a-fA-F]{2}([-:\s]))([0-9a-fA-F]{2}\1){6}([0-9a-fA-F]{2})$/,m=/^([0-9a-fA-F]){16}$/,v=/^([0-9a-fA-F]{4}\.){3}([0-9a-fA-F]{4})$/;function y(x,g){return(0,i.default)(x),g!=null&&g.eui&&(g.eui=String(g.eui)),g!=null&&g.no_colons||g!=null&&g.no_separators?g.eui==="48"?u.test(x):g.eui==="64"?m.test(x):u.test(x)||m.test(x):(g==null?void 0:g.eui)==="48"?l.test(x)||d.test(x):(g==null?void 0:g.eui)==="64"?p.test(x)||v.test(x):y(x,{eui:"48"})||y(x,{eui:"64"})}r.exports=a.default,r.exports.default=a.default}(Eo,Eo.exports)),Eo.exports}var Io={exports:{}},lh;function q5(){return lh||(lh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=m;var i=l(le()),c=l(Nu());function l(v){return v&&v.__esModule?v:{default:v}}var u=/^\d{1,3}$/,d=32,p=128;function m(v){var y=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";(0,i.default)(v);var x=v.split("/");if(x.length!==2||!u.test(x[1])||x[1].length>1&&x[1].startsWith("0"))return!1;var g=(0,c.default)(x[0],y);if(!g)return!1;var E=null;switch(String(y)){case"4":E=d;break;case"6":E=p;break;default:E=(0,c.default)(x[0],"6")?p:d}return x[1]<=E&&x[1]>=0}r.exports=a.default,r.exports.default=a.default}(Io,Io.exports)),Io.exports}var Ro={exports:{}},uh;function nv(){return uh||(uh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=b;var i=c(wt());function c(w){return w&&w.__esModule?w:{default:w}}function l(w,N){return p(w)||d(w,N)||v(w,N)||u()}function u(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function d(w,N){var _=w==null?null:typeof Symbol<"u"&&w[Symbol.iterator]||w["@@iterator"];if(_!=null){var k,I,z,O,Z=[],F=!0,U=!1;try{if(z=(_=_.call(w)).next,N!==0)for(;!(F=(k=z.call(_)).done)&&(Z.push(k.value),Z.length!==N);F=!0);}catch(Q){U=!0,I=Q}finally{try{if(!F&&_.return!=null&&(O=_.return(),Object(O)!==O))return}finally{if(U)throw I}}return Z}}function p(w){if(Array.isArray(w))return w}function m(w,N){var _=typeof Symbol<"u"&&w[Symbol.iterator]||w["@@iterator"];if(!_){if(Array.isArray(w)||(_=v(w))||N){_&&(w=_);var k=0,I=function(){};return{s:I,n:function(){return k>=w.length?{done:!0}:{done:!1,value:w[k++]}},e:function(U){throw U},f:I}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var z=!0,O=!1,Z;return{s:function(){_=_.call(w)},n:function(){var U=_.next();return z=U.done,U},e:function(U){O=!0,Z=U},f:function(){try{!z&&_.return!=null&&_.return()}finally{if(O)throw Z}}}}function v(w,N){if(w){if(typeof w=="string")return y(w,N);var _=Object.prototype.toString.call(w).slice(8,-1);if(_==="Object"&&w.constructor&&(_=w.constructor.name),_==="Map"||_==="Set")return Array.from(w);if(_==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(_))return y(w,N)}}function y(w,N){(N==null||N>w.length)&&(N=w.length);for(var _=0,k=new Array(N);_<N;_++)k[_]=w[_];return k}var x={format:"YYYY/MM/DD",delimiters:["/","-"],strictMode:!1};function g(w){return/(^(y{4}|y{2})[.\/-](m{1,2})[.\/-](d{1,2})$)|(^(m{1,2})[.\/-](d{1,2})[.\/-]((y{4}|y{2})$))|(^(d{1,2})[.\/-](m{1,2})[.\/-]((y{4}|y{2})$))/gi.test(w)}function E(w,N){for(var _=[],k=Math.min(w.length,N.length),I=0;I<k;I++)_.push([w[I],N[I]]);return _}function b(w,N){if(typeof N=="string"?N=(0,i.default)({format:N},x):N=(0,i.default)(N,x),typeof w=="string"&&g(N.format)){var _=N.delimiters.find(function(G){return N.format.indexOf(G)!==-1}),k=N.strictMode?_:N.delimiters.find(function(G){return w.indexOf(G)!==-1}),I=E(w.split(k),N.format.toLowerCase().split(_)),z={},O=m(I),Z;try{for(O.s();!(Z=O.n()).done;){var F=l(Z.value,2),U=F[0],Q=F[1];if(U.length!==Q.length)return!1;z[Q.charAt(0)]=U}}catch(G){O.e(G)}finally{O.f()}var T=z.y;if(T.startsWith("-"))return!1;if(z.y.length===2){var J=parseInt(z.y,10);if(isNaN(J))return!1;var me=new Date().getFullYear()%100;J<me?T="20".concat(z.y):T="19".concat(z.y)}var ce=z.m;z.m.length===1&&(ce="0".concat(z.m));var ue=z.d;return z.d.length===1&&(ue="0".concat(z.d)),new Date("".concat(T,"-").concat(ce,"-").concat(ue,"T00:00:00.000Z")).getUTCDate()===+z.d}return N.strictMode?!1:Object.prototype.toString.call(w)==="[object Date]"&&isFinite(w)}r.exports=a.default,r.exports.default=a.default}(Ro,Ro.exports)),Ro.exports}var Po={exports:{}},ch;function B5(){return ch||(ch=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var i=c(wt());function c(p){return p&&p.__esModule?p:{default:p}}var l={hourFormat:"hour24",mode:"default"},u={hour24:{default:/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,withSeconds:/^([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/},hour12:{default:/^(0?[1-9]|1[0-2]):([0-5][0-9]) (A|P)M$/,withSeconds:/^(0?[1-9]|1[0-2]):([0-5][0-9]):([0-5][0-9]) (A|P)M$/}};function d(p,m){return m=(0,i.default)(m,l),typeof p!="string"?!1:u[m.hourFormat][m.mode].test(p)}r.exports=a.default,r.exports.default=a.default}(Po,Po.exports)),Po.exports}var Lo={exports:{}},dh;function U5(){return dh||(dh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=p;var i=c(le());function c(m){return m&&m.__esModule?m:{default:m}}var l={loose:!1},u=["true","false","1","0"],d=[].concat(u,["yes","no"]);function p(m){var v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:l;return(0,i.default)(m),v.loose?d.includes(m.toLowerCase()):u.includes(m)}r.exports=a.default,r.exports.default=a.default}(Lo,Lo.exports)),Lo.exports}var jo={exports:{}},fh;function H5(){return fh||(fh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=k;var i=c(le());function c(I){return I&&I.__esModule?I:{default:I}}var l="([A-Za-z]{3}(-[A-Za-z]{3}){0,2})",u="(([a-zA-Z]{2,3}(-".concat(l,")?)|([a-zA-Z]{5,8}))"),d="([A-Za-z]{4})",p="([A-Za-z]{2}|\\d{3})",m="([A-Za-z0-9]{5,8}|(\\d[A-Z-a-z0-9]{3}))",v="(\\d|[A-W]|[Y-Z]|[a-w]|[y-z])",y="(".concat(v,"(-[A-Za-z0-9]{2,8})+)"),x="(x(-[A-Za-z0-9]{1,8})+)",g="((en-GB-oed)|(i-ami)|(i-bnn)|(i-default)|(i-enochian)|(i-hak)|(i-klingon)|(i-lux)|(i-mingo)|(i-navajo)|(i-pwn)|(i-tao)|(i-tay)|(i-tsu)|(sgn-BE-FR)|(sgn-BE-NL)|(sgn-CH-DE))",E="((art-lojban)|(cel-gaulish)|(no-bok)|(no-nyn)|(zh-guoyu)|(zh-hakka)|(zh-min)|(zh-min-nan)|(zh-xiang))",b="(".concat(g,"|").concat(E,")"),w="(-|_)",N="".concat(u,"(").concat(w).concat(d,")?(").concat(w).concat(p,")?(").concat(w).concat(m,")*(").concat(w).concat(y,")*(").concat(w).concat(x,")?"),_=new RegExp("(^".concat(x,"$)|(^").concat(b,"$)|(^").concat(N,"$)"));function k(I){return(0,i.default)(I),_.test(I)}r.exports=a.default,r.exports.default=a.default}(jo,jo.exports)),jo.exports}var Mo={exports:{}},mh;function Z5(){return mh||(mh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^(?!(1[3-9])|(20)|(3[3-9])|(4[0-9])|(5[0-9])|(60)|(7[3-9])|(8[1-9])|(9[0-2])|(9[3-9]))[0-9]{9}$/;function u(d){if((0,i.default)(d),!l.test(d))return!1;for(var p=0,m=0;m<d.length;m++)m%3===0?p+=d[m]*3:m%3===1?p+=d[m]*7:p+=d[m]*1;return p%10===0}r.exports=a.default,r.exports.default=a.default}(Mo,Mo.exports)),Mo.exports}var ma={},ph;function W5(){if(ph)return ma;ph=1,Object.defineProperty(ma,"__esModule",{value:!0}),ma.default=c,ma.locales=void 0;var r=i(le()),a=Ui();function i(l){return l&&l.__esModule?l:{default:l}}function c(l){var u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"en-US",d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};(0,r.default)(l);var p=l,m=d.ignore;if(m)if(m instanceof RegExp)p=p.replace(m,"");else if(typeof m=="string")p=p.replace(new RegExp("[".concat(m.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g,"\\$&"),"]"),"g"),"");else throw new Error("ignore should be instance of a String or RegExp");if(u in a.alpha)return a.alpha[u].test(p);throw new Error("Invalid locale '".concat(u,"'"))}return ma.locales=Object.keys(a.alpha),ma}var pa={},hh;function G5(){if(hh)return pa;hh=1,Object.defineProperty(pa,"__esModule",{value:!0}),pa.default=c,pa.locales=void 0;var r=i(le()),a=Ui();function i(l){return l&&l.__esModule?l:{default:l}}function c(l){var u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"en-US",d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};(0,r.default)(l);var p=l,m=d.ignore;if(m)if(m instanceof RegExp)p=p.replace(m,"");else if(typeof m=="string")p=p.replace(new RegExp("[".concat(m.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g,"\\$&"),"]"),"g"),"");else throw new Error("ignore should be instance of a String or RegExp");if(u in a.alphanumeric)return a.alphanumeric[u].test(p);throw new Error("Invalid locale '".concat(u,"'"))}return pa.locales=Object.keys(a.alphanumeric),pa}var zo={exports:{}},gh;function V5(){return gh||(gh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var i=l(le()),c=Ui();function l(p){return p&&p.__esModule?p:{default:p}}var u=/^[0-9]+$/;function d(p,m){return(0,i.default)(p),m&&m.no_symbols?u.test(p):new RegExp("^[+-]?([0-9]*[".concat((m||{}).locale?c.decimal[m.locale]:".","])?[0-9]+$")).test(p)}r.exports=a.default,r.exports.default=a.default}(zo,zo.exports)),zo.exports}var To={exports:{}},vh;function K5(){return vh||(vh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l={AM:/^[A-Z]{2}\d{7}$/,AR:/^[A-Z]{3}\d{6}$/,AT:/^[A-Z]\d{7}$/,AU:/^[A-Z]\d{7}$/,AZ:/^[A-Z]{1}\d{8}$/,BE:/^[A-Z]{2}\d{6}$/,BG:/^\d{9}$/,BR:/^[A-Z]{2}\d{6}$/,BY:/^[A-Z]{2}\d{7}$/,CA:/^[A-Z]{2}\d{6}$/,CH:/^[A-Z]\d{7}$/,CN:/^G\d{8}$|^E(?![IO])[A-Z0-9]\d{7}$/,CY:/^[A-Z](\d{6}|\d{8})$/,CZ:/^\d{8}$/,DE:/^[CFGHJKLMNPRTVWXYZ0-9]{9}$/,DK:/^\d{9}$/,DZ:/^\d{9}$/,EE:/^([A-Z]\d{7}|[A-Z]{2}\d{7})$/,ES:/^[A-Z0-9]{2}([A-Z0-9]?)\d{6}$/,FI:/^[A-Z]{2}\d{7}$/,FR:/^\d{2}[A-Z]{2}\d{5}$/,GB:/^\d{9}$/,GR:/^[A-Z]{2}\d{7}$/,HR:/^\d{9}$/,HU:/^[A-Z]{2}(\d{6}|\d{7})$/,IE:/^[A-Z0-9]{2}\d{7}$/,IN:/^[A-Z]{1}-?\d{7}$/,ID:/^[A-C]\d{7}$/,IR:/^[A-Z]\d{8}$/,IS:/^(A)\d{7}$/,IT:/^[A-Z0-9]{2}\d{7}$/,JM:/^[Aa]\d{7}$/,JP:/^[A-Z]{2}\d{7}$/,KR:/^[MS]\d{8}$/,KZ:/^[a-zA-Z]\d{7}$/,LI:/^[a-zA-Z]\d{5}$/,LT:/^[A-Z0-9]{8}$/,LU:/^[A-Z0-9]{8}$/,LV:/^[A-Z0-9]{2}\d{7}$/,LY:/^[A-Z0-9]{8}$/,MT:/^\d{7}$/,MZ:/^([A-Z]{2}\d{7})|(\d{2}[A-Z]{2}\d{5})$/,MY:/^[AHK]\d{8}$/,MX:/^\d{10,11}$/,NL:/^[A-Z]{2}[A-Z0-9]{6}\d$/,NZ:/^([Ll]([Aa]|[Dd]|[Ff]|[Hh])|[Ee]([Aa]|[Pp])|[Nn])\d{6}$/,PH:/^([A-Z](\d{6}|\d{7}[A-Z]))|([A-Z]{2}(\d{6}|\d{7}))$/,PK:/^[A-Z]{2}\d{7}$/,PL:/^[A-Z]{2}\d{7}$/,PT:/^[A-Z]\d{6}$/,RO:/^\d{8,9}$/,RU:/^\d{9}$/,SE:/^\d{8}$/,SL:/^(P)[A-Z]\d{7}$/,SK:/^[0-9A-Z]\d{7}$/,TH:/^[A-Z]{1,2}\d{6,7}$/,TR:/^[A-Z]\d{8}$/,UA:/^[A-Z]{2}\d{6}$/,US:/^\d{9}$/,ZA:/^[TAMD]\d{8}$/};function u(d,p){(0,i.default)(d);var m=d.replace(/\s/g,"").toUpperCase();return p.toUpperCase()in l&&l[p].test(m)}r.exports=a.default,r.exports.default=a.default}(To,To.exports)),To.exports}var Oo={exports:{}},$o={exports:{}},yh;function Nf(){return yh||(yh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var i=c(le());function c(p){return p&&p.__esModule?p:{default:p}}var l=/^(?:[-+]?(?:0|[1-9][0-9]*))$/,u=/^[-+]?[0-9]+$/;function d(p,m){(0,i.default)(p),m=m||{};var v=m.allow_leading_zeroes===!1?l:u,y=!m.hasOwnProperty("min")||p>=m.min,x=!m.hasOwnProperty("max")||p<=m.max,g=!m.hasOwnProperty("lt")||p<m.lt,E=!m.hasOwnProperty("gt")||p>m.gt;return v.test(p)&&y&&x&&g&&E}r.exports=a.default,r.exports.default=a.default}($o,$o.exports)),$o.exports}var xh;function Y5(){return xh||(xh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var i=c(Nf());function c(u){return u&&u.__esModule?u:{default:u}}function l(u){return(0,i.default)(u,{allow_leading_zeroes:!1,min:0,max:65535})}r.exports=a.default,r.exports.default=a.default}(Oo,Oo.exports)),Oo.exports}var Do={exports:{}},Sh;function Q5(){return Sh||(Sh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var i=c(le());function c(u){return u&&u.__esModule?u:{default:u}}function l(u){return(0,i.default)(u),u===u.toLowerCase()}r.exports=a.default,r.exports.default=a.default}(Do,Do.exports)),Do.exports}var Fo={exports:{}},wh;function X5(){return wh||(wh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var i=c(le());function c(u){return u&&u.__esModule?u:{default:u}}function l(u){return(0,i.default)(u),u===u.toUpperCase()}r.exports=a.default,r.exports.default=a.default}(Fo,Fo.exports)),Fo.exports}var qo={exports:{}},Nh;function J5(){return Nh||(Nh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var i=c(le());function c(p){return p&&p.__esModule?p:{default:p}}var l=/^[0-9]{15}$/,u=/^\d{2}-\d{6}-\d{6}-\d{1}$/;function d(p,m){(0,i.default)(p),m=m||{};var v=l;if(m.allow_hyphens&&(v=u),!v.test(p))return!1;p=p.replace(/-/g,"");for(var y=0,x=2,g=14,E=0;E<g;E++){var b=p.substring(g-E-1,g-E),w=parseInt(b,10)*x;w>=10?y+=w%10+1:y+=w,x===1?x+=1:x-=1}var N=(10-y%10)%10;return N===parseInt(p.substring(14,15),10)}r.exports=a.default,r.exports.default=a.default}(qo,qo.exports)),qo.exports}var Bo={exports:{}},_h;function eS(){return _h||(_h=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^[\x00-\x7F]+$/;function u(d){return(0,i.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(Bo,Bo.exports)),Bo.exports}var ha={},kh;function av(){if(kh)return ha;kh=1,Object.defineProperty(ha,"__esModule",{value:!0}),ha.default=c,ha.fullWidth=void 0;var r=a(le());function a(l){return l&&l.__esModule?l:{default:l}}var i=ha.fullWidth=/[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;function c(l){return(0,r.default)(l),i.test(l)}return ha}var ga={},bh;function iv(){if(bh)return ga;bh=1,Object.defineProperty(ga,"__esModule",{value:!0}),ga.default=c,ga.halfWidth=void 0;var r=a(le());function a(l){return l&&l.__esModule?l:{default:l}}var i=ga.halfWidth=/[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;function c(l){return(0,r.default)(l),i.test(l)}return ga}var Uo={exports:{}},Ah;function tS(){return Ah||(Ah=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var i=u(le()),c=av(),l=iv();function u(p){return p&&p.__esModule?p:{default:p}}function d(p){return(0,i.default)(p),c.fullWidth.test(p)&&l.halfWidth.test(p)}r.exports=a.default,r.exports.default=a.default}(Uo,Uo.exports)),Uo.exports}var Ho={exports:{}},Ch;function rS(){return Ch||(Ch=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l=/[^\x00-\x7F]/;function u(d){return(0,i.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(Ho,Ho.exports)),Ho.exports}var Zo={exports:{}},Wo={exports:{}},Eh;function nS(){return Eh||(Eh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=i;function i(c,l){var u=c.join("");return new RegExp(u,l)}r.exports=a.default,r.exports.default=a.default}(Wo,Wo.exports)),Wo.exports}var Ih;function aS(){return Ih||(Ih=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var i=l(le()),c=l(nS());function l(p){return p&&p.__esModule?p:{default:p}}var u=(0,c.default)(["^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)","(?:-((?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*))*))","?(?:\\+([0-9a-z-]+(?:\\.[0-9a-z-]+)*))?$"],"i");function d(p){return(0,i.default)(p),u.test(p)}r.exports=a.default,r.exports.default=a.default}(Zo,Zo.exports)),Zo.exports}var Go={exports:{}},Rh;function iS(){return Rh||(Rh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l=/[\uD800-\uDBFF][\uDC00-\uDFFF]/;function u(d){return(0,i.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(Go,Go.exports)),Go.exports}var Vo={exports:{}},Ko={exports:{}},Ph;function sS(){return Ph||(Ph=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=function(l,u){return l.some(function(d){return u===d})};a.default=i,r.exports=a.default,r.exports.default=a.default}(Ko,Ko.exports)),Ko.exports}var Lh;function oS(){return Lh||(Lh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=y;var i=d(wt()),c=d(le()),l=d(sS()),u=Ui();function d(x){return x&&x.__esModule?x:{default:x}}function p(x){var g=new RegExp("^[-+]?([0-9]+)?(\\".concat(u.decimal[x.locale],"[0-9]{").concat(x.decimal_digits,"})").concat(x.force_decimal?"":"?","$"));return g}var m={force_decimal:!1,decimal_digits:"1,",locale:"en-US"},v=["","-","+"];function y(x,g){if((0,c.default)(x),g=(0,i.default)(g,m),g.locale in u.decimal)return!(0,l.default)(v,x.replace(/ /g,""))&&p(g).test(x);throw new Error("Invalid locale '".concat(g.locale,"'"))}r.exports=a.default,r.exports.default=a.default}(Vo,Vo.exports)),Vo.exports}var Yo={exports:{}},jh;function sv(){return jh||(jh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^(0x|0h)?[0-9A-F]+$/i;function u(d){return(0,i.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(Yo,Yo.exports)),Yo.exports}var Qo={exports:{}},Mh;function lS(){return Mh||(Mh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^(0o)?[0-7]+$/i;function u(d){return(0,i.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(Qo,Qo.exports)),Qo.exports}var Xo={exports:{}},zh;function uS(){return zh||(zh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=l(le()),c=l(Jg());function l(d){return d&&d.__esModule?d:{default:d}}function u(d,p){return(0,i.default)(d),(0,c.default)(d)%parseInt(p,10)===0}r.exports=a.default,r.exports.default=a.default}(Xo,Xo.exports)),Xo.exports}var Jo={exports:{}},Th;function cS(){return Th||(Th=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;function u(d){return(0,i.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(Jo,Jo.exports)),Jo.exports}var el={exports:{}},Oh;function dS(){return Oh||(Oh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=m;var i=c(le());function c(v){return v&&v.__esModule?v:{default:v}}var l=/^rgb\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){2}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\)$/,u=/^rgba\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){3}(0?\.\d|1(\.0)?|0(\.0)?)\)$/,d=/^rgb\((([0-9]%|[1-9][0-9]%|100%),){2}([0-9]%|[1-9][0-9]%|100%)\)$/,p=/^rgba\((([0-9]%|[1-9][0-9]%|100%),){3}(0?\.\d|1(\.0)?|0(\.0)?)\)$/;function m(v){var y=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return(0,i.default)(v),y?l.test(v)||u.test(v)||d.test(v)||p.test(v):l.test(v)||u.test(v)}r.exports=a.default,r.exports.default=a.default}(el,el.exports)),el.exports}var tl={exports:{}},$h;function fS(){return $h||($h=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var i=c(le());function c(p){return p&&p.__esModule?p:{default:p}}var l=/^hsla?\(((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn)?(,(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}(,((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?))?\)$/i,u=/^hsla?\(((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn)?(\s(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}\s?(\/\s((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?)\s?)?\)$/i;function d(p){(0,i.default)(p);var m=p.replace(/\s+/g," ").replace(/\s?(hsla?\(|\)|,)\s?/ig,"$1");return m.indexOf(",")!==-1?l.test(m):u.test(m)}r.exports=a.default,r.exports.default=a.default}(tl,tl.exports)),tl.exports}var rl={exports:{}},Dh;function mS(){return Dh||(Dh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^[A-Z]{2}[0-9A-Z]{3}\d{2}\d{5}$/;function u(d){return(0,i.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(rl,rl.exports)),rl.exports}var va={},Fh;function pS(){if(Fh)return va;Fh=1,Object.defineProperty(va,"__esModule",{value:!0}),va.default=d,va.locales=void 0;var r=a(le());function a(p){return p&&p.__esModule?p:{default:p}}var i={AD:/^(AD[0-9]{2})\d{8}[A-Z0-9]{12}$/,AE:/^(AE[0-9]{2})\d{3}\d{16}$/,AL:/^(AL[0-9]{2})\d{8}[A-Z0-9]{16}$/,AT:/^(AT[0-9]{2})\d{16}$/,AZ:/^(AZ[0-9]{2})[A-Z0-9]{4}\d{20}$/,BA:/^(BA[0-9]{2})\d{16}$/,BE:/^(BE[0-9]{2})\d{12}$/,BG:/^(BG[0-9]{2})[A-Z]{4}\d{6}[A-Z0-9]{8}$/,BH:/^(BH[0-9]{2})[A-Z]{4}[A-Z0-9]{14}$/,BR:/^(BR[0-9]{2})\d{23}[A-Z]{1}[A-Z0-9]{1}$/,BY:/^(BY[0-9]{2})[A-Z0-9]{4}\d{20}$/,CH:/^(CH[0-9]{2})\d{5}[A-Z0-9]{12}$/,CR:/^(CR[0-9]{2})\d{18}$/,CY:/^(CY[0-9]{2})\d{8}[A-Z0-9]{16}$/,CZ:/^(CZ[0-9]{2})\d{20}$/,DE:/^(DE[0-9]{2})\d{18}$/,DK:/^(DK[0-9]{2})\d{14}$/,DO:/^(DO[0-9]{2})[A-Z]{4}\d{20}$/,DZ:/^(DZ\d{24})$/,EE:/^(EE[0-9]{2})\d{16}$/,EG:/^(EG[0-9]{2})\d{25}$/,ES:/^(ES[0-9]{2})\d{20}$/,FI:/^(FI[0-9]{2})\d{14}$/,FO:/^(FO[0-9]{2})\d{14}$/,FR:/^(FR[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,GB:/^(GB[0-9]{2})[A-Z]{4}\d{14}$/,GE:/^(GE[0-9]{2})[A-Z0-9]{2}\d{16}$/,GI:/^(GI[0-9]{2})[A-Z]{4}[A-Z0-9]{15}$/,GL:/^(GL[0-9]{2})\d{14}$/,GR:/^(GR[0-9]{2})\d{7}[A-Z0-9]{16}$/,GT:/^(GT[0-9]{2})[A-Z0-9]{4}[A-Z0-9]{20}$/,HR:/^(HR[0-9]{2})\d{17}$/,HU:/^(HU[0-9]{2})\d{24}$/,IE:/^(IE[0-9]{2})[A-Z0-9]{4}\d{14}$/,IL:/^(IL[0-9]{2})\d{19}$/,IQ:/^(IQ[0-9]{2})[A-Z]{4}\d{15}$/,IR:/^(IR[0-9]{2})0\d{2}0\d{18}$/,IS:/^(IS[0-9]{2})\d{22}$/,IT:/^(IT[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,JO:/^(JO[0-9]{2})[A-Z]{4}\d{22}$/,KW:/^(KW[0-9]{2})[A-Z]{4}[A-Z0-9]{22}$/,KZ:/^(KZ[0-9]{2})\d{3}[A-Z0-9]{13}$/,LB:/^(LB[0-9]{2})\d{4}[A-Z0-9]{20}$/,LC:/^(LC[0-9]{2})[A-Z]{4}[A-Z0-9]{24}$/,LI:/^(LI[0-9]{2})\d{5}[A-Z0-9]{12}$/,LT:/^(LT[0-9]{2})\d{16}$/,LU:/^(LU[0-9]{2})\d{3}[A-Z0-9]{13}$/,LV:/^(LV[0-9]{2})[A-Z]{4}[A-Z0-9]{13}$/,MA:/^(MA[0-9]{26})$/,MC:/^(MC[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,MD:/^(MD[0-9]{2})[A-Z0-9]{20}$/,ME:/^(ME[0-9]{2})\d{18}$/,MK:/^(MK[0-9]{2})\d{3}[A-Z0-9]{10}\d{2}$/,MR:/^(MR[0-9]{2})\d{23}$/,MT:/^(MT[0-9]{2})[A-Z]{4}\d{5}[A-Z0-9]{18}$/,MU:/^(MU[0-9]{2})[A-Z]{4}\d{19}[A-Z]{3}$/,MZ:/^(MZ[0-9]{2})\d{21}$/,NL:/^(NL[0-9]{2})[A-Z]{4}\d{10}$/,NO:/^(NO[0-9]{2})\d{11}$/,PK:/^(PK[0-9]{2})[A-Z0-9]{4}\d{16}$/,PL:/^(PL[0-9]{2})\d{24}$/,PS:/^(PS[0-9]{2})[A-Z0-9]{4}\d{21}$/,PT:/^(PT[0-9]{2})\d{21}$/,QA:/^(QA[0-9]{2})[A-Z]{4}[A-Z0-9]{21}$/,RO:/^(RO[0-9]{2})[A-Z]{4}[A-Z0-9]{16}$/,RS:/^(RS[0-9]{2})\d{18}$/,SA:/^(SA[0-9]{2})\d{2}[A-Z0-9]{18}$/,SC:/^(SC[0-9]{2})[A-Z]{4}\d{20}[A-Z]{3}$/,SE:/^(SE[0-9]{2})\d{20}$/,SI:/^(SI[0-9]{2})\d{15}$/,SK:/^(SK[0-9]{2})\d{20}$/,SM:/^(SM[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,SV:/^(SV[0-9]{2})[A-Z0-9]{4}\d{20}$/,TL:/^(TL[0-9]{2})\d{19}$/,TN:/^(TN[0-9]{2})\d{20}$/,TR:/^(TR[0-9]{2})\d{5}[A-Z0-9]{17}$/,UA:/^(UA[0-9]{2})\d{6}[A-Z0-9]{19}$/,VA:/^(VA[0-9]{2})\d{18}$/,VG:/^(VG[0-9]{2})[A-Z0-9]{4}\d{16}$/,XK:/^(XK[0-9]{2})\d{16}$/};function c(p){var m=p.filter(function(v){return!(v in i)});return!(m.length>0)}function l(p,m){var v=p.replace(/[\s\-]+/gi,"").toUpperCase(),y=v.slice(0,2).toUpperCase(),x=y in i;if(m.whitelist){if(!c(m.whitelist))return!1;var g=m.whitelist.includes(y);if(!g)return!1}if(m.blacklist){var E=m.blacklist.includes(y);if(E)return!1}return x&&i[y].test(v)}function u(p){var m=p.replace(/[^A-Z0-9]+/gi,"").toUpperCase(),v=m.slice(4)+m.slice(0,4),y=v.replace(/[A-Z]/g,function(g){return g.charCodeAt(0)-55}),x=y.match(/\d{1,7}/g).reduce(function(g,E){return Number(g+E)%97},"");return x===1}function d(p){var m=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return(0,r.default)(p),l(p,m)&&u(p)}return va.locales=Object.keys(i),va}var nl={exports:{}},ya={},qh;function ov(){if(qh)return ya;qh=1,Object.defineProperty(ya,"__esModule",{value:!0}),ya.CountryCodes=void 0,ya.default=c;var r=a(le());function a(l){return l&&l.__esModule?l:{default:l}}var i=new Set(["AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AS","AT","AU","AW","AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS","BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM","HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK","ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS","ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI","VN","VU","WF","WS","YE","YT","ZA","ZM","ZW"]);function c(l){return(0,r.default)(l),i.has(l.toUpperCase())}return ya.CountryCodes=i,ya}var Bh;function hS(){return Bh||(Bh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var i=l(le()),c=ov();function l(p){return p&&p.__esModule?p:{default:p}}var u=/^[A-Za-z]{6}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$/;function d(p){(0,i.default)(p);var m=p.slice(4,6).toUpperCase();return!c.CountryCodes.has(m)&&m!=="XK"?!1:u.test(p)}r.exports=a.default,r.exports.default=a.default}(nl,nl.exports)),nl.exports}var al={exports:{}},Uh;function gS(){return Uh||(Uh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^[a-f0-9]{32}$/;function u(d){return(0,i.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(al,al.exports)),al.exports}var il={exports:{}},Hh;function vS(){return Hh||(Hh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l={md5:32,md4:32,sha1:40,sha256:64,sha384:96,sha512:128,ripemd128:32,ripemd160:40,tiger128:32,tiger160:40,tiger192:48,crc32:8,crc32b:8};function u(d,p){(0,i.default)(d);var m=new RegExp("^[a-fA-F0-9]{".concat(l[p],"}$"));return m.test(d)}r.exports=a.default,r.exports.default=a.default}(il,il.exports)),il.exports}var sl={exports:{}},ol={exports:{}},Zh;function lv(){return Zh||(Zh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=m;var i=l(le()),c=l(wt());function l(v){return v&&v.__esModule?v:{default:v}}var u=/[^A-Z0-9+\/=]/i,d=/^[A-Z0-9_\-]*$/i,p={urlSafe:!1};function m(v,y){(0,i.default)(v),y=(0,c.default)(y,p);var x=v.length;if(y.urlSafe)return d.test(v);if(x%4!==0||u.test(v))return!1;var g=v.indexOf("=");return g===-1||g===x-1||g===x-2&&v[x-1]==="="}r.exports=a.default,r.exports.default=a.default}(ol,ol.exports)),ol.exports}var Wh;function yS(){return Wh||(Wh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=l(le()),c=l(lv());function l(d){return d&&d.__esModule?d:{default:d}}function u(d){(0,i.default)(d);var p=d.split("."),m=p.length;return m!==3?!1:p.reduce(function(v,y){return v&&(0,c.default)(y,{urlSafe:!0})},!0)}r.exports=a.default,r.exports.default=a.default}(sl,sl.exports)),sl.exports}var ll={exports:{}},Gh;function xS(){return Gh||(Gh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=p;var i=l(le()),c=l(wt());function l(m){return m&&m.__esModule?m:{default:m}}function u(m){"@babel/helpers - typeof";return u=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(v){return typeof v}:function(v){return v&&typeof Symbol=="function"&&v.constructor===Symbol&&v!==Symbol.prototype?"symbol":typeof v},u(m)}var d={allow_primitives:!1};function p(m,v){(0,i.default)(m);try{v=(0,c.default)(v,d);var y=[];v.allow_primitives&&(y=[null,!1,!0]);var x=JSON.parse(m);return y.includes(x)||!!x&&u(x)==="object"}catch{}return!1}r.exports=a.default,r.exports.default=a.default}(ll,ll.exports)),ll.exports}var ul={exports:{}},Vh;function SS(){return Vh||(Vh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var i=l(le()),c=l(wt());function l(p){return p&&p.__esModule?p:{default:p}}var u={ignore_whitespace:!1};function d(p,m){return(0,i.default)(p),m=(0,c.default)(m,u),(m.ignore_whitespace?p.trim().length:p.length)===0}r.exports=a.default,r.exports.default=a.default}(ul,ul.exports)),ul.exports}var cl={exports:{}},Kh;function wS(){return Kh||(Kh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}function l(d){"@babel/helpers - typeof";return l=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(p){return typeof p}:function(p){return p&&typeof Symbol=="function"&&p.constructor===Symbol&&p!==Symbol.prototype?"symbol":typeof p},l(d)}function u(d,p){(0,i.default)(d);var m,v;l(p)==="object"?(m=p.min||0,v=p.max):(m=arguments[1]||0,v=arguments[2]);var y=d.match(/(\uFE0F|\uFE0E)/g)||[],x=d.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g)||[],g=d.length-y.length-x.length;return g>=m&&(typeof v>"u"||g<=v)}r.exports=a.default,r.exports.default=a.default}(cl,cl.exports)),cl.exports}var dl={exports:{}},Yh;function NS(){return Yh||(Yh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l={1:/^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,2:/^[0-9A-F]{8}-[0-9A-F]{4}-2[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,3:/^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,4:/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,5:/^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,7:/^[0-9A-F]{8}-[0-9A-F]{4}-7[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,all:/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i};function u(d,p){(0,i.default)(d);var m=l[[void 0,null].includes(p)?"all":p];return!!m&&m.test(d)}r.exports=a.default,r.exports.default=a.default}(dl,dl.exports)),dl.exports}var fl={exports:{}},Qh;function _S(){return Qh||(Qh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=l(le()),c=l(sv());function l(d){return d&&d.__esModule?d:{default:d}}function u(d){return(0,i.default)(d),(0,c.default)(d)&&d.length===24}r.exports=a.default,r.exports.default=a.default}(fl,fl.exports)),fl.exports}var ml={exports:{}},Xh;function kS(){return Xh||(Xh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var i=c(Sf());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d){var p=(d==null?void 0:d.comparisonDate)||d||Date().toString(),m=(0,i.default)(p),v=(0,i.default)(u);return!!(v&&m&&v>m)}r.exports=a.default,r.exports.default=a.default}(ml,ml.exports)),ml.exports}var pl={exports:{}},Jh;function bS(){return Jh||(Jh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=l(le()),c=l(Sf());function l(d){return d&&d.__esModule?d:{default:d}}function u(d){var p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:String(new Date);(0,i.default)(d);var m=(0,c.default)(p),v=(0,c.default)(d);return!!(v&&m&&v<m)}r.exports=a.default,r.exports.default=a.default}(pl,pl.exports)),pl.exports}var hl={exports:{}},e1;function AS(){return e1||(e1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var i=l(le()),c=l(ev());function l(p){return p&&p.__esModule?p:{default:p}}function u(p){"@babel/helpers - typeof";return u=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(m){return typeof m}:function(m){return m&&typeof Symbol=="function"&&m.constructor===Symbol&&m!==Symbol.prototype?"symbol":typeof m},u(p)}function d(p,m){(0,i.default)(p);var v;if(Object.prototype.toString.call(m)==="[object Array]"){var y=[];for(v in m)({}).hasOwnProperty.call(m,v)&&(y[v]=(0,c.default)(m[v]));return y.indexOf(p)>=0}else{if(u(m)==="object")return m.hasOwnProperty(p);if(m&&typeof m.indexOf=="function")return m.indexOf(p)>=0}return!1}r.exports=a.default,r.exports.default=a.default}(hl,hl.exports)),hl.exports}var gl={exports:{}},t1;function uv(){return t1||(t1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var i=c(le());function c(u){return u&&u.__esModule?u:{default:u}}function l(u){(0,i.default)(u);for(var d=u.replace(/[- ]+/g,""),p=0,m,v,y,x=d.length-1;x>=0;x--)m=d.substring(x,x+1),v=parseInt(m,10),y?(v*=2,v>=10?p+=v%10+1:p+=v):p+=v,y=!y;return!!(p%10===0&&d)}r.exports=a.default,r.exports.default=a.default}(gl,gl.exports)),gl.exports}var vl={exports:{}},r1;function CS(){return r1||(r1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=p;var i=l(le()),c=l(uv());function l(m){return m&&m.__esModule?m:{default:m}}var u={amex:/^3[47][0-9]{13}$/,dinersclub:/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,discover:/^6(?:011|5[0-9][0-9])[0-9]{12,15}$/,jcb:/^(?:2131|1800|35\d{3})\d{11}$/,mastercard:/^5[1-5][0-9]{2}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,unionpay:/^(6[27][0-9]{14}|^(81[0-9]{14,17}))$/,visa:/^(?:4[0-9]{12})(?:[0-9]{3,6})?$/},d=function(){var m=[];for(var v in u)u.hasOwnProperty(v)&&m.push(u[v]);return m}();function p(m){var v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};(0,i.default)(m);var y=v.provider,x=m.replace(/[- ]+/g,"");if(y&&y.toLowerCase()in u){if(!u[y.toLowerCase()].test(x))return!1}else{if(y&&!(y.toLowerCase()in u))throw new Error("".concat(y," is not a valid credit card provider."));if(!d.some(function(g){return g.test(x)}))return!1}return(0,c.default)(m)}r.exports=a.default,r.exports.default=a.default}(vl,vl.exports)),vl.exports}var yl={exports:{}},n1;function ES(){return n1||(n1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var i=l(le()),c=l(Nf());function l(p){return p&&p.__esModule?p:{default:p}}var u={PL:function(m){(0,i.default)(m);var v={1:1,2:3,3:7,4:9,5:1,6:3,7:7,8:9,9:1,10:3,11:0};if(m!=null&&m.length===11&&(0,c.default)(m,{allow_leading_zeroes:!0})){var y=m.split("").slice(0,-1),x=y.reduce(function(b,w,N){return b+Number(w)*v[N+1]},0),g=x%10,E=Number(m.charAt(m.length-1));if(g===0&&E===0||E===10-g)return!0}return!1},ES:function(m){(0,i.default)(m);var v=/^[0-9X-Z][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/,y={X:0,Y:1,Z:2},x=["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"],g=m.trim().toUpperCase();if(!v.test(g))return!1;var E=g.slice(0,-1).replace(/[X,Y,Z]/g,function(b){return y[b]});return g.endsWith(x[E%23])},FI:function(m){if((0,i.default)(m),m.length!==11||!m.match(/^\d{6}[\-A\+]\d{3}[0-9ABCDEFHJKLMNPRSTUVWXY]{1}$/))return!1;var v="0123456789ABCDEFHJKLMNPRSTUVWXY",y=parseInt(m.slice(0,6),10)*1e3+parseInt(m.slice(7,10),10),x=y%31,g=v[x];return g===m.slice(10,11)},IN:function(m){var v=/^[1-9]\d{3}\s?\d{4}\s?\d{4}$/,y=[[0,1,2,3,4,5,6,7,8,9],[1,2,3,4,0,6,7,8,9,5],[2,3,4,0,1,7,8,9,5,6],[3,4,0,1,2,8,9,5,6,7],[4,0,1,2,3,9,5,6,7,8],[5,9,8,7,6,0,4,3,2,1],[6,5,9,8,7,1,0,4,3,2],[7,6,5,9,8,2,1,0,4,3],[8,7,6,5,9,3,2,1,0,4],[9,8,7,6,5,4,3,2,1,0]],x=[[0,1,2,3,4,5,6,7,8,9],[1,5,7,6,2,8,3,0,9,4],[5,8,0,3,7,9,6,1,4,2],[8,9,1,6,0,4,3,5,2,7],[9,4,5,3,1,2,6,8,7,0],[4,2,8,6,5,7,3,9,0,1],[2,7,9,3,8,0,6,4,1,5],[7,0,4,6,9,1,3,2,5,8]],g=m.trim();if(!v.test(g))return!1;var E=0,b=g.replace(/\s/g,"").split("").map(Number).reverse();return b.forEach(function(w,N){E=y[E][x[N%8][w]]}),E===0},IR:function(m){if(!m.match(/^\d{10}$/)||(m="0000".concat(m).slice(m.length-6),parseInt(m.slice(3,9),10)===0))return!1;for(var v=parseInt(m.slice(9,10),10),y=0,x=0;x<9;x++)y+=parseInt(m.slice(x,x+1),10)*(10-x);return y%=11,y<2&&v===y||y>=2&&v===11-y},IT:function(m){return m.length!==9||m==="CA00000AA"?!1:m.search(/C[A-Z]\d{5}[A-Z]{2}/i)>-1},NO:function(m){var v=m.trim();if(isNaN(Number(v))||v.length!==11||v==="00000000000")return!1;var y=v.split("").map(Number),x=(11-(3*y[0]+7*y[1]+6*y[2]+1*y[3]+8*y[4]+9*y[5]+4*y[6]+5*y[7]+2*y[8])%11)%11,g=(11-(5*y[0]+4*y[1]+3*y[2]+2*y[3]+7*y[4]+6*y[5]+5*y[6]+4*y[7]+3*y[8]+2*x)%11)%11;return!(x!==y[9]||g!==y[10])},TH:function(m){if(!m.match(/^[1-8]\d{12}$/))return!1;for(var v=0,y=0;y<12;y++)v+=parseInt(m[y],10)*(13-y);return m[12]===((11-v%11)%10).toString()},LK:function(m){var v=/^[1-9]\d{8}[vx]$/i,y=/^[1-9]\d{11}$/i;return m.length===10&&v.test(m)?!0:!!(m.length===12&&y.test(m))},"he-IL":function(m){var v=/^\d{9}$/,y=m.trim();if(!v.test(y))return!1;for(var x=y,g=0,E,b=0;b<x.length;b++)E=Number(x[b])*(b%2+1),g+=E>9?E-9:E;return g%10===0},"ar-LY":function(m){var v=/^(1|2)\d{11}$/,y=m.trim();return!!v.test(y)},"ar-TN":function(m){var v=/^\d{8}$/,y=m.trim();return!!v.test(y)},"zh-CN":function(m){var v=["11","12","13","14","15","21","22","23","31","32","33","34","35","36","37","41","42","43","44","45","46","50","51","52","53","54","61","62","63","64","65","71","81","82","91"],y=["7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"],x=["1","0","X","9","8","7","6","5","4","3","2"],g=function(z){return v.includes(z)},E=function(z){var O=parseInt(z.substring(0,4),10),Z=parseInt(z.substring(4,6),10),F=parseInt(z.substring(6),10),U=new Date(O,Z-1,F);return U>new Date?!1:U.getFullYear()===O&&U.getMonth()===Z-1&&U.getDate()===F},b=function(z){for(var O=z.substring(0,17),Z=0,F=0;F<17;F++)Z+=parseInt(O.charAt(F),10)*parseInt(y[F],10);var U=Z%11;return x[U]},w=function(z){return b(z)===z.charAt(17).toUpperCase()},N=function(z){var O=/^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(z);if(!O)return!1;var Z=z.substring(0,2);if(O=g(Z),!O)return!1;var F="19".concat(z.substring(6,12));return O=E(F),!!O},_=function(z){var O=/^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(z);if(!O)return!1;var Z=z.substring(0,2);if(O=g(Z),!O)return!1;var F=z.substring(6,14);return O=E(F),O?w(z):!1},k=function(z){var O=/^\d{15}|(\d{17}(\d|x|X))$/.test(z);return O?z.length===15?N(z):_(z):!1};return k(m)},"zh-HK":function(m){m=m.trim();var v=/^[A-Z]{1,2}[0-9]{6}((\([0-9A]\))|(\[[0-9A]\])|([0-9A]))$/,y=/^[0-9]$/;if(m=m.toUpperCase(),!v.test(m))return!1;m=m.replace(/\[|\]|\(|\)/g,""),m.length===8&&(m="3".concat(m));for(var x=0,g=0;g<=7;g++){var E=void 0;y.test(m[g])?E=m[g]:E=(m[g].charCodeAt(0)-55)%11,x+=E*(9-g)}x%=11;var b;return x===0?b="0":x===1?b="A":b=String(11-x),b===m[m.length-1]},"zh-TW":function(m){var v={A:10,B:11,C:12,D:13,E:14,F:15,G:16,H:17,I:34,J:18,K:19,L:20,M:21,N:22,O:35,P:23,Q:24,R:25,S:26,T:27,U:28,V:29,W:32,X:30,Y:31,Z:33},y=m.trim().toUpperCase();return/^[A-Z][0-9]{9}$/.test(y)?Array.from(y).reduce(function(x,g,E){if(E===0){var b=v[g];return b%10*9+Math.floor(b/10)}return E===9?(10-x%10-Number(g))%10===0:x+Number(g)*(9-E)},0):!1}};function d(p,m){if((0,i.default)(p),m in u)return u[m](p);if(m==="any"){for(var v in u)if(u.hasOwnProperty(v)){var y=u[v];if(y(p))return!0}return!1}throw new Error("Invalid locale '".concat(m,"'"))}r.exports=a.default,r.exports.default=a.default}(yl,yl.exports)),yl.exports}var xl={exports:{}},a1;function IS(){return a1||(a1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=v;var i=c(le());function c(y){return y&&y.__esModule?y:{default:y}}var l=8,u=14,d=/^(\d{8}|\d{13}|\d{14})$/;function p(y,x){return y===l||y===u?x%2===0?3:1:x%2===0?1:3}function m(y){var x=y.slice(0,-1).split("").map(function(E,b){return Number(E)*p(y.length,b)}).reduce(function(E,b){return E+b},0),g=10-x%10;return g<10?g:0}function v(y){(0,i.default)(y);var x=Number(y.slice(-1));return d.test(y)&&x===m(y)}r.exports=a.default,r.exports.default=a.default}(xl,xl.exports)),xl.exports}var Sl={exports:{}},i1;function RS(){return i1||(i1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;function u(d){if((0,i.default)(d),!l.test(d))return!1;for(var p=!0,m=0,v=d.length-2;v>=0;v--)if(d[v]>="A"&&d[v]<="Z")for(var y=d[v].charCodeAt(0)-55,x=y%10,g=Math.trunc(y/10),E=0,b=[x,g];E<b.length;E++){var w=b[E];p?w>=5?m+=1+(w-5)*2:m+=w*2:m+=w,p=!p}else{var N=d[v].charCodeAt(0)-48;p?N>=5?m+=1+(N-5)*2:m+=N*2:m+=N,p=!p}var _=Math.trunc((m+9)/10)*10-m;return+d[d.length-1]===_}r.exports=a.default,r.exports.default=a.default}(Sl,Sl.exports)),Sl.exports}var wl={exports:{}},s1;function PS(){return s1||(s1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=p;var i=c(le());function c(m){return m&&m.__esModule?m:{default:m}}var l=/^(?:[0-9]{9}X|[0-9]{10})$/,u=/^(?:[0-9]{13})$/,d=[1,3];function p(m,v){(0,i.default)(m);var y=String((v==null?void 0:v.version)||v);if(!(v!=null&&v.version||v))return p(m,{version:10})||p(m,{version:13});var x=m.replace(/[\s-]+/g,""),g=0;if(y==="10"){if(!l.test(x))return!1;for(var E=0;E<y-1;E++)g+=(E+1)*x.charAt(E);if(x.charAt(9)==="X"?g+=10*10:g+=10*x.charAt(9),g%11===0)return!0}else if(y==="13"){if(!u.test(x))return!1;for(var b=0;b<12;b++)g+=d[b%2]*x.charAt(b);if(x.charAt(12)-(10-g%10)%10===0)return!0}return!1}r.exports=a.default,r.exports.default=a.default}(wl,wl.exports)),wl.exports}var Nl={exports:{}},o1;function LS(){return o1||(o1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l="^\\d{4}-?\\d{3}[\\dX]$";function u(d){var p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};(0,i.default)(d);var m=l;if(m=p.require_hyphen?m.replace("?",""):m,m=p.case_sensitive?new RegExp(m):new RegExp(m,"i"),!m.test(d))return!1;for(var v=d.replace("-","").toUpperCase(),y=0,x=0;x<v.length;x++){var g=v[x];y+=(g==="X"?10:+g)*(8-x)}return y%11===0}r.exports=a.default,r.exports.default=a.default}(Nl,Nl.exports)),Nl.exports}var _l={exports:{}},jn={},l1;function cv(){if(l1)return jn;l1=1,Object.defineProperty(jn,"__esModule",{value:!0}),jn.iso7064Check=r,jn.luhnCheck=a,jn.reverseMultiplyAndSum=i,jn.verhoeffCheck=c;function r(l){for(var u=10,d=0;d<l.length-1;d++)u=(parseInt(l[d],10)+u)%10===0?10*2%11:(parseInt(l[d],10)+u)%10*2%11;return u=u===1?0:11-u,u===parseInt(l[10],10)}function a(l){for(var u=0,d=!1,p=l.length-1;p>=0;p--){if(d){var m=parseInt(l[p],10)*2;m>9?u+=m.toString().split("").map(function(v){return parseInt(v,10)}).reduce(function(v,y){return v+y},0):u+=m}else u+=parseInt(l[p],10);d=!d}return u%10===0}function i(l,u){for(var d=0,p=0;p<l.length;p++)d+=l[p]*(u-p);return d}function c(l){for(var u=[[0,1,2,3,4,5,6,7,8,9],[1,2,3,4,0,6,7,8,9,5],[2,3,4,0,1,7,8,9,5,6],[3,4,0,1,2,8,9,5,6,7],[4,0,1,2,3,9,5,6,7,8],[5,9,8,7,6,0,4,3,2,1],[6,5,9,8,7,1,0,4,3,2],[7,6,5,9,8,2,1,0,4,3],[8,7,6,5,9,3,2,1,0,4],[9,8,7,6,5,4,3,2,1,0]],d=[[0,1,2,3,4,5,6,7,8,9],[1,5,7,6,2,8,3,0,9,4],[5,8,0,3,7,9,6,1,4,2],[8,9,1,6,0,4,3,5,2,7],[9,4,5,3,1,2,6,8,7,0],[4,2,8,6,5,7,3,9,0,1],[2,7,9,3,8,0,6,4,1,5],[7,0,4,6,9,1,3,2,5,8]],p=l.split("").reverse().join(""),m=0,v=0;v<p.length;v++)m=u[m][d[v%8][parseInt(p[v],10)]];return m===0}return jn}var u1;function jS(){return u1||(u1=1,function(r,a){function i(A){"@babel/helpers - typeof";return i=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(P){return typeof P}:function(P){return P&&typeof Symbol=="function"&&P.constructor===Symbol&&P!==Symbol.prototype?"symbol":typeof P},i(A)}Object.defineProperty(a,"__esModule",{value:!0}),a.default=hn;var c=m(le()),l=p(cv()),u=m(nv());function d(A){if(typeof WeakMap!="function")return null;var P=new WeakMap,B=new WeakMap;return(d=function(ne){return ne?B:P})(A)}function p(A,P){if(A&&A.__esModule)return A;if(A===null||i(A)!="object"&&typeof A!="function")return{default:A};var B=d(P);if(B&&B.has(A))return B.get(A);var re={__proto__:null},ne=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var de in A)if(de!=="default"&&{}.hasOwnProperty.call(A,de)){var _e=ne?Object.getOwnPropertyDescriptor(A,de):null;_e&&(_e.get||_e.set)?Object.defineProperty(re,de,_e):re[de]=A[de]}return re.default=A,B&&B.set(A,re),re}function m(A){return A&&A.__esModule?A:{default:A}}function v(A){return E(A)||g(A)||x(A)||y()}function y(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function x(A,P){if(A){if(typeof A=="string")return b(A,P);var B=Object.prototype.toString.call(A).slice(8,-1);if(B==="Object"&&A.constructor&&(B=A.constructor.name),B==="Map"||B==="Set")return Array.from(A);if(B==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(B))return b(A,P)}}function g(A){if(typeof Symbol<"u"&&A[Symbol.iterator]!=null||A["@@iterator"]!=null)return Array.from(A)}function E(A){if(Array.isArray(A))return b(A)}function b(A,P){(P==null||P>A.length)&&(P=A.length);for(var B=0,re=new Array(P);B<P;B++)re[B]=A[B];return re}function w(A){var P=A.slice(0,2),B=parseInt(A.slice(2,4),10);B>40?(B-=40,P="20".concat(P)):B>20?(B-=20,P="18".concat(P)):P="19".concat(P),B<10&&(B="0".concat(B));var re="".concat(P,"/").concat(B,"/").concat(A.slice(4,6));if(!(0,u.default)(re,"YYYY/MM/DD"))return!1;for(var ne=A.split("").map(function(Oe){return parseInt(Oe,10)}),de=[2,4,8,5,10,9,7,3,6],_e=0,Pe=0;Pe<de.length;Pe++)_e+=ne[Pe]*de[Pe];return _e=_e%11===10?0:_e%11,_e===ne[9]}function N(A){var P=A.split(""),B=P.filter(function(ne,de){return de%2}).map(function(ne){return Number(ne)*2}).join("").split(""),re=P.filter(function(ne,de){return!(de%2)}).concat(B).map(function(ne){return Number(ne)}).reduce(function(ne,de){return ne+de});return re%10===0}function _(A){A=A.replace(/\W/,"");var P=parseInt(A.slice(0,2),10);if(A.length===10)P<54?P="20".concat(P):P="19".concat(P);else{if(A.slice(6)==="000")return!1;if(P<54)P="19".concat(P);else return!1}P.length===3&&(P=[P.slice(0,2),"0",P.slice(2)].join(""));var B=parseInt(A.slice(2,4),10);if(B>50&&(B-=50),B>20){if(parseInt(P,10)<2004)return!1;B-=20}B<10&&(B="0".concat(B));var re="".concat(P,"/").concat(B,"/").concat(A.slice(4,6));if(!(0,u.default)(re,"YYYY/MM/DD"))return!1;if(A.length===10&&parseInt(A,10)%11!==0){var ne=parseInt(A.slice(0,9),10)%11;if(parseInt(P,10)<1986&&ne===10){if(parseInt(A.slice(9),10)!==0)return!1}else return!1}return!0}function k(A){return l.luhnCheck(A)}function I(A){for(var P=A.split("").map(function(Oe){return parseInt(Oe,10)}),B=[],re=0;re<P.length-1;re++){B.push("");for(var ne=0;ne<P.length-1;ne++)P[re]===P[ne]&&(B[re]+=ne)}if(B=B.filter(function(Oe){return Oe.length>1}),B.length!==2&&B.length!==3)return!1;if(B[0].length===3){for(var de=B[0].split("").map(function(Oe){return parseInt(Oe,10)}),_e=0,Pe=0;Pe<de.length-1;Pe++)de[Pe]+1===de[Pe+1]&&(_e+=1);if(_e===2)return!1}return l.iso7064Check(A)}function z(A){A=A.replace(/\W/,"");var P=parseInt(A.slice(4,6),10),B=A.slice(6,7);switch(B){case"0":case"1":case"2":case"3":P="19".concat(P);break;case"4":case"9":P<37?P="20".concat(P):P="19".concat(P);break;default:if(P<37)P="20".concat(P);else if(P>58)P="18".concat(P);else return!1;break}P.length===3&&(P=[P.slice(0,2),"0",P.slice(2)].join(""));var re="".concat(P,"/").concat(A.slice(2,4),"/").concat(A.slice(0,2));if(!(0,u.default)(re,"YYYY/MM/DD"))return!1;for(var ne=A.split("").map(function(Oe){return parseInt(Oe,10)}),de=0,_e=4,Pe=0;Pe<9;Pe++)de+=ne[Pe]*_e,_e-=1,_e===1&&(_e=7);return de%=11,de===1?!1:de===0?ne[9]===0:ne[9]===11-de}function O(A){for(var P=A.slice(0,8).split("").map(function(de){return parseInt(de,10)}),B=0,re=1;re<P.length;re+=2)B+=P[re];for(var ne=0;ne<P.length;ne+=2)P[ne]<2?B+=1-P[ne]:(B+=2*(P[ne]-2)+5,P[ne]>4&&(B+=2));return String.fromCharCode(B%26+65)===A.charAt(8)}function Z(A){for(var P=A.split("").map(function(ne){return parseInt(ne,10)}),B=0,re=0;re<8;re++)B+=P[re]*Math.pow(2,8-re);return B%11%10===P[8]}function F(A){var P=l.reverseMultiplyAndSum(A.split("").slice(0,7).map(function(B){return parseInt(B,10)}),8);return A.length===9&&A[8]!=="W"&&(P+=(A[8].charCodeAt(0)-64)*9),P%=23,P===0?A[7].toUpperCase()==="W":A[7].toUpperCase()===String.fromCharCode(64+P)}var U={andover:["10","12"],atlanta:["60","67"],austin:["50","53"],brookhaven:["01","02","03","04","05","06","11","13","14","16","21","22","23","25","34","51","52","54","55","56","57","58","59","65"],cincinnati:["30","32","35","36","37","38","61"],fresno:["15","24"],internet:["20","26","27","45","46","47"],kansas:["40","44"],memphis:["94","95"],ogden:["80","90"],philadelphia:["33","39","41","42","43","46","48","62","63","64","66","68","71","72","73","74","75","76","77","81","82","83","84","85","86","87","88","91","92","93","98","99"],sba:["31"]};function Q(){var A=[];for(var P in U)U.hasOwnProperty(P)&&A.push.apply(A,v(U[P]));return A}function T(A){return Q().indexOf(A.slice(0,2))!==-1}function J(A){for(var P=0,B=A.split(""),re=parseInt(B.pop(),10),ne=0;ne<B.length;ne++)P+=B[9-ne]*(2+ne%6);var de=11-P%11;return de===11?de=0:de===10&&(de=9),re===de}function me(A){var P=A.toUpperCase().split("");if(isNaN(parseInt(P[0],10))&&P.length>1){var B=0;switch(P[0]){case"Y":B=1;break;case"Z":B=2;break}P.splice(0,1,B)}else for(;P.length<9;)P.unshift(0);var re=["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];P=P.join("");var ne=parseInt(P.slice(0,8),10)%23;return P[8]===re[ne]}function ce(A){var P=A.slice(1,3),B=A.slice(0,1);switch(B){case"1":case"2":P="18".concat(P);break;case"3":case"4":P="19".concat(P);break;default:P="20".concat(P);break}var re="".concat(P,"/").concat(A.slice(3,5),"/").concat(A.slice(5,7));if(!(0,u.default)(re,"YYYY/MM/DD"))return!1;for(var ne=A.split("").map(function(Be){return parseInt(Be,10)}),de=0,_e=1,Pe=0;Pe<10;Pe++)de+=ne[Pe]*_e,_e+=1,_e===10&&(_e=1);if(de%11===10){de=0,_e=3;for(var Oe=0;Oe<10;Oe++)de+=ne[Oe]*_e,_e+=1,_e===10&&(_e=1);if(de%11===10)return ne[10]===0}return de%11===ne[10]}function ue(A){var P=A.slice(4,6),B=A.slice(6,7);switch(B){case"+":P="18".concat(P);break;case"-":P="19".concat(P);break;default:P="20".concat(P);break}var re="".concat(P,"/").concat(A.slice(2,4),"/").concat(A.slice(0,2));if(!(0,u.default)(re,"YYYY/MM/DD"))return!1;var ne=parseInt(A.slice(0,6)+A.slice(7,10),10)%31;if(ne<10)return ne===parseInt(A.slice(10),10);ne-=10;var de=["A","B","C","D","E","F","H","J","K","L","M","N","P","R","S","T","U","V","W","X","Y"];return de[ne]===A.slice(10)}function G(A){if(A.slice(2,4)!=="00"||A.slice(4,6)!=="00"){var P="".concat(A.slice(0,2),"/").concat(A.slice(2,4),"/").concat(A.slice(4,6));if(!(0,u.default)(P,"YY/MM/DD"))return!1}var B=97-parseInt(A.slice(0,9),10)%97,re=parseInt(A.slice(9,11),10);return!(B!==re&&(B=97-parseInt("2".concat(A.slice(0,9)),10)%97,B!==re))}function oe(A){A=A.replace(/\s/g,"");var P=parseInt(A.slice(0,10),10)%511,B=parseInt(A.slice(10,13),10);return P===B}function W(A){var P="".concat(A.slice(0,4),"/").concat(A.slice(4,6),"/").concat(A.slice(6,8));return!(0,u.default)(P,"YYYY/MM/DD")||!l.luhnCheck(A.slice(0,12))?!1:l.verhoeffCheck("".concat(A.slice(0,11)).concat(A[12]))}function q(A){return l.iso7064Check(A)}function K(A){for(var P=A.split("").map(function(ne){return parseInt(ne,10)}),B=8,re=1;re<9;re++)B+=P[re]*(re+1);return B%11===P[9]}function Y(A){for(var P=!1,B=!1,re=0;re<3;re++)if(!P&&/[AEIOU]/.test(A[re]))P=!0;else if(!B&&P&&A[re]==="X")B=!0;else if(re>0&&(P&&!B&&!/[AEIOU]/.test(A[re])||B&&!/X/.test(A[re])))return!1;return!0}function j(A){var P=A.toUpperCase().split("");if(!Y(P.slice(0,3))||!Y(P.slice(3,6)))return!1;for(var B=[6,7,9,10,12,13,14],re={L:"0",M:"1",N:"2",P:"3",Q:"4",R:"5",S:"6",T:"7",U:"8",V:"9"},ne=0,de=B;ne<de.length;ne++){var _e=de[ne];P[_e]in re&&P.splice(_e,1,re[P[_e]])}var Pe={A:"01",B:"02",C:"03",D:"04",E:"05",H:"06",L:"07",M:"08",P:"09",R:"10",S:"11",T:"12"},Oe=Pe[P[8]],Be=parseInt(P[9]+P[10],10);Be>40&&(Be-=40),Be<10&&(Be="0".concat(Be));var Tt="".concat(P[6]).concat(P[7],"/").concat(Oe,"/").concat(Be);if(!(0,u.default)(Tt,"YY/MM/DD"))return!1;for(var Ot=0,dt=1;dt<P.length-1;dt+=2){var Wt=parseInt(P[dt],10);isNaN(Wt)&&(Wt=P[dt].charCodeAt(0)-65),Ot+=Wt}for(var gn={A:1,B:0,C:5,D:7,E:9,F:13,G:15,H:17,I:19,J:21,K:2,L:4,M:18,N:20,O:11,P:3,Q:6,R:8,S:12,T:14,U:16,V:10,W:22,X:25,Y:24,Z:23,0:1,1:0},nr=0;nr<P.length-1;nr+=2){var hr=0;if(P[nr]in gn)hr=gn[P[nr]];else{var Dn=parseInt(P[nr],10);hr=2*Dn+1,Dn>4&&(hr+=2)}Ot+=hr}return String.fromCharCode(65+Ot%26)===P[15]}function V(A){A=A.replace(/\W/,"");var P=A.slice(0,2);if(P!=="32"){var B=A.slice(2,4);if(B!=="00"){var re=A.slice(4,6);switch(A[6]){case"0":re="18".concat(re);break;case"1":re="19".concat(re);break;default:re="20".concat(re);break}var ne="".concat(re,"/").concat(A.slice(2,4),"/").concat(P);if(!(0,u.default)(ne,"YYYY/MM/DD"))return!1}for(var de=1101,_e=[1,6,3,7,9,10,5,8,4,2],Pe=0;Pe<A.length-1;Pe++)de-=parseInt(A[Pe],10)*_e[Pe];return parseInt(A[10],10)===de%11}return!0}function xe(A){if(A.length!==9){for(var P=A.toUpperCase().split("");P.length<8;)P.unshift(0);switch(A[7]){case"A":case"P":if(parseInt(P[6],10)===0)return!1;break;default:{var B=parseInt(P.join("").slice(0,5),10);if(B>32e3)return!1;var re=parseInt(P.join("").slice(5,7),10);if(B===re)return!1}}}return!0}function Ne(A){return l.reverseMultiplyAndSum(A.split("").slice(0,8).map(function(P){return parseInt(P,10)}),9)%11===parseInt(A[8],10)}function Ce(A){if(A.length===10){for(var P=[6,5,7,2,3,4,5,6,7],B=0,re=0;re<P.length;re++)B+=parseInt(A[re],10)*P[re];return B%=11,B===10?!1:B===parseInt(A[9],10)}var ne=A.slice(0,2),de=parseInt(A.slice(2,4),10);de>80?(ne="18".concat(ne),de-=80):de>60?(ne="22".concat(ne),de-=60):de>40?(ne="21".concat(ne),de-=40):de>20?(ne="20".concat(ne),de-=20):ne="19".concat(ne),de<10&&(de="0".concat(de));var _e="".concat(ne,"/").concat(de,"/").concat(A.slice(4,6));if(!(0,u.default)(_e,"YYYY/MM/DD"))return!1;for(var Pe=0,Oe=1,Be=0;Be<A.length-1;Be++)Pe+=parseInt(A[Be],10)*Oe%10,Oe+=2,Oe>10?Oe=1:Oe===5&&(Oe+=2);return Pe=10-Pe%10,Pe===parseInt(A[10],10)}function Ee(A){if(A.length===11){var P,B;if(P=0,A==="11111111111"||A==="22222222222"||A==="33333333333"||A==="44444444444"||A==="55555555555"||A==="66666666666"||A==="77777777777"||A==="88888888888"||A==="99999999999"||A==="00000000000")return!1;for(var re=1;re<=9;re++)P+=parseInt(A.substring(re-1,re),10)*(11-re);if(B=P*10%11,B===10&&(B=0),B!==parseInt(A.substring(9,10),10))return!1;P=0;for(var ne=1;ne<=10;ne++)P+=parseInt(A.substring(ne-1,ne),10)*(12-ne);return B=P*10%11,B===10&&(B=0),B===parseInt(A.substring(10,11),10)}if(A==="00000000000000"||A==="11111111111111"||A==="22222222222222"||A==="33333333333333"||A==="44444444444444"||A==="55555555555555"||A==="66666666666666"||A==="77777777777777"||A==="88888888888888"||A==="99999999999999")return!1;for(var de=A.length-2,_e=A.substring(0,de),Pe=A.substring(de),Oe=0,Be=de-7,Tt=de;Tt>=1;Tt--)Oe+=_e.charAt(de-Tt)*Be,Be-=1,Be<2&&(Be=9);var Ot=Oe%11<2?0:11-Oe%11;if(Ot!==parseInt(Pe.charAt(0),10))return!1;de+=1,_e=A.substring(0,de),Oe=0,Be=de-7;for(var dt=de;dt>=1;dt--)Oe+=_e.charAt(de-dt)*Be,Be-=1,Be<2&&(Be=9);return Ot=Oe%11<2?0:11-Oe%11,Ot===parseInt(Pe.charAt(1),10)}function je(A){var P=11-l.reverseMultiplyAndSum(A.split("").slice(0,8).map(function(B){return parseInt(B,10)}),9)%11;return P>9?parseInt(A[8],10)===0:P===parseInt(A[8],10)}function Me(A){if(A.slice(0,4)!=="9000"){var P=A.slice(1,3);switch(A[0]){case"1":case"2":P="19".concat(P);break;case"3":case"4":P="18".concat(P);break;case"5":case"6":P="20".concat(P);break}var B="".concat(P,"/").concat(A.slice(3,5),"/").concat(A.slice(5,7));if(B.length===8){if(!(0,u.default)(B,"YY/MM/DD"))return!1}else if(!(0,u.default)(B,"YYYY/MM/DD"))return!1;for(var re=A.split("").map(function(Pe){return parseInt(Pe,10)}),ne=[2,7,9,1,4,6,3,5,8,2,7,9],de=0,_e=0;_e<ne.length;_e++)de+=re[_e]*ne[_e];return de%11===10?re[12]===1:re[12]===de%11}return!0}function Le(A){if(A.length===9){if(A=A.replace(/\W/,""),A.slice(6)==="000")return!1;var P=parseInt(A.slice(0,2),10);if(P>53)return!1;P<10?P="190".concat(P):P="19".concat(P);var B=parseInt(A.slice(2,4),10);B>50&&(B-=50),B<10&&(B="0".concat(B));var re="".concat(P,"/").concat(B,"/").concat(A.slice(4,6));if(!(0,u.default)(re,"YYYY/MM/DD"))return!1}return!0}function Ke(A){var P=11-l.reverseMultiplyAndSum(A.split("").slice(0,7).map(function(B){return parseInt(B,10)}),8)%11;return P===10?parseInt(A[7],10)===0:P===parseInt(A[7],10)}function Tr(A){var P=A.slice(0);A.length>11&&(P=P.slice(2));var B="",re=P.slice(2,4),ne=parseInt(P.slice(4,6),10);if(A.length>11)B=A.slice(0,4);else if(B=A.slice(0,2),A.length===11&&ne<60){var de=new Date().getFullYear().toString(),_e=parseInt(de.slice(0,2),10);if(de=parseInt(de,10),A[6]==="-")parseInt("".concat(_e).concat(B),10)>de?B="".concat(_e-1).concat(B):B="".concat(_e).concat(B);else if(B="".concat(_e-1).concat(B),de-parseInt(B,10)<100)return!1}ne>60&&(ne-=60),ne<10&&(ne="0".concat(ne));var Pe="".concat(B,"/").concat(re,"/").concat(ne);if(Pe.length===8){if(!(0,u.default)(Pe,"YY/MM/DD"))return!1}else if(!(0,u.default)(Pe,"YYYY/MM/DD"))return!1;return l.luhnCheck(A.replace(/\W/,""))}function $n(A){for(var P=A.split("").map(function(de){return parseInt(de,10)}),B=[-1,5,7,9,4,6,10,5,7],re=0,ne=0;ne<B.length;ne++)re+=P[ne]*B[ne];return re%11===10?P[9]===0:P[9]===re%11}var ot={"bg-BG":/^\d{10}$/,"cs-CZ":/^\d{6}\/{0,1}\d{3,4}$/,"de-AT":/^\d{9}$/,"de-DE":/^[1-9]\d{10}$/,"dk-DK":/^\d{6}-{0,1}\d{4}$/,"el-CY":/^[09]\d{7}[A-Z]$/,"el-GR":/^([0-4]|[7-9])\d{8}$/,"en-CA":/^\d{9}$/,"en-GB":/^\d{10}$|^(?!GB|NK|TN|ZZ)(?![DFIQUV])[A-Z](?![DFIQUVO])[A-Z]\d{6}[ABCD ]$/i,"en-IE":/^\d{7}[A-W][A-IW]{0,1}$/i,"en-US":/^\d{2}[- ]{0,1}\d{7}$/,"es-AR":/(20|23|24|27|30|33|34)[0-9]{8}[0-9]/,"es-ES":/^(\d{0,8}|[XYZKLM]\d{7})[A-HJ-NP-TV-Z]$/i,"et-EE":/^[1-6]\d{6}(00[1-9]|0[1-9][0-9]|[1-6][0-9]{2}|70[0-9]|710)\d$/,"fi-FI":/^\d{6}[-+A]\d{3}[0-9A-FHJ-NPR-Y]$/i,"fr-BE":/^\d{11}$/,"fr-FR":/^[0-3]\d{12}$|^[0-3]\d\s\d{2}(\s\d{3}){3}$/,"fr-LU":/^\d{13}$/,"hr-HR":/^\d{11}$/,"hu-HU":/^8\d{9}$/,"it-IT":/^[A-Z]{6}[L-NP-V0-9]{2}[A-EHLMPRST][L-NP-V0-9]{2}[A-ILMZ][L-NP-V0-9]{3}[A-Z]$/i,"lv-LV":/^\d{6}-{0,1}\d{5}$/,"mt-MT":/^\d{3,7}[APMGLHBZ]$|^([1-8])\1\d{7}$/i,"nl-NL":/^\d{9}$/,"pl-PL":/^\d{10,11}$/,"pt-BR":/(?:^\d{11}$)|(?:^\d{14}$)/,"pt-PT":/^\d{9}$/,"ro-RO":/^\d{13}$/,"sk-SK":/^\d{6}\/{0,1}\d{3,4}$/,"sl-SI":/^[1-9]\d{7}$/,"sv-SE":/^(\d{6}[-+]{0,1}\d{4}|(18|19|20)\d{6}[-+]{0,1}\d{4})$/,"uk-UA":/^\d{10}$/};ot["lb-LU"]=ot["fr-LU"],ot["lt-LT"]=ot["et-EE"],ot["nl-BE"]=ot["fr-BE"],ot["fr-CA"]=ot["en-CA"];var ct={"bg-BG":w,"cs-CZ":_,"de-AT":k,"de-DE":I,"dk-DK":z,"el-CY":O,"el-GR":Z,"en-CA":N,"en-IE":F,"en-US":T,"es-AR":J,"es-ES":me,"et-EE":ce,"fi-FI":ue,"fr-BE":G,"fr-FR":oe,"fr-LU":W,"hr-HR":q,"hu-HU":K,"it-IT":j,"lv-LV":V,"mt-MT":xe,"nl-NL":Ne,"pl-PL":Ce,"pt-BR":Ee,"pt-PT":je,"ro-RO":Me,"sk-SK":Le,"sl-SI":Ke,"sv-SE":Tr,"uk-UA":$n};ct["lb-LU"]=ct["fr-LU"],ct["lt-LT"]=ct["et-EE"],ct["nl-BE"]=ct["fr-BE"],ct["fr-CA"]=ct["en-CA"];var pn=/[-\\\/!@#$%\^&\*\(\)\+\=\[\]]+/g,pr={"de-AT":pn,"de-DE":/[\/\\]/g,"fr-BE":pn};pr["nl-BE"]=pr["fr-BE"];function hn(A){var P=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"en-US";(0,c.default)(A);var B=A.slice(0);if(P in ot)return P in pr&&(B=B.replace(pr[P],"")),ot[P].test(B)?P in ct?ct[P](B):!0:!1;throw new Error("Invalid locale '".concat(P,"'"))}r.exports=a.default,r.exports.default=a.default}(_l,_l.exports)),_l.exports}var xa={},c1;function MS(){if(c1)return xa;c1=1,Object.defineProperty(xa,"__esModule",{value:!0}),xa.default=c,xa.locales=void 0;var r=a(le());function a(l){return l&&l.__esModule?l:{default:l}}var i={"am-AM":/^(\+?374|0)(33|4[134]|55|77|88|9[13-689])\d{6}$/,"ar-AE":/^((\+?971)|0)?5[024568]\d{7}$/,"ar-BH":/^(\+?973)?(3|6)\d{7}$/,"ar-DZ":/^(\+?213|0)(5|6|7)\d{8}$/,"ar-LB":/^(\+?961)?((3|81)\d{6}|7\d{7})$/,"ar-EG":/^((\+?20)|0)?1[0125]\d{8}$/,"ar-IQ":/^(\+?964|0)?7[0-9]\d{8}$/,"ar-JO":/^(\+?962|0)?7[789]\d{7}$/,"ar-KW":/^(\+?965)([569]\d{7}|41\d{6})$/,"ar-LY":/^((\+?218)|0)?(9[1-6]\d{7}|[1-8]\d{7,9})$/,"ar-MA":/^(?:(?:\+|00)212|0)[5-7]\d{8}$/,"ar-OM":/^((\+|00)968)?(9[1-9])\d{6}$/,"ar-PS":/^(\+?970|0)5[6|9](\d{7})$/,"ar-SA":/^(!?(\+?966)|0)?5\d{8}$/,"ar-SD":/^((\+?249)|0)?(9[012369]|1[012])\d{7}$/,"ar-SY":/^(!?(\+?963)|0)?9\d{8}$/,"ar-TN":/^(\+?216)?[2459]\d{7}$/,"az-AZ":/^(\+994|0)(10|5[015]|7[07]|99)\d{7}$/,"bs-BA":/^((((\+|00)3876)|06))((([0-3]|[5-6])\d{6})|(4\d{7}))$/,"be-BY":/^(\+?375)?(24|25|29|33|44)\d{7}$/,"bg-BG":/^(\+?359|0)?8[789]\d{7}$/,"bn-BD":/^(\+?880|0)1[13456789][0-9]{8}$/,"ca-AD":/^(\+376)?[346]\d{5}$/,"cs-CZ":/^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,"da-DK":/^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,"de-DE":/^((\+49|0)1)(5[0-25-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7,9}$/,"de-AT":/^(\+43|0)\d{1,4}\d{3,12}$/,"de-CH":/^(\+41|0)([1-9])\d{1,9}$/,"de-LU":/^(\+352)?((6\d1)\d{6})$/,"dv-MV":/^(\+?960)?(7[2-9]|9[1-9])\d{5}$/,"el-GR":/^(\+?30|0)?6(8[5-9]|9(?![26])[0-9])\d{7}$/,"el-CY":/^(\+?357?)?(9(9|6)\d{6})$/,"en-AI":/^(\+?1|0)264(?:2(35|92)|4(?:6[1-2]|76|97)|5(?:3[6-9]|8[1-4])|7(?:2(4|9)|72))\d{4}$/,"en-AU":/^(\+?61|0)4\d{8}$/,"en-AG":/^(?:\+1|1)268(?:464|7(?:1[3-9]|[28]\d|3[0246]|64|7[0-689]))\d{4}$/,"en-BM":/^(\+?1)?441(((3|7)\d{6}$)|(5[0-3][0-9]\d{4}$)|(59\d{5}$))/,"en-BS":/^(\+?1[-\s]?|0)?\(?242\)?[-\s]?\d{3}[-\s]?\d{4}$/,"en-GB":/^(\+?44|0)7\d{9}$/,"en-GG":/^(\+?44|0)1481\d{6}$/,"en-GH":/^(\+233|0)(20|50|24|54|27|57|26|56|23|28|55|59)\d{7}$/,"en-GY":/^(\+592|0)6\d{6}$/,"en-HK":/^(\+?852[-\s]?)?[456789]\d{3}[-\s]?\d{4}$/,"en-MO":/^(\+?853[-\s]?)?[6]\d{3}[-\s]?\d{4}$/,"en-IE":/^(\+?353|0)8[356789]\d{7}$/,"en-IN":/^(\+?91|0)?[6789]\d{9}$/,"en-JM":/^(\+?876)?\d{7}$/,"en-KE":/^(\+?254|0)(7|1)\d{8}$/,"fr-CF":/^(\+?236| ?)(70|75|77|72|21|22)\d{6}$/,"en-SS":/^(\+?211|0)(9[1257])\d{7}$/,"en-KI":/^((\+686|686)?)?( )?((6|7)(2|3|8)[0-9]{6})$/,"en-KN":/^(?:\+1|1)869(?:46\d|48[89]|55[6-8]|66\d|76[02-7])\d{4}$/,"en-LS":/^(\+?266)(22|28|57|58|59|27|52)\d{6}$/,"en-MT":/^(\+?356|0)?(99|79|77|21|27|22|25)[0-9]{6}$/,"en-MU":/^(\+?230|0)?\d{8}$/,"en-MW":/^(\+?265|0)(((77|88|31|99|98|21)\d{7})|(((111)|1)\d{6})|(32000\d{4}))$/,"en-NA":/^(\+?264|0)(6|8)\d{7}$/,"en-NG":/^(\+?234|0)?[789]\d{9}$/,"en-NZ":/^(\+?64|0)[28]\d{7,9}$/,"en-PG":/^(\+?675|0)?(7\d|8[18])\d{6}$/,"en-PK":/^((00|\+)?92|0)3[0-6]\d{8}$/,"en-PH":/^(09|\+639)\d{9}$/,"en-RW":/^(\+?250|0)?[7]\d{8}$/,"en-SG":/^(\+65)?[3689]\d{7}$/,"en-SL":/^(\+?232|0)\d{8}$/,"en-TZ":/^(\+?255|0)?[67]\d{8}$/,"en-UG":/^(\+?256|0)?[7]\d{8}$/,"en-US":/^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,"en-ZA":/^(\+?27|0)\d{9}$/,"en-ZM":/^(\+?26)?09[567]\d{7}$/,"en-ZW":/^(\+263)[0-9]{9}$/,"en-BW":/^(\+?267)?(7[1-8]{1})\d{6}$/,"es-AR":/^\+?549(11|[2368]\d)\d{8}$/,"es-BO":/^(\+?591)?(6|7)\d{7}$/,"es-CO":/^(\+?57)?3(0(0|1|2|4|5)|1\d|2[0-4]|5(0|1))\d{7}$/,"es-CL":/^(\+?56|0)[2-9]\d{1}\d{7}$/,"es-CR":/^(\+506)?[2-8]\d{7}$/,"es-CU":/^(\+53|0053)?5\d{7}$/,"es-DO":/^(\+?1)?8[024]9\d{7}$/,"es-HN":/^(\+?504)?[9|8|3|2]\d{7}$/,"es-EC":/^(\+?593|0)([2-7]|9[2-9])\d{7}$/,"es-ES":/^(\+?34)?[6|7]\d{8}$/,"es-PE":/^(\+?51)?9\d{8}$/,"es-MX":/^(\+?52)?(1|01)?\d{10,11}$/,"es-NI":/^(\+?505)\d{7,8}$/,"es-PA":/^(\+?507)\d{7,8}$/,"es-PY":/^(\+?595|0)9[9876]\d{7}$/,"es-SV":/^(\+?503)?[67]\d{7}$/,"es-UY":/^(\+598|0)9[1-9][\d]{6}$/,"es-VE":/^(\+?58)?(2|4)\d{9}$/,"et-EE":/^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,"fa-IR":/^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,"fi-FI":/^(\+?358|0)\s?(4[0-6]|50)\s?(\d\s?){4,8}$/,"fj-FJ":/^(\+?679)?\s?\d{3}\s?\d{4}$/,"fo-FO":/^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,"fr-BF":/^(\+226|0)[67]\d{7}$/,"fr-BJ":/^(\+229)\d{8}$/,"fr-CD":/^(\+?243|0)?(8|9)\d{8}$/,"fr-CM":/^(\+?237)6[0-9]{8}$/,"fr-FR":/^(\+?33|0)[67]\d{8}$/,"fr-GF":/^(\+?594|0|00594)[67]\d{8}$/,"fr-GP":/^(\+?590|0|00590)[67]\d{8}$/,"fr-MQ":/^(\+?596|0|00596)[67]\d{8}$/,"fr-PF":/^(\+?689)?8[789]\d{6}$/,"fr-RE":/^(\+?262|0|00262)[67]\d{8}$/,"fr-WF":/^(\+681)?\d{6}$/,"he-IL":/^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,"hu-HU":/^(\+?36|06)(20|30|31|50|70)\d{7}$/,"id-ID":/^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,"ir-IR":/^(\+98|0)?9\d{9}$/,"it-IT":/^(\+?39)?\s?3\d{2} ?\d{6,7}$/,"it-SM":/^((\+378)|(0549)|(\+390549)|(\+3780549))?6\d{5,9}$/,"ja-JP":/^(\+81[ \-]?(\(0\))?|0)[6789]0[ \-]?\d{4}[ \-]?\d{4}$/,"ka-GE":/^(\+?995)?(79\d{7}|5\d{8})$/,"kk-KZ":/^(\+?7|8)?7\d{9}$/,"kl-GL":/^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,"ko-KR":/^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,"ky-KG":/^(\+?7\s?\+?7|0)\s?\d{2}\s?\d{3}\s?\d{4}$/,"lt-LT":/^(\+370|8)\d{8}$/,"lv-LV":/^(\+?371)2\d{7}$/,"mg-MG":/^((\+?261|0)(2|3)\d)?\d{7}$/,"mn-MN":/^(\+|00|011)?976(77|81|88|91|94|95|96|99)\d{6}$/,"my-MM":/^(\+?959|09|9)(2[5-7]|3[1-2]|4[0-5]|6[6-9]|7[5-9]|9[6-9])[0-9]{7}$/,"ms-MY":/^(\+?60|0)1(([0145](-|\s)?\d{7,8})|([236-9](-|\s)?\d{7}))$/,"mz-MZ":/^(\+?258)?8[234567]\d{7}$/,"nb-NO":/^(\+?47)?[49]\d{7}$/,"ne-NP":/^(\+?977)?9[78]\d{8}$/,"nl-BE":/^(\+?32|0)4\d{8}$/,"nl-NL":/^(((\+|00)?31\(0\))|((\+|00)?31)|0)6{1}\d{8}$/,"nl-AW":/^(\+)?297(56|59|64|73|74|99)\d{5}$/,"nn-NO":/^(\+?47)?[49]\d{7}$/,"pl-PL":/^(\+?48)? ?([5-8]\d|45) ?\d{3} ?\d{2} ?\d{2}$/,"pt-BR":/^((\+?55\ ?[1-9]{2}\ ?)|(\+?55\ ?\([1-9]{2}\)\ ?)|(0[1-9]{2}\ ?)|(\([1-9]{2}\)\ ?)|([1-9]{2}\ ?))((\d{4}\-?\d{4})|(9[1-9]{1}\d{3}\-?\d{4}))$/,"pt-PT":/^(\+?351)?9[1236]\d{7}$/,"pt-AO":/^(\+244)\d{9}$/,"ro-MD":/^(\+?373|0)((6(0|1|2|6|7|8|9))|(7(6|7|8|9)))\d{6}$/,"ro-RO":/^(\+?40|0)\s?7\d{2}(\/|\s|\.|-)?\d{3}(\s|\.|-)?\d{3}$/,"ru-RU":/^(\+?7|8)?9\d{9}$/,"si-LK":/^(?:0|94|\+94)?(7(0|1|2|4|5|6|7|8)( |-)?)\d{7}$/,"sl-SI":/^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,"sk-SK":/^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,"so-SO":/^(\+?252|0)((6[0-9])\d{7}|(7[1-9])\d{7})$/,"sq-AL":/^(\+355|0)6[789]\d{6}$/,"sr-RS":/^(\+3816|06)[- \d]{5,9}$/,"sv-SE":/^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,"tg-TJ":/^(\+?992)?[5][5]\d{7}$/,"th-TH":/^(\+66|66|0)\d{9}$/,"tr-TR":/^(\+?90|0)?5\d{9}$/,"tk-TM":/^(\+993|993|8)\d{8}$/,"uk-UA":/^(\+?38|8)?0\d{9}$/,"uz-UZ":/^(\+?998)?(6[125-79]|7[1-69]|88|9\d)\d{7}$/,"vi-VN":/^((\+?84)|0)((3([2-9]))|(5([25689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/,"zh-CN":/^((\+|00)86)?(1[3-9]|9[28])\d{9}$/,"zh-TW":/^(\+?886\-?|0)?9\d{8}$/,"dz-BT":/^(\+?975|0)?(17|16|77|02)\d{6}$/,"ar-YE":/^(((\+|00)9677|0?7)[0137]\d{7}|((\+|00)967|0)[1-7]\d{6})$/,"ar-EH":/^(\+?212|0)[\s\-]?(5288|5289)[\s\-]?\d{5}$/,"fa-AF":/^(\+93|0)?(2{1}[0-8]{1}|[3-5]{1}[0-4]{1})(\d{7})$/};i["en-CA"]=i["en-US"],i["fr-CA"]=i["en-CA"],i["fr-BE"]=i["nl-BE"],i["zh-HK"]=i["en-HK"],i["zh-MO"]=i["en-MO"],i["ga-IE"]=i["en-IE"],i["fr-CH"]=i["de-CH"],i["it-CH"]=i["fr-CH"];function c(l,u,d){if((0,r.default)(l),d&&d.strictMode&&!l.startsWith("+"))return!1;if(Array.isArray(u))return u.some(function(v){if(i.hasOwnProperty(v)){var y=i[v];if(y.test(l))return!0}return!1});if(u in i)return i[u].test(l);if(!u||u==="any"){for(var p in i)if(i.hasOwnProperty(p)){var m=i[p];if(m.test(l))return!0}return!1}throw new Error("Invalid locale '".concat(u,"'"))}return xa.locales=Object.keys(i),xa}var kl={exports:{}},d1;function zS(){return d1||(d1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^(0x)[0-9a-f]{40}$/i;function u(d){return(0,i.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(kl,kl.exports)),kl.exports}var bl={exports:{}},f1;function TS(){return f1||(f1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=p;var i=l(wt()),c=l(le());function l(m){return m&&m.__esModule?m:{default:m}}function u(m){var v="\\d{".concat(m.digits_after_decimal[0],"}");m.digits_after_decimal.forEach(function(k,I){I!==0&&(v="".concat(v,"|\\d{").concat(k,"}"))});var y="(".concat(m.symbol.replace(/\W/,function(k){return"\\".concat(k)}),")").concat(m.require_symbol?"":"?"),x="-?",g="[1-9]\\d*",E="[1-9]\\d{0,2}(\\".concat(m.thousands_separator,"\\d{3})*"),b=["0",g,E],w="(".concat(b.join("|"),")?"),N="(\\".concat(m.decimal_separator,"(").concat(v,"))").concat(m.require_decimal?"":"?"),_=w+(m.allow_decimal||m.require_decimal?N:"");return m.allow_negatives&&!m.parens_for_negatives&&(m.negative_sign_after_digits?_+=x:m.negative_sign_before_digits&&(_=x+_)),m.allow_negative_sign_placeholder?_="( (?!\\-))?".concat(_):m.allow_space_after_symbol?_=" ?".concat(_):m.allow_space_after_digits&&(_+="( (?!$))?"),m.symbol_after_digits?_+=y:_=y+_,m.allow_negatives&&(m.parens_for_negatives?_="(\\(".concat(_,"\\)|").concat(_,")"):m.negative_sign_before_digits||m.negative_sign_after_digits||(_=x+_)),new RegExp("^(?!-? )(?=.*\\d)".concat(_,"$"))}var d={symbol:"$",require_symbol:!1,allow_space_after_symbol:!1,symbol_after_digits:!1,allow_negatives:!0,parens_for_negatives:!1,negative_sign_before_digits:!1,negative_sign_after_digits:!1,allow_negative_sign_placeholder:!1,thousands_separator:",",decimal_separator:".",allow_decimal:!0,require_decimal:!1,digits_after_decimal:[2],allow_space_after_digits:!1};function p(m,v){return(0,c.default)(m),v=(0,i.default)(v,d),u(v).test(m)}r.exports=a.default,r.exports.default=a.default}(bl,bl.exports)),bl.exports}var Al={exports:{}},m1;function OS(){return m1||(m1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var i=c(le());function c(p){return p&&p.__esModule?p:{default:p}}var l=/^(bc1)[a-z0-9]{25,39}$/,u=/^(1|3)[A-HJ-NP-Za-km-z1-9]{25,39}$/;function d(p){return(0,i.default)(p),l.test(p)||u.test(p)}r.exports=a.default,r.exports.default=a.default}(Al,Al.exports)),Al.exports}var Sa={},p1;function $S(){if(p1)return Sa;p1=1,Object.defineProperty(Sa,"__esModule",{value:!0}),Sa.isFreightContainerID=void 0,Sa.isISO6346=l;var r=a(le());function a(u){return u&&u.__esModule?u:{default:u}}var i=/^[A-Z]{3}(U[0-9]{7})|([J,Z][0-9]{6,7})$/,c=/^[0-9]$/;function l(u){if((0,r.default)(u),u=u.toUpperCase(),!i.test(u))return!1;if(u.length===11){for(var d=0,p=0;p<u.length-1;p++)if(c.test(u[p]))d+=u[p]*Math.pow(2,p);else{var m=void 0,v=u.charCodeAt(p)-55;v<11?m=v:v>=11&&v<=20?m=12+v%11:v>=21&&v<=30?m=23+v%21:m=34+v%31,d+=m*Math.pow(2,p)}var y=d%11;return Number(u[u.length-1])===y}return!0}return Sa.isFreightContainerID=l,Sa}var Cl={exports:{}},h1;function DS(){return h1||(h1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l=new Set(["aa","ab","ae","af","ak","am","an","ar","as","av","ay","az","az","ba","be","bg","bh","bi","bm","bn","bo","br","bs","ca","ce","ch","co","cr","cs","cu","cv","cy","da","de","dv","dz","ee","el","en","eo","es","et","eu","fa","ff","fi","fj","fo","fr","fy","ga","gd","gl","gn","gu","gv","ha","he","hi","ho","hr","ht","hu","hy","hz","ia","id","ie","ig","ii","ik","io","is","it","iu","ja","jv","ka","kg","ki","kj","kk","kl","km","kn","ko","kr","ks","ku","kv","kw","ky","la","lb","lg","li","ln","lo","lt","lu","lv","mg","mh","mi","mk","ml","mn","mr","ms","mt","my","na","nb","nd","ne","ng","nl","nn","no","nr","nv","ny","oc","oj","om","or","os","pa","pi","pl","ps","pt","qu","rm","rn","ro","ru","rw","sa","sc","sd","se","sg","si","sk","sl","sm","sn","so","sq","sr","ss","st","su","sv","sw","ta","te","tg","th","ti","tk","tl","tn","to","tr","ts","tt","tw","ty","ug","uk","ur","uz","ve","vi","vo","wa","wo","xh","yi","yo","za","zh","zu"]);function u(d){return(0,i.default)(d),l.has(d)}r.exports=a.default,r.exports.default=a.default}(Cl,Cl.exports)),Cl.exports}var El={exports:{}},g1;function FS(){return g1||(g1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=p;var i=c(le());function c(m){return m&&m.__esModule?m:{default:m}}var l=/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/,u=/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/,d=function(v){var y=v.match(/^(\d{4})-?(\d{3})([ T]{1}\.*|$)/);if(y){var x=Number(y[1]),g=Number(y[2]);return x%4===0&&x%100!==0||x%400===0?g<=366:g<=365}var E=v.match(/(\d{4})-?(\d{0,2})-?(\d*)/).map(Number),b=E[1],w=E[2],N=E[3],_=w&&"0".concat(w).slice(-2),k=N&&"0".concat(N).slice(-2),I=new Date("".concat(b,"-").concat(_||"01","-").concat(k||"01"));return w&&N?I.getUTCFullYear()===b&&I.getUTCMonth()+1===w&&I.getUTCDate()===N:!0};function p(m){var v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};(0,i.default)(m);var y=v.strictSeparator?u.test(m):l.test(m);return y&&v.strict?d(m):y}r.exports=a.default,r.exports.default=a.default}(El,El.exports)),El.exports}var Il={exports:{}},v1;function qS(){return v1||(v1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=_;var i=c(le());function c(k){return k&&k.__esModule?k:{default:k}}var l=/[0-9]{4}/,u=/(0[1-9]|1[0-2])/,d=/([12]\d|0[1-9]|3[01])/,p=/([01][0-9]|2[0-3])/,m=/[0-5][0-9]/,v=/([0-5][0-9]|60)/,y=/(\.[0-9]+)?/,x=new RegExp("[-+]".concat(p.source,":").concat(m.source)),g=new RegExp("([zZ]|".concat(x.source,")")),E=new RegExp("".concat(p.source,":").concat(m.source,":").concat(v.source).concat(y.source)),b=new RegExp("".concat(l.source,"-").concat(u.source,"-").concat(d.source)),w=new RegExp("".concat(E.source).concat(g.source)),N=new RegExp("^".concat(b.source,"[ tT]").concat(w.source,"$"));function _(k){return(0,i.default)(k),N.test(k)}r.exports=a.default,r.exports.default=a.default}(Il,Il.exports)),Il.exports}var Rl={exports:{}},y1;function BS(){return y1||(y1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l=new Set(["AFG","ALA","ALB","DZA","ASM","AND","AGO","AIA","ATA","ATG","ARG","ARM","ABW","AUS","AUT","AZE","BHS","BHR","BGD","BRB","BLR","BEL","BLZ","BEN","BMU","BTN","BOL","BES","BIH","BWA","BVT","BRA","IOT","BRN","BGR","BFA","BDI","KHM","CMR","CAN","CPV","CYM","CAF","TCD","CHL","CHN","CXR","CCK","COL","COM","COG","COD","COK","CRI","CIV","HRV","CUB","CUW","CYP","CZE","DNK","DJI","DMA","DOM","ECU","EGY","SLV","GNQ","ERI","EST","ETH","FLK","FRO","FJI","FIN","FRA","GUF","PYF","ATF","GAB","GMB","GEO","DEU","GHA","GIB","GRC","GRL","GRD","GLP","GUM","GTM","GGY","GIN","GNB","GUY","HTI","HMD","VAT","HND","HKG","HUN","ISL","IND","IDN","IRN","IRQ","IRL","IMN","ISR","ITA","JAM","JPN","JEY","JOR","KAZ","KEN","KIR","PRK","KOR","KWT","KGZ","LAO","LVA","LBN","LSO","LBR","LBY","LIE","LTU","LUX","MAC","MKD","MDG","MWI","MYS","MDV","MLI","MLT","MHL","MTQ","MRT","MUS","MYT","MEX","FSM","MDA","MCO","MNG","MNE","MSR","MAR","MOZ","MMR","NAM","NRU","NPL","NLD","NCL","NZL","NIC","NER","NGA","NIU","NFK","MNP","NOR","OMN","PAK","PLW","PSE","PAN","PNG","PRY","PER","PHL","PCN","POL","PRT","PRI","QAT","REU","ROU","RUS","RWA","BLM","SHN","KNA","LCA","MAF","SPM","VCT","WSM","SMR","STP","SAU","SEN","SRB","SYC","SLE","SGP","SXM","SVK","SVN","SLB","SOM","ZAF","SGS","SSD","ESP","LKA","SDN","SUR","SJM","SWZ","SWE","CHE","SYR","TWN","TJK","TZA","THA","TLS","TGO","TKL","TON","TTO","TUN","TUR","TKM","TCA","TUV","UGA","UKR","ARE","GBR","USA","UMI","URY","UZB","VUT","VEN","VNM","VGB","VIR","WLF","ESH","YEM","ZMB","ZWE"]);function u(d){return(0,i.default)(d),l.has(d.toUpperCase())}r.exports=a.default,r.exports.default=a.default}(Rl,Rl.exports)),Rl.exports}var wa={},x1;function US(){if(x1)return wa;x1=1,Object.defineProperty(wa,"__esModule",{value:!0}),wa.CurrencyCodes=void 0,wa.default=c;var r=a(le());function a(l){return l&&l.__esModule?l:{default:l}}var i=new Set(["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BOV","BRL","BSD","BTN","BWP","BYN","BZD","CAD","CDF","CHE","CHF","CHW","CLF","CLP","CNY","COP","COU","CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","INR","IQD","IRR","ISK","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN","MXV","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLE","SLL","SOS","SRD","SSP","STN","SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","USN","UYI","UYU","UYW","UZS","VES","VND","VUV","WST","XAF","XAG","XAU","XBA","XBB","XBC","XBD","XCD","XDR","XOF","XPD","XPF","XPT","XSU","XTS","XUA","XXX","YER","ZAR","ZMW","ZWL"]);function c(l){return(0,r.default)(l),i.has(l.toUpperCase())}return wa.CurrencyCodes=i,wa}var Pl={exports:{}},S1;function HS(){return S1||(S1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=m;var i=l(le()),c=l(wt());function l(v){return v&&v.__esModule?v:{default:v}}var u=/^[A-Z2-7]+=*$/,d=/^[A-HJKMNP-TV-Z0-9]+$/,p={crockford:!1};function m(v,y){if((0,i.default)(v),y=(0,c.default)(y,p),y.crockford)return d.test(v);var x=v.length;return!!(x%8===0&&u.test(v))}r.exports=a.default,r.exports.default=a.default}(Pl,Pl.exports)),Pl.exports}var Ll={exports:{}},w1;function ZS(){return w1||(w1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^[A-HJ-NP-Za-km-z1-9]*$/;function u(d){return(0,i.default)(d),!!l.test(d)}r.exports=a.default,r.exports.default=a.default}(Ll,Ll.exports)),Ll.exports}var jl={exports:{}},N1;function WS(){return N1||(N1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=p;var i=c(le());function c(m){return m&&m.__esModule?m:{default:m}}var l=/^[a-z]+\/[a-z0-9\-\+\._]+$/i,u=/^[a-z\-]+=[a-z0-9\-]+$/i,d=/^[a-z0-9!\$&'\(\)\*\+,;=\-\._~:@\/\?%\s]*$/i;function p(m){(0,i.default)(m);var v=m.split(",");if(v.length<2)return!1;var y=v.shift().trim().split(";"),x=y.shift();if(x.slice(0,5)!=="data:")return!1;var g=x.slice(5);if(g!==""&&!l.test(g))return!1;for(var E=0;E<y.length;E++)if(!(E===y.length-1&&y[E].toLowerCase()==="base64")&&!u.test(y[E]))return!1;for(var b=0;b<v.length;b++)if(!d.test(v[b]))return!1;return!0}r.exports=a.default,r.exports.default=a.default}(jl,jl.exports)),jl.exports}var Ml={exports:{}},_1;function GS(){return _1||(_1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l=/(?:^magnet:\?|[^?&]&)xt(?:\.1)?=urn:(?:(?:aich|bitprint|btih|ed2k|ed2khash|kzhash|md5|sha1|tree:tiger):[a-z0-9]{32}(?:[a-z0-9]{8})?|btmh:1220[a-z0-9]{64})(?:$|&)/i;function u(d){return(0,i.default)(d),d.indexOf("magnet:?")!==0?!1:l.test(d)}r.exports=a.default,r.exports.default=a.default}(Ml,Ml.exports)),Ml.exports}var zl={exports:{}},Tl={exports:{}},Ol={exports:{}},k1;function dv(){return k1||(k1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var i=c(le());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d){if((0,i.default)(u),d){var p=new RegExp("[".concat(d.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"]+$"),"g");return u.replace(p,"")}for(var m=u.length-1;/\s/.test(u.charAt(m));)m-=1;return u.slice(0,m+1)}r.exports=a.default,r.exports.default=a.default}(Ol,Ol.exports)),Ol.exports}var $l={exports:{}},b1;function fv(){return b1||(b1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var i=c(le());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d){(0,i.default)(u);var p=d?new RegExp("^[".concat(d.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"]+"),"g"):/^\s+/g;return u.replace(p,"")}r.exports=a.default,r.exports.default=a.default}($l,$l.exports)),$l.exports}var A1;function mv(){return A1||(A1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=l(dv()),c=l(fv());function l(d){return d&&d.__esModule?d:{default:d}}function u(d,p){return(0,i.default)((0,c.default)(d,p),p)}r.exports=a.default,r.exports.default=a.default}(Tl,Tl.exports)),Tl.exports}var C1;function VS(){return C1||(C1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=b;var i=u(mv()),c=u(rv()),l=u(le());function u(w){return w&&w.__esModule?w:{default:w}}function d(w,N){return v(w)||m(w,N)||x(w,N)||p()}function p(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function m(w,N){var _=w==null?null:typeof Symbol<"u"&&w[Symbol.iterator]||w["@@iterator"];if(_!=null){var k,I,z,O,Z=[],F=!0,U=!1;try{if(z=(_=_.call(w)).next,N!==0)for(;!(F=(k=z.call(_)).done)&&(Z.push(k.value),Z.length!==N);F=!0);}catch(Q){U=!0,I=Q}finally{try{if(!F&&_.return!=null&&(O=_.return(),Object(O)!==O))return}finally{if(U)throw I}}return Z}}function v(w){if(Array.isArray(w))return w}function y(w,N){var _=typeof Symbol<"u"&&w[Symbol.iterator]||w["@@iterator"];if(!_){if(Array.isArray(w)||(_=x(w))||N){_&&(w=_);var k=0,I=function(){};return{s:I,n:function(){return k>=w.length?{done:!0}:{done:!1,value:w[k++]}},e:function(U){throw U},f:I}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var z=!0,O=!1,Z;return{s:function(){_=_.call(w)},n:function(){var U=_.next();return z=U.done,U},e:function(U){O=!0,Z=U},f:function(){try{!z&&_.return!=null&&_.return()}finally{if(O)throw Z}}}}function x(w,N){if(w){if(typeof w=="string")return g(w,N);var _=Object.prototype.toString.call(w).slice(8,-1);if(_==="Object"&&w.constructor&&(_=w.constructor.name),_==="Map"||_==="Set")return Array.from(w);if(_==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(_))return g(w,N)}}function g(w,N){(N==null||N>w.length)&&(N=w.length);for(var _=0,k=new Array(N);_<N;_++)k[_]=w[_];return k}function E(w){var N=new Set(["subject","body","cc","bcc"]),_={cc:"",bcc:""},k=!1,I=w.split("&");if(I.length>4)return!1;var z=y(I),O;try{for(z.s();!(O=z.n()).done;){var Z=O.value,F=Z.split("="),U=d(F,2),Q=U[0],T=U[1];if(Q&&!N.has(Q)){k=!0;break}T&&(Q==="cc"||Q==="bcc")&&(_[Q]=T),Q&&N.delete(Q)}}catch(J){z.e(J)}finally{z.f()}return k?!1:_}function b(w,N){if((0,l.default)(w),w.indexOf("mailto:")!==0)return!1;var _=w.replace("mailto:","").split("?"),k=d(_,2),I=k[0],z=k[1],O=z===void 0?"":z;if(!I&&!O)return!0;var Z=E(O);return Z?"".concat(I,",").concat(Z.cc,",").concat(Z.bcc).split(",").every(function(F){return F=(0,i.default)(F," "),F?(0,c.default)(F,N):!0}):!1}r.exports=a.default,r.exports.default=a.default}(zl,zl.exports)),zl.exports}var Dl={exports:{}},E1;function KS(){return E1||(E1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=p;var i=c(le());function c(m){return m&&m.__esModule?m:{default:m}}var l=/^(application|audio|font|image|message|model|multipart|text|video)\/[a-zA-Z0-9\.\-\+_]{1,100}$/i,u=/^text\/[a-zA-Z0-9\.\-\+]{1,100};\s?charset=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?$/i,d=/^multipart\/[a-zA-Z0-9\.\-\+]{1,100}(;\s?(boundary|charset)=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?){0,2}$/i;function p(m){return(0,i.default)(m),l.test(m)||u.test(m)||d.test(m)}r.exports=a.default,r.exports.default=a.default}(Dl,Dl.exports)),Dl.exports}var Fl={exports:{}},I1;function YS(){return I1||(I1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=y;var i=l(le()),c=l(wt());function l(x){return x&&x.__esModule?x:{default:x}}var u=/^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/,d=/^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/,p=/^(([1-8]?\d)\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|90\D+0\D+0)\D+[NSns]?$/i,m=/^\s*([1-7]?\d{1,2}\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|180\D+0\D+0)\D+[EWew]?$/i,v={checkDMS:!1};function y(x,g){if((0,i.default)(x),g=(0,c.default)(g,v),!x.includes(","))return!1;var E=x.split(",");return E[0].startsWith("(")&&!E[1].endsWith(")")||E[1].endsWith(")")&&!E[0].startsWith("(")?!1:g.checkDMS?p.test(E[0])&&m.test(E[1]):u.test(E[0])&&d.test(E[1])}r.exports=a.default,r.exports.default=a.default}(Fl,Fl.exports)),Fl.exports}var Na={},R1;function QS(){if(R1)return Na;R1=1,Object.defineProperty(Na,"__esModule",{value:!0}),Na.default=p,Na.locales=void 0;var r=a(le());function a(m){return m&&m.__esModule?m:{default:m}}var i=/^\d{3}$/,c=/^\d{4}$/,l=/^\d{5}$/,u=/^\d{6}$/,d={AD:/^AD\d{3}$/,AT:c,AU:c,AZ:/^AZ\d{4}$/,BA:/^([7-8]\d{4}$)/,BE:c,BG:c,BR:/^\d{5}-\d{3}$/,BY:/^2[1-4]\d{4}$/,CA:/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,CH:c,CN:/^(0[1-7]|1[012356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[1-5]|8[1345]|9[09])\d{4}$/,CZ:/^\d{3}\s?\d{2}$/,DE:l,DK:c,DO:l,DZ:l,EE:l,ES:/^(5[0-2]{1}|[0-4]{1}\d{1})\d{3}$/,FI:l,FR:/^\d{2}\s?\d{3}$/,GB:/^(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?(\d[a-z]{2})?)$/i,GR:/^\d{3}\s?\d{2}$/,HR:/^([1-5]\d{4}$)/,HT:/^HT\d{4}$/,HU:c,ID:l,IE:/^(?!.*(?:o))[A-Za-z]\d[\dw]\s\w{4}$/i,IL:/^(\d{5}|\d{7})$/,IN:/^((?!10|29|35|54|55|65|66|86|87|88|89)[1-9][0-9]{5})$/,IR:/^(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}$/,IS:i,IT:l,JP:/^\d{3}\-\d{4}$/,KE:l,KR:/^(\d{5}|\d{6})$/,LI:/^(948[5-9]|949[0-7])$/,LT:/^LT\-\d{5}$/,LU:c,LV:/^LV\-\d{4}$/,LK:l,MG:i,MX:l,MT:/^[A-Za-z]{3}\s{0,1}\d{4}$/,MY:l,NL:/^[1-9]\d{3}\s?(?!sa|sd|ss)[a-z]{2}$/i,NO:c,NP:/^(10|21|22|32|33|34|44|45|56|57)\d{3}$|^(977)$/i,NZ:c,PL:/^\d{2}\-\d{3}$/,PR:/^00[679]\d{2}([ -]\d{4})?$/,PT:/^\d{4}\-\d{3}?$/,RO:u,RU:u,SA:l,SE:/^[1-9]\d{2}\s?\d{2}$/,SG:u,SI:c,SK:/^\d{3}\s?\d{2}$/,TH:l,TN:c,TW:/^\d{3}(\d{2})?$/,UA:l,US:/^\d{5}(-\d{4})?$/,ZA:c,ZM:l};Na.locales=Object.keys(d);function p(m,v){if((0,r.default)(m),v in d)return d[v].test(m);if(v==="any"){for(var y in d)if(d.hasOwnProperty(y)){var x=d[y];if(x.test(m))return!0}return!1}throw new Error("Invalid locale '".concat(v,"'"))}return Na}var ql={exports:{}},P1;function XS(){return P1||(P1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var i=c(le());function c(u){return u&&u.__esModule?u:{default:u}}function l(u){return(0,i.default)(u),u.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\//g,"&#x2F;").replace(/\\/g,"&#x5C;").replace(/`/g,"&#96;")}r.exports=a.default,r.exports.default=a.default}(ql,ql.exports)),ql.exports}var Bl={exports:{}},L1;function JS(){return L1||(L1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var i=c(le());function c(u){return u&&u.__esModule?u:{default:u}}function l(u){return(0,i.default)(u),u.replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#x2F;/g,"/").replace(/&#x5C;/g,"\\").replace(/&#96;/g,"`").replace(/&amp;/g,"&")}r.exports=a.default,r.exports.default=a.default}(Bl,Bl.exports)),Bl.exports}var Ul={exports:{}},Hl={exports:{}},j1;function pv(){return j1||(j1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var i=c(le());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d){return(0,i.default)(u),u.replace(new RegExp("[".concat(d,"]+"),"g"),"")}r.exports=a.default,r.exports.default=a.default}(Hl,Hl.exports)),Hl.exports}var M1;function ew(){return M1||(M1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=l(le()),c=l(pv());function l(d){return d&&d.__esModule?d:{default:d}}function u(d,p){(0,i.default)(d);var m=p?"\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F":"\\x00-\\x1F\\x7F";return(0,c.default)(d,m)}r.exports=a.default,r.exports.default=a.default}(Ul,Ul.exports)),Ul.exports}var Zl={exports:{}},z1;function tw(){return z1||(z1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var i=c(le());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d){return(0,i.default)(u),u.replace(new RegExp("[^".concat(d,"]+"),"g"),"")}r.exports=a.default,r.exports.default=a.default}(Zl,Zl.exports)),Zl.exports}var Wl={exports:{}},T1;function rw(){return T1||(T1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var i=c(le());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d){(0,i.default)(u);for(var p=u.length-1;p>=0;p--)if(d.indexOf(u[p])===-1)return!1;return!0}r.exports=a.default,r.exports.default=a.default}(Wl,Wl.exports)),Wl.exports}var Gl={exports:{}},O1;function nw(){return O1||(O1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=y;var i=c(wt());function c(x){return x&&x.__esModule?x:{default:x}}var l={all_lowercase:!0,gmail_lowercase:!0,gmail_remove_dots:!0,gmail_remove_subaddress:!0,gmail_convert_googlemaildotcom:!0,outlookdotcom_lowercase:!0,outlookdotcom_remove_subaddress:!0,yahoo_lowercase:!0,yahoo_remove_subaddress:!0,yandex_lowercase:!0,icloud_lowercase:!0,icloud_remove_subaddress:!0},u=["icloud.com","me.com"],d=["hotmail.at","hotmail.be","hotmail.ca","hotmail.cl","hotmail.co.il","hotmail.co.nz","hotmail.co.th","hotmail.co.uk","hotmail.com","hotmail.com.ar","hotmail.com.au","hotmail.com.br","hotmail.com.gr","hotmail.com.mx","hotmail.com.pe","hotmail.com.tr","hotmail.com.vn","hotmail.cz","hotmail.de","hotmail.dk","hotmail.es","hotmail.fr","hotmail.hu","hotmail.id","hotmail.ie","hotmail.in","hotmail.it","hotmail.jp","hotmail.kr","hotmail.lv","hotmail.my","hotmail.ph","hotmail.pt","hotmail.sa","hotmail.sg","hotmail.sk","live.be","live.co.uk","live.com","live.com.ar","live.com.mx","live.de","live.es","live.eu","live.fr","live.it","live.nl","msn.com","outlook.at","outlook.be","outlook.cl","outlook.co.il","outlook.co.nz","outlook.co.th","outlook.com","outlook.com.ar","outlook.com.au","outlook.com.br","outlook.com.gr","outlook.com.pe","outlook.com.tr","outlook.com.vn","outlook.cz","outlook.de","outlook.dk","outlook.es","outlook.fr","outlook.hu","outlook.id","outlook.ie","outlook.in","outlook.it","outlook.jp","outlook.kr","outlook.lv","outlook.my","outlook.ph","outlook.pt","outlook.sa","outlook.sg","outlook.sk","passport.com"],p=["rocketmail.com","yahoo.ca","yahoo.co.uk","yahoo.com","yahoo.de","yahoo.fr","yahoo.in","yahoo.it","ymail.com"],m=["yandex.ru","yandex.ua","yandex.kz","yandex.com","yandex.by","ya.ru"];function v(x){return x.length>1?x:""}function y(x,g){g=(0,i.default)(g,l);var E=x.split("@"),b=E.pop(),w=E.join("@"),N=[w,b];if(N[1]=N[1].toLowerCase(),N[1]==="gmail.com"||N[1]==="googlemail.com"){if(g.gmail_remove_subaddress&&(N[0]=N[0].split("+")[0]),g.gmail_remove_dots&&(N[0]=N[0].replace(/\.+/g,v)),!N[0].length)return!1;(g.all_lowercase||g.gmail_lowercase)&&(N[0]=N[0].toLowerCase()),N[1]=g.gmail_convert_googlemaildotcom?"gmail.com":N[1]}else if(u.indexOf(N[1])>=0){if(g.icloud_remove_subaddress&&(N[0]=N[0].split("+")[0]),!N[0].length)return!1;(g.all_lowercase||g.icloud_lowercase)&&(N[0]=N[0].toLowerCase())}else if(d.indexOf(N[1])>=0){if(g.outlookdotcom_remove_subaddress&&(N[0]=N[0].split("+")[0]),!N[0].length)return!1;(g.all_lowercase||g.outlookdotcom_lowercase)&&(N[0]=N[0].toLowerCase())}else if(p.indexOf(N[1])>=0){if(g.yahoo_remove_subaddress){var _=N[0].split("-");N[0]=_.length>1?_.slice(0,-1).join("-"):_[0]}if(!N[0].length)return!1;(g.all_lowercase||g.yahoo_lowercase)&&(N[0]=N[0].toLowerCase())}else m.indexOf(N[1])>=0?((g.all_lowercase||g.yandex_lowercase)&&(N[0]=N[0].toLowerCase()),N[1]="yandex.ru"):g.all_lowercase&&(N[0]=N[0].toLowerCase());return N.join("@")}r.exports=a.default,r.exports.default=a.default}(Gl,Gl.exports)),Gl.exports}var Vl={exports:{}},$1;function aw(){return $1||($1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^[^\s-_](?!.*?[-_]{2,})[a-z0-9-\\][^\s]*[^-_\s]$/;function u(d){return(0,i.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(Vl,Vl.exports)),Vl.exports}var Kl={exports:{}},D1;function iw(){return D1||(D1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var i=c(le());function c(d){return d&&d.__esModule?d:{default:d}}var l={"cs-CZ":function(p){return/^(([ABCDEFHIJKLMNPRSTUVXYZ]|[0-9])-?){5,8}$/.test(p)},"de-DE":function(p){return/^((A|AA|AB|AC|AE|AH|AK|AM|AN|AÖ|AP|AS|AT|AU|AW|AZ|B|BA|BB|BC|BE|BF|BH|BI|BK|BL|BM|BN|BO|BÖ|BS|BT|BZ|C|CA|CB|CE|CO|CR|CW|D|DA|DD|DE|DH|DI|DL|DM|DN|DO|DU|DW|DZ|E|EA|EB|ED|EE|EF|EG|EH|EI|EL|EM|EN|ER|ES|EU|EW|F|FB|FD|FF|FG|FI|FL|FN|FO|FR|FS|FT|FÜ|FW|FZ|G|GA|GC|GD|GE|GF|GG|GI|GK|GL|GM|GN|GÖ|GP|GR|GS|GT|GÜ|GV|GW|GZ|H|HA|HB|HC|HD|HE|HF|HG|HH|HI|HK|HL|HM|HN|HO|HP|HR|HS|HU|HV|HX|HY|HZ|IK|IL|IN|IZ|J|JE|JL|K|KA|KB|KC|KE|KF|KG|KH|KI|KK|KL|KM|KN|KO|KR|KS|KT|KU|KW|KY|L|LA|LB|LC|LD|LF|LG|LH|LI|LL|LM|LN|LÖ|LP|LR|LU|M|MA|MB|MC|MD|ME|MG|MH|MI|MK|ML|MM|MN|MO|MQ|MR|MS|MÜ|MW|MY|MZ|N|NB|ND|NE|NF|NH|NI|NK|NM|NÖ|NP|NR|NT|NU|NW|NY|NZ|OA|OB|OC|OD|OE|OF|OG|OH|OK|OL|OP|OS|OZ|P|PA|PB|PE|PF|PI|PL|PM|PN|PR|PS|PW|PZ|R|RA|RC|RD|RE|RG|RH|RI|RL|RM|RN|RO|RP|RS|RT|RU|RV|RW|RZ|S|SB|SC|SE|SG|SI|SK|SL|SM|SN|SO|SP|SR|ST|SU|SW|SY|SZ|TE|TF|TG|TO|TP|TR|TS|TT|TÜ|ÜB|UE|UH|UL|UM|UN|V|VB|VG|VK|VR|VS|W|WA|WB|WE|WF|WI|WK|WL|WM|WN|WO|WR|WS|WT|WÜ|WW|WZ|Z|ZE|ZI|ZP|ZR|ZW|ZZ)[- ]?[A-Z]{1,2}[- ]?\d{1,4}|(ABG|ABI|AIB|AIC|ALF|ALZ|ANA|ANG|ANK|APD|ARN|ART|ASL|ASZ|AUR|AZE|BAD|BAR|BBG|BCH|BED|BER|BGD|BGL|BID|BIN|BIR|BIT|BIW|BKS|BLB|BLK|BNA|BOG|BOH|BOR|BOT|BRA|BRB|BRG|BRK|BRL|BRV|BSB|BSK|BTF|BÜD|BUL|BÜR|BÜS|BÜZ|CAS|CHA|CLP|CLZ|COC|COE|CUX|DAH|DAN|DAU|DBR|DEG|DEL|DGF|DIL|DIN|DIZ|DKB|DLG|DON|DUD|DÜW|EBE|EBN|EBS|ECK|EIC|EIL|EIN|EIS|EMD|EMS|ERB|ERH|ERK|ERZ|ESB|ESW|FDB|FDS|FEU|FFB|FKB|FLÖ|FOR|FRG|FRI|FRW|FTL|FÜS|GAN|GAP|GDB|GEL|GEO|GER|GHA|GHC|GLA|GMN|GNT|GOA|GOH|GRA|GRH|GRI|GRM|GRZ|GTH|GUB|GUN|GVM|HAB|HAL|HAM|HAS|HBN|HBS|HCH|HDH|HDL|HEB|HEF|HEI|HER|HET|HGN|HGW|HHM|HIG|HIP|HMÜ|HOG|HOH|HOL|HOM|HOR|HÖS|HOT|HRO|HSK|HST|HVL|HWI|IGB|ILL|JÜL|KEH|KEL|KEM|KIB|KLE|KLZ|KÖN|KÖT|KÖZ|KRU|KÜN|KUS|KYF|LAN|LAU|LBS|LBZ|LDK|LDS|LEO|LER|LEV|LIB|LIF|LIP|LÖB|LOS|LRO|LSZ|LÜN|LUP|LWL|MAB|MAI|MAK|MAL|MED|MEG|MEI|MEK|MEL|MER|MET|MGH|MGN|MHL|MIL|MKK|MOD|MOL|MON|MOS|MSE|MSH|MSP|MST|MTK|MTL|MÜB|MÜR|MYK|MZG|NAB|NAI|NAU|NDH|NEA|NEB|NEC|NEN|NES|NEW|NMB|NMS|NOH|NOL|NOM|NOR|NVP|NWM|OAL|OBB|OBG|OCH|OHA|ÖHR|OHV|OHZ|OPR|OSL|OVI|OVL|OVP|PAF|PAN|PAR|PCH|PEG|PIR|PLÖ|PRÜ|QFT|QLB|RDG|REG|REH|REI|RID|RIE|ROD|ROF|ROK|ROL|ROS|ROT|ROW|RSL|RÜD|RÜG|SAB|SAD|SAN|SAW|SBG|SBK|SCZ|SDH|SDL|SDT|SEB|SEE|SEF|SEL|SFB|SFT|SGH|SHA|SHG|SHK|SHL|SIG|SIM|SLE|SLF|SLK|SLN|SLS|SLÜ|SLZ|SMÜ|SOB|SOG|SOK|SÖM|SON|SPB|SPN|SRB|SRO|STA|STB|STD|STE|STL|SUL|SÜW|SWA|SZB|TBB|TDO|TET|TIR|TÖL|TUT|UEM|UER|UFF|USI|VAI|VEC|VER|VIB|VIE|VIT|VOH|WAF|WAK|WAN|WAR|WAT|WBS|WDA|WEL|WEN|WER|WES|WHV|WIL|WIS|WIT|WIZ|WLG|WMS|WND|WOB|WOH|WOL|WOR|WOS|WRN|WSF|WST|WSW|WTL|WTM|WUG|WÜM|WUN|WUR|WZL|ZEL|ZIG)[- ]?(([A-Z][- ]?\d{1,4})|([A-Z]{2}[- ]?\d{1,3})))[- ]?(E|H)?$/.test(p)},"de-LI":function(p){return/^FL[- ]?\d{1,5}[UZ]?$/.test(p)},"en-IN":function(p){return/^[A-Z]{2}[ -]?[0-9]{1,2}(?:[ -]?[A-Z])(?:[ -]?[A-Z]*)?[ -]?[0-9]{4}$/.test(p)},"es-AR":function(p){return/^(([A-Z]{2} ?[0-9]{3} ?[A-Z]{2})|([A-Z]{3} ?[0-9]{3}))$/.test(p)},"fi-FI":function(p){return/^(?=.{4,7})(([A-Z]{1,3}|[0-9]{1,3})[\s-]?([A-Z]{1,3}|[0-9]{1,5}))$/.test(p)},"hu-HU":function(p){return/^((((?!AAA)(([A-NPRSTVZWXY]{1})([A-PR-Z]{1})([A-HJ-NPR-Z]))|(A[ABC]I)|A[ABC]O|A[A-W]Q|BPI|BPO|UCO|UDO|XAO)-(?!000)\d{3})|(M\d{6})|((CK|DT|CD|HC|H[ABEFIKLMNPRSTVX]|MA|OT|R[A-Z]) \d{2}-\d{2})|(CD \d{3}-\d{3})|(C-(C|X) \d{4})|(X-(A|B|C) \d{4})|(([EPVZ]-\d{5}))|(S A[A-Z]{2} \d{2})|(SP \d{2}-\d{2}))$/.test(p)},"pt-BR":function(p){return/^[A-Z]{3}[ -]?[0-9][A-Z][0-9]{2}|[A-Z]{3}[ -]?[0-9]{4}$/.test(p)},"pt-PT":function(p){return/^([A-Z]{2}|[0-9]{2})[ -·]?([A-Z]{2}|[0-9]{2})[ -·]?([A-Z]{2}|[0-9]{2})$/.test(p)},"sq-AL":function(p){return/^[A-Z]{2}[- ]?((\d{3}[- ]?(([A-Z]{2})|T))|(R[- ]?\d{3}))$/.test(p)},"sv-SE":function(p){return/^[A-HJ-PR-UW-Z]{3} ?[\d]{2}[A-HJ-PR-UW-Z1-9]$|(^[A-ZÅÄÖ ]{2,7}$)/.test(p.trim())},"en-PK":function(p){return/(^[A-Z]{2}((\s|-){0,1})[0-9]{3,4}((\s|-)[0-9]{2}){0,1}$)|(^[A-Z]{3}((\s|-){0,1})[0-9]{3,4}((\s|-)[0-9]{2}){0,1}$)|(^[A-Z]{4}((\s|-){0,1})[0-9]{3,4}((\s|-)[0-9]{2}){0,1}$)|(^[A-Z]((\s|-){0,1})[0-9]{4}((\s|-)[0-9]{2}){0,1}$)/.test(p.trim())}};function u(d,p){if((0,i.default)(d),p in l)return l[p](d);if(p==="any"){for(var m in l){var v=l[m];if(v(d))return!0}return!1}throw new Error("Invalid locale '".concat(p,"'"))}r.exports=a.default,r.exports.default=a.default}(Kl,Kl.exports)),Kl.exports}var Yl={exports:{}},F1;function sw(){return F1||(F1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=E;var i=l(wt()),c=l(le());function l(b){return b&&b.__esModule?b:{default:b}}var u=/^[A-Z]$/,d=/^[a-z]$/,p=/^[0-9]$/,m=/^[-#!$@£%^&*()_+|~=`{}\[\]:";'<>?,.\/\\ ]$/,v={minLength:8,minLowercase:1,minUppercase:1,minNumbers:1,minSymbols:1,returnScore:!1,pointsPerUnique:1,pointsPerRepeat:.5,pointsForContainingLower:10,pointsForContainingUpper:10,pointsForContainingNumber:10,pointsForContainingSymbol:10};function y(b){var w={};return Array.from(b).forEach(function(N){var _=w[N];_?w[N]+=1:w[N]=1}),w}function x(b){var w=y(b),N={length:b.length,uniqueChars:Object.keys(w).length,uppercaseCount:0,lowercaseCount:0,numberCount:0,symbolCount:0};return Object.keys(w).forEach(function(_){u.test(_)?N.uppercaseCount+=w[_]:d.test(_)?N.lowercaseCount+=w[_]:p.test(_)?N.numberCount+=w[_]:m.test(_)&&(N.symbolCount+=w[_])}),N}function g(b,w){var N=0;return N+=b.uniqueChars*w.pointsPerUnique,N+=(b.length-b.uniqueChars)*w.pointsPerRepeat,b.lowercaseCount>0&&(N+=w.pointsForContainingLower),b.uppercaseCount>0&&(N+=w.pointsForContainingUpper),b.numberCount>0&&(N+=w.pointsForContainingNumber),b.symbolCount>0&&(N+=w.pointsForContainingSymbol),N}function E(b){var w=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;(0,c.default)(b);var N=x(b);return w=(0,i.default)(w||{},v),w.returnScore?g(N,w):N.length>=w.minLength&&N.lowercaseCount>=w.minLowercase&&N.uppercaseCount>=w.minUppercase&&N.numberCount>=w.minNumbers&&N.symbolCount>=w.minSymbols}r.exports=a.default,r.exports.default=a.default}(Yl,Yl.exports)),Yl.exports}var _a={},q1;function ow(){if(q1)return _a;q1=1;function r(x){"@babel/helpers - typeof";return r=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(g){return typeof g}:function(g){return g&&typeof Symbol=="function"&&g.constructor===Symbol&&g!==Symbol.prototype?"symbol":typeof g},r(x)}Object.defineProperty(_a,"__esModule",{value:!0}),_a.default=y,_a.vatMatchers=void 0;var a=u(le()),i=l(cv());function c(x){if(typeof WeakMap!="function")return null;var g=new WeakMap,E=new WeakMap;return(c=function(w){return w?E:g})(x)}function l(x,g){if(x&&x.__esModule)return x;if(x===null||r(x)!="object"&&typeof x!="function")return{default:x};var E=c(g);if(E&&E.has(x))return E.get(x);var b={__proto__:null},w=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var N in x)if(N!=="default"&&{}.hasOwnProperty.call(x,N)){var _=w?Object.getOwnPropertyDescriptor(x,N):null;_&&(_.get||_.set)?Object.defineProperty(b,N,_):b[N]=x[N]}return b.default=x,E&&E.set(x,b),b}function u(x){return x&&x.__esModule?x:{default:x}}var d=function(g){var E=g.match(/^(AU)?(\d{11})$/);if(!E)return!1;var b=[10,1,3,5,7,9,11,13,15,17,19];g=g.replace(/^AU/,"");for(var w=(parseInt(g.slice(0,1),10)-1).toString()+g.slice(1),N=0,_=0;_<11;_++)N+=b[_]*w.charAt(_);return N!==0&&N%89===0},p=function(g){var E=function(w){var N=w.pop(),_=[5,4,3,2,7,6,5,4],k=(11-w.reduce(function(I,z,O){return I+z*_[O]},0)%11)%11;return N===k};return/^(CHE[- ]?)?(\d{9}|(\d{3}\.\d{3}\.\d{3})|(\d{3} \d{3} \d{3})) ?(TVA|MWST|IVA)?$/.test(g)&&E(g.match(/\d/g).map(function(b){return+b}))},m=function(g){var E=g.match(/^(PT)?(\d{9})$/);if(!E)return!1;var b=E[2],w=11-i.reverseMultiplyAndSum(b.split("").slice(0,8).map(function(N){return parseInt(N,10)}),9)%11;return w>9?parseInt(b[8],10)===0:w===parseInt(b[8],10)},v=_a.vatMatchers={AT:function(g){return/^(AT)?U\d{8}$/.test(g)},BE:function(g){return/^(BE)?\d{10}$/.test(g)},BG:function(g){return/^(BG)?\d{9,10}$/.test(g)},HR:function(g){return/^(HR)?\d{11}$/.test(g)},CY:function(g){return/^(CY)?\w{9}$/.test(g)},CZ:function(g){return/^(CZ)?\d{8,10}$/.test(g)},DK:function(g){return/^(DK)?\d{8}$/.test(g)},EE:function(g){return/^(EE)?\d{9}$/.test(g)},FI:function(g){return/^(FI)?\d{8}$/.test(g)},FR:function(g){return/^(FR)?\w{2}\d{9}$/.test(g)},DE:function(g){return/^(DE)?\d{9}$/.test(g)},EL:function(g){return/^(EL)?\d{9}$/.test(g)},HU:function(g){return/^(HU)?\d{8}$/.test(g)},IE:function(g){return/^(IE)?\d{7}\w{1}(W)?$/.test(g)},IT:function(g){return/^(IT)?\d{11}$/.test(g)},LV:function(g){return/^(LV)?\d{11}$/.test(g)},LT:function(g){return/^(LT)?\d{9,12}$/.test(g)},LU:function(g){return/^(LU)?\d{8}$/.test(g)},MT:function(g){return/^(MT)?\d{8}$/.test(g)},NL:function(g){return/^(NL)?\d{9}B\d{2}$/.test(g)},PL:function(g){return/^(PL)?(\d{10}|(\d{3}-\d{3}-\d{2}-\d{2})|(\d{3}-\d{2}-\d{2}-\d{3}))$/.test(g)},PT:m,RO:function(g){return/^(RO)?\d{2,10}$/.test(g)},SK:function(g){return/^(SK)?\d{10}$/.test(g)},SI:function(g){return/^(SI)?\d{8}$/.test(g)},ES:function(g){return/^(ES)?\w\d{7}[A-Z]$/.test(g)},SE:function(g){return/^(SE)?\d{12}$/.test(g)},AL:function(g){return/^(AL)?\w{9}[A-Z]$/.test(g)},MK:function(g){return/^(MK)?\d{13}$/.test(g)},AU:d,BY:function(g){return/^(УНП )?\d{9}$/.test(g)},CA:function(g){return/^(CA)?\d{9}$/.test(g)},IS:function(g){return/^(IS)?\d{5,6}$/.test(g)},IN:function(g){return/^(IN)?\d{15}$/.test(g)},ID:function(g){return/^(ID)?(\d{15}|(\d{2}.\d{3}.\d{3}.\d{1}-\d{3}.\d{3}))$/.test(g)},IL:function(g){return/^(IL)?\d{9}$/.test(g)},KZ:function(g){return/^(KZ)?\d{12}$/.test(g)},NZ:function(g){return/^(NZ)?\d{9}$/.test(g)},NG:function(g){return/^(NG)?(\d{12}|(\d{8}-\d{4}))$/.test(g)},NO:function(g){return/^(NO)?\d{9}MVA$/.test(g)},PH:function(g){return/^(PH)?(\d{12}|\d{3} \d{3} \d{3} \d{3})$/.test(g)},RU:function(g){return/^(RU)?(\d{10}|\d{12})$/.test(g)},SM:function(g){return/^(SM)?\d{5}$/.test(g)},SA:function(g){return/^(SA)?\d{15}$/.test(g)},RS:function(g){return/^(RS)?\d{9}$/.test(g)},CH:p,TR:function(g){return/^(TR)?\d{10}$/.test(g)},UA:function(g){return/^(UA)?\d{12}$/.test(g)},GB:function(g){return/^GB((\d{3} \d{4} ([0-8][0-9]|9[0-6]))|(\d{9} \d{3})|(((GD[0-4])|(HA[5-9]))[0-9]{2}))$/.test(g)},UZ:function(g){return/^(UZ)?\d{9}$/.test(g)},AR:function(g){return/^(AR)?\d{11}$/.test(g)},BO:function(g){return/^(BO)?\d{7}$/.test(g)},BR:function(g){return/^(BR)?((\d{2}.\d{3}.\d{3}\/\d{4}-\d{2})|(\d{3}.\d{3}.\d{3}-\d{2}))$/.test(g)},CL:function(g){return/^(CL)?\d{8}-\d{1}$/.test(g)},CO:function(g){return/^(CO)?\d{10}$/.test(g)},CR:function(g){return/^(CR)?\d{9,12}$/.test(g)},EC:function(g){return/^(EC)?\d{13}$/.test(g)},SV:function(g){return/^(SV)?\d{4}-\d{6}-\d{3}-\d{1}$/.test(g)},GT:function(g){return/^(GT)?\d{7}-\d{1}$/.test(g)},HN:function(g){return/^(HN)?$/.test(g)},MX:function(g){return/^(MX)?\w{3,4}\d{6}\w{3}$/.test(g)},NI:function(g){return/^(NI)?\d{3}-\d{6}-\d{4}\w{1}$/.test(g)},PA:function(g){return/^(PA)?$/.test(g)},PY:function(g){return/^(PY)?\d{6,8}-\d{1}$/.test(g)},PE:function(g){return/^(PE)?\d{11}$/.test(g)},DO:function(g){return/^(DO)?(\d{11}|(\d{3}-\d{7}-\d{1})|[1,4,5]{1}\d{8}|([1,4,5]{1})-\d{2}-\d{5}-\d{1})$/.test(g)},UY:function(g){return/^(UY)?\d{12}$/.test(g)},VE:function(g){return/^(VE)?[J,G,V,E]{1}-(\d{9}|(\d{8}-\d{1}))$/.test(g)}};function y(x,g){if((0,a.default)(x),(0,a.default)(g),g in v)return v[g](x);throw new Error("Invalid country code: '".concat(g,"'"))}return _a}var B1;function lw(){return B1||(B1=1,function(r,a){function i(Re){"@babel/helpers - typeof";return i=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function($t){return typeof $t}:function($t){return $t&&typeof Symbol=="function"&&$t.constructor===Symbol&&$t!==Symbol.prototype?"symbol":typeof $t},i(Re)}Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var c=ie(Sf()),l=ie(Jg()),u=ie(M5()),d=ie(z5()),p=ie(T5()),m=ie(O5()),v=ie($5()),y=ie(rv()),x=ie(D5()),g=ie(F5()),E=ie(Nu()),b=ie(q5()),w=ie(wf()),N=ie(nv()),_=ie(B5()),k=ie(U5()),I=ie(H5()),z=ie(Z5()),O=vr(W5()),Z=vr(G5()),F=ie(V5()),U=ie(K5()),Q=ie(Y5()),T=ie(Q5()),J=ie(X5()),me=ie(J5()),ce=ie(eS()),ue=ie(av()),G=ie(iv()),oe=ie(tS()),W=ie(rS()),q=ie(aS()),K=ie(iS()),Y=ie(Nf()),j=vr(Xg()),V=ie(oS()),xe=ie(sv()),Ne=ie(lS()),Ce=ie(uS()),Ee=ie(cS()),je=ie(dS()),Me=ie(fS()),Le=ie(mS()),Ke=vr(pS()),Tr=ie(hS()),$n=ie(gS()),ot=ie(vS()),ct=ie(yS()),pn=ie(xS()),pr=ie(SS()),hn=ie(wS()),A=ie(tv()),P=ie(NS()),B=ie(_S()),re=ie(kS()),ne=ie(bS()),de=ie(AS()),_e=ie(uv()),Pe=ie(CS()),Oe=ie(ES()),Be=ie(IS()),Tt=ie(RS()),Ot=ie(PS()),dt=ie(LS()),Wt=ie(jS()),gn=vr(MS()),nr=ie(zS()),hr=ie(TS()),Dn=ie(OS()),Fn=$S(),Ma=ie(DS()),za=ie(FS()),Ta=ie(qS()),Oa=ie(ov()),Or=ie(BS()),$r=ie(US()),Hi=ie(HS()),Zi=ie(ZS()),Wi=ie(lv()),Gi=ie(WS()),Vi=ie(GS()),$a=ie(VS()),Ki=ie(KS()),vn=ie(YS()),qn=vr(QS()),yn=ie(fv()),_u=ie(dv()),xn=ie(mv()),Bn=ie(XS()),Un=ie(JS()),Da=ie(ew()),ku=ie(tw()),bu=ie(pv()),Au=ie(rw()),gr=ie(nw()),Yi=ie(aw()),Qi=ie(iw()),Cu=ie(sw()),Xi=ie(ow());function Fa(Re){if(typeof WeakMap!="function")return null;var $t=new WeakMap,Gt=new WeakMap;return(Fa=function(Dr){return Dr?Gt:$t})(Re)}function vr(Re,$t){if(Re&&Re.__esModule)return Re;if(Re===null||i(Re)!="object"&&typeof Re!="function")return{default:Re};var Gt=Fa($t);if(Gt&&Gt.has(Re))return Gt.get(Re);var yr={__proto__:null},Dr=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var Fr in Re)if(Fr!=="default"&&{}.hasOwnProperty.call(Re,Fr)){var Sn=Dr?Object.getOwnPropertyDescriptor(Re,Fr):null;Sn&&(Sn.get||Sn.set)?Object.defineProperty(yr,Fr,Sn):yr[Fr]=Re[Fr]}return yr.default=Re,Gt&&Gt.set(Re,yr),yr}function ie(Re){return Re&&Re.__esModule?Re:{default:Re}}var Eu="13.12.0",Iu={version:Eu,toDate:c.default,toFloat:l.default,toInt:u.default,toBoolean:d.default,equals:p.default,contains:m.default,matches:v.default,isEmail:y.default,isURL:x.default,isMACAddress:g.default,isIP:E.default,isIPRange:b.default,isFQDN:w.default,isBoolean:k.default,isIBAN:Ke.default,isBIC:Tr.default,isAbaRouting:z.default,isAlpha:O.default,isAlphaLocales:O.locales,isAlphanumeric:Z.default,isAlphanumericLocales:Z.locales,isNumeric:F.default,isPassportNumber:U.default,isPort:Q.default,isLowercase:T.default,isUppercase:J.default,isAscii:ce.default,isFullWidth:ue.default,isHalfWidth:G.default,isVariableWidth:oe.default,isMultibyte:W.default,isSemVer:q.default,isSurrogatePair:K.default,isInt:Y.default,isIMEI:me.default,isFloat:j.default,isFloatLocales:j.locales,isDecimal:V.default,isHexadecimal:xe.default,isOctal:Ne.default,isDivisibleBy:Ce.default,isHexColor:Ee.default,isRgbColor:je.default,isHSL:Me.default,isISRC:Le.default,isMD5:$n.default,isHash:ot.default,isJWT:ct.default,isJSON:pn.default,isEmpty:pr.default,isLength:hn.default,isLocale:I.default,isByteLength:A.default,isUUID:P.default,isMongoId:B.default,isAfter:re.default,isBefore:ne.default,isIn:de.default,isLuhnNumber:_e.default,isCreditCard:Pe.default,isIdentityCard:Oe.default,isEAN:Be.default,isISIN:Tt.default,isISBN:Ot.default,isISSN:dt.default,isMobilePhone:gn.default,isMobilePhoneLocales:gn.locales,isPostalCode:qn.default,isPostalCodeLocales:qn.locales,isEthereumAddress:nr.default,isCurrency:hr.default,isBtcAddress:Dn.default,isISO6346:Fn.isISO6346,isFreightContainerID:Fn.isFreightContainerID,isISO6391:Ma.default,isISO8601:za.default,isRFC3339:Ta.default,isISO31661Alpha2:Oa.default,isISO31661Alpha3:Or.default,isISO4217:$r.default,isBase32:Hi.default,isBase58:Zi.default,isBase64:Wi.default,isDataURI:Gi.default,isMagnetURI:Vi.default,isMailtoURI:$a.default,isMimeType:Ki.default,isLatLong:vn.default,ltrim:yn.default,rtrim:_u.default,trim:xn.default,escape:Bn.default,unescape:Un.default,stripLow:Da.default,whitelist:ku.default,blacklist:bu.default,isWhitelisted:Au.default,normalizeEmail:gr.default,toString,isSlug:Yi.default,isStrongPassword:Cu.default,isTaxID:Wt.default,isDate:N.default,isTime:_.default,isLicensePlate:Qi.default,isVAT:Xi.default,ibanLocales:Ke.locales};a.default=Iu,r.exports=a.default,r.exports.default=a.default}(fo,fo.exports)),fo.exports}var uw=lw();const cw=Jd(uw),dw=()=>{Mr();const[r,a]=R.useState(!1),[i,c]=R.useState(!1),[l,u]=R.useState(!1),[d,p]=R.useState(!1),[m,v]=R.useState(!1),[y,x]=R.useState({username:"",email:"",password:"",confirmPassword:""}),[g,E]=R.useState(!1),[b,w]=R.useState(!1),N=20,_={minLength:/.{10,}/,minNumber:/\d/,hasSpecial:/[!@#$%^&*(),.?":{}|<>]/},[k,I]=R.useState({minLength:!1,minNumber:!1,hasSpecial:!1}),z=T=>{I({minLength:_.minLength.test(T),minNumber:_.minNumber.test(T),hasSpecial:_.hasSpecial.test(T)})},O=T=>{const{name:J,value:me}=T.target;if(J==="email"){const ce=cw.isEmail(me);x(ue=>({...ue,[J]:me})),E(!ce&&me!==""),w(ce&&me!=="")}else J==="password"?me.length<=N&&(x(ce=>({...ce,[J]:me})),z(me)):me.length<=N&&x(ce=>({...ce,[J]:me}))},Z=()=>!y.username||!y.email||!y.password||!y.confirmPassword?(we.error("Please fill in all fields"),!1):y.password!==y.confirmPassword?(we.error("Passwords do not match!"),!1):b?Object.entries(_).every(([J,me])=>me.test(y.password))?!0:(we.error("Password does not meet all requirements"),!1):(we.error("Please enter a valid email address"),!1),F=async T=>{if(T.preventDefault(),!!Z()){c(!0);try{const J=await fetch("http://localhost:5000/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:y.username,email:y.email,password:y.password})}),me=await J.json();if(!J.ok)throw new Error(me.error||"Registration Failed");setTimeout(()=>{c(!1),a(!0)},1500)}catch(J){c(!1),we.error(J.message)}}},U=()=>{sessionStorage.setItem("isAuthenticated","true"),sessionStorage.setItem("username",y.username),we.success("Login successful!",{position:"top-center",autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark",onClose:()=>{Q(),window.location.href=Ae.DASHBOARD}})},Q=()=>{x({username:"",email:"",password:"",confirmPassword:""}),E(!1),w(!1)};return o.jsx(o.Fragment,{children:r?o.jsx(ug,{onSuccess:U,onCancel:()=>a(!1)}):o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"sidebar",children:o.jsx("h3",{className:"sidebar-title",children:"Register a new account here"})}),o.jsx("div",{className:"content-wrapper",children:o.jsxs("div",{className:"register-form-container",children:[o.jsx("h2",{children:"Create Account"}),o.jsxs("form",{className:"login-form",onSubmit:F,children:[o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",htmlFor:"username",children:"Username:"}),o.jsxs("div",{className:"input-wrapper",children:[o.jsx("input",{type:"text",id:"username",name:"username",placeholder:"Choose a username",className:"form-input",value:y.username,onChange:O,required:!0}),o.jsxs("span",{className:"char-count",children:[y.username.length,"/",N]})]})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",htmlFor:"email",children:"Email:"}),o.jsxs("div",{className:"input-wrapper",children:[o.jsx("input",{type:"email",id:"email",name:"email",placeholder:"Enter your email",className:`form-input ${g?"invalid":""} ${b?"valid":""}`,value:y.email,onChange:O,required:!0}),g&&o.jsx("span",{className:"error-message",children:"Email is not valid"}),b&&o.jsx("span",{className:"success-message",children:"Email is valid"})]})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",htmlFor:"password",children:"Password:"}),o.jsxs("div",{className:"input-wrapper",children:[o.jsx("input",{type:d?"text":"password",id:"password",name:"password",placeholder:"Create a password",className:"form-input",value:y.password,onChange:O,onFocus:()=>u(!0),onBlur:()=>u(!1),required:!0}),o.jsx("button",{type:"button",className:"toggle-password-btn",onClick:()=>p(!d),"aria-label":d?"Hide password":"Show password",children:o.jsx(X,{icon:d?zi:Mi,style:{color:"#ffffff"}})}),o.jsxs("span",{className:"char-count",children:[y.password.length,"/",N]}),l&&o.jsx("div",{className:"password-requirements-dropdown",children:o.jsxs("ul",{children:[o.jsx("li",{className:k.minLength?"requirements-met":"requirements-not-met",children:"Minimum 10 characters"}),o.jsx("li",{className:k.minNumber?"requirements-met":"requirements-not-met",children:"Contains at least one number"}),o.jsx("li",{className:k.hasSpecial?"requirements-met":"requirements-not-met",children:"Contains atleast one special character"})]})})]})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",htmlFor:"confirmPassword",children:"Confirm Password:"}),o.jsxs("div",{className:"input-wrapper",children:[o.jsx("input",{type:m?"text":"password",id:"confirmPassword",name:"confirmPassword",placeholder:"Confirm your password",className:"form-input",value:y.confirmPassword,onChange:O,required:!0}),o.jsx("button",{type:"button",className:"toggle-password-btn",onClick:()=>v(!m),"aria-label":m?"Hide password":"Show password",children:o.jsx(X,{icon:m?zi:Mi,style:{color:"#ffffff"}})}),o.jsxs("span",{className:"char-count",children:[y.confirmPassword.length,"/",N]})]})]}),o.jsx("button",{type:"submit",className:"login-btn register-btn",disabled:i,style:{position:"relative",cursor:i?"not-allowed":"pointer",opacity:i?.7:1},children:i?o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"},children:[o.jsx("span",{style:{width:"20px",height:"20px",border:"3px solid #ffffff",borderTop:"3px solid transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}),"Verifying..."]}):o.jsxs(o.Fragment,{children:[o.jsx("span",{children:"Sign Up"}),o.jsx(X,{icon:Gg,className:"login-icon"})]})}),o.jsx("style",{children:`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                    
                    .login-btn, .register-btn {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      gap: 10px;
                    }
                    
                    .login-icon {
                      margin-left: 8px;
                    }
                    
                    .password-requirements-dropdown {
                      position: absolute;
                      top: 100%;
                      left: 0;
                      width: 100%;
                      background-color: #1a1a1a;
                      border-radius: 6px;
                      padding: 0.75rem;
                      margin-top: 0.25rem;
                      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                      z-index: 10;
                      box-sizing: border-box;
                    }
                    
                    .password-requirements-dropdown ul {
                      list-style: none;
                      padding: 0;
                      margin: 0;
                    }
                    
                    .password-requirements-dropdown li {
                      padding: 0.25rem 0;
                      display: flex;
                      align-items: center;
                      font-size: 0.85em;
                    }
                    
                    .password-requirements-dropdown li::before {
                      content: "•";
                      margin-right: 0.5rem;
                    }
                    
                    .requirements-met {
                      color: #4caf50;
                    }
                    
                    .requirements-not-met {
                      color: #ff4444;
                    }
                    
                    /* Adjust input field to avoid text overlapping with the icon */
                    .form-input {
                      padding-right: 40px;
                    }
                    
                    /* Move character count to avoid overlap */
                    .char-count {
                      position: absolute;
                      right: 30px;
                      top: 50%;
                      transform: translateY(-50%);
                      font-size: 0.9rem;
                      color: #666;
                    }
                  `}),o.jsxs("div",{className:"register-container",children:[o.jsx("span",{children:"Already have an account? "}),o.jsx(Rr,{to:Ae.LOGIN,className:"register-link",children:"Login here"})]})]})]})})]})})},U1=()=>{const r=Mr();return o.jsxs("div",{style:{textAlign:"center",padding:"2rem",minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:[o.jsx("h1",{style:{fontSize:"2rem",marginBottom:"1rem"},children:"Oops, something went wrong!"}),o.jsx("p",{style:{fontSize:"1rem",marginBottom:"2rem",color:"#666"},children:"Tarnished, your page seizes to exist"}),o.jsx("button",{onClick:()=>r("/"),style:{padding:"0.75rem 1.5rem",fontSize:"1rem",backgroundColor:"#1a1a1a",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},children:"Go to Home"})]})},fw=()=>{const r=Et(),[a,i]=R.useState(!1),[c,l]=R.useState(!1),u=r.pathname.startsWith("/quiz");R.useEffect(()=>{u&&l(!0)},[u]),R.useEffect(()=>{const y=x=>{a&&!x.target.closest(".sidebar")&&!x.target.closest(".mobile-menu-toggle")&&i(!1)};return document.addEventListener("mousedown",y),document.addEventListener("touchstart",y),()=>{document.removeEventListener("mousedown",y),document.removeEventListener("touchstart",y)}},[a]),R.useEffect(()=>{const y=()=>{window.innerWidth>768&&a&&i(!1)};return window.addEventListener("resize",y),()=>window.removeEventListener("resize",y)},[a]);const d=()=>{we.warn(o.jsxs("div",{className:"custom-toast",children:[o.jsx("p",{children:"Are you sure you want to logout?"}),o.jsxs("div",{style:{display:"flex",gap:"1rem",marginTop:"1rem"},children:[o.jsx("button",{onClick:()=>{we.dismiss(),p()},className:"toast-button-yes",children:"Yes"}),o.jsx("button",{onClick:()=>we.dismiss(),className:"toast-button-cancel",children:"Cancel"})]})]}),{position:"top-center",autoClose:!1,closeButton:!1,draggable:!0,closeOnClick:!1,theme:"dark",hideProgressBar:!0,pauseOnHover:!0})},p=()=>{sessionStorage.setItem("just_logged_out","true"),sessionStorage.removeItem("isAuthenticated"),sessionStorage.removeItem("username"),we.success("Logging you out...",{position:"top-center",autoClose:1500,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"dark",onClose:()=>{window.location.href=Ae.LOGIN}})},m=()=>{i(!1)},v=y=>{y.preventDefault(),l(!c)};return o.jsxs(o.Fragment,{children:[o.jsx("div",{className:`mobile-menu-toggle ${a?"active":""}`,onClick:()=>i(!a),"aria-label":"Toggle navigation menu",children:o.jsx(X,{icon:a?Qg:u5})}),o.jsx("div",{className:`mobile-menu-overlay ${a?"show":""}`,onClick:()=>i(!1)}),o.jsxs("nav",{className:`sidebar ${a?"open":""}`,children:[o.jsx("div",{className:"nav-brand",children:"Social Engineering"}),o.jsxs("div",{className:"nav-links-box",children:[o.jsxs(Er,{to:Ae.DASHBOARD,onClick:m,children:[o.jsx(X,{icon:Yg,className:"nav-icon"})," Dashboard"]}),o.jsxs("div",{className:`nav-item-with-submenu ${c?"open":""}`,children:[o.jsxs(Er,{to:Ae.QUIZ,onClick:v,className:({isActive:y})=>y||u?"active":"",children:[o.jsxs("div",{className:"nav-link-content",children:[o.jsx(X,{icon:Pr,className:"nav-icon"}),o.jsx("span",{className:"nav-text",children:"Quiz"})]}),o.jsx(X,{icon:c?p5:k5,className:"submenu-icon"})]}),o.jsxs("div",{className:`submenu ${c?"open":""}`,children:[o.jsxs(Er,{to:`${Ae.QUIZ}/difficulty`,onClick:m,className:({isActive:y})=>y?"active":"",children:[o.jsx(X,{icon:f5,className:"submenu-icon"}),"Select Difficulty"]}),o.jsxs(Er,{to:`${Ae.QUIZ}/questions`,onClick:m,className:({isActive:y})=>y?"active":"",children:[o.jsx(X,{icon:Pr,className:"submenu-icon"}),"Questions"]}),o.jsxs(Er,{to:`${Ae.QUIZ}/results`,onClick:m,className:({isActive:y})=>y?"active":"",children:[o.jsx(X,{icon:d5,className:"submenu-icon"}),"Results"]})]})]}),o.jsxs(Er,{to:Ae.ACHIEVEMENTS,onClick:m,children:[o.jsx(X,{icon:jt,className:"nav-icon"})," Achievements"]}),o.jsxs(Er,{to:Ae.LEADERBOARD,onClick:m,children:[o.jsx(X,{icon:b5,className:"nav-icon"})," Leaderboard"]}),o.jsxs(Er,{to:Ae.STATISTICS,onClick:m,children:[o.jsx(X,{icon:uu,className:"nav-icon"})," Statistics"]})]}),o.jsxs("button",{className:"logout-btn",onClick:d,children:[o.jsx(X,{icon:Wg,className:"nav-icon"})," Logout"]})]}),o.jsx("style",{jsx:!0,children:`
                /* Mobile menu toggle */
                .mobile-menu-toggle {
                    display: none;
                    position: fixed;
                    top: 15px;
                    left: 15px;
                    z-index: 999;
                    background-color: #2c3e50;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                    color: white;
                    font-size: 1.25rem;
                }
                
                /* Mobile background overlay */
                .mobile-menu-overlay {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 900;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                }
                
                .mobile-menu-overlay.show {
                    opacity: 1;
                    pointer-events: auto;
                }
                
                /* Quiz Submenu Styles */
                .nav-item-with-submenu {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                }
                
                .nav-item-with-submenu > a {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 20px;
                    color: #ecf0f1;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                
                .nav-item-with-submenu > a:hover {
                    background-color: #34495e;
                    color: #fff;
                }
                
                .nav-item-with-submenu > a.active {
                    background-color: #3498db;
                    color: white;
                    border-left: 4px solid #2980b9;
                }
                
                .nav-link-content {
                    display: flex;
                    align-items: center;
                }
                
                .nav-text {
                    flex: 1;
                }
                
                .submenu-icon {
                    font-size: 0.8rem;
                    transition: transform 0.3s ease;
                    margin-left: 5px;
                }
                
                .submenu {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease;
                    background-color: #243342;
                }
                
                .submenu.open {
                    max-height: 300px; /* Adjust based on your submenu content */
                }
                
                .submenu a {
                    padding: 10px 20px 10px 35px;
                    color: #ecf0f1;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    font-size: 0.9rem;
                    transition: all 0.2s ease;
                }
                
                .submenu a:hover {
                    background-color: #34495e;
                }
                
                .submenu a.active {
                    background-color: #2980b9;
                    color: white;
                }
                
                .submenu .submenu-icon {
                    margin-right: 8px;
                    margin-left: 0;
                    font-size: 0.9rem;
                }
                
                /* Nav icon positioning */
                .nav-icon {
                    width: 20px;
                    text-align: center;
                    margin-right: 10px;
                }
                
                /* Ensure all NavLinks have consistent styling */
                .nav-links-box > a {
                    display: flex;
                    align-items: center;
                    padding: 12px 20px;
                    color: #ecf0f1;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                
                .nav-links-box > a:hover {
                    background-color: #34495e;
                    color: #fff;
                }
                
                .nav-links-box > a.active {
                    background-color: #3498db;
                    color: white;
                    border-left: 4px solid #2980b9;
                }
                
                /* Responsive styles */
                @media (max-width: 768px) {
                    .mobile-menu-toggle {
                        display: flex;
                    }
                    
                    .mobile-menu-overlay {
                        display: block;
                    }
                    
                    .sidebar {
                        transform: translateX(-100%);
                        z-index: 950;
                    }
                    
                    .sidebar.open {
                        transform: translateX(0);
                    }
                }
            `})]})},mw=()=>{const[r,a]=R.useState(""),[i,c]=R.useState(!1),[l,u]=R.useState(!1),d=async p=>{p.preventDefault(),c(!0);try{const m=await fetch("http://localhost:5000/api/forgot-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:r})}),v=await m.json();if(!m.ok)throw new Error(v.error);we.success("Password reset link sent to your email!"),u(!0),a("")}catch(m){we.error(m.message)}finally{c(!1)}};return o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"sidebar",children:o.jsx("h3",{className:"sidebar-title",children:"Password Reset"})}),o.jsx("div",{className:"content-wrapper",children:o.jsxs("div",{className:"form-container",children:[o.jsx("h2",{children:"Reset Your Password"}),o.jsx("p",{className:"reset-instructions",children:"Enter your email address and we'll send you a link to reset your password."}),o.jsxs("form",{onSubmit:d,children:[o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",htmlFor:"email",children:"Email:"}),o.jsx("div",{className:"input-wrapper",children:o.jsx("input",{type:"email",id:"email",value:r,onChange:p=>a(p.target.value),placeholder:"Enter your email",className:"form-input",required:!0})})]}),o.jsx("button",{type:"submit",className:"login-btn",disabled:i,children:i?"Sending...":"Send Reset Link"}),l&&o.jsx("div",{className:"email-sent-notice",children:o.jsx("p",{children:"Please check your email for the reset link. Check your spam/junk folder."})}),o.jsx("div",{className:"login-link-container",children:o.jsx(Rr,{to:Ae.LOGIN,className:"login-link",children:"Back to Login"})})]})]})}),o.jsx("style",{jsx:!0,children:`
                .email-sent-notice {
                    margin-top: 1rem;
                    padding: 0.75rem;
                    background-color: rgba(76, 175, 80, 0.1);
                    border-left: 3px solid #4caf50;
                    border-radius: 4px;
                    font-size: 0.9rem;
                }
                .email-sent-notice p {
                    margin: 0;
                    color: #e0e0e0;
                }
            `})]})},pw=()=>{const[r,a]=R.useState(""),[i,c]=R.useState(""),[l,u]=R.useState(!1),[d,p]=R.useState(""),[m,v]=R.useState(!1),[y,x]=R.useState(!1),[g,E]=R.useState(!1),b=Mr(),w=Et(),N={minLength:/.{10,}/,minNumber:/\d/,hasSpecial:/[!@#$%^&*(),.?":{}|<>]/},[_,k]=R.useState({minLength:!1,minNumber:!1,hasSpecial:!1}),I=O=>{k({minLength:N.minLength.test(O),minNumber:N.minNumber.test(O),hasSpecial:N.hasSpecial.test(O)})};R.useEffect(()=>{const Z=new URLSearchParams(w.search).get("token");Z||(we.error("Invalid reset link"),b(Ae.LOGIN)),p(Z)},[b,w]);const z=async O=>{if(O.preventDefault(),r!==i){we.error("Passwords do not match");return}if(!Object.entries(N).every(([F,U])=>U.test(r))){we.error("Password does not meet all requirements");return}u(!0);try{const F=await fetch("http://localhost:5000/api/reset-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:d,newPassword:r})}),U=await F.json();if(!F.ok)throw new Error(U.error);we.success("Password successfully reset!"),b(Ae.LOGIN)}catch(F){we.error(F.message)}finally{u(!1)}};return o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"sidebar",children:o.jsx("h3",{className:"sidebar-title",children:"Reset Password"})}),o.jsx("div",{className:"content-wrapper",children:o.jsxs("div",{className:"form-container",children:[o.jsx("h2",{children:"Create New Password"}),o.jsxs("form",{onSubmit:z,children:[o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",htmlFor:"password",children:"New Password:"}),o.jsxs("div",{className:"input-wrapper",children:[o.jsx("input",{type:y?"text":"password",id:"password",value:r,onChange:O=>{a(O.target.value),I(O.target.value)},onFocus:()=>v(!0),onBlur:()=>v(!1),placeholder:"Enter new password",className:"form-input",required:!0}),o.jsx("button",{type:"button",className:"toggle-password-btn",onClick:()=>x(!y),"aria-label":y?"Hide password":"Show password",children:o.jsx(X,{icon:y?zi:Mi,style:{color:"#ffffff"}})}),m&&o.jsx("div",{className:"password-requirements-dropdown",children:o.jsxs("ul",{children:[o.jsx("li",{className:_.minLength?"requirements-met":"requirements-not-met",children:"Minimum 10 characters"}),o.jsx("li",{className:_.minNumber?"requirements-met":"requirements-not-met",children:"Contains at least one number"}),o.jsx("li",{className:_.hasSpecial?"requirements-met":"requirements-not-met",children:"Contains at least one special character"})]})})]})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",htmlFor:"confirmPassword",children:"Confirm Password:"}),o.jsxs("div",{className:"input-wrapper",children:[o.jsx("input",{type:g?"text":"password",id:"confirmPassword",value:i,onChange:O=>c(O.target.value),placeholder:"Confirm new password",className:"form-input",required:!0}),o.jsx("button",{type:"button",className:"toggle-password-btn",onClick:()=>E(!g),"aria-label":g?"Hide password":"Show password",children:o.jsx(X,{icon:g?zi:Mi,style:{color:"#ffffff"}})})]})]}),o.jsx("button",{type:"submit",className:"login-btn",disabled:l,children:l?"Resetting...":"Reset Password"})]})]})}),o.jsx("style",{jsx:!0,children:`
                .password-requirements-dropdown {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background-color: #1a1a1a;
                    border-radius: 6px;
                    padding: 0.75rem;
                    margin-top: 0.25rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    z-index: 10;
                    box-sizing: border-box;
                }
                
                .password-requirements-dropdown ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                .password-requirements-dropdown li {
                    padding: 0.25rem 0;
                    display: flex;
                    align-items: center;
                    font-size: 0.85em;
                }
                
                .password-requirements-dropdown li::before {
                    content: "•";
                    margin-right: 0.5rem;
                }
                
                .requirements-met {
                    color: #4caf50;
                }
                
                .requirements-not-met {
                    color: #ff4444;
                }
                
                .input-wrapper {
                    position: relative;
                }
                    
                /* Adjust input field to avoid text overlapping with the icon */
                .form-input {
                    padding-right: 40px;
                }
            `})]})},Ed={},Zt=(Ed==null?void 0:Ed.VITE_API_BASE_URL)||"http://localhost:5000/api",mn={LOGIN:`${Zt}/login`,REGISTER:`${Zt}/register`,FORGOT_PASSWORD:`${Zt}/forgot-password`,RESET_PASSWORD:`${Zt}/reset-password`,INVALIDATE_REMEMBER_TOKEN:`${Zt}/invalidate-remember-token`,GET_USERS:`${Zt}/users`,GET_USER_LOGIN_HISTORY:`${Zt}/users/login-history`,GET_USER_QUIZ_HISTORY:`${Zt}/users/quiz-history`,GET_USER_STREAKS:`${Zt}/users/:userId/streaks`,COMPLETE_QUIZ:`${Zt}/quiz/complete`,GET_USER_ACHIEVEMENTS:`${Zt}/users/:userId/achievements`,GET_QUIZ_QUESTIONS:`${Zt}/quiz/questions`,IS_MOCK_API:!0,MOCK_DELAY:500},ki={QUIZ_IDS:{Beginner:1,Intermediate:2,Advanced:3},QUESTION_TIME:30,PASS_THRESHOLD:70,MOCK_QUIZ_DATA:{Beginner:[{id:1,question:"What is phishing?",options:["A type of fish found in oceans","A cybersecurity attack that uses disguised email as a weapon","A software program that protects your computer","A method of encrypting files"],correctAnswer:1,explanation:"Phishing is a cybersecurity attack that uses disguised email as a weapon. The goal is to trick the email recipient into believing the message is something they want or need and to click a link or download an attachment."},{id:2,question:"Which of these is a common indicator of a phishing attempt?",options:["Emails from known colleagues with their correct email address","Messages that have correct grammar and no spelling mistakes","Emails with urgent calls to action or threats","Communications that address you by your full name"],correctAnswer:2,explanation:"Urgent calls to action, threats, or creating a sense of emergency are common tactics in phishing attempts to make users act before thinking critically."},{id:3,question:"What should you do if you suspect an email is a phishing attempt?",options:["Open any attachments to check if they're legitimate","Reply directly to ask if it's legitimate","Click links to see where they lead","Don't click links and report it to your IT department"],correctAnswer:3,explanation:"Never open attachments or click links in suspicious emails. The safest action is to report the email to your IT department or security team."},{id:4,question:"Which of these email senders is MOST likely to be a phishing attempt?",options:["support@yourcompany.com","support@yourcornpany.com","john.smith@colleague-company.com","newsletter@google.com"],correctAnswer:1,explanation:"The email address 'support@yourcornpany.com' contains a common spoofing technique where 'company' is misspelled as 'cornpany' which can be hard to notice at a quick glance."},{id:5,question:"What is 'spear phishing'?",options:["Sending phishing emails to a large number of random people","Targeted phishing attacks directed at specific individuals or companies","Using phone calls instead of emails for phishing","Phishing attempts made through social media"],correctAnswer:1,explanation:"Spear phishing refers to targeted attacks aimed at specific individuals or organizations, often using personalized information to appear more credible."}],Intermediate:[{id:1,question:"Which of these is a sign of a sophisticated phishing attack?",options:["Obvious spelling errors in the email","Using threatening language and urgent deadlines","Spoofed domains that look very similar to legitimate ones","Requests sent to multiple recipients in the same email"],correctAnswer:2,explanation:"Sophisticated phishing attacks often use domains that look nearly identical to legitimate ones (like microsoft-support.com instead of microsoft.com) to deceive users."},{id:2,question:"What is 'vishing'?",options:["Visual phishing using fake images","Voice phishing over phone calls","Video-based phishing using deep fakes","Viral phishing using social media"],correctAnswer:1,explanation:"Vishing is voice phishing, which uses phone calls to trick people into revealing sensitive information or making security mistakes."},{id:3,question:"How do attackers commonly trick people in Business Email Compromise (BEC) attacks?",options:["By sending mass emails with malware attachments","By impersonating executives and requesting urgent wire transfers","By offering fake promotions and discounts","By sending ransomware through email links"],correctAnswer:1,explanation:"In BEC attacks, attackers impersonate executives or trusted partners to request urgent wire transfers or sensitive information from employees."},{id:4,question:"What is DMARC?",options:["A type of malware that steals email credentials","An email authentication protocol to prevent spoofing","A phishing simulation tool for security training","A database of known phishing domains"],correctAnswer:1,explanation:"DMARC (Domain-based Message Authentication, Reporting & Conformance) is an email authentication protocol that helps prevent email spoofing and phishing attacks."},{id:5,question:"Which of these behaviors increases your risk of falling victim to phishing?",options:["Using multi-factor authentication","Reusing the same password across multiple sites","Checking the sender's email address before responding","Hovering over links before clicking them"],correctAnswer:1,explanation:"Reusing passwords across multiple sites means that if your credentials are stolen from one site through phishing, attackers can access all your other accounts using the same credentials."}],Advanced:[{id:1,question:"What is a watering hole attack?",options:["A phishing attack targeting people with water-related interests","A targeted attack where frequently visited websites are compromised","An attack using water-damage sensors to infiltrate buildings","A DDoS attack that floods servers with requests"],correctAnswer:1,explanation:"A watering hole attack targets organizations by infecting websites they frequently visit with malware, rather than attacking them directly."},{id:2,question:"Which of these is an advanced anti-phishing measure?",options:["Using basic spam filters","Checking for HTTPS in the URL","Implementing DMARC, SPF, and DKIM email authentication","Installing antivirus software"],correctAnswer:2,explanation:"DMARC, SPF, and DKIM are advanced email authentication protocols that work together to prevent email spoofing and verify sender legitimacy."},{id:3,question:"What is 'smishing'?",options:["Social media phishing","SMS phishing","Smart device phishing","Smoke-signal phishing (a joke term)"],correctAnswer:1,explanation:"Smishing is SMS phishing, which uses text messages to trick recipients into revealing sensitive information or installing malware."},{id:4,question:"In corporate settings, which department is typically most targeted by spear phishing?",options:["IT Department","Sales Department","Finance Department","Human Resources"],correctAnswer:2,explanation:"Finance departments are often targeted because they have direct access to financial systems and can authorize payments, making them prime targets for BEC and wire fraud attacks."},{id:5,question:"What security feature helps validate that you're on the legitimate website rather than a phishing site?",options:["CAPTCHA","HTTPS","Extended Validation (EV) Certificates","Two-factor authentication"],correctAnswer:2,explanation:"Extended Validation (EV) Certificates provide the highest level of website verification and display the company name in the browser's address bar, helping users confirm they're on the legitimate site."}]}},hw=()=>{const r=Mr(),a=sessionStorage.getItem("username")||"User",i=sessionStorage.getItem("userId")||"1",[c,l]=R.useState(null),[u,d]=R.useState([]),[p,m]=R.useState([]),[v,y]=R.useState(!0),[x,g]=R.useState(null),[E,b]=R.useState(!1),[w,N]=R.useState(null);function _(){const G=u.filter(W=>W.quiz_id===1);return G.length===0?0:Math.max(...G.map(W=>W.score))}function k(){const G=u.filter(W=>W.quiz_id===2);return G.length===0?0:Math.max(...G.map(W=>W.score))}function I(){const G=u.filter(W=>W.quiz_id===3);return G.length===0?0:Math.max(...G.map(W=>W.score))}function z(G){switch(G){case 1:return"Beginner";case 2:return"Intermediate";case 3:return"Advanced";default:return"Unknown"}}function O(G){if(G.icon)switch(G.icon.toLowerCase()){case"star":return Ca;case"shield":return du;case"calendar-check":return fr;case"trophy":return jt;case"medal":return Ti;case"award":return cu;case"certificate":return Vg;case"graduation-cap":return fu;case"check":return Oi;default:return Ca}return G.title.includes("Star")||G.title.includes("Learner")?Ca:G.title.includes("Champion")||G.title.includes("Security")?du:G.title.includes("Streak")||G.title.includes("Login")?fr:G.title.includes("Master")?jt:Ti}R.useEffect(()=>{(async()=>{y(!0);try{const oe=await fetch(mn.GET_USER_STREAKS.replace(":userId",i));if(!oe.ok)throw new Error("Failed to fetch user data");const W=await oe.json(),q=await fetch(mn.GET_USER_ACHIEVEMENTS.replace(":userId",i));if(!q.ok)throw new Error("Failed to fetch achievements");const K=await q.json();console.log("User streaks data:",W),console.log("User achievements data:",K),l(W.userData||{}),d(W.quizHistory||[]),m(K.achievements||[]);const Y=(K.achievements||[]).filter(j=>j.unlocked);Y.length>0&&(N(Y[0]),b(!0),setTimeout(()=>{b(!1)},5e3))}catch(oe){console.error("Error fetching user data:",oe),g(oe.message),we.error("Failed to load dashboard data")}finally{y(!1)}})()},[i]);const Z=()=>{if(!c)return 0;const G=F("beginner"),oe=F("intermediate"),W=F("advanced"),q=G*.3+oe*.3+W*.4;return Math.round(q)||0},F=G=>{if(!u||u.length===0)return 0;const oe=G==="beginner"?1:G==="intermediate"?2:3,W=u.filter(q=>q.quiz_id===oe);return W.length===0?0:Math.max(...W.map(q=>q.score))},U=G=>{if(!G)return"Unknown date";try{const oe=new Date(G);return`${oe.getDate().toString().padStart(2,"0")}/${(oe.getMonth()+1).toString().padStart(2,"0")}`}catch(oe){return console.error("Error formatting date:",oe),"Invalid date"}},Q=G=>{if(!G)return"Never";const oe=new Date(G),q=Math.abs(new Date-oe),K=Math.floor(q/(1e3*60*60*24));if(K===0)return"Today";if(K===1)return"Yesterday";if(K<7)return`${K} days ago`;if(K<30){const Y=Math.floor(K/7);return`${Y} ${Y===1?"week":"weeks"} ago`}else return U(G)},T=G=>{r("/quiz/difficulty")};if(v)return o.jsx("div",{className:"content-wrapper",children:o.jsxs("div",{className:"loading-container",children:[o.jsx("div",{className:"loading-animation",children:o.jsx(X,{icon:Ia,spin:!0,className:"loading-spinner"})}),o.jsx("p",{children:"Loading your dashboard..."})]})});if(x)return o.jsx("div",{className:"content-wrapper",children:o.jsxs("div",{className:"error-container",children:[o.jsx(X,{icon:Bi,className:"error-icon"}),o.jsx("h3",{children:"Error loading dashboard"}),o.jsx("p",{children:x}),o.jsx("button",{onClick:()=>window.location.reload(),className:"retry-btn",children:"Try Again"})]})});const J=p.filter(G=>G.unlocked).slice(0,2),me=u.sort((G,oe)=>new Date(oe.completion_date||oe.date)-new Date(G.completion_date||G.date)).slice(0,3),ce=(c==null?void 0:c.total_quizzes)||u.length||0,ue=[{id:1,name:"Beginner",progress:_(),icon:fu,color:"#3498db",description:"Learn the basics of phishing and social engineering."},{id:2,name:"Intermediate",progress:k(),icon:cu,color:"#2ecc71",description:"Advance your knowledge with complex scenarios."},{id:3,name:"Advanced",progress:I(),icon:jt,color:"#e74c3c",description:"Master high-level security concepts and challenges."}];return o.jsxs("div",{className:"content-wrapper",children:[o.jsxs("div",{className:"dashboard-container",children:[o.jsxs("div",{className:"welcome-banner",children:[o.jsxs("div",{className:"welcome-content",children:[o.jsxs("h1",{children:["Welcome back, ",a,"!"]}),o.jsx("p",{children:"Continue your security training journey"}),o.jsxs("div",{className:"user-stats",children:[o.jsxs("div",{className:"stat-item",children:[o.jsx(X,{icon:Pr,className:"stat-icon"}),o.jsxs("div",{className:"stat-text",children:[o.jsx("span",{className:"stat-value",children:ce}),o.jsx("span",{className:"stat-label",children:"Quizzes"})]})]}),o.jsxs("div",{className:"stat-item",children:[o.jsx(X,{icon:fr,className:"stat-icon"}),o.jsxs("div",{className:"stat-text",children:[o.jsx("span",{className:"stat-value",children:(c==null?void 0:c.login_streak)||0}),o.jsx("span",{className:"stat-label",children:"Day Streak"})]})]}),o.jsxs("div",{className:"stat-item",children:[o.jsx(X,{icon:jt,className:"stat-icon"}),o.jsxs("div",{className:"stat-text",children:[o.jsx("span",{className:"stat-value",children:J.length}),o.jsx("span",{className:"stat-label",children:"Achievements"})]})]})]})]}),o.jsx("div",{className:"progress-summary",children:o.jsx("div",{className:"progress-ring-container",children:o.jsxs("svg",{className:"progress-ring",width:"120",height:"120",viewBox:"0 0 120 120",children:[o.jsx("circle",{className:"progress-ring-circle-bg",stroke:"#2c3e50",strokeWidth:"8",fill:"transparent",r:"54",cx:"60",cy:"60"}),o.jsx("circle",{className:"progress-ring-circle",stroke:"#646cff",strokeWidth:"8",strokeDasharray:`${2*Math.PI*54} ${2*Math.PI*54}`,strokeDashoffset:2*Math.PI*54*(1-Z()/100),strokeLinecap:"round",fill:"transparent",r:"54",cx:"60",cy:"60"}),o.jsxs("text",{x:"60",y:"55",textAnchor:"middle",fill:"white",fontSize:"22",fontWeight:"bold",children:[Z(),"%"]}),o.jsx("text",{x:"60",y:"75",textAnchor:"middle",fill:"#b3b3b3",fontSize:"12",children:"PROGRESS"})]})})})]}),o.jsxs("div",{className:"dashboard-grid",children:[o.jsxs("div",{className:"dashboard-card modules-card",children:[o.jsxs("div",{className:"card-header",children:[o.jsx("h2",{children:"Security Training Modules"}),o.jsxs(Rr,{to:"/quiz/difficulty",className:"view-all-link",children:["View All ",o.jsx(X,{icon:Cd})]})]}),o.jsx("div",{className:"modules-grid",children:ue.map(G=>o.jsxs("div",{className:"module-card",children:[o.jsxs("div",{className:"module-header",style:{backgroundColor:G.color+"20"},children:[o.jsx("div",{className:"module-icon",style:{backgroundColor:G.color},children:o.jsx(X,{icon:G.icon})}),o.jsx("h3",{children:G.name})]}),o.jsxs("div",{className:"module-content",children:[o.jsx("p",{children:G.description}),o.jsxs("div",{className:"module-progress",children:[o.jsx("div",{className:"progress-bar",children:o.jsx("div",{className:"progress-fill",style:{width:`${G.progress}%`,backgroundColor:G.color}})}),o.jsxs("div",{className:"progress-label",children:[o.jsxs("span",{children:[G.progress,"% Complete"]}),G.progress>=70?o.jsx(X,{icon:lu,className:"complete-icon",style:{color:G.color}}):o.jsx(o.Fragment,{})]})]}),o.jsxs("button",{className:"module-action-btn",style:{backgroundColor:G.color},onClick:()=>T(G.name.toLowerCase()),children:[G.progress>0?"Continue":"Start"," ",o.jsx(X,{icon:ru})]})]})]},G.id))})]}),o.jsxs("div",{className:"dashboard-card achievements-card",children:[o.jsxs("div",{className:"card-header",children:[o.jsx("h2",{children:"Your Achievements"}),o.jsxs(Rr,{to:"/achievements",className:"view-all-link",children:["View All ",o.jsx(X,{icon:Cd})]})]}),o.jsx("div",{className:"achievements-grid",children:J.length>0?J.map((G,oe)=>o.jsxs("div",{className:"achievement-item",children:[o.jsx("div",{className:"achievement-icon",style:{backgroundColor:G.color||"#646cff"},children:o.jsx(X,{icon:O(G)})}),o.jsxs("div",{className:"achievement-details",children:[o.jsx("h3",{children:G.title}),o.jsx("p",{children:G.description})]})]},oe)):o.jsxs("div",{className:"empty-state",children:[o.jsx(X,{icon:Wg,className:"empty-icon"}),o.jsx("p",{children:"Complete quizzes to unlock achievements"})]})})]}),o.jsxs("div",{className:"dashboard-card activity-card",children:[o.jsx("div",{className:"card-header",children:o.jsx("h2",{children:"Recent Activity"})}),o.jsxs("div",{className:"activity-timeline",children:[me.length>0?me.map((G,oe)=>o.jsxs("div",{className:"activity-item",children:[o.jsx("div",{className:"activity-icon quiz-icon",children:o.jsx(X,{icon:Pr})}),o.jsxs("div",{className:"activity-content",children:[o.jsxs("div",{className:"activity-details",children:[o.jsxs("span",{className:"activity-title",children:["Completed ",z(G.quiz_id)," Quiz"]}),o.jsxs("span",{className:"activity-score",children:["Score: ",o.jsxs("strong",{children:[G.score,"%"]}),G.score>=70&&o.jsx(X,{icon:lu,className:"pass-icon"})]})]}),o.jsx("div",{className:"activity-time",children:Q(G.completion_date||G.date)})]})]},`quiz-${oe}`)):o.jsxs("div",{className:"empty-state",children:[o.jsx(X,{icon:m5,className:"empty-icon"}),o.jsx("p",{children:"Complete quizzes to see your activity"})]}),c&&c.login_streak>1&&o.jsxs("div",{className:"activity-item",children:[o.jsx("div",{className:"activity-icon streak-icon",children:o.jsx(X,{icon:Xd})}),o.jsxs("div",{className:"activity-content",children:[o.jsx("div",{className:"activity-details",children:o.jsxs("span",{className:"activity-title",children:["Login streak: ",c.login_streak," days"]})}),o.jsx("div",{className:"activity-time",children:"Current streak"})]})]})]})]}),o.jsxs("div",{className:"dashboard-card stats-card",children:[o.jsxs("div",{className:"card-header",children:[o.jsx("h2",{children:"Statistics Snapshot"}),o.jsxs(Rr,{to:"/statistics",className:"view-all-link",children:["View All ",o.jsx(X,{icon:Cd})]})]}),o.jsxs("div",{className:"stats-grid",children:[o.jsxs("div",{className:"stat-box",children:[o.jsx("div",{className:"stat-icon-bg",children:o.jsx(X,{icon:Pr})}),o.jsxs("div",{className:"stat-data",children:[o.jsx("h3",{children:"Total Completions"}),o.jsx("div",{className:"stat-number",children:ce})]})]}),o.jsxs("div",{className:"stat-box",children:[o.jsx("div",{className:"stat-icon-bg",children:o.jsx(X,{icon:fr})}),o.jsxs("div",{className:"stat-data",children:[o.jsx("h3",{children:"Unique Quiz Days"}),o.jsx("div",{className:"stat-number",children:(c==null?void 0:c.quiz_days_count)||0})]})]}),o.jsxs("div",{className:"stat-box",children:[o.jsx("div",{className:"stat-icon-bg",children:o.jsx(X,{icon:Xd})}),o.jsxs("div",{className:"stat-data",children:[o.jsx("h3",{children:"Quiz Streak"}),o.jsxs("div",{className:"stat-number",children:[(c==null?void 0:c.quiz_streak)||0,o.jsx("span",{className:"stat-unit",children:(c==null?void 0:c.quiz_streak)===1?" day":" days"})]})]})]}),o.jsxs("div",{className:"stat-box",children:[o.jsx("div",{className:"stat-icon-bg",children:o.jsx(X,{icon:jt})}),o.jsxs("div",{className:"stat-data",children:[o.jsx("h3",{children:"Longest Streak"}),o.jsxs("div",{className:"stat-number",children:[(c==null?void 0:c.longest_quiz_streak)||0,o.jsx("span",{className:"stat-unit",children:(c==null?void 0:c.longest_quiz_streak)===1?" day":" days"})]})]})]})]})]})]})]}),E&&w&&o.jsx("div",{className:"achievement-popup",children:o.jsxs("div",{className:"achievement-popup-content",children:[o.jsx("div",{className:"achievement-popup-icon",style:{backgroundColor:w.color||"#646cff"},children:o.jsx(X,{icon:O(w)})}),o.jsxs("div",{className:"achievement-popup-details",children:[o.jsx("h3",{children:"Achievement Unlocked!"}),o.jsx("h4",{children:w.title}),o.jsx("p",{children:w.description})]}),o.jsx("button",{className:"achievement-close-btn",onClick:()=>b(!1),children:"×"})]})}),o.jsx("style",{jsx:!0,children:`
        /* Main Container Styles */
        .dashboard-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 1.5rem 2rem;
        }
        
        /* Welcome Banner */
        .welcome-banner {
          background-color: #1a1a1a;
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        
        .welcome-banner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(100, 108, 255, 0.1), rgba(0, 0, 0, 0));
          z-index: 1;
        }
        
        .welcome-content {
          position: relative;
          z-index: 2;
          flex: 1;
        }
        
        .welcome-banner h1 {
          color: #ffffff;
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
        }
        
        .welcome-banner p {
          color: #b3b3b3;
          font-size: 1.1rem;
          margin: 0 0 1.5rem 0;
        }
        
        .user-stats {
          display: flex;
          gap: 2rem;
        }
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .stat-icon {
          font-size: 1.5rem;
          color: #646cff;
        }
        
        .stat-text {
          display: flex;
          flex-direction: column;
        }
        
        .stat-value {
          color: #ffffff;
          font-size: 1.25rem;
          font-weight: bold;
        }
        
        .stat-label {
          color: #b3b3b3;
          font-size: 0.85rem;
        }
        
        .progress-summary {
          position: relative;
          z-index: 2;
        }
        
        .progress-ring-circle-bg {
          opacity: 0.3;
        }
        
        .progress-ring-circle {
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
          transition: stroke-dashoffset 0.5s ease;
        }
        
        /* Dashboard Grid */
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        
        /* Card Styles */
        .dashboard-card {
          background-color: #1a1a1a;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #2c3e50;
        }
        
        .card-header h2 {
          color: #ffffff;
          font-size: 1.25rem;
          margin: 0;
        }
        
        .view-all-link {
          color: #646cff;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: color 0.2s ease;
        }
        
        .view-all-link:hover {
          color: #535bf2;
        }
        
        /* Modules Card */
        .modules-card {
          grid-column: span 2;
        }
        
        .modules-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        
        .module-card {
          background-color: #242424;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .module-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
        }
        
        .module-header {
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .module-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .module-header h3 {
          color: #ffffff;
          margin: 0;
          font-size: 1.1rem;
        }
        
        .module-content {
          padding: 0 1.25rem 1.25rem;
        }
        
        .module-content p {
          color: #b3b3b3;
          font-size: 0.9rem;
          margin-top: 0;
          margin-bottom: 1rem;
          min-height: 40px;
        }
        
        .module-progress {
          margin-bottom: 1.25rem;
        }
        
        .progress-bar {
          width: 100%;
          height: 8px;
          background-color: #333;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        
        .progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
        }
        
        .progress-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #b3b3b3;
          font-size: 0.85rem;
        }
        
        .complete-icon {
          font-size: 1rem;
        }
        
        .module-action-btn {
          width: 100%;
          padding: 0.75rem;
          border: none;
          border-radius: 6px;
          color: white;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          transition: opacity 0.2s ease;
        }
        
        .module-action-btn:hover {
          opacity: 0.9;
        }
        
        /* Achievements Card */
        .achievements-card {
          grid-column: 1;
          grid-row: span 2;
        }
        
        .achievements-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: calc(100% - 3rem);
        }
        
        .achievement-item {
          background-color: #242424;
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: transform 0.2s ease;
        }
        
        .achievement-item:hover {
          transform: translateX(5px);
        }
        
        .achievement-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 1.25rem;
          flex-shrink: 0;
        }
        
        .achievement-details {
          flex: 1;
        }
        
        .achievement-details h3 {
          color: #ffffff;
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
        }
        
        .achievement-details p {
          color: #b3b3b3;
          margin: 0;
          font-size: 0.85rem;
        }
        
        /* Activity Card */
        .activity-card {
          grid-column: 2;
        }
        
        .activity-timeline {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .activity-item {
          background-color: #242424;
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        
        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 1rem;
          flex-shrink: 0;
        }
        
        .quiz-icon {
          background-color: rgba(52, 152, 219, 0.2);
          color: #3498db;
        }
        
        .streak-icon {
          background-color: rgba(231, 76, 60, 0.2);
          color: #e74c3c;
        }
        
        .activity-content {
          flex: 1;
        }
        
        .activity-details {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }
        
        .activity-title {
          color: #ffffff;
          font-weight: 500;
          font-size: 0.95rem;
        }
        
        .activity-score {
          color: #b3b3b3;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .pass-icon {
          color: #2ecc71;
        }
        
        .activity-time {
          color: #777;
          font-size: 0.8rem;
        }
        
        /* Stats Card */
        .stats-card {
          grid-column: 2;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        
        .stat-box {
          background-color: #242424;
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .stat-icon-bg {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(100, 108, 255, 0.1);
          color: #646cff;
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        
        .stat-data {
          flex: 1;
        }
        
        .stat-data h3 {
          color: #b3b3b3;
          font-size: 0.8rem;
          margin: 0 0 0.25rem 0;
          font-weight: normal;
        }
        
        .stat-number {
          color: #ffffff;
          font-size: 1.25rem;
          font-weight: bold;
        }
        
        .stat-unit {
          font-size: 0.85rem;
          color: #b3b3b3;
          font-weight: normal;
        }
        
        /* Empty States */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
          color: #777;
          text-align: center;
        }
        
        .empty-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
        
        .empty-state p {
          color: #e0e0e0;
          font-size: 1.1rem;
        }
        
        /* Achievement Popup */
        .achievement-popup {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1000;
          animation: slideIn 0.5s ease forwards;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .achievement-popup-content {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          max-width: 350px;
          position: relative;
        }
        
        .achievement-popup-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        
        .achievement-popup-details {
          flex: 1;
        }
        
        .achievement-popup-details h3 {
          color: #646cff;
          margin: 0 0 0.25rem 0;
          font-size: 0.9rem;
        }
        
        .achievement-popup-details h4 {
          color: #ffffff;
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
        }
        
        .achievement-popup-details p {
          color: #b3b3b3;
          margin: 0;
          font-size: 0.85rem;
        }
        
        .achievement-close-btn {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: none;
          border: none;
          color: #b3b3b3;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.25rem;
          line-height: 1;
        }
        
        .achievement-close-btn:hover {
          color: #ffffff;
        }
        
        /* Loading/Error States */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 50vh;
          color: #ffffff;
        }
        
        .loading-animation {
          margin-bottom: 1rem;
        }
        
        .loading-spinner {
          font-size: 2.5rem;
          color: #646cff;
        }
        
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: #1a1a1a;
          border-radius: 12px;
          color: #ffffff;
          text-align: center;
        }
        
        .error-icon {
          color: #e74c3c;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .retry-btn {
          margin-top: 1rem;
          background-color: #646cff;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        }
        
        .retry-btn:hover {
          background-color: #535bf2;
        }
        
        /* Responsive Design */
        @media (max-width: 1100px) {
          .modules-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
          
          .modules-card,
          .achievements-card,
          .activity-card,
          .stats-card {
            grid-column: 1;
          }
        }
        
        @media (max-width: 768px) {
          .welcome-banner {
            flex-direction: column;
            padding: 1.5rem;
            gap: 1.5rem;
          }
          
          .welcome-banner h1 {
            font-size: 1.5rem;
          }
          
          .user-stats {
            flex-wrap: wrap;
            gap: 1rem;
          }
          
          .modules-grid {
            grid-template-columns: 1fr;
          }
          
          .dashboard-container {
            padding: 0 1rem 1.5rem;
          }
          
          .achievement-popup {
            left: 1rem;
            right: 1rem;
            bottom: 1rem;
          }
          
          .achievement-popup-content {
            width: 100%;
            max-width: none;
          }
        }
      `})]})},gw=()=>{sessionStorage.getItem("username");const r=sessionStorage.getItem("userId")||"1",[a,i]=R.useState(null),[c,l]=R.useState([]),[u,d]=R.useState(!0),[p,m]=R.useState(null),[v,y]=R.useState(window.innerWidth),[x,g]=R.useState("overview");R.useEffect(()=>{const W=()=>y(window.innerWidth);return window.addEventListener("resize",W),()=>window.removeEventListener("resize",W)},[]),R.useEffect(()=>{(async()=>{var q;d(!0);try{const K=await fetch(mn.GET_USER_STREAKS.replace(":userId",r));if(!K.ok)throw new Error("Failed to fetch user statistics");const Y=await K.json();console.log("User stats data:",Y),i(Y.userData||{}),l(Y.quizHistory||[]),console.log(`Loaded ${((q=Y.quizHistory)==null?void 0:q.length)||0} quiz completions for user ${r}`)}catch(K){console.error("Error fetching user statistics:",K),m(K.message),we.error("Failed to load statistics")}finally{d(!1)}})()},[r]);const E=()=>v<=480?280:v<=768?400:600,b=()=>v<=480?140:200,w=()=>{if(!c||c.length===0)return{scores:[],labels:[]};const q=[...c].sort((K,Y)=>new Date(K.completion_date||K.date)-new Date(Y.completion_date||Y.date)).slice(-10);return{scores:q.map(K=>K.score),labels:q.map(K=>{const Y=new Date(K.completion_date||K.date);return`${Y.getDate().toString().padStart(2,"0")}/${(Y.getMonth()+1).toString().padStart(2,"0")}`})}},N=W=>{if(!W)return"Unknown date";try{const q=new Date(W);return`${q.getDate().toString().padStart(2,"0")}/${(q.getMonth()+1).toString().padStart(2,"0")}`}catch(q){return console.error("Error formatting date:",q),"Invalid date"}},_=W=>{if(!W)return"Never";const q=new Date(W),Y=Math.abs(new Date-q),j=Math.floor(Y/(1e3*60*60*24));if(j===0)return"Today";if(j===1)return"Yesterday";if(j<7)return`${j} days ago`;if(j<30){const V=Math.floor(j/7);return`${V} ${V===1?"week":"weeks"} ago`}return N(W)},k=()=>{const W={totalCompletions:c.length,uniqueDays:(a==null?void 0:a.quiz_days_count)||0,beginner:c.filter(q=>q.quiz_id===1).length,intermediate:c.filter(q=>q.quiz_id===2).length,advanced:c.filter(q=>q.quiz_id===3).length,averageScore:0,highestScore:0,lowestScore:100,passRate:0,beginnerHighest:I("beginner"),intermediateHighest:I("intermediate"),advancedHighest:I("advanced"),recentQuizzes:[]};if(c.length>0){const q=c.map(K=>K.score);W.averageScore=Math.round(q.reduce((K,Y)=>K+Y,0)/q.length),W.highestScore=Math.max(...q),W.lowestScore=Math.min(...q),W.passRate=Math.round(c.filter(K=>K.score>=70).length/c.length*100),W.recentQuizzes=[...c].sort((K,Y)=>new Date(Y.completion_date||Y.date)-new Date(K.completion_date||K.date)).slice(0,5)}return W},I=W=>{if(!c||c.length===0)return 0;const q=W==="beginner"?1:W==="intermediate"?2:3,K=c.filter(Y=>Y.quiz_id===q);return K.length===0?0:Math.max(...K.map(Y=>Y.score))},z=W=>{const q=W==="beginner"?1:W==="intermediate"?2:3,K=c.filter(Le=>Le.quiz_id===q);if(K.length===0)return{attempts:0,highestScore:0,averageScore:0,passRate:0,recentScore:null,trend:"neutral"};const Y=K.length,j=K.map(Le=>Le.score),V=Math.max(...j),xe=Math.round(j.reduce((Le,Ke)=>Le+Ke,0)/Y),Ne=K.filter(Le=>Le.score>=70).length,Ce=Math.round(Ne/Y*100),Ee=[...K].sort((Le,Ke)=>new Date(Ke.completion_date||Ke.date)-new Date(Le.completion_date||Le.date));let je="neutral",Me=null;if(Ee.length>0&&(Me=Ee[0].score,Ee.length>1)){const Le=Ee[1].score;Me>Le?je="up":Me<Le&&(je="down")}return{attempts:Y,highestScore:V,averageScore:xe,passRate:Ce,recentScore:Me,trend:je}};if(u)return o.jsx("div",{className:"content-wrapper",children:o.jsxs("div",{className:"loading-container",children:[o.jsx(X,{icon:Ia,spin:!0,className:"loading-spinner"}),o.jsx("p",{children:"Loading your statistics..."})]})});if(p)return o.jsx("div",{className:"content-wrapper",children:o.jsxs("div",{className:"error-container",children:[o.jsx(X,{icon:Bi,className:"error-icon"}),o.jsx("h3",{children:"Error loading statistics"}),o.jsx("p",{children:p}),o.jsx("button",{onClick:()=>window.location.reload(),className:"retry-btn",children:"Try Again"})]})});const O=k(),Z=w(),F=E(),U=b(),Q=z("beginner"),T=z("intermediate"),J=z("advanced"),me=100,ce=F/Math.max(Z.scores.length-1,1),ue=Z.scores.map((W,q)=>{const K=q*ce,Y=U-W/me*U;return`${K},${Y}`}).join(" ");return o.jsxs("div",{className:"content-wrapper",children:[o.jsxs("div",{className:"statistics-container",children:[o.jsxs("div",{className:"statistics-header",children:[o.jsx("h2",{children:"Statistics"}),o.jsx("p",{className:"statistics-subtitle",children:"Track your progress and improvement over time"})]}),o.jsxs("div",{className:"statistics-tabs",children:[o.jsxs("button",{className:`tab-btn ${x==="overview"?"active":""}`,onClick:()=>g("overview"),children:[o.jsx(X,{icon:uu,className:"tab-icon"}),"Overview"]}),o.jsxs("button",{className:`tab-btn ${x==="quizzes"?"active":""}`,onClick:()=>g("quizzes"),children:[o.jsx(X,{icon:Pr,className:"tab-icon"}),"Quiz Details"]}),o.jsxs("button",{className:`tab-btn ${x==="streaks"?"active":""}`,onClick:()=>g("streaks"),children:[o.jsx(X,{icon:fr,className:"tab-icon"}),"Streaks"]})]}),x==="overview"&&o.jsx("div",{className:"statistics-tab-content",children:o.jsxs("div",{className:"stats-grid overview-grid",children:[o.jsxs("div",{className:"stats-card score-metrics",children:[o.jsx("h3",{className:"card-title",children:"Score Metrics"}),o.jsxs("div",{className:"metrics-grid",children:[o.jsxs("div",{className:"metric-item",children:[o.jsx("div",{className:"metric-icon average-icon",children:o.jsx(X,{icon:uu})}),o.jsxs("div",{className:"metric-content",children:[o.jsx("span",{className:"metric-label",children:"Average Score"}),o.jsxs("span",{className:"metric-value",children:[O.averageScore,"%"]})]})]}),o.jsxs("div",{className:"metric-item",children:[o.jsx("div",{className:"metric-icon highest-icon",children:o.jsx(X,{icon:co})}),o.jsxs("div",{className:"metric-content",children:[o.jsx("span",{className:"metric-label",children:"Highest Score"}),o.jsxs("span",{className:"metric-value",children:[O.highestScore,"%"]})]})]}),o.jsxs("div",{className:"metric-item",children:[o.jsx("div",{className:"metric-icon lowest-icon",children:o.jsx(X,{icon:uo})}),o.jsxs("div",{className:"metric-content",children:[o.jsx("span",{className:"metric-label",children:"Lowest Score"}),o.jsxs("span",{className:"metric-value",children:[O.lowestScore,"%"]})]})]}),o.jsxs("div",{className:"metric-item",children:[o.jsx("div",{className:"metric-icon pass-icon",children:o.jsx(X,{icon:lu})}),o.jsxs("div",{className:"metric-content",children:[o.jsx("span",{className:"metric-label",children:"Pass Rate"}),o.jsxs("span",{className:"metric-value",children:[O.passRate,"%"]})]})]})]})]}),o.jsxs("div",{className:"stats-card score-history-card",children:[o.jsx("h3",{className:"card-title",children:"Quiz Score History"}),Z.scores.length>0?o.jsxs("div",{className:"score-chart-container",children:[o.jsxs("div",{className:"y-axis-labels",children:[o.jsx("span",{children:"100%"}),o.jsx("span",{children:"75%"}),o.jsx("span",{children:"50%"}),o.jsx("span",{children:"25%"}),o.jsx("span",{children:"0%"})]}),o.jsxs("div",{className:"chart-area",children:[o.jsxs("svg",{width:F,height:U,className:"score-chart",children:[o.jsx("line",{x1:"0",y1:"0",x2:F,y2:"0",stroke:"#444",strokeDasharray:"2"}),o.jsx("line",{x1:"0",y1:U/4,x2:F,y2:U/4,stroke:"#444",strokeDasharray:"2"}),o.jsx("line",{x1:"0",y1:U/2,x2:F,y2:U/2,stroke:"#444",strokeDasharray:"2"}),o.jsx("line",{x1:"0",y1:U*3/4,x2:F,y2:U*3/4,stroke:"#444",strokeDasharray:"2"}),o.jsx("line",{x1:"0",y1:U,x2:F,y2:U,stroke:"#444",strokeDasharray:"2"}),o.jsx("line",{x1:"0",y1:U-70/me*U,x2:F,y2:U-70/me*U,stroke:"#e67e22",strokeWidth:"1.5",strokeDasharray:"5,3"}),o.jsx("text",{x:"5",y:U-70/me*U-5,fill:"#e67e22",fontSize:"10",children:"Pass threshold (70%)"}),o.jsx("polyline",{fill:"none",stroke:"#646cff",strokeWidth:"3",points:ue}),Z.scores.map((W,q)=>{const K=q*ce,Y=U-W/me*U;return o.jsxs("g",{className:"data-point",children:[o.jsx("circle",{cx:K,cy:Y,r:"4",fill:"#646cff",stroke:"#fff",strokeWidth:"1"}),o.jsxs("text",{x:K,y:Y-10,fill:"#fff",fontSize:"10",textAnchor:"middle",className:"point-label",children:[W,"%"]})]},q)})]}),o.jsx("div",{className:"x-axis-labels",children:Z.labels.map((W,q)=>o.jsx("span",{style:{left:`${q/(Z.labels.length-1||1)*100}%`,transform:"translateX(-50%)"},children:W},q))})]})]}):o.jsxs("div",{className:"no-data-message",children:[o.jsx(X,{icon:Ei,className:"info-icon"}),o.jsx("p",{children:"Complete quizzes to see your score history"})]})]}),o.jsxs("div",{className:"stats-card quiz-completions-card",children:[o.jsx("h3",{className:"card-title",children:"Quiz Completions"}),o.jsxs("div",{className:"completions-grid",children:[o.jsxs("div",{className:"completion-stat",children:[o.jsx("div",{className:"stat-number",children:O.totalCompletions}),o.jsx("div",{className:"stat-label",children:"Total Completions"})]}),o.jsxs("div",{className:"completion-stat",children:[o.jsx("div",{className:"stat-number",children:O.uniqueDays}),o.jsx("div",{className:"stat-label",children:"Unique Quiz Days"})]}),o.jsxs("div",{className:"completion-stat",children:[o.jsx("div",{className:"stat-number",children:O.beginner}),o.jsx("div",{className:"stat-label",children:"Beginner Quizzes"})]}),o.jsxs("div",{className:"completion-stat",children:[o.jsx("div",{className:"stat-number",children:O.intermediate}),o.jsx("div",{className:"stat-label",children:"Intermediate Quizzes"})]}),o.jsxs("div",{className:"completion-stat",children:[o.jsx("div",{className:"stat-number",children:O.advanced}),o.jsx("div",{className:"stat-label",children:"Advanced Quizzes"})]})]})]}),o.jsxs("div",{className:"stats-card module-progress-card",children:[o.jsx("h3",{className:"card-title",children:"Module Progress"}),o.jsxs("div",{className:"progress-items",children:[o.jsxs("div",{className:"progress-item",children:[o.jsxs("div",{className:"progress-label",children:[o.jsx("span",{className:"module-name",children:"Beginner"}),o.jsxs("span",{className:"module-score",children:[O.beginnerHighest,"%"]})]}),o.jsx("div",{className:"progress-bar",children:o.jsx("div",{className:"progress-fill beginner-fill",style:{width:`${O.beginnerHighest}%`}})})]}),o.jsxs("div",{className:"progress-item",children:[o.jsxs("div",{className:"progress-label",children:[o.jsx("span",{className:"module-name",children:"Intermediate"}),o.jsxs("span",{className:"module-score",children:[O.intermediateHighest,"%"]})]}),o.jsx("div",{className:"progress-bar",children:o.jsx("div",{className:"progress-fill intermediate-fill",style:{width:`${O.intermediateHighest}%`}})})]}),o.jsxs("div",{className:"progress-item",children:[o.jsxs("div",{className:"progress-label",children:[o.jsx("span",{className:"module-name",children:"Advanced"}),o.jsxs("span",{className:"module-score",children:[O.advancedHighest,"%"]})]}),o.jsx("div",{className:"progress-bar",children:o.jsx("div",{className:"progress-fill advanced-fill",style:{width:`${O.advancedHighest}%`}})})]})]})]})]})}),x==="quizzes"&&o.jsx("div",{className:"statistics-tab-content",children:o.jsxs("div",{className:"stats-grid quizzes-grid",children:[o.jsxs("div",{className:"stats-card difficulty-card beginner-card",children:[o.jsxs("div",{className:"difficulty-header",children:[o.jsx("div",{className:"difficulty-icon beginner-icon",children:o.jsx(X,{icon:Ad})}),o.jsx("h3",{className:"card-title",children:"Beginner Quizzes"})]}),Q.attempts>0?o.jsxs("div",{className:"difficulty-stats",children:[o.jsxs("div",{className:"stat-row",children:[o.jsxs("div",{className:"stat-column",children:[o.jsxs("div",{className:"stat-item",children:[o.jsx("span",{className:"stat-value",children:Q.attempts}),o.jsx("span",{className:"stat-label",children:"Attempts"})]}),o.jsxs("div",{className:"stat-item",children:[o.jsxs("span",{className:"stat-value",children:[Q.highestScore,"%"]}),o.jsx("span",{className:"stat-label",children:"Highest Score"})]})]}),o.jsxs("div",{className:"stat-column",children:[o.jsxs("div",{className:"stat-item",children:[o.jsxs("span",{className:"stat-value",children:[Q.averageScore,"%"]}),o.jsx("span",{className:"stat-label",children:"Average Score"})]}),o.jsxs("div",{className:"stat-item",children:[o.jsxs("span",{className:"stat-value",children:[Q.passRate,"%"]}),o.jsx("span",{className:"stat-label",children:"Pass Rate"})]})]})]}),Q.recentScore!==null&&o.jsxs("div",{className:"recent-score",children:[o.jsx("div",{className:"recent-score-label",children:"Most Recent Score:"}),o.jsxs("div",{className:"recent-score-value",children:[Q.recentScore,"%",Q.trend==="up"&&o.jsx(X,{icon:co,className:"trend-up"}),Q.trend==="down"&&o.jsx(X,{icon:uo,className:"trend-down"})]})]})]}):o.jsx("div",{className:"no-data-message",children:o.jsx("p",{children:"No beginner quizzes completed yet"})})]}),o.jsxs("div",{className:"stats-card difficulty-card intermediate-card",children:[o.jsxs("div",{className:"difficulty-header",children:[o.jsx("div",{className:"difficulty-icon intermediate-icon",children:o.jsx(X,{icon:Ad})}),o.jsx("h3",{className:"card-title",children:"Intermediate Quizzes"})]}),T.attempts>0?o.jsxs("div",{className:"difficulty-stats",children:[o.jsxs("div",{className:"stat-row",children:[o.jsxs("div",{className:"stat-column",children:[o.jsxs("div",{className:"stat-item",children:[o.jsx("span",{className:"stat-value",children:T.attempts}),o.jsx("span",{className:"stat-label",children:"Attempts"})]}),o.jsxs("div",{className:"stat-item",children:[o.jsxs("span",{className:"stat-value",children:[T.highestScore,"%"]}),o.jsx("span",{className:"stat-label",children:"Highest Score"})]})]}),o.jsxs("div",{className:"stat-column",children:[o.jsxs("div",{className:"stat-item",children:[o.jsxs("span",{className:"stat-value",children:[T.averageScore,"%"]}),o.jsx("span",{className:"stat-label",children:"Average Score"})]}),o.jsxs("div",{className:"stat-item",children:[o.jsxs("span",{className:"stat-value",children:[T.passRate,"%"]}),o.jsx("span",{className:"stat-label",children:"Pass Rate"})]})]})]}),T.recentScore!==null&&o.jsxs("div",{className:"recent-score",children:[o.jsx("div",{className:"recent-score-label",children:"Most Recent Score:"}),o.jsxs("div",{className:"recent-score-value",children:[T.recentScore,"%",T.trend==="up"&&o.jsx(X,{icon:co,className:"trend-up"}),T.trend==="down"&&o.jsx(X,{icon:uo,className:"trend-down"})]})]})]}):o.jsx("div",{className:"no-data-message",children:o.jsx("p",{children:"No intermediate quizzes completed yet"})})]}),o.jsxs("div",{className:"stats-card difficulty-card advanced-card",children:[o.jsxs("div",{className:"difficulty-header",children:[o.jsx("div",{className:"difficulty-icon advanced-icon",children:o.jsx(X,{icon:Ad})}),o.jsx("h3",{className:"card-title",children:"Advanced Quizzes"})]}),J.attempts>0?o.jsxs("div",{className:"difficulty-stats",children:[o.jsxs("div",{className:"stat-row",children:[o.jsxs("div",{className:"stat-column",children:[o.jsxs("div",{className:"stat-item",children:[o.jsx("span",{className:"stat-value",children:J.attempts}),o.jsx("span",{className:"stat-label",children:"Attempts"})]}),o.jsxs("div",{className:"stat-item",children:[o.jsxs("span",{className:"stat-value",children:[J.highestScore,"%"]}),o.jsx("span",{className:"stat-label",children:"Highest Score"})]})]}),o.jsxs("div",{className:"stat-column",children:[o.jsxs("div",{className:"stat-item",children:[o.jsxs("span",{className:"stat-value",children:[J.averageScore,"%"]}),o.jsx("span",{className:"stat-label",children:"Average Score"})]}),o.jsxs("div",{className:"stat-item",children:[o.jsxs("span",{className:"stat-value",children:[J.passRate,"%"]}),o.jsx("span",{className:"stat-label",children:"Pass Rate"})]})]})]}),J.recentScore!==null&&o.jsxs("div",{className:"recent-score",children:[o.jsx("div",{className:"recent-score-label",children:"Most Recent Score:"}),o.jsxs("div",{className:"recent-score-value",children:[J.recentScore,"%",J.trend==="up"&&o.jsx(X,{icon:co,className:"trend-up"}),J.trend==="down"&&o.jsx(X,{icon:uo,className:"trend-down"})]})]})]}):o.jsx("div",{className:"no-data-message",children:o.jsx("p",{children:"No advanced quizzes completed yet"})})]}),o.jsxs("div",{className:"stats-card recent-quizzes-card",children:[o.jsx("h3",{className:"card-title",children:"Recent Quiz Activity"}),o.jsx("div",{className:"recent-quizzes-list",children:O.recentQuizzes.length>0?O.recentQuizzes.map((W,q)=>o.jsxs("div",{className:"recent-quiz-item",children:[o.jsxs("div",{className:"quiz-date-time",children:[o.jsx(X,{icon:l5,className:"date-icon"}),o.jsx("span",{children:_(W.completion_date||W.date)})]}),o.jsxs("div",{className:"quiz-details",children:[o.jsx("div",{className:"quiz-type",children:o.jsx("span",{className:`difficulty-badge ${oe(W.quiz_id)}`,children:G(W.quiz_id)})}),o.jsx("div",{className:"quiz-score",children:o.jsxs("span",{className:`score ${W.score>=70?"passing":"failing"}`,children:[W.score,"%",W.score>=70?o.jsx(X,{icon:lu,className:"pass-icon"}):o.jsx(X,{icon:L5,className:"fail-icon"})]})})]})]},q)):o.jsx("div",{className:"no-quiz-data",children:o.jsx("p",{children:"No quiz activity yet"})})})]})]})}),x==="streaks"&&o.jsx("div",{className:"statistics-tab-content",children:o.jsxs("div",{className:"stats-grid streaks-grid",children:[o.jsxs("div",{className:"stats-card current-streaks-card",children:[o.jsx("h3",{className:"card-title",children:"Current Streaks"}),o.jsxs("div",{className:"streaks-container",children:[o.jsxs("div",{className:"streak-item",children:[o.jsx("div",{className:"streak-icon-container login-streak-icon",children:o.jsx(X,{icon:fr,className:"streak-icon"})}),o.jsxs("div",{className:"streak-content",children:[o.jsx("div",{className:"streak-value",children:(a==null?void 0:a.login_streak)||0}),o.jsxs("div",{className:"streak-label",children:["Day Login Streak",o.jsx("div",{className:"streak-subtitle",children:"Consecutive days logged in"})]})]})]}),o.jsxs("div",{className:"streak-item",children:[o.jsx("div",{className:"streak-icon-container quiz-streak-icon",children:o.jsx(X,{icon:Pr,className:"streak-icon"})}),o.jsxs("div",{className:"streak-content",children:[o.jsx("div",{className:"streak-value",children:(a==null?void 0:a.quiz_streak)||0}),o.jsxs("div",{className:"streak-label",children:["Day Quiz Streak",o.jsx("div",{className:"streak-subtitle",children:"Consecutive days with quizzes"})]})]})]})]})]}),o.jsxs("div",{className:"stats-card record-streaks-card",children:[o.jsx("h3",{className:"card-title",children:"Record Streaks"}),o.jsxs("div",{className:"streaks-container",children:[o.jsxs("div",{className:"streak-item",children:[o.jsx("div",{className:"streak-icon-container login-record-icon",children:o.jsx(X,{icon:jt,className:"streak-icon"})}),o.jsxs("div",{className:"streak-content",children:[o.jsx("div",{className:"streak-value",children:(a==null?void 0:a.longest_login_streak)||0}),o.jsxs("div",{className:"streak-label",children:["Longest Login Streak",o.jsx("div",{className:"streak-subtitle",children:"Best consecutive login days"})]})]})]}),o.jsxs("div",{className:"streak-item",children:[o.jsx("div",{className:"streak-icon-container quiz-record-icon",children:o.jsx(X,{icon:jt,className:"streak-icon"})}),o.jsxs("div",{className:"streak-content",children:[o.jsx("div",{className:"streak-value",children:(a==null?void 0:a.longest_quiz_streak)||0}),o.jsxs("div",{className:"streak-label",children:["Longest Quiz Streak",o.jsx("div",{className:"streak-subtitle",children:"Best consecutive quiz days"})]})]})]})]})]}),o.jsxs("div",{className:"stats-card streak-info-card",children:[o.jsxs("h3",{className:"card-title",children:[o.jsx(X,{icon:Ei,style:{marginRight:"8px"}}),"About Streaks"]}),o.jsxs("div",{className:"streak-info-content",children:[o.jsxs("p",{children:[o.jsx("strong",{children:"Login Streak:"})," This counter increases each day you log in to the application. It resets to zero if you don't log in for 24 hours."]}),o.jsxs("p",{children:[o.jsx("strong",{children:"Quiz Streak:"})," This counter increases each day you complete at least one quiz. It resets to zero if you don't complete a quiz for 24 hours."]}),o.jsxs("div",{className:"streak-benefits",children:[o.jsx("h4",{children:"Benefits of Maintaining Streaks:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"Unlock special achievements"}),o.jsx("li",{children:"Track your consistency"}),o.jsx("li",{children:"Build security awareness habits"}),o.jsx("li",{children:"Compete on the leaderboard"})]})]})]})]})]})})]}),o.jsx("style",{jsx:!0,children:`
        /* Main container */
        .statistics-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .statistics-header {
          margin-bottom: 1.5rem;
        }
        
        .statistics-header h2 {
          color: #ffffff;
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }
        
        .statistics-subtitle {
          color: #ffffff;
          font-size: 1rem;
          font-weight: 300;
        }
        
        /* Tabs styling */
        .statistics-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #333;
          padding-bottom: 0.5rem;
        }
        
        .tab-btn {
          background: none;
          border: none;
          color: #ffffff;
          padding: 0.75rem 1.25rem;
          border-radius: 6px 6px 0 0;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .tab-btn:hover {
          color: #ffffff;
          background-color: rgba(60, 60, 80, 0.6);
        }
        
        .tab-btn.active {
          color: #ffffff;
          background-color: rgba(60, 60, 80, 0.8);
          border-bottom: 3px solid #646cff;
        }
        
        .tab-icon {
          font-size: 1rem;
        }
        
        /* Stats grid layout */
        .stats-grid {
          display: grid;
          gap: 1.5rem;
        }
        
        .overview-grid {
          grid-template-columns: repeat(2, 1fr);
          grid-template-areas:
            "scores history"
            "completions modules";
        }
        
        .quizzes-grid {
          grid-template-columns: repeat(2, 1fr);
          grid-template-areas:
            "beginner intermediate"
            "advanced recent";
        }
        
        .streaks-grid {
          grid-template-columns: repeat(2, 1fr);
          grid-template-areas:
            "current record"
            "info info";
        }
        
        /* Card styling */
        .stats-card {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .card-title {
          color: #ffffff;
          font-size: 1.2rem;
          margin-top: 0;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
        }
        
        /* Score Metrics Card */
        .score-metrics {
          grid-area: scores;
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        
        .metric-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
        }
        
        .metric-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }
        
        .average-icon {
          background-color: rgba(100, 108, 255, 0.15);
          color: #646cff;
        }
        
        .highest-icon {
          background-color: rgba(46, 204, 113, 0.15);
          color: #2ecc71;
        }
        
        .lowest-icon {
          background-color: rgba(231, 76, 60, 0.15);
          color: #e74c3c;
        }
        
        .pass-icon {
          background-color: rgba(241, 196, 15, 0.15);
          color: #f1c40f;
        }
        
        .metric-content {
          display: flex;
          flex-direction: column;
        }
        
        .metric-label {
          color: #aaaaaa;
          font-size: 0.9rem;
        }
        
        .metric-value {
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        /* Score History Chart */
        .score-history-card {
          grid-area: history;
        }
        
        .score-chart-container {
          display: flex;
          height: 250px;
        }
        
        .y-axis-labels {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-right: 10px;
          color: #aaaaaa;
          font-size: 0.8rem;
        }
        
        .chart-area {
          flex: 1;
          position: relative;
        }
        
        .score-chart {
          background-color: #242424;
          border-radius: 8px;
          padding: 10px;
        }
        
        .x-axis-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          color: #aaaaaa;
          font-size: 0.8rem;
          position: relative;
          height: 20px;
        }
        
        .x-axis-labels span {
          position: absolute;
          transform: translateX(-50%);
        }
        
        .data-point:hover .point-label {
          display: block;
        }
        
        .point-label {
          display: none;
        }
        
        /* Quiz Completions Card */
        .quiz-completions-card {
          grid-area: completions;
        }
        
        .completions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 1rem;
        }
        
        .completion-stat {
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
        }
        
        .stat-number {
          color: #646cff;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          color: #aaaaaa;
          font-size: 0.9rem;
        }
        
        /* Module Progress Card */
        .module-progress-card {
          grid-area: modules;
        }
        
        .progress-items {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        
        .progress-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .progress-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .module-name {
          color: #ffffff;
          font-weight: 500;
        }
        
        .module-score {
          color: #aaaaaa;
          font-size: 0.9rem;
        }
        
        .progress-bar {
          height: 10px;
          background-color: #333;
          border-radius: 5px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          border-radius: 5px;
          transition: width 0.3s ease;
        }
        
        .beginner-fill {
          background-color: #3498db;
        }
        
        .intermediate-fill {
          background-color: #2ecc71;
        }
        
        .advanced-fill {
          background-color: #e74c3c;
        }
        
        /* Difficulty Cards */
        .difficulty-card {
          padding: 1.25rem;
        }
        
        .beginner-card {
          grid-area: beginner;
        }
        
        .intermediate-card {
          grid-area: intermediate;
        }
        
        .advanced-card {
          grid-area: advanced;
        }
        
        .difficulty-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        
        .difficulty-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }
        
        .beginner-icon {
          background-color: rgba(52, 152, 219, 0.15);
          color: #3498db;
        }
        
        .intermediate-icon {
          background-color: rgba(46, 204, 113, 0.15);
          color: #2ecc71;
        }
        
        .advanced-icon {
          background-color: rgba(231, 76, 60, 0.15);
          color: #e74c3c;
        }
        
        .difficulty-stats {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .stat-row {
          display: flex;
          gap: 1rem;
        }
        
        .stat-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .stat-item {
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
        }
        
        .stat-value {
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        
        .stat-label {
          color: #aaaaaa;
          font-size: 0.85rem;
        }
        
        .recent-score {
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 0.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .recent-score-label {
          color: #aaaaaa;
          font-size: 0.9rem;
        }
        
        .recent-score-value {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .trend-up {
          color: #2ecc71;
        }
        
        .trend-down {
          color: #e74c3c;
        }
        
        /* Recent Quizzes Card */
        .recent-quizzes-card {
          grid-area: recent;
        }
        
        .recent-quizzes-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 350px;
          overflow-y: auto;
        }
        
        .recent-quiz-item {
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .quiz-date-time {
          color: #aaaaaa;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .date-icon {
          font-size: 0.8rem;
        }
        
        .quiz-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .difficulty-badge {
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }
        
        .beginner-badge {
          background-color: rgba(52, 152, 219, 0.15);
          color: #3498db;
        }
        
        .intermediate-badge {
          background-color: rgba(46, 204, 113, 0.15);
          color: #2ecc71;
        }
        
        .advanced-badge {
          background-color: rgba(231, 76, 60, 0.15);
          color: #e74c3c;
        }
        
        .quiz-score {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .score {
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .passing {
          color: #2ecc71;
        }
        
        .failing {
          color: #e74c3c;
        }
        
        .pass-icon {
          font-size: 0.9rem;
          color: #2ecc71;
        }
        
        .fail-icon {
          font-size: 0.9rem;
          color: #e74c3c;
        }
        
        /* Streak Cards */
        .current-streaks-card {
          grid-area: current;
        }
        
        .record-streaks-card {
          grid-area: record;
        }
        
        .streak-info-card {
          grid-area: info;
        }
        
        .streaks-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .streak-item {
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .streak-icon-container {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          flex-shrink: 0;
        }
        
        .login-streak-icon {
          background-color: rgba(52, 152, 219, 0.15);
          color: #3498db;
        }
        
        .quiz-streak-icon {
          background-color: rgba(46, 204, 113, 0.15);
          color: #2ecc71;
        }
        
        .login-record-icon,
        .quiz-record-icon {
          background-color: rgba(241, 196, 15, 0.15);
          color: #f1c40f;
        }
        
        .streak-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .streak-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffffff;
          min-width: 50px;
          text-align: center;
        }
        
        .streak-label {
          display: flex;
          flex-direction: column;
          color: #ffffff;
          font-weight: 500;
        }
        
        .streak-subtitle {
          color: #aaaaaa;
          font-size: 0.85rem;
          font-weight: 400;
          margin-top: 0.25rem;
        }
        
        .streak-info-content {
          color: #e0e0e0;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        .streak-info-content p {
          margin-bottom: 1rem;
        }
        
        .streak-benefits {
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1rem;
        }
        
        .streak-benefits h4 {
          color: #ffffff;
          margin-top: 0;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }
        
        .streak-benefits ul {
          margin: 0;
          padding-left: 1.5rem;
          color: #e0e0e0;
        }
        
        .streak-benefits li {
          margin-bottom: 0.5rem;
        }
        
        /* No data message */
        .no-data-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          color: #aaaaaa;
          font-style: italic;
          text-align: center;
          gap: 1rem;
        }
        
        .info-icon {
          font-size: 2rem;
          color: #3498db;
        }
        
        .no-quiz-data {
          padding: 2rem;
          text-align: center;
          color: #aaaaaa;
          font-style: italic;
        }
        
        /* Loading/Error states */
        .loading-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 300px;
          color: #ecf0f1;
        }
        
        .loading-spinner {
          font-size: 2rem;
          color: #3498db;
          margin-bottom: 1rem;
        }
        
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: #1a1a1a;
          border-radius: 8px;
          color: #ecf0f1;
        }
        
        .error-icon {
          color: #e74c3c;
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .retry-btn {
          margin-top: 1rem;
          background-color: #3498db;
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .retry-btn:hover {
          background-color: #2980b9;
        }
        
        /* Responsive styles */
        @media (max-width: 992px) {
          .statistics-container {
            padding: 1.5rem;
          }
          
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .overview-grid,
          .quizzes-grid,
          .streaks-grid {
            grid-template-columns: 1fr;
            grid-template-areas: none;
          }
          
          .stats-card {
            grid-area: auto !important;
          }
          
          .tab-btn {
            padding: 0.5rem 0.75rem;
            font-size: 0.9rem;
          }
        }
        
        @media (max-width: 480px) {
          .statistics-container {
            padding: 1rem;
          }
          
          .statistics-tabs {
            flex-wrap: wrap;
          }
          
          .tab-btn {
            flex: 1;
            justify-content: center;
          }
          
          .tab-icon {
            display: none;
          }
          
          .stat-row {
            flex-direction: column;
          }
          
          .streak-content {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .streak-value {
            min-width: auto;
            text-align: left;
          }
        }
      `})]});function G(W){switch(W){case 1:return"Beginner";case 2:return"Intermediate";case 3:return"Advanced";default:return"Unknown"}}function oe(W){switch(W){case 1:return"beginner-badge";case 2:return"intermediate-badge";case 3:return"advanced-badge";default:return""}}},vw=()=>{const[r,a]=R.useState(1),[i,c]=R.useState(null),[l,u]=R.useState([]),[d,p]=R.useState(!0),[m,v]=R.useState(null),[y,x]=R.useState([]),g=sessionStorage.getItem("username")||"";R.useEffect(()=>{w(),b()},[]),R.useEffect(()=>{y.length>0&&(console.log("Quiz history updated, recalculating user data..."),w())},[y]);const E=l.findIndex(T=>T.username===g)+1;R.useEffect(()=>{E>0&&a(Math.ceil(E/k))},[E,l]);const b=async()=>{try{console.log("Fetching quiz history data...");const T=await fetch(mn.GET_USER_QUIZ_HISTORY);if(!T.ok)throw new Error("Failed to fetch quiz history");const J=await T.json();console.log("Quiz history data received:",J),J.success&&J.quizHistory?(console.log("Setting quiz history:",J.quizHistory),x(J.quizHistory)):console.warn("Missing or invalid quiz history data:",J)}catch(T){console.error("Error fetching quiz history",T)}},w=async()=>{p(!0);try{console.log("Fetching leaderboard data...");const T=await fetch(mn.GET_USERS);if(!T.ok)throw new Error("Failed to fetch users");const J=await T.json();if(console.log("Leaderboard data:",J),J.success&&J.users){const me=J.users.map(ce=>{const ue=ce.quiz_days_count||0,G=ce.total_quiz_completions||0,oe=ce.login_streak||0,W=ce.quiz_streak||0,q=N(ce),K=_(ce);return{id:ce.id,username:ce.username,score:q,accuracy:K,completedChallenges:ue,totalCompletions:G,loginStreak:oe,quizStreak:W,longestLoginStreak:ce.longest_login_streak||0,longestQuizStreak:ce.longest_quiz_streak||0,lastLogin:ce.last_login,lastLoginUpdate:ce.last_login_update,lastQuizUpdate:ce.last_quiz_update}});me.sort((ce,ue)=>{const G=ue.score-ce.score;if(G!==0)return G;const oe=ue.quizStreak-ce.quizStreak;return oe!==0?oe:ue.loginStreak-ce.loginStreak}),u(me)}else throw new Error("Invalid user data format")}catch(T){console.error("Error fetching users",T),v(T.message),we.error("Failed to load leaderboard data")}finally{p(!1)}};function N(T){console.log("Calculating score for user:",T.username,"ID:",T.id);const J=y.find(ue=>ue.user_id===T.id);if(console.log("Quiz history data found:",J),!J||!J.quiz_completions)return console.log("No quiz completions found for user",T.username),T.total_quiz_completions&&T.total_quiz_completions>0?(console.log("Using total_quiz_completions for fallback score:",T.total_quiz_completions),T.total_quiz_completions*50):0;let me;if(Array.isArray(J.quiz_completions))me=J.quiz_completions;else if(typeof J.quiz_completions=="object")try{const ue=JSON.parse(J.quiz_completions);me=Array.isArray(ue)?ue:null}catch(ue){console.error("Failed to parse quiz_completions",ue),me=null}if(console.log("Quiz completions array length:",(me==null?void 0:me.length)||0),!me||!Array.isArray(me)||me.length===0)return console.log("No valid quiz completions array for user",T.username),0;let ce=0;return me.forEach(ue=>{const G=ue.total_questions||5;let oe=ue.correct_answers;if(oe!=null){const W=oe*10;ce+=W,console.log(`Quiz ${ue.quiz_id} with correct_answers data: ${oe} correct, ${W} points`)}else if(ue.completion_details)try{const W=typeof ue.completion_details=="string"?JSON.parse(ue.completion_details):ue.completion_details;if(Array.isArray(W)){const q=W.filter(Y=>Y.isCorrect).length,K=q*10;ce+=K,console.log(`Quiz ${ue.quiz_id} with detailed data: ${q} correct answers, ${K} points`)}}catch(W){console.error("Error parsing completion details:",W);const K=Math.round(ue.score/100*G)*10;ce+=K}else if(ue.score){const W=Math.round(ue.score/100*G),q=W*10;ce+=q,console.log(`Quiz ${ue.quiz_id} score: ${ue.score}%, estimated ${W} correct of ${G}, ${q} points`)}}),console.log(`User ${T.username} final score: ${ce}`),ce}function _(T){console.log("Calculating accuracy for user:",T.username);const J=y.find(oe=>oe.user_id===T.id);if(!J||!J.quiz_completions)return console.log("No quiz completions found for accuracy calculation"),0;let me;if(Array.isArray(J.quiz_completions))me=J.quiz_completions;else if(typeof J.quiz_completions=="object")try{const oe=JSON.parse(J.quiz_completions);me=Array.isArray(oe)?oe:null}catch(oe){console.error("Failed to parse quiz_completions for accuracy",oe),me=null}if(!me||!Array.isArray(me)||me.length===0)return console.log("No valid quiz completions array for accuracy calculation"),0;let ce=0,ue=0;if(me.forEach(oe=>{if(typeof oe.score=="number")ce+=oe.score,ue++,console.log(`Accuracy calculation: quiz score ${oe.score}%`);else if(oe.completion_details)try{const W=typeof oe.completion_details=="string"?JSON.parse(oe.completion_details):oe.completion_details;if(Array.isArray(W)){const q=W.length;if(q>0){const Y=W.filter(j=>j.isCorrect).length/q*100;ce+=Y,ue++,console.log(`Accuracy calculation from details: ${Y.toFixed(1)}%`)}}}catch(W){console.error("Error parsing completion details for accuracy:",W)}else if(oe.correct_answers&&oe.total_questions){const W=oe.correct_answers/oe.total_questions*100;ce+=W,ue++,console.log(`Accuracy calculation from correct_answers: ${W.toFixed(1)}%`)}}),ue===0)return 0;const G=ce/ue;return console.log(`User ${T.username} accuracy: ${Math.round(G)}%`),Math.round(G)}const k=10,I=Math.ceil(l.length/k),z=l.slice((r-1)*k,r*k),O=()=>{r<I&&a(r+1)},Z=()=>{r>1&&a(r-1)},F=()=>{E>0&&a(Math.ceil(E/k))},U=T=>{switch(T){case 1:return o.jsx(X,{icon:jt,className:"rank-icon gold"});case 2:return o.jsx(X,{icon:Ti,className:"rank-icon silver"});case 3:return o.jsx(X,{icon:cu,className:"rank-icon bronze"});default:return o.jsx("span",{className:"rank-number",children:T})}},Q=T=>{if(!T)return"Never";const J=new Date(T),ce=Math.abs(new Date-J),ue=Math.floor(ce/(1e3*60*60*24));if(ue===0)return"Today";if(ue===1)return"Yesterday";if(ue<7)return`${ue} days ago`;if(ue<30){const G=Math.floor(ue/7);return`${G} ${G===1?"week":"weeks"} ago`}else return J.toLocaleDateString()};return d?o.jsx("div",{className:"content-wrapper",children:o.jsxs("div",{className:"loading-container",children:[o.jsx(X,{icon:Ia,spin:!0,className:"loading-spinner"}),o.jsx("p",{children:"Loading leaderboard data..."})]})}):m?o.jsx("div",{className:"content-wrapper",children:o.jsxs("div",{className:"error-container",children:[o.jsx(X,{icon:Bi,className:"error-icon"}),o.jsx("h3",{children:"Failed to load leaderboard"}),o.jsx("p",{children:m}),o.jsx("button",{onClick:w,className:"retry-btn",children:"Try Again"})]})}):o.jsxs("div",{className:"content-wrapper",children:[o.jsxs("div",{className:"leaderboard-container",children:[o.jsx("div",{className:"leaderboard-header",children:o.jsx("h2",{children:"Leaderboard"})}),o.jsx("div",{className:"leaderboard-content",children:l.length===0?o.jsx("div",{className:"no-data-message",children:o.jsx("p",{children:"No users found. Be the first to complete a challenge"})}):o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"leaderboard-table",children:[o.jsxs("div",{className:"leaderboard-table-header",children:[o.jsx("div",{className:"rank-column",children:"Rank"}),o.jsx("div",{className:"user-column",children:"User"}),o.jsx("div",{className:"score-column",children:"Score"}),o.jsx("div",{className:"accuracy-column",children:"Accuracy"}),o.jsx("div",{className:"login-streak-column",children:"Login Streak"}),o.jsx("div",{className:"quiz-streak-column",children:"Quiz Streak"}),o.jsx("div",{className:"details-column"})]}),l.slice(0,Math.min(3,l.length)).map((T,J)=>o.jsxs("div",{className:`leaderboard-row top-3 ${T.username===g?"current-user":""}`,children:[o.jsx("div",{className:"rank-column",children:U(J+1)}),o.jsxs("div",{className:"user-column",children:[o.jsx(X,{icon:U0,className:"user-avatar"}),o.jsx("span",{className:"username",children:T.username})]}),o.jsx("div",{className:"score-column",children:T.score}),o.jsxs("div",{className:"accuracy-column",children:[T.accuracy,"%"]}),o.jsxs("div",{className:"login-streak-column tooltip-container",children:[o.jsx(X,{icon:fr,className:"streak-icon login-streak-icon"}),o.jsxs("span",{className:"streak-value",children:[T.loginStreak," ",T.loginStreak===1?"day":"days"]}),o.jsxs("div",{className:"tooltip",children:[o.jsx("p",{className:"tooltip-title",children:"Login Streak"}),o.jsxs("p",{children:[o.jsx("span",{className:"tooltip-label",children:"Current:"}),T.loginStreak," days"]}),o.jsxs("p",{children:[o.jsx("span",{className:"tooltip-label",children:"Longest:"}),T.longestLoginStreak," days"]}),o.jsx("div",{className:"tooltip-divider"}),o.jsxs("p",{children:[o.jsx("span",{className:"tooltip-label",children:"Last Login:"})," ",Q(T.lastLogin)]})]})]}),o.jsxs("div",{className:"quiz-streak-column tooltip-container",children:[o.jsx(X,{icon:Pr,className:"streak-icon quiz-streak-icon"}),o.jsxs("span",{className:"streak-value",children:[T.quizStreak," ",T.quizStreak===1?"day":"days"]}),o.jsxs("div",{className:"tooltip",children:[o.jsx("p",{className:"tooltip-title",children:"Quiz Streak"}),o.jsxs("p",{children:[o.jsx("span",{className:"tooltip-label",children:"Current:"}),T.quizStreak," quizes completed"]}),o.jsxs("p",{children:[o.jsx("span",{className:"tooltip-label",children:"Longest:"}),T.longestQuizStreak," days"]}),o.jsx("div",{className:"tooltip-divider"}),o.jsxs("p",{children:[o.jsx("span",{className:"tooltip-label",children:"Last Quiz:"})," ",Q(T.lastQuizUpdate)]})]})]}),o.jsx("div",{className:"details-column",children:o.jsx("button",{className:"details-btn",onClick:()=>c(i===T.id?null:T.id),"aria-label":"View details",children:o.jsx(X,{icon:Ei})})}),i===T.id&&o.jsx("div",{className:"expanded-details",children:o.jsxs("div",{className:"details-grid",children:[o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Total Quiz Completions"}),o.jsx("span",{className:"detail-value",children:T.totalCompletions})]}),o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Unique Quiz Days"}),o.jsx("span",{className:"detail-value",children:T.completedChallenges})]}),o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Login Streak"}),o.jsxs("span",{className:"detail-value",children:[T.loginStreak," days"]})]}),o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Quiz Streak"}),o.jsxs("span",{className:"detail-value",children:[T.quizStreak," "]})]}),o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Longest Login Streak"}),o.jsxs("span",{className:"detail-value",children:[T.longestLoginStreak," days"]})]}),o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Longest Quiz Streak"}),o.jsxs("span",{className:"detail-value",children:[T.longestQuizStreak," "]})]}),o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Last Active"}),o.jsx("span",{className:"detail-value",children:Q(T.lastLogin)})]})]})})]},T.id)),l.length>3&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"leaderboard-divider",children:o.jsx("span",{className:"divider-text",children:"Other Rankings"})}),z.slice(Math.min(3,z.length)).map((T,J)=>{const me=(r-1)*k+J+Math.min(3,r===1?0:3);return o.jsxs("div",{className:`leaderboard-row ${T.username===g?"current-user":""}`,children:[o.jsx("div",{className:"rank-column",children:o.jsx("span",{className:"rank-number",children:me+1})}),o.jsxs("div",{className:"user-column",children:[o.jsx(X,{icon:U0,className:"user-avatar"}),o.jsx("span",{className:"username",children:T.username})]}),o.jsx("div",{className:"score-column",children:T.score}),o.jsxs("div",{className:"accuracy-column",children:[T.accuracy,"%"]}),o.jsxs("div",{className:"login-streak-column tooltip-container",children:[o.jsx(X,{icon:fr,className:"streak-icon login-streak-icon"}),o.jsxs("span",{className:"streak-value",children:[T.loginStreak," ",T.loginStreak===1?"day":"days"]}),o.jsxs("div",{className:"tooltip",children:[o.jsx("p",{className:"tooltip-title",children:"Login Streak"}),o.jsxs("p",{children:[o.jsx("span",{className:"tooltip-label",children:"Current:"}),T.loginStreak," days"]}),o.jsxs("p",{children:[o.jsx("span",{className:"tooltip-label",children:"Longest:"}),T.longestLoginStreak," days"]}),o.jsx("div",{className:"tooltip-divider"}),o.jsxs("p",{children:[o.jsx("span",{className:"tooltip-label",children:"Last Login:"})," ",Q(T.lastLogin)]})]})]}),o.jsxs("div",{className:"quiz-streak-column tooltip-container",children:[o.jsx(X,{icon:Pr,className:"streak-icon quiz-streak-icon"}),o.jsxs("span",{className:"streak-value",children:[T.quizStreak," ",T.quizStreak===1?"day":"days"]}),o.jsxs("div",{className:"tooltip",children:[o.jsx("p",{className:"tooltip-title",children:"Quiz Streak"}),o.jsxs("p",{children:[o.jsx("span",{className:"tooltip-label",children:"Current:"}),T.quizStreak]}),o.jsxs("p",{children:[o.jsx("span",{className:"tooltip-label",children:"Longest:"}),T.longestQuizStreak," days"]}),o.jsx("div",{className:"tooltip-divider"}),o.jsxs("p",{children:[o.jsx("span",{className:"tooltip-label",children:"Last Quiz:"})," ",Q(T.lastQuizUpdate)]})]})]}),o.jsx("div",{className:"details-column",children:o.jsx("button",{className:"details-btn",onClick:()=>c(i===T.id?null:T.id),"aria-label":"View details",children:o.jsx(X,{icon:Ei})})}),i===T.id&&o.jsx("div",{className:"expanded-details",children:o.jsxs("div",{className:"details-grid",children:[o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Total Quiz Completions"}),o.jsx("span",{className:"detail-value",children:T.totalCompletions})]}),o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Unique Quiz Days"}),o.jsx("span",{className:"detail-value",children:T.completedChallenges})]}),o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Login Streak"}),o.jsxs("span",{className:"detail-value",children:[T.loginStreak," days"]})]}),o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Quiz Streak"}),o.jsxs("span",{className:"detail-value",children:[T.quizStreak," "]})]}),o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Longest Login Streak"}),o.jsxs("span",{className:"detail-value",children:[T.longestLoginStreak," days"]})]}),o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Longest Quiz Streak"}),o.jsxs("span",{className:"detail-value",children:[T.longestQuizStreak," days"]})]}),o.jsxs("div",{className:"detail-item",children:[o.jsx("span",{className:"detail-label",children:"Last Active"}),o.jsx("span",{className:"detail-value",children:Q(T.lastLogin)})]})]})})]},T.id)})]})]}),l.length>k&&o.jsxs("div",{className:"pagination-controls",children:[o.jsx("button",{className:"pagination-btn",onClick:Z,disabled:r===1,children:"Previous"}),o.jsxs("div",{className:"pagination-info",children:["Page ",r," of ",I]}),o.jsx("button",{className:"pagination-btn",onClick:O,disabled:r===I,children:"Next"}),E>0&&o.jsx("button",{className:"pagination-btn find-me-btn",onClick:F,children:"Find Me"})]})]})}),o.jsxs("div",{className:"streak-info-card",children:[o.jsxs("h3",{children:[o.jsx(X,{icon:Ei})," Scoring Information"]}),o.jsx("p",{children:"The leaderboard displays two types of streaks:"}),o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("strong",{children:"Login Streak:"})," Increases each day you log in, resets after 24 hours of inactivity"]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Quiz Streak:"})," Increases each day you complete at least one quiz, resets after 24 hours of inactivity"]})]}),o.jsx("p",{children:"Your score is based on:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"Every correct question is worth 10 points"}),o.jsx("li",{children:"Your score is the sum of all points earned across all quiz completions"}),o.jsx("li",{children:"Accuracy shows your average score across all quizzes"})]})]})]}),o.jsx("style",{jsx:!0,children:`
                .leaderboard-container {
                    max-width: 1200px;
                    width: 100%;
                    margin: 0 auto;
                    padding: 2rem;
                }
                
                .leaderboard-header {
                    margin-bottom: 2rem;
                }
                
                .leaderboard-header h2 {
                    color: #ffffff;
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                }
                
                .leaderboard-content {
                    background-color: #1a1a1a;
                    border-radius: 14px;
                    padding: 1.5rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
                }
                
                .leaderboard-table {
                    width: 100%;
                }
                
                .leaderboard-table-header {
                    display: grid;
                    grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 1fr 0.5fr;
                    padding: 1rem;
                    background-color: #2c3e50;
                    border-radius: 8px;
                    font-weight: bold;
                    color: #ecf0f1;
                    margin-bottom: 1rem;
                }
                
                .leaderboard-row {
                    display: grid;
                    grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 1fr 0.5fr;
                    padding: 1rem;
                    border-radius: 8px;
                    margin-bottom: 0.5rem;
                    background-color: #242424;
                    position: relative;
                    transition: all 0.2s ease;
                }
                
                .leaderboard-row:hover {
                    background-color: #2c3e50;
                }
                
                .leaderboard-row.top-3 {
                    background-color: #2c3e50;
                    margin-bottom: 0.75rem;
                }
                
                .leaderboard-row.top-3:nth-child(2) {
                    background-color: #22303e;
                }
                
                .leaderboard-row.top-3:nth-child(3) {
                    background-color: #1e2b38;
                }
                
                .leaderboard-row.top-3:nth-child(4) {
                    background-color: #1a2634;
                }
                
                .leaderboard-row.current-user {
                    background-color: rgba(52, 152, 219, 0.2);
                    border: 1px solid #3498db;
                }
                
                .rank-column, .user-column, .score-column, .accuracy-column, .login-streak-column, .quiz-streak-column, .details-column {
                    display: flex;
                    align-items: center;
                }
                
                .rank-icon {
                    font-size: 1.5rem;
                }
                
                .rank-icon.gold {
                    color: #f1c40f;
                }
                
                .rank-icon.silver {
                    color: #bdc3c7;
                }
                
                .rank-icon.bronze {
                    color: #d35400;
                }
                
                .rank-number {
                    font-weight: bold;
                    color: #ecf0f1;
                }
                
                .user-avatar {
                    font-size: 1.5rem;
                    margin-right: 0.75rem;
                    color: #3498db;
                }
                
                .username {
                    font-weight: 500;
                    color: #ecf0f1;
                }
                
                .score-column, .accuracy-column {
                    color: #ecf0f1;
                    font-weight: 500;
                }
                
                .login-streak-column, .quiz-streak-column {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #ecf0f1;
                    font-weight: 500;
                    position: relative;
                }
                
                .login-streak-icon {
                    color: #3498db;
                }
                
                .quiz-streak-icon {
                    color: #e74c3c;
                }
                
                .details-btn {
                    background: none;
                    border: none;
                    color: #3498db;
                    cursor: pointer;
                    font-size: 1rem;
                    padding: 0.25rem;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                }
                
                .details-btn:hover {
                    background-color: rgba(52, 152, 219, 0.2);
                }
                
                /* Tooltip styling */
                .tooltip-container {
                    position: relative;
                }
                
                .tooltip {
                    display: none;
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #2c3e50;
                    color: #ecf0f1;
                    padding: 1rem;
                    border-radius: 6px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                    width: 220px;
                    z-index: 1000;
                    font-size: 0.9rem;
                }
                
                .tooltip:after {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    border-width: 8px;
                    border-style: solid;
                    border-color: #2c3e50 transparent transparent transparent;
                }
                
                .tooltip-container:hover .tooltip {
                    display: block;
                }
                
                .tooltip-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    border-bottom: 1px solid #3498db;
                    padding-bottom: 0.25rem;
                }
                
                .tooltip-label {
                    font-weight: 500;
                    color: #3498db;
                    margin-right: 0.25rem;
                }
                
                .tooltip-divider {
                    height: 1px;
                    background-color: #34495e;
                    margin: 0.5rem 0;
                }
                
                .tooltip p {
                    margin: 0.25rem 0;
                }
                
                /* Expanded details styling */
                .expanded-details {
                    grid-column: 1 / -1;
                    margin-top: 1rem;
                    background-color: #2c3e50;
                    border-radius: 8px;
                    padding: 1rem;
                    animation: expandDetails 0.3s ease;
                }
                
                .details-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                }
                
                .detail-item {
                    display: flex;
                    flex-direction: column;
                }
                
                .detail-label {
                    font-size: 0.75rem;
                    color: #95a5a6;
                    margin-bottom: 0.25rem;
                }
                
                .detail-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: #ecf0f1;
                }
                
                /* Pagination styling */
                .pagination-controls {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 1.5rem;
                    gap: 1rem;
                }
                
                .pagination-btn {
                    background-color: #2c3e50;
                    color: #ecf0f1;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .pagination-btn:hover:not(:disabled) {
                    background-color: #34495e;
                }
                
                .pagination-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .find-me-btn {
                    background-color: #3498db;
                }
                
                .find-me-btn:hover {
                    background-color: #2980b9;
                }
                
                .pagination-info {
                    color: #ecf0f1;
                }
                
                /* Leaderboard divider */
                .leaderboard-divider {
                    display: flex;
                    align-items: center;
                    margin: 1.5rem 0;
                    color: #95a5a6;
                }
                
                .leaderboard-divider:before,
                .leaderboard-divider:after {
                    content: "";
                    flex: 1;
                    border-bottom: 1px solid #34495e;
                }
                
                .divider-text {
                    margin: 0 1rem;
                    font-size: 0.875rem;
                }
                
                /* No data message */
                .no-data-message {
                    padding: 2rem;
                    text-align: center;
                    color: #95a5a6;
                }
                
                /* Loading spinner */
                .loading-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 300px;
                    color: #ecf0f1;
                }
                
                .loading-spinner {
                    font-size: 2rem;
                    color: #3498db;
                    margin-bottom: 1rem;
                }
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                
                @keyframes expandDetails {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* Error container */
                .error-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    background-color: #1a1a1a;
                    border-radius: 8px;
                    color: #ecf0f1;
                }
                
                .error-icon {
                    color: #e74c3c;
                    font-size: 2rem;
                    margin-bottom: 1rem;
                }
                
                .retry-btn {
                    margin-top: 1rem;
                    background-color: #3498db;
                    color: white;
                    border: none;
                    padding: 0.5rem 1.5rem;
                    border-radius: 4px;
                    cursor: pointer;
                }
                
                .retry-btn:hover {
                    background-color: #2980b9;
                }
                
                /* Streak Info Card */
                .streak-info-card {
                    background-color: #1a1a1a;
                    border-radius: 14px;
                    padding: 1.25rem;
                    margin-top: 1.5rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
                    border-left: 3px solid #3498db;
                }
                
                .streak-info-card h3 {
                    color: #3498db;
                    font-size: 1rem;
                    margin-bottom: 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .streak-info-card p {
                    margin: 0.5rem 0;
                    color: #ecf0f1;
                    font-size: 0.9rem;
                }
                
                .streak-info-card ul {
                    margin: 0.5rem 0;
                    padding-left: 1.5rem;
                }
                
                .streak-info-card li {
                    margin: 0.25rem 0;
                    color: #ecf0f1;
                    font-size: 0.9rem;
                }
                
                /* Responsive design */
                @media (max-width: 992px) {
                    .leaderboard-table-header, 
                    .leaderboard-row {
                        grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 0.5fr;
                    }
                    
                    .accuracy-column {
                        display: none;
                    }
                    
                    .details-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                
                @media (max-width: 768px) {
                    .leaderboard-container {
                        padding: 1rem;
                    }
                    
                    .leaderboard-table-header, 
                    .leaderboard-row {
                        grid-template-columns: 0.5fr 2fr 1fr 1fr 0.5fr;
                        padding: 0.75rem;
                        font-size: 0.9rem;
                    }
                    
                    .quiz-streak-column {
                        display: none;
                    }
                    
                    .details-grid {
                        grid-template-columns: 1fr;
                    }
                }
                
                @media (max-width: 576px) {
                    .leaderboard-table-header, 
                    .leaderboard-row {
                        grid-template-columns: 0.5fr 2fr 1fr 0.5fr;
                        font-size: 0.85rem;
                    }
                    
                    .login-streak-column {
                        display: none;
                    }
                    
                    .pagination-controls {
                        flex-wrap: wrap;
                    }
                    
                    .find-me-btn {
                        margin-top: 0.5rem;
                        width: 100%;
                    }
                }
            `})]})},yw=()=>{const[r,a]=R.useState([]),[i,c]=R.useState(!0),[l,u]=R.useState(null),d=sessionStorage.getItem("username")||"User",p=sessionStorage.getItem("userId")||"1";R.useEffect(()=>{(async()=>{c(!0);try{console.log("Fetching achievements for user:",p);const x=await fetch(mn.GET_USER_ACHIEVEMENTS.replace(":userId",p));if(!x.ok)throw new Error("Failed to load achievements");const g=await x.json();if(console.log("Achievements data:",g),g.success&&g.achievements)a(g.achievements);else throw new Error("Invalid achievement data format")}catch(x){console.error("Error fetching achievements:",x),u(x.message),we.error("Failed to load achievements")}finally{c(!1)}})()},[p]);const m=y=>{if(y.icon)switch(y.icon.toLowerCase()){case"star":return Ca;case"shield":return du;case"calendar-check":return fr;case"trophy":return jt;case"medal":return Ti;case"award":return cu;case"certificate":return Vg;case"graduation-cap":return fu;case"check":return Oi;default:return Ca}return y.title.includes("Star")||y.title.includes("Learner")?Ca:y.title.includes("Champion")||y.title.includes("Security")?du:y.title.includes("Streak")||y.title.includes("Login")?fr:y.title.includes("Master")?jt:Ti};if(i)return o.jsx("div",{className:"content-wrapper",children:o.jsxs("div",{className:"loading-container",children:[o.jsx(X,{icon:Ia,spin:!0,className:"loading-spinner"}),o.jsx("p",{children:"Loading achievements..."})]})});if(l)return o.jsx("div",{className:"content-wrapper",children:o.jsxs("div",{className:"error-container",children:[o.jsx(X,{icon:Bi,className:"error-icon"}),o.jsx("h3",{children:"Error"}),o.jsx("p",{children:l}),o.jsx("button",{onClick:()=>window.location.reload(),className:"retry-btn",children:"Try Again"})]})});const v=[...r].sort((y,x)=>y.unlocked&&!x.unlocked?-1:!y.unlocked&&x.unlocked?1:!y.unlocked&&!x.unlocked?x.progress-y.progress:y.title.localeCompare(x.title));return o.jsxs("div",{className:"content-wrapper",children:[o.jsxs("div",{className:"achievements-container",children:[o.jsxs("div",{className:"achievements-header",children:[o.jsxs("h2",{children:["Let's see what achievements you've received, ",d]}),o.jsx("h3",{children:"As you complete quizzes, you will be able to view your achievements here."})]}),o.jsx("div",{className:"achievements-grid",children:v.length>0?v.map(y=>o.jsxs("div",{className:"achievement-card",children:[o.jsx("div",{className:`achievement-icon ${!y.unlocked&&"locked"}`,style:{backgroundColor:y.unlocked?y.color||"#646cff":"#ccc"},children:o.jsx(X,{icon:m(y)})}),o.jsxs("div",{className:"achievement-details",children:[o.jsx("h3",{children:y.title}),o.jsx("p",{children:y.description}),y.unlocked?o.jsxs("div",{className:"achievement-unlocked",children:[o.jsx(X,{icon:Oi,className:"check-icon"})," Unlocked!"]}):o.jsxs("div",{className:"achievement-progress",children:[o.jsx("div",{className:"progress-bar",children:o.jsx("div",{className:"progress-fill",style:{width:`${y.progress}%`}})}),o.jsxs("span",{className:"progress-text",children:[Math.round(y.progress),"%"]})]})]})]},y.id)):o.jsxs("div",{className:"no-achievements",children:[o.jsx(X,{icon:jt,className:"no-achievements-icon"}),o.jsx("p",{children:"No achievements yet. Complete quizzes to earn achievements!"})]})})]}),o.jsx("style",{jsx:!0,children:`
        .achievements-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .achievements-header {
          margin-bottom: 2rem;
        }
        
        .achievements-header h2 {
          color: #ffffff;
          font-size: 1.5rem;
        }
        
        .achievements-header h3 {
          color: #e0e0e0;
          font-size: 1rem;
          font-weight: normal;
          margin-top: 0.5rem;
        }
        
        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .achievement-card {
          background-color: #1a1a1a;
          border-radius: 14px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: transform 0.2s ease;
        }
        
        .achievement-card:hover {
          transform: translateY(-5px);
        }
        
        .achievement-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 1.5rem;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }
        
        .achievement-icon.locked {
          opacity: 0.7;
          filter: grayscale(0.8);
        }
        
        .achievement-details {
          flex: 1;
        }
        
        .achievement-details h3 {
          color: #ffffff;
          margin: 0 0 0.5rem 0;
          font-size: 1.2rem;
        }
        
        .achievement-details p {
          color: #e0e0e0;
          margin: 0 0 1rem 0;
          font-size: 0.9rem;
        }
        
        .achievement-unlocked {
          color: #4caf50;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .check-icon {
          font-size: 0.9rem;
        }
        
        .achievement-progress {
          margin-top: 0.5rem;
        }
        
        .progress-bar {
          width: 100%;
          height: 10px;
          background-color: #333;
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 5px;
        }
        
        .progress-fill {
          height: 100%;
          background-color: #646cff;
          border-radius: 5px;
          transition: width 0.3s ease;
        }
        
        .progress-text {
          font-size: 0.8rem;
          color: #bdc3c7;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 300px;
          color: #ecf0f1;
        }
        
        .loading-spinner {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #3498db;
        }
        
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: #1a1a1a;
          border-radius: 8px;
          color: #ecf0f1;
        }
        
        .error-icon {
          color: #e74c3c;
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .retry-btn {
          margin-top: 1rem;
          background-color: #3498db;
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .retry-btn:hover {
          background-color: #2980b9;
        }
        
        .no-achievements {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          background-color: #1a1a1a;
          border-radius: 14px;
          text-align: center;
        }
        
        .no-achievements-icon {
          font-size: 3rem;
          color: #95a5a6;
          margin-bottom: 1rem;
        }
        
        .no-achievements p {
          color: #e0e0e0;
          font-size: 1.1rem;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .achievements-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .achievements-container {
            padding: 1rem;
          }
          
          .achievement-card {
            padding: 1rem;
          }
        }
      `})]})},xw=()=>{const r=Mr();sessionStorage.getItem("username");const[a,i]=R.useState(null),c=l=>{i(l),setTimeout(()=>{r("/quiz/questions",{state:{difficulty:l}})},500)};return o.jsxs("div",{className:"quiz-page-container",children:[o.jsxs("div",{className:"quiz-content",children:[o.jsx("div",{className:"quiz-header",children:o.jsxs("div",{className:"intro-section",children:[o.jsx(X,{icon:v5,className:"intro-icon"}),o.jsx("p",{className:"intro-text",children:"Test your skills on social-engineering threats by taking one of these quizzes"})]})}),o.jsxs("div",{className:"quiz-options",children:[o.jsxs("div",{className:`quiz-option ${a==="Beginner"?"selected":""}`,onClick:()=>c("Beginner"),children:[o.jsxs("div",{className:"quiz-option-content",children:[o.jsxs("div",{className:"quiz-option-title",children:[o.jsx("div",{className:"quiz-icon-wrapper beginner",children:o.jsx(X,{icon:I5,className:"quiz-icon"})}),o.jsx("h3",{children:"Beginner"})]}),o.jsx("p",{className:"quiz-description",children:"This quiz will cover phishing concepts and fundamentals to protect yourself against the biggest threat to our online safety!"})]}),o.jsx("div",{className:"quiz-arrow",children:o.jsx(X,{icon:ru})})]}),o.jsxs("div",{className:`quiz-option ${a==="Intermediate"?"selected":""}`,onClick:()=>c("Intermediate"),children:[o.jsxs("div",{className:"quiz-option-content",children:[o.jsxs("div",{className:"quiz-option-title",children:[o.jsx("div",{className:"quiz-icon-wrapper intermediate",children:o.jsx(X,{icon:fu,className:"quiz-icon"})}),o.jsx("h3",{children:"Intermediate"})]}),o.jsx("p",{className:"quiz-description",children:"This quiz will cover more advanced techniques used by Social Engineers. You will also be shown real-world exemplar scenarios where these attacks may come into place."})]}),o.jsx("div",{className:"quiz-arrow",children:o.jsx(X,{icon:ru})})]}),o.jsxs("div",{className:`quiz-option ${a==="Advanced"?"selected":""}`,onClick:()=>c("Advanced"),children:[o.jsxs("div",{className:"quiz-option-content",children:[o.jsxs("div",{className:"quiz-option-title",children:[o.jsx("div",{className:"quiz-icon-wrapper advanced",children:o.jsx(X,{icon:E5,className:"quiz-icon"})}),o.jsx("h3",{children:"Advanced"})]}),o.jsx("p",{className:"quiz-description",children:"In our Advanced quiz, it will combine what Beginner/Intermediate levels included, but with added Corporate examples and even more complex threats."})]}),o.jsx("div",{className:"quiz-arrow",children:o.jsx(X,{icon:ru})})]})]})]}),o.jsxs("div",{className:"bottom-section",children:[o.jsx("p",{className:"not-ready-text",children:"Not ready for a quiz? Try these instead:"}),o.jsxs("div",{className:"alternative-buttons",children:[o.jsxs("button",{className:"alt-button dashboard",onClick:()=>r("/dashboard"),children:[o.jsx(X,{icon:Kg}),"Return to Dashboard"]}),o.jsxs("button",{className:"alt-button achievements",onClick:()=>r("/achievements"),children:[o.jsx(X,{icon:jt}),"View Your Achievements"]}),o.jsxs("button",{className:"alt-button statistics",onClick:()=>r("/statistics"),children:[o.jsx(X,{icon:uu}),"Check Your Statistics"]})]})]}),o.jsx("style",{jsx:!0,children:`
        /* Page container with vertically centered content */
        .quiz-page-container {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          overflow-x: hidden;
          max-width: 100vw;
          box-sizing: border-box;
          padding: 0;
          position: relative;
        }
        
        /* Main content area with vertical centering */
        .quiz-content {
          width: 100%;
          max-width: 700px;
          margin: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 20px;
          box-sizing: border-box;
          /* This flex-grow and margin combination ensures vertical centering */
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        /* Header section with white text */
        .quiz-header {
          margin-bottom: 30px;
          text-align: center;
          width: 100%;
        }
        
        /* Intro section styling */
        .intro-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .intro-icon {
          font-size: 2rem;
          color: #ffffff;
          margin-bottom: 10px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }
        
        .intro-text {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 500;
          margin: 0 0 5px 0;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          line-height: 1.4;
        }
        
        .quiz-header h2 {
          color: #ffffff;
          font-size: 1.6rem;
          font-weight: 600;
          margin-top: 5px;
          margin-bottom: 10px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        /* Quiz options container with spacing */
        .quiz-options {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        /* Individual quiz option card */
        .quiz-option {
          background-color: rgba(26, 26, 26, 0.95);
          border-radius: 16px;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          width: 100%;
          box-sizing: border-box;
        }
        
        .quiz-option:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
        }
        
        .quiz-option.selected {
          border-color: #646cff;
          background-color: rgba(26, 26, 26, 0.97);
          box-shadow: 0 6px 12px rgba(100, 108, 255, 0.4);
        }
        
        .quiz-option-content {
          flex: 1;
          min-width: 0; /* Prevents flex items from overflowing */
        }
        
        /* Quiz option title with icon */
        .quiz-option-title {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .quiz-option-title h3 {
          font-size: 1.2rem;
          margin: 0;
          color: #ffffff;
          font-weight: 600;
        }
        
        /* Icon wrapper with circular background */
        .quiz-icon-wrapper {
          min-width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          flex-shrink: 0;
        }
        
        .quiz-icon-wrapper.beginner {
          background-color: rgba(52, 152, 219, 0.2);
          color: #3498db;
        }
        
        .quiz-icon-wrapper.intermediate {
          background-color: rgba(46, 204, 113, 0.2);
          color: #2ecc71;
        }
        
        .quiz-icon-wrapper.advanced {
          background-color: rgba(231, 76, 60, 0.2);
          color: #e74c3c;
        }
        
        .quiz-icon {
          font-size: 1.2rem;
        }
        
        /* Quiz description with text wrapping */
        .quiz-description {
          color: #e0e0e0;
          font-size: 0.9rem;
          line-height: 1.4;
          margin: 0;
          overflow-wrap: break-word;
          word-wrap: break-word;
          hyphens: auto;
        }
        
        /* Arrow indicator */
        .quiz-arrow {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #646cff;
          font-size: 1.1rem;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        
        .quiz-option:hover .quiz-arrow {
          transform: translateX(5px);
        }
        
        /* Bottom section with alternative options - fixed at bottom */
        .bottom-section {
          width: 100%;
          text-align: center;
          padding: 20px;
          box-sizing: border-box;
          margin-top: auto;
        }
        
        /* More visible "Not ready" text */
        .not-ready-text {
          color: #ffffff;
          margin-bottom: 15px;
          font-size: 1.1rem;
          font-weight: 500;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        .alternative-buttons {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        
        /* Stylish alternative buttons */
        .alt-button {
          background-color: rgba(44, 62, 80, 0.8);
          color: #ecf0f1;
          border: none;
          padding: 12px 16px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          min-width: 0;
          flex-shrink: 1;
        }
        
        .alt-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .alt-button.dashboard:hover {
          background-color: #34495e;
        }
        
        .alt-button.achievements:hover {
          background-color: #f39c12;
        }
        
        .alt-button.statistics:hover {
          background-color: #3498db;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .quiz-option {
            padding: 12px 15px;
          }
          
          .alternative-buttons {
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }
          
          .alt-button {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }
          
          .quiz-header h2 {
            font-size: 1.4rem;
          }
          
          .intro-text {
            font-size: 1.1rem;
          }
        }
        
        @media (max-width: 480px) {
          .quiz-content {
            padding: 0 15px;
          }
          
          .quiz-header h2 {
            font-size: 1.2rem;
          }
          
          .intro-text {
            font-size: 1rem;
          }
          
          .intro-icon {
            font-size: 1.8rem;
          }
          
          .quiz-option-title h3 {
            font-size: 1.1rem;
          }
          
          .quiz-icon-wrapper {
            width: 30px;
            height: 30px;
            margin-right: 8px;
          }
          
          .quiz-description {
            font-size: 0.85rem;
          }
          
          .bottom-section {
            padding: 15px 10px;
          }
          
          .not-ready-text {
            font-size: 1rem;
            margin-bottom: 10px;
          }
          
          .alt-button {
            padding: 10px 12px;
            font-size: 0.9rem;
          }
        }
      `})]})},Sw=()=>{var O;const r=Et(),a=Mr(),[i,c]=R.useState(0),[l,u]=R.useState([]),[d,p]=R.useState(null),[m,v]=R.useState(ki.QUESTION_TIME),[y,x]=R.useState(null),g=((O=r.state)==null?void 0:O.difficulty)||"Beginner",E=ki.QUIZ_IDS[g]||1,b=ki.MOCK_QUIZ_DATA[g]||[];R.useEffect(()=>{if(m>0&&!y){const Z=setTimeout(()=>{v(F=>F-1)},1e3);return()=>clearTimeout(Z)}else m===0&&!y&&N()},[m,y]),R.useEffect(()=>{v(ki.QUESTION_TIME),p(null),x(null)},[i]);const w=Z=>{y||p(Z)},N=()=>{if(y)return;const Z=b[i];if(d===null){const Q=[...l];Q[i]={question:Z.question,selectedOption:"No answer selected",correctOption:Z.options[Z.correctAnswer],isCorrect:!1},u(Q),x("incorrect"),we.error("Time's up! Moving to next question...");return}const F=d===Z.correctAnswer,U=[...l];U[i]={question:Z.question,selectedOption:Z.options[d],correctOption:Z.options[Z.correctAnswer],isCorrect:F},u(U),x(F?"correct":"incorrect"),F?we.success("Correct answer!"):we.error("Incorrect answer!")},_=()=>{i<b.length-1?c(i+1):k()},k=()=>{const Z=l.filter(F=>F.isCorrect).length;a("/quiz/results",{state:{score:Z,totalQuestions:b.length,userAnswers:l,difficulty:g,quizId:E}})},I=()=>{window.confirm("Are you sure you want to exit the quiz? Your progress will be lost.")&&a("/quiz/difficulty")},z=b[i];return z?o.jsxs("div",{className:"quiz-container",children:[o.jsxs("div",{className:"quiz-header",children:[o.jsxs("h1",{children:[g," Quiz"]}),o.jsx("div",{className:"timer-container",children:o.jsxs("span",{className:`timer ${m<10?"timer-low":""}`,children:["Time: ",m,"s"]})})]}),o.jsxs("div",{className:"progress-container",children:[o.jsx("div",{className:"progress-bar-background",children:o.jsx("div",{className:"progress-bar-fill",style:{width:`${(i+1)/b.length*100}%`}})}),o.jsxs("div",{className:"progress-text",children:["Question ",i+1," of ",b.length]})]}),o.jsxs("div",{className:"question-card",children:[o.jsx("h2",{className:"question-text",children:z.question}),o.jsx("div",{className:"options-container",children:z.options.map((Z,F)=>o.jsx("div",{className:`option ${d===F?"selected":""} 
                ${y&&F===z.correctAnswer?"correct":""}
                ${y==="incorrect"&&d===F?"incorrect":""}`,onClick:()=>w(F),children:Z},F))}),y&&o.jsx("div",{className:"explanation-box",children:o.jsx("p",{children:z.explanation})})]}),o.jsxs("div",{className:"quiz-actions",children:[o.jsx("button",{className:"exit-btn",onClick:I,children:"Exit Quiz"}),y?o.jsx("button",{className:"next-btn",onClick:_,children:i<b.length-1?"Next Question":"Finish Quiz"}):o.jsx("button",{className:"next-btn",onClick:N,disabled:d===null,children:"Submit Answer"})]}),o.jsx("style",{jsx:!0,children:`
        .quiz-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: #1a1a1a;
          border-radius: 16px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        
        .quiz-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .quiz-header h1 {
          color: #ffffff;
          font-size: 1.8rem;
          margin: 0;
        }
        
        .timer-container {
          background-color: #2c3e50;
          padding: 0.5rem 1rem;
          border-radius: 8px;
        }
        
        .timer {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: bold;
        }
        
        .timer-low {
          color: #e74c3c;
        }
        
        .progress-container {
          margin-bottom: 1.5rem;
        }
        
        .progress-bar-background {
          width: 100%;
          height: 8px;
          background-color: #34495e;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        
        .progress-bar-fill {
          height: 100%;
          background-color: #2ecc71;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        
        .progress-text {
          text-align: right;
          color: #bdc3c7;
          font-size: 0.9rem;
        }
        
        .question-card {
          background-color: #242424;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .question-text {
          color: #ffffff;
          font-size: 1.4rem;
          margin-top: 0;
          margin-bottom: 1.5rem;
        }
        
        .options-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .option {
          padding: 1rem;
          background-color: #2c3e50;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid transparent;
          color: #ffffff;
        }
        
        .option:hover {
          background-color: #34495e;
        }
        
        .option.selected {
          border-color: #3498db;
          background-color: rgba(52, 152, 219, 0.2);
        }
        
        .option.correct {
          border-color: #2ecc71;
          background-color: rgba(46, 204, 113, 0.2);
        }
        
        .option.incorrect {
          border-color: #e74c3c;
          background-color: rgba(231, 76, 60, 0.2);
        }
        
        .explanation-box {
          margin-top: 1.5rem;
          padding: 1rem;
          background-color: #34495e;
          border-radius: 8px;
          border-left: 4px solid #3498db;
        }
        
        .explanation-box p {
          color: #ecf0f1;
          margin: 0;
          line-height: 1.5;
        }
        
        .quiz-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .exit-btn {
          background-color: #7f8c8d;
          color: white;
          border: none;
          padding: 0.6rem 1rem;
          border-radius: 6px;
          cursor: pointer;
        }
        
        .exit-btn:hover {
          background-color: #95a5a6;
        }
        
        .next-btn {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
        }
        
        .next-btn:hover {
          background-color: #2980b9;
        }
        
        .next-btn:disabled {
          background-color: #95a5a6;
          cursor: not-allowed;
        }
      `})]}):o.jsx("div",{children:"Loading questions..."})},ww=()=>{const r=Et(),a=Mr(),[i,c]=R.useState([]),[l,u]=R.useState(!1),[d,p]=R.useState([]),[m,v]=R.useState(null),[y,x]=R.useState(!1),[g,E]=R.useState(!1),[b,w]=R.useState(!1),N=R.useRef(!1),{score:_,totalQuestions:k,userAnswers:I,difficulty:z,quizId:O}=r.state||{score:0,totalQuestions:0,userAnswers:[],difficulty:"Beginner",quizId:1},Z=sessionStorage.getItem("userId")||"1";sessionStorage.getItem("username");const F=k>0?Math.round(_/k*100):0,U=F>=ki.PASS_THRESHOLD;R.useEffect(()=>{(async()=>{if(N.current){console.log("Submission already attempted, skipping duplicate attempt");return}if(N.current=!0,!y)try{x(!0);const ue=`${Z}-${O}-${Date.now()}-${Math.random().toString(36).substring(2,10)}`,G={userId:Z,quizId:O,score:F,totalQuestions:k,correctAnswers:_,completionDetails:I.map((q,K)=>({questionIndex:K,question:q.question,userAnswer:q.selectedOption,correctAnswer:q.correctOption,isCorrect:q.isCorrect})),submissionId:ue};console.log(`Submitting quiz completion with ID: ${ue}`);const oe=await fetch(mn.COMPLETE_QUIZ,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(G)}),W=await oe.json();if(!oe.ok)throw new Error(W.error||"Failed to submit quiz score");console.log("Quiz score submitted successfully:",W),we.success("Your quiz results have been recorded!",{position:"top-center",autoClose:3e3}),E(!0)}catch(ue){console.error("Error submitting quiz score:",ue),we.error("Unable to save quiz results, but you can still view your performance.",{position:"top-center",autoClose:4e3}),E(!0)}finally{x(!1)}})()},[]),R.useEffect(()=>{(async()=>{if(g)try{u(!0);const ue=await fetch(mn.GET_USER_ACHIEVEMENTS.replace(":userId",Z));if(!ue.ok)throw new Error("Failed to fetch achievements");const G=await ue.json();G.success&&G.achievements&&c(G.achievements)}catch(ue){console.error("Error fetching achievements:",ue)}finally{u(!1)}})()},[Z,g]);const Q=()=>F>=90?"Excellent! You're a security expert!":F>=80?"Great job! You have strong security awareness.":F>=70?"Good work! You've passed the quiz.":F>=60?"Not bad, but there's room for improvement.":"You need more practice to improve your security awareness.",T=()=>a("/dashboard"),J=()=>a("/quiz/difficulty"),me=()=>a(-1);return o.jsxs("div",{className:"results-container",children:[o.jsxs("div",{className:"results-header",children:[o.jsxs("h2",{children:[z," Quiz Results"]}),o.jsxs("div",{className:"score-summary",children:[o.jsx("div",{className:"score-circle",style:{background:`conic-gradient(
              ${U?"#2ecc71":"#e74c3c"} ${F*3.6}deg,
              #2c3e50 0deg
            )`},children:o.jsx("div",{className:"score-circle-inner",children:o.jsxs("span",{className:"score-percentage",children:[F,"%"]})})}),o.jsxs("div",{className:"score-details",children:[o.jsxs("p",{className:"score-text",children:["You scored ",o.jsx("span",{className:"score-value",children:_})," out of ",o.jsx("span",{className:"total-value",children:k})]}),o.jsx("p",{className:`status-text ${U?"passed":"failed"}`,children:U?"PASSED":"FAILED"}),o.jsx("p",{className:"performance-message",children:Q()}),o.jsx("p",{className:"submission-status",children:y?o.jsxs("span",{className:"submitting",children:[o.jsx(X,{icon:Ia,spin:!0,className:"spinner-icon"})," Recording results..."]}):g?o.jsxs("span",{className:"submitted",children:[o.jsx(X,{icon:Oi,className:"check-icon"})," Results saved"]}):o.jsxs("span",{className:"not-submitted",children:[o.jsx(X,{icon:Bi,className:"warning-icon"})," Unable to save results"]})})]})]})]}),l&&o.jsxs("div",{className:"loading-section",children:[o.jsx(X,{icon:Ia,spin:!0}),o.jsx("span",{children:"Loading achievements..."})]}),U&&o.jsx("div",{className:"streak-update-section",children:o.jsxs("div",{className:"streak-badge",children:[o.jsx(X,{icon:Xd,className:"streak-icon"}),o.jsx("span",{children:"Quiz streak increased!"})]})}),o.jsxs("div",{className:"results-content",children:[o.jsx("h3",{className:"section-title",children:"Question Review"}),o.jsx("div",{className:"questions-review",children:I.map((ce,ue)=>o.jsxs("div",{className:`question-item ${ce.isCorrect?"correct":"incorrect"}`,children:[o.jsxs("div",{className:"question-header",children:[o.jsxs("span",{className:"question-number",children:["Question ",ue+1]}),o.jsx("span",{className:`question-result ${ce.isCorrect?"correct":"incorrect"}`,children:ce.isCorrect?o.jsxs(o.Fragment,{children:[o.jsx(X,{icon:Oi})," Correct"]}):o.jsxs(o.Fragment,{children:[o.jsx(X,{icon:A5})," Incorrect"]})})]}),o.jsxs("div",{className:"question-content",children:[o.jsx("p",{className:"question-text",children:ce.question}),o.jsxs("div",{className:"answers",children:[o.jsxs("div",{className:"answer",children:[o.jsx("span",{className:"answer-label",children:"Your answer:"}),o.jsx("span",{className:`answer-text ${ce.isCorrect?"correct":"incorrect"}`,children:ce.selectedOption})]}),!ce.isCorrect&&o.jsxs("div",{className:"answer",children:[o.jsx("span",{className:"answer-label",children:"Correct answer:"}),o.jsx("span",{className:"answer-text correct",children:ce.correctOption})]})]})]})]},ue))})]}),o.jsxs("div",{className:"results-actions",children:[o.jsxs("button",{className:"action-btn back-btn",onClick:me,children:[o.jsx(X,{icon:Kg})," Back"]}),o.jsxs("button",{className:"action-btn retry-btn",onClick:J,children:[o.jsx(X,{icon:S5})," Try Another Quiz"]}),o.jsxs("button",{className:"action-btn home-btn",onClick:T,children:[o.jsx(X,{icon:_5})," Dashboard"]})]}),o.jsx("style",{jsx:!0,children:`
        .results-container {
          max-width: 800px;
          margin: 2rem auto;
          background-color: #1a1a1a;
          border-radius: 14px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }
        
        .score-summary {
          display: flex;
          align-items: center;
          margin-top: 2rem;
          gap: 2rem;
        }
        
        .score-circle {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .score-circle-inner {
          width: 120px;
          height: 120px;
          background: #1a1a1a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .score-percentage {
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: bold;
        }
        
        .score-details {
          flex: 1;
        }
        
        .score-text {
          font-size: 1.2rem;
          color: #e0e0e0;
          margin-bottom: 0.5rem;
        }
        
        .score-value, .total-value {
          font-weight: bold;
          color: #3498db;
        }
        
        .status-text {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        .status-text.passed {
          color: #2ecc71;
        }
        
        .status-text.failed {
          color: #e74c3c;
        }
        
        .performance-message {
          color: #e0e0e0;
          font-style: italic;
          margin-bottom: 0.5rem;
        }
        
        .submission-status {
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }
        
        .submitting {
          color: #f39c12;
        }
        
        .submitted {
          color: #2ecc71;
        }
        
        .not-submitted {
          color: #e74c3c;
        }
        
        .spinner-icon, .check-icon, .warning-icon, .info-icon {
          margin-right: 5px;
        }
        
        .loading-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          color: #3498db;
          font-style: italic;
        }
        
        .streak-update-section {
          background-color: rgba(231, 76, 60, 0.1);
          border-radius: 8px;
          padding: 0.75rem;
          margin: 1rem 0;
          display: flex;
          justify-content: center;
        }
        
        .streak-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #e74c3c;
          font-weight: bold;
        }
        
        .results-content {
          margin-top: 2rem;
        }
        
        .section-title {
          color: #ffffff;
          font-size: 1.3rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid #2c3e50;
          padding-bottom: 0.5rem;
        }
        
        .questions-review {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .question-item {
          background-color: #2c3e50;
          border-radius: 8px;
          padding: 1rem;
          border-left: 4px solid;
        }
        
        .question-item.correct {
          border-left-color: #2ecc71;
        }
        
        .question-item.incorrect {
          border-left-color: #e74c3c;
        }
        
        .question-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #34495e;
        }
        
        .question-number {
          font-weight: bold;
          color: #bdc3c7;
        }
        
        .question-result {
          font-weight: bold;
        }
        
        .question-result.correct {
          color: #2ecc71;
        }
        
        .question-result.incorrect {
          color: #e74c3c;
        }
        
        .question-content {
          color: #ecf0f1;
        }
        
        .question-text {
          margin-bottom: 1rem;
        }
        
        .answers {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .answer {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .answer-label {
          font-size: 0.9rem;
          color: #bdc3c7;
        }
        
        .answer-text {
          background-color: #34495e;
          padding: 0.5rem;
          border-radius: 4px;
        }
        
        .answer-text.correct {
          background-color: rgba(46, 204, 113, 0.2);
          border: 1px solid #2ecc71;
        }
        
        .answer-text.incorrect {
          background-color: rgba(231, 76, 60, 0.2);
          border: 1px solid #e74c3c;
        }
        
        .results-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
        }
        
        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.2s ease;
        }
        
        .back-btn {
          background-color: #7f8c8d;
          color: white;
        }
        
        .back-btn:hover {
          background-color: #95a5a6;
        }
        
        .retry-btn {
          background-color: #e67e22;
          color: white;
        }
        
        .retry-btn:hover {
          background-color: #d35400;
        }
        
        .home-btn {
          background-color: #3498db;
          color: white;
        }
        
        .home-btn:hover {
          background-color: #2980b9;
        }
        
        @media (max-width: 768px) {
          .score-summary {
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }
          
          .results-actions {
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          
          .action-btn {
            flex: 1;
            justify-content: center;
            min-width: 100px;
          }
        }
      `})]})},Nw=()=>{const a=Et().pathname.includes("/results");return o.jsxs("div",{className:`quiz-route-container ${a?"results-mode":""}`,children:[o.jsxs(J1,{children:[o.jsx(gt,{path:"/",element:o.jsx(Cr,{to:"difficulty",replace:!0})}),o.jsx(gt,{path:"difficulty",element:o.jsx(xw,{})}),o.jsx(gt,{path:"questions",element:o.jsx(Sw,{})}),o.jsx(gt,{path:"results",element:o.jsx(ww,{})})]}),o.jsx("style",{jsx:!0,children:`
        .quiz-route-container {
          width: 100%;
          min-height: 100vh;
        }
        
        /* In results mode, ensure content is visible and properly positioned */
        .quiz-route-container.results-mode {
          position: relative;
          z-index: 10;
          margin-left: 0;
          width: 100%;
        }
      `})]})};function _w(){const r=Et(),[a,i]=R.useState(!0),c=u0.includes(r.pathname.toLowerCase()),l=!u0.includes(r.pathname.toLowerCase())&&!Bx.includes(r.pathname.toLowerCase()),[u,d]=R.useState(sessionStorage.getItem("isAuthenticated")==="true"),p=r.pathname.includes("/quiz");r.pathname.includes("/quiz/results");const m=p;return R.useEffect(()=>{(async()=>{if(sessionStorage.getItem("just_logged_out")==="true"){sessionStorage.removeItem("just_logged_out"),i(!1);return}const x=r.pathname.toLowerCase()===Ae.LOGIN.toLowerCase();if(localStorage.getItem("rememberedUser")&&!u&&x){i(!1);return}i(!1)})()},[r.pathname,u]),a?o.jsx("div",{className:"loading-container",children:"Loading..."}):!c&&!u&&!l?o.jsx(U1,{}):o.jsxs(o.Fragment,{children:[!c&&!l&&!m&&o.jsx(fw,{}),o.jsxs(J1,{children:[o.jsx(gt,{path:Ae.HOME,element:o.jsx(Cr,{to:u?Ae.DASHBOARD:Ae.LOGIN,replace:!0})}),o.jsx(gt,{path:Ae.LOGIN,element:u?o.jsx(Cr,{to:Ae.DASHBOARD,replace:!0}):o.jsx(j5,{})}),o.jsx(gt,{path:Ae.REGISTER,element:u?o.jsx(Cr,{to:Ae.DASHBOARD,replace:!0}):o.jsx(dw,{})}),o.jsx(gt,{path:Ae.FORGOT_PASSWORD,element:o.jsx(mw,{})}),o.jsx(gt,{path:Ae.RESET_PASSWORD,element:o.jsx(pw,{})}),o.jsx(gt,{path:Ae.DASHBOARD,element:u?o.jsx(hw,{}):o.jsx(Cr,{to:Ae.LOGIN,replace:!0})}),o.jsx(gt,{path:Ae.QUIZ+"/*",element:u?o.jsx(Nw,{}):o.jsx(Cr,{to:Ae.LOGIN,replace:!0})}),o.jsx(gt,{path:Ae.ACHIEVEMENTS,element:u?o.jsx(yw,{}):o.jsx(Cr,{to:Ae.LOGIN,replace:!0})}),o.jsx(gt,{path:Ae.LEADERBOARD,element:u?o.jsx(vw,{}):o.jsx(Cr,{to:Ae.LOGIN,replace:!0})}),o.jsx(gt,{path:Ae.STATISTICS,element:u?o.jsx(gw,{}):o.jsx(Cr,{to:Ae.LOGIN,replace:!0})}),o.jsx(gt,{path:"*",element:o.jsx(U1,{})})]}),o.jsx(qx,{position:"top-center",autoClose:2e3}),o.jsx("style",{jsx:!0,children:`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #242424;
          color: white;
          font-size: 1.5rem;
        }
        
        /* Ensure content is properly positioned when navbar is hidden */
        .content-wrapper-full {
          margin-left: 0;
          width: 100%;
        }
      `})]})}ly.createRoot(document.getElementById("root")).render(o.jsx(R.StrictMode,{children:o.jsx(wx,{children:o.jsx(_w,{})})}));
