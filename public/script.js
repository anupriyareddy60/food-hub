// ======================================================
// FOODHUB - COMPLETE SCRIPT
// Images + Food + Restaurants + Cart + Checkout + Orders
// ======================================================

let allFoods = [];
let allRestaurants = [];
let cart = [];

// ======================================================
// REALISTIC RESTAURANT IMAGES
// ======================================================

const restaurantImages = {

    "Spice Kitchen":
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85",

    "Spice Garden":
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=85",

    "Pizza Palace":
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85",

    "Biryani House":
        "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=900&q=85",

    "Burger Point":
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",

    "South Indian Kitchen":
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=85",

    "Royal Biryani":
        "https://images.unsplash.com/photo-1631515242808-497c3fbd3972?auto=format&fit=crop&w=900&q=85",

    "Wok Express":
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=85",

    "Urban Dessert":
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",

    "Cafe Corner":
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=85",

    "Hyderabad Spice":
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85",

    "Taco Fiesta":
        "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=900&q=85",

    "Green Leaf Restaurant":
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85"
};


// ======================================================
// REALISTIC FOOD IMAGES
// ======================================================

const foodImages = {

    "Chicken Biryani":
        "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=800&q=85",

    "Veg Biryani":
        "https://images.unsplash.com/photo-1631515242808-497c3fbd3972?auto=format&fit=crop&w=800&q=85",

    "Pizza":
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=85",

    "Burger":
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85",

    "Dosa":
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=85",

    "Noodles":
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=85",

    "Tacos":
        "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=85",

    "Dessert":
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=85"
};


// ======================================================
// FALLBACK FOOD IMAGES
// ======================================================

const fallbackFoodImages = [

    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85",

    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=85",

    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=85",

    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=85",

    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85"
];


// ======================================================
// START WEBSITE
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    loadRestaurants();

    loadFoods();

    updateCartCount();

    addImageStyles();
});


// ======================================================
// LOAD RESTAURANTS
// ======================================================

async function loadRestaurants() {

    try {

        const response =
            await fetch("/api/restaurants");

        if (!response.ok) {
            throw new Error("Unable to load restaurants");
        }

        allRestaurants =
            await response.json();

        displayRestaurants(allRestaurants);

    } catch (error) {

        console.error(
            "Restaurant error:",
            error
        );

        const container =
            document.getElementById(
                "restaurantContainer"
            );

        if (container) {

            container.innerHTML = `
                <p>
                    Unable to load restaurants.
                </p>
            `;
        }
    }
}


// ======================================================
// DISPLAY RESTAURANTS
// ======================================================

function displayRestaurants(restaurants) {

    const container =
        document.getElementById(
            "restaurantContainer"
        );

    if (!container) return;

    if (!restaurants.length) {

        container.innerHTML = `
            <p>No restaurants found.</p>
        `;

        return;
    }

    container.innerHTML =
        restaurants.map((restaurant, index) => {

            const image =
                restaurantImages[
                    restaurant.name
                ] ||
                restaurantImages[
                    "Spice Kitchen"
                ];

            return `

                <div class="restaurant-card">

                    <div class="restaurant-image">

                        <img
                            src="${image}"
                            alt="${restaurant.name}"
                            loading="lazy"
                        >

                    </div>

                    <div class="restaurant-info">

                        <h3>
                            ${restaurant.name}
                        </h3>

                        <p>
                            ${restaurant.cuisine ||
                            "Various Cuisine"}
                        </p>

                        <p>
                            📍
                            ${restaurant.location ||
                            "Hyderabad"}
                        </p>

                        <div class="restaurant-details">

                            <span>
                                ⭐
                                ${restaurant.rating ||
                                "4.5"}
                            </span>

                            <span>
                                🛵
                                30-40 min
                            </span>

                        </div>

                    </div>

                </div>

            `;

        }).join("");
}


// ======================================================
// LOAD FOOD
// ======================================================

async function loadFoods() {

    try {

        const response =
            await fetch("/api/foods");

        if (!response.ok) {
            throw new Error("Unable to load food");
        }

        allFoods =
            await response.json();

        displayFoods(allFoods);

    } catch (error) {

        console.error(
            "Food error:",
            error
        );

        const container =
            document.getElementById(
                "foodContainer"
            );

        if (container) {

            container.innerHTML = `
                <p>
                    Unable to load food.
                </p>
            `;
        }
    }
}


