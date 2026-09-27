# Modern School Website (Demo)

Complete multi-page website for a modern private school in India — parents can explore academics,
compare fees, read announcements and apply for admission.

## Pages

| File | Page |
|---|---|
| `index.html` | Home — hero, principal welcome, stats, explore, news, achievements, admissions callout |
| `about.html` | Vision, mission, values, principal's message, staff, why choose us |
| `academics.html` | Stages (pre-primary–Class 12), streams, teaching approach, calendar, resources |
| `admissions.html` | 4-step process, eligibility & documents, enquiry form, FAQs |
| `fees.html` | Fee table, payment info, fee FAQs |
| `campus.html` | Facilities, sports, clubs, wellbeing & safety |
| `events.html` | Featured event, upcoming list (filter + search), news feed |
| `achievements.html` | Featured + filterable archive |
| `contact.html` | Contact details, map placeholder, contact form |

## Run locally

No build step. Open `index.html` in a browser, or serve the folder:

```powershell
python -m http.server 8000
# then visit http://localhost:8000
```

## Editing school information

- `js/config.js` — school name, location, board, session, phone, email, address (single place).
- Each page has `EDITABLE` / demo-note markers — replace bracketed placeholders and
  “To be confirmed” cells with verified school data before publishing.
- Forms are front-end validated with demo success states — connect to email / CRM / ERP to go live.

## Design tokens

Ivory `#F7F6F1` · Navy `#19324F` · Teal `#32877D` · Marigold `#F0B64B` — see `css/style.css` `:root`.
Fonts: Fraunces (display) + Inter (body) via Google Fonts.
