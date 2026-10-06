// =====================================================
// FOODHUB - COMPLETE FRONTEND JAVASCRIPT
// =====================================================

// -----------------------------
// Global data
// -----------------------------

let foods = [];
let restaurants = [];
let cart = [];


// -----------------------------
// Food images
// -----------------------------

const foodImages = {
    pizza:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",

    burger:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",

    biryani:
        "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=80",

    noodles:
        "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=900&q=80",

    dosa:
        "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=900&q=80",

    dessert:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80",

    fries:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80",

    default:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
};


// -----------------------------
// Restaurant images
// -----------------------------

const restaurantImages = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",

    "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=80",

    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",

    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80",

    "https://images.unsplash.com/photo-1579684947550-22e945225d9a?auto=format&fit=crop&w=1000&q=80",

    "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=80"
];


// =====================================================
// PAGE START
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("🍔 FoodHub frontend loaded");

    loadRestaurants();
    loadFoods();

    setupCartButton();
    setupSearch();

});


// =====================================================
// LOAD RESTAURANTS
// =====================================================

async function loadRestaurants() {

    try {

        const response = await fetch("/api/restaurants");

        if (!response.ok) {
            throw new Error("Unable to load restaurants");
        }

        restaurants = await response.json();

        console.log("Restaurants loaded:", restaurants);

        displayRestaurants();

    } catch (error) {

        console.error("Restaurant loading error:", error);

        const container = document.getElementById("restaurantContainer");

        if (container) {
            container.innerHTML = `
                <p style="text-align:center;">
                    Unable to load restaurants.
                </p>
            `;
        }
    }
}


// =====================================================
// LOAD FOODS
// =====================================================

async function loadFoods() {

    try {

        const response = await fetch("/api/foods");

        if (!response.ok) {
            throw new Error("Unable to load foods");
        }

        foods = await response.json();

        console.log("Foods loaded:", foods);

        displayFoods(foods);

    } catch (error) {

        console.error("Food loading error:", error);

        const container = document.getElementById("foodContainer");

        if (container) {
            container.innerHTML = `
                <p style="text-align:center;">
                    Unable to load food menu.
                </p>
            `;
        }
    }
}


// =====================================================
// RESTAURANTS
// =====================================================

function displayRestaurants() {

    const container = document.getElementById("restaurantContainer");

    if (!container) return;

    if (restaurants.length === 0) {

        container.innerHTML = `
            <p>No restaurants available.</p>
        `;

        return;
    }

    container.innerHTML = restaurants.map((restaurant, index) => {

        const image =
            restaurant.image ||
            restaurantImages[index % restaurantImages.length];

        const restaurantName =
            restaurant.name || "Restaurant";

        const cuisine =
            restaurant.cuisine || "Multi Cuisine";

        const location =
            restaurant.location || "Bangalore";

        const rating =
            restaurant.rating || "4.5";

        return `
            <div
                class="restaurant-card"
                data-restaurant="${escapeAttribute(restaurantName)}"
                style="cursor:pointer;"
            >

                <div class="restaurant-image">

                    <img
                        src="${image}"
                        alt="${escapeAttribute(restaurantName)}"
                    >

                    <div class="restaurant-rating">
                        ⭐ ${rating}
                    </div>

                </div>

                <div class="restaurant-info">

                    <h3>${escapeHTML(restaurantName)}</h3>

                    <p>
                        🍽️ ${escapeHTML(cuisine)}
                    </p>

                    <p>
                        📍 ${escapeHTML(location)}
                    </p>

                    <button
                        class="restaurant-menu-button"
                        type="button"
                    >
                        View Menu →
                    </button>

                </div>

            </div>
        `;

    }).join("");


    // Attach click events to restaurant cards

    const cards =
        container.querySelectorAll(".restaurant-card");

    cards.forEach(card => {

        card.addEventListener("click", () => {

            const restaurantName =
                card.dataset.restaurant;

            openRestaurant(restaurantName);

        });

    });
}