// ======================================================
// GET FOOD IMAGE
// ======================================================

function getFoodImage(food, index) {

    if (food.image) {
        return food.image;
    }

    if (foodImages[food.name]) {
        return foodImages[food.name];
    }

    const name =
        (food.name || "").toLowerCase();

    if (name.includes("biryani")) {

        return foodImages[
            "Chicken Biryani"
        ];
    }

    if (name.includes("pizza")) {

        return foodImages["Pizza"];
    }

    if (name.includes("burger")) {

        return foodImages["Burger"];
    }

    if (
        name.includes("dosa") ||
        name.includes("idli")
    ) {

        return foodImages["Dosa"];
    }

    if (
        name.includes("noodle") ||
        name.includes("chow")
    ) {

        return foodImages["Noodles"];
    }

    if (
        name.includes("taco")
    ) {

        return foodImages["Tacos"];
    }

    if (
        name.includes("cake") ||
        name.includes("dessert") ||
        name.includes("ice cream")
    ) {

        return foodImages["Dessert"];
    }

    return fallbackFoodImages[
        index %
        fallbackFoodImages.length
    ];
}


// ======================================================
// DISPLAY FOOD
// ======================================================

function displayFoods(foodList) {

    const container =
        document.getElementById(
            "foodContainer"
        );

    if (!container) return;

    if (!foodList.length) {

        container.innerHTML = `
            <p>No food items found.</p>
        `;

        return;
    }

    container.innerHTML =
        foodList.map((food, index) => {

            const image =
                getFoodImage(food, index);

            return `

                <div class="food-card">

                    <div class="food-image">

                        <img
                            src="${image}"
                            alt="${food.name}"
                            loading="lazy"
                        >

                    </div>

                    <div class="food-info">

                        <h3>
                            ${food.name}
                        </h3>

                        <p class="food-restaurant">

                            ${food.restaurant ||
                            "FoodHub"}

                        </p>

                        <p>
                            ${food.description ||
                            "Freshly prepared and delicious."}
                        </p>

                        <div class="food-bottom">

                            <strong>
                                ₹${food.price}
                            </strong>

                            <span>
                                ⭐
                                ${food.rating ||
                                "4.5"}
                            </span>

                        </div>

                        <button
                            class="add-cart-button"
                            onclick="addToCart('${food._id}')"
                        >

                            🛒 Add to Cart

                        </button>

                    </div>

                </div>

            `;

        }).join("");
}


// ======================================================
// ADD TO CART
// ======================================================

function addToCart(foodId) {

    const food =
        allFoods.find(
            item =>
                item._id === foodId
        );

    if (!food) {

        alert(
            "Food item not found!"
        );

        return;
    }

    const existing =
        cart.find(
            item =>
                item._id === foodId
        );

    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({

            _id: food._id,

            name: food.name,

            price:
                Number(food.price) || 0,

            restaurant:
                food.restaurant ||
                "FoodHub",

            quantity: 1

        });
    }

    updateCartCount();

    showNotification(
        `${food.name} added to cart 🛒`
    );
}


// ======================================================
// CART COUNT
// ======================================================

function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    const cartCount =
        document.getElementById(
            "cartCount"
        );

    if (cartCount) {

        cartCount.textContent =
            count;
    }
}


// ======================================================
// OPEN CART
// ======================================================

function openCartModal() {

    let overlay =
        document.getElementById(
            "cartOverlay"
        );

    if (!overlay) {

        overlay =
            document.createElement(
                "div"
            );

        overlay.id =
            "cartOverlay";

        overlay.className =
            "checkout-overlay";

        document.body.appendChild(
            overlay
        );
    }

    renderCart();

    overlay.style.display =
        "flex";
}


// ======================================================
// CLOSE CART
// ======================================================

function closeCartModal() {

    const overlay =
        document.getElementById(
            "cartOverlay"
        );

    if (overlay) {

        overlay.style.display =
            "none";
    }
}


// ======================================================
// DISPLAY CART
// ======================================================

