// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector(".gallery");
createGallery();
var lightbox = new SimpleLightbox(".gallery a", {
  captionData: 'alt',
  captionDelay: 250,
});
function createGallery() {
  const markup = galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" width="800" height="600"/>
        </a>
    </li>`;
    })
    .join("");
  galleryList.insertAdjacentHTML("afterbegin", markup);
} 

galleryList.style.listStyle = 'none'