/* <site-header> - sticky header with logo, menu and mobile hamburger.
   Edit NAV_LINKS to change the menu on every page at once. */
const NAV_LINKS = [
  { label: "Home",           href: "index.html" },
  { label: "About Us",       href: "about.html" },
  { label: "Products",       href: "products.html" },
  { label: "Dealer Network", href: "dealer-network.html" },
  { label: "Contact Us",     href: "contact.html" }
];

class SiteHeader extends HTMLElement {
  connectedCallback() {
    let page = location.pathname.split("/").pop() || "index.html";
    if (page === "product.html") page = "products.html"; // details page belongs to Products

    const links = NAV_LINKS.map(function (item) {
      const active = item.href === page ? " is-active" : "";
      const current = item.href === page ? ' aria-current="page"' : "";
      return '<li><a class="nav-link' + active + '" href="' + item.href + '"' + current + ">" + item.label + "</a></li>";
    }).join("");

    this.innerHTML =
      '<div class="container header-inner">' +
        '<a class="header-logo" href="index.html" aria-label="Mitsuki Crop Energy - Home">' +
          '<img src="images/logo.png" alt="Mitsuki - Growing Strong" width="128" height="52">' +
        "</a>" +
        '<button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="main-nav">' +
          "<span></span><span></span><span></span>" +
        "</button>" +
        '<nav class="nav" id="main-nav" aria-label="Main">' +
          '<ul class="nav-list">' + links +
            '<li><a class="btn btn-cta nav-cta" href="become-a-dealer.html">Become a Dealer</a></li>' +
          "</ul>" +
        "</nav>" +
      "</div>";

    const toggle = this.querySelector(".nav-toggle");
    const nav = this.querySelector(".nav");

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    toggle.addEventListener("click", function () { setOpen(!nav.classList.contains("is-open")); });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 900) setOpen(false); });
  }
}

customElements.define("site-header", SiteHeader);
