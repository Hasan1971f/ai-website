
/* ============================================================
   SCRIPT.JS — Hasan Digital Solutions
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // 1. NAVBAR — Scroll effect and active links
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  function handleNavbarScroll() {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }

    let currentSection = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');

      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();


  // 2. MOBILE MENU
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('nav-links');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');

      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }


  // 3. SCROLL ANIMATIONS
  if ('IntersectionObserver' in window) {
    const scrollObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    document.querySelectorAll('.fade-in').forEach(function (element) {
      scrollObserver.observe(element);
    });
  } else {
    document.querySelectorAll('.fade-in').forEach(function (element) {
      element.classList.add('visible');
    });
  }


  // 4. SCROLL-TO-TOP BUTTON
  const scrollTopBtn = document.getElementById('scroll-top');

  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      scrollTopBtn.classList.toggle('show', window.scrollY > 500);
    });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // 5. CONTACT FORM — Validation and real submission
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const serviceInput = document.getElementById('service');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const serviceError = document.getElementById('service-error');
    const messageError = document.getElementById('message-error');

    function validateField(field, errorElement, testFunction) {
      if (!field || !errorElement) return false;

      const isValid = testFunction(field.value.trim());

      field.classList.toggle('invalid', !isValid);
      errorElement.style.display = isValid ? 'none' : 'block';

      return isValid;
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
      if (phone === '') return true;
      return /^\+?[\d\s\-()]{7,}$/.test(phone);
    }

    if (nameInput && nameError) {
      nameInput.addEventListener('input', function () {
        validateField(nameInput, nameError, function (value) {
          return value.length >= 2;
        });
      });
    }

    if (emailInput && emailError) {
      emailInput.addEventListener('input', function () {
        validateField(emailInput, emailError, isValidEmail);
      });
    }

    if (phoneInput && phoneError) {
      phoneInput.addEventListener('input', function () {
        validateField(phoneInput, phoneError, isValidPhone);
      });
    }

    if (serviceInput && serviceError) {
      serviceInput.addEventListener('change', function () {
        validateField(serviceInput, serviceError, function (value) {
          return value !== '';
        });
      });
    }

    if (messageInput && messageError) {
      messageInput.addEventListener('input', function () {
        validateField(messageInput, messageError, function (value) {
          return value.length >= 10;
        });
      });
    }

    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const isNameValid = nameInput && nameError &&
        validateField(nameInput, nameError, function (value) {
          return value.length >= 2;
        });

      const isEmailValid = emailInput && emailError &&
        validateField(emailInput, emailError, isValidEmail);

      const isPhoneValid = phoneInput && phoneError &&
        validateField(phoneInput, phoneError, isValidPhone);

      const isServiceValid = serviceInput && serviceError &&
        validateField(serviceInput, serviceError, function (value) {
          return value !== '';
        });

      const isMessageValid = messageInput && messageError &&
        validateField(messageInput, messageError, function (value) {
          return value.length >= 10;
        });

      if (
        isNameValid &&
        isEmailValid &&
        isPhoneValid &&
        isServiceValid &&
        isMessageValid
      ) {
        // Send the form to the configured FormSubmit address.
        HTMLFormElement.prototype.submit.call(contactForm);
      }
    });
  }


  // 6. ANIMATED NUMBER COUNTERS
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const suffix = element.getAttribute('data-suffix') || '';

    if (isNaN(target)) return;

    const duration = 1800;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    let current = 0;

    const timer = setInterval(function () {
      current += step;

      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      element.textContent = current + suffix;
    }, 16);
  }

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('[data-target]').forEach(function (element) {
      counterObserver.observe(element);
    });
  }


  // 7. SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href');

      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        event.preventDefault();

        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetY =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          navHeight;

        window.scrollTo({
          top: targetY,
          behavior: 'smooth'
        });
      }
    });
  });


  // 8. MINI BAR CHART ANIMATION
  const miniBars = document.querySelectorAll('.mini-bar');
  const barHeights = [35, 60, 80, 45, 90, 70, 55, 85, 65, 100];

  miniBars.forEach(function (bar, index) {
    bar.style.height = barHeights[index % barHeights.length] + '%';
    bar.style.animationDelay = (index * 0.08) + 's';
  });

});
