document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mainNav = document.querySelector(".main-nav")

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active")
    })
  }

  // Hero Slider
  const dots = document.querySelectorAll(".dot")
  const heroImage = document.querySelector(".hero-image")

  // Hero slider images
  const heroImages = ["images/audi-q8-hero.jpg", "images/audi-etron-hero.jpg", "images/audi-rs-hero.jpg"]

  if (dots.length > 0 && heroImage) {
    dots.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        // Update active dot
        document.querySelector(".dot.active").classList.remove("active")
        this.classList.add("active")

        // Change hero image
        heroImage.style.backgroundImage = `url('${heroImages[index]}')`
      })
    })

    // Auto slide every 5 seconds
    let currentSlide = 0

    function autoSlide() {
      currentSlide = (currentSlide + 1) % heroImages.length
      document.querySelector(".dot.active").classList.remove("active")
      dots[currentSlide].classList.add("active")
      heroImage.style.backgroundImage = `url('${heroImages[currentSlide]}')`
    }

    setInterval(autoSlide, 5000)
  }

  // Shopping Cart Functionality
  const cartItems = []
  const cartItemsContainer = document.querySelector(".cart-items")
  const cartTotalAmount = document.querySelector(".total-amount")
  const addToCartButtons = document.querySelectorAll(".add-to-cart")
  const cartSidebar = document.querySelector(".cart-sidebar")
  const cartOverlay = document.querySelector(".cart-overlay")
  const closeCartButton = document.querySelector(".close-cart")

  // Open cart
  function openCart() {
    if (cartSidebar && cartOverlay) {
      cartSidebar.classList.add("active")
      cartOverlay.classList.add("active")
      document.body.style.overflow = "hidden"
    }
  }

  // Close cart
  function closeCart() {
    if (cartSidebar && cartOverlay) {
      cartSidebar.classList.remove("active")
      cartOverlay.classList.remove("active")
      document.body.style.overflow = "auto"
    }
  }

  // Add event listeners for cart open/close
  if (addToCartButtons && addToCartButtons.length > 0) {
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault()

        const productItem = this.closest(".product-item")
        const productImage = productItem.querySelector(".product-image img").src
        const productTitle = productItem.querySelector("h3").textContent
        const productPrice = productItem.querySelector(".price").textContent

        // Check if product already in cart
        const existingItemIndex = cartItems.findIndex((item) => item.title === productTitle)

        if (existingItemIndex > -1) {
          // Increment quantity if already in cart
          cartItems[existingItemIndex].quantity += 1
        } else {
          // Add new item to cart
          cartItems.push({
            image: productImage,
            title: productTitle,
            price: productPrice,
            quantity: 1,
          })
        }

        updateCart()
        openCart()
      })
    })
  }

  // Close cart when clicking close button or overlay
  if (closeCartButton) {
    closeCartButton.addEventListener("click", closeCart)
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCart)
  }

  // Update cart display
  function updateCart() {
    if (!cartItemsContainer || !cartTotalAmount) return

    // Clear cart items container
    cartItemsContainer.innerHTML = ""

    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>'
      cartTotalAmount.textContent = "₹0"
      return
    }

    let total = 0

    // Add each item to cart
    cartItems.forEach((item) => {
      // Calculate item total
      const itemPrice = Number.parseFloat(item.price.replace("₹", "").replace(",", ""))
      const itemTotal = itemPrice * item.quantity
      total += itemTotal

      // Create cart item element
      const cartItemElement = document.createElement("div")
      cartItemElement.classList.add("cart-item")
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
            `

      cartItemsContainer.appendChild(cartItemElement)

      // Add event listeners for quantity buttons
      const decreaseBtn = cartItemElement.querySelector(".decrease")
      const increaseBtn = cartItemElement.querySelector(".increase")
      const removeBtn = cartItemElement.querySelector(".remove-item")

      decreaseBtn.addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity -= 1
          updateCart()
        }
      })

      increaseBtn.addEventListener("click", () => {
        item.quantity += 1
        updateCart()
      })

      removeBtn.addEventListener("click", () => {
        const index = cartItems.indexOf(item)
        if (index > -1) {
          cartItems.splice(index, 1)
          updateCart()
        }
      })
    })

    // Update total
    cartTotalAmount.textContent = `₹${total.toLocaleString()}`
  }

  // Checkout button
  const checkoutBtn = document.querySelector(".checkout-btn")
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cartItems.length > 0) {
        alert("Proceeding to checkout. Thank you for shopping with Audi Store!")
        cartItems.length = 0 // Clear cart
        updateCart()
        closeCart()
      }
    })
  }

  // Cookie Consent
  const cookieConsent = document.querySelector(".cookie-consent")
  const acceptCookiesBtn = document.querySelector(".accept-cookies")

  // Check if user has already accepted cookies
  if (cookieConsent && acceptCookiesBtn) {
    if (!localStorage.getItem("cookiesAccepted")) {
      cookieConsent.style.display = "flex"
    } else {
      cookieConsent.style.display = "none"
    }

    acceptCookiesBtn.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true")
      cookieConsent.style.display = "none"
    })
  }

  // View More Products button
  const viewMoreBtn = document.querySelector(".view-more-btn")
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener("click", () => {
      alert("Loading more products...")
      // In a real implementation, this would load more products via AJAX
    })
  }

  // =============== LOGIN FUNCTIONALITY ===============

  // Login Form Functionality
  const loginForm = document.getElementById("login-form")
  const registerForm = document.getElementById("register-form")
  const authTabs = document.querySelectorAll(".auth-tab")
  const authForms = document.querySelectorAll(".auth-form")
  const togglePasswordButtons = document.querySelectorAll(".toggle-password")

  // Toggle between login and register forms
  if (authTabs.length > 0) {
    authTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const targetForm = this.getAttribute("data-tab")

        // Update active tab
        authTabs.forEach((t) => t.classList.remove("active"))
        this.classList.add("active")

        // Show target form
        authForms.forEach((form) => {
          form.classList.remove("active")
          if (form.classList.contains(targetForm + "-form")) {
            form.classList.add("active")
          }
        })
      })
    })
  }

  // Toggle password visibility
  if (togglePasswordButtons.length > 0) {
    togglePasswordButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const passwordInput = this.previousElementSibling
        const icon = this.querySelector("i")

        if (passwordInput.type === "password") {
          passwordInput.type = "text"
          icon.classList.remove("fa-eye")
          icon.classList.add("fa-eye-slash")
        } else {
          passwordInput.type = "password"
          icon.classList.remove("fa-eye-slash")
          icon.classList.add("fa-eye")
        }
      })
    })
  }

  // Login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("login-email").value
      const password = document.getElementById("login-password").value

      // Simple validation
      if (!email || !password) {
        alert("Please fill in all fields")
        return
      }

      // In a real application, you would send this data to a server for authentication
      // For demo purposes, we'll just simulate a successful login
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)

      // Show success message
      alert("Login successful! Welcome back.")

      // Redirect to home page
      window.location.href = "index.html"
    })
  }

  // Register form submission
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const firstName = document.getElementById("register-first-name").value
      const lastName = document.getElementById("register-last-name").value
      const email = document.getElementById("register-email").value
      const phone = document.getElementById("register-phone").value
      const password = document.getElementById("register-password").value
      const confirmPassword = document.getElementById("register-confirm-password").value

      // Simple validation
      if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        alert("Please fill in all fields")
        return
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match")
        return
      }

      // In a real application, you would send this data to a server to create an account
      // For demo purposes, we'll just simulate a successful registration
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)
      localStorage.setItem("userName", firstName + " " + lastName)

      // Show success message
      alert("Registration successful! Welcome to Audi.")

      // Redirect to home page
      window.location.href = "index.html"
    })
  }

  // Update login button based on login status
  const loginButton = document.querySelector(".login-button")
  if (loginButton) {
    if (localStorage.getItem("isLoggedIn") === "true") {
      const userName = localStorage.getItem("userName") || "User"
      loginButton.textContent = "Hello, " + userName.split(" ")[0]

      // Add logout functionality
      loginButton.addEventListener("click", (e) => {
        if (localStorage.getItem("isLoggedIn") === "true") {
          e.preventDefault()
          if (confirm("Do you want to log out?")) {
            localStorage.removeItem("isLoggedIn")
            localStorage.removeItem("userEmail")
            localStorage.removeItem("userName")
            window.location.reload()
          }
        }
      })
    }
  }

  // =============== CAR BOOKING FUNCTIONALITY ===============

  // Car Booking Form Functionality
  const carBookingForm = document.getElementById("car-booking-form")
  const bookingConfirmationModal = document.querySelector(".booking-confirmation-modal")
  const closeBookingConfirmation = document.querySelector(".booking-confirmation-modal .close-confirmation")
  const continueBrowsingBtn = document.querySelector(".continue-browsing-btn")

  // Model selection for booking
  const carModelSelect = document.getElementById("car-model")
  const carVariantSelect = document.getElementById("car-variant")

  // Populate variants based on selected model
  if (carModelSelect && carVariantSelect) {
    const variants = {
      Q8: ["Q8 Premium Plus", "Q8 Prestige", "Q8 S Line"],
      "e-tron": ["e-tron Premium", "e-tron Sportback", "e-tron GT"],
      A6: ["A6 Premium", "A6 Premium Plus", "A6 Prestige"],
      RS7: ["RS7 Sportback", "RS7 Performance"],
      A4: ["A4 Premium", "A4 Premium Plus", "A4 S Line"],
      Q5: ["Q5 Premium", "Q5 Premium Plus", "Q5 Prestige"],
    }

    carModelSelect.addEventListener("change", function () {
      const selectedModel = this.value

      // Clear current options
      carVariantSelect.innerHTML = '<option value="">Select Variant</option>'

      // Add new options based on selected model
      if (selectedModel && variants[selectedModel]) {
        variants[selectedModel].forEach((variant) => {
          const option = document.createElement("option")
          option.value = variant
          option.textContent = variant
          carVariantSelect.appendChild(option)
        })
      }
    })
  }

  // Finance option toggle
  const financeOptions = document.querySelectorAll('input[name="finance-option"]')
  const financeDetails = document.querySelector(".finance-details")

  if (financeOptions && financeDetails) {
    financeOptions.forEach((option) => {
      option.addEventListener("change", function () {
        if (this.value === "loan" || this.value === "audi-finance") {
          financeDetails.style.display = "block"
        } else {
          financeDetails.style.display = "none"
        }
      })
    })
  }

  // Book Now buttons on model cards
  const bookModelButtons = document.querySelectorAll(".book-model-btn")

  if (bookModelButtons.length > 0 && carModelSelect) {
    bookModelButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        const modelName = this.getAttribute("data-model")
        if (modelName && carModelSelect) {
          carModelSelect.value = modelName
          // Trigger change event to update variants
          const event = new Event("change")
          carModelSelect.dispatchEvent(event)
        }
      })
    })
  }

  // Car booking form submission - FIXED VERSION
  if (carBookingForm) {
    carBookingForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const model = document.getElementById("car-model").value
      const variant = document.getElementById("car-variant").value
      const firstName = document.getElementById("first-name").value
      const lastName = document.getElementById("last-name").value
      const email = document.getElementById("email").value

      // Simple validation
      if (!model || !firstName || !lastName || !email) {
        alert("Please fill in all required fields")
        return
      }

      // Generate booking reference
      const bookingRef = "AUD" + Math.floor(100000 + Math.random() * 900000)

      // Update confirmation modal
      const bookingReference = document.getElementById("booking-reference")
      const bookingEmail = document.getElementById("booking-email")

      if (bookingReference) bookingReference.textContent = bookingRef
      if (bookingEmail) bookingEmail.textContent = email

      // Show confirmation modal - FIXED
      if (bookingConfirmationModal) {
        bookingConfirmationModal.style.display = "flex"
        document.body.style.overflow = "hidden"
      } else {
        // Fallback if modal elements don't exist
        alert(
          `Booking successful! Your reference number is ${bookingRef}. A confirmation email has been sent to ${email}.`,
        )
      }

      // Clear form
      carBookingForm.reset()
    })
  }

  // Close booking confirmation modal
  if (closeBookingConfirmation) {
    closeBookingConfirmation.addEventListener("click", () => {
      if (bookingConfirmationModal) {
        bookingConfirmationModal.style.display = "none"
        document.body.style.overflow = "auto"
      }
    })
  }

  // Continue browsing button
  if (continueBrowsingBtn) {
    continueBrowsingBtn.addEventListener("click", () => {
      if (bookingConfirmationModal) {
        bookingConfirmationModal.style.display = "none"
        document.body.style.overflow = "auto"
      }
    })
  }

  // =============== TEST DRIVE FUNCTIONALITY ===============

  // Test Drive Form Functionality
  const testDriveForm = document.getElementById("drive-form")

  // Test drive form submission
  if (testDriveForm) {
    testDriveForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const model = document.getElementById("preferred-model").value
      const firstName = document.getElementById("first-name").value
      const lastName = document.getElementById("last-name").value
      const email = document.getElementById("email").value
      const date = document.getElementById("preferred-date").value

      // Simple validation
      if (!model || !firstName || !lastName || !email || !date) {
        alert("Please fill in all required fields")
        return
      }

      // Create a custom confirmation modal for test drive
      const testDriveModal = document.createElement("div")
      testDriveModal.classList.add("booking-confirmation-modal")
      testDriveModal.style.display = "flex"
      testDriveModal.innerHTML = `
                <div class="confirmation-content">
                    <div class="confirmation-header">
                        <h3>Test Drive Booked!</h3>
                        <button class="close-confirmation">&times;</button>
                    </div>
                    <div class="confirmation-body">
                        <div class="confirmation-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <p>Thank you for booking a test drive. Your request has been successfully submitted.</p>
                        <div class="booking-details">
                            <p>Model: ${model}</p>
                            <p>Date: ${date}</p>
                            <p>A confirmation email has been sent to ${email}</p>
                        </div>
                        <p>An Audi representative will contact you shortly to confirm your test drive details.</p>
                    </div>
                    <div class="confirmation-footer">
                        <button class="continue-browsing-btn">Continue Browsing</button>
                    </div>
                </div>
            `

      // Add to body
      document.body.appendChild(testDriveModal)
      document.body.style.overflow = "hidden"

      // Close modal functionality
      const closeBtn = testDriveModal.querySelector(".close-confirmation")
      const continueBtn = testDriveModal.querySelector(".continue-browsing-btn")

      closeBtn.addEventListener("click", () => {
        testDriveModal.remove()
        document.body.style.overflow = "auto"
      })

      continueBtn.addEventListener("click", () => {
        testDriveModal.remove()
        document.body.style.overflow = "auto"
      })

      // Clear form
      testDriveForm.reset()
    })
  }

  // =============== SERVICE BOOKING FUNCTIONALITY ===============

  // Service Form Functionality
  const serviceForm = document.getElementById("service-form")

  // Service form submission
  if (serviceForm) {
    serviceForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const model = document.getElementById("car-model").value
      const serviceType = document.getElementById("service-type").value
      const date = document.getElementById("service-date").value
      const time = document.getElementById("service-time").value
      const name = document.getElementById("customer-name").value
      const email = document.getElementById("customer-email").value

      // Simple validation
      if (!model || !serviceType || !date || !time || !name || !email) {
        alert("Please fill in all required fields")
        return
      }

      // Create a custom confirmation modal for service booking
      const serviceModal = document.createElement("div")
      serviceModal.classList.add("booking-confirmation-modal")
      serviceModal.style.display = "flex"
      serviceModal.innerHTML = `
                <div class="confirmation-content">
                    <div class="confirmation-header">
                        <h3>Service Booked!</h3>
                        <button class="close-confirmation">&times;</button>
                    </div>
                    <div class="confirmation-body">
                        <div class="confirmation-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <p>Thank you for booking a service appointment. Your request has been successfully submitted.</p>
                        <div class="booking-details">
                            <p>Service Type: ${serviceType}</p>
                            <p>Model: ${model}</p>
                            <p>Date & Time: ${date} at ${time}</p>
                            <p>A confirmation email has been sent to ${email}</p>
                        </div>
                        <p>Our service team will be ready to assist you at your scheduled appointment time.</p>
                    </div>
                    <div class="confirmation-footer">
                        <button class="continue-browsing-btn">Continue Browsing</button>
                    </div>
                </div>
            `

      // Add to body
      document.body.appendChild(serviceModal)
      document.body.style.overflow = "hidden"

      // Close modal functionality
      const closeBtn = serviceModal.querySelector(".close-confirmation")
      const continueBtn = serviceModal.querySelector(".continue-browsing-btn")

      closeBtn.addEventListener("click", () => {
        serviceModal.remove()
        document.body.style.overflow = "auto"
      })

      continueBtn.addEventListener("click", () => {
        serviceModal.remove()
        document.body.style.overflow = "auto"
      })

      // Clear form
      serviceForm.reset()
    })
  }

  // Login Form Functionality
  //const loginForm = document.getElementById('login-form'); // Remove duplicate declaration
  //const registerForm = document.getElementById('register-form');
  //const authTabs = document.querySelectorAll('.auth-tab');
  //const authForms = document.querySelectorAll('.auth-form');
  //const togglePasswordButtons = document.querySelectorAll('.toggle-password');

  // Toggle between login and register forms
  //if (authTabs.length > 0) {
  //    authTabs.forEach(tab => {
  //        tab.addEventListener('click', function() {
  //            const targetForm = this.getAttribute('data-tab');
  //
  //            // Update active tab
  //            authTabs.forEach(t => t.classList.remove('active'));
  //            this.classList.add('active');
  //
  //            // Show target form
  //            authForms.forEach(form => {
  //                form.classList.remove('active');
  //                if (form.classList.contains(targetForm + '-form')) {
  //                    form.classList.add('active');
  //                }
  //            });
  //        });
  //    }

  // Toggle password visibility
  //if (togglePasswordButtons.length > 0) {
  //    togglePasswordButtons.forEach(button => {
  //        button.addEventListener('click', function() {
  //            const passwordInput = this.previousElementSibling;
  //            const icon = this.querySelector('i');
  //
  //            if (passwordInput.type === 'password') {
  //                passwordInput.type = 'text';
  //                icon.classList.remove('fa-eye');
  //                icon.classList.add('fa-eye-slash');
  //            } else {
  //                passwordInput.type = 'password';
  //                icon.classList.remove('fa-eye-slash');
  //                icon.classList.add('fa-eye');
  //            }
  //        });
  //    }

  // Login form submission
  //if (loginForm) {
  //    loginForm.addEventListener('submit', function(e) {
  //        e.preventDefault();
  //
  //        const email = document.getElementById('login-email').value;
  //        const password = document.getElementById('login-password').value;
  //
  //        // Simple validation
  //        if (!email || !password) {
  //            alert('Please fill in all fields');
  //            return;
  //        }
  //
  //        // In a real application, you would send this data to a server for authentication
  //        // For demo purposes, we'll just simulate a successful login
  //        localStorage.setItem('isLoggedIn', 'true');
  //        localStorage.setItem('userEmail', email);
  //
  //        // Show success message
  //        alert('Login successful! Welcome back.');
  //
  //        // Redirect to home page
  //        window.location.href = 'index.html';
  //    });
  //}

  // Register form submission
  //if (registerForm) {
  //    registerForm.addEventListener('submit', function(e) {
  //        e.preventDefault();
  //
  //        const firstName = document.getElementById('register-first-name').value;
  //        const lastName = document.getElementById('register-last-name').value;
  //        const email = document.getElementById('register-email').value;
  //        const phone = document.getElementById('register-phone').value;
  //        const password = document.getElementById('register-password').value;
  //        const confirmPassword = document.getElementById('register-confirm-password').value;
  //
  //        // Simple validation
  //        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
  //            alert('Please fill in all fields');
  //            return;
  //        }
  //
  //        if (password !== confirmPassword) {
  //            alert('Passwords do not match');
  //            return;
  //        }
  //
  //        // In a real application, you would send this data to a server to create an account
  //        // For demo purposes, we'll just simulate a successful registration
  //        localStorage.setItem('isLoggedIn', 'true');
  //        localStorage.setItem('userEmail', email);
  //        localStorage.setItem('userName', firstName + ' ' + lastName);
  //
  //        // Show success message
  //        alert('Registration successful! Welcome to Audi.');
  //
  //        // Redirect to home page
  //        window.location.href = 'index.html';
  //    });
  //}

  // Update login button based on login status
  //const loginButton = document.querySelector('.login-button');
  //if (loginButton) {
  //    if (localStorage.getItem('isLoggedIn') === 'true') {
  //        const userName = localStorage.getItem('userName') || 'User';
  //        loginButton.textContent = 'Hello, ' + userName.split(' ')[0];
  //
  //        // Add logout functionality
  //        loginButton.addEventListener('click', function(e) {
  //            if (localStorage.getItem('isLoggedIn') === 'true') {
  //                e.preventDefault();
  //                if (confirm('Do you want to log out?')) {
  //                    localStorage.removeItem('isLoggedIn');
  //                    localStorage.removeItem('userEmail');
  //                    localStorage.removeItem('userName');
  //                    window.location.reload();
  //                }
  //            }
  //        });
  //    }
  //}

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const testimonialDots = document.querySelectorAll(".testimonial-dots .dot")
  const testimonialPrev = document.querySelector(".testimonial-prev")
  const testimonialNext = document.querySelector(".testimonial-next")

  if (testimonialSlides.length > 0) {
    let currentTestimonial = 0

    // Show specific testimonial
    function showTestimonial(index) {
      testimonialSlides.forEach((slide) => slide.classList.remove("active"))
      testimonialDots.forEach((dot) => dot.classList.remove("active"))

      testimonialSlides[index].classList.add("active")
      testimonialDots[index].classList.add("active")
      currentTestimonial = index
    }

    // Next testimonial
    function nextTestimonial() {
      currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length
      showTestimonial(currentTestimonial)
    }

    // Previous testimonial
    function prevTestimonial() {
      currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length
      showTestimonial(currentTestimonial)
    }

    // Add event listeners
    if (testimonialNext) {
      testimonialNext.addEventListener("click", nextTestimonial)
    }

    if (testimonialPrev) {
      testimonialPrev.addEventListener("click", prevTestimonial)
    }

    if (testimonialDots.length > 0) {
      testimonialDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showTestimonial(index)
        })
      })
    }

    // Auto rotate testimonials
    setInterval(nextTestimonial, 8000)
  }
})

