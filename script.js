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

// ── COMPLEX ANIMATIONS LOGIC ──

// 1. Intersection Observer for Scroll Reveals (Infinite Repeat)
const revealElements = document.querySelectorAll(".reveal");

const revealOptions = {
  threshold: 0.15, // Triggers when 15% of the element is visible
  rootMargin: "0px 0px -50px 0px",
};

const revealOnScroll = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Element has entered the screen: trigger animation
      entry.target.classList.add("active");
    } else {
      // Element has left the screen: reset animation so it can play again
      entry.target.classList.remove("active");
    }
  });
}, revealOptions);

revealElements.forEach((el) => {
  revealOnScroll.observe(el);
});

// 2. Dynamic Navbar Shrink & Blur on Scroll
const topBar = document.querySelector(".top-bar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    topBar.classList.add("scrolled");
  } else {
    topBar.classList.remove("scrolled");
  }
});

// 3. 3D Mouse Tracking Tilt Effect on Hero Image
const heroImgBox = document.querySelector(".hero-img-box");
const heroImg = document.querySelector(".hero-image");

if (heroImgBox && heroImg) {
  heroImgBox.addEventListener("mousemove", (e) => {
    // Calculate mouse position relative to the center of the screen
    const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 30;

    // Apply 3D rotation based on mouse coordinates
    heroImg.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  // Remove transition smoothing while moving so it tracks instantly
  heroImgBox.addEventListener("mouseenter", () => {
    heroImg.style.transition = "none";
    heroImg.style.animation = "none"; // Pause floating while interacting
  });

  // Snap back to original position when mouse leaves
  heroImgBox.addEventListener("mouseleave", () => {
    heroImg.style.transition =
      "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    heroImg.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
    heroImg.style.animation = "float 6s ease-in-out infinite"; // Resume floating
  });
}
