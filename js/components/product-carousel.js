/* <product-carousel> - featured products, swipe on mobile, arrow buttons on desktop.
   Usage: <product-carousel heading="Featured products" intro="..."></product-carousel> */
class ProductCarousel extends HTMLElement {
  connectedCallback() {
    const heading = this.getAttribute("heading") || "Featured products";
    const intro = this.getAttribute("intro") || "";
    const self = this;

    this.innerHTML =
      '<div class="carousel-head">' +
        '<div class="section-head"><h2>' + escapeHtml(heading) + "</h2>" + (intro ? "<p>" + escapeHtml(intro) + "</p>" : "") + "</div>" +
        '<div class="carousel-controls">' +
          '<button class="carousel-btn" type="button" data-dir="-1" aria-label="Previous products" disabled>&#8249;</button>' +
          '<button class="carousel-btn" type="button" data-dir="1" aria-label="Next products" disabled>&#8250;</button>' +
        "</div>" +
      "</div>" +
      '<div class="carousel-track" role="region" aria-label="' + escapeHtml(heading) + '" tabindex="0"></div>';

    const track = this.querySelector(".carousel-track");
    const prev = this.querySelector('[data-dir="-1"]');
    const next = this.querySelector('[data-dir="1"]');

    function updateButtons() {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    }

    function scrollByPage(direction) {
      track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: "smooth" });
    }

    prev.addEventListener("click", function () { scrollByPage(-1); });
    next.addEventListener("click", function () { scrollByPage(1); });
    track.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);

    loadProducts()
      .then(function (list) {
        track.innerHTML = list.filter(function (p) { return p.featured; }).map(productCardHtml).join("");
        updateButtons();
      })
      .catch(function () {
        self.querySelector(".carousel-controls").hidden = true;
        track.outerHTML = productsErrorHtml();
      });
  }
}

customElements.define("product-carousel", ProductCarousel);
