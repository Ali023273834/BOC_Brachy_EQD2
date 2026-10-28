# BOC Re-irradiation EQD2 app

Cumulative EQD2 calculator for head & neck and pelvic re-irradiation, with recovery after Course 1.
Designed by Ali Eid. Under testing by the Radiation Oncology team.

This folder is a complete installable web app. Once it is on GitHub Pages it opens from a web address,
installs to the Home Screen on iPhone and Android, and then works without internet.

## Files

| File | Purpose |
| --- | --- |
| index.html | The app |
| manifest.webmanifest | App name, colours and icons used when installed |
| sw.js | Offline cache |
| icon-*.png, apple-touch-icon.png, favicon.png | App icons |

## Put it online with GitHub Pages (about 15 minutes, free)

1. Go to github.com and create a free account (or sign in).
2. Click **+** (top right), then **New repository**.
   - Repository name: `rert-eqd2`
   - Visibility: **Public** (free GitHub Pages needs a public repository; the app holds no patient data)
   - Tick **Add a README file**, then click **Create repository**.
3. In the new repository click **Add file**, then **Upload files**.
4. Drag in ALL the files from this folder (not the folder itself), then click **Commit changes**.
5. Click **Settings**, then **Pages** in the left menu.
   - Source: **Deploy from a branch**
   - Branch: **main**, folder **/ (root)**, then **Save**.
6. Wait 1–2 minutes and refresh the Pages screen. It shows your address:
   `https://YOUR-USERNAME.github.io/rert-eqd2/`

## Install on a phone

- **iPhone:** open the address in **Safari**, tap **Share**, then **Add to Home Screen**, then **Add**.
- **Android:** open the address in **Chrome**, tap **⋮**, then **Install app** (or **Add to Home screen**).

Open the app once while online. After that it works offline. Entries are saved on that phone only.

## Updating the app later

1. Upload the changed files to the repository (same **Upload files** button; they replace the old ones).
2. In `sw.js`, change `rert-eqd2-v1` to `rert-eqd2-v2` (then v3, and so on) and upload it too.
   Phones pick up the new version the next time the app is opened online.

## Clinical use

Results support, and do not replace, clinical and physics review. Constraints and recovery assumptions
are example values until set to BOC policy.
