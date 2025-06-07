// console.log('this is products')
const productContainer = document.getElementById("productContainer");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/ebookstore/products/fetch", {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Failed to fetch products", errorData.message);
      return;
    }

    const result = await response.json();
    const productList = result.products;
    // console.log(productList);

    //creating product card

    productList.forEach((product) => {
      const container = document.createElement("div");
      container.className = "container";

      const bookContainer = document.createElement("div");
      bookContainer.className = "book_container";

      const bookImg = document.createElement("div");
      bookImg.className = "book_img";
      bookImg.style.backgroundImage = `url(${product.image})`
    
      bookContainer.appendChild(bookImg);

      const details = document.createElement("div");
      details.className = "details";
      details.id = `${product._id}`
    
      details.innerHTML = `
                <h2>${product.name}</h2>
                <h3>price : ${product.price}</h3>
                <p>${product.description}</p>
                <button id="buy" class="buy">Buy now</button>
            `;
      container.appendChild(bookContainer);
      container.appendChild(details);

      productContainer.appendChild(container)
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});
