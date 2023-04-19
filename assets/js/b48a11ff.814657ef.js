"use strict";(self.webpackChunkcommon_voice_docs=self.webpackChunkcommon_voice_docs||[]).push([[920],{3905:function(e,n,t){t.d(n,{Zo:function(){return d},kt:function(){return m}});var a=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=a.createContext({}),l=function(e){var n=a.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},d=function(e){var n=l(e.components);return a.createElement(c.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},u=a.forwardRef((function(e,n){var t=e.components,o=e.mdxType,r=e.originalType,c=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=l(t),m=o,h=u["".concat(c,".").concat(m)]||u[m]||p[m]||r;return t?a.createElement(h,i(i({ref:n},d),{},{components:t})):a.createElement(h,i({ref:n},d))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var r=t.length,i=new Array(r);i[0]=u;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var l=2;l<r;l++)i[l]=t[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},2502:function(e,n,t){t.r(n),t.d(n,{assets:function(){return d},contentTitle:function(){return c},default:function(){return m},frontMatter:function(){return s},metadata:function(){return l},toc:function(){return p}});var a=t(7462),o=t(3366),r=(t(7294),t(3905)),i=["components"],s={},c="Databases",l={unversionedId:"database",id:"database",title:"Databases",description:"Sentence Correction",source:"@site/docs/database.md",sourceDirName:".",slug:"/database",permalink:"/common-voice-docs/docs/database",editUrl:"https://github.com/joanise/common-voice-docs/tree/main/docs/database.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Microsoft Azure",permalink:"/common-voice-docs/docs/azure"},next:{title:"Getting Started",permalink:"/common-voice-docs/docs/getting_started"}},d={},p=[{value:"Sentence Correction",id:"sentence-correction",level:2},{value:"Commands",id:"commands",level:3},{value:"<code>docker</code>",id:"docker",level:4},{value:"<code>mysql</code>",id:"mysql",level:4},{value:"Initial State",id:"initial-state",level:3},{value:"Updated State",id:"updated-state",level:3},{value:"Code",id:"code",level:3},{value:"Conclusion",id:"conclusion",level:3}],u={toc:p};function m(e){var n=e.components,t=(0,o.Z)(e,i);return(0,r.kt)("wrapper",(0,a.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"databases"},"Databases"),(0,r.kt)("h2",{id:"sentence-correction"},"Sentence Correction"),(0,r.kt)("p",null,"During our initial recordings, the speaker noted some minor typos/errors on some sentences.\nWe wondered what would happen if we updated the sentence text file with the corrected sentences."),(0,r.kt)("p",null,"Initially, we couldn't get our local instance to update its database whereas the instance running on AWS would.\nWe had to disable ",(0,r.kt)("inlineCode",{parentName:"p"},'#CV_ENVIRONMENT="local"')," in ",(0,r.kt)("inlineCode",{parentName:"p"},".env-local-docker")," to get the new sentences to be injected in the database."),(0,r.kt)("h3",{id:"commands"},"Commands"),(0,r.kt)("h4",{id:"docker"},(0,r.kt)("inlineCode",{parentName:"h4"},"docker")),(0,r.kt)("p",null,"Start the initial Common-Voice stack."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'CURRENT_UID=$(id -u):$(id -g) docker-compose --project-name "common-voice" up --detach\nCURRENT_UID=$(id -u):$(id -g) docker-compose --project-name "common-voice" logs -f web\n')),(0,r.kt)("p",null,"Stop the ",(0,r.kt)("inlineCode",{parentName:"p"},"web")," component."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'CURRENT_UID=$(id -u):$(id -g) docker-compose --project-name "common-voice" stop web\n')),(0,r.kt)("p",null,"Modify ",(0,r.kt)("inlineCode",{parentName:"p"},"server/data.ilt/git/update_sentence_samuel.txt"),".\nRestart the ",(0,r.kt)("inlineCode",{parentName:"p"},"web")," component which will update the database with the new corpus."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'CURRENT_UID=$(id -u):$(id -g) docker-compose --project-name "common-voice" start web\nCURRENT_UID=$(id -u):$(id -g) docker-compose --project-name "common-voice" logs -f web\n')),(0,r.kt)("h4",{id:"mysql"},(0,r.kt)("inlineCode",{parentName:"h4"},"mysql")),(0,r.kt)("p",null,"As a reminder to access the database."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"docker container exec -it db mysql -u root -p\n")),(0,r.kt)("h3",{id:"initial-state"},"Initial State"),(0,r.kt)("p",null,"As a test, using our local instance running under ",(0,r.kt)("inlineCode",{parentName:"p"},"docker"),", we added 3 sentences to ",(0,r.kt)("inlineCode",{parentName:"p"},"git"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"This is a test that will be deleted.\nThere is a ttypo in this sentence.\nI eat an apple.\n")),(0,r.kt)("p",null,"Verifying that the sentences were indeed, added to the ",(0,r.kt)("inlineCode",{parentName:"p"},"sentences")," table."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"use voiceweb;\n\nSELECT text, version, created_at FROM sentences WHERE source = 'update_sentence_samuel';\n+--------------------------------------+---------+---------------------+\n| text                                 | version | created_at          |\n+--------------------------------------+---------+---------------------+\n| This is a test that will be deleted. |       1 | 2023-04-18 18:49:57 |\n| There is a ttypo in this sentence.   |       1 | 2023-04-18 18:49:57 |\n| I eat an apple.                      |       1 | 2023-04-18 18:49:57 |\n+--------------------------------------+---------+---------------------+\n3 rows in set (0.00 sec)\n")),(0,r.kt)("h3",{id:"updated-state"},"Updated State"),(0,r.kt)("p",null,"Let's fixed the second sentence and add a fourth one to see what happens."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"This is a test.\nThere is a typo in this sentence and it's now fixed.\nI eat an apple.\nWhy not add another sentence.\n")),(0,r.kt)("p",null,"What is the current state of ",(0,r.kt)("inlineCode",{parentName:"p"},"sentences")," with respect to our test ",(0,r.kt)("inlineCode",{parentName:"p"},"source"),"?"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"use voiceweb;\n\nSELECT text, version, created_at FROM sentences WHERE source = 'update_sentence_samuel';\n+------------------------------------------------------+---------+---------------------+\n| text                                                 | version | created_at          |\n+------------------------------------------------------+---------+---------------------+\n| There is a typo in this sentence and it's now fixed. |       2 | 2023-04-18 18:52:58 |\n| I eat an apple.                                      |       2 | 2023-04-18 18:49:57 |\n| Why not add another sentence.                        |       2 | 2023-04-18 18:52:58 |\n+------------------------------------------------------+---------+---------------------+\n3 rows in set (0.00 sec)\n")),(0,r.kt)("h3",{id:"code"},"Code"),(0,r.kt)("p",null,"When looking at the code that imports sentences into the database, it's clear that if we modify a sentence, its ",(0,r.kt)("inlineCode",{parentName:"p"},"id")," will change thus it won't override the old sentence.\nA sentence's ",(0,r.kt)("inlineCode",{parentName:"p"},"id")," is based on its content and optionally its locale."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"server/src/lib/model/db/import-sentences.ts"),"\n",(0,r.kt)("inlineCode",{parentName:"p"},"importLocaleSentences()")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"await pool.query(\n  `\n  INSERT INTO sentences\n  (id, text, is_used, locale_id, source, version)\n  VALUES ${sentences\n    .map(sentence => {\n      return `(${[\n        LOCALE_HASH_SOURCES.includes(source)\n          ? hashSentence(localeId + sentence)\n          : hashSentence(sentence),\n        sentence,\n        true,\n        localeId,\n        source,\n        version,\n      ]\n        .map(v => pool.escape(v))\n        .join(', ')})`;\n    })\n    .join(', ')}\n  ON DUPLICATE KEY UPDATE\n    source = VALUES(source),\n    version = VALUES(version),\n    is_used = VALUES(is_used);\n`\n);\n")),(0,r.kt)("p",null,"Once all locales have been processed, the old and unused ",(0,r.kt)("inlineCode",{parentName:"p"},"version"),"s are purged."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"await pool.query(\n  `\n    DELETE FROM sentences\n    WHERE id NOT IN (SELECT original_sentence_id FROM clips) AND\n          id NOT IN (SELECT sentence_id FROM skipped_sentences) AND\n          id NOT IN (SELECT sentence_id FROM reported_sentences) AND\n          id NOT IN (SELECT sentence_id FROM taxonomy_entries) AND\n          version <> ?\n  `,\n  [version]\n);\n")),(0,r.kt)("p",null,"Note that it looks like ",(0,r.kt)("inlineCode",{parentName:"p"},"version")," is in lock step with the number of times we call ",(0,r.kt)("inlineCode",{parentName:"p"},"importLocaleSentences()"),"."),(0,r.kt)("h3",{id:"conclusion"},"Conclusion"),(0,r.kt)("p",null,"Given sufficient time to cleanse the database, the new sentences are going to replace the old ones.\nThe ",(0,r.kt)("inlineCode",{parentName:"p"},"version")," in ",(0,r.kt)("inlineCode",{parentName:"p"},"sentences")," looks to be the ",(0,r.kt)("inlineCode",{parentName:"p"},"source")," version aka the version of the whole text file."))}m.isMDXComponent=!0}}]);