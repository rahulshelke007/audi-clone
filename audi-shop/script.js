document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Hero Slider
    const dots = document.querySelectorAll('.dot');
    const heroImage = document.querySelector('.hero-image');
    
    // Hero slider images
    const heroImages = [
        'images/audi-q8-hero.jpg',
        'images/audi-etron-hero.jpg',
        'images/audi-rs-hero.jpg'
    ];
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Update active dot
            document.querySelector('.dot.active').classList.remove('active');
            this.classList.add('active');
            
            // Change hero image
            heroImage.style.backgroundImage = `url('${heroImages[index]}')`;
        });
    });
    
    // Auto slide every 5 seconds
    let currentSlide = 0;
    
    function autoSlide() {
        currentSlide = (currentSlide + 1) % heroImages.length;
        document.querySelector('.dot.active').classList.remove('active');
        dots[currentSlide].classList.add('active');
        heroImage.style.backgroundImage = `url('${heroImages[currentSlide]}')`;
    }
    
    setInterval(autoSlide, 5000);
    
    // Shopping Cart Functionality
    const cartItems = [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalAmount = document.querySelector('.total-amount');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCartButton = document.querySelector('.close-cart');
    
    // Open cart
    function openCart() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close cart
    function closeCart() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Add event listeners for cart open/close
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productItem = this.closest('.product-item');
            const productImage = productItem.querySelector('.product-image img').src;
            const productTitle = productItem.querySelector('h3').textContent;
            const productPrice = productItem.querySelector('.price').textContent;
            
            // Check if product already in cart
            const existingItemIndex = cartItems.findIndex(item => item.title === productTitle);
            
            if (existingItemIndex > -1) {
                // Increment quantity if already in cart
                cartItems[existingItemIndex].quantity += 1;
            } else {
                // Add new item to cart
                cartItems.push({
                    image: productImage,
                    title: productTitle,
                    price: productPrice,
                    quantity: 1
                });
            }
            
            updateCart();
            openCart();
        });
    });
    
    // Close cart when clicking close button or overlay
    closeCartButton.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    // Update cart display
    function updateCart() {
        // Clear cart items container
        cartItemsContainer.innerHTML = '';
        
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotalAmount.textContent = '₹0';
            return;
        }
        
        let total = 0;
        
        // Add each item to cart
        cartItems.forEach(item => {
            // Calculate item total
            const itemPrice = parseFloat(item.price.replace('₹', '').replace(',', ''));
            const itemTotal = itemPrice * item.quantity;
            total += itemTotal;
            
            // Create cart item element
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-price">${item.price}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increase">+</button>
                        <button class="remove-item">Remove</button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
            
            // Add event listeners for quantity buttons
            const decreaseBtn = cartItemElement.querySelector('.decrease');
            const increaseBtn = cartItemElement.querySelector('.increase');
            const removeBtn = cartItemElement.querySelector('.remove-item');
            
            decreaseBtn.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    updateCart();
                }
            });
            
            increaseBtn.addEventListener('click', () => {
                item.quantity += 1;
                updateCart();
            });
            
            removeBtn.addEventListener('click', () => {
                const index = cartItems.indexOf(item);
                if (index > -1) {
                    cartItems.splice(index, 1);
                    updateCart();
                }
            });
        });
        
        // Update total
        cartTotalAmount.textContent = `₹${total.toLocaleString()}`;
    }
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', () => {
        if (cartItems.length > 0) {
            alert('Proceeding to checkout. Thank you for shopping with Audi Store!');
            cartItems.length = 0; // Clear cart
            updateCart();
            closeCart();
        }
    });
    
    // Cookie Consent
    const cookieConsent = document.querySelector('.cookie-consent');
    const acceptCookiesBtn = document.querySelector('.accept-cookies');
    
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        cookieConsent.style.display = 'flex';
    } else {
        cookieConsent.style.display = 'none';
    }
    
    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.style.display = 'none';
    });
    
    // View More Products button
    const viewMoreBtn = document.querySelector('.view-more-btn');
    viewMoreBtn.addEventListener('click', () => {
        alert('Loading more products...');
        // In a real implementation, this would load more products via AJAX
    });
});