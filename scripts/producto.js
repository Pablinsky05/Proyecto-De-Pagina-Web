document.addEventListener("DOMContentLoaded", function () {
    const sizeButtons = document.querySelectorAll(".size-btn");

    sizeButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Remover la clase 'selected' de todos los botones
            sizeButtons.forEach(btn => btn.classList.remove("selected"));
            // Agregar la clase 'selected' solo al botón clickeado
            this.classList.add("selected");
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const comprarBtn = document.querySelector(".btn-success"); // Botón de comprar
    const productName = document.querySelector("h2").innerText; // Obtiene el nombre del producto
    const productPrice = parseFloat(document.querySelector(".text-primary").innerText.replace("$", "")); // Obtiene el precio
    let selectedSize = "";

    // Manejo de selección de tallas (si existen)
    const sizeButtons = document.querySelectorAll(".size-btn");
    if (sizeButtons.length > 0) {
        sizeButtons.forEach(button => {
            button.addEventListener("click", function () {
                selectedSize = this.getAttribute("data-size");

                // Resaltar la talla seleccionada
                sizeButtons.forEach(btn => btn.classList.remove("btn-primary"));
                this.classList.add("btn-primary");
            });
        });
    }

    // Evento para agregar al carrito
    comprarBtn.addEventListener("click", function () {
        // Verificar si el producto requiere selección de talla
        if (sizeButtons.length > 0 && !selectedSize) {
            alert("Por favor, selecciona una talla antes de comprar.");
            return;
        }

        // Obtener carrito desde localStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Buscar si el producto ya está en el carrito con la misma talla (o sin talla)
        const existingProduct = cart.find(item => item.name === productName && item.size === selectedSize);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                size: selectedSize,
                quantity: 1
            });
        }

        // Guardar en localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Producto agregado al carrito.");
    });
});