// =====================================================
// OPEN RESTAURANT MENU
// =====================================================

function openRestaurant(restaurantName) {

    console.log("Opening restaurant:", restaurantName);

    const restaurantFoods = foods.filter(food => {

        return String(food.restaurant || "")
            .trim()
            .toLowerCase() ===
            String(restaurantName)
                .trim()
                .toLowerCase();

    });


    const foodSection =
        document.getElementById("foods");

    const heading =
        foodSection?.querySelector("h2");


    if (heading) {

        heading.textContent =
            `${restaurantName} Menu`;

    }


    displayFoods(restaurantFoods);


    if (foodSection) {

        foodSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    if (restaurantFoods.length === 0) {

        showNotification(
            `No menu items found for ${restaurantName}`
        );

    }

}


// =====================================================
// SHOW ALL FOODS
// =====================================================

function showAllFoods() {

    const heading =
        document.querySelector("#foods h2");

    if (heading) {
        heading.textContent = "Popular Food";
    }

    displayFoods(foods);

}


// =====================================================
// DISPLAY FOODS
// =====================================================

function displayFoods(foodList) {

    const container =
        document.getElementById("foodContainer");

    if (!container) return;


    if (!foodList || foodList.length === 0) {

        container.innerHTML = `
            <div style="
                width:100%;
                text-align:center;
                padding:40px;
            ">

                <h3>No food items found</h3>

                <p>
                    Try another restaurant or category.
                </p>

                <button
                    onclick="showAllFoods()"
                    style="
                        margin-top:15px;
                        padding:12px 20px;
                        border:none;
                        border-radius:10px;
                        cursor:pointer;
                    "
                >
                    Show All Food
                </button>

            </div>
        `;

        return;
    }


    container.innerHTML = foodList.map((food, index) => {

        const image =
            food.image ||
            getFoodImage(food);


        const foodId =
            food._id || `food-${index}`;


        return `
            <div
                class="food-card"
                data-food-id="${escapeAttribute(foodId)}"
            >

                <div class="food-image">

                    <img
                        src="${image}"
                        alt="${escapeAttribute(food.name || "Food")}"
                    >

                    ${
                        food.rating
                        ? `
                            <div class="food-rating">
                                ⭐ ${food.rating}
                            </div>
                        `
                        : ""
                    }

                </div>


                <div class="food-info">

                    <h3>
                        ${escapeHTML(food.name || "Delicious Food")}
                    </h3>

                    <p class="food-restaurant">
                        ${escapeHTML(food.restaurant || "FoodHub")}
                    </p>

                    <p class="food-description">
                        ${escapeHTML(
                            food.description ||
                            "Fresh and delicious food prepared with quality ingredients."
                        )}
                    </p>


                    <div class="food-bottom">

                        <strong>
                            ₹${Number(food.price || 0)}
                        </strong>

                        <button
                            class="add-cart-button"
                            type="button"
                        >
                            Add to Cart
                        </button>

                    </div>

                </div>

            </div>
        `;

    }).join("");


    // Add buttons after cards are created

    const buttons =
        container.querySelectorAll(".add-cart-button");


    buttons.forEach((button, index) => {

        button.addEventListener("click", event => {

            event.stopPropagation();

            addToCart(foodList[index]);

        });

    });

}


// =====================================================
// FOOD IMAGE
// =====================================================

function getFoodImage(food) {

    const name =
        String(food.name || "").toLowerCase();

    const category =
        String(food.category || "").toLowerCase();


    if (
        name.includes("pizza") ||
        category.includes("pizza")
    ) {
        return foodImages.pizza;
    }


    if (
        name.includes("burger") ||
        category.includes("burger")
    ) {
        return foodImages.burger;
    }


    if (
        name.includes("biryani") ||
        category.includes("biryani")
    ) {
        return foodImages.biryani;
    }


    if (
        name.includes("noodle") ||
        category.includes("noodle")
    ) {
        return foodImages.noodles;
    }


    if (
        name.includes("dosa") ||
        category.includes("south")
    ) {
        return foodImages.dosa;
    }


    if (
        name.includes("fries") ||
        name.includes("french")
    ) {
        return foodImages.fries;
    }


    if (
        name.includes("cake") ||
        name.includes("gulab") ||
        name.includes("dessert") ||
        category.includes("dessert")
    ) {
        return foodImages.dessert;
    }


    return foodImages.default;
}


// =====================================================
// SEARCH
// =====================================================

function setupSearch() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;


    input.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            searchFood();

        }

    });

}


