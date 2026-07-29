/* ============================================
   FRANZA GROUP — Zgody na cookies (RODO)
   ============================================

   Zarządza baner + panel ustawień, zapamiętuje wybór użytkownika
   i odblokowuje skrypty/osadzenia dopiero po udzieleniu zgody.

   --- Jak podpiąć Google Analytics 4 ---
   Wpisz identyfikator pomiaru w GA_MEASUREMENT_ID poniżej (np. 'G-XXXXXXXXXX').
   Skrypt GA załaduje się WYŁĄCZNIE po zgodzie na cookies analityczne.

   --- Jak osadzić mapę / YouTube zgodnie z RODO ---
   Zamiast <iframe src="..."> użyj:
     <iframe data-consent="external" data-consent-src="https://..." title="..."></iframe>
   Ramka załaduje się dopiero po zgodzie na cookies zewnętrzne, a do tego
   czasu w jej miejscu pokaże się informacja z przyciskiem do ustawień.
   ============================================ */

(function () {
  'use strict';

  var GA_MEASUREMENT_ID = ''; // np. 'G-XXXXXXXXXX' — puste = GA wyłączone

  var STORAGE_KEY = 'franza_cookie_consent';
  var CONSENT_VERSION = 1;
  var CONSENT_MAX_AGE_DAYS = 365; // po roku pytamy ponownie

  // Ścieżka bazowa — plik działa tak samo z index.html jak i z pages/*
  var basePath = window.location.pathname.indexOf('/pages/') !== -1 ? '../' : '';
  var privacyUrl = basePath + 'pages/polityka-prywatnosci.html';

  var CATEGORIES = [
    {
      id: 'necessary',
      label: 'Niezbędne',
      required: true,
      desc: 'Zapewniają prawidłowe działanie strony — nawigację, bezpieczeństwo i zapamiętanie Twojego wyboru dotyczącego cookies. Nie można ich wyłączyć.',
    },
    {
      id: 'functional',
      label: 'Funkcjonalne',
      required: false,
      desc: 'Zapamiętują ustawienia użytkownika, dzięki czemu nie musisz wprowadzać ich przy każdej wizycie.',
    },
    {
      id: 'analytics',
      label: 'Analityczne',
      required: false,
      desc: 'Google Analytics 4 — anonimowa statystyka odwiedzin, która pomaga nam ulepszać serwis.',
    },
    {
      id: 'external',
      label: 'Zewnętrzne',
      required: false,
      desc: 'Treści osadzone z serwisów zewnętrznych: Google Maps oraz YouTube.',
    },
  ];

  var OPTIONAL_IDS = CATEGORIES.filter(function (c) { return !c.required; })
    .map(function (c) { return c.id; });

  /* ---------- Pamięć ---------- */

  function readConsent() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;

      var data = JSON.parse(raw);
      if (!data || data.version !== CONSENT_VERSION) return null;

      var ageDays = (Date.now() - (data.timestamp || 0)) / 86400000;
      if (ageDays > CONSENT_MAX_AGE_DAYS) return null;

      return data.categories || null;
    } catch (err) {
      // Prywatny tryb przeglądarki / zablokowany localStorage
      return null;
    }
  }

  function writeConsent(categories) {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: CONSENT_VERSION,
          timestamp: Date.now(),
          categories: categories,
        })
      );
    } catch (err) {
      /* brak localStorage — zgoda obowiązuje tylko w tej sesji */
    }
  }

  var current = readConsent();

  function allows(category) {
    if (category === 'necessary') return true;
    return !!(current && current[category]);
  }

  function buildChoice(value) {
    var result = { necessary: true };
    OPTIONAL_IDS.forEach(function (id) { result[id] = value; });
    return result;
  }

  /* ---------- Reakcja na zgodę ---------- */

  var gaLoaded = false;

  function loadAnalytics() {
    if (gaLoaded || !GA_MEASUREMENT_ID) return;
    gaLoaded = true;

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
  }

  // Osadzenia (mapa, YouTube) — ładujemy dopiero po zgodzie
  function applyEmbeds() {
    document.querySelectorAll('[data-consent-src]').forEach(function (el) {
      var category = el.dataset.consent || 'external';
      var placeholder = el.previousElementSibling;
      var hasPlaceholder = placeholder && placeholder.classList.contains('consent-placeholder');

      if (allows(category)) {
        if (!el.src) el.src = el.dataset.consentSrc;
        el.style.display = '';
        if (hasPlaceholder) placeholder.remove();
      } else {
        el.style.display = 'none';
        if (!hasPlaceholder) el.parentNode.insertBefore(renderPlaceholder(), el);
      }
    });
  }

  function renderPlaceholder() {
    var box = document.createElement('div');
    box.className = 'consent-placeholder';
    box.innerHTML =
      '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
      '<p>Ta treść pochodzi z serwisu zewnętrznego i wymaga zgody na pliki cookies zewnętrzne.</p>' +
      '<button type="button" class="btn btn-secondary" data-cookie-settings>Ustawienia cookies</button>';
    return box;
  }

  function applyConsent() {
    if (allows('analytics')) loadAnalytics();
    applyEmbeds();
    window.dispatchEvent(new CustomEvent('franza:consent', { detail: current }));
  }

  /* ---------- Zapis wyboru ---------- */

  function save(categories) {
    current = categories;
    writeConsent(categories);
    hideBanner();
    closeModal();
    applyConsent();
  }

  /* ---------- Baner ---------- */

  var banner = null;

  function renderBanner() {
    banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Zgoda na pliki cookies');
    banner.innerHTML =
      '<div>' +
        '<div class="cookie-banner-title">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z"/><path d="M8.5 8.5h.01"/><path d="M15.5 15.5h.01"/><path d="M9.5 14.5h.01"/></svg>' +
          'Dbamy o Twoją prywatność' +
        '</div>' +
        '<p class="cookie-banner-text">Nasza strona wykorzystuje pliki cookies niezbędne do prawidłowego działania oraz — za Twoją zgodą — pliki analityczne i funkcjonalne, które pomagają nam ulepszać serwis. Szczegóły znajdziesz w <a href="' + privacyUrl + '">Polityce prywatności</a>.</p>' +
      '</div>' +
      '<div class="cookie-banner-actions">' +
        '<button type="button" class="btn btn-primary" data-cookie-accept-all>Akceptuję wszystkie</button>' +
        '<button type="button" class="btn btn-secondary" data-cookie-reject>Odrzucam opcjonalne</button>' +
        '<button type="button" class="cookie-settings-link" data-cookie-settings>Ustawienia cookies</button>' +
      '</div>';

    document.body.appendChild(banner);

    banner.querySelector('[data-cookie-accept-all]').addEventListener('click', function () {
      save(buildChoice(true));
    });
    banner.querySelector('[data-cookie-reject]').addEventListener('click', function () {
      save(buildChoice(false));
    });

    requestAnimationFrame(function () {
      banner.classList.add('visible');
      document.body.classList.add('cookie-banner-open');
    });
  }

  function hideBanner() {
    if (!banner) return;
    banner.classList.remove('visible');
    document.body.classList.remove('cookie-banner-open');
  }

  /* ---------- Panel ustawień ---------- */

  var overlay = null;
  var lastFocused = null;

  function renderModal() {
    overlay = document.createElement('div');
    overlay.className = 'cookie-modal-overlay';

    var options = CATEGORIES.map(function (cat) {
      var checked = cat.required || allows(cat.id);
      return (
        '<div class="cookie-option">' +
          '<div class="cookie-option-head">' +
            '<span class="cookie-option-title">' + cat.label + '</span>' +
            // Uwaga: NIE opakowujemy inputa w <label> — kliknięcie byłoby
            // przekazane dalej przez etykietę i przełącznik zmieniałby się dwa razy.
            '<span class="cookie-switch">' +
              '<input type="checkbox" data-cookie-cat="' + cat.id + '"' +
                (checked ? ' checked' : '') +
                (cat.required ? ' disabled' : '') +
                ' aria-label="Cookies: ' + cat.label + '">' +
              '<span class="cookie-switch-track"></span>' +
            '</span>' +
          '</div>' +
          '<p>' + cat.desc + '</p>' +
        '</div>'
      );
    }).join('');

    overlay.innerHTML =
      '<div class="cookie-modal" role="dialog" aria-modal="true" aria-labelledby="cookieModalTitle">' +
        '<div class="cookie-modal-header">' +
          '<div>' +
            '<h3 id="cookieModalTitle">Ustawienia cookies</h3>' +
            '<p>Wybierz kategorie, na które wyrażasz zgodę. Zgodę możesz zmienić w każdej chwili.</p>' +
          '</div>' +
          '<button type="button" class="cookie-modal-close" aria-label="Zamknij ustawienia">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="cookie-modal-body">' + options + '</div>' +
        '<div class="cookie-modal-footer">' +
          '<button type="button" class="btn btn-secondary" data-cookie-reject>Odrzucam opcjonalne</button>' +
          '<button type="button" class="btn btn-primary" data-cookie-save>Zapisz wybór</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);

    overlay.querySelector('.cookie-modal-close').addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    overlay.querySelector('[data-cookie-reject]').addEventListener('click', function () {
      save(buildChoice(false));
    });
    overlay.querySelector('[data-cookie-save]').addEventListener('click', function () {
      var choice = { necessary: true };
      overlay.querySelectorAll('[data-cookie-cat]').forEach(function (input) {
        choice[input.dataset.cookieCat] = input.checked;
      });
      save(choice);
    });
  }

  function openModal() {
    if (!overlay) renderModal();

    // Odśwież przełączniki aktualnym stanem zgody
    overlay.querySelectorAll('[data-cookie-cat]').forEach(function (input) {
      input.checked = input.disabled || allows(input.dataset.cookieCat);
    });

    lastFocused = document.activeElement;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // preventScroll — bez tego panel przewinąłby się od razu do pierwszego
    // przełącznika i kategoria „Niezbędne" byłaby schowana nad krawędzią
    overlay.querySelector('.cookie-modal-body').scrollTop = 0;
    var firstEnabled = overlay.querySelector('[data-cookie-cat]:not(:disabled)');
    if (firstEnabled) firstEnabled.focus({ preventScroll: true });
  }

  function closeModal() {
    if (!overlay || !overlay.classList.contains('open')) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  /* ---------- Start ---------- */

  function init() {
    // Każdy element z data-cookie-settings otwiera panel (stopka, placeholdery, baner)
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-cookie-settings]');
      if (!trigger) return;
      e.preventDefault();
      openModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    if (!current) {
      renderBanner();
    }

    applyConsent();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ---------- Publiczne API ---------- */

  window.FranzaCookies = {
    allows: allows,
    get: function () { return current ? Object.assign({}, current) : null; },
    openSettings: openModal,
    acceptAll: function () { save(buildChoice(true)); },
    rejectOptional: function () { save(buildChoice(false)); },
    reset: function () {
      try { window.localStorage.removeItem(STORAGE_KEY); } catch (err) { /* ignore */ }
      current = null;
      window.location.reload();
    },
  };
})();
