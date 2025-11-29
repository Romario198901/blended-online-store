import"./assets/styles-CCJQcokt.js";import{a as c,i as f}from"./assets/vendor-u1GiHFh7.js";const L="https://dummyjson.com/",u={CATEGORIES:"/products/category-list",PRODUCTS:"/products"},r=12;c.defaults.baseURL=L;async function b(){const{data:t}=await c.get(u.CATEGORIES);return t}async function l(t=1){const o=(t-1)*r,{data:e}=await c.get(`${u.PRODUCTS}?limit=${r}&skip=${o}`);return e}const s={categoriesList:document.querySelector(".categories"),productsList:document.querySelector(".products"),loadMoreButton:document.querySelector(".load-more-btn")};function y(t){const e=["All",...t].map(a=>`<li class="categories__item">
   <button class="categories__btn" type="button">${a}</button>
 </li>`).join("");s.categoriesList.innerHTML=e,document.querySelector(".categories__btn").classList.add("categories__btn--active")}function p(t){const o=t.map(({id:e,images:i,title:a,brand:g,category:m,price:_})=>`<li class="products__item" data-id="${e}">
    <img class="products__image" src="${i[0]}" alt="${a}"/>
    <p class="products__title">${a}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${g||"Unknown"}</span></p>
    <p class="products__category">Category: ${m}</p>
    <p class="products__price">Price: ${_}</p>
 </li>`).join("");s.productsList.insertAdjacentHTML("beforeend",o)}function C(){s.loadMoreButton.classList.remove("is-hidden")}function M(){s.loadMoreButton.classList.add("is-hidden")}let n=1,d;async function B(){const t=await b();y(t);const{products:o}=await l();p(o),C()}async function E(){n+=1;const{products:t,total:o}=await l(n);if(console.log({products:t,total:o}),d=Math.ceil(o/r),n<=d)p(t);else{f.warning({title:"❌",titleColor:"#fafafb",message:"You reached end of the catalogue",messageColor:"#fafafb",backgroundColor:"#ef4040",position:"bottomRight"}),M();return}}document.addEventListener("DOMContentLoaded",B);s.loadMoreButton.addEventListener("click",E);
//# sourceMappingURL=index.js.map
