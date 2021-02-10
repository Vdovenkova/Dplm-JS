(()=>{"use strict";const e=function({duration:e,draw:t,timing:s}){let o=performance.now();requestAnimationFrame((function n(i){let l=(i-o)/e;l>1&&(l=1);let r=s(l);t(r),l<1&&requestAnimationFrame(n)}))},t=t=>{let s=t.querySelector(".form-wrapper");t.style.display="block",e({duration:300,timing:function(e){return e},draw:function(e){s.style.top=20*e+"vh"}})},s=e=>{document.getElementById(e).addEventListener("input",(e=>{let t=e.target;t.matches('input[type="text"]')&&!t.closest(".price-message")&&(t.value=t.value.replace(/[^А-Яа-яЁё\s]/gi,"")),t.matches('input[type="text"]')&&t.closest(".price-message")&&(t.value=t.value.replace(/[^А-Яа-яЁё\d]/gi,""))}))};(()=>{const e=document.querySelector(".clubs-list>ul");e.style.display="none",document.addEventListener("click",(t=>{let s=t.target;s.matches(".clubs-list>p")||s.matches(".clubs-list")?"none"===e.style.display?e.style.display="block":"block"===e.style.display&&(e.style.display="none"):s.matches(".clubs-list>p")&&s.matches(".clubs-list")||(e.style.display="none")}))})(),(()=>{const e=document.getElementById("arrow-up");e.style.display="none";let t=document.querySelector("header").offsetHeight/1.5;document.addEventListener("scroll",(()=>{window.pageYOffset>=t?e.style.display="block":e.style.display="none"})),e.addEventListener("click",(e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})}))})(),(()=>{document.querySelectorAll(".btn-popup").forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault();let s=e.target,o=s.dataset.popup.substr(1),n=document.getElementById(o);t(n),s.closest(".fixed-gift")&&(s.style.display="none")}))}));const e=e=>{e.querySelectorAll("input").forEach((e=>{e.value=""}))};document.querySelectorAll(".popup").forEach((t=>{t.addEventListener("click",(s=>{let o=s.target;o.classList.contains("close_icon")||o.classList.contains("close-btn")?(t.style.display="none",e(t)):(o=o.closest(".form-content"),o||(t.style.display="none",e(t)))}))}))})(),(()=>{const e=document.querySelectorAll("form"),s=document.getElementById("thanks"),o=document.getElementById("error-send"),n=document.createElement("div");let i,l,r;const a=()=>{n.remove(),i.remove()},d=e=>{if(e.closest(".popup")){let t=e.getAttribute("name");document.getElementById(t).style.display="none"}},c=(e,t)=>{r=document.createElement("div"),r.textContent=e,r.style.cssText="\n      padding-top: 15px;\n      color: #ffd11a;\n      text-align: center;",t.append(r)};e.forEach((e=>{e.addEventListener("submit",(p=>{p.preventDefault();let u=e.querySelector('input[type="checkbox"]'),m=e.querySelectorAll('input[type="radio"]');if("footer_form"===e.id&&!m[0].checked&&!m[1].checked)return l="Пожалуйста, выберите клуб!",c(l,e),void setTimeout((()=>r.remove()),2e3);if("footer_form"!==e.id&&!u.checked)return l="Пожалуйста, согласитесь с обработкой данных!",c(l,e),void setTimeout((()=>r.remove()),2e3);(e=>{n.classList.add("sk-flow"),e.appendChild(n),n.innerHTML='\n      <div class="sk-flow-dot"></div>\n      <div class="sk-flow-dot"></div>\n      <div class="sk-flow-dot"></div>',i=document.createElement("style"),i.textContent="\n      :root {\n        --sk-size: 40px;\n        --sk-color: #ffd11a;\n      }\n\n      .sk-flow {\n        margin: auto;\n        width: calc(var(--sk-size) * 1.3);\n        height: calc(var(--sk-size) * 1.3);\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n      }\n\n      .sk-flow-dot {\n        width: 25%;\n        height: 25%;\n        background-color: var(--sk-color);\n        border-radius: 50%;\n        animation: sk-flow 1.4s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s infinite\n          both;\n      }\n\n      .sk-flow-dot:nth-child(1) {\n        animation-delay: -0.3s;\n      }\n      .sk-flow-dot:nth-child(2) {\n        animation-delay: -0.15s;\n      }\n\n      @keyframes sk-flow {\n        0%,\n        80%,\n        100% {\n          transform: scale(0.3);\n        }\n        40% {\n          transform: scale(1);\n        }\n      }",document.head.appendChild(i)})(e);const h=new FormData(e);if(e.closest(".main-page")){const e=document.getElementById("promo"),t=document.getElementById("price-total");h.append(e.id,e.value),h.append(t.id,t.textContent)}let y={};h.forEach(((e,t)=>{y[t]=e})),(e=>fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}))(y).then((o=>{if(200!==o.status)throw new Error("Status network not 200");a(),e.reset(),d(e),t(s)})).catch((s=>{a(),e.reset(),d(e),t(o),console.error(s)}))}))}))})(),s("banner-form"),s("card_order"),s("footer_form"),s("form1"),s("form2"),(()=>{const t=document.getElementById("price-total"),s=document.getElementById("card_order"),o=document.getElementById("promo"),n=document.querySelectorAll('input[name="card-type"]'),i=document.querySelectorAll('input[name="club-name"]');s.addEventListener("input",(s=>{let l=s.target;l.matches('input#promo, input[type="radio"]')&&l.closest(".main-page")&&(()=>{let s,l,r;n.forEach((e=>{e.checked&&(l=e.value)})),i.forEach((e=>{e.checked&&(r=e.value)})),"mozaika"===r&&"1"===l&&(s=1999),"mozaika"===r&&"6"===l&&(s=9900),"mozaika"===r&&"9"===l&&(s=13900),"mozaika"===r&&"12"===l&&(s=19900),"schelkovo"===r&&"1"===l&&(s=2999),"schelkovo"===r&&"6"===l&&(s=14990),"schelkovo"===r&&"9"===l&&(s=21990),"schelkovo"===r&&"12"===l&&(s=24990),"ТЕЛО2020"===o.value&&(s*=.7),e({duration:500,timing:function(e){return e},draw:function(e){t.textContent=Math.floor(e*s)}})})()}))})(),(()=>{const e=document.querySelector(".main-slider"),t=e.querySelectorAll(".slide"),s=document.querySelector(".slider-dots");let o,n=0;for(let e=0;e<t.length;e++){let e=document.createElement("li"),t=document.createElement("button");s.append(e),e.append(t),t.classList.add("dot")}const i=document.querySelectorAll("ul.slider-dots>li");i[0].classList.add("slick-active");const l=(e,t)=>{e[t].style.display="none"},r=(e,t)=>{e[t].style.display="block"},a=(e,t,s)=>{e[t].classList.remove(s)},d=(e,t,s)=>{e[t].classList.add(s)},c=()=>{l(t,n),a(i,n,"slick-active"),n++,n>=t.length&&(n=0),r(t,n),d(i,n,"slick-active")},p=(e=6e3)=>{o=setInterval(c,e)};e.addEventListener("click",(e=>{e.preventDefault();let s=e.target;s.matches(".dot")&&(l(t,n),a(i,n,"slick-active"),s.matches(".dot")&&document.querySelectorAll(".dot").forEach(((e,t)=>{e===s&&(n=t)})),r(t,n),d(i,n,"slick-active"))})),e.addEventListener("mouseover",(e=>{e.target.matches(".dot")&&clearInterval(o)})),e.addEventListener("mouseout",(e=>{e.target.matches(".dot")&&p()})),p(6e3)})(),(()=>{const e=document.querySelector(".gallery-slider"),t=e.querySelectorAll(".slide"),s=e.querySelector(".slider-dots");let o,n=0;t.forEach(((e,t)=>{0!==t&&(e.style.display="none")}));for(let e=0;e<t.length;e++){let e=document.createElement("li"),t=document.createElement("button");s.append(e),e.append(t),t.classList.add("photo-dot")}const i=e.querySelectorAll("ul.slider-dots>li");i[0].classList.add("slick-active");const l=(e,t)=>{e[t].style.display="none"},r=(e,t)=>{e[t].style.display="block"},a=(e,t,s)=>{e[t].classList.remove(s)},d=(e,t,s)=>{e[t].classList.add(s)},c=()=>{l(t,n),a(i,n,"slick-active"),n++,n>=t.length&&(n=0),r(t,n),d(i,n,"slick-active")},p=(e=3e3)=>{o=setInterval(c,e)};e.addEventListener("click",(e=>{e.preventDefault();let s=e.target;s.closest(".photo-dot, .slider-arrow")&&(l(t,n),a(i,n,"slick-active"),s.closest(".next")?n++:s.closest(".prev")?n--:s.matches(".photo-dot")&&document.querySelectorAll(".photo-dot").forEach(((e,t)=>{e===s&&(n=t)})),n>=t.length&&(n=0),n<0&&(n=t.length-1),r(t,n),d(i,n,"slick-active"))})),e.addEventListener("mouseover",(e=>{(e.target.closest(".slider-arrow")||e.target.closest(".photo-dot"))&&clearInterval(o)})),e.addEventListener("mouseout",(e=>{(e.target.closest(".slider-arrow")||e.target.closest(".photo-dot"))&&p()})),p(3e3)})(),(()=>{const e=document.querySelector(".popup-menu");document.querySelector("header").addEventListener("click",(t=>{let s=t.target;s.matches(".menu-button>img")&&(e.style.display="flex"),(s.matches(".close-menu-btn>img")||s.closest(".scroll")&&s.closest(".popup-menu"))&&(e.style.display="none")}))})(),(()=>{const e=document.querySelector(".head"),t=document.querySelector(".top-menu");let s,o;s=document.createElement("style"),s.textContent="\n    .pos-fix {\n      position: fixed;\n      top: 0;\n    }\n    .mg-bttm {\n      margin-bottom: 58px;\n    }",document.head.append(s);const n=()=>{t.classList.add("pos-fix"),e.classList.add("mg-bttm")},i=()=>{t.classList.remove("pos-fix"),e.classList.remove("mg-bttm")};document.addEventListener("scroll",(()=>{o=e.offsetHeight,window.innerWidth<768&&window.pageYOffset>=o?n():window.pageYOffset<o&&i()})),window.addEventListener("resize",(()=>{o=e.offsetHeight,window.innerWidth>=768&&t.classList.contains("pos-fix")?i():window.innerWidth<768&&window.pageYOffset>=o&&n()}))})(),document.addEventListener("click",(e=>{let t=e.target;!t.closest(".clubs")&&t.matches("li a")&&t.closest(".top-menu, .popup-menu, #footer")&&(e.preventDefault(),(e=>{const t=e.getAttribute("href").substr(1);document.getElementById(t).scrollIntoView({behavior:"smooth",block:"start"})})(t))})),new class{constructor({main:e,wrap:t,next:s,prev:o,infinity:n=!1,slidesToShow:i=5,position:l=0,responsive:r=[]}){e&&t||console.warn('Slader-carousel: Неодходимо добавить свойства "main" и "wrap"'),this.main=document.querySelector(e),this.wrap=document.querySelector(t),this.slides=document.querySelector(t).children,this.next=document.querySelector(s),this.prev=document.querySelector(o),this.slidesToShow=i,this.options={infinity:n,position:l,widthSlide:Math.floor(100/i)},this.responsive=r}init(){this.addCarouselClass(),this.addCarouselStyle(),this.controlSlider(),this.responsive&&this.responseInit()}addCarouselClass(){this.main.classList.add("сarousel-slider"),this.wrap.classList.add("carousel-slider__wrap");for(let e of this.slides)e.classList.add("carousel-slider__item")}addCarouselStyle(){let e=document.getElementById("sliderCarousel-style");e||(e=document.createElement("style"),e.id="sliderCarousel-style"),e.textContent=`\n      .сarousel-slider {\n        overflow: hidden !important\n      }\n      .carousel-slider__wrap {\n        transition: transform 0.5s !important;\n        will-change: transform !important;\n      }\n      .carousel-slider__item {\n        flex: 0 0 ${this.options.widthSlide}% !important;\n        margin: 0 auto !important;\n      }`,document.head.appendChild(e)}controlSlider(){this.prev.addEventListener("click",this.prevSlider.bind(this)),this.next.addEventListener("click",this.nextSlider.bind(this))}prevSlider(){(this.options.infinity||this.options.position>0)&&(--this.options.position,this.options.position<0&&(this.options.position=this.slides.length-this.slidesToShow),this.wrap.style.transform=`\n          translateX(${-this.options.position*this.options.widthSlide}%)`)}nextSlider(){(this.options.infinity||this.options.position<this.slides.length-this.slidesToShow)&&(++this.options.position,this.options.position>this.slides.length-this.slidesToShow&&(this.options.position=0),this.wrap.style.transform=`\n          translateX(${-this.options.position*this.options.widthSlide}%)`)}responseInit(){const e=this.slidesToShow,t=this.responsive.map((e=>e.breakpoint)),s=Math.max(...t),o=()=>{const o=document.documentElement.clientWidth;if(o<s)for(let e=0;e<t.length;e++)o<t[e]&&(this.slidesToShow=this.responsive[e].slidesToShow,this.options.widthSlide=Math.floor(100/this.slidesToShow),this.addCarouselStyle());else this.slidesToShow=e,this.options.widthSlide=Math.floor(100/this.slidesToShow),this.addCarouselStyle()};o(),window.addEventListener("resize",o)}}({main:".services-slider",wrap:".services-slider__wrap",next:"#carousel-next",prev:"#carousel-prev",slidesToShow:5,infinity:!0,responsive:[{breakpoint:1024,slidesToShow:3},{breakpoint:768,slidesToShow:2},{breakpoint:576,slidesToShow:1}]}).init(),maskPhone('input[type="tel"]')})();