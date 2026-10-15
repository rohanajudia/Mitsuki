/* Dealer network page: state filter + dealer cards (data: data/dealers.js) */
(function () {
  "use strict";

  const listEl = document.getElementById("dealer-list");
  const filterEl = document.getElementById("dealer-filter");
  const emptyEl = document.getElementById("dealer-empty");
  const selectEl = document.getElementById("state-filter");
  if (!listEl) return;

  if (DEALERS.length === 0) {           // nothing to show yet
    filterEl.hidden = true;
    emptyEl.hidden = false;
    return;
  }

  const states = Array.from(new Set(DEALERS.map(function (d) { return d.state; }))).sort();
  selectEl.innerHTML = '<option value="">All states</option>' +
    states.map(function (s) { return '<option value="' + escapeHtml(s) + '">' + escapeHtml(s) + "</option>"; }).join("");

  function render() {
    const state = selectEl.value;
    const items = DEALERS.filter(function (d) { return !state || d.state === state; });
    listEl.innerHTML = items.map(function (d) {
      return (
        '<article class="dealer-card">' +
          "<h3>" + escapeHtml(d.name) + "</h3>" +
          "<p>" + escapeHtml(d.city) + ", " + escapeHtml(d.state) + "</p>" +
          (d.address ? "<p>" + escapeHtml(d.address) + "</p>" : "") +
          (d.phone ? '<p><a href="tel:' + encodeURIComponent(d.phone) + '">' + escapeHtml(d.phone) + "</a></p>" : "") +
        "</article>"
      );
    }).join("");
  }

  selectEl.addEventListener("change", render);
  filterEl.hidden = false;
  render();
})();
