import { clearInputBtnClicked, filterProductsByCategory, initHomepage, loadMoreBtnClicked, searchInputChanged, submitBtnClicked } from "./js/handlers";
import { refs } from "./js/refs";


//Логіка сторінки Home
document.addEventListener('DOMContentLoaded', initHomepage);
refs.categoriesList.addEventListener('click', filterProductsByCategory);
refs.loadMoreButton.addEventListener('click', loadMoreBtnClicked);
refs.searchForm.addEventListener('submit', submitBtnClicked);
refs.searchForm.addEventListener('input', searchInputChanged);
refs.clearInputBtn.addEventListener('click', clearInputBtnClicked);
