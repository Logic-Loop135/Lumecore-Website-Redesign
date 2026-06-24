
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function openCart() {
    document.getElementById("cartDrawer").classList.add("active");
    renderCart();
}

function closeCart() {
    document.getElementById("cartDrawer").classList.remove("active");
    // Reset view if they closed during checkout
    document.querySelector(".cart-items").style.display = "block";
    document.getElementById("checkoutForm").style.display = "none";
    document.querySelector(".checkout-btn").style.display = "block";
}

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    
    saveAndRefresh();
    openCart(); 
}

function saveAndRefresh() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    const cartItemsList = document.querySelector(".cart-items");
    const cartTotal = document.getElementById("cartTotal");
    let total = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = "<p>Your cart is empty 🛒</p>";
        if(cartTotal) cartTotal.textContent = "Total: $0.00";
        return;
    }

    cartItemsList.innerHTML = ""; 

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
       cartItemsList.innerHTML += `
    <div class="cart-item" style="display:flex; gap:10px; align-items:center; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:8px;">
        
        <img src="${item.image}" style="width:50px; height:50px; object-fit:cover; border-radius:6px;">
        
        <div style="flex:1;">
            <p style="margin:0"><strong>${item.name}</strong></p>
            <small>$${item.price} x ${item.quantity}</small>
        </div>

        <button class="remove-icon" onclick="removeFromCart(${index})">✕</button> 
    </div>
`;
    });

    if(cartTotal) {
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveAndRefresh();
}

function closeCheckout() {
    document.getElementById("checkoutPage").style.display = "none";
}

// NEW: Advanced Checkout Logic
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    document.getElementById("cartDrawer").classList.remove("active");
    document.getElementById("checkoutPage").style.display = "block";
    renderCheckoutPage();
}

function processOrder(event) {
    event.preventDefault();
    const name = document.getElementById("shipName").value;
    alert(`Order Placed for ${name}! Check your email for shipping updates.`);
    cart = [];
    saveAndRefresh();
    closeCart();
}

function renderCheckoutPage() {
    const container = document.getElementById("checkoutItems");
    const totalBox = document.getElementById("checkoutTotal");
    const subTotalBox = document.getElementById("subTotal");

    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        container.innerHTML += `
            <div class="checkout-item">
               <img src="${item.image}">
                <div>
                    <p>${item.name}</p>
                    <small>$${item.price}</small>

                    <div class="qty-btn">
                        <button onclick="changeQty(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQty(${index}, 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    });

    subTotalBox.innerText = "$" + total;
    totalBox.innerText = "$" + total;
}

function changeQty(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveAndRefresh();
    renderCheckoutPage();
}

function placeOrder() {
    alert("Order placed successfully! Check your email.");

    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById("checkoutPage").style.display = "none";
}
window.onload = renderCart;




/*animation*/
const headings = document.querySelectorAll("h1");

// set initial styles via JS
headings.forEach(h1 => {
  h1.style.opacity = "0";
  h1.style.transition = "opacity 0.8s ease-in-out";
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"; // fade in
    } else {
      entry.target.style.opacity = "0"; // fade out
    }
  });
}, { threshold: 0.3 });

headings.forEach(h1 => observer.observe(h1));

const cards = document.querySelectorAll(".product-card");

cards.forEach((card, i) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
});

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    } else {
      entry.target.style.opacity = "0";
      entry.target.style.transform = "translateY(40px)";
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => cardObserver.observe(card));

const images = document.querySelectorAll(".product-image");

// initial state (injected via JS)
images.forEach(img => {
  img.style.opacity = "0";
  img.style.transform = "scale(0.9)";
  img.style.transition = "opacity 0.7s ease, transform 0.7s ease";
});

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";        // fade in
      entry.target.style.transform = "scale(1)"; // zoom to normal
    } else {
      entry.target.style.opacity = "0";        // fade out
      entry.target.style.transform = "scale(0.7)";
    }
  });
}, { threshold: 0.20 });

images.forEach(img => imageObserver.observe(img));