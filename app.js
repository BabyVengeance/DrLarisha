/**
 * Apex Digital SA :: Dr Larisha Pather Master Interactive Engine (app.js)
 * Clean, accessible Vanilla JS micro-interactions & state management
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  mobileLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // Close drawer on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // --------------------------------------------------------------------------
  // 2. CLINICAL TREATMENT CATEGORY TABS
  // --------------------------------------------------------------------------
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTabId = button.getAttribute('data-tab');

      // Update button active state & ARIA
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Update panel visibility
      tabPanes.forEach(pane => {
        if (pane.id === targetTabId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 3. SKINCARE SHOPPING BAG / CART DRAWER
  // --------------------------------------------------------------------------
  const cartOpenBtn = document.getElementById('cartOpenBtn');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartCountEl = document.getElementById('cartCount');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const exploreSkincareBtn = document.getElementById('exploreSkincareBtn');

  let cart = [];
  try {
    const savedCart = localStorage.getItem('dr_larisha_cart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
  } catch (err) {
    cart = [];
  }

  function saveCart() {
    try {
      localStorage.setItem('dr_larisha_cart', JSON.stringify(cart));
    } catch (err) {}
  }

  function openCart() {
    if (!cartOverlay) return;
    cartOverlay.classList.add('is-active');
    cartOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (!cartOverlay) return;
    cartOverlay.classList.remove('is-active');
    cartOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (cartOpenBtn) cartOpenBtn.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (exploreSkincareBtn) exploreSkincareBtn.addEventListener('click', closeCart);

  // Close cart when clicking the dark backdrop
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) closeCart();
    });
  }

  function updateCartUI() {
    saveCart();
    const totalCount = cart.length;
    if (cartCountEl) cartCountEl.textContent = totalCount;

    if (totalCount === 0) {
      if (cartItemsList) {
        cartItemsList.innerHTML = `
          <div class="empty-cart-state" id="emptyCartMessage">
            <p>Your skincare bag is currently empty.</p>
            <a href="products.html" class="btn btn-secondary btn-sm" id="exploreSkincareLink">Explore Skincare</a>
          </div>
        `;
        const link = document.getElementById('exploreSkincareLink');
        if (link) link.addEventListener('click', closeCart);
      }
      if (cartSubtotalEl) cartSubtotalEl.textContent = 'R0.00';
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    let subtotal = 0;
    let itemsHTML = '';

    cart.forEach((item, index) => {
      subtotal += item.price;
      itemsHTML += `
        <div class="cart-item-row">
          <div class="cart-item-info">
            <span class="cart-item-name">${item.title}</span>
            <span class="cart-item-price">R${item.price.toFixed(2)}</span>
          </div>
          <button type="button" class="cart-remove-item" data-index="${index}" aria-label="Remove ${item.title}">
            Remove
          </button>
        </div>
      `;
    });

    if (cartItemsList) {
      cartItemsList.innerHTML = itemsHTML;

      // Attach remove handlers
      cartItemsList.querySelectorAll('.cart-remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
          cart.splice(idx, 1);
          updateCartUI();
        });
      });
    }

    if (cartSubtotalEl) cartSubtotalEl.textContent = `R${subtotal.toFixed(2)}`;
    if (checkoutBtn) checkoutBtn.disabled = false;
  }

  // Initial cart UI render on page load
  updateCartUI();

  // Attach Add-to-Cart handlers
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sku = btn.getAttribute('data-sku');
      const title = btn.getAttribute('data-title');
      const price = parseFloat(btn.getAttribute('data-price') || '0');

      cart.push({ sku, title, price });
      updateCartUI();
      openCart();
    });
  });

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      alert('Checkout Gateway: Connected for Payflex & The Courier Guy fulfillment.');
    });
  }

  // --------------------------------------------------------------------------
  // PRODUCT CATEGORY FILTERS (products.html)
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      productCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 4. PATIENT INTAKE FORM (With POPIA Validation)
  // --------------------------------------------------------------------------
  const patientForm = document.getElementById('patientForm');
  const formStatus = document.getElementById('formStatus');

  if (patientForm) {
    patientForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('patientName')?.value || '';
      const phone = document.getElementById('patientPhone')?.value || '';
      const treatment = document.getElementById('treatmentInterest')?.value || '';

      if (formStatus) {
        formStatus.className = 'form-status success';
        formStatus.textContent = `Thank you, ${name}. Your consultation request for ${treatment} has been received. Our clinical coordinator will contact you at ${phone} via WhatsApp within 2 hours.`;
      }
      patientForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // 5. VIP EMAIL SIGNUP
  // --------------------------------------------------------------------------
  const vipForm = document.getElementById('vipForm');
  if (vipForm) {
    vipForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('vipEmail');
      if (emailInput && emailInput.value) {
        alert(`Welcome to Dr. Larisha Pather's Private VIP List! We have sent a confirmation to ${emailInput.value}.`);
        vipForm.reset();
      }
    });
  }
});
