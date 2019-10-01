console.log("%c HI", "color: firebrick");
document.addEventListener("DOMContentLoaded", function() {
  fetchBreeds();
});

function fetchBreeds() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => renderBreeds(json));
  return fetch(imgUrl);
}

function renderBreeds(json) {
  const imgContain = document.getElementById("dog-image-container");
  json.forEach(breed => {
    const image = document.createElement("img");
    image.src = `${breed}`;
    imgContain.appendChild(image);
  });
}
