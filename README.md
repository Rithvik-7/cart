# Padiyar Caterers & Events Co. — Website Concept

A responsive, static portfolio and enquiry website made with HTML, CSS and vanilla JavaScript. Designed for mobile first and deployable to GitHub Pages, Netlify or any static host. No paid API, build step, npm packages or backend required.

## Run

Open `index.html` in a browser, or launch a local static server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

For GitHub Pages, upload all files in this folder to the root of a repository and go to Settings → Pages → Deploy from branch → main / (root). The website uses relative asset paths, so it works on project subpaths too.

## What is functional?

- Responsive desktop and mobile navigation
- Smooth-scroll anchors and animation with reduced-motion support
- Gallery filter (All, Sweets, Feasts)
- Event-type preselection from service cards
- Client-side enquiry form validation, future-date check and phone-length check
- Ready-to-copy enquiry summary with an Instagram DM link
- Current year in footer

**Booking limitation:** The form does **not** store or transmit customer data. Without a verified business WhatsApp number/email or a form backend, pressing 'Prepare my enquiry' opens a dialog to copy the prepared text and send it to the business on Instagram. If you want direct WhatsApp/Email/Formspree delivery, connect the client's verified details before production. This is intentionally not presented as a received booking.

## Content and production checklist

The brand, Karkala address, 'since 1996', wedding catering, sweets (including Badam Puri) and no-onion/no-garlic preparations are taken from Padiyar Caterers & Events Co.'s publicly visible Instagram bio/posts on 17 November 2026. Service geography beyond Karkala, menus, prices, testimonials, phone/email and package promises have **not** been invented.

The photo assets in `assets/` are concept visuals generated for the website design and should **not** be represented as photos of actual events catered by Padiyar. Replace with client-supplied approved photos and remove the two concept-imagery notes in `index.html` when doing so. The links in 'From our Instagram' point to public posts from the real client profile.

To replace images, simply overwrite the corresponding `.webp` file with a client image (same filename) or update its `<img src="...">` path. For best results: 1600×1000 px landscape for hero, 800×1000 px portraits for story/sweets, and 1200×800 px for gallery/occasion cards.

### Reference

Instagram: https://www.instagram.com/padiyar_caterers_events_co_/
