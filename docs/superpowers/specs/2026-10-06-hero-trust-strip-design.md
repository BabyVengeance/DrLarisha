# Specification: Minimal Monoline Hero Trust Strip Standardization

## 1. Overview & Problem Statement
Currently, subpage hero sections (`products.html`, `services.html`, `about.html`, `contact.html`, and legal subpages) feature a `.subpage-quick-stats` row with `.meta-pill-item` elements.
These elements suffer from:
1. **Vertical clutter**: A two-tier layout (uppercase tracked label stacked on top of bold text) producing 6 to 8 lines of text that feel like an unstyled data table.
2. **Excessive wordiness**: Up to 18–22 words per strip with parentheticals, multiple bullet separators, and full addresses.
3. **Inconsistent rhythm**: Varying counts (3 to 4 items) and lengths across pages, disrupting the luxury clinical aesthetic of Dr Larisha's brand.

## 2. Design Goals
1. **Standardized Monoline Layout**: Replace the multi-row table/pill layout with a single, horizontal, whisper-quiet trust strip (`.hero-trust-strip`) separated by hairline dividers.
2. **Radical Copy Discipline**: Exactly 3 items per page, 2–4 words per item (maximum 7–8 words across the entire strip).
3. **Quiet Luxury Aesthetic**: Set in `Plus Jakarta Sans` regular/medium weight with subtle neutral text tone and hairline dividers (`1px` width, `12px` height, muted accent color) that do not compete with the hero title or lead paragraph.
4. **Responsive Fluidity**: On desktop, sits on a single uninterrupted horizontal line. On mobile (<640px), wraps gracefully with subtle spacing and zero mid-word hyphenations.

## 3. Component Architecture & HTML Markup

Standardized markup across all subpages:

```html
<div class="hero-trust-strip" role="list" aria-label="Key practice highlights">
  <span class="trust-strip-item" role="listitem">Item One</span>
  <span class="trust-strip-divider" aria-hidden="true"></span>
  <span class="trust-strip-item" role="listitem">Item Two</span>
  <span class="trust-strip-divider" aria-hidden="true"></span>
  <span class="trust-strip-item" role="listitem">Item Three</span>
</div>
```

## 4. CSS Specification (`style.css`)

```css
/* --------------------------------------------------------------------------
   STANDARDIZED HERO TRUST STRIP (MINIMAL MONOLINE)
   -------------------------------------------------------------------------- */
.hero-trust-strip {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0;
  padding-top: 20px;
  margin-top: 24px;
  border-top: 1px solid rgba(140, 119, 100, 0.16);
}

.trust-strip-item {
  font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-muted, #5A524C);
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.trust-strip-divider {
  display: inline-block;
  width: 1px;
  height: 12px;
  background-color: rgba(140, 119, 100, 0.28);
  margin: 0 16px;
  flex-shrink: 0;
}

/* Mobile Responsiveness */
@media (max-width: 640px) {
  .hero-trust-strip {
    gap: 8px 12px;
    padding-top: 16px;
    margin-top: 20px;
  }

  .trust-strip-divider {
    display: none;
  }

  .trust-strip-item {
    font-size: 0.8125rem;
    padding: 2px 0;
  }
}
```

## 5. Page-by-Page Content Standard

### 5.1 Skincare Boutique (`products.html`)
- **Item 1**: `Nationwide Courier`
- **Item 2**: `Payflex Available`
- **Item 3**: `Clinical Formulations`

### 5.2 Clinical Services (`services.html`)
- **Item 1**: `Netcare Parklands Base`
- **Item 2**: `Physician-Administered`
- **Item 3**: `By Appointment`

### 5.3 Practitioner Profile (`about.html`)
- **Item 1**: `Parklands Hospital Base`
- **Item 2**: `MBChB (Cum Laude)`
- **Item 3**: `Physician-Led Care`

### 5.4 Contact & Hospital Location (`contact.html`)
- **Item 1**: `Netcare Parklands Suite 2`
- **Item 2**: `Mon – Sat: 09:00 – 17:00`
- **Item 3**: `WhatsApp Direct`

### 5.5 Legal & Compliance Pages
- **Terms & Conditions (`terms.html`)**: `CPA & HPCSA Ethics` | `Durban Jurisdiction` | `Annual Review 2026`
- **Privacy Policy (`privacy-policy.html`)**: `POPIA Act Compliant` | `Information Officer: Dr Pather` | `October 2026 Review`
- **Medical Disclaimer (`medical-disclaimer.html`)**: `Dr Larisha Pather (MBChB)` | `HPCSA Registered` | `Hospital-Based Practice`
- **Cookie Policy (`cookie-policy.html`)**: `Essential Cookies Only` | `POPIA Compliant` | `Zero Third-Party Ads`

## 6. Deprecation & Cleanup
- Deprecate old `.subpage-quick-stats`, `.meta-pill-item`, `.meta-pill-label`, and `.meta-pill-value` styles in `style.css` (or alias them to prevent breaking any orphaned references).
- Verify all pages compile cleanly with WCAG 2.2 AA contrast on `var(--surface)` / `#FAF8F5`.
