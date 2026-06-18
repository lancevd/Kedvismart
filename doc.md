# Kedvis Mart — Project Documentation

A comprehensive guide to the codebase, architecture, features, and known issues of the **Kedvis Mart** project.

---

## 1. Project Overview

**Kedvis Mart** is a fashion e-commerce storefront built with **Next.js 14 (App Router)** and powered by **Commerce.js (Chec)** as a headless commerce backend. The project's distinguishing feature, advertised on its `/about` page, is **voice / conversational AI integration** powered by `@alan-ai/alan-sdk-web`, intended to allow commands like "search for wrist watch", "add to my cart", and "checkout my cart". That component currently exists only as a stub and is not wired into the running app.

- **Author**: Olamide Mosobalaje
- **Version**: 0.1.0
- **Private**: yes
- **License**: not specified

The repository's `README.md` is the unmodified `create-next-app` boilerplate and does not describe the project itself.

---

## 2. Tech Stack

### Runtime / Framework
- `next` 14.1.1 (App Router, React Server Components capable)
- `react` / `react-dom` 18
- Node-side API routes (`src/app/api/*/route.js`)

### Styling
- `tailwindcss` 3.3 with PostCSS + Autoprefixer
- Global CSS variables in `src/app/globals.css`:
  - `--primary: #000000`
  - `--grey: #eceaea`

### State / Data
- React **Context API** (`CartProvider` / `useCart`) for cart state
- `axios` for HTTP (imported in a few files but used lightly)
- `cookies-next` for cookie read/write
- `react-query` 3.39 — installed but not used (commented out in layout)
- Local static JS arrays (`CardData.js`, `testimonialsData.js`, `ReviewsData.js`) used as mock data
- External API: **Commerce.js** at `https://api.chec.io/v1/...`

### UI / UX Libraries
- `framer-motion` 11 — mobile menu animation in Header
- `swiper` 11 — testimonial carousel (also imported but unused in Reviews)
- `react-icons` 5 (Tabler, Remix, Material, FontAwesome, Ionicons, Bootstrap sets)
- `react-responsive-modal` — "added to cart" confirmation popup
- `rc-slider` 10 — dual-handle price range slider in the shop filter

### Authentication
- **None.** No auth library, no middleware, no `/account` route exists despite being referenced from the Header.

### Security Headers
Configured globally in `next.config.mjs`:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- Applied to all routes via `/:path*`

---

## 3. Configuration

### `.env`
```
NEXT_PUBLIC_API_KEY = pk_48991c2989da0b3a35290d565db969ba1a22875321ca6
```
This is a Commerce.js **publishable** key (`pk_` prefix), used in `cartContext.js` and all API routes. The publishable key is safe to expose in the browser, but each environment should have its own.

### `jsconfig.json`
Path alias `@/*` -> `./src/*`.

### `next.config.mjs`
- `reactStrictMode: true`
- `poweredByHeader: false`
- Global security headers

### `tailwind.config.js`
- `content` globs: `src/pages/**`, `src/components/**`, `src/app/**`
- Default `gradient-radial` and `gradient-conic` `backgroundImage` extensions (unused)

### `postcss.config.js`
- Standard `tailwindcss` + `autoprefixer`

---

## 4. Directory Structure

