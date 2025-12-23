// ================= PRELOADER =================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  setTimeout(() => {
    preloader.classList.add("hide");
  }, 900);
});

// ================= CARROSSEL =================
class Carousel {
  constructor() {
    this.slides = document.querySelectorAll('.carousel-slide');
    this.indicators = document.querySelectorAll('.indicator');
    this.prevBtn = document.querySelector('.carousel-control.prev');
    this.nextBtn = document.querySelector('.carousel-control.next');
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000;

    if (this.slides.length) this.init();
  }

  init() {
    this.showSlide(this.currentSlide);

    this.prevBtn?.addEventListener('click', () => this.prevSlide());
    this.nextBtn?.addEventListener('click', () => this.nextSlide());

    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });

    this.startAutoPlay();

    const container = document.querySelector('.carousel-container');
    if (!container) return;

    let startX = 0;

    container.addEventListener('touchstart', e => {
      startX = e.changedTouches[0].screenX;
      this.stopAutoPlay();
    });

    container.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].screenX;
      if (startX - endX > 50) this.nextSlide();
      if (endX - startX > 50) this.prevSlide();
      this.startAutoPlay();
    });
  }

  showSlide(index) {
    this.slides.forEach(s => s.classList.remove('active'));
    this.indicators.forEach(i => i.classList.remove('active'));

    this.slides[index]?.classList.add('active');
    this.indicators[index]?.classList.add('active');
    this.currentSlide = index;
  }

  nextSlide() {
    this.showSlide((this.currentSlide + 1) % this.totalSlides);
  }

  prevSlide() {
    this.showSlide((this.currentSlide - 1 + this.totalSlides) % this.totalSlides);
  }

  goToSlide(index) {
    this.showSlide(index);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// ================= MENU MOBILE =================
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && nav) {

  menuToggle.addEventListener("click", e => {
    e.stopPropagation();

    const open = nav.classList.toggle("active");
    menuToggle.classList.toggle("active", open);
    document.body.style.overflow = open ? "hidden" : "auto";
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuToggle.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  document.addEventListener("click", e => {
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

// ================= SCROLL SUAVE =================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    });
  });
}

// ================= HEADER SCROLL =================
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let last = 0;

  window.addEventListener('scroll', () => {
    const current = window.pageYOffset;

    if (current > last) {
      header.classList.add('scroll-down');
      header.classList.remove('scroll-up');
    } else {
      header.classList.add('scroll-up');
      header.classList.remove('scroll-down');
    }

    last = current;
  });
}

// ================= INIT =================
document.addEventListener('DOMContentLoaded', () => {
  new Carousel();
  initSmoothScroll();
  initHeaderScroll();

  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
});

// ================= ANIMAÇÕES =================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('.collection-card, .about-content')
    .forEach(el => observer.observe(el));
});
