let releaseProducts_container = document.getElementById("releaseProducts-container");
let releaseUsers_container = document.getElementById("releaseUsers-container");
let url = "http://localhost:3000";

releaseProducts_container.addEventListener("submit", async (event) => {
  event.preventDefault();

  let formData = new FormData(event.target);

  let data = Object.fromEntries(formData.entries());

  try {
    let response = await fetch(`${url}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log(response);

      let result = await response.json();

      console.log(result);
      alert(result.message);
    }
  } catch (error) {
    console.error("Error sending data: ", error);
    alert("Error while processing request");
  }
});


releaseUsers_container.addEventListener("submit", async event => {
  event.preventDefault();

  let formData = new FormData(event.target); 

  let data = Object.fromEntries(formData.entries()); 
  
  console.log(data);
  
  try {
    let response = await fetch(`${url}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log(response);

      let result = await response.json();

      console.log(result);
      alert(result.message);
    }
  } catch (error) {
    console.error("Error sending data: ", error);
    alert("Error while processing request");
  }

});