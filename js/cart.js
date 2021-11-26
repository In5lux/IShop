const cart = function () {
  const cartBtn = document.querySelector(".button-cart");
  const cart = document.querySelector("#modal-cart");
  const closeBtn = document.querySelector(".modal-close");
  cartBtn.addEventListener("click", function () {
    cart.style.display = "flex";
    closeBtn.addEventListener("click", () => (cart.style.display = "none"));
  });
};

cart();
