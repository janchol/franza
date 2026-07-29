/* ============================================
   FRANZA GROUP — Główny skrypt
   ============================================ */

// --- Określ ścieżkę bazową (działa zarówno na index.html jak i pages/*) ---
const isSubpage = window.location.pathname.includes('/pages/');
const basePath = isSubpage ? '../' : '';

// --- Aktywna strona dla podświetlenia w nawigacji ---
function getCurrentPage() {
  const path = window.location.pathname;
  if (path.endsWith('/') || path.endsWith('index.html') || path === '') return 'home';
  const match = path.match(/\/pages\/([^.]+)\.html/);
  return match ? match[1] : '';
}

// --- Szablon nagłówka ---
function renderHeader() {
  const currentPage = getCurrentPage();
  const navItems = [
    { id: 'home', label: 'Strona główna', href: `${basePath}index.html` },
    { id: 'o-nas', label: 'O nas', href: `${basePath}pages/o-nas.html` },
    { id: 'produkcja', label: 'Produkcja', href: `${basePath}pages/produkcja.html` },
    { id: 'dystrybucja', label: 'Dystrybucja', href: `${basePath}pages/dystrybucja.html` },
    { id: 'produkty', label: 'Produkty', href: `${basePath}pages/produkty.html` },
    { id: 'marki', label: 'Marki', href: `${basePath}pages/marki.html` },
    { id: 'branze', label: 'Branże', href: `${basePath}pages/branze.html` },
    { id: 'kontakt', label: 'Kontakt', href: `${basePath}pages/kontakt.html` },
  ];

  const navLinksHTML = navItems
    .map(
      (item) =>
        `<a href="${item.href}" class="nav-link ${item.id === currentPage ? 'active' : ''}">${item.label}</a>`
    )
    .join('');

  return `
    <header class="site-header" id="siteHeader">
      <div class="container header-inner">
        <a href="${basePath}index.html" class="logo" aria-label="FRANZA GROUP — strona główna">
          <img class="logo-mark logo-mark-img" src="${basePath}assets/logo/franza-logo.png" alt="FRANZA GROUP" width="48" height="48">
          <div class="logo-text">
            <span class="logo-name">FRANZA GROUP</span>
            <span class="logo-tagline">od 2006 r.</span>
          </div>
        </a>

        <nav class="main-nav" aria-label="Nawigacja główna">
          ${navLinksHTML}
        </nav>

        <a href="${basePath}pages/kontakt.html" class="btn btn-primary nav-cta">
          Zapytaj o ofertę
          <span class="arrow">→</span>
        </a>

        <button class="menu-toggle" id="menuToggle" aria-label="Otwórz menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>

    <!-- Menu poza <header>: backdrop-filter nagłówka zmienia punkt odniesienia
         position:fixed i menu otwierałoby się jako pasek wysokości nagłówka -->
    <div class="mobile-menu" id="mobileMenu">
      <nav aria-label="Nawigacja mobilna">
        ${navLinksHTML}
      </nav>
      <a href="${basePath}pages/kontakt.html" class="btn btn-primary">
        Zapytaj o ofertę
        <span class="arrow">→</span>
      </a>
    </div>
  `;
}

// --- Szablon stopki ---
function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="${basePath}index.html" class="logo">
              <img class="logo-mark logo-mark-img" src="${basePath}assets/logo/franza-logo.png" alt="FRANZA GROUP" width="48" height="48">
              <div class="logo-text">
                <span class="logo-name">FRANZA GROUP</span>
                <span class="logo-tagline">od 2006 r.</span>
              </div>
            </a>
            <p>Produkcja chemii technicznej marki FRANZA oraz dystrybucja produktów renomowanych marek dla przemysłu, motoryzacji i usług.</p>
            <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 1rem; line-height: 1.7;">
              <strong style="color: var(--text-secondary);">Franza Group Artur Mirek</strong><br>
              NIP: 787-148-37-55<br>
              REGON: 300056586<br>
              BDO: 000613950
            </p>
            <div class="footer-social">
              <a href="#" class="social-link" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z"/></svg>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          <div class="footer-col">
            <h5>Nawigacja</h5>
            <ul>
              <li><a href="${basePath}index.html">Strona główna</a></li>
              <li><a href="${basePath}pages/o-nas.html">O nas</a></li>
              <li><a href="${basePath}pages/produkcja.html">Produkcja</a></li>
              <li><a href="${basePath}pages/dystrybucja.html">Dystrybucja</a></li>
              <li><a href="${basePath}pages/branze.html">Branże</a></li>
              <li><a href="${basePath}pages/kontakt.html">Kontakt</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h5>Produkcja</h5>
            <ul>
              <li><a href="${basePath}pages/produkcja.html">FRANZA Chemical Solution</a></li>
              <li><a href="${basePath}pages/produkty.html">Nasza oferta</a></li>
              <li><a href="${basePath}pages/o-nas.html">Jakość i certyfikaty</a></li>
              <li><a href="${basePath}pages/produkcja.html">Badania i rozwój</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h5>Dystrybucja</h5>
            <ul>
              <li><a href="${basePath}pages/marki.html#mannol">Mannol</a></li>
              <li><a href="${basePath}pages/marki.html#xton">Xton</a></li>
              <li><a href="${basePath}pages/marki.html#orapi">Orapi</a></li>
              <li><a href="${basePath}pages/marki.html#transnet">Transnet</a></li>
              <li><a href="${basePath}pages/marki.html#wurth">Würth</a></li>
              <li><a href="${basePath}pages/marki.html#nch">NCH Europe</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h5>Kontakt</h5>
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <a href="tel:+48606275785">606 275 785</a>
            </div>
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href="mailto:biuro@franza-group.com">biuro@franza-group.com</a>
            </div>
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>64-530 Kopanina<br>ul. Radzyńska 3</span>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© ${year} FRANZA GROUP. Wszelkie prawa zastrzeżone.</span>
          <div class="footer-bottom-links">
            <a href="${basePath}pages/polityka-prywatnosci.html">Polityka prywatności</a>
            <a href="${basePath}pages/polityka-prywatnosci.html#cookies">Polityka cookies</a>
            <a href="#" data-cookie-settings>Ustawienia cookies</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// --- Montowanie ---
