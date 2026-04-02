const menuIcon = document.querySelector(".js-menu");
const menuDiv = document.querySelector(".js-menu-div");
const cancelIcon = document.querySelector(".js-cancel-icon");
const menuLinks = document.querySelectorAll(".js-menu-div ul li a");
menuIcon.addEventListener("click", () => {
  menuDiv.classList.replace("hide-menu", "show-menu");
});

cancelIcon.addEventListener("click", () => {
  menuDiv.classList.replace("show-menu", "hide-menu");
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuDiv.classList.replace("show-menu", "hide-menu");
  });
});

const numEl1 = document.getElementById("js-num-1");
const numEl2 = document.getElementById("js-num-2");
const numEl3 = document.getElementById("js-num-3");
const numEl4 = document.getElementById("js-num-4");

const startCounter = (el, targetValue) => {
  let count = 0;
  const interval = setInterval(() => {
    count += 1;
    el.innerText = count + "+";
    if (count >= targetValue) clearInterval(interval);
  }, 2);
};

// ── ANIMATIONS LOGIC ──

const revealElements = document.querySelectorAll(".reveal");

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const revealOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active");
    }
  });
}, revealOptions);

revealElements.forEach((el) => {
  revealOnScroll.observe(el);
});

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targets = {
          "js-num-1": 500,
          "js-num-2": 20,
          "js-num-3": 15,
          "js-num-4": 100,
        };
        const goal = targets[entry.target.id];

        if (goal) {
          startCounter(entry.target, goal);
          observer.unobserve(entry.target);
        }
      }
    });
  },
  { threshold: 0.5 },
);

[numEl1, numEl2, numEl3, numEl4].forEach((el) => {
  if (el) counterObserver.observe(el);
});

const topBar = document.querySelector(".top-bar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    topBar.classList.add("scrolled");
  } else {
    topBar.classList.remove("scrolled");
  }
});

const formEl = document.getElementById("contactForm");

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const target = e.currentTarget;
  const formData = new FormData(target);

  const formUrl = "https://formspree.io/f/xojpnnaq";

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  try {
    const response = await fetch(formUrl, {
      method: "POST",
      body: JSON.stringify({ name, email, message }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const success = document.getElementById("formSuccess");
      success.classList.add("visible");
      target.reset();
      setTimeout(() => success.classList.remove("visible"), 4000);
    } else {
      const errorData = await response.json();

      const errorEl = document.getElementById("formError");

      errorEl.innerText =
        errorData?.errors?.[0]?.message || "Something went wrong";
      errorEl.classList.add("visible");
      setTimeout(() => errorEl.classList.remove("visible"), 4000);
    }
  } catch (error) {
    const errorEl = document.getElementById("formError");
    errorEl.innerText = "Network error. Please try again later.";
    errorEl.classList.add("visible");
    setTimeout(() => errorEl.classList.remove("visible"), 4000);
  }
});
