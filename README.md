# FRANZA GROUP — strona internetowa

Profesjonalna strona statyczna firmy FRANZA GROUP — producenta chemii technicznej **marki FRANZA** (oferta wiodąca) oraz dystrybutora marek Mannol, Xton, Orapi i NCH Europe.

## Tech stack

- Czysty **HTML5 / CSS3 / vanilla JavaScript** (bez frameworków, bez build stepa)
- W pełni responsywna (mobile-first)
- Działa od razu po otwarciu w przeglądarce
- Gotowa do hostowania na **GitHub Pages**, Netlify, Vercel lub dowolnym hostingu

## Struktura projektu

```
franza/
├── index.html              # Strona główna
├── pages/
│   ├── o-nas.html          # O firmie
│   ├── produkcja.html      # Własna produkcja FRANZA Chemicals
│   ├── dystrybucja.html    # Dystrybucja marek
│   ├── produkty.html       # Katalog produktów z filtrowaniem
│   ├── marki.html          # Strony marek + linki do producentów
│   ├── branze.html         # Branże, które obsługujemy
│   └── kontakt.html        # Kontakt + formularz + mapa
├── css/
│   └── styles.css          # Wszystkie style (motyw ciemny + akcent pomarańczowy)
├── js/
│   └── main.js             # Header, footer, mobile menu, formularz
├── assets/
│   └── favicon.svg
└── images/                 # Tu wgraj własne grafiki (logo, zdjęcia)
```

Header i stopka są ładowane dynamicznie przez `js/main.js` — wystarczy zmienić je w jednym miejscu, żeby zaktualizować na wszystkich podstronach.

## Uruchomienie lokalnie

Wystarczy otworzyć `index.html` w przeglądarce. Dla lepszego testowania (poprawne ścieżki dla podstron) można uruchomić prosty serwer:

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

Następnie wejdź na `http://localhost:8000`.

## Deployment na GitHub Pages

1. Wypchnij repo na GitHub.
2. W repo: **Settings → Pages**.
3. **Source**: wybierz branch `main` i katalog `/` (root).
4. Kliknij **Save**.
5. Po chwili strona będzie dostępna pod adresem `https://<twoj-user>.github.io/franza/`.

Dla własnej domeny (`franza-group.com` lub innej) — w **Settings → Pages → Custom domain** wpisz domenę i ustaw rekord CNAME u rejestratora.

## Co warto podmienić

- **Zdjęcia** — obecnie używamy stocku z Unsplash. Wgraj własne grafiki do `images/` i podmień ścieżki `src` w plikach HTML.
- **Logo** — `assets/favicon.svg` oraz logo w `js/main.js` (funkcja `renderHeader`).
- **Dane kontaktowe** — telefon, email i adres są w `js/main.js` (stopka) oraz `pages/kontakt.html`.
- **Mapa** — w `pages/kontakt.html` jest osadzony OpenStreetMap. Wymień współrzędne na dokładną lokalizację.
- **Formularz** — w `js/main.js` jest tylko walidacja po stronie klienta. Aby formularz faktycznie wysyłał e-maile, podłącz [Formspree](https://formspree.io/), [Web3Forms](https://web3forms.com/) lub własny backend.

## Marki i linki zewnętrzne

Linki do oficjalnych stron producentów są w `pages/marki.html`:

- Mannol → https://www.mannol.de
- Xton → https://www.xton.eu
- Orapi → https://www.orapi.com
- NCH Europe → https://www.ncheurope.com

## Mobile

Strona jest w pełni responsywna. Breakpointy:
- **Mobile**: do 640px
- **Tablet**: 640px - 1024px
- **Desktop**: powyżej 1024px

Menu mobilne (hamburger) pojawia się poniżej 1024px.

## Licencja

© FRANZA GROUP — wszelkie prawa zastrzeżone.
