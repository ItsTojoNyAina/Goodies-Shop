const products = [
  { name: "Album CD Andao", price: 25000 },
  { name: "Album CD Misia classique", price: 35000 },
  { name: "Album CD Misia VIP", price: 65000 },
  { name: "Album USB + Porte clé", price: 35000 },
  { name: "T-shirt", price: 45000 },
  { name: "Coussin", price: 35000 },
  { name: "Casquette", price: 45000 },
  { name: "Tote bag velours", price: 40000 },
  { name: "Tote bag tissu", price: 15000 },
  { name: "Bracelet", price: 5000 },
  { name: "Autocollant", price: 3000 },
  { name: "Petit Autocollant", price: 2000 },
];

const cart = [];
let remiseActive = false;

document.getElementById("example-1").addEventListener("change", (event) => {
  remiseActive = event.target.checked;
  updateCart();
});

document.querySelector(".Valider").addEventListener("click", () => {
  validateOrder();
});

function displayProducts() {
  const productList = document.getElementById("productList");
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "product";
    productElement.innerHTML = `
            <span>
                <strong>${
                  product.name
                }</strong> - ${product.price.toLocaleString()} MGA
            </span>
            <button onclick="addToCart('${product.name}', ${product.price})">
                <i class="fas fa-plus"></i> Ajouter
            </button>
        `;
    productList.appendChild(productElement);
  });
}

displayProducts();

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const total = document.getElementById("total");
  cartItems.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((item) => {
    let itemPrice = item.price;

    // Apply discount if remise is active and price >= 15,000 MGA
    if (remiseActive && itemPrice >= 15000) {
      itemPrice -= 5000;
    }

    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
            <span>${item.name}</span>
            <span>${itemPrice.toLocaleString()} MGA</span>
        `;
    cartItems.appendChild(itemElement);
    totalPrice += itemPrice;
  });

  total.innerHTML = `<i class="fas fa-tags icon"></i>Total: ${totalPrice.toLocaleString()} MGA`;
  calculateChange();
}

function calculateChange() {
  const totalPrice = cart.reduce((sum, item) => {
    let itemPrice = item.price;
    if (remiseActive && itemPrice >= 15000) {
      itemPrice -= 5000;
    }
    return sum + itemPrice;
  }, 0);

  const customerMoney =
    parseFloat(document.getElementById("customerMoney").value) || 0;
  const change = customerMoney - totalPrice;
  const changeElement = document.getElementById("change");

  if (change >= 0) {
    changeElement.innerHTML = `<i class="fas fa-coins icon"></i>Monnaie à rendre: ${change.toLocaleString()} MGA`;
    changeElement.style.color = "#27ae60";
  } else {
    changeElement.innerHTML = `<i class="fas fa-exclamation-triangle icon"></i>Montant insuffisant. Il manque ${(-change).toLocaleString()} MGA`;
    changeElement.style.color = "#c0392b";
  }
}

function validateOrder() {
  const totalPrice = cart.reduce((sum, item) => {
    let itemPrice = item.price;
    if (remiseActive && itemPrice >= 15000) {
      itemPrice -= 5000;
    }
    return sum + itemPrice;
  }, 0);

  const customerMoney =
    parseFloat(document.getElementById("customerMoney").value) || 0;

  //   if (customerMoney >= totalPrice) {
  //     alert(
  //       `Commande validée! Monnaie à rendre: ${(
  //         customerMoney - totalPrice
  //       ).toLocaleString()} MGA`
  //     );
  //   } else {
  //     alert("Montant insuffisant pour valider la commande.");
  //   }
}