```
Kedvismart/
├── .env
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── README.md
├── public/
│   ├── kedvis.ico
│   ├── next.svg
│   ├── vercel.svg
│   └── images/  (23 PNGs)
└── src/
    ├── app/
    │   ├── layout.js
    │   ├── page.js
    │   ├── globals.css
    │   ├── faviconn.ico
    │   ├── kedvis.ico
    │   ├── about/page.jsx
    │   ├── cart/page.jsx
    │   ├── shop/page.jsx
    │   ├── [...details]/page.jsx
    │   └── api/
    │       ├── cart/
    │       │   ├── cartStatus/route.js
    │       │   ├── initializeCart/route.js
    │       │   └── updateCart/route.js
    │       ├── details/singleProduct/route.js
    │       └── home/
    │           ├── newArrival/route.js
    │           └── top/route.js
    ├── components/
    │   ├── AlanAI.js
    │   ├── CardData.js
    │   ├── Footer.jsx
    │   ├── Header.jsx
    │   ├── Newsletter.jsx
    │   ├── Spinner.jsx
    │   ├── cart/CartItem.jsx
    │   ├── home/
    │   │   ├── Categories.jsx
    │   │   ├── Hero.jsx
    │   │   ├── NewArrivals.jsx
    │   │   ├── Partners.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── Testimonials.jsx
    │   │   └── testimonialsData.js
    │   ├── productDetails/
    │   │   ├── Gallery.jsx
    │   │   ├── ProductInfo.jsx
    │   │   ├── RelatedProductCard.jsx
    │   │   ├── RelatedProducts.jsx
    │   │   ├── Reviews.jsx
    │   │   ├── ReviewsData.js
    │   │   └── TabComponent.jsx
    │   └── shop/
    │       ├── ColorsToggle.jsx
    │       ├── FilterBar.jsx
    │       ├── ProductCard.jsx
    │       ├── Products.jsx
    │       ├── SizesFilter.jsx
    │       ├── Toggle.jsx
    │       ├── colors/ColorCheck.jsx
    │       └── price/
    │           ├── FilterToggle.jsx
    │           ├── PriceFilter.jsx
    │           └── PriceSlider.jsx
    └── contexts/
        └── cartContext.js
```

---

## 5. Routes & Pages

| Route | File | Notes |
|---|---|---|
| `/` | `src/app/page.js` | Server component; renders Hero, Partners, NewArrivals, TopSelling, Categories, Testimonials. |
| `/shop` | `src/app/shop/page.jsx` | Client component; 2-column layout with FilterBar and Products list. |
| `/about` | `src/app/about/page.jsx` | Server component; static copy describing the AI voice features. |
| `/cart` | `src/app/cart/page.jsx` | Client; lists line items via `CartItem`, hardcoded delivery price 1500 NGN. |
| `/details/[...details]` | `src/app/[...details]/page.jsx` | Catch-all client route; reads `?id=` from URL, stores in `itemID` cookie, fetches via `/api/details/singleProduct`. |

The Header links to `/account`, `/cart`, `/shop`, `/about`, `/`, `/details/<permalink>?id=<id>` and `/#arrival`. The `/account` route does **not** exist.

---

## 6. API Routes

All routes call Commerce.js (`https://api.chec.io/v1/...`) with the header `X-Authorization: <NEXT_PUBLIC_API_KEY>`.

| Method | Path | File | Behavior |
|---|---|---|---|
| GET | `/api/cart/initializeCart` | `cart/initializeCart/route.js` | Sends request to create a new Chec cart. |
| GET | `/api/cart/cartStatus` | `cart/cartStatus/route.js` | Reads `cart_id` cookie, returns current Chec cart state. |
| POST | `/api/cart/cartStatus` | same file | Reads `cart_id` cookie, adds an item to the cart. |
| PUT | `/api/cart/updateCart` | `cart/updateCart/route.js` | Reads `cart_id` cookie + `{id, quantity}`, updates line item quantity. |
| GET | `/api/details/singleProduct` | `details/singleProduct/route.js` | Reads `itemID` cookie, fetches the corresponding Chec product. |
| GET | `/api/home/newArrival` | `home/newArrival/route.js` | Fetches Chec products sorted by `created_at` desc. |
| GET | `/api/home/top` | `home/top/route.js` | Fetches Chec products sorted by price desc. |

---

## 7. State Management

Cart state lives in `src/contexts/cartContext.js`:
- `CartContext` + `CartProvider` wrap the app in `layout.js`.
- `useCart()` exposes: `cart`, `error`, `loading`, `addItemToCart(id, qty)`, `getCart()`, `updateItemQuantity(id, qty)`, `removeItemFromCart(id)` (placeholder, empty body).
- On mount, `initializeCart()` is called; the returned cart id is persisted in the `cart_id` cookie via `cookies-next`.

Local component state is used throughout for UI concerns (modals, qty, selected size/color, mobile menu, active tab).

**Cookies in use**: `cart_id`, `itemID`.

---

## 8. Styling Approach

