/* Form handling for every <form data-form> on the site (dealer + contact).
   - Inline error messages next to each field
   - Phone / PIN fields accept digits only
   - Sends data to SITE_CONFIG.formEndpoint (see config.js) */
(function () {
  "use strict";

  function setError(input, message) {
    const wrap = input.closest(".field");
    if (!wrap) return;
    let el = wrap.querySelector(".field-error");
    if (!el) {
      el = document.createElement("p");
      el.className = "field-error";
      el.id = input.id + "-error";
      wrap.appendChild(el);
    }
    el.textContent = message || "";
    wrap.classList.toggle("has-error", Boolean(message));
    if (message) {
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", el.id);
    } else {
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
    }
  }

  function errorMessage(input) {
    const v = input.validity;
    if (v.valueMissing) return input.getAttribute("data-msg-required") || "This field is required.";
    if (v.typeMismatch || v.patternMismatch || v.tooShort) return input.getAttribute("data-msg-invalid") || "Please check this value.";
    return "";
  }

  function check(input) {
    const message = errorMessage(input);
    setError(input, message);
    return !message;
  }

  function showStatus(form, type, text) {
    const el = form.querySelector(".form-status");
    if (!el) return;
    el.className = "form-status is-visible is-" + type;
    el.textContent = text;
  }

  function send(form) {
    const button = form.querySelector('button[type="submit"]');
    const endpoint = SITE_CONFIG.formEndpoint;

    if (!endpoint) {
      showStatus(form, "info", "Thank you. Your details are valid, but sending is not switched on yet. Please contact us on Instagram: mitsukicrop.in.");
      return;
    }

    const data = {};
    new FormData(form).forEach(function (value, key) { data[key] = value; });
    data.form = form.getAttribute("data-form");

    button.disabled = true;
    showStatus(form, "info", "Sending...");

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Request failed");
        form.reset();
        showStatus(form, "success", "Thank you. We have received your message and will contact you soon.");
      })
      .catch(function () {
        showStatus(form, "error", "We could not send your message. Please try again in a moment.");
      })
      .then(function () { button.disabled = false; });
  }

  function setUp(form) {
    form.setAttribute("novalidate", "");

    // State dropdown
    const stateSelect = form.querySelector("select[data-states]");
    if (stateSelect && typeof INDIAN_STATES !== "undefined") {
      stateSelect.innerHTML = '<option value="">Select state</option>' +
        INDIAN_STATES.map(function (s) { return '<option value="' + s + '">' + s + "</option>"; }).join("");
    }

    // Digits-only fields (phone, PIN code)
    form.querySelectorAll("[data-digits]").forEach(function (input) {
      input.addEventListener("input", function () { input.value = input.value.replace(/\D/g, ""); });
    });

    // Pre-fill the contact message when arriving from a product's Enquire button
    const messageField = form.elements.message;
    const product = new URLSearchParams(location.search).get("product");
    if (messageField && product && !messageField.value) {
      messageField.value = "I would like to enquire about " + product + ".";
    }

    const fields = Array.from(form.querySelectorAll("input, select, textarea"));
    fields.forEach(function (input) {
      input.addEventListener("blur", function () { check(input); });
      input.addEventListener("input", function () {
        if (input.closest(".field").classList.contains("has-error")) check(input);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const invalid = fields.filter(function (input) { return !check(input); });
      if (invalid.length) {
        invalid[0].focus();
        showStatus(form, "error", "Please fix the highlighted fields.");
        return;
      }
      send(form);
    });
  }

  document.querySelectorAll("form[data-form]").forEach(setUp);
})();
