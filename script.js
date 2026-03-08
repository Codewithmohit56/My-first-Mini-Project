// Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        // Restaurant data
        const restaurants = [
            {
                id: "spice-hub",
                name: "Spice Hub",
                cuisine: "North Indian",
                rating: 4.5,
                deliveryTime: "30–40 mins",
                image: "https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?auto=compress&cs=tinysrgb&w=800"
            },
            {
                id: "pizza-palace",
                name: "Pizza Palace",
                cuisine: "Italian & Pizza",
                rating: 4.3,
                deliveryTime: "25–35 mins",
                image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=800"
            },
            {
                id: "burger-bay",
                name: "Burger Bay",
                cuisine: "Burgers & Wraps",
                rating: 4.2,
                deliveryTime: "20–30 mins",
                image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800"
            },
            {
                id: "fresh-bowl",
                name: "Fresh Bowl",
                cuisine: "Salads & Desserts",
                rating: 4.4,
                deliveryTime: "25–35 mins",
                image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=800"
            }
        ];

        // Menu data (30 items) with INR and restaurant mapping
        const menuItems = [
            { id: 1,  name: "Margherita Pizza",           category: "Pizza",  price: 249, special: true,  restaurantId: "pizza-palace" },
            { id: 2,  name: "Farmhouse Pizza",            category: "Pizza",  price: 329, special: false, restaurantId: "pizza-palace" },
            { id: 3,  name: "Pepperoni Pizza",            category: "Pizza",  price: 349, special: false, restaurantId: "pizza-palace" },
            { id: 4,  name: "Veggie Supreme Pizza",       category: "Pizza",  price: 339, special: false, restaurantId: "pizza-palace" },
            { id: 5,  name: "BBQ Chicken Pizza",          category: "Pizza",  price: 359, special: true,  restaurantId: "pizza-palace" },

            { id: 6,  name: "Classic Cheeseburger",       category: "Burger", price: 199, special: false, restaurantId: "burger-bay" },
            { id: 7,  name: "Spicy Chicken Burger",       category: "Burger", price: 219, special: true,  restaurantId: "burger-bay" },
            { id: 8,  name: "Veggie Burger",              category: "Burger", price: 189, special: false, restaurantId: "burger-bay" },
            { id: 9,  name: "Double Patty Burger",        category: "Burger", price: 249, special: false, restaurantId: "burger-bay" },
            { id: 10, name: "Crispy Fish Burger",         category: "Burger", price: 239, special: false, restaurantId: "burger-bay" },

            { id: 11, name: "Paneer Tikka Wrap",          category: "Wraps",  price: 199, special: true,  restaurantId: "burger-bay" },
            { id: 12, name: "Falafel Wrap",               category: "Wraps",  price: 189, special: false, restaurantId: "burger-bay" },
            { id: 13, name: "Chicken Shawarma Wrap",      category: "Wraps",  price: 219, special: false, restaurantId: "burger-bay" },
            { id: 14, name: "Veggie Hummus Wrap",         category: "Wraps",  price: 189, special: false, restaurantId: "burger-bay" },

            { id: 15, name: "Alfredo Pasta",              category: "Pasta",  price: 279, special: false, restaurantId: "pizza-palace" },
            { id: 16, name: "Arrabbiata Pasta",           category: "Pasta",  price: 269, special: true,  restaurantId: "pizza-palace" },
            { id: 17, name: "Mac & Cheese",               category: "Pasta",  price: 259, special: false, restaurantId: "pizza-palace" },

            { id: 18, name: "Butter Chicken with Rice",   category: "Indian", price: 329, special: true,  restaurantId: "spice-hub" },
            { id: 19, name: "Paneer Butter Masala",       category: "Indian", price: 299, special: false, restaurantId: "spice-hub" },
            { id: 20, name: "Veg Biryani",                category: "Indian", price: 269, special: false, restaurantId: "spice-hub" },
            { id: 21, name: "Chicken Biryani",            category: "Indian", price: 299, special: true,  restaurantId: "spice-hub" },

            { id: 22, name: "Caesar Salad",               category: "Salad",  price: 199, special: false, restaurantId: "fresh-bowl" },
            { id: 23, name: "Greek Salad",                category: "Salad",  price: 209, special: false, restaurantId: "fresh-bowl" },

            { id: 24, name: "Chocolate Brownie",          category: "Dessert",price: 149, special: true,  restaurantId: "fresh-bowl" },
            { id: 25, name: "Gulab Jamun (2 pcs)",        category: "Dessert",price: 99,  special: false, restaurantId: "spice-hub" },
            { id: 26, name: "Ice Cream Sundae",           category: "Dessert",price: 159, special: false, restaurantId: "fresh-bowl" },
            { id: 27, name: "Tiramisu",                   category: "Dessert",price: 189, special: false, restaurantId: "fresh-bowl" },

            { id: 28, name: "Fresh Lime Soda",            category: "Drinks", price: 79,  special: false, restaurantId: "fresh-bowl" },
            { id: 29, name: "Cold Coffee",                category: "Drinks", price: 129, special: true,  restaurantId: "fresh-bowl" },
            { id: 30, name: "Mango Lassi",                category: "Drinks", price: 119, special: false, restaurantId: "spice-hub" }
        ];

        // Cart state
        const cart = {}; // {id: {item, qty}}

        let currentCategoryFilter = "all";
        let currentRestaurantFilter = null;

        function formatPriceINR(num) {
            return num.toLocaleString("en-IN");
        }

        function renderRestaurants() {
            const list = document.getElementById('restaurant-list');
            list.innerHTML = "";

            restaurants.forEach(r => {
                const card = document.createElement('article');
                card.className = "restaurant-card";
                card.dataset.restaurantId = r.id;

                card.innerHTML = `
                    <img src="${r.image}" alt="${r.name}">
                    <h3>${r.name}</h3>
                    <div class="restaurant-meta">
                        <span>${r.cuisine}</span>
                        <span>⭐ ${r.rating}</span>
                    </div>
                    <div style="font-size:0.85rem;margin-bottom:4px;">
                        Estimated delivery: ${r.deliveryTime}
                    </div>
                    <button class="btn restaurant-menu-btn" data-restaurant-id="${r.id}">
                        View Menu
                    </button>
                `;
                list.appendChild(card);
            });
        }

        function renderMenu(category = currentCategoryFilter, restaurantId = currentRestaurantFilter) {
            currentCategoryFilter = category;
            currentRestaurantFilter = restaurantId;

            const container = document.getElementById('menu-items');
            container.innerHTML = "";

            let items = menuItems.slice();

            if (restaurantId) {
                items = items.filter(item => item.restaurantId === restaurantId);
            }
            if (category !== "all") {
                items = items.filter(item => item.category === category);
            }

            if (items.length === 0) {
                container.innerHTML = "<p>No items found for this selection.</p>";
                return;
            }

            items.forEach(item => {
                const card = document.createElement('article');
                card.className = 'menu-card';

                const restaurantName =
                    (restaurants.find(r => r.id === item.restaurantId) || {}).name || "Our Kitchen";

                card.innerHTML = `
                    <div>
                        <div class="menu-card-header">
                            <h3>${item.name}</h3>
                            ${item.special ? '<span class="badge">Special</span>' : ''}
                        </div>
                        <div class="menu-meta">
                            <span class="category-pill">${item.category}</span>
                            <span class="price">&#8377;${formatPriceINR(item.price)}</span>
                        </div>
                        <div style="font-size:0.8rem;color:#555;">From: ${restaurantName}</div>
                    </div>
                    <button class="btn order-btn" data-item-id="${item.id}">ORDER NOW</button>
                `;

                container.appendChild(card);
            });

            const label = document.getElementById('menu-restaurant-label');
            document.querySelectorAll('.restaurant-card').forEach(card => card.classList.remove('active'));

            if (restaurantId) {
                const r = restaurants.find(r => r.id === restaurantId);
                label.textContent = r
                    ? `Showing items from "${r.name}" (${r.cuisine})`
                    : "";

                const activeCard = document.querySelector(`.restaurant-card[data-restaurant-id="${restaurantId}"]`);
                if (activeCard) activeCard.classList.add('active');
            } else {
                label.textContent = "";
            }
        }

        function renderSpecials() {
            const specialsContainer = document.getElementById('specials-list');
            specialsContainer.innerHTML = "";

            const specials = menuItems.filter(item => item.special);
            specials.forEach(item => {
                const card = document.createElement('article');
                card.className = 'menu-card';

                const restaurantName =
                    (restaurants.find(r => r.id === item.restaurantId) || {}).name || "Our Kitchen";

                card.innerHTML = `
                    <div>
                        <div class="menu-card-header">
                            <h3>${item.name}</h3>
                            <span class="badge">Chef's Pick</span>
                        </div>
                        <div class="menu-meta">
                            <span class="category-pill">${item.category}</span>
                            <span class="price">&#8377;${formatPriceINR(item.price)}</span>
                        </div>
                        <div style="font-size:0.8rem;color:#555;">From: ${restaurantName}</div>
                    </div>
                    <button class="btn order-btn" data-item-id="${item.id}">ORDER NOW</button>
                `;

                specialsContainer.appendChild(card);
            });
        }

        function updateCartUI() {
            const list = document.getElementById('cart-items');
            const totalSpan = document.getElementById('cart-total');
            const countSpan = document.getElementById('cart-count');
            const emptyText = document.getElementById('cart-empty-text');
            const checkoutBtn = document.getElementById('checkout-btn');

            list.innerHTML = "";
            let total = 0;
            let count = 0;

            Object.values(cart).forEach(entry => {
                const { item, qty } = entry;
                const lineTotal = item.price * qty;
                total += lineTotal;
                count += qty;

                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="cart-item-left">
                        <span>${item.name}</span>
                        <div class="cart-item-controls">
                            <button class="qty-btn" data-action="dec" data-item-id="${item.id}">-</button>
                            <span>Qty: ${qty}</span>
                            <button class="qty-btn" data-action="inc" data-item-id="${item.id}">+</button>
                            <button class="remove-item-btn" data-item-id="${item.id}">Remove</button>
                        </div>
                    </div>
                    <span>&#8377;${formatPriceINR(lineTotal)}</span>
                `;
                list.appendChild(li);
            });

            totalSpan.textContent = formatPriceINR(total);
            countSpan.textContent = count;

            if (count === 0) {
                emptyText.style.display = "block";
                emptyText.textContent = "Your cart is empty. Start by adding something tasty!";
                checkoutBtn.disabled = true;
            } else {
                emptyText.style.display = "block";
                emptyText.textContent = "Review your items and proceed to checkout when ready.";
                checkoutBtn.disabled = false;
            }
        }

        function addToCart(id) {
            const item = menuItems.find(i => i.id === id);
            if (!item) return;

            if (!cart[id]) {
                cart[id] = { item, qty: 0 };
            }
            cart[id].qty += 1;
            updateCartUI();

            alert(`${item.name} added to cart!`);
        }

        function changeCartQuantity(id, delta) {
            if (!cart[id]) return;
            cart[id].qty += delta;
            if (cart[id].qty <= 0) {
                delete cart[id];
            }
            updateCartUI();
        }

        function removeFromCart(id) {
            if (cart[id]) {
                delete cart[id];
                updateCartUI();
            }
        }

        function clearCart() {
            Object.keys(cart).forEach(k => delete cart[k]);
            updateCartUI();
        }

        function buildCheckoutSummary() {
            const list = document.getElementById('checkout-items');
            const totalSpan = document.getElementById('checkout-total');
            const estimateTime = document.getElementById('estimate-time');

            list.innerHTML = "";
            let total = 0;

            const entries = Object.values(cart);
            if (entries.length === 0) {
                list.innerHTML = "<li>Your cart is empty.</li>";
                totalSpan.textContent = "0";
                estimateTime.textContent = "";
                return;
            }

            entries.forEach(entry => {
                const { item, qty } = entry;
                const lineTotal = item.price * qty;
                total += lineTotal;

                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${item.name} × ${qty}</span>
                    <span>&#8377;${formatPriceINR(lineTotal)}</span>
                `;
                list.appendChild(li);
            });

            totalSpan.textContent = formatPriceINR(total);

            const uniqueRestaurants = new Set(
                entries.map(e => e.item.restaurantId)
            );
            let message = "Estimated delivery: 40–55 mins.";
            if (uniqueRestaurants.size === 1) {
                const onlyId = entries[0].item.restaurantId;
                const rest = restaurants.find(r => r.id === onlyId);
                if (rest) {
                    message = `Estimated delivery from ${rest.name}: ${rest.deliveryTime}`;
                }
            }
            estimateTime.textContent = message;
        }

        document.addEventListener('DOMContentLoaded', () => {
            renderRestaurants();
            renderMenu("all", null);
            renderSpecials();
            updateCartUI();
            buildCheckoutSummary();

            // Filter buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const cat = btn.getAttribute('data-category');
                    renderMenu(cat, currentRestaurantFilter);
                });
            });

            // Global click handler for order / restaurant / cart qty
            document.body.addEventListener('click', (e) => {
                // ORDER NOW
                if (e.target.classList.contains('order-btn')) {
                    const id = parseInt(e.target.getAttribute('data-item-id'), 10);
                    if (!isNaN(id)) {
                        addToCart(id);
                        buildCheckoutSummary();
                    }
                }

                // Restaurant menu button
                if (e.target.classList.contains('restaurant-menu-btn')) {
                    const restId = e.target.getAttribute('data-restaurant-id');
                    currentRestaurantFilter = restId;

                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    const allBtn = document.querySelector('.filter-btn[data-category="all"]');
                    if (allBtn) allBtn.classList.add('active');

                    renderMenu("all", restId);

                    const menuSection = document.getElementById('menu');
                    if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }

                // Cart quantity buttons
                if (e.target.classList.contains('qty-btn')) {
                    const id = parseInt(e.target.getAttribute('data-item-id'), 10);
                    const action = e.target.getAttribute('data-action');
                    if (!isNaN(id)) {
                        if (action === 'inc') changeCartQuantity(id, 1);
                        if (action === 'dec') changeCartQuantity(id, -1);
                        buildCheckoutSummary();
                    }
                }

                // Remove from cart
                if (e.target.classList.contains('remove-item-btn')) {
                    const id = parseInt(e.target.getAttribute('data-item-id'), 10);
                    if (!isNaN(id)) {
                        removeFromCart(id);
                        buildCheckoutSummary();
                    }
                }
            });

            // Hero buttons
            const heroOrderBtn = document.getElementById('hero-order-btn');
            const pricesBtn = document.getElementById('prices-btn');
            const specialsBtn = document.getElementById('specials-btn');

            if (heroOrderBtn) {
                heroOrderBtn.addEventListener('click', () => {
                    const menuSection = document.getElementById('menu');
                    if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            }

            if (pricesBtn) {
                pricesBtn.addEventListener('click', () => {
                    const menuSection = document.getElementById('menu');
                    if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            }

            if (specialsBtn) {
                specialsBtn.addEventListener('click', () => {
                    const specialsSection = document.getElementById('specials');
                    if (specialsSection) specialsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            }

            // Cart buttons
            document.getElementById('clear-cart').addEventListener('click', () => {
                clearCart();
                buildCheckoutSummary();
            });

            document.getElementById('checkout-btn').addEventListener('click', () => {
                const entries = Object.values(cart);
                if (entries.length === 0) {
                    alert("Your cart is empty. Please add some items first.");
                    return;
                }
                buildCheckoutSummary();
                const checkoutSection = document.getElementById('checkout');
                if (checkoutSection) checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });

            // Payment method toggle (Cash / UPI)
            const upiDetails = document.getElementById('upi-details');
            document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
                radio.addEventListener('change', () => {
                    const selected = document.querySelector('input[name="paymentMethod"]:checked');
                    if (selected && selected.value === 'upi') {
                        upiDetails.style.display = 'block';
                    } else {
                        upiDetails.style.display = 'none';
                    }
                });
            });

            // Checkout form submission
            const checkoutForm = document.getElementById('checkout-form');
            const orderStatus = document.getElementById('order-status');

            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const entries = Object.values(cart);
                if (entries.length === 0) {
                    alert("Your cart is empty. Please add some items before placing an order.");
                    return;
                }

                const name = document.getElementById('cust-name').value.trim();
                const mobile = document.getElementById('cust-mobile').value.trim();
                const address = document.getElementById('cust-address').value.trim();

                if (!name || !mobile || !address) {
                    alert("Please fill all required details (Name, Mobile, Address).");
                    return;
                }

                const paymentRadio = document.querySelector('input[name="paymentMethod"]:checked');
                if (!paymentRadio) {
                    alert("Please select a payment method (Cash / UPI).");
                    return;
                }

                const paymentMethod = paymentRadio.value;
                let paymentText = "Cash on Delivery";
                let extraInfo = "";

                if (paymentMethod === "upi") {
                    const upiId = document.getElementById('upi-id').value.trim();
                    if (!upiId) {
                        alert("Please enter your UPI ID or choose Cash on Delivery.");
                        return;
                    }
                    paymentText = "UPI";
                    extraInfo = ` UPI request will be sent to ${upiId}.`;
                }

                const orderId = "OFS" + Math.floor(100000 + Math.random() * 900000);

                orderStatus.textContent =
                    `Order ID: ${orderId} — Thank you, ${name}! Your order has been placed with ${paymentText}.${extraInfo} We will deliver to your address soon and call ${mobile} if needed.`;

                alert("Order placed successfully! You will receive your food soon.");
                clearCart();
                buildCheckoutSummary();
                checkoutForm.reset();

                // Reset payment section defaults
                const cashRadio = document.querySelector('input[name="paymentMethod"][value="cash"]');
                if (cashRadio) {
                    cashRadio.checked = true;
                    upiDetails.style.display = 'none';
                }
            });
        });
    