# Kitchen Site Redesign Master Plan

## 1) Vision and Success Targets

Build a mobile-first, SEO-optimized kitchen website that helps users quickly:
- order food for delivery,
- book dine-in slots,
- browse menu and offers,
- trust the brand through reviews, certifications, staff, and stories.

### Primary business goals
- Increase online orders and checkout completion.
- Increase dine-in bookings.
- Improve organic search traffic and local search visibility.
- Reduce bounce rate on mobile.

### KPI targets (first 90 days after launch)
- +40% organic traffic.
- +25% menu-to-cart conversion.
- +20% checkout completion rate.
- +30% booking completion rate.
- Core Web Vitals pass rate > 85% URLs (mobile).

---

## 2) Information Architecture (Final Sitemap)

## Public pages
- `/` Home
- `/menu`
- `/menu/:category`
- `/menu/:category/:item-slug`
- `/checkout`
- `/order-success/:orderId`
- `/book-table`
- `/booking-success/:bookingId`
- `/about`
- `/gallery`
- `/reviews`
- `/blog`
- `/blog/:slug`
- `/certifications`
- `/contact`
- `/faq`
- `/privacy-policy`
- `/terms`
- `/refund-policy`
- `/shipping-delivery`

## Utility routes
- `/track-order`
- `/offers`
- `/not-found`

## Admin routes
- `/admin/login`
- `/admin/dashboard`
- `/admin/menu`
- `/admin/orders`
- `/admin/bookings`
- `/admin/reviews`
- `/admin/blogs`
- `/admin/gallery`
- `/admin/staff`
- `/admin/certifications`
- `/admin/seo`

---

## 3) Navigation and Access Model

### Desktop header
- Left: logo.
- Center: Home, Menu, Book Table, About, Blog, Contact.
- Right: Search, Cart, Call button.

### Mobile navigation
- Sticky top bar: logo + search + cart.
- Sticky bottom action bar: `Menu`, `Cart`, `Book`, `Call`.
- Slide drawer for full navigation and policy pages.

### Click-depth rule
- Any primary action (order, booking, contact) within 1-2 taps.

---

## 4) Page-by-Page UX Blueprint (Desktop + Mobile)

## Home
### Blocks
1. Hero (headline + location + two CTAs: Order Now / Book Table)
2. Category quick cards (Breakfast, Meals, Biryani, Beverages, etc.)
3. Best sellers carousel
4. Trust section (ratings, delivery time, certifications)
5. Reviews preview
6. Gallery preview
7. Blog preview
8. Contact snapshot + map

### Mobile notes
- Hero CTA always visible above fold.
- Horizontal category chips.
- Compressed media (WebP/AVIF).

## Menu
### Blocks
1. Sticky search and filters
2. Category side nav (desktop) / collapsible drawer (mobile)
3. Item cards with image, rating, tags, price, add to cart
4. Item detail modal/page with customization
5. Sticky cart summary on mobile

### Mobile notes
- Filter panel as bottom sheet.
- Add-to-cart controls optimized for thumb zone.

## Checkout
### 4-step flow
1. Customer details
2. Address and delivery slot
3. Payment method
4. Review and place order

### UX essentials
- Progress indicator.
- Clear fee/tax breakdown.
- Coupon support.
- Failed payment recovery state.

## Book Table
### Blocks
- Date picker, time slots, party size, seating preference, contact details.
- Booking summary and confirmation.
- Optional pre-order link.

## About
- Story timeline, mission, kitchen values, staff highlights, founder note.

## Gallery
- Tabs: Food, Kitchen, Team, Events, Dine-in.
- Lightbox + lazy loading.

## Reviews
- Verified and recent filters.
- Review submission form with moderation.

## Blog
- Category and tag filters.
- SEO-ready detail pages with related posts.

## Certifications
- Download/view documents with issue date and validity.

## Contact
- Multi-channel contact cards, map, FAQ, inquiry form.

