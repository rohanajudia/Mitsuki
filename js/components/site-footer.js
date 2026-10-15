/* <site-footer> - footer shown on every page */
class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();

    this.innerHTML =
      '<footer class="footer">' +
        '<div class="container footer-grid">' +
          "<div>" +
            '<img class="footer-logo" src="images/logo.png" alt="Mitsuki - Growing Strong" width="137" height="56" loading="lazy">' +
            "<p>Crop nutrition for fruits, vegetables, field crops and nurseries.</p>" +
          "</div>" +
          "<div>" +
            "<h3>Quick links</h3>" +
            "<ul>" +
              '<li><a href="index.html">Home</a></li>' +
              '<li><a href="about.html">About Us</a></li>' +
              '<li><a href="products.html">Products</a></li>' +
              '<li><a href="dealer-network.html">Dealer Network</a></li>' +
              '<li><a href="become-a-dealer.html">Become a Dealer</a></li>' +
              '<li><a href="contact.html">Contact Us</a></li>' +
            "</ul>" +
          "</div>" +
          "<div>" +
            "<h3>Contact</h3>" +
            "<address>Resident Zone, H/746, GJ SH 27,<br>GIDC Phase-2, Dared,<br>Jamnagar, Gujarat 361004</address>" +
            '<p><a href="https://www.instagram.com/mitsukicrop.in" target="_blank" rel="noopener">Instagram: mitsukicrop.in</a></p>' +
          "</div>" +
        "</div>" +
        '<div class="container footer-bottom">&copy; ' + year + " Mitsuki Crop Energy. All rights reserved.</div>" +
      "</footer>";
  }
}

customElements.define("site-footer", SiteFooter);
