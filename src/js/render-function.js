import { refs } from "./refs";

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
    const firstCategoryBtn = document.querySelector('categories__btn');
    if(firstCategoryBtn) {
        firstCategoryBtn.classList.add('ategories__btn--active');
    }
}

