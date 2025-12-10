import { refs } from './refs';

export function showModal() {
  refs.modal.classList.add('modal--is-open');
}
export function hideModal() {
  refs.modal.classList.remove('modal--is-open');
}
export function createModal(product) {
  const markup = `<img class="modal-product__img" src="${
    product.images[0]
  }" alt="${product.title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${product.title}</p>
        <ul class="modal-product__tags">
        <li class="modal-product__tag">${product.tags[0] || ''} </li>
         <li class="modal-product__tag">${product.tags[1] || ''} </li>
        </ul>
        <p class="modal-product__description">${product.description}</p>
        <p class="modal-product__shipping-information">Shipping: ${
          product.shippingInformation
        }</p>
        <p class="modal-product__return-policy">Return Policy: ${
          product.returnPolicy
        }</p>
        <p class="modal-product__price">Price: ${product.price}</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`;
  refs.modalContent.innerHTML = markup;
}