function searchFood() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;


    const search =
        input.value.trim().toLowerCase();


    if (!search) {

        showAllFoods();

        return;

    }


    const results =
        foods.filter(food => {

            return (
                String(food.name || "")
                    .toLowerCase()
                    .includes(search)

                ||

                String(food.category || "")
                    .toLowerCase()
                    .includes(search)

                ||

                String(food.restaurant || "")
                    .toLowerCase()
                    .includes(search)
            );

        });


    const heading =
        document.querySelector("#foods h2");

    if (heading) {

        heading.textContent =
            `Search Results for "${input.value}"`;

    }


    displayFoods(results);


    document
        .getElementById("foods")
        ?.scrollIntoView({
            behavior: "smooth"
        });

}


// =====================================================
// CATEGORY FILTER
// =====================================================

function filterCategory(category) {

    const selected =
        String(category).toLowerCase();


    const results =
        foods.filter(food => {

            const foodCategory =
                String(food.category || "").toLowerCase();

            const foodName =
                String(food.name || "").toLowerCase();


            // Pizza

            if (selected.includes("pizza")) {

                return (
                    foodCategory.includes("pizza") ||
                    foodName.includes("pizza")
                );

            }


            // Burger

            if (
                selected.includes("burger") ||
                selected.includes("burgers")
            ) {

                return (
                    foodCategory.includes("burger") ||
                    foodName.includes("burger")
                );

            }


            // Biryani

            if (selected.includes("biryani")) {

                return (
                    foodCategory.includes("biryani") ||
                    foodName.includes("biryani")
                );

            }


            // Noodles

            if (selected.includes("noodle")) {

                return (
                    foodCategory.includes("noodle") ||
                    foodName.includes("noodle")
                );

            }


            // Dessert

            if (
                selected.includes("dessert") ||
                selected.includes("desserts")
            ) {

                return (
                    foodCategory.includes("dessert") ||
                    foodName.includes("dessert") ||
                    foodName.includes("cake") ||
                    foodName.includes("gulab")
                );

            }


            return (
                foodCategory.includes(selected) ||
                foodName.includes(selected)
            );

        });


    const heading =
        document.querySelector("#foods h2");

    if (heading) {

        heading.textContent =
            `${category} Menu`;

    }


    displayFoods(results);


    document
        .getElementById("foods")
        ?.scrollIntoView({
            behavior: "smooth"
        });

}


// =====================================================
// CART
// =====================================================

function addToCart(food) {

    if (!food) return;


    const existing =
        cart.find(item => {

            return (
                String(item._id || item.name) ===
                String(food._id || food.name)
            );

        });


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({
            ...food,
            quantity: 1
        });

    }


    updateCartCount();


    showNotification(
        `${food.name} added to cart 🛒`
    );

}


// =====================================================
// CART COUNT
// =====================================================

function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const cartCount =
        document.getElementById("cartCount");


    if (cartCount) {

        cartCount.textContent = count;

    }

}


// =====================================================
// CART BUTTON
// =====================================================

function setupCartButton() {

    const cartButton =
        document.querySelector(".cart-button");


    if (!cartButton) {

        console.error(
            "❌ Cart button not found"
        );

        return;

    }


    cartButton.addEventListener(
        "click",
        openCartModal
    );


    console.log(
        "✅ Cart button connected"
    );

}


