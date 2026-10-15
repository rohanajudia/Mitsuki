/* Product details page: product.html?slug=N.P.K 00:00:50
   Reads the product from data/products.json (see js/data/products-loader.js). */
(function () {
  "use strict";

  const root = document.getElementById("product-root");
  if (!root) return;

  const slug = new URLSearchParams(location.search).get("slug");

  function messageHtml(title, text) {
    return '<div class="detail-message"><h1>' + escapeHtml(title) + "</h1><p>" + escapeHtml(text) + '</p>' +
      '<a class="btn btn-primary" href="products.html">Back to products</a></div>';
  }

  function blockHtml(title, content) {
    return '<div class="detail-block"><h2>' + title + "</h2>" + content + "</div>";
  }

  function render(product, all) {
    const crop = CROPS.find(function (c) { return c.slug === product.crop; });
    const cropName = crop ? crop.name : "";

    document.title = product.name + " - Mitsuki Crop Energy";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", product.summary || product.name);

    let info = "";
    if (product.benefits && product.benefits.length) {
      info += blockHtml("Key benefits", '<ul class="tick-list">' +
        product.benefits.map(function (b) { return "<li>" + escapeHtml(b) + "</li>"; }).join("") + "</ul>");
    }
    if (product.applicationMethod) info += blockHtml("Application method", "<p>" + escapeHtml(product.applicationMethod) + "</p>");
    if (product.dosage) info += blockHtml("Dosage", "<p>" + escapeHtml(product.dosage) + "</p>");

    const related = all.filter(function (p) { return p.crop === product.crop && p.slug !== product.slug; }).slice(0, 4);

    root.innerHTML =
      '<nav class="breadcrumb" aria-label="Breadcrumb">' +
        '<a href="index.html">Home</a><span aria-hidden="true">&rsaquo;</span>' +
        '<a href="products.html">Products</a><span aria-hidden="true">&rsaquo;</span>' +
        '<a href="products.html?crop=' + encodeURIComponent(product.crop) + '">' + escapeHtml(cropName) + "</a>" +
        '<span aria-hidden="true">&rsaquo;</span><span aria-current="page">' + escapeHtml(product.name) + "</span>" +
      "</nav>" +
      '<div class="product-detail-grid">' +
        '<div class="product-detail-image">' +
          '<img src="' + escapeHtml(product.image) + '" alt="' + escapeHtml(product.name) + '" width="640" height="480">' +
        "</div>" +
        '<div class="product-detail-info">' +
          '<p class="detail-crop">' + escapeHtml(cropName) + "</p>" +
          "<h1>" + escapeHtml(product.name) + "</h1>" +
          '<p class="detail-description">' + escapeHtml(product.description || product.summary || "") + "</p>" +
          info +
          '<div class="detail-actions">' +
            '<a class="btn btn-cta" href="contact.html?product=' + encodeURIComponent(product.name) + '">Enquire now</a>' +
            '<a class="btn btn-outline btn-dealer" href="become-a-dealer.html">Become a dealer</a>' +
          "</div>" +
        "</div>" +
      "</div>" +
      (related.length
        ? '<div class="related"><div class="section-head"><h2>More in ' + escapeHtml(cropName) + '</h2></div>' +
          '<div class="carousel-track">' + related.map(productCardHtml).join("") + "</div></div>"
        : "");
  }

  if (!slug) {
    root.innerHTML = messageHtml("Product not found", "No product was selected.");
    return;
  }

  loadProducts()
    .then(function (all) {
      const product = all.find(function (p) { return p.slug === slug; });
      if (!product) {
        document.title = "Product not found - Mitsuki Crop Energy";
        root.innerHTML = messageHtml("Product not found", "We could not find that product. It may have been removed.");
        return;
      }
      render(product, all);
    })
    .catch(function () { root.innerHTML = productsErrorHtml(); });
})();
