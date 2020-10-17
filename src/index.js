import "./style.css";

const cartBtnEl = document.querySelector(".btn-cart");
const products_gridEl = document.querySelector(".products-grid");
const cartListEl = document.querySelector("#cartList");
const cartListTotalEl = document.querySelector(".cartList-total");
const checkBtnCheckoutEl = document.querySelector(".btn-checkout");
const allProducts = [];
for (let i = 0; i < 10; i++) {
  allProducts.push({
    id: i,
    img: "https://loremflickr.com/320/24"+i+"/cat,animal",
    name: "Lorem ipsum dolor sit amet " + (i + 1),
    price: 29 + Math.floor(Math.random() * 50) * i,
  });
}
let cart = [];
function getProductCard(product) {
  const htmlCode = `<div class="card w-100" style="width: 18rem;" id="product-${product.id}">
                    <img src="${product.img}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text">${product.price}$</p>
                      <buttton class="btn btn-dark addtocart">Add to Cart</button>
                    </div>
                  </div>`;
  return htmlCode;
}
allProducts.forEach((product, i) => {
  products_gridEl.insertAdjacentHTML("beforeend", getProductCard(product));
  const productCardEl = products_gridEl.querySelector(".card:last-child");
  const btn = productCardEl.querySelector(".addtocart");
  btn.addEventListener("click", () => {
    addToCart(allProducts[i]);
  });
});
function addToCart(product) {
  const index = cart.findIndex((el) => el.id === product.id);
  if (index !== -1) {
    alert("this Item is already in the cart");
  } else {
    cart.push(
      Object.assign(
        {
          amount: 1,
          total: product.price,
        },
        product
      )
    );
    calculateTotal();
    const cartItemHTML = `  <div class="row cartList-item">
            <div class="col-4">
              <img
                class="product-img"
                src="${product.img}"
                alt="${product.name}"
              />
            </div>
            <div class="col-8">
              <h3 class="product-name">${product.name}</h3>
              <div class="input-group row mb-3 align-items-center">
                <label class="col-2">Qte:</label>
                <input
                  type="number"
                  class="form-control col-3 product-qte"
                  aria-describedby="basic-addon1"
                  value="1"
                  min="1"
                  max="100"
                />
                <p class="col-5 m-0">
                  Price: <span class="product-price">${product.price}</span>$
                </p>
                <button class="btn btn-outline-danger btn-remove">
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>`;
    cartListEl
      .querySelector(".cartItems")
      .insertAdjacentHTML("beforeend", cartItemHTML);
    const cartItemEl = cartListEl.querySelector(".cartList-item:last-child");
    const qteInput = cartItemEl.querySelector(".product-qte");
    const removeBtn = cartItemEl.querySelector(".btn-remove");
    const productPriceEl = cartItemEl.querySelector(".product-price");
    qteInput.addEventListener("change", function (e) {
      const value = parseInt(e.target.value);
      const index = cart.findIndex((el) => el.id === product.id);
      cart[index].amount = value;
      cart[index].total = value * cart[index].price;
      productPriceEl.innerHTML = cart[index].total;
      calculateTotal();
    });
    removeBtn.addEventListener("click", function (e) {
      cart = cart.filter((el) => el.id !== product.id);
      cartItemEl.remove();
      if (cart.length === 0) cartBtnEl.classList.remove("active");
      cartBtnEl.setAttribute("data-count", cart.length);
      calculateTotal();
    });
  }
  const itemOnCart = cart.length ? cart.length : "";
  cartBtnEl.setAttribute("data-count", itemOnCart);
  if (itemOnCart !== "") cartBtnEl.classList.add("active");
  else cartBtnEl.classList.remove("active");
}
cartBtnEl.addEventListener("click", function () {
  cartListEl.classList.add("active");
});
checkBtnCheckoutEl.addEventListener("click", function () {
  if (cart.length) {
    const total = calculateTotal();
    cart = [];
    cartListEl.querySelector(".cartItems").innerHTML = "";
    cartBtnEl.classList.remove("active");
    alert(
      "Thanks for your purchase.\n you have paid " +
        total +
        "$.\n Have nice day!"
    );
    calculateTotal();
  } else {
    alert("No items in the cart");
  }
});
function calculateTotal() {
  const cartTotal = cart.reduce((a, b) => a + b.total, 0);
  cartListTotalEl.innerHTML = cartTotal;
  return cartTotal;
}
cartListEl.querySelectorAll(".bg,.btn-closeCart").forEach((el) => {
  el.addEventListener("click", function (e) {
    cartListEl.classList.remove("active");
  });
});
