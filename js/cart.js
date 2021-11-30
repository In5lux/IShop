const cart = function () {
  const cartBtn = document.querySelector(".button-cart");
  const cart = document.querySelector("#modal-cart");
  const closeBtn = document.querySelector(".modal-close");

  const goodsContainer = document.querySelector('.long-goods-list');

  const cartTable = document.querySelector('.cart-table__goods');

  cart.addEventListener('click',(event)=>{
    if(!event.target.closest('.modal')){
      cart.style.display = "none"
    }
  });



  cartBtn.addEventListener("click", function () {
    cart.style.display = "flex";
    closeBtn.addEventListener("click", () => (cart.style.display = "none"));
  });

  window.addEventListener('keydown',(e)=>{
    if(e.key==='Escape'){cart.style.display = "none"}
  });
};

cart();
