// ===============================
// FOOD EXPRESS - JAVASCRIPT
// ===============================


// CART
let cart = [];


// ===============================
// ADD TO CART
// ===============================

function addToCart(name, price, image) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " has been added to your cart!");
}


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

    const cartCount = document.getElementById("cart-count");

    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    cartCount.textContent = totalItems;


    const cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        document.getElementById("subtotal").textContent = "₹0";
        document.getElementById("total").textContent = "₹0";

        return;
    }


    cartItems.innerHTML = "";


    let subtotal = 0;


    cart.forEach((item, index) => {

        subtotal += item.price * item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <div class="cart-item-image">
                    ${item.image}
                </div>

                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>

            </div>


            <div class="quantity-controls">

                <button onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    const delivery = 40;

    const total = subtotal + delivery;


    document.getElementById("subtotal").textContent =
        "₹" + subtotal;

    document.getElementById("total").textContent =
        "₹" + total;
}


// ===============================
// INCREASE QUANTITY
// ===============================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


// ===============================
// DECREASE QUANTITY
// ===============================

function decreaseQuantity(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();
}


// ===============================
// OPEN CART
// ===============================

function openCart() {

    updateCart();

    document.getElementById("cartModal").style.display = "flex";
}


// ===============================
// CLOSE CART
// ===============================

function closeCart() {

    document.getElementById("cartModal").style.display = "none";
}


// ===============================
// LOGIN
// ===============================

function openLogin() {

    document.getElementById("loginModal").style.display = "flex";
}


function closeLogin() {

    document.getElementById("loginModal").style.display = "none";
}


function loginUser(event) {

    event.preventDefault();

    alert("Login successful! Welcome to FoodExpress.");

    closeLogin();
}


// ===============================
// SIGN UP
// ===============================

function showSignup() {

    closeLogin();

    document.getElementById("signupModal").style.display = "flex";
}


function closeSignup() {

    document.getElementById("signupModal").style.display = "none";
}


function showLogin() {

    closeSignup();

    document.getElementById("loginModal").style.display = "flex";
}


function signupUser(event) {

    event.preventDefault();

    alert("Account created successfully!");

    closeSignup();

    openLogin();
}


// ===============================
// CHECKOUT
// ===============================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty. Please add some food first.");

        return;
    }


    let subtotal = 0;

    cart.forEach(item => {

        subtotal += item.price * item.quantity;

    });


    const total = subtotal + 40;


    const confirmOrder = confirm(
        "Your total order amount is ₹" +
        total +
        ".\n\nDo you want to place this order?"
    );


    if (confirmOrder) {

        alert(
            "🎉 Order placed successfully!\n\n" +
            "Thank you for ordering from FoodExpress."
        );

        cart = [];

        updateCart();

        closeCart();
    }
}


// ===============================
// SEARCH FOOD
// ===============================

function searchFood() {

    const searchValue =
        document.getElementById("searchInput")
        .value
        .toLowerCase();


    const foodCards =
        document.querySelectorAll(".food-card");


    foodCards.forEach(card => {

        const foodName =
            card.dataset.name.toLowerCase();


        if (foodName.includes(searchValue)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });
}


// ===============================
// FILTER FOOD
// ===============================

function filterFood(category) {

    const foodCards =
        document.querySelectorAll(".food-card");


    const buttons =
        document.querySelectorAll(".category");


    buttons.forEach(button => {

        button.classList.remove("active");

    });


    event.target.classList.add("active");


    foodCards.forEach(card => {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });


    document.getElementById("searchInput").value = "";

}


// ===============================
// CONTACT FORM
// ===============================

function submitContact(event) {

    event.preventDefault();

    alert(
        "Thank you for contacting FoodExpress! " +
        "We will get back to you soon."
    );

    event.target.reset();
}


// ===============================
// CLOSE MODALS WHEN CLICKING OUTSIDE
// ===============================

window.onclick = function(event) {

    const loginModal =
        document.getElementById("loginModal");

    const signupModal =
        document.getElementById("signupModal");

    const cartModal =
        document.getElementById("cartModal");


    if (event.target === loginModal) {

        closeLogin();

    }


    if (event.target === signupModal) {

        closeSignup();

    }


    if (event.target === cartModal) {

        closeCart();

    }

};
