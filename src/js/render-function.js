import { refs } from './refs';

export function renderCategoryList(categories) {
  const allCategories = ['All', ...categories];
  const markup = allCategories
    .map(
      category => `<li class="categories__item">
   <button class="categories__btn" type="button">${category}</button>
 </li>`
    )
    .join('');
  refs.categoriesList.innerHTML = markup;
  const firstCategoryBtn = document.querySelector('.categories__btn');
  firstCategoryBtn.classList.add('categories__btn--active');
}
export function renderProducts(products) {
  const markup = products
    .map(({id, images, title, brand, category, price}) => {
      return `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${images[0]}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${brand || "Unknown"}</span></p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: ${price}</p>
 </li>`;
    })
    .join('');
    refs.productsList.insertAdjacentHTML('beforeend', markup);
}
export function clearProducts () {
  refs.productsList.innerHTML = '';
}
export function showLoadMoreButton() {
    refs.loadMoreButton.classList.remove('is-hidden');
}
export function hideLoadMoreButton() {
    refs.loadMoreButton.classList.add('is-hidden');
}
export function showBlockNotFound() {
  refs.blockNotFound.classList.add('not-found--visible');
}
export function hideBlockNotFound() {
  refs.blockNotFound.classList.remove('not-found--visible');
}
export function hideClearInputBtn () {
  refs.clearInputBtn.classList.add('is-hidden');
}
export function showClearInputBtn () {
  refs.clearInputBtn.classList.remove('is-hidden');
}
export function removeActiveClass() {
    const activeButtons = document.querySelectorAll('.categories__btn--active');
    activeButtons.forEach(btn => {
        btn.classList.remove('categories__btn--active');
    });
}




