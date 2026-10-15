/* <crop-strip> - small thumbnails strip in the hero (data: data/crops.js) */
class CropStrip extends HTMLElement {
  connectedCallback() {
    const items = CROPS.map(function (crop) {
      return (
        '<a class="crop-item" href="products.html?crop=' + encodeURIComponent(crop.slug) + '">' +
          '<img src="' + escapeHtml(crop.image) + '" alt="" width="75" height="75" loading="lazy">' +
          '<span class="crop-text"><small>Crops</small><strong>' + escapeHtml(crop.name) + "</strong></span>" +
        "</a>"
      );
    }).join("");

    this.innerHTML = '<nav class="crop-strip" aria-label="Crop categories">' + items + "</nav>";
  }
}

customElements.define("crop-strip", CropStrip);
