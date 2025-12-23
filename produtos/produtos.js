
let swipers = {};

// ===============================
// ELEMENTOS PRINCIPAIS
// ===============================
const overlay = document.getElementById("startOverlay");
const startButtons = document.querySelectorAll(".start-btn");
const carousels = document.querySelectorAll(".swiper");

// MENU MOBILE
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-link");

// ===============================
// OVERLAY INICIAL
// ===============================
function resetToOverlay() {
  overlay.classList.remove("hide");

  carousels.forEach(c => {
    c.classList.remove("active");
    c.classList.add("blur");
  });
}

// estado inicial
resetToOverlay();

// ===============================
// MENU MOBILE
// ===============================
if (menuToggle && nav) {

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();

    const isOpen = nav.classList.toggle("active");
    menuToggle.classList.toggle("active", isOpen);

    document.body.style.overflow = isOpen ? "hidden" : "auto";
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuToggle.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  document.addEventListener("click", (e) => {
    if (
      nav.classList.contains("active") &&
      !nav.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      nav.classList.remove("active");
      menuToggle.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      nav.classList.remove("active");
      menuToggle.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}


// ===============================
// ENTRAR EM UMA COLEÇÃO
// ===============================
startButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const collection = btn.dataset.collection;

    overlay.classList.add("hide");

    carousels.forEach(c => {
      c.classList.remove("active");
      c.classList.add("blur");
    });

    const activeCarousel = document.querySelector(
      `.swiper[data-collection="${collection}"]`
    );

    if (!activeCarousel) return;

    activeCarousel.classList.add("active");
    activeCarousel.classList.remove("blur");

    if (!swipers[collection]) {
      swipers[collection] = new Swiper(activeCarousel, {
        slidesPerView: 1,
        loop: true,

        observer: true,
        observeParents: true,

        pagination: {
          el: activeCarousel.querySelector(".swiper-pagination"),
          clickable: true,
        },
        navigation: {
          nextEl: activeCarousel.querySelector(".swiper-button-next"),
          prevEl: activeCarousel.querySelector(".swiper-button-prev"),
        },
      });
    }

    // AJUSTE CRÍTICO
    swipers[collection].update();
    swipers[collection].slideTo(0, 0);
  });
});

// ===============================
// SAIR DA COLEÇÃO
// ===============================
document.body.addEventListener("click", (e) => {
  const exitBtn = e.target.closest(".exit-btn");
  if (!exitBtn) return;

  e.preventDefault();
  resetToOverlay();
});
