import {
  clearInputBtnClicked,
  filterProductsByCategory,
  initHomepage,
  loadMoreBtnClicked,
  ProductCardClicked,
  searchInputChanged,
  submitBtnClicked,
} from './js/handlers';
import { hideModal } from './js/modal';
import { refs } from './js/refs';

//Логіка сторінки Home
document.addEventListener('DOMContentLoaded', initHomepage);
refs.categoriesList.addEventListener('click', filterProductsByCategory);
refs.loadMoreButton.addEventListener('click', loadMoreBtnClicked);
refs.searchForm.addEventListener('submit', submitBtnClicked);
refs.searchForm.addEventListener('input', searchInputChanged);
refs.clearInputBtn.addEventListener('click', clearInputBtnClicked);
refs.productsList.addEventListener('click', ProductCardClicked);
refs.modalCloseBtn.addEventListener('click', hideModal);
