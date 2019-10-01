console.log("%c HI", "color: firebrick");
document.addEventListener("DOMContentLoaded", function() {
  fetchBreedImg();
  fetchBreedList();
});

function fetchBreedImg() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => renderBreedImg(json.message));
  //.then(json => {console.log(json)});
}

function renderBreedImg(json) {
  const imgContain = document.getElementById("dog-image-container");
  json.forEach(breed => {
    const image = document.createElement("img");
    image.src = `${breed}`;
    imgContain.appendChild(image);
  });
}
let breeds;

function fetchBreedList() {
  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => {
      renderBreedList(json.message);
      breeds = json.message;
    });
  const elem = document.getElementById("breed-dropdown");
  elem.addEventListener("change", onChangeFilter);
}
//Empty string (No Filter in Select in HTML) equals falsey, so when passed in as filter, !filter = truthy
//and will run the full list of breeds.
function renderBreedList(json, filter) {
  const ul = document.getElementById("dog-breeds");
  ul.innerHTML = "";
  Object.keys(json).forEach(breed => {
    if (!filter || breed.startsWith(filter)) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<h3>${breed}</h3>`;
      listItem.addEventListener("click", onClickChangeColor);
      ul.appendChild(listItem);
    }
  });
}

function onClickChangeColor(event) {
  const li = event.currentTarget;
  li.style = "color: orange";
}

function onChangeFilter(event) {
  const selected = event.currentTarget.value;
  renderBreedList(breeds, selected);
}