---

## 5) Design System and Component Strategy

Use one visual system, even with multiple libraries.

### Visual language
- Warm, food-first palette (orange/terracotta/cream/earth neutrals).
- Clear type hierarchy with readable body text.
- Consistent spacing scale: 4, 8, 12, 16, 24, 32, 48, 64.

### Component sources
- **MUI (primary functional components):** forms, date/time pickers, tables, dialogs, tabs, admin layouts.
- **ReactBits (marketing interactions):** feature cards, testimonial sliders, rich hero blocks.
- **Vengeance UI (polish and section blocks):** premium nav patterns, section transitions, visual cards.

### Rule for consistency
- Build wrappers in `src/components/app/*`:
  - `AppButton`, `AppCard`, `AppInput`, `AppModal`, `AppSection`, `AppBadge`.
- Third-party components are consumed only through wrappers.

---

## 6) Technical SEO Plan (Ranking-first)

## Metadata and indexing
- Unique title/meta description per page.
- Canonical URLs.
- Open Graph and Twitter cards.
- XML sitemap auto-generation.
- Clean robots.txt.

## Structured data (JSON-LD)
- `Restaurant` / `LocalBusiness`
- `Menu`, `Product`, `Offer`
- `Review`, `AggregateRating`
- `FAQPage`
- `BlogPosting`
- `BreadcrumbList`

## URL and content strategy
- Human-readable slugs.
- Breadcrumb navigation.
- Strong internal linking: blog -> menu items/categories -> checkout/book.

## Performance and CWV
- Lazy-load below-fold images.
- Next-gen image formats + responsive srcset.
- Code splitting by route.
- Minimize layout shift (fixed image dimensions, skeleton loaders).
- Defer non-critical animation scripts.

## Local SEO
- NAP consistency (name/address/phone) across website and listings.
- Embedded map + service area section.
- Location keywords in H1/H2 and body naturally.

---

## 7) Appwrite Architecture Plan

## Collections (final)

### Existing (retain and normalize)
- `site_config`
- `menu_categories`
- `menu_items`
- `reviews`
- `blogs`
- `staff_members`
- `gallery_photos`

### New (add)
- `orders`
- `order_items`
- `bookings`
- `payments`
- `contact_messages`
- `certificates`
- `seo_pages`
- `delivery_zones`
- `coupons`
- `faqs`

## Required fields (key examples)

### `menu_items`
- `name`, `slug`, `description`, `price`, `category_id`, `is_available`, `is_veg`, `spice_level`, `image_file_id`, `rating_avg`, `rating_count`, `prep_time_min`, `seo_title`, `seo_description`.

### `orders`
- `order_no`, `customer_name`, `phone`, `email`, `address`, `order_status`, `payment_status`, `payment_method`, `subtotal`, `tax`, `delivery_fee`, `discount`, `grand_total`, `notes`, `placed_at`.

### `bookings`
- `booking_no`, `name`, `phone`, `email`, `booking_date`, `booking_time`, `party_size`, `special_request`, `status`.

### `seo_pages`
- `route`, `meta_title`, `meta_description`, `canonical_url`, `og_image_file_id`, `schema_type`, `indexable`.

## Permissions
- Public read for approved content collections.
- Admin-only write.
- Order and booking create via secure Appwrite Function.

## Functions
- `createOrder` (server-side totals, validation)
- `verifyPaymentWebhook`
- `createBooking`
- `sendOrderNotifications` (email/WhatsApp/Telegram)
- `sendBookingNotifications`

---

## 8) Conversion Funnel Design

## Order funnel
`Home/Menu -> Add to Cart -> Checkout -> Payment -> Success`

### Drop-off controls
- Always-visible cart on mobile.
- Transparent charges.
- Guest checkout option.
- Retry payment flow.

## Booking funnel
`Home/About -> Book Table -> Slot Select -> Confirm -> Success`

