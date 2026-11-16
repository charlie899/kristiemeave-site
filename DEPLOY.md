# Deploy kristiemeave.com to Cloudflare Pages

Free hosting, free SSL, free CDN. No credit card required.

## Part 1: Get the contact form working (5 minutes, do this FIRST)

1. Go to https://web3forms.com
2. In the "Create Access Key" box, enter: kristie@kristiemeave.com
3. Check that inbox, click the verification link
4. Copy the access key they give you (looks like `a1b2c3d4-...`)
5. Open `assets/js/main.js` in a text editor
6. Find the line `var WEB3FORMS_ACCESS_KEY = "REPLACE_WITH_YOUR_ACCESS_KEY";`
7. Replace `REPLACE_WITH_YOUR_ACCESS_KEY` with your access key, save

Web3Forms is free, unlimited submissions, delivers to kristie@kristiemeave.com. Submissions are also viewable in their dashboard.

Want the form to email both of you? After the form is live, log in to web3forms.com, go to Dashboard, edit the form settings, and add charlie@greenbiznursery.com as a second recipient.

## Part 2: Deploy to Cloudflare Pages (5 minutes)

1. Go to https://dash.cloudflare.com
2. Sign up or log in (free)
3. Left sidebar: **Workers & Pages**
4. Click **Create**, then the **Pages** tab, then **Upload assets**
5. Project name: `kristiemeave-site`
6. Click **Create project**
7. Drag the ENTIRE kristiemeave-site folder (not the zip) into the drop zone. All files, including `_redirects`, `_headers`, the `assets` folder, and all HTML files.
8. Click **Deploy site**
9. Wait 30 seconds. You get a URL like `kristiemeave-site.pages.dev`
10. Click the URL, confirm the site loads and the contact form works.

## Part 3: Point kristiemeave.com at it (10 minutes + DNS wait)

The domain needs to be on Cloudflare's DNS. If it's currently on IONOS, you'll move the nameservers (the domain registration stays at IONOS, just the DNS management moves to Cloudflare, which is normal and free).

1. In Cloudflare dashboard, left sidebar: **Websites**
2. Click **Add a site**, enter `kristiemeave.com`, select the **Free** plan
3. Cloudflare scans your current DNS at IONOS. Review the records, keep any for existing email (MX records for kristie@kristiemeave.com) if they exist.
4. Cloudflare gives you 2 nameservers like `ada.ns.cloudflare.com` and `bob.ns.cloudflare.com`
5. Log in to IONOS, find domain settings for kristiemeave.com, change nameservers to the 2 Cloudflare ones
6. Wait anywhere from 10 minutes to a few hours for DNS to propagate. Cloudflare will email you when it's active.

Once the domain is on Cloudflare:

7. Back in Cloudflare dashboard: **Workers & Pages**, click your `kristiemeave-site` project
8. **Custom domains** tab, **Set up a custom domain**
9. Enter `kristiemeave.com`, click **Continue**
10. Cloudflare auto-configures the DNS. Takes about 2 minutes.
11. Repeat for `www.kristiemeave.com` so both versions work.

Done. SSL certificate auto-provisions within a few minutes.

## Updating the site later

When you want to change something:

1. Edit the files on your computer
2. In Cloudflare: Workers & Pages → kristiemeave-site → **Create deployment**
3. Drag the folder again
4. Wait 30 seconds, done

Or use Git: connect a GitHub repo to the Pages project and every push auto-deploys.

## Watching contact form submissions

- Email arrives at kristie@kristiemeave.com (and charlie@greenbiznursery.com if you add it)
- Dashboard at https://web3forms.com shows all submissions with timestamps
- Free forever, no monthly limit

## Files in this package

- `index.html` - home
- `about.html`, `consulting.html`, `boards.html`, `businesses.html`, `resume.html`, `contact.html` - the other pages
- `404.html` - shown when someone hits a bad URL
- `_redirects` - lets `/about` work the same as `/about.html` (clean URLs)
- `_headers` - sets cache headers so the site is fast
- `assets/css/style.css` - styles
- `assets/js/main.js` - contact form handler (edit this to add Web3Forms key)
- `assets/img/kristie-portrait.jpg` - hero photo

## Known things to finish before telling anyone

1. **Portrait**: the current one is a holiday party photo. Replace with a real headshot before launch.
2. **Content placeholders**: the EDC join date, nonprofit name, Bush appointment agency, and H&H tenure dates still say `[Year]` etc. Need Kristie to fill them in.
3. **Resume PDF**: `resume.html` links to a PDF download that doesn't exist yet. Either generate the PDF from the resume content and drop it at `assets/docs/kristie-allen-resume.pdf`, or remove the download button.
4. **"Preview mode" banner**: already removed from all pages in this build.
