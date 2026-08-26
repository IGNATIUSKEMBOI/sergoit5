# Sergoit Primary School — Website + Google Sheets Form Backend

This package contains the full website plus the wiring needed so that the
**Contact form** and **Alumni registration form** write their submissions
directly into a Google Sheet.

The Admissions/Enrollment section on the Contact page (the embedded sheet)
is a separate, read-only view of an *existing* published sheet — that part
already works as-is with no setup.

## Why an extra step is needed

A plain embedded Google Sheet (`pubhtml`) is view-only — there's no way for
a website to write into it directly. Google's supported way to let a
website add rows to a Sheet is a small **Google Apps Script Web App**
bound to that Sheet. This package includes that script
(`google-apps-script/Code.gs`) — you just need to deploy it once and paste
the resulting URL into the site's JavaScript.

## Setup (5–10 minutes, one-time)

1. **Open (or create) the Google Sheet** you want submissions saved to.
2. In the Sheet, go to **Extensions → Apps Script**.
3. Delete any starter code in `Code.gs`, then paste in the entire contents
   of `google-apps-script/Code.gs` from this package.
4. Click **Save** (the disk icon), then **Deploy → New deployment**.
5. Click the gear icon next to "Select type" and choose **Web app**.
6. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
7. Click **Deploy**. The first time, Google will ask you to authorize the
   script — accept the permissions (it's your own script acting on your
   own Sheet).
8. Copy the **Web app URL** it gives you (ends in `/exec`).
9. Open `js/main.js` in this package and find this line near the top of
   the file:

   ```js
   const SHEET_ENDPOINT = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```

   Replace the placeholder text with the URL you copied, e.g.:

   ```js
   const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycb.../exec';
   ```

10. Upload the site (all files in this package) to your host, replacing
    the old versions.

That's it — from then on:
- Submissions from `contact.html` land in a **"Contact Messages"** tab.
- Submissions from `alumni.html` land in an **"Alumni Registrations"** tab.

Both tabs are created automatically the first time each form is used, with
headers already filled in.

## Re-deploying after you edit Code.gs

If you ever change `Code.gs`, you must create a **new deployment** (or use
"Manage deployments → Edit → New version") for the changes to take effect —
just saving the script isn't enough.

## Testing

Until you complete the setup, submitting either form will show a small
warning message instead of the success message (so it fails safely rather
than pretending it worked). Check your browser's console — the intended
payload is logged there for reference while you're testing.

## File structure

```
index.html
about.html
academics.html
gallery.html
alumni.html
contact.html
css/style.css
js/main.js
images/
google-apps-script/Code.gs
README.md
```

**Note:** `img7.jpg` is referenced in a few places (hero slider, about page,
gallery) but wasn't among the uploaded images, so that file isn't included
here — add it to the `images/` folder with that exact name if you have it,
or update the references.
