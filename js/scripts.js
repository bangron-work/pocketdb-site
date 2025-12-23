document.addEventListener("DOMContentLoaded", () => {
  const app = {
    els: {
      html: document.documentElement,
      themeBtn: document.getElementById("themeToggle"),
      themeIcon: document.querySelector("#themeToggle span"),
      menuBtn: document.getElementById("mobileMenuBtn"),
      mobileNav: document.getElementById("mobileNav"),
      menuIcon: document.querySelector("#mobileMenuBtn span"),
    },

    // Theme Management
    initTheme() {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        this.els.html.setAttribute("data-theme", savedTheme);
        this.updateIcon(savedTheme);
      }

      this.els.themeBtn.addEventListener("click", () => {
        const currentTheme = this.els.html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";

        this.els.html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        this.updateIcon(newTheme);
      });
    },

    updateIcon(theme) {
      this.els.themeIcon.textContent =
        theme === "dark" ? "light_mode" : "dark_mode";
    },

    // Mobile Menu Management
    initMobileMenu() {
      this.els.menuBtn.addEventListener("click", () => this.toggleMenu());

      document.addEventListener("click", (e) => {
        if (
          !this.els.mobileNav.contains(e.target) &&
          !this.els.menuBtn.contains(e.target) &&
          this.els.mobileNav.classList.contains("open")
        ) {
          this.toggleMenu();
        }
      });
    },

    toggleMenu() {
      const isOpen = this.els.mobileNav.classList.contains("open");
      if (isOpen) {
        this.els.mobileNav.classList.remove("open");
        this.els.menuIcon.textContent = "menu";
        document.body.style.overflow = "";
      } else {
        this.els.mobileNav.classList.add("open");
        this.els.menuIcon.textContent = "close";
        document.body.style.overflow = "hidden";
      }
    },

    // Smooth Scroll
    initSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          const target = document.querySelector(anchor.getAttribute("href"));
          if (target) {
            e.preventDefault();
            if (this.els.mobileNav.classList.contains("open")) {
              this.toggleMenu();
            }
            target.scrollIntoView({ behavior: "smooth" });
          }
        });
      });
    },

    init() {
      this.initTheme();
      this.initMobileMenu();
      this.initSmoothScroll();
    },
  };

  window.app = app;
  app.init();
});