function renderCart() {

    const overlay =
        document.getElementById(
            "cartOverlay"
        );

    if (!overlay) return;

    if (cart.length === 0) {

        overlay.innerHTML = `

            <div class="checkout-modal">

                <button
                    class="close-cart"
                    onclick="closeCartModal()">

                    ×

                </button>

                <div class="checkout-header">

                    <h2>
                        🛒 Your Cart
                    </h2>

                </div>

                <div class="empty-cart">

                    <div
                        style="
                        font-size:70px;
                        margin-bottom:15px;
                        "
                    >
                        🛒
                    </div>

                    <h3>
                        Your cart is empty
                    </h3>

                    <p>
                        Add some delicious
                        food to continue.
                    </p>

                    <button
                        class="checkout-button"
                        onclick="closeCartModal()"
                    >

                        Browse Food

                    </button>

                </div>

            </div>

        `;

        return;
    }

    let total = 0;

    const itemsHTML =
        cart.map(item => {

            const itemTotal =
                item.price *
                item.quantity;

            total += itemTotal;

            return `

                <div class="cart-item">

                    <div
                        class="cart-item-info"
                    >

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ${item.restaurant}
                        </p>

                        <strong>
                            ₹${item.price}
                        </strong>

                    </div>

                    <div
                        class="quantity-controls"
                    >

                        <button
                            onclick="
                            changeQuantity(
                                '${item._id}',
                                -1
                            )"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="
                            changeQuantity(
                                '${item._id}',
                                1
                            )"
                        >
                            +
                        </button>

                    </div>

                    <strong>
                        ₹${itemTotal}
                    </strong>

                </div>

            `;

        }).join("");


    overlay.innerHTML = `

        <div class="checkout-modal">

            <button
                class="close-cart"
                onclick="closeCartModal()">

                ×

            </button>

            <div class="checkout-header">

                <h2>
                    🛒 Your Cart
                </h2>

                <p>
                    ${cart.length}
                    item${cart.length > 1
                    ? "s"
                    : ""}
                </p>

            </div>

            <div class="cart-items">

                ${itemsHTML}

            </div>

            <div class="cart-total">

                <span>
                    Total Amount
                </span>

                <strong>
                    ₹${total}
                </strong>

            </div>

            <button
                class="checkout-button"
                onclick="openCheckout()"
            >

                Proceed to Checkout →

            </button>

        </div>

    `;
}


// ======================================================
// CHANGE QUANTITY
// ======================================================

function changeQuantity(
    foodId,
    change
) {

    const item =
        cart.find(
            item =>
                item._id === foodId
        );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item =>
                    item._id !== foodId
            );
    }

    updateCartCount();

    renderCart();
}


// ======================================================
// CHECKOUT
// ======================================================

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;
    }

    const overlay =
        document.getElementById(
            "cartOverlay"
        );

    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );

    overlay.innerHTML = `

        <div class="checkout-modal">

            <button
                class="close-cart"
                onclick="closeCartModal()">

                ×

            </button>

            <div class="checkout-header">

                <h2>
                    🍔 Checkout
                </h2>

                <p>
                    Complete your order
                </p>

            </div>

            <form
                class="checkout-form"
                onsubmit="
                    placeOrder(event)
                "
            >

                <label>
                    Full Name
                </label>

                <input
                    id="customerName"
                    type="text"
                    placeholder="Enter your full name"
                    required
                >

                <label>
                    Phone Number
                </label>

                <input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                >

                <label>
                    Delivery Address
                </label>

                <textarea
                    id="address"
                    rows="4"
                    placeholder="
                    House No, Street,
                    City, PIN Code
                    "
                    required
                ></textarea>

                <label>
                    Payment Method
                </label>

                <select
                    id="paymentMethod"
                >

                    <option value="Cash on Delivery">
                        💵 Cash on Delivery
                    </option>

                    <option value="UPI">
                        📱 UPI
                    </option>

                    <option value="Card">
                        💳 Credit / Debit Card
                    </option>

                </select>

                <div class="order-summary">

                    <span>
                        Order Total
                    </span>

                    <strong>
                        ₹${total}
                    </strong>

                </div>

                <button
                    type="submit"
                    class="place-order-button"
                >

                    🛍️ Place Order

                </button>

            </form>

        </div>

    `;
}


// ======================================================
// PLACE ORDER
// ======================================================

