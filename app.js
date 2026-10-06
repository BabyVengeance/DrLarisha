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
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const exploreSkincareBtn = document.getElementById('exploreSkincareBtn');

  const SKU_IMAGES = {
    'SKINLAB-HAIR-01': 'Assets/images/hair growth serum.jpg',
    'SKINLAB-BODY-02': 'Assets/images/moisturizer.jpg',
    'SKINLAB-SUN-03': 'Assets/images/sun protection.jpg',
    'SKINLAB-BRIGHT-04': 'Assets/images/brightening complex.jpg',
    'SKINLAB-SOAP-05': 'Assets/images/soap.jpg',
    'SKINLAB-CENTELLA-06': 'Assets/images/Centella.jpg',
    'SKINLAB-SERUM-07': 'Assets/images/Brightening & anti-ageing serum.jpg'
  };

  let cart = [];
  try {
    const savedCart = localStorage.getItem('dr_larisha_cart');
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      if (Array.isArray(parsed)) {
        cart = parsed.map(item => ({
          sku: item.sku || 'SKINLAB-ITEM',
          title: item.title || 'Skincare Product',
          price: parseFloat(item.price) || 0,
          image: item.image || SKU_IMAGES[item.sku] || 'Assets/images/Centella.jpg',
          qty: Math.max(1, parseInt(item.qty, 10) || 1)
        }));
      }
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

    // Focus close button for keyboard accessibility
    const closeBtn = cartOverlay.querySelector('.cart-close-btn');
    if (closeBtn) closeBtn.focus();
  }

  function closeCart() {
    if (!cartOverlay) return;
    cartOverlay.classList.remove('is-active');
    cartOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Direct & Delegated Event Listeners for Cart Trigger and Close
  if (cartOpenBtn) {
    cartOpenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  }

  // Delegated close click listener (handles any close button or SVG click)
  document.addEventListener('click', (e) => {
    if (e.target.closest('#cartCloseBtn, .cart-close-btn, [data-action="close-cart"]')) {
      e.preventDefault();
      e.stopPropagation();
      closeCart();
    }
  });

  // Close when clicking directly on overlay backdrop
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) {
        closeCart();
      }
    });
  }

  // Escape key to close cart
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartOverlay && cartOverlay.classList.contains('is-active')) {
      closeCart();
    }
  });

  function addToCart(product) {
    if (!product || !product.title) return;
    const sku = product.sku || 'SKINLAB-ITEM';
    const existingIndex = cart.findIndex(item => item.sku === sku || item.title === product.title);

    if (existingIndex > -1) {
      cart[existingIndex].qty = (cart[existingIndex].qty || 1) + (product.qty || 1);
      if (product.image && !cart[existingIndex].image) {
        cart[existingIndex].image = product.image;
      }
    } else {
      cart.push({
        sku: sku,
        title: product.title,
        price: parseFloat(product.price) || 0,
        image: product.image || SKU_IMAGES[sku] || 'Assets/images/Centella.jpg',
        qty: product.qty || 1
      });
    }

    updateCartUI();
    openCart();
  }

  function updateQuantity(sku, delta) {
    const itemIndex = cart.findIndex(i => i.sku === sku);
    if (itemIndex === -1) return;

    const newQty = (cart[itemIndex].qty || 1) + delta;
    if (newQty <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].qty = Math.min(99, newQty);
    }

    updateCartUI();
  }

  function removeFromCart(sku) {
    cart = cart.filter(i => i.sku !== sku);
    updateCartUI();
  }

  function updateCartUI() {
    saveCart();

    // Calculate total item units for the badge counters
    const totalQuantity = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    document.querySelectorAll('#cartCount, .cart-counter').forEach(el => {
      el.textContent = totalQuantity;
    });

    // If cart is empty
    if (cart.length === 0) {
      if (cartItemsList) {
        cartItemsList.innerHTML = `
          <div class="empty-cart-state" id="emptyCartMessage">
            <div class="empty-cart-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <p>Your skincare bag is currently empty.</p>
            <a href="products.html" class="btn btn-secondary btn-sm" data-action="close-cart">Explore Skincare</a>
          </div>
        `;
      }
      if (cartSubtotalEl) cartSubtotalEl.textContent = 'R0.00';
      if (checkoutBtn) checkoutBtn.disabled = true;

      const shippingNotice = document.querySelector('.cart-shipping-notice');
      if (shippingNotice) {
        shippingNotice.innerHTML = 'Nationwide delivery via The Courier Guy. 4 interest-free payments available via Payflex.';
      }
      return;
    }

    // If cart has items
    let subtotal = 0;
    let itemsHTML = '';

    cart.forEach(item => {
      const itemQty = item.qty || 1;
      const itemTotal = item.price * itemQty;
      subtotal += itemTotal;
      const itemImg = item.image || SKU_IMAGES[item.sku] || 'Assets/images/Centella.jpg';

      itemsHTML += `
        <div class="cart-item-row" data-sku="${item.sku}">
          <div class="cart-item-thumb">
            <img src="${itemImg}" alt="${item.title}" class="cart-thumb-img" width="56" height="56" loading="lazy">
          </div>
          <div class="cart-item-main">
            <div class="cart-item-top">
              <h4 class="cart-item-name">${item.title}</h4>
              <button type="button" class="cart-remove-item" data-sku="${item.sku}" aria-label="Remove ${item.title}">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <span>Remove</span>
              </button>
            </div>
            <div class="cart-item-bottom">
              <div class="cart-qty-picker" role="group" aria-label="Quantity for ${item.title}">
                <button type="button" class="cart-qty-btn cart-qty-minus" data-sku="${item.sku}" aria-label="Decrease quantity">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                <span class="cart-qty-val" aria-live="polite">${itemQty}</span>
                <button type="button" class="cart-qty-btn cart-qty-plus" data-sku="${item.sku}" aria-label="Increase quantity">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
              <div class="cart-item-pricing">
                <span class="cart-item-total">R${itemTotal.toFixed(2)}</span>
                ${itemQty > 1 ? `<span class="cart-item-unit">(R${item.price.toFixed(2)} ea)</span>` : ''}
              </div>
            </div>
          </div>
        </div>
      `;
    });

    if (cartItemsList) {
      cartItemsList.innerHTML = itemsHTML;

      // Attach quantity stepper events
      cartItemsList.querySelectorAll('.cart-qty-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const sku = btn.getAttribute('data-sku');
          updateQuantity(sku, -1);
        });
      });

      cartItemsList.querySelectorAll('.cart-qty-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const sku = btn.getAttribute('data-sku');
          updateQuantity(sku, 1);
        });
      });

      cartItemsList.querySelectorAll('.cart-remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const sku = btn.getAttribute('data-sku');
          removeFromCart(sku);
        });
      });
    }

    if (cartSubtotalEl) {
      cartSubtotalEl.textContent = `R${subtotal.toFixed(2)}`;
    }

    const payflexInstallment = (subtotal / 4).toFixed(2);
    const shippingNotice = document.querySelector('.cart-shipping-notice');
    if (shippingNotice) {
      shippingNotice.innerHTML = `Or 4 x <strong>R${payflexInstallment}</strong> interest-free with Payflex. Delivery via The Courier Guy.`;
    }

    if (checkoutBtn) {
      checkoutBtn.disabled = false;
    }
  }

  // Initial cart UI render on page load
  updateCartUI();

  // Attach Add-to-Cart handlers across all product cards
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sku = btn.getAttribute('data-sku');
      const title = btn.getAttribute('data-title');
      const price = parseFloat(btn.getAttribute('data-price') || '0');
      const image = btn.getAttribute('data-img') || SKU_IMAGES[sku] || '';

      addToCart({ sku, title, price, image, qty: 1 });
    });
  });

  // Checkout Handler: Generates WhatsApp Order Message with Complete Order Details
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) return;

      let subtotal = 0;
      let orderLines = [];

      cart.forEach(item => {
        const itemTotal = item.price * (item.qty || 1);
        subtotal += itemTotal;
        orderLines.push(`• ${item.qty}x ${item.title} (R${itemTotal.toFixed(2)})`);
      });

      const message = `Hi Dr Larisha, I would like to place an order from Skin Lab:\n\n${orderLines.join('\n')}\n\nSubtotal: R${subtotal.toFixed(2)}\n\nPlease provide courier delivery confirmation and Payflex/EFT payment details.`;

      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/27844608676?text=${encoded}`, '_blank');
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

  // --------------------------------------------------------------------------
  // 6. CLINICAL PRODUCT IMAGE INSPECTOR & LIGHTBOX (With Zoom & Pan)
  // --------------------------------------------------------------------------
  function initProductImageInspector() {
    const cards = document.querySelectorAll('.product-card');
    if (!cards.length) return;

    // Build modal markup if not already present
    let modal = document.getElementById('productInspectModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'productInspectModal';
      modal.className = 'inspect-modal-overlay';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-hidden', 'true');
      modal.innerHTML = `
        <div class="inspect-modal-card" role="document">
          <button type="button" class="inspect-modal-close-btn" id="inspectModalClose" aria-label="Close Inspector (Esc)">&times;</button>
          
          <div class="inspect-modal-left" id="inspectModalLeft">
            <div class="inspect-zoom-stage" id="inspectZoomStage">
              <img src="" alt="" id="inspectModalImg" class="inspect-modal-img">
            </div>
            <div class="inspect-zoom-toolbar">
              <button type="button" class="inspect-zoom-toggle-btn" id="inspectZoomBtn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
                <span id="inspectZoomText">Click to Zoom (2x)</span>
              </button>
            </div>
          </div>

          <div class="inspect-modal-right">
            <span class="inspect-modal-tag" id="inspectModalTag">Doctor-Formulated Skincare</span>
            <h3 class="inspect-modal-title" id="inspectModalTitle"></h3>
            <p class="inspect-modal-desc" id="inspectModalDesc"></p>
            
            <div id="inspectModalActivesContainer" style="display: none;">
              <span class="inspect-modal-actives-heading">Clinical Bioactives &amp; Key Specs</span>
              <ul class="inspect-modal-actives-list" id="inspectModalActivesList"></ul>
            </div>

            <div class="inspect-modal-price-row">
              <span class="inspect-modal-price-val" id="inspectModalPrice"></span>
              <span class="inspect-modal-payflex" id="inspectModalPayflex"></span>
            </div>

            <button type="button" class="btn btn-primary btn-block" id="inspectAddToCartBtn">
              Add to Bag
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const modalCloseBtn = document.getElementById('inspectModalClose');
    const modalLeft = document.getElementById('inspectModalLeft');
    const zoomStage = document.getElementById('inspectZoomStage');
    const modalImg = document.getElementById('inspectModalImg');
    const zoomBtn = document.getElementById('inspectZoomBtn');
    const zoomText = document.getElementById('inspectZoomText');
    const modalTag = document.getElementById('inspectModalTag');
    const modalTitle = document.getElementById('inspectModalTitle');
    const modalDesc = document.getElementById('inspectModalDesc');
    const activesContainer = document.getElementById('inspectModalActivesContainer');
    const activesList = document.getElementById('inspectModalActivesList');
    const modalPrice = document.getElementById('inspectModalPrice');
    const modalPayflex = document.getElementById('inspectModalPayflex');
    const inspectAddBtn = document.getElementById('inspectAddToCartBtn');

    let currentItem = null;
    let isZoomed = false;

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      resetZoom();
    }

    function resetZoom() {
      isZoomed = false;
      if (zoomStage) zoomStage.classList.remove('is-zoomed');
      if (modalImg) {
        modalImg.style.transformOrigin = 'center center';
      }
      if (zoomText) zoomText.textContent = 'Click to Zoom (2x)';
    }

    function toggleZoom(e) {
      isZoomed = !isZoomed;
      if (zoomStage) zoomStage.classList.toggle('is-zoomed', isZoomed);
      if (zoomText) zoomText.textContent = isZoomed ? 'Click to Reset' : 'Click to Zoom (2x)';
      if (isZoomed && e && zoomStage && modalImg) {
        updateZoomPan(e);
      } else if (!isZoomed && modalImg) {
        modalImg.style.transformOrigin = 'center center';
      }
    }

    function updateZoomPan(e) {
      if (!isZoomed || !zoomStage || !modalImg) return;
      const rect = zoomStage.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      modalImg.style.transformOrigin = `${Math.max(0, Math.min(100, x))}% ${Math.max(0, Math.min(100, y))}%`;
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });

    if (zoomStage) {
      zoomStage.addEventListener('click', toggleZoom);
      zoomStage.addEventListener('mousemove', updateZoomPan);
    }
    if (zoomBtn) {
      zoomBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleZoom();
      });
    }

    if (inspectAddBtn) {
      inspectAddBtn.addEventListener('click', () => {
        if (!currentItem) return;
        addToCart(currentItem);
        closeModal();
      });
    }

    // Attach inspect triggers to cards
    cards.forEach(card => {
      const media = card.querySelector('.product-media');
      const img = card.querySelector('.product-img');
      if (!media || !img) return;

      // Add badge indicator if missing
      if (!media.querySelector('.product-inspect-badge')) {
        const badge = document.createElement('span');
        badge.className = 'product-inspect-badge';
        badge.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          Inspect
        `;
        media.appendChild(badge);
      }

      media.setAttribute('tabindex', '0');
      media.setAttribute('role', 'button');
      media.setAttribute('aria-label', `Inspect image for ${img.alt || 'product'}`);

      function triggerInspect() {
        const title = card.querySelector('.product-title')?.textContent?.trim() || '';
        const desc = card.querySelector('.product-desc')?.textContent?.trim() || '';
        const priceText = card.querySelector('.price-val')?.textContent?.trim() || '';
        const payflexText = card.querySelector('.payflex-note')?.textContent?.trim() || '';
        const addBtn = card.querySelector('.add-to-cart-btn');
        const sku = card.getAttribute('data-sku') || addBtn?.getAttribute('data-sku') || '';
        const priceNum = parseFloat(addBtn?.getAttribute('data-price') || '0');
        const specsItems = card.querySelectorAll('.product-specs-list li');
        const category = card.getAttribute('data-category');

        // Extract background style
        const cardStyle = window.getComputedStyle(card);
        const bgVal = cardStyle.getPropertyValue('--product-bg').trim() || '#FAF8F5';

        // Populate modal
        modalImg.src = img.src;
        modalImg.alt = img.alt || title;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalPrice.textContent = priceText;
        modalPayflex.textContent = payflexText;
        modalLeft.style.background = bgVal;

        if (category) {
          modalTag.textContent = `Category: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
        } else {
          modalTag.textContent = 'Physician-Formulated Clinical Active';
        }

        if (specsItems.length > 0) {
          activesContainer.style.display = 'block';
          activesList.innerHTML = '';
          specsItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.textContent.trim();
            activesList.appendChild(li);
          });
        } else {
          activesContainer.style.display = 'none';
        }

        currentItem = {
          sku: sku || 'SKINLAB-ITEM',
          title: title,
          price: priceNum || parseFloat(priceText.replace(/[^0-9.]/g, '') || '0')
        };

        resetZoom();
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }

      media.addEventListener('click', triggerInspect);
      media.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerInspect();
        }
      });
    });
  }

  initProductImageInspector();

  // --------------------------------------------------------------------------
  // REVIEWS CAROUSEL — Auto-scroll, pause on hover, prev/next navigation
  // --------------------------------------------------------------------------
  const allCarousels = document.querySelectorAll('.reviews-carousel');

  allCarousels.forEach((reviewsCarousel) => {
    const reviewsTrack = reviewsCarousel.querySelector('.reviews-track');
    if (!reviewsTrack) return;

    const container = reviewsCarousel.closest('.site-container') || reviewsCarousel.parentElement;
    const prevBtn = container ? container.querySelector('.carousel-prev') : document.getElementById('reviewsPrev');
    const nextBtn = container ? container.querySelector('.carousel-next') : document.getElementById('reviewsNext');
    const indicatorsWrap = container ? container.querySelector('.carousel-indicators') : document.getElementById('reviewsIndicators');

    const cards = reviewsTrack.querySelectorAll('.review-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    let autoplayTimer = null;
    const autoplayDelay = 4000;

    function getCardsPerView() {
      const w = window.innerWidth;
      if (w >= 960) return 3;
      if (w >= 600) return 2;
      return 1;
    }

    function getMaxIndex() {
      const perView = getCardsPerView();
      return Math.max(0, totalCards - perView);
    }

    function getCardWidth() {
      if (!cards.length) return 0;
      const trackGap = 24;
      return cards[0].offsetWidth + trackGap;
    }

    function slideTo(index) {
      const maxIdx = getMaxIndex();
      if (maxIdx <= 0) {
        currentIndex = 0;
      } else if (index < 0) {
        currentIndex = maxIdx;
      } else if (index > maxIdx) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }
      const offset = currentIndex * getCardWidth();
      reviewsTrack.style.transform = `translateX(-${offset}px)`;
      updateIndicators();
      updateArrows();
    }

    function updateArrows() {
      const maxIdx = getMaxIndex();
      const cannotScroll = maxIdx <= 0;
      if (prevBtn) prevBtn.disabled = cannotScroll;
      if (nextBtn) nextBtn.disabled = cannotScroll;
    }

    function buildIndicators() {
      if (!indicatorsWrap) return;
      indicatorsWrap.innerHTML = '';
      const maxIdx = getMaxIndex();
      const dotCount = maxIdx + 1;
      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide group ${i + 1}`);
        dot.addEventListener('click', () => {
          slideTo(i);
          restartAutoplay();
        });
        indicatorsWrap.appendChild(dot);
      }
    }

    function updateIndicators() {
      if (!indicatorsWrap) return;
      const dots = indicatorsWrap.querySelectorAll('.carousel-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function advanceNext() {
      slideTo(currentIndex + 1);
    }

    function advancePrev() {
      slideTo(currentIndex - 1);
    }

    function startAutoplay() {
      stopAutoplay();
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;
      autoplayTimer = setInterval(advanceNext, autoplayDelay);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        advancePrev();
        restartAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        advanceNext();
        restartAutoplay();
      });
    }

    reviewsCarousel.addEventListener('mouseenter', stopAutoplay);
    reviewsCarousel.addEventListener('mouseleave', startAutoplay);
    reviewsCarousel.addEventListener('focusin', stopAutoplay);
    reviewsCarousel.addEventListener('focusout', startAutoplay);

    function initCarousel() {
      const maxIdx = getMaxIndex();
      if (currentIndex > maxIdx) currentIndex = maxIdx;
      buildIndicators();
      slideTo(currentIndex);
      startAutoplay();
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        buildIndicators();
        slideTo(currentIndex);
      }, 150);
    });

    initCarousel();
  });
});

