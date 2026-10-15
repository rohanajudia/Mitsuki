/* Product card markup, shared by the products page, home carousel and "more products" strip.
   The whole card is one link to the product details page. */
function productCardHtml(product) {
  const crop = CROPS.find(function (c) { return c.slug === product.crop; });
  const cropName = crop ? crop.name : "";

  return (
    '<a class="product-card" href="product.html?slug=' + encodeURIComponent(product.slug) + '">' +
      '<img class="product-card-img" src="' + escapeHtml(product.image) + '" alt="' + escapeHtml(product.name) + '" width="400" height="300" loading="lazy">' +
      '<div class="product-card-body">' +
        '<p class="product-card-tag">' + escapeHtml(cropName) + "</p>" +
        "<h3>" + escapeHtml(product.name) + "</h3>" +
        "<p>" + escapeHtml(product.summary) + "</p>" +
        '<span class="product-card-more">View details &rarr;</span>' +
      "</div>" +
    "</a>"
  );
}