document.addEventListener('DOMContentLoaded', () => {
  const headerSlot = document.getElementById('header-slot');
  const footerSlot = document.getElementById('footer-slot');

  if (headerSlot) headerSlot.innerHTML = renderHeader();
  if (footerSlot) footerSlot.innerHTML = renderFooter();

  // Wstrzykuj scroll progress bar i back-to-top
  if (!document.querySelector('.scroll-progress')) {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progress);
  }

  if (!document.querySelector('.back-to-top')) {
    const backBtn = document.createElement('button');
    backBtn.className = 'back-to-top';
    backBtn.setAttribute('aria-label', 'Wróć na górę');
    backBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(backBtn);
  }

  // WhatsApp floating button - kontakt z Arturem +48 606 275 785
  if (!document.querySelector('.whatsapp-fab')) {
    const waLink = document.createElement('a');
    waLink.className = 'whatsapp-fab';
    waLink.href = 'https://wa.me/48606275785?text=' + encodeURIComponent('Dzień dobry, mam pytanie dotyczące oferty FRANZA GROUP.');
    waLink.target = '_blank';
    waLink.rel = 'noopener noreferrer';
    waLink.setAttribute('aria-label', 'Napisz na WhatsApp — Artur Mirek, Dział Handlowy');
    waLink.title = 'WhatsApp: +48 606 275 785';
    waLink.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/></svg>';
    document.body.appendChild(waLink);
  }

  // Automatyczne nadawanie klasy fade-in elementom które jej nie mają
  // (karty produktowe, sekcje, itp. - nie trzeba ręcznie dodawać w HTML)
  const autoFadeSelectors = [
    '.card:not(.fade-in)',
    '.industry-card:not(.fade-in)',
    '.value-card:not(.fade-in)',
    '.brand-card:not(.fade-in)',
    '.spill-gallery-item:not(.fade-in)',
    '.spec-feature:not(.fade-in)',
  ];
  document.querySelectorAll(autoFadeSelectors.join(', ')).forEach((el) => {
    el.classList.add('fade-in');
  });

  // Toggle menu mobilnego
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    const closeMenu = () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    const openMenu = () => {
      menu.classList.add('open');
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (menu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Zamknij po kliknięciu linku
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Zamknij po wciśnięciu ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
      }
    });

    // Auto-zamykanie gdy zmieni się szerokość okna (np. obrót telefonu w pejzaż / desktop)
    let lastWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      const currentWidth = window.innerWidth;
      // Zamknij gdy przeszliśmy na desktop (≥1100px) z menu otwartym
      if (lastWidth < 1100 && currentWidth >= 1100 && menu.classList.contains('open')) {
        closeMenu();
      }
      lastWidth = currentWidth;
    }, { passive: true });

    // iOS Safari przywraca stronę z bfcache w stanie sprzed nawigacji — z otwartym
    // menu i zablokowanym scrollem strona wygląda na zawieszoną. Resetuj zawsze.
    window.addEventListener('pageshow', closeMenu);
    window.addEventListener('pagehide', closeMenu);
  }

  // Efekt nagłówka + scroll progress + back-to-top — wszystko w jednym scroll handlerze
  const header = document.getElementById('siteHeader');
  const progressBar = document.querySelector('.scroll-progress');
  const backBtn = document.querySelector('.back-to-top');

  const onScroll = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (header) {
      header.classList.toggle('scrolled', scrollY > 20);
    }

    if (progressBar) {
      progressBar.style.width = scrollPct + '%';
    }

    if (backBtn) {
      backBtn.classList.toggle('visible', scrollY > 400);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Animacja licznika dla statystyk (.stat-number) - liczy od 0 do wartości docelowej
  const animateCounter = (el) => {
    const text = el.textContent.trim();
    // Wyciągnij liczbę (obsługa "20+", "1000+", "7", "500+")
    const match = text.match(/(\d+)(.*)/);
    if (!match) return;

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 1500; // ms
    const startTime = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(target * easeOutCubic(progress));
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target + suffix;
      }
    };

    requestAnimationFrame(tick);
  };

  // Uruchom counter tylko gdy widoczny (IntersectionObserver)
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.stat-number').forEach((el) => {
    counterObserver.observe(el);
  });

  // Animacja fade-in przy scrollu
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

  // --- Slidery (hero + sekcje marek) ---
  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const track = slider.querySelector('.fr-slider-track');
    const slides = Array.from(slider.querySelectorAll('.fr-slide'));
    if (!track || slides.length <= 1) return;

    const dotsWrap = slider.querySelector('.fr-slider-dots');
    let index = 0;
    let timer = null;
    const interval = parseInt(slider.dataset.interval || '4500', 10);

    const dots = slides.map((_, i) => {
      const d = document.createElement('button');
      d.className = 'fr-slider-dot' + (i === 0 ? ' active' : '');
      d.type = 'button';
      d.setAttribute('aria-label', 'Przejdź do slajdu ' + (i + 1));
      d.addEventListener('click', () => go(i, true));
      if (dotsWrap) dotsWrap.appendChild(d);
      return d;
    });

    const go = (i, user) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle('active', di === index));
      if (user) restart();
    };

    const prevBtn = slider.querySelector('.fr-slider-btn.prev');
    const nextBtn = slider.querySelector('.fr-slider-btn.next');
    if (prevBtn) prevBtn.addEventListener('click', () => go(index - 1, true));
    if (nextBtn) nextBtn.addEventListener('click', () => go(index + 1, true));

    const start = () => { timer = setInterval(() => go(index + 1), interval); };
    const stop = () => { if (timer) clearInterval(timer); };
    const restart = () => { stop(); start(); };

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    start();
  });

  // Fallback dla brakujących grafik — pokazujemy ozdobny placeholder z logo FR
  document.querySelectorAll('img').forEach((img) => {
    const handleError = () => {
      img.style.display = 'none';
      const parent = img.parentElement;
      if (parent && !parent.classList.contains('image-placeholder')) {
        parent.classList.add('image-placeholder');
      }
    };
    if (img.complete && img.naturalWidth === 0) {
      handleError();
    } else {
      img.addEventListener('error', handleError, { once: true });
    }
  });

  // Obsługa formularza kontaktowego
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    // Pre-fill nazwą produktu jeśli przyszliśmy z modalu (?produkt=NAZWA)
    const params = new URLSearchParams(window.location.search);
    const productParam = params.get('produkt');
    if (productParam) {
      const subjectSelect = contactForm.querySelector('#subject');
      const messageField = contactForm.querySelector('#message');
      if (subjectSelect) subjectSelect.value = 'produkt';
      if (messageField && !messageField.value) {
        messageField.value = `Dzień dobry,\n\nChciałbym uzyskać więcej informacji o produkcie: ${productParam}.\n\nProszę o kontakt.`;
        // Focus żeby user widział że pole jest pre-filled
        setTimeout(() => messageField.focus(), 100);
      }
    }

    const submitBtn = contactForm.querySelector('.form-submit');
    const submitBtnHTML = submitBtn ? submitBtn.innerHTML : '';

    const setFormMessage = (messageEl, type, text) => {
      if (!messageEl) return;
      messageEl.className = 'form-message' + (type ? ' ' + type : '');
      messageEl.textContent = text;
    };

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const messageEl = document.getElementById('formMessage');
      const data = new FormData(contactForm);

      // Walidacja podstawowa
      if (!data.get('name') || !data.get('email') || !data.get('message')) {
        setFormMessage(messageEl, 'error', 'Wypełnij wszystkie wymagane pola (imię, e-mail, wiadomość).');
        return;
      }

      // Zgoda RODO wymagana
      const consent = contactForm.querySelector('#consent');
      if (consent && !consent.checked) {
        setFormMessage(messageEl, 'error', 'Zaznacz zgodę na przetwarzanie danych, aby wysłać wiadomość.');
        return;
      }

      // Dopóki nie wklejono klucza Web3Forms — nie wysyłamy, tylko informujemy
      const accessKey = data.get('access_key');
      if (!accessKey || String(accessKey).includes('TWOJ_KLUCZ')) {
        setFormMessage(
          messageEl,
          'error',
          'Formularz nie został jeszcze skonfigurowany. Napisz na biuro@franza-group.com lub zadzwoń: 606 275 785.'
        );
        return;
      }

      // Stan wysyłania
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Wysyłanie…';
      }
      setFormMessage(messageEl, '', '');

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        });
        const result = await response.json();

        if (response.ok && result.success) {
          setFormMessage(messageEl, 'success', 'Dziękujemy! Wiadomość została wysłana. Odpowiemy najczęściej tego samego dnia.');
          contactForm.reset();
        } else {
          setFormMessage(messageEl, 'error', (result && result.message) ? result.message : 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na biuro@franza-group.com.');
        }
      } catch (err) {
        setFormMessage(messageEl, 'error', 'Błąd połączenia. Sprawdź internet i spróbuj ponownie, albo napisz na biuro@franza-group.com.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitBtnHTML;
        }
      }
    });
  }
});
