if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let t={};const r=e=>s(e,n),d={module:{uri:n},exports:t,require:r};a[n]=Promise.all(i.map((e=>d[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"2c3ff259d09866499518aeb249f3b161"},{url:"/_next/static/VWewdIxx60iC8aP38pU5G/_buildManifest.js",revision:"143428d6019f2f2409cce1f9b6e04f2f"},{url:"/_next/static/VWewdIxx60iC8aP38pU5G/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/13-2a8b022d270571c5.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/17-900cf95b72b8ca87.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/190.915ecf880fe2bba0.js",revision:"915ecf880fe2bba0"},{url:"/_next/static/chunks/196-db35f3910e5c0c15.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/459-82510628ddd1be44.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/481-279b0e28ee3dbdb9.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/514-aad5ca750c03548d.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/515-6205110b65f5f0dd.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/581-b32229f44858814e.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/603-1b45f225ddff94ff.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/664-486c40ecfc8489a8.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/675-1835b40ce854baff.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/901-5840affa88465e94.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/app/kudoku/home/page-73db0bfdfa281ce9.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/app/kudoku/layout-c41c19252a9cb23c.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/app/kudoku/page-ccfeee4230ccd294.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/app/layout-466c1688dbb95c91.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/app/login/layout-3b2407f8ee7208a9.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/app/login/loading-697313688d860491.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/app/login/page-62832a1f95b9cbbb.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/app/login/queue/%5Bwa%5D/page-485f26c24e362b8e.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/app/login/queue/page-96b02cb2e2321885.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/app/register/%5Bid%5D/page-a17094180cd08e56.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/app/register/layout-cdfb4860c3236f89.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/app/register/loading-bfcb3e7477843c01.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/c16184b3-1d785a6b2561e547.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/ea88be26-729590226cb96cbe.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/main-1adabb8d9994a770.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/main-app-f7991bdf5a7d528d.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/pages/_app-9f5490aa3d56632f.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/pages/_error-1fd6c3782812bbc4.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-1a2bdf23094e8236.js",revision:"VWewdIxx60iC8aP38pU5G"},{url:"/_next/static/css/849f96027abc1911.css",revision:"849f96027abc1911"},{url:"/_next/static/css/85246c43fa976228.css",revision:"85246c43fa976228"},{url:"/_next/static/css/890d62e5a1c201f8.css",revision:"890d62e5a1c201f8"},{url:"/_next/static/css/a197bc3dbf0ea211.css",revision:"a197bc3dbf0ea211"},{url:"/_next/static/css/d9094310ba9c8435.css",revision:"d9094310ba9c8435"},{url:"/_next/static/css/ef46db3751d8e999.css",revision:"ef46db3751d8e999"},{url:"/_next/static/media/1.c7632118.png",revision:"aaf2ceca3da853d386305aa096b414b9"},{url:"/_next/static/media/10.9bdac63a.png",revision:"083f1d3044e4a2af2b1fc36fa95046a2"},{url:"/_next/static/media/11.536417cc.png",revision:"c60322bebc1219b7cc7071d0a7cd27e3"},{url:"/_next/static/media/12.84ca41fe.png",revision:"36ef787d7e5a3810150d68490c953e7c"},{url:"/_next/static/media/13.3a2b33ff.png",revision:"f22b7136a1bd7703c890b6f502282f9a"},{url:"/_next/static/media/14.6cb8325e.png",revision:"3526af393325006dddbcd9760737ecbe"},{url:"/_next/static/media/15.591a0c4d.png",revision:"88459dcc8f9de4d1f724ef0a1fb55d2a"},{url:"/_next/static/media/16.4b76d3e7.png",revision:"9850fe0169cb16745aefc330e27be6d3"},{url:"/_next/static/media/17.183400ca.png",revision:"49cc7685f3ac17080d80d287db7c4e32"},{url:"/_next/static/media/18.25609845.png",revision:"6a3d1d05562fae09e9296720233549c5"},{url:"/_next/static/media/19.1199d852.png",revision:"f1774a68de7ce71da474296dd4b09ef9"},{url:"/_next/static/media/2.dd7b1662.png",revision:"f311064e2455cc3c7b92e69d083f6621"},{url:"/_next/static/media/20.369f7b1d.png",revision:"2b96e82aec5c271acce1bd87a4875749"},{url:"/_next/static/media/21.e80ad961.png",revision:"4b279246d1aab31bd84e14bb9246db08"},{url:"/_next/static/media/22.1685b005.png",revision:"a3775c3dd4b8b6a06f93b7a904ced84c"},{url:"/_next/static/media/23.d1981633.png",revision:"d33020f57a3c85b308d150654ccc36d0"},{url:"/_next/static/media/24.8f504f8d.png",revision:"c8cc24ace900baebe4fa59213a3f5e4a"},{url:"/_next/static/media/25.04c8be61.png",revision:"ab03ec471aa366e3e112ca167dda24c3"},{url:"/_next/static/media/26.ca4956c5.png",revision:"e76647eae04ce4ac305639d55e3181c5"},{url:"/_next/static/media/27.8e321989.png",revision:"ed0736cfa0e81345a5578544c2c25b84"},{url:"/_next/static/media/28.94327d4f.png",revision:"1db2f47df74665357d719c8a421bf8b7"},{url:"/_next/static/media/29.2934090a.png",revision:"8eaf1ddab895bc88fc350f5f5e13ad93"},{url:"/_next/static/media/3.aeb297f3.png",revision:"c387b9e5a640b2d88a4c01ee963922ab"},{url:"/_next/static/media/30.d313bcea.png",revision:"55cb31255cc2f1c931a6812a95d1e235"},{url:"/_next/static/media/31.0d379643.png",revision:"2fe75b99627439fa322358f39fa39f32"},{url:"/_next/static/media/32.002e8fcc.png",revision:"5672683ff3e9261598b8375427ab2aea"},{url:"/_next/static/media/33.f66c2f33.png",revision:"26ee17f77427718aa7e1efb44aad0b29"},{url:"/_next/static/media/34.79b0f4eb.png",revision:"490e8ea92a49fceb8c28fb4d94dcce37"},{url:"/_next/static/media/35.681652bc.png",revision:"fd27685179192af06cac6980b76e56c4"},{url:"/_next/static/media/36.fed66278.png",revision:"7f06b470411f0a83177709a9c1b7db57"},{url:"/_next/static/media/37.9d6a4db0.png",revision:"8a05b096fb429acd6c1deb77a7a64cb1"},{url:"/_next/static/media/38.9afcf923.png",revision:"898cc3d5a1f9b3a30c4ff2b91af332f5"},{url:"/_next/static/media/39.219395cd.png",revision:"ebfc9514394ba65735859f21c6e261b7"},{url:"/_next/static/media/4.10d5e345.png",revision:"71a36c190df279443c24987ae11fddf9"},{url:"/_next/static/media/40.59c76159.png",revision:"f0406da8bd0cff58844730e8b779cf1f"},{url:"/_next/static/media/5.5266b9fc.png",revision:"6021f3f83e5298d5de35acd0587cd074"},{url:"/_next/static/media/6.0041d3d1.png",revision:"b26d9dfc17734fdbcbfc4a6a9b5de3b5"},{url:"/_next/static/media/7.4cde1bc9.png",revision:"c7d083d7c77944973289c752412a8c63"},{url:"/_next/static/media/8.a88dfcce.png",revision:"98bf539240f4d459860e26c4c349dc16"},{url:"/_next/static/media/9.05170c86.png",revision:"b72211e26e5a4dfd54cc87d02ca9e7ca"},{url:"/_next/static/media/TTInterfaces-Black.d741c36b.ttf",revision:"d741c36b"},{url:"/_next/static/media/TTInterfaces-Bold.7fa9a237.ttf",revision:"7fa9a237"},{url:"/_next/static/media/TTInterfaces-ExtraLight.fc8487c5.ttf",revision:"fc8487c5"},{url:"/_next/static/media/TTInterfaces-Light.0a633370.ttf",revision:"0a633370"},{url:"/_next/static/media/TTInterfaces-Medium.1a4c8d37.ttf",revision:"1a4c8d37"},{url:"/_next/static/media/TTInterfaces-Regular.7a48a530.ttf",revision:"7a48a530"},{url:"/_next/static/media/aldi.96c2a994.png",revision:"966aff2e2405e5c2b903cc7b7985a521"},{url:"/_next/static/media/furqon.8fe5c6db.png",revision:"b019a6ee15305588b14eb8e1be009724"},{url:"/_next/static/media/rizqy.c413601e.png",revision:"03a0d9aeeeb9b2f2a8c58c6e36c392d3"},{url:"/_next/static/media/secondary.18a9dcfe.svg",revision:"f7bc639d7ddf29cc7f861187b4a3cf30"},{url:"/_next/static/media/secondaryDark.4a42ffe7.svg",revision:"b13bf387dfdc744052bdc1fbf4e4491a"},{url:"/apple-touch-icon-precomposed.png",revision:"9c02eaa68ed7eb3dc78526f95516e0e6"},{url:"/apple-touch-icon.png",revision:"9c02eaa68ed7eb3dc78526f95516e0e6"},{url:"/avatar/aldi.png",revision:"966aff2e2405e5c2b903cc7b7985a521"},{url:"/avatar/furqon.png",revision:"b019a6ee15305588b14eb8e1be009724"},{url:"/avatar/rizqy.png",revision:"03a0d9aeeeb9b2f2a8c58c6e36c392d3"},{url:"/favicon.ico",revision:"196db8b460aa4c017585019c64e299cf"},{url:"/fonts/SanFransisco/SF-Pro-Text-Black.otf",revision:"6a2cead061bfd81de03cd392ac4186c6"},{url:"/fonts/SanFransisco/SF-Pro-Text-BlackItalic.otf",revision:"e4705204a7d7095e005c67cc9f3f47d9"},{url:"/fonts/SanFransisco/SF-Pro-Text-Bold.otf",revision:"8b047269504f0b39bafc4c4889c565ca"},{url:"/fonts/SanFransisco/SF-Pro-Text-BoldItalic.otf",revision:"c5a6dfe516f932d6dc57010af441f221"},{url:"/fonts/SanFransisco/SF-Pro-Text-Light.otf",revision:"c352b4047b64a092492dcfd6c1172626"},{url:"/fonts/SanFransisco/SF-Pro-Text-LightItalic.otf",revision:"705aa8ab275510cc5d299e174edfbc31"},{url:"/fonts/SanFransisco/SF-Pro-Text-Medium.otf",revision:"e7c769e65101b5be4641357a3a488998"},{url:"/fonts/SanFransisco/SF-Pro-Text-MediumItalic.otf",revision:"54731a693021778fbdfb710368bd9d3a"},{url:"/fonts/SanFransisco/SF-Pro-Text-Regular.otf",revision:"56a46a3c3683b3ee8de690c0a3c40026"},{url:"/fonts/SanFransisco/SF-Pro-Text-RegularItalic.otf",revision:"b3f3549fcebb11f3bd21abb941bdfdfe"},{url:"/fonts/SanFransisco/SF-Pro-Text-Semibold.otf",revision:"f8fedd60b136be16ed8b9f5cfe214e7a"},{url:"/fonts/SanFransisco/SF-Pro-Text-SemiboldItalic.otf",revision:"5ee98d650053d52a6c1ca0de963bdce8"},{url:"/fonts/SanFransisco/SF-Pro-Text-Thin.otf",revision:"3bed48348565a2a55b3912b3d17569da"},{url:"/fonts/SanFransisco/SF-Pro-Text-ThinItalic.otf",revision:"004b3e689c4e10cbd3ecf7e2a0e003f5"},{url:"/fonts/SanFransisco/SF-Pro-Text-Ultralight.otf",revision:"629c32dec3e565da2eeafce090ac79f1"},{url:"/fonts/SanFransisco/SF-Pro-Text-UltralightItalic.otf",revision:"37266031231b7d77e3cd1d96efb528d8"},{url:"/fonts/TTInterfaces/TTInterfaces-Black.ttf",revision:"feab587a5b6d87d1dc3b30e713da47e6"},{url:"/fonts/TTInterfaces/TTInterfaces-Bold.ttf",revision:"990fca7ef28ae0af6398f5d06a6c94eb"},{url:"/fonts/TTInterfaces/TTInterfaces-ExtraLight.ttf",revision:"f3ad595af04bd8e9068c144da8a9b419"},{url:"/fonts/TTInterfaces/TTInterfaces-Light.ttf",revision:"ac9d43e9942334032d9907a4de65d261"},{url:"/fonts/TTInterfaces/TTInterfaces-Medium.ttf",revision:"cc332bc44e5215a6ab3f2456755a8d76"},{url:"/fonts/TTInterfaces/TTInterfaces-Regular.ttf",revision:"ccc7956f5c283b23b8e52902c34ba887"},{url:"/logo/primary.svg",revision:"a2b6dae3d5eabc16d7c4ddac94e0c1e0"},{url:"/logo/primaryDark.svg",revision:"bd3a4d50f5364a29cc79337e8bd47192"},{url:"/logo/secondary.svg",revision:"f7bc639d7ddf29cc7f861187b4a3cf30"},{url:"/logo/secondaryDark.svg",revision:"b13bf387dfdc744052bdc1fbf4e4491a"},{url:"/manifest.json",revision:"06d5a5683dc9da5b0d3df5f6dbac425c"},{url:"/manifest/apple-splash/apple-splash-1125-2436.jpg",revision:"e8400bd3b13730c40146ed4fc429bbf5"},{url:"/manifest/apple-splash/apple-splash-1136-640.jpg",revision:"0ab884e1747fd3c6c7b296c1d524e660"},{url:"/manifest/apple-splash/apple-splash-1170-2532.jpg",revision:"c3ff670aba2edc5a1adabde9fdfe974e"},{url:"/manifest/apple-splash/apple-splash-1242-2208.jpg",revision:"e5cd02f97aedd59fea4c942333dfa454"},{url:"/manifest/apple-splash/apple-splash-1242-2688.jpg",revision:"b57c490126b232c07c4a7ff30af272f7"},{url:"/manifest/apple-splash/apple-splash-1284-2778.jpg",revision:"7f14911b08d8c8f1aa0bb6690104bf8a"},{url:"/manifest/apple-splash/apple-splash-1334-750.jpg",revision:"cdceb197d1619b0408cbc12a49c901f3"},{url:"/manifest/apple-splash/apple-splash-1536-2048.jpg",revision:"1a6aeed603dcb1455adcfc251fd96d77"},{url:"/manifest/apple-splash/apple-splash-1620-2160.jpg",revision:"a9c6129bff63b4a2f7a6c9e3291377d7"},{url:"/manifest/apple-splash/apple-splash-1668-2224.jpg",revision:"5f4b140e5c0df2acd44033e8bfc87aae"},{url:"/manifest/apple-splash/apple-splash-1668-2388.jpg",revision:"fd6171e06c81bdf5ac715788781ec833"},{url:"/manifest/apple-splash/apple-splash-1792-828.jpg",revision:"9995922515a8d288f7b8e83c28be898e"},{url:"/manifest/apple-splash/apple-splash-2048-1536.jpg",revision:"74f51ca2b54a0ce3d89ce1ba8b587432"},{url:"/manifest/apple-splash/apple-splash-2048-2732.jpg",revision:"77230d3935adc806a4949dc0012c0232"},{url:"/manifest/apple-splash/apple-splash-2160-1620.jpg",revision:"9a0cd806fdaac54dffa120b967e2f477"},{url:"/manifest/apple-splash/apple-splash-2208-1242.jpg",revision:"e5e114f5cc653d092dab04f480055bbb"},{url:"/manifest/apple-splash/apple-splash-2224-1668.jpg",revision:"f4b845ee18a49bf9f08723fc7cc07802"},{url:"/manifest/apple-splash/apple-splash-2388-1668.jpg",revision:"0d18d9f20fcf716b974ea72de9b70ba6"},{url:"/manifest/apple-splash/apple-splash-2436-1125.jpg",revision:"672011256d48154ae5d9bd81dc4c3354"},{url:"/manifest/apple-splash/apple-splash-2532-1170.jpg",revision:"18215080aace94674322b9d26a75068b"},{url:"/manifest/apple-splash/apple-splash-2688-1242.jpg",revision:"05ea5718a272edab8bf38612c994e79d"},{url:"/manifest/apple-splash/apple-splash-2732-2048.jpg",revision:"92a6656ea567f985c0e3ce18dcdefd1e"},{url:"/manifest/apple-splash/apple-splash-2778-1284.jpg",revision:"d742b7a5e62eadd1084ffbb4921b683f"},{url:"/manifest/apple-splash/apple-splash-640-1136.jpg",revision:"7c3461a44698dff0947ed0549237e4d9"},{url:"/manifest/apple-splash/apple-splash-750-1334.jpg",revision:"0457eac5dc8e3d92a78d1e75d09ca5b6"},{url:"/manifest/apple-splash/apple-splash-828-1792.jpg",revision:"d37bddc419a65826311683f7e75b26e4"},{url:"/manifest/icons/1024x1024.png",revision:"1a3bed4283b75ba756c69875d525ce1c"},{url:"/manifest/icons/128x128.png",revision:"b188ffa630b9863865ead8df0299f25c"},{url:"/manifest/icons/16x16.png",revision:"7770f14027e5d23325b7ce01bfd969f8"},{url:"/manifest/icons/180x180.png",revision:"ef6924ef17438b417c2204c054478592"},{url:"/manifest/icons/256x256.png",revision:"8a43f864d9642b9e3ddc986703bf7dba"},{url:"/manifest/icons/32x32.png",revision:"4870ebe0cf0b70a27b6be23d583323e3"},{url:"/manifest/icons/512x512.png",revision:"f2df24eaf77d4bb11cc257405ccc5bc7"},{url:"/manifest/icons/64x64.png",revision:"9105bfcd3c65c65886309c80ab7ce5e0"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
