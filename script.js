// ===== Create popup HTML once (no need to add manually) =====
  const popupOverlay = document.createElement("div");
  popupOverlay.className = "popup-overlay";
  popupOverlay.id = "productPopup";
  popupOverlay.innerHTML = `
    <div class="popup" role="dialog" aria-modal="true">
      <button class="popup-close" type="button" aria-label="Close">✕</button>
      <div class="popup-image"><img id="popupImg" alt=""></div>
      <div class="popup-content">
        <h2 class="popup-title" id="popupTitle"></h2>
        <p class="popup-desc" id="popupDesc"></p>
        <div class="popup-subtitle">ინგრედიენტები</div>
        <ul class="popup-ingredients" id="popupIng"></ul>
      </div>
    </div>
  `;
  document.body.appendChild(popupOverlay);

  const popupImg   = document.getElementById("popupImg");
  const popupTitle = document.getElementById("popupTitle");
  const popupDesc  = document.getElementById("popupDesc");
  const popupIng   = document.getElementById("popupIng");
  const closeBtn   = popupOverlay.querySelector(".popup-close");

  function openPopupFromCard(card){
    // pull data from your exact structure
    const imgEl = card.querySelector(".card-image-wrapper img");
    const titleEl = card.querySelector(".card-footer .heading-2");
    const descEl = card.querySelector(".card-footer p");

    const ingredientsStr = (card.dataset.ingredients || "").trim();

    // fill popup
    popupImg.src = imgEl ? imgEl.currentSrc || imgEl.src : "";
    popupImg.alt = titleEl ? titleEl.textContent.trim() : "Product image";
    popupTitle.textContent = titleEl ? titleEl.textContent.trim() : "";
    popupDesc.textContent  = descEl ? descEl.textContent.trim() : "";

    // ingredients list
    popupIng.innerHTML = "";
    if (ingredientsStr.length) {
      ingredientsStr.split(",").forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.trim();
        popupIng.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.textContent = "—";
      popupIng.appendChild(li);
    }

    // show
    popupOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closePopup(){
    popupOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Bind clicks to your existing cards
  document.querySelectorAll(".card").forEach(card => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => openPopupFromCard(card));
  });

  // Close interactions
  closeBtn.addEventListener("click", closePopup);

  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) closePopup(); // click outside
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popupOverlay.classList.contains("active")) closePopup();
  });


  //language dropdown
  (function () {
    const dd = document.querySelector(".lang-dropdown");
    if (!dd) return;

    const trigger = dd.querySelector(".lang-trigger");
    const menu = dd.querySelector(".lang-menu");

    function open() {
      dd.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
    }

    function close() {
      dd.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    }

    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      dd.classList.contains("open") ? close() : open();
    });

    document.addEventListener("click", (e) => {
      if (!dd.contains(e.target)) close();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    // Optional: update the visible current label based on which option matches the current URL
    const current = dd.querySelector(".lang-current");
    const opts = dd.querySelectorAll(".lang-option");
    const path = window.location.pathname;

    opts.forEach(a => {
      const href = a.getAttribute("href");
      if (href && (path === href || (href !== "/" && path.startsWith(href)))) {
        current.textContent = a.dataset.lang ? a.dataset.lang.toUpperCase() : "KA";
      }
    });
  })();


  //menu dropdown
  document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-button");
    const navMenu = document.querySelector(".w-nav-menu");

    if (!menuButton || !navMenu) return;

    menuButton.addEventListener("click", () => {
      navMenu.classList.toggle("is-open");
    });

    // Optional: close menu when clicking a link
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
      });
    });
  });

