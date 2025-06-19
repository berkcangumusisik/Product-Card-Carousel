(() => {
  const init = () => {
    if (!window.location.href.includes("e-bebek.com")) {
      console.log("wrong page");
      return;
    }
    
    buildHTML();
    buildCSS();
    buildUtils();
    setEvents();
  };

  const buildHTML = () => {
    const html = `
      <div class="e-bebek-custom-wrapper">
        <div class="e-bebek-slider-wrapper">
          <div class="e-bebek-banner-titles">
            <h2 class="e-bebek-custom-carousel-title">Beğenebileceğinizi düşündüklerimiz</h2>
          </div>
          <div class="e-bebek-slider-controls">
            <button class="e-bebek-swiper-prev" aria-label="Previous"></button>
            <div class="e-bebek-product-carousel">
            </div>
            <button class="e-bebek-swiper-next" aria-label="Next"></button>
          </div>
        </div>
      </div>
    `;
    
    const heroBanner = document.querySelector(".hero.banner");
    if (!heroBanner) {
        return;
    }
    
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    const ebWrapper = wrapper.firstElementChild;
    
    heroBanner.insertAdjacentElement("afterend", ebWrapper);
  };

  const buildCSS = () => {
    const css = `
      .e-bebek-custom-wrapper {
        padding: 32px 0;
        margin-top: 32px;
      }

      .e-bebek-slider-wrapper {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 1320px;
        margin: 0 auto;
        position: relative;
        background-color: #fff;
        box-shadow: 15px 15px 30px 0 #ebebeb80;
        border-bottom-left-radius: 35px;
        border-bottom-right-radius: 35px;
        padding-bottom: 32px;
      }

      .e-bebek-banner-titles {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fef6eb;
        padding: 25px 67px;
        border-top-left-radius: 35px;
        border-top-right-radius: 35px;
        font-family: Quicksand-Bold;
        font-weight: 700;
      }

      .e-bebek-custom-carousel-title {
        font-family: Quicksand-Bold;
        font-size: 3rem;
        color: #f28e00;
        font-weight: 700;
        text-align: left;
        line-height: 1.11;
        margin: 0;
      }

      .e-bebek-slider-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 0 67px;
      }

      .e-bebek-product-carousel {
        display: flex;
        gap: 12px;
        overflow-x: hidden;
        padding: 8px;
        scroll-behavior: smooth;
        cursor: grab;
        flex: 1;
      }

      .e-bebek-product-carousel.dragging {
        cursor: grabbing !important;
        user-select: none;
      }

      .e-bebek-swiper-prev,
      .e-bebek-swiper-next {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #fef6eb;
        border: 1px solid transparent;
        cursor: pointer;
        transition: all 0.3s ease;
        flex-shrink: 0;
      }

      .e-bebek-swiper-prev {
        background-image: url(/assets/svg/prev.svg);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 18px 18px;
      }

      .e-bebek-swiper-next {
        background-image: url(/assets/svg/next.svg);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 18px 18px;
      }

      .e-bebek-swiper-prev:hover,
      .e-bebek-swiper-next:hover {
        background-color: #fff;
        border-color: #f28e00;
      }

      .e-bebek-product-cart {
        flex: 0 0 calc((100% - 48px) / 5);
        box-sizing: border-box;
        border: 1px solid #eee;
        border-radius: 8px;
        padding: 12px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
        min-height: 420px;
        position: relative;
        transition: border-color 0.3s ease;
      }

      .e-bebek-product-cart:hover {
        border: 1px solid #ff6600;
        cursor: pointer;
      }

      .e-bebek-fav-icon {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 3;
        transition: all 0.3s ease;
      }

      .e-bebek-fav-icon:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .e-bebek-heart-icon {
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .e-bebek-heart-icon {
        transition: fill 0.3s ease;
      }

      .e-bebek-product-cart img {
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: 203px;
        object-fit: contain;
        transform: scale(1);
        opacity: 1;
        transition: all 0.6s;
      }

      .e-bebek-product-cart h3 {
        font-family: "Poppins", cursive;
        font-size: 11.52px;
        color: #7d7d7d;
        text-align: left;
        min-height: 44px;
        overflow: hidden;
        margin: 0;
      }

      .e-bebek-price-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }

      .e-bebek-price {
        font-family: "Poppins", cursive;
        color: #7d7d7d;
        font-weight: 600;
        font-size: 21.12px;
      }

      .e-bebek-price.discount {
        color: #00a365;
        font-size: 2.2rem;
        font-weight: 600;
      }

      .e-bebek-original-price-line {
        display: flex;
        align-items: baseline;
        gap: 6px;
      }

      .e-bebek-original-price {
        font-family: "Poppins", cursive;
        text-decoration: line-through;
        color: #7d7d7d;
        font-size: 1.4rem;
        font-weight: 500;
      }

      .e-bebek-discount {
        font-family: "Poppins", cursive;
        color: #00a365;
        font-size: 18px;
        font-weight: 700;
        line-height: 1;
      }

      .e-bebek-icon-decrease {
        display: inline-block;
        vertical-align: middle;
        margin-left: 4px;
        font-size: 22px;
        line-height: 1;
        height: 1em;
        overflow: hidden;
        padding-top: 4px;
      }

      .e-bebek-add-to-card {
        font-family: "Poppins", cursive;
        width: 100%;
        padding: 15px 20px;
        border-radius: 37.5px;
        background-color: #fff7ec;
        color: #f28e00;
        font-size: 1.4rem;
        font-weight: 700;
        margin-top: 25px;
        position: relative;
        z-index: 2;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .e-bebek-add-to-card:hover {
        background-color: #f28e00;
        color: #fff;
      }

      @media (max-width: 1280px) {
        .e-bebek-product-cart {
          flex: 0 0 calc((100% - 36px) / 4);
        }
      }

      @media (max-width: 1024px) {
        .e-bebek-product-cart {
          flex: 0 0 calc((100% - 24px) / 3);
        }
      }

      @media (max-width: 768px) {
        .e-bebek-product-cart {
          flex: 0 0 calc((100% - 12px) / 2);
        }
        
        .e-bebek-slider-controls {
          padding: 0 20px;
        }
        
        .e-bebek-banner-titles {
          padding: 20px 20px;
        }
        
        .e-bebek-custom-carousel-title {
          font-size: 2rem;
        }
      }

      @media (max-width: 480px) {
        .e-bebek-product-cart {
          flex: 0 0 100%;
        }
      }
    `;
    
    const styleElement = document.createElement("style");
    styleElement.className = "carousel-style";
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
  };

  const buildUtils = () => {
    const STORAGE_KEYS = {
      PRODUCTS: "e-bebek-Products",
      FAVORITES: "e-bebek-Favorites"
    };

    const PRODUCTS_API = "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json";

    const saveToStorage = (key, data) => {
      localStorage.setItem(key, JSON.stringify(data));
    };

    const getFromStorage = (key) => {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    };

    const getDiscountPercent = (original_price, price) => {
      if (original_price <= 0) {
        return 0;
      }
      return Math.round(((original_price - price) / original_price) * 100);
    };

    const checkIfHasDiscount = (product) => {
      return product.original_price !== product.price;
    };

    const toggleFavorite = (productId, event) => {
      event.preventDefault();
      event.stopPropagation();
      
      let favorites = getFromStorage(STORAGE_KEYS.FAVORITES) || [];
      const isFavorite = favorites.some(item => item.id === productId);
      
      if (isFavorite) {
        favorites = favorites.filter(item => item.id !== productId);
      } else {
        const product = getFromStorage(STORAGE_KEYS.PRODUCTS).find(p => p.id === productId);
        if (product) {
          favorites.push({
            id: product.id,
            name: product.name,
            img: product.img,
            url: product.url,
          });
        }
      }
      
      saveToStorage(STORAGE_KEYS.FAVORITES, favorites);
      
      const heartIcon = event.currentTarget.querySelector(".e-bebek-heart-icon path");
      if (heartIcon) {
        heartIcon.setAttribute("fill", !isFavorite ? "#ff6600" : "none");
      }
    };

    const fetchProducts = async () => {
      const products = getFromStorage(STORAGE_KEYS.PRODUCTS);
      if (products) {
        return products;
      }
      
      try {
        const response = await fetch(PRODUCTS_API);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const products = await response.json();
        saveToStorage(STORAGE_KEYS.PRODUCTS, products);
        return products;
      } catch (error) {
        return [];
      }
    };

    const createProductCard = (product) => {
      const hasDiscount = checkIfHasDiscount(product);
      const discountPercent = hasDiscount ? getDiscountPercent(product.original_price, product.price) : 0;
      const favorites = getFromStorage(STORAGE_KEYS.FAVORITES) || [];
      const isFavorite = favorites.some(item => item.id === product.id);
      
      const card = document.createElement("div");
      card.className = "e-bebek-product-cart";
      
      card.innerHTML = `
        <div class="e-bebek-fav-icon">
          <svg class="e-bebek-heart-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke="#ff6600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"
              fill="${isFavorite ? '#ff6600' : 'none'}" />
          </svg>
        </div>
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name || product.short_name}</h3>
        <div class="e-bebek-price-wrapper">
          ${hasDiscount ? `
          <div class="e-bebek-original-price-line">
            <span class="e-bebek-original-price">${product.original_price}₺</span>
            <span class="e-bebek-discount">-%${discountPercent}<i class="e-bebek-icon-decrease">▼</i></span>
          </div>
          ` : ''}
          <span class="e-bebek-price ${hasDiscount ? 'discount' : ''}">${product.price}₺</span>
        </div>
        <button class="e-bebek-add-to-card">Sepete Ekle</button>
      `;
      
      // Add event listener for favorite button
      const favIcon = card.querySelector(".e-bebek-fav-icon");
      favIcon.addEventListener("click", (event) => toggleFavorite(product.id, event));
      
      card.onclick = () => window.open(product.url, "_blank");
      
      return card;
    };

    const renderProducts = (products) => {
      const carousel = document.querySelector(".e-bebek-product-carousel");
      if (carousel) {
        carousel.innerHTML = "";
        products.forEach(product => {
          const card = createProductCard(product);
          carousel.appendChild(card);
        });
      }
    };

    const setupCarousel = () => {
      const carousel = document.querySelector(".e-bebek-product-carousel");
      const prevBtn = document.querySelector(".e-bebek-swiper-prev");
      const nextBtn = document.querySelector(".e-bebek-swiper-next");
      
      if (!carousel) return;
      
      let isDragging = false;
      let startX;
      let scrollLeft;
      
      carousel.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.classList.add("dragging");
      });
      
      ["mouseleave", "mouseup"].forEach((type) => {
        carousel.addEventListener(type, () => {
          isDragging = false;
          carousel.classList.remove("dragging");
        });
      });
      
      carousel.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5;
        carousel.scrollLeft = scrollLeft - walk;
      });
      
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          carousel.scrollLeft -= carousel.offsetWidth;
        });
      }
      
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          carousel.scrollLeft += carousel.offsetWidth;
        });
      }
    };

    const updateCardWidths = () => {
      const cards = document.querySelectorAll(".e-bebek-product-cart");
      const carousel = document.querySelector(".e-bebek-product-carousel");
      if (!carousel || cards.length === 0) return;
      
      let cardCount = 5;
      
      if (window.innerWidth <= 480) {
        cardCount = 1;
      } else if (window.innerWidth <= 768) {
        cardCount = 2;
      } else if (window.innerWidth <= 1024) {
        cardCount = 3;
      } else if (window.innerWidth <= 1280) {
        cardCount = 4;
      }
      
      const gap = 12;
      const totalGap = (cardCount - 1) * gap;
      const containerWidth = carousel.offsetWidth;
      const cardWidth = (containerWidth - totalGap) / cardCount;
      
      cards.forEach((card) => {
        card.style.flex = `0 0 ${cardWidth}px`;
      });
    };

    window.utils = {
      fetchProducts,
      renderProducts,
      setupCarousel,
      updateCardWidths
    };
  };

  const setEvents = () => {
    window.utils.fetchProducts().then(products => {
      if (products.length === 0) {
        return;
      }
      
      window.utils.renderProducts(products);
      window.utils.setupCarousel();
      window.utils.updateCardWidths();
      
      window.addEventListener("resize", window.utils.updateCardWidths);
    }).catch(error => {
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();