const cart = function () {
  const cartBtn = document.querySelector('.button-cart');
  const cart = document.querySelector('#modal-cart');
  const closeBtn = document.querySelector('.modal-close');

  const cartTable = document.querySelector('.cart-table__goods');

  const modalForm = document.querySelector('.modal-form');

  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart.filter((good) => good.id !== id);
    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCart(JSON.parse(localStorage.getItem('cart')));
  };

  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart.map((good) => {
      if (good.id === id) {
        good.count++;
      }
      return good;
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCart(JSON.parse(localStorage.getItem('cart')));
  };

  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart.map((good) => {
      if (good.id === id) {
        if (good.count > 0) {
          good.count--;
        }
      }
      return good;
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCart(JSON.parse(localStorage.getItem('cart')));
  };

  const goodsContainer = document.querySelector('.long-goods-list');

  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem('goods'));
    const clickedGood = goods.find((good) => good.id === id);
    const cart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
    if (cart.some((good) => good.id === clickedGood.id)) {
      cart.map((good) => {
        if (good.id === clickedGood.id) {
          good.count++;
        }
      });
    } else {
      clickedGood.count = 1;
      cart.push(clickedGood);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const renderCart = (goods) => {
    const totalPrice = document.querySelector('.card-table__total');
    let total = 0;
    cartTable.innerHTML = '';
    totalPrice.textContent = '';
    goods.forEach((good) => {
      const tr = document.createElement('tr');
      const currentTotalPrice = parseInt(good.price) * parseInt(good.count);
      tr.innerHTML = `
	  	<td>${good.name}</td>
        <td>${good.price}</td>
        <td><button class="cart-btn-minus">-</button></td>
        <td>${good.count}</td>
        <td><button class="cart-btn-plus">+</button></td>
        <td>${currentTotalPrice}</td>
        <td><button class="cart-btn-delete">x</button></td>
	  `;
      cartTable.append(tr);
      total += currentTotalPrice;
      totalPrice.textContent = `${total}`;
      tr.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-btn-minus')) {
          minusCartItem(good.id);
        } else if (e.target.classList.contains('cart-btn-plus')) {
          plusCartItem(good.id);
        } else if (e.target.classList.contains('cart-btn-delete')) {
          deleteCartItem(good.id);
        }
      });
    });
  };

  const sendForm = () => {
    const totalPrice = parseInt(
      document.querySelector('.card-table__total').textContent
    );
    const name = document.querySelector('.modal-input[name="nameCustomer"]');
    const phone = document.querySelector('.modal-input[name="phoneCustomer"]');
    const cartArray = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];

    if (cartArray.length !== 0) {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          cart: cartArray,
          name: name.value,
          phone: phone.value,
          total_price: totalPrice,
        }),
      }).then(() => {
        cart.style.display = 'none';
        name.value = '';
        phone.value = '';
      });
    }
  };

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendForm();
  });

  cartBtn.addEventListener('click', function () {
    const cartArray = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
    renderCart(cartArray);
    cart.style.display = 'flex';
    closeBtn.addEventListener('click', () => (cart.style.display = 'none'));
    cart.addEventListener('click', (event) => {
      if (
        !event.target.closest('.modal') &&
        event.target.classList.contains('overlay')
      ) {
        cart.style.display = 'none';
      }
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        cart.style.display = 'none';
      }
    });
  });

  if (goodsContainer) {
    goodsContainer.addEventListener('click', (event) => {
      if (event.target.closest('.add-to-cart')) {
        const buttonToCart = event.target.closest('.add-to-cart');
        const goodId = buttonToCart.dataset.id;
        addToCart(goodId);
      }
    });
  }
};

cart();