async function placeOrder(event) {

    event.preventDefault();

    const customerName =
        document.getElementById(
            "customerName"
        ).value.trim();

    const phone =
        document.getElementById(
            "phone"
        ).value.trim();

    const address =
        document.getElementById(
            "address"
        ).value.trim();

    const paymentMethod =
        document.getElementById(
            "paymentMethod"
        ).value;

    if (
        !customerName ||
        !phone ||
        !address
    ) {

        alert(
            "Please fill all details."
        );

        return;
    }

    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );

    const orderData = {

        customerName,

        phone,

        items:
            cart.map(item => ({

                foodId:
                    item._id,

                name:
                    item.name,

                restaurant:
                    item.restaurant,

                price:
                    item.price,

                quantity:
                    item.quantity

            })),

        totalAmount:
            total,

        address,

        paymentMethod,

        status:
            "Confirmed"
    };


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
                        JSON.stringify(
                            orderData
                        )

                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.error ||
                "Order failed"
            );
        }


        cart = [];

        updateCartCount();


        const overlay =
            document.getElementById(
                "cartOverlay"
            );


        overlay.innerHTML = `

            <div
                class="
                checkout-modal
                order-success
                "
            >

                <div
                    class="success-icon"
                >
                    ✓
                </div>

                <h2>
                    Order Placed Successfully! 🎉
                </h2>

                <p
                    class="success-message"
                >

                    Thank you,
                    <strong>
                        ${customerName}
                    </strong>!

                    <br>

                    Your delicious food
                    is being prepared.

                </p>

                <div
                    class="success-details"
                >

                    <p>
                        📍
                        <strong>
                            Delivery Address
                        </strong>
                    </p>

                    <p>
                        ${address}
                    </p>

                    <hr>

                    <p>
                        📞
                        <strong>
                            Phone:
                        </strong>
                        ${phone}
                    </p>

                    <p>
                        💰
                        <strong>
                            Total:
                        </strong>
                        ₹${total}
                    </p>

                    <p>
                        💳
                        <strong>
                            Payment:
                        </strong>
                        ${paymentMethod}
                    </p>

                    <p>
                        🚚
                        <strong>
                            Estimated Delivery:
                        </strong>
                        25–40 minutes
                    </p>

                </div>

                <button
                    class="done-button"
                    onclick="
                        closeCartModal()
                    "
                >

                    Done

                </button>

            </div>

        `;

    } catch (error) {

        console.error(
            "Order error:",
            error
        );

        alert(
            "❌ Could not place order.\n\n" +
            error.message
        );
    }
}


// ======================================================
// SEARCH
// ======================================================

function searchFood() {

    const input =
        document.getElementById(
            "searchInput"
        );

    if (!input) return;

    const searchText =
        input.value
            .toLowerCase()
            .trim();

    if (!searchText) {

        displayFoods(allFoods);

        return;
    }

    const results =
        allFoods.filter(food =>

            food.name
                ?.toLowerCase()
                .includes(searchText) ||

            food.category
                ?.toLowerCase()
                .includes(searchText) ||

            food.restaurant
                ?.toLowerCase()
                .includes(searchText) ||

            food.description
                ?.toLowerCase()
                .includes(searchText)

        );

    displayFoods(results);
}


// ======================================================
// CATEGORY FILTER
// ======================================================

function filterCategory(category) {

    const results =
        allFoods.filter(food =>

            food.category
                ?.toLowerCase() ===
            category.toLowerCase()

        );

    displayFoods(results);
}


// ======================================================
// NOTIFICATION
// ======================================================

