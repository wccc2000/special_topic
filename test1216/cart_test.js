// 移除購物車中的商品並同步更新 localStorage
window.removeCartItem = function (id) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const itemIndex = cartItems.findIndex((item) => item.id === id);

  if (itemIndex !== -1) {
    // 減少數量
    if (cartItems[itemIndex].quantity > 1) {
      cartItems[itemIndex].quantity -= 1; // 數量 -1
    } else {
      // 如果數量等於 1，則從陣列中移除該商品
      cartItems.splice(itemIndex, 1);
    }
  }
  // 更新 localStorage
  localStorage.setItem("cart", JSON.stringify(cartItems));

  // 更新購物車 DOM
  const cartItemElement = document.querySelector(`.cart-item[data-id="${id}"]`);
  if (cartItemElement) {
    const updatedItem = cartItems.find((item) => item.id === id);

    if (updatedItem) {
      // 更新數量顯示
      const quantityElement = cartItemElement.querySelector(".cart-quantity");
      quantityElement.textContent = updatedItem.quantity;
    } else {
      // 如果商品被完全移除，從 DOM 中刪除元素
      cartItemElement.remove();
    }
  }
  // 重新載入購物車畫面，確保顯示是最新的
  loadCartFromLocalStorage();
};

// 定義為全域函數
window.loadCartFromLocalStorage = function () {
  const cart = document.querySelector(".cart-items");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // 清空購物車顯示區，避免重複顯示
  cart.innerHTML = "";

  cartItems.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    // removeCartItem;
    cartItem.dataset.id = item.id;

    cartItem.innerHTML = `
      <div class="cart-item-details">
          <span>${item.name}</span>
          <span class="remove-item">✖</span>
      </div>
      <span>NT$${item.price} x <span class="cart-quantity">${item.quantity}</span></span>
    `;
    // 設定移除按鈕的事件監聽器
    const removeButton = cartItem.querySelector(".remove-item");
    removeButton.addEventListener("click", () => removeCartItem(item.id));

    cart.appendChild(cartItem);
  });
};

const carticon = document.querySelector(".cart");
const cartToggleBtn = document.querySelector(".cart-toggle-btn");

// 切換購物車顯示/隱藏
cartToggleBtn.addEventListener("click", () => {
  carticon.classList.toggle("show");
});

// 載入 localStorage 中的購物車資料
document.addEventListener("DOMContentLoaded", function () {
  loadCartFromLocalStorage();
});

document.querySelectorAll(".product").forEach((product) => {
  const minus = product.querySelector(".minus");
  const plus = product.querySelector(".plus");
  const quantity = product.querySelector(".quantity span");
  const addToCart = product.querySelector(".add-to-cart");

  let count = 0;

  plus?.addEventListener("click", () => {
    count++;
    quantity.textContent = count;
    addToCart.classList.add("enabled");
    addToCart.disabled = false;
  });

  minus?.addEventListener("click", () => {
    if (count > 0) {
      count--;
      quantity.textContent = count;
    }
    if (count === 0) {
      addToCart.classList.remove("enabled");
      addToCart.disabled = true;
    }
  });

  addToCart?.addEventListener("click", () => {
    const cart = document.querySelector(".cart-items");
    const id = product.dataset.id;
    const name = product.dataset.name;
    const price = product.dataset.price;

    let existingItem = cart.querySelector(`[data-id="${id}"]`);

    if (existingItem) {
      const qty = existingItem.querySelector(".cart-quantity");
      qty.textContent = parseInt(qty.textContent) + count;
    } else {
      const item = document.createElement("div");
      item.classList.add("cart-item");
      item.dataset.id = id;
      item.innerHTML = `
        <div class="cart-item-details">
            <span>${name}</span>
            <span class="remove-item">✖</span>
        </div>
        <span>NT$${price} x <span class="cart-quantity">${count}</span></span>
        `;

      const removeButton = item.querySelector(".remove-item");
      removeButton.addEventListener("click", () => removeCartItem(id));

      // removeButton.addEventListener("click", () => {
      //   const qty = item.querySelector(".cart-quantity");
      //   let currentQty = parseInt(qty.textContent);

      //   if (currentQty > 1) {
      //     qty.textContent = currentQty - 1;
      //   } else {
      //     // 如果數量為 1，點擊後移除整個商品項目
      //     item.remove();
      //   }
      // });

      cart.appendChild(item);
      carticon.classList.add("show");
    }

    updateLocalStorage(id, name, price, count);
    count = 0;
    quantity.textContent = count;
    addToCart.classList.remove("enabled");
    addToCart.disabled = true;
  });

  // 更新 localStorage 資料
  function updateLocalStorage(id, name, price, quantity) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cartItems.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ id, name, price, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
  }

  // 從 localStorage 載入購物車資料
  // function loadCartFromLocalStorage() {
  //   const cart = document.querySelector(".cart-items");
  //   const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  //   cartItems.forEach((item) => {
  //     const cartItem = document.createElement("div");
  //     cartItem.classList.add("cart-item");
  //     cartItem.dataset.id = item.id;

  //     cartItem.innerHTML = `
  //       <div class="cart-item-details">
  //           <span>${item.name}</span>
  //           <span class="remove-item">✖</span>
  //       </div>
  //       <span>NT$${item.price} x <span class="cart-quantity">${item.quantity}</span></span>
  //     `;

  //     const removeButton = cartItem.querySelector(".remove-item");
  //     removeButton.addEventListener("click", () => removeCartItem(item.id));

  //     cart.appendChild(cartItem);
  //   });
  // }

  // 移除購物車中的商品或減少數量並同步更新 localStorage
  // function removeCartItem(id) {
  //   let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  //   // 找到指定商品的索引
  //   const itemIndex = cartItems.findIndex((item) => item.id === id);

  //   if (itemIndex !== -1) {
  //     // 如果找到該商品
  //     if (cartItems[itemIndex].quantity > 1) {
  //       // 如果數量 > 1，數量減少
  //       cartItems[itemIndex].quantity -= 1;
  //     } else {
  //       // 如果數量等於 1，將商品移出購物車
  //       cartItems.splice(itemIndex, 1);
  //     }

  //     // 更新 localStorage
  //     localStorage.setItem("cart", JSON.stringify(cartItems));

  //     // 更新 DOM
  //     const cartItemElement = document.querySelector(
  //       `.cart-item[data-id="${id}"]`
  //     );
  //     if (cartItemElement) {
  //       if (cartItems[itemIndex]) {
  //         // 如果商品還存在於購物車，更新數量
  //         const quantityElement =
  //           cartItemElement.querySelector(".cart-quantity");
  //         quantityElement.textContent = cartItems[itemIndex].quantity;
  //       } else {
  //         // 如果商品已被移除，從 DOM 中刪除整個元素
  //         cartItemElement.remove();
  //       }
  //     }
  //   }
  // }
});
