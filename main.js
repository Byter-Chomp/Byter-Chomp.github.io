const CONTACT_EMAIL = "contactkarsen@gmail.com";

const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

function buildMailto({ firstName, lastName, email, phone, message }) {
  const name = [firstName, lastName].filter(Boolean).join(" ").trim() || "Website visitor";
  const subject = `Project inquiry from ${name}`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    "",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const payload = {
      firstName: String(data.get("firstName") || "").trim(),
      lastName: String(data.get("lastName") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    if (!payload.firstName || !payload.email || !payload.message) {
      statusEl.textContent = "Please fill in first name, email, and project notes.";
      return;
    }

    statusEl.textContent = "Opening your email app…";
    window.location.href = buildMailto(payload);
  });
}

const revealTargets = document.querySelectorAll(
  ".panel h2, .panel__lede, .offer-list li, .contact-form, .panel__visual"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  revealTargets.forEach((el, index) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
    observer.observe(el);
  });
} else {
  revealTargets.forEach((el) => el.classList.add("is-in"));
}