### Drop-off controls
- One-screen quick booking option.
- Pre-filled user fields for returning users.

---

## 9) Content Strategy for Google Ranking

## Core keyword clusters
- Primary: `online food delivery [city]`, `home-style food [city]`, `book table [city]`.
- Secondary: dish/category intent (`best biryani`, `healthy student meals`, etc.).
- Informational: recipe and food tips in blog.

## Content templates
- Category landing pages with intro text + FAQ + popular items.
- Blog articles with recipe/how-to/local-food guides.
- Review-rich pages with structured data.

## Publish cadence
- 2-3 blog posts per week.
- 1 menu category spotlight/week.
- 1 local landing update/month.

---

## 10) Analytics and Tracking Plan

Track in GA4 + Search Console + optional PostHog.

## Key events
- `view_menu`
- `add_to_cart`
- `begin_checkout`
- `payment_success`
- `payment_failed`
- `booking_started`
- `booking_confirmed`
- `contact_submitted`

## Dashboards
- SEO dashboard (impressions, CTR, top queries, indexed pages).
- Conversion dashboard (menu -> cart -> checkout -> paid).

---

## 11) Security, Reliability, and Compliance

- Move all Appwrite endpoint/project IDs and keys to environment variables.
- Never expose secret keys in frontend.
- Validate order/booking payloads server-side.
- Rate limit contact and review submissions.
- Add anti-spam checks (honeypot + optional CAPTCHA).
- Add privacy-policy and terms pages with explicit consent on forms.

---

## 12) Phased Execution Plan

## Phase 0: Foundation (Week 1)
- Freeze current features and define final routes.
- Establish design tokens and app component wrappers.
- Add SEO infrastructure scaffold (meta handler, sitemap generator).

## Phase 1: IA + Responsive Shell (Week 2)
- Build final header, mobile bottom actions, footer, breadcrumbs.
- Implement route skeletons and navigation transitions.

## Phase 2: Menu + Cart + Checkout (Week 3-4)
- Unify menu data source to Appwrite.
- Rebuild cart and 4-step checkout flow.
- Add payment gateway integration with webhook verification.

## Phase 3: Booking + Contact (Week 5)
- Build booking flow with slot availability.
- Connect contact form to Appwrite `contact_messages`.

## Phase 4: Content modules (Week 6)
- Blog listing/detail, gallery, reviews, staff, certifications.
- Add structured data per page type.

## Phase 5: Admin and Operations (Week 7)
- Admin CRUD for menu, orders, bookings, blog, SEO metadata.
- Order and booking status workflow dashboards.

## Phase 6: SEO + Performance hardening (Week 8)
- Core Web Vitals optimization, image optimization, schema validation.
- Technical SEO checklist complete, QA complete.

---

## 13) Acceptance Checklist (Definition of Done)

- All key pages are mobile and desktop optimized.
- Menu, cart, checkout, payment, and booking are fully functional with Appwrite.
- Blog, reviews, gallery, staff, contact, certifications are managed from admin.
- SEO essentials are implemented and validated.
- Lighthouse mobile scores target:
  - Performance >= 85
  - Accessibility >= 90
  - Best Practices >= 90
  - SEO >= 95

---

## 14) Immediate Build Backlog (Start Now)

1. Replace hardcoded Appwrite config with `.env` usage in `src/lib/appwrite.ts`.
2. Unify menu source in `src/components/menu/MenuPage.tsx` to Appwrite API (remove static `menuData` dependency).
3. Introduce route-level SEO metadata helper and JSON-LD utility.
4. Add `sitemap.xml` and `robots.txt` generation script.
5. Build new responsive navigation (desktop + mobile bottom action bar).
6. Implement final checkout pipeline with server-side order creation and payment verification.
7. Add booking module and Appwrite collection integration.
8. Launch admin SEO editor for page titles, descriptions, canonical URLs.
