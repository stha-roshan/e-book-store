// console.log('this is products')
const productContainer = document.getElementById("productContainer");

const fetchProducts = async () => {
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
      bookImg.style.backgroundImage = `url(${product.image})`;

      bookContainer.appendChild(bookImg);

      const details = document.createElement("div");
      details.className = "details";
      details.id = `${product._id}`;

      details.innerHTML = `
                <h2>${product.name}</h2>
                <h3>price : ${product.price}</h3>
                <p>${product.description}</p>
                <button class="buy">Buy now</button>
            `;
      container.appendChild(bookContainer);
      container.appendChild(details);

      productContainer.appendChild(container);
    });

    const buyButtons = document.querySelectorAll(".buy");
    buyButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.closest(".details").id;
        // console.log(productId);
        showConfirmBox(productId);
      });
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

const handelBuyNow = async (productId) => {
  //create transaction
  //get the transaction id for the unique transaction uuid
  //use the price transaction uuid and product code as the signed feild
  // create the esewa form
  //pass the details of product such as name price in the form
  //use the hmac key created by signing  price transaction uuid and product code as the signature
  //if payment success then create order
};

const showConfirmBox = async (productId) => {
  try {
    const response = await fetch("/ebookstore/findProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.log(
        "Something went wrong Please try again",
        errorResponse.message
      );
      alert("Something went wrong Please try again");
      return;
    }

    const successResponse = await response.json();
    const productDetail = successResponse.product;

    const popupContainer = document.createElement("div");
    popupContainer.className = "popupContainer";

    popupContainer.innerHTML = `
    <div class='popup_header'>
      <div id = 'cancle_button' class = 'cancle_button'>X</div>
    </div>
    <div class="popup_p_container">
      <div class="popup_p_book_container">
          <div class="popup_p_book_img" style="background: url(${productDetail.image});
          background-size: contain;
          background-position: center center;
          background-repeat: no-repeat;"></div>
      </div>
      <div class="popup_p_details">
          <h2>${productDetail.name}</h2>
          <h3>price : ${productDetail.price}</h3>
          <p>${productDetail.description}</p>
          <h3>Pay with : </h3>
          <img id="e_sewa" class="pay_image e_sewa" src="/images/esewa.png" alt="e-sewa">
      </div>
    </div>
  `;
    document.body.appendChild(popupContainer);
    // console.log(`confirm to buy product : ${productId}`)

    popupContainer.addEventListener("click", (e) => {
      if (e.target.id === "cancle_button") {
        document.body.removeChild(popupContainer);
      }
    });
  } catch (error) {
    console.error(
      "Something went wrong buying product please try again:",
      error
    );
  }
};

//make scroll lock when pop up is active
