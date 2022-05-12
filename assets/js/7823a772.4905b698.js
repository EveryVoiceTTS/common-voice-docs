"use strict";(self.webpackChunkcommon_voice_docs=self.webpackChunkcommon_voice_docs||[]).push([[519],{3905:function(e,n,r){r.d(n,{Zo:function(){return u},kt:function(){return m}});var t=r(7294);function o(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function i(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function c(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?i(Object(r),!0).forEach((function(n){o(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function a(e,n){if(null==e)return{};var r,t,o=function(e,n){if(null==e)return{};var r,t,o={},i=Object.keys(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=t.createContext({}),l=function(e){var n=t.useContext(s),r=n;return e&&(r="function"==typeof e?e(n):c(c({},n),e)),r},u=function(e){var n=l(e.components);return t.createElement(s.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},d=t.forwardRef((function(e,n){var r=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),d=l(r),m=o,f=d["".concat(s,".").concat(m)]||d[m]||p[m]||i;return r?t.createElement(f,c(c({ref:n},u),{},{components:r})):t.createElement(f,c({ref:n},u))}));function m(e,n){var r=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=r.length,c=new Array(i);c[0]=d;var a={};for(var s in n)hasOwnProperty.call(n,s)&&(a[s]=n[s]);a.originalType=e,a.mdxType="string"==typeof e?e:o,c[1]=a;for(var l=2;l<i;l++)c[l]=r[l];return t.createElement.apply(null,c)}return t.createElement.apply(null,r)}d.displayName="MDXCreateElement"},399:function(e,n,r){r.r(n),r.d(n,{assets:function(){return u},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return a},metadata:function(){return l},toc:function(){return p}});var t=r(7462),o=r(3366),i=(r(7294),r(3905)),c=["components"],a={},s="crond",l={unversionedId:"microservices/crond",id:"microservices/crond",title:"crond",description:"This mircroservice was inspired by Running cron jobs in a Docker Alpine container.",source:"@site/docs/microservices/crond.md",sourceDirName:"microservices",slug:"/microservices/crond",permalink:"/common-voice-docs/docs/microservices/crond",editUrl:"https://github.com/joanise/common-voice-docs/tree/main/docs/microservices/crond.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Audio Backup",permalink:"/common-voice-docs/docs/microservices/audio"},next:{title:"Database Backup",permalink:"/common-voice-docs/docs/microservices/database"}},u={},p=[{value:"Help",id:"help",level:2}],d={toc:p};function m(e){var n=e.components,r=(0,o.Z)(e,c);return(0,i.kt)("wrapper",(0,t.Z)({},d,r,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"crond"},(0,i.kt)("inlineCode",{parentName:"h1"},"crond")),(0,i.kt)("p",null,"This mircroservice was inspired by ",(0,i.kt)("a",{parentName:"p",href:"https://devopsheaven.com/cron/docker/alpine/linux/2017/10/30/run-cron-docker-alpine.html"},"Running cron jobs in a Docker Alpine container"),"."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"crond"),"'s image is quite minimalist.\nIt runs scripts under ",(0,i.kt)("inlineCode",{parentName:"p"},"/etc/periodic/*")," using ",(0,i.kt)("inlineCode",{parentName:"p"},"run-parts"),".\nNote that your scipts can't be ",(0,i.kt)("inlineCode",{parentName:"p"},"*.sh")," since ",(0,i.kt)("inlineCode",{parentName:"p"},"run-parts")," is capricious:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"run-parts runs a number of scripts or programs found in a single directory directory.\nFilenames should consist entirely of upper and lower case letters, digits, underscores, and hyphens.\nSubdirectories of directory and files with other names will be silently ignored.\n\nScripts must follow the #!/bin/interpretername convention in order to be executed.\nThey will not automatically be executed by /bin/sh.\n\nThe files found will be run in the lexical sort order of the filenames.\n")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://nixdoc.net/man-pages/Linux/man8/run-parts.8.html"},(0,i.kt)("inlineCode",{parentName:"a"},"run-parts's")," man page")),(0,i.kt)("h2",{id:"help"},"Help"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"crond --help\nBusyBox v1.34.1 (2022-04-04 10:19:27 UTC) multi-call binary.\n\nUsage: crond [-fbS] [-l N] [-d N] [-L LOGFILE] [-c DIR]\n\n        -f      Foreground\n        -b      Background (default)\n        -S      Log to syslog (default)\n        -l N    Set log level. Most verbose 0, default 8\n        -d N    Set log level, log to stderr\n        -L FILE Log to FILE\n        -c DIR  Cron dir. Default:/var/spool/cron/crontabs\n")))}m.isMDXComponent=!0}}]);