document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.querySelector(".cart-items");
  const totalPriceElement = document.querySelector(".total-price");

  function updateTotal() {
    let total = 0;
    document.querySelectorAll(".cart-item").forEach(item => {
      const price = parseFloat(item.getAttribute("data-price"));
      total += price;
    });
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
  }

  function removeItem(event) {
    const item = event.target.closest(".cart-item");
    item.remove();
    updateTotal();
  }

  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", event => {
      const product = event.target.closest(".product");
      const name = product.querySelector("h3").textContent;
      const price = product.getAttribute("data-price");

      const item = document.createElement("div");
      item.className = "cart-item flex justify-between items-center bg-white p-2 my-2 border rounded";
      item.setAttribute("data-price", price);
      item.innerHTML = `
        <span>${name}</span>
        <span>$${price}</span>
        <button class="remove-btn text-red-500 hover:underline ml-4">Remove</button>
      `;
      item.querySelector(".remove-btn").addEventListener("click", removeItem);

      cartItemsContainer.appendChild(item);
      updateTotal();
    });
  });

  // Attach remove function to existing buttons (if any)
  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", removeItem);
  });
});
