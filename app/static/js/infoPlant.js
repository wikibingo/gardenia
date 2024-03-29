const currentUrl = window.location.href; //url/stor
const urlParts = currentUrl.split('/');
const id = urlParts.pop();
const url = `https://perenual.com/api/species/details/${id}?key=sk-GpRy644963aed0f69653`;
var replacedUrl = url.replace(/\//g, ",");
const plantName = document.getElementById('plantName');
const plantSpecies = document.getElementById('plantSpecies');
const img = document.getElementById('plantImg');
const cycle = document.getElementById('cycle');
const watering = document.getElementById('watering');
const propogation = document.getElementById('propogation');
const hardiness = document.getElementById('hardiness');
const sun = document.getElementById('sun');
const cones = document.getElementById('cones')
const leaf = document.getElementById('leaf');
const leafColor = document.getElementById('leafColor');
const growth = document.getElementById('growth');
const care = document.getElementById('care');
const Pwatering = document.getElementById('Pwatering');
const Psun = document.getElementById('Psun');
const Ppruning = document.getElementById('Ppruning');
const StoreLink = document.querySelector('.Storelink');
const CartLink = document.querySelector('.Cartlink');
const inStore = document.querySelector('.inStore');
let listID = [];


fetch('/api/products') //api for the get request
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.length; i++) listID.push(data[i].id);
    if (listID.includes(Number(id))) {
      StoreLink.href = `../store/${id}`;
    } else {
      inStore.style.display = 'none';
    }
  })
  .catch(error => console.error(error));

fetch(`/cache/${replacedUrl}`)
  .then((response) => response.json())
  .then((data) => {
    data = JSON.parse(data);
    plantName.textContent = data.common_name;
    plantSpecies.textContent = data.scientific_name[0];
    img.src = data.default_image.regular_url;
    cycle.textContent = data.cycle;
    watering.textContent = data.watering;
    propogation.textContent = data.propagation.join(', ');
    hardiness.textContent = `${data.hardiness.min} - ${data.hardiness.max}`;
    sun.textContent = data.sunlight.join(', ');
    cones.textContent = data.cones;
    leaf.textContent = data.leaf;
    leafColor.textContent = data.leaf_color;
    growth.textContent = data.growth_rate;
    care.textContent = data.care_level;
  })
  .catch((error) => {
    console.log("First fetch failed:", error);
    APIfetch();
  });

const APIfetch = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(`API pung!!`);
      fetch(`/cache/${replacedUrl}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(`${JSON.stringify(data)}`)
        })
        .then(data => console.log(data))
        .catch(error => console.error(error));
      plantName.textContent = data.common_name;
      plantSpecies.textContent = data.scientific_name[0];
      img.src = data.default_image.regular_url;
      cycle.textContent = data.cycle;
      watering.textContent = data.watering;
      propogation.textContent = data.propagation.join(', ');
      hardiness.textContent = `${data.hardiness.min} - ${data.hardiness.max}`;
      sun.textContent = data.sunlight.join(', ');
      cones.textContent = data.cones;
      leaf.textContent = data.leaf;
      leafColor.textContent = data.leaf_color;
      growth.textContent = data.growth_rate;
      care.textContent = data.care_level;
    })
    .catch((error) => console.error(error));
}

const strUrl = 'https://perenual.com/api/species-care-guide-list?key=sk-GpRy644963aed0f69653'
var STRreplacedUrl = strUrl.replace(/\//g, ",");

fetch(`/cache/${STRreplacedUrl}`)
  .then((response) => response.json())
  .then((data) => {
    data = JSON.parse(data);
    for (const plant of data.data) {
      if (Number(plant.species_id) === Number(id)) {
        Pwatering.textContent = plant.section[0].description;
        Psun.textContent = plant.section[1].description;
        Ppruning.textContent = plant.section[2].description;
      }
    }
  })
  .catch((error) => {
    console.log("First fetch failed:", error);
    APIfetch2();
  });

const APIfetch2 = () => {
  fetch(strUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(`API pung!!`);
      fetch(`/cache/${STRreplacedUrl}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(`${JSON.stringify(data)}`)
        })
        .then(data => console.log(data))
        .catch(error => console.error(error));
      for (const plant of data.data) {
        if (Number(plant.species_id) === Number(id)) {
          Pwatering.textContent = plant.section[0].description;
          Psun.textContent = plant.section[1].description;
          Ppruning.textContent = plant.section[2].description;
        }
      }
    })
    .catch((error) => console.error(error));
};

// Update the cart quantity display
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartQuantity = document.getElementById('cart-quantity');
const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
cartQuantity.textContent = totalQuantity;

