# A Steady Word — Android build

This is your devotional app packaged as a [Capacitor](https://capacitorjs.com/)
project. Capacitor wraps the web app (React + Vite) in a native Android shell, so
the output is a standard Android Studio / Gradle project that produces an
**Android App Bundle (`.aab`)** — the format Google Play requires.

The app is fully **offline**: all 250 words, the 21‑day path, and saved items live
on the device (via `localStorage`). No server, no accounts, no network calls.

---

## What's here

```
steady-word-app/
├─ src/SteadyWord.jsx     ← your app (unchanged logic; storage now uses localStorage)
├─ src/main.jsx           ← mounts the app
├─ index.html
├─ vite.config.js
├─ capacitor.config.json  ← appId / appName live here — EDIT before publishing
├─ resources/icon.svg     ← source icon (expanded to all densities by a tool below)
├─ .github/workflows/android.yml  ← builds the .aab in the cloud (no local tooling)
└─ package.json
```

**Identifiers** in `capacitor.config.json`:
- `appId` — set to `com.patriarchlegacy.steadyword` (permanent once published;
  it is opaque to users and does not appear on the store listing).
- `appName` — the display name ("A Steady Word").

The public publisher shown on Google Play is your account's **developer name**
(e.g. "Patriarch Legacy Press"), not the appId. Publishing under an
Organization developer account displays the organization name rather than a
personal legal name (requires a D-U-N-S number).

---

## Option A — Build the `.aab` in the cloud (no Android Studio needed)

Best if you don't want to install the Android toolchain.

1. Create a new GitHub repo and push this folder to it (default branch `main`).
2. In the repo, open the **Actions** tab → run **"Build Android App Bundle (.aab)"**
   (it also runs automatically on every push to `main`).
3. When it finishes, download the **`steady-word-aab`** artifact. Inside is your
   `.aab`.

The workflow is in `.github/workflows/android.yml`. It uses GitHub's free runners,
which already have the Android SDK and Java.

> The produced `.aab` is **unsigned**. See **Signing** below before uploading to Play.

---

## Option B — Build locally

Requires **Node 18+**, **JDK 17**, and **Android Studio** (for the Android SDK).

```bash
npm install
npm run build          # produces dist/ (the web assets)
npx cap add android    # creates the native android/ project (first time only)
npx cap sync android   # copies the web build into it (run after every web change)
```

Then build the bundle:

```bash
cd android
./gradlew bundleRelease
# output: android/app/build/outputs/bundle/release/app-release.aab
```

Or open the `android/` folder in Android Studio and use **Build → Generate Signed
Bundle / APK → Android App Bundle**.

---

## App icon

Generate all the Android icon densities from `resources/icon.svg`:

```bash
npm install -g @capacitor/assets
npx @capacitor/assets generate --android
```

(Replace `resources/icon.svg` with your own 1024×1024 artwork first if you'd like.)

---

## Signing (required for the Play Store)

Google Play uses **Play App Signing**: you upload a bundle signed with your own
*upload key*, and Google manages the final app‑signing key.

1. Create an upload keystore once:
   ```bash
   keytool -genkey -v -keystore upload-keystore.jks -keyalg RSA -keysize 2048 \
     -validity 10000 -alias upload
   ```
   Keep this file and its passwords safe — losing them complicates updates.
2. Add a signing config to `android/app/build.gradle` (Android Studio's
   "Generate Signed Bundle" wizard does this for you), or sign the produced
   `.aab` with `jarsigner`.
3. **Cloud signing is already wired into the workflow.** To turn it on, add these
   four repository **Secrets** (GitHub repo → Settings → Secrets and variables →
   Actions → New repository secret):

   | Secret name         | Value                                                        |
   |---------------------|--------------------------------------------------------------|
   | `KEYSTORE_BASE64`   | your keystore, base64-encoded: `base64 -w0 upload-keystore.jks` (macOS: `base64 -i upload-keystore.jks`) |
   | `KEYSTORE_PASSWORD` | the keystore password |
   | `KEY_ALIAS`         | the key alias (e.g. `upload`) |
   | `KEY_PASSWORD`      | the key password |

   With those set, every build produces a **signed** `.aab`. Without them, the
   build still runs and produces an unsigned bundle (fine for inspection, not for
   Play). Never commit the keystore itself — only the secrets.

---

## Privacy policy hosting

Google Play requires a privacy policy at a public `https://` URL.
`privacy-policy.html` in this folder is ready — edit the `[DATE]`,
`[DEVELOPER NAME]`, and `[CONTACT EMAIL]` placeholders, then host it. Easiest
free option: push this repo to GitHub, enable **GitHub Pages** (Settings →
Pages → deploy from `main`), and your policy will be at
`https://<user>.github.io/<repo>/privacy-policy.html`. Paste that URL into
Play Console.

---

## Store listing

`store-listing.md` contains the app name, short/long descriptions, category,
content-rating answers, and the Data-safety form answers ("no data collected"),
plus the list of graphics you need. Copy/paste into Play Console.

---

## Publishing checklist

- [x] `appId` set (`com.patriarchlegacy.steadyword`).
- [ ] Push to GitHub; run the workflow; **install the `.aab` on a real phone** and test.
- [ ] Create the upload keystore; add the four signing secrets above.
- [ ] Generate the app icon (`npx @capacitor/assets generate --android`).
- [ ] Host `privacy-policy.html`; fill in its placeholders.
- [ ] Register the Play Developer account, verify identity, pay the one-time fee.
- [ ] (Personal accounts) run the required closed test — 12+ testers, 14 days.
- [ ] Create the app; paste `store-listing.md` content; complete content rating
      and Data-safety forms; add screenshots + feature graphic.
- [ ] Upload the signed `.aab` and submit for review.

---

## Notes

- Scripture is King James Version (public domain). All A. W. Pink quotations are
  from the public‑domain editions of *The Sovereignty of God* (1918/1921/1929).
- This was generated with AI assistance; proofread Scripture references against a
  KJV text before publishing, per your usual practice.
