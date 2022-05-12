"use strict";(self.webpackChunkcommon_voice_docs=self.webpackChunkcommon_voice_docs||[]).push([[971],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=l(n),m=a,f=d["".concat(s,".").concat(m)]||d[m]||u[m]||o;return n?r.createElement(f,c(c({ref:t},p),{},{components:n})):r.createElement(f,c({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,c=new Array(o);c[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:a,c[1]=i;for(var l=2;l<o;l++)c[l]=n[l];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7498:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return i},metadata:function(){return l},toc:function(){return u}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),c=["components"],i={},s="Database Backup",l={unversionedId:"microservices/database",id:"microservices/database",title:"Database Backup",description:"* how to mysqldump remote db from local machine",source:"@site/docs/microservices/database.md",sourceDirName:"microservices",slug:"/microservices/database",permalink:"/common-voice-docs/docs/microservices/database",editUrl:"https://github.com/joanise/common-voice-docs/tree/main/docs/microservices/database.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"crond",permalink:"/common-voice-docs/docs/microservices/crond"},next:{title:"NextCloud",permalink:"/common-voice-docs/docs/nextcloud"}},p={},u=[{value:"Test",id:"test",level:2},{value:"Setting up Backup",id:"setting-up-backup",level:2},{value:"<code>.env-local-docker</code>",id:"env-local-docker",level:3},{value:"<code>.env-tasks</code>",id:"env-tasks",level:3}],d={toc:u};function m(e){var t=e.components,n=(0,a.Z)(e,c);return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"database-backup"},"Database Backup"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://stackoverflow.com/a/2990732"},"how to mysqldump remote db from local machine")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://www.sqlshack.com/how-to-backup-and-restore-mysql-databases-using-the-mysqldump-command/"},"Generate the backup of a single database"),"\nWe've added the ",(0,o.kt)("inlineCode",{parentName:"li"},"database_backup")," microservice to Common Voice's docker stack to perform periodic full database backup to make sure we have both the sentences and their ids.")),(0,o.kt)("h2",{id:"test"},"Test"),(0,o.kt)("p",null,"This is a basic sample of what needs to get done to perform the backup."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"mysqldump -P 3306 -h db -u root --password=PASSWORD voiceweb\n")),(0,o.kt)("p",null,"We need to upload the output on the backup server."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"curl -u $WEBDAV_LOGIN:$WEBDAV_PASSWORD -T <local file location> https://nextcloud.nrc-cnrc.gc.ca/remote.php/dav/files/$WEBDAV_LOGIN/\n")),(0,o.kt)("h2",{id:"setting-up-backup"},"Setting up Backup"),(0,o.kt)("h3",{id:"env-local-docker"},(0,o.kt)("inlineCode",{parentName:"h3"},".env-local-docker")),(0,o.kt)("p",null,"Make sure to properly configure ",(0,o.kt)("inlineCode",{parentName:"p"},"CV_DB_ROOT_PASS")," in ",(0,o.kt)("inlineCode",{parentName:"p"},".env-local-docker"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'CV_S3_CONFIG=\'{"endpoint": "http://s3proxy:80", "accessKeyId": "local-identity", "secretAccessKey": "local-credential", "s3ForcePathStyle": true}\'\n')),(0,o.kt)("h3",{id:"env-tasks"},(0,o.kt)("inlineCode",{parentName:"h3"},".env-tasks")),(0,o.kt)("p",null,"You need to copy and populate ",(0,o.kt)("inlineCode",{parentName:"p"},".env-tasks")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"cp .env-tasks.example .env-tasks\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-diff"},"+ WEBDAV_HOSTNAME=https://nextcloud.nrc-cnrc.gc.ca/remote.php/dav/files/2c523d8d-449f-4176-bb05-d8bde72ad65f/\n+ WEBDAV_LOGIN=LLLLLLLL-LLLL-LLLL-LLLL-LLLLLLLLLLLL\n+ WEBDAV_PASSWORD=PPPPP-PPPPP-PPPPP-PPPPP-PPPPP\n")))}m.isMDXComponent=!0}}]);