- Tailwind utility classes throughout.
- Custom CSS in `globals.css`:
  - `.contain` utility (`width: 90%; margin: 0 auto`) — universal container
  - `@layer components` styles for `h1..h5` (sizes + color `#263238`) and `.space` (`h-6 lg:h-10`)
  - Removes number-input spinners in WebKit
- Icons: `react-icons` (Tabler, Remix, Material, FontAwesome, Ionicons, Bootstrap)
- Animations: `framer-motion` (mobile drawer in Header)
- Carousels: `swiper` (Testimonials only)

---

## 9. Data Sources

- **Commerce.js (Chec)** — products and carts.
- **Local static data**:
  - `src/components/CardData.js` — 4 clothing items used by `Products.jsx`.
  - `src/components/home/testimonialsData.js` — 4 testimonials.
  - `src/components/productDetails/ReviewsData.js` — 6 reviews.
- **Images** in `/public/images/`:
  - **Hero**: `Hero.png`
  - **Brand logos**: `versace.png`, `zara.png`, `gucci.png`, `prada.png`, `calvin.png`
  - **Payment icons**: `visa.png`, `mastercard.png`, `paypal.png`, `apple.png`, `google.png`
  - **Products**: `black jeans.png`, `blue jeans.png`, `jeans short.png`, `orange t-shirt.png`, `black t-shirt.png`, `checkered shirt.png`, `long sleeve shirt.png`, `tshirt black sleeves.png`
  - **Categories**: `casual.png`, `formal.png`, `party.png`, `gym.png`

---

## 10. Component Reference

### Layout-Level
- **`src/app/layout.js`** — Root layout. Loads `Inter` via `next/font/google`, sets metadata (title "Kedvis Mart"), wraps children in `CartProvider`, renders `<Header />` + `{children}` + `<Footer />`.
- **`Header.jsx`** (`"use client"`) — Top promo bar (dismissible), nav with mobile hamburger (framer-motion), logo "K.Mart", links to `/shop`, `/#arrival`, `/about`, `/cart`, `/account`. Search inputs are visual only.
- **`Footer.jsx`** — Newsletter block + 4 column footer (Company / Help / FAQ / Resources — all `href="#"` placeholders), brand social icons, payment icons, "Kedvis Mart 2024".
- **`Newsletter.jsx`** — Email input + "Subscribe to Newsletter" button. Form has no submit handler.
- **`Spinner.jsx`** — Tailwind spinner.
- **`AlanAI.js`** — Stub component using `@alan-ai/alan-sdk-web`. Not imported anywhere.

### Home (`src/components/home/`)
- **`Hero.jsx`** — Full-height hero with `/images/Hero.png` background, headline, CTA to `/shop`, stats (200+ brands, 2000+ products, 30,000+ customers).
- **`Partners.jsx`** (`"use client"`) — Black bar of brand logos.
- **`NewArrivals.jsx`** (`"use client"`) — Fetches `/api/home/newArrival`, slices first 4 products, renders `ProductCard`. "View all" link to `/shop`.
- **`TopSelling.jsx`** (`"use client"`) — Same pattern as NewArrivals but calls `/api/home/top`.
- **`Categories.jsx`** — Static 5-tile mosaic (Casual, Formal, Party, Gym).
- **`Testimonials.jsx`** (`"use client"`) — Swiper carousel of `testimonialsData`. Each box shows 5 stars, name with `MdVerified`, content. Autoplay 2.5s.
- **`ProductCard.jsx`** — Card linking to `/details/${info.permalink}?id=${info.id}`. Renders image from `info.image.url`, name, formatted price (Naira `&#8358;`).

### Shop (`src/components/shop/`)
- **`FilterBar.jsx`** — Composes category `Toggle`, `FilterToggle` (Price), `ColorsToggle`, `SizesFilter`. Header "Filters" with X-close.
- **`Toggle.jsx`** — Generic accordion for category list.
- **`PriceFilter.jsx`** / **`PriceSlider.jsx`** / **`FilterToggle.jsx`** — Dual-handle `rc-slider` with range 250–100000, step 100.
- **`ColorsToggle.jsx`** — Accordion with 8 hardcoded color swatches.
- **`ColorCheck.jsx`** — Round color swatch with check on click.
- **`SizesFilter.jsx`** — Size pills: `xx-large, x-large, large, medium, small, x-small, xx-small`. Single-select highlight.
- **`ProductCard.jsx`** — Local-variant card linking to `/details/${info.name}`. Shows `info.image`, name, star rating, price via `info.price.toFixed(2)`.
- **`Products.jsx`** — Renders static `cardData`. "Showing 1-10 of 100 Products" hardcoded.

