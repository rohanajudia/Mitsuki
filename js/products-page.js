/* Products page: category tabs + product grid.
   Products come from data/products.json (see js/data/products-loader.js).
   The selected crop is read from the address (products.html?crop=fruits). */
(function () {
  "use strict";

  const tabsEl = document.getElementById("product-tabs");
  const gridEl = document.getElementById("product-grid");
  const noteEl = document.getElementById("product-note");
  if (!tabsEl || !gridEl) return;

  const requested = new URLSearchParams(location.search).get("crop");
  let current = CROPS.some(function (c) { return c.slug === requested; }) ? requested : CROPS[0].slug;
  let products = [];

  function renderTabs() {
    tabsEl.innerHTML = CROPS.map(function (crop) {
      return '<button class="tab" type="button" data-crop="' + escapeHtml(crop.slug) + '" aria-pressed="' + (crop.slug === current) + '">' +
        escapeHtml(crop.name) + "</button>";
    }).join("");
  }

  function renderProducts() {
    const items = products.filter(function (p) { return p.crop === current; });
    const crop = CROPS.find(function (c) { return c.slug === current; });
    noteEl.textContent = items.length + " products for " + crop.name.toLowerCase();
    gridEl.innerHTML = items.map(productCardHtml).join("");
  }

  tabsEl.addEventListener("click", function (e) {
    const button = e.target.closest(".tab");
    if (!button) return;
    current = button.getAttribute("data-crop");
    history.replaceState(null, "", "?crop=" + encodeURIComponent(current));
    renderTabs();
    renderProducts();
  });

  renderTabs();
  noteEl.textContent = "Loading products...";

  loadProducts()
    .then(function (list) { products = list; renderProducts(); })
    .catch(function () { noteEl.textContent = ""; gridEl.innerHTML = productsErrorHtml(); });
})();
