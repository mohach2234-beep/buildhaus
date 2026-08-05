/* ==========================================================================
   BuildHaus — site behaviour
   Plain JavaScript, no libraries. Everything here is an enhancement: if this
   file fails to load, the site still renders and the contact form still works.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------------------- */
  var toggle = document.getElementById('navToggle');
  var nav    = document.getElementById('primaryNav');

  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Tapping a link should close the menu, otherwise it covers the target.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    // Escape closes it and returns focus to the button.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    // If the window grows past the mobile breakpoint while the menu is open,
    // clear the state so the desktop nav isn't left in a weird position.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) setOpen(false);
    });
  }

  /* ---------------------------------------------------------------------
     Header gains a shadow once the page is scrolled
     --------------------------------------------------------------------- */
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------------------
     Reveal sections as they scroll into view
     --------------------------------------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var showAll = function () {
    // Drop the transition as well as flipping the class — a suspended fade
    // would otherwise leave the element stuck at opacity 0.
    document.documentElement.classList.add('no-reveal');
    Array.prototype.forEach.call(reveals, function (el) {
      el.classList.add('visible');
    });
  };

  // Content must never be left invisible. Browsers suspend CSS transitions in
  // a hidden/background tab, so an element can get .visible while its opacity
  // stays stuck at 0 — the page then paints blank. Skip the animation entirely
  // unless the tab is actually being looked at.
  if (reduced || !('IntersectionObserver' in window) || document.hidden) {
    showAll();
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once, then stop watching
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    Array.prototype.forEach.call(reveals, function (el) {
      observer.observe(el);
    });

    // Last-resort safety net: whatever the observer hasn't handled a few
    // seconds after load gets shown anyway. A blank section is far worse
    // than a missed fade.
    window.addEventListener('load', function () {
      setTimeout(showAll, 2500);
    });
  }

  /* ---------------------------------------------------------------------
     Contact form
     Submits in the background so the visitor stays on the page. If anything
     goes wrong we say so plainly and offer a mailto fallback — a silently
     swallowed enquiry is a lost customer.
     --------------------------------------------------------------------- */
  var form   = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  var button = document.getElementById('submitBtn');

  if (form && status && button) {
    var say = function (message, kind) {
      status.textContent = message;
      status.className = 'form-status show ' + kind;
    };

    form.addEventListener('submit', function (e) {
      // Let the browser show its own messages for empty/invalid fields.
      form.classList.add('validated');
      if (!form.checkValidity()) {
        form.reportValidity();
        e.preventDefault();
        return;
      }

      // The form still has a real action/method, so if fetch is unavailable we
      // simply let the browser submit normally rather than breaking the form.
      if (!window.fetch) return;

      e.preventDefault();

      // Guard against an unconfigured Formspree endpoint.
      if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
        say('This form isn’t connected yet. See README.md, step 2.', 'err');
        return;
      }

      var original = button.textContent;
      button.disabled = true;
      button.textContent = 'Sending…';
      status.className = 'form-status';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            form.classList.remove('validated');
            say('Thanks — your message is on its way. I’ll reply within one business day.', 'ok');
          } else {
            say('Something went wrong. Please email mohach22345@gmail.com directly.', 'err');
          }
        })
        .catch(function () {
          say('Couldn’t send — check your connection, or email mohach22345@gmail.com.', 'err');
        })
        .then(function () {
          button.disabled = false;
          button.textContent = original;
        });
    });
  }

  /* ---------------------------------------------------------------------
     Footer year
     --------------------------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
