let productsContainer = document.getElementById("products-container");
let url = "http://localhost:3000";

async function getProducts() {
  try {
    
    let response = await fetch(`${url}/api/products`);


    console.log(`fetch GET request to ${url}/api/products`);

    let data = await response.json();
    

    let products = data.payload;
    

    showProducts(products);
  } catch (error) {
    console.error("Error obtaining products: ", error);
  }
}

function showProducts(array) {
  let htmlProducts = "";

  array.forEach((prod) => {
    const titleProduct = limitCharacters(prod.name);
    htmlProducts += `
            <div class="card-product">
                <img class="product-img" src="${prod.image}" alt="${prod.name}">
                <h3 title="${prod.name}">${titleProduct}</h3>
                <p>id: ${prod.id}</p>
                <p>$${prod.price}</p>
            </div>
        `;

    productsContainer.innerHTML = htmlProducts;
  });
}

function limitCharacters(string) {
  let cutedString = string;
  if (cutedString.length > 30) {
    cutedString = cutedString.slice(0, 30);
    cutedString += "...";
  }
  return cutedString;
}


function init() {
  getProducts();
}

// init();
