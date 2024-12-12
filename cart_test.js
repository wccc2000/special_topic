const carticon = document.querySelector(".cart");
const cartToggleBtn = document.querySelector(".cart-toggle-btn");

// 切換購物車顯示/隱藏
cartToggleBtn.addEventListener("click", () => {
  carticon.classList.toggle("show");
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
      removeButton.addEventListener("click", () => {
        const qty = item.querySelector(".cart-quantity");
        let currentQty = parseInt(qty.textContent);

        if (currentQty > 1) {
          qty.textContent = currentQty - 1;
        } else {
          // 如果數量為 1，點擊後移除整個商品項目
          item.remove();
        }
      });

      cart.appendChild(item);
      carticon.classList.add("show");
    }

    count = 0;
    quantity.textContent = count;
    addToCart.classList.remove("enabled");
    addToCart.disabled = true;
  });
});
