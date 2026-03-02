let productsList = document.getElementById("product-list");
let getProductsForm = document.getElementById("getProduct-form");
let url = "http://localhost:3000";
let updateFormContainer = document.getElementById("updateFormContainer");

getProductsForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let formData = new FormData(event.target); 
  
  let data = Object.fromEntries(formData.entries());

  let idProd = data.idProd; 

  let response = await fetch(`${url}/api/products/${idProd}`);

  let productData = await response.json();
  

  if (response.ok) {
    let product = productData.payload[0];
    console.log("product: ", product);

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
            <p>
            Id: ${product.id} / 
            Name: ${product.name} / 
            <strong>Price: ${product.price}</strong> / 
            Activo: ${(product.active) ? "Yes" : "No"}
            </p>
        </li>
        <li class="li-button-panel">
        <input type="button" id="updateProduct_button" value="Update product">
         </li>
    `;

  productsList.innerHTML = htmlProduct;

  let updateProduct_button = document.getElementById("updateProduct_button");

  updateProduct_button.addEventListener("click", (event) => {
    event.stopPropagation();

    createForm(product);
  });
}

async function createForm(product) {
  console.table(product);
  console.log("Active product: ", product.active);
  
  let updateFormHTML = `
        <form id="updateProducts_form">
            <input type="hidden" name="id" id="idProd" value="${product.id}" required>
            
            <label for="nameProd">Name</label>
            <input type="text" name="name" id="nameProd" value="${product.name}" required>
            
            <label for="imageProd">Image</label>
            <input type="text" name="image" id="imageProd" value="${product.image}" required>
            
            <label for="priceProd">Price</label>
            <input type="number" name="price" id="priceProd" value="${product.price}" required>

            <label for="categoryProd">Category</label>
            <select name="category" id="categoryProd" required>
                <option value="main-component">Main component</option>
                <option value="peripheral-device">Peripheral device</option>
            </select>
            
            <label for="activeProd">Active</label>
            <select name="active" id="activeProd" required>
                <option value="1">Active</option>
                <option value="0">Disabled</option>
            </select>

            <input type="submit" value="Save product">
            
            
        </form>
    `;

  updateFormContainer.innerHTML = updateFormHTML;

  let updateProducts_form = document.getElementById("updateProducts_form");

  updateProducts_form.addEventListener("submit", (event) => {
    updateProduct(event);
  });
}

async function updateProduct(event) {
  event.preventDefault();
  event.stopPropagation();

  console.log("Preparing form data for the put");

  let formData = new FormData(event.target); 
  
  let data = Object.fromEntries(formData.entries());
  console.log(data); 
  
  try {
    let response = await fetch(`${url}/api/products`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let result = await response.json();
    console.log(result);

    if (response.ok) {
      console.log(result.message);
      alert(result.message);
    } else {
      console.log(result.message);
      alert(alert.message);
    }
  } catch (error) {}
}

function showError(message) {
  productsList.innerHTML = `
        <li class="message-error">
            <p>
                <strong>Error:</strong>
                <span>${message}</span>
            </p>
        </li>
    `;
}
