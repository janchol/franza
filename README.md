# FRANZA GROUP — strona internetowa

Profesjonalna strona statyczna firmy FRANZA GROUP — producenta chemii technicznej **marki FRANZA** (oferta wiodąca) oraz dystrybutora marek Mannol, Xton, Orapi, Transnet, Würth i NCH Europe.

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
│   ├── produkcja.html      # Własna produkcja FRANZA Chemical Solution
│   ├── dystrybucja.html    # Dystrybucja marek
│   ├── produkty.html       # Katalog produktów z filtrowaniem
│   ├── marki.html          # Strony marek + linki do producentów
│   ├── branze.html         # Branże, które obsługujemy
│   ├── kontakt.html        # Kontakt + formularz + mapa
│   └── polityka-prywatnosci.html  # Polityka prywatności + polityka cookies (RODO)
├── css/
│   └── styles.css          # Wszystkie style (motyw ciemny + akcent pomarańczowy)
├── js/
│   ├── main.js             # Header, footer, mobile menu, formularz
│   └── cookies.js          # Baner + panel zgód na cookies
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

- **Zdjęcia** — część zdjęć to stock z Unsplash. Lista do podmiany jest w sekcji [Zdjęcia do podmiany](#zdjęcia-do-podmiany).
- **Logo** — `assets/favicon.svg` oraz logo w `js/main.js` (funkcja `renderHeader`).
- **Dane kontaktowe** — telefon, email i adres są w `js/main.js` (stopka) oraz `pages/kontakt.html`.
- **Mapa** — w `pages/kontakt.html` jest osadzony OpenStreetMap. Wymień współrzędne na dokładną lokalizację.
- **Formularz** — w `js/main.js` jest tylko walidacja po stronie klienta. Aby formularz faktycznie wysyłał e-maile, podłącz [Formspree](https://formspree.io/), [Web3Forms](https://web3forms.com/) lub własny backend.

## RODO — polityka prywatności i cookies

- **Treść polityki** — `pages/polityka-prywatnosci.html`. Nad sekcją „Administrator danych" jest badge **„Obowiązuje od:"** — podmień datę na dzień publikacji strony (w pliku jest komentarz `>>> PODMIEŃ NA DATĘ PUBLIKACJI STRONY <<<`).
- **Baner i panel zgód** — `js/cookies.js`. Wybór użytkownika trafia do `localStorage` (klucz `franza_cookie_consent`) i jest ważny rok. Zmiana `CONSENT_VERSION` w pliku wymusza ponowne zapytanie wszystkich użytkowników — użyj, gdy dojdzie nowa kategoria cookies.
- **Kategorie**: niezbędne (zawsze aktywne), funkcjonalne, analityczne, zewnętrzne.
- **Google Analytics 4** — wpisz identyfikator w `GA_MEASUREMENT_ID` na górze `js/cookies.js`. Skrypt GA załaduje się dopiero po zgodzie na cookies analityczne.
- **Mapa / YouTube zgodnie z RODO** — zamiast `<iframe src="...">` użyj:

  ```html
  <iframe data-consent="external" data-consent-src="https://..." title="..."></iframe>
  ```

  Ramka wczyta się dopiero po zgodzie na cookies zewnętrzne; wcześniej w jej miejscu jest informacja z przyciskiem do ustawień.
- **Ponowne otwarcie ustawień** — dowolny element z atrybutem `data-cookie-settings` (jest w stopce i na stronie polityki). Z konsoli: `FranzaCookies.openSettings()`, a `FranzaCookies.reset()` czyści zgodę do testów.
- **Klauzula pod formularzem** — `pages/kontakt.html`, sekcja `form-privacy-note`.

> **Do weryfikacji przez klienta:** lista odbiorców danych (sekcja 5) wymienia m.in. **Squarespace Inc.** — ta strona nie działa na Squarespace, więc po wyborze docelowego hostingu trzeba tę listę poprawić. Podobnie Google Analytics, Google Maps i YouTube są opisane w polityce, ale nie są jeszcze osadzone na stronie.

## Marki i linki zewnętrzne

Kanoniczny zestaw marek to **FRANZA Chemical Solution** (produkcja własna) + **6 marek w dystrybucji**:
Mannol, Xton, Orapi, Transnet, Würth, NCH Europe. Ta sama szóstka musi występować w czterech miejscach —
karty na `pages/dystrybucja.html`, sekcje na `pages/marki.html`, karuzela logotypów na `index.html`
oraz kolumna „Dystrybucja" w stopce (`js/main.js`).

Linki do oficjalnych stron producentów są w `pages/marki.html` — na razie mają je tylko dwie marki:

- Mannol → https://www.mannol.de/pl/produkty
- NCH Europe → https://www.ncheurope.com

**Do uzupełnienia:** Xton, Orapi, Transnet i Würth nie mają linku do producenta — zamiast tego
ich przycisk „Zobacz produkty" prowadzi do `pages/produkty.html`, gdzie są wyłącznie produkty FRANZA.

## Zdjęcia do podmiany

Część zdjęć to stock z Unsplash (ładowany z zewnętrznego adresu). Opisy `alt` zostały zmienione na
neutralne („zdjęcie ilustracyjne"), żeby strona nie twierdziła, że to obiekty FRANZY. Do podmiany
na własne fotografie:

| Plik | Miejsce | Co powinno tam być |
|---|---|---|
| `pages/o-nas.html` | sekcja o firmie | zakład produkcyjny FRANZA |
| `pages/o-nas.html` | sekcja o zespole | zdjęcie zespołu |
| `pages/produkcja.html` | nagłówek produkcji | hala produkcyjna |
| `pages/produkcja.html` | kontrola jakości | własne laboratorium |
| `pages/dystrybucja.html` | sekcja „Jeden dostawca" | magazyn FRANZA |
| `pages/branze.html`, `index.html` | ilustracje branż | mogą zostać stockowe |

## Mobile

Strona jest w pełni responsywna. Breakpointy:
- **Mobile**: do 640px
- **Tablet**: 640px - 1024px
- **Desktop**: powyżej 1024px

Menu mobilne (hamburger) pojawia się poniżej 1024px.

## Licencja

© FRANZA GROUP — wszelkie prawa zastrzeżone.
