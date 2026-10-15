/* <crop-cards> - four image cards for the home page (data: data/crops.js) */
class CropCards extends HTMLElement {
  connectedCallback() {
    const cards = CROPS.map(function (crop) {
      return (
        '<a class="crop-card" href="products.html?crop=' + encodeURIComponent(crop.slug) + '">' +
          '<img src="' + escapeHtml(crop.image) + '" alt="" width="400" height="300" loading="lazy">' +
          '<div class="crop-card-body">' +
            "<h3>" + escapeHtml(crop.name) + "</h3>" +
            "<p>" + escapeHtml(crop.blurb) + "</p>" +
          "</div>" +
        "</a>"
      );
    }).join("");

    this.innerHTML = '<div class="crop-cards">' + cards + "</div>";
  }
}

customElements.define("crop-cards", CropCards);
