(function () {
  "use strict";

  // ============================================================
  // Contact form access key for Web3Forms.
  // 1. Go to https://web3forms.com and enter kristie@kristiemeave.com
  // 2. Confirm the email, copy the access key
  // 3. Paste it here, replacing REPLACE_WITH_YOUR_ACCESS_KEY
  // ============================================================
  var WEB3FORMS_ACCESS_KEY = "3afe33c2-7f49-404f-86d4-e44c62860487";

  var toggle = document.querySelector(".nav__toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
    });
  }
  var path = (window.location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav a").forEach(function (a) {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });

  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    var submitBtn = form.querySelector("button[type=submit]");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      status.classList.remove("is-visible", "is-error");

      var data = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "New inquiry via kristiemeave.com",
        from_name: "kristiemeave.com",
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        company: form.company.value.trim(),
        topic: form.topic.value,
        message: form.message.value.trim(),
      };

      if (!data.name || !data.email || !data.message) {
        status.textContent = "Please complete the required fields.";
        status.classList.add("is-visible", "is-error");
        return;
      }

      var originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      try {
        var res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(data),
        });
        var json = await res.json().catch(function () { return {}; });
        if (res.ok && json.success) {
          form.reset();
          status.textContent = "Thank you. Your message has been received. Kristie will be in touch shortly.";
          status.classList.add("is-visible");
        } else {
          status.textContent = "Sorry, something went wrong. Please email kristie@kristiemeave.com directly.";
          status.classList.add("is-visible", "is-error");
        }
      } catch (err) {
        status.textContent = "Sorry, something went wrong. Please email kristie@kristiemeave.com directly.";
        status.classList.add("is-visible", "is-error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
