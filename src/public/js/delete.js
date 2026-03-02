let productsList = document.getElementById("product-list");
let getProductsForm = document.getElementById("getProduct-form");
let url = "http://localhost:3000";

getProductsForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let formData = new FormData(event.target); 

  let data = Object.fromEntries(formData.entries());

  let idProd = data.idProd; 
  
  console.log(
    `We make a GET request to the URL ${url}/api/products/${idProd}`
  );

  let response = await fetch(`${url}/api/products/${idProd}`);

  let productData = await response.json();

  if (response.ok) {
    let product = productData.payload[0];

    showProduct(product);
  } else {
    console.log(productData);
    console.log(productData.message);

    showError(productData.message);
  }

  let product = productData.payload[0]; 

  showProduct(product);
});

function showProduct(product) {
  let htmlProduct = `
        <li class="li-product">
            <img class="product-img" src="${product.image}" alt="${product.name}">
            <p>Id: ${product.id} / Name: ${product.name} / <strong>Price: ${product.price}</strong></p>
        </li>
        <li class="li-button-panel">
        <input type="button" id="deleteProduct_button" value="Delete product">
         </li>
    `;

  productsList.innerHTML = htmlProduct;

  let deleteProduct_button = document.getElementById("deleteProduct_button");

  deleteProduct_button.addEventListener("click", (event) => {
    event.stopPropagation(); 

    let confirmation = confirm("Do you want to remove this product?");

    if (!confirmation) {
      alert("Delete cancel");
    } else {
      deleteProduct(product.id);
    }
  });
}

async function deleteProduct(id) {

  try {
    let response = await fetch(`${url}/api/products/${id}`, {
      method: "DELETE",
    });

    let result = await response.json();

    if (response.ok) {
      alert(result.message);

      productsList.innerHTML = "";
    } else {
      console.error("Error: ", result.message);
      alert("The product could not be deleted.");
    }
  } catch (error) {
    console.error("Error in DELETE request: ", error);
    alert("An error occurred while deleting a product.");
  }
}

function showError(message) {
  productsList.innerHTML = `
        <li class="error-message">
            <p>
                <strong>Error:</strong>
                <span>${message}</span>
            </p>
        </li>
    `;
}
