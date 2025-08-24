const inputRef = document.querySelector('.country-icon');
const imgRef = document.querySelector('.icon-js');

console.log(imgRef);

inputRef.addEventListener('click', (event) => {
  imgRef.classList.add('header-icon_active');
  event.stopPropagation();
});

document.addEventListener('click', event => {
  if (!inputRef.contains(event.target) && !imgRef.contains(event.target)) {
    imgRef.classList.remove('header-icon_active');
  }
});
console.log(inputRef, imgRef);
