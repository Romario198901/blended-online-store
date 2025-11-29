import { initHomepage, loadMoreBtnClicked } from "./js/handlers";
import { refs } from "./js/refs";


//Логіка сторінки Home
document.addEventListener('DOMContentLoaded', initHomepage);
refs.loadMoreButton.addEventListener('click', loadMoreBtnClicked);