// =====================================================
// OPEN CART
// =====================================================

function openCartModal() {

    const existing =
        document.getElementById("foodhubCartModal");


    if (existing) {

        existing.remove();

    }


    const modal =
        document.createElement("div");


    modal.id =
        "foodhubCartModal";


    modal.className =
        "checkout-overlay";


    modal.innerHTML = `

        <div class="checkout-box">

            <button
                class="checkout-close"
                id="closeCartButton"
                type="button"
            >
                ✕
            </button>


            <div class="checkout-header">

                <span>🛒</span>

                <div>
                    <h2>Your Cart</h2>

                    <p>
                        Review your order before checkout
                    </p>
                </div>

            </div>


            <div id="cartContent"></div>

        </div>

    `;


    document.body.appendChild(modal);


    document
        .getElementById("closeCartButton")
        .addEventListener(
            "click",
            closeCartModal
        );


    modal.addEventListener("click", event => {

        if (event.target === modal) {

            closeCartModal();

        }

    });


    renderCart();

}


// =====================================================
// CLOSE CART
// =====================================================

function closeCartModal() {

    const modal =
        document.getElementById(
            "foodhubCartModal"
        );


    if (modal) {

        modal.remove();

    }

}


// =====================================================
// RENDER CART
// =====================================================

function renderCart() {

    const content =
        document.getElementById("cartContent");


    if (!content) return;


    if (cart.length === 0) {

        content.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>Your cart is empty</h3>

                <p>
                    Add some delicious food to continue.
                </p>

                <button
                    class="checkout-main-button"
                    id="continueShoppingButton"
                    type="button"
                >
                    Browse Food
                </button>

            </div>

        `;


        document
            .getElementById(
                "continueShoppingButton"
            )
            ?.addEventListener(
                "click",
                closeCartModal
            );


        return;

    }


    let total = 0;


    const itemsHTML =
        cart.map((item, index) => {

            const itemTotal =
                Number(item.price || 0) *
                item.quantity;


            total += itemTotal;


            return `

                <div class="cart-item-row">

                    <img
                        src="${getFoodImage(item)}"
                        alt="${escapeAttribute(item.name)}"
                    >


                    <div class="cart-item-details">

                        <h3>
                            ${escapeHTML(item.name)}
                        </h3>

                        <p>
                            ${escapeHTML(
                                item.restaurant ||
                                "FoodHub"
                            )}
                        </p>

                        <strong>
                            ₹${Number(item.price || 0)}
                        </strong>

                    </div>


                    <div class="quantity-controls">

                        <button
                            type="button"
                            data-action="decrease"
                            data-index="${index}"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            type="button"
                            data-action="increase"
                            data-index="${index}"
                        >
                            +
                        </button>

                    </div>


                    <div class="cart-item-total">

                        ₹${itemTotal}

                        <button
                            class="remove-cart"
                            type="button"
                            data-action="remove"
                            data-index="${index}"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            `;

        }).join("");


    content.innerHTML = `

        <div class="cart-items">

            ${itemsHTML}

        </div>


        <div class="checkout-summary">

            <div class="summary-line">

                <span>Subtotal</span>

                <strong>
                    ₹${total}
                </strong>

            </div>


            <div class="summary-line">

                <span>Delivery Fee</span>

                <strong>
                    FREE
                </strong>

            </div>


            <div class="summary-line grand-total">

                <span>Total</span>

                <strong>
                    ₹${total}
                </strong>

            </div>


            <button
                class="checkout-main-button"
                id="checkoutButton"
                type="button"
            >
                Proceed to Checkout →
            </button>

        </div>

    `;


    // Quantity controls

    content
        .querySelectorAll("[data-action]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );

                    const action =
                        button.dataset.action;


                    if (action === "increase") {

                        cart[index].quantity++;

                    }


                    if (action === "decrease") {

                        cart[index].quantity--;

                        if (
                            cart[index].quantity <= 0
                        ) {

                            cart.splice(index, 1);

                        }

                    }


                    if (action === "remove") {

                        cart.splice(index, 1);

                    }


                    updateCartCount();


                    renderCart();

                }
            );

        });


    document
        .getElementById("checkoutButton")
        ?.addEventListener(
            "click",
            openCheckout
        );

}


// =====================================================
// CHECKOUT
// =====================================================

function openCheckout() {

    if (cart.length === 0) {

        showNotification(
            "Your cart is empty."
        );

        return;

    }


    const modal =
        document.getElementById(
            "foodhubCartModal"
        );


    if (!modal) return;


    modal.querySelector(".checkout-box")
        .innerHTML = `

        <button
            class="checkout-close"
            id="checkoutCloseButton"
            type="button"
        >
            ✕
        </button>


        <div class="checkout-header">

            <span>📍</span>

            <div>

                <h2>Delivery Details</h2>

                <p>
                    Enter your details to place your order
                </p>

            </div>

        </div>


        <form id="checkoutForm">

            <div class="form-group">

                <label>
                    Full Name
                </label>

                <input
                    type="text"
                    id="customerName"
                    placeholder="Enter your full name"
                    required
                >

            </div>


            <div class="form-group">

                <label>
                    Phone Number
                </label>

                <input
                    type="tel"
                    id="customerPhone"
                    placeholder="Enter your phone number"
                    pattern="[0-9]{10}"
                    maxlength="10"
                    required
                >

            </div>


            <div class="form-group">

                <label>
                    Delivery Address
                </label>

                <textarea
                    id="customerAddress"
                    placeholder="House / Flat No, Street, Area, City, PIN Code"
                    rows="4"
                    required
                ></textarea>

            </div>


            <div class="form-group">

                <label>
                    Payment Method
                </label>

                <select
                    id="paymentMethod"
                    required
                >

                    <option value="">
                        Select payment method
                    </option>

                    <option value="Cash on Delivery">
                        💵 Cash on Delivery
                    </option>

                    <option value="UPI">
                        📱 UPI
                    </option>

                </select>

            </div>


            <div class="checkout-total-box">

                <span>
                    Total Amount
                </span>

                <strong>
                    ₹${calculateCartTotal()}
                </strong>

            </div>


            <button
                type="submit"
                class="checkout-main-button"
            >
                Place Order 🍽️
            </button>

        </form>

    `;


    document
        .getElementById(
            "checkoutCloseButton"
        )
        .addEventListener(
            "click",
            closeCartModal
        );


    document
        .getElementById("checkoutForm")
        .addEventListener(
            "submit",
            placeOrder
        );

}


// =====================================================
// PLACE ORDER
// =====================================================

async function placeOrder(event) {

    event.preventDefault();


    const customerName =
        document
            .getElementById("customerName")
            .value
            .trim();


    const phone =
        document
            .getElementById("customerPhone")
            .value
            .trim();


    const address =
        document
            .getElementById("customerAddress")
            .value
            .trim();


    const paymentMethod =
        document
            .getElementById("paymentMethod")
            .value;


    if (!customerName) {

        alert("Please enter your name.");

        return;

    }


    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Please enter a valid 10-digit phone number."
        );

        return;

    }


    if (!address) {

        alert(
            "Please enter your delivery address."
        );

        return;

    }


    if (!paymentMethod) {

        alert(
            "Please select a payment method."
        );

        return;

    }


    const orderItems =
        cart.map(item => ({

            foodId:
                item._id || null,

            name:
                item.name,

            restaurant:
                item.restaurant || "",

            price:
                Number(item.price || 0),

            quantity:
                item.quantity

        }));


    const orderData = {

        customerName,

        phone,

        items: orderItems,

        totalAmount:
            calculateCartTotal(),

        address,

        paymentMethod,

        status: "Confirmed"

    };


    const submitButton =
        document.querySelector(
            "#checkoutForm button[type='submit']"
        );


    if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
            "Placing Order...";

    }


    try {

        const response =
            await fetch(
                "/api/orders",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(orderData)
                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.error ||
                "Unable to place order"
            );

        }


        console.log(
            "Order created:",
            result
        );


        showOrderSuccess(
            result.order ||
            orderData
        );


        cart = [];

        updateCartCount();


    } catch (error) {

        console.error(
            "Order error:",
            error
        );


        alert(
            "Unable to place order. Please try again."
        );


        if (submitButton) {

            submitButton.disabled = false;

            submitButton.textContent =
                "Place Order 🍽️";

        }

    }

}


// =====================================================
// ORDER SUCCESS
// =====================================================

function showOrderSuccess(order) {

    const modal =
        document.getElementById(
            "foodhubCartModal"
        );


    if (!modal) return;


    modal.querySelector(".checkout-box")
        .innerHTML = `

        <div class="success-box">

            <div class="success-icon">
                ✓
            </div>


            <h2>
                Order Confirmed! 🎉
            </h2>


            <p>
                Thank you,
                <strong>
                    ${escapeHTML(
                        order.customerName
                    )}
                </strong>
            </p>


            <p>
                Your delicious food is being prepared.
            </p>


            <div class="order-success-details">

                <div>

                    <span>
                        Order Amount
                    </span>

                    <strong>
                        ₹${Number(
                            order.totalAmount || 0
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Payment
                    </span>

                    <strong>
                        ${escapeHTML(
                            order.paymentMethod ||
                            "Selected Payment"
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Delivery Address
                    </span>

                    <strong>
                        ${escapeHTML(
                            order.address || ""
                        )}
                    </strong>

                </div>

            </div>


            <button
                class="checkout-main-button"
                id="successDoneButton"
                type="button"
            >
                Continue Shopping
            </button>

        </div>

    `;


    document
        .getElementById(
            "successDoneButton"
        )
        .addEventListener(
            "click",
            closeCartModal
        );

}


// =====================================================
// TOTAL
// =====================================================

function calculateCartTotal() {

    return cart.reduce(
        (total, item) => {

            return (
                total +
                Number(item.price || 0) *
                item.quantity
            );

        },
        0
    );

}


// =====================================================
// NOTIFICATION
// =====================================================

function showNotification(message) {

    const old =
        document.getElementById(
            "foodhubNotification"
        );


    if (old) {

        old.remove();

    }


    const notification =
        document.createElement("div");


    notification.id =
        "foodhubNotification";


    notification.innerHTML = `
        <span>✓</span>
        ${escapeHTML(message)}
    `;


    notification.style.position =
        "fixed";

    notification.style.bottom =
        "25px";

    notification.style.right =
        "25px";

    notification.style.zIndex =
        "99999";

    notification.style.background =
        "#222";

    notification.style.color =
        "#fff";

    notification.style.padding =
        "14px 20px";

    notification.style.borderRadius =
        "12px";

    notification.style.boxShadow =
        "0 10px 30px rgba(0,0,0,0.25)";

    notification.style.fontWeight =
        "600";


    document.body.appendChild(
        notification
    );


    setTimeout(() => {

        notification.remove();

    }, 2500);

}


// =====================================================
// HTML SAFETY HELPERS
// =====================================================

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function escapeAttribute(value) {

    return escapeHTML(value);

}


// =====================================================
// MAKE FUNCTIONS AVAILABLE TO HTML
// =====================================================

window.searchFood =
    searchFood;

window.filterCategory =
    filterCategory;

window.showAllFoods =
    showAllFoods;

window.openRestaurant =
    openRestaurant;

window.openCartModal =
    openCartModal;

window.addToCart =
    addToCart;