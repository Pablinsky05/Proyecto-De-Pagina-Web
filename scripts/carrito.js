function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartBody = document.getElementById("cart-body");
    const totalPrice = document.getElementById("total-price");

    cartBody.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.size}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary change-qty" data-index="${index}" data-action="decrease">−</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-primary change-qty" data-index="${index}" data-action="increase">+</button>
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-danger remove-item" data-index="${index}">🗑</button>
                </td>
            </tr>
        `;
    });

    totalPrice.innerText = total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", function () {
    loadCart();

    // Incrementar o disminuir cantidad
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("change-qty")) {
            const index = e.target.getAttribute("data-index");
            const action = e.target.getAttribute("data-action");
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            if (action === "increase") {
                cart[index].quantity += 1;
            } else if (action === "decrease") {
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                }
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        }
    });

    // Eliminar un producto
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.getAttribute("data-index");
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        }
    });

    // Vaciar todo el carrito
    document.getElementById("clear-cart").addEventListener("click", function () {
        if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
            localStorage.removeItem("cart");
            loadCart();
        }
    });

    // Simular pago
    document.getElementById("checkout").addEventListener("click", function () {
        if (JSON.parse(localStorage.getItem("cart"))?.length > 0) {
            alert("Gracias por tu compra! 🎉");
            localStorage.removeItem("cart");
            loadCart();
        } else {
            alert("Tu carrito está vacío.");
        }
    });
});