function showNotification(message) {

    const old =
        document.querySelector(
            ".foodhub-notification"
        );

    if (old) old.remove();


    const notification =
        document.createElement(
            "div"
        );

    notification.className =
        "foodhub-notification";

    notification.innerHTML = `
        🛒 ${message}
    `;

    document.body.appendChild(
        notification
    );


    setTimeout(() => {

        notification.classList.add(
            "hide"
        );

        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 2000);
}


// ======================================================
// IMAGE + CART CSS
// Automatically added by JavaScript
// ======================================================

function addImageStyles() {

    const style =
        document.createElement(
            "style"
        );

    style.innerHTML = `

        .restaurant-image,
        .food-image {

            width: 100%;
            height: 190px;
            overflow: hidden;
            background: #f5f5f5;
            border-radius:
                18px 18px 0 0;

        }


        .restaurant-image img,
        .food-image img {

            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;

            transition:
                transform .45s ease;

        }


        .restaurant-card:hover
        .restaurant-image img,
        .food-card:hover
        .food-image img {

            transform:
                scale(1.07);

        }


        .foodhub-notification {

            position: fixed;

            right: 25px;
            bottom: 25px;

            background:
                #ff5722;

            color: white;

            padding:
                15px 22px;

            border-radius:
                12px;

            font-weight: 700;

            box-shadow:
                0 10px 30px
                rgba(0,0,0,.2);

            z-index: 99999;

            animation:
                slideIn .3s ease;

        }


        .foodhub-notification.hide {

            opacity: 0;

            transform:
                translateY(20px);

            transition:
                .3s ease;

        }


        @keyframes slideIn {

            from {

                opacity: 0;

                transform:
                    translateY(20px);

            }

            to {

                opacity: 1;

                transform:
                    translateY(0);

            }

        }


        .checkout-overlay {

            position: fixed;

            inset: 0;

            background:
                rgba(0,0,0,.65);

            display: none;

            align-items: center;

            justify-content: center;

            z-index: 9999;

            padding: 20px;

        }


        .checkout-modal {

            background: white;

            width: 100%;

            max-width: 600px;

            max-height: 90vh;

            overflow-y: auto;

            border-radius: 22px;

            padding: 30px;

            position: relative;

            box-shadow:
                0 25px 70px
                rgba(0,0,0,.3);

        }


        .close-cart {

            position: absolute;

            right: 20px;
            top: 15px;

            border: none;

            background:
                #f3f3f3;

            width: 38px;
            height: 38px;

            border-radius: 50%;

            font-size: 25px;

            cursor: pointer;

        }


        .cart-item {

            display: flex;

            align-items: center;

            justify-content: space-between;

            gap: 20px;

            padding: 18px 0;

            border-bottom:
                1px solid #eee;

        }


        .quantity-controls {

            display: flex;

            align-items: center;

            gap: 12px;

        }


        .quantity-controls button {

            width: 32px;
            height: 32px;

            border: none;

            background:
                #ff5722;

            color: white;

            border-radius: 8px;

            font-size: 20px;

            cursor: pointer;

        }


        .checkout-button,
        .place-order-button,
        .done-button {

            width: 100%;

            border: none;

            background:
                #ff5722;

            color: white;

            padding: 15px;

            border-radius: 12px;

            font-size: 16px;

            font-weight: 700;

            cursor: pointer;

            margin-top: 15px;

        }


        .checkout-form {

            display: flex;

            flex-direction: column;

            gap: 10px;

        }


        .checkout-form input,
        .checkout-form textarea,
        .checkout-form select {

            width: 100%;

            box-sizing: border-box;

            padding: 13px;

            border:
                1px solid #ddd;

            border-radius: 10px;

            font-size: 15px;

            margin-bottom: 8px;

        }


        .cart-total,
        .order-summary {

            display: flex;

            justify-content: space-between;

            align-items: center;

            padding: 20px 0;

            font-size: 20px;

        }


        .success-icon {

            width: 75px;
            height: 75px;

            margin:
                0 auto 20px;

            display: flex;

            align-items: center;

            justify-content: center;

            border-radius: 50%;

            background:
                #22c55e;

            color: white;

            font-size: 40px;

            font-weight: 800;

        }


        .order-success {

            text-align: center;

        }


        .success-details {

            text-align: left;

            background:
                #fff7f3;

            padding: 20px;

            border-radius: 15px;

            margin-top: 20px;

        }


        .empty-cart {

            text-align: center;

            padding: 35px 10px;

        }

    `;

    document.head.appendChild(
        style
    );
}


// ======================================================
// MAKE FUNCTIONS AVAILABLE TO HTML
// ======================================================

window.addToCart =
    addToCart;

window.openCartModal =
    openCartModal;

window.closeCartModal =
    closeCartModal;

window.changeQuantity =
    changeQuantity;

window.openCheckout =
    openCheckout;

window.placeOrder =
    placeOrder;

window.searchFood =
    searchFood;

window.filterCategory =
    filterCategory;