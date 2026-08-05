# BuildHaus website

Your business website. Plain HTML, CSS and JavaScript — no frameworks, no build
step, nothing to install. If you can edit a text file, you can edit this site.

```
index.html     all the text and structure
styles.css     all the colours, fonts and layout
script.js      menu, animations, contact form
assets/logo.png   your logo
```

---

## 1. Preview it on your computer

Open a terminal in this folder and run:

```bash
python3 -m http.server 4173
```

Then visit **http://localhost:4173** in your browser. Press `Ctrl+C` in the
terminal to stop.

> You can also just double-click `index.html`. That works fine, but the contact
> form only behaves correctly when served over `http://`, so use the command
> above when testing the form.

---

## 2. ⚠️ Connect the contact form — do this first

**Right now the form does not send anything.** It will show an error saying it
isn't connected. Here's the fix — it takes about two minutes and is free:

1. Go to **https://formspree.io** and sign up.
2. Create a **new form** and point it at your email address.
3. Formspree gives you a form ID — a short code like `xdorwqvb`.
4. Open `index.html`, find this line (line **303**):

   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
   ```

5. Replace `YOUR_FORM_ID` with your code, so it reads:

   ```html
   <form id="contactForm" action="https://formspree.io/f/xdorwqvb" method="POST" novalidate>
   ```

6. Save, reload, and send yourself a test message.

Formspree's free plan covers 50 submissions a month. On the first real
submission it emails you to confirm the form is yours.

---

## 3. Check your email address is right

Your email appears in **five** places. Search both files for `mohach22345`
and confirm every one is correct:

- `index.html` (3): the contact section link, the footer link, and the
  structured-data block at the bottom
- `script.js` (2): inside the two contact-form error messages

> ⚠️ **Please double-check this.** You gave me `mohach22345@gmail.com`, but the
> address on your Claude account is `mohach2234@gmail.com` — one digit shorter.
> If the one in the site is wrong, every enquiry goes nowhere. Fix it with a
> find-and-replace across `index.html` and `script.js`.

---

## 4. WhatsApp number

Your WhatsApp number (+961 3 653 083) is linked in the contact section, the
footer, and the structured-data block — search `index.html` for `9613653083`
to find all three. It uses a `wa.me` link, which opens a WhatsApp chat
pre-addressed to that number with no extra setup needed.

If the number ever changes, update the digits after `wa.me/` (no `+`, no
spaces, no leading `0` — e.g. `9613653083`) and the human-readable text next
to each link.

---

## 5. Replace the placeholder content

Search `index.html` for **`TODO:`** — every spot that needs your real
information is marked.

The most important one is the **Work** section. It currently contains three
invented projects (Northside Dental, Cedar & Co. Café, Halim Contracting).
Nothing sells your service faster than real sites you've actually built, so
swap these out as soon as you can.

To use a real screenshot, put the image in `assets/` and replace the coloured
placeholder block:

```html
<!-- replace this -->
<div class="shot shot-1"></div>

<!-- with this -->
<img src="assets/project-1.png" alt="Screenshot of the Northside Dental website">
```

### Changing colours

Every colour is defined once at the top of `styles.css`:

```css
:root{
  --navy:      #16213A;   /* headings, footer */
  --blue:      #1B5CFF;   /* buttons, links, accents */
  --blue-deep: #0B44E0;
  ...
}
```

Change them there and the whole site updates.

---

## 6. Put it online (free)

**Easiest — Netlify Drop:**

1. Go to **https://app.netlify.com/drop**
2. Drag this whole `buildhaus` folder onto the page
3. It's live in seconds at a `something-random.netlify.app` address

**Alternative — GitHub Pages:** push this folder to a GitHub repository, then
in the repo go to *Settings → Pages* and set the source to your main branch.

### Using your own domain

Once you've bought a domain (Namecheap, Cloudflare, GoDaddy):

- **Netlify:** *Site settings → Domain management → Add custom domain*, then
  follow its DNS instructions.
- After the domain is live, search `index.html` for `buildhaus.example` and
  replace it with your real domain. It appears **4** times (two in the
  social-sharing tags near the top, two in the structured-data block at the
  bottom), plus once in a comment.

---

## Notes

- **No dependencies.** No fonts, scripts or trackers are loaded from other
  servers, so the site is fast and keeps working regardless of anyone else's
  uptime.
- **Works without JavaScript.** If JS is blocked, every section still renders
  and the contact form still submits normally.
- **Accessible.** Fully keyboard-navigable, with labelled form fields and
  visible focus outlines.
- **Reduced motion** is respected for visitors who've turned animations off.
