# Architectural Demo Blueprint: Dr Larisha Pather (v3.5)
*Medical Aesthetics, Wellness & Skin Health — Parklands Hospital, Durban*

---

## 1. Source & Confidence
- **Brand Identity:** High Confidence. Derived directly from Dr Larisha's active marketing flyers, official LP monogram logo, and client WhatsApp directive: *"I like neutral balanced colors. Not loud. Simple but captures the eye."*
- **Pricing & Packages:** 100% Verified. Extracted directly from promotional flyers for Lip Filler (R3,000), BTOX (R1,500–R6,500), Weight Management (R1,500–R3,500), and IV Infusions (R500–R1,500).
- **Practitioner Photography:** 100% Real. Doctor portraits in navy clinical blazer and patient treatment imagery provided directly by client. Zero stock photography.
- **Location NAP:** Verified. Suite 2, Parklands Hospital, 45 Hopelands Road, Overport, Durban, KZN.

---

## 2. The Hook
> *"Natural-looking results and physician-led care at Parklands Hospital, Durban. Transforming clinical precision into effortless radiance."*

---

## 3. Niche Pattern Table & Verified References
Precedent analysis across leading South African medical aesthetics practices:
1. **The Aesthetics Centre (Umhlanga):** https://theaestheticscentre.co.za
2. **Skin Renewal (Durban / National):** https://www.skinrenewal.co.za
3. **Medi-Sculpt Clinic (Dr Anushka Reddy):** https://medisculpt.co.za
4. **Dr Nerina Wilkinson + Associates:** https://drnerinawilkinson.co.za

| Structural Element | Benchmark Standard | Dr Larisha Pather Implementation |
|---|---|---|
| **Header / Navigation** | Sticky header with phone & booking CTA | Sticky frosted header (`backdrop-filter: blur(16px)`), LP monogram, quick phone dial (`tel:+27844608676`), and primary `"Book Consultation"` button. |
| **Hero Architecture** | Split hero: doctor authority + primary clinical value proposition | Split editorial grid: Left side presents doctor credentials and dual CTAs; right side features Dr Larisha in navy suit with hospital trust stamp. |
| **Treatment Directory** | Multi-tab interactive treatment index | Categorized tabbed matrix (Medical Aesthetics, Weight Loss, IV Infusions, Skin & Peels) with transparent package pricing and direct booking triggers. |
| **Clinical E-Commerce** | Dedicated retail skincare showcase | In-page boutique display for Serene Skincare line featuring sliding cart drawer, Payflex 4-instalment notice, and The Courier Guy delivery badge. |
| **Consultation Intake** | Direct WhatsApp click-to-chat + POPIA-compliant form | Fixed bottom-right WhatsApp concierge button + medical intake form with POPIA data protection disclosure. |

---

## 4. Strict CSS Token Contract

Declared in `:root` of `style.css`:
```css
:root {
  --bg: #FAF8F5;              /* Warm alabaster cream canvas */
  --surface: #F3ECE5;         /* Soft linen neutral card containers */
  --text: #1E1B18;            /* Deep espresso charcoal (Contrast: 15.8:1) */
  --muted: #6E665E;           /* Warm slate grey metadata */
  --brand: #8C7764;           /* Muted bronze / rich taupe accent */
  --brand-2: #D9CBBF;         /* Warm sand taupe for badges & pills */
  --cta: #1E1B18;             /* Espresso button fill (Contrast: 16.8:1 on white) */
  --cta-text: #FFFFFF;        /* Pure white button text */
  --line: #E5DACF;            /* 1px hairline dividers */
  --font-display: "Playfair Display", Georgia, serif;
  --font-body: "Plus Jakarta Sans", -apple-system, sans-serif;
}
```

---

## 5. Layout Concept & Wireframe

### Desktop Layout (1440px)
```
+--------------------------------------------------------------------------+
| [LP Logo]   About   Treatments   Skincare   Hospital Base   [Book via Fresha]|
+--------------------------------------------------------------------------+
| HERO:                                                                    |
| [DR. LARISHA PATHER]                  | [EDITORIAL PORTRAIT IN NAVY SUIT]|
| Bespoke Medical Aesthetics &          | Suite 2, Parklands Hospital      |
| Holistic Wellness.                    | Overport, Durban                 |
| [Book Consultation]  [Shop Skincare]  | [Verified Physician Badge]       |
+--------------------------------------------------------------------------+
| 3 CLINICAL PILLARS: Natural Results | Personalised Plans | Root-Cause Care|
+--------------------------------------------------------------------------+
| SIGNATURE PROCEDURES BENTO GRID:                                         |
| [Lip Filler Special R3,000] | [Weight Management R3,500] | [BTOX Offer]  |
+--------------------------------------------------------------------------+
| ABOUT DR LARISHA & CLINICAL PHILOSOPHY (Timeline: Consult -> Plan -> Care)|
+--------------------------------------------------------------------------+
| INTERACTIVE TREATMENT MENU (Aesthetics | Body | IV Infusions | Skin)      |
+--------------------------------------------------------------------------+
| SERENE SKINCARE BOUTIQUE (Serums, Creams, SPF50, Capsules + Cart Drawer) |
+--------------------------------------------------------------------------+
| PARKLANDS HOSPITAL LOCATION & CONSULTATION INTAKE (Map + POPIA Form)     |
+--------------------------------------------------------------------------+
| FOOTER: Legal Supplier Details, HPCSA Medical Notice, POPIA Privacy, NAP |
+--------------------------------------------------------------------------+
```

