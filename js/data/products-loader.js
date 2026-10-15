/* Loads the product list from data/products.json.
   Used by the products page and the home page carousel.
   Edit products in data/products.json, not in JavaScript. */
const PRODUCTS_URL = "data/products.json";

function loadProducts() {
  return fetch(PRODUCTS_URL)
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(function (data) { return data.products || []; });
}

/* Friendly message when products cannot load */
function productsErrorHtml() {
  const openedAsFile = location.protocol === "file:";
  const help = openedAsFile
    ? "This page was opened as a file. Browsers block loading products.json that way. Open the site with Live Server in VS Code (right-click index.html, then Open with Live Server)."
    : "Please check your connection and refresh the page.";
  return '<p class="load-error" role="alert"><strong>Products could not be loaded.</strong> ' + escapeHtml(help) + "</p>";
}
