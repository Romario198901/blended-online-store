import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { ITEMS_PER_PAGE } from './constants';
import {
  getCategories,
  getProductById,
  getProducts,
  getProductsbyCategory,
  getProductsbyQuery,
} from './products-api';
import {
  clearProducts,
  hideBlockNotFound,
  hideClearInputBtn,
  hideLoadMoreButton,
  removeActiveClass,
  renderCategoryList,
  renderProducts,
  showBlockNotFound,
  showClearInputBtn,
  showLoadMoreButton,
} from './render-function';
import { refs } from './refs';
import { createModal, showModal } from './modal';
let currentPage = 1;
let totalPages;
let searchMode = false;
let currentQuery = '';
let currentCategory = '';
export async function initHomepage() {
  const categories = await getCategories();
  renderCategoryList(categories);
  searchMode = false;
  currentQuery = '';
  currentCategory = 'ALL';
  currentPage = 1;
  const { products, total } = await getProducts();
  totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  if (currentPage <= totalPages) {
    renderProducts(products);
    showLoadMoreButton();
  } else {
    hideLoadMoreButton();
    return;
  }
}
export async function loadMoreBtnClicked() {
  currentPage += 1;
  let products;
  let total;
  if (searchMode && currentQuery) {
    ({ products, total } = await getProductsbyQuery(currentQuery, currentPage));
  } else if (currentCategory && currentCategory !== 'ALL') {
    ({ products, total } = await getProductsbyCategory(
      currentCategory,
      currentPage
    ));
  } else {
    ({ products, total } = await getProducts(currentPage));
  }
  totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  if (currentPage <= totalPages) {
    renderProducts(products);
    showLoadMoreButton();
  } else {
    iziToast.warning({
      title: '❌',
      titleColor: '#fafafb',
      message: `You reached end of the catalogue`,
      messageColor: '#fafafb',
      backgroundColor: '#ef4040',
      position: 'bottomRight',
    });
    hideLoadMoreButton();
    return;
  }
}
export function searchInputChanged(e) {
  const input = e.target.value;
  if (!input || input.length === 0) {
    hideClearInputBtn();
  } else {
    showClearInputBtn();
  }
}
export async function submitBtnClicked(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const query = formData.get('searchValue').trim();
  if (!query) {
    iziToast.error({
      title: '❌',
      titleColor: '#fafafb',
      message: `Enter the search query`,
      messageColor: '#fafafb',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
    return;
  }
  clearProducts();
  currentPage = 1;
  currentCategory = 'all';
  searchMode = true;
  currentQuery = query;
  const { products, total } = await getProductsbyQuery(query, currentPage);
  totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  if (!products || products.length === 0) {
    searchMode = false;
    currentQuery = '';
    showBlockNotFound();
    clearProducts();
    hideLoadMoreButton();
    return;
  }
  hideBlockNotFound();
  renderProducts(products);
  if (currentPage < totalPages) {
    showLoadMoreButton();
  } else {
    hideLoadMoreButton();
  }
}
export async function clearInputBtnClicked() {
  refs.searchForm.elements.searchValue.value = '';
  hideClearInputBtn();
  clearProducts();
  hideBlockNotFound();
  searchMode = false;
  currentQuery = '';
  currentPage = 1;
  try {
    const { products, total } = await getProducts();
    totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    if (currentPage <= totalPages) {
      renderProducts(products);
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      return;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function filterProductsByCategory(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  removeActiveClass();
  const category = e.target.textContent.toLowerCase();
  currentCategory = category;
  currentPage = 1;
  searchMode = false;
  currentQuery = '';
  if (category === 'all') {
    e.target.classList.add('categories__btn--active');
    clearProducts();
    hideLoadMoreButton();
    await initHomepage();
    showLoadMoreButton();
  } else {
    e.target.classList.add('categories__btn--active');
    clearProducts();
    hideLoadMoreButton();
    try {
      const { total, products } = await getProductsbyCategory(
        currentCategory,
        currentPage
      );
      if (!products || products.length === 0) {
        showBlockNotFound();
      } else {
        hideBlockNotFound();
      }
      totalPages = Math.ceil(total / ITEMS_PER_PAGE);
      renderProducts(products);
      currentPage += 1;
      if (currentPage <= totalPages) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
        return;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
export async function ProductCardClicked(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }
  const id = e.target.dataset.id;
  const product = await getProductById(id);
  createModal(product);
  showModal();
}
