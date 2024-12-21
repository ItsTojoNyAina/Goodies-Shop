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
    { name: "Petit Autocollant", price: 2000 }
];

const cart = [];

function displayProducts() {
    const productList = document.getElementById('productList');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <span>
                <strong>${product.name}</strong> - ${product.price.toLocaleString()} MGA
            </span>
            <button onclick="addToCart('${product.name}', ${product.price})">
                <i class="fas fa-plus"></i> Ajouter
            </button>
        `;
        productList.appendChild(productElement);
    });
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const total = document.getElementById('total');
    cartItems.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price.toLocaleString()} MGA</span>
        `;
        cartItems.appendChild(itemElement);
        totalPrice += item.price;
    });

    total.innerHTML = `<i class="fas fa-tags icon"></i>Total: ${totalPrice.toLocaleString()} MGA`;
    calculateChange();
}

function calculateChange() {
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    const customerMoney = parseFloat(document.getElementById('customerMoney').value) || 0;
    const change = customerMoney - totalPrice;
    const changeElement = document.getElementById('change');

    if (change >= 0) {
        changeElement.innerHTML = `<i class="fas fa-coins icon"></i>Monnaie à rendre: ${change.toLocaleString()} MGA`;
        changeElement.style.color = '#27ae60';
    } else {
        changeElement.innerHTML = `<i class="fas fa-exclamation-triangle icon"></i>Montant insuffisant. Il manque ${(-change).toLocaleString()} MGA`;
        changeElement.style.color = '#c0392b';
    }
}

displayProducts();
