let productsList = document.getElementById("product-list");
let getProductsForm = document.getElementById("getProduct-form");
let url = "http://localhost:3000";

getProductsForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let formData = new FormData(event.target); 
  
  console.log(formData); 
  
  let data = Object.fromEntries(formData.entries());

  console.log(data);

  let idProd = data.idProd;
  console.log(idProd);

  console.log(
    `We make a GET request to the URL ${url}/api/products/${idProd}`
  );

  let response = await fetch(`${url}/api/products/${idProd}`);

  let productsData = await response.json();

  if (response.ok) {
    let product = productsData.payload[0];
    console.log("product: ", product);

    showProduct(product);
  } else {
    console.log(productsData);
    console.log(productsData.message);

    showError(productsData.message);
  }

  showProduct(product);
});

function showProduct(product) {
  let htmlProduct = `
        <li class="li-product">
            <img class="product-img" src="${product.image}" alt="${product.name}">
            <p>
            Id: ${product.id} / 
            Name: ${product.name} / 
            <strong>Price: ${product.price}</strong> / 
            Active: ${(product.active) ? "Yes" : "No"}
            </p>
        </li>
    `;

  productsList.innerHTML = htmlProduct;
}

function showError(message) {
  productsList.innerHTML = `
        <li class="mensaje-error">
            <p>
                <strong>Error:</strong>
                <span>${message}</span>
            </p>
        </li>
    `;
}