### Product Details (`src/components/productDetails/`)
- **`Gallery.jsx`** — 3-thumbnail + main image gallery.
- **`ProductInfo.jsx`** (`"use client"`) — Name, price (`₦{price}`), description, color swatches, size pills, qty +/−, "Add to Cart" → opens a modal asking "Would you like to pay now?".
- **`TabComponent.jsx`** — 3 tabs: Product Details, Reviews, FAQs.
- **`Reviews.jsx`** — 2-column grid of review boxes.
- **`RelatedProducts.jsx`** — "You might also like" grid using `products.related_products`.
- **`RelatedProductCard.jsx`** — Same shape as home ProductCard but for related products.

### Cart (`src/components/cart/`)
- **`CartItem.jsx`** (`"use client"`) — Thumbnail, name, unit price, computed total, delete button, qty stepper.

---

## 11. External Services / Integrations

- **Commerce.js (Chec)** — products and carts behind a thin Next.js API layer.
- **Alan AI** — `@alan-ai/alan-sdk-web` is a dependency and a stub component exists, but it is not wired in.
- **next/font (Google Fonts)** — `Inter` loaded via `next/font/google`.

---

## 12. Known Issues / Bugs

1. **`AlanAI` not wired up** — `AlanAI.js` exists with a placeholder key, not imported anywhere. The voice command feature is unimplemented.
2. **`react-query` installed but unused** — `QueryClientProvider` is commented out in `layout.js`.
3. **`initializeCart` uses wrong HTTP method** — Chec's `/carts` endpoint expects POST; the route uses GET, likely failing at runtime.
4. **`ProductInfo` calls `updateItemQuantity(qty)`** — missing the `id` argument (signature is `(productID, quantity)`).
5. **`removeItemFromCart` is an empty function** — delete button in cart is a no-op.
6. **Two `ProductCard` variants with incompatible prop shapes**:
   - `home/ProductCard.jsx` expects `info.permalink`, `info.image.url`, `info.price.formatted` (Commerce.js shape).
   - `shop/ProductCard.jsx` expects `info.name`, `info.image`, `info.price` (local mock shape).
7. **No auth** — `/account` is linked in Header but the route doesn't exist; no user account functionality.
8. **`Reviews.jsx` imports Swiper but uses a plain grid** — dead code.
9. **Search inputs and footer links** — non-functional (`href="#"`, no submit handlers).
10. **Hardcoded Naira formatting** (`&#8358;` and `₦`) — currency implied to be Nigerian Naira; delivery is hardcoded at 1500.
11. **`react-query` v3** is a major version behind (TanStack Query v5 is the successor).
12. **Image filenames contain spaces** (e.g. `black jeans.png`). They work via string references but are unconventional.
13. **`punycode` listed as a direct dependency** — it's a Node built-in, likely added to silence a deprecation warning.

---

## 13. Summary

Kedvis Mart is a **Next.js 14 App Router** fashion storefront scaffolded by `create-next-app` and adapted for commerce. It uses **Commerce.js** as a backend (products, carts) behind a thin layer of Next.js API routes that proxy the Chec API, a **React Context** cart store with cookie persistence, **Tailwind CSS** for styling, and **framer-motion + swiper + react-icons + react-responsive-modal + rc-slider** for UI polish.

The site covers the standard e-commerce surface: a home page (hero, partner brands, new arrivals, top-selling, categories, testimonials), a shop with filters (category accordion, price slider, color swatches, size pills), a product details page (gallery, info, tabs, related products, reviews), a cart page, and an about page. The voice-driven AI commerce experience marketed in `/about` is presently only a stub component.

The code contains several obvious bugs (wrong HTTP method on cart init, missing arg in `updateItemQuantity`, empty `removeItemFromCart`, two incompatible `ProductCard` shapes, no auth route, dead Swiper import) that are good candidates for a follow-up cleanup pass.