### Mobile Layout (375px)
```
+-----------------------------------+
| [LP Logo]                     [☰] |
+-----------------------------------+
| HERO:                             |
| [Doctor Portrait in Navy Blazer]  |
| Bespoke Medical Aesthetics &      |
| Holistic Wellness                 |
| [Book Consultation (48px)]        |
| [Shop Skincare (48px)]            |
+-----------------------------------+
| 3 Core Pillars (Vertical stack)   |
+-----------------------------------+
| Featured October Specials Cards   |
+-----------------------------------+
| Interactive Treatment Tabs        |
+-----------------------------------+
| Skincare Products Carousel        |
+-----------------------------------+
| Location, Map & Intake Form       |
+-----------------------------------+
| [Floating WhatsApp Pill (48px)]   |
+-----------------------------------+
```

---

## 6. Signature Moment
**The Interactive Clinical Treatment & Wellness Navigator:** An elegant, tabbed clinical treatment matrix featuring real promotional packages (Lip Filler R3,000, BTOX from R1,500, Tummy Reduction R3,500, IV Glow Infusions from R500). Each card displays the treatment duration, candidate suitability, transparent starting price, and an instant booking trigger routing directly to Dr Larisha's profile.

---

## 7. Asset Map
- `assets/logos/logo.svg` & `logo.png`: Official LP Monogram with "DR LARISHA PATHER".
- `assets/images/dr-larisha-pather.webp`: Professional portrait in navy suit for Hero & About sections.
- `assets/images/dr-larisha-consultation.webp`: Seated clinical portrait in consultation suite.
- `assets/images/lip-filler-contour.webp` & `lip-filler-special.webp`: Lip filler clinical closeup with defined contours.
- `assets/images/btox-forehead-treatment.webp` & `btox-preparation-tray.webp`: Facial rejuvenation BTOX procedure.
- `assets/images/iv-wellness-drip.webp`, `wellness-glow-skin.webp`, `wellness-double-glow.webp`: IV infusion therapy and radiant skin.
- `assets/images/weight-management-contour.webp` & `weight-loss-program.webp`: Physician-guided body contouring.
- `assets/images/skincare-*.webp`: Serene Aesthetic Skincare packaging suite.

---

## 8. Copy Architecture & Tone
- **Voice:** Calm, clinically authoritative, reassuring, sophisticated.
- **Terminology:** "Practice", "Aesthetic Suite", "Clinical Protocols", "Physician-Led", "Parklands Hospital".
- **Banned Terms:** The word "sanctuary" is permanently excluded. No generic fluff ("revolutionary", "game-changer", "dive into").

---

## 9. The Apex Edge
1. **Hospital-Grade Trust Anchor:** Front-and-center Netcare Parklands Hospital positioning elevates Dr Larisha above shopping mall salons.
2. **Instant Mobile Booking:** Clean routing to LinkedIn/booking gateway with zero mobile friction.
3. **E-Commerce Handoff Ready:** Product cards feature semantic `data-sku`, `data-price`, and `data-title` ready for WooCommerce / Payflex / The Courier Guy backend integration.

---

## 10. Content Gaps
- Exact HPCSA registration number (marked with verified placeholder in footer for client confirmation).
- High-resolution photography of the Parklands Hospital consultation room interior (to be supplied by client).
- Skincare online ordering terms and courier flat rates (R100 nationwide delivery indicated as standard).

---

## 11. Flags to Verify
- Booking link routes to Dr Larisha's profile URL: `https://www.linkedin.com/in/dr-larisha-pather-206a1364/?isSelfProfile=false` as explicitly requested by Rohan.
- Direct WhatsApp link routes to `+27 84 460 8676`.

---

## 12. The 5-Point Self-Critique

1. **The Swap Test:** If you remove the LP logo and Dr Larisha's photography, could this belong to a generic beauty salon? No. The Parklands Hospital address, verified South African Rand package pricing (R3,000 Lip Filler, R3,500 Tummy Reduction), and physician-administered medical treatments are unique to Dr Larisha Pather.
2. **The 3-Second Test:** A visitor landing on the page immediately recognizes a premium doctor-led aesthetic practice based at Parklands Hospital in Durban.
3. **The Brand Test:** The design uses the warm alabaster (`#FAF8F5`), soft linen (`#F3ECE5`), and deep espresso typography (`#1E1B18`) directly derived from her actual flyers and her explicit directive: *"neutral balanced colors, not loud, simple but captures the eye."*
4. **The Remove-One-Accessory Test:** Eliminated any decorative floating widgets or neon radial glows. Every border is a purposeful 1px hairline (`#E5DACF`).
5. **The Multi-Viewport Inspection:** Fluid typography via `clamp()`, minimum 48px tap targets on all buttons and navigation drawer toggles, and zero horizontal overflow across 375px, 768px, and 1440px